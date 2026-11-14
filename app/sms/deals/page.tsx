import type { Metadata } from "next";
import Link from "next/link";
import { proseClasses } from "@/lib/prose";
import { Container } from "@/components/ui/Container";
import { DealsScreenshots } from "@/components/sms/DealsScreenshots";
import { siteConfig } from "@/content/site/settings";
import {
  dealsOptInSteps,
  dealsPage,
  dealsSampleNote,
  dealsSamples,
  smsDealsCheckboxLabel,
  smsDealsDisclosureParts,
} from "@/content/legal/sms-page";

/**
 * The opt-in page for the N4Cluster Deals Marketing campaign (TCR C1DB2ES). Marketing only: it must
 * not describe, show or link to the order-texts or verification programs (tests/sms-program-pages.test.ts).
 */
export const metadata: Metadata = {
  title: "N4Cluster Deals — Marketing Text Messages",
  description:
    "N4Cluster Deals, the marketing text program of N4Cluster Inc: how to opt in, the exact disclosure, sample messages, and how to get help or stop.",
};

export default function SmsDealsPage() {
  const { email, phone, phoneHref } = siteConfig.contact;
  const { legalName, street } = siteConfig.company;
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container size="md">
        <div className={proseClasses}>
          <h1>{dealsPage.title}</h1>

          <h2>Who sends these texts</h2>
          <p>{dealsPage.whoSends}</p>

          <h2>What you get</h2>
          <p>{dealsPage.whatYouGet}</p>

          <h2>How to opt in</h2>
          <ol>
            {dealsOptInSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <DealsScreenshots />

          <h2>Disclosure shown beneath the checkbox</h2>
          <p>
            <strong>{smsDealsCheckboxLabel}</strong>
          </p>
          <p>
            {smsDealsDisclosureParts.map((part, i) =>
              part.type === "link" ? (
                <Link key={i} href={part.href}>
                  {part.text}
                </Link>
              ) : (
                part.text
              ),
            )}
          </p>

          <h2>Frequency, cost, help and stopping</h2>
          <p>{dealsPage.terms}</p>

          <h2>Sample messages</h2>
          <p className="text-muted text-sm">{dealsSampleNote}</p>
          <ul>
            {dealsSamples.map((s) => (
              <li key={s.event}>
                <strong>{s.event}</strong>
                <br />
                {s.body}
              </li>
            ))}
          </ul>

          <h2>Privacy</h2>
          <p>{dealsPage.privacy}</p>
          <p>
            <Link href="/terms#sms-deals">SMS Terms</Link> · <Link href="/privacy">Privacy Policy</Link>
          </p>

          <hr />
          <p className="text-sm">
            {legalName}, {street}
            <br />
            <a href={`mailto:${email}`}>{email}</a> · <a href={phoneHref}>{phone}</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
