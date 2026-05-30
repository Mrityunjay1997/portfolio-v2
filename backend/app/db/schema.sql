create extension if not exists "uuid-ossp";

create table if not exists projects (
    id integer primary key,
    title varchar(180) not null,
    category varchar(80) not null,
    summary text not null,
    stack jsonb not null default '[]'::jsonb,
    architecture jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_projects_category on projects (category);

create table if not exists blog_posts (
    id serial primary key,
    title varchar(220) not null,
    slug varchar(240) not null unique,
    tag varchar(80) not null,
    body text not null,
    created_at timestamptz not null default now()
);

create index if not exists idx_blog_posts_slug on blog_posts (slug);

create table if not exists contact_leads (
    id uuid primary key default uuid_generate_v4(),
    name varchar(140) not null,
    email varchar(220) not null,
    message text not null,
    source varchar(80) not null default 'portfolio',
    created_at timestamptz not null default now()
);

create index if not exists idx_contact_leads_email on contact_leads (email);

create table if not exists analytics_events (
    id uuid primary key default uuid_generate_v4(),
    event_name varchar(120) not null,
    session_id varchar(160) not null,
    payload jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_session on analytics_events (session_id);
create index if not exists idx_analytics_events_created on analytics_events (created_at desc);
