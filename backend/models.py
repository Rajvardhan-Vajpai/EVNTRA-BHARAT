from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from database import Base


class Visitor(Base):
    """SQLAlchemy model for a single registered visitor.

    A Visitor row is only created AFTER a payment has been verified - see
    main.py's _complete_registration(). A group registration (e.g. a family
    of 5) creates one Visitor row per member, all sharing the same group_id
    and the same contact/emergency details, each with their own visitor_id.
    """

    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(String(50), unique=True, index=True, nullable=False)
    group_id = Column(String(40), index=True, nullable=True)
    member_index = Column(Integer, nullable=True)  # 1 = primary registrant, 2+ = other members
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(50), nullable=True)
    mobile_number = Column(String(20), nullable=False, index=True)
    email = Column(String(150), nullable=True, index=True)
    emergency_contact_name = Column(String(100), nullable=True)
    emergency_contact_number = Column(String(20), nullable=True)
    medical_condition = Column(Text, nullable=True)
    payment_id = Column(String(100), nullable=True)
    amount_paid = Column(Integer, nullable=True)  # this member's share, in paise
    registered_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<Visitor(visitor_id={self.visitor_id}, name={self.first_name} {self.last_name})>"


class PaymentOrder(Base):
    """Tracks a Razorpay order from creation through verification.

    The submitted registration form data lives here as JSON until payment
    is confirmed - a Visitor row (and the real visitor ID) is only created
    once the payment signature has been verified. This is what prevents
    someone from generating a visitor ID without paying, and prevents a
    paid-but-tampered registration payload.
    """

    __tablename__ = "payment_orders"

    id = Column(Integer, primary_key=True, index=True)
    razorpay_order_id = Column(String(100), unique=True, index=True, nullable=False)
    registration_data = Column(Text, nullable=False)  # JSON-encoded registration fields (incl. all members)
    amount = Column(Integer, nullable=False)
    currency = Column(String(10), nullable=False, default="INR")
    status = Column(String(20), nullable=False, default="created")  # created | paid | failed
    group_id = Column(String(40), nullable=True)  # set once paid - links to Visitor.group_id
    payment_id = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    def __repr__(self):
        return f"<PaymentOrder(razorpay_order_id={self.razorpay_order_id}, status={self.status})>"
