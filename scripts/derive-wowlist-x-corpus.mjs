import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultRawPath =
  "docs/knowledge-bank/corpora/source-captures/wowlist-x-browser-extraction-2026-07-15-utc.json";
const defaultCorpusPath =
  "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.json";
const defaultManifestPath =
  "docs/knowledge-bank/corpora/wowlist-x-full-population-2026-07-15.manifest.json";

const missionPatterns = [
  {
    id: "collective-origin-and-deployment-lineage",
    summary:
      "Posts connect WOW List to Sunday Dinner calendars, name Jamie and Richard as builders, and describe NYCdiy as a deployment of the shared platform.",
    statusIds: ["433671630837919744", "771457416298921985"]
  },
  {
    id: "product-support-and-workflow-feedback",
    summary:
      "Three public support threads preserve questions about location scope, finding personal lists, and reducing clicks in the add-event workflow.",
    statusIds: [
      "591664757473673216",
      "591666366215811073",
      "591668857670148096"
    ]
  },
  {
    id: "organizer-use-and-community-distribution",
    summary:
      "Organizer and collaborator posts show people publishing shows, linking WOW List event pages, and tagging the project account with local cultural activity.",
    statusIds: [
      "604360847012413440",
      "663732869357965313",
      "749378122823245824"
    ]
  },
  {
    id: "civic-and-mutual-aid-use",
    summary:
      "The project account combined direct calendar links with authored curation and reposted amplification of demonstrations, vigils, fundraisers, and mutual-aid resources.",
    statusIds: [
      "592424659225845760",
      "751150062458269696",
      "796473557387575297",
      "798274424763981824",
      "801883926029447168",
      "805210387004223488",
      "806517013472485376",
      "807395049814290433"
    ],
    composition: {
      directCalendarStatusIds: [
        "751150062458269696",
        "796473557387575297"
      ],
      authoredExternalCurationStatusIds: [
        "798274424763981824",
        "805210387004223488",
        "806517013472485376"
      ],
      repostedExternalAmplificationStatusIds: [
        "592424659225845760",
        "801883926029447168",
        "807395049814290433"
      ]
    }
  },
  {
    id: "field-learning-and-peer-infrastructure",
    summary:
      "Posts linked a grassroots venue manual, a member-made tutorial, Allied Media Conference, peer DIY funding infrastructure, and an unrecovered article the account described as concerning DIY documentation.",
    statusIds: [
      "590942060829663232",
      "592810776961916929",
      "596691623993581568",
      "632168285291835392",
      "815697993709993984"
    ]
  }
];

const sourceLeads = [
  {
    id: "grasstronaut-manualfesto",
    postedByStatusId: "592810776961916929",
    title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
    canonicalUrl:
      "https://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl:
      "https://web.archive.org/web/20150406041311/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    disposition: "archived-and-close-read",
    note:
      "Elise Granata's article reviews a practical guide to starting all-ages venues, including organization, promotion, production, space, fundraising, community building, and conflict resolution. It is field context, not evidence Jamie authored the guide or article."
  },
  {
    id: "good-times-zines-2",
    postedByStatusId: "596691623993581568",
    title: "Zines 2.0",
    canonicalUrl:
      "https://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    disposition: "posted-url-page-not-recovered",
    note:
      "The account described the article as being about documenting and connecting DIY. The page itself was not recovered in this pass, so that account description is not promoted into an independent-source claim."
  },
  {
    id: "shelby-wowlist-tutorial",
    postedByStatusId: "632168285291835392",
    title: "SHELBY'S WOWLIST TUTORIAL",
    canonicalUrl: "https://www.youtube.com/watch?v=nQg47LtixPI",
    disposition: "posted-url-live-metadata",
    note:
      "The public post presents this as a member-made tutorial and links the WOW List join flow. The video is contextual evidence of user-created onboarding, not a complete adoption measure."
  },
  {
    id: "allied-media-conference-2015",
    postedByStatusId: "590942060829663232",
    title: "Allied Media Conference",
    canonicalUrl: "https://alliedmedia.org/amc",
    archiveUrl:
      "https://web.archive.org/web/20150619210442/https://www.alliedmedia.org/amc",
    disposition: "archived-context",
    note:
      "The account announced that WOW List would be at the June 18-21, 2015 conference. The post supports public participation; it does not establish session title, presenter role, or attendance totals."
  },
  {
    id: "popular-vote",
    postedByStatusId: "798274424763981824",
    title: "popular.vote",
    canonicalUrl: "https://popular.vote/",
    archiveUrl:
      "https://web.archive.org/web/20161211233030/http://popular.vote/",
    disposition: "archived-context",
    note:
      "The account described the destination as a place to add and receive updates on marches, meetings, and local connection after the 2016 election. It documents a civic reuse pattern, not measured participation."
  },
  {
    id: "meow-wolf-diy-fund",
    postedByStatusId: "815697993709993984",
    title: "Meow Wolf DIY Fund",
    canonicalUrl: "https://www.meowwolf.com/diy",
    archiveUrl:
      "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    disposition: "archived-context",
    note:
      "The repost situated WOW List within a peer ecosystem supporting DIY arts and music spaces. It is not evidence Jamie created or administered the Meow Wolf fund."
  },
  {
    id: "kqed-ghost-ship-vigil",
    postedByStatusId: "806517013472485376",
    title: "Hundreds Mourn the Victims of the Ghost Ship Fire in Oakland",
    canonicalUrl: "https://www.youtube.com/watch?v=g7zIdDeRVjU",
    disposition: "posted-url-live-metadata",
    note:
      "The account paired the KQED video with vigil and relief links. This supports a care-and-mutual-aid use pattern, not authorship of the reporting or relief campaign."
  }
];

function parseEngagement(label) {
  const count = (pattern) => Number(label.match(pattern)?.[1] ?? 0);

  return {
    replies: count(/(\d+) repl(?:y|ies)/i),
    reposts: count(/(\d+) reposts?/i),
    likes: count(/(\d+) likes?/i)
  };
}

function unique(values) {
  return [...new Set(values)];
}

function statusId(url) {
  return url.match(/\/status\/(\d+)/)?.[1];
}

function isTopLevelReply(text) {
  return /^WOW List!\n@wowlist\n·\n[^\n]+\nReplying to\b/.test(text);
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function deriveCorpusItems(rawCapture) {
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
  assert.deepEqual(
    new Set(resolvedShortUrls),
    new Set(postedShortUrls)
  );
  for (const { resolvedUrl } of rawCapture.shortUrlResolutions) {
    assert.match(resolvedUrl, /^https?:\/\//);
  }

  return [...rawCapture.items]
    .sort((left, right) => left.datetime.localeCompare(right.datetime))
    .map((item, index) => {
      const type = item.text.startsWith("WOW List! reposted\n")
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
            .filter((text) => text.startsWith("@"))
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
}

export function deriveWowListCorpusMetrics(corpus) {
  const authored = corpus.items.filter((item) => item.type === "authored");
  const reposted = corpus.items.filter((item) => item.type === "reposted");
  const authoredLinks = authored.flatMap((item) => item.outgoingLinks);
  const allLinks = corpus.items.flatMap((item) => item.outgoingLinks);
  const hostname = (link) =>
    new URL(link.resolvedDestination).hostname.toLowerCase().replace(/^www\./, "");
  const engagedAuthored = authored.filter((item) =>
    Object.values(item.engagement).some((value) => value > 0)
  );
  const engagementTotals = authored.reduce(
    (totals, item) => ({
      replies: totals.replies + item.engagement.replies,
      reposts: totals.reposts + item.engagement.reposts,
      likes: totals.likes + item.engagement.likes
    }),
    { replies: 0, reposts: 0, likes: 0 }
  );

  return {
    profileReported: corpus.population.profileReported,
    renderedDistinct: corpus.items.length,
    authored: authored.length,
    reposted: reposted.length,
    authoredReplies: authored.filter((item) => item.isTopLevelReply).length,
    unresolvedCountDifference:
      corpus.population.profileReported - corpus.items.length,
    authoredPostsWithOutgoingLinks: authored.filter(
      (item) => item.outgoingLinks.length > 0
    ).length,
    allOutgoingLinkOccurrences: allLinks.length,
    authoredOutgoingLinkOccurrences: authoredLinks.length,
    authoredWowListLinkOccurrences: authoredLinks.filter(
      (link) => hostname(link) === "wowlist.org"
    ).length,
    authoredNycDiyLinkOccurrences: authoredLinks.filter(
      (link) => hostname(link) === "nycdiy.org"
    ).length,
    authoredExternalLinkOccurrences: authoredLinks.filter(
      (link) => !["wowlist.org", "nycdiy.org"].includes(hostname(link))
    ).length,
    recoveredPublicSupportThreads: corpus.supplementalThreads.filter(
      (thread) => thread.parentStatusUrl
    ).length,
    authoredPostsWithVisibleEngagement: engagedAuthored.length,
    authoredEngagementTotals: engagementTotals
  };
}

export function buildCorpus(rawCaptureText) {
  const rawCapture = JSON.parse(rawCaptureText);
  const items = deriveCorpusItems(rawCapture);
  const years = {};
  for (const item of items) {
    const year = item.publishedAt.slice(0, 4);
    years[year] = (years[year] ?? 0) + 1;
  }

  const corpus = {
    schemaVersion: 1,
    account: "@wowlist",
    capturedAt: rawCapture.capturedAt,
    capturedThrough: "Authenticated X replies-inclusive profile timeline",
    authenticatedSessionIdentity: rawCapture.authenticatedAs,
    rawCaptureSha256: sha256(rawCaptureText),
    rawCaptureArtifact:
      "source-captures/wowlist-x-browser-extraction-2026-07-15-utc.json",
    derivationManifest:
      "wowlist-x-full-population-2026-07-15.manifest.json",
    derivationScript: "scripts/derive-wowlist-x-corpus.mjs",
    population: {
      profileReported: rawCapture.profileReportedPosts,
      renderedDistinct: items.length,
      authored: items.filter((item) => item.type === "authored").length,
      reposted: items.filter((item) => item.type === "reposted").length,
      unresolvedCountDifference:
        rawCapture.profileReportedPosts - items.length,
      range: [items[0].publishedAt, items.at(-1).publishedAt],
      byYear: years
    },
    boundaries: [
      "The profile reported 38 posts and the replies-inclusive timeline rendered 38 distinct canonical status IDs after repeated bottom-of-timeline passes.",
      "The corpus therefore accounts for 100% of the profile-reported population recoverable on the capture date; this does not recover deleted parent posts or non-public activity.",
      "Authored posts and reposted material are separate. Repost engagement belongs to the original post and is not treated as WOW List traction.",
      "Visible engagement labels are dated observations and may omit deleted, hidden, private, or platform-suppressed activity.",
      "Project-account output does not by itself identify Jamie or any collaborator as author of every post."
    ],
    missionPatterns,
    sourceLeads,
    supplementalThreads: rawCapture.supplementalThreads.map((thread) => ({
      ...thread,
      authoredCanonicalUrl: new URL(
        thread.authoredStatusUrl,
        "https://x.com"
      ).toString(),
      parentCanonicalUrl: thread.parentStatusUrl
        ? new URL(thread.parentStatusUrl, "https://x.com").toString()
        : null
    })),
    items
  };

  const metrics = deriveWowListCorpusMetrics(corpus);
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

  const knownIds = new Set(items.map((item) => statusId(item.canonicalUrl)));
  for (const pattern of missionPatterns) {
    for (const id of pattern.statusIds) assert(knownIds.has(id));
  }
  const itemById = new Map(
    items.map((item) => [statusId(item.canonicalUrl), item])
  );
  const civicPattern = missionPatterns.find(
    (pattern) => pattern.id === "civic-and-mutual-aid-use"
  );
  const civicComposition = civicPattern.composition;
  assert.deepEqual(
    new Set([
      ...civicComposition.directCalendarStatusIds,
      ...civicComposition.authoredExternalCurationStatusIds,
      ...civicComposition.repostedExternalAmplificationStatusIds
    ]),
    new Set(civicPattern.statusIds)
  );
  for (const id of civicComposition.directCalendarStatusIds) {
    const item = itemById.get(id);
    assert.equal(item.type, "authored");
    assert(item.outgoingLinks.some((link) =>
      new URL(link.resolvedDestination).hostname.endsWith("wowlist.org")
    ));
  }
  for (const id of civicComposition.authoredExternalCurationStatusIds) {
    const item = itemById.get(id);
    assert.equal(item.type, "authored");
    assert(item.outgoingLinks.every((link) =>
      !new URL(link.resolvedDestination).hostname.endsWith("wowlist.org")
    ));
  }
  for (const id of civicComposition.repostedExternalAmplificationStatusIds) {
    const item = itemById.get(id);
    assert.equal(item.type, "reposted");
    assert(item.outgoingLinks.every((link) =>
      !new URL(link.resolvedDestination).hostname.endsWith("wowlist.org")
    ));
  }
  for (const lead of sourceLeads) assert(knownIds.has(lead.postedByStatusId));

  return corpus;
}

export function buildManifest(
  rawPath,
  rawCaptureText,
  corpusPath,
  corpusText,
  corpus
) {
  return {
    schemaVersion: 1,
    generatedAt: "2026-07-15T00:58:32-04:00",
    generator: "scripts/derive-wowlist-x-corpus.mjs --write",
    sourceCapture: rawPath,
    sourceCaptureSha256: sha256(rawCaptureText),
    corpus: corpusPath,
    corpusSha256: sha256(corpusText),
    profileReportedPosts: corpus.population.profileReported,
    corpusItems: corpus.items.length,
    status: "complete-profile-reported-population"
  };
}

export function validateCommittedCorpus(
  rawCaptureText,
  corpusText,
  manifest,
  rawPath = defaultRawPath,
  corpusPath = defaultCorpusPath
) {
  const corpus = JSON.parse(corpusText);
  assert.equal(sha256(rawCaptureText), corpus.rawCaptureSha256);
  assert.deepEqual(buildCorpus(rawCaptureText), corpus);
  assert.deepEqual(
    manifest,
    buildManifest(rawPath, rawCaptureText, corpusPath, corpusText, corpus)
  );
  return deriveWowListCorpusMetrics(corpus);
}

function writeArtifacts(rawPath, corpusPath, manifestPath) {
  const rawCaptureText = readFileSync(rawPath, "utf8");
  const corpus = buildCorpus(rawCaptureText);
  const corpusText = `${JSON.stringify(corpus, null, 2)}\n`;
  const manifest = buildManifest(
    rawPath,
    rawCaptureText,
    corpusPath,
    corpusText,
    corpus
  );

  writeFileSync(corpusPath, corpusText);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return deriveWowListCorpusMetrics(corpus);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const paths = process.argv.filter((value) => value !== "--write").slice(2);
  const rawPath = paths[0] ?? defaultRawPath;
  const corpusPath = paths[1] ?? defaultCorpusPath;
  const manifestPath = paths[2] ?? defaultManifestPath;

  const metrics = write
    ? writeArtifacts(rawPath, corpusPath, manifestPath)
    : validateCommittedCorpus(
        readFileSync(rawPath, "utf8"),
        readFileSync(corpusPath, "utf8"),
        JSON.parse(readFileSync(manifestPath, "utf8")),
        rawPath,
        corpusPath
      );
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}
