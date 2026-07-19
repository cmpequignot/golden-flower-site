# Golden Flower

Website for **Golden Flower**, an Orlando progressive jazz band — [goldenflowermusic.com](https://www.goldenflowermusic.com/).

Built with [Next.js](https://nextjs.org) (App Router, TypeScript) and Tailwind CSS v4. Shows and newsletter signups are backed by Airtable.

## Local development

This project uses a newer Node version than the system default. If you use `nvm`:

```bash
nvm use          # reads .nvmrc (Node 24 LTS)
npm install
npm run dev      # http://localhost:3000
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your Airtable credentials:

```
AIRTABLE_TOKEN=              # personal access token (data.records:read + write)
AIRTABLE_BASE_ID=            # e.g. appXXXXXXXXXXXXXX
AIRTABLE_SHOWS_TABLE=        # table name/id for shows, e.g. Shows
AIRTABLE_SUBSCRIBERS_TABLE=  # table name/id for newsletter signups, e.g. Subscribers
```

Without these, the Shows page shows an empty state and newsletter signups return a "not connected yet" message — the site still builds and runs.

### Airtable tables

**Shows** — fields: `Title`, `Date` (date), `Start Time`, `End Time`, `Venue`, `Venue Link`, `Description`, `Ticket Link`, `Published` (checkbox). Only rows with `Published` checked are shown, sorted by `Date`.

**Subscribers** — fields: `Email`, `Signed Up` (date/datetime).

## Design

Brand colors and the "eye" emblem are derived from the *Are You Even Awake?* album art. Palette and fonts are defined in `src/app/globals.css`. Fonts: Fraunces (wordmark), Space Grotesk (display), Inter (body).

## Deploy

Deploys to Vercel. Set the same environment variables in the Vercel project settings.
