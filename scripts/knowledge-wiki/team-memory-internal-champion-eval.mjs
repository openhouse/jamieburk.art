import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath =
  "evals/knowledge-wiki/team-memory-internal-champion-hiring.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadInternalChampionCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  return {
    config,
    sponsorPerspective: readFileSync(
      path.join(root, config.sponsorPerspectivePath),
      "utf8"
    ),
    sponsorVoice: readFileSync(path.join(root, config.sponsorVoicePath), "utf8"),
    browserPacket: readJson(root, config.browserPacketPath),
    run: readJson(root, config.currentRunPath)
  };
}

function normalized(value) {
  return value.replace(/\s+/g, " ").trim();
}

function routeByLabel(packet, label) {
  return packet.routes.find((route) => route.routeLabel === label);
}

function publicTextForModel(value) {
  return value.replace(/private transcripts?/gi, "protected source material");
}

export function promptInputFor(candidate) {
  const { config, sponsorPerspective, sponsorVoice, browserPacket } = candidate;
  return {
    scenario: config.scenario,
    acceptanceQuestion: config.acceptanceQuestion,
    sponsorPerspective,
    sponsorVoice,
    renderedPublicSite: {
      source: browserPacket.source,
      startPath: browserPacket.startPath,
      navigationSequence: browserPacket.navigationSequence,
      routes: browserPacket.routes.map((route) => ({
        routeLabel: route.routeLabel,
        title: route.title,
        h1: route.h1,
        visibleText: publicTextForModel(route.visibleText),
        sameOriginLinks: route.sameOriginLinks
      })),
      resumeArtifact: browserPacket.resumeArtifact
    }
  };
}

export function evaluateInternalChampion(
  candidate,
  { deterministicOnly = false } = {}
) {
  const { config, sponsorPerspective, sponsorVoice, browserPacket, run } = candidate;
  const failures = [];
  const checks = [];
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };
  const perspective = normalized(sponsorPerspective);
  const voice = normalized(sponsorVoice);
  const promptInput = JSON.stringify(promptInputFor(candidate));
  const teamRoute = routeByLabel(browserPacket, "team-memory-start");

  check(
    "deterministic-stages-precede-model",
    config.deterministicStages.at(-1) === "model-hiring-conversation" &&
      config.modelGate.maximumCallsPerCandidate === 1,
    "Every deterministic gate must precede the single model call permitted for a candidate."
  );

  check(
    "human-authorized-transmission-scope",
    config.transmissionPolicy?.status === "human-authorized" &&
      config.transmissionPolicy?.appliesToEquivalentIsolatedHiringEvaluations === true &&
      [
        "anonymized sponsor-perspective artifact",
        "anonymized sponsor-voice artifact",
        "public rendered-site packet",
        "public resume"
      ].every((artifact) =>
        config.transmissionPolicy.allowedArtifacts?.includes(artifact)
      ) &&
      [
        "raw transcripts",
        "real identities",
        "private archives",
        "unrelated records",
        "credentials or private locators"
      ].every((artifact) =>
        config.transmissionPolicy.prohibitedArtifacts?.includes(artifact)
      ),
    "The model call must remain within the human-authorized public-safe packet pattern and its explicit exclusions."
  );

  check(
    "anonymized-source-artifacts",
    /anonymized/i.test(perspective) &&
      /anonymized/i.test(voice) &&
      /(?:actual source participant did not review|actual person has not reviewed or approved)/i.test(
        voice
      ) &&
      !/Jonathan Marmor/i.test(`${sponsorPerspective}\n${sponsorVoice}`),
    "The evaluator must use anonymized sponsor artifacts that preserve the no-review boundary and omit the source participant's identity."
  );

  check(
    "voice-is-not-impersonation",
    /(?:not an impersonation guide|not permission to impersonate)/i.test(voice) &&
      /(?:do not invent quotations|invented language as quotation)/i.test(voice),
    "The sponsor voice artifact must prohibit impersonation and invented quotation."
  );

  check(
    "rendered-browser-origin",
    browserPacket.source === "rendered-local-browser" &&
      browserPacket.publicOnly === true &&
      browserPacket.startPath === config.pagePath &&
      browserPacket.navigationSequence?.[0] === "team-memory-start",
    "The site packet must come from a rendered local browser session that begins at the Team Memory page."
  );

  check(
    "required-browser-navigation",
    config.requiredNavigation.every(
      (label, index) =>
        browserPacket.navigationSequence?.[index] === label &&
        Boolean(routeByLabel(browserPacket, label)?.visibleText)
    ),
    "The browser session must follow the required public route sequence and capture visible text from every route."
  );

  check(
    "browser-has-no-errors",
    !browserPacket.browserErrors?.some((entry) => entry.level === "error"),
    "The rendered public journey contains a browser error."
  );

  const teamText = normalized(teamRoute?.visibleText ?? "");
  for (const signal of config.requiredTeamMemorySignals) {
    check(
      `authorizable-${signal.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      teamText.toLowerCase().includes(signal.toLowerCase()),
      `The rendered Team Memory page is missing an authorizable-engagement signal: ${signal}.`
    );
  }

  check(
    "public-resume-was-reviewed",
    browserPacket.resumeArtifact?.source === "served-public-pdf" &&
      /14\+ years/i.test(browserPacket.resumeArtifact.text ?? "") &&
      /product and technical project manager/i.test(
        browserPacket.resumeArtifact.text ?? ""
      ) &&
      /^[0-9a-f]{64}$/.test(browserPacket.resumeArtifact.sha256 ?? ""),
    "The browser packet must include the exact public resume PDF served by the local site."
  );

  check(
    "model-input-excludes-code-and-private-locators",
    !/(\.tsx|\.ts|\.mjs|package\.json|repoRoot|sourcePath|\/Users\/|\/Volumes\/|private transcript|company identity|Jonathan Marmor)/i.test(
      promptInput
    ),
    "The model input exposes code, repository paths, a private locator, or the protected source identity."
  );

  check(
    "commercial-state-remains-open",
    /(?:No paid discovery began|not an offer)/i.test(perspective) &&
      /(?:no contract, statement of work, or client authorization|unresolved commercial authority)/i.test(
        perspective
      ) &&
      /does not end with a contract/i.test(perspective) &&
      !/(the company hired Jamie|budget was approved|the client adopted)/i.test(
        promptInput
      ),
    "The evaluator must preserve the unresolved commercial state and avoid implying an actual hire or authorization."
  );

  if (!deterministicOnly) {
    const result = run?.result;
    check(
      "current-model-receipt",
      run?.status === "complete" &&
        run.promptVersion === config.modelGate.promptVersion &&
        run.sponsorPerspectiveSha256 === sha256(sponsorPerspective) &&
        run.sponsorVoiceSha256 === sha256(sponsorVoice) &&
        run.browserPacketSha256 === sha256(JSON.stringify(browserPacket)) &&
        run.calibrationStatus === config.modelGate.calibrationStatus &&
        run.actualPeopleParticipated === false &&
        run.actualCompanyDecision === false &&
        /^[0-9a-f]{64}$/.test(run.promptSha256 ?? ""),
      "The hiring-simulation receipt is missing, stale, or not tied to the exact anonymized artifacts and browser packet."
    );

    check(
      "fictionalized-hiring-decision",
      result?.evaluatorId === "reader.anonymized-team-memory-internal-champion" &&
        result?.verdict === config.modelGate.requiredVerdict &&
        result?.decision === config.modelGate.requiredDecision &&
        result?.actualPeopleParticipated === false &&
        result?.actualCompanyDecision === false,
      "The fictionalized sponsor and decision-maker simulation did not choose the focused paid engagement."
    );

    check(
      "conversation-and-relay-recorded",
      Array.isArray(result?.sponsorPitchTexts) &&
        result.sponsorPitchTexts.length >= 2 &&
        Array.isArray(result?.decisionMakerDiscussion) &&
        result.decisionMakerDiscussion.length >= 3 &&
        typeof result?.relayToJamie === "string" &&
        result.relayToJamie.length >= 80 &&
        Array.isArray(result?.recommendations) &&
        result.recommendations.length >= 2,
      "The eval response must include the sponsor's pitch, the decision-maker exchange, the relay to Jamie, and concrete recommendations."
    );

    check(
      "simulation-boundary",
      /fictionalized/i.test(result?.boundary ?? "") &&
        /did not participate/i.test(result?.boundary ?? "") &&
        /not .*actual company decision/i.test(result?.boundary ?? "") &&
        /not .*endorsement/i.test(result?.boundary ?? ""),
      "The response must state that the real people did not participate and that the result is not an actual company decision or endorsement."
    );
  }

  return {
    passed: failures.length === 0,
    stage: deterministicOnly ? "deterministic" : "full",
    failures,
    checks,
    boundary: config.modelGate.humanMeaning
  };
}

function main() {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateInternalChampion(loadInternalChampionCandidate(), {
    deterministicOnly
  });
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
