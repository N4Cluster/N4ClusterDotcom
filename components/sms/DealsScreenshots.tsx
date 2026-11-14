import Image from "next/image";
import { dealsScreenshotAlt } from "@/content/legal/sms-page";

/**
 * The two N4Cluster Deals opt-in screenshots, cropped to the Deals checkbox and its disclosure
 * (the order-texts box is outside the crop), captured at 2x from the storefront with the box unchecked.
 */
export const dealsScreenshots = [
  { src: "/sms/deals-checkout.png", width: 1200, height: 420, className: "max-w-xl" },
  { src: "/sms/deals-account.png", width: 1200, height: 420, className: "mt-4 max-w-xl" },
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
