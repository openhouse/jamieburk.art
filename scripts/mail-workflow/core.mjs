import { createHash } from 'node:crypto';
import path from 'node:path';

export const METHOD = 'situated-mail-readings-v1';
export const hash = value => createHash('sha256').update(value).digest('hex');
const safeId = value => typeof value === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(value);
const norm = value => value.replace(/\s+/g, ' ').trim();
const md = value => String(value).replace(/[<>\[\]*_`|]/g, c => `&#${c.charCodeAt(0)};`);
const requireValue = (condition, reason) => { if (!condition) throw new Error(reason); };
export function relative(value) {
  requireValue(typeof value === 'string' && /^[a-zA-Z0-9_./-]+$/.test(value) && !value.startsWith('/') && value.split('/').every(p => p && p !== '.' && p !== '..'), 'unsafe-path');
  return value;
}
function unique(items, key) {
  requireValue(Array.isArray(items), 'array-required');
  const ids = items.map(key);
  requireValue(ids.every(Boolean) && new Set(ids).size === ids.length, 'duplicate-or-empty-id');
}
function noSecrets(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    requireValue(!/password|cookie|token|secret|credential|private.key/i.test(key), 'credential-field');
    noSecrets(child);
  }
}
function passages(text) {
  const result = new Map();
  for (const match of text.matchAll(/^## ([a-z0-9-]+) \| ([a-z0-9-]+) \| (authored|quoted|automated|signature|metadata)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)) {
    requireValue(!result.has(match[1]), 'duplicate-passage');
    result.set(match[1], { id: match[1], entity_id: match[2], kind: match[3], text: match[4].trim() });
  }
  return result;
}

export function buildMailReadings(manifest, readText) {
  noSecrets(manifest);
  requireValue(manifest.schema_version === 1 && manifest.visibility === 'private', 'private-manifest-required');
  requireValue(/^\d{4}-\d{2}-\d{2}$/.test(manifest.date), 'date-required');
  relative(manifest.output_dir);
  unique(manifest.entities, e => e.id);
  unique(manifest.messages, m => m.id);
  unique(manifest.readings, r => `${r.message_id}:${r.entity_id}`);
  unique(manifest.inventory?.mailboxes, m => m.id);
  requireValue(['unverified', 'verified'].includes(manifest.inventory.status), 'inventory-status');
  const entities = new Map(manifest.entities.map(e => {
    requireValue(safeId(e.id) && typeof e.name === 'string' && e.name.trim() && ['person', 'team', 'unresolved'].includes(e.kind) && ['source-assigned', 'unresolved'].includes(e.identity), 'entity-invalid');
    return [e.id, e];
  }));
  const mailboxes = new Map(manifest.inventory.mailboxes.map(m => [m.id, m]));
  const entries = [], sourceHashes = [], usedReadings = new Set();
  for (const message of manifest.messages) {
    requireValue(safeId(message.id) && message.context?.trim() && message.date && message.folder, 'message-context-required');
    requireValue(mailboxes.get(message.mailbox_id)?.status === 'verified', 'mailbox-identity-unverified');
    const url = new URL(message.source_locator);
    requireValue(url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash.includes('?') && !url.pathname.includes('/api/'), 'unsigned-source-locator-required');
    unique(message.participants, p => p.entity_id);
    requireValue(message.participants.length > 0, 'participant-disposition-required');
    const capturePath = relative(message.capture_path);
    const note = readText(capturePath);
    requireValue(hash(note) === message.capture_sha256, 'capture-hash-stale');
    const spans = passages(note);
    sourceHashes.push({ id: message.id, sha256: hash(note) });
    for (const p of message.participants) {
      const entity = entities.get(p.entity_id);
      requireValue(entity && ['sender','recipient','represented-team','mentioned','unresolved-record'].includes(p.role), 'participant-invalid');
      const reading = manifest.readings.find(r => r.message_id === message.id && r.entity_id === entity.id);
      const eligible = [...spans.values()].filter(s => s.entity_id === entity.id && (s.kind === 'authored' || (s.kind === 'automated' && entity.kind === 'team')));
      let status = entity.identity === 'unresolved' ? 'identity-unresolved' : eligible.length ? 'close-reading-pending' : 'no-attributed-language';
      const citations = [];
      if (reading) {
        usedReadings.add(reading);
        requireValue(message.body_read === true && entity.identity !== 'unresolved', 'read-and-resolved-required');
        requireValue(reading.interpretation?.trim() && reading.boundary?.trim() && reading.citations?.length, 'substantive-reading-required');
        for (const citation of reading.citations) {
          const span = eligible.find(s => s.id === citation.passage_id);
          requireValue(span && typeof citation.quote === 'string' && citation.quote.trim() && norm(span.text).includes(norm(citation.quote)), 'citation-attribution-invalid');
          citations.push({ ...citation, kind: span.kind });
        }
        status = 'close-reading-candidate';
      }
      entries.push({ id: `${message.id}--${entity.id}`, message_id: message.id, entity_id: entity.id, role: p.role, status, citations,
        interpretation: reading?.interpretation ?? null, boundary: reading?.boundary ?? 'No language, intention, agreement, or durable trait attributed from receipt, mention, signature, or quoted text alone.' });
    }
  }
  requireValue(usedReadings.size === manifest.readings.length, 'orphan-reading');
  const censusComplete = manifest.inventory.status === 'verified' && mailboxes.size > 0 && [...mailboxes.values()].every(m => {
    const actual = manifest.messages.filter(x => x.mailbox_id === m.id).map(x => x.id).sort();
    const expected = m.expected_message_ids;
    return m.status === 'verified' && m.folders_complete === true && m.message_census_complete === true && Array.isArray(expected) && new Set(expected).size === expected.length && JSON.stringify(actual) === JSON.stringify([...expected].sort());
  });
  return { method: METHOD, visibility: 'private', message_count: manifest.messages.length, entry_count: entries.length, candidate_count: entries.filter(e => e.status === 'close-reading-candidate').length,
    complete: censusComplete && manifest.messages.every(m => m.body_read === true) && entries.every(e => ['close-reading-candidate','no-attributed-language'].includes(e.status)),
    human_review_complete: false, publication_authorized: false, entries, source_hashes: sourceHashes };
}

export function renderMailPages(manifest, result) {
  const dir = manifest.output_dir, pages = {};
  const header = (id, title, file, relations) => `---\nid: ${JSON.stringify(id)}\ntitle: ${JSON.stringify(title)}\nkind: "situated-writers-voice"\nstatus: "review-candidate"\nvisibility: "private"\nsensitivity: "high"\nlast_reviewed: ${JSON.stringify(manifest.date)}\ncanonical_path: ${JSON.stringify(file)}\nsummary: "Source-bounded email reading; not speech by this person or team."\nrelations: ${JSON.stringify(relations)}\n---\n\n<!-- Generated by ${METHOD}. Edit the manifest and source notes. -->\n\n# ${md(title)}\n\n`;
  for (const entity of manifest.entities.filter(e => result.entries.some(x => x.entity_id === e.id))) {
    const file = `${dir}/${entity.id}.md`;
    const entries = result.entries.filter(e => e.entity_id === entity.id);
    let text = header(`mail.voice.${entity.id}`, `${entity.name} — situated writer's voice`, file, entries.map(e => `private:mail.${e.message_id}`));
    text += '[Coverage and graph index](index.md)\n\nAnalytical entries about evidence, not invented first-person speech. Recipient, mention, signature, and quoted-author roles do not establish an authored voice. No public projection or endorsement is authorized.\n\n';
    for (const entry of entries) {
      const message = manifest.messages.find(m => m.id === entry.message_id);
      const source = path.posix.relative(dir, message.capture_path);
      text += `## ${message.id}\n\n${md(message.date)} — ${md(message.context)}\n\nRole: ${entry.role}. Status: **${entry.status}**.\n\n[Selective reading notes](${source}) · [Authenticated original location](${message.source_locator})\n\nNotes SHA-256: \`${message.capture_sha256}\`. This hashes the selective notes, not a preserved raw message.\n\n`;
      for (const c of entry.citations) text += `> ${md(c.quote)}\n\n[Cited passage ${c.passage_id}](${source}#${c.passage_id}--${entry.entity_id}--${c.kind}) — ${c.kind}.\n\n`;
      text += `${md(entry.interpretation ?? 'A cited relationship entry is present; no authored close reading is claimed for this role.')}\n\nBoundary: ${md(entry.boundary)}\n\nRelated in this message:\n\n`;
      for (const p of message.participants.filter(p => p.entity_id !== entity.id)) {
        const other = manifest.entities.find(e => e.id === p.entity_id);
        text += `- [${md(other.name)}](${other.id}.md#${message.id}) — ${p.role}\n`;
      }
      text += '\n';
    }
    pages[file] = text.trimEnd() + '\n';
  }
  const file = `${dir}/index.md`;
  let text = header('mail.voice.index', 'Email reading coverage and graph', file, Object.keys(pages));
  text += `Registered messages: ${result.message_count}; participant entries: ${result.entry_count}; authored candidates: ${result.candidate_count}.\n\nInventory: ${manifest.inventory.status}. Bounded census and candidate coverage complete: ${result.complete}. Human review complete: false. This is not a claim to have read all mail in an account.\n\n`;
  for (const entity of manifest.entities.filter(e => result.entries.some(x => x.entity_id === e.id))) text += `- [${md(entity.name)}](${entity.id}.md) — ${entity.kind}; ${entity.identity}\n`;
  text += '\n## Mailbox queue\n\n';
  for (const m of manifest.inventory.mailboxes) text += `- ${md(m.id)} — ${md(m.status)}; folder census: ${m.folders_complete === true}; message census: ${m.message_census_complete === true}\n`;
  pages[file] = text.trimEnd() + '\n';
  return pages;
}
