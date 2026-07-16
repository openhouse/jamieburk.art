import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [inputPath, censusPath, summaryPath] = process.argv.slice(2);

if (!inputPath || !censusPath || !summaryPath) {
  throw new Error(
    "Usage: node scripts/research/build-nycartc-x-census.mjs <capture.json> <census.csv> <summary.json>"
  );
}

const capture = JSON.parse(readFileSync(resolve(inputPath), "utf8"));
const profileCount = capture.populationReconciliation.profileReportedPostCount;
const recovered = capture.records;
const unmaterializedCount = profileCount - recovered.length;

if (unmaterializedCount < 0) {
  throw new Error(
    `Recovered population exceeds profile counter: profile=${profileCount}, recovered=${recovered.length}`
  );
}

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const join = (values, separator = " | ") => (values ?? []).join(separator);

const sanitizeDestination = (value) => {
  if (!value) return value;

  try {
    const url = new URL(value);
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return value;
  }
};

const relationshipFor = (record) => {
  if (record.recordType === "repost") return "native-repost-source-status";
  if (record.recordType === "reply") return "coalition-account-reply";
  return "coalition-account-original";
};

const recoveredRows = recovered
  .slice()
  .sort((left, right) => {
    const dateOrder = left.sourcePublishedAt.localeCompare(right.sourcePublishedAt);
    return dateOrder || left.url.localeCompare(right.url);
  })
  .map((record, index) => ({
    population_slot: `RECOVERED-${String(index + 1).padStart(4, "0")}`,
    disposition: "recovered-public-interface",
    status_url: record.url,
    published_at: record.sourcePublishedAt,
    source_author_handle: record.authorHandle,
    relationship: relationshipFor(record),
    recovered_from: join(record.recoveredFrom),
    posted_urls: join(
      record.externalLinks.map(({ shortUrl, displayedDestination }) =>
        [shortUrl, sanitizeDestination(displayedDestination)]
          .filter(Boolean)
          .join(" -> ")
      ),
      " || "
    ),
    mentions: join(record.mentionHandles),
    hashtags: join(record.hashtags),
    mission_signals: join(record.missionSignals),
    mission_signal_evidence: join(
      record.missionSignalEvidence.map(
        ({ signalId, inputField, matchedValue }) =>
          `${signalId}:${inputField}:${matchedValue}`
      ),
      " || "
    ),
    classification_input_digest: record.classificationInputDigest,
    access_time_replies: record.visibleEngagement.replies,
    access_time_reposts: record.visibleEngagement.reposts,
    access_time_likes: record.visibleEngagement.likes,
    access_time_bookmarks: record.visibleEngagement.bookmarks,
    access_time_views: record.visibleEngagement.views,
    note:
      record.recordType === "repost"
        ? "The source-post date and engagement belong to the external source status; appearance here documents coalition-account curation, not reciprocal engagement."
        : "Shared-account human authorship is not assigned."
  }));

const unmaterializedRows = Array.from({ length: unmaterializedCount }, (_, index) => ({
  population_slot: `NOT-MATERIALIZED-${String(index + 1).padStart(4, "0")}`,
  disposition: "not-materialized-public-interface",
  status_url: "",
  published_at: "",
  source_author_handle: "",
  relationship: "unknown-profile-counted-slot",
  recovered_from: "",
  posted_urls: "",
  mentions: "",
  hashtags: "",
  mission_signals: "",
  mission_signal_evidence: "",
  classification_input_digest: "",
  access_time_replies: "",
  access_time_reposts: "",
  access_time_likes: "",
  access_time_bookmarks: "",
  access_time_views: "",
  note:
    "X's documented public display and indexing limits prevented this profile-counted slot from materializing. An owner X Archive is required for literal recovery."
}));

const censusRows = [...recoveredRows, ...unmaterializedRows];
const authoredRows = recoveredRows.filter(
  (row) => row.source_author_handle.toLowerCase() === "@nycartc"
);
const repostRows = recoveredRows.filter(
  (row) => row.relationship === "native-repost-source-status"
);
const authoredDates = authoredRows.map((row) => row.published_at).sort();
const sum = (rows, field) =>
  rows.reduce((total, row) => total + Number(row[field] || 0), 0);

const topSourceAuthors = capture.sourceAuthorNetwork.sourceAuthorCounts.slice(0, 30);
const representativeSources =
  capture.postedUrlInventory.representativeMissionRelevantSources.map(
    (source) => ({
      ...source,
      canonicalUrl:
        source.kind === "cabaret-law-repeal-reporting"
          ? "https://gothamist.com/arts-entertainment/city-council-set-to-repeal-cabaret-law-finally-legalize-dancing"
          : sanitizeDestination(source.canonicalUrl)
    })
  );

const summary = {
  reviewedAt: "2026-07-15",
  account: "@NYCArtC",
  method:
    "Authenticated Posts and Posts-and-replies crawls were exhausted and combined with yearly authored Latest searches. Every profile-counted slot receives a disposition; a bounded incoming-mention search and strict historical Council-member review remain separate stakeholder evidence.",
  publicSafety:
    "The public census stores status URLs, source dates and handles, relationship types, posted-link metadata, hashtags, bounded classifications, digests, and dated interface counts. It excludes full post bodies, cookies, account credentials, private messages, follower identities, and session state.",
  population: {
    profileReportedPostCount: profileCount,
    recoveredPublicInterfaceRecords: recoveredRows.length,
    recoveredPublicInterfacePercent: Number(
      ((recoveredRows.length / profileCount) * 100).toFixed(1)
    ),
    notMaterializedPublicInterfaceRecords: unmaterializedRows.length,
    dispositionLedgerRows: censusRows.length,
    dispositionCoveragePercent: 100,
    postsTimelineUniqueCount:
      capture.populationReconciliation.postsTimelineUniqueCount,
    postsAndRepliesTimelinePrimaryCount:
      capture.populationReconciliation.postsAndRepliesTimelinePrimaryCount,
    yearlyAuthoredSearchUnionCount:
      capture.populationReconciliation.yearlyAuthoredSearchUnionCount,
    recordTypeCounts: capture.recordTypeCounts,
    coalitionAuthoredSourceStatuses: authoredRows.length,
    externalSourceStatusesSurfacedThroughNativeReposts: repostRows.length,
    firstCoalitionAuthoredStatusAt: authoredDates[0],
    lastCoalitionAuthoredStatusAt: authoredDates.at(-1),
    platformBoundary:
      "X documents an 800-record Posts display limit, a 3,200-record Posts-and-replies display limit, and older-post indexing restrictions. X directs account owners to the X Archive for history beginning with the first post. The 2,001 unmaterialized slots are not described as deleted, absent, or nonexistent."
  },
  publishingPattern: {
    ...capture.publishingPattern,
    boundary:
      "Record type partitions unique source-status URLs. For native reposts, the visible date and engagement belong to the external source status and do not date or measure @NYCArtC's repost action. Two account-authored statuses also appeared as native self-reposts; source identity and timeline appearance remain separate axes."
  },
  urlInventory: {
    recordsWithExternalLinks:
      capture.postedUrlInventory.recordsWithExternalLinks,
    externalLinkOccurrences:
      capture.postedUrlInventory.externalLinkOccurrences,
    distinctExternalShortUrls:
      capture.postedUrlInventory.distinctExternalShortUrls,
    distinctLinks: capture.postedUrlInventory.distinctLinks.map((link) => ({
      ...link,
      displayedDestination: sanitizeDestination(link.displayedDestination)
    })),
    representativeMissionRelevantSources: representativeSources,
    boundary: capture.postedUrlInventory.boundary
  },
  hashtagInventory: capture.hashtagInventory,
  sourceAuthorNetwork: {
    distinctSourceAuthorCount:
      capture.sourceAuthorNetwork.sourceAuthorCounts.length,
    topSourceAuthors,
    boundary: capture.sourceAuthorNetwork.boundary
  },
  missionSignalClassification: capture.missionSignalClassification,
  visibleEngagementSnapshot: {
    ...capture.visibleEngagementSnapshot,
    recomputed: {
      coalitionAuthoredReplies: sum(authoredRows, "access_time_replies"),
      coalitionAuthoredReposts: sum(authoredRows, "access_time_reposts"),
      coalitionAuthoredLikes: sum(authoredRows, "access_time_likes"),
      coalitionAuthoredBookmarks: sum(authoredRows, "access_time_bookmarks"),
      coalitionAuthoredViews: sum(authoredRows, "access_time_views")
    }
  },
  stakeholderEngagement: {
    strictThenServingCouncilMemberResult: {
      accountCount: 5,
      directMentionOrReplyInteractionCount: 15,
      accounts: [
        "Rafael Espinal",
        "Stephen Levin",
        "Jimmy Van Bramer",
        "Mark Levine",
        "Justin Brannan"
      ],
      boundary:
        "This is the existing strict authenticated minimum from direct mentions and conversation-verified replies. It is not a complete historical total and does not establish endorsement, adoption, legislative authorship, or policy causality."
    },
    post2020IncomingMentionInventory:
      capture.post2020IncomingMentionInventory,
    sourceNetworkBoundary:
      "External source accounts surfaced through @NYCArtC native repost cards are part of the coalition account's curation record. Their appearance is not evidence that those accounts engaged with the coalition or Jamie."
  },
  sourceArticles: representativeSources,
  boundaries: [
    "The 5,124-row ledger is a complete disposition of the profile counter, not literal recovery of all 5,124 source records.",
    "Literal full recovery requires an owner X Archive; 2,001 slots did not materialize through the documented public retrieval surfaces.",
    "The corpus does not identify the human author of each shared-account status.",
    "Native reposts document account curation; they do not prove endorsement, partnership, reciprocal engagement, or authorization by the source account.",
    "Mission signals overlap and classify subject matter; they do not establish authorship, causality, participation, reach, or impact.",
    "Displayed interaction counts are mutable interface observations, not unique people or a complete historical audience.",
    "The strict Council result is a recoverable minimum and remains distinct from tags, repost-source appearances, and broad thread context.",
    "No follower identities, private account data, private messages, full post bodies, cookies, credentials, or session data are included."
  ]
};

if (censusRows.length !== profileCount) {
  throw new Error(
    `Disposition mismatch: profile=${profileCount}, rows=${censusRows.length}`
  );
}

if (authoredRows.length !== capture.publishingPattern.accountOriginalAndReplyRecordCount) {
  throw new Error(
    `Authored count mismatch: derived=${authoredRows.length}, expected=${capture.publishingPattern.accountOriginalAndReplyRecordCount}`
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
    profileCount,
    recovered: recoveredRows.length,
    notMaterialized: unmaterializedRows.length,
    dispositionRows: censusRows.length,
    coalitionAuthored: authoredRows.length,
    externalRepostSources: repostRows.length,
    distinctShortUrls: summary.urlInventory.distinctExternalShortUrls
  })
);
