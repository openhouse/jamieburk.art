const directRiskPatterns = [
  {
    label: "authenticated account-state disclosure",
    pattern:
      /(?:comment as|Meta Business Suite|Professional Dashboard|signed[- ]in|logged[- ]in|authenticated (?:account|session|dashboard)|current Page[- ]management|administrator controls?)/i
  },
  {
    label: "lifetime-population overclaim",
    pattern:
      /(?:all|complete|entire|full|only)\s+(?:38\s+)?(?:Facebook\s+)?posts?.{0,80}(?:ever|lifetime|history)|(?:every|all)\s+(?:Facebook\s+)?(?:post|item).{0,80}(?:ever|published)/i
  },
  {
    label: "sole naming or campaign-ownership overclaim",
    pattern:
      /Jamie.{0,80}(?:alone|solely|single[- ]handedly).{0,80}(?:named|created|owned|ran|organized)|Jamie.{0,80}(?:owned|administered|managed|controlled).{0,80}(?:KC Spaces Fund|Facebook Page|account)/i
  },
  {
    label: "Page-posting attribution overclaim",
    pattern:
      /Jamie.{0,100}(?:authored|wrote|published|posted|managed).{0,100}(?:every|all|the)\s+(?:KC Spaces Fund|Facebook|Page|posts?)/i
  },
  {
    label: "stakeholder-engagement overclaim",
    pattern:
      /(?:tagged|named|referenced|mentioned)\s+(?:people|accounts?|organizations?|stakeholders?).{0,100}(?:engaged|endorsed|partnered|supported|responded|acted)/i
  },
  {
    label: "mutable-interaction impact overclaim",
    pattern:
      /(?:119\s+reactions?|4\s+comments?|50\s+shares?).{0,100}(?:people|reach|audience|endorsement|conversion|impact)|(?:reactions?|comments?|shares?).{0,100}(?:proved|demonstrated|measured).{0,80}(?:reach|endorsement|conversion|impact)/i
  }
];

const denialPattern =
  /(?:do not|does not|did not|not|never|cannot|could not|no evidence|not establish|not a|not an|remain(?:s|ed)? open|pending|without)/i;

function fragments(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|while|rather than)\b\s+/i)
    .filter(Boolean);
}

export function findKcSpacesFundFacebookPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const risk of directRiskPatterns) {
      if (risk.pattern.test(fragment) && !denialPattern.test(fragment)) {
        return risk.label;
      }
    }
  }
  return null;
}

export function hasKcSpacesFundFacebookPublicArtifactRisk(text) {
  return findKcSpacesFundFacebookPublicArtifactRisk(text) !== null;
}
