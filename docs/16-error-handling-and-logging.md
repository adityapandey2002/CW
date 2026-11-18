# 16 — Error Handling and Logging

## Error Handling

### 1. Server Action Validation Errors (`actions/contact.ts`)

- Expected failures are **returned as values**, not thrown:

```ts
if (!payload.name || !payload.email || !payload.phone || !payload.message) {
  return { status: "error", message: "Please fill in your name, email, phone and message so we can reach you back." };
}
if (!EMAIL_REGEX.test(payload.email)) {
  return { status: "error", message: "Please enter a valid email address." };
}
```

- Success: `{ status: "success", message: "Thanks! Our team will reach out within 24 hours." }`.
- The action now wraps the Resend call in `try/catch` and returns a generic error state on failure, so the client never sees a rejected promise from the email path. `ContactForm` uses `useActionState`, which handles the pending state automatically.

### 2. Route Error Boundary (`app/error.tsx`)

- Client component receiving `{ error, retry }` (Next.js 16 API).
- Logs the error with `console.error(error)` inside `useEffect`.
- Renders branded error screen with a "Try Again" button calling `retry()`.
- Note: `app/error.tsx` catches errors in the route segment below it; there is no `global-error.tsx`, so errors in the root layout itself are not covered by this boundary.

### 3. Not Found (`app/not-found.tsx`)

- Branded 404 with links back home and to the contact section.
- Renders its own Header/Footer (the root layout still applies).

### 4. Metadata/Route Errors

No dedicated handling; framework defaults apply.

## Logging

| Location | Level | Content | Notes |
|----------|-------|---------|-------|
| `actions/contact.ts` | `console.log` | Masked email (`maskEmail`), masked phone (`maskPhone`), service, `receivedAt` | PII reduced to fingerprints; stdout only |
| `actions/contact.ts` | `console.warn` | Honeypot trigger | No PII |
| `actions/contact.ts` | `console.error` | Resend error name/message, or caught exception | No full PII |
| `app/error.tsx` | `console.error` | Error object | Client-side console |

## Patterns

- Structured-ish logging via object payloads rather than string concatenation for the enquiry log.
- Prefix convention: `"[Consultancy Wala] New contact enquiry"`.

## Gaps and Recommendations

- No logging abstraction (e.g., pino/winston/structured JSON logger).
- No log levels, no request IDs, no correlation IDs.
- PII is masked in the enquiry log (`maskEmail`, `maskPhone`).
- No persistence of enquiries → reliance on host log retention.
- No error reporting/monitoring service (Sentry, etc.).
- No alerting for repeated action failures.

Recommended next steps: add a logger abstraction, request IDs, and send failures to an error tracker.