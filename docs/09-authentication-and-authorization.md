# 09 — Authentication and Authorization

## Summary

**No authentication or authorization is implemented.** The application is a fully public marketing site. There are no users, sessions, tokens, roles, or protected routes.

| Check | Result |
|-------|--------|
| Auth libraries in `package.json` | None (no NextAuth/Auth.js, Clerk, Auth0, Supabase Auth, Lucia, or similar) |
| Middleware / proxy | No `middleware.ts` or `proxy.ts` in the repository |
| Server action guards | `actions/contact.ts` performs no identity or permission checks |
| Protected routes | None — `/`, `/privacy`, `/terms` are all public |
| Cookies / sessions | No cookie or session code anywhere |
| Tokens / JWT | None |
| RBAC / permissions | None |
| Password hashing | None — no passwords are stored or verified |

## Login and Registration

Not applicable. There is no user-facing account system and no sign-up flow.

## Session Management

Not applicable. The application sets no cookies and holds no server-side session state. Confirmed at runtime: the home page response carries no `Set-Cookie` header.
## Token Handling

Not applicable. The only environment variable in the project (`NEXT_PUBLIC_SITE_URL`) is public by design and is inlined into the client bundle.

## Role-Based Access Control

Not applicable. No roles, permissions, or capability checks exist anywhere in the codebase.

## Middleware

Not present. Note that Next.js 16 changed middleware file conventions and proxy APIs — if middleware is ever added, the applicable guide under `node_modules/next/dist/docs/` must be read first (see `AGENTS.md`).

## Authorization in the Server Action

`submitContact` is publicly callable — anyone who can reach the site can invoke it. This is why spam and rate-limiting controls appear as recommendations in [`15-security-documentation.md`](./15-security-documentation.md) rather than as implemented features.

The only "authorization-like" behaviour in the app is a form of input gating in the Server Action, which is validation rather than access control:

| Field | Required | Checked by |
|-------|----------|------------|
| `name` | Yes | `actions/contact.ts` |
| `email` | Yes | `actions/contact.ts` (regex) |
| `phone` | Yes | `actions/contact.ts` |
| `businessName` | No | — |
| `service` | No | — |
| `message` | Yes | `actions/contact.ts` |

## Implications for Future Work

If an admin dashboard, client portal, or lead-management view is introduced, the following would be required (none of it exists today):

1. Choose a vetted auth library and integrate it with the framework's supported route handling.
2. Protect routes with the framework's current middleware/proxy mechanism — verify Next.js 16 conventions first.
3. Enforce authorization **inside** every Server Action, not only by hiding UI elements.
4. Add session rotation, secure cookie flags, and audit logging.
5. Re-review the Privacy Policy — it currently states that no tracking cookies are set, which would no longer hold.

See [`20-future-improvements.md`](./20-future-improvements.md) (item 8, admin/CRM portal with authentication).