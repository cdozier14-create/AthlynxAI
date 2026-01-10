"""
Netlify Serverless Function - Waitlist Signup
"""
import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event, context):
    # CORS headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    }
    
    # Handle OPTIONS request
    if event['httpMethod'] == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': ''
        }
    
    # Only allow POST
    if event['httpMethod'] != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        
        # Get database connection
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        # Insert into waitlist
        query = """
            INSERT INTO waitlist (full_name, email, phone, role, sport, created_at)
            VALUES (%s, %s, %s, %s, %s, NOW())
            RETURNING id
        """
        cursor.execute(query, (
            body.get('name'),
            body.get('email'),
            body.get('phone'),
            body.get('role'),
            body.get('sport')
        ))
        
        result = cursor.fetchone()
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'message': 'Successfully joined waitlist!',
                'id': result['id']
            })
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }
