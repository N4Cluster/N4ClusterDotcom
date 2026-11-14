/** Restaurant name from `?restaurant=`: first value, whitespace-collapsed, max 120 chars. */
export function restaurantFromParam(value: string | string[] | undefined): string {
  const first = Array.isArray(value) ? value[0] : value;
  return (first ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
}
