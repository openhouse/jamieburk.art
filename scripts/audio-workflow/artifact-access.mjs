// Restrictions belong to evidenced targets, not to a shared event title.
// This gate permits only reading an existing private artifact. It grants no
// recording, provider transfer, publication, or participant-speaking authority.
export function evaluateArtifactReading(input, observedSha256) {
  const failures = [];
  const text = x => typeof x === 'string' && x.trim().length > 0;
  const digest = x => typeof x === 'string' && /^[a-f0-9]{64}$/.test(x);
  const a = input?.artifact;
  const grant = input?.authorization;
  if (!a || !['id', 'event_id', 'provenance'].every(k=>text(a[k])) || !digest(a?.sha256)) failures.push('artifact-provenance-required');
  if (!digest(observedSha256) || observedSha256 !== a?.sha256) failures.push('observed-source-binding-required');
  if (!grant || grant.artifact_id !== a?.id || grant.sha256 !== a?.sha256 ||
      grant.scope !== 'private-existing-artifact-reading' || !text(grant.source_ref)) failures.push('bounded-reading-authorization-required');
  if (input?.publication_authorized !== false) failures.push('private-only-required');
  if (!Array.isArray(input?.restrictions)) failures.push('restriction-inventory-required');
  const seen = new Set();
  for (const r of Array.isArray(input?.restrictions) ? input.restrictions : []) {
    if (!r || !['id','target_id','source_ref'].every(k=>text(r[k])) || !['artifact','event'].includes(r.scope) || seen.has(r.id)) {
      failures.push('restriction-scope-or-evidence-unresolved'); continue;
    }
    seen.add(r.id);
    if ((r.scope === 'artifact' && r.target_id === a?.id) || (r.scope === 'event' && r.target_id === a?.event_id)) failures.push('applicable-restriction-controls');
  }
  return { allowed: failures.length === 0, hard_failures: [...new Set(failures)], publication_authorized: false, external_transfer_authorized: false };
}
