export const governanceNarrationPatterns = [
  /current public resume pdf/i,
  /phone remains inside the approved resume artifact/i,
  /approval required/i,
  /before launch/i
];

export function findGovernanceNarration(publicSources) {
  const findings = [];

  for (const [file, content] of publicSources) {
    for (const pattern of governanceNarrationPatterns) {
      const match = pattern.exec(content);
      if (!match) continue;

      findings.push({
        file,
        phrase: match[0],
        line: content.slice(0, match.index).split("\n").length
      });
    }
  }

  return findings;
}

export function validateSuite(suite) {
  const failures = [];
  const rubricIds = suite.rubrics.map((rubric) => rubric.id);
  const hardGateIds = suite.hardGates.map((gate) => gate.id);
  const rubricIdSet = new Set(rubricIds);
  const hardGateIdSet = new Set(hardGateIds);
  const weight = suite.rubrics.reduce((total, rubric) => total + rubric.weight, 0);

  if (suite.version !== 1) failures.push("suite version must be 1");
  if (rubricIdSet.size !== rubricIds.length) failures.push("rubric IDs must be unique");
  if (hardGateIdSet.size !== hardGateIds.length) failures.push("hard-gate IDs must be unique");
  if (weight !== 100) failures.push(`rubric weights must total 100; received ${weight}`);

  for (const [profileId, profile] of Object.entries(suite.profiles)) {
    for (const rubricId of profile.requiredRubrics) {
      if (!rubricIdSet.has(rubricId)) {
        failures.push(`${profileId} references unknown rubric ${rubricId}`);
      }
    }

    for (const gateId of profile.requiredHardGates) {
      if (!hardGateIdSet.has(gateId)) {
        failures.push(`${profileId} references unknown hard gate ${gateId}`);
      }
    }
  }

  return failures;
}

export function weightedScore(rubrics, scores) {
  const weighted = rubrics.reduce(
    (total, rubric) => total + rubric.weight * ((scores[rubric.id] ?? 0) / 4),
    0
  );

  return Math.round(weighted * 10) / 10;
}

export function profileStatus({ suite, profileId, hardGates, scores }) {
  const profile = suite.profiles[profileId];
  if (!profile) throw new Error(`Unknown evaluation profile: ${profileId}`);

  const weighted = weightedScore(suite.rubrics, scores);
  const failedHardGates = profile.requiredHardGates.filter(
    (gateId) => hardGates[gateId]?.status !== "pass"
  );
  const failedRubrics = profile.requiredRubrics.filter(
    (rubricId) => (scores[rubricId] ?? 0) < profile.minimumRequiredRubricScore
  );

  return {
    passed:
      failedHardGates.length === 0 &&
      failedRubrics.length === 0 &&
      weighted >= profile.minimumWeightedScore,
    weightedScore: weighted,
    threshold: profile.minimumWeightedScore,
    failedHardGates,
    failedRubrics
  };
}

export function baselineComparison({ baseline, commit, fingerprint, profileId, scores }) {
  const baselineProfiles = baseline?.profiles ?? (baseline?.profile ? [baseline.profile] : []);

  return Boolean(
    baseline &&
      baseline.commit === commit &&
      baseline.fingerprint === fingerprint &&
      baselineProfiles.includes(profileId) &&
      Object.entries(baseline.scores).every(
        ([rubricId, score]) => (scores[rubricId] ?? 0) >= score
      )
  );
}

export function browserEvidenceMatches({ evidence, candidate, requiredRoutes }) {
  return Boolean(
    evidence?.candidate === candidate &&
      requiredRoutes.every((route) =>
        evidence.routes?.some(
          (item) =>
            item.route === route &&
            item.desktop?.status === 200 &&
            item.mobile?.status === 200 &&
            item.desktop?.overflow === false &&
            item.mobile?.overflow === false
        )
      ) &&
      evidence.citations?.localLinks === true &&
      evidence.citations?.backlinks === true &&
      evidence.citations?.accessibleLabels === true &&
      evidence.focusVisible === true &&
      evidence.zoom200?.passed === true &&
      evidence.keyboard?.passed === true &&
      evidence.resumeDownload === true &&
      evidence.metadata === true
  );
}

export function validModelJudgments({
  judgments,
  candidate,
  contract,
  profileId,
  requiredRubrics,
  minimumScore
}) {
  return judgments.filter(
    (judgment) =>
      judgment.candidate === candidate &&
      judgment.contract === contract &&
      judgment.profile === profileId &&
      typeof judgment.lens === "string" &&
      judgment.lens.length > 0 &&
      judgment.passes === true &&
      Array.isArray(judgment.evidence) &&
      judgment.evidence.length > 0 &&
      Array.isArray(judgment.regressions) &&
      judgment.regressions.length === 0 &&
      requiredRubrics.every((rubricId) => (judgment.scores?.[rubricId] ?? 0) >= minimumScore)
  );
}
