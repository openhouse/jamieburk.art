import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const expectedHiringReaders = [
  ["person.terence-dougherty", "opportunity.aclu.senior-project-manager-lps.8620968002", "senior-vision"],
  ["person.aileen-palmer", "opportunity.benepass.product-operations.7f963a7a", "likely-direct-report"],
  ["person.jaclyn-chen", "opportunity.benepass.product-operations.7f963a7a", "senior-vision"],
  ["person.james-williams-aclu", "opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "likely-direct-report"],
  ["person.deirdre-schifeling", "opportunity.aclu.senior-project-manager-national-campaigns.8631854002", "senior-vision"],
  ["person.luke-farrell", "opportunity.nyc-oti.senior-product-manager.782366", "likely-direct-report"],
  ["person.lisa-gelobter", "opportunity.nyc-oti.senior-product-manager.782366", "senior-vision"]
];

const expectedKeys = new Set(
  expectedHiringReaders.map(([personId, opportunityId, relationship]) =>
    [personId, opportunityId, relationship].join("|")
  )
);

const canonicalPublicRoutes = new Set([
  "/",
  "/about",
  "/colophon",
  "/contact",
  "/lab/source-backed-team-memory",
  "/resume",
  "/work",
  "/work/196-sunday-dinner",
  "/work/callnyc",
  "/work/fair-rent-nyc",
  "/work/harry-j-epstein",
  "/work/kc-town-hall",
  "/work/technical-operations",
  "/work/wowlist"
]);

function nonEmptyStrings(value) {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string" && item.trim());
}

export function evaluateHiringReaderAcceptance(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const evaluations = Array.isArray(candidate?.evaluations) ? candidate.evaluations : [];
  const keys = evaluations.map((evaluation) =>
    [evaluation?.reader?.personId, evaluation?.opportunityId, evaluation?.reader?.relationship].join("|")
  );
  const taskIds = evaluations.map((evaluation) => evaluation?.isolation?.taskId);

  check(candidate?.schemaVersion === 1, "schemaVersion must be 1");
  check(candidate?.target?.url === "https://staging-c.jamieburk.art", "target must be the public staging-c URL");
  check(/^[a-f0-9]{40}$/.test(candidate?.target?.candidateGitRev ?? ""), "candidateGitRev must be a full Git SHA");
  check(/^[a-f0-9]{64}$/.test(candidate?.target?.publicSurfaceDigest ?? ""), "publicSurfaceDigest must be a SHA-256 digest");
  check(candidate?.acceptanceQuestion === "I would hire this person for this job.", "acceptance question must remain literal");
  check(candidate?.passPolicy === "unanimous-named-readers", "pass policy must remain unanimous");
  check(evaluations.length === expectedKeys.size, "all seven named readers must be present exactly once");
  check(new Set(keys).size === keys.length, "reader and opportunity pairs must not be duplicated");
  check(
    taskIds.every((taskId) => typeof taskId === "string" && taskId.trim()) &&
      new Set(taskIds).size === evaluations.length &&
      evaluations.every(
        (evaluation) =>
          evaluation?.isolation?.separateChat === true &&
          evaluation?.isolation?.priorReaderOutputsAvailable === false
      ),
    "each reader must come from a separate sandboxed task without prior reader outputs"
  );
  check(keys.every((key) => expectedKeys.has(key)) && [...expectedKeys].every((key) => keys.includes(key)), "reader, opportunity, and leadership relationships must match the governed map");

  for (const evaluation of evaluations) {
    const label = evaluation?.reader?.name || evaluation?.reader?.personId || "unknown reader";
    const reportingLineShouldBeConfirmed =
      evaluation?.reader?.personId === "person.aileen-palmer";
    check(
      evaluation?.reader?.reportingLineConfirmed === reportingLineShouldBeConfirmed,
      `${label}: reporting-line certainty must match the governed public evidence`
    );
    check(evaluation?.simulatedPublicFigureLens === true, `${label}: simulation disclosure is required`);
    check(/not participation or endorsement/i.test(evaluation?.nonEndorsementBoundary ?? ""), `${label}: non-endorsement boundary is required`);
    check(
      evaluation?.access?.scope === "public-web-only" &&
        evaluation?.access?.repositoryAccess === false &&
        evaluation?.access?.privateSourceAccess === false,
      `${label}: access must remain public-web-only`
    );
    check(
      nonEmptyStrings(evaluation?.visitedRoutes) &&
        evaluation.visitedRoutes.every((route) => canonicalPublicRoutes.has(route)),
      `${label}: visited evidence must use canonical public portfolio routes`
    );
    check(
      Array.isArray(evaluation?.evidence) &&
        evaluation.evidence.length > 0 &&
        evaluation.evidence.every(
          (item) =>
            typeof item?.route === "string" &&
            canonicalPublicRoutes.has(item.route) &&
            typeof item?.observation === "string" &&
            item.observation.trim()
        ),
      `${label}: route-bound public evidence is required`
    );
    check(nonEmptyStrings(evaluation?.strengths), `${label}: strengths are required`);
    check(nonEmptyStrings(evaluation?.risks), `${label}: risks are required`);
    check(nonEmptyStrings(evaluation?.constructiveCritique), `${label}: constructive critique is required`);
    check(
      evaluation?.decision === "pass" &&
        evaluation?.wouldHireForRole === true &&
        Array.isArray(evaluation?.blockingReasons) &&
        evaluation.blockingReasons.length === 0,
      `${label}: acceptance gate did not pass`
    );
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      expectedReaders: expectedKeys.size,
      evaluatedReaders: evaluations.length,
      acceptedReaders: evaluations.filter(
        (evaluation) => evaluation?.decision === "pass" && evaluation?.wouldHireForRole === true
      ).length
    }
  };
}

function loadInput() {
  if (process.argv.includes("--stdin")) return JSON.parse(readFileSync(0, "utf8"));
  const inputIndex = process.argv.indexOf("--input");
  if (inputIndex !== -1 && process.argv[inputIndex + 1]) {
    return JSON.parse(readFileSync(process.argv[inputIndex + 1], "utf8"));
  }
  throw new Error("Use --stdin or --input <path>.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const result = evaluateHiringReaderAcceptance(loadInput());
    process.stdout.write(`${JSON.stringify(result)}\n`);
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
