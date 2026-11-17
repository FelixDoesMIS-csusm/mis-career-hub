-- Run this AFTER you create your user in Supabase > Authentication > Users.
-- Replace the email with the one you used, then click Run.

insert into public.admins (user_id)
select id from auth.users where email = 'feliixrgross@gmail.com';

-- Check it worked (should return one row with your email):
select u.email, a.added_at
from public.admins a join auth.users u on u.id = a.user_id;
