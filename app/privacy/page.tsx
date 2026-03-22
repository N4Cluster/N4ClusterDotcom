import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "N4Cluster privacy policy covering data collection, use, and your rights.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="md">
        <div className="prose prose-slate max-w-none">
          <h1>Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: March 2025</p>

          <p>
            N4Cluster (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of the people who interact with our website and platform. This Privacy Policy describes the types of information we collect, how we use it, and the choices available to you.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information you provide</h3>
          <p>
            When you submit a contact form, request a demo, or sign up for updates, we collect information you provide directly — such as your name, work email address, company name, and the content of your message.
          </p>
          <h3>Analytics and usage data</h3>
          <p>
            We may collect information about how you interact with our website, including pages visited, time spent, referring URLs, and device or browser type. This is collected through analytics tools and is used to improve the site and understand how it performs.
          </p>
          <h3>Cookies</h3>
          <p>
            Our website uses cookies and similar tracking technologies for functional and analytics purposes. You can manage cookie preferences through your browser settings. See our Cookie Notice for more detail.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to inquiries and follow up on demo requests</li>
            <li>To send updates, resources, or information you have requested</li>
            <li>To understand how our website is being used and improve it</li>
            <li>To comply with applicable legal obligations</li>
          </ul>

          <h2>How We Share Your Information</h2>
          <p>
            We do not sell your personal information. We may share information with trusted service providers who assist in operating our website or communications — such as email providers or analytics platforms — under appropriate data processing arrangements.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain contact and inquiry information for as long as necessary to respond and maintain appropriate business records. You may request deletion of your data at any time.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal data. To exercise any of these rights, contact us at the address below.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect personal information from unauthorized access, disclosure, or loss. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions or requests, contact us at:{" "}
            <a href="mailto:privacy@n4cluster.com">privacy@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
