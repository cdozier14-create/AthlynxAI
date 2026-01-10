"""
ATHLYNX AI Platform - Transfer Portal Router
"""
from fastapi import APIRouter, HTTPException
from typing import Optional
from database import get_db_connection

router = APIRouter(prefix="/transfer-portal", tags=["Transfer Portal"])

@router.get("/players")
async def get_transfer_players(
    sport: Optional[str] = None,
    position: Optional[str] = None,
    school: Optional[str] = None,
    min_rating: Optional[int] = None,
    limit: int = 20
):
    """Get transfer portal players"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        query = """
            SELECT 
                id, name, sport, position, current_school, stars, height, weight,
                nil_value, grad_year, status, entered_portal_date
            FROM transfer_portal_players
            WHERE status = 'active'
        """
        params = []
        
        if sport:
            query += " AND sport = %s"
            params.append(sport)
        if position:
            query += " AND position = %s"
            params.append(position)
        if school:
            query += " AND current_school LIKE %s"
            params.append(f"%{school}%")
        if min_rating:
            query += " AND stars >= %s"
            params.append(min_rating)
        
        query += " ORDER BY stars DESC, nil_value DESC LIMIT %s"
        params.append(limit)
        
        cursor.execute(query, params)
        players = cursor.fetchall()
        
        return {"success": True, "players": players}
        
    finally:
        cursor.close()
        conn.close()

@router.get("/player/{player_id}")
async def get_transfer_player(player_id: int):
    """Get single transfer portal player"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT *
            FROM transfer_portal_players
            WHERE id = %s
        """, (player_id,))
        
        player = cursor.fetchone()
        if not player:
            raise HTTPException(status_code=404, detail="Player not found")
        
        return {"success": True, "player": player}
        
    finally:
        cursor.close()
        conn.close()

@router.get("/stats")
async def get_transfer_portal_stats():
    """Get transfer portal statistics"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Total players
        cursor.execute("SELECT COUNT(*) as total FROM transfer_portal_players WHERE status = 'active'")
        total = cursor.fetchone()['total']
        
        # By sport
        cursor.execute("""
            SELECT sport, COUNT(*) as count
            FROM transfer_portal_players
            WHERE status = 'active'
            GROUP BY sport
        """)
        by_sport = cursor.fetchall()
        
        # By position
        cursor.execute("""
            SELECT position, COUNT(*) as count
            FROM transfer_portal_players
            WHERE status = 'active'
            GROUP BY position
            ORDER BY count DESC
            LIMIT 10
        """)
        by_position = cursor.fetchall()
        
        return {
            "success": True,
            "total": total,
            "by_sport": by_sport,
            "by_position": by_position
        }
        
    finally:
        cursor.close()
        conn.close()
