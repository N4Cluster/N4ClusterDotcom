import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "How N4Cluster uses cookies and similar tracking technologies on the website.",
};

export default function CookiesPage() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="md">
        <div className="prose prose-slate max-w-none">
          <h1>Cookie Notice</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2025</p>

          <p>
            This Cookie Notice explains how N4Cluster uses cookies and similar technologies on the n4cluster.com website. By continuing to browse the site, you consent to the use of cookies as described here.
          </p>

          <h2>What Are Cookies</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website operators.
          </p>

          <h2>How We Use Cookies</h2>

          <h3>Strictly necessary cookies</h3>
          <p>
            These cookies are required for the site to function properly. They enable basic features like page navigation and form submission. You cannot opt out of these cookies while using the site.
          </p>

          <h3>Analytics cookies</h3>
          <p>
            We use analytics tools to understand how visitors interact with the site — including which pages are visited, how long visitors stay, and how they arrived. This data is used in aggregate to improve site content and performance. Analytics cookies may be set by first-party tools or trusted third-party analytics providers.
          </p>

          <h3>Preference cookies</h3>
          <p>
            These cookies remember choices you make (such as language or display preferences) to provide a more personalized experience. They are not used for advertising purposes.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            Some features of the site may use third-party services (such as analytics platforms or embedded content) that set their own cookies. We do not control these third-party cookies. Please review the privacy policies of those services for more information.
          </p>

          <h2>Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete some or all cookies</li>
            <li>Block cookies from specific sites or all sites</li>
          </ul>
          <p>
            Note that blocking or deleting cookies may affect site functionality. Instructions for managing cookies vary by browser — consult your browser's help documentation for guidance.
          </p>

          <h2>Future-Readiness</h2>
          <p>
            As our platform and website evolve, we may introduce additional cookie types for functional or performance purposes. This notice will be updated to reflect any material changes. We will communicate significant updates through appropriate means.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about our use of cookies, contact us at:{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
