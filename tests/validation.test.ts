import { describe, expect, it } from "vitest";
import {
  FIELD_LIMITS,
  digitsOnly,
  isValidPhone,
  maskEmail,
  maskPhone,
  normalizePhone,
  sanitize,
  validateContactInput,
} from "../lib/validation";

const validInput = {
  name: "Rohit Sharma",
  email: "rohit@example.com",
  phone: "+91 98765 43210",
  businessName: "Home Decor Co",
  service: "Amazon PPC",
  message: "We need help scaling our Amazon store.",
};

describe("sanitize", () => {
  it("strips control characters and collapses whitespace", () => {
    expect(sanitize("  Rohit\n\tSharma  ")).toBe("Rohit Sharma");
  });

  it("removes NUL and ANSI escape characters", () => {
    expect(sanitize("a\u0000b\u001bc")).toBe("a b c");
  });

  it("preserves ordinary unicode text", () => {
    expect(sanitize("Café — Patna")).toBe("Café — Patna");
  });
});

describe("digitsOnly", () => {
  it("keeps digits and drops formatting", () => {
    expect(digitsOnly("+91 (98765)-43210")).toBe("919876543210");
  });

  it("returns an empty string when there are no digits", () => {
    expect(digitsOnly("call me")).toBe("");
  });
});

describe("isValidPhone", () => {
  it.each(["9876543210", "+91 98765 43210", "098765-43210", "+1 (555) 123-4567"])(
    "accepts %s",
    (phone) => {
      expect(isValidPhone(phone)).toBe(true);
    }
  );

  it.each(["123456789", "1234567890123456", "not a phone"])("rejects %s", (phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });
});

describe("normalizePhone", () => {
  it("adds +91 to a 10-digit Indian number", () => {
    expect(normalizePhone("9876543210")).toBe("+919876543210");
  });

  it("keeps an already international number", () => {
    expect(normalizePhone("+91 98765 43210")).toBe("+919876543210");
  });
});

describe("validateContactInput", () => {
  it("accepts a fully valid submission and normalises the phone", () => {
    const result = validateContactInput(validInput);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.phone).toBe("+919876543210");
      expect(result.data.name).toBe("Rohit Sharma");
    }
  });

  it("sanitises surrounding whitespace and newlines", () => {
    const result = validateContactInput({
      ...validInput,
      name: "  Aditya\nPandey ",
      message: "  Please\t help.  ",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Aditya Pandey");
      expect(result.data.message).toBe("Please help.");
    }
  });

  it("requires a name", () => {
    const result = validateContactInput({ ...validInput, name: "   " });

    expect(result).toEqual({ ok: false, message: "Please tell us your name." });
  });

  it("requires a message", () => {
    const result = validateContactInput({ ...validInput, message: "" });

    expect(result).toEqual({
      ok: false,
      message: "Please add a short message so we can help.",
    });
  });

  it("requires an email address", () => {
    const result = validateContactInput({ ...validInput, email: "" });

    expect(result).toEqual({
      ok: false,
      message: "Please enter your email address.",
    });
  });

  it("rejects a malformed email address", () => {
    const result = validateContactInput({ ...validInput, email: "rohit@example" });

    expect(result).toEqual({
      ok: false,
      message: "Please enter a valid email address.",
    });
  });

  it("requires a phone number", () => {
    const result = validateContactInput({ ...validInput, phone: "" });

    expect(result).toEqual({
      ok: false,
      message: "Please enter your phone or WhatsApp number.",
    });
  });

  it("rejects a phone number outside the 10-15 digit range", () => {
    const result = validateContactInput({ ...validInput, phone: "12345" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toContain("10-15 digits");
    }
  });

  it("reports an over-long name instead of truncating it", () => {
    const result = validateContactInput({ ...validInput, name: "a".repeat(101) });

    expect(result).toEqual({
      ok: false,
      message: `Name must be ${FIELD_LIMITS.name} characters or fewer.`,
    });
  });

  it("uses a readable label for the business name limit", () => {
    const result = validateContactInput({
      ...validInput,
      businessName: "a".repeat(121),
    });

    expect(result).toEqual({
      ok: false,
      message: `Business name must be ${FIELD_LIMITS.businessName} characters or fewer.`,
    });
  });

  it("reports an over-long message", () => {
    const result = validateContactInput({
      ...validInput,
      message: "a".repeat(FIELD_LIMITS.message + 1),
    });

    expect(result).toEqual({
      ok: false,
      message: `Message must be ${FIELD_LIMITS.message} characters or fewer.`,
    });
  });

  it("treats non-string values as empty", () => {
    const result = validateContactInput({ ...validInput, name: 42 });

    expect(result).toEqual({ ok: false, message: "Please tell us your name." });
  });
});

describe("maskEmail", () => {
  it("keeps the first character and the domain", () => {
    expect(maskEmail("rohit@example.com")).toBe("r****@example.com");
  });

  it("handles a single-character local part", () => {
    expect(maskEmail("a@b.co")).toBe("a*@b.co");
  });

  it("falls back to a fully masked value without a domain", () => {
    expect(maskEmail("not-an-email")).toBe("***");
  });
});

describe("maskPhone", () => {
  it("keeps only the last two digits", () => {
    expect(maskPhone("+91 98765 43210")).toBe("***10");
  });

  it("fully masks very short numbers", () => {
    expect(maskPhone("12")).toBe("**");
  });

  it("returns an empty string for input without digits", () => {
    expect(maskPhone("")).toBe("");
  });
});
