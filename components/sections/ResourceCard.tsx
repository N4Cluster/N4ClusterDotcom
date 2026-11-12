import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

export interface Resource {
  category: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  readTime?: string;
  body?: string[];
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={resource.href}
      className="group flex flex-col bg-white border border-line rounded-[22px] p-6 hover:shadow-[0_16px_36px_rgba(15,26,58,0.12)] hover:border-ink/30 transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="accent">{resource.category}</Badge>
        {resource.readTime && (
          <span className="text-xs text-muted">{resource.readTime}</span>
        )}
      </div>
      <h3 className="font-display text-base font-bold text-ink leading-snug mb-3">
        {resource.title}
      </h3>
      <p className="text-sm text-ink-3 leading-relaxed flex-1 mb-4">{resource.excerpt}</p>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        Read more
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

export function ResourceGrid({ resources }: { resources: Resource[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((r) => (
        <ResourceCard key={r.href} resource={r} />
      ))}
    </div>
  );
}
