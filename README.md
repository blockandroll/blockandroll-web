# Block N' Roll

Web app for Block N' Roll, a beach volleyball club in Barcelona. Built with
Next.js (App Router) and Supabase.

## Current scope

The app is currently **internal-only**: it serves as a tool for admins and
coaches to plan trainings, manage the class roster, and run the club. Public
visitors can browse the club's info and class list, but there is no player
self-signup at the moment — public signup has been disabled, and players are
not expected to have accounts. Player self-service (browsing and enrolling in
classes, viewing their own schedule) is planned for a future iteration; the
data model already supports it.

## Running locally

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project's
credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database

The Supabase schema (tables, enums, and RLS policies) lives in
[`supabase/schema.sql`](./supabase/schema.sql).
