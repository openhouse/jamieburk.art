import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";
import { evaluatePhotographyResidencyProposal } from "./photography-residency-proposal-eval.mjs";

const result = compileWiki();

function cloneRecord(id) {
  return structuredClone(result.byId.get(id));
}

function source(id) {
  const record = result.byId.get(id);
  return readFileSync(path.join(defaultRepoRoot, record.path), "utf8");
}

const proposalId = "research.photography-first-pass-residency-proposal.2026-07-22";
const evaluationId = "evaluation.photography-residency-proposal.2026-07-22";

test("photography residency proposal baseline passes", () => {
  const evaluation = evaluatePhotographyResidencyProposal({ result });
  assert.deepEqual(evaluation.failures, []);
  assert.equal(evaluation.counts.requiredRecords, 4);
  assert.equal(evaluation.counts.blockingCriteria, 16);
});

test("a missing proposal fails materialization", () => {
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    recordOverrides: { [proposalId]: null }
  });
  assert.equal(evaluation.checks.residency_proposal_records_materialized, false);
});

test("the notebook and 196 project must lead into the proposal", () => {
  const notebook = cloneRecord("index.knowledge-wiki.photography-notebook");
  notebook.relations = notebook.relations.filter(
    (relation) => relation.target !== proposalId
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    recordOverrides: { [notebook.id]: notebook }
  });
  assert.equal(evaluation.checks.residency_proposal_navigation_reachable, false);
});

test("invitation cannot become a delivery contract", () => {
  const mutated = source(proposalId)
    .replace("The proposal is not a contract.", "The proposal is a binding contract.")
    .replace(
      "No resident is judged by whether they do what they promised.",
      "Every resident is judged against promised deliverables."
    );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.proposal_intent_not_contract, false);
});

test("the rough field cannot become a completion quota", () => {
  const mutated = source(proposalId)
    .replace(/approximately 1,000\s+photographs/, "exactly 1,000 approved photographs")
    .replace(
      /not a\s+quota, a representative sample, a ranking, or a promise/,
      "a mandatory quota and final representative ranking"
    );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.rough_field_not_quota, false);
});

test("the work must remain free to change medium and form", () => {
  const mutated = source(proposalId).replace(
    /Photography might remain the medium\. It might become writing, conversation,\s+mapping, performance, sound, hospitality/,
    "Photography must remain the sole medium and become a final exhibition"
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.artistic_form_may_change, false);
});

test("deviation rest refusal and surprise cannot be removed", () => {
  const mutated = source(proposalId).replace(
    /Deviation, incompletion, rest, refusal, and\s+surprise remain available/,
    "Deviation, incompletion, rest, refusal, and surprise are prohibited"
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.deviation_rest_refusal_protected, false);
});

test("the public proposal cannot disclose a private residence locator", () => {
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: {
      [proposalId]: `${source(proposalId)}\nPrivate archive: /Users/example/Home/Photos\n`
    }
  });
  assert.equal(evaluation.checks.residency_proposal_public_boundary_clean, false);
});

test("the residence remains bounded in time and public-safe place", () => {
  const mutated = source(proposalId)
    .replace("For up to two weeks", "For an unlimited mandatory term")
    .replace("near Fort Greene Park", "at a disclosed private street address");
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.residency_time_place_bounded, false);
});

test("hospitality cannot become uniform transformation evidence", () => {
  const mutated = source(proposalId)
    .replace("Hospitality is not an outcome claim.", "Hospitality proves impact.")
    .replace(
      /does not claim that every\s+196 resident had the same experience/,
      "proves that every 196 resident was transformed"
    );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.hospitality_outcomes_not_inferred, false);
});

test("the Cole process cannot become endorsement of 196", () => {
  const mutated = source(proposalId).replace(
    /does not claim that Cole stated\s+the 196 residency philosophy, modeled this program, or endorsed this project/,
    "proves that Cole modeled and endorsed the 196 residency program"
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.teju_process_source_bounded, false);
});

test("the recorded human acceptance cannot return to an open review state", () => {
  const proposal = cloneRecord(proposalId);
  proposal.human_review = "governed-open";
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    recordOverrides: { [proposal.id]: proposal }
  });
  assert.equal(evaluation.checks.residency_human_acceptance_recorded, false);
});

test("AI cannot substitute itself for Jamie's acceptance", () => {
  const mutated = source(proposalId).replace(
    /Jamie Burkart, acting as both\s+the artist and the host of 196, replied: "Your proposal is accepted\. Welcome\."/,
    'Codex, acting as an AI evaluator, replied: "Your proposal is accepted. Welcome."'
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.residency_human_acceptance_recorded, false);
});

test("proposal acceptance cannot become publication clearance", () => {
  const mutated = source(proposalId).replace(
    "Acceptance authorizes the experiment, not its interpretation or publication.",
    "Acceptance authorizes every interpretation and public image."
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [proposalId]: mutated }
  });
  assert.equal(evaluation.checks.proposal_acceptance_not_publication, false);
});

test("AI cannot replace exact-use human photo approval", () => {
  const methodId = "method.photographic-archive-fieldwork";
  const mutated = source(methodId).replace(
    "may not clear a safety hold, infer consent, or grant publication permission",
    "may clear safety, infer consent, and grant publication permission"
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [methodId]: mutated }
  });
  assert.equal(evaluation.checks.photography_human_gates_intact, false);
});

test("the evaluator cannot grade aesthetic success or productivity", () => {
  const mutated = source(evaluationId)
    .replace(
      /cannot grade photographs, measure artistic\s+productivity, require fidelity to the proposal, or decide whether the residency\s+was meaningful/,
      "must grade every photograph, productivity target, and final meaning"
    )
    .replace(
      /may not encode aesthetic taste,\s+required motifs, minimum outputs, or a preferred final medium/,
      "must encode preferred motifs, minimum outputs, and a final medium"
    );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    sourceOverrides: { [evaluationId]: mutated }
  });
  assert.equal(evaluation.checks.proposal_eval_nonprescriptive, false);
});

test("the proposal cannot activate its own portfolio projection", () => {
  const proposal = cloneRecord(proposalId);
  proposal.projection_status = "active";
  proposal.projection = { status: "active", surfaces: ["/work"] };
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    recordOverrides: { [proposal.id]: proposal }
  });
  assert.equal(evaluation.checks.residency_proposal_projection_held, false);
});

test("the proposal evaluator must remain wired into repository checks", () => {
  const mainEvaluator = readFileSync(
    path.join(defaultRepoRoot, "scripts/knowledge-wiki/evaluate-wiki.mjs"),
    "utf8"
  );
  const evaluation = evaluatePhotographyResidencyProposal({
    result,
    mainEvaluatorOverride: mainEvaluator.replace(
      'import { evaluatePhotographyResidencyProposal } from "./photography-residency-proposal-eval.mjs";',
      ""
    )
  });
  assert.equal(evaluation.checks.residency_proposal_eval_wired, false);
});
