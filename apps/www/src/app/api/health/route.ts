export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamieburk-art",
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? "unknown"
  });
}
