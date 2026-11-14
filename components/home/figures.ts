import { PER_ORDER_FEE, PROCESSING_FLAT, PROCESSING_RATE } from "@/content/site/pricing";

const ORDER = 40;
export const orderTotal = `$${ORDER.toFixed(2)}`;
/** What the restaurant keeps on a $40 order after the per-order fee and illustrative card processing. */
export const youKeep = `$${(ORDER - PER_ORDER_FEE - (ORDER * PROCESSING_RATE + PROCESSING_FLAT)).toFixed(2)}`;
