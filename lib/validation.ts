/**
 * Pure, dependency-free validation helpers for the contact form.
 *
 * Kept separate from the server action so the rules are unit-testable and so
 * the same limits can be mirrored as HTML attributes on the client.
 */

/** Maximum accepted length per field. Enforced server-side (authoritative). */
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 32,
  businessName: 120,
  service: 80,
  message: 4000,
} as const;

export type FieldName = keyof typeof FIELD_LIMITS;

export type ContactInput = Record<FieldName, string>;

/**
 * Deliberately permissive: catches obvious typos without rejecting valid but
 * unusual addresses. The only reliable validation of an address is a
 * confirmation email, which is not part of this flow.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Strips CR/LF and other control characters.
 *
 * Two reasons:
 * 1. Header-injection defence in depth for values interpolated into the
 *    email `subject` line.
 * 2. Log-injection defence - control characters (including ANSI escapes) in
 *    `console.log` output can forge or corrupt log lines.
 */
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

export function sanitize(value: string): string {
  return value.replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim();
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Accepts common Indian and international formats:
 * `9876543210`, `+91 98765 43210`, `098765-43210`, `+1 (555) 123-4567`.
 */
export function isValidPhone(value: string): boolean {
  const digits = digitsOnly(value);
  return digits.length >= 10 && digits.length <= 15;
}

/** Normalises to a compact international form for display and tel: links. */
export function normalizePhone(value: string): string {
  const digits = digitsOnly(value);
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; message: string };

/**
 * Authoritative server-side validation.
 *
 * Over-long input is reported as an error rather than silently truncated, so
 * the user gets an actionable message.
 */
export function validateContactInput(raw: Record<string, unknown>): ValidationResult {
  const data = {} as ContactInput;

  for (const field of Object.keys(FIELD_LIMITS) as FieldName[]) {
    const value = typeof raw[field] === "string" ? (raw[field] as string) : "";
    const cleaned = sanitize(value);

    if (cleaned.length > FIELD_LIMITS[field]) {
      const label =
        field === "businessName"
          ? "Business name"
          : field.charAt(0).toUpperCase() + field.slice(1);
      return {
        ok: false,
        message: `${label} must be ${FIELD_LIMITS[field]} characters or fewer.`,
      };
    }

    data[field] = cleaned;
  }

  if (!data.name) {
    return { ok: false, message: "Please tell us your name." };
  }
  if (!data.message) {
    return { ok: false, message: "Please add a short message so we can help." };
  }
  if (!data.email) {
    return { ok: false, message: "Please enter your email address." };
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!data.phone) {
    return { ok: false, message: "Please enter your phone or WhatsApp number." };
  }
  if (!isValidPhone(data.phone)) {
    return {
      ok: false,
      message: "Please enter a valid phone number (10-15 digits, e.g. +91 98765 43210).",
    };
  }

  data.phone = normalizePhone(data.phone);

  return { ok: true, data };
}

/**
 * Reduces an email address to a non-identifying fingerprint for logs, so that
 * server logs do not become a second, ungoverned copy of user PII.
 */
export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.split("@");
  if (!domain) return "***";
  return `${local.slice(0, 1)}${"*".repeat(Math.max(local.length - 1, 1))}@${domain}`;
}

/** Keeps only the last two digits of a phone number. */
export function maskPhone(phone: string): string {
  const digits = digitsOnly(phone);
  return digits.length <= 2 ? "*".repeat(digits.length) : `***${digits.slice(-2)}`;
}