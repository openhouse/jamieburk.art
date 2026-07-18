export const urbanHermitOverclaimPatterns = [
  {
    id: "lifetime-complete-recovery",
    label: "lifetime tweet recovery",
    pattern:
      /(?:every|all) (?:post|tweet)s? Jamie (?:has )?ever (?:made|posted|published|written) (?:was|were|has been|have been) recovered/i
  },
  {
    id: "profile-count-as-recovery",
    label: "profile count as complete item recovery",
    pattern:
      /(?:all\s+)?434(?:\s*\/\s*434)?\s+(?:tweets|posts|items|records)(?:\s+(?:were|are|have been))?\s+recovered\b/i
  },
  {
    id: "complete-lifetime-percentage",
    label: "complete lifetime archive",
    pattern:
      /100(?:\s*%| percent)(?:\s+of)?(?:\s+all)?\s+(?:tweets|posts|items|records)(?:\s+Jamie\s+(?:has\s+)?ever\s+(?:made|posted|published))?/i
  },
  {
    id: "all-records-personal-authorship",
    label: "personal authorship of reposts",
    pattern: /Jamie (?:personally )?(?:authored|wrote|published|posted) (?:all|every)(?:\s+of)?(?:\s+the)?\s+434/i
  },
  {
    id: "inbound-as-endorsement",
    label: "inbound accounts as endorsement",
    pattern: /(?:all\s+)?17 accounts (?:formally )?endorsed Jamie/i
  },
  {
    id: "inbound-as-impact",
    label: "inbound search as reach or impact",
    pattern: /(?:the )?26 (?:inbound )?records (?:prove|show|demonstrate|establish|measure) (?:Jamie(?:'s)? )?(?:audience )?(?:reach|impact|influence|adoption)/i
  },
  {
    id: "repost-reactions-as-personal-traction",
    label: "repost reactions as Jamie traction",
    pattern: /(?:repost (?:reactions?|metrics)|reactions? on reposts?) (?:are|belong to|measure|show|prove) Jamie(?:'s)? (?:traction|reach|impact|engagement)/i
  },
  {
    id: "authored-reactions-as-impact",
    label: "mutable authored reactions as reach or impact",
    pattern:
      /(?:175 likes|85 authored records|current visible reactions?|reaction counts?) (?:prove|show|demonstrate|establish|measure) (?:Jamie(?:'s)? )?(?:audience )?(?:reach|impact|influence|adoption|professional value)/i
  },
  {
    id: "current-reactions-as-history",
    label: "current reactions as historical analytics",
    pattern:
      /(?:current visible reactions?|current reaction floor|reaction floor) (?:are|is|constitutes?|provides?) (?:the )?(?:historical|historic) analytics/i
  },
  {
    id: "theme-frequency-as-priority",
    label: "theme frequency as professional priority",
    pattern: /theme frequenc(?:y|ies) (?:proves?|shows?|demonstrates?|establishes?|measures?) Jamie(?:'s)? (?:professional )?(?:priorities|identity|effort|impact)/i
  },
  {
    id: "unresolved-as-nonexistent",
    label: "unresolved link as nonexistence",
    pattern: /(?:the )?(?:unresolved|unrecovered) (?:short )?(?:urls?|links?|destinations?) (?:never existed|did not exist)/i
  },
  {
    id: "personal-timeline-as-portfolio",
    label: "personal timeline as public portfolio archive",
    pattern: /(?:the )?personal timeline (?:is|becomes?|should become) (?:a )?public (?:portfolio|professional) archive/i
  },
  {
    id: "horse-lords-sole-credit",
    label: "sole Horse Lords video credit",
    pattern: /Jamie (?:alone|solely) (?:made|created|directed|produced) (?:the )?Horse Lords(?:['’])? (?:official )?(?:“|\")?Truthers/i
  },
  {
    id: "wowlist-sole-credit",
    label: "sole WOW List authorship",
    pattern: /Jamie (?:alone|solely) (?:built|made|created|founded) WOW\s*List/i
  }
];

export function findUrbanHermitOverclaims(text) {
  return urbanHermitOverclaimPatterns
    .filter(({ pattern }) => pattern.test(text))
    .map(({ id, label }) => ({ id, label }));
}

export function urbanHermitResearchClaimText(markdown) {
  return urbanHermitPublicClaimText(markdown.split(/^## Remaining research$/m, 1)[0]);
}

export function urbanHermitPublicClaimText(markdown) {
  return markdown
    .split("\n")
    .filter((line) => !/^\*\*(?:Do not say|Guardrail|Protected boundaries):\*\*/i.test(line.trim()))
    .filter((line) => !/\b(?:does not mean|do not say|not every|not a lifetime|cannot reveal)\b/i.test(line))
    .join("\n");
}
