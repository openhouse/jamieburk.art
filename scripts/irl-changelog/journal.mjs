import { createHash } from 'node:crypto';

export const digest = (text) => createHash('sha256').update(text).digest('hex');

const fail = (message) => { throw new Error(message); };
const required = (value, name) => typeof value === 'string' && value.trim() || fail(`required ${name}`);
const hashPattern = /^[a-f0-9]{64}$/;
export const canonical = (value) => JSON.stringify(value, (_, item) =>
  item && typeof item === 'object' && !Array.isArray(item)
    ? Object.fromEntries(Object.keys(item).sort().map((key) => [key, item[key]])) : item);

function date(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '') ||
      !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) fail('invalid date');
  return value;
}

function validateEntry(entry, prior) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) fail('required entry');
  if (!/^IRL-\d{4,}$/.test(entry.id ?? '')) fail('required stable id');
  for (const key of ['title', 'before', 'change', 'significance', 'boundary', 'working_implication']) required(entry[key], key);
  if (!['event', 'interpretation', 'correction', 'historical-reconstruction'].includes(entry.kind)) fail('required kind');
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(entry.recorded_at ?? '') ||
      !Number.isFinite(Date.parse(entry.recorded_at)) ||
      new Date(entry.recorded_at).toISOString() !== entry.recorded_at.replace(/(?<!\.\d{3})Z$/, '.000Z')) fail('invalid recording time');
  if (date(entry.event_start) > date(entry.event_end) || date(entry.event_end) > date(entry.evidence_as_of) ||
      entry.evidence_as_of > entry.recorded_at.slice(0, 10)) fail('invalid date order');
  if (prior.length && Date.parse(entry.recorded_at) < Date.parse(prior.at(-1).recorded_at)) fail('backdated append');
  if (entry.activates_work !== false || entry.public_projection_authorized !== false) fail('journal has no action or publication authority');
  if (!Array.isArray(entry.related_pages) || !entry.related_pages.length || entry.related_pages.some((x) => typeof x !== 'string' || !x.trim())) fail('required graph relations');
  if (!Array.isArray(entry.citations) || !entry.citations.length) fail('required citations');
  for (const citation of entry.citations) {
    if (!citation || !citation.source_id || typeof citation.locator !== 'string' || !citation.locator.trim() || !hashPattern.test(citation.source_sha256 ?? '')) fail('unbound citation');
    if (!['primary-record', 'attributed-report', 'derived-analysis', 'user-instruction'].includes(citation.evidence_class)) fail('unknown evidence class');
  }
  if (!Array.isArray(entry.supersedes) || new Set(entry.supersedes).size !== entry.supersedes.length) fail('invalid supersedes');
  if (entry.kind === 'correction' && !entry.supersedes.length) fail('correction needs a prior target');
  if (entry.supersedes.length && entry.kind !== 'correction') fail('only corrections may supersede');
  for (const id of entry.supersedes) if (!prior.some((x) => x.id === id)) fail('supersedes must point to a prior entry');
  if (prior.some((x) => x.id === entry.id)) fail('duplicate id');
}

// Hash chains detect accidental tampering. A trusted Git baseline is also
// required to reject an editor who rewrites history and recalculates hashes.
export function validateJournal(text, { baseline = '' } = {}) {
  if (typeof text !== 'string' || typeof baseline !== 'string') fail('required text');
  if ((baseline && !baseline.endsWith('\n')) || !text.startsWith(baseline)) fail('history is not an unchanged prefix');
  if (!text) return [];
  if (!text.endsWith('\n')) fail('missing final newline; possible truncated append');
  let prefix = '';
  const entries = [];
  for (const line of text.slice(0, -1).split('\n')) {
    const record = JSON.parse(line);
    if (record.previous_digest !== digest(prefix) || record.entry_digest !== digest(canonical(record.entry))) fail('digest mismatch');
    validateEntry(record.entry, entries);
    entries.push(record.entry);
    prefix += line + '\n';
  }
  return entries;
}

export function appendEntry(text, entry, expectedDigest) {
  if (expectedDigest !== digest(text)) fail('stale journal digest; reload before appending');
  const entries = validateJournal(text);
  const existing = entries.find((x) => x.id === entry.id);
  if (existing) {
    if (canonical(existing) === canonical(entry)) return text;
    fail('duplicate id with different content; append a correction');
  }
  validateEntry(entry, entries);
  return text + canonical({ entry, previous_digest: digest(text), entry_digest: digest(canonical(entry)) }) + '\n';
}
