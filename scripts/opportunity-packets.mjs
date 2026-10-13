import { createHash } from 'node:crypto';

// One method for every admitted job. These are preparation stages, not authority
// to contact anyone, make attestations, publish, or submit an application.
export const METHOD = 'oti-evidence-first-v1';
export const STAGES = Object.freeze([
  'official-posting-and-form', 'eligibility-and-evidence', 'current-writer-voice',
  'tailored-markdown', 'deterministic-preflight', 'fictional-reader-review',
  'bounded-revision-and-retest', 'native-google-docs', 'pdf-export-and-all-page-review',
  'field-guide-and-human-handoff',
]);
export const hash = value => createHash('sha256').update(value).digest('hex');
const stable = value => JSON.stringify(value, Object.keys(value).sort());
const key = item => item.packet_key || (item.employer && (item.job_id || item.requisition)
  ? `${item.employer.toLowerCase()}:${item.job_id || item.requisition}` : item.id);

export function admitOpportunities(records, previous = []) {
  const grouped = new Map();
  for (const record of records) {
    if (!record.id || !record.source_path || !record.source_hash) throw new Error('Opportunity requires identity and source provenance');
    const id = key(record);
    const list = grouped.get(id) || [];
    list.push(record); grouped.set(id, list);
  }
  const packets = [...grouped].map(([id, unsorted]) => {
    const records = unsorted.sort((a, b) => a.source_path.localeCompare(b.source_path));
    const sources = [...new Map(records.map(r => [r.source_path, { path: r.source_path, sha256: r.source_hash }])).values()];
    const isJob = records.some(r => r.opportunity_type === 'job');
    const closed = records.some(r => [r.status, r.opportunity_status, r.source_review?.application_status]
      .some(status => ['expired', 'closed', 'withdrawn'].includes(status)));
    const failed = records.some(r => r.eligibility === 'failed');
    const active = records.some(r => ['submitted', 'interviewing', 'offer', 'active-candidacy'].includes(r.application_state || r.status));
    const suspended = active ? 'maintain-existing-candidacy' : closed ? 'retain-history' : failed ? 'resolve-eligibility' : !isJob ? 'classify-opportunity' : null;
    return {
      id, title: records[0].title || id, method: METHOD, sources,
      source_hash: hash(JSON.stringify(sources)),
      required_stages: isJob ? [...STAGES] : ['classify-opportunity'],
      suspended, next_action: suspended || STAGES[0], ready: false,
      submission_authorized: false, publication_authorized: false,
    };
  });
  for (const old of previous) {
    if (!grouped.has(old.id)) packets.push({ ...old, suspended: 'source-missing-review', next_action: 'source-missing-review', ready: false });
  }
  return packets.sort((a, b) => a.id.localeCompare(b.id));
}

export function packetState(packet, receipt = {}) {
  if (packet.suspended) return { ...packet, next_action: packet.suspended, ready: false };
  const context = receipt.context || {};
  const expected = { ...context, source_hash: packet.source_hash, method: packet.method };
  const contextValid = /^[a-f0-9]{64}$/.test(context.artifact_hash || '') &&
    /^[a-f0-9]{64}$/.test(context.policy_hash || '') && Boolean(context.voice_version);
  const stages = packet.required_stages.map(id => {
    const r = receipt.stages?.[id];
    const valid = contextValid && r?.status === 'passed' && r.evidence?.length > 0 &&
      r.evidence.every(e => typeof e === 'string' && e.length > 0) &&
      stable(r.binding || {}) === stable(expected);
    return { id, status: valid ? 'passed' : 'pending', reason: valid ? null : r?.reason || 'Fresh candidate-bound evidence required' };
  });
  const next = stages.find(s => s.status !== 'passed');
  return { ...packet, stages, next_action: next?.id || 'jamie-review-and-submission-choice', ready: !next };
}
