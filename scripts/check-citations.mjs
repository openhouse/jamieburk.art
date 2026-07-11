#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  citationPages,
  claimRecords,
  sourceRecords
} from "../apps/www/src/data/knowledge-bank/index.ts";
import { proofClaims } from "../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const localOrPrivateLocatorPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|icloud|Mobile Documents|[A-Za-z]:\\)/i;
const signedOrPrivateUrlPattern =
  /(?:X-Amz-(?:Credential|Signature)|[?&](?:sig|signature|token|access_token)=|storage\.googleapis\.com\/.*[?&]Expires=)/i;

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export function validateCitationGraph(graph) {
  const failures = [];
  const warnings = [];
  const sourceIds = new Set(graph.sources.map((source) => source.id));
  const claimIds = new Set(graph.claims.map((claim) => claim.id));
  const pageIds = new Set(graph.pages.map((page) => page.id));

  for (const [label, values] of [
    ["source", graph.sources.map((source) => source.id)],
    ["claim", graph.claims.map((claim) => claim.id)],
    ["page", graph.pages.map((page) => page.id)]
  ]) {
    const repeated = duplicates(values);
    if (repeated.length) failures.push(`Duplicate ${label} IDs: ${repeated.join(", ")}`);
  }

  for (const source of graph.sources) {
    const sourceBundle = JSON.stringify(source);
    if (localOrPrivateLocatorPattern.test(sourceBundle)) {
      failures.push(`${source.id} exposes a private or local filesystem locator`);
    }
    if (signedOrPrivateUrlPattern.test(sourceBundle)) {
      failures.push(`${source.id} exposes a signed or private URL`);
    }
    if (!source.publicCitation?.trim()) {
      failures.push(`${source.id} is missing a public citation`);
    }
    if (
      ["archived", "live-and-archived"].includes(source.preservationStatus) &&
      source.visibility === "public" &&
      !source.archiveUrl
    ) {
      failures.push(`${source.id} is archived but has no archive URL`);
    }
    if (
      ["public-metadata-only", "private", "protected"].includes(source.visibility) &&
      (source.canonicalUrl || source.archiveUrl || source.assetUrl)
    ) {
      failures.push(`${source.id} is ${source.visibility} but exposes an underlying URL`);
    }
  }

  for (const claim of graph.claims) {
    for (const evidence of claim.evidence) {
      if (!sourceIds.has(evidence.sourceId)) {
        failures.push(`${claim.id} references unknown source ${evidence.sourceId}`);
        continue;
      }
      const source = graph.sources.find((item) => item.id === evidence.sourceId);
      if (evidence.renderCitation && source?.visibility !== "public") {
        failures.push(`${claim.id} renders non-public source ${evidence.sourceId}`);
      }
    }

    if (
      ["disallowed", "not-recovered"].includes(claim.status) &&
      (claim.publicProjection || claim.shortProjection || claim.surfaces.length)
    ) {
      failures.push(`${claim.id} is ${claim.status} but is projected publicly`);
    }

    if (
      claim.citationRequired &&
      (claim.publicProjection || claim.surfaces.length) &&
      !claim.evidence.some((evidence) => evidence.renderCitation)
    ) {
      failures.push(`${claim.id} requires a citation but has no renderable evidence`);
    }
  }

  for (const page of graph.pages) {
    const route = `/work/${page.id}`;
    const repeatedOccurrences = duplicates(page.occurrences.map((item) => item.id));
    const repeatedSources = duplicates(page.sourceOrder);

    if (repeatedOccurrences.length) {
      failures.push(`${page.id} has duplicate occurrence IDs: ${repeatedOccurrences.join(", ")}`);
    }
    if (repeatedSources.length) {
      failures.push(`${page.id} has duplicate source-order IDs: ${repeatedSources.join(", ")}`);
    }

    const usedSources = new Set();
    for (const occurrence of page.occurrences) {
      if (!claimIds.has(occurrence.claimId)) {
        failures.push(`${page.id}/${occurrence.id} references unknown claim ${occurrence.claimId}`);
        continue;
      }

      const claim = graph.claims.find((item) => item.id === occurrence.claimId);
      if (!claim.surfaces.includes(route)) {
        failures.push(`${occurrence.claimId} does not allow citation on ${route}`);
      }

      const renderableSourceIds = new Set(
        claim.evidence.filter((item) => item.renderCitation).map((item) => item.sourceId)
      );
      const occurrenceSourceIds = occurrence.sourceIds ?? [...renderableSourceIds];

      for (const sourceId of occurrenceSourceIds) {
        usedSources.add(sourceId);
        if (!renderableSourceIds.has(sourceId)) {
          failures.push(
            `${page.id}/${occurrence.id} uses ${sourceId}, which is not renderable evidence for ${claim.id}`
          );
        }
        if (!page.sourceOrder.includes(sourceId)) {
          failures.push(`${page.id} uses ${sourceId} but omits it from sourceOrder`);
        }
      }
    }

    for (const sourceId of page.sourceOrder) {
      if (!sourceIds.has(sourceId)) failures.push(`${page.id} orders unknown source ${sourceId}`);
      if (!usedSources.has(sourceId)) warnings.push(`${page.id} orders unused source ${sourceId}`);
    }
  }

  if (!pageIds.has("callnyc")) failures.push("CallNYC citation page is missing");
  return { failures, warnings };
}

function publicCallNYCText() {
  const files = [
    "apps/www/src/content/work/callnyc.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/app/resume/page.tsx",
    "apps/www/src/app/work/technical-operations/page.tsx"
  ];
  const text = files.map((file) => readFileSync(path.join(repoRoot, file), "utf8")).join("\n");
  const proof = proofClaims.find((claim) => claim.id === "callnyc-civic-data-guidance");
  const proofText = [proof?.publicWording, proof?.shortWording, proof?.detailedPublicWording]
    .filter(Boolean)
    .join("\n");
  let resumeText = "";

  try {
    resumeText = execFileSync(
      "pdftotext",
      [
        path.join(
          repoRoot,
          "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
        ),
        "-"
      ],
      { encoding: "utf8" }
    );
  } catch {
    throw new Error("pdftotext is required to validate the public resume claim");
  }

  return `${text}\n${proofText}\n${resumeText}`;
}

function validatePublicProjection() {
  const failures = [];
  const content = publicCallNYCText();
  const forbidden = [
    ["retired CallNYC year", /2014\s*[-–]\s*2015/i],
    ["unsupported first civic-data wording", /first\s+civic[- ]data\s+hackathon/i],
    ["unsupported unscoped first-hackathon wording", /(?:Council's|Council’s|Council)\s+first\s+hackathon/i],
    ["unresolved source placeholder", /SOURCE\s+TK|citation\s+pending|press\s+citation\s+pending|\[\?\]/i]
  ];

  for (const [label, pattern] of forbidden) {
    if (pattern.test(content)) failures.push(`Public CallNYC copy contains ${label}`);
  }

  if (!/first\s+CouncilStat\s+hackathon/i.test(content)) {
    failures.push("Public CallNYC copy is missing the bounded first CouncilStat wording");
  }
  if (!/2016\s+-\s+archived/i.test(content)) {
    failures.push("CallNYC work metadata is not marked 2016 - archived");
  }
  return failures;
}

function runContractTests() {
  const failures = [];
  const expectFailure = (label, graph, phrase) => {
    const result = validateCitationGraph(graph);
    if (!result.failures.some((failure) => failure.includes(phrase))) {
      failures.push(`Contract test failed: ${label}`);
    }
  };

  const unknownSource = structuredClone({
    sources: sourceRecords,
    claims: claimRecords,
    pages: citationPages
  });
  unknownSource.claims[0].evidence[0].sourceId = "SRC-MISSING";
  expectFailure("unknown sources fail", unknownSource, "unknown source SRC-MISSING");

  const mismatchedOccurrence = structuredClone({
    sources: sourceRecords,
    claims: claimRecords,
    pages: citationPages
  });
  mismatchedOccurrence.pages[0].occurrences[0].sourceIds = [
    "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"
  ];
  expectFailure(
    "occurrence sources must belong to claim evidence",
    mismatchedOccurrence,
    "not renderable evidence"
  );

  const privatePath = structuredClone({
    sources: sourceRecords,
    claims: claimRecords,
    pages: citationPages
  });
  privatePath.sources[0].publicNote = "/Users/example/private-source";
  expectFailure("private paths fail", privatePath, "private or local filesystem locator");

  const requiredWithoutEvidence = structuredClone({
    sources: sourceRecords,
    claims: claimRecords,
    pages: citationPages
  });
  requiredWithoutEvidence.claims[0].evidence.forEach((item) => {
    item.renderCitation = false;
  });
  expectFailure(
    "citation-required public claims need renderable evidence",
    requiredWithoutEvidence,
    "requires a citation but has no renderable evidence"
  );

  return failures;
}

const graph = { sources: sourceRecords, claims: claimRecords, pages: citationPages };
const result = validateCitationGraph(graph);
const failures = [
  ...result.failures,
  ...validatePublicProjection(),
  ...runContractTests()
];

for (const warning of result.warnings) console.warn(`Citation warning: ${warning}`);

if (failures.length) {
  for (const failure of failures) console.error(`Citation check failed: ${failure}`);
  process.exit(1);
}

console.log(
  `Citation check passed: ${sourceRecords.length} sources, ${claimRecords.length} claims, ${citationPages.length} page.`
);
