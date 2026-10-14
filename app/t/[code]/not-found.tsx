import { Container } from "@/components/ui/Container";

export default function TrackingLinkNotFound() {
  return (
    <section className="bg-white pt-32 pb-20">
      <Container size="sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-cobalt-600 mb-2">404</p>
        <h1 className="text-3xl font-bold text-navy-900 mb-4">This tracking link has expired</h1>
        <p className="text-slate-600">
          Tracking links stop working a while after an order is complete, or the link may have been
          copied incompletely. For help with an order, email{" "}
          <a className="text-cobalt-600 underline" href="mailto:contact@n4cluster.com">
            contact@n4cluster.com
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
