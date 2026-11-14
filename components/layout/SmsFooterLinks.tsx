"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { smsFooterLinks } from "@/lib/sms-footer-links";

/** The footer's SMS links, narrowed to one program on that program's own page (see smsFooterLinks). */
export function SmsFooterLinks({ className }: { className?: string }) {
  return (
    <>
      {smsFooterLinks(usePathname()).map((link) => (
        <Link key={link.href} href={link.href} className={className}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
