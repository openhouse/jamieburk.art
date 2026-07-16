import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [capturePath, publisherAuditPath, outputPath] = process.argv.slice(2);

if (!capturePath || !publisherAuditPath || !outputPath) {
  throw new Error(
    "Usage: node scripts/research/build-wowlist-facebook-posts-census.mjs <protected-capture.json> <protected-publisher-audit.json> <public-census.json>",
  );
}

const capture = JSON.parse(readFileSync(resolve(capturePath), "utf8"));
const publisherAudit = JSON.parse(
  readFileSync(resolve(publisherAuditPath), "utf8"),
);
const publisherByPostId = new Map(
  publisherAudit.records.map((record) => [record.postId, record]),
);

const unique = (values) => [...new Set(values)];
const protectedDigest = (value) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");

const normalizePostedUrl = (rawUrl) => {
  try {
    let url = new URL(rawUrl);
    if (
      url.hostname.toLowerCase() === "l.facebook.com" &&
      url.pathname === "/l.php" &&
      url.searchParams.get("u")
    ) {
      url = new URL(url.searchParams.get("u"));
    }

    url.hash = "";
    url.hostname = url.hostname.toLowerCase().replace(/^www\./, "");
    for (const key of [...url.searchParams.keys()]) {
      if (/^(?:utm_.+|fbclid|h|s|ts|usp|og)$/i.test(key)) {
        url.searchParams.delete(key);
      }
    }
    if (url.pathname === "/") url.pathname = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
};

const isPlatformUrl = (url) => {
  const hostname = new URL(url).hostname;
  return /(^|\.)facebook\.com$/i.test(hostname) || hostname === "m.me";
};

const isWithheldRoute = (url) =>
  new URL(url).hostname === "docs.google.com";

const relationshipFor = (record) => {
  const hasPageMessage = record.pageMessages.length > 0;
  const hasAttachedMessage = record.attachedMessages.length > 0;
  if (hasPageMessage && hasAttachedMessage) {
    return "page-commentary-with-shared-source";
  }
  if (hasPageMessage) return "page-authored-commentary";
  if (hasAttachedMessage) return "shared-source-only";
  return "media-or-link-without-message";
};

const missionRules = [
  {
    id: "product-onboarding-and-contribution",
    pattern:
      /join|add (?:your own )?events?|weekly (?:email|digest)|tutorial|account|profile|site design|how could wow list|alternative to facebook|community calendar|follow us on wowlist|updating phxdiy|userbase|paste (?:a )?link/i,
  },
  {
    id: "event-discovery-and-circulation",
    pattern:
      /events?|shows?|tour|screening|festival|lecture|calendar|march|performance|concert|coming to a diy spot|find your march|near you/i,
  },
  {
    id: "diy-cultural-space-sustainability",
    pattern:
      /diy (?:space|spot)|community spaces?|venue|all.?ages|fire|fund|grant|closing|evict|illegal|cabaret|safety|safe underground|building code|rent assistance|silent barn|pehrspace|shea stadium|meow wolf|saferspac|ghost ship|the know/i,
  },
  {
    id: "mutual-aid-and-solidarity",
    pattern:
      /donat|fundraiser|support|standing rock|waterislife|victims?|vigil|womensmarch|women.?s march|downwithtrump|resistance|civil rights|mourn|fire relief|recovery|help .*home|protect the water/i,
  },
  {
    id: "civic-and-cultural-advocacy",
    pattern:
      /cabaret|city council|decriminalize|legalize|city partners|public funding|movement|march|popular\.vote|nodapl|anti.?oppression|racism|sexism|islamophobia|city officials|criminalization/i,
  },
  {
    id: "peer-learning-and-documentation",
    pattern:
      /manual|tutorial|who do it|essay|guide|skills?|online hangout|working with|allied media|archive|document|writing|newsletter|organizational structur|ideas to make this/i,
  },
];

const stakeholderRules = [
  {
    id: "community-contributors-and-organizers",
    pattern:
      /aaron ponzo|richard album|zrach burba|clyde petersen|shermy turtel|steph carrico|josh hoshwa redman|kevin greenspon|dan weiss|noah johanson|joe gutierrez|shelby|pacific nature|organizer|artist|band|tour/i,
  },
  {
    id: "diy-cultural-spaces-and-networks",
    pattern:
      /pehrspace|silent barn|shea stadium|trunk space|the know|phxdiy|seattlediy|sbdiy|ladiy|chidiy|iowa city diy|orange county diy|diy space|all.?ages/i,
  },
  {
    id: "arts-and-civic-organizations",
    pattern:
      /nyc artist coalition|allied media|meow wolf|city council|denver arts|umkc|arts institution/i,
  },
  {
    id: "public-media-and-documentarians",
    pattern:
      /fox 11|east bay express|westword|willamette|grasstronaut|benbiersmith|youtube|document|article|essay|report/i,
  },
  {
    id: "movement-and-mutual-aid-publics",
    pattern:
      /standing rock|waterislife|womensmarch|women.?s march|downwithtrump|popular\.vote|civil rights|victims?|vigil|fundraiser|donat|recovery|mutual aid/i,
  },
];

const publicOrganizationActors = new Set([
  "Allied Media Projects",
  "FOX 11 Los Angeles",
  "NYC Artist Coalition",
  "Pacific Nature Presents",
  "pehrspace",
]);

const censusRecords = capture.records
  .slice()
  .sort((left, right) => left.creationTime.localeCompare(right.creationTime))
  .map((record, index) => {
    const publisher = publisherByPostId.get(record.postId);
    if (!publisher) {
      throw new Error(`Publisher audit is missing post ${record.postId}`);
    }

    const pageMessages = unique(record.pageMessages.map((item) => item.text));
    const attachedMessages = unique(
      record.attachedMessages.map((item) => item.text),
    );
    const actorNames = unique(record.actors.map((item) => item.name));
    const textForClassification = [
      ...pageMessages,
      ...attachedMessages,
      ...actorNames,
      ...record.urls,
    ].join("\n");
    const normalizedUrls = unique(
      record.urls.map(normalizePostedUrl).filter(Boolean),
    ).filter((url) => !isPlatformUrl(url));
    const publicUrls = normalizedUrls.filter((url) => !isWithheldRoute(url));
    const withheldUrlCount = normalizedUrls.length - publicUrls.length;
    const relationship = relationshipFor(record);

    return {
      populationSlot: `RECOVERED-${String(index + 1).padStart(3, "0")}`,
      postId: record.postId,
      postUrl: `https://www.facebook.com/wowlist/posts/${record.postId}`,
      publishedAt: record.creationTime,
      relationship,
      liveDisposition: publisher.liveDisposition,
      publisherAttribution: publisher.publisherAttribution,
      missionThemes: missionRules
        .filter((rule) => rule.pattern.test(textForClassification))
        .map((rule) => rule.id),
      stakeholderGroups: stakeholderRules
        .filter((rule) => rule.pattern.test(textForClassification))
        .map((rule) => rule.id),
      publicOrganizationSources: actorNames.filter((name) =>
        publicOrganizationActors.has(name),
      ),
      publicUrls,
      withheldUrlCount,
      note:
        publisher.publisherAttribution === "jamie-burkart"
          ? "Manager-only interface attribution displayed 'Published by Jamie Burkart' during the July 15, 2026 review."
          : "Publisher attribution was not recovered; no other publisher was displayed.",
    };
  });

if (censusRecords.length !== capture.control.uniqueRecordCount) {
  throw new Error(
    `Capture control expected ${capture.control.uniqueRecordCount} records, found ${censusRecords.length}`,
  );
}

if (publisherAudit.records.length !== censusRecords.length) {
  throw new Error(
    `Publisher audit expected ${censusRecords.length} records, found ${publisherAudit.records.length}`,
  );
}

const countBy = (values) =>
  Object.fromEntries(
    [...new Set(values)]
      .sort()
      .map((value) => [value, values.filter((item) => item === value).length]),
  );

const recordsByYear = countBy(
  censusRecords.map((record) => record.publishedAt.slice(0, 4)),
);
const relationshipCounts = countBy(
  censusRecords.map((record) => record.relationship),
);
const missionThemeCounts = countBy(
  censusRecords.flatMap((record) => record.missionThemes),
);
const stakeholderGroupCounts = countBy(
  censusRecords.flatMap((record) => record.stakeholderGroups),
);
const publicUrls = censusRecords.flatMap((record) => record.publicUrls);
const distinctPublicUrls = unique(publicUrls);
const internalWowListUrls = distinctPublicUrls.filter(
  (url) => new URL(url).hostname === "wowlist.org",
);
const externalPublicUrls = distinctPublicUrls.filter(
  (url) => new URL(url).hostname !== "wowlist.org",
);
const pageMessageRecords = censusRecords.filter((record) =>
  ["page-authored-commentary", "page-commentary-with-shared-source"].includes(
    record.relationship,
  ),
);
const sharedSourceRecords = censusRecords.filter((record) =>
  ["shared-source-only", "page-commentary-with-shared-source"].includes(
    record.relationship,
  ),
);

const output = {
  schemaVersion: 1,
  generatedAt: "2026-07-15",
  project: "WOW List",
  surface: "Facebook page posts",
  platform: "facebook",
  corpusId: "wowlist-facebook-owner-posts-2026-07-15",
  publicSafety: {
    status: "public-safe-project-account-census",
    included:
      "All 57 recovered project-post identities, dates, public post routes, content-relationship classifications, manager-attribution dispositions, mission and stakeholder-group labels, selected organization source names, and public posted URLs.",
    excluded:
      "Raw post bodies, comments, commenter identities, reactions, phone numbers, email addresses, ordinary individual source-account names, private Google document routes, account IDs, administration details, local paths, cookies, and authenticated-session state.",
    rawCaptureLocation: "protected pointer outside the public repository",
    reason:
      "The public ledger proves full-population review and supports source-backed professional claims without republishing conversation, contact, or account-administration data.",
  },
  populationReconciliation: {
    protectedCapturePageCount: capture.control.pageCount,
    protectedCaptureTerminal: capture.control.terminal,
    protectedCaptureUniqueRecordCount: capture.control.uniqueRecordCount,
    publicCensusRecordCount: censusRecords.length,
    recordsReviewedPercent: 100,
    firstPublishedAt: censusRecords[0].publishedAt,
    lastPublishedAt: censusRecords.at(-1).publishedAt,
    recordsByYear,
    protectedRecordSetSha256: protectedDigest(capture.records),
    boundary:
      "This is complete disposition of the 57 posts recovered through a terminal 19-page owner-post capture. It is not a native Meta owner export and cannot establish that no older post was deleted, withheld, or omitted before capture.",
  },
  livePublisherAudit: {
    reviewedRecordCount: publisherAudit.records.length,
    availablePostCount: publisherAudit.records.filter(
      (record) => record.liveDisposition !== "unavailable",
    ).length,
    unavailablePostCount: publisherAudit.records.filter(
      (record) => record.liveDisposition === "unavailable",
    ).length,
    jamieAttributedPostCount: publisherAudit.records.filter(
      (record) => record.publisherAttribution === "jamie-burkart",
    ).length,
    otherPublisherAttributedPostCount: publisherAudit.records.filter(
      (record) => record.publisherAttribution === "other-publisher",
    ).length,
    attributionNotRecoveredCount: publisherAudit.records.filter(
      (record) => record.publisherAttribution === "not-recovered",
    ).length,
    protectedAuditSetSha256: protectedDigest(publisherAudit.records),
    evidence:
      "Facebook's manager-only post detail interface displayed 'Published by Jamie Burkart' on 51 records. No reviewed record displayed another publisher. Three unavailable post wrappers and three video redirects did not yield publisher attribution.",
    boundary:
      "Manager attribution is strong evidence of Facebook publishing responsibility across this recovered corpus. It does not establish sole ownership of WOW List, authorship of every attached source statement, or management of every social platform and cannot resolve the six unattributed records.",
  },
  publishingPattern: {
    relationshipCounts,
    recordsWithPageAuthoredCommentary: pageMessageRecords.length,
    recordsWithAttachedSharedSource: sharedSourceRecords.length,
    recordsWithoutMessageText:
      relationshipCounts["media-or-link-without-message"] ?? 0,
    missionThemeCounts,
    stakeholderGroupCounts,
    recurringFunctions: [
      "onboard contributors into a shared event-publishing workflow",
      "circulate independent events, tours, and community calendars",
      "connect organizers to peer knowledge, tools, and public resources",
      "support DIY cultural spaces through fundraising and continuity moments",
      "carry mutual-aid, safety, and solidarity information during crises",
      "extend cultural-space infrastructure into civic and policy advocacy",
    ],
    boundary:
      "The classifications describe what the account published or redistributed. They do not assign authorship of attached source material, establish reciprocal endorsement, measure audience conversion, or prove outcomes caused by a post.",
  },
  postedUrlInventory: {
    recordsWithPublicUrls: censusRecords.filter(
      (record) => record.publicUrls.length > 0,
    ).length,
    publicUrlOccurrences: publicUrls.length,
    distinctNormalizedPublicUrls: distinctPublicUrls.length,
    distinctWowListRouteUrls: internalWowListUrls.length,
    distinctExternalPublicUrls: externalPublicUrls.length,
    withheldRouteOccurrences: censusRecords.reduce(
      (total, record) => total + record.withheldUrlCount,
      0,
    ),
    publicUrls: distinctPublicUrls.sort(),
    boundary:
      "A posted URL establishes account publication or redistribution, not authorship, endorsement, readership, participation, or impact. One Google document route remains withheld pending a separate public-safety review.",
  },
  engagementBoundary: {
    postLevelInteractionTotalsRecovered: false,
    managementSurfaceCoverage:
      "Meta Business Suite labeled its Lifetime content view as March 31, 2019 through July 14, 2026, after this 2015-2018 corpus, and displayed no activity in that later range.",
    boundary:
      "The later management-surface zero-state does not mean the 57 earlier posts did not exist. Neither the protected capture nor the complete live audit supplied a stable full-population reaction, comment, share, reach, or audience-identity dataset.",
  },
  records: censusRecords,
};

mkdirSync(dirname(resolve(outputPath)), { recursive: true });
writeFileSync(resolve(outputPath), `${JSON.stringify(output, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      records: censusRecords.length,
      recordsByYear,
      relationshipCounts,
      missionThemeCounts,
      stakeholderGroupCounts,
      publicUrlOccurrences: publicUrls.length,
      distinctNormalizedPublicUrls: distinctPublicUrls.length,
      distinctWowListRouteUrls: internalWowListUrls.length,
      distinctExternalPublicUrls: externalPublicUrls.length,
      withheldRouteOccurrences:
        output.postedUrlInventory.withheldRouteOccurrences,
      publisherAudit: output.livePublisherAudit,
    },
    null,
    2,
  ),
);
