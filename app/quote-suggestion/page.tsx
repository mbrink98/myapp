"use client";

import Script from "next/script";
import QuoteForm from "@/components/QuoteForm";

export default function QuoteSuggestionPage() {

  console.log(
    "Secret:",
    process.env.TURNSTILE_SECRET
  );
  console.log(
    "Sitekey value:",
    process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY
  );


  const handleSubmit = async (content: string, name: string, token: string) => {
    console.log(
    "submitted quote",
    content
     );
    const res = await fetch("/api/submit-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, name, token }),

      
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unknown error");
    alert("Quote submitted successfully!");

  };

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <QuoteForm
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY!}
        onSubmit={handleSubmit}
        
      />
    </>
  );
}