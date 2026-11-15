"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { getUtmParams } from "@/lib/utm";
import { isValidEmail, isValidPhone } from "@/lib/validation";

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  experience: string;
}

type FieldErrors = Partial<Record<keyof FormData, string>>;

export function CareerApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    experience: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Messages match the /api/careers responses.
  const validate = () => {
    const next: FieldErrors = {};
    if (!formData.name.trim()) next.name = "Name is required.";
    if (!isValidPhone(formData.phone.trim())) next.phone = "A valid phone number is required.";
    if (!isValidEmail(formData.email.trim())) next.email = "A valid email is required.";
    if (!formData.city.trim()) next.city = "City is required.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          experience: formData.experience,
          _hp_website: honeypot,
          ...getUtmParams(),
        }),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
    } catch {
      // Typed values stay in state so the applicant can retry.
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-xl border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2",
      "bg-white border-muted text-ink placeholder-muted focus:border-ink focus:ring-ink/20",
      hasError && "border-red focus:border-red focus:ring-red/20"
    );

  const labelClass = "block text-sm font-medium mb-1.5 text-ink-2";
  const errorClass = "mt-1 text-xs text-red";

  const fieldProps = (key: keyof FormData) => ({
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: inputClass(!!errors[key]),
    value: formData[key],
  });

  const fieldError = (key: keyof FormData) =>
    errors[key] ? (
      <p id={`${key}-error`} className={errorClass}>
        {errors[key]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div className="rounded-[22px] border border-line bg-white p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-green-tint flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold mb-2 text-ink">{"Thanks, we've got your application."}</h3>
        <p className="text-sm text-ink-3">{"We'll call or email you."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="name">Full name *</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...fieldProps("name")}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {fieldError("name")}
      </div>

      <div>
        <label className={labelClass} htmlFor="phone">Phone *</label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...fieldProps("phone")}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {fieldError("phone")}
      </div>

      <div>
        <label className={labelClass} htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...fieldProps("email")}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {fieldError("email")}
      </div>

      <div>
        <label className={labelClass} htmlFor="city">City *</label>
        <input
          id="city"
          type="text"
          autoComplete="address-level2"
          placeholder="City, State"
          {...fieldProps("city")}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        {fieldError("city")}
      </div>

      <div>
        <label className={labelClass} htmlFor="experience">Sales experience</label>
        <textarea
          id="experience"
          rows={4}
          placeholder="Any sales experience? Tell us briefly. None is fine too."
          {...fieldProps("experience")}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
      </div>

      {/* Honeypot: hidden from real users, bots auto-fill it */}
      <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label htmlFor="hp_website">Website</label>
        <input
          id="hp_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-gold hover:brightness-95 disabled:opacity-60 text-ink font-semibold py-3 px-6 rounded-full transition-all text-sm"
      >
        {status === "submitting" ? "Sending…" : "Send application"}
      </button>

      <div className="space-y-2">
        <p className="text-xs leading-relaxed text-ink-3">
          We use your details only to review your application. See our{" "}
          <a href="/privacy#applicants" className="underline underline-offset-2 hover:no-underline">Privacy Policy</a>.
        </p>
        <p className="text-xs leading-relaxed text-ink-3">
          N4Cluster considers all applicants without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, age, disability or any other protected status.
        </p>
      </div>
    </form>
  );
}
