# 20 — Future Improvements

## Status of the Original Recommendations

Most items from the original audit are now implemented:

| # | Recommendation | Status |
|---|----------------|--------|
| 1 | Email delivery for the contact form (Resend/Nodemailer) | **Done** — Resend, with honeypot, field limits, PII masking, control-char stripping |
| 2 | Persistence of enquiries | Open — still no database; leads go to email + stdout |
| 3 | Spam protection (honeypot, Turnstile/reCAPTCHA) | **Partial** — honeypot done; no CAPTCHA |
| 4 | Rate limiting on the server action | Open — handle at the edge (Vercel/Cloudflare) |
| 5 | Analytics (privacy-compliant) | Open — a stale Vercel Web Analytics branch exists but is not on `main` |
| 6 | Security headers (CSP, HSTS) in `next.config.ts` | **Done** |
| 7 | Test suite (Vitest + Playwright) and CI pipeline | **Partial** — Vitest unit tests for validation + full CI pipeline; no component/E2E tests |
| 8 | Admin/CRM portal with authentication | Open |
| 9 | Image assets in `public/` and `next/image` | Open |
| 10 | i18n | Open |
| 11 | `.env.example` | **Done** |
| 12 | Accessibility audit + reduced-motion consistency | **Partial** — mobile menu and FAQ improved; `Reveal` already honours reduced motion |
| 13 | Content management (CMS) | Open |
| 14 | License selection and `LICENSE` file | Open |
| 15 | Per-page canonical metadata | **Done** — each route declares its own canonical |
| 16 | Dialable phone links (`tel:`) | **Done** — `SITE.phoneHref` is `tel:+918601862114` |
| 17 | Client-side error handling for the contact form | **Done** — Server Action catches failures; `useActionState` clears `pending` |
| 18 | CI hardening (typecheck, docs, tests, audit, deploy) | **Done** — see `.github/workflows/ci.yml` |

## Still Open (recommended next steps)

1. **Component and E2E tests** — validation is unit-tested; add `ContactForm` state tests and Playwright coverage for navigation, submission, legal pages and 404.
2. **Rate limiting** at the network edge (Vercel/Cloudflare) in addition to the honeypot.
3. **CAPTCHA** if spam becomes a problem.
4. **Persistence** — a database or CRM if enquiries need to be tracked beyond email.
5. **License** selection and a `LICENSE` file.
6. **Image optimisation** — introduce `next/image` when imagery is added.
7. **Performance budgets / Lighthouse CI** — none defined.
8. **Monitoring** — error tracker (Sentry), uptime checks, and alerts for repeated action failures.
9. **Dependency upgrades** — `npm audit` reports advisories; budget time to upgrade within Next.js 16 compatibility.
10. **Content management** — a CMS or MDX if non-developers need to edit copy.

## Enabling the Vercel Deploy Job

The `deploy` job in `.github/workflows/ci.yml` is opt-in so the pipeline stays green without credentials:

1. Create a Vercel token (Account Settings → Tokens).
2. Add repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
3. Add repository variable `VERCEL_DEPLOY_ENABLED` with value `true`.

Until all three secrets and the variable exist, the job is skipped.
