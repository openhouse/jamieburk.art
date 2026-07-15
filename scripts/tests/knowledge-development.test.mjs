import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateKnowledgeBank,
  validateHybridReportCandidate,
  validateKnowledgeDevelopmentSuite
} from "../check-knowledge-development.mjs";
import {
  validateCommittedCorpus
} from "../derive-callnyc-x-corpus.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-bank-development.json", "utf8")
);
const hybridReport = JSON.parse(
  readFileSync(
    ".agents/evals/runs/knowledge-bank-development-hybrid-2026-07-13.json",
    "utf8"
  )
);
const hybridPass = hybridReport.results;

function normalizeCanonicalUrl(value) {
  const url = new URL(value);
  url.protocol = "https:";
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString();
}

test("knowledge-development suite is structurally valid", () => {
  assert.deepEqual(validateKnowledgeDevelopmentSuite(suite).errors, []);
});

test("hybrid scorecard matches the current knowledge-bank inputs", () => {
  assert.deepEqual(validateHybridReportCandidate(hybridReport), []);
});

test("current knowledge bank satisfies the frozen suite", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2, hybridPass);
  assert.equal(result.status, "threshold_met");
  assert.equal(result.weighted_score, 1);
  assert.ok(result.results.every((entry) => entry.pass));
});

test("campaign press corpus preserves all memberships without duplicating articles", () => {
  const pressIntake = knowledgeBank.intake.filter((item) =>
    item.id.includes("PRESS-CORPUS") && item.projects.includes("nyc-artist-coalition")
  );
  const indexIds = new Set([
    "SRC-NAC-LET-NYC-DANCE-PRESS-INDEX",
    "SRC-NAC-TALKS-NOT-RAIDS-PRESS-INDEX",
    "SRC-NAC-SAVE-NYC-SPACES-PRESS-INDEX",
    "SRC-NAC-FAIR-RENT-NYC-PRESS-INDEX-2021"
  ]);
  const articleMemberships = pressIntake.flatMap((item) =>
    item.sourceIds.filter((sourceId) => !indexIds.has(sourceId))
  );

  assert.equal(pressIntake.length, 4);
  assert.equal(articleMemberships.length, 45);
  const uniqueArticleIds = new Set(articleMemberships);
  assert.equal(uniqueArticleIds.size, 44);

  const sourceById = new Map(
    knowledgeBank.sources.map((source) => [source.id, source])
  );
  const normalizedCanonicalUrls = new Set(
    [...uniqueArticleIds].map((sourceId) =>
      normalizeCanonicalUrl(sourceById.get(sourceId).canonicalUrl)
    )
  );
  assert.equal(normalizedCanonicalUrls.size, 44);

  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NAC-CAMPAIGN-PRESS-CLOSE-READ"
  );
  assert.deepEqual(new Set(task.sourceIds), new Set(articleMemberships));

  const assertionSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((assertion) => assertion.sourceId)
  );
  for (const sourceId of articleMemberships) {
    assert.equal(assertionSourceIds.has(sourceId), true, `${sourceId} lacks decomposition`);
  }

  const accessRestrictedSources = [...uniqueArticleIds]
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source.publicNote?.includes("HTTP 403"));
  assert.equal(accessRestrictedSources.length, 5);
  assert.ok(accessRestrictedSources.every((source) => source.archiveUrl));
});

test("KC Town Hall preserves the CCED recommendation-to-Council-action chain", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-COUNCIL-APPROVAL-190649"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-KCTH-COUNCIL-ACTION-190649-2026"
  );
  const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");
  const handoffClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-MISSION-ALIGNED-HANDOFF"
  );
  const handoffSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KCTH-JAMIE-HANDOFF-ATTESTATION-2026"
  );

  assert.equal(claim.maturity, "confirmed-with-boundary");
  assert.equal(claim.projectionEligibility, "eligible");
  assert.match(claim.internalClaim, /CCED Board voted on July 16, 2019/);
  assert.match(claim.internalClaim, /Council adopted Resolution 190649/);
  assert.ok(claim.antiClaims.some((item) => /received \$490,539/i.test(item)));
  assert.ok(claim.antiClaims.some((item) => /alone secured/i.test(item)));
  assert.equal(inquiry.resultStatus, "recovered");
  assert.ok(inquiry.limitations.some((item) => /does not itself establish an executed funding agreement/i.test(item)));
  assert.deepEqual(page.sourceOrder, [
    "SRC-KCTH-KCMO-AUTHENTICATED-190649",
    "SRC-KCTH-KCMO-LEGISTAR-190649"
  ]);
  assert.equal(page.occurrences[0].claimId, claim.id);
  assert.equal(handoffClaim.maturity, "confirmed-with-boundary");
  assert.equal(handoffClaim.projectionEligibility, "eligible");
  assert.equal(handoffClaim.projections[0].citationRequired, false);
  assert.match(handoffClaim.projections[0].text, /mission-aligned organization/);
  assert.equal(handoffSource.visibility, "protected");
  assert.ok(handoffClaim.boundaries.some((item) => /private transition context/i.test(item)));

  const mdx = readFileSync("apps/www/src/content/work/kc-town-hall.mdx", "utf8");
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const kcTownHallWork = work.slice(work.indexOf('title: "KC Town Hall LLC"'));
  const publicRegistry = JSON.parse(
    readFileSync("apps/www/src/data/knowledge-bank/public-registry.json", "utf8")
  );
  const publicHandoffClaim = publicRegistry.claims.find(
    (item) => item.id === handoffClaim.id
  );
  assert.match(mdx, /occurrenceId="cced-council-approval"/);
  assert.match(mdx, /does not by itself establish that a funding agreement was executed/);
  assert.match(mdx, /claimId="CLM-KCTH-MISSION-ALIGNED-HANDOFF"/);
  assert.match(work, /years: "Beginning in 2017"/);
  assert.doesNotMatch(kcTownHallWork, /\blater\b/);
  assert.doesNotMatch(work, /Council later accepted/);
  assert.equal(
    publicRegistry.sources.some((item) => item.id === handoffSource.id),
    false
  );
  assert.deepEqual(publicHandoffClaim.evidence, []);
});

test("NTER CHNG preserves co-creator credit and the official exhibition connection", () => {
  const claimIds = [
    "CLM-NTER-CHNG-CO-CREATION",
    "CLM-NTER-CHNG-PARTICIPATORY-SYSTEM",
    "CLM-NTER-CHNG-AMERICA-NOW-HERE"
  ];
  const claims = claimIds.map((id) =>
    knowledgeBank.claims.find((claim) => claim.id === id)
  );
  const projectSource = knowledgeBank.sources.find(
    (source) => source.id === "SRC-NTER-CHNG-PROJECT-SITE-2011"
  );
  const exhibitionSource = knowledgeBank.sources.find(
    (source) => source.id === "SRC-NTER-CHNG-ANH-KC-2011"
  );
  const inquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-NTER-CHNG-WAYBACK-2026"
  );
  const task = knowledgeBank.researchTasks.find(
    (item) => item.id === "TASK-NTER-CHNG-ROLE-AND-TECHNICAL-DETAIL"
  );

  assert.ok(claims.every(Boolean));
  assert.ok(claims.every((claim) => claim.collectiveWork));
  assert.ok(claims.every((claim) => claim.maturity === "confirmed-with-boundary"));
  assert.ok(claims.every((claim) => claim.boundaries.length > 0));
  assert.ok(claims.every((claim) => claim.antiClaims.length > 0));
  assert.match(projectSource.publicNote, /credits the three collaborators/i);
  assert.match(exhibitionSource.publicNote, /lists the collaborators as visual artists/i);
  assert.match(exhibitionSource.archiveUrl, /americanowandhere\.org\/the-visual-artists/);
  assert.equal(inquiry.resultStatus, "partially-recovered");
  assert.ok(inquiry.findings.some((item) => /press-release PDF was not recovered/i.test(item)));
  assert.ok(inquiry.limitations.some((item) => /not evidence that no copy survives/i.test(item)));
  assert.equal(task.status, "queued");
  assert.ok(task.successCriteria.some((item) => /Assign no role without/i.test(item)));
});

test("CallNYC corpus accounts for every recoverable timeline item and preserves the profile-count gap", () => {
  const corpus = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/corpora/callnyc-x-full-population-2026-07-14.json",
      "utf8"
    )
  );
  const rawCaptureText = readFileSync(
    "docs/knowledge-bank/corpora/source-captures/callnyc-x-browser-extraction-2026-07-15-utc.json",
    "utf8"
  );
  const derivedMetrics = validateCommittedCorpus(rawCaptureText, corpus);
  const authored = corpus.items.filter((item) => item.type === "authored");
  const reposted = corpus.items.filter((item) => item.type === "reposted");
  const canonicalUrls = new Set(corpus.items.map((item) => item.canonicalUrl));

  assert.equal(corpus.population.profileReported, 110);
  assert.equal(corpus.population.renderedDistinct, 107);
  assert.equal(corpus.population.unresolvedCountDifference, 3);
  assert.equal(corpus.items.length, 107);
  assert.equal(canonicalUrls.size, 107);
  assert.equal(authored.length, 92);
  assert.equal(reposted.length, 15);
  assert.deepEqual(
    corpus.items.map((item) => item.index),
    Array.from({ length: 107 }, (_, index) => index + 1)
  );

  const serviceRecognition = authored.filter(
    (item) =>
      /@NYCCouncil/i.test(item.visibleText) &&
      /(provides|provided|gives) the most/i.test(item.visibleText)
  );
  const ignoredHandles = new Set(["CallNYCapp", "NYCCouncil", "NYCHousing"]);
  const recipients = serviceRecognition
    .map((item) =>
      [...item.visibleText.matchAll(/@([A-Za-z0-9_]+)/g)]
        .map((match) => match[1])
        .find((handle) => !ignoredHandles.has(handle))
    )
    .filter(Boolean);
  const postsWithVisibleEngagement = authored.filter(
    (item) =>
      item.engagement.replies + item.engagement.reposts + item.engagement.likes > 0
  );
  const engagementTotals = authored.reduce(
    (totals, item) => ({
      replies: totals.replies + item.engagement.replies,
      reposts: totals.reposts + item.engagement.reposts,
      likes: totals.likes + item.engagement.likes
    }),
    { replies: 0, reposts: 0, likes: 0 }
  );

  assert.equal(serviceRecognition.length, 71);
  assert.equal(new Set(recipients).size, 26);
  assert.equal(
    authored.filter((item) => item.mentions.includes("@NYCCouncil")).length,
    82
  );
  assert.equal(
    authored.filter((item) => item.outgoingLinks.length > 0).length,
    87
  );
  assert.equal(derivedMetrics.recognitionPosts, 71);
  assert.equal(derivedMetrics.recognitionRecipients.length, 26);
  assert.equal(derivedMetrics.internalLinkOccurrences, 85);
  assert.equal(derivedMetrics.externalLinkOccurrences, 13);
  assert.equal(derivedMetrics.distinctDisplayedInternalDestinations, 65);
  assert.equal(derivedMetrics.distinctNormalizedInternalDestinations, 63);
  assert.equal(derivedMetrics.distinctNormalizedIssuePageDestinations, 61);
  assert.equal(authored.filter((item) => item.hasVisibleMedia).length, 75);
  assert.equal(postsWithVisibleEngagement.length, 59);
  assert.deepEqual(engagementTotals, { replies: 8, reposts: 74, likes: 111 });
  assert.equal(corpus.derivationScript, "scripts/derive-callnyc-x-corpus.mjs");
  assert.equal(
    corpus.derivationManifest,
    "callnyc-x-full-population-2026-07-14.manifest.json"
  );

  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CALLNYC-SOCIAL-TRANSLATION-SYSTEM"
  );
  const page = knowledgeBank.pages.find((item) => item.id === "callnyc");
  assert.equal(claim.maturity, "confirmed-with-boundary");
  assert.ok(
    claim.antiClaims.some((item) => /Twenty-six Council members engaged/i.test(item))
  );
  assert.ok(claim.boundaries.some((item) => /three-count gap/i.test(item)));
  assert.equal(
    page.occurrences.find((item) => item.id === "social-translation-system").claimId,
    claim.id
  );
});

test("an intake-linked source without decomposition fails KB-003", () => {
  const candidate = structuredClone(knowledgeBank);
  const sourceId = candidate.intake[0].sourceIds[0];
  candidate.sourceAssertions = candidate.sourceAssertions.filter(
    (assertion) => assertion.sourceId !== sourceId
  );

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const sourceDecomposition = result.results.find(
    (entry) => entry.eval_id === "KB-003"
  );
  assert.equal(sourceDecomposition.pass, false);
  assert.match(sourceDecomposition.findings.join("\n"), /no atomic assertion/);
});

test("a research-stage claim cannot become projection-eligible", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (entry) => entry.id === "CLM-NAC-CREATION-ROLE"
  );
  claim.projectionEligibility = "eligible";

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const maturityIntegrity = result.results.find(
    (entry) => entry.eval_id === "KB-004"
  );
  assert.equal(maturityIntegrity.pass, false);
  assert.match(maturityIntegrity.findings.join("\n"), /eligible before confirmation/);
});

test("a nonblocking score below its minimum cannot report threshold met", () => {
  const belowThreshold = structuredClone(hybridPass);
  const publicCoverage = belowThreshold.find((entry) => entry.eval_id === "KB-009");
  publicCoverage.score = 2;
  publicCoverage.pass = false;
  publicCoverage.findings = ["sentinel public-coverage failure"];

  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2, belowThreshold);
  assert.equal(result.status, "iterate");
  assert.equal(result.next_eval_id, "KB-009");
});

test("hybrid criteria cannot pass without an independent scorecard", () => {
  const result = evaluateKnowledgeBank(suite, knowledgeBank, 2);
  assert.equal(result.status, "iterate");
  assert.equal(
    result.results.find((entry) => entry.eval_id === "KB-007").pass,
    false
  );
});
