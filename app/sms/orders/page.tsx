import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { proseClasses } from "@/lib/prose";
import { Container } from "@/components/ui/Container";
import { orderSampleNote, orderSamples, smsOrderDisclosure } from "@/content/legal/sms-page";

/**
 * The opt-in page for order-notification texts (campaign C7Q0BFG once it is re-registered). It covers
 * that program only: no marketing and no verification codes. Same wording as the /sms section.
 */
export const metadata: Metadata = {
  title: "N4Cluster Order Text Messages",
  description:
    "N4Cluster order texts: how diners opt in at checkout, the exact disclosure, and sample messages.",
};

export default function SmsOrdersPage() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container size="md">
        <div className={proseClasses}>
          <h1>N4Cluster Order Text Messages</h1>
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
          <h2>Disclosure shown at checkout</h2>
          <p>
            {smsOrderDisclosure}{" "}
            <Link href="/terms#sms-orders">Terms</Link> · <Link href="/privacy">Privacy</Link>
          </p>
          <h2>Sample messages</h2>
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
          <p>
            Questions or help with text messages: <a href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
