import { createHash } from "node:crypto";

export const urbanhermitMissionSignalRules = [
  {
    id: "community-platforms-and-gatherings",
    pattern:
      /wow\s*list|sunday dinner|open house|monthly music hackathon|popular\.vote|allied media conference/i,
  },
  {
    id: "civic-participation-and-service",
    pattern:
      /callnyc|council20|councilstat|#civictech|#nycvotes|public hearing|civic design|organizing 2\.0/i,
  },
  {
    id: "cultural-space-advocacy",
    pattern:
      /let\s*nyc\s*dance|#letnycdance|cabaret law|save\s*nyc\s*spaces|#savenycspaces|#nightmayor|nyc artist coalition|ghost ship|diy (?:art|music|cultural)?\s*space/i,
  },
  {
    id: "public-history-place-and-waterways",
    pattern:
      /8th street tunnel|8sttunnel|great accommodations|cities on the water|mississippi river|kansas city riverfront|immersive cinema/i,
  },
  {
    id: "creative-technology-and-media",
    pattern:
      /horse\s*lords|analog video|video synthesis|video effect|media archaeology|glitch video|immersive cinema|music hackathon/i,
  },
  {
    id: "neighborhood-mutual-aid",
    pattern:
      /kc town hall|#kctownhall|#tiredoftires|free tire disposal|tire pickup|oak park neighborhood|mutual aid fund/i,
  },
];

export function extractUrbanhermitSourcePostBody(record) {
  const lines = (record.text ?? "").split(/\r?\n/);
  const bodyStart = lines[0]?.trim() === "You reposted" ? 5 : 4;
  const bodyLines = lines.slice(bodyStart);
  const quoteIndex = bodyLines.findIndex((line) => line.trim() === "Quote");

  return (quoteIndex >= 0 ? bodyLines.slice(0, quoteIndex) : bodyLines)
    .join("\n")
    .trim();
}

export function urbanhermitClassificationInputs(record) {
  return [
    {
      inputField: "source-post-body",
      value: extractUrbanhermitSourcePostBody(record),
    },
    ...(record.hashtags ?? []).map((value) => ({
      inputField: "hashtag",
      value,
    })),
    ...(record.externalLinks ?? []).map((link) => ({
      inputField: "displayed-link-destination",
      value: link.displayedDestination ?? "",
    })),
  ];
}

export function urbanhermitClassificationInputDigest(inputs) {
  return createHash("sha256").update(JSON.stringify(inputs)).digest("hex");
}

export function classifyUrbanhermitMissionSignals(inputs) {
  return urbanhermitMissionSignalRules.flatMap((rule) => {
    for (const input of inputs) {
      const match = input.value.match(rule.pattern);
      if (match) {
        return [
          {
            signalId: rule.id,
            inputField: input.inputField,
            matchedValue: match[0],
          },
        ];
      }
    }
    return [];
  });
}
