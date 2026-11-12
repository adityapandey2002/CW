# 20 — Future Improvements

## Proposed (not implemented)

1. **Email delivery** for contact form (Resend/Nodemailer) — replace TODO in `actions/contact.ts`.
2. **Persistence** of enquiries (database or CRM integration).
3. **Spam protection** (honeypot, Turnstile/reCAPTCHA).
4. **Rate limiting** on server action.
5. **Analytics** (privacy-compliant) with cookie consent update.
6. **Security headers** (CSP, HSTS) in `next.config.ts`.
7. **Test suite** (Vitest + Playwright) and CI pipeline.
8. **Admin/CRM portal** with authentication.
9. **Image assets** in `public/` and `next/image` usage.
10. **i18n** if multilingual support needed.
11. **`.env.example`** for documented env vars.
12. **Accessibility audit** and reduced-motion consistency in `Reveal`.
13. **Content management** (CMS) instead of hardcoded constants if non-dev editing needed.
14. **License** selection and `LICENSE` file.
15. **Per-page canonical metadata** — verified: the root layout's `alternates.canonical: "/"` is inherited by `/privacy` and `/terms`, so both legal pages advertise the home URL as canonical. Add explicit canonicals per route.
16. **Dialable phone links** — `SITE.phoneHref` is used verbatim as an `href`, producing relative URLs instead of `tel:` links.
17. **Client-side error handling** — `ContactForm` has no `try/catch` around `submitContact`; a rejected action leaves the button stuck in the pending state.
18. **Consistent service taxonomy** — the form's `SERVICE_OPTIONS` (7 items) and `SERVICE_GROUPS` (10 services) are maintained separately; derive one from the other.

These are suggestions; none are implemented or verified as planned.