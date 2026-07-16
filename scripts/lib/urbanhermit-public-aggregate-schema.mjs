const scalar = Symbol("scalar");
const arrayOf = (item) => ({ arrayOf: item });
const exactObject = (shape) => ({ exactObject: shape });

const numericMap = (keys) => exactObject(Object.fromEntries(keys.map((key) => [key, scalar])));

export const urbanhermitPublicAggregateSchema = exactObject({
  generatedAt: scalar,
  account: scalar,
  publicSafety: exactObject({ status: scalar, included: scalar, excluded: scalar, rawCaptureLocation: scalar, reason: scalar }),
  populationReconciliation: exactObject({
    profileReportedPostCount: scalar,
    postsTimelineUniqueCount: scalar,
    repliesTimelineRenderedArticleCount: scalar,
    repliesTimelineConversationContextCount: scalar,
    repliesTimelinePrimaryRecordCount: scalar,
    recoveredUnionRecordCount: scalar,
    recoveredPopulationReviewedPercent: scalar,
    profileCountNotMaterialized: scalar,
    dateRange: exactObject({ earliestYear: scalar, latestYear: scalar }),
    traversalPasses: exactObject({ posts: scalar, replies: scalar }),
    repeatedNoGrowthPasses: exactObject({ posts: scalar, replies: scalar }),
    protectedRecordSetSha256: scalar,
    conclusion: scalar,
    boundary: scalar
  }),
  recordTypeCounts: numericMap(["original", "reply", "repost"]),
  recordsByYear: numericMap(["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]),
  publishingPattern: exactObject({
    accountAuthoredRecordCount: scalar,
    accountAuthoredOriginalCount: scalar,
    accountAuthoredReplyCount: scalar,
    externalSourceNativeRepostRecordCount: scalar,
    recordsWithExternalLinks: scalar,
    externalLinkOccurrences: scalar,
    distinctExternalShortUrls: scalar,
    accountAuthoredExternalLinkOccurrences: scalar,
    accountAuthoredDistinctExternalShortUrls: scalar,
    missionSignalRecordCounts: numericMap([
      "community-platforms-and-gatherings",
      "civic-participation-and-service",
      "cultural-space-advocacy",
      "public-history-place-and-waterways",
      "creative-technology-and-media",
      "neighborhood-mutual-aid"
    ]),
    recurringFunctions: arrayOf(scalar),
    classificationMethod: scalar
  }),
  postedUrlInventory: exactObject({ recordCountWithExternalLinks: scalar, externalLinkOccurrences: scalar, distinctExternalShortUrls: scalar, boundary: scalar }),
  stakeholderInventory: exactObject({
    query: scalar,
    yearlySearchWindow: scalar,
    recoveredPublicIncomingRecordCount: scalar,
    missionRelevantThirdPartyRecordCount: scalar,
    missionRelevantThirdPartyAccountCount: scalar,
    missionRelevantConversationContextCount: scalar,
    contextLimitedRecordCount: scalar,
    protectedIncomingRecordSetSha256: scalar,
    stakeholderGroupCounts: numericMap([
      "civic-design-peer",
      "coalition-project-account",
      "creative-community-peer",
      "creative-media-collaborator",
      "creative-technology-peer",
      "neighborhood-collaborator",
      "neighborhood-project-account",
      "public-history-collaborator"
    ]),
    findings: arrayOf(scalar),
    boundary: scalar
  }),
  visibleEngagementSnapshot: exactObject({
    capturedAt: scalar,
    accountAuthoredRecordsWithAnyDisplayedInteraction: scalar,
    accountAuthoredDisplayedInteractionTotals: numericMap(["likes", "replies", "reposts", "bookmarks", "views"]),
    boundary: scalar
  }),
  missionSignalClassification: exactObject({
    rules: arrayOf(exactObject({ signalId: scalar, pattern: scalar, flags: scalar })),
    inputFields: arrayOf(scalar),
    boundary: scalar
  })
});

export function collectUrbanhermitAggregateShapeFailures(value, schema = urbanhermitPublicAggregateSchema, path = "fixture") {
  if (schema === scalar) {
    return value !== null && typeof value !== "object" ? [] : [`${path} must be a scalar`];
  }
  if (schema.arrayOf) {
    if (!Array.isArray(value)) return [`${path} must be an array`];
    return value.flatMap((item, index) => collectUrbanhermitAggregateShapeFailures(item, schema.arrayOf, `${path}[${index}]`));
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return [`${path} must be an object`];

  const allowed = Object.keys(schema.exactObject);
  const actual = Object.keys(value);
  const failures = actual.filter((key) => !allowed.includes(key)).map((key) => `${path}.${key} is not allowed`);
  failures.push(...allowed.filter((key) => !(key in value)).map((key) => `${path}.${key} is required`));
  for (const key of allowed) {
    if (key in value) failures.push(...collectUrbanhermitAggregateShapeFailures(value[key], schema.exactObject[key], `${path}.${key}`));
  }
  return failures;
}

export function assertUrbanhermitPublicAggregateShape(value) {
  const failures = collectUrbanhermitAggregateShapeFailures(value);
  if (failures.length) throw new Error(`Urbanhermit aggregate shape failed:\n${failures.join("\n")}`);
  return value;
}
