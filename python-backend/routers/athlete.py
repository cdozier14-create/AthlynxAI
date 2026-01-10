"""
ATHLYNX AI Platform - Athlete Router
Handles athlete profiles and stats
"""
from fastapi import APIRouter, HTTPException, Cookie
from pydantic import BaseModel
from typing import Optional
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/athlete", tags=["Athlete"])

class AthleteProfile(BaseModel):
    sport: str
    position: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[int] = None
    school: Optional[str] = None
    grad_year: Optional[int] = None
    gpa: Optional[float] = None
    bio: Optional[str] = None

@router.get("/profile/{user_id}")
async def get_athlete_profile(user_id: int):
    """Get athlete profile"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT 
                u.id, u.first_name, u.last_name, u.email,
                a.sport, a.position, a.height, a.weight, a.school, 
                a.grad_year, a.gpa, a.bio, a.nil_value
            FROM users u
            LEFT JOIN athlete_profiles a ON u.id = a.user_id
            WHERE u.id = %s
        """, (user_id,))
        
        profile = cursor.fetchone()
        if not profile:
            raise HTTPException(status_code=404, detail="Athlete not found")
        
        return {"success": True, "profile": profile}
        
    finally:
        cursor.close()
        conn.close()

@router.post("/profile/update")
async def update_athlete_profile(data: AthleteProfile, athlynx_token: Optional[str] = Cookie(None)):
    """Update athlete profile"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Check if profile exists
        cursor.execute("SELECT id FROM athlete_profiles WHERE user_id = %s", (payload['user_id'],))
        existing = cursor.fetchone()
        
        if existing:
            # Update
            cursor.execute("""
                UPDATE athlete_profiles
                SET sport = %s, position = %s, height = %s, weight = %s,
                    school = %s, grad_year = %s, gpa = %s, bio = %s
                WHERE user_id = %s
            """, (data.sport, data.position, data.height, data.weight,
                  data.school, data.grad_year, data.gpa, data.bio, payload['user_id']))
        else:
            # Insert
            cursor.execute("""
                INSERT INTO athlete_profiles 
                (user_id, sport, position, height, weight, school, grad_year, gpa, bio, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
            """, (payload['user_id'], data.sport, data.position, data.height, data.weight,
                  data.school, data.grad_year, data.gpa, data.bio))
        
        conn.commit()
        return {"success": True, "message": "Profile updated"}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.get("/search")
async def search_athletes(
    sport: Optional[str] = None,
    position: Optional[str] = None,
    school: Optional[str] = None,
    limit: int = 20
):
    """Search athletes"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        query = """
            SELECT 
                u.id, u.first_name, u.last_name,
                a.sport, a.position, a.school, a.grad_year, a.nil_value
            FROM users u
            JOIN athlete_profiles a ON u.id = a.user_id
            WHERE 1=1
        """
        params = []
        
        if sport:
            query += " AND a.sport = %s"
            params.append(sport)
        if position:
            query += " AND a.position = %s"
            params.append(position)
        if school:
            query += " AND a.school LIKE %s"
            params.append(f"%{school}%")
        
        query += " LIMIT %s"
        params.append(limit)
        
        cursor.execute(query, params)
        athletes = cursor.fetchall()
        
        return {"success": True, "athletes": athletes}
        
    finally:
        cursor.close()
        conn.close()
