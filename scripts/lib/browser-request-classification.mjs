/**
 * Classify an observed aborted background RSC prefetch, not its cause.
 * Never exempt navigation/assets, transport failures, or unverified destinations.
 * Keep the raw request in the receipt even when it is classified separately.
 */
export function isVerifiedPrefetchCancellation(record, { baseUrl } = {}) {
  try {
    if (!record || record.method !== "GET" || record.resourceType !== "fetch" ||
        record.errorText !== "net::ERR_ABORTED" || record.isNavigationRequest !== false) return false;
    const base = new URL(baseUrl);
    const request = new URL(record.url);
    if (request.origin !== base.origin || !request.searchParams.get("_rsc")) return false;
    const headers = Object.fromEntries(Object.entries(record.headers ?? {})
      .map(([name, value]) => [name.toLowerCase(), value]));
    if (headers.rsc !== "1" || headers["next-router-prefetch"] !== "1") return false;
    const destination = record.verifiedDestination;
    if (destination?.status !== 200 || destination?.redirected !== false ||
        !/^text\/html(?:\s*;|$)/i.test(destination?.contentType ?? "")) return false;
    request.searchParams.delete("_rsc");
    const verified = new URL(destination.url);
    // URLSearchParams serializes spaces as '+'. Normalize both sides equally.
    verified.search = verified.searchParams.toString();
    return verified.href === request.href;
  } catch {
    return false;
  }
}
