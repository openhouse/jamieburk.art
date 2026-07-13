import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { citationNoteId, getClaimProjection, publicCitationRegistry, resolveCitationOccurrence, resolveCitationReferences } from "../../apps/www/src/data/knowledge-bank/public.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical registry passes deterministic validation", () => assert.deepEqual(validateKnowledgeBank(), []));

test("page-local numbering follows first source appearance", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-date-time").sources.map((item) => item.number), [1, 2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "first-councilstat-hackathon").sources.map((item) => item.number), [2]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.number), [3, 4]);
  assert.deepEqual(resolveCitationOccurrence("callnyc", "event-branding").sources.map((item) => item.number), [5]);
});

test("new editorial projections resolve through page-local citation plans", () => {
  assert.equal(resolveCitationReferences("about").length, 4);
  assert.ok(resolveCitationReferences("fair-rent-nyc").length >= 8);
  assert.deepEqual(
    resolveCitationOccurrence("fair-rent-nyc", "nycac-public-testimony-2017-2019").sources.map(
      (item) => item.source.id
    ),
    ["SRC-NYC-COUNCIL-CABARET-HEARING-2017", "SRC-NYC-COUNCIL-MARCH-HEARING-2019"]
  );
  assert.equal(resolveCitationOccurrence("wowlist", "sbdiy-calendar-use").sources.length, 1);
  assert.equal(
    resolveCitationOccurrence("wowlist", "wowlist-public-support-surface").sources.length,
    7
  );
  assert.match(
    getClaimProjection(
      "CLM-WOWLIST-PUBLIC-SUPPORT-SURFACE",
      "case-study",
      "/work/wowlist"
    ).text,
    /direct support surface/
  );
  assert.equal(
    resolveCitationOccurrence("kc-town-hall", "resident-service-workflow").sources.length,
    5
  );
  assert.match(
    getClaimProjection(
      "CLM-KCTH-RESIDENT-SERVICE-WORKFLOW",
      "case-study",
      "/work/kc-town-hall"
    ).text,
    /Jamie and Julia published the resident-facing workflow/
  );
  assert.deepEqual(
    resolveCitationOccurrence(
      "fair-rent-nyc",
      "crs-privacy-preserving-data-pilot"
    ).sources.map((item) => item.source.id),
    ["SRC-CRS-FULLER-PUBLIC-BASELINE-2026"]
  );
  assert.deepEqual(
    resolveCitationOccurrence(
      "fair-rent-nyc",
      "nycac-resource-and-advocacy-surface"
    ).sources.map((item) => item.source.id),
    [
      "SRC-NYCAC-SOCIAL-FAIR-RENT-2026",
      "SRC-NYCAC-SOCIAL-CREATE-IN-PLACE-2026",
      "SRC-NYCAC-SOCIAL-ARTIST-LABOR-2026",
      "SRC-NYCAC-SOCIAL-NIGHTLIFE-ACCOUNTABILITY-2025"
    ]
  );
  assert.equal(
    getClaimProjection(
      "CLM-NYCAC-RESOURCE-AND-ADVOCACY-SURFACE",
      "case-study",
      "/work/fair-rent-nyc"
    ).text,
    "The shared identity remained active through 2026, carrying Fair Rent advocacy, artist-resource pathways, labor actions, and nightlife accountability across one collective public surface."
  );
  assert.deepEqual(
    resolveCitationOccurrence("kc-town-hall", "municipal-record").sources.map(
      (item) => item.source.id
    ),
    [
      "SRC-KCMO-KC-TOWN-HALL-PROPOSAL-2019",
      "SRC-KCMO-KC-TOWN-HALL-RESOLUTION-190649-2019",
      "SRC-KCMO-CCED-ORDINANCE-190642-2019",
      "SRC-KCMO-KC-TOWN-HALL-MINUTES-2021",
      "SRC-KC-TOWN-HALL-JAMIE-TRANSITION-CONFIRMATION-2026",
      "SRC-KCMO-CCED-CLAWBACK-240317-2024"
    ]
  );
  assert.match(
    getClaimProjection(
      "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
      "about",
      "/about"
    ).text,
    /participatory public systems/
  );
  assert.match(
    getClaimProjection(
      "CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE",
      "about",
      "/about"
    ).text,
    /more than 1,000 miles/
  );
  assert.match(
    getClaimProjection(
      "CLM-TALKS-NOT-RAIDS-TRANSPARENCY",
      "case-study",
      "/work/fair-rent-nyc"
    ).text,
    /Local Law 220/
  );
});

test("repeated sources retain one note and unique backlinks", () => {
  const references = resolveCitationReferences("callnyc");
  const council = references.find((item) => item.number === 2);
  const politico = references.find((item) => item.number === 3);
  assert.equal(council.backlinks.length, 2);
  assert.equal(politico.backlinks.length, 3);
  assert.equal(new Set(politico.backlinks.map((item) => item.id)).size, 3);
  assert.equal(council.noteId, citationNoteId("callnyc", 2));
});

test("multi-source occurrences preserve editorial order", () => {
  assert.deepEqual(resolveCitationOccurrence("callnyc", "independent-follow-on").sources.map((item) => item.source.id), ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"]);
});

test("Claim resolver returns only active approved projections", () => {
  assert.match(getClaimProjection("CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", "case-study", "/work/callnyc").text, /first CouncilStat hackathon/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-DIGITAL-DISTRICT", "photo-caption", "/work/callnyc"), /Unknown public claim/);
  assert.throws(() => getClaimProjection("CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", "resume-html", "/work"), /not approved/);
});

test("corrections retire old wording from public surfaces", () => {
  const text = ["apps/www/src/content/work/callnyc.mdx", "apps/www/src/data/work.ts", "apps/www/src/data/proofs.ts", "apps/www/src/app/resume/page.tsx"].map((path) => readFileSync(path, "utf8")).join("\n");
  assert.doesNotMatch(text, /first civic-data hackathon|2014[-–]2015/i);
  assert.equal(knowledgeBank.corrections.length, 3);
});

test("negative research preserves scope and limitations", () => {
  const inquiry = knowledgeBank.researchInquiries[0];
  assert.equal(inquiry.resultStatus, "not-recovered");
  assert.ok(inquiry.limitations.some((item) => /not proof of nonexistence/i.test(item)));
  assert.doesNotMatch(inquiry.publicSummary, /did not exist/i);
});

test("private and metadata-only evidence is absent from the public registry", () => {
  const serialized = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(serialized, /PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001/);
  assert.doesNotMatch(serialized, /RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001/);
  assert.doesNotMatch(serialized, /ARCHIVE-TEAMS|ARCHIVE-CRS|RESEARCH-TEAMS/);
  assert.doesNotMatch(serialized, /Mobile Documents|CloudDocs|job-hunt\//i);
  assert.ok(publicCitationRegistry.sources.every((source) => source.visibility === "public"));
});

test("Teams archival production preserves source lineage, selection, and holds", () => {
  const archiveIntakeIds = [
    "INT-2026-07-12-TEAMS-JAMIE-PROJECTS-HISTORY",
    "INT-2026-07-12-TEAMS-CRS",
    "INT-2026-07-12-TEAMS-JOB-HUNT"
  ];
  assert.ok(
    archiveIntakeIds.every((id) =>
      knowledgeBank.intakeItems.some(
        (item) =>
          item.id === id && item.visibility === "protected" && item.status === "processed"
      )
    )
  );
  const pilot = resolveCitationOccurrence(
    "fair-rent-nyc",
    "crs-privacy-preserving-data-pilot"
  );
  assert.match(pilot.projection.text, /coverage and suppression table/);
  assert.match(pilot.projection.text, /without exposing confidential filings/);
  assert.ok(pilot.claim.boundaries.some((boundary) => /not an adopted|proposal/i.test(boundary)));
  const heldIds = [
    "CND-CRS-LEGISLATIVE-PROVENANCE-ARTIFACT",
    "CND-SORTED-AUDIO-MAXMSP-2013",
    "CND-RIVER-RAFT-KC-GULF"
  ];
  assert.ok(
    heldIds.every((id) => {
      const candidate = knowledgeBank.candidateClaims.find((item) => item.id === id);
      return candidate && candidate.status !== "promoted" && !candidate.promotedClaimId;
    })
  );
});

test("Shared Drive archival production promotes the operating pattern without exposing records", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-MEMORY-OPERATIONS"
  );
  const candidate = knowledgeBank.candidateClaims.find(
    (item) => item.id === "CND-CRS-SHARED-MEMORY-OPERATING-SYSTEM"
  );
  assert.equal(candidate?.status, "promoted");
  assert.equal(candidate?.promotedClaimId, claim?.id);
  assert.equal(claim?.evidence.length, 3);
  assert.ok(
    claim?.evidence.every(
      (evidence) => evidence.relationship === "private-support" && !evidence.renderCitation
    )
  );
  assert.match(
    getClaimProjection(
      "CLM-CRS-SHARED-MEMORY-OPERATIONS",
      "case-study",
      "/work/fair-rent-nyc"
    ).text,
    /consent-aware follow-up/
  );
  const serialized = JSON.stringify(publicCitationRegistry);
  assert.doesNotMatch(serialized, /SRC-GDRIVE|ARCHIVE-GDRIVE|RESEARCH-GDRIVE/);
  for (const id of [
    "CND-CRS-CONSENT-AWARE-OUTREACH-OPERATIONS",
    "CND-SUNDAY-DINNER-RECURRING-HOSPITALITY-OPERATIONS",
    "CND-196-RESIDENCY-ONBOARDING-WORKFLOW",
    "CND-CRS-MULTILINGUAL-MEETING-MEMORY"
  ]) {
    const held = knowledgeBank.candidateClaims.find((item) => item.id === id);
    assert.notEqual(held?.status, "promoted");
    assert.equal(held?.promotedClaimId, undefined);
  }
});

test("candidate claims remain deeper than the selected public registry", () => {
  const promoted = knowledgeBank.candidateClaims.filter((candidate) => candidate.status === "promoted");
  const held = knowledgeBank.candidateClaims.filter((candidate) => candidate.status !== "promoted");
  const serialized = JSON.stringify(publicCitationRegistry);
  assert.ok(promoted.length >= 6);
  assert.ok(held.length > 0);
  assert.ok(promoted.length < knowledgeBank.candidateClaims.length);
  for (const candidate of held) assert.doesNotMatch(serialized, new RegExp(candidate.id));
  assert.doesNotMatch(serialized, /ultimately caused New York City to disband MARCH/);
  assert.doesNotMatch(serialized, /Kansas City to the Gulf of Mexico/);
});

test("knowledge development records preserve promotion lineage and explicit holds", () => {
  assert.ok(knowledgeBank.intakeItems.length >= 19);
  assert.ok(knowledgeBank.sourceReadings.length >= 22);
  assert.ok(knowledgeBank.intakeItems.every((item) => item.linkedRecordIds.length > 0));
  assert.ok(knowledgeBank.promotions.every((promotion) =>
    knowledgeBank.candidateClaims.some((candidate) => candidate.id === promotion.candidateClaimId)
  ));
  const heldByBriefs = new Set(knowledgeBank.editorialBriefs.flatMap((brief) => brief.heldCandidateClaimIds));
  assert.ok(heldByBriefs.has("CND-CALLNYC-COUNCIL-ENGAGEMENT-STATS"));
  assert.ok(heldByBriefs.has("CND-NYCAC-SOLE-POLICY-CAUSALITY"));
  assert.ok(heldByBriefs.has("CND-KC-TOWN-HALL-FUNDING-AWARD"));
});

test("campaign press collections preserve placements, deduplication, and retrieval boundaries", () => {
  assert.deepEqual(
    knowledgeBank.pressCollections.map((collection) => [
      collection.campaign,
      collection.entries.length
    ]),
    [
      ["Let NYC Dance", 21],
      ["Talks Not Raids", 7],
      ["Save NYC Spaces", 8],
      ["Fair Rent NYC", 1]
    ]
  );
  const placements = knowledgeBank.pressCollections.flatMap((collection) => collection.entries);
  assert.equal(placements.length, 37);
  assert.equal(new Set(placements.map((entry) => entry.sourceId)).size, 36);
  assert.equal(
    placements.filter((entry) => entry.sourceId === "SRC-NYCAC-CABARET-NPR-2017").length,
    2
  );
  assert.ok(
    placements
      .filter((entry) => entry.retrievalStatus === "metadata-only")
      .every((entry) => entry.archiveUrl)
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE"
  );
  assert.ok(claim.boundaries.some((boundary) => /not.*reach/i.test(boundary)));
  assert.ok(claim.antiClaims.some((antiClaim) => /earned-media/i.test(antiClaim)));
});

test("KC Town Hall preserves appropriation, transition, and non-disbursement boundaries", () => {
  const resolved = resolveCitationOccurrence("kc-town-hall", "municipal-record");
  assert.match(resolved.projection.text, /Council adopted Resolution 190649/);
  assert.match(resolved.projection.text, /Ordinance 190642 appropriating/);
  assert.match(resolved.projection.text, /transitioned the project to a mission-aligned organization/);
  assert.match(resolved.projection.text, /reappropriated the unused funds in 2024/);
  assert.ok(resolved.claim.boundaries.some((boundary) => /not receipt or disbursement/i.test(boundary)));
  assert.ok(resolved.claim.boundaries.some((boundary) => /reason for the transition.*not.*published/i.test(boundary)));
  assert.doesNotMatch(resolved.projection.text, /(because|due to).*transition/i);
  const held = knowledgeBank.candidateClaims.find(
    (candidate) => candidate.id === "CND-KC-TOWN-HALL-FUNDING-AWARD"
  );
  assert.equal(held.status, "hold");
  assert.equal(held.promotedClaimId, undefined);
});

test("rendering primitives preserve no-JavaScript document semantics", () => {
  const cite = readFileSync("apps/www/src/components/citations/Cite.tsx", "utf8");
  const references = readFileSync("apps/www/src/components/citations/References.tsx", "utf8");
  const sourceNote = readFileSync("apps/www/src/components/citations/SourceNote.tsx", "utf8");
  assert.match(cite, /role="doc-noteref"/);
  assert.match(references, /role="doc-endnotes"/);
  assert.match(references, /<ol>/);
  assert.match(sourceNote, /role="doc-backlink"/);
});
