import Image from "next/image";
import { dealsScreenshotAlt } from "@/content/legal/sms-page";

/**
 * The two N4Cluster Deals opt-in screenshots, cropped to the Deals checkbox and its disclosure
 * (the order-texts box is outside the crop), with the box unchecked: checkout at 2x (Playwright), account settings
 * at 1.6x (Chrome, signed-in diner). Both from dev storefront build d6aa5465 (Deals v2 wording), 14 Nov 2026.
 */
export const dealsScreenshots = [
  { src: "/sms/deals-checkout.png", width: 1088, height: 394, className: "max-w-xl" },
  { src: "/sms/deals-account.png", width: 806, height: 349, className: "mt-4 max-w-md" },
] as const;

export function DealsScreenshots() {
  return (
    <>
      {dealsScreenshots.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          width={s.width}
          height={s.height}
          alt={dealsScreenshotAlt}
          className={`mx-auto h-auto w-full rounded-lg border border-line ${s.className}`}
        />
      ))}
    </>
  );
}
