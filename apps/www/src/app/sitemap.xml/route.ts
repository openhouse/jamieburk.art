import { workItems } from "@/data/work";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const staticRoutes = [
  "/",
  "/work",
  "/work/technical-operations",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");

export function GET() {
  const now = new Date().toISOString();
  const routes = [
    ...staticRoutes,
    ...workItems.map((item) => `/work/${item.slug}`)
  ];

  const urls = routes
    .map((route) => {
      const loc = escapeXml(new URL(route, SITE_URL).toString());

      return `<url>
<loc>${loc}</loc>
<lastmod>${now}</lastmod>
</url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
