"use client";

import { useState } from "react";

interface NewsletterFormProps {
  dark?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

export function NewsletterForm({
  dark = false,
  placeholder = "Enter your work email",
  buttonLabel = "Subscribe",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _hp_website: honeypot }),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p className={`text-sm font-medium ${dark ? "text-teal-400" : "text-teal-600"}`}>
        You&apos;re subscribed. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden" tabIndex={-1}>
        <input type="text" autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cobalt-500/30 ${
            dark
              ? "bg-navy-800 border-navy-700 text-white placeholder-slate-500"
              : "bg-white border-slate-300 text-navy-950 placeholder-slate-400"
          } ${error ? "border-red-400" : ""}`}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-cobalt-500 hover:bg-cobalt-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        {status === "submitting" ? "…" : buttonLabel}
      </button>
    </form>
  );
}
