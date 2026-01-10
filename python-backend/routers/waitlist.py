"""
ATHLYNX AI Platform - Waitlist Router
Handles waitlist signups and management
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from database import get_db_connection

router = APIRouter(prefix="/waitlist", tags=["Waitlist"])

class WaitlistSignup(BaseModel):
    fullName: str
    email: EmailStr
    phone: Optional[str] = None
    role: str  # athlete, parent, coach, brand
    sport: Optional[str] = None
    referralCode: Optional[str] = None

@router.post("/join")
async def join_waitlist(data: WaitlistSignup):
    """Join the waitlist"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Check if email already exists
        cursor.execute("SELECT id FROM waitlist WHERE email = %s", (data.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already on waitlist")
        
        # Insert into waitlist
        cursor.execute("""
            INSERT INTO waitlist (full_name, email, phone, role, sport, referral_code, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, NOW())
        """, (data.fullName, data.email, data.phone, data.role, data.sport, data.referralCode))
        
        waitlist_id = cursor.lastrowid
        
        # Get position in waitlist
        cursor.execute("SELECT COUNT(*) as position FROM waitlist WHERE id <= %s", (waitlist_id,))
        position = cursor.fetchone()['position']
        
        conn.commit()
        
        return {
            "success": True,
            "message": "Successfully joined waitlist",
            "position": position,
            "waitlist_id": waitlist_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to join waitlist: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.get("/count")
async def get_waitlist_count():
    """Get total waitlist count"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("SELECT COUNT(*) as count FROM waitlist")
        result = cursor.fetchone()
        return {"success": True, "count": result['count']}
    finally:
        cursor.close()
        conn.close()

@router.get("/stats")
async def get_waitlist_stats():
    """Get waitlist statistics"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Total count
        cursor.execute("SELECT COUNT(*) as total FROM waitlist")
        total = cursor.fetchone()['total']
        
        # By role
        cursor.execute("""
            SELECT role, COUNT(*) as count 
            FROM waitlist 
            GROUP BY role
        """)
        by_role = cursor.fetchall()
        
        # By sport
        cursor.execute("""
            SELECT sport, COUNT(*) as count 
            FROM waitlist 
            WHERE sport IS NOT NULL
            GROUP BY sport
            ORDER BY count DESC
            LIMIT 10
        """)
        by_sport = cursor.fetchall()
        
        return {
            "success": True,
            "total": total,
            "by_role": by_role,
            "by_sport": by_sport
        }
    finally:
        cursor.close()
        conn.close()
