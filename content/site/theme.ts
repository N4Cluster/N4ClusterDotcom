/**
 * Which routes render a dark hero directly beneath the fixed header.
 *
 * The header floats transparently over a dark hero and switches to a solid light
 * treatment once scrolled. That transparent state uses white text, so it is only
 * legible over a dark surface — over a light page it renders white-on-white and
 * the whole nav disappears until the user scrolls.
 *
 * Most pages open with a dark hero (`HeroSplit`, `HeroCentered` — whose `dark`
 * prop defaults to true — or an explicit `gradient-hero` section), so this list is
 * long and the exceptions are the legal pages, which open on white.
 *
 * Registration is nonetheless opt-in, because the two ways of getting it wrong are
 * not equally bad: a dark page missing from this list gets a solid header, which
 * is merely less pretty, whereas a light page wrongly treated as dark is
 * unreadable. Defaulting to the solid treatment keeps any mistake cosmetic.
 */
const DARK_HERO_ROUTES = new Set<string>([
  "/", // HeroSplit
  "/about",
  "/careers",
  "/case-studies",
  "/contact", // gradient-hero section
  "/faq", // gradient-hero section
  "/how-it-works",
  "/integrations",
  "/mission",
  "/n4logic",
  "/partners",
  "/platform",
  "/pricing",
  "/resources",
  "/roi-calculator",
  "/solutions",
]);

/**
 * Route prefixes whose pages all render a dark hero.
 * Resource articles (`/resources/<slug>`) open with a `gradient-hero` section.
 */
const DARK_HERO_PREFIXES = ["/resources/"];

/** Strip a trailing slash so "/contact/" matches "/contact". */
function normalisePath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

/** True when `pathname` renders a dark hero the header can sit transparently over. */
export function hasDarkHero(pathname: string | null): boolean {
  if (!pathname) return false;
  const path = normalisePath(pathname);
  if (DARK_HERO_ROUTES.has(path)) return true;
  return DARK_HERO_PREFIXES.some((prefix) => path.startsWith(prefix));
}

/** Exposed for tests. */
export const darkHeroRoutes = DARK_HERO_ROUTES;
