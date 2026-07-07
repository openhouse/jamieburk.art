import { ROBOTS_INDEXABLE } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      ok: true,
      service: "jamie-portfolio"
    },
    {
      headers: ROBOTS_INDEXABLE
        ? undefined
        : { "X-Robots-Tag": "noindex, nofollow" }
    }
  );
}
