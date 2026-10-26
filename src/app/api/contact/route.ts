import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Forwards the submission to Web3Forms, whose free tier needs nothing but an
 * access key — no server, no database, no paid plan. The key is read
 * server-side so it never ships to the browser.
 *
 * Configure it by adding CONTACT_ACCESS_KEY to .env.local (get one free at
 * https://web3forms.com — the key is tied to the inbox that receives the mail).
 */

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const isPayloadValid = (v: unknown): v is ContactPayload => {
  if (typeof v !== "object" || v === null) return false;
  const p = v as Record<string, unknown>;
  return (
    typeof p.name === "string" &&
    p.name.trim().length > 0 &&
    typeof p.email === "string" &&
    /^\S+@\S+\.\S+$/.test(p.email) &&
    typeof p.message === "string" &&
    p.message.trim().length > 0
  );
};

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!isPayloadValid(payload)) {
    return NextResponse.json(
      { success: false, error: "Please complete all fields with a valid email." },
      { status: 422 }
    );
  }

  const accessKey = process.env.CONTACT_ACCESS_KEY;

  if (!accessKey) {
    // No key configured: fail loudly rather than silently dropping the message.
    return NextResponse.json(
      {
        success: false,
        error:
          "Contact email is not configured yet. Add CONTACT_ACCESS_KEY to .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New enquiry from ${payload.name}`,
        from_name: "GROOVESTREET Website",
        name: payload.name,
        email: payload.email,
        message: payload.message,
        // Keeps Web3Forms from treating the reply-to as the sender.
        replyto: payload.email,
      }),
    });

    const body = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !body?.success) {
      return NextResponse.json(
        { success: false, error: body?.message ?? "Could not send the message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      },
      { status: 500 }
    );
  }
}
