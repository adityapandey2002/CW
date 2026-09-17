import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Consultancy Wala collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        This Privacy Policy explains how Consultancy Wala (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses and protects the personal
        information you share when you use this website or contact us. We are committed
        to handling your data responsibly and in line with the Digital Personal Data
        Protection Act, 2023 (India) and applicable data protection principles.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect only what you choose to share with us, mainly through our contact form and direct outreach:</p>
      <ul>
        <li>Your name</li>
        <li>Your phone / WhatsApp number</li>
        <li>Your email address (if you provide it)</li>
        <li>The service you are interested in</li>
        <li>Your message and any business details you send us</li>
      </ul>
      <p>
        We do not collect sensitive personal data, and we never ask for bank passwords,
        OTPs or login credentials for your seller accounts. If you share such information
        with us, please let us know immediately so we can remove it.
      </p>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To respond to your enquiries within our stated response times</li>
        <li>To prepare free audits, proposals and growth plans you request</li>
        <li>To deliver services you engage us for</li>
        <li>To send occasional updates only if you have opted in</li>
      </ul>

      <h2>3. ChatGPT &amp; WhatsApp Conversations</h2>
      <p>
        When you contact us via WhatsApp, chat or email, your messages may be reviewed by
        our strategists and, in limited cases, by AI tools (such as ChatGPT) to help us
        draft faster, better replies and improve our service quality. Uploaded documents
        are used only to understand your business. Please do not include sensitive
        personal information such as Aadhaar numbers, bank details or passwords in
        messages or uploads.
      </p>

      <h2>4. How We Share Information</h2>
      <p>
        We never sell your personal information. We share it only:
      </p>
      <ul>
        <li>With team members who need it to serve you</li>
        <li>With trusted service providers (hosting, messaging, analytics) bound by confidentiality</li>
        <li>When required by law or to protect our legal rights</li>
      </ul>
      <p>
        We sign NDAs on request and treat your catalog, margins and account data as
        strictly confidential.
      </p>

      <h2>5. Data Retention &amp; Security</h2>
      <p>
        We keep your information only as long as needed to serve you and meet legal
        obligations. We use reasonable technical and organisational measures to protect
        your data — including encrypted connections and restricted access for our team.
        No method of transmission over the internet is 100% secure, but we work hard to
        protect your data.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        Under the DPDP Act, 2023 you have the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Ask us to correct inaccuracies</li>
        <li>Withdraw consent / request erasure of your data</li>
        <li>Lodge a complaint with the Data Protection Board of India if needed</li>
      </ul>
      <p>
        To exercise any of these rights, email us at {SITE.email} and we will respond
        within 30 days.
      </p>

      <h2>7. Cookies &amp; Analytics</h2>
      <p>
        This website does not set tracking cookies by itself. If we later add analytics
        or remarketing tools, we will update this policy and where required obtain your
        consent.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our site links to external platforms such as WhatsApp, Instagram and LinkedIn.
        Those platforms have their own privacy policies, and we are not responsible for
        their practices.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The latest version will always be
        published on this page with the date shown above.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        Questions about this policy? Reach us at {SITE.email} or {SITE.phone}.
      </p>
    </LegalPage>
  );
}
