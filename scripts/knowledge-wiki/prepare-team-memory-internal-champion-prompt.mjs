import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  evaluateInternalChampion,
  loadInternalChampionCandidate,
  promptInputFor,
  sha256
} from "./team-memory-internal-champion-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function buildInternalChampionPrompt(candidate) {
  const { config } = candidate;
  const input = promptInputFor(candidate);
  return `You are running one uncalibrated advisory hiring simulation. It is an explicitly fictionalized analytical exercise, not an impersonation and not a report of any real person's private views.

Use only the material below. You have not seen and must not infer from a repository, source code, private transcript, company identity, or unprovided facts. The public-site packet was captured from a locally running site. Navigation began at the Team Memory page and continued only through visible public links and pages. The resume text came from the exact public PDF served by that local site.

Scenario:
${config.scenario}

Acceptance question:
${config.acceptanceQuestion}

Stage the response as a short, realistic hiring conversation:
1. A fictionalized prospective sponsor writes two or more text messages to company decision-makers recommending Jamie. Preserve the supplied voice's cadence, user-and-action focus, candor, commercial boundaries, and insistence on a usable next step, but do not quote, name, or impersonate the actual source participant.
2. Fictionalized executive and product/engineering decision-makers inspect the rendered public site and resume, discuss whether Jamie addresses their stated needs, and raise credible concerns.
3. They decide either to hire Jamie now for the focused paid engagement or to pass for now. A pass verdict requires decision=hire-for-focused-paid-engagement. A fail verdict requires decision=pass-for-now.
4. The fictionalized sponsor relays the decision to Jamie and gives specific recommendations that make Jamie's value easier for rushed decision-makers to appreciate.

Apply a demanding standard. Do not pass merely because the method is thoughtful. Pass only if the site and resume make the team problem, Jamie's role, the first engagement, participant burden, source limits, deliverables, exclusions, success test, and end decision clear enough to authorize a focused paid engagement. Normal human agreement on scope, confidentiality, compensation, budget, and contract terms may still follow.

Return only JSON matching the supplied schema. Set evaluatorId to reader.anonymized-team-memory-internal-champion. Set actualPeopleParticipated=false and actualCompanyDecision=false. The boundary must say this is fictionalized, that the real people did not participate, and that it is not an actual company decision, endorsement, budget authorization, offer, contract, or promise of work.

--- ANONYMIZED SPONSOR PERSPECTIVE ---
${input.sponsorPerspective}

--- ANONYMIZED SPONSOR VOICE PROFILE ---
${input.sponsorVoice}

--- RENDERED PUBLIC SITE AND SERVED RESUME ---
${JSON.stringify(input.renderedPublicSite, null, 2)}
`;
}

function main() {
  const promptOutput = arg("--prompt-output");
  const metadataOutput = arg("--metadata-output");
  if (!promptOutput || !metadataOutput) {
    throw new Error(
      "Usage: node prepare-team-memory-internal-champion-prompt.mjs --prompt-output <private prompt> --metadata-output <private metadata>"
    );
  }

  const candidate = loadInternalChampionCandidate();
  const deterministic = evaluateInternalChampion(candidate, {
    deterministicOnly: true
  });
  if (!deterministic.passed) {
    throw new Error(
      `Deterministic preflight failed:\n${deterministic.failures.join("\n")}`
    );
  }

  const prompt = buildInternalChampionPrompt(candidate);
  const promptInput = JSON.stringify(promptInputFor(candidate));
  if (
    /(\.tsx|\.ts|\.mjs|package\.json|repoRoot|sourcePath|\/Users\/|\/Volumes\/|Jonathan Marmor)/i.test(
      prompt
    )
  ) {
    throw new Error("The isolated model prompt contains code or a protected locator.");
  }

  writeFileSync(promptOutput, prompt, { mode: 0o600 });
  writeFileSync(
    metadataOutput,
    `${JSON.stringify(
      {
        promptVersion: candidate.config.modelGate.promptVersion,
        promptSha256: sha256(prompt),
        promptInputSha256: sha256(promptInput),
        sponsorPerspectiveSha256: sha256(candidate.sponsorPerspective),
        sponsorVoiceSha256: sha256(candidate.sponsorVoice),
        browserPacketSha256: sha256(JSON.stringify(candidate.browserPacket)),
        calibrationStatus: candidate.config.modelGate.calibrationStatus,
        actualPeopleParticipated: false,
        actualCompanyDecision: false
      },
      null,
      2
    )}\n`,
    { mode: 0o600 }
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
