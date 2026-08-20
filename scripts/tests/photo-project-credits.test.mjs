import assert from "node:assert/strict";
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
