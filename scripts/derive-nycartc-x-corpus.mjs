import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const defaultRawPath =
  "docs/knowledge-bank/corpora/source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json";
const defaultCorpusPath =
  "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.json";
const defaultManifestPath =
  "docs/knowledge-bank/corpora/nycartc-x-full-population-2026-07-15.manifest.json";
const expectedRawCaptureSha256 =
  "2bf746950a65d12f7e3a8c701bb53f6e18cb17407638cbfc254f97b35c619fd3";

const publicEmailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const publicPhonePattern =
  /(?:\+?1[ .-]+)?(?:\(\d{3}\)[ .-]*|\d{3}[ .-]+)\d{3}[ .-]+\d{4}/g;
const trackingParameterName =
  "utm_[a-z0-9_]+|fbclid|gclid|dclid|msclkid|mc_cid|mc_eid|emci|emdi|ceid|can_id|email_referrer|email_subject|link_id";
const trackingParameterPattern = new RegExp(
  `([?&])(${trackingParameterName})=(?:\\[tracking value redacted\\]|[^&\\s]+)`,
  "gi"
);
const unredactedTrackingParameterPattern = new RegExp(
  `[?&](?:${trackingParameterName})=(?!\\[tracking value redacted\\])[^&\\s]+`,
  "i"
);
const prohibitedFieldFragments = [
  "accountsettings",
  "authenticatedsession",
  "authenticationmaterial",
  "authenticationsecret",
  "browserstorage",
  "cookie",
  "credential",
  "directmessage",
  "followerexport",
  "localstorage",
  "password",
  "privateanalytics",
  "privatefollower",
  "privatemessage",
  "refreshtoken",
  "sessionidentifier",
  "sessionstorage"
];

const campaignMarkers = [
  {
    id: "fair-rent-nyc",
    hashtag: "#fairrentnyc",
    summary:
      "Commercial-rent-stabilization communication and public action under the Fair Rent NYC identity."
  },
  {
    id: "save-nyc-spaces",
    hashtag: "#savenycspaces",
    summary:
      "Pandemic-era public communication supporting independent cultural spaces."
  },
  {
    id: "let-nyc-dance",
    hashtag: "#letnycdance",
    summary:
      "Cabaret Law repeal and legal-dance communication under the Let NYC Dance identity."
  },
  {
    id: "talks-not-raids",
    hashtag: "#talksnotraids",
    summary:
      "Nightlife-enforcement transparency and venue-protection communication under the Talks Not Raids identity."
  }
];

const sourceLeads = [
  {
    id: "gothamist-cabaret-repeal-momentum",
    postedByStatusId: "847929146198155264",
    title: "Movement For Repealing NYC's Archaic 'No Dancing' Law Gains Momentum",
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/movement-for-repealing-nycs-archaic-no-dancing-law-gains-momentum",
    disposition: "live-and-previously-close-read",
    note:
      "Contemporaneous reporting on Cabaret Law repeal organizing. The article supports campaign context, not sole causation or authorship of the coalition account."
  },
  {
    id: "amny-office-of-nightlife",
    postedByStatusId: "902986997001748480",
    title: "Nightlife bill creating advisory board to be passed by City Council",
    canonicalUrl:
      "https://www.amny.com/news/nightlife-bill-creating-advisory-board-to-be-passed-by-city-council-rafael-espinal-says-1.14085854/",
    disposition: "live-source-lead",
    note:
      "Contemporaneous Office of Nightlife policy context circulated by the account."
  },
  {
    id: "new-york-times-night-mayor",
    postedByStatusId: "903000239078084608",
    title: "New York Has a Nightlife Mayor. Other Cities Want One, Too.",
    canonicalUrl:
      "https://www.nytimes.com/2017/08/30/arts/new-york-night-mayor-europe.html",
    disposition: "live-source-lead",
    note:
      "National and comparative context for the Office of Nightlife discussion circulated by the account."
  },
  {
    id: "new-york-times-cabaret-repeal",
    postedByStatusId: "924953677173002241",
    title: "After 91 Years, New York Will Let Its People Boogie",
    canonicalUrl:
      "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    disposition: "live-source-lead",
    note:
      "Contemporaneous reporting on the Council's impending Cabaret Law repeal vote."
  },
  {
    id: "gothamist-march-transparency",
    postedByStatusId: "1095440554920427520",
    title:
      "Lawmakers Demand Transparency On Surprise Multi-Agency Raids On Local Bars And Clubs",
    canonicalUrl:
      "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs",
    disposition: "live-and-previously-close-read",
    note:
      "Reporting on disparate impacts and Council transparency efforts associated with the Talks Not Raids campaign."
  },
  {
    id: "daily-news-nightlife-office-resourcing",
    postedByStatusId: "1167479169510494214",
    title:
      "Mayor's Office of Nightlife drastically underfunded and understaffed, pol says",
    canonicalUrl:
      "https://www.nydailynews.com/2019/08/28/mayors-office-of-nightlife-drastically-underfunded-and-understaffed-pol-says/",
    disposition: "live-metadata-body-blocked",
    note:
      "The destination and headline are preserved from the account and live search metadata. The article body was blocked in this pass, so its details are not promoted as independent assertions."
  },
  {
    id: "daily-news-fair-rent-rally",
    postedByStatusId: "1195736519950114816",
    title:
      "Pols, small biz owners rally for law limiting rent hikes on NYC's beleaguered mom-and-pop shops",
    canonicalUrl:
      "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/",
    disposition: "live-metadata-body-blocked",
    note:
      "The destination and headline are preserved; article-body claims remain held pending a recoverable copy."
  },
  {
    id: "city-limits-commercial-rent-covid",
    postedByStatusId: "1247345933714677762",
    title: "City's Small Businesses Need Rent Stabilization to Survive COVID-19, Advocates Say",
    canonicalUrl:
      "https://citylimits.org/citys-small-businesses-need-rent-stabilization-to-survive-covid-19-advocates-say/",
    disposition: "live-and-close-read",
    note:
      "City Limits documents United for Small Business NYC's commercial-rent-stabilization argument during the first pandemic shutdown. It is coalition context, not proof of policy causation."
  },
  {
    id: "gothamist-repeal-50a",
    postedByStatusId: "1270521289409789952",
    title: "New York State Legislature Votes To Repeal Law That Shields Police From Scrutiny",
    canonicalUrl:
      "https://gothamist.com/news/new-york-state-legislature-votes-repeal-law-50-shields-police-scrunity",
    disposition: "live-and-close-read",
    note:
      "Reporting establishes the legislative action circulated by the account; the account's claimed relationship to MARCH transparency remains a project interpretation."
  },
  {
    id: "american-theatre-lark-closure",
    postedByStatusId: "1445735610807988224",
    title: "The Lark Is Grounded: New-Play Incubator to Fold After 27 Years",
    canonicalUrl:
      "https://www.americantheatre.org/2021/10/05/the-lark-is-grounded-new-play-incubator-to-fold-after-25-years/",
    disposition: "live-and-close-read",
    note:
      "American Theatre reported that a proposed rent increase was one factor in the Lark's closure. The account used the article to connect a concrete cultural loss to Fair Rent NYC advocacy."
  },
  {
    id: "hell-gate-recurring-nightlife-raids",
    postedByStatusId: "1667318348571463680",
    title: "Who Is Leading the Raids on NYC Nightclubs?",
    canonicalUrl:
      "https://hellgatenyc.com/who-is-leading-raids-on-nyc-nightclubs/",
    disposition: "live-source-lead",
    note:
      "Later reporting circulated by the account as continuity evidence for nightlife-enforcement concerns."
  },
  {
    id: "hell-gate-saint-vitus",
    postedByStatusId: "1761049558526706129",
    title:
      "Mayor Adams Said the Era of Nightlife Raids Was Over. So What Happened to Saint Vitus?",
    canonicalUrl:
      "https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/",
    disposition: "live-and-close-read-metadata",
    note:
      "The article documents continued public scrutiny of nightlife enforcement after the announced end of MARCH. It does not establish that the Saint Vitus action was a MARCH raid."
  }
];

function unique(values) {
  return [...new Set(values)];
}

function countMap(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([value, count]) => ({ value, count }));
}

function parseCount(value) {
  const normalized = value.replaceAll(",", "").toLowerCase();
  const multiplier = normalized.endsWith("k")
    ? 1_000
    : normalized.endsWith("m")
      ? 1_000_000
      : 1;
  return Math.round(Number.parseFloat(normalized) * multiplier);
}

function parseVisibleInteractions(label) {
  const count = (noun) => {
    const value = label?.match(
      new RegExp(`([0-9][0-9,.]*[kKmM]?) ${noun}`, "i")
    )?.[1];
    return value ? parseCount(value) : 0;
  };
  return {
    replies: count("repl(?:y|ies)"),
    reposts: count("reposts?"),
    likes: count("likes?"),
    bookmarks: count("bookmarks?")
  };
}

function normalizedHostname(url) {
  return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
}

function visibleTokens(text, prefix) {
  if (!text) return [];
  return [...text.matchAll(new RegExp(`(?:^|\\s)(${prefix}[A-Za-z0-9_]+)`, "g"))]
    .map((match) => match[1].toLowerCase());
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function assertValidIsoTimestamp(value, label = "timestamp") {
  assert.match(
    value,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    `${label} must use canonical UTC ISO format`
  );
  const parsed = new Date(value);
  assert.equal(Number.isNaN(parsed.getTime()), false, `${label} is not a real date`);
  assert.equal(parsed.toISOString(), value, `${label} is not a real calendar date`);
}

function isProhibitedFieldName(value) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return (
    prohibitedFieldFragments.some((fragment) => normalized.includes(fragment)) ||
    ["accesstoken", "bearertoken", "secret", "token", "tokens"].includes(
      normalized
    )
  );
}

function isFunctionalQueryParameter(url, key) {
  const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  const normalized = key.toLowerCase();
  if (hostname === "legistar.council.nyc.gov") {
    return ["guid", "id", "options", "search"].includes(normalized);
  }
  if (hostname === "youtube.com" || hostname === "youtu.be") {
    return ["v", "t"].includes(normalized);
  }
  if (hostname === "google.com" && url.pathname === "/url") {
    return normalized === "q";
  }
  if (hostname === "forms.office.com") {
    return ["id", "route"].includes(normalized);
  }
  if (hostname === "facebook.com") {
    return ["id", "story_fbid"].includes(normalized);
  }
  if (hostname === "councilnyc.viebit.com") return normalized === "hash";
  if (hostname === "nyassembly.gov") return normalized === "bn";
  if (hostname === "portal.311.nyc.gov") return normalized === "kanumber";
  if (hostname === "artny.memberclicks.net") {
    return ["option", "view"].includes(normalized);
  }
  if (hostname === "calendly.com") return normalized === "month";
  if (hostname === "congress.gov") return ["r", "s"].includes(normalized);
  if (hostname === "canva.com") return normalized === "redirect";
  if (hostname === "a860-gpp.nyc.gov") return normalized === "locale";
  if (hostname === "humandignitytrust.org") {
    return ["type_filter[]", "type_filter_submitted"].includes(normalized);
  }
  if (hostname === "censushardtocountmaps2020.us") {
    return [
      "arp",
      "baselayerstate",
      "filterquery",
      "infotab",
      "latlng",
      "promotedfeaturetype",
      "query",
      "rtryear",
      "z"
    ].includes(normalized);
  }
  return false;
}

function splitTrailingPunctuation(value) {
  const suffix = value.match(/[),.;!?]+$/)?.[0] ?? "";
  return [value.slice(0, value.length - suffix.length), suffix];
}

function sanitizeUrlToken(value) {
  const [candidate, suffix] = splitTrailingPunctuation(value);
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return value;
  }
  for (const key of [...url.searchParams.keys()]) {
    if (!isFunctionalQueryParameter(url, key)) {
      url.searchParams.delete(key);
      continue;
    }
    const nested = url.searchParams.get(key);
    if (nested && /^https?:\/\//i.test(nested)) {
      url.searchParams.set(key, sanitizeUrlToken(nested));
    }
  }
  return `${url.toString()}${suffix}`;
}

function hasUnapprovedQueryParameter(value) {
  const tokens = value.match(/https?:\/\/[^\s<>"']+/gi) ?? [];
  return tokens.some((token) => {
    const [candidate] = splitTrailingPunctuation(token);
    let url;
    try {
      url = new URL(candidate);
    } catch {
      return false;
    }
    return [...url.searchParams.entries()].some(([key, nested]) => {
      if (!isFunctionalQueryParameter(url, key)) return true;
      return /^https?:\/\//i.test(nested) && hasUnapprovedQueryParameter(nested);
    });
  });
}

function sanitizePublicString(value) {
  return value
    .replace(publicEmailPattern, "[public email redacted]")
    .replace(publicPhonePattern, "[public contact number redacted]")
    .replace(
      trackingParameterPattern,
      (_match, separator, key) =>
        `${separator}${key}=[tracking value redacted]`
    )
    .replace(/https?:\/\/[^\s<>"']+/gi, sanitizeUrlToken);
}

function sanitizePublicValue(value) {
  if (typeof value === "string") return sanitizePublicString(value);
  if (Array.isArray(value)) return value.map(sanitizePublicValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !isProhibitedFieldName(key))
      .map(([key, nested]) => [key, sanitizePublicValue(nested)])
  );
}

function assertPublicSafeValue(value, path = "$") {
  if (typeof value === "string") {
    assert.doesNotMatch(value, publicEmailPattern, `${path} retains an email address`);
    assert.doesNotMatch(value, publicPhonePattern, `${path} retains a phone number`);
    assert.doesNotMatch(
      value,
      unredactedTrackingParameterPattern,
      `${path} retains an unredacted tracking parameter value`
    );
    assert.equal(
      hasUnapprovedQueryParameter(value),
      false,
      `${path} retains a nonfunctional query, tracking, or personalization parameter`
    );
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((nested, index) => assertPublicSafeValue(nested, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    assert.equal(
      isProhibitedFieldName(key),
      false,
      `${path}.${key} is a prohibited private field`
    );
    assertPublicSafeValue(nested, `${path}.${key}`);
  }
}

export function sanitizeNycArtCRawCapture(rawCaptureText) {
  const sanitized = sanitizePublicValue(JSON.parse(rawCaptureText));
  const accountStatusIds = new Set(
    sanitized.items
      .filter((item) => item.kind !== "context")
      .map((item) => item.statusId)
  );
  const renderedContexts = sanitized.items.filter(
    (item) => item.kind === "context"
  );
  sanitized.items = sanitized.items.filter(
    (item) => item.kind !== "context" || !accountStatusIds.has(item.statusId)
  );
  const contextOnlyCount = sanitized.items.filter(
    (item) => item.kind === "context"
  ).length;
  const priorDuplicateContextCount =
    sanitized.captureAudit.duplicateRenderedContextsRemoved ?? 0;
  const duplicateContextCount =
    priorDuplicateContextCount +
    renderedContexts.length -
    contextOnlyCount;
  sanitized.captureAudit.renderedPublicContextRecords ??=
    renderedContexts.length + priorDuplicateContextCount;
  sanitized.captureAudit.supplementalPublicContexts = contextOnlyCount;
  sanitized.captureAudit.duplicateRenderedContextsRemoved = duplicateContextCount;
  sanitized.boundaries = sanitized.boundaries.map((boundary) =>
    /public conversation records are preserved as context/.test(boundary)
      ? `${contextOnlyCount} context-only public conversation records are preserved outside the 5,124-post denominator; ${duplicateContextCount} duplicate rendered views of account items were removed.`
      : boundary
  );
  const profileTimelineCutoff = sanitized.captureAudit.profileTimelineOldestVisible;
  for (const item of sanitized.items) {
    item.recoveryPartition =
      item.kind === "context"
        ? "supplemental-context"
        : item.postedAt >= profileTimelineCutoff
          ? "profile-timeline"
          : "historical-authored-search";
    if (typeof item.text === "string") item.textSha256 = sha256(item.text);
  }
  assertPublicSafeValue(sanitized);
  return `${JSON.stringify(sanitized, null, 2)}\n`;
}

export function buildNycArtCCorpus(rawCaptureText) {
  assert.equal(sha256(rawCaptureText), expectedRawCaptureSha256);
  const raw = JSON.parse(rawCaptureText);
  assertPublicSafeValue(raw);
  assert.equal(raw.account, "@NYCArtC");
  assert.equal(raw.profileReportedPosts, 5_124);
  assertValidIsoTimestamp(raw.capturedAt, "capturedAt");
  assertValidIsoTimestamp(
    raw.captureAudit.profileTimelineOldestVisible,
    "profileTimelineOldestVisible"
  );

  const rawAccountItems = raw.items.filter((item) => item.kind !== "context");
  const rawAuthoredItems = rawAccountItems.filter(
    (item) => item.kind === "authored"
  );
  const rawRepostedItems = rawAccountItems.filter(
    (item) => item.kind === "reposted"
  );
  const rawContextItems = raw.items.filter((item) => item.kind === "context");
  const profileTimelineItems = rawAccountItems.filter(
    (item) => item.recoveryPartition === "profile-timeline"
  );
  const historicalSearchItems = rawAccountItems.filter(
    (item) => item.recoveryPartition === "historical-authored-search"
  );
  assert.equal(raw.captureAudit.renderedAccountItems, rawAccountItems.length);
  assert.equal(raw.captureAudit.authoredItems, rawAuthoredItems.length);
  assert.equal(raw.captureAudit.repostedItems, rawRepostedItems.length);
  assert.equal(
    raw.captureAudit.unrecoveredProfileCountDifference,
    raw.profileReportedPosts - rawAccountItems.length
  );
  assert.equal(
    raw.captureAudit.profileTimelineAccountItems,
    profileTimelineItems.length
  );
  assert.equal(
    raw.captureAudit.historicalAuthoredSearchAdditions,
    historicalSearchItems.length
  );
  const profileTimelineCutoff =
    raw.captureAudit.profileTimelineOldestVisible;
  assert(
    profileTimelineItems.every(
      (item) => item.postedAt >= profileTimelineCutoff
    )
  );
  assert(
    historicalSearchItems.every(
      (item) =>
        item.kind === "authored" && item.postedAt < profileTimelineCutoff
    )
  );
  assert(
    rawContextItems.every(
      (item) => item.recoveryPartition === "supplemental-context"
    )
  );
  assert.equal(
    profileTimelineItems
      .map((item) => item.postedAt)
      .sort()[0],
    raw.captureAudit.profileTimelineOldestVisible
  );
  assert.equal(raw.captureAudit.supplementalPublicContexts, rawContextItems.length);
  assert.equal(raw.captureAudit.renderedPublicContextRecords, 35);
  assert.equal(raw.captureAudit.duplicateRenderedContextsRemoved, 16);
  assert.equal(
    raw.captureAudit.renderedPublicContextRecords,
    rawContextItems.length + raw.captureAudit.duplicateRenderedContextsRemoved
  );
  assert.equal(
    raw.captureAudit.authoredPartitionCrossCheck,
    "All 2017 two-month authored-search windows were rerun as one-month windows without adding a status ID."
  );

  for (const item of raw.items) {
    assert.match(item.statusId, /^\d+$/);
    assert(["authored", "reposted", "context"].includes(item.kind));
    assertValidIsoTimestamp(item.postedAt, `${item.statusId}.postedAt`);
    const statusUrl = new URL(item.statusUrl);
    const statusPath = statusUrl.pathname.split("/").filter(Boolean);
    assert.equal(statusPath[1], "status");
    assert.equal(statusPath[2], item.statusId);
    assert.equal(
      statusPath[0].toLowerCase(),
      item.sourceHandle.replace(/^@/, "").toLowerCase()
    );
    if (item.kind === "authored") {
      assert.equal(item.sourceHandle.replace(/^@/, "").toLowerCase(), "nycartc");
    }
    if (typeof item.text === "string") {
      assert.equal(item.textSha256, sha256(item.text));
    }
  }

  const resolutionEntries = raw.shortUrlResolutions;
  const resolutionMap = new Map(
    resolutionEntries.map(({ shortUrl, resolvedUrl }) => [shortUrl, resolvedUrl])
  );
  assert.equal(resolutionMap.size, resolutionEntries.length);
  for (const { resolvedUrl } of resolutionEntries) {
    assert.match(resolvedUrl, /^https?:\/\//);
  }

  const postedShortUrls = unique(
    raw.items
      .filter((item) => item.kind !== "context")
      .flatMap((item) =>
        item.outgoingLinks.map((link) => link.shortUrl)
      )
  );
  assert.deepEqual(new Set(postedShortUrls), new Set(resolutionMap.keys()));

  const normalizeItem = (item) => ({
    statusId: item.statusId,
    canonicalUrl: item.statusUrl,
    publishedAt: item.postedAt,
    recoveryPartition: item.recoveryPartition,
    kind: item.kind,
    sourceHandle: item.sourceHandle,
    visibleText: item.text,
    textSha256: item.textSha256,
    publicTextOmitted: item.publicTextOmitted,
    hashtags: item.hashtags,
    mentions: item.mentions,
    visibleHashtags: visibleTokens(item.text, "#"),
    visibleMentions: visibleTokens(item.text, "@"),
    outgoingLinks: item.outgoingLinks.map((link) => {
      const resolvedDestination = resolutionMap.get(link.shortUrl);
      return {
        shortUrl: link.shortUrl,
        displayedText: link.displayedText,
        ...(resolvedDestination ? { resolvedDestination } : {})
      };
    }),
    visibleInteractions: parseVisibleInteractions(item.visibleInteractionLabel),
    visibleInteractionLabel: item.visibleInteractionLabel,
    media: item.media
  });

  const normalized = raw.items.map(normalizeItem);
  const items = normalized
    .filter((item) => item.kind !== "context")
    .sort((left, right) => left.publishedAt.localeCompare(right.publishedAt));
  const supplementalContexts = normalized
    .filter((item) => item.kind === "context")
    .sort((left, right) => left.publishedAt.localeCompare(right.publishedAt));
  assert.equal(new Set(items.map((item) => item.statusId)).size, items.length);
  assert.equal(
    new Set(supplementalContexts.map((item) => item.statusId)).size,
    supplementalContexts.length
  );
  assert.equal(
    new Set(normalized.map((item) => item.statusId)).size,
    normalized.length
  );
  const authored = items.filter((item) => item.kind === "authored");
  const reposted = items.filter((item) => item.kind === "reposted");

  for (const item of reposted) {
    assert.equal(item.visibleText, null);
    assert.equal(item.publicTextOmitted, true);
    assert.match(item.textSha256, /^[a-f0-9]{64}$/);
  }
  for (const item of [...authored, ...supplementalContexts]) {
    assert.doesNotMatch(item.visibleText ?? "", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    assert.doesNotMatch(
      item.visibleText ?? "",
      /(?:\+?1[ .-]+)?(?:\(\d{3}\)[ .-]*|\d{3}[ .-]+)\d{3}[ .-]+\d{4}/
    );
  }

  const years = {};
  for (const item of items) {
    const year = item.publishedAt.slice(0, 4);
    years[year] ??= { authored: 0, reposted: 0, total: 0 };
    years[year][item.kind] += 1;
    years[year].total += 1;
  }

  const authoredHashtags = authored.flatMap((item) => item.visibleHashtags);
  const authoredMentions = authored.flatMap((item) => item.visibleMentions);
  const markers = campaignMarkers.map((marker) => ({
    ...marker,
    visibleHashtagOccurrences: authoredHashtags.filter(
      (hashtag) => hashtag === marker.hashtag
    ).length,
    statusIds: authored
      .filter((item) => item.visibleHashtags.includes(marker.hashtag))
      .map((item) => item.statusId)
  }));
  const authoredLinks = authored.flatMap((item) => item.outgoingLinks);
  const repostedSources = countMap(
    reposted.map((item) => item.sourceHandle.toLowerCase())
  );
  const outboundMentions = countMap(
    authoredMentions.filter((handle) => handle !== "@nycartc")
  );
  const outboundMentionStatusCounts = countMap(
    authored.flatMap((item) =>
      unique(item.visibleMentions.filter((handle) => handle !== "@nycartc"))
    )
  );
  const linkedDomains = countMap(
    authoredLinks.map((link) => normalizedHostname(link.resolvedDestination))
  );
  const visibleInteractionTotals = authored.reduce(
    (totals, item) => {
      for (const key of Object.keys(totals)) {
        totals[key] += item.visibleInteractions[key];
      }
      return totals;
    },
    { replies: 0, reposts: 0, likes: 0, bookmarks: 0 }
  );
  const knownIds = new Set(items.map((item) => item.statusId));
  for (const lead of sourceLeads) {
    assert(knownIds.has(lead.postedByStatusId));
    const item = items.find((candidate) => candidate.statusId === lead.postedByStatusId);
    assert(
      item.outgoingLinks.some(
        (link) =>
          link.resolvedDestination === lead.canonicalUrl ||
          link.resolvedDestination.startsWith(`${lead.canonicalUrl}?`)
      )
    );
  }

  const corpus = {
    schemaVersion: 1,
    account: "@NYCArtC",
    capturedAt: raw.capturedAt,
    capturedThrough: raw.capturedThrough,
    rawCaptureSha256: sha256(rawCaptureText),
    rawCaptureArtifact:
      "source-captures/nycartc-x-browser-extraction-2026-07-15-utc.json",
    derivationManifest:
      "nycartc-x-full-population-2026-07-15.manifest.json",
    derivationScript: "scripts/derive-nycartc-x-corpus.mjs",
    population: {
      profileReported: raw.profileReportedPosts,
      recoveredAccountItems: items.length,
      authored: authored.length,
      reposted: reposted.length,
      unrecoveredCountDifference: raw.profileReportedPosts - items.length,
      supplementalPublicContexts: supplementalContexts.length,
      range: [items[0].publishedAt, items.at(-1).publishedAt],
      byYear: years
    },
    boundaries: raw.boundaries,
    campaignMarkers: markers,
    stakeholderCommunication: {
      outboundMentionCounts: outboundMentions,
      outboundMentionStatusCounts,
      recoveredRepostSourceCounts: repostedSources,
      boundary:
        "Outbound mentions and repost-source counts describe communication and source circulation. They do not establish incoming engagement, endorsement, reach, authorship by Jamie, or policy causation."
    },
    linkInventory: {
      allDistinctShortUrlsResolved: resolutionMap.size,
      authoredPostsWithOutgoingLinks: authored.filter(
        (item) => item.outgoingLinks.length > 0
      ).length,
      authoredOutgoingLinkOccurrences: authoredLinks.length,
      distinctAuthoredShortUrls: new Set(
        authoredLinks.map((link) => link.shortUrl)
      ).size,
      authoredLinkedDomainCounts: linkedDomains,
      boundary:
        "A posted destination documents source circulation. It does not establish endorsement, page accuracy, audience reach, or authorship of the linked work."
    },
    sourceLeads,
    heldObservations: {
      visibleInteractionTotals,
      authoredPostsWithVisibleInteraction: authored.filter((item) =>
        Object.values(item.visibleInteractions).some((count) => count > 0)
      ).length,
      status: "hold",
      reason:
        "Visible interaction labels are volatile, incomplete platform observations. They are retained for future comparison and are not projected as accomplishment metrics."
    },
    supplementalContexts,
    items
  };

  assertPublicSafeValue(corpus);

  assert.deepEqual(deriveNycArtCCorpusMetrics(corpus), {
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
  assert.equal(authoredHashtags.filter((tag) => tag === "#fairrentnyc").length, 230);
  return corpus;
}

export function deriveNycArtCCorpusMetrics(corpus) {
  const mention = (handle) =>
    corpus.stakeholderCommunication.outboundMentionCounts.find(
      (entry) => entry.value === handle
    )?.count ?? 0;
  const mentionStatusCount = (handle) =>
    corpus.stakeholderCommunication.outboundMentionStatusCounts.find(
      (entry) => entry.value === handle
    )?.count ?? 0;
  const repostSource = (handle) =>
    corpus.stakeholderCommunication.recoveredRepostSourceCounts.find(
      (entry) => entry.value === handle
    )?.count ?? 0;
  return {
    profileReported: corpus.population.profileReported,
    recoveredAccountItems: corpus.population.recoveredAccountItems,
    authored: corpus.population.authored,
    reposted: corpus.population.reposted,
    unrecoveredCountDifference: corpus.population.unrecoveredCountDifference,
    supplementalPublicContexts: corpus.population.supplementalPublicContexts,
    allDistinctShortUrlsResolved:
      corpus.linkInventory.allDistinctShortUrlsResolved,
    authoredPostsWithOutgoingLinks:
      corpus.linkInventory.authoredPostsWithOutgoingLinks,
    authoredOutgoingLinkOccurrences:
      corpus.linkInventory.authoredOutgoingLinkOccurrences,
    distinctAuthoredShortUrls: corpus.linkInventory.distinctAuthoredShortUrls,
    campaignMarkerCounts: Object.fromEntries(
      corpus.campaignMarkers.map((marker) => [
        marker.id,
        marker.statusIds.length
      ])
    ),
    campaignMarkerOccurrenceCounts: Object.fromEntries(
      corpus.campaignMarkers.map((marker) => [
        marker.id,
        marker.visibleHashtagOccurrences
      ])
    ),
    nycCouncilOutboundMentions: mention("@nyccouncil"),
    nycCouncilOutboundPosts: mentionStatusCount("@nyccouncil"),
    olympiaKaziRecoveredReposts: repostSource("olympiakazi"),
    authoredPostsWithVisibleInteraction:
      corpus.heldObservations.authoredPostsWithVisibleInteraction,
    visibleInteractionTotals: corpus.heldObservations.visibleInteractionTotals
  };
}

export function buildNycArtCManifest(
  rawPath,
  rawCaptureText,
  corpusPath,
  corpusText,
  corpus
) {
  return {
    schemaVersion: 1,
    generatedAt: corpus.capturedAt,
    generator: "scripts/derive-nycartc-x-corpus.mjs --write",
    sourceCapture: rawPath,
    sourceCaptureSha256: sha256(rawCaptureText),
    corpus: corpusPath,
    corpusSha256: sha256(corpusText),
    profileReportedPosts: corpus.population.profileReported,
    recoveredAccountItems: corpus.population.recoveredAccountItems,
    unrecoveredItems: corpus.population.unrecoveredCountDifference,
    supplementalPublicContexts:
      corpus.population.supplementalPublicContexts,
    status:
      "profile-population-accounted-for-with-1757-item-recovery-gap"
  };
}

export function validateNycArtCCorpus(
  rawCaptureText,
  corpusText,
  manifest,
  rawPath = defaultRawPath,
  corpusPath = defaultCorpusPath
) {
  const corpus = JSON.parse(corpusText);
  assert.equal(sha256(rawCaptureText), corpus.rawCaptureSha256);
  assert.deepEqual(buildNycArtCCorpus(rawCaptureText), corpus);
  assert.deepEqual(
    manifest,
    buildNycArtCManifest(
      rawPath,
      rawCaptureText,
      corpusPath,
      corpusText,
      corpus
    )
  );
  return deriveNycArtCCorpusMetrics(corpus);
}

function writeArtifacts(rawPath, corpusPath, manifestPath) {
  const rawCaptureText = readFileSync(rawPath, "utf8");
  const corpus = buildNycArtCCorpus(rawCaptureText);
  const corpusText = `${JSON.stringify(corpus, null, 2)}\n`;
  const manifest = buildNycArtCManifest(
    rawPath,
    rawCaptureText,
    corpusPath,
    corpusText,
    corpus
  );
  writeFileSync(corpusPath, corpusText);
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return deriveNycArtCCorpusMetrics(corpus);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const write = process.argv.includes("--write");
  const sanitizeRaw = process.argv.includes("--sanitize-raw");
  const paths = process.argv
    .slice(2)
    .filter((value) => value !== "--write" && value !== "--sanitize-raw");
  const rawPath = paths[0] ?? defaultRawPath;
  const corpusPath = paths[1] ?? defaultCorpusPath;
  const manifestPath = paths[2] ?? defaultManifestPath;
  if (sanitizeRaw) {
    writeFileSync(
      rawPath,
      sanitizeNycArtCRawCapture(readFileSync(rawPath, "utf8"))
    );
  }
  const metrics = write
    ? writeArtifacts(rawPath, corpusPath, manifestPath)
    : validateNycArtCCorpus(
        readFileSync(rawPath, "utf8"),
        readFileSync(corpusPath, "utf8"),
        JSON.parse(readFileSync(manifestPath, "utf8")),
        rawPath,
        corpusPath
      );
  process.stdout.write(`${JSON.stringify(metrics, null, 2)}\n`);
}
