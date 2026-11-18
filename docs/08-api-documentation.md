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

`actions/contact.ts` starts with `"use server"`, which marks every export as a Server Action. It imports `Resend` from `resend` and `validateContactInput`, `maskEmail`, `maskPhone` from `@/lib/validation`.

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
  /** Field-level errors, so the form can render them next to each input. */
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};
```

### Request Fields

| Field | Type | Required | Validation | Max length |
|-------|------|----------|------------|------------|
| `name` | string | Yes | non-empty after sanitise | 100 |
| `email` | string | Yes | non-empty + regex `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | 254 |
| `phone` | string | Yes | 10–15 digits after stripping non-digits | 32 |
| `businessName` | string | No | sanitise only | 120 |
| `service` | string | No | sanitise only | 80 |
| `message` | string | Yes | non-empty | 4000 |
| `company_website` | string (hidden honeypot) | — | empty = human; non-empty = bot (returns success silently) | — |

Limits are enforced server-side in `lib/validation.ts` (`FIELD_LIMITS`) and mirrored as `maxLength` attributes on the client.

### Validation Rules (authoritative, in `lib/validation.ts`)

- `sanitize()` strips control characters (`\u0000–\u001F`, `\u007F`) and collapses whitespace — header- and log-injection defence.
- `validateContactInput()` enforces per-field length limits (reports over-long input as an error rather than truncating).
- Required checks: name, message, email, phone.
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- Phone: `digitsOnly` count between 10 and 15; normalised to `+91…` for 10-digit Indian numbers.
- On success, `data.phone` is rewritten to the normalised international form.

### Response Matrix

| Condition | Returned state |
|-----------|----------------|
| Valid submission | `{ status: "success", message: "Thanks! Our team will reach out within 24 hours." }` |
| Missing required field | `{ status: "error", message: "Please tell us your name." / "Please add a short message…" / "Please enter your email address." / "Please enter your phone or WhatsApp number." }` |
| Invalid email | `{ status: "error", message: "Please enter a valid email address." }` |
| Invalid phone | `{ status: "error", message: "Please enter a valid phone number (10-15 digits, e.g. +91 98765 43210)." }` |
| Over-long field | `{ status: "error", message: "<Field> must be N characters or fewer." }` |
| Honeypot populated | `{ status: "success", message: "Thanks! Our team will reach out within 24 hours." }` (no email sent) |
| Resend rejects the send | `{ status: "error", message: "Something went wrong on our side. Please try again, or message us on WhatsApp." }` |
| Resend client not configured | `{ status: "error", message: "Something went wrong on our side. Please try again, or message us on WhatsApp." }` (configuration state is never leaked) |
| Unexpected exception | `{ status: "error", message: "Something went wrong on our side. Please try again, or message us on WhatsApp." }` |

### Side Effects

1. **Honeypot check** — non-empty `company_website` returns success without sending email.
2. **Validation** — `validateContactInput(raw)` runs on the trimmed `FormData` values.
3. **Email send** via Resend:
   - `from`: `RESEND_FROM_EMAIL` env var, default `Consultancy Wala <onboarding@resend.dev>`.
   - `to`: `SITE.email` (`adityapandey.adu@gmail.com`).
   - `replyTo`: the submitter's email.
   - `subject`: `New enquiry from <name>` (name is sanitised of control chars).
   - body: name, email, phone, business, service, blank line, message.
4. **Resend `{ error }` is checked explicitly** (Resend resolves rather than throws on API failures).
5. **Logging** — metadata only, PII masked:
   ```ts
   console.log("[Consultancy Wala] Contact enquiry sent", {
     email: maskEmail(email),   // e.g. "r***@example.com"
     phone: maskPhone(phone),   // e.g. "***20"
     service: service || null,
     receivedAt: new Date().toISOString(),
   });
   ```
6. **Failure logging** goes to `console.error` with the Resend error name/message or the caught exception.

### Client Invocation

`components/contact-form.tsx` uses React 19 `useActionState`:

```tsx
const [state, formAction, pending] = useActionState(submitContact, INITIAL_STATE);

<form ref={formRef} action={formAction} onSubmit={(e) => captureSummary(e.currentTarget)}>
```

- Progressive enhancement: the form submits before hydration / without JS.
- `captureSummary` records name/service/message so the success panel can offer a pre-filled WhatsApp deep link (`whatsappLink(...)`).
- On success, `formRef.current?.reset()` clears the fields and the success panel renders.
- Field-level errors are typed but the UI currently renders a single inline alert (`role="status"`, `aria-live="polite"`).

### Authentication / Authorization

None. The action is publicly callable.

### Security Notes

- Honeypot spam trap (`company_website`).
- Control-character stripping (header/log injection defence).
- Field length limits (server-authoritative).
- Phone normalisation + 10–15 digit validation.
- PII is masked in logs (Resend holds the full data).
- Resend client is cached per instance; API key is read from `RESEND_API_KEY`.
- Configuration state is never leaked to the user (generic error message).
- No rate limiting at the network edge (honeypot only).

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

### OpenAPI / Swagger

Not implemented. No OpenAPI document exists in the repository.

### Versioning

No API versioning (no API).<|end|><|start|>write to=assistant<|channel|>analysis<|message|>Wrote file successfully: docs/08-api-documentation.md