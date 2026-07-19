import { APP_ENV, IS_PRODUCTION, ROBOTS_INDEXABLE, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  const candidateSha = process.env.PORTFOLIO_CANDIDATE_SHA ?? null;
  return Response.json(
    {
      ok: true,
      service: "jamie-portfolio",
      appEnv: APP_ENV,
      siteUrl: SITE_URL,
      isProduction: IS_PRODUCTION,
      robotsIndexable: ROBOTS_INDEXABLE,
      candidateSha
    },
    {
      headers: ROBOTS_INDEXABLE
        ? undefined
        : { "X-Robots-Tag": "noindex, nofollow" }
    }
  );
}
