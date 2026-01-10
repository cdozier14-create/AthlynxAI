"""
ATHLYNX Database Module - Neon PostgreSQL
Database connection and operations

@author ATHLYNX AI Corporation
@date January 8, 2026
"""

import os
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from typing import Optional, Dict, List, Any
from contextlib import contextmanager

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL', '')

# Connection pool
pool: Optional[SimpleConnectionPool] = None

def init_db_pool():
    """Initialize database connection pool"""
    global pool
    if pool is None:
        pool = SimpleConnectionPool(
            minconn=1,
            maxconn=20,
            dsn=DATABASE_URL
        )
        print("✅ Database connection pool initialized")

@contextmanager
def get_db_connection():
    """Get database connection from pool"""
    if pool is None:
        init_db_pool()
    
    conn = pool.getconn()
    try:
        yield conn
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        pool.putconn(conn)

def execute_query(query: str, params: tuple = None, fetch_one: bool = False, fetch_all: bool = True) -> Any:
    """Execute a database query"""
    with get_db_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, params or ())
            
            if fetch_one:
                return dict(cursor.fetchone()) if cursor.rowcount > 0 else None
            elif fetch_all:
                return [dict(row) for row in cursor.fetchall()]
            else:
                return cursor.rowcount

def execute_many(query: str, params_list: List[tuple]) -> int:
    """Execute multiple queries"""
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.executemany(query, params_list)
            return cursor.rowcount

# ==================== USER OPERATIONS ====================

def get_user_by_email(email: str) -> Optional[Dict]:
    """Get user by email"""
    query = """
        SELECT * FROM users WHERE email = %s LIMIT 1
    """
    return execute_query(query, (email,), fetch_one=True)

def get_user_by_id(user_id: int) -> Optional[Dict]:
    """Get user by ID"""
    query = """
        SELECT * FROM users WHERE id = %s LIMIT 1
    """
    return execute_query(query, (user_id,), fetch_one=True)

def create_user(email: str, full_name: str, phone: Optional[str] = None, role: str = 'user') -> int:
    """Create a new user"""
    query = """
        INSERT INTO users (email, name, phone, role, created_at)
        VALUES (%s, %s, %s, %s, NOW())
        RETURNING id
    """
    result = execute_query(query, (email, full_name, phone, role), fetch_one=True)
    return result['id'] if result else None

# ==================== VERIFICATION OPERATIONS ====================

def save_verification_code(email: str, phone: Optional[str], code: str, code_type: str = 'signup') -> int:
    """Save verification code to database"""
    query = """
        INSERT INTO verification_codes (email, phone, code, type, verified, expires_at, created_at)
        VALUES (%s, %s, %s, %s, FALSE, NOW() + INTERVAL '10 minutes', NOW())
        RETURNING id
    """
    result = execute_query(query, (email, phone, code, code_type), fetch_one=True)
    return result['id'] if result else None

def get_verification_code(email: str, code: str) -> Optional[Dict]:
    """Get verification code"""
    query = """
        SELECT * FROM verification_codes
        WHERE email = %s AND code = %s AND verified = FALSE AND expires_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1
    """
    return execute_query(query, (email, code), fetch_one=True)

def mark_code_verified(code_id: int) -> bool:
    """Mark verification code as verified"""
    query = """
        UPDATE verification_codes
        SET verified = TRUE
        WHERE id = %s
    """
    return execute_query(query, (code_id,), fetch_all=False) > 0

# ==================== VIP CODE OPERATIONS ====================

def validate_vip_code(code: str) -> Optional[Dict]:
    """Validate VIP code"""
    query = """
        SELECT * FROM vip_codes
        WHERE code = %s AND active = TRUE AND (expires_at IS NULL OR expires_at > NOW())
        LIMIT 1
    """
    return execute_query(query, (code,), fetch_one=True)

def use_vip_code(code: str) -> bool:
    """Mark VIP code as used"""
    query = """
        UPDATE vip_codes
        SET uses = uses + 1
        WHERE code = %s
    """
    return execute_query(query, (code,), fetch_all=False) > 0

# ==================== WAITLIST OPERATIONS ====================

def add_to_waitlist(data: Dict) -> int:
    """Add user to waitlist"""
    query = """
        INSERT INTO waitlist (full_name, email, phone, role, sport, referral_code, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, NOW())
        RETURNING id
    """
    result = execute_query(
        query,
        (data['fullName'], data['email'], data.get('phone'), data['role'], data.get('sport'), data.get('referralCode')),
        fetch_one=True
    )
    return result['id'] if result else None

def get_waitlist_count() -> int:
    """Get total waitlist count"""
    query = "SELECT COUNT(*) as count FROM waitlist"
    result = execute_query(query, fetch_one=True)
    return result['count'] if result else 0

# ==================== TRANSFER PORTAL OPERATIONS ====================

def get_transfer_portal_players(filters: Dict = None) -> List[Dict]:
    """Get transfer portal players with filters"""
    query = """
        SELECT * FROM transfer_portal_players
        WHERE 1=1
    """
    params = []
    
    if filters:
        if filters.get('sport'):
            query += " AND sport = %s"
            params.append(filters['sport'])
        if filters.get('position'):
            query += " AND position = %s"
            params.append(filters['position'])
        if filters.get('status'):
            query += " AND status = %s"
            params.append(filters['status'])
    
    query += " ORDER BY rating DESC, nil_valuation DESC"
    query += f" LIMIT {filters.get('limit', 50)} OFFSET {filters.get('offset', 0)}"
    
    return execute_query(query, tuple(params))

# ==================== CRM OPERATIONS ====================

def track_signup(data: Dict) -> int:
    """Track signup in CRM"""
    query = """
        INSERT INTO signup_analytics (
            full_name, email, phone, role, sport,
            referral_source, utm_source, utm_medium, utm_campaign,
            signup_type, ip_address, user_agent, created_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
        RETURNING id
    """
    result = execute_query(
        query,
        (
            data.get('fullName'), data.get('email'), data.get('phone'),
            data.get('role'), data.get('sport'), data.get('referralSource'),
            data.get('utmSource'), data.get('utmMedium'), data.get('utmCampaign'),
            data.get('signupType'), data.get('ipAddress'), data.get('userAgent')
        ),
        fetch_one=True
    )
    return result['id'] if result else None

# Initialize database pool on module import
init_db_pool()
