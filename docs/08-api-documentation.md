# 08 — API Documentation

## Overview

This project exposes **no REST, GraphQL, or RPC HTTP API**. The only server-side operation is a Next.js **Server Action** used by the contact form. Next.js also generates several metadata routes (robots, sitemap, manifest, OG image) which are technically HTTP GET endpoints but are framework-managed.

## Route Inventory

Verified against a production build (`npm run build`) and a running `npm run start` instance — every page route below is prerendered as static content.

| Method | Route | Type | Source | Purpose | Verified status |
|--------|-------|------|--------|---------|-----------------|
| GET | `/` | Page | `app/page.tsx` | Home page HTML | 200 `text/html` |
| GET | `/privacy` | Page | `app/privacy/page.tsx` | Privacy Policy | 200 `text/html` |
| GET | `/terms` | Page | `app/terms/page.tsx` | Terms of Service | 200 `text/html` |
| GET | `/robots.txt` | Metadata route | `app/robots.ts` | Robots rules | 200 `text/plain` |
| GET | `/sitemap.xml` | Metadata route | `app/sitemap.ts` | Sitemap | 200 `application/xml` |
| GET | `/manifest.webmanifest` | Metadata route | `app/manifest.ts` | PWA manifest | 200 `application/manifest+json` |
| GET | `/opengraph-image` | Image route | `app/opengraph-image.tsx` | 1200×630 PNG | 200 `image/png` |
| GET | `/icon.svg` | Static | `app/icon.svg` | SVG icon | 200 `image/svg+xml` |
| GET | `/favicon.ico` | Static | `app/favicon.ico` | Favicon | 200 `image/x-icon` |
| GET | `/_not-found` | Framework | `app/not-found.tsx` | 404 page | 404 for unknown paths |
| POST | Server Action endpoint | Server Action | `actions/contact.ts` | Contact form submission | Verified live (see below) |

Build output for reference:

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

## Server Action: `submitContact`

### Location and Directive

`actions/contact.ts` starts with `"use server"`, which marks every export as a Server Action.

### Signature

```ts
export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState>
```

### Types

```ts
export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  message: string;
};
```

### Request Fields

| Field | Type | Required | Processing | Validation |
|-------|------|----------|------------|------------|
| `name` | string | Yes | trim | non-empty |
| `email` | string | Yes | trim | non-empty + `^[^\s@]+@[^\s@]+\.[^\s@]+$` |
| `phone` | string | Yes | trim | non-empty |
| `businessName` | string | No | trim | none |
| `service` | string | No | trim | none |
| `message` | string | Yes | trim | non-empty |

### Response Matrix

| Condition | HTTP-level behavior | Returned state |
|-----------|---------------------|----------------|
| Valid submission | Action resolves | `{ status: "success", message: "Thanks! Our team will reach out within 24 hours." }` |
| Missing required field(s) | Action resolves | `{ status: "error", message: "Please fill in your name, email, phone and message so we can reach you back." }` |
| Invalid email | Action resolves | `{ status: "error", message: "Please enter a valid email address." }` |
| Unexpected runtime error | Action rejects | Handled by Next.js; client `try/catch` is not present (see note) |

**Verified live:** submitting `email=not-an-email` rendered the inline alert "Please enter a valid email address."; submitting a valid payload rendered the "Message sent!" panel and produced the stdout log shown above.

### Side Effects

```ts
console.log("[Consultancy Wala] New contact enquiry", {
  ...payload,
  receivedAt: new Date().toISOString(),
});
```

- Writes PII to stdout (name, email, phone, business name, service, message).
- No email is sent.
- No database write.
- No file write.

**Verified live** against `npm run start` — the server printed:

```
[Consultancy Wala] New contact enquiry {
  name: 'Rohit Sharma',
  email: 'rohit@example.com',
  phone: '+91 98765 43210',
  businessName: 'Home Decor Co',
  service: 'Amazon / Flipkart Onboarding',
  message: 'We need help scaling our Amazon store.',
  receivedAt: '2026-11-12T14:36:03.095Z'
}
```

### Client Invocation

`components/contact-form.tsx` calls the action directly (not via `fetch`):

```ts
const result: ContactFormState = await submitContact(
  { status: "idle" },
  new FormData(form)
);
```

On success: `form.reset()`, `setSent(true)`.
On error: `setError(result.message ?? "Something went wrong. Please try again.")`.

### Authentication / Authorization

None. The action is publicly callable through the Next.js action endpoint.

### Validation Rules (exact)

```ts
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!payload.name || !payload.email || !payload.phone || !payload.message) { ... }
if (!EMAIL_REGEX.test(payload.email)) { ... }
```

### Example (conceptual FormData)

```ts
const formData = new FormData();
formData.set("name", "Rohit Sharma");
formData.set("email", "rohit@example.com");
formData.set("phone", "+91 98765 43210");
formData.set("businessName", "Home Decor Co");
formData.set("service", "Amazon PPC & Ad Campaigns");
formData.set("message", "We need help scaling our Amazon store.");

await submitContact({ status: "idle" }, formData);
// => { status: "success", message: "Thanks! Our team will reach out within 24 hours." }
```

### Security Notes

- No rate limiting, CAPTCHA, or spam protection.
- No CSRF token in application code; Next.js Server Actions include framework-level protections (verify against the installed Next.js version before relying on this).
- Logs contain PII; treat host logs as sensitive.

## Metadata Routes

### `GET /robots.txt`

```ts
{
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${SITE.url}/sitemap.xml`,
  host: new URL(SITE.url).host
}
```

### `GET /sitemap.xml`

Entries: `/` (weekly, 1.0), `/privacy` (yearly, 0.3), `/terms` (yearly, 0.3). `lastModified` is `new Date()` at generation.

### `GET /manifest.webmanifest`

Name: `SITE.name`; short name "CW"; description `SITE.tagline`; start `/`; display `standalone`; theme/background `#ffffff`; icons `/icon.svg` (any, SVG), `/favicon.ico` (48×48).

### `GET /opengraph-image`

Generated PNG using `next/og` `ImageResponse`; brand gradient, "CW" tile, site name, hero text, tagline.

## Error Responses

There are no JSON API error envelopes. Server Action failures are returned as `ContactFormState`. HTTP-level 404 is rendered by `app/not-found.tsx`; unexpected server errors by `app/error.tsx`.

## OpenAPI / Swagger

Not implemented. No OpenAPI document exists in the repository.

## Versioning

No API versioning (no API).