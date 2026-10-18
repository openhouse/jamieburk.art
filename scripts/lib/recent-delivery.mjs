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

function platformAttributionOverclaim(text) {
  // A targeted wording alarm for metadata-only collaboration, not a substitute
  // for editorial review. Split neighboring assertions before applying negation.
  return String(text ?? "").split(/[.;!?]|\b(?:and|but|however|although|though|while)\b/i).some((clause) => {
    const strongerAuthority = /\b(?:endors(?:e[ds]?|ement|ing)|commission(?:ed|ing)|co[- ]created|sole authorship)\b/i.test(clause);
    const explicitLimit = /\b(?:does not|do not|cannot|doesn't|can't)\s+(?:establish|prove|imply|confer|demonstrate)\b|\b(?:not established|not confirmed|unconfirmed|no evidence|remains? unknown)\b|\bnot\s+(?:an?\s+)?(?:institutional\s+)?(?:endorsement|commissioning|sole authorship)\b|\bno\s+(?:endorsement|commissioning|sole authorship)\s+(?:is|was)\s+established\b/i.test(clause);
    return strongerAuthority && !explicitLimit;
  });
}

export function validateRecentDelivery({ contracts, claims, sources, pages = [], agencyRelations = [], entities = [] } = {}) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  check(Array.isArray(contracts) && contracts.length > 0, "At least one recent-delivery contract is required");
  check(Array.isArray(claims), "Canonical claims are required");
  check(Array.isArray(sources), "Canonical sources are required");
  check(Array.isArray(pages), "Canonical pages must be an array");
  check(Array.isArray(agencyRelations), "Canonical agency relations must be an array");
  check(Array.isArray(entities), "Canonical entities must be an array");
  if (errors.length) return { pass: false, errors };

  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const entityById = new Map(entities.map((entity) => [entity.id, entity]));
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
    if (contract.platformCollaboration !== undefined) {
      const binding = contract.platformCollaboration;
      const validBinding = binding && typeof binding === "object" && !Array.isArray(binding) &&
        typeof binding.sourceId === "string" && binding.sourceId.length > 0 &&
        typeof binding.relationId === "string" && binding.relationId.length > 0 &&
        stringList(binding.actorIds) && typeof binding.objectId === "string" && binding.objectId.length > 0;
      check(Boolean(validBinding), `${id}: platform collaboration needs source, relation, distinct actor and post bindings`);
      if (validBinding) {
        const relations = agencyRelations.filter((relation) => relation.id === binding.relationId);
        check(relations.length === 1, `${id}: platform collaboration must resolve to one relation`);
        check(sourceIds.includes(binding.sourceId), `${id}: platform source is outside contract bindings`);
        const supportKey = "platform-listed collaborators";
        check(sourceById.get(binding.sourceId)?.supportsGenerally?.includes(supportKey), `${id}: source does not support the platform collaborator listing`);
        check(evidence.some((item) => item.sourceId === binding.sourceId && item.supports?.includes(supportKey)), `${id}: claim evidence does not support the platform collaborator listing`);
        const relation = relations[0];
        if (relation) {
          check(relation.action === "listed-as-post-collaborator", `${id}: platform listing cannot become a creative or institutional action`);
          check(relation.creditScope === "shared", `${id}: platform listing must retain shared credit scope`);
          check(relation.claimIds?.length === 1 && relation.claimIds[0] === id, `${id}: platform relation has an unrelated claim binding`);
          check(relation.sourceIds?.length === 1 && relation.sourceIds[0] === binding.sourceId, `${id}: platform relation has an unrelated source binding`);
          check(relation.sourceSupportKeys?.length === 1 && relation.sourceSupportKeys[0] === supportKey, `${id}: platform relation must cite the observed collaborator listing`);
          check(stringList(relation.actorIds) && relation.actorIds.every((actorId) => entityById.has(actorId)), `${id}: platform relation needs distinct known actors`);
          check(stringList(relation.actorIds) && relation.actorIds.length === binding.actorIds.length &&
            relation.actorIds.every((actorId) => binding.actorIds.includes(actorId)), `${id}: platform relation must preserve the exact reviewed actor roster`);
          check(entityById.has(relation.objectId), `${id}: platform relation needs a known post object`);
          check(relation.objectId === binding.objectId, `${id}: platform relation must preserve the exact reviewed post`);
        }
      }
    }
    check(evidence.length > 0 && evidence.every((item) => sourceIds.includes(item.sourceId)), `${id}: claim evidence is outside contract bindings`);
    check(sourceIds.every((sourceId) => evidence.some((item) => item.sourceId === sourceId)), `${id}: a contract source is absent from canonical evidence`);
    for (const sourceId of sourceIds) {
      const source = sourceById.get(sourceId);
      check(Boolean(source), `${id}: canonical source is missing`);
      if (!source) continue;
      if (source.visibility !== "public") {
        check(!source.canonicalUrl && !source.archiveUrl && !source.assetUrl, `${id}: protected source exposes a URL`);
      }
      if (source.assetUrl) {
        check(source.media?.rightsStatus === "cleared" &&
          ["cleared", "not-applicable"].includes(source.media?.consentStatus) &&
          source.media?.publicDisplayStatus === "cleared", `${id}: held or unreviewed media exposes an asset`);
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
      if (contract.platformCollaboration !== undefined) {
        check(!platformAttributionOverclaim(projection.text), `${id}: platform collaboration does not establish endorsement, commissioning or creative authorship`);
      }
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
