-- SkewX Leads Table  ─  skewx_leads
-- ────────────────────────────────────
-- Run this in Supabase SQL Editor if the table doesn't exist yet,
-- or compare with your existing table to ensure columns match.

create table if not exists public.skewx_leads (
  id          uuid                     default gen_random_uuid() primary key,
  created_at  timestamp with time zone default now(),

  -- Contact info (filled as user provides them in chat)
  session_id  text,
  name        text,
  email       text,
  phone       text,
  company     text,
  message     text,

  -- Dialogflow metadata
  intent      text,        -- e.g. "Book Demo", "Collect Lead"
  source      text         default 'chatbot',
  status      text         default 'new',   -- new | contacted | converted | closed

  -- Full Dialogflow params stored as JSON (for future reference)
  parameters  jsonb
);

-- Optional: unique constraint on session_id so upsert works cleanly
-- (comment this out if you prefer multiple rows per session)
alter table public.skewx_leads
  add constraint skewx_leads_session_id_key unique (session_id);

-- Index for fast lookups by email and status
create index if not exists idx_skewx_leads_email   on public.skewx_leads (email);
create index if not exists idx_skewx_leads_status  on public.skewx_leads (status);
create index if not exists idx_skewx_leads_created on public.skewx_leads (created_at desc);

-- Optional: Row Level Security
-- The backend uses service_role key so it bypasses RLS.
-- Enable RLS to protect the table from public anon access.
alter table public.skewx_leads enable row level security;

-- Only the service role (backend) can read/write
-- (no policy = public anon access is blocked, service_role still works)
