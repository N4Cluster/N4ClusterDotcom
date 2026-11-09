/** One entry per promotion. Targets should be item-level storefront URLs (see A4). */
export const dealLinks: Record<string, string> = {
  // Registration sample. Temporarily the full menu: the dish's item page
  // (/en/menu/entrees/beef-chicken-or-mixed-gyro-plate) 404s in prod until the
  // storefront's item pages ship there and Entrées' search page is turned on.
  // TODO(deals-item-link): repoint both to that item URL once it loads in prod.
  ppg: "https://pastaandpitagrill.com/en/menu",
  "ppg-gyro-plate": "https://pastaandpitagrill.com/en/menu",
};
