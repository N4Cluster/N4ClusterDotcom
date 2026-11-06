import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  dealsOptInSteps,
  dealsSampleNote,
  dealsSamples,
  orderSampleNote,
  orderSamples,
  otpOptInSteps,
  otpSampleNote,
  otpSamples,
  sms2faDisclosureParts,
  smsDealsCheckboxLabel,
  smsDealsDisclosureParts,
  smsOrderDisclosure,
} from "@/content/legal/sms-page";

export const metadata: Metadata = {
  title: "N4Cluster Text Messaging",
  description:
    "How N4Cluster text messaging works: the opt-in screen and exact disclosure for order notifications, verification codes and N4Cluster Deals, with sample messages.",
};

export default function SmsPage() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="md">
        <div className="prose prose-slate max-w-none">
          <h1>N4Cluster Text Messaging</h1>
          <p>
            N4Cluster sends three kinds of text messages, each with its own opt-in. Only N4Cluster Deals contains marketing, and it needs its own checkbox. This page shows each opt-in screen, the exact disclosure shown with it, and sample messages.
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
            className="mx-auto h-auto w-full max-w-sm rounded-lg border border-slate-200"
          />
          <h3>Disclosure shown at checkout</h3>
          <p>
            {smsOrderDisclosure}{" "}
            <Link href="/terms#sms">Terms</Link> · <Link href="/privacy">Privacy</Link>
          </p>
          <h3>Sample messages</h3>
          <p className="text-slate-600 text-sm">{orderSampleNote}</p>
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
            className="mx-auto h-auto w-full max-w-sm rounded-lg border border-slate-200"
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
          <p className="text-slate-600 text-sm">{otpSampleNote}</p>
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
            Diners who check the optional N4Cluster Deals box receive recurring marketing texts about restaurants they have ordered from. The box is separate from the order-texts box and is never pre-checked.
          </p>
          <h3>How to opt in</h3>
          <ol>
            {dealsOptInSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {/*
            TODO(sms-deals-screenshots): add two <Image> elements here once the Deals box is live
            on the storefront: src="/sms/checkout-deals-optin.png" (checkout) and
            src="/sms/account-deals-optin.png" (/account/settings), alt from dealsScreenshotAlt in
            content/legal/sms-page.ts. Capture at 2x, at least 600px wide, box unchecked, showing the
            Deals name and logo and the separate order-texts box; set width/height to the files'
            real pixel size. Then turn the it.todo in tests/sms-page.test.ts into a real check.
          */}
          <h3>Disclosure shown beneath the checkbox</h3>
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
          <h3>Sample messages</h3>
          <p className="text-slate-600 text-sm">{dealsSampleNote}</p>
          <ul>
            {dealsSamples.map((s) => (
              <li key={s.event}>
                <strong>{s.event}</strong>
                <br />
                {s.body}
              </li>
            ))}
          </ul>

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
