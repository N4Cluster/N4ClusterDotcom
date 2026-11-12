import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      href="/contact"
      className="block focus-visible:outline-white focus-visible:-outline-offset-4 bg-ink px-4 py-[11px] text-center text-sm font-medium text-white"
    >
      <span className="mr-2 inline-block rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-ink">
        NEW
      </span>
      Now onboarding pilot restaurants →
    </Link>
  );
}
