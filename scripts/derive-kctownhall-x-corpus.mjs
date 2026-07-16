import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultRawPath =
  "docs/knowledge-bank/corpora/source-captures/kctownhall-x-browser-extraction-2026-07-15-utc.json";
const defaultCorpusPath =
  "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.json";
const defaultManifestPath =
  "docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json";

const missionPatternSpecs = [
  {
    id: "tired-of-tires-public-operations",
    summary:
      "Authored posts repeatedly documented and coordinated the Tired of Tires neighborhood tire-pickup program.",
    pattern:
      /#TiredOfTires|tire pickup|tires on (?:the )?curb|dropped off \d+ tires/i
  },
  {
    id: "survey-and-listening",
    summary:
      "Authored posts invited survey responses, public input, or neighborhood listening around project and program decisions.",
    pattern: /\/survey|survey|what do you think|input/i
  },
  {
    id: "building-history-and-reuse",
    summary:
      "Authored posts preserved building history and described the adaptive-reuse and neighborhood-resource purpose.",
    pattern:
      /historic|1940|Crown Drug|Barnett|temporary electricity|building|cultural center|neighborhood resource/i
  },
  {
    id: "leons-grocery-access",
    summary:
      "Two authored posts connected Leon's Thriftway to neighborhood grocery access.",
    pattern: /Leon['’]s|grocery|supermarket/i
  },
  {
    id: "covid-relief",
    summary:
      "One authored post linked a KC Town Hall video assembling public COVID-19 relief and safety resources.",
    pattern: /COVID|Stay Safe Resources|pandemic/i
  },
  {
    id: "voting-and-elections",
    summary:
      "Authored posts linked public voting information and election participation resources.",
    pattern: /vote|voter|election|ballot|polling place/i
  },
  {
    id: "affordable-housing-policy",
    summary:
      "Authored posts linked or discussed Kansas City affordable-housing policy context.",
    pattern: /affordable housing|rent relief|Housing Committee|healthy homes/i
  },
  {
    id: "neighborhood-service-response",
    summary:
      "Authored posts documented reports and follow-up involving dumped material, cleanup, water, tires, or city service response.",
    pattern:
      /KCMO311|KCMOwater|dumped|trash|cleanup|clean up|improve community conditions/i
  },
  {
    id: "black-lives-matter-city-hall-documentation",
    summary:
      "Twelve authored posts form a dated public documentation series from a Black Lives Matter protest at Kansas City Hall.",
    pattern: /#BlackLivesMatter[\s\S]*#KCMO[\s\S]*#Protest/i
  }
];

const sourceLeads = [
  {
    id: "ridekc-transit-initiatives",
    postedByStatusId: "1016684231433564160",
    title: "RideKC transit initiatives",
    canonicalUrl: "https://ridekc.org/kcata/transit-initiatives/",
    disposition: "live-context",
    note:
      "The post used a RideKC destination for regional transit and ozone-day context. The page is field context, not evidence KC Town Hall operated transit service."
  },
  {
    id: "kcur-missouri-primary-guide",
    postedByStatusId: "1026922856091987968",
    title: "A Cheat Sheet For Tuesday's Primary Election In Missouri",
    canonicalUrl:
      "https://www.kcur.org/politics-elections-and-government/2018-08-05/a-cheat-sheet-for-tuesdays-primary-election-in-missouri",
    disposition: "live-and-close-read",
    note:
      "KCUR's August 5, 2018 guide contextualizes the account's voter-information post; it does not establish voter reach or turnout caused by the account."
  },
  {
    id: "missouri-voter-lookup",
    postedByStatusId: "1026922856091987968",
    title: "Missouri voter registration lookup",
    canonicalUrl: "https://voteroutreach.sos.mo.gov/portal",
    disposition: "live-official-resource",
    note:
      "The official Missouri Secretary of State destination corroborates the practical voter-resource context."
  },
  {
    id: "northeast-news-affordable-housing",
    postedByStatusId: "1043549999550877697",
    title: "Affordable housing policy hits docket at KCMO",
    canonicalUrl:
      "https://northeastnews.net/pages/affordable-housing-policy-hits-docket-kcmo/",
    disposition: "live-and-close-read",
    note:
      "The September 19, 2018 article describes seven housing proposals before the Council Housing Committee. It supports policy context, not KC Town Hall causation."
  },
  {
    id: "kc-star-leons-thriftway",
    postedByStatusId: "1122859036163170304",
    title:
      "Leon's Thriftway may be the oldest black-owned grocery store in the country",
    canonicalUrl:
      "https://www.kansascity.com/news/business/article87241897.html",
    disposition: "posted-url-page-not-recovered",
    note:
      "The title and destination are preserved from the account post, but the article body was not recovered in this pass."
  },
  {
    id: "kctownhall-latex-paint-video",
    postedByStatusId: "1035215055024009216",
    title: "4 TONS of DUMPED LATEX PAINT - SOLUTION",
    canonicalUrl: "https://www.youtube.com/watch?v=PmLjLyOpS9I",
    disposition: "live-metadata",
    note:
      "YouTube public metadata identifies KC Town Hall as the channel author. The title is an account-level claim; it is not independent tonnage corroboration."
  },
  {
    id: "kctownhall-covid-relief-video",
    postedByStatusId: "1252344939867824132",
    title: "#COVID19 Relief: Stay Safe Resources",
    canonicalUrl: "https://www.youtube.com/watch?v=onCKU-TuPhc",
    disposition: "live-metadata",
    note:
      "YouTube public metadata identifies KC Town Hall as the channel author and preserves the public-resource title."
  },
  {
    id: "church-ac-theft-gofundme",
    postedByStatusId: "1159153322236026881",
    title: "Church air-conditioner theft fundraiser",
    canonicalUrl: "https://www.gofundme.com/f/church-ac-theft",
    disposition: "posted-url-now-dead",
    note:
      "The posted destination now returns not found. It remains a lead and is not used to assert funds raised or beneficiary outcomes."
  },
  {
    id: "kctownhall-facebook-event",
    postedByStatusId: "1102627427992375296",
    title: "KC Town Hall Facebook event 299606100678115",
    canonicalUrl: "https://www.facebook.com/events/299606100678115/",
    disposition: "posted-url-not-close-read",
    note:
      "The public destination is retained as a source lead; no event details are promoted without a recoverable page body."
  },
  {
    id: "kctownhall-facebook-video",
    postedByStatusId: "1126284471894933504",
    title: "KC Town Hall Facebook video 2135596040064768",
    canonicalUrl:
      "https://www.facebook.com/KCTownHall/videos/2135596040064768",
    disposition: "posted-url-not-close-read",
    note:
      "The public destination is retained as a source lead; no video content is promoted without a recoverable public record."
  },
  {
    id: "curbed-rent-relief",
    postedByStatusId: "1020798115367047171",
    title: "Rent relief is becoming a popular solution to housing shortages",
    canonicalUrl:
      "https://archive.curbed.com/2018/7/20/17595698/rent-relief-act-tax-credit-kamala-harris",
    disposition: "reposted-url-now-dead",
    note:
      "The URL appeared in a repost, not an authored KC Town Hall post. It is field context and not KC Town Hall authorship or policy work."
  }
];

const archivedSitePages = [
  {
    id: "root-2018",
    canonicalUrl: "http://kctownhall.com/",
    archiveUrl:
      "https://web.archive.org/web/20180803002431/http://kctownhall.com/",
    disposition: "recovered-and-close-read",
    note:
      "The earliest recovered root page states the historic-neighborhood-resource purpose."
  },
  {
    id: "join-2019",
    canonicalUrl: "http://kctownhall.com/join/",
    archiveUrl:
      "https://web.archive.org/web/20190813025929/http://kctownhall.com/join/",
    disposition: "recovered-and-close-read",
    note:
      "The recovered join page invited people to follow and participate in building a neighborhood resource and cultural center."
  },
  {
    id: "tires-2020",
    canonicalUrl: "http://kctownhall.com/tires/",
    archiveUrl:
      "https://web.archive.org/web/20201030223311/http://kctownhall.com/tires/",
    disposition: "recovered-and-close-read",
    note:
      "The page identifies Julia and Jamie as its authors and KC Town Hall with Oak Park Neighborhood Association as program partners. Its savings figure remains a project self-report."
  },
  {
    id: "root-cards-2020",
    canonicalUrl: "http://kctownhall.com/",
    archiveUrl:
      "https://web.archive.org/web/20201106221214/http://kctownhall.com/",
    disposition: "recovered-index-context",
    note:
      "Root-page cards preserve public evidence for survey, lowercase covid19, and temporary-electricity routes whose page bodies were not directly recovered in this pass."
  }
];

function unique(values) {
  return [...new Set(values)];
}

function statusId(url) {
  return url.match(/\/status\/(\d+)/)?.[1];
}

function parseEngagement(label) {
  const count = (pattern) => Number(label.match(pattern)?.[1] ?? 0);
  return {
    replies: count(/(\d+) repl(?:y|ies)/i),
    reposts: count(/(\d+) reposts?/i),
    likes: count(/(\d+) likes?/i),
    bookmarks: count(/(\d+) bookmarks?/i)
  };
}

function isTopLevelReply(text) {
  return /^KC Town Hall\n@KCTownHall\n·\n[^\n]+\nReplying to\b/.test(text);
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function deriveKcTownHallCorpusItems(rawCapture) {
  const resolutions = new Map(
    rawCapture.shortUrlResolutions.map((item) => [
      item.shortUrl,
      item.resolvedUrl
    ])
  );
  const postedShortUrls = rawCapture.items.flatMap((item) =>
    unique(
      item.links
        .map((link) => link.href)
        .filter((href) => /^https?:\/\/t\.co\//.test(href))
    )
  );
  const resolvedShortUrls = rawCapture.shortUrlResolutions.map(
    (item) => item.shortUrl
  );

  assert.equal(new Set(resolvedShortUrls).size, resolvedShortUrls.length);
  assert.deepEqual(new Set(resolvedShortUrls), new Set(postedShortUrls));
  for (const { resolvedUrl } of rawCapture.shortUrlResolutions) {
    assert.match(resolvedUrl, /^https?:\/\//);
  }

  const items = [...rawCapture.items]
    .sort((left, right) => left.datetime.localeCompare(right.datetime))
    .map((item, index) => {
      const type = item.text.startsWith("KC Town Hall reposted\n")
        ? "reposted"
        : "authored";
      const outgoingShortUrls = unique(
        item.links
          .map((link) => link.href)
          .filter((href) => /^https?:\/\/t\.co\//.test(href))
      );

      return {
        index: index + 1,
        canonicalUrl: new URL(item.statusUrl, "https://x.com").toString(),
        publishedAt: item.datetime,
        type,
        isTopLevelReply:
          type === "authored" && isTopLevelReply(item.text),
        visibleText: item.text,
        engagement: parseEngagement(item.engagementLabel),
        engagementLabel: item.engagementLabel,
        mentions: unique(
          item.links
            .map((link) => link.text)
            .filter(
              (text) =>
                /^@[A-Za-z0-9_]+$/.test(text) &&
                text.toLowerCase() !== "@kctownhall"
            )
        ),
        outgoingLinks: outgoingShortUrls.map((shortUrl) => ({
          shortUrl,
          displayedDestination:
            item.links.find((link) => link.href === shortUrl)?.text ?? "",
          resolvedDestination: resolutions.get(shortUrl)
        })),
        hasVisibleMedia: item.hasVisibleMedia
      };
    });

  assert.equal(
    new Set(items.map((item) => statusId(item.canonicalUrl))).size,
    items.length
  );
  return items;
}

function hostname(link) {
  return new URL(link.resolvedDestination)
    .hostname.toLowerCase()
    .replace(/^www\./, "");
}

export function deriveKcTownHallCorpusMetrics(corpus) {
  const authored = corpus.items.filter((item) => item.type === "authored");
  const reposted = corpus.items.filter((item) => item.type === "reposted");
  const authoredLinks = authored.flatMap((item) => item.outgoingLinks);
  const allLinks = corpus.items.flatMap((item) => item.outgoingLinks);
  const engagementTotals = authored.reduce(
    (totals, item) => ({
      replies: totals.replies + item.engagement.replies,
      reposts: totals.reposts + item.engagement.reposts,
      likes: totals.likes + item.engagement.likes,
      bookmarks: totals.bookmarks + item.engagement.bookmarks
    }),
    { replies: 0, reposts: 0, likes: 0, bookmarks: 0 }
  );
  const councilHandles = unique(
    corpus.supplementalContexts
      .filter((item) => item.relationship.includes("council-member"))
      .map((item) => new URL(item.canonicalUrl).pathname.split("/")[1])
  );

  return {
    profileReported: corpus.population.profileReported,
    renderedDistinct: corpus.items.length,
    authored: authored.length,
    reposted: reposted.length,
    authoredReplies: authored.filter((item) => item.isTopLevelReply).length,
    unresolvedCountDifference:
      corpus.population.profileReported - corpus.items.length,
    supplementalPublicContexts: corpus.supplementalContexts.length,
    councilMemberAccountsWithVisibleIncomingEngagement: councilHandles.length,
    cityServiceAccountReplies: corpus.supplementalContexts.filter(
      (item) => item.relationship === "city-service-account-reply-in-thread"
    ).length,
    authoredPostsWithOutgoingLinks: authored.filter(
      (item) => item.outgoingLinks.length > 0
    ).length,
    allOutgoingLinkOccurrences: allLinks.length,
    authoredOutgoingLinkOccurrences: authoredLinks.length,
    authoredKcTownHallLinkOccurrences: authoredLinks.filter(
      (link) => hostname(link) === "kctownhall.com"
    ).length,
    authoredExternalLinkOccurrences: authoredLinks.filter(
      (link) => hostname(link) !== "kctownhall.com"
    ).length,
    authoredPostsWithVisibleMedia: authored.filter(
      (item) => item.hasVisibleMedia
    ).length,
    authoredPostsWithVisibleEngagement: authored.filter((item) =>
      Object.values(item.engagement).some((value) => value > 0)
    ).length,
    authoredEngagementTotals: engagementTotals,
    missionPatternCounts: Object.fromEntries(
      corpus.missionPatterns.map((pattern) => [
        pattern.id,
        pattern.statusIds.length
      ])
    )
  };
}

function normalizeContext(item) {
  return {
    canonicalUrl: new URL(item.statusUrl, "https://x.com").toString(),
    publishedAt: item.datetime,
    relationship: item.relationship,
    visibleText: item.text,
    engagement: parseEngagement(item.engagementLabel),
    relatedAuthoredCanonicalUrls: item.relatedAuthoredStatusUrls.map((url) =>
      new URL(url, "https://x.com").toString()
    )
  };
}

export function buildKcTownHallCorpus(rawCaptureText) {
  const rawCapture = JSON.parse(rawCaptureText);
  const items = deriveKcTownHallCorpusItems(rawCapture);
  const authored = items.filter((item) => item.type === "authored");
  const years = {};
  for (const item of items) {
    const year = item.publishedAt.slice(0, 4);
    years[year] ??= { authored: 0, reposted: 0, total: 0 };
    years[year][item.type] += 1;
    years[year].total += 1;
  }
  const missionPatterns = missionPatternSpecs.map(({ pattern, ...spec }) => ({
    ...spec,
    statusIds: authored
      .filter((item) => pattern.test(item.visibleText))
      .map((item) => statusId(item.canonicalUrl))
  }));
  const corpus = {
    schemaVersion: 1,
    account: "@KCTownHall",
    capturedAt: rawCapture.capturedAt,
    capturedThrough:
      "Authenticated X replies-inclusive profile traversal, posts-only cross-check, and authored-search cross-check",
    authenticatedSessionIdentity: rawCapture.authenticatedAs,
    rawCaptureSha256: sha256(rawCaptureText),
    rawCaptureArtifact:
      "source-captures/kctownhall-x-browser-extraction-2026-07-15-utc.json",
    derivationManifest:
      "kctownhall-x-full-population-2026-07-15.manifest.json",
    derivationScript: "scripts/derive-kctownhall-x-corpus.mjs",
    population: {
      profileReported: rawCapture.profileReportedPosts,
      renderedDistinct: items.length,
      authored: authored.length,
      reposted: items.length - authored.length,
      unresolvedCountDifference:
        rawCapture.profileReportedPosts - items.length,
      range: [items[0].publishedAt, items.at(-1).publishedAt],
      byYear: years
    },
    boundaries: [
      "The profile reported 183 posts. Repeated replies-inclusive traversal, posts-only cross-checking, and authored searches recovered 181 distinct account-timeline status IDs; two items remain unrecovered.",
      "The pass accounts for the full reported population by preserving all 181 recovered items and an explicit two-item gap. It does not claim to have recovered inaccessible or deleted items.",
      "Seven separately rendered public conversation records are preserved as context and excluded from the 183-post denominator.",
      "Authored posts and reposts are separate. Repost engagement belongs to the original post and is not treated as KC Town Hall traction.",
      "Visible interaction labels are dated observations and may omit deleted, hidden, private, or platform-suppressed activity.",
      "Posts to Council and agency handles are outbound communication, not stakeholder engagement. Only visible replies or quote-posts in preserved contexts support the lower-bound incoming-engagement claim.",
      "This is a collective project-account record. It does not identify Jamie or any collaborator as the author of every post or assign later project operations to Jamie.",
      "Public contact numbers were redacted; no private messages, settings, analytics, credentials, follower exports, or session data were captured."
    ],
    missionPatterns,
    sourceLeads,
    archivedSitePages,
    supplementalContexts: rawCapture.supplementalThreads.map(normalizeContext),
    items
  };
  const metrics = deriveKcTownHallCorpusMetrics(corpus);
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
  const knownIds = new Set(items.map((item) => statusId(item.canonicalUrl)));
  for (const pattern of missionPatterns) {
    for (const id of pattern.statusIds) assert(knownIds.has(id));
  }
  for (const lead of sourceLeads) assert(knownIds.has(lead.postedByStatusId));
  assert.equal(archivedSitePages.length, 4);
  for (const context of corpus.supplementalContexts) {
    assert(!knownIds.has(statusId(context.canonicalUrl)));
    for (const url of context.relatedAuthoredCanonicalUrls) {
      assert(knownIds.has(statusId(url)));
    }
  }
  return corpus;
}

export function buildKcTownHallManifest(
  rawPath,
  rawCaptureText,
  corpusPath,
  corpusText,
  corpus
) {
  return {
    schemaVersion: 1,
    generatedAt: corpus.capturedAt,
    generator: "scripts/derive-kctownhall-x-corpus.mjs --write",
    sourceCapture: rawPath,
    sourceCaptureSha256: sha256(rawCaptureText),
    corpus: corpusPath,
    corpusSha256: sha256(corpusText),
    profileReportedPosts: corpus.population.profileReported,
    corpusItems: corpus.items.length,
    unrecoveredItems: corpus.population.unresolvedCountDifference,
    supplementalPublicContexts: corpus.supplementalContexts.length,
    status: "profile-population-accounted-for-with-two-item-gap"
  };
}

export function validateKcTownHallCorpus(
  rawCaptureText,
  corpusText,
  manifest,
  rawPath = defaultRawPath,
  corpusPath = defaultCorpusPath
) {
  const corpus = JSON.parse(corpusText);
  assert.equal(sha256(rawCaptureText), corpus.rawCaptureSha256);
  assert.deepEqual(buildKcTownHallCorpus(rawCaptureText), corpus);
  assert.deepEqual(
    manifest,
    buildKcTownHallManifest(
      rawPath,
      rawCaptureText,
      corpusPath,
      corpusText,
      corpus
    )
  );
  return deriveKcTownHallCorpusMetrics(corpus);
}

function writeArtifacts(rawPath, corpusPath, manifestPath) {
  const rawCaptureText = readFileSync(rawPath, "utf8");
  const corpus = buildKcTownHallCorpus(rawCaptureText);
  const corpusText = `${JSON.stringify(corpus, null, 2)}\n`;
  const manifest = buildKcTownHallManifest(
    rawPath,
    rawCaptureText,
    corpusPath,
    corpusText,
    corpus
  );
  writeFileSync(corpusPath, corpusText);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return deriveKcTownHallCorpusMetrics(corpus);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const paths = process.argv.filter((value) => value !== "--write").slice(2);
  const rawPath = paths[0] ?? defaultRawPath;
  const corpusPath = paths[1] ?? defaultCorpusPath;
  const manifestPath = paths[2] ?? defaultManifestPath;
  const metrics = write
    ? writeArtifacts(rawPath, corpusPath, manifestPath)
    : validateKcTownHallCorpus(
        readFileSync(rawPath, "utf8"),
        readFileSync(corpusPath, "utf8"),
        JSON.parse(readFileSync(manifestPath, "utf8")),
        rawPath,
        corpusPath
      );
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}
