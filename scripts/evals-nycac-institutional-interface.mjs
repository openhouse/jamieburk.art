#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");
const ledger = JSON.parse(
  read(
    "docs/knowledge-bank/research/nyc-council-finkelpearl-transcript-census.json"
  )
);
const receipt = read(
  "docs/knowledge-bank/intake/2026-07-15-nycac-institutional-interface.md"
).replace(/\s+/g, " ");
const projectNote = read(
  "docs/knowledge-bank/projects/nyc-artist-coalition.md"
).replace(/\s+/g, " ");
const caseStudy = read("apps/www/src/content/work/fair-rent-nyc.mdx");

const checks = [];
const check = (dimension, label, points, passes, hard = true) =>
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
const includesAll = (source, values) =>
  values.every((value) => source.includes(value));

const sourceById = new Map(
  knowledgeBank.sources.map((source) => [source.id, source])
);
const claimById = new Map(
  knowledgeBank.claims.map((claim) => [claim.id, claim])
);
const observationById = new Map(
  knowledgeBank.observations.map((observation) => [observation.id, observation])
);

const intake = knowledgeBank.intakeItems.find(
  (item) => item.id === "INTAKE-2026-07-15-NYCAC-INSTITUTIONAL-INTERFACE"
);
const inquiry = knowledgeBank.researchInquiries.find(
  (item) => item.id === "INQ-NYCAC-INSTITUTIONAL-INTERFACE-2026"
);
const directClaim = claimById.get(
  "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"
);
const interfaceClaim = claimById.get("CLM-NYCAC-INSTITUTIONAL-INTERFACE");
const citationPage = knowledgeBank.pages.find(
  (page) => page.id === "fair-rent-nyc"
);

check(
  "Bounded corpus",
  "The official-record denominator and all retrieval counts reconcile",
  18,
  ledger.counts.meetingRecords === 74 &&
    ledger.counts.meetingPagesRecovered === 74 &&
    ledger.counts.distinctLegislationItems === 77 &&
    ledger.counts.searchableTranscriptAttachments === 132 &&
    ledger.counts.transcriptsWithArtistCoalitionMatch === 2 &&
    ledger.counts.directFinkelpearlReferencesToCoalition === 1 &&
    ledger.meetings.length === 74 &&
    ledger.transcriptAttachments.length === 132 &&
    ledger.matchingTranscripts.length === 2
);

check(
  "Bounded corpus",
  "The two matches are classified by speaker relationship and the Council-wide limit remains explicit",
  10,
  ledger.matchingTranscripts[0]?.meetingId === 1398466 &&
    ledger.matchingTranscripts[0]?.speakerRelationship.includes(
      "Tom Finkelpearl directly names"
    ) &&
    ledger.matchingTranscripts[1]?.meetingId === 1398473 &&
    ledger.matchingTranscripts[1]?.speakerRelationship.includes(
      "Jamie Burkart names"
    ) &&
    includesAll(ledger.boundaries.join(" "), [
      "not every New York City Council committee",
      "does not establish that no other Council transcript",
      "OCR"
    ])
);

check(
  "Direct proof",
  "The May 2017 source and claim preserve testimony context and attribution",
  16,
  sourceById
    .get("SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19")
    ?.supportsGenerally.includes(
      "Finkelpearl explicitly named NYC Artist Coalition in Council testimony"
    ) &&
    directClaim?.status === "confirmed-with-boundary" &&
    directClaim.evidence.some(
      (evidence) =>
        evidence.sourceId ===
          "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19" &&
        evidence.relationship === "direct-support" &&
        evidence.renderCitation
    ) &&
    directClaim.projections.some(
      (projection) =>
        projection.key === "case-study" &&
        projection.surfaces.includes("/work/fair-rent-nyc")
    )
);

check(
  "Reciprocal record",
  "Official records preserve DCLA, CreateNYC, Jamie, and Espinal-side evidence",
  14,
  [
    "SRC-NYC-COUNCIL-CULTURAL-BUDGET-HEARING-2018-03-16",
    "SRC-CREATENYC-NYCAC-RECOMMENDATIONS-2017",
    "SRC-CREATENYC-TWITTER-APPENDIX-2017",
    "SRC-NYCA-COUNCIL-CABARET-HEARING-2017-06-19"
  ].every((id) => sourceById.has(id)) &&
    [
      "OBS-NYCAC-JAMIE-CULTURAL-BUDGET-TESTIMONY",
      "OBS-NYCAC-ESPINAL-CABARET-TESTIMONY",
      "OBS-CREATENYC-NYCAC-RECOMMENDATIONS",
      "OBS-CREATENYC-NYCAC-PUBLIC-EXCHANGE"
    ].every((id) => observationById.get(id)?.status === "verified")
);

check(
  "Inference discipline",
  "Institutional-interface analysis is labeled inference and answers all three institutional questions",
  16,
  interfaceClaim?.status === "inference" &&
    interfaceClaim.evidence.length === 5 &&
    includesAll(`${interfaceClaim.internalClaim} ${receipt}`, [
      "informal cultural",
      "Why DCLA benefited",
      "Why the Council benefited",
      "Why Espinal benefited"
    ]) &&
    inquiry?.resultStatus === "partially-recovered" &&
    inquiry.findings.some((finding) => finding.includes("organized constituency"))
);

check(
  "Credit and causality",
  "Jamie, collective, agency, endorsement, and policy-causation boundaries are enforced",
  14,
  includesAll(
    [...directClaim.boundaries, ...directClaim.antiClaims, ...interfaceClaim.boundaries, ...interfaceClaim.antiClaims].join(
      " "
    ),
    [
      "not to Jamie individually",
      "solely created",
      "every coalition position",
      "legislative authority",
      "could not act without Jamie",
      "alone caused"
    ]
  )
);

check(
  "Selective projection",
  "The website projects the direct third-party proof with visible boundaries",
  8,
  includesAll(caseStudy, [
    'claimId="CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"',
    'occurrenceId="finkelpearl-council-reference"',
    "not to Jamie individually",
    "does not show that DCLA endorsed every coalition position"
  ]) &&
    citationPage?.sourceOrder.includes(
      "SRC-NYC-COUNCIL-DCLA-BUDGET-HEARING-2017-05-19"
    ) &&
    citationPage.occurrences.some(
      (occurrence) =>
        occurrence.id === "finkelpearl-council-reference" &&
        occurrence.claimId === "CLM-NYCAC-FINKELPEARL-COUNCIL-REFERENCE"
    )
);

check(
  "Lifecycle integration",
  "Intake, sources, observations, claims, inquiry, receipt, and project note stay connected",
  4,
  intake?.sourceIds.length === 6 &&
    intake.observationIds.length === 7 &&
    intake.claimIds.length === 2 &&
    intake.researchInquiryIds.length === 1 &&
    includesAll(projectNote, [
      "DCLA and Council Institutional Interface",
      "132 searchable transcript attachments",
      "evidence-backed interpretation"
    ])
);

const possiblePoints = checks.reduce((sum, item) => sum + item.points, 0);
const earnedPoints = checks.reduce(
  (sum, item) => sum + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failures = checks.filter((item) => !item.passes);
const hardFailures = failures.filter((item) => item.hard);
const threshold = 100;

console.log(
  `NYC Artist Coalition institutional-interface eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`
);
for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const earned = dimensionChecks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const possible = dimensionChecks.reduce(
    (sum, item) => sum + item.points,
    0
  );
  console.log(`- ${dimension}: ${earned}/${possible}`);
}

if (failures.length) {
  console.error("\nFailed checks:");
  for (const item of failures) console.error(`- ${item.label}`);
}

if (score < threshold || hardFailures.length) process.exit(1);
console.log("Criterion met.");
