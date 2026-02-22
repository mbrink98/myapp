"use client";

import { useState } from "react";

interface QuoteFormProps {
  onSubmit: (content: string, name: string, token: string) => Promise<void>;
  siteKey: string;
}

export default function QuoteForm({ onSubmit, siteKey }: QuoteFormProps) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Please complete the CAPTCHA");

    setLoading(true);
    try {
      await onSubmit(content, name, token);
      setContent("");
      setName("");
      setToken(null);
      window.turnstile?.reset(); // reset Turnstile after submission
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Your quote"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        placeholder="Your name "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback={(t: string) => setToken(t)}
      ></div>

      <button type="submit" disabled={loading || !token}>
        {loading ? "Submitting..." : "Submit Quote"}
      </button>
    </form>
  );
}