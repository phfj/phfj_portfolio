interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  VIEWS_KV?: KVNamespace;
}

// In-memory fallback for local development when VIEWS_KV is not bound.
const localCache = new Map<string, number>();

const SLUG_REGEX = /^[a-zA-Z0-9-_]+$/;

async function handleViews(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug || !SLUG_REGEX.test(slug)) {
    return Response.json({ error: "Invalid post slug" }, { status: 400 });
  }

  const kvKey = `post:views:${slug}`;

  try {
    if (request.method === "GET") {
      let views = 0;
      if (env.VIEWS_KV) {
        const stored = await env.VIEWS_KV.get(kvKey);
        views = stored ? parseInt(stored, 10) : 0;
        if (isNaN(views)) views = 0;
      } else {
        views = localCache.get(slug) ?? 0;
      }

      return Response.json({ views });
    }

    if (request.method === "POST") {
      let views = 0;
      if (env.VIEWS_KV) {
        const stored = await env.VIEWS_KV.get(kvKey);
        const current = stored ? parseInt(stored, 10) : 0;
        views = (isNaN(current) ? 0 : current) + 1;
        await env.VIEWS_KV.put(kvKey, views.toString());
      } else {
        const current = localCache.get(slug) ?? 0;
        views = current + 1;
        localCache.set(slug, views);
      }

      return Response.json({ views });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleViews(context);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleViews(context);
}
