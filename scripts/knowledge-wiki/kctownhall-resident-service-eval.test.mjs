import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateResidentService,
  loadCandidate
} from "./kctownhall-resident-service-eval.mjs";

test("the governed Tired of Tires resident-service candidate passes", () => {
  const result = evaluateResidentService(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateResidentService(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure(
  "the operating workbook cannot become public",
  (candidate) => {
    const source = candidate.knowledgeBank.sources.find(
      (item) => item.id === "SRC-KCTH-TIRED-OF-TIRES-OPERATING-WORKBOOK-2019-2022"
    );
    source.visibility = "public";
  },
  /operating workbook must remain protected and private/
);

expectFailure(
  "a private-derived workbook aggregate cannot enter public copy",
  (candidate) => {
    candidate.project += "\nThe private workbook showed 1,970 tires.\n";
  },
  /unapproved private-workbook aggregate/
);

expectFailure(
  "the visual sequence cannot lose its before image binding",
  (candidate) => {
    candidate.component = candidate.component.replace(
      "portfolioPhotos.kcTownHallTiredOfTiresBefore",
      "portfolioPhotos.kcTownHallRoofWork"
    );
  },
  /must bind all three governed visual assets/
);

expectFailure(
  "resume prose cannot drift from its governed projection",
  (candidate) => {
    candidate.productResume = candidate.productResume.replace(
      "Helped deliver Tired of Tires",
      "Single-handedly designed Tired of Tires"
    );
  },
  /must match its governed resident-service projection/
);

expectFailure(
  "the public materials cannot expose the protected Drive locator",
  (candidate) => {
    candidate.intake += "\nhttps://docs.google.com/spreadsheets/d/private-id\n";
  },
  /expose a private Drive locator/
);

expectFailure(
  "the public materials cannot promote sole authorship",
  (candidate) => {
    candidate.project += "\nJamie single-handedly designed the program.\n";
  },
  /overclaim sole authorship/
);
