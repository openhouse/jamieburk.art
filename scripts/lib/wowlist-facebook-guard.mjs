export const directRiskPatterns = [
  {
    label: "community-governance overclaim",
    pattern: /community[- ]govern(?:ed|ance)|member[- ]led/i
  },
  {
    label: "named or authenticated account-control surface",
    pattern:
      /authenticated (?:Page )?access|current authenticated|current-session|comment as|Professional Dashboard|Meta Business Suite|asset-scoped/i
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\b(?:member|community) (?:input|feedback|suggestions?|comments?|ideas?)\b.{0,120}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|implemented|incorporated|changed?|guided?|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\bmembers?\b.{0,60}\bwhose\b.{0,40}\b(?:input|feedback|suggestions?|comments?|ideas?)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|implemented|incorporated|changed?|guided?|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b.{0,120}\b(?:incorporat(?:ed|ing)|implement(?:ed|ing)|based\b.{0,40}\bon|changed\b.{0,40}\bafter|shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|reflected)\b.{0,140}\b(?:members?|community|suggestions?|comments?|feedback|input|ideas?)\b/is
  },
  {
    label: "positive Jamie account-control claim",
    pattern:
      /\bJamie\b(?![^.!?]{0,260}\b(?:does not|did not|cannot|not)\b.{0,80}\b(?:expose|establish|identify|prove|show)\b)[^.!?]{0,100}\b(?:remained?|still|was listed as|could|retained?|held|kept|had|maintained?|controls?|managed?|edited?|published?)\b[^.!?]{0,120}\b(?:administrator|admin|editor|manager|control|ownership|admin rights?|administrator access|management access|Page settings|publish(?:ing)?|post(?:ing)? as)\b/i
  },
  {
    label: "positive Jamie account-control claim",
    pattern:
      /\bJamie\b(?![^.!?]{0,260}\b(?:does not|did not|cannot|not)\b.{0,80}\b(?:expose|establish|identify|prove|show)\b)[^.!?]{0,80}\b(?:still )?(?:controls?|manages?|administers?|edits?)\b[^.!?]{0,80}\b(?:the )?(?:WOW List )?Page\b/i
  },
  {
    label: "positive Jamie account-control claim",
    pattern:
      /\b(?:Page settings|administrator access|admin rights?|owner controls?|Page editor|Page manager)\b.{0,100}\b(?:available to|visible to|assigned to|held by|listed for)\b.{0,80}\bJamie\b/is
  },
  {
    label: "signed-in account-control disclosure",
    pattern:
      /\b(?:signed[- ]in|logged[- ]in|authenticated|current)\b.{0,100}\b(?:profile|view|session|account|Page)\b.{0,160}\b(?:allowed?|let|could|exposed|showed|displayed|revealed|confirmed)\b.{0,120}\b(?:administer|manage|edit|publish|post as|owner controls?|Page settings|Page manager|account manager|Page[- ]control tools?|admin rights?)\b/is
  },
  {
    label: "account-control disclosure",
    pattern:
      /\b(?:dashboard|account|profile|view|session)\b.{0,100}\b(?:allowed?|let|showed|displayed|revealed|exposed|confirmed)\b.{0,140}\b(?:posting as|post as|publishing as|owner controls?|Page manager|account manager|admin(?:istrator)? role|management role|Page settings|Page[- ]control tools?|admin rights?)\b/is
  },
  {
    label: "account-control disclosure",
    pattern:
      /\b(?:owner controls?|Page manager role|account manager status|admin(?:istrator)? (?:role|access|status)|Page editor)\b.{0,100}\b(?:visible|observed|shown|displayed|exposed|confirmed|listed)\b/is
  },
  {
    label: "current account-control disclosure",
    pattern:
      /\bcurrent\b.{0,80}\b(?:Page )?(?:administrator|admin|manager|account-management|account management)\b.{0,100}\b(?:details?|roles?|state|status|access|control|identity)\b.{0,100}\b(?:visible|observed|available|shown|recovered|confirmed)\b/is
  }
];

const communitySignal =
  /\b(?:community )?members?\b|\b(?:member|community) (?:input|feedback|suggestions?|comments?|ideas?)\b|\b(?:suggestions?|comments?|feedback|input|ideas?) from (?:community )?members?\b/i;
const productSignal =
  /\b(?:product|design|platform|service|roadmap|features?|site|decisions?|product changes?)\b/i;
const influenceSignal =
  /\b(?:provided?|gave|contributed|offered|submitted|shared|supplied|sent)\b.{0,50}\b(?:input|feedback|suggestions?|comments?|ideas?)\b|\b(?:help(?:ed)? shap(?:e|ed|ing)|shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|changed?|guided?|drove|determined|co[- ]design(?:ed|ing)?|incorporat(?:ed|ing)|integrat(?:ed|ing)|implement(?:ed|ing)|reflected|based\b.{0,40}\bon)\b/i;
const invitationSignal =
  /\b(?:invite(?:d|s|ing)?|invitation|asked|welcomed|encouraged)\b.{0,180}\b(?:community )?members?\b|\b(?:community )?members?\b.{0,100}\bwere invited\b/i;

function fragments(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+/)
    .filter(Boolean);
}

export function findWowlistFacebookPublicArtifactRisk(text) {
  for (const item of directRiskPatterns) {
    if (item.pattern.test(text)) return item.label;
  }

  for (const fragment of fragments(text)) {
    if (
      communitySignal.test(fragment) &&
      productSignal.test(fragment) &&
      influenceSignal.test(fragment) &&
      !invitationSignal.test(fragment)
    ) {
      return "demonstrated member product influence";
    }
  }

  return null;
}

export function hasWowlistFacebookPublicArtifactRisk(text) {
  return findWowlistFacebookPublicArtifactRisk(text) !== null;
}
