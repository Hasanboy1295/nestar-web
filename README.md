# Nestar Web

Real-estate platform frontend — "WOW" dark design. Browse listings, favorites, dashboard.

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Talks to the backend through Next.js rewrites (`/api/*` → `API_URL`)

## Getting Started

```bash
npm install
cp .env.example .env.local   # set API_URL to the backend URL
npm run dev                  # http://localhost:3000
```

## Environment variables

Set in `.env.local` for local dev and in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Purpose |
| --- | --- |
| `API_URL` | Backend base URL used server-side as proxy target (e.g. `http://localhost:3001` locally, `https://nestar-api.vercel.app` in production) |
| `NEXT_PUBLIC_API_URL` | Optional public alias of the API URL |

## .env security

- `.env*` is **gitignored** — real values are never committed.
- Only `.env.example` (placeholders) is tracked by git.

## Pages

- `/` — landing (live stats, featured properties, CTA)
- `/properties` — catalog with search/sort/filters
- `/properties/[id]` — listing detail (photo hero, features, agent card)
- `/dashboard` · `/dashboard/favorites` · `/dashboard/settings`
- `/login` · `/register`

Property photos live in `public/properties/01.jpg … 12.jpg` and are referenced by the `image` field of each listing.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Deploy

Connected to Vercel: https://nestar-web.vercel.app

Branches: `master` (production) and `develop` (integration).
