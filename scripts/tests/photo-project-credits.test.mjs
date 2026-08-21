import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import matter from "gray-matter";

import { participationMedia } from "../../apps/www/src/data/participationMedia.ts";
import { portfolioPhotos } from "../../apps/www/src/data/photography.ts";

function wikiRecord(relativePath) {
  return matter(readFileSync(relativePath, "utf8")).data;
}

test("public project photographs use concise project courtesy credits", () => {
  assert.equal(participationMedia.shoestringFacilitation.credit, "Photo courtesy of NYC Artist Coalition.");
  assert.equal(participationMedia.marketHotelTownHall.credit, "Photo courtesy of NYC Artist Coalition.");
  assert.equal(portfolioPhotos.sundayDinnerSharedMap.credit, "Photo courtesy of Sunday Dinner NYC.");
  assert.equal(portfolioPhotos.kcTownHallRoofWork.credit, "Photo courtesy of KC Town Hall.");

  const visitorCredits = [
    participationMedia.shoestringFacilitation.credit,
    participationMedia.marketHotelTownHall.credit,
    portfolioPhotos.sundayDinnerSharedMap.credit,
    portfolioPhotos.kcTownHallRoofWork.credit
  ].join("\n");
  assert.doesNotMatch(visitorCredits, /Paul Mossine|retained export|photographer not identified|individual photographer/i);
});

test("the Knowledge Wiki separates unresolved creators from project courtesy credits", () => {
  const correctionPath = "docs/knowledge-bank/corrections/project-photo-credits-2026-08-20.md";
  assert.ok(existsSync(correctionPath), "The photo-credit correction record is missing.");
  const correction = wikiRecord(correctionPath);
  assert.equal(correction.id, "correction.photo.project-courtesy-credits.2026-08-20");

  const expectations = [
    [
      "docs/knowledge-bank/assets/photographs/nycac-shoestring-facilitation-2017.md",
      "project.nyc-artist-coalition"
    ],
    [
      "docs/knowledge-bank/assets/photographs/nycac-market-hotel-town-hall-2017.md",
      "project.nyc-artist-coalition"
    ],
    [
      "docs/knowledge-bank/assets/photographs/sunday-dinner-shared-map-2013.md",
      "project.sunday-dinner-196"
    ],
    [
      "docs/knowledge-bank/assets/photographs/kc-town-hall-roof-work-2019.md",
      "project.kc-town-hall"
    ]
  ];

  for (const [path, projectId] of expectations) {
    const record = wikiRecord(path);
    assert.match(record.creator_state, /^unresolved/);
    assert.ok(record.statements.some((statement) =>
      statement.property === "public_credit" &&
      statement.value === projectId &&
      statement.rank === "preferred"
    ));
  }

  const retractedAttribution = wikiRecord("docs/knowledge-bank/people/paul-mossine.md");
  assert.equal(retractedAttribution.status, "retired");
  assert.deepEqual(retractedAttribution.relations, [{
    type: "related_to",
    target: "correction.photo.project-courtesy-credits.2026-08-20",
    href: "../corrections/project-photo-credits-2026-08-20.md"
  }]);
});

test("the team-memory photograph is a governed public occurrence", () => {
  const photo = portfolioPhotos.teamKnowledgeCollectiveSynthesis;
  assert.ok(photo, "The team-memory photograph is missing from the public photo manifest.");
  assert.equal(photo.id, "team-knowledge-collective-synthesis");
  assert.equal(photo.src, "/images/field-notes/team-knowledge-collective-synthesis.webp");
  assert.equal(photo.width, 2400);
  assert.equal(photo.height, 1600);
  assert.match(photo.alt, /handwritten|cards|notes/i);
  assert.match(photo.alt, /wooden floor|floor/i);
  assert.equal(photo.credit, "Photo courtesy of NYC Artist Coalition.");
  assert.equal(photo.wikiId, "asset.photo.nycac.collective-synthesis.2017.001");
  assert.deepEqual(photo.placementIds, [
    "projection.photo.team-knowledge.collective-synthesis"
  ]);
  assert.deepEqual(photo.placements, ["team-knowledge-lab"]);
  assert.equal(photo.releaseState.production, "open");
  assert.equal(photo.releaseState.indexing, "open");
  assert.doesNotMatch(JSON.stringify(photo), /\/Users\/|\/Volumes\/|Library\/Photos|[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i);

  const asset = wikiRecord(
    "docs/knowledge-bank/assets/photographs/nycac-collective-synthesis-2017.md"
  );
  const occurrence = wikiRecord(
    "docs/knowledge-bank/projections/photography/team-knowledge-collective-synthesis.md"
  );
  assert.equal(asset.id, photo.wikiId);
  assert.match(asset.creator_state, /^unresolved/);
  assert.equal(asset.rights_state, "cleared");
  assert.ok(asset.visible_observations.length >= 3);
  assert.ok(asset.statements.some((statement) =>
    statement.property === "public_credit" &&
    statement.value === "project.nyc-artist-coalition" &&
    statement.rank === "preferred"
  ));
  assert.equal(occurrence.id, photo.placementIds[0]);
  assert.equal(occurrence.asset, photo.wikiId);
  assert.deepEqual(occurrence.routes, ["/lab/source-backed-team-memory"]);
  assert.equal(occurrence.credit.text, photo.credit);
  assert.equal(occurrence.approval.production, "open");
  assert.equal(occurrence.approval.indexing, "open");

  const derivativePath = `apps/www/public${photo.src}`;
  assert.ok(existsSync(derivativePath), "The metadata-stripped web derivative is missing.");
  const derivative = readFileSync(derivativePath);
  assert.equal(
    createHash("sha256").update(derivative).digest("hex"),
    asset.public_derivatives[0].checksum
  );
  assert.doesNotMatch(derivative.toString("latin1"), /EXIF|Exif|GPSLatitude|GPSLongitude|<x:xmpmeta/i);
});
