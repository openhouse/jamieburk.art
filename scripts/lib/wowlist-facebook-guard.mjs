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
      /\b(?:member|community) (?:input|feedback|suggestions?|comments?|ideas?)\b.{0,120}\b(?:shap(?:e|es|ed|ing)|influenc(?:e|es|ed|ing)|inform(?:s|ed|ing)?|drives?|drove|implement(?:s|ed|ing)?|incorporat(?:e|es|ed|ing)|improv(?:e|es|ed|ing)|adopt(?:s|ed|ing)?|chang(?:e|es|ed|ing)|guid(?:e|es|ed|ing)|determin(?:e|es|ed|ing))\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\bmembers?\b.{0,60}\bwhose\b.{0,40}\b(?:input|feedback|suggestions?|comments?|ideas?)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|implemented|incorporated|changed?|guided?|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\b(?:their|member|community) (?:input|feedback|suggestions?|comments?|ideas?)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|implemented|incorporated|changed?|guided?|determined)\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\bwhere\b.{0,60}\b(?:they|members?)\b.{0,100}\b(?:shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|implemented|incorporated|changed?|guided?|determined|co[- ]design(?:ed|ing)?)\b.{0,120}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b.{0,120}\b(?:incorporat(?:ed|ing)|implement(?:ed|ing)|based\b.{0,40}\bon|changed\b.{0,40}\bafter|shap(?:ed|ing)|influenc(?:ed|ing)|inform(?:ed|ing)|drove|reflected)\b.{0,140}\b(?:members?|community|suggestions?|comments?|feedback|input|ideas?)\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern: /\bteam\b.{0,100}\b(?:adopt(?:ed|ing)|implement(?:ed|ing)|used)\b.{0,100}\bmember suggestions?\b/is
  },
  {
    label: "embedded member product-influence claim",
    pattern:
      /\b(?:community )?members?\b.{0,100}\binvited\b.{0,160}\b(?:and|then|where)\b.{0,80}\b(?:they|members?)?\s*(?:shap(?:e|es|ed|ing)|influenc(?:e|es|ed|ing)|inform(?:s|ed|ing)?|co[- ]design(?:s|ed|ing)?)\b.{0,100}\b(?:product|design|platform|service|roadmap|features?|site|decisions?|changes?)\b/is
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
  /\b(?:provided?|gave|contributed|offered|submitted|shared|supplied|sent)\b.{0,50}\b(?:input|feedback|suggestions?|comments?|ideas?)\b|\b(?:help(?:ed)? shap(?:e|ed|ing)|shap(?:e|es|ed|ing)|influenc(?:e|es|ed|ing)|inform(?:s|ed|ing)?|improv(?:e|es|ed|ing)|adopt(?:s|ed|ing)?|chang(?:e|es|ed|ing)|guid(?:e|es|ed|ing)|drives?|drove|determin(?:e|es|ed|ing)|co[- ]design(?:s|ed|ing)?|incorporat(?:e|es|ed|ing)|integrat(?:e|es|ed|ing)|implement(?:s|ed|ing)?|reflect(?:s|ed|ing)|based\b.{0,40}\bon)\b/i;
const invitationSignal =
  /\b(?:invite(?:d|s|ing)?|invitation|asked|welcomed|encouraged)\b.{0,180}\b(?:community )?members?\b|\b(?:community )?members?\b.{0,100}\bwere invited\b/i;
const governanceDenialSignal =
  /\b(?:not|never|is not|was not|does not|did not)\b.{0,80}\b(?:community[- ]govern(?:ed|ance)|member[- ]led)\b/i;
const accountDenialSignal =
  /\b(?:does not|did not|cannot|could not|not recovered|no evidence|has not been|have not been)\b.{0,180}\b(?:establish|established|show|prove|confirm|expose|identify|indicate|support)\b|\bJamie\b.{0,80}\b(?:is not|was not|has not|had not|does not|did not)\b.{0,120}\b(?:administrator|admin|editor|manager|control|ownership|rights?|access|Page)\b/i;
const influenceDenialSignal =
  /\b(?:does not|did not|cannot|could not|no evidence|has not been|have not been|is not|was not|are not|were not|never)\b.{0,200}\b(?:establish(?:es|ed)?|shows?|proves?|confirms?|supports?|indicates?|demonstrates?|shap(?:e|es|ed|ing)|influenc(?:e|es|ed|ing)|inform(?:s|ed|ing)?|improv(?:e|es|ed|ing)|adopt(?:s|ed|ing)?|implement(?:s|ed|ing)?)\b|\b(?:member|community) (?:input|feedback|suggestions?|comments?|ideas?)\b.{0,100}\b(?:does not|did not|was not|were not|has not|had not|never)\b.{0,100}\b(?:shape|influence|inform|improve|change|guide|drive|determine|implement)\b/i;
const positiveJamieAccountSignal =
  /\bJamie\b.{0,100}\b(?:is|was|has|had|owns?|remained?|controls?|was listed as|served as|could|retained?|held|kept|maintained?|administers?|manag(?:e|es|ed|ing)|edited?|published?)\b.{0,140}\b(?:Page administrator|administrator|admin|Page editor|editor|Page manager|manager|control|ownership|admin rights?|administrator access|management access|Page settings|publish(?:ing)?|post(?:ing)? as|WOW List Page)\b/i;
const reverseJamieAccountSignal =
  /\b(?:Page settings|administrator access|admin rights?|owner controls?|Page editor|Page manager|Page administration)\b.{0,100}\b(?:available to|visible to|assigned to|held by|listed for|administered by|managed by|owned by)\b.{0,80}\bJamie\b/i;
const passiveJamieAccountSignal =
  /\b(?:WOW List )?Page\b.{0,60}\b(?:was|is)\b.{0,40}\b(?:administered|managed|owned|edited)\b.{0,40}\bby Jamie\b/i;
const jamieSocialManagementSignal =
  /\bJamie\b.{0,100}\b(?:manag(?:e|es|ed|ing)|ran|runs|handled?|administers?|controlled?|maintained?)\b.{0,120}\b(?:WOW List(?:'s)? )?(?:social presence|social media|Facebook account|Facebook Page|Page account)\b/i;
const memoryCalibrationSignal =
  /\b(?:recalls?|recollection|remembers?|believes?|memory|hypothesis|pending|corroborat(?:e|ed|ing|ion)|not established|not confirmed|needs? confirmation)\b/i;

function fragments(text) {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|yet)\b\s+|",\s+/i)
    .filter(Boolean);
}

export function findWowlistFacebookPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const item of directRiskPatterns) {
      if (!item.pattern.test(fragment)) continue;
      if (item.label.includes("governance") && governanceDenialSignal.test(fragment)) continue;
      if (item.label.includes("product-influence") && influenceDenialSignal.test(fragment)) continue;
      if (item.label.includes("account-control") && accountDenialSignal.test(fragment)) continue;
      return item.label;
    }
    if (
      (positiveJamieAccountSignal.test(fragment) ||
        reverseJamieAccountSignal.test(fragment) ||
        passiveJamieAccountSignal.test(fragment)) &&
      !accountDenialSignal.test(fragment)
    ) {
      return "positive Jamie account-control claim";
    }
    if (jamieSocialManagementSignal.test(fragment) && !memoryCalibrationSignal.test(fragment)) {
      return "uncorroborated Jamie social-management claim";
    }
    if (
      communitySignal.test(fragment) &&
      productSignal.test(fragment) &&
      influenceSignal.test(fragment) &&
      !invitationSignal.test(fragment) &&
      !influenceDenialSignal.test(fragment)
    ) {
      return "demonstrated member product influence";
    }
  }

  return null;
}

export function hasWowlistFacebookPublicArtifactRisk(text) {
  return findWowlistFacebookPublicArtifactRisk(text) !== null;
}
