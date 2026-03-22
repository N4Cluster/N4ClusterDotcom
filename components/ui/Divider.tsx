import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  dark?: boolean;
}

export function Divider({ className, dark = false }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        dark ? "border-navy-700" : "border-slate-200",
        className
      )}
    />
  );
}
