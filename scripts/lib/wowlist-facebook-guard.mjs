const allowedParticipationInvitations = [
  /\b(?:the )?project\b.{0,60}\binvited\b.{0,180}\b(?:community )?members?\b.{0,180}\b(?:help )?shape\b.{0,80}\b(?:the )?(?:service|platform|product|design)\b/gis
];

const prohibitedPatterns = [
  {
    label: "community-governance overclaim",
    pattern: /community[- ]govern(?:ed|ance)|member[- ]led/i
  },
  {
    label: "demonstrated member product influence",
    pattern:
      /\bmembers?\b.{0,80}\b(?:provided?|gave|contributed|offered|submitted|shared|supplied)\b.{0,80}\b(?:input|feedback)\b.{0,120}\b(?:product|design|platform|service|roadmap)\b/is
  },
  {
    label: "demonstrated member product influence",
    pattern:
      /\bmembers?\b.{0,80}\b(?:help(?:ed)?|shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|changed?|guided?|drove|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap)\b/is
  },
  {
    label: "demonstrated community feedback",
    pattern:
      /\bcommunity (?:input|feedback)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|changed?|guided?|drove|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap)\b/is
  },
  {
    label: "demonstrated member product influence",
    pattern:
      /\b(?:product|design|platform|service|roadmap)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|changed?|guided?|drove|determined)\b.{0,100}\bby (?:community )?members?\b/is
  },
  {
    label: "named or authenticated account-control surface",
    pattern:
      /authenticated (?:Page )?access|current authenticated|current-session|comment as|Professional Dashboard|Meta Business Suite|asset-scoped/i
  },
  {
    label: "signed-in account-control disclosure",
    pattern:
      /\b(?:signed[- ]in|logged[- ]in|authenticated|current)\b.{0,80}\b(?:profile|view|session|account)\b.{0,140}\b(?:administer|manage|edit|owner controls?|Page settings|Page manager|account manager)\b/is
  },
  {
    label: "Jamie account-control disclosure",
    pattern: /\bJamie\b.{0,80}\bcould\b.{0,80}\b(?:administer|manage|edit)\b.{0,80}\bPage\b/is
  },
  {
    label: "account-control disclosure",
    pattern:
      /\b(?:account|profile|view|session)\b.{0,80}\b(?:showed|displayed|revealed|exposed|confirmed)\b.{0,120}\b(?:owner controls?|Page manager|account manager|admin(?:istrator)? role|management role|Page settings)\b/is
  },
  {
    label: "account-control disclosure",
    pattern:
      /\b(?:owner controls?|Page manager role|account manager status|admin(?:istrator)? (?:role|access|status))\b.{0,80}\b(?:visible|observed|shown|displayed|exposed|confirmed)\b/is
  },
  {
    label: "current account-control disclosure",
    pattern:
      /\bcurrent\b.{0,60}\b(?:Page )?(?:administrator|admin|manager|account-management|account management)\b.{0,80}\b(?:details?|roles?|state|status|access|control|identity)\b.{0,80}\b(?:visible|observed|available|shown|recovered|confirmed)\b/is
  }
];

export function findWowlistFacebookPublicArtifactRisk(text) {
  let reviewText = text;
  for (const pattern of allowedParticipationInvitations) {
    reviewText = reviewText.replace(pattern, "[bounded participation invitation]");
  }

  for (const item of prohibitedPatterns) {
    if (item.pattern.test(reviewText)) return item.label;
  }
  return null;
}

export function hasWowlistFacebookPublicArtifactRisk(text) {
  return findWowlistFacebookPublicArtifactRisk(text) !== null;
}
