import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { campaignPressInventory, nycacPressArchive } from "../../apps/www/src/data/knowledge-bank/nycac-press-archive.ts";
import { nycacPressReadings } from "../../apps/www/src/data/knowledge-bank/nycac-press-readings.ts";
import { callNycSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/callnyc-social-population-2026-07.ts";
import { kcTownHallFieldPractice } from "../../apps/www/src/data/knowledge-bank/kctownhall-field-practice.ts";
import { kcTownHallCorpusFindings, kcTownHallPopulationAudit, kcTownHallSocialCorpus } from "../../apps/www/src/data/knowledge-bank/kctownhall-social-corpus.ts";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { nycacSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/nycac-social-population-2026-07.ts";
import {
  nycacFacebookEventArticleSourceIds,
  nycacFacebookEventClaimIds,
  nycacFacebookEventKnowledge,
  nycacFacebookEventReviewSummary
} from "../../apps/www/src/data/knowledge-bank/nycac-facebook-events-2026-07.ts";
import {
  nycacFacebookPostClaimIds,
  nycacFacebookPostKnowledge,
  nycacFacebookPostReviewSummary
} from "../../apps/www/src/data/knowledge-bank/nycac-facebook-posts-2026-07.ts";
import {
  personalWowListFacebookEventClaimIds,
  personalWowListFacebookEventKnowledge,
  personalWowListFacebookEventReviewSummary,
  personalWowListFacebookEventSourceIds
} from "../../apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-2026-07.ts";
import { projectSocialAccounts, socialEngagementEvents, socialMediaProductionJuly2026 } from "../../apps/www/src/data/knowledge-bank/social-media-production-2026-07.ts";
import { urbanhermitSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/urbanhermit-social-population-2026-07.ts";
import {
  wowListFacebookPostClaimIds,
  wowListFacebookPostKnowledge,
  wowListFacebookPostReviewSummary
} from "../../apps/www/src/data/knowledge-bank/wowlist-facebook-posts-2026-07.ts";
import { wowListSocialPopulationJuly2026 } from "../../apps/www/src/data/knowledge-bank/wowlist-social-population-2026-07.ts";
import { proofClaims } from "../../apps/www/src/data/proofs.ts";
import { validateKnowledgeBank } from "./citation-validation.mjs";
import { nycacMissionSignalRules, nycacSelfRepostAppearanceUrls } from "./nycac-mission-classifier.mjs";
import { urbanhermitMissionSignalRules } from "./urbanhermit-mission-classifier.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, "evals/knowledge-bank/evals.json");
const holdoutRunsPath = path.join(repoRoot, "evals/knowledge-bank/holdout-runs.json");
const publicRegistryPath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/public-registry.json");
const KCTH_FIELD_PRACTICE_REVIEW_LOCKS = Object.freeze({
  corpusSha256: "7344b91556feaffebbcf4394b0b6cca9ac005c8d94d3b325dce97c557fc1cdc1",
  canonicalRecordsSha256: "00d2c80af90f0584311a5557e2ad02a8b67d63e7b1c5719a2418d82f692d4865",
  governedKnowledgeSha256: "1b01cfff6bbffaf40430c3a1870ce8a1b0b5e8a6cffed47bddc3aec3f089de21",
  proofProjectionSha256: "f8af10efe6b6c073197cc8f0f53189b04933dc66a4059807d727454724e9a07d",
  caseStudyMdxSha256: "859205fe5cd3d7aa538a4706d52ff2476657565336a8157b1bffc8a4fb502bce",
  sharedPublicSurfacesSha256: "b5d475682a27f7062b49c3140d23fae0e4070e0c529748ea84653489eae854eb",
  publicReviewReportSha256: "94814964151def3aa2a285e85644a8dfad7879736cf125c5906359e2f02e2696"
});
const NYCAC_SOCIAL_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "74725b915bee88b6d29fa484a2f9ecb0dd9fe2cdaaca75b4dc7c7e9b54107d46",
  recordsSha256: "71955963e22dc99454615aea10c56cf7749e1bdb3aabc26bcedad885013249a1",
  incomingRecordsSha256: "d190361370c1ce18723fc472d0b2fce6c9f520797c9fca32ae80c3912dc83a09",
  governedModuleSha256: "727178b4389b1def93fb99ea7a402b9fb70d48412ed05cb04745d6305910c55d",
  publicReportSha256: "6a09c5f2fd3520b8238f5f54c2c4ceb3a2222fb72a6c09b64591ac3b4d6782cf"
});
const URBANHERM_SOCIAL_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "9fedab737b1e4d6ded779942203d4a77272fe0120663f50402c81bdbcdc0c455",
  recordsSha256: "4a348d56fe961ea19767b2c7de48da3026cba5f274c027da11dcb2371672d277",
  incomingRecordsSha256: "c09b3150e127e69f0382cbad3ffa350fb2fccdfb3b0fc1b41943325f16ac5f1f",
  governedModuleSha256: "8e97d84adf69cec38fad3a37108ccbcfa0b4e0b8d0630b8f63bff1e32b7f7a94",
  publicReportSha256: "c1dcc58a79ff1c51a3c2e9bcd2803f711d4234a61e22bff5f9e8d54babea16f6"
});
const NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "64af7b2f1804b3b319de2f5eef60bfb01371ce5209c8497473f800a334c66555",
  manifestContentSha256: "d0b72b654e76e9149439d1f218c05e248134abbca4a8c3088696e2536fdd52f2",
  governedModuleSha256: "29e868734b83dc89609c47d3d8eff72939da617742bcb6db16c08e759ec70fb8",
  canonicalKnowledgeSha256: "0e6eee166aebb097198db52bd8de0184a2cb0f6033f4cdcf020508c2fc48bd7a",
  reviewConfigurationSha256: "e456b7cdc66033c60d0d526d2794aec91be7470c35834ae776db9cc44b3dea9b",
  articleSourcesSha256: "a9ecb8c4724f7b6cf9b25cc806effe587694071a41fd2a8bb638402be009d7e7",
  governanceBindingsSha256: "f2f7e2cfdd14aeb14c9da9cf4567a48493330ef96156e628254d8d659cdaed78",
  publicReportSha256: "ce9475a9aecda99f2d7c58c099d657a14e5512a557b58b25d3736803996e9769",
  caseStudyMdxSha256: "bb027dc5fdd7a0ce2f2602287ad3a7953af98855316efe5986aeafdae387ccfb",
  proofSnippetSha256: "39b5ddec3ec83e6e552c33da836551f854a6dc809ea4beaa35e688036a982d9c",
  proofContentSha256: "d59ed44552e96a73477489cdd91363d9f1e764f39720dddafe21b01e10de79ca"
});
const PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "23c7d57699dc30d84d6738f7ece4b47f3497550fa2dd8690ca7c4a86719d70ef",
  manifestContentSha256: "62f09e7e53d5e28397ca25e948a77f7e1ec7e9e8a504b37c8e9343eae1faa090",
  governedModuleSha256: "17756383e3e3fe07dd5691fe6866efe5d7292217a31fb5ab355cd71d8f64e940",
  canonicalKnowledgeSha256: "575a9c54527e5c42e7b38a077ef2438fac2073ab5eafc24656c2c677d43afaac",
  reviewConfigurationSha256: "939b9ccc09b790520450a8c3295f1436193c9c2e9c6505350fc4c0bfb23c86b0",
  governanceBindingsSha256: "046ae94f6bb7300698deb933f959a6050353f1c32e18bb994c6743c966aaffb1",
  publicReportSha256: "46f3020a8bdf63ea6f0d9f4bbcb2b9a99dd4f6fe33cce152490778cd48f15d2f",
  wowListMdxSha256: "21106a4e2e5427f40eab679c5ae87838e29205e93e26e751960de588e5889429",
  sundayDinnerMdxSha256: "b2889ec0ccaac06e4e7e86b14ee9643d0d7cd0e02b727928b7270a776e31fa10",
  proofContentSha256: "04bda7a50e53a7c78d4f49b7f139a424514e03d83994c3fbb63cd6fbd25be685"
});
const WOWLIST_FACEBOOK_POST_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "5755dfbbb6388ca369b90337e210502dd264bb22d554cf8f0294027de08ffc72",
  manifestContentSha256: "d113edbf5011529e247a6a735c1e032075e8b2e054c97dbe552259bffbeba926",
  governedModuleSha256: "3c004b0c0eeb41cac65d097738d9654daff0676780b88c1188beb9b23c439980",
  canonicalKnowledgeSha256: "83e0f4e0a4443204453892e3888ace2383df7524e6c96ab796d13f734507449f",
  reviewConfigurationSha256: "e5bfdb3bdd758be944abdafa8b737ae1b181dda92386805d481250332ac0351c",
  publicReportSha256: "5258d6c934cfdfacafa93cdda1513d067963922aa6d7fd457e3fd745a5088ea6"
});
const NYCAC_FACEBOOK_POST_REVIEW_LOCKS = Object.freeze({
  manifestSha256: "6c5bbeac3f42dde7a6dc038d2470ec8b1e63cf28d652352c7ad6d4ec447bfa6f",
  manifestContentSha256: "21b4dfdfb9a972fbf16db27247c58b9d8305fd2956a200dea69263726e3883fd",
  governedModuleSha256: "dfaaebc44a63ec4c27e7e2041ba19c5a0ccc8ed7b8407a45b019b86df819415c",
  canonicalKnowledgeSha256: "85cf618fda134372c156cb7acaa2e8fa36ecf5a16e0cd7111a8ff5603b792ef9",
  reviewConfigurationSha256: "8c188485aa7340c8f33b82d9112cd9238d59db77236033ac13d8426e52feac2e",
  publicReportSha256: "82a1cd92f535e6cef244576aab547ccfaee5ba1c1a3f0355cbcfb6c5d6e74a34",
  proofProjectionSha256: "7e6d12c463cb77f5c1cb0307dc8c2a79dec0ceb8f7fc1863ccb1b651f6b04e0e"
});
const NYCAC_FACEBOOK_POST_GOVERNED_ROUTE_SEMANTICS = Object.freeze([
  ["https://grubstreet.com/2019/05/prospect-heights-ode-to-babel-gentrification.html", 127, "2019-05-23", "march-transparency-and-accountability", "issue-context", "SRC-NYCAC-FACEBOOK-GRUBSTREET-ODE-2019-05-22"],
  ["https://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php", 161, "2019-02-12", "march-transparency-and-accountability", "issue-context", "SRC-NYCAC-GOTHAMIST-MARCH-2019-02-12"],
  ["https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", 163, "2019-02-12", "cultural-space-survival-and-network", "issue-context", "SRC-NYCAC-BEDFORD-MARCH-2019"],
  ["https://www.fox5ny.com/news/new-yorks-nightlife-mayor-holds-first-event", 239, "2018-03-27", "cultural-space-survival-and-network", "issue-context", "SRC-NYCAC-FACEBOOK-FOX5-NIGHTLIFE-LISTENING-2018-03-26"],
  ["https://nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", 293, "2017-10-30", "cabaret-law-and-dance-freedom", "issue-context", "SRC-NYCAC-NYTIMES-CABARET-REPEAL-2017-10-30"],
  ["https://npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", 321, "2017-09-20", "cultural-space-survival-and-network", "issue-context", "SRC-NYCAC-NPR-CABARET-2017-09-20"],
  ["https://newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", 353, "2017-07-18", "cabaret-law-and-dance-freedom", "issue-context", "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10"],
  ["https://wnyc.org/story/news-analysis-chris-hayes-bureaucratic-dance-end-nyc-cabaret-law-one-familys-struggle-over-genetic-testing", 401, "2017-04-19", "cabaret-law-and-dance-freedom", "issue-context", "SRC-NYCAC-WNYC-CABARET-2017"],
  ["https://timeout.com/newyork/blog/its-still-illegal-to-dance-in-some-parts-of-new-york-032217", 417, "2017-03-23", "coalition-public-communications", "issue-context", "SRC-NYCAC-FACEBOOK-TIMEOUT-CABARET-2017-03-22"]
].map(([url, firstSeenOrdinal, firstSeenAt, missionContext, evidenceRole, sourceId]) => ({
  url, firstSeenOrdinal, firstSeenAt, missionContext, evidenceRole, sourceId
})));
const NYCAC_FACEBOOK_POST_APPROVED_PROJECTION_SEMANTICS = Object.freeze([
  ["CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD", "case-study", "A complete capture-date pass of the surviving NYC Artist Coalition Facebook feed preserves 445 dated posts from 2017-2021, with public-safe source routing and shared-account authorship boundaries.", "active", ["/work/technical-operations", "/work"]],
  ["CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD", "archive-note", "The public-safe census reconciles 598 encountered render rows into 445 distinct dated posts spanning 2017-2021.", "active", ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"]],
  ["CLM-NYCAC-FACEBOOK-CIVIC-RELAY", "archive-note", "Across overlapping campaign arcs, the recovered Page repeatedly connected cultural-space concerns with public meetings, source articles, government interfaces, practical resources, and civic action routes.", "active", ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"]],
  ["CLM-NYCAC-FACEBOOK-INTERACTION-SIGNALS", "archive-note", "At capture time, Facebook displayed 2,291 reactions and 212 comments across the recovered population; these volatile labels are not unique reach, attendance, endorsement, conversion, mandate, or impact.", "active", ["docs/knowledge-bank/projects/nyc-artist-coalition-facebook-posts"]]
].map(([claimId, key, text, status, surfaces]) => ({ claimId, key, text, status, surfaces })));
const NYCAC_FACEBOOK_POST_YEAR_COUNTS = Object.freeze({
  2017: 186, 2018: 74, 2019: 111, 2020: 69, 2021: 5
});
const NYCAC_FACEBOOK_POST_EVIDENCE_ROLE_COUNTS = Object.freeze({
  "project-route": 18,
  "event-or-program": 9,
  "issue-context": 22,
  "resource-or-intake": 6,
  "external-context": 6,
  "fundraising-or-petition": 3,
  "government-or-civic-action": 3
});
const NYCAC_FACEBOOK_POST_MISSION_TAG_COUNTS = Object.freeze({
  "commercial-rent-and-anti-displacement": 48,
  "civic-solidarity-and-participation": 16,
  "covid-and-space-relief": 30,
  "cultural-space-survival-and-network": 191,
  "coalition-public-communications": 104,
  "nightlife-governance-and-listening": 29,
  "march-transparency-and-accountability": 65,
  "cabaret-law-and-dance-freedom": 76,
  "cultural-policy-and-create-nyc": 18,
  "cultural-space-safety-and-compliance": 8
});
const NYCAC_FACEBOOK_POST_STAKEHOLDER_TAG_COUNTS = Object.freeze({
  "general-public-and-followers": 105,
  "artists-cultural-spaces-and-organizers": 256,
  "enforcement-and-regulatory-agencies": 66,
  "state-and-federal-government": 9,
  "office-of-nightlife-and-nightlife-governance": 33,
  "published-media": 35,
  "coalition-and-advocacy-networks": 39,
  "nyc-council-and-elected-officials": 66,
  "cultural-affairs-and-city-agencies": 15
});
const NYCAC_FACEBOOK_POST_ACCOUNT_REFERENCE_ROWS = Object.freeze({
  rafaelEspinal: 23,
  nycCouncil: 25,
  stephenLevin: 8,
  antonioReynoso: 1,
  culturalAffairs: 4,
  officeOfNightlife: 4,
  mayor: 3
});
const NYCAC_FACEBOOK_POST_WITHHELD_ROUTE_SEMANTICS = Object.freeze([
  {
    routeKey: "0db282eb74a958d01858",
    url: null,
    host: "zoom.us",
    firstSeenOrdinal: 60,
    firstSeenAt: "2020-03-16",
    missionContext: "covid-and-space-relief",
    evidenceRole: "resource-or-intake",
    accessDisposition: "withheld-public-route",
    preservationDisposition: "withheld-sensitive-route",
    sourceId: null
  },
  {
    routeKey: "2c51c092cf52f72f2e55",
    url: null,
    host: "docs.google.com",
    firstSeenOrdinal: 67,
    firstSeenAt: "2020-03-14",
    missionContext: "covid-and-space-relief",
    evidenceRole: "resource-or-intake",
    accessDisposition: "withheld-public-route",
    preservationDisposition: "withheld-sensitive-route",
    sourceId: null
  }
]);
const WOWLIST_FACEBOOK_GOVERNED_ROUTE_SEMANTICS = Object.freeze([
  {
    url: "http://www.westword.com/arts/city-partners-with-meow-wolf-on-20-000-denver-diy-spaces-fund-8782025",
    firstSeenOrdinal: 6,
    firstSeenAt: "2017-03-09",
    missionContext: "venue-safety-and-survival",
    evidenceRole: "issue-context",
    sourceId: "SRC-WOWLIST-FACEBOOK-WESTWORD-DIY-FUND-2017"
  },
  {
    url: "https://meowwolf.com/2016/12/meow-wolfs-diy-fund",
    firstSeenOrdinal: 10,
    firstSeenAt: "2016-12-15",
    missionContext: "venue-safety-and-survival",
    evidenceRole: "fundraising",
    sourceId: "SRC-WOWLIST-FACEBOOK-MEOW-WOLF-DIY-FUND-2016"
  },
  {
    url: "http://m.eastbayexpress.com/SevenDays/archives/2016/12/03/artists-at-last-nights-oakland-warehouse-fire-discuss-the-tragedy-those-missing-need-for-safe-underground-spaces",
    firstSeenOrdinal: 15,
    firstSeenAt: "2016-12-04",
    missionContext: "venue-safety-and-survival",
    evidenceRole: "issue-context",
    sourceId: "SRC-WOWLIST-FACEBOOK-EAST-BAY-SAFE-SPACES-2016"
  },
  {
    url: "http://www.wweek.com/bars/2016/07/01/the-know-is-closing",
    firstSeenOrdinal: 27,
    firstSeenAt: "2016-07-03",
    missionContext: "venue-safety-and-survival",
    evidenceRole: "issue-context",
    sourceId: "SRC-WOWLIST-FACEBOOK-KNOW-CLOSING-2016"
  },
  {
    url: "http://www.sbdiy.org",
    firstSeenOrdinal: 30,
    firstSeenAt: "2016-06-28",
    missionContext: "organizer-infrastructure",
    evidenceRole: "organizer-resource",
    sourceId: "SRC-WOWLIST-SBDIY-ADOPTION"
  },
  {
    url: "https://youtu.be/nQg47LtixPI",
    firstSeenOrdinal: 49,
    firstSeenAt: "2015-08-14",
    missionContext: "organizer-infrastructure",
    evidenceRole: "independent-product-use",
    sourceId: "SRC-WOWLIST-SHELBY-TUTORIAL-2015"
  },
  {
    url: "http://dodiy.org",
    firstSeenOrdinal: 54,
    firstSeenAt: "2015-05-29",
    missionContext: "organizer-infrastructure",
    evidenceRole: "organizer-resource",
    sourceId: "SRC-WOWLIST-FACEBOOK-DODIY-RESOURCE"
  }
]);
const WOWLIST_FACEBOOK_APPROVED_PROJECTION_SEMANTICS = Object.freeze([
  {
    claimId: "CLM-WOWLIST-FACEBOOK-PUBLIC-OPERATING-RECORD",
    key: "archive-note",
    text: "A complete capture-date pass of the recovered WOW List Facebook feed preserves 57 posts spanning 2015-2018, with public-safe source and URL inventories."
  },
  {
    claimId: "CLM-WOWLIST-FACEBOOK-ORGANIZER-WORKFLOWS",
    key: "archive-note",
    text: "The recovered Facebook record documents organizer-facing onboarding, event-loading, tour-routing, and participatory product-governance workflows."
  },
  {
    claimId: "CLM-WOWLIST-FACEBOOK-CARE-AND-MOBILIZATION",
    key: "archive-note",
    text: "The recovered account routed venue-safety, mutual-aid, and civic-mobilization information alongside cultural events."
  }
]);
const NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS = Object.freeze({
  protectedIntakesSha256: "2479ac40c9228ec2b24fa7b1e9ce13c1cabcf0dead7e27878098ce4319d1a763",
  protectedSourcesSha256: "187dd3e085b0fddc64b2b7483ce31cd3a32ac82de1699d80435c9e3db9e8de5f",
  protectedObservationsSha256: "742064fc9245d685819d1a3909fdcec55c39d487d73bb59b8243d553c2ab6e8e",
  claimSha256: "c3ce0b7c30daef8d58b6caa976db3d09cf5a4f720afc9715ea92635dd07ba26f",
  inquirySha256: "f77f4dd54b53cf3c0147bedae063d811b75c73fdd1881ea0c57694d28f5cc65b"
});

export function loadKnowledgeEvalSuite() {
  return JSON.parse(readFileSync(suitePath, "utf8"));
}

function score(passed, strong = true) {
  return passed ? (strong ? 5 : 4) : 1;
}

function sameOrderedValues(actual, expected) {
  return actual?.length === expected.length &&
    actual.every((value, index) => value === expected[index]);
}

export function evaluateKnowledgeBank(suite = loadKnowledgeEvalSuite(), overrides = {}) {
  const holdoutLedger = JSON.parse(readFileSync(holdoutRunsPath, "utf8"));
  let consecutivePassingRuns = 0;
  for (const run of holdoutLedger.runs.toReversed()) {
    const passed = run.accepted === true &&
      run.weightedScore === 5 &&
      run.blockers.length === 0 &&
      run.criterionScores.length === suite.criteria.length &&
      run.criterionScores.every((criterionScore) => criterionScore === 5);
    if (!passed) break;
    consecutivePassingRuns += 1;
  }
  const holdoutEvidenceComplete = consecutivePassingRuns >= suite.targets.consecutivePassingRuns;
  const intakeById = new Map(knowledgeBank.intakeItems.map((item) => [item.id, item]));
  const observationById = new Map(knowledgeBank.observations.map((item) => [item.id, item]));
  const sourceById = new Map(knowledgeBank.sources.map((item) => [item.id, item]));
  const claimById = new Map(knowledgeBank.claims.map((item) => [item.id, item]));
  const entityById = new Map(knowledgeBank.entities.map((item) => [item.id, item]));
  const relationById = new Map(knowledgeBank.agencyRelations.map((item) => [item.id, item]));
  const inquiryById = new Map(knowledgeBank.researchInquiries.map((item) => [item.id, item]));
  const correctionById = new Map(knowledgeBank.corrections.map((item) => [item.id, item]));
  const fairRentPage = knowledgeBank.pages.find((page) => page.id === "fair-rent-nyc");
  const fairRentMdx = readFileSync(path.join(repoRoot, "apps/www/src/content/work/fair-rent-nyc.mdx"), "utf8");
  const errors = validateKnowledgeBank();
  const publicRegistryText = readFileSync(publicRegistryPath, "utf8");

  const kcTownHall = suite.pilot.kcTownHallCouncilFunding;
  const kcTownHallIntake = intakeById.get(kcTownHall.intakeId);
  const kcTownHallContributionIntake = intakeById.get(kcTownHall.contributionIntakeId);
  const kcTownHallTransitionIntake = intakeById.get(kcTownHall.transitionIntakeId);
  const kcTownHallSources = kcTownHall.sourceIds.map((id) => sourceById.get(id));
  const kcTownHallContributionSource = sourceById.get(kcTownHall.contributionSourceId);
  const kcTownHallObservations = kcTownHall.observationIds.map((id) => observationById.get(id));
  const kcTownHallContributionObservation = observationById.get(kcTownHall.contributionObservationId);
  const kcTownHallTransitionObservation = observationById.get(kcTownHall.transitionObservationId);
  const kcTownHallClaim = claimById.get(kcTownHall.claimId);
  const kcTownHallContributionClaim = claimById.get(kcTownHall.contributionClaimId);
  const kcTownHallInquiry = inquiryById.get(kcTownHall.inquiryId);
  const kcTownHallTransitionInquiry = inquiryById.get(kcTownHall.transitionInquiryId);
  const kcTownHallRelations = kcTownHall.relationIds.map((id) => relationById.get(id));
  const kcTownHallProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === kcTownHall.proofId
  );
  const kcTownHallProof = proofClaims.find((proof) => proof.id === kcTownHall.proofId);
  const kcTownHallPage = knowledgeBank.pages.find((page) => page.id === kcTownHall.pageId);
  const kcTownHallProofSourceIds = [...kcTownHall.sourceIds, kcTownHall.contributionSourceId];
  const kcTownHallProofCoverageSourceIds = [
    ...kcTownHallProofSourceIds,
    "SRC-KCTH-CCED-PROPOSAL-BUNDLE-2019",
    "SRC-KCTH-FIELD-PRACTICE-REVIEW-2026"
  ];
  const kcTownHallProofCoverageInquiryIds = [
    kcTownHall.inquiryId,
    "INQ-KCTH-PHASE-ONE-ROLE-AND-COMPLETION",
    "INQ-KCTH-SURVEY-DESIGN-AND-FIELD-PRACTICE"
  ];
  const kcTownHallSocialSourceIds = [
    "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
    "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
    "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
    "SRC-KCMO-COUNCIL-ROSTER-2018",
    "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"
  ];
  const kcTownHallPageSourceIds = [...kcTownHallProofSourceIds, ...kcTownHallSocialSourceIds];
  const kcTownHallMdx = overrides.kcTownHallMdx ?? readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/kc-town-hall.mdx"),
    "utf8"
  );
  const kcTownHallAdditionalPublicSurfaceText = overrides.kcTownHallAdditionalPublicSurfaceText ?? [
    readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8"),
    readFileSync(path.join(repoRoot, "apps/www/src/app/work/technical-operations/page.tsx"), "utf8")
  ].join("\n");
  const kcTownHallMdxSha256 = createHash("sha256")
    .update(kcTownHallMdx)
    .digest("hex");
  const kcTownHallMdxProse = kcTownHallMdx.replace(/<Claim[\s\S]*?\/>/g, "");
  const workSource = readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const kcTownHallWorkStart = workSource.indexOf('title: "KC Town Hall LLC"');
  const kcTownHallWorkEnd = workSource.indexOf("\n  {\n    title:", kcTownHallWorkStart + 1);
  const kcTownHallWorkText = workSource.slice(
    kcTownHallWorkStart,
    kcTownHallWorkEnd === -1 ? workSource.length : kcTownHallWorkEnd
  );
  const kcTownHallWorkSummary = kcTownHallWorkText.match(
    /summary:\s*\n\s*"([^"]+)"/
  )?.[1];
  const kcTownHallProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/kc-town-hall.md"),
    "utf8"
  );
  const expectedKcTownHallObservationSources = new Map([
    ["OBS-KC-TOWN-HALL-BOARD-RECOMMENDATION-190649", "SRC-KC-TOWN-HALL-RESOLUTION-190649"],
    ["OBS-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-190649", "SRC-KC-TOWN-HALL-RESOLUTION-190649"],
    ["OBS-KC-TOWN-HALL-COUNCIL-APPROPRIATION-190642", "SRC-KC-TOWN-HALL-ORDINANCE-190642"],
    ["OBS-KC-TOWN-HALL-NO-DISBURSEMENT-2022", "SRC-KC-TOWN-HALL-CCED-UPDATE-2022-05-17"],
    ["OBS-KC-TOWN-HALL-WITHDRAWAL-240317", "SRC-KC-TOWN-HALL-ORDINANCE-240317"]
  ]);
  const expectedKcTownHallRelations = new Map([
    ["REL-KC-CCED-BOARD-RECOMMENDED-TOWN-HALL", {
      actorId: "ENT-KC-CCED-BOARD",
      action: "recommended-for-funding",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING", {
      actorId: "ENT-JAMIE-BURKART",
      action: "co-led",
      objectId: "ENT-KC-TOWN-HALL-LLC",
      creditScope: "shared"
    }],
    ["REL-KC-COUNCIL-ACCEPTED-TOWN-HALL-RECOMMENDATION", {
      actorId: "ENT-KC-COUNCIL",
      action: "accepted-recommendation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-COUNCIL-APPROPRIATED-TOWN-HALL-FUNDS", {
      actorId: "ENT-KC-COUNCIL",
      action: "appropriated",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-TOWN-HALL-WITHDREW-CCED-PROJECT", {
      actorId: "ENT-KC-TOWN-HALL-LLC",
      action: "withdrew-from",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }],
    ["REL-KC-COUNCIL-RECLAIMED-TOWN-HALL-APPROPRIATION", {
      actorId: "ENT-KC-COUNCIL",
      action: "reclaimed-unused-appropriation",
      objectId: "ENT-KC-TOWN-HALL-CCED-APPROPRIATION",
      creditScope: "institutional"
    }]
  ]);
  const kcTownHallCaseStudyProjection = kcTownHallClaim?.projections.find(
    (projection) => projection.key === "case-study"
  );
  const kcTownHallContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: [kcTownHallIntake, kcTownHallContributionIntake, kcTownHallTransitionIntake],
    sources: [...kcTownHallSources, kcTownHallContributionSource],
    observations: [...kcTownHallObservations, kcTownHallContributionObservation, kcTownHallTransitionObservation],
    claims: [kcTownHallClaim, kcTownHallContributionClaim],
    inquiries: [kcTownHallInquiry, kcTownHallTransitionInquiry],
    relations: kcTownHallRelations,
    proof: kcTownHallProof,
    proofCoverage: kcTownHallProofCoverage,
    page: kcTownHallPage,
    work: kcTownHallWorkText,
    projectNote: kcTownHallProjectNote
  })).digest("hex");
  const hasKcTownHallLifecycle = (value) => Boolean(
    value &&
      /recommend/i.test(value) &&
      /accept(?:ed|ance)/i.test(value) &&
      /appropriat/i.test(value) &&
      /(?:no disbursement|no funds disbursed|absence of reported disbursement)/i.test(value) &&
      /(?:withdrew|withdrawal)/i.test(value) &&
      /unused/i.test(value)
  );
  const hasKcTownHallNegotiationBoundary = (value) => Boolean(
    value && /negotiat/i.test(value)
  );
  const hasKcTownHallOutcomeBoundary = (value) => Boolean(
    value &&
      /(?:no disbursement|no funds disbursed|reported no disbursement)/i.test(value) &&
      /(?:withdrew|withdrawal)/i.test(value) &&
      /unused/i.test(value)
  );
  const kcTownHallPublicText = [
    ...(kcTownHallClaim?.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text) ?? []),
    kcTownHallProof?.publicWording,
    kcTownHallProof?.shortWording,
    kcTownHallProof?.detailedPublicWording,
    kcTownHallWorkText,
    kcTownHallMdx
  ].filter(Boolean).join("\n");
  const kcTownHallForbiddenPatterns = [
    /KC Town Hall (?:received|spent|was paid) \$?490,?539/i,
    /KC Town Hall (?:secured|obtained|got|won|was granted|was awarded)[^.]{0,80}\$?490,?539/i,
    /(?:City|Council) (?:granted|gave|paid|funded|awarded) KC Town Hall[^.]{0,80}\$?490,?539/i,
    /funding agreement was executed/i,
    /Jamie[^.]{0,120}(?:secured|caused|won|obtained|persuaded|convinced|drove|delivered)[^.]{0,120}(?:Board|Council|recommendation|appropriation|funding)/i,
    /Jamie(?:'s|’s)?[^.]{0,120}(?:brought in|earned|got)[^.]{0,120}(?:\$?490,?539|City (?:funding|money|award))/i,
    /Jamie[^.]{0,120}(?:made|got)[^.]{0,80}(?:Board|Council|City)[^.]{0,80}(?:recommend|approve|fund|appropriate)/i,
    /Jamie[^.]{0,120}(?:responsible for|resulted in|led to)[^.]{0,120}(?:Board|Council|recommendation|appropriation)/i,
    /(?:Board|Council)[^.]{0,120}(?:because of|due to|as a result of)[^.]{0,80}Jamie/i,
    /City funded (?:construction|project completion)/i
  ];
  const kcTownHallMdxForbiddenPatterns = [
    /\$490,?539/i,
    ...kcTownHallForbiddenPatterns
  ];
  const kcTownHallEvidenceClosed = Boolean(
    kcTownHallClaim?.evidence.length === kcTownHall.sourceIds.length &&
      sameOrderedValues(kcTownHallClaim.evidence.map((evidence) => evidence.sourceId), kcTownHall.sourceIds) &&
      kcTownHallClaim.evidence.every((evidence) =>
        evidence.supports.length > 0 && evidence.supports.every((support) =>
          sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
        )
      )
  );
  const kcTownHallContributionEvidenceClosed = Boolean(
    kcTownHallContributionClaim?.evidence.length === 1 &&
      kcTownHallContributionClaim.evidence[0].sourceId === kcTownHall.contributionSourceId &&
      kcTownHallContributionClaim.evidence[0].supports.length > 0 &&
      kcTownHallContributionClaim.evidence[0].supports.every((support) =>
        kcTownHallContributionSource?.supportsGenerally.includes(support)
      )
  );
  const kcTownHallComplete = Boolean(
    kcTownHallIntake?.kind === "public-artifact" &&
      kcTownHallIntake.visibility === "public-safe" &&
      kcTownHallIntake.disposition === "integrated" &&
      sameOrderedValues(kcTownHallIntake.sourceIds, kcTownHall.sourceIds) &&
      sameOrderedValues(kcTownHallIntake.observationIds, kcTownHall.observationIds) &&
      kcTownHallIntake.researchInquiryIds.includes(kcTownHall.inquiryId) &&
      kcTownHallIntake.boundaries.length >= 3 &&
      kcTownHallContributionIntake?.kind === "public-artifact" &&
      kcTownHallContributionIntake.visibility === "public-safe" &&
      kcTownHallContributionIntake.disposition === "integrated" &&
      sameOrderedValues(kcTownHallContributionIntake.sourceIds, [kcTownHall.contributionSourceId]) &&
      sameOrderedValues(kcTownHallContributionIntake.observationIds, [kcTownHall.contributionObservationId]) &&
      kcTownHallContributionIntake.boundaries.length >= 3 &&
      kcTownHallTransitionIntake?.kind === "memory-lead" &&
      kcTownHallTransitionIntake.visibility === "public-safe" &&
      kcTownHallTransitionIntake.disposition === "researching" &&
      sameOrderedValues(kcTownHallTransitionIntake.sourceIds, []) &&
      sameOrderedValues(kcTownHallTransitionIntake.observationIds, [kcTownHall.transitionObservationId]) &&
      sameOrderedValues(kcTownHallTransitionIntake.researchInquiryIds, [kcTownHall.transitionInquiryId]) &&
      kcTownHallTransitionIntake.boundaries.length >= 3 &&
      kcTownHallSources.every((source) =>
        source?.kind === "government-record" &&
          source.visibility === "public" &&
          source.supportsGenerally.length > 0 &&
          source.doesNotEstablish.length >= 3
      ) &&
      kcTownHallContributionSource?.kind === "project-archive" &&
      kcTownHallContributionSource.visibility === "public" &&
      kcTownHallContributionSource.supportsGenerally.length >= 2 &&
      kcTownHallContributionSource.doesNotEstablish.length >= 4 &&
      kcTownHallObservations.every((observation) =>
        observation?.kind === "source-fact" &&
          observation.status === "verified" &&
          observation.publicSafe === true &&
          observation.sourceId === expectedKcTownHallObservationSources.get(observation.id) &&
          observation.locator &&
          observation.limitations.length >= 2 &&
          observation.claimIds.includes(kcTownHall.claimId) &&
          observation.researchInquiryIds.includes(kcTownHall.inquiryId)
      ) &&
      kcTownHallContributionObservation?.kind === "source-fact" &&
      kcTownHallContributionObservation.status === "verified" &&
      kcTownHallContributionObservation.publicSafe === true &&
      kcTownHallContributionObservation.sourceId === kcTownHall.contributionSourceId &&
      kcTownHallContributionObservation.locator &&
      kcTownHallContributionObservation.limitations.length >= 2 &&
      kcTownHallContributionObservation.claimIds.includes(kcTownHall.contributionClaimId) &&
      kcTownHallTransitionObservation?.kind === "participant-memory" &&
      kcTownHallTransitionObservation.status === "captured" &&
      kcTownHallTransitionObservation.publicSafe === true &&
      !kcTownHallTransitionObservation.sourceId &&
      kcTownHallTransitionObservation.locator &&
      kcTownHallTransitionObservation.limitations.length >= 3 &&
      sameOrderedValues(kcTownHallTransitionObservation.claimIds, []) &&
      sameOrderedValues(kcTownHallTransitionObservation.researchInquiryIds, [kcTownHall.transitionInquiryId]) &&
      kcTownHallClaim?.status === "confirmed-with-boundary" &&
      kcTownHallClaim.boundaries.length >= 3 &&
      kcTownHallClaim.antiClaims.length >= 6 &&
      kcTownHallClaim.researchInquiryIds.includes(kcTownHall.inquiryId) &&
      kcTownHallCaseStudyProjection?.status === "active" &&
      kcTownHallCaseStudyProjection.citationRequired === true &&
      sameOrderedValues(kcTownHallCaseStudyProjection.surfaces, ["/work/kc-town-hall"]) &&
      kcTownHallClaim.projections.some((projection) =>
        projection.key === "archive-note" &&
          projection.status === "active" &&
          projection.citationRequired === true &&
          sameOrderedValues(projection.surfaces, ["docs/knowledge-bank/projects/kc-town-hall"])
      ) &&
      kcTownHallEvidenceClosed &&
      kcTownHallContributionClaim?.status === "confirmed-with-boundary" &&
      kcTownHallContributionClaim.boundaries.length >= 3 &&
      kcTownHallContributionClaim.antiClaims.length >= 4 &&
      kcTownHallContributionClaim.projections.some((projection) =>
        projection.key === "case-study" &&
          projection.status === "active" &&
          projection.citationRequired === true &&
          sameOrderedValues(projection.surfaces, ["/work/kc-town-hall"])
      ) &&
      kcTownHallContributionEvidenceClosed &&
      kcTownHallInquiry?.resultStatus === "recovered" &&
      sameOrderedValues(kcTownHallInquiry.sourceIds, kcTownHall.sourceIds) &&
      kcTownHallInquiry.findings.length >= 4 &&
      kcTownHallInquiry.limitations.length >= 3 &&
      kcTownHallTransitionInquiry?.resultStatus === "inconclusive" &&
      sameOrderedValues(kcTownHallTransitionInquiry.sourceIds, []) &&
      kcTownHallTransitionInquiry.findings.length >= 1 &&
      kcTownHallTransitionInquiry.limitations.length >= 3 &&
      kcTownHallProofCoverage?.status === "partially-source-backed" &&
      sameOrderedValues(kcTownHallProofCoverage.sourceIds, kcTownHallProofCoverageSourceIds) &&
      sameOrderedValues(kcTownHallProofCoverage.researchInquiryIds, kcTownHallProofCoverageInquiryIds) &&
      /Resolution 190649/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /Ordinance 190642/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /May 17, 2022/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /Ordinance 240317/.test(kcTownHallProof?.sourceBasis ?? "") &&
      /approved resume/i.test(kcTownHallProof?.sourceBasis ?? "") &&
      /municipal records[^.]*do not establish Jamie/i.test(kcTownHallProof?.sourceBasis ?? "") &&
      sameOrderedValues(kcTownHallPage?.sourceOrder, kcTownHallPageSourceIds) &&
      kcTownHallPage?.occurrences.length === 3 &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "council-appropriation-lifecycle" &&
          occurrence.claimId === kcTownHall.claimId &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, kcTownHall.sourceIds)
      ) &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "jamie-planning-contribution" &&
          occurrence.claimId === kcTownHall.contributionClaimId &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, [kcTownHall.contributionSourceId])
      ) &&
      kcTownHallPage.occurrences.some((occurrence) =>
        occurrence.id === "public-service-interface" &&
          occurrence.claimId === "CLM-KCTH-SOCIAL-SERVICE-REPORTING" &&
          occurrence.projection === "case-study" &&
          sameOrderedValues(occurrence.sourceIds, kcTownHallSocialSourceIds)
      ) &&
      kcTownHallRelations.length === expectedKcTownHallRelations.size &&
      kcTownHallRelations.every((relation) => {
        const expected = relation && expectedKcTownHallRelations.get(relation.id);
        return Boolean(expected &&
          sameOrderedValues(relation.actorIds, [expected.actorId]) &&
          relation.action === expected.action &&
          relation.objectId === expected.objectId &&
          relation.creditScope === expected.creditScope &&
          relation.status === "confirmed-with-boundary" &&
          relation.claimIds.includes(
            relation.id === "REL-JAMIE-COLED-KC-TOWN-HALL-PLANNING"
              ? kcTownHall.contributionClaimId
              : kcTownHall.claimId
          ) &&
          relation.sourceSupportKeys.length > 0 &&
          relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
            (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
          )) &&
          relation.boundaries.length > 0);
      }) &&
      kcTownHallMdx.includes(`claimId="${kcTownHall.claimId}"`) &&
      kcTownHallMdx.includes('occurrenceId="council-appropriation-lifecycle"') &&
      kcTownHallMdx.includes(`claimId="${kcTownHall.contributionClaimId}"`) &&
      kcTownHallMdx.includes('occurrenceId="jamie-planning-contribution"') &&
      kcTownHallMdxSha256 === kcTownHall.approvedMdxSha256 &&
      kcTownHallContentSha256 === kcTownHall.approvedContentSha256 &&
      hasKcTownHallLifecycle(kcTownHallCaseStudyProjection.text) &&
      hasKcTownHallNegotiationBoundary(kcTownHallCaseStudyProjection.text) &&
      hasKcTownHallLifecycle(kcTownHallProof?.publicWording) &&
      hasKcTownHallNegotiationBoundary(kcTownHallProof?.publicWording) &&
      hasKcTownHallLifecycle(kcTownHallProof?.detailedPublicWording) &&
      hasKcTownHallNegotiationBoundary(kcTownHallProof?.detailedPublicWording) &&
      hasKcTownHallLifecycle(kcTownHallWorkSummary) &&
      hasKcTownHallNegotiationBoundary(kcTownHallWorkSummary) &&
      hasKcTownHallOutcomeBoundary(kcTownHallProof?.shortWording) &&
      kcTownHallForbiddenPatterns.every((pattern) => !pattern.test(kcTownHallPublicText)) &&
      kcTownHallMdxForbiddenPatterns.every((pattern) => !pattern.test(kcTownHallMdxProse))
  );

  const pilotIntakes = suite.pilot.intakeIds.map((id) => intakeById.get(id));
  const pilotSources = suite.pilot.sourceIds.map((id) => sourceById.get(id));
  const pilotClaims = suite.pilot.claimIds.map((id) => claimById.get(id));
  const pilotInquiries = suite.pilot.inquiryIds.map((id) => inquiryById.get(id));
  const pilotObservations = pilotIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const expansion = suite.pilot.sourceExpansion;
  const expansionIntakes = expansion.intakeIds.map((id) => intakeById.get(id));
  const expansionSources = expansion.sourceIds.map((id) => sourceById.get(id));
  const expansionClaims = expansion.claimIds.map((id) => claimById.get(id));
  const expansionInquiries = expansion.inquiryIds.map((id) => inquiryById.get(id));
  const expansionObservations = expansionIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const secondExpansion = suite.pilot.secondSourceExpansion;
  const secondExpansionIntakes = secondExpansion.intakeIds.map((id) => intakeById.get(id));
  const secondExpansionSources = secondExpansion.sourceIds.map((id) => sourceById.get(id));
  const secondExpansionClaims = secondExpansion.claimIds.map((id) => claimById.get(id));
  const secondExpansionInquiries = secondExpansion.inquiryIds.map((id) => inquiryById.get(id));
  const secondExpansionObservations = secondExpansionIntakes.flatMap((item) =>
    item?.observationIds.map((id) => observationById.get(id)) ?? []
  );
  const institutional = suite.pilot.institutionalCapacity;
  const institutionalIntake = intakeById.get(institutional.intakeId);
  const institutionalClaim = claimById.get(institutional.claimId);
  const institutionalInquiry = inquiryById.get(institutional.inquiryId);
  const institutionalSource = sourceById.get(institutional.correctedSourceId);
  const institutionalCorrection = correctionById.get(institutional.correctionId);
  const institutionalObservations = institutional.observationIds.map((id) => observationById.get(id));
  const institutionalRelations = institutional.relationIds.map((id) => relationById.get(id));
  const institutionalAffirmativeText = [
    institutionalClaim?.internalClaim,
    ...(institutionalClaim?.projections.map((projection) => projection.text) ?? []),
    ...(institutionalClaim?.evidence.flatMap((evidence) => evidence.supports) ?? []),
    ...institutionalObservations.map((observation) => observation?.text),
    ...institutionalRelations.flatMap((relation) => [relation?.purpose, relation?.result]),
    ...(institutionalInquiry?.findings ?? []),
    institutionalInquiry?.publicSummary
  ].filter(Boolean).join("\n");
  const institutionalPublicText = [
    fairRentMdx,
    ...knowledgeBank.claims.flatMap((claim) =>
      claim.projections.filter((projection) => projection.status === "active").map((projection) => projection.text)
    )
  ].join("\n");
  const institutionalRelevantProjects = new Set([
    "nyc-artist-coalition",
    "createnyc",
    "cabaret-law",
    "office-of-nightlife",
    "talks-not-raids"
  ]);
  const institutionalRelevantClaimText = knowledgeBank.claims
    .filter((claim) => institutionalRelevantProjects.has(claim.project))
    .flatMap((claim) => [claim.internalClaim, ...claim.projections.map((projection) => projection.text)])
    .join("\n");
  const agencyAffirmativeText = knowledgeBank.agencyRelations
    .flatMap((relation) => [relation.purpose, relation.result])
    .join("\n");
  const institutionalRelatedClaimsSha256 = createHash("sha256").update(JSON.stringify(
    knowledgeBank.claims
      .filter((claim) => institutionalRelevantProjects.has(claim.project))
      .map((claim) => ({
        id: claim.id,
        project: claim.project,
        internalClaim: claim.internalClaim,
        status: claim.status,
        projections: claim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
        boundaries: claim.boundaries,
        antiClaims: claim.antiClaims
      }))
  )).digest("hex");
  const institutionalRelatedClaimsApproved =
    institutionalRelatedClaimsSha256 === institutional.approvedRelatedClaimsSha256;
  const institutionalContentSha256 = createHash("sha256").update(JSON.stringify({
    claim: institutionalClaim && {
      internalClaim: institutionalClaim.internalClaim,
      projections: institutionalClaim.projections.map(({ key, text, status, surfaces }) => ({ key, text, status, surfaces })),
      evidence: institutionalClaim.evidence.map(({ sourceId, relationship, supports, locator }) => ({ sourceId, relationship, supports, locator }))
    },
    observations: institutionalObservations.map((observation) => observation && ({
      id: observation.id,
      text: observation.text,
      limitations: observation.limitations
    })),
    relations: institutionalRelations.map((relation) => relation && ({
      id: relation.id,
      actorIds: relation.actorIds,
      action: relation.action,
      objectId: relation.objectId,
      purpose: relation.purpose,
      result: relation.result,
      creditScope: relation.creditScope,
      sourceIds: relation.sourceIds,
      sourceSupportKeys: relation.sourceSupportKeys,
      boundaries: relation.boundaries
    })),
    inquiry: institutionalInquiry && {
      findings: institutionalInquiry.findings,
      limitations: institutionalInquiry.limitations,
      publicSummary: institutionalInquiry.publicSummary
    }
  })).digest("hex");
  const institutionalContentApproved = institutionalContentSha256 === institutional.approvedContentSha256;
  const institutionalOverclaimPatterns = [
    /\b(?:depend(?:ed|ent|ence|ency|s|ing)?|indispensable|essential|necessary|vital|only validation|no alternative|could not act|unable to act|relied(?: entirely)? on|required (?:NYC Artist Coalition|the coalition))\b/i,
    /\b(?:Finkelpearl|(?:Rafael )?Espinal|DCLA|(?:the )?(?:New York )?City Council)\b[^.]{0,120}\b(?:needed|wanted|required|relied(?: entirely)? on|depended(?: entirely)? on|could not act without|political cover)\b/i,
    /\bprivate motive (?:is|was) known\b/i,
    /\b(?:Jamie|NYC Artist Coalition|Finkelpearl|(?:Rafael )?Espinal)\b[^.]{0,100}\b(?:authored|wrote|drafted|enacted|passed|created|secured|delivered)\b[^.]{0,80}\b(?:law|local law|repeal|office|reform)\b/i,
    /\b(?:Jamie|NYC Artist Coalition)\b[^.]{0,100}\b(?:caused|made possible)\b[^.]{0,80}\b(?:law|repeal|office|reform)\b/i,
    /\b(?:NYC Artist Coalition|the coalition)\b[^.]{0,100}\b(?:was |were )?(?:indispensable|essential|necessary)\b[^.]{0,80}\b(?:Council|DCLA|Finkelpearl|Espinal)\b/i,
    /\b(?:Finkelpearl|(?:Rafael )?Espinal|DCLA|(?:the )?(?:New York )?City Council)\b[^.]{0,120}\b(?:indispensable|essential|necessary|only because|unstated reason|decisive evidence)\b/i,
    /\b(?:enabled\b[^.]{0,100}\benact|decisive reason|(?:would have been|was) unable\b[^.]{0,100}\bwithout|privately sought\b[^.]{0,100}\bvalidation|guaranteed passage|owed the success of)\b/i,
    /\b(?:only because|unstated reason|decisive evidence|resulted from|verbatim)\b/i,
    /\bin response to\b[^.]{0,120}\b(?:NYC Artist Coalition|coalition) testimony\b/i,
    /\b(?:furnished|supplied|gave)\b[^.]{0,120}\b(?:Council|repeal|enacted policy)\b[^.]{0,80}\b(?:rationale|basis|policy)\b/i,
    /\b(?:Finkelpearl|DCLA)\b[^.]{0,100}\bused\b[^.]{0,100}\b(?:rescue|legitimacy)\b/i,
    /\b(?:Council|Espinal)\b[^.]{0,100}\b(?:followed|adopted)\b[^.]{0,80}\b(?:coalition|NYC Artist Coalition)\b[^.]{0,40}\b(?:blueprint|agenda)\b/i,
    /\b(?:NYC Artist Coalition|coalition) testimony\b[^.]{0,80}\bmoved\b[^.]{0,40}\bEspinal\b/i,
    /\bpolicy alignment proves\b/i
  ];
  const institutionalOverclaimFree = institutionalOverclaimPatterns.every(
    (pattern) => !pattern.test(institutionalAffirmativeText) &&
      !pattern.test(institutionalRelevantClaimText) &&
      !pattern.test(institutionalPublicText) &&
      !pattern.test(agencyAffirmativeText)
  );
  const staleCabaretHearingDateFree = !(
    /\bJune 19, 2017\b[^.]{0,100}\b(?:Council|Cabaret|hearing)\b/i.test(institutionalRelevantClaimText) ||
    /\b(?:Council|Cabaret|hearing)\b[^.]{0,100}\bJune 19, 2017\b/i.test(institutionalRelevantClaimText)
  );
  const institutionalEvidenceClosed = Boolean(
    institutionalClaim?.evidence.length === institutionalIntake?.sourceIds.length &&
    institutionalClaim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const cabaretAlignment = observationById.get("OBS-NYCAC-CABARET-POLICY-ALIGNMENT");
  const officeAlignment = observationById.get("OBS-NYCAC-OFFICE-POLICY-ALIGNMENT");
  const hearingEvidence = institutionalClaim?.evidence.find(
    (evidence) => evidence.sourceId === institutional.correctedSourceId
  );
  const expectedInstitutionalRelations = new Map([
    ["REL-DCLA-CONVENED-DIY-MEETING", { actorId: "ENT-NYC-DCLA", action: "convened", objectId: "ENT-DCLA-DIY-MEETING-2017", creditScope: "institutional" }],
    ["REL-FINKELPEARL-CITED-NYCAC-PUBLIC-PROCESS-OUTCOME", { actorId: "ENT-TOM-FINKELPEARL", action: "cited-as-public-process-outcome", objectId: "ENT-NYC-ARTIST-COALITION", creditScope: "individual" }],
    ["REL-ESPINAL-CHAIRED-CABARET-REFORM-HEARING", { actorId: "ENT-RAFAEL-ESPINAL", action: "chaired-hearing-for", objectId: "ENT-CABARET-REFORM-HEARING-2017", creditScope: "individual" }],
    ["REL-COUNCIL-CONVENED-CABARET-REFORM-HEARING", { actorId: "ENT-NYC-COUNCIL", action: "convened", objectId: "ENT-CABARET-REFORM-HEARING-2017", creditScope: "institutional" }]
  ]);
  const institutionalCapacityComplete = Boolean(
    institutionalIntake?.kind === "analysis-note" &&
      institutionalIntake.disposition === "integrated" &&
      institutionalIntake.visibility === "public-safe" &&
      institutionalIntake.sourceIds.length >= 7 &&
      institutionalIntake.boundaries.some((boundary) => /private motive/i.test(boundary)) &&
      institutionalIntake.boundaries.some((boundary) => /dependency|sole causation/i.test(boundary)) &&
      institutionalObservations.every(
        (observation) => observation?.kind === "bounded-inference" &&
          (observation.comparisonSourceIds.length
            ? observation.status === "corroborated"
            : observation.status === "extracted") &&
          observation.locator &&
          observation.limitations.length &&
          observation.claimIds.includes(institutional.claimId) &&
          observation.researchInquiryIds.includes(institutional.inquiryId) &&
          observation.comparisonSourceIds.every((sourceId) => institutionalIntake.sourceIds.includes(sourceId))
      ) &&
      cabaretAlignment?.comparisonSourceIds.includes(institutional.correctedSourceId) &&
      officeAlignment?.comparisonSourceIds.includes("SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17") &&
      officeAlignment.comparisonSourceIds.includes("SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12") &&
      institutionalClaim?.status === "inference" &&
      institutionalClaim.projections.length > 0 &&
      institutionalClaim.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      institutionalClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19"
      ) &&
      institutionalClaim.evidence.some(
        (evidence) => evidence.sourceId === institutional.correctedSourceId
      ) &&
      hearingEvidence?.supports.some((supported) => /request for stakeholder testimony/i.test(supported)) &&
      !hearingEvidence?.supports.some((supported) => /stated need/i.test(supported)) &&
      institutionalClaim.boundaries.some((boundary) => /private|privately/i.test(boundary)) &&
      institutionalClaim.boundaries.some((boundary) => /caus|agency|enactment/i.test(boundary)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /depended|could not act/i.test(antiClaim)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /private motive/i.test(antiClaim)) &&
      institutionalClaim.antiClaims.some((antiClaim) => /authored or enacted|caused/i.test(antiClaim)) &&
      institutionalInquiry?.resultStatus === "partially-recovered" &&
      institutionalInquiry.sourceIds.length >= 7 &&
      institutionalInquiry.limitations.some((limitation) => /private communications|personal motive/i.test(limitation)) &&
      institutionalInquiry.limitations.some((limitation) => /causal|causation/i.test(limitation)) &&
      institutionalSource?.publishedAt === "2017-09-14" &&
      /September 14, 2017/.test(institutionalSource.publicCitation) &&
      institutionalSource.doesNotEstablish.some((boundary) => /private motive/i.test(boundary)) &&
      sourceById.get("SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19")?.doesNotEstablish.some(
        (boundary) => /private motive/i.test(boundary)
      ) &&
      sourceById.get("SRC-NYCAC-DCLA-BUDGET-HEARING-2017-05-19")?.doesNotEstablish.some(
        (boundary) => /dependency/i.test(boundary)
      ) &&
      institutionalCorrection?.status === "active" &&
      institutionalCorrection.claimId === "CLM-NYCAC-CABARET-TESTIMONY-2017" &&
      institutionalCorrection.previousText === "June 19, 2017" &&
      institutionalCorrection.replacementText === "September 14, 2017" &&
      /official transcript title page/i.test(institutionalCorrection.reason) &&
      /September 14, 2017/.test(institutionalCorrection.reason) &&
      ["/work/fair-rent-nyc", "knowledge-bank", "public-citation-registry"].every(
        (surface) => institutionalCorrection.affectedSurfaces.includes(surface)
      ) &&
      institutionalCorrection.affectedSurfaces.length === 3 &&
      institutionalContentApproved &&
      institutionalRelatedClaimsApproved &&
      institutionalOverclaimFree &&
      staleCabaretHearingDateFree &&
      institutionalEvidenceClosed &&
      institutionalRelations.length === expectedInstitutionalRelations.size &&
      institutionalRelations.every(
        (relation) => {
          const expected = relation && expectedInstitutionalRelations.get(relation.id);
          return Boolean(expected && relation.actorIds.length === 1 &&
          relation.actorIds[0] === expected.actorId &&
          relation.action === expected.action &&
          relation.objectId === expected.objectId &&
          relation.creditScope === expected.creditScope &&
          relation.status === "confirmed-with-boundary" &&
          relation.claimIds.includes(institutional.claimId) &&
          relation.boundaries.length &&
          relation.sourceSupportKeys.length &&
          relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
            (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
          )));
        }
      ) &&
      institutionalRelations.some((relation) => relation?.creditScope === "individual") &&
      institutionalRelations.some((relation) => relation?.creditScope === "institutional")
  );
  const pressArchive = suite.pilot.pressArchive;
  const pressIntakes = pressArchive.intakeIds.map((id) => intakeById.get(id));
  const pressIndexSources = pressArchive.indexSourceIds.map((id) => sourceById.get(id));
  const pressClaim = claimById.get(pressArchive.claimId);
  const pressInquiry = inquiryById.get(pressArchive.inquiryId);
  const pressEntries = campaignPressInventory.flatMap((campaign) => campaign.entries);
  const uniquePressArticleSourceIds = [...new Set(pressEntries.map((entry) => entry.sourceId))];
  const pressArticleSources = uniquePressArticleSourceIds.map((id) => sourceById.get(id));
  const pressObservations = nycacPressArchive.observations;
  const placementObservationIds = new Set(
    pressEntries.map((entry) => `OBS-NYCAC-PRESS-${entry.id}`)
  );
  const pressPlacementObservations = pressObservations.filter((observation) =>
    placementObservationIds.has(observation.id)
  );
  const pressReadingObservations = pressObservations.filter((observation) =>
    observation.id.startsWith("OBS-NYCAC-PRESS-READING-")
  );
  const pressAttributionObservations = pressObservations.filter((observation) =>
    observation.id.startsWith("OBS-NYCAC-PRESS-ATTRIBUTION-")
  );
  const pressObservationIds = new Set(pressObservations.map((observation) => observation.id));
  const referencedPressObservationIds = new Set(
    pressIntakes.flatMap((intake) => intake?.observationIds ?? [])
  );
  const pressReadingSourceIds = new Set(nycacPressReadings.map((reading) => reading.sourceId));
  const pressWaybackRouteSourceIds = new Set(
    pressEntries.filter((entry) => entry.archiveUrl?.includes("web.archive.org/web/")).map((entry) => entry.sourceId)
  );
  const partialReadings = nycacPressReadings.filter((reading) => reading.reviewExtent === "headline-and-deck");
  const cityLabReading = nycacPressReadings.find(
    (reading) => reading.sourceId === pressArchive.redirectTrapSourceId
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
      nycacPressReadings.length === pressArchive.expectedReadingCount &&
      pressReadingSourceIds.size === pressArchive.expectedUniqueArticleCount &&
      uniquePressArticleSourceIds.every((sourceId) => pressReadingSourceIds.has(sourceId)) &&
      nycacPressReadings.filter((reading) => reading.reviewExtent === "recovered-body").length === pressArchive.expectedRecoveredBodyCount &&
      partialReadings.length === pressArchive.expectedPartialReadingCount &&
      partialReadings[0]?.sourceId === pressArchive.partialSourceId &&
      nycacPressReadings.filter((reading) => reading.recoveryMode === "publisher-body").length === pressArchive.expectedPublisherReadingCount &&
      nycacPressReadings.filter((reading) => reading.recoveryMode === "wayback-body").length === pressArchive.expectedWaybackReadingCount &&
      pressWaybackRouteSourceIds.size === pressArchive.expectedWaybackRouteCount &&
      uniquePressArticleSourceIds.every((sourceId) => pressWaybackRouteSourceIds.has(sourceId)) &&
      pressArticleSources.every((source) =>
        source?.archiveUrl?.includes("web.archive.org/web/") &&
        source.preservationStatus !== "live"
      ) &&
      nycacPressReadings.filter((reading) => reading.mentionsJamie).length === pressArchive.expectedJamieNamedCount &&
      nycacPressReadings.filter((reading) => reading.mentionsCoalition).length === pressArchive.expectedCoalitionNamedCount &&
      nycacPressReadings.reduce((total, reading) => total + reading.directAttributions.length, 0) === pressArchive.expectedDirectAttributionCount &&
      nycacPressReadings.every((reading) =>
        /^[a-f0-9]{64}$/.test(reading.contentSha256) &&
        reading.reviewedCharacterCount >= 2000 &&
        reading.summary.length >= 40 &&
        reading.locator.length >= 20 &&
        reading.supportsGenerally.length >= 1 &&
        reading.doesNotEstablish.length >= 2 &&
        reading.reviewedAt === "2026-07-14"
      ) &&
      cityLabReading?.recoveryMode === "wayback-body" &&
      cityLabReading.retrievalUrl.includes("web.archive.org/web/") &&
      !cityLabReading.retrievalUrl.endsWith("/citylab") &&
      Object.entries(pressArchive.campaignEntryCounts).every(
        ([campaignId, expected]) => pressCounts[campaignId] === expected
      ) &&
      duplicateAppearanceCount === 2 &&
      pressIntakes.length === pressArchive.expectedIndexCount &&
      pressIntakes.every(
        (intake) => intake?.disposition === "integrated" && intake.sourceIds.length > 1 && intake.boundaries.length >= 3 && intake.observationIds.length
      ) &&
      referencedPressObservationIds.size === pressObservationIds.size &&
      [...pressObservationIds].every((observationId) => referencedPressObservationIds.has(observationId)) &&
      pressIndexSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressArticleSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
      pressPlacementObservations.length === pressArchive.expectedAppearanceCount &&
      pressPlacementObservations.every(
        (observation) => observation?.locator && observation.limitations.length && observation.claimIds.includes(pressArchive.claimId) && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressReadingObservations.length === pressArchive.expectedReadingCount &&
      pressReadingObservations.every(
        (observation) => observation?.sourceId && pressReadingSourceIds.has(observation.sourceId) && observation.locator && observation.limitations.length >= 2 && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressAttributionObservations.length === pressArchive.expectedDirectAttributionCount &&
      pressAttributionObservations.every(
        (observation) => observation?.sourceId && pressReadingSourceIds.has(observation.sourceId) && observation.locator && observation.limitations.length >= 2 && observation.researchInquiryIds.includes(pressArchive.inquiryId)
      ) &&
      pressClaim?.projections.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      pressClaim.evidence.length === pressArchive.expectedIndexCount &&
      pressInquiry?.sourceIds.length === pressArchive.expectedIndexCount + pressArchive.expectedUniqueArticleCount &&
      pressInquiry.resultStatus === "partially-recovered" &&
      pressInquiry.limitations.length >= 6
  );
  const archive = suite.pilot.archiveProduction;
  const archiveIntakes = archive.intakeIds.map((id) => intakeById.get(id));
  const archiveObservations = archive.observationIds.map((id) => observationById.get(id));
  const archiveSources = archive.sourceIds.map((id) => sourceById.get(id));
  const archivePublicSources = archive.publicSourceIds.map((id) => sourceById.get(id));
  const archivePrivateSources = archive.privateSourceIds.map((id) => sourceById.get(id));
  const archiveClaims = archive.claimIds.map((id) => claimById.get(id));
  const archiveHeldClaims = archive.heldClaimIds.map((id) => claimById.get(id));
  const archiveActiveClaims = archive.activeClaimIds.map((id) => claimById.get(id));
  const archiveInquiries = archive.inquiryIds.map((id) => inquiryById.get(id));
  const archiveFairRentPage = knowledgeBank.pages.find((page) => page.id === archive.fairRentPageId);
  const archiveLabPage = knowledgeBank.pages.find((page) => page.id === archive.labPageId);
  const archiveLabSource = readFileSync(
    path.join(repoRoot, "apps/www/src/app/lab/source-backed-team-memory/page.tsx"),
    "utf8"
  );
  const archiveProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/archive-production-2026-07-14.md"),
    "utf8"
  );
  const archiveProofIds = [
    "fair-rent-campaign-memory",
    "fair-rent-source-map",
    "source-backed-team-memory-method",
    "ai-evals-professional-development"
  ];
  const archiveProofCoverage = archiveProofIds.map((proofId) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === proofId)
  );
  const archiveContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: archiveIntakes,
    observations: archiveObservations,
    sources: archiveSources,
    claims: archiveClaims,
    inquiries: archiveInquiries,
    fairRentPage: archiveFairRentPage,
    labPage: archiveLabPage,
    proofCoverage: archiveProofCoverage,
    fairRentMdx,
    labSource: archiveLabSource,
    projectNote: archiveProjectNote
  })).digest("hex");
  const archivePublicUrlsAreHttps = archivePublicSources.every((source) => {
    const url = source?.canonicalUrl ?? source?.archiveUrl ?? source?.assetUrl;
    return Boolean(url && /^https:\/\//.test(url));
  });
  const archiveEvidenceClosed = archiveClaims.every((claim) =>
    claim?.evidence.length && claim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const archivePrivateIds = new Set([
    ...archive.privateSourceIds,
    ...archivePrivateSources.map((source) => source?.protectedLocatorId).filter(Boolean)
  ]);
  const archivePublicBundleSafe = [...archivePrivateIds].every(
    (privateId) => !publicRegistryText.includes(privateId)
  ) && ![
    "/Users/",
    "Mobile Documents",
    "CloudDocs",
    "Jonathan Marmor",
    "$2,500"
  ].some((privateText) => publicRegistryText.includes(privateText));
  const archiveProofCoverageComplete = Boolean(
    archiveProofCoverage.every(Boolean) &&
      archiveProofCoverage[0].status === "protected-support" &&
      sameOrderedValues(archiveProofCoverage[0].sourceIds, [
        "SRC-CRS-RUNNING-MEMORY-2026",
        "SRC-JAMIE-APPROVED-RESUME-2026-06-11"
      ]) &&
      archiveProofCoverage[0].researchInquiryIds.includes(archive.crsInquiryId) &&
      archiveProofCoverage[1].status === "protected-support" &&
      archiveProofCoverage[1].sourceIds.includes("SRC-CRS-PROVENANCE-REDLINE-2026") &&
      archiveProofCoverage[1].sourceIds.includes("SRC-JAMIE-APPROVED-RESUME-2026-06-11") &&
      archiveProofCoverage[1].researchInquiryIds.includes(archive.crsInquiryId) &&
      archiveProofCoverage[2].status === "protected-support" &&
      sameOrderedValues(archiveProofCoverage[2].sourceIds, ["SRC-SOURCE-BACKED-MEMORY-PROPOSAL-2026"]) &&
      archiveProofCoverage[2].researchInquiryIds.includes(archive.methodInquiryId) &&
      archiveProofCoverage[3].status === "source-backed" &&
      sameOrderedValues(archiveProofCoverage[3].sourceIds, [archive.certificateSourceId]) &&
      archiveProofCoverage[3].researchInquiryIds.length === 0
  );
  const sourceBackedMethodClaim = claimById.get("CLM-SOURCE-BACKED-MEMORY-METHOD-2026");
  const sourceBackedMethodText = [
    sourceBackedMethodClaim?.internalClaim,
    ...(sourceBackedMethodClaim?.projections.map((projection) => projection.text) ?? [])
  ].filter(Boolean).join("\n");
  const sourceBackedMethodStatusBounded = !/(?:completed|deployed|launched|adopted)[^.]{0,80}(?:client|production|pilot|product|platform)|market validation/i.test(
    sourceBackedMethodText
  );
  const nterClaim = claimById.get(archive.nterClaimId);
  const nterInquiry = inquiryById.get(archive.nterInquiryId);
  const nterProtectedIntakes = archive.nterProtectedIntakeIds.map((id) => intakeById.get(id));
  const nterProtectedSources = archive.nterProtectedSourceIds.map((id) => sourceById.get(id));
  const nterProtectedObservations = archive.nterProtectedObservationIds.map((id) => observationById.get(id));
  const nterProtectedEvidence = nterClaim?.evidence.filter(
    (evidence) => archive.nterProtectedSourceIds.includes(evidence.sourceId)
  ) ?? [];
  const nterClaimText = [
    nterClaim?.internalClaim,
    ...(nterClaim?.projections.map((projection) => projection.text) ?? [])
  ].filter(Boolean).join("\n");
  const nterAffirmativeText = [
    ...nterProtectedIntakes.flatMap((intake) => [intake?.reason]),
    ...nterProtectedSources.flatMap((source) => [
      source?.publicCitation,
      source?.publicNote,
      ...(source?.supportsGenerally ?? [])
    ]),
    ...nterProtectedObservations.map((observation) => observation?.text),
    nterClaim?.internalClaim,
    ...(nterClaim?.projections.map((projection) => projection.text) ?? []),
    ...(nterClaim?.evidence.flatMap((evidence) => evidence.supports) ?? []),
    ...(nterInquiry?.findings ?? []),
    nterInquiry?.publicSummary
  ].filter(Boolean).join("\n");
  const nterSharedCreditPreserved = Boolean(
    nterClaim?.internalClaim.includes("Drew Bolton") &&
      nterClaim.internalClaim.includes("Jamie Burkart") &&
      nterClaim.internalClaim.includes("Garrett Fuselier") &&
      nterClaim.projections.every((projection) =>
        projection.text.includes("Drew Bolton") && projection.text.includes("Garrett Fuselier")
      ) &&
      nterProtectedObservations.find(
        (observation) => observation?.id === "OBS-NTER-CHNG-EXHIBIT-INFO-COLLECTIVE-CREDIT-2011"
      )?.text.includes("Drew Bolton, Jamie Burkart, and Garrett Fuselier")
  );
  const nterSemanticInflationSafe = ![
    /\bJamie(?: Burkart)?(?: was| served as)? (?:the )?(?:software|installation|technical|fabrication|production) lead\b/i,
    /\bJamie(?:'s| Burkart's) sole creation\b|\bJamie(?: Burkart)? (?:alone|solely) (?:created|built|designed|programmed|developed)/i,
    /\bJamie(?: Burkart)? (?:personally )?(?:completed|led|owned|implemented|maintained|installed|fabricated|executed)[^.]{0,100}(?:NTER CHNG|software|server|wall|restaging|installation)/i,
    /\b(?:completed every task|completed (?:the )?(?:restaging|installation))\b/i,
    /\b(?:America: Now and Here|Barbara Kruger)[^.]{0,80}(?:commissioned|awarded|endorsed) NTER CHNG\b/i,
    /\bNTER CHNG[^.]{0,80}(?:won|received|was (?:commissioned|awarded|endorsed))\b/i,
    /\b(?:hundreds|thousands) of (?:visitors|participants|people)\b|\bexceptional engagement\b|\btransformative impact\b|\bbroad adoption\b/i,
    /\b(?:direct(?:ly)? collaborated|direct collaboration) with Barbara Kruger\b/i,
    /\bNTER CHNG[^.]{0,100}(?:displayed|shown|installed)[^.]{0,60}Nerman\b/i,
    /\bNerman[^.]{0,100}NTER CHNG\b/i,
    /\bparticipant message\s*(?:read|said|:|["'])/i
  ].some((pattern) => pattern.test(nterAffirmativeText));
  const nterAttributionSafe = ![
    /Jamie(?: Burkart)? (?:alone )?(?:created|built|designed|programmed|developed) NTER CHNG/i,
    /Jamie(?: Burkart)? (?:wrote|built|developed) the (?:NTER CHNG )?software/i,
    /Jamie(?: Burkart)? designed the (?:installation )?architecture/i,
    /Jamie(?: Burkart)? (?:led|owned|implemented|maintained|installed|fabricated|executed)[^.]{0,80}(?:NTER CHNG|software|server|wall|restaging|installation)/i,
    /NTER CHNG[^.]{0,100}(?:displayed|shown|installed)[^.]{0,60}Nerman/i,
    /Nerman[^.]{0,100}NTER CHNG/i,
    /(?:participant phone numbers?|message transcripts?)[^.]{0,80}(?:prove|show|demonstrate|establish)[^.]{0,60}(?:impact|engagement|reach|success)/i
  ].some((pattern) => pattern.test(nterClaimText)) &&
    nterSharedCreditPreserved &&
    nterSemanticInflationSafe;
  const nterProtectedBundleText = JSON.stringify({
    intakes: nterProtectedIntakes,
    sources: nterProtectedSources,
    observations: nterProtectedObservations,
    claim: nterClaim,
    inquiry: nterInquiry
  });
  const nterProtectedReviewLocksMatch = Boolean(
    createHash("sha256").update(JSON.stringify(nterProtectedIntakes)).digest("hex") ===
      NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS.protectedIntakesSha256 &&
      createHash("sha256").update(JSON.stringify(nterProtectedSources)).digest("hex") ===
        NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS.protectedSourcesSha256 &&
      createHash("sha256").update(JSON.stringify(nterProtectedObservations)).digest("hex") ===
        NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS.protectedObservationsSha256 &&
      createHash("sha256").update(JSON.stringify(nterClaim)).digest("hex") ===
        NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS.claimSha256 &&
      createHash("sha256").update(JSON.stringify(nterInquiry)).digest("hex") ===
        NTER_CHNG_PROTECTED_ARTIFACT_REVIEW_LOCKS.inquirySha256
  );
  const nterWebsiteProjectionSafe = knowledgeBank.claims.every((claim) =>
    claim.projections.every((projection) =>
      projection.status !== "active" || !/NTER\s*CHNG|nter-chng/i.test(
        `${projection.text}\n${projection.surfaces.join("\n")}`
      )
    )
  ) && !/NTER\s*CHNG|nter-chng/i.test(JSON.stringify(proofClaims));
  const nterProtectedArtifactsBounded = Boolean(
    nterProtectedIntakes.length === 2 &&
      nterProtectedIntakes.every((intake) =>
        intake?.visibility === "protected" &&
          intake.disposition === "protected" &&
          !intake.sourceUrl
      ) &&
      nterProtectedSources.length === 2 &&
      nterProtectedSources.every((source) =>
        source?.visibility === "private" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      nterProtectedObservations.length === 4 &&
      nterProtectedObservations.every((observation) =>
        observation?.publicSafe === true &&
          observation.limitations.length >= 2 &&
          observation.claimIds.includes(archive.nterClaimId) &&
          observation.researchInquiryIds.includes(archive.nterInquiryId)
      ) &&
      nterProtectedEvidence.length === 2 &&
      nterProtectedEvidence.every(
        (evidence) => evidence.relationship === "private-support" && evidence.renderCitation === false
      ) &&
      nterProtectedReviewLocksMatch &&
      nterAttributionSafe &&
      nterWebsiteProjectionSafe &&
      !/docs\.google\.com\/document\/d\//i.test(nterProtectedBundleText) &&
      !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(nterProtectedBundleText) &&
      !/\b(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/.test(nterProtectedBundleText)
  );
  const archiveProductionComplete = Boolean(
    archiveIntakes.length === archive.expectedIntakeCount &&
      archiveObservations.length === archive.expectedObservationCount &&
      archiveSources.length === archive.expectedSourceCount &&
      archiveClaims.length === archive.expectedClaimCount &&
      archiveInquiries.length === archive.expectedInquiryCount &&
      archiveIntakes.every((intake) =>
        intake?.boundaries.length >= 2 &&
          intake.sourceIds.length &&
          intake.observationIds.length &&
          ["integrated", "protected", "researching"].includes(intake.disposition)
      ) &&
      archiveSources.every((source) =>
        source?.supportsGenerally.length && source.doesNotEstablish.length >= 2
      ) &&
      archivePublicUrlsAreHttps &&
      archivePrivateSources.every((source) =>
        ["private", "protected"].includes(source?.visibility) &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      archiveObservations.every((observation) =>
        observation?.locator &&
          observation.limitations.length >= 2 &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      archiveEvidenceClosed &&
      archiveClaims.every((claim) =>
        claim?.boundaries.length >= 3 &&
          claim.antiClaims.length >= 3 &&
          claim.reviewedBy.length &&
          claim.reviewedAt === archive.reviewedAt
      ) &&
      archiveHeldClaims.every((claim) =>
        claim?.projections.length && claim.projections.every((projection) =>
          projection.status === "hold" && projection.surfaces.length === 0
        )
      ) &&
      archiveActiveClaims.every((claim) =>
        claim?.projections.some((projection) =>
          projection.status === "active" && projection.surfaces.length === 1
        )
      ) &&
      archiveActiveClaims
        .filter((claim) => claim?.id !== archive.certificateClaimId)
        .every((claim) => claim?.evidence.every((evidence) => evidence.renderCitation === false)) &&
      claimById.get(archive.certificateClaimId)?.evidence.every((evidence) =>
        evidence.sourceId === archive.certificateSourceId && evidence.renderCitation === true
      ) &&
      archiveInquiries.every((inquiry) =>
        (inquiry?.id === archive.nterInquiryId
          ? inquiry.resultStatus === "recovered"
          : inquiry?.resultStatus === "partially-recovered") &&
          inquiry.findings.length >= 2 &&
          inquiry.limitations.length >= 2 &&
          inquiry.sourceIds.length
      ) &&
      inquiryById.get(archive.nterInquiryId)?.resultStatus === "recovered" &&
      sameOrderedValues(
        inquiryById.get(archive.nterInquiryId)?.sourceIds,
        archive.nterSourceIds
      ) &&
      claimById.get(archive.nterClaimId)?.status === "confirmed-with-boundary" &&
      claimById.get(archive.nterClaimId)?.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      sameOrderedValues(
        claimById.get(archive.nterClaimId)?.evidence.map((evidence) => evidence.sourceId),
        archive.nterSourceIds
      ) &&
      claimById.get(archive.nterClaimId)?.antiClaims.some((antiClaim) =>
        /alone created|sole authorship/i.test(antiClaim)
      ) &&
      nterAttributionSafe &&
      inquiryById.get(archive.baplabInquiryId)?.limitations.some((limitation) =>
        /title|medium|collaborator/i.test(limitation)
      ) &&
      sameOrderedValues(
        archiveFairRentPage?.occurrences
          .filter((occurrence) => archive.fairRentOccurrenceIds.includes(occurrence.id))
          .map((occurrence) => occurrence.id),
        archive.fairRentOccurrenceIds
      ) &&
      archive.fairRentOccurrenceIds.every((occurrenceId) => {
        const occurrence = archiveFairRentPage?.occurrences.find((item) => item.id === occurrenceId);
        return occurrence && (occurrence.sourceIds ?? []).length === 0;
      }) &&
      sameOrderedValues(
        archiveLabPage?.occurrences.map((occurrence) => occurrence.id),
        archive.labOccurrenceIds
      ) &&
      archiveLabPage?.sourceOrder.length === 1 &&
      archiveLabPage.sourceOrder[0] === archive.certificateSourceId &&
      fairRentMdx.includes('claimId="CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026"') &&
      fairRentMdx.includes('claimId="CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026"') &&
      archiveLabSource.includes('claimId="CLM-SOURCE-BACKED-MEMORY-METHOD-2026"') &&
      archiveLabSource.includes(`claimId="${archive.certificateClaimId}"`) &&
      archiveLabSource.includes('<References pageId="source-backed-team-memory" />') &&
      archiveProjectNote.includes("Archive production is cumulative; site composition is selective.") &&
      sourceBackedMethodStatusBounded &&
      nterProtectedArtifactsBounded &&
      archiveProofCoverageComplete &&
      archivePublicBundleSafe &&
      archiveContentSha256 === archive.approvedContentSha256
  );
  const googleDrive = suite.pilot.googleDriveProduction;
  const googleDriveIntakes = googleDrive.intakeIds.map((id) => intakeById.get(id));
  const googleDriveObservations = googleDrive.observationIds.map((id) => observationById.get(id));
  const googleDriveSources = googleDrive.sourceIds.map((id) => sourceById.get(id));
  const googleDriveWorkflowSources = googleDrive.workflowSourceIds.map((id) => sourceById.get(id));
  const googleDriveMediaSources = googleDrive.heldMediaSourceIds.map((id) => sourceById.get(id));
  const googleDriveClaims = googleDrive.claimIds.map((id) => claimById.get(id));
  const googleDriveInquiries = googleDrive.inquiryIds.map((id) => inquiryById.get(id));
  const googleDrivePage = knowledgeBank.pages.find((page) => page.id === googleDrive.pageId);
  const googleDriveProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (target) => target.proofId === googleDrive.proofId
  );
  const googleDriveMdx = readFileSync(
    path.join(repoRoot, "apps/www/src/content/work/196-sunday-dinner.mdx"),
    "utf8"
  );
  const googleDriveProjectNote = readFileSync(
    path.join(repoRoot, "docs/knowledge-bank/projects/google-drive-production-2026-07-14.md"),
    "utf8"
  );
  const googleDriveContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: googleDriveIntakes,
    observations: googleDriveObservations,
    sources: googleDriveSources,
    claims: googleDriveClaims,
    inquiries: googleDriveInquiries,
    page: googleDrivePage,
    proofCoverage: googleDriveProofCoverage,
    mdx: googleDriveMdx,
    projectNote: googleDriveProjectNote
  })).digest("hex");
  const googleDriveEvidenceClosed = googleDriveClaims.every((claim) =>
    claim?.evidence.length && claim.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const googleDrivePublicSafeText = JSON.stringify({
    intakes: googleDriveIntakes,
    observations: googleDriveObservations,
    sources: googleDriveSources,
    claims: googleDriveClaims,
    inquiries: googleDriveInquiries,
    mdx: googleDriveMdx,
    projectNote: googleDriveProjectNote
  });
  const googleDrivePrivacySafe = ![
    /drive\.google\.com/i,
    /\/Users\//,
    /CloudStorage|CloudDocs|Mobile Documents/,
    /(?:phone|email|instagram)\s*[:=]\s*[^,}\]]+/i,
    /@[a-z0-9._%+-]+\.[a-z]{2,}/i
  ].some((pattern) => pattern.test(googleDrivePublicSafeText));
  const googleDriveMetricAndOutcomeSafe = googleDriveClaims.every((claim) => {
    const text = [claim?.internalClaim, ...(claim?.projections.map((projection) => projection.text) ?? [])].join("\n");
    return !/300\+|20\+|300 or more|20 or more|artist outcome|participant satisfaction|community impact/i.test(text);
  });
  const googleDriveHeldMediaSourceIds = new Set(googleDrive.heldMediaSourceIds);
  const googleDriveVisualAttributionSafe = !knowledgeBank.claims.some((claim) =>
    claim.evidence.some((evidence) => googleDriveHeldMediaSourceIds.has(evidence.sourceId)) &&
      claim.projections.some((projection) => projection.status === "active" || projection.surfaces.length > 0)
  );
  const googleDriveComplete = Boolean(
    googleDriveIntakes.length === googleDrive.expectedIntakeCount &&
      googleDriveObservations.length === googleDrive.expectedObservationCount &&
      googleDriveSources.length === googleDrive.expectedSourceCount &&
      googleDriveClaims.length === googleDrive.expectedClaimCount &&
      googleDriveInquiries.length === googleDrive.expectedInquiryCount &&
      googleDriveIntakes.every((intake) =>
        intake?.visibility === "protected" &&
          ["integrated", "researching"].includes(intake.disposition) &&
          intake.sourceIds.length === 1 &&
          intake.observationIds.length &&
          intake.boundaries.length >= 3
      ) &&
      googleDriveSources.every((source) =>
        source?.preservationStatus === "private" &&
          ["protected", "public-metadata-only"].includes(source.visibility) &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl &&
          source.supportsGenerally.length >= 2 &&
          source.doesNotEstablish.length >= 4
      ) &&
      googleDriveWorkflowSources.every((source) => source?.visibility === "protected") &&
      googleDriveMediaSources.every((source) =>
        source?.kind === "photo-metadata" &&
          source.media?.rightsStatus === "unknown" &&
          source.media.consentStatus === "review-needed" &&
          source.media.publicDisplayStatus === "hold"
      ) &&
      googleDriveObservations.every((observation) =>
        observation?.locator &&
          observation.limitations.length >= 2 &&
          (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      googleDriveEvidenceClosed &&
      googleDriveClaims.every((claim) =>
        claim?.status === "confirmed-with-boundary" &&
          claim.boundaries.length >= 3 &&
          claim.antiClaims.length >= 4 &&
          claim.reviewedAt === googleDrive.reviewedAt &&
          claim.reviewedBy.length >= 2 &&
          claim.projections.length === 1 &&
          claim.projections[0].status === "active" &&
          claim.projections[0].citationRequired === false &&
          sameOrderedValues(claim.projections[0].surfaces, ["/work/196-sunday-dinner"]) &&
          claim.evidence.every((evidence) => evidence.relationship === "private-support" && evidence.renderCitation === false)
      ) &&
      googleDriveInquiries.every((inquiry) =>
        ["partially-recovered", "inconclusive"].includes(inquiry?.resultStatus) &&
          inquiry.findings.length >= 2 &&
          inquiry.limitations.length >= 2 &&
          inquiry.sourceIds.length === 1
      ) &&
      googleDrivePage?.surface === "/work/196-sunday-dinner" &&
      googleDrivePage.sourceOrder.every((sourceId) => !googleDrive.sourceIds.includes(sourceId)) &&
      sameOrderedValues(
        googleDrivePage.occurrences
          .filter((occurrence) => googleDrive.claimIds.includes(occurrence.claimId))
          .map((occurrence) => occurrence.claimId),
        googleDrive.claimIds
      ) &&
      googleDrivePage.occurrences
        .filter((occurrence) => googleDrive.claimIds.includes(occurrence.claimId))
        .every((occurrence) => !occurrence.sourceIds) &&
      googleDrive.claimIds.every((claimId) => googleDriveMdx.includes(`claimId="${claimId}"`)) &&
      !/300\+|20\+/.test(googleDriveMdx) &&
      googleDriveProofCoverage?.status === "protected-support" &&
      googleDrive.workflowSourceIds.every((sourceId) => googleDriveProofCoverage.sourceIds.includes(sourceId)) &&
      googleDrivePrivacySafe &&
      googleDriveMetricAndOutcomeSafe &&
      googleDriveVisualAttributionSafe &&
      googleDriveContentSha256 === googleDrive.approvedContentSha256
  );
  const social = suite.pilot.socialMediaProduction;
  const socialIntakes = socialMediaProductionJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const socialObservations = socialMediaProductionJuly2026.observations.map((item) => observationById.get(item.id));
  const socialSources = socialMediaProductionJuly2026.sources.map((item) => sourceById.get(item.id));
  const socialClaims = socialMediaProductionJuly2026.claims.map((item) => claimById.get(item.id));
  const socialInquiries = socialMediaProductionJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const socialActiveClaims = social.activeClaimIds.map((id) => claimById.get(id));
  const socialHeldClaim = claimById.get(social.heldClaimId);
  const socialCallNycInquiry = inquiryById.get(social.callNycInquiryId);
  const callNycCouncilActors = new Set(
    socialEngagementEvents
      .filter((event) => event.projectId === "callnyc" && event.servingPublicOfficial)
      .map((event) => event.actor)
  );
  const nycacCouncilActors = new Set(
    socialEngagementEvents
      .filter((event) => event.projectId === "nyc-artist-coalition" && event.servingPublicOfficial)
      .map((event) => event.actor)
  );
  const socialProjectNotePath = path.join(repoRoot, "docs/knowledge-bank/projects/social-media-archive-production.md");
  const socialProjectNote = readFileSync(socialProjectNotePath, "utf8");
  const antiClaimsText = readFileSync(path.join(repoRoot, "docs/knowledge-bank/anti-claims.md"), "utf8");
  const socialMdxByPage = new Map([
    ["callnyc", readFileSync(path.join(repoRoot, "apps/www/src/content/work/callnyc.mdx"), "utf8")],
    ["fair-rent-nyc", fairRentMdx],
    ["wowlist", readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8")],
    ["kc-town-hall", kcTownHallMdx]
  ]);
  const socialPageProjectionComplete = social.pageClaimPairs.every(([pageId, claimId]) => {
    const page = knowledgeBank.pages.find((item) => item.id === pageId);
    return page?.occurrences.some((occurrence) => occurrence.claimId === claimId) &&
      socialMdxByPage.get(pageId)?.includes(`claimId="${claimId}"`);
  });
  const socialArchiveText = JSON.stringify({
    accounts: projectSocialAccounts,
    events: socialEngagementEvents,
    intakes: socialIntakes,
    observations: socialObservations,
    sources: socialSources,
    claims: socialClaims,
    inquiries: socialInquiries
  });
  const socialMediaComplete = Boolean(
    projectSocialAccounts.length === social.expectedAccountCount &&
      projectSocialAccounts.filter((account) => account.status === "open-inquiry").length === social.expectedNotRecoveredCount &&
      socialEngagementEvents.length === social.expectedEngagementEventCount &&
      socialIntakes.length === social.expectedIntakeCount &&
      socialObservations.length === social.expectedObservationCount &&
      socialSources.length === social.expectedSourceCount &&
      socialClaims.length === social.expectedClaimCount &&
      socialInquiries.length === social.expectedInquiryCount &&
      social.requiredAccountHandles.every((handle) =>
        projectSocialAccounts.some((account) => account.handle === handle && account.status === "recovered" && account.accountUrl?.startsWith("https://x.com/"))
      ) &&
      projectSocialAccounts.every((account) =>
        account.status === "recovered" ? account.accountUrl?.startsWith("https://x.com/") : account.relationship === "not-recovered"
      ) &&
      socialIntakes.every((intake) =>
        intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.sourceIds.length && intake.observationIds.length && intake.boundaries.length >= 2
      ) &&
      socialObservations.every((observation) =>
        observation?.locator && observation.limitations.length && (observation.claimIds.length || observation.researchInquiryIds.length)
      ) &&
      socialSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl?.startsWith("https://") && source.supportsGenerally.length && source.doesNotEstablish.length
      ) &&
      socialClaims.every((claim) =>
        claim?.evidence.length && claim.boundaries.length >= 2 && claim.antiClaims.length >= 4 && claim.reviewedAt === social.reviewedAt && claim.reviewedBy.length >= 2
      ) &&
      socialActiveClaims.every((claim) =>
        claim?.projections.some((projection) => projection.status === "active" && projection.citationRequired === true && projection.surfaces.length === 1)
      ) &&
      socialHeldClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      socialInquiries.every((inquiry) =>
        ["partially-recovered", "inconclusive"].includes(inquiry?.resultStatus) && inquiry.findings.length >= 2 && inquiry.limitations.length >= 2 && inquiry.sourceIds.length
      ) &&
      socialEngagementEvents.every((event) =>
        event.publicUrl.startsWith("https://x.com/") && sourceById.has(event.sourceId)
      ) &&
      callNycCouncilActors.size === social.callNycDistinctCouncilMemberLowerBound &&
      nycacCouncilActors.size === social.nycacDistinctCouncilMemberLowerBound &&
      socialCallNycInquiry?.resultStatus === "partially-recovered" &&
      socialCallNycInquiry.publicSummary?.includes("at least 19") &&
      socialPageProjectionComplete &&
      existsSync(socialProjectNotePath) &&
      socialProjectNote.includes("not a complete lifetime corpus") &&
      socialProjectNote.includes("individual `@NYCArtC` posts") &&
      antiClaimsText.includes("Account identity") &&
      antiClaimsText.includes("Do not convert “account not recovered” into “no account existed.”") &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(socialArchiveText)
  );
  const nycacFull = suite.pilot.nycacRetrievablePopulation;
  const nycacManifestPath = path.join(repoRoot, nycacFull.manifestPath);
  const nycacReportPath = path.join(repoRoot, nycacFull.reportPath);
  const nycacManifestText = readFileSync(nycacManifestPath, "utf8");
  const nycacManifest = overrides.nycacPopulation ?? JSON.parse(nycacManifestText);
  const nycacReport = overrides.nycacPopulationReport ?? readFileSync(nycacReportPath, "utf8");
  const nycacManifestSha256 = createHash("sha256").update(nycacManifestText).digest("hex");
  const nycacRecordsSha256 = createHash("sha256")
    .update(JSON.stringify(nycacManifest.records ?? []))
    .digest("hex");
  const nycacIncomingRecordsSha256 = createHash("sha256")
    .update(JSON.stringify(nycacManifest.post2020IncomingMentionInventory?.records ?? []))
    .digest("hex");
  const nycacGovernedModuleSha256 = createHash("sha256")
    .update(readFileSync(path.join(repoRoot, "apps/www/src/data/knowledge-bank/nycac-social-population-2026-07.ts"), "utf8"))
    .digest("hex");
  const nycacPublicReportSha256 = createHash("sha256")
    .update(readFileSync(nycacReportPath, "utf8"))
    .digest("hex");
  const nycacReviewLocksMatch =
    nycacManifestSha256 === NYCAC_SOCIAL_REVIEW_LOCKS.manifestSha256 &&
    nycacRecordsSha256 === NYCAC_SOCIAL_REVIEW_LOCKS.recordsSha256 &&
    nycacIncomingRecordsSha256 === NYCAC_SOCIAL_REVIEW_LOCKS.incomingRecordsSha256 &&
    nycacGovernedModuleSha256 === NYCAC_SOCIAL_REVIEW_LOCKS.governedModuleSha256 &&
    nycacPublicReportSha256 === NYCAC_SOCIAL_REVIEW_LOCKS.publicReportSha256;
  const nycacRecords = nycacManifest.records ?? [];
  const nycacUrls = new Set(nycacRecords.map((record) => record.url));
  const nycacRecordTypeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacRecords, (record) => record.recordType))
      .map(([recordType, records]) => [recordType, records.length])
  );
  const nycacAuthoredRecords = nycacRecords.filter((record) => ["original", "reply"].includes(record.recordType));
  const nycacExternalRepostRecords = nycacRecords.filter((record) => record.recordType === "repost");
  const nycacSourceAuthors = new Set(nycacRecords.map((record) => record.authorHandle.toLowerCase()));
  const nycacLinks = nycacRecords.flatMap((record) => record.externalLinks ?? []);
  const nycacShortUrls = new Set(nycacLinks.map((link) => link.shortUrl));
  const nycacMissionSignalCounts = Object.fromEntries(
    nycacMissionSignalRules.map((rule) => [
      rule.id,
      nycacRecords.filter((record) => record.missionSignals?.includes(rule.id)).length
    ])
  );
  const nycacIncoming = nycacManifest.post2020IncomingMentionInventory;
  const nycacIncomingRecords = nycacIncoming.records ?? [];
  const nycacIncomingUrls = new Set(nycacIncomingRecords.map((record) => record.url));
  const nycacIncomingAuthors = new Set(nycacIncomingRecords.map((record) => record.authorHandle.toLowerCase()));
  const nycacDirectIncomingRecords = nycacIncomingRecords.filter((record) =>
    record.mentionHandles?.some((handle) => handle.toLowerCase() === "@nycartc")
  );
  const nycacDirectIncomingAuthors = new Set(nycacDirectIncomingRecords.map((record) => record.authorHandle.toLowerCase()));
  const nycacContextIncomingRecords = nycacIncomingRecords.filter((record) =>
    !record.mentionHandles?.some((handle) => handle.toLowerCase() === "@nycartc")
  );
  const nycacContextIncomingAuthors = new Set(nycacContextIncomingRecords.map((record) => record.authorHandle.toLowerCase()));
  const nycacRecordsWithDisplayedInteraction = nycacAuthoredRecords.filter((record) =>
    record.visibleEngagement.replies > 0 || record.visibleEngagement.reposts > 0 || record.visibleEngagement.likes > 0
  );
  const nycacDisplayedReplies = nycacAuthoredRecords.reduce((sum, record) => sum + record.visibleEngagement.replies, 0);
  const nycacDisplayedReposts = nycacAuthoredRecords.reduce((sum, record) => sum + record.visibleEngagement.reposts, 0);
  const nycacDisplayedLikes = nycacAuthoredRecords.reduce((sum, record) => sum + record.visibleEngagement.likes, 0);
  const nycacSelfRepostRecords = nycacRecords.filter((record) =>
    record.accountTimelineAppearances?.includes("native-self-repost-card")
  );
  const nycacRuleManifestMatches = sameOrderedValues(
    nycacManifest.missionSignalClassification.rules.map((rule) => `${rule.signalId}:${rule.pattern}:${rule.flags}`),
    nycacMissionSignalRules.map((rule) => `${rule.id}:${rule.pattern.source}:${rule.pattern.flags}`)
  );
  const nycacClassificationEvidenceValid = [...nycacRecords, ...nycacIncomingRecords].every((record) =>
    /^[a-f0-9]{64}$/.test(record.classificationInputDigest) &&
    sameOrderedValues(
      record.missionSignalEvidence.map((evidence) => evidence.signalId),
      record.missionSignals
    ) &&
    record.missionSignalEvidence.every((evidence) => {
      const rule = nycacManifest.missionSignalClassification.rules.find((candidate) => candidate.signalId === evidence.signalId);
      return rule &&
        nycacManifest.missionSignalClassification.inputFields.includes(evidence.inputField) &&
        new RegExp(rule.pattern, rule.flags).test(evidence.matchedValue);
    })
  );
  const nycacFullIntakes = nycacSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const nycacFullObservations = nycacSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const nycacFullSources = nycacSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const nycacFullClaims = nycacSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const nycacFullInquiries = nycacSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const nycacActiveClaim = claimById.get(nycacFull.activeClaimId);
  const nycacActiveProjectionText = nycacActiveClaim?.projections
    .filter((projection) => projection.status === "active")
    .map((projection) => projection.text)
    .join("\n") ?? "";
  const nycacHeldClaims = nycacFull.heldClaimIds.map((id) => claimById.get(id));
  const nycacOwnerArchiveInquiry = inquiryById.get(nycacFull.ownerArchiveInquiryId);
  const nycacPostedSourceInquiry = inquiryById.get(nycacFull.postedSourceInquiryId);
  const nycacPageOccurrence = fairRentPage?.occurrences.find((occurrence) => occurrence.claimId === nycacFull.activeClaimId);
  const nycacArchiveText = JSON.stringify({
    intakes: nycacFullIntakes,
    observations: nycacFullObservations,
    sources: nycacFullSources,
    claims: nycacFullClaims,
    inquiries: nycacFullInquiries,
    manifest: nycacManifest
  });
  const nycacRetrievablePopulationChecks = {
    filesAndReconciliation: Boolean(
    existsSync(nycacManifestPath) &&
      existsSync(nycacReportPath) &&
      nycacManifest.account === "@NYCArtC" &&
      nycacManifest.generatedAt === "2026-07-14" &&
      nycacManifest.populationReconciliation.profileReportedPostCount === nycacFull.expectedProfileCount &&
      nycacManifest.populationReconciliation.postsTimelineUniqueCount === nycacFull.expectedPostsTimelineCount &&
      nycacManifest.populationReconciliation.postsAndRepliesTimelinePrimaryCount === nycacFull.expectedPostsAndRepliesCount &&
      nycacManifest.populationReconciliation.yearlyAuthoredSearchUnionCount === nycacFull.expectedYearlyAuthoredSearchCount &&
      nycacManifest.populationReconciliation.recoveredUnionRecordCount === nycacFull.expectedRecoveredCount &&
      nycacManifest.populationReconciliation.recoveredPopulationReviewedPercent === 100 &&
      nycacManifest.populationReconciliation.profileCountNotMaterialized === nycacFull.expectedCounterRemainder &&
      nycacManifest.populationReconciliation.profileCounterCoveragePercent === nycacFull.expectedCounterCoveragePercent &&
      /owner archive/i.test(nycacManifest.populationReconciliation.conclusion) &&
      /not represented as absent or deleted/i.test(nycacManifest.populationReconciliation.conclusion) &&
      /source-post years must not be presented as account-activity years/i.test(nycacManifest.populationReconciliation.dateBoundary)
    ),
    recordIdentityAndAppearance: Boolean(
      nycacRecords.length === nycacFull.expectedRecoveredCount &&
      nycacUrls.size === nycacFull.expectedRecoveredCount &&
      Object.entries(nycacFull.expectedRecordTypeCounts).every(([recordType, count]) =>
        nycacRecordTypeCounts[recordType] === count && nycacManifest.recordTypeCounts[recordType] === count
      ) &&
      nycacAuthoredRecords.length === nycacFull.expectedAuthoredCount &&
      nycacAuthoredRecords.every((record) => record.authorHandle.toLowerCase() === "@nycartc") &&
      nycacExternalRepostRecords.length === nycacFull.expectedRecordTypeCounts.repost &&
      nycacExternalRepostRecords.every((record) => record.authorHandle.toLowerCase() !== "@nycartc") &&
      nycacManifest.publishingPattern.timelineNativeRepostAppearanceCount === nycacFull.expectedTimelineNativeRepostAppearances &&
      nycacManifest.publishingPattern.accountAuthoredStatusAlsoSeenAsSelfRepostCount === nycacFull.expectedSelfRepostAppearances &&
      nycacSelfRepostRecords.length === nycacFull.expectedSelfRepostAppearances &&
      sameOrderedValues(
        nycacSelfRepostRecords.map((record) => record.url).sort(),
        nycacSelfRepostAppearanceUrls.slice().sort()
      ) &&
      nycacManifest.publishingPattern.accountQuotePostReplyInheritanceCorrectionCount === nycacFull.expectedQuotePostCorrections &&
      nycacManifest.publishingPattern.accountQuotePostReplyInheritanceCorrectionUrls.every((url) =>
        nycacRecords.find((record) => record.url === url)?.recordType === "original"
      ) &&
      nycacSourceAuthors.size === nycacFull.expectedDistinctSourceAuthors &&
      nycacManifest.publishingPattern.distinctSourceAuthorCount === nycacFull.expectedDistinctSourceAuthors
    ),
    linksAndMissionClassification: Boolean(
      nycacLinks.length === nycacFull.expectedExternalLinkOccurrences &&
      nycacShortUrls.size === nycacFull.expectedDistinctShortUrls &&
      nycacManifest.postedUrlInventory.recordsWithExternalLinks === nycacFull.expectedRecordsWithExternalLinks &&
      nycacManifest.postedUrlInventory.externalLinkOccurrences === nycacFull.expectedExternalLinkOccurrences &&
      nycacManifest.postedUrlInventory.distinctExternalShortUrls === nycacFull.expectedDistinctShortUrls &&
      nycacManifest.postedUrlInventory.representativeMissionRelevantSources.length === nycacFull.expectedRepresentativeSourceCount &&
      Object.entries(nycacFull.expectedMissionSignalCounts).every(([signal, count]) =>
        nycacMissionSignalCounts[signal] === count && nycacManifest.publishingPattern.missionSignalRecordCounts[signal] === count
      ) &&
      nycacRuleManifestMatches &&
      nycacClassificationEvidenceValid
    ),
    incomingResponse: Boolean(
      nycacIncomingRecords.length === nycacFull.expectedIncomingRecordCount &&
      nycacIncomingUrls.size === nycacFull.expectedIncomingRecordCount &&
      nycacIncomingAuthors.size === nycacFull.expectedIncomingAuthorCount &&
      nycacDirectIncomingRecords.length === nycacFull.expectedDirectIncomingRecordCount &&
      nycacDirectIncomingAuthors.size === nycacFull.expectedDirectIncomingAuthorCount &&
      nycacContextIncomingRecords.length === nycacFull.expectedContextRecordCount &&
      nycacContextIncomingAuthors.size === nycacFull.expectedContextAuthorCount &&
      nycacIncoming.renderedRecordCount === nycacFull.expectedIncomingRecordCount &&
      nycacIncoming.directlyMatchingRecordCount === nycacFull.expectedDirectIncomingRecordCount &&
      nycacIncoming.conversationContextRecordCount === nycacFull.expectedContextRecordCount
    ),
    visibleEngagementAndNetworkBoundary: Boolean(
      nycacRecordsWithDisplayedInteraction.length === nycacFull.expectedAuthoredRecordsWithDisplayedInteraction &&
      nycacDisplayedReplies === nycacFull.expectedDisplayedReplies &&
      nycacDisplayedReposts === nycacFull.expectedDisplayedReposts &&
      nycacDisplayedLikes === nycacFull.expectedDisplayedLikes &&
      nycacDisplayedReplies + nycacDisplayedReposts + nycacDisplayedLikes === nycacFull.expectedDisplayedInteractionUnits &&
      nycacManifest.visibleEngagementSnapshot.originalAndReplyDisplayedInteractionUnits === nycacFull.expectedDisplayedInteractionUnits &&
      /not unique people, reach, conversion, endorsement, participation, or impact/i.test(nycacManifest.visibleEngagementSnapshot.boundary) &&
      /does not by itself establish that the source account engaged/i.test(nycacManifest.sourceAuthorNetwork.boundary)
    ),
    governedLifecycle: Boolean(
      nycacFullIntakes.length === nycacFull.expectedIntakeCount &&
      nycacFullObservations.length === nycacFull.expectedObservationCount &&
      nycacFullSources.length === nycacFull.expectedSourceCount &&
      nycacFullClaims.length === nycacFull.expectedClaimCount &&
      nycacFullInquiries.length === nycacFull.expectedInquiryCount &&
      nycacFullIntakes.every((intake) => intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 3) &&
      nycacFullObservations.every((observation) => observation?.locator && observation.publicSafe === true && observation.limitations.length >= 2) &&
      nycacFullSources.every((source) => source?.visibility === "public" && source.canonicalUrl.startsWith("https://") && source.doesNotEstablish.length >= 2)
    ),
    claimsAndInquiries: Boolean(
      nycacActiveClaim?.status === "confirmed-with-boundary" &&
      nycacActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
        projection.citationRequired === true &&
        sameOrderedValues(projection.surfaces, ["/work/fair-rent-nyc"]) &&
        /3,123 unique public records/.test(projection.text) &&
        /not a complete account export/.test(projection.text)
      ) &&
      nycacActiveClaim.boundaries.length >= 6 &&
      nycacActiveClaim.antiClaims.includes("All 5,124 profile-counted posts were recovered") &&
      nycacActiveClaim.antiClaims.includes("Jamie authored every @NYCArtC post") &&
      nycacHeldClaims.every((claim) => claim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)) &&
      nycacOwnerArchiveInquiry?.resultStatus === "partially-recovered" &&
      /literal full-account recovery remains blocked/i.test(nycacOwnerArchiveInquiry.publicSummary) &&
      nycacPostedSourceInquiry?.resultStatus === "partially-recovered" &&
      /Every recovered posted link has an inventory disposition/.test(nycacPostedSourceInquiry.findings.join(" "))
    ),
    projectionAndPublicDocumentation: Boolean(
      nycacReviewLocksMatch &&
      nycacPageOccurrence?.id === "coalition-social-population" &&
      fairRentMdx.includes(`claimId="${nycacFull.activeClaimId}"`) &&
      !/(?:Jamie|Burkart)[^.]{0,100}(?:authored|ran|controlled|established)[^.]{0,100}(?:@NYCArtC|coalition account)/i.test(nycacActiveProjectionText) &&
      !/(?:2,438|623)[^.]{0,80}(?:accounts?|sources?)[^.]{0,80}(?:engaged|endorsed|partnered|collaborated)/i.test(nycacActiveProjectionText) &&
      !/4,306[^.]{0,60}(?:people|supporters|participants|stakeholders)/i.test(nycacActiveProjectionText) &&
      /complete review of the retrievable public union/i.test(nycacReport) &&
      /1,161 distinct short URLs/i.test(nycacReport) &&
      /does not establish that every source account engaged/i.test(nycacReport) &&
      /not unique people, reach, conversion/i.test(nycacReport) &&
      /owner archive/i.test(nycacReport) &&
      antiClaimsText.includes("3,123 distinct") &&
      antiClaimsText.includes("2,001 profile-counted records") &&
      antiClaimsText.includes("2,438 externally authored source statuses") &&
      antiClaimsText.includes("4,306 displayed reply, repost, and like interaction units") &&
      !/"(?:text|cookie|cookies|session|sessionToken)"\s*:/.test(JSON.stringify(nycacManifest)) &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp/i.test(nycacArchiveText)
    )
  };
  const nycacFailedChecks = Object.entries(nycacRetrievablePopulationChecks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  const nycacRetrievablePopulationComplete = nycacFailedChecks.length === 0;
  const urbanhermitFull = suite.pilot.urbanhermitFullPopulation;
  const urbanhermitManifestPath = path.join(repoRoot, urbanhermitFull.manifestPath);
  const urbanhermitReportPath = path.join(repoRoot, urbanhermitFull.reportPath);
  const urbanhermitManifestText = readFileSync(urbanhermitManifestPath, "utf8");
  const urbanhermitManifest = overrides.urbanhermitPopulation ?? JSON.parse(urbanhermitManifestText);
  const urbanhermitReport = overrides.urbanhermitPopulationReport ?? readFileSync(urbanhermitReportPath, "utf8");
  const urbanhermitManifestSha256 = createHash("sha256").update(urbanhermitManifestText).digest("hex");
  const urbanhermitRecordsSha256 = createHash("sha256")
    .update(JSON.stringify(urbanhermitManifest.records ?? []))
    .digest("hex");
  const urbanhermitIncomingRecordsSha256 = createHash("sha256")
    .update(JSON.stringify(urbanhermitManifest.stakeholderInventory?.records ?? []))
    .digest("hex");
  const urbanhermitModulePath = path.join(repoRoot, "apps/www/src/data/knowledge-bank/urbanhermit-social-population-2026-07.ts");
  const urbanhermitModuleText = readFileSync(urbanhermitModulePath, "utf8");
  const urbanhermitGovernedModuleSha256 = createHash("sha256")
    .update(urbanhermitModuleText)
    .digest("hex");
  const urbanhermitPublicReportSha256 = createHash("sha256")
    .update(readFileSync(urbanhermitReportPath, "utf8"))
    .digest("hex");
  const urbanhermitReviewLocksMatch =
    urbanhermitManifestSha256 === URBANHERM_SOCIAL_REVIEW_LOCKS.manifestSha256 &&
    urbanhermitRecordsSha256 === URBANHERM_SOCIAL_REVIEW_LOCKS.recordsSha256 &&
    urbanhermitIncomingRecordsSha256 === URBANHERM_SOCIAL_REVIEW_LOCKS.incomingRecordsSha256 &&
    urbanhermitGovernedModuleSha256 === URBANHERM_SOCIAL_REVIEW_LOCKS.governedModuleSha256 &&
    urbanhermitPublicReportSha256 === URBANHERM_SOCIAL_REVIEW_LOCKS.publicReportSha256;
  const urbanhermitRecords = urbanhermitManifest.records ?? [];
  const urbanhermitRecordUrls = new Set(urbanhermitRecords.map((record) => record.url));
  const urbanhermitRecordTypeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanhermitRecords, (record) => record.recordType))
      .map(([recordType, records]) => [recordType, records.length])
  );
  const urbanhermitAuthoredRecords = urbanhermitRecords.filter((record) =>
    record.sourceAuthorship === "account-authored" && ["original", "reply"].includes(record.recordType)
  );
  const urbanhermitRepostRecords = urbanhermitRecords.filter((record) =>
    record.sourceAuthorship === "external-source-native-repost" && record.recordType === "repost"
  );
  const urbanhermitLinks = urbanhermitRecords.flatMap((record) => record.externalLinks ?? []);
  const urbanhermitShortUrls = new Set(urbanhermitLinks.map((link) => link.shortUrl));
  const urbanhermitRecordsWithLinks = urbanhermitRecords.filter((record) => record.externalLinks?.length);
  const urbanhermitMissionSignalCounts = Object.fromEntries(
    urbanhermitMissionSignalRules.map((rule) => [
      rule.id,
      urbanhermitRecords.filter((record) => record.missionSignals?.includes(rule.id)).length
    ])
  );
  const urbanhermitRuleManifestMatches = sameOrderedValues(
    urbanhermitManifest.missionSignalClassification?.rules?.map((rule) =>
      `${rule.signalId}:${rule.pattern}:${rule.flags}`
    ),
    urbanhermitMissionSignalRules.map((rule) => `${rule.id}:${rule.pattern.source}:${rule.pattern.flags}`)
  );
  const urbanhermitClassificationEvidenceValid = urbanhermitRecords.every((record) =>
    /^[a-f0-9]{64}$/.test(record.classificationInputDigest) &&
    Array.isArray(record.missionSignals) &&
    Array.isArray(record.missionSignalEvidence) &&
    record.missionSignals.length === record.missionSignalEvidence.length &&
    record.missionSignalEvidence.every((evidence) =>
      record.missionSignals.includes(evidence.signalId) &&
      urbanhermitMissionSignalRules.some((rule) => rule.id === evidence.signalId) &&
      ["source-post-body", "hashtag", "displayed-link-destination"].includes(evidence.inputField) &&
      typeof evidence.matchedValue === "string" && evidence.matchedValue.length > 0
    )
  );
  const urbanhermitIncoming = urbanhermitManifest.stakeholderInventory;
  const urbanhermitIncomingRecords = urbanhermitIncoming?.records ?? [];
  const urbanhermitIdentifiedIncomingRecords = urbanhermitIncomingRecords.filter((record) =>
    record.classification !== "context-limited-personal-or-network"
  );
  const urbanhermitIncomingUrls = new Set(urbanhermitIdentifiedIncomingRecords.map((record) => record.url));
  const urbanhermitMissionRelevantIncoming = urbanhermitIncomingRecords.filter((record) =>
    record.classification === "mission-relevant-third-party"
  );
  const urbanhermitMissionRelevantIncomingAccounts = new Set(
    urbanhermitMissionRelevantIncoming
      .filter((record) => typeof record.authorHandle === "string")
      .map((record) => record.authorHandle.toLowerCase())
  );
  const urbanhermitIncomingConversationContext = urbanhermitIncomingRecords.filter((record) =>
    record.classification === "mission-relevant-conversation-context"
  );
  const urbanhermitIncomingPersonalContext = urbanhermitIncomingRecords.filter((record) =>
    record.classification === "context-limited-personal-or-network"
  );
  const urbanhermitStakeholderGroupCounts = Object.fromEntries(
    Object.entries(Object.groupBy(urbanhermitMissionRelevantIncoming, (record) => record.stakeholderGroup))
      .map(([group, records]) => [group, records.length])
  );
  const urbanhermitAuthoredWithInteraction = urbanhermitAuthoredRecords.filter((record) => {
    const metrics = record.visibleEngagement;
    return metrics.likes + metrics.replies + metrics.reposts > 0;
  });
  const urbanhermitDisplayedLikes = urbanhermitAuthoredRecords.reduce(
    (total, record) => total + record.visibleEngagement.likes,
    0
  );
  const urbanhermitDisplayedReplies = urbanhermitAuthoredRecords.reduce(
    (total, record) => total + record.visibleEngagement.replies,
    0
  );
  const urbanhermitDisplayedReposts = urbanhermitAuthoredRecords.reduce(
    (total, record) => total + record.visibleEngagement.reposts,
    0
  );
  const urbanhermitContextRecords = urbanhermitManifest.conversationContextRecords ?? [];
  const urbanhermitIntakes = urbanhermitSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const urbanhermitObservations = urbanhermitSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const urbanhermitSources = urbanhermitSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const urbanhermitClaims = urbanhermitSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const urbanhermitInquiries = urbanhermitSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const urbanhermitHeldClaims = urbanhermitFull.heldClaimIds.map((id) => claimById.get(id));
  const urbanhermitOwnerArchiveInquiry = inquiryById.get(urbanhermitFull.ownerArchiveInquiryId);
  const urbanhermitPostedSourceInquiry = inquiryById.get(urbanhermitFull.postedSourceInquiryId);
  const urbanhermitManifestSource = sourceById.get(urbanhermitFull.manifestSourceId);
  const urbanhermitTunnelClaim = claimById.get("CLM-URBANHERM-EIGHTH-STREET-TUNNEL-SCREENING");
  const urbanhermitTireClaim = claimById.get("CLM-URBANHERM-KCTH-TIRE-PICKUP-PARTICIPATION");
  const urbanhermitBrooklynSource = sourceById.get("SRC-URBANHERM-BROOKLYN-EAGLE-NIGHTLIFE-2017");
  const urbanhermitHorseObservation = observationById.get("OBS-URBANHERM-X-HORSE-LORDS-CORROBORATION");
  const urbanhermitBrooklynObservation = observationById.get("OBS-URBANHERM-BROOKLYN-EAGLE-NYCAC-NIGHTLIFE-SEQUENCE");
  const urbanhermitHorseClaim = claimById.get("CLM-HORSE-LORDS-TRUTHERS-VIDEO-2016");
  const urbanhermitArchiveText = JSON.stringify({
    intakes: urbanhermitIntakes,
    observations: urbanhermitObservations,
    sources: urbanhermitSources,
    claims: urbanhermitClaims,
    inquiries: urbanhermitInquiries,
    manifest: urbanhermitManifest,
    report: urbanhermitReport
  });
  const urbanhermitForbiddenPublicKeys = /"(?:text|body|profileBiography|phone|email|address|cookie|cookies|session|sessionToken|directMessage)"\s*:/i;
  const urbanhermitFullPopulationChecks = {
    filesAndReconciliation: Boolean(
      existsSync(urbanhermitManifestPath) &&
      existsSync(urbanhermitReportPath) &&
      urbanhermitManifest.account === "@urbanhermit" &&
      urbanhermitManifest.generatedAt === urbanhermitFull.reviewedAt &&
      urbanhermitManifest.populationReconciliation.profileReportedPostCount === urbanhermitFull.expectedProfileCount &&
      urbanhermitManifest.populationReconciliation.postsTimelineUniqueCount === urbanhermitFull.expectedPostsTimelineCount &&
      urbanhermitManifest.populationReconciliation.repliesTimelineRenderedArticleCount === urbanhermitFull.expectedRepliesRenderedCount &&
      urbanhermitManifest.populationReconciliation.repliesTimelinePrimaryRecordCount === urbanhermitFull.expectedRepliesPrimaryCount &&
      urbanhermitManifest.populationReconciliation.repliesTimelineConversationContextCount === urbanhermitFull.expectedConversationContextCount &&
      urbanhermitManifest.populationReconciliation.recoveredUnionRecordCount === urbanhermitFull.expectedRecoveredCount &&
      urbanhermitManifest.populationReconciliation.recoveredPopulationReviewedPercent === 100 &&
      urbanhermitManifest.populationReconciliation.profileCountNotMaterialized === urbanhermitFull.expectedCounterRemainder &&
      /does not establish that no older post was deleted, withheld, or otherwise absent/i.test(urbanhermitManifest.populationReconciliation.boundary)
    ),
    recordIdentityAndAuthorship: Boolean(
      urbanhermitRecords.length === urbanhermitFull.expectedRecoveredCount &&
      urbanhermitRecordUrls.size === urbanhermitFull.expectedRecoveredCount &&
      Object.entries(urbanhermitFull.expectedRecordTypeCounts).every(([recordType, count]) =>
        urbanhermitRecordTypeCounts[recordType] === count && urbanhermitManifest.recordTypeCounts[recordType] === count
      ) &&
      urbanhermitAuthoredRecords.length === urbanhermitFull.expectedAuthoredCount &&
      urbanhermitAuthoredRecords.every((record) => record.authorHandle.toLowerCase() === "@urbanhermit") &&
      urbanhermitRepostRecords.length === urbanhermitFull.expectedRecordTypeCounts.repost &&
      urbanhermitRepostRecords.every((record) => record.authorHandle.toLowerCase() !== "@urbanhermit") &&
      urbanhermitRecords.every((record) =>
        /^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(record.url) &&
        /^\d{4}-\d{2}-\d{2}T/.test(record.publishedAt) &&
        Array.isArray(record.recoveredFrom) && record.recoveredFrom.length > 0 &&
        Array.isArray(record.externalLinks) &&
        Array.isArray(record.mentions) &&
        Array.isArray(record.hashtags) &&
        Number.isInteger(record.visibleEngagement?.likes) &&
        Number.isInteger(record.visibleEngagement?.replies) &&
        Number.isInteger(record.visibleEngagement?.reposts)
      ) &&
      urbanhermitContextRecords.length === urbanhermitFull.expectedConversationContextCount &&
      urbanhermitContextRecords.every((record) =>
        !urbanhermitRecordUrls.has(record.url) &&
        record.authorHandle.toLowerCase() !== "@urbanhermit" &&
        record.contextType === "conversation-parent-excluded-from-profile-population"
      )
    ),
    linksAndMissionClassification: Boolean(
      urbanhermitLinks.length === urbanhermitFull.expectedExternalLinkOccurrences &&
      urbanhermitShortUrls.size === urbanhermitFull.expectedDistinctShortUrls &&
      urbanhermitRecordsWithLinks.length === urbanhermitFull.expectedRecordsWithExternalLinks &&
      urbanhermitManifest.postedUrlInventory.externalLinkOccurrences === urbanhermitFull.expectedExternalLinkOccurrences &&
      urbanhermitManifest.postedUrlInventory.distinctExternalShortUrls === urbanhermitFull.expectedDistinctShortUrls &&
      urbanhermitLinks.every((link) =>
        /^https?:\/\//.test(link.shortUrl) &&
        typeof link.displayedDestination === "string" && link.displayedDestination.length > 0
      ) &&
      Object.entries(urbanhermitFull.expectedMissionSignalCounts).every(([signal, count]) =>
        urbanhermitMissionSignalCounts[signal] === count &&
        urbanhermitManifest.publishingPattern.missionSignalRecordCounts[signal] === count
      ) &&
      urbanhermitRuleManifestMatches &&
      urbanhermitClassificationEvidenceValid &&
      /not.*authorship.*endorsement.*readership.*participation.*impact/i.test(urbanhermitManifest.postedUrlInventory.boundary)
    ),
    incomingResponse: Boolean(
      urbanhermitIncomingRecords.length === urbanhermitFull.expectedIncomingRecordCount &&
      urbanhermitIdentifiedIncomingRecords.length === urbanhermitFull.expectedPublicIdentifiedIncomingRecordCount &&
      urbanhermitIncomingUrls.size === urbanhermitFull.expectedPublicIdentifiedIncomingRecordCount &&
      urbanhermitIdentifiedIncomingRecords.every((record) =>
        /^https:\/\/x\.com\/[^/]+\/status\/\d+$/.test(record.url) &&
        typeof record.authorHandle === "string" && record.authorHandle.startsWith("@") &&
        /^\d{4}-\d{2}-\d{2}T/.test(record.publishedAt)
      ) &&
      urbanhermitMissionRelevantIncoming.length === urbanhermitFull.expectedMissionRelevantIncomingRecordCount &&
      urbanhermitMissionRelevantIncomingAccounts.size === urbanhermitFull.expectedMissionRelevantIncomingAccountCount &&
      urbanhermitIncomingConversationContext.length === urbanhermitFull.expectedIncomingConversationContextCount &&
      urbanhermitIncomingPersonalContext.length === urbanhermitFull.expectedIncomingPersonalContextCount &&
      urbanhermitIncoming.contextLimitedPublicRedactionCount === urbanhermitFull.expectedIncomingPersonalContextRedactionCount &&
      urbanhermitIncomingPersonalContext.every((record, index) =>
        record.redactionId === `context-limited-${String(index + 1).padStart(2, "0")}` &&
        record.stakeholderGroup === "context-limited" &&
        record.publicDisposition === "identity-date-and-metrics-withheld-as-non-mission-personal-context" &&
        !("url" in record) && !("authorHandle" in record) && !("publishedAt" in record) && !("visibleEngagement" in record)
      ) &&
      urbanhermitIncoming.recoveredPublicIncomingRecordCount === urbanhermitFull.expectedIncomingRecordCount &&
      urbanhermitIncoming.missionRelevantThirdPartyRecordCount === urbanhermitFull.expectedMissionRelevantIncomingRecordCount &&
      urbanhermitIncoming.missionRelevantThirdPartyAccountCount === urbanhermitFull.expectedMissionRelevantIncomingAccountCount &&
      Object.entries(urbanhermitFull.expectedStakeholderGroupCounts).every(([group, count]) =>
        urbanhermitStakeholderGroupCounts[group] === count &&
        urbanhermitIncoming.stakeholderGroupCounts[group] === count
      ) &&
      /not a complete historical engagement archive/i.test(urbanhermitIncoming.boundary) &&
      /conversation-context records are retained without converting them into mission-relevant traction/i.test(urbanhermitIncoming.boundary) &&
      /identities, dates, URLs, and metrics of nine non-mission personal or network-context records are withheld/i.test(urbanhermitIncoming.boundary)
    ),
    visibleEngagementBoundary: Boolean(
      urbanhermitAuthoredWithInteraction.length === urbanhermitFull.expectedAuthoredRecordsWithDisplayedInteraction &&
      urbanhermitDisplayedLikes === urbanhermitFull.expectedDisplayedLikes &&
      urbanhermitDisplayedReplies === urbanhermitFull.expectedDisplayedReplies &&
      urbanhermitDisplayedReposts === urbanhermitFull.expectedDisplayedReposts &&
      urbanhermitDisplayedLikes + urbanhermitDisplayedReplies + urbanhermitDisplayedReposts === urbanhermitFull.expectedDisplayedInteractionUnits &&
      urbanhermitManifest.visibleEngagementSnapshot.accountAuthoredRecordsWithAnyDisplayedInteraction === urbanhermitFull.expectedAuthoredRecordsWithDisplayedInteraction &&
      urbanhermitManifest.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals.likes === urbanhermitFull.expectedDisplayedLikes &&
      urbanhermitManifest.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals.replies === urbanhermitFull.expectedDisplayedReplies &&
      urbanhermitManifest.visibleEngagementSnapshot.accountAuthoredDisplayedInteractionTotals.reposts === urbanhermitFull.expectedDisplayedReposts &&
      /not unique people, reach, endorsement, conversion, attendance, or impact/i.test(urbanhermitManifest.visibleEngagementSnapshot.boundary) &&
      /external-source native repost records are excluded/i.test(urbanhermitManifest.visibleEngagementSnapshot.boundary)
    ),
    governedLifecycle: Boolean(
      urbanhermitIntakes.length === urbanhermitFull.expectedIntakeCount &&
      urbanhermitObservations.length === urbanhermitFull.expectedObservationCount &&
      urbanhermitSources.length === urbanhermitFull.expectedSourceCount &&
      urbanhermitClaims.length === urbanhermitFull.expectedClaimCount &&
      urbanhermitInquiries.length === urbanhermitFull.expectedInquiryCount &&
      urbanhermitIntakes.every((intake) =>
        intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 2
      ) &&
      urbanhermitObservations.every((observation) =>
        observation?.locator && observation.publicSafe === true && observation.limitations.length >= 2 &&
        (observation.claimIds.length > 0 || observation.researchInquiryIds.length > 0)
      ) &&
      urbanhermitSources.every((source) =>
        source && source.doesNotEstablish.length >= 4 &&
        (source.visibility === "public"
          ? source.canonicalUrl?.startsWith("https://")
          : source.visibility === "protected" && !source.canonicalUrl && source.protectedLocatorId)
      ) &&
      urbanhermitManifestSource?.visibility === "public"
    ),
    claimsAndInquiries: Boolean(
      urbanhermitHeldClaims.every((claim) =>
        claim?.status === "confirmed-with-boundary" &&
        claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
        claim.boundaries.length >= 4 && claim.antiClaims.length >= 5 && claim.evidence.length >= 2
      ) &&
      urbanhermitOwnerArchiveInquiry?.resultStatus === "partially-recovered" &&
      /all-ever historical completeness remains an owner-archive question/i.test(urbanhermitOwnerArchiveInquiry.publicSummary) &&
      urbanhermitPostedSourceInquiry?.resultStatus === "partially-recovered" &&
      /All 321 distinct short URLs have an inventory disposition/.test(urbanhermitPostedSourceInquiry.findings.join(" ")) &&
      /not all 321 destinations have been resolved and close-read/i.test(urbanhermitPostedSourceInquiry.limitations.join(" ")) &&
      urbanhermitTunnelClaim?.antiClaims.includes("Jamie restored the 8th Street Tunnel") &&
      !/(?:Jamie|he)[^.]{0,80}(?:restored|owned|controlled|permanently opened)[^.]{0,80}(?:tunnel|8th Street)/i.test(
        `${urbanhermitTunnelClaim?.internalClaim ?? ""} ${urbanhermitTunnelClaim?.projections.map((projection) => projection.text).join(" ") ?? ""}`
      ) &&
      urbanhermitTireClaim?.antiClaims.includes("Jamie alone created or operated Tired of Tires") &&
      !/(?:Jamie|he)[^.]{0,80}(?:alone|solely)[^.]{0,80}(?:created|designed|operated|ran|coordinated)[^.]{0,80}(?:Tired of Tires|tire)/i.test(
        `${urbanhermitTireClaim?.internalClaim ?? ""} ${urbanhermitTireClaim?.projections.map((projection) => projection.text).join(" ") ?? ""}`
      ) &&
      urbanhermitBrooklynSource?.doesNotEstablish.includes("Jamie's individual authorship or role") &&
      urbanhermitHorseClaim?.internalClaim.includes("M.C. Schmidt") &&
      urbanhermitHorseObservation?.text.includes("M.C. Schmidt") &&
      urbanhermitHorseObservation?.limitations.some((limitation) => /credit M\.C\. Schmidt alongside Jamie/i.test(limitation)) &&
      urbanhermitBrooklynObservation?.limitations.some((limitation) => /does not name Jamie or establish his individual authorship/i.test(limitation)) &&
      !/(?:Jamie|Burkart|he)[^.]{0,100}(?:authored|wrote|created)[^.]{0,100}(?:coalition statement|NYC Artist Coalition statement)/i.test(urbanhermitBrooklynObservation?.text ?? "") &&
      !/(?:Jamie|Burkart|he)[^.]{0,100}(?:caused|created|secured|established)[^.]{0,100}(?:Office of Nightlife|nightlife office)/i.test(urbanhermitBrooklynObservation?.text ?? "")
    ),
    projectionAndPublicDocumentation: Boolean(
      urbanhermitReviewLocksMatch &&
      urbanhermitHeldClaims.every((claim) =>
        !knowledgeBank.pages.some((page) => page.occurrences.some((occurrence) => occurrence.claimId === claim.id))
      ) &&
      /100 percent of the live profile-counted population/i.test(urbanhermitReport) &&
      /321 distinct short URLs/i.test(urbanhermitReport) &&
      /not 243 people/i.test(urbanhermitReport) &&
      /does not name[\n ]+Jamie/i.test(urbanhermitReport) &&
      /No `\/proofs`, `\/urbanhermit`, or other new[\n ]+public route is created/i.test(urbanhermitReport) &&
      /account-owner X Archive remains[\n ]+an open historical-completeness task/i.test(urbanhermitReport) &&
      !urbanhermitForbiddenPublicKeys.test(JSON.stringify(urbanhermitManifest)) &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|auth token|session token/i.test(urbanhermitArchiveText)
    )
  };
  const urbanhermitFailedChecks = Object.entries(urbanhermitFullPopulationChecks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
  const urbanhermitFullPopulationComplete = urbanhermitFailedChecks.length === 0;
  const callNycFull = suite.pilot.callNycFullPopulation;
  const callNycFullIntakes = callNycSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const callNycFullObservations = callNycSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const callNycFullSources = callNycSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const callNycFullClaims = callNycSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const callNycFullInquiries = callNycSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const callNycManifestPath = path.join(repoRoot, callNycFull.manifestPath);
  const callNycReportPath = path.join(repoRoot, callNycFull.reportPath);
  const callNycManifestText = readFileSync(callNycManifestPath, "utf8");
  const callNycManifest = overrides.callNycPopulation ?? JSON.parse(callNycManifestText);
  const callNycReport = overrides.callNycPopulationReport ?? readFileSync(callNycReportPath, "utf8");
  const callNycRecoveredRows = callNycManifest.population.filter((row) => row.populationDisposition === "recovered");
  const callNycNotRecoveredRows = callNycManifest.population.filter((row) => row.populationDisposition === "not-recovered");
  const callNycRecoveredIds = new Set(callNycRecoveredRows.map((row) => row.statusId));
  const callNycRelationshipCounts = callNycRecoveredRows.reduce((counts, row) => {
    counts[row.relationship] = (counts[row.relationship] ?? 0) + 1;
    return counts;
  }, {});
  const callNycShortUrls = new Set(callNycManifest.postedUrlInventory.map((item) => item.shortUrl));
  const callNycCouncilNames = new Set(callNycManifest.councilMemberReposters.map((item) => item.name));
  const callNycCouncilHandles = new Set(callNycManifest.councilMemberReposters.map((item) => item.handle.toLowerCase()));
  const callNycAuthoredIds = new Set(callNycManifest.councilMemberAuthoredInteractions.map((item) => item.statusId));
  const callNycSourceRoles = new Map(callNycManifest.sourceReadings.map((item) => [item.sourceId, item.role]));
  const callNycPopulationClaim = claimById.get(callNycFull.claimId);
  const callNycPopulationInquiry = inquiryById.get(callNycFull.inquiryId);
  const callNycPublicClaim = claimById.get(callNycFull.publicClaimId);
  const callNycFullArchiveText = JSON.stringify({
    intakes: callNycFullIntakes,
    observations: callNycFullObservations,
    sources: callNycFullSources,
    claims: callNycFullClaims,
    inquiries: callNycFullInquiries,
    manifest: callNycManifest
  });
  const callNycFullPopulationComplete = Boolean(
    existsSync(callNycManifestPath) &&
      existsSync(callNycReportPath) &&
      callNycManifest.reviewedAt === callNycFull.reviewedAt &&
      callNycManifest.account === "@CallNYCapp" &&
      callNycManifest.population.length === callNycFull.expectedPopulationCount &&
      callNycManifest.populationSummary.profileDisplayedPostCount === callNycFull.expectedPopulationCount &&
      callNycManifest.populationSummary.populationDispositionCount === callNycFull.expectedPopulationCount &&
      callNycRecoveredRows.length === callNycFull.expectedRecoveredCount &&
      callNycNotRecoveredRows.length === callNycFull.expectedNotRecoveredCount &&
      callNycRecoveredIds.size === callNycFull.expectedRecoveredCount &&
      callNycNotRecoveredRows.every((row) =>
        /^UNRECOVERED-0[1-3]$/.test(row.populationSlot) && !row.statusId && !row.statusUrl && /not exposed|not recovered/i.test(row.reason)
      ) &&
      Object.entries(callNycFull.expectedRelationshipCounts).every(([relationship, count]) =>
        callNycRelationshipCounts[relationship] === count && callNycManifest.populationSummary.relationshipCounts[relationship] === count
      ) &&
      callNycManifest.populationSummary.boundary.includes("by disposition, not by recovered content") &&
      callNycManifest.contentSystemSummary.recognitionPostCount === callNycFull.expectedRecognitionPostCount &&
      callNycManifest.contentSystemSummary.recognitionTargetHandleCount === callNycFull.expectedRecognitionTargetHandleCount &&
      callNycManifest.contentSystemSummary.recognitionDistinctIssuePageCount === callNycFull.expectedRecognitionIssuePageCount &&
      callNycManifest.contentSystemSummary.uniquePostedShortUrlCount === callNycFull.expectedPostedUrlCount &&
      callNycManifest.postedUrlInventory.length === callNycFull.expectedPostedUrlCount &&
      callNycShortUrls.size === callNycFull.expectedPostedUrlCount &&
      callNycManifest.postedUrlInventory.every((item) =>
        item.shortUrl.startsWith("https://t.co/") && callNycRecoveredIds.has(item.statusUrl.split("/").at(-1))
      ) &&
      callNycManifest.engagementSummary.callNycAuthoredOrReplyPostsWithDisplayedReposts === callNycFull.expectedRepostBearingPostCount &&
      callNycManifest.engagementSummary.displayedReposts === callNycFull.expectedDisplayedRepostCount &&
      callNycManifest.engagementSummary.currentlyPublicReposterAppearances === callNycFull.expectedPublicReposterAppearanceCount &&
      callNycManifest.engagementSummary.distinctCurrentlyPublicReposterAccounts === callNycFull.expectedDistinctPublicReposterCount &&
      callNycManifest.engagementSummary.displayedRepostsWithoutPublicAccountIdentity === callNycFull.expectedUnassignedRepostCount &&
      callNycManifest.engagementSummary.boundaries.some((boundary) => /external posts.*original authors/i.test(boundary)) &&
      callNycManifest.councilMemberReposters.length === callNycFull.expectedCouncilMemberReposterCount &&
      callNycCouncilNames.size === callNycFull.expectedCouncilMemberReposterCount &&
      callNycCouncilHandles.size === callNycFull.expectedCouncilMemberReposterCount &&
      callNycManifest.councilMemberReposters.every((item) =>
        item.sourceStatusIds.length > 0 && item.sourceStatusIds.every((statusId) => callNycRecoveredIds.has(statusId))
      ) &&
      callNycManifest.councilMemberAuthoredInteractions.length === callNycFull.expectedCouncilMemberAuthoredInteractionCount &&
      callNycAuthoredIds.size === callNycFull.expectedCouncilMemberAuthoredInteractionCount &&
      callNycManifest.councilMemberAuthoredInteractions.every((item) =>
        callNycCouncilNames.has(item.name) && item.statusUrl === `https://x.com/${item.handle.slice(1)}/status/${item.statusId}`
      ) &&
      callNycSourceRoles.get(callNycFull.directCoverageSourceId) === "direct-project-coverage" &&
      callNycFull.contextualSourceIds.every((sourceId) =>
        callNycSourceRoles.has(sourceId) && callNycSourceRoles.get(sourceId) !== "direct-project-coverage"
      ) &&
      callNycFullIntakes.length === callNycFull.expectedIntakeCount &&
      callNycFullObservations.length === callNycFull.expectedObservationCount &&
      callNycFullSources.length === callNycFull.expectedSourceCount &&
      callNycFullClaims.length === callNycFull.expectedClaimCount &&
      callNycFullInquiries.length === callNycFull.expectedInquiryCount &&
      callNycFullIntakes.every((intake) => intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 2) &&
      callNycFullObservations.every((observation) => observation?.locator && observation.limitations.length >= 2 && observation.publicSafe === true) &&
      callNycFullSources.every((source) => source?.visibility === "public" && source.canonicalUrl.startsWith("https://") && source.doesNotEstablish.length >= 4) &&
      callNycPopulationClaim?.status === "confirmed-with-boundary" &&
      callNycPopulationClaim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      callNycPopulationClaim.boundaries.length >= 4 &&
      callNycPopulationClaim.antiClaims.length >= 6 &&
      callNycPopulationInquiry?.resultStatus === "not-recovered" &&
      callNycPopulationInquiry.findings.length >= 3 &&
      callNycPopulationInquiry.limitations.length >= 2 &&
      callNycPublicClaim?.projections.some((projection) =>
        projection.status === "active" && /61 resident-facing issue pages/.test(projection.text) && /26 Council accounts/.test(projection.text) && /at least 19/.test(projection.text) && /six member-authored/.test(projection.text)
      ) &&
      /100 percent population disposition coverage/.test(callNycReport) &&
      /107-of-110 content recovery/.test(callNycReport) &&
      /Original-author metrics on reposted external posts are not CallNYC traction/.test(callNycReport) &&
      antiClaimsText.includes("107 content objects") &&
      antiClaimsText.includes("external posts reposted by") &&
      antiClaimsText.includes("contextual source articles") &&
      callNycManifest.publicSafety.containsRawTweetBodies === false &&
      callNycManifest.publicSafety.containsPrivateSessionData === false &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(callNycFullArchiveText)
  );
  const wowListFull = suite.pilot.wowListFullPopulation;
  const wowListFullIntakes = wowListSocialPopulationJuly2026.intakeItems.map((item) => intakeById.get(item.id));
  const wowListFullObservations = wowListSocialPopulationJuly2026.observations.map((item) => observationById.get(item.id));
  const wowListFullSources = wowListSocialPopulationJuly2026.sources.map((item) => sourceById.get(item.id));
  const wowListFullClaims = wowListSocialPopulationJuly2026.claims.map((item) => claimById.get(item.id));
  const wowListFullInquiries = wowListSocialPopulationJuly2026.researchInquiries.map((item) => inquiryById.get(item.id));
  const wowListManifestPath = path.join(repoRoot, wowListFull.manifestPath);
  const wowListReportPath = path.join(repoRoot, wowListFull.reportPath);
  const wowListManifest = overrides.wowListPopulation ?? JSON.parse(readFileSync(wowListManifestPath, "utf8"));
  const wowListReport = overrides.wowListPopulationReport ?? readFileSync(wowListReportPath, "utf8");
  const wowListRecoveredRows = wowListManifest.population.filter((row) => row.populationDisposition === "recovered");
  const wowListNotRecoveredRows = wowListManifest.population.filter((row) => row.populationDisposition === "not-recovered");
  const wowListRecoveredIds = new Set(wowListRecoveredRows.map((row) => row.statusId));
  const wowListRelationshipCounts = wowListRecoveredRows.reduce((counts, row) => {
    counts[row.relationship] = (counts[row.relationship] ?? 0) + 1;
    return counts;
  }, {});
  const wowListShortUrls = new Set(wowListManifest.postedUrlInventory.map((item) => item.shortUrl));
  const wowListPublicReposterHandles = wowListManifest.publicReposterAudit.flatMap((item) => item.publicReposterHandles);
  const wowListDistinctPublicReposters = new Set(wowListPublicReposterHandles.map((handle) => handle.toLowerCase()));
  const wowListExternalAdoptionIds = new Set(wowListManifest.externalAdoptionEvidence.map((item) => item.statusId));
  const wowListSourceRoles = new Map(wowListManifest.sourceReadings.map((item) => [item.sourceId, item.role]));
  const wowListPopulationClaim = claimById.get(wowListFull.claimId);
  const wowListPopulationInquiry = inquiryById.get(wowListFull.inquiryId);
  const wowListPublicClaim = claimById.get(wowListFull.publicClaimId);
  const wowListFullArchiveText = JSON.stringify({
    intakes: wowListFullIntakes,
    observations: wowListFullObservations,
    sources: wowListFullSources,
    claims: wowListFullClaims,
    inquiries: wowListFullInquiries,
    manifest: wowListManifest
  });
  const wowListFullPopulationComplete = Boolean(
    existsSync(wowListManifestPath) &&
      existsSync(wowListReportPath) &&
      wowListManifest.reviewedAt === wowListFull.reviewedAt &&
      wowListManifest.account === "@wowlist" &&
      wowListManifest.population.length === wowListFull.expectedPopulationCount &&
      wowListManifest.populationSummary.profileDisplayedPostCount === wowListFull.expectedPopulationCount &&
      wowListManifest.populationSummary.populationDispositionCount === wowListFull.expectedPopulationCount &&
      wowListRecoveredRows.length === wowListFull.expectedRecoveredCount &&
      wowListNotRecoveredRows.length === wowListFull.expectedNotRecoveredCount &&
      wowListRecoveredIds.size === wowListFull.expectedRecoveredCount &&
      Object.entries(wowListFull.expectedRelationshipCounts).every(([relationship, count]) =>
        wowListRelationshipCounts[relationship] === count && wowListManifest.populationSummary.relationshipCounts[relationship] === count
      ) &&
      wowListManifest.populationSummary.contentRecoveryRate === 1 &&
      /complete profile-population snapshot/i.test(wowListManifest.populationSummary.boundary) &&
      wowListRecoveredRows.every((row) =>
        row.statusUrl.endsWith(`/status/${row.statusId}`) &&
        row.missionTags.length > 0 &&
        row.workflowTags.length > 0 &&
        row.stakeholderGroups.length > 0 &&
        !Object.hasOwn(row, "text")
      ) &&
      wowListManifest.contentSystemSummary.wowListAuthoredOrReplyPostCount === wowListFull.expectedAuthoredOrReplyCount &&
      wowListManifest.contentSystemSummary.uniquePostedShortUrlCount === wowListFull.expectedPostedUrlCount &&
      wowListManifest.contentSystemSummary.resolvedDestinationCount === wowListFull.expectedPostedUrlCount &&
      wowListManifest.postedUrlInventory.length === wowListFull.expectedPostedUrlCount &&
      wowListShortUrls.size === wowListFull.expectedPostedUrlCount &&
      wowListManifest.postedUrlInventory.every((item) =>
        item.shortUrl.startsWith("https://t.co/") && item.resolvedUrl.startsWith("https://") && wowListRecoveredIds.has(item.statusId)
      ) &&
      wowListManifest.engagementSummary.wowListAuthoredOrReplyPostCount === wowListFull.expectedAuthoredOrReplyCount &&
      wowListManifest.engagementSummary.wowListAuthoredOrReplyPostsWithDisplayedReposts === wowListFull.expectedRepostBearingPostCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.replies === wowListFull.expectedDisplayedReplyCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.reposts === wowListFull.expectedDisplayedRepostCount &&
      wowListManifest.engagementSummary.displayedAccountOwnedEngagement.likes === wowListFull.expectedDisplayedLikeCount &&
      wowListManifest.engagementSummary.currentlyPublicReposterAppearances === wowListFull.expectedPublicReposterAppearanceCount &&
      wowListManifest.engagementSummary.distinctCurrentlyPublicReposterAccounts === wowListFull.expectedDistinctPublicReposterCount &&
      wowListManifest.engagementSummary.displayedRepostsWithoutPublicAccountIdentity === wowListFull.expectedUnassignedRepostCount &&
      wowListManifest.engagementSummary.boundedExternalAdoptionPostCount === wowListFull.expectedExternalAdoptionPostCount &&
      wowListManifest.engagementSummary.boundaries.some((boundary) => /external posts reposted by WOW List belong to their original authors/i.test(boundary)) &&
      wowListManifest.engagementSummary.boundaries.some((boundary) => /Like identities were not audited/i.test(boundary)) &&
      wowListManifest.publicReposterAudit.length === wowListFull.expectedRepostBearingPostCount &&
      wowListManifest.publicReposterAudit.every((item) =>
        wowListRecoveredIds.has(item.statusId) && item.displayedReposts === item.publicReposterHandles.length + item.publicIdentityRemainder
      ) &&
      wowListPublicReposterHandles.length === wowListFull.expectedPublicReposterAppearanceCount &&
      wowListDistinctPublicReposters.size === wowListFull.expectedDistinctPublicReposterCount &&
      wowListManifest.externalAdoptionEvidence.length === wowListFull.expectedExternalAdoptionPostCount &&
      wowListExternalAdoptionIds.size === wowListFull.expectedExternalAdoptionPostCount &&
      wowListManifest.externalAdoptionEvidence.every((item) =>
        item.statusUrl.endsWith(`/status/${item.statusId}`) && item.handle.startsWith("@") && item.signal.length > 20
      ) &&
      wowListFull.independentUseSourceIds.every((sourceId) =>
        ["independent-product-tutorial", "external-organizer-adoption"].includes(wowListSourceRoles.get(sourceId))
      ) &&
      wowListFull.missionContextSourceIds.every((sourceId) => wowListSourceRoles.get(sourceId) === "mission-context") &&
      wowListSourceRoles.get(wowListFull.conveningContextSourceId) === "convening-context" &&
      wowListSourceRoles.get(wowListFull.historicalProductScopeSourceId) === "historical-product-scope" &&
      wowListFullIntakes.length === wowListFull.expectedIntakeCount &&
      wowListFullObservations.length === wowListFull.expectedObservationCount &&
      wowListFullSources.length === wowListFull.expectedSourceCount &&
      wowListFullClaims.length === wowListFull.expectedClaimCount &&
      wowListFullInquiries.length === wowListFull.expectedInquiryCount &&
      wowListFullIntakes.every((intake) => intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 2) &&
      wowListFullObservations.every((observation) => observation?.locator && observation.limitations.length >= 2 && observation.publicSafe === true) &&
      wowListFullSources.every((source) => source?.visibility === "public" && source.canonicalUrl.startsWith("https://") && source.doesNotEstablish.length >= 4) &&
      wowListPopulationClaim?.status === "confirmed-with-boundary" &&
      wowListPopulationClaim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
      wowListPopulationClaim.boundaries.length >= 4 &&
      wowListPopulationClaim.antiClaims.length >= 7 &&
      wowListPopulationInquiry?.resultStatus === "partially-recovered" &&
      wowListPopulationInquiry.findings.length >= 3 &&
      wowListPopulationInquiry.limitations.length >= 2 &&
      wowListPublicClaim?.projections.some((projection) =>
        projection.status === "active" &&
        /complete recovered public-account population/.test(projection.text) &&
        /weekly email/.test(projection.text) &&
        /independent organizers/.test(projection.text)
      ) &&
      /100 percent profile-population recovery/.test(wowListReport) &&
      /Original-author metrics on reposted external posts are not WOW List[\n ]+traction/.test(wowListReport) &&
      /not a complete adoption census/.test(wowListReport) &&
      antiClaimsText.includes("38-object profile census") &&
      antiClaimsText.includes("16 external posts reposted by") &&
      antiClaimsText.includes("eight externally authored posts") &&
      wowListManifest.publicSafety.containsRawTweetBodies === false &&
      wowListManifest.publicSafety.containsPrivateSessionData === false &&
      !/\/Users\/|\/Volumes\/|\/private\/tmp|cookie|auth token|session token/i.test(wowListFullArchiveText)
  );
  const kcthFull = suite.pilot.kcTownHallFullPopulation;
  const kcthLedgerPath = path.join(repoRoot, kcthFull.ledgerPath);
  const kcthDocumentationPath = path.join(repoRoot, kcthFull.documentationPath);
  const kcthDocumentation = existsSync(kcthDocumentationPath)
    ? readFileSync(kcthDocumentationPath, "utf8")
    : "";
  const kcthLedger = overrides.kcTownHallLedger ?? (existsSync(kcthLedgerPath)
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
  const kcthRepostSourceHandles = new Set(kcthRepostRecords.map((record) => record.statusOwner.toLowerCase()));
  const kcthExternalHandles = new Set(
    kcthAuthoredRecords.flatMap((record) => record.publicMentions ?? [])
      .filter((handle) => handle.toLowerCase() !== "@kctownhall")
      .map((handle) => handle.toLowerCase())
  );
  const countKcthMention = (handle) => kcthAuthoredRecords.filter((record) =>
    record.publicMentions.some((mention) => mention.toLowerCase() === handle.toLowerCase())
  ).length;
  const kcthLinks = kcthRecords.flatMap((record) => record.postedUrls ?? []);
  const kcthUniqueShortUrls = new Set(kcthLinks.map((link) => link.shortUrl));
  const kcthUniqueDestinations = new Set(kcthLinks.map((link) => link.resolvedUrl).filter(Boolean));
  const isKcthProjectDestination = (url) =>
    /kctownhall\.com|facebook\.com\/KCTownHall|youtube\.com\/watch\?v=(PmLjLyOpS9I|onCKU-TuPhc)/i.test(url);
  const kcthProjectDestinations = new Set([...kcthUniqueDestinations].filter(isKcthProjectDestination));
  const kcthExternalDestinations = new Set([...kcthUniqueDestinations].filter((url) => !isKcthProjectDestination(url)));
  const kcthThemeCounts = Object.fromEntries(
    Object.entries(Object.groupBy(kcthRecords, (record) => record.primaryTheme))
      .map(([theme, records]) => [theme, records.length])
  );
  const kcthTireRecords = kcthRecords.filter(
    (record) => record.primaryTheme === "resident-tire-intake-and-operations"
  );
  const sumKcthMetrics = (records) => records.reduce(
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
  const kcthAuthoredReactionSnapshot = sumKcthMetrics(kcthAuthoredRecords);
  const kcthRepostReactionSnapshot = sumKcthMetrics(kcthRepostRecords);
  const kcthDirectResponseRecords = kcthRecords.filter((record) =>
    record.outsideAuthoredInteraction?.targetAccount?.toLowerCase() === "@kctownhall" &&
      ["quote-post", "reply"].includes(record.outsideAuthoredInteraction?.interactionType) &&
      record.outsideAuthoredInteraction?.stakeholderRole === "sitting-kansas-city-council-member" &&
      record.outsideAuthoredInteraction?.roleSourceId === "SRC-KCMO-COUNCIL-ROSTER-2018"
  );
  const kcthCityPoliticalHandles = new Set(["@quintonlucaskc", "@robinson4kc", "@joliejustus"]);
  const kcthCityPoliticalReposts = kcthRepostRecords.filter((record) =>
    kcthCityPoliticalHandles.has(record.statusOwner.toLowerCase())
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
  const kcthReposterRows = kcthLedger?.publicReposterAudit ?? [];
  const kcthPublicReposterHandles = kcthReposterRows.flatMap((item) => item.publicReposterHandles);
  const kcthDistinctPublicReposters = new Set(kcthPublicReposterHandles.map((handle) => handle.toLowerCase()));
  const kcthCouncilReposterAppearances = kcthLedger?.councilMemberPublicReposterAppearances ?? [];
  const kcthDistinctCouncilReposters = new Set(kcthCouncilReposterAppearances.map((item) => item.handle.toLowerCase()));
  const kcthCouncilRoleSourceByHandle = new Map([
    ["@quintonlucaskc", "SRC-KCMO-COUNCIL-ROSTER-2018"],
    ["@joliejustus", "SRC-KCMO-COUNCIL-ROSTER-2018"],
    ["@robinson4kc", "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"]
  ]);
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
      equalStringSets(new Set(kcthLedger.aggregateFindings.postedLinks.resolvedDestinations), kcthUniqueDestinations) &&
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
  const kcthIndependentCoverageSource = sourceById.get(kcthFull.independentCoverageSourceId);
  const kcthFullInquiry = inquiryById.get("INQ-KCTH-FULL-POPULATION-2026");
  const kcthTractionInquiry = inquiryById.get("INQ-KCTH-HISTORICAL-TRACTION-AND-SERVICE-OUTCOMES");
  const kcthAuthorshipInquiry = inquiryById.get("INQ-KCTH-SHARED-ACCOUNT-AUTHORSHIP");
  const kcthCouncilResponseClaim = claimById.get("CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR");
  const kcthProof = knowledgeBank.proofCoverageTargets.find((target) => target.proofId === kcthFull.proofId);
  const kcthPage = knowledgeBank.pages.find((page) => page.id === "kc-town-hall");
  const kcthOccurrence = kcthPage?.occurrences.find((occurrence) => occurrence.id === "public-service-interface");
  const kcthLedgerText = kcthLedger ? JSON.stringify(kcthLedger) : "";
  const kcthFullPopulationComplete = Boolean(
    kcthLedger &&
      kcthLedger.schemaVersion === 2 &&
      kcthLedger.account === "@KCTownHall" &&
      kcthLedger.observedAt === "2026-07-14" &&
      kcthLedger.population.displayedProfileCount === kcthFull.expectedProfileCount &&
      kcthLedger.population.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.population.repliesRouteArticles === kcthFull.expectedRepliesRouteArticles &&
      kcthLedger.population.attributableRecords === kcthFull.expectedRepliesTabCount &&
      kcthLedger.population.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.population.unresolvedProfileCountSlots === kcthFull.expectedUnresolvedSlots &&
      kcthLedger.population.relationshipCounts.accountPosts === kcthFull.expectedAccountPosts &&
      kcthLedger.population.relationshipCounts.accountReplies === kcthFull.expectedAccountReplies &&
      kcthLedger.population.relationshipCounts.reposts === kcthFull.expectedReposts &&
      /complete recovery of the surviving/i.test(kcthLedger.population.completenessStatement) &&
      /not a native X export/i.test(kcthLedger.population.completenessStatement) &&
      /No credential, cookie, direct message, private analytics/i.test(kcthLedger.method.authenticationBoundary) &&
      kcthLedger.method.freshVerification.verifiedAt === kcthFull.reviewedAt &&
      kcthLedger.method.freshVerification.profileCountReconfirmed === kcthFull.expectedProfileCount &&
      kcthLedger.method.freshVerification.postsRouteUnique === kcthFull.expectedPostsTabCount &&
      kcthLedger.method.freshVerification.repliesRouteArticles === kcthFull.expectedRepliesRouteArticles &&
      kcthLedger.method.freshVerification.attributableRecords === kcthFull.expectedUniqueItems &&
      kcthLedger.method.freshVerification.replyOnlyAccountRecords === kcthFull.expectedAccountReplies &&
      kcthLedger.method.freshVerification.excludedConversationContextArticles === kcthFull.expectedExcludedContextItems &&
      kcthLedger.method.freshVerification.exactStatusIdMatchToJuly14Ledger === true &&
      kcthLedger.method.freshVerification.missingStatusIds.length === 0 &&
      kcthLedger.method.freshVerification.newStatusIds.length === 0 &&
      kcthLedger.method.freshVerification.uniqueShortUrlSetMatch === true &&
      kcthLedger.method.freshVerification.accountOwnedMetricSnapshotMatch === true &&
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
      kcthAggregateFindingsRecompute &&
      kcthRelationshipCounts["account-post"] === kcthFull.expectedAccountPosts &&
      kcthRelationshipCounts["account-reply"] === kcthFull.expectedAccountReplies &&
      kcthRelationshipCounts.repost === kcthFull.expectedReposts &&
      kcthAuthoredRecords.length === kcthFull.expectedAuthoredStatuses &&
      kcthRepostSourceHandles.size === kcthFull.expectedRepostSourceAccounts &&
      kcthExternalHandles.size === kcthFull.expectedExternalHandles &&
      countKcthMention("@QuintonLucasKC") === kcthFull.expectedQuintonLucasMentions &&
      countKcthMention("@Robinson4kc") === kcthFull.expectedMelissaRobinsonMentions &&
      kcthCityPoliticalReposts.length === kcthFull.expectedCityPoliticalFigureReposts &&
      kcthDirectResponseRecords.length === kcthFull.expectedDirectCouncilResponses &&
      new Set(kcthDirectResponseRecords.map((record) => record.statusOwner.toLowerCase())).size === kcthFull.expectedDirectCouncilAccounts &&
      kcthDirectResponseRecords.every((record) => record.metricOwner === "source-status-not-kctownhall-repost-action") &&
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
      kcthReposterRows.length === kcthFull.expectedRepostBearingStatuses &&
      kcthReposterRows.every((item) =>
        kcthAuthoredRecords.some((record) => record.statusId === item.statusId) &&
          item.statusUrl.endsWith(`/status/${item.statusId}`) &&
          item.displayedReposts === item.publicReposterHandles.length + item.unassignedDisplayedReposts
      ) &&
      kcthReposterRows.reduce((sum, item) => sum + item.displayedReposts, 0) === kcthFull.expectedDisplayedReposts &&
      kcthPublicReposterHandles.length === kcthFull.expectedPublicReposterAppearances &&
      kcthDistinctPublicReposters.size === kcthFull.expectedDistinctPublicReposters &&
      kcthReposterRows.reduce((sum, item) => sum + item.unassignedDisplayedReposts, 0) === kcthFull.expectedUnassignedReposts &&
      kcthCouncilReposterAppearances.length === kcthFull.expectedCouncilReposterAppearances &&
      kcthDistinctCouncilReposters.size === kcthFull.expectedCouncilReposterAccounts &&
      kcthCouncilReposterAppearances.every((item) =>
        kcthReposterRows.some((row) => row.statusId === item.statusId && row.publicReposterHandles.includes(item.handle)) &&
          item.statusUrl.endsWith(`/status/${item.statusId}`) &&
          item.roleSourceId === kcthCouncilRoleSourceByHandle.get(item.handle.toLowerCase())
      ) &&
      kcthLedger.aggregateFindings.publicReposterAudit.auditedAccountAuthoredStatuses === kcthFull.expectedRepostBearingStatuses &&
      kcthLedger.aggregateFindings.publicReposterAudit.displayedReposts === kcthFull.expectedDisplayedReposts &&
      kcthLedger.aggregateFindings.publicReposterAudit.publicIdentityAppearances === kcthFull.expectedPublicReposterAppearances &&
      kcthLedger.aggregateFindings.publicReposterAudit.distinctPublicHandles === kcthFull.expectedDistinctPublicReposters &&
      kcthLedger.aggregateFindings.publicReposterAudit.unassignedDisplayedReposts === kcthFull.expectedUnassignedReposts &&
      kcthLedger.aggregateFindings.publicReposterAudit.councilMemberPublicAppearances === kcthFull.expectedCouncilReposterAppearances &&
      kcthLedger.aggregateFindings.publicReposterAudit.distinctCouncilMemberAccounts === kcthFull.expectedCouncilReposterAccounts &&
      /dated lower-bound identity surface/i.test(kcthLedger.aggregateFindings.publicReposterAudit.boundary) &&
      kcTownHallPopulationAudit.uniqueItemsRecovered === kcthFull.expectedUniqueItems &&
      kcTownHallPopulationAudit.repliesTabArticlesRecovered === kcthFull.expectedRepliesRouteArticles &&
      kcTownHallPopulationAudit.freshVerificationExactStatusIdMatch === true &&
      kcTownHallCorpusFindings.tireWorkflowRecords === kcthFull.expectedTireWorkflowRecords &&
      kcTownHallCorpusFindings.directCouncilMemberResponseStatuses === kcthFull.expectedDirectCouncilResponses &&
      kcTownHallCorpusFindings.publicReposterAppearances === kcthFull.expectedPublicReposterAppearances &&
      kcTownHallCorpusFindings.authoredVisibleLikes === kcthFull.expectedAuthoredVisibleLikes &&
      kcTownHallSocialCorpus.sources.length === kcthFull.expectedSourceCount &&
      kcTownHallSocialCorpus.observations.length === kcthFull.expectedObservationCount &&
      kcTownHallSocialCorpus.claims.length === kcthFull.expectedClaimCount &&
      kcTownHallSocialCorpus.researchInquiries.length === kcthFull.expectedInquiryCount &&
      kcthFullSources.every((source) =>
        source?.visibility === "public" && source.canonicalUrl?.startsWith("https://") && source.supportsGenerally.length && source.doesNotEstablish.length >= 4
      ) &&
      kcthFull.officialRoleSourceIds.every((sourceId) => sourceById.get(sourceId)?.kind === "government-record") &&
      kcthIndependentCoverageSource?.kind === "published-article" &&
      kcthIndependentCoverageSource.doesNotEstablish.some((boundary) => /withdrawal reason/i.test(boundary)) &&
      kcthAuditSource?.kind === "research-run" &&
      kcthAuditSource.canonicalUrl?.includes(kcthFull.ledgerPath) &&
      kcthActiveClaim?.status === "confirmed-with-boundary" &&
      kcthActiveClaim.projections.some((projection) =>
        projection.status === "active" &&
          projection.surfaces.includes("/work/kc-town-hall") &&
          /shared public account as an operating surface/i.test(projection.text) &&
          /100 of 183 surviving records/i.test(projection.text) &&
          /seven appearances by three then-sitting Council-member accounts/i.test(projection.text) &&
          /two sitting members authored direct responses/i.test(projection.text) &&
          !/100 completed pickups|100 households served|endorsed KC Town Hall/i.test(projection.text)
      ) &&
      kcthActiveClaim.boundaries.some((boundary) => /shared project identity/i.test(boundary)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /One hundred records equal/i.test(antiClaim)) &&
      kcthActiveClaim.antiClaims.some((antiClaim) => /endorsed KC Town Hall/i.test(antiClaim)) &&
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
      /all 40 repost-bearing/i.test(kcthDocumentation) &&
      /seven public repost-list appearances/i.test(kcthDocumentation) &&
      !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(kcthLedgerText) &&
      kcthRecords.every((record) =>
        !/(?:816[- .])\d{3}[- .]\d{4}/.test(record.publicSummary) &&
        !/\b\d{3,5}\s+(?:N\.?|S\.?|E\.?|W\.?)?\s*[A-Z][A-Za-z]+(?:\s+(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard))\b/i.test(record.publicSummary)
      ) &&
      publicRegistryText.includes(kcthFull.activeClaimId) &&
      kcthFull.heldClaimIds.every((id) => !publicRegistryText.includes(id))
  );
  const fieldPractice = suite.pilot.kcTownHallFieldPractice;
  const fieldPracticeIntakes = fieldPractice.intakeIds.map((id) => intakeById.get(id));
  const fieldPracticeObservations = kcTownHallFieldPractice.observations.map((item) => observationById.get(item.id));
  const fieldPracticeSources = fieldPractice.sourceIds.map((id) => sourceById.get(id));
  const fieldPracticeProtectedSources = fieldPractice.protectedSourceIds.map((id) => sourceById.get(id));
  const fieldPracticeClaims = fieldPractice.claimIds.map((id) => claimById.get(id));
  const fieldPracticeInquiries = fieldPractice.inquiryIds.map((id) => inquiryById.get(id));
  const fieldDeliveryClaim = claimById.get(fieldPractice.fieldDeliveryClaimId);
  const tireRoleClaim = claimById.get(fieldPractice.tireRoleClaimId);
  const fieldPracticeReviewSource = sourceById.get(fieldPractice.reviewSourceId);
  const fieldPracticeProofCoverage = fieldPractice.proofIds.map((proofId) =>
    knowledgeBank.proofCoverageTargets.find((target) => target.proofId === proofId)
  );
  const fieldPracticeReport = overrides.kcTownHallFieldPracticeReport ?? readFileSync(
    path.join(repoRoot, fieldPractice.documentationPath),
    "utf8"
  );
  const fieldPracticeContentSha256 = createHash("sha256").update(JSON.stringify({
    intakes: kcTownHallFieldPractice.intakeItems,
    observations: kcTownHallFieldPractice.observations,
    sources: kcTownHallFieldPractice.sources,
    claims: kcTownHallFieldPractice.claims,
    inquiries: kcTownHallFieldPractice.researchInquiries
  })).digest("hex");
  const fieldPracticeCanonicalRecordsSha256 = createHash("sha256").update(JSON.stringify({
    intakes: fieldPracticeIntakes,
    observations: fieldPracticeObservations,
    sources: fieldPracticeSources,
    claims: fieldPracticeClaims,
    inquiries: fieldPracticeInquiries
  })).digest("hex");
  const fieldPracticeProofProjectionSha256 = createHash("sha256").update(JSON.stringify({
    publicWording: kcTownHallProof?.publicWording,
    shortWording: kcTownHallProof?.shortWording,
    detailedPublicWording: kcTownHallProof?.detailedPublicWording
  })).digest("hex");
  const fieldPracticeSharedPublicSurfacesSha256 = createHash("sha256")
    .update(kcTownHallAdditionalPublicSurfaceText)
    .digest("hex");
  const fieldPracticePublicReviewReportSha256 = createHash("sha256")
    .update(fieldPracticeReport)
    .digest("hex");
  const fieldPracticeReviewLocksMatch =
    fieldPracticeContentSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.corpusSha256 &&
    fieldPracticeCanonicalRecordsSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.canonicalRecordsSha256 &&
    kcTownHallContentSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.governedKnowledgeSha256 &&
    fieldPracticeProofProjectionSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.proofProjectionSha256 &&
    kcTownHallMdxSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.caseStudyMdxSha256 &&
    fieldPracticeSharedPublicSurfacesSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.sharedPublicSurfacesSha256 &&
    fieldPracticePublicReviewReportSha256 === KCTH_FIELD_PRACTICE_REVIEW_LOCKS.publicReviewReportSha256;
  const fieldPracticePrivatePathFree = !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(
    JSON.stringify(kcTownHallFieldPractice) + fieldPracticeReport
  );
  const fieldPracticeEvidenceClosed = fieldPracticeClaims.every((claim) =>
    claim?.evidence.every((evidence) =>
      evidence.supports.length && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const fieldPracticeAffirmativeText = fieldPracticeClaims.flatMap((claim) => [
    claim?.internalClaim,
    ...(claim?.projections.map((projection) => projection.text) ?? []),
    ...(claim?.evidence.flatMap((evidence) => [
      evidence.publicNote,
      evidence.internalExcerpt,
      ...evidence.supports
    ]) ?? [])
  ]).filter(Boolean).join("\n");
  const fieldPracticeAffirmativeSentences = fieldPracticeAffirmativeText
    .split(/[.!?\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const fieldPracticeSensitiveConcept = /(?:Phase One|first[- ]stage|general contractor|field coordinat|construction|restoration|rehabilitation|renovation|roof(?:ing)?|masonry|parapet|survey|questionnaire|handbill|respondent|resident[- ]feedback|neighborhood engagement|data(?:base| system)|site[- ]based listening|community mandate|Tired of Tires|tire (?:collection|pickup|service)|monthly (?:collection|pickup)|hauling|disposal|Indian Mound|Cleveland Avenue|Unify to Beautify|Pastor Lee|capital allocation|municipal investment)/i;
  const fieldPracticeEpistemicFrame = /(?:Jamie (?:reports?|reported)|Jamie's reported|participant[- ]memory|memory (?:account|lead)|first[- ]person|remain(?:s|ed)? (?:held|open|uncorroborated|under research)|pending (?:corroboration|independent)|not (?:independently )?(?:established|verified|corroborated)|requires? independent|needs? (?:independent|a dated)|under research)/i;
  const fieldPracticeEpistemicallyBounded = fieldPracticeAffirmativeSentences.every((sentence) =>
    !/(?:Jamie|Jamie's)/i.test(sentence) ||
      !fieldPracticeSensitiveConcept.test(sentence) ||
      fieldPracticeEpistemicFrame.test(sentence)
  );
  const fieldPracticeOutcomeInflationFree = fieldPracticeAffirmativeSentences.every((sentence) => {
    const attributesOutcome = /(?:Jamie|Jamie's|his (?:campaign|program)|the (?:campaign|program))[^.]{0,180}(?:yield(?:ed|ing)?|caus(?:ed|ing)|brought|secured|produced|established|resulted in)[^.]{0,120}(?:community mandate|capital|allocation|funding|municipal investment)/i.test(sentence);
    return !attributesOutcome || fieldPracticeEpistemicFrame.test(sentence) || /(?:do not|does not|did not|cannot|without|require|needs?|pending|unverified|uncorroborated)/i.test(sentence);
  });
  const fieldPracticeOverclaimPatterns = [
    /Jamie[^.]{0,120}(?:alone|sole(?:ly)?)[^.]{0,120}(?:survey|handbill|data system)/i,
    /(?:proposal|archive|archives)[^.]{0,120}(?:prove|proves|establish|establishes)[^.]{0,120}Jamie[^.]{0,120}(?:designed|authored)[^.]{0,100}(?:survey|handbill|data system)/i,
    /(?:survey|site conversations?)[^.]{0,100}(?:statistically representative|audited (?:community )?mandate)/i,
    /(?:public archive|public archives|Ghost|social (?:archive|records?))[^.]{0,120}(?:prove|proves|establish|establishes)[^.]{0,120}Jamie[^.]{0,160}(?:individual(?:ly)?|alone|sole(?:ly)?|designed|coordinated|drove|unloaded|logged|operated)/i,
    /Jamie[^.]{0,120}(?:alone|sole(?:ly)?)[^.]{0,120}(?:created|founded|co-founded|Cleveland Avenue|Unify to Beautify)/i,
    /Jamie[^.]{0,100}originated[^.]{0,80}Pastor Lee/i,
    /Jamie[^.]{0,120}(?:caused|secured|drove|resulted in)[^.]{0,120}(?:capital|allocation|funding)/i,
    /(?:verified|confirmed)[^.]*(?:Jamie[^.]{0,100}(?:alone|sole(?:ly)?|caused)|general contractor|Phase One[^.]{0,40}completed in 2019)/i
  ];
  const fieldPracticeOverclaimFree = fieldPracticeOverclaimPatterns.every(
    (pattern) => !pattern.test(fieldPracticeAffirmativeText)
  );
  const kcTownHallRenderedProofText = [
    kcTownHallProof?.publicWording,
    kcTownHallProof?.shortWording,
    kcTownHallProof?.detailedPublicWording,
    kcTownHallAdditionalPublicSurfaceText
  ].filter(Boolean).join("\n");
  const fieldPracticeHeldFromRenderedProof = kcTownHallRenderedProofText
    .split(/[.!?\n]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .every((sentence) => {
      const constructionResult = /(?:Phase One|first[- ]stage|construction|restoration|rehabilitation|renovation|roof(?:ing)?|masonry|parapet)/i.test(sentence) &&
        /(?:deliver(?:ed|y)|complet(?:e|ed|ion)|finish(?:ed)?|built|restor(?:e|ed)|rehabilitat(?:e|ed)|renovat(?:e|ed)|manage(?:d)?|coordinat(?:e|ed)|direct(?:ed)?|oversee|oversaw|led|lead|spearhead(?:ed)?|supervis(?:e|ed)|execut(?:e|ed)|administ(?:er|ered)|orchestrat(?:e|ed)|carr(?:y|ied) out)/i.test(sentence);
      const surveyAuthorship = /(?:resident[- ]feedback|neighborhood (?:feedback|engagement)|survey|questionnaire|handbill|respondent|data(?:base| system)|community mandate|site[- ]based listening)/i.test(sentence) &&
        /(?:built|creat(?:e|ed)|design(?:ed)?|author(?:ed)?|implement(?:ed)?|produc(?:e|ed)|establish(?:ed)?|develop(?:ed)?|fashion(?:ed)?|assembl(?:e|ed)|invent(?:ed)?|devis(?:e|ed)|engineer(?:ed)?|launch(?:ed)?|formulat(?:e|ed)|orchestrat(?:e|ed)|\bmade\b)/i.test(sentence);
      const heldProgram = /(?:Tired of Tires|tire (?:collection|pickup|service)|Indian Mound|Cleveland Avenue|Unify to Beautify|Pastor Lee)/i.test(sentence);
      return !/general contractor|\bGC\b/i.test(sentence) &&
        !/Phase One[^.]{0,60}(?:completed|complete) in 2019/i.test(sentence) &&
        !constructionResult &&
        !surveyAuthorship &&
        !heldProgram;
    });
  const fieldPracticeComplete = Boolean(
    kcTownHallFieldPractice.intakeItems.length === fieldPractice.expectedIntakeCount &&
      kcTownHallFieldPractice.observations.length === fieldPractice.expectedObservationCount &&
      kcTownHallFieldPractice.sources.length === fieldPractice.expectedSourceCount &&
      kcTownHallFieldPractice.claims.length === fieldPractice.expectedClaimCount &&
      kcTownHallFieldPractice.researchInquiries.length === fieldPractice.expectedInquiryCount &&
      fieldPracticeContentSha256 === fieldPractice.approvedContentSha256 &&
      fieldPracticeReviewLocksMatch &&
      fieldPracticeIntakes.every((intake) =>
        intake?.boundaries.length >= 3 && intake.sourceIds.length && intake.observationIds.length && intake.researchInquiryIds.length
      ) &&
      fieldPracticeObservations.every((observation) =>
        observation?.locator && observation.limitations.length >= 2 && observation.claimIds.length && observation.researchInquiryIds.length
      ) &&
      fieldPracticeObservations.filter((observation) => observation?.kind === "participant-memory").length === 7 &&
      fieldPracticeObservations.filter((observation) => observation?.kind === "participant-memory").every(
        (observation) => observation?.status === "captured"
      ) &&
      fieldPracticeSources.every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length >= 3) &&
      fieldPracticeProtectedSources.every((source) =>
        source?.visibility === "protected" &&
          source.preservationStatus === "private" &&
          source.protectedLocatorId &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl
      ) &&
      fieldPracticeReviewSource?.visibility === "public" &&
      fieldPracticeReviewSource.kind === "research-run" &&
      fieldPracticeReviewSource.canonicalUrl?.endsWith(fieldPractice.documentationPath) &&
      fieldPracticeReviewSource.doesNotEstablish.some((boundary) => /independently verified/i.test(boundary)) &&
      fieldPracticeClaims.every((claim) =>
        claim?.status === "use-with-care" &&
          claim.boundaries.length >= 3 &&
          claim.antiClaims.length >= 4 &&
          claim.projections.length > 0 &&
          claim.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0)
      ) &&
      fieldPracticeOverclaimFree &&
      fieldPracticeEpistemicallyBounded &&
      fieldPracticeOutcomeInflationFree &&
      fieldPracticeHeldFromRenderedProof &&
      fieldPracticeEvidenceClosed &&
      fieldDeliveryClaim?.boundaries.some((boundary) =>
        /does not independently establish general-contractor title or actual Phase One completion/i.test(boundary)
      ) &&
      fieldDeliveryClaim.antiClaims.some((antiClaim) => /proposal proves Jamie was general contractor/i.test(antiClaim)) &&
      fieldDeliveryClaim.antiClaims.some((antiClaim) => /proposal proves Phase One was completed in 2019/i.test(antiClaim)) &&
      tireRoleClaim?.boundaries.some((boundary) => /Indian Mound expansion needs/i.test(boundary)) &&
      tireRoleClaim.boundaries.some((boundary) => /not completed service units/i.test(boundary)) &&
      fieldPracticeInquiries.every((inquiry) =>
        inquiry?.findings.length >= 2 && inquiry.limitations.length >= 3 && inquiry.sourceIds.length >= 2
      ) &&
      fieldPracticeInquiries.some((inquiry) => inquiry?.resultStatus === "inconclusive") &&
      fieldPracticeInquiries.some((inquiry) => inquiry?.resultStatus === "partially-recovered") &&
      fieldPracticeProofCoverage.every((coverage) =>
        coverage &&
          fieldPractice.sourceIds.some((sourceId) => coverage.sourceIds.includes(sourceId)) &&
          fieldPractice.inquiryIds.some((inquiryId) => coverage.researchInquiryIds.includes(inquiryId))
      ) &&
      /does not use[\s\S]{0,50}general contractor/i.test(fieldPracticeReport) &&
      /not later independent proof of completion/i.test(fieldPracticeReport) &&
      /source body did not materialize/i.test(fieldPracticeReport) &&
      /website remains\s+unchanged/i.test(fieldPracticeReport) &&
      fieldPracticePrivatePathFree &&
      fieldPractice.claimIds.every((id) => !publicRegistryText.includes(id)) &&
      !/general contractor|Phase One was completed in 2019/i.test(kcTownHallMdx)
  );
  const fieldPracticeDiagnosticChecks = {
    counts: kcTownHallFieldPractice.intakeItems.length === fieldPractice.expectedIntakeCount &&
      kcTownHallFieldPractice.observations.length === fieldPractice.expectedObservationCount &&
      kcTownHallFieldPractice.sources.length === fieldPractice.expectedSourceCount &&
      kcTownHallFieldPractice.claims.length === fieldPractice.expectedClaimCount &&
      kcTownHallFieldPractice.researchInquiries.length === fieldPractice.expectedInquiryCount,
    locks: fieldPracticeContentSha256 === fieldPractice.approvedContentSha256 &&
      fieldPracticeReviewLocksMatch,
    intakes: fieldPracticeIntakes.every((intake) =>
      intake?.boundaries.length >= 3 && intake.sourceIds.length &&
      intake.observationIds.length && intake.researchInquiryIds.length
    ),
    observations: fieldPracticeObservations.every((observation) =>
      observation?.locator && observation.limitations.length >= 2 &&
      observation.claimIds.length && observation.researchInquiryIds.length
    ) && fieldPracticeObservations.filter((observation) =>
      observation?.kind === "participant-memory"
    ).length === 7,
    sources: fieldPracticeSources.every((source) =>
      source?.supportsGenerally.length && source.doesNotEstablish.length >= 3
    ),
    claims: fieldPracticeClaims.every((claim) =>
      claim?.status === "use-with-care" && claim.boundaries.length >= 3 &&
      claim.antiClaims.length >= 4 && claim.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      )
    ),
    semantics: fieldPracticeOverclaimFree && fieldPracticeEpistemicallyBounded &&
      fieldPracticeOutcomeInflationFree && fieldPracticeHeldFromRenderedProof &&
      fieldPracticeEvidenceClosed,
    semanticParts: {
      overclaimFree: fieldPracticeOverclaimFree,
      epistemicallyBounded: fieldPracticeEpistemicallyBounded,
      outcomeInflationFree: fieldPracticeOutcomeInflationFree,
      heldFromRenderedProof: fieldPracticeHeldFromRenderedProof,
      evidenceClosed: fieldPracticeEvidenceClosed
    },
    inquiries: fieldPracticeInquiries.every((inquiry) =>
      inquiry?.findings.length >= 2 && inquiry.limitations.length >= 3 &&
      inquiry.sourceIds.length >= 2
    ),
    coverage: fieldPracticeProofCoverage.every((coverage) =>
      coverage &&
      fieldPractice.sourceIds.some((sourceId) => coverage.sourceIds.includes(sourceId)) &&
      fieldPractice.inquiryIds.some((inquiryId) => coverage.researchInquiryIds.includes(inquiryId))
    ),
    report: /does not use[\s\S]{0,50}general contractor/i.test(fieldPracticeReport) &&
      /not later independent proof of completion/i.test(fieldPracticeReport) &&
      /source body did not materialize/i.test(fieldPracticeReport) &&
      /website remains\s+unchanged/i.test(fieldPracticeReport),
    safety: fieldPracticePrivatePathFree &&
      fieldPractice.claimIds.every((id) => !publicRegistryText.includes(id)) &&
      !/general contractor|Phase One was completed in 2019/i.test(kcTownHallMdx)
  };
  const nycacFacebookEvents = suite.pilot.nycacFacebookEvents;
  const nycacFacebookManifestPath = path.join(repoRoot, nycacFacebookEvents.manifestPath);
  const nycacFacebookReportPath = path.join(repoRoot, nycacFacebookEvents.reportPath);
  const nycacFacebookManifestText = readFileSync(nycacFacebookManifestPath, "utf8");
  const nycacFacebookManifest = overrides.nycacFacebookEventPopulation ?? JSON.parse(nycacFacebookManifestText);
  const nycacFacebookReport = overrides.nycacFacebookEventReport ?? readFileSync(nycacFacebookReportPath, "utf8");
  const nycacFacebookMdx = overrides.nycacFacebookEventMdx ?? fairRentMdx;
  const nycacFacebookEventsRows = nycacFacebookManifest.events ?? [];
  const nycacFacebookEventIds = new Set(nycacFacebookEventsRows.map((event) => event.id));
  const nycacFacebookEventUrls = new Set(nycacFacebookEventsRows.map((event) => event.url));
  const nycacFacebookYearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacFacebookEventsRows, (event) => event.date?.slice(0, 4)))
      .map(([year, events]) => [year, events.length])
  );
  const nycacFacebookDirectEvents = nycacFacebookEventsRows.filter(
    (event) => event.relationToPage === "index-displayed-nycac-organizer"
  );
  const nycacFacebookCohostedEvents = nycacFacebookEventsRows.filter(
    (event) => event.relationToPage === "allied-or-cohosted-listing"
  );
  const nycacFacebookRecurringMeetingIds = new Set(
    nycacFacebookEventReviewSummary.recurringMeetingEventIds
  );
  const nycacFacebookRecurringMeetings = nycacFacebookEventsRows.filter(
    (event) => nycacFacebookRecurringMeetingIds.has(event.id)
  );
  const nycacFacebookPhysicalMeetingVenues = new Set(
    nycacFacebookRecurringMeetings
      .filter((event) => event.venueCategory === "cultural-or-community-space")
      .map((event) => event.venue)
  );
  const nycacFacebookVirtualMeetings = nycacFacebookRecurringMeetings.filter(
    (event) => event.venueCategory === "virtual"
  );
  const nycacFacebookResponseEvents = nycacFacebookEventsRows.filter(
    (event) => event.responseSnapshot?.respondedDisplay !== null
  );
  const nycacFacebookResponseThresholdCount = (minimum) => nycacFacebookEventsRows.filter(
    (event) => (event.responseSnapshot?.pointEstimate ?? 0) >= minimum
  ).length;
  const nycacFacebookWithheldLinkCount = nycacFacebookEventsRows.reduce(
    (total, event) => total + (event.withheldOutboundLinkCount ?? 0),
    0
  );
  const nycacFacebookOutboundUrls = nycacFacebookEventsRows.flatMap(
    (event) => event.outboundResources?.map((resource) => resource.url) ?? []
  );
  const nycacFacebookRecheck = nycacFacebookManifest.populationReconciliation?.detailAvailabilityRecheck;
  const nycacFacebookRecheckUnavailableIds = new Set(
    nycacFacebookRecheck?.temporarilyUnavailableEventIds ?? []
  );
  const nycacFacebookIntakes = nycacFacebookEventKnowledge.intakeItems.map((item) => intakeById.get(item.id));
  const nycacFacebookObservations = nycacFacebookEventKnowledge.observations.map((item) => observationById.get(item.id));
  const nycacFacebookSources = nycacFacebookEventKnowledge.sources.map((item) => sourceById.get(item.id));
  const nycacFacebookClaims = nycacFacebookEventKnowledge.claims.map((item) => claimById.get(item.id));
  const nycacFacebookInquiries = nycacFacebookEventKnowledge.researchInquiries.map((item) => inquiryById.get(item.id));
  const nycacFacebookPopulationClaim = claimById.get(nycacFacebookEvents.populationClaimId);
  const nycacFacebookParticipationClaim = claimById.get(nycacFacebookEvents.participationClaimId);
  const nycacFacebookResponseClaim = claimById.get(nycacFacebookEvents.responseClaimId);
  const nycacFacebookInterpretationClaim = claimById.get(nycacFacebookEvents.interpretationClaimId);
  const nycacFacebookOwnerExportInquiry = inquiryById.get(nycacFacebookEvents.ownerExportInquiryId);
  const nycacFacebookRoleInquiry = inquiryById.get(nycacFacebookEvents.roleInquiryId);
  const nycacFacebookProof = proofClaims.find((proof) => proof.id === nycacFacebookEvents.proofId);
  const nycacFacebookProofCoverage = knowledgeBank.proofCoverageTargets.find(
    (coverage) => coverage.proofId === nycacFacebookEvents.proofId
  );
  const nycacFacebookArticleSources = nycacFacebookEventArticleSourceIds.map((id) => sourceById.get(id));
  const nycacFacebookClaimIdSet = new Set(Object.values(nycacFacebookEventClaimIds));
  const nycacFacebookPageOccurrences = fairRentPage?.occurrences.filter(
    (occurrence) => nycacFacebookClaimIdSet.has(occurrence.claimId)
  ) ?? [];
  const nycacFacebookReviewConfiguration = {
    reviewSummary: nycacFacebookEventReviewSummary,
    articleSourceIds: nycacFacebookEventArticleSourceIds
  };
  const nycacFacebookGovernanceBindings = {
    proofCoverage: nycacFacebookProofCoverage,
    pageSourceOrder: fairRentPage?.sourceOrder,
    pageOccurrences: nycacFacebookPageOccurrences
  };
  const nycacFacebookSourceById = new Map(nycacFacebookSources.map((source) => [source?.id, source]));
  const nycacFacebookEvidenceClosed = nycacFacebookClaims.every((claim) =>
    claim?.evidence.every((evidence) =>
      evidence.supports.length > 0 && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const nycacFacebookAffirmativeProjectionText = [
    ...nycacFacebookClaims.flatMap((claim) =>
      claim?.projections.filter((projection) => projection.status === "active")
        .map((projection) => projection.text) ?? []
    ),
    nycacFacebookProof?.publicWording,
    nycacFacebookProof?.shortWording,
    nycacFacebookProof?.detailedPublicWording,
    nycacFacebookMdx,
    workSource
  ].filter(Boolean).join("\n");
  const nycacFacebookUnsafeAffirmativePatterns = [
    /9,?989 (?:people|attendees|participants|unique)/i,
    /Facebook responses? (?:equal|equaled|represented|proved|showed) (?:event )?attendance/i,
    /(?:platform|Facebook|response|RSVP|these) (?:labels|counts|responses|figures)[^.]{0,80}(?:measure|establish|prove|show|represent|equal|quantify|demonstrate)[^.]{0,80}(?:attendance|turnout|audience|reach|unique people|endorsement|conversion|mandate|impact)/i,
    /Jamie (?:solely |single-handedly )?(?:created|produced|organized|ran) (?:all|every|the) NYC Artist Coalition events?/i,
    /Jamie[^.]{0,100}(?:sole|single-handed)[^.]{0,100}(?:producer|author|organizer|created|produced|organized|ran)/i,
    /Jamie[^.]{0,80}authored every event page/i,
    /(?:event hosts?|speakers?|venues?|officials?|agencies?)[^.]{0,100}endorsed Jamie/i,
    /(?:the events?|the participation system|these convenings|the event practice)[^.]{0,100}(?:caused|brought about|secured|delivered|won|resulted in)[^.]{0,100}(?:Cabaret Law repeal|Office of Nightlife|policy outcomes?)/i,
    /all 34 event (?:pages|records) (?:were )?recovered/i,
    /complete (?:Facebook|Meta|historical) (?:owner )?(?:archive|history)/i
  ];
  const nycacFacebookAffirmativeSafe = nycacFacebookUnsafeAffirmativePatterns.every(
    (pattern) => !pattern.test(nycacFacebookAffirmativeProjectionText)
  );
  const nycacFacebookPublicArtifactText = JSON.stringify({
    manifest: nycacFacebookManifest,
    intakes: nycacFacebookIntakes,
    observations: nycacFacebookObservations,
    sources: nycacFacebookSources,
    articleSources: nycacFacebookArticleSources,
    claims: nycacFacebookClaims,
    inquiries: nycacFacebookInquiries,
    proof: nycacFacebookProof,
    proofCoverage: nycacFacebookProofCoverage,
    pageOccurrences: nycacFacebookPageOccurrences
  }) + nycacFacebookReport;
  const nycacFacebookPrivateDataFree =
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(nycacFacebookPublicArtifactText) &&
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(nycacFacebookPublicArtifactText) &&
    !/https?:\/\/(?:[^\s"']+\.)?(?:zoom\.us|meet\.google\.com|docs\.google\.com|drive\.google\.com)/i.test(nycacFacebookPublicArtifactText) &&
    !/"(?:rawDescription|rawBody|descriptionHtml|attendeeIdentities|attendees|guestList|contactPhone|phone|meetingCredentials|meetingId|passcode|privateWorkingDocument|authenticatedSessionState|cookie|sessionToken|capturePath)"\s*:/i.test(nycacFacebookPublicArtifactText);
  const nycacFacebookProofSourceText = readFileSync(
    path.join(repoRoot, "apps/www/src/data/proofs.ts"),
    "utf8"
  );
  const nycacFacebookProofStart = nycacFacebookProofSourceText.indexOf(
    'id: "nyc-artist-coalition-participation-system"'
  );
  const nycacFacebookProofEnd = nycacFacebookProofSourceText.indexOf(
    "\n  {\n    id:",
    nycacFacebookProofStart + 5
  );
  const nycacFacebookProofSnippet = nycacFacebookProofSourceText.slice(
    nycacFacebookProofStart,
    nycacFacebookProofEnd === -1 ? nycacFacebookProofSourceText.length : nycacFacebookProofEnd
  );
  const nycacFacebookManifestContentSha256 = createHash("sha256")
    .update(JSON.stringify(nycacFacebookManifest))
    .digest("hex");
  const nycacFacebookCanonicalKnowledgeSha256 = createHash("sha256")
    .update(JSON.stringify({
      intakeItems: nycacFacebookIntakes,
      observations: nycacFacebookObservations,
      sources: nycacFacebookSources,
      claims: nycacFacebookClaims,
      researchInquiries: nycacFacebookInquiries
    }))
    .digest("hex");
  const nycacFacebookProofContentSha256 = createHash("sha256")
    .update(JSON.stringify(nycacFacebookProof))
    .digest("hex");
  const nycacFacebookReviewConfigurationSha256 = createHash("sha256")
    .update(JSON.stringify(nycacFacebookReviewConfiguration))
    .digest("hex");
  const nycacFacebookArticleSourcesSha256 = createHash("sha256")
    .update(JSON.stringify(nycacFacebookArticleSources))
    .digest("hex");
  const nycacFacebookGovernanceBindingsSha256 = createHash("sha256")
    .update(JSON.stringify(nycacFacebookGovernanceBindings))
    .digest("hex");
  const nycacFacebookReviewLocksMatch =
    createHash("sha256").update(nycacFacebookManifestText).digest("hex") === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.manifestSha256 &&
    nycacFacebookManifestContentSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.manifestContentSha256 &&
    createHash("sha256").update(readFileSync(
      path.join(repoRoot, "apps/www/src/data/knowledge-bank/nycac-facebook-events-2026-07.ts"),
      "utf8"
    )).digest("hex") === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.governedModuleSha256 &&
    nycacFacebookCanonicalKnowledgeSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.canonicalKnowledgeSha256 &&
    nycacFacebookReviewConfigurationSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.reviewConfigurationSha256 &&
    nycacFacebookArticleSourcesSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.articleSourcesSha256 &&
    nycacFacebookGovernanceBindingsSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.governanceBindingsSha256 &&
    createHash("sha256").update(nycacFacebookReport).digest("hex") === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.publicReportSha256 &&
    createHash("sha256").update(nycacFacebookMdx).digest("hex") === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.caseStudyMdxSha256 &&
    createHash("sha256").update(nycacFacebookProofSnippet).digest("hex") === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.proofSnippetSha256 &&
    nycacFacebookProofContentSha256 === NYCAC_FACEBOOK_EVENT_REVIEW_LOCKS.proofContentSha256;
  const nycacFacebookEventsComplete = Boolean(
    existsSync(nycacFacebookManifestPath) &&
      existsSync(nycacFacebookReportPath) &&
      nycacFacebookManifest.schemaVersion === 2 &&
      nycacFacebookManifest.capturedAt === nycacFacebookEvents.reviewedAt &&
      nycacFacebookManifest.page?.handle === "nycartc" &&
      nycacFacebookManifest.populationReconciliation?.pageDisplayedPastEventCount === nycacFacebookEvents.expectedDisplayedControlSlots &&
      nycacFacebookManifest.populationReconciliation.recoveredIndexEventCount === nycacFacebookEvents.expectedRecoveredEventCount &&
      nycacFacebookManifest.populationReconciliation.recoveredDetailEventCount === nycacFacebookEvents.expectedRecoveredEventCount &&
      nycacFacebookManifest.populationReconciliation.unmaterializedCount === nycacFacebookEvents.expectedUnresolvedControlSlots &&
      nycacFacebookManifest.populationReconciliation.recoveredIndexEventCount +
        nycacFacebookManifest.populationReconciliation.unmaterializedCount ===
        nycacFacebookManifest.populationReconciliation.pageDisplayedPastEventCount &&
      /unmaterialized, not as nonexistent/i.test(
        nycacFacebookManifest.populationReconciliation.reconciliationNote
      ) &&
      nycacFacebookRecheck?.recoveredEventIdCount === nycacFacebookEvents.expectedRecoveredEventCount &&
      nycacFacebookRecheck.recoveredDetailCount === nycacFacebookEvents.expectedDetailRecheckRecovered &&
      nycacFacebookRecheck.temporarilyUnavailableDetailCount === nycacFacebookEvents.expectedDetailRecheckUnavailable &&
      nycacFacebookRecheckUnavailableIds.size === nycacFacebookEvents.expectedDetailRecheckUnavailable &&
      [...nycacFacebookRecheckUnavailableIds].every((id) => nycacFacebookEventIds.has(id)) &&
      /rather than evidence that those events did not exist/i.test(nycacFacebookRecheck.interpretation) &&
      nycacFacebookEventsRows.length === nycacFacebookEvents.expectedRecoveredEventCount &&
      nycacFacebookEventIds.size === nycacFacebookEvents.expectedRecoveredEventCount &&
      nycacFacebookEventUrls.size === nycacFacebookEvents.expectedRecoveredEventCount &&
      Object.entries(nycacFacebookEventReviewSummary.recoveredYears).every(
        ([year, count]) => nycacFacebookYearCounts[year] === count
      ) &&
      nycacFacebookDirectEvents.length === nycacFacebookEvents.expectedDirectOrganizerCount &&
      nycacFacebookCohostedEvents.length === nycacFacebookEvents.expectedCohostedCount &&
      nycacFacebookDirectEvents.length + nycacFacebookCohostedEvents.length === nycacFacebookEventsRows.length &&
      nycacFacebookRecurringMeetingIds.size === nycacFacebookEvents.expectedRecurringMeetingCount &&
      nycacFacebookRecurringMeetings.length === nycacFacebookEvents.expectedRecurringMeetingCount &&
      nycacFacebookPhysicalMeetingVenues.size === nycacFacebookEvents.expectedPhysicalMeetingVenueCount &&
      nycacFacebookVirtualMeetings.length === nycacFacebookEventReviewSummary.virtualMeetingRecords &&
      nycacFacebookEventsRows.every((event) =>
        event.url === `https://www.facebook.com/events/${event.id}/` &&
          /^\d{4}-\d{2}-\d{2}$/.test(event.date) &&
          event.title &&
          event.topics?.length > 0 &&
          event.responseSnapshot?.interpretation === "Historical Facebook response actions; not unique people or verified attendance."
      ) &&
      nycacFacebookResponseEvents.length === nycacFacebookEvents.expectedEventsWithResponses &&
      nycacFacebookResponseThresholdCount(100) === nycacFacebookEvents.expectedAtLeast100 &&
      nycacFacebookResponseThresholdCount(500) === nycacFacebookEvents.expectedAtLeast500 &&
      nycacFacebookResponseThresholdCount(1000) === nycacFacebookEvents.expectedAtLeast1000 &&
      nycacFacebookManifest.aggregateSnapshot?.eventsWithDisplayedResponseCount === nycacFacebookEvents.expectedEventsWithResponses &&
      nycacFacebookManifest.aggregateSnapshot.eventsAtOrAbove100Responses === nycacFacebookEvents.expectedAtLeast100 &&
      nycacFacebookManifest.aggregateSnapshot.eventsAtOrAbove500Responses === nycacFacebookEvents.expectedAtLeast500 &&
      nycacFacebookManifest.aggregateSnapshot.eventsAtOrAbove1000Responses === nycacFacebookEvents.expectedAtLeast1000 &&
      /not unique people/i.test(nycacFacebookManifest.aggregateSnapshot.interpretation) &&
      nycacFacebookWithheldLinkCount === nycacFacebookEvents.expectedWithheldLinkCount &&
      nycacFacebookManifest.postedSourceArticles?.length === nycacFacebookEvents.expectedPostedArticleCount &&
      nycacFacebookEventArticleSourceIds.length === nycacFacebookEvents.expectedPostedArticleCount &&
      new Set(nycacFacebookEventArticleSourceIds).size === nycacFacebookEvents.expectedPostedArticleCount &&
      nycacFacebookArticleSources.every((source) =>
        source?.kind === "published-article" && source.visibility === "public" && source.doesNotEstablish.length >= 3
      ) &&
      nycacFacebookManifest.postedSourceArticles.every((article) =>
        nycacFacebookEventIds.has(article.eventId) && /^https?:\/\//.test(article.url)
      ) &&
      nycacFacebookEventKnowledge.intakeItems.length === nycacFacebookEvents.expectedIntakeCount &&
      nycacFacebookEventKnowledge.observations.length === nycacFacebookEvents.expectedObservationCount &&
      nycacFacebookEventKnowledge.sources.length === nycacFacebookEvents.expectedSourceCount &&
      nycacFacebookEventKnowledge.claims.length === nycacFacebookEvents.expectedClaimCount &&
      nycacFacebookEventKnowledge.researchInquiries.length === nycacFacebookEvents.expectedInquiryCount &&
      nycacFacebookIntakes.every((intake) =>
        intake?.disposition === "integrated" && intake.boundaries.length >= 3 && intake.observationIds.length > 0 && intake.researchInquiryIds.length > 0
      ) &&
      nycacFacebookObservations.every((observation) =>
        observation?.locator && observation.publicSafe === true && observation.limitations.length >= 2 && observation.claimIds.length > 0
      ) &&
      nycacFacebookSources.every((source) =>
        source?.supportsGenerally.length > 0 && source.doesNotEstablish.length >= 3
      ) &&
      nycacFacebookSources.filter((source) => source?.visibility !== "public").every((source) =>
        source?.preservationStatus === "private" && source.protectedLocatorId && !source.canonicalUrl && !source.archiveUrl && !source.assetUrl
      ) &&
      nycacFacebookEvidenceClosed &&
      nycacFacebookPopulationClaim?.status === "confirmed-with-boundary" &&
      nycacFacebookPopulationClaim.boundaries.length >= 3 &&
      nycacFacebookPopulationClaim.antiClaims.length >= 4 &&
      nycacFacebookParticipationClaim?.status === "confirmed-with-boundary" &&
      nycacFacebookParticipationClaim.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc") && /helped establish and produce/i.test(projection.text)
      ) &&
      nycacFacebookParticipationClaim.boundaries.some((boundary) => /authorship or sole production/i.test(boundary)) &&
      nycacFacebookParticipationClaim.antiClaims.some((antiClaim) => /solely created or produced every/i.test(antiClaim)) &&
      nycacFacebookResponseClaim?.status === "confirmed-with-boundary" &&
      nycacFacebookResponseClaim.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc") && /not verified attendance or unique reach/i.test(projection.text)
      ) &&
      nycacFacebookResponseClaim.boundaries.some((boundary) => /not verified attendance, unique people/i.test(boundary)) &&
      nycacFacebookInterpretationClaim?.status === "use-with-care" &&
      nycacFacebookInterpretationClaim.projections.every((projection) =>
        projection.status === "active" && projection.key === "archive-note" && projection.surfaces.every((surface) => surface.startsWith("docs/"))
      ) &&
      nycacFacebookInterpretationClaim.boundaries.some((boundary) => /attributed to Jamie/i.test(boundary)) &&
      nycacFacebookOwnerExportInquiry?.resultStatus === "partially-recovered" &&
      nycacFacebookOwnerExportInquiry.findings.length >= 4 &&
      nycacFacebookOwnerExportInquiry.limitations.length >= 3 &&
      nycacFacebookRoleInquiry?.resultStatus === "partially-recovered" &&
      nycacFacebookRoleInquiry.findings.length >= 4 &&
      nycacFacebookRoleInquiry.limitations.length >= 4 &&
      nycacFacebookProof?.status === "careful" &&
      /helped establish and produce/i.test(nycacFacebookProof.publicWording) &&
      nycacFacebookProof.doNotSay.some((item) => /Facebook responses equal physical attendance/i.test(item)) &&
      nycacFacebookProofCoverage?.status === "partially-source-backed" &&
      nycacFacebookProofCoverage.sourceIds.includes(nycacFacebookEvents.manifestSourceId) &&
      nycacFacebookProofCoverage.researchInquiryIds.includes(nycacFacebookEvents.ownerExportInquiryId) &&
      nycacFacebookProofCoverage.researchInquiryIds.includes(nycacFacebookEvents.roleInquiryId) &&
      nycacFacebookMdx.includes(nycacFacebookEvents.participationClaimId) &&
      nycacFacebookMdx.includes(nycacFacebookEvents.responseClaimId) &&
      fairRentPage?.occurrences.some((occurrence) =>
        occurrence.claimId === nycacFacebookEvents.participationClaimId && occurrence.sourceIds?.includes(nycacFacebookEvents.manifestSourceId)
      ) &&
      fairRentPage?.occurrences.some((occurrence) =>
        occurrence.claimId === nycacFacebookEvents.responseClaimId && occurrence.sourceIds?.includes(nycacFacebookEvents.manifestSourceId)
      ) &&
      nycacFacebookEventsRows.every((event) => nycacFacebookReport.includes(event.url)) &&
      /100 percent control-slot accounting, not 100 percent historical content/i.test(nycacFacebookReport) &&
      /Facebook response count[\s\S]{0,160}not verified attendance/i.test(nycacFacebookReport) &&
      /helped establish and produce/i.test(nycacFacebookReport) &&
      /platform volatility/i.test(nycacFacebookReport) &&
      publicRegistryText.includes("SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026") &&
      !publicRegistryText.includes("LOC-NYCAC-FACEBOOK-EVENT-RESEARCH-2026") &&
      !publicRegistryText.includes("LOC-NYCAC-FACEBOOK-EVENT-FIRSTHAND-2026") &&
      nycacFacebookManifest.publicSafety?.rawDescriptionsPublished === false &&
      nycacFacebookManifest.publicSafety.attendeeIdentitiesPublished === false &&
      nycacFacebookManifest.publicSafety.contactDetailsPublished === false &&
      nycacFacebookManifest.publicSafety.accessCredentialsPublished === false &&
      nycacFacebookAffirmativeSafe &&
      nycacFacebookPrivateDataFree &&
      nycacFacebookReviewLocksMatch
  );
  const personalWowListFacebookEvents = suite.pilot.personalWowListFacebookEvents;
  const personalWowListFacebookManifestPath = path.join(repoRoot, personalWowListFacebookEvents.manifestPath);
  const personalWowListFacebookReportPath = path.join(repoRoot, personalWowListFacebookEvents.reportPath);
  const personalWowListFacebookManifestText = readFileSync(personalWowListFacebookManifestPath, "utf8");
  const personalWowListFacebookManifest = overrides.personalWowListFacebookEventPopulation ??
    JSON.parse(personalWowListFacebookManifestText);
  const personalWowListFacebookReport = overrides.personalWowListFacebookEventReport ??
    readFileSync(personalWowListFacebookReportPath, "utf8");
  const personalWowListFacebookWowListMdx = overrides.personalWowListFacebookWowListMdx ??
    readFileSync(path.join(repoRoot, "apps/www/src/content/work/wowlist.mdx"), "utf8");
  const personalWowListFacebookSundayDinnerMdx = overrides.personalWowListFacebookSundayDinnerMdx ??
    readFileSync(path.join(repoRoot, "apps/www/src/content/work/196-sunday-dinner.mdx"), "utf8");
  const personalFacebookLedgerRows = personalWowListFacebookManifest.populationLedger ?? [];
  const personalFacebookSelectedEvents = personalWowListFacebookManifest.selectedPublicEvents ?? [];
  const personalFacebookMissionRoutes = personalWowListFacebookManifest.missionRelevantSourceRoutes ?? [];
  const personalFacebookLedgerOrdinals = new Set(personalFacebookLedgerRows.map((row) => row.ordinal));
  const personalFacebookSelectedOrdinals = new Set(personalFacebookSelectedEvents.map((event) => event.ordinal));
  const personalFacebookDispositionCounts = Object.fromEntries(
    Object.entries(Object.groupBy(personalFacebookLedgerRows, (row) => row.disposition))
      .map(([disposition, rows]) => [disposition, rows.length])
  );
  const personalFacebookDetailCounts = Object.fromEntries(
    Object.entries(Object.groupBy(personalFacebookLedgerRows, (row) => row.detailAvailability))
      .map(([detailAvailability, rows]) => [detailAvailability, rows.length])
  );
  const personalFacebookPrivacyCounts = Object.fromEntries(
    Object.entries(Object.groupBy(personalFacebookLedgerRows, (row) => row.privacyDisplay))
      .map(([privacyDisplay, rows]) => [privacyDisplay, rows.length])
  );
  const personalFacebookYearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(personalFacebookLedgerRows, (row) => row.year))
      .map(([year, rows]) => [year, rows.length])
  );
  const personalFacebookRecurringInstances = personalFacebookLedgerRows.filter(
    (row) => row.recurringInstance === true
  );
  const personalFacebookIntakes = personalWowListFacebookEventKnowledge.intakeItems.map(
    (item) => intakeById.get(item.id)
  );
  const personalFacebookObservations = personalWowListFacebookEventKnowledge.observations.map(
    (item) => observationById.get(item.id)
  );
  const personalFacebookSources = personalWowListFacebookEventKnowledge.sources.map(
    (item) => sourceById.get(item.id)
  );
  const personalFacebookClaims = personalWowListFacebookEventKnowledge.claims.map(
    (item) => claimById.get(item.id)
  );
  const personalFacebookInquiries = personalWowListFacebookEventKnowledge.researchInquiries.map(
    (item) => inquiryById.get(item.id)
  );
  const personalFacebookPopulationClaim = claimById.get(personalWowListFacebookEvents.populationClaimId);
  const personalFacebookConveningClaim = claimById.get(personalWowListFacebookEvents.conveningClaimId);
  const personalFacebookSundayDinnerClaim = claimById.get(personalWowListFacebookEvents.sundayDinnerClaimId);
  const personalFacebookWowListClaim = claimById.get(personalWowListFacebookEvents.wowListClaimId);
  const personalFacebookEarlyPracticeClaim = claimById.get(personalWowListFacebookEvents.earlyPracticeClaimId);
  const personalFacebookPersonalExportInquiry = inquiryById.get(personalWowListFacebookEvents.personalExportInquiryId);
  const personalFacebookWowListExportInquiry = inquiryById.get(personalWowListFacebookEvents.wowListExportInquiryId);
  const personalFacebookCorroborationInquiry = inquiryById.get(personalWowListFacebookEvents.corroborationInquiryId);
  const personalFacebookSundayDinnerProof = proofClaims.find(
    (proof) => proof.id === personalWowListFacebookEvents.sundayDinnerProofId
  );
  const personalFacebookWowListProof = proofClaims.find(
    (proof) => proof.id === personalWowListFacebookEvents.wowListProofId
  );
  const personalFacebookSundayDinnerCoverage = knowledgeBank.proofCoverageTargets.find(
    (coverage) => coverage.proofId === personalWowListFacebookEvents.sundayDinnerProofId
  );
  const personalFacebookWowListCoverage = knowledgeBank.proofCoverageTargets.find(
    (coverage) => coverage.proofId === personalWowListFacebookEvents.wowListProofId
  );
  const personalFacebookWowListPage = knowledgeBank.pages.find((page) => page.id === "wowlist");
  const personalFacebookSundayDinnerPage = knowledgeBank.pages.find((page) => page.id === "196-sunday-dinner");
  const personalFacebookClaimIdSet = new Set(Object.values(personalWowListFacebookEventClaimIds));
  const personalFacebookPageOccurrences = [
    ...(personalFacebookWowListPage?.occurrences.filter((occurrence) =>
      personalFacebookClaimIdSet.has(occurrence.claimId)
    ) ?? []),
    ...(personalFacebookSundayDinnerPage?.occurrences.filter((occurrence) =>
      personalFacebookClaimIdSet.has(occurrence.claimId)
    ) ?? [])
  ];
  const personalFacebookReviewConfiguration = {
    reviewSummary: personalWowListFacebookEventReviewSummary,
    sourceIds: personalWowListFacebookEventSourceIds,
    claimIds: personalWowListFacebookEventClaimIds
  };
  const personalFacebookGovernanceBindings = {
    proofCoverage: [personalFacebookSundayDinnerCoverage, personalFacebookWowListCoverage],
    pages: [
      {
        id: personalFacebookSundayDinnerPage?.id,
        sourceOrder: personalFacebookSundayDinnerPage?.sourceOrder,
        occurrences: personalFacebookSundayDinnerPage?.occurrences
      },
      {
        id: personalFacebookWowListPage?.id,
        sourceOrder: personalFacebookWowListPage?.sourceOrder,
        occurrences: personalFacebookWowListPage?.occurrences
      }
    ]
  };
  const personalFacebookEvidenceClosed = personalFacebookClaims.every((claim) =>
    claim?.evidence.length > 0 && claim.evidence.every((evidence) =>
      evidence.supports.length > 0 && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const personalFacebookPublicProjectionText = [
    ...personalFacebookClaims.flatMap((claim) =>
      claim?.projections.filter((projection) => projection.status === "active")
        .map((projection) => projection.text) ?? []
    ),
    personalFacebookSundayDinnerProof?.publicWording,
    personalFacebookSundayDinnerProof?.shortWording,
    personalFacebookSundayDinnerProof?.detailedPublicWording,
    personalFacebookSundayDinnerProof?.sourceBasis,
    personalFacebookSundayDinnerProof?.guardrail,
    personalFacebookWowListProof?.publicWording,
    personalFacebookWowListProof?.shortWording,
    personalFacebookWowListProof?.detailedPublicWording,
    personalFacebookWowListProof?.sourceBasis,
    personalFacebookWowListProof?.guardrail,
    personalWowListFacebookWowListMdx,
    personalWowListFacebookSundayDinnerMdx,
    personalWowListFacebookReport
  ].filter(Boolean).join("\n");
  const personalFacebookUnsafeAffirmativePatterns = [
    /Jamie (?:organized|attended|authored|produced|ran) (?:all )?511 events?/i,
    /Jamie[^.]{0,80}(?:organized|attended|authored|produced|ran) every event on (?:his|the) (?:personal )?(?:profile|Facebook)/i,
    /WOW List (?:never had|never created|did not have|had no) (?:any )?(?:Facebook )?events?/i,
    /(?:zero|no) current[^.]{0,100}(?:proves?|establishes?|shows?) (?:that )?WOW List never/i,
    /(?:Facebook|historical|response|RSVP|these) (?:labels|counts|responses|figures)[^.]{0,100}(?:equal|measure|establish|prove|show|represent|quantify|demonstrate)[^.]{0,100}(?:attendance|turnout|audience|reach|unique people|endorsement|conversion|mandate|impact)/i,
    /(?:21|twenty-one) (?:events?|pages?|records?)[^.]{0,100}(?:prove|establish|demonstrate)[^.]{0,80}(?:impact|attendance|outcomes?|sole authorship|sole production)/i,
    /(?:100th|200th)[^.]{0,160}(?:prove|verify|audit|establish)[^.]{0,80}(?:300\+|300-plus|three hundred)/i,
    /Jamie[^.]{0,120}(?:solely|single-handedly|alone)[^.]{0,100}(?:all 21|every selected|Sunday Dinner|WOW List)/i,
    /(?:all 21|every selected)[^.]{0,100}(?:solely|single-handedly|alone)[^.]{0,100}Jamie/i
  ];
  const personalFacebookAffirmativeSafe = personalFacebookUnsafeAffirmativePatterns.every(
    (pattern) => !pattern.test(personalFacebookPublicProjectionText)
  );
  const personalFacebookPublicArtifactText = JSON.stringify({
    manifest: personalWowListFacebookManifest,
    intakes: personalFacebookIntakes,
    observations: personalFacebookObservations,
    sources: personalFacebookSources,
    claims: personalFacebookClaims,
    inquiries: personalFacebookInquiries,
    proofs: [personalFacebookSundayDinnerProof, personalFacebookWowListProof],
    proofCoverage: [personalFacebookSundayDinnerCoverage, personalFacebookWowListCoverage],
    pageOccurrences: personalFacebookPageOccurrences
  }) + personalWowListFacebookReport;
  const personalFacebookPrivateDataFree =
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(personalFacebookPublicArtifactText) &&
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(personalFacebookPublicArtifactText) &&
    !/(?:^|[^\d])(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?=$|[^\d])/.test(personalFacebookPublicArtifactText) &&
    !/"(?:exactAddress|streetAddress|rawDescription|rawBody|descriptionHtml|attendeeIdentities|attendees|invitees|guestList|contactPhone|phone|meetingCredentials|meetingId|passcode|privateWorkingDocument|authenticatedSessionState|cookie|sessionToken|capturePath)"\s*:/i.test(personalFacebookPublicArtifactText);
  const personalFacebookManifestContentSha256 = createHash("sha256")
    .update(JSON.stringify(personalWowListFacebookManifest))
    .digest("hex");
  const personalFacebookCanonicalKnowledgeSha256 = createHash("sha256")
    .update(JSON.stringify({
      intakeItems: personalFacebookIntakes,
      observations: personalFacebookObservations,
      sources: personalFacebookSources,
      claims: personalFacebookClaims,
      researchInquiries: personalFacebookInquiries
    }))
    .digest("hex");
  const personalFacebookReviewConfigurationSha256 = createHash("sha256")
    .update(JSON.stringify(personalFacebookReviewConfiguration))
    .digest("hex");
  const personalFacebookGovernanceBindingsSha256 = createHash("sha256")
    .update(JSON.stringify(personalFacebookGovernanceBindings))
    .digest("hex");
  const personalFacebookProofContentSha256 = createHash("sha256")
    .update(JSON.stringify([personalFacebookSundayDinnerProof, personalFacebookWowListProof]))
    .digest("hex");
  const personalFacebookReviewLocksMatch =
    createHash("sha256").update(personalWowListFacebookManifestText).digest("hex") === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.manifestSha256 &&
    personalFacebookManifestContentSha256 === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.manifestContentSha256 &&
    createHash("sha256").update(readFileSync(
      path.join(repoRoot, "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-2026-07.ts"),
      "utf8"
    )).digest("hex") === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.governedModuleSha256 &&
    personalFacebookCanonicalKnowledgeSha256 === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.canonicalKnowledgeSha256 &&
    personalFacebookReviewConfigurationSha256 === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.reviewConfigurationSha256 &&
    personalFacebookGovernanceBindingsSha256 === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.governanceBindingsSha256 &&
    createHash("sha256").update(personalWowListFacebookReport).digest("hex") === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.publicReportSha256 &&
    createHash("sha256").update(personalWowListFacebookWowListMdx).digest("hex") === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.wowListMdxSha256 &&
    createHash("sha256").update(personalWowListFacebookSundayDinnerMdx).digest("hex") === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.sundayDinnerMdxSha256 &&
    personalFacebookProofContentSha256 === PERSONAL_WOWLIST_FACEBOOK_EVENT_REVIEW_LOCKS.proofContentSha256;
  const expectedPersonalFacebookDispositionEntries = Object.entries(
    personalWowListFacebookEvents.expectedDispositionCounts
  );
  const personalFacebookDiagnosticChecks = {
    populationSummary: Boolean(
      personalWowListFacebookManifest.surfaces?.personal?.displayedInstances === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalWowListFacebookManifest.surfaces.personal.uniqueParentEvents === personalWowListFacebookEvents.expectedUniqueParentEvents &&
      personalWowListFacebookManifest.surfaces.personal.recurringParentEvents === personalWowListFacebookEvents.expectedRecurringParentEvents &&
      personalWowListFacebookManifest.surfaces.personal.recurringInstances === personalWowListFacebookEvents.expectedRecurringInstances &&
      personalWowListFacebookManifest.surfaces.wowlist?.currentOwnerVisibleEventCards === personalWowListFacebookEvents.expectedWowListCurrentEvents
    ),
    ledgerReconciliation: Boolean(
      personalFacebookLedgerRows.length === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalFacebookLedgerOrdinals.size === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalFacebookRecurringInstances.length === personalWowListFacebookEvents.expectedRecurringInstances &&
      personalFacebookDetailCounts["recovered-detail"] === personalWowListFacebookEvents.expectedRecoveredDetails &&
      personalFacebookDetailCounts["no-detail-rendered"] === personalWowListFacebookEvents.expectedNoDetailRendered &&
      personalFacebookDetailCounts.unavailable === personalWowListFacebookEvents.expectedUnavailableDetails &&
      personalFacebookPrivacyCounts.public === personalWowListFacebookEvents.expectedPublicDisplays &&
      personalFacebookPrivacyCounts.private === personalWowListFacebookEvents.expectedPrivateDisplays &&
      personalFacebookPrivacyCounts["not-displayed"] === personalWowListFacebookEvents.expectedPrivacyNotDisplayed &&
      expectedPersonalFacebookDispositionEntries.every(([disposition, count]) =>
        personalFacebookDispositionCounts[disposition] === count
      )
    ),
    selectedPublicRecords: Boolean(
      personalFacebookSelectedEvents.length === personalWowListFacebookEvents.expectedSelectedJamieAttributedEvents &&
      personalFacebookSelectedOrdinals.size === personalWowListFacebookEvents.expectedSelectedJamieAttributedEvents &&
      personalFacebookSelectedEvents.every((event) =>
        personalFacebookLedgerRows[event.ordinal - 1]?.disposition === "selected-public-organizer-record" &&
          personalFacebookLedgerRows[event.ordinal - 1]?.privacyDisplay === "public" &&
          /Jamie Burkart/.test(event.eventPageCredit) &&
          event.responseInterpretation === "Historical Facebook interface label; not attendance, unique people, reach, endorsement, conversion, mandate, or impact."
      )
    ),
    sourceRoutes: Boolean(
      personalFacebookMissionRoutes.length === personalWowListFacebookEvents.expectedMissionRelevantSourceRoutes &&
      personalFacebookMissionRoutes.every((route) =>
        personalFacebookLedgerOrdinals.has(route.eventOrdinal) && /^https?:\/\//.test(route.url)
      )
    ),
    governedKnowledge: Boolean(
      personalFacebookIntakes.every(Boolean) &&
      personalFacebookObservations.every(Boolean) &&
      personalFacebookSources.every(Boolean) &&
      personalFacebookClaims.every(Boolean) &&
      personalFacebookInquiries.every(Boolean) &&
      personalFacebookEvidenceClosed
    ),
    projections: Boolean(
      personalFacebookSundayDinnerClaim?.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/196-sunday-dinner") && /not an independent audit/i.test(projection.text)
      ) &&
      personalFacebookWowListClaim?.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/wowlist") && /one concrete route/i.test(projection.text)
      ) &&
      personalWowListFacebookSundayDinnerMdx.includes(personalWowListFacebookEvents.sundayDinnerClaimId) &&
      personalWowListFacebookWowListMdx.includes(personalWowListFacebookEvents.wowListClaimId)
    ),
    governanceBindings: Boolean(
      personalFacebookSundayDinnerCoverage?.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner100) &&
      personalFacebookSundayDinnerCoverage.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner200) &&
      personalFacebookWowListCoverage?.sourceIds.includes(personalWowListFacebookEvents.manifestSourceId) &&
      personalFacebookPageOccurrences.length === 2
    ),
    reportBoundaries: Boolean(
      /One hundred percent means[\s\S]{0,240}does \*\*not\*\* mean[\s\S]{0,120}native Meta export/i.test(personalWowListFacebookReport) &&
      /Facebook response count is \*\*not verified\s+attendance\*\*/i.test(personalWowListFacebookReport) &&
      /zero current owner-visible\s+event\s+cards/i.test(personalWowListFacebookReport) &&
      /not evidence that WOW List never/i.test(personalWowListFacebookReport) &&
      /not an\s+independent audit of every Sunday Dinner/i.test(personalWowListFacebookReport)
    ),
    publicSafety: Boolean(
      personalFacebookAffirmativeSafe &&
      personalFacebookPrivateDataFree &&
      publicRegistryText.includes(personalWowListFacebookEvents.manifestSourceId) &&
      !publicRegistryText.includes("SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-RUN-2026") &&
      !publicRegistryText.includes("LOC-FACEBOOK-PERSONAL-WOWLIST-EVENT-RESEARCH-2026")
    ),
    reviewLocks: personalFacebookReviewLocksMatch
  };
  const personalFacebookEventsComplete = Boolean(
    existsSync(personalWowListFacebookManifestPath) &&
      existsSync(personalWowListFacebookReportPath) &&
      personalWowListFacebookManifest.schemaVersion === 1 &&
      personalWowListFacebookManifest.capturedAt === personalWowListFacebookEvents.reviewedAt &&
      personalWowListFacebookManifest.reviewedAt === personalWowListFacebookEvents.reviewedAt &&
      personalWowListFacebookManifest.surfaces?.personal?.displayedInstances === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalWowListFacebookManifest.surfaces.personal.uniqueParentEvents === personalWowListFacebookEvents.expectedUniqueParentEvents &&
      personalWowListFacebookManifest.surfaces.personal.recurringParentEvents === personalWowListFacebookEvents.expectedRecurringParentEvents &&
      personalWowListFacebookManifest.surfaces.personal.recurringInstances === personalWowListFacebookEvents.expectedRecurringInstances &&
      sameOrderedValues(personalWowListFacebookManifest.surfaces.personal.stableTerminalCounts, [511, 511, 511]) &&
      personalWowListFacebookManifest.surfaces.personal.detailRecovery?.["recovered-detail"] === personalWowListFacebookEvents.expectedRecoveredDetails &&
      personalWowListFacebookManifest.surfaces.personal.detailRecovery["no-detail-rendered"] === personalWowListFacebookEvents.expectedNoDetailRendered &&
      personalWowListFacebookManifest.surfaces.personal.detailRecovery.unavailable === personalWowListFacebookEvents.expectedUnavailableDetails &&
      personalWowListFacebookManifest.surfaces.personal.privacyDisplays?.public === personalWowListFacebookEvents.expectedPublicDisplays &&
      personalWowListFacebookManifest.surfaces.personal.privacyDisplays.private === personalWowListFacebookEvents.expectedPrivateDisplays &&
      personalWowListFacebookManifest.surfaces.personal.privacyDisplays["not-displayed"] === personalWowListFacebookEvents.expectedPrivacyNotDisplayed &&
      personalWowListFacebookManifest.surfaces.personal.selectedPublicJamieAttributedEvents === personalWowListFacebookEvents.expectedSelectedJamieAttributedEvents &&
      personalWowListFacebookManifest.surfaces.personal.nycacCensusOverlap === personalWowListFacebookEvents.expectedNycacOverlap &&
      personalWowListFacebookManifest.surfaces.personal.externalUrlOccurrences === personalWowListFacebookEvents.expectedExternalUrlOccurrences &&
      personalWowListFacebookManifest.surfaces.personal.uniqueExternalUrls === personalWowListFacebookEvents.expectedUniqueExternalUrls &&
      /does not by itself establish organization, authorship, attendance, endorsement, contribution, or impact/i.test(
        personalWowListFacebookManifest.surfaces.personal.relationshipBoundary
      ) &&
      personalWowListFacebookManifest.surfaces.wowlist?.currentOwnerVisibleEventCards === personalWowListFacebookEvents.expectedWowListCurrentEvents &&
      /does not establish that WOW List never/i.test(personalWowListFacebookManifest.surfaces.wowlist.boundary) &&
      personalFacebookLedgerRows.length === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalFacebookLedgerOrdinals.size === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalFacebookLedgerRows.every((row, index) =>
        row.ordinal === index + 1 &&
          /^20(?:0[6-9]|1\d|2[0-3])$/.test(row.year) &&
          ["recovered-detail", "no-detail-rendered", "unavailable"].includes(row.detailAvailability) &&
          ["public", "private", "not-displayed"].includes(row.privacyDisplay) &&
          typeof row.recurringInstance === "boolean" &&
          Object.keys(row).every((key) =>
            ["ordinal", "year", "detailAvailability", "privacyDisplay", "recurringInstance", "disposition"].includes(key)
          )
      ) &&
      personalFacebookRecurringInstances.length === personalWowListFacebookEvents.expectedRecurringInstances &&
      personalFacebookDetailCounts["recovered-detail"] === personalWowListFacebookEvents.expectedRecoveredDetails &&
      personalFacebookDetailCounts["no-detail-rendered"] === personalWowListFacebookEvents.expectedNoDetailRendered &&
      personalFacebookDetailCounts.unavailable === personalWowListFacebookEvents.expectedUnavailableDetails &&
      personalFacebookPrivacyCounts.public === personalWowListFacebookEvents.expectedPublicDisplays &&
      personalFacebookPrivacyCounts.private === personalWowListFacebookEvents.expectedPrivateDisplays &&
      personalFacebookPrivacyCounts["not-displayed"] === personalWowListFacebookEvents.expectedPrivacyNotDisplayed &&
      Object.entries(personalWowListFacebookEventReviewSummary.recoveredYears).every(
        ([year, count]) => personalFacebookYearCounts[year] === count
      ) &&
      Object.values(personalFacebookYearCounts).reduce((total, count) => total + count, 0) === personalWowListFacebookEvents.expectedPersonalInstances &&
      expectedPersonalFacebookDispositionEntries.every(([disposition, count]) =>
        personalWowListFacebookManifest.dispositionCounts?.[disposition] === count &&
          personalFacebookDispositionCounts[disposition] === count
      ) &&
      Object.values(personalWowListFacebookManifest.dispositionCounts ?? {}).reduce(
        (total, count) => total + count,
        0
      ) === personalWowListFacebookEvents.expectedPersonalInstances &&
      personalFacebookSelectedEvents.length === personalWowListFacebookEvents.expectedSelectedJamieAttributedEvents &&
      personalFacebookSelectedOrdinals.size === personalWowListFacebookEvents.expectedSelectedJamieAttributedEvents &&
      personalFacebookSelectedEvents.every((event) =>
        personalFacebookLedgerRows[event.ordinal - 1]?.disposition === "selected-public-organizer-record" &&
          personalFacebookLedgerRows[event.ordinal - 1]?.privacyDisplay === "public" &&
          /^\d{4}-\d{2}-\d{2}$/.test(event.date) &&
          event.url === `https://www.facebook.com/events/${new URL(event.url).pathname.split("/").filter(Boolean).at(-1)}/` &&
          /Jamie Burkart/.test(event.eventPageCredit) &&
          ["event-page-organizer-display", "event-page-co-organizer-display"].includes(event.attributionRelationship) &&
          event.topics?.length > 0 &&
          event.publicSummary &&
          event.responseInterpretation === "Historical Facebook interface label; not attendance, unique people, reach, endorsement, conversion, mandate, or impact."
      ) &&
      personalFacebookMissionRoutes.length === personalWowListFacebookEvents.expectedMissionRelevantSourceRoutes &&
      personalFacebookMissionRoutes.every((route) =>
        personalFacebookLedgerOrdinals.has(route.eventOrdinal) &&
          /^https?:\/\//.test(route.url) &&
          ["project-route-in-nycac-overlap", "selected-public-organizer-record", "profile-association-only-research-lead"].includes(route.relationship) &&
          (route.relationship !== "profile-association-only-research-lead" || /not evidence of Jamie's role/i.test(route.interpretation))
      ) &&
      personalWowListFacebookEventKnowledge.intakeItems.length === personalWowListFacebookEvents.expectedIntakeCount &&
      personalWowListFacebookEventKnowledge.observations.length === personalWowListFacebookEvents.expectedObservationCount &&
      personalWowListFacebookEventKnowledge.sources.length === personalWowListFacebookEvents.expectedSourceCount &&
      personalWowListFacebookEventKnowledge.claims.length === personalWowListFacebookEvents.expectedClaimCount &&
      personalWowListFacebookEventKnowledge.researchInquiries.length === personalWowListFacebookEvents.expectedInquiryCount &&
      personalFacebookIntakes.every((intake) =>
        intake?.disposition === "integrated" && intake.visibility === "public-safe" && intake.boundaries.length >= 5
      ) &&
      personalFacebookObservations.every((observation) =>
        observation?.locator && observation.publicSafe === true && observation.limitations.length >= 2 && observation.claimIds.length > 0
      ) &&
      personalFacebookSources.every((source) =>
        source?.supportsGenerally.length > 0 && source.doesNotEstablish.length >= 3
      ) &&
      personalFacebookSources.filter((source) => source?.visibility !== "public").every((source) =>
        source?.preservationStatus === "private" && source.protectedLocatorId && !source.canonicalUrl && !source.archiveUrl && !source.assetUrl
      ) &&
      personalFacebookEvidenceClosed &&
      personalFacebookClaims.every((claim) =>
        claim?.status === "confirmed-with-boundary" && claim.boundaries.length >= 4 && claim.antiClaims.length >= 4
      ) &&
      personalFacebookPopulationClaim?.antiClaims.some((claim) => /Jamie organized 511 events/i.test(claim)) &&
      personalFacebookPopulationClaim.boundaries.some((boundary) => /Profile association does not establish/i.test(boundary)) &&
      personalFacebookConveningClaim?.projections.every((projection) =>
        projection.status === "active" && projection.surfaces.every((surface) => surface.startsWith("docs/"))
      ) &&
      personalFacebookConveningClaim.boundaries.some((boundary) => /sole authorship or sole production/i.test(boundary)) &&
      personalFacebookSundayDinnerClaim?.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/196-sunday-dinner") && /not an independent audit/i.test(projection.text)
      ) &&
      personalFacebookSundayDinnerClaim.boundaries.some((boundary) => /Julia Fredenburg/i.test(boundary)) &&
      personalFacebookWowListClaim?.projections.some((projection) =>
        projection.status === "active" && projection.surfaces.includes("/work/wowlist") && /one concrete route/i.test(projection.text)
      ) &&
      personalFacebookEarlyPracticeClaim?.projections.every((projection) =>
        projection.status === "active" && projection.surfaces.every((surface) => surface.startsWith("docs/"))
      ) &&
      personalFacebookPersonalExportInquiry?.resultStatus === "partially-recovered" &&
      personalFacebookPersonalExportInquiry.limitations.length >= 4 &&
      personalFacebookWowListExportInquiry?.resultStatus === "inconclusive" &&
      personalFacebookWowListExportInquiry.limitations.some((limitation) => /cannot establish historical nonexistence/i.test(limitation)) &&
      personalFacebookCorroborationInquiry?.resultStatus === "partially-recovered" &&
      personalFacebookCorroborationInquiry.limitations.length >= 4 &&
      personalFacebookSundayDinnerCoverage?.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner100) &&
      personalFacebookSundayDinnerCoverage.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner200) &&
      personalFacebookSundayDinnerCoverage.researchInquiryIds.includes(personalWowListFacebookEvents.corroborationInquiryId) &&
      personalFacebookWowListCoverage?.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner200) &&
      personalFacebookWowListCoverage.sourceIds.includes(personalWowListFacebookEvents.manifestSourceId) &&
      personalFacebookWowListCoverage.researchInquiryIds.includes(personalWowListFacebookEvents.wowListExportInquiryId) &&
      personalWowListFacebookSundayDinnerMdx.includes(personalWowListFacebookEvents.sundayDinnerClaimId) &&
      personalWowListFacebookWowListMdx.includes(personalWowListFacebookEvents.wowListClaimId) &&
      personalFacebookSundayDinnerPage?.occurrences.some((occurrence) =>
        occurrence.claimId === personalWowListFacebookEvents.sundayDinnerClaimId &&
          occurrence.sourceIds?.includes(personalWowListFacebookEventSourceIds.sundayDinner100) &&
          occurrence.sourceIds.includes(personalWowListFacebookEventSourceIds.sundayDinner200)
      ) &&
      personalFacebookWowListPage?.occurrences.some((occurrence) =>
        occurrence.claimId === personalWowListFacebookEvents.wowListClaimId &&
          occurrence.sourceIds?.includes(personalWowListFacebookEventSourceIds.sundayDinner200) &&
          occurrence.sourceIds.includes(personalWowListFacebookEvents.manifestSourceId)
      ) &&
      /One hundred percent means[\s\S]{0,240}does \*\*not\*\* mean[\s\S]{0,120}native Meta export/i.test(personalWowListFacebookReport) &&
      /Facebook response count is \*\*not verified\s+attendance\*\*/i.test(personalWowListFacebookReport) &&
      /zero current owner-visible\s+event\s+cards/i.test(personalWowListFacebookReport) &&
      /not evidence that WOW List never/i.test(personalWowListFacebookReport) &&
      /not an\s+independent audit of every Sunday Dinner/i.test(personalWowListFacebookReport) &&
      personalWowListFacebookManifest.publicSafety?.newspaperSafeReview === true &&
      personalWowListFacebookManifest.publicSafety.rawDescriptionsPublished === false &&
      personalWowListFacebookManifest.publicSafety.exactResidentialAddressesPublished === false &&
      personalWowListFacebookManifest.publicSafety.contactDetailsPublished === false &&
      personalWowListFacebookManifest.publicSafety.attendeeOrGuestIdentitiesPublished === false &&
      personalWowListFacebookManifest.publicSafety.privateEventTitlesPublished === false &&
      personalWowListFacebookManifest.publicSafety.authenticatedSessionDataPublished === false &&
      publicRegistryText.includes(personalWowListFacebookEvents.manifestSourceId) &&
      !publicRegistryText.includes("SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-PROTECTED-RUN-2026") &&
      !publicRegistryText.includes("LOC-FACEBOOK-PERSONAL-WOWLIST-EVENT-RESEARCH-2026") &&
      personalFacebookAffirmativeSafe &&
      personalFacebookPrivateDataFree &&
      personalFacebookReviewLocksMatch
  );
  const wowListFacebookPosts = suite.pilot.wowListFacebookPosts;
  const wowListFacebookManifestPath = path.join(repoRoot, wowListFacebookPosts.manifestPath);
  const wowListFacebookReportPath = path.join(repoRoot, wowListFacebookPosts.reportPath);
  const wowListFacebookManifestText = readFileSync(wowListFacebookManifestPath, "utf8");
  const wowListFacebookManifest = overrides.wowListFacebookPostPopulation ??
    JSON.parse(wowListFacebookManifestText);
  const wowListFacebookReport = overrides.wowListFacebookPostReport ??
    readFileSync(wowListFacebookReportPath, "utf8");
  const wowListFacebookRows = wowListFacebookManifest.population ?? [];
  const wowListFacebookUrlRows = wowListFacebookManifest.postedUrlInventory ?? [];
  const wowListFacebookIntakes = wowListFacebookPostKnowledge.intakeItems.map(
    (item) => intakeById.get(item.id)
  );
  const wowListFacebookObservations = wowListFacebookPostKnowledge.observations.map(
    (item) => observationById.get(item.id)
  );
  const wowListFacebookSources = wowListFacebookPostKnowledge.sources.map(
    (item) => sourceById.get(item.id)
  );
  const wowListFacebookClaims = wowListFacebookPostKnowledge.claims.map(
    (item) => claimById.get(item.id)
  );
  const wowListFacebookInquiries = wowListFacebookPostKnowledge.researchInquiries.map(
    (item) => inquiryById.get(item.id)
  );
  const wowListFacebookOperatingClaim = claimById.get(wowListFacebookPosts.operatingRecordClaimId);
  const wowListFacebookWorkflowClaim = claimById.get(wowListFacebookPosts.organizerWorkflowClaimId);
  const wowListFacebookCareClaim = claimById.get(wowListFacebookPosts.careAndMobilizationClaimId);
  const wowListFacebookNativeExportInquiry = inquiryById.get(wowListFacebookPosts.nativeExportInquiryId);
  const wowListFacebookStewardshipInquiry = inquiryById.get(wowListFacebookPosts.socialStewardshipInquiryId);
  const wowListFacebookSourceInquiry = inquiryById.get(wowListFacebookPosts.sourcePreservationInquiryId);
  const wowListFacebookClaimIdSet = new Set(Object.values(wowListFacebookPostClaimIds));
  const wowListFacebookPageOccurrences = knowledgeBank.pages.flatMap((page) =>
    page.occurrences.filter((occurrence) => wowListFacebookClaimIdSet.has(occurrence.claimId))
  );
  const wowListFacebookOrdinals = new Set(wowListFacebookRows.map((row) => row.ordinal));
  const wowListFacebookFingerprints = new Set(
    wowListFacebookRows.map((row) => row.contentFingerprint)
  );
  const wowListFacebookUrlSet = new Set(wowListFacebookUrlRows.map((row) => row.url));
  const wowListFacebookYearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookRows, (row) => row.publishedAt?.slice(0, 4)))
      .map(([year, rows]) => [year, rows.length])
  );
  const wowListFacebookRelationshipCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookRows, (row) => row.relationship))
      .map(([relationship, rows]) => [relationship, rows.length])
  );
  const wowListFacebookMissionContextCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookUrlRows, (row) => row.missionContext))
      .map(([role, rows]) => [role, rows.length])
  );
  const wowListFacebookEvidenceRoleCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookUrlRows, (row) => row.evidenceRole))
      .map(([role, rows]) => [role, rows.length])
  );
  const wowListFacebookAccessDispositionCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookUrlRows, (row) => row.accessDisposition))
      .map(([disposition, rows]) => [disposition, rows.length])
  );
  const wowListFacebookPreservationDispositionCounts = Object.fromEntries(
    Object.entries(Object.groupBy(wowListFacebookUrlRows, (row) => row.preservationDisposition))
      .map(([disposition, rows]) => [disposition, rows.length])
  );
  const wowListFacebookShelbyTutorialRoute = wowListFacebookUrlRows.find(
    (row) => row.url === wowListFacebookPosts.shelbyTutorialUrl
  );
  const wowListFacebookGovernedRouteRows = wowListFacebookUrlRows.filter(
    (row) => row.preservationDisposition === "governed-source-record"
  );
  const wowListFacebookGovernedRouteSemanticsMatch =
    wowListFacebookGovernedRouteRows.length === WOWLIST_FACEBOOK_GOVERNED_ROUTE_SEMANTICS.length &&
    WOWLIST_FACEBOOK_GOVERNED_ROUTE_SEMANTICS.every((expected) => {
      const row = wowListFacebookUrlRows.find((item) => item.url === expected.url);
      return row &&
        Object.entries(expected).every(([key, value]) => row[key] === value) &&
        row.accessDisposition === "canonical-source-recovered" &&
        row.preservationDisposition === "governed-source-record";
    }) &&
    wowListFacebookGovernedRouteRows.every((row) =>
      WOWLIST_FACEBOOK_GOVERNED_ROUTE_SEMANTICS.some((expected) => expected.url === row.url)
    );
  const countWowListFacebookTag = (key, tag) => wowListFacebookRows.filter(
    (row) => row[key]?.includes(tag)
  ).length;
  const sumWowListFacebookInteraction = (key) => wowListFacebookRows.reduce(
    (total, row) => total + (row.displayedInteractions?.[key] ?? 0),
    0
  );
  const maxWowListFacebookInteraction = (key) => Math.max(
    0,
    ...wowListFacebookRows.map((row) => row.displayedInteractions?.[key] ?? 0)
  );
  const rowsWithWowListFacebookInteraction = (key) => wowListFacebookRows.filter(
    (row) => (row.displayedInteractions?.[key] ?? 0) > 0
  ).length;
  const wowListFacebookEvidenceClosed = wowListFacebookClaims.every((claim) =>
    claim?.evidence.length > 0 && claim.evidence.every((evidence) =>
      evidence.supports.length > 0 && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const wowListFacebookPublicText = JSON.stringify({
    manifest: wowListFacebookManifest,
    intakes: wowListFacebookIntakes,
    observations: wowListFacebookObservations,
    sources: wowListFacebookSources,
    claims: wowListFacebookClaims,
    inquiries: wowListFacebookInquiries
  }) + wowListFacebookReport;
  const wowListFacebookPublicTextWithoutHashes = wowListFacebookPublicText.replace(
    /\b[a-f0-9]{64}\b/gi,
    ""
  );
  const wowListFacebookProjectionText = wowListFacebookClaims.flatMap((claim) =>
    claim?.projections.map((projection) => projection.text) ?? []
  ).join("\n");
  const wowListFacebookProjectionSemanticsMatch =
    wowListFacebookClaims.length === WOWLIST_FACEBOOK_APPROVED_PROJECTION_SEMANTICS.length &&
    WOWLIST_FACEBOOK_APPROVED_PROJECTION_SEMANTICS.every((expected) => {
      const claim = wowListFacebookClaims.find((item) => item?.id === expected.claimId);
      const projection = claim?.projections[0];
      return claim?.projections.length === 1 &&
        projection?.key === expected.key &&
        projection.text === expected.text &&
        projection.status === "hold" &&
        projection.citationRequired === true &&
        Array.isArray(projection.surfaces) &&
        projection.surfaces.length === 0;
    }) &&
    wowListFacebookClaims.every((claim) =>
      WOWLIST_FACEBOOK_APPROVED_PROJECTION_SEMANTICS.some((expected) => expected.claimId === claim?.id)
    );
  const wowListFacebookPrivateDataFree =
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(wowListFacebookPublicText) &&
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(wowListFacebookPublicText) &&
    !/(?:^|[^\d])(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?=$|[^\d])/.test(wowListFacebookPublicTextWithoutHashes) &&
    !/"(?:rawBody|body|message|messages|commentText|commentsText|reactionIdentities|followerIdentities|authenticatedUrl|sessionToken|cookie|capturePath)"\s*:/i.test(wowListFacebookPublicText);
  const wowListFacebookAffirmativeSafe = [
    /Jamie (?:authored|wrote|published) (?:all|every) (?:WOW List )?Facebook post/i,
    /Jamie (?:alone|single-handedly|solely) (?:created|built|ran|managed) WOW List/i,
    /(?:57 posts|57-post population)[^.]{0,100}(?:complete|entire) lifetime/i,
    /(?:likes|comments|shares|reactions)[^.]{0,100}(?:prove|demonstrate|equal|represent)[^.]{0,100}(?:reach|attendance|conversion|endorsement|mandate|impact)/i,
    /(?:source cards|shared sources)[^.]{0,100}(?:prove|establish|are) (?:formal )?partners/i,
    /WOW List caused (?:the )?(?:funding|venue recovery|policy change|safety improvements)/i,
    /Business Suite[^.]{0,120}proves? (?:that )?(?:no|zero) historical posts/i
  ].every((pattern) => !pattern.test(wowListFacebookProjectionText));
  const wowListFacebookReviewConfiguration = {
    suite: wowListFacebookPosts,
    reviewSummary: wowListFacebookPostReviewSummary,
    claimIds: wowListFacebookPostClaimIds
  };
  const wowListFacebookManifestContentSha256 = createHash("sha256")
    .update(JSON.stringify(wowListFacebookManifest))
    .digest("hex");
  const wowListFacebookCanonicalKnowledgeSha256 = createHash("sha256")
    .update(JSON.stringify({
      intakeItems: wowListFacebookIntakes,
      observations: wowListFacebookObservations,
      sources: wowListFacebookSources,
      claims: wowListFacebookClaims,
      researchInquiries: wowListFacebookInquiries
    }))
    .digest("hex");
  const wowListFacebookReviewConfigurationSha256 = createHash("sha256")
    .update(JSON.stringify(wowListFacebookReviewConfiguration))
    .digest("hex");
  const wowListFacebookReviewLocksMatch =
    createHash("sha256").update(wowListFacebookManifestText).digest("hex") === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.manifestSha256 &&
    wowListFacebookManifestContentSha256 === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.manifestContentSha256 &&
    createHash("sha256").update(readFileSync(
      path.join(repoRoot, "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-2026-07.ts"),
      "utf8"
    )).digest("hex") === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.governedModuleSha256 &&
    wowListFacebookCanonicalKnowledgeSha256 === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.canonicalKnowledgeSha256 &&
    wowListFacebookReviewConfigurationSha256 === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.reviewConfigurationSha256 &&
    createHash("sha256").update(wowListFacebookReport).digest("hex") === WOWLIST_FACEBOOK_POST_REVIEW_LOCKS.publicReportSha256;
  const wowListFacebookDiagnosticChecks = {
    population: Boolean(
      wowListFacebookManifest.schemaVersion === 2 &&
      wowListFacebookManifest.reviewedAt === wowListFacebookPosts.reviewedAt &&
      wowListFacebookManifest.project === "wowlist" &&
      wowListFacebookManifest.platform === "facebook" &&
      wowListFacebookManifest.populationReconciliation?.exposedDistinctPosts === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookManifest.populationReconciliation.ledgerRows === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookManifest.populationReconciliation.recoveredPublicMetadata === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookManifest.populationReconciliation.notRecovered === 0 &&
      wowListFacebookRows.length === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookOrdinals.size === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookFingerprints.size === wowListFacebookPosts.expectedPostCount &&
      wowListFacebookRows.every((row, index) =>
        row.ordinal === index + 1 &&
        /^201[5-8]-\d{2}-\d{2}$/.test(row.publishedAt) &&
        /^[a-f0-9]{64}$/.test(row.contentFingerprint) &&
        /^[a-f0-9]{64}$/.test(row.bodySha256) &&
        row.bodyStored === false &&
        row.disposition === "recovered-public-metadata" &&
        ["shared-source-card", "wow-list-page-post"].includes(row.relationship) &&
        row.missionTags?.length > 0 &&
        row.stakeholderGroups?.length > 0 &&
        Object.keys(row.displayedInteractions ?? {}).sort().join(",") === "comments,likes,shares" &&
        Object.values(row.displayedInteractions ?? {}).every((value) => Number.isInteger(value) && value >= 0) &&
        Object.keys(row).every((key) => [
          "ordinal", "publishedAt", "relationship", "sharedSourceLabels", "postedUrls",
          "missionTags", "stakeholderGroups", "displayedInteractions", "contentFingerprint",
          "bodySha256", "bodyStored", "disposition"
        ].includes(key))
      )
    ),
    chronologyAndRelationships: Boolean(
      wowListFacebookManifest.populationReconciliation.dateRange?.earliest === "2015-04-25" &&
      wowListFacebookManifest.populationReconciliation.dateRange.latest === "2018-03-22" &&
      Object.entries(wowListFacebookManifest.populationReconciliation.yearCounts ?? {}).every(
        ([year, count]) => wowListFacebookYearCounts[year] === count
      ) &&
      wowListFacebookYearCounts[2015] === 22 &&
      wowListFacebookYearCounts[2016] === 27 &&
      wowListFacebookYearCounts[2017] === 7 &&
      wowListFacebookYearCounts[2018] === 1 &&
      wowListFacebookRelationshipCounts["shared-source-card"] === wowListFacebookPosts.expectedSharedSourceCards &&
      wowListFacebookRelationshipCounts["wow-list-page-post"] === wowListFacebookPosts.expectedPagePosts &&
      wowListFacebookRows.every((row) =>
        row.relationship === "shared-source-card"
          ? row.sharedSourceLabels.length > 0
          : row.sharedSourceLabels.length === 0
      )
    ),
    urls: Boolean(
      wowListFacebookUrlRows.length === wowListFacebookPosts.expectedDistinctPostedUrls &&
      wowListFacebookUrlSet.size === wowListFacebookPosts.expectedDistinctPostedUrls &&
      wowListFacebookManifest.urlInventorySummary?.wowListUrls === wowListFacebookPosts.expectedWowListUrls &&
      wowListFacebookManifest.urlInventorySummary.externalUrls === wowListFacebookPosts.expectedExternalUrls &&
      wowListFacebookMissionContextCounts["wowlist-route"] === 30 &&
      wowListFacebookMissionContextCounts["organizer-infrastructure"] === 6 &&
      wowListFacebookMissionContextCounts["venue-safety-and-survival"] === 13 &&
      wowListFacebookMissionContextCounts["mutual-aid-and-civic-mobilization"] === 3 &&
      wowListFacebookMissionContextCounts["cultural-and-civic-network"] === 3 &&
      Object.entries(wowListFacebookPosts.expectedEvidenceRoleCounts).every(
        ([role, count]) => wowListFacebookEvidenceRoleCounts[role] === count &&
          wowListFacebookManifest.urlInventorySummary?.evidenceRoleCounts?.[role] === count
      ) &&
      wowListFacebookAccessDispositionCounts["canonical-source-recovered"] === wowListFacebookPosts.expectedGovernedSourceRoutes &&
      wowListFacebookAccessDispositionCounts["not-rechecked-in-this-pass"] === wowListFacebookPosts.expectedInventoryOnlyRoutes &&
      wowListFacebookPreservationDispositionCounts["governed-source-record"] === wowListFacebookPosts.expectedGovernedSourceRoutes &&
      wowListFacebookPreservationDispositionCounts["route-inventory-only"] === wowListFacebookPosts.expectedInventoryOnlyRoutes &&
      wowListFacebookManifest.urlInventorySummary?.governedSourceRoutes === wowListFacebookPosts.expectedGovernedSourceRoutes &&
      wowListFacebookUrlRows.every((urlRow) => {
        const firstRow = wowListFacebookRows.find((row) => row.postedUrls.includes(urlRow.url));
        return /^https?:\/\//.test(urlRow.url) &&
          firstRow?.ordinal === urlRow.firstSeenOrdinal &&
          firstRow.publishedAt === urlRow.firstSeenAt &&
          Object.keys(urlRow).sort().join(",") === [
            "accessDisposition", "evidenceRole", "firstSeenAt", "firstSeenOrdinal",
            "missionContext", "preservationDisposition", "sourceId", "url"
          ].sort().join(",") &&
          (urlRow.preservationDisposition === "governed-source-record"
            ? urlRow.accessDisposition === "canonical-source-recovered" &&
              typeof urlRow.sourceId === "string" && Boolean(sourceById.get(urlRow.sourceId))
            : urlRow.preservationDisposition === "route-inventory-only" &&
              urlRow.accessDisposition === "not-rechecked-in-this-pass" &&
              urlRow.sourceId === null);
      })
    ),
    urlEvidenceRoles: Boolean(
      wowListFacebookGovernedRouteSemanticsMatch &&
      wowListFacebookShelbyTutorialRoute?.missionContext === "organizer-infrastructure" &&
      wowListFacebookShelbyTutorialRoute.evidenceRole === "independent-product-use" &&
      wowListFacebookShelbyTutorialRoute.accessDisposition === "canonical-source-recovered" &&
      wowListFacebookShelbyTutorialRoute.preservationDisposition === "governed-source-record" &&
      wowListFacebookShelbyTutorialRoute.sourceId === wowListFacebookPosts.shelbyTutorialSourceId &&
      wowListFacebookSourceInquiry?.findings.some((item) => /48 of all 55 routes remain inventory-only/i.test(item)) &&
      wowListFacebookSourceInquiry.limitations.some((item) => /Not rechecked is distinct from dead, live, or historically nonexistent/i.test(item))
    ),
    missionAndStakeholders: Boolean(
      countWowListFacebookTag("missionTags", "product-onboarding-and-use") === wowListFacebookPosts.expectedProductOnboardingRows &&
      countWowListFacebookTag("missionTags", "cross-city-organizer-infrastructure") === wowListFacebookPosts.expectedCrossCityOrganizerRows &&
      countWowListFacebookTag("missionTags", "participatory-product-governance") === wowListFacebookPosts.expectedParticipatoryGovernanceRows &&
      countWowListFacebookTag("missionTags", "venue-safety-and-survival") === wowListFacebookPosts.expectedVenueSafetyRows &&
      countWowListFacebookTag("missionTags", "mutual-aid-and-civic-mobilization") === wowListFacebookPosts.expectedMutualAidAndCivicRows &&
      countWowListFacebookTag("stakeholderGroups", "artist-or-community-source") === 12 &&
      countWowListFacebookTag("stakeholderGroups", "local-organizer-or-resource-network") === 8 &&
      countWowListFacebookTag("stakeholderGroups", "arts-and-civic-advocacy") === 5 &&
      countWowListFacebookTag("stakeholderGroups", "cultural-space") === 5 &&
      countWowListFacebookTag("stakeholderGroups", "published-media") === 4
    ),
    interactions: Boolean(
      rowsWithWowListFacebookInteraction("likes") === wowListFacebookPosts.expectedRowsWithLikes &&
      sumWowListFacebookInteraction("likes") === wowListFacebookPosts.expectedDisplayedLikes &&
      maxWowListFacebookInteraction("likes") === 13 &&
      rowsWithWowListFacebookInteraction("comments") === wowListFacebookPosts.expectedRowsWithComments &&
      sumWowListFacebookInteraction("comments") === wowListFacebookPosts.expectedDisplayedComments &&
      maxWowListFacebookInteraction("comments") === 3 &&
      rowsWithWowListFacebookInteraction("shares") === wowListFacebookPosts.expectedRowsWithShares &&
      sumWowListFacebookInteraction("shares") === wowListFacebookPosts.expectedDisplayedShares &&
      maxWowListFacebookInteraction("shares") === 29 &&
      wowListFacebookManifest.displayedInteractionSummary?.highestDisplayedInteractionOrdinal === 42 &&
      wowListFacebookRows[41]?.displayedInteractions.likes === 13 &&
      wowListFacebookRows[41]?.displayedInteractions.comments === 3 &&
      wowListFacebookRows[41]?.displayedInteractions.shares === 29 &&
      /not reach, attendance, conversion, endorsement, unique people, mandate, or impact/i.test(
        wowListFacebookManifest.displayedInteractionSummary.boundary
      )
    ),
    methodAndSafety: Boolean(
      wowListFacebookManifest.method?.terminalControl?.consecutiveStableTerminalChecks >= 7 &&
      /not a native Meta export/i.test(wowListFacebookManifest.method.limitations.join("\n")) &&
      /deleted, hidden, private, unpublished/i.test(wowListFacebookManifest.method.limitations.join("\n")) &&
      /Business Suite's displayed Lifetime filter covered only March 31, 2019 through July 14, 2026/i.test(
        wowListFacebookManifest.method.limitations.join("\n")
      ) &&
      /does not identify the human author/i.test(wowListFacebookManifest.method.limitations.join("\n")) &&
      /Richard Caceres/i.test(wowListFacebookPublicText) &&
      wowListFacebookPrivateDataFree &&
      wowListFacebookAffirmativeSafe
    ),
    governedKnowledge: Boolean(
      wowListFacebookPostKnowledge.intakeItems.length === wowListFacebookPosts.expectedIntakeCount &&
      wowListFacebookPostKnowledge.observations.length === wowListFacebookPosts.expectedObservationCount &&
      wowListFacebookPostKnowledge.sources.length === wowListFacebookPosts.expectedSourceCount &&
      wowListFacebookPostKnowledge.claims.length === wowListFacebookPosts.expectedClaimCount &&
      wowListFacebookPostKnowledge.researchInquiries.length === wowListFacebookPosts.expectedInquiryCount &&
      wowListFacebookIntakes.every((item) => item?.visibility === "public-safe" && item.disposition === "integrated" && item.boundaries.length >= 4) &&
      wowListFacebookObservations.every((item) => item?.publicSafe === true && item.locator && item.limitations.length >= 2 && (item.claimIds.length > 0 || item.researchInquiryIds.length > 0)) &&
      wowListFacebookSources.every((item) => item?.visibility === "public" && item.supportsGenerally.length > 0 && item.doesNotEstablish.length >= 4) &&
      wowListFacebookClaims.every((item) => item?.status === "confirmed-with-boundary" && item.boundaries.length >= 3 && item.antiClaims.length >= 4) &&
      wowListFacebookEvidenceClosed &&
      wowListFacebookOperatingClaim?.antiClaims.some((item) => /complete lifetime Facebook history/i.test(item)) &&
      wowListFacebookOperatingClaim.antiClaims.some((item) => /authored every/i.test(item)) &&
      wowListFacebookWorkflowClaim?.antiClaims.some((item) => /complete adoption census/i.test(item)) &&
      wowListFacebookCareClaim?.antiClaims.some((item) => /coverage of WOW List/i.test(item)) &&
      wowListFacebookNativeExportInquiry?.resultStatus === "inconclusive" &&
      wowListFacebookStewardshipInquiry?.resultStatus === "inconclusive" &&
      wowListFacebookSourceInquiry?.resultStatus === "partially-recovered"
    ),
    projection: Boolean(
      wowListFacebookClaims.every((claim) => claim?.projections.every((projection) =>
        projection.status === "hold" && projection.surfaces.length === 0
      )) &&
      wowListFacebookPageOccurrences.length === 0 &&
      /No website copy changes in this pass/i.test(wowListFacebookReport)
    ),
    projectionSemantics: wowListFacebookProjectionSemanticsMatch,
    report: Boolean(
      /100 percent of the capture-date authenticated live-feed population/i.test(wowListFacebookReport) &&
      /not a native Meta export or proof of complete lifetime history/i.test(wowListFacebookReport) &&
      /57 dated posts/i.test(wowListFacebookReport) &&
      /55 distinct cleaned URL routes/i.test(wowListFacebookReport) &&
      /Seven routes resolve to governed source records/i.test(wowListFacebookReport) &&
      /other 48 are explicitly[\s\S]{0,100}not-rechecked-in-this-pass/i.test(wowListFacebookReport) &&
      /Shelby Turner's tutorial is classified as[\s\S]{0,80}independent product-use evidence/i.test(wowListFacebookReport) &&
      /not rechecked is distinct from dead, live, or historically[\s\S]{0,30}nonexistent/i.test(wowListFacebookReport) &&
      /not reach, attendance,[\s\S]{0,80}conversion, endorsement, unique people, mandate, or impact/i.test(wowListFacebookReport) &&
      /leaving post-level authorship unassigned/i.test(wowListFacebookReport) &&
      /not coverage of WOW List/i.test(wowListFacebookReport)
    ),
    registry: Boolean(
      !publicRegistryText.includes("wowlist-facebook-raw-private") &&
      !publicRegistryText.includes("sessionToken")
    ),
    reviewLocks: wowListFacebookReviewLocksMatch
  };
  const wowListFacebookFailedChecks = Object.entries(wowListFacebookDiagnosticChecks)
    .filter(([, passed]) => !passed)
    .map(([check]) => check);
  const wowListFacebookPostsComplete = Object.values(wowListFacebookDiagnosticChecks).every(Boolean);
  const nycacFacebookPosts = suite.pilot.nycacFacebookPosts;
  const nycacFacebookPostManifestPath = path.join(repoRoot, nycacFacebookPosts.manifestPath);
  const nycacFacebookPostReportPath = path.join(repoRoot, nycacFacebookPosts.reportPath);
  const nycacFacebookPostManifestText = readFileSync(nycacFacebookPostManifestPath, "utf8");
  const nycacFacebookPostManifest = overrides.nycacFacebookPostPopulation ??
    JSON.parse(nycacFacebookPostManifestText);
  const nycacFacebookPostReport = overrides.nycacFacebookPostReport ??
    readFileSync(nycacFacebookPostReportPath, "utf8");
  const nycacFacebookPostRows = nycacFacebookPostManifest.population ?? [];
  const nycacFacebookPostUrlRows = nycacFacebookPostManifest.postedUrlInventory ?? [];
  const nycacFacebookPostIntakes = nycacFacebookPostKnowledge.intakeItems.map((item) => intakeById.get(item.id));
  const nycacFacebookPostObservations = nycacFacebookPostKnowledge.observations.map((item) => observationById.get(item.id));
  const nycacFacebookPostSources = nycacFacebookPostKnowledge.sources.map((item) => sourceById.get(item.id));
  const nycacFacebookPostClaims = overrides.nycacFacebookPostClaims ??
    nycacFacebookPostKnowledge.claims.map((item) => claimById.get(item.id));
  const nycacFacebookPostInquiries = nycacFacebookPostKnowledge.researchInquiries.map((item) => inquiryById.get(item.id));
  const nycacFacebookPostProof = overrides.nycacFacebookPostProof ??
    proofClaims.find((proof) => proof.id === nycacFacebookPosts.proofId);
  const nycacFacebookPostWorkText = overrides.nycacFacebookPostWorkText ??
    readFileSync(path.join(repoRoot, "apps/www/src/data/work.ts"), "utf8");
  const nycacFacebookPostOrdinals = new Set(nycacFacebookPostRows.map((row) => row.ordinal));
  const nycacFacebookPostReconciliationKeys = new Set(
    nycacFacebookPostRows.map((row) => row.reconciliationKeySha256)
  );
  const nycacFacebookPostFingerprints = new Set(nycacFacebookPostRows.map((row) => row.contentFingerprint));
  const nycacFacebookPostBodyHashes = new Set(nycacFacebookPostRows.map((row) => row.bodySha256));
  const nycacFacebookPostRouteKeys = new Set(nycacFacebookPostUrlRows.map((row) => row.routeKey));
  const nycacFacebookPostYearCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacFacebookPostRows, (row) => row.publishedAt?.slice(0, 4)))
      .map(([year, rows]) => [year, rows.length])
  );
  const countNycacFacebookPostTag = (key, tag) => nycacFacebookPostRows.filter(
    (row) => row[key]?.includes(tag)
  ).length;
  const countNycacFacebookPostAccountReference = (reference) => nycacFacebookPostRows.filter(
    (row) => row.accountReferences?.includes(reference)
  ).length;
  const countNycacFacebookPostRowsWith = (key) => nycacFacebookPostRows.filter(
    (row) => (row.displayedInteractions?.[key] ?? 0) > 0
  ).length;
  const sumNycacFacebookPostInteractions = (key) => nycacFacebookPostRows.reduce(
    (total, row) => total + (row.displayedInteractions?.[key] ?? 0),
    0
  );
  const maxNycacFacebookPostInteraction = (key) => Math.max(
    0,
    ...nycacFacebookPostRows.map((row) => row.displayedInteractions?.[key] ?? 0)
  );
  const nycacFacebookPostEvidenceRoleCounts = Object.fromEntries(
    Object.entries(Object.groupBy(nycacFacebookPostUrlRows, (row) => row.evidenceRole))
      .map(([role, rows]) => [role, rows.length])
  );
  const nycacFacebookPostGovernedRows = nycacFacebookPostUrlRows.filter(
    (row) => row.preservationDisposition === "governed-source-record"
  );
  const nycacFacebookPostGovernedRouteSemanticsMatch =
    nycacFacebookPostGovernedRows.length === NYCAC_FACEBOOK_POST_GOVERNED_ROUTE_SEMANTICS.length &&
    NYCAC_FACEBOOK_POST_GOVERNED_ROUTE_SEMANTICS.every((expected) => {
      const row = nycacFacebookPostUrlRows.find((item) => item.url === expected.url);
      return row &&
        Object.entries(expected).every(([key, value]) => row[key] === value) &&
        row.accessDisposition === "governed-source-recovered" &&
        row.preservationDisposition === "governed-source-record";
    }) &&
    nycacFacebookPostGovernedRows.every((row) =>
      NYCAC_FACEBOOK_POST_GOVERNED_ROUTE_SEMANTICS.some((expected) => expected.url === row.url)
    );
  const nycacFacebookPostEvidenceClosed = nycacFacebookPostClaims.every((claim) =>
    claim?.evidence.length > 0 && claim.evidence.every((evidence) =>
      evidence.supports.length > 0 && evidence.supports.every((support) =>
        sourceById.get(evidence.sourceId)?.supportsGenerally.includes(support)
      )
    )
  );
  const nycacFacebookPostProjectionSemanticsMatch =
    nycacFacebookPostClaims.flatMap((claim) => claim?.projections ?? []).length ===
      NYCAC_FACEBOOK_POST_APPROVED_PROJECTION_SEMANTICS.length &&
    NYCAC_FACEBOOK_POST_APPROVED_PROJECTION_SEMANTICS.every((expected) => {
      const projection = nycacFacebookPostClaims.find((claim) =>
        claim?.id === expected.claimId
      )?.projections.find((item) => item.key === expected.key);
      return projection?.text === expected.text &&
        projection.status === expected.status &&
        projection.citationRequired === true &&
        sameOrderedValues(projection.surfaces, expected.surfaces);
    });
  const nycacFacebookPostCanonicalKnowledge = {
    intakes: nycacFacebookPostIntakes,
    observations: nycacFacebookPostObservations,
    sources: nycacFacebookPostSources,
    claims: nycacFacebookPostClaims,
    inquiries: nycacFacebookPostInquiries
  };
  const nycacFacebookPostPublicText = JSON.stringify({
    manifest: nycacFacebookPostManifest,
    knowledge: nycacFacebookPostCanonicalKnowledge,
    proof: nycacFacebookPostProof
  }) + nycacFacebookPostReport + nycacFacebookPostWorkText;
  const nycacFacebookPostPublicTextWithoutHashes = nycacFacebookPostPublicText.replace(
    /\b[a-f0-9]{64}\b/gi,
    ""
  );
  const nycacFacebookPostPrivateDataFree =
    !/(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|GoogleDrive-|Mobile Documents)/.test(nycacFacebookPostPublicText) &&
    !/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(nycacFacebookPostPublicText) &&
    !/(?:^|[^\d])(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}(?=$|[^\d])/.test(nycacFacebookPostPublicTextWithoutHashes) &&
    !/"(?:rawBody|rawBodies|body|message|messages|commentText|commentsText|commentIdentities|reactionIdentities|reactionActors|followerIdentities|followerNames|authenticatedUrl|authenticatedUrls|sessionToken|token|tokens|cookie|cookies|capturePath|platformPostIds|__cft__|fbclid)"\s*:/i.test(nycacFacebookPostPublicText) &&
    !/https?:\/\/[^\s"']*zoom\.us\//i.test(nycacFacebookPostPublicText) &&
    !/https?:\/\/docs\.google\.com\//i.test(nycacFacebookPostPublicText);
  const nycacFacebookPostEditorialText = [
    ...nycacFacebookPostClaims.flatMap((claim) =>
      claim?.projections.map((projection) => projection.text) ?? []
    ),
    nycacFacebookPostProof?.publicWording,
    nycacFacebookPostProof?.shortWording,
    nycacFacebookPostProof?.detailedPublicWording,
    nycacFacebookPostProof?.whyItMatters,
    nycacFacebookPostProof?.sourceBasis,
    nycacFacebookPostProof?.guardrail,
    nycacFacebookPostReport,
    nycacFacebookPostWorkText
  ].filter(Boolean).join("\n");
  const nycacFacebookPostEditorialInflationPatterns = [
    /(?:complete|entire) lifetime (?:Facebook |Meta )?(?:history|archive)/i,
    /Jamie[^.]{0,100}(?:authored|wrote|published)[^.]{0,60}(?:all|every)[^.]{0,40}(?:post|feed)/i,
    /current (?:authenticated )?(?:access|custody|management)[^.]{0,100}(?:proves?|establishes?|confirms?|demonstrates?)[^.]{0,80}historical authorship/i,
    /(?:reference|tag|route|account-reference)[^.]{0,100}(?:proves?|establishes?|confirms?|demonstrates?)[^.]{0,80}(?:incoming engagement|official engagement|endorsement|partnership)/i,
    /(?:reactions|comments|shares|interaction counts?)[^.]{0,100}(?:prove|demonstrate|equal|represent|measure)[^.]{0,100}(?:reach|attendance|conversion|endorsement|mandate|impact)/i,
    /(?:Page|Facebook record|issue continuity)[^.]{0,100}(?:caused|secured|delivered|produced)[^.]{0,100}(?:repeal|Office of Nightlife|M\.A\.R\.C\.H\.|law|policy outcome)/i
  ];
  const nycacFacebookPostNoSharingInflationPattern =
    /zero (?:displayed )?shares[^.]{0,80}(?:means|proves|shows)[^.]{0,50}no (?:one )?shared/i;
  const nycacFacebookPostEditorialClaimIsNegated = (sentence) =>
    /\b(?:does|do|did|is|are|was|were|can|could|should|would|must|has|have|had) not\b|\bcannot\b|\bcan't\b|\bnot (?:a claim|evidence|proof)\b|\b(?:unresolved|research lead|rather than|remain(?:s)? open)\b/i.test(sentence) ||
    /^no (?:reference|tag|route|account-reference|reaction|comment|share|interaction count)\b/i.test(sentence);
  const nycacFacebookPostUnsafeEditorialSentences = nycacFacebookPostEditorialText
    .split(/[.!?]+/)
    .map((sentence) => sentence.replace(/[*_]/g, "").trim())
    .filter(Boolean)
    .filter((sentence) =>
      nycacFacebookPostNoSharingInflationPattern.test(sentence) ||
      (
        nycacFacebookPostEditorialInflationPatterns.some((pattern) => pattern.test(sentence)) &&
        !nycacFacebookPostEditorialClaimIsNegated(sentence)
      )
    );
  const nycacFacebookPostEditorialInflationFree =
    nycacFacebookPostUnsafeEditorialSentences.length === 0;
  const nycacFacebookPostManifestContentSha256 = createHash("sha256").update(JSON.stringify(
    nycacFacebookPostManifest
  )).digest("hex");
  const nycacFacebookPostCanonicalKnowledgeSha256 = createHash("sha256").update(JSON.stringify(
    nycacFacebookPostCanonicalKnowledge
  )).digest("hex");
  const nycacFacebookPostReviewConfigurationSha256 = createHash("sha256").update(JSON.stringify({
    pilot: nycacFacebookPosts,
    reviewSummary: nycacFacebookPostReviewSummary
  })).digest("hex");
  const nycacFacebookPostProofProjectionSha256 = createHash("sha256").update(JSON.stringify(
    nycacFacebookPostProof
  )).digest("hex");
  const nycacFacebookPostReviewLocksMatch =
    createHash("sha256").update(nycacFacebookPostManifestText).digest("hex") === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.manifestSha256 &&
    nycacFacebookPostManifestContentSha256 === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.manifestContentSha256 &&
    createHash("sha256").update(readFileSync(
      path.join(repoRoot, "apps/www/src/data/knowledge-bank/nycac-facebook-posts-2026-07.ts"),
      "utf8"
    )).digest("hex") === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.governedModuleSha256 &&
    nycacFacebookPostCanonicalKnowledgeSha256 === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.canonicalKnowledgeSha256 &&
    nycacFacebookPostReviewConfigurationSha256 === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.reviewConfigurationSha256 &&
    createHash("sha256").update(nycacFacebookPostReport).digest("hex") === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.publicReportSha256 &&
    nycacFacebookPostProofProjectionSha256 === NYCAC_FACEBOOK_POST_REVIEW_LOCKS.proofProjectionSha256;
  const nycacFacebookPostWithheldRouteSemanticsMatch =
    NYCAC_FACEBOOK_POST_WITHHELD_ROUTE_SEMANTICS.every((expected) => {
      const row = nycacFacebookPostUrlRows.find((item) => item.routeKey === expected.routeKey);
      return row && Object.entries(expected).every(([key, value]) => row[key] === value);
    }) &&
    nycacFacebookPostUrlRows.filter((row) =>
      row.url === null ||
      ["zoom.us", "docs.google.com"].includes(row.host) ||
      row.preservationDisposition === "withheld-sensitive-route"
    ).length === NYCAC_FACEBOOK_POST_WITHHELD_ROUTE_SEMANTICS.length;
  const nycacFacebookPostStructureSafe = Boolean(
    sameOrderedValues(Object.keys(nycacFacebookPostManifest), [
      "schemaVersion", "reviewedAt", "project", "platform", "account", "method",
      "populationReconciliation", "missionSummary", "stakeholderSummary",
      "postedUrlSummary", "displayedInteractionSummary", "publicationBoundary",
      "postedUrlInventory", "population"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.method ?? {}), [
      "surface", "captureDate", "terminalControl", "reconciliation", "limitations"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.method?.terminalControl ?? {}), [
      "documentHeightPx", "consecutiveStableTerminalChecks", "terminalLatestDate", "terminalEarliestDate"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.populationReconciliation ?? {}), [
      "encounteredRenderRows", "deduplicatedRenderVariants", "exposedDistinctPosts",
      "ledgerRows", "recoveredPublicationDates", "notRecovered", "dateRange", "yearCounts"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.missionSummary ?? {}), ["tagCounts"]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.stakeholderSummary ?? {}), [
      "tagCounts", "accountReferenceRows", "boundary"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.postedUrlSummary ?? {}), [
      "distinctExternalRoutes", "publishedExactRoutes", "withheldSensitiveRoutes",
      "governedSourceRoutes", "inventoryOnlyRoutes", "evidenceRoleCounts"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.displayedInteractionSummary ?? {}), [
      "rowsWithReactions", "displayedReactions", "maxReactionsOnOneRow",
      "rowsWithComments", "displayedComments", "maxCommentsOnOneRow",
      "rowsWithShares", "displayedShares", "maxSharesOnOneRow",
      "highestReactionOrdinal", "highestCommentOrdinal", "boundary"
    ]) &&
    sameOrderedValues(Object.keys(nycacFacebookPostManifest.publicationBoundary ?? {}), [
      "rawBodiesStored", "commentTextStored", "interactionIdentitiesStored",
      "followerIdentitiesStored", "authenticatedUrlsStored",
      "privateReconciliationIdentitiesStored", "oneWayReconciliationHashesStored",
      "sensitiveExactRoutesStored"
    ]) &&
    nycacFacebookPostUrlRows.every((row) =>
      sameOrderedValues(Object.keys(row), [
        "routeKey", "url", "host", "firstSeenOrdinal", "firstSeenAt", "missionContext",
        "evidenceRole", "accessDisposition", "preservationDisposition", "sourceId"
      ])
    ) &&
    nycacFacebookPostRows.every((row) =>
      sameOrderedValues(Object.keys(row), [
        "ordinal", "reconciliationKeySha256", "publishedAt", "accountSurface",
        "authorshipDisposition", "postedRouteKeys", "facebookNativeRouteCount",
        "missionTags", "stakeholderGroups", "accountReferences",
        "displayedInteractions", "contentFingerprint", "bodySha256", "bodyStored",
        "disposition"
      ]) &&
      sameOrderedValues(Object.keys(row.displayedInteractions ?? {}), [
        "reactions", "comments", "shares"
      ]) &&
      row.missionTags.every((tag) => tag in NYCAC_FACEBOOK_POST_MISSION_TAG_COUNTS) &&
      row.stakeholderGroups.every((tag) => tag in NYCAC_FACEBOOK_POST_STAKEHOLDER_TAG_COUNTS) &&
      row.accountReferences.every((reference) => reference in NYCAC_FACEBOOK_POST_ACCOUNT_REFERENCE_ROWS)
    )
  );
  const nycacFacebookPostDiagnosticChecks = {
    population: Boolean(
      nycacFacebookPostManifest.schemaVersion === 2 &&
      nycacFacebookPostManifest.reviewedAt === nycacFacebookPosts.reviewedAt &&
      nycacFacebookPostManifest.method?.terminalControl?.consecutiveStableTerminalChecks === 7 &&
      nycacFacebookPostManifest.populationReconciliation?.encounteredRenderRows === nycacFacebookPosts.expectedEncounteredRenderRows &&
      nycacFacebookPostManifest.populationReconciliation?.deduplicatedRenderVariants === nycacFacebookPosts.expectedDuplicateRenderVariants &&
      nycacFacebookPostRows.length === nycacFacebookPosts.expectedPostCount &&
      nycacFacebookPostOrdinals.size === nycacFacebookPosts.expectedPostCount &&
      nycacFacebookPostReconciliationKeys.size === nycacFacebookPosts.expectedUniqueReconciliationKeys &&
      nycacFacebookPosts.expectedUniqueReconciliationKeys === nycacFacebookPosts.expectedPostCount &&
      nycacFacebookPostManifest.method.limitations.some((item) =>
        /not a native Meta owner export or proof of complete lifetime history/i.test(item)
      ) &&
      nycacFacebookPostManifest.method.limitations.some((item) =>
        /shared Page identity does not identify the historical human author/i.test(item)
      ) &&
      nycacFacebookPostRows.every((row, index) =>
        row.ordinal === index + 1 &&
        /^[a-f0-9]{64}$/.test(row.reconciliationKeySha256) &&
        /^\d{4}-\d{2}-\d{2}$/.test(row.publishedAt) &&
        row.accountSurface === "nyc-artist-coalition-page" &&
        row.authorshipDisposition === "shared-account-human-author-unresolved" &&
        row.bodyStored === false &&
        row.disposition === "recovered-public-metadata" &&
        /^[a-f0-9]{64}$/.test(row.contentFingerprint) &&
        /^[a-f0-9]{64}$/.test(row.bodySha256) &&
        row.postedRouteKeys.every((routeKey) => nycacFacebookPostRouteKeys.has(routeKey))
      ) &&
      JSON.stringify(nycacFacebookPostYearCounts) === JSON.stringify(NYCAC_FACEBOOK_POST_YEAR_COUNTS) &&
      JSON.stringify(nycacFacebookPosts.expectedYearCounts) === JSON.stringify(NYCAC_FACEBOOK_POST_YEAR_COUNTS)
    ),
    urls: Boolean(
      nycacFacebookPostUrlRows.length === nycacFacebookPosts.expectedDistinctExternalRoutes &&
      nycacFacebookPostRouteKeys.size === nycacFacebookPosts.expectedDistinctExternalRoutes &&
      nycacFacebookPostManifest.postedUrlSummary?.publishedExactRoutes === nycacFacebookPosts.expectedPublishedExactRoutes &&
      nycacFacebookPostManifest.postedUrlSummary?.withheldSensitiveRoutes === nycacFacebookPosts.expectedWithheldSensitiveRoutes &&
      nycacFacebookPostManifest.postedUrlSummary?.governedSourceRoutes === nycacFacebookPosts.expectedGovernedSourceRoutes &&
      nycacFacebookPostManifest.postedUrlSummary?.inventoryOnlyRoutes === nycacFacebookPosts.expectedInventoryOnlyRoutes &&
      nycacFacebookPostUrlRows.filter((row) => row.url === null).length === nycacFacebookPosts.expectedWithheldSensitiveRoutes &&
      nycacFacebookPostWithheldRouteSemanticsMatch &&
      JSON.stringify(nycacFacebookPostEvidenceRoleCounts) === JSON.stringify(NYCAC_FACEBOOK_POST_EVIDENCE_ROLE_COUNTS) &&
      JSON.stringify(nycacFacebookPosts.expectedEvidenceRoleCounts) === JSON.stringify(NYCAC_FACEBOOK_POST_EVIDENCE_ROLE_COUNTS)
    ),
    governedRoutes: nycacFacebookPostGovernedRouteSemanticsMatch,
    missionTags: Boolean(
      JSON.stringify(nycacFacebookPosts.expectedMissionTagCounts) ===
        JSON.stringify(NYCAC_FACEBOOK_POST_MISSION_TAG_COUNTS) &&
      Object.entries(NYCAC_FACEBOOK_POST_MISSION_TAG_COUNTS).every(
        ([tag, count]) => countNycacFacebookPostTag("missionTags", tag) === count
      )
    ),
    stakeholderTags: Boolean(
      JSON.stringify(nycacFacebookPosts.expectedStakeholderTagCounts) ===
        JSON.stringify(NYCAC_FACEBOOK_POST_STAKEHOLDER_TAG_COUNTS) &&
      Object.entries(NYCAC_FACEBOOK_POST_STAKEHOLDER_TAG_COUNTS).every(
        ([tag, count]) => countNycacFacebookPostTag("stakeholderGroups", tag) === count
      ) &&
      JSON.stringify(nycacFacebookPostManifest.stakeholderSummary?.accountReferenceRows) ===
        JSON.stringify(NYCAC_FACEBOOK_POST_ACCOUNT_REFERENCE_ROWS) &&
      JSON.stringify(nycacFacebookPosts.expectedAccountReferenceRows) ===
        JSON.stringify(NYCAC_FACEBOOK_POST_ACCOUNT_REFERENCE_ROWS) &&
      Object.entries(NYCAC_FACEBOOK_POST_ACCOUNT_REFERENCE_ROWS).every(
        ([reference, count]) => countNycacFacebookPostAccountReference(reference) === count
      ) &&
      /do not establish that every named stakeholder engaged with, endorsed, or formally partnered/i.test(
        nycacFacebookPostManifest.stakeholderSummary?.boundary ?? ""
      )
    ),
    interactions: Boolean(
      countNycacFacebookPostRowsWith("reactions") === nycacFacebookPosts.expectedRowsWithReactions &&
      sumNycacFacebookPostInteractions("reactions") === nycacFacebookPosts.expectedDisplayedReactions &&
      maxNycacFacebookPostInteraction("reactions") === nycacFacebookPosts.expectedMaxReactions &&
      countNycacFacebookPostRowsWith("comments") === nycacFacebookPosts.expectedRowsWithComments &&
      sumNycacFacebookPostInteractions("comments") === nycacFacebookPosts.expectedDisplayedComments &&
      maxNycacFacebookPostInteraction("comments") === nycacFacebookPosts.expectedMaxComments &&
      countNycacFacebookPostRowsWith("shares") === nycacFacebookPosts.expectedRowsWithShares &&
      sumNycacFacebookPostInteractions("shares") === nycacFacebookPosts.expectedDisplayedShares &&
      /Share counts were not displayed/i.test(nycacFacebookPostManifest.displayedInteractionSummary?.boundary ?? "") &&
      /not a claim that no sharing occurred/i.test(nycacFacebookPostManifest.displayedInteractionSummary?.boundary ?? "")
    ),
    knowledge: Boolean(
      nycacFacebookPostIntakes.length === nycacFacebookPosts.expectedIntakeCount &&
      nycacFacebookPostObservations.length === nycacFacebookPosts.expectedObservationCount &&
      nycacFacebookPostSources.length === nycacFacebookPosts.expectedSourceCount &&
      nycacFacebookPostClaims.length === nycacFacebookPosts.expectedClaimCount &&
      nycacFacebookPostInquiries.length === nycacFacebookPosts.expectedInquiryCount &&
      nycacFacebookPostEvidenceClosed &&
      Object.values(nycacFacebookPostClaimIds).every((id) => nycacFacebookPostClaims.some((claim) => claim?.id === id)) &&
      nycacFacebookPostSources.some((source) => source?.id === nycacFacebookPosts.manifestSourceId)
    ),
    authorship: Boolean(
      nycacFacebookPostReviewSummary.authorshipBoundary === "shared-account-human-author-unresolved" &&
      nycacFacebookPostInquiries.some((inquiry) =>
        inquiry?.id === nycacFacebookPosts.authorshipInquiryId &&
        /research lead/i.test(inquiry.publicSummary) &&
        /current access cannot assign complete historical authorship/i.test(inquiry.limitations.join(" "))
      )
    ),
    projectionSemantics: nycacFacebookPostProjectionSemanticsMatch,
    editorialInflation: nycacFacebookPostEditorialInflationFree,
    proofProjection: Boolean(
      /445 distinct Facebook posts/i.test(nycacFacebookPostProof?.detailedPublicWording ?? "") &&
      /67 cleaned off-Facebook routes/i.test(nycacFacebookPostProof?.detailedPublicWording ?? "") &&
      /post-level authorship remain collective or unresolved/i.test(nycacFacebookPostProof?.guardrail ?? "") &&
      nycacFacebookPostProof?.doNotSay.includes("Jamie authored every NYC Artist Coalition Facebook post") &&
      /Capture-date census of 445 distinct Facebook posts spanning 2017–2021/i.test(nycacFacebookPostWorkText)
    ),
    report: Boolean(
      /445[\s\S]{0,400}Jan\. 29, 2017[\s\S]{0,80}Sept\. 15, 2021/i.test(nycacFacebookPostReport) &&
      /100%[\s\S]{0,200}does \*\*not\*\* mean a complete lifetime/i.test(nycacFacebookPostReport) &&
      /67 distinct cleaned off-Facebook routes/i.test(nycacFacebookPostReport) &&
      /445 hashes[\s\S]{0,80}unique/i.test(nycacFacebookPostReport) &&
      /do \*\*not\*\*[\s\S]{0,100}engaged with, endorsed, or formally partnered/i.test(nycacFacebookPostReport) &&
      /Reaction and comment identities were not captured/i.test(nycacFacebookPostReport) &&
      /Zero displayed shares[\s\S]{0,50}does not mean no sharing occurred/i.test(nycacFacebookPostReport) &&
      /does not\s+support saying\s+Jamie authored every post/i.test(nycacFacebookPostReport)
    ),
    privacy: Boolean(
      nycacFacebookPostPrivateDataFree &&
      nycacFacebookPostManifest.publicationBoundary?.rawBodiesStored === false &&
      nycacFacebookPostManifest.publicationBoundary?.interactionIdentitiesStored === false &&
      nycacFacebookPostManifest.publicationBoundary?.authenticatedUrlsStored === false &&
      nycacFacebookPostManifest.publicationBoundary?.sensitiveExactRoutesStored === false &&
      nycacFacebookPostManifest.publicationBoundary?.oneWayReconciliationHashesStored === true &&
      nycacFacebookPostStructureSafe
    ),
    registry: Boolean(
      !publicRegistryText.includes("__cft__") &&
      !publicRegistryText.includes("sessionToken")
    ),
    reviewLocks: nycacFacebookPostReviewLocksMatch
  };
  const nycacFacebookPostFailedChecks = Object.entries(nycacFacebookPostDiagnosticChecks)
    .filter(([, passed]) => !passed)
    .map(([check]) => check);
  const nycacFacebookPostsComplete = Object.values(nycacFacebookPostDiagnosticChecks).every(Boolean);
  const allEvaluatedObservations = [...pilotObservations, ...expansionObservations, ...secondExpansionObservations, ...institutionalObservations, ...pressObservations, ...kcTownHallObservations, kcTownHallContributionObservation, kcTownHallTransitionObservation, ...archiveObservations, ...googleDriveObservations, ...socialObservations, ...callNycFullObservations, ...wowListFullObservations, ...nycacFullObservations, ...kcTownHallSocialCorpus.observations, ...fieldPracticeObservations, ...nycacFacebookObservations, ...personalFacebookObservations, ...wowListFacebookObservations];
  const allEvaluatedClaims = [...pilotClaims, ...expansionClaims, ...secondExpansionClaims, institutionalClaim, pressClaim, kcTownHallClaim, kcTownHallContributionClaim, ...archiveClaims, ...googleDriveClaims, ...socialClaims, ...callNycFullClaims, ...wowListFullClaims, ...nycacFullClaims, ...kcthFullClaims, ...fieldPracticeClaims, ...nycacFacebookClaims, ...personalFacebookClaims, ...wowListFacebookClaims];
  const allEvaluatedInquiries = [...pilotInquiries, ...expansionInquiries, ...secondExpansionInquiries, institutionalInquiry, pressInquiry, kcTownHallInquiry, kcTownHallTransitionInquiry, ...archiveInquiries, ...googleDriveInquiries, ...socialInquiries, ...callNycFullInquiries, ...wowListFullInquiries, ...nycacFullInquiries, ...kcthFullInquiries, ...fieldPracticeInquiries, ...nycacFacebookInquiries, ...personalFacebookInquiries, ...wowListFacebookInquiries];
  const allExpansionClaims = [...expansionClaims, ...secondExpansionClaims];
  const triangulatedExpansionClaims = allExpansionClaims.filter(
    (claim) => claim && new Set(claim.evidence.map((evidence) => evidence.sourceId)).size >= 2
  );
  const heldExpansionClaims = allExpansionClaims.filter((claim) =>
    claim?.projections.some((projection) => projection.status === "hold")
  );
  const selectedExpansionClaims = [...expansion.selectedClaimIds, ...secondExpansion.selectedClaimIds].map((id) => claimById.get(id));
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
  const agency = suite.pilot.agencyGraph;
  const agencyRelations = agency.relationIds.map((id) => relationById.get(id));
  const agencyGraphSha256 = createHash("sha256").update(JSON.stringify(
    knowledgeBank.agencyRelations.map((relation) => ({
      id: relation.id,
      actorIds: relation.actorIds,
      action: relation.action,
      objectId: relation.objectId,
      purpose: relation.purpose,
      result: relation.result,
      creditScope: relation.creditScope,
      status: relation.status,
      claimIds: relation.claimIds,
      sourceIds: relation.sourceIds,
      sourceSupportKeys: relation.sourceSupportKeys,
      boundaries: relation.boundaries
    }))
  )).digest("hex");
  const agencyGraphApproved = agencyGraphSha256 === agency.approvedGraphSha256;
  const enactedRelations = knowledgeBank.agencyRelations.filter(
    (relation) => relation.action === "enacted"
  );
  const expectedEnactedIds = new Set(agency.enactedRelationIds);
  const openAgencyInquiries = agency.openInquiryIds.map((id) => inquiryById.get(id));
  const webImplementationClaim = claimById.get("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION");
  const webAuthorshipInquiry = inquiryById.get("INQ-NYCAC-PUBLIC-WEB-AUTHORSHIP");
  const legacyWebProof = proofClaims.find(
    (claim) => claim.id === "nyc-artist-coalition-public-web-infrastructure"
  );
  const webAuthorshipAligned = Boolean(
    webImplementationClaim?.evidence.some(
      (evidence) => evidence.sourceId === "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE"
    ) &&
      webImplementationClaim.evidence.some(
        (evidence) => evidence.sourceId === "SRC-FAIRRENTNYC-GITHUB-REPOSITORY"
      ) &&
      webImplementationClaim.projections.some(
        (projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc")
      ) &&
      !webImplementationClaim.projections.some((projection) =>
        /sole(?:ly)?[^.]{0,40}(?:policy|copy|data|design)/i.test(projection.text)
      ) &&
      ["policy", "copy", "data", "design"].every((term) =>
        webImplementationClaim.antiClaims.some((antiClaim) =>
          antiClaim.toLowerCase().includes(term)
        )
      ) &&
      webAuthorshipInquiry?.sourceIds.includes("SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE") &&
      webAuthorshipInquiry.resultStatus === "partially-recovered" &&
      webAuthorshipInquiry.limitations.some((limitation) => /copy|data|design/i.test(limitation)) &&
      fairRentMdx.includes("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION") &&
      !fairRentMdx.includes("Jamie co-founded NYC Artist Coalition and built public campaign websites") &&
      legacyWebProof?.sourceBasis.includes("retained Git histories")
  );
  const marchInquiry = inquiryById.get("INQ-NYCAC-MARCH-RAIDS");
  const marchPolicyClaim = claimById.get("CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC");
  const requiredMarchInquirySourceIds = [
    "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
    "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17",
    "SRC-NYC-MARCH-REPORT-Q1-Q2-2020",
    "SRC-NYC-MARCH-LOCAL-LAW-220-2019",
    "SRC-NYC-ONL-REPORT-2022",
    "SRC-NYC-ONL-REPORT-2023-24"
  ];
  const requiredMarchClaimSourceIds = requiredMarchInquirySourceIds.filter(
    (sourceId) => sourceId !== "SRC-NYC-ONL-REPORT-2022"
  );
  const marchProjectionText = marchPolicyClaim?.projections
    .filter((projection) => projection.status === "active")
    .map((projection) => projection.text)
    .join(" ") ?? "";
  const marchResearchAligned = Boolean(
    marchInquiry?.resultStatus === "recovered" &&
      requiredMarchInquirySourceIds.every((sourceId) => marchInquiry.sourceIds.includes(sourceId)) &&
      requiredMarchClaimSourceIds.every((sourceId) =>
        marchPolicyClaim?.evidence.some((evidence) => evidence.sourceId === sourceId)
      ) &&
      marchPolicyClaim?.projections.some(
        (projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc")
      ) &&
      marchPolicyClaim.antiClaims.some((antiClaim) => /disbanded M\.A\.R\.C\.H\./i.test(antiClaim)) &&
      !marchPolicyClaim.projections.some((projection) =>
        /Jamie[^.]{0,50}(?:caused|disbanded|ended|replaced) M\.A\.R\.C\.H\./i.test(projection.text)
      ) &&
      /NYPD-led inspection program/.test(marchProjectionText) &&
      /criminal-investigation and serious health-or-safety exceptions/.test(marchProjectionText) &&
      !/notice-based alternatives/.test(marchProjectionText) &&
      fairRentMdx.includes("CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC")
  );
  const agencyGraphComplete = Boolean(
    knowledgeBank.entities.length === agency.expectedEntityCount &&
      new Set(knowledgeBank.entities.map((entity) => entity.id)).size === agency.expectedEntityCount &&
      knowledgeBank.agencyRelations.length === agency.expectedRelationCount &&
      new Set(knowledgeBank.agencyRelations.map((relation) => relation.id)).size === agency.expectedRelationCount &&
      agencyRelations.every(Boolean) &&
      agencyGraphApproved &&
      agencyRelations.every((relation) =>
        relation.actorIds.every((actorId) => entityById.get(actorId)?.publicSafe) &&
        entityById.get(relation.objectId)?.publicSafe &&
        relation.claimIds.every((claimId) => claimById.has(claimId)) &&
        relation.sourceIds.every((sourceId) => sourceById.get(sourceId)?.visibility === "public") &&
        relation.sourceIds.every((sourceId) =>
          relation.claimIds.some((claimId) =>
            claimById.get(claimId)?.evidence.some((evidence) => evidence.sourceId === sourceId)
          )
        ) &&
        relation.sourceSupportKeys.length > 0 &&
        relation.sourceSupportKeys.every((supportKey) => relation.sourceIds.some(
          (sourceId) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
        )) &&
        relation.sourceIds.every((sourceId) => relation.sourceSupportKeys.some(
          (supportKey) => sourceById.get(sourceId)?.supportsGenerally.includes(supportKey)
        )) &&
        relation.purpose &&
        relation.result &&
        relation.boundaries.length &&
        relation.reviewedBy.length
      ) &&
      enactedRelations.length === agency.enactedRelationIds.length &&
      enactedRelations.every((relation) =>
        expectedEnactedIds.has(relation.id) &&
        relation.actorIds.length === 1 &&
        relation.actorIds[0] === "ENT-NYC-COUNCIL" &&
        relation.creditScope === "institutional" &&
        relation.sourceIds.every((sourceId) => sourceById.get(sourceId)?.kind === "government-record")
      ) &&
      !knowledgeBank.agencyRelations.some(
        (relation) => relation.actorIds.includes("ENT-JAMIE-BURKART") && relation.action === "enacted"
      ) &&
      nterAttributionSafe &&
      nterProtectedReviewLocksMatch &&
      ["individual", "shared", "collective", "institutional"].every((creditScope) =>
        knowledgeBank.agencyRelations.some((relation) => relation.creditScope === creditScope)
      ) &&
      kcTownHallComplete &&
      marchResearchAligned &&
      institutionalCapacityComplete &&
      openAgencyInquiries.every((inquiry) => inquiry?.resultStatus === "inconclusive") &&
      existsSync(path.join(repoRoot, "docs/knowledge-bank/agency-and-collective-credit.md"))
  );

  const criteria = [
    {
      criterionId: "KB-EVAL-INTAKE",
      score: score(
        pilotIntakes.every((item) => item && item.boundaries.length && (item.sourceIds.length || item.researchInquiryIds.length)) &&
        expansionIntakes.length === expansion.expectedSourceCount &&
        expansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        secondExpansionIntakes.length === secondExpansion.expectedSourceCount &&
        secondExpansionIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length && item.sourceIds.length === 1 && item.observationIds.length) &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete &&
        pressIntakes.every((item) => item?.disposition === "integrated" && item.boundaries.length >= 3 && item.sourceIds.length > 1 && item.observationIds.length)
      ),
      evidence: [`${pilotIntakes.filter(Boolean).length} original pilot intakes, ${expansionIntakes.filter(Boolean).length}/${expansion.expectedSourceCount} first-expansion intakes, ${secondExpansionIntakes.filter(Boolean).length}/${secondExpansion.expectedSourceCount} second-expansion intakes, one institutional-capacity analysis, one bounded KC Town Hall funding lifecycle, ${archiveIntakes.filter(Boolean).length}/${archive.expectedIntakeCount} working-archive intakes, ${googleDriveIntakes.filter(Boolean).length}/${googleDrive.expectedIntakeCount} Shared Drive intakes, and ${pressIntakes.filter(Boolean).length}/${pressArchive.expectedIndexCount} press-index intakes retain dispositions, observations, and boundaries`]
    },
    {
      criterionId: "KB-EVAL-ATOMICITY",
      score: score(
        allEvaluatedObservations.length >= 30 &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete &&
        allEvaluatedObservations.every((item) => item?.locator && item.limitations.length && (item.claimIds.length || item.researchInquiryIds.length))
      ),
      evidence: [`${allEvaluatedObservations.filter(Boolean).length} proposition-level observations have locators, limitations, and claim or inquiry links`]
    },
    {
      criterionId: "KB-EVAL-SCOPE",
      score: score(
        [...pilotSources, ...expansionSources, ...secondExpansionSources, ...pressIndexSources, ...pressArticleSources, ...kcTownHallSources, kcTownHallContributionSource].every((source) => source?.supportsGenerally.length && source.doesNotEstablish.length) &&
        expansionSources.length === expansion.expectedSourceCount &&
        secondExpansionSources.length === secondExpansion.expectedSourceCount &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete &&
        !errors.some((error) => /does not establish|support a proposition/i.test(error))
      ),
      evidence: [`${expansionSources.filter(Boolean).length + secondExpansionSources.filter(Boolean).length}/${expansion.expectedSourceCount + secondExpansion.expectedSourceCount} source-expansion records, ${pressArticleSources.filter(Boolean).length}/${pressArchive.expectedUniqueArticleCount} distinct press articles, four KC Town Hall government records, ${archiveSources.filter(Boolean).length}/${archive.expectedSourceCount} working-archive sources, and ${googleDriveSources.filter(Boolean).length}/${googleDrive.expectedSourceCount} Shared Drive sources have explicit support and doesNotEstablish boundaries`]
    },
    {
      criterionId: "KB-EVAL-MATURATION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.evidence.length && claim.boundaries.length && claim.antiClaims.length && claim.reviewedBy.length) &&
        allEvaluatedInquiries.every((inquiry) => inquiry?.limitations.length && inquiry.findings.length) &&
        expansionClaims.length === expansion.claimIds.length &&
        secondExpansionClaims.length === secondExpansion.claimIds.length &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete,
        triangulatedExpansionClaims.length >= 8
      ),
      evidence: [`${allExpansionClaims.filter(Boolean).length} source-expansion claims, one repository-backed implementation claim, and the KC Town Hall appropriation lifecycle matured; ${triangulatedExpansionClaims.length} source-expansion claims are supported by multiple source records; ${allEvaluatedInquiries.filter(Boolean).length} evaluated inquiries retain limitations`]
    },
    {
      criterionId: "KB-EVAL-PROJECTION",
      score: score(
        allEvaluatedClaims.every((claim) => claim?.projections.every((projection) => projection.status !== "hold" || projection.surfaces.length === 0)) &&
        selectedExpansionClaims.every((claim) => claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes("/work/fair-rent-nyc"))) &&
        webAuthorshipAligned &&
        marchResearchAligned &&
        institutionalCapacityComplete &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete &&
        Boolean(fairRentPage)
      ),
      evidence: [`Held claims have no public surface; ${selectedExpansionClaims.filter(Boolean).length} source-expansion claims and one repository-backed implementation claim have authorized FairRentNYC projections; the KC Town Hall page retains the complete bounded funding lifecycle; four mature creative-technology claims remain held while four archive-supported claims have selected projections`]
    },
    {
      criterionId: "KB-EVAL-COVERAGE",
      score: score(
        Boolean(fairRentPage) &&
        fairRentMdx.includes("CLM-NYCAC-CABARET-SAFETY-ORGANIZING") &&
        fairRentMdx.includes("CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION") &&
        expansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        secondExpansion.selectedClaimIds.every((id) => fairRentMdx.includes(id)) &&
        fairRentPage.occurrences.length >= 6 &&
        kcTownHallComplete &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete &&
        knowledgeBank.proofCoverageTargets.length === proofClaims.length
      ),
      evidence: [`Hiring-relevant NYCAC assertions, one complete KC Town Hall funding lifecycle, two CRS records, two protected participation-workflow claims, one bounded method claim, and one certificate-backed completion claim have governed projections; ${knowledgeBank.proofCoverageTargets.length}/${proofClaims.length} existing proof claims have evidence-coverage dispositions`]
    },
    {
      criterionId: "KB-EVAL-SAFETY",
      score: score(errors.length === 0 && institutionalCapacityComplete && kcTownHallComplete && archiveProductionComplete && googleDriveComplete && socialMediaComplete && nycacRetrievablePopulationComplete && urbanhermitFullPopulationComplete && fieldPracticeComplete && nycacFacebookEventsComplete && knowledgeBank.intakeItems.every((item) => !item.sourceUrl || /^https:\/\//.test(item.sourceUrl))),
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
        institutionalClaim?.projections.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
        pressClaim?.projections.every((projection) => projection.status === "hold") &&
        pressInquiry?.resultStatus === "partially-recovered" &&
        archiveProductionComplete &&
        googleDriveComplete &&
        socialMediaComplete &&
        nycacRetrievablePopulationComplete &&
        urbanhermitFullPopulationComplete &&
        fieldPracticeComplete &&
        nycacFacebookEventsComplete
      ),
      evidence: [photoChainComplete
        ? `${heldExpansionClaims.length} newly mature claims, four working-archive claims, and the complete press-archive claim remain held beside open inquiries, memory leads, and the protected photo feedback chain`
        : "The canonical photo-feedback chain is incomplete"]
    },
    {
      criterionId: "KB-EVAL-AGENCY",
      score: score(agencyGraphComplete),
      evidence: [agencyGraphComplete
        ? `${agencyRelations.length} source-linked relations distinguish individual, shared, collective, and institutional agency; the KC Board recommendation and Council acceptance and appropriation remain separate institutional actions`
        : "The agency graph has a missing relation, broken reference, unbounded credit claim, or advocacy-to-enactment distortion"]
    },
    {
      criterionId: "KB-EVAL-PRESS-ARCHIVE",
      score: score(pressArchiveComplete),
      evidence: [pressArchiveComplete
        ? `${pressEntries.length} appearances across ${campaignPressInventory.length} campaign indexes resolve to ${uniquePressArticleSourceIds.length} distinct source-specific readings, including ${pressReadingObservations.length} bounded summaries and ${pressAttributionObservations.length} direct-attribution observations; duplicate campaign selection is preserved`
        : "Campaign press inventory is missing an appearance, source, close reading, attribution, boundary, disposition, redirect defense, or exact count"]
    },
    {
      criterionId: "KB-EVAL-SOCIAL-ARCHIVE",
      score: score(socialMediaComplete),
      evidence: [socialMediaComplete
        ? `${projectSocialAccounts.length} project-account relationships, ${socialEngagementEvents.length} named public interaction edges, a CallNYC lower bound of ${callNycCouncilActors.size} serving Council members, and an NYC Artist Coalition lower bound of ${nycacCouncilActors.size} pass account, source, role, authorship, safety, and projection checks`
        : "Social archive is missing an account disposition, named public edge, role check, lower-bound method, collective-authorship boundary, source scope, or governed projection"]
    },
    {
      criterionId: "KB-EVAL-CALLNYC-FULL-POPULATION",
      score: score(callNycFullPopulationComplete),
      evidence: [callNycFullPopulationComplete
        ? `${callNycManifest.population.length} population dispositions preserve ${callNycRecoveredRows.length} recovered objects and ${callNycNotRecoveredRows.length} unresolved records; ${callNycManifest.postedUrlInventory.length} posted URLs, ${callNycManifest.contentSystemSummary.recognitionPostCount} recognition posts, ${callNycManifest.contentSystemSummary.recognitionDistinctIssuePageCount} issue pages, ${callNycCouncilNames.size} Council-member reposters, and ${callNycAuthoredIds.size} member-authored interactions pass completeness, role, attribution, and projection checks`
        : "CallNYC full-population production is missing a disposition, recovered-object boundary, URL, source role, repost attribution limit, Council identity, governed lifecycle record, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FULL-POPULATION",
      score: score(wowListFullPopulationComplete),
      evidence: [wowListFullPopulationComplete
        ? `${wowListManifest.population.length} recovered profile objects, ${wowListManifest.postedUrlInventory.length} resolved posted URLs, ${wowListManifest.publicReposterAudit.length} account-owned repost audits, ${wowListDistinctPublicReposters.size} named public reposter accounts, and ${wowListExternalAdoptionIds.size} bounded external-use examples pass completeness, source-role, authorship, traction, and projection checks`
        : "WOW List full-population production is missing a profile object, resolved URL, workflow classification, source role, account-owned engagement boundary, external-use example, governed lifecycle record, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-NYCAC-RETRIEVABLE-POPULATION",
      score: score(nycacRetrievablePopulationComplete),
      evidence: [nycacRetrievablePopulationComplete
        ? `Every one of the ${nycacRecords.length} records in the retrievable @NYCArtC union is classified across ${nycacShortUrls.size} distinct posted short URLs, ${nycacSourceAuthors.size} source authors, six replayable mission signals, and ${nycacIncomingRecords.length} bounded later incoming records; the ${nycacFull.expectedCounterRemainder}-record owner-archive gap, shared authorship, repost-source, timestamp, and mutable-engagement boundaries remain explicit`
        : `NYC Artist Coalition production failed: ${nycacFailedChecks.join(", ")}`]
    },
    {
      criterionId: "KB-EVAL-URBANHERM-FULL-POPULATION",
      score: score(urbanhermitFullPopulationComplete),
      evidence: [urbanhermitFullPopulationComplete
        ? `Every one of the ${urbanhermitRecords.length} live profile-counted @urbanhermit records is classified across ${urbanhermitShortUrls.size} distinct posted short URLs, six replayable mission signals, and ${urbanhermitIncomingRecords.length} bounded incoming records; account authorship, repost sources, personal context, mutable engagement, raw-text safety, owner-archive completeness, mature source scope, and selective non-projection remain explicit`
        : `Urbanhermit production failed: ${urbanhermitFailedChecks.join(", ")}`]
    },
    {
      criterionId: "KB-EVAL-KCTH-FULL-POPULATION",
      score: score(kcthFullPopulationComplete),
      evidence: [kcthFullPopulationComplete
        ? `All ${kcthFull.expectedProfileCount} surviving profile-count items are recovered through ${kcthRecords.length} unique records; the ledger preserves ${kcthUniqueShortUrls.size} posted short URLs, ${kcthFull.expectedTireWorkflowRecords} tire-workflow records, all ${kcthReposterRows.length} repost-bearing account statuses, ${kcthFull.expectedCouncilReposterAppearances} public appearances by ${kcthDistinctCouncilReposters.size} then-sitting Council-member accounts, and a ${kcthFull.expectedDirectCouncilResponses}-member direct-response floor while keeping outreach, amplification, endorsement, mutable reactions, collective authorship, and private service data bounded`
        : "KC Town Hall full-population production is missing a population object, fresh reconciliation, URL, source role, tire-workflow classification, complete repost audit, official-at-date check, direct-response derivation, metric-owner boundary, collective-authorship limit, private-data exclusion, held depth, or selective projection"]
    },
    {
      criterionId: "KB-EVAL-KCTH-FIELD-PRACTICE",
      score: score(fieldPracticeComplete),
      evidence: [fieldPracticeComplete
        ? `${fieldPracticeObservations.length} atomic observations preserve verified project facts and seven participant-memory propositions across ${fieldPracticeSources.length} bounded sources; all four individual-role claims remain held with protected-source, completion, authorship, service-unit, and collective-credit boundaries`
        : "KC Town Hall field-practice production is missing a proposition, protected-source boundary, evidence relationship, held projection, completion distinction, individual-role limit, privacy check, research inquiry, or proof-coverage link"]
    },
    {
      criterionId: "KB-EVAL-NYCAC-FACEBOOK-EVENTS",
      score: score(nycacFacebookEventsComplete),
      evidence: [nycacFacebookEventsComplete
        ? `All ${nycacFacebookEvents.expectedDisplayedControlSlots} displayed Facebook event slots have a disposition: ${nycacFacebookEventsRows.length} recovered event records and one unresolved slot; the census preserves ${nycacFacebookManifest.postedSourceArticles.length} posted source articles, ${nycacFacebookResponseEvents.length} bounded response displays, ${nycacFacebookWithheldLinkCount} protected-link exclusions, rotating cultural-space and government interfaces, Jamie's attributed role, collective credit, and the later ${nycacFacebookRecheck.recoveredDetailCount}/${nycacFacebookRecheck.temporarilyUnavailableDetailCount} detail-availability split`
        : "NYC Artist Coalition Facebook event production is missing a control-slot disposition, event record, source route, response-label boundary, stakeholder or venue interface, transient-availability record, collective-credit limit, protected-data exclusion, governed projection, proof-coverage link, or review lock"]
    },
    {
      criterionId: "KB-EVAL-PERSONAL-WOWLIST-FACEBOOK-EVENTS",
      score: score(personalFacebookEventsComplete),
      evidence: [personalFacebookEventsComplete
        ? `All ${personalFacebookLedgerRows.length} personal-profile Facebook event-card instances have anonymous public-safe dispositions across ${personalWowListFacebookManifest.surfaces.personal.uniqueParentEvents} unique parent events; ${personalFacebookSelectedEvents.length} public organizer-attributed records and ${personalFacebookMissionRoutes.length} mission-relevant routes preserve a bounded 2006-2019 chronology, while the zero-card current WOW List owner surface, response semantics, NYCAC overlap, private-data exclusions, collective credit, and Sunday Dinner milestone limits remain explicit`
        : "Personal and WOW List Facebook event production is missing a capture-date row disposition, count reconciliation, anonymous-ledger privacy boundary, selected public organizer attribution, source-route relationship, response-label limit, NYCAC overlap reference, WOW List historical-zero boundary, collective-credit rule, milestone limit, governed projection, proof-coverage link, or review lock"]
    },
    {
      criterionId: "KB-EVAL-WOWLIST-FACEBOOK-POSTS",
      score: score(wowListFacebookPostsComplete),
      evidence: [wowListFacebookPostsComplete
        ? `All ${wowListFacebookRows.length} posts exposed by the authenticated capture-date feed are reconciled across ${wowListFacebookUrlRows.length} cleaned URL routes, ${wowListFacebookPosts.expectedSharedSourceCards} shared-source cards, organizer workflow, venue-safety, mutual-aid, stakeholder, and displayed-interaction classifications; lifetime-export, post-authorship, collective-credit, source-role, privacy, and non-projection boundaries remain explicit`
        : `WOW List Facebook post production failed: ${wowListFacebookFailedChecks.join(", ")}`]
    },
    {
      criterionId: "KB-EVAL-NYCAC-FACEBOOK-POSTS",
      score: score(nycacFacebookPostsComplete),
      evidence: [nycacFacebookPostsComplete
        ? `All ${nycacFacebookPostRows.length} distinct posts exposed by the authenticated capture-date Page feed are reconciled across ${nycacFacebookPostUrlRows.length} cleaned off-Facebook routes, nine governed sources, overlapping mission and stakeholder classifications, and bounded displayed interactions; lifetime-export, shared-account authorship, incoming-engagement, collective-credit, privacy, and selective-projection limits remain explicit`
        : `NYC Artist Coalition Facebook post production failed: ${nycacFacebookPostFailedChecks.join(", ")}`]
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
    holdout: {
      requiredConsecutivePassingRuns: suite.targets.consecutivePassingRuns,
      consecutivePassingRuns,
      complete: holdoutEvidenceComplete,
      judgeIds: consecutivePassingRuns > 0
        ? holdoutLedger.runs.slice(-consecutivePassingRuns).map((run) => run.judgeId)
        : []
    },
    contentApprovals: {
      pipelineComponents: {
        institutionalCapacityComplete,
        kcTownHallComplete,
        archiveProductionComplete,
        googleDriveComplete,
        socialMediaComplete,
        nycacRetrievablePopulationComplete,
        urbanhermitFullPopulationComplete,
        fieldPracticeComplete,
        nycacFacebookEventsComplete,
        personalFacebookEventsComplete,
        nycacFacebookPostsComplete
      },
      kcTownHall: {
        actualSha256: kcTownHallContentSha256,
        approvedSha256: kcTownHall.approvedContentSha256,
        matches: kcTownHallContentSha256 === kcTownHall.approvedContentSha256
      },
      kcTownHallFieldPractice: {
        actualSha256: fieldPracticeContentSha256,
        approvedSha256: fieldPractice.approvedContentSha256,
        matches: fieldPracticeContentSha256 === fieldPractice.approvedContentSha256,
        reviewLocksMatch: fieldPracticeReviewLocksMatch,
        checks: fieldPracticeDiagnosticChecks
      },
      archiveProduction: {
        actualSha256: archiveContentSha256,
        approvedSha256: archive.approvedContentSha256,
        matches: archiveContentSha256 === archive.approvedContentSha256
      },
      nterProtectedArtifacts: {
        reviewLocksMatch: nterProtectedReviewLocksMatch,
        attributionSafe: nterAttributionSafe,
        websiteProjectionSafe: nterWebsiteProjectionSafe
      },
      googleDriveProduction: {
        actualSha256: googleDriveContentSha256,
        approvedSha256: googleDrive.approvedContentSha256,
        matches: googleDriveContentSha256 === googleDrive.approvedContentSha256
      },
      nycacSocialPopulation: {
        manifestSha256: nycacManifestSha256,
        recordsSha256: nycacRecordsSha256,
        incomingRecordsSha256: nycacIncomingRecordsSha256,
        governedModuleSha256: nycacGovernedModuleSha256,
        publicReportSha256: nycacPublicReportSha256,
        reviewLocksMatch: nycacReviewLocksMatch
      },
      urbanhermitSocialPopulation: {
        manifestSha256: urbanhermitManifestSha256,
        recordsSha256: urbanhermitRecordsSha256,
        incomingRecordsSha256: urbanhermitIncomingRecordsSha256,
        governedModuleSha256: urbanhermitGovernedModuleSha256,
        publicReportSha256: urbanhermitPublicReportSha256,
        reviewLocksMatch: urbanhermitReviewLocksMatch
      },
      nycacFacebookEvents: {
        manifestSha256: createHash("sha256").update(nycacFacebookManifestText).digest("hex"),
        manifestContentSha256: nycacFacebookManifestContentSha256,
        governedModuleSha256: createHash("sha256").update(readFileSync(
          path.join(repoRoot, "apps/www/src/data/knowledge-bank/nycac-facebook-events-2026-07.ts"),
          "utf8"
        )).digest("hex"),
        canonicalKnowledgeSha256: nycacFacebookCanonicalKnowledgeSha256,
        reviewConfigurationSha256: nycacFacebookReviewConfigurationSha256,
        articleSourcesSha256: nycacFacebookArticleSourcesSha256,
        governanceBindingsSha256: nycacFacebookGovernanceBindingsSha256,
        publicReportSha256: createHash("sha256").update(nycacFacebookReport).digest("hex"),
        caseStudyMdxSha256: createHash("sha256").update(nycacFacebookMdx).digest("hex"),
        proofSnippetSha256: createHash("sha256").update(nycacFacebookProofSnippet).digest("hex"),
        proofContentSha256: nycacFacebookProofContentSha256,
        reviewLocksMatch: nycacFacebookReviewLocksMatch,
        affirmativeSafe: nycacFacebookAffirmativeSafe,
        privateDataFree: nycacFacebookPrivateDataFree
      },
      personalWowListFacebookEvents: {
        manifestSha256: createHash("sha256").update(personalWowListFacebookManifestText).digest("hex"),
        manifestContentSha256: personalFacebookManifestContentSha256,
        governedModuleSha256: createHash("sha256").update(readFileSync(
          path.join(repoRoot, "apps/www/src/data/knowledge-bank/personal-wowlist-facebook-events-2026-07.ts"),
          "utf8"
        )).digest("hex"),
        canonicalKnowledgeSha256: personalFacebookCanonicalKnowledgeSha256,
        reviewConfigurationSha256: personalFacebookReviewConfigurationSha256,
        governanceBindingsSha256: personalFacebookGovernanceBindingsSha256,
        publicReportSha256: createHash("sha256").update(personalWowListFacebookReport).digest("hex"),
        wowListMdxSha256: createHash("sha256").update(personalWowListFacebookWowListMdx).digest("hex"),
        sundayDinnerMdxSha256: createHash("sha256").update(personalWowListFacebookSundayDinnerMdx).digest("hex"),
        proofContentSha256: personalFacebookProofContentSha256,
        reviewLocksMatch: personalFacebookReviewLocksMatch,
        checks: personalFacebookDiagnosticChecks
      },
      wowListFacebookPosts: {
        manifestSha256: createHash("sha256").update(wowListFacebookManifestText).digest("hex"),
        manifestContentSha256: wowListFacebookManifestContentSha256,
        governedModuleSha256: createHash("sha256").update(readFileSync(
          path.join(repoRoot, "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-2026-07.ts"),
          "utf8"
        )).digest("hex"),
        canonicalKnowledgeSha256: wowListFacebookCanonicalKnowledgeSha256,
        reviewConfigurationSha256: wowListFacebookReviewConfigurationSha256,
        publicReportSha256: createHash("sha256").update(wowListFacebookReport).digest("hex"),
        reviewLocksMatch: wowListFacebookReviewLocksMatch,
        checks: wowListFacebookDiagnosticChecks
      },
      nycacFacebookPosts: {
        manifestSha256: createHash("sha256").update(nycacFacebookPostManifestText).digest("hex"),
        manifestContentSha256: nycacFacebookPostManifestContentSha256,
        governedModuleSha256: createHash("sha256").update(readFileSync(
          path.join(repoRoot, "apps/www/src/data/knowledge-bank/nycac-facebook-posts-2026-07.ts"),
          "utf8"
        )).digest("hex"),
        canonicalKnowledgeSha256: nycacFacebookPostCanonicalKnowledgeSha256,
        reviewConfigurationSha256: nycacFacebookPostReviewConfigurationSha256,
        publicReportSha256: createHash("sha256").update(nycacFacebookPostReport).digest("hex"),
        proofProjectionSha256: nycacFacebookPostProofProjectionSha256,
        reviewLocksMatch: nycacFacebookPostReviewLocksMatch,
        checks: nycacFacebookPostDiagnosticChecks,
        unsafeEditorialSentences: nycacFacebookPostUnsafeEditorialSentences
      }
    },
    accepted: errors.length === 0 &&
      belowMinimum.length === 0 &&
      weightedScore >= suite.targets.weightedScoreAtLeast &&
      holdoutEvidenceComplete
  };
}
