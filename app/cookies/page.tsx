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
          <p className="text-slate-600 text-sm">Last updated: September 2026</p>

          <p>
            This Cookie Notice explains how N4Cluster uses cookies and similar technologies on the n4cluster.com website. Analytics cookies are not set unless you accept them in the consent banner shown on your first visit — browsing the site is not treated as consent.
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

          <h3>Analytics cookies — only with your consent</h3>
          <p>
            We use Google Analytics 4 to understand how visitors interact with the site — which pages are visited, how long visitors stay, and how they arrived. This data is used in aggregate to improve site content and performance.
          </p>
          <p>
            These cookies, and the Google Analytics script itself, load only after you select <strong>Accept</strong> in the consent banner. If you select <strong>Decline</strong>, the script is never loaded and no analytics cookies are set. If you accept and later change your mind, analytics collection stops as soon as your choice changes.
          </p>

          <h3>Preference storage</h3>
          <p>
            Your answer to the consent banner is stored in your browser&apos;s local storage (under the key <code>n4cluster-cookie-consent</code>) so you are not asked again on every page. It is a single value recording your choice, it stays on your device, and it is not sent to us or to any third party. It is not used for advertising.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            Where you have accepted analytics, Google Analytics 4 sets its own cookies and receives usage data as a third party. We do not control how Google processes that data — see{" "}
            <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
              Google&apos;s Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/technologies/cookies" rel="noopener noreferrer" target="_blank">
              Google&apos;s cookie documentation
            </a>
            . We do not use advertising or cross-site tracking pixels.
          </p>

          <h2>Changing Your Choice</h2>
          <p>
            Select <strong>Cookie preferences</strong> in the site footer at any time. That clears your stored answer and shows the consent banner again, so you can accept or decline afresh. Declining after having accepted stops analytics collection immediately.
          </p>

          <h2>Managing Cookies in Your Browser</h2>
          <p>
            You can also control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete some or all cookies</li>
            <li>Block cookies from specific sites or all sites</li>
          </ul>
          <p>
            Note that blocking or deleting cookies may affect site functionality. Instructions for managing cookies vary by browser — consult your browser&apos;s help documentation for guidance.
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
