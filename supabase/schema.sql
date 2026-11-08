-- ==============================================================================
-- TopQ Academy - Supabase Database Schema (Idempotent & Safe to Run Multiple Times)
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. LEADS TABLE (LeadCaptureForm)
create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    course text not null,
    experience text not null default 'beginner',
    created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
drop policy if exists "Allow public lead submissions" on public.leads;
create policy "Allow public lead submissions"
on public.leads for insert to anon, authenticated
with check (true);

drop policy if exists "Allow authenticated users to read leads" on public.leads;
create policy "Allow authenticated users to read leads"
on public.leads for select to anon, authenticated
using (true);

create index if not exists idx_leads_created_at on public.leads (created_at desc);


-- 2. GUIDANCE REQUESTS TABLE (GuidanceModal)
create table if not exists public.guidance_requests (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    phone text not null,
    email text,
    track text not null,
    learning_mode text not null default 'online',
    created_at timestamptz not null default now()
);

alter table public.guidance_requests enable row level security;
drop policy if exists "Allow public guidance submissions" on public.guidance_requests;
create policy "Allow public guidance submissions"
on public.guidance_requests for insert to anon, authenticated
with check (true);

drop policy if exists "Allow authenticated users to read guidance requests" on public.guidance_requests;
create policy "Allow authenticated users to read guidance requests"
on public.guidance_requests for select to anon, authenticated
using (true);

create index if not exists idx_guidance_created_at on public.guidance_requests (created_at desc);


-- 3. COURSE ENROLLMENTS TABLE (Students who enroll in courses)
create table if not exists public.course_enrollments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid,
    user_name text not null,
    user_email text not null,
    user_phone text not null,
    course_track text not null,
    learning_mode text not null default 'online',
    experience text not null default 'beginner',
    status text not null default 'confirmed',
    created_at timestamptz not null default now()
);

alter table public.course_enrollments enable row level security;
drop policy if exists "Allow public course enrollments" on public.course_enrollments;
create policy "Allow public course enrollments"
on public.course_enrollments for insert to anon, authenticated
with check (true);

drop policy if exists "Allow public read course enrollments" on public.course_enrollments;
create policy "Allow public read course enrollments"
on public.course_enrollments for select to anon, authenticated
using (true);

create index if not exists idx_enrollments_created_at on public.course_enrollments (created_at desc);


-- 4. USER REGISTRATIONS TABLE (Student & Admin Accounts)
create table if not exists public.user_registrations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null unique,
    phone text,
    role text not null default 'student',
    last_login timestamptz default now(),
    created_at timestamptz not null default now()
);

alter table public.user_registrations enable row level security;
drop policy if exists "Allow public registration insert" on public.user_registrations;
create policy "Allow public registration insert"
on public.user_registrations for insert to anon, authenticated
with check (true);

drop policy if exists "Allow user profile updates" on public.user_registrations;
create policy "Allow user profile updates"
on public.user_registrations for update to anon, authenticated
using (true) with check (true);

drop policy if exists "Allow user read" on public.user_registrations;
create policy "Allow user read"
on public.user_registrations for select to anon, authenticated
using (true);

create index if not exists idx_user_reg_created_at on public.user_registrations (created_at desc);


-- 5. INDUSTRY INSIGHTS TABLE (Dynamic research & market signals)
create table if not exists public.insights (
    id uuid primary key default gen_random_uuid(),
    org text not null,
    report text not null,
    title text not null,
    summary text not null,
    stat text not null,
    created_at timestamptz not null default now()
);

alter table public.insights enable row level security;
drop policy if exists "Allow public read access to insights" on public.insights;
create policy "Allow public read access to insights"
on public.insights for select to anon, authenticated
using (true);

create index if not exists idx_insights_created_at on public.insights (created_at desc);
