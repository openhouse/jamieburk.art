export function GET() {
  return Response.json({
    ok: true,
    service: "jamieburk.art",
    timestamp: new Date().toISOString()
  });
}
