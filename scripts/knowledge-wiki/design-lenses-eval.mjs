import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath = "evals/knowledge-wiki/design-lenses.json";

function readText(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function readRecord(root, relativePath) {
  const raw = readText(root, relativePath);
  const parsed = matter(raw);
  return {
    path: relativePath,
    raw,
    data: structuredClone(parsed.data),
    body: parsed.content
  };
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function loadDesignLensCandidate(root = repoRoot) {
  const config = JSON.parse(readText(root, configPath));
  const method = readRecord(root, config.methodPath);
  const lenses = config.lenses.map((lens) => ({
    ...lens,
    person: readRecord(root, lens.personPath),
    sources: lens.sourcePaths.map((sourcePath) => readRecord(root, sourcePath))
  }));
  return { config, method, lenses };
}

export function fingerprintDesignLensCandidate(candidate) {
  const hash = createHash("sha256");
  const records = [
    { path: configPath, raw: JSON.stringify(candidate.config) },
    candidate.method,
    ...candidate.lenses.flatMap((lens) => [lens.person, ...lens.sources])
  ].sort((a, b) => a.path.localeCompare(b.path, "en"));

  for (const record of records) {
    hash.update(record.path).update("\0").update(record.raw).update("\0");
  }
  return hash.digest("hex");
}

export function evaluateDesignLenses(candidate) {
  const failures = [];
  const checks = [];
  const check = (id, condition, detail) => {
    checks.push({ id, pass: Boolean(condition), detail });
    if (!condition) failures.push(detail);
  };
  const { config, method, lenses } = candidate;
  const normalizedMethodBody = normalizeWhitespace(method.body);
  const candidateText = [
    method.raw,
    ...lenses.flatMap((lens) => [lens.person.raw, ...lens.sources.map((source) => source.raw)])
  ].join("\n");

  check(
    "three-distinct-lenses",
    lenses.length === 3 && new Set(lenses.map((lens) => lens.personId)).size === 3,
    "The suite must retain exactly three distinct named public-work design lenses."
  );
  check(
    "method-record",
    method.data.id === config.methodRecordId && method.data.kind === "method",
    "The evaluated method must remain the maintained Source-Backed Team Memory record."
  );
  check(
    "questions-not-lineage",
    method.body.includes("## Comparative design questions") &&
      lenses.every((lens) =>
        normalizedMethodBody.includes(normalizeWhitespace(lens.question))
      ) &&
      /do not establish direct intellectual lineage, consultation, participation,\s*review, approval, or endorsement/i.test(
        method.body
      ),
    "The method must carry all three comparative questions and reject lineage, participation, review, approval, and endorsement inference."
  );

  for (const lens of lenses) {
    const personRelations = lens.person.data.relations ?? [];
    const normalizedPersonBody = normalizeWhitespace(lens.person.body);
    const methodRelation = personRelations.find(
      (relation) => relation.target === config.methodRecordId
    );
    check(
      `${lens.id}-person-record`,
      lens.person.data.id === lens.personId &&
        lens.person.data.kind === "person" &&
        lens.person.data.status === "maintained" &&
        lens.person.data.visibility === "public-safe",
      `${lens.id} must have a maintained public-safe person record with the configured stable ID.`
    );
    check(
      `${lens.id}-design-question`,
      lens.person.body.includes("## Design question") &&
        normalizedPersonBody.includes(
          normalizeWhitespace(lens.question)
        ),
      `${lens.id} must retain the exact comparative design question.`
    );
    check(
      `${lens.id}-method-relation`,
      methodRelation?.type === "related_to" &&
        /not collaboration or endorsement/i.test(methodRelation?.context ?? ""),
      `${lens.id} may relate to the method only as a bounded comparative lens.`
    );
    check(
      `${lens.id}-boundary`,
      /does not establish.*knows about.*participated in.*reviewed.*approved.*endorsed/i.test(
        normalizedPersonBody
      ) &&
        /explicitly fictionalized model artifact/i.test(normalizedPersonBody) &&
        /Jamie remains the human publication and design decision owner/i.test(
          normalizedPersonBody
        ),
      `${lens.id} must preserve non-participation, fictionalized-roleplay, and Jamie-authority boundaries.`
    );
    check(
      `${lens.id}-sources`,
      lens.sources.length > 0 &&
        lens.sources.every(
          (source) =>
            source.data.kind === "source" &&
            source.data.status === "maintained" &&
            source.data.visibility === "public" &&
            /^https:\/\//.test(source.data.source_url ?? "") &&
            source.data.projection?.status === "hold" &&
            Array.isArray(source.data.projection?.surfaces) &&
            source.data.projection.surfaces.length === 0
        ),
      `${lens.id} sources must remain maintained public HTTPS records held from direct projection.`
    );
    check(
      `${lens.id}-source-links`,
      lens.sourcePaths.every((sourcePath) =>
        personRelations.some(
          (relation) =>
            relation.type === "uses_source" &&
            relation.href === `../sources/${path.basename(sourcePath)}`
        )
      ),
      `${lens.id} person record must link every configured source as evidence.`
    );
  }

  const methodLensRelations = (method.data.relations ?? []).filter((relation) =>
    lenses.some((lens) => lens.personId === relation.target)
  );
  check(
    "method-relations-bounded",
    methodLensRelations.length === 3 &&
      methodLensRelations.every(
        (relation) =>
          relation.type === "related_to" &&
          /not participation, review, or endorsement/i.test(relation.context ?? "")
      ),
    "The method must relate to all three people only as bounded design lenses."
  );
  check(
    "deterministic-before-model",
    config.deterministicFirst === true &&
      config.modelReview?.allowedOnlyAfterDeterministicPass === true &&
      config.modelReview?.inputScope === "exact-public-safe-records-only" &&
      config.modelReview?.roleplayStatus ===
        "explicitly-fictionalized-analytical-lens",
    "Deterministic gates must pass before any exact public-safe fictionalized model review."
  );
  check(
    "human-authority",
    config.authorityBoundary?.namedPeopleParticipated === false &&
      config.authorityBoundary?.namedPeopleReviewed === false &&
      config.authorityBoundary?.namedPeopleApprovedOrEndorsed === false &&
      config.authorityBoundary?.modelReviewIsNamedPersonOpinion === false &&
      config.authorityBoundary?.publicationAndDesignDecisionOwner ===
        "Jamie Burkart" &&
      config.authorityBoundary?.automatedPassAuthorizesPublication === false,
    "Named-person non-participation and Jamie's sole publication and design authority must remain explicit."
  );
  check(
    "no-private-locators",
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|file:\/\/)/i.test(candidateText),
    "The public-safe design-lens packet must not expose a private locator."
  );

  return {
    id: config.id,
    passed: failures.length === 0,
    stage: "deterministic",
    checks,
    failures,
    metrics: {
      passingChecks: checks.filter((item) => item.pass).length,
      totalChecks: checks.length,
      lenses: lenses.length,
      sources: lenses.reduce((sum, lens) => sum + lens.sources.length, 0),
      candidateSha256: fingerprintDesignLensCandidate(candidate)
    },
    modelReview: config.modelReview,
    authorityBoundary: config.authorityBoundary
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateDesignLenses(loadDesignLensCandidate());
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}
