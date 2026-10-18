import { pathToFileURL } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaAnimationPublication, dclaPublicationReview } from "../../apps/www/src/data/knowledge-bank/dcla-animation-publication-2026-10.ts";
import { sourceRecordSchema, intakeItemSchema, observationSchema, claimRecordSchema, researchInquirySchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";

const articleId = "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03";
const reelId = "SRC-DCLA-INSTAGRAM-DENAV1HHOXC";
const claimId = "CLM-DCLA-ANIMATION-PUBLISHED-CREDIT";
const inquiryId = "INQ-DCLA-ANIMATION-CREDITS-AND-WEBSITE-USE";
const intakeId = "INTAKE-DCLA-ANIMATION-PUBLICATION-2026-10";
const project = "nyc-artist-coalition";
const inspectionId = "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18";
const screenshotsId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18";
const creditSupport = "published photo-animation credit to Jamie Burkart for NYC Artist Coalition";
const observationSources = {
  "OBS-DCLA-ANIMATION-ARTICLE-CREDIT": articleId,
  "OBS-DCLA-ANIMATION-ARTICLE-INCLUSION": articleId,
  "OBS-DCLA-ANIMATION-REEL-PUBLICATION": reelId,
  "OBS-DCLA-ANIMATION-CAPTION-SEQUENCE": inspectionId,
  "OBS-DCLA-ANIMATION-HISTORY-BOUNDARY": inspectionId,
  "OBS-DCLA-ANIMATION-COLLABORATORS": screenshotsId
};

const exactInventory = (values, expected) => values.length === expected.length && new Set(values).size === values.length && expected.every(value => values.includes(value));
const nonemptyTextList = values => Array.isArray(values) && values.length > 0 && values.every(value => typeof value === "string" && value.trim().length > 0);
const validIsoDate = value => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

// Source-backed metadata checks do not grant media use, certify speech, or judge people.
export function evaluateDclaPublication({ review = dclaPublicationReview, knowledge: inputKnowledge = dclaAnimationPublication, graph = knowledgeBank } = {}) {
  const errors = [];
  let checks = 0;
  const check = (condition, message) => { checks++; if (!condition) errors.push(message); };
  const schemas = { sources: sourceRecordSchema, intakeItems: intakeItemSchema, observations: observationSchema, claims: claimRecordSchema, researchInquiries: researchInquirySchema };
  const knowledge = {};
  for (const [key, schema] of Object.entries(schemas)) {
    const parsed = Array.isArray(inputKnowledge?.[key]) ? inputKnowledge[key].map(item => schema.safeParse(item)) : null;
    check(parsed !== null && parsed.every(item => item.success), `Malformed ${key} records.`);
    knowledge[key] = parsed?.filter(item => item.success).map(item => item.data) ?? [];
  }
  if (errors.length || !review || !Array.isArray(graph?.pages)) {
    check(Boolean(review) && Array.isArray(graph?.pages), "Review and graph page records are required.");
    return { passed: false, checks, errors, websiteMediaReady: false };
  }
  const sourceById = new Map(knowledge.sources.map(item => [item.id, item]));
  const observationById = new Map(knowledge.observations.map(item => [item.id, item]));
  const intakeById = new Map(knowledge.intakeItems.map(item => [item.id, item]));
  const inquiryIds = new Set(knowledge.researchInquiries.map(item => item.id));
  const claimIds = new Set(knowledge.claims.map(item => item.id));
  const inventories = {
    sources: [articleId, reelId, inspectionId, screenshotsId],
    observations: Object.keys(observationSources),
    intakeItems: [intakeId], claims: [claimId], researchInquiries: [inquiryId]
  };
  for (const [key, expected] of Object.entries(inventories)) check(exactInventory(knowledge[key].map(item => item.id), expected), `Retain the complete inspected ${key} population; no silent deletion or substitution.`);
  for (const key of Object.keys(schemas)) check(new Set(knowledge[key].map(item => item.id)).size === knowledge[key].length, `Duplicate stable IDs in ${key}.`);
  const urls = knowledge.sources.map(item => item.canonicalUrl).filter(Boolean);
  check(new Set(urls).size === urls.length, "One source record per canonical publication URL.");
  for (const item of knowledge.intakeItems) {
    check(exactInventory(item.projectIds, [project]) && item.visibility === "public-safe" && nonemptyTextList(item.boundaries), "The intake must retain its project and public-safe scope boundaries.");
    check(item.sourceIds.every(id => sourceById.has(id)) && item.researchInquiryIds.every(id => inquiryIds.has(id)), "Intake links must resolve.");
    check(item.observationIds.every(id => observationById.get(id)?.intakeId === item.id), "Intake observations must link back to the same intake.");
  }
  for (const item of knowledge.observations) {
    check(item.project === project && item.intakeId === intakeId && item.sourceId === observationSources[item.id], "Observation project, intake, and source ownership must match the inspected record.");
    check(item.publicSafe === true && nonemptyTextList(item.limitations), "Each public-safe observation must retain its interpretation limits.");
    check(typeof item.locator === "string" && item.locator.trim().length > 0, "Each observation needs a nonempty source anchor, not only a source ID.");
    check(sourceById.has(item.sourceId) && item.comparisonSourceIds.every(id => sourceById.has(id)), "Observation source links must resolve.");
    check([item.sourceId, ...item.comparisonSourceIds].every(id => intakeById.get(item.intakeId)?.sourceIds.includes(id)), "An observation's sources must be registered by its owning intake.");
    check(intakeById.get(item.intakeId)?.observationIds.includes(item.id), "Every observation must have a reciprocal intake link.");
    check(item.claimIds.every(id => claimIds.has(id)) && item.researchInquiryIds.every(id => inquiryIds.has(id)), "Observation claim and inquiry links must resolve.");
  }
  for (const inquiry of knowledge.researchInquiries) {
    check(inquiry.project === project && nonemptyTextList(inquiry.limitations), "The inquiry must retain its project and limitations.");
    check(inquiry.sourceIds.every(id => sourceById.has(id)), "Inquiry sources must resolve.");
  }
  for (const claim of knowledge.claims) {
    check(claim.reviewedAt === review.reviewedAt, "Claim review dates must match this inspection encounter.");
    check(claim.project === project && nonemptyTextList(claim.boundaries) && nonemptyTextList(claim.antiClaims) && nonemptyTextList(claim.reviewedBy), "The credit claim needs its original project, boundaries, anti-claims, and reviewer attribution.");
    check(claim.researchInquiryIds.every(id => inquiryIds.has(id)), "Claim inquiry links must resolve.");
    for (const evidence of claim.evidence) check(evidence.supports.every(key => sourceById.get(evidence.sourceId)?.supportsGenerally.includes(key)), "Claim support keys must exist on the supporting source.");
    check(claim.projections.length > 0 && claim.projections.every(item => item.status === "hold" && item.surfaces.length === 0), "Publication attribution remains an unplaced, held projection.");
  }
  const claim = knowledge.claims.find(item => item.id === claimId);
  check(knowledge.claims.length === 1 && claim?.status === "confirmed-with-boundary", "Retain only the bounded published-credit claim.");
  check(claim?.evidence.some(item => item.sourceId === articleId && item.relationship === "direct-support" && item.supports.includes(creditSupport)), "The article, not account presence, must directly support the animation credit.");
  check(graph.pages.every(page => page.occurrences.every(item => !claimIds.has(item.claimId))), "Held claims must not acquire a public page occurrence.");
  check(knowledge.researchInquiries.some(item => item.id === inquiryId && item.resultStatus === "partially-recovered"), "Keep unresolved production credits and website media use visible.");
  check([review.reviewedAt, review.eventDate, review.article?.publishedAt, review.article?.inspectedAt, review.reel?.publishedAt].every(validIsoDate), "Review and publication dates must be real ISO calendar dates.");
  check(review.eventDate === "2026-08-26" && review.article?.publishedAt === "2026-10-03" && review.reel?.publishedAt === "2026-10-07", "Keep event and separate publication dates distinct.");
  check(review.article?.embedFirstPublishedAt === null && review.article?.inspectedAt === review.reviewedAt && review.reviewedAt >= review.reel?.publishedAt, "An inspected article does not establish an embed's first-publication date.");
  check(sourceById.get(articleId)?.publishedAt === review.article?.publishedAt && sourceById.get(reelId)?.publishedAt === review.reel?.publishedAt, "Source dates must agree with their separate observed metadata.");
  check(review.reel?.id === "DeNAv1HhOxC" && review.reel?.dateBasis === "yt-dlp-upload-date" && review.reel?.durationSeconds === 30, "Retain the inspected reel identity and metadata basis.");
  const inspection = review.inspection;
  check(inspection?.method === "one-frame-per-second-visual-sampling" && Array.isArray(inspection.sampledSecondBins) && inspection.sampledSecondBins.length === 30 && inspection.sampledSecondBins.every((second, index) => second === index), "Visual sampling must cover each one-second bin once without claiming exact frame timestamps or a frame-complete review.");
  check(inspection?.derivativeSha256 === "bc97a92809597e9a02bf72f443456c582ce31c60dbb4537b204ecba9790d530a" && inspection?.bytes === 4363226 && inspection?.width === 1080 && inspection?.height === 1920, "Retain the inspected derivative's exact digest and dimensions.");
  check(inspection?.framesPerSecond === 30 && inspection?.videoCodec === "VP9" && inspection?.audioCodec === "AAC" && inspection?.audioSampleRate === 44100 && inspection?.audioChannels === 2, "Keep the inspected derivative's frame rate and stream metadata.");
  for (const state of ["humanAudioReviewed", "verbatimCertified", "fullSessionReviewed", "widerCoalitionHistoryObserved"]) check(inspection?.[state] === false, `Unsupported inspection transition: ${state}.`);
  check(review.credit?.creditedPerson === "Jamie Burkart" && review.credit?.creditedFor === "NYC Artist Coalition" && review.credit?.role === "photo-animation", "Retain the narrow published animation credit.");
  for (const state of ["photographyEstablished", "audioEditingEstablished", "captionSelectionEstablished"]) check(review.credit?.[state] === false, `Unverified production role: ${state}.`);
  check(review.collaborators?.basis === "user-supplied-screenshot-panel" && review.collaborators?.endorsementEstablished === false && review.collaborators?.attendanceEstablished === false, "Collaborator-panel evidence establishes neither endorsement nor attendance.");
  const accounts = review.collaborators?.accounts;
  check(Array.isArray(accounts) && accounts.length === 6 && new Set(accounts).size === 6 && ["651arts", "nyculture", "bkartscouncil", "lin.tyrpien", "jamieburkart", "nycartc"].every(account => accounts.includes(account)), "Retain only the six displayed collaborator accounts.");
  check(review.institutionalPolicyAdopted === false && review.websiteMediaUse?.authorized === false && review.websiteMediaUse?.displayStatus === "hold", "Discussion and public availability do not authorize policy or media release.");
  check(sourceById.get(articleId)?.canonicalUrl === "https://www.creativenewyork.co/p/i-imagine-a-brooklyn-where" && sourceById.get(reelId)?.canonicalUrl === "https://www.instagram.com/reel/DeNAv1HhOxC/", "Use the exact clean public publication URLs, not download or tracking URLs.");
  check(Boolean(sourceById.get(reelId)?.media), "The reel must retain explicit unresolved media-use metadata.");
  for (const source of knowledge.sources) {
    check(source.accessedAt === review.reviewedAt, "Source access dates must match this inspection encounter.");
    check(nonemptyTextList(source.supportsGenerally) && nonemptyTextList(source.doesNotEstablish), "Every source needs explicit support and scope limits.");
    const protectedId = { [inspectionId]: "RESEARCH-DCLA-ANIMATION-VISUAL-2026-10", [screenshotsId]: "RESEARCH-DCLA-REEL-SCREENSHOTS-2026-10" }[source.id];
    if (protectedId) {
      check(source.kind === "research-run" && source.visibility === "public-metadata-only" && source.preservationStatus === "private" && source.protectedLocatorId === protectedId && !source.canonicalUrl, "Protected inspection and screenshot sources must retain their metadata-only private custody.");
    } else {
      check(source.visibility === "public" && source.preservationStatus === "live" && source.kind === (source.id === articleId ? "published-article" : "institutional-social-post"), "Public publication sources must retain their observed source type and public status.");
    }
    check(!source.assetUrl && !source.archiveUrl, "No media payload or unverified archive is selected for publication.");
    if (source.media) check(source.media.rightsStatus === "permission-needed" && source.media.consentStatus === "review-needed" && source.media.publicDisplayStatus === "hold", "Public video availability is not media reuse clearance.");
  }
  const assertions = [
    ...knowledge.observations.map(item => item.text),
    ...knowledge.claims.flatMap(item => [item.internalClaim, ...item.projections.map(projection => projection.text)]),
    ...knowledge.sources.flatMap(item => [item.publicNote ?? "", ...item.supportsGenerally]),
    ...knowledge.researchInquiries.flatMap(item => [item.publicSummary ?? "", ...item.findings])
  ];
  // These patterns catch known dangerous assertions; they are not a general
  // semantic judge or a substitute for source reading and editorial review.
  const unsupportedAssertions = [
    /\bJamie(?: Burkart)?\s+(?:photographed|took (?:all )?(?:the )?photos|edited (?:the )?audio|selected (?:the )?captions|performed every production role)\b/i,
    /\b(?:DCLA|NYC Cultural Affairs|651 ARTS|Brooklyn Arts Council|all listed institutions|every listed institution)\s+(?:endorsed|approved|commissioned|adopted|enacted)\b/i,
    /\bfirst (?:published|embedded)\s+(?:on\s+)?(?:October 3|2026-10-03)\b/i,
    /\bwider Coalition history\s+(?:is|was)\s+(?:shown|included)\b/i,
    /\b(?:human audio review (?:was )?completed|speech (?:is|was) certified|certified verbatim transcript)\b/i,
    /\b(?:pictured|photographed|depicted) (?:speaker|person)\s+(?:is|was)\s+(?!not\b)[A-Z]/
  ];
  check(assertions.every(text => unsupportedAssertions.every(pattern => !pattern.test(text))), "Positive source or claim prose must not invent roles, endorsement, chronology, history content, or certified audio review.");
  check(!/(?:\/Users\/|\/Volumes\/|\/private\/|\/tmp\/|file:\/\/|https?:[^\s"<>]*(?:[?&](?:signature|token|cplk|expires)=)|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(JSON.stringify({ review, knowledge: inputKnowledge })), "Keep private locators, signed URLs, tracking tokens, and contact addresses out of the public record, including fields omitted by schema parsing.");
  return { passed: errors.length === 0, checks, errors, websiteMediaReady: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = evaluateDclaPublication();
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.passed ? 0 : 1;
}
