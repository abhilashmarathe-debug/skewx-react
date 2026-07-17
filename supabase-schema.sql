-- ============================================================
-- SkewX Technology - Supabase schema
-- ============================================================
-- Paste this whole file into:
--   Supabase Dashboard → SQL Editor → New Query → Run
--
-- Creates 5 tables matching the original Django models, plus
-- Row Level Security policies that allow ANONYMOUS INSERTS only
-- (so the public website can submit forms but nobody can read
-- them except you when logged into the Supabase dashboard).
-- ============================================================

-- ---------- DEMO REQUESTS ----------
create table if not exists demo_requests (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text not null,
  size        text default '',
  interest    text default '',
  timezone    text default '',
  message     text default '',
  created_at  timestamptz not null default now()
);

-- ---------- ROI REPORTS ----------
create table if not exists roi_reports (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text not null,
  industry    text default '',
  roi_total   text default '',
  roi_manual  text default '',
  roi_error   text default '',
  roi_net     text default '',
  created_at  timestamptz not null default now()
);

-- ---------- GET STARTED ----------
create table if not exists get_started (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text not null,
  size        text default '',
  billing     text default '',
  currency    text default '',
  usecase     text default '',
  created_at  timestamptz not null default now()
);

-- ---------- SALES CONTACTS ----------
create table if not exists sales_contacts (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text not null,
  title       text default '',
  size        text default '',
  budget      text default '',
  region      text default '',
  deploy      text default '',
  message     text default '',
  created_at  timestamptz not null default now()
);

-- ---------- CONTACT FORMS ----------
create table if not exists contact_forms (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  company     text default '',
  size        text default '',
  region      text default '',
  budget      text default '',
  usecase     text default '',
  message     text default '',
  created_at  timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Anonymous users can only INSERT (submit forms).
-- They cannot SELECT, UPDATE, or DELETE.
-- You (logged into the Supabase dashboard) see everything.
-- ============================================================

alter table demo_requests   enable row level security;
alter table roi_reports     enable row level security;
alter table get_started     enable row level security;
alter table sales_contacts  enable row level security;
alter table contact_forms   enable row level security;

create policy "anon insert demo"     on demo_requests   for insert to anon with check (true);
create policy "anon insert roi"      on roi_reports     for insert to anon with check (true);
create policy "anon insert started"  on get_started     for insert to anon with check (true);
create policy "anon insert sales"    on sales_contacts  for insert to anon with check (true);
create policy "anon insert contact"  on contact_forms   for insert to anon with check (true);
