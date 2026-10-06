import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Consultancy Wala website and services.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="September 2026">
      <p>
        Welcome to Consultancy Wala. By using this website or engaging our services, you
        agree to the terms below. Please read them carefully. If you do not agree with
        any part of these terms, please do not use our services.
      </p>

      <h2>1. About Our Services</h2>
      <p>
        Consultancy Wala provides e-commerce growth services including marketplace
        onboarding (Amazon, Flipkart, Meesho and others), product listing &amp; cataloging,
        Amazon PPC and advertising, account management, inventory &amp; logistics support,
        brand protection, website development and performance analytics.
      </p>

      <h2>2. No Guarantee of Results</h2>
      <p>
        While we work hard to grow your business, we do not and cannot guarantee specific
        sales figures, ranking positions or return on ad spend. Marketplace performance
        depends on factors beyond our control, including platform policies, competition,
        seasonality and market conditions. Any projections shared during consultations are
        estimates, not promises.
      </p>

      <h2>3. Client Responsibilities</h2>
      <p>
        You agree to provide accurate business information and timely access to the
        accounts, dashboards and documents we reasonably need. You are responsible for the
        legality of your products and listings, and for complying with each
        marketplace&apos;s seller policies.
      </p>

      <h2>4. Engagements &amp; Fees</h2>
      <p>
        Each engagement is defined by a written proposal (or an accepted quote) which
        states scope, fees and duration. We mix a fixed monthly retainer with a
        performance component for advertising. Fees do not include marketplace
        commissions, advertising spend or third-party costs, which are your responsibility
        unless stated otherwise.
      </p>

      <h2>5. Confidentiality &amp; Data</h2>
      <p>
        We treat your business data as confidential and sign NDAs on request. You agree
        not to misuse any proprietary tools, templates or methodologies we share. Our
        handling of personal data is governed by our Privacy Policy.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The content of this website — text, graphics, logos and branding — belongs to
        Consultancy Wala and may not be reproduced without written permission. Any work
        product we create for you (listings, ad creatives, websites) is licensed to you as
        agreed in your engagement.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, our total liability for any claim arising
        from an engagement is limited to the fees you paid us in the three months
        preceding the claim. We are not liable for indirect, incidental or consequential
        damages, including lost profits or lost sales, even if advised of their
        possibility.
      </p>

      <h2>8. Cancellation &amp; Termination</h2>
      <p>
        Either party may end an engagement with notice as specified in the proposal.
        Fees for work already delivered remain payable. Upon termination, we will hand
        over your account access and any deliverables owned by you within a reasonable
        period.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of India. Disputes are subject to the
        exclusive jurisdiction of the courts at Patna, Bihar.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any questions about these terms, write to us at {SITE.email} or call{" "}
        {SITE.phone}.
      </p>
    </LegalPage>
  );
}
