import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import {
  nycaPressArticles,
  nycaPressCampaigns,
  nycaPressCorpusStats
} from "../../apps/www/src/data/knowledge-bank/nyca-press-corpus.ts";
import { validateKnowledgeBank } from "../lib/citation-validation.mjs";

test("canonical lifecycle records pass validation", () => {
  assert.deepEqual(validateKnowledgeBank(), []);
});

test("intake can preserve researched, open, and unprojected material", () => {
  assert.ok(knowledgeBank.intakeItems.length >= 4);
  assert.ok(
    knowledgeBank.intakeItems.some((item) => item.researchStatus === "researched")
  );
  assert.ok(
    knowledgeBank.intakeItems.some(
      (item) => item.researchStatus === "needs-more-research"
    )
  );
  assert.ok(
    knowledgeBank.intakeItems.some(
      (item) => item.publicationStatus === "knowledge-bank-only"
    )
  );
});

test("atomic observations remain source-linked", () => {
  const sourceIds = new Set(knowledgeBank.sources.map((source) => source.id));
  assert.ok(knowledgeBank.observations.length >= 18);
  assert.ok(
    knowledgeBank.observations.every(
      (observation) =>
        sourceIds.has(observation.sourceId) &&
        (observation.claimIds.length || observation.researchInquiryIds.length)
    )
  );
});

test("portfolio expansion ingests exactly ten new public sources", () => {
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-2026-07-12-PORTFOLIO-STRENGTHENING-SOURCES"
  );
  assert.ok(intake);
  assert.equal(intake.sourceIds.length, 10);
  assert.equal(new Set(intake.sourceIds).size, 10);
  assert.ok(
    intake.sourceIds.every((id) =>
      knowledgeBank.sources.some(
        (source) => source.id === id && source.visibility === "public"
      )
    )
  );
});

test("NYC Artist Coalition press recovery is complete and deduplicated", () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(nycaPressCampaigns).map(([key, campaign]) => [
        key,
        campaign.expected
      ])
    ),
    { letnycdance: 21, talksnotraids: 7, savenycspaces: 8, fairrentnyc: 9 }
  );
  assert.equal(nycaPressCorpusStats.placementCount, 45);
  assert.equal(nycaPressCorpusStats.uniqueArticleCount, 44);
  assert.equal(nycaPressCorpusStats.reusedSourceCount, 3);
  assert.equal(nycaPressCorpusStats.newArticleSourceCount, 41);
  assert.equal(nycaPressCorpusStats.archivedArticleCount, 44);
  assert.equal(new Set(nycaPressArticles.map((article) => article.sourceId)).size, 44);
  assert.ok(
    nycaPressArticles.every(
      (article) =>
        article.archiveUrl.startsWith("https://web.archive.org/web/") &&
        knowledgeBank.sources.some((source) => source.id === article.sourceId)
    )
  );
});

test("each campaign has a researched knowledge-bank-only intake", () => {
  for (const campaign of Object.keys(nycaPressCampaigns)) {
    const intake = knowledgeBank.intakeItems.find(
      (item) => item.id === `INTAKE-2026-07-13-NYCA-PRESS-${campaign.toUpperCase()}`
    );
    assert.ok(intake);
    assert.equal(intake.researchStatus, "researched");
    assert.equal(intake.publicationStatus, "knowledge-bank-only");
    assert.ok(intake.observationIds.length > 1);
  }
});

test("campaign authorship and press claims retain collective boundaries", () => {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const authorship = claimById.get("CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP");
  const press = claimById.get("CLM-NYCA-CAMPAIGN-PRESS-CORPUS");
  const rent = claimById.get("CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT");

  assert.equal(authorship?.status, "confirmed-with-boundary");
  assert.ok(authorship?.antiClaims.some((value) => /solely led|alone caused/i.test(value)));
  assert.equal(press?.status, "confirmed-with-boundary");
  assert.ok(press?.boundaries.some((value) => /inclusion.*endorsed/i.test(value)));
  assert.equal(rent?.status, "confirmed-with-boundary");
  assert.ok(
    rent?.boundaries.some((value) => /do not establish Jamie's complete individual/i.test(value))
  );
});

test("KC Town Hall funding lifecycle preserves appropriation and non-disbursement", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const intake = knowledgeBank.intakeItems.find(
    (item) => item.id === "INTAKE-2026-07-14-KC-TOWN-HALL-COUNCIL-FUNDING"
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-COUNCIL-APPROPRIATION"
  );
  const sourceIds = [
    "SRC-KC-TOWN-HALL-RESOLUTION-190649",
    "SRC-KC-TOWN-HALL-ORDINANCE-190642",
    "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17",
    "SRC-KC-TOWN-HALL-ORDINANCE-240317"
  ];

  assert.ok(intake);
  assert.equal(intake.researchStatus, "researched");
  assert.equal(intake.publicationStatus, "eligible");
  assert.ok(sourceIds.every((sourceId) => intake.sourceIds.includes(sourceId)));
  assert.ok(
    sourceIds.every((sourceId) => sourceById.get(sourceId)?.kind === "government-record")
  );
  assert.equal(claim?.status, "confirmed-with-boundary");
  assert.ok(sourceIds.every((sourceId) => claim?.evidence.some((item) => item.sourceId === sourceId)));
  assert.ok(
    claim?.boundaries.some((value) => /appropriation is not receipt.*disbursement/i.test(value))
  );
  assert.ok(claim?.antiClaims.some((value) => /received or spent/i.test(value)));
});

test("KC Town Hall public proof advances beyond recommendation without claiming receipt", () => {
  const proof = readFileSync("apps/www/src/data/proofs.ts", "utf8");
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const caseStudy = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");

  assert.match(proof, /City Council acceptance and appropriation/);
  assert.match(proof, /project ultimately withdrew/);
  assert.match(proof, /KC Town Hall received or spent \$490,539/);
  assert.match(work, /City Council acceptance and appropriation/);
  assert.match(work, /full unused appropriation was reclaimed/);
  assert.match(caseStudy, /Phase One cold-shell scope as completed/);
  assert.match(caseStudy, /withdrew before disbursement/);
  assert.doesNotMatch(caseStudy, /stay tied to a \$490,539 public funding recommendation/);
});

test("KC Town Hall Phase One separates protected document facts from first-person role claims", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const proposal = sourceById.get("SRC-KC-TOWN-HALL-CCED-PROPOSAL-2019");
  const account = sourceById.get("SRC-KC-TOWN-HALL-JAMIE-ACCOUNT-2026-07-15");
  const phaseOne = claimById.get("CLM-KC-TOWN-HALL-PHASE-ONE-COMPLETION");
  const contractor = claimById.get("CLM-KC-TOWN-HALL-GENERAL-CONTRACTOR-ROLE");

  assert.equal(proposal?.visibility, "protected");
  assert.equal(proposal?.preservationStatus, "private");
  assert.ok(proposal?.protectedLocatorId);
  assert.equal(proposal?.canonicalUrl, undefined);
  assert.equal(account?.visibility, "protected");
  assert.equal(phaseOne?.status, "confirmed-with-boundary");
  assert.ok(phaseOne?.boundaries.some((value) => /not an independent.*certification/i.test(value)));
  assert.equal(contractor?.status, "use-with-care");
  assert.ok(contractor?.antiClaims.some((value) => /licensed general contractor/i.test(value)));
  assert.ok(contractor?.projections.every((projection) => projection.status !== "active"));
});

test("KC Town Hall stewardship transition stays distinct from municipal withdrawal", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const observationById = new Map(
    knowledgeBank.observations.map((observation) => [observation.id, observation])
  );
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KC-TOWN-HALL-STEWARDSHIP-TRANSITION"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026"
  );
  const caseStudy = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");

  assert.equal(
    sourceById.get("SRC-KC-TOWN-HALL-JAMIE-TRANSITION-ACCOUNT-2026-07-15")
      ?.visibility,
    "protected"
  );
  assert.equal(
    observationById.get("OBS-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-ACCOUNT")
      ?.status,
    "provisional"
  );
  assert.equal(claim?.status, "confirmed-with-boundary");
  assert.ok(claim?.boundaries.some((value) => /does not establish how.*relates/i.test(value)));
  assert.ok(claim?.antiClaims.some((value) => /caused, constituted, or completed/i.test(value)));
  assert.ok(
    claim?.projections.some(
      (projection) =>
        projection.status === "active" &&
        projection.surfaces.includes("/work/kc-town-hall")
    )
  );
  assert.equal(inquiry?.resultStatus, "queued");
  assert.match(caseStudy, /transitioned project stewardship.*mission-aligned organization/);
  assert.match(caseStudy, /Separately, the municipal funding project later withdrew/);
});

test("KC Spaces Fund Facebook census preserves collective credit and full-population boundaries", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const intake = knowledgeBank.intakeItems.find(
    (item) =>
      item.id === "INTAKE-2026-07-15-KCSPACES-FACEBOOK-POST-FULL-POPULATION"
  );
  const population = claimById.get("CLM-KCSPACES-FACEBOOK-SURVIVING-POPULATION");
  const role = claimById.get("CLM-KCSPACES-CROSS-CHANNEL-DIGITAL-SUPPORT");
  const traction = claimById.get("CLM-KCSPACES-FACEBOOK-INTERACTION-SIGNALS");

  assert.equal(intake?.researchStatus, "researched");
  assert.equal(intake?.publicationStatus, "eligible");
  assert.equal(intake?.sourceIds.length, 10);
  assert.equal(intake?.observationIds.length, 11);
  assert.equal(intake?.claimIds.length, 5);
  assert.equal(intake?.researchInquiryIds.length, 3);
  assert.equal(population?.status, "confirmed-with-boundary");
  assert.ok(population?.boundaries.some((value) => /capture-date Page feed/i.test(value)));
  assert.equal(role?.status, "confirmed-with-boundary");
  assert.ok(role?.antiClaims.includes("Jamie managed or posted from the KC Spaces Fund Facebook Page."));
  assert.ok(role?.boundaries.some((value) => /Public organizer credit remains/i.test(value)));
  assert.equal(traction?.status, "use-with-care");
  assert.ok(traction?.projections.every((projection) => projection.status === "hold"));
  assert.equal(
    sourceById.get("SRC-KCSPACES-JAMIE-ROLE-CLARIFICATION-2026")?.visibility,
    "protected"
  );
  assert.equal(
    sourceById.get("SRC-KCSPACES-KANSAS-CITY-STAR-2020-04-10")?.kind,
    "published-article"
  );
});

test("KC neighborhood archive recovery strengthens the ledger without overstating Jamie's role", () => {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const tired = claimById.get("CLM-KC-TIRED-OF-TIRES-OPERATIONS");
  const ledger = claimById.get("CLM-KC-TIRE-PICKUP-LEDGER");
  const cleveland = claimById.get("CLM-KC-CLEVELAND-UNIFY-TO-BEAUTIFY");
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-KC-NEIGHBORHOOD-PROGRAMS-2026"
  );

  assert.equal(tired?.status, "use-with-care");
  assert.ok(tired?.boundaries.some((value) => /Oak Park Neighborhood Association/i.test(value)));
  assert.ok(tired?.evidence.some((item) => item.sourceId === "SRC-KC-TIRE-PICKUP-LEDGER-2019-2022"));
  assert.equal(ledger?.status, "confirmed-with-boundary");
  assert.ok(ledger?.boundaries.some((value) => /not an independent audit/i.test(value)));
  assert.equal(cleveland?.status, "use-with-care");
  assert.ok(cleveland?.boundaries.some((value) => /Pastor Lee originated/i.test(value)));
  assert.ok(cleveland?.antiClaims.some((value) => /alone founded|alone.*operated/i.test(value)));
  assert.equal(inquiry?.resultStatus, "partially-recovered");
  assert.ok(inquiry?.findings.some((value) => /1,970 tires/i.test(value)));
  assert.ok(inquiry?.limitations.some((value) => /project-maintained ledger/i.test(value)));
});

test("claim maturity matches recovered evidence", () => {
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  assert.equal(
    claimById.get("CLM-WATERWAYS-RAFT-EXPEDITION")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-NYCA-CABARET-LAW-CONTRIBUTION")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL")?.status,
    "use-with-care"
  );
  assert.equal(
    claimById.get("CLM-NYCA-COFOUNDER-ROLE")?.status,
    "confirmed-with-boundary"
  );
  assert.equal(
    claimById.get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS")?.status,
    "confirmed-with-boundary"
  );
});

test("social account archive preserves collective credit and bounded engagement", () => {
  const sourceById = new Map(knowledgeBank.sources.map((source) => [source.id, source]));
  const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
  const inquiryById = new Map(
    knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry])
  );

  const identity = claimById.get("CLM-PROJECT-SOCIAL-IDENTITY-SYSTEMS");
  const continuity = claimById.get("CLM-NYCA-X-PUBLIC-IDENTITY-CONTINUITY");
  const council = claimById.get("CLM-NYCA-X-COUNCIL-ENGAGEMENT");
  const callnyc = claimById.get("CLM-CALLNYC-COUNCIL-ENGAGEMENT-METRICS");

  assert.equal(identity?.status, "use-with-care");
  assert.ok(identity?.antiClaims.some((value) => /authored every project post/i.test(value)));
  assert.equal(continuity?.status, "confirmed-with-boundary");
  assert.match(continuity?.internalClaim ?? "", /504 posts by 179 identities/i);
  assert.ok(continuity?.boundaries.some((value) => /not a complete platform export/i.test(value)));
  assert.equal(council?.status, "confirmed-with-boundary");
  assert.match(council?.internalClaim ?? "", /seven distinct Council-member accounts.*21 recovered posts/i);
  assert.ok(council?.antiClaims.some((value) => /Only seven/i.test(value)));
  assert.match(callnyc?.internalClaim ?? "", /at least six distinct then-Council-member accounts/i);
  assert.ok(callnyc?.projections.some(
    (projection) => projection.status === "active" && projection.surfaces.includes("/work/callnyc")
  ));
  assert.ok(sourceById
    .get("SRC-PROJECT-X-AUTHENTICATED-PROFILE-INVENTORY-2026-07-15")
    ?.doesNotEstablish.some((value) => /authored every post/i.test(value)));
  assert.equal(
    inquiryById.get("INQ-NYCA-X-ENGAGEMENT-COMPLETENESS-2026")?.resultStatus,
    "partially-recovered"
  );
});

test("inference claims cannot silently reach active projection", () => {
  for (const claim of knowledgeBank.claims.filter(
    (item) => item.status === "inference"
  )) {
    assert.ok(claim.researchInquiryIds.length > 0);
    assert.ok(claim.projections.every((projection) => projection.status !== "active"));
  }
});

test("open research distinguishes queued from partially recovered", () => {
  const queued = knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "queued"
  );
  const partial = knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "partially-recovered"
  );
  assert.ok(queued.length >= 1);
  assert.ok(partial.length >= 4);
  assert.equal(
    knowledgeBank.researchInquiries.find(
      (inquiry) => inquiry.id === "INQ-CALLNYC-COUNCIL-ENGAGEMENT-2026"
    )?.resultStatus,
    "partially-recovered"
  );
  assert.ok(queued.every((inquiry) => !inquiry.runAt && inquiry.findings.length === 0));
  assert.ok(
    partial.every(
      (inquiry) => inquiry.runAt && inquiry.findings.length && inquiry.limitations.length
    )
  );
});
