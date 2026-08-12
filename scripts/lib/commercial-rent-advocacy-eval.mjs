import { commercialRentAdvocacyAugust2026 } from "../../apps/www/src/data/knowledge-bank/commercial-rent-advocacy-2026-08.ts";

const byId = (rows, id) => rows.find((row) => row.id === id);
const includesEvery = (text, fragments) => fragments.every((fragment) => text.includes(fragment));

export function loadCommercialRentAdvocacyCandidate() {
  return structuredClone(commercialRentAdvocacyAugust2026);
}

export function evaluateCommercialRentAdvocacy(candidate) {
  const speech = byId(candidate.claims, "CLM-CRS-JAMIE-PUBLIC-ADVOCACY-2026-07-29");
  const staff = byId(candidate.claims, "CLM-CRS-JAMIE-OFFICIAL-STAFF-COORDINATION-2026");
  const footage = byId(candidate.claims, "CLM-CRS-NBC-FOOTAGE-REQUEST-2026");
  const coverage = byId(candidate.claims, "CLM-CRS-PUBLISHED-PRESS-COVERAGE-NOT-RECOVERED-2026");
  const review = byId(candidate.claims, "CLM-CRS-JAMIE-REPORT-REVIEW-2026");
  const reportBoundary = byId(candidate.observations, "OBS-CRS-REPORT-REVIEW-BOUNDARY-2026");
  const speechSource = byId(candidate.sources, "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29");
  const correspondence = byId(candidate.sources, "SRC-CRS-ADVOCACY-CORRESPONDENCE-2026-07-21-08-11");
  const socialSource = byId(candidate.sources, "SRC-CRS-ACTION-LAB-INSTAGRAM-2026-08-11");
  const socialObservation = byId(candidate.observations, "OBS-CRS-ACTION-LAB-SOCIAL-POST-2026-08-11");
  const cadence = byId(candidate.researchInquiries, "INQ-CRS-STATE-STAFF-CADENCE-2026");

  const claimText = candidate.claims
    .flatMap((claim) => [
      claim.internalClaim,
      ...claim.projections.map(({ text }) => text),
      ...claim.boundaries,
      ...claim.antiClaims
    ])
    .join("\n");

  const criteria = [
    {
      id: "CRA-001",
      pass: Boolean(
        speech &&
        speech.evidence.some(({ sourceId }) => sourceId === "SRC-CRS-SBU-PRESS-CONFERENCE-RECORDING-2026-07-29") &&
        speech.boundaries.some((item) => /prepared statement and delivered remarks are distinct/i.test(item))
      )
    },
    {
      id: "CRA-002",
      pass: Boolean(
        correspondence?.doesNotEstablish.includes("final official attendance") &&
        staff?.antiClaims.includes("Council Member Marte attended the July 29 event")
      )
    },
    {
      id: "CRA-003",
      pass: Boolean(
        staff &&
        /staff in the offices/.test(staff.internalClaim) &&
        staff.boundaries.some((item) => /staff coordination as staff coordination/i.test(item)) &&
        !/worked directly with city and state elected officials/i.test(claimText)
      )
    },
    {
      id: "CRA-004",
      pass: Boolean(
        staff?.antiClaims.includes("the August 26 meeting already occurred") &&
        cadence?.findings.includes("An August 26 meeting was scheduled and accepted.") &&
        cadence?.limitations.includes("The August 26 meeting was future-dated at review time.")
      )
    },
    {
      id: "CRA-005",
      pass: Boolean(
        footage &&
        footage.projections.every(({ status }) => status === "hold") &&
        includesEvery(footage.antiClaims.join(" "), ["NBC covered Jamie", "NBC broadcast the event"]) &&
        coverage?.status === "not-recovered" &&
        coverage.projections.every(({ status }) => status === "disallowed")
      )
    },
    {
      id: "CRA-006",
      pass: Boolean(
        review &&
        review.status === "confirmed-with-boundary" &&
        includesEvery(review.antiClaims.join(" "), [
          "Jamie authored Empty Storefronts, High Rents",
          "Jamie validated the report's methodology",
          "NYC Artist Coalition endorsed every report claim"
        ])
      )
    },
    {
      id: "CRA-007",
      pass: Boolean(
        reportBoundary &&
        includesEvery([reportBoundary.text, ...reportBoundary.limitations].join(" "), [
          "landlord motive",
          "causation",
          "broader causal rhetoric"
        ])
      )
    },
    {
      id: "CRA-008",
      pass: Boolean(
        speechSource?.visibility === "protected" &&
        speechSource?.media?.rightsStatus === "permission-needed" &&
        speechSource?.media?.consentStatus === "review-needed" &&
        speechSource?.media?.publicDisplayStatus === "hold" &&
        speech?.boundaries.some((item) => /exact quotations.*rights are cleared/i.test(item))
      )
    },
    {
      id: "CRA-009",
      pass: candidate.claims.every((claim) =>
        claim.projections.every(({ status }) => ["hold", "disallowed"].includes(status))
      )
    },
    {
      id: "CRA-010",
      pass: Boolean(
        socialSource?.visibility === "public" &&
        socialSource?.media?.publicDisplayStatus === "metadata-only" &&
        socialSource?.doesNotEstablish.includes("NYC Artist Coalition as a completed collaborator at capture time") &&
        socialObservation?.limitations.some((item) => /does not establish why the coalition was absent/i.test(item)) &&
        socialObservation?.limitations.some((item) => /does not name Jamie/i.test(item))
      )
    }
  ];

  return {
    accepted: criteria.every(({ pass }) => pass),
    criteria,
    failed: criteria.filter(({ pass }) => !pass).map(({ id }) => id),
    metrics: {
      sources: candidate.sources.length,
      observations: candidate.observations.length,
      claims: candidate.claims.length,
      relations: candidate.agencyRelations.length,
      inquiries: candidate.researchInquiries.length,
      heldProjections: candidate.claims.flatMap(({ projections }) => projections).filter(({ status }) => status === "hold").length,
      disallowedProjections: candidate.claims.flatMap(({ projections }) => projections).filter(({ status }) => status === "disallowed").length
    }
  };
}
