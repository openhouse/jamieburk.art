import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export function GET() {
  const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true";
  const body = noindex
    ? "User-Agent: *\nDisallow: /\n"
    : `User-Agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
