# 🚂 RAILWAY DEPLOYMENT GUIDE - ATHLYNX TRIPLE-CHANNEL

## Quick Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm i -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Initialize Project
```bash
cd /path/to/athlynx-multi-channel
railway init
```

### Step 4: Add Environment Variables
```bash
railway variables set TWILIO_ACCOUNT_SID=your_twilio_account_sid
railway variables set TWILIO_AUTH_TOKEN=your_twilio_auth_token
railway variables set TWILIO_PHONE_NUMBER=your_twilio_phone_number
railway variables set RESEND_API_KEY=your_resend_api_key
railway variables set DATABASE_URL=your_neon_database_url
```

### Step 5: Deploy
```bash
railway up
```

### Step 6: Get Your URLs
```bash
railway domain
```

You'll get two URLs:
- Main API: `https://your-app.up.railway.app`
- WhatsApp Webhook: `https://your-app.up.railway.app/webhook/whatsapp`

### Step 7: Configure Twilio WhatsApp Webhook
1. Go to: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
2. Set webhook URL: `https://your-app.up.railway.app/webhook/whatsapp`
3. Method: POST

## Environment Variables Required

```
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
RESEND_API_KEY=your_resend_api_key
DATABASE_URL=postgresql://user:password@host:5432/database
WEBHOOK_SECRET=athlynx_webhook_secret_2026
```

## Testing

### Test Main API
```bash
curl https://your-app.up.railway.app/health
```

### Test WhatsApp Webhook
```bash
curl -X POST https://your-app.up.railway.app/webhook/whatsapp \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=whatsapp:+16014985282&Body=123456"
```

## Monitoring

```bash
# View logs
railway logs

# View service status
railway status
```

## 🦁 DONE!

Your triple-channel verification system is now LIVE on Railway!
