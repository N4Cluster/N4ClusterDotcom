import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { proseClasses } from "@/lib/prose";
import { Container } from "@/components/ui/Container";
import {
  orderSampleNote,
  orderSamples,
  otpOptInSteps,
  otpSampleNote,
  otpSamples,
  sms2faDisclosureParts,
  smsOrderDisclosure,
} from "@/content/legal/sms-page";

export const metadata: Metadata = {
  title: "Text Messaging",
  description:
    "How N4Cluster text messaging works: the opt-in screen, exact disclosure and sample messages for order notifications and verification codes, with a link to N4Cluster Deals.",
};

export default function SmsPage() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container size="md">
        <div className={proseClasses}>
          <h1>N4Cluster Text Messaging</h1>
          <p>
            N4Cluster sends three kinds of text messages, each with its own opt-in. Only N4Cluster Deals contains marketing, and it needs its own checkbox. This page shows the opt-in screen, the exact disclosure and sample messages for order notifications and verification codes.
          </p>

          <h2>Order notifications</h2>
          <p>
            Diners who check the text-updates box at checkout receive texts about that order only.
          </p>
          <Image
            src="/sms/checkout-optin.png"
            width={780}
            height={1688}
            alt="Storefront checkout screen with the text-updates checkbox unchecked by default and the order text message disclosure visible beneath it"
            className="mx-auto h-auto w-full max-w-sm rounded-lg border border-line"
          />
          <h3>Disclosure shown at checkout</h3>
          <p>
            {smsOrderDisclosure}{" "}
            <Link href="/terms#sms">Terms</Link> · <Link href="/privacy">Privacy</Link>
          </p>
          <h3>Sample messages</h3>
          <p className="text-muted text-sm">{orderSampleNote}</p>
          <ul>
            {orderSamples.map((s) => (
              <li key={s.event}>
                <strong>{s.event}</strong>
                <br />
                {s.body}
              </li>
            ))}
          </ul>

          <h2>Verification codes</h2>
          <p>
            Storefront diners request a one-time code by text to sign up, log in, recover their account or change their phone number.
          </p>
          <h3>How to opt in</h3>
          <ol>
            {otpOptInSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Image
            src="/sms/storefront-send-code.png"
            width={768}
            height={942}
            alt="Storefront sign-in card with the Send code button and the verification text message disclosure visible beneath it"
            className="mx-auto h-auto w-full max-w-sm rounded-lg border border-line"
          />
          <h3>Disclosure shown beneath Send code</h3>
          <p>
            {sms2faDisclosureParts.map((part, i) =>
              part.type === "link" ? (
                <Link key={i} href={part.href}>
                  {part.text}
                </Link>
              ) : (
                part.text
              ),
            )}
          </p>
          <h3>Sample messages</h3>
          <p className="text-muted text-sm">{otpSampleNote}</p>
          <ul>
            {otpSamples.map((s) => (
              <li key={s.event}>
                <strong>{s.event}</strong>
                <br />
                {s.body}
              </li>
            ))}
          </ul>

          <h2>N4Cluster Deals</h2>
          <p>
            N4Cluster Deals is a separate marketing program with its own optional checkbox. Its opt-in, disclosure and sample messages are on its own page:{" "}
            <Link href="/sms/deals">N4Cluster Deals — Marketing Text Messages</Link>.
          </p>

          <h2>More information</h2>
          <ul>
            <li>
              <Link href="/terms#sms">SMS Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
          <p>
            Questions or help with text messages: <a href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
