import assert from "node:assert/strict";
import test from "node:test";

import { evaluateHjeClientChronology, loadCandidate } from "./hje-client-chronology-eval.mjs";

test("the bounded HJE client period and independent LLC formation date pass", () => {
  const result = evaluateHjeClientChronology(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateHjeClientChronology(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure("reintroducing a mixed employer container fails", (candidate) => {
  candidate.resumes[0].text = candidate.resumes[0].text.replace("THICK ARTS LLC", "INDEPENDENT PRACTICE / THICK ARTS LLC");
}, /single employer container|must not breach/);

expectFailure("a current-client work-card implication fails", (candidate) => {
  candidate.work = candidate.work.replace('years: "2009-2015"', 'years: "2009-Present"');
}, /must be 2009-2015|must not imply a current client/);

expectFailure("reintroducing LLC formation chronology in a resume fails", (candidate) => {
  candidate.resumes[0].text = candidate.resumes[0].text.replace("Led e-commerce", "In 2012, formalized the practice as Thick Arts LLC with HJE as its first client. Led e-commerce");
}, /keep formation and first-client chronology out/);

expectFailure("removing the canonical first-client claim fails", (candidate) => {
  candidate.knowledgeBank.claims = candidate.knowledgeBank.claims.filter((item) => item.id !== "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015");
}, /canonical HJE\/Thick Arts first-client claim is missing/);

expectFailure("changing the official formation date fails", (candidate) => {
  candidate.contract.authoritativeCorrection.llcFormationDate = "2009-01-01";
}, /formation-date contract must remain 2012-07-06/);

expectFailure("reintroducing chronology into the HJE case study fails", (candidate) => {
  candidate.caseStudy = `Jamie's work began in 2009; he formed Thick Arts LLC in 2012 with HJE as its first client and continued through 2015.\n${candidate.caseStudy}`;
}, /must not spend its narrative opening on chronology|must keep chronology out/);
