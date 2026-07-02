interface Env {
  BUTTONDOWN_API_KEY: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SUBSCRIBE_ERROR = "Subscription failed. Try again later.";

interface ButtondownErrorBody {
  code?: string;
  detail?:
    | string
    | Array<{
        code?: string;
        detail?: string;
        message?: string;
        metadata?: Record<string, string>;
      }>;
  error?: string;
  message?: string;
  response?: string;
  errors?: string[] | Record<string, string[]>;
}

function firstErrorMessage(
  errors: ButtondownErrorBody["errors"],
): string | undefined {
  if (!errors) return undefined;
  if (Array.isArray(errors)) {
    return errors.find(Boolean);
  }

  for (const value of Object.values(errors)) {
    const message = value.find(Boolean);
    if (message) return message;
  }

  return undefined;
}

function getButtondownMessage(data: ButtondownErrorBody): string | undefined {
  const detailMessage = Array.isArray(data.detail)
    ? data.detail
        .map((entry) => entry.detail ?? entry.message)
        .find((message): message is string => Boolean(message))
    : data.detail;

  return (
    detailMessage ??
    data.error ??
    data.message ??
    data.response ??
    firstErrorMessage(data.errors)
  );
}

function isAlreadySubscribed(
  data: ButtondownErrorBody,
  status: number,
): boolean {
  if (status < 400 || status >= 500) return false;

  const code = data.code?.toLowerCase() ?? "";
  const message = getButtondownMessage(data)?.toLowerCase() ?? "";

  return (
    code.includes("already") ||
    code.includes("exists") ||
    (message.includes("already") &&
      (message.includes("subscribed") || message.includes("exists"))) ||
    (message.includes("confirm") && message.includes("subscription"))
  );
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const buttondownKey = env.BUTTONDOWN_API_KEY;

  if (!buttondownKey) {
    return Response.json(
      {
        error:
          "Newsletter subscription is not configured. BUTTONDOWN_API_KEY is missing.",
      },
      { status: 500 },
    );
  }

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

  let res: Response;
  try {
    res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${buttondownKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    return Response.json(
      { error: `Failed to connect to subscription service: ${msg}` },
      { status: 502 },
    );
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as ButtondownErrorBody;
    const upstreamMessage = getButtondownMessage(data);

    if (isAlreadySubscribed(data, res.status)) {
      return Response.json(
        {
          message:
            "You're already subscribed. Check your inbox if you still need to confirm.",
        },
        { status: 200 },
      );
    }

    if (upstreamMessage && res.status >= 400 && res.status < 500) {
      return Response.json({ error: upstreamMessage }, { status: res.status });
    }

    return Response.json({ error: DEFAULT_SUBSCRIBE_ERROR }, { status: 502 });
  }

  return Response.json({
    message: "Check your inbox to confirm your subscription.",
  });
}
