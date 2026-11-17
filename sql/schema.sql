-- MIS Career Hub: database tables and security rules.
-- Paste this whole file into Supabase > SQL Editor > New query, then click Run.
--
-- Security model (Row Level Security):
--   * Anyone can READ careers and resources (the public preview page).
--   * Anyone can SEND a contact message, but only admins can read or delete messages.
--   * Only users listed in public.admins can add, edit or delete content.

-- 1. Admins ---------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies on purpose: the admins list can only be changed in the SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- 2. Careers --------------------------------------------------------------
create table if not exists public.careers (
  id bigint generated always as identity primary key,
  slug text unique,
  name text not null check (char_length(name) between 1 and 120),
  tagline text,
  description text,
  weekly_tasks text,        -- one item per line
  entry_titles text,        -- one item per line
  leads_to text,            -- one item per line
  skills text,              -- one item per line
  certs_now text,           -- one item per line
  certs_later text,         -- one item per line
  outlook_occupation text,
  growth text,
  median_pay text,
  outlook_url text,
  ai_note text,
  starter_project text,
  sort_order int not null default 100,
  updated_at timestamptz not null default now()
);
alter table public.careers enable row level security;

create policy "Anyone can read careers" on public.careers
  for select to anon, authenticated using (true);
create policy "Admins can add careers" on public.careers
  for insert to authenticated with check (public.is_admin());
create policy "Admins can edit careers" on public.careers
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete careers" on public.careers
  for delete to authenticated using (public.is_admin());

-- 3. Resources ------------------------------------------------------------
create table if not exists public.resources (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 120),
  category text,
  description text,
  eligibility text,
  how_to_get text,
  url text,
  sort_order int not null default 100,
  updated_at timestamptz not null default now()
);
alter table public.resources enable row level security;

create policy "Anyone can read resources" on public.resources
  for select to anon, authenticated using (true);
create policy "Admins can add resources" on public.resources
  for insert to authenticated with check (public.is_admin());
create policy "Admins can edit resources" on public.resources
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete resources" on public.resources
  for delete to authenticated using (public.is_admin());

-- 4. Contact messages -----------------------------------------------------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 200),
  topic text check (char_length(topic) <= 60),
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;

create policy "Anyone can send a message" on public.messages
  for insert to anon, authenticated with check (true);
create policy "Admins can read messages" on public.messages
  for select to authenticated using (public.is_admin());
create policy "Admins can delete messages" on public.messages
  for delete to authenticated using (public.is_admin());

-- 5. Keep updated_at current ----------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists careers_touch on public.careers;
create trigger careers_touch before update on public.careers
  for each row execute function public.touch_updated_at();

drop trigger if exists resources_touch on public.resources;
create trigger resources_touch before update on public.resources
  for each row execute function public.touch_updated_at();
