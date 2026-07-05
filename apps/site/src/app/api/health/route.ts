import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamieburk-art",
    environment: site.deployEnv,
    siteUrl: site.url
  });
}
