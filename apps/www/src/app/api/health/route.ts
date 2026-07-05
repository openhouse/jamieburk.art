import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    site: site.url,
    deployEnv: site.deployEnv
  });
}
