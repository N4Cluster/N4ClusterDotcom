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
    <section className="gradient-hero pt-32 pb-12">
      <Container size="sm">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Resources
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <Badge variant="cobalt">{resource.category}</Badge>
          {resource.readTime && (
            <span className="text-xs text-slate-400">{resource.readTime}</span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
          {resource.title}
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-12">
          {resource.excerpt}
        </p>

        <article className="prose prose-lg max-w-none">
          {resource.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-slate-200 leading-relaxed mb-6 text-base"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-16 pt-8 border-t border-navy-700">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-400 hover:text-cobalt-300 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all resources
          </Link>
        </div>
      </Container>
    </section>
  );
}
