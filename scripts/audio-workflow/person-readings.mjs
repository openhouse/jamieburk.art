import { createHash } from 'node:crypto';
import path from 'node:path';

export const METHOD = 'situated-transcript-person-readings-v1';
export const sha256 = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const markdown = value => String(value).replace(/[<>\[\]*_`|]/g, character => `&#${character.charCodeAt(0)};`);

export function safeRelative(value) {
  if (typeof value !== 'string' || !value || value.includes('\\') || value.includes(':') || value.startsWith('/') || value.split('/').some(x => !x || x === '.' || x === '..')) {
    throw new Error('safe-relative-path-required');
  }
  return value;
}

export function parseTranscript(text) {
  const turns = [];
  let fragment = 1;
  let current;
  const flush = () => { if (current) { current.text = current.lines.join('\n').trim(); delete current.lines; turns.push(current); current = undefined; } };
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    const part = line.match(/^## (?:Part|Fragment) (\d+)\b/);
    if (part) { flush(); fragment = Number(part[1]); continue; }
    if (/^#|^Transcribed by |^---$/.test(line)) { flush(); continue; }
    const plain = line.match(/^([^\n]+?) {2,}(\d{1,2}:\d{2}(?::\d{2})?)\s*$/);
    const bold = line.match(/^\*\*\[(approximately )?(\d{1,2}:\d{2}(?::\d{2})?)\] (.+?):\*\*\s*(.*)$/);
    if (plain || bold) {
      flush();
      current = { label: (plain ? plain[1] : bold[3]).trim(), timestamp: plain ? plain[2] : bold[2], approximate: Boolean(bold?.[1]), fragment, line: index + 1, end_line: index + 1, lines: bold ? [bold[4]] : [] };
    } else if (current) { current.lines.push(line); current.end_line = index + 1; }
  }
  flush();
  return turns;
}

function unique(items, key, error) {
  const seen = new Set();
  for (const item of items) { const id = key(item); if (!id || seen.has(id)) throw new Error(error); seen.add(id); }
}

function observation(turn) {
  const value = normalize(turn.text);
  if (value.includes('?')) return 'The cited passage uses a question to invite an answer or clarification. Read its function in this exchange, not as evidence of a fixed personality.';
  if (/\b(?:not sure|maybe|might|I think|I guess)\b/i.test(value)) return 'The cited passage qualifies its assertion rather than presenting certainty. Preserve that qualification when carrying the statement into later context.';
  if (/\b(?:cannot|can.t|capacity|hold off|not able)\b/i.test(value)) return 'The cited passage marks a limit or constraint. Acknowledging it is not agreement to additional work.';
  return 'The cited passage is an attributed contribution within this conversation. A fuller editorial reading is pending; the extract alone does not establish intent, agreement, or a durable voice trait.';
}

export function buildPersonReadings(manifest, readText) {
  if (manifest?.visibility !== 'private') throw new Error('private-visibility-required');
  if (!Array.isArray(manifest.sources) || !Array.isArray(manifest.people) || !Array.isArray(manifest.readings)) throw new Error('person-reading-manifest-arrays-required');
  unique(manifest.sources, x => x.id, 'duplicate-source');
  unique(manifest.people, x => x.id, 'duplicate-person');
  unique(manifest.readings, x => `${x.source_id}:${x.person_id}`, 'duplicate-person-source-reading');
  const people = new Map(manifest.people.map(x => {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(x.id) || !x.name) throw new Error('safe-person-identity-required');
    return [x.id, x];
  }));
  const entries = [];
  const sources = [];
  const usedReadings = new Set();
  for (const source of manifest.sources) {
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(source.id)) throw new Error('safe-source-id-required');
    if (!/^(?:\d{4}-\d{2}-\d{2}|unknown)$/.test(source.date) || !source.context) throw new Error('situated-source-context-required');
    if (source.path) safeRelative(source.path);
    if (!['available', 'source-unavailable', 'held-participant-restriction', 'superseded'].includes(source.state)) throw new Error('source-disposition-required');
    const map = source.speakers ?? {};
    for (const id of Object.values(map)) if (!people.has(id)) throw new Error('speaker-person-unresolved');
    const ranges = source.excluded_ranges ?? [];
    for (const r of ranges) if (!Number.isInteger(r.start) || !Number.isInteger(r.end) || r.start < 1 || r.end < r.start || !r.reason) throw new Error('restriction-range-invalid');
    let body;
    let status = source.state;
    if (status === 'available') {
      if (!source.path) throw new Error('available-source-path-required');
      try { body = readText(source.path); } catch { status = 'source-unavailable'; }
    }
    const sourceHash = body === undefined ? null : sha256(body);
    const turns = body === undefined ? [] : parseTranscript(body);
    if (status === 'available' && !turns.length) status = 'unparsed-source';
    const groups = new Map(Object.values(map).map(id => [id, []]));
    for (const turn of turns) {
      // Exact source-specific mapping only. Mentions never establish speaker identity.
      const id = map[turn.label] ?? `unresolved-${sha256(`${source.id}:${turn.label}`).slice(0, 20)}`;
      if (!people.has(id)) people.set(id, { id, name: `${turn.label} (unresolved; ${source.id})`, unresolved: true });
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(turn);
    }
    sources.push({ id: source.id, path: source.path ?? null, date: source.date, context: source.context, status, sha256: sourceHash, speaker_count: groups.size, turn_count: turns.length });
    for (const [personId, personTurns] of groups) {
      const person = people.get(personId);
      const eligible = personTurns.filter(t => !ranges.some(r => t.line <= r.end && t.end_line >= r.start));
      const entry = { id: `${source.id}--${personId}`, source_id: source.id, person_id: personId, date: source.date, context: source.context, source_path: source.path ?? null, source_sha256: sourceHash, identity_status: person.unresolved ? 'unresolved-no-simulation' : 'source-assigned-human-review-open', turn_count: personTurns.length, restricted_turn_count: personTurns.length - eligible.length, status: 'automated-evidence-draft', citations: [], interpretation: '', boundary: 'Source-bounded analytical draft, not speech by this person, audio certification, endorsement, consent, diagnosis, or publication authority.' };
      const authored = manifest.readings.find(x => x.source_id === source.id && x.person_id === personId);
      if (authored) usedReadings.add(authored);
      if (status !== 'available') entry.status = status;
      else if (!personTurns.length) entry.status = 'no-attributed-speech';
      else if (!eligible.length) entry.status = 'held-restriction';
      else {
        const turn = eligible.find(t => t.text.length >= 40) ?? eligible[0];
        entry.citations = [{ fragment: turn.fragment, timestamp: turn.timestamp, approximate: turn.approximate, line: turn.line, end_line: turn.end_line, quote: normalize(turn.text).split(' ').slice(0, 45).join(' ') }];
        entry.interpretation = observation(turn);
        if (authored) {
          if (authored.source_sha256 !== sourceHash) entry.status = 'stale-close-reading';
          else {
            if (!authored.interpretation?.trim() || !authored.boundary?.trim() || !authored.citations?.length) throw new Error('substantive-close-reading-required');
            entry.citations = authored.citations.map(c => {
              const matches = eligible.filter(t => t.fragment === c.fragment && t.timestamp === c.timestamp && typeof c.quote === 'string' && c.quote.trim() && normalize(t.text).includes(normalize(c.quote)));
              if (matches.length !== 1) throw new Error('citation-not-in-speaker-turn');
              const t = matches[0];
              return { fragment: t.fragment, timestamp: t.timestamp, approximate: t.approximate, line: t.line, end_line: t.end_line, quote: c.quote };
            });
            entry.status = 'close-reading-candidate';
            entry.interpretation = authored.interpretation;
            entry.boundary = authored.boundary;
          }
        }
      }
      entries.push(entry);
    }
  }
  if (manifest.readings.some(x => !usedReadings.has(x))) throw new Error('orphan-close-reading');
  entries.sort((a, b) => a.id.localeCompare(b.id, 'en'));
  return { method: METHOD, visibility: 'private', sources, entries, people: [...people.values()].filter(p => entries.some(e => e.person_id === p.id)), complete: sources.length > 0 && sources.every(s => s.status === 'available') && entries.length > 0 && entries.every(e => e.status === 'close-reading-candidate' && e.identity_status !== 'unresolved-no-simulation'), human_review_complete: false };
}

function frontmatter(id, title, file, date, relations) {
  return `---\nid: ${JSON.stringify(id)}\ntitle: ${JSON.stringify(title)}\nkind: "situated-writers-voice"\nstatus: "review-candidate"\nvisibility: "private"\nsensitivity: "high"\nlast_reviewed: ${JSON.stringify(date)}\ncanonical_path: ${JSON.stringify(file)}\nsummary: "Source-bounded transcript readings; interpretation is not the person's own speech."\nrelations: ${JSON.stringify(relations)}\n---\n\n<!-- Generated by ${METHOD}; edit the source manifest, not this projection. -->\n\n`;
}

export function renderPersonPages(result, { output_dir: outputDir, date }) {
  safeRelative(outputDir);
  const pages = {};
  for (const person of result.people) {
    const file = `${outputDir}/${person.id}.md`;
    const entries = result.entries.filter(x => x.person_id === person.id);
    let body = frontmatter(`voice.${person.id}`, `${person.name} — situated writer's voice`, file, date, entries.map(x => `private:source.${x.source_id}`));
    body += `# ${markdown(person.name)} — situated writer's voice\n\n[Transcript coverage and people index](index.md)\n\nThese are analytical readings **about** recorded language, not a simulation or words written by this person. Identity remains source-assigned, not independently audio-certified. No endorsement or speaking authority is implied.\n\n`;
    for (const entry of entries) {
      body += `## ${entry.date} — ${entry.source_id}\n\nEntry: \`${entry.id}\`. Status: **${entry.status}**. Identity: ${entry.identity_status}.\n\nSituation: ${markdown(entry.context)}\n\nAttributed turns: ${entry.turn_count}; restricted turns retained in source custody: ${entry.restricted_turn_count}. This reading is selective; it does not replace or edit the full transcript.\n\n`;
      if (entry.source_path) {
        const link = path.posix.relative(outputDir, entry.source_path);
        body += `[Source ${entry.source_id}](${link}). Source SHA-256: \`${entry.source_sha256 ?? 'unavailable'}\`.\n\n`;
        for (const c of entry.citations) body += `### Cited specimen — fragment ${c.fragment}, ${c.approximate ? 'approximately ' : ''}${c.timestamp}\n\n> ${markdown(c.quote)}\n\n[${entry.source_id}, lines ${c.line}–${c.end_line}](${link}#L${c.line}-L${c.end_line})\n\n`;
      }
      body += `### Analytical interpretation\n\n${entry.interpretation ? markdown(entry.interpretation) : 'No voice inference is made from unavailable, restricted, or unattributed text. This entry preserves the gap.'}\n\nBoundary: ${markdown(entry.boundary)}\n\n`;
    }
    pages[file] = body;
  }
  const indexPath = `${outputDir}/index.md`;
  let index = frontmatter('voice.index', 'Situated writer’s voice — transcript coverage', indexPath, date, result.people.map(p => `private:voice.${p.id}`));
  index += '# Situated writer’s voice — transcript coverage\n\nEvery registered transcript has a disposition; every observed speaker has an entry. Missing bodies and unknown rosters remain gaps, not completed readings. People merely mentioned are not treated as speakers.\n\n## People\n\n';
  for (const person of result.people) index += `- [${markdown(person.name)}](${person.id}.md)\n`;
  index += '\n## Transcript-to-person edges\n\n';
  for (const source of result.sources) {
    index += `### ${source.id}\n\n${source.date}; ${source.status}. ${markdown(source.context)}\n\n`;
    if (source.path) index += `[Source or custody record](${path.posix.relative(outputDir,source.path)})\n\n`;
    const entries = result.entries.filter(e => e.source_id === source.id);
    for (const entry of entries) index += `- [${markdown(result.people.find(p => p.id === entry.person_id).name)}](${entry.person_id}.md#${entry.date}--${source.id.toLowerCase()}) — ${entry.status}\n`;
    if (!entries.length) index += 'Speaker roster unresolved; no person or voice inferred.\n';
    index += '\n';
  }
  pages[indexPath] = index;
  return pages;
}
