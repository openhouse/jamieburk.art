const riskPatterns = [
  {
    label: "lifetime-population overclaim",
    pattern: /(?:all|complete|entire|full)\s+(?:1,?243\s+)?(?:personal\s+)?Facebook\s+(?:posts?|history).{0,100}(?:ever|lifetime|account)|(?:every|all)\s+(?:Facebook\s+)?posts?.{0,100}(?:Jamie\s+)?(?:ever\s+)?published/i
  },
  {
    label: "universal-public-audience overclaim",
    pattern: /(?:all|every|the full|the entire)\s+(?:1,?243\s+)?(?:records?|posts?).{0,70}(?:were|was|are|is)\s+public|1,?243\s+public\s+(?:records?|posts?)/i
  },
  {
    label: "unlabeled-public inference",
    pattern: /(?:unlabeled|unknown[- ]audience).{0,80}(?:means?|assume|infer|treat(?:ed)? as).{0,30}public/i
  },
  {
    label: "research-routing importance overclaim",
    pattern: /(?:181\s+(?:mission[- ]routed\s+)?records?|(?:mission|project|practice)[- ]routing counts?).{0,120}(?:prove|show|measure|rank|establish).{0,90}(?:priorit(?:y|ies)|importance|effort|commitment|impact)/i
  },
  {
    label: "posted-link corroboration overclaim",
    pattern: /(?:all|every|the)\s+549\s+(?:posted\s+)?(?:links?|destinations?|sources?).{0,120}(?:corroborate|confirm|prove|support).{0,90}(?:claims?|record|work)/i
  },
  {
    label: "stakeholder-engagement overclaim",
    pattern: /(?:mentions?|tags?|quotations?|routes?|references?).{0,140}(?:prove|show|establish|mean|are)\s+(?:stakeholder\s+)?(?:engagement|endorsement|attendance|partnership|response|support|influence)|(?:(?:20|twenty)\s+(?:New York City Council|Council)|(?:18|eighteen)\s+Rafael Espinal).{0,140}(?:engaged|endorsed|supported|responded|acted)/i
  },
  {
    label: "mutable-counter impact overclaim",
    pattern: /(?:reactions?|likes?|comments?|shares?|counters?).{0,140}(?:prove|show|establish|measure|equal|represent).{0,90}(?:people|reach|audience|endorsement|conversion|causality|impact)|(?:165|28|24|106)\s+(?:people|users|supporters).{0,90}(?:reached|engaged|endorsed)/i
  },
  {
    label: "CouncilStat relationship overclaim",
    pattern: /Jamie.{0,110}(?:was|worked as|served as|held).{0,70}(?:employed|employee|staff|CouncilStat|City Council team)|Jamie.{0,110}(?:hired|recruited|controlled hiring|authored the job posting).{0,90}(?:CouncilStat|City Council)/i
  },
  {
    label: "sole project authorship overclaim",
    pattern: /Jamie.{0,100}(?:alone|solely|single[- ]handedly).{0,100}(?:founded|created|ran|authored|organized|caused).{0,100}(?:KC Town Hall|WOW List|Let NYC Dance|Talks Not Raids|campaign|legislation)/i
  },
  {
    label: "protected-content publication",
    pattern: /(?:publish|quote|reproduce|expose).{0,100}(?:friends[- ]only|only me|unlabeled|private post|comment text|responder identit|authenticated state)/i
  }
];

const denialPattern =
  /(?:do not|does not|did not|not|never|cannot|could not|no evidence|not establish|not a|not an|remain(?:s|ed)? open|pending|without|rather than|outside|omitted|excluded|protected)/i;

function fragments(text) {
  return text
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|while|rather than)\b\s+/i)
    .filter(Boolean);
}

export function findPersonalFacebookPostsPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const risk of riskPatterns) {
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
