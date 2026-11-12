import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

interface TrustStripProps {
  items: string[];
  dark?: boolean;
}

export function TrustStrip({ items, dark = false }: TrustStripProps) {
  return (
    <div className={`${dark ? "on-dark bg-ink border-white/15" : "bg-cream-2 border-line"} border-y py-4`}>
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  dark ? "bg-gold/20" : "bg-green-tint"
                }`}
              >
                <Check size={10} className={dark ? "text-gold" : "text-green"} strokeWidth={3} />
              </div>
              <span
                className={`text-sm font-medium ${dark ? "text-white/80" : "text-ink-2"}`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
