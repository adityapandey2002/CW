"use server";

import { Resend } from "resend";
import { SITE } from "@/lib/constants";
import { maskEmail, maskPhone, validateContactInput } from "@/lib/validation";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, so the form can render them next to each input. */
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

let resendClient: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Deliberately not surfaced to the user: never leak configuration state.
    throw new Error("RESEND_API_KEY is not set");
  }
  // Cached per instance so we do not rebuild the client on every submission.
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

/**
 * Sender address.
 *
 * Resend only allows `onboarding@resend.dev` to deliver to the account
 * owner's own address, so a verified domain is required in production. Set
 * RESEND_FROM_EMAIL (e.g. "Consultancy Wala <hello@consultancywala.com>")
 * after verifying the domain in the Resend dashboard.
 */
function getFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ??
    `Consultancy Wala <onboarding@resend.dev>`
  );
}

const SUCCESS_MESSAGE = "Thanks! Our team will reach out within 24 hours.";
const GENERIC_ERROR =
  "Something went wrong on our side. Please try again, or message us on WhatsApp.";

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: a hidden field that only a bot filling every input would
  // populate. Respond with a success state so the bot gets no signal.
  const trap = formData.get("company_website");
  if (typeof trap === "string" && trap.trim() !== "") {
    console.warn("[Consultancy Wala] Honeypot triggered on contact submission");
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const raw: Record<string, unknown> = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    businessName: formData.get("businessName"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const result = validateContactInput(raw);

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  const { name, email, phone, businessName, service, message } = result.data;

  try {
    const resend = getResend();

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: SITE.email,
      replyTo: email,
      // `name` is sanitized of control characters by validateContactInput.
      subject: `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Business: ${businessName || "-"}`,
        `Service: ${service || "-"}`,
        "",
        message,
      ].join("\n"),
    });

    // Resend resolves with { data, error } rather than throwing on API
    // failures. Ignoring this is how a failed send silently reports success
    // to the user, so it must be checked explicitly.
    if (error) {
      console.error("[Consultancy Wala] Resend rejected contact email", {
        name: error.name,
        message: error.message,
      });
      return { status: "error", message: GENERIC_ERROR };
    }

    // Log metadata only. Full PII stays in Resend, not in serverless logs.
    console.log("[Consultancy Wala] Contact enquiry sent", {
      email: maskEmail(email),
      phone: maskPhone(phone),
      service: service || null,
      receivedAt: new Date().toISOString(),
    });

    return { status: "success", message: SUCCESS_MESSAGE };
  } catch (error) {
    console.error("[Consultancy Wala] Failed to send contact enquiry", error);
    return { status: "error", message: GENERIC_ERROR };
  }
}