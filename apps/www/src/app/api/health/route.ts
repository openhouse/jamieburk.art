import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    site: site.name,
    env: site.env,
    url: site.url,
    indexingEnabled: site.enableIndexing
  });
}
