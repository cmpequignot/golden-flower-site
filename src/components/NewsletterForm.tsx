"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Something went wrong.");
      setStatus("success");
      setMessage("Thanks — you're on the list!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-lg font-medium text-paper" role="status">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-full border border-paper/40 bg-paper/10 px-5 py-3 text-paper placeholder:text-paper/60 focus:border-paper focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-paper px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-blue transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Sign Up"}
      </button>
      {status === "error" && (
        <p className="w-full text-sm text-rose-soft sm:absolute sm:mt-14" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
