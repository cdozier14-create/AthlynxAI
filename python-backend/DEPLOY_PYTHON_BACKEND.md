# ATHLYNX Python Backend Deployment Guide

## 🚀 Deploy to Render.com (RECOMMENDED)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Connect your GitHub repository: `cdozier14-create/Athlynx.ai`

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect repository: `cdozier14-create/Athlynx.ai`
3. Configure service:
   - **Name:** `athlynx-api`
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Root Directory:** `python-backend`
   - **Runtime:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free (or Starter $7/month for better performance)

### Step 3: Add Environment Variables
In Render dashboard, add these environment variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_8rFswVRXCg0c@ep-bold-bar-aegw1i6x-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require

AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_REGION=us-east-2
SES_SENDER_EMAIL=noreply@athlynx.ai

SNS_PHONE_NUMBER=+16014985282

STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>

ENVIRONMENT=production
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes)
3. Your API will be live at: `https://athlynx-api.onrender.com`

### Step 5: Update Frontend
Update React frontend to use new API URL:
- In Netlify environment variables, add:
  ```
  VITE_API_URL=https://athlynx-api.onrender.com
  ```

---

## 🔄 Alternative: Deploy to Railway.app

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub account

### Step 2: Deploy from GitHub
1. Click "New Project" → "Deploy from GitHub repo"
2. Select `cdozier14-create/Athlynx.ai`
3. Railway auto-detects Python and deploys

### Step 3: Configure
1. Set root directory: `python-backend`
2. Add environment variables (same as above)
3. Deploy

Your API will be live at: `https://athlynx-api.up.railway.app`

---

## 🏗️ Architecture

```
React Frontend (Netlify)
    ↓
    https://athlynx.ai
    ↓
Python FastAPI Backend (Render/Railway)
    ↓
    https://athlynx-api.onrender.com
    ↓
NEON PostgreSQL Database
    ↓
    ep-bold-bar-aegw1i6x-pooler.us-east-2.aws.neon.tech
```

---

## ✅ Verify Deployment

### Test Health Endpoint
```bash
curl https://athlynx-api.onrender.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "ATHLYNX API",
  "version": "1.0.0",
  "message": "Dreams Do Come True 2026"
}
```

### Test API Documentation
Visit: `https://athlynx-api.onrender.com/api/docs`

---

## 📊 Monitoring

- **Render Dashboard:** https://dashboard.render.com
- **Logs:** View real-time logs in Render dashboard
- **Metrics:** CPU, Memory, Response time

---

## 🔒 Security

- ✅ HTTPS enabled by default
- ✅ Environment variables encrypted
- ✅ NEON database with SSL
- ✅ CORS configured for athlynx.ai only

---

## 💰 Cost

**Render Free Tier:**
- ✅ 750 hours/month free
- ✅ Sleeps after 15 min inactivity
- ✅ Wakes up on request (cold start ~30s)

**Render Starter ($7/month):**
- ✅ Always on
- ✅ No cold starts
- ✅ Better performance

**Railway:**
- ✅ $5 free credit/month
- ✅ Pay as you go after

---

## 🦁 Dreams Do Come True 2026!
