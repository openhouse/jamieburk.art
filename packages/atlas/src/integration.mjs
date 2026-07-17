import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const semanticIdPrefixes = [
  "AST",
  "CAP",
  "CLM",
  "COR",
  "DEC",
  "ENT",
  "EVID",
  "INQ",
  "INTAKE",
  "INT",
  "KB",
  "LEAD",
  "MEDIA",
  "OBS",
  "PROOF",
  "PROP",
  "PUB",
  "READ",
  "SRC",
  "TASK"
];
const semanticIdAlternation = semanticIdPrefixes.join("|");
const semanticIdPattern = new RegExp(`\\b(?:${semanticIdAlternation})-[A-Z0-9][A-Z0-9._-]*`, "g");
const semanticIdValuePattern = new RegExp(`^(?:${semanticIdAlternation})-[A-Z0-9][A-Z0-9._-]*$`);
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

function mediaType(file) {
  const extension = path.extname(file).toLowerCase();
  return {
    ".csv": "text/csv",
    ".html": "text/html",
    ".json": "application/json",
    ".jsonl": "application/x-ndjson",
    ".md": "text/markdown",
    ".mjs": "text/javascript",
    ".ts": "text/typescript",
    ".txt": "text/plain"
  }[extension] ?? "application/octet-stream";
}

function csvHeader(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) {
      values.push(sanitize(current));
      current = "";
    } else current += character;
  }
  values.push(sanitize(current));
  return values;
}

function jsonShape(value) {
  const counts = { arrays: 0, objects: 0, scalars: 0 };
  const keys = new Set();
  const visit = (nested) => {
    if (Array.isArray(nested)) {
      counts.arrays += 1;
      nested.forEach(visit);
    } else if (nested && typeof nested === "object") {
      counts.objects += 1;
      Object.keys(nested).forEach((key) => keys.add(key));
      Object.values(nested).forEach(visit);
    } else counts.scalars += 1;
  };
  visit(value);
  return { ...counts, keys: [...keys].sort() };
}

function structuralProfile(content, file) {
  const extension = path.extname(file).toLowerCase();
  const lines = content ? content.split(/\r?\n/).length : 0;
  const profile = { extension, mediaType: mediaType(file), lines };
  if (extension === ".md") {
    return {
      ...profile,
      headings: [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({ level: match[1].length, text: sanitize(match[2]) })),
      fencedCodeBlocks: [...content.matchAll(/^```/gm)].length / 2,
      tableRows: [...content.matchAll(/^\|.*\|\s*$/gm)].length
    };
  }
  if (extension === ".json") {
    try {
      const parsed = JSON.parse(content);
      return { ...profile, valid: true, topLevel: Array.isArray(parsed) ? "array" : typeof parsed, ...jsonShape(parsed) };
    } catch {
      return { ...profile, valid: false };
    }
  }
  if (extension === ".jsonl") {
    const rows = content.split(/\r?\n/).filter(Boolean);
    const parsed = [];
    for (const row of rows) {
      try { parsed.push(JSON.parse(row)); } catch { /* represented by validRows */ }
    }
    return { ...profile, rows: rows.length, validRows: parsed.length, ...jsonShape(parsed) };
  }
  if (extension === ".csv") {
    const rows = content.split(/\r?\n/).filter(Boolean);
    return { ...profile, columns: rows.length ? csvHeader(rows[0]) : [], rows: Math.max(0, rows.length - 1) };
  }
  if ([".ts", ".mjs"].includes(extension)) {
    const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, extension === ".ts" ? ts.ScriptKind.TS : ts.ScriptKind.JS);
    const exports = new Set();
    let imports = 0;
    let declarations = 0;
    const visit = (node) => {
      if (ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node)) imports += 1;
      if (ts.isVariableStatement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
        declarations += 1;
        if (node.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword)) {
          if (ts.isVariableStatement(node)) {
            for (const declaration of node.declarationList.declarations) {
              if (ts.isIdentifier(declaration.name)) exports.add(declaration.name.text);
            }
          } else if (node.name) exports.add(node.name.text);
        }
      }
      if (ts.isExportAssignment(node)) exports.add("default");
      ts.forEachChild(node, visit);
    };
    visit(source);
    return { ...profile, imports, declarations, exports: [...exports].sort() };
  }
  if (extension === ".html") {
    return { ...profile, title: sanitize(content.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ""), headings: [...content.matchAll(/<h[1-6]\b/gi)].length };
  }
  return profile;
}

function baseKnowledgeClasses(kind, file) {
  const classes = new Set({
    evaluation: ["situated-evaluation"],
    "knowledge-document": ["narrative-context"],
    "knowledge-tooling": ["operational-procedure"],
    "source-corpus": ["source-dataset"],
    "structured-knowledge": ["structured-records"]
  }[kind] ?? ["knowledge-artifact"]);
  const extension = path.extname(file).toLowerCase();
  if (extension === ".md") classes.add("semantic-markdown");
  if ([".json", ".jsonl"].includes(extension)) classes.add("structured-dataset");
  if (extension === ".csv") classes.add("tabular-dataset");
  if ([".ts", ".mjs"].includes(extension)) classes.add("executable-schema-or-procedure");
  if (extension === ".html") classes.add("web-document");
  if (extension === ".txt") classes.add("plain-text-context");
  return classes;
}

function nativeTarget(type, id) {
  return `atlas://${type}/${encodeURIComponent(id)}`;
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
  if (!semanticIdValuePattern.test(fields.id ?? "")) return null;
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
    if (typeof value.id === "string" && semanticIdValuePattern.test(value.id)) {
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
      if (!contents.has(artifact.blob)) contents.set(artifact.blob, readBlob(repoRoot, artifact.blob));
      const content = contents.get(artifact.blob);
      const sha256 = hash(content);
      const sourceObjectId = `atlas://source-objects/sha256/${sha256}`;
      const mapped = {
        branch: source.branch,
        commit: source.sourceCommit,
        ...artifact,
        contentAddress: sourceObjectId,
        sourceObjectId,
        sha256,
        accessionProvenance: {
          system: "git",
          blob: artifact.blob,
          branch: source.branch,
          commit: source.sourceCommit,
          path: artifact.path
        }
      };
      artifacts.push(mapped);
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
  const semanticRecords = [...semantic.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("semantic-records", entry.id) }))
    .sort((left, right) => left.id.localeCompare(right.id));
  const serializedVariants = [...recordVariants.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("record-variants", `${entry.id}/${entry.digest}`) }))
    .sort((left, right) => `${left.id}:${left.digest}`.localeCompare(`${right.id}:${right.digest}`));
  const serializedDocuments = [...documents.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("documents", `${hash(contents.get(entry.blob))}/${entry.title}`) }))
    .sort((left, right) => `${left.title}:${left.blob}`.localeCompare(`${right.title}:${right.blob}`));
  const serializedPublicSources = [...publicUrls.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("source-locators/public", hash(entry.url)) }))
    .sort((left, right) => left.url.localeCompare(right.url));
  const serializedProtectedSources = [...protectedLocators.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("source-locators/protected", entry.locatorHash) }))
    .sort((left, right) => left.locatorHash.localeCompare(right.locatorHash));
  const serializedStakeholders = [...stakeholders.values()].map(serializeSetEntry)
    .map((entry) => ({ ...entry, address: nativeTarget("stakeholders", `${entry.id}/${entry.label}`) }))
    .sort((left, right) => `${left.label}:${left.id}`.localeCompare(`${right.label}:${right.id}`));
  const targetsByLocation = new Map();
  const addTarget = (location, target) => {
    if (!targetsByLocation.has(location)) targetsByLocation.set(location, new Set());
    targetsByLocation.get(location).add(target);
  };
  for (const entry of semanticRecords) for (const location of entry.locations) addTarget(location, entry.address);
  for (const entry of serializedVariants) for (const location of entry.locations) addTarget(location, entry.address);
  for (const entry of serializedDocuments) for (const location of entry.locations) addTarget(location, entry.address);
  for (const entry of serializedPublicSources) for (const location of entry.locations) addTarget(location, entry.address);
  for (const entry of serializedProtectedSources) for (const location of entry.locations) addTarget(location, entry.address);
  for (const entry of serializedStakeholders) for (const location of entry.locations) addTarget(location, entry.address);

  const sourceObjects = new Map();
  for (const artifact of artifacts) {
    const content = contents.get(artifact.blob);
    const location = `${artifact.branch}:${artifact.path}`;
    const classes = baseKnowledgeClasses(artifact.kind, artifact.path);
    const targets = new Set([
      artifact.sourceObjectId,
      nativeTarget("source-profiles/sha256", artifact.sha256)
    ]);
    if (artifact.kind === "evaluation") targets.add(nativeTarget("source-evaluations/sha256", artifact.sha256));
    if (artifact.kind === "knowledge-tooling") targets.add(nativeTarget("procedures/sha256", artifact.sha256));
    if (artifact.kind === "source-corpus") targets.add(nativeTarget("datasets/sha256", artifact.sha256));
    if (artifact.kind === "knowledge-document") targets.add(nativeTarget("narratives/sha256", artifact.sha256));
    const mappedTargets = [...(targetsByLocation.get(location) ?? [])];
    if (mappedTargets.some((target) => target.startsWith("atlas://semantic-records/"))) classes.add("semantic-identifiers");
    if (mappedTargets.some((target) => target.startsWith("atlas://record-variants/"))) classes.add("heteroglossic-record-variants");
    if (mappedTargets.some((target) => target.startsWith("atlas://source-locators/"))) classes.add("source-locators");
    if (mappedTargets.some((target) => target.startsWith("atlas://stakeholders/"))) classes.add("stakeholder-credit");
    artifact.knowledgeClasses = [...classes].sort();
    artifact.migration = {
      status: "native",
      disposition: "native-component-with-full-fidelity-source-object",
      nativeTargets: [...targets].sort(),
      residualKnowledge: "none-known",
      reviewability: "structural-profile-and-full-fidelity-object"
    };
    const existing = sourceObjects.get(artifact.sha256);
    if (existing) {
      existing.accessionLocations.push(location);
      if (!existing.historicalGitBlobs.includes(artifact.blob)) existing.historicalGitBlobs.push(artifact.blob);
      existing.knowledgeClasses = sorted([...existing.knowledgeClasses, ...artifact.knowledgeClasses]);
      existing.nativeTargets = sorted([...existing.nativeTargets, ...artifact.migration.nativeTargets]);
    } else {
      sourceObjects.set(artifact.sha256, {
        id: artifact.sourceObjectId,
        sha256: artifact.sha256,
        bytes: Buffer.byteLength(content),
        mediaType: mediaType(artifact.path),
        profile: structuralProfile(content, artifact.path),
        knowledgeClasses: artifact.knowledgeClasses,
        nativeTargets: artifact.migration.nativeTargets,
        historicalGitBlobs: [artifact.blob],
        accessionLocations: [location]
      });
    }
  }
  for (const sourceObject of sourceObjects.values()) {
    sourceObject.historicalGitBlobs.sort();
    sourceObject.accessionLocations.sort();
  }
  const catalog = {
    schemaVersion: 3,
    sourceCutAt: manifest.sourceCutAt,
    sourceManifestFingerprint: hash(JSON.stringify(manifest)),
    retention: {
      mode: "atlas-native-source-objects",
      branchRefsRequired: false,
      gitRequiredAfterMaterialization: false,
      accessionAssociationsAreProvenanceOnly: true,
      completeContentAvailableThroughAtlas: true
    },
    totals: {
      branches: branchSummaries.length,
      artifactMappings: artifacts.length,
      fullFidelityArtifacts: artifacts.length,
      uniqueBlobs: contents.size,
      nativeSourceObjects: sourceObjects.size,
      semanticIds: semantic.size,
      recordVariants: recordVariants.size,
      documents: documents.size,
      publicUrls: publicUrls.size,
      protectedLocators: protectedLocators.size,
      namedStakeholders: stakeholders.size
    },
    branches: branchSummaries.sort((left, right) => left.branch.localeCompare(right.branch)),
    artifacts: artifacts.sort((left, right) => `${left.branch}:${left.path}`.localeCompare(`${right.branch}:${right.path}`)),
    sourceObjects: [...sourceObjects.values()].sort((left, right) => left.sha256.localeCompare(right.sha256)),
    semanticRecords,
    recordVariants: serializedVariants,
    documents: serializedDocuments,
    sources: {
      public: serializedPublicSources,
      protected: serializedProtectedSources
    },
    stakeholders: serializedStakeholders
  };
  return { ...catalog, catalogFingerprint: integrationCatalogFingerprint(catalog) };
}

export function loadFeatureEvalKnowledge(repoRoot) {
  return JSON.parse(readFileSync(path.join(repoRoot, "docs/atlas/generated/feature-evals-knowledge.json"), "utf8"));
}

function countBy(values, selector) {
  const counts = new Map();
  for (const value of values) {
    const key = selector(value);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()].sort(([left], [right]) => left.localeCompare(right));
}

export function renderAccessionMigrationReport(catalog) {
  const kindRows = countBy(catalog.artifacts, ({ kind }) => kind)
    .map(([kind, count]) => `| ${kind} | ${count} |`)
    .join("\n");
  const extensionRows = countBy(catalog.artifacts, ({ path: artifactPath }) => path.extname(artifactPath) || "(none)")
    .map(([extension, count]) => `| ${extension} | ${count} |`)
    .join("\n");
  const classRows = countBy(catalog.artifacts.flatMap(({ knowledgeClasses }) => knowledgeClasses), (value) => value)
    .map(([knowledgeClass, count]) => `| ${knowledgeClass} | ${count} |`)
    .join("\n");
  return `# Atlas accession migration report

This generated report makes the migration from the fourteen \`feature/evals-*\`
accession sources inspectable without treating Git associations as Atlas access
protocols. Historical branches, commits, paths, and Git blob identities remain
provenance. Native SHA-256 source objects, structural profiles, knowledge classes,
and semantic targets are the retained Atlas representations.

## Closure

- Source branches accessioned: ${catalog.totals.branches}
- Artifact associations dispositioned: ${catalog.totals.artifactMappings}
- Native source objects fixed by SHA-256: ${catalog.totals.nativeSourceObjects}
- Semantic identities indexed: ${catalog.totals.semanticIds}
- Heteroglossic record variants retained: ${catalog.totals.recordVariants}
- Narrative document digests retained: ${catalog.totals.documents}
- Public locators retained: ${catalog.totals.publicUrls}
- Protected locators retained by non-reversible hash: ${catalog.totals.protectedLocators}
- Artifacts with known residual knowledge: ${catalog.artifacts.filter(({ migration }) => migration.residualKnowledge !== "none-known").length}
- Catalog fingerprint: \`${catalog.catalogFingerprint}\`

## Artifact dispositions

| Atlas artifact kind | Associations |
| --- | ---: |
${kindRows}

## Format coverage

| Format | Associations |
| --- | ---: |
${extensionRows}

## Knowledge-class coverage

One artifact may carry more than one class.

| Knowledge class | Associations |
| --- | ---: |
${classRows}

## Review boundary

Automated closure means that every accession artifact has a recoverable native
source object, a format-aware structural profile, declared knowledge classes,
native targets, and no known undispositioned remainder. It does not mean an agent
has certified social meaning, situated experience, voice, or interpretive
equivalence. Those questions remain fail-closed human gates in the Atlas suite.
`;
}

export function validateFeatureEvalKnowledge({ catalog, manifest }) {
  const errors = [];
  if (catalog.schemaVersion !== 3) errors.push("Feature-evals catalog requires schemaVersion 3");
  if (catalog.retention?.mode !== "atlas-native-source-objects" || catalog.retention?.branchRefsRequired !== false || catalog.retention?.gitRequiredAfterMaterialization !== false) {
    errors.push("Feature-evals catalog lacks the native, branch-independent full-fidelity retention contract");
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
  if (catalog.totals.nativeSourceObjects !== catalog.sourceObjects?.length || catalog.totals.nativeSourceObjects !== catalog.totals.uniqueBlobs) {
    errors.push("Native source-object census does not close over the accession blobs");
  }
  for (const artifact of catalog.artifacts) {
    if (artifact.contentAddress !== artifact.sourceObjectId || artifact.sourceObjectId !== `atlas://source-objects/sha256/${artifact.sha256}`) {
      errors.push(`Artifact lacks a native content address: ${artifact.branch}:${artifact.path}`);
    }
    if (artifact.migration?.status !== "native" || artifact.migration?.residualKnowledge !== "none-known" || artifact.migration?.nativeTargets?.length < 2) {
      errors.push(`Artifact migration is incomplete: ${artifact.branch}:${artifact.path}`);
    }
  }
  return errors;
}

export function verifyFeatureEvalSourceArtifacts({ repoRoot, catalog, manifest }) {
  const expected = manifest.branches.flatMap((source) =>
    listArtifacts(repoRoot, source.sourceCommit).map((artifact) => ({
      branch: source.branch,
      commit: source.sourceCommit,
      ...artifact
    }))
  ).sort((left, right) => `${left.branch}:${left.path}`.localeCompare(`${right.branch}:${right.path}`));
  const observed = catalog.artifacts.map(({ branch, commit, blob, bytes, path: artifactPath, kind }) => ({
    branch, commit, blob, bytes, path: artifactPath, kind
  }))
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
