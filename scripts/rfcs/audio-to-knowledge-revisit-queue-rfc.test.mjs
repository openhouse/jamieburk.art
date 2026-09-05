import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");

test("RFC 0013 governs historical discovery and queue disposition without exposing private items", () => {
  const contract = JSON.parse(
    readFileSync(
      path.join(repoRoot, "rfcs/0013-governed-audio-to-knowledge-workflow.contract.json"),
      "utf8"
    )
  );
  const rfc = readFileSync(
    path.join(repoRoot, "rfcs/0013-governed-audio-to-knowledge-workflow.md"),
    "utf8"
  );

  assert.equal(contract.revisit_queue?.body_free, true);
  assert.equal(contract.revisit_queue?.every_candidate_requires_disposition, true);
  assert.equal(contract.revisit_queue?.current_method_controls_are_not_backlog, true);
  assert.equal(contract.revisit_queue?.participant_holds_are_not_actionable, true);
  assert.equal(contract.revisit_queue?.priority_is_not_processing_authority, true);
  assert.equal(contract.revisit_queue?.private_item_counts_may_be_public, false);
  assert.deepEqual(contract.revisit_queue?.required_candidate_fields, [
    "source_ids",
    "current_state",
    "audio_state",
    "transcript_state",
    "method_version",
    "method_gaps",
    "dependencies",
    "evidence_basis",
    "disposition",
    "priority",
    "revisit_trigger",
    "next_safe_action"
  ]);
  assert.equal(contract.cloud_recovery?.authenticated_read_only_fallback, true);
  assert.equal(contract.cloud_recovery?.web_listing_is_preservation, false);
  assert.equal(contract.cloud_recovery?.confirmed_empty_is_materialization_failure, false);
  assert.equal(contract.cloud_recovery?.download_requires_private_custody_and_sha256, true);
  assert.equal(contract.cloud_recovery?.download_timeout_may_be_called_recovered, false);
  assert.equal(
    contract.cloud_recovery?.technical_media_validation_establishes_transcription_complete,
    false
  );
  assert.ok(contract.cloud_recovery?.state_terms.includes("technically-readable"));
  assert.equal(contract.cloud_recovery?.cloud_mutation_allowed, false);
  assert.match(rfc, /^### Historical discovery and revisit queue$/m);
  assert.match(rfc, /^### Authenticated cloud recovery$/m);
  assert.match(rfc, /A cloud listing is not preservation\./);
  assert.match(rfc, /Technical readability does not establish transcription completion/);
  assert.match(rfc, /Priority is sequencing metadata, not processing authority\./);
});
