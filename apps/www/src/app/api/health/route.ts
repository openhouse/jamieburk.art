import { APP_ENV, IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      ok: true,
      service: "jamie-portfolio",
      appEnv: APP_ENV,
      siteUrl: SITE_URL,
      isProduction: IS_PRODUCTION
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
