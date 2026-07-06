import { APP_ENV, IS_PRODUCTION, ROBOTS_INDEXABLE, ROBOTS_POLICY, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      ok: true,
      service: "jamie-portfolio",
      appEnv: APP_ENV,
      siteUrl: SITE_URL,
      isProduction: IS_PRODUCTION,
      robotsPolicy: ROBOTS_POLICY,
      robotsIndexable: ROBOTS_INDEXABLE
    },
    {
      headers: ROBOTS_INDEXABLE
        ? undefined
        : { "X-Robots-Tag": "noindex, nofollow" }
    }
  );
}
