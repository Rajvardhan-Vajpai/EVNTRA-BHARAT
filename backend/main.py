import json
import logging
import uuid
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from database import get_db, init_db
from email_service import email_service
from models import PaymentOrder, Visitor
from payment_service import payment_service
from sms_service import sms_service
from api_routes import router as api_router
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="CrowdSafe API", version="3.0.0")

# Enable CORS for frontend
# NOTE: "*" is convenient for local development. Before going to production,
# restrict this to your actual frontend origin(s), e.g. ["https://yourdomain.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

MAX_GROUP_SIZE = 20  # sanity cap so create-order can't be abused with a huge member list


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class MemberData(BaseModel):
    first_name: str
    last_name: str
    age: int
    gender: Optional[str] = None
    medical_condition: Optional[str] = None


class RegistrationData(BaseModel):
    """One registration = one shared contact (the primary registrant) + a list
    of members. members[0] IS the primary registrant - if it's just one
    person, members has exactly one entry."""
    mobile_number: str
    email: EmailStr
    emergency_contact_name: Optional[str] = None
    emergency_contact_number: Optional[str] = None
    members: List[MemberData] = Field(..., min_length=1, max_length=MAX_GROUP_SIZE)


class VisitorResult(BaseModel):
    visitor_id: str
    first_name: str
    last_name: str


class RegistrationResponse(BaseModel):
    group_id: str
    visitors: List[VisitorResult]
    message: str


class VisitorDetail(BaseModel):
    visitor_id: str
    group_id: Optional[str]
    first_name: str
    last_name: str
    age: int
    gender: Optional[str]
    mobile_number: str
    email: Optional[str]
    emergency_contact_name: Optional[str]
    emergency_contact_number: Optional[str]
    medical_condition: Optional[str]

    class Config:
        from_attributes = True


class PaymentConfigResponse(BaseModel):
    key_id: str
    fee_per_person: int
    currency: str
    fee_per_person_display: str


class CreateOrderResponse(BaseModel):
    razorpay_order_id: str
    amount: int
    currency: str
    key_id: str
    member_count: int


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

@app.on_event("startup")
def startup_event():
    init_db()
    print("[OK] Database initialized")


@app.get("/")
def read_root():
    return {"message": "CrowdSafe API is running", "version": "3.0.0"}


# ---------------------------------------------------------------------------
# Shared logic: create one Visitor row per group member + send notifications
# ---------------------------------------------------------------------------

def _create_visitors_for_group(
    data: dict,
    db: Session,
    payment_id: Optional[str] = None,
    total_amount_paise: Optional[int] = None,
) -> List[Visitor]:
    """Create one Visitor row per member in `data["members"]`, all sharing a new
    group_id. Used by both the free registration endpoint (payment_id=None) and
    the Razorpay-gated flow (payment_id set) below - same code path either way,
    so re-enabling payment later doesn't change how visitors get created.
    """
    members = data["members"]
    group_id = uuid.uuid4().hex[:16]
    share_paise = (total_amount_paise // len(members)) if (total_amount_paise and members) else None

    created_visitors: List[Visitor] = []
    for idx, member in enumerate(members, start=1):
        visitor_id = f"VS{uuid.uuid4().hex[:12].upper()}"
        db_visitor = Visitor(
            visitor_id=visitor_id,
            group_id=group_id,
            member_index=idx,
            first_name=member["first_name"],
            last_name=member["last_name"],
            age=member["age"],
            gender=member.get("gender"),
            mobile_number=data["mobile_number"],
            email=data.get("email"),
            emergency_contact_name=data.get("emergency_contact_name"),
            emergency_contact_number=data.get("emergency_contact_number"),
            medical_condition=member.get("medical_condition"),
            payment_id=payment_id,
            amount_paid=share_paise,
        )
        db.add(db_visitor)
        created_visitors.append(db_visitor)

    db.commit()
    for v in created_visitors:
        db.refresh(v)

    visitor_payload = [
        {"visitor_id": v.visitor_id, "first_name": v.first_name, "last_name": v.last_name}
        for v in created_visitors
    ]
    primary_first_name = created_visitors[0].first_name

    # Best-effort notifications - registration has already succeeded even if these fail
    if data.get("email"):
        email_service.send_group_registration_email(
            recipient_email=data["email"],
            primary_first_name=primary_first_name,
            visitors=visitor_payload,
        )

    sms_service.send_group_registration_sms(
        phone_number=data["mobile_number"],
        primary_first_name=primary_first_name,
        visitors=visitor_payload,
    )

    logger.info(f"Group registration complete: group_id={group_id}, {len(created_visitors)} visitor(s)")
    return created_visitors


def _complete_registration(order_row: PaymentOrder, payment_id: str, db: Session) -> List[Visitor]:
    """[Razorpay flow - currently DORMANT, not called by the frontend right now,
    kept ready for when payment is switched back on]

    Create one Visitor row per group member for a PaymentOrder that has just
    been confirmed paid. Idempotent: called from both /api/payment/verify (the
    normal path, fired by the visitor's browser) and /api/payment/webhook (the
    safety net, fired by Razorpay's servers) - whichever runs first does the
    work, the other just returns the already-created visitors.
    """
    existing = db.query(Visitor).filter(Visitor.group_id == order_row.group_id).all() if order_row.group_id else []
    if order_row.status == "paid" and existing:
        return existing

    data = json.loads(order_row.registration_data)
    visitors = _create_visitors_for_group(data, db, payment_id=payment_id, total_amount_paise=order_row.amount)

    order_row.status = "paid"
    order_row.group_id = visitors[0].group_id
    order_row.payment_id = payment_id
    db.commit()

    return visitors


# ---------------------------------------------------------------------------
# FREE registration (payment temporarily disabled)
# ---------------------------------------------------------------------------

@app.post("/api/register", response_model=RegistrationResponse)
def register(data: RegistrationData, db: Session = Depends(get_db)):
    """Register a group directly - no payment required right now. Issues one
    visitor ID per member immediately and sends the group email + WhatsApp message.

    This is temporary: the Razorpay-gated flow below (/api/payment/*) is fully
    built and untouched - switch the frontend back to calling create-order +
    verify instead of this endpoint whenever payment should be required again.
    """
    if not data.mobile_number:
        raise HTTPException(status_code=400, detail="Mobile number is required")

    for member in data.members:
        if member.age < 0 or member.age > 150:
            raise HTTPException(status_code=400, detail=f"Invalid age for {member.first_name}")

    try:
        visitors = _create_visitors_for_group(data.model_dump(), db)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {e}")

    return RegistrationResponse(
        group_id=visitors[0].group_id,
        visitors=[VisitorResult(visitor_id=v.visitor_id, first_name=v.first_name, last_name=v.last_name) for v in visitors],
        message="Registration complete",
    )


# ---------------------------------------------------------------------------
# Payment flow - DORMANT for now (frontend doesn't call these), kept ready
# ---------------------------------------------------------------------------

@app.get("/api/payment/config", response_model=PaymentConfigResponse)
def payment_config():
    """Public config the frontend needs before opening checkout: per-person fee + publishable key."""
    if not payment_service.client:
        raise HTTPException(status_code=503, detail="Payment gateway is not configured")
    return PaymentConfigResponse(
        key_id=payment_service.key_id,
        fee_per_person=payment_service.fee_per_person_paise,
        currency=payment_service.currency,
        fee_per_person_display=f"{payment_service.fee_per_person_paise / 100:.2f}",
    )


@app.post("/api/payment/create-order", response_model=CreateOrderResponse)
def create_order(data: RegistrationData, db: Session = Depends(get_db)):
    """Step 1: validate the form (including every member's details), create a
    Razorpay order for fee_per_person x member_count, and stash the registration
    data server-side against that order. No Visitor / visitor IDs exist yet -
    that only happens after payment is verified.
    """
    if not data.mobile_number:
        raise HTTPException(status_code=400, detail="Mobile number is required")

    for member in data.members:
        if member.age < 0 or member.age > 150:
            raise HTTPException(status_code=400, detail=f"Invalid age for {member.first_name}")

    total_amount = payment_service.fee_per_person_paise * len(data.members)

    try:
        razorpay_order = payment_service.create_order(amount_paise=total_amount)
    except Exception as e:
        logger.error(f"Razorpay order creation failed: {e}")
        raise HTTPException(status_code=502, detail="Could not initiate payment. Please try again.")

    order_row = PaymentOrder(
        razorpay_order_id=razorpay_order["id"],
        registration_data=data.model_dump_json(),
        amount=razorpay_order["amount"],
        currency=razorpay_order["currency"],
        status="created",
    )
    db.add(order_row)
    db.commit()

    return CreateOrderResponse(
        razorpay_order_id=razorpay_order["id"],
        amount=razorpay_order["amount"],
        currency=razorpay_order["currency"],
        key_id=payment_service.key_id,
        member_count=len(data.members),
    )


@app.post("/api/payment/verify", response_model=RegistrationResponse)
def verify_payment(payload: VerifyPaymentRequest, db: Session = Depends(get_db)):
    """Step 2: verify the signature Razorpay Checkout returned, then issue one visitor ID per member."""
    order_row = db.query(PaymentOrder).filter(
        PaymentOrder.razorpay_order_id == payload.razorpay_order_id
    ).first()
    if not order_row:
        raise HTTPException(status_code=404, detail="Order not found")

    if order_row.status != "paid":
        is_valid = payment_service.verify_signature(
            razorpay_order_id=payload.razorpay_order_id,
            razorpay_payment_id=payload.razorpay_payment_id,
            razorpay_signature=payload.razorpay_signature,
        )
        if not is_valid:
            order_row.status = "failed"
            db.commit()
            raise HTTPException(status_code=400, detail="Payment verification failed")

    try:
        visitors = _complete_registration(order_row, payload.razorpay_payment_id, db)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Could not complete registration: {e}")

    return RegistrationResponse(
        group_id=order_row.group_id,
        visitors=[VisitorResult(visitor_id=v.visitor_id, first_name=v.first_name, last_name=v.last_name) for v in visitors],
        message="Payment verified and registration complete",
    )


@app.post("/api/payment/webhook")
async def razorpay_webhook(request: Request, db: Session = Depends(get_db)):
    """Safety net: if the visitor's browser never calls /api/payment/verify
    (closed tab, app crash, flaky network after a successful payment), Razorpay
    will still hit this endpoint once the payment is captured, so the visitor
    records get created anyway.

    Configure this URL in Razorpay Dashboard -> Settings -> Webhooks, subscribed
    to the 'payment.captured' event, and set RAZORPAY_WEBHOOK_SECRET in .env to
    match the secret you set there. Not reachable from Razorpay while running on
    localhost - only matters once this is deployed somewhere with a public URL.
    """
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature", "")

    if not payment_service.verify_webhook_signature(body, signature):
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    event = json.loads(body)
    if event.get("event") == "payment.captured":
        payment_entity = event["payload"]["payment"]["entity"]
        razorpay_order_id = payment_entity["order_id"]
        payment_id = payment_entity["id"]

        order_row = db.query(PaymentOrder).filter(
            PaymentOrder.razorpay_order_id == razorpay_order_id
        ).first()
        if order_row and order_row.status != "paid":
            try:
                _complete_registration(order_row, payment_id, db)
            except Exception as e:
                logger.error(f"Webhook registration completion failed: {e}")

    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Visitor / group lookup endpoints
# ---------------------------------------------------------------------------

@app.get("/api/visitor/{visitor_id}", response_model=VisitorDetail)
def get_visitor(visitor_id: str, db: Session = Depends(get_db)):
    visitor = db.query(Visitor).filter(Visitor.visitor_id == visitor_id).first()
    if not visitor:
        raise HTTPException(status_code=404, detail="Visitor not found")
    return visitor


@app.get("/api/group/{group_id}")
def get_group(group_id: str, db: Session = Depends(get_db)):
    """List every member registered together under one group_id - handy at the
    gate to confirm 'this person is travelling with 4 others'."""
    members = db.query(Visitor).filter(Visitor.group_id == group_id).order_by(Visitor.member_index).all()
    if not members:
        raise HTTPException(status_code=404, detail="Group not found")
    return {
        "group_id": group_id,
        "member_count": len(members),
        "members": [
            {
                "visitor_id": v.visitor_id,
                "first_name": v.first_name,
                "last_name": v.last_name,
                "member_index": v.member_index,
            }
            for v in members
        ],
    }


@app.get("/api/visitors")
def list_visitors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    visitors = db.query(Visitor).offset(skip).limit(limit).all()
    total = db.query(Visitor).count()
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "visitors": [
            {
                "visitor_id": v.visitor_id,
                "group_id": v.group_id,
                "first_name": v.first_name,
                "last_name": v.last_name,
                "age": v.age,
                "registered_at": v.registered_at,
            }
            for v in visitors
        ],
    }


@app.get("/api/visitor/{visitor_id}/qrcode")
def get_qr_code(visitor_id: str, db: Session = Depends(get_db)):
    import base64
    import io

    import qrcode

    visitor = db.query(Visitor).filter(Visitor.visitor_id == visitor_id).first()
    if not visitor:
        raise HTTPException(status_code=404, detail="Visitor not found")

    qr_url = f"{email_service.api_base_url}/visitor/{visitor_id}"
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(qr_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode()

    return {
        "visitor_id": visitor_id,
        "name": f"{visitor.first_name} {visitor.last_name}",
        "qr_code": f"data:image/png;base64,{img_base64}",
        "qr_url": qr_url,
    }


@app.post("/api/test-email/{email}")
def test_email(email: str):
    """Send a test email to verify SMTP configuration."""
    success = email_service.send_test_email(email)
    if success:
        return {"status": "success", "message": f"Test email sent to {email}"}
    return {"status": "error", "message": "Failed to send test email"}


@app.post("/api/test-sms/{phone_number}")
def test_sms(phone_number: str):
    """Send a test SMS to verify Twilio configuration."""
    success = sms_service.send_test_sms(phone_number)
    if success:
        return {"status": "success", "message": f"Test SMS sent to {phone_number}"}
    return {"status": "error", "message": "Failed to send test SMS - check ENABLE_SMS and Twilio credentials in .env"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
