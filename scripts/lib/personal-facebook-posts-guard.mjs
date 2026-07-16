const directRiskPatterns = [
  {
    label: "lifetime-population overclaim",
    pattern:
      /(?:all|complete|entire|full)\s+(?:1,?243\s+)?(?:personal\s+)?Facebook\s+(?:posts?|history).{0,90}(?:ever|lifetime|account)|(?:every|all)\s+(?:Facebook\s+)?posts?.{0,90}(?:Jamie\s+)?(?:ever\s+)?published/i,
  },
  {
    label: "universal-public-audience overclaim",
    pattern:
      /(?:all|every|the full|the entire)\s+(?:1,?243\s+)?(?:records?|posts?).{0,60}(?:were|was|are|is)\s+public|1,?243\s+public\s+(?:records?|posts?)/i,
  },
  {
    label: "research-routing importance overclaim",
    pattern:
      /(?:181\s+(?:mission[- ]routed\s+)?records?|(?:mission|project|practice)[- ]routing counts?).{0,100}(?:prove|show|measure|rank|establish).{0,80}(?:priorit(?:y|ies)|importance|effort|commitment|impact)/i,
  },
  {
    label: "posted-link corroboration overclaim",
    pattern:
      /(?:all|every|the)\s+549\s+(?:posted\s+)?(?:links?|destinations?|sources?).{0,100}(?:corroborate|confirm|prove|support).{0,80}(?:claims?|record|work)/i,
  },
  {
    label: "stakeholder-engagement overclaim",
    pattern:
      /(?:mentions?|tags?|quotations?|routes?|references?).{0,120}(?:prove|show|establish|mean|are)\s+(?:stakeholder\s+)?(?:engagement|endorsement|attendance|partnership|response|support|influence)|(?:(?:20|twenty)\s+(?:New York City Council|Council)|(?:18|eighteen)\s+Rafael Espinal).{0,120}(?:engaged|endorsed|supported|responded|acted)/i,
  },
  {
    label: "mutable-counter impact overclaim",
    pattern:
      /(?:reactions?|likes?|comments?|counters?).{0,120}(?:prove|show|establish|measure|equal|represent).{0,80}(?:people|reach|audience|endorsement|conversion|causality|impact)|(?:165|28|24|106)\s+(?:people|users|supporters).{0,80}(?:reached|engaged|endorsed)/i,
  },
  {
    label: "CouncilStat relationship overclaim",
    pattern:
      /Jamie.{0,100}(?:was|worked as|served as|held).{0,60}(?:employed|employee|staff|CouncilStat|City Council team)|Jamie.{0,100}(?:hired|recruited|controlled hiring|authored the job posting).{0,80}(?:CouncilStat|City Council)/i,
  },
  {
    label: "sole project authorship overclaim",
    pattern:
      /Jamie.{0,90}(?:alone|solely|single[- ]handedly).{0,90}(?:founded|created|ran|authored|organized|caused).{0,90}(?:KC Town Hall|WOW List|Let NYC Dance|Talks Not Raids|campaign|legislation)/i,
  },
  {
    label: "authenticated private-state disclosure",
    pattern:
      /(?:authenticated|logged[- ]in|signed[- ]in).{0,80}(?:private|friends[- ]only|administrator|management|account state|personal messages?|hidden posts?)/i,
  },
];

const denialPattern =
  /(?:do not|does not|did not|not|never|cannot|could not|no evidence|not establish|not a|not an|remain(?:s|ed)? open|pending|without|rather than)/i;

function fragments(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|while|rather than)\b\s+/i)
    .filter(Boolean);
}

export function findPersonalFacebookPostsPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const risk of directRiskPatterns) {
      if (risk.pattern.test(fragment) && !denialPattern.test(fragment)) {
        return risk.label;
      }
    }
  }
  return null;
}

export function hasPersonalFacebookPostsPublicArtifactRisk(text) {
  return findPersonalFacebookPostsPublicArtifactRisk(text) !== null;
}
