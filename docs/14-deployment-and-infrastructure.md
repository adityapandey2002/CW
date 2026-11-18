# 14 — Deployment and Infrastructure

## Supported Deployment Path (per README)

Vercel:

```bash
npx vercel
```

The README describes the site as "fully static-friendly".

## Build and Run

```bash
npm install        # or: npm ci  (reproducible, from package-lock.json)
npm run build     # production build (includes TypeScript check)
npm run start     # serve the production build locally
```

Verified locally: the build succeeds and prerenders 9 routes as static content.

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /icon.svg
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /privacy
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /terms

○  (Static)  prerendered as static content
```

## Required Configuration

| Setting | Purpose | Required? |
|---------|---------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Correct URLs in sitemap/robots/manifest/metadata/OG | Effectively required for production on a non-default domain |

Set it as an environment variable in the hosting provider (e.g., Vercel Project Settings → Environment Variables), not in a committed file.

## Deployment Architecture

```mermaid
flowchart LR
  Repo[Git Repository] -->|CI or manual build| Build[next build]
  Build --> Host[Vercel / Node host]
  Host --> Edge[CDN / Edge cache]
  Edge --> User[Visitor]
  Host --> Log[stdout logs]
```

## Infrastructure as Code

No `vercel.json`, `Dockerfile`, `docker-compose.yml`, Kubernetes manifests, Terraform, or other IaC. Deployment is configured in the Vercel dashboard (per `DEPLOYMENT_GUIDE.md`).

## Additional Documentation in the Repository

- `PROJECT_CONTEXT.md` — 798-line single-source-of-truth document (overlaps with `docs/01` and `docs/AI_AGENT_CONTEXT.md`).
- `DEPLOYMENT_GUIDE.md` — step-by-step Vercel + Resend + Hostinger domain setup.

## CI/CD

A GitHub Actions workflow exists at `.github/workflows/ci.yml`:

- Triggers: `push` and `pull_request` to `main`, plus manual `workflow_dispatch`.
- Job `quality` on `ubuntu-latest`, Node 22, npm cache, 15-minute timeout.
- Steps: checkout, setup Node, `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`, `node scripts/validate-docs.mjs`, `npm run build` (with `NEXT_PUBLIC_SITE_URL` set), `npm audit --audit-level=high` (advisory, non-blocking).
- Concurrency cancels superseded runs; `permissions: contents: read` follows least privilege.
- Job `deploy` (opt-in) runs after `quality` on pushes to `main` when the repository variable `VERCEL_DEPLOY_ENABLED` is `true`. It requires the secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`, then runs `vercel pull`, `vercel build --prod`, and `vercel deploy --prebuilt --prod`.

See `20-future-improvements.md` for enabling the deploy job and remaining test/rate-limit work.

## Runtime Requirements

- Node.js runtime supported by Next.js 16 (version not pinned in `package.json`; CI uses Node 22).
- No database, cache, queue, or object storage provisioning required.
- Runtime secrets: `RESEND_API_KEY` (required for email delivery), optional `RESEND_FROM_EMAIL`; `NEXT_PUBLIC_SITE_URL` is build-time.

## Observability

Logs go to the host's stdout/stderr. No metrics, tracing, or alerting configured. Not verified.

## Operational Checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain.
- [ ] `npm run build` succeeds on the target platform (native SWC bindings available).
- [ ] `/sitemap.xml`, `/robots.txt`, and OG image resolve on the production domain.
- [ ] Contact form submits successfully in production (leads appear in host logs).
- [ ] Custom domain and HTTPS configured.
- [ ] Log retention for enquiries (PII) configured at the host level.

## Verified Behaviour (local production build)

| Check | Result |
|-------|--------|
| `GET /` | 200 `text/html` |
| `GET /privacy`, `GET /terms` | 200 `text/html` |
| `GET /robots.txt` | 200 `text/plain` — `Allow: /`, `Host`, `Sitemap` |
| `GET /sitemap.xml` | 200 `application/xml` — 3 URLs |
| `GET /manifest.webmanifest` | 200 `application/manifest+json` |
| `GET /opengraph-image` | 200 `image/png` |
| `GET /icon.svg`, `GET /favicon.ico` | 200 `image/svg+xml`, 200 `image/x-icon` |
| Unknown path | 404 |
| Contact form (valid) | "Message sent!" + stdout log line |
| Contact form (invalid email) | Inline "Please enter a valid email address." |