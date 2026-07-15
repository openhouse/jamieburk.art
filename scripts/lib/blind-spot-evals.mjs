import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

export const blindSpotIds = [
  "outcomes-adoption",
  "role-corroboration",
  "hiring-comprehension",
  "present-tense-offer",
  "visual-artifact-proof",
  "archival-survivorship",
  "release-governance"
];

const workSlugs = [
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist",
  "196-sunday-dinner",
  "kc-town-hall"
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return readFileSync(absolute(relativePath), "utf8");
}

function json(relativePath) {
  return JSON.parse(read(relativePath));
}

function includesAll(source, needles) {
  const normalizedSource = source.replace(/\s+/g, " ");
  return needles.every((needle) =>
    normalizedSource.includes(needle.replace(/\s+/g, " "))
  );
}

function hasAllSlugs(records) {
  return (
    records.length === workSlugs.length &&
    workSlugs.every((slug) => records.some((record) => record.slug === slug))
  );
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function commonChecks(id) {
  const registry = json("docs/qa/blind-spots/registry.json");
  const entry = registry.blindSpots.find((item) => item.id === id);

  return [
    {
      label: "The blind spot has a unique registry entry and independent eval",
      points: 10,
      passes:
        registry.blindSpots.length === 7 &&
        new Set(registry.blindSpots.map((item) => item.id)).size === 7 &&
        Boolean(entry) &&
        existsSync(absolute(`scripts/evals-${id}.mjs`))
    },
    {
      label: "Passing semantics reject false resolution",
      points: 10,
      passes:
        registry.passContract.includes("does not imply") &&
        ["strengthened", "partially-resolved", "governed-open"].includes(
          entry?.status
        ) &&
        entry?.passMeaning.length > 40 &&
        entry?.nextActions.length >= 2
    }
  ];
}

function outcomeChecks() {
  const register = json("docs/knowledge-bank/outcome-adoption-register.json");
  const work = read("apps/www/src/data/work.ts");
  const types = read("apps/www/src/types/work.ts");
  const blocks = read("apps/www/src/components/CaseStudyBlocks.tsx");

  return [
    {
      label: "All public case studies have outcome and adoption records",
      points: 20,
      passes: hasAllSlugs(register.projects)
    },
    {
      label: "Every record distinguishes outputs, adoption, status, and boundaries",
      points: 20,
      passes: register.projects.every(
        (item) =>
          ["verified-outcome", "partial-outcome", "verified-output", "open"].includes(
            item.status
          ) &&
          item.verifiedOutputs.length > 0 &&
          item.adoptionEvidence.length > 0 &&
          item.boundaries.length > 0
      )
    },
    {
      label: "The work schema and six records carry explicit outcome fields",
      points: 20,
      passes:
        includesAll(types, [
          "OutcomeStatus",
          "outcomeSummary: string",
          "outcomeBoundary: string",
          "adoptionEvidence: string[]"
        ]) &&
        count(work, /outcomeStatus: "(?:verified-outcome|partial-outcome|verified-output|open)"/g) === 6 &&
        count(work, /outcomeSummary:/g) === 7 &&
        count(work, /outcomeBoundary:/g) === 7 &&
        count(work, /adoptionEvidence:/g) === 7
    },
    {
      label: "Case studies visibly separate outcome evidence from causal boundaries",
      points: 20,
      passes: includesAll(blocks, [
        "Outcome and adoption",
        "Adoption evidence",
        "item.outcomeBoundary",
        "Verified output",
        "Partial outcome evidence"
      ])
    }
  ];
}

function roleChecks() {
  const register = json(
    "docs/knowledge-bank/collaborator-corroboration-register.json"
  );
  const serialized = JSON.stringify(register);

  return [
    {
      label: "High-value exact-role claims have a corroboration register",
      points: 20,
      passes:
        register.roleClaims.length >= 5 &&
        new Set(register.roleClaims.map((item) => item.claimId)).size ===
          register.roleClaims.length
    },
    {
      label: "No open role claim is promoted beyond its evidence",
      points: 20,
      passes: register.roleClaims.every(
        (item) =>
          ["open", "partial"].includes(item.status) &&
          item.independentSources.length > 0 &&
          item.boundaries.length > 0 &&
          item.nextAction.length > 20
      )
    },
    {
      label: "The outreach protocol begins with correction, consent, and boundaries",
      points: 20,
      passes:
        register.publicSafeProtocol.length >= 5 &&
        includesAll(register.publicSafeProtocol.join(" "), [
          "correction",
          "what must remain private",
          "Record disagreement",
          "Never publish private"
        ])
    },
    {
      label: "The public register contains no direct private contact data",
      points: 20,
      passes:
        !/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(serialized) &&
        !/\+?1?[\s.(\-]*\d{3}[\s.)\-]*\d{3}[\s.-]*\d{4}/.test(serialized)
    }
  ];
}

function hiringChecks() {
  const protocol = read("docs/qa/hiring-review/README.md");
  const sessions = json("docs/qa/hiring-review/sessions.json");
  const about = read("apps/www/src/app/about/page.tsx");

  return [
    {
      label: "A no-coaching five-minute protocol covers five hiring-reader roles",
      points: 20,
      passes: includesAll(protocol, [
        "no-coaching",
        "recruiter",
        "hiring manager",
        "technical or operations peer",
        "public-interest or civic-tech leader",
        "trusted referrer"
      ])
    },
    {
      label: "The protocol tests role, delivery, proof, confusion, and next action",
      points: 20,
      passes: includesAll(protocol, [
        "What roles",
        "three concrete things",
        "result or proof",
        "confusing",
        "What would you do next"
      ])
    },
    {
      label: "The external-session ledger truthfully remains open",
      points: 20,
      passes:
        sessions.status === "open" &&
        sessions.realSessionsCompleted === 0 &&
        sessions.criterionMet === false &&
        sessions.sessions.length === 0 &&
        sessions.boundary.includes("not counted")
    },
    {
      label: "The current site supplies a testable role and responsibility statement",
      points: 20,
      passes: includesAll(about, [
        "Technical Project Manager",
        "Product Operations",
        "Implementation role",
        "public-interest or mission-driven team",
        "technical and nontechnical people",
        "coordinated delivery",
        "durable handoffs"
      ])
    }
  ];
}

function offerChecks() {
  const about = read("apps/www/src/app/about/page.tsx");
  const offer = read(
    "docs/knowledge-bank/opportunities/present-tense-offer.md"
  );
  const layout = read("apps/www/src/components/CaseStudyLayout.tsx");
  const home = read("apps/www/src/components/Hero.tsx");

  return [
    {
      label: "The About page names three target role families",
      points: 20,
      passes: includesAll(about, [
        "What I am looking for now",
        "Technical Project Manager",
        "Product Operations",
        "Implementation role"
      ])
    },
    {
      label: "The offer names team context and concrete responsibilities",
      points: 20,
      passes: includesAll(about, [
        "public-interest or mission-driven team",
        "clear requirements",
        "coordinated delivery",
        "usable workflows",
        "decision records",
        "durable handoffs"
      ])
    },
    {
      label: "The offer remains coherent with the homepage role frame",
      points: 20,
      passes: includesAll(home, [
        "Technical Project Manager",
        "Product Operations & Implementation",
        "operating structure"
      ])
    },
    {
      label: "The offer preserves resume, contact, proof, and application adaptation paths",
      points: 20,
      passes:
        includesAll(layout, ["href=\"/resume\"", "href=\"/contact\""]) &&
        includesAll(offer, [
          "Application adaptation",
          "may not promote unsupported outcomes",
          "External hiring-comprehension sessions remain open"
        ])
    }
  ];
}

function visualChecks() {
  const register = json("docs/knowledge-bank/visual-proof-register.json");
  const plan = read("docs/knowledge-bank/visual-proof-plan.md");
  const blocks = read("apps/www/src/components/CaseStudyBlocks.tsx");

  return [
    {
      label: "Every case study has a visual-proof disposition",
      points: 20,
      passes: hasAllSlugs(register.projects)
    },
    {
      label: "The current zero-approved state is explicit and actionable",
      points: 20,
      passes: register.projects.every(
        (item) =>
          item.approvedVisualCount === 0 &&
          item.target >= 2 &&
          item.status === "open" &&
          item.candidateSources.length > 0 &&
          item.rightsConsent.length > 0 &&
          item.publicProjection === "none-approved" &&
          item.nextAction.length > 20
      )
    },
    {
      label: "The visual protocol requires provenance, rights, claims, captions, and approval",
      points: 20,
      passes: includesAll(plan, [
        "source location",
        "rights or consent posture",
        "claim it supports",
        "factual caption",
        "explicit approval decision"
      ])
    },
    {
      label: "The website does not present text cards as an approved image gallery",
      points: 20,
      passes: includesAll(blocks, [
        "Artifact descriptions",
        "public-safe descriptions",
        "Approved images",
        "permissions and context"
      ])
    }
  ];
}

function survivorshipChecks() {
  const register = json(
    "docs/knowledge-bank/archival-survivorship-register.json"
  );
  const surfaces = new Set(register.surfaces.map((item) => item.surface));

  return [
    {
      label: "The survivorship register covers eight distinct evidence surfaces",
      points: 20,
      passes:
        register.surfaces.length === 8 &&
        surfaces.size === 8 &&
        [
          "public-web",
          "social-platforms",
          "official-government-records",
          "private-digital-archives",
          "offline-and-physical-work",
          "collaborator-memory",
          "failed-abandoned-or-unfunded-work",
          "maintenance-care-and-handoffs"
        ].every((surface) => surfaces.has(surface))
    },
    {
      label: "Non-recovery is not treated as evidence of nonexistence",
      points: 20,
      passes: includesAll(register.rule, [
        "Not recovered is not evidence",
        "Public survival",
        "not measures of importance"
      ])
    },
    {
      label: "Every surface records a risk and a next action",
      points: 20,
      passes: register.surfaces.every(
        (item) => item.coverage && item.risk.length > 30 && item.nextAction.length > 25
      )
    },
    {
      label: "Underrepresented labor, collaborators, failures, and maintenance stay visible",
      points: 20,
      passes: includesAll(JSON.stringify(register), [
        "Construction, hosting, printing, facilitation, maintenance",
        "Invite corrections",
        "withdrawals, non-disbursement",
        "years of upkeep, repair, transition"
      ])
    }
  ];
}

function releaseChecks() {
  const status = json("docs/qa/release-status.json");
  const blockers = read("docs/knowledge-bank/launch-blockers.md");
  const production = read("docs/production-readiness.md");
  const hiring = json("docs/qa/hiring-review/sessions.json");

  return [
    {
      label: "Automated verification and human gates are separately modeled",
      points: 20,
      passes:
        status.automatedVerification.commands.length === 3 &&
        status.humanGates.length >= 4 &&
        status.humanGates.every((gate) => gate.state === "open")
    },
    {
      label: "Production remains blocked while human approval is open",
      points: 20,
      passes:
        status.productionDecision === "blocked-pending-human-approval" &&
        status.boundary.includes("cannot") &&
        status.humanGates.some((gate) =>
          gate.gate.includes("Jamie approval of the exact production candidate")
        )
    },
    {
      label: "Launch documentation separates automated and human gates",
      points: 20,
      passes: includesAll(blockers, [
        "## Automated regression gates",
        "## Human and external gates",
        "do not authorize production"
      ])
    },
    {
      label: "Eval overfitting is explicitly bounded by human and external review",
      points: 20,
      passes:
        includesAll(production, [
          "regression gates",
          "not substitutes",
          "exact production candidate"
        ]) &&
        hiring.realSessionsCompleted === 0 &&
        hiring.criterionMet === false
    }
  ];
}

const checkFactories = {
  "outcomes-adoption": outcomeChecks,
  "role-corroboration": roleChecks,
  "hiring-comprehension": hiringChecks,
  "present-tense-offer": offerChecks,
  "visual-artifact-proof": visualChecks,
  "archival-survivorship": survivorshipChecks,
  "release-governance": releaseChecks
};

export function runBlindSpotEval(id) {
  const factory = checkFactories[id];
  if (!factory) throw new Error(`Unknown blind-spot eval: ${id}`);

  const registry = json("docs/qa/blind-spots/registry.json");
  const entry = registry.blindSpots.find((item) => item.id === id);
  const checks = [...commonChecks(id), ...factory()];
  const possible = checks.reduce((sum, item) => sum + item.points, 0);
  const earned = checks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const score = Math.round((earned / possible) * 100);
  const failures = checks.filter((item) => !item.passes);

  console.log(
    `${entry.label} eval: ${score}/100 (criterion: 100; state: ${entry.status})`
  );
  for (const check of checks) {
    console.log(`- ${check.passes ? "PASS" : "FAIL"} ${check.label}`);
  }
  console.log(`Pass meaning: ${entry.passMeaning}`);

  if (failures.length || score !== 100) {
    process.exitCode = 1;
    return false;
  }

  console.log("Criterion met.");
  return true;
}
