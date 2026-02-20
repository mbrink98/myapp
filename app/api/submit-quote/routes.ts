// app/api/submit-quote/route.ts
import { NextRequest, NextResponse } from "next/server";
import PocketBase from "pocketbase";
import axios from "axios";

const pb = new PocketBase("https://your-pocketbase-domain.com");

export async function POST(req: NextRequest) {
  const { token, content, name } = await req.json();

  if (!process.env.TURNSTILE_SECRET) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  // Cloudflare Turnstile verification
  const params = new URLSearchParams();
  params.append("secret", process.env.TURNSTILE_SECRET!);
  params.append("response", token);

  const verification = await axios.post(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    params
  );

  if (!verification.data.success) {
    return NextResponse.json({ error: "Turnstile failed" }, { status: 400 });
  }

  // Save quote in PocketBase
  await pb.collection("quotes").create({
    content,
    suggestedByName: name || "Anonymous",
    status: "suggested",
  });

  return NextResponse.json({ success: true });
}