import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(source, needles) {
  const normalized = source.replace(/\s+/g, " ");
  return needles.every((needle) =>
    normalized.includes(needle.replace(/\s+/g, " "))
  );
}

function recordMaps() {
  return {
    sourceById: new Map(knowledgeBank.sources.map((item) => [item.id, item])),
    observationById: new Map(
      knowledgeBank.observations.map((item) => [item.id, item])
    ),
    claimById: new Map(knowledgeBank.claims.map((item) => [item.id, item])),
    intakeById: new Map(knowledgeBank.intakeItems.map((item) => [item.id, item])),
    inquiryById: new Map(
      knowledgeBank.researchInquiries.map((item) => [item.id, item])
    )
  };
}

function morseChecks() {
  const { sourceById, claimById, intakeById, inquiryById } = recordMaps();
  const about = read("apps/www/src/app/about/page.tsx");
  const note = read(
    "docs/knowledge-bank/research/ucsc-morse-sack-evaluations.md"
  );
  const narrative = sourceById.get(
    "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006"
  );
  const recommendation = sourceById.get(
    "SRC-MARGARET-MORSE-RECOMMENDATION-2014"
  );
  const claim = claimById.get("CLM-UCSC-EMBODIED-MEDIA-PRACTICE");
  const intake = intakeById.get(
    "INTAKE-2026-07-15-UCSC-MORSE-SACK-EVALUATIONS"
  );
  const inquiry = inquiryById.get("INQ-TIME-IS-LONG-INSTALLATION-2026");

  return [
    {
      dimension: "Source integrity and privacy",
      label: "Academic, public, and recommendation sources preserve their distinct postures",
      points: 20,
      passes:
        narrative?.visibility === "protected" &&
        narrative.preservationStatus === "private" &&
        recommendation?.visibility === "protected" &&
        recommendation.media?.publicDisplayStatus === "hold" &&
        intake?.publicationStatus === "knowledge-bank-only" &&
        includesAll(note, [
          "unofficial copy",
          "screenshot is not cleared",
          "private correspondence",
          "student identifiers"
        ])
    },
    {
      dimension: "Embodied intelligence",
      label: "The knowledge bank preserves media archaeology, embodiment, attention, and Time is Long",
      points: 20,
      passes:
        claim?.status === "confirmed-with-boundary" &&
        includesAll(claim.internalClaim, [
          "media archaeology",
          "embodied theory",
          "performance",
          "close attention",
          "hospitality",
          "participatory environments"
        ]) &&
        inquiry?.resultStatus === "partially-recovered" &&
        inquiry.limitations.some((item) => item.includes("BAPLab"))
    },
    {
      dimension: "Experiment as practice",
      label: "The public self-description values how people inhabit systems beyond administrative utility",
      points: 20,
      passes: includesAll(about, [
        "participation",
        "attention",
        "atmosphere",
        "place",
        "memory",
        "people inhabit",
        "administration alone"
      ])
    },
    {
      dimension: "Connected threshold",
      label: "The site keeps artistic, civic, technical, and social practice visibly connected",
      points: 20,
      passes: includesAll(about, [
        "A throughline",
        "artistic, civic, technical, and social",
        "same throughline",
        "enter, reshape, and carry forward"
      ])
    },
    {
      dimension: "Bounded praise",
      label: "Praise does not erase collective credit, source limits, or image rights",
      points: 20,
      passes:
        claim?.evidence.length === 3 &&
        includesAll(
          [...claim.boundaries, ...claim.antiClaims].join(" "),
          [
            "unofficial copy",
            "collective credit",
            "held pending rights",
            "every later professional outcome",
            "cleared for republication"
          ]
        )
    }
  ];
}

function sackChecks() {
  const { sourceById, observationById, claimById, intakeById } = recordMaps();
  const about = read("apps/www/src/app/about/page.tsx");
  const note = read(
    "docs/knowledge-bank/research/ucsc-morse-sack-evaluations.md"
  );
  const narrative = sourceById.get(
    "SRC-UCSC-NARRATIVE-EVALS-MORSE-SACK-2004-2006"
  );
  const recursive = observationById.get(
    "OBS-SACK-STRUCTURAL-EQUIVALENCE-PROTOTYPE-2006"
  );
  const installation = observationById.get(
    "OBS-SACK-COLLECTIVE-PHYSICAL-BROWSING-DESIGN-2006"
  );
  const claim = claimById.get("CLM-UCSC-SOCIAL-INFORMATION-PROTOTYPING");
  const intake = intakeById.get(
    "INTAKE-2026-07-15-UCSC-MORSE-SACK-EVALUATIONS"
  );

  return [
    {
      dimension: "Source integrity",
      label: "The Sack record is protected, attributed, and bounded as an unofficial copy",
      points: 20,
      passes:
        narrative?.visibility === "protected" &&
        narrative.author === "Margaret Morse and Warren Sack" &&
        narrative.publicCitation.includes("unofficial copy") &&
        intake?.publicationStatus === "knowledge-bank-only" &&
        includesAll(note, ["protected evaluations", "unofficial copy"])
    },
    {
      dimension: "Recursive relational thinking",
      label: "The record preserves recursively analyzed relationships without claiming historical priority",
      points: 20,
      passes:
        recursive?.status === "verified" &&
        includesAll(recursive.text, [
          "structural equivalence",
          "recursively",
          "participant relationships",
          "image analysis",
          "Max/MSP Jitter"
        ]) &&
        claim?.boundaries.some((item) => item.includes("historical invention"))
    },
    {
      dimension: "Prototype range",
      label: "Research, software, interface, sensors, projection, and physical space remain connected",
      points: 20,
      passes:
        installation?.status === "verified" &&
        includesAll(installation.text, [
          "movement-sensing",
          "wall-projected",
          "physical walk",
          "Maya models",
          "HTML mock-up"
        ]) &&
        includesAll(claim?.internalClaim ?? "", [
          "source-backed analysis",
          "software prototypes",
          "image analysis",
          "interface design",
          "physical information environments"
        ])
    },
    {
      dimension: "Collective and causal discipline",
      label: "Course prototypes remain course prototypes and group work remains collective",
      points: 20,
      passes: includesAll(
        [...(claim?.boundaries ?? []), ...(claim?.antiClaims ?? [])].join(" "),
        [
          "course prototypes",
          "not production deployments",
          "Credit classmates collectively",
          "invented structural equivalence",
          "solely designed"
        ]
      )
    },
    {
      dimension: "Present continuity",
      label: "The public site describes systems as relational environments people can reshape",
      points: 20,
      passes: includesAll(about, [
        "people see themselves in relation",
        "structure changes when people inhabit it",
        "software, installations, gatherings, and public projects",
        "understand, enter, reshape, and carry forward"
      ])
    }
  ];
}

const factories = {
  "margaret-morse": morseChecks,
  "warren-sack": sackChecks
};

const labels = {
  "margaret-morse": "Margaret Morse lens",
  "warren-sack": "Warren Sack lens"
};

export function runInstructorLens(id) {
  const checks = factories[id]?.();
  if (!checks) throw new Error(`Unknown instructor lens: ${id}`);

  const possible = checks.reduce((sum, item) => sum + item.points, 0);
  const earned = checks.reduce(
    (sum, item) => sum + (item.passes ? item.points : 0),
    0
  );
  const score = Math.round((earned / possible) * 100);
  const failures = checks.filter((item) => !item.passes);

  console.log(`${labels[id]} eval: ${score}/100 (criterion: 100)`);
  for (const check of checks) {
    console.log(
      `- ${check.dimension}: ${check.passes ? "PASS" : "FAIL"} - ${check.label}`
    );
  }

  if (failures.length || score !== 100) {
    console.error("Criterion not met. Revise the knowledge bank or public projection and rerun.");
    process.exitCode = 1;
    return false;
  }

  console.log("Criterion met.");
  return true;
}
