"""
ATHLYNX AI Platform - Social Feed Router
Handles social feed posts, likes, comments
"""
from fastapi import APIRouter, HTTPException, Cookie
from pydantic import BaseModel
from typing import Optional, List
from database import get_db_connection
from auth import verify_jwt_token

router = APIRouter(prefix="/feed", tags=["Feed"])

class CreatePost(BaseModel):
    content: str
    media_url: Optional[str] = None
    media_type: Optional[str] = None

class CreateComment(BaseModel):
    post_id: int
    content: str

@router.get("/list")
async def get_feed(limit: int = 20, offset: int = 0):
    """Get social feed posts"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT 
                p.id, p.content, p.media_url, p.media_type, p.created_at,
                u.id as user_id, u.first_name, u.last_name, u.email,
                (SELECT COUNT(*) FROM post_likes WHERE post_id = p.id) as likes_count,
                (SELECT COUNT(*) FROM post_comments WHERE post_id = p.id) as comments_count
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
            LIMIT %s OFFSET %s
        """, (limit, offset))
        
        posts = cursor.fetchall()
        return {"success": True, "posts": posts}
        
    finally:
        cursor.close()
        conn.close()

@router.post("/create")
async def create_post(data: CreatePost, athlynx_token: Optional[str] = Cookie(None)):
    """Create a new post"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            INSERT INTO posts (user_id, content, media_url, media_type, created_at)
            VALUES (%s, %s, %s, %s, NOW())
        """, (payload['user_id'], data.content, data.media_url, data.media_type))
        
        post_id = cursor.lastrowid
        conn.commit()
        
        return {"success": True, "post_id": post_id}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.post("/like/{post_id}")
async def like_post(post_id: int, athlynx_token: Optional[str] = Cookie(None)):
    """Like a post"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Check if already liked
        cursor.execute("""
            SELECT id FROM post_likes WHERE post_id = %s AND user_id = %s
        """, (post_id, payload['user_id']))
        
        if cursor.fetchone():
            # Unlike
            cursor.execute("""
                DELETE FROM post_likes WHERE post_id = %s AND user_id = %s
            """, (post_id, payload['user_id']))
            action = "unliked"
        else:
            # Like
            cursor.execute("""
                INSERT INTO post_likes (post_id, user_id, created_at)
                VALUES (%s, %s, NOW())
            """, (post_id, payload['user_id']))
            action = "liked"
        
        conn.commit()
        return {"success": True, "action": action}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.post("/comment")
async def create_comment(data: CreateComment, athlynx_token: Optional[str] = Cookie(None)):
    """Comment on a post"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            INSERT INTO post_comments (post_id, user_id, content, created_at)
            VALUES (%s, %s, %s, NOW())
        """, (data.post_id, payload['user_id'], data.content))
        
        comment_id = cursor.lastrowid
        conn.commit()
        
        return {"success": True, "comment_id": comment_id}
        
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@router.get("/comments/{post_id}")
async def get_comments(post_id: int):
    """Get comments for a post"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT 
                c.id, c.content, c.created_at,
                u.id as user_id, u.first_name, u.last_name
            FROM post_comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = %s
            ORDER BY c.created_at ASC
        """, (post_id,))
        
        comments = cursor.fetchall()
        return {"success": True, "comments": comments}
        
    finally:
        cursor.close()
        conn.close()
