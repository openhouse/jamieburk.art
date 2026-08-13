import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const dataPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/nycac-crs-recent-advocacy-2026-08-13.json"
);
const closeReadingPath = path.join(
  repoRoot,
  "docs/knowledge-bank/research-runs/nycac-crs-30-day-close-reading-2026-08-13.md"
);

const claimIds = [
  "CLM-NYCAC-SBU-REPORT-REVIEW-2026",
  "CLM-NYCAC-PRESS-REMARKS-PREPARATION-2026",
  "CLM-NYCAC-SBU-RALLY-SPEAKING-2026",
  "CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"
];

function getById(items, id) {
  return items.find((item) => item.id === id);
}

export function loadCandidate(root = repoRoot) {
  return structuredClone({
    knowledgeBank: {
      claims: knowledgeBank.claims.filter((claim) => claimIds.includes(claim.id)),
      sources: knowledgeBank.sources.filter((source) =>
        [
          "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
          "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29",
          "SRC-SBU-REPORT-CAMPAIGN-POST-2026-08-11",
          "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08"
        ].includes(source.id)
      ),
      agencyRelations: knowledgeBank.agencyRelations.filter((relation) =>
        relation.id.startsWith("REL-JAMIE-SBU-") ||
        relation.id.startsWith("REL-JAMIE-MARTE-") ||
        relation.id.startsWith("REL-JAMIE-GALLAGHER-")
      ),
      researchInquiries: knowledgeBank.researchInquiries.filter((inquiry) =>
        inquiry.id.startsWith("INQ-NYCAC-SBU-")
      )
    },
    data: JSON.parse(readFileSync(path.join(root, path.relative(repoRoot, dataPath)), "utf8")),
    closeReading: readFileSync(
      path.join(root, path.relative(repoRoot, closeReadingPath)),
      "utf8"
    )
  });
}

export function evaluateRecentAdvocacyEvidence(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const claims = candidate.knowledgeBank.claims;
  const sources = candidate.knowledgeBank.sources;
  const reportClaim = getById(claims, "CLM-NYCAC-SBU-REPORT-REVIEW-2026");
  const speakingClaim = getById(claims, "CLM-NYCAC-SBU-RALLY-SPEAKING-2026");
  const coordinationClaim = getById(
    claims,
    "CLM-NYCAC-ELECTED-OFFICE-COORDINATION-2026"
  );
  const eventSource = getById(
    sources,
    "SRC-ACTION-LAB-SBU-RELEASE-EVENT-2026-07-29"
  );
  const publicReportEvidence = reportClaim?.evidence?.some(
    (item) =>
      item.sourceId === "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026" &&
      item.relationship === "direct-support"
  );
  const protectedReportEvidence = reportClaim?.evidence?.some(
    (item) =>
      item.sourceId === "SRC-NYCAC-RECENT-ADVOCACY-RESEARCH-2026-08" &&
      item.relationship === "private-support"
  );
  const allProjectionStates = claims.flatMap((claim) => claim.projections ?? []);
  const publicSafeCorpus = [
    candidate.closeReading,
    JSON.stringify(candidate.data),
    JSON.stringify(candidate.knowledgeBank)
  ].join("\n");
  const repositoryAuthorities = [
    "openhouse/commercial-rent-stabilization-public-support",
    "openhouse/jamie-burkart-public-record",
    "openhouse/archival-research-projects",
    "openhouse/jamieburk.art"
  ];

  check(
    claims.length === claimIds.length && claimIds.every((id) => getById(claims, id)),
    "four governed advocacy claims must remain materialized"
  );
  check(
    reportClaim &&
      !/\b(?:co-?authored|authored the report|independently (?:validated|verified|replicated)|methods owner)\b/i.test(
        reportClaim.internalClaim
      ) &&
      reportClaim.antiClaims.some((item) => /authored or co-authored/i.test(item)) &&
      reportClaim.boundaries.some((item) => /not authorship/i.test(item)),
    "report claim inflates bounded report review into authorship or methods validation"
  );
  check(
    publicReportEvidence && protectedReportEvidence,
    "report claim requires public credit and protected incorporation evidence"
  );
  check(
    speakingClaim?.status === "use-with-care" &&
      speakingClaim.projections?.every(
        (projection) =>
          projection.status === "hold" && projection.surfaces?.length === 0
      ),
    "speaking claim must remain use-with-care and held"
  );
  check(
    candidate.data.findings.public_speaking.evidence_state ===
      "participant-attested-public-delivery-unrecovered" &&
      eventSource?.doesNotEstablish?.some((item) => /delivered words/i.test(item)),
    "public-speaking evidence state must distinguish participant attestation from public delivery proof"
  );
  check(
    coordinationClaim?.antiClaims?.some((item) => /endorsed Jamie/i.test(item)) &&
      coordinationClaim.boundaries?.some((item) => /endorsement/i.test(item)),
    "elected-office coordination claim is missing its endorsement boundary"
  );
  check(
    candidate.data.findings.elected_office_coordination.future_meeting_state ===
      "scheduled-not-occurred-within-review-window" &&
      coordinationClaim?.antiClaims?.some((item) => /scheduled.*already occurred/i.test(item)),
    "future meeting state must remain scheduled and not occurred"
  );
  check(
    !/(?:\/(?:Users|Volumes|private|tmp)\/|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)/i.test(
      publicSafeCorpus
    ),
    "public-safe advocacy record contains a private locator or email"
  );
  check(
    repositoryAuthorities.every(
      (repository) =>
        candidate.closeReading.split(repository).length - 1 === 1 &&
        candidate.data.repository_destinations.some(
          (destination) => destination.repository === repository
        )
    ) &&
      new Set(
        candidate.data.repository_destinations.map((item) => item.authority)
      ).size === repositoryAuthorities.length,
    "repository destination map must preserve four distinct authorities"
  );
  check(
    candidate.data.review_window.start === "2026-07-15" &&
      candidate.data.review_window.end === "2026-08-13",
    "review window must remain the exact authorized thirty-day period"
  );
  check(
    allProjectionStates.length === claimIds.length &&
      allProjectionStates.every(
        (projection) =>
          projection.status === "hold" && projection.surfaces?.length === 0
      ) &&
      candidate.data.graph_candidate.public_site_change_authorized === false,
    "research cannot silently authorize a portfolio projection"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      claims: claims.length,
      sources: sources.length,
      agencyRelations: candidate.knowledgeBank.agencyRelations.length,
      openInquiries: candidate.knowledgeBank.researchInquiries.length,
      repositoryAuthorities: candidate.data.repository_destinations.length,
      heldProjections: allProjectionStates.filter(
        (projection) => projection.status === "hold"
      ).length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateRecentAdvocacyEvidence(loadCandidate());
  if (!result.passed) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Recent advocacy evidence validated: ${result.metrics.claims} claims, ` +
        `${result.metrics.sources} sources, ${result.metrics.agencyRelations} agency relations, ` +
        `${result.metrics.openInquiries} open inquiries, and ` +
        `${result.metrics.heldProjections} held projections.`
    );
  }
}
