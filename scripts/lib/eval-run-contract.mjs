const fingerprintPattern = /^sha256:[a-f0-9]{64}$/;

export function validateRunBinding(suite, run) {
  const errors = [];
  const required = suite.run_record_schema?.required ?? [];
  for (const field of required) {
    if (run[field] === undefined || run[field] === "") {
      errors.push(`${field} is required`);
    }
  }

  for (const field of [
    "candidate_fingerprint",
    "contract_fingerprint",
    "evidence_bundle_fingerprint"
  ]) {
    if (!fingerprintPattern.test(run[field] ?? "")) {
      errors.push(`${field} must be a sha256 fingerprint`);
    }
  }

  if (run.profile !== run.target) errors.push("profile must match the evaluated target");
  if (typeof run.evaluator_identity !== "string" || !run.evaluator_identity.trim()) {
    errors.push("evaluator_identity is required");
  }
  if (typeof run.evaluator_authored_candidate !== "boolean") {
    errors.push("evaluator_authored_candidate must be boolean");
  }
  if (!Array.isArray(run.unresolved_blockers)) errors.push("unresolved_blockers must be an array");
  if (run.next_action !== null && typeof run.next_action !== "string") {
    errors.push("next_action must be a string or null");
  }
  const allowedStates = new Set(suite.run_record_schema?.allowed_final_states ?? []);
  if (!allowedStates.has(run.final_state)) errors.push(`unsupported final_state: ${run.final_state ?? "missing"}`);
  if (run.final_state === "threshold_met" && run.evaluator_authored_candidate) {
    errors.push("an evaluator that authored the candidate cannot certify threshold_met");
  }
  if (run.final_state === "human_blocked" && !(run.unresolved_blockers?.length > 0)) {
    errors.push("human_blocked requires at least one unresolved blocker");
  }
  return errors;
}

export function testFingerprint(seed = "0") {
  return `sha256:${seed.repeat(64).slice(0, 64)}`;
}
