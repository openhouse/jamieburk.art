import {
  APP_ENV,
  DEPLOY_ENV,
  IS_PRODUCTION,
  ROBOTS_INDEXABLE,
  SITE_ENV,
  SITE_URL
} from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  const body = ROBOTS_INDEXABLE
    ? {
        ok: true,
        service: "jamie-portfolio",
        siteUrl: SITE_URL,
        robotsIndexable: true
      }
    : {
        ok: true,
        service: "jamie-portfolio",
        appEnv: APP_ENV,
        siteEnv: SITE_ENV,
        deployEnv: DEPLOY_ENV,
        siteUrl: SITE_URL,
        isProduction: IS_PRODUCTION,
        robotsIndexable: ROBOTS_INDEXABLE
      };

  return Response.json(
    body,
    {
      headers: ROBOTS_INDEXABLE
        ? undefined
        : { "X-Robots-Tag": "noindex, nofollow" }
    }
  );
}
