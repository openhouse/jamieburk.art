import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateProjectWebsites,
  loadCandidate,
  resumeSources
} from "./project-website-inventory-eval.mjs";

test("the dated project-website inventory and restored close readings pass", () => {
  const result = evaluateProjectWebsites(loadCandidate());
  assert.equal(result.passed, true, result.failures.join("\n"));
});

test("the website-link evaluator classifies resume markdown separately from cover letters", () => {
  const resumes = resumeSources(process.cwd());
  assert.equal(resumes.length, 5);
  assert(resumes.every(({ name }) => /Resume/.test(name)));
  assert(resumes.every(({ name }) => !/Cover-Letter/.test(name)));
});

test("Harry J. Epstein may remain plain text in maintained resumes", () => {
  const candidate = loadCandidate();
  candidate.resumes = candidate.resumes.map((resume) => ({
    ...resume,
    text: resume.text.replaceAll("https://www.harryepstein.com/", "")
  }));
  const result = evaluateProjectWebsites(candidate);
  assert.equal(result.passed, true, result.failures.join("\n"));
});

function expectFailure(name, mutate, expected) {
  test(name, () => {
    const candidate = loadCandidate();
    mutate(candidate);
    const result = evaluateProjectWebsites(candidate);
    assert.equal(result.passed, false, "mutation should fail");
    assert.match(result.failures.join("\n"), expected);
  });
}

expectFailure("count drift fails", (candidate) => {
  candidate.inventory.projectSites.pop();
}, /exactly 10 project-site rows/);

expectFailure("KC Town Hall cannot become a current service from restoration alone", (candidate) => {
  candidate.inventory.projectSites.find((site) => site.projectId === "kc-town-hall").boundary = "Tired of Tires is operating now.";
}, /non-current-schedule boundary/);

expectFailure("shared KC Town Hall page authorship cannot inflate to direct", (candidate) => {
  candidate.inventory.projectSites.find((site) => site.projectId === "kc-town-hall").jamieImplementationEvidence = "direct";
}, /page-level authorship must remain bounded/);

expectFailure("CallNYC cannot lose its archive destination", (candidate) => {
  candidate.work = candidate.work.replace('{ label: "Visit archived CallNYC", url: "https://callnyc.org/" },\n', "");
}, /explicit archived-site link/);

expectFailure("every maintained resume must carry useful project links", (candidate) => {
  candidate.resumes[0].text = candidate.resumes[0].text.replaceAll("https://wowlist.org/", "");
}, /missing project link https:\/\/wowlist\.org\//);
