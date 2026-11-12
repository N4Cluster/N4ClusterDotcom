import Link from "next/link";
import { protections } from "@/content/site/pricing";

export function FourNs() {
  return (
    <section aria-label="The 4 N's of N4Cluster" className="mx-auto max-w-[1280px] px-6 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] bg-ink on-dark px-6 py-5">
        <div className="text-sm font-semibold uppercase tracking-wider text-gold">The 4 N&apos;s of N4Cluster</div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {protections.map((p) => (
            <li key={p.title} className="text-base font-bold text-white">
              <span aria-hidden="true" className="font-display text-gold mr-1">N</span>
              {p.title}
            </li>
          ))}
        </ul>
        <Link href="/pricing" className="text-sm font-semibold text-gold hover:underline">
          See what each one means →
        </Link>
      </div>
    </section>
  );
}
