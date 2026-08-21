import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const acceptanceQuestion = "I would advance this candidate to an interview for this job based on this cover letter and tailored resume.";
const protectedLocatorPattern = /docs\.google\.com\/(?:document|drive)\/|drive\.google\.com\/|\/(?:Users|Volumes)\/|\b1(?![A-Fa-f0-9]{63}\b)[A-Za-z0-9_-]{30,}\b/;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function isoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") ? value : undefined;
}

function daysBetween(left, right) {
  return Math.floor((Date.parse(`${right}T00:00:00Z`) - Date.parse(`${left}T00:00:00Z`)) / 86_400_000);
}

function frontMatterValue(markdown, key) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown)?.[1];
  if (!block) return undefined;
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escapedKey}:[ \\t]*([^\\r\\n]*)$`, "m").exec(block)?.[1]?.trim();
}

function letterBody(markdown) {
  return markdown.split(/^## Letter\s*$/m)[1]?.trim() ?? "";
}

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function discoverCoverLetters(root) {
  const base = path.join(root, "resume-versions");
  if (!existsSync(base)) return [];
  const found = [];
  for (const date of readdirSync(base, { withFileTypes: true })) {
    if (!date.isDirectory() || !/^\d{4}-\d{2}-\d{2}$/.test(date.name)) continue;
    const datePath = path.join(base, date.name);
    for (const opportunity of readdirSync(datePath, { withFileTypes: true })) {
      if (!opportunity.isDirectory() || opportunity.name === "active-opportunity-portfolio") continue;
      const relative = path.join("resume-versions", date.name, opportunity.name, "Cover-Letter.md");
      if (existsSync(path.join(root, relative))) found.push(relative.split(path.sep).join("/"));
    }
  }
  return found.sort();
}

export function evaluateCoverLetters(root = defaultRoot, {
  now = new Date().toISOString().slice(0, 10),
  deterministicOnly = false
} = {}) {
  const failures = [];
  const fail = (criterion, message) => failures.push(`${criterion}: ${message}`);
  const manifestPath = path.join(root, "evals/cover-letter-hiring-readers/current.json");
  const resumeManifestPath = path.join(root, "evals/resume-hiring-readers/current.json");
  const hiringReaderRegistryPath = path.join(root, "evals/hiring-readers/current.json");

  if (!existsSync(manifestPath) || !existsSync(resumeManifestPath) || !existsSync(hiringReaderRegistryPath)) {
    return { pass: false, failures: ["contract: cover-letter manifest, resume manifest, or governed reader registry is missing"] };
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const resumeManifest = JSON.parse(readFileSync(resumeManifestPath, "utf8"));
  const hiringReaderRegistry = JSON.parse(readFileSync(hiringReaderRegistryPath, "utf8"));
  if (manifest.schemaVersion !== 1 || manifest.sourceResumeManifest !== "evals/resume-hiring-readers/current.json" ||
      manifest.acceptanceQuestion !== acceptanceQuestion || manifest.passPolicy !== "unanimous-named-readers-per-opportunity") {
    fail("contract", "schema, source manifest, acceptance question, or unanimous policy changed");
  }
  if (manifest?.costPolicy?.deterministicChecksFirst !== true ||
      manifest?.costPolicy?.readerTasksSequentialAndIsolated !== true ||
      manifest?.costPolicy?.stopAfterFirstFailure !== true) {
    fail("cost policy", "deterministic-first, isolated sequential readers, and first-failure stop must remain enabled");
  }

  const voice = manifest.voiceContract ?? {};
  const voicePath = path.join(root, voice.path ?? "");
  if (!voice.path || !existsSync(voicePath)) {
    fail("voice source", "the writer's-voice contract is missing");
  } else {
    const voiceContract = JSON.parse(readFileSync(voicePath, "utf8"));
    const reviewed = isoDate(voice.lastAuthenticatedReview);
    if (sha256(readFileSync(voicePath)) !== voice.sha256 || voice.sourceRevisionSha256 !== voiceContract?.source?.revisionTokenSha256 ||
        voice.sourceLocatorCommitted !== false || voiceContract?.source?.sourceLocatorCommitted !== false ||
        voiceContract?.source?.authority !== "source-of-truth") {
      fail("voice source", "voice contract digest, source revision binding, authority, or protected-locator boundary drifted");
    }
    if (!reviewed || !Number.isInteger(voice.refreshAfterDays) || voice.refreshAfterDays < 1 ||
        daysBetween(reviewed, now) < 0 || daysBetween(reviewed, now) > voice.refreshAfterDays) {
      fail("voice freshness", `the living writer's-voice source was last authenticated ${reviewed ?? "never"}`);
    }
    if (protectedLocatorPattern.test(JSON.stringify(voiceContract))) {
      fail("public safety", "the protected writer's-voice locator entered the committed contract");
    }
  }

  const entries = Array.isArray(manifest.opportunities) ? manifest.opportunities : [];
  const resumeEntries = Array.isArray(resumeManifest.opportunities) ? resumeManifest.opportunities : [];
  const entryIds = entries.map(({ opportunityId }) => opportunityId).sort();
  const resumeIds = resumeEntries.map(({ opportunityId }) => opportunityId).sort();
  const expectedCoverPaths = entries.map(({ coverLetterPath }) => coverLetterPath).sort();
  const discoveredCoverPaths = discoverCoverLetters(root);
  if (new Set(entryIds).size !== entryIds.length || JSON.stringify(entryIds) !== JSON.stringify(resumeIds) ||
      JSON.stringify(expectedCoverPaths) !== JSON.stringify(discoveredCoverPaths)) {
    fail("opportunity coverage", "application-specific resumes and cover letters are not one-to-one");
  }

  const expectedReaders = [];
  for (const entry of entries) {
    const label = entry.opportunityId ?? "unknown opportunity";
    const resumeEntry = resumeEntries.find(({ opportunityId }) => opportunityId === entry.opportunityId);
    const files = [entry.opportunityPath, entry.resumePath, entry.coverLetterPath];
    if (!resumeEntry || files.some((file) => !file || !existsSync(path.join(root, file)))) {
      fail("artifact lineage", `${label}: opportunity, resume, or cover letter is missing`);
      continue;
    }
    const opportunity = readFileSync(path.join(root, entry.opportunityPath));
    const resume = readFileSync(path.join(root, entry.resumePath));
    const coverLetter = readFileSync(path.join(root, entry.coverLetterPath), "utf8");
    const body = letterBody(coverLetter);
    const blocks = body.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
    const bodyParagraphs = blocks.filter((value) => !/^Dear\b/.test(value) && !/^Thank you\b/.test(value) && value !== "Jamie Burkart");
    const words = body.split(/\s+/).filter(Boolean).length;
    const normalized = normalize(body);

    if (sha256(opportunity) !== entry.opportunitySha256 || sha256(resume) !== entry.resumeSha256 ||
        sha256(coverLetter) !== entry.coverLetterSha256 || resumeEntry.resumePath !== entry.resumePath ||
        resumeEntry.resumeSha256 !== entry.resumeSha256) {
      fail("artifact lineage", `${label}: opportunity, resume, or cover-letter digest is stale`);
    }
    if (frontMatterValue(coverLetter, "artifact_type") !== "opportunity-tailored-cover-letter" ||
        frontMatterValue(coverLetter, "opportunity_id") !== entry.opportunityId ||
        frontMatterValue(coverLetter, "opportunity_source") !== entry.opportunityPath ||
        frontMatterValue(coverLetter, "resume_source") !== path.basename(entry.resumePath) ||
        frontMatterValue(coverLetter, "writer_voice_contract") !== voice.path ||
        frontMatterValue(coverLetter, "writer_voice_locator_committed") !== "false" ||
        frontMatterValue(coverLetter, "writer_voice_revision_sha256") !== voice.sourceRevisionSha256) {
      fail("artifact lineage", `${label}: cover-letter front matter is not bound to its opportunity, resume, and voice source`);
    }
    if (words < 250 || words > 400 || bodyParagraphs.length < 3 || bodyParagraphs.length > 5 ||
        !/^Dear\b/m.test(body) || !/Thank you for your consideration,/i.test(body) || !/Jamie Burkart\s*$/.test(body)) {
      fail("letter structure", `${label}: expected 250-400 words, 3-5 body paragraphs, greeting, and signoff; observed ${words} words and ${bodyParagraphs.length} paragraphs`);
    }
    const requiredTerms = Array.isArray(entry.requiredTerms) ? entry.requiredTerms : [];
    const missingTerms = requiredTerms.filter((term) => !normalized.includes(normalize(term)));
    if (requiredTerms.length < 5 || missingTerms.length) {
      fail("role specificity", `${label}: missing ${missingTerms.join(", ") || "a sufficient role-language set"}`);
    }
    if (!/\b(?:14|30|35|61|300|490,539|2x)\b/i.test(body) ||
        /I am writing to apply|perfect candidate|TODO|TBD|\[[A-Z][^\]]+\]/i.test(body)) {
      fail("editorial quality", `${label}: missing governed specificity or containing a generic/placeholder pattern`);
    }
    if (protectedLocatorPattern.test(coverLetter)) {
      fail("public safety", `${label}: protected local or Google Workspace locator entered the cover letter`);
    }

    const governedReaders = (hiringReaderRegistry.evaluations ?? [])
      .filter(({ opportunityId }) => opportunityId === entry.opportunityId)
      .map(({ reader }) => `${reader?.personId}|${reader?.relationship}`)
      .sort();
    const letterReaders = (entry.namedReaders ?? []).map(({ personId, relationship }) => `${personId}|${relationship}`).sort();
    if (governedReaders.length === 0 || JSON.stringify(governedReaders) !== JSON.stringify(letterReaders)) {
      fail("reader coverage", `${label}: cover-letter readers do not match the governed reader registry`);
    }
    for (const reader of entry.namedReaders ?? []) expectedReaders.push(`${entry.opportunityId}|${reader.personId}|${reader.relationship}`);
  }

  const manifestText = JSON.stringify(manifest);
  if (protectedLocatorPattern.test(manifestText)) fail("public safety", "protected local or Google Workspace locator entered the cover-letter manifest");
  if (!Array.isArray(manifest.humanReviewGates) || !manifest.humanReviewGates.some((gate) => /Jamie approves/i.test(gate)) ||
      !manifest.humanReviewGates.some((gate) => /Employers retain/i.test(gate))) {
    fail("human gates", "Jamie approval and employer authority are not preserved");
  }

  if (failures.length) {
    return { pass: false, failures, phases: { deterministic: "fail", hiringReaders: "not-eligible" }, metrics: { opportunities: entries.length, namedReaders: expectedReaders.length, passingReaders: 0, readerAssessmentsEvaluated: 0 } };
  }
  if (deterministicOnly) {
    return { pass: true, failures: [], phases: { deterministic: "pass", hiringReaders: "not-run" }, metrics: { opportunities: entries.length, namedReaders: expectedReaders.length, passingReaders: 0, readerAssessmentsEvaluated: 0 } };
  }

  const assessments = Array.isArray(manifest.readerAssessments) ? manifest.readerAssessments : [];
  const observedReaders = assessments.map(({ opportunityId, personId, relationship }) => `${opportunityId}|${personId}|${relationship}`);
  if (new Set(observedReaders).size !== observedReaders.length || JSON.stringify([...observedReaders].sort()) !== JSON.stringify([...expectedReaders].sort())) {
    fail("reader coverage", `expected ${expectedReaders.length} exact reader assessments; observed ${observedReaders.length}`);
  }
  let passingReaders = 0;
  for (const assessment of assessments) {
    const entry = entries.find(({ opportunityId }) => opportunityId === assessment.opportunityId);
    const label = assessment.name ?? assessment.personId ?? "unknown reader";
    if (!entry || assessment.acceptanceQuestion !== acceptanceQuestion || assessment.opportunitySha256 !== entry.opportunitySha256 ||
        assessment.resumeSha256 !== entry.resumeSha256 || assessment.coverLetterSha256 !== entry.coverLetterSha256 ||
        assessment.voiceContractSha256 !== voice.sha256 || assessment.separateSandbox !== true ||
        assessment?.access?.repositoryAccess !== false || assessment?.access?.privateSourceAccess !== false ||
        assessment?.access?.scope !== "public-cover-letter-resume-and-job-context-only") {
      fail("reader binding", `${label}: assessment is not isolated and bound to the exact public artifacts`);
      continue;
    }
    if (assessment.decision !== "pass" || assessment.wouldAdvanceToInterview !== true) {
      fail("reader acceptance", `${label} did not advance the exact cover letter and resume`);
    } else passingReaders += 1;
    if (assessment.simulatedPublicFigureLens !== true || !/not participation|not.*endorsement/i.test(assessment.nonEndorsementBoundary ?? "")) {
      fail("reader boundary", `${label}: fictionalized non-endorsement boundary is missing`);
    }
  }

  return {
    pass: failures.length === 0,
    failures,
    phases: { deterministic: "pass", hiringReaders: failures.length ? "fail" : "pass" },
    metrics: { opportunities: entries.length, namedReaders: expectedReaders.length, passingReaders, readerAssessmentsEvaluated: assessments.length }
  };
}

const directRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (directRun) {
  const result = evaluateCoverLetters(defaultRoot, { deterministicOnly: process.argv.includes("--deterministic-only") });
  console.log(JSON.stringify(result));
  process.exit(result.pass ? 0 : 1);
}
