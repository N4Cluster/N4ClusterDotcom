import type { CareerApplication } from "@/lib/validation";

/**
 * Turn a parsed Growth Partner application into the notification email.
 * Every header-bound value (name, city) was flattened to one line by
 * parseCareerApplication, so the subject cannot inject headers.
 */
export function careerApplicationEmail(app: CareerApplication): {
  subject: string;
  body: string;
} {
  const attribution = app.utm_source
    ? [
        "\n--- Attribution ---",
        `Source: ${app.utm_source}`,
        app.utm_medium ? `Medium: ${app.utm_medium}` : null,
        app.utm_campaign ? `Campaign: ${app.utm_campaign}` : null,
        app.utm_content ? `Content: ${app.utm_content}` : null,
        app.utm_term ? `Term: ${app.utm_term}` : null,
      ]
    : [];

  const body = [
    "Form: Restaurant Growth Partner application",
    `Name: ${app.name}`,
    `Phone: ${app.phone}`,
    `Email: ${app.email}`,
    `City: ${app.city}`,
    app.experience
      ? `\nSales experience:\n${app.experience}`
      : "\nSales experience: none given",
    ...attribution,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Growth Partner application from ${app.name} – ${app.city}`,
    body,
  };
}
