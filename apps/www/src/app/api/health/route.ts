import { APP_ENV, IS_PRODUCTION, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    appEnv: APP_ENV,
    siteUrl: SITE_URL,
    indexing: IS_PRODUCTION ? "enabled" : "disabled"
  });
}
