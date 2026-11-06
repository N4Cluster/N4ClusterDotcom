import { NextResponse } from "next/server";
import { dealLinks } from "@/content/site/deal-links";

/**
 * Deals links quoted in N4Cluster Deals texts (https://www.n4cluster.com/r/<slug>),
 * redirecting to the promoted dish on its storefront. Kept out of search by robots.ts.
 */
const SLUG = /^[a-z0-9-]{2,48}$/;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Own keys only, so "constructor" and the like don't resolve to Object.prototype.
  const target = SLUG.test(slug) && Object.hasOwn(dealLinks, slug) ? dealLinks[slug] : undefined;
  if (!target) return new NextResponse("Not found", { status: 404 });
  return NextResponse.redirect(target, 302);
}
