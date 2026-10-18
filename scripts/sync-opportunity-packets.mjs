import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { admitOpportunities, hash, METHOD } from './opportunity-packets.mjs';
import { compileWiki } from './knowledge-wiki/lib.mjs';

export function opportunityAdmissionRecord(data, source_path, bytes) {
  return { ...data, source_path, source_hash: hash(bytes),
    opportunity_type: data.opportunity_type || (data.source_type === 'official-employer' ? 'job' : undefined),
    eligibility: data.hard_screens?.some(s => s.state === 'not-met') ? 'failed' : data.eligibility,
    status: data.opportunity_status || data.status,
  };
}

export function syncPublicPackets(result, { check = false } = {}) {
  const target = path.join(result.repoRoot, 'reports/opportunity-packets.json');
  const previous = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')).packets : [];
  const records = result.graph.nodes.filter(n => n.kind === 'opportunity').map(n => {
    const bytes = readFileSync(path.join(result.repoRoot, n.path));
    const { data } = matter(bytes.toString());
    return opportunityAdmissionRecord(data, n.path, bytes);
  });
  const text = JSON.stringify({ schema_version: 1, method: METHOD, packets: admitOpportunities(records, previous) }, null, 2) + '\n';
  if (check) return existsSync(target) && readFileSync(target, 'utf8') === text;
  mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, text); return true;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (!syncPublicPackets(compileWiki(), { check: process.argv.includes('--check') })) {
    console.error('Opportunity admission is stale; run npm run wiki:graph.'); process.exitCode = 1;
  }
}
