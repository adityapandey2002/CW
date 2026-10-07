import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy.
 *
 * Trade-off note: the strict, nonce-based CSP recommended in
 * node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md
 * requires dynamic rendering, because a fresh nonce must be generated per
 * request. This site is fully statically prerendered and its value is organic
 * search traffic, so we keep static rendering and accept 'unsafe-inline' for
 * scripts instead.
 *
 * That still blocks the attacks that matter in practice: third-party script
 * origins, framing, plugin content, base-tag hijacking and form hijacking.
 * If this app ever needs a strict script-src, move to a nonce via proxy.ts and
 * accept the switch to dynamic rendering.
 *
 * 'unsafe-inline' is also required for the inline JSON-LD script, which the
 * browser treats as a script element under script-src.
 */
const csp = [
  "default-src 'self'",
  // React/Next.js ship an inline RSC payload, and 'unsafe-eval' is required by
  // React's dev-only stack trace reconstruction.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Tailwind v4 injects a <style> tag at runtime and Framer Motion writes
  // inline style attributes; neither can carry a nonce.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self' data:",
  // The site embeds no third-party frames.
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Redundant with frame-ancestors in the CSP, kept for legacy user agents.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework and version to scanners.
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;