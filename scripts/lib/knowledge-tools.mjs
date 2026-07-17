import { createHash } from "node:crypto";
import { appendFileSync, closeSync, existsSync, mkdirSync, openSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { intakeItemSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const receiptPath = path.join(repoRoot, "docs/knowledge-bank/intake/receipts.jsonl");
const receiptLockPath = `${receiptPath}.lock`;
const defaultIgnorables = /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0]/g;

function normalizedSecurityText(value) {
  let normalized = JSON.stringify(value).normalize("NFKC").replace(defaultIgnorables, "");
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try { normalized = decodeURIComponent(normalized); }
    catch { break; }
  }
  return normalized;
}

function normalizedKey(value) {
  return String(value).normalize("NFKC").replace(defaultIgnorables, "").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

export function canonicalizeSourceUrl(value) {
  if (!value) return undefined;
  const url = new URL(value);
  url.hash = "";
  if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
  return url.toString();
}

export function parseFlags(argv) {
  const flags = {};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) throw new Error(`Unexpected argument: ${value}`);
    const key = value.slice(2);
    if (["write", "json", "active", "help"].includes(key)) flags[key] = true;
    else {
      const next = argv[index + 1];
      if (!next || next.startsWith("--")) throw new Error(`--${key} needs a value`);
      flags[key] = next;
      index += 1;
    }
  }
  return flags;
}

export function containsPrivatePath(value) {
  return /(?:\/Users\/|\/Volumes\/|\/private\/(?:tmp|var)\/|\/tmp\/|\/var\/folders\/|(?:^|["'\s:])~\/|[A-Za-z]:\\Users\\|file:\/\/)/i.test(normalizedSecurityText(value));
}

function existingReceipts() {
  if (!existsSync(receiptPath)) return [];
  return readFileSync(receiptPath, "utf8").split("\n").filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); }
    catch { throw new Error(`Malformed intake receipt on line ${index + 1}`); }
  });
}

export function createIntakeReceipt(flags, now = new Date()) {
  for (const key of ["title", "project", "kind", "reason"]) {
    if (!flags[key]) throw new Error(`knowledge:intake requires --${key}`);
  }
  const localDate = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  const submittedAt = (flags.date ?? localDate);
  const sourceUrl = canonicalizeSourceUrl(flags.url);
  const existing = [...knowledgeBank.intakeItems, ...existingReceipts()];
  const duplicateIntake = existing.find((item) =>
    (sourceUrl && item.sourceUrl && canonicalizeSourceUrl(item.sourceUrl) === sourceUrl) ||
    (normalizedKey(item.title) === normalizedKey(flags.title) && item.projectIds.includes(flags.project))
  );
  const duplicateSource = knowledgeBank.sources.find((source) =>
    sourceUrl && [source.canonicalUrl, source.archiveUrl, source.assetUrl]
      .filter(Boolean)
      .some((url) => canonicalizeSourceUrl(url) === sourceUrl)
  );
  const duplicateOf = duplicateIntake ?? duplicateSource;
  const seed = [submittedAt, flags.project, flags.kind, flags.title, sourceUrl ?? ""].join("|");
  const suffix = createHash("sha256").update(seed).digest("hex").slice(0, 10).toUpperCase();
  const duplicateCount = existing.filter((item) => item.id.startsWith(`INTAKE-LEAD-${suffix}`)).length;
  const receipt = {
    id: `INTAKE-LEAD-${suffix}${duplicateCount ? `-D${duplicateCount + 1}` : ""}`,
    kind: flags.kind,
    title: flags.title,
    submittedAt,
    submittedBy: flags.by ?? "Jamie Burkart",
    projectIds: [flags.project],
    reason: flags.reason,
    ...(sourceUrl ? { sourceUrl } : {}),
    visibility: flags.visibility ?? "public-safe",
    disposition: duplicateOf ? "duplicate" : "captured",
    sourceIds: [],
    observationIds: [],
    researchInquiryIds: [],
    boundaries: [
      flags.boundary ?? "This is an intake lead, not a validated claim or authorization for public projection.",
      ...(duplicateOf ? [`Potential duplicate of ${duplicateOf.id}; preserve this receipt and reconcile deliberately.`] : [])
    ]
  };
  if (containsPrivatePath(receipt)) throw new Error(`${receipt.id}: private filesystem paths are not allowed`);
  return intakeItemSchema.parse(receipt);
}

export function writeIntakeReceipt(receipt) {
  mkdirSync(path.dirname(receiptPath), { recursive: true });
  let lock;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      lock = openSync(receiptLockPath, "wx");
      break;
    } catch (error) {
      if (error?.code !== "EEXIST" || attempt === 99) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
    }
  }
  try {
    const receipts = existingReceipts();
    const matches = receipts.filter((item) => item.id === receipt.id || item.id.startsWith(`${receipt.id}-D`));
    const persisted = matches.length ? { ...receipt, id: `${receipt.id}-D${matches.length + 1}` } : receipt;
    appendFileSync(receiptPath, `${JSON.stringify(persisted)}\n`);
    return persisted;
  } finally {
    if (lock !== undefined) closeSync(lock);
    if (existsSync(receiptLockPath)) unlinkSync(receiptLockPath);
  }
}

export function queryKnowledge(flags) {
  const groups = {
    intake: [...knowledgeBank.intakeItems, ...existingReceipts()],
    observation: knowledgeBank.observations,
    source: knowledgeBank.sources,
    claim: knowledgeBank.claims,
    inquiry: knowledgeBank.researchInquiries
  };
  const selected = flags.type && flags.type !== "all" ? { [flags.type]: groups[flags.type] } : groups;
  if (Object.values(selected).some((value) => !value)) throw new Error(`Unknown knowledge type: ${flags.type}`);
  const needle = flags.text?.toLocaleLowerCase();
  return Object.entries(selected).flatMap(([type, records]) => records.filter((record) => {
    if (flags.id && record.id !== flags.id) return false;
    if (flags.project && !(record.project === flags.project || record.projectIds?.includes(flags.project))) return false;
    if (flags.status && record.status !== flags.status && record.disposition !== flags.status) return false;
    if (flags.active && type === "claim" && !record.projections?.some((projection) => projection.status === "active")) return false;
    if (needle && !JSON.stringify(record).toLocaleLowerCase().includes(needle)) return false;
    return true;
  }).map((record) => ({ type, record })));
}

export function knowledgeReport() {
  const intakeItems = [...knowledgeBank.intakeItems, ...existingReceipts()];
  const activeClaims = knowledgeBank.claims.filter((claim) => claim.projections.some((projection) => projection.status === "active"));
  const heldClaims = knowledgeBank.claims.filter((claim) => claim.projections.some((projection) => projection.status === "hold"));
  const protectedSources = knowledgeBank.sources.filter((source) => source.visibility === "protected");
  const openInquiries = knowledgeBank.researchInquiries.filter((inquiry) => inquiry.resultStatus !== "recovered");
  return [
    "# Knowledge lifecycle report", "",
    `- Intake items: ${intakeItems.length}`,
    `- Atomic observations: ${knowledgeBank.observations.length}`,
    `- Sources: ${knowledgeBank.sources.length}`,
    `- Claims: ${knowledgeBank.claims.length}`,
    `- Active projected claims: ${activeClaims.length}`,
    `- Claims retaining held depth: ${heldClaims.length}`,
    `- Protected sources: ${protectedSources.length}`,
    `- Research inquiries not marked recovered: ${openInquiries.length}`,
    `- Public citation pages: ${knowledgeBank.pages.length}`, "",
    "Held depth is retained without implying that every defensible claim belongs on the public site.", ""
  ].join("\n");
}

export function projectionMap() {
  const rows = knowledgeBank.claims.flatMap((claim) => claim.projections.map((projection) => ({
    claimId: claim.id,
    project: claim.project,
    claimStatus: claim.status,
    projectionStatus: projection.status,
    key: projection.key,
    surfaces: projection.surfaces.join(", ") || "none",
    text: projection.text
  })));
  return [
    "# Projection map", "",
    "| Claim | Project | Claim status | Projection | Surface | Public wording |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| \`${row.claimId}\` | ${row.project} | ${row.claimStatus} | ${row.projectionStatus}:${row.key} | ${row.surfaces} | ${row.text.replaceAll("|", "\\|")} |`),
    ""
  ].join("\n");
}

export function writeGeneratedReport(relativePath, content) {
  const output = path.join(repoRoot, relativePath);
  mkdirSync(path.dirname(output), { recursive: true });
  writeFileSync(output, content);
  return relativePath;
}
