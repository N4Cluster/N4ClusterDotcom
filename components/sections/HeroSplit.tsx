import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroSplitProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  microcopy?: string;
  visual?: React.ReactNode;
}

export function HeroSplit({
  eyebrow,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  microcopy,
  visual,
}: HeroSplitProps) {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
      style={{ background: "linear-gradient(135deg, #040d1c 0%, #0f2040 40%, #162d58 100%)" }}
    >
      {/* Background glows */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(37,99,235,0.12)", transform: "translateX(50%)" }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "rgba(20,184,166,0.10)", transform: "translateX(-33%)" }}
        />
      </div>

      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="max-w-xl">
            {eyebrow && (
              <div className="mb-5">
                <Badge variant="dark">{eyebrow}</Badge>
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {heading}
            </h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "#cbd5e1" }}>
              {subheading}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} size="lg" variant="outline">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
            {microcopy && (
              <p className="mt-4 text-sm" style={{ color: "#64748b" }}>
                {microcopy}
              </p>
            )}
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center">
            {visual ?? <PlatformDiagram />}
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlatformDiagram() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none" style={{ height: 420 }}>
      {/* Grid background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 380 420"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e3a70" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="hero-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="380" height="420" fill="url(#hero-grid)" rx="16" />
        <rect width="380" height="420" fill="url(#hero-glow)" rx="16" />

        {/* Connection lines */}
        {/* Storefront → N4Sync */}
        <line x1="190" y1="96" x2="100" y2="200" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />
        {/* Storefront → N4Logic */}
        <line x1="190" y1="96" x2="282" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />
        {/* N4Sync → Fulfillment */}
        <line x1="100" y1="248" x2="190" y2="320" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.5" />
        {/* N4Logic → Fulfillment */}
        <line x1="282" y1="248" x2="190" y2="320" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.5" />
        {/* Fulfillment → integrations */}
        <line x1="160" y1="362" x2="88" y2="394" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        <line x1="190" y1="364" x2="190" y2="394" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
        <line x1="220" y1="362" x2="292" y2="394" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4" />
      </svg>

      {/* --- Cards (absolute positioned) --- */}

      {/* Merchant Storefront — top center */}
      <div
        className="absolute"
        style={{
          top: 28,
          left: "50%",
          transform: "translateX(-50%)",
          width: 160,
        }}
      >
        <div
          className="rounded-xl px-4 py-3 text-center"
          style={{ background: "#2563eb", boxShadow: "0 8px 24px rgba(37,99,235,0.45)" }}
        >
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Merchant</div>
          <div className="text-sm font-bold text-white">Branded Storefront</div>
        </div>
      </div>

      {/* N4Sync — middle left */}
      <div className="absolute" style={{ top: 176, left: 28, width: 144 }}>
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "#0f2a3a", border: "1.5px solid #14b8a6", boxShadow: "0 4px 16px rgba(20,184,166,0.25)" }}
        >
          <div className="text-xs font-semibold mb-0.5" style={{ color: "#14b8a6" }}>N4Sync</div>
          <div className="text-sm font-bold text-white">Orchestration</div>
          <div className="flex gap-1 mt-2">
            {["Orders", "Status", "Sync"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: "rgba(20,184,166,0.15)", color: "#2dd4bf" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* N4Logic — middle right */}
      <div className="absolute" style={{ top: 176, right: 28, width: 144 }}>
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: "#1c1400", border: "1.5px solid #f59e0b", boxShadow: "0 4px 16px rgba(245,158,11,0.25)" }}
        >
          <div className="text-xs font-semibold mb-0.5" style={{ color: "#f59e0b" }}>N4Logic</div>
          <div className="text-sm font-bold text-white">AI Intelligence</div>
          <div className="flex gap-1 mt-2">
            {["Demand", "Growth", "Ops"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Fulfillment — bottom center */}
      <div
        className="absolute"
        style={{ top: 302, left: "50%", transform: "translateX(-50%)", width: 148 }}
      >
        <div
          className="rounded-xl px-4 py-3 text-center"
          style={{ background: "#0f172a", border: "1px solid #334155" }}
        >
          <div className="text-xs mb-0.5" style={{ color: "#64748b" }}>Connected</div>
          <div className="text-sm font-bold text-white">Fulfillment Layer</div>
        </div>
      </div>

      {/* Integration chips — bottom row */}
      {[
        { label: "POS", left: 52 },
        { label: "Payments", left: "50%", center: true },
        { label: "Delivery", right: 52 },
      ].map((chip) => (
        <div
          key={chip.label}
          className="absolute"
          style={{
            bottom: 16,
            ...(chip.center
              ? { left: "50%", transform: "translateX(-50%)" }
              : chip.left !== undefined
              ? { left: chip.left }
              : { right: chip.right }),
          }}
        >
          <div
            className="rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155" }}
          >
            {chip.label}
          </div>
        </div>
      ))}

      {/* Floating metric badge */}
      <div
        className="absolute"
        style={{ top: 120, right: -16 }}
      >
        <div
          className="rounded-xl px-3 py-2 text-xs"
          style={{ background: "rgba(10,22,40,0.92)", border: "1px solid #1e3a70", backdropFilter: "blur(8px)" }}
        >
          <div style={{ color: "#64748b" }}>Direct revenue</div>
          <div className="font-bold text-base" style={{ color: "#ffffff" }}>94%</div>
          <div style={{ color: "#14b8a6" }}>merchant-owned</div>
        </div>
      </div>
    </div>
  );
}
