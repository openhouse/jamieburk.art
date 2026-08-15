import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/resumes/pdf-portfolio.json");

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function getFile(relativePath, root, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) {
    return overrides[relativePath];
  }
  const absolutePath = path.join(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath) : null;
}

function parseJsonBuffer(value) {
  if (value === null) return null;
  if (Buffer.isBuffer(value)) return JSON.parse(value.toString("utf8"));
  if (typeof value === "string") return JSON.parse(value);
  return structuredClone(value);
}

function markdownLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
}

function pdfFacts(buffer) {
  const source = buffer.toString("latin1");
  const pageCount = (source.match(/\/Type\s*\/Page\b/g) ?? []).length;
  const mediaBoxMatch = source.match(
    /\/MediaBox\s*\[\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\]/
  );
  const mediaBox = mediaBoxMatch ? mediaBoxMatch.slice(1).map(Number) : null;
  const uris = [...source.matchAll(/\/URI\s*\(([^)]+)\)/g)].map((match) => match[1]);
  return { pageCount, mediaBox, uris };
}

function sameArray(left, right) {
  return (
    Array.isArray(left) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function hasPrivateGoogleLocator(value) {
  return /(?:docs|drive)\.google\.com\/(?:document\/d\/|file\/d\/|open\?id=)[A-Za-z0-9_-]{20,}/i.test(
    value
  );
}

export function evaluateResumePdfPortfolio({
  root = repoRoot,
  config = defaultConfig,
  fileOverrides = {}
} = {}) {
  const configuredText = JSON.stringify(config);
  const versions = config.versions.map((version) => {
    const markdownBuffer = getFile(version.markdownPath, root, fileOverrides);
    const pdfBuffer = getFile(version.pdfPath, root, fileOverrides);
    const publicInstallBuffer = version.publicInstallPath
      ? getFile(version.publicInstallPath, root, fileOverrides)
      : null;
    const visualBuffer = getFile(version.visualRunPath, root, fileOverrides);
    const markdown =
      markdownBuffer === null
        ? null
        : Buffer.isBuffer(markdownBuffer)
          ? markdownBuffer.toString("utf8")
          : String(markdownBuffer);
    const visual = parseJsonBuffer(visualBuffer);
    const expectedPdfPath = version.markdownPath.replace(/\.md$/i, ".pdf");
    const markdownHash = markdown === null ? null : sha256(markdown);
    const pdfHash = pdfBuffer === null ? null : sha256(pdfBuffer);
    const facts = pdfBuffer === null ? null : pdfFacts(pdfBuffer);
    const requiredLinks =
      markdown === null
        ? config.artifactStandards.requiredContactLinks
        : [...new Set([...config.artifactStandards.requiredContactLinks, ...markdownLinks(markdown)])];

    const checks = [
      {
        id: "markdown-exists",
        pass: markdown !== null,
        detail: markdown === null ? "Authoritative Markdown is missing." : "Authoritative Markdown exists."
      },
      {
        id: "pdf-sibling-exists",
        pass: pdfBuffer !== null && version.pdfPath === expectedPdfPath,
        detail: pdfBuffer === null ? "PDF sibling is missing." : "PDF uses the Markdown basename and directory."
      },
      {
        id: "pdf-size",
        pass:
          pdfBuffer !== null &&
          pdfBuffer.length >= config.artifactStandards.minimumBytes &&
          pdfBuffer.length <= config.artifactStandards.maximumBytes,
        detail: pdfBuffer === null ? "No PDF bytes to measure." : `${pdfBuffer.length} bytes.`
      },
      {
        id: "pdf-pages-and-media-box",
        pass:
          facts !== null &&
          facts.pageCount === config.artifactStandards.expectedPages &&
          sameArray(facts.mediaBox, config.artifactStandards.expectedMediaBox),
        detail:
          facts === null
            ? "No PDF structure to inspect."
            : `${facts.pageCount} pages; MediaBox ${JSON.stringify(facts.mediaBox)}.`
      },
      {
        id: "markdown-links-preserved",
        pass: facts !== null && requiredLinks.every((link) => facts.uris.includes(link)),
        detail:
          facts === null
            ? "No PDF links to inspect."
            : `${requiredLinks.filter((link) => facts.uris.includes(link)).length}/${requiredLinks.length} Markdown and contact links preserved.`
      },
      {
        id: "visual-receipt-bound-to-artifacts",
        pass:
          visual !== null &&
          visual.markdown?.path === version.markdownPath &&
          visual.markdown?.sha256 === markdownHash &&
          visual.pdf?.path === version.pdfPath &&
          visual.pdf?.sha256 === pdfHash &&
          visual.pdf?.bytes === pdfBuffer?.length &&
          visual.pdf?.pages === facts?.pageCount,
        detail: "Visual receipt must bind the exact Markdown and PDF artifacts."
      },
      {
        id: "every-page-visually-passed",
        pass:
          visual !== null &&
          visual.overall === "pass" &&
          visual.inspection?.allPagesRasterized === true &&
          visual.inspection?.actualNamedPeopleParticipated === false &&
          visual.inspection?.pages?.length === facts?.pageCount &&
          visual.inspection.pages.every(
            (page, index) => page.page === index + 1 && page.pass === true
          ),
        detail: "Every PDF page requires a bound, fictionalization-safe visual pass."
      },
      {
        id: "read-only-source-boundary",
        pass:
          visual !== null &&
          visual.sourceTemplate?.revisionUnchangedAfterExport === true &&
          visual.sourceTemplate?.privateLocatorCommitted === false &&
          !hasPrivateGoogleLocator(JSON.stringify(visual)),
        detail: "The source remains read-only and private Google locators stay out of the repository."
      },
      {
        id: "public-install-byte-identical",
        pass:
          !version.publicInstallPath ||
          (pdfBuffer !== null &&
            publicInstallBuffer !== null &&
            pdfBuffer.equals(publicInstallBuffer)),
        detail: version.publicInstallPath
          ? "The deployed public-resume source is byte-identical to its maintained PDF sibling."
          : "This opportunity-specific artifact has no public install target."
      }
    ];

    return {
      artifactId: version.artifactId,
      opportunityId: version.opportunityId,
      markdownPath: version.markdownPath,
      pdfPath: version.pdfPath,
      visualRunPath: version.visualRunPath,
      markdownSha256: markdownHash,
      pdfSha256: pdfHash,
      pdfBytes: pdfBuffer?.length ?? 0,
      pages: facts?.pageCount ?? 0,
      publicInstallPath: version.publicInstallPath,
      publicInstallMatches: version.publicInstallPath
        ? pdfBuffer !== null &&
          publicInstallBuffer !== null &&
          pdfBuffer.equals(publicInstallBuffer)
        : null,
      preservedLinks: facts?.uris ?? [],
      checks,
      overall: checks.every((check) => check.pass) ? "pass" : "fail"
    };
  });

  const portfolioChecks = [
    {
      id: "all-hiring-suite-versions-covered",
      pass: config.versions.length === config.artifactStandards.expectedArtifacts,
      detail: `${config.versions.length}/${config.artifactStandards.expectedArtifacts} maintained resume artifacts configured.`
    },
    {
      id: "no-private-google-locator-in-config",
      pass:
        config.sourceTemplate.privateLocatorCommitted === false &&
        !hasPrivateGoogleLocator(configuredText),
      detail: "The public configuration records a style signature, not a private document locator."
    },
    {
      id: "style-signature-complete",
      pass: [
        "US Letter",
        "Palatino Linotype 21 pt",
        "Oswald 11.5 pt",
        "Karla 10.5 pt",
        "Karla 9 pt bold",
        "blue and underlined"
      ].every((value) => configuredText.includes(value)),
      detail: "The read-only source's public-safe layout and typography signature is recorded."
    }
  ];
  const passing = versions.filter((version) => version.overall === "pass").length;
  const overall =
    portfolioChecks.every((check) => check.pass) &&
    passing === versions.length &&
    versions.length === config.artifactStandards.expectedArtifacts
      ? "pass"
      : "fail";

  return {
    schemaVersion: 1,
    evalId: config.id,
    runId: "2026-08-15-resume-pdf-portfolio-universal-public",
    evaluatedAt: config.evaluatedAt,
    overall,
    summary: {
      requiredVersions: config.artifactStandards.expectedArtifacts,
      configuredVersions: versions.length,
      passingVersions: passing,
      markdownPdfSiblingPairs: versions.filter(
        (version) => version.checks.find((check) => check.id === "pdf-sibling-exists")?.pass
      ).length,
      visuallyInspectedVersions: versions.filter(
        (version) => version.checks.find((check) => check.id === "every-page-visually-passed")?.pass
      ).length
    },
    portfolioChecks,
    versions,
    boundary:
      "Markdown is authoritative; Google Docs is a private presentation transform; PDF is the application artifact; the visual receipt binds the exact pair. No named hiring reader participated."
  };
}

export function currentRunSnapshot(result) {
  return {
    schemaVersion: result.schemaVersion,
    evalId: result.evalId,
    runId: result.runId,
    evaluatedAt: result.evaluatedAt,
    overall: result.overall,
    summary: result.summary,
    portfolioChecks: result.portfolioChecks.map(({ id, pass }) => ({ id, pass })),
    versions: result.versions.map((version) => ({
      ...(version.opportunityId ? { opportunityId: version.opportunityId } : {}),
      ...(version.artifactId ? { artifactId: version.artifactId } : {}),
      markdownPath: version.markdownPath,
      pdfPath: version.pdfPath,
      visualRunPath: version.visualRunPath,
      markdownSha256: version.markdownSha256,
      pdfSha256: version.pdfSha256,
      pdfBytes: version.pdfBytes,
      pages: version.pages,
      ...(version.publicInstallPath ? { publicInstallPath: version.publicInstallPath } : {}),
      publicInstallMatches: version.publicInstallMatches,
      overall: version.overall,
      checks: version.checks.map(({ id, pass }) => ({ id, pass }))
    })),
    boundary: result.boundary
  };
}

function main() {
  const result = evaluateResumePdfPortfolio();
  console.log(JSON.stringify(result, null, 2));

  if (!process.argv.includes("--no-current-run-check")) {
    const expected = readJson(defaultConfig.currentRunPath);
    assert.deepEqual(currentRunSnapshot(result), expected, "Committed resume PDF portfolio run is stale");
  }

  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
