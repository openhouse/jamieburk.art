const strings = (value) => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
};

const semanticUnits = (text) => {
  let units = [text];
  try {
    units = strings(JSON.parse(text));
  } catch {
    // Markdown and prose are checked one sentence or paragraph at a time.
  }
  return units.flatMap((value) =>
    value
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[*_`]/g, "")
      .split(/(?<=[.!?])\s+|\n\s*\n/)
      .map((unit) => unit.replace(/\s+/g, " ").trim())
      .filter(Boolean),
  );
};

const kcSignal = /\b(?:KC Spaces Fund|KCSpacesFund|kcspacesfund)\b/i;
const facebookSignal = /\b(?:Facebook|Page|posts?|timeline|ledger|Meta|account)\b/i;
const completeSignal =
  /\b(?:complete|entire|every|all|full|whole|exhaustive|definitive|authoritative|100%|lifetime|only 40|no .* missing)\b/i;
const historySignal = /\b(?:history|archive|posts?|timeline|population|record|output|published)\b/i;
const currentSurfaceBoundary =
  /\b(?:currently accessible|surviving public|current public|materialized|not a native Meta (?:owner )?export|not .* deletion history|may .* missing|does not establish every|not .* lifetime|not .* complete)\b/i;
const protectedOmissionSignal =
  /\b(?:omit|omits|omitted|withhold|withholds|withheld|exclude|excludes|excluded)\b.{0,80}\b(?:full post transcripts?|personal|private|authenticated|contact)\b/i;

const jamieSignal = /\bJamie(?:'s)?\b/i;
const accountRoleSignal =
  /\b(?:posted|published|owned|administered|managed|operated|ran|controlled|publisher|administrator|admin|account owner|Page owner)\b/i;
const campaignRoleSignal =
  /\b(?:organized|organizer|ran the fundraiser|fundraiser owner|raised \$?9,?590|made grant decisions|grant decisions?|fiscal sponsor)\b/i;
const roleBoundary =
  /\b(?:did not|does not|was not|is not|do not|cannot|no .* assigns?|not assigned|unresolved|pending corroboration|first-person memory|do not frame|do not say)\b/i;

const metricSignal =
  /\b(?:119|108 followers?|reactions?|comments?|interactions?|response signals?|visible floor)\b/i;
const impactSignal =
  /\b(?:people|reach|reached|impressions?|attendance|attended|endorsement|endorsed|partnership|conversion|impact|caused|causality|influence|traction|success)\b/i;
const metricBoundary =
  /\b(?:not|does not|do not|cannot|is not|are not|was not|were not)\b.{0,100}\b(?:people|reach|impressions?|attendance|endorsement|partnership|conversion|impact|causality|traction)\b/i;

const namingSignal =
  /\b(?:uniform|consistent|same|available).{0,100}\b(?:identity|name|handle|domain|platform|social)\b|\b(?:named|chose|selected|registered).{0,60}\bKC Spaces Fund\b/i;
const namingCreditSignal =
  /\bJamie\b.{0,120}\b(?:named|chose|selected|registered|created|established|authored)\b|\b(?:named|chose|selected|registered|created|established|authored)\b.{0,120}\bJamie\b/i;
const namingBoundary =
  /\b(?:memory|recalls?|pending corroboration|does not establish|does not prove|not automatic|do not convert|not .* authorship|unresolved|restricted)\b/i;

const fundraiserSignal = /\b(?:\$9,?590|\$9,?500|107 donations?)\b/i;
const individualOutcomeSignal =
  /\bJamie\b.{0,100}\b(?:raised|secured|delivered|generated|produced|caused)\b|\b(?:raised|secured|delivered|generated|produced|caused)\b.{0,100}\bJamie\b/i;

const spotlightSignal = /\b(?:ten|10)\b.{0,80}\b(?:spotlights?|grants?|grantees?|awards?)\b/i;
const granteeInflationSignal =
  /\b(?:exactly|all|every|complete|entire|total)\b.{0,60}\b(?:grants?|grantees?|awards?|disbursements?)\b|\b(?:awarded|gave)\b.{0,30}\b(?:ten|10)\b.{0,30}\bgrants?\b/i;
const granteeBoundary =
  /\b(?:not|does not|do not|cannot|is not|are not)\b.{0,100}\b(?:complete grantee|verified awards?|exact grant|disbursement|awarded exactly)\b/i;

export function findKcSpacesFundFacebookPublicArtifactRisk(text) {
  for (const unit of semanticUnits(text)) {
    if (
      (kcSignal.test(unit) || facebookSignal.test(unit)) &&
      facebookSignal.test(unit) &&
      completeSignal.test(unit) &&
      historySignal.test(unit) &&
      !currentSurfaceBoundary.test(unit) &&
      !protectedOmissionSignal.test(unit)
    ) {
      return "lifetime-population overclaim";
    }

    if (
      jamieSignal.test(unit) &&
      kcSignal.test(unit) &&
      (accountRoleSignal.test(unit) || campaignRoleSignal.test(unit)) &&
      !roleBoundary.test(unit)
    ) {
      return accountRoleSignal.test(unit)
        ? "individual account-role overclaim"
        : "individual campaign-role overclaim";
    }

    if (
      metricSignal.test(unit) &&
      impactSignal.test(unit) &&
      !metricBoundary.test(unit)
    ) {
      return "interaction-impact inflation";
    }

    if (
      namingSignal.test(unit) &&
      namingCreditSignal.test(unit) &&
      !namingBoundary.test(unit)
    ) {
      return "individual naming-credit overclaim";
    }

    if (
      fundraiserSignal.test(unit) &&
      individualOutcomeSignal.test(unit) &&
      !roleBoundary.test(unit)
    ) {
      return "individual fundraising-credit overclaim";
    }

    if (
      spotlightSignal.test(unit) &&
      granteeInflationSignal.test(unit) &&
      !granteeBoundary.test(unit)
    ) {
      return "grantee-population inflation";
    }
  }
  return null;
}

export function hasKcSpacesFundFacebookPublicArtifactRisk(text) {
  return findKcSpacesFundFacebookPublicArtifactRisk(text) !== null;
}
