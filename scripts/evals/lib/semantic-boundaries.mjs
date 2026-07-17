export const semanticBoundaryMutations = [
  ["silence-as-endorsement", /\bsilence (?:was|is|proved|demonstrated) endorsement\b/i],
  ["proposal-as-delivery", /\b(?:the )?proposal (?:delivered|implemented|completed)\b/i],
  ["appropriation-as-receipt", /\bappropriat(?:ion|ed funds?) (?:was|were|had been) (?:received|disbursed)\b/i],
  ["post-count-as-lifetime-history", /\b\d+[+]?(?: posts?)? (?:is|was|represent|represents) (?:the )?complete lifetime history\b/i],
  ["reaction-count-as-people", /\b\d+[+]?(?: reactions?|responses?) (?:means|were|represents) \d+[+]? unique people\b/i],
  ["account-as-individual-authorship", /\bJamie authored (?:all|every) (?:account )?(?:post|tweet)s?\b/i],
  ["reference-as-endorsement", /\b(?:institutional|government|Council) (?:reference|mention) (?:was|is|proved) (?:an )?endorsement\b/i],
  ["availability-as-permission", /\bpublic(?:ly)? available (?:means|is|was) (?:publication )?permission\b/i],
  ["response-as-attendance", /\b(?:event )?(?:responses?|reactions?) (?:were|equaled|proved) attendance\b/i],
  ["circulation-as-agreement", /\bsource circulation (?:was|is|proved) agreement\b/i],
  ["agent-as-human-validation", /\b(?:agent|AI|Codex|LLM) review (?:was|is|counts as) human validation\b/i]
];

export function findSemanticInflation(values) {
  return values.flatMap(({ id, text }) => semanticBoundaryMutations
    .filter(([, pattern]) => pattern.test(text))
    .map(([mutation]) => ({ id, mutation }))
  );
}
