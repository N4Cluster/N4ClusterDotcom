# Careers page: Restaurant Growth Partner role and application form

Date: 2026-11-14
Status: design, awaiting approval (builder check done)

## Intent

N4Cluster is recruiting **Restaurant Growth Partners**: independent contractors, paid on commission only, who sign independent restaurants in their own city. A recruiting ad (square social image, "FINAL v2 · fixes from review") sends people to **n4cluster.com/careers**. The page's job is to turn those visitors into applicants: someone who saw the ad lands on /careers, immediately sees the role and its pay terms, and applies through a short form **on the same page**.

Success is an application arriving in the N4Cluster inbox with enough information to decide whether to call the person back: name, phone, email, city, and any sales experience.

## Goals

- The Growth Partner role is the first thing on /careers after a short header, matching what the ad promised.
- The pay terms are stated plainly and match the pricing page exactly.
- A visitor can apply in about two minutes, on a phone, without leaving the page.
- Each application is emailed to the same inbox as contact-form submissions.
- The posting stays within US pay-transparency, earnings-claim and contractor-classification norms (see Constraints).

## Non-goals

- No applicant tracking system, database, file uploads (resume/CV) or scheduling.
- No separate per-role page (`/careers/<role>`); everything is on `/careers`.
- No changes to the "Why join us", "Introduce yourself" or closing CTA content beyond moving them down the page.
- No contractor agreement on the site; terms are set in the agreement signed after selection.

## Anti-goals (would make this a failure even if it works)

- Any "you could earn $X/month" figure, income example or testimonial. Those are earnings claims the FTC treats as deceptive unless substantiated, and there is no partner history to substantiate them.
- Employee language for this role: "hire/hiring", "salary", "wage", "benefits", "manager", "shift", "full-time". It weakens the independent-contractor classification.
- Pay numbers that disagree with `/pricing` ($99/month, $0.50/order, $0.99 Neighborhood fee, 30 days free with no fees), or any figure rounded up.
- Mentioning Franklin, TN or any single launch city. The user removed it: the role is open to anyone in any US city.
- Form questions about criminal history or current/past pay (banned in several states and cities).
- Breaking the site's design rules in `DESIGN.md` (generic SaaS look, a third typeface, teal outside the logo, gradient text).

## Constraints

### Facts the copy must match

| Item | Value | Source |
|---|---|---|
| Restaurant monthly service fee | standard $99/month; first 30 days free (no monthly fee and no $0.50 order fee during the trial). Some restaurants pay less: a reduced fee on request, or a fee that steps up month by month until it reaches $99 | `/pricing` (app/pricing/page.tsx, "30 days free"); the user (reduced and stepped fees) |
| Restaurant order fee | $0.50/order | `/pricing` |
| Diner Neighborhood fee | $0.99/order | `/pricing` |
| Partner share | 75% of the fees the restaurant's orders and monthly service fee generate, for the restaurant's first 6 months | the ad, confirmed by the user |
| → service-fee share | **75% of the monthly service fee the restaurant actually pays**, from month 2. Stated as a percentage, not a fixed dollar amount, because the fee varies by restaurant. "$74/mo" appears only as the example at the standard $99 (75% of $99 is $74.25, rounded down) | the user |
| → per-order share, paid months | **$1.11** (75% of $0.50 + $0.99 = $1.49 is $1.1175, rounded down) | the user chose $1.11 over the ad's figure |
| → per-order share, free first month | **$0.74** (75% of the $0.99 Neighborhood fee; no $0.50 order fee is charged then) | the user (answer "b") |
| Cap | none | the ad |
| Arrangement | independent contractor, commission only, no base pay | the user |
| Location | anyone in any US city; signs restaurants in their own city | the user |

The ad's footnote carries over in substance: figures are based on current pricing and subject to change, and the service-fee share starts after the restaurant's free first month. The footnote adds that some restaurants pay a reduced or stepped-up monthly fee, and the share is 75% of what they actually pay.

**The builder's calls on pay timing (flagged for the user to confirm):**
- The 6 months run from the restaurant's go-live and *include* the free first month: month 1 pays $0.74/order, months 2 to 6 pay 75% of the monthly service fee ($74 at the standard $99) + $1.11/order. This matches the ad ("Paid for 6 months"; the subscription share "starts after the restaurant's free first month") and the user's answer that the partner earns on orders during the free month.
- If a restaurant absorbs the $0.99 Neighborhood fee instead of showing it to diners, the fee is still charged, so the partner's share is unchanged. The page doesn't call this out.
- Only the monthly service fee varies by restaurant. The $0.50 order fee and $0.99 Neighborhood fee are the same for every restaurant, so $1.11 and $0.74 per order stay fixed figures.

**Rounding rule:** every figure on the page is rounded down, never up, so the posting never overstates pay. The recruiting ad's per-order figure is a cent higher and should be updated to $1.11 to match the page.

### Legal and compliance (checklist, not legal advice; confirm with counsel)

1. **Pay transparency.** About 13 to 15 states plus DC, and some cities (CA, CO, CT, HI, IL, ME, MD, MA, MN, NJ, NY, VT, VA, WA, NYC), require pay in postings, often including remote roles. NYC's rule covers independent contractors. For commission-only roles, guidance accepts a clear statement that pay is commission-based. The block states "Commission only, no base pay" plus the exact terms above.
2. **Earnings claims (FTC Act §5; proposed 16 CFR 462).** Per-restaurant rates with the "current pricing" footnote are factual terms, not income claims. No totals, examples or "up to" figures.
3. **Contractor classification.** Copy says "independent contractor" and avoids employee words (see Anti-goals). The California AB5 and ABC-test risk is a matter of how the work is actually run. The page can't fix that; it must just not contradict it.
4. **Form questions.** Only the five fields below. No criminal-history or pay-history questions; no date of birth, photo or other protected characteristics.
5. **Applicant privacy.** `/privacy` gains a short applicants section (see below). The form links to it.
6. **Equal opportunity.** One line under the form: N4Cluster considers all applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability or any other protected status.

### Technical

- Next.js app in this repo; follow `node_modules/next/dist/docs/` (per CLAUDE.md) for any API differences.
- Design system: `DESIGN.md` and `PRODUCT.md` (cream canvas, ink text, gold for the one primary action, Bricolage Grotesque for headings, Inter for body, 22px cards, 32px panels, `on-dark`/`on-light` focus classes on dark surfaces).
- Reuse the existing form plumbing: `lib/mail.ts` (`sendMail`, `notificationRecipient`, `notificationSender`), `lib/rate-limit.ts` (`isRateLimited`, `isHoneypotFilled`), `lib/validation.ts` (`toSingleLine`, `isValidEmail`, `LIMITS`, header-injection guards), `lib/utm.ts` (`getUtmParams`).
- WCAG 2.1 AA: labelled fields, errors announced, keyboard reachable, 4.5:1 contrast including placeholders.

## Decided design

Layout **C** from the brainstorm mockups ("short header, then a role block"), chosen by the user.

### Page order on `/careers`

1. **Short careers header** (replaces the current large hero). "Careers at N4Cluster", one sentence about the company, and a jump link to the role (`#growth-partner`).
2. **Growth Partner role block** (`id="growth-partner"`), a dark Ink panel (32px radius, `on-dark`), two columns on desktop, stacked on mobile with details first and the form second.
   - Badge: "Now recruiting · Sales" (not "hiring").
   - Title: "Restaurant Growth Partner".
   - Meta line: "Independent contractor · Commission only · No cap · Open to anyone in the US".
   - Headline from the ad: "Every order they take pays you."
   - Big "75%" (Bricolage display, gold) with the plain explanation, per restaurant you sign, for its first 6 months: 75% of the restaurant's monthly service fee (from month 2; $74/mo at the standard $99) and of the $0.50 order fee plus $0.99 Neighborhood fee (+$1.11 per order; +$0.74 per order in the restaurant's free first month, when only the $0.99 is charged). The builder chooses whether to echo the ad's payout ticket visually.
   - The ad's three points: sign independent restaurants in your own city; pitch training and sales materials provided; you sign them, our team handles setup.
   - "Commission only, no base pay. You'll sign an independent contractor agreement that sets out the commission terms."
   - Footnote: based on current pricing, subject to change; the service-fee share starts after the restaurant's free first month; some restaurants pay a reduced or stepped-up monthly fee, and your share is 75% of what they actually pay.
   - **Application form** in a white card inside the panel (`on-light`).
3. **The four existing full-time roles are removed** (Product Engineer, Platform Designer, Commerce Growth Lead, Merchant Success Manager). The user confirmed they are not open, and listing them without pay ranges would breach pay-transparency rules for applicants in CA, CO, WA, NYC and similar places. The "Open roles" section goes with them.
4. **Why join us**, **Introduce yourself** form and the closing CTA: existing content, unchanged, below. "Introduce yourself" is a general expression of interest with no role or pay attached, so it is not a job posting.

### Application form

| Field | Required | Notes |
|---|---|---|
| Full name | yes | single line |
| Phone | yes | `type="tel"`, `autocomplete="tel"` |
| Email | yes | `type="email"`, validated server-side with `isValidEmail` |
| City | yes | free text; placeholder like "City, State" |
| Sales experience | no | textarea, "Any sales experience? Tell us briefly. None is fine too." |

- Hidden honeypot and UTM capture, same as `ContactForm`.
- Primary gold button: "Send application".
- On success the form is replaced by a confirmation: "Thanks, we've got your application. We'll call or email you." On failure, an inline error and the data stays in the fields.
- **No SMS to applicants and no consent checkbox (the builder's call).** Applicants are contacted by phone call or email only. The site's registered SMS programs are the three diner programs, and the privacy SMS wording must stay byte-identical, so texting applicants would need its own consent and campaign. Submitting the form is the request to be contacted about the application.
- A line under the button links to `/privacy#applicants`, followed by the equal-opportunity line.

### Submission endpoint

- New route `POST /api/careers` (separate from `/api/contact`, which is built around a business lead and ICP Finder enrichment).
- Same protections as `/api/contact`: rate limit by IP, honeypot (silent success), server-side parsing with length caps and header-injection checks via a new `parseCareerApplication` in `lib/validation.ts`.
- Sends one email via `sendMail` to `notificationRecipient()`, `replyTo` = the applicant's email. Subject "Growth Partner application from {name} – {city}". Body lists all fields plus UTM attribution.
- No ICP Finder call, no storage.

### Privacy policy

Add a short applicants section to `app/privacy/page.tsx` with `id="applicants"` and update the "Last updated" date. It covers:
- what we collect when you apply (name, phone, email, city, optional sales experience, plus standard technical and UTM data);
- that we use it only to review the application and contact the applicant about it by phone call or email (no text messages);
- that it isn't sold or shared for marketing;
- that applications are kept for 12 months (the user confirmed) and can be deleted sooner on request via contact@n4cluster.com.

It also goes in the table of contents. The existing SMS wording stays byte-identical, since the Telnyx campaigns quote it.

### Metadata

- Title: "Careers". The description mentions the Restaurant Growth Partner role (independent contractor, commission only).
- `/careers` stays in the sitemap.

## Left to the builder

- Exact header sentence and visual treatment of the 75% (plain big number vs. a payout-ticket echo of the ad), within `DESIGN.md`.
- Component structure (for example a `CareerApplicationForm` component and a role-block component).
- Copy polish within the constraints above.
- Tests in the repo's existing style (Vitest, reading source and asserting on content), covering at least: the pay figures (75% of the monthly service fee with $74 only as the standard-$99 example, $1.11, $0.74, 6 months) and no rounded-up per-order figure, no banned employee words in the role block, no "Franklin", the four old roles gone, the form fields, `parseCareerApplication`, and the privacy section's presence.

## Calls made by the designer (for the user to check)

- The 6 months include the free first month ($0.74/order in month 1).
- The share is unchanged when a restaurant absorbs the $0.99 Neighborhood fee.
- Only the monthly service fee varies; the per-order shares ($1.11, $0.74) stay fixed.
- No texting applicants and no consent checkbox; phone call or email only.
- Badge reads "Now recruiting · Sales", not "Now hiring".
- The equal-opportunity line and the "independent contractor agreement" sentence.
- `/api/careers` is a separate route from `/api/contact`.
