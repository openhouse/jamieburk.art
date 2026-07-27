export const requiredRestorationGates = Object.freeze([
  "creator",
  "rights",
  "consent",
  "exact-credit",
  "crop",
  "caption",
  "represented-person",
  "editorial",
  "production",
  "deployment",
  "indexing"
]);

export const authorityRegistryPurpose =
  "Identify the human reviewers whose authority counts for a photo gate " +
  "without allowing a restoration decision or its evidence records to " +
  "redefine them.";

export const authorityRegistryDenials = Object.freeze([
  "production publication approval",
  "deployment approval",
  "indexing approval",
  "a broader copyright license",
  "consent for a materially different use"
]);

export const authorityCanaryPhotoId =
  "photo.east-river-manhattan-bridge.2022";

export const authorityCanaryBasisRecordIds = Object.freeze([
  authorityCanaryPhotoId,
  "source.permission.elana-gordon.east-river-portfolio"
]);

export const authorityCanaryDecisionId =
  "decision.photo.restoration.east-river.2026-07-26";

export const authorityCanaryDecisionPath =
  "docs/knowledge-bank/decisions/photo-restoration-east-river-2026-07-26.md";

export const authorityCanaryGateReviewers = Object.freeze({
  creator: Object.freeze(["Elana Gordon"]),
  rights: Object.freeze(["Elana Gordon"]),
  consent: Object.freeze(["Jamie Burkart"]),
  "exact-credit": Object.freeze(["Elana Gordon", "Jamie Burkart"]),
  crop: Object.freeze(["Elana Gordon", "Jamie Burkart"]),
  caption: Object.freeze(["Elana Gordon", "Jamie Burkart"]),
  "represented-person": Object.freeze(["Jamie Burkart"]),
  editorial: Object.freeze(["Jamie Burkart"]),
  production: Object.freeze(["Jamie Burkart"]),
  deployment: Object.freeze(["Jamie Burkart"]),
  indexing: Object.freeze(["Jamie Burkart"])
});

export const restorationRecordAllowedKeys = Object.freeze([
  "aliases",
  "anti_claims",
  "canonical_path",
  "chosen_course",
  "confirmed_facts",
  "constraints",
  "credit_scope",
  "decision_actors",
  "decision_period",
  "decision_question",
  "decision_state",
  "discovery_terms",
  "evidence",
  "hard_screens",
  "headings",
  "human_review",
  "id",
  "inferences",
  "interview_questions",
  "kind",
  "last_reviewed",
  "one_year_risk_conditions",
  "one_year_success_conditions",
  "options_considered",
  "outcome_boundary",
  "path",
  "portfolio_routes",
  "projection",
  "registry_ids",
  "relations",
  "restoration_action",
  "restoration_approval_statement",
  "restoration_approved_by",
  "restoration_decided_at",
  "restoration_gate_reviews",
  "restoration_human_reviewed",
  "restoration_occurrence_ids",
  "restoration_photo_id",
  "restoration_public_surface_fingerprint",
  "restoration_withdrawal_implemented_at",
  "restoration_withdrawal_plan_id",
  "resulting_artifacts",
  "review_by",
  "role_requirements",
  "sensitivity",
  "status",
  "summary",
  "title",
  "unknowns",
  "visibility",
  "wanted"
]);

export const restorationEmptyListFields = Object.freeze([
  "aliases",
  "confirmed_facts",
  "discovery_terms",
  "evidence",
  "hard_screens",
  "inferences",
  "interview_questions",
  "one_year_risk_conditions",
  "one_year_success_conditions",
  "portfolio_routes",
  "registry_ids",
  "relations",
  "role_requirements",
  "wanted"
]);

export const restorationGatePolicy = Object.freeze({
  creator: Object.freeze({
    authority: "creator-or-rights-holder",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["source", "asset"])
  }),
  rights: Object.freeze({
    authority: "creator-or-rights-holder",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["source", "asset"])
  }),
  consent: Object.freeze({
    authority: "represented-person-or-consent-authority",
    statuses: Object.freeze(["cleared", "not-applicable"]),
    evidenceKinds: Object.freeze(["source", "asset", "decision"])
  }),
  "exact-credit": Object.freeze({
    authority: "creator-and-editorial-owner",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["source", "asset", "decision"])
  }),
  crop: Object.freeze({
    authority: "creator-and-editorial-owner",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["evaluation", "decision", "asset"])
  }),
  caption: Object.freeze({
    authority: "creator-and-editorial-owner",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["evaluation", "decision", "asset"])
  }),
  "represented-person": Object.freeze({
    authority: "represented-person",
    statuses: Object.freeze(["cleared", "not-applicable"]),
    evidenceKinds: Object.freeze(["asset", "decision", "source"])
  }),
  editorial: Object.freeze({
    authority: "portfolio-owner",
    statuses: Object.freeze(["cleared"]),
    evidenceKinds: Object.freeze(["evaluation", "decision"])
  }),
  production: Object.freeze({
    authority: "production-owner",
    statuses: Object.freeze(["open-separated-gate"]),
    evidenceKinds: Object.freeze(["projection"])
  }),
  deployment: Object.freeze({
    authority: "deployment-owner",
    statuses: Object.freeze(["open-separated-gate"]),
    evidenceKinds: Object.freeze(["projection"])
  }),
  indexing: Object.freeze({
    authority: "indexing-owner",
    statuses: Object.freeze(["open-separated-gate"]),
    evidenceKinds: Object.freeze(["projection"])
  })
});

export function sameAuthoritySet(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  if (
    left.length === 0 ||
    new Set(left).size !== left.length ||
    new Set(right).size !== right.length
  ) {
    return false;
  }
  return JSON.stringify([...left].sort()) ===
    JSON.stringify([...right].sort());
}
