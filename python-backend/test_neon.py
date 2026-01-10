import psycopg2

# NEON connection - will try passwordless first
DATABASE_URL = "postgresql://neondb_owner@ep-misty-glade-aeu51x06.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"

try:
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ Connected to NEON successfully!")
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print(f"PostgreSQL version: {version[0]}")
    conn.close()
except Exception as e:
    print(f"❌ Connection failed: {e}")
