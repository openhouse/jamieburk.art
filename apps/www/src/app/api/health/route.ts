import { APP_ENV, ROBOTS_INDEXABLE } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      ok: true,
      environment: APP_ENV,
      robots: ROBOTS_INDEXABLE ? "index" : "noindex"
    },
    {
      headers: ROBOTS_INDEXABLE
        ? undefined
        : { "X-Robots-Tag": "noindex, nofollow" }
    }
  );
}
