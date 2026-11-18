# 15 — Security Documentation

## Scope

Public marketing website with a single public contact form (Server Action). No accounts, payments, uploads, or admin area.

## Implemented Protections (Verified)

| Control | Implementation | Evidence |
|---------|----------------|----------|
| Server-side required-field validation | Trims and checks name/email/phone/message | `actions/contact.ts` (verified live) |
| Email format validation | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | `actions/contact.ts` (verified live) |
| External link hardening | `rel="noopener noreferrer"` on `target="_blank"` links | Verified: 0 `target="_blank"` anchors without `noopener` on the home page |
| Secret hygiene | `.env*` gitignored | `.gitignore` |
| Public-only data | `NEXT_PUBLIC_SITE_URL` contains no secret | `lib/constants.ts` |
| Framework defaults | Next.js Server Actions/headers defaults | Next.js runtime (verify per version) |

## Implemented Protections (Verified)

| Control | Implementation | Evidence |
|---------|----------------|----------|
| Server-side required-field validation | Trims and checks name/email/phone/message | `actions/contact.ts` (verified live) |
| Email format validation | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | `lib/validation.ts` (verified live) |
| Phone validation | 10–15 digits after stripping non-digits | `lib/validation.ts` |
| Field length limits | Server-authoritative `FIELD_LIMITS` (name 100, email 254, phone 32, businessName 120, service 80, message 4000) | `lib/validation.ts` |
| Control-character stripping | `sanitize()` removes `\u0000–\u001F` and `\u007F` (header/log injection defence) | `lib/validation.ts` |
| Honeypot spam trap | Hidden `company_website` field; non-empty → success without sending email | `actions/contact.ts`, `components/contact-form.tsx` |
| PII masking in logs | `maskEmail`, `maskPhone` reduce email/phone to fingerprints | `lib/validation.ts` (verified live) |
| External link hardening | `rel="noopener noreferrer"` on `target="_blank"` links | Verified: 0 `target="_blank"` anchors without `noopener` on the home page |
| Secret hygiene | `.env*` gitignored | `.gitignore` |
| Public-only data | `NEXT_PUBLIC_SITE_URL` contains no secret | `lib/constants.ts` |
| Security headers | CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP | `next.config.ts` (verified live via response headers) |
| `poweredByHeader` | `false` (framework version not advertised) | `next.config.ts` (verified: no `X-Powered-By`) |
| Framework defaults | Next.js Server Actions/headers defaults | Next.js runtime |

## Not Implemented

| Control | Status |
|---------|--------|
| Authentication / authorization | None |
| Rate limiting (network edge) | None (honeypot only) |
| CAPTCHA / bot protection | None (honeypot only) |
| CSRF tokens (application-level) | None (framework behavior only) |
| File upload validation | No uploads |
| CORS policy | No API/CORS config |
| Secret rotation / vault | No secrets currently (Resend key is env var) |
| Audit logging / monitoring | None |
| Dependency scanning in CI | Advisory — `npm audit --audit-level=high` runs but does not block (`continue-on-error`) |

## Threat Model (lightweight)

| Threat | Current Mitigation | Risk |
|--------|--------------------|------|
| Spam/bot form submissions | HTML/server required fields only | High (no rate limit/CAPTCHA) |
| PII exposure via logs | None (logs contain full payload) | Medium |
| XSS via form input | Server Action returns text; React escapes rendered output; no HTML injection sink | Low |
| XSS via JSON-LD | `JSON.stringify` of constants, `dangerouslySetInnerHTML` | Low (no user input) |
| Open redirect | No redirects | None |
| CSRF | Next.js Server Action origin checks (framework-dependent) | Low–Medium; verify |
| Dependency vulnerabilities | `npm audit` only (manual) | Medium (see audit output) |
| Clickjacking | No frame-ancestors header verified | Low–Medium |

## Privacy

- Contact payload includes name, email, phone, business name, service, message.
- Enquiries are emailed via Resend to `SITE.email`; on a successful send the code logs masked metadata (`maskEmail`, `maskPhone`) plus `receivedAt`. No persistence in application code.
- Full PII is necessarily held by Resend (and the recipient inbox).
- Privacy Policy claims DPDP Act 2023 alignment; technical controls are limited (no retention automation, no consent management).
- Hosting logs may retain metadata depending on provider configuration (not verified).

## Recommendations (Not Implemented)

1. Add rate limiting and a honeypot/Turnstile to the contact action.
2. Avoid logging full PII; redact or store in a controlled system.
3. Configure security headers in `next.config.ts` (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`) and consider `poweredByHeader: false`.
4. Add a privacy-friendly analytics solution only with consent.
5. Add dependency scanning and `npm audit` in CI.
6. Document a data retention/deletion process for enquiries.

## Responsible Disclosure

No security contact is defined beyond the general email/phone in `lib/constants.ts`. Not verified as an official security channel.