import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

export const requiredSeedIntakeIds = [
  "INTAKE-WATERWAYS-PITCH-HUCK-FINN-2026",
  "INTAKE-WATERWAYS-CHARLOTTE-GREAT-ACCOMMODATIONS-2026",
  "INTAKE-OPEN-HOUSE-GOOD-TIMES-2026",
  "INTAKE-NYCAC-GOTHAMIST-CABARET-2026",
  "INTAKE-NYCAC-NPR-NIGHTLIFE-2026",
  "INTAKE-CALLNYC-COUNCIL-TWITTER-ENGAGEMENT-2026",
  "INTAKE-NYCAC-FOUNDING-ROLE-2026",
  "INTAKE-NYCAC-CABARET-REPEAL-ROLE-2026",
  "INTAKE-NYCAC-OFFICE-NIGHTLIFE-ROLE-2026",
  "INTAKE-NYCAC-TOWN-HALLS-2026",
  "INTAKE-NYCAC-TALKS-NOT-RAIDS-2026",
  "INTAKE-WATERWAYS-RAFT-TO-GULF-2026",
  "INTAKE-WATERWAYS-PARTICIPATORY-PROGRAMS-2026",
  "INTAKE-GREENE-HILL-QA-2026",
  "INTAKE-WATERWAYS-WLBT-VICKSBURG-2026",
  "INTAKE-WATERWAYS-PITCH-GULF-FOLLOWUP-2026",
  "INTAKE-NYCAC-MIXMAG-CABARET-2026",
  "INTAKE-NYCAC-BEDFORD-TOWN-HALL-2026",
  "INTAKE-NYCAC-CREATENYC-APPENDIX-2026",
  "INTAKE-NYCAC-SBJSA-TRANSCRIPT-2026",
  "INTAKE-KC-TOWN-HALL-CCED-MINUTES-2026",
  "INTAKE-KC-TOWN-HALL-WITHDRAWAL-2026",
  "INTAKE-CLAUDETTE-AR-COLLABORATION-2026"
];

export const requiredResearchSourceIds = [
  "SRC-COMMUNITY-GREENE-HILL-QA-2017",
  "SRC-WATERWAYS-WLBT-VICKSBURG-2007",
  "SRC-WATERWAYS-PITCH-GULF-FOLLOWUP-2009",
  "SRC-NYCAC-MIXMAG-CABARET-HEARING-2017",
  "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017",
  "SRC-NYCAC-CREATENYC-APPENDIX-2017",
  "SRC-NYCAC-NYC-COUNCIL-SBJSA-TRANSCRIPT-2018",
  "SRC-KC-TOWN-HALL-CCED-MINUTES-2019",
  "SRC-KC-TOWN-HALL-WITHDRAWAL-ORDINANCE-2024",
  "SRC-CLAUDETTE-MICHAEL-REES-AR-COLLABORATION"
];

const blockedPublicRepoMarkers = [
  "/Users/",
  "/Volumes/",
  "/private/tmp/",
  "file://",
  "supporting-materials",
  "raw transcript"
];

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export function validateKnowledgeIntake() {
  const errors = [];
  const coverageErrors = [];
  const researchErrors = [];
  const dispositionErrors = [];
  const projectionErrors = [];
  const intakeIds = knowledgeBank.intakes.map(({ id }) => id);
  const intakeIdSet = new Set(intakeIds);
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );

  for (const id of duplicates(intakeIds)) {
    coverageErrors.push(`Duplicate intake ID: ${id}`);
  }

  for (const id of requiredSeedIntakeIds) {
    if (!intakeIdSet.has(id)) coverageErrors.push(`Missing required intake: ${id}`);
  }

  const researchedUrls = new Set();
  for (const sourceId of requiredResearchSourceIds) {
    const source = sourceById.get(sourceId);
    if (!source) {
      researchErrors.push(`Missing required researched source: ${sourceId}`);
      continue;
    }

    if (source.visibility !== "public" || !source.canonicalUrl) {
      researchErrors.push(`${sourceId} must be public and expose a canonical URL`);
    }
    if (source.canonicalUrl && researchedUrls.has(source.canonicalUrl)) {
      researchErrors.push(`${sourceId} duplicates a researched canonical URL`);
    }
    if (source.canonicalUrl) researchedUrls.add(source.canonicalUrl);
    if (!source.supportsGenerally.length || !source.doesNotEstablish.length) {
      researchErrors.push(`${sourceId} needs explicit support and does-not-establish boundaries`);
    }

    const linkedIntakes = knowledgeBank.intakes.filter((intake) =>
      intake.sourceIds.includes(sourceId)
    );
    const linkedClaims = knowledgeBank.claims.filter((claim) =>
      claim.evidence.some((evidence) => evidence.sourceId === sourceId)
    );
    if (!linkedIntakes.length || !linkedClaims.length) {
      researchErrors.push(`${sourceId} needs at least one intake and one atomic claim edge`);
    }
  }

  for (const intake of knowledgeBank.intakes) {
    const serialized = JSON.stringify(intake);
    for (const marker of blockedPublicRepoMarkers) {
      if (serialized.toLowerCase().includes(marker.toLowerCase())) {
        coverageErrors.push(`${intake.id} contains blocked public-repo marker: ${marker}`);
      }
    }

    for (const sourceId of intake.sourceIds) {
      if (!sourceById.has(sourceId)) {
        dispositionErrors.push(`${intake.id} references unknown source ${sourceId}`);
      }
    }
    for (const claimId of intake.claimIds) {
      if (!claimById.has(claimId)) {
        dispositionErrors.push(`${intake.id} references unknown claim ${claimId}`);
      }
    }
    for (const inquiryId of intake.inquiryIds) {
      if (!inquiryById.has(inquiryId)) {
        dispositionErrors.push(`${intake.id} references unknown inquiry ${inquiryId}`);
      }
    }
    if (intake.duplicateOf && !intakeIdSet.has(intake.duplicateOf)) {
      dispositionErrors.push(`${intake.id} references unknown duplicate intake ${intake.duplicateOf}`);
    }

    if (
      intake.maturity === "decomposed" &&
      (!intake.sourceIds.length || (!intake.claimIds.length && !intake.inquiryIds.length))
    ) {
      dispositionErrors.push(
        `${intake.id} is decomposed without a source and a claim candidate or inquiry`
      );
    }

    const destinationRequirements = {
      "source-created": intake.sourceIds.length > 0,
      "claim-candidate-created": intake.claimIds.length > 0,
      "research-inquiry-created": intake.inquiryIds.length > 0,
      "linked-existing":
        intake.sourceIds.length + intake.claimIds.length + intake.inquiryIds.length > 0,
      "linked-duplicate": Boolean(intake.duplicateOf),
      "held-protected": ["approval-required", "protected"].includes(intake.publicUse),
      superseded: Boolean(intake.duplicateOf)
    };

    if (!destinationRequirements[intake.disposition]) {
      dispositionErrors.push(
        `${intake.id} has disposition ${intake.disposition} without its required destination`
      );
    }

    const selectedAndPublishable =
      intake.maturity === "decomposed" &&
      intake.publicUse === "public-linkable" &&
      intake.editorialState === "selected";
    const activeProjections = intake.claimIds.flatMap((claimId) =>
      (claimById.get(claimId)?.projections ?? []).filter(
        (projection) => projection.status === "active"
      )
    );

    if (activeProjections.length && !selectedAndPublishable) {
      projectionErrors.push(
        `${intake.id} links an active projection without decomposed, public-linkable, selected status`
      );
    }

    if (
      ["approval-required", "protected"].includes(intake.publicUse) &&
      intake.canonicalUrl
    ) {
      projectionErrors.push(`${intake.id} exposes a canonical URL despite non-public use policy`);
    }
  }

  errors.push(...coverageErrors, ...researchErrors, ...dispositionErrors, ...projectionErrors);
  return {
    errors,
    checks: {
      coverage: {
        passed: coverageErrors.length === 0,
        errors: coverageErrors,
        evidence: `${knowledgeBank.intakes.length} intake records include all ${requiredSeedIntakeIds.length} required fragments.`
      },
      research: {
        passed: researchErrors.length === 0,
        errors: researchErrors,
        evidence: `${requiredResearchSourceIds.length} newly researched public sources have unique URLs, support boundaries, and claim edges.`
      },
      disposition: {
        passed: dispositionErrors.length === 0,
        errors: dispositionErrors,
        evidence: "Every intake destination resolves to a canonical source, claim, inquiry, duplicate, or protected hold."
      },
      projection: {
        passed: projectionErrors.length === 0,
        errors: projectionErrors,
        evidence: "No intake-linked claim is actively projected without separate evidence, public-use, and editorial-selection approval."
      }
    }
  };
}
