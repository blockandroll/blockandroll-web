-- Enums
create type user_role as enum ('admin', 'coach', 'player');
create type class_level as enum ('beginner', 'intermediate', 'advanced');
create type class_status as enum ('active', 'full', 'finished');
create type enrollment_status as enum ('active', 'completed', 'cancelled');
create type resource_type as enum ('video', 'pdf', 'link', 'image');
create type resource_level as enum ('all', 'beginner', 'intermediate', 'advanced');

-- Profiles (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  avatar_url text,
  role user_role not null default 'player',
  phone text,
  bio text,
  created_at timestamptz default now()
);

-- Classes
create table classes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level class_level not null,
  instructor_id uuid references profiles(id),
  location text,
  capacity int,
  status class_status not null default 'active',
  starts_at timestamptz,
  created_at timestamptz default now()
);

-- Enrollments
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  player_id uuid references profiles(id) on delete cascade,
  status enrollment_status not null default 'active',
  enrolled_at timestamptz default now(),
  unique(class_id, player_id)
);

-- Coach notes
create table coach_notes (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references profiles(id) on delete cascade,
  coach_id uuid references profiles(id) on delete cascade,
  class_id uuid references classes(id) on delete set null,
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- News posts
create table news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  external_url text,
  thumbnail_url text,
  author_id uuid references profiles(id),
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Resources
create table resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type resource_type not null,
  url text not null,
  category text,
  level resource_level not null default 'all',
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- Trigger: auto-create profile row when a user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Enable Row Level Security on all tables
alter table profiles enable row level security;
alter table classes enable row level security;
alter table enrollments enable row level security;
alter table coach_notes enable row level security;
alter table news_posts enable row level security;
alter table resources enable row level security;

-- RLS Policies

-- profiles: anyone can read, users update their own
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- classes: anyone can read, coaches/admins manage
create policy "classes_select" on classes for select using (true);
create policy "classes_insert" on classes for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "classes_update" on classes for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "classes_delete" on classes for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- enrollments: players see their own, coaches/admins see all
create policy "enrollments_select" on enrollments for select using (
  player_id = auth.uid() or
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "enrollments_insert" on enrollments for insert with check (
  player_id = auth.uid() or
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "enrollments_update" on enrollments for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);

-- coach_notes: players read their own, coaches read/write their own notes, admins all
create policy "coach_notes_select" on coach_notes for select using (
  player_id = auth.uid() or
  coach_id = auth.uid() or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "coach_notes_insert" on coach_notes for insert with check (
  coach_id = auth.uid() and
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "coach_notes_update" on coach_notes for update using (
  coach_id = auth.uid() and
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "coach_notes_delete" on coach_notes for delete using (
  coach_id = auth.uid() or
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- news_posts: published posts are public, drafts visible to coaches/admins only
create policy "news_posts_select" on news_posts for select using (
  is_published = true or
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "news_posts_insert" on news_posts for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "news_posts_update" on news_posts for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "news_posts_delete" on news_posts for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- resources: logged-in users read, coaches/admins manage
create policy "resources_select" on resources for select using (auth.uid() is not null);
create policy "resources_insert" on resources for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "resources_update" on resources for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'coach'))
);
create policy "resources_delete" on resources for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
