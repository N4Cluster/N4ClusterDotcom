import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerLinks } from "@/content/site/footer";
import { Linkedin, Twitter, Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container>
        {/* Top section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 border-b border-navy-800">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-8 h-8 rounded-lg gradient-cobalt flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs tracking-wider">N4</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">N4Cluster</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Merchant-first infrastructure for local commerce. Branded ordering, orchestration, and AI-assisted growth in one connected platform.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-700 transition-colors"
              >
                <Twitter size={15} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-700 transition-colors"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-700 transition-colors"
              >
                <Github size={15} />
              </a>
            </div>

            {/* Sub-brands */}
            <div className="mt-8 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Platform layers</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/platform#n4sync" className="text-xs text-cobalt-400 hover:text-cobalt-300 transition-colors font-medium">
                  N4Sync
                </Link>
                <span className="text-slate-700">·</span>
                <Link href="/n4logic" className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium">
                  N4Logic
                </Link>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                {group.heading}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} N4Cluster. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
