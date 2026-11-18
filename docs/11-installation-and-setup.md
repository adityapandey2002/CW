# 11 — Installation and Setup

## Prerequisites

| Requirement | Verified? | Notes |
|-------------|-----------|-------|
| Node.js | Not pinned in `package.json` | Use a version supported by Next.js 16; the documentation pass verified the project builds and runs on Node.js v26.7.0 |
| npm | Yes (`package-lock.json`, lockfile v3) | `npm --version` → 11.19.0 during verification |
| Git | Optional | For cloning (`https://github.com/adityapandey2002/CW.git`) |

## 1. Clone the Repository

```bash
git clone https://github.com/adityapandey2002/CW.git
cd CW
```

If you have the folder already, skip cloning. The repository's default branch is `main`.

## 2. Install Dependencies

```bash
npm install      # or: npm ci  (reproducible, exactly from package-lock.json)
```

This installs dependencies from `package-lock.json` (npm lockfile v3). No other package manager is configured.

## 3. Configure Environment (Optional)

Create `.env.local` in the repo root:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Consultancy Wala <hello@consultancywala.com>
```

`NEXT_PUBLIC_SITE_URL` defaults to `https://consultancywala.com`. `RESEND_API_KEY` is required for email delivery; without it the contact form still validates and returns a generic error. See `10-configuration-and-environment.md`.

## 4. Run the Development Server

```bash
npm run dev
```

Open <http://localhost:3000>. The dev server uses Next.js 16 defaults (Turbopack). Hot reload is enabled.

## 5. Build and Run Production Locally

```bash
npm run build
npm run start
```

`next build` performs TypeScript checking. If the environment lacks native SWC bindings, Next.js may suggest `next build --webpack`; see `18-maintenance-and-troubleshooting.md`.

## 6. Lint

```bash
npm run lint
```

## Database Setup

Not applicable. The project has no database, ORM, migrations, or seed scripts.

## Static Assets

`public/` is currently empty. Add assets there if needed; reference them as `/asset-name.ext`.

## Verification Checklist

- [ ] `npm install` completes.
- [ ] `npm run dev` serves the home page at `localhost:3000`.
- [ ] `/privacy` and `/terms` render.
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` respond.
- [ ] Contact form returns success for valid input.
- [ ] `npm run lint` passes (if dependencies resolve).
- [ ] `npm run build` passes (if native bindings are available).