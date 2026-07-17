import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [inputPath, censusPath, summaryPath] = process.argv.slice(2);

if (!inputPath || !censusPath || !summaryPath) {
  throw new Error(
    "Usage: node scripts/research/build-wowlist-x-census.mjs <capture.json> <census.csv> <summary.json>"
  );
}

const capture = JSON.parse(readFileSync(resolve(inputPath), "utf8"));
const rows = capture.population;

const themeByStatusId = {
  "433628764493606913": ["diy-scene-values", "cross-scene-learning"],
  "433671630837919744": ["project-origin", "sunday-dinner", "collaboration"],
  "587713396486856704": ["participant-contribution", "event-distribution"],
  "590942060829663232": ["peer-learning-network", "allied-media-conference"],
  "590961074326917122": ["event-distribution", "local-music-scene"],
  "591664757473673216": ["product-onboarding", "followable-communities"],
  "591666366215811073": ["product-onboarding", "profile-workflow"],
  "591668857670148096": ["product-onboarding", "contribution-workflow"],
  "591944013768499200": ["event-distribution", "arts-education"],
  "592424659225845760": ["mutual-aid", "community-solidarity"],
  "592718356018556928": ["event-distribution", "experimental-performance"],
  "592787353925726208": ["community-voice"],
  "592810776961916929": ["diy-documentation", "cross-scene-learning"],
  "596690796641923073": ["diy-documentation", "cross-scene-learning"],
  "596691623993581568": ["diy-documentation", "archive-practice"],
  "598530404669358080": ["event-distribution", "tour-coordination"],
  "603631189308604416": ["community-voice"],
  "604360847012413440": ["organizer-use", "event-contribution"],
  "606517628765650945": ["event-distribution", "performance-art"],
  "632168285291835392": ["participant-created-tutorial", "product-onboarding"],
  "663732869357965313": ["event-distribution", "experimental-music"],
  "665520472461860864": ["community-governance", "all-ages-events"],
  "749378122823245824": ["event-distribution", "collaborator-use"],
  "751150062458269696": ["movement-event-distribution", "racial-justice"],
  "771412862191407104": ["project-identity", "nyc-diy-network"],
  "771455571501416448": ["product-onboarding", "weekly-email"],
  "771457416298921985": ["sunday-dinner-origin", "community-calendar"],
  "783312785702805504": ["cultural-space-continuity"],
  "796473557387575297": ["movement-event-distribution", "anti-oppression"],
  "797181275308257282": ["artist-voice"],
  "798274424763981824": ["movement-event-distribution", "community-organizing"],
  "801883926029447168": ["indigenous-solidarity", "resource-sharing"],
  "805210387004223488": ["ghost-ship-solidarity", "mutual-aid"],
  "805949658405175296": ["ghost-ship-solidarity", "memorial-event-distribution"],
  "806517013472485376": ["ghost-ship-solidarity", "public-documentation"],
  "807395049814290433": ["cultural-space-safety", "public-action"],
  "815697993709993984": ["cultural-space-support", "diy-funding"],
  "819663088634851328": ["community-voice"]
};

const stakeholderByStatusId = {
  "433628764493606913": ["diy-arts-network"],
  "433671630837919744": ["project-collaborators", "sunday-dinner-community"],
  "587713396486856704": ["community-contributor", "organizing-education-network"],
  "590942060829663232": ["allied-media-network", "independent-publisher"],
  "590961074326917122": ["kansas-city-music-scene"],
  "591664757473673216": ["community-contributor"],
  "591666366215811073": ["community-contributor"],
  "591668857670148096": ["community-contributor"],
  "591944013768499200": ["project-collaborator", "arts-education"],
  "592424659225845760": ["diy-cultural-venue", "mutual-aid-public"],
  "592718356018556928": ["project-collaborator", "experimental-arts-network"],
  "592787353925726208": ["independent-artist"],
  "592810776961916929": ["diy-documentarian", "arts-writer"],
  "596690796641923073": ["diy-documentarian", "arts-writer"],
  "596691623993581568": ["arts-journalism", "diy-documentarian"],
  "598530404669358080": ["independent-artist", "touring-network"],
  "603631189308604416": ["public-art-organization"],
  "604360847012413440": ["independent-event-organizer"],
  "606517628765650945": ["performance-art-festival"],
  "632168285291835392": ["community-contributor", "external-tutorial-maker"],
  "663732869357965313": ["experimental-music-organizer"],
  "665520472461860864": ["all-ages-network", "community-members"],
  "749378122823245824": ["project-collaborator"],
  "751150062458269696": ["racial-justice-public"],
  "771412862191407104": ["nyc-diy-venue-network"],
  "771455571501416448": ["nyc-diy-media", "community-participant"],
  "771457416298921985": ["nyc-diy-media", "sunday-dinner-community"],
  "783312785702805504": ["diy-cultural-venue"],
  "796473557387575297": ["national-movement-public"],
  "797181275308257282": ["international-artist"],
  "798274424763981824": ["national-movement-public"],
  "801883926029447168": ["independent-music-network", "indigenous-solidarity-public"],
  "805210387004223488": ["ghost-ship-support-public"],
  "805949658405175296": ["project-collaborator", "oakland-arts-community"],
  "806517013472485376": ["public-media", "oakland-arts-community"],
  "807395049814290433": ["project-collaborator", "diy-space-advocacy"],
  "815697993709993984": ["arts-institution", "diy-space-support"],
  "819663088634851328": ["independent-music-public"]
};

const urlResearch = {
  "http://t.co/GgppxNburh": {
    resolvedTarget: "https://sundaydinnernyc.com/tagged/wowlist",
    disposition: "resolved-live"
  },
  "http://t.co/IS8uGw6zxb": {
    resolvedTarget: "http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    archiveUrl: "https://web.archive.org/web/20150201081214/http://grasstronaut.com/2015/01/29/homework-in-every-town/",
    disposition: "resolved-archived"
  },
  "http://t.co/cG6FgcGsgu": {
    resolvedTarget: "http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html",
    disposition: "resolved-archived"
  },
  "https://t.co/KZ7x2zPgtB": {
    resolvedTarget: "https://www.youtube.com/watch?v=nQg47LtixPI",
    disposition: "resolved-live"
  },
  "https://t.co/Q2vtL8JdOq": {
    resolvedTarget: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire",
    disposition: "resolved-live"
  },
  "https://t.co/0jKQMlauld": {
    resolvedTarget: "https://meowwolf.com/diy",
    archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/",
    disposition: "resolved-archived"
  },
  "https://t.co/t0grs2Do3H": {
    disposition: "preview-only"
  }
};

const normalizeDisplay = (value) =>
  value.replace(/\s+/g, "").replace(/…$/, "").trim();

const unique = (values) => [...new Set(values)];

const parseEngagement = (label) => ({
  replies: Number(label.match(/(\d+) repl(?:y|ies)/)?.[1] ?? 0),
  reposts: Number(label.match(/(\d+) reposts?/)?.[1] ?? 0),
  likes: Number(label.match(/(\d+) likes?/)?.[1] ?? 0)
});

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const relationshipFor = (row) => {
  if (row.author.toLowerCase() !== "wowlist") return "project-repost";
  return /Replying to/.test(row.text) ? "project-reply" : "project-post";
};

const urlInventory = [];
const censusRows = rows
  .slice()
  .sort((left, right) => left.datetime.localeCompare(right.datetime))
  .map((row, index) => {
    const linksByShortUrl = new Map();
    for (const link of row.links) {
      if (!/^https?:\/\/t\.co\//.test(link.href)) continue;
      const current = linksByShortUrl.get(link.href) ?? [];
      const displayed = normalizeDisplay(link.text);
      if (displayed) current.push(displayed);
      linksByShortUrl.set(link.href, current);
    }

    const postedUrls = [];
    for (const [shortUrl, displayedValues] of linksByShortUrl) {
      const displayedTarget = unique(displayedValues).join(" | ");
      const research = urlResearch[shortUrl] ?? {};
      const inventoryItem = {
        statusId: row.statusId,
        statusUrl: `https://x.com/${row.author}/status/${row.statusId}`,
        shortUrl,
        displayedTarget: displayedTarget || null,
        resolvedTarget: research.resolvedTarget ?? null,
        archiveUrl: research.archiveUrl ?? null,
        disposition:
          research.disposition ??
          (displayedTarget ? "displayed-target-recorded" : "unresolved-shortlink")
      };
      urlInventory.push(inventoryItem);
      postedUrls.push(
        [shortUrl, inventoryItem.resolvedTarget ?? displayedTarget, inventoryItem.archiveUrl]
          .filter(Boolean)
          .join(" -> ")
      );
    }

    const mentions = unique(row.tweetText.match(/@[A-Za-z0-9_]+/g) ?? []);
    const hashtags = unique(row.tweetText.match(/#[A-Za-z0-9_]+/g) ?? []);
    const engagement = parseEngagement(row.engagementLabel);
    const relationship = relationshipFor(row);

    return {
      population_slot: `RECOVERED-${String(index + 1).padStart(3, "0")}`,
      disposition: "recovered",
      status_url: `https://x.com/${row.author}/status/${row.statusId}`,
      status_id: row.statusId,
      published_at: row.datetime,
      author_handle: row.author,
      relationship,
      source_view: "posts-and-replies",
      posted_urls: postedUrls.join(" || "),
      mentions: mentions.join(" | "),
      hashtags: hashtags.join(" | "),
      mission_themes: (themeByStatusId[row.statusId] ?? []).join(" | "),
      stakeholder_groups: (stakeholderByStatusId[row.statusId] ?? []).join(" | "),
      access_time_replies: engagement.replies,
      access_time_reposts: engagement.reposts,
      access_time_likes: engagement.likes,
      note:
        relationship === "project-repost"
          ? "Source-post engagement is not project-account traction."
          : "Shared-account human authorship is not assigned."
    };
  });

const authoredRows = censusRows.filter((row) => row.author_handle.toLowerCase() === "wowlist");
const repostRows = censusRows.filter((row) => row.relationship === "project-repost");
const sum = (records, field) => records.reduce((total, row) => total + row[field], 0);

const externalMentionDispositions = {
  "845116237591920640": {
    disposition: "mission-relevant-external-use",
    note: "External event organizer shared a WOW List page for a Silent Barn benefit."
  },
  "834145172128677888": {
    disposition: "excluded-unrelated-handle-use",
    note: "Promotional post used the handle in an unrelated context; excluded from project evidence."
  },
  "771457416298921985": {
    disposition: "project-self-reference",
    note: "Already represented in the 38-object profile census."
  }
};

const externalMentionSearch = capture.mentionSearch.rows.map((row) => ({
  statusId: row.statusId,
  statusUrl: `https://x.com/${row.author}/status/${row.statusId}`,
  authorHandle: row.author,
  publishedAt: row.datetime,
  ...externalMentionDispositions[row.statusId]
}));

const summary = {
  reviewedAt: "2026-07-15",
  account: "@wowlist",
  method: "Authenticated Posts and Replies crawl reconciled to the profile-displayed population; public mention search reviewed separately.",
  population: {
    profileCount: capture.profileCount,
    recoveredCount: censusRows.length,
    projectPosts: censusRows.filter((row) => row.relationship === "project-post").length,
    projectReplies: censusRows.filter((row) => row.relationship === "project-reply").length,
    projectAuthoredTotal: authoredRows.length,
    repostedExternalStatuses: repostRows.length,
    uniqueRepostSourceAccounts: new Set(repostRows.map((row) => row.author_handle.toLowerCase())).size,
    firstPublishedAt: censusRows[0].published_at,
    lastPublishedAt: censusRows.at(-1).published_at
  },
  urlInventory: {
    urlBearingStatuses: censusRows.filter((row) => row.posted_urls).length,
    projectAuthoredUrlBearingStatuses: authoredRows.filter((row) => row.posted_urls).length,
    uniqueShortUrls: new Set(urlInventory.map((item) => item.shortUrl)).size,
    items: urlInventory
  },
  accessTimeProjectAuthoredEngagement: {
    observedAt: "2026-07-15",
    statusesWithAnyObservedInteraction: authoredRows.filter(
      (row) => row.access_time_replies + row.access_time_reposts + row.access_time_likes > 0
    ).length,
    replies: sum(authoredRows, "access_time_replies"),
    reposts: sum(authoredRows, "access_time_reposts"),
    likes: sum(authoredRows, "access_time_likes"),
    boundary: "These are mutable access-time labels on the 22 project-authored statuses. Metrics on the 16 reposted source statuses are excluded because they are not project-account traction."
  },
  missionPatterns: [
    {
      pattern: "participatory product operation",
      statusIds: ["591664757473673216", "591666366215811073", "591668857670148096", "632168285291835392", "665520472461860864", "771455571501416448"],
      finding: "The account taught people how to follow lists, use profile views, add events to multiple lists, join, and receive a weekly email; an external participant also published a product tutorial."
    },
    {
      pattern: "event and movement circulation",
      statusIds: ["590961074326917122", "598530404669358080", "606517628765650945", "751150062458269696", "796473557387575297", "798274424763981824", "805949658405175296"],
      finding: "WOW List pages circulated shows, festivals, tours, demonstrations, meetings, and memorial gatherings across several local and national contexts."
    },
    {
      pattern: "documentation and cross-scene learning",
      statusIds: ["592810776961916929", "596690796641923073", "596691623993581568", "590942060829663232"],
      finding: "The account linked DIY documentation, operational manuals, arts journalism, and Allied Media Conference participation as part of a cross-scene learning practice."
    },
    {
      pattern: "care and cultural-space safety",
      statusIds: ["592424659225845760", "805210387004223488", "805949658405175296", "806517013472485376", "807395049814290433", "815697993709993984"],
      finding: "After loss and crisis, the account circulated mutual aid, vigils, public-action resources, reporting, and institutional support for safer DIY cultural spaces."
    }
  ],
  keyStakeholderSignals: [
    {
      group: "community contributors",
      finding: "The record contains direct onboarding exchanges, a participant-created tutorial, and a public post reporting that an organizer was adding shows."
    },
    {
      group: "DIY venues and arts organizations",
      finding: "The curated record includes Silent Barn, FOKL, Meow Wolf, + POOL, performance and music organizers, and all-ages networks; a repost is evidence of account curation, not reciprocal endorsement."
    },
    {
      group: "media and peer-learning networks",
      finding: "Posts linked Good Times, Grasstronaut, KQED, Allied Media Conference, and a participant's YouTube tutorial."
    }
  ],
  sourceArticles: [
    {
      statusId: "592810776961916929",
      title: "HOMEWORK: In Every Town - An All-Ages Music Manualfesto",
      author: "Elise Granata",
      archiveUrl: "https://web.archive.org/web/20150201081214/http://grasstronaut.com/2015/01/29/homework-in-every-town/"
    },
    {
      statusId: "596691623993581568",
      title: "Zines 2.0: How DIY culture - and the way we document it - is evolving",
      author: "Elise Granata",
      archiveUrl: "https://web.archive.org/web/20150907001335/http://www.gtweekly.com/index.php/santa-cruz-news/good-times-cover-stories/6548-zines-20.html"
    },
    {
      statusId: "806517013472485376",
      title: "VIDEO: Mourners Gather at Candlelight Vigil to Honor Victims of Oakland Fire",
      organization: "KQED",
      canonicalUrl: "https://www.kqed.org/news/11207317/video-mourners-gather-at-candlelight-vigil-to-honor-victims-of-oakland-fire"
    },
    {
      statusId: "815697993709993984",
      title: "Meow Wolf DIY Fund",
      organization: "Meow Wolf",
      archiveUrl: "https://web.archive.org/web/20170312084829/https://meowwolf.com/DIY/"
    }
  ],
  externalMentionSearch,
  boundaries: [
    "The corpus does not identify the human author of any shared-account status.",
    "Reposts document the account's public curation; they do not prove endorsement, partnership, or reciprocal engagement by the source account.",
    "Three external usage specimens do not establish broad adoption or lifetime reach.",
    "No follower identities, private account data, deleted-post claims, or private messages are included.",
    "The public artifacts store status identifiers and derived metadata rather than republishing full tweet bodies."
  ]
};

const header = Object.keys(censusRows[0]);
const csv = [
  header.join(","),
  ...censusRows.map((row) => header.map((key) => csvEscape(row[key])).join(","))
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
    uniqueShortUrls: summary.urlInventory.uniqueShortUrls
  })
);
