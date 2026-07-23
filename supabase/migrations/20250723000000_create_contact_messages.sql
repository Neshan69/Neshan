-- Create contact_messages table for public contact form submissions
create table if not exists public.contact_messages (
  id uuid not null default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

alter table public.contact_messages enable row level security;

-- Allow public to insert their own contact messages
create policy "Anyone can submit contact messages."
  on public.contact_messages for insert
  with check ( true );

-- Admins can view all contact messages
create policy "Admins can view all contact messages."
  on public.contact_messages for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
