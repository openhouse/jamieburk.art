import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";

const PRIMARY_MESSAGE =
  "I turn emerging work into usable systems for complex public-facing teams.";

function read(repoRoot, relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function includesAll(content, fragments) {
  return fragments.filter((fragment) => !content.includes(fragment));
}

function result({ id, label, weight, hardGate = false, missing = [], evidence = [] }) {
  return {
    id,
    label,
    weight,
    hardGate,
    status: missing.length === 0 ? "pass" : "fail",
    evidence,
    failures: missing
  };
}

function extractResumeText(resumePath) {
  try {
    return execFileSync("pdftotext", [resumePath, "-"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return readFileSync(resumePath).toString("latin1");
  }
}

function extractResumePages(resumePath) {
  try {
    const info = execFileSync("pdfinfo", [resumePath], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    const match = info.match(/^Pages:\s+(\d+)/m);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}

export function summarizeLaunchEvals(results, minimumScore = 94) {
  const totalWeight = results.reduce((sum, item) => sum + item.weight, 0);
  const passedWeight = results
    .filter((item) => item.status === "pass")
    .reduce((sum, item) => sum + item.weight, 0);
  const score = totalWeight === 0 ? 0 : Math.round((passedWeight / totalWeight) * 100);
  const failedHardGates = results.filter(
    (item) => item.hardGate && item.status !== "pass"
  );

  return {
    score,
    minimumScore,
    hardGatesPass: failedHardGates.length === 0,
    automatedReady: score >= minimumScore && failedHardGates.length === 0,
    failedHardGateIds: failedHardGates.map((item) => item.id)
  };
}

export function runLaunchEvals(repoRoot) {
  const hero = read(repoRoot, "apps/www/src/components/Hero.tsx");
  const resumePage = read(repoRoot, "apps/www/src/app/resume/page.tsx");
  const ogImage = read(repoRoot, "apps/www/src/app/opengraph-image.tsx");
  const siteData = read(repoRoot, "apps/www/src/data/site.ts");
  const agentGuide = read(repoRoot, "AGENTS.md");
  const readme = read(repoRoot, "README.md");
  const records = read(repoRoot, "apps/www/src/data/knowledge-bank/records.ts");
  const callNycCase = read(repoRoot, "apps/www/src/content/work/callnyc.mdx");
  const proofs = read(repoRoot, "apps/www/src/data/proofs.ts");
  const technicalOperations = read(
    repoRoot,
    "apps/www/src/app/work/technical-operations/page.tsx"
  );
  const button = read(repoRoot, "apps/www/src/components/JBButton.tsx");
  const globalCss = read(repoRoot, "apps/www/src/app/globals.css");
  const deployment = read(repoRoot, "docs/deployment.md");
  const packageJson = JSON.parse(read(repoRoot, "package.json"));
  const resumePath = path.join(
    repoRoot,
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  );

  const results = [];

  const messagingSources = [hero, resumePage, ogImage, siteData, agentGuide, readme];
  const messagingMissing = messagingSources.flatMap((content, index) =>
    includesAll(content, [index < 3 ? PRIMARY_MESSAGE : "emerging work"])
  );
  results.push(
    result({
      id: "message-alignment",
      label: "Emerging-work positioning is consistent on primary surfaces",
      weight: 14,
      missing: messagingMissing,
      evidence: [
        "Hero, resume HTML, and social preview use the canonical sentence.",
        "Site metadata and contributor guidance preserve the emerging-work frame."
      ]
    })
  );

  const callNycMissing = [
    ...includesAll(records, [
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "SRC-CALLNYC-HELEN-ROSENTHAL-780797474277511170",
      "SRC-CALLNYC-YDANIS-RODRIGUEZ-733089563334299648",
      "SRC-CALLNYC-ROSIE-MENDEZ-733410096915550208",
      "SRC-CALLNYC-MATHIEU-EUGENE-783305320508514304",
      "SRC-CALLNYC-PETER-KOO-RETWEET-725422714807267328",
      "At least five sitting NYC Council members publicly amplified CallNYC in 2016",
      "not an official NYC Council endorsement"
    ]),
    ...includesAll(callNycCase, [
      "CLM-CALLNYC-COUNCIL-MEMBER-AMPLIFICATION",
      "council-member-amplification"
    ]),
    ...includesAll(proofs, ["callnyc-council-member-amplification"])
  ];
  results.push(
    result({
      id: "callnyc-external-validation",
      label: "CallNYC Council-member amplification is canonical and bounded",
      weight: 14,
      hardGate: true,
      missing: callNycMissing,
      evidence: [
        "Five action-specific public sources and Council officeholding context are recorded.",
        "The public claim says at least five and disallows official-endorsement framing."
      ]
    })
  );

  const responsiveMissing = [
    ...includesAll(technicalOperations, [
      'className="text-4xl font-bold text-jb-ink sm:text-5xl"'
    ]),
    ...includesAll(button, ["max-w-full", "whitespace-normal", "break-words"])
  ];
  if (/overflow-x\s*:\s*hidden|overflow-x-hidden/.test(globalCss)) {
    responsiveMissing.push("Do not mask layout failures with global overflow-x hiding.");
  }
  results.push(
    result({
      id: "responsive-contracts",
      label: "Known mobile overflow causes are repaired without concealment",
      weight: 14,
      hardGate: true,
      missing: responsiveMissing,
      evidence: [
        "Technical Operations scales its longest heading below the small breakpoint.",
        "Shared buttons wrap long labels within the available width."
      ]
    })
  );

  const resumeMissing = [];
  if (!existsSync(resumePath)) {
    resumeMissing.push("Approved resume PDF is missing.");
  } else {
    const resumeText = extractResumeText(resumePath);
    const phoneMatches = resumeText.match(
      /(?:\(\d{3}\)\s*|\b\d{3}[-.\s])\d{3}[-.\s]\d{4}\b/g
    );
    if (statSync(resumePath).size < 10_000) {
      resumeMissing.push("Resume PDF is unexpectedly small.");
    }
    if (!/Jamie\s+Burkart/i.test(resumeText)) {
      resumeMissing.push("Resume PDF is not text-readable as Jamie Burkart's resume.");
    }
    if (!/Technical Project Manager/i.test(resumeText)) {
      resumeMissing.push("Resume PDF does not contain the target role.");
    }
    if ((phoneMatches?.length ?? 0) !== 1) {
      resumeMissing.push("Resume PDF must contain exactly one phone number.");
    }
    const pages = extractResumePages(resumePath);
    if (pages !== null && pages !== 2) {
      resumeMissing.push(`Resume PDF must remain two pages; found ${pages}.`);
    }
  }
  results.push(
    result({
      id: "resume-application-artifact",
      label: "Approved application resume is present and machine-readable",
      weight: 14,
      hardGate: true,
      missing: resumeMissing,
      evidence: [
        "The approved PDF remains at its stable public path.",
        "Identity, role, phone-count, size, and page-count checks pass."
      ]
    })
  );

  const applicationMissing = [
    ...includesAll(siteData, [
      "jamie.burkart@gmail.com",
      "https://linkedin.com/in/jamie-burkart",
      "https://github.com/openhouse",
      "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
    ]),
    ...includesAll(resumePage, ["Download resume PDF", "Contact Jamie"])
  ];
  results.push(
    result({
      id: "application-path-integrity",
      label: "Application and contact paths use approved destinations",
      weight: 10,
      hardGate: true,
      missing: applicationMissing,
      evidence: ["Resume, email, LinkedIn, GitHub, and contact paths remain explicit."]
    })
  );

  const deploymentMissing = includesAll(deployment, [
    "## Production Cutover",
    "## Rollback",
    "dokku releases:report jamieburk-art",
    "dokku ps:rebuild jamieburk-art",
    "NEXT_PUBLIC_ROBOTS_POLICY=index",
    "curl -i https://jamieburk.art/api/health"
  ]);
  results.push(
    result({
      id: "production-cutover-readiness",
      label: "Production cutover and rollback are executable",
      weight: 10,
      hardGate: true,
      missing: deploymentMissing,
      evidence: [
        "The runbook records the release before deploy, verifies production invariants, and names rollback commands."
      ]
    })
  );

  const scripts = packageJson.scripts ?? {};
  const safetyMissing = [];
  for (const scriptName of [
    "check:citations",
    "test:citations",
    "knowledge-bank",
    "public-safety",
    "check:routes",
    "evals:launch",
    "test:evals",
    "prelaunch:production"
  ]) {
    if (!scripts[scriptName]) safetyMissing.push(`Missing npm script: ${scriptName}`);
  }
  results.push(
    result({
      id: "release-gate-wiring",
      label: "Release checks and evals are wired into repeatable commands",
      weight: 12,
      hardGate: true,
      missing: safetyMissing,
      evidence: [
        "Existing citation, public-safety, route, build, and environment gates remain authoritative.",
        "Launch evals add bounded static contracts and a production prelaunch command."
      ]
    })
  );

  const summary = summarizeLaunchEvals(results);
  const manualEvals = [
    {
      id: "hiring-manager-30-second-test",
      status: "manual-required",
      pass: "A reviewer can state Jamie's role, differentiated value, three proofs, and next action after reviewing the homepage, Technical Operations, and Resume."
    },
    {
      id: "resume-visual-balance",
      status: "manual-required",
      pass: "Rendered pages have no clipping or overlap and no role begins with an orphaned continuation bullet. Replacing the approved PDF requires Jamie's approval."
    },
    {
      id: "postdeploy-verification",
      status: "manual-required",
      pass: "Production health, robots, sitemap, canonicals, www redirect, key routes, and resume PDF pass after the explicitly approved deploy."
    },
    {
      id: "repository-hygiene",
      status: "manual-required",
      pass: "Every open PR targeting develop is active and owned; superseded branch-family PRs are closed or labeled."
    }
  ];

  return {
    suite: "jamieburk-art-launch-readiness",
    generatedAt: new Date().toISOString(),
    summary,
    results,
    manualEvals,
    antiGaming: [
      "Do not delete routes, claims, evidence, or content merely to reduce failures.",
      "Do not hide overflow globally instead of repairing the responsible element.",
      "Do not strengthen public claims before updating canonical evidence and boundaries.",
      "Do not publish private sources to satisfy a citation requirement.",
      "Production deployment always requires explicit human approval."
    ]
  };
}

export function writeLaunchEvalReports(repoRoot, report) {
  const reportDir = path.join(repoRoot, "reports/generated");
  mkdirSync(reportDir, { recursive: true });
  writeFileSync(
    path.join(reportDir, "launch-readiness.json"),
    `${JSON.stringify(report, null, 2)}\n`
  );

  const lines = [
    "# Launch Readiness Eval Report",
    "",
    `Generated: ${report.generatedAt}`,
    `Automated score: ${report.summary.score}/100`,
    `Automated hard gates: ${report.summary.hardGatesPass ? "PASS" : "FAIL"}`,
    `Automated readiness: ${report.summary.automatedReady ? "PASS" : "FAIL"}`,
    "",
    "## Automated Evals",
    ""
  ];

  for (const item of report.results) {
    lines.push(
      `- **${item.status.toUpperCase()}** ${item.label} (${item.weight})${
        item.hardGate ? " [hard gate]" : ""
      }`
    );
    for (const failure of item.failures) lines.push(`  - ${failure}`);
  }

  lines.push("", "## Manual Evals", "");
  for (const item of report.manualEvals) {
    lines.push(`- **MANUAL REQUIRED** ${item.id}: ${item.pass}`);
  }

  writeFileSync(path.join(reportDir, "launch-readiness.md"), `${lines.join("\n")}\n`);
}

