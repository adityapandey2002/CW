"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  service: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const payload: ContactPayload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    businessName: String(formData.get("businessName") ?? "").trim(),
    service: String(formData.get("service") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return {
      status: "error",
      message: "Please fill in your name, email, phone and message so we can reach you back.",
    };
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: Plug in an email provider here (e.g. Resend or Nodemailer):
  //   await resend.emails.send({
  //     from: SITE.email,
  //     to: SITE.email,
  //     replyTo: payload.email,
  //     subject: `New enquiry from ${payload.name}`,
  //     text: [
  //       `Name: ${payload.name}`,
  //       `Email: ${payload.email}`,
  //       `Phone: ${payload.phone}`,
  //       `Business: ${payload.businessName}`,
  //       `Service: ${payload.service}`,
  //       `Message: ${payload.message}`,
  //     ].join("\n"),
  //   });

  console.log("[Consultancy Wala] New contact enquiry", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message: "Thanks! Our team will reach out within 24 hours.",
  };
}