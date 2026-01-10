"""
ATHLYNX AI Platform - Notifications Router
"""
from fastapi import APIRouter, HTTPException, Cookie
from typing import Optional
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("/list")
async def get_notifications(athlynx_token: Optional[str] = Cookie(None)):
    """Get user notifications"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT id, type, title, message, is_read, created_at
            FROM notifications
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT 50
        """, (payload['user_id'],))
        
        notifications = cursor.fetchall()
        return {"success": True, "notifications": notifications}
        
    finally:
        cursor.close()
        conn.close()

@router.post("/mark-read/{notification_id}")
async def mark_notification_read(notification_id: int, athlynx_token: Optional[str] = Cookie(None)):
    """Mark notification as read"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            UPDATE notifications
            SET is_read = 1
            WHERE id = %s AND user_id = %s
        """, (notification_id, payload['user_id']))
        
        conn.commit()
        return {"success": True}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
