import assert from "node:assert/strict";
import test from "node:test";

const evaluatorModule = await import("./human-scale-weekly-review-eval.mjs").catch(() => null);

function readyReview() {
  return {
    window: {
      timezone: "America/New_York",
      start_date: "2026-08-31",
      end_date: "2026-09-06",
      local_civil_day_count: 7,
      current: true
    },
    evidence: {
      bounded: true,
      source_cutoff_recorded: true,
      every_gap_dispositioned: true,
      occurrence_claims_source_backed: true
    },
    activity_metrics: {
      commit_count_primary_success_metric: false,
      line_count_primary_success_metric: false,
      artifact_count_primary_success_metric: false
    },
    capacity: {
      state: "recorded",
      inferred_from_workload: false,
      private_detail_in_public_projection: false
    },
    meetings: [
      {
        id: "meeting-1",
        occurred: true,
        purpose_recorded: true,
        understanding_recorded: true,
        contested_recorded: true,
        accepted_actions_dispositioned: true,
        reconvene_decision_recorded: true
      }
    ],
    commitments: [
      {
        id: "commitment-1",
        owner: "Jamie Burkart",
        accepted: true,
        state: "active",
        successful_outcome: "Return one bounded decision packet",
        next_action: "Draft the packet outline"
      }
    ],
    open_loops: [
      {id: "loop-1", disposition: "next-action"},
      {id: "loop-2", disposition: "waiting-for"},
      {id: "loop-3", disposition: "reference"}
    ],
    selection: {
      maximum_active_outcomes: 3,
      active_outcomes: ["decision-packet", "accepted-call", "weekly-review"]
    },
    public_projection: {
      requested: false,
      human_authorized: false,
      private_detail_present: false
    },
    authority: {
      implementation_authorized: false,
      publication_authorized: false
    }
  };
}

async function evaluate(review) {
  assert.equal(
    typeof evaluatorModule?.evaluateHumanScaleWeeklyReview,
    "function",
    "human-scale weekly review evaluator must exist"
  );
  return evaluatorModule.evaluateHumanScaleWeeklyReview(review);
}

test("a bounded week with three accepted outcomes becomes ready for human review", async () => {
  assert.deepEqual(await evaluate(readyReview()), {
    decision: "ready-for-human-review",
    stage: "human-review",
    reasons: []
  });
});

test("repository activity counts cannot stand in for real-world success", async () => {
  const review = readyReview();
  review.activity_metrics.commit_count_primary_success_metric = true;

  assert.deepEqual(await evaluate(review), {
    decision: "deny",
    stage: "evidence",
    reasons: ["activity-counts-cannot-establish-success"]
  });
});

test("a weekly review holds when it activates more than three outcomes", async () => {
  const review = readyReview();
  review.selection.active_outcomes.push("fourth-outcome");

  assert.deepEqual(await evaluate(review), {
    decision: "hold",
    stage: "selection",
    reasons: ["active-outcome-limit-exceeded"]
  });
});

test("another person's proposed action cannot silently become Jamie's commitment", async () => {
  const review = readyReview();
  review.commitments[0].accepted = false;
  review.commitments[0].ownership_defaulted_to_jamie = true;

  assert.deepEqual(await evaluate(review), {
    decision: "deny",
    stage: "commitment-clarification",
    reasons: [
      "ownership-cannot-default-to-jamie:commitment-1",
      "unaccepted-active-commitment:commitment-1"
    ]
  });
});

test("an occurred meeting without a designed ending remains held", async () => {
  const review = readyReview();
  review.meetings[0].accepted_actions_dispositioned = false;
  review.meetings[0].reconvene_decision_recorded = false;

  assert.deepEqual(await evaluate(review), {
    decision: "hold",
    stage: "meeting-close",
    reasons: ["meeting-ending-incomplete:meeting-1"]
  });
});

test("capacity and rest cannot be inferred from visible output", async () => {
  const review = readyReview();
  review.capacity.state = "inferred-good";
  review.capacity.inferred_from_workload = true;

  assert.deepEqual(await evaluate(review), {
    decision: "deny",
    stage: "capacity",
    reasons: ["capacity-inference-forbidden"]
  });
});

test("stale evidence and undispositioned coverage gaps remain explicit holds", async () => {
  const review = readyReview();
  review.window.current = false;
  review.evidence.every_gap_dispositioned = false;

  assert.deepEqual(await evaluate(review), {
    decision: "hold",
    stage: "evidence",
    reasons: ["evidence-gap-undispositioned", "review-window-not-current"]
  });
});

test("every open loop requires exactly one actionable disposition", async () => {
  const review = readyReview();
  review.open_loops[1].disposition = "";

  assert.deepEqual(await evaluate(review), {
    decision: "hold",
    stage: "open-loop-clarification",
    reasons: ["open-loop-disposition-missing:loop-2"]
  });
});

test("private capacity or relationship detail cannot enter a public weekly projection", async () => {
  const review = readyReview();
  review.public_projection.requested = true;
  review.public_projection.human_authorized = true;
  review.public_projection.private_detail_present = true;

  assert.deepEqual(await evaluate(review), {
    decision: "deny",
    stage: "public-projection-review",
    reasons: ["public-projection-contains-private-week-detail"]
  });
});

test("a separately authorized minimal public projection becomes a candidate only", async () => {
  const review = readyReview();
  review.public_projection.requested = true;
  review.public_projection.human_authorized = true;

  assert.deepEqual(await evaluate(review), {
    decision: "eligible-public-candidate",
    stage: "public-candidate-review",
    reasons: []
  });
});

test("the proposed RFC remains unimplemented while its behavioral contract is reviewable", () => {
  assert.equal(
    typeof evaluatorModule?.evaluateHumanScaleWeeklyReviewRFC,
    "function",
    "RFC evaluator must bind the proposal, contract, and cases"
  );

  const result = evaluatorModule.evaluateHumanScaleWeeklyReviewRFC();
  assert.equal(result.stage, "proposed");
  assert.equal(result.implementation_authorized, false);
  assert.equal(result.publication_authorized, false);
  assert.deepEqual(result.hard_failures, []);
  assert.equal(result.scenarios.failed, 0);
});
