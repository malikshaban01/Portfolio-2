-- ============================================================
-- Portfolio database setup  (Supabase Dashboard > SQL Editor)
-- Safe to re-run: tables use IF NOT EXISTS, seed data only
-- loads into empty tables.
-- ============================================================

-- ---------- Tables ----------
create table if not exists public.skill_categories (
  id bigint generated always as identity primary key,
  name text not null,
  icon text not null default '•',
  order_index int not null default 0
);

create table if not exists public.skills (
  id bigint generated always as identity primary key,
  category_id bigint not null references public.skill_categories(id) on delete cascade,
  name text not null
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  tech text[] not null default '{}',
  github_url text not null default '',
  featured boolean not null default false,
  order_index int not null default 0
);

create table if not exists public.experience (
  id bigint generated always as identity primary key,
  role text not null,
  company text not null,
  period text not null,
  bullets text[] not null default '{}',
  order_index int not null default 0
);

create table if not exists public.education (
  id bigint generated always as identity primary key,
  degree text not null,
  institution text not null,
  period text not null,
  details text not null default '',
  coursework text[] not null default '{}',
  order_index int not null default 0
);

create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.resume (
  id bigint generated always as identity primary key,
  filename text not null,
  storage_path text not null,
  url text not null,
  uploaded_at timestamptz not null default now()
);

-- ---------- Security ----------
-- Row Level Security ON with no public policies: the browser's public key
-- can read/write nothing. Only the server (service role key) can, via /api.
alter table public.skill_categories enable row level security;
alter table public.skills           enable row level security;
alter table public.projects         enable row level security;
alter table public.experience       enable row level security;
alter table public.education        enable row level security;
alter table public.messages         enable row level security;
alter table public.resume           enable row level security;

-- ---------- Storage bucket for resume PDFs (public download) ----------
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- ---------- Seed data (from resume) ----------
do $$
declare c bigint;
begin
  if not exists (select 1 from public.skill_categories) then

    insert into public.skill_categories (name, icon, order_index) values ('Programming', '💻', 1) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'C++'),(c,'Object-Oriented Programming'),(c,'File Handling'),(c,'String Processing');

    insert into public.skill_categories (name, icon, order_index) values ('Computer Science', '🧠', 2) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'Data Structures'),(c,'Algorithms'),(c,'Linked Lists'),(c,'Stacks'),(c,'Queues'),(c,'Trees'),(c,'Sorting'),(c,'Searching');

    insert into public.skill_categories (name, icon, order_index) values ('Database', '🗄️', 3) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'SQL'),(c,'MySQL Workbench'),(c,'Database Design'),(c,'ER Diagrams'),(c,'Normalization'),(c,'Relational Schema Design');

    insert into public.skill_categories (name, icon, order_index) values ('DevOps & Cloud', '☁️', 4) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'Linux'),(c,'Shell Scripting'),(c,'Docker'),(c,'Git'),(c,'GitHub'),(c,'CI/CD Pipelines'),(c,'AWS Basics'),(c,'CI/CD on AWS');

    insert into public.skill_categories (name, icon, order_index) values ('Tools', '🛠️', 5) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'Visual Studio IDE'),(c,'Linux Terminal'),(c,'Docker'),(c,'Git / GitHub'),(c,'AWS Console');

    insert into public.skill_categories (name, icon, order_index) values ('Professional Skills', '🤝', 6) returning id into c;
    insert into public.skills (category_id, name) values
      (c,'Problem Solving'),(c,'Debugging'),(c,'Team Collaboration'),(c,'Adaptability'),(c,'Fast Learning');
  end if;

  if not exists (select 1 from public.projects) then
    insert into public.projects (title, description, tech, github_url, order_index) values
      ('Hotel Reservation System',
       'Console-based hotel reservation app to check room availability, create bookings, and maintain customer records, with file handling to store and retrieve data.',
       array['C++','File I/O','Visual Studio'], 'https://github.com/malikshaban01', 1),
      ('CSV File Manipulation Tool',
       'C++ data processing tool that reads, parses, filters, sorts, and writes CSV files using string processing and file I/O.',
       array['C++','File Handling','String Processing'], 'https://github.com/malikshaban01', 2),
      ('Dungeon Game',
       'Text-based dungeon adventure built with OOP: class-based models for characters, enemies, and items using encapsulation, inheritance, and polymorphism.',
       array['C++','OOP','Visual Studio'], 'https://github.com/malikshaban01', 3);
  end if;

  if not exists (select 1 from public.experience) then
    insert into public.experience (role, company, period, bullets, order_index) values
      ('DevOps Intern', 'Punjab Information Technology Board (PITB)', 'July 2026 - Present',
       array[
         'Linux and shell scripting to manage and automate development and deployment tasks.',
         'Built and managed Docker containers for isolated, reproducible environments.',
         'Used Git and GitHub for version control, branching, and collaboration.',
         'Designed a complete CI/CD pipeline automating build, test, and deploy stages, and deployed it on AWS.'
       ], 1);
  end if;

  if not exists (select 1 from public.education) then
    insert into public.education (degree, institution, period, details, coursework, order_index) values
      ('BS Computer Science', 'University of Central Punjab, Lahore', '2024 - Present',
       '4th Semester · CGPA 3.22 / 4.00',
       array['Introduction to Computing','Programming Fundamentals','Object-Oriented Programming','Data Structures & Algorithms','Database Systems'], 1);
  end if;
end $$;
