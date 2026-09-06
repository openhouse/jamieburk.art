import test from 'node:test';
import assert from 'node:assert/strict';
import contract from '../../rfcs/0016-irl-changelog-graph-component.contract.json' with { type: 'json' };
import { cases } from '../../evals/knowledge-bank/irl-changelog-rfc-cases.mjs';
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, cpSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { reviewIrlPacket, evaluateIrlChangelogRFC, validateIrlReceipt } from './irl-changelog-eval.mjs';

for (const scenario of cases) test(scenario.id, () => {
  const before = structuredClone(scenario.packet);
  assert.deepEqual(reviewIrlPacket(contract, scenario.packet), scenario.expected);
  assert.deepEqual(scenario.packet, before, 'a review must not rewrite its input history');
});

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
test('evaluator runs the candidate cases and reports no implementation authority', () => {
  const evaluation = evaluateIrlChangelogRFC();
  assert.equal(evaluation.passed, true);
  assert.equal(evaluation.scenarios.total, 33);
  assert.equal(evaluation.scenarios.failed, 0);
  assert.equal(evaluation.implementation_authorized, false);
  assert.equal(evaluation.migration_authorized, false);
});

test('exact receipt fails after an input changes or its result is falsified', () => {
  const evaluation = evaluateIrlChangelogRFC();
  const receipt = { evaluation };
  assert.equal(validateIrlReceipt(receipt), true);
  assert.equal(validateIrlReceipt({ evaluation: { ...evaluation, passed: false } }), false);
  const fixture = mkdtempSync(resolve(tmpdir(), 'irl-rfc-receipt-'));
  for (const { path } of evaluation.inputs) {
    const target = resolve(fixture, path);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(resolve(root, path), target);
  }
  const target = resolve(fixture, 'rfcs/0016-irl-changelog-graph-component.md');
  writeFileSync(target, readFileSync(target, 'utf8') + '\nA synthetic candidate change.\n');
  assert.equal(validateIrlReceipt(receipt, fixture), false);
});

test('CLI returns a failing exit code for a stale receipt', () => {
  const fixture = mkdtempSync(resolve(tmpdir(), 'irl-rfc-cli-'));
  const receiptPath = resolve(fixture, 'receipt.json');
  writeFileSync(receiptPath, JSON.stringify({ evaluation: { passed: true, candidate_fingerprint: 'stale' } }));
  const run = spawnSync(process.execPath, ['scripts/rfcs/irl-changelog-eval.mjs', '--check-receipt', receiptPath], { cwd: root, encoding: 'utf8' });
  assert.equal(run.status, 1);
  assert.deepEqual(JSON.parse(run.stdout), { receipt_current: false, publication_authorized: false });
});
test('operator implementation authorization remains distinct from evaluator-granted authority', () => {
  const evaluation = evaluateIrlChangelogRFC();
  assert.equal(evaluation.stage, 'implementing');
  assert.equal(evaluation.operator_implementation_authorized, true);
  assert.equal(evaluation.implementation_authorized, false);
  assert.equal(evaluation.migration_authorized, false);
});
test('an RFC receipt expires when the installed runtime candidate changes', () => {
  const evaluation = evaluateIrlChangelogRFC();
  const fixture = mkdtempSync(resolve(tmpdir(), 'irl-runtime-receipt-'));
  for (const { path } of evaluation.inputs) {
    mkdirSync(dirname(resolve(fixture, path)), { recursive: true });
    cpSync(resolve(root, path), resolve(fixture, path));
  }
  mkdirSync(resolve(fixture, 'scripts/irl-changelog'), { recursive: true });
  writeFileSync(resolve(fixture, 'scripts/irl-changelog/component.mjs'), '// altered runtime candidate\n');
  assert.equal(validateIrlReceipt({ evaluation }, fixture), false);
});
