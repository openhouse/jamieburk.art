import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { knowledgeBank } from "../../../apps/www/src/data/knowledge-bank/records.ts";
import {
  atlasPageSchema,
  evalIntegrationManifestSchema
} from "./schema.mjs";

export const defaultRepoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
);

const inversePredicates = new Map([
  ["uses-method", "used-by"],
  ["used-by", "uses-method"],
  ["guards-with", "guards"],
  ["guards", "guards-with"],
  ["applies-concept", "applied-by"],
  ["applied-by", "applies-concept"],
  ["governed-by", "governs"],
  ["governs", "governed-by"],
  ["related-to", "related-to"]
]);

const requiredHeadings = {
  project: [
    "What this is",
    "Human situation",
    "What Jamie did",
    "What became usable",
    "Evidence and limits",
    "Open questions",
    "Public projection",
    "Related pages"
  ],
  method: ["What this is", "Contract", "Evidence and limits", "Related pages"],
  concept: ["What this is", "Contract", "Evidence and limits", "Related pages"]
};

const unsafeTextPatterns = [
  ["local-user-path", /\/Users\//i],
  ["local-volume-path", /\/Volumes\//i],
  ["temporary-research-path", /\/private\/tmp\//i],
  ["icloud-container-path", /Mobile Documents\/com~apple~CloudDocs/i],
  ["raw-private-transcript", /raw private transcript/i]
];

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sorted(values) {
  return [...new Set(values)].sort();
}

function intersects(values, candidates) {
  return values.some((value) => candidates.has(value));
}

function walkMarkdown(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkMarkdown(absolute);
      return entry.isFile() && entry.name.endsWith(".md") ? [absolute] : [];
    })
    .sort();
}

function walkImplementationFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) return walkImplementationFiles(absolute);
      return entry.isFile() && [".json", ".mjs"].includes(path.extname(entry.name)) ? [absolute] : [];
    })
    .sort();
}

function markdownTargets(page) {
  const targets = [];
  const pattern = /\[[^\]]+\]\(([^)]+\.md(?:#[^)]+)?)\)/g;
  for (const match of page.body.matchAll(pattern)) {
    const rawTarget = match[1].split("#")[0];
    if (!rawTarget.startsWith("http")) {
      targets.push(path.normalize(path.join(path.dirname(page.relativePath), rawTarget)));
    }
  }
  return sorted(targets);
}

export function loadAtlasPages(repoRoot = defaultRepoRoot) {
  const pagesRoot = path.join(repoRoot, "docs/atlas/pages");
  return walkMarkdown(pagesRoot).map((file) => {
    const raw = readFileSync(file, "utf8");
    const parsed = matter(raw);
    return {
      ...atlasPageSchema.parse(parsed.data),
      body: parsed.content.trim(),
      raw,
      file,
      relativePath: path.relative(pagesRoot, file)
    };
  });
}

export function loadIntegrationManifest(repoRoot = defaultRepoRoot) {
  const file = path.join(repoRoot, "docs/atlas/feature-evals-integration.json");
  return evalIntegrationManifestSchema.parse(JSON.parse(readFileSync(file, "utf8")));
}

export function selectProjectSlice(bank, canonical) {
  const primaryEntity = bank.entities.find((entity) => entity.id === canonical.entityId);
  const entityIds = new Set([
    canonical.entityId,
    ...(primaryEntity?.relatedEntityIds ?? [])
  ]);
  const claims = bank.claims.filter((claim) => claim.project === canonical.projectKey);
  const claimIds = new Set(claims.map(({ id }) => id));
  const intake = bank.intake.filter((item) =>
    intersects(item.entityIds, entityIds) || intersects(item.claimIds, claimIds)
  );
  const intakeIds = new Set(intake.map(({ id }) => id));
  const researchTasks = bank.researchTasks.filter((task) =>
    task.project === canonical.projectKey ||
    intersects(task.claimIds, claimIds) ||
    intersects(task.intakeIds, intakeIds)
  );
  const researchTaskIds = new Set(researchTasks.map(({ id }) => id));
  const researchInquiries = bank.researchInquiries.filter((inquiry) =>
    inquiry.project === canonical.projectKey || claimIds.has(inquiry.claimId)
  );
  const sourceIds = new Set([
    ...intake.flatMap((item) => item.sourceIds),
    ...claims.flatMap((claim) => claim.evidence.map(({ sourceId }) => sourceId)),
    ...researchTasks.flatMap((task) => task.sourceIds),
    ...researchInquiries.flatMap((inquiry) => inquiry.sourceIds)
  ]);
  const sources = bank.sources.filter(({ id }) => sourceIds.has(id));
  const sourceReadings = bank.sourceReadings.filter(({ sourceId }) => sourceIds.has(sourceId));
  const projectionDecisions = bank.projectionDecisions.filter(({ claimId }) => claimIds.has(claimId));
  const corrections = bank.corrections.filter(({ claimId }) => claimIds.has(claimId));
  const pages = bank.pages.filter((page) =>
    page.occurrences.some(({ claimId }) => claimIds.has(claimId))
  );
  const entities = bank.entities.filter(({ id }) => entityIds.has(id));

  const collections = {
    entities,
    intake,
    sources,
    sourceReadings,
    claims,
    researchTasks,
    researchInquiries,
    projectionDecisions,
    corrections,
    pages
  };
  const recordIds = Object.fromEntries(
    Object.entries(collections).map(([name, records]) => [name, sorted(records.map(({ id }) => id))])
  );
  const snapshot = Object.fromEntries(
    Object.entries(collections).map(([name, records]) => [name, records])
  );

  return {
    recordIds,
    counts: Object.fromEntries(Object.entries(recordIds).map(([name, ids]) => [name, ids.length])),
    fingerprint: hash(JSON.stringify(snapshot))
  };
}

function issue(code, message, page) {
  return { code, message, page: page?.relativePath ?? null };
}

export function validateAtlas({
  pages,
  bank = knowledgeBank,
  manifest,
  repoRoot = defaultRepoRoot,
  enforceRepositoryBoundary = true
}) {
  const errors = [];
  const pageById = new Map();
  const pageByPath = new Map(pages.map((page) => [page.relativePath, page]));
  const duplicateIds = pages.map(({ id }) => id).filter((id, index, ids) => ids.indexOf(id) !== index);
  const duplicateSlugs = pages.map(({ slug }) => slug).filter((slug, index, slugs) => slugs.indexOf(slug) !== index);
  for (const id of sorted(duplicateIds)) errors.push(issue("identity", `Duplicate page ID ${id}`));
  for (const slug of sorted(duplicateSlugs)) errors.push(issue("identity", `Duplicate slug ${slug}`));
  for (const page of pages) pageById.set(page.id, page);

  for (const page of pages) {
    if (path.basename(page.relativePath, ".md") !== page.slug) {
      errors.push(issue("identity", `Slug ${page.slug} does not match its filename`, page));
    }
    const headings = new Set([...page.body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim()));
    for (const heading of requiredHeadings[page.kind]) {
      if (!headings.has(heading)) errors.push(issue("markdown", `Missing required heading: ${heading}`, page));
    }
    for (const [reason, pattern] of unsafeTextPatterns) {
      if (pattern.test(page.raw)) errors.push(issue("safety", `${reason} appears in semantic Markdown`, page));
    }
    const correctionPath = path.resolve(repoRoot, page.authority.correctionRoute);
    if (!correctionPath.startsWith(repoRoot) || !existsSync(correctionPath)) {
      errors.push(issue("governance", `Correction route does not resolve: ${page.authority.correctionRoute}`, page));
    }

    if (page.canonical) {
      const entity = bank.entities.find(({ id }) => id === page.canonical.entityId);
      if (!entity) errors.push(issue("canonical", `Unknown canonical entity ${page.canonical.entityId}`, page));
      else if (entity.projectKey !== page.canonical.projectKey) {
        errors.push(issue("canonical", `Entity ${entity.id} does not own project key ${page.canonical.projectKey}`, page));
      }
      const slice = selectProjectSlice(bank, page.canonical);
      if (!slice.counts.entities || !slice.counts.claims || !slice.counts.sources) {
        errors.push(issue("migration", "Complete project slice is missing entities, claims, or sources", page));
      }
      const evidenceSourceIds = new Set(
        bank.claims
          .filter(({ project }) => project === page.canonical.projectKey)
          .flatMap((claim) => claim.evidence.map(({ sourceId }) => sourceId))
      );
      for (const sourceId of evidenceSourceIds) {
        if (!slice.recordIds.sources.includes(sourceId)) {
          errors.push(issue("migration", `Project slice omitted evidence source ${sourceId}`, page));
        }
      }
    }

    const links = new Set(markdownTargets(page));
    for (const relation of page.relations) {
      const target = pageById.get(relation.target);
      if (!target) {
        errors.push(issue("relation", `Unknown relation target ${relation.target}`, page));
        continue;
      }
      if (!links.has(target.relativePath)) {
        errors.push(issue("markdown", `Relation target ${relation.target} lacks a standard Markdown link`, page));
      }
      if (relation.reciprocal) {
        const inverse = inversePredicates.get(relation.predicate);
        const matched = target.relations.some((candidate) =>
          candidate.target === page.id && candidate.predicate === inverse && candidate.reciprocal
        );
        if (!matched) errors.push(issue("relation", `${relation.predicate} -> ${target.id} lacks ${inverse} reciprocal`, page));
      }
    }
    for (const link of links) {
      if (!pageByPath.has(link)) errors.push(issue("markdown", `Markdown page link does not resolve: ${link}`, page));
    }
  }

  const expectedBranches = "ABCDEFGHIJKLMN".split("").map((letter) => `feature/evals-${letter}`);
  const observedBranches = manifest.branches.map(({ branch }) => branch).sort();
  if (JSON.stringify(observedBranches) !== JSON.stringify(expectedBranches)) {
    errors.push(issue("integration", "Eval integration manifest must account for feature/evals-A through feature/evals-N"));
  }
  if (!manifest.branches.some(({ branch, sourceCommit }) =>
    branch === manifest.base.branch && sourceCommit === manifest.base.commit
  )) {
    errors.push(issue("integration", "Base branch commit does not match its integration entry"));
  }

  if (enforceRepositoryBoundary && existsSync(path.join(repoRoot, "apps/www/src/app/atlas"))) {
    errors.push(issue("boundary", "Atlas must not create a public application route"));
  }
  if (enforceRepositoryBoundary && !existsSync(path.join(repoRoot, "packages/atlas/package.json"))) {
    errors.push(issue("boundary", "Atlas package boundary is missing"));
  }

  return { errors };
}

export function compileAtlas({
  repoRoot = defaultRepoRoot,
  bank = knowledgeBank,
  pages = loadAtlasPages(repoRoot),
  manifest = loadIntegrationManifest(repoRoot),
  enforceRepositoryBoundary = true
} = {}) {
  const validation = validateAtlas({ pages, bank, manifest, repoRoot, enforceRepositoryBoundary });
  const pageNodes = pages
    .map((page) => ({
      id: page.id,
      slug: page.slug,
      kind: page.kind,
      title: page.title,
      summary: page.summary,
      status: page.status,
      visibility: page.visibility,
      aliases: page.aliases,
      tags: page.tags,
      authority: page.authority,
      canonical: page.canonical
        ? { ...page.canonical, slice: selectProjectSlice(bank, page.canonical) }
        : null,
      relations: page.relations,
      path: `docs/atlas/pages/${page.relativePath}`
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  const corpusSource = pages
    .map((page) => [page.relativePath, page.raw])
    .sort(([left], [right]) => left.localeCompare(right));
  const corpusFingerprint = hash(JSON.stringify(corpusSource));
  const bankFingerprint = hash(JSON.stringify(bank));
  const integrationFingerprint = hash(JSON.stringify(manifest));
  const implementationRoot = path.join(repoRoot, "packages/atlas");
  const implementationSource = [
    path.join(implementationRoot, "package.json"),
    ...walkImplementationFiles(path.join(implementationRoot, "src")),
    ...walkImplementationFiles(path.join(implementationRoot, "bin"))
  ].map((file) => [path.relative(repoRoot, file), readFileSync(file, "utf8")]);
  const implementationFingerprint = hash(JSON.stringify(implementationSource));
  const candidateFingerprint = hash(
    `${corpusFingerprint}:${bankFingerprint}:${integrationFingerprint}:${implementationFingerprint}`
  );
  const canonicalUnion = {};
  for (const page of pageNodes.filter(({ canonical }) => canonical)) {
    for (const [collection, ids] of Object.entries(page.canonical.slice.recordIds)) {
      canonicalUnion[collection] = sorted([...(canonicalUnion[collection] ?? []), ...ids]);
    }
  }

  return {
    schemaVersion: 1,
    candidateFingerprint,
    inputs: {
      corpusFingerprint,
      bankFingerprint,
      integrationFingerprint,
      implementationFingerprint
    },
    metrics: {
      pages: pageNodes.length,
      projectPages: pageNodes.filter(({ kind }) => kind === "project").length,
      relations: pageNodes.reduce((sum, page) => sum + page.relations.length, 0),
      canonicalCoverage: Object.fromEntries(
        Object.entries(canonicalUnion).map(([collection, ids]) => [collection, ids.length])
      )
    },
    pages: pageNodes,
    integration: manifest,
    validation
  };
}

export function evaluateAtlas(compiled) {
  const failures = compiled.validation.errors;
  const hardGateDefinitions = [
    ["semantic-markdown-contract", ["schema", "identity"]],
    ["typed-relations-are-reciprocal", ["relation"]],
    ["portable-markdown-links-resolve", ["markdown"]],
    ["canonical-records-resolve", ["canonical"]],
    ["project-migration-loses-nothing-silently", ["migration"]],
    ["authority-and-correction-are-explicit", ["governance"]],
    ["public-safety-boundary-is-enforced", ["safety"]],
    ["atlas-remains-a-private-package", ["boundary"]],
    ["eval-branch-family-is-accounted-for", ["integration"]]
  ];
  const results = hardGateDefinitions.map(([id, codes]) => {
    const evidence = failures.filter(({ code }) => codes.includes(code));
    return {
      id,
      kind: "hard-gate",
      passed: evidence.length === 0,
      observed: evidence.length ? `${evidence.length} defect(s)` : "No defects",
      evidence
    };
  });
  results.push(
    {
      id: "six-project-specimens",
      kind: "quality-target",
      passed: compiled.metrics.projectPages >= 6,
      observed: `${compiled.metrics.projectPages} project page(s); target 6`,
      evidence: []
    },
    {
      id: "semantic-neighborhood-depth",
      kind: "quality-target",
      passed: compiled.metrics.relations >= compiled.metrics.pages * 2,
      observed: `${compiled.metrics.relations} typed relation(s) across ${compiled.metrics.pages} page(s)`,
      evidence: []
    },
    {
      id: "candidate-is-exactly-bound",
      kind: "quality-target",
      passed: Boolean(compiled.candidateFingerprint && Object.values(compiled.inputs).every(Boolean)),
      observed: compiled.candidateFingerprint,
      evidence: compiled.inputs
    }
  );
  const hardGates = results.filter(({ kind }) => kind === "hard-gate");
  const qualityTargets = results.filter(({ kind }) => kind === "quality-target");
  return {
    suiteId: "atlas-semantic-wiki",
    suiteVersion: "1.0.0",
    candidateFingerprint: compiled.candidateFingerprint,
    results,
    summary: {
      hardGateFailures: hardGates.filter(({ passed }) => !passed).length,
      hardGateTotal: hardGates.length,
      qualityTargetGaps: qualityTargets.filter(({ passed }) => !passed).length,
      qualityTargetTotal: qualityTargets.length
    }
  };
}
