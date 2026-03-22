import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

interface TrustStripProps {
  items: string[];
  dark?: boolean;
}

export function TrustStrip({ items, dark = false }: TrustStripProps) {
  return (
    <div className={`${dark ? "bg-navy-900 border-navy-800" : "bg-slate-50 border-slate-200"} border-y py-4`}>
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  dark ? "bg-teal-500/20" : "bg-teal-500/15"
                }`}
              >
                <Check size={10} className="text-teal-500" strokeWidth={3} />
              </div>
              <span
                className={`text-sm font-medium ${dark ? "text-slate-300" : "text-slate-700"}`}
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
