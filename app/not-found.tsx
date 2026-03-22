import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="gradient-hero min-h-screen flex items-center">
      <Container className="text-center py-20">
        <p className="text-cobalt-400 font-semibold text-sm uppercase tracking-wider mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Page not found</h1>
        <p className="text-slate-300 text-lg max-w-lg mx-auto mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" size="lg" variant="outline">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
