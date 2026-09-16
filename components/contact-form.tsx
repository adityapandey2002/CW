"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "Amazon / Flipkart Onboarding",
  "Marketplace Expansion",
  "Product Listing & Cataloging",
  "Amazon PPC & Ad Campaigns",
  "Account Management",
  "Website Development",
  "Something else",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();

    if (!name || !phone || !message) {
      setError("Please fill in your name, phone and message so we can reach you back.");
      return;
    }
    setError(null);

    const lines = [
      `Hi Consultancy Wala! I'm ${name}.`,
      service ? `Interested in: ${service}` : null,
      email ? `Email: ${email}` : null,
      `Phone: ${phone}`,
      message,
    ].filter(Boolean);

    const base = SITE.whatsappHref.split("?")[0];
    const text = encodeURIComponent(lines.join("\n"));

    window.open(`${base}?text=${text}`, "_blank", "noopener,noreferrer");
    form.reset();
    setSent(true);
  }

  return (
    <div>
      {sent ? (
        <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="h-12 w-12 text-brand-magenta" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-extrabold text-navy">Almost done — one tap to send!</h3>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Your WhatsApp just opened with your message pre-filled. Hit send and our team will
            reply within 24 hours.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-6"
            onClick={() => setSent(false)}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Rohit Sharma"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone / WhatsApp *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="service">What do you need?</Label>
              <Select id="service" name="service" defaultValue={SERVICE_OPTIONS[0]}>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-5">
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your store, your goals, and where you'd like to be in 12 months."
              required
            />
          </div>

          {error ? (
            <p className="mt-3 text-sm font-medium text-red-500" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg">
              Send via WhatsApp
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="text-xs text-muted-foreground">
              We reply within 24 hours. No spam, ever.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}