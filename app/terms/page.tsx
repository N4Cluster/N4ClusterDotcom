import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "N4Cluster terms of service covering acceptable use, IP ownership, and liability.",
};

export default function TermsPage() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="md">
        <div className="prose prose-slate max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2025</p>

          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the N4Cluster website located at n4cluster.com (the &quot;Site&quot;). By using the Site, you agree to these Terms.
          </p>

          <h2>Informational Nature of the Website</h2>
          <p>
            The content on this Site is provided for informational and marketing purposes only. Nothing on this Site constitutes a binding offer, guarantee of service, or legal advice. Platform features, pricing, and availability are subject to change without notice.
          </p>

          <h2>Acceptable Use</h2>
          <p>You agree not to use the Site to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Transmit harmful, misleading, or fraudulent content</li>
            <li>Attempt to gain unauthorized access to any system or data</li>
            <li>Interfere with the proper operation of the Site</li>
            <li>Scrape or copy content without prior written permission</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this Site — including text, graphics, logos, and software — is the property of N4Cluster or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from Site content without express written permission.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of those sites. Links do not imply endorsement.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, N4Cluster shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Site. The Site is provided &quot;as is&quot; without warranties of any kind.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold N4Cluster harmless from any claims, losses, or damages arising from your use of the Site or your violation of these Terms.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms are governed by the laws of the applicable jurisdiction in which N4Cluster operates. Any disputes shall be resolved in the courts of that jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these Terms, contact us at:{" "}
            <a href="mailto:legal@n4cluster.com">legal@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
