import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const defaultSnapshot = path.join(
  repoRoot,
  "config/knowledge-wiki/federated-ecosystem.snapshot.json"
);
const indexPath = path.join(
  repoRoot,
  "docs/knowledge-bank/indexes/federated-knowledge-graph-ecosystem.md"
);
const sourceNotePath = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/federated-knowledge-graph-ecosystem-review-2026-08-13.md"
);
const ecosystemClaimId = "CLM-FEDERATED-KNOWLEDGE-GRAPH-OPERATING-MODEL";

const requiredSystemIds = [
  "portfolio-projection",
  "public-record-edition",
  "issue-source-edition",
  "protected-research-production",
  "protected-packet-materializer",
  "protected-subject-knowledge",
  "bounded-project-threshold"
];

const requiredInvariants = [
  "access-is-not-consent",
  "evidence-is-not-publication-permission",
  "graph-relation-is-not-causation",
  "packet-is-not-projection",
  "public-threshold-is-not-archive-completeness",
  "private-visibility-is-not-security-clearance",
  "automated-score-is-not-human-approval",
  "no-live-cross-repository-runtime-dependency"
];

const requiredHandoffGates = {
  "custody-to-evidence": [
    "bounded request",
    "current authorization",
    "source cutoff",
    "disposition",
    "capture receipt"
  ],
  "evidence-to-semantics": [
    "atomic observation",
    "evidence class",
    "interpretation review",
    "public-safe wording",
    "collective-credit review"
  ],
  "semantics-to-packet": [
    "named recipient",
    "purpose",
    "semantic radius",
    "artifact budget",
    "most-restrictive boundary"
  ],
  "semantics-to-project-threshold": [
    "source basis",
    "rights decision",
    "consent decision",
    "credit review",
    "editorial approval"
  ],
  "semantics-to-portfolio": [
    "audience",
    "purpose",
    "public-safe wording",
    "rights decision",
    "consent decision",
    "credit review",
    "editorial approval"
  ],
  "public-output-to-new-evidence": [
    "bounded public capture",
    "dated observation",
    "source identity",
    "interpretation review"
  ]
};

function includesAll(values, required) {
  return Array.isArray(values) && required.every((value) => values.includes(value));
}

export function loadFederatedContext() {
  return {
    knowledgeBank: structuredClone(knowledgeBank),
    indexSource: readFileSync(indexPath, "utf8"),
    sourceNote: readFileSync(sourceNotePath, "utf8")
  };
}

export function evaluateFederatedEcosystem(
  snapshot,
  context = loadFederatedContext()
) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(snapshot?.schema_version === 1, "schema version must remain 1");
  check(snapshot?.snapshot_date === "2026-08-13", "snapshot date must remain 2026-08-13");
  check(
    snapshot?.authority?.rfc === 5 &&
      snapshot?.authority?.rfc_stage === "exploring" &&
      snapshot?.authority?.implementation_authorized === false,
    "RFC 0005 must remain exploring and implementation-authorized false"
  );
  check(
    snapshot?.authority?.stage_advancement === "human-only" &&
      snapshot?.authority?.projection_status === "hold",
    "stage advancement must remain human-only and the ecosystem projection held"
  );

  const systems = Array.isArray(snapshot?.systems) ? snapshot.systems : [];
  const systemIds = systems.map((system) => system.id);
  check(systems.length > 0, "snapshot has no systems");
  check(new Set(systemIds).size === systemIds.length, "system IDs must be unique");
  for (const id of requiredSystemIds) {
    check(systemIds.includes(id), `required system is missing: ${id}`);
  }

  for (const system of systems) {
    check(
      ["public", "protected"].includes(system.source_visibility),
      `${system.id ?? "unknown system"} has an invalid source visibility`
    );
    if (system.source_visibility === "protected") {
      check(
        system.locator_disclosure === "withheld",
        "protected systems must withhold locators"
      );
      check(
        !Object.keys(system).some((key) => /(?:url|repository|path|locator)$/i.test(key)),
        `${system.id} exposes a protected locator field`
      );
    }
    check(
      typeof system.role === "string" && system.role.length > 0,
      `${system.id ?? "unknown system"} is missing a role`
    );
    check(
      Array.isArray(system.canonical_authority) && system.canonical_authority.length > 0,
      `${system.id ?? "unknown system"} is missing canonical authority`
    );
    check(
      Array.isArray(system.cannot_authorize) && system.cannot_authorize.length > 0,
      `${system.id ?? "unknown system"} is missing authority boundaries`
    );
  }

  const handoffs = Array.isArray(snapshot?.handoffs) ? snapshot.handoffs : [];
  check(handoffs.length === Object.keys(requiredHandoffGates).length, "handoff set is incomplete");
  for (const handoff of handoffs) {
    check(handoff.automatic === false, "handoffs must remain non-automatic");
    check(systemIds.includes(handoff.from), `${handoff.id} has an unresolved from endpoint`);
    check(systemIds.includes(handoff.to), `${handoff.id} has an unresolved to endpoint`);
    const required = requiredHandoffGates[handoff.id];
    check(Boolean(required), `unexpected handoff: ${handoff.id}`);
    for (const gate of required ?? []) {
      check(
        handoff.requires?.includes(gate),
        `${handoff.id} is missing ${gate}`
      );
    }
  }

  for (const invariant of requiredInvariants) {
    check(
      snapshot?.invariants?.includes(invariant),
      `required invariant is missing: ${invariant}`
    );
  }

  const threshold = systems.find((system) => system.id === "bounded-project-threshold");
  check(
    threshold?.cannot_authorize?.includes("deployment, indexing, or relaunch claims"),
    "project threshold must withhold deployment, indexing, and relaunch authority"
  );

  const packet = systems.find((system) => system.id === "protected-packet-materializer");
  check(
    includesAll(packet?.cannot_authorize, [
      "source access",
      "factual truth",
      "editorial adequacy or publication"
    ]),
    "packet materialization must not claim source, truth, or publication authority"
  );

  const subject = systems.find((system) => system.id === "protected-subject-knowledge");
  check(
    subject?.cannot_authorize?.includes("credential clearance"),
    "protected subject knowledge must not claim credential clearance"
  );

  const bank = context?.knowledgeBank;
  const claim = bank?.claims?.find((item) => item.id === ecosystemClaimId);
  const observations = (bank?.observations ?? []).filter((item) =>
    item.claimIds.includes(ecosystemClaimId)
  );
  const observationSourceIds = new Set(observations.map((item) => item.sourceId));
  const protectedSources = (bank?.sources ?? []).filter(
    (source) =>
      source.id.startsWith("SRC-FEDERATED-ECOSYSTEM-") &&
      source.visibility === "protected"
  );
  const claimEvidence = new Map(
    (claim?.evidence ?? []).map((evidence) => [evidence.sourceId, evidence])
  );

  check(Boolean(claim), "structured federated-ecosystem claim is missing");
  if (claim) {
    check(
      claim.status === "confirmed-with-boundary",
      "ecosystem claim must retain confirmed-with-boundary status"
    );
    check(
      claim.projections.length === 1 &&
        claim.projections[0].status === "hold" &&
        claim.projections[0].surfaces.length === 0,
      "ecosystem claim must remain held from public surfaces"
    );
    check(
      claim.antiClaims.some((item) => /synchronized|mutually consistent/i.test(item)) &&
        claim.antiClaims.some((item) => /causation/i.test(item)) &&
        claim.antiClaims.some((item) => /packet/i.test(item)) &&
        claim.antiClaims.some((item) => /private visibility|credential/i.test(item)) &&
        claim.antiClaims.some((item) => /relaunch|deployment|indexing/i.test(item)),
      "ecosystem anti-claims omit synchronization, causation, packet, security, or release boundaries"
    );
  }

  check(
    observations.length === 7 && observationSourceIds.size === 7,
    "federated ecosystem requires seven source-distinct observations"
  );
  check(
    observations.every(
      (observation) =>
        observation.project === "knowledge-wiki-ecosystem" &&
        observation.publicSafe === true
    ),
    "ecosystem observations must remain public-safe and system-scoped"
  );

  check(protectedSources.length === 4, "federated ecosystem requires four protected summary sources");
  for (const source of protectedSources) {
    const evidence = claimEvidence.get(source.id);
    check(
      !source.canonicalUrl &&
        !source.archiveUrl &&
        !source.assetUrl &&
        evidence?.relationship === "private-support" &&
        evidence?.renderCitation === false,
      "protected ecosystem support must expose no URL and render no citation"
    );
  }

  const inquiry = bank?.researchInquiries?.find(
    (item) => item.id === "INQ-FEDERATED-KNOWLEDGE-GRAPH-HANDOFFS"
  );
  check(
    inquiry?.resultStatus === "partially-recovered" &&
      inquiry?.sourceIds?.length === 7,
    "federated handoff inquiry must retain its partial and seven-source scope"
  );

  check(
    context?.indexSource?.includes("## Central finding") &&
      context?.indexSource?.includes("## Governed handoff sequence") &&
      context?.indexSource?.includes("## Why this branch is a leading edge"),
    "federated ecosystem index is missing its finding, handoff, or leading-edge account"
  );
  check(
    /^visibility: summary-only$/m.test(context?.sourceNote ?? "") &&
      /projection:\n  status: hold/m.test(context?.sourceNote ?? ""),
    "federated ecosystem source note must remain summary-only and held"
  );
  check(
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/)/.test(
      `${context?.indexSource ?? ""}\n${context?.sourceNote ?? ""}`
    ),
    "public-safe federation documents expose a protected machine path"
  );

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      systems: systems.length,
      handoffs: handoffs.length,
      observations: observations.length,
      protectedSources: protectedSources.length,
      projectionStatus: snapshot?.authority?.projection_status ?? "missing"
    }
  };
}

export function loadSnapshot(snapshotPath = defaultSnapshot) {
  return JSON.parse(readFileSync(snapshotPath, "utf8"));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const snapshotPath = process.argv[2]
    ? path.resolve(process.cwd(), process.argv[2])
    : defaultSnapshot;
  const result = evaluateFederatedEcosystem(loadSnapshot(snapshotPath));

  if (!result.passed) {
    console.error(`Federated ecosystem eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }

  console.log(
    `Federated ecosystem eval passed: ${result.metrics.systems} systems, ${result.metrics.handoffs} governed handoffs, ${result.metrics.observations} source-distinct observations, and ${result.metrics.protectedSources} protected summary sources; projection ${result.metrics.projectionStatus}.`
  );
}
