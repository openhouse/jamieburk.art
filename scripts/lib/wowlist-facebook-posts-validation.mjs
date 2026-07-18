import { createHash } from "node:crypto";

const digestPattern = /^[a-f0-9]{64}$/;
const postUrlPattern = /^https:\/\/www\.facebook\.com\/wowlist\/posts\/(\d+)$/;
const localPathPattern = /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|(?:^|\s)~\/|[A-Z]:\\Users\\)/i;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const phonePattern = /(?<!\d)(?:(?:\+?1[ .\-/]?)?\(?\d{3}\)?[ .\-/]\d{3}[ .\-/]\d{4})(?!\d)/;
const credentialPattern = /(?:Bearer\s+[A-Za-z0-9._~-]+|X-Amz-(?:Signature|Credential|Security-Token)=|access[_ -]?token|EAAB[A-Za-z0-9])/i;

const expectedTopKeys = [
  "schemaVersion",
  "title",
  "capturedAt",
  "account",
  "facebookPageId",
  "collectionSurfaces",
  "populationReconciliation",
  "ownerExportReconciliation",
  "publishingAttribution",
  "currentPageSnapshot",
  "tractionDisposition",
  "linkInventory",
  "missionPatterns",
  "closeReadSources",
  "unresolvedRecords",
  "integrity",
  "publicSafety",
  "records"
];

const expectedRecordKeys = [
  "ordinal",
  "postId",
  "managementContentId",
  "canonicalUrl",
  "publishedOn",
  "detailRecovery",
  "publisherAttribution",
  "themes",
  "sourceLinks"
];

const expectedThemeCounts = {
  "community-calendar-onboarding": 18,
  "event-and-artist-distribution": 17,
  "cultural-space-support-and-mutual-aid": 19,
  "civic-mobilization": 12,
  "community-governance-and-product-feedback": 13,
  "community-care-and-remembrance": 9,
  "cultural-space-funding": 9
};
const allowedRecordThemes = new Set([
  ...Object.keys(expectedThemeCounts),
  "artifact-requiring-close-reading"
]);

const expectedCloseReadSourceIds = new Set([
  "westword-denver-diy-fund",
  "new-yorker-dance-outlaws",
  "gothamist-silent-barn-fire",
  "brokelyn-shea-stadium-kickstarter",
  "state-press-trunk-space-new-home",
  "oc-punk-orange-county-diy"
]);

const expectedText = {
  populationTerminal:
    "The authenticated legacy table reached a stable no-growth terminal position in forward and reverse review.",
  populationBoundary:
    "This accounts for 100% of the 54 records exposed by the authenticated legacy Lifetime table on July 15, 2026. Three owner-export jobs covering the chronology completed on July 16; one 29-row file was recovered and exactly reconciled. Deleted, removed, or otherwise unexposed history is not inferred.",
  ownerFinding:
    "The recovered native owner-export file exactly matches canonical ordinals 4 through 32 from the prior publisher audit, while revealing that legacy management content IDs are not always the canonical public post IDs.",
  ownerBoundary:
    "The other two generated files were not recovered from the browser client. Their completed status does not substitute for file-level verification. The recovered file reports two Page IDs under the WOW List Page name; this is preserved as an unresolved Meta identity or migration artifact rather than interpreted as two projects.",
  attributionBoundary:
    "Facebook's admin byline identifies the Page publisher. It does not establish sole authorship of quoted or shared material, sole ownership of WOW List, or exclusive management of every project platform. WOW List was co-built by Jamie Burkart and Richard Album.",
  followerBoundary:
    "This is a dated current Page-profile count, not historical reach during 2015-2018.",
  tractionFinding:
    "Legacy management rows and the native owner export expose differently named and differently bounded interaction metrics.",
  tractionBoundary:
    "Admin analytics, per-post counters, comments, and engager identities remain protected. No reach, unique-person, attendance, endorsement, stakeholder-group, conversion, or impact claim is projected.",
  linkBoundary:
    "Links were normalized by removing Facebook and campaign tracking parameters. Inclusion records circulation through the Page; it does not establish authorship, endorsement by linked organizations, or current availability.",
  overlapBoundary:
    "Theme counts overlap and must not be summed into a unique-record denominator.",
  stakeholderBoundary:
    "The captures do not provide an identity-complete population of reactors or commenters. Source authors, shared-post originators, mentions, and linked organizations are not counted as engagers or endorsements.",
  safetyRationale:
    "The public ledger preserves identifiers, dates, public URLs, source dispositions, classifications, counts, and integrity controls without republishing social copy, personal traces, or private analytics."
};

const expectedWindows = [
  {
    start: "2015-04-01",
    end: "2016-03-30",
    generationStatus: "completed",
    fileVerification: "blocked-by-browser-client"
  },
  {
    start: "2016-03-31",
    end: "2017-03-30",
    generationStatus: "completed",
    fileVerification: "verified",
    rowCount: 29
  },
  {
    start: "2017-03-31",
    end: "2018-03-30",
    generationStatus: "completed",
    fileVerification: "blocked-by-browser-client"
  }
];

const expectedCloseReadSources = {
  "westword-denver-diy-fund": {
    canonicalUrl: "https://www.westword.com/arts-culture/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025/",
    relationship: "posted-source-context",
    supports: "WOW List circulated reporting about a Denver Arts & Venues contribution to a Meow Wolf-administered fund for DIY and alternative spaces.",
    doesNotEstablish: "WOW List created, administered, funded, or caused the program."
  },
  "new-yorker-dance-outlaws": {
    canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    relationship: "shared-source-context",
    supports: "The July 3, 2017 WOW List record circulated NYC Artist Coalition's call connected to reporting on the Cabaret Law repeal hearing.",
    doesNotEstablish: "WOW List authored the article or independently organized the hearing."
  },
  "gothamist-silent-barn-fire": {
    canonicalUrl: "https://gothamist.com/arts-entertainment/bushwick-venue-silent-barn-struggling-to-regroup-after-fire",
    relationship: "corroborating-field-context",
    supports: "Contemporaneous reporting corroborates the fire damage, displacement, donations, and repair context behind WOW List's September 30, 2015 recovery post.",
    doesNotEstablish: "WOW List caused donations, repairs, attendance, or the venue's recovery."
  },
  "brokelyn-shea-stadium-kickstarter": {
    canonicalUrl: "https://brokelyn.com/shea-needs-your-help/",
    relationship: "corroborating-field-context",
    supports: "Contemporaneous reporting corroborates Shea Stadium's 2017 $50,000 reopening campaign and code-compliance needs circulated by WOW List.",
    doesNotEstablish: "WOW List organized the campaign or caused its fundraising result."
  },
  "state-press-trunk-space-new-home": {
    canonicalUrl: "https://www.statepress.com/article/2016/10/spartscult-trunk-space-new-location",
    relationship: "corroborating-field-context",
    supports: "Reporting documents Trunk Space opening in a new downtown Phoenix home after the relocation effort circulated by WOW List.",
    doesNotEstablish: "WOW List secured the location, funded the move, or caused the reopening."
  },
  "oc-punk-orange-county-diy": {
    canonicalUrl: "https://orangecountypunkzine.tumblr.com/",
    relationship: "corroborating-field-context",
    supports: "A contemporaneous community archive corroborates Orange County DIY's effort to establish an all-ages, safer, sober, community-driven arts and music space.",
    doesNotEstablish: "WOW List owned the effort, set its strategy, or caused fundraising outcomes."
  }
};

const forbiddenPublicKeys = /^(?:text|message|caption|description|comments?|reactions?|shares?|reach|impressions?|clicks?|insights?|analytics|engagers?|reactors?|commenters?|authenticatedAs|authenticatedSessionIdentity|accessToken|signedUrl|authorizationHeader|protectedPath|rawCapture)$/i;

export const sha256 = (value) =>
  createHash("sha256").update(value).digest("hex");

export const semanticRecordDigest = (records) =>
  sha256(
    records
      .map((record) =>
        JSON.stringify({
          ordinal: record.ordinal,
          postId: record.postId,
          managementContentId: record.managementContentId,
          canonicalUrl: record.canonicalUrl,
          publishedOn: record.publishedOn,
          detailRecovery: record.detailRecovery,
          publisherAttribution: record.publisherAttribution,
          themes: [...record.themes].sort(),
          sourceLinks: [...record.sourceLinks].sort()
        })
      )
      .join("\n")
  );

const normalizeObject = (value) => {
  if (Array.isArray(value)) return value.map(normalizeObject);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, normalizeObject(child)])
  );
};

const sameObject = (left, right) =>
  JSON.stringify(normalizeObject(left)) === JSON.stringify(normalizeObject(right));

const exactKeys = (value, expected, path, fail) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${path} must be an object.`);
    return;
  }
  const actual = Object.keys(value);
  for (const key of actual) {
    if (!expected.includes(key)) fail(`Unexpected public key at ${path}.${key}.`);
  }
  for (const key of expected) {
    if (!actual.includes(key)) fail(`Missing public key at ${path}.${key}.`);
  }
};

const walk = (value, path = "$", entries = []) => {
  if (Array.isArray(value)) {
    value.forEach((child, index) => walk(child, `${path}[${index}]`, entries));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      entries.push({ path: `${path}.${key}`, key, value: child });
      walk(child, `${path}.${key}`, entries);
    }
  }
  return entries;
};

export const validateWowListFacebookPostLedger = (ledger) => {
  const errors = [];
  const fail = (message) => errors.push(message);

  exactKeys(ledger, expectedTopKeys, "$", fail);
  if (ledger?.schemaVersion !== 2) fail("schemaVersion must equal 2.");
  if (ledger?.capturedAt !== "2026-07-16") fail("capturedAt must equal 2026-07-16.");
  if (ledger?.account !== "WOW List") fail("account must equal WOW List.");
  if (ledger?.facebookPageId !== "242582625948552") {
    fail("facebookPageId changed.");
  }
  if (ledger?.title !== "WOW List Facebook posts: authenticated full-population public ledger") {
    fail("Ledger title changed.");
  }
  if (!sameObject(ledger?.collectionSurfaces, [
    "Facebook Professional Dashboard > Content Library > Published > Lifetime",
    "Meta Business Suite > Content > Export metric data > Post > Creation date > Lifetime"
  ])) {
    fail("Collection surfaces changed.");
  }

  const population = ledger?.populationReconciliation ?? {};
  exactKeys(
    population,
    ["coverageState", "materializedRecordCount", "dateRange", "canonicalPublicPostCount", "legacyManagementContentIdCount", "terminalState", "boundary"],
    "$.populationReconciliation",
    fail
  );
  exactKeys(population.dateRange, ["start", "end"], "$.populationReconciliation.dateRange", fail);
  if (population.coverageState !== "complete-as-materialized") {
    fail("Population must remain complete-as-materialized.");
  }
  if (population.materializedRecordCount !== 54) fail("Materialized count must equal 54.");
  if (population.canonicalPublicPostCount !== 54) fail("Canonical count must equal 54.");
  if (population.legacyManagementContentIdCount !== 54) fail("Legacy ID count must equal 54.");
  if (population.dateRange?.start !== "2015-04-25" || population.dateRange?.end !== "2018-03-22") {
    fail("Population date range changed.");
  }
  if (population.terminalState !== expectedText.populationTerminal) fail("Population terminal-state statement changed.");
  if (population.boundary !== expectedText.populationBoundary) fail("Population boundary changed or contains a contradiction.");

  const owner = ledger?.ownerExportReconciliation ?? {};
  exactKeys(
    owner,
    ["generatedAt", "windows", "verifiedWindowCanonicalOrdinalStart", "verifiedWindowCanonicalOrdinalEnd", "exactCanonicalIdAgreement", "pageIdDistribution", "creationDateAgreement", "finding", "boundary"],
    "$.ownerExportReconciliation",
    fail
  );
  if (owner.generatedAt !== "2026-07-16") fail("Owner-export generation date changed.");
  if (owner.windows?.length !== 3) fail("Owner export must retain three windows.");
  if (!sameObject(owner.windows, expectedWindows)) fail("Owner-export windows or verification dispositions changed.");
  if (owner.verifiedWindowCanonicalOrdinalStart !== 4 || owner.verifiedWindowCanonicalOrdinalEnd !== 32) {
    fail("Verified owner-export ordinal span must remain 4 through 32.");
  }
  if (owner.exactCanonicalIdAgreement !== 29) fail("Exact owner-export agreement must equal 29.");
  if (!sameObject(owner.pageIdDistribution, { "100079003246603": 7, "242582625948552": 22 })) {
    fail("Owner-export Page ID distribution must retain the observed 7/22 split.");
  }
  const expectedCreationDateAgreement = {
    sameCalendarDate: 27,
    ownerExportOneDayEarlier: 2,
    shiftedCanonicalOrdinals: [12, 15],
    boundary: "The native export supplies timestamps while the legacy and detail surfaces supply rendered dates. Two late-evening export timestamps resolve to the prior calendar day; this is preserved as an interface/timezone boundary rather than silently forced into date identity."
  };
  exactKeys(owner.creationDateAgreement, Object.keys(expectedCreationDateAgreement), "$.ownerExportReconciliation.creationDateAgreement", fail);
  if (!sameObject(owner.creationDateAgreement, expectedCreationDateAgreement)) {
    fail("Owner-export creation-date reconciliation changed.");
  }
  if (owner.finding !== expectedText.ownerFinding) fail("Owner-export finding changed or contains a contradiction.");
  if (owner.boundary !== expectedText.ownerBoundary) fail("Owner-export boundary changed or contains a contradiction.");

  const attribution = ledger?.publishingAttribution ?? {};
  exactKeys(attribution, ["canonicalPostCount", "detailsAttributedToJamieBurkart", "videoRedirectsWithoutRecoveredPublisherByline", "boundary"], "$.publishingAttribution", fail);
  if (attribution.canonicalPostCount !== 54) fail("Attribution denominator must equal 54.");
  if (attribution.detailsAttributedToJamieBurkart !== 51) fail("Jamie Page-publisher bylines must equal 51.");
  if (attribution.videoRedirectsWithoutRecoveredPublisherByline !== 3) {
    fail("Video redirects without byline must equal three.");
  }
  if (attribution.boundary !== expectedText.attributionBoundary) fail("Attribution boundary changed or contains a contradiction.");

  exactKeys(ledger?.currentPageSnapshot, ["observedOn", "followers", "boundary"], "$.currentPageSnapshot", fail);
  if (ledger?.currentPageSnapshot?.observedOn !== "2026-07-15") fail("Current Page snapshot date changed.");
  if (ledger?.currentPageSnapshot?.followers !== 185) fail("Dated Page snapshot must equal 185 followers.");
  if (ledger?.currentPageSnapshot?.boundary !== expectedText.followerBoundary) fail("Follower boundary changed or contains a contradiction.");
  exactKeys(ledger?.tractionDisposition, ["status", "finding", "boundary"], "$.tractionDisposition", fail);
  if (ledger?.tractionDisposition?.status !== "held") fail("Traction metrics must remain held.");
  if (ledger?.tractionDisposition?.finding !== expectedText.tractionFinding) fail("Traction finding changed or contains a contradiction.");
  if (ledger?.tractionDisposition?.boundary !== expectedText.tractionBoundary) fail("Traction boundary changed or contains a contradiction.");

  const records = ledger?.records ?? [];
  if (records.length !== 54) fail("records must contain exactly 54 items.");
  const postIds = new Set();
  const managementIds = new Set();
  let jamieBylines = 0;
  let videoRedirects = 0;
  const links = new Set();
  const themeCounts = Object.fromEntries(Object.keys(expectedThemeCounts).map((key) => [key, 0]));
  let previousDate = "9999-12-31";

  records.forEach((record, index) => {
    exactKeys(record, expectedRecordKeys, `$.records[${index}]`, fail);
    if (record.ordinal !== index + 1) fail(`Record ${index + 1} has a mismatched ordinal.`);
    if (!/^\d+$/.test(record.postId ?? "")) fail(`Record ${index + 1} has an invalid postId.`);
    if (!/^\d+$/.test(record.managementContentId ?? "")) fail(`Record ${index + 1} has an invalid managementContentId.`);
    if (postIds.has(record.postId)) fail(`Duplicate canonical post ID ${record.postId}.`);
    if (managementIds.has(record.managementContentId)) fail(`Duplicate legacy management ID ${record.managementContentId}.`);
    postIds.add(record.postId);
    managementIds.add(record.managementContentId);
    const urlMatch = String(record.canonicalUrl ?? "").match(postUrlPattern);
    if (!urlMatch || urlMatch[1] !== record.postId) fail(`Record ${index + 1} canonical URL does not match postId.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.publishedOn ?? "")) fail(`Record ${index + 1} has an invalid date.`);
    if (record.publishedOn > previousDate) fail("Records must remain reverse chronological.");
    previousDate = record.publishedOn;

    if (record.detailRecovery === "available-post" && record.publisherAttribution === "jamie-burkart") {
      jamieBylines += 1;
    } else if (record.detailRecovery === "available-video-redirect" && record.publisherAttribution === "not-recovered") {
      videoRedirects += 1;
    } else {
      fail(`Record ${index + 1} has an unsupported detail/byline disposition.`);
    }

    for (const theme of record.themes ?? []) {
      if (!allowedRecordThemes.has(theme)) fail(`Unexpected theme ${theme}.`);
      else if (Object.hasOwn(themeCounts, theme)) themeCounts[theme] += 1;
    }
    for (const link of record.sourceLinks ?? []) {
      if (!/^https?:\/\//.test(link)) fail(`Record ${index + 1} has a non-public source URL.`);
      links.add(link);
    }
  });

  if (postIds.size !== 54 || managementIds.size !== 54) fail("Both identifier sets must contain 54 unique values.");
  if (jamieBylines !== 51) fail("Record-level Jamie bylines must total 51.");
  if (videoRedirects !== 3) fail("Record-level video redirects must total three.");
  if (sha256(records.map((record) => record.postId).join("\n")) !== ledger?.integrity?.canonicalPostIdSha256) {
    fail("Canonical ID digest does not reconcile.");
  }
  if (sha256(records.map((record) => record.managementContentId).join("\n")) !== ledger?.integrity?.managementContentIdSha256) {
    fail("Legacy management ID digest does not reconcile.");
  }
  if (ledger?.integrity?.canonicalPostIdCount !== 54) fail("Integrity count must equal 54.");
  if (!digestPattern.test(ledger?.integrity?.canonicalPostIdSha256 ?? "") || !digestPattern.test(ledger?.integrity?.managementContentIdSha256 ?? "") || !digestPattern.test(ledger?.integrity?.recordSemanticSha256 ?? "")) {
    fail("Integrity controls must be lowercase SHA-256 digests.");
  }

  if (links.size !== 42 || ledger?.linkInventory?.normalizedDistinctUrlCount !== 42) {
    fail("Normalized distinct URL count must equal 42.");
  }
  const listedLinks = ledger?.linkInventory?.links ?? [];
  if (listedLinks.length !== 42 || new Set(listedLinks).size !== 42) fail("Link inventory must contain 42 unique URLs.");
  if (JSON.stringify([...links].sort()) !== JSON.stringify([...listedLinks].sort())) {
    fail("Record-level source links do not reconcile to the link inventory.");
  }
  if (!sameObject(themeCounts, expectedThemeCounts)) {
    fail("Theme counts do not reconcile to the 54 records.");
  }
  if (!sameObject(ledger?.missionPatterns?.recordCounts, expectedThemeCounts)) {
    fail("Published mission-pattern counts changed.");
  }
  exactKeys(
    ledger?.missionPatterns,
    ["recordCounts", "overlapBoundary", "stakeholderEngagementBoundary"],
    "$.missionPatterns",
    fail
  );
  if (ledger?.missionPatterns?.overlapBoundary !== expectedText.overlapBoundary) fail("Overlap boundary changed or contains a contradiction.");
  if (ledger?.missionPatterns?.stakeholderEngagementBoundary !== expectedText.stakeholderBoundary) fail("Stakeholder boundary changed or contains a contradiction.");

  exactKeys(ledger?.linkInventory, ["normalizedDistinctUrlCount", "links", "boundary"], "$.linkInventory", fail);
  if (ledger?.linkInventory?.boundary !== expectedText.linkBoundary) fail("Link boundary changed or contains a contradiction.");

  const closeReadIds = new Set((ledger?.closeReadSources ?? []).map((source) => source.id));
  if (closeReadIds.size !== 6 || [...expectedCloseReadSourceIds].some((id) => !closeReadIds.has(id))) {
    fail("Six required close-read source dispositions must remain present.");
  }
  for (const source of ledger?.closeReadSources ?? []) {
    exactKeys(source, ["id", "canonicalUrl", "relationship", "supports", "doesNotEstablish"], `$.closeReadSources.${source.id}`, fail);
    if (!/^https?:\/\//.test(source.canonicalUrl ?? "")) fail(`Close-read source ${source.id} lacks a public URL.`);
    if (!source.supports || !source.doesNotEstablish) fail(`Close-read source ${source.id} lacks a two-sided disposition.`);
    if (/WOW List (?:caused|created|administered|funded|secured|organized|owned)/i.test(source.supports ?? "")) {
      fail(`Close-read source ${source.id} turns circulation into causation or ownership.`);
    }
    if (!sameObject(source, { id: source.id, ...expectedCloseReadSources[source.id] })) {
      fail(`Close-read source ${source.id} changed or contains a contradiction.`);
    }
  }

  const unresolved = ledger?.unresolvedRecords ?? [];
  if (unresolved.length !== 3) fail("Exactly three video redirects must remain unresolved for byline recovery.");
  unresolved.forEach((record, index) =>
    exactKeys(
      record,
      ["postId", "managementContentId", "publishedOn", "detailRecovery"],
      `$.unresolvedRecords[${index}]`,
      fail
    )
  );
  const unresolvedIds = new Set(unresolved.map((record) => record.postId));
  const videoRecords = records
    .filter((record) => record.detailRecovery === "available-video-redirect")
    .map(({ postId, managementContentId, publishedOn, detailRecovery }) => ({
      postId,
      managementContentId,
      publishedOn,
      detailRecovery
    }));
  const videoIds = new Set(videoRecords.map((record) => record.postId));
  if (JSON.stringify([...unresolvedIds].sort()) !== JSON.stringify([...videoIds].sort())) {
    fail("Unresolved-record list must reconcile to the video redirects.");
  }
  if (!sameObject(unresolved, videoRecords)) fail("Unresolved-record details must reconcile exactly to the video redirects.");

  exactKeys(ledger?.integrity, ["canonicalPostIdCount", "canonicalPostIdSha256", "managementContentIdSha256", "recordSemanticSha256"], "$.integrity", fail);
  if (ledger?.integrity?.canonicalPostIdSha256 !== "df7a415c346bceee628203b88b6c8eec9649ef598f64938537f3269985167890") {
    fail("Canonical ID digest changed from the protected derivation control.");
  }
  if (ledger?.integrity?.managementContentIdSha256 !== "495e7065753e67f122a1da5eb20f3d783c245c1c6a6d25dc038b54f9dbca5a98") {
    fail("Legacy management ID digest changed from the protected derivation control.");
  }
  if (ledger?.integrity?.recordSemanticSha256 !== "ba951a427ee6ff2815f80c679be8eefdde499413593c071f6b37a9b75f48292d") {
    fail("Record semantic digest changed from the protected derivation control.");
  }
  if (semanticRecordDigest(records) !== ledger?.integrity?.recordSemanticSha256) {
    fail("Record semantic digest does not reconcile.");
  }

  const safety = ledger?.publicSafety ?? {};
  exactKeys(safety, ["rawPostTextPublished", "commentsPublished", "engagerIdentitiesPublished", "adminAnalyticsPublished", "authenticatedSessionDataPublished", "privatePathsPublished", "rationale"], "$.publicSafety", fail);
  for (const key of [
    "rawPostTextPublished",
    "commentsPublished",
    "engagerIdentitiesPublished",
    "adminAnalyticsPublished",
    "authenticatedSessionDataPublished",
    "privatePathsPublished"
  ]) {
    if (safety[key] !== false) fail(`${key} must remain false.`);
  }
  if (safety.rationale !== expectedText.safetyRationale) fail("Public-safety rationale changed or contains a contradiction.");

  for (const entry of walk(ledger)) {
    if (forbiddenPublicKeys.test(entry.key)) fail(`Forbidden public key at ${entry.path}.`);
    if (typeof entry.value === "string") {
      if (localPathPattern.test(entry.value)) fail(`Machine-local path at ${entry.path}.`);
      if (emailPattern.test(entry.value)) fail(`Email address at ${entry.path}.`);
      if (phonePattern.test(entry.value)) fail(`Phone number at ${entry.path}.`);
      if (credentialPattern.test(entry.value)) fail(`Credential-like value at ${entry.path}.`);
    }
  }

  return errors;
};

export const validateWowListFacebookPostManifest = (manifest, { ledgerText }) => {
  const errors = [];
  const fail = (message) => errors.push(message);
  exactKeys(
    manifest,
    ["schemaVersion", "generatedAt", "generator", "sourceCapturesPublished", "corpus", "corpusSha256", "corpusBytes", "population", "ownerExport", "privacy"],
    "$manifest",
    fail
  );
  if (manifest?.schemaVersion !== 2) fail("Manifest schemaVersion must equal 2.");
  if (manifest?.generatedAt !== "2026-07-16T16:00:00-04:00") fail("Manifest generation timestamp changed.");
  if (manifest?.generator !== "Protected authenticated capture reconciliation plus public-safe derivation") fail("Manifest generator changed.");
  if (manifest?.corpus !== "docs/knowledge-bank/corpora/wowlist-facebook-posts-full-population-2026-07-16.json") fail("Manifest corpus path changed.");
  if (!digestPattern.test(manifest?.corpusSha256 ?? "")) fail("Manifest corpus digest must be lowercase SHA-256.");
  if (manifest?.corpusSha256 !== sha256(ledgerText)) fail("Manifest corpus digest does not match the ledger.");
  if (manifest?.corpusBytes !== Buffer.byteLength(ledgerText)) fail("Manifest byte count does not match the ledger.");
  if (manifest?.sourceCapturesPublished !== false) fail("Protected source captures must remain unpublished.");
  const expectedPopulation = {
    materializedRecords: 54,
    canonicalPostIds: 54,
    legacyManagementContentIds: 54,
    publisherBylines: 51,
    videoRedirectsWithoutBylines: 3,
    start: "2015-04-25",
    end: "2018-03-22",
    status: "complete-as-materialized"
  };
  exactKeys(manifest?.population, Object.keys(expectedPopulation), "$manifest.population", fail);
  if (!sameObject(manifest?.population, expectedPopulation)) fail("Manifest population controls changed.");
  const expectedOwnerExport = {
    generatedWindows: 3,
    completedWindows: 3,
    fileVerifiedWindows: 1,
    verifiedRows: 29,
    exactCanonicalIdAgreement: 29,
    boundary: "Two completed export files were not recovered from the browser client and remain unverified."
  };
  exactKeys(manifest?.ownerExport, Object.keys(expectedOwnerExport), "$manifest.ownerExport", fail);
  if (!sameObject(manifest?.ownerExport, expectedOwnerExport)) fail("Manifest owner-export controls changed.");
  const expectedPrivacy = {
    rawPostTextPublished: false,
    commentsPublished: false,
    engagerIdentitiesPublished: false,
    adminAnalyticsPublished: false,
    authenticatedSessionDataPublished: false,
    privatePathsPublished: false,
    rationale: expectedText.safetyRationale
  };
  exactKeys(manifest?.privacy, Object.keys(expectedPrivacy), "$manifest.privacy", fail);
  if (!sameObject(manifest?.privacy, expectedPrivacy)) fail("Manifest privacy controls changed.");
  return errors;
};
