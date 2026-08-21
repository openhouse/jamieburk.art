import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const acceptanceQuestion = "I would hire this person for this job.";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function isoDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

function opportunityRecords(root) {
  const directory = path.join(root, "docs/knowledge-bank/opportunities");
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const relativePath = `docs/knowledge-bank/opportunities/${name}`;
      const source = readFileSync(path.join(root, relativePath), "utf8");
      return { relativePath, ...matter(source).data };
    });
}

function daysBetween(left, right) {
  return Math.floor((Date.parse(`${right}T00:00:00Z`) - Date.parse(`${left}T00:00:00Z`)) / 86_400_000);
}

function fitRanking(root) {
  const rankingPath = path.join(root, "evals/public-resume/historical-fit.json");
  if (!existsSync(rankingPath)) return { path: rankingPath, entries: [], valid: false };
  const ranking = JSON.parse(readFileSync(rankingPath, "utf8"));
  const entries = Array.isArray(ranking.opportunities) ? ranking.opportunities : [];
  const ids = entries.map(({ opportunityId }) => opportunityId);
  const valid = ranking.schemaVersion === 1 &&
    ranking.fallbackFraction === 0.25 &&
    new Set(ids).size === ids.length &&
    entries.every(({ opportunityId, fitScore }) =>
      typeof opportunityId === "string" && Number.isFinite(fitScore) && fitScore >= 0 && fitScore <= 100
    );
  return { path: rankingPath, entries, valid };
}

export function selectResumeOpportunities(records, rankingEntries, {
  activeApplicationOpportunityIds = [],
  now = new Date().toISOString().slice(0, 10)
} = {}) {
  const byId = new Map(records.map((record) => [record.id, record]));
  const requestedApplicationIds = [...new Set(activeApplicationOpportunityIds)].sort();
  const unknownOpportunityIds = requestedApplicationIds.filter((id) => !byId.has(id));
  if (unknownOpportunityIds.length) {
    return {
      tier: "active-applications-invalid",
      opportunityIds: [],
      unknownOpportunityIds
    };
  }
  const activeApplicationIds = requestedApplicationIds.filter((id) => byId.has(id));
  if (activeApplicationIds.length) {
    return { tier: "active-applications", opportunityIds: activeApplicationIds };
  }

  const openIds = records
    .filter((record) => {
      const deadline = isoDate(record.application_deadline);
      return record.opportunity_status === "live" &&
        record.hirability_status === "truthfully-hirable" &&
        (!deadline || deadline >= now);
    })
    .map(({ id }) => id)
    .sort();
  if (openIds.length) return { tier: "open-truthfully-hirable", opportunityIds: openIds };

  const ranked = rankingEntries
    .filter(({ opportunityId }) => byId.has(opportunityId))
    .sort((left, right) => right.fitScore - left.fitScore || left.opportunityId.localeCompare(right.opportunityId));
  const count = ranked.length ? Math.ceil(ranked.length * 0.25) : 0;
  return {
    tier: "top-quartile-historical-fit",
    opportunityIds: ranked.slice(0, count).map(({ opportunityId }) => opportunityId).sort()
  };
}

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function evaluatePublicResume(root = defaultRoot, {
  now = new Date().toISOString().slice(0, 10),
  activeApplicationOpportunityIds = [],
  deterministicOnly = false
} = {}) {
  const failures = [];
  const fail = (criterion, message) => failures.push(`${criterion}: ${message}`);
  const manifestPath = path.join(root, "evals/public-resume/current.json");
  if (!existsSync(manifestPath)) {
    return {
      pass: false,
      failures: ["contract: evals/public-resume/current.json is missing"],
      metrics: { activeOpportunities: 0, coveredOpportunities: 0, namedReaders: 0, passingReaders: 0 }
    };
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (manifest.schemaVersion !== 1 ||
      manifest.acceptanceQuestion !== acceptanceQuestion ||
      manifest.passPolicy !== "unanimous-named-readers-for-every-selected-opportunity") {
    fail("contract", "schema, acceptance question, or unanimous pass policy changed");
  }

  const records = opportunityRecords(root);
  const ranking = fitRanking(root);
  if (!ranking.valid) fail("selection policy", "the governed historical fit ranking is missing or malformed");
  const selection = selectResumeOpportunities(records, ranking.entries, { activeApplicationOpportunityIds, now });
  if (selection.tier === "active-applications-invalid") {
    fail("active application input", `unknown opportunity IDs: ${selection.unknownOpportunityIds.join(", ")}`);
  }
  const active = selection.opportunityIds.map((id) => records.find((record) => record.id === id)).filter(Boolean);
  const activeIds = selection.opportunityIds;
  const entries = Array.isArray(manifest.opportunities) ? manifest.opportunities : [];
  const coveredIds = entries.map(({ opportunityId }) => opportunityId).sort();
  if (new Set(coveredIds).size !== coveredIds.length || JSON.stringify(activeIds) !== JSON.stringify(coveredIds)) {
    fail("active opportunity coverage", `${selection.tier} expected ${activeIds.join(", ")}; observed ${coveredIds.join(", ")}`);
  }

  for (const record of selection.tier === "open-truthfully-hirable" ? active : []) {
    const verifiedAt = isoDate(record.verified_at);
    const reviewBy = isoDate(record.review_by);
    if (!verifiedAt || daysBetween(verifiedAt, now) < 0 || daysBetween(verifiedAt, now) > 3 || !reviewBy || reviewBy < now) {
      fail("verification freshness", `${record.id} was verified ${verifiedAt || "never"} and reviews by ${reviewBy || "never"}`);
    }
  }

  const resume = manifest.resume ?? {};
  const markdownPath = path.join(root, resume.markdownPath ?? "");
  const siblingPdfPath = path.join(root, resume.pdfPath ?? "");
  const publicPdfPath = path.join(root, resume.publicPdfPath ?? "");
  const artifactPath = path.join(root, resume.artifactPath ?? "");
  let markdown = "";
  let markdownDigest = "";
  let pdfDigest = "";

  if (!resume.markdownPath || !existsSync(markdownPath) ||
      !resume.pdfPath || !existsSync(siblingPdfPath) ||
      !resume.publicPdfPath || !existsSync(publicPdfPath) ||
      !resume.artifactPath || !existsSync(artifactPath)) {
    fail("artifact lineage", "the public Markdown, PDF sibling, public projection, or artifact manifest is missing");
  } else {
    markdown = readFileSync(markdownPath, "utf8");
    const siblingPdf = readFileSync(siblingPdfPath);
    const publicPdf = readFileSync(publicPdfPath);
    markdownDigest = sha256(markdown);
    pdfDigest = sha256(siblingPdf);
    const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
    const words = markdown.trim().split(/\s+/).length;
    const requiredSections = [
      "## Professional Summary",
      "## Core Skills",
      "## Professional Experience",
      "## Education & Professional Development"
    ];
    if (!markdown.startsWith("# Jamie Burkart") || words < 500 || words > 900 || requiredSections.some((heading) => !markdown.includes(heading))) {
      fail("resume structure", `public Markdown is not a complete, scannable 500-900 word resume (${words} words)`);
    }
    if (resume.markdownSha256 !== markdownDigest ||
        resume.pdfSha256 !== pdfDigest ||
        sha256(publicPdf) !== pdfDigest ||
        artifact.sourceMarkdownSha256 !== markdownDigest ||
        artifact?.pdf?.sha256 !== pdfDigest ||
        artifact?.publicProjection?.sha256 !== pdfDigest ||
        artifact?.publicProjection?.file !== resume.publicPdfPath ||
        artifact?.visualInspection?.status !== "pass") {
      fail("artifact lineage", "Markdown, sibling PDF, public PDF, artifact digests, or visual inspection are not in step");
    }
  }

  const normalizedResume = normalize(markdown);
  if (/\b1,846\b|\b16,142\b|city-region keys/i.test(markdown)) {
    fail("WOW List positioning", "the current public resume exposes activity counts or database-key language that understates distributed ecosystem scale");
  }
  if (!/roughly \*\*35 city ecosystems\*\*/i.test(markdown) || !/local organizers/i.test(markdown)) {
    fail("WOW List positioning", "the current public resume must lead with roughly 35 city ecosystems and the local organizers who sustained them");
  }
  if (/distinguish(?:es|ed|ing)?[^.]{0,160}(?:retention|resident outcomes|causal impact)/i.test(markdown)) {
    fail("resume compression", "a defensive WOW List qualification overshadows the accomplishment");
  }
  for (const entry of entries) {
    const record = records.find(({ id }) => id === entry.opportunityId);
    if (!record || entry.opportunityPath !== record.relativePath) {
      fail("opportunity binding", `${entry.opportunityId ?? "unknown"} is not bound to its governed opportunity record`);
    }
    const requiredTerms = Array.isArray(entry.requiredTerms) ? entry.requiredTerms : [];
    const missing = requiredTerms.filter((term) => !normalizedResume.includes(normalize(term)));
    if (requiredTerms.length < 4 || missing.length) {
      fail("required role language", `${entry.opportunityId}: ${missing.join(", ") || "fewer than four required terms"}`);
    }
  }

  const expectedReaders = entries.flatMap((entry) =>
    (entry.namedReaders ?? []).map((reader) => `${entry.opportunityId}|${reader.personId}|${reader.relationship}`)
  ).sort();

  if (!Array.isArray(manifest.humanReviewGates) || manifest.humanReviewGates.length < 3 ||
      !manifest.humanReviewGates.some((gate) => /Jamie.*approval/i.test(gate)) ||
      !manifest.humanReviewGates.some((gate) => /employer.*hiring/i.test(gate))) {
    fail("human gates", "Jamie approval and employer hiring authority are not preserved");
  }

  const manifestText = JSON.stringify(manifest);
  if (/\/(?:Users|Volumes)\//.test(manifestText) || /docs\.google\.com\/(?:document|drive)\//.test(manifestText)) {
    fail("public safety", "a private local or Google Workspace locator entered the public eval");
  }

  const deterministicFailureCount = failures.length;
  if (deterministicFailureCount) {
    return {
      pass: false,
      failures,
      phases: {
        deterministic: "fail",
        hiringReaders: "not-eligible"
      },
      selectionTier: selection.tier,
      metrics: {
        activeOpportunities: active.length,
        coveredOpportunities: entries.length,
        namedReaders: expectedReaders.length,
        passingReaders: 0,
        readerAssessmentsEvaluated: 0
      }
    };
  }

  if (deterministicOnly) {
    return {
      pass: true,
      failures: [],
      phases: {
        deterministic: "pass",
        hiringReaders: "not-run"
      },
      selectionTier: selection.tier,
      metrics: {
        activeOpportunities: active.length,
        coveredOpportunities: entries.length,
        namedReaders: expectedReaders.length,
        passingReaders: 0,
        readerAssessmentsEvaluated: 0
      }
    };
  }

  const assessments = Array.isArray(manifest.readerAssessments) ? manifest.readerAssessments : [];
  const observedReaders = assessments.map((assessment) =>
    `${assessment.opportunityId}|${assessment.personId}|${assessment.relationship}`
  ).sort();
  if (new Set(observedReaders).size !== observedReaders.length || JSON.stringify(expectedReaders) !== JSON.stringify(observedReaders)) {
    fail("reader coverage", "named reader assessments do not exactly match the selected opportunity set");
  }

  let passingReaders = 0;
  for (const assessment of assessments) {
    const pass = assessment.resumeSha256 === markdownDigest &&
      assessment.acceptanceQuestion === acceptanceQuestion &&
      assessment.decision === "pass" &&
      assessment.wouldHire === true &&
      assessment.simulatedPublicFigureLens === true &&
      /not participation, quotation, endorsement, or a hiring decision/i.test(assessment.nonEndorsementBoundary ?? "") &&
      assessment?.access?.scope === "public-resume-and-public-job-context-only" &&
      assessment?.access?.repositoryAccess === false &&
      assessment?.access?.privateSourceAccess === false &&
      Array.isArray(assessment.strengths) && assessment.strengths.length >= 2 &&
      Array.isArray(assessment.risks) && assessment.risks.length >= 1 &&
      Array.isArray(assessment.interviewEvidenceNeeded) && assessment.interviewEvidenceNeeded.length >= 1;
    if (!pass) {
      fail("reader acceptance", `${assessment.name ?? assessment.personId ?? "unknown reader"} is not a disclosed exact-resume-bound pass`);
    } else {
      passingReaders += 1;
    }
  }

  return {
    pass: failures.length === 0,
    failures,
    phases: {
      deterministic: "pass",
      hiringReaders: failures.length === 0 ? "pass" : "fail"
    },
    selectionTier: selection.tier,
    metrics: {
      activeOpportunities: active.length,
      coveredOpportunities: entries.length,
      namedReaders: expectedReaders.length,
      passingReaders,
      readerAssessmentsEvaluated: assessments.length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rootIndex = process.argv.indexOf("--root");
  const root = rootIndex >= 0 && process.argv[rootIndex + 1]
    ? path.resolve(process.argv[rootIndex + 1])
    : defaultRoot;
  const nowIndex = process.argv.indexOf("--now");
  const now = nowIndex >= 0 && process.argv[nowIndex + 1]
    ? process.argv[nowIndex + 1]
    : new Date().toISOString().slice(0, 10);
  const activeApplicationOpportunityIds = (process.env.PUBLIC_RESUME_ACTIVE_APPLICATION_IDS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluatePublicResume(root, { now, activeApplicationOpportunityIds, deterministicOnly });
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.pass) process.exitCode = 1;
}
