function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "en"));
}

function candidateMatches(contract, envelopeCandidate, currentCandidate) {
  return (contract.candidate_binding?.required_fields ?? []).every(
    (field) =>
      typeof envelopeCandidate?.[field] === "string" &&
      envelopeCandidate[field].length > 0 &&
      envelopeCandidate[field] === currentCandidate?.[field]
  );
}

function gateReview(contract, gates = {}) {
  const denyReasons = [];
  const holdReasons = [];
  const allowedStates = new Set(contract.human_gates?.allowed_states ?? []);
  const approvalRequired = new Set(contract.human_gates?.approval_required ?? []);

  for (const gateName of contract.human_gates?.required ?? []) {
    const gate = gates[gateName];
    if (!gate) {
      holdReasons.push(`gate-missing:${gateName}`);
      continue;
    }
    if (gate.state === "denied") {
      denyReasons.push(`gate-denied:${gateName}`);
      continue;
    }
    if (
      !allowedStates.has(gate.state) ||
      gate.authority !== "human-recorded" ||
      !gate.decided_by ||
      !gate.decided_at
    ) {
      holdReasons.push(`gate-not-recorded:${gateName}`);
      continue;
    }
    if (approvalRequired.has(gateName) && gate.state !== "approved") {
      holdReasons.push(`gate-approval-required:${gateName}`);
    }
  }

  return {
    denyReasons: sortedUnique(denyReasons),
    holdReasons: sortedUnique(holdReasons)
  };
}

export function evaluateExchangeEnvelope(contract, envelope, currentCandidate) {
  if (contract.authority?.automation_release_authority !== "none") {
    return {
      decision: "deny",
      reasons: ["automation-release-authority-forbidden"]
    };
  }

  const transportOnly = new Set(contract.exchange_kinds?.transport_only ?? []);
  const releaseCandidates = new Set(contract.exchange_kinds?.release_candidates ?? []);

  if (transportOnly.has(envelope?.kind)) {
    return {
      decision: "deny",
      reasons: ["transport-is-not-release-authority"]
    };
  }
  if (!releaseCandidates.has(envelope?.kind)) {
    return {
      decision: "deny",
      reasons: ["exchange-kind-not-release-eligible"]
    };
  }
  if (!candidateMatches(contract, envelope?.candidate, currentCandidate)) {
    return {
      decision: "deny",
      reasons: ["candidate-binding-mismatch"]
    };
  }

  const { denyReasons, holdReasons } = gateReview(contract, envelope?.gates);
  if (denyReasons.length > 0) {
    return { decision: "deny", reasons: denyReasons };
  }

  const knownPostures = new Set(contract.temporal_postures ?? []);
  if (!knownPostures.has(envelope?.temporal_posture)) {
    holdReasons.push("temporal-posture-not-declared");
  }

  const correctionPolicy = contract.correction_policy ?? {};
  const holdStatuses = new Set(correctionPolicy.hold_statuses ?? []);
  for (const correction of envelope?.corrections ?? []) {
    if (
      correction.effect === correctionPolicy.restrictive_effect &&
      holdStatuses.has(correction.status)
    ) {
      holdReasons.push(`unresolved-restriction:${correction.id}`);
    }
  }

  const reasons = sortedUnique(holdReasons);
  if (reasons.length > 0) return { decision: "hold", reasons };

  return {
    decision: "eligible-for-human-controlled-action",
    reasons: [],
    automation_authority: "none"
  };
}
