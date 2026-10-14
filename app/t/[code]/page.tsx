import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { resolveTrackingCode, statusLabels } from "@/lib/tracking";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Track your order",
  // A tracking link belongs to one diner's order; keep it out of search.
  robots: { index: false, follow: false },
};

interface Props {
  params: Promise<{ code: string }>;
}

export default async function TrackingLinkPage({ params }: Props) {
  const { code } = await params;
  const result = await resolveTrackingCode(code);

  if (result.kind === "not_found") notFound();

  if (result.kind === "unavailable") {
    return (
      <section className="bg-white pt-32 pb-20">
        <Container size="sm">
          <h1 className="text-3xl font-bold text-navy-900 mb-4">Tracking is temporarily unavailable</h1>
          <p className="text-slate-600">
            We couldn&apos;t load this order right now. Please try the link again in a minute, or
            email <a className="text-cobalt-600 underline" href="mailto:contact@n4cluster.com">contact@n4cluster.com</a>.
          </p>
        </Container>
      </section>
    );
  }

  const { summary } = result;
  const isDelivery = summary.fulfillmentMode === "DELIVERY";

  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="sm">
        {summary.demo && (
          <p className="mb-6 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-600">
            This is a sample order showing what a diner sees when they open a tracking link from an
            N4Cluster order text.
          </p>
        )}
        <p className="text-sm font-semibold uppercase tracking-wider text-cobalt-600 mb-2">
          {summary.merchantName}
        </p>
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Order #{summary.orderNo}</h1>
        <p className="text-xl text-navy-800 mb-8" aria-live="polite">
          {statusLabels[summary.status]}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          {isDelivery && summary.courierTrackingUrl && (
            <a
              href={summary.courierTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-cobalt-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cobalt-600"
            >
              Track your courier
            </a>
          )}
          {summary.orderUrl && (
            <a
              href={summary.orderUrl}
              className="inline-flex items-center justify-center rounded-lg border border-cobalt-500 px-6 py-3 text-sm font-semibold text-cobalt-500 hover:bg-cobalt-500 hover:text-white"
            >
              View order details
            </a>
          )}
        </div>
        {isDelivery && !summary.courierTrackingUrl && summary.status !== "DELIVERED" && (
          <p className="mt-4 text-sm text-slate-600">
            A live courier tracking link appears here once the courier has your order.
          </p>
        )}

        <p className="mt-12 text-xs text-slate-500">
          Order updates by text from N4Cluster. Reply STOP to opt out, HELP for help.{" "}
          <a className="underline" href="/terms#sms">SMS Terms</a> ·{" "}
          <a className="underline" href="/privacy#sms">Privacy</a>
        </p>
      </Container>
    </section>
  );
}
