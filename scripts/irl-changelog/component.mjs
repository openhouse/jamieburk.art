// RFC 0016: pure, private-by-default component. No storage, network or authority.
import { canonical, digest, validateJournal } from './journal.mjs';

const requireThat = (value, reason) => { if (!value) throw new Error(reason); };
const text = value => typeof value === 'string' && value.trim().length > 0;
const hash = value => /^[a-f0-9]{64}$/.test(value ?? '');
const uuid = value => /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value ?? '');
const day = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const instant = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value.replace(/(?<!\.\d{3})Z$/, '.000Z');
const at = value => Date.parse(value);
const key = s => `${s.id}@${s.revision_id}`;
const classes = ['primary-record', 'attributed-report', 'derived-analysis', 'user-instruction'];
const types = ['person', 'team', 'project', 'practice', 'claim', 'decision', 'commitment'];
const targets = { about: types.slice(0, 4), informs: types.slice(4) };
const revisions = { updates: 'development', corrects: 'correction', challenges: 'challenge' };
const citationFields = ['id', 'revision_id', 'sha256', 'locator', 'evidence_class', 'issued_on', 'captured_at', 'custody', 'transformation_limit'];
const rank = { recorded: 0, updated: 1, corrected: 2, contested: 3, stale: 4, withheld: 5 };
const stronger = (a, b) => rank[a] >= rank[b] ? a : b;

function validateRegistry(registry) {
  requireThat(registry?.schema_version === 2 && uuid(registry.namespace), 'invalid registry schema');
  requireThat(registry.visibility === 'private' && text(registry.coverage), 'invalid registry boundary');
  requireThat(Array.isArray(registry.nodes) && Array.isArray(registry.sources), 'invalid registry collections');
  const nodes = new Map(); const sources = new Map();
  for (const node of registry.nodes) {
    requireThat(text(node.id) && !nodes.has(node.id) && types.includes(node.type) && text(node.title) && node.visibility === 'private', 'invalid node registry');
    requireThat(node.depends_on === undefined || (Array.isArray(node.depends_on) && new Set(node.depends_on).size === node.depends_on.length), 'invalid node dependencies');
    nodes.set(node.id, node);
  }
  for (const node of registry.nodes) for (const target of node.depends_on ?? []) requireThat(nodes.has(target) && node.id !== target, 'invalid node dependency target');
  for (const source of registry.sources) {
    requireThat(citationFields.every(field => text(source[field])) && !source.id.includes('@') && !source.revision_id.includes('@') && !sources.has(key(source)), 'invalid source identity');
    requireThat(hash(source.sha256) && classes.includes(source.evidence_class) && day(source.issued_on) && instant(source.captured_at) && source.issued_on <= source.captured_at.slice(0, 10), 'invalid source revision');
    requireThat(['current', 'changed', 'unavailable', 'withdrawn'].includes(source.state), 'invalid source state');
    sources.set(key(source), source);
  }
  return { nodes, sources };
}

// Review receipts attest a payload, not their own bytes. They are declarations;
// identifying/authorizing the real human is the permissioned adapter's duty.
export function reviewFingerprint(entry) {
  const { review_receipt, ...payload } = entry;
  return digest(canonical(payload));
}

function validateEntry(entry, registry, maps, prior, aliases) {
  requireThat(entry?.schema_version === 2, 'unsupported entry schema');
  const fields = ['schema_version', 'namespace', 'id', 'legacy_aliases', 'title', 'before', 'change', 'significance', 'working_implication', 'boundary', 'kind', 'event_start', 'event_end', 'event_precision', 'event_basis', 'evidence_as_of', 'recorded_at', 'learned_at', 'learning_basis', 'interpreter', 'recording_agent', 'representation', 'participant_authored', 'visibility', 'review_state', 'review_receipt', 'citations', 'relations', 'activates_work', 'publication_authorized'];
  requireThat(Object.keys(entry).every(field => fields.includes(field)), 'unknown entry field');
  const prefix = `irl:${registry.namespace}:`;
  requireThat(entry.namespace === registry.namespace && entry.id?.startsWith(prefix) && uuid(entry.id.slice(prefix.length)), 'invalid entry identity');
  requireThat(!prior.has(entry.id), 'entry identity conflict');
  requireThat(Array.isArray(entry.legacy_aliases) && entry.legacy_aliases.every(alias => /^IRL-\d{4,}$/.test(alias) && !aliases.has(alias)) && new Set(entry.legacy_aliases).size === entry.legacy_aliases.length, 'invalid legacy alias');
  entry.legacy_aliases.forEach(alias => aliases.add(alias));
  requireThat(['title', 'before', 'change', 'significance', 'working_implication', 'boundary', 'interpreter', 'recording_agent'].every(field => text(entry[field])), 'missing account or perspective');
  requireThat(['development', 'evidence-return', 'interpretation', 'correction', 'challenge'].includes(entry.kind), 'invalid entry kind');
  requireThat(entry.visibility === 'private' && entry.activates_work === false && entry.publication_authorized === false && entry.participant_authored === false && entry.representation === 'analysis', 'authority promotion or unsafe representation');
  requireThat(instant(entry.recorded_at) && day(entry.evidence_as_of) && entry.evidence_as_of <= entry.recorded_at.slice(0, 10), 'invalid recording or evidence date');
  const previous = [...prior.values()].at(-1);
  requireThat(!previous || at(previous.recorded_at) <= at(entry.recorded_at), 'backdated recording time');
  if (entry.event_precision === 'unknown') requireThat(entry.event_start === null && entry.event_end === null, 'unknown event must have null interval');
  else requireThat(['exact', 'bounded-approximate'].includes(entry.event_precision) && day(entry.event_start) && day(entry.event_end) && entry.event_start <= entry.event_end && entry.event_end <= entry.evidence_as_of, 'invalid event interval');
  requireThat(text(entry.event_basis), 'event precision requires basis');
  requireThat(Array.isArray(entry.citations) && entry.citations.length > 0, 'missing citation');
  for (const citation of entry.citations) {
    const source = maps.sources.get(key(citation));
    requireThat(source && citationFields.every(field => citation[field] === source[field]), 'unbound citation revision or custody');
    requireThat(source.issued_on <= entry.evidence_as_of && at(source.captured_at) <= at(entry.recorded_at), 'citation availability after recording');
  }
  if (entry.learned_at === null) requireThat(entry.learning_basis === null, 'unknown learning time requires null basis');
  else requireThat(instant(entry.learned_at) && at(entry.learned_at) <= at(entry.recorded_at) && text(entry.learning_basis?.perspective) && text(entry.learning_basis?.basis) && entry.citations.some(c => canonical(c) === canonical(entry.learning_basis.citation)), 'unbound learning time or perspective');
  requireThat(Array.isArray(entry.relations) && entry.relations.some(r => r.type === 'about'), 'missing about relation');
  const seen = new Set();
  for (const relation of entry.relations) {
    const identity = `${relation.type}:${relation.target_id}`;
    requireThat(!seen.has(identity), 'duplicate relation'); seen.add(identity);
    if (Object.hasOwn(targets, relation.type)) requireThat(targets[relation.type].includes(maps.nodes.get(relation.target_id)?.type), 'missing or wrong typed relation target');
    else {
      requireThat(Object.hasOwn(revisions, relation.type), 'unknown relation');
      requireThat(entry.kind === revisions[relation.type] && prior.has(relation.target_id) && text(relation.reason) && text(relation.limits), 'invalid revision target or account');
      if (relation.type === 'corrects') requireThat(text(relation.assertion), 'correction must name affected assertion');
    }
  }
  if (['correction', 'challenge'].includes(entry.kind)) requireThat(entry.relations.some(r => revisions[r.type] === entry.kind), 'missing required revision');
  requireThat(['draft', 'source-reviewed'].includes(entry.review_state), 'invalid review state');
  if (entry.review_state === 'draft') requireThat(entry.review_receipt === null, 'draft cannot carry approval review');
  else {
    const receipt = entry.review_receipt;
    requireThat(receipt?.reviewer_type === 'human' && text(receipt.reviewer) && receipt.decision === 'approved' && instant(receipt.reviewed_at) && at(receipt.reviewed_at) <= at(entry.recorded_at) && receipt.candidate_sha256 === reviewFingerprint(entry), 'invalid or stale human review receipt');
    requireThat(canonical(receipt.source_revisions) === canonical([...new Set(entry.citations.map(key))].sort()), 'review source revisions mismatch');
    requireThat(entry.citations.every(c => at(c.captured_at) <= at(receipt.reviewed_at)), 'review precedes source availability');
  }
}

export function validateSegment(journal, { registry, baseline = '' } = {}) {
  const maps = validateRegistry(registry);
  requireThat(typeof journal === 'string' && typeof baseline === 'string' && journal.startsWith(baseline), 'journal history changed');
  requireThat((!journal || journal.endsWith('\n')) && (!baseline || baseline.endsWith('\n')), 'journal needs final newline');
  let prefix = ''; const prior = new Map(); const aliases = new Set();
  for (const line of journal.split('\n').slice(0, -1)) {
    const record = JSON.parse(line);
    requireThat(record.previous_digest === digest(prefix) && record.entry_digest === digest(canonical(record.entry)), 'journal digest mismatch');
    validateEntry(record.entry, registry, maps, prior, aliases);
    prior.set(record.entry.id, record.entry); prefix += `${line}\n`;
  }
  return [...prior.values()];
}

export function appendChange(journal, entry, { registry, expected_digest, baseline = '' } = {}) {
  requireThat(expected_digest === digest(journal), 'stale journal expectation');
  const entries = validateSegment(journal, { registry, baseline });
  const existing = entries.find(e => e.id === entry.id);
  if (existing) { requireThat(canonical(existing) === canonical(entry), 'entry identity conflict'); return journal; }
  const candidate = journal + canonical({ entry, entry_digest: digest(canonical(entry)), previous_digest: digest(journal) }) + '\n';
  validateSegment(candidate, { registry, baseline });
  return candidate;
}

export function projectChanges(journal, registry, { recorded_as_of = null, occurred_by = null, baseline = '' } = {}) {
  requireThat(recorded_as_of === null || instant(recorded_as_of), 'invalid historical recording cutoff');
  requireThat(occurred_by === null || day(occurred_by), 'invalid historical event cutoff');
  const all = validateSegment(journal, { registry, baseline });
  const sources = new Map(registry.sources.map(s => [key(s), s]));
  const selected = all.filter(e => (!recorded_as_of || at(e.recorded_at) <= at(recorded_as_of)) && (!occurred_by || e.event_start === null || e.event_start <= occurred_by));
  const views = new Map(selected.map(entry => [entry.id, { id: entry.id, entry: structuredClone(entry), status: 'recorded', revision_links: [], hold_reasons: entry.review_state === 'draft' ? ['human-editorial-review-pending'] : [], source_currentness: 'present-verification' }]));
  // Present retention applies even if the withdrawing evidence arrived after
  // a historical cutoff. Dependent revision prose is also withheld.
  const states = new Map(all.map(e => [e.id, e.citations.reduce((state, c) => stronger(state, { current: 'recorded', changed: 'stale', unavailable: 'stale', withdrawn: 'withheld' }[sources.get(key(c)).state]), 'recorded')]));
  for (let changed = true; changed;) {
    changed = false;
    for (const e of all) for (const r of e.relations.filter(r => Object.hasOwn(revisions, r.type))) {
      const state = stronger(states.get(e.id), states.get(r.target_id));
      if (state !== states.get(e.id)) { states.set(e.id, state); changed = true; }
    }
  }
  // Derive badges only from presently permitted revisions. A suppressed link
  // must not leave behind a badge that reveals its protected existence.
  for (const entry of selected) for (const relation of entry.relations.filter(r => Object.hasOwn(revisions, r.type))) {
    if (states.get(entry.id) === 'withheld') continue;
    const target = views.get(relation.target_id); if (!target) continue;
    target.revision_links.push({ ...relation, entry_id: entry.id });
    target.status = stronger(target.status, { updates: 'updated', corrects: 'corrected', challenges: 'contested' }[relation.type]);
    if (relation.type === 'challenges') target.hold_reasons.push('unresolved-challenge');
  }
  for (const view of views.values()) {
    view.status = stronger(view.status, states.get(view.id));
    if (states.get(view.id) === 'stale') view.hold_reasons.push('source-not-current');
    if (view.status === 'withheld') { delete view.entry; view.revision_links = []; view.hold_reasons.push('retention-review-required'); }
    else view.revision_links = view.revision_links.filter(r => states.get(r.entry_id) !== 'withheld');
    view.hold_reasons = [...new Set(view.hold_reasons)].sort();
  }
  const nodeViews = new Map(registry.nodes.map(n => [n.id, { id: n.id, type: n.type, title: n.title, status: 'recorded', entry_ids: [] }]));
  for (const entry of selected) for (const relation of entry.relations.filter(r => Object.hasOwn(targets, r.type))) {
    const node = nodeViews.get(relation.target_id); node.entry_ids.push(entry.id);
    node.status = stronger(node.status, states.get(entry.id));
  }
  for (let changed = true; changed;) {
    changed = false;
    for (const node of registry.nodes) for (const target of node.depends_on ?? []) {
      const current = nodeViews.get(node.id); const dependency = nodeViews.get(target);
      const next = stronger(current.status, dependency.status);
      if (next !== current.status) { current.status = next; changed = true; }
    }
  }
  return { decision: 'private-view', coverage: registry.coverage, historical_semantics: 'journal-contents-not-person-knowledge', recorded_as_of, occurred_by, entries: [...views.values()], nodes: [...nodeViews.values()].filter(n => n.entry_ids.length || rank[n.status] >= rank.stale).map(n => n.status === 'withheld' ? { id: n.id, status: n.status } : n), activates_work: false, publication_authorized: false };
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replace(/[\\`*_{}\[\]()#+!|]/g, '\\$&');
const anchor = id => `irl-${digest(id).slice(0, 24)}`;
export function renderChanges(view) {
  requireThat(view?.decision === 'private-view', 'permissioned view required');
  const out = ['# IRL changelog — version two', '', 'Private analyst-authored accounts. Remembering does not activate work or authorize publication.', '', `Coverage: ${escape(view.coverage)}`, '', 'Historical filters reconstruct journal contents, not a person’s knowledge. Source badges reflect present verification.', '', '## Concise view', ''];
  for (const item of view.entries) {
    if (!item.entry) { out.push('- Withheld — retention review required.'); continue; }
    const e = item.entry;
    out.push(`- [${escape(e.title)}](#${anchor(e.id)}) — ${e.event_start === null ? 'unknown event date' : `${e.event_start}–${e.event_end} (${e.event_precision})`}; ${escape(e.change)} Why: ${escape(e.significance)} Limit: ${escape(e.boundary)} Status: ${item.status}.`);
  }
  out.push('', '## Full accounts', '');
  for (const item of view.entries) {
    if (!item.entry) continue;
    const e = item.entry;
    out.push(`<a id="${anchor(e.id)}"></a>`, '', `### ${escape(e.title)}`, '', `Identity: ${e.id}. Legacy aliases: ${e.legacy_aliases.join(', ') || 'none'}.`, '', `Analyst: ${escape(e.interpreter)}. Recorder: ${escape(e.recording_agent)}. Review: ${e.review_state}.`, '', `Event: ${e.event_start ?? 'unknown'}–${e.event_end ?? 'unknown'}; ${e.event_precision}; ${escape(e.event_basis)}. Evidence as of: ${e.evidence_as_of}. Recorded: ${e.recorded_at}. Learned: ${e.learned_at ?? 'unknown; not inferred'}.`, '', `Earlier picture: ${escape(e.before)}`, '', `Change: ${escape(e.change)}`, '', `Significance: ${escape(e.significance)}`, '', `Working implication: ${escape(e.working_implication)}`, '', `Limits: ${escape(e.boundary)}`, '', `Status: ${item.status}. Holds: ${item.hold_reasons.join(', ') || 'none'}.`);
    for (const c of e.citations) out.push('', `Evidence: ${escape(key(c))}; ${escape(c.locator)}; ${c.evidence_class}; SHA-256 ${c.sha256}. Custody: ${escape(c.custody)}. Transformation limit: ${escape(c.transformation_limit)}.`);
    for (const r of e.relations) out.push('', Object.hasOwn(revisions, r.type) ? `${r.type}: [earlier account](#${anchor(r.target_id)}). ${escape(r.assertion ?? r.reason)} Limits: ${escape(r.limits)}` : `${r.type}: ${escape(r.target_id)} (context, not authorship).`);
    for (const r of item.revision_links) out.push('', `${r.type}: [later account](#${anchor(r.entry_id)}). ${escape(r.assertion ?? r.reason)} Limits: ${escape(r.limits)}`);
    out.push('');
  }
  out.push('## Graph views', '');
  for (const n of view.nodes.filter(n => n.status !== 'withheld')) out.push(`- ${escape(n.title)} (${n.type}; ${n.status}): ${n.entry_ids.map(id => `[account](#${anchor(id)})`).join(', ') || 'dependent view; source review required'}.`);
  return out.join('\n').trimEnd() + '\n';
}

// authorize must be a trusted capability check, never a caller-supplied label.
// A rejected requester receives the same body regardless of journal existence.
export async function readPermissioned({ authorize, load, ...filters }) {
  try { if (await authorize() !== true) return { decision: 'unavailable' }; }
  catch { return { decision: 'unavailable' }; }
  const { journal, registry } = await load();
  return projectChanges(journal, registry, filters);
}

export function rehearseMigration(legacy, { expected_digest, namespace }) {
  requireThat(expected_digest === digest(legacy) && uuid(namespace), 'migration baseline or namespace mismatch');
  const entries = validateJournal(legacy);
  return { schema_version: 2, namespace, legacy_sha256: digest(legacy), migration_authorized: false, writes_performed: false, entries: entries.map(e => ({ legacy_id: e.id, legacy_entry_sha256: digest(canonical(e)), new_id: null, learned_at: null, relation_type: null, unresolved_legacy_targets: [...e.supersedes], disposition: 'held-for-human-mapping' })) };
}

export function reconcileBranches(base, left, right, registry) {
  const a = validateSegment(left, { registry, baseline: base });
  const b = validateSegment(right, { registry, baseline: base });
  if (left.startsWith(right) || right.startsWith(left)) return { decision: 'fast-forward', journal: left.length >= right.length ? left : right };
  return { decision: 'hold-for-reviewed-reconciliation', base_sha256: digest(base), left_sha256: digest(left), right_sha256: digest(right), conflicting_ids: a.filter(e => b.some(other => other.id === e.id && canonical(other) !== canonical(e))).map(e => e.id), required: ['preserve both original branch artifacts', 'human review of exact payloads and revision relations', 'explicit old-to-new identity mapping', 'new admissions use actual recording time; no tail concatenation'] };
}
