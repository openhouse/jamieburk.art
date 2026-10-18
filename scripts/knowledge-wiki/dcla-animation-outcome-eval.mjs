import { pathToFileURL } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaAnimationOutcome, dclaOutcomeReview } from "../../apps/www/src/data/knowledge-bank/dcla-animation-outcome-2026-10.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import { sourceRecordSchema, intakeItemSchema, observationSchema, claimRecordSchema, researchInquirySchema, knowledgeEntitySchema, agencyRelationSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";

const assessmentId = "SRC-JAMIE-DCLA-ANIMATION-OUTCOME-2026-10-18";
const articleId = "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03";
const reelId = "SRC-DCLA-INSTAGRAM-DENAV1HHOXC";
const panelId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18";
const visualId = "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18";
const claimId = "CLM-DCLA-ANIMATION-COLLABORATIVE-PUBLICATION";
const intakeId = "INTAKE-DCLA-ANIMATION-OUTCOME-CLARIFICATION";
const inquiryId = "INQ-DCLA-ANIMATION-ADOPTION-PROCESS";
const oldInquiryId = "INQ-DCLA-ANIMATION-CREDITS-AND-WEBSITE-USE";
const entityId = "ENT-DCLA-BROOKLYN-RECAP-2026";
const relationId = "REL-JAMIE-DCLA-RECAP-PUBLICATION";
const project = "nyc-artist-coalition";
const surface = "/work/fair-rent-nyc";
const sourceIds = [assessmentId, articleId, reelId, panelId, visualId];
const observationSources = {
  "OBS-DCLA-ANIMATION-SUCCESS-ASSESSMENT": assessmentId,
  "OBS-DCLA-ANIMATION-PUBLIC-COLLABORATION": panelId,
  "OBS-DCLA-ANIMATION-CAMPAIGN-CARRIAGE": visualId
};
const creditKey = "published photo-animation credit to Jamie Burkart for NYC Artist Coalition";
const collaborationKey = "displayed collaborator accounts";
const campaignKey = "Jamie's connection of the recap to FairRentNYC's commercial rent stabilization campaign";
const evidenceContract = {
  [articleId]: { relationship: "direct-support", renderCitation: true, supports: [creditKey, "animation included in the article when inspected"] },
  [panelId]: { relationship: "direct-support", renderCitation: false, supports: [collaborationKey] },
  [visualId]: { relationship: "direct-support", renderCitation: false, supports: ["on-screen caption sequence"] },
  [reelId]: { relationship: "corroborating", renderCitation: true, supports: ["October 7 Instagram publication", "30-second published animation"] },
  [assessmentId]: { relationship: "direct-support", renderCitation: false, supports: [campaignKey] }
};
const inventories = {
  sources: [assessmentId], intakeItems: [intakeId], observations: Object.keys(observationSources),
  claims: [claimId], researchInquiries: [inquiryId], entities: [entityId], agencyRelations: [relationId]
};
const exact = (values, expected) => Array.isArray(values) && values.length === expected.length && new Set(values).size === values.length && expected.every(value => values.includes(value));
const text = value => typeof value === "string" && value.trim().length > 0;
const textList = values => Array.isArray(values) && values.length > 0 && values.every(text);
const validDate = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
// These outcome-record arrays are evidence sets, not sequences. Compare parsed
// semantics without making record/property ordering an authority boundary.
const canonicalEvidence = value => {
  if (Array.isArray(value)) return value.map(canonicalEvidence).sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([key, item]) => [key, canonicalEvidence(item)]));
  return value;
};

// This enforces a source-specific evidence contract, not a universal semantic
// judge. It preserves the observed adoption outcome and its limits together.
// Passing does not certify audio, establish consent, or authorize media reuse.
export function evaluateDclaOutcome({ review: inputReview = dclaOutcomeReview, knowledge: inputKnowledge = dclaAnimationOutcome, graph = knowledgeBank, registry = publicRegistry } = {}) {
  const errors = [];
  let checks = 0;
  const check = (condition, message) => { checks++; if (!condition) errors.push(message); };
  const schemas = { sources: sourceRecordSchema, intakeItems: intakeItemSchema, observations: observationSchema, claims: claimRecordSchema, researchInquiries: researchInquirySchema, entities: knowledgeEntitySchema, agencyRelations: agencyRelationSchema };
  const knowledge = {};
  for (const [key, schema] of Object.entries(schemas)) {
    const parsed = Array.isArray(inputKnowledge?.[key]) ? inputKnowledge[key].map(item => schema.safeParse(item)) : null;
    check(parsed !== null && parsed.every(item => item.success), `Malformed ${key} records.`);
    knowledge[key] = parsed?.filter(item => item.success).map(item => item.data) ?? [];
  }
  check(Boolean(inputReview) && typeof inputReview === "object" && !Array.isArray(inputReview), "An outcome review is required.");
  const records = values => Array.isArray(values) && values.every(item => item !== null && typeof item === "object" && !Array.isArray(item));
  check(["pages", "sources", ...Object.keys(schemas)].every(key => records(graph?.[key])), "A complete outcome graph with object records is required.");
  check(["sources", "claims", "pages"].every(key => records(registry?.[key])), "A complete public registry with object records is required.");
  if (errors.length) return { passed: false, checks, errors, websiteMediaReady: false };
  check(graph.pages.every(page => records(page.occurrences)), "Graph pages require nested citation occurrence objects.");
  check(registry.pages.every(page => records(page.occurrences)), "Public registry pages require nested citation occurrence objects.");
  if (errors.length) return { passed: false, checks, errors, websiteMediaReady: false };
  const review = inputReview;
  for (const [key, ids] of Object.entries(inventories)) {
    check(exact(knowledge[key].map(item => item.id), ids), `Retain the complete ${key} record inventory without deletion, duplication, or substitution.`);
    check(ids.every(id => graph[key].filter(item => item.id === id).length === 1), `The ${key} records must be integrated exactly once into the graph.`);
    check(knowledge[key].every(record => {
      const integrated = graph[key].filter(item => item.id === record.id);
      const parsed = integrated.length === 1 ? schemas[key].safeParse(integrated[0]) : null;
      return parsed?.success && JSON.stringify(canonicalEvidence(record)) === JSON.stringify(canonicalEvidence(parsed.data));
    }), `Integrated ${key} graph/module semantics must agree with the reviewed outcome records.`);
  }
  const sharedSources = graph.sources.filter(item => sourceIds.includes(item.id) && item.id !== assessmentId);
  check(exact(sharedSources.map(item => item.id), [articleId, reelId, panelId, visualId]), "Each reused shared source must resolve exactly once; do not duplicate publications.");
  const parsedShared = sharedSources.map(item => sourceRecordSchema.safeParse(item));
  check(parsedShared.every(item => item.success), "Every shared source must remain a valid source record.");
  const sources = [...knowledge.sources, ...parsedShared.filter(item => item.success).map(item => item.data)];
  const sourceById = new Map(sources.map(item => [item.id, item]));
  const claim = knowledge.claims.find(item => item.id === claimId);
  const intake = knowledge.intakeItems.find(item => item.id === intakeId);
  const inquiry = knowledge.researchInquiries.find(item => item.id === inquiryId);
  const assessment = knowledge.sources.find(item => item.id === assessmentId);
  const relation = knowledge.agencyRelations.find(item => item.id === relationId);

  check(review.outcomeType === "communications-adoption", "Retain communications-adoption as an outcome, not merely a production credit.");
  check(review.publicationScope === "one-reel-and-article-inclusion", "Keep publication scope bounded to this reel and article inclusion.");
  check(review.creationEvidence === articleId && review.collaborationEvidence === panelId && review.messageEvidence === visualId, "Creation, collaboration, and message evidence roles must remain distinct.");
  check(review.assessment?.sourceId === assessmentId && review.assessment?.attributedTo === "Jamie Burkart" && review.assessment?.status === "first-person-assessment", "The success assessment must retain its maker attribution.");
  check(review.campaignConnection?.sourceId === assessmentId && review.campaignConnection?.status === "maker-attributed", "The campaign connection must retain its maker-attributed basis.");
  check(exact(review.collaborators, ["651arts", "nyculture", "bkartscouncil", "lin.tyrpien", "jamieburkart", "nycartc"]), "Keep the exact observed collaborator inventory.");
  for (const flag of ["policyEndorsementEstablished", "policyAdoptionEstablished", "formalPartnershipEstablished", "audienceGrowthMeasured", "adoptionProcessVerified", "participantConsensusEstablished", "mediaReuseAuthorized"]) check(review[flag] === false, `Unsupported authority transition: ${flag}.`);
  check(review.websiteProjection === "text-only", "The selected outcome projection is text-only, not media reuse.");
  check(validDate(review.reviewedAt), "The outcome review needs a real ISO calendar date.");
  check(assessment?.accessedAt === review.reviewedAt && claim?.reviewedAt === review.reviewedAt && inquiry?.runAt === review.reviewedAt && relation?.reviewedAt === review.reviewedAt && intake?.submittedAt === review.reviewedAt, "Outcome review dates must match the clarification encounter.");
  check(assessment?.author === "Jamie Burkart" && assessment?.kind === "research-run" && assessment?.visibility === "public-metadata-only" && assessment?.preservationStatus === "private" && assessment?.protectedLocatorId === "RESEARCH-DCLA-OUTCOME-ACCOUNT-2026-10" && !assessment?.canonicalUrl && !assessment?.archiveUrl && !assessment?.assetUrl, "Keep the assessment source attributed and metadata-only with private underlying custody.");
  for (const source of sources) check(textList(source.supportsGenerally) && textList(source.doesNotEstablish), "Source support keys and scope limits must remain explicit.");
  for (const id of [panelId, visualId]) {
    const source = sourceById.get(id);
    check(source?.kind === "research-run" && source?.visibility === "public-metadata-only" && source?.preservationStatus === "private" && text(source?.protectedLocatorId) && !source?.canonicalUrl && !source?.assetUrl && !source?.archiveUrl, "Every shared protected source must remain metadata-only without an underlying public URL.");
  }
  for (const [id, url] of [[articleId, "https://www.creativenewyork.co/p/i-imagine-a-brooklyn-where"], [reelId, "https://www.instagram.com/reel/DeNAv1HhOxC/"]]) {
    const source = sourceById.get(id);
    check(source?.visibility === "public" && source?.canonicalUrl === url && !source?.archiveUrl && !source?.assetUrl, "Use the observed clean public source URL, not a download or unverified asset.");
  }
  const media = sourceById.get(reelId)?.media;
  check(media?.rightsStatus === "permission-needed" && media?.consentStatus === "review-needed" && media?.publicDisplayStatus === "hold", "Publication evidence does not clear media reuse.");

  check(intake?.visibility === "public-safe" && intake?.disposition === "integrated" && exact(intake?.projectIds, [project]) && textList(intake?.boundaries), "Keep the outcome intake public-safe, bounded, and integrated into the same project.");
  check(intake?.kind === "memory-lead", "The maker self-account is a memory lead, not independent collaborator corroboration.");
  check(exact(intake?.sourceIds, sourceIds) && exact(intake?.observationIds, Object.keys(observationSources)) && exact(intake?.researchInquiryIds, [inquiryId]), "Retain the reciprocal intake inventory of sources, observations, and inquiry.");
  for (const observation of knowledge.observations) {
    check(observation.project === project && observation.intakeId === intakeId && observation.sourceId === observationSources[observation.id], "Keep observation ownership tied to its inspected source and outcome intake.");
    check(text(observation.locator), "Every observation anchor must be nonempty.");
    check(observation.publicSafe && textList(observation.limitations), "Preserve public-safe observation limits.");
    check([observation.sourceId, ...observation.comparisonSourceIds].every(id => sourceById.has(id) && intake?.sourceIds.includes(id)), "All observation source links must resolve within the intake.");
    check(exact(observation.claimIds, [claimId]) && exact(observation.researchInquiryIds, [inquiryId]), "Every observation must retain its claim and open inquiry links.");
  }
  const assessmentObservation = knowledge.observations.find(item => item.id === "OBS-DCLA-ANIMATION-SUCCESS-ASSESSMENT");
  check(assessmentObservation?.kind === "participant-memory" && assessmentObservation?.status === "captured", "Keep the assessment observation first-person, not independently verified success.");
  check(inquiry?.project === project && inquiry?.resultStatus === "partially-recovered" && textList(inquiry?.limitations), "Keep the adoption-process open inquiry and its unresolved limits.");
  check(exact(inquiry?.sourceIds, sourceIds), "Retain the inquiry source inventory.");
  check(claim?.project === project && claim?.status === "confirmed-with-boundary" && textList(claim?.boundaries) && textList(claim?.antiClaims) && textList(claim?.reviewedBy), "The public outcome must retain bounded claim status and editorial guardrails.");
  check(exact(claim?.researchInquiryIds, [inquiryId, oldInquiryId]) && graph.researchInquiries.some(item => item.id === oldInquiryId), "Keep the unresolved media-use inquiry separate from the outcome-process inquiry.");
  check(exact(claim?.evidence.map(item => item.sourceId), sourceIds), "Retain the claim evidence inventory for credit, collaboration, message carriage, publication, and maker attribution.");
  for (const evidence of claim?.evidence ?? []) {
    const expected = evidenceContract[evidence.sourceId];
    check(expected && evidence.relationship === expected.relationship, "Keep the source-specific evidence relationship.");
    check(expected && exact(evidence.supports, expected.supports) && evidence.supports.every(key => sourceById.get(evidence.sourceId)?.supportsGenerally.includes(key)), "Claim support keys must match their supporting source and evidence role.");
    check(text(evidence.locator), "Every claim evidence anchor must be nonempty.");
    check(expected && evidence.renderCitation === expected.renderCitation && (!evidence.renderCitation || sourceById.get(evidence.sourceId)?.visibility === "public"), "Keep citation visibility public-only while retaining protected support internally.");
  }
  check(claim?.projections.length === 1 && claim.projections[0].key === "case-study" && claim.projections[0].status === "active" && claim.projections[0].citationRequired && exact(claim.projections[0].surfaces, [surface]), "Keep the active, cited, single-surface text projection contract.");
  const occurrences = graph.pages.flatMap(page => (Array.isArray(page.occurrences) ? page.occurrences : []).filter(item => item.claimId === claimId).map(item => ({ page, item })));
  check(occurrences.length === 1 && occurrences[0]?.page.id === "fair-rent-nyc" && occurrences[0]?.page.surface === surface && occurrences[0]?.item.id === "dcla-collaborative-recap" && occurrences[0]?.item.projection === "case-study", "The selected text outcome needs exactly one matching public citation occurrence with the MDX reference ID.");
  check(occurrences.every(({ item }) => item.sourceIds === undefined || exact(item.sourceIds, [articleId, reelId])), "Any citation source override must preserve both public sources and exclude protected evidence.");
  const completeSourceOrder = order => Array.isArray(order) && [articleId, reelId].every(id => order.filter(value => value === id).length === 1);
  check(occurrences.length === 1 && completeSourceOrder(occurrences[0].page.sourceOrder), "The outcome page source order must contain each public outcome source exactly once.");
  check(relation?.project === project && exact(relation?.actorIds, ["ENT-JAMIE-BURKART"]) && relation?.objectId === entityId && relation?.action === "helped-produce" && relation?.creditScope === "shared" && relation?.status === "confirmed-with-boundary", "Keep agency scope on Jamie's credited contribution to shared publication, not sole production or enactment.");
  check(exact(relation?.claimIds, [claimId]), "The agency claim must resolve to the bounded outcome claim.");
  check(exact(relation?.sourceIds, [articleId, panelId, assessmentId]), "Retain the agency source inventory for credit, displayed collaboration, and campaign purpose.");
  check(exact(relation?.sourceSupportKeys, [creditKey, collaborationKey, campaignKey]) && relation.sourceSupportKeys.every(key => relation.sourceIds.some(id => sourceById.get(id)?.supportsGenerally.includes(key) && claim?.evidence.some(evidence => evidence.sourceId === id && evidence.supports.includes(key)))), "All agency support keys need both source vocabulary and claim-evidence support.");
  check(graph.entities.filter(item => item.id === "ENT-JAMIE-BURKART" && item.kind === "person" && item.publicSafe).length === 1, "The agency actor must resolve uniquely to a public-safe person.");
  check(knowledge.entities.some(item => item.id === entityId && item.kind === "project" && item.publicSafe), "The agency object must remain the public-safe recap artifact.");

  const publicClaims = registry.claims.filter(item => item.id === claimId);
  const publicClaim = publicClaims[0];
  check(publicClaims.length === 1 && publicClaim?.status === claim?.status, "The public registry claim must resolve exactly once to the reviewed outcome.");
  const publicProjections = publicClaim?.projections;
  check(Array.isArray(publicProjections) && publicProjections.length === 1 && publicProjections[0]?.text === claim?.projections[0]?.text && publicProjections[0]?.status === "active" && publicProjections[0]?.key === "case-study" && publicProjections[0]?.citationRequired === true && exact(publicProjections[0]?.surfaces, [surface]), "The public registry projection must match the selected canonical text and surface.");
  const publicEvidence = publicClaim?.evidence;
  check(records(publicEvidence) && exact(publicEvidence.map(item => item.sourceId), [articleId, reelId]) && publicEvidence.every(item => item.renderCitation === true && !Object.hasOwn(item, "locator") && !Object.hasOwn(item, "internalExcerpt") && item.relationship === evidenceContract[item.sourceId]?.relationship && exact(item.supports, evidenceContract[item.sourceId]?.supports ?? [])), "The public registry evidence must expose only the two public citations without private anchors or excerpts.");
  const publicSources = registry.sources.filter(item => [articleId, reelId].includes(item.id));
  check(exact(publicSources.map(item => item.id), [articleId, reelId]) && publicSources.every(item => {
    const source = sourceById.get(item.id);
    if (!source || source.visibility !== "public") return false;
    const { protectedLocatorId: _protectedLocatorId, media: _media, supportsGenerally: _supportsGenerally, ...expectedPublicSource } = source;
    return JSON.stringify(canonicalEvidence(item)) === JSON.stringify(canonicalEvidence(expectedPublicSource));
  }), "The public registry source projection must match its reviewed public fields and strip protected or internal metadata.");
  const publicOccurrences = registry.pages.flatMap(page => (Array.isArray(page.occurrences) ? page.occurrences : []).filter(item => item.claimId === claimId).map(item => ({ page, item })));
  check(publicOccurrences.length === 1 && publicOccurrences[0]?.page.id === "fair-rent-nyc" && publicOccurrences[0]?.page.surface === surface && publicOccurrences[0]?.item.id === "dcla-collaborative-recap" && publicOccurrences[0]?.item.projection === "case-study" && (publicOccurrences[0]?.item.sourceIds === undefined || exact(publicOccurrences[0]?.item.sourceIds, [articleId, reelId])), "The public registry occurrence must preserve the selected cited outcome and MDX reference ID.");
  check(publicOccurrences.length === 1 && completeSourceOrder(publicOccurrences[0].page.sourceOrder), "The public registry source order must contain each public outcome source exactly once.");
  const publicJson = JSON.stringify(registry);
  check([assessmentId, panelId, visualId, ...sources.map(item => item.protectedLocatorId).filter(Boolean)].every(id => !publicJson.includes(id)), "Keep public registry protected evidence and underlying source locators out of the visitor payload.");

  const assertions = [
    ...knowledge.observations.map(item => item.text),
    ...knowledge.claims.flatMap(item => [item.internalClaim, ...item.projections.map(projection => projection.text)]),
    ...knowledge.sources.flatMap(item => [item.publicNote ?? "", ...item.supportsGenerally]),
    ...knowledge.researchInquiries.flatMap(item => [item.publicSummary ?? "", ...item.findings]),
    ...knowledge.agencyRelations.flatMap(item => [item.purpose, item.result])
  ];
  // Known assertion regressions only. These do not assess arbitrary semantics,
  // creative quality, actual institutional influence, or unstated attribution.
  const unsupported = [
    /\b(?:DCLA|Brooklyn Arts Council|651 ARTS|all institutions)\s+(?:endorsed|enacted|approved)\s+(?:FairRentNYC|the campaign|the legislation|the policy)/i,
    /\b(?:adopted|enacted)\s+(?:FairRentNYC['’]s\s+)?(?:legislation|policy)\b/i,
    /\bestablished a (?:permanent|formal|ongoing) (?:institutional )?partnership\b/i,
    /\ball participants (?:agreed|endorsed|supported)\b/i,
    /\bJamie(?: Burkart)? (?:negotiated|secured|handled) (?:the )?(?:collaboration approvals|permissions|invitations)\b/i,
    /\b(?:doubled|tripled|increased|grew)\s+(?:the )?(?:campaign['’]s )?audience\b/i
  ];
  check(assertions.every(value => unsupported.every(pattern => !pattern.test(value))), "A known unsupported assertion contradicts the outcome's evidence limits.");
  const rawRelevantSources = graph.sources.filter(item => sourceIds.includes(item.id));
  // Inspect the actual visitor projection as well as canonical inputs. Only
  // this outcome's sources, claim, and occurrences belong to this local guard;
  // the repository-wide public-safety check owns unrelated registry content.
  const scopedRegistry = {
    sources: publicSources,
    claims: publicClaims,
    occurrences: publicOccurrences.map(({ page, item }) => ({ pageId: page.id, surface: page.surface, sourceOrder: page.sourceOrder, occurrence: item }))
  };
  check(!/(?:\/Users\/|\/Volumes\/|\/private\/|\/tmp\/|file:\/\/|https?:[^\s"<>]*(?:[?&](?:signature|token|cplk|expires)=)|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(JSON.stringify({ review, knowledge: inputKnowledge, sources: rawRelevantSources, registry: scopedRegistry })), "Keep private locators, signed URLs, tracking tokens, and contact addresses out, including schema-omitted fields and the actual scoped public registry.");
  return { passed: errors.length === 0, checks, errors, websiteMediaReady: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = evaluateDclaOutcome();
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.passed ? 0 : 1;
}
