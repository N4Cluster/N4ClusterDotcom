import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "light",
  size = 44,
}: {
  variant?: "light" | "dark";
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/brand/n4cluster-mark.svg" alt="" width={size} height={size} priority />
      <span
        className={cn(
          "font-display font-extrabold tracking-tight text-[21px]",
          variant === "light" ? "text-ink" : "text-white"
        )}
      >
        N4Cluster
      </span>
    </span>
  );
}
