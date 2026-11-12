# 01 — Project Overview

## Project Name

**Consultancy Wala** (npm package name `cw`, version `0.1.0`, marked `private`).

## What It Is

A marketing and lead-generation website for **Consultancy Wala**, an e-commerce growth agency. The site presents the agency's services, about section, client testimonials, FAQ, and a contact form, plus two legal pages (Privacy Policy, Terms of Service).

Technically it is a frontend-only Next.js 16 (App Router) application: server-rendered pages, one Server Action for lead capture, and no persistence.

## Problem Solved

Small and mid-size sellers who want to launch and scale on Indian marketplaces (Amazon, Flipkart, Meesho, and others) need a single partner for onboarding, cataloging, PPC, account management, inventory/logistics and brand protection. The website communicates these services and captures inbound leads through a validated contact form and WhatsApp deep links, so the agency can respond within its stated 24-hour window.

## Intended Audience

- Prospective e-commerce sellers and brands evaluating marketplace growth support.
- Existing clients looking for service details and contact information.
- Search engines and social platforms (SEO, Open Graph, JSON-LD).

## Main Value Proposition

> "Smart Solutions. Stronger Businesses." — enterprise-grade e-commerce support (strategy, PPC, cataloging, operations) delivered by founders and senior strategists, with a free discovery call and growth plan.

Supporting pillars (from `components/sections/about.tsx`): Founder-Led, ROI-First, Transparent Pricing, Zero-to-Scale Ready.

## Project Type and Scope

| Aspect | Reality |
|--------|---------|
| Rendering | Server Components by default; client components only for interactivity |
| Backend | None separate; one Server Action (`submitContact`) |
| Database | None |
| Authentication | None |
| Persistence | None — enquiries are logged to stdout |
| CMS | None — content is hardcoded in `lib/constants.ts` |
| Tests | None |
| CI/CD | None in the repository |

## Key Business Facts (from `lib/constants.ts`)

| Field | Value |
|-------|-------|
| Brand name | Consultancy Wala |
| Tagline | Smart Solutions. Stronger Businesses. |
| Alternate tagline | Empowering Brands. Boosting Growth. |
| Hero | Your E-Commerce Growth Partner. |
| Co-founder | Aditya Pandey |
| Phone | +91 8601862114 (`tel:+918601862114`) |
| WhatsApp | `https://wa.me/918601862114?text=...` (pre-filled message) |
| Email | support.consultancywala@gmail.com |
| Address | Kumhrar, Patna, Bihar 800026 (JSON-LD: Patna, Bihar, 800026, IN) |
| Instagram | https://instagram.com/consultancywala |
| LinkedIn | https://linkedin.com/company/consultancywala |
| Production URL default | https://consultancywala.com (override with `NEXT_PUBLIC_SITE_URL`) |

## Service Offering (4 groups, 10 services)

| Group | Services |
|-------|----------|
| Store Launch & Expansion | Amazon & Flipkart Onboarding; Marketplace Expansion |
| Growth & Marketing | Product Listing & Cataloging; Amazon PPC & Ad Campaigns; Pricing & Profitability Strategy |
| Operations & Protection | Account Management A to Z; Inventory & Logistics Support; Brand Protection & Compliance |
| Custom Solutions | Website Development & Management; Sales & Performance Analytics |

The contact form's service dropdown lists 7 options that do not exactly match the 10 catalogued services — the two lists are maintained separately and can drift.

## Claimed Stats (marketing copy, not independently verified)

- 50+ Brands Scaled
- 10+ Marketplaces Managed
- 500+ Listings Optimized
- ₹40Cr+ GMV Handled

## Testimonials

Three testimonials are hardcoded (`Rohit Sharma`, `Priya Singh`, `Aman Verma`). These are marketing content; their authenticity cannot be verified from the repository.

## FAQs

Five questions covering confidentiality/NDAs, onboarding timelines (7–14 days), engagement size, pricing model, and why a smaller agency. One answer contains a Hindi phrase ("Haan, bilkul") as part of the copy.

## Legal Content

- **Privacy Policy** (`app/privacy/page.tsx`): DPDP Act 2023 aligned; covers data collected, usage, AI-assisted review of chat/email conversations, sharing, retention, rights, cookies, third-party links, changes, contact. Last updated: September 2026.
- **Terms of Service** (`app/terms/page.tsx`): scope of services, no guarantee of results, client responsibilities, fees, confidentiality, IP, liability cap (fees paid in the preceding 3 months), cancellation, governing law (courts at Patna, Bihar), contact. Last updated: September 2026.

## Repository State

- Git remote: `https://github.com/adityapandey2002/CW.git`; default branch `main`; no release tags.
- Git history contains 7 commits with informal messages (e.g. "doing project", "correcting SEO"). Branching/commit conventions are not documented.
- No `LICENSE` file — the license has not been specified.
- `AGENTS.md` contains a Next.js-managed block instructing agents to read `node_modules/next/dist/docs/` before writing code, because Next.js 16 has breaking changes.
- Verified during the documentation pass: `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass; the site runs and all routes respond correctly.

## Where to Start Reading

1. `docs/AI_AGENT_CONTEXT.md` — condensed orientation.
2. `lib/constants.ts` — all site content.
3. `app/page.tsx` + `components/sections/*` — page structure.
4. `actions/contact.ts` — the only server-side behavior.
5. `app/globals.css` — design system.