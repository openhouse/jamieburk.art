import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  collectiveCreditFingerprint,
  documentRealizesProjection,
  evaluateKnowledgeBank,
  projectionDecisionFingerprint,
  publicSurfaceFingerprint,
  routeRealizesProjection,
  validateHybridReportCandidate,
  validateKnowledgeDevelopmentSuite
} from "../check-knowledge-development.mjs";
import {
  validateCommittedCorpus as validateCallNycCorpus
} from "../derive-callnyc-x-corpus.mjs";
import {
  buildCorpus as buildWowListCorpus,
  deriveCorpusItems as deriveWowListCorpusItems,
  validateCommittedCorpus as validateWowListCorpus
} from "../derive-wowlist-x-corpus.mjs";
import {
  buildKcTownHallCorpus,
  deriveKcTownHallCorpusItems,
  validateKcTownHallCorpus
} from "../derive-kctownhall-x-corpus.mjs";
import {
  assertCanonicalXStatusUrl,
  assertValidIsoTimestamp,
  buildNycArtCCorpus,
  sanitizeNycArtCRawCapture,
  sha256,
  validateNycArtCCorpus
} from "../derive-nycartc-x-corpus.mjs";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { claimRecordSchema } from "../../apps/www/src/data/knowledge-bank/schema.ts";

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
const collectiveCreditPolicy = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/collective-credit-policy.json",
    "utf8"
  )
);
const projectionSurfaceBindings = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/projection-surface-bindings.json",
    "utf8"
  )
);

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

test("reviewed credit, projection, and public-surface inventories are current", () => {
  assert.equal(
    collectiveCreditFingerprint(knowledgeBank),
    collectiveCreditPolicy.collectiveClaimsSha256
  );
  assert.equal(
    projectionDecisionFingerprint(knowledgeBank),
    projectionSurfaceBindings.projectionDecisionSha256
  );
  assert.equal(
    publicSurfaceFingerprint(projectionSurfaceBindings),
    projectionSurfaceBindings.publicSurfaceSha256
  );
});

test("the governed resume artifact preserves contact and collective-credit boundaries", () => {
  const resumeText = readFileSync(
    projectionSurfaceBindings.resumeArtifact.extractedTextPath,
    "utf8"
  ).replace(/\s+/g, " ");

  for (const phrase of projectionSurfaceBindings.resumeArtifact.requiredText) {
    assert.match(resumeText, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const phrase of projectionSurfaceBindings.resumeArtifact.prohibitedText) {
    assert.doesNotMatch(
      resumeText,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    );
  }
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
  assert.deepEqual(page.sourceOrder.slice(0, 2), [
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
  assert.equal(
    knowledgeBank.claims.some((claim) => claim.id.startsWith("CLM-NTR-CHNG")),
    false
  );
  assert.equal(
    knowledgeBank.sources.some((source) => source.id === "SRC-NTR-CHNG-PITCH-2010"),
    false
  );
  assert.equal(
    knowledgeBank.researchTasks.some((item) => item.id === "TASK-NTR-CHNG-ROLE-CREDITS"),
    false
  );
  assert.equal(
    [...knowledgeBank.claims, ...knowledgeBank.sourceAssertions].some(
      (item) => item.project === "ntr-chng"
    ),
    false
  );
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
  const derivedMetrics = validateCallNycCorpus(rawCaptureText, corpus);
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

test("WOW List corpus accounts for the full profile-reported population and preserves product-support context", () => {
  const corpusText = readFileSync(
    "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.json",
    "utf8"
  );
  const corpus = JSON.parse(corpusText);
  const rawCaptureText = readFileSync(
    "docs/knowledge-bank/corpora/source-captures/wowlist-x-browser-extraction-2026-07-15-utc.json",
    "utf8"
  );
  const manifest = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.manifest.json",
      "utf8"
    )
  );
  const metrics = validateWowListCorpus(rawCaptureText, corpusText, manifest);
  assert.throws(() =>
    validateWowListCorpus(rawCaptureText, corpusText, {
      ...manifest,
      corpusItems: 37
    })
  );
  assert.throws(() =>
    validateWowListCorpus(rawCaptureText, ` ${corpusText}`, manifest)
  );
  const rawCaptureWithoutRepostResolution = JSON.parse(rawCaptureText);
  const repostOnlyShortUrl = rawCaptureWithoutRepostResolution.items
    .find(
      (item) =>
        item.text.startsWith("WOW List! reposted\n") &&
        item.links.some((link) => /^https?:\/\/t\.co\//.test(link.href))
    )
    .links.find((link) => /^https?:\/\/t\.co\//.test(link.href)).href;
  rawCaptureWithoutRepostResolution.shortUrlResolutions =
    rawCaptureWithoutRepostResolution.shortUrlResolutions.filter(
      (item) => item.shortUrl !== repostOnlyShortUrl
    );
  assert.throws(() =>
    buildWowListCorpus(
      `${JSON.stringify(rawCaptureWithoutRepostResolution, null, 2)}\n`
    )
  );
  const rawCaptureWithDuplicateStatus = JSON.parse(rawCaptureText);
  rawCaptureWithDuplicateStatus.items[0].statusUrl =
    rawCaptureWithDuplicateStatus.items[1].statusUrl;
  assert.throws(() =>
    buildWowListCorpus(
      `${JSON.stringify(rawCaptureWithDuplicateStatus, null, 2)}\n`
    )
  );
  const rawCaptureWithRepeatedOccurrence = JSON.parse(rawCaptureText);
  const sourceItemWithLink = rawCaptureWithRepeatedOccurrence.items.find(
    (item) => item.links.some((link) => /^https?:\/\/t\.co\//.test(link.href))
  );
  const repeatedLink = sourceItemWithLink.links.find((link) =>
    /^https?:\/\/t\.co\//.test(link.href)
  );
  rawCaptureWithRepeatedOccurrence.items
    .find((item) => item.statusUrl !== sourceItemWithLink.statusUrl)
    .links.push(repeatedLink);
  assert.equal(
    deriveWowListCorpusItems(rawCaptureWithRepeatedOccurrence)
      .flatMap((item) => item.outgoingLinks)
      .filter((item) => item.shortUrl === repeatedLink.href).length,
    2
  );
  const canonicalUrls = new Set(corpus.items.map((item) => item.canonicalUrl));
  const authored = corpus.items.filter((item) => item.type === "authored");
  const reposted = corpus.items.filter((item) => item.type === "reposted");

  assert.equal(corpus.population.profileReported, 38);
  assert.equal(corpus.capturedAt, "2026-07-15T00:56:07-04:00");
  assert.equal(corpus.population.renderedDistinct, 38);
  assert.equal(corpus.population.unresolvedCountDifference, 0);
  assert.equal(corpus.items.length, 38);
  assert.equal(canonicalUrls.size, 38);
  assert.equal(authored.length, 22);
  assert.equal(reposted.length, 16);
  assert.deepEqual(
    corpus.items.map((item) => item.index),
    Array.from({ length: 38 }, (_, index) => index + 1)
  );
  assert.deepEqual(metrics, {
    profileReported: 38,
    renderedDistinct: 38,
    authored: 22,
    reposted: 16,
    authoredReplies: 5,
    unresolvedCountDifference: 0,
    authoredPostsWithOutgoingLinks: 19,
    allOutgoingLinkOccurrences: 35,
    authoredOutgoingLinkOccurrences: 23,
    authoredWowListLinkOccurrences: 12,
    authoredNycDiyLinkOccurrences: 2,
    authoredExternalLinkOccurrences: 9,
    recoveredPublicSupportThreads: 3,
    authoredPostsWithVisibleEngagement: 12,
    authoredEngagementTotals: { replies: 2, reposts: 20, likes: 21 }
  });
  assert.equal(authored.filter((item) => item.isTopLevelReply).length, 5);
  const quotedReplyText = corpus.items.find((item) =>
    item.canonicalUrl.endsWith("/771412862191407104")
  );
  assert.equal(quotedReplyText.isTopLevelReply, false);
  assert.match(quotedReplyText.visibleText, /Quote[\s\S]+Replying to/);
  assert.equal(corpus.supplementalThreads.length, 4);
  assert.equal(
    corpus.supplementalThreads.filter((thread) => thread.parentCanonicalUrl).length,
    3
  );
  assert.ok(
    corpus.supplementalThreads.some((thread) =>
      /too many clicks/i.test(thread.parentVisibleText)
    )
  );
  assert.equal(corpus.missionPatterns.length, 5);
  const civicPattern = corpus.missionPatterns.find(
    (pattern) => pattern.id === "civic-and-mutual-aid-use"
  );
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(civicPattern.composition).map(([key, value]) => [
        key,
        value.length
      ])
    ),
    {
      directCalendarStatusIds: 2,
      authoredExternalCurationStatusIds: 3,
      repostedExternalAmplificationStatusIds: 3,
      repostedCalendarAmplificationStatusIds: 1
    }
  );
  assert.equal(civicPattern.statusIds.length, 9);
  assert.match(civicPattern.summary, /authored and reposted calendar links/);
  assert.equal(corpus.sourceLeads.length, 7);
  assert.ok(
    corpus.sourceLeads.some(
      (lead) =>
        lead.id === "good-times-zines-2" &&
        lead.disposition === "posted-url-page-not-recovered"
    )
  );

  const supportClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-PUBLIC-PRODUCT-SUPPORT"
  );
  const civicClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-CIVIC-CARE-USE-PATTERN"
  );
  const tractionClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SOCIAL-TRACTION-OBSERVATION"
  );
  const lineageClaim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-WOWLIST-SUNDAY-DINNER-SOCIAL-LINEAGE"
  );
  const page = knowledgeBank.pages.find((item) => item.id === "wowlist");
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const socialBatch = readFileSync(
    "apps/www/src/data/knowledge-bank/batches/social-account-production-2026-07-14.ts",
    "utf8"
  );
  const priorObservation = knowledgeBank.sources.find(
    (item) => item.id === "SRC-SOCIAL-WOWLIST-AUTH-OBSERVATION-2026"
  );
  const priorObservationAssertion = knowledgeBank.sourceAssertions.find(
    (item) => item.id === "AST-WOWLIST-ACCOUNT-OBSERVATION"
  );
  const currentIntake = knowledgeBank.intake.find(
    (item) => item.id === "INT-WOWLIST-X-FULL-POPULATION-2026"
  );
  const intakeSourceIds = currentIntake.sourceIds;
  const decomposedSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((assertion) => assertion.sourceId)
  );
  const currentCorpusSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-WOWLIST-X-CORPUS-2026-07-15"
  );
  const currentInquiry = knowledgeBank.researchInquiries.find(
    (item) => item.id === "INQ-WOWLIST-X-FULL-POPULATION-2026"
  );
  const civicAssertion = knowledgeBank.sourceAssertions.find(
    (item) => item.id === "AST-WOWLIST-X-CIVIC-CARE-PATTERN-2026"
  );
  const alliedMediaSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-WOWLIST-X-ALLIED-MEDIA-2015"
  );
  const socialInventoryIntake = knowledgeBank.intake.find(
    (item) => item.id === "INT-SOCIAL-PROJECT-ACCOUNT-INVENTORY-2026"
  );
  const projectNote = readFileSync(
    "docs/knowledge-bank/projects/wowlist.md",
    "utf8"
  );
  const socialInventory = readFileSync(
    "docs/knowledge-bank/projects/social-account-inventory.md",
    "utf8"
  );
  const publicRegistry = readFileSync(
    "apps/www/src/data/knowledge-bank/public-registry.json",
    "utf8"
  );
  const wowListMdx = readFileSync(
    "apps/www/src/content/work/wowlist.mdx",
    "utf8"
  );
  const runNote = readFileSync(
    "docs/knowledge-bank/runs/2026-07-15-wowlist-x-full-population.md",
    "utf8"
  );

  assert.equal(supportClaim.projectionEligibility, "eligible");
  assert.equal(civicClaim.projectionEligibility, "eligible");
  assert.equal(tractionClaim.projectionEligibility, "hold");
  assert.ok(lineageClaim.projections.every((projection) => !/Richard/.test(projection.text)));
  assert.ok(
    lineageClaim.boundaries.some((boundary) =>
      /names remain held from portfolio projection pending approval/i.test(boundary)
    )
  );
  assert.ok(supportClaim.boundaries.some((item) => /representative usability study/i.test(item)));
  assert.ok(civicClaim.antiClaims.some((item) => /caused/i.test(item)));
  assert.equal(
    page.occurrences.find((item) => item.id === "public-product-support").claimId,
    supportClaim.id
  );
  assert.ok(
    supportClaim.evidence.some(
      (item) =>
        item.sourceId === "SRC-WOWLIST-X-CORPUS-2026-07-15" &&
        item.relationship === "corroborating" &&
        item.renderCitation
    )
  );
  assert.ok(
    page.occurrences
      .find((item) => item.id === "public-product-support")
      .sourceIds.includes("SRC-WOWLIST-X-CORPUS-2026-07-15")
  );
  assert.equal(
    page.occurrences.find((item) => item.id === "civic-care-use-pattern").claimId,
    civicClaim.id
  );
  assert.match(work, /location-scope, list-discovery, and event-entry workflow questions/);
  assert.match(
    work,
    /combines direct calendar links with curation of demonstrations, vigils, fundraisers, and mutual-aid resources/
  );
  assert.doesNotMatch(
    work,
    /Screenshots, archive links, and precise adoption wording need approval/
  );
  assert.match(work, /aggregate adoption wording is approved through the public-safe proof record/);
  assert.match(work, /authenticated July 15 X corpus supports the product-support and civic-curation claims/);
  assert.equal(
    Number(priorObservation.publicNote.match(/profile reported (\d+) posts/)?.[1]),
    corpus.population.profileReported
  );
  assert.equal(
    Number(priorObservation.publicNote.match(/recovered (\d+) distinct/)?.[1]),
    corpus.population.renderedDistinct
  );
  assert.equal(
    Number(priorObservationAssertion.assertion.match(/recovered all (\d+)/)?.[1]),
    corpus.population.profileReported
  );
  assert.equal(
    Number(currentCorpusSource.publicNote.match(/reported (\d+) posts/)?.[1]),
    corpus.population.profileReported
  );
  assert.equal(
    Number(currentCorpusSource.publicNote.match(/yielded (\d+) distinct/)?.[1]),
    corpus.population.renderedDistinct
  );
  assert.equal(currentCorpusSource.preferredPublicUrl, "asset");
  assert.equal(
    currentCorpusSource.assetUrl,
    "https://github.com/openhouse/jamieburk.art/blob/da03b440f240457ae251dbdeb0a9417830d2eef4/docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.json"
  );
  assert.equal(
    Number(currentIntake.publicSafeSummary.match(/all (\d+) profile-reported/)?.[1]),
    corpus.population.profileReported
  );
  assert.equal(
    Number(currentIntake.notes[0].match(/reported (\d+) posts/)?.[1]),
    corpus.population.profileReported
  );
  assert.equal(
    Number(currentIntake.notes[0].match(/rendered (\d+) distinct/)?.[1]),
    corpus.population.renderedDistinct
  );
  assert.match(
    currentInquiry.findings[0],
    new RegExp(`exactly at ${corpus.population.profileReported} items`)
  );
  assert.match(civicAssertion.assertion, /^Nine corpus items/);
  assert.ok(currentInquiry.findings.some((finding) => /^Nine items document/.test(finding)));
  assert.ok(
    alliedMediaSource.supportsGenerally.includes("a public participation announcement")
  );
  assert.ok(alliedMediaSource.doesNotEstablish.includes("confirmed attendance"));
  assert.equal(priorObservationAssertion.reviewedAt, "2026-07-15");
  assert.equal(socialInventoryIntake.reviewedAt, "2026-07-15");
  assert.match(
    projectNote,
    new RegExp(
      `- ${corpus.population.profileReported} profile-reported posts\\n- ${corpus.population.renderedDistinct} distinct canonical status IDs recovered`
    )
  );
  assert.match(
    runNote,
    new RegExp(
      `Population: ${corpus.population.renderedDistinct} of ${corpus.population.profileReported} profile-reported items recovered`
    )
  );
  for (const field of [
    "capturedAt",
    "profileReportedPosts",
    "authenticatedAs",
    "surface",
    "captureMethod",
    "boundaries",
    "items",
    "shortUrlResolutions",
    "supplementalThreads",
    "statusUrl",
    "datetime",
    "engagementLabel",
    "links",
    "hasVisibleMedia",
    "text",
    "href",
    "shortUrl",
    "resolvedUrl",
    "method",
    "authoredStatusUrl",
    "parentStatusUrl",
    "parentPublishedAt",
    "parentAuthor",
    "parentVisibleText",
    "relationship"
  ]) {
    assert.match(runNote, new RegExp(`\\b${field}\\b`));
  }
  assert.match(runNote, /not private account data or session credentials/);
  assert.match(
    socialInventory,
    /posted but unrecovered Good Times article the account described as concerning DIY documentation/
  );
  assert.match(
    socialInventory,
    /direct calendar links and project-account curation around demonstrations/
  );
  assert.match(socialInventory, /Reviewed: July 15, 2026/);
  assert.doesNotMatch(socialInventory, /Good Times reporting on DIY documentation/);
  const projectedWowListText = [
    publicRegistry,
    work,
    wowListMdx,
    projectNote,
    socialInventory,
    runNote
  ].join("\n");
  for (const heldName of ["Richard", "Julia Fredenburg", "juliafredenburg"]) {
    assert.doesNotMatch(projectedWowListText, new RegExp(heldName, "i"));
  }
  assert.ok(intakeSourceIds.every((sourceId) => decomposedSourceIds.has(sourceId)));
  assert.match(
    socialBatch,
    /complete replies-inclusive pass recovered 38 distinct canonical status IDs/
  );
});

test("KC Town Hall corpus accounts for the full reported population and separates civic context", () => {
  const corpusText = readFileSync(
    "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.json",
    "utf8"
  );
  const corpus = JSON.parse(corpusText);
  const rawCaptureText = readFileSync(
    "docs/knowledge-bank/corpora/source-captures/kctownhall-x-browser-extraction-2026-07-15-utc.json",
    "utf8"
  );
  const rawCapture = JSON.parse(rawCaptureText);
  const manifest = JSON.parse(
    readFileSync(
      "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json",
      "utf8"
    )
  );
  const metrics = validateKcTownHallCorpus(
    rawCaptureText,
    corpusText,
    manifest
  );

  assert.throws(() =>
    validateKcTownHallCorpus(rawCaptureText, corpusText, {
      ...manifest,
      corpusItems: 180
    })
  );
  assert.throws(() =>
    validateKcTownHallCorpus(rawCaptureText, ` ${corpusText}`, manifest)
  );

  const missingResolution = structuredClone(rawCapture);
  missingResolution.shortUrlResolutions.pop();
  assert.throws(() =>
    buildKcTownHallCorpus(`${JSON.stringify(missingResolution, null, 2)}\n`)
  );

  const duplicateStatus = structuredClone(rawCapture);
  duplicateStatus.items[0].statusUrl = duplicateStatus.items[1].statusUrl;
  assert.throws(() =>
    buildKcTownHallCorpus(`${JSON.stringify(duplicateStatus, null, 2)}\n`)
  );

  const changedMissionText = structuredClone(rawCapture);
  const tirePost = changedMissionText.items.find((item) =>
    /#TiredOfTires/i.test(item.text)
  );
  tirePost.text =
    "KC Town Hall\n@KCTownHall\n·\nMay 3, 2019\nChanged non-mission text";
  assert.throws(() =>
    buildKcTownHallCorpus(`${JSON.stringify(changedMissionText, null, 2)}\n`)
  );

  const repeatedOccurrence = structuredClone(rawCapture);
  const sourceItem = repeatedOccurrence.items.find((item) =>
    item.links.some((link) => /^https?:\/\/t\.co\//.test(link.href))
  );
  const repeatedLink = sourceItem.links.find((link) =>
    /^https?:\/\/t\.co\//.test(link.href)
  );
  const originalOccurrenceCount = deriveKcTownHallCorpusItems(
    repeatedOccurrence
  )
    .flatMap((item) => item.outgoingLinks)
    .filter((item) => item.shortUrl === repeatedLink.href).length;
  repeatedOccurrence.items
    .find((item) => item.statusUrl !== sourceItem.statusUrl)
    .links.push(repeatedLink);
  assert.equal(
    deriveKcTownHallCorpusItems(repeatedOccurrence)
      .flatMap((item) => item.outgoingLinks)
      .filter((item) => item.shortUrl === repeatedLink.href).length,
    originalOccurrenceCount + 1
  );

  assert.deepEqual(metrics, {
    profileReported: 183,
    renderedDistinct: 181,
    authored: 155,
    reposted: 26,
    authoredReplies: 2,
    unresolvedCountDifference: 2,
    supplementalPublicContexts: 7,
    councilMemberAccountsWithVisibleIncomingEngagement: 3,
    cityServiceAccountReplies: 1,
    authoredPostsWithOutgoingLinks: 115,
    allOutgoingLinkOccurrences: 133,
    authoredOutgoingLinkOccurrences: 130,
    authoredKcTownHallLinkOccurrences: 119,
    authoredExternalLinkOccurrences: 11,
    authoredPostsWithVisibleMedia: 126,
    authoredPostsWithVisibleEngagement: 77,
    authoredEngagementTotals: {
      replies: 22,
      reposts: 70,
      likes: 174,
      bookmarks: 1
    },
    missionPatternCounts: {
      "tired-of-tires-public-operations": 99,
      "survey-and-listening": 12,
      "building-history-and-reuse": 11,
      "leons-grocery-access": 2,
      "covid-relief": 1,
      "voting-and-elections": 2,
      "affordable-housing-policy": 2,
      "neighborhood-service-response": 5,
      "black-lives-matter-city-hall-documentation": 12
    }
  });
  assert.equal(corpus.population.profileReported, 183);
  assert.equal(corpus.population.renderedDistinct, 181);
  assert.equal(corpus.population.unresolvedCountDifference, 2);
  assert.equal(corpus.items.length, 181);
  assert.equal(
    new Set(corpus.items.map((item) => item.canonicalUrl)).size,
    181
  );
  assert.deepEqual(
    corpus.items.map((item) => item.index),
    Array.from({ length: 181 }, (_, index) => index + 1)
  );
  assert.equal(corpus.supplementalContexts.length, 7);
  assert.equal(
    corpus.supplementalContexts.filter((item) =>
      item.relationship.includes("council-member")
    ).length,
    4
  );
  assert.equal(corpus.sourceLeads.length, 11);
  assert.equal(corpus.archivedSitePages.length, 4);
  assert.ok(
    corpus.archivedSitePages.some(
      (item) => item.id === "tires-2020" && /Julia and Jamie/.test(item.note)
    )
  );
  assert.equal(manifest.status, "profile-population-accounted-for-with-two-item-gap");
  assert.match(rawCaptureText, /\[public contact number redacted\]/);
  assert.doesNotMatch(
    rawCapture.items
      .map((item) => item.text)
      .concat(rawCapture.supplementalThreads.map((item) => item.text))
      .join("\n"),
    /(?:\([2-9][0-9]{2}\)|[2-9][0-9]{2}[ .-])[0-9]{3}[ .-][0-9]{4}/
  );
  for (const privateField of [
    "directMessages",
    "sessionIdentifier",
    "browserStorage",
    "privateAnalytics",
    "cookies",
    "tokens",
    "credentials"
  ]) {
    assert.equal(Object.hasOwn(rawCapture, privateField), false);
  }

  const publicOperations = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-X-PUBLIC-OPERATIONS"
  );
  const civicEngagement = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-X-CIVIC-ENGAGEMENT"
  );
  const traction = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-X-SOCIAL-TRACTION-OBSERVATION"
  );
  const selfReportedOutcomes = knowledgeBank.claims.find(
    (item) => item.id === "CLM-KCTH-X-SELF-REPORTED-TIRE-OUTCOMES"
  );
  const page = knowledgeBank.pages.find((item) => item.id === "kc-town-hall");
  const intake = knowledgeBank.intake.find(
    (item) => item.id === "INT-KCTH-X-FULL-POPULATION-2026"
  );
  const decomposedSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((item) => item.sourceId)
  );
  const projectNote = readFileSync(
    "docs/knowledge-bank/projects/kc-town-hall.md",
    "utf8"
  );
  const runNote = readFileSync(
    "docs/knowledge-bank/runs/2026-07-15-kctownhall-x-full-population.md",
    "utf8"
  );
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const mdx = readFileSync(
    "apps/www/src/content/work/kc-town-hall.mdx",
    "utf8"
  );
  const corpusSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-KCTH-X-CORPUS-2026-07-15"
  );

  assert.equal(publicOperations.projectionEligibility, "eligible");
  assert.equal(civicEngagement.projectionEligibility, "eligible");
  assert.equal(traction.projectionEligibility, "hold");
  assert.equal(selfReportedOutcomes.projectionEligibility, "hold");
  assert.ok(publicOperations.boundaries.some((item) => /byline supports Jamie's public documentation role/i.test(item)));
  assert.ok(
    publicOperations.evidence.some(
      (item) =>
        item.sourceId === "SRC-KCTH-WAYBACK-TIRES-2020" &&
        item.renderCitation
    )
  );
  assert.ok(civicEngagement.boundaries.some((item) => /Outbound tags and mentions are excluded/i.test(item)));
  assert.ok(selfReportedOutcomes.antiClaims.some((item) => /independently verifies/i.test(item)));
  assert.equal(
    page.occurrences.find((item) => item.id === "public-operations").claimId,
    publicOperations.id
  );
  assert.equal(
    page.occurrences.find((item) => item.id === "civic-engagement").claimId,
    civicEngagement.id
  );
  assert.ok(intake.sourceIds.every((sourceId) => decomposedSourceIds.has(sourceId)));
  assert.equal(corpusSource.preferredPublicUrl, "asset");
  assert.match(
    corpusSource.assetUrl,
    /^https:\/\/github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\//
  );
  assert.match(projectNote, /181 distinct account items recovered/);
  assert.match(projectNote, /three then-sitting Kansas City Council-member accounts/);
  assert.match(runNote, /Population: 181 of 183 profile-reported account items recovered/);
  assert.match(runNote, /Outbound mentions, tags, and general posts by a stakeholder do not count/);
  assert.match(work, /99 authored posts documenting or coordinating Tired of Tires work/);
  assert.match(mdx, /archived byline supports Jamie's public documentation role/);
  assert.doesNotMatch(
    [work, mdx].join("\n"),
    /142 tires|\$17,768|zero tires left|zero tires on the curb/i
  );
});

test("NYC Artist Coalition corpus accounts for the full profile population and preserves campaign, source, and stakeholder boundaries", () => {
  const rawPath =
    "docs/knowledge-bank/corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json";
  const corpusPath =
    "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json";
  const manifestPath =
    "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.manifest.json";
  const rawCaptureText = readFileSync(rawPath, "utf8");
  const corpusText = readFileSync(corpusPath, "utf8");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const raw = JSON.parse(rawCaptureText);
  const corpus = JSON.parse(corpusText);
  const metrics = validateNycArtCCorpus(
    rawCaptureText,
    corpusText,
    manifest
  );
  assert.equal(sanitizeNycArtCRawCapture(rawCaptureText), rawCaptureText);

  assert.deepEqual(metrics, {
    profileReported: 5_124,
    recoveredAccountItems: 3_367,
    authored: 696,
    reposted: 2_671,
    unrecoveredCountDifference: 1_757,
    supplementalPublicContexts: 19,
    allDistinctShortUrlsResolved: 1_235,
    authoredPostsWithOutgoingLinks: 446,
    authoredOutgoingLinkOccurrences: 529,
    distinctAuthoredShortUrls: 287,
    campaignMarkerCounts: {
      "fair-rent-nyc": 195,
      "save-nyc-spaces": 110,
      "let-nyc-dance": 78,
      "talks-not-raids": 54
    },
    campaignMarkerOccurrenceCounts: {
      "fair-rent-nyc": 230,
      "save-nyc-spaces": 117,
      "let-nyc-dance": 78,
      "talks-not-raids": 61
    },
    nycCouncilOutboundMentions: 115,
    nycCouncilOutboundPosts: 109,
    olympiaKaziRecoveredReposts: 194,
    authoredPostsWithVisibleInteraction: 630,
    visibleInteractionTotals: {
      replies: 112,
      reposts: 1_527,
      likes: 2_761,
      bookmarks: 64
    }
  });
  assert.equal(manifest.status, "profile-population-accounted-for-with-1757-item-recovery-gap");
  assert.equal(corpus.population.profileReported, 5_124);
  assert.equal(corpus.population.recoveredAccountItems, 3_367);
  assert.equal(corpus.population.unrecoveredCountDifference, 1_757);
  assert.equal(corpus.items.length, 3_367);
  assert.equal(new Set(corpus.items.map((item) => item.statusId)).size, 3_367);
  assert.equal(corpus.supplementalContexts.length, 19);
  assert.equal(raw.captureAudit.renderedPublicContextRecords, 35);
  assert.equal(raw.captureAudit.duplicateRenderedContextsRemoved, 16);
  assert.equal(
    new Set(raw.items.map((item) => item.statusId)).size,
    raw.items.length
  );
  assert.equal(corpus.sourceLeads.length, 12);

  const accountItems = raw.items.filter((item) => item.kind !== "context");
  const contexts = raw.items.filter((item) => item.kind === "context");
  const profileTimelineCutoff = raw.captureAudit.profileTimelineOldestVisible;
  const profileTimelineItems = accountItems.filter(
    (item) => item.recoveryPartition === "profile-timeline"
  );
  const historicalSearchItems = accountItems.filter(
    (item) => item.recoveryPartition === "historical-authored-search"
  );
  assert.equal(profileTimelineItems.length, 3_031);
  assert.equal(historicalSearchItems.length, 336);
  assert.ok(
    profileTimelineItems.every(
      (item) => item.postedAt >= profileTimelineCutoff
    )
  );
  assert.ok(
    historicalSearchItems.every(
      (item) =>
        item.kind === "authored" && item.postedAt < profileTimelineCutoff
    )
  );
  assert.ok(
    contexts.every(
      (item) => item.recoveryPartition === "supplemental-context"
    )
  );
  const resolutions = new Set(
    raw.shortUrlResolutions.map((item) => item.shortUrl)
  );
  const accountShortUrls = new Set(
    accountItems.flatMap((item) =>
      item.outgoingLinks.map((link) => link.shortUrl)
    )
  );
  const unresolvedContextOnly = new Set(
    contexts
      .flatMap((item) => item.outgoingLinks.map((link) => link.shortUrl))
      .filter((shortUrl) => !resolutions.has(shortUrl))
  );
  assert.deepEqual(accountShortUrls, resolutions);
  assert.equal(unresolvedContextOnly.size, 4);
  assert.doesNotMatch(
    rawCaptureText,
    /[?&](?:emci|emdi|ceid)=(?!\[tracking value redacted\])[^&\s]+/i
  );
  assert.ok(
    raw.items
      .filter((item) => item.kind === "reposted")
      .every(
        (item) =>
          item.text === null &&
          item.publicTextOmitted === true &&
          /^[a-f0-9]{64}$/.test(item.textSha256)
      )
  );
  assert.match(rawCaptureText, /\[public contact number redacted\]/);
  assert.match(rawCaptureText, /\[public email redacted\]/);
  for (const privateField of [
    "directMessages",
    "sessionIdentifier",
    "browserStorage",
    "privateAnalytics",
    "cookies",
    "tokens",
    "credentials"
  ]) {
    assert.equal(Object.hasOwn(raw, privateField), false);
  }

  assert.throws(() =>
    validateNycArtCCorpus(rawCaptureText, corpusText, {
      ...manifest,
      recoveredAccountItems: 3_366
    })
  );
  const rawWithoutAccountResolution = JSON.parse(rawCaptureText);
  const removedShortUrl = accountItems
    .find((item) => item.outgoingLinks.length > 0)
    .outgoingLinks[0].shortUrl;
  rawWithoutAccountResolution.shortUrlResolutions =
    rawWithoutAccountResolution.shortUrlResolutions.filter(
      (item) => item.shortUrl !== removedShortUrl
    );
  assert.throws(() =>
    buildNycArtCCorpus(
      `${JSON.stringify(rawWithoutAccountResolution, null, 2)}\n`
    )
  );
  const rawWithNestedEmail = JSON.parse(rawCaptureText);
  rawWithNestedEmail.items[0].media.altText = ["Contact private@example.org"];
  assert.throws(() =>
    buildNycArtCCorpus(`${JSON.stringify(rawWithNestedEmail, null, 2)}\n`)
  );
  const rawWithTrackingValue = JSON.parse(rawCaptureText);
  rawWithTrackingValue.shortUrlResolutions[0].resolvedUrl =
    "https://example.org/action?can_id=private-value";
  assert.throws(() =>
    buildNycArtCCorpus(`${JSON.stringify(rawWithTrackingValue, null, 2)}\n`)
  );
  const rawWithBrokenTrackingUrl = JSON.parse(rawCaptureText);
  rawWithBrokenTrackingUrl.items[0].media.altText = [
    "https://\nexample.org/action?emci=private-value&ceid=123"
  ];
  const sanitizedBrokenTrackingUrl = sanitizeNycArtCRawCapture(
    `${JSON.stringify(rawWithBrokenTrackingUrl, null, 2)}\n`
  );
  assert.doesNotMatch(sanitizedBrokenTrackingUrl, /emci=private-value|ceid=123/);
  assert.match(
    sanitizedBrokenTrackingUrl,
    /emci=\[tracking value redacted\]&ceid=\[tracking value redacted\]/
  );
  for (const privateField of [
    "directMessages",
    "privateMessages",
    "sessionIdentifier",
    "accountSettings",
    "authenticationMaterial",
    "privateAnalytics",
    "browserStorage",
    "accessToken"
  ]) {
    const rawWithPrivateField = JSON.parse(rawCaptureText);
    rawWithPrivateField.items[0].media[privateField] = "must-not-publish";
    assert.throws(() =>
      buildNycArtCCorpus(`${JSON.stringify(rawWithPrivateField, null, 2)}\n`)
    );
  }
  const rawWithWrongAuthoredHandle = JSON.parse(rawCaptureText);
  rawWithWrongAuthoredHandle.items.find(
    (item) => item.kind === "authored"
  ).sourceHandle = "SomeoneElse";
  assert.throws(() =>
    buildNycArtCCorpus(`${JSON.stringify(rawWithWrongAuthoredHandle, null, 2)}\n`)
  );
  const rawWithWrongStatusUrl = JSON.parse(rawCaptureText);
  rawWithWrongStatusUrl.items[0].statusUrl =
    "https://x.com/NYCArtC/status/999999999999999999";
  assert.throws(() =>
    buildNycArtCCorpus(`${JSON.stringify(rawWithWrongStatusUrl, null, 2)}\n`)
  );
  const rawWithStaleTextHash = JSON.parse(rawCaptureText);
  rawWithStaleTextHash.items.find((item) => item.kind === "authored").text +=
    " altered";
  assert.throws(() =>
    buildNycArtCCorpus(`${JSON.stringify(rawWithStaleTextHash, null, 2)}\n`)
  );
  const rawWithWrongPartition = JSON.parse(rawCaptureText);
  const historicalItem = rawWithWrongPartition.items.find(
    (item) => item.recoveryPartition === "historical-authored-search"
  );
  historicalItem.recoveryPartition = "profile-timeline";
  const repairedPartitionCapture = JSON.parse(
    sanitizeNycArtCRawCapture(
      `${JSON.stringify(rawWithWrongPartition, null, 2)}\n`
    )
  );
  assert.equal(
    repairedPartitionCapture.items.find(
      (item) => item.statusId === historicalItem.statusId
    ).recoveryPartition,
    "historical-authored-search"
  );
  assert.throws(() =>
    assertValidIsoTimestamp("2025-13-40T14:52:50.000Z", "mutated.postedAt")
  );
  assert.throws(() =>
    assertCanonicalXStatusUrl({
      statusId: "123",
      statusUrl: "https://example.org/NYCArtC/status/123",
      sourceHandle: "NYCArtC"
    })
  );
  assert.throws(() =>
    assertCanonicalXStatusUrl({
      statusId: "123",
      statusUrl: "http://x.com/NYCArtC/status/123",
      sourceHandle: "NYCArtC"
    })
  );

  const sharedLayer = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NAC-X-SHARED-PUBLIC-OPERATING-LAYER"
  );
  const sourceCirculation = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NAC-X-PUBLIC-SOURCE-CIRCULATION"
  );
  const stakeholderCommunication = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NAC-X-STAKEHOLDER-COMMUNICATION"
  );
  const traction = knowledgeBank.claims.find(
    (item) => item.id === "CLM-NAC-X-SOCIAL-TRACTION-OBSERVATION"
  );
  const corpusSource = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NAC-X-CORPUS-2026-07-15"
  );
  const intake = knowledgeBank.intake.find(
    (item) => item.id === "INT-NAC-X-FULL-POPULATION-2026"
  );
  const decomposedSourceIds = new Set(
    knowledgeBank.sourceAssertions.map((item) => item.sourceId)
  );
  const page = knowledgeBank.pages.find(
    (item) => item.id === "fair-rent-nyc"
  );
  const mdx = readFileSync(
    "apps/www/src/content/work/fair-rent-nyc.mdx",
    "utf8"
  );
  const work = readFileSync("apps/www/src/data/work.ts", "utf8");
  const projectNote = readFileSync(
    "docs/knowledge-bank/projects/nyc-artist-coalition.md",
    "utf8"
  );
  const runNote = readFileSync(
    "docs/knowledge-bank/runs/2026-07-15-nycartc-x-full-population.md",
    "utf8"
  );

  assert.equal(sharedLayer.projectionEligibility, "eligible");
  assert.equal(sourceCirculation.projectionEligibility, "eligible");
  assert.equal(stakeholderCommunication.projectionEligibility, "eligible");
  assert.equal(traction.projectionEligibility, "hold");
  assert.ok(
    sharedLayer.boundaries.some((item) => /1,757-item gap/.test(item))
  );
  assert.ok(
    sharedLayer.antiClaims.some((item) => /Jamie authored 696/.test(item))
  );
  assert.ok(
    stakeholderCommunication.antiClaims.some((item) =>
      /109 Council members engaged/.test(item)
    )
  );
  assert.ok(intake.sourceIds.every((sourceId) => decomposedSourceIds.has(sourceId)));
  assert.equal(corpusSource.preferredPublicUrl, "asset");
  assert.match(
    corpusSource.assetUrl,
    /^https:\/\/github\.com\/openhouse\/jamieburk\.art\/blob\/[0-9a-f]{40}\//
  );
  const [, pinnedSha, pinnedPath] = corpusSource.assetUrl.match(
    /^https:\/\/github\.com\/openhouse\/jamieburk\.art\/blob\/([0-9a-f]{40})\/(.+)$/
  );
  const pinnedCorpusText = execFileSync(
    "git",
    ["show", `${pinnedSha}:${pinnedPath}`],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
  );
  assert.equal(pinnedCorpusText, corpusText);
  assert.equal(sha256(pinnedCorpusText), manifest.corpusSha256);
  const pinnedRawCaptureText = execFileSync(
    "git",
    ["show", `${pinnedSha}:${manifest.sourceCapture}`],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
  );
  assert.equal(pinnedRawCaptureText, rawCaptureText);
  assert.equal(sha256(pinnedRawCaptureText), manifest.sourceCaptureSha256);
  assert.equal(
    page.occurrences.find(
      (item) => item.id === "shared-public-operating-layer"
    ).claimId,
    sharedLayer.id
  );
  assert.equal(
    page.occurrences.find((item) => item.id === "public-source-circulation")
      .claimId,
    sourceCirculation.id
  );
  assert.match(mdx, /What the shared identity made usable/);
  assert.match(mdx, /explicit\s+gap/);
  assert.doesNotMatch(
    [mdx, work].join("\n"),
    /1,527 reposts|2,761 likes|64 bookmarks/
  );
  assert.match(work, /446 of 696 recovered authored posts/);
  assert.match(projectNote, /1,757-item difference as an explicit recovery gap/);
  assert.match(projectNote, /109 distinct authored posts/);
  assert.match(
    projectNote,
    /outbound\s+communication, not incoming Council engagement/
  );
  const normalizedProjectNote = projectNote.replace(/\s+/g, " ");
  for (const claim of knowledgeBank.claims.filter(
    (item) => item.project === "nyc-artist-coalition"
  )) {
    for (const projection of claim.projections.filter(
      (item) =>
        item.status === "active" &&
        item.surfaces.includes("docs/knowledge-bank/projects/nyc-artist-coalition")
    )) {
      assert.ok(
        normalizedProjectNote.includes(projection.text.replace(/\s+/g, " ")),
        `${claim.id} archive projection is missing from its declared surface`
      );
    }
  }
  assert.match(runNote, /A posted destination proves source circulation only/);
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

test("policy-scoped collective claims cannot opt out of collective-credit evaluation", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-KCTH-COUNCIL-APPROVAL-190649"
  );
  claim.collectiveWork = false;
  claim.boundaries = [];
  claim.antiClaims = [];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const collectiveCredit = result.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(collectiveCredit.pass, false);
  assert.match(
    collectiveCredit.findings.join("\n"),
    /policy-scoped collective work but is not classified as collective/
  );
});

test("unknown projects and unclassified mixed-project claims fail closed", () => {
  const unknownProjectCandidate = structuredClone(knowledgeBank);
  const movedClaim = unknownProjectCandidate.claims.find(
    (item) => item.id === "CLM-KCTH-X-PUBLIC-OPERATIONS"
  );
  movedClaim.project = "new-unclassified-project";
  movedClaim.collectiveWork = false;
  movedClaim.boundaries = [];
  movedClaim.antiClaims = [];
  const unknownProjectResult = evaluateKnowledgeBank(
    suite,
    unknownProjectCandidate,
    2,
    hybridPass
  );
  const unknownProjectCredit = unknownProjectResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(unknownProjectCredit.pass, false);
  assert.match(
    unknownProjectCredit.findings.join("\n"),
    /belongs to unclassified project new-unclassified-project/
  );

  const knownIndividualCandidate = structuredClone(knowledgeBank);
  const reassignedClaim = knownIndividualCandidate.claims.find(
    (item) => item.id === "CLM-KCTH-X-PUBLIC-OPERATIONS"
  );
  reassignedClaim.project = "callnyc";
  reassignedClaim.collectiveWork = false;
  reassignedClaim.boundaries = [];
  reassignedClaim.antiClaims = [];
  const knownIndividualResult = evaluateKnowledgeBank(
    suite,
    knownIndividualCandidate,
    2,
    hybridPass
  );
  const knownIndividualCredit = knownIndividualResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(knownIndividualCredit.pass, false);
  assert.match(
    knownIndividualCredit.findings.join("\n"),
    /project callnyc conflicts with its source assertions/
  );

  const exceptionReassignmentCandidate = structuredClone(knowledgeBank);
  exceptionReassignmentCandidate.claims.find(
    (item) => item.id === "CLM-CALLNYC-HACKATHON-DATE-TIME"
  ).project = "source-backed-team-memory";
  const exceptionReassignmentResult = evaluateKnowledgeBank(
    suite,
    exceptionReassignmentCandidate,
    2,
    hybridPass
  );
  const exceptionReassignmentCredit = exceptionReassignmentResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(exceptionReassignmentCredit.pass, false);
  assert.match(
    exceptionReassignmentCredit.findings.join("\n"),
    /exception is pinned to callnyc, not source-backed-team-memory/
  );

  const mixedProjectCandidate = structuredClone(knowledgeBank);
  const unclassifiedClaim = structuredClone(
    mixedProjectCandidate.claims.find(
      (item) => item.id === "CLM-WATER-GREAT-ACCOMMODATIONS"
    )
  );
  unclassifiedClaim.id = "CLM-WATER-NEW-UNCLASSIFIED";
  mixedProjectCandidate.claims.push(unclassifiedClaim);
  const mixedProjectResult = evaluateKnowledgeBank(
    suite,
    mixedProjectCandidate,
    2,
    hybridPass
  );
  const mixedProjectCredit = mixedProjectResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(mixedProjectCredit.pass, false);
  assert.match(
    mixedProjectCredit.findings.join("\n"),
    /is not uniquely classified inside mixed project waterway-participation/
  );
});

test("collective-credit guardrails must contain substantive text", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-KCTH-X-PUBLIC-OPERATIONS"
  );
  claim.boundaries = ["   "];
  claim.antiClaims = ["\t"];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const collectiveCredit = result.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(collectiveCredit.pass, false);
  assert.match(
    collectiveCredit.findings.join("\n"),
    /lacks a substantive collective-credit boundary or anti-claim/
  );
  assert.throws(() => claimRecordSchema.parse(claim));
});

test("reviewed collective-credit contracts reject vague rewrites and coordinated project moves", () => {
  const vagueCandidate = structuredClone(knowledgeBank);
  const vagueClaim = vagueCandidate.claims.find(
    (item) => item.id === "CLM-KCTH-X-PUBLIC-OPERATIONS"
  );
  vagueClaim.internalClaim = "The team did useful work.";
  vagueClaim.boundaries = ["Give the team credit."];
  vagueClaim.antiClaims = ["Do not overstate the work."];
  const vagueResult = evaluateKnowledgeBank(suite, vagueCandidate, 2, hybridPass);
  const vagueCredit = vagueResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(vagueCredit.pass, false);
  assert.match(vagueCredit.findings.join("\n"), /credit language changed/);

  const movedCandidate = structuredClone(knowledgeBank);
  const movedClaim = movedCandidate.claims.find(
    (item) => item.id === "CLM-NAC-PUBLIC-WEB-INFRASTRUCTURE"
  );
  movedClaim.project = "wowlist";
  for (const assertion of movedCandidate.sourceAssertions.filter((item) =>
    item.candidateClaimIds.includes(movedClaim.id)
  )) {
    assertion.project = "wowlist";
  }
  const movedResult = evaluateKnowledgeBank(suite, movedCandidate, 2, hybridPass);
  const movedCredit = movedResult.results.find(
    (entry) => entry.eval_id === "KB-007"
  );
  assert.equal(movedCredit.pass, false);
  assert.match(
    movedCredit.findings.join("\n"),
    /project ownership.*changed without policy review/
  );
});

test("silent removal of governed collective knowledge fails credit and projection inventories", () => {
  const candidate = structuredClone(knowledgeBank);
  const removedId = "CLM-KCTH-X-PUBLIC-SOURCE-CIRCULATION";
  candidate.claims = candidate.claims.filter((claim) => claim.id !== removedId);
  for (const intake of candidate.intake) {
    intake.claimIds = intake.claimIds.filter((id) => id !== removedId);
  }
  for (const assertion of candidate.sourceAssertions) {
    assertion.candidateClaimIds = assertion.candidateClaimIds.filter(
      (id) => id !== removedId
    );
  }
  for (const task of candidate.researchTasks) {
    task.claimIds = task.claimIds.filter((id) => id !== removedId);
  }
  for (const page of candidate.pages) {
    page.occurrences = page.occurrences.filter(
      (occurrence) => occurrence.claimId !== removedId
    );
  }
  candidate.corrections = candidate.corrections.filter(
    (correction) => correction.claimId !== removedId
  );

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const credit = result.results.find((entry) => entry.eval_id === "KB-007");
  const projection = result.results.find((entry) => entry.eval_id === "KB-009");
  assert.equal(credit.pass, false);
  assert.equal(projection.pass, false);
  assert.match(credit.findings.join("\n"), /claim inventory/);
  assert.match(projection.findings.join("\n"), /use-now\/hold decisions/);
});

test("active projections require a known and realized surface", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-MEMORY-SYSTEM"
  );
  claim.projections.find(
    (item) => item.key === "technical-operations"
  ).surfaces = ["/does-not-exist"];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const projectionCoverage = result.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(projectionCoverage.pass, false);
  assert.match(projectionCoverage.findings.join("\n"), /targets unknown/);
});

test("case-study projections cannot move to an unrelated known route", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-NAC-FIRE-CODE-STUDY-GROUPS"
  );
  claim.projections.find((item) => item.key === "case-study").surfaces = [
    "/work/callnyc"
  ];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const projectionCoverage = result.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(projectionCoverage.pass, false);
  assert.match(
    projectionCoverage.findings.join("\n"),
    /is not realized on \/work\/callnyc/
  );
});

test("technical projections cannot move to an unrelated known route", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-MEMORY-SYSTEM"
  );
  claim.projections.find(
    (item) => item.key === "technical-operations"
  ).surfaces = ["/work/callnyc"];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const projectionCoverage = result.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(projectionCoverage.pass, false);
  assert.match(
    projectionCoverage.findings.join("\n"),
    /is not realized on \/work\/callnyc/
  );
});

test("every active document projection requires exact realization", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-NAC-FIRE-CODE-STUDY-GROUPS"
  );
  claim.projections.find((item) => item.key === "case-study").surfaces = [
    "docs/knowledge-bank/projects/callnyc"
  ];

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const projectionCoverage = result.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(projectionCoverage.pass, false);
  assert.match(
    projectionCoverage.findings.join("\n"),
    /is not realized on docs\/knowledge-bank\/projects\/callnyc/
  );
});

test("document projections cannot be realized by commented-out text", () => {
  const projection = { text: "A source-backed claim must remain visible." };

  assert.equal(
    documentRealizesProjection(
      "<!-- A source-backed claim must remain visible. -->",
      projection
    ),
    false
  );
  assert.equal(
    documentRealizesProjection(
      "A source-backed claim must remain visible.",
      projection
    ),
    true
  );
});

test("citation-required route bindings stay connected to their page occurrence", () => {
  const missingCandidate = structuredClone(knowledgeBank);
  const page = missingCandidate.pages.find(
    (item) => item.id === "fair-rent-nyc"
  );
  page.occurrences = page.occurrences.filter(
    (item) => item.id !== "fire-code-study-groups"
  );
  const missingResult = evaluateKnowledgeBank(
    suite,
    missingCandidate,
    2,
    hybridPass
  );
  const missingCoverage = missingResult.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(missingCoverage.pass, false);
  assert.match(
    missingCoverage.findings.join("\n"),
    /CLM-NAC-FIRE-CODE-STUDY-GROUPS\/case-study is not realized/
  );

  const reboundCandidate = structuredClone(knowledgeBank);
  reboundCandidate.pages
    .find((item) => item.id === "fair-rent-nyc")
    .occurrences.find(
      (item) => item.id === "fire-code-study-groups"
    ).claimId = "CLM-NAC-REPEAL-MOBILIZATION";
  const reboundResult = evaluateKnowledgeBank(
    suite,
    reboundCandidate,
    2,
    hybridPass
  );
  const reboundCoverage = reboundResult.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(reboundCoverage.pass, false);
  assert.match(reboundCoverage.findings.join("\n"), /is not realized/);

  const contextOnlyCandidate = structuredClone(knowledgeBank);
  contextOnlyCandidate.pages
    .find((item) => item.id === "callnyc")
    .occurrences.find(
      (item) => item.id === "archived-status"
    ).sourceIds = ["SRC-CALLNYC-POLITICO-2016-03-14"];
  const contextOnlyResult = evaluateKnowledgeBank(
    suite,
    contextOnlyCandidate,
    2,
    hybridPass
  );
  const contextOnlyCoverage = contextOnlyResult.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(contextOnlyCoverage.pass, false);
  assert.match(
    contextOnlyCoverage.findings.join("\n"),
    /callnyc\/archived-status lacks renderable direct support/
  );
});

test("duplicate projection keys fail public projection coverage", () => {
  const candidate = structuredClone(knowledgeBank);
  const claim = candidate.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-MEMORY-SYSTEM"
  );
  claim.projections.push(structuredClone(claim.projections[1]));

  const result = evaluateKnowledgeBank(suite, candidate, 2, hybridPass);
  const projectionCoverage = result.results.find(
    (entry) => entry.eval_id === "KB-009"
  );
  assert.equal(projectionCoverage.pass, false);
  assert.match(
    projectionCoverage.findings.join("\n"),
    /duplicates projection key technical-operations/
  );
  assert.throws(() => claimRecordSchema.parse(claim));
});

test("commented claim bindings do not count as route realization", () => {
  const claim = knowledgeBank.claims.find(
    (item) => item.id === "CLM-CRS-SHARED-MEMORY-SYSTEM"
  );
  const projection = claim.projections.find(
    (item) => item.key === "technical-operations"
  );
  const literal = `<Claim claimId="${claim.id}" projection="${projection.key}" surface="/work/technical-operations" />`;

  assert.equal(
    routeRealizesProjection(
      `{/* ${literal} */}`,
      claim,
      projection,
      "/work/technical-operations"
    ),
    false
  );
  assert.equal(
    routeRealizesProjection(
      `/* ${literal} */`,
      claim,
      projection,
      "/work/technical-operations"
    ),
    false
  );
  assert.equal(
    routeRealizesProjection(
      `const active = true; // ${literal}`,
      claim,
      projection,
      "/work/technical-operations"
    ),
    false
  );
  assert.equal(
    routeRealizesProjection(
      `<!-- ${literal} -->`,
      claim,
      projection,
      "/work/technical-operations"
    ),
    false
  );
  assert.equal(
    routeRealizesProjection(
      literal,
      claim,
      projection,
      "/work/technical-operations"
    ),
    true
  );
  assert.equal(
    routeRealizesProjection(
      `false && (\n  ${literal}\n)`,
      claim,
      projection,
      "/work/technical-operations"
    ),
    false
  );
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
