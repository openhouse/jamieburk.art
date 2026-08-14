import { createHash } from "node:crypto";

export const nycacSelfRepostAppearanceUrls = [
  "https://x.com/NYCArtC/status/1674013523373068289",
  "https://x.com/NYCArtC/status/1995868766614462973",
];

export const nycacMissionSignalRules = [
  {
    id: "fair-rent-nyc",
    pattern:
      /#fairrentnyc|#intro1796|#intro93\b|#passsbjsa|#sbjsa\b|commercial rent(?: stabilization| regulation)?/i,
  },
  {
    id: "save-nyc-spaces",
    pattern:
      /#savenycspaces|#nosmallbiznonyc|#savesmallbiznyc|#closedbycovid|save nyc spaces/i,
  },
  {
    id: "let-nyc-dance",
    pattern: /#letnycdance|cabaret law|legalize dancing|dance zoning/i,
  },
  {
    id: "talks-not-raids",
    pattern:
      /#talksnotraids|talks not raids|m\.a\.r\.c\.h\.|march raids|multi-agency response/i,
  },
  {
    id: "nightlife-governance",
    pattern:
      /#nightmayor|#nightlifelisteningtour|office of nightlife|nightlife advisory board/i,
  },
  {
    id: "artist-labor",
    pattern:
      /#artistsareworkers|#artsworkersunite|#wgastrong|#wgastrike|#1u\b|music workers|artist labor|fair pay/i,
  },
];

export function extractNycacSourcePostBody(record) {
  const lines = (record.text ?? "").split(/\r?\n/);
  const bodyStart = lines[0]?.trim() === "NYC Artist Coalition reposted" ? 5 : 4;
  const bodyLines = lines.slice(bodyStart);
  const quoteIndex = bodyLines.findIndex((line) => line.trim() === "Quote");

  return (quoteIndex >= 0 ? bodyLines.slice(0, quoteIndex) : bodyLines)
    .join("\n")
    .trim();
}

export function normalizeNycacSourceRecordType(record) {
  if (nycacSelfRepostAppearanceUrls.includes(record.url)) return "original";
  if (record.recordType !== "reply") return record.recordType;

  const quoteIndex = record.text?.indexOf("\nQuote\n") ?? -1;
  const replyIndex = record.text?.indexOf("Replying to") ?? -1;

  return quoteIndex >= 0 && (replyIndex < 0 || quoteIndex < replyIndex)
    ? "original"
    : "reply";
}

export function nycacClassificationInputs(record) {
  return [
    {
      inputField: "source-post-body",
      value: extractNycacSourcePostBody(record),
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

export function nycacClassificationInputDigest(inputs) {
  return createHash("sha256")
    .update(JSON.stringify(inputs))
    .digest("hex");
}

export function classifyNycacMissionSignals(inputs) {
  return nycacMissionSignalRules.flatMap((rule) => {
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
