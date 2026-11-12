# 04 — System Architecture

## Architectural Pattern

**Static-first, server-rendered marketing site** built on Next.js 16 App Router. Most UI is rendered on the server (React Server Components); interactive parts are client components. There is no database, no authentication, and no separate backend service.

## Goals Implied by the Implementation

- Fast first paint and SEO-friendly HTML for a marketing site.
- Centralized content editing (`lib/constants.ts`).
- Low operational complexity (no DB, no auth, no background jobs).
- Lead capture without a backend CRM (contact Server Action + WhatsApp deep links).

## Layers

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Presentation | `app/`, `components/` | Routes, layout, sections, UI primitives |
| Content/domain | `lib/constants.ts` | Site info, navigation, services, testimonials, FAQs, stats |
| Server logic | `actions/contact.ts` | Validate and accept contact submissions |
| SEO/metadata | `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/opengraph-image.tsx` | Metadata, sitemap, robots, manifest, OG image |
| Styling/design system | `app/globals.css`, `components/ui/` | Tokens, utilities, primitives |
| Error handling | `app/error.tsx`, `app/not-found.tsx` | Route-level error boundary and 404 |

## Frontend Architecture

### Rendering Strategy

- **Server Components by default:** `app/page.tsx`, sections, footer, legal pages.
- **Client Components:** `Header` (menu state), `ContactForm` (form state), `Faq` (accordion state), `Reveal` (motion), `WhatsAppBubble` (motion), `app/error.tsx` (client boundary).
- **No data fetching:** all data is imported constants; no `fetch`, no route handlers.

### Component Tree

```mermaid
flowchart TB
  RootLayout[app/layout.tsx] --> Home[app/page.tsx]
  RootLayout --> Privacy[app/privacy/page.tsx]
  RootLayout --> Terms[app/terms/page.tsx]
  Home --> Header
  Home --> Hero
  Home --> Services
  Home --> About
  Home --> Testimonials
  Home --> Faq
  Home --> Contact
  Home --> Footer
  Home --> WhatsAppBubble
  Contact --> ContactForm
  Header --> Logo
  Footer --> Logo
  Privacy --> LegalPage
  Terms --> LegalPage
  LegalPage --> Header
  LegalPage --> Footer
```

### State Management

- Local React state only:
  - `Header`: `open` (mobile menu).
  - `ContactForm`: `pending`, `sent`, `error`.
  - `Faq`: `openIndex`.
- No Context, Redux, Zustand, or server cache.

### Design System

- Tailwind CSS v4 CSS-first tokens in `app/globals.css`:
  - Colors: `navy`, `brand-orange`, `brand-magenta`, `brand-purple`, `surface`, `muted-foreground`, `border`.
  - Font: `--font-jakarta` mapped to `--font-sans`.
  - Custom utilities: `bg-cta-gradient`, `gradient-text`, `bg-cta-gradient-soft`, `bg-grid`.
- `components/ui/*` primitives accept `className` and merge it via `cn()`.

## Backend Architecture

There is no server framework beyond Next.js. The only server-side mutation is the `submitContact` Server Action.

```mermaid
flowchart LR
  Form[ContactForm client] -->|submitContact FormData| Action[actions/contact.ts]
  Action --> Validate[Required fields + email regex]
  Validate -->|invalid| Error[Return error state]
  Validate -->|valid| Log[console.log enquiry]
  Log --> Success[Return success state]
  Success --> Form
  Error --> Form
```

### Server Action Contract

- Input: `FormData` with `name`, `email`, `phone`, `businessName`, `service`, `message`.
- Output: `ContactFormState` (`idle | success | error` + optional message).
- Side effects: stdout log only.
- Email provider integration is an explicit TODO.

## Data Access Architecture

No database, ORM, repository layer, or caching layer. Content is static data imported at build time.

## Communication Between Components

- Parent → child props (e.g., `SectionHeading` title ReactNode, `Reveal` delay).
- Shared imports from `lib/constants.ts` and `lib/utils.ts`.
- Server Action RPC for the form.
- No event bus or external state.

## SEO Architecture

| Output | Source | Notes |
|--------|--------|-------|
| `<title>`/description/OG/Twitter | `app/layout.tsx` metadata | `metadataBase` from `SITE.url`; title template `%s \| Consultancy Wala` |
| Canonical | `app/layout.tsx` `alternates.canonical: "/"` | **Verified:** `/privacy` and `/terms` also emit `<link rel="canonical" href="https://consultancywala.com/"/>` — they inherit the root value |
| JSON-LD Organization | `app/layout.tsx` inline script | Verified output: name, url, email, telephone, PostalAddress (Patna/Bihar/800026/IN), description |
| `robots.txt` | `app/robots.ts` | Verified output: `User-Agent: *`, `Allow: /`, `Host: consultancywala.com`, `Sitemap: https://consultancywala.com/sitemap.xml` |
| `sitemap.xml` | `app/sitemap.ts` | Verified output: 3 URLs (`/`, `/privacy`, `/terms`) with weekly/yearly frequencies and priorities 1 / 0.3 / 0.3 |
| PWA manifest | `app/manifest.ts` | Verified output: `name`, `short_name: "CW"`, standalone display, `#ffffff` colors, `/icon.svg` + `/favicon.ico` icons |
| OG image | `app/opengraph-image.tsx` | 1200×630 PNG via `next/og` (`image/png`) |

## Error Handling Strategy

- Expected validation errors are values, not exceptions.
- Route-level unexpected errors are caught by `app/error.tsx`; `retry()` re-renders.
- 404 via `app/not-found.tsx`.
- No global error reporting.

## Logging Strategy

- `console.log` for enquiries (structured object with `receivedAt`).
- `console.error` for route errors.
- No log aggregation, redaction, or retention policy in code.

## Caching Strategy

- No explicit caching configuration; `next.config.ts` empty.
- Content is static; pages are eligible for Next.js default caching.
- No ISR, revalidation, or `dynamic` exports.

## Background Jobs / Real-Time

None.

## Third-Party Integrations

WhatsApp, Instagram, LinkedIn links; Google Fonts; intended Vercel hosting. See `17-integrations-and-third-party-services.md`.

## Architecture Constraints and Trade-offs

- **Pros:** minimal infrastructure, cheap to host, fast, simple to reason about.
- **Cons:** no lead persistence, no email delivery, no CMS, no auth, no tests. Content changes require a deploy.
- **Scalability:** trivial for static traffic; contact submissions are not stored, so no write scaling concerns.

## Known Architectural Issues

1. **Canonical inheritance (verified):** the root layout sets `alternates.canonical: "/"`, and both `/privacy` and `/terms` render `<link rel="canonical" href="https://consultancywala.com/"/>`. Each legal page should declare its own canonical.
2. **Phone links are relative URLs:** `SITE.phoneHref` is `"+918601862114"` and is used verbatim as `href`, so browsers resolve it as a path rather than a `tel:` URI.
3. **Email delivery is a TODO:** leads are only visible in server logs.
4. **Dependency hygiene:** `npm audit` reports advisories in the dependency tree; keep Next.js 16 compatibility in mind when updating.

See `diagrams/system-architecture.md` and `diagrams/application-flow.md`.