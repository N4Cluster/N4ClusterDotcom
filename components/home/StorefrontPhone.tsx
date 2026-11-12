import Image from "next/image";
import { orderTotal } from "./figures";

const items = [
  { name: "Penne arrabbiata", price: "$12.00", src: "pasta-penne" },
  { name: "Crispy chicken", price: "$11.50", src: "fried-chicken" },
  { name: "Noodle bowl", price: "$14.00", src: "noodle-bowl-egg" },
];

export function StorefrontPhone({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Example branded ordering storefront on a phone"
      className={`w-64 overflow-hidden rounded-[38px] border-[9px] border-ink bg-white shadow-[0_30px_60px_rgba(15,26,58,0.35)] ${className}`}
    >
      <div className="relative h-[118px]">
        <Image src="/images/stock/shrimp-spaghetti.jpg" alt="" fill sizes="256px" className="object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end bg-ink/45 px-3.5 py-3 text-white">
          <div className="font-display text-[19px] font-extrabold leading-[1.1]">Maple Street Kitchen</div>
          <div className="text-[11px]">Open until 9pm · Franklin, TN</div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 p-3">
        <div className="flex rounded-full bg-cream-2 p-[3px] text-xs font-semibold">
          <span className="flex-1 rounded-full bg-white p-1.5 text-center shadow-sm">Pickup</span>
          <span className="flex-1 p-1.5 text-center text-muted">Delivery</span>
        </div>
        <div className="flex flex-col gap-[5px] rounded-xl bg-green-tint px-2.5 py-2">
          <div className="flex justify-between text-[11px] font-bold text-green-deep"><span>Rewards</span><span>160 / 200 pts</span></div>
          <div className="h-1.5 rounded-full bg-green/20"><div className="h-1.5 w-4/5 rounded-full bg-green" /></div>
        </div>
        {items.map((i) => (
          <div key={i.name} className="flex items-center gap-2.5">
            <Image src={`/images/stock/${i.src}.jpg`} alt="" width={46} height={46} className="size-[46px] rounded-[10px] object-cover" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold">{i.name}</div>
              <div className="text-[11px] text-muted">{i.price}</div>
            </div>
            <span className="flex size-6 items-center justify-center rounded-full bg-ink text-sm text-white">+</span>
          </div>
        ))}
        <div className="rounded-xl bg-ink p-[11px] text-center text-[13px] font-bold text-white">Checkout · {orderTotal}</div>
      </div>
    </div>
  );
}
