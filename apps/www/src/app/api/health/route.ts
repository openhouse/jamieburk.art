import { site } from "@/data/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    siteUrl: site.url,
    deployEnv: site.deployEnv
  });
}
