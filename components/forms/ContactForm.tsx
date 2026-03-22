"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  businessType: string;
  locations: string;
  interest: string;
  message: string;
  consent: boolean;
}

interface ContactFormProps {
  variant?: "contact" | "demo" | "partner";
  dark?: boolean;
}

const businessTypes = [
  "Independent Restaurant",
  "Restaurant Group / Chain",
  "Local Retail / Merchant",
  "Multi-location Brand",
  "Technology / Integration Partner",
  "Logistics / Delivery Partner",
  "Investor / Strategic Partner",
  "Other",
];

const interestAreas = [
  "Branded Direct Ordering",
  "Orchestration (N4Sync)",
  "AI Growth Tools (N4Logic)",
  "Multi-location Operations",
  "Integration Partnership",
  "Logistics Partnership",
  "Pilot Program",
  "General Inquiry",
];

export function ContactForm({ variant = "contact", dark = false }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    company: "",
    businessType: "",
    locations: "",
    interest: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address";
    }
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.consent) newErrors.consent = "Please accept to continue";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2",
      dark
        ? "bg-navy-800 border-navy-700 text-white placeholder-slate-500 focus:border-cobalt-500 focus:ring-cobalt-500/20"
        : "bg-white border-slate-300 text-navy-950 placeholder-slate-400 focus:border-cobalt-500 focus:ring-cobalt-500/20",
      hasError && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
    );

  const labelClass = cn(
    "block text-sm font-medium mb-1.5",
    dark ? "text-slate-300" : "text-slate-700"
  );

  const errorClass = "mt-1 text-xs text-red-500";

  if (status === "success") {
    return (
      <div className={`rounded-2xl border p-10 text-center ${dark ? "bg-navy-800 border-navy-700" : "bg-slate-50 border-slate-200"}`}>
        <div className="w-14 h-14 rounded-full bg-teal-500/15 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-navy-950"}`}>
          Thanks for reaching out.
        </h3>
        <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
          We&apos;ll review your submission and follow up soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="firstName">First name *</label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            className={inputClass(!!errors.firstName)}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="lastName">Last name *</label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            className={inputClass(!!errors.lastName)}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="workEmail">Work email *</label>
        <input
          id="workEmail"
          type="email"
          autoComplete="email"
          className={inputClass(!!errors.workEmail)}
          value={formData.workEmail}
          onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
        />
        {errors.workEmail && <p className={errorClass}>{errors.workEmail}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="company">Company name *</label>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          className={inputClass(!!errors.company)}
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        {errors.company && <p className={errorClass}>{errors.company}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="businessType">Business type</label>
          <select
            id="businessType"
            className={inputClass(false)}
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          >
            <option value="">Select type…</option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="locations">Number of locations</label>
          <select
            id="locations"
            className={inputClass(false)}
            value={formData.locations}
            onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
          >
            <option value="">Select…</option>
            <option value="1">1 location</option>
            <option value="2-5">2–5 locations</option>
            <option value="6-20">6–20 locations</option>
            <option value="20+">20+ locations</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="interest">Area of interest</label>
        <select
          id="interest"
          className={inputClass(false)}
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
        >
          <option value="">Select…</option>
          {interestAreas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          className={inputClass(false)}
          placeholder="Tell us about your business, goals, or specific questions…"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cobalt-500 focus:ring-cobalt-500"
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          />
          <span className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
            I agree to N4Cluster&apos;s{" "}
            <a href="/privacy" className="text-cobalt-500 hover:underline">Privacy Policy</a>{" "}
            and consent to being contacted about my inquiry.
          </span>
        </label>
        {errors.consent && <p className={cn(errorClass, "mt-1")}>{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-cobalt-500 hover:bg-cobalt-600 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
      >
        {status === "submitting" ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}
