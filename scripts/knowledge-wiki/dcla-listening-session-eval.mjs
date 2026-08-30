import { pathToFileURL } from "node:url";
import { dclaListeningSession, dclaReview } from "../../apps/www/src/data/knowledge-bank/dcla-listening-session-2026-08.ts";

// This gate validates this intake's evidence limits; it does not grade the speaker,
// certify the unavailable transcript, or replace later publication/placement review.
export function evaluateDclaIntake({ review, knowledge }) {
  const errors = [];
  let checks = 0;
  const check = (condition, message) => { checks++; if (!condition) errors.push(message); };
  check(review.eventDate === "2026-08-26", "Keep the correct session date.");
  check(review.correspondence.uniqueExchanges === 1 && review.correspondence.pastedCopies === 3, "Deduplicate repeated correspondence.");
  for (const state of ["membershipCompleted", "animationDelivered", "commissionAccepted", "endorsementEstablished", "enactmentEstablished", "publicationAuthorized"]) {
    check(review.correspondence[state] === false, `Unsupported correspondence transition: ${state}.`);
  }
  check(review.transcript.edition === "audio-compared-repaired", "Do not substitute an older transcript repair.");
  for (const state of ["fullTextReviewed", "localBytesVerified", "humanAudioReviewed", "verbatimCertified", "publicationAuthorized"]) {
    check(review.transcript[state] === false, `New transcript evidence and a revised review are required for ${state}.`);
  }
  check(review.transcript.verificationReceipt === null, "Do not fabricate a transcript custody receipt.");
  check(review.transcript.reportedAudioComparedTurns + review.transcript.reportedRetainedSourceTurns === review.transcript.reportedTurnCount, "Reported edition counts must reconcile.");
  check(knowledge.claims.length === 0, "This incomplete reading must not promote public claims.");
  check(knowledge.observations.every(observation => observation.claimIds.length === 0), "Intake observations must not silently attach to public claims.");
  check(knowledge.researchInquiries.some(inquiry => inquiry.id === "INQ-DCLA-FULL-REPAIRED-READING" && inquiry.resultStatus === "partially-recovered"), "Keep the unfinished full-reading inquiry.");
  check(knowledge.researchInquiries.some(inquiry => inquiry.id === "INQ-DCLA-PORTRAIT-CATALOG-ASSOCIATION" && inquiry.resultStatus === "partially-recovered"), "Keep the unfinished catalog association inquiry.");
  check(knowledge.intakeItems.filter(item => item.disposition === "duplicate").length === 2, "Give both repeated pastes an explicit duplicate disposition.");
  check(knowledge.intakeItems.filter(item => item.id.startsWith("INTAKE-DCLA-FOLLOWUP-")).every(item => item.kind === "analysis-note"), "Interest-and-plans summaries are not governed collaborator testimony.");
  check(review.photos.length === 2, "Retain both cleared portrait candidates.");
  for (const photo of review.photos) {
    const source = knowledge.sources.find(source => source.id === photo.sourceId);
    check(/^[a-f0-9]{64}$/.test(photo.sha256) && photo.bytes > 0, "Each supplied portrait needs an exact-byte reference.");
    check(photo.portfolioPermission === true && photo.destination === "portfolio" && Boolean(photo.permissionBasis), "Preserve the granted portfolio permission without expanding its scope.");
    check(photo.applePhotosBindingVerified === false, "Do not claim an unperformed Apple Photos join.");
    check(photo.credit === "Photo courtesy of NYC Artist Coalition.", "Use the project courtesy credit while authorship is unverified.");
    check(source?.media?.rightsStatus === "cleared" && source?.media?.consentStatus === "cleared", "Source media must retain Jamie's clearance.");
    check(source?.media?.publicDisplayStatus === "metadata-only" && !source?.media?.photographer, "Do not invent authorship or imply a completed placement.");
  }
  for (const source of knowledge.sources) {
    check(source.visibility !== "public" && !source.canonicalUrl && !source.archiveUrl && !source.assetUrl, "No underlying private source URL may be published.");
  }
  const serialized = JSON.stringify({ review, knowledge });
  check(!/(?:\/Users\/|\/Volumes\/|\/private\/|\/tmp\/|file:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(serialized), "Keep private locators and contact addresses out of the graph.");
  return { passed: errors.length === 0, checks, errors, fullTranscriptReviewed: review.transcript.fullTextReviewed, publicationReady: false };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = evaluateDclaIntake({ review: dclaReview, knowledge: dclaListeningSession });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.passed ? 0 : 1;
}
