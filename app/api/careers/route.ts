import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, isHoneypotFilled } from "@/lib/rate-limit";
import { notificationRecipient, notificationSender, sendMail } from "@/lib/mail";
import { parseCareerApplication } from "@/lib/validation";
import { careerApplicationEmail } from "@/lib/careers";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  // Separate key from the contact form so applicants and leads don't share a budget.
  if (isRateLimited(`careers:${ip}`)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (isHoneypotFilled(body)) {
    // Silently accept — don't reveal bot detection
    return NextResponse.json({ ok: true });
  }

  const parsed = parseCareerApplication(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  const app = parsed.data;

  try {
    await sendMail({
      to: notificationRecipient(),
      from: notificationSender(),
      replyTo: app.email,
      ...careerApplicationEmail(app),
    });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Careers application mail error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send your application. Please try again later." },
      { status: 500 }
    );
  }
}
