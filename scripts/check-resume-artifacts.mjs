import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");

const expectedCriteria = [
  "complete-opportunity-coverage",
  "opportunity-source-current",
  "markdown-current",
  "google-docs-lineage",
  "pdf-structure",
  "approved-typography",
  "visual-inspection",
  "resume-editorial-preferences",
  "application-guide",
  "public-safety"
];

const requiredFonts = ["PalatinoLinotype", "Oswald", "Karla"];
const protectedLocatorPattern = /docs\.google\.com\/(?:document|drive)\/|drive\.google\.com\/|\/(?:Users|Volumes)\/|\b1[A-Za-z0-9_-]{30,}\b/;
const protectedCategoryAnswerPattern = /\bprotected_category_answer\s*:/i;

function digest(value) {
  return createHash("sha256").update(value).digest("hex");
}

function datedResumePath(value) {
  return /^resume-versions\/(\d{4}-\d{2}-\d{2})\/[^/]+\/Jamie-Burkart-Resume\.md$/.exec(value ?? "");
}

function frontMatterValue(markdown, key) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(markdown)?.[1];
  if (!block) return undefined;
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${escapedKey}:[ \\t]*([^\\r\\n]*)$`, "m").exec(block)?.[1]?.trim();
}

function allTailoredMarkdown(root) {
  const base = path.join(root, "resume-versions");
  if (!existsSync(base)) return [];
  const found = [];
  for (const date of readdirSync(base, { withFileTypes: true })) {
    if (!date.isDirectory() || !/^\d{4}-\d{2}-\d{2}$/.test(date.name)) continue;
    const dateDir = path.join(base, date.name);
    for (const opportunity of readdirSync(dateDir, { withFileTypes: true })) {
      if (!opportunity.isDirectory()) continue;
      const relative = path.join("resume-versions", date.name, opportunity.name, "Jamie-Burkart-Resume.md");
      if (existsSync(path.join(root, relative))) found.push(relative.split(path.sep).join("/"));
    }
  }
  return found.sort();
}

export function evaluateResumeArtifacts(root = defaultRoot) {
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });
  const evalPath = path.join(root, "evals/resume-artifacts/evals.json");
  const opportunityManifestPath = path.join(root, "evals/resume-hiring-readers/current.json");

  if (!existsSync(evalPath) || !existsSync(opportunityManifestPath)) {
    return {
      passed: false,
      failures: [{ criterion: "complete-opportunity-coverage", message: "Missing resume-artifact eval or opportunity manifest." }],
      metrics: { opportunities: 0, markdownResumes: 0, pdfs: 0, artifacts: 0, applicationGuides: 0 }
    };
  }

  const evaluation = JSON.parse(readFileSync(evalPath, "utf8"));
  const observedCriteria = evaluation.criteria?.map(({ id }) => id) ?? [];
  if (JSON.stringify(observedCriteria) !== JSON.stringify(expectedCriteria) ||
      evaluation.criteria?.some(({ blocking }) => blocking !== true)) {
    fail("complete-opportunity-coverage", "The blocking artifact criteria changed, lost order, or became optional.");
  }

  const opportunityManifest = JSON.parse(readFileSync(opportunityManifestPath, "utf8"));
  const entries = Array.isArray(opportunityManifest.opportunities) ? opportunityManifest.opportunities : [];
  const expectedResumePaths = entries.map(({ resumePath }) => resumePath).sort();
  const discoveredResumePaths = allTailoredMarkdown(root);
  if (new Set(entries.map(({ opportunityId }) => opportunityId)).size !== entries.length ||
      JSON.stringify(expectedResumePaths) !== JSON.stringify(discoveredResumePaths)) {
    fail("complete-opportunity-coverage", "The governed opportunity set and dated Markdown resume tree are not one-to-one.");
  }

  let pdfs = 0;
  let artifacts = 0;
  let applicationGuides = 0;
  for (const entry of entries) {
    const label = entry.opportunityId ?? entry.jobTitle ?? "unknown opportunity";
    const pathMatch = datedResumePath(entry.resumePath);
    if (!pathMatch) {
      fail("complete-opportunity-coverage", `${label}: resume path does not follow the dated directory contract.`);
      continue;
    }
    const generatedOn = pathMatch[1];
    const resumePath = path.join(root, entry.resumePath);
    const opportunityPath = path.join(root, entry.opportunityPath ?? "");
    const directory = path.dirname(resumePath);
    const artifactPath = path.join(directory, "artifact.json");
    if (!existsSync(resumePath) || !existsSync(opportunityPath) || !existsSync(artifactPath)) {
      fail("complete-opportunity-coverage", `${label}: Markdown resume, opportunity source, or artifact.json is missing.`);
      continue;
    }
    artifacts += 1;
    const resume = readFileSync(resumePath, "utf8");
    const opportunity = readFileSync(opportunityPath, "utf8");
    const resumeSha256 = digest(resume);
    const opportunitySha256 = digest(opportunity);
    const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));
    const pdfFiles = readdirSync(directory).filter((name) => name.toLowerCase().endsWith(".pdf"));
    if (pdfFiles.length !== 1 || artifact?.pdf?.file !== pdfFiles[0]) {
      fail("complete-opportunity-coverage", `${label}: expected exactly one PDF sibling bound by artifact.json.`);
      continue;
    }
    const pdfPath = path.join(directory, pdfFiles[0]);
    if (!existsSync(pdfPath)) {
      fail("complete-opportunity-coverage", `${label}: PDF sibling is missing.`);
      continue;
    }
    pdfs += 1;
    const guidePath = path.join(directory, "Application-Instructions.md");
    const guide = existsSync(guidePath) ? readFileSync(guidePath, "utf8") : undefined;
    if (!guide) {
      fail("application-guide", `${label}: Application-Instructions.md is missing beside the resume and PDF.`);
    } else {
      applicationGuides += 1;
      const applicationStatus = frontMatterValue(guide, "application_status");
      const blocker = frontMatterValue(guide, "blocker");
      const requiredSections = [
        "## Submission status",
        "## Files",
        "## Exact field instructions",
        "## Final review gate"
      ];
      const exactActionLines = guide.match(/^- \*\*[^*]+:\*\* (?:Enter|Upload|Select|Leave|Choose|Confirm|Do not|Review|Click)/gm) ?? [];
      if (frontMatterValue(guide, "opportunity_id") !== entry.opportunityId ||
          frontMatterValue(guide, "verified_on") !== generatedOn ||
          !["smartrecruiters", "greenhouse", "ashby"].includes(frontMatterValue(guide, "application_system")) ||
          !["ready-for-jamie-review", "blocked"].includes(applicationStatus) ||
          !/^https:\/\//.test(frontMatterValue(guide, "canonical_application_url") ?? "") ||
          frontMatterValue(guide, "resume_markdown") !== path.basename(entry.resumePath) ||
          frontMatterValue(guide, "resume_markdown_sha256") !== resumeSha256 ||
          frontMatterValue(guide, "resume_pdf") !== pdfFiles[0] ||
          frontMatterValue(guide, "resume_pdf_sha256") !== digest(readFileSync(pdfPath))) {
        fail("application-guide", `${label}: application guide metadata is incomplete or not bound to the current resume and PDF.`);
      }
      if (requiredSections.some((heading) => !guide.includes(heading)) ||
          !guide.includes("Jamie alone clicks the final Submit button.")) {
        fail("application-guide", `${label}: application guide is missing required instructions or Jamie's final-submit gate.`);
      }
      if (applicationStatus === "ready-for-jamie-review" &&
          ((!blocker || blocker !== "none") || exactActionLines.length < 6)) {
        fail("application-guide", `${label}: ready guide lacks exact field actions or declares an unresolved blocker.`);
      }
      if (applicationStatus === "blocked" &&
          (!blocker || blocker === "none" || !guide.includes("## Blocker"))) {
        fail("application-guide", `${label}: blocked guide does not name its blocker.`);
      }
      if (protectedLocatorPattern.test(guide) || protectedCategoryAnswerPattern.test(guide)) {
        fail("public-safety", `${label}: protected source locator or protected-category answer entered the application guide.`);
      }
    }

    if (artifact.schemaVersion !== 2 ||
        artifact.opportunityId !== entry.opportunityId ||
        artifact.generatedOn !== generatedOn ||
        artifact?.opportunitySource?.file !== entry.opportunityPath ||
        artifact?.opportunitySource?.sha256 !== opportunitySha256) {
      fail("opportunity-source-current", `${label}: artifact is not bound to the current governed opportunity source and date.`);
    }

    if (artifact.sourceMarkdown !== path.basename(entry.resumePath) ||
        artifact.sourceMarkdownSha256 !== resumeSha256 ||
        entry.resumeSha256 !== resumeSha256) {
      fail("markdown-current", `${label}: Markdown, hiring-reader, and artifact digests do not match.`);
    }

    const workspace = artifact.googleWorkspace ?? {};
    if (artifact?.layout?.source !== evaluation?.styleContract?.source ||
        artifact?.layout?.styleReference !== evaluation?.styleContract?.styleReference ||
        artifact?.layout?.sourceStylesPreserved !== true ||
        workspace.sourceWasTreatedReadOnly !== true ||
        workspace.sourceUnchangedAfterCopy !== true ||
        workspace.nativeCopyCreated !== true ||
        workspace.connectorReadbackVerified !== true ||
        workspace.sourceLocatorCommitted !== false ||
        workspace.copyLocatorCommitted !== false) {
      fail("google-docs-lineage", `${label}: native-copy style lineage or read-only source verification is incomplete.`);
    }

    const pdf = readFileSync(pdfPath);
    const pdfText = pdf.toString("latin1");
    const pageObjects = pdfText.match(/\/Type\s*\/Page\b/g)?.length ?? 0;
    const mediaBoxes = pdfText.match(/\/MediaBox \[0 0 612 792\]/g)?.length ?? 0;
    if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) ||
        pageObjects < 1 || pageObjects > 2 || mediaBoxes !== pageObjects ||
        !pdfText.includes(`/Count ${pageObjects}`) ||
        !pdfText.includes("/Marked true") || !pdfText.includes("/StructTreeRoot") ||
        artifact?.pdf?.mediaType !== "application/pdf" ||
        artifact?.pdf?.sha256 !== digest(pdf) ||
        artifact?.pdf?.bytes !== statSync(pdfPath).size ||
        artifact?.pdf?.pages !== pageObjects ||
        artifact?.pdf?.pageSize !== "US Letter" || artifact?.pdf?.tagged !== true) {
      fail("pdf-structure", `${label}: PDF is stale, malformed, untagged, over two pages, or not US Letter.`);
    }

    if (JSON.stringify(artifact?.layout?.typography) !== JSON.stringify(evaluation?.styleContract?.typography) ||
        !requiredFonts.every((fontName) => pdfText.includes(fontName))) {
      fail("approved-typography", `${label}: approved typography is absent from the manifest or embedded PDF fonts.`);
    }

    const pages = Array.from({ length: pageObjects }, (_, index) => index + 1);
    const checks = artifact?.visualInspection?.checks;
    if (artifact?.visualInspection?.status !== "pass" ||
        JSON.stringify(artifact?.visualInspection?.pagesInspected) !== JSON.stringify(pages) ||
        !Array.isArray(checks) || checks.length < 4) {
      fail("visual-inspection", `${label}: every exported page needs a complete visual-inspection receipt.`);
    }

    const preferences = evaluation.editorialPreferences ?? {};
    const politicoLabel = preferences.politicoLabel;
    const forbiddenDispositionPatterns = Array.isArray(preferences.forbiddenHiringFacingDispositionPatterns)
      ? preferences.forbiddenHiringFacingDispositionPatterns
      : [];
    const politicoUrl = preferences.politicoArticleUrl;
    const markdownPoliticoLink = `[*${politicoLabel}*](${politicoUrl})`;
    if (forbiddenDispositionPatterns.some((pattern) =>
      typeof pattern === "string" && pattern && resume.toLowerCase().includes(pattern.toLowerCase())
    )) {
      fail("resume-editorial-preferences", `${label}: hiring-facing resume includes nonessential non-disbursement disposition language.`);
    }
    if (politicoLabel && resume.includes(politicoLabel) &&
        (!politicoUrl || !resume.includes(markdownPoliticoLink) || !pdfText.includes(politicoUrl))) {
      fail("resume-editorial-preferences", `${label}: Politico New York must link to the canonical archived article PDF in Markdown and the exported PDF.`);
    }

    if (protectedLocatorPattern.test(resume) || protectedLocatorPattern.test(JSON.stringify(artifact))) {
      fail("public-safety", `${label}: protected Google Workspace or local filesystem locator entered the resume artifact.`);
    }
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      opportunities: entries.length,
      markdownResumes: discoveredResumePaths.length,
      pdfs,
      artifacts,
      applicationGuides
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rootIndex = process.argv.indexOf("--root");
  const root = rootIndex >= 0 && process.argv[rootIndex + 1]
    ? path.resolve(process.argv[rootIndex + 1])
    : defaultRoot;
  const result = evaluateResumeArtifacts(root);
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.passed) process.exitCode = 1;
}
