-- ============================================================
-- Messaging database schema for Neshan Niroula | Portfolio
-- Paste this into Supabase SQL Editor.
-- ============================================================

-- UUID extension for gen_random_uuid()
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1. Profiles
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  role text default 'user'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );


-- ------------------------------------------------------------
-- 2. Conversations
-- ------------------------------------------------------------
create table if not exists public.conversations (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.conversations enable row level security;

create policy "Users can view conversations they participate in."
  on conversations for select
  using (
    exists (
      select 1 from public.conversation_participants
      where conversation_participants.conversation_id = conversations.id
        and conversation_participants.user_id = auth.uid()
    )
  );

create policy "Users can create conversations."
  on conversations for insert
  with check ( true );


-- ------------------------------------------------------------
-- 3. Conversation Participants (join table)
-- ------------------------------------------------------------
create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_read_at timestamp with time zone,
  primary key (conversation_id, user_id)
);

alter table public.conversation_participants enable row level security;

create policy "Users can view participants in their conversations."
  on conversation_participants for select
  using (
    exists (
      select 1 from public.conversation_participants as cp
      where cp.conversation_id = conversation_participants.conversation_id
        and cp.user_id = auth.uid()
    )
  );

create policy "Users can join conversations."
  on conversation_participants for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own participation."
  on conversation_participants for update
  using ( auth.uid() = user_id );


-- ------------------------------------------------------------
-- 4. Messages
-- ------------------------------------------------------------
create table if not exists public.messages (
  id uuid not null default gen_random_uuid() primary key,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;

create policy "Participants can view messages."
  on messages for select
  using (
    exists (
      select 1 from public.conversation_participants
      where conversation_participants.conversation_id = messages.conversation_id
        and conversation_participants.user_id = auth.uid()
    )
  );

create policy "Participants can send messages."
  on messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversation_participants
      where conversation_participants.conversation_id = messages.conversation_id
        and conversation_participants.user_id = auth.uid()
    )
  );


-- ------------------------------------------------------------
-- 5. Notifications
-- ------------------------------------------------------------
create table if not exists public.notifications (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  message_id uuid references public.messages(id) on delete cascade,
  type text not null default 'new_message'::text,
  read boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications."
  on notifications for select
  using ( auth.uid() = user_id );

create policy "System can insert notifications."
  on notifications for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own notifications."
  on notifications for update
  using ( auth.uid() = user_id );
