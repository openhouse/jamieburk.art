import { agencyGraph } from "./agency-graph.ts";
import { archiveProductionJuly2026 } from "./archive-production-2026-07.ts";
import { callNycSocialPopulationJuly2026 } from "./callnyc-social-population-2026-07.ts";
import { googleDriveProductionJuly2026 } from "./google-drive-production-2026-07.ts";
import { historicalKnowledge } from "./historical-knowledge.ts";
import { hjeChronologyAugust2026 } from "./hje-chronology-2026-08.ts";
import { kcTownHallCouncilFunding } from "./kc-town-hall-council-funding.ts";
import { kcTownHallFieldPractice } from "./kctownhall-field-practice.ts";
import { kcTownHallSocialCorpus } from "./kctownhall-social-corpus.ts";
import { kcTownHallTiredOfTiresSourceReturn } from "./kctownhall-tired-of-tires-source-return.ts";
import { kcSpacesFundFacebookPostKnowledge } from "./kcspacesfund-facebook-posts-2026-07.ts";
import { jamiePersonalFacebookPostKnowledge } from "./jamie-personal-facebook-posts-2026-07.ts";
import { nycacPressArchive } from "./nycac-press-archive.ts";
import { nycacRecentAdvocacyAugust2026 } from "./nycac-recent-advocacy-2026-08.ts";
import { nycartcCulturalSpaceStoryAugust2026 } from "./nycartc-cultural-space-story-2026-08.ts";
import { nycacFacebookEventKnowledge } from "./nycac-facebook-events-2026-07.ts";
import { nycacFacebookPostKnowledge } from "./nycac-facebook-posts-2026-07.ts";
import { personalWowListFacebookEventKnowledge } from "./personal-wowlist-facebook-events-2026-07.ts";
import { participationContinuityKnowledge } from "./participation-continuity-2026-07.ts";
import { professionalRecordAugust2026 } from "./professional-record-2026-08.ts";
import { nycacImplementationEvidence } from "./nycac-implementation-evidence.ts";
import { nycacInstitutionalCapacity } from "./nycac-institutional-capacity.ts";
import { nycacSharedFolderProduction } from "./nycac-shared-folder-production-2026-07.ts";
import { nycacSocialPopulationJuly2026 } from "./nycac-social-population-2026-07.ts";
import { nycacSourceExpansion } from "./nycac-source-expansion.ts";
import { nycacSourceExpansionII } from "./nycac-source-expansion-ii.ts";
import { proofCoverageTargets } from "./proof-coverage.ts";
import { knowledgeBankSchema } from "./schema.ts";
import { socialMediaProductionJuly2026 } from "./social-media-production-2026-07.ts";
import { urbanhermitSocialPopulationJuly2026 } from "./urbanhermit-social-population-2026-07.ts";
import { wowListFacebookPostKnowledge } from "./wowlist-facebook-posts-2026-07.ts";
import { wowListSocialPopulationJuly2026 } from "./wowlist-social-population-2026-07.ts";
import { wowListSocialPracticesAugust2026 } from "./wowlist-social-practices-2026-08.ts";
import { projectCompositionAugust2026 } from "./project-composition-2026-08.ts";
import { wowListProductFitAugust2026 } from "./wowlist-product-fit-2026-08.ts";

const knowledgeBankInput = {
  intakeItems: [
    {
      id: "INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      kind: "photo-lead",
      title: "Digital District participant photograph lead",
      submittedAt: "2026-07-12",
      submittedBy: "Jamie Burkart and photo-editor review",
      projectIds: ["callnyc"],
      reason: "Preserve a visual lead whose placard text may clarify the hackathon's breakout structure without treating the photograph as self-interpreting or cleared for publication.",
      visibility: "protected",
      disposition: "protected",
      sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      observationIds: ["OBS-CALLNYC-DIGITAL-DISTRICT-PLACARD"],
      researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      boundaries: [
        "Retain only public-safe visual metadata in the repository; the image, identities, and private locator stay outside the public web bundle.",
        "Publication requires separate photographer, rights, represented-people, crop, and editorial review."
      ]
    },
    ...archiveProductionJuly2026.intakeItems,
    ...callNycSocialPopulationJuly2026.intakeItems,
    ...googleDriveProductionJuly2026.intakeItems,
    ...historicalKnowledge.intakeItems,
    ...hjeChronologyAugust2026.intakeItems,
    ...socialMediaProductionJuly2026.intakeItems,
    ...urbanhermitSocialPopulationJuly2026.intakeItems,
    ...wowListFacebookPostKnowledge.intakeItems,
    ...wowListSocialPopulationJuly2026.intakeItems,
    ...wowListSocialPracticesAugust2026.intakeItems,
    ...projectCompositionAugust2026.intakeItems,
    ...kcTownHallCouncilFunding.intakeItems,
    ...kcTownHallFieldPractice.intakeItems,
    ...kcTownHallTiredOfTiresSourceReturn.intakeItems,
    ...kcTownHallSocialCorpus.intakeItems,
    ...kcSpacesFundFacebookPostKnowledge.intakeItems,
    ...jamiePersonalFacebookPostKnowledge.intakeItems,
    ...nycacImplementationEvidence.intakeItems,
    ...nycacInstitutionalCapacity.intakeItems,
    ...nycacSharedFolderProduction.intakeItems,
    ...nycacFacebookEventKnowledge.intakeItems,
    ...nycacFacebookPostKnowledge.intakeItems,
    ...personalWowListFacebookEventKnowledge.intakeItems,
    ...participationContinuityKnowledge.intakeItems,
    ...wowListProductFitAugust2026.intakeItems,
    ...professionalRecordAugust2026.intakeItems,
    ...nycacSocialPopulationJuly2026.intakeItems,
    ...nycacSourceExpansion.intakeItems,
    ...nycacSourceExpansionII.intakeItems,
    ...nycacPressArchive.intakeItems,
    ...nycacRecentAdvocacyAugust2026.intakeItems,
    ...nycartcCulturalSpaceStoryAugust2026.intakeItems
  ],
  observations: [
    {
      id: "OBS-CALLNYC-DIGITAL-DISTRICT-PLACARD",
      intakeId: "INTAKE-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      project: "callnyc",
      kind: "visual-observation",
      text: "A visible placard reads 'Digital District - Help improve City Council District office operations' in a collaborative breakout-table setting.",
      locator: "Protected participant photograph; placard area only.",
      status: "verified",
      publicSafe: true,
      claimIds: ["CLM-CALLNYC-DIGITAL-DISTRICT"],
      researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      limitations: [
        "The image does not establish the full event title, facilitator, agenda, participant identities, or consent to publish.",
        "The approximate timestamp is not used to establish event hours."
      ]
    },
    ...archiveProductionJuly2026.observations,
    ...callNycSocialPopulationJuly2026.observations,
    ...googleDriveProductionJuly2026.observations,
    ...historicalKnowledge.observations,
    ...hjeChronologyAugust2026.observations,
    ...socialMediaProductionJuly2026.observations,
    ...urbanhermitSocialPopulationJuly2026.observations,
    ...wowListFacebookPostKnowledge.observations,
    ...wowListSocialPopulationJuly2026.observations,
    ...wowListSocialPracticesAugust2026.observations,
    ...projectCompositionAugust2026.observations,
    ...kcTownHallCouncilFunding.observations,
    ...kcTownHallFieldPractice.observations,
    ...kcTownHallTiredOfTiresSourceReturn.observations,
    ...kcTownHallSocialCorpus.observations,
    ...kcSpacesFundFacebookPostKnowledge.observations,
    ...jamiePersonalFacebookPostKnowledge.observations,
    ...nycacImplementationEvidence.observations,
    ...nycacInstitutionalCapacity.observations,
    ...nycacSharedFolderProduction.observations,
    ...nycacFacebookEventKnowledge.observations,
    ...nycacFacebookPostKnowledge.observations,
    ...personalWowListFacebookEventKnowledge.observations,
    ...participationContinuityKnowledge.observations,
    ...wowListProductFitAugust2026.observations,
    ...professionalRecordAugust2026.observations,
    ...nycacSocialPopulationJuly2026.observations,
    ...nycacSourceExpansion.observations,
    ...nycacSourceExpansionII.observations,
    ...nycacPressArchive.observations,
    ...nycacRecentAdvocacyAugust2026.observations,
    ...nycartcCulturalSpaceStoryAugust2026.observations
  ],
  sources: [
    {
      id: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      title: "Civic Hall announcement of New York City Council hackathon",
      organization: "Civic Hall",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-29",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/CivicHall/status/693124020917522433",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "Civic Hall announcement of a January 30, 2016, 1-3 p.m. New York City Council hackathon focused on constituent services.",
      publicNote: "The archived Civic Hall page preserves the embedded social post. It is not a recovered Civic Hall calendar listing or event-detail page.",
      supportsGenerally: ["January 30, 2016", "1-3 p.m.", "New York City Council hackathon", "constituent-services purpose"],
      doesNotEstablish: ["a recovered Civic Hall calendar listing", "a dedicated event-detail page", "the complete formal event title", "the agenda", "the participant roster"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      title: "New York City Council event-day CouncilStat hackathon post",
      organization: "New York City Council",
      kind: "government-social-post",
      visibility: "public",
      preservationStatus: "live-and-archived",
      publishedAt: "2016-01-30",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://x.com/NYCCouncil/status/693509031768506368",
      archiveUrl: "https://web.archive.org/web/20160131004601/http://civichall.org/events/page/2/",
      preferredPublicUrl: "archive",
      publicCitation: "New York City Council event-day post from Civic Hall identifying the gathering as the Council's first CouncilStat hackathon.",
      publicNote: "The source supports the narrower 'first CouncilStat hackathon' wording, not a broader historical superlative.",
      supportsGenerally: ["January 30, 2016", "Civic Hall", "first CouncilStat hackathon"],
      doesNotEstablish: ["broader historical hackathon superlatives", "the full agenda", "a complete attendee list", "formal winners", "CallNYC as an official submission"]
    },
    {
      id: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      title: "New York City Council Hackathon promotional graphic",
      organization: "New York City Council / Civic Hall",
      kind: "promotional-graphic",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      assetUrl: "https://pbs.twimg.com/media/CZ5m-mAWwAA42td.png:large",
      preferredPublicUrl: "asset",
      publicCitation: "NYC Council-branded promotional graphic reading 'New York City Council Hackathon' and displaying labs.council.nyc.",
      publicNote: "The graphic supports the visible event branding, not a longer formal registration title.",
      supportsGenerally: ["New York City Council Hackathon branding", "labs.council.nyc"],
      doesNotEstablish: ["a longer formal registration title", "the agenda", "breakout structure", "participant roster"],
      media: {
        mediaKind: "graphic",
        rightsStatus: "unknown",
        consentStatus: "not-applicable",
        publicDisplayStatus: "metadata-only",
        visibleText: ["New York City Council Hackathon", "labs.council.nyc"]
      }
    },
    {
      id: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      title: "Participant photograph of Digital District breakout placard",
      kind: "participant-photograph",
      visibility: "public-metadata-only",
      preservationStatus: "private",
      publicCitation: "Participant photograph showing a placard reading 'Digital District - Help improve City Council District office operations.'",
      publicNote: "The photograph remains outside the public repository pending rights, consent, and editorial review.",
      protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001",
      supportsGenerally: ["Digital District placard wording", "breakout-table context", "collaborative working setting"],
      doesNotEstablish: ["the official event title", "the facilitator", "the complete agenda", "the event start time", "the identity or consent status of all people depicted"],
      media: {
        mediaKind: "photograph",
        rightsStatus: "permission-needed",
        consentStatus: "review-needed",
        publicDisplayStatus: "hold",
        visibleText: ["Digital District", "Help improve City Council District office operations"],
        captureTimestamp: "approximately 2:10 p.m.",
        timestampConfidence: "limited"
      }
    },
    {
      id: "SRC-CALLNYC-POLITICO-2016-03-14",
      title: "Website provides new information about council members' focus",
      organization: "Politico New York",
      author: "Miranda Neubauer",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2016-03-14",
      accessedAt: "2026-07-11",
      archiveUrl: "https://callnyc.org/data/media/Politico-Website-provides-new-information-about-council-members-focus.pdf",
      preferredPublicUrl: "archive",
      publicCitation: "Miranda Neubauer, 'Website provides new information about council members' focus,' Politico New York, March 14, 2016.",
      publicNote: "The reporting connects Jamie to the January event, the fuller data release, and his independent development and iteration of CallNYC.",
      supportsGenerally: ["CallNYC existed", "Jamie's relationship to the project", "CouncilStat and event relationship", "press date and coverage"],
      doesNotEstablish: ["CallNYC as an official Council product", "CallNYC as a formal hackathon submission", "CallNYC as a documented winner"]
    },
    {
      id: "SRC-CALLNYC-GITHUB-REPOSITORY",
      title: "CallNYC source repository",
      organization: "openhouse",
      kind: "project-archive",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-11",
      canonicalUrl: "https://github.com/openhouse/CallNYC",
      preferredPublicUrl: "canonical",
      publicCitation: "Public CallNYC source repository.",
      publicNote: "The repository documents the surviving implementation of the independent, archived prototype.",
      supportsGenerally: ["project implementation", "surviving source code"],
      doesNotEstablish: ["official Council ownership", "formal hackathon submission status", "current resident-service guidance"]
    },
    {
      id: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026",
      title: "Civic Hall calendar and event-detail recovery research run",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      publicCitation: "Documented 2026 Wayback/CDX review of Civic Hall event captures.",
      publicNote: "The bounded search recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001",
      supportsGenerally: ["bounded negative search finding", "research method and limitations"],
      doesNotEstablish: ["that no event page ever existed"]
    },
    ...archiveProductionJuly2026.sources,
    ...callNycSocialPopulationJuly2026.sources,
    ...googleDriveProductionJuly2026.sources,
    ...historicalKnowledge.sources,
    ...hjeChronologyAugust2026.sources,
    ...socialMediaProductionJuly2026.sources,
    ...urbanhermitSocialPopulationJuly2026.sources,
    ...wowListFacebookPostKnowledge.sources,
    ...wowListSocialPopulationJuly2026.sources,
    ...wowListSocialPracticesAugust2026.sources,
    ...projectCompositionAugust2026.sources,
    ...kcTownHallCouncilFunding.sources,
    ...kcTownHallFieldPractice.sources,
    ...kcTownHallTiredOfTiresSourceReturn.sources,
    ...kcTownHallSocialCorpus.sources,
    ...kcSpacesFundFacebookPostKnowledge.sources,
    ...jamiePersonalFacebookPostKnowledge.sources,
    ...nycacImplementationEvidence.sources,
    ...nycacInstitutionalCapacity.sources,
    ...nycacSharedFolderProduction.sources,
    ...nycacFacebookEventKnowledge.sources,
    ...nycacFacebookPostKnowledge.sources,
    ...personalWowListFacebookEventKnowledge.sources,
    ...participationContinuityKnowledge.sources,
    ...wowListProductFitAugust2026.sources,
    ...professionalRecordAugust2026.sources,
    ...nycacSocialPopulationJuly2026.sources,
    ...nycacSourceExpansion.sources,
    ...nycacSourceExpansionII.sources,
    ...nycacPressArchive.sources,
    ...nycacRecentAdvocacyAugust2026.sources,
    ...nycartcCulturalSpaceStoryAugust2026.sources
  ],
  entities: [
    ...agencyGraph.entities,
    ...hjeChronologyAugust2026.entities,
    ...kcTownHallCouncilFunding.entities,
    ...kcTownHallTiredOfTiresSourceReturn.entities,
    ...nycacRecentAdvocacyAugust2026.entities,
    ...nycartcCulturalSpaceStoryAugust2026.entities
  ],
  agencyRelations: [
    ...agencyGraph.agencyRelations,
    ...hjeChronologyAugust2026.agencyRelations,
    ...kcTownHallCouncilFunding.agencyRelations,
    ...kcTownHallTiredOfTiresSourceReturn.agencyRelations,
    ...nycacRecentAdvocacyAugust2026.agencyRelations,
    ...nycartcCulturalSpaceStoryAugust2026.agencyRelations
  ],
  claims: [
    {
      id: "CLM-CALLNYC-HACKATHON-DATE-TIME",
      project: "callnyc",
      internalClaim: "The New York City Council constituent-services hackathon took place at Civic Hall on January 30, 2016, from 1-3 p.m.",
      status: "confirmed",
      projections: [{ key: "case-study", text: "On January 30, 2016, the New York City Council held a 1-3 p.m. hackathon at Civic Hall focused on constituent services.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", relationship: "direct-support", supports: ["date", "time", "Council event", "constituent-services purpose"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "corroborating", supports: ["date", "venue", "CouncilStat context"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Do not describe the Wayback page as a recovered event calendar listing."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON",
      project: "callnyc",
      internalClaim: "The New York City Council described the gathering as its first CouncilStat hackathon.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The Council described the gathering as its first CouncilStat hackathon.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", relationship: "direct-support", supports: ["the Council's own first-CouncilStat description"], confidence: "high", renderCitation: true }],
      boundaries: [],
      antiClaims: ["first civic-data hackathon", "first civic-tech hackathon", "the Council's first hackathon of any kind"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-EVENT-BRANDING",
      project: "callnyc",
      internalClaim: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "The surviving promotional graphic uses the branding 'New York City Council Hackathon.'", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC", relationship: "direct-support", supports: ["graphic wording", "event branding"], confidence: "high", renderCitation: true }],
      boundaries: ["Treat the wording as visible branding, not proof of a longer formal registration title."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-CHRONOLOGY-CORRECTION-2016",
      project: "callnyc",
      internalClaim: "The recovered event, data-release, press, and implementation chronology places CallNYC in 2016 rather than 2014-2015.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "The recovered public chronology places CallNYC in 2016.",
        status: "active",
        citationRequired: true,
        surfaces: ["/lab/source-backed-team-memory"]
      }],
      evidence: [
        { sourceId: "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", relationship: "direct-support", supports: ["January 2016 Council hackathon date and time"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["March 2016 public coverage and data-release sequence"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "corroborating", supports: ["surviving 2016 implementation history"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["This corrects the project year; it does not make CallNYC an official Council product or a documented hackathon submission."],
      antiClaims: ["CallNYC existed in 2014-2015", "CallNYC was commissioned by the Council"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-28",
      reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "After the fuller CouncilStat dataset was released, Jamie developed CallNYC.org as an independent public-facing interpretation of those constituent-services records.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] },
        { key: "work-card", text: "Built an independent civic-data follow-on translating CouncilStat constituent-services records into resident-facing issue pathways and next-step guidance.", status: "active", citationRequired: false, surfaces: ["/work", "/work/callnyc"] },
        { key: "resume-html", text: "Built CallNYC.org as an independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.", status: "active", citationRequired: false, surfaces: ["/resume"] }
      ],
      evidence: [
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "direct-support", supports: ["sequence from the January event through the fuller data release", "Jamie's independent development and iteration", "Politico coverage"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "corroborating", supports: ["surviving implementation of the independent prototype"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["CallNYC was an independent follow-on, not an official Council product, documented formal submission, or winner."],
      antiClaims: ["Jamie caused the CouncilStat release", "CallNYC was commissioned by the Council", "CallNYC was a winning hackathon submission"],
      researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS",
      project: "callnyc",
      internalClaim: "CallNYC is an archived independent civic-data prototype, not an official or current New York City Council service.",
      status: "confirmed-with-boundary",
      projections: [{ key: "case-study", text: "CallNYC is an archived independent prototype, not an official or current New York City Council service.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] }],
      evidence: [
        { sourceId: "SRC-CALLNYC-GITHUB-REPOSITORY", relationship: "direct-support", supports: ["surviving independent implementation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "context", supports: ["contemporaneous independent-project framing"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Historical officeholders, statistics, categories, and contact information are not current guidance."],
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    {
      id: "CLM-CALLNYC-DIGITAL-DISTRICT",
      project: "callnyc",
      internalClaim: "A participant photograph documents a breakout table labeled 'Digital District - Help improve City Council District office operations.'",
      status: "use-with-care",
      projections: [{ key: "photo-caption", text: "Participant photograph documenting the Digital District breakout table.", status: "hold", citationRequired: true, surfaces: [] }],
      evidence: [{ sourceId: "SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO", relationship: "private-support", supports: ["placard wording", "breakout-table context"], confidence: "high", renderCitation: false }],
      boundaries: ["Do not describe Digital District as the official event title.", "Do not publish the photograph before rights, consent, and editorial review."],
      antiClaims: ["The photograph identifies a facilitator.", "The photograph establishes participant consent.", "Digital District was the formal event title."], researchInquiryIds: ["INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO"], reviewedAt: "2026-07-12", reviewedBy: ["Jamie Burkart", "Codex archival review", "photo-editor feedback review"]
    },
    {
      id: "CLM-CALLNYC-CIVIC-HALL-PAGE-NOT-RECOVERED",
      project: "callnyc",
      internalClaim: "No Civic Hall calendar listing or dedicated event-detail page was recovered in the documented Wayback/CDX review.",
      status: "not-recovered",
      projections: [{ key: "archive-note", text: "No Civic Hall calendar listing or dedicated event-detail page has been recovered in the documented Wayback/CDX review.", status: "active", citationRequired: false, surfaces: ["docs/knowledge-bank/projects/callnyc"] }],
      evidence: [{ sourceId: "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026", relationship: "direct-support", supports: ["bounded negative search finding"], confidence: "high", renderCitation: false }],
      boundaries: ["Negative search is not proof of nonexistence.", "The archived Civic Hall page preserves embedded social-feed evidence, not a recovered event listing."],
      antiClaims: ["No Civic Hall event page existed."],
      researchInquiryIds: ["INQ-CALLNYC-CIVIC-HALL-PAGE-2026"], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
    },
    ...archiveProductionJuly2026.claims,
    ...callNycSocialPopulationJuly2026.claims,
    ...googleDriveProductionJuly2026.claims,
    ...historicalKnowledge.claims,
    ...hjeChronologyAugust2026.claims,
    ...socialMediaProductionJuly2026.claims,
    ...urbanhermitSocialPopulationJuly2026.claims,
    ...wowListFacebookPostKnowledge.claims,
    ...wowListSocialPopulationJuly2026.claims,
    ...wowListSocialPracticesAugust2026.claims,
    ...projectCompositionAugust2026.claims,
    ...kcTownHallCouncilFunding.claims,
    ...kcTownHallFieldPractice.claims,
    ...kcTownHallTiredOfTiresSourceReturn.claims,
    ...kcTownHallSocialCorpus.claims,
    ...kcSpacesFundFacebookPostKnowledge.claims,
    ...jamiePersonalFacebookPostKnowledge.claims,
    ...nycacImplementationEvidence.claims,
    ...nycacInstitutionalCapacity.claims,
    ...nycacSharedFolderProduction.claims,
    ...nycacFacebookEventKnowledge.claims,
    ...nycacFacebookPostKnowledge.claims,
    ...personalWowListFacebookEventKnowledge.claims,
    ...participationContinuityKnowledge.claims,
    ...wowListProductFitAugust2026.claims,
    ...professionalRecordAugust2026.claims,
    ...nycacSocialPopulationJuly2026.claims,
    ...nycacSourceExpansion.claims,
    ...nycacSourceExpansionII.claims,
    ...nycacPressArchive.claims,
    ...nycacRecentAdvocacyAugust2026.claims,
    ...nycartcCulturalSpaceStoryAugust2026.claims
  ],
  researchInquiries: [
    {
      id: "INQ-CALLNYC-CIVIC-HALL-PAGE-2026",
      project: "callnyc",
      question: "Can a dedicated Civic Hall calendar listing or event-detail page for the January 30, 2016, CouncilStat hackathon be recovered from the searched Wayback/CDX corpus?",
      methods: ["Reviewed 4,630 deduplicated HTML captures and 1,240 original URLs.", "Grouped 296 distinct event-prefix URL keys and inspected 215 successful event pages, 74 redirects, and 7 captured 404s.", "Searched event-like captures for CouncilStat, constituent services, and New York City Council references."],
      runAt: "2026-07-11",
      resultStatus: "not-recovered",
      findings: ["No CouncilStat, constituent-services, or NYC Council event slug was recovered.", "No dedicated Civic Hall event page or calendar listing was recovered.", "The archived Civic Hall page preserves embedded social-feed evidence supporting date, time, venue, branding, CouncilStat context, and constituent-services purpose."],
      limitations: ["Negative search is not proof of nonexistence.", "Google Form contents were not recovered.", "The agenda, breakout roster, and registration contents were not recovered."],
      sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368", "SRC-CALLNYC-CIVIC-HALL-RESEARCH-2026"],
      publicSummary: "A review of 4,630 deduplicated HTML captures, 1,240 original URLs, and 296 distinct event-prefix keys recovered embedded social-feed evidence but no dedicated Civic Hall listing or event-detail page.",
      protectedLocatorId: "RESEARCH-CALLNYC-CIVIC-HALL-CDX-2026-001"
    },
    {
      id: "INQ-CALLNYC-DIGITAL-DISTRICT-PHOTO",
      project: "callnyc",
      question: "What public-safe context can be established from the Digital District photograph, and what rights, consent, and corroboration are required before any public use?",
      methods: [
        "Recorded only visible placard wording and generic breakout-table context.",
        "Separated direct visual observation from inferred identities, roles, agenda, and event hours.",
        "Compared the possible claim against the existing CallNYC chronology while preserving a publication hold."
      ],
      runAt: "2026-07-12",
      resultStatus: "partially-recovered",
      findings: [
        "The placard wording and collaborative breakout setting are visually recoverable.",
        "The photograph is not cleared for public display and cannot establish identities, facilitation, consent, or a complete agenda."
      ],
      limitations: [
        "Photographer and rights-holder approval are unresolved.",
        "Represented people and any appropriate crop require consent review.",
        "A photograph is evidence of what is visibly present, not a complete account of the event."
      ],
      sourceIds: ["SRC-CALLNYC-DIGITAL-DISTRICT-PHOTO"],
      publicSummary: "A protected participant photograph preserves the visible Digital District breakout wording; public display remains on hold pending rights, consent, and editorial review.",
      protectedLocatorId: "PHOTO-CALLNYC-DIGITAL-DISTRICT-2016-001"
    },
    ...archiveProductionJuly2026.researchInquiries,
    ...callNycSocialPopulationJuly2026.researchInquiries,
    ...googleDriveProductionJuly2026.researchInquiries,
    ...historicalKnowledge.researchInquiries,
    ...hjeChronologyAugust2026.researchInquiries,
    ...socialMediaProductionJuly2026.researchInquiries,
    ...urbanhermitSocialPopulationJuly2026.researchInquiries,
    ...wowListFacebookPostKnowledge.researchInquiries,
    ...wowListSocialPopulationJuly2026.researchInquiries,
    ...wowListSocialPracticesAugust2026.researchInquiries,
    ...projectCompositionAugust2026.researchInquiries,
    ...kcTownHallCouncilFunding.researchInquiries,
    ...kcTownHallFieldPractice.researchInquiries,
    ...kcTownHallTiredOfTiresSourceReturn.researchInquiries,
    ...kcTownHallSocialCorpus.researchInquiries,
    ...kcSpacesFundFacebookPostKnowledge.researchInquiries,
    ...jamiePersonalFacebookPostKnowledge.researchInquiries,
    ...nycacInstitutionalCapacity.researchInquiries,
    ...nycacSharedFolderProduction.researchInquiries,
    ...nycacFacebookEventKnowledge.researchInquiries,
    ...nycacFacebookPostKnowledge.researchInquiries,
    ...personalWowListFacebookEventKnowledge.researchInquiries,
    ...participationContinuityKnowledge.researchInquiries,
    ...wowListProductFitAugust2026.researchInquiries,
    ...professionalRecordAugust2026.researchInquiries,
    ...nycacRecentAdvocacyAugust2026.researchInquiries,
    ...nycartcCulturalSpaceStoryAugust2026.researchInquiries,
    ...nycacSocialPopulationJuly2026.researchInquiries,
    ...nycacSourceExpansion.researchInquiries,
    ...nycacSourceExpansionII.researchInquiries,
    ...nycacPressArchive.researchInquiries
  ],
  proofCoverageTargets: [...proofCoverageTargets],
  corrections: [
    ...hjeChronologyAugust2026.corrections,
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-CHRONOLOGY-CORRECTION-2016", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" },
    { id: "COR-NYCAC-CABARET-HEARING-DATE-2026", claimId: "CLM-NYCAC-CABARET-TESTIMONY-2017", previousText: "June 19, 2017", replacementText: "September 14, 2017", reason: "The official transcript title page identifies the Committee on Consumer Affairs hearing date as September 14, 2017.", decidedAt: "2026-07-14", affectedSurfaces: ["/work/fair-rent-nyc", "knowledge-bank", "public-citation-registry"], status: "active" }
  ],
  pages: [{
    id: "about",
    surface: "/about",
    sourceOrder: [
      "SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"
    ],
    occurrences: [
      {
        id: "open-house-participatory-gallery",
        claimId: "CLM-OPEN-HOUSE-PARTICIPATORY-GALLERY",
        projection: "archive-note",
        sourceIds: ["SRC-OPEN-HOUSE-GOOD-TIMES-2006-06-28"]
      }
    ]
  }, {
    id: "harry-j-epstein",
    surface: "/work/harry-j-epstein",
    sourceOrder: [
      "SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS",
      "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
      "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
      "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
    ],
    occurrences: [
      {
        id: "thick-arts-formation",
        claimId: "CLM-THICK-ARTS-FORMATION-2012-07-06",
        projection: "case-study",
        sourceIds: ["SRC-THICK-ARTS-NYS-DOS-ACTIVE-CORPORATIONS"]
      },
      {
        id: "historic-storefront-chronology",
        claimId: "CLM-HJE-STOREFRONT-CHRONOLOGY-2009-2015",
        projection: "case-study",
        sourceIds: [
          "SRC-HJE-WAYBACK-STOREFRONT-2010-01-01",
          "SRC-HJE-WAYBACK-STOREFRONT-2015-07-03",
          "SRC-HJE-WAYBACK-STOREFRONT-REDIRECT-2015-08-01"
        ]
      }
    ]
  }, {
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
      "SRC-CALLNYC-X-POPULATION-MANIFEST",
      "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "council-social-engagement", claimId: "CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT", projection: "case-study", sourceIds: ["SRC-CALLNYC-X-POPULATION-MANIFEST", "SRC-NYC-COUNCIL-STATED-MEETING-2016-09-28"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }, {
    id: "fair-rent-nyc",
    surface: "/work/fair-rent-nyc",
    sourceOrder: [
      "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19",
      "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14",
      "SRC-NYCAC-NPR-CABARET-2017-09-20",
      "SRC-NYCAC-BEDFORD-DIY-SPACES-2017-02-07",
      "SRC-NYCAC-SUPPORTERS-LIST",
      "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
      "SRC-NYCAC-GREENE-HILL-QA-2017-12-19",
      "SRC-NYC-SBJSA-HEARING-2018-10-22",
      "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026",
      "SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE",
      "SRC-FAIRRENTNYC-GITHUB-REPOSITORY",
      "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17",
      "SRC-NYC-MARCH-REPORT-Q1-Q2-2020",
      "SRC-NYC-MARCH-LOCAL-LAW-220-2019",
      "SRC-NYC-ONL-REPORT-2023-24",
      "SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15",
      "SRC-NYCAC-X-PROFILE",
      "SRC-NYCAC-DOCUMENT-JOURNAL-2018",
      "SRC-NYCAC-X-RETRIEVABLE-POPULATION-2026",
      "SRC-X-HELP-MISSING-POSTS",
      "SRC-X-HELP-ACCOUNT-ARCHIVE",
      "SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-POST-CENSUS-2026",
      "SRC-NYCAC-FACEBOOK-POST-REPORT-2026"
    ],
    occurrences: [
      { id: "cabaret-safety-organizing", claimId: "CLM-NYCAC-CABARET-SAFETY-ORGANIZING", projection: "case-study", sourceIds: ["SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", "SRC-NYCAC-COUNCIL-CABARET-HEARING-2017-09-14"] },
      { id: "founder-operating-role", claimId: "CLM-NYCAC-FOUNDER-AND-OPERATING-ROLE", projection: "case-study", sourceIds: ["SRC-NYCAC-NPR-CABARET-2017-09-20", "SRC-NYCAC-BEDFORD-DIY-SPACES-2017-02-07", "SRC-NYCAC-SUPPORTERS-LIST"] },
      { id: "nightlife-town-hall", claimId: "CLM-NYCAC-NIGHTLIFE-TOWN-HALL-2017", projection: "case-study", sourceIds: ["SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", "SRC-NYCAC-GREENE-HILL-QA-2017-12-19"] },
      { id: "sbjsa-testimony", claimId: "CLM-NYCAC-SBJSA-TESTIMONY-2018", projection: "case-study", sourceIds: ["SRC-NYC-SBJSA-HEARING-2018-10-22"] },
      { id: "sbu-report-review", claimId: "CLM-NYCAC-SBU-REPORT-REVIEW-2026", projection: "case-study", sourceIds: ["SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026"] },
      { id: "campaign-web-implementation", claimId: "CLM-NYCAC-CAMPAIGN-WEB-IMPLEMENTATION", projection: "case-study", sourceIds: ["SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE", "SRC-FAIRRENTNYC-GITHUB-REPOSITORY"] },
      { id: "talks-not-raids-policy-arc", claimId: "CLM-NYCAC-TALKS-NOT-RAIDS-POLICY-ARC", projection: "case-study", sourceIds: ["SRC-NYCAC-CAMPAIGN-GIT-HISTORIES-ARCHIVE", "SRC-NYCAC-CREATENYC-SUBMISSION-2017-03-17", "SRC-NYC-MARCH-REPORT-Q1-Q2-2020", "SRC-NYC-MARCH-LOCAL-LAW-220-2019", "SRC-NYC-ONL-REPORT-2023-24"] },
      { id: "coalition-social-identity", claimId: "CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY", projection: "case-study", sourceIds: ["SRC-SOCIAL-ARCHIVE-INVENTORY-2026-07-15", "SRC-NYCAC-X-PROFILE", "SRC-NYCAC-DOCUMENT-JOURNAL-2018"] },
      { id: "coalition-social-population", claimId: "CLM-NYCAC-X-RETRIEVABLE-SOCIAL-INFRASTRUCTURE", projection: "case-study", sourceIds: ["SRC-NYCAC-X-RETRIEVABLE-POPULATION-2026", "SRC-X-HELP-MISSING-POSTS", "SRC-X-HELP-ACCOUNT-ARCHIVE"] },
      { id: "coalition-participation-system", claimId: "CLM-NYCAC-PARTICIPATION-SYSTEM", projection: "case-study", sourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026", "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", "SRC-NYCAC-GREENE-HILL-QA-2017-12-19"] },
      { id: "coalition-event-response-signals", claimId: "CLM-NYCAC-FACEBOOK-EVENT-RESPONSE-SIGNALS", projection: "case-study", sourceIds: ["SRC-NYCAC-FACEBOOK-EVENT-CENSUS-2026"] },
      { id: "coalition-facebook-public-operating-record", claimId: "CLM-NYCAC-FACEBOOK-PUBLIC-OPERATING-RECORD", projection: "case-study", sourceIds: ["SRC-NYCAC-FACEBOOK-POST-CENSUS-2026", "SRC-NYCAC-FACEBOOK-POST-REPORT-2026"] },
      { id: "crs-campaign-memory-system", claimId: "CLM-CRS-CAMPAIGN-MEMORY-SYSTEM-2026", projection: "case-study" },
      { id: "crs-provenance-redline", claimId: "CLM-CRS-LEGISLATIVE-PROVENANCE-REDLINE-2026", projection: "case-study" }
    ]
  }, {
    id: "kc-town-hall",
    surface: "/work/kc-town-hall",
    sourceOrder: [
      "SRC-KC-TOWN-HALL-CCED-BOARD-MATERIALS-2019",
      "SRC-KC-TOWN-HALL-RESOLUTION-190649",
      "SRC-KC-TOWN-HALL-ORDINANCE-190642",
      "SRC-KCSTAR-CCED-PROJECT-DELAYS-2021",
      "SRC-KC-TOWN-HALL-CCED-REPORT-2022-12",
      "SRC-KC-TOWN-HALL-CCED-REPORT-2023",
      "SRC-JAMIE-RESUME-KC-TOWN-HALL-2026",
      "SRC-KCTH-TIRES-WAYBACK-2021",
      "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
      "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
      "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
      "SRC-KCMO-COUNCIL-ROSTER-2018",
      "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"
    ],
    occurrences: [
      {
        id: "jamie-secured-cced-award",
        claimId: "CLM-KC-TOWN-HALL-JAMIE-SECURED-CCED-AWARD",
        projection: "case-study",
        sourceIds: [
          "SRC-KC-TOWN-HALL-CCED-BOARD-MATERIALS-2019",
          "SRC-KC-TOWN-HALL-RESOLUTION-190649",
          "SRC-KC-TOWN-HALL-ORDINANCE-190642"
        ]
      },
      {
        id: "mission-aligned-transition",
        claimId: "CLM-KC-TOWN-HALL-MISSION-ALIGNED-TRANSITION",
        projection: "case-study"
      },
      {
        id: "administrative-stewardship",
        claimId: "CLM-KC-TOWN-HALL-ADMINISTRATIVE-STEWARDSHIP",
        projection: "case-study",
        sourceIds: [
          "SRC-KCSTAR-CCED-PROJECT-DELAYS-2021",
          "SRC-KC-TOWN-HALL-CCED-REPORT-2022-12",
          "SRC-KC-TOWN-HALL-CCED-REPORT-2023"
        ]
      },
      {
        id: "jamie-planning-contribution",
        claimId: "CLM-KC-TOWN-HALL-JAMIE-PLANNING-CONTRIBUTION",
        projection: "case-study",
        sourceIds: ["SRC-JAMIE-RESUME-KC-TOWN-HALL-2026"]
      },
      {
        id: "tired-of-tires-service-design",
        claimId: "CLM-KCTH-TIRED-OF-TIRES-SERVICE-DESIGN",
        projection: "case-study",
        sourceIds: ["SRC-KCTH-TIRES-WAYBACK-2021"]
      },
      {
        id: "tired-of-tires-measurement",
        claimId: "CLM-KCTH-TIRED-OF-TIRES-MEASUREMENT",
        projection: "case-study"
      },
      {
        id: "public-service-interface",
        claimId: "CLM-KCTH-SOCIAL-SERVICE-REPORTING",
        projection: "case-study",
        sourceIds: [
          "SRC-X-KCTH-FULL-POPULATION-AUDIT-2026",
          "SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29",
          "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29",
          "SRC-KCMO-COUNCIL-ROSTER-2018",
          "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"
        ]
      }
    ]
  }, {
    id: "technical-operations",
    surface: "/work/technical-operations",
    sourceOrder: [
      "SRC-WOWLIST-X-POPULATION-MANIFEST",
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026"
    ],
    occurrences: [
      {
        id: "wowlist-senior-product-practice",
        claimId: "CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026",
        projection: "case-study",
        sourceIds: [
          "SRC-WOWLIST-X-POPULATION-MANIFEST",
          "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
          "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016"
        ]
      },
      {
        id: "sbu-report-review",
        claimId: "CLM-NYCAC-SBU-REPORT-REVIEW-2026",
        projection: "case-study",
        sourceIds: ["SRC-SBU-EMPTY-STOREFRONTS-HIGH-RENTS-REPORT-2026"]
      }
    ]
  }, {
    id: "wowlist",
    surface: "/work/wowlist",
    sourceOrder: [
      "SRC-WOWLIST-X-POPULATION-MANIFEST",
      "SRC-WOWLIST-SUNDAY-DINNER-POST-2014",
      "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016",
      "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026",
      "SRC-WOWLIST-SHELBY-TUTORIAL-2015",
      "SRC-WOWLIST-SBDIY-ADOPTION",
      "SRC-CALLSCRIPT-FACEBOOK-PAGE",
      "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27",
      "SRC-FB-JAMIE-DCLA-DIY-SPACES-EVENT-2017-01-25",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016",
      "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026"
    ],
    occurrences: [
      { id: "senior-product-practice", claimId: "CLM-WOWLIST-SENIOR-PRODUCT-PRACTICE-2026", projection: "case-study", sourceIds: ["SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016"] },
      { id: "production-scale", claimId: "CLM-WOWLIST-PRODUCTION-SCALE-2017", projection: "case-study", sourceIds: ["SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026"] },
      { id: "social-provenance-and-support", claimId: "CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT", projection: "case-study", sourceIds: ["SRC-WOWLIST-X-POPULATION-MANIFEST", "SRC-WOWLIST-SUNDAY-DINNER-POST-2014", "SRC-WOWLIST-PRODUCT-SUPPORT-POST-2016", "SRC-WOWLIST-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-SBDIY-ADOPTION"] },
      { id: "callscript-participation-continuity", claimId: "CLM-CALLSCRIPT-WOWLIST-NYCAC-CONTINUITY-2017", projection: "case-study", sourceIds: ["SRC-CALLSCRIPT-FACEBOOK-PAGE", "SRC-CALLSCRIPT-DCLA-EVENT-DISCUSSION-2017-01-27", "SRC-FB-JAMIE-DCLA-DIY-SPACES-EVENT-2017-01-25", "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026"] },
      { id: "facebook-event-route", claimId: "CLM-FACEBOOK-WOWLIST-IN-PRACTICE", projection: "case-study", sourceIds: ["SRC-FACEBOOK-SUNDAY-DINNER-200-2016", "SRC-FACEBOOK-PERSONAL-WOWLIST-EVENT-CENSUS-2026"] }
    ]
  }, {
    id: "196-sunday-dinner",
    surface: "/work/196-sunday-dinner",
    sourceOrder: [
      "SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026",
      "SRC-FACEBOOK-SUNDAY-DINNER-100-2014",
      "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"
    ],
    occurrences: [
      { id: "protected-attendance-corroboration", claimId: "CLM-SUNDAY-DINNER-300-PLUS-CORROBORATION", projection: "case-study", sourceIds: ["SRC-PARTICIPATION-CONTINUITY-CONTROLS-2026"] },
      { id: "residency-onboarding-workflow", claimId: "CLM-196-RESIDENCY-ONBOARDING-WORKFLOW-2023", projection: "case-study" },
      { id: "sunday-dinner-invitation-operations", claimId: "CLM-SUNDAY-DINNER-INVITATION-OPERATIONS-2025", projection: "case-study" },
      { id: "facebook-milestones", claimId: "CLM-FACEBOOK-SUNDAY-DINNER-MILESTONES", projection: "case-study", sourceIds: ["SRC-FACEBOOK-SUNDAY-DINNER-100-2014", "SRC-FACEBOOK-SUNDAY-DINNER-200-2016"] }
    ]
  }, {
    id: "source-backed-team-memory",
    surface: "/lab/source-backed-team-memory",
    sourceOrder: [
      "SRC-AI-EVALS-CERTIFICATE-2026",
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY"
    ],
    occurrences: [
      { id: "source-backed-memory-method", claimId: "CLM-SOURCE-BACKED-MEMORY-METHOD-2026", projection: "case-study" },
      { id: "ai-evals-course-completion", claimId: "CLM-AI-EVALS-COURSE-COMPLETION-2026", projection: "case-study", sourceIds: ["SRC-AI-EVALS-CERTIFICATE-2026"] },
      {
        id: "callnyc-correction-trace",
        claimId: "CLM-CALLNYC-CHRONOLOGY-CORRECTION-2016",
        projection: "case-study",
        sourceIds: [
          "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
          "SRC-CALLNYC-POLITICO-2016-03-14",
          "SRC-CALLNYC-GITHUB-REPOSITORY"
        ]
      }
    ]
  }]
};

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
