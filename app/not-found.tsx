import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-cream min-h-[70vh] flex items-center">
      <Container className="text-center py-20">
        <p className="text-green-deep font-semibold text-sm uppercase tracking-wider mb-4">404</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink mb-5">Page not found</h1>
        <p className="text-ink-3 text-lg max-w-lg mx-auto mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" size="lg" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
