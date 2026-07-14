export const nycaOverclaimPatterns = [
  {
    id: "complete-profile-count-recovery",
    label: "complete tweet recovery",
    pattern:
      /\b(?:all\s+)?5,?124(?:\s*\/\s*5,?124)?\s+(?:tweets|posts|items)(?:\s+(?:were|are|have been))?\s+recovered\b/i
  },
  {
    id: "complete-percentage-recovery",
    label: "complete item recovery",
    pattern:
      /\b100(?:\s*%| percent)(?:\s+of)?(?:\s+all)?(?:\s+the)?(?:\s+5,?124)?\s+(?:tweets|posts|items)(?:\s+(?:were|are|have been))?\s+recovered\b/i
  },
  {
    id: "personal-corpus-authorship",
    label: "personal authorship of the shared account corpus",
    pattern:
      /Jamie\s+(?:personally\s+)?(?:authored|wrote|published|posted)\s+(?:(?:all|every)\s+(?:of\s+)?(?:the\s+)?|715\b|5,?124\b)/i
  },
  {
    id: "personal-repost-selection",
    label: "personal selection of every repost",
    pattern: /Jamie selected every repost/i
  },
  {
    id: "mutable-metrics-as-impact",
    label: "mutable or outbound activity as impact",
    pattern:
      /(?:reposts?|current (?:followers?|reactions?|profile counters?)) (?:prove|show|demonstrate|establish) (?:endorsement|impact|reach|audience)/i
  },
  {
    id: "institutional-endorsement",
    label: "institutional endorsement",
    pattern:
      /(?:The New York City Council|NYC Council) (?:formally )?endorsed NYC Artist Coalition/i
  },
  {
    id: "council-member-endorsement",
    label: "Council-member endorsement",
    pattern: /(?:Seven|7) Council members (?:formally )?endorsed/i
  },
  {
    id: "unsupported-personal-communication",
    label: "unsupported personal communication",
    pattern:
      /Jamie personally communicated with (?:(?:all(?:\s+seven)?|seven|7) (?:Council )?members|every (?:Council )?member)/i
  },
  {
    id: "account-as-policy-cause",
    label: "policy causality from the account corpus",
    pattern:
      /(?:the )?(?:account|social corpus|reposts?) (?:alone )?proves? (?:policy )?causality/i
  }
];

export function findNycaOverclaims(text) {
  return nycaOverclaimPatterns
    .filter(({ pattern }) => pattern.test(text))
    .map(({ id, label }) => ({ id, label }));
}

export function nycaResearchClaimText(markdown) {
  return markdown.split(/^## Reuse rules$/m, 1)[0];
}
