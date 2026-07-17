-- =====================================================================
-- Supabase schema mirror for the Neshan Niroula portfolio messaging
-- =====================================================================
-- AUTHORITATIVE SOURCE: the timestamped files in supabase/migrations/.
-- This file is kept in sync with them for reference only.
-- Apply changes via new migrations, not by re-running this file.
-- Run in the Supabase SQL Editor.
-- =====================================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. Profiles (extends auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  role text not null default 'user'::text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own non-role profile."
  on public.profiles for update
  using ( auth.uid() = id )
  with check ( role = ( select role from public.profiles where id = auth.uid() ) );

-- ----------------------------------------------------------------------------
-- 2. Conversations
-- ----------------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  admin_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active'::text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  unique(user_id, admin_id)
);

alter table public.conversations enable row level security;

create policy "Users can view their own conversations."
  on public.conversations for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Users can create conversations."
  on public.conversations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own conversation status."
  on public.conversations for update
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ----------------------------------------------------------------------------
-- 3. Messages
-- ----------------------------------------------------------------------------
create table if not exists public.messages (
  id uuid not null default gen_random_uuid() primary key,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.messages enable row level security;

create policy "Users can view messages in their conversations."
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  );

create policy "Users can send messages to their conversations."
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  );

create policy "Users can update read status of messages in their conversations."
  on public.messages for update
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (c.user_id = auth.uid() or c.admin_id = auth.uid())
    )
  );

-- ----------------------------------------------------------------------------
-- 4. Realtime
-- ----------------------------------------------------------------------------
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;

-- ----------------------------------------------------------------------------
-- 5. Helper: ensure a profile row exists after signup
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email, role, created_at, updated_at)
  values (new.id, new.email, 'user', now(), now())
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
