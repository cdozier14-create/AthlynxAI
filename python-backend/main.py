"""
ATHLYNX AI Platform - Python FastAPI Backend
Main Application Entry Point

@author ATHLYNX AI Corporation
@date January 8, 2026
"""

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routers import auth, verification, waitlist, feed, athlete, social, messages, notifications
from routers import transfer_portal, crm, stripe_router, vip

# Create FastAPI app
app = FastAPI(
    title="ATHLYNX API",
    description="ATHLYNX Corporation - Complete Athlete Ecosystem Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://athlynx.ai",
        "https://www.athlynx.ai",
        "https://athlynx.netlify.app",
        "https://*.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ATHLYNX API",
        "version": "1.0.0",
        "message": "Dreams Do Come True 2026"
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "ATHLYNX API - Corporation Launch 2026",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(verification.router, prefix="/api/verification", tags=["Verification"])
app.include_router(vip.router, prefix="/api/vip", tags=["VIP Codes"])
app.include_router(waitlist.router, prefix="/api/waitlist", tags=["Waitlist"])
app.include_router(feed.router, prefix="/api/feed", tags=["Social Feed"])
app.include_router(athlete.router, prefix="/api/athlete", tags=["Athletes"])
app.include_router(social.router, prefix="/api/social", tags=["Social"])
app.include_router(messages.router, prefix="/api/messages", tags=["Messages"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["Notifications"])
app.include_router(transfer_portal.router, prefix="/api/transfer-portal", tags=["Transfer Portal"])
app.include_router(crm.router, prefix="/api/crm", tags=["CRM & Analytics"])
app.include_router(stripe_router.router, prefix="/api/stripe", tags=["Payments"])

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "success": False}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    print(f"[ERROR] {exc}")
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "success": False}
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    print("🚀 ATHLYNX API Starting...")
    print("🦁 Dreams Do Come True 2026")
    print(f"📍 Environment: {os.getenv('ENVIRONMENT', 'development')}")
    print(f"🗄️  Database: {os.getenv('DATABASE_URL', 'Not configured')[:50]}...")

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    print("👋 ATHLYNX API Shutting down...")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )
