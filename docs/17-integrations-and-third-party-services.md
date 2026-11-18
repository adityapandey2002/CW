# 17 — Integrations and Third-Party Services

## Overview

The project has **no third-party SDKs or API clients**. All integrations are outbound hyperlinks plus one build-time font dependency.

## Integration Inventory

| Service | Type | Usage | Defined In |
|---------|------|-------|-----------|
| WhatsApp | Outbound link | Primary lead channel: CTAs, mobile menu, contact section, floating bubble | `SITE.whatsappHref` in `lib/constants.ts` |
| Instagram | Outbound link | Footer social icon | `SITE.instagram` |
| LinkedIn | Outbound link | Footer social icon | `SITE.linkedin` |
| Telephone | Relative link | Header, footer, contact card | `SITE.phoneHref` |
| Email | `mailto:` link | Footer, contact card, legal pages | `SITE.email` |
| Google Fonts | Build-time asset | Plus Jakarta Sans via `next/font/google` | `app/layout.tsx` |
| Vercel | Hosting (intended) | Deployment target per README | README only; no config file |

## WhatsApp Deep Link Details

```ts
whatsappHref:
  "https://wa.me/918601862114?text=Hi%20Consultancy%20Wala%2C%20I%20want%20to%20grow%20my%20e-commerce%20business."
```

- Format: `https://wa.me/<number>?text=<url-encoded message>`.
- The message is percent-encoded in the constant.
- Opened with `target="_blank"` and `rel="noopener noreferrer"`.
- Used in: `components/header.tsx` (mobile menu), `components/sections/hero.tsx`, `components/sections/contact.tsx`, `components/contact-form.tsx` (secondary "Prefer WhatsApp? Chat now"), `components/whatsapp-bubble.tsx`, `components/footer.tsx` (social icon).

## Phone Link Detail

`SITE.phoneHref` is now `"tel:+918601862114"` (fixed) and is used directly as `href` in the header, footer, and contact section. Phone links now open the dialer.

## External Link Hardening

Verified on the rendered home page: **every** `target="_blank"` anchor also carries `rel` containing `noopener` (0 exceptions).

## Google Fonts

- `next/font/google` downloads and self-hosts the font at build time; no runtime request to Google.
- Variable exposed as `--font-jakarta`, mapped to Tailwind's `--font-sans` in `app/globals.css`.
- `display: "swap"`, `subsets: ["latin"]`.

## Email Provider (Implemented)

`actions/contact.ts` now delivers enquiries via **Resend** (`resend ^4.0.0`):

- Sender: `RESEND_FROM_EMAIL` env var, default `Consultancy Wala <onboarding@resend.dev>` (Resend sandbox — only delivers to the account owner until a domain is verified).
- Recipient: `SITE.email` (`adityapandey.adu@gmail.com`).
- `replyTo`: the submitter's email.
- Subject: `New enquiry from <name>` (name sanitised of control characters).
- Body: name, email, phone, business, service, blank line, message.
- Resend resolves with `{ data, error }` rather than throwing; the `error` is checked explicitly and surfaced as a generic user-facing error.
- The Resend client is cached per instance; the API key comes from `RESEND_API_KEY`.

**Verified live (no key configured):** a valid submission returned "Something went wrong on our side. Please try again, or message us on WhatsApp." and no configuration detail was leaked. Full delivery is code-verified but was not exercised end-to-end here because it requires a real `RESEND_API_KEY` and a verified sender.

## Analytics

- **Vercel Web Analytics** — not enabled on `main`. A stale branch `vercel/install-vercel-web-analytics-x6akno` exists; `public/` is empty and `app/layout.tsx` loads no analytics script. Verify before claiming it is live in production.
- The Privacy Policy states the site does not set tracking cookies and that any future analytics/remarketing addition will require a policy update. Update the policy if analytics is enabled.

## Payments, CRM, Ads, Maps

None present.

## Operational Notes

- Any third-party addition must update `app/privacy/page.tsx` (data sharing, cookies) and possibly `app/terms/page.tsx`.
- Outbound links should always keep `rel="noopener noreferrer"`.