from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_

from database import get_db
from models import User, Event
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    get_current_admin,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from datetime import timedelta
from pydantic import BaseModel, EmailStr

router = APIRouter()

# --- SCHEMAS ---
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    token: Optional[str] = None
    
    class Config:
        from_attributes = True

class EventCreate(BaseModel):
    id: Optional[str] = None
    title: str
    category: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    price: Optional[str] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None
    tags: Optional[list] = None
    image: Optional[str] = None
    description: Optional[str] = None
    tickets_total: Optional[int] = 100
    tickets_available: Optional[int] = 100
    is_trending: Optional[bool] = False
    is_featured: Optional[bool] = False

# --- AUTH ROUTES ---
@router.post("/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(
        data={"id": new_user.id}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {**new_user.__dict__, "token": access_token}


@router.post("/auth/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    access_token = create_access_token(
        data={"id": db_user.id}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {**db_user.__dict__, "token": access_token}

@router.get("/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# --- EVENT ROUTES ---
@router.get("/events")
def get_events(
    category: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_trending: Optional[bool] = None,
    location: Optional[str] = None,
    search: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    minRating: Optional[str] = None,
    sort: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Event)
    
    if category and category != 'All':
        query = query.filter(Event.category == category)
    if is_featured is not None:
        query = query.filter(Event.is_featured == is_featured)
    if is_trending is not None:
        query = query.filter(Event.is_trending == is_trending)
    if location and location != 'Anywhere':
        query = query.filter(Event.location == location)
        
    if minRating and minRating != 'Any Rating':
        import re
        match = re.search(r'([0-9.]+)', minRating)
        if match:
            rating_val = float(match.group(1))
            query = query.filter(Event.rating >= rating_val)
            
    if minPrice is not None:
        # Note: price in DB is currently a string like "₹4,500 onwards". 
        # In a real app we need a numeric column for proper filtering. 
        # We will ignore price filtering for the string column for now,
        # or implement complex parsing.
        pass
        
    if search and search.strip():
        search_term = f"%{search.strip()}%"
        query = query.filter(or_(
            Event.title.ilike(search_term),
            Event.location.ilike(search_term),
            Event.category.ilike(search_term)
        ))
        
    if sort == 'newest':
        query = query.order_by(Event.date.asc())
    elif sort == 'oldest':
        query = query.order_by(Event.date.desc())
    elif sort == 'priceLowHigh':
        query = query.order_by(Event.price.asc())
    elif sort == 'priceHighLow':
        query = query.order_by(Event.price.desc())
    elif sort == 'highestRated':
        query = query.order_by(Event.rating.desc(), Event.reviews.desc())
    elif sort == 'mostPopular':
        query = query.order_by(Event.reviews.desc())
    else:
        query = query.order_by(Event.date.asc())
        
    events = query.all()
    return events

@router.get("/events/{event_id}")
def get_event_by_id(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/events", status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    import time
    if not event.id:
        event.id = f"ev-{int(time.time()*1000)}"
        
    new_event = Event(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.put("/events/{event_id}")
def update_event(event_id: str, event_data: EventCreate, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    update_data = event_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(event, key, value)
        
    db.commit()
    db.refresh(event)
    return event

@router.delete("/events/{event_id}")
def delete_event(event_id: str, db: Session = Depends(get_db), current_admin: User = Depends(get_current_admin)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}

# --- WISHLIST ROUTES ---
@router.post("/wishlist/{event_id}")
def toggle_wishlist(event_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
        
    if event in current_user.wishlisted_events:
        current_user.wishlisted_events.remove(event)
        status_msg = "removed"
    else:
        current_user.wishlisted_events.append(event)
        status_msg = "added"
        
    db.commit()
    return {"message": f"Event {status_msg} to wishlist", "status": status_msg}

@router.get("/wishlist")
def get_my_wishlist(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return current_user.wishlisted_events


# --- NEWSLETTER ROUTES ---
class NewsletterSubscribe(BaseModel):
    email: EmailStr
    whatsapp_number: Optional[str] = None
    wants_whatsapp: Optional[bool] = False

@router.post("/newsletter/subscribe")
def subscribe_newsletter(data: NewsletterSubscribe, db: Session = Depends(get_db)):
    from models import NewsletterSubscriber
    from email_service import email_service
    from sms_service import sms_service
    import logging
    logger = logging.getLogger(__name__)

    email = data.email.lower().strip()

    # Check if already subscribed
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == email).first()
    if existing:
        if existing.is_active:
            # Update whatsapp preferences if they are now opting in
            updated = False
            if data.wants_whatsapp and not existing.wants_whatsapp:
                existing.wants_whatsapp = True
                existing.whatsapp_number = data.whatsapp_number
                updated = True
            elif data.whatsapp_number and existing.whatsapp_number != data.whatsapp_number:
                existing.whatsapp_number = data.whatsapp_number
                updated = True
                
            if updated:
                db.commit()
                if data.wants_whatsapp and data.whatsapp_number:
                    try:
                        sms_service.send_newsletter_welcome_sms(data.whatsapp_number)
                    except Exception as e:
                        logger.error(f"Newsletter welcome SMS failed for {data.whatsapp_number}: {e}")
                return {"success": True, "message": "Subscription updated with WhatsApp preferences!"}
            return {"success": True, "message": "You're already subscribed! Check your inbox for updates."}
        else:
            # Re-activate a previously unsubscribed user
            existing.is_active = True
            if data.wants_whatsapp:
                existing.wants_whatsapp = True
                existing.whatsapp_number = data.whatsapp_number
            db.commit()
            
            # Send SMS if newly opted in
            if data.wants_whatsapp and data.whatsapp_number:
                try:
                    sms_service.send_newsletter_welcome_sms(data.whatsapp_number)
                except Exception as e:
                    logger.error(f"Newsletter welcome SMS failed for {data.whatsapp_number}: {e}")

    if not existing:
        subscriber = NewsletterSubscriber(
            email=email,
            whatsapp_number=data.whatsapp_number,
            wants_whatsapp=data.wants_whatsapp
        )
        db.add(subscriber)
        db.commit()
        
        # Send WhatsApp welcome if opted in
        if data.wants_whatsapp and data.whatsapp_number:
            try:
                sms_service.send_newsletter_welcome_sms(data.whatsapp_number)
            except Exception as e:
                logger.error(f"Newsletter welcome SMS failed for {data.whatsapp_number}: {e}")

    # Send welcome email (non-blocking — don't fail the request if email fails)
    try:
        email_service.send_newsletter_email(email)
    except Exception as e:
        logger.error(f"Newsletter welcome email failed for {email}: {e}")

    msg = "Welcome aboard! Check your inbox for a confirmation."
    if not existing and data.wants_whatsapp:
        msg = "Welcome aboard! Check your inbox and WhatsApp for a confirmation."
        
    return {"success": True, "message": msg}
