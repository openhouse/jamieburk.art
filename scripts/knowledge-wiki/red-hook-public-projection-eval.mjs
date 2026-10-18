import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { redHookKnowledge, redHookReview } from "../../apps/www/src/data/knowledge-bank/red-hook-2026-10.ts";

const pageUrl = new URL("../../apps/www/src/app/work/technical-operations/page.tsx", import.meta.url);
const audioId = "CLM-RED-HOOK-SEVEN-ORAL-HISTORIES";
const exhibitionId = "CLM-RED-HOOK-EXHIBITION-QR-SUPPORT";
const photoId = "CLM-RED-HOOK-PHOTO-AUTHORSHIP";
const surface = "/work/technical-operations";

export function loadRedHookCandidate() {
  const page = fs.readFileSync(pageUrl, "utf8");
  const pageSection = page.match(/<section\b[^>]*\bid="red-hook"[\s\S]*?<\/section>/)?.[0] ?? "";
  return { review: redHookReview, knowledge: redHookKnowledge, pageSection };
}

// These gates are specific to the retained confirmation and text-only release.
// Fresh evidence requires deliberate review; a score cannot clear a failed gate.
export function evaluateRedHookProjection({ review, knowledge, pageSection }) {
  const errors = [];
  let checks = 0;
  const check = (pass, code, message) => { checks++; if (!pass) errors.push({ code, message }); };
  const projectionFor = id => knowledge.claims.find(claim => claim.id === id)?.projections.find(projection => projection.key === "technical-operations");
  const audio = projectionFor(audioId);
  const exhibition = projectionFor(exhibitionId);
  const active = knowledge.claims.flatMap(claim => claim.projections.filter(projection => projection.status === "active"));
  check(review.audioRecordingCount === 7 && /\b(?:seven|7) oral-history recordings\b/i.test(audio?.text ?? "") && !/\b(?:50|fifty)\b/i.test(audio?.text ?? ""), "audio-scope", "Keep seven edited recordings distinct from the 50-portrait exhibition.");
  check(/\brecordings to accompany painted portraits\b/i.test(audio?.text ?? "") && !/\beach accompanied\b/i.test(audio?.text ?? ""), "intended-use", "Describe the recordings' intended use without inferring verified exhibition playback.");
  check(review.exhibitionPortraitCount === 50 && /\b(?:50|fifty) portraits\b/i.test(exhibition?.text ?? ""), "exhibition-scope", "The 50 count describes exhibited portraits.");
  check(review.creditScope === "contributor" && /\bhelped\b/.test(exhibition?.text ?? "") && !/\b(?:alone|sole|single-handed|entire exhibition|every label)\b/i.test(active.map(item => item.text).join(" ")), "shared-credit", "Keep assistance distinct from sole production responsibility.");
  check(review.evidenceClass === "first-person-contribution-confirmation" && review.supportLevel === "self-reported", "evidence-class", "Self-report is not an independently audited outcome.");
  check(review.playbackVerified === false && !/\b(?:verified|guaranteed|every QR code|correct recording|audience impact|engagement increased)\b/i.test(active.map(item => item.text).join(" ")), "unverified-outcome", "Do not infer playback results or audience outcomes.");
  check(active.length === 2 && active.every(item => item.surfaces.length === 1 && item.surfaces[0] === surface), "projection-scope", "Only the selected two text claims belong on this surface.");
  for (const id of [audioId, exhibitionId]) {
    const claim = knowledge.claims.find(item => item.id === id);
    check(claim?.status === "confirmed-with-boundary" && claim.boundaries.length > 0 && claim.evidence.some(item => item.relationship === "direct-support" && item.confidence === "moderate"), "claim-support", "Retain bounded direct first-person support for each contribution.");
    check(knowledge.observations.some(item => item.claimIds.includes(id) && knowledge.sources.some(source => source.id === item.sourceId)), "observation-link", "Each public claim needs its source-linked observation.");
    check(knowledge.agencyRelations.some(item =>
      item.claimIds.includes(id) && item.actorIds.length === 1 && item.actorIds[0] === "ENT-JAMIE-BURKART" &&
      item.action === (id === audioId ? "edited" : "helped-produce") && item.creditScope === "shared" &&
      knowledge.entities.some(entity => entity.id === item.objectId && entity.publicSafe) &&
      item.sourceIds.length > 0 && item.sourceSupportKeys.length > 0 &&
      item.sourceIds.every(sourceId => claim?.evidence.some(evidence => evidence.sourceId === sourceId)) &&
      item.sourceSupportKeys.every(support => item.sourceIds.some(sourceId => knowledge.sources.some(source => source.id === sourceId && source.supportsGenerally.includes(support))))
    ), "agency", "Keep Jamie's actual action, collaborative credit and source support explicit.");
  }
  const photos = review.photos;
  check(photos.photographer === "Jamie Burkart" && photos.authorshipConfirmed === true, "photo-authorship", "Retain Jamie's confirmed photography authorship.");
  check(photos.artworkUseCleared === false && photos.representedPeopleUseCleared === false && photos.publicationAuthorized === false && photos.publicDisplayStatus === "hold", "photo-clearance", "Photographer identity and staging authorization do not clear depicted material.");
  const photoProjection = knowledge.claims.find(item => item.id === photoId)?.projections[0];
  check(photoProjection?.status === "hold" && photoProjection.surfaces.length === 0, "photo-publication", "Photo credit remains held until an image-use decision is made.");
  const serialized = JSON.stringify(knowledge);
  check(!/(?:\/Users\/|\/Volumes\/|\/private\/|\/tmp\/|file:\/\/|protectedLocatorId|signedUrl|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(serialized), "private-locator", "Public records must contain no confidential locators or source bodies.");
  check(knowledge.sources.every(source => !source.canonicalUrl && !source.archiveUrl && !source.assetUrl), "private-locator", "This first-person confirmation exposes no underlying source locator.");
  check(Boolean(pageSection), "page-section", "The selected public text section must exist.");
  const tags = [...pageSection.matchAll(/<([A-Za-z][\w.]*)\b/g)].map(match => match[1]);
  check(tags.every(tag => ["section", "h2", "div", "p", "Claim"].includes(tag)) && !/\b(?:src|srcSet|poster)\s*=|background(?:Image)?\s*[:=]/i.test(pageSection), "photo-publication", "The text-only section cannot embed image assets or unreviewed components.");
  const references = [...pageSection.matchAll(/<Claim\b[^>]*claimId="([^"]+)"[^>]*>/g)].map(match => match[1]);
  check(references.length === 2 && [audioId, exhibitionId].every(id => references.includes(id)), "claim-rendering", "Render both bounded claims from the canonical bank.");
  check(!/\b(?:held pending|photo publication|clearance|TODO|private source|approval required|internal review)\b/i.test(pageSection), "visitor-copy", "Keep internal review instructions out of the visitor's story.");
  return { passed: errors.length === 0, checks, errors, imagesPublished: false, contributionBasis: "first-person-confirmation" };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = evaluateRedHookProjection(loadRedHookCandidate());
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.passed ? 0 : 1;
}
