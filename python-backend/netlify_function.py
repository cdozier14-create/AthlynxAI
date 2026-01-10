"""
Netlify Function wrapper for FastAPI
"""
from mangum import Mangum
from main import app

# Create Mangum handler for Netlify Functions
handler = Mangum(app, lifespan="off")
