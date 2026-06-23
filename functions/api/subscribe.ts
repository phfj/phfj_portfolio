interface Env {
  BUTTONDOWN_API_KEY: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const buttondownKey = env.BUTTONDOWN_API_KEY;

  let email: string;
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Valid email is required" }, { status: 400 });
  }

  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${buttondownKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { code?: string };
    if (data.code === "email_already_exists") {
      return Response.json(
        { message: "You're already subscribed!" },
        { status: 200 },
      );
    }
    return Response.json(
      { error: "Subscription failed. Try again later." },
      { status: 502 },
    );
  }

  return Response.json({
    message: "Check your inbox to confirm your subscription.",
  });
}
