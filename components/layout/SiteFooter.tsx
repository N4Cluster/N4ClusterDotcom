import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { footerLinks } from "@/content/site/footer";
import { siteConfig } from "@/content/site/settings";
import { CookiePreferencesButton } from "@/components/CookiePreferencesButton";

const legalClass = "text-[13px] text-white/70 hover:text-white transition-colors";

export function SiteFooter() {
  const { phone, phoneHref, email } = siteConfig.contact;
  return (
    <footer className="on-dark bg-ink text-white/75">
      <Container>
        <div className="flex flex-wrap justify-between gap-10 py-16">
          <div className="flex max-w-[340px] flex-1 basis-64 flex-col gap-3">
            <Link href="/" aria-label="N4Cluster home" className="self-start">
              <Logo variant="dark" size={38} />
            </Link>
            <p className="text-sm">
              Commission-free online ordering for neighborhood restaurants. Made in Franklin, TN.
            </p>
            <p className="text-sm">
              <a href={phoneHref} className="hover:text-white">{phone}</a>
              {" · "}
              <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {footerLinks.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-3 text-sm font-bold text-white">{group.heading}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-6 sm:flex-row">
          <p className="text-[13px] text-white/70">© {new Date().getFullYear()} N4Cluster Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className={legalClass}>Privacy</Link>
            <Link href="/terms" className={legalClass}>Terms</Link>
            <Link href="/terms#sms" className={legalClass}>SMS Terms</Link>
            <Link href="/sms" className={legalClass}>Text Messaging</Link>
            <Link href="/cookies" className={legalClass}>Cookies</Link>
            <CookiePreferencesButton className={legalClass} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
