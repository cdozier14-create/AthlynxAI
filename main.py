"""
🦁 ATHLYNX MULTI-CHANNEL VERIFICATION SYSTEM 🦁
The World's First Triple-Channel Verification Platform

FastAPI Backend with Email, SMS, and WhatsApp Support
Built to make Chad Dozier the next billionaire!

Dreams Do Come True 2026!
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import os
import secrets
import resend
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
from twilio.rest import Client
import json
from typing import Optional, Literal

# ==========================================
# CONFIGURATION
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

# Twilio Configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
TWILIO_WHATSAPP_NUMBER = os.getenv("TWILIO_WHATSAPP_NUMBER", "whatsapp:+14155238886")

resend.api_key = RESEND_API_KEY

# Initialize Twilio client
try:
    twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    TWILIO_ENABLED = True
except Exception as e:
    print(f"⚠️ Twilio initialization failed: {e}")
    TWILIO_ENABLED = False

# ==========================================
# DATABASE SETUP
# ==========================================

def get_db_connection():
    """Get PostgreSQL connection"""
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def init_database():
    """Create tables if they don't exist"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(100),
            sport VARCHAR(100),
            verified BOOLEAN DEFAULT FALSE,
            verification_code VARCHAR(6),
            verification_channel VARCHAR(20),
            whatsapp_opt_in BOOLEAN DEFAULT FALSE,
            code_expires_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            verified_at TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_phone ON users(phone);
        CREATE INDEX IF NOT EXISTS idx_verification_code ON users(verification_code);
        
        CREATE TABLE IF NOT EXISTS verification_attempts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            channel VARCHAR(20),
            code VARCHAR(6),
            success BOOLEAN,
            attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    
    conn.commit()
    cur.close()
    conn.close()

# ==========================================
# PYDANTIC MODELS
# ==========================================

class UserSignup(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    role: str
    sport: str
    verification_channel: Literal["email", "sms", "whatsapp"] = "email"
    whatsapp_opt_in: bool = False

class VerifyCode(BaseModel):
    email: EmailStr
    code: str

class ResendVerification(BaseModel):
    email: EmailStr
    channel: Literal["email", "sms", "whatsapp"]

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="🦁 ATHLYNX Multi-Channel Verification API",
    description="The World's First Triple-Channel Verification Platform",
    version="2.0.0"
)

# CORS - Allow all origins (configure for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    try:
        init_database()
        print("✅ Database initialized successfully")
        print(f"✅ Twilio SMS: {'Enabled' if TWILIO_ENABLED else 'Disabled'}")
        print(f"✅ Twilio WhatsApp: {'Enabled' if TWILIO_ENABLED else 'Disabled'}")
        print(f"✅ Resend Email: {'Enabled' if RESEND_API_KEY else 'Disabled'}")
    except Exception as e:
        print(f"❌ Database initialization error: {e}")

# ==========================================
# HELPER FUNCTIONS
# ==========================================

def generate_verification_code():
    """Generate 6-digit verification code"""
    return ''.join([str(secrets.randbelow(10)) for _ in range(6)])

def send_verification_whatsapp(phone: str, name: str, code: str):
    """Send verification via WhatsApp"""
    if not TWILIO_ENABLED:
        print("⚠️ Twilio not enabled, skipping WhatsApp")
        return False
    
    try:
        # Format phone for WhatsApp
        whatsapp_to = f"whatsapp:{phone}"
        
        message_body = f"""🦁 *ATHLYNX Verification*

Hello {name}!

Your verification code is:

*{code}*

Enter this code to complete your registration.

Valid for 10 minutes.

_Dreams Do Come True 2026!_
- ATHLYNX Team"""
        
        message = twilio_client.messages.create(
            body=message_body,
            from_=TWILIO_WHATSAPP_NUMBER,
            to=whatsapp_to
        )
        
        print(f"✅ WhatsApp sent! SID: {message.sid}")
        return True
    except Exception as e:
        print(f"❌ WhatsApp error: {e}")
        return False

def send_verification_sms(phone: str, name: str, code: str):
    """Send verification SMS via Twilio"""
    if not TWILIO_ENABLED:
        print("⚠️ Twilio not enabled, skipping SMS")
        return False
    
    try:
        message_body = f"""🦁 ATHLYNX Verification

Hello {name}!

Your verification code is: {code}

Enter this code to complete your registration.

Valid for 10 minutes.

- ATHLYNX Team
Dreams Do Come True 2026!"""
        
        message = twilio_client.messages.create(
            body=message_body,
            from_=TWILIO_PHONE_NUMBER,
            to=phone
        )
        
        print(f"✅ SMS sent! SID: {message.sid}")
        return True
    except Exception as e:
        print(f"❌ SMS error: {e}")
        return False

def send_verification_email(email: str, name: str, code: str):
    """Send verification email via Resend"""
    try:
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }}
                .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white; }}
                .header h1 {{ margin: 0; font-size: 32px; }}
                .content {{ padding: 40px 30px; }}
                .code-box {{ background: #f8f9fa; border: 2px dashed #667eea; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0; }}
                .code {{ font-size: 48px; font-weight: bold; letter-spacing: 10px; color: #667eea; font-family: 'Courier New', monospace; }}
                .footer {{ background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }}
                .badge {{ background: #667eea; color: white; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px 0; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🦁 ATHLYNX</h1>
                    <p style="margin: 10px 0 0 0; font-size: 18px;">Multi-Channel Verification</p>
                    <span class="badge">EMAIL VERIFICATION</span>
                </div>
                <div class="content">
                    <p style="font-size: 16px; color: #333;">Hello {name},</p>
                    <p style="font-size: 16px; color: #666; line-height: 1.6;">
                        Your ATHLYNX platform verification code is:
                    </p>
                    <div class="code-box">
                        <div class="code">{code}</div>
                    </div>
                    <p style="font-size: 14px; color: #999;">
                        This code will expire in 10 minutes.
                    </p>
                    <p style="font-size: 16px; color: #666; line-height: 1.6;">
                        Enter this code on the platform to complete your registration and access all ATHLYNX features.
                    </p>
                    <p style="font-size: 14px; color: #999; margin-top: 30px;">
                        💡 <strong>Pro Tip:</strong> You can also verify via SMS or WhatsApp!
                    </p>
                    <p style="font-size: 16px; color: #333; margin-top: 30px;">
                        Thanks,<br>
                        <strong>The ATHLYNX Team</strong>
                    </p>
                </div>
                <div class="footer">
                    <p style="margin: 0;">Dreams Do Come True 2026! 🦁</p>
                    <p style="margin: 10px 0 0 0;">© 2026 ATHLYNX. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        resend.Emails.send({
            "from": "ATHLYNX <noreply@athlynx.ai>",
            "to": email,
            "subject": "🦁 Your ATHLYNX Verification Code",
            "html": html_content
        })
        return True
    except Exception as e:
        print(f"❌ Email error: {e}")
        return False

def send_verification_code(email: str, phone: str, name: str, code: str, channel: str):
    """Send verification code via specified channel with fallback"""
    results = {
        "primary": False,
        "fallback": None,
        "channel_used": None
    }
    
    # Try primary channel
    if channel == "whatsapp":
        results["primary"] = send_verification_whatsapp(phone, name, code)
        results["channel_used"] = "whatsapp" if results["primary"] else None
    elif channel == "sms":
        results["primary"] = send_verification_sms(phone, name, code)
        results["channel_used"] = "sms" if results["primary"] else None
    elif channel == "email":
        results["primary"] = send_verification_email(email, name, code)
        results["channel_used"] = "email" if results["primary"] else None
    
    # Fallback to email if primary fails
    if not results["primary"] and channel != "email":
        results["fallback"] = send_verification_email(email, name, code)
        if results["fallback"]:
            results["channel_used"] = "email"
    
    return results

# ==========================================
# API ENDPOINTS
# ==========================================

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "🦁 ATHLYNX Multi-Channel Verification API",
        "version": "2.0.0",
        "status": "online",
        "channels": ["email", "sms", "whatsapp"],
        "docs": "/docs",
        "motto": "Dreams Do Come True 2026!"
    }

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    try:
        conn = get_db_connection()
        conn.close()
        db_status = "connected"
    except:
        db_status = "disconnected"
    
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "database": db_status,
        "channels": {
            "email": "enabled" if RESEND_API_KEY else "disabled",
            "sms": "enabled" if TWILIO_ENABLED else "disabled",
            "whatsapp": "enabled" if TWILIO_ENABLED else "disabled"
        }
    }

@app.post("/api/signup")
def signup(user_data: UserSignup):
    """Register new user and send verification code via chosen channel"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Check if user exists
        cur.execute("SELECT id FROM users WHERE email = %s", (user_data.email,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Generate verification code
        code = generate_verification_code()
        code_expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        # Insert user
        cur.execute("""
            INSERT INTO users (
                full_name, email, phone, role, sport, 
                verification_code, verification_channel, 
                whatsapp_opt_in, code_expires_at, verified
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, FALSE)
            RETURNING id
        """, (
            user_data.full_name, user_data.email, user_data.phone, 
            user_data.role, user_data.sport, code, 
            user_data.verification_channel, user_data.whatsapp_opt_in,
            code_expires_at
        ))
        
        user_id = cur.fetchone()['id']
        conn.commit()
        
        # Send verification code
        send_results = send_verification_code(
            user_data.email, 
            user_data.phone, 
            user_data.full_name, 
            code, 
            user_data.verification_channel
        )
        
        return {
            "success": True,
            "message": f"Verification code sent via {send_results['channel_used']}!",
            "user_id": user_id,
            "channel_used": send_results['channel_used'],
            "fallback_used": send_results['fallback'] is not None
        }
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Signup error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.post("/api/verify")
def verify(data: VerifyCode):
    """Verify user with code"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Get user
        cur.execute("""
            SELECT id, full_name, verified, verification_code, code_expires_at 
            FROM users 
            WHERE email = %s
        """, (data.email,))
        
        user = cur.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user['verified']:
            return {"success": True, "message": "Already verified"}
        
        # Check code expiration
        if user['code_expires_at'] and datetime.utcnow() > user['code_expires_at']:
            raise HTTPException(status_code=400, detail="Verification code expired")
        
        if user['verification_code'] != data.code:
            # Log failed attempt
            cur.execute("""
                INSERT INTO verification_attempts (user_id, code, success)
                VALUES (%s, %s, FALSE)
            """, (user['id'], data.code))
            conn.commit()
            raise HTTPException(status_code=400, detail="Invalid verification code")
        
        # Mark as verified
        cur.execute("""
            UPDATE users 
            SET verified = TRUE, verification_code = NULL, verified_at = NOW()
            WHERE email = %s
        """, (data.email,))
        
        # Log successful attempt
        cur.execute("""
            INSERT INTO verification_attempts (user_id, code, success)
            VALUES (%s, %s, TRUE)
        """, (user['id'], data.code))
        
        conn.commit()
        
        return {
            "success": True,
            "message": "🎉 Account verified successfully!",
            "user": {
                "id": user['id'],
                "name": user['full_name'],
                "email": data.email
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Verification error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.post("/api/resend-verification")
def resend_verification(data: ResendVerification):
    """Resend verification code via different channel"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Get user
        cur.execute("""
            SELECT id, full_name, phone, verified, verification_code
            FROM users 
            WHERE email = %s
        """, (data.email,))
        
        user = cur.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        if user['verified']:
            return {"success": True, "message": "Already verified"}
        
        # Generate new code
        code = generate_verification_code()
        code_expires_at = datetime.utcnow() + timedelta(minutes=10)
        
        # Update code
        cur.execute("""
            UPDATE users 
            SET verification_code = %s, 
                verification_channel = %s,
                code_expires_at = %s
            WHERE email = %s
        """, (code, data.channel, code_expires_at, data.email))
        
        conn.commit()
        
        # Send verification code
        send_results = send_verification_code(
            data.email, 
            user['phone'], 
            user['full_name'], 
            code, 
            data.channel
        )
        
        return {
            "success": True,
            "message": f"Verification code resent via {send_results['channel_used']}!",
            "channel_used": send_results['channel_used']
        }
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Resend error: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.get("/api/users/count")
def get_user_count():
    """Get user statistics"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT COUNT(*) as total FROM users")
        total = cur.fetchone()['total']
        
        cur.execute("SELECT COUNT(*) as verified FROM users WHERE verified = TRUE")
        verified = cur.fetchone()['verified']
        
        cur.execute("""
            SELECT verification_channel, COUNT(*) as count 
            FROM users 
            GROUP BY verification_channel
        """)
        channels = {row['verification_channel']: row['count'] for row in cur.fetchall()}
        
        return {
            "total_users": total,
            "verified_users": verified,
            "pending_users": total - verified,
            "channels": channels
        }
        
    finally:
        cur.close()
        conn.close()

# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
