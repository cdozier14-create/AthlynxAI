"""
ATHLYNX AI Platform - VIP Codes Router
Handles VIP code validation and redemption
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection

router = APIRouter(prefix="/vip", tags=["VIP"])

class VIPCodeValidation(BaseModel):
    code: str

@router.post("/validate")
async def validate_vip_code(data: VIPCodeValidation):
    """Validate a VIP code"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT id, code, description, uses_remaining, is_active
            FROM vip_codes
            WHERE code = %s AND is_active = 1
        """, (data.code,))
        
        vip_code = cursor.fetchone()
        
        if not vip_code:
            return {"valid": False, "error": "Invalid or expired VIP code"}
        
        if vip_code['uses_remaining'] <= 0:
            return {"valid": False, "error": "VIP code has no remaining uses"}
        
        return {
            "valid": True,
            "code": vip_code['code'],
            "description": vip_code['description'],
            "uses_remaining": vip_code['uses_remaining']
        }
        
    finally:
        cursor.close()
        conn.close()

@router.post("/redeem")
async def redeem_vip_code(data: VIPCodeValidation):
    """Redeem a VIP code"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Validate code
        cursor.execute("""
            SELECT id, uses_remaining
            FROM vip_codes
            WHERE code = %s AND is_active = 1
        """, (data.code,))
        
        vip_code = cursor.fetchone()
        
        if not vip_code:
            raise HTTPException(status_code=400, detail="Invalid or expired VIP code")
        
        if vip_code['uses_remaining'] <= 0:
            raise HTTPException(status_code=400, detail="VIP code has no remaining uses")
        
        # Decrement uses
        cursor.execute("""
            UPDATE vip_codes
            SET uses_remaining = uses_remaining - 1
            WHERE id = %s
        """, (vip_code['id'],))
        
        conn.commit()
        
        return {
            "success": True,
            "message": "VIP code redeemed successfully"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to redeem VIP code: {str(e)}")
    finally:
        cursor.close()
        conn.close()
