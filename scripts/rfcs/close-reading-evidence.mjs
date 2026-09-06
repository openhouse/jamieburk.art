// Referential evidence checks, not a semantic judge or a source-access grant.
// A private adapter must independently bind this packet to its custody receipts.
export const TASK_STATES = new Set([
  "accepted-open", "sent-and-acknowledged-later", "requested-acknowledged",
  "shared-request-owner-unconfirmed", "welcomed-coordinated-scope", "held",
  "conditional", "proposed", "tentative-intention", "stated-offer",
  "self-reported-plan", "not-decided"
]);
const CLAIM_KINDS = new Set(["direct-evidence", "attributed-report", "interpretation", "inference", "contradiction", "open-question"]);
const list = value => Array.isArray(value) ? value : [];
const text = value => typeof value === "string" && value.trim().length > 0;
const digest = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);

export function validateCloseReadingEvidence(packet) {
  if (!packet || typeof packet !== "object") return ["reading-evidence-missing"];
  const failures = [];
  if (packet.schema_version !== 1) failures.push("reading-evidence-version-invalid");
  for (const field of ["coverage", "observations", "commitments", "later_sources"]) {
    if (!Array.isArray(packet[field])) failures.push("reading-evidence-shape-invalid:" + field);
  }
  const edition = packet.edition ?? {};
  if (!text(edition.artifact_id) || !digest(edition.sha256) || packet.reviewed_sha256 !== edition.sha256) {
    failures.push("reading-source-revision-mismatch");
  }
  const custody = packet.custody ?? {};
  if (custody.artifact_id !== edition.artifact_id || !text(custody.request_id) ||
      custody.scope !== "private-close-reading" || custody.decision !== "authorized" ||
      custody.restriction !== "clear-for-this-scope") failures.push("reading-custody-scope-invalid");

  const turns = new Map();
  if (!list(edition.turns).length) failures.push("reading-turn-inventory-missing");
  for (const turn of list(edition.turns)) {
    if (!turn || !text(turn.id) || !text(turn.speaker_id) || turns.has(turn.id)) {
      failures.push("reading-turn-id-invalid");
    } else turns.set(turn.id, turn);
  }
  const covered = new Set();
  for (const row of list(packet.coverage)) {
    if (!row || !turns.has(row.turn_id) || covered.has(row.turn_id)) {
      failures.push("reading-coverage-reference-invalid"); continue;
    }
    covered.add(row.turn_id);
    if (row.disposition !== "read") failures.push("reading-turn-not-read:" + row.turn_id);
  }
  for (const id of turns.keys()) if (!covered.has(id)) failures.push("reading-turn-uncovered:" + id);

  const validRefs = refs => list(refs).length > 0 && new Set(refs).size === refs.length && refs.every(id => turns.has(id));
  const observationIds = new Set(), returnedPeople = new Set();
  for (const observation of list(packet.observations)) {
    const o = observation ?? {};
    if (!text(o.id) || observationIds.has(o.id)) failures.push("reading-observation-id-invalid");
    observationIds.add(o.id);
    if (!text(o.text) || !CLAIM_KINDS.has(o.kind)) failures.push("reading-observation-content:" + o.id);
    if (o.authorship !== "editorial") failures.push("reading-authorship:" + o.id);
    if (!validRefs(o.turn_ids)) failures.push("reading-observation-citation:" + o.id);
    if (!text(o.person_id) || list(o.turn_ids).some(id => turns.get(id)?.speaker_id !== o.person_id)) {
      failures.push("reading-observation-attribution:" + o.id);
    } else if (validRefs(o.turn_ids) && text(o.text)) returnedPeople.add(o.person_id);
  }
  for (const person of new Set([...turns.values()].map(turn => turn.speaker_id))) {
    if (!returnedPeople.has(person)) failures.push("reading-person-return-missing:" + person);
  }

  const laterSources = new Map();
  for (const source of list(packet.later_sources)) {
    if (!source || !text(source.id) || !digest(source.sha256) || laterSources.has(source.id)) {
      failures.push("reading-later-source-invalid");
    } else laterSources.set(source.id, source);
  }
  const taskIds = new Set();
  for (const task of list(packet.commitments)) {
    const t = task ?? {};
    if (!text(t.id) || taskIds.has(t.id)) failures.push("reading-task-id-invalid");
    taskIds.add(t.id);
    if (!TASK_STATES.has(t.state)) failures.push("reading-task-state:" + t.id);
    if (!validRefs(t.turn_ids)) failures.push("reading-task-citation:" + t.id);
    const accepted = t.state === "accepted-open" || t.state === "sent-and-acknowledged-later";
    if (accepted && (!text(t.owner) || !validRefs(t.acceptance_turn_ids) ||
        list(t.acceptance_turn_ids).some(id => !list(t.turn_ids).includes(id) || turns.get(id)?.speaker_id !== t.owner))) {
      failures.push("reading-acceptance:" + t.id);
    }
    if (!accepted && list(t.acceptance_turn_ids).length) failures.push("reading-unaccepted-work-promoted:" + t.id);
    if (new Set(list(t.requester_candidates)).size > 1 && t.requester !== null) failures.push("reading-requester-conflict:" + t.id);
    if (t.state === "sent-and-acknowledged-later" && (!list(t.later_source_ids).length ||
        t.later_source_ids.some(id => !laterSources.has(id)))) failures.push("reading-later-evidence:" + t.id);
  }
  return [...new Set(failures)];
}
