drop policy if exists "Users can view participants in their conversations." on public.conversation_participants;

create policy "Users can view their own membership."
  on public.conversation_participants for select
  using ( auth.uid() = user_id );

create policy "Admins can view all participants."
  on public.conversation_participants for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
