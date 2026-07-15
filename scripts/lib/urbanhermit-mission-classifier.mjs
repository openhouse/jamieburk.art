export const urbanhermitMissionSignalRules = [
  { id: "community-platforms-and-gatherings", pattern: /wow\s*list|sunday dinner|open house|monthly music hackathon|popular\.vote|allied media conference/i },
  { id: "civic-participation-and-service", pattern: /callnyc|council20|councilstat|#civictech|#nycvotes|public hearing|civic design|organizing 2\.0/i },
  { id: "cultural-space-advocacy", pattern: /let\s*nyc\s*dance|#letnycdance|cabaret law|save\s*nyc\s*spaces|#savenycspaces|#nightmayor|nyc artist coalition|ghost ship|diy (?:art|music|cultural)?\s*space/i },
  { id: "public-history-place-and-waterways", pattern: /8th street tunnel|8sttunnel|great accommodations|cities on the water|mississippi river|kansas city riverfront|immersive cinema/i },
  { id: "creative-technology-and-media", pattern: /horse\s*lords|analog video|video synthesis|video effect|media archaeology|glitch video|immersive cinema|music hackathon/i },
  { id: "neighborhood-mutual-aid", pattern: /kc town hall|#kctownhall|#tiredoftires|free tire disposal|tire pickup|oak park neighborhood|mutual aid fund/i }
];

export const urbanhermitMissionSignalManifest = urbanhermitMissionSignalRules.map(({ id, pattern }) => ({
  signalId: id,
  pattern: pattern.source,
  flags: pattern.flags
}));

const compactVisibleUrl = (value = "") => value.replace(/\s+/g, "").replace(/…$/, "");

export function extractUrbanhermitSourcePostBody(record) {
  const lines = String(record.text ?? "").split(/\r?\n/);
  const bodyStart = lines[0]?.trim() === "You reposted" ? 5 : 4;
  const bodyLines = lines.slice(bodyStart);
  const quoteIndex = bodyLines.findIndex((line) => line.trim() === "Quote");
  return (quoteIndex >= 0 ? bodyLines.slice(0, quoteIndex) : bodyLines).join("\n").trim();
}

export function urbanhermitSourceBodyExternalLinks(record, sourceBody) {
  const compactBody = compactVisibleUrl(sourceBody).toLowerCase();
  return (record.links ?? [])
    .filter(({ href }) => /^https?:\/\//.test(href))
    .map(({ href, text }) => ({ shortUrl: href, displayedDestination: compactVisibleUrl(text) }))
    .filter(({ displayedDestination }) => {
      if (!displayedDestination) return false;
      const needle = displayedDestination.replace(/^https?:\/\//, "").slice(0, 18).toLowerCase();
      return needle.length >= 8 && compactBody.includes(needle);
    })
    .filter((link, index, links) => links.findIndex((candidate) =>
      candidate.shortUrl === link.shortUrl && candidate.displayedDestination === link.displayedDestination
    ) === index);
}

export function classifyUrbanhermitMissionSignals(record) {
  const sourceBody = extractUrbanhermitSourcePostBody(record);
  const externalLinks = urbanhermitSourceBodyExternalLinks(record, sourceBody);
  const hashtags = sourceBody.match(/#[A-Za-z0-9_]+/g) ?? [];
  const input = [sourceBody, ...hashtags, ...externalLinks.map(({ displayedDestination }) => displayedDestination)].join("\n");
  return urbanhermitMissionSignalRules
    .filter(({ pattern }) => pattern.test(input))
    .map(({ id }) => id);
}
