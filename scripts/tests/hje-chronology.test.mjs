import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const firstClientClaimId = "CLM-HJE-FIRST-THICK-ARTS-CLIENT";
const chronologyClaimId = "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015";
const archiveSourceIds = [
  "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
  "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
  "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
];

test("HJE is governed as Thick Arts' first client without inventing independent corroboration", () => {
  const claim = knowledgeBank.claims.find(({ id }) => id === firstClientClaimId);
  assert.ok(claim, "The canonical HJE first-client claim must exist");
  assert.equal(claim.status, "confirmed-with-boundary");
  assert.match(claim.internalClaim, /first client of Thick Arts LLC/i);
  assert.ok(claim.evidence.every(({ renderCitation }) => renderCitation === false));

  const firstPartySource = knowledgeBank.sources.find(
    ({ id }) => id === "SRC-HJE-FIRST-CLIENT-ACCOUNT-2026"
  );
  assert.ok(firstPartySource, "Jamie's first-party client account must be governed as a source");
  assert.equal(firstPartySource.visibility, "protected");
  assert.ok(
    firstPartySource.doesNotEstablish.some((boundary) => /independent corroboration/i.test(boundary)),
    "The first-party source must not present itself as independent corroboration"
  );
});

test("HJE storefront chronology is bounded to 2009-2015 and archive observation dates", () => {
  const claim = knowledgeBank.claims.find(({ id }) => id === chronologyClaimId);
  assert.ok(claim, "The canonical HJE chronology claim must exist");
  assert.equal(claim.status, "confirmed-with-boundary");
  assert.match(claim.internalClaim, /2009-2015/);

  for (const sourceId of archiveSourceIds) {
    const source = knowledgeBank.sources.find(({ id }) => id === sourceId);
    assert.ok(source, `${sourceId} must exist`);
    assert.equal(source.kind, "archived-web-capture");
    assert.equal(source.visibility, "public");
    assert.match(source.archiveUrl, /^https:\/\/web\.archive\.org\/web\//);
    assert.ok(
      source.doesNotEstablish.some((boundary) => /client|contract/i.test(boundary)),
      `${sourceId} must distinguish storefront activity from client or contract dates`
    );
  }

  const correction = knowledgeBank.corrections.find(
    ({ id }) => id === "COR-HJE-TIMEFRAME-2026"
  );
  assert.ok(correction, "The superseded 2012-Present wording must have a correction record");
  assert.equal(correction.previousText, "2012-Present");
  assert.equal(correction.replacementText, "2009-2015");

  const agencyRelation = knowledgeBank.agencyRelations.find(
    ({ id }) => id === "REL-THICK-ARTS-HJE-STOREFRONT"
  );
  assert.ok(agencyRelation, "The implementation relationship must be explicit");
  assert.deepEqual(agencyRelation.claimIds, [
    firstClientClaimId,
    "CLM-THICK-ARTS-FORMATION-2012-07-06",
    chronologyClaimId
  ]);
  assert.ok(agencyRelation.sourceIds.includes("SRC-HJE-FIRST-CLIENT-ACCOUNT-2026"));
  assert.ok(archiveSourceIds.every((sourceId) => agencyRelation.sourceIds.includes(sourceId)));
});

test("Thick Arts formation is independently dated without erasing the earlier HJE work", () => {
  const formationSource = knowledgeBank.sources.find(
    ({ id }) => id === "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS"
  );
  assert.ok(formationSource, "The official New York State formation source must exist");
  assert.equal(formationSource.organization, "New York State Department of State");
  assert.equal(formationSource.publishedAt, "2012-07-06");
  assert.ok(formationSource.canonicalUrl.includes("data.ny.gov"));

  const formationClaim = knowledgeBank.claims.find(
    ({ id }) => id === "CLM-THICK-ARTS-FORMATION-2012-07-06"
  );
  assert.ok(formationClaim, "The Thick Arts formation claim must exist");
  assert.match(formationClaim.internalClaim, /July 6, 2012/);
  assert.ok(
    formationClaim.boundaries.some((boundary) => /began in 2009/i.test(boundary)),
    "The formation claim must retain the earlier HJE work boundary"
  );

  const publicWork = readFileSync("apps/www/src/data/work.ts", "utf8");
  assert.match(publicWork, /work began in 2009/i);
  assert.match(publicWork, /formalized.*Thick Arts LLC.*2012/i);
  assert.match(publicWork, /first client/i);
  assert.doesNotMatch(publicWork, /years:\s*["']2012-Present["']/i);
});
