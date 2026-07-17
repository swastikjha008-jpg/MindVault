# MindVault

A lightweight, offline-first personal "second brain" app. No accounts, no
passwords, no database — open it, tell it your name once, and start saving
notes, links, tasks, ideas, and reading material immediately.

## Apps

- `apps/web` - Next.js 15 App Router frontend (the entire application)

## Packages

- `packages/types` - shared TypeScript contracts
- `packages/ui` - shared UI primitives
- `packages/config` - shared app constants
- `packages/eslint-config` - shared lint config
- `packages/tsconfig` - shared TypeScript config

## Local setup

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`. There is nothing else to configure.

## How data is stored

Everything is saved in the browser's Local Storage through a single
abstraction layer at `apps/web/lib/storage`. If you ever want to move to a
real backend (MongoDB, Supabase, etc.), that's the only layer you need to
replace — the hooks and components above it don't know or care where the
data actually lives.

## Deploy

Deploy `apps/web` to Vercel (or any static/Node host) with the root
directory set to `apps/web`. No environment variables or database are
required.

## Features

- Local-only profile: enter your name once, no login ever
- Notes, tasks, ideas, web clips, reading list, collections, tags, favorites
- Lightweight file upload (small files/images stored as data URLs)
- Fast client-side global search
- Activity history of everything you create, edit, or archive
- Share a link that encodes your public items directly in the URL — no
  server required — or export your whole vault as a JSON file
