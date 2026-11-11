-- TB GUITARES : catalogue et administrateurs
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.guitars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand text not null,
  name text not null,
  type text not null default 'Électrique',
  price numeric(12,2) not null default 0 check (price >= 0),
  year text,
  condition text,
  status text not null default 'Disponible' check (status in ('Disponible','Réservée','Vendue')),
  description text,
  details text[] not null default '{}',
  image_url text,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists guitars_updated_at on public.guitars;
create trigger guitars_updated_at before update on public.guitars
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.guitars enable row level security;

drop policy if exists "Admins can read admin list" on public.admin_users;
create policy "Admins can read admin list" on public.admin_users
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Public can read guitars" on public.guitars;
create policy "Public can read guitars" on public.guitars
for select to anon, authenticated using (true);

drop policy if exists "Admins can insert guitars" on public.guitars;
create policy "Admins can insert guitars" on public.guitars
for insert to authenticated with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can update guitars" on public.guitars;
create policy "Admins can update guitars" on public.guitars
for update to authenticated using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can delete guitars" on public.guitars;
create policy "Admins can delete guitars" on public.guitars
for delete to authenticated using (exists (select 1 from public.admin_users where user_id = auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guitar-photos', 'guitar-photos', true, 10485760, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "Public can view guitar photos" on storage.objects;
create policy "Public can view guitar photos" on storage.objects for select
using (bucket_id = 'guitar-photos');

drop policy if exists "Admins can upload guitar photos" on storage.objects;
create policy "Admins can upload guitar photos" on storage.objects for insert to authenticated
with check (bucket_id = 'guitar-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can update guitar photos" on storage.objects;
create policy "Admins can update guitar photos" on storage.objects for update to authenticated
using (bucket_id = 'guitar-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can delete guitar photos" on storage.objects;
create policy "Admins can delete guitar photos" on storage.objects for delete to authenticated
using (bucket_id = 'guitar-photos' and exists (select 1 from public.admin_users where user_id = auth.uid()));
