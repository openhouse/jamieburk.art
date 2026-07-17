import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { callNycCorpusFindings, callNycPopulationAudit, callNycSocialCorpus } from "../../apps/www/src/data/knowledge-bank/callnyc-social-corpus.ts";
import { googleDriveSharedDrivesProduction } from "../../apps/www/src/data/knowledge-bank/google-drive-shared-drives-production.ts";
import { jamiePersonalFacebookPostAudit, jamiePersonalFacebookPosts } from "../../apps/www/src/data/knowledge-bank/jamie-personal-facebook-posts.ts";
import { kcSpacesFundFacebookPostAudit, kcSpacesFundFacebookPosts } from "../../apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts.ts";
import { kcTownHallFunding } from "../../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import { kcTownHallPhaseOne } from "../../apps/www/src/data/knowledge-bank/kc-town-hall-phase-one.ts";
import { kcTownHallCorpusFindings, kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { nycacFacebookEventFindings, nycacFacebookEventPopulationAudit, nycacFacebookEvents } from "../../apps/www/src/data/knowledge-bank/nycac-facebook-events.ts";
import { nycacFacebookPostAudit, nycacFacebookPosts } from "../../apps/www/src/data/knowledge-bank/nycac-facebook-posts.ts";
import { nycacGovernmentInterface, nycacGovernmentInterfaceAudit } from "../../apps/www/src/data/knowledge-bank/nycac-government-interface.ts";
import { nycacCorpusFindings, nycacPopulationAudit, nycacSocialCorpus } from "../../apps/www/src/data/knowledge-bank/nycac-social-corpus.ts";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { participationInfrastructureAudit, participationInfrastructureProduction } from "../../apps/www/src/data/knowledge-bank/participation-infrastructure-production.ts";
import { personalWowlistFacebookEvents } from "../../apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { socialMediaArchiveProduction } from "../../apps/www/src/data/knowledge-bank/social-media-archive-production.ts";
import { teamsArchiveProduction } from "../../apps/www/src/data/knowledge-bank/teams-archive-production.ts";
import { urbanhermitCorpusFindings, urbanhermitPopulationAudit, urbanhermitSocialCorpus } from "../../apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts";
import { wowListFacebookPostAudit, wowListFacebookPosts } from "../../apps/www/src/data/knowledge-bank/wowlist-facebook-posts.ts";
import { wowlistCorpusFindings, wowlistPopulationAudit, wowlistSocialCorpus } from "../../apps/www/src/data/knowledge-bank/wowlist-social-corpus.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/knowledge-bank/evals.json");
const publicRegistryPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json");
const nycacEventLedgerPublicContractSha256 = "79b8cb8b652b01a6e96d46aa51dd47b519efc03ac3bf8514eb6cbb5141ef09d7";
const nycacLinkLedgerPublicContractSha256 = "d6d07b83b23fc23879aeaaf335900472adf14c370dd1a44ee35cdcf6159d4b02";
const nycacCanonicalGraphPublicContractSha256 = "c5d618f1d8e638354f869d0072fcb6d1820eb453463b824b6367168031f496bf";
const nycacNarrativePublicContractSha256 = "925d39817101fb4a4bb98282cb6d88e64e3033abf13641f5c51e560c13f7b37e";
const kcStar2007SourceArtifactSha256 = "8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3";
const kcStar2007SourceTextExtractionSha256 = "7dd0ce52eb9e550f56cdb606760a29026f6a8d25c0a04f43a9f4aa949fd75967";
const kcStar2007ContractSealSha256 = "b5105d75f4c7335af362a2985435b4129f6f895349b8ea54fb80bba4e9a83a6e";
const kcStar2007ExpectedIncludedCount = 47;
const kcStar2007ExpectedDispositionSubjects = [
  "family reaction and household context",
  "personal theft and financial loss during the interruption",
  "rough sleeping and day-night travel routine",
  "sandbar, electrical-storm, and other route-hazard anecdotes",
  "participant education and prior-project backstory",
  "Huckleberry Finn framing and participant response to it",
  "competing Coast Guard, crew, and participant interpretations",
  "equipment changes after the intervention",
  "private email excerpt about leaving Vicksburg",
  "Paul Kelly Loyacono admiration statement",
  "anticipated tow support after reaching salt water"
];

export function loadKnowledgeEvalSuite() {
  return JSON.parse(readFileSync(suitePath, "utf8"));
}

function score(passed, strong = true) {
  return passed ? (strong ? 5 : 4) : 1;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizedAttributionText(value) {
  return JSON.stringify(value, (_key, item) =>
    typeof item === "string"
      ? item
        .normalize("NFKC")
        .replace(/\p{Default_Ignorable_Code_Point}/gu, "")
        .replace(/[\p{P}\p{S}\p{M}]+/gu, " ")
        .replace(/\s+/g, " ")
      : item
  )
    .replace(/\s+/g, " ");
}

function publicRegistryContainsId(publicRegistryText, id) {
  if (publicRegistryText.includes(id)) return true;
  try {
    return JSON.stringify(JSON.parse(publicRegistryText)).includes(id);
  } catch {
    return false;
  }
}

function attributesKcStarWaterwaysSource(value) {
  const text = normalizedAttributionText(value);
  if (/\b(?:In the name of art go with the flow|Darryl Levings)\b/i.test(text)) {
    return true;
  }
  return /\b(?:Kansas City Star|KC Star|The Star)\b/i.test(text) &&
    /\b(?:raft|river|voyage|expedition|crew|Gulf|salt water|Hendon|Mattingly|Coast Guard|Vicksburg|Baton Rouge|New Orleans)\b/i.test(text);
}

function reviewedRecordSetDigest(records) {
  return sha256(JSON.stringify(
    records
      .map((record) => [record.id, record])
      .sort(([left], [right]) => left.localeCompare(right))
  ));
}

export function kcStarSourceCoverageContractSeal(manifest) {
  return sha256(JSON.stringify({
    version: manifest.version,
    sourceId: manifest.sourceId,
    sourceArtifactSha256: manifest.sourceArtifactSha256,
    sourceTextExtractionSha256: manifest.sourceTextExtractionSha256,
    sourceReceipt: manifest.sourceReceipt,
    reviewedAt: manifest.reviewedAt,
    contractRole: manifest.contractRole,
    reviewHistory: manifest.reviewHistory,
    scope: manifest.scope,
    copyrightBoundary: manifest.copyrightBoundary,
    identityNormalization: manifest.identityNormalization,
    reviewedIntakeSha256: manifest.reviewedIntakeSha256,
    reviewedSourceSha256: manifest.reviewedSourceSha256,
    reviewedInquirySha256: manifest.reviewedInquirySha256,
    reviewedDocumentationSha256: manifest.reviewedDocumentationSha256,
    reviewedRecordSha256: manifest.reviewedRecordSha256,
    reviewedClaimSha256: manifest.reviewedClaimSha256,
    relatedGraph: manifest.relatedGraph,
    included: manifest.included,
    notIncluded: manifest.notIncluded
  }));
}

export function kcStarReviewedRecordDigest(record) {
  return sha256(JSON.stringify(record));
}

export function kcStarReviewedClaimDigest(claim) {
  return kcStarReviewedRecordDigest(claim);
}

function numericRecordEquals(left, right) {
  const leftEntries = Object.entries(left ?? {}).sort(([a], [b]) => a.localeCompare(b));
  const rightEntries = Object.entries(right ?? {}).sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(leftEntries) === JSON.stringify(rightEntries);
}

function stringSetEquals(values, expectedValues) {
  if (!Array.isArray(values) || !Array.isArray(expectedValues)) return false;
  return values.length === new Set(values).size &&
    values.length === expectedValues.length &&
    values.every((value) => expectedValues.includes(value));
}

function normalizeInspectionText(value) {
  return String(value)
    .normalize("NFKC")
    .replace(/\p{Cf}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function containsUnsafeAttendanceConversion(text) {
  const normalized = normalizeInspectionText(text);
  const sentenceText = normalized.replace(/(?<=\d)\.(?=\d)/g, "__DECIMAL__");
  const sentences = sentenceText.match(/[^.!?;]+[.!?;]?/g) ?? [];
  const signalPattern = /\b(?:(?:Facebook|platform(?:['’]s)?)\b[^.?!;]{0,70}\b(?:event\s+)?(?:responses?|replies|RSVPs?|numbers?|figures?|confirmations?|tall(?:y|ies)|counts?|totals?|metrics?|counter|indicator|clicks?|Going|Interested|acknowledgments?)|(?:responses?|replies|RSVPs?|numbers?|figures?|confirmations?|tall(?:y|ies)|counts?|totals?|metrics?|counter|indicator|clicks?|Going|Interested|people\s+responding)\b[^.?!;]{0,70}\b(?:Facebook|platform)|response\s+(?:totals?|counts?|figures?|numbers?|metrics?)|RSVPs?|(?:numbers?|counts?|figures?|people)\s+(?:responding|responded)\s+(?:on\s+)?Facebook|(?:clicked|clicking)\s+(?:Going|Interested)\s+on\s+Facebook|(?:Facebook\s+)?event[- ]card\s+(?:counter|signal|figure|total|clicks?|responses?)|blue[- ]button\s+(?:counter|total|figure)|event[- ]page\s+acceptances?|social\s+RSVP\s+roll|Going\s+marks?|platform\s+acknowledgments?|digital\s+replies)\b/i;
  const outcomePattern = /\b(?:attend(?:ance|ed|ees?)|turnout|footfall|room[- ]fill|head\s*count|gate\s*count|door\s*(?:count|sheet)|crowd\s+size|audience(?:\s+size|\s+in\s+person)?|packed\s+(?:hall|house|room|venue)|\d[\d,]*(?:-strong|\s+strong)\s+(?:hall|house|room|venue)|fill(?:ed|ing|s)?\s+(?:the\s+)?(?:hall|house|room|venue)|bodies?\s+(?:under\s+one\s+roof|in\s+the\s+room)|(?:seats?|chairs?)\s+(?:occupied|filled)|(?:occupied|filled)\s+(?:seats?|chairs?)|people\s+in\s+(?:the\s+)?(?:hall|room|seats)|(?:visitors?|neighbors?)\s+(?:arrived|present|physically\s+present)|entered\s+(?:the\s+)?building|crossed\s+(?:the\s+)?(?:venue\s+)?threshold|on[- ]site\s+(?:population|count|presence)|in[- ]person\s+(?:presence|count|audience)|physical\s+presence|people\s+(?:who\s+)?(?:present|reached|showed|showing|attended|arrived|entered|backed|supported|came\s+through\s+the\s+door)\s*(?:up|in\s+the\s+room|the\s+campaign)?|number\s+(?:who|of\s+people)\s+(?:arrived|attended|entered|came\s+through\s+the\s+door)|count\s+of\s+people\s+present|distinct\s+participants?|(?:total|unique)\s+(?:people|individuals?|reach)|(?:live[- ]room\s+)?census(?:\s+of\s+(?:the\s+)?(?:room|venue|coalition['’]s\s+supporters?))?|constituency\s+(?:size|reached)|size\s+of\s+(?:the\s+)?constituency|community\s+mandate|vote\s+of\s+confidence|campaign\s+(?:reach|spread|travel(?:ed|led))|participation|endorsement|impact|repeal|law|policy\s+outcome|agency\s+outcome)\b/i;
  const referentPattern = /\b(?:they|them|those|these|this|it|that|value|indicator|counter|clicks?|the\s+(?:same\s+)?(?:value|figures?|numbers?|counts?|totals?|signals?|tall(?:y|ies)|confirmations?)|the\s+same\s+number)\b/i;
  const outerNegationPattern = /\b(?:(?:it|that)\s+is|it's)\s+(?:not\s+)?(?:false|untrue|incorrect)\s+that\b|\bnot\s+(?:true|false)\s+that\b|\b(?:the\s+)?(?:claim|statement|assertion|idea|belief|proposition)\s+that\b[^.?!;]{0,180}\b(?:is|was)\s+(?:not\s+)?(?:false|untrue|incorrect|unsupported)\b/i;
  let signalContext = 0;

  for (const rawSentence of sentences) {
    const sentence = rawSentence.trim();
    if (!sentence) continue;
    const rejectsQuotedClaim = /\b(?:quote[sd]?|phrase|wording|claim|statement)\b[^.?!;]{0,180}\b(?:only\s+to\s+reject|is\s+prohibited|we\s+reject|must\s+not\s+be\s+used|appears?\s+only\s+as\s+(?:a\s+)?claim\s+we\s+reject)\b/i.test(sentence);
    if (rejectsQuotedClaim) continue;
    const hasDirectSignal = signalPattern.test(sentence);
    const hasSignalReferent = signalContext > 0 && referentPattern.test(sentence);
    const hasSignal = hasDirectSignal || hasSignalReferent;
    const hasOutcome = outcomePattern.test(sentence);

    if (hasSignal && hasOutcome) {
      if (outerNegationPattern.test(sentence)) return true;

      const directNegation = /\b(?:do|does|did)\s+not\s+(?:establish|prove|verify|measure|represent|equal|demonstrate|track|validate|count|convert|backfill|show|indicate|support|determine|substantiate)\b/i.test(sentence);
      const cannotRelate = /\b(?:cannot|can't|can\s+not)\s+(?:be\s+)?(?:used|treated|read|interpreted|counted|mistaken|converted|summed|understood|establish(?:ed)?|prov(?:e|ed)|verif(?:y|ied)|measur(?:e|ed)|represent(?:ed)?|show(?:n)?|indicat(?:e|ed)|support(?:ed)?|determin(?:e|ed)|substantiat(?:e|ed)|tell|infer(?:red)?)\b/i.test(sentence);
      const neverRelate = /\b(?:should|must)\s+never\s+(?:be\s+)?(?:used|treated|read|interpreted|counted|mistaken|converted|summed|understood)\b/i.test(sentence);
      const deniedCopula = /\b(?:is|are|was|were)\s+(?:also\s+)?(?:not|never)\s+(?:(?:an?|the)\s+)?(?:(?:valid|reliable)\s+)?(?:evidence|proof|measure|count|indicator|proxy)?\s*(?:of|for|as|that)?\s*(?:unique[- ]person\s+(?:or|and)\s+)?(?:physical\s+)?(?:attendance|turnout|head\s*count|crowd\s+size|audience\s+size|unique\s+(?:people|reach)|participation|endorsement|impact|policy\s+outcome)\b(?:\s+(?:counts?|measures?))?/i.test(sentence);
      const explicitContrastBoundary = /\b(?:is|are|was|were)\b[^.?!;]{0,80},\s+(?:but\s+)?not\s+(?:(?:an?|the)\s+)?(?:attendance|turnout|head\s*count|crowd\s+size|audience\s+size|physical\s+presence|participation|endorsement|impact)\b/i.test(sentence);
      const explicitInstruction = /\b(?:never|must\s+not|do\s+not|does\s+not)\s+(?:claim\s+that\s+)?(?:be\s+)?(?:convert(?:ed)?|backfill(?:ed)?|treat(?:ed)?|read|interpret(?:ed)?|use(?:d)?|summed?|claim(?:ed)?|equate(?:d)?|count(?:ed)?|infer(?:red)?|mistake(?:n)?)\b/i.test(sentence);
      const noEvidenceBoundary = /\b(?:there\s+(?:is|was)\s+no\s+(?:evidence|proof|support)|(?:is|are|was|were)\s+not\s+(?:evidence|proof|support)\s+that|(?:provide|provides|provided|give|gives|gave|offer|offers|offered|supply|supplies|supplied|constitute|constitutes|constituted)\s+no\s+(?:evidence|proof|support|measure|measurement|indicator|proxy)|(?:is|are|was|were)\s+insufficient\s+(?:evidence|proof|support))\s+(?:of|for|that)?\b/i.test(sentence);
      const separationBoundary = /\b(?:(?:must|should)\s+be\s+kept|keep)\s+[^.?!;]{0,60}\b(?:separate|distinct)\b|\b(?:are|remain|stayed|were)\s+(?:independent|separate|distinct)\s+(?:measurements?|measures?|signals?|datasets?|records?)\b|\b(?:independent|separate)\s+(?:reporting|measurement|source)\b|\b(?:separately|independently)\s+(?:reported|measured|documented|counted|described)\b|\b(?:non[- ]equivalence|not\s+equivalent)\b|\bdo\s+not\s+(?:conflate|collapse)\b|\b(?:say|says|said|tell|tells|told)\s+nothing\s+about\b|\bno\s+(?:valid\s+)?inference\b[^.?!;]{0,80}\b(?:from|between)\b/i.test(sentence);
      const directBoundary = directNegation || cannotRelate || neverRelate || deniedCopula || explicitContrastBoundary || explicitInstruction || noEvidenceBoundary || separationBoundary;
      const positiveReversal = /\b(?:although|though|whereas|but|however|yet|therefore|nevertheless|actually|in\s+fact|and\s+therefore)\b[^.?!;]{0,120}\b(?:equal(?:s|ed)?|represent(?:s|ed)?|demonstrat(?:e[sd]?|ing)|establish(?:es|ed)?|prov(?:e[sd]?|ing)|verif(?:y|ies|ied)|measur(?:e[sd]?|ing)|track(?:s|ed)?|validat(?:e[sd]?|ing)|count(?:s|ed)?|match(?:es|ed)?|correspond(?:s|ed)?\s+to)\b|\b(?:although|though|whereas|but|however|yet|therefore|nevertheless|actually|in\s+fact|and\s+therefore)\b[^.?!;]{0,120}\b(?:is|are|was|were)\s+(?:the\s+)?(?:attendance|turnout|head\s*count|crowd\s+size|audience\s+size|physical\s+presence)\b/i.test(sentence);

      if (!directBoundary || positiveReversal) return true;
    }

    if (hasDirectSignal) signalContext = 2;
    else if (hasSignalReferent) signalContext = Math.max(signalContext - 1, 1);
    else signalContext = 0;
  }

  return false;
}

export function containsNycacSoleCreditClaim(text) {
  const normalized = normalizeInspectionText(text);
  const sentences = normalized.match(/[^.!?;]+[.!?;]?/g) ?? [];
  const productionPattern = /\b(?:work|calendar|series|events?|event\s+designs?|handiwork|brainchild|maker(?:'s|’s)?|imprint|ownership|originat(?:e[sd]?|ing|or)|stag(?:e[sd]?|ing)|design(?:e[sd]?|ing|s)|organiz(?:e[sd]?|ing|ation)|produc(?:e[sd]?|ing|tion|er)|author(?:ed|ing|ship)?|creat(?:e[sd]?|ing|ion|or)|ran|run|led|lead|manag(?:e[sd]?|ing|er)|coordinat(?:e[sd]?|ing|ion|or)|secur(?:e[sd]?|ing)|own(?:ed|ership)?|credit|responsib(?:le|ility))\b/i;
  const exclusivePattern = /\b(?:all|every|each|entire|entirely|whole|wholly|(?:full|complete|total)\s+(?:(?:production|policy|event)\s+)?(?:responsibility|credit|control|authorship)|completely|totally|singular|sole|solely|only|exclusive|exclusively|independently|alone|by\s+himself|himself|single[- ]handedly|single\s+hand|one\s+(?:person|individual)|nobody|no\s+one|without|but\s+for|from\s+start\s+to\s+finish|end[- ]to[- ]end|100\s*(?:%|percent))\b/i;
  const policyPattern = /\b(?:law|legislation|policy|repeal|office|agency|passage|public\s+outcome)\b/i;
  const causalityPattern = /\b(?:caus(?:e[sd]?|ality)|catalyst|legacy|unlock(?:ed|ing|s)?|secur(?:e[sd]?|ing)|pass(?:ed|age)|succeed(?:ed|s)?|exist(?:s|ed)?|achiev(?:e[sd]?|ement)|accomplish(?:ed|ment)|deliver(?:ed|y)|(?:get|gets|got|getting)\s+(?:the\s+)?(?:law|policy|repeal)\s+over\s+the\s+line|came\s+into\s+being|(?:made|make)\s+(?:(?:the\s+)?(?:law|policy|repeal|series)[^.?!;]{0,20}|it\s+)happen|made\s+(?:the\s+)?series\s+possible|happen(?:ed)?|owed\s+its\s+existence|owing\s+(?:entirely|solely)\s+to|thanks\s+to|(?:never\s+)?would\s+not\s+have\s+passed|but\s+for|due\s+to|attributable\s+to)\b/i;
  const namesJamiePattern = /\bJamie(?:['’]s|s)?\b/i;
  const jamiePronounPattern = /\b(?:he|him|his)\b/i;
  const outerNegationPattern = /\b(?:(?:it|that)\s+is|it's)\s+(?:false|untrue|incorrect)\s+that\b|\bnot\s+true\s+that\b|\b(?:the\s+)?(?:claim|statement|assertion|idea)\s+that\b[^.?!;]{0,180}\b(?:is|was)\s+(?:false|untrue|incorrect)\b/i;
  let jamieContext = 0;
  let policyContext = 0;

  if (/\b(?:all|sole|exclusive)\s+credit\b[^.?!;]{0,120}\b(?:creator|producer|author|organizer)\b[^.?!]{0,10}[.?!]\s*Jamie\b[^.?!;]{0,50}\b(?:was|is)\s+(?:that|the)\s+(?:creator|producer|author|organizer)\b/i.test(normalized)) {
    return true;
  }
  if (/\b(?:who|what)\s+made\s+(?:the\s+)?(?:calendar|series|events?)\s+possible\b[^.?!]{0,15}[.?!;]\s*(?:the\s+)?answer\s+(?:is|was)\s+Jamie\b/i.test(normalized)) {
    return true;
  }
  if (/\bno\s+(?:page|event|invitation|description)\b[^.?!;]{0,100}\b(?:hand|author|maker|producer)\b[^.?!;]{0,50}\bother\s+than\s+Jamie(?:['’]s)?\b/i.test(normalized) ||
      /\bauthorship\b[^.?!;]{0,100}\btraces?\s+back\s+to\s+Jamie\b/i.test(normalized) ||
      /\bremove\s+Jamie\b[^.?!;]{0,100}\b(?:repeal|law|policy|office|agency)\b[^.?!;]{0,60}\b(?:disappears?|vanishes?|fails?|does\s+not\s+exist)\b/i.test(normalized) ||
      /\b(?:City\s+Hall['’]s\s+decision|repeal|law|policy|office|agency)\b[^.?!;]{0,100}\bbears?\s+Jamie(?:['’]s)?\s+fingerprints?\b/i.test(normalized) ||
      /\bcoalition\b[^.?!]{0,80}\b(?:masthead|name|banner|shell)\b[^.?!]{0,100}\bJamie\b[^.?!]{0,100}\b(?:supplied|built|made|created|owned)\b[^.?!]{0,50}\b(?:event\s+machine|system|calendar|series|everything\s+that\s+made\s+the\s+events\s+real)\b/i.test(normalized) ||
      /\bJamie\b[^.?!;]{0,80}\bindispensable\s+architect\b[^.?!;]{0,80}\b(?:calendar|series|events?)\b/i.test(normalized) ||
      /\b(?:nothing|no\s+part)\b[^.?!;]{0,80}\b(?:calendar|series|events?)\b[^.?!;]{0,80}\b(?:exist|happen|occur)\w*\b[^.?!;]{0,50}\b(?:absent|without)\s+Jamie\b/i.test(normalized) ||
      /\bJamie\b[^.?!;]{0,80}\bnecessary\s+condition\b[^.?!;]{0,80}\b(?:law|policy|repeal|enactment|passage)\b/i.test(normalized)) {
    return true;
  }

  for (let index = 0; index < sentences.length; index += 1) {
    const sentence = sentences[index].trim();
    if (!sentence) continue;
    const rejectsQuotedClaim = /\b(?:quote[sd]?|phrase|wording|claim|statement)\b[^.?!;]{0,180}\b(?:only\s+to\s+reject|is\s+prohibited|we\s+reject|must\s+not\s+be\s+used|appears?\s+here\s+only\s+as\s+(?:a\s+)?claim\s+we\s+reject)\b/i.test(sentence);
    if (rejectsQuotedClaim) continue;
    const namesJamie = namesJamiePattern.test(sentence);
    const nextNamesJamie = namesJamiePattern.test(sentences[index + 1] ?? "");
    const hasPronoun = jamiePronounPattern.test(sentence);
    const refersToJamie = namesJamie || (hasPronoun && (jamieContext > 0 || nextNamesJamie));
    const claimsExclusiveProduction = refersToJamie && productionPattern.test(sentence) && exclusivePattern.test(sentence);
    const claimsOwnedProduction = refersToJamie && productionPattern.test(sentence) && (
      /\b(?:calendar|series|events?|production|program|system)\b[^.?!;]{0,80}\b(?:is|was|were|are)\s+Jamie(?:['’]s|s)\s+(?:creation|work|production|handiwork|brainchild|design|responsibility)\b/i.test(sentence) ||
      /\b(?:production\s+)?ownership\b[^.?!;]{0,80}\b(?:belongs?|belonged)\s+to\s+Jamie\b/i.test(sentence)
    );
    const claimsUnqualifiedProduction = refersToJamie &&
      /\b(?:calendar|series|every\s+event|all\s+(?:coalition\s+)?events?|event\s+designs?)\b/i.test(sentence) &&
      /\b(?:brainchild|originat(?:e[sd]?|ing)|maker(?:'s|’s)?|imprint|design(?:e[sd]?|ing|s)|stag(?:e[sd]?|ing)|creat(?:e[sd]?|ing)|produc(?:e[sd]?|ing)|author(?:ed|ing)|made\s+possible)\b/i.test(sentence) &&
      !/\b(?:helped|supported|contributed\s+to|co[- ]|with\s+(?:the\s+)?(?:coalition|collaborators?|team|partners?)|alongside)\b/i.test(sentence);
    const hasPolicyContext = policyPattern.test(sentence) || policyContext > 0;
    const hasDirectPolicyCausality = causalityPattern.test(sentence) ||
      /\b(?:achievement|cause|because\s+of|without|direct\s+result\s+of)\b/i.test(sentence);
    const causalityIsQualified = /\b(?:helped|supported|contributed\s+to|participated\s+in|worked\s+with|alongside|as\s+one\s+of)\b/i.test(sentence);
    const claimsExclusivePolicyCausality = refersToJamie && hasPolicyContext && hasDirectPolicyCausality &&
      (exclusivePattern.test(sentence) || !causalityIsQualified);

    if (claimsExclusiveProduction || claimsOwnedProduction || claimsUnqualifiedProduction || claimsExclusivePolicyCausality) {
      if (outerNegationPattern.test(sentence)) return true;

      const directlyDeniesExclusiveRole = /\b(?:Jamie|he)\b[^.?!;]{0,60}\b(?:is|was)\s+not\s+(?:(?:the\s+)?(?:sole|only|exclusive|one\s+(?:person|individual))|(?:solely|exclusively)\s+responsible|alone\s+in)\b/i.test(sentence) ||
        /\b(?:Jamie|he)\b[^.?!;]{0,60}\b(?:isn't|wasn't)\s+(?:(?:the\s+)?(?:sole|only|exclusive)|(?:solely|exclusively)\s+responsible)\b/i.test(sentence) ||
        /\b(?:Jamie|he)\b[^.?!;]{0,35}\b(?:did|does|do)\s+not\s+(?:solely|exclusively|alone|single[- ]handedly)?\s*(?:organize|produce|author|create|run|lead|manage|coordinate|cause|deliver|achieve|accomplish)\b/i.test(sentence) ||
        /\b(?:did|does|do)\s+not\s+(?:solely|exclusively|alone|single[- ]handedly)\s+(?:organize|produce|author|create|run|lead|manage|coordinate|cause|deliver|achieve|accomplish)\b/i.test(sentence) ||
        /\b(?:Jamie|he)\b[^.?!;]{0,35}\bnever\s+(?:solely|exclusively|alone|single[- ]handedly)\s+(?:caused?|delivered?|achieved?|accomplished?|made)\b/i.test(sentence) ||
        /\b(?:calendar|series|events?|law|legislation|policy|repeal)\b[^.?!;]{0,60}\b(?:is|are|was|were)\s+not\s+(?:organized|produced|authored|created|run|led|managed|coordinated|caused|delivered)\s+by\s+(?:Jamie|him)\s+(?:alone|solely|exclusively|single[- ]handedly)\b/i.test(sentence) ||
        /\b(?:law|legislation|policy|repeal)\b[^.?!;]{0,60}\b(?:did|does|do)\s+not\s+(?:pass|happen)\s+(?:solely|only|exclusively)?\s*(?:because\s+of|through)\s+Jamie\b/i.test(sentence) ||
        /\b(?:law|legislation|policy|repeal)\b[^.?!;]{0,60}\b(?:is|are|was|were)\s+not\s+(?:solely|only|exclusively)?\s*(?:Jamie's|his)\s+(?:achievement|accomplishment|doing|work)\b/i.test(sentence);
      const instructsAgainstExclusiveCredit = /\b(?:no\s+one\s+should|do\s+not|does\s+not|did\s+not)\s+(?:claim|infer|assign|attribute|state|say)\b[^.?!;]{0,140}\bJamie\b/i.test(sentence) &&
        !/\b(?:however|nevertheless|actually|in\s+fact)\b/i.test(sentence);
      const epistemicBoundary = /\b(?:do|does|did)\s+not\s+(?:[^.?!;]{0,40}\s)?(?:establish|prove|show|demonstrate|support|assign)\b[^.?!;]{0,160}\bJamie\b/i.test(sentence) ||
        /\bnot\s+(?:(?:an?|the)\s+)?(?:[^.?!;]{0,100}\s)?(?:claim|assertion|statement)\s+that\s+Jamie\b/i.test(sentence) ||
        /\b(?:cannot\s+be|must\s+not\s+be)\b[^.?!;]{0,180}\b(?:attributed|assigned)\b[^.?!;]{0,100}\bJamie\b/i.test(sentence) ||
        /\bthere\s+(?:is|was)\s+no\s+evidence\s+that\b[^.?!;]{0,180}\bJamie\b/i.test(sentence);
      const collaborativeBoundary = /\b(?:co[- ](?:produced?|organized?|created?|led)|helped?\s+(?:produce|organize|create|lead))\b[^.?!;]{0,120}\b(?:with|alongside)\s+(?:the\s+)?(?:coalition|collaborators?|team|partners?)\b/i.test(sentence) ||
        /\bJamie\s+and\s+(?:the\s+)?(?:coalition|collaborators?|team|partners?)\b[^.?!;]{0,120}\b(?:organized?|produced?|created?|led)\b/i.test(sentence) ||
        /\bJamie\s+was\s+one\s+contributor\s+among\s+many\b/i.test(sentence) ||
        /\b(?:collaborators?|the\s+coalition|the\s+team|partners?)\b[^.?!;]{0,80}\b(?:produced?|organized?|created?|led|authored?)\s+(?:them|(?:all|every)\s+(?:event|event\s+description)|the\s+(?:events?|calendar|series))\b/i.test(sentence);
      if (!directlyDeniesExclusiveRole && !instructsAgainstExclusiveCredit && !epistemicBoundary && !collaborativeBoundary) return true;
    }

    if (namesJamie) jamieContext = 3;
    else if (jamieContext > 0) jamieContext -= 1;

    if (policyPattern.test(sentence)) policyContext = 2;
    else if (policyContext > 0) policyContext -= 1;
  }

  return false;
}

function containsNycacHeldInterpretation(text) {
  const normalized = normalizeInspectionText(text);
  return /\b(?:democracy\s+lab|democratic\s+listening\s+(?:and\s+translation\s+)?practice|(?:civic|democratic|participatory)\s+(?:experiment(?:ation)?|laboratory|lab|workshop)|civic\s+sensorium|municipal\s+synapse|(?:the\s+)?city(?:'s|’s|s)\s+nervous\s+system|(?:city|cultural\s+advocates?)\b[^.?!;]{0,60}\b(?:sensory|neural|nervous|listening)\s+(?:network|system)|believ(?:e|es|ed|ing)\s+artists|artists?['’]?\s+(?:testimony|voices?|lived\s+knowledge)\b[^.?!;]{0,60}\b(?:as\s+)?(?:truth|authoritative|authority)|artists?\b[^.?!;]{0,50}\bauthoritative\s+witnesses?|events?\s+as\s+(?:an?\s+)?art\s+form|(?:events?|gatherings?|event\s+circuit)\b[^.?!;]{0,50}\b(?:creative\s+works?|art\s+forms?|public\s+artwork)|expanded?\s+(?:the\s+)?public\s+imagination|(?:event\s+sequence|gatherings?|practice)\b[^.?!;]{0,80}\b(?:broaden(?:ed|ing)|expanded?|compos(?:e[sd]?|ing))\b[^.?!;]{0,60}\b(?:possible|possibility|imagination)|(?:participatory\s+)?(?:ear|listening\s+practice)\b[^.?!;]{0,100}\b(?:lived\s+experience|government|civic\s+action))\b/i.test(normalized) ||
    /\b(?:convenings?|event\s+(?:circuit|sequence|series)|recurring\s+(?:sequence|gatherings?))\b[^.?!;]{0,100}\b(?:sensorium|synapse|authoritative\s+witness|artists?['’]\s+lived\s+knowledge)\b/i.test(normalized) ||
    /\b(?:event\s+(?:series|system|practice|sequence)|recurring\s+gatherings?|participation\s+system)\b[^.?!;]{0,100}\b(?:caus(?:e[sd]?|ing)|deliver(?:ed|ing)|produced?|converted?)\b[^.?!;]{0,80}\b(?:policy|law|legislation|repeal|agency|city\s+reform|government\s+action)\b/i.test(normalized) ||
    /\b(?:meetings?|convening\s+network|sequence)\b[^.?!;]{0,80}\b(?:civic\s+circulatory\s+system|City\s+Hall['’]s\s+collective\s+ear|socially\s+engaged\s+art|horizon\s+of\s+civic\s+possibility)\b/i.test(normalized) ||
    /\bartists?['’]\s+lived\s+accounts?\b[^.?!;]{0,80}\bfinal\s+word\b[^.?!;]{0,80}\bmunicipal\s+decisions?\b/i.test(normalized);
}

function containsPersonalIdentityMaterial(value) {
  const normalized = normalizeInspectionText(value);
  const labeledName = /\b(?:[Gg]uests?|[Aa]ttendees?|[Pp]articipants?|[Ii]nvitees?|[Ii]nvited\s+by)\b(?:\s*(?:No\.?|#|№)\s*\d+)?\s*(?::|#|-|–|—)?\s+\p{Lu}[\p{L}'’-]+(?:\s+\p{Lu}[\p{L}'’-]+){1,3}/u;
  const labeledCaseInsensitiveName = /\b(?:guests?|attendees?|participants?|invitees?|invited\s+by|names?|(?:door|check[- ]in|private)\s+roster)\b(?:\s*(?:no\.?|#|№)\s*\d+)?\s*(?:(?::|#|-|–|—)\s*[\p{L}'’-]+(?:\s+[\p{L}'’-]+){0,3}|[\p{L}'’-]+\s+[\p{L}'’-]+(?:\s+[\p{L}'’-]+){0,2})(?=$|[\s,.;)])/iu;
  const separatorFreeLabel = /\b(?:guest|attendee|participant|invitee)(?:no\.?|#|№)?\d*\p{Lu}[\p{L}'’-]+(?:\s+\p{Lu}[\p{L}'’-]+){1,3}/u;
  const numberedNameList = /(?:^|\s)\d+\s*(?:[).:#-]|№)\s*[\p{L}'’-]+(?:\s+[\p{L}'’-]+){1,3}\s*(?:;|,)\s*\d+\s*(?:[).:#-]|№)\s*[\p{L}'’-]+(?:\s+[\p{L}'’-]+){1,3}/iu;
  const directContact = /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i;
  return labeledName.test(normalized) || labeledCaseInsensitiveName.test(normalized) || separatorFreeLabel.test(normalized) ||
    numberedNameList.test(normalized) || directContact.test(normalized);
}

function containsExplicitPersonalIdentityMaterial(value) {
  const normalized = normalizeInspectionText(value);
  const explicitlyLabeledName = /\b(?:[Gg]uests?|[Aa]ttendees?|[Pp]articipants?|[Ii]nvitees?|[Gg]uestbook\s+(?:records?|lists?)|[Dd]oor\s+[Ll]ist|(?:[Dd]oor|[Cc]heck[- ]in|[Pp]rivate)\s+[Rr]oster)\b(?:\s*(?:[Nn]o\.?|#|№)\s*\d+)?\s*(?:(?::|#|-|–|—)\s*|(?:was\s+present|includes?|names?|lists?)\s+)\p{Lu}[\p{L}'’-]+(?:\s+\p{Lu}[\p{L}'’-]+){1,3}\b/u;
  const directContact = /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b[A-Z0-9._%+-]+\s*(?:\[|\()?at(?:\]|\))?\s*[A-Z0-9.-]+\s*(?:\[|\()?dot(?:\]|\))?\s*[A-Z]{2,}\b|\b(?:\+?1[-. •]?)?\(?\d{3}\)?[-. •]\d{3}[-. •]\d{4}\b)/i;
  return explicitlyLabeledName.test(normalized) || directContact.test(normalized);
}

function containsProtectedLocator(value) {
  return /(?:https?:\/\/)?(?:docs|drive)\s*\.\s*google\s*\.\s*com(?::\d+)?\/|(?:https?:\/\/)?(?:[a-z0-9-]+\.)?zoom\.us(?::\d+)?\/(?:j|my|w|wc\/join)\/|(?:https?:\/\/)?meet\.google\.com(?::\d+)?\/[a-z0-9-]+|(?:https?:\/\/)?(?:teams\.microsoft\.com|teams\.live\.com)(?::\d+)?\/(?:l\/meetup-join|meet)\/|(?:https?:\/\/)?meet\.jit\.si(?::\d+)?\/|(?:https?:\/\/)?(?:[a-z0-9-]+\.)?webex\.com(?::\d+)?\/|(?:https?:\/\/)?(?:[a-z0-9-]+\.)?gotomeeting\.com(?::\d+)?\/|(?:https?:\/\/)?whereby\.com(?::\d+)?\/|(?:https?:\/\/)?(?:www\.)?notion\.(?:so|site)(?::\d+)?\/|(?:https?:\/\/)?[a-z0-9-]+\.sharepoint\.com(?::\d+)?\/|[?&](?:X-Amz-(?:Signature|Credential)|Signature|token|access_token)=/i.test(
    normalizeInspectionText(value).replace(/hxxps?:\/\//gi, "https://").replace(/\[\.\]/g, ".")
  );
}

function containsCredentialMaterial(value) {
  return /\b(?:pin|pass\s*code|password|meeting\s+id|access\s+code|room\s+code|credential|secret\s+(?:key|code|token)|api\s+key|token)\b\s*(?::|is|=)?\s*[A-Z0-9-]{4,}/i.test(
    normalizeInspectionText(value)
  );
}

function publicLinkRowIsSafe(row) {
  const allowedCategories = new Set([
    "action-or-registration-path",
    "campaign-or-organization",
    "public-resource",
    "published-article",
    "unresolved-short-link",
    "working-document"
  ]);
  const allowedDispositions = new Set(["protected", "public-lead", "research-needed", "source-routed"]);
  if (!allowedCategories.has(row.category) || !allowedDispositions.has(row.disposition)) return false;

  const strings = deepStringValues(row).map(normalizeInspectionText);
  if (strings.some(containsProtectedLocator)) {
    return false;
  }

  if (row.publicUrl === null) return row.disposition === "protected" || row.disposition === "research-needed";
  if (row.disposition === "protected") return false;

  try {
    const urlHost = new URL(row.publicUrl).hostname.toLowerCase().replace(/^www\./, "");
    const declaredHost = row.host.toLowerCase().replace(/^www\./, "");
    return urlHost === declaredHost;
  } catch {
    return false;
  }
}

function deepStringValues(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(deepStringValues);
  if (value && typeof value === "object") return Object.values(value).flatMap(deepStringValues);
  return [];
}

function parseFacebookResponseDisplay(value) {
  if (value === null) return null;
  if (typeof value !== "string") return Number.NaN;
  const match = value.match(/^(\d+(?:\.\d+)?)(K)? people responded$/i);
  if (!match) return Number.NaN;
  return Number(match[1]) * (match[2] ? 1000 : 1);
}

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite(), fixtures = {}) {
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));
  const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
  const nycacProof = proofClaims.find((proof) => proof.id === "nyc-artist-coalition-civic-systems");
  const fairRentMdxOnDisk = readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8");
  const fairRentMdx = fixtures.fairRentMdx ?? fairRentMdxOnDisk;
  const callnycMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx"), "utf8");
  const wowlistMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8");
  const kcTownHallMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"), "utf8");
  const sundayDinnerMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/196-sunday-dinner.mdx"), "utf8");
  const workData = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const proofData = fixtures.proofData ?? readFileSync(path.join(repoRoot, "apps/www/src/data/proofs.ts"), "utf8");
  const publicRegistryTextOnDisk = readFileSync(publicRegistryPath, "utf8");
  const publicRegistryText = fixtures.publicRegistryText ?? publicRegistryTextOnDisk;
  const errors = validateKnowledgeBank();

  const pilotIntakes = suite.pilot.intakeIds.map((id) => intakeById.get(id));
  const pilotSources = suite.pilot.sourceIds.map((id) => sourceById.get(id));
  const pilotClaims = suite.pilot.claimIds.map((id) => claimById.get(id));
  const pilotInquiries = suite.pilot.inquiryIds.map((id) => inquiryById.get(id));
  const pilotObservations = pilotIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const waterwaysKcStar = suite.pilot.waterwaysKcStar;
  const waterwaysSourceCoverage = JSON.parse(readFileSync(
    path.join(repoRoot, waterwaysKcStar.sourceCoverageManifestPath),
    "utf8"
  ));
  const waterwaysKcStarObservationIds = waterwaysSourceCoverage.included.map(
    (item) => item.observationId
  );
  const waterwaysKcStarIntake = intakeById.get(waterwaysKcStar.intakeId);
  const waterwaysKcStarSource = sourceById.get(waterwaysKcStar.sourceId);
  const waterwaysKcStarObservations = waterwaysKcStarObservationIds.map((id) =>
    observationById.get(id)
  );
  const waterwaysExpeditionClaim = claimById.get(waterwaysKcStar.expeditionClaimId);
  const waterwaysOperationsClaim = claimById.get(waterwaysKcStar.operationsClaimId);
  const waterwaysSynthesisClaim = claimById.get(waterwaysKcStar.synthesisClaimId);
  const waterwaysInquiry = inquiryById.get(waterwaysKcStar.inquiryId);
  const waterwaysDocumentation = readFileSync(
    path.join(repoRoot, waterwaysKcStar.documentationPath),
    "utf8"
  );
  const waterwaysKcStarClaimIds = [
    waterwaysKcStar.expeditionClaimId,
    waterwaysKcStar.operationsClaimId,
    waterwaysKcStar.synthesisClaimId
  ];
  const waterwaysDirectObservationRecords = knowledgeBank.observations.filter((observation) =>
    observation.sourceId === waterwaysKcStar.sourceId ||
    observation.intakeId === waterwaysKcStar.intakeId
  );
  const waterwaysRelatedInquirySeedIds = [...new Set([
    waterwaysKcStar.inquiryId,
    ...waterwaysDirectObservationRecords.flatMap((observation) => observation.researchInquiryIds),
    ...knowledgeBank.researchInquiries
      .filter((inquiry) => inquiry.project === "waterways-raft")
      .map((inquiry) => inquiry.id),
    ...knowledgeBank.researchInquiries
      .filter((inquiry) => inquiry.sourceIds.includes(waterwaysKcStar.sourceId))
      .map((inquiry) => inquiry.id)
  ])];
  const waterwaysGloballyAttributingClaimIds = knowledgeBank.claims
    .filter((claim) =>
      attributesKcStarWaterwaysSource(claim)
    )
    .map((claim) => claim.id);
  const waterwaysRelatedClaimRecords = knowledgeBank.claims.filter((claim) =>
    waterwaysKcStarClaimIds.includes(claim.id) ||
    claim.project === "waterways-raft" ||
    waterwaysGloballyAttributingClaimIds.includes(claim.id) ||
    claim.evidence.some((evidence) => evidence.sourceId === waterwaysKcStar.sourceId) ||
    claim.researchInquiryIds.some((id) => waterwaysRelatedInquirySeedIds.includes(id))
  );
  const waterwaysRelatedClaimIds = waterwaysRelatedClaimRecords.map((claim) => claim.id);
  const waterwaysRelatedObservationRecords = knowledgeBank.observations.filter((observation) =>
    observation.sourceId === waterwaysKcStar.sourceId ||
    observation.intakeId === waterwaysKcStar.intakeId ||
    observation.project === "waterways-raft" ||
    observation.claimIds.some((id) => waterwaysRelatedClaimIds.includes(id)) ||
    observation.researchInquiryIds.some((id) => waterwaysRelatedInquirySeedIds.includes(id))
  );
  const waterwaysRelatedObservationIds = waterwaysRelatedObservationRecords.map(
    (observation) => observation.id
  );
  const waterwaysRelatedIntakeRecords = knowledgeBank.intakeItems.filter((intake) =>
    intake.id === waterwaysKcStar.intakeId ||
    intake.projectIds.includes("waterways-raft") ||
    intake.sourceIds.includes(waterwaysKcStar.sourceId) ||
    intake.observationIds.some((id) => waterwaysRelatedObservationIds.includes(id)) ||
    intake.researchInquiryIds.some((id) => waterwaysRelatedInquirySeedIds.includes(id))
  );
  const waterwaysRelatedInquiryRecords = knowledgeBank.researchInquiries.filter((inquiry) =>
    waterwaysRelatedInquirySeedIds.includes(inquiry.id) ||
    inquiry.project === "waterways-raft" ||
    inquiry.sourceIds.includes(waterwaysKcStar.sourceId)
  );
  const waterwaysSourceLinkedObservationIds = waterwaysDirectObservationRecords.map(
    (observation) => observation.id
  );
  const waterwaysSourceLinkedClaimIds = knowledgeBank.claims
    .filter((claim) => claim.evidence.some((evidence) => evidence.sourceId === waterwaysKcStar.sourceId))
    .map((claim) => claim.id);
  const waterwaysSourceLinkedIntakeIds = knowledgeBank.intakeItems
    .filter((intake) => intake.sourceIds.includes(waterwaysKcStar.sourceId))
    .map((intake) => intake.id);
  const waterwaysSourceLinkedInquiryIds = knowledgeBank.researchInquiries
    .filter((inquiry) => inquiry.sourceIds.includes(waterwaysKcStar.sourceId))
    .map((inquiry) => inquiry.id);
  const waterwaysAttributionViolations = [
    ...knowledgeBank.claims
      .filter((claim) =>
        attributesKcStarWaterwaysSource(claim) &&
        !claim.evidence.some((evidence) => evidence.sourceId === waterwaysKcStar.sourceId)
      )
      .map((claim) => `claim:${claim.id}`),
    ...knowledgeBank.observations
      .filter((observation) =>
        attributesKcStarWaterwaysSource(observation) &&
        observation.sourceId !== waterwaysKcStar.sourceId
      )
      .map((observation) => `observation:${observation.id}`),
    ...knowledgeBank.intakeItems
      .filter((intake) =>
        attributesKcStarWaterwaysSource(intake) &&
        !intake.sourceIds.includes(waterwaysKcStar.sourceId)
      )
      .map((intake) => `intake:${intake.id}`),
    ...knowledgeBank.researchInquiries
      .filter((inquiry) =>
        attributesKcStarWaterwaysSource(inquiry) &&
        !inquiry.sourceIds.includes(waterwaysKcStar.sourceId)
      )
      .map((inquiry) => `inquiry:${inquiry.id}`)
  ];
  const waterwaysInspectionText = JSON.stringify({
    intake: waterwaysKcStarIntake,
    source: waterwaysKcStarSource,
    observations: waterwaysKcStarObservations,
    claims: [waterwaysExpeditionClaim, waterwaysOperationsClaim, waterwaysSynthesisClaim],
    inquiry: waterwaysInquiry
  });
  const waterwaysCoverageFailures = waterwaysSourceCoverage.included.flatMap((contract) => {
    const observation = observationById.get(contract.observationId);
    const text = normalizeInspectionText(observation?.text ?? "").toLowerCase();
    const limitations = normalizeInspectionText(
      observation?.limitations.join(" ") ?? ""
    ).toLowerCase();
    const reviewedRecordSha256 = kcStarReviewedRecordDigest(observation);
    const failures = [];
    if (!observation) failures.push("missing observation");
    if (observation?.sourceId !== waterwaysKcStar.sourceId) failures.push("wrong source");
    if (observation?.locator !== contract.locator) failures.push("locator mismatch");
    if (observation?.status !== "verified") failures.push("unverified status");
    if (!observation?.publicSafe) failures.push("not public-safe");
    if (!observation?.limitations.length) failures.push("missing limitations");
    if (!(observation?.claimIds.length || observation?.researchInquiryIds.length)) {
      failures.push("orphaned proposition");
    }
    if (reviewedRecordSha256 !== waterwaysSourceCoverage.reviewedRecordSha256[contract.observationId]) {
      failures.push("reviewed record digest mismatch");
    }
    for (const term of contract.textTerms) {
      if (!text.includes(normalizeInspectionText(term).toLowerCase())) {
        failures.push(`missing proposition term: ${term}`);
      }
    }
    for (const term of contract.limitationTerms) {
      if (!limitations.includes(normalizeInspectionText(term).toLowerCase())) {
        failures.push(`missing limitation term: ${term}`);
      }
    }
    return failures.length
      ? [`${contract.observationId}: ${failures.join(", ")}`]
      : [];
  });
  const waterwaysKcStarDiagnostics = {
    intakeContract: Boolean(
      waterwaysKcStarIntake?.disposition === "integrated" &&
      waterwaysKcStarIntake.visibility === "public-safe" &&
      waterwaysKcStarIntake.sourceIds.length === 1 &&
      waterwaysKcStarIntake.sourceIds[0] === waterwaysKcStar.sourceId &&
      stringSetEquals(waterwaysKcStarIntake.observationIds, waterwaysKcStarObservationIds)
    ),
    intakeBoundaries: Boolean(
      waterwaysKcStarIntake?.boundaries.some((boundary) =>
        /copyrighted[\s\S]*outside the public repository/i.test(boundary)
      ) &&
      waterwaysKcStarIntake.boundaries.some((boundary) =>
        /does not prove[\s\S]*never existed/i.test(boundary)
      )
    ),
    sourceReceipt: Boolean(
      waterwaysSourceCoverage.sourceId === waterwaysKcStar.sourceId &&
      waterwaysSourceCoverage.sourceArtifactSha256 === kcStar2007SourceArtifactSha256 &&
      waterwaysSourceCoverage.sourceTextExtractionSha256 === kcStar2007SourceTextExtractionSha256 &&
      waterwaysSourceCoverage.sourceReceipt?.pageCount === 2 &&
      /pdftotext -layout/i.test(waterwaysSourceCoverage.sourceReceipt.extractionMethod) &&
      /rendered[\s\S]*visually inspected/i.test(waterwaysSourceCoverage.sourceReceipt.visualReview) &&
      /recomputed[\s\S]*outside the public repository/i.test(
        waterwaysSourceCoverage.sourceReceipt.runtimeVerification
      )
    ),
    contractSeal: Boolean(
      waterwaysSourceCoverage.contractSealSha256 === kcStar2007ContractSealSha256 &&
      kcStarSourceCoverageContractSeal(waterwaysSourceCoverage) === kcStar2007ContractSealSha256
    ),
    contractRole: Boolean(
      /co-versioned regression contract/i.test(waterwaysSourceCoverage.contractRole) &&
      /not an independent authority/i.test(waterwaysSourceCoverage.contractRole) &&
      /fresh read-only review occurs outside the evaluator/i.test(waterwaysSourceCoverage.contractRole)
    ),
    contractStructure: Boolean(
      waterwaysSourceCoverage.included.length === kcStar2007ExpectedIncludedCount &&
      waterwaysSourceCoverage.included.every((item) =>
        item.observationId && item.page && item.column && item.locator &&
        item.speaker && item.boundedProposition && item.textTerms?.length &&
        item.limitationTerms?.length
      ) &&
      stringSetEquals(
        Object.keys(waterwaysSourceCoverage.reviewedRecordSha256),
        waterwaysKcStarObservationIds
      ) &&
      stringSetEquals(
        Object.keys(waterwaysSourceCoverage.reviewedClaimSha256),
        waterwaysKcStarClaimIds
      )
    ),
    recordSetCompleteness: Boolean(
      stringSetEquals(waterwaysSourceLinkedObservationIds, waterwaysKcStarObservationIds) &&
      stringSetEquals(waterwaysSourceLinkedClaimIds, waterwaysKcStarClaimIds) &&
      stringSetEquals(waterwaysSourceLinkedIntakeIds, [waterwaysKcStar.intakeId]) &&
      stringSetEquals(waterwaysSourceLinkedInquiryIds, [waterwaysKcStar.inquiryId]) &&
      waterwaysAttributionViolations.length === 0
    ),
    relatedGraphIntegrity: Boolean(
      stringSetEquals(
        waterwaysRelatedIntakeRecords.map((record) => record.id),
        waterwaysSourceCoverage.relatedGraph.intakeIds
      ) &&
      stringSetEquals(
        waterwaysRelatedObservationRecords.map((record) => record.id),
        waterwaysSourceCoverage.relatedGraph.observationIds
      ) &&
      stringSetEquals(
        waterwaysRelatedClaimRecords.map((record) => record.id),
        waterwaysSourceCoverage.relatedGraph.claimIds
      ) &&
      stringSetEquals(
        waterwaysRelatedInquiryRecords.map((record) => record.id),
        waterwaysSourceCoverage.relatedGraph.inquiryIds
      ) &&
      reviewedRecordSetDigest(waterwaysRelatedIntakeRecords) ===
        waterwaysSourceCoverage.relatedGraph.recordSetSha256.intakes &&
      reviewedRecordSetDigest(waterwaysRelatedObservationRecords) ===
        waterwaysSourceCoverage.relatedGraph.recordSetSha256.observations &&
      reviewedRecordSetDigest(waterwaysRelatedClaimRecords) ===
        waterwaysSourceCoverage.relatedGraph.recordSetSha256.claims &&
      reviewedRecordSetDigest(waterwaysRelatedInquiryRecords) ===
        waterwaysSourceCoverage.relatedGraph.recordSetSha256.inquiries
    ),
    relatedGraphProjectionHold: Boolean(
      waterwaysRelatedClaimRecords.every((claim) =>
        claim.projections.every(
          (projection) => projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      knowledgeBank.pages.every((page) =>
        page.occurrences.every(
          (occurrence) => !waterwaysRelatedClaimIds.includes(occurrence.claimId)
        )
      ) &&
      waterwaysRelatedClaimIds.every((id) => !publicRegistryContainsId(publicRegistryText, id))
    ),
    intakeRecordIntegrity: Boolean(
      kcStarReviewedRecordDigest(waterwaysKcStarIntake) ===
        waterwaysSourceCoverage.reviewedIntakeSha256
    ),
    sourceRecordIntegrity: Boolean(
      kcStarReviewedRecordDigest(waterwaysKcStarSource) ===
        waterwaysSourceCoverage.reviewedSourceSha256
    ),
    claimRecordIntegrity: Boolean(
      [waterwaysExpeditionClaim, waterwaysOperationsClaim, waterwaysSynthesisClaim]
        .every((claim) =>
          claim && kcStarReviewedClaimDigest(claim) === waterwaysSourceCoverage.reviewedClaimSha256[claim.id]
        )
    ),
    inquiryRecordIntegrity: Boolean(
      kcStarReviewedRecordDigest(waterwaysInquiry) ===
        waterwaysSourceCoverage.reviewedInquirySha256
    ),
    documentationRecordIntegrity: Boolean(
      sha256(waterwaysDocumentation) === waterwaysSourceCoverage.reviewedDocumentationSha256
    ),
    identityNormalization: Boolean(
      waterwaysSourceCoverage.identityNormalization.printedName === "James Burkart" &&
      waterwaysSourceCoverage.identityNormalization.currentPublicName === "Jamie Burkart" &&
      /source-level observations retain James Burkart/i.test(
        waterwaysSourceCoverage.identityNormalization.rule
      ) &&
      waterwaysKcStarObservations.every((observation) => !/\bJamie\b/.test(observation?.text ?? ""))
    ),
    explicitDispositions: Boolean(
      waterwaysSourceCoverage.notIncluded.length === kcStar2007ExpectedDispositionSubjects.length &&
      stringSetEquals(
        waterwaysSourceCoverage.notIncluded.map((item) => item.subject),
        kcStar2007ExpectedDispositionSubjects
      ) &&
      waterwaysSourceCoverage.notIncluded.every((item) =>
        ["omit", "protected", "defer"].includes(item.disposition) && item.reason
      )
    ),
    sourceMetadata: Boolean(
      waterwaysKcStarSource?.organization === "The Kansas City Star" &&
      waterwaysKcStarSource.author === "Darryl Levings" &&
      waterwaysKcStarSource.publishedAt === "2007-11-15" &&
      waterwaysKcStarSource.visibility === "public-metadata-only" &&
      waterwaysKcStarSource.preservationStatus === "private" &&
      !waterwaysKcStarSource.canonicalUrl &&
      !waterwaysKcStarSource.archiveUrl &&
      !waterwaysKcStarSource.assetUrl &&
      waterwaysKcStarSource.supportsGenerally.length >= 10
    ),
    sourceBoundaries: Boolean(
      waterwaysKcStarSource?.doesNotEstablish.some((boundary) =>
        /completed arrival at salt water/i.test(boundary)
      ) &&
      waterwaysKcStarSource.doesNotEstablish.some((boundary) =>
        /exact final terminus/i.test(boundary)
      ) &&
      waterwaysKcStarSource.doesNotEstablish.some((boundary) =>
        /individual allocation of construction[\s\S]*navigation labor/i.test(boundary)
      ) &&
      waterwaysKcStarSource.doesNotEstablish.some((boundary) =>
        /sole authorship or operation by Jamie/i.test(boundary)
      ) &&
      waterwaysKcStarSource.doesNotEstablish.some((boundary) =>
        /present-day interpretation[\s\S]*operating system/i.test(boundary)
      )
    ),
    observationCoverage: Boolean(
      waterwaysKcStarObservations.length === waterwaysSourceCoverage.included.length &&
      waterwaysKcStarObservations.every(Boolean) &&
      waterwaysCoverageFailures.length === 0
    ),
    expeditionClaim: Boolean(
      waterwaysExpeditionClaim?.evidence.some(
        (evidence) => evidence.sourceId === waterwaysKcStar.sourceId &&
          evidence.relationship === "direct-support" && evidence.renderCitation === false
      ) &&
      waterwaysExpeditionClaim.boundaries.some((boundary) =>
        /Libby Hendon[\s\S]*Laura Mattingly[\s\S]*Jamie Burkart/i.test(boundary)
      ) &&
      waterwaysExpeditionClaim.antiClaims.some((antiClaim) =>
        /Kansas City Star[\s\S]*already reached salt water/i.test(antiClaim)
      )
    ),
    operationsClaim: Boolean(
      waterwaysOperationsClaim?.status === "confirmed-with-boundary" &&
      waterwaysOperationsClaim.evidence.some(
        (evidence) => evidence.sourceId === waterwaysKcStar.sourceId &&
          evidence.relationship === "direct-support" && evidence.renderCitation === false
      ) &&
      waterwaysOperationsClaim.projections.length === 1 &&
      waterwaysOperationsClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      waterwaysOperationsClaim.boundaries.some((boundary) => /Keep credit collective/i.test(boundary)) &&
      waterwaysOperationsClaim.boundaries.some((boundary) =>
        /Laura Mattingly[\s\S]*Libby Hendon[\s\S]*Paul Kelly Loyacono/i.test(boundary)
      ) &&
      waterwaysOperationsClaim.antiClaims.some((antiClaim) =>
        /Jamie alone designed, built, steered, operated, navigated, or completed/i.test(antiClaim)
      ) &&
      !/(?:participatory operating system|adaptive field operations|social infrastructure)/i.test(
        waterwaysOperationsClaim.internalClaim
      )
    ),
    synthesisClaim: Boolean(
      waterwaysSynthesisClaim?.status === "use-with-care" &&
      waterwaysSynthesisClaim.evidence.some(
        (evidence) => evidence.sourceId === waterwaysKcStar.sourceId &&
          evidence.relationship === "context" && evidence.renderCitation === false
      ) &&
      waterwaysSynthesisClaim.projections.length === 1 &&
      waterwaysSynthesisClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      waterwaysSynthesisClaim.boundaries.some((boundary) =>
        /present-day analytical synthesis[\s\S]*not terminology used/i.test(boundary)
      ) &&
      waterwaysSynthesisClaim.antiClaims.some((antiClaim) =>
        /Kansas City Star described the project as an operating system/i.test(antiClaim)
      )
    ),
    inquiry: Boolean(
      waterwaysInquiry?.sourceIds.includes(waterwaysKcStar.sourceId) &&
      waterwaysInquiry.findings.some((finding) => /south of Baton Rouge by November 15/i.test(finding)) &&
      waterwaysInquiry.limitations.some((limitation) => /does not prove[\s\S]*never existed/i.test(limitation))
    ),
    documentationSafety: Boolean(
      /copyrighted[\s\S]*outside the public\s+repository/i.test(waterwaysDocumentation) &&
      /negative result does not prove/i.test(waterwaysDocumentation) &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/|Google Drive\/)/i.test(
        `${waterwaysInspectionText}\n${waterwaysDocumentation}`
      )
    ),
    publicProjectionHold: Boolean(
      !publicRegistryContainsId(publicRegistryText, waterwaysKcStar.sourceId) &&
      !publicRegistryContainsId(publicRegistryText, waterwaysKcStar.expeditionClaimId) &&
      !publicRegistryContainsId(publicRegistryText, waterwaysKcStar.operationsClaimId) &&
      !publicRegistryContainsId(publicRegistryText, waterwaysKcStar.synthesisClaimId)
    )
  };
  const waterwaysInvariantFailures = Object.entries(waterwaysKcStarDiagnostics)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  const waterwaysKcStarComplete = waterwaysInvariantFailures.length === 0;
  const expansion = suite.pilot.sourceExpansion;
  const expansionIntakes = expansion.intakeIds.map((id) => intakeById.get(id));
  const expansionSources = expansion.sourceIds.map((id) => sourceById.get(id));
  const expansionClaims = expansion.claimIds.map((id) => claimById.get(id));
  const expansionInquiries = expansion.inquiryIds.map((id) => inquiryById.get(id));
  const expansionObservations = expansionIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const pressArchive = suite.pilot.pressArchive;
  const pressIntakes = pressArchive.intakeIds.map((id) => intakeById.get(id));
  const pressIndexSources = pressArchive.indexSourceIds.map((id) => sourceById.get(id));
  const pressClaim = claimById.get(pressArchive.claimId);
  const pressInquiry = inquiryById.get(pressArchive.inquiryId);
  const pressEntries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const uniquePressArticleSourceIds = [...new Set(pressEntries.map((entry) => entry.sourceId))];
  const pressArticleSources = uniquePressArticleSourceIds.map((id) => sourceById.get(id));
  const pressObservations = pressIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const pressCounts = Object.fromEntries(
    campaignPressInventory.map((campaign) => [campaign.id, campaign.entries.length])
  );
  const duplicateAppearanceCount = pressEntries.filter(
    (entry) => entry.sourceId === pressArchive.duplicateSourceId
  ).length;
  const pressArchiveComplete = Boolean(
    campaignPressInventory.length === pressArchive.expectedIndexCount &&
      pressEntries.length === pressArchive.expectedAppearanceCount &&
      uniquePressArticleSourceIds.length === pressArchive.expectedUniqueArticleCount &&
      nycacPressArchive.sources.length === pressArchive.expectedNewSourceCount &&
      nycacPressArchive.sources.filter((source) => source.kind === "published-article").length === pressArchive.expectedNewArticleSourceCount &&
      Object.entries(pressArchive.campaignEntryCounts).every(
        ([campaignId, expected]) => pressCounts[campaignId] === expected
      ) &&
      duplicateAppearanceCount === 2 &&
      pressIntakes.length === pressArchive.expectedIndexCount &&
      pressIntakes.every(
        (intake) => intake?.disposition === "integrated" && intake.sourceIds.length === 1 && intake.boundaries.length >= 2
      ) &&
      pressIndexSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressArticleSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressObservations.length === pressArchive.expectedAppearanceCount &&
      pressObservations.every(
        (observation) => observation?.locator && observation.limitations.length && observation.claimIds.includes(pressArchive.claimId) && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressClaim?.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      pressClaim.evidence.length === pressArchive.expectedIndexCount &&
      pressInquiry?.sourceIds.length === pressArchive.expectedIndexCount + pressArchive.expectedUniqueArticleCount &&
      pressInquiry.limitations.length >= 4
  );
  const kcFunding = suite.pilot.kcTownHallFunding;
  const kcFundingIntake = intakeById.get(kcFunding.intakeId);
  const kcFundingSources = kcFunding.sourceIds.map((id) => sourceById.get(id));
  const kcFundingObservations = kcFundingIntake?.observationIds.map((id) => observationById.get(id)) ?? [];
  const kcFundingClaims = kcFunding.claimIds.map((id) => claimById.get(id));
  const kcFundingInquiry = inquiryById.get(kcFunding.inquiryId);
  const kcTransitionIntake = intakeById.get(kcFunding.transitionIntakeId);
  const kcTransitionObservation = observationById.get(kcFunding.transitionObservationId);
  const kcTransitionClaim = claimById.get(kcFunding.transitionClaimId);
  const kcTransitionInquiry = inquiryById.get(kcFunding.transitionInquiryId);
  const kcFundingCorrection = knowledgeBank.corrections.find((item) => item.id === kcFunding.correctionId);
  const kcFundingCoverage = knowledgeBank.proofCoverageTargets.find((item) => item.proofId === kcFunding.proofId);
  const kcFundingPage = knowledgeBank.pages.find((item) => item.id === kcFunding.pageId);
  const kcFundingOccurrences = kcFundingPage?.occurrences.filter((occurrence) =>
    kcFunding.claimIds.includes(occurrence.claimId)
  ) ?? [];
  const kcFundingPublicSourceIds = new Set(
    kcFundingOccurrences.flatMap((occurrence) => occurrence.sourceIds)
  );
  const kcProjectionText = kcFundingClaims.flatMap((claim) => claim?.projections.map((projection) => projection.text) ?? []).join(" ");
  const kcFundingComplete = Boolean(
    kcTownHallFunding.sources.length === kcFunding.expectedSourceCount &&
      kcFundingIntake?.disposition === "integrated" &&
      kcFundingIntake.sourceIds.length === kcFunding.expectedSourceCount &&
      kcFundingIntake.observationIds.length === kcFunding.expectedObservationCount &&
      kcFundingIntake.researchInquiryIds.includes(kcFunding.inquiryId) &&
      kcFundingIntake.boundaries.length >= 3 &&
      kcFundingSources.every(
        (source) => source?.kind === "government-record" && source.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      kcFundingObservations.length === kcFunding.expectedObservationCount &&
      kcFundingObservations.every(
        (observation) => observation?.status === "verified" && observation.locator && observation.limitations.length && observation.claimIds.length && observation.researchInquiryIds.includes(kcFunding.inquiryId)
      ) &&
      kcFundingClaims.every(
        (claim) => claim?.status === "confirmed-with-boundary" && claim.evidence.length >= 2 && claim.boundaries.length >= 2 && claim.antiClaims.length >= 3 && claim.reviewedBy.length >= 2 && claim.projections.every((projection) => projection.status === "active" && projection.citationRequired && projection.surfaces.includes("/work/kc-town-hall"))
      ) &&
      kcFundingInquiry?.resultStatus === "recovered" &&
      kcFundingInquiry.sourceIds.length === kcFunding.expectedSourceCount &&
      kcFundingInquiry.findings.length === kcFunding.expectedObservationCount &&
      kcFundingInquiry.limitations.length >= 4 &&
      kcFundingCorrection?.status === "active" &&
      kcFundingCorrection.replacementText.includes("not disbursed") &&
      kcFundingCoverage?.status === "source-backed" &&
      kcFunding.sourceIds.every((id) => kcFundingCoverage.sourceIds.includes(id)) &&
      kcFundingCoverage.researchInquiryIds.includes(kcFunding.inquiryId) &&
      kcFunding.claimIds.every((id) =>
        kcFundingPage?.occurrences.some((occurrence) => occurrence.claimId === id)
      ) &&
      kcFundingOccurrences.length === kcFunding.claimIds.length &&
      kcFundingPublicSourceIds.size === kcFunding.expectedPublicSourceCount &&
      [...kcFundingPublicSourceIds].every((id) => kcFundingPage?.sourceOrder.includes(id)) &&
      kcFunding.claimIds.every((id) => kcTownHallMdx.includes(id)) &&
      kcTownHallMdx.includes("do not establish that Jamie alone caused the Council action") &&
      /(?:funds were not ultimately disbursed|not disbursed|\$0 disbursed)/i.test(workData) &&
      /(?:funds were not ultimately disbursed|not disbursed|\$0 disbursed)/i.test(proofData) &&
      !/KC Town Hall received (?:or spent )?(?:the )?\$490,539/i.test(kcProjectionText) &&
      !kcTownHallMdx.includes("recommendation unless final funding details") &&
      kcTransitionIntake?.kind === "memory-lead" &&
      kcTransitionIntake.disposition === "captured" &&
      kcTransitionIntake.visibility === "public-safe" &&
      kcTransitionIntake.sourceIds.length === 0 &&
      kcTransitionIntake.observationIds.includes(kcFunding.transitionObservationId) &&
      kcTransitionIntake.researchInquiryIds.includes(kcFunding.transitionInquiryId) &&
      kcTransitionIntake.boundaries.length >= 3 &&
      kcTransitionObservation?.kind === "participant-memory" &&
      kcTransitionObservation.status === "captured" &&
      !kcTransitionObservation.sourceId &&
      kcTransitionObservation.claimIds.includes(kcFunding.transitionClaimId) &&
      kcTransitionObservation.researchInquiryIds.includes(kcFunding.transitionInquiryId) &&
      kcTransitionClaim?.status === "use-with-care" &&
      kcTransitionClaim.evidence.length === 0 &&
      kcTransitionClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      kcTransitionClaim.boundaries.length >= 3 &&
      kcTransitionClaim.antiClaims.includes("Jamie abandoned the project.") &&
      kcTransitionInquiry?.resultStatus === "inconclusive" &&
      kcTransitionInquiry.sourceIds.length === 0 &&
      kcTransitionInquiry.limitations.length >= 3 &&
      !publicRegistryText.includes(kcFunding.transitionClaimId)
  );
  const kcPhase = suite.pilot.kcTownHallPhaseOne;
  const kcPhaseIntakes = kcPhase.intakeIds.map((id) => intakeById.get(id));
  const kcPhaseSources = kcPhase.sourceIds.map((id) => sourceById.get(id));
  const kcPhaseProtectedSources = kcPhase.protectedSourceIds.map((id) => sourceById.get(id));
  const kcPhaseObservations = kcPhase.observationIds.map((id) => observationById.get(id));
  const kcPhaseClaims = kcPhase.claimIds.map((id) => claimById.get(id));
  const kcPhaseActiveClaims = kcPhase.activeClaimIds.map((id) => claimById.get(id));
  const kcPhaseHeldClaims = kcPhase.heldClaimIds.map((id) => claimById.get(id));
  const kcPhaseInquiries = kcPhase.inquiryIds.map((id) => inquiryById.get(id));
  const kcPhaseOfficialSource = sourceById.get(kcPhase.officialSourceId);
  const kcPhaseProposalSource = sourceById.get("SRC-KCTH-CCED-PROPOSAL-PACKET-2019");
  const kcPhaseJamieSource = sourceById.get("SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026");
  const kcPhaseRoleClaim = claimById.get(kcPhase.roleClaimId);
  const kcPhaseSurveyClaim = claimById.get(kcPhase.surveyClaimId);
  const kcPhaseWorkforceClaim = claimById.get(kcPhase.workforceClaimId);
  const kcPhaseSequencingClaim = claimById.get(kcPhase.sequencingClaimId);
  const kcPhaseCoverage = knowledgeBank.proofCoverageTargets.find(
    (item) => item.proofId === kcPhase.proofId
  );
  const kcPhasePage = knowledgeBank.pages.find((item) => item.id === kcPhase.pageId);
  const kcPhaseOccurrence = kcPhasePage?.occurrences.find(
    (item) => item.id === kcPhase.occurrenceId
  );
  const kcPhaseDocumentation = existsSync(path.join(repoRoot, kcPhase.documentationPath))
    ? readFileSync(path.join(repoRoot, kcPhase.documentationPath), "utf8")
    : "";
  const kcPhaseRun = existsSync(path.join(repoRoot, kcPhase.runPath))
    ? readFileSync(path.join(repoRoot, kcPhase.runPath), "utf8")
    : "";
  const kcPhaseProjectionText = kcPhaseClaims.flatMap(
    (claim) => claim?.projections.map((projection) => projection.text) ?? []
  ).join(" ");
  const kcPhaseComplete = Boolean(
    kcTownHallPhaseOne.intakeItems.length === kcPhase.expectedIntakeCount &&
      kcTownHallPhaseOne.sources.length === kcPhase.expectedSourceCount &&
      kcTownHallPhaseOne.observations.length === kcPhase.expectedObservationCount &&
      kcTownHallPhaseOne.claims.length === kcPhase.expectedClaimCount &&
      kcTownHallPhaseOne.researchInquiries.length === kcPhase.expectedInquiryCount &&
      kcPhaseIntakes.every(
        (intake) => intake?.disposition === "integrated" &&
          intake.visibility === "public-safe" &&
          intake.sourceIds.length &&
          intake.observationIds.length &&
          intake.researchInquiryIds.length &&
          intake.boundaries.length >= 3
      ) &&
      kcPhase.sourceIds.every((id) => kcPhaseIntakes.some((intake) => intake?.sourceIds.includes(id))) &&
      kcPhase.observationIds.every((id) => kcPhaseIntakes.some((intake) => intake?.observationIds.includes(id))) &&
      kcPhase.inquiryIds.every((id) => kcPhaseIntakes.some((intake) => intake?.researchInquiryIds.includes(id))) &&
      kcPhaseSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length >= 3
      ) &&
      kcPhaseProtectedSources.every(
        (source) => source?.visibility === "protected" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl &&
          !publicRegistryText.includes(source.id) &&
          !publicRegistryText.includes(source.protectedLocatorId)
      ) &&
      kcPhaseOfficialSource?.kind === "government-record" &&
      kcPhaseOfficialSource.visibility === "public" &&
      kcPhaseOfficialSource.canonicalUrl === "https://www.kcmo.gov/home/showpublisheddocument/3533/637145055055230000" &&
      kcPhaseOfficialSource.supportsGenerally.includes("Jamie listed as KC Town Hall developer/presenter") &&
      kcPhaseOfficialSource.doesNotEstablish.includes("Jamie's general-contractor title") &&
      kcPhaseProposalSource?.doesNotEstablish.some((boundary) => /independent verification/i.test(boundary)) &&
      kcPhaseProposalSource.doesNotEstablish.some((boundary) => /general-contractor title/i.test(boundary)) &&
      kcPhaseProposalSource.doesNotEstablish.some((boundary) => /actual completion of Phase One/i.test(boundary)) &&
      kcPhaseProposalSource.doesNotEstablish.some((boundary) => /audited final construction cost/i.test(boundary)) &&
      kcPhaseJamieSource?.doesNotEstablish.some((boundary) => /independent corroboration/i.test(boundary)) &&
      kcPhaseJamieSource.doesNotEstablish.some((boundary) => /sole performance of specialist trade labor/i.test(boundary)) &&
      kcPhaseObservations.every(
        (observation) => observation?.publicSafe &&
          observation.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          observation.claimIds.length &&
          observation.researchInquiryIds.length
      ) &&
      kcPhaseObservations.filter((observation) => observation?.kind === "participant-memory")
        .every((observation) => observation?.status === "captured") &&
      kcPhaseClaims.every(
        (claim) => claim?.evidence.length &&
          claim.boundaries.length >= 2 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length >= 2
      ) &&
      kcPhaseActiveClaims.every(
        (claim) => claim?.status === "confirmed-with-boundary" &&
          claim.projections.some((projection) => projection.status === "active")
      ) &&
      kcPhaseHeldClaims.every(
        (claim) => claim?.status === "use-with-care" &&
          claim.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          )
      ) &&
      kcPhaseRoleClaim?.projections.some(
        (projection) => projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall") &&
          /2018-2019 Phase One cold-shell restoration/i.test(projection.text) &&
          /co-founder, project manager, and general contractor/i.test(projection.text) &&
          /\$189,629 proposal budget/i.test(projection.text)
      ) &&
      kcPhaseRoleClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-KCTH-JAMIE-PHASE-ONE-ACCOUNT-2026" &&
          evidence.relationship === "direct-support" &&
          evidence.confidence === "moderate" &&
          evidence.renderCitation === false
      ) &&
      kcPhaseRoleClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-KCTH-CCED-PROPOSAL-PACKET-2019" &&
          evidence.relationship === "corroborating" &&
          evidence.renderCitation === false
      ) &&
      kcPhaseRoleClaim.boundaries.some((boundary) => /first-person account/i.test(boundary)) &&
      kcPhaseRoleClaim.boundaries.some((boundary) => /not completion of the full redevelopment/i.test(boundary)) &&
      kcPhaseRoleClaim.boundaries.some((boundary) => /not an independently audited final cost/i.test(boundary)) &&
      kcPhaseRoleClaim.antiClaims.includes("Jamie personally performed every trade task.") &&
      kcPhaseSurveyClaim?.projections.some(
        (projection) => projection.status === "active" &&
          /four-by-six neighborhood survey handbill/i.test(projection.text) &&
          /contact and data-collection workflow/i.test(projection.text)
      ) &&
      kcPhaseSurveyClaim.boundaries.some((boundary) => /respondent names, contact details, response rows/i.test(boundary)) &&
      kcPhaseWorkforceClaim?.projections.every((projection) => projection.status === "hold") &&
      kcPhaseSequencingClaim?.projections.every((projection) => projection.status === "hold") &&
      kcPhaseInquiries.every(
        (inquiry) => inquiry?.resultStatus === "partially-recovered" &&
          inquiry.methods.length >= 3 &&
          inquiry.findings.length >= 3 &&
          inquiry.limitations.length >= 3 &&
          inquiry.sourceIds.length >= 3 &&
          inquiry.protectedLocatorId
      ) &&
      kcPhaseCoverage?.status === "source-backed" &&
      kcPhase.sourceIds.every((id) => kcPhaseCoverage.sourceIds.includes(id)) &&
      kcPhase.inquiryIds.every((id) => kcPhaseCoverage.researchInquiryIds.includes(id)) &&
      kcPhaseOccurrence?.claimId === "CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER" &&
      kcPhaseOccurrence.sourceIds.includes(kcPhase.officialSourceId) &&
      kcPhasePage?.sourceOrder[0] === kcPhase.officialSourceId &&
      kcTownHallMdx.includes("CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER") &&
      kcTownHallMdx.includes("served as co-founder, project manager, and general contractor") &&
      kcTownHallMdx.includes("four-by-six neighborhood survey handbill") &&
      kcTownHallMdx.includes("proposal budget") &&
      workData.includes("Co-Founder, Project Manager & Phase One General Contractor") &&
      workData.includes("$189,629 cold-shell proposal scope") &&
      workData.includes("Four-by-six neighborhood survey") &&
      proofData.includes("serving as Phase One general contractor") &&
      proofData.includes("$189,629 cold-shell restoration") &&
      proofData.includes("The full redevelopment was completed in 2019") &&
      publicRegistryText.includes("CLM-KCTH-OFFICIAL-DEVELOPER-PRESENTER") &&
      !publicRegistryText.includes(kcPhase.roleClaimId) &&
      !publicRegistryText.includes(kcPhase.surveyClaimId) &&
      kcPhase.heldClaimIds.every((id) => !publicRegistryText.includes(id)) &&
      kcPhaseDocumentation.includes("The proposal is a contemporaneous applicant-authored record") &&
      /It is not an\s+independent construction audit/.test(kcPhaseDocumentation) &&
      /Phase One (?:cold-shell )?completion(?: is not| from)\s+completion of\s+the full redevelopment/.test(kcPhaseDocumentation) &&
      kcPhaseDocumentation.includes("The raw PDF is not committed") &&
      kcPhaseRun.includes("proposal is not audit") &&
      !/(?:completed the entire|completed the full) (?:KC Town Hall )?(?:project|development|redevelopment)/i.test(kcPhaseProjectionText) &&
      !/(?:solely|alone|personally) (?:performed|completed|built) (?:all|every|the entire)/i.test(kcPhaseProjectionText)
  );
  const teamsArchive = suite.pilot.teamsArchiveProduction;
  const teamsIntakes = teamsArchive.intakeIds.map((id) => intakeById.get(id));
  const teamsSources = teamsArchive.sourceIds.map((id) => sourceById.get(id));
  const teamsObservations = teamsIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const teamsClaims = teamsArchive.claimIds.map((id) => claimById.get(id));
  const teamsInquiries = teamsArchive.inquiryIds.map((id) => inquiryById.get(id));
  const teamsPrivateSources = teamsArchive.privateSourceIds.map((id) => sourceById.get(id));
  const teamsActiveClaim = claimById.get(teamsArchive.activeClaimId);
  const callnycPage = knowledgeBank.pages.find((page) => page.id === "callnyc");
  const teamsCoverageTargets = teamsArchive.proofIds.map((id) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === id)
  );
  const archiveInquiry = inquiryById.get("INQ-TEAMS-ARCHIVE-PRODUCTION-2026-07-14");
  const callnycOccurrence = callnycPage?.occurrences.find(
    (occurrence) => occurrence.id === teamsArchive.callnycOccurrenceId
  );
  const teamsArchiveGroupsComplete = Object.entries(
    teamsArchive.archiveGroupIntakeIds
  ).every(([group, intakeIds]) =>
    intakeIds.length === teamsArchive.archiveGroups[group] &&
    intakeIds.every((id) => teamsArchive.intakeIds.includes(id) && intakeById.has(id))
  );
  const teamsArchiveComplete = Boolean(
    teamsArchiveProduction.intakeItems.length === teamsArchive.expectedIntakeCount &&
      teamsArchiveProduction.sources.length === teamsArchive.expectedSourceCount &&
      teamsArchiveProduction.observations.length === teamsArchive.expectedObservationCount &&
      teamsArchiveProduction.claims.length === teamsArchive.expectedClaimCount &&
      teamsArchiveProduction.researchInquiries.length === teamsArchive.expectedInquiryCount &&
      teamsArchiveGroupsComplete &&
      teamsIntakes.length === teamsArchive.expectedIntakeCount &&
      teamsIntakes.every(
        (intake) => intake?.disposition === "integrated" &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.researchInquiryIds.length &&
          intake.boundaries.length >= 2
      ) &&
      teamsSources.length === teamsArchive.expectedSourceCount &&
      teamsSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      teamsPrivateSources.length === teamsArchive.privateSourceIds.length &&
      teamsPrivateSources.every(
        (source) => source &&
          source.visibility !== "public" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      teamsObservations.length === teamsArchive.expectedObservationCount &&
      teamsObservations.every(
        (observation) => observation?.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          observation.publicSafe &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      teamsClaims.length === teamsArchive.expectedClaimCount &&
      teamsClaims.every(
        (claim) => claim &&
          ["confirmed", "confirmed-with-boundary"].includes(claim.status) &&
          claim.evidence.length &&
          claim.boundaries.length >= 2 &&
          claim.antiClaims.length >= 2 &&
          claim.reviewedBy.length >= 2
      ) &&
      teamsClaims
        .filter((claim) => claim?.id !== teamsArchive.activeClaimId)
        .every((claim) =>
          claim?.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          )
        ) &&
      teamsPrivateSources.every((source) =>
        teamsClaims.every((claim) =>
          claim?.evidence
            .filter((evidence) => evidence.sourceId === source?.id)
            .every((evidence) => evidence.renderCitation === false)
        )
      ) &&
      teamsInquiries.length === teamsArchive.expectedInquiryCount &&
      teamsInquiries.every(
        (inquiry) => inquiry?.methods.length && inquiry.findings.length && inquiry.limitations.length && inquiry.sourceIds.length
      ) &&
      archiveInquiry?.limitations.some((limitation) => /iCloud-backed files/i.test(limitation)) &&
      archiveInquiry.limitations.some((limitation) => /does not prove/i.test(limitation)) &&
      teamsActiveClaim?.projections.some(
        (projection) => projection.status === "active" &&
          projection.citationRequired &&
          projection.surfaces.includes("/work/callnyc")
      ) &&
      teamsActiveClaim.evidence.some(
        (evidence) => evidence.sourceId === teamsArchive.callnycSourceId && evidence.renderCitation
      ) &&
      callnycOccurrence?.claimId === teamsArchive.activeClaimId &&
      callnycOccurrence.sourceIds?.includes(teamsArchive.callnycSourceId) &&
      callnycMdx.includes(teamsArchive.activeClaimId) &&
      callnycMdx.includes(teamsArchive.callnycOccurrenceId) &&
      callnycPage?.sourceOrder.includes(teamsArchive.callnycSourceId) &&
      teamsCoverageTargets.every((target) => target?.sourceIds.length) &&
      publicRegistryText.includes(teamsArchive.activeClaimId) &&
      publicRegistryText.includes(teamsArchive.callnycSourceId) &&
      teamsArchive.privateSourceIds.every((id) => !publicRegistryText.includes(id)) &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/projects/teams-archive-production-2026-07-14.md"))
  );
  const sharedDrives = suite.pilot.googleDriveSharedDrivesProduction;
  const sharedDriveIntakes = sharedDrives.intakeIds.map((id) => intakeById.get(id));
  const sharedDriveSources = sharedDrives.sourceIds.map((id) => sourceById.get(id));
  const sharedDrivePrivateSources = sharedDrives.privateSourceIds.map((id) => sourceById.get(id));
  const sharedDriveObservations = sharedDriveIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const sharedDriveClaims = sharedDrives.claimIds.map((id) => claimById.get(id));
  const sharedDriveInquiries = sharedDrives.inquiryIds.map((id) => inquiryById.get(id));
  const sharedDriveActiveClaim = claimById.get(sharedDrives.activeClaimId);
  const sharedDriveMainInquiry = inquiryById.get(
    "INQ-GDRIVE-SHARED-DRIVES-PRODUCTION-2026-07-14"
  );
  const sharedDriveScaleInquiry = inquiryById.get(
    "INQ-GDRIVE-SUNDAY-DINNER-AND-196-SCALE"
  );
  const sharedDriveCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === sharedDrives.proofId
  );
  const sharedDriveEmailSources = [
    sourceById.get("SRC-GDRIVE-OHAI-EMAIL-ONBOARDING-2020"),
    sourceById.get("SRC-GDRIVE-NYCAC-IOS-EMAIL-ONBOARDING-2020")
  ];
  const sharedDriveEmailClaim = claimById.get(
    "CLM-NYCAC-AND-OHAI-ROLE-BASED-COMMUNICATION-INFRASTRUCTURE"
  );
  const sharedDriveComplete = Boolean(
    googleDriveSharedDrivesProduction.intakeItems.length === sharedDrives.expectedIntakeCount &&
      googleDriveSharedDrivesProduction.sources.length === sharedDrives.expectedSourceCount &&
      googleDriveSharedDrivesProduction.observations.length === sharedDrives.expectedObservationCount &&
      googleDriveSharedDrivesProduction.claims.length === sharedDrives.expectedClaimCount &&
      googleDriveSharedDrivesProduction.researchInquiries.length === sharedDrives.expectedInquiryCount &&
      sharedDriveIntakes.length === sharedDrives.expectedIntakeCount &&
      sharedDriveIntakes.every(
        (intake) => intake?.disposition === "integrated" &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.researchInquiryIds.length &&
          intake.boundaries.length >= 2
      ) &&
      sharedDriveSources.length === sharedDrives.expectedSourceCount &&
      sharedDriveSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      sharedDrivePrivateSources.length === sharedDrives.privateSourceIds.length &&
      sharedDrivePrivateSources.every(
        (source) => source &&
          source.visibility !== "public" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      sharedDriveObservations.length === sharedDrives.expectedObservationCount &&
      sharedDriveObservations.every(
        (observation) => observation?.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          observation.publicSafe &&
          observation.claimIds.length &&
          observation.researchInquiryIds.length
      ) &&
      sharedDriveClaims.length === sharedDrives.expectedClaimCount &&
      sharedDriveClaims.every(
        (claim) => claim?.status === "confirmed-with-boundary" &&
          claim.evidence.length &&
          claim.boundaries.length >= 2 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length >= 2
      ) &&
      sharedDriveClaims
        .filter((claim) => claim?.id !== sharedDrives.activeClaimId)
        .every((claim) =>
          claim?.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          )
        ) &&
      sharedDriveClaims.every((claim) =>
        claim?.evidence.every((evidence) => evidence.renderCitation === false)
      ) &&
      sharedDriveInquiries.length === sharedDrives.expectedInquiryCount &&
      sharedDriveInquiries.every(
        (inquiry) => inquiry?.methods.length &&
          inquiry.findings.length &&
          inquiry.limitations.length >= 3 &&
          inquiry.sourceIds.length
      ) &&
      sharedDriveMainInquiry?.findings.some((finding) =>
        finding.includes(`${sharedDrives.expectedDriveCount} accessible Shared Drives`)
      ) &&
      sharedDriveMainInquiry.methods.some((method) =>
        method.includes(`${sharedDrives.expectedInspectedRootCount} portfolio-relevant drive roots`)
      ) &&
      sharedDriveMainInquiry.methods.some((method) =>
        method.includes(`${sharedDrives.expectedCloseReadArtifactCount} unique high-signal`)
      ) &&
      sharedDriveMainInquiry.limitations.some((limitation) => /not an exhaustive review/i.test(limitation)) &&
      sharedDriveMainInquiry.limitations.some(
        (limitation) => /does not prove ownership/i.test(limitation)
      ) &&
      sharedDriveScaleInquiry?.findings.some(
        (finding) => /20-plus resident-artist count.*not independently established/i.test(finding)
      ) &&
      sharedDriveActiveClaim?.projections.some(
        (projection) => projection.status === "active" &&
          !projection.citationRequired &&
          projection.surfaces.includes("/work/196-sunday-dinner") &&
          projection.text.includes("345 numbered gatherings") &&
          projection.text.includes("2,783 meals served")
      ) &&
      sharedDriveActiveClaim.evidence.some(
        (evidence) => evidence.sourceId === sharedDrives.sundayDinnerSourceId &&
          evidence.relationship === "private-support" &&
          evidence.renderCitation === false
      ) &&
      sharedDriveCoverage?.status === "protected-support" &&
      sharedDriveCoverage.sourceIds.includes(sharedDrives.sundayDinnerSourceId) &&
      sharedDriveCoverage.sourceIds.includes("SRC-GDRIVE-196-ACCEPTANCE-WORKFLOW-2023") &&
      sharedDriveCoverage.researchInquiryIds.includes("INQ-GDRIVE-SUNDAY-DINNER-AND-196-SCALE") &&
      sharedDriveEmailSources.every((source) => source?.author === "Julia Fredenburg") &&
      sharedDriveEmailClaim?.antiClaims.includes("Jamie authored these guides.") &&
      sundayDinnerMdx.includes("345 numbered gatherings") &&
      sundayDinnerMdx.includes("2,783 meals served") &&
      sundayDinnerMdx.includes("participant names, contact details, attendance history") &&
      workData.includes("345 numbered gatherings and 2,783 meals served") &&
      workData.includes("participant-level records remain intentionally omitted") &&
      sharedDrives.privateSourceIds.every((id) => !publicRegistryText.includes(id)) &&
      sharedDrivePrivateSources.every(
        (source) => source?.protectedLocatorId && !publicRegistryText.includes(source.protectedLocatorId)
      ) &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/projects/google-drive-shared-drives-production-2026-07-14.md"))
  );
  const social = suite.pilot.socialMediaArchiveProduction;
  const socialProfileSources = social.profileSourceIds.map((id) => sourceById.get(id));
  const socialAuditSources = social.auditSourceIds.map((id) => sourceById.get(id));
  const socialRosterSource = sourceById.get(social.officialRosterSourceId);
  const socialCallSources = social.callnycCouncilPostIds.map((id) => sourceById.get(id));
  const socialNycacSources = social.nycacCouncilPostIds.map((id) => sourceById.get(id));
  const socialClaims = [...social.activeClaimIds, ...social.heldClaimIds].map((id) => claimById.get(id));
  const socialActiveClaims = social.activeClaimIds.map((id) => claimById.get(id));
  const socialHeldClaims = social.heldClaimIds.map((id) => claimById.get(id));
  const socialInquiries = social.inquiryIds.map((id) => inquiryById.get(id));
  const socialCallClaim = claimById.get("CLM-CALLNYC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialNycacClaim = claimById.get("CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialEstablishmentClaim = claimById.get("CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT");
  const socialOlympiaObservation = observationById.get("OBS-X-NYCAC-OLYMPIA-COLLABORATION");
  const socialMainInquiry = inquiryById.get("INQ-PROJECT-SOCIAL-ARCHIVE-PRODUCTION-2026-07-14");
  const socialCallInquiry = inquiryById.get("INQ-CALLNYC-COUNCIL-ENGAGEMENT");
  const socialNycacInquiry = inquiryById.get("INQ-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT");
  const socialCallPage = knowledgeBank.pages.find((page) => page.id === social.callnycPageId);
  const socialCallOccurrence = socialCallPage?.occurrences.find(
    (occurrence) => occurrence.id === social.callnycOccurrenceId
  );
  const socialDocumentation = existsSync(path.join(repoRoot, social.documentationPath))
    ? readFileSync(path.join(repoRoot, social.documentationPath), "utf8")
    : "";
  const accountSnapshotsMatch = Object.entries(social.accountSnapshots).every(
    ([handle, expected]) => {
      const account = socialMediaArchiveProduction.inventory.accounts.find(
        (item) => item.handle === handle
      );
      return account &&
        account.profilePosts === expected.profilePosts &&
        account.recoveredStatuses === expected.recoveredStatuses &&
        account.recoveredAuthoredPosts === expected.recoveredAuthoredPosts;
    }
  );
  const socialSourceBoundariesComplete = [
    ...socialProfileSources,
    ...socialAuditSources,
    socialRosterSource,
    ...socialCallSources,
    ...socialNycacSources
  ].every(
    (source) => source?.visibility === "public" &&
      source.supportsGenerally.length &&
      source.doesNotEstablish.length &&
      !source.protectedLocatorId
  );
  const socialArchiveComplete = Boolean(
    socialMediaArchiveProduction.inventory.accounts.length === social.expectedAccountCount &&
      socialMediaArchiveProduction.intakeItems.length === social.expectedIntakeCount &&
      socialMediaArchiveProduction.observations.length === social.expectedObservationCount &&
      socialMediaArchiveProduction.sources.length === social.expectedSourceCount &&
      socialMediaArchiveProduction.claims.length === social.expectedClaimCount &&
      socialMediaArchiveProduction.researchInquiries.length === social.expectedInquiryCount &&
      accountSnapshotsMatch &&
      socialProfileSources.length === social.expectedAccountCount &&
      socialProfileSources.every(
        (source) => source?.canonicalUrl?.startsWith("https://x.com/") &&
          source.publicNote &&
          source.doesNotEstablish.some((boundary) => /authorship|complete|stable|scale/i.test(boundary))
      ) &&
      socialAuditSources.length === 3 &&
      socialAuditSources.every(
        (source) => source?.kind === "research-run" &&
          source.canonicalUrl?.includes("docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md") &&
          source.publicNote &&
          source.doesNotEstablish.length >= 3
      ) &&
      socialRosterSource?.kind === "government-record" &&
      socialRosterSource.canonicalUrl?.includes("data.cityofnewyork.us") &&
      socialSourceBoundariesComplete &&
      new Set(social.callnycCouncilPostIds).size === social.callnycCouncilMemberCount &&
      new Set(social.nycacCouncilPostIds).size === social.nycacCouncilMemberFloor &&
      socialCallSources.every(
        (source) => source?.kind === "government-social-post" && source.canonicalUrl?.includes("/status/")
      ) &&
      socialNycacSources.every(
        (source) => source?.kind === "government-social-post" && source.canonicalUrl?.includes("/status/")
      ) &&
      socialMediaArchiveProduction.inventory.callnycCouncilMemberCount === social.callnycCouncilMemberCount &&
      socialMediaArchiveProduction.inventory.nycacCouncilMemberFloor === social.nycacCouncilMemberFloor &&
      socialCallClaim?.status === "confirmed-with-boundary" &&
      socialCallClaim.projections.some(
        (projection) => projection.status === "active" &&
          projection.citationRequired &&
          projection.surfaces.includes("/work/callnyc") &&
          /eight sitting New York City Council members/i.test(projection.text) &&
          /independent CallNYC prototype Jamie built/i.test(projection.text)
      ) &&
      socialCallClaim.boundaries.some((boundary) => /outreach tagging/i.test(boundary)) &&
      socialCallClaim.boundaries.some((boundary) => /Carlina Rivera.*predates her Council service/i.test(boundary)) &&
      socialCallClaim.antiClaims.some((antiClaim) => /adopted CallNYC/i.test(antiClaim)) &&
      socialNycacClaim?.status === "confirmed-with-boundary" &&
      socialNycacClaim.projections.some(
        (projection) => projection.status === "hold" &&
          !projection.citationRequired &&
          projection.surfaces.length === 0 &&
          /at least five sitting Council members/i.test(projection.text)
      ) &&
      socialNycacClaim.boundaries.some((boundary) => /candidate-era or former-member/i.test(boundary)) &&
      socialActiveClaims.every((claim) =>
        claim?.evidence.some((evidence) => evidence.renderCitation) &&
          claim.projections.every((projection) => projection.status === "active")
      ) &&
      socialHeldClaims.every((claim) =>
        claim?.projections.every(
          (projection) => projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      socialEstablishmentClaim?.status === "use-with-care" &&
      socialEstablishmentClaim.evidence.length === 0 &&
      socialEstablishmentClaim.boundaries.some((boundary) => /participant memory/i.test(boundary)) &&
      socialOlympiaObservation?.limitations.some((limitation) =>
        /do not establish.*authored posts|do not establish.*account access/i.test(limitation)
      ) &&
      socialInquiries.length === social.expectedInquiryCount &&
      socialInquiries.every(
        (inquiry) => inquiry?.methods.length >= 3 && inquiry.findings.length && inquiry.limitations.length >= 3
      ) &&
      socialMainInquiry?.limitations.some((limitation) => /deleted, private, search-suppressed/i.test(limitation)) &&
      socialCallInquiry?.findings.some((finding) => /Eight sitting members/i.test(finding)) &&
      socialCallInquiry?.findings.some((finding) => /tagging.*not counted/i.test(finding)) &&
      socialNycacInquiry?.resultStatus === "partially-recovered" &&
      socialMediaArchiveProduction.inventory.excludedHandles.length === social.excludedHandles.length &&
      social.excludedHandles.every((handle) =>
        socialMediaArchiveProduction.inventory.excludedHandles.includes(handle) &&
          socialDocumentation.includes(handle)
      ) &&
      socialCallOccurrence?.claimId === social.activeClaimIds[0] &&
      socialCallOccurrence.sourceIds.includes(social.auditSourceIds[1]) &&
      socialCallOccurrence.sourceIds.includes(social.officialRosterSourceId) &&
      socialCallPage?.sourceOrder.includes(social.auditSourceIds[1]) &&
      callnycMdx.includes(social.activeClaimIds[0]) &&
      callnycMdx.includes(social.callnycOccurrenceId) &&
      !fairRentMdx.includes("CLM-NYCAC-COUNCIL-ACCOUNT-ENGAGEMENT") &&
      socialDocumentation.includes("authenticated") &&
      socialDocumentation.includes("recovered floor") &&
      socialDocumentation.includes("collective") &&
      social.activeClaimIds.every((id) => publicRegistryText.includes(id)) &&
      social.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const callFull = suite.pilot.callNycFullPopulation;
  const callLedgerPath = path.join(repoRoot, callFull.ledgerPath);
  const callFullDocumentation = existsSync(path.join(repoRoot, callFull.documentationPath))
    ? readFileSync(path.join(repoRoot, callFull.documentationPath), "utf8")
    : "";
  const callLedger = existsSync(callLedgerPath)
    ? JSON.parse(readFileSync(callLedgerPath, "utf8"))
    : null;
  const callRecords = callLedger?.records ?? [];
  const callRecordIds = callRecords.map((record) => record.statusId);
  const callRecordUrls = callRecords.map((record) => record.statusUrl);
  const callRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(callRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const callLinks = callRecords.flatMap((record) => record.outboundLinks ?? []);
  const callUniqueShortUrls = new Set(callLinks.map((link) => link.shortUrl));
  const callUniqueDestinations = new Set(callLinks.map((link) => link.destinationUrl));
  const callUniqueCallNycDestinations = new Set(
    [...callUniqueDestinations].filter((url) => /https?:\/\/(?:www\.)?callnyc\.org\//i.test(url))
  );
  const callExternalDestinations = new Set(
    [...callUniqueDestinations].filter((url) => !/https?:\/\/(?:www\.)?callnyc\.org\//i.test(url))
  );
  const callVisualTokenRecords = callRecords.filter((record) => record.visualTokens?.length > 0);
  const callImageIndicatorRecords = callRecords.filter((record) =>
    record.visualTokens?.includes("Image")
  );
  const callAmbiguousVisualTokenRecords = callVisualTokenRecords.filter((record) =>
    !record.visualTokens.includes("Image")
  );
  const issuePathPattern = /callnyc\.org\/(cultural-affairs|economy-jobs|environment|finance|general-welfare|governmental-operations|health|housing-and-buildings|immigration|land-use-and-zoning|legal-services|parks|quality-of-life|sanitation|transportation|utilities)\//i;
  const callRecognitionRecords = callRecords.filter(
    (record) => record.relationship === "account-post" &&
      record.outboundLinks?.some((link) => issuePathPattern.test(link.destinationUrl))
  );
  const callInstitutionalHandles = new Set(
    callFull.institutionalHandlesExcluded.map((handle) => handle.toLowerCase())
  );
  const callRecognitionMemberHandlesByRecord = callRecognitionRecords.map((record) =>
    record.mentionedHandles?.filter(
      (handle) => !callInstitutionalHandles.has(handle.toLowerCase())
    ) ?? []
  );
  const callRecognitionHandles = new Set(callRecognitionMemberHandlesByRecord.flat());
  const callRecognitionHandleList = [...callRecognitionHandles]
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callLedgerRecognitionHandleList = [
    ...(callLedger?.aggregateFindings?.councilMemberHandlesNamedInRecognitionsList ?? [])
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callCorpusRecognitionHandleList = [
    ...callNycCorpusFindings.councilMemberHandlesNamedInRecognitionsList
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const callRecognitionIssuePages = new Set(
    callRecognitionRecords.flatMap((record) =>
      record.outboundLinks
        .map((link) => link.destinationUrl)
        .filter((url) => issuePathPattern.test(url))
    )
  );
  const callRecognitionCategories = new Set(
    [...callRecognitionIssuePages].map((url) => url.match(issuePathPattern)?.[1]).filter(Boolean)
  );
  const callFullSources = callNycSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const callFullClaims = callNycSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const callFullInquiries = callNycSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const callFullActiveClaim = claimById.get(callFull.activeClaimId);
  const callFullHeldClaims = callFull.heldClaimIds.map((id) => claimById.get(id));
  const callFullAuditSource = sourceById.get(callFull.auditSourceId);
  const callFullRoleSource = sourceById.get(callFull.roleSourceId);
  const callFullInquiry = inquiryById.get("INQ-CALLNYC-FULL-POPULATION-RECOVERY-2026");
  const callFullProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === callFull.proofId
  );
  const callFullPage = knowledgeBank.pages.find((page) => page.id === "callnyc");
  const callFullOccurrence = callFullPage?.occurrences.find(
    (occurrence) => occurrence.id === "social-engagement-architecture"
  );
  const callLedgerText = callLedger ? JSON.stringify(callLedger) : "";
  const callFullPopulationComplete = Boolean(
    callLedger &&
      callLedger.reviewedAt === "2026-07-14" &&
      callLedger.sourceProfile === "https://x.com/CallNYCapp" &&
      callLedger.method?.authenticatedReadOnlyReview === true &&
      callLedger.method?.freshVerification?.ledgerUrlSetMatchedFreshUnion === true &&
      callLedger.method?.freshVerification?.postsTabUniqueStatusUrls === callFull.expectedPostsTabCount &&
      callLedger.method?.freshVerification?.repliesTabUniqueStatusUrls === callFull.expectedUniqueItems &&
      callLedger.method?.freshVerification?.dateSlicedSearchAuthoredStatusesRecovered === callNycPopulationAudit.dateSlicedSearchAuthoredStatusesRecovered &&
      callLedger.populationAudit.profileCountObserved === callFull.expectedProfileCount &&
      callLedger.populationAudit.postsTabItemsRecovered === callFull.expectedPostsTabCount &&
      callLedger.populationAudit.uniqueItemsRecovered === callFull.expectedUniqueItems &&
      callLedger.populationAudit.accountPostsRecovered === callFull.expectedAccountPosts &&
      callLedger.populationAudit.accountRepliesRecovered === callFull.expectedAccountReplies &&
      callLedger.populationAudit.accountAuthoredStatusesRecovered === callFull.expectedAuthoredStatuses &&
      callLedger.populationAudit.repostsRecovered === callFull.expectedReposts &&
      callLedger.populationAudit.unresolvedPopulationSlots === callFull.expectedUnresolvedSlots &&
      callLedger.populationAudit.dispositionTotal === callFull.expectedProfileCount &&
      callLedger.populationAudit.uniqueItemsRecovered + callLedger.populationAudit.unresolvedPopulationSlots === callLedger.populationAudit.profileCountObserved &&
      callRecords.length === callFull.expectedUniqueItems &&
      new Set(callRecordIds).size === callFull.expectedUniqueItems &&
      new Set(callRecordUrls).size === callFull.expectedUniqueItems &&
      callRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredFrom) && record.recoveredFrom.length &&
          typeof record.text === "string" && record.text.length &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          !("mediaUrls" in record) &&
          !("mediaIndicators" in record) &&
          Array.isArray(record.visualTokens) &&
          record.visualTokens.every((token) =>
            typeof token === "string" && token.length > 0
          ) &&
          Array.isArray(record.outboundLinks) &&
          record.outboundLinks.every((link) =>
            /^https:\/\/t\.co\//.test(link.shortUrl) && /^https?:\/\//.test(link.destinationUrl)
          )
      ) &&
      callRelationshipCounts["account-post"] === callFull.expectedAccountPosts &&
      callRelationshipCounts["account-reply"] === callFull.expectedAccountReplies &&
      callRelationshipCounts.repost === callFull.expectedReposts &&
      callLedger.unresolvedItems.length === callFull.expectedUnresolvedSlots &&
      new Set(callLedger.unresolvedItems.map((item) => item.slot)).size === callFull.expectedUnresolvedSlots &&
      callLedger.unresolvedItems.every((item) =>
        item.status === "not-recovered" && /no status ID or content was recovered/i.test(item.note)
      ) &&
      callRecognitionRecords.length === callFull.expectedIssueRecognitionPosts &&
      callRecognitionMemberHandlesByRecord.every((handles) => handles.length === 1) &&
      callRecognitionHandles.size === callFull.expectedCouncilMemberHandles &&
      JSON.stringify(callRecognitionHandleList) === JSON.stringify(callLedgerRecognitionHandleList) &&
      JSON.stringify(callRecognitionHandleList) === JSON.stringify(callCorpusRecognitionHandleList) &&
      callFull.institutionalHandlesExcluded.every(
        (handle) => !callRecognitionHandles.has(handle)
      ) &&
      callRecognitionIssuePages.size === callFull.expectedUniqueIssuePages &&
      callRecognitionCategories.size === callFull.expectedIssueCategories &&
      callLinks.length === callFull.expectedShortUrlOccurrences &&
      callUniqueShortUrls.size === callFull.expectedUniqueShortUrls &&
      callUniqueDestinations.size === callFull.expectedResolvedDestinations &&
      callUniqueCallNycDestinations.size === callFull.expectedCallNycDestinations &&
      callExternalDestinations.size === callFull.expectedExternalDestinations &&
      callVisualTokenRecords.length === callFull.expectedVisualTokenRecords &&
      callImageIndicatorRecords.length === callFull.expectedImageIndicatorRecords &&
      callAmbiguousVisualTokenRecords.length === callFull.expectedAmbiguousVisualTokenRecords &&
      callNycCorpusFindings.visualTokenRecords === callFull.expectedVisualTokenRecords &&
      callNycCorpusFindings.imageIndicatorRecords === callFull.expectedImageIndicatorRecords &&
      callNycCorpusFindings.ambiguousVisualTokenRecords === callFull.expectedAmbiguousVisualTokenRecords &&
      callNycCorpusFindings.issueRecognitionPosts === callFull.expectedIssueRecognitionPosts &&
      callNycCorpusFindings.councilMemberHandlesNamedInRecognitions === callFull.expectedCouncilMemberHandles &&
      callNycPopulationAudit.unresolvedPopulationSlots === callFull.expectedUnresolvedSlots &&
      callNycSocialCorpus.sources.length === callFull.expectedSourceCount &&
      callNycSocialCorpus.observations.length === callFull.expectedObservationCount &&
      callNycSocialCorpus.claims.length === callFull.expectedClaimCount &&
      callNycSocialCorpus.researchInquiries.length === callFull.expectedInquiryCount &&
      callFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      callFullAuditSource?.kind === "research-run" &&
      callFullAuditSource.canonicalUrl?.includes(callFull.ledgerPath) &&
      callFullAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      callFullAuditSource.doesNotEstablish.some((boundary) => /visual media asset preservation/i.test(boundary)) &&
      callFullRoleSource?.canonicalUrl?.endsWith("/status/710150246781882369") &&
      callFullActiveClaim?.status === "confirmed-with-boundary" &&
      callFullActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/callnyc") &&
          /Jamie paired CallNYC's issue pathways/i.test(projection.text) &&
          /71 data-derived posts/i.test(projection.text) &&
          /61 issue pages/i.test(projection.text) &&
          /26 sitting Council-member accounts/i.test(projection.text)
      ) &&
      callFullActiveClaim.boundaries.some((boundary) => /intended institutional audience/i.test(boundary)) &&
      callFullActiveClaim.antiClaims.some((antiClaim) => /Twenty-six Council members engaged/i.test(antiClaim)) &&
      callFullHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      callFullInquiry?.resultStatus === "partially-recovered" &&
      callFullInquiry.findings.some((finding) => /47 of 92/i.test(finding)) &&
      callFullInquiry.limitations.some((limitation) => /not recovered rather than inferred/i.test(limitation)) &&
      callFullInquiry.limitations.some((limitation) => /Visual tokens are not archived media URLs or assets/i.test(limitation)) &&
      callFullProof?.status === "source-backed" &&
      callFullProof.sourceIds.includes(callFull.auditSourceId) &&
      callFullOccurrence?.claimId === callFull.activeClaimId &&
      callFullOccurrence.sourceIds.includes(callFull.auditSourceId) &&
      callFullPage?.sourceOrder.includes(callFull.auditSourceId) &&
      callnycMdx.includes(callFull.activeClaimId) &&
      callnycMdx.includes("social-engagement-architecture") &&
      callFullDocumentation.includes("107-URL union matched") &&
      callFullDocumentation.includes("not a platform export") &&
      /Media assets and their public locators were not\s+archived/.test(callFullDocumentation) &&
      /Eighty-two\s+records carry the literal token `Image`/.test(callFullDocumentation) &&
      callFullDocumentation.includes("not interpreted as proof of attached media") &&
      callFullDocumentation.includes("`@NYCHA` are not counted as Council members") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(callLedgerText) &&
      publicRegistryText.includes(callFull.activeClaimId) &&
      callFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const wowFull = suite.pilot.wowlistFullPopulation;
  const wowLedgerPath = path.join(repoRoot, wowFull.ledgerPath);
  const wowDocumentation = existsSync(path.join(repoRoot, wowFull.documentationPath))
    ? readFileSync(path.join(repoRoot, wowFull.documentationPath), "utf8")
    : "";
  const wowLedger = fixtures.wowlistLedger ?? (existsSync(wowLedgerPath)
    ? JSON.parse(readFileSync(wowLedgerPath, "utf8"))
    : null);
  const wowRecords = wowLedger?.records ?? [];
  const wowRecordIds = wowRecords.map((record) => record.statusId);
  const wowRecordUrls = wowRecords.map((record) => record.statusUrl);
  const wowRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const wowAuthoredRecords = wowRecords.filter((record) => record.relationship !== "repost");
  const wowRepostRecords = wowRecords.filter((record) => record.relationship === "repost");
  const wowRepostSourceHandles = new Set(wowRepostRecords.map((record) => record.authorHandle));
  const wowExternalHandles = new Set(
    wowAuthoredRecords.flatMap((record) => record.mentionedHandles ?? [])
      .filter((handle) => handle.toLowerCase() !== "@wowlist")
  );
  const wowLinks = wowRecords.flatMap((record) => record.outboundLinks ?? []);
  const wowUniqueShortUrls = new Set(wowLinks.map((link) => link.shortUrl));
  const wowUniqueDestinations = new Set(wowLinks.map((link) => link.destinationUrl));
  const wowProjectHosts = new Set(["wowlist.org", "nycdiy.org", "sundaydinnernyc.com"]);
  const wowDestinationHost = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return "unresolved";
    }
  };
  const wowProjectDestinations = new Set(
    [...wowUniqueDestinations].filter((url) => wowProjectHosts.has(wowDestinationHost(url)))
  );
  const wowExternalDestinations = new Set(
    [...wowUniqueDestinations].filter((url) => !wowProjectHosts.has(wowDestinationHost(url)))
  );
  const wowAuthoredReactionSnapshot = wowAuthoredRecords.reduce(
    (aggregate, record) => {
      const metrics = record.visibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const wowThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const wowFullSources = wowlistSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const wowFullClaims = wowlistSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const wowFullInquiries = wowlistSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const wowFullActiveClaim = claimById.get(wowFull.activeClaimId);
  const wowFullHeldClaims = wowFull.heldClaimIds.map((id) => claimById.get(id));
  const wowFullAuditSource = sourceById.get(wowFull.auditSourceId);
  const wowFullRepliesOnlySource = sourceById.get(wowFull.repliesOnlySourceId);
  const wowFullInquiry = inquiryById.get("INQ-WOWLIST-FULL-POPULATION-2026");
  const wowTractionInquiry = inquiryById.get("INQ-WOWLIST-HISTORICAL-TRACTION-AND-ADOPTION");
  const wowFullProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === wowFull.proofId
  );
  const wowFullPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
  const wowFullOccurrence = wowFullPage?.occurrences.find(
    (occurrence) => occurrence.id === "public-support-surface"
  );
  const wowLedgerText = wowLedger ? JSON.stringify(wowLedger) : "";
  const wowFullPopulationComplete = Boolean(
    wowLedger &&
      wowLedger.reviewedAt === "2026-07-14" &&
      wowLedger.sourceProfile === "https://x.com/wowlist" &&
      wowLedger.method?.authenticatedReadOnlyReview === true &&
      wowLedger.method?.freshVerification?.profileCountReconfirmed === wowFull.expectedProfileCount &&
      wowLedger.method?.freshVerification?.postsTabUniqueStatusUrls === wowFull.expectedPostsTabCount &&
      wowLedger.method?.freshVerification?.repliesTabUniqueStatusUrls === wowFull.expectedRepliesTabCount &&
      wowLedger.method?.freshVerification?.ledgerUrlSetMatchedAuthenticatedUnion === true &&
      wowLedger.method?.freshVerification?.repliesOnlyStatusDirectlyReconfirmed === true &&
      wowLedger.populationAudit.profileCountObserved === wowFull.expectedProfileCount &&
      wowLedger.populationAudit.postsTabItemsRecovered === wowFull.expectedPostsTabCount &&
      wowLedger.populationAudit.repliesTabItemsRecovered === wowFull.expectedRepliesTabCount &&
      wowLedger.populationAudit.uniqueItemsRecovered === wowFull.expectedUniqueItems &&
      wowLedger.populationAudit.accountPostsRecovered === wowFull.expectedAccountPosts &&
      wowLedger.populationAudit.accountRepliesRecovered === wowFull.expectedAccountReplies &&
      wowLedger.populationAudit.accountAuthoredStatusesRecovered === wowFull.expectedAuthoredStatuses &&
      wowLedger.populationAudit.repostsRecovered === wowFull.expectedReposts &&
      wowLedger.populationAudit.distinctRepostSourceAccounts === wowFull.expectedRepostSourceAccounts &&
      wowLedger.populationAudit.unresolvedPopulationSlots === wowFull.expectedUnresolvedSlots &&
      wowLedger.populationAudit.dispositionTotal === wowFull.expectedProfileCount &&
      wowRecords.length === wowFull.expectedUniqueItems &&
      new Set(wowRecordIds).size === wowFull.expectedUniqueItems &&
      new Set(wowRecordUrls).size === wowFull.expectedUniqueItems &&
      wowRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredFrom) && record.recoveredFrom.length &&
          typeof record.contentSummary === "string" && record.contentSummary.length &&
          typeof record.contentDigestSha256 === "string" && /^[a-f0-9]{64}$/.test(record.contentDigestSha256) &&
          !("text" in record) &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.outboundLinks) &&
          record.outboundLinks.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) && /^https?:\/\//.test(link.destinationUrl)
          ) &&
          Number.isInteger(record.visibleMetrics?.replies) &&
          Number.isInteger(record.visibleMetrics?.reposts) &&
          Number.isInteger(record.visibleMetrics?.likes) &&
          record.metricOwner === (record.relationship === "repost" ? "source-status" : "wowlist-status")
      ) &&
      wowRelationshipCounts["account-post"] === wowFull.expectedAccountPosts &&
      wowRelationshipCounts["account-reply"] === wowFull.expectedAccountReplies &&
      wowRelationshipCounts.repost === wowFull.expectedReposts &&
      wowRepostSourceHandles.size === wowFull.expectedRepostSourceAccounts &&
      wowExternalHandles.size === wowFull.expectedExternalHandles &&
      wowLinks.length === wowFull.expectedShortUrlOccurrences &&
      wowUniqueShortUrls.size === wowFull.expectedUniqueShortUrls &&
      wowUniqueDestinations.size === wowFull.expectedResolvedDestinations &&
      wowProjectDestinations.size === wowFull.expectedProjectOrLineageDestinations &&
      wowExternalDestinations.size === wowFull.expectedExternalDestinations &&
      wowThemeCounts["product-support-and-onboarding"] === wowFull.expectedSupportReplies &&
      wowThemeCounts["event-distribution"] === wowFull.expectedEventDistributionPosts &&
      wowThemeCounts["scene-knowledge-and-connection"] === wowFull.expectedSceneKnowledgePosts &&
      wowThemeCounts["product-community-infrastructure"] === wowFull.expectedProductInfrastructurePosts &&
      wowThemeCounts["civic-mobilization-and-care"] === wowFull.expectedCivicCareAuthoredPosts &&
      wowThemeCounts["civic-care-amplification"] === wowFull.expectedCivicCareReposts &&
      wowThemeCounts["platform-use-and-event-amplification"] === wowFull.expectedPlatformUseReposts &&
      wowAuthoredReactionSnapshot.statusesWithVisibleReaction === wowFull.expectedAuthoredStatusesWithReaction &&
      wowAuthoredReactionSnapshot.replies === wowFull.expectedAuthoredVisibleReplies &&
      wowAuthoredReactionSnapshot.reposts === wowFull.expectedAuthoredVisibleReposts &&
      wowAuthoredReactionSnapshot.likes === wowFull.expectedAuthoredVisibleLikes &&
      wowlistPopulationAudit.uniqueItemsRecovered === wowFull.expectedUniqueItems &&
      wowlistPopulationAudit.unresolvedPopulationSlots === wowFull.expectedUnresolvedSlots &&
      wowlistCorpusFindings.directProductSupportReplies === wowFull.expectedSupportReplies &&
      wowlistCorpusFindings.uniqueResolvedDestinations === wowFull.expectedResolvedDestinations &&
      wowlistCorpusFindings.authoredStatusesWithVisibleReaction === wowFull.expectedAuthoredStatusesWithReaction &&
      wowlistSocialCorpus.sources.length === wowFull.expectedSourceCount &&
      wowlistSocialCorpus.observations.length === wowFull.expectedObservationCount &&
      wowlistSocialCorpus.claims.length === wowFull.expectedClaimCount &&
      wowlistSocialCorpus.researchInquiries.length === wowFull.expectedInquiryCount &&
      wowFullSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      wowFullAuditSource?.kind === "research-run" &&
      wowFullAuditSource.canonicalUrl?.includes(wowFull.ledgerPath) &&
      wowFullAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      wowFullRepliesOnlySource?.canonicalUrl?.endsWith(`/status/${wowlistPopulationAudit.repliesOnlyStatusId}`) &&
      wowFullActiveClaim?.status === "confirmed-with-boundary" &&
      wowFullActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/wowlist") &&
          /shared public account became a direct support surface/i.test(projection.text) &&
          /six surviving replies/i.test(projection.text)
      ) &&
      wowFullActiveClaim.boundaries.some((boundary) => /shared project infrastructure/i.test(boundary)) &&
      wowFullActiveClaim.antiClaims.some((antiClaim) => /personally wrote all six replies/i.test(antiClaim)) &&
      wowFullHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      wowFullInquiry?.resultStatus === "recovered" &&
      wowFullInquiry.limitations.some((limitation) => /not prove that no record was deleted/i.test(limitation)) &&
      wowTractionInquiry?.resultStatus === "inconclusive" &&
      wowTractionInquiry.limitations.some((limitation) => /not equivalent to adoption or impact/i.test(limitation)) &&
      wowFullProof?.status === "source-backed" &&
      wowFullProof.sourceIds.includes(wowFull.auditSourceId) &&
      wowFullOccurrence?.claimId === wowFull.activeClaimId &&
      wowFullOccurrence.sourceIds.length === 7 &&
      wowFullPage?.sourceOrder.length === 8 &&
      wowFullPage.sourceOrder.includes("SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026") &&
      wowlistMdx.includes(wowFull.activeClaimId) &&
      wowlistMdx.includes("public-support-surface") &&
      wowDocumentation.includes("all 38 unique items") &&
      wowDocumentation.includes("not a platform export") &&
      wowDocumentation.includes("Metrics on the 16 reposted source statuses are excluded") &&
      wowDocumentation.includes("not press coverage, reviews, or endorsements of WOW List") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(wowLedgerText) &&
      publicRegistryText.includes(wowFull.activeClaimId) &&
      wowFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const kcthFull = suite.pilot.kcTownHallFullPopulation;
  const kcthLedgerPath = path.join(repoRoot, kcthFull.ledgerPath);
  const kcthDocumentation = existsSync(path.join(repoRoot, kcthFull.documentationPath))
    ? readFileSync(path.join(repoRoot, kcthFull.documentationPath), "utf8")
    : "";
  const kcthLedger = fixtures.kcTownHallLedger ?? (existsSync(kcthLedgerPath)
    ? JSON.parse(readFileSync(kcthLedgerPath, "utf8"))
    : null);
  const kcthRecords = kcthLedger?.records ?? [];
  const kcthRecordIds = kcthRecords.map((record) => record.statusId);
  const kcthRecordUrls = kcthRecords.map((record) => record.statusUrl);
  const kcthRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const kcthAuthoredRecords = kcthRecords.filter((record) => record.relationship !== "repost");
  const kcthRepostRecords = kcthRecords.filter((record) => record.relationship === "repost");
  const kcthRepostSourceHandles = new Set(kcthRepostRecords.map((record) => record.statusOwner));
  const kcthExternalHandles = new Set(
    kcthAuthoredRecords.flatMap((record) => record.publicMentions ?? [])
      .filter((handle) => handle.toLowerCase() !== "@kctownhall")
  );
  const countKcthMention = (handle) => kcthAuthoredRecords.filter((record) =>
    record.publicMentions.some((mention) => mention.toLowerCase() === handle.toLowerCase())
  ).length;
  const kcthLinks = kcthRecords.flatMap((record) => record.postedUrls ?? []);
  const kcthUniqueShortUrls = new Set(kcthLinks.map((link) => link.shortUrl));
  const kcthUniqueDestinations = new Set(
    kcthLinks.map((link) => link.resolvedUrl).filter(Boolean)
  );
  const isKcthProjectDestination = (url) =>
    /kctownhall\.com|facebook\.com\/KCTownHall|youtube\.com\/watch\?v=(PmLjLyOpS9I|onCKU-TuPhc)/i.test(url);
  const kcthProjectDestinations = new Set(
    [...kcthUniqueDestinations].filter(isKcthProjectDestination)
  );
  const kcthExternalDestinations = new Set(
    [...kcthUniqueDestinations].filter((url) => !isKcthProjectDestination(url))
  );
  const kcthThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const kcthTireRecords = kcthRecords.filter(
    (record) => record.primaryTheme === "resident-tire-intake-and-operations"
  );
  const kcthAuthoredReactionSnapshot = kcthAuthoredRecords.reduce(
    (aggregate, record) => {
      const metrics = record.currentVisibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const kcthRepostReactionSnapshot = kcthRepostRecords.reduce(
    (aggregate, record) => {
      const metrics = record.currentVisibleMetrics;
      aggregate.statuses += 1;
      aggregate.statusesWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      aggregate.replies += metrics.replies;
      aggregate.reposts += metrics.reposts;
      aggregate.likes += metrics.likes;
      return aggregate;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const kcthDirectResponseRecords = kcthRecords.filter((record) =>
    record.outsideAuthoredInteraction?.targetAccount?.toLowerCase() === "@kctownhall" &&
      ["quote-post", "reply"].includes(record.outsideAuthoredInteraction?.interactionType) &&
      record.outsideAuthoredInteraction?.stakeholderRole === "sitting-kansas-city-council-member" &&
      record.outsideAuthoredInteraction?.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
  );
  const kcthCityPoliticalHandles = new Set([
    "@QuintonLucasKC",
    "@Robinson4kc",
    "@joliejustus"
  ]);
  const kcthCityPoliticalReposts = kcthRepostRecords.filter((record) =>
    [...kcthCityPoliticalHandles].some(
      (handle) => handle.toLowerCase() === record.statusOwner.toLowerCase()
    )
  );
  const kcthStoredThemeCounts = Object.fromEntries(
    kcthLedger?.aggregateFindings?.primaryThemeCounts?.map(({ value, count }) => [value, count]) ?? []
  );
  const kcthStoredRepostSourceCounts = Object.fromEntries(
    kcthLedger?.aggregateFindings?.repostNetwork?.sourceAccounts?.map(({ value, count }) => [value.toLowerCase(), count]) ?? []
  );
  const kcthRepostSourceCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRepostRecords, (record) => record.statusOwner.toLowerCase()))
      .map(([handle, records]) => [handle, records.length])
  );
  const equalCountMaps = (left, right) => {
    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    return [...keys].every((key) => left[key] === right[key]);
  };
  const equalStringSets = (left, right) =>
    left.size === right.size && [...left].every((value) => right.has(value));
  const kcthTireHashtagOccurrences = kcthTireRecords.reduce(
    (total, record) => total + record.hashtags.filter((hashtag) => hashtag.toLowerCase() === "#tiredoftires").length,
    0
  );
  const kcthTireHashtagBearingRecords = kcthTireRecords.filter((record) =>
    record.hashtags.some((hashtag) => hashtag.toLowerCase() === "#tiredoftires")
  ).length;
  const kcthAggregateFindingsRecompute = Boolean(
    kcthLedger &&
      equalCountMaps(kcthStoredThemeCounts, kcthThemeCounts) &&
      kcthLedger.aggregateFindings.tireWorkflow.classifiedRecords === kcthTireRecords.length &&
      kcthLedger.aggregateFindings.tireWorkflow.hashtagBearingRecords === kcthTireHashtagBearingRecords &&
      kcthLedger.aggregateFindings.tireWorkflow.hashtagOccurrences === kcthTireHashtagOccurrences &&
      kcthLedger.aggregateFindings.tireWorkflow.accountPosts === kcthTireRecords.filter((record) => record.relationship === "account-post").length &&
      kcthLedger.aggregateFindings.tireWorkflow.accountReplies === kcthTireRecords.filter((record) => record.relationship === "account-reply").length &&
      kcthLedger.aggregateFindings.tireWorkflow.reposts === kcthTireRecords.filter((record) => record.relationship === "repost").length &&
      kcthLedger.aggregateFindings.repostNetwork.statuses === kcthRepostRecords.length &&
      kcthLedger.aggregateFindings.repostNetwork.distinctSourceAccounts === kcthRepostSourceHandles.size &&
      equalCountMaps(kcthStoredRepostSourceCounts, kcthRepostSourceCounts) &&
      kcthLedger.aggregateFindings.repostNetwork.cityCouncilFigureSourceStatuses === kcthCityPoliticalReposts.length &&
      equalStringSets(
        new Set(kcthLedger.aggregateFindings.repostNetwork.cityCouncilFigureSourceAccounts.map((handle) => handle.toLowerCase())),
        new Set(kcthCityPoliticalReposts.map((record) => record.statusOwner.toLowerCase()))
      ) &&
      kcthLedger.aggregateFindings.postedLinks.occurrences === kcthLinks.length &&
      kcthLedger.aggregateFindings.postedLinks.uniqueShortUrls === kcthUniqueShortUrls.size &&
      kcthLedger.aggregateFindings.postedLinks.uniqueResolvedDestinations === kcthUniqueDestinations.size &&
      kcthLedger.aggregateFindings.postedLinks.uniqueProjectOrLineageDestinations === kcthProjectDestinations.size &&
      equalStringSets(
        new Set(kcthLedger.aggregateFindings.postedLinks.resolvedDestinations),
        kcthUniqueDestinations
      ) &&
      JSON.stringify(kcthLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot) === JSON.stringify(kcthAuthoredReactionSnapshot) &&
      JSON.stringify(kcthLedger.aggregateFindings.repostSourceVisibleReactionSnapshot) === JSON.stringify(kcthRepostReactionSnapshot) &&
      /Metrics on reposted statuses belong to their source statuses/i.test(kcthLedger.aggregateFindings.metricBoundary)
  );
  const kcthFullSources = kcTownHallSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const kcthFullClaims = kcTownHallSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const kcthFullInquiries = kcTownHallSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const kcthActiveClaim = claimById.get(kcthFull.activeClaimId);
  const kcthHeldClaims = kcthFull.heldClaimIds.map((id) => claimById.get(id));
  const kcthAuditSource = sourceById.get(kcthFull.auditSourceId);
  const kcthFullInquiry = inquiryById.get("INQ-KCTH-FULL-POPULATION-2026");
  const kcthTractionInquiry = inquiryById.get("INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES");
  const kcthAuthorshipInquiry = inquiryById.get("INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP");
  const kcthCouncilResponseClaim = claimById.get("CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR");
  const kcthProof = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === kcthFull.proofId
  );
  const kcthPage = knowledgeBank.pages.find((page) => page.id === "kc-town-hall");
  const kcthOccurrence = kcthPage?.occurrences.find(
    (occurrence) => occurrence.id === "public-service-interface"
  );
  const kcthLedgerText = kcthLedger ? JSON.stringify(kcthLedger) : "";
  const kcthFullPopulationComplete = Boolean(
    kcthLedger &&
      kcthLedger.account === "@KCTownHall" &&
      kcthLedger.observedAt === "2026-07-14" &&
      kcthLedger.population.displayedProfileCount === kcthFull.expectedProfileCount &&
      kcthLedger.population.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.population.attributableRecords === kcthFull.expectedRepliesTabCount &&
      kcthLedger.population.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.population.unresolvedProfileCountSlots === kcthFull.expectedUnresolvedSlots &&
      kcthLedger.population.relationshipCounts.accountPosts === kcthFull.expectedAccountPosts &&
      kcthLedger.population.relationshipCounts.accountReplies === kcthFull.expectedAccountReplies &&
      kcthLedger.population.relationshipCounts.reposts === kcthFull.expectedReposts &&
      /complete recovery of the surviving/i.test(kcthLedger.population.completenessStatement) &&
      /not a native X export/i.test(kcthLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(kcthLedger.method.authenticationBoundary) &&
      kcthRecords.length === kcthFull.expectedUniqueItems &&
      new Set(kcthRecordIds).size === kcthFull.expectedUniqueItems &&
      new Set(kcthRecordUrls).size === kcthFull.expectedUniqueItems &&
      kcthRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "repost"].includes(record.relationship) &&
          Array.isArray(record.recoveredRoutes) && record.recoveredRoutes.length &&
          typeof record.publicSummary === "string" && record.publicSummary.length &&
          typeof record.contentDigestSha256 === "string" && /^[a-f0-9]{64}$/.test(record.contentDigestSha256) &&
          !("text" in record) && !("phone" in record) && !("address" in record) &&
          Array.isArray(record.publicMentions) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.postedUrls) &&
          record.postedUrls.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) &&
              (link.resolvedUrl === null || /^https?:\/\//.test(link.resolvedUrl))
          ) &&
          Number.isInteger(record.currentVisibleMetrics?.replies) &&
          Number.isInteger(record.currentVisibleMetrics?.reposts) &&
          Number.isInteger(record.currentVisibleMetrics?.likes) &&
          record.metricOwner === (record.relationship === "repost"
            ? "source-status-not-kctownhall-repost-action"
            : "account-authored-status") &&
          Number.isInteger(record.mediaSignals?.photoCount) &&
          typeof record.mediaSignals?.hasVideoOrGif === "boolean" &&
          (!record.outsideAuthoredInteraction || (
            record.relationship === "repost" &&
            record.outsideAuthoredInteraction.targetAccount === "@KCTownHall" &&
            ["quote-post", "reply"].includes(record.outsideAuthoredInteraction.interactionType) &&
            record.outsideAuthoredInteraction.stakeholderRole === "sitting-kansas-city-council-member" &&
            record.outsideAuthoredInteraction.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
          ))
      ) &&
      kcthDirectResponseRecords.every((record) =>
        record.relationship === "repost" &&
          record.metricOwner === "source-status-not-kctownhall-repost-action"
      ) &&
      kcthAggregateFindingsRecompute &&
      kcthRelationshipCounts["account-post"] === kcthFull.expectedAccountPosts &&
      kcthRelationshipCounts["account-reply"] === kcthFull.expectedAccountReplies &&
      kcthRelationshipCounts.repost === kcthFull.expectedReposts &&
      kcthRepostSourceHandles.size === kcthFull.expectedRepostSourceAccounts &&
      kcthExternalHandles.size === kcthFull.expectedExternalHandles &&
      countKcthMention("@QuintonLucasKC") === kcthFull.expectedQuintonLucasMentions &&
      countKcthMention("@Robinson4kc") === kcthFull.expectedMelissaRobinsonMentions &&
      kcthCityPoliticalReposts.length === kcthFull.expectedCityPoliticalFigureReposts &&
      kcthDirectResponseRecords.length === kcthFull.expectedDirectCouncilResponses &&
      new Set(kcthDirectResponseRecords.map((record) => record.statusOwner.toLowerCase())).size === kcthFull.expectedDirectCouncilAccounts &&
      kcthLinks.length === kcthFull.expectedShortUrlOccurrences &&
      kcthUniqueShortUrls.size === kcthFull.expectedUniqueShortUrls &&
      kcthUniqueDestinations.size === kcthFull.expectedResolvedDestinations &&
      kcthProjectDestinations.size === kcthFull.expectedProjectOrLineageDestinations &&
      kcthExternalDestinations.size === kcthFull.expectedExternalDestinations &&
      kcthThemeCounts["resident-tire-intake-and-operations"] === kcthFull.expectedTireWorkflowRecords &&
      kcthTireRecords.filter((record) => record.relationship === "account-post").length === kcthFull.expectedTireWorkflowPosts &&
      kcthTireRecords.filter((record) => record.relationship === "account-reply").length === kcthFull.expectedTireWorkflowReplies &&
      kcthTireRecords.filter((record) => record.relationship === "repost").length === kcthFull.expectedTireWorkflowReposts &&
      kcthThemeCounts["civic-information-and-service-routing"] === kcthFull.expectedCivicInformationRecords &&
      kcthThemeCounts["neighborhood-culture-and-community"] === kcthFull.expectedNeighborhoodCultureRecords &&
      kcthThemeCounts["town-hall-development-and-participation"] === kcthFull.expectedDevelopmentRecords &&
      kcthThemeCounts["racial-justice-documentation"] === kcthFull.expectedRacialJusticeRecords &&
      kcthThemeCounts["pandemic-resource-routing"] === kcthFull.expectedPandemicResourceRecords &&
      kcthAuthoredReactionSnapshot.statusesWithVisibleReaction === kcthFull.expectedAuthoredStatusesWithReaction &&
      kcthAuthoredReactionSnapshot.replies === kcthFull.expectedAuthoredVisibleReplies &&
      kcthAuthoredReactionSnapshot.reposts === kcthFull.expectedAuthoredVisibleReposts &&
      kcthAuthoredReactionSnapshot.likes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallPopulationAudit.uniqueItemsRecovered === kcthFull.expectedUniqueItems &&
      kcTownHallPopulationAudit.unresolvedPopulationSlots === kcthFull.expectedUnresolvedSlots &&
      kcTownHallCorpusFindings.tireWorkflowRecords === kcthFull.expectedTireWorkflowRecords &&
      kcTownHallCorpusFindings.directCouncilMemberResponseStatuses === kcthFull.expectedDirectCouncilResponses &&
      kcTownHallCorpusFindings.authoredVisibleLikes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallSocialCorpus.sources.length === kcthFull.expectedSourceCount &&
      kcTownHallSocialCorpus.observations.length === kcthFull.expectedObservationCount &&
      kcTownHallSocialCorpus.claims.length === kcthFull.expectedClaimCount &&
      kcTownHallSocialCorpus.researchInquiries.length === kcthFull.expectedInquiryCount &&
      kcthFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      kcthAuditSource?.kind === "research-run" &&
      kcthAuditSource.canonicalUrl?.includes(kcthFull.ledgerPath) &&
      kcthAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      kcthActiveClaim?.status === "confirmed-with-boundary" &&
      kcthActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall") &&
          /shared public account as an operating surface/i.test(projection.text) &&
          /100 of 183 surviving records/i.test(projection.text)
      ) &&
      kcthActiveClaim.boundaries.some((boundary) => /shared project identity/i.test(boundary)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /One hundred records equal/i.test(antiClaim)) &&
      kcthCouncilResponseClaim?.antiClaims.some((antiClaim) => /Nine Council members engaged/i.test(antiClaim)) &&
      kcthHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      kcthFullInquiry?.resultStatus === "recovered" &&
      kcthFullInquiry.limitations.some((limitation) => /does not prove that no record was deleted/i.test(limitation)) &&
      kcthTractionInquiry?.resultStatus === "partially-recovered" &&
      kcthTractionInquiry.findings.some((finding) => /only two records meet the direct-response definition/i.test(finding)) &&
      kcthAuthorshipInquiry?.resultStatus === "inconclusive" &&
      kcthAuthorshipInquiry.limitations.some((limitation) => /cannot identify an author/i.test(limitation)) &&
      kcthProof?.status === "source-backed" &&
      kcthProof.sourceIds.includes(kcthFull.auditSourceId) &&
      kcthOccurrence?.claimId === kcthFull.activeClaimId &&
      kcthOccurrence.sourceIds.length === 5 &&
      kcthPage?.sourceOrder.includes(kcthFull.auditSourceId) &&
      kcTownHallMdx.includes(kcthFull.activeClaimId) &&
      kcTownHallMdx.includes("public-service-interface") &&
      kcthDocumentation.includes("all 183 unique surviving items") &&
      kcthDocumentation.includes("not a platform export") &&
      kcthDocumentation.includes("outreach counts, not responses") &&
      kcthDocumentation.includes("Metrics on the 28 reposted source statuses are excluded") &&
      kcthDocumentation.includes("not necessarily coverage of KC Town Hall") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(kcthLedgerText) &&
      kcthRecords.every((record) =>
        !/(?:816[- .])\d{3}[- .]\d{4}/.test(record.publicSummary) &&
        !/\b\d{3,5}\s+(?:N\.?|S\.?|E\.?|W\.?)?\s*[A-Z][A-Za-z]+(?:\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard))\b/i.test(record.publicSummary)
      ) &&
      publicRegistryText.includes(kcthFull.activeClaimId) &&
      kcthFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const nycacFull = suite.pilot.nycacPopulationDisposition;
  const nycacLedgerPath = path.join(repoRoot, nycacFull.ledgerPath);
  const nycacDocumentation = existsSync(path.join(repoRoot, nycacFull.documentationPath))
    ? readFileSync(path.join(repoRoot, nycacFull.documentationPath), "utf8")
    : "";
  const nycacLedger = fixtures.nycacLedger ?? (existsSync(nycacLedgerPath)
    ? JSON.parse(readFileSync(nycacLedgerPath, "utf8"))
    : null);
  const nycacRecords = nycacLedger?.records ?? [];
  const nycacRecordIds = nycacRecords.map((record) => record.statusId);
  const nycacRecordUrls = nycacRecords.map((record) => record.statusUrl);
  const nycacRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const nycacAuthoredRecords = nycacRecords.filter((record) => record.relationship !== "native-repost-source");
  const nycacRepostSourceRecords = nycacRecords.filter((record) => record.relationship === "native-repost-source");
  const nycacRepostSourceAccounts = new Set(nycacRepostSourceRecords.map((record) => record.sourceAccount));
  const nycacDirectMentionRecords = nycacRepostSourceRecords.filter((record) => record.directMentionOfAccount);
  const nycacDirectMentionAccounts = new Set(nycacDirectMentionRecords.map((record) => record.sourceAccount));
  const nycacLinks = nycacRecords.flatMap((record) => record.postedUrls ?? []);
  const nycacUniqueShortUrls = new Set(nycacLinks.map((link) => link.shortUrl));
  const nycacResolvedShortUrls = new Set(
    nycacLinks.filter((link) => link.resolvedUrl).map((link) => link.shortUrl)
  );
  const nycacUnresolvedShortUrls = new Set(
    nycacLinks.filter((link) => !link.resolvedUrl).map((link) => link.shortUrl)
  );
  const nycacResolvedDestinations = new Set(
    nycacLinks.map((link) => link.resolvedUrl).filter(Boolean)
  );
  const countNycacCampaignSignal = (signal) => nycacRecords.filter(
    (record) => record.campaignSignals.includes(signal)
  ).length;
  const nycacAuthoredReactionSnapshot = nycacAuthoredRecords.reduce(
    (totals, record) => {
      const metrics = record.reactionSnapshot;
      totals.records += 1;
      totals.recordsWithVisibleReaction += metrics.replies + metrics.reposts + metrics.likes > 0 ? 1 : 0;
      totals.replies += metrics.replies;
      totals.reposts += metrics.reposts;
      totals.likes += metrics.likes;
      return totals;
    },
    { records: 0, recordsWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const nycacFullSources = nycacSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const nycacLinkedArticleSources = nycacSocialCorpus.intakeItems[0].sourceIds
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source) => source?.kind === "published-article");
  const nycacFullClaims = nycacSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const nycacHeldClaims = nycacFull.heldClaimIds.map((id) => claimById.get(id));
  const nycacFullInquiries = nycacSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const nycacAuditSource = sourceById.get(nycacFull.auditSourceId);
  const nycacFullInquiry = inquiryById.get("INQ-NYCAC-FULL-POPULATION-2026");
  const nycacCarrierInquiry = inquiryById.get("INQ-NYCAC-HISTORICAL-CARRIER-RECOVERY");
  const nycacContinuityInquiry = inquiryById.get("INQ-NYCAC-SOCIAL-EDITORIAL-CONTINUITY");
  const nycacSharedIdentityClaim = claimById.get("CLM-NYCAC-SHARED-SOCIAL-IDENTITY");
  const nycacLedgerText = nycacLedger ? JSON.stringify(nycacLedger) : "";
  const nycacPopulationDispositionComplete = Boolean(
    nycacLedger &&
      nycacLedger.account === "@NYCArtC" &&
      nycacLedger.observedAt === "2026-07-14" &&
      nycacLedger.population.displayedProfileCount === nycacFull.expectedProfileCount &&
      nycacLedger.population.itemLevelRecordsRecovered === nycacFull.expectedUniqueItems &&
      nycacLedger.population.unresolvedProfileCountSlots === nycacFull.expectedUnresolvedSlots &&
      nycacLedger.population.dispositionTotal === nycacFull.expectedProfileCount &&
      nycacLedger.population.itemLevelRecordsRecovered + nycacLedger.population.unresolvedProfileCountSlots === nycacFull.expectedProfileCount &&
      nycacLedger.population.relationshipCounts["account-post"] === nycacFull.expectedAccountPosts &&
      nycacLedger.population.relationshipCounts["account-reply"] === nycacFull.expectedAccountReplies &&
      nycacLedger.population.relationshipCounts["native-repost-source"] === nycacFull.expectedRepostSourceStatuses &&
      nycacLedger.unresolvedItems.length === 1 &&
      nycacLedger.unresolvedItems[0].count === nycacFull.expectedUnresolvedSlots &&
      nycacLedger.unresolvedItems[0].doesNotProve.length >= 4 &&
      /100 percent population reconciliation, not 100 percent item-level recovery/i.test(nycacLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(nycacLedger.method.authenticationBoundary) &&
      nycacRecords.length === nycacFull.expectedUniqueItems &&
      new Set(nycacRecordIds).size === nycacFull.expectedUniqueItems &&
      new Set(nycacRecordUrls).size === nycacFull.expectedUniqueItems &&
      nycacRecords.every((record) =>
        /^\d+$/.test(record.statusId) &&
          record.statusUrl.endsWith(`/status/${record.statusId}`) &&
          ["account-post", "account-reply", "native-repost-source"].includes(record.relationship) &&
          typeof record.sourceAccount === "string" && record.sourceAccount.startsWith("@") &&
          typeof record.publicSummary === "string" && record.publicSummary.length &&
          typeof record.contentDigest === "string" && /^[a-f0-9]{64}$/.test(record.contentDigest) &&
          !("text" in record) &&
          Array.isArray(record.campaignSignals) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.publicMentions) &&
          Array.isArray(record.postedUrls) &&
          record.postedUrls.every((link) =>
            /^https?:\/\/t\.co\//.test(link.shortUrl) &&
              (link.resolvedUrl === null || /^https?:\/\//.test(link.resolvedUrl)) &&
              ["resolved-currently", "not-resolved"].includes(link.resolutionStatus)
          ) &&
          Number.isInteger(record.mediaSignals?.imageCount) &&
          (record.relationship === "native-repost-source"
            ? record.reactionSnapshot === null && record.metricOwner === "source-status-excluded"
            : Number.isInteger(record.reactionSnapshot?.replies) &&
              Number.isInteger(record.reactionSnapshot?.reposts) &&
              Number.isInteger(record.reactionSnapshot?.likes) &&
              record.metricOwner === "nycartc-status")
      ) &&
      nycacRelationshipCounts["account-post"] === nycacFull.expectedAccountPosts &&
      nycacRelationshipCounts["account-reply"] === nycacFull.expectedAccountReplies &&
      nycacRelationshipCounts["native-repost-source"] === nycacFull.expectedRepostSourceStatuses &&
      nycacAuthoredRecords.length === nycacFull.expectedAuthoredStatuses &&
      nycacRepostSourceAccounts.size === nycacFull.expectedRepostSourceAccounts &&
      nycacDirectMentionRecords.length === nycacFull.expectedDirectMentionStatuses &&
      nycacDirectMentionAccounts.size === nycacFull.expectedDirectMentionAccounts &&
      countNycacCampaignSignal("fair-rent-nyc") === nycacFull.expectedFairRentSignals &&
      countNycacCampaignSignal("let-nyc-dance") === nycacFull.expectedLetDanceSignals &&
      countNycacCampaignSignal("save-nyc-spaces") === nycacFull.expectedSaveSpacesSignals &&
      countNycacCampaignSignal("talks-not-raids") === nycacFull.expectedTalksNotRaidsSignals &&
      nycacLinks.length === nycacFull.expectedShortUrlOccurrences &&
      nycacUniqueShortUrls.size === nycacFull.expectedUniqueShortUrls &&
      nycacResolvedShortUrls.size === nycacFull.expectedResolvedShortUrls &&
      nycacUnresolvedShortUrls.size === nycacFull.expectedUnresolvedShortUrls &&
      nycacResolvedDestinations.size === nycacFull.expectedResolvedDestinations &&
      nycacAuthoredReactionSnapshot.recordsWithVisibleReaction === nycacFull.expectedAuthoredStatusesWithReaction &&
      nycacAuthoredReactionSnapshot.replies === nycacFull.expectedAuthoredVisibleReplies &&
      nycacAuthoredReactionSnapshot.reposts === nycacFull.expectedAuthoredVisibleReposts &&
      nycacAuthoredReactionSnapshot.likes === nycacFull.expectedAuthoredVisibleLikes &&
      nycacLedger.aggregateFindings.postedLinks.shortUrlOccurrences === nycacLinks.length &&
      nycacLedger.aggregateFindings.postedLinks.uniqueShortUrls === nycacUniqueShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.resolvedShortUrls === nycacResolvedShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.unresolvedShortUrls === nycacUnresolvedShortUrls.size &&
      nycacLedger.aggregateFindings.postedLinks.uniqueResolvedDestinations === nycacResolvedDestinations.size &&
      nycacLedger.aggregateFindings.repostNetwork.statuses === nycacFull.expectedRepostSourceStatuses &&
      nycacLedger.aggregateFindings.repostNetwork.distinctSourceAccounts === nycacRepostSourceAccounts.size &&
      nycacLedger.aggregateFindings.repostNetwork.directMentionStatuses === nycacDirectMentionRecords.length &&
      nycacLedger.aggregateFindings.repostNetwork.directMentionAccounts === nycacDirectMentionAccounts.size &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.records === nycacAuthoredReactionSnapshot.records &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.recordsWithVisibleReaction === nycacAuthoredReactionSnapshot.recordsWithVisibleReaction &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.replies === nycacAuthoredReactionSnapshot.replies &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.reposts === nycacAuthoredReactionSnapshot.reposts &&
      nycacLedger.aggregateFindings.accountAuthoredVisibleReactionSnapshot.likes === nycacAuthoredReactionSnapshot.likes &&
      nycacPopulationAudit.profileCountObserved === nycacFull.expectedProfileCount &&
      nycacPopulationAudit.uniqueItemsRecovered === nycacFull.expectedUniqueItems &&
      nycacPopulationAudit.unresolvedPopulationSlots === nycacFull.expectedUnresolvedSlots &&
      nycacPopulationAudit.dispositionTotal === nycacFull.expectedProfileCount &&
      nycacCorpusFindings.uniqueShortUrls === nycacFull.expectedUniqueShortUrls &&
      nycacCorpusFindings.linkedSourcesCloselyRead === nycacFull.expectedLinkedArticleCount &&
      nycacSocialCorpus.sources.length === nycacFull.expectedSourceCount &&
      nycacLinkedArticleSources.length === nycacFull.expectedLinkedArticleCount &&
      nycacSocialCorpus.observations.length === nycacFull.expectedObservationCount &&
      nycacSocialCorpus.claims.length === nycacFull.expectedClaimCount &&
      nycacSocialCorpus.researchInquiries.length === nycacFull.expectedInquiryCount &&
      [...nycacFullSources, ...nycacLinkedArticleSources].every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      nycacAuditSource?.kind === "research-run" &&
      nycacAuditSource.canonicalUrl?.includes(nycacFull.ledgerPath) &&
      nycacAuditSource.doesNotEstablish.some((boundary) => /100 percent item-level recovery/i.test(boundary)) &&
      nycacHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      nycacFullClaims.every((claim) => claim?.antiClaims.length >= 3 && claim.boundaries.length >= 2) &&
      nycacFullInquiry?.resultStatus === "partially-recovered" &&
      nycacFullInquiry.findings.some((finding) => /4,098 explicit unresolved slots/i.test(finding)) &&
      nycacCarrierInquiry?.resultStatus === "not-recovered" &&
      nycacCarrierInquiry.limitations.some((limitation) => /Not recovered does not mean no archive exists/i.test(limitation)) &&
      nycacContinuityInquiry?.resultStatus === "partially-recovered" &&
      nycacSharedIdentityClaim?.evidence.some((evidence) => evidence.sourceId === nycacFull.auditSourceId) &&
      nycacDocumentation.includes("1,026 + 4,098 = 5,124") &&
      nycacDocumentation.includes("population disposition") &&
      nycacDocumentation.includes("carrier gap, not a claim of inactivity") &&
      nycacDocumentation.includes("Most of these are mission context, not coverage of NYC Artist Coalition") &&
      nycacDocumentation.includes("Nothing from this pass is added automatically") &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(nycacLedgerText) &&
      nycacFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const urbanFull = suite.pilot.urbanhermitFullPopulation;
  const urbanLedgerPath = path.join(repoRoot, urbanFull.ledgerPath);
  const urbanDocumentation = fixtures.urbanhermitDocumentation ?? (existsSync(path.join(repoRoot, urbanFull.documentationPath))
    ? readFileSync(path.join(repoRoot, urbanFull.documentationPath), "utf8")
    : "");
  const urbanSourcesDocumentation = fixtures.urbanhermitSourcesDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/sources.md"),
    "utf8"
  );
  const urbanKnowledgeBankDocumentation = fixtures.urbanhermitKnowledgeBankDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/README.md"),
    "utf8"
  );
  const urbanSocialArchiveDocumentation = fixtures.urbanhermitSocialArchiveDocumentation ?? readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/social-media-archive-production-2026-07-14.md"),
    "utf8"
  );
  const urbanCanonicalLedger = existsSync(urbanLedgerPath)
    ? JSON.parse(readFileSync(urbanLedgerPath, "utf8"))
    : null;
  const urbanLedger = fixtures.urbanhermitLedger ?? urbanCanonicalLedger;
  const urbanRecords = urbanLedger?.records ?? [];
  const urbanLinkedSourceEdges = urbanLedger?.linkedSourceEdges ?? [];
  const urbanRecordIds = new Set(urbanRecords.map((record) => record.statusId));
  const urbanWithheldDispositions = urbanLedger?.withheldPopulationDispositions ?? [];
  const urbanContextDisposition = urbanWithheldDispositions.find(
    (item) => item.disposition === "context-only"
  );
  const urbanProtectedDisposition = urbanWithheldDispositions.find(
    (item) => item.disposition === "protected-context"
  );
  const urbanPublicRecords = urbanRecords.filter((record) => record.disposition === "public-safe-evidence");
  const urbanAuthoredRecords = urbanRecords.filter((record) => record.relationship !== "native-repost-source-status");
  const urbanSourceRecords = urbanRecords.filter((record) => record.relationship === "native-repost-source-status");
  const urbanPublicRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanRecords, (record) => record.relationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const urbanProjectCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanPublicRecords.flatMap((record) => record.projectIds), (project) => project))
      .map(([project, values]) => [project, values.length])
  );
  const urbanThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanPublicRecords.flatMap((record) => record.themes), (theme) => theme))
      .map(([theme, values]) => [theme, values.length])
  );
  const urbanMentionedHandles = new Set(
    urbanPublicRecords.flatMap((record) => record.mentionedHandles ?? [])
      .map((handle) => handle.toLowerCase())
  );
  const urbanPostedUrls = urbanPublicRecords.flatMap((record) => record.postedUrls ?? []);
  const urbanUniquePostedUrls = new Set(urbanPostedUrls);
  const urbanAuthoredReactionSnapshot = urbanAuthoredRecords.reduce(
    (totals, record) => {
      const metrics = record.currentVisibleMetrics;
      totals.statuses += 1;
      totals.statusesWithVisibleReaction += Object.values(metrics).some((value) => value > 0) ? 1 : 0;
      totals.replies += metrics.replies;
      totals.reposts += metrics.reposts;
      totals.likes += metrics.likes;
      return totals;
    },
    { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 }
  );
  const urbanFullSources = urbanhermitSocialCorpus.sources.map((source) => sourceById.get(source.id));
  const urbanFullIntake = intakeById.get("INTAKE-URBANHERMIT-FULL-POPULATION-CORPUS-2026");
  const urbanLinkedSources = urbanFullIntake?.sourceIds.map((id) => sourceById.get(id)) ?? [];
  const urbanFullObservations = urbanhermitSocialCorpus.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const urbanFullClaims = urbanhermitSocialCorpus.claims.map((claim) => claimById.get(claim.id));
  const urbanHeldClaims = urbanFull.heldClaimIds.map((id) => claimById.get(id));
  const urbanFullInquiries = urbanhermitSocialCorpus.researchInquiries.map((inquiry) => inquiryById.get(inquiry.id));
  const urbanAuditSource = sourceById.get(urbanFull.auditSourceId);
  const urbanPopulationInquiry = inquiryById.get("INQ-URBANHERMIT-FULL-POPULATION-2026");
  const urbanOutsideInquiry = inquiryById.get("INQ-URBANHERMIT-OUTSIDE-ENGAGEMENT");
  const urbanPersonalInventory = socialMediaArchiveProduction.inventory.personalAccounts?.find(
    (account) => account.handle === "@urbanhermit"
  );
  const urbanLedgerText = urbanLedger ? JSON.stringify(urbanLedger) : "";
  const urbanhermitBearingLedgerSurface = (ledger) => {
    const { records = [], ...metadata } = ledger ?? {};
    const containsUrbanhermit = (value) => /urbanhermit/i.test(JSON.stringify(value));
    return {
      metadata: Object.fromEntries(
        Object.entries(metadata).filter(([, value]) => containsUrbanhermit(value))
      ),
      records: records.filter((record) => containsUrbanhermit(record))
    };
  };
  const urbanCrossLedgerContractHash = sha256(JSON.stringify({
    wowlist: urbanhermitBearingLedgerSurface(wowLedger),
    kcTownHall: urbanhermitBearingLedgerSurface(kcthLedger),
    nycArtistCoalition: urbanhermitBearingLedgerSurface(nycacLedger)
  }));
  const urbanLedgerContractHash = urbanLedger ? sha256(urbanLedgerText) : "";
  const urbanLedgerMetadataContract = urbanLedger ? structuredClone(urbanLedger) : null;
  if (urbanLedgerMetadataContract) urbanLedgerMetadataContract.records = [];
  const urbanLedgerMetadataContractHash = urbanLedgerMetadataContract
    ? sha256(JSON.stringify(urbanLedgerMetadataContract))
    : "";
  const urbanForbiddenRecordFields = [
    "recordKey",
    "contentDigestSha256",
    "normalizedTextCharacterCount",
    "publishedYear",
    "text",
    "rawText"
  ];
  const hasExactKeys = (value, allowed) =>
    value && Object.keys(value).length === allowed.size && Object.keys(value).every((key) => allowed.has(key));
  const equalUrbanCountMaps = (left, right) => {
    const keys = new Set([...Object.keys(left ?? {}), ...Object.keys(right ?? {})]);
    return [...keys].every((key) => left?.[key] === right?.[key]);
  };
  const urbanCanonicalRecordsById = new Map(
    (urbanCanonicalLedger?.records ?? []).map((record) => [record.statusId, record])
  );
  const urbanRecordMatchesCanonicalIdentity = (record) => {
    const canonical = urbanCanonicalRecordsById.get(record.statusId);
    if (!canonical) return false;

    return [
      "statusUrl", "publishedAt", "relationship", "authorHandle", "disposition",
      "contentSummary", "projectIds", "themes", "mentionedHandles", "hashtags",
      "postedUrls", "currentVisibleMetrics", "metricOwner"
    ].every((field) => JSON.stringify(record[field]) === JSON.stringify(canonical[field]));
  };
  const urbanStatusUrlMatchesAuthor = (record) => {
    try {
      const parsed = new URL(record.statusUrl);
      const parts = parsed.pathname.split("/").filter(Boolean);
      return parsed.protocol === "https:" &&
        parsed.hostname === "x.com" &&
        parts.length === 3 &&
        parts[0].toLowerCase() === record.authorHandle.slice(1).toLowerCase() &&
        parts[1] === "status" &&
        parts[2] === record.statusId;
    } catch {
      return false;
    }
  };
  const urbanPublishedAtMatchesSnowflake = (record) => {
    const id = BigInt(record.statusId);
    if (id < 100000000000000000n) return true;
    const snowflakeTime = Number((id >> 22n) + 1288834974657n);
    return Math.abs(Date.parse(record.publishedAt) - snowflakeTime) < 1000;
  };
  const urbanSemanticFieldsMatch = (actual, expected, fields) =>
    Boolean(actual && expected && fields.every(
      (field) => JSON.stringify(actual[field]) === JSON.stringify(expected[field])
    ));
  const urbanStringArray = (value) =>
    Array.isArray(value) && value.every((item) => typeof item === "string");
  const urbanAllowedTopLevelFields = new Set([
    "schemaVersion", "reviewedAt", "sourceProfile", "populationDefinition", "populationAudit",
    "method", "contentBoundary", "metricBoundary", "aggregateFindings", "unresolvedItems", "records",
    "withheldPopulationDispositions", "linkedSourceEdges"
  ]);
  const urbanAllowedPopulationAuditFields = new Set([
    "profileCountObserved", "profileAndBoundedSearchItemsRecovered", "unresolvedPopulationSlots",
    "dispositionTotal", "completenessStatement", "publicEvidenceItemRecordsPublished",
    "contextItemsWithheldFromPublicLedger", "protectedItemsWithheldFromPublicLedger"
  ]);
  const urbanAllowedMethodFields = new Set([
    "authenticatedReadOnlyReview", "surfaces", "freshVerification", "exclusions"
  ]);
  const urbanAllowedFreshVerificationFields = new Set([
    "verifiedAt", "profileCountReconfirmed", "uniqueItemRecords", "broadDateWindowsSearched",
    "annualWindowsSearched", "profileTraversalReachedOldestRecoveredStatus", "repliesSurfaceCarrierErrorObserved"
  ]);
  const urbanAllowedContentBoundaryFields = new Set([
    "rawTextCommitted", "nonEvidenceItemRecordsCommitted", "publicSafeEvidenceLinksCommitted",
    "publicRecordCrosswalkCommitted", "rationale"
  ]);
  const urbanAllowedMetricBoundaryFields = new Set([
    "accountAuthoredMetrics", "repostSourceMetrics", "doesNotEstablish"
  ]);
  const urbanAllowedAggregateFields = new Set([
    "dispositionCounts", "projectSignalCounts", "themeSignalCounts", "publicSafeEvidenceRecords",
    "contextOnlyRecords", "protectedContextRecords", "distinctPublicHandlesInEvidenceRecords",
    "postedPublicUrlOccurrencesInEvidenceRecords", "uniquePostedPublicUrlsInEvidenceRecords",
    "selectedMissionSourceStatusIds", "publicLedgerRelationshipCounts",
    "publicSafeAccountAuthoredVisibleReactionSnapshot", "sourceStatusMetricsExcluded"
  ]);
  const urbanAllowedRecordFields = new Set([
    "statusId", "statusUrl", "publishedAt", "relationship", "authorHandle", "disposition",
    "contentSummary", "projectIds", "themes", "mentionedHandles", "hashtags", "postedUrls",
    "currentVisibleMetrics", "metricOwner"
  ]);
  const urbanAllowedSourceStatusMetricFields = new Set([
    "publicEvidenceSourceStatuses", "metricsCommitted"
  ]);
  const urbanAllowedDispositionCountFields = new Set([
    "context-only", "protected-context", "public-safe-evidence"
  ]);
  const urbanAllowedProjectSignalFields = new Set([
    "callnyc", "harry-j-epstein", "kc-town-hall", "nyc-artist-coalition",
    "public-media-making", "sunday-dinner", "waterways-and-participatory-art", "wowlist"
  ]);
  const urbanAllowedThemeSignalFields = new Set([
    "civic-participation-and-public-service", "collective-campaign-circulation",
    "community-cultural-infrastructure", "participatory-waterways-practice",
    "public-media-making", "technical-making-and-media-archaeology"
  ]);
  const urbanAllowedRelationshipCountFields = new Set([
    "account-post", "account-reply", "native-repost-source-status"
  ]);
  const urbanAllowedReactionFields = new Set([
    "statuses", "statusesWithVisibleReaction", "replies", "reposts", "likes"
  ]);
  const urbanAllowedCurrentMetricFields = new Set(["replies", "reposts", "likes"]);
  const urbanAllowedLinkedSourceFields = new Set([
    "statusId", "shortUrl", "destinationSourceId", "resolutionStatus"
  ]);
  const urbanAllowedWithheldFields = new Set(["disposition", "count", "publicDetail"]);
  const urbanAllowedUnresolvedFields = new Set(["slot", "disposition", "reason"]);
  const urbanNonRecordMetadata = urbanLedger ? structuredClone(urbanLedger) : null;
  if (urbanNonRecordMetadata) {
    urbanNonRecordMetadata.records = [];
    urbanNonRecordMetadata.aggregateFindings.selectedMissionSourceStatusIds = [];
    urbanNonRecordMetadata.linkedSourceEdges = [];
  }
  const urbanNonRecordMetadataText = urbanNonRecordMetadata
    ? JSON.stringify(urbanNonRecordMetadata)
    : "";
  const urbanExpectedObservationSources = new Map([
    ["OBS-URBANHERMIT-POPULATION-DISPOSITION", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-PRACTICE-CONTINUITY", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-WATER-PRACTICE", "SRC-X-URBANHERMIT-RIVER-OFFICE-HOURS-2009"],
    ["OBS-URBANHERMIT-KCUR-WATER-QUOTE", "SRC-X-KCUR-CENTRAL-STANDARD-JAMIE-WATER-2015"],
    ["OBS-URBANHERMIT-UCP-VIDEO-SELF-REPORT", "SRC-X-URBANHERMIT-UCP-CURFEW-VIDEO-2012"],
    ["OBS-URBANHERMIT-UCP-VIMEO-AVAILABILITY", "SRC-VIMEO-URBANHERMIT-UCP-CURFEW-VIDEO-2012"],
    ["OBS-URBANHERMIT-HORSE-LORDS-SELF-REPORT", "SRC-X-URBANHERMIT-HORSE-LORDS-2016"],
    ["OBS-URBANHERMIT-HORSE-LORDS-OUTSIDE-CREDIT", "SRC-X-THRILL-JOCKEY-HORSE-LORDS-2016"],
    ["OBS-URBANHERMIT-HORSE-LORDS-NPR-PUBLICATION", "SRC-NPR-HORSE-LORDS-TRUTHERS-2016"],
    ["OBS-URBANHERMIT-CIVIC-CAMPAIGN-CIRCULATION", urbanFull.auditSourceId],
    ["OBS-URBANHERMIT-LETNYCDANCE-CIRCULATION", "SRC-X-URBANHERMIT-LETNYCDANCE-REPEAL-2017"],
    ["OBS-URBANHERMIT-TALKSNOTRAIDS-CIRCULATION", "SRC-X-URBANHERMIT-TALKSNOTRAIDS-2019"],
    ["OBS-URBANHERMIT-HJE-WEBSITE-SELF-REPORT", "SRC-X-URBANHERMIT-HJE-WEBSITE-2010"],
    ["OBS-URBANHERMIT-TECHNICAL-PRACTICE", "SRC-X-URBANHERMIT-MEDIA-ARCHAEOLOGY-2020"],
    ["OBS-URBANHERMIT-OUTSIDE-RECOGNITION", "SRC-X-LETSGLITCHIT-JAMIE-CONNECTIONS-2023"],
    ["OBS-URBANHERMIT-GOOD-TIMES-ROUTING", "SRC-X-URBANHERMIT-GOOD-TIMES-ZINES-2-2015"],
    ["OBS-URBANHERMIT-GOOD-TIMES-ISSUE-CONTEXT", "SRC-GOOD-TIMES-ZINES-2-2015"],
    ["OBS-URBANHERMIT-MARKET-HOTEL-CONTEXT", "SRC-OBSERVER-MARKET-HOTEL-2016"],
    ["OBS-URBANHERMIT-VISIBLE-REACTION-SNAPSHOT", urbanFull.auditSourceId]
  ]);
  const urbanSemanticContractsHold = Boolean(
    urbanFullSources.every((source, index) => urbanSemanticFieldsMatch(
      source,
      urbanhermitSocialCorpus.sources[index],
      ["title", "organization", "author", "kind", "visibility", "preservationStatus",
        "publishedAt", "canonicalUrl", "publicCitation", "publicNote",
        "supportsGenerally", "doesNotEstablish"]
    )) &&
      urbanFullObservations.every((observation, index) => urbanSemanticFieldsMatch(
        observation,
        urbanhermitSocialCorpus.observations[index],
        ["sourceId", "project", "kind", "text", "locator", "status", "publicSafe",
          "claimIds", "researchInquiryIds", "limitations"]
      )) &&
      urbanFullClaims.every((claim, index) => urbanSemanticFieldsMatch(
        claim,
        urbanhermitSocialCorpus.claims[index],
        ["project", "internalClaim", "status", "projections", "evidence", "boundaries",
          "antiClaims", "researchInquiryIds"]
      )) &&
      urbanFullInquiries.every((inquiry, index) => urbanSemanticFieldsMatch(
        inquiry,
        urbanhermitSocialCorpus.researchInquiries[index],
        ["project", "question", "methods", "resultStatus", "findings", "limitations",
          "sourceIds", "publicSummary"]
      ))
  );
  const urbanObservationsAtomic = Boolean(
    urbanFullObservations.length === urbanExpectedObservationSources.size &&
      urbanFullObservations.every((observation) =>
        observation &&
          urbanExpectedObservationSources.get(observation.id) === observation.sourceId &&
          observation.locator &&
          observation.limitations.length &&
          (observation.claimIds.length || observation.researchInquiryIds.length) &&
          !/\b(?:proves?|solely|single-handedly|caused|impact)\b/i.test(observation.text)
      )
  );
  const urbanObservationContractsHold = Object.entries(urbanFull.observationContracts).every(
    ([observationId, contract]) => {
      const observation = observationById.get(observationId);
      return observation?.sourceId === contract.sourceId &&
        contract.requiredPhrases.every((phrase) => observation.text.includes(phrase));
    }
  );
  const urbanSourceContractsHold = Object.entries(urbanFull.sourceContracts).every(
    ([sourceId, [requiredSupport, requiredBoundary]]) => {
      const source = sourceById.get(sourceId);
      return source?.supportsGenerally.includes(requiredSupport) &&
        source.doesNotEstablish.includes(requiredBoundary);
    }
  );
  const urbanClaimContractsHold = Object.entries(urbanFull.claimContracts).every(
    ([claimId, [requiredClaimPhrase, requiredBoundaryPhrase]]) => {
      const claim = claimById.get(claimId);
      return claim?.internalClaim.includes(requiredClaimPhrase) &&
        claim.boundaries.some((boundary) => boundary.includes(requiredBoundaryPhrase));
    }
  );
  const urbanPositiveSemanticText = JSON.stringify({
    sourceSupports: urbanFullSources.map((source) => source?.supportsGenerally),
    observations: urbanFullObservations.map((observation) => observation?.text),
    claims: urbanFullClaims.map((claim) => ({
      internalClaim: claim?.internalClaim,
      projections: claim?.projections.map((projection) => projection.text)
    })),
    inquiries: urbanFullInquiries.map((inquiry) => ({
      findings: inquiry?.findings,
      publicSummary: inquiry?.publicSummary
    }))
  });
  const urbanPositiveSemanticsBounded =
    !/(?:single-handedly|solely led|caused (?:the )?(?:policy|outcome)|proves? (?:all|every)|every coalition campaign|definitively delivered|all of Jamie's professional impact)/i.test(
      urbanPositiveSemanticText
    );
  const urbanKnowledgeGraphContractHash = sha256(JSON.stringify({
    corpus: urbanhermitSocialCorpus,
    canonical: {
      intake: urbanFullIntake,
      sources: urbanLinkedSources,
      observations: urbanFullObservations,
      claims: urbanFullClaims,
      inquiries: urbanFullInquiries
    }
  }));
  const urbanPublicSurfaceContractHash = sha256(JSON.stringify({
    populationAudit: urbanhermitPopulationAudit,
    corpusFindings: urbanhermitCorpusFindings,
    personalInventory: urbanPersonalInventory,
    documentation: urbanDocumentation,
    sourcesDocumentation: urbanSourcesDocumentation,
    knowledgeBankDocumentation: urbanKnowledgeBankDocumentation,
    socialArchiveDocumentation: urbanSocialArchiveDocumentation
  }));
  const urbanSemanticContractHash = sha256(JSON.stringify({
    sources: urbanFullSources.map((source) => source && ({
      id: source.id,
      title: source.title,
      organization: source.organization,
      author: source.author,
      kind: source.kind,
      visibility: source.visibility,
      preservationStatus: source.preservationStatus,
      publishedAt: source.publishedAt,
      canonicalUrl: source.canonicalUrl,
      publicCitation: source.publicCitation,
      publicNote: source.publicNote,
      supportsGenerally: source.supportsGenerally,
      doesNotEstablish: source.doesNotEstablish
    })),
    observations: urbanFullObservations.map((observation) => observation && ({
      id: observation.id,
      sourceId: observation.sourceId,
      project: observation.project,
      kind: observation.kind,
      text: observation.text,
      locator: observation.locator,
      status: observation.status,
      publicSafe: observation.publicSafe,
      claimIds: observation.claimIds,
      researchInquiryIds: observation.researchInquiryIds,
      limitations: observation.limitations
    })),
    claims: urbanFullClaims.map((claim) => claim && ({
      id: claim.id,
      project: claim.project,
      internalClaim: claim.internalClaim,
      status: claim.status,
      projections: claim.projections,
      evidence: claim.evidence,
      boundaries: claim.boundaries,
      antiClaims: claim.antiClaims,
      researchInquiryIds: claim.researchInquiryIds
    })),
    inquiries: urbanFullInquiries.map((inquiry) => inquiry && ({
      id: inquiry.id,
      project: inquiry.project,
      question: inquiry.question,
      methods: inquiry.methods,
      resultStatus: inquiry.resultStatus,
      findings: inquiry.findings,
      limitations: inquiry.limitations,
      sourceIds: inquiry.sourceIds,
      publicSummary: inquiry.publicSummary
    }))
  }));
  const urbanMethodContractHolds = Boolean(
    urbanStringArray(urbanLedger?.method?.surfaces) &&
      JSON.stringify(urbanLedger.method.surfaces) === JSON.stringify(urbanFull.methodContract.surfaces) &&
      urbanStringArray(urbanLedger.method.exclusions) &&
      JSON.stringify(urbanLedger.method.exclusions) === JSON.stringify(urbanFull.methodContract.exclusions) &&
      urbanStringArray(urbanLedger.method.freshVerification.broadDateWindowsSearched) &&
      JSON.stringify(urbanLedger.method.freshVerification.broadDateWindowsSearched) ===
        JSON.stringify(urbanFull.methodContract.broadDateWindowsSearched) &&
      urbanLedger.method.freshVerification.annualWindowsSearched ===
        urbanFull.methodContract.annualWindowsSearched &&
      urbanLedger.method.freshVerification.verifiedAt === urbanLedger.reviewedAt &&
      urbanLedger.method.freshVerification.profileCountReconfirmed === urbanFull.expectedProfileCount &&
      urbanLedger.method.freshVerification.uniqueItemRecords === urbanFull.expectedUniqueItems &&
      urbanLedger.method.freshVerification.profileTraversalReachedOldestRecoveredStatus === true &&
      urbanLedger.method.freshVerification.repliesSurfaceCarrierErrorObserved === true
  );
  const urbanLinkedSourceContractsHold = Boolean(
    urbanLinkedSourceEdges.length === urbanFull.expectedLinkedSourceEdgeCount &&
      urbanLinkedSourceEdges.every((edge) =>
        hasExactKeys(edge, urbanAllowedLinkedSourceFields) &&
          edge.resolutionStatus === "verified-redirect" &&
          urbanRecordIds.has(edge.statusId) &&
          urbanRecords.find((record) => record.statusId === edge.statusId)?.postedUrls.includes(edge.shortUrl) &&
          urbanFullIntake?.sourceIds.includes(edge.destinationSourceId) &&
          sourceById.get(edge.destinationSourceId)?.visibility === "public"
      ) &&
      new Set(urbanLinkedSourceEdges.map((edge) => `${edge.statusId}|${edge.shortUrl}|${edge.destinationSourceId}`)).size ===
        urbanFull.expectedLinkedSourceEdgeCount &&
      JSON.stringify(urbanLinkedSourceEdges.map((edge) => [
        edge.statusId, edge.shortUrl, edge.destinationSourceId
      ])) === JSON.stringify(urbanFull.linkedSourceContracts)
  );
  const urbanIntakeSourceGraphComplete = Boolean(
    urbanFullIntake?.sourceIds.length === urbanFull.expectedLinkedSourceCount &&
      new Set(urbanFullIntake.sourceIds).size === urbanFull.expectedLinkedSourceCount &&
      urbanLinkedSources.every(Boolean) &&
      urbanFullIntake.sourceIds.every((sourceId) =>
        urbanFullObservations.some((observation) =>
          observation?.intakeId === urbanFullIntake.id && observation.sourceId === sourceId
        )
      )
  );
  const urbanFullPopulationComplete = Boolean(
    urbanLedger &&
      hasExactKeys(urbanLedger, urbanAllowedTopLevelFields) &&
      hasExactKeys(urbanLedger.populationAudit, urbanAllowedPopulationAuditFields) &&
      hasExactKeys(urbanLedger.method, urbanAllowedMethodFields) &&
      hasExactKeys(urbanLedger.method.freshVerification, urbanAllowedFreshVerificationFields) &&
      hasExactKeys(urbanLedger.contentBoundary, urbanAllowedContentBoundaryFields) &&
      hasExactKeys(urbanLedger.metricBoundary, urbanAllowedMetricBoundaryFields) &&
      hasExactKeys(urbanLedger.aggregateFindings, urbanAllowedAggregateFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.dispositionCounts, urbanAllowedDispositionCountFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.projectSignalCounts, urbanAllowedProjectSignalFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.themeSignalCounts, urbanAllowedThemeSignalFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.publicLedgerRelationshipCounts, urbanAllowedRelationshipCountFields) &&
      hasExactKeys(urbanLedger.aggregateFindings.publicSafeAccountAuthoredVisibleReactionSnapshot, urbanAllowedReactionFields) &&
      hasExactKeys(
        urbanLedger.aggregateFindings.sourceStatusMetricsExcluded,
        urbanAllowedSourceStatusMetricFields
      ) &&
      urbanLedger.sourceProfile === "https://x.com/urbanhermit" &&
      urbanLedger.reviewedAt === "2026-07-14" &&
      urbanLedgerContractHash === urbanFull.expectedLedgerSha256 &&
      urbanLedgerMetadataContractHash === urbanFull.expectedLedgerMetadataSha256 &&
      urbanKnowledgeGraphContractHash === urbanFull.expectedKnowledgeGraphSha256 &&
      urbanPublicSurfaceContractHash === urbanFull.expectedPublicSurfaceSha256 &&
      urbanCrossLedgerContractHash === urbanFull.expectedCrossLedgerSha256 &&
      urbanSemanticContractHash === urbanFull.expectedSemanticContractSha256 &&
      urbanLedger.populationAudit.profileCountObserved === urbanFull.expectedProfileCount &&
      urbanLedger.populationAudit.profileAndBoundedSearchItemsRecovered === urbanFull.expectedUniqueItems &&
      urbanLedger.populationAudit.unresolvedPopulationSlots === urbanFull.expectedUnresolvedSlots &&
      urbanLedger.populationAudit.dispositionTotal === urbanFull.expectedProfileCount &&
      urbanLedger.populationAudit.publicEvidenceItemRecordsPublished === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanLedger.populationAudit.contextItemsWithheldFromPublicLedger === urbanFull.expectedContextOnlyRecords &&
      urbanLedger.populationAudit.protectedItemsWithheldFromPublicLedger === urbanFull.expectedProtectedContextRecords &&
      urbanLedger.unresolvedItems.length === urbanFull.expectedUnresolvedSlots &&
      urbanLedger.unresolvedItems.every((item, index) =>
        hasExactKeys(item, urbanAllowedUnresolvedFields) &&
          item.slot === index + 1 &&
          item.disposition === "carrier-limited-not-recovered" &&
          item.reason === "The live profile count exceeded the deduplicated public statuses exposed by profile traversal and bounded searches."
      ) &&
      /population reconciliation, not a platform export/i.test(urbanLedger.populationAudit.completenessStatement) &&
      urbanLedger.method.authenticatedReadOnlyReview === true &&
      urbanMethodContractHolds &&
      urbanLedger.contentBoundary.rawTextCommitted === false &&
      urbanLedger.contentBoundary.nonEvidenceItemRecordsCommitted === false &&
      urbanLedger.contentBoundary.publicSafeEvidenceLinksCommitted === true &&
      urbanLedger.contentBoundary.publicRecordCrosswalkCommitted === false &&
      typeof urbanLedger.contentBoundary.rationale === "string" &&
      !/https?:\/\//i.test(urbanLedger.contentBoundary.rationale) &&
      typeof urbanLedger.metricBoundary.accountAuthoredMetrics === "string" &&
      typeof urbanLedger.metricBoundary.repostSourceMetrics === "string" &&
      urbanStringArray(urbanLedger.metricBoundary.doesNotEstablish) &&
      urbanRecords.length + urbanContextDisposition?.count + urbanProtectedDisposition?.count +
        urbanLedger.unresolvedItems.length === urbanFull.expectedProfileCount &&
      urbanRecords.length + urbanContextDisposition?.count + urbanProtectedDisposition?.count ===
        urbanFull.expectedUniqueItems &&
      urbanRecords.length === urbanFull.expectedPublicSafeEvidenceRecords &&
      new Set(urbanRecords.map((record) => record.statusId)).size === urbanRecords.length &&
      urbanRecords.every((record) =>
        record.disposition === "public-safe-evidence" &&
          hasExactKeys(record, urbanAllowedRecordFields) &&
          urbanForbiddenRecordFields.every((field) => !Object.hasOwn(record, field)) &&
          /^\d+$/.test(record.statusId) &&
          urbanStatusUrlMatchesAuthor(record) &&
          urbanPublishedAtMatchesSnowflake(record) &&
          urbanRecordMatchesCanonicalIdentity(record) &&
          /^@/.test(record.authorHandle) &&
          Array.isArray(record.mentionedHandles) &&
          Array.isArray(record.hashtags) &&
          Array.isArray(record.postedUrls) &&
          urbanStringArray(record.projectIds) &&
          urbanStringArray(record.themes) &&
          urbanStringArray(record.mentionedHandles) &&
          urbanStringArray(record.hashtags) &&
          urbanStringArray(record.postedUrls) &&
          record.postedUrls.every((url) => /^https?:\/\//.test(url)) &&
          (record.relationship === "native-repost-source-status"
            ? record.metricOwner === "source-status-excluded" &&
              record.currentVisibleMetrics === null &&
              record.authorHandle.toLowerCase() !== "@urbanhermit"
            : ["account-post", "account-reply"].includes(record.relationship) &&
              record.authorHandle.toLowerCase() === "@urbanhermit" &&
              record.metricOwner === "account-authored-status" &&
              hasExactKeys(record.currentVisibleMetrics, urbanAllowedCurrentMetricFields) &&
              Number.isInteger(record.currentVisibleMetrics?.replies) &&
              Number.isInteger(record.currentVisibleMetrics?.reposts) &&
              Number.isInteger(record.currentVisibleMetrics?.likes) &&
              Object.values(record.currentVisibleMetrics).every((value) => value >= 0))
      ) &&
      urbanWithheldDispositions.length === 2 &&
      urbanWithheldDispositions.every((item) =>
        hasExactKeys(item, urbanAllowedWithheldFields) &&
          Number.isInteger(item.count) &&
          item.count > 0 &&
          item.publicDetail === "Aggregate count only; no public item identifier, year, date, author, relationship, metric, length, digest, link, name, or text fingerprint is retained."
      ) &&
      urbanContextDisposition?.count === urbanFull.expectedContextOnlyRecords &&
      urbanProtectedDisposition?.count === urbanFull.expectedProtectedContextRecords &&
      urbanAuthoredRecords.length === urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanSourceRecords.length === urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanPublicRelationshipCounts["account-post"] + urbanPublicRelationshipCounts["account-reply"] ===
        urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanPublicRelationshipCounts["native-repost-source-status"] ===
        urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanPublicRecords.length === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanMentionedHandles.size === urbanFull.expectedDistinctPublicHandles &&
      urbanPostedUrls.length === urbanFull.expectedPostedUrlOccurrences &&
      urbanUniquePostedUrls.size === urbanFull.expectedUniquePostedUrls &&
      urbanProjectCounts["waterways-and-participatory-art"] === urbanFull.expectedWaterPracticeSignals &&
      urbanProjectCounts["sunday-dinner"] === urbanFull.expectedSundayDinnerSignals &&
      urbanProjectCounts.wowlist === urbanFull.expectedWowlistSignals &&
      urbanProjectCounts["nyc-artist-coalition"] === urbanFull.expectedNycArtistCoalitionSignals &&
      urbanAuthoredReactionSnapshot.statuses === urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanAuthoredReactionSnapshot.statusesWithVisibleReaction === urbanFull.expectedAuthoredStatusesWithReaction &&
      urbanAuthoredReactionSnapshot.replies === urbanFull.expectedAuthoredVisibleReplies &&
      urbanAuthoredReactionSnapshot.reposts === urbanFull.expectedAuthoredVisibleReposts &&
      urbanAuthoredReactionSnapshot.likes === urbanFull.expectedAuthoredVisibleLikes &&
      urbanLedger.aggregateFindings.dispositionCounts["public-safe-evidence"] === urbanPublicRecords.length &&
      urbanLedger.aggregateFindings.dispositionCounts["context-only"] === urbanContextDisposition.count &&
      urbanLedger.aggregateFindings.dispositionCounts["protected-context"] === urbanProtectedDisposition.count &&
      urbanLedger.aggregateFindings.distinctPublicHandlesInEvidenceRecords === urbanMentionedHandles.size &&
      urbanLedger.aggregateFindings.postedPublicUrlOccurrencesInEvidenceRecords === urbanPostedUrls.length &&
      urbanLedger.aggregateFindings.uniquePostedPublicUrlsInEvidenceRecords === urbanUniquePostedUrls.size &&
      JSON.stringify(urbanLedger.aggregateFindings.selectedMissionSourceStatusIds) ===
        JSON.stringify(urbanCanonicalLedger.aggregateFindings.selectedMissionSourceStatusIds) &&
      urbanLedger.aggregateFindings.selectedMissionSourceStatusIds.every((id) => urbanRecordIds.has(id)) &&
      equalUrbanCountMaps(urbanLedger.aggregateFindings.projectSignalCounts, urbanProjectCounts) &&
      equalUrbanCountMaps(urbanLedger.aggregateFindings.themeSignalCounts, urbanThemeCounts) &&
      equalUrbanCountMaps(
        urbanLedger.aggregateFindings.publicLedgerRelationshipCounts,
        urbanPublicRelationshipCounts
      ) &&
      equalUrbanCountMaps(
        urbanLedger.aggregateFindings.publicSafeAccountAuthoredVisibleReactionSnapshot,
        urbanAuthoredReactionSnapshot
      ) &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.publicEvidenceSourceStatuses ===
        urbanFull.expectedPublicSourceStatusMetricsExcluded &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.publicEvidenceSourceStatuses ===
        urbanSourceRecords.length &&
      urbanLedger.aggregateFindings.sourceStatusMetricsExcluded.metricsCommitted === false &&
      urbanhermitPopulationAudit.profileCountObserved === urbanFull.expectedProfileCount &&
      urbanhermitPopulationAudit.uniqueItemsRecovered === urbanFull.expectedUniqueItems &&
      urbanhermitPopulationAudit.unresolvedPopulationSlots === urbanFull.expectedUnresolvedSlots &&
      urbanhermitCorpusFindings.publicSafeEvidenceRecords === urbanFull.expectedPublicSafeEvidenceRecords &&
      urbanhermitCorpusFindings.publicSafeAccountAuthoredEvidenceRecords ===
        urbanFull.expectedPublicAccountAuthoredEvidenceRecords &&
      urbanhermitCorpusFindings.publicSafeSourceStatusEvidenceRecords ===
        urbanFull.expectedPublicSourceStatusEvidenceRecords &&
      urbanhermitCorpusFindings.contextOnlyRecords === urbanFull.expectedContextOnlyRecords &&
      urbanhermitCorpusFindings.protectedContextRecords === urbanFull.expectedProtectedContextRecords &&
      urbanhermitCorpusFindings.accountAuthoredStatusesWithVisibleReaction ===
        urbanFull.expectedAuthoredStatusesWithReaction &&
      urbanhermitCorpusFindings.accountAuthoredVisibleReplies === urbanFull.expectedAuthoredVisibleReplies &&
      urbanhermitCorpusFindings.accountAuthoredVisibleReposts === urbanFull.expectedAuthoredVisibleReposts &&
      urbanhermitCorpusFindings.accountAuthoredVisibleLikes === urbanFull.expectedAuthoredVisibleLikes &&
      urbanhermitCorpusFindings.publicEvidenceSourceStatusMetricsExcluded ===
        urbanFull.expectedPublicSourceStatusMetricsExcluded &&
      urbanhermitSocialCorpus.sources.length === urbanFull.expectedNewSourceCount &&
      urbanhermitSocialCorpus.observations.length === urbanFull.expectedObservationCount &&
      urbanhermitSocialCorpus.claims.length === urbanFull.expectedClaimCount &&
      urbanhermitSocialCorpus.researchInquiries.length === urbanFull.expectedInquiryCount &&
      urbanObservationsAtomic &&
      urbanObservationContractsHold &&
      urbanSourceContractsHold &&
      urbanClaimContractsHold &&
      urbanPositiveSemanticsBounded &&
      urbanLinkedSourceContractsHold &&
      urbanIntakeSourceGraphComplete &&
      urbanSemanticContractsHold &&
      urbanFullSources.every((source) =>
        source?.visibility === "public" && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      urbanAuditSource?.kind === "research-run" &&
      urbanAuditSource.canonicalUrl?.includes(urbanFull.ledgerPath) &&
      urbanAuditSource.doesNotEstablish.some((boundary) => /platform export/i.test(boundary)) &&
      urbanAuditSource.doesNotEstablish.some((boundary) => /personal-account material/i.test(boundary)) &&
      urbanHeldClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      urbanFullClaims.every((claim) => claim?.antiClaims.length >= 3 && claim.boundaries.length >= 1) &&
      urbanPopulationInquiry?.resultStatus === "partially-recovered" &&
      urbanPopulationInquiry.findings.some((finding) => /Nine slots remain carrier-limited and unresolved/i.test(finding)) &&
      urbanOutsideInquiry?.resultStatus === "partially-recovered" &&
      urbanOutsideInquiry.limitations.some((limitation) => /recoverable floor/i.test(limitation)) &&
      urbanPersonalInventory?.profilePosts === urbanFull.expectedProfileCount &&
      urbanPersonalInventory.recoveredStatuses === urbanFull.expectedUniqueItems &&
      /Personal-account evidence is governed separately/i.test(urbanPersonalInventory.boundary) &&
      urbanDocumentation.includes("425 + 9 = 434") &&
      urbanDocumentation.includes("personal account is not a project account") &&
      urbanDocumentation.includes("Nothing from this pass is added automatically") &&
      urbanDocumentation.includes("source-status metrics") &&
      urbanDocumentation.includes("aggregate-only") &&
      urbanDocumentation.includes("no public item-level crosswalk") &&
      !/(?:recordKey|contentDigestSha256|normalizedTextCharacterCount|publishedYear)/.test(urbanLedgerText) &&
      !/\b\d{15,}\b/.test(urbanNonRecordMetadataText) &&
      !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(urbanNonRecordMetadataText) &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(urbanLedgerText) &&
      !/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(urbanLedgerText) &&
      urbanFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const nycacEvents = suite.pilot.nycacFacebookEvents;
  const nycacEventLedgerPath = path.join(repoRoot, nycacEvents.eventLedgerPath);
  const nycacEventLinkLedgerPath = path.join(repoRoot, nycacEvents.linkLedgerPath);
  const nycacEventLedger = fixtures.nycacFacebookEventLedger ?? (existsSync(nycacEventLedgerPath)
    ? JSON.parse(readFileSync(nycacEventLedgerPath, "utf8"))
    : null);
  const nycacEventLinkLedger = fixtures.nycacFacebookEventLinkLedger ?? (existsSync(nycacEventLinkLedgerPath)
    ? JSON.parse(readFileSync(nycacEventLinkLedgerPath, "utf8"))
    : null);
  const nycacEventDocumentationOnDisk = existsSync(path.join(repoRoot, nycacEvents.documentationPath))
    ? readFileSync(path.join(repoRoot, nycacEvents.documentationPath), "utf8")
    : "";
  const nycacEventReportOnDisk = existsSync(path.join(repoRoot, nycacEvents.projectReportPath))
    ? readFileSync(path.join(repoRoot, nycacEvents.projectReportPath), "utf8")
    : "";
  const nycacClaimsDocumentationOnDisk = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/claims.md"),
    "utf8"
  );
  const nycacProjectOverviewOnDisk = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/nyc-artist-coalition-2017.md"),
    "utf8"
  );
  const nycacEventDocumentation = fixtures.nycacFacebookEventDocumentation ?? nycacEventDocumentationOnDisk;
  const nycacEventReport = fixtures.nycacFacebookEventReport ?? nycacEventReportOnDisk;
  const nycacProjectOverview = fixtures.nycacProjectOverview ?? nycacProjectOverviewOnDisk;
  const nycacClaimsNarrative = fixtures.nycacClaimsDocumentation !== undefined
    ? fixtures.nycacClaimsDocumentation
    : (nycacClaimsDocumentationOnDisk.match(
      /## nyc-artist-coalition-civic-systems\b[\s\S]*?(?=\n## |\s*$)/
    )?.[0] ?? "").replace(/^\*\*Do not say:\*\*.*$/gmi, "");
  const nycacEventRows = nycacEventLedger?.records ?? [];
  const nycacRecoveredEventRows = nycacEventRows.filter((record) => record.eventId);
  const nycacUnresolvedEventRows = nycacEventRows.filter(
    (record) => record.recoveryStatus === "unresolved-control-slot"
  );
  const nycacEventYearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacRecoveredEventRows, (record) => record.date?.slice(0, 4)))
      .map(([year, records]) => [year, records.length])
  );
  const nycacEventRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacRecoveredEventRows, (record) => record.pageRelationship))
      .map(([relationship, records]) => [relationship, records.length])
  );
  const nycacRecurringRows = nycacRecoveredEventRows.filter((record) => record.isRecurringMeeting);
  const nycacVirtualMeetingRows = nycacRecurringRows.filter((record) => record.venueOrMode === "Virtual");
  const nycacPhysicalMeetingVenues = new Set(
    nycacRecurringRows
      .filter((record) => record.venueOrMode && record.venueOrMode !== "Virtual")
      .map((record) => record.venueOrMode)
  );
  const nycacResponseValues = nycacRecoveredEventRows
    .map((record) => record.responseValue)
    .filter((value) => Number.isFinite(value));
  const nycacDerivedResponseAccounting = {
    displayed: nycacResponseValues.length,
    missing: nycacRecoveredEventRows.length - nycacResponseValues.length,
    minimum: nycacResponseValues.length ? Math.min(...nycacResponseValues) : null,
    maximum: nycacResponseValues.length ? Math.max(...nycacResponseValues) : null,
    atLeast100: nycacResponseValues.filter((value) => value >= 100).length,
    atLeast400: nycacResponseValues.filter((value) => value >= 400).length,
    atLeast1000: nycacResponseValues.filter((value) => value >= 1000).length
  };
  const nycacLinkRows = nycacEventLinkLedger?.rows ?? [];
  const nycacLinkedEventIds = new Set(nycacLinkRows.flatMap((row) => row.eventIds ?? []));
  const nycacLinkOccurrences = nycacLinkRows.reduce((total, row) => total + (row.occurrences ?? 0), 0);
  const nycacArticleRows = nycacLinkRows.filter((row) => row.category === "published-article");
  const nycacProtectedLinkRows = nycacLinkRows.filter((row) => row.disposition === "protected");
  const nycacUnresolvedLinkRows = nycacLinkRows.filter((row) => row.disposition === "research-needed");
  const nycacDerivedLinkAccounting = {
    linkOccurrences: nycacLinkOccurrences,
    normalizedUrlRows: nycacLinkRows.length,
    eventsWithOutboundLinks: nycacLinkedEventIds.size,
    sourceArticles: nycacArticleRows.length,
    protectedRows: nycacProtectedLinkRows.length,
    researchNeededRows: nycacUnresolvedLinkRows.length
  };
  const nycacEventTitleById = new Map(
    nycacRecoveredEventRows.map((record) => [record.eventId, record.title])
  );
  const nycacLinkRowsMatchEventLedger = nycacLinkRows.every((row) =>
    Array.isArray(row.eventIds) &&
    Array.isArray(row.eventTitles) &&
    row.eventTitles.length > 0 &&
    (
      row.eventTitles.length === 1
        ? row.eventIds.every((eventId) =>
            nycacEventTitleById.get(eventId) === row.eventTitles[0]
          )
        : row.eventIds.length === row.eventTitles.length &&
          row.eventIds.every((eventId, index) =>
            nycacEventTitleById.get(eventId) === row.eventTitles[index]
          )
    )
  );
  const nycacEventIntake = intakeById.get("INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026");
  const nycacEventSources = nycacFacebookEvents.sources.map((source) => sourceById.get(source.id));
  const nycacEventObservations = nycacFacebookEvents.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const nycacEventClaims = nycacFacebookEvents.claims.map((claim) => claimById.get(claim.id));
  const nycacEventInquiries = nycacFacebookEvents.researchInquiries.map(
    (inquiry) => inquiryById.get(inquiry.id)
  );
  const nycacParticipationClaim = claimById.get(nycacEvents.selectedClaimId);
  const nycacHeldEventClaims = nycacEvents.heldClaimIds.map((id) => claimById.get(id));
  const nycacEventPageOccurrence = fairRentPage?.occurrences.find(
    (occurrence) => occurrence.claimId === nycacEvents.selectedClaimId
  );
  const exactEventRecordKeys = new Set([
    "slotId", "eventId", "date", "title", "pageRelationship", "venueOrMode",
    "eventFormat", "primaryProgram", "isRecurringMeeting", "responseDisplay",
    "responseValue", "recoveryStatus", "sourceUrl"
  ]);
  const exactEventLinkKeys = new Set([
    "rowId", "host", "category", "disposition", "publicUrl", "eventIds",
    "eventTitles", "occurrences"
  ]);
  const exactEventLedgerKeys = new Set([
    "account", "accounting", "capturedAt", "liveReplay", "populationDefinition",
    "privacyBoundary", "records", "revalidatedAt", "schemaVersion", "surface"
  ]);
  const exactEventLinkLedgerKeys = new Set([
    "account", "accounting", "capturedAt", "interpretationBoundary", "method",
    "privacyBoundary", "revalidatedAt", "rows", "schemaVersion", "surface"
  ]);
  const exactEventAccountingKeys = new Set([
    "controlSlots", "recoveredRecords", "unresolvedSlots", "yearCounts", "responseSignals"
  ]);
  const exactResponseAccountingKeys = new Set([
    "displayed", "missing", "minimum", "maximum", "atLeast100", "atLeast400",
    "atLeast1000", "boundary"
  ]);
  const exactReplayKeys = new Set([
    "authenticatedUrlsOpened", "eventHeadersRecovered", "currentFullDetailModules",
    "currentHeaderOnlyUnavailableModules", "currentHeaderOnlyUnavailableEventIds", "note"
  ]);
  const exactLinkAccountingKeys = new Set([
    "linkOccurrences", "normalizedUrlRows", "eventsWithOutboundLinks", "sourceArticles",
    "protectedRows", "researchNeededRows"
  ]);
  const isStringOrNull = (value) => typeof value === "string" || value === null;
  const isFiniteNumberOrNull = (value) => Number.isFinite(value) || value === null;
  const nycacEventRecordShapesValid = nycacEventRows.every((row) =>
    hasExactKeys(row, exactEventRecordKeys) &&
    typeof row.slotId === "string" &&
    isStringOrNull(row.eventId) &&
    isStringOrNull(row.date) &&
    isStringOrNull(row.title) &&
    typeof row.pageRelationship === "string" &&
    isStringOrNull(row.venueOrMode) &&
    isStringOrNull(row.eventFormat) &&
    isStringOrNull(row.primaryProgram) &&
    typeof row.isRecurringMeeting === "boolean" &&
    isStringOrNull(row.responseDisplay) &&
    isFiniteNumberOrNull(row.responseValue) &&
    typeof row.recoveryStatus === "string" &&
    isStringOrNull(row.sourceUrl)
  );
  const nycacLinkRowShapesValid = nycacLinkRows.every((row) =>
    hasExactKeys(row, exactEventLinkKeys) &&
    typeof row.rowId === "string" &&
    typeof row.host === "string" &&
    typeof row.category === "string" &&
    typeof row.disposition === "string" &&
    isStringOrNull(row.publicUrl) &&
    Array.isArray(row.eventIds) && row.eventIds.every((value) => typeof value === "string") &&
    Array.isArray(row.eventTitles) && row.eventTitles.every((value) => typeof value === "string") &&
    Number.isInteger(row.occurrences)
  );
  const nycacEventLedgerShapeValid = Boolean(
    hasExactKeys(nycacEventLedger, exactEventLedgerKeys) &&
    typeof nycacEventLedger.account === "string" &&
    typeof nycacEventLedger.capturedAt === "string" &&
    typeof nycacEventLedger.populationDefinition === "string" &&
    typeof nycacEventLedger.privacyBoundary === "string" &&
    nycacEventLedger.privacyBoundary.includes("Public institutional event metadata only") &&
    nycacEventLedger.privacyBoundary.includes("Guest identities") &&
    nycacEventLedger.privacyBoundary.includes("excluded") &&
    typeof nycacEventLedger.revalidatedAt === "string" &&
    typeof nycacEventLedger.schemaVersion === "string" &&
    typeof nycacEventLedger.surface === "string" &&
    Array.isArray(nycacEventLedger.records) &&
    hasExactKeys(nycacEventLedger.accounting, exactEventAccountingKeys) &&
    Object.values(nycacEventLedger.accounting.yearCounts ?? {}).every(Number.isInteger) &&
    hasExactKeys(nycacEventLedger.accounting.responseSignals, exactResponseAccountingKeys) &&
    Object.entries(nycacEventLedger.accounting.responseSignals).every(([key, value]) =>
      key === "boundary" ? typeof value === "string" : Number.isFinite(value)
    ) &&
    hasExactKeys(nycacEventLedger.liveReplay, exactReplayKeys) &&
    Number.isInteger(nycacEventLedger.liveReplay.authenticatedUrlsOpened) &&
    Number.isInteger(nycacEventLedger.liveReplay.eventHeadersRecovered) &&
    Number.isInteger(nycacEventLedger.liveReplay.currentFullDetailModules) &&
    Number.isInteger(nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableModules) &&
    Array.isArray(nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableEventIds) &&
    nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableEventIds.every((value) => typeof value === "string") &&
    typeof nycacEventLedger.liveReplay.note === "string" &&
    nycacEventRecordShapesValid
  );
  const nycacLinkLedgerShapeValid = Boolean(
    hasExactKeys(nycacEventLinkLedger, exactEventLinkLedgerKeys) &&
    typeof nycacEventLinkLedger.account === "string" &&
    typeof nycacEventLinkLedger.capturedAt === "string" &&
    typeof nycacEventLinkLedger.interpretationBoundary === "string" &&
    typeof nycacEventLinkLedger.method === "string" &&
    typeof nycacEventLinkLedger.privacyBoundary === "string" &&
    nycacEventLinkLedger.privacyBoundary.includes("Meeting access paths") &&
    nycacEventLinkLedger.privacyBoundary.includes("withheld") &&
    typeof nycacEventLinkLedger.revalidatedAt === "string" &&
    typeof nycacEventLinkLedger.schemaVersion === "string" &&
    typeof nycacEventLinkLedger.surface === "string" &&
    Array.isArray(nycacEventLinkLedger.rows) &&
    hasExactKeys(nycacEventLinkLedger.accounting, exactLinkAccountingKeys) &&
    Object.values(nycacEventLinkLedger.accounting).every(Number.isInteger) &&
    nycacLinkRowShapesValid
  );
  const nycacEventLedgerText = nycacEventLedger ? JSON.stringify(nycacEventLedger) : "";
  const nycacEventLinkLedgerText = nycacEventLinkLedger ? JSON.stringify(nycacEventLinkLedger) : "";
  const nycacEventLedgerDigestMatches = sha256(nycacEventLedgerText) === nycacEvents.expectedEventLedgerDigestSha256;
  const nycacEventLinkLedgerDigestMatches = sha256(nycacEventLinkLedgerText) === nycacEvents.expectedLinkLedgerDigestSha256;
  const nycacCanonicalPublicData = {
    sources: nycacEventSources,
    observations: nycacEventObservations,
    selectedClaim: nycacParticipationClaim
  };
  const nycacCanonicalGraph = {
    intakeItems: [nycacEventIntake],
    sources: nycacEventSources,
    observations: nycacEventObservations,
    claims: nycacEventClaims,
    researchInquiries: nycacEventInquiries
  };
  const nycacCanonicalPublicText = JSON.stringify(nycacCanonicalPublicData);
  const nycacCanonicalGraphText = JSON.stringify(nycacCanonicalGraph);
  const nycacNarrativePublicContractText = JSON.stringify({
    fairRentMdx: fairRentMdxOnDisk,
    documentation: nycacEventDocumentationOnDisk,
    report: nycacEventReportOnDisk,
    claimsDocumentation: nycacClaimsDocumentationOnDisk,
    projectOverview: nycacProjectOverviewOnDisk,
    publicRegistry: publicRegistryTextOnDisk,
    proofNarrative: {
      publicWording: nycacProof?.publicWording,
      shortWording: nycacProof?.shortWording,
      detailedPublicWording: nycacProof?.detailedPublicWording,
      whyItMatters: nycacProof?.whyItMatters
    }
  });
  const nycacEventPublicText = [
    nycacEventLedgerText,
    nycacEventLinkLedgerText,
    nycacCanonicalPublicText,
    nycacEventDocumentation,
    nycacEventReport,
    nycacClaimsNarrative,
    nycacProjectOverview,
    fairRentMdx,
    proofData
  ].join("\n");
  const nycacEventSourceContractsPass = Object.entries(nycacEvents.sourceContracts).every(
    ([id, [supportPhrase, boundaryPhrase]]) => {
      const source = sourceById.get(id);
      return source &&
        source.supportsGenerally.join(" ").includes(supportPhrase) &&
        source.doesNotEstablish.join(" ").includes(boundaryPhrase);
    }
  );
  const nycacEventClaimContractsPass = Object.entries(nycacEvents.claimContracts).every(
    ([id, phrases]) => {
      const claim = claimById.get(id);
      const text = claim ? JSON.stringify(claim) : "";
      return phrases.every((phrase) => text.includes(phrase));
    }
  );
  const nycacParticipationPublicText = nycacParticipationClaim ? [
    nycacParticipationClaim.internalClaim,
    ...nycacParticipationClaim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text)
  ].join(" ") : "";
  const nycacProofNarrativeSurfaces = fixtures.nycacProofNarrative === undefined
    ? [
      nycacProof?.publicWording,
      nycacProof?.shortWording,
      nycacProof?.detailedPublicWording,
      nycacProof?.whyItMatters
    ].filter(Boolean)
    : [fixtures.nycacProofNarrative];
  const nycacCanonicalNarrativeSurfaces = [
    ...nycacEventSources.flatMap((source) => [source?.publicNote, source?.publicCitation]),
    ...nycacEventObservations.map((observation) => observation?.text)
  ].filter(Boolean);
  const nycacNarrativeSurfaces = [
    nycacParticipationPublicText,
    nycacEventDocumentation,
    nycacEventReport,
    nycacClaimsNarrative,
    nycacProjectOverview,
    fairRentMdx,
    ...nycacProofNarrativeSurfaces,
    ...nycacCanonicalNarrativeSurfaces
  ];
  const nycacPublicProjectionSurfaces = [
    nycacParticipationPublicText,
    fairRentMdx,
    ...nycacProofNarrativeSurfaces
  ];
  const nycacSoleCreditViolation = nycacNarrativeSurfaces.some(containsNycacSoleCreditClaim);
  const nycacAttendanceConversionViolation = nycacNarrativeSurfaces.some(containsUnsafeAttendanceConversion);
  const nycacHeldInterpretationViolation = nycacPublicProjectionSurfaces.some(containsNycacHeldInterpretation);
  const nycacCanonicalPersonalMetadataViolation = deepStringValues(nycacCanonicalPublicData)
    .some(containsExplicitPersonalIdentityMaterial);
  const nycacCanonicalProtectedLocatorViolation = deepStringValues(nycacCanonicalPublicData)
    .some(containsProtectedLocator);
  const nycacCanonicalCredentialViolation = deepStringValues(nycacCanonicalPublicData)
    .some(containsCredentialMaterial);
  let nycacRegistryProjectionMatches = false;
  let nycacRegistryPublicSafetyPasses = false;
  try {
    const registry = JSON.parse(publicRegistryText);
    const registryClaim = registry.claims.find((claim) => claim.id === nycacEvents.selectedClaimId);
    const registrySourceIds = new Set([
      ...nycacEvents.eventSourceIds,
      ...(nycacParticipationClaim?.evidence ?? []).filter((evidence) => evidence.renderCitation).map((evidence) => evidence.sourceId)
    ]);
    const registrySlice = {
      claim: registryClaim,
      sources: registry.sources.filter((source) => registrySourceIds.has(source.id)),
      page: registry.pages.find((page) => page.id === "fair-rent-nyc")
    };
    const activeProjections = nycacParticipationClaim?.projections.filter(
      (projection) => projection.status === "active"
    ) ?? [];
    nycacRegistryProjectionMatches = Boolean(
      registryClaim &&
      JSON.stringify(registryClaim.projections) === JSON.stringify(activeProjections)
    );
    nycacRegistryPublicSafetyPasses = publicRegistryText === publicRegistryTextOnDisk &&
      !deepStringValues(registrySlice).some(containsExplicitPersonalIdentityMaterial) &&
      !deepStringValues(registrySlice).some(containsProtectedLocator) &&
      !deepStringValues(registrySlice).some(containsCredentialMaterial);
  } catch {
    nycacRegistryProjectionMatches = false;
    nycacRegistryPublicSafetyPasses = false;
  }
  const nycacEventAccountingMatchesRows = Boolean(
    nycacEventLedger?.accounting?.controlSlots === nycacEventRows.length &&
      nycacEventLedger.accounting.recoveredRecords === nycacRecoveredEventRows.length &&
      nycacEventLedger.accounting.unresolvedSlots === nycacUnresolvedEventRows.length &&
      numericRecordEquals(nycacEventLedger.accounting.yearCounts, nycacEventYearCounts) &&
      Object.entries(nycacDerivedResponseAccounting).every(
        ([key, value]) => nycacEventLedger.accounting.responseSignals?.[key] === value
      )
  );
  const nycacLinkAccountingMatchesRows = Boolean(
    nycacEventLinkLedger?.accounting &&
      Object.entries(nycacDerivedLinkAccounting).every(
        ([key, value]) => nycacEventLinkLedger.accounting[key] === value
      )
  );
  const nycacReplayEventIdsValid = Boolean(
    nycacEventLedger?.liveReplay &&
      stringSetEquals(
        nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableEventIds,
        nycacEvents.expectedCurrentReplayHeaderOnlyEventIds
      ) &&
      nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableEventIds.every((eventId) =>
        nycacEventTitleById.has(eventId)
      )
  );
  const nycacEmbeddedPersonalMetadataViolation = [nycacEventLedger, nycacEventLinkLedger]
    .flatMap(deepStringValues)
    .some(containsPersonalIdentityMaterial);
  const nycacProtectedLocatorViolation = [nycacEventLedger, nycacEventLinkLedger]
    .flatMap(deepStringValues)
    .some(containsProtectedLocator);
  const nycacEventRowIdentifiersValid = Boolean(
    nycacEventRows.length === new Set(nycacEventRows.map((row) => row.slotId)).size &&
      nycacRecoveredEventRows.length === new Set(nycacRecoveredEventRows.map((row) => row.eventId)).size &&
      nycacRecoveredEventRows.length === new Set(nycacRecoveredEventRows.map((row) => row.sourceUrl)).size &&
      nycacRecoveredEventRows.every((row) =>
        typeof row.eventId === "string" && /^\d+$/.test(row.eventId) &&
        row.sourceUrl === `https://www.facebook.com/events/${row.eventId}/` &&
        /^\d{4}-\d{2}-\d{2}$/.test(row.date) &&
        parseFacebookResponseDisplay(row.responseDisplay) === row.responseValue
      )
  );
  const nycacLinkRowIdentifiersValid = Boolean(
    nycacLinkRows.length === new Set(nycacLinkRows.map((row) => row.rowId)).size &&
      nycacLinkRows.every((row) =>
        row.eventIds.length === new Set(row.eventIds).size &&
        typeof row.host === "string" && !/[\s/?#]/.test(row.host) &&
        Number.isInteger(row.occurrences) && row.occurrences > 0 &&
        publicLinkRowIsSafe(row)
      )
  );
  const nycacCanonicalEventSourcesMatchLedger = nycacEvents.eventSourceIds.every((id) => {
    const source = sourceById.get(id);
    const eventId = source?.canonicalUrl?.match(/facebook\.com\/events\/(\d+)/)?.[1];
    const record = eventId ? nycacRecoveredEventRows.find((row) => row.eventId === eventId) : null;
    return Boolean(
      source && record && source.title === record.title &&
      source.publishedAt === record.date &&
      source.canonicalUrl === record.sourceUrl
    );
  });
  const nycacEventPopulationComplete = Boolean(
    nycacEventLedger &&
      nycacEventLinkLedger &&
      nycacEventLedger.account === "@nycartc" &&
      nycacEventLedger.surface === "Facebook past events" &&
      nycacEventLedger.populationDefinition.includes("current authenticated host-card control") &&
      nycacEventRows.length === nycacEvents.expectedControlSlots &&
      nycacRecoveredEventRows.length === nycacEvents.expectedRecoveredRecords &&
      nycacUnresolvedEventRows.length === nycacEvents.expectedUnresolvedSlots &&
      nycacEventLedgerDigestMatches &&
      nycacEventLinkLedgerDigestMatches &&
      sha256(nycacEventLedgerText) === nycacEventLedgerPublicContractSha256 &&
      sha256(nycacEventLinkLedgerText) === nycacLinkLedgerPublicContractSha256 &&
      sha256(nycacCanonicalGraphText) === nycacCanonicalGraphPublicContractSha256 &&
      sha256(nycacNarrativePublicContractText) === nycacNarrativePublicContractSha256 &&
      nycacEventLedgerShapeValid &&
      nycacLinkLedgerShapeValid &&
      nycacEventAccountingMatchesRows &&
      Object.entries(nycacEvents.expectedYearCounts).every(([year, count]) => nycacEventYearCounts[year] === count) &&
      nycacEventRelationshipCounts["direct-card-host"] === nycacEvents.expectedDirectHostCards &&
      nycacEventRelationshipCounts["cohosted-or-associated"] === nycacEvents.expectedAlignedHostCards &&
      nycacRecurringRows.length === nycacEvents.expectedRecurringMeetingRecords &&
      nycacPhysicalMeetingVenues.size === nycacEvents.expectedDistinctPhysicalVenues &&
      nycacVirtualMeetingRows.length === nycacEvents.expectedVirtualMeetingRecords &&
      nycacResponseValues.length === nycacEvents.expectedResponseDisplays &&
      Math.min(...nycacResponseValues) === nycacEvents.expectedMinimumResponseDisplay &&
      Math.max(...nycacResponseValues) === nycacEvents.expectedMaximumResponseDisplay &&
      nycacResponseValues.filter((value) => value >= 100).length === nycacEvents.expectedResponseDisplaysAtLeast100 &&
      nycacResponseValues.filter((value) => value >= 400).length === nycacEvents.expectedResponseDisplaysAtLeast400 &&
      nycacResponseValues.filter((value) => value >= 1000).length === nycacEvents.expectedResponseDisplaysAtLeast1000 &&
      nycacEventLedger.accounting.responseSignals.boundary.includes("must not be summed") &&
      nycacEventLedger.liveReplay.eventHeadersRecovered === nycacEvents.expectedCurrentReplayHeaders &&
      nycacEventLedger.liveReplay.currentFullDetailModules === nycacEvents.expectedCurrentReplayFullBodies &&
      nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableModules === nycacEvents.expectedCurrentReplayHeaderOnlyBodies &&
      nycacEventLedger.liveReplay.authenticatedUrlsOpened === nycacRecoveredEventRows.length &&
      nycacEventLedger.liveReplay.currentFullDetailModules + nycacEventLedger.liveReplay.currentHeaderOnlyUnavailableModules === nycacRecoveredEventRows.length &&
      nycacReplayEventIdsValid &&
      nycacEventLinkLedger.account === "@nycartc" &&
      nycacLinkAccountingMatchesRows &&
      nycacLinkRows.length === nycacEvents.expectedNormalizedLinkRows &&
      nycacLinkedEventIds.size === nycacEvents.expectedEventsWithOutboundLinks &&
      nycacLinkOccurrences === nycacEvents.expectedOutboundLinkOccurrences &&
      nycacArticleRows.length === nycacEvents.expectedArticleRoutes &&
      nycacProtectedLinkRows.length === nycacEvents.expectedProtectedLinkRows &&
      nycacProtectedLinkRows.every((row) => row.publicUrl === null) &&
      nycacUnresolvedLinkRows.length === nycacEvents.expectedUnresolvedLinkRows &&
      nycacLinkRowsMatchEventLedger &&
      nycacEventRows.every((row) => hasExactKeys(row, exactEventRecordKeys)) &&
      nycacLinkRows.every((row) => hasExactKeys(row, exactEventLinkKeys)) &&
      hasExactKeys(nycacEventLedger, exactEventLedgerKeys) &&
      hasExactKeys(nycacEventLinkLedger, exactEventLinkLedgerKeys) &&
      hasExactKeys(nycacEventLedger.accounting, exactEventAccountingKeys) &&
      hasExactKeys(nycacEventLedger.accounting.responseSignals, exactResponseAccountingKeys) &&
      hasExactKeys(nycacEventLedger.liveReplay, exactReplayKeys) &&
      hasExactKeys(nycacEventLinkLedger.accounting, exactLinkAccountingKeys) &&
      nycacEventRowIdentifiersValid &&
      nycacLinkRowIdentifiersValid &&
      nycacUnresolvedEventRows.every((row) =>
        row.slotId === "unresolved-034" &&
        row.eventId === null && row.date === null && row.title === null &&
        row.venueOrMode === null && row.eventFormat === null &&
        row.primaryProgram === null && row.responseDisplay === null &&
        row.responseValue === null && row.sourceUrl === null &&
        row.pageRelationship === "control-only" && row.isRecurringMeeting === false
      ) &&
      !nycacEmbeddedPersonalMetadataViolation &&
      !nycacProtectedLocatorViolation &&
      nycacFacebookEventPopulationAudit.controlSlots === nycacEvents.expectedControlSlots &&
      nycacFacebookEventPopulationAudit.recoveredRecords === nycacEvents.expectedRecoveredRecords &&
      nycacFacebookEventPopulationAudit.unresolvedSlots === nycacEvents.expectedUnresolvedSlots &&
      nycacFacebookEventFindings.currentReplayFullBodies === nycacEvents.expectedCurrentReplayFullBodies &&
      nycacFacebookEventFindings.currentReplayHeaderOnlyBodies === nycacEvents.expectedCurrentReplayHeaderOnlyBodies &&
      nycacFacebookEvents.sources.length === nycacEvents.expectedNewSourceCount &&
      nycacFacebookEvents.observations.length === nycacEvents.expectedObservationCount &&
      nycacFacebookEvents.claims.length === nycacEvents.expectedClaimCount &&
      nycacFacebookEvents.researchInquiries.length === nycacEvents.expectedInquiryCount &&
      nycacEventIntake?.disposition === "integrated" &&
      nycacEventIntake.boundaries.length >= 4 &&
      nycacEventIntake.sourceIds.every((id) => sourceById.has(id)) &&
      nycacEventIntake.observationIds.every((id) => observationById.has(id)) &&
      nycacEventSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      nycacEventObservations.every((observation) =>
        observation?.locator && observation.limitations.length &&
        observation.sourceId && observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      nycacEventClaims.every((claim) =>
        claim?.boundaries.length >= 2 && claim.antiClaims.length >= 3 && claim.reviewedBy.length >= 2
      ) &&
      nycacEventInquiries.every((inquiry) => inquiry?.findings.length >= 3 && inquiry.limitations.length >= 3) &&
      nycacEventSourceContractsPass &&
      nycacEventClaimContractsPass &&
      nycacEvents.eventSourceIds.every((id) => sourceById.get(id)?.canonicalUrl?.includes("facebook.com/events/")) &&
      nycacCanonicalEventSourcesMatchLedger &&
      nycacParticipationClaim?.status === "confirmed-with-boundary" &&
      nycacParticipationClaim.projections.length === 1 &&
      nycacParticipationClaim.projections.some((projection) =>
        projection.status === "active" &&
        projection.surfaces.includes("/work/fair-rent-nyc") &&
        projection.text.includes("describes his contribution as helping establish and produce")
      ) &&
      !nycacSoleCreditViolation &&
      !nycacHeldInterpretationViolation &&
      nycacRegistryProjectionMatches &&
      nycacRegistryPublicSafetyPasses &&
      nycacParticipationClaim.evidence.some((evidence) =>
        evidence.sourceId === "SRC-NYCAC-JAMIE-EVENT-PRACTICE-CONFIRMATION-2026" &&
        evidence.relationship === "private-support" && evidence.renderCitation === false
      ) &&
      nycacParticipationClaim.evidence.some((evidence) =>
        evidence.sourceId === "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12" && evidence.renderCitation
      ) &&
      nycacHeldEventClaims.every((claim) =>
        claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      claimById.get("CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE")?.status === "inference" &&
      nycacEventPageOccurrence?.id === "participation-system" &&
      fairRentMdx.includes("CLM-NYCAC-PARTICIPATION-SYSTEM") &&
      nycacEventDocumentation.includes("33 recovered event records") &&
      nycacEventDocumentation.includes("one unresolved historical slot") &&
      nycacEventDocumentation.includes("22 full bodies and 11 header-only bodies") &&
      nycacEventReport.includes("Being there changes everything") &&
      nycacEventReport.includes("describes his contribution as helping establish and produce") &&
      nycacEventReport.includes("not unique-person or attendance counts") &&
      !/(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(nycacEventPublicText) &&
      !/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(nycacEventPublicText) &&
      !nycacCanonicalPersonalMetadataViolation &&
      !nycacCanonicalProtectedLocatorViolation &&
      !nycacCanonicalCredentialViolation &&
      !nycacAttendanceConversionViolation &&
      nycacEvents.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const nycacEventDiagnostics = {
    population: nycacEventRows.length === 34 && nycacRecoveredEventRows.length === 33 && nycacUnresolvedEventRows.length === 1 && Object.entries(nycacEvents.expectedYearCounts).every(([year, count]) => nycacEventYearCounts[year] === count),
    relationshipsAndVenues: nycacEventRelationshipCounts["direct-card-host"] === 24 && nycacEventRelationshipCounts["cohosted-or-associated"] === 9 && nycacRecurringRows.length === 12 && nycacPhysicalMeetingVenues.size === 10 && nycacVirtualMeetingRows.length === 2,
    responsesAndReplay: nycacResponseValues.length === 32 && Math.min(...nycacResponseValues) === 9 && Math.max(...nycacResponseValues) === 1700 && nycacEventAccountingMatchesRows && nycacEventLedger?.liveReplay.currentFullDetailModules === 22 && nycacEventLedger?.liveReplay.currentHeaderOnlyUnavailableModules === 11 && nycacReplayEventIdsValid,
    links: nycacLinkRows.length === 38 && nycacLinkedEventIds.size === 25 && nycacLinkOccurrences === 61 && nycacArticleRows.length === 7 && nycacProtectedLinkRows.length === 1 && nycacUnresolvedLinkRows.length === 4 && nycacLinkRowsMatchEventLedger && nycacLinkAccountingMatchesRows,
    immutableLedgerContracts: sha256(nycacEventLedgerText) === nycacEventLedgerPublicContractSha256 && sha256(nycacEventLinkLedgerText) === nycacLinkLedgerPublicContractSha256 && sha256(nycacCanonicalGraphText) === nycacCanonicalGraphPublicContractSha256 && sha256(nycacNarrativePublicContractText) === nycacNarrativePublicContractSha256,
    ledgerShapes: nycacEventLedgerShapeValid && nycacLinkLedgerShapeValid,
    suiteLedgerDigests: nycacEventLedgerDigestMatches && nycacEventLinkLedgerDigestMatches,
    eventLedgerIdentifiers: nycacEventRowIdentifiersValid,
    linkLedgerIdentifiers: nycacLinkRowIdentifiersValid,
    unresolvedSlotShape: nycacUnresolvedEventRows.every((row) => row.slotId === "unresolved-034" && row.title === null && row.responseDisplay === null && row.responseValue === null && row.sourceUrl === null),
    ledgerIdentitySafety: !nycacEmbeddedPersonalMetadataViolation,
    canonicalEventSources: nycacCanonicalEventSourcesMatchLedger,
    rowContracts: nycacEventLedgerDigestMatches && nycacEventLinkLedgerDigestMatches && sha256(nycacEventLedgerText) === nycacEventLedgerPublicContractSha256 && sha256(nycacEventLinkLedgerText) === nycacLinkLedgerPublicContractSha256 && nycacEventLedgerShapeValid && nycacLinkLedgerShapeValid && nycacEventRowIdentifiersValid && nycacLinkRowIdentifiersValid && nycacUnresolvedEventRows.every((row) => row.slotId === "unresolved-034" && row.title === null && row.responseDisplay === null && row.responseValue === null && row.sourceUrl === null) && !nycacEmbeddedPersonalMetadataViolation && nycacCanonicalEventSourcesMatchLedger,
    moduleCounts: nycacFacebookEvents.sources.length === 17 && nycacFacebookEvents.observations.length === 24 && nycacFacebookEvents.claims.length === 5 && nycacFacebookEvents.researchInquiries.length === 2,
    graph: Boolean(nycacEventIntake?.sourceIds.every((id) => sourceById.has(id)) && nycacEventIntake.observationIds.every((id) => observationById.has(id)) && nycacEventSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) && nycacEventObservations.every((observation) => observation?.locator && observation.limitations.length && observation.sourceId && observation.claimIds.length && observation.researchInquiryIds.length)),
    semanticContracts: nycacEventSourceContractsPass && nycacEventClaimContractsPass,
    selectedProjection: Boolean(nycacParticipationClaim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc") && projection.text.includes("describes his contribution as helping establish and produce")) && nycacEventPageOccurrence?.id === "participation-system" && fairRentMdx.includes("CLM-NYCAC-PARTICIPATION-SYSTEM")),
    soleCreditSafety: !nycacSoleCreditViolation,
    attendanceSafety: !nycacAttendanceConversionViolation,
    heldInterpretationSafety: !nycacHeldInterpretationViolation,
    publicRegistryBinding: nycacRegistryProjectionMatches && nycacRegistryPublicSafetyPasses,
    heldDepth: nycacHeldEventClaims.every((claim) => claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)) && claimById.get("CLM-NYCAC-DEMOCRATIC-LISTENING-PRACTICE")?.status === "inference",
    documentation: nycacEventDocumentation.includes("33 recovered event records") && nycacEventDocumentation.includes("one unresolved historical slot") && nycacEventDocumentation.includes("22 full bodies and 11 header-only bodies") && nycacEventReport.includes("Being there changes everything") && nycacEventReport.includes("describes his contribution as helping establish and produce") && nycacEventReport.includes("not unique-person or attendance counts") && !nycacAttendanceConversionViolation,
    safety: !/(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(nycacEventPublicText) && !/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(nycacEventPublicText) && !nycacCanonicalPersonalMetadataViolation && !nycacCanonicalProtectedLocatorViolation && !nycacCanonicalCredentialViolation
  };
  const personalEvents = suite.pilot.personalWowlistFacebookEvents;
  const personalEventControlsPath = path.join(repoRoot, personalEvents.controlsPath);
  const personalEventCensusPath = path.join(repoRoot, personalEvents.censusPath);
  const personalEventReportPath = path.join(repoRoot, personalEvents.reportPath);
  const personalEventControlsText = fixtures.personalWowlistFacebookEventControlsText ??
    (existsSync(personalEventControlsPath) ? readFileSync(personalEventControlsPath, "utf8") : "{}");
  const personalEventControls = fixtures.personalWowlistFacebookEventControls ??
    JSON.parse(personalEventControlsText);
  const personalEventCensus = fixtures.personalWowlistFacebookEventCensus ??
    (existsSync(personalEventCensusPath) ? readFileSync(personalEventCensusPath, "utf8") : "");
  const personalEventReport = fixtures.personalWowlistFacebookEventReport ??
    (existsSync(personalEventReportPath) ? readFileSync(personalEventReportPath, "utf8") : "");
  const personalEventIntakes = personalWowlistFacebookEvents.intakeItems.map(
    (item) => intakeById.get(item.id)
  );
  const personalEventSources = personalWowlistFacebookEvents.sources.map(
    (source) => sourceById.get(source.id)
  );
  const personalEventObservations = personalWowlistFacebookEvents.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const personalEventClaims = personalEvents.claimIds.map((id) => claimById.get(id));
  const personalEventInquiries = personalEvents.inquiryIds.map((id) => inquiryById.get(id));
  const personalEventSelectedSources = personalEvents.selectedEventSourceIds.map(
    (id) => sourceById.get(id)
  );
  const personalEventRouteSources = personalEvents.routeSourceIds.map(
    (id) => sourceById.get(id)
  );
  const personalAssociationClaim = claimById.get(
    "CLM-JAMIE-FACEBOOK-EVENT-ASSOCIATION-POPULATION-2026"
  );
  const personalPracticeClaim = claimById.get(
    "CLM-JAMIE-FACEBOOK-HOSTED-EVENT-PRACTICE-2006-2017"
  );
  const wowlistLiveEventClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-EVENT-LIVE-CONTROL-2026"
  );
  const wowlistHistoricalEventClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-EVENT-HISTORY-NOT-RECOVERED-2026"
  );
  const personalEventRows = personalEventCensus.trimEnd().split("\n");
  const personalEventControl = personalEventControls.personalAssociationSurface ?? {};
  const hostedEventControl = personalEventControls.personalHostedEventsTab ?? {};
  const displayedHostControl = personalEventControls.displayedJamieHostSubset ?? {};
  const wowlistEventControl = personalEventControls.wowlist ?? {};
  const liveEventVerification = personalEventControls.liveReverification ?? {};
  const personalEventPublicText = [
    personalEventControlsText,
    personalEventCensus,
    personalEventReport,
    JSON.stringify(personalWowlistFacebookEvents)
  ].join("\n");
  const personalEventPrivatePathViolation =
    /(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(personalEventPublicText);
  const personalEventControlsExposeRowIds =
    /facebook\.com\/events\/\d+|\b\d{12,}\b/.test(personalEventControlsText) ||
    /https?:|facebook\.com|\b\d{12,}\b/.test(personalEventCensus);
  const personalEventClaimsStayBankOnly = personalEventClaims.every((claim) =>
    claim?.projections.every((projection) =>
      projection.key === "archive-note" &&
      projection.status === "active" &&
      projection.surfaces.length === 1 &&
      projection.surfaces[0] === personalEvents.reportPath
    )
  );
  const sundayDinnerProof = proofClaims.find((proof) => proof.id === personalEvents.proofId);
  const personalWowlistEventDiagnostics = {
    controlArithmetic: Boolean(
      personalEventControl.currentRecords === personalEvents.expectedProfileIds &&
      personalEventControl.secondPassExactIdMatch === true &&
      personalEventControl.thirdPassExactIdMatch === true &&
      personalEventControl.displayedHostAccounting?.jamie ===
        personalEvents.expectedDisplayedJamieHostCards &&
      personalEventControl.displayedHostAccounting?.anotherHost ===
        personalEvents.expectedDisplayedOtherHostCards &&
      hostedEventControl.currentRecords === personalEvents.expectedHostedIds &&
      hostedEventControl.recoveredRecords === personalEvents.expectedHostedIds &&
      hostedEventControl.unresolvedRecords === 0 &&
      hostedEventControl.overlapWithAssociationSurface === personalEvents.expectedOverlap &&
      hostedEventControl.distinctRecordsAcrossBothTabs === personalEvents.expectedUnion &&
      displayedHostControl.pastEventsCards === personalEvents.expectedDisplayedJamieHostCards &&
      Object.values(displayedHostControl.primaryFormCounts ?? {})
        .reduce((sum, value) => sum + value, 0) === personalEvents.expectedDisplayedJamieHostCards &&
      wowlistEventControl.currentDisplayedRecords === personalEvents.expectedWowlistCurrentEvents &&
      wowlistEventControl.historicalDisposition === "not-recovered"
    ),
    liveReverification: Boolean(
      liveEventVerification.personalPastTraversalCount === personalEvents.expectedProfileIds &&
      liveEventVerification.personalPastExactIdMatchAgainstPriorControl === true &&
      liveEventVerification.hostedTabRecordsRecovered === personalEvents.expectedHostedIds &&
      liveEventVerification.wowlistDisplayedRecordsWhileActingAsPage ===
        personalEvents.expectedWowlistCurrentEvents
    ),
    moduleShape: Boolean(
      personalWowlistFacebookEvents.intakeItems.length === personalEvents.expectedIntakeCount &&
      personalWowlistFacebookEvents.sources.length === personalEvents.expectedSourceCount &&
      personalWowlistFacebookEvents.observations.length === personalEvents.expectedObservationCount &&
      personalWowlistFacebookEvents.claims.length === personalEvents.expectedClaimCount &&
      personalWowlistFacebookEvents.researchInquiries.length === personalEvents.expectedInquiryCount
    ),
    intakeLinks: personalEventIntakes.every((item) =>
      item?.disposition === "integrated" && item.boundaries.length >= 2 &&
      item.sourceIds.every((id) => sourceById.has(id)) &&
      item.observationIds.every((id) => observationById.has(id))
    ),
    sourceScope: personalEventSources.every((source) =>
      source?.supportsGenerally.length && source.doesNotEstablish.length
    ),
    selectedEventSources: personalEventSelectedSources.every((source) =>
      source?.visibility === "public" &&
      source.canonicalUrl?.includes("facebook.com/events/") &&
      !source.author &&
      source.publicCitation.includes("displaying the label 'Event by Jamie Burkart'") &&
      source.doesNotEstablish.some((boundary) =>
        /sole authorship|sole-production|sole production/i.test(boundary)
      )
    ),
    postedRouteGovernance: personalEventRouteSources.every((source) =>
      source?.supportsGenerally.some((support) => /route|destination/i.test(support)) &&
      source.doesNotEstablish.some((boundary) => /readership|participant/i.test(boundary))
    ),
    atomicObservations: personalEventObservations.every((observation) =>
      observation?.locator && observation.limitations.length &&
      observation.sourceId && (observation.claimIds.length || observation.researchInquiryIds.length)
    ),
    claimMaturation: personalEventClaims.every((claim) =>
      claim?.boundaries.length >= 2 && claim.antiClaims.length >= 3 &&
      claim.evidence.length && claim.reviewedBy.length >= 2
    ),
    inquiryMaturation: personalEventInquiries.every((inquiry) =>
      inquiry?.findings.length >= 3 && inquiry.limitations.length >= 3 &&
      inquiry.sourceIds.every((id) => sourceById.has(id))
    ),
    claimSemantics: Boolean(
      personalAssociationClaim?.antiClaims.some((claim) => /all 505 events/i.test(claim)) &&
      personalPracticeClaim?.boundaries.some((boundary) => /not sole-production credit/i.test(boundary)) &&
      personalPracticeClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-KCUR-EIGHTH-STREET-TUNNEL-2016-09-15"
      ) &&
      wowlistLiveEventClaim?.status === "confirmed-with-boundary" &&
      wowlistHistoricalEventClaim?.status === "not-recovered" &&
      wowlistHistoricalEventClaim.boundaries.some(
        (boundary) => /does not establish that no event ever existed/i.test(boundary)
      )
    ),
    bankOnlyComposition: personalEventClaimsStayBankOnly,
    aggregateCensus: Boolean(
      personalEventRows.length === 21 &&
      personalEventRows[0] ===
        "subset_slot,source_surface,displayed_host,recovery_status,year,primary_form" &&
      personalEventRows.slice(1).every((row) => row.split(",").length === 6)
    ),
    reportContract: Boolean(
      personalEventReport.includes("505 distinct current event IDs") &&
      personalEventReport.includes("Association does not establish attendance") &&
      personalEventReport.includes("source route, not automatic corroboration") &&
      personalEventReport.includes("not recovered") &&
      personalEventReport.includes("Do not add a new visible portfolio claim")
    ),
    sundayDinnerProjection: Boolean(
      sundayDinnerProof?.sourceBasis.includes("public event pages documenting the 100th dinner")
    ),
    publicSafety: !personalEventControlsExposeRowIds && !personalEventPrivatePathViolation
  };
  const personalWowlistEventPopulationComplete = Object.values(
    personalWowlistEventDiagnostics
  ).every(Boolean);
  const wowFacebook = suite.pilot.wowlistFacebookPosts;
  const wowFacebookLedgerPath = path.join(repoRoot, wowFacebook.ledgerPath);
  const wowFacebookReportPath = path.join(repoRoot, wowFacebook.reportPath);
  const wowFacebookLedgerText = fixtures.wowlistFacebookPostLedgerText ??
    (existsSync(wowFacebookLedgerPath) ? readFileSync(wowFacebookLedgerPath, "utf8") : "{}");
  const wowFacebookLedger = fixtures.wowlistFacebookPostLedger ??
    JSON.parse(wowFacebookLedgerText);
  const wowFacebookReport = fixtures.wowlistFacebookPostReport ??
    (existsSync(wowFacebookReportPath) ? readFileSync(wowFacebookReportPath, "utf8") : "");
  const wowFacebookMdx = fixtures.wowlistFacebookMdx ??
    readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8");
  const wowFacebookIntakes = wowListFacebookPosts.intakeItems.map((item) =>
    intakeById.get(item.id)
  );
  const wowFacebookSources = wowListFacebookPosts.sources.map((source) =>
    sourceById.get(source.id)
  );
  const wowFacebookObservations = wowListFacebookPosts.observations.map((observation) =>
    observationById.get(observation.id)
  );
  const wowFacebookClaims = wowFacebook.claimIds.map((id) => claimById.get(id));
  const wowFacebookInquiries = wowFacebook.inquiryIds.map((id) => inquiryById.get(id));
  const wowFacebookSelectedSources = wowFacebook.selectedPublicSourceIds.map((id) =>
    sourceById.get(id)
  );
  const wowFacebookActiveClaim = claimById.get(wowFacebook.activeClaimId);
  const wowFacebookMemoryClaim = claimById.get(wowFacebook.heldMemoryClaimId);
  const wowFacebookPopulationClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-SURVIVING-POST-POPULATION"
  );
  const wowFacebookDestinationClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-DESTINATION-NETWORK"
  );
  const wowFacebookTractionClaim = claimById.get(
    "CLM-WOWLIST-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT"
  );
  const wowFacebookPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
  const wowFacebookOccurrence = wowFacebookPage?.occurrences.find(
    (occurrence) => occurrence.id === "facebook-publishing-practice"
  );
  const wowFacebookRecords = Array.isArray(wowFacebookLedger.records)
    ? wowFacebookLedger.records
    : [];
  const wowFacebookRecordKeys = ["id", "timelineSlot", "primaryTheme", "routeLabel"];
  const wowFacebookRecordIds = new Set(wowFacebookRecords.map((record) => record.id));
  const wowFacebookRecordSlots = new Set(
    wowFacebookRecords.map((record) => record.timelineSlot)
  );
  const wowFacebookThemeCounts = wowFacebookRecords.reduce((counts, record) => {
    counts[record.primaryTheme] = (counts[record.primaryTheme] ?? 0) + 1;
    return counts;
  }, {});
  const wowFacebookDestinations = wowFacebookLedger.destinationInventory?.canonicalDestinations ?? [];
  const wowFacebookUniqueDestinations = new Set(wowFacebookDestinations);
  const wowFacebookWowlistDestinations = wowFacebookDestinations.filter((url) =>
    /(?:^|\.)wowlist\.org\//i.test(new URL(url).hostname + new URL(url).pathname)
  );
  const wowFacebookPublicText = [
    wowFacebookLedgerText,
    wowFacebookReport,
    JSON.stringify(wowListFacebookPosts)
  ].join("\n");
  const wowFacebookPrivatePathViolation =
    /(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(
      wowFacebookPublicText
    );
  const wowFacebookPersonalDataViolation =
    /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(
      wowFacebookPublicText
    );
  const wowFacebookRawFieldViolation = wowFacebookRecords.some((record) =>
    Object.keys(record).some((key) => !wowFacebookRecordKeys.includes(key))
  );
  const wowFacebookThemeContract = Object.entries(
    wowFacebook.expectedThemeCounts
  ).every(([theme, expected]) => wowFacebookThemeCounts[theme] === expected);
  const wowFacebookSourcesBounded = wowFacebookSources.every((source) =>
    source?.supportsGenerally.length && source.doesNotEstablish.length
  );
  const wowFacebookDiagnostics = {
    population: Boolean(
      wowFacebookLedger.population?.distinctSurvivingPosts ===
        wowFacebook.expectedDistinctPosts &&
      wowFacebookLedger.population?.renderedRecordsPerPass?.every(
        (count) => count === wowFacebook.expectedPriorRenderedRecords
      ) &&
      wowFacebookLedger.population?.renderedRecordsWithJamiePublisherAttributionPerPass?.every(
        (count) => count === wowFacebook.expectedPriorRenderedRecords
      ) &&
      wowFacebookLedger.population?.featuredChronologyDuplicates === 1 &&
      wowFacebookRecords.length === wowFacebook.expectedDistinctPosts &&
      wowFacebookRecordIds.size === wowFacebook.expectedDistinctPosts &&
      !wowFacebookRecordSlots.has(34) &&
      wowFacebookRecordSlots.has(33) &&
      wowFacebookRecordSlots.has(35) &&
      wowFacebookLedger.duplicateDisposition?.renderedTimelineSlot === 34 &&
      wowFacebookLedger.duplicateDisposition?.duplicateOf === "FB-WOWLIST-033"
    ),
    freshBidirectionalControl: Boolean(
      wowFacebookLedger.freshBidirectionalControl?.forwardUniqueMessageRecords ===
        wowFacebook.expectedFreshForwardRecords &&
      wowFacebookLedger.freshBidirectionalControl?.reverseUniqueMessageRecords ===
        wowFacebook.expectedFreshReverseRecords &&
      wowFacebookLedger.freshBidirectionalControl?.exactMessageAgreement ===
        wowFacebook.expectedFreshExactAgreement &&
      wowListFacebookPostAudit.freshForwardMessageRecords ===
        wowFacebook.expectedFreshForwardRecords &&
      wowListFacebookPostAudit.freshReverseMessageRecords ===
        wowFacebook.expectedFreshReverseRecords &&
      wowListFacebookPostAudit.freshExactMessageAgreement ===
        wowFacebook.expectedFreshExactAgreement
    ),
    themeDisposition: Boolean(
      wowFacebookThemeContract &&
      Object.values(wowFacebookThemeCounts).reduce((sum, value) => sum + value, 0) ===
        wowFacebook.expectedDistinctPosts
    ),
    destinationInventory: Boolean(
      wowFacebookLedger.destinationInventory?.occurrences ===
        wowFacebook.expectedExplicitDestinationOccurrences &&
      wowFacebookDestinations.length === wowFacebook.expectedUniqueExplicitDestinations &&
      wowFacebookUniqueDestinations.size === wowFacebook.expectedUniqueExplicitDestinations &&
      wowFacebookWowlistDestinations.length === wowFacebook.expectedWowlistDestinations &&
      wowFacebookDestinations.length - wowFacebookWowlistDestinations.length ===
        wowFacebook.expectedExternalDestinations &&
      wowFacebookLedger.destinationInventory?.widerRenderedLinkOccurrences ===
        wowFacebook.expectedWiderLinkOccurrences &&
      wowFacebookLedger.destinationInventory?.widerDistinctRenderedDestinations ===
        wowFacebook.expectedWiderDistinctDestinations &&
      wowFacebookDestinations.every((url) => {
        try {
          return /^https?:$/.test(new URL(url).protocol);
        } catch {
          return false;
        }
      }) &&
      /participant relationship graph/i.test(
        wowFacebookLedger.destinationInventory?.widerLinkBoundary ?? ""
      )
    ),
    reactionBoundary: Boolean(
      wowFacebookLedger.visibleReactionSnapshot?.postsWithVisibleReactionLabels ===
        wowFacebook.expectedPostsWithVisibleReactions &&
      wowFacebookLedger.visibleReactionSnapshot?.totalVisibleReactions ===
        wowFacebook.expectedTotalVisibleReactions &&
      /not unique people/i.test(
        wowFacebookLedger.visibleReactionSnapshot?.boundary ?? ""
      ) &&
      /stakeholder-group engagement/i.test(
        wowFacebookLedger.visibleReactionSnapshot?.boundary ?? ""
      ) &&
      wowFacebookTractionClaim?.status === "use-with-care" &&
      wowFacebookTractionClaim.antiClaims.some((claim) =>
        /Eighty-eight people engaged/i.test(claim)
      )
    ),
    productSurfaceBoundary: Boolean(
      wowFacebookLedger.separateControls?.lifetimeContentLibraryRows ===
        wowFacebook.expectedContentLibraryRows &&
      /not the denominator/i.test(
        wowFacebookLedger.separateControls?.contentLibraryBoundary ?? ""
      )
    ),
    moduleShape: Boolean(
      wowListFacebookPosts.intakeItems.length === wowFacebook.expectedIntakeCount &&
      wowListFacebookPosts.sources.length === wowFacebook.expectedSourceCount &&
      wowListFacebookPosts.observations.length === wowFacebook.expectedObservationCount &&
      wowListFacebookPosts.claims.length === wowFacebook.expectedClaimCount &&
      wowListFacebookPosts.researchInquiries.length === wowFacebook.expectedInquiryCount
    ),
    graph: Boolean(
      wowFacebookIntakes.every((item) =>
        item?.boundaries.length >= 3 &&
        item.observationIds.every((id) => observationById.has(id)) &&
        item.sourceIds.every((id) => sourceById.has(id)) &&
        item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      wowFacebookObservations.every((observation) =>
        observation?.locator && observation.limitations.length >= 2 &&
        observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      wowFacebookClaims.every((claim) =>
        claim?.boundaries.length >= 2 && claim.antiClaims.length >= 3 &&
        claim.reviewedBy.length >= 2
      ) &&
      wowFacebookInquiries.every((inquiry) =>
        inquiry?.findings.length >= 4 && inquiry.limitations.length >= 4
      )
    ),
    sourceScope: Boolean(
      wowFacebookSourcesBounded &&
      wowFacebookSelectedSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl
      )
    ),
    publisherAndCreditBoundary: Boolean(
      wowFacebookActiveClaim?.status === "confirmed-with-boundary" &&
      wowFacebookActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
        projection.key === "case-study" &&
        projection.surfaces.includes("/work/wowlist") &&
        /operated WOW List's Facebook publishing surface/i.test(projection.text)
      ) &&
      wowFacebookActiveClaim.boundaries.some((boundary) =>
        /Jamie and Richard Album's project/i.test(boundary)
      ) &&
      wowFacebookActiveClaim.antiClaims.some((claim) =>
        /sole lifetime administrator/i.test(claim)
      ) &&
      wowFacebookActiveClaim.antiClaims.some((claim) =>
        /authored every sentence/i.test(claim)
      ) &&
      /Richard Album/.test(wowFacebookLedger.publicSafety?.creditBoundary ?? "")
    ),
    memoryHeld: Boolean(
      wowFacebookMemoryClaim?.status === "use-with-care" &&
      wowFacebookMemoryClaim.evidence.length === 0 &&
      wowFacebookMemoryClaim.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      wowFacebookMemoryClaim.boundaries.some((boundary) =>
        /attributed first-person memory/i.test(boundary)
      )
    ),
    claimSemantics: Boolean(
      wowFacebookPopulationClaim?.antiClaims.some((claim) =>
        /published only 53/i.test(claim)
      ) &&
      wowFacebookDestinationClaim?.boundaries.some((boundary) =>
        /do not establish click-through/i.test(boundary)
      ) &&
      wowFacebookTractionClaim?.boundaries.some((boundary) =>
        /No stakeholder-group engagement count/i.test(boundary)
      )
    ),
    siteProjection: Boolean(
      wowFacebookOccurrence?.claimId === wowFacebook.activeClaimId &&
      wowFacebookOccurrence.projection === "case-study" &&
      !wowFacebookOccurrence.sourceIds &&
      wowFacebookMdx.includes(wowFacebook.activeClaimId) &&
      publicRegistryText.includes(wowFacebook.activeClaimId) &&
      !publicRegistryText.includes("SRC-WOWLIST-FACEBOOK-POST-CENSUS-2026")
    ),
    reportContract: Boolean(
      wowFacebookReport.includes("53 distinct post records") &&
      wowFacebookReport.includes("53 from bottom to top") &&
      wowFacebookReport.includes("Jamie operated WOW List's Facebook publishing surface") &&
      wowFacebookReport.includes("WOW List was Jamie Burkart and Richard Album's project") &&
      wowFacebookReport.includes("did not recover a defensible count of stakeholder-group reactions") &&
      wowFacebookReport.includes("not a native Meta export")
    ),
    redactedLedgerShape: Boolean(
      !wowFacebookRawFieldViolation &&
      wowFacebookRecords.every((record) =>
        Object.keys(record).sort().join("|") ===
          [...wowFacebookRecordKeys].sort().join("|") &&
        typeof record.routeLabel === "string" && record.routeLabel.length > 5
      )
    ),
    publicSafety: Boolean(
      !wowFacebookPrivatePathViolation &&
      !wowFacebookPersonalDataViolation &&
      !/(?:rawPostText|rawText|commentText|participantProfiles|managerToken|authenticationState)/.test(
        wowFacebookLedgerText
      )
    )
  };
  const wowlistFacebookPostPopulationComplete = Object.values(
    wowFacebookDiagnostics
  ).every(Boolean);
  const nycacFacebook = suite.pilot.nycacFacebookPosts;
  const nycacFacebookLedgerPath = path.join(repoRoot, nycacFacebook.ledgerPath);
  const nycacFacebookReportPath = path.join(repoRoot, nycacFacebook.reportPath);
  const nycacFacebookLedgerText = fixtures.nycacFacebookPostLedgerText ??
    (existsSync(nycacFacebookLedgerPath)
      ? readFileSync(nycacFacebookLedgerPath, "utf8")
      : "{}");
  const nycacFacebookLedger = fixtures.nycacFacebookPostLedger ??
    JSON.parse(nycacFacebookLedgerText);
  const nycacFacebookReport = fixtures.nycacFacebookPostReport ??
    (existsSync(nycacFacebookReportPath)
      ? readFileSync(nycacFacebookReportPath, "utf8")
      : "");
  const nycacFacebookIntakes = nycacFacebookPosts.intakeItems.map((item) =>
    intakeById.get(item.id)
  );
  const nycacFacebookNewSources = nycacFacebookPosts.sources.map((source) =>
    sourceById.get(source.id)
  );
  const nycacFacebookObservations = nycacFacebookPosts.observations.map((observation) =>
    observationById.get(observation.id)
  );
  const nycacFacebookClaims = nycacFacebook.claimIds.map((id) => claimById.get(id));
  const nycacFacebookInquiries = nycacFacebook.inquiryIds.map((id) => inquiryById.get(id));
  const nycacFacebookSelectedSources = nycacFacebook.selectedPublicSourceIds.map((id) =>
    sourceById.get(id)
  );
  const nycacFacebookMemoryClaim = claimById.get(nycacFacebook.heldMemoryClaimId);
  const nycacFacebookPopulationClaim = claimById.get(
    "CLM-NYCAC-FACEBOOK-POPULATION-RECONCILIATION"
  );
  const nycacFacebookOperatingClaim = claimById.get(
    "CLM-NYCAC-FACEBOOK-PUBLISHING-OPERATING-SURFACE"
  );
  const nycacFacebookDestinationClaim = claimById.get(
    "CLM-NYCAC-FACEBOOK-DESTINATION-NETWORK"
  );
  const nycacFacebookTractionClaim = claimById.get(
    "CLM-NYCAC-FACEBOOK-TRACTION-SNAPSHOT"
  );
  const publicChronologyRecords = Array.isArray(
    nycacFacebookLedger.publicChronologyDispositions
  ) ? nycacFacebookLedger.publicChronologyDispositions : [];
  const nativeFacebookRecords = Array.isArray(nycacFacebookLedger.nativePostDispositions)
    ? nycacFacebookLedger.nativePostDispositions
    : [];
  const facebookDestinations = Array.isArray(
    nycacFacebookLedger.postedDestinationInventory?.publicSafeDestinations
  ) ? nycacFacebookLedger.postedDestinationInventory.publicSafeDestinations : [];
  const publicRecordKeys = ["id", "surfaceSlot", "primaryTheme", "routeClass"];
  const nativeRecordKeys = [
    "id",
    "postId",
    "publishedAt",
    "postType",
    "primaryTheme",
    "postedPublicUrlCount",
    "permalink"
  ];
  const destinationKeys = ["url", "occurrences", "kind"];
  const recordHasExactKeys = (record, keys) =>
    Object.keys(record).sort().join("|") === [...keys].sort().join("|");
  const publicFacebookThemeCounts = publicChronologyRecords.reduce((counts, record) => {
    counts[record.primaryTheme] = (counts[record.primaryTheme] ?? 0) + 1;
    return counts;
  }, {});
  const nativeFacebookThemeCounts = nativeFacebookRecords.reduce((counts, record) => {
    counts[record.primaryTheme] = (counts[record.primaryTheme] ?? 0) + 1;
    return counts;
  }, {});
  const nativeFacebookYearCounts = nativeFacebookRecords.reduce((counts, record) => {
    const year = String(record.publishedAt).slice(0, 4);
    counts[year] = (counts[year] ?? 0) + 1;
    return counts;
  }, {});
  const nativeFacebookTypeCounts = nativeFacebookRecords.reduce((counts, record) => {
    counts[record.postType] = (counts[record.postType] ?? 0) + 1;
    return counts;
  }, {});
  const nativeFacebookPostIds = new Set(nativeFacebookRecords.map((record) => record.postId));
  const nativeFacebookRecordIds = new Set(nativeFacebookRecords.map((record) => record.id));
  const publicFacebookRecordIds = new Set(publicChronologyRecords.map((record) => record.id));
  const publicFacebookSlots = new Set(
    publicChronologyRecords.map((record) => record.surfaceSlot)
  );
  const uniqueFacebookDestinations = new Set(
    facebookDestinations.map((destination) => destination.url)
  );
  const destinationOccurrenceTotal = facebookDestinations.reduce(
    (total, destination) => total + destination.occurrences,
    0
  );
  const nycacFacebookPublicText = [
    nycacFacebookLedgerText,
    nycacFacebookReport,
    JSON.stringify(nycacFacebookPosts)
  ].join("\n");
  const nycacFacebookPrivatePathViolation =
    /(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(
      nycacFacebookPublicText
    );
  const nycacFacebookPersonalDataViolation =
    /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(
      nycacFacebookPublicText
    );
  const destinationSensitiveRouteViolation = facebookDestinations.some((destination) =>
    /(?:docs\.google\.com|drive\.google\.com|zoom\.us|venmo\.com|paypal)/i.test(
      destination.url
    )
  );
  const nycacFacebookDiagnostics = {
    ledgerDigest: sha256(nycacFacebookLedgerText) ===
      nycacFacebook.expectedLedgerDigestSha256,
    moduleShape: Boolean(
      nycacFacebookPosts.intakeItems.length === nycacFacebook.expectedIntakeCount &&
      nycacFacebookPosts.sources.length === nycacFacebook.expectedSourceCount &&
      nycacFacebookPosts.observations.length === nycacFacebook.expectedObservationCount &&
      nycacFacebookPosts.claims.length === nycacFacebook.expectedClaimCount &&
      nycacFacebookPosts.researchInquiries.length === nycacFacebook.expectedInquiryCount
    ),
    publicPopulation: Boolean(
      nycacFacebookLedger.controls?.publicChronology?.candidateRecords ===
        nycacFacebook.expectedPublicCandidateRecords &&
      nycacFacebookLedger.controls?.publicChronology?.distinctNormalizedRecords ===
        nycacFacebook.expectedPublicNormalizedRecords &&
      nycacFacebookLedger.controls?.publicChronology?.distinctContentSignatures ===
        nycacFacebook.expectedPublicContentSignatures &&
      nycacFacebookLedger.controls?.publicChronology?.forwardScrollSteps ===
        nycacFacebook.expectedPublicForwardSteps &&
      nycacFacebookLedger.controls?.publicChronology?.terminalConfirmations ===
        nycacFacebook.expectedPublicTerminalConfirmations &&
      nycacFacebookLedger.controls?.publicChronology?.reverseControl ===
        "failed-to-rehydrate-older-cards" &&
      /not an exact lifetime post count/i.test(
        nycacFacebookLedger.controls?.publicChronology?.boundary ?? ""
      ) &&
      publicChronologyRecords.length === nycacFacebook.expectedPublicContentSignatures &&
      publicFacebookRecordIds.size === nycacFacebook.expectedPublicContentSignatures &&
      publicFacebookSlots.size === nycacFacebook.expectedPublicContentSignatures &&
      publicFacebookSlots.has(1) &&
      publicFacebookSlots.has(nycacFacebook.expectedPublicContentSignatures)
    ),
    nativePopulation: Boolean(
      nycacFacebookLedger.controls?.nativeAnnualExports?.exactUniquePostIds ===
        nycacFacebook.expectedNativePosts &&
      nativeFacebookRecords.length === nycacFacebook.expectedNativePosts &&
      nativeFacebookPostIds.size === nycacFacebook.expectedNativePosts &&
      nativeFacebookRecordIds.size === nycacFacebook.expectedNativePosts &&
      numericRecordEquals(nativeFacebookYearCounts, nycacFacebook.expectedNativeYearCounts) &&
      numericRecordEquals(nativeFacebookTypeCounts, nycacFacebook.expectedPostTypeCounts) &&
      nativeFacebookRecords.every((record) => {
        try {
          const parsed = new URL(record.permalink);
          return parsed.protocol === "https:" &&
            parsed.hostname === "facebook.com" &&
            (
              parsed.pathname.startsWith("/nycartc/posts/") ||
              parsed.pathname.startsWith("/nycartc/videos/") ||
              parsed.pathname === "/photo.php"
            ) &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00$/.test(record.publishedAt);
        } catch {
          return false;
        }
      })
    ),
    overlapBoundary: Boolean(
      /overlap/i.test(nycacFacebookLedger.controls?.reconciliation ?? "") &&
      /never be added together/i.test(
        nycacFacebookLedger.controls?.reconciliation ?? ""
      ) &&
      nycacFacebookPopulationClaim?.antiClaims.some((claim) =>
        /598 posts/i.test(claim)
      ) &&
      nycacFacebookPopulationClaim.antiClaims.some((claim) =>
        /exactly 413 lifetime posts/i.test(claim)
      )
    ),
    productSurfaceDrift: Boolean(
      /March 31, 2019/i.test(
        nycacFacebookLedger.controls?.nativeAnnualExports?.productSurfaceDisagreement ?? ""
      ) &&
      /February 6, 2019/i.test(
        nycacFacebookLedger.controls?.nativeAnnualExports?.productSurfaceDisagreement ?? ""
      ) &&
      nycacFacebookReport.includes("failed control")
    ),
    recordShapes: Boolean(
      publicChronologyRecords.every((record) => recordHasExactKeys(record, publicRecordKeys)) &&
      nativeFacebookRecords.every((record) => recordHasExactKeys(record, nativeRecordKeys)) &&
      facebookDestinations.every((record) => recordHasExactKeys(record, destinationKeys))
    ),
    themeDisposition: Boolean(
      numericRecordEquals(
        publicFacebookThemeCounts,
        nycacFacebook.expectedPublicThemeCounts
      ) &&
      numericRecordEquals(
        nativeFacebookThemeCounts,
        nycacFacebook.expectedNativeThemeCounts
      ) &&
      Object.values(publicFacebookThemeCounts).reduce((sum, value) => sum + value, 0) ===
        nycacFacebook.expectedPublicContentSignatures &&
      Object.values(nativeFacebookThemeCounts).reduce((sum, value) => sum + value, 0) ===
        nycacFacebook.expectedNativePosts
    ),
    destinationInventory: Boolean(
      nycacFacebookLedger.postedDestinationInventory?.publicSafeOccurrences ===
        nycacFacebook.expectedDestinationOccurrences &&
      nycacFacebookLedger.postedDestinationInventory?.publicSafeUniqueDestinations ===
        nycacFacebook.expectedUniqueDestinations &&
      destinationOccurrenceTotal === nycacFacebook.expectedDestinationOccurrences &&
      facebookDestinations.length === nycacFacebook.expectedUniqueDestinations &&
      uniqueFacebookDestinations.size === nycacFacebook.expectedUniqueDestinations &&
      facebookDestinations.every((destination) => {
        try {
          return new URL(destination.url).protocol === "https:" &&
            Number.isInteger(destination.occurrences) && destination.occurrences > 0;
        } catch {
          return false;
        }
      }) &&
      !destinationSensitiveRouteViolation &&
      /not authorship, endorsement, readership/i.test(
        nycacFacebookLedger.postedDestinationInventory?.boundary ?? ""
      )
    ),
    protectedRouteClasses: Boolean(
      nycacFacebookLedger.postedDestinationInventory?.withheldOccurrencesByClass?.[
        "protected-working-document"
      ] === 6 &&
      nycacFacebookLedger.postedDestinationInventory?.withheldOccurrencesByClass?.[
        "protected-meeting-route"
      ] === 3 &&
      nycacFacebookLedger.postedDestinationInventory?.withheldOccurrencesByClass?.[
        "protected-financial-route"
      ] === 2 &&
      nycacFacebookLedger.postedDestinationInventory?.withheldOccurrencesByClass?.[
        "withheld-participant-or-profile-route"
      ] === 2
    ),
    metricBoundary: Boolean(
      numericRecordEquals(
        {
          reactions: nycacFacebookLedger.controls?.nativeAnnualExports?.lifetimeMetricSnapshot?.reactions,
          comments: nycacFacebookLedger.controls?.nativeAnnualExports?.lifetimeMetricSnapshot?.comments,
          shares: nycacFacebookLedger.controls?.nativeAnnualExports?.lifetimeMetricSnapshot?.shares
        },
        nycacFacebook.expectedLifetimeMetrics
      ) &&
      /not unique people/i.test(
        nycacFacebookLedger.controls?.nativeAnnualExports?.lifetimeMetricSnapshot?.boundary ?? ""
      ) &&
      /stakeholder-group counts/i.test(
        nycacFacebookLedger.controls?.nativeAnnualExports?.lifetimeMetricSnapshot?.boundary ?? ""
      ) &&
      nycacFacebookTractionClaim?.status === "use-with-care" &&
      nycacFacebookTractionClaim.antiClaims.some((claim) =>
        /1,378 people engaged/i.test(claim)
      )
    ),
    graph: Boolean(
      nycacFacebookIntakes.every((item) =>
        item?.boundaries.length >= 4 &&
        item.observationIds.every((id) => observationById.has(id)) &&
        item.sourceIds.every((id) => sourceById.has(id)) &&
        item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      nycacFacebookObservations.every((observation) =>
        observation?.locator && observation.limitations.length >= 2 &&
        observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      nycacFacebookClaims.every((claim) =>
        claim?.boundaries.length >= 2 && claim.antiClaims.length >= 4 &&
        claim.reviewedBy.length >= 2
      ) &&
      nycacFacebookInquiries.every((inquiry) =>
        inquiry?.findings.length >= 4 && inquiry.limitations.length >= 4 &&
        inquiry.sourceIds.every((id) => sourceById.has(id))
      )
    ),
    sourceScope: Boolean(
      nycacFacebookNewSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      nycacFacebookSelectedSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl &&
        source.supportsGenerally.length && source.doesNotEstablish.length
      )
    ),
    collectiveCreditAndMemory: Boolean(
      nycacFacebookMemoryClaim?.status === "use-with-care" &&
      nycacFacebookMemoryClaim.evidence.length === 0 &&
      nycacFacebookMemoryClaim.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      nycacFacebookMemoryClaim.boundaries.some((boundary) =>
        /native export does not identify/i.test(boundary)
      ) &&
      /other coalition members also published/i.test(
        nycacFacebookLedger.authorshipAndCredit?.userMemory ?? ""
      ) &&
      /collective work/i.test(
        nycacFacebookLedger.publicSafety?.creditBoundary ?? ""
      ) &&
      nycacFacebookOperatingClaim?.antiClaims.some((claim) =>
        /Every tagged official reciprocally engaged/i.test(claim)
      )
    ),
    routeAndStakeholderBoundary: Boolean(
      nycacFacebookDestinationClaim?.antiClaims.some((claim) =>
        /reciprocal/i.test(claim)
      ) &&
      /Project-authored mentions of public officials\s+are not counted as engagement/i.test(
        nycacFacebookReport
      ) &&
      /No defensible count of reciprocal engagement by key stakeholder groups was\s+recovered/i.test(
        nycacFacebookReport
      )
    ),
    deliberateComposition: Boolean(
      nycacFacebookClaims
        .filter((claim) => claim?.id !== nycacFacebook.heldMemoryClaimId)
        .every((claim) =>
          claim?.projections.every((projection) =>
            projection.key === "archive-note" &&
            projection.surfaces.every((surface) => surface === nycacFacebook.reportPath)
          )
        ) &&
      nycacFacebookReport.includes("No new claim was added to the visible portfolio")
    ),
    reportContract: Boolean(
      nycacFacebookReport.includes("413 conservative content") &&
      nycacFacebookReport.includes("185 exact unique Page") &&
      nycacFacebookReport.includes("must never be added") &&
      nycacFacebookReport.includes("failed control") &&
      nycacFacebookReport.includes("1,006 reactions") &&
      nycacFacebookReport.includes("Jamie's role and collective credit")
    ),
    publicSafety: Boolean(
      !nycacFacebookPrivatePathViolation &&
      !nycacFacebookPersonalDataViolation &&
      !destinationSensitiveRouteViolation &&
      nycacFacebookLedger.publicSafety?.excluded?.includes("raw captions and descriptions") &&
      nycacFacebookLedger.publicSafety?.excluded?.includes(
        "per-post reach, click, and engagement metrics"
      )
    )
  };
  const nycacFacebookPostPopulationComplete = Object.values(
    nycacFacebookDiagnostics
  ).every(Boolean);
  const kcSpacesFacebook = suite.pilot.kcSpacesFundFacebookPosts;
  const kcSpacesFacebookLedgerPath = path.join(repoRoot, kcSpacesFacebook.ledgerPath);
  const kcSpacesFacebookReportPath = path.join(repoRoot, kcSpacesFacebook.reportPath);
  const kcSpacesFacebookLedgerText = fixtures.kcSpacesFundFacebookPostLedgerText ??
    (existsSync(kcSpacesFacebookLedgerPath)
      ? readFileSync(kcSpacesFacebookLedgerPath, "utf8")
      : "{}");
  const kcSpacesFacebookLedger = fixtures.kcSpacesFundFacebookPostLedger ??
    JSON.parse(kcSpacesFacebookLedgerText);
  const kcSpacesFacebookReport = fixtures.kcSpacesFundFacebookPostReport ??
    (existsSync(kcSpacesFacebookReportPath)
      ? readFileSync(kcSpacesFacebookReportPath, "utf8")
      : "");
  const kcSpacesFacebookIntakes = kcSpacesFundFacebookPosts.intakeItems.map((item) =>
    intakeById.get(item.id)
  );
  const kcSpacesFacebookSources = kcSpacesFundFacebookPosts.sources.map((source) =>
    sourceById.get(source.id)
  );
  const kcSpacesFacebookObservations = kcSpacesFundFacebookPosts.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const kcSpacesFacebookClaims = kcSpacesFacebook.claimIds.map((id) => claimById.get(id));
  const kcSpacesFacebookInquiries = kcSpacesFacebook.inquiryIds.map((id) =>
    inquiryById.get(id)
  );
  const kcSpacesFacebookSelectedSources = kcSpacesFacebook.selectedPublicSourceIds.map(
    (id) => sourceById.get(id)
  );
  const kcSpacesFacebookMemoryClaim = claimById.get(
    kcSpacesFacebook.heldMemoryClaimId
  );
  const kcSpacesFacebookPopulationClaim = claimById.get(
    "CLM-KCSPACES-FACEBOOK-SURVIVING-POST-POPULATION"
  );
  const kcSpacesFacebookResponseClaim = claimById.get(
    "CLM-KCSPACES-FACEBOOK-INSTITUTIONAL-RESPONSE-SIGNALS"
  );
  const kcSpacesFacebookTractionClaim = claimById.get(
    "CLM-KCSPACES-FACEBOOK-VISIBLE-TRACTION-SNAPSHOT"
  );
  const kcSpacesFacebookRecords = Array.isArray(kcSpacesFacebookLedger.records)
    ? kcSpacesFacebookLedger.records
    : [];
  const kcSpacesFacebookRecordKeys = [
    "id",
    "timelineSlot",
    "publishedAt",
    "primaryTheme",
    "routeLabel",
    "contentAvailability"
  ];
  const kcSpacesFacebookRecordIds = new Set(
    kcSpacesFacebookRecords.map((record) => record.id)
  );
  const kcSpacesFacebookRecordSlots = new Set(
    kcSpacesFacebookRecords.map((record) => record.timelineSlot)
  );
  const kcSpacesFacebookThemeCounts = kcSpacesFacebookRecords.reduce(
    (counts, record) => {
      counts[record.primaryTheme] = (counts[record.primaryTheme] ?? 0) + 1;
      return counts;
    },
    {}
  );
  const kcSpacesFacebookDestinations =
    kcSpacesFacebookLedger.destinationInventory?.canonicalDestinations ?? [];
  const kcSpacesFacebookPublicText = [
    kcSpacesFacebookLedgerText,
    kcSpacesFacebookReport,
    JSON.stringify(kcSpacesFundFacebookPosts)
  ].join("\n");
  const kcSpacesFacebookPrivatePathViolation =
    /(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(
      kcSpacesFacebookPublicText
    );
  const kcSpacesFacebookPersonalDataViolation =
    /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(
      kcSpacesFacebookPublicText
    );
  const kcSpacesFacebookRawFieldViolation = kcSpacesFacebookRecords.some((record) =>
    Object.keys(record).some((key) => !kcSpacesFacebookRecordKeys.includes(key))
  );
  const kcSpacesFacebookThemeContract = Object.entries(
    kcSpacesFacebook.expectedThemeCounts
  ).every(([theme, expected]) => kcSpacesFacebookThemeCounts[theme] === expected);
  const kcSpacesFacebookDiagnostics = {
    population: Boolean(
      kcSpacesFacebookLedger.population?.distinctSurvivingPosts ===
        kcSpacesFacebook.expectedDistinctPosts &&
      kcSpacesFacebookLedger.population?.earliestObserved ===
        kcSpacesFacebook.expectedEarliestObserved &&
      kcSpacesFacebookLedger.population?.latestObserved ===
        kcSpacesFacebook.expectedLatestObserved &&
      kcSpacesFacebookLedger.population?.independentPasses ===
        kcSpacesFacebook.expectedIndependentPasses &&
      kcSpacesFacebookLedger.population?.terminalNoNewContentConfirmations ===
        kcSpacesFacebook.expectedTerminalConfirmations &&
      /not a native Meta export or deletion history/i.test(
        kcSpacesFacebookLedger.population?.boundary ?? ""
      ) &&
      kcSpacesFacebookRecords.length === kcSpacesFacebook.expectedDistinctPosts &&
      kcSpacesFacebookRecordIds.size === kcSpacesFacebook.expectedDistinctPosts &&
      kcSpacesFacebookRecordSlots.size === kcSpacesFacebook.expectedDistinctPosts &&
      kcSpacesFacebookRecords.every(
        (record, index) => record.timelineSlot === index + 1
      ) &&
      kcSpacesFundFacebookPostAudit.distinctSurvivingPosts ===
        kcSpacesFacebook.expectedDistinctPosts
    ),
    recoveryBoundary: Boolean(
      kcSpacesFacebookLedger.recovery?.postsWithStableAttachmentIds ===
        kcSpacesFacebook.expectedStableAttachmentIds &&
      kcSpacesFacebookLedger.recovery?.recordsWithUnavailableSharedContent ===
        kcSpacesFacebook.expectedUnavailableSharedContent &&
      /not archival identifiers/i.test(
        kcSpacesFacebookLedger.recovery?.boundary ?? ""
      ) &&
      kcSpacesFacebookRecords.filter(
        (record) => record.contentAvailability !== "visible"
      ).length === kcSpacesFacebook.expectedUnavailableSharedContent
    ),
    themeDisposition: Boolean(
      kcSpacesFacebookThemeContract &&
      Object.values(kcSpacesFacebookThemeCounts).reduce(
        (sum, value) => sum + value,
        0
      ) === kcSpacesFacebook.expectedDistinctPosts
    ),
    destinationInventory: Boolean(
      kcSpacesFacebookDestinations.length ===
        kcSpacesFacebook.expectedUniqueDestinations &&
      new Set(kcSpacesFacebookDestinations).size ===
        kcSpacesFacebook.expectedUniqueDestinations &&
      kcSpacesFacebookDestinations.every((url) => {
        try {
          return /^https?:$/.test(new URL(url).protocol);
        } catch {
          return false;
        }
      }) &&
      /not click-through/i.test(
        kcSpacesFacebookLedger.destinationInventory?.boundary ?? ""
      )
    ),
    responseBoundary: Boolean(
      kcSpacesFacebookLedger.institutionalResponseSignals?.count ===
        kcSpacesFacebook.expectedInstitutionalResponseSignals &&
      kcSpacesFacebookLedger.institutionalResponseSignals?.organizations?.length ===
        kcSpacesFacebook.expectedInstitutionalResponseSignals &&
      /not a complete stakeholder census/i.test(
        kcSpacesFacebookLedger.institutionalResponseSignals?.boundary ?? ""
      ) &&
      kcSpacesFacebookResponseClaim?.status === "use-with-care" &&
      kcSpacesFacebookResponseClaim.antiClaims.some((claim) =>
        /Only three organizations engaged/i.test(claim)
      )
    ),
    tractionBoundary: Boolean(
      kcSpacesFacebookLedger.visibleReactionSnapshot?.postsWithVisibleReactionLabels ===
        kcSpacesFacebook.expectedPostsWithVisibleReactions &&
      kcSpacesFacebookLedger.visibleReactionSnapshot?.totalVisibleReactions ===
        kcSpacesFacebook.expectedTotalVisibleReactions &&
      numericRecordEquals(
        kcSpacesFacebookLedger.visibleReactionSnapshot?.reactionKinds,
        kcSpacesFacebook.expectedReactionKinds
      ) &&
      /not unique people/i.test(
        kcSpacesFacebookLedger.visibleReactionSnapshot?.boundary ?? ""
      ) &&
      /stakeholder-group engagement/i.test(
        kcSpacesFacebookLedger.visibleReactionSnapshot?.boundary ?? ""
      ) &&
      kcSpacesFacebookTractionClaim?.status === "use-with-care" &&
      kcSpacesFacebookTractionClaim.antiClaims.some((claim) =>
        /One hundred fifteen people engaged/i.test(claim)
      )
    ),
    moduleShapeAndGraph: Boolean(
      kcSpacesFundFacebookPosts.intakeItems.length ===
        kcSpacesFacebook.expectedIntakeCount &&
      kcSpacesFundFacebookPosts.sources.length ===
        kcSpacesFacebook.expectedSourceCount &&
      kcSpacesFundFacebookPosts.observations.length ===
        kcSpacesFacebook.expectedObservationCount &&
      kcSpacesFundFacebookPosts.claims.length ===
        kcSpacesFacebook.expectedClaimCount &&
      kcSpacesFundFacebookPosts.researchInquiries.length ===
        kcSpacesFacebook.expectedInquiryCount &&
      kcSpacesFacebookIntakes.every((item) =>
        item?.boundaries.length >= 3 &&
        item.observationIds.every((id) => observationById.has(id)) &&
        item.sourceIds.every((id) => sourceById.has(id)) &&
        item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      kcSpacesFacebookObservations.every((observation) =>
        observation?.limitations.length >= 2 &&
        observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      kcSpacesFacebookClaims.every((claim) =>
        claim?.boundaries.length >= 2 && claim.antiClaims.length >= 3 &&
        claim.reviewedBy.length >= 2
      ) &&
      kcSpacesFacebookInquiries.every((inquiry) =>
        inquiry?.findings.length >= 4 && inquiry.limitations.length >= 4 &&
        inquiry.sourceIds.every((id) => sourceById.has(id))
      )
    ),
    sourceScope: Boolean(
      kcSpacesFacebookSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      kcSpacesFacebookSelectedSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl &&
        source.supportsGenerally.length && source.doesNotEstablish.length
      )
    ),
    roleAndCollectiveCredit: Boolean(
      /does not identify individual publishers/i.test(
        kcSpacesFacebookLedger.authorshipAndCredit?.pagePublisherFinding ?? ""
      ) &&
      /must not attribute Page posting, account ownership, stakeholder status, grant decisions/i.test(
        kcSpacesFacebookLedger.authorshipAndCredit?.jamieRoleBoundary ?? ""
      ) &&
      /Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo/i.test(
        kcSpacesFacebookLedger.authorshipAndCredit?.collectiveCredit ?? ""
      ) &&
      kcSpacesFacebookClaims.every((claim) =>
        claim?.antiClaims.some((antiClaim) =>
          /Jamie|stakeholder|impact|lifetime|people|organizations/i.test(antiClaim)
        )
      )
    ),
    memoryHeld: Boolean(
      kcSpacesFacebookMemoryClaim?.status === "use-with-care" &&
      kcSpacesFacebookMemoryClaim.evidence.length === 0 &&
      kcSpacesFacebookMemoryClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      kcSpacesFacebookMemoryClaim.boundaries.some((boundary) =>
        /attributed first-person memory/i.test(boundary)
      ) &&
      /pending registration history or collaborator corroboration/i.test(
        kcSpacesFacebookLedger.authorshipAndCredit?.nameMemory ?? ""
      )
    ),
    deliberateComposition: Boolean(
      kcSpacesFacebookClaims
        .filter((claim) => claim?.id !== kcSpacesFacebook.heldMemoryClaimId)
        .every((claim) =>
          claim?.projections.every((projection) =>
            projection.key === "archive-note" &&
            projection.surfaces.every(
              (surface) => surface === kcSpacesFacebook.reportPath
            )
          )
        ) &&
      kcSpacesFacebookReport.includes("No new visible portfolio sentence is forced") &&
      kcSpacesFacebookClaims.every(
        (claim) => !publicRegistryText.includes(claim?.id ?? "")
      )
    ),
    reportContract: Boolean(
      kcSpacesFacebookReport.includes("35 distinct posts") &&
      kcSpacesFacebookReport.includes("not a native Meta export or deletion history") &&
      kcSpacesFacebookReport.includes("at least 11 named recipient or grantee highlights") &&
      kcSpacesFacebookReport.includes("three named arts organizations or spaces") &&
      kcSpacesFacebookReport.includes("does not identify its individual publishers") &&
      kcSpacesFacebookReport.includes("attributed research lead")
    ),
    redactedLedgerShape: Boolean(
      !kcSpacesFacebookRawFieldViolation &&
      kcSpacesFacebookRecords.every((record) =>
        Object.keys(record).sort().join("|") ===
          [...kcSpacesFacebookRecordKeys].sort().join("|") &&
        typeof record.routeLabel === "string" && record.routeLabel.length > 5
      )
    ),
    publicSafety: Boolean(
      !kcSpacesFacebookPrivatePathViolation &&
      !kcSpacesFacebookPersonalDataViolation &&
      !/(?:rawPostText|rawText|commentText|participantProfiles|managerToken|authenticationState)/.test(
        kcSpacesFacebookLedgerText
      ) &&
      kcSpacesFacebookLedger.publicSafety?.excluded?.includes(
        "raw post and comment text"
      )
    ),
    populationSemantics: Boolean(
      kcSpacesFacebookPopulationClaim?.antiClaims.some((claim) =>
        /published only 35/i.test(claim)
      )
    )
  };
  const kcSpacesFundFacebookPostPopulationComplete = Object.values(
    kcSpacesFacebookDiagnostics
  ).every(Boolean);
  const personalFacebook = suite.pilot.jamiePersonalFacebookPosts;
  const personalFacebookControlsPath = path.join(
    repoRoot,
    personalFacebook.controlsPath
  );
  const personalFacebookReportPath = path.join(
    repoRoot,
    personalFacebook.reportPath
  );
  const personalFacebookControlsText =
    fixtures.jamiePersonalFacebookPostControlsText ??
    (existsSync(personalFacebookControlsPath)
      ? readFileSync(personalFacebookControlsPath, "utf8")
      : "{}");
  const personalFacebookControls =
    fixtures.jamiePersonalFacebookPostControls ??
    JSON.parse(personalFacebookControlsText);
  const personalFacebookReport =
    fixtures.jamiePersonalFacebookPostReport ??
    (existsSync(personalFacebookReportPath)
      ? readFileSync(personalFacebookReportPath, "utf8")
      : "");
  const personalFacebookIntakes = jamiePersonalFacebookPosts.intakeItems.map(
    (item) => intakeById.get(item.id)
  );
  const personalFacebookSources = jamiePersonalFacebookPosts.sources.map(
    (source) => sourceById.get(source.id)
  );
  const personalFacebookObservations =
    jamiePersonalFacebookPosts.observations.map((observation) =>
      observationById.get(observation.id)
    );
  const personalFacebookClaims = personalFacebook.claimIds.map((id) =>
    claimById.get(id)
  );
  const personalFacebookInquiries = personalFacebook.inquiryIds.map((id) =>
    inquiryById.get(id)
  );
  const personalFacebookSelectedSources =
    personalFacebook.selectedPublicSourceIds.map((id) => sourceById.get(id));
  const personalFacebookPublicPostSources =
    personalFacebookSelectedSources.filter(
      (source) => source?.kind === "public-social-post"
    );
  const personalFacebookPopulationClaim = claimById.get(
    "CLM-FB-JAMIE-POST-POPULATION-2026"
  );
  const personalFacebookMissionClaim = claimById.get(
    "CLM-FB-JAMIE-MISSION-ROUTING-PRACTICE"
  );
  const personalFacebookUrlClaim = claimById.get(
    "CLM-FB-JAMIE-POSTED-URL-ROUTING-2026"
  );
  const personalFacebookStakeholderClaim = claimById.get(
    "CLM-FB-JAMIE-STAKEHOLDER-MENTION-PATTERN-2026"
  );
  const personalFacebookTractionClaim = claimById.get(
    "CLM-FB-JAMIE-SELECTED-PUBLIC-INTERACTION-SNAPSHOT-2026"
  );
  const personalFacebookActionClaim = claimById.get(
    "CLM-FB-JAMIE-PROJECT-ACTION-ROUTING"
  );
  const personalFacebookCouncilStatClaim = claimById.get(
    personalFacebook.heldClaimId
  );
  const personalFacebookYearTotal = Object.values(
    personalFacebookControls.recordsByYear ?? {}
  ).reduce((sum, value) => sum + value, 0);
  const personalFacebookFormTotal = Object.values(
    personalFacebookControls.recordForms ?? {}
  ).reduce((sum, value) => sum + value, 0);
  const personalFacebookAudienceTotal = [
    personalFacebookControls.audienceLabels?.public,
    personalFacebookControls.audienceLabels?.onlyMe,
    personalFacebookControls.audienceLabels?.friends,
    personalFacebookControls.audienceLabels?.notExposedInCrawl
  ].reduce((sum, value) => sum + (value ?? 0), 0);
  const personalFacebookSelectedControls =
    personalFacebookControls.selectedPublicSourceControls ?? [];
  const personalFacebookPublicText = [
    personalFacebookControlsText,
    personalFacebookReport,
    JSON.stringify(jamiePersonalFacebookPosts)
  ].join("\n");
  const personalFacebookPrivatePathViolation =
    /(?:\/(?:Users|Volumes|private\/tmp)\/|GoogleDrive-|Mobile Documents)/.test(
      personalFacebookPublicText
    );
  const personalFacebookContactViolation =
    /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b)/i.test(
      personalFacebookPublicText
    );
  const personalFacebookDiagnostics = {
    population: Boolean(
      personalFacebookControls.populationDefinition ===
        jamiePersonalFacebookPostAudit.populationDefinition &&
      personalFacebookControls.populationControl?.cursorPages ===
        personalFacebook.expectedCursorPages &&
      personalFacebookControls.populationControl?.returnedNodes ===
        personalFacebook.expectedReturnedNodes &&
      personalFacebookControls.populationControl?.uniqueRecords ===
        personalFacebook.expectedUniqueRecords &&
      personalFacebookControls.populationControl?.terminalHasNextPage === false &&
      personalFacebookControls.populationControl?.missingDates === 0 &&
      personalFacebookControls.populationControl?.ownerAbsentRecords === 0 &&
      personalFacebookControls.populationControl?.recoveredStart ===
        personalFacebook.expectedRecoveredStart &&
      personalFacebookControls.populationControl?.recoveredEnd ===
        personalFacebook.expectedRecoveredEnd &&
      /not a native Meta export, deletion history, or immutable lifetime population/i.test(
        personalFacebookControls.completenessBoundary ?? ""
      ) &&
      jamiePersonalFacebookPostAudit.uniqueRecords ===
        personalFacebook.expectedUniqueRecords &&
      jamiePersonalFacebookPostAudit.terminalHasNextPage === false
    ),
    audienceBoundary: Boolean(
      numericRecordEquals(
        {
          public: personalFacebookControls.audienceLabels?.public,
          onlyMe: personalFacebookControls.audienceLabels?.onlyMe,
          friends: personalFacebookControls.audienceLabels?.friends,
          notExposedInCrawl:
            personalFacebookControls.audienceLabels?.notExposedInCrawl
        },
        personalFacebook.expectedAudienceLabels
      ) &&
      personalFacebookAudienceTotal === personalFacebook.expectedUniqueRecords &&
      /unknown, not public/i.test(
        personalFacebookControls.audienceLabels?.boundary ?? ""
      ) &&
      personalFacebookPopulationClaim?.antiClaims.some((claim) =>
        /All 1,243 records were public/i.test(claim)
      )
    ),
    yearReconciliation: Boolean(
      numericRecordEquals(
        personalFacebookControls.recordsByYear,
        personalFacebook.expectedRecordsByYear
      ) &&
      personalFacebookYearTotal === personalFacebook.expectedUniqueRecords
    ),
    formReconciliation: Boolean(
      numericRecordEquals(
        personalFacebookControls.recordForms,
        personalFacebook.expectedRecordForms
      ) &&
      personalFacebookFormTotal === personalFacebook.expectedUniqueRecords
    ),
    missionRouting: Boolean(
      personalFacebookControls.missionRouting?.uniqueRecords ===
        personalFacebook.expectedMissionRoutedRecords &&
      numericRecordEquals(
        personalFacebookControls.missionRouting?.projectRecordCounts,
        personalFacebook.expectedProjectRecordCounts
      ) &&
      /Overlapping deterministic research routes/i.test(
        personalFacebookControls.missionRouting?.classificationBoundary ?? ""
      ) &&
      /not exclusive semantic judgments, effort measures, engagement, or impact/i.test(
        personalFacebookControls.missionRouting?.classificationBoundary ?? ""
      ) &&
      personalFacebookMissionClaim?.antiClaims.some((claim) =>
        /summed into a second population/i.test(claim)
      )
    ),
    urlRouting: Boolean(
      personalFacebookControls.postedUrlInventory?.urlBearingRecords ===
        personalFacebook.expectedUrlBearingRecords &&
      personalFacebookControls.postedUrlInventory
        ?.uniqueNormalizedExternalUrls ===
        personalFacebook.expectedUniqueNormalizedExternalUrls &&
      /source lead until independently recovered, close-read, and decomposed/i.test(
        personalFacebookControls.postedUrlInventory?.routingBoundary ?? ""
      ) &&
      personalFacebookUrlClaim?.antiClaims.some((claim) =>
        /549 links are 549 corroborating sources/i.test(claim)
      )
    ),
    stakeholderRouting: Boolean(
      numericRecordEquals(
        personalFacebookControls.stakeholderRouting?.recordCounts,
        personalFacebook.expectedStakeholderRecordCounts
      ) &&
      /not actions by the named stakeholders/i.test(
        personalFacebookControls.stakeholderRouting?.classificationBoundary ?? ""
      ) &&
      /not evidence of engagement/i.test(
        personalFacebookControls.stakeholderRouting?.classificationBoundary ?? ""
      ) &&
      personalFacebookStakeholderClaim?.antiClaims.some((claim) =>
        /Twenty City Council members engaged/i.test(claim)
      ) &&
      personalFacebookStakeholderClaim?.antiClaims.some((claim) =>
        /Rafael Espinal engaged 18 times/i.test(claim)
      )
    ),
    moduleShapeAndGraph: Boolean(
      jamiePersonalFacebookPosts.intakeItems.length ===
        personalFacebook.expectedIntakeCount &&
      jamiePersonalFacebookPosts.sources.length ===
        personalFacebook.expectedSourceCount &&
      jamiePersonalFacebookPosts.observations.length ===
        personalFacebook.expectedObservationCount &&
      jamiePersonalFacebookPosts.claims.length ===
        personalFacebook.expectedClaimCount &&
      jamiePersonalFacebookPosts.researchInquiries.length ===
        personalFacebook.expectedInquiryCount &&
      personalFacebookIntakes.every(
        (item) =>
          item?.boundaries.length >= 3 &&
          item.sourceIds.every((id) => sourceById.has(id)) &&
          item.observationIds.every((id) => observationById.has(id)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      personalFacebookObservations.every(
        (observation) =>
          observation?.locator &&
          observation.limitations.length >= 2 &&
          observation.claimIds.length > 0 &&
          observation.researchInquiryIds.length > 0
      ) &&
      personalFacebookClaims.every(
        (claim) =>
          claim?.boundaries.length >= 2 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length >= 2
      ) &&
      personalFacebookInquiries.every(
        (inquiry) =>
          inquiry?.findings.length >= 4 &&
          inquiry.limitations.length >= 4 &&
          inquiry.sourceIds.every((id) => sourceById.has(id))
      )
    ),
    sourceScope: Boolean(
      personalFacebookSources.every(
        (source) =>
          source?.supportsGenerally.length > 0 &&
          source.doesNotEstablish.length > 0
      ) &&
      personalFacebookSelectedSources.every(
        (source) =>
          source?.visibility === "public" &&
          source.canonicalUrl &&
          source.supportsGenerally.length > 0 &&
          source.doesNotEstablish.length > 0
      ) &&
      personalFacebookPublicPostSources.length ===
        personalFacebook.expectedPublicPostSourceCount
    ),
    selectedPublicControls: Boolean(
      personalFacebookSelectedControls.length ===
        personalFacebook.expectedPublicPostSourceCount &&
      stringSetEquals(
        personalFacebookSelectedControls.map((item) => item.sourceId),
        personalFacebook.selectedPublicSourceIds.slice(
          0,
          personalFacebook.expectedPublicPostSourceCount
        )
      ) &&
      personalFacebookSelectedControls.every(
        (item) => item.publicAudienceRecheckedAt === "2026-07-15"
      )
    ),
    tractionBoundary: Boolean(
      personalFacebookSelectedControls.find(
        (item) => item.sourceId === "SRC-FB-JAMIE-WOWLIST-NINE-CITIES-2015"
      )?.currentCounters?.likes === 28 &&
      personalFacebookSelectedControls.find(
        (item) => item.sourceId === "SRC-FB-JAMIE-CALLNYC-COUNCILSTAT-JOB-2016"
      )?.currentCounters?.likes === 7 &&
      personalFacebookSelectedControls.find(
        (item) => item.sourceId === "SRC-FB-JAMIE-LETNYCDANCE-NPR-2017"
      )?.currentCounters?.reactions === 24 &&
      personalFacebookSelectedControls.find(
        (item) => item.sourceId === "SRC-FB-JAMIE-KCTOWNHALL-START-2018"
      )?.currentCounters?.reactions === 106 &&
      personalFacebookSelectedControls.find(
        (item) => item.sourceId === "SRC-FB-JAMIE-KCTOWNHALL-START-2018"
      )?.currentCounters?.comments === 14 &&
      /Do not sum them into reach, unique people, stakeholder engagement/i.test(
        personalFacebookControls.engagementBoundary ?? ""
      ) &&
      personalFacebookTractionClaim?.status === "use-with-care" &&
      personalFacebookTractionClaim.antiClaims.some((claim) =>
        /summed into reach/i.test(claim)
      )
    ),
    councilStatBoundary: Boolean(
      personalFacebookCouncilStatClaim?.status === "use-with-care" &&
      personalFacebookCouncilStatClaim.projections.every(
        (projection) =>
          projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      personalFacebookCouncilStatClaim.evidence.some(
        (evidence) =>
          evidence.sourceId ===
            "SRC-NYC-COUNCIL-LABS-CONSTITUENT-SERVICES-2016" &&
          evidence.relationship === "context"
      ) &&
      personalFacebookCouncilStatClaim.antiClaims.some((claim) =>
        /employed by the New York City Council/i.test(claim)
      ) &&
      personalFacebookCouncilStatClaim.antiClaims.some((claim) =>
        /hiring authority/i.test(claim)
      )
    ),
    roleAndCollectiveCredit: Boolean(
      sourceById
        .get("SRC-FB-JAMIE-NTER-OPENING-2010")
        ?.doesNotEstablish.some((item) => /sole authorship/i.test(item)) &&
      sourceById
        .get("SRC-FB-JAMIE-KCTOWNHALL-START-2018")
        ?.supportsGenerally.some((item) => /Julia Fredenburg/i.test(item)) &&
      personalFacebookClaims.every((claim) =>
        claim?.antiClaims.some((antiClaim) =>
          /impact|public|source|engag|sole|exactly|lifetime|Council|city|reach|outcome/i.test(
            antiClaim
          )
        )
      )
    ),
    actionRoutingBoundary: Boolean(
      personalFacebookActionClaim?.status === "confirmed-with-boundary" &&
      personalFacebookActionClaim.evidence.length >= 5 &&
      personalFacebookActionClaim.boundaries.some((boundary) =>
        /does not establish whether readers clicked, joined, called, attended, converted, or caused an outcome/i.test(
          boundary
        )
      ) &&
      personalFacebookActionClaim.antiClaims.some((claim) =>
        /solely authored every project/i.test(claim)
      )
    ),
    deliberateComposition: Boolean(
      personalFacebookClaims.every((claim) =>
        claim?.projections.every((projection) =>
          projection.status === "hold"
            ? projection.surfaces.length === 0
            : projection.key === "archive-note" &&
              projection.surfaces.every(
                (surface) => surface === personalFacebook.reportPath
              )
        )
      ) &&
      personalFacebookReport.includes(
        "No new visible portfolio sentence is forced"
      ) &&
      personalFacebookClaims.every(
        (claim) => !publicRegistryText.includes(claim?.id ?? "")
      )
    ),
    reportContract: Boolean(
      personalFacebookReport.includes("1,243 owner-filtered records") &&
      /not\s+(?:mean\s+)?a\s+native Meta export/i.test(
        personalFacebookReport
      ) &&
      personalFacebookReport.includes("973") &&
      /549 unique normalized\s+external destinations/i.test(
        personalFacebookReport
      ) &&
      personalFacebookReport.includes("outbound") &&
      personalFacebookReport.includes("usable participation route") &&
      personalFacebookReport.includes("No new visible portfolio sentence is forced")
    ),
    publicSafety: Boolean(
      !personalFacebookPrivatePathViolation &&
      !personalFacebookContactViolation &&
      personalFacebookControls.rawPopulation?.status ===
        "protected outside repository" &&
      personalFacebookControls.rawPopulation?.excluded?.includes(
        "raw post and comment text"
      ) &&
      !/(?:rawPostText|rawText|commentText|participantProfiles|managerToken|authenticationState)/.test(
        personalFacebookControlsText
      )
    )
  };
  const jamiePersonalFacebookPostPopulationComplete = Object.values(
    personalFacebookDiagnostics
  ).every(Boolean);
  const participation = suite.pilot.participationInfrastructureProduction;
  const participationIntakes = participation.intakeIds.map((id) => intakeById.get(id));
  const participationSources = participation.sourceIds.map((id) => sourceById.get(id));
  const participationClaims = participation.claimIds.map((id) => claimById.get(id));
  const participationInquiries = participation.inquiryIds.map((id) => inquiryById.get(id));
  const participationObservations = participationInfrastructureProduction.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const participationActiveClaim = claimById.get(participation.activeClaimId);
  const participationHeldClaims = participation.heldClaimIds.map((id) => claimById.get(id));
  const participationNycacClaim = claimById.get(participation.selectedNycacClaimId);
  const participationWowlistPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
  const participationProofCoverage = participation.proofIds.map((id) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === id)
  );
  const participationReportPath = path.join(repoRoot, participation.reportPath);
  const participationReport = fixtures.participationInfrastructureReport ??
    (existsSync(participationReportPath) ? readFileSync(participationReportPath, "utf8") : "");
  const participationInspectionText = JSON.stringify(
    participationInfrastructureProduction
  );
  const participationAssertedText = JSON.stringify({
    observations: participationInfrastructureProduction.observations.map((item) => item.text),
    sourceNotes: participationInfrastructureProduction.sources.map((item) => item.publicNote),
    claims: participationInfrastructureProduction.claims.map((item) => ({
      internalClaim: item.internalClaim,
      projections: item.projections.map((projection) => projection.text)
    })),
    inquiries: participationInfrastructureProduction.researchInquiries.map((item) => ({
      findings: item.findings,
      publicSummary: item.publicSummary
    }))
  });
  const participationProjectionText = participationInfrastructureProduction.claims
    .flatMap((item) => item.projections.map((projection) => projection.text))
    .concat(
      participationNycacClaim?.projections.map((projection) => projection.text) ?? []
    )
    .join("\n");
  const participationAuditExpected = participation.expectedAudit;
  const participationDiagnostics = {
    recordCounts: Boolean(
      participationInfrastructureProduction.intakeItems.length === participation.expectedIntakeCount &&
      participationInfrastructureProduction.observations.length === participation.expectedObservationCount &&
      participationInfrastructureProduction.sources.length === participation.expectedSourceCount &&
      participationInfrastructureProduction.claims.length === participation.expectedClaimCount &&
      participationInfrastructureProduction.researchInquiries.length === participation.expectedInquiryCount &&
      participationIntakes.every(Boolean) &&
      participationObservations.every(Boolean) &&
      participationSources.every(Boolean) &&
      participationClaims.every(Boolean) &&
      participationInquiries.every(Boolean)
    ),
    exactAggregates: Boolean(
      participationInfrastructureAudit.wowlist.earlierUsers === participationAuditExpected.wowlistUsers2016 &&
      participationInfrastructureAudit.wowlist.laterUsers === participationAuditExpected.wowlistUsers2017 &&
      participationInfrastructureAudit.wowlist.earlierPosts === participationAuditExpected.wowlistPosts2016 &&
      participationInfrastructureAudit.wowlist.laterPosts === participationAuditExpected.wowlistPosts2017 &&
      participationInfrastructureAudit.wowlist.geocodedPosts === participationAuditExpected.geocodedPosts &&
      participationInfrastructureAudit.wowlist.qualifyingCityRegionCountryGroups === participationAuditExpected.qualifyingGeographies &&
      participationInfrastructureAudit.wowlist.popularVote.eventRecords === participationAuditExpected.popularVoteEvents &&
      participationInfrastructureAudit.wowlist.popularVote.distinctFollowerAccounts === participationAuditExpected.popularVoteFollowerAccounts &&
      participationInfrastructureAudit.sundayDinner.numberedEventColumns === participationAuditExpected.sundayDinnerNumberedColumns &&
      participationInfrastructureAudit.sundayDinner.sequenceColumns === participationAuditExpected.sundayDinnerSequenceColumns &&
      participationInfrastructureAudit.sundayDinner.allSequenceColumnMarks === participationAuditExpected.sundayDinnerColumnMarks &&
      participationInfrastructureAudit.sundayDinner.workbookMealsServedSummary === participationAuditExpected.sundayDinnerWorkbookSummary &&
      participationInfrastructureAudit.sundayDinner.summaryReconciliationDifference === participationAuditExpected.sundayDinnerDifference &&
      participationInfrastructureAudit.callscript.repositoryCommits === participationAuditExpected.callscriptRepositoryCommits &&
      participationInfrastructureAudit.callscript.eventResponseDisplay === participationAuditExpected.callscriptEventResponseDisplay
    ),
    linkedGraph: Boolean(
      participationIntakes.every(
        (item) => item?.sourceIds.every((id) => sourceById.has(id)) &&
          item.observationIds.every((id) => observationById.has(id)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      participationObservations.every(
        (item) => item?.sourceId && sourceById.has(item.sourceId) &&
          item.limitations.length >= 2 &&
          item.claimIds.every((id) => claimById.has(id)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id))
      ) &&
      participationClaims.every(
        (item) => item?.evidence.every((evidence) => sourceById.has(evidence.sourceId)) &&
          item.boundaries.length >= 2 &&
          item.antiClaims.length >= 3
      ) &&
      participationInquiries.every(
        (item) => item?.sourceIds.every((id) => sourceById.has(id)) &&
          item.findings.length >= 2 &&
          item.limitations.length >= 2
      )
    ),
    sourceScope: Boolean(
      participationSources.every(
        (source) => source?.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      sourceById.get("SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER")?.visibility === "private" &&
      !sourceById.get("SRC-GDRIVE-SUNDAY-DINNER-OPERATING-LEDGER")?.canonicalUrl &&
      sourceById.get("SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026")?.visibility === "public"
    ),
    projectionDiscipline: Boolean(
      participationActiveClaim?.projections.some(
        (projection) => projection.status === "active" && projection.surfaces.includes("/work/wowlist")
      ) &&
      participationHeldClaims.every(
        (claim) => claim?.projections.every(
          (projection) => projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      participationWowlistPage?.sourceOrder.includes("SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026") &&
      participationWowlistPage?.occurrences.some(
        (occurrence) => occurrence.claimId === participation.activeClaimId && occurrence.id === "historical-aggregate-scale"
      ) &&
      wowlistMdx.includes(participation.activeClaimId)
    ),
    listeningWorkflow: Boolean(
      participation.requiredNycacSourceIds.every((id) =>
        participationNycacClaim?.evidence.some((evidence) => evidence.sourceId === id)
      ) &&
      participation.requiredNycacSourceIds.every((id) =>
        fairRentPage?.sourceOrder.includes(id)
      ) &&
      /compliance, grant, insurance, legal, and meeting-access needs/i.test(
        participationNycacClaim?.projections.find((projection) => projection.status === "active")?.text ?? ""
      ) &&
      participationNycacClaim?.boundaries.some((boundary) => /shared[- ]account/i.test(boundary)) &&
      participationNycacClaim?.antiClaims.some((claim) => /sole|alone/i.test(claim))
    ),
    proofCoverage: Boolean(
      participationProofCoverage.every(Boolean) &&
      participationProofCoverage.find((item) => item?.proofId === "wowlist-community-platform")?.status === "source-backed" &&
      participationProofCoverage.find((item) => item?.proofId === "wowlist-community-platform")?.sourceIds.includes("SRC-WOWLIST-DATABASE-AGGREGATE-AUDIT-2026") &&
      participationProofCoverage.find((item) => item?.proofId === "sunday-dinner-196-participation-infrastructure")?.sourceIds.includes("SRC-SUNDAY-DINNER-AGGREGATE-AUDIT-2026") &&
      participation.requiredNycacSourceIds.every((id) =>
        participationProofCoverage.find((item) => item?.proofId === "nyc-artist-coalition-civic-systems")?.sourceIds.includes(id)
      )
    ),
    reportContract: Boolean(
      participationReport.includes("1,846") &&
      participationReport.includes("16,142 posts/events") &&
      participationReport.includes("933") &&
      participationReport.includes("196") &&
      participationReport.includes("2,769") &&
      participationReport.includes("2,783") &&
      participationReport.includes("14") &&
      participationReport.includes("445 people responded") &&
      /not (?:physical )?attendance/i.test(participationReport) &&
      /selective projection/i.test(participationReport)
    ),
    publicSafety: Boolean(
      !/(?:\/Users\/|\/Volumes\/|\/private\/|Google Drive\/|docs\.google\.com\/spreadsheets)/i.test(
        `${participationInspectionText}\n${participationReport}`
      ) &&
      !containsUnsafeAttendanceConversion(participationAssertedText) &&
      !containsNycacSoleCreditClaim(participationProjectionText) &&
      !participationInspectionText.includes("participantProfiles") &&
      !participationInspectionText.includes("rawRows")
    )
  };
  const participationInfrastructureComplete = Object.values(
    participationDiagnostics
  ).every(Boolean);
  const government = suite.pilot.nycacGovernmentInterface;
  const governmentIntakes = government.intakeIds.map((id) => intakeById.get(id));
  const governmentSources = government.sourceIds.map((id) => sourceById.get(id));
  const governmentObservations = nycacGovernmentInterface.observations.map(
    (observation) => observationById.get(observation.id)
  );
  const governmentClaims = government.claimIds.map((id) => claimById.get(id));
  const governmentInquiries = government.inquiryIds.map((id) => inquiryById.get(id));
  const governmentDirectClaim = claimById.get(government.directClaimId);
  const governmentInferenceClaims = government.inferenceClaimIds.map((id) =>
    claimById.get(id)
  );
  const governmentExistingSources = government.requiredExistingSourceIds.map((id) =>
    sourceById.get(id)
  );
  const governmentProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === government.proofId
  );
  const governmentReportPath = path.join(repoRoot, government.reportPath);
  const governmentReport = fixtures.nycacGovernmentInterfaceReport ??
    (existsSync(governmentReportPath) ? readFileSync(governmentReportPath, "utf8") : "");
  const governmentInspectionText = JSON.stringify(nycacGovernmentInterface);
  const governmentProjectionText = nycacGovernmentInterface.claims
    .flatMap((claim) => claim.projections.map((projection) => projection.text))
    .join("\n");
  const governmentTranscriptInquiry = inquiryById.get(
    "INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"
  );
  const governmentValueInquiry = inquiryById.get(
    "INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"
  );
  const governmentDiagnostics = {
    recordCounts: Boolean(
      nycacGovernmentInterface.intakeItems.length === government.expectedIntakeCount &&
      nycacGovernmentInterface.observations.length === government.expectedObservationCount &&
      nycacGovernmentInterface.sources.length === government.expectedSourceCount &&
      nycacGovernmentInterface.claims.length === government.expectedClaimCount &&
      nycacGovernmentInterface.researchInquiries.length === government.expectedInquiryCount &&
      governmentIntakes.every(Boolean) &&
      governmentSources.every(Boolean) &&
      governmentObservations.every(Boolean) &&
      governmentClaims.every(Boolean) &&
      governmentInquiries.every(Boolean) &&
      governmentExistingSources.every(Boolean)
    ),
    transcriptAudit: Boolean(
      nycacGovernmentInterfaceAudit.officialCouncilTranscriptCandidatesReviewed ===
        government.expectedTranscriptCandidates &&
      nycacGovernmentInterfaceAudit.recoveredFinkelpearlCoalitionReferences ===
        government.expectedRecoveredReferences &&
      nycacGovernmentInterfaceAudit.recoveredReference.hearingDate === "2017-05-19" &&
      nycacGovernmentInterfaceAudit.recoveredReference.transcriptPage === 92 &&
      /bounded audit/i.test(nycacGovernmentInterfaceAudit.corpusBoundary) &&
      /not a complete native export/i.test(nycacGovernmentInterfaceAudit.corpusBoundary) &&
      governmentTranscriptInquiry?.resultStatus === "partially-recovered" &&
      governmentTranscriptInquiry.limitations.some((item) =>
        /not a complete native export/i.test(item)
      ) &&
      governmentTranscriptInquiry.limitations.some((item) =>
        /does not prove.*only|not prove.*only/i.test(item)
      )
    ),
    linkedGraph: Boolean(
      governmentIntakes.every(
        (item) => item?.sourceIds.every((id) => sourceById.has(id)) &&
          item.observationIds.every((id) => observationById.has(id)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id)) &&
          item.boundaries.length >= 2
      ) &&
      governmentObservations.every(
        (item) => item?.sourceId && sourceById.has(item.sourceId) &&
          item.claimIds.every((id) => claimById.has(id)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id)) &&
          item.limitations.length >= 2
      ) &&
      governmentClaims.every(
        (item) => item?.evidence.every((evidence) => sourceById.has(evidence.sourceId)) &&
          item.researchInquiryIds.every((id) => inquiryById.has(id)) &&
          item.boundaries.length >= 2 &&
          item.antiClaims.length >= 3
      ) &&
      governmentInquiries.every(
        (item) => item?.sourceIds.every((id) => sourceById.has(id)) &&
          item.methods.length >= 3 &&
          item.findings.length >= 3 &&
          item.limitations.length >= 3
      )
    ),
    directRecord: Boolean(
      governmentDirectClaim?.status === "confirmed-with-boundary" &&
      governmentDirectClaim.internalClaim.includes("Tom Finkelpearl") &&
      governmentDirectClaim.internalClaim.includes("City Council") &&
      governmentDirectClaim.internalClaim.includes("formed after DCLA convened") &&
      governmentDirectClaim.evidence.some(
        (evidence) =>
          evidence.sourceId === "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19" &&
          evidence.relationship === "direct-support" &&
          evidence.locator === "Transcript page 92"
      ) &&
      sourceById
        .get("SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19")
        ?.doesNotEstablish.includes("private motives or institutional dependency")
    ),
    inferenceDiscipline: Boolean(
      governmentInferenceClaims.length === 3 &&
      governmentInferenceClaims.every(
        (claim) => claim?.status === "inference" &&
          claim.internalClaim.startsWith("Institutional interpretation:") &&
          claim.projections.length > 0 &&
          claim.projections.every(
            (projection) => projection.status === "hold" && projection.surfaces.length === 0
          ) &&
          claim.boundaries.some((boundary) => /interpretation|not proof|not a quotation|not Espinal's sole/i.test(boundary)) &&
          claim.antiClaims.some((antiClaim) => /depend/i.test(antiClaim)) &&
          claim.antiClaims.some((antiClaim) => /alone|sole/i.test(antiClaim))
      )
    ),
    actorSpecificity: Boolean(
      claimById
        .get("CLM-NYCAC-DCLA-CIVIC-INTERMEDIARY-VALUE")
        ?.evidence.some((evidence) => evidence.sourceId === "SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE") &&
      claimById
        .get("CLM-NYCAC-COUNCIL-DELIBERATIVE-VALUE")
        ?.evidence.some((evidence) => evidence.sourceId === "SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11") &&
      claimById
        .get("CLM-NYCAC-ESPINAL-IMPLEMENTATION-PARTNER-VALUE")
        ?.evidence.some((evidence) => evidence.sourceId === "SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21") &&
      governmentValueInquiry?.findings.some((finding) => /DCLA gained/i.test(finding)) &&
      governmentValueInquiry?.findings.some((finding) => /Council gained/i.test(finding)) &&
      governmentValueInquiry?.findings.some((finding) => /Espinal gained/i.test(finding))
    ),
    proofCoverage: Boolean(
      governmentProofCoverage?.sourceIds.includes(
        "SRC-NYC-COUNCIL-FY2018-DCLA-HEARING-2017-05-19"
      ) &&
      governmentProofCoverage.sourceIds.includes("SRC-DCLA-COMMISSIONER-CREATENYC-MESSAGE") &&
      governmentProofCoverage.sourceIds.includes("SRC-NYC-COUNCIL-MARCH-HEARING-2019-02-11") &&
      governmentProofCoverage.sourceIds.includes("SRC-X-NYCAC-RAFAEL-ESPINAL-2019-02-21") &&
      governmentProofCoverage.researchInquiryIds.includes(
        "INQ-NYCAC-FINKELPEARL-COUNCIL-TRANSCRIPT-AUDIT"
      ) &&
      governmentProofCoverage.researchInquiryIds.includes(
        "INQ-NYCAC-GOVERNMENT-INTERFACE-VALUE"
      )
    ),
    reportContract: Boolean(
      governmentReport.includes("May 19, 2017") &&
      governmentReport.includes("pages 91-92") &&
      governmentReport.includes("For DCLA") &&
      governmentReport.includes("For the Council") &&
      governmentReport.includes("For Council Member Rafael Espinal") &&
      governmentReport.includes("One direct coalition reference was recovered") &&
      /not a complete native Council transcript export/i.test(governmentReport) &&
      /not[\s\S]{0,120}depended on Jamie/i.test(governmentReport) &&
      /mature but held/i.test(governmentReport)
    ),
    publicSafety: Boolean(
      !/(?:\/Users\/|\/Volumes\/|\/private\/|Google Drive\/)/i.test(
        `${governmentInspectionText}\n${governmentReport}`
      ) &&
      !containsNycacSoleCreditClaim(governmentProjectionText) &&
      governmentInferenceClaims.every((claim) =>
        claim?.evidence.every((evidence) => evidence.relationship !== "private-support")
      )
    )
  };
  const nycacGovernmentInterfaceComplete = Object.values(
    governmentDiagnostics
  ).every(Boolean);
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...pressObservations, ...kcFundingObservations, kcTransitionObservation, ...kcPhaseObservations, ...teamsObservations, ...sharedDriveObservations, ...socialMediaArchiveProduction.observations, ...callNycSocialCorpus.observations, ...wowlistSocialCorpus.observations, ...kcTownHallSocialCorpus.observations, ...nycacSocialCorpus.observations, ...urbanhermitSocialCorpus.observations, ...nycacEventObservations, ...personalEventObservations, ...wowFacebookObservations, ...nycacFacebookObservations, ...kcSpacesFacebookObservations, ...personalFacebookObservations, ...participationObservations, ...governmentObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, pressClaim, ...kcFundingClaims, kcTransitionClaim, ...kcPhaseClaims, ...teamsClaims, ...sharedDriveClaims, ...socialClaims, ...callFullClaims, ...wowFullClaims, ...kcthFullClaims, ...nycacFullClaims, ...urbanFullClaims, ...nycacEventClaims, ...personalEventClaims, ...wowFacebookClaims, ...nycacFacebookClaims, ...kcSpacesFacebookClaims, ...personalFacebookClaims, ...participationClaims, ...governmentClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, pressInquiry, kcFundingInquiry, kcTransitionInquiry, ...kcPhaseInquiries, ...teamsInquiries, ...sharedDriveInquiries, ...socialInquiries, ...callFullInquiries, ...wowFullInquiries, ...kcthFullInquiries, ...nycacFullInquiries, ...urbanFullInquiries, ...nycacEventInquiries, ...personalEventInquiries, ...wowFacebookInquiries, ...nycacFacebookInquiries, ...kcSpacesFacebookInquiries, ...personalFacebookInquiries, ...participationInquiries, ...governmentInquiries];
  const triangulatedExpansionClaims = expansionClaims.filter(
    (claim) => claim && new Set(claim.evidence.map((evidence) => evidence.sourceId)).size >= 2
  );
  const heldExpansionClaims = expansionClaims.filter((claim) =>
    claim?.projections.some((projection) => projection.status === "hold")
  );
  const selectedExpansionClaims = expansion.selectedClaimIds.map((id) => claimById.get(id));
  const photoFeedback = suite.pilot.photoFeedbackChain;
  const photoIntake = intakeById.get(photoFeedback.intakeId);
  const photoObservation = observationById.get(photoFeedback.observationId);
  const photoSource = sourceById.get(photoFeedback.sourceId);
  const photoClaim = claimById.get(photoFeedback.claimId);
  const photoInquiry = inquiryById.get(photoFeedback.inquiryId);
  const privatePhotoEvidence = photoClaim?.evidence.find(
    (evidence) => evidence.sourceId === photoFeedback.sourceId
  );
  const photoChainComplete = Boolean(
    photoIntake?.kind === "photo-lead" &&
      photoIntake.visibility === "protected" &&
      photoIntake.sourceIds.includes(photoFeedback.sourceId) &&
      photoIntake.observationIds.includes(photoFeedback.observationId) &&
      photoIntake.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoObservation?.kind === "visual-observation" &&
      photoObservation.sourceId === photoFeedback.sourceId &&
      photoObservation.claimIds.includes(photoFeedback.claimId) &&
      photoObservation.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoSource?.visibility === "public-metadata-only" &&
      photoSource.media?.rightsStatus === "permission-needed" &&
      photoSource.media?.consentStatus === "review-needed" &&
      photoSource.media?.publicDisplayStatus === "hold" &&
      privatePhotoEvidence?.relationship === "private-support" &&
      privatePhotoEvidence.renderCitation === false &&
      photoClaim?.researchInquiryIds.includes(photoFeedback.inquiryId) &&
      photoClaim.projections.length > 0 &&
      photoClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      photoInquiry?.sourceIds.includes(photoFeedback.sourceId) &&
      photoInquiry.limitations.length &&
      !publicRegistryText.includes(photoFeedback.intakeId) &&
      !publicRegistryText.includes(photoFeedback.observationId) &&
      !publicRegistryText.includes(photoFeedback.sourceId) &&
      !publicRegistryText.includes(photoFeedback.claimId) &&
      !publicRegistryText.includes(photoFeedback.inquiryId) &&
      Boolean(photoSource.protectedLocatorId) &&
      !publicRegistryText.includes(photoSource.protectedLocatorId)
  );

  const criteria = [
    {
      criterionId: "KB-EVAL-INTAKE",
      score: score(
        pilotIntakes.every((item) => item && item.boundaries.length && (item.sourceIds.length || item.researchInquiryIds.length)) &&
        expansionIntakes.length === expansion.expectedSourceCount &&
        expansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        pressIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length >= 2 && item.sourceIds.length === 1 && item.observationIds.length) &&
        kcFundingIntake?.disposition === "integrated" && kcFundingIntake.boundaries.length >= 3
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes, ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} source-expansion intakes, and ${pressIntakes.filter(Boolean).length}/${pressArchive.expectedIndexCount} press-index intakes retain dispositions, observations, and boundaries`]
    },
    {
      criterionId: "KB-EVAL-ATOMICITY",
      score: score(
        allEvaluatedObservations.length >= 30 &&
        allEvaluatedObservations.every((item) => item?.locator && item.limitations.length && (item.claimIds.length || item.researchInquiryIds.length)) &&
        urbanObservationsAtomic
      ),
      evidence: [`${allEvaluatedObservations.filter(Boolean).length} proposition-level observations have locators, limitations, and claim or inquiry links`]
    },
    {
      criterionId: "KB-EVAL-SCOPE",
      score: score(
        [...pilotSources, ...expansionSources, ...pressIndexSources, ...pressArticleSources, ...kcFundingSources, ...urbanFullSources].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error)) &&
        urbanObservationsAtomic
      ),
      evidence: [`${expansionSources.filter(Boolean).length}/${expansion.expectedSourceCount} source-expansion records and ${pressArticleSources.filter(Boolean).length}/${pressArchive.expectedUniqueArticleCount} distinct press articles have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) =>
          claim?.boundaries.length &&
          claim.antiClaims.length &&
          claim.reviewedBy.length &&
          (
            claim.evidence.length ||
            (
              claim.status === "use-with-care" &&
              claim.researchInquiryIds.length &&
              claim.projections.every(
                (projection) => projection.status === "hold" && projection.surfaces.length === 0
              )
            )
          )
        ) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length,
        triangulatedExpansionClaims.length >= 4
      ),
      evidence: [`${expansionClaims.filter(Boolean).length} new claims matured; ${triangulatedExpansionClaims.length} are supported by multiple source records; held participant-memory claims remain inquiry-linked; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
    },
    {
      criterionId: "KB-EVAL-PROJECTION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.projections.every((projection) => projection.status !== "hold" || projection.surfaces.length === 0)) &&
        selectedExpansionClaims.every((claim) => claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc"))) &&
        Boolean(fairRentPage)
      ),
      evidence: [`Held claims have no public surface; ${selectedExpansionClaims.filter(Boolean).length} source-expansion claims have authorized FairRentNYC projections`]
    },
    {
      criterionId: "KB-EVAL-COVERAGE",
      score: score(
        Boolean(fairRentPage) &&
        fairRentMdx.includes("CLM-NYCAC-CABARET-SAFETY-ORGANIZING") &&
        expansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        fairRentPage.occurrences.length >= 4 &&
        kcFundingComplete &&
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Four hiring-relevant NYCAC assertions now have canonical page citations; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
    },
    {
      criterionId: "KB-EVAL-SAFETY",
      score: score(errors.length === 0 && knowledgeBank.intakeItems.every((item) => !item.sourceUrl || /^https:\/\//.test(item.sourceUrl))),
      evidence: [errors.length ? `${errors.length} canonical validation errors` : "Canonical validation passes with no private-path or protected-locator leak"]
    },
    {
      criterionId: "KB-EVAL-RECOMPOSITION",
      score: score(
        pilotClaims.some((claim) => claim?.projections.some((projection) => projection.status === "hold")) &&
        heldExpansionClaims.length >= 3 &&
        expansionInquiries.some((inquiry) => inquiry?.id === "INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP") &&
        knowledgeBank.intakeItems.some((item) => item.kind === "memory-lead") &&
        existsSync(path.join(repoRoot, "docs/knowledge-bank/intake-and-maturation.md")) &&
        photoChainComplete &&
        pressClaim?.projections.every((projection) => projection.status === "hold") &&
        pressInquiry?.resultStatus === "partially-recovered"
      ),
      evidence: [photoChainComplete
        ? `${heldExpansionClaims.length} newly mature claims and the complete press-archive claim remain held beside open inquiries, memory leads, and the protected photo feedback chain`
        : "The canonical photo-feedback chain is incomplete"]
    },
    {
      criterionId: "KB-EVAL-PRESS-ARCHIVE",
      score: score(pressArchiveComplete),
      evidence: [pressArchiveComplete
        ? `${pressEntries.length} appearances across ${campaignPressInventory.length} campaign indexes resolve to ${uniquePressArticleSourceIds.length} distinct bounded article records; duplicate campaign selection is preserved`
        : "Campaign press inventory is missing an appearance, source, boundary, disposition, or exact count"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FUNDING-LIFECYCLE",
      score: score(kcFundingComplete),
      evidence: [kcFundingComplete
        ? "Five official records preserve the CCED recommendation, Council acceptance and appropriation, zero disbursement, withdrawal, and 2024 return; Jamie's stewardship-transition account remains a separate held memory lead; four nonredundant notes support the two-claim public projection"
        : "KC Town Hall funding lifecycle, held stewardship-transition lead, source scope, observations, claims, boundaries, proof coverage, correction, or public citation plan is incomplete"]
    },
    {
      criterionId: "KB-EVAL-KCTH-PHASE-ONE",
      score: score(kcPhaseComplete),
      evidence: [kcPhaseComplete
        ? "Two intakes preserve four bounded sources, ten observations, three selected claims, two held claims, and two open inquiries; the site now leads with Jamie's Phase One construction and neighborhood-process work while the proposal, testimony, budget, completion, collective labor, and protected packet remain correctly scoped"
        : "KC Town Hall Phase One source classes, role boundary, construction scope, survey system, held depth, protected records, proof coverage, public projection, citation plan, or anti-overclaim contract is incomplete"]
    },
    {
      criterionId: "KB-EVAL-TEAMS-ARCHIVE-PRODUCTION",
      score: score(teamsArchiveComplete),
      evidence: [teamsArchiveComplete
        ? `${teamsSources.length} bounded sources from three required Teams archive families produced ${teamsObservations.length} atomic observations and ${teamsClaims.length} mature claims; one independently supported CallNYC claim is public and the remaining depth stays held`
        : "Teams archive source counts, boundaries, hydration limits, held claims, proof coverage, CallNYC projection, documentation, or private-source redaction is incomplete"]
    },
    {
      criterionId: "KB-EVAL-GDRIVE-SHARED-DRIVES-PRODUCTION",
      score: score(sharedDriveComplete),
      evidence: [sharedDriveComplete
        ? `${sharedDriveSources.length} protected sources from a ${sharedDrives.expectedDriveCount}-drive inventory and ${sharedDrives.expectedInspectedRootCount}-root sample produced ${sharedDriveObservations.length} atomic observations and ${sharedDriveClaims.length} mature claims; the existing Sunday Dinner projection gained aggregate support while five claims remain held`
        : "Shared Drives counts, non-exhaustive method, deduplication, private-source redaction, collective credit, held claims, Sunday Dinner projection, proof coverage, or documentation is incomplete"]
    },
    {
      criterionId: "KB-EVAL-SOCIAL-MEDIA-ARCHIVE-PRODUCTION",
      score: score(socialArchiveComplete),
      evidence: [socialArchiveComplete
        ? `Five authenticated project-account inventories produced ${socialMediaArchiveProduction.sources.length} bounded sources, an eight-member CallNYC count, an at-least-five-member NYC Artist Coalition floor, ${social.activeClaimIds.length} inspectable public claims, and ${social.heldClaimIds.length} held claims with collective-authorship and completeness limits`
        : "Social-account identity, recovered counts, official-at-date verification, outreach distinction, collective authorship, excluded-handle boundaries, selected projections, held depth, public safety, or documentation is incomplete"]
    },
    {
      criterionId: "KB-EVAL-CALLNYC-FULL-POPULATION",
      score: score(callFullPopulationComplete),
      evidence: [callFullPopulationComplete
        ? `All ${callFull.expectedProfileCount} observed profile-count slots are dispositioned through ${callRecords.length} unique item records and ${callLedger.unresolvedItems.length} explicit unresolved slots; the ledger preserves ${callUniqueShortUrls.size} unique short URLs, ${callRecognitionRecords.length} recognition posts, ${callRecognitionIssuePages.size} issue pages, ${callRecognitionCategories.size} categories, and ${callRecognitionHandles.size} intended Council-member accounts without converting outreach into response`
        : "CallNYC ledger reconciliation, item uniqueness, relationship counts, URL inventory, stakeholder derivation, unresolved-slot boundaries, source maturation, held claims, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FULL-POPULATION",
      score: score(wowFullPopulationComplete),
      evidence: [wowFullPopulationComplete
        ? `All ${wowFull.expectedProfileCount} surviving profile-count items are recovered through ${wowRecords.length} unique records; the ledger preserves ${wowUniqueShortUrls.size} posted short URLs, ${wowFull.expectedSupportReplies} direct support replies, ${wowExternalHandles.size} external account touchpoints, ${wowThemeCounts["civic-mobilization-and-care"] + wowThemeCounts["civic-care-amplification"]} civic-care records, and a separately bounded visible-reaction snapshot without assigning shared-account authorship or source-status metrics to Jamie`
        : "WOW List ledger reconciliation, item uniqueness, link inventory, support and stakeholder patterns, source-status metric exclusion, collective authorship, held depth, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FULL-POPULATION",
      score: score(kcthFullPopulationComplete),
      evidence: [kcthFullPopulationComplete
        ? `All ${kcthFull.expectedProfileCount} surviving profile-count items are recovered through ${kcthRecords.length} unique records; the ledger preserves ${kcthUniqueShortUrls.size} posted short URLs, ${kcthFull.expectedTireWorkflowRecords} tire-workflow records, ${kcthExternalHandles.size} outside-account touchpoints, and a ${kcthFull.expectedDirectCouncilResponses}-member direct-response floor while keeping outreach, amplification, mutable reactions, collective authorship, and private service data bounded`
        : "KC Town Hall ledger reconciliation, item uniqueness, link and source inventory, tire-workflow classification, direct-response derivation, metric parsing, source-status metric exclusion, collective authorship, private-data exclusion, held depth, public projection, proof coverage, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-NYCAC-POPULATION-DISPOSITION",
      score: score(nycacPopulationDispositionComplete),
      evidence: [nycacPopulationDispositionComplete
        ? `All ${nycacFull.expectedProfileCount} displayed profile-count slots are dispositioned through ${nycacRecords.length} unique item records and ${nycacFull.expectedUnresolvedSlots} explicit carrier-limited slots; the ledger preserves ${nycacUniqueShortUrls.size} posted short URLs, ${nycacResolvedDestinations.size} current destinations, ${nycacRepostSourceAccounts.size} source accounts, ${nycacDirectMentionAccounts.size} direct-mention accounts, ten closely read sources, collective authorship, and source-status metric ownership without overloading the public portfolio`
        : "NYC Artist Coalition population arithmetic, item uniqueness, unresolved carrier limits, campaign and source classifications, link inventory, direct-mention distinctions, source-status metric exclusion, collective authorship, held composition, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-URBANHERMIT-FULL-POPULATION",
      score: score(urbanFullPopulationComplete),
      evidence: [urbanFullPopulationComplete
        ? `All ${urbanFull.expectedProfileCount} displayed personal-account slots are dispositioned through ${urbanRecords.length} public mission-relevant item records, ${urbanContextDisposition.count + urbanProtectedDisposition.count} aggregate-only withheld dispositions, and ${urbanFull.expectedUnresolvedSlots} carrier-limited slots; ${urbanUniquePostedUrls.size} distinct posted URLs are retained, source-status metrics are excluded, no public item-level crosswalk exists for withheld context, and all ${urbanHeldClaims.length} claims remain held for deliberate future composition`
        : "Personal-account population arithmetic, aggregate-only withholding, source-link inventory, metric ownership, source maturation, held composition, documentation, or public safety is incomplete"]
    },
    {
      criterionId: "KB-EVAL-NYCAC-FACEBOOK-EVENTS",
      score: score(nycacEventPopulationComplete),
      evidence: [nycacEventPopulationComplete
        ? `All ${nycacEvents.expectedControlSlots} displayed Facebook event slots are dispositioned through ${nycacRecoveredEventRows.length} recovered public event records and one unresolved historical slot; ${nycacRecurringRows.length} recurring meetings span ${nycacPhysicalMeetingVenues.size} physical cultural spaces and ${nycacVirtualMeetingRows.length} virtual meetings; ${nycacLinkRows.length} source-route rows remain bounded; responses are not attendance; and only the collective-credit participation-system claim is composed into the site`
        : `Facebook event criterion failed: ${Object.entries(nycacEventDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-PERSONAL-WOWLIST-FACEBOOK-EVENTS",
      score: score(personalWowlistEventPopulationComplete),
      evidence: [personalWowlistEventPopulationComplete
        ? `Three exact 502-ID profile traversals, all ${personalEvents.expectedHostedIds} hosted-tab records, the ${personalEvents.expectedUnion}-ID union, ${personalEvents.expectedDisplayedJamieHostCards} displayed-Jamie plot points, nine selected event sources, three posted routes, one independent article, and WOW List's bounded zero/non-recovery controls all reconcile without exposing the personal association graph or projecting a new site claim`
        : `Personal/WOW List Facebook event criterion failed: ${Object.entries(personalWowlistEventDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FACEBOOK-POSTS",
      score: score(wowlistFacebookPostPopulationComplete),
      evidence: [wowlistFacebookPostPopulationComplete
        ? `All ${wowFacebook.expectedDistinctPosts} distinct surviving WOW List Facebook posts have public-safe dispositions; fresh forward and reverse controls agree 53-for-53; ${wowFacebook.expectedUniqueExplicitDestinations} explicit canonical routes and a bounded ${wowFacebook.expectedWiderDistinctDestinations}-destination rendered graph remain available; publisher attribution, shared authorship, sole management, mutable reactions, stakeholder response, and impact stay distinct; and only Jamie's bounded Page-publishing operation enters the portfolio`
        : `WOW List Facebook post criterion failed: ${Object.entries(wowFacebookDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-NYCAC-FACEBOOK-POSTS",
      score: score(nycacFacebookPostPopulationComplete),
      evidence: [nycacFacebookPostPopulationComplete
        ? `All ${nycacFacebook.expectedPublicContentSignatures} conservative public-surface signatures and ${nycacFacebook.expectedNativePosts} exact native post IDs have redacted dispositions as overlapping controls; ${nycacFacebook.expectedDestinationOccurrences} public-safe route occurrences resolve to ${nycacFacebook.expectedUniqueDestinations} destinations; failed controls, source authorship, collective credit, sensitive evidence, mutable metrics, stakeholder response, and impact remain bounded; and no new visible portfolio claim is forced from the archive`
        : `NYC Artist Coalition Facebook post criterion failed: ${Object.entries(nycacFacebookDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-KCSPACES-FACEBOOK-POSTS",
      score: score(kcSpacesFundFacebookPostPopulationComplete),
      evidence: [kcSpacesFundFacebookPostPopulationComplete
        ? `All ${kcSpacesFacebook.expectedDistinctPosts} posts exposed by the surviving KC Spaces Fund Facebook Page have redacted dispositions; ${kcSpacesFacebook.expectedUniqueDestinations} public-safe destinations, ${kcSpacesFacebook.expectedInstitutionalResponseSignals} bounded organization-attributed response examples, and ${kcSpacesFacebook.expectedTotalVisibleReactions} mutable reaction labels remain inspectable while lifetime completeness, publisher identity, collective credit, Jamie's separate digital role and held naming memory, stakeholder totals, grant decisions, and impact stay distinct; no new visible portfolio claim is forced`
        : `KC Spaces Fund Facebook post criterion failed: ${Object.entries(kcSpacesFacebookDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-JAMIE-PERSONAL-FACEBOOK-POSTS",
      score: score(jamiePersonalFacebookPostPopulationComplete),
      evidence: [jamiePersonalFacebookPostPopulationComplete
        ? `All ${personalFacebook.expectedUniqueRecords} records returned by the authenticated owner-filtered surface are reconciled across ${personalFacebook.expectedCursorPages} cursor pages; year, form, audience, mission, URL, stakeholder, and selected-public-source controls remain bounded; raw and unknown-audience material stays protected; ${personalFacebook.expectedUniqueNormalizedExternalUrls} destinations remain a source queue; outbound stakeholder routes, mutable counters, collective credit, and unresolved CouncilStat role language remain distinct from engagement and impact; and no visible portfolio claim is forced`
        : `Jamie personal Facebook post criterion failed: ${Object.entries(personalFacebookDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-PARTICIPATION-INFRASTRUCTURE",
      score: score(participationInfrastructureComplete),
      evidence: [participationInfrastructureComplete
        ? `WOW List's two-snapshot scale and Popular Vote relationships, Sunday Dinner's complete aggregate column audit, and Call Script's public participation workflow are integrated with denominator, attendance, shared-account, collective-credit, and selective-projection boundaries intact`
        : `Participation-infrastructure criterion failed: ${Object.entries(participationDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-NYCAC-GOVERNMENT-INTERFACE",
      score: score(nycacGovernmentInterfaceComplete),
      evidence: [nycacGovernmentInterfaceComplete
        ? `The bounded five-transcript-candidate audit preserves the May 19, 2017 Finkelpearl reference at page 92; DCLA, Council, and Espinal value remain three actor-specific held inferences backed by official records and public engagement evidence, with incomplete-corpus, collective-credit, dependency, endorsement, and policy-causation boundaries intact`
        : `NYC Artist Coalition government-interface criterion failed: ${Object.entries(governmentDiagnostics).filter(([, passed]) => !passed).map(([name]) => name).join(", ") || "an ungrouped invariant"}`]
    },
    {
      criterionId: "KB-EVAL-WATERWAYS-KC-STAR",
      score: score(waterwaysKcStarComplete),
      evidence: [waterwaysKcStarComplete
        ? `The 2007 Kansas City Star report is retained as public metadata with ${waterwaysSourceCoverage.included.length} proposition-level observations and three canonical claim records checked against a sealed source-coverage regression contract and a runtime-verifiable artifact receipt; exact page-and-column locators, explicit include/defer/omit dispositions, separate factual and interpretive claims, a refined route inquiry, collective labor credit, copyright protection, non-recovery discipline, and no automatic portfolio promotion remain intact`
        : `Kansas City Star eval failures: ${[
            ...waterwaysInvariantFailures,
            ...waterwaysCoverageFailures
          ].join("; ") || "unknown invariant"}`]
    }
  ];

  const byId = new Map(suite.criteria.map((criterion) => [criterion.id, criterion]));
  let weightedScore = 0;
  const belowMinimum = [];
  for (const result of criteria) {
    const definition = byId.get(result.criterionId);
    weightedScore += result.score * definition.weight;
    if (result.score < definition.minimumScore) belowMinimum.push(result.criterionId);
  }
  weightedScore = Math.round(weightedScore * 1000) / 1000;

  return {
    criteria,
    weightedScore,
    belowMinimum,
    errors,
    accepted: errors.length === 0 && belowMinimum.length === 0 && weightedScore >= suite.targets.weightedScoreAtLeast
  };
}
