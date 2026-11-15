import Image from "next/image";
import { dealsScreenshotAlt } from "@/content/legal/sms-page";

/**
 * The two N4Cluster Deals opt-in screenshots, cropped to the Deals checkbox and its disclosure
 * (the order-texts box is outside the crop), with the box unchecked: checkout at 2x (Playwright), account settings
 * at 1.6x (Chrome, signed-in diner). Both from dev storefront build d6aa5465 (Deals v2 wording), 14 Nov 2026.
 */
export const dealsScreenshots = [
  { src: "/sms/deals-checkout.png", width: 1088, height: 394, className: "max-w-xl", caption: "At checkout" },
  { src: "/sms/deals-account.png", width: 806, height: 349, className: "mt-4 max-w-md", caption: "In account settings" },
] as const;

export function DealsScreenshots() {
  return (
    <>
      {dealsScreenshots.map((s) => (
        <figure key={s.src} className={`mx-auto w-full ${s.className}`}>
          <Image
            src={s.src}
            width={s.width}
            height={s.height}
            alt={`${dealsScreenshotAlt} ${s.caption}.`}
            className="h-auto w-full rounded-lg border border-line"
          />
          <figcaption className="mt-2 text-center text-sm text-muted">{s.caption}</figcaption>
        </figure>
      ))}
    </>
  );
}
