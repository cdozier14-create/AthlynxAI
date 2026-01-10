"""
🦁 ATHLYNX WhatsApp Webhook Service
Flask service to receive and process WhatsApp messages

This service handles:
- Incoming WhatsApp messages
- Delivery status updates
- Auto-responses
- Verification code replies

Dreams Do Come True 2026!
"""

from flask import Flask, request, Response
from twilio.twiml.messaging_response import MessagingResponse
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime

# ==========================================
# CONFIGURATION
# ==========================================

DATABASE_URL = os.getenv("DATABASE_URL")

app = Flask(__name__)

# ==========================================
# DATABASE FUNCTIONS
# ==========================================

def get_db_connection():
    """Get PostgreSQL connection"""
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def log_whatsapp_message(phone: str, message_body: str, direction: str):
    """Log WhatsApp message to database"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            CREATE TABLE IF NOT EXISTS whatsapp_messages (
                id SERIAL PRIMARY KEY,
                phone VARCHAR(20),
                message_body TEXT,
                direction VARCHAR(10),
                received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        cur.execute("""
            INSERT INTO whatsapp_messages (phone, message_body, direction)
            VALUES (%s, %s, %s)
        """, (phone, message_body, direction))
        
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def check_verification_code(phone: str, code: str):
    """Check if code matches user's verification code"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Remove 'whatsapp:' prefix if present
        clean_phone = phone.replace('whatsapp:', '')
        
        cur.execute("""
            SELECT id, full_name, verification_code, code_expires_at
            FROM users
            WHERE phone = %s AND verified = FALSE
        """, (clean_phone,))
        
        user = cur.fetchone()
        
        if not user:
            cur.close()
            conn.close()
            return None, "User not found or already verified"
        
        # Check expiration
        if user['code_expires_at'] and datetime.utcnow() > user['code_expires_at']:
            cur.close()
            conn.close()
            return None, "Code expired"
        
        # Check code
        if user['verification_code'] == code:
            # Mark as verified
            cur.execute("""
                UPDATE users
                SET verified = TRUE, verification_code = NULL, verified_at = NOW()
                WHERE id = %s
            """, (user['id'],))
            
            conn.commit()
            cur.close()
            conn.close()
            return user['full_name'], "verified"
        else:
            cur.close()
            conn.close()
            return None, "Invalid code"
            
    except Exception as e:
        print(f"❌ Verification error: {e}")
        return None, f"Error: {str(e)}"

# ==========================================
# WEBHOOK ENDPOINTS
# ==========================================

@app.route("/")
def home():
    """Home endpoint"""
    return {
        "service": "ATHLYNX WhatsApp Webhook",
        "status": "online",
        "version": "1.0.0",
        "motto": "Dreams Do Come True 2026! 🦁"
    }

@app.route("/whatsapp/webhook", methods=['POST'])
def whatsapp_webhook():
    """Receive incoming WhatsApp messages"""
    try:
        # Get message details
        from_number = request.form.get('From', '')
        message_body = request.form.get('Body', '').strip()
        
        print(f"📱 WhatsApp message from {from_number}: {message_body}")
        
        # Log message
        log_whatsapp_message(from_number, message_body, 'incoming')
        
        # Create response
        resp = MessagingResponse()
        
        # Check if message is a verification code (6 digits)
        if message_body.isdigit() and len(message_body) == 6:
            name, status = check_verification_code(from_number, message_body)
            
            if status == "verified":
                resp.message(f"""🎉 *Verification Successful!*

Welcome to ATHLYNX, {name}!

Your account is now verified and ready to use.

Visit http://athlynxapp.ai to get started!

_Dreams Do Come True 2026!_
- ATHLYNX Team 🦁""")
            elif status == "Code expired":
                resp.message("""⏰ *Code Expired*

Your verification code has expired.

Please request a new code from the website.

Visit: http://athlynxapp.ai

- ATHLYNX Team 🦁""")
            elif status == "Invalid code":
                resp.message("""❌ *Invalid Code*

The code you entered is incorrect.

Please check and try again, or request a new code.

Visit: http://athlynxapp.ai

- ATHLYNX Team 🦁""")
            else:
                resp.message("""🔍 *User Not Found*

We couldn't find your account.

Please sign up first at: http://athlynxapp.ai

- ATHLYNX Team 🦁""")
        
        # Handle help requests
        elif message_body.lower() in ['help', 'hi', 'hello', 'hey']:
            resp.message("""👋 *Welcome to ATHLYNX!*

I'm here to help you verify your account.

*How it works:*
1️⃣ Sign up at http://athlynxapp.ai
2️⃣ Choose WhatsApp verification
3️⃣ Reply with your 6-digit code

Need help? Visit our website!

_Dreams Do Come True 2026!_
- ATHLYNX Team 🦁""")
        
        # Default response
        else:
            resp.message("""🦁 *ATHLYNX Verification*

To verify your account, please:
1. Sign up at http://athlynxapp.ai
2. Choose WhatsApp verification
3. Reply with your 6-digit code

Reply *HELP* for more information.

- ATHLYNX Team""")
        
        # Log response
        log_whatsapp_message(from_number, str(resp), 'outgoing')
        
        return Response(str(resp), mimetype='text/xml')
        
    except Exception as e:
        print(f"❌ Webhook error: {e}")
        resp = MessagingResponse()
        resp.message("Sorry, something went wrong. Please try again later.")
        return Response(str(resp), mimetype='text/xml')

@app.route("/whatsapp/status", methods=['POST'])
def whatsapp_status():
    """Receive WhatsApp message status updates"""
    try:
        message_sid = request.form.get('MessageSid', '')
        message_status = request.form.get('MessageStatus', '')
        
        print(f"📊 WhatsApp status update: {message_sid} - {message_status}")
        
        # Log status update
        # You can store this in database if needed
        
        return Response('OK', status=200)
        
    except Exception as e:
        print(f"❌ Status webhook error: {e}")
        return Response('Error', status=500)

@app.route("/health")
def health():
    """Health check endpoint"""
    try:
        conn = get_db_connection()
        conn.close()
        db_status = "connected"
    except:
        db_status = "disconnected"
    
    return {
        "status": "healthy",
        "database": db_status,
        "service": "WhatsApp Webhook",
        "timestamp": datetime.utcnow().isoformat()
    }

# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    app.run(host="0.0.0.0", port=port, debug=False)
