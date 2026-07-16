import { createHash } from "node:crypto";

function sha256(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function validSha(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function validateCheckpoints(errors, label, pass) {
  if (!Array.isArray(pass.checkpoints) || !pass.checkpoints.length) {
    errors.push(`${label} has no acquisition checkpoints`);
    return;
  }
  let priorStep = -1;
  let priorCount = -1;
  for (const checkpoint of pass.checkpoints) {
    if (!Number.isInteger(checkpoint.step) || checkpoint.step <= priorStep) errors.push(`${label} checkpoint steps are not strictly increasing`);
    if (!Number.isInteger(checkpoint.cumulativeUniqueRecords) || checkpoint.cumulativeUniqueRecords < priorCount) errors.push(`${label} checkpoint counts are not cumulative`);
    if (checkpoint.cumulativeUniqueRecords > pass.uniqueMessageRecords) errors.push(`${label} checkpoint exceeds its unique-record denominator`);
    priorStep = checkpoint.step;
    priorCount = checkpoint.cumulativeUniqueRecords;
  }
  if (priorStep !== pass.steps) errors.push(`${label} final checkpoint does not match traversal steps`);
  if (priorCount !== pass.uniqueMessageRecords) errors.push(`${label} final checkpoint does not reconcile its unique records`);
}

export function validateWowListFacebookAcquisition(manifest, fixture) {
  const errors = [];
  const population = fixture.populationReconciliation;
  const audit = fixture.livePublisherAudit;
  const live = manifest.liveBidirectionalControl;
  const publicIds = fixture.records.map(({ postId }) => postId).sort();

  if (manifest.schemaVersion !== 1) errors.push("WOW List Facebook acquisition manifest schema version is not 1");
  if (manifest.corpusId !== fixture.corpusId) errors.push("WOW List Facebook acquisition manifest targets a different corpus");
  for (const digest of [
    manifest.protectedOwnerCapture.artifactFileSha256,
    manifest.protectedOwnerCapture.recordSetSha256,
    manifest.publicCensus.recordIdSetSha256,
    live.artifactFileSha256,
    live.normalizedMessageSetSha256,
    manifest.publisherAudit.artifactFileSha256,
    manifest.publisherAudit.recordSetSha256,
  ]) if (!validSha(digest)) errors.push("WOW List Facebook acquisition manifest contains an invalid SHA-256 digest");

  if (manifest.protectedOwnerCapture.pageCount !== population.protectedCapturePageCount) errors.push("Protected owner-capture page count drifted from the census");
  if (manifest.protectedOwnerCapture.terminal !== population.protectedCaptureTerminal) errors.push("Protected owner-capture terminal state drifted from the census");
  if (manifest.protectedOwnerCapture.uniqueRecordCount !== population.protectedCaptureUniqueRecordCount) errors.push("Protected owner-capture denominator drifted from the census");
  if (manifest.protectedOwnerCapture.recordSetSha256 !== population.protectedRecordSetSha256) errors.push("Protected owner-capture record-set digest drifted from the census");
  if (manifest.publicCensus.recordCount !== fixture.records.length || manifest.publicCensus.recordCount !== population.publicCensusRecordCount) errors.push("Public census record count does not reconcile");
  if (manifest.publicCensus.recordsReviewedPercent !== 100 || manifest.publicCensus.recordCount !== manifest.protectedOwnerCapture.uniqueRecordCount) errors.push("Recovered-population review is not complete");
  if (manifest.publicCensus.recordIdSetSha256 !== sha256(publicIds)) errors.push("Public census record-ID set digest does not reproduce");

  validateCheckpoints(errors, "WOW List Facebook forward control", live.forward);
  validateCheckpoints(errors, "WOW List Facebook reverse control", live.reverse);
  if (live.terminalNoGrowthChecks < 10) errors.push("Live control has fewer than ten terminal no-growth checks");
  if (live.forward.uniqueMessageRecords !== live.reverse.uniqueMessageRecords || live.exactMessageAgreement !== live.forward.uniqueMessageRecords) errors.push("Live forward and reverse controls do not reconcile exactly");
  if (live.forward.uniqueMessageRecords + fixture.records.filter(({ relationship }) => relationship === "media-or-link-without-message").length !== fixture.records.length) errors.push("Live message control and no-message dispositions do not reconcile the recovered population");

  if (manifest.publisherAudit.recordSetSha256 !== audit.protectedAuditSetSha256) errors.push("Publisher-audit record-set digest drifted from the census");
  if (manifest.publisherAudit.reviewedRecordCount !== audit.reviewedRecordCount || manifest.publisherAudit.reviewedRecordCount !== fixture.records.length) errors.push("Publisher audit does not cover the recovered population");
  if (manifest.publisherAudit.jamieAttributed !== audit.jamieAttributedPostCount || manifest.publisherAudit.otherPublisherAttributed !== audit.otherPublisherAttributedPostCount || manifest.publisherAudit.unresolved !== audit.attributionNotRecoveredCount) errors.push("Publisher-audit attribution counts drifted from the census");
  if (manifest.publisherAudit.jamieAttributed + manifest.publisherAudit.otherPublisherAttributed + manifest.publisherAudit.unresolved !== manifest.publisherAudit.reviewedRecordCount) errors.push("Publisher-audit dispositions do not reconcile");

  if (manifest.attestation.reviewAuthority !== "jamie-approved" || manifest.attestation.protectedInputsPublished !== false) errors.push("Acquisition attestation lacks the required public-use boundary");
  if (!manifest.attestation.limitations.some((item) => /not a native Meta export/i.test(item))) errors.push("Acquisition attestation omits the native-export boundary");
  return errors;
}
