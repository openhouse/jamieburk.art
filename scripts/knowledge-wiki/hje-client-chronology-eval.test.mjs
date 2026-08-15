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

expectFailure("backdating the LLC itself to 2009 fails", (candidate) => {
  candidate.resumes[0].text = candidate.resumes[0].text.replace("INDEPENDENT PRACTICE / THICK ARTS LLC", "THICK ARTS LLC");
}, /must distinguish the independent practice/);

expectFailure("a current-client work-card implication fails", (candidate) => {
  candidate.work = candidate.work.replace('years: "2009-2015"', 'years: "2009-Present"');
}, /must be 2009-2015|must not imply a current client/);

expectFailure("removing first-client relationship from a resume fails", (candidate) => {
  candidate.resumes[0].text = candidate.resumes[0].text.replace("first client", "client");
}, /first-client relationship/);

expectFailure("removing the canonical first-client claim fails", (candidate) => {
  candidate.knowledgeBank.claims = candidate.knowledgeBank.claims.filter((item) => item.id !== "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015");
}, /canonical HJE\/Thick Arts first-client claim is missing/);

expectFailure("changing the official formation date fails", (candidate) => {
  candidate.contract.authoritativeCorrection.llcFormationDate = "2009-01-01";
}, /formation-date contract must remain 2012-07-06/);

expectFailure("removing the HJE page plan fails", (candidate) => {
  candidate.knowledgeBank.pages = candidate.knowledgeBank.pages.filter((item) => item.id !== "harry-j-epstein");
}, /canonical page plan for the HJE case study is missing/);
