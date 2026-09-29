/**
 * Server-side validation for the public form endpoints.
 *
 * The forms validate in the browser too, but that check is advisory only — both
 * routes are public HTTP endpoints and a client can POST anything. Everything
 * that reaches an email header or the Gmail API is validated here.
 */

/** Upper bounds so a scripted POST can't push megabytes through the mail quota. */
export const LIMITS = {
  name: 100,
  email: 254, // RFC 5321 maximum length of a forward-path
  company: 200,
  shortField: 100,
  message: 5000,
  utm: 200,
} as const;

/**
 * CR and LF terminate a header line, so a value containing either can inject
 * additional headers (Bcc:, To:) into the message. NUL is rejected for the same
 * defensive reason.
 */
const HEADER_UNSAFE = /[\r\n\0]/;
/** Same class, global, for stripping. Kept separate: `test` on a global regex is stateful. */
const HEADER_UNSAFE_GLOBAL = /[\r\n\0]/g;

export function containsHeaderInjection(value: string): boolean {
  return HEADER_UNSAFE.test(value);
}

/**
 * Collapse a value to a single safe line: strip CR/LF/NUL, collapse runs of
 * whitespace, trim, and cap the length.
 */
export function toSingleLine(value: string, maxLength: number): string {
  return value
    .replace(HEADER_UNSAFE_GLOBAL, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Email shape check, deliberately the same expression the forms use, plus the
 * length cap and an explicit CR/LF rejection so a valid-looking local part can
 * never smuggle a header break through.
 */
export function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.length === 0 || value.length > LIMITS.email) return false;
  if (containsHeaderInjection(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Read a string field, tolerating absent/non-string input. */
function readString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return toSingleLine(value, maxLength);
}

/**
 * Which form the submission came from. The contact, partners, and careers pages
 * each render `ContactForm` with a different variant, and the notification needs
 * to say which — otherwise every lead arrives labelled as a demo request.
 */
export const FORM_VARIANTS = ["contact", "demo", "partner"] as const;
export type FormVariant = (typeof FORM_VARIANTS)[number];

function readFormVariant(value: unknown): FormVariant {
  return typeof value === "string" &&
    (FORM_VARIANTS as readonly string[]).includes(value)
    ? (value as FormVariant)
    : "contact";
}

export interface ContactSubmission {
  formVariant: FormVariant;
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  businessType: string;
  locations: string;
  interest: string;
  message: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function parseContactSubmission(
  body: unknown
): ParseResult<ContactSubmission> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = body as Record<string, unknown>;

  const firstName = readString(raw.firstName, LIMITS.name);
  const lastName = readString(raw.lastName, LIMITS.name);
  const company = readString(raw.company, LIMITS.company);

  if (!firstName) return { ok: false, error: "First name is required." };
  if (!lastName) return { ok: false, error: "Last name is required." };
  if (!isValidEmail(raw.workEmail)) {
    return { ok: false, error: "A valid work email is required." };
  }
  if (!company) return { ok: false, error: "Company name is required." };
  if (raw.consent !== true) {
    return { ok: false, error: "Consent is required to submit this form." };
  }

  return {
    ok: true,
    data: {
      formVariant: readFormVariant(raw.formVariant),
      firstName,
      lastName,
      workEmail: raw.workEmail,
      company,
      businessType: readString(raw.businessType, LIMITS.shortField),
      locations: readString(raw.locations, LIMITS.shortField),
      interest: readString(raw.interest, LIMITS.shortField),
      // The message is the one multi-line field: it lands in the body, never a
      // header, so newlines are preserved and only NUL and the length are policed.
      message:
        typeof raw.message === "string"
          ? raw.message.replace(/\0/g, "").slice(0, LIMITS.message)
          : "",
      utm_source: readString(raw.utm_source, LIMITS.utm),
      utm_medium: readString(raw.utm_medium, LIMITS.utm),
      utm_campaign: readString(raw.utm_campaign, LIMITS.utm),
      utm_content: readString(raw.utm_content, LIMITS.utm),
      utm_term: readString(raw.utm_term, LIMITS.utm),
    },
  };
}

export interface NewsletterSubmission {
  email: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export function parseNewsletterSubmission(
  body: unknown
): ParseResult<NewsletterSubmission> {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = body as Record<string, unknown>;

  if (!isValidEmail(raw.email)) {
    return { ok: false, error: "Valid email is required" };
  }

  return {
    ok: true,
    data: {
      email: raw.email,
      utm_source: readString(raw.utm_source, LIMITS.utm),
      utm_medium: readString(raw.utm_medium, LIMITS.utm),
      utm_campaign: readString(raw.utm_campaign, LIMITS.utm),
    },
  };
}
