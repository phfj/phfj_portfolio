interface Env {
  CONTACT_WEBHOOK_URL?: string;
  BUTTONDOWN_API_KEY?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body._hp ?? "");

  if (honeypot) {
    return Response.json(
      { message: "Thanks for reaching out!" },
      { status: 200 },
    );
  }

  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message must be at least ${MIN_MESSAGE_LENGTH} characters` },
      { status: 400 },
    );
  }

  const webhookUrl = env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({
      message: "Thanks for reaching out! I'll get back to you soon.",
    });
  }

  try {
    const hookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: [
          `**New message from portfolio contact form**`,
          `**Name:** ${name}`,
          `**Email:** ${email}`,
          subject ? `**Subject:** ${subject}` : "",
          `**Message:** ${message}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!hookRes.ok) {
      return Response.json(
        {
          error:
            "Failed to send message. Please email me directly at pauladrianoholmes@gmail.com",
        },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { error: "Unable to send. Please email me directly." },
      { status: 502 },
    );
  }

  return Response.json({
    message: "Thanks for reaching out! I'll get back to you soon.",
  });
}
