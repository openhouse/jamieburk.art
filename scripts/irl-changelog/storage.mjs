// Local filesystem adapter. Use only after a trusted permission check; this is
// not a network endpoint and a visibility label is not authentication.
import { readFileSync, writeFileSync, openSync, closeSync, fsyncSync, unlinkSync, renameSync, realpathSync, statSync } from 'node:fs';
import { resolve, relative, isAbsolute } from 'node:path';
import { randomUUID } from 'node:crypto';
import { digest } from './journal.mjs';
import { appendChange, validateSegment, projectChanges, renderChanges } from './component.mjs';

export function inspectSources(registry, { root, approvedRoots = [root] }) {
  const roots = approvedRoots.map(path => realpathSync(path));
  const checked = structuredClone(registry);
  for (const source of checked.sources) {
    if (source.state === 'withdrawn') continue;
    try {
      const target = realpathSync(resolve(root, source.path));
      if (!roots.some(path => { const rel = relative(path, target); return rel !== '' && !isAbsolute(rel) && rel !== '..' && !rel.startsWith('../'); }) || !statSync(target).isFile()) throw new Error('outside approved custody');
      source.state = digest(readFileSync(target)) === source.sha256 ? 'current' : 'changed';
    } catch { source.state = 'unavailable'; }
  }
  return checked;
}

function writeProjection(outputPath, content) {
  const temporary = `${outputPath}.${randomUUID()}.tmp`;
  let created = false;
  try {
    writeFileSync(temporary, content, { flag: 'wx', mode: 0o600 }); created = true;
    const fd = openSync(temporary, 'r');
    try { fsyncSync(fd); } finally { closeSync(fd); }
    renameSync(temporary, outputPath); created = false;
  } finally { if (created) unlinkSync(temporary); }
}

function rebuildUnlocked({ root, registry, journalPath, outputPath, baseline = '', approvedRoots, projectionPrefix = '', ...filters }) {
  const journal = readFileSync(journalPath, 'utf8');
  const checked = inspectSources(registry, { root, approvedRoots });
  const view = projectChanges(journal, checked, { ...filters, baseline });
  writeProjection(outputPath, projectionPrefix + renderChanges(view));
  return view;
}

export function rebuildFile(options) {
  const lock = `${options.journalPath}.lock`;
  const fd = openSync(lock, 'wx', 0o600);
  try { return rebuildUnlocked(options); }
  finally { closeSync(fd); unlinkSync(lock); }
}

export function appendToFile(options) {
  const { root, registry, journalPath, entry, expected_digest, baseline = '', approvedRoots } = options;
  const lock = `${journalPath}.lock`;
  const fd = openSync(lock, 'wx', 0o600);
  try {
    const old = readFileSync(journalPath, 'utf8');
    const checked = inspectSources(registry, { root, approvedRoots });
    const entries = validateSegment(old, { registry: checked, baseline });
    const existing = entries.some(e => e.id === entry.id);
    // Recording is the current admission, never a historical event or import
    // date. Caller captures the UTC timestamp; permit five minutes of review/I/O.
    if (!existing && !(Date.parse(entry.recorded_at) <= Date.now() + 1000 && Date.parse(entry.recorded_at) >= Date.now() - 300_000)) throw new Error('recording time must be current admission time');
    if (!existing && entry.citations.some(c => checked.sources.find(s => s.id === c.id && s.revision_id === c.revision_id)?.state !== 'current')) throw new Error('source not current; admission held');
    const next = appendChange(old, entry, { registry: checked, expected_digest, baseline });
    if (next !== old) {
      const journalFd = openSync(journalPath, 'a');
      try { writeFileSync(journalFd, next.slice(old.length)); fsyncSync(journalFd); } finally { closeSync(journalFd); }
    }
    // A failed render must not truncate a valid admitted record. Rebuild is the
    // repair operation; a partial JSONL write instead fails closed for review.
    rebuildUnlocked(options);
    return { appended: next !== old, journal_sha256: digest(next), publication_authorized: false, activates_work: false };
  } finally { closeSync(fd); unlinkSync(lock); }
}
