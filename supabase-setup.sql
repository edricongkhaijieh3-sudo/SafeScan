-- Run this in your Supabase SQL Editor to create the required tables

-- Waitlist signups (hero + final CTA + survey)
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  created_at timestamptz default now()
);

-- Survey responses (customer development)
create table if not exists survey_responses (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  q1_link_frequency text,
  q2_current_behavior text,
  q3_willingness_to_pay text,
  feedback text,
  created_at timestamptz default now()
);

-- Optional: unique constraint to avoid duplicate waitlist emails
-- alter table waitlist add constraint waitlist_email_unique unique (email);
