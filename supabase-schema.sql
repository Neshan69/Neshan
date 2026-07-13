-- Supabase SQL schema for messaging feature
-- Run this in the Supabase SQL Editor before using messaging.

-- Profiles: extend auth.users with app-specific fields
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text default 'user',
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Conversations
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.conversations enable row level security;

create policy "Users can view conversations they participate in"
  on public.conversations for select
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversations.id
        and cp.user_id = auth.uid()
    )
  );

create policy "Authenticated users can create conversations"
  on public.conversations for insert
  with check (auth.uid() is not null);

-- Conversation participants
create table if not exists public.conversation_participants (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()),
  last_read_at timestamp with time zone,
  unique(conversation_id, user_id)
);

alter table public.conversation_participants enable row level security;

create policy "Users can view their own memberships"
  on public.conversation_participants for select
  using (auth.uid() = user_id);

create policy "Authenticated users can join conversations"
  on public.conversation_participants for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own membership"
  on public.conversation_participants for update
  using (auth.uid() = user_id);

-- Messages
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations on delete cascade not null,
  sender_id uuid references auth.users on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.messages enable row level security;

create policy "Users can view messages in their conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
  );

create policy "Users can send messages to their conversations"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = messages.conversation_id
        and cp.user_id = auth.uid()
    )
    and auth.uid() = sender_id
  );

-- Notifications
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  message_id uuid references public.messages on delete cascade not null,
  type text default 'new_message',
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.notifications enable row level security;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "Authenticated users can create notifications"
  on public.notifications for insert
  with check (auth.uid() is not null);

-- Storage bucket for avatars (optional)
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Helper: ensure a profile row exists after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
