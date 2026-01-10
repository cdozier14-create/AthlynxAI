"""
ATHLYNX AI Platform - Messages Router
Handles private messaging
"""
from fastapi import APIRouter, HTTPException, Cookie
from pydantic import BaseModel
from typing import Optional
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/messages", tags=["Messages"])

class SendMessage(BaseModel):
    recipient_id: int
    content: str

@router.post("/send")
async def send_message(data: SendMessage, athlynx_token: Optional[str] = Cookie(None)):
    """Send a private message"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            INSERT INTO messages (sender_id, recipient_id, content, created_at)
            VALUES (%s, %s, %s, NOW())
        """, (payload['user_id'], data.recipient_id, data.content))
        
        message_id = cursor.lastrowid
        conn.commit()
        
        return {"success": True, "message_id": message_id}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.get("/inbox")
async def get_inbox(athlynx_token: Optional[str] = Cookie(None)):
    """Get user's inbox"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT 
                m.id, m.content, m.created_at, m.is_read,
                u.id as sender_id, u.first_name, u.last_name
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.recipient_id = %s
            ORDER BY m.created_at DESC
        """, (payload['user_id'],))
        
        messages = cursor.fetchall()
        return {"success": True, "messages": messages}
        
    finally:
        cursor.close()
        conn.close()

@router.get("/conversation/{user_id}")
async def get_conversation(user_id: int, athlynx_token: Optional[str] = Cookie(None)):
    """Get conversation with a specific user"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT 
                m.id, m.content, m.created_at, m.is_read,
                m.sender_id, m.recipient_id,
                u.first_name, u.last_name
            FROM messages m
            JOIN users u ON (m.sender_id = u.id OR m.recipient_id = u.id)
            WHERE (m.sender_id = %s AND m.recipient_id = %s)
               OR (m.sender_id = %s AND m.recipient_id = %s)
            ORDER BY m.created_at ASC
        """, (payload['user_id'], user_id, user_id, payload['user_id']))
        
        messages = cursor.fetchall()
        return {"success": True, "messages": messages}
        
    finally:
        cursor.close()
        conn.close()

@router.post("/mark-read/{message_id}")
async def mark_message_read(message_id: int, athlynx_token: Optional[str] = Cookie(None)):
    """Mark message as read"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            UPDATE messages
            SET is_read = 1
            WHERE id = %s AND recipient_id = %s
        """, (message_id, payload['user_id']))
        
        conn.commit()
        return {"success": True}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
