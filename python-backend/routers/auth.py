"""
ATHLYNX AI Platform - Authentication Router
Handles user authentication, registration, login, logout
@author ATHLYNX AI Corporation
@date January 9, 2026
"""
from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from pydantic import BaseModel, EmailStr
from typing import Optional
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from database import get_db_connection

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "athlynx-secret-key-2026")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DAYS = 30

class RegisterRequest(BaseModel):
    email: EmailStr
    phone: str
    first_name: str
    last_name: str
    password: str
    vip_code: Optional[str] = None
    role: str = "athlete"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    success: bool
    message: str
    user: Optional[dict] = None
    token: Optional[str] = None

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_jwt_token(user_id: int, email: str) -> str:
    """Create JWT token for user"""
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(days=JWT_EXPIRATION_DAYS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> Optional[dict]:
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

@router.post("/register", response_model=AuthResponse)
async def register(data: RegisterRequest, response: Response):
    """Register new user"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Check if email already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (data.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Validate VIP code if provided
        vip_code_id = None
        if data.vip_code:
            cursor.execute(
                "SELECT id, uses_remaining FROM vip_codes WHERE code = %s AND is_active = 1",
                (data.vip_code,)
            )
            vip_result = cursor.fetchone()
            if not vip_result:
                raise HTTPException(status_code=400, detail="Invalid VIP code")
            if vip_result['uses_remaining'] <= 0:
                raise HTTPException(status_code=400, detail="VIP code has no remaining uses")
            vip_code_id = vip_result['id']
        
        # Hash password
        hashed_password = hash_password(data.password)
        
        # Insert user
        cursor.execute("""
            INSERT INTO users (email, phone, first_name, last_name, password_hash, role, vip_code_id, created_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        """, (data.email, data.phone, data.first_name, data.last_name, hashed_password, data.role, vip_code_id))
        
        user_id = cursor.lastrowid
        
        # Update VIP code uses
        if vip_code_id:
            cursor.execute(
                "UPDATE vip_codes SET uses_remaining = uses_remaining - 1 WHERE id = %s",
                (vip_code_id,)
            )
        
        conn.commit()
        
        # Create JWT token
        token = create_jwt_token(user_id, data.email)
        
        # Set cookie
        response.set_cookie(
            key="athlynx_token",
            value=token,
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=JWT_EXPIRATION_DAYS * 24 * 60 * 60
        )
        
        return AuthResponse(
            success=True,
            message="Registration successful",
            user={
                "id": user_id,
                "email": data.email,
                "first_name": data.first_name,
                "last_name": data.last_name,
                "role": data.role
            },
            token=token
        )
        
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, response: Response):
    """Login user"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Get user by email
        cursor.execute(
            "SELECT id, email, password_hash, first_name, last_name, role FROM users WHERE email = %s",
            (data.email,)
        )
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Verify password
        if not verify_password(data.password, user['password_hash']):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Create JWT token
        token = create_jwt_token(user['id'], user['email'])
        
        # Set cookie
        response.set_cookie(
            key="athlynx_token",
            value=token,
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=JWT_EXPIRATION_DAYS * 24 * 60 * 60
        )
        
        return AuthResponse(
            success=True,
            message="Login successful",
            user={
                "id": user['id'],
                "email": user['email'],
                "first_name": user['first_name'],
                "last_name": user['last_name'],
                "role": user['role']
            },
            token=token
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.post("/logout")
async def logout(response: Response):
    """Logout user"""
    response.delete_cookie(key="athlynx_token")
    return {"success": True, "message": "Logout successful"}

@router.get("/me")
async def get_current_user(athlynx_token: Optional[str] = Cookie(None)):
    """Get current authenticated user"""
    if not athlynx_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = verify_jwt_token(athlynx_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute(
            "SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = %s",
            (payload['user_id'],)
        )
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"success": True, "user": user}
        
    finally:
        cursor.close()
        conn.close()
