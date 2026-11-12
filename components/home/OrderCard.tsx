import { orderTotal, youKeep } from "./figures";

export function OrderCard({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex w-[210px] flex-col gap-[7px] rounded-[18px] bg-white px-[18px] py-4 shadow-[0_20px_44px_rgba(15,26,58,0.28)] ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-muted">
        <span className="size-2 rounded-full bg-green" />
        NEW ORDER #1042
      </div>
      <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{orderTotal}</span></div>
      <div className="flex justify-between text-sm"><span>Commission</span><span className="font-semibold">$0.00</span></div>
      <div className="h-px bg-cream-3" />
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold">You keep</span>
        <span className="font-display text-[26px] font-extrabold text-green">{youKeep}</span>
      </div>
    </div>
  );
}
