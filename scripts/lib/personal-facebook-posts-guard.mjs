const directRiskPatterns = [
  { label: "lifetime-population overclaim", pattern: /(?:complete|entire|full)\s+(?:personal\s+)?Facebook\s+(?:history|archive).{0,70}(?:ever|lifetime)|every\s+Facebook\s+post.{0,70}(?:ever\s+)?published/i },
  { label: "universal-public-audience overclaim", pattern: /(?:all|every|the full)\s+(?:1,?243\s+)?(?:records?|posts?).{0,50}(?:were|are)\s+public|1,?243\s+public\s+(?:records?|posts?)/i },
  { label: "research-routing importance overclaim", pattern: /(?:181\s+(?:mission[- ]routed\s+)?records?|mission[- ]routing counts?).{0,100}(?:prove|show|measure|rank).{0,70}(?:priorit(?:y|ies)|importance|effort|impact)/i },
  { label: "posted-link corroboration overclaim", pattern: /(?:all|every|the)\s+549\s+(?:posted\s+)?(?:links?|destinations?|sources?).{0,90}(?:corroborate|confirm|prove|support)/i },
  { label: "stakeholder-engagement overclaim", pattern: /(?:mentions?|tags?|routes?|references?).{0,100}(?:prove|show|establish|mean).{0,40}(?:engagement|endorsement|partnership|response|influence)|(?:20|twenty)\s+(?:New York City Council|Council).{0,80}(?:engaged|endorsed|supported|responded)/i },
  { label: "mutable-counter impact overclaim", pattern: /(?:reactions?|likes?|comments?|counters?).{0,100}(?:prove|show|measure|represent).{0,70}(?:people|reach|audience|endorsement|conversion|impact)|(?:165|28|24|106)\s+(?:people|users|supporters)/i },
  { label: "CouncilStat relationship overclaim", pattern: /Jamie.{0,80}(?:was|worked as|served as).{0,50}(?:employed|employee|staff|CouncilStat|City Council team)|Jamie.{0,80}(?:hired|controlled hiring|authored the job posting).{0,60}(?:CouncilStat|City Council)/i },
  { label: "sole project authorship overclaim", pattern: /Jamie.{0,80}(?:alone|solely|single[- ]handedly).{0,80}(?:founded|created|ran|authored|organized|caused).{0,80}(?:KC Town Hall|WOW List|Let NYC Dance|Talks Not Raids|campaign|legislation)/i },
  { label: "authenticated private-state disclosure", pattern: /(?:authenticated|logged[- ]in|signed[- ]in).{0,70}(?:friends[- ]only|only-me|private posts?|personal messages?|session|cookie)/i }
];

const denialPattern = /(?:do not|does not|did not|not|never|cannot|no evidence|not establish|remain(?:s|ed)? open|without|rather than)/i;

function fragments(text) {
  return text.replace(/\s+/g, " ").split(/(?<=[.!?;])\s+|\s+\b(?:but|however|while|rather than)\b\s+/i).filter(Boolean);
}

export function findPersonalFacebookPostsPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const risk of directRiskPatterns) {
      if (risk.pattern.test(fragment) && !denialPattern.test(fragment)) return risk.label;
    }
  }
  return null;
}

export function hasPersonalFacebookPostsPublicArtifactRisk(text) {
  return findPersonalFacebookPostsPublicArtifactRisk(text) !== null;
}
