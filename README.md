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
AIRTABLE_SUBSCRIBERS_TABLE=  # table name/id for newsletter signups, e.g. FanRM
NEXT_PUBLIC_SITE_URL=        # canonical origin; defaults to https://www.goldenflowermusic.com
```

Without these, the Shows page shows an empty state and newsletter signups return a "not connected yet" message — the site still builds and runs.

### Airtable tables

**Shows (for Claude)** — fields: `Venue Name` (lookup), `Show Date` (date), `Address (from Venue)` (lookup), `Start Time`, `End Time`, `Description`, `Ticket Link`. Past shows (before today) are hidden; results are sorted soonest-first.

**FanRM** — newsletter signups write `Email Address`, `Interest Options` (set to "Joining General Mailing List"), and `Source Type` ("Website newsletter signup").

## Design

Brand colors and the "eye" emblem are derived from the *Are You Even Awake?* album art. Palette and fonts are defined in `src/app/globals.css`. Fonts: Fraunces (wordmark), Space Grotesk (display), Inter (body).

## SEO and structured data

Page metadata lives in `src/app/layout.tsx` (site-wide defaults, Open Graph, Twitter card) and in each page's own `metadata` export. All URLs resolve against `NEXT_PUBLIC_SITE_URL`.

- `src/lib/structured-data.ts` — schema.org JSON-LD: a `MusicGroup` for the band and one `MusicEvent` per upcoming show, which is what makes gigs eligible for Google's event results.
- `src/app/sitemap.ts`, `src/app/robots.ts` — served at `/sitemap.xml` and `/robots.txt`.
- `src/app/llms.txt/route.ts` — a plain-text brief at `/llms.txt` for AI assistants and agent crawlers, built from the same facts in `src/lib/site.ts`.

Band facts (genre, hometown, members, notable venues) are defined once in `src/lib/site.ts` and flow into the metadata, the JSON-LD, and `/llms.txt`, so there is one place to edit.

### Social share image

`public/og-band.jpg` is the 1200x630 card shown when a link is shared. Regenerate it after swapping in a new photo:

```bash
node scripts/make-og.mjs public/band-photo.jpg      # optional 2nd arg: vertical focus, 0–1
```

## Deploy

Deploys to Vercel. Set the same environment variables in the Vercel project settings.
