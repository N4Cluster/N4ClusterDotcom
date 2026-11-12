import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { resources } from "@/content/pages/resources";

function findResource(slug: string) {
  return resources.find((r) => r.href === `/resources/${slug}`);
}

export async function generateStaticParams() {
  return resources
    .filter((r) => r.body && r.body.length > 0)
    .map((r) => ({ slug: r.href.replace("/resources/", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = findResource(slug);

  if (!resource || !resource.body) {
    notFound();
  }

  return (
    <section className="bg-cream pt-12 pb-16 md:pt-16">
      <Container size="sm">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Resources
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <Badge variant="accent">{resource.category}</Badge>
          {resource.readTime && (
            <span className="text-xs text-muted">{resource.readTime}</span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight mb-4">
          {resource.title}
        </h1>
        <p className="text-lg text-ink-3 leading-relaxed mb-12">
          {resource.excerpt}
        </p>

        <article className="prose prose-lg max-w-none">
          {resource.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-ink-2 leading-relaxed mb-6 text-base"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-16 pt-8 border-t border-line">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-ink-2 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all resources
          </Link>
        </div>
      </Container>
    </section>
  );
}
