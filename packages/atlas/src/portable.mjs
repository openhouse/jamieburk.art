import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const fixedPortableFiles = Object.freeze([
  "docs/atlas/README.md",
  "docs/atlas/architecture.md",
  "docs/atlas/deprecation.md",
  "docs/atlas/evals/hill-climb.md",
  "docs/atlas/feature-evals-integration.json",
  "docs/atlas/generated/atlas.graph.json",
  "docs/atlas/generated/feature-evals-knowledge.json",
  "docs/atlas/ontology.json",
  "docs/atlas/record-dispositions.json",
  "docs/atlas/records/README.md",
  "docs/atlas/records/canonical.json",
  "docs/atlas/source-integration.md",
  "docs/atlas/stakeholder-credit.json",
  "docs/atlas/variant-policy.json",
  "docs/knowledge-bank/media-provenance.json",
  "evals/atlas/human-assessment.latest.json",
  "evals/atlas/human-judge.md",
  "evals/atlas/lineage.json",
  "evals/atlas/runs/feature-atlas-o.json",
  "evals/atlas/suite.json",
  "evals/atlas/tasks.json"
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

function walk(directory, extension) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute, extension);
    return entry.isFile() && (!extension || entry.name.endsWith(extension)) ? [absolute] : [];
  }).sort();
}

function mediaType(file) {
  if (file.endsWith(".md")) return "text/markdown";
  if (file.endsWith(".json")) return "application/json";
  return "application/octet-stream";
}

export function portableAtlasFiles(repoRoot) {
  const pages = walk(path.join(repoRoot, "docs/atlas/pages"), ".md")
    .map((file) => path.relative(repoRoot, file));
  return [...new Set([...fixedPortableFiles, ...pages])].sort();
}

export function buildPortableAtlasManifest({ repoRoot, compiled, catalog }) {
  const files = portableAtlasFiles(repoRoot).map((relativePath) => {
    const content = readFileSync(path.join(repoRoot, relativePath));
    return {
      path: relativePath,
      bytes: content.length,
      sha256: hash(content),
      mediaType: mediaType(relativePath)
    };
  });
  const byBlob = new Map();
  for (const artifact of catalog.artifacts) {
    const current = byBlob.get(artifact.blob);
    if (current && current.bytes !== artifact.bytes) {
      throw new Error(`Inconsistent byte count for source blob ${artifact.blob}`);
    }
    byBlob.set(artifact.blob, { sha1: artifact.blob, bytes: artifact.bytes });
  }
  return {
    schemaVersion: 1,
    packageId: "atlas-portable-situated-knowledge-universe",
    candidateFingerprint: compiled.candidateFingerprint,
    recordStoreFingerprint: compiled.recordStore.fingerprint,
    sourceCatalogFingerprint: catalog.catalogFingerprint,
    portabilityContract: {
      branchRefsRequired: false,
      gitRequiredAfterMaterialization: false,
      markdownIsHumanLayerNotEntirePackage: true
    },
    files,
    sourceBlobs: [...byBlob.values()].sort((left, right) => left.sha1.localeCompare(right.sha1)),
    totals: {
      files: files.length,
      markdownPages: compiled.metrics.pages,
      canonicalRecords: compiled.metrics.canonicalRecords,
      artifactMappings: catalog.totals.artifactMappings,
      uniqueSourceBlobs: byBlob.size
    }
  };
}

function readGitBlobs(repoRoot, blobIds) {
  if (!blobIds.length) return new Map();
  const output = execFileSync("git", ["cat-file", "--batch"], {
    cwd: repoRoot,
    input: `${blobIds.join("\n")}\n`,
    maxBuffer: 512 * 1024 * 1024
  });
  const blobs = new Map();
  let offset = 0;
  for (const requested of blobIds) {
    const newline = output.indexOf(10, offset);
    if (newline === -1) throw new Error(`Missing Git batch header for ${requested}`);
    const header = output.subarray(offset, newline).toString("utf8");
    const [objectId, type, rawSize] = header.split(" ");
    if (type !== "blob") throw new Error(`Git object ${requested} is ${type ?? "missing"}, not a blob`);
    const size = Number(rawSize);
    const start = newline + 1;
    const end = start + size;
    const content = output.subarray(start, end);
    if (objectId !== requested || content.length !== size) {
      throw new Error(`Git batch response drift for ${requested}`);
    }
    blobs.set(requested, content);
    offset = end + 1;
  }
  return blobs;
}

export function validatePortableAtlasSource({ repoRoot, compiled, catalog }) {
  const errors = [];
  let manifest;
  try {
    manifest = buildPortableAtlasManifest({ repoRoot, compiled, catalog });
  } catch (error) {
    return { errors: [error.message], manifest: null };
  }
  for (const file of manifest.files) {
    if (path.isAbsolute(file.path) || file.path.split(path.sep).includes("..")) {
      errors.push(`Portable file path escapes the package: ${file.path}`);
    }
  }
  if (manifest.totals.markdownPages !== compiled.pages.length) {
    errors.push("Portable manifest omits semantic Markdown pages");
  }
  if (manifest.totals.canonicalRecords !== Object.values(compiled.recordStore.counts).reduce((sum, count) => sum + count, 0)) {
    errors.push("Portable manifest canonical record count drifted");
  }
  if (manifest.totals.uniqueSourceBlobs !== catalog.totals.uniqueBlobs) {
    errors.push("Portable manifest omits full-fidelity source blobs");
  }
  const generatedGraph = JSON.parse(readFileSync(path.join(repoRoot, "docs/atlas/generated/atlas.graph.json"), "utf8"));
  if (generatedGraph.candidateFingerprint !== compiled.candidateFingerprint) {
    errors.push("Portable manifest includes a stale generated Atlas graph");
  }
  if (catalog.artifacts.some(({ blob, contentAddress }) => contentAddress !== `git-blob:${blob}`)) {
    errors.push("Portable source artifact lacks its content address");
  }
  return { errors, manifest };
}

export function materializePortableAtlasBundle({ repoRoot, bundleRoot, compiled, catalog }) {
  const { errors, manifest } = validatePortableAtlasSource({ repoRoot, compiled, catalog });
  if (errors.length) throw new Error(errors.join("\n"));
  for (const file of manifest.files) {
    const destination = path.join(bundleRoot, "package", file.path);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, readFileSync(path.join(repoRoot, file.path)));
  }
  const blobs = readGitBlobs(repoRoot, manifest.sourceBlobs.map(({ sha1 }) => sha1));
  for (const source of manifest.sourceBlobs) {
    const content = blobs.get(source.sha1);
    if (content.length !== source.bytes || gitBlobHash(content) !== source.sha1) {
      throw new Error(`Source blob failed fixity before export: ${source.sha1}`);
    }
    const destination = path.join(bundleRoot, "source-blobs", source.sha1);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, content);
  }
  writeFileSync(path.join(bundleRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

export function verifyPortableAtlasBundle(bundleRoot) {
  const errors = [];
  const manifestPath = path.join(bundleRoot, "manifest.json");
  if (!existsSync(manifestPath)) return ["Portable Atlas bundle lacks manifest.json"];
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  for (const file of manifest.files ?? []) {
    if (path.isAbsolute(file.path) || file.path.split(path.sep).includes("..")) {
      errors.push(`Portable file path escapes the package: ${file.path}`);
      continue;
    }
    const absolute = path.join(bundleRoot, "package", file.path);
    if (!existsSync(absolute)) {
      errors.push(`Portable file is missing: ${file.path}`);
      continue;
    }
    const content = readFileSync(absolute);
    if (content.length !== file.bytes || hash(content) !== file.sha256) {
      errors.push(`Portable file failed fixity: ${file.path}`);
    }
  }
  for (const source of manifest.sourceBlobs ?? []) {
    const absolute = path.join(bundleRoot, "source-blobs", source.sha1);
    if (!existsSync(absolute)) {
      errors.push(`Portable source blob is missing: ${source.sha1}`);
      continue;
    }
    const content = readFileSync(absolute);
    if (content.length !== source.bytes || gitBlobHash(content) !== source.sha1) {
      errors.push(`Portable source blob failed fixity: ${source.sha1}`);
    }
  }
  const pageRoot = path.join(bundleRoot, "package/docs/atlas/pages");
  const pages = walk(pageRoot, ".md").map((file) => ({ file, data: matter(readFileSync(file, "utf8")).data }));
  const pageIds = new Set(pages.map(({ data }) => data.id));
  for (const { file, data } of pages) {
    for (const relation of data.relations ?? []) {
      if (!pageIds.has(relation.target)) {
        errors.push(`Portable relation target is missing: ${path.relative(pageRoot, file)} -> ${relation.target}`);
      }
    }
  }
  if (pages.length !== manifest.totals?.markdownPages) {
    errors.push(`Portable Markdown page count drift: ${pages.length}`);
  }
  const recordStore = JSON.parse(readFileSync(path.join(bundleRoot, "package/docs/atlas/records/canonical.json"), "utf8"));
  if (recordStore.fingerprint !== manifest.recordStoreFingerprint) {
    errors.push("Portable canonical record fingerprint drifted");
  }
  const catalog = JSON.parse(readFileSync(path.join(bundleRoot, "package/docs/atlas/generated/feature-evals-knowledge.json"), "utf8"));
  if (catalog.catalogFingerprint !== manifest.sourceCatalogFingerprint) {
    errors.push("Portable source catalog fingerprint drifted");
  }
  const graph = JSON.parse(readFileSync(path.join(bundleRoot, "package/docs/atlas/generated/atlas.graph.json"), "utf8"));
  if (graph.candidateFingerprint !== manifest.candidateFingerprint) {
    errors.push("Portable generated graph is not bound to the exported candidate");
  }
  return errors;
}
