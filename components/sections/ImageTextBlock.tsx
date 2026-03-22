import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check } from "lucide-react";

interface ImageTextBlockProps {
  eyebrow?: string;
  heading: string;
  body: string;
  bullets?: string[];
  cta?: { label: string; href: string };
  reverse?: boolean;
  dark?: boolean;
  visual?: React.ReactNode;
  accentColor?: "cobalt" | "teal" | "amber";
}

export function ImageTextBlock({
  eyebrow,
  heading,
  body,
  bullets,
  cta,
  reverse = false,
  dark = false,
  visual,
  accentColor = "cobalt",
}: ImageTextBlockProps) {
  const checkClass = {
    cobalt: "bg-cobalt-500/15 text-cobalt-500",
    teal: "bg-teal-500/15 text-teal-500",
    amber: "bg-amber-400/15 text-amber-500",
  }[accentColor];

  return (
    <div className={`py-16 ${dark ? "" : "bg-white"}`} style={dark ? { background: "linear-gradient(135deg, #0a1628 0%, #162d58 100%)" } : undefined}>
      <Container>
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          <div className={reverse ? "lg:col-start-2" : ""}>
            {eyebrow && (
              <div className="mb-4">
                <Badge variant={dark ? "dark" : "cobalt"}>{eyebrow}</Badge>
              </div>
            )}
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4 ${
                dark ? "text-white" : "text-navy-950"
              }`}
              style={!dark ? { color: "#040d1c" } : undefined}
            >
              {heading}
            </h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${dark ? "" : "text-slate-600"}`}
              style={dark ? { color: "#cbd5e1" } : undefined}
            >
              {body}
            </p>
            {bullets && (
              <ul className="space-y-3 mb-6">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkClass}`}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${dark ? "" : "text-slate-600"}`} style={dark ? { color: "#cbd5e1" } : undefined}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <Button href={cta.href}>
                {cta.label}
              </Button>
            )}
          </div>

          <div className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
            {visual ?? <DefaultVisual accentColor={accentColor} dark={dark} />}
          </div>
        </div>
      </Container>
    </div>
  );
}

function DefaultVisual({ accentColor, dark }: { accentColor: "cobalt" | "teal" | "amber"; dark: boolean }) {
  if (accentColor === "teal") return <N4LogicVisual />;
  if (accentColor === "cobalt") return <N4SyncVisual />;
  return <GenericVisual dark={dark} />;
}

/* ---- N4Logic visual: AI insights dashboard ---- */
function N4LogicVisual() {
  const signals = [
    { label: "Repeat purchase rate", value: "+18%", color: "#14b8a6", bar: 78 },
    { label: "Peak demand window", value: "Fri 6–8pm", color: "#2563eb", bar: 62 },
    { label: "Campaign open rate", value: "34%", color: "#f59e0b", bar: 54 },
    { label: "Ops exception rate", value: "−22%", color: "#14b8a6", bar: 38 },
  ];

  return (
    <div
      className="rounded-2xl p-6 w-full"
      style={{ background: "#0a1628", border: "1px solid #1e3a70" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>
            N4Logic
          </div>
          <div className="font-bold" style={{ color: "#ffffff" }}>
            Intelligence Dashboard
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
        >
          AI
        </div>
      </div>

      {/* Signals */}
      <div className="space-y-4 mb-5">
        {signals.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ color: "#94a3b8" }}>{s.label}</span>
              <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: "#1e293b" }}>
              <div
                className="h-1.5 rounded-full transition-all"
                style={{ width: `${s.bar}%`, background: s.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestion card */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
      >
        <div className="text-xs font-semibold mb-1" style={{ color: "#f59e0b" }}>
          Growth suggestion
        </div>
        <div className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
          Launch a Friday evening promotion — your repeat customers are 2.4× more likely to order between 6–8pm.
        </div>
        <div
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 cursor-pointer"
          style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}
        >
          Review suggestion
        </div>
      </div>
    </div>
  );
}

/* ---- N4Sync visual: orchestration flow ---- */
function N4SyncVisual() {
  const steps = [
    { label: "Order placed", status: "done", color: "#14b8a6" },
    { label: "POS confirmed", status: "done", color: "#14b8a6" },
    { label: "Kitchen notified", status: "active", color: "#2563eb" },
    { label: "Driver assigned", status: "pending", color: "#334155" },
    { label: "Delivered", status: "pending", color: "#334155" },
  ];

  return (
    <div
      className="rounded-2xl p-6 w-full"
      style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#64748b" }}>
            N4Sync
          </div>
          <div className="font-bold" style={{ color: "#040d1c" }}>
            Order Orchestration
          </div>
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(20,184,166,0.12)", color: "#0d9488" }}
        >
          Live
        </div>
      </div>

      {/* Live order */}
      <div
        className="rounded-xl p-4 mb-5"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold" style={{ color: "#040d1c" }}>Order #4821</span>
          <span className="text-xs" style={{ color: "#64748b" }}>2 min ago</span>
        </div>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              {/* Step indicator */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: step.status === "pending" ? "#f1f5f9" : step.status === "active" ? "rgba(37,99,235,0.12)" : "rgba(20,184,166,0.12)",
                    border: `1.5px solid ${step.color}`,
                    color: step.color,
                  }}
                >
                  {step.status === "done" ? "✓" : step.status === "active" ? "●" : "○"}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-6 w-px h-3 -translate-x-1/2"
                    style={{ background: i < 2 ? "#14b8a6" : "#e2e8f0" }}
                  />
                )}
              </div>
              {/* Label */}
              <span
                className="text-xs"
                style={{
                  color: step.status === "pending" ? "#94a3b8" : step.status === "active" ? "#2563eb" : "#0f172a",
                  fontWeight: step.status === "active" ? 600 : 400,
                }}
              >
                {step.label}
              </span>
              {step.status === "active" && (
                <span
                  className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb" }}
                >
                  In progress
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Orders today", value: "247", color: "#040d1c" },
          { label: "Avg handoff", value: "1.2m", color: "#14b8a6" },
          { label: "Exceptions", value: "0", color: "#0d9488" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-3 text-center"
            style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
          >
            <div className="font-bold text-base" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs" style={{ color: "#94a3b8" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Generic fallback ---- */
function GenericVisual({ dark }: { dark: boolean }) {
  const bg = dark ? "#0f2040" : "#f8fafc";
  const border = dark ? "#1e3a70" : "#e2e8f0";
  const card = dark ? "#162d58" : "#ffffff";
  const cardBorder = dark ? "#1e3a70" : "#e2e8f0";
  const labelColor = dark ? "#94a3b8" : "#64748b";

  const rects = [
    { x: 20, y: 30, w: 80, h: 36, fill: "#2563eb", label: "Channel A" },
    { x: 130, y: 20, w: 80, h: 46, fill: "#14b8a6", label: "Platform" },
    { x: 240, y: 30, w: 80, h: 36, fill: "#162d58", label: "Channel B" },
    { x: 130, y: 110, w: 80, h: 36, fill: "#2563eb", label: "N4Sync" },
    { x: 60, y: 168, w: 72, h: 28, fill: card, label: "POS", stroke: cardBorder },
    { x: 154, y: 168, w: 72, h: 28, fill: card, label: "Orders", stroke: cardBorder },
    { x: 248, y: 168, w: 72, h: 28, fill: card, label: "Delivery", stroke: cardBorder },
  ];

  return (
    <div
      className="rounded-2xl p-4 w-full aspect-video"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      <svg viewBox="0 0 380 210" className="w-full h-full" fill="none">
        {/* connector lines */}
        <line x1="60" y1="66" x2="170" y2="110" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.6" />
        <line x1="170" y1="66" x2="170" y2="110" stroke="#14b8a6" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="280" y1="66" x2="170" y2="110" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.6" />
        <line x1="170" y1="146" x2="96" y2="168" stroke="#475569" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
        <line x1="170" y1="146" x2="190" y2="168" stroke="#475569" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />
        <line x1="170" y1="146" x2="284" y2="168" stroke="#475569" strokeWidth="1" strokeDasharray="4 3" strokeOpacity="0.5" />

        {rects.map((r) => (
          <g key={r.label}>
            <rect
              x={r.x} y={r.y} width={r.w} height={r.h} rx="7"
              fill={r.stroke ? r.fill : r.fill + "dd"}
              stroke={r.stroke ?? "none"}
              strokeWidth={r.stroke ? 1 : 0}
            />
            <text
              x={r.x + r.w / 2} y={r.y + r.h / 2 + 4}
              textAnchor="middle"
              fill={r.stroke ? labelColor : "#ffffff"}
              fontSize="10"
              fontWeight={r.stroke ? "400" : "600"}
              fontFamily="system-ui, sans-serif"
            >
              {r.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
