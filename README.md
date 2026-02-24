# Scanguard — Customer Development Landing Page

**Scan Anything. Fear Nothing.** A mobile app that automatically checks QR codes, links, and files for threats before they reach your device.

## Quick Start

```bash
npm install
npm run dev
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run `supabase-setup.sql` in the Supabase SQL Editor to create the `waitlist` and `survey_responses` tables.

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Supabase (emails + survey responses)

## Build

```bash
npm run build
```

## Design

- **Colors:** `#080c10` (bg), `#00ff87` (accent), `#00c4ff` (secondary), `#ff4444` (danger)
- **Fonts:** Syne (headings), DM Sans (body)
