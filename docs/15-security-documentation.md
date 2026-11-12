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

## Not Implemented

Verified against a running production build (`npm run start`): the response carries **no** `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, or `Referrer-Policy` headers, and `X-Powered-By: Next.js` is exposed.

| Control | Status |
|---------|--------|
| Authentication / authorization | None |
| Rate limiting | None |
| CAPTCHA / bot protection | None |
| CSRF tokens (application-level) | None (framework behavior only) |
| Input sanitization beyond trim/regex | None |
| File upload validation | No uploads |
| CORS policy | No API/CORS config |
| Content Security Policy / HSTS / security headers | Not configured in `next.config.ts` |
| Secret rotation / vault | No secrets currently |
| Audit logging / monitoring | None |
| Dependency scanning in CI | None |

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
- Data is logged to stdout; no persistence in application code. **Verified live**: a submitted enquiry produced a structured log line with all six fields plus `receivedAt`.
- Privacy Policy claims DPDP Act 2023 alignment; technical controls are limited (no retention automation, no consent management).
- Hosting logs may retain PII depending on provider configuration (not verified).

## Recommendations (Not Implemented)

1. Add rate limiting and a honeypot/Turnstile to the contact action.
2. Avoid logging full PII; redact or store in a controlled system.
3. Configure security headers in `next.config.ts` (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`) and consider `poweredByHeader: false`.
4. Add a privacy-friendly analytics solution only with consent.
5. Add dependency scanning and `npm audit` in CI.
6. Document a data retention/deletion process for enquiries.

## Responsible Disclosure

No security contact is defined beyond the general email/phone in `lib/constants.ts`. Not verified as an official security channel.