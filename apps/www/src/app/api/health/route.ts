export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamieburk.art",
    environment: process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "unknown",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "unset",
    timestamp: new Date().toISOString()
  });
}
