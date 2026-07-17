# SkewX - Backend Server

Handles Dialogflow proxy, webhook fulfillment, and Supabase lead capture.

---

## Quick Start

### 1. Place your service account JSON
```
backend/
└── service-account.json   ← your Google Cloud key
```

### 2. Add your Supabase service role key to backend/.env
```
SUPABASE_URL=https://bwuvztyurzgsurpqanyo.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...   ← from Supabase → Settings → API → service_role
```
> ⚠️  This is NOT the same as the anon key in your frontend .env

### 3. Install and run
```powershell
cd backend
npm install
node server.js
```

### 4. Run frontend in a second terminal
```powershell
cd ..
npm run dev
```

---

## Endpoints

| Route | Caller | Purpose |
|-------|--------|---------|
| `POST /chat` | React widget | Send user message → get Dialogflow reply |
| `POST /webhook` | Dialogflow | Fulfillment + save lead to Supabase |
| `GET /health` | You | Check everything is connected |

---

## Webhook Setup (Dialogflow Console)

The `/webhook` endpoint lets Dialogflow call YOUR server when specific
intents fire. This is how leads get saved to Supabase.

### Step 1 - Expose your local server
For local development, Dialogflow needs a public URL.
Use ngrok:
```powershell
# Install once
npm install -g ngrok

# Run (while backend is running)
ngrok http 3001
```
Copy the `https://xxxx.ngrok.io` URL.

### Step 2 - Enable fulfillment in Dialogflow
1. Dialogflow Console → **Fulfillment** (left sidebar)
2. Toggle **Webhook** → **Enabled**
3. URL: `https://xxxx.ngrok.io/webhook`
4. Save

### Step 3 - Enable webhook on each intent
For each intent you want to capture leads from:
1. Open the intent
2. Scroll to **Fulfillment** section at the bottom
3. Toggle **"Enable webhook call for this intent"** ✓
4. Save

### Which intents should have webhook enabled?
Add/edit intent names in `backend/webhookHandler.js` → `INTENT_CONFIG`:
- `Collect Lead`
- `Book Demo`
- `Provide Email`
- `Request Callback`
- `Get Pricing`

Match these to your actual intent **display names** in Dialogflow.

---

## How leads flow into Supabase

```
User types in chat
  → POST /chat → Dialogflow detects intent
    → Dialogflow calls POST /webhook (if enabled for that intent)
      → webhookHandler.js extracts: name, email, phone, company
        → supabaseClient.js inserts into skewx_leads table
          → returns fulfillment text → back to Dialogflow → back to browser
```

---

## Supabase table

Your `skewx_leads` table should have these columns:

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | auto |
| `created_at` | timestamptz | auto |
| `session_id` | text | unique per chat session |
| `name` | text | |
| `email` | text | |
| `phone` | text | |
| `company` | text | |
| `message` | text | |
| `intent` | text | Dialogflow intent name |
| `source` | text | default: 'chatbot' |
| `status` | text | default: 'new' |
| `parameters` | jsonb | full Dialogflow params |

If your table is missing columns, run `skewx_leads_schema.sql`
in Supabase SQL Editor.

---

## Verify everything works

**1. Health check:**
```
http://localhost:3001/health
```
Expected: `{ "status": "ok", "supabase": true, "project": "your-id" }`

**2. Test webhook with curl:**
```powershell
curl -X POST http://localhost:3001/webhook `
  -H "Content-Type: application/json" `
  -d "{\"queryResult\":{\"queryText\":\"book a demo\",\"parameters\":{\"email\":\"test@example.com\"},\"intent\":{\"displayName\":\"Book Demo\"},\"intentDetectionConfidence\":0.95},\"session\":\"projects/x/agent/sessions/test-session-1\"}"
```
Check your Supabase `skewx_leads` table - a new row should appear.

---

## Production deployment

When deploying to Cloud Run / App Engine:
1. Upload `service-account.json` via Secret Manager
2. Set env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `FRONTEND_URL`
3. Update Dialogflow webhook URL to your Cloud Run URL
4. Update `VITE_DIALOGFLOW_ENDPOINT` in frontend to your Cloud Run URL
