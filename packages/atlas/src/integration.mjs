import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const semanticIdPattern = /\b(?:ENT|INTAKE|SRC|READ|CLM|TASK|INQ|DEC|COR|PROP|PROOF|PUB|MEDIA|EVID|KB)-[A-Z0-9][A-Z0-9._-]*/g;
const urlPattern = /https?:\/\/[^\s"'<>()[\]{}]+/g;
const relevantRoots = [
  ".agents/evals/",
  "apps/www/src/data/knowledge-bank/",
  "docs/evals/",
  "docs/knowledge-bank/",
  "evals/",
  "scripts/evals/",
  "scripts/knowledge-bank/",
  "scripts/research/"
];
const exactRelevantPaths = new Set(["apps/www/src/data/proofs.ts"]);
const selectedFields = new Set([
  "id",
  "kind",
  "label",
  "title",
  "name",
  "publicSafeSummary",
  "publicSummary",
  "publicClaim",
  "publicWording",
  "summary",
  "description",
  "status",
  "supportLevel",
  "evidenceClass",
  "question",
  "claimId",
  "sourceId",
  "project",
  "projectKey",
  "date",
  "publishedAt",
  "author",
  "organization",
  "relationship",
  "supports",
  "relationToJamie",
  "confidence",
  "guardrail",
  "boundaries",
  "doesNotEstablish",
  "nextActions",
  "collectiveCredit",
  "causalBoundary"
]);
const protectedHosts = new Set([
  "docs.google.com",
  "drive.google.com",
  "forms.gle",
  "localhost",
  "127.0.0.1"
]);

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function gitBlobHash(value) {
  return createHash("sha1")
    .update(`blob ${value.length}\0`)
    .update(value)
    .digest("hex");
}

function sorted(values) {
  return [...new Set(values)].sort();
}

function isRelevantPath(file) {
  return exactRelevantPaths.has(file) || relevantRoots.some((root) => file.startsWith(root));
}

function artifactKind(file) {
  if (file.startsWith("evals/") || file.startsWith("docs/evals/") || file.startsWith(".agents/evals/")) return "evaluation";
  if (/\/(?:data|corpora|fixtures|source-captures)\//.test(file)) return "source-corpus";
  if (file.startsWith("apps/www/src/data/knowledge-bank/")) return "structured-knowledge";
  if (file.startsWith("docs/knowledge-bank/")) return "knowledge-document";
  if (file.startsWith("scripts/")) return "knowledge-tooling";
  return "knowledge-artifact";
}

function sanitize(value) {
  return value
    .replace(/\/(?:Users|Volumes|private\/tmp)\/[^\s"'`]+/gi, "[protected-path]")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/g, "[redacted-contact]")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

function propertyName(node) {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return null;
}

function literalValue(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return sanitize(node.text);
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) {
    const values = node.elements.map(literalValue).filter((value) => value !== undefined);
    return values.length === node.elements.length ? values : undefined;
  }
  return undefined;
}

function selectedRecordFromObject(node) {
  const fields = {};
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = propertyName(property.name);
    if (!selectedFields.has(name)) continue;
    const value = literalValue(property.initializer);
    if (value !== undefined) fields[name] = value;
  }
  if (!semanticIdPattern.test(fields.id ?? "")) return null;
  semanticIdPattern.lastIndex = 0;
  return fields;
}

function recordsFromTypeScript(content, file) {
  const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const records = [];
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const record = selectedRecordFromObject(node);
      if (record) records.push(record);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return records;
}

function recordsFromJson(content) {
  const records = [];
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    return records;
  }
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    if (typeof value.id === "string" && value.id.match(semanticIdPattern)) {
      semanticIdPattern.lastIndex = 0;
      const selected = {};
      for (const [key, fieldValue] of Object.entries(value)) {
        if (!selectedFields.has(key)) continue;
        if (typeof fieldValue === "string") selected[key] = sanitize(fieldValue);
        else if (["number", "boolean"].includes(typeof fieldValue)) selected[key] = fieldValue;
        else if (Array.isArray(fieldValue) && fieldValue.every((item) => typeof item === "string")) {
          selected[key] = fieldValue.map(sanitize);
        }
      }
      records.push(selected);
    }
    Object.values(value).forEach(visit);
  };
  visit(parsed);
  return records;
}

function documentDigest(content, file) {
  if (!file.endsWith(".md") || /\/(?:data|corpora|fixtures|source-captures|protected-verification)\//.test(file)) return null;
  const title = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const paragraphs = content
    .replace(/^---[\s\S]*?---\s*/m, "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/^#+\s+.*$/gm, "").trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith("|") && !paragraph.startsWith("```"));
  if (!title && !paragraphs.length) return null;
  return {
    title: sanitize(title ?? path.basename(file, ".md")),
    abstract: sanitize(paragraphs[0] ?? "")
  };
}

function normalizedUrl(raw) {
  return raw.replace(/[.,;:!?`\\]+$/g, "");
}

function urlDisposition(raw) {
  const url = normalizedUrl(raw);
  if (/\\[nrt]|\$\{|…/.test(url)) {
    return { protected: true, locatorHash: hash(url), reason: "nonportable-or-template-locator" };
  }
  try {
    const parsed = new URL(url);
    const parameterNames = [...parsed.searchParams.keys()].map((key) => key.toLowerCase());
    const hasSecretParameter = parameterNames.some((key) => /token|signature|credential|auth|secret|key/.test(key));
    const hostname = parsed.hostname.toLowerCase();
    const protectedHost = [...protectedHosts].some((host) => hostname === host || hostname.endsWith(`.${host}`));
    if (protectedHost || hasSecretParameter || parsed.username || parsed.password) {
      return { protected: true, locatorHash: hash(url), reason: "protected-or-authenticated-locator" };
    }
    return { protected: false, url };
  } catch {
    return { protected: true, locatorHash: hash(url), reason: "nonportable-or-template-locator" };
  }
}

function listArtifacts(repoRoot, commit) {
  const output = execFileSync("git", ["ls-tree", "-r", "-l", commit], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024
  });
  return output.trim().split("\n").flatMap((line) => {
    const match = line.match(/^\d+ blob ([a-f0-9]+)\s+(\d+)\t(.+)$/);
    if (!match || !isRelevantPath(match[3])) return [];
    return [{ blob: match[1], bytes: Number(match[2]), path: match[3], kind: artifactKind(match[3]) }];
  });
}

function readBlob(repoRoot, blob) {
  return execFileSync("git", ["cat-file", "blob", blob], {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024
  });
}

function addLocation(entry, branch, file) {
  entry.branches.add(branch);
  entry.locations.add(`${branch}:${file}`);
}

export function integrationCatalogFingerprint(catalog) {
  const { catalogFingerprint: _ignored, ...payload } = catalog;
  return hash(JSON.stringify(payload));
}

export function buildFeatureEvalKnowledge({ repoRoot, manifest }) {
  const artifacts = [];
  const contents = new Map();
  const semantic = new Map();
  const publicUrls = new Map();
  const protectedLocators = new Map();
  const recordVariants = new Map();
  const documents = new Map();
  const stakeholders = new Map();
  const branchSummaries = [];

  for (const source of manifest.branches) {
    const branchArtifacts = listArtifacts(repoRoot, source.sourceCommit);
    const branchSemantic = new Set();
    const branchPublicUrls = new Set();
    const branchProtected = new Set();
    for (const artifact of branchArtifacts) {
      const mapped = {
        branch: source.branch,
        commit: source.sourceCommit,
        ...artifact,
        contentAddress: `git-blob:${artifact.blob}`
      };
      artifacts.push(mapped);
      if (!contents.has(artifact.blob)) contents.set(artifact.blob, readBlob(repoRoot, artifact.blob));
      const content = contents.get(artifact.blob);
      for (const id of content.match(semanticIdPattern) ?? []) {
        branchSemantic.add(id);
        if (!semantic.has(id)) semantic.set(id, { id, kind: id.split("-")[0], branches: new Set(), locations: new Set() });
        addLocation(semantic.get(id), source.branch, artifact.path);
      }
      for (const rawUrl of content.match(urlPattern) ?? []) {
        const disposition = urlDisposition(rawUrl);
        if (disposition.protected) {
          branchProtected.add(disposition.locatorHash);
          if (!protectedLocators.has(disposition.locatorHash)) {
            protectedLocators.set(disposition.locatorHash, { locatorHash: disposition.locatorHash, reason: disposition.reason, branches: new Set(), locations: new Set() });
          }
          addLocation(protectedLocators.get(disposition.locatorHash), source.branch, artifact.path);
        } else {
          branchPublicUrls.add(disposition.url);
          if (!publicUrls.has(disposition.url)) publicUrls.set(disposition.url, { url: disposition.url, branches: new Set(), locations: new Set() });
          addLocation(publicUrls.get(disposition.url), source.branch, artifact.path);
        }
      }

      const extension = path.extname(artifact.path);
      const records = extension === ".ts"
        ? recordsFromTypeScript(content, artifact.path)
        : extension === ".json"
          ? recordsFromJson(content)
          : [];
      for (const record of records) {
        const digest = hash(JSON.stringify(record));
        const key = `${record.id}:${digest}`;
        if (!recordVariants.has(key)) {
          recordVariants.set(key, { id: record.id, digest, fields: record, branches: new Set(), locations: new Set() });
        }
        addLocation(recordVariants.get(key), source.branch, artifact.path);
        if (record.kind === "person" && record.label) {
          const stakeholderKey = `${record.id}:${record.label}`;
          if (!stakeholders.has(stakeholderKey)) {
            stakeholders.set(stakeholderKey, {
              id: record.id,
              label: record.label,
              publicSafeSummary: record.publicSafeSummary ?? record.publicSummary ?? null,
              branches: new Set(),
              locations: new Set()
            });
          }
          addLocation(stakeholders.get(stakeholderKey), source.branch, artifact.path);
        }
      }

      const document = documentDigest(content, artifact.path);
      if (document) {
        const key = `${artifact.blob}:${document.title}`;
        if (!documents.has(key)) documents.set(key, { blob: artifact.blob, ...document, branches: new Set(), locations: new Set() });
        addLocation(documents.get(key), source.branch, artifact.path);
      }
    }
    branchSummaries.push({
      branch: source.branch,
      commit: source.sourceCommit,
      artifacts: branchArtifacts.length,
      semanticIds: branchSemantic.size,
      publicUrls: branchPublicUrls.size,
      protectedLocators: branchProtected.size
    });
  }

  const serializeSetEntry = (entry) => ({
    ...entry,
    branches: sorted(entry.branches),
    locations: sorted(entry.locations)
  });
  const catalog = {
    schemaVersion: 2,
    sourceCutAt: manifest.sourceCutAt,
    sourceManifestFingerprint: hash(JSON.stringify(manifest)),
    retention: {
      mode: "git-object-ancestry",
      branchRefsRequired: false,
      completeContentAvailableThroughAtlas: true
    },
    totals: {
      branches: branchSummaries.length,
      artifactMappings: artifacts.length,
      fullFidelityArtifacts: artifacts.length,
      uniqueBlobs: contents.size,
      semanticIds: semantic.size,
      recordVariants: recordVariants.size,
      documents: documents.size,
      publicUrls: publicUrls.size,
      protectedLocators: protectedLocators.size,
      namedStakeholders: stakeholders.size
    },
    branches: branchSummaries.sort((left, right) => left.branch.localeCompare(right.branch)),
    artifacts: artifacts.sort((left, right) => `${left.branch}:${left.path}`.localeCompare(`${right.branch}:${right.path}`)),
    semanticRecords: [...semantic.values()].map(serializeSetEntry).sort((left, right) => left.id.localeCompare(right.id)),
    recordVariants: [...recordVariants.values()].map(serializeSetEntry).sort((left, right) => `${left.id}:${left.digest}`.localeCompare(`${right.id}:${right.digest}`)),
    documents: [...documents.values()].map(serializeSetEntry).sort((left, right) => `${left.title}:${left.blob}`.localeCompare(`${right.title}:${right.blob}`)),
    sources: {
      public: [...publicUrls.values()].map(serializeSetEntry).sort((left, right) => left.url.localeCompare(right.url)),
      protected: [...protectedLocators.values()].map(serializeSetEntry).sort((left, right) => left.locatorHash.localeCompare(right.locatorHash))
    },
    stakeholders: [...stakeholders.values()].map(serializeSetEntry).sort((left, right) => `${left.label}:${left.id}`.localeCompare(`${right.label}:${right.id}`))
  };
  return { ...catalog, catalogFingerprint: integrationCatalogFingerprint(catalog) };
}

export function loadFeatureEvalKnowledge(repoRoot) {
  return JSON.parse(readFileSync(path.join(repoRoot, "docs/atlas/generated/feature-evals-knowledge.json"), "utf8"));
}

export function validateFeatureEvalKnowledge({ catalog, manifest }) {
  const errors = [];
  if (catalog.schemaVersion !== 2) errors.push("Feature-evals catalog requires schemaVersion 2");
  if (catalog.retention?.mode !== "git-object-ancestry" || catalog.retention?.branchRefsRequired !== false) {
    errors.push("Feature-evals catalog lacks the branch-independent full-fidelity retention contract");
  }
  const branches = new Map(catalog.branches.map((entry) => [entry.branch, entry]));
  for (const source of manifest.branches) {
    const observed = branches.get(source.branch);
    if (!observed) errors.push(`Missing source branch ${source.branch}`);
    else if (observed.commit !== source.sourceCommit) errors.push(`Source commit drift for ${source.branch}`);
    else if (!observed.artifacts || !observed.semanticIds) errors.push(`Empty knowledge inventory for ${source.branch}`);
  }
  if (catalog.sourceCutAt !== manifest.sourceCutAt) errors.push("Source cut timestamp does not match the integration manifest");
  if (catalog.totals.branches !== manifest.branches.length) errors.push("Knowledge catalog does not cover every manifest branch");
  if (catalog.catalogFingerprint !== integrationCatalogFingerprint(catalog)) errors.push("Knowledge catalog fingerprint is invalid");
  if (!catalog.totals.recordVariants || !catalog.totals.documents || !catalog.totals.publicUrls) {
    errors.push("Knowledge catalog lacks substantive records, documents, or public sources");
  }
  if (catalog.totals.fullFidelityArtifacts !== catalog.totals.artifactMappings) {
    errors.push("Not every source artifact has a full-fidelity Atlas content address");
  }
  return errors;
}

export function verifyFeatureEvalSourceArtifacts({ repoRoot, catalog, manifest }) {
  const expected = manifest.branches.flatMap((source) =>
    listArtifacts(repoRoot, source.sourceCommit).map((artifact) => ({
      branch: source.branch,
      commit: source.sourceCommit,
      ...artifact,
      contentAddress: `git-blob:${artifact.blob}`
    }))
  ).sort((left, right) => `${left.branch}:${left.path}`.localeCompare(`${right.branch}:${right.path}`));
  const observed = [...catalog.artifacts]
    .sort((left, right) => `${left.branch}:${left.path}`.localeCompare(`${right.branch}:${right.path}`));
  if (JSON.stringify(observed) === JSON.stringify(expected)) return [];
  const expectedKeys = new Set(expected.map((entry) => `${entry.branch}:${entry.path}:${entry.blob}`));
  const observedKeys = new Set(observed.map((entry) => `${entry.branch}:${entry.path}:${entry.blob}`));
  return [
    ...[...expectedKeys].filter((key) => !observedKeys.has(key)).map((key) => `Missing source artifact ${key}`),
    ...[...observedKeys].filter((key) => !expectedKeys.has(key)).map((key) => `Unexpected source artifact ${key}`)
  ];
}

export function readFeatureEvalArtifact({ repoRoot, catalog, branch, artifactPath, encoding = null }) {
  const artifact = catalog.artifacts.find((entry) => entry.branch === branch && entry.path === artifactPath);
  if (!artifact) throw new Error(`Unknown Atlas source artifact ${branch}:${artifactPath}`);
  const content = execFileSync("git", ["cat-file", "blob", artifact.blob], {
    cwd: repoRoot,
    maxBuffer: 256 * 1024 * 1024
  });
  if (content.length !== artifact.bytes) throw new Error(`Atlas source artifact size drift for ${branch}:${artifactPath}`);
  if (gitBlobHash(content) !== artifact.blob) throw new Error(`Atlas source artifact hash drift for ${branch}:${artifactPath}`);
  return encoding ? content.toString(encoding) : content;
}

export function verifyFeatureEvalHistory({ repoRoot, catalog, manifest, head = "HEAD" }) {
  const errors = [];
  const reachable = new Set(
    execFileSync("git", ["rev-list", "--objects", head], {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 512 * 1024 * 1024
    }).trim().split("\n").map((line) => line.split(" ")[0])
  );
  for (const source of manifest.branches) {
    if (!reachable.has(source.sourceCommit)) {
      errors.push(`Frozen source commit is not reachable from Atlas: ${source.branch}@${source.sourceCommit}`);
    }
  }
  const uniqueBlobs = new Set(catalog.artifacts.map(({ blob }) => blob));
  for (const blob of uniqueBlobs) {
    if (!reachable.has(blob)) errors.push(`Atlas source blob is unavailable from Atlas history: ${blob}`);
  }
  return errors;
}
