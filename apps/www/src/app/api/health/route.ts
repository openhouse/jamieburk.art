export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    ok: true,
    service: "jamie-portfolio",
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT ?? "local"
  });
}
