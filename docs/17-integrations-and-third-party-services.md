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

`SITE.phoneHref` is the bare string `"+918601862114"` and is used directly as `href` in the header, footer, and contact section (verified: 3 such links on the home page). It is **not** prefixed with `tel:`, so browsers resolve it as a relative URL rather than a telephone URI. This is a known defect worth fixing (use `tel:+918601862114`); it is documented here rather than changed, since this task is documentation-only.

## External Link Hardening

Verified on the rendered home page: **every** `target="_blank"` anchor also carries `rel` containing `noopener` (0 exceptions).

## Google Fonts

- `next/font/google` downloads and self-hosts the font at build time; no runtime request to Google.
- Variable exposed as `--font-jakarta`, mapped to Tailwind's `--font-sans` in `app/globals.css`.
- `display: "swap"`, `subsets: ["latin"]`.

## Email Provider (Planned, Not Implemented)

`actions/contact.ts` contains a commented-out example using Resend or Nodemailer:

```ts
// TODO: Plug in an email provider here (e.g. Resend or Nodemailer):
//   await resend.emails.send({ from: SITE.email, to: SITE.email, replyTo: payload.email, ... });
```

No provider package is installed and no API keys are configured. The provider choice is **not verified**.

## Analytics

None. The Privacy Policy states the site does not set tracking cookies and that any future analytics/remarketing addition will require a policy update.

## Payments, CRM, Ads, Maps

None present.

## Operational Notes

- Any third-party addition must update `app/privacy/page.tsx` (data sharing, cookies) and possibly `app/terms/page.tsx`.
- Outbound links should always keep `rel="noopener noreferrer"`.