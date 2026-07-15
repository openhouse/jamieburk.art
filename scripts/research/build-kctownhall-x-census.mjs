import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [inputPath, censusPath, summaryPath] = process.argv.slice(2);

if (!inputPath || !censusPath || !summaryPath) {
  throw new Error(
    "Usage: node scripts/research/build-kctownhall-x-census.mjs <capture.json> <census.csv> <summary.json>"
  );
}

const capture = JSON.parse(readFileSync(resolve(inputPath), "utf8"));

const parseVisibleEngagement = (label = "") => {
  const count = (pattern) => Number(label.match(pattern)?.[1] ?? 0);
  return {
    replies: count(/(\d+) repl(?:y|ies)/),
    reposts: count(/(\d+) reposts?/),
    likes: count(/(\d+) likes?/),
    bookmarks: count(/(\d+) bookmarks?/)
  };
};

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const unique = (values) => [...new Set(values)];

const relationshipFor = (record) => {
  if (record.recordType === "repost") return "project-repost";
  if (record.recordType === "reply") return "project-reply";
  return "project-post";
};

const classificationsFor = (record) => {
  const classifications = [];
  if (/tire/i.test(record.text)) classifications.push("tire-related");
  if (
    record.externalLinks.some((link) =>
      /survey/i.test(link.displayedDestination)
    )
  ) {
    classifications.push("survey-linked");
  }
  return classifications;
};

const censusRows = capture.records
  .slice()
  .sort((left, right) => left.publishedAt.localeCompare(right.publishedAt))
  .map((record, index) => {
    const engagement = parseVisibleEngagement(record.engagementLabel);
    const relationship = relationshipFor(record);
    const postedUrls = record.externalLinks.map(({ shortUrl, displayedDestination }) =>
      [shortUrl, displayedDestination].filter(Boolean).join(" -> ")
    );

    return {
      population_slot: `RECOVERED-${String(index + 1).padStart(3, "0")}`,
      disposition: "recovered",
      status_url: record.url,
      published_at: record.publishedAt,
      author_handle: record.authorHandle,
      relationship,
      source_view: record.recoveredFrom.join(" | "),
      posted_urls: postedUrls.join(" || "),
      mentions: unique(record.mentionHandles).join(" | "),
      hashtags: unique(record.hashtags).join(" | "),
      classifications: classificationsFor(record).join(" | "),
      access_time_replies: engagement.replies,
      access_time_reposts: engagement.reposts,
      access_time_likes: engagement.likes,
      access_time_bookmarks: engagement.bookmarks,
      note:
        relationship === "project-repost"
          ? "Source-post engagement is not project-account traction."
          : "Shared-account human authorship is not assigned."
    };
  });

const authoredRows = censusRows.filter(
  (row) => row.relationship !== "project-repost"
);
const repostRows = censusRows.filter(
  (row) => row.relationship === "project-repost"
);
const allPostedLinks = capture.records.flatMap((record) =>
  record.externalLinks.map(({ shortUrl, displayedDestination }) => ({
    shortUrl,
    displayedDestination
  }))
);
const authoredPostedLinks = capture.records
  .filter((record) => record.recordType !== "repost")
  .flatMap((record) => record.externalLinks);
const distinctLinkMap = new Map(
  allPostedLinks.map((link) => [link.shortUrl, link])
);
const sum = (rows, field) =>
  rows.reduce((total, row) => total + row[field], 0);

const recordsByYear = Object.fromEntries(
  unique(censusRows.map((row) => row.published_at.slice(0, 4)))
    .sort()
    .map((year) => [
      year,
      censusRows.filter((row) => row.published_at.startsWith(year)).length
    ])
);

const curatedMissionRelevantSources = [
  {
    kind: "neighborhood-food-access-reporting",
    title:
      "Leon's Thriftway may be the oldest black-owned grocery store in the country",
    organization: "The Kansas City Star",
    canonicalUrl:
      "https://www.kansascity.com/news/business/article87241897.html",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1122859036163170304"
  },
  {
    kind: "local-affordable-housing-reporting",
    title: "Affordable Housing Policy hits the docket in KCMO",
    organization: "Northeast News",
    publishedAt: "2018-09-19",
    archiveUrl:
      "https://web.archive.org/web/20180920120704/http://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1043549999550877697"
  },
  {
    kind: "national-housing-policy-reporting",
    title: "Tax credit for renters proposed by U.S. Senator Kamala Harris",
    organization: "Curbed",
    author: "Alissa Walker",
    publishedAt: "2018-07-20",
    archiveUrl:
      "https://web.archive.org/web/20180720221744/https://www.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    sharedFromStatusUrl:
      "https://x.com/QuintonLucasKC/status/1020798115367047171"
  },
  {
    kind: "public-transit-planning",
    title: "RideKC Next System Redesign",
    organization: "Kansas City Area Transportation Authority",
    archiveUrl:
      "https://web.archive.org/web/20190821135819/https://ridekc.org/planning/ridekc-next",
    sharedFromStatusUrl:
      "https://x.com/RideKCTransit/status/1154729332755050496"
  },
  {
    kind: "election-information",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    organization: "KCUR",
    author: "Erica Hunzinger",
    publishedAt: "2018-08-05",
    canonicalUrl:
      "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1026922856091987968"
  },
  {
    kind: "official-voter-information",
    title: "Missouri voter outreach search",
    organization: "Missouri Secretary of State",
    canonicalUrl:
      "https://voteroutreach.sos.mo.gov/PRD/VoterOutreach/VOSearch.aspx",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1026922856091987968"
  },
  {
    kind: "public-health-and-transit-information",
    title: "Ozone Alert",
    organization: "Kansas City Area Transportation Authority",
    canonicalUrl: "http://kcata.org/about_kcata/entries/ozone_alert/",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1016684231433564160"
  },
  {
    kind: "community-covid-resource-video",
    title: "COVID-19 relief resource Q&A",
    organization: "KC Town Hall",
    canonicalUrl: "https://youtu.be/onCKU-TuPhc",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1252344939867824132"
  },
  {
    kind: "site-cleanup-documentation",
    title: "Bad latex paint cleanup video and tool list",
    organization: "KC Town Hall",
    canonicalUrl: "https://youtu.be/PmLjLyOpS9I",
    sharedFromStatusUrl:
      "https://x.com/KCTownHall/status/1035215055024009216"
  }
];

const councilMemberResponses = [
  {
    handle: "@QuintonLucasKC",
    responseStatusUrl:
      "https://x.com/QuintonLucasKC/status/1122866432130334720",
    publishedAt: "2019-04-29T14:13:13.926Z",
    relationship: "direct quote-response to a KC Town Hall Leon's alert",
    serviceDateEvidence:
      "https://www.kansascity.com/news/politics-government/election/article228683379.html"
  },
  {
    handle: "@joliejustus",
    responseStatusUrl:
      "https://x.com/joliejustus/status/1122883010582466560",
    publishedAt: "2019-04-29T15:19:06.537Z",
    relationship: "direct reply to KC Town Hall about Leon's and EDC work",
    serviceDateEvidence:
      "https://www.kansascity.com/news/politics-government/election/article228683379.html"
  },
  {
    handle: "@Robinson4kc",
    responseStatusUrl:
      "https://x.com/Robinson4kc/status/1289714535251742726",
    publishedAt: "2020-08-02T00:08:01.598Z",
    relationship:
      "direct reply thanking KC Town Hall for work improving community conditions",
    serviceDateEvidence:
      "https://clerk.kcmo.gov/PersonDetail.aspx?GUID=1696D403-A114-4AB0-B632-A303AF8E3B3C&ID=240616"
  }
];

const otherMissionRelevantResponses = [
  {
    statusUrl: "https://x.com/trutheresme/status/1148277187583389703",
    publishedAt: "2019-07-08T17:06:30.135Z",
    authorHandle: "@trutheresme",
    classification: "environmental-dropoff-collaborator-corroboration",
    relationship:
      "reported a large KC Town Hall tire drop-off received by Bridging the Gap"
  },
  {
    statusUrl: "https://x.com/JJones816/status/1182369340034707457",
    publishedAt: "2019-10-10T18:56:32.000Z",
    authorHandle: "@JJones816",
    classification: "community-amplification",
    relationship: "quote-amplified an Oak Park free dumpster day notice"
  },
  {
    statusUrl: "https://x.com/trutheresme/status/1182349413722836992",
    publishedAt: "2019-10-10T17:37:21.000Z",
    authorHandle: "@trutheresme",
    classification: "community-amplification",
    relationship: "quote-amplified an Oak Park free dumpster day notice"
  },
  {
    statusUrl: "https://x.com/KCMO311/status/1034093516073459712",
    publishedAt: "2018-08-27T15:01:21.000Z",
    authorHandle: "@KCMO311",
    classification: "city-service-response",
    relationship: "responded in a service-resolution thread"
  }
];

const authoredWithInteraction = authoredRows.filter(
  (row) =>
    row.access_time_replies +
      row.access_time_reposts +
      row.access_time_likes +
      row.access_time_bookmarks >
    0
);

const summary = {
  reviewedAt: "2026-07-15",
  account: "@KCTownHall",
  method:
    "Authenticated Posts and Replies crawls were exhausted, reconciled to the profile-displayed population, and supplemented by bounded public stakeholder searches.",
  publicSafety:
    "Public status URLs, dates, author handles, relationship types, posted-link metadata, classifications, and dated aggregate counts only; post text, phone numbers, cookies, private account state, and session data are excluded.",
  population: {
    profileCount: capture.profileReportedPostCount,
    postsTimelinePrimaryRecords: capture.postsPrimaryRecordCount,
    repliesTimelineRenderedCards: capture.repliesRenderedArticleCount,
    repliesTimelineConversationContexts: capture.repliesConversationContextCount,
    repliesTimelinePrimaryRecords: capture.repliesPrimaryRecordCount,
    recoveredUnionCount: censusRows.length,
    reviewedPercent: 100,
    unrecoveredCount: 0,
    projectPosts: censusRows.filter(
      (row) => row.relationship === "project-post"
    ).length,
    projectReplies: censusRows.filter(
      (row) => row.relationship === "project-reply"
    ).length,
    projectAuthoredTotal: authoredRows.length,
    repostedExternalStatuses: repostRows.length,
    firstPublishedAt: censusRows[0].published_at,
    lastPublishedAt: censusRows.at(-1).published_at,
    recordsByYear,
    reconciliation:
      "Posts yielded 170 primary records. Replies rendered 188 cards: 183 primary @KCTownHall records plus five parent or conversation-context records from other accounts. Excluding those five contexts produces a 183-record union that exactly matches the profile counter."
  },
  publishingPattern: {
    tireRelatedRecords: censusRows.filter((row) =>
      row.classifications.includes("tire-related")
    ).length,
    surveyLinkedRecords: censusRows.filter((row) =>
      row.classifications.includes("survey-linked")
    ).length,
    accountAuthoredRecordsWithExternalLinks: authoredRows.filter(
      (row) => row.posted_urls
    ).length,
    accountAuthoredExternalLinkOccurrences: authoredPostedLinks.length,
    accountAuthoredDistinctExternalShortUrls: new Set(
      authoredPostedLinks.map((link) => link.shortUrl)
    ).size,
    recurringFunctions: [
      "neighborhood-resource identity and project updates",
      "resident survey and neighborhood-process invitations",
      "free tire-pickup intake and operating updates",
      "cleanup and community-resource distribution",
      "voting, transit, housing, health, and civic-information circulation",
      "public stakeholder dialogue and response"
    ],
    classificationMethod: {
      tireRelated:
        "Assigned when close reading of the public post found the case-insensitive string 'tire' in its visible text or hashtag, including #TiredOfTires.",
      surveyLinked:
        "Assigned mechanically when a preserved external-link destination contains the case-insensitive string 'survey'."
    }
  },
  urlInventory: {
    recordsWithExternalLinks: censusRows.filter((row) => row.posted_urls).length,
    externalLinkOccurrences: allPostedLinks.length,
    distinctExternalShortUrls: distinctLinkMap.size,
    distinctLinks: [...distinctLinkMap.values()].sort((left, right) =>
      left.shortUrl.localeCompare(right.shortUrl)
    ),
    curatedMissionRelevantSources
  },
  stakeholderResponses: {
    boundedSearchQueries: [
      "@KCTownHall -from:KCTownHall",
      "to:KCTownHall -from:KCTownHall",
      "url:kctownhall.com -from:KCTownHall",
      "\"KC Town Hall\" -from:KCTownHall since:2018-01-01 until:2023-01-01"
    ],
    directCouncilMemberAccountCount: councilMemberResponses.length,
    councilMemberResponses,
    otherMissionRelevantResponses,
    boundary:
      "Direct replies, quote-responses, and explicit collaborator reports are observable stakeholder responses. Tags and mentions alone are not engagement. The bounded searches do not recover likes, private activity, deleted or unindexed records; unrelated broad-name search results were excluded."
  },
  accessTimeProjectAuthoredEngagement: {
    observedAt: "2026-07-14",
    statusesWithAnyObservedInteraction: authoredWithInteraction.length,
    replies: sum(authoredRows, "access_time_replies"),
    reposts: sum(authoredRows, "access_time_reposts"),
    likes: sum(authoredRows, "access_time_likes"),
    bookmarks: sum(authoredRows, "access_time_bookmarks"),
    visibleInteractionUnits:
      sum(authoredRows, "access_time_replies") +
      sum(authoredRows, "access_time_reposts") +
      sum(authoredRows, "access_time_likes") +
      sum(authoredRows, "access_time_bookmarks"),
    boundary:
      "These are mutable interface observations, not unique people, reach, conversion, endorsement, participation, or impact. Counts attached to reposted source records are excluded from the project-authored totals."
  },
  conversationContextRecords: capture.conversationContextRecords.map(
    (record) => ({
      statusUrl: record.url,
      publishedAt: record.publishedAt,
      authorHandle: record.authorHandle,
      relationship: "conversation-context",
      classification:
        record.authorHandle === "@Robinson4kc"
          ? "mission-relevant-council-response"
          : record.authorHandle === "@KCMO311" ||
              record.authorHandle === "@joliejustus"
            ? "mission-relevant-city-response"
            : "incidental-context"
    })
  ),
  boundaries: [
    "The corpus does not identify the human author of each shared-account status.",
    "Reposts document account curation; they do not prove endorsement, partnership, or reciprocal engagement by the source account.",
    "The census does not independently verify first-party quantities or outcomes stated in individual posts.",
    "Access-time interaction labels are mutable and do not identify a complete historical audience.",
    "No follower identities, private account data, deleted-post claims, private messages, full tweet bodies, or phone numbers are included."
  ]
};

if (summary.population.profileCount !== censusRows.length) {
  throw new Error(
    `Population mismatch: profile=${summary.population.profileCount}, recovered=${censusRows.length}`
  );
}

const header = Object.keys(censusRows[0]);
const csv = [
  header.join(","),
  ...censusRows.map((row) =>
    header.map((key) => csvEscape(row[key])).join(",")
  )
].join("\n");

mkdirSync(dirname(resolve(censusPath)), { recursive: true });
mkdirSync(dirname(resolve(summaryPath)), { recursive: true });
writeFileSync(resolve(censusPath), `${csv}\n`);
writeFileSync(resolve(summaryPath), `${JSON.stringify(summary, null, 2)}\n`);

console.log(
  JSON.stringify({
    recovered: censusRows.length,
    projectAuthored: authoredRows.length,
    reposted: repostRows.length,
    distinctExternalShortUrls: summary.urlInventory.distinctExternalShortUrls,
    directCouncilMemberResponses:
      summary.stakeholderResponses.directCouncilMemberAccountCount
  })
);
