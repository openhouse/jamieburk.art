// A bounded projection contract, not a source verifier or publication decision.
// The caller supplies already-reviewed evidence states. No state implies another:
// a handoff is not acceptance, and a checked print proof is not an installation.
const states = new Set([
  "scheduled", "occurred", "created", "proof-checked", "delivered",
  "accepted", "installed", "published", "paid"
]);

const affirmativeOutcomes = [
  ["occurred", /\b(?:took place|was held|were held|held (?:the|its|their)\s+(?:[\w,-]+\s+){0,4}(?:meeting|workshop|event))\b/i],
  ["accepted", /\b(?:client|customer)\s+(?:has\s+)?accepted\b|\b(?:deliverables?|work|files?)\s+(?:were|was|have been|has been)\s+accepted\b/i],
  ["installed", /\binstalled\b/i],
  ["paid", /\b(?:was|were|has been|have been|got)\s+paid\b|\bpayment\s+(?:was\s+)?received\b/i],
  ["published", /\b(?:published|posted|released publicly)\b/i]
];

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
}

function stringList(value) {
  return Array.isArray(value) && value.length > 0 &&
    value.every((item) => typeof item === "string" && item.length > 0) &&
    new Set(value).size === value.length;
}

function affirmativeClauses(text) {
  // Separate neighboring propositions before recognizing a negative boundary.
  // This is a small regression alarm, not general natural-language inference.
  return String(text ?? "").split(/[.;!?]|\b(?:but|and|although|though|while)\b/i).filter((clause) =>
    !/\b(?:not established|not confirmed|unconfirmed|no evidence|remains? unknown)\b/i.test(clause)
  ).map((clause) => clause.replace(/\b(?:not|never)\s+(?:yet\s+)?(?:accepted|installed|paid|published|posted)\b/gi, ""));
}

export function validateRecentDelivery({ contracts, claims, sources, pages = [] } = {}) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  check(Array.isArray(contracts) && contracts.length > 0, "At least one recent-delivery contract is required");
  check(Array.isArray(claims), "Canonical claims are required");
  check(Array.isArray(sources), "Canonical sources are required");
  check(Array.isArray(pages), "Canonical pages must be an array");
  if (errors.length) return { pass: false, errors };

  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const seen = new Set();
  for (const contract of contracts) {
    if (!contract || typeof contract !== "object") {
      errors.push("A recent-delivery contract must be an object");
      continue;
    }
    const id = contract.claimId;
    check(typeof id === "string" && id.length > 0, "A contract needs a claim ID");
    check(!seen.has(id), `${id}: duplicate contract`);
    seen.add(id);
    const observed = stringList(contract.observedStates) ? contract.observedStates : [];
    const projected = stringList(contract.publicStates) ? contract.publicStates : [];
    check(observed.length > 0 && observed.every((state) => states.has(state)), `${id}: invalid observed states`);
    check(projected.length > 0 && projected.every((state) => states.has(state)), `${id}: invalid public states`);
    check(projected.every((state) => observed.includes(state)), `${id}: public state is not explicitly observed`);
    check(["shared", "jamie-contribution"].includes(contract.creditScope), `${id}: unsupported credit scope`);
    check(contract.publicationScope === "text-only", `${id}: publication scope must remain text-only`);
    check(stringList(contract.allowedSurfaces), `${id}: allowed surfaces are required`);
    check(stringList(contract.sourceIds), `${id}: source bindings are required`);
    check(validDate(contract.evidenceAsOf), `${id}: invalid evidence-as-of date`);
    check(validDate(contract.recordedAt), `${id}: invalid recorded-at date`);
    check(contract.eventDate === null || validDate(contract.eventDate), `${id}: event date must be known or explicitly null`);
    if (validDate(contract.evidenceAsOf) && validDate(contract.recordedAt)) {
      check(contract.evidenceAsOf <= contract.recordedAt, `${id}: evidence postdates its recorded return`);
    }
    if (projected.includes("occurred")) check(validDate(contract.eventDate), `${id}: occurrence requires an event date`);
    if (projected.some((state) => state !== "scheduled") && validDate(contract.eventDate) && validDate(contract.evidenceAsOf)) {
      check(contract.eventDate <= contract.evidenceAsOf, `${id}: event postdates supporting evidence`);
    }

    const sourceIds = Array.isArray(contract.sourceIds) ? contract.sourceIds : [];
    const allowed = Array.isArray(contract.allowedSurfaces) ? contract.allowedSurfaces : [];
    const claim = claimById.get(id);
    check(Boolean(claim), `${id}: canonical claim is missing`);
    if (!claim) continue;
    const evidence = Array.isArray(claim.evidence) ? claim.evidence : [];
    const projections = Array.isArray(claim.projections) ? claim.projections : [];
    check(evidence.length > 0 && evidence.every((item) => sourceIds.includes(item.sourceId)), `${id}: claim evidence is outside contract bindings`);
    check(sourceIds.every((sourceId) => evidence.some((item) => item.sourceId === sourceId)), `${id}: a contract source is absent from canonical evidence`);
    for (const sourceId of sourceIds) {
      const source = sourceById.get(sourceId);
      check(Boolean(source), `${id}: canonical source is missing`);
      if (!source) continue;
      if (source.visibility !== "public") {
        check(!source.canonicalUrl && !source.archiveUrl && !source.assetUrl, `${id}: protected source exposes a URL`);
      }
      if (source.assetUrl && source.media) {
        check(source.media.rightsStatus === "cleared" &&
          ["cleared", "not-applicable"].includes(source.media.consentStatus) &&
          source.media.publicDisplayStatus === "cleared", `${id}: held media exposes an asset`);
      }
    }

    for (const projection of projections) {
      if (projection.status === "hold") check((projection.surfaces ?? []).length === 0, `${id}: held projection names a public surface`);
      if (projection.status !== "active") continue;
      check(!["not-recovered", "disallowed"].includes(claim.status), `${id}: unresolved or disallowed claim is active`);
      check(projection.key !== "photo-caption", `${id}: text-only contract cannot activate media`);
      check(Array.isArray(projection.surfaces) && projection.surfaces.length > 0 && projection.surfaces.every((surface) => allowed.includes(surface)), `${id}: projection leaves allowed surfaces`);
      const hasPublicSource = evidence.some((item) => sourceById.get(item.sourceId)?.visibility === "public");
      if (hasPublicSource) check(projection.citationRequired === true, `${id}: public-source projection requires citation`);
      if (projection.citationRequired) check(evidence.some((item) => item.renderCitation === true), `${id}: required citation has no renderable evidence`);
      const clauses = affirmativeClauses(projection.text);
      check(!clauses.some((clause) => /\b(?:single-handedly|sole (?:creator|organizer|author|producer|founder)|alone (?:created|organized|produced|delivered))\b/i.test(clause)), `${id}: contribution inflated to sole credit`);
      for (const [state, pattern] of affirmativeOutcomes) {
        if (clauses.some((clause) => pattern.test(clause))) {
          check(projected.includes(state), `${id}: projection text asserts unsupported ${state}`);
        }
      }
    }
    for (const page of pages) {
      for (const occurrence of page.occurrences ?? []) {
        if (occurrence.claimId !== id) continue;
        const projection = projections.find((item) => item.key === occurrence.projection);
        check(allowed.includes(page.surface) && projection?.status === "active" &&
          projection.surfaces?.includes(page.surface), `${id}: page occurrence uses an unauthorized projection`);
        if (occurrence.sourceIds) check(occurrence.sourceIds.every((sourceId) => sourceIds.includes(sourceId)), `${id}: page occurrence uses unbound evidence`);
      }
    }
  }
  return { pass: errors.length === 0, errors };
}
