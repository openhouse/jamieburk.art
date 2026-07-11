import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  knowledgeBundle,
  resolveCitationPage,
  validateProofLinks
} from "../packages/knowledge-bank/src/index.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");
const failures = [];
const warnings = [];

const proofSource = read("apps/www/src/data/proofs.ts");
const proofIds = new Set([...proofSource.matchAll(/\bid:\s*"([^"]+)"/g)].map((item) => item[1]));
try {
  validateProofLinks(knowledgeBundle, proofIds);
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

const mdx = read("apps/www/src/content/work/callnyc.mdx");
const work = read("apps/www/src/data/work.ts");
const start = work.indexOf('title: "CallNYC.org"');
const end = work.indexOf('title: "WOWList.org"', start);
const proofStart = proofSource.indexOf('id: "callnyc-civic-data-guidance"');
const proofEnd = proofSource.indexOf('id: "nyc-artist-coalition-public-web-infrastructure"');
const publicCopy = [
  mdx,
  work.slice(start, end),
  read("apps/www/src/app/work/technical-operations/page.tsx"),
  proofSource.slice(proofStart, proofEnd)
].join("\n");

if (/2014\s*[-–]\s*2015/.test(publicCopy)) failures.push("CallNYC public copy contains 2014-2015.");
if (/first civic-data hackathon/i.test(publicCopy)) failures.push("CallNYC public copy contains superseded hackathon wording.");
if (/formal hackathon submission/i.test(publicCopy)) failures.push("CallNYC public copy claims a formal submission.");
if (/Digital District/i.test(publicCopy)) failures.push("Protected Digital District evidence appears in public copy.");

const plan = knowledgeBundle.pagePlans.find((item) => item.pageId === "callnyc");
if (!plan) failures.push("CallNYC page plan is missing.");
const tags = [...mdx.matchAll(/<Cite\b[^>]*\/>/g)].map((item) => item[0]);
const authoredIds = [];
for (const tag of tags) {
  if (/\b(?:number|url|claim)\s*=/.test(tag)) failures.push(`Manual citation prop: ${tag}`);
  const pageId = /\bpageId="([^"]+)"/.exec(tag)?.[1];
  const id = /\bid="([^"]+)"/.exec(tag)?.[1];
  if (!pageId || !id) failures.push(`Cite needs literal pageId and id: ${tag}`);
  else {
    if (pageId !== "callnyc") failures.push(`Unexpected pageId ${pageId}.`);
    authoredIds.push(id);
  }
}
if (/\[\^[^\]]+\]|<Claim\b|<Citation\b/.test(mdx)) failures.push("A second citation syntax appears in CallNYC.");
if ((mdx.match(/<References\b/g) ?? []).length !== 1) failures.push("CallNYC needs one References section.");
if (!/<References\s+pageId="callnyc"\s*\/>/.test(mdx)) failures.push("References needs pageId=callnyc.");

if (plan) {
  const planned = plan.occurrences.map((item) => item.id);
  for (const id of authoredIds) if (!planned.includes(id)) failures.push(`Unknown occurrence ${id}.`);
  for (const id of planned) if (!authoredIds.includes(id)) failures.push(`Unused occurrence ${id}.`);
  const repeated = authoredIds.filter((id, index) => authoredIds.indexOf(id) !== index);
  if (repeated.length) failures.push(`Repeated occurrence IDs: ${[...new Set(repeated)].join(", ")}.`);
}

const resolved = resolveCitationPage("callnyc");
const domIds = [...resolved.occurrences.map((item) => item.anchorId), ...resolved.references.map((item) => item.targetId)];
if (new Set(domIds).size !== domIds.length) failures.push("CallNYC generates duplicate DOM IDs.");

for (const correction of knowledgeBundle.corrections) {
  if (correction.status === "resolved" && publicCopy.includes(correction.previousValue)) {
    failures.push(`Resolved correction ${correction.id} remains public.`);
  }
}

const components = [read("apps/www/src/components/citations/Cite.tsx"), read("apps/www/src/components/citations/References.tsx")].join("\n");
for (const required of ['role="doc-noteref"', 'role="doc-endnotes"', 'role="doc-backlink"', "aria-label"]) {
  if (!components.includes(required)) failures.push(`Citation components lack ${required}.`);
}
for (const prohibited of ['role="doc-bibliography"', 'role="doc-footnote"', '"use client"']) {
  if (components.includes(prohibited)) failures.push(`Citation components contain ${prohibited}.`);
}
for (const route of ["apps/www/src/app/citations", "apps/www/src/app/knowledge-bank", "apps/www/src/app/proofs"]) {
  if (existsSync(path.join(root, route))) failures.push(`Public data route exists: ${route}.`);
}

for (const source of knowledgeBundle.sources) {
  const original = source.links.some((link) => ["canonical", "original", "media"].includes(link.kind));
  const archive = source.links.some((link) => ["archive", "archive-context"].includes(link.kind));
  if (original && !archive) warnings.push(`Source ${source.id} has no archive link.`);
  if (!source.publishedAt && !source.capturedAt && source.visibility !== "protected") warnings.push(`Source ${source.id} has no publication date.`);
}
for (const warning of [...new Set(warnings)]) console.warn(`Citation warning: ${warning}`);
if (failures.length) {
  console.error(`Citation checks failed:\n- ${[...new Set(failures)].join("\n- ")}`);
  process.exit(1);
}
console.log(`Citation checks passed: ${knowledgeBundle.sources.length} sources, ${knowledgeBundle.claims.length} claims, ${knowledgeBundle.evidence.length} evidence edges, ${knowledgeBundle.citationGroups.length} groups.`);
