/** Matches the URLs, support address and help line inside the registered SMS wording. */
const linkPattern = /(https:\/\/[^\s)]+|[\w.+-]+@n4cluster\.com|\+1 \d{3}-\d{3}-\d{4})/;

function hrefFor(part: string): string {
  if (part.startsWith("https://")) return part;
  if (part.startsWith("+")) return `tel:${part.replace(/[^\d+]/g, "")}`;
  return `mailto:${part}`;
}

/**
 * Renders registered wording verbatim, turning its URLs, email address and
 * phone number into links without changing a character of the visible text.
 */
export function LinkedText({ text }: { text: string }) {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return part;
    return (
      <a key={i} href={hrefFor(part)}>
        {part}
      </a>
    );
  });
}
