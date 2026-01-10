"""
ATHLYNX AI Platform - Social Router
Handles social connections and followers
"""
from fastapi import APIRouter, HTTPException, Cookie
from typing import Optional
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/social", tags=["Social"])

@router.post("/follow/{user_id}")
async def follow_user(user_id: int, athlynx_token: Optional[str] = Cookie(None)):
    """Follow a user"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    if payload['user_id'] == user_id:
        raise HTTPException(status_code=400, detail="Cannot follow yourself")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Check if already following
        cursor.execute("""
            SELECT id FROM user_connections 
            WHERE follower_id = %s AND following_id = %s
        """, (payload['user_id'], user_id))
        
        if cursor.fetchone():
            # Unfollow
            cursor.execute("""
                DELETE FROM user_connections 
                WHERE follower_id = %s AND following_id = %s
            """, (payload['user_id'], user_id))
            action = "unfollowed"
        else:
            # Follow
            cursor.execute("""
                INSERT INTO user_connections (follower_id, following_id, created_at)
                VALUES (%s, %s, NOW())
            """, (payload['user_id'], user_id))
            action = "followed"
        
        conn.commit()
        return {"success": True, "action": action}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.get("/followers/{user_id}")
async def get_followers(user_id: int):
    """Get user's followers"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT u.id, u.first_name, u.last_name, u.email
            FROM user_connections c
            JOIN users u ON c.follower_id = u.id
            WHERE c.following_id = %s
        """, (user_id,))
        
        followers = cursor.fetchall()
        return {"success": True, "followers": followers}
        
    finally:
        cursor.close()
        conn.close()

@router.get("/following/{user_id}")
async def get_following(user_id: int):
    """Get users that this user follows"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT u.id, u.first_name, u.last_name, u.email
            FROM user_connections c
            JOIN users u ON c.following_id = u.id
            WHERE c.follower_id = %s
        """, (user_id,))
        
        following = cursor.fetchall()
        return {"success": True, "following": following}
        
    finally:
        cursor.close()
        conn.close()
