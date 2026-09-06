// Review-only semantic model. This does not read the live journal, validate
// prose, verify access, or implement the proposed persistence/migration API.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { cases } from '../../evals/knowledge-bank/irl-changelog-rfc-cases.mjs';

const defaultRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const inputPaths = [
  '.github/workflows/irl-changelog.yml',
  'docs/architecture/additive-irl-changelog.md',
  'evals/knowledge-bank/irl-changelog-rfc-cases.mjs',
  'package.json',
  'rfcs/0016-irl-changelog-graph-component.contract.json',
  'rfcs/0016-irl-changelog-graph-component.md',
  'rfcs/README.md',
  'scripts/check-rfcs.mjs',
  'scripts/irl-changelog/journal.mjs',
  'scripts/irl-changelog/journal.test.mjs',
  'scripts/rfcs/irl-changelog-eval.mjs',
  'scripts/rfcs/irl-changelog-eval.test.mjs'
];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

export function evaluateIrlChangelogRFC({ repoRoot = defaultRoot } = {}) {
  const contract = JSON.parse(readFileSync(resolve(repoRoot, 'rfcs/0016-irl-changelog-graph-component.contract.json'), 'utf8'));
  const inputs = inputPaths.map(path => ({ path, sha256: sha256(readFileSync(resolve(repoRoot, path))) }));
  const results = cases.map(scenario => {
    const actual = reviewIrlPacket(contract, scenario.packet);
    return { id: scenario.id, passed: isDeepStrictEqual(actual, scenario.expected), actual, expected: scenario.expected };
  });
  const failed = results.filter(result => !result.passed).length;
  return {
    schema_version: 1, rfc: 16, stage: contract.stage,
    scope: 'synthetic-review-model-only', passed: failed === 0 && results.length > 0,
    scenarios: { total: results.length, passed: results.length - failed, failed, results },
    candidate_fingerprint: sha256(JSON.stringify(inputs)), inputs,
    implementation_authorized: false, migration_authorized: false,
    publication_authorized: false, activates_work: false,
    human_editorial_review_established: false
  };
}

export function validateIrlReceipt(receipt, repoRoot = defaultRoot) {
  try {
    return isDeepStrictEqual(receipt?.evaluation, evaluateIrlChangelogRFC({ repoRoot })) && receipt.evaluation.passed === true;
  } catch { return false; }
}

const reject = (code) => { throw new Error(code); };
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const hash = value => /^[a-f0-9]{64}$/.test(value ?? '');
const day = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const instant = value => typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  new Date(value).toISOString() === value.replace(/(?<!\.\d{3})Z$/, '.000Z');
const at = value => Date.parse(value);
const response = (decision, reasons, entries = []) => ({
  decision, reasons: [...new Set(reasons)].sort(), entries,
  implementation_authorized: false, migration_authorized: false,
  publication_authorized: false, activates_work: false
});

export function reviewIrlPacket(contract, packet) {
  try {
    if (contract?.stage !== 'proposed' || contract?.scope !== 'synthetic-review-model-only' ||
        contract?.default_visibility !== 'private' || contract?.public_journal_export !== false ||
        ['implementation_authorized', 'migration_authorized', 'publication_authorized', 'activates_work']
          .some(key => contract?.authority?.[key] !== false)) reject('unsafe-contract');
    if (packet?.visibility !== 'private') reject('public-journal-export-forbidden');
    if (packet.requested_effect !== 'review') reject('authority-promotion');
    if (!Array.isArray(packet.entries) || !Array.isArray(packet.nodes) || !Array.isArray(packet.sources) ||
        !instant(packet.recorded_as_of) || !day(packet.occurred_by) || typeof packet.history_conflict !== 'boolean') reject('invalid-packet');
    if (packet.history_conflict) return response('hold', ['history-conflict']);

    const nodes = new Map();
    for (const node of packet.nodes) {
      if (!nonempty(node.id) || nodes.has(node.id) || !contract.node_types.includes(node.type) ||
          node.visibility !== 'private') reject('invalid-node-registry');
      nodes.set(node.id, node);
    }
    const sources = new Map();
    for (const source of packet.sources) {
      const key = JSON.stringify([source.id, source.revision]);
      if (!nonempty(source.id) || !nonempty(source.revision) || sources.has(key) || !hash(source.sha256) ||
          !contract.evidence_classes.includes(source.evidence_class) || !contract.source_states.includes(source.state) ||
          !day(source.issued_on) || !instant(source.captured_at)) reject('invalid-source-registry');
      sources.set(key, source);
    }

    const prior = new Map();
    for (const entry of packet.entries) {
      if (!/^irl:[a-z0-9-]+:[A-Za-z0-9-]+$/.test(entry.id ?? '')) reject('unnamespaced-entry-id');
      if (prior.has(entry.id)) reject('duplicate-entry-id');
      if (entry.version !== contract.entry_version) reject('unsupported-entry-version');
      if (!contract.entry_kinds.includes(entry.kind)) reject('unknown-entry-kind');
      if (entry.activates_work !== false || entry.publication_authorized !== false) reject('authority-promotion');
      if (entry.participant_authored !== false || !nonempty(entry.interpreter_id)) reject('participant-impersonation');
      const unknownEvent = entry.event_start === null && entry.event_end === null;
      if (!instant(entry.recorded_at) || !day(entry.evidence_as_of) ||
          entry.evidence_as_of > entry.recorded_at.slice(0, 10) ||
          (!unknownEvent && (!day(entry.event_start) || !day(entry.event_end) ||
            entry.event_start > entry.event_end || entry.event_end > entry.evidence_as_of)) ||
          (prior.size && at(entry.recorded_at) < at([...prior.values()].at(-1).recorded_at))) reject('invalid-chronology');
      if (!Array.isArray(entry.citations) || !entry.citations.length) reject('missing-citation');
      for (const citation of entry.citations) {
        const source = sources.get(JSON.stringify([citation.source_id, citation.revision]));
        if (!source || !nonempty(citation.locator) || source.sha256 !== citation.sha256 ||
            source.evidence_class !== citation.evidence_class) reject('unbound-source-revision');
        if (at(source.captured_at) > at(entry.recorded_at) || source.issued_on > entry.evidence_as_of) reject('invalid-chronology');
      }
      if (entry.learned_at !== null) {
        if (!instant(entry.learned_at) || at(entry.learned_at) > at(entry.recorded_at) ||
            !entry.citations.some(c => c.source_id === entry.learning_basis?.source_id &&
              c.revision === entry.learning_basis?.revision && c.locator === entry.learning_basis?.locator)) reject('unbound-learning-time');
      } else if (entry.learning_basis !== null) reject('unbound-learning-time');

      if (!Array.isArray(entry.relations)) reject('missing-context-relation');
      if (entry.relations.some(r => !Object.hasOwn(contract.relation_targets, r.type))) reject('unknown-relation');
      if (!entry.relations.some(r => r.type === 'about')) reject('missing-context-relation');
      const revisions = entry.relations.filter(r => ['updates', 'corrects', 'challenges'].includes(r.type));
      const needed = { correction: 'corrects', challenge: 'challenges' }[entry.kind];
      if ((needed && !revisions.some(r => r.type === needed)) || revisions.some(r =>
        ({ updates: 'development', corrects: 'correction', challenges: 'challenge' })[r.type] !== entry.kind)) reject('revision-kind-mismatch');
      for (const relation of entry.relations) {
        const allowed = contract.relation_targets[relation.type];
        if (allowed.includes('entry')) {
          if (!prior.has(relation.target)) reject('revision-target-not-prior');
        } else {
          if (!nodes.has(relation.target)) reject('unresolved-relation');
          if (!allowed.includes(nodes.get(relation.target).type)) reject('wrong-relation-target-type');
        }
      }
      prior.set(entry.id, entry);
    }

    const visible = packet.entries.filter(entry => at(entry.recorded_at) <= at(packet.recorded_as_of) &&
      (entry.event_start === null || entry.event_start <= packet.occurred_by));
    const holds = new Set();
    const views = new Map(visible.map(entry => [entry.id, {
      id: entry.id, status: 'recorded', learned_at: entry.learned_at,
      historical_reconstruction: entry.event_end === null ? null : entry.event_end < entry.recorded_at.slice(0, 10)
    }]));
    for (const entry of visible) {
      for (const relation of entry.relations) if (views.has(relation.target)) {
        const status = { updates: 'updated', corrects: 'corrected', challenges: 'contested' }[relation.type];
        // A later edge must not erase an unresolved challenge or correction.
        const severity = ['recorded', 'updated', 'corrected', 'contested'];
        if (status && severity.indexOf(status) > severity.indexOf(views.get(relation.target).status)) {
          views.get(relation.target).status = status;
        }
        if (status === 'contested') holds.add('contested-reading');
      }
    }
    for (const entry of visible) {
      if (entry.event_start === null) holds.add('unknown-event-time');
      const states = entry.citations.map(c => sources.get(JSON.stringify([c.source_id, c.revision])).state);
      if (states.includes('withdrawn')) {
        views.get(entry.id).status = 'withheld';
        holds.add('retention-review-required');
      } else if (states.some(state => state !== 'current')) {
        views.get(entry.id).status = 'stale';
        holds.add('source-not-current');
      }
    }
    return response(holds.size ? 'hold' : 'ready-for-human-review', holds, [...views.values()]);
  } catch (error) {
    return response('deny', [error.message]);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv[2] === '--check-receipt' && process.argv.length === 4) {
      const receipt = JSON.parse(readFileSync(process.argv[3], 'utf8'));
      const receipt_current = validateIrlReceipt(receipt);
      console.log(JSON.stringify({ receipt_current, publication_authorized: false }));
      if (!receipt_current) process.exitCode = 1;
    } else if (process.argv.length === 2) {
      const evaluation = evaluateIrlChangelogRFC();
      console.log(JSON.stringify(evaluation, null, 2));
      if (!evaluation.passed) process.exitCode = 1;
    } else throw new Error('usage: irl-changelog-eval.mjs [--check-receipt FILE]');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
