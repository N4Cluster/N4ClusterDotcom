import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { proseClasses } from "@/lib/prose";
import { Container } from "@/components/ui/Container";
import { otpOptInSteps, otpSampleNote, otpSamples, sms2faDisclosureParts } from "@/content/legal/sms-page";

/**
 * The opt-in page for verification codes (2FA campaign C9LCZ0T once it is resubmitted). It covers that
 * program only: no marketing and no order texts. Same wording as the /sms section.
 */
export const metadata: Metadata = {
  title: "N4Cluster Verification Codes",
  description:
    "N4Cluster verification codes: how diners request a one-time code, the exact disclosure, and sample messages.",
};

export default function SmsVerificationPage() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container size="md">
        <div className={proseClasses}>
          <h1>N4Cluster Verification Codes</h1>
          <p>
            Storefront diners request a one-time code by text to sign up, log in, recover their account or change their phone number.
          </p>
          <h2>How to opt in</h2>
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
          <h2>Disclosure shown beneath Send code</h2>
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
          <h2>Sample messages</h2>
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
          <p>
            Questions or help with text messages: <a href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
