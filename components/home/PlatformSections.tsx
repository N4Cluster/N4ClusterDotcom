import Image from "next/image";
import type { ReactNode } from "react";

const shadow = "shadow-[0_24px_50px_rgba(15,26,58,0.3)]";
const h3 = "font-display text-[clamp(32px,3.6vw,46px)] font-extrabold leading-[1.02] tracking-[-0.03em]";
const lede = "text-lg text-ink-2";

function Photo({ src, alt, className = "", pos }: { src: string; alt: string; className?: string; pos?: string }) {
  return (
    <Image
      src={`/images/stock/${src}`}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={`object-cover ${className}`}
      style={pos ? { objectPosition: pos } : undefined}
    />
  );
}

function Visual({ children, id }: { children: ReactNode; id?: string }) {
  return <div id={id} className="relative h-[560px] min-w-0 flex-[1_1_540px] overflow-hidden rounded-[32px]">{children}</div>;
}

function Label({ n, name }: { n: string; name: string }) {
  return <span className="font-display text-lg font-extrabold text-red">{n} · {name}</span>;
}

const menu = [
  ["shrimp-spaghetti.jpg", "Shrimp linguine", "$16.50"],
  ["pasta-penne.jpg", "Penne arrabbiata", "$12.00"],
  ["fried-chicken.jpg", "Crispy chicken", "$11.50"],
  ["noodle-bowl-egg.jpg", "Noodle bowl", "$14.00"],
];

function Ordering() {
  return (
    <div id="ordering" className="flex scroll-mt-24 flex-wrap items-center gap-16">
      <Visual>
        <Photo src="ramen-shrimp.jpg" alt="A bowl of noodles with shrimp" />
        <div aria-hidden="true" className={`absolute inset-x-7 bottom-7 overflow-hidden rounded-[18px] bg-white ${shadow}`}>
          <div className="flex items-center gap-1.5 border-b border-cream-3 px-3 py-2.5">
            {[0, 1, 2].map((i) => <span key={i} className="size-[9px] rounded-full bg-cream-3" />)}
            <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-cream-2 px-2.5 py-1 text-xs text-ink-3">maplestreetkitchen.com/order</span>
          </div>
          <div className="grid grid-cols-4 gap-2.5 p-3.5">
            {menu.map(([src, name, price]) => (
              <div key={name} className="flex min-w-0 flex-col gap-1.5">
                <div className="relative aspect-square overflow-hidden rounded-[10px]">
                  <Image src={`/images/stock/${src}`} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="text-xs font-bold leading-tight">{name}</div>
                <div className="text-[11px] text-muted">{price}</div>
              </div>
            ))}
          </div>
        </div>
      </Visual>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
        <Label n="01" name="Ordering" />
        <h3 className={h3}>An ordering site on your own domain, in your own colors.</h3>
        <p className={lede}>On your domain, in your colors, built from your menu. We set it up and clean it up, and nothing goes live without your sign-off.</p>
        <ul className="flex flex-col gap-2.5 font-medium">
          {["Pickup, delivery and scheduled orders", "Stripe payments, with you as merchant of record", "No website yet? We'll set up your domain too"].map((t) => (
            <li key={t} className="flex gap-2.5"><span aria-hidden="true" className="font-extrabold text-green">✓</span>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Rewards() {
  return (
    <div id="rewards" className="flex scroll-mt-24 flex-wrap-reverse items-center gap-16">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
        <Label n="02" name="Rewards" />
        <h3 className={h3}>Turn every pickup into the next visit.</h3>
        <p className={lede}>Guests earn points on every direct order and redeem them right at checkout. Each reward pulls them away from the app and back to you.</p>
        <div className="flex flex-wrap gap-2.5 text-sm">
          <span className="rounded-full bg-green-tint px-3.5 py-2 font-bold text-green-deep">Live today</span>
          <span className="rounded-full bg-cream-2 px-3.5 py-2 font-semibold">Points on menu subtotal</span>
          <span className="rounded-full bg-cream-2 px-3.5 py-2 font-semibold">Your own reward catalog</span>
        </div>
      </div>
      <Visual>
        <Photo src="croissant-tray.jpg" alt="A tray of fresh croissants" />
        <div aria-hidden="true" className={`absolute bottom-7 left-7 flex w-[290px] max-w-[calc(100%-56px)] flex-col gap-3 rounded-[20px] bg-white p-[18px] ${shadow}`}>
          <div>
            <div className="text-sm font-bold">A guest earned 40 points</div>
            <div className="text-xs text-muted">Order #1038 · Pickup</div>
          </div>
          <div className="h-2.5 rounded-full bg-cream-2"><div className="h-2.5 w-4/5 rounded-full bg-green" /></div>
          <div className="flex justify-between text-[13px]"><span className="font-semibold">Free dessert</span><span className="text-muted">40 pts to go</span></div>
        </div>
        <div aria-hidden="true" className={`on-dark absolute right-7 top-7 rounded-2xl bg-ink px-4 py-3 text-white ${shadow}`}>
          <div className="font-display text-[28px] font-extrabold leading-none text-gold">+40</div>
          <div className="text-xs">points</div>
        </div>
      </Visual>
    </div>
  );
}

function Growth() {
  return (
    <div id="growth" className="flex scroll-mt-24 flex-wrap items-center gap-16">
      <Visual>
        <Photo src="coffee-cups-overhead.jpg" alt="Coffee cups on a cafe table, seen from above" />
        <div aria-hidden="true" className={`absolute bottom-7 right-7 flex w-[300px] max-w-[calc(100%-56px)] flex-col gap-3 rounded-[20px] bg-white p-[18px] ${shadow}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-muted">
            <span className="on-dark flex size-[22px] items-center justify-center rounded-md bg-ink font-display text-[9px] text-gold">N4</span>
            SUGGESTED CAMPAIGN
          </div>
          <div className="text-[15px] font-bold leading-snug">Tuesdays run slow. Send your regulars a double-points offer for tonight?</div>
          <div className="flex gap-2">
            <span className="on-dark flex min-h-11 flex-1 items-center justify-center rounded-[10px] bg-ink text-sm font-bold text-white">Approve</span>
            <span className="flex min-h-11 flex-1 items-center justify-center rounded-[10px] border border-line bg-white text-sm font-bold">Edit</span>
          </div>
        </div>
      </Visual>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
        <Label n="03" name="Growth" />
        <h3 className={h3}>We draft a campaign for your slow nights, and nothing goes out until you approve it.</h3>
        <p className={lede}>We spot your quiet nights and draft a campaign for the regulars who&apos;ve drifted. You approve it, we send it. You stay in the kitchen.</p>
      </div>
    </div>
  );
}

function Tile({ id, src, alt, n, name, title, body, children }: { id: string; src: string; alt: string; n: string; name: string; title: string; body: string; children: ReactNode }) {
  return (
    <article id={id} className="on-dark relative h-[520px] scroll-mt-24 overflow-hidden rounded-[32px] text-white">
      <Photo src={src} alt={alt} />
      <div aria-hidden="true" className="absolute left-6 top-6 flex w-[220px] max-w-[calc(100%-48px)] flex-col gap-2 rounded-2xl bg-white p-3.5 text-ink shadow-[0_16px_36px_rgba(15,26,58,0.3)]">{children}</div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-ink/90 px-7 pb-7 pt-5">
        <div aria-hidden="true" className="absolute inset-x-0 -top-12 h-12 bg-gradient-to-b from-ink/0 to-ink/90" />
        <span className="font-display text-base font-extrabold text-gold">{n} · {name}</span>
        <h3 className="font-display text-[32px] font-extrabold leading-[1.05] tracking-[-0.02em]">{title}</h3>
        <p className="text-base text-white/85">{body}</p>
      </div>
    </article>
  );
}

export function PlatformSections() {
  return (
    <section aria-labelledby="platform-heading" className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-[120px] px-6 py-[104px]">
        <div className="mx-auto -mb-10 max-w-[820px] text-center">
          <p className="mb-3.5 text-sm font-bold uppercase tracking-[0.08em] text-red">One platform, running quietly behind your brand</p>
          <h2 id="platform-heading" className="font-display text-[clamp(38px,5vw,64px)] font-extrabold leading-none tracking-[-0.035em]">
            Everything your digital front door needs.
          </h2>
        </div>
        <Ordering />
        <Rewards />
        <Growth />
        <div className="-mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
          <Tile id="delivery" src="salmon-lemon.jpg" alt="Roasted salmon with lemon and herbs" n="04" name="Delivery" title="When a guest wants delivery, we send the driver."
            body="We dispatch through DoorDash Drive and Uber Direct and chase any order that runs late. Courier charges depend on your address.">
            <div className="flex justify-between text-xs font-bold"><span>Order #1045</span><span className="text-green">On time</span></div>
            <div className="flex gap-1">
              {[1, 1, 1, 0].map((on, i) => <div key={i} className={`h-[5px] flex-1 rounded-full ${on ? "bg-green" : "bg-cream-3"}`} />)}
            </div>
            <div className="text-[11px] text-muted">Driver picked up · arriving in 9 min</div>
          </Tile>
          <Tile id="discovery" src="cafe-interior.jpg" alt="A busy restaurant dining room seen from above" n="05" name="Discovery" title="Found when neighbors search."
            body="Your dishes show up on Google, and your Business Profile stays in sync as your menu changes.">
            <div className="rounded-full border border-cream-3 px-3 py-1.5 text-xs text-muted">pasta near me</div>
            <div className="text-sm font-bold text-[#1A47B8]">Maple Street Kitchen · Order online</div>
            <div className="text-[11px] text-muted">0.8 mi · Open until 9pm · Pickup &amp; delivery</div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
