import { ROBOTS_INDEXABLE, SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  const body = ROBOTS_INDEXABLE
    ? `User-Agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : "User-Agent: *\nDisallow: /\n";

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
