const expectedSourceIds = [
  "SRC-FB-JAMIE-OWNER-POST-POPULATION-2026",
  "SRC-FB-JAMIE-OWNER-POST-CONTROLS-2026",
  "SRC-FB-JAMIE-NTER-OPENING-2010",
  "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015",
  "SRC-FB-JAMIE-COUNCILSTAT-JOB-2016",
  "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017",
  "SRC-FB-JAMIE-KCTOWNHALL-START-2018",
  "SRC-FB-JAMIE-TALKSNOTRAIDS-ACTION-2019",
  "SRC-GOTHAMIST-CABARET-MOMENTUM-2017-03-31"
];

const expectedClaimIds = [
  "CLM-FB-JAMIE-RETURNED-POST-POPULATION-2026",
  "CLM-FB-JAMIE-MISSION-ROUTING-2026",
  "CLM-FB-JAMIE-POSTED-URL-INVENTORY-2026",
  "CLM-FB-JAMIE-OUTBOUND-STAKEHOLDER-ROUTING-2026",
  "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026",
  "CLM-FB-JAMIE-PARTICIPATION-ROUTING-PRACTICE",
  "CLM-FB-JAMIE-NTER-OPENING-TRACE-2010",
  "CLM-FB-JAMIE-COUNCILSTAT-INVITATION-2016",
  "CLM-FB-JAMIE-KCTOWNHALL-COINITIATION-2018",
  "CLM-FB-JAMIE-GOTHAMIST-CABARET-CONTEXT-2017"
];

const expectedInquiryIds = [
  "INQ-FB-JAMIE-OWNER-POST-POPULATION-2026",
  "INQ-FB-JAMIE-POSTED-SOURCES-2026",
  "INQ-FB-JAMIE-POST-ENGAGEMENT-2026",
  "INQ-FB-JAMIE-COUNCILSTAT-ROLE-2026"
];

const expectedIntakeIds = [
  "INTAKE-FB-JAMIE-OWNER-POST-POPULATION-2026",
  "INTAKE-FB-JAMIE-POSTED-SOURCE-FIELD-2026",
  "INTAKE-FB-JAMIE-STAKEHOLDER-ENGAGEMENT-2026",
  "INTAKE-FB-JAMIE-SELECTED-PROJECT-POSTS-2026",
  "INTAKE-FB-JAMIE-GOTHAMIST-CABARET-2017"
];

const riskPatterns = [
  ["lifetime-population overclaim", /(?:complete|full|entire|every|all).{0,40}Facebook.{0,80}(?:ever|lifetime|all-time)/i],
  ["universal-public-audience overclaim", /(?:all|every|the full|the entire).{0,30}(?:1,?243|records?|posts?).{0,40}(?:were|are|is|was) public/i],
  ["routing-as-impact overclaim", /(?:mission|project|practice)[- ]routing.{0,100}(?:proves?|measures?|ranks?).{0,80}(?:effort|importance|priority|impact)/i],
  ["posted-link corroboration overclaim", /(?:all|every).{0,30}549.{0,40}(?:links?|destinations?).{0,80}(?:prove|confirm|corroborate)/i],
  ["stakeholder-engagement overclaim", /(?:mentions?|tags?|links?|references?).{0,90}(?:prove|show|establish).{0,50}(?:engagement|endorsement|support|response|influence)/i],
  ["mutable-counter impact overclaim", /(?:reactions?|likes?|comments?|counters?).{0,100}(?:prove|measure|equal|represent).{0,60}(?:people|reach|audience|endorsement|impact)/i],
  ["CouncilStat role overclaim", /Jamie.{0,90}(?:employed|employee|staff|controlled hiring|hiring authority).{0,80}(?:CouncilStat|City Council)/i],
  ["sole-project overclaim", /Jamie.{0,70}(?:alone|solely|single-handedly).{0,80}(?:KC Town Hall|WOW List|Let NYC Dance|Talks Not Raids|campaign)/i]
];

const denialPattern =
  /(?:do not|does not|did not|not|never|cannot|could not|no evidence|not establish|not a|not an|remain(?:s|ed)? open|pending|without|rather than)/i;

function fragments(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|while|rather than)\b\s+/i)
    .filter(Boolean);
}

export function findPersonalFacebookPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const [label, pattern] of riskPatterns) {
      if (pattern.test(fragment) && !denialPattern.test(fragment)) return label;
    }
  }
  return null;
}

const sumValues = (record) =>
  Object.values(record ?? {}).reduce((total, value) => total + Number(value), 0);

export function validatePersonalFacebookPosts({ knowledgeBank, controls, publicArtifacts }) {
  const errors = [];
  const sources = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claims = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiries = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );
  const intakes = new Map(knowledgeBank.intakes.map((intake) => [intake.id, intake]));
  const population = controls.populationControl?.uniqueRecords;

  if (
    population !== 1243 ||
    controls.populationControl?.cursorPages !== 621 ||
    controls.populationControl?.returnedNodes !== 3728 ||
    controls.populationControl?.terminalHasNextPage !== false ||
    controls.populationControl?.missingDates !== 0 ||
    controls.populationControl?.ownerAbsentRecords !== 0 ||
    controls.populationControl?.recoveredStart !== "2006-12-19" ||
    controls.populationControl?.recoveredEnd !== "2022-06-12" ||
    controls.populationControl?.currentTopEdge !== "2022-06-12"
  ) {
    errors.push("Personal Facebook population or chronology controls drifted");
  }

  for (const [label, record] of [
    ["year", controls.recordsByYear],
    ["form", controls.recordForms],
    ["theme", controls.broadClassification?.themes],
    ["relevance", controls.broadClassification?.professionalRelevance]
  ]) {
    if (sumValues(record) !== population) {
      errors.push(`Personal Facebook ${label} totals do not reconcile to the population`);
    }
  }

  if (
    controls.populationControl?.audienceLabelExposedRecords +
      controls.populationControl?.audienceLabelNotExposedRecords !==
    population
  ) {
    errors.push("Personal Facebook audience-label accounting does not reconcile");
  }

  if (
    controls.missionRouting?.uniqueRecords !== 181 ||
    controls.postedUrlInventory?.urlBearingRecords !== 430 ||
    controls.postedUrlInventory?.uniqueNormalizedExternalUrls !== 549 ||
    controls.selectedPublicSourceControls?.length !== 6 ||
    new Set(controls.selectedPublicSourceControls?.map((item) => item.sourceId)).size !== 6
  ) {
    errors.push("Personal Facebook mission, URL, or selected-source controls drifted");
  }

  if (
    controls.selectedDirectResponses?.projectAccountResponses !== 1 ||
    controls.selectedDirectResponses?.governmentAccountResponsesRecovered !== 0 ||
    !/not an identity-complete engagement census/i.test(
      controls.selectedDirectResponses?.boundary ?? ""
    )
  ) {
    errors.push("Personal Facebook direct-response accounting lost its boundary");
  }

  for (const id of expectedSourceIds) if (!sources.has(id)) errors.push(`Missing source ${id}`);
  for (const id of expectedClaimIds) if (!claims.has(id)) errors.push(`Missing claim ${id}`);
  for (const id of expectedInquiryIds) if (!inquiries.has(id)) errors.push(`Missing inquiry ${id}`);
  for (const id of expectedIntakeIds) if (!intakes.has(id)) errors.push(`Missing intake ${id}`);

  const protectedPopulation = sources.get("SRC-FB-JAMIE-OWNER-POST-POPULATION-2026");
  if (
    protectedPopulation?.visibility !== "protected" ||
    protectedPopulation?.preservationStatus !== "private" ||
    protectedPopulation?.canonicalUrl ||
    protectedPopulation?.archiveUrl ||
    protectedPopulation?.assetUrl
  ) {
    errors.push("Personal Facebook protected population must remain non-linkable");
  }

  for (const id of controls.selectedPublicSourceControls?.map((item) => item.sourceId) ?? []) {
    const source = sources.get(id);
    if (
      source?.visibility !== "public-metadata-only" ||
      source?.preservationStatus !== "private" ||
      source?.canonicalUrl ||
      source?.archiveUrl ||
      source?.assetUrl ||
      !source?.protectedLocatorId
    ) {
      errors.push(`Selected personal Facebook source ${id} exposes native record data`);
    }
  }

  for (const id of expectedClaimIds) {
    const claim = claims.get(id);
    if (claim?.projections.some((projection) => projection.status === "active")) {
      errors.push(`Personal Facebook claim ${id} was projected without editorial selection`);
    }
  }

  const stakeholderClaim = claims.get(
    "CLM-FB-JAMIE-OUTBOUND-STAKEHOLDER-ROUTING-2026"
  );
  const interactionClaim = claims.get(
    "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026"
  );
  const boundaryText = JSON.stringify([
    stakeholderClaim?.boundaries,
    stakeholderClaim?.antiClaims,
    interactionClaim?.boundaries,
    interactionClaim?.antiClaims,
    controls.engagementBoundary
  ]).toLowerCase();
  for (const marker of [
    "outbound",
    "not inbound",
    "not unique people",
    "reach",
    "endorsement",
    "causality",
    "impact",
    "mutable"
  ]) {
    if (!boundaryText.includes(marker)) {
      errors.push(`Personal Facebook evidence is missing the ${marker} boundary`);
    }
  }

  const artifactText = publicArtifacts.join("\n");
  for (const marker of [
    "/Users/",
    "/Volumes/",
    "/private/tmp/",
    "pfbid",
    "facebook.com/jburkart/posts/",
    "facebook.com/jburkart/videos/"
  ]) {
    if (artifactText.includes(marker)) {
      errors.push(`Personal Facebook public artifact contains protected marker: ${marker}`);
    }
  }

  const risk = findPersonalFacebookPublicArtifactRisk(artifactText);
  if (risk) errors.push(`Personal Facebook public artifact risk: ${risk}`);

  if (
    controls.publicSafety?.rawPostTextPublished !== false ||
    controls.publicSafety?.nativeFacebookIdsPublished !== false ||
    controls.publicSafety?.commenterIdentitiesPublished !== false ||
    controls.publicSafety?.authenticatedRoutesPublished !== false
  ) {
    errors.push("Personal Facebook public-safety controls drifted");
  }

  return {
    errors,
    checks: {
      population: population === 1243,
      terminal: controls.populationControl?.terminalHasNextPage === false,
      classification: sumValues(controls.broadClassification?.themes) === population,
      sourceQueue: controls.postedUrlInventory?.uniqueNormalizedExternalUrls === 549,
      selectedSources: controls.selectedPublicSourceControls?.length === 6,
      directResponses: controls.selectedDirectResponses?.projectAccountResponses === 1,
      minimized: !errors.some((error) => /protected marker|exposes native|public-safety/.test(error))
    }
  };
}

export const personalFacebookExpectedIds = {
  sourceIds: expectedSourceIds,
  claimIds: expectedClaimIds,
  inquiryIds: expectedInquiryIds,
  intakeIds: expectedIntakeIds
};
