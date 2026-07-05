import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    site: site.url,
    environment: site.environment,
    allowIndexing: site.allowIndexing
  });
}
