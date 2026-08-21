import { mediaDeliveryManifest } from "@/lib/media-delivery";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function imageUrl(asset: (typeof mediaDeliveryManifest.assets)[number]) {
  return `${mediaDeliveryManifest.provider.deliveryBase}/c_limit,w_${asset.width}/f_auto,q_auto:${asset.quality}/v${asset.cloudinary.version}/${asset.cloudinary.publicId}`;
}

export function GET() {
  const routes = new Map<
    string,
    (typeof mediaDeliveryManifest.assets)[number][]
  >();

  for (const asset of mediaDeliveryManifest.assets) {
    for (const route of asset.routes) {
      routes.set(route, [...(routes.get(route) ?? []), asset]);
    }
  }

  const urls = [...routes.entries()]
    .map(([route, assets]) => {
      const images = assets
        .map(
          (asset) => `
    <image:image>
      <image:loc>${escapeXml(imageUrl(asset))}</image:loc>
      <image:caption>${escapeXml(asset.caption)}</image:caption>
      <image:title>${escapeXml(asset.title)}</image:title>
    </image:image>`
        )
        .join("");
      return `
  <url>
    <loc>${escapeXml(new URL(route, SITE_URL).toString())}</loc>${images}
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
