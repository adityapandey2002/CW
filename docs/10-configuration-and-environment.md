# 10 — Configuration and Environment

## Environment Variables

| Variable | Required | Scope | Purpose | Default | Example |
|----------|----------|-------|---------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | Build-time (public) | Base URL used for `metadataBase`, canonical, Open Graph URL, sitemap, robots host, manifest | `https://consultancywala.com` | `https://your-domain.com` |
| `RESEND_API_KEY` | Yes (for email delivery) | Runtime (server) | Resend API key used by `submitContact` to send enquiry emails | — (throws if unset; user sees a generic error) | `re_xxxxxxxxxxxxxxxxxxxxxxxx` |
| `RESEND_FROM_EMAIL` | No | Runtime (server) | Sender address for enquiry emails. Must use a verified domain in production; falls back to `Consultancy Wala <onboarding@resend.dev>` (Resend sandbox — only delivers to the account owner) | `Consultancy Wala <onboarding@resend.dev>` | `Consultancy Wala <hello@consultancywala.com>` |

**Evidence:** `lib/constants.ts` (`NEXT_PUBLIC_SITE_URL`), `actions/contact.ts` (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`).

No other environment variables are referenced in the codebase.

## Configuration Files

| File | Purpose | Notable Values |
|------|---------|----------------|
| `package.json` | Scripts/dependencies | `dev`, `build`, `start`, `lint`; Next 16.3.5; `resend ^4.0.0` |
| `tsconfig.json` | TypeScript | `strict: true`, `@/*` → `./*`, `jsx: react-jsx` |
| `next.config.ts` | Next.js config | Security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP), `poweredByHeader: false` |
| `postcss.config.mjs` | PostCSS | `@tailwindcss/postcss` |
| `eslint.config.mjs` | ESLint flat config | `next/core-web-vitals` + `next/typescript` |
| `.gitignore` | Ignore rules | `node_modules`, `.next`, `.env*`, `*.tsbuildinfo`, `next-env.d.ts` |

## Environment File Example

```bash
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Consultancy Wala <hello@consultancywala.com>
```

Because `NEXT_PUBLIC_SITE_URL` is prefixed with `NEXT_PUBLIC_`, it is embedded into client-visible output. Do not put secrets in it. `RESEND_API_KEY` is server-only and must never be exposed to the client.

## Build-Time vs Runtime

- Next.js reads `NEXT_PUBLIC_*` at build time. Changing it requires a rebuild/redeploy.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/layout.tsx`, and `app/opengraph-image.tsx` all derive URLs from `SITE.url`.
- `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are read at request time (inside the Server Action).

## Verification

```bash
# Check the variable is visible to the build
node -e "console.log(process.env.NEXT_PUBLIC_SITE_URL)"
```

(Note: `NEXT_PUBLIC_*` variables from `.env.local` are loaded by Next.js, not automatically by a bare Node process.)

## Missing Configuration

- No `.env.example` in the repository (recommended).
- No `engines` field in `package.json` (Node version not pinned).
- No `vercel.json`, Dockerfile, or CI config beyond `.github/workflows/ci.yml`.