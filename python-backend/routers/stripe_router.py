"""
ATHLYNX AI Platform - Stripe Payments Router
"""
from fastapi import APIRouter, HTTPException, Cookie
from pydantic import BaseModel
from typing import Optional
import os
import stripe
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/stripe", tags=["Payments"])

# Initialize Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CreateCheckoutSession(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str

@router.post("/create-checkout-session")
async def create_checkout_session(data: CreateCheckoutSession, athlynx_token: Optional[str] = Cookie(None)):
    """Create Stripe checkout session"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    try:
        # Get or create Stripe customer
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT stripe_customer_id, email FROM users WHERE id = %s", (payload['user_id'],))
        user = cursor.fetchone()
        
        stripe_customer_id = user['stripe_customer_id']
        if not stripe_customer_id:
            # Create Stripe customer
            customer = stripe.Customer.create(email=user['email'])
            stripe_customer_id = customer.id
            
            # Save to database
            cursor.execute(
                "UPDATE users SET stripe_customer_id = %s WHERE id = %s",
                (stripe_customer_id, payload['user_id'])
            )
            conn.commit()
        
        cursor.close()
        conn.close()
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            customer=stripe_customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price': data.price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=data.success_url,
            cancel_url=data.cancel_url,
        )
        
        return {"success": True, "session_id": session.id, "url": session.url}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/subscription")
async def get_subscription(athlynx_token: Optional[str] = Cookie(None)):
    """Get user's subscription status"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT stripe_customer_id, stripe_subscription_id, subscription_status, subscription_tier
            FROM users
            WHERE id = %s
        """, (payload['user_id'],))
        
        user = cursor.fetchone()
        
        return {
            "success": True,
            "subscription_status": user['subscription_status'],
            "subscription_tier": user['subscription_tier'],
            "has_subscription": bool(user['stripe_subscription_id'])
        }
        
    finally:
        cursor.close()
        conn.close()

@router.post("/webhook")
async def stripe_webhook(request: dict):
    """Handle Stripe webhooks"""
    # This would handle Stripe webhook events
    # For now, just return success
    return {"success": True}
