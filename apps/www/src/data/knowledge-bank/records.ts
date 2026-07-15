import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import {
  campaignPressDistinctSourceIds,
  campaignPressIndexSourceIds,
  campaignPressPlacementCount,
  campaignPressSources,
  campaignPressSourceIds
} from "./campaignPress.ts";
import {
  callNycCouncilSocialSourceIds,
  callNycFullPopulationCensusSourceId,
  callNycProjectSocialSourceIds,
  kcTownHallCouncilResponseSourceIds,
  kcTownHallFullPopulationCensusSourceId,
  kcSpacesRecipientSocialSourceIds,
  nycaCouncilSocialSourceIds,
  nycaOlympiaSocialSourceId,
  projectSocialSources
} from "./projectSocial.ts";

const knowledgeBankInput = {
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
    {
      id: "SRC-WATERWAYS-PITCH-HUCK-FINN-2007",
      title: "When Artists Turn Huck Finn",
      organization: "The Pitch",
      author: "Eric Barton",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2007-08-09",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.thepitchkc.com/when-artists-turn-huck-finn/",
      preferredPublicUrl: "canonical",
      publicCitation: "Eric Barton, 'When Artists Turn Huck Finn,' The Pitch, August 9, 2007.",
      publicNote: "Contemporaneous reporting identifies Jamie as the originator of an experiential river expedition and documents a recycled-material raft crossing Missouri.",
      supportsGenerally: ["Jamie conceived the expedition", "recycled-material raft", "Missouri River context", "connection between transportation history and public art"],
      doesNotEstablish: ["completion of the full route to the Gulf of Mexico", "the exact final landing point", "Jamie's sole authorship of the collective expedition", "a complete participant roster"]
    },
    {
      id: "SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
      title: "Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water",
      organization: "Charlotte Street Foundation",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2009-09-01",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://charlottestreet.org/event/great-accommodations-with-jamie-burkart-imagining-lifestyles-for-cities-on-the-water/",
      preferredPublicUrl: "canonical",
      publicCitation: "Charlotte Street Foundation, 'Great Accommodations with Jamie Burkart - Imagining Lifestyles for Cities on the Water,' September 1, 2009.",
      publicNote: "The institutional project page describes Jamie as spearheading a participatory river-city exhibition and credits Suzanne Hogan as a collaborator in its outreach.",
      supportsGenerally: ["Great Accommodations project and exhibition", "Jamie's project leadership", "Suzanne Hogan collaboration", "participatory river-city outreach", "interactive installation and public-program components", "Jamie's retrospective account of the raft journey"],
      doesNotEstablish: ["Jamie's sole authorship of every project component", "independent verification of every detail in Jamie's retrospective raft account", "a complete collaborator list", "the exact final landing point of the raft journey"]
    },
    {
      id: "SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006",
      title: "Open House",
      organization: "Good Times",
      author: "Laura Mattingly",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2006-06-28",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.goodtimes.sc/archives/metro-santa-cruz/06.28.06/open-house-0626.html",
      preferredPublicUrl: "canonical",
      publicCitation: "Laura Mattingly, 'Open House,' Good Times, June 28, 2006.",
      publicNote: "Contemporaneous reporting documents Jamie's ten-day Open House experiment, earlier collectively produced Shop Shows, and his explicit commitment to communal responsibility and decision-making.",
      supportsGenerally: ["Open House at Porter Bridge Gallery", "ten-day communal-living and participatory-art experiment", "Shop Shows from 2003 to 2005", "communal responsibility and decision-making", "inclusive public participation"],
      doesNotEstablish: ["Jamie as sole leader or sole author", "a complete participant roster", "a permanent housing program", "the safety or consent status of publishing every participant detail"]
    },
    {
      id: "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
      title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
      organization: "Gothamist",
      author: "Emma Whitford",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-19",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
      preferredPublicUrl: "canonical",
      publicCitation: "Emma Whitford, 'DIY Venues Demand Repeal Of Widely Reviled Cabaret Law,' Gothamist, June 19, 2017.",
      publicNote: "The reporting identifies Jamie with NYC Artist Coalition, documents his fire-code study groups and City Hall advocacy, and quotes his public-safety analysis of the Cabaret Law.",
      supportsGenerally: ["Jamie's NYC Artist Coalition affiliation", "fire-code study groups organized by Jamie", "Jamie's participation in City Hall repeal advocacy", "Jamie's public-safety framing", "Cabaret Law and Office of Nightlife policy context"],
      doesNotEstablish: ["Jamie alone repealed the Cabaret Law", "Jamie alone created NYC Artist Coalition", "Jamie authored the repeal legislation", "Jamie alone created the Office of Nightlife", "the complete coalition campaign history"]
    },
    {
      id: "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20",
      title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
      organization: "NPR",
      author: "Jane Lerner",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-09-20",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
      preferredPublicUrl: "canonical",
      publicCitation: "Jane Lerner, 'With Its No Dancing Law Verging On Repeal, New York Legitimizes Its Nightlife,' NPR, September 20, 2017.",
      publicNote: "Captured as national context for the Cabaret Law repeal movement. Direct access to the canonical page was blocked during this review, so person-specific use requires a later close reading.",
      supportsGenerally: ["national coverage of the 2017 Cabaret Law repeal movement", "nightlife and cultural-space policy context"],
      doesNotEstablish: ["Jamie's role in the repeal campaign", "NYC Artist Coalition's complete role", "Jamie's role in creating the Office of Nightlife", "causality for the final policy outcome"]
    },
    {
      id: "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
      title: "The Co-op Q&A With Jamie Burkart and Julie Fredenberg",
      organization: "Greene Hill Food Co-op",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-12-19",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://www.greenehillfood.coop/master-blog/2017/12/september-2017-newsletter",
      preferredPublicUrl: "canonical",
      publicCitation: "Greene Hill Food Co-op, 'The Co-op Q&A With Jamie Burkart and Julie Fredenberg,' December 19, 2017.",
      publicNote: "A contemporaneous interview connecting Jamie's cooperative labor, weekly Sunday Dinner hosting, WOWList, and NYC Artist Coalition work. The title says Julie while the body says Julia; the knowledge bank preserves that source inconsistency rather than silently resolving it.",
      supportsGenerally: ["Jamie and Julia hosted an open weekly Sunday dinner in their Brooklyn apartment in 2017", "Jamie worked as a Greene Hill Food Co-op cashier", "Jamie and Julia worked as part of NYC Artist Coalition", "Jamie's attributed Cabaret Law and cultural-space analysis", "NYC Artist Coalition mutual-aid and advocacy context"],
      doesNotEstablish: ["300+ Sunday Dinner gatherings", "20+ resident artists", "Sunday Dinner's current frequency", "Jamie as sole creator of NYC Artist Coalition", "Jamie as sole producer of the September 2017 town hall", "resolution of the Julie and Julia name inconsistency"]
    },
    {
      id: "SRC-SUNDAY-DINNER-NYC-HOMEPAGE-2026",
      title: "Sunday Dinner NYC",
      organization: "Sunday Dinner NYC",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://sundaydinnernyc.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "Sunday Dinner NYC public project site, accessed July 13, 2026.",
      publicNote: "The current project surface preserves public pathways for attending, contributing media, recipes, videos, drawings, and related WOWList context. Its sparse homepage is not a scale or continuity record.",
      supportsGenerally: ["Sunday Dinner exists as a public project", "public participation and media-contribution pathways", "recipes, videos, drawings, and WOWList as project artifacts"],
      doesNotEstablish: ["who currently hosts Sunday Dinner", "when the project began", "current frequency", "300+ gatherings", "20+ resident artists", "participant consent to republish names or media"]
    },
    {
      id: "SRC-NYCA-LET-NYC-DANCE-2017-08-01",
      title: "Tell NYC Council: Legalize Dance at Bars, Clubs & Restaurants",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-08-01",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://nycartc.com/cabaret/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, 'Tell NYC Council: Legalize Dance at Bars, Clubs & Restaurants,' August 1, 2017.",
      publicNote: "A coalition campaign artifact documenting the Let NYC Dance call to action, Council letter, public maps, and source list. It establishes the public campaign surface, not its individual authorship.",
      supportsGenerally: ["NYC Artist Coalition Cabaret Law campaign surface", "Let NYC Dance call to action", "Intro 1652 advocacy", "letter to Council Member Rafael Espinal", "public maps and source-guidance artifacts"],
      doesNotEstablish: ["Jamie authored the page, letter, or maps", "Jamie alone organized the campaign", "the page caused repeal", "the independent accuracy of every campaign assertion", "a complete coalition contributor list"]
    },
    {
      id: "SRC-NYCA-BEDFORD-BOWERY-OFFICE-NIGHTLIFE-2017-08-24",
      title: "'Office of Nightlife' Bill Passes, Will Ease the Headache of Booze-Pouring",
      organization: "Bedford + Bowery",
      author: "Cassidy Dawn Graves",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-08-24",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://bedfordandbowery.com/2017/08/office-of-nightlife-bill-to-pass-ease-the-headache-of-booze-pouring/",
      preferredPublicUrl: "canonical",
      publicCitation: "Cassidy Dawn Graves, '\"Office of Nightlife\" Bill Passes, Will Ease the Headache of Booze-Pouring,' Bedford + Bowery, August 24, 2017.",
      publicNote: "Independent contemporaneous reporting identifies NYC Artist Coalition among groups advocating both Cabaret Law repeal and creation of an Office of Nightlife.",
      supportsGenerally: ["2017 passage of the Office of Nightlife bill", "NYC Artist Coalition advocacy for the office", "NYC Artist Coalition advocacy for Cabaret Law repeal", "Council and city-government context"],
      doesNotEstablish: ["Jamie's individual role", "Jamie or NYC Artist Coalition as the sole cause of passage", "Jamie as author of the legislation", "the complete advocacy coalition", "implementation outcomes after passage"]
    },
    {
      id: "SRC-NYCA-NIGHTLIFE-TOWN-HALL-2017-10-13",
      title: "Office of Nightlife Town Hall",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-10-13",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://nycartc.com/nightmayor/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, 'Office of Nightlife Town Hall,' October 13, 2017.",
      publicNote: "The event record documents an October 11 public town hall at Market Hotel and explicitly credits Anya Sapozhnikova as host alongside named artists, venue operators, advocates, and city officials.",
      supportsGenerally: ["October 11, 2017 Office of Nightlife town hall", "Market Hotel venue", "artist-led public input", "Anya Sapozhnikova host credit", "named speakers and city officials", "public asks around enforcement, affordability, safety, and cultural support"],
      doesNotEstablish: ["Jamie hosted the event", "Jamie produced the event", "Jamie authored the page or program", "attendance or audience scale", "the event's direct effect on agency policy"]
    },
    {
      id: "SRC-NYCA-CREATENYC-RECOMMENDATIONS-2017",
      title: "Preserve NYC's Community-Driven Spaces & Culture",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://nycartc.com/preserve-communitydriven/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, 'Preserve NYC's Community-Driven Spaces & Culture,' accessed July 13, 2026.",
      publicNote: "A coalition record of a March 30 CreateNYC town hall and collective recommendations to the Department of Cultural Affairs. The page describes the recommendations as collectively developed.",
      supportsGenerally: ["March 30 CreateNYC town hall at Market Hotel", "collectively developed cultural-plan recommendations", "recommendations on criminalization, MARCH transparency, permits, repairs, affordability, liaisons, and city space"],
      doesNotEstablish: ["the page's publication date", "Jamie authored the recommendations", "Jamie produced or hosted the town hall", "attendance or audience scale", "adoption of the recommendations by the city"]
    },
    {
      id: "SRC-NYCA-SAFETY-RESOURCES-2017-02-09",
      title: "Venue Safety Resources",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-02-09",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://nycartc.com/safety/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, 'Venue Safety Resources,' February 9, 2017.",
      publicNote: "A public safety-resource page that credits Tara Mc Manus for teaching a fire-safety course and compiles fire-guard and emergency-planning resources.",
      supportsGenerally: ["NYC Artist Coalition venue-safety resource surface", "February 2017 fire-safety programming", "Tara Mc Manus teaching credit", "fire-guard and emergency-planning resources"],
      doesNotEstablish: ["Jamie created the course", "Jamie taught the course", "Jamie authored the page", "the complete safety-program history", "participant attendance or outcomes"]
    },
    {
      id: "SRC-NYCA-TALKS-NOT-RAIDS-MARCH-2019-02-12",
      title: "End MARCH Raids / Talks Not Raids",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-02-12",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://nycartc.com/march/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, 'End MARCH Raids / Talks Not Raids,' February 12, 2019.",
      publicNote: "A campaign artifact documenting the Talks Not Raids call to action, Intro 1156, a multi-organization coalition, public sign-ons, and press materials. It does not identify Jamie's individual contribution.",
      supportsGenerally: ["Talks Not Raids campaign surface", "MARCH transparency and advance-notice advocacy", "Intro 1156 campaign context", "multi-organization coalition", "public Council sponsor and sign-on list", "press-kit materials"],
      doesNotEstablish: ["Jamie's individual role", "Jamie authored the page or campaign materials", "Jamie or NYC Artist Coalition alone caused enactment", "the campaign ended or disbanded MARCH", "the independent accuracy of every campaign statistic"]
    },
    {
      id: "SRC-NYC-COUNCIL-INT-1652-2017",
      title: "Int 1652-2017: Repeal of the Cabaret Law license requirement",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2017-06-21",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6FDA3305-06B3-47B3-9DF6-21B605C5A8EE&ID=3086319&Options=ID%7CText%7C&Search=cabaret",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Int 1652-2017, enacted November 27, 2017 as Local Law 214 of 2017.",
      publicNote: "The official legislative record establishes enactment, sponsors, chronology, and the law's limited scope: repeal of the cabaret-license requirement while retaining specified security measures.",
      supportsGenerally: ["Int 1652-2017 introduction", "enactment on November 27, 2017", "Local Law 214 of 2017", "Council sponsor list", "repeal of the cabaret-license requirement", "retention of specified security measures"],
      doesNotEstablish: ["Jamie's role", "NYC Artist Coalition's role", "advocacy causality", "the complete historical rationale for the Cabaret Law", "elimination of every nightlife regulation or enforcement mechanism"]
    },
    {
      id: "SRC-NYC-COUNCIL-INT-1156-2018",
      title: "Int 1156-2018: Reporting and notice requirements for MARCH operations",
      organization: "New York City Council",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2018-10-17",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://legistar.council.nyc.gov/LegislationDetail.aspx?GUID=6A35ADA6-86E7-40B0-AD39-5B6E376FD23F&ID=3704342&Options=ID%7CText%7C&Search=1156",
      preferredPublicUrl: "canonical",
      publicCitation: "New York City Council, Int 1156-2018, enacted December 15, 2019 as Local Law 220 of 2019.",
      publicNote: "The official legislative record establishes MARCH reporting, advance-notice, establishment-response, machine-readable publication, and privacy requirements. It does not say the program was disbanded.",
      supportsGenerally: ["Int 1156-2018 introduction", "enactment on December 15, 2019", "Local Law 220 of 2019", "MARCH reporting requirements", "30-day notice with exceptions", "establishment opportunity to provide relevant information", "machine-readable public reporting", "privacy limits"],
      doesNotEstablish: ["Jamie's role", "NYC Artist Coalition's role", "advocacy causality", "disbandment of MARCH", "elimination of all multi-agency nightlife enforcement"]
    },
    {
      id: "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26",
      title: "Resolution 190649: KC Town Hall CCED recommendation",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=44A50FFC-321A-41C7-9A86-6ADD9083B156&ID=5515936&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628240&GUID=2CBC09C0-65EC-4F05-A70F-FCD8E4F7FBE3&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Resolution 190649, adopted as substituted September 26, 2019.",
      publicNote: "The authenticated resolution records the CCED Sales Tax Board's July 16, 2019, vote to recommend $490,539 for KC Town Hall, the Council's acceptance of that recommendation, and authorization to negotiate a funding agreement of up to that amount with public-purpose and use restrictions.",
      supportsGenerally: ["CCED Sales Tax Board recommendation of $490,539", "July 16, 2019 Board vote", "Council adoption on September 26, 2019", "Council acceptance of the Board recommendation", "authorization to negotiate a funding agreement up to $490,539"],
      doesNotEstablish: ["Jamie's individual role", "execution of a funding agreement", "receipt or disbursement of funds", "expenditure of funds", "completion of the redevelopment project"]
    },
    {
      id: "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26",
      title: "Ordinance 190642: Round Two CCED project appropriations",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2019-09-26",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://kansascity.legistar.com/LegislationDetail.aspx?G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A&GUID=B387009F-F7F7-454D-950A-E44588056314&ID=5515929&Options=&Search=",
      assetUrl: "https://kansascity.legistar.com/View.ashx?M=F&ID=10628353&GUID=DAED2DE7-AA03-43D8-B1C9-448EA4DAEEB2&G=D2E89A09-8736-4EFB-B4AE-572E0903BD5A",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Ordinance 190642, passed as substituted September 26, 2019.",
      publicNote: "The authenticated ordinance appropriates Round Two CCED funds and lists $490,539 for KC Town Hall. Appropriation is a Council allocation decision, not evidence that KC Town Hall received or spent the funds.",
      supportsGenerally: ["Council passage on September 26, 2019", "Round Two CCED project appropriations", "$490,539 appropriation for KC Town Hall", "Council allocation following the CCED recommendation"],
      doesNotEstablish: ["Jamie's individual role", "execution of a funding agreement", "receipt or disbursement of funds", "expenditure of funds", "completion of the redevelopment project"]
    },
    {
      id: "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28",
      title: "Ordinance 240317: Reappropriation of unused KC Town Hall funds",
      organization: "City of Kansas City, Missouri",
      kind: "government-record",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2024-03-28",
      accessedAt: "2026-07-13",
      canonicalUrl: "https://clerk.kcmo.gov/LegislationDetail.aspx?GUID=E3F31A7F-65F8-464E-ABD4-197DEB6D80C8&ID=6586846&Options=&Search=",
      preferredPublicUrl: "canonical",
      publicCitation: "City of Kansas City, Missouri, Ordinance 240317, passed March 28, 2024.",
      publicNote: "The later Council record says Ordinance 190642 appropriated $490,539 to the KC Town Hall project account, that KC Town Hall subsequently withdrew from the project, and that the funds remained unused before being reappropriated to the Housing Budget Fund.",
      supportsGenerally: ["Ordinance 190642 appropriated $490,539 to the KC Town Hall project account", "KC Town Hall later withdrew", "the allocation remained unused", "Council reappropriated the unused funds in 2024"],
      doesNotEstablish: ["why KC Town Hall withdrew", "Jamie's individual role in the withdrawal", "receipt or expenditure of the allocation", "whether a funding agreement was ever executed", "the property's current status"]
    },
    {
      id: "SRC-NTER-CHNG-PITCH-2010-01-07",
      title: "NTR CHNG",
      organization: "The Pitch",
      kind: "published-article",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2010-01-07",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://www.thepitchkc.com/ntr-chng/",
      preferredPublicUrl: "canonical",
      publicCitation: "The Pitch event listing for NTR CHNG, published January 7, 2010.",
      publicNote: "The listing describes the installation's two-sided digital wall and real-time visitor text dialogue, but does not credit its makers.",
      supportsGenerally: ["January 2010 exhibition context", "software and architectural installation", "two-sided digital wall", "real-time visitor text messages", "evolving virtual dialogue"],
      doesNotEstablish: ["Jamie's role", "the complete collaborator roster", "technical implementation details", "visitor count", "audience outcome"]
    },
    {
      id: "SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23",
      title: "NTER CHNG project video metadata",
      organization: "Vimeo",
      author: "Garrett Fuselier",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-03-23",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://vimeo.com/21395655",
      preferredPublicUrl: "canonical",
      publicCitation: "Garrett Fuselier's Vimeo metadata and credits for NTER CHNG, uploaded March 23, 2011.",
      publicNote: "The metadata credits Drew Bolton, Jamie Burkart, and Garrett Fuselier as designers and credits Mary Nichols with wall engineering and construction help.",
      supportsGenerally: ["Jamie Burkart designer credit", "Drew Bolton designer credit", "Garrett Fuselier designer and programmer credit", "Mary Nichols engineering and construction contribution", "interactive texting installation"],
      doesNotEstablish: ["sole authorship", "Jamie's exact technical implementation scope", "visitor count", "commercial deployment", "current installation status"]
    },
    {
      id: "SRC-NTER-CHNG-PROJECT-SITE-2011",
      title: "NTER CHNG project site",
      organization: "NTER CHNG",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-01-28T19:33:50Z",
      accessedAt: "2026-07-15",
      archiveUrl: "https://web.archive.org/web/20110128193350/http://nterchng.com/",
      preferredPublicUrl: "archive",
      publicCitation: "NTER CHNG project site, archived January 28, 2011.",
      publicNote: "The archived project site describes an interactive texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and preserves its earlier Arts Incubator / Cocoon Gallery presentation.",
      supportsGenerally: ["NTER CHNG as an interactive texting installation", "shared credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier", "an earlier Arts Incubator / Cocoon Gallery presentation in Kansas City"],
      doesNotEstablish: ["the detailed division of software, design, fabrication, or production labor", "inclusion in America: Now and Here", "audience size, reception, adoption, or impact", "rights to republish archived media"]
    },
    {
      id: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
      title: "Drew Bolton, Jamie Burkart, and Garrett Fuselier",
      organization: "America: Now and Here Kansas City",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      capturedAt: "2011-05-18T07:16:26Z",
      accessedAt: "2026-07-15",
      archiveUrl: "https://web.archive.org/web/20110518071626/http://kansascity.americanowandhere.org/the-visual-artists/drew-bolton-jamie-burkart-and-garrett-fuselier/",
      preferredPublicUrl: "archive",
      publicCitation: "America: Now and Here Kansas City, 'Drew Bolton, Jamie Burkart, and Garrett Fuselier,' archived May 18, 2011.",
      publicNote: "The exhibition's official Kansas City site lists the three collaborators as visual artists and describes NTER CHNG as a software-and-architectural installation for real-time many-to-many public text exchange. Contact details and participant submissions on the archived page are intentionally excluded.",
      supportsGenerally: ["NTER CHNG inclusion in America: Now and Here in Kansas City", "shared visual-artist credit for Drew Bolton, Jamie Burkart, and Garrett Fuselier", "the work's software, architectural, real-time, and participatory form", "the collaborators' combined backgrounds in scenic design, computer programming, motion graphics, and experiential production"],
      doesNotEstablish: ["solo authorship or the detailed division of labor", "audience size, reception, later adoption, or causal impact", "institutional endorsement of an individual collaborator", "permission to republish contact details, participant messages, or media"]
    },
    {
      id: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
      title: "I Text, Therefore I Am",
      organization: "America: Now and Here",
      author: "BProffer",
      kind: "archived-web-capture",
      visibility: "public",
      preservationStatus: "archived",
      publishedAt: "2011-06-22",
      capturedAt: "2012-10-17T09:05:12Z",
      accessedAt: "2026-07-15",
      archiveUrl: "https://web.archive.org/web/20121017090512/http://americanowandhere.org/2011/06/i-text-therefore-i-am/",
      preferredPublicUrl: "archive",
      publicCitation: "America: Now and Here, 'I Text, Therefore I Am,' June 22, 2011, archived October 17, 2012.",
      publicNote: "A first-party exhibition account describes visitors using NTER CHNG by sending text messages and seeing them projected on a floor-to-ceiling gauze display. Participant messages are not reproduced in the knowledge bank.",
      supportsGenerally: ["visitor use of NTER CHNG during America: Now and Here", "text-message input and projected visual output", "public interaction as an observed feature of the installation"],
      doesNotEstablish: ["the makers' individual responsibilities", "total attendance, unique participants, endorsement, or impact", "permission to republish participant messages or exhibition media"]
    },
    {
      id: "SRC-NERMAN-AMERICA-NOW-HERE-2011",
      title: "America: Now and Here - Barbara Kruger",
      organization: "Nerman Museum of Contemporary Art",
      author: "Alice Thorson",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2011-04-30",
      accessedAt: "2026-07-15",
      canonicalUrl: "https://www.nermanmuseum.org/exhibitions/2011-05-11-kruger-barbara-america-now-here.html",
      preferredPublicUrl: "canonical",
      publicCitation: "Alice Thorson, 'America: Now and Here - Barbara Kruger,' Nerman Museum of Contemporary Art, April 30, 2011.",
      publicNote: "The institutional page situates America: Now and Here's 2011 Kansas City launch and its multi-venue visual, literary, musical, and performance program.",
      supportsGenerally: ["Kansas City as the 2011 launch context for America: Now and Here", "the exhibition's multi-venue and multidisciplinary scope", "Nerman Museum participation in the Kansas City program"],
      doesNotEstablish: ["NTER CHNG inclusion in the exhibition", "the NTER CHNG maker credits or division of labor", "Jamie's attendance, institutional endorsement, audience reach, or impact"]
    },
    {
      id: "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013-02-27",
      title: "A Sorted Audio File",
      organization: "Monthly Music Hackathon NYC",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2013-02-27",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://monthlymusichackathon.org/post/44177616179/sortedaudio",
      preferredPublicUrl: "canonical",
      publicCitation: "Monthly Music Hackathon NYC project note, A Sorted Audio File, February 27, 2013.",
      publicNote: "The project note says Jamie made a Max/MSP program that segmented an audio file and sorted the clips by a selected feature; Jamie's quoted description identifies pitch as the feature used in the presented experiment.",
      supportsGenerally: ["Jamie Burkart maker credit", "February 2013 Music Hackathon NYC", "Max/MSP program", "audio segmentation", "pitch-based clip sorting", "public audio output"],
      doesNotEstablish: ["production deployment", "general software-engineering proficiency", "original authorship of the source song", "continued maintenance", "audience scale"]
    },
    {
      id: "SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26",
      title: "Wash your cares away, for an evening",
      organization: "Matmos / Vague Terrain",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2016-11-26",
      accessedAt: "2026-07-14",
      canonicalUrl: "http://vague-terrain.com/2016/wash-your-cares-away-for-an-evening/",
      preferredPublicUrl: "canonical",
      publicCitation: "Matmos / Vague Terrain tour announcement, Wash your cares away, for an evening, November 26, 2016.",
      publicNote: "The announcement credits specially prepared tour video to Matmos with 'Jamie Burkhardt.' The surname mismatch remains unresolved and is not silently normalized to Jamie Burkart.",
      supportsGenerally: ["Ultimate Care II tour context", "specially prepared performance video", "Matmos collaboration with a person named Jamie Burkhardt"],
      doesNotEstablish: ["that Jamie Burkhardt is Jamie Burkart", "Jamie's exact creative or technical scope", "sole video authorship", "participation at every tour date", "audience or critical outcome"]
    },
    {
      id: "SRC-CLAUDETTES-THEATRE-XR-ENSEMBLE-2022-10-29",
      title: "Claudette's Theatre On Wheels",
      organization: "XR Ensemble",
      kind: "institutional-social-post",
      visibility: "public",
      preservationStatus: "live",
      publishedAt: "2022-10-29",
      accessedAt: "2026-07-14",
      canonicalUrl: "https://www.instagram.com/p/CkTDxU3DBqD/",
      preferredPublicUrl: "canonical",
      publicCitation: "XR Ensemble introduction to Claudette's Theatre On Wheels by Jamie Burkart and Michael Rees, October 29, 2022.",
      publicNote: "The post identifies Jamie and Michael as the artists and describes app-accessed clips presenting Claudette's women-centered theater and artistic life.",
      supportsGenerally: ["Jamie Burkart and Michael Rees artist credit", "Claudette's Theatre On Wheels", "2022 MakeUsVisible context", "short performance clips accessed in an app", "women-centered theater and public-memory purpose"],
      doesNotEstablish: ["the exact division of labor", "Jamie as sole author", "authorship of the underlying AR platform", "audience reach", "permission to republish every clip or personal detail"]
    },
    {
      id: "SRC-CRS-NINETY-DAY-OPERATING-PLAN-2026-04-06",
      title: "Ninety-day operating plan for Fair Rent NYC and Commercial Rent Stabilization",
      organization: "Fair Rent NYC / NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-04-06",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of Jamie Burkart's April 2026 Fair Rent NYC / Commercial Rent Stabilization operating plan.",
      publicNote: "The underlying working document remains outside the repository. The summary records the operating model and planned shared goods, not private strategy or stakeholder details.",
      supportsGenerally: ["Jamie authored the operating plan", "six shared public goods", "movement architecture and synthesis role", "digital infrastructure stewardship", "city and state companion-lane framing", "explicit sole-organizer boundary"],
      doesNotEstablish: ["completion of every planned deliverable", "coalition adoption of every proposal", "sole campaign leadership", "policy outcome causality", "current project status"],
      protectedLocatorId: "LOC-CRS-NINETY-DAY-PLAN-2026"
    },
    {
      id: "SRC-CRS-COLLABORATION-RUNNING-MINUTES-2026-04-29",
      title: "Commercial Rent Stabilization collaboration running minutes",
      organization: "Commercial Rent Stabilization collaborators",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-04-29",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of April 2026 Commercial Rent Stabilization collaboration running minutes.",
      publicNote: "The underlying minutes remain outside the repository. The summary excludes stakeholder contact details, sensitive stories, internal strategy, and unapproved transcript material.",
      supportsGenerally: ["Jamie created the running-minutes document", "shared memory purpose", "decision and action tracking", "owner and status fields", "consent-aware story handling", "city and state alignment", "Jamie's offer to build shared movement infrastructure"],
      doesNotEstablish: ["completion of every listed action", "formal coalition governance", "endorsement by every participant", "sole authorship of collective decisions", "policy outcome causality"],
      protectedLocatorId: "LOC-CRS-RUNNING-MINUTES-2026"
    },
    {
      id: "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
      title: "Open Data Foundation for a Future Commercial Rent Guidelines Board",
      organization: "NYC Artist Coalition",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2025-11-26",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of Jamie Burkart's November 2025 Open Data Foundation memo.",
      publicNote: "The signed memo proposes open aggregated indicator tables and a short technical note defining a minimum public data suite for a future Commercial Rent Guidelines Board.",
      supportsGenerally: ["Jamie authored and signed the memo", "proposal for aggregated commercial rent and vacancy indicators", "minimum public data suite", "confidentiality and vendor-data boundaries", "future Commercial Rent Guidelines Board implementation framing"],
      doesNotEstablish: ["agency adoption", "legal feasibility of every requested release", "availability of proprietary source data", "creation of a Commercial Rent Guidelines Board", "independent validation of every policy premise"],
      protectedLocatorId: "LOC-CRS-OPEN-DATA-MEMO-2025"
    },
    {
      id: "SRC-CRS-FULLER-PUBLIC-BASELINE-HANDOUT-2026-03-27",
      title: "Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC",
      organization: "School of Data presentation material",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-03-27",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of Jamie Burkart's March 2026 School of Data handout on commercial vacancy and lease-cost indicators.",
      publicNote: "The two-page handout specifies a privacy-preserving RPIE pilot with indicator, coverage and suppression, and methods tables. The document remains outside the repository because its archived copy includes contact information.",
      supportsGenerally: ["Jamie authored the handout", "School of Data sharing context", "privacy-preserving RPIE pilot", "three-part release design", "minimum useful fields", "explicit confidential-data exclusions", "public-interest use cases"],
      doesNotEstablish: ["agency adoption", "a completed data release", "new empirical findings", "access to confidential filings", "policy enactment"],
      protectedLocatorId: "LOC-CRS-FULLER-BASELINE-HANDOUT-2026"
    },
    {
      id: "SRC-JOB-HUNT-CROSS-ARCHIVE-EVIDENCE-MAP-2026-07-03",
      title: "Cross-archive job-hunt evidence map",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-07-03",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of a July 2026 AI-assisted cross-archive job-hunt evidence map.",
      publicNote: "The map is a navigation and synthesis aid, not an independent source for the accomplishments it identifies.",
      supportsGenerally: ["cross-archive source routing", "professional narrative synthesis", "identification of verification gaps", "separation of public claims from private support"],
      doesNotEstablish: ["the truth of underlying accomplishment claims", "independent verification of metrics", "authorship of project outputs", "third-party endorsement", "current project status"],
      protectedLocatorId: "LOC-JOB-HUNT-EVIDENCE-MAP-2026"
    },
    {
      id: "SRC-MAVEN-AI-EVALS-COMPLETION-2026",
      title: "AI Evals for Engineers and PMs completion certificate",
      organization: "Maven",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      accessedAt: "2026-07-14",
      publicCitation: "Public-safe completion certificate for AI Evals for Engineers and PMs, taught by Hamel Husain and Shreya Shankar through Maven in 2026.",
      publicNote: "The certificate records completion. Private coursework, cohort material, and submissions remain outside the repository.",
      supportsGenerally: ["James Burkart completion", "AI Evals for Engineers and PMs course", "Hamel Husain and Shreya Shankar instructor credit", "Maven course context", "2026 completion"],
      doesNotEstablish: ["professional certification authority", "instructor affiliation", "course mastery beyond completion", "client delivery", "permission to publish private coursework"],
      protectedLocatorId: "LOC-MAVEN-AI-EVALS-CERTIFICATE-2026"
    },
    {
      id: "SRC-SOURCE-BACKED-SPRINT-PREP-2026-06-30",
      title: "Source-backed team-memory sprint preparation packet",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-06-30",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of Jamie Burkart's June 2026 source-backed team-memory sprint preparation packet.",
      publicNote: "The packet scopes a bounded discovery and prototype service. Private collaborator context, correspondence, transcript material, and pricing remain outside the repository.",
      supportsGenerally: ["bounded discovery and prototype sprint design", "one approved safe source surface", "human-reviewed memory artifact", "knowledge-friction mapping", "explicit privacy exclusions", "continue, revise, or stop recommendation"],
      doesNotEstablish: ["client acceptance", "paid engagement", "deployment inside an organization", "production software", "measured client outcome"],
      protectedLocatorId: "LOC-SOURCE-BACKED-SPRINT-PREP-2026"
    },
    {
      id: "SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14",
      title: "Google Drive Shared Drives archival review",
      kind: "research-run",
      visibility: "protected",
      preservationStatus: "private",
      capturedAt: "2026-07-14",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of a July 2026 archival review of Jamie Burkart's Google Drive Shared Drives.",
      publicNote: "The review inventoried 110 Shared Drives, mapped 24 professional project roots, and closely read a bounded set of high-value artifacts. Drive names, file IDs, links, collaborator-only material, and excluded personal or sensitive folders remain outside the repository.",
      supportsGenerally: ["110-drive inventory", "24 mapped professional project roots", "project-scoped and collaborator-specific workspace patterns", "dated handoff packages", "bounded source triage", "cross-archive duplicate detection"],
      doesNotEstablish: ["Jamie's authorship of every stored artifact", "collaborator approval for public use", "adoption of every shared workflow", "completeness of every project archive", "professional relevance of every drive", "project outcomes"],
      protectedLocatorId: "LOC-GDRIVE-SHARED-DRIVE-REVIEW-2026"
    },
    {
      id: "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023-07-19",
      title: "196 Artists Residency acceptance and arrival workflow",
      organization: "196 Artists Residency",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2023-07-19",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of a July 2023 residency acceptance and arrival document authored by Jamie Burkart.",
      publicNote: "The underlying document remains outside the repository. The summary omits the resident's name, dates, contact request, address, and access instructions while preserving Jamie's operational contribution.",
      supportsGenerally: ["Jamie authored the acceptance document", "proposal review and resident selection", "pre-arrival video onboarding", "space configuration around the selected project", "independent access planning", "warm direct communication"],
      doesNotEstablish: ["the resident's completed stay or exhibition", "the quality or outcome of the residency", "the total number of residents", "Jamie as sole residency operator", "permission to publish resident identity or logistics", "use of the same workflow for every resident"],
      protectedLocatorId: "LOC-GDRIVE-196-ACCEPTANCE-2023"
    },
    {
      id: "SRC-GDRIVE-VACANCY-ARCHIVE-INVENTORY-2026-03-04",
      title: "HUD-USPS vacancy source archive inventory",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-03-04",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe inventory of Jamie Burkart's March 2026 HUD-USPS vacancy source archive.",
      publicNote: "The archive holds 84 source packages representing 80 distinct quarterly snapshots from December 2005 through December 2025, plus 2010 and 2020 Census geography materials. The inventory preserves a missing March 2019 quarter and a four-quarter 2012 format overlap instead of silently presenting a complete uniform series.",
      supportsGenerally: ["Jamie-attributed archive assembly", "80 distinct quarterly snapshots", "December 2005 through December 2025 span", "2010 and 2020 Census geography materials", "visible March 2019 gap", "visible 2012 source-format overlap", "representative revision attribution to Jamie across 2005, 2019, and 2025 files"],
      doesNotEstablish: ["validation of every source file", "a gap-free quarterly series", "analysis results", "a published dataset", "a production data pipeline", "policy adoption", "original creation of the HUD-USPS source data"],
      protectedLocatorId: "LOC-GDRIVE-VACANCY-ARCHIVE-2026"
    },
    {
      id: "SRC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026-03-04",
      title: "Mixed-format project overview generator",
      author: "Jamie Burkart",
      kind: "project-archive",
      visibility: "protected",
      preservationStatus: "private",
      publishedAt: "2026-03-04",
      accessedAt: "2026-07-14",
      publicCitation: "Protected public-safe summary of Jamie Burkart's mixed-format project overview generator.",
      publicNote: "Revision metadata identifies Jamie as the author of the Bash script. The source remains outside the repository because the tool is designed to inspect private working folders and explicitly warns that its generated overview may expose sensitive data.",
      supportsGenerally: ["Jamie authored the Bash script", "directory inventory", "PDF text extraction with OCR fallback", "DOCX conversion with tracked changes and comments when available", "bounded CSV and JSON sampling", "dependency and generated-file exclusions", "output line controls", "explicit sensitive-output warning"],
      doesNotEstablish: ["safe publication of generated overviews without review", "use across every project", "perfect extraction of every file format", "production deployment", "cross-platform behavior in every environment", "independent security review"],
      protectedLocatorId: "LOC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026"
    },
    ...campaignPressSources,
    ...projectSocialSources
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
      id: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON",
      project: "callnyc",
      internalClaim: "After the fuller CouncilStat dataset was released, Jamie independently built CallNYC as a public-facing interpretation of those constituent-services records.",
      status: "confirmed-with-boundary",
      projections: [
        { key: "case-study", text: "After the fuller CouncilStat dataset was released, Jamie developed CallNYC.org as an independent public-facing interpretation of those constituent-services records.", status: "active", citationRequired: true, surfaces: ["/work/callnyc"] },
        { key: "work-card", text: "Jamie built CallNYC.org as an archived, unofficial, independent civic-data prototype translating CouncilStat constituent-services records into resident-facing issue pathways and next-step guidance.", status: "active", citationRequired: false, surfaces: ["/work", "/work/callnyc"] },
        { key: "resume-html", text: "Jamie built CallNYC.org as an archived, unofficial, independent follow-on to the New York City Council's first CouncilStat hackathon, translating constituent-services data into resident-facing issue pages and next-step guidance; covered in Politico New York.", status: "active", citationRequired: false, surfaces: ["/resume"] }
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
      id: "CLM-CALLNYC-PUBLIC-ISSUE-PATHWAY-CENSUS",
      project: "callnyc",
      internalClaim: "Jamie's CallNYC project used issue-specific public pathways at scale: the recoverable @CallNYCapp corpus contains 71 issue-recognition posts linking 61 distinct CallNYC issue pages to 26 Council-member accounts.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "The recovered social record shows Jamie's CallNYC information architecture operating in public: 71 issue-recognition posts linked 61 distinct resident issue pages to 26 Council-member accounts.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/callnyc"]
      }],
      evidence: [
        { sourceId: callNycFullPopulationCensusSourceId, relationship: "direct-support", supports: ["71 recovered issue-recognition posts", "61 distinct CallNYC issue-page URLs", "26 named Council-member accounts", "complete 110-slot population disposition"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-X-PROFILE-2026-07-14", relationship: "context", supports: ["110-post profile count", "account identity", "constituent-services mission framing"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-CALLNYC-POLITICO-2016-03-14", relationship: "context", supports: ["Jamie's independent creation and iteration of CallNYC"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-CALLNYC-X-JAMIE-MAKER-710150246781882369", relationship: "corroborating", supports: ["Jamie's contemporaneous first-person relationship to CallNYC"], confidence: "moderate", renderCitation: false }
      ],
      boundaries: ["The authenticated review recovered 107 of 110 profile-counted objects; three objects remain unrecovered.", "The counts describe the historical account corpus, not current Council performance or service guidance.", "Naming a Council-member account in a project post is distinct from engagement by that office."],
      antiClaims: ["all 110 post bodies were recovered", "26 Council-member offices endorsed or adopted CallNYC", "the recognitions measure complete office performance", "the posts establish constituent outcomes"],
      researchInquiryIds: ["INQ-CALLNYC-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex full-population social-media review"]
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
      antiClaims: [], researchInquiryIds: [], reviewedAt: "2026-07-11", reviewedBy: ["Jamie Burkart", "Codex archival review"]
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
    {
      id: "CLM-NTER-CHNG-AMERICA-NOW-HERE-2011",
      project: "creative-technology-practice",
      internalClaim: "America: Now and Here's official Kansas City site listed Drew Bolton, Jamie Burkart, and Garrett Fuselier as visual artists and documented NTER CHNG in the 2011 exhibition; the exhibition's main site later described visitors using the installation.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "archive-note",
        text: "America: Now and Here's official sites document NTER CHNG in its 2011 Kansas City exhibition and credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists.",
        status: "active",
        citationRequired: true,
        surfaces: ["docs/knowledge-bank/projects/creative-technology-practice"]
      }],
      evidence: [
        { sourceId: "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011", relationship: "direct-support", supports: ["exhibition inclusion", "three-person visual-artist credit", "installation form and interaction"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011", relationship: "corroborating", supports: ["observed visitor use", "text input and projected output"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NTER-CHNG-PROJECT-SITE-2011", relationship: "context", supports: ["project description", "shared maker credit", "earlier Kansas City presentation"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-NERMAN-AMERICA-NOW-HERE-2011", relationship: "context", supports: ["institutional launch and exhibition context"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "Credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together; the records do not establish solo authorship or a detailed task split.",
        "The official America: Now and Here pages establish exhibition inclusion and observed use; the Nerman Museum page supplies context but does not itself name NTER CHNG.",
        "No attendance, unique-participant, reception, adoption, endorsement, or impact claim is attached.",
        "Do not republish archived phone numbers, participant messages, or media without separate permission and review."
      ],
      antiClaims: ["Jamie solely created NTER CHNG", "The Nerman Museum page names NTER CHNG", "The sources establish a quantified audience or exhibition impact", "Archived access grants rights to participant messages or media"],
      researchInquiryIds: ["INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex Wayback review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE",
      project: "kc-town-hall",
      internalClaim: "The complete @KCTownHall social record documents a shared public operating surface for resident participation, recurring neighborhood service, civic-resource circulation, and direct stakeholder dialogue.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Across all 183 profile-counted records, KC Town Hall's shared public account opened resident survey pathways, coordinated recurring free tire-pickup intake, circulated civic resources, and preserved direct responses from three then-serving Council-member accounts.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }],
      evidence: [
        { sourceId: kcTownHallFullPopulationCensusSourceId, relationship: "direct-support", supports: ["183-of-183 population reconciliation", "resident survey pathways", "recurring tire-pickup operating record", "civic-resource circulation", "three direct Council-member account responses"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KC-TOWN-HALL-X-QUINTON-LUCAS-RESPONSE-1122866432130334720", relationship: "corroborating", supports: ["direct Quinton Lucas quote-response", "neighborhood food-access dialogue"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KC-TOWN-HALL-X-JOLIE-JUSTUS-RESPONSE-1122883010582466560", relationship: "corroborating", supports: ["direct Jolie Justus reply", "neighborhood food-access and economic-development dialogue"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KC-TOWN-HALL-X-MELISSA-ROBINSON-RESPONSE-1289714535251742726", relationship: "corroborating", supports: ["direct Melissa Robinson reply", "recognition of neighborhood work"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KC-STAR-LUCAS-JUSTUS-COUNCIL-2019-04-03", relationship: "context", supports: ["Quinton Lucas and Jolie Justus were Council members in April 2019"], confidence: "high", renderCitation: false },
        { sourceId: "SRC-KCMO-CLERK-MELISSA-ROBINSON-SERVICE", relationship: "context", supports: ["Melissa Robinson's Council service began before the August 2020 response"], confidence: "high", renderCitation: false }
      ],
      boundaries: ["The shared account does not identify the human author of each status.", "Do not attribute post-transition program activity or outcomes to Jamie.", "The 100 tire-related and 12 survey-linked records classify the corpus; they are not participant, pickup, or outcome totals.", "A direct Council-account response does not establish formal endorsement, partnership, adoption, or policy causality.", "Access-time interaction labels are mutable and are not reach or impact."],
      antiClaims: ["Jamie authored all 183 records", "Jamie operated every later program", "three Council members formally endorsed KC Town Hall", "the account proves project completion", "access-time interaction totals measure reach or impact"],
      researchInquiryIds: ["INQ-KC-TOWN-HALL-X-FULL-POPULATION-2026"],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex full-population social-media review"]
    },
    {
      id: "CLM-KC-TOWN-HALL-FUNDING-SEQUENCE",
      project: "kc-town-hall",
      internalClaim: "KC Town Hall advanced from a CCED Board recommendation to Council acceptance and appropriation of $490,539 in 2019; a 2024 Council record later said the project withdrew and the unused funds were reappropriated.",
      status: "confirmed-with-boundary",
      projections: [{
        key: "case-study",
        text: "Official records show that the CCED Board recommended $490,539 for KC Town Hall and the City Council accepted and appropriated that amount in 2019; a 2024 ordinance later recorded that KC Town Hall withdrew and the unused funds were reappropriated.",
        status: "active",
        citationRequired: true,
        surfaces: ["/work/kc-town-hall"]
      }],
      evidence: [
        { sourceId: "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26", relationship: "direct-support", supports: ["CCED Board recommendation", "Council acceptance", "$490,539 amount", "authorization to negotiate a funding agreement"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26", relationship: "direct-support", supports: ["Council appropriation", "$490,539 project-account amount"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28", relationship: "supports-boundary", supports: ["later project withdrawal", "unused allocation", "2024 reappropriation"], confidence: "high", renderCitation: true }
      ],
      boundaries: ["Appropriation is not evidence of an executed funding agreement, receipt, disbursement, expenditure, construction, or completion.", "The official records do not establish Jamie's individual causality for the recommendation or Council action.", "The 2024 record does not explain why KC Town Hall withdrew and must not be connected to Jamie's family crisis or stewardship-transition account."],
      antiClaims: ["KC Town Hall received a $490,539 grant", "KC Town Hall spent the allocation", "the project completed the redevelopment", "Jamie alone secured the Council action", "the Council record proves the reason for withdrawal"],
      researchInquiryIds: [],
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-record review"]
    }
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
      id: "INQ-CALLNYC-X-FULL-POPULATION-2026",
      project: "callnyc",
      question: "What does a full-population archival review of every object counted by the @CallNYCapp profile establish about the product's public use, source trail, and stakeholder engagement?",
      methods: ["Crawled the authenticated Posts timeline to exhaustion and deduplicated status URLs.", "Crawled the authenticated Replies timeline and recovered one additional CallNYC reply.", "Ran an authenticated chronological search bounded to March through November 2016 and reconciled it against the profile corpus.", "Queried the Internet Archive CDX index for preserved CallNYC status URLs.", "Assigned all 110 profile-counted slots a recovered or not-recovered disposition and classified every recovered object by relationship, URL, issue family, stakeholder group, and access-time interaction labels."],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: ["The profile displayed 110 posts; 107 unique timeline objects were recovered and three profile-counted objects were not recovered.", "The recovered set contains 86 CallNYC posts, six CallNYC replies, and 15 reposted external statuses.", "Seventy-one recovered issue-recognition posts link to 61 distinct CallNYC issue pages and name 26 Council-member accounts.", "A separate authenticated mention and conversation review recovered public interactions from at least eight then-serving Council-member accounts.", "The account posted or carried mission-relevant links to Politico coverage, the Council Labs and BetaNYC civic-technology ecosystem, a 311 data project, city anti-eviction and rent-freeze resources, a Council digital-roadmap video, and adjacent civic reporting."],
      limitations: ["Three profile-counted objects remain unavailable after authenticated Posts, Replies, chronological search, and Internet Archive status-URL checks.", "The census is not a platform account-data export and cannot recover deleted, restricted, deindexed, or otherwise unavailable content.", "Access-time likes, reposts, and replies are mutable and do not expose complete historical actor identity.", "A named Council account in a project post is not the same as engagement by that office; interaction claims use separately inspected member-authored statuses.", "The account corpus does not identify a different human author for every post, although a contemporaneous first-person reply identifies Jamie's relationship to the project."],
      sourceIds: ["SRC-CALLNYC-X-PROFILE-2026-07-14", callNycFullPopulationCensusSourceId, ...callNycProjectSocialSourceIds, ...callNycCouncilSocialSourceIds],
      publicSummary: "A 110-slot full-population census recovered 107 timeline objects. The recovered record includes 71 issue-recognition posts linking 61 distinct CallNYC issue pages to 26 Council-member accounts, while preserving a three-item recovery remainder and separating account mentions from verified office-account interactions."
    },
    {
      id: "INQ-KC-TOWN-HALL-X-FULL-POPULATION-2026",
      project: "kc-town-hall",
      question: "What does a full-population archival review of every object counted by the @KCTownHall profile establish about the project's public operating surface, source trail, and stakeholder response?",
      methods: ["Crawled the authenticated Posts timeline to exhaustion and deduplicated status URLs.", "Crawled the authenticated Replies timeline to exhaustion and separated five other-account parent or conversation-context cards from the primary project population.", "Reconciled the Posts and Replies union to all 183 objects displayed by the profile.", "Classified every primary object as a project post, project reply, or reposted external status and inventoried its public URLs, mentions, hashtags, bounded mission classifications, and access-time interaction labels.", "Ran bounded authenticated searches for direct replies, quote-responses, domain references, and project-name references, excluding unrelated broad-name matches.", "Inspected three Council-member account responses in the authenticated live interface and checked contemporaneous or official service-date evidence."],
      runAt: "2026-07-15",
      resultStatus: "recovered",
      findings: ["All 183 profile-counted objects were recovered: 142 project-account posts, 13 project-account replies, and 28 reposted external statuses.", "One hundred records are tire-related under a transparent text-and-hashtag classification; 12 records link to a survey pathway.", "The complete corpus contains 133 external-link occurrences representing 31 distinct short URLs and includes neighborhood food access, housing, voting, transit, public health, pandemic relief, cleanup, and project-operation sources.", "Three direct responses came from then-serving Council member accounts: Quinton Lucas, Jolie Justus, and Melissa Robinson.", "Other mission-relevant responses include a Bridging the Gap collaborator report, two community amplifications, and a city-service response.", "At access time, the 155 project-account-authored records displayed 22 replies, 70 reposts, 174 likes, and one bookmark; these mutable labels are retained only as an archival baseline."],
      limitations: ["The census is not a platform account-data export and cannot establish that no deleted, restricted, deindexed, or otherwise unavailable record ever existed.", "The shared account does not identify the human author of each record.", "The social corpus does not independently verify first-party program quantities or assign post-transition outcomes to Jamie.", "A direct Council-account response is not formal endorsement, partnership, adoption, or policy causality.", "Access-time interaction labels are mutable, do not identify a complete historical audience, and are not reach, conversion, participation, or impact."],
      sourceIds: ["SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14", kcTownHallFullPopulationCensusSourceId, ...kcTownHallCouncilResponseSourceIds, "SRC-KC-STAR-LUCAS-JUSTUS-COUNCIL-2019-04-03", "SRC-KCMO-CLERK-MELISSA-ROBINSON-SERVICE", "SRC-KC-TOWN-HALL-KC-STAR-LEONS-THRIFTWAY", "SRC-KC-TOWN-HALL-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "SRC-KC-TOWN-HALL-CURBED-RENTER-TAX-CREDIT-2018", "SRC-KC-TOWN-HALL-RIDEKC-NEXT-SYSTEM-REDESIGN", "SRC-KC-TOWN-HALL-KCUR-MISSOURI-PRIMARY-CHEAT-SHEET-2018", "SRC-KC-TOWN-HALL-MISSOURI-VOTER-OUTREACH", "SRC-KC-TOWN-HALL-YOUTUBE-COVID-RELIEF-QA-2020", "SRC-KC-TOWN-HALL-YOUTUBE-PAINT-CLEANUP-2018"],
      publicSummary: "A full-population review recovered all 183 profile-counted @KCTownHall records. The account functioned as a public operating surface for resident input, recurring neighborhood service, civic-resource circulation, and stakeholder dialogue, including three direct responses from then-serving Council member accounts."
    },
    {
      id: "INQ-NTER-CHNG-ORIGINAL-ASSET-ROLE-RECOVERY",
      project: "creative-technology-practice",
      question: "What original code, diagrams, cleared installation media, collaborator accounts, and press materials would clarify the NTER CHNG division of labor and support a future visual projection?",
      methods: [
        "Recovered and closely read the archived project site, America: Now and Here's official Kansas City artist page, the exhibition's first-party visitor-use article, and the current Nerman Museum exhibition-context page.",
        "Queried the Internet Archive CDX index for NTER CHNG captures and the project site's linked press-release PDF.",
        "Separated direct exhibition and collaborator evidence from institutional context and rights-sensitive participant material."
      ],
      runAt: "2026-07-15",
      resultStatus: "partially-recovered",
      findings: [
        "Official archived exhibition pages establish NTER CHNG's inclusion, shared visual-artist credit, installation form, and observed visitor use.",
        "The archived project site preserves shared maker credit and the earlier Arts Incubator / Cocoon Gallery presentation.",
        "The Nerman Museum page supplies Kansas City launch context but does not name NTER CHNG."
      ],
      limitations: [
        "The linked project-site press-release PDF was not recovered in the exact-URL or site-wide CDX review; this is not evidence that it never existed.",
        "Current public records do not decompose individual responsibilities or grant media and participant-text republication rights.",
        "Observed visitor use does not establish attendance, unique participants, reception, adoption, endorsement, or impact."
      ],
      sourceIds: ["SRC-NTER-CHNG-PROJECT-SITE-2011", "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011", "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011", "SRC-NERMAN-AMERICA-NOW-HERE-2011"],
      publicSummary: "America: Now and Here's archived official pages establish NTER CHNG's 2011 Kansas City exhibition inclusion, shared Drew Bolton / Jamie Burkart / Garrett Fuselier visual-artist credit, and observed visitor use; the Nerman Museum page supplies context rather than project-specific proof."
    }
  ],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" },
    { id: "COR-KC-TOWN-HALL-FUNDING-SEQUENCE-2026", claimId: "CLM-KC-TOWN-HALL-FUNDING-SEQUENCE", previousText: "$490,539 public funding recommendation", replacementText: "CCED Board recommendation followed by Council acceptance and appropriation of $490,539, with the later unused-funds reappropriation attached", reason: "Official 2019 and 2024 records show that recommendation-only wording materially understates the Council action while any receipt, spending, or completion claim would overstate it.", decidedAt: "2026-07-15", affectedSurfaces: ["/work", "/work/kc-town-hall", "knowledge-bank"], status: "active" }
  ],
  intakeItems: [
    {
      id: "INTAKE-WATERWAYS-PARTICIPATORY-PRACTICE-2026-07-12",
      title: "Waterways, communal space, and participatory cultural practice",
      project: "waterways-participatory-practice",
      kind: "claim-candidate",
      summary: "Jamie surfaced a long arc of participatory work spanning Shop Shows, Open House, a recycled-material river expedition, and Great Accommodations. The sources suggest a durable practice of turning homes, galleries, and waterways into shared structures for participation, communal authorship, and civic imagination.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-WATERWAYS-PITCH-HUCK-FINN-2007",
        "SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009",
        "SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"
      ],
      relatedClaimIds: [],
      relatedProofIds: [],
      candidateClaims: [
        "From 2003 to 2005, Jamie and his housemates held collectively produced Shop Shows in their Santa Cruz home, inviting participants to contribute art, performance, food, and unfinished work.",
        "In 2006, Jamie turned Porter Bridge Gallery into Open House, a ten-day experiment in communal living and participatory art whose responsibility and decision-making he explicitly described as communal.",
        "Jamie conceived an experiential river expedition; a group of Kansas City and California participants traveled across Missouri on a homemade raft built from recycled materials.",
        "In 2009, Jamie spearheaded Great Accommodations and worked with Suzanne Hogan on outreach that invited river communities to contribute stories and perspectives to an interactive exhibition and its public programs."
      ],
      propositions: [
        {
          id: "PROP-WATERWAYS-SHOP-SHOWS-2003-2005",
          text: "From 2003 to 2005, Jamie and his housemates held collectively produced Shop Shows in their Santa Cruz home, inviting participants to contribute art, performance, food, and unfinished work.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"],
          sourceSupport: ["2003-2005 dates", "Jamie and housemates", "open art show", "potluck", "participant performance and workshopping"],
          boundaries: ["Keep the housemates visible as co-producers.", "Do not infer a complete event count, participant count, or program archive."],
          decisionUse: "Supports a future claim about Jamie's early practice of building low-barrier participation structures in domestic cultural space."
        },
        {
          id: "PROP-WATERWAYS-OPEN-HOUSE-2006",
          text: "In 2006, Jamie turned Porter Bridge Gallery into Open House, a ten-day experiment in communal living and participatory art whose responsibility and decision-making he explicitly described as communal.",
          status: "direct-support",
          sourceIds: ["SRC-PARTICIPATION-GOOD-TIMES-OPEN-HOUSE-2006"],
          sourceSupport: ["2006 publication and project context", "ten-day experiment", "communal living", "participatory art", "Jamie's explicit non-leader and communal-decision framing"],
          boundaries: ["Do not describe Open House as a permanent housing program.", "Do not publish sensitive participant circumstances or identities as professional proof."],
          decisionUse: "Supports a concrete facilitation and participatory-program claim while preserving the project's communal governance."
        },
        {
          id: "PROP-WATERWAYS-RAFT-CONCEPTION-2007",
          text: "Jamie conceived an experiential river expedition; a group of Kansas City and California participants traveled across Missouri on a homemade raft built from recycled materials.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WATERWAYS-PITCH-HUCK-FINN-2007"],
          sourceSupport: ["Jamie originated the idea", "experiential expedition", "Kansas City and California participants", "cross-Missouri travel", "homemade recycled-material raft"],
          boundaries: ["Separate Jamie's conception from the group's collective travel and construction.", "This source does not establish completion to the Gulf, the exact endpoint, or a complete collaborator roster."],
          decisionUse: "Supports a bounded claim about project conception and collective expedition design without overstating route completion."
        },
        {
          id: "PROP-WATERWAYS-GREAT-ACCOMMODATIONS-2009",
          text: "In 2009, Jamie spearheaded Great Accommodations and worked with Suzanne Hogan on outreach that invited river communities to contribute stories and perspectives to an interactive exhibition and its public programs.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WATERWAYS-CHARLOTTE-STREET-GREAT-ACCOMMODATIONS-2009"],
          sourceSupport: ["2009 exhibition", "Jamie spearheaded the project", "Suzanne Hogan collaboration", "river-community outreach", "contributed stories and perspectives", "interactive exhibition", "public programs"],
          boundaries: ["Credit Suzanne Hogan for the documented outreach collaboration.", "Do not treat Jamie's retrospective raft account on the page as independent verification of every route detail."],
          decisionUse: "Supports claims about public-engagement program design, collaborative outreach, facilitation, and interactive cultural production."
        }
      ],
      tensions: [],
      researchQuestions: [
        "What route, dates, duration, collaborators, public programs, and stopping points can be independently established for the raft expedition?",
        "Which additional institutional records, photographs, project sites, press accounts, and collaborator memories survive?",
        "How should this early participatory practice connect to Jamie's later hosting, facilitation, civic systems, and public-engagement work without flattening its artistic character?"
      ],
      boundaries: [
        "Do not publish the Gulf-of-Mexico completion claim until route and endpoint evidence is reconciled.",
        "Credit Suzanne Hogan and other collaborators where the sources identify collective work.",
        "Do not convert communal authorship into sole-leadership language.",
        "Do not project this intake item directly to the website; create and approve a governed claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "INTAKE-SUNDAY-DINNER-COMMUNITY-HOSTING-2026-07-13",
      title: "Sunday Dinner as recurring open community infrastructure",
      project: "196-sunday-dinner",
      kind: "claim-candidate",
      summary: "A 2017 Greene Hill Food Co-op interview publicly documents Jamie and Julia as hosting an open Sunday dinner every week in their Brooklyn apartment. The current Sunday Dinner site preserves participation and media pathways, but neither source establishes the governed proof's aggregate counts or current cadence.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
        "SRC-SUNDAY-DINNER-NYC-HOMEPAGE-2026"
      ],
      relatedClaimIds: [],
      relatedProofIds: ["sunday-dinner-196-participation-infrastructure"],
      candidateClaims: [
        "By December 2017, Jamie and Julia were publicly documented as hosting an open Sunday dinner every week in their Brooklyn apartment."
      ],
      propositions: [
        {
          id: "PROP-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017",
          text: "By December 2017, Jamie and Julia were publicly documented as hosting an open Sunday dinner every week in their Brooklyn apartment.",
          status: "direct-support",
          sourceIds: ["SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19"],
          sourceSupport: ["Jamie and Julia named together", "Sunday-night dinner", "weekly cadence in 2017", "Brooklyn apartment", "open community invitation"],
          boundaries: ["The article title says Julie while its body says Julia; do not silently treat the source as resolving that inconsistency.", "Historical weekly cadence in 2017 does not establish current frequency.", "Do not infer aggregate event or resident-artist counts."],
          decisionUse: "Adds contemporaneous public corroboration for Jamie's role as a recurring host and for Sunday Dinner's low-barrier community form."
        },
        {
          id: "PROP-SUNDAY-DINNER-CURRENT-PUBLIC-SURFACE-2026",
          text: "In July 2026, the Sunday Dinner project site retained public pathways for attending and contributing media alongside recipes, videos, drawings, and WOWList context.",
          status: "context-only",
          sourceIds: ["SRC-SUNDAY-DINNER-NYC-HOMEPAGE-2026"],
          sourceSupport: ["current public project surface", "attend pathway", "media-submission pathway", "recipes", "videos", "drawings", "WOWList link"],
          boundaries: ["The site does not name the current host or cadence.", "Do not republish participant names or media without rights and consent review."],
          decisionUse: "Preserves the project's current public artifact ecology without treating a sparse homepage as proof of scale or continuity.",
          nextStep: "Recover dated public project records, approved aggregate histories, and collaborator accounts before associating the current site with duration, event counts, or resident-artist counts."
        }
      ],
      tensions: [
        {
          id: "TENSION-SUNDAY-DINNER-PUBLIC-CORROBORATION-AND-SCALE",
          propositionIds: ["PROP-SUNDAY-DINNER-WEEKLY-OPEN-HOSTING-2017", "PROP-SUNDAY-DINNER-CURRENT-PUBLIC-SURFACE-2026"],
          relatedProofIds: ["sunday-dinner-196-participation-infrastructure"],
          description: "The governed proof combines Jamie's hosting role with 300+ gatherings, 20+ resident artists, and repeatable operating systems; the new public sources independently corroborate recurring open hosting in 2017 and a public project surface in 2026, but not those aggregate metrics or every system named.",
          currentPosition: "Keep the approved aggregate proof careful. Treat the 2017 interview as strong independent corroboration for Jamie's hosting role and the form of the gathering, not as a substitute for the sources behind scale or operating-system claims.",
          status: "open",
          correctionTriggers: [
            {
              id: "TRIGGER-SUNDAY-DINNER-SCALE-CONFIRM",
              targetProofId: "sunday-dinner-196-participation-infrastructure",
              condition: "Public-safe dated records and at least one corroborating organizer or participant account establish the 300+ gathering and 20+ resident-artist aggregates and associate Jamie with the named continuity systems.",
              action: "confirm",
              requiredEvidence: ["dated public-safe aggregate record", "metric method and time window", "corroborating organizer or participant account", "role-to-system mapping"],
              reason: "The governed proof would then have traceable support for both Jamie's hosting role and its stated scale and infrastructure."
            },
            {
              id: "TRIGGER-SUNDAY-DINNER-SCALE-NARROW",
              targetProofId: "sunday-dinner-196-participation-infrastructure",
              condition: "A completed public-safe count or collaborator review supports recurring hosting but materially narrows either aggregate metric or Jamie's association with a named operating system.",
              action: "narrow",
              requiredEvidence: ["documented count method", "specific conflicting or narrowing evidence", "review with Jamie and relevant collaborators"],
              reason: "The public proof should preserve the recurring community-hosting accomplishment without carrying a metric or system attribution the record cannot sustain.",
              replacementGuidance: "Retain Jamie's hosting and the source-supported recurring community form; replace unsupported metrics or system labels with the narrower verified result."
            }
          ]
        }
      ],
      researchQuestions: [
        "Which dated invitations, calendars, menus, newsletters, or public posts establish Sunday Dinner's chronology and cadence without exposing guest records or addresses?",
        "What public-safe method and time window produced the 300+ gathering and 20+ resident-artist aggregates?",
        "Which collaborators can describe Jamie's hosting, onboarding, facilitation, documentation, and continuity work while retaining collective credit?",
        "Which current project artifacts can be described or displayed with explicit rights and participant consent?"
      ],
      boundaries: [
        "Keep guest lists, addresses, private messages, raw attendance records, and unapproved media outside the public repository.",
        "Do not use the 2017 interview to establish the 300+ gathering or 20+ resident-artist metrics.",
        "Treat the weekly cadence as historical to December 2017, not automatically current.",
        "Do not project this intake item directly to the website; strengthen or create a governed claim and make a separate editorial decision first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-13",
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "INTAKE-NYCA-CULTURAL-SPACE-POLICY-2026-07-12",
      title: "NYC Artist Coalition formation and cultural-space policy campaigns",
      project: "nyc-artist-coalition",
      kind: "memory-fragment",
      summary: "Jamie identifies an instrumental role in creating NYC Artist Coalition and contributing to linked campaigns around Cabaret Law repeal, Office of Nightlife creation and accountability, large public town halls, Talks Not Raids, MARCH raid transparency and disbandment, nightlife enforcement reporting, and protection of small diverse cultural spaces.",
      status: "researching",
      sourceIds: [
        "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
        "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20",
        "SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19",
        "SRC-NYCA-LET-NYC-DANCE-2017-08-01",
        "SRC-NYCA-BEDFORD-BOWERY-OFFICE-NIGHTLIFE-2017-08-24",
        "SRC-NYCA-NIGHTLIFE-TOWN-HALL-2017-10-13",
        "SRC-NYCA-CREATENYC-RECOMMENDATIONS-2017",
        "SRC-NYCA-SAFETY-RESOURCES-2017-02-09",
        "SRC-NYCA-TALKS-NOT-RAIDS-MARCH-2019-02-12",
        "SRC-NYC-COUNCIL-INT-1652-2017",
        "SRC-NYC-COUNCIL-INT-1156-2018"
      ],
      relatedClaimIds: [],
      relatedProofIds: [
        "nyc-artist-coalition-public-web-infrastructure",
        "nyc-artist-coalition-civic-systems"
      ],
      candidateClaims: [
        "In 2017, Jamie organized fire-code study groups for DIY venues and rallied at City Hall for full repeal of New York City's Cabaret Law.",
        "Speaking publicly as a member of NYC Artist Coalition, Jamie argued that Cabaret Law licensing barriers discouraged otherwise code-compliant spaces from approaching the Fire Department, creating a safety crisis.",
        "In a December 2017 Greene Hill Food Co-op interview, Jamie and Julia were described as working as part of NYC Artist Coalition; Jamie connected Cabaret Law enforcement to barriers faced by community cultural spaces."
      ],
      propositions: [
        {
          id: "PROP-NYCA-FIRE-CODE-STUDY-GROUPS-2017",
          text: "In 2017, Jamie organized fire-code study groups for DIY venues and rallied at City Hall for full repeal of New York City's Cabaret Law.",
          status: "direct-support",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Jamie organized fire-code study groups", "DIY venue context", "Jamie rallied at City Hall", "full-repeal position"],
          boundaries: ["Do not convert documented advocacy into sole causality for repeal.", "Do not infer the complete study-group curriculum, attendance, or duration from this article."],
          decisionUse: "Supports a concrete public-safety organizing and policy-advocacy claim."
        },
        {
          id: "PROP-NYCA-CABARET-SAFETY-ANALYSIS-2017",
          text: "Speaking publicly as a member of NYC Artist Coalition, Jamie argued that Cabaret Law licensing barriers discouraged otherwise code-compliant spaces from approaching the Fire Department, creating a safety crisis.",
          status: "direct-support",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Jamie's NYC Artist Coalition affiliation", "Jamie's public analysis", "licensing barrier", "Fire Department access", "safety-crisis framing"],
          boundaries: ["Attribute the analysis to Jamie rather than presenting it as an adjudicated legal finding.", "Do not imply that this statement alone caused legislation or agency change."],
          decisionUse: "Supports a claim about translating venue experience and regulation into a clear public-safety argument."
        },
        {
          id: "PROP-NYCA-OFFICE-OF-NIGHTLIFE-CONTEXT-2017",
          text: "The June 2017 policy context included Council Member Rafael Espinal's proposal for an Office of Nightlife intended to bridge venues, communities, and city government.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19"],
          sourceSupport: ["Rafael Espinal introduced the proposal", "bridge role described in the article", "contemporaneous policy context"],
          boundaries: ["The article does not establish Jamie's role in creating the office.", "Do not use this context proposition as proof of coalition or individual causality."],
          decisionUse: "Preserves the institutional context while withholding a Jamie-specific claim.",
          nextStep: "Review Council legislation, hearing records, campaign materials, town-hall records, and collaborator accounts for Jamie's documented contribution."
        },
        {
          id: "PROP-NYCA-GREENE-HILL-PUBLIC-ROLE-2017",
          text: "In a December 2017 Greene Hill Food Co-op interview, Jamie and Julia were described as working as part of NYC Artist Coalition; Jamie connected Cabaret Law enforcement to barriers faced by community cultural spaces.",
          status: "direct-support",
          sourceIds: ["SRC-GREENE-HILL-COOP-QA-BURKART-FREDENBERG-2017-12-19"],
          sourceSupport: ["Jamie and Julia described as working as part of NYC Artist Coalition", "Jamie's attributed Cabaret Law analysis", "community cultural-space context", "contemporaneous 2017 publication"],
          boundaries: ["The title says Julie while the article body says Julia; preserve the discrepancy.", "The interview supports coalition affiliation and public analysis, not formation title, campaign authorship, or policy causality."],
          decisionUse: "Corroborates Jamie's public coalition role and his ability to translate regulation into the lived operating conditions of community cultural spaces."
        },
        {
          id: "PROP-NYCA-LET-NYC-DANCE-PUBLIC-SURFACE-2017",
          text: "By August 2017, NYC Artist Coalition maintained a Let NYC Dance campaign surface with a Council call to action, letter, maps, and source guidance supporting Cabaret Law repeal.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-LET-NYC-DANCE-2017-08-01"],
          sourceSupport: ["August 2017 date", "campaign call to action", "Council letter", "maps", "source list", "Intro 1652 context"],
          boundaries: ["The project page does not identify Jamie as author or implementer.", "Treat campaign assertions as advocacy unless independently corroborated."],
          decisionUse: "Establishes the concrete public campaign artifact that future repository, CMS, or collaborator evidence may associate with Jamie's documented web work.",
          nextStep: "Inspect the public repository, deployment history, CMS exports, and collaborator accounts for page authorship, implementation, and stewardship."
        },
        {
          id: "PROP-NYCA-OFFICE-OF-NIGHTLIFE-ADVOCACY-AND-PASSAGE-2017",
          text: "Independent reporting in August 2017 identified NYC Artist Coalition among groups advocating for Cabaret Law repeal and an Office of Nightlife as the office bill passed the City Council.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-BEDFORD-BOWERY-OFFICE-NIGHTLIFE-2017-08-24"],
          sourceSupport: ["independent reporting", "NYC Artist Coalition advocacy", "Cabaret Law and Office of Nightlife relationship", "Council passage chronology"],
          boundaries: ["The article does not identify Jamie's individual action.", "Coalition advocacy and institutional passage are not evidence of sole or direct causality."],
          decisionUse: "Corroborates the coalition's place in the public advocacy ecology while leaving Jamie's individual mechanism open for research.",
          nextStep: "Recover hearing testimony, event production records, early coalition communications, and collaborator accounts that associate Jamie with a specific contribution."
        },
        {
          id: "PROP-NYCA-NIGHTLIFE-TOWN-HALL-PUBLIC-RECORD-2017",
          text: "NYC Artist Coalition's public record documents an October 11, 2017 Office of Nightlife town hall at Market Hotel, hosted by Anya Sapozhnikova, with named cultural workers, advocates, and city officials.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-NIGHTLIFE-TOWN-HALL-2017-10-13"],
          sourceSupport: ["event date", "Market Hotel", "Office of Nightlife focus", "Anya Sapozhnikova host credit", "named speakers and officials", "public policy asks"],
          boundaries: ["The page does not name Jamie as host, producer, or author.", "Do not infer attendance, event scale, or policy effect."],
          decisionUse: "Creates an event-specific research anchor and prevents Jamie's remembered production role from displacing the page's explicit host credit.",
          nextStep: "Recover the event program, production correspondence, photographs, recordings, vendor or venue records, and accounts from Anya Sapozhnikova and other participants."
        },
        {
          id: "PROP-NYCA-CREATENYC-COLLECTIVE-RECOMMENDATIONS-2017",
          text: "NYC Artist Coalition published a record of a March 30 CreateNYC town hall and recommendations it described as collectively developed for New York City's cultural plan.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-CREATENYC-RECOMMENDATIONS-2017"],
          sourceSupport: ["March 30 town hall", "Market Hotel", "collective-development language", "full recommendation artifact", "recommendation topics"],
          boundaries: ["No publication year is visible on the recovered page.", "The page does not establish Jamie's authorship, production role, or the city's adoption of any recommendation."],
          decisionUse: "Preserves a policy-communication artifact and collective authorship that can be mapped to individual implementation records later.",
          nextStep: "Recover page metadata, event records, drafting history, and collaborator accounts to establish date, contributors, and Jamie's role."
        },
        {
          id: "PROP-NYCA-SAFETY-RESOURCE-SURFACE-2017",
          text: "In February 2017, NYC Artist Coalition published venue-safety resources connected to a fire-safety course taught by Tara Mc Manus and to fire-guard and emergency-planning guidance.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-SAFETY-RESOURCES-2017-02-09"],
          sourceSupport: ["February 2017 date", "venue-safety resource surface", "Tara Mc Manus teaching credit", "fire-guard guidance", "emergency-planning resources"],
          boundaries: ["The page credits Tara Mc Manus for the course and does not identify Jamie as teacher, author, or organizer.", "Do not merge this source with Gothamist's separate evidence that Jamie organized fire-code study groups."],
          decisionUse: "Establishes the coalition's concrete public-safety resource context while preserving Tara Mc Manus's named contribution.",
          nextStep: "Recover study-group invitations, curricula, facilitator records, and participant accounts to map the relationship between Jamie's documented study groups and the coalition resource page."
        },
        {
          id: "PROP-NYCA-TALKS-NOT-RAIDS-PUBLIC-CAMPAIGN-2019",
          text: "In February 2019, NYC Artist Coalition's Talks Not Raids page documented a multi-organization campaign for MARCH transparency, advance notice, and Intro 1156.",
          status: "context-only",
          sourceIds: ["SRC-NYCA-TALKS-NOT-RAIDS-MARCH-2019-02-12"],
          sourceSupport: ["February 2019 date", "Talks Not Raids public campaign", "multi-organization coalition", "MARCH transparency and notice asks", "Intro 1156", "Council sign-ons", "press materials"],
          boundaries: ["The page does not identify Jamie's individual contribution.", "The campaign artifact does not establish that MARCH was ended or disbanded.", "Do not treat campaign statistics as independently verified by the campaign page itself."],
          decisionUse: "Establishes the campaign, its public apparatus, and its legislative target without promoting Jamie's memory of contribution or outcome into fact.",
          nextStep: "Recover campaign repository history, authorship records, meeting notes summarized outside the public repo, collaborator accounts, and later agency records about MARCH's operational status."
        },
        {
          id: "PROP-NYCA-CABARET-REPEAL-INSTITUTIONAL-OUTCOME-2017",
          text: "New York City enacted Int 1652-2017 as Local Law 214 on November 27, 2017, repealing the Cabaret Law license requirement while retaining specified security measures.",
          status: "context-only",
          sourceIds: ["SRC-NYC-COUNCIL-INT-1652-2017"],
          sourceSupport: ["official bill identity", "Council chronology", "enactment date", "law number", "scope of repeal", "retained security measures"],
          boundaries: ["The legislative record does not establish Jamie's or NYC Artist Coalition's role.", "Repeal of the license requirement is not elimination of every nightlife rule or enforcement mechanism."],
          decisionUse: "Pins the campaign's institutional outcome to an exact government record while separating outcome from advocacy causality.",
          nextStep: "Map testimony, sponsor statements, committee reports, and campaign records to specific advocates and mechanisms of influence."
        },
        {
          id: "PROP-NYCA-MARCH-REPORTING-INSTITUTIONAL-OUTCOME-2019",
          text: "New York City enacted Int 1156-2018 as Local Law 220 on December 15, 2019, adding reporting, advance-notice, response, machine-readable publication, and privacy requirements for MARCH operations.",
          status: "context-only",
          sourceIds: ["SRC-NYC-COUNCIL-INT-1156-2018"],
          sourceSupport: ["official bill identity", "Council chronology", "enactment date", "law number", "MARCH reporting", "advance-notice and response requirements", "machine-readable publication", "privacy requirements"],
          boundaries: ["The legislative record does not establish Jamie's or NYC Artist Coalition's role.", "The law regulated and documented MARCH operations; it does not establish that the program was disbanded."],
          decisionUse: "Establishes a concrete institutional result adjacent to Talks Not Raids while preventing the result from being compressed into an unsupported end-of-MARCH claim.",
          nextStep: "Review committee testimony, sponsor statements, agency reports, implementation records, and later operational directives for campaign contribution and MARCH status."
        },
        {
          id: "PROP-NYCA-COALITION-FORMATION-MEMORY",
          text: "Jamie remembers playing an instrumental role in creating NYC Artist Coalition and its operating infrastructure.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["This is Jamie's recollection, not a source-established formation claim.", "Formation credit requires collaborator and contemporaneous-record review."],
          decisionUse: "Preserves a potentially central professional claim for focused formation research.",
          nextStep: "Locate formation messages, early websites, meeting records, first public statements, and accounts from founding collaborators."
        },
        {
          id: "PROP-NYCA-TOWN-HALLS-AND-CAMPAIGN-SYSTEMS-MEMORY",
          text: "Jamie remembers producing large town halls and building campaign websites, policy communications, and coordination systems for NYC Artist Coalition work.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["No scale, event count, audience count, or comprehensive output list is yet established here.", "Preserve co-producer, convener, host, and institutional credit when records are recovered."],
          decisionUse: "Preserves a high-value implementation and public-engagement thread for event-by-event research.",
          nextStep: "Recover event listings, agendas, programs, recordings, press, campaign repositories, and collaborator accounts; map Jamie's action and each event's outcome."
        },
        {
          id: "PROP-NYCA-TALKS-NOT-RAIDS-MARCH-MEMORY",
          text: "Jamie remembers contributing to Talks Not Raids work that sought MARCH raid transparency and ultimately helped end the raid program.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["The public campaign page and enacted reporting law establish campaign and legislative context, not Jamie's mechanism of contribution or an institutional decision to end MARCH.", "Do not claim sole or direct causality without role-specific records and collective context."],
          decisionUse: "Preserves an important public-accountability and enforcement-reform thread for targeted research.",
          nextStep: "Recover MARCH disbandment or operational-status records, agency implementation reports, campaign repository history, press, and collaborator accounts that identify Jamie's mechanism of contribution."
        },
        {
          id: "PROP-NYCA-POLICY-OUTCOMES-MEMORY",
          text: "Jamie remembers contributing materially to collective campaigns around Cabaret Law repeal, Office of Nightlife creation and accountability, nightlife-enforcement transparency, and MARCH disbandment.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Treat each policy outcome as a separate causal question.", "Government decisions and collective advocacy outcomes require institutional and collaborator evidence."],
          decisionUse: "Preserves the broader outcome hypothesis without allowing it to function as a current claim.",
          nextStep: "Build a dated campaign-by-campaign source map connecting Jamie's documented actions, collective advocacy, legislation or agency decisions, and public outcomes."
        }
      ],
      tensions: [
        {
          id: "TENSION-NYCA-COFOUNDER-EVIDENCE",
          propositionIds: ["PROP-NYCA-COALITION-FORMATION-MEMORY"],
          relatedProofIds: ["nyc-artist-coalition-public-web-infrastructure"],
          description: "The approved public proof uses 'Co-founded NYC Artist Coalition,' while the newly decomposed intake currently holds formation as Jamie's memory lead rather than as independently source-associated evidence.",
          currentPosition: "The careful public proof remains approved through resume and Jamie-review governance. This intake does not independently re-verify or negate it; it opens a narrower formation-evidence lane.",
          status: "open",
          correctionTriggers: [
            {
              id: "TRIGGER-NYCA-COFOUNDER-CONFIRM",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Contemporaneous formation records or corroborating accounts from founding collaborators establish Jamie's role in initiating or constituting NYC Artist Coalition.",
              action: "confirm",
              requiredEvidence: ["dated formation artifact", "at least one corroborating collaborator or institutional source"],
              reason: "Formation evidence would move co-founder wording from approved careful context to independently source-associated support."
            },
            {
              id: "TRIGGER-NYCA-COFOUNDER-NARROW",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Recovered records establish substantial early coalition-building work by Jamie but do not establish co-founder status.",
              action: "narrow",
              requiredEvidence: ["dated early coalition records", "role-specific collaborator or institutional account"],
              reason: "The strongest defensible wording should name the established contribution without preserving an unsupported title.",
              replacementGuidance: "Replace 'Co-founded NYC Artist Coalition' with 'Helped build NYC Artist Coalition and built public campaign websites,' retaining only evidenced outputs."
            },
            {
              id: "TRIGGER-NYCA-COFOUNDER-HOLD",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Credible contemporaneous records or multiple directly involved collaborators materially contradict Jamie's co-founder role.",
              action: "hold",
              requiredEvidence: ["specific contradictory formation evidence", "review with Jamie and directly involved collaborators"],
              reason: "A material contradiction should stop continued projection while the historical record is reconciled.",
              replacementGuidance: "Set the proof to pending, remove 'Co-founded' from public surfaces, and retain a bounded contribution claim only if separately supported."
            }
          ]
        },
        {
          id: "TENSION-NYCA-CAMPAIGN-SYSTEMS-SCOPE",
          propositionIds: [
            "PROP-NYCA-TOWN-HALLS-AND-CAMPAIGN-SYSTEMS-MEMORY",
            "PROP-NYCA-TALKS-NOT-RAIDS-MARCH-MEMORY",
            "PROP-NYCA-POLICY-OUTCOMES-MEMORY"
          ],
          relatedProofIds: [
            "nyc-artist-coalition-public-web-infrastructure",
            "nyc-artist-coalition-civic-systems"
          ],
          description: "Existing careful proofs name campaign websites, coalition operations, policy communications, and work from 2017 onward; the new proposition layer has not yet associated every named output, date range, town hall, MARCH claim, or policy outcome with its own evidence.",
          currentPosition: "Documented fire-code study groups, City Hall advocacy, coalition affiliation, and Jamie's safety analysis are source-associated. New campaign pages and government records now establish a sequence of public artifacts, named collaborators, and institutional outcomes, but they still do not identify Jamie's authorship, production role, or causal mechanism across every campaign named in the proofs.",
          status: "open",
          correctionTriggers: [
            {
              id: "TRIGGER-NYCA-CAMPAIGN-SYSTEMS-CONFIRM",
              targetProofId: "nyc-artist-coalition-civic-systems",
              condition: "Campaign repositories, event records, public artifacts, or collaborator accounts associate Jamie with the named websites, town halls, coordination systems, and policy-communication outputs over the stated period.",
              action: "confirm",
              requiredEvidence: ["project-specific public artifact or repository", "dated role or collaborator evidence", "campaign-to-output mapping"],
              reason: "Project-level evidence would convert the broad systems summary into a traceable portfolio of contributions."
            },
            {
              id: "TRIGGER-NYCA-CAMPAIGN-SYSTEMS-NARROW",
              targetProofId: "nyc-artist-coalition-civic-systems",
              condition: "Research supports only a subset of the currently named campaigns, outputs, or date range.",
              action: "narrow",
              requiredEvidence: ["completed campaign-by-campaign source map", "identified unsupported output or period"],
              reason: "A broad systems claim should not retain components that cannot be associated with Jamie's documented work.",
              replacementGuidance: "Split the proof into project-specific claims and remove unsupported campaigns, outputs, or chronology from the broad wording."
            },
            {
              id: "TRIGGER-NYCA-CAMPAIGN-SYSTEMS-REPLACE",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Public repositories or collaborator evidence assign primary authorship of a named campaign surface to another person while showing a different Jamie contribution.",
              action: "replace",
              requiredEvidence: ["authorship or contribution record", "review with the credited collaborator when appropriate"],
              reason: "Credit should follow the actual contribution rather than preserve a convenient but inaccurate output label.",
              replacementGuidance: "Replace website-authorship wording with the specific evidenced role, such as implementation support, operations, documentation, facilitation, or campaign coordination, and credit the primary author."
            }
          ]
        }
      ],
      researchQuestions: [
        "Which formation records and collaborator accounts establish Jamie's role in creating NYC Artist Coalition?",
        "Which public repository commits, CMS records, deployment history, or collaborator accounts associate Jamie with implementation or stewardship of the Cabaret, town-hall, safety, CreateNYC, or Talks Not Raids web surfaces?",
        "Which hearing testimony, sponsor statements, committee reports, and collaborator accounts connect Jamie's documented advocacy actions to a specific institutional decision without overstating causality?",
        "Which agency reports, operational directives, or official statements establish whether MARCH continued, changed form, or ended after Local Law 220?",
        "Which event programs, production records, recordings, venue records, and named participant accounts establish Jamie's role, audience scale, and practical outcomes for each town hall?"
      ],
      boundaries: [
        "Treat Jamie's recollection as a research lead, not self-authenticating proof of causality or scale.",
        "Use collective-credit language and distinguish instrumental contribution from sole causation.",
        "The Gothamist source directly supports fire-code study groups, City Hall advocacy, coalition affiliation, and Jamie's safety analysis; it does not establish the full campaign history.",
        "The NPR source is context only until it is closely read for person- and organization-specific evidence.",
        "Coalition campaign pages establish public artifacts and collective positions, not individual authorship or causality unless Jamie is named.",
        "The Council records establish enactment and statutory scope, not which advocates caused passage or whether MARCH was later disbanded.",
        "Do not project this intake item directly to the website; strengthen or create governed claims first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex source review"]
    },
    {
      id: "INTAKE-NYCA-CAMPAIGN-PRESS-CORPUS-2026-07-13",
      title: "NYC Artist Coalition campaign press corpus",
      project: "nyc-artist-coalition",
      kind: "source-link",
      summary: `Jamie identifies the press and reference sections he built across four NYC Artist Coalition campaign sites. The recovered live and archived surfaces contain ${campaignPressPlacementCount} campaign-to-article placements representing ${campaignPressDistinctSourceIds.length} distinct articles.`,
      status: "researching",
      sourceIds: [
        ...campaignPressIndexSourceIds,
        ...campaignPressDistinctSourceIds
      ],
      relatedClaimIds: [],
      relatedProofIds: [
        "nyc-artist-coalition-public-web-infrastructure",
        "nyc-artist-coalition-civic-systems"
      ],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-NYCA-CAMPAIGN-PRESS-CORPUS-COUNTS-2026",
          text: "The recovered campaign surfaces contain 46 press placements representing 45 distinct articles: 21 on Let NYC Dance, 7 on Talks Not Raids, 8 on Save NYC Spaces, 9 in the December 2021 FairRentNYC archive, and 1 additional reporting item in the current FairRentNYC reference library.",
          status: "direct-support",
          sourceIds: [...campaignPressIndexSourceIds],
          sourceSupport: [
            `${campaignPressSourceIds["let-nyc-dance"].length} Let NYC Dance placements`,
            `${campaignPressSourceIds["talks-not-raids"].length} Talks Not Raids placements`,
            `${campaignPressSourceIds["save-nyc-spaces"].length} Save NYC Spaces placements`,
            "nine placements in the December 2021 FairRentNYC capture",
            "one additional reporting item in the current FairRentNYC reference library",
            "the NPR Cabaret Law article appears on both Let NYC Dance and Save NYC Spaces"
          ],
          boundaries: [
            "The count joins time-bounded live and archived editorial surfaces; it does not say all 46 placements appeared simultaneously.",
            "A campaign press placement is not publisher endorsement, audience reach, favorable sentiment, or proof that the campaign caused an outcome.",
            "The campaign sections may not be a complete record of every article ever published about the work."
          ],
          decisionUse: "Establishes the scale and structure of the public source trails Jamie says he built into four campaign websites without converting coverage volume into impact or causality."
        },
        {
          id: "PROP-NYCA-CAMPAIGN-PRESS-ISSUE-RANGE-2026",
          text: "The four press collections preserve reporting and narrative context around Cabaret Law repeal, MARCH enforcement and transparency, creation and accountability of the Office of Nightlife, cultural-space survival, storefront vacancy, and commercial-rent regulation.",
          status: "synthesis-with-boundary",
          sourceIds: [...campaignPressIndexSourceIds],
          sourceSupport: [
            "campaign-specific article placement and title metadata",
            "four distinct campaign information architectures",
            "linked cultural-space, nightlife-enforcement, and commercial-rent policy contexts"
          ],
          boundaries: [
            "This is a synthesis of article placement and title metadata, not a substitute for article-level close reading.",
            "Do not assign campaign authorship, coalition authorship, or policy causality from subject coverage alone."
          ],
          decisionUse: "Shows the breadth of the policy and cultural-space information architecture available for later role, chronology, and outcome research."
        },
        {
          id: "PROP-NYCA-CAMPAIGN-PRESS-WEB-AUTHORSHIP-MEMORY",
          text: "Jamie states that he made the four campaign sites and their press-article sections.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: [
            "The campaign surfaces establish the sites and article collections but do not identify their technical author.",
            "Jamie's statement aligns with the governed web-infrastructure proof but remains separable from collective campaign authorship and outcomes."
          ],
          decisionUse: "Preserves a concrete information-architecture accomplishment for repository, deployment, CMS, or collaborator corroboration.",
          nextStep: "Recover repository history, deployment records, CMS exports, and collaborator accounts for each campaign site and press section."
        },
        {
          id: "PROP-NYCA-CAMPAIGN-PRESS-ARTICLE-READING-QUEUE",
          text: "The campaign indexes establish 45 distinct article leads, but article-body claims require source-by-source close reading before they support role, chronology, outcome, reach, or causal claims.",
          status: "research-only",
          sourceIds: [],
          sourceSupport: [],
          boundaries: [
            "Metadata accession is not article-body verification.",
            "Paywalls, moved pages, archive quality, syndication, and headline changes must remain visible in later readings."
          ],
          decisionUse: "Creates a complete, deduplicated research queue without pretending that all 45 articles have already been decomposed into verified claims.",
          nextStep: "Prioritize articles that name Jamie, identify campaign mechanisms, document collaborator roles, or connect an advocacy artifact to an institutional response; record locators and non-support for every close read."
        }
      ],
      tensions: [
        {
          id: "TENSION-NYCA-CAMPAIGN-PRESS-WEB-AUTHORSHIP",
          propositionIds: [
            "PROP-NYCA-CAMPAIGN-PRESS-WEB-AUTHORSHIP-MEMORY"
          ],
          relatedProofIds: [
            "nyc-artist-coalition-public-web-infrastructure"
          ],
          description: "Jamie directly confirms that he built the four sites and press sections, while the recovered public campaign surfaces establish the artifacts but do not name their technical author.",
          currentPosition: "Retain the governed careful proof on its existing approved-resume and Jamie-review basis; use this corpus to establish the artifact set and seek project-level technical corroboration before adding a quantified press-architecture projection.",
          status: "open",
          correctionTriggers: [
            {
              id: "TRIGGER-NYCA-CAMPAIGN-PRESS-AUTHORSHIP-CONFIRM",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Repository, deployment, CMS, or collaborator evidence associates Jamie with implementation and stewardship of all four campaign press sections.",
              action: "confirm",
              requiredEvidence: [
                "project-specific implementation or deployment record",
                "campaign-to-contribution map",
                "corroborating collaborator evidence where appropriate"
              ],
              reason: "The governed proof and a future quantified press-architecture claim would then have project-level technical provenance."
            },
            {
              id: "TRIGGER-NYCA-CAMPAIGN-PRESS-AUTHORSHIP-NARROW",
              targetProofId: "nyc-artist-coalition-public-web-infrastructure",
              condition: "Recovered authorship evidence assigns a named campaign surface primarily to another person or materially narrows Jamie's implementation role.",
              action: "narrow",
              requiredEvidence: [
                "project-specific authorship or contribution record",
                "review with Jamie and the credited collaborator when appropriate"
              ],
              reason: "The proof should name Jamie's actual technical or operational contribution and retain the primary creator's credit.",
              replacementGuidance: "Replace broad website-authorship wording for the affected campaign with the narrower evidenced role while preserving the verified artifact and collective context."
            }
          ]
        }
      ],
      researchQuestions: [
        "Which articles name Jamie or describe a specific action he took?",
        "Which articles identify campaign mechanisms, collaborators, public events, or institutional responses that can be converted into bounded propositions?",
        "Which repositories, deployments, CMS records, or collaborator accounts establish Jamie's technical authorship and stewardship campaign by campaign?",
        "Which listed URLs require a preferred canonical replacement or a stable Wayback capture?",
        "Which repeated, syndicated, moved, retitled, or paywalled articles need identity reconciliation before close reading?"
      ],
      boundaries: [
        "Article placement does not imply publisher endorsement, favorable sentiment, audience reach, or campaign causality.",
        "Jamie did not author the independent reporting merely because he built the campaign source trail.",
        "Keep Jamie's web and information-architecture contribution distinct from collective campaign authorship and institutional policy outcomes.",
        "The 46-placement count includes one article placed by two campaigns and joins the archived and current FairRentNYC states.",
        "Do not project this intake item directly to the website; article-level claims, quantified wording, and any public placement require separate review."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-13",
      reviewedAt: "2026-07-13",
      reviewedBy: ["Jamie Burkart", "Codex campaign press census"]
    },
    {
      id: "INTAKE-CALLNYC-COUNCIL-ENGAGEMENT-2026-07-12",
      title: "CallNYC full social corpus and NYC Council engagement",
      project: "callnyc",
      kind: "claim-candidate",
      summary: "A full-population archival review gave all 110 profile-counted @CallNYCapp objects a disposition, recovering 107 and preserving three as not recovered. The recovered corpus contains 71 issue-recognition posts linking 61 distinct CallNYC issue pages to 26 Council-member accounts. A separate authenticated interaction review recovered public responses or amplification from at least eight then-serving Council-member accounts.",
      status: "integrated",
      sourceIds: [
        "SRC-CALLNYC-X-PROFILE-2026-07-14",
        "SRC-CALLNYC-POLITICO-2016-03-14",
        "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14",
        callNycFullPopulationCensusSourceId,
        ...callNycProjectSocialSourceIds,
        "SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS",
        ...callNycCouncilSocialSourceIds
      ],
      relatedClaimIds: ["CLM-CALLNYC-PUBLIC-ISSUE-PATHWAY-CENSUS"],
      relatedProofIds: ["callnyc-civic-data-guidance"],
      candidateClaims: ["Jamie's CallNYC project used issue-specific public pathways at scale: the recoverable @CallNYCapp corpus contains 71 issue-recognition posts linking 61 distinct CallNYC issue pages to 26 Council-member accounts."],
      propositions: [
        {
          id: "PROP-CALLNYC-ISSUE-PATHWAY-CENSUS",
          text: "Jamie's CallNYC project used issue-specific public pathways at scale: the recoverable @CallNYCapp corpus contains 71 issue-recognition posts linking 61 distinct CallNYC issue pages to 26 Council-member accounts.",
          status: "supported-with-boundary",
          sourceIds: [callNycFullPopulationCensusSourceId, "SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-X-JAMIE-MAKER-710150246781882369"],
          sourceSupport: ["110-slot population disposition", "per-status URL and relationship inventory", "deduplicated CallNYC issue-page URLs", "recognition-target handle classification", "independent reporting on Jamie's creation and iteration of CallNYC", "contemporaneous first-person project relationship"],
          boundaries: ["The profile displayed 110 posts, while 107 unique timeline objects were recovered and three remained unavailable.", "The 26 accounts are named targets in project-authored recognition posts; this is distinct from engagement by those offices.", "The historical recognitions do not establish current Council performance or current resident guidance."],
          decisionUse: "Shows the product's issue-pathway information architecture operating in public with a bounded, source-level metric suitable for the CallNYC case study."
        },
        {
          id: "PROP-CALLNYC-EIGHT-COUNCIL-ACCOUNTS-RECOVERED",
          text: "Authenticated X profile and mention review recovered public interactions with @CallNYCapp from eight then-serving New York City Council member accounts.",
          status: "supported-with-boundary",
          sourceIds: [
            "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14",
            "SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS",
            ...callNycCouncilSocialSourceIds
          ],
          sourceSupport: ["eight status-level member-account sources", "historical name-to-handle roster matching", "authenticated profile and live-search census"],
          boundaries: ["Eight is a recoverable minimum, not a complete historical total.", "The count excludes the institutional @NYCCouncil account and excludes Carlina Rivera's 2016 post because she had not yet taken Council office.", "Interaction does not mean endorsement, adoption, or policy impact."],
          decisionUse: "Supplies a bounded public-sector resonance signal for future editorial consideration without converting unlike interactions into one promotional engagement score."
        },
        {
          id: "PROP-CALLNYC-COUNCIL-INTERACTION-TYPES",
          text: "The eight recovered Council-member interactions include direct replies, repost or quote-post amplification, a direct recognition response, and independent sharing of CallNYC.org.",
          status: "synthesis-with-boundary",
          sourceIds: [...callNycCouncilSocialSourceIds],
          sourceSupport: ["status-level conversation views", "status author handles", "visible repost, reply, recognition-response, and link-sharing forms"],
          boundaries: ["Do not sum likes, reposts, replies, and link shares into one engagement total.", "Access-time interface labels do not expose every historical liker, reposter, or follower identity."],
          decisionUse: "Shows several kinds of mission-relevant engagement while preserving the differences between them."
        },
        {
          id: "PROP-CALLNYC-X-CORPUS-RECOVERY-BOUNDARY",
          text: "The authenticated review recovered 107 unique timeline objects from a profile displaying 110 posts, plus 11 public live-search results mentioning @CallNYCapp.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-CALLNYC-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", callNycFullPopulationCensusSourceId],
          sourceSupport: ["profile post count", "deduplicated Posts and Replies timeline objects", "date-bounded search reconciliation", "Internet Archive CDX status-URL check", "exhausted mention-search result set at access time"],
          boundaries: ["Three profile-counted items were not recovered as unique timeline objects.", "X search and profile virtualization may omit deleted, unavailable, deindexed, or otherwise inaccessible material."],
          decisionUse: "Makes the denominator and residual gap visible so the eight-account result is not mistaken for a complete export."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Can an account-data export recover the three profile-counted items not visible in the authenticated timeline census?",
        "Can follower, liker, and reposter identities be recovered without relying on unstable interface state?",
        "Do archived captures preserve additional Council-member interactions that X live search no longer indexes?",
        "Should the at-least-eight Council-account interaction floor remain knowledge-bank depth or become a separate carefully worded case-study proof after editorial review?"
      ],
      boundaries: [
        "Use 'at least eight then-serving Council member accounts recovered' if this finding is ever projected; do not call it a complete total.",
        "Separate replies, reposts, quote posts, recognition responses, link shares, likes, and follows rather than collapsing them into one engagement number.",
        "Preserve historical officeholder and account-status context.",
        "Do not count the institutional @NYCCouncil account as a Council member.",
        "Do not treat Council-member interaction as formal endorsement, product adoption, constituent outcome, or policy causality.",
        "The approved website projection is limited to the 71-post, 61-page, 26-account issue-pathway census; do not project raw access-time engagement totals or the at-least-eight interaction floor without separate claim review."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex full-population social-media review"]
    },
    {
      id: "INTAKE-PROJECT-SOCIAL-IDENTITY-SYSTEM-2026-07-14",
      title: "Project social-media identity system",
      kind: "project-lead",
      summary: "Authenticated X review recovered five active project documentation accounts, one dormant Sunday Dinner account shell, and an umbrella campaign structure in which @NYCArtC carries Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC.",
      status: "researching",
      sourceIds: [
        "SRC-CALLNYC-X-PROFILE-2026-07-14",
        "SRC-NYCA-X-PROFILE-2026-07-14",
        "SRC-WOWLIST-X-PROFILE-2026-07-14",
        "SRC-SUNDAY-DINNER-X-PROFILE-2026-07-14",
        "SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14",
        "SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14",
        "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14",
        nycaOlympiaSocialSourceId
      ],
      relatedClaimIds: [],
      relatedProofIds: ["nyc-artist-coalition-public-web-infrastructure", "wowlist-community-platform", "sunday-dinner-196-participation-infrastructure", "kc-spaces-fund-digital-infrastructure", "kc-town-hall-public-benefit-documentation"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-PROJECT-SOCIAL-ACCOUNT-MAP-2026",
          text: "The recoverable project-account map is CallNYC @CallNYCapp, NYC Artist Coalition and its four campaigns @NYCArtC, WOW List @wowlist, KC Town Hall @KCTownHall, and KC Spaces Fund @KCSpacesFund; @sundaydinnernyc is a dormant zero-post shell.",
          status: "direct-support",
          sourceIds: ["SRC-CALLNYC-X-PROFILE-2026-07-14", "SRC-NYCA-X-PROFILE-2026-07-14", "SRC-WOWLIST-X-PROFILE-2026-07-14", "SRC-SUNDAY-DINNER-X-PROFILE-2026-07-14", "SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14", "SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14"],
          sourceSupport: ["authenticated live profile identity", "profile chronology and project description", "NYC Artist Coalition campaign hashtags"],
          boundaries: ["The Sunday Dinner account shell does not establish active use or Jamie's control.", "No live account was recovered at the exact @letnycdance, @talksnotraids, or @savenycspaces handles; an empty @fairrentnyc account joined in 2023 and is not attributed to Jamie or the coalition.", "Current nonexistence does not prove an exact campaign handle never existed."],
          decisionUse: "Gives future researchers a verified account routing map without mistaking campaign hashtags or unrelated exact-handle accounts for owned project identities."
        },
        {
          id: "PROP-PROJECT-SOCIAL-ACCOUNTS-ESTABLISHED-BY-JAMIE",
          text: "Jamie confirms that he established the project social accounts and public-facing identity systems under review.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["The present profile and status evidence confirms the accounts and their public use but does not independently prove account creation or initial administrator identity.", "Account establishment does not make Jamie the author of every post published by a shared team."],
          decisionUse: "Preserves Jamie's account-establishment contribution as a researchable actor-action claim without laundering a first-person confirmation into independent proof.",
          nextStep: "Recover account-creation emails, administrator records, early deployment notes, or collaborator confirmation suitable for public-safe authorship evidence."
        },
        {
          id: "PROP-NYCA-SHARED-IDENTITY-STEWARDSHIP-2026",
          text: "The @NYCArtC identity functioned as durable shared campaign infrastructure that collaborators could use across multiple policy and cultural-space efforts.",
          status: "synthesis-with-boundary",
          sourceIds: ["SRC-NYCA-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", nycaOlympiaSocialSourceId],
          sourceSupport: ["four campaign identities in the profile bio", "multi-year mention corpus", "89 recovered Olympia Kazi posts mentioning @NYCArtC", "status-level FairRentNYC specimen"],
          boundaries: ["The account does not identify the human author of each shared-account post.", "Olympia Kazi's public use of @NYCArtC does not by itself prove that she authored posts from the coalition account.", "Durability and repeated use do not establish sole ownership or policy causality."],
          decisionUse: "Makes durable shared identity stewardship legible while keeping Jamie's account-establishment statement in its separate memory-lead proposition and preserving collective authorship."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which account-establishment records can independently corroborate Jamie's first-person confirmation?",
        "Which collaborators can describe how the shared identity system supported their work without exposing private administrator details?",
        "Which account snapshots should be preserved outside X to reduce platform-loss risk?"
      ],
      boundaries: [
        "Do not publish administrator credentials, account-recovery details, private messages, follower exports, or private analytics.",
        "Do not assign individual authorship to shared-account posts without post-level evidence.",
        "Do not treat account activity, follower counts, mentions, or reposts as policy causality or endorsement.",
        "Do not project this intake item directly to the website; approve a bounded account-establishment or identity-system claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex authenticated social-media review"]
    },
    {
      id: "INTAKE-NYCA-COUNCIL-SOCIAL-ENGAGEMENT-2026-07-14",
      title: "NYC Council engagement with NYC Artist Coalition on X",
      project: "nyc-artist-coalition",
      kind: "metric-lead",
      summary: "A bounded authenticated search recovered 526 live-search results for @NYCArtC. After historical-roster matching and thread inspection, five then-serving Council member accounts produced at least 15 direct mention or reply interactions; two additional roster-matched accounts appeared only in broader thread-level results and are excluded from the direct count.",
      status: "researching",
      sourceIds: ["SRC-NYCA-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", "SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS", ...nycaCouncilSocialSourceIds, nycaOlympiaSocialSourceId],
      relatedClaimIds: [],
      relatedProofIds: ["nyc-artist-coalition-civic-systems", "nyc-artist-coalition-public-web-infrastructure"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-NYCA-FIVE-DIRECT-COUNCIL-ACCOUNTS-2026",
          text: "At least five then-serving New York City Council member accounts directly mentioned or replied to @NYCArtC in 15 recoverable interactions: Rafael Espinal, Stephen Levin, Jimmy Van Bramer, Mark Levine, and Justin Brannan.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", "SRC-NYCA-HISTORICAL-COUNCIL-HANDLE-ROSTERS", ...nycaCouncilSocialSourceIds],
          sourceSupport: ["13 authored posts explicitly naming @NYCArtC", "two authenticated conversation views showing direct replies to @NYCArtC", "historical name-to-handle roster matching"],
          boundaries: ["Five accounts and 15 interactions are recoverable minimums, not complete historical totals.", "Brad Lander and Carlina Rivera surfaced in broader thread-level search results but did not satisfy the strict direct-mention or direct-reply rule for those statuses.", "Interaction does not equal endorsement, adoption, or policy causality."],
          decisionUse: "Provides a strict public-sector-engagement floor while documenting false-positive handling."
        },
        {
          id: "PROP-NYCA-SOCIAL-MISSION-PATTERNS-2026",
          text: "Recovered Council-member posts place NYC Artist Coalition in public work around Cabaret Law repeal, Office of Nightlife creation and listening, MARCH transparency hearings, cultural-space preservation, arts support, accessible public information, and Commercial Rent Stabilization.",
          status: "synthesis-with-boundary",
          sourceIds: [...nycaCouncilSocialSourceIds],
          sourceSupport: ["status-level Council-member descriptions", "campaign hashtags and linked public surfaces", "authenticated reply contexts"],
          boundaries: ["The posts show public association and interaction, not sole coalition responsibility or causal ownership of outcomes.", "Accessible-information and Commercial Rent Stabilization thread matches require conversation context; do not present every result as an explicit coalition endorsement."],
          decisionUse: "Connects the social record to mission-relevant project mechanisms rather than treating raw interaction volume as the accomplishment."
        },
        {
          id: "PROP-NYCA-OLYMPIA-KAZI-MENTION-CORPUS-2026",
          text: "Olympia Kazi authored 89 of the 526 recovered live-search results mentioning @NYCArtC, the largest external-author count in the bounded corpus.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", nycaOlympiaSocialSourceId],
          sourceSupport: ["deduplicated status-author count", "multi-year public specimen using @NYCArtC in FairRentNYC advocacy"],
          boundaries: ["The count is limited to X live-search results visible on July 14, 2026.", "Mention authorship does not establish authorship of shared @NYCArtC account posts.", "The count measures recovered public documentation, not total labor, influence, or campaign outcome."],
          decisionUse: "Credits sustained collaborator use of the public identity system and supports a shared-stewardship interpretation."
        },
        {
          id: "PROP-NYCA-X-SEARCH-RESULT-BOUNDARY-2026",
          text: "The authenticated live search for @NYCArtC returned 526 unique visible status URLs from February 2017 through March 2025, but some results matched the wider conversation rather than the authored post text.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14"],
          sourceSupport: ["exhausted chronological live-search scroll", "deduplicated status URLs", "thread-level verification samples"],
          boundaries: ["X search is not a platform export and may omit deleted, unavailable, deindexed, or restricted posts.", "A search result is not automatically a direct mention, reply, endorsement, or substantive interaction."],
          decisionUse: "Prevents search-result volume from becoming noisy compliance theater or an inflated engagement metric."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Should the recoverable denominator remain 526 live-search results and the time window remain February 2017 through March 2025 when this research is refreshed?",
        "Can an account-data export recover follower, liker, and reposter identities without relying on unstable interface state?",
        "Which Council-member interactions should be preserved through stable web archives?",
        "Which collaborator accounts can establish shared authorship and stewardship at post or campaign level?"
      ],
      boundaries: [
        "Use 'at least five then-serving Council member accounts in 15 direct interactions recovered' if the strict result is ever projected.",
        "Do not substitute the wider seven-account, 21-result roster match for the strict direct-interaction count.",
        "Do not treat social interaction as endorsement, adoption, legislative authorship, or causal credit for policy outcomes.",
        "Do not project this intake item directly to the website; create and approve a sourced claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex authenticated social-media review"]
    },
    {
      id: "INTAKE-WOWLIST-SOCIAL-RECORD-2026-07-14",
      title: "WOW List social documentation record",
      project: "wowlist",
      kind: "source-link",
      summary: "A full-population archival pass reconciled all 38 objects counted by the authenticated @wowlist profile and associated them with a public URL inventory, mission themes, stakeholder groups, access-time engagement labels, and a bounded external-mention review.",
      status: "researching",
      sourceIds: ["SRC-WOWLIST-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", "SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-WOWLIST-X-SUNDAY-DINNER-771457416298921985", "SRC-WOWLIST-X-EVENT-SHARE-845116237591920640", "SRC-WOWLIST-X-PUNKS-CRIMINALS-604360847012413440", "SRC-WOWLIST-YOUTUBE-SHELBY-TUTORIAL-2015", "SRC-GRASSTRONAUT-HOMEWORK-EVERY-TOWN-2015-01-29", "SRC-GOOD-TIMES-ZINES-TWO-POINT-ZERO-2015-05-06", "SRC-KQED-GHOST-SHIP-VIGIL-2016-12-06", "SRC-MEOW-WOLF-DIY-FUND-2017"],
      relatedClaimIds: [],
      relatedProofIds: ["wowlist-community-platform", "sunday-dinner-196-participation-infrastructure"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-WOWLIST-SUNDAY-DINNER-ORIGIN-SOCIAL-2026",
          text: "A 2016 WOW List post described the platform as a DIY community calendar project originating from the Sunday Dinner potluck.",
          status: "direct-support",
          sourceIds: ["SRC-WOWLIST-X-SUNDAY-DINNER-771457416298921985"],
          sourceSupport: ["project-account statement", "linked Sunday Dinner event page"],
          boundaries: ["The post does not establish sole authorship, full platform adoption, or the aggregate number of gatherings."],
          decisionUse: "Adds public source association for the relationship between recurring hosting and the community-calendar product."
        },
        {
          id: "PROP-WOWLIST-EXTERNAL-EVENT-SHARE-2026",
          text: "A 2017 public post used a WOW List event URL to circulate a benefit event at Silent Barn.",
          status: "direct-support",
          sourceIds: ["SRC-WOWLIST-X-EVENT-SHARE-845116237591920640"],
          sourceSupport: ["external authored post", "public WOW List event URL"],
          boundaries: ["One external share is a usage specimen, not a broad adoption metric or attendance outcome."],
          decisionUse: "Supplies a concrete material scene of the product functioning as public event infrastructure."
        },
        {
          id: "PROP-WOWLIST-X-CORPUS-RECOVERY-2026",
          text: "The authenticated Posts and Replies review recovered and classified all 38 objects counted by the @wowlist profile: 16 project-account posts, six project-account replies, and 16 reposted external statuses from 13 distinct source accounts.",
          status: "direct-support",
          sourceIds: ["SRC-WOWLIST-X-PROFILE-2026-07-14", "SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15"],
          sourceSupport: ["profile post count", "38-row status census", "status-author classification", "Posts and Replies reconciliation"],
          boundaries: ["Shared-account human authorship remains unknown.", "The census is not an account-data export and does not claim a complete deleted-post history."],
          decisionUse: "Defines the complete profile-counted social corpus without overstating authorship, reach, or preservation completeness."
        },
        {
          id: "PROP-WOWLIST-PARTICIPATORY-WORKFLOW-2026",
          text: "The account record documents participatory product operation: replies taught a contributor how to follow lists, use a profile, and add an event to multiple lists; later posts directed people to join, add shows, and receive a weekly email.",
          status: "direct-support",
          sourceIds: ["SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-WOWLIST-YOUTUBE-SHELBY-TUTORIAL-2015"],
          sourceSupport: ["three public onboarding replies", "public join and weekly-email instructions", "participant-created tutorial"],
          boundaries: ["These are workflow specimens, not a complete support history or adoption total.", "The shared-account post author is not identified."],
          decisionUse: "Strengthens the product-operations claim with visible, public examples of contribution and onboarding workflows."
        },
        {
          id: "PROP-WOWLIST-EXTERNAL-USE-SPECIMENS-2026",
          text: "Three public specimens show people using or explaining WOW List: an organizer reported adding shows, a participant published a tutorial, and an external event promoter shared a WOW List page for a Silent Barn benefit.",
          status: "direct-support",
          sourceIds: ["SRC-WOWLIST-X-PUNKS-CRIMINALS-604360847012413440", "SRC-WOWLIST-YOUTUBE-SHELBY-TUTORIAL-2015", "SRC-WOWLIST-X-EVENT-SHARE-845116237591920640"],
          sourceSupport: ["external organizer-authored status", "external participant-created video", "external event-share status"],
          boundaries: ["Three usage specimens do not establish broad adoption, lifetime reach, attendance, or organizer outcomes."],
          decisionUse: "Adds concrete external-use evidence while preserving the difference between a specimen and an aggregate adoption claim."
        },
        {
          id: "PROP-WOWLIST-MISSION-SOURCE-TRAIL-2026",
          text: "The posted source trail connects event circulation with DIY operational knowledge, community-authored archives, cross-scene learning, mutual aid, cultural-space safety, and support after the Ghost Ship fire.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15", "SRC-GRASSTRONAUT-HOMEWORK-EVERY-TOWN-2015-01-29", "SRC-GOOD-TIMES-ZINES-TWO-POINT-ZERO-2015-05-06", "SRC-KQED-GHOST-SHIP-VIGIL-2016-12-06", "SRC-MEOW-WOLF-DIY-FUND-2017"],
          sourceSupport: ["35-link URL inventory", "two archived DIY documentation articles", "live public-media report", "archived cultural-space fund page"],
          boundaries: ["Linked sources establish the account's public context and curation, not Jamie's authorship of those sources or causality for their outcomes.", "A repost is not evidence of reciprocal endorsement by the source account."],
          decisionUse: "Preserves the mission-relevant intellectual and care context for future portfolio composition without forcing it onto the current proof page."
        },
        {
          id: "PROP-WOWLIST-ACCESS-TIME-ENGAGEMENT-2026",
          text: "At review time, the 22 project-account-authored statuses displayed two replies, 20 reposts, and 21 likes in aggregate; 12 of the 22 displayed at least one interaction.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-WOWLIST-X-FULL-POPULATION-CENSUS-2026-07-15"],
          sourceSupport: ["access-time interaction labels", "project-authored versus reposted-status classification"],
          boundaries: ["Interaction counts are mutable and were observed on July 15, 2026.", "Metrics on the 16 reposted source statuses are excluded because they are not project-account traction.", "Interactions do not establish endorsement, adoption, attendance, or outcome."],
          decisionUse: "Preserves a modest, auditable traction baseline for research use without turning it into a public headline."
        }
      ],
      tensions: [],
      researchQuestions: ["Which linked event pages have stable Wayback captures suitable for a public material-scene projection?", "Can collaborators document specific organizer outcomes without turning isolated specimens into a platform-wide adoption metric?", "Which of the 13 repost-source accounts were direct contributors, partners, or simply part of the account's public curation?"],
      boundaries: ["Do not publish private user, event-organizer, audience, or follower data.", "Do not assign a shared-account status to Jamie without actor evidence.", "Do not treat reposts, likes, or follower counts as endorsement or adoption totals.", "Do not aggregate engagement on reposted source statuses as WOW List traction.", "Do not project this intake item directly to the website without editorial approval."],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex full-population authenticated social-media review"]
    },
    {
      id: "INTAKE-KC-SPACES-FUND-SOCIAL-RECORD-2026-07-14",
      title: "KC Spaces Fund social campaign record",
      project: "kc-spaces-fund",
      kind: "source-link",
      summary: "The authenticated @KCSpacesFund timeline preserves the campaign's April-July 2020 public arc, eleven named grantee highlights, two recipient acknowledgements, and contemporaneous Do816 coverage.",
      status: "researching",
      sourceIds: ["SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14", "SRC-KC-SPACES-FUND-DO816-DAILY-DOGOOD-2020-04-21", ...kcSpacesRecipientSocialSourceIds, "SRC-KC-SPACES-FUND-X-LATINO-ARTS-THANKS-1251584787267178499", "SRC-KC-SPACES-FUND-X-BATTERY-TOUR-THANKS-1252310163119276033"],
      relatedClaimIds: [],
      relatedProofIds: ["kc-spaces-fund-digital-infrastructure"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-KC-SPACES-FUND-ELEVEN-PUBLIC-HIGHLIGHTS-2026",
          text: "The official KC Spaces Fund timeline publicly highlighted eleven funded recipients between April 18 and July 9, 2020.",
          status: "direct-support",
          sourceIds: [...kcSpacesRecipientSocialSourceIds],
          sourceSupport: ["eleven dated campaign-account status records", "named recipient descriptions", "rolling emergency-relief chronology"],
          boundaries: ["Eleven is the number of recovered public highlights, not necessarily the complete recipient count.", "The posts do not establish Jamie's participation in grant decisions, the exact amount each recipient received, or final expenditure."],
          decisionUse: "Adds outcome context to the campaign while keeping Jamie's public claim limited to behind-the-scenes digital infrastructure."
        },
        {
          id: "PROP-KC-SPACES-FUND-RECIPIENT-ACKNOWLEDGEMENTS-2026",
          text: "Two recovered recipient posts thanked KC Spaces Fund and described intended or immediate support for creative work during the pandemic.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-KC-SPACES-FUND-X-LATINO-ARTS-THANKS-1251584787267178499", "SRC-KC-SPACES-FUND-X-BATTERY-TOUR-THANKS-1252310163119276033"],
          sourceSupport: ["recipient-authored acknowledgements", "pandemic-support descriptions"],
          boundaries: ["Recipient acknowledgement does not establish exact transfer amounts, expenditure records, long-term outcomes, or Jamie's role in grant decisions."],
          decisionUse: "Corroborates that the public campaign surface connected to material support without shifting organizer or decision-maker credit to Jamie."
        },
        {
          id: "PROP-KC-SPACES-FUND-DO816-COVERAGE-2026",
          text: "Do816's April 21, 2020 Daily DoGood entry described KC Spaces Fund as collecting donations and giving grants to local art spaces and music venues affected by shutdowns.",
          status: "direct-support",
          sourceIds: ["SRC-KC-SPACES-FUND-DO816-DAILY-DOGOOD-2020-04-21"],
          sourceSupport: ["contemporaneous local-culture coverage", "campaign purpose and beneficiary description"],
          boundaries: ["The article does not identify Jamie's role, a complete organizer roster, total distribution, or recipient count."],
          decisionUse: "Adds independent contemporaneous context for the public campaign purpose."
        },
        {
          id: "PROP-KC-SPACES-FUND-X-CORPUS-RECOVERY-2026",
          text: "The authenticated review recovered 34 unique status URLs from a @KCSpacesFund profile displaying 35 posts, including 27 project-account statuses and seven reposted external statuses.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-KC-SPACES-FUND-X-PROFILE-2026-07-14", "SRC-PROJECT-SOCIAL-X-AUTHENTICATED-CENSUS-2026-07-14"],
          sourceSupport: ["profile post count", "status-author classification", "deduplicated timeline URLs"],
          boundaries: ["One profile-counted item was not recovered.", "The shared account does not identify the author of each project-account post."],
          decisionUse: "Defines the surviving public campaign corpus and its residual gap."
        }
      ],
      tensions: [],
      researchQuestions: ["Can the missing profile-counted item and a complete recipient list be recovered from a public-safe export?", "Which named organizers can confirm Jamie's technical role and the account's shared authorship model?", "Can a fiscal-sponsor or campaign record establish the final aggregate distribution without exposing recipient, donor, or applicant data?"],
      boundaries: ["Keep public organizer credit with Caitlin Horsmon, Jordan Carr, Kendell Harbin, and Megan Pobywajlo unless collaborators approve a broader framing.", "Do not attribute grant decisions, fundraising ownership, fiscal sponsorship, or every social post to Jamie.", "Do not publish applicant, donor, subscriber, payment, credential, or private communication records.", "Do not project this intake item directly to the website without a governed claim update."],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex authenticated social-media review"]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-SOCIAL-CONTINUITY-2026-07-14",
      title: "KC Town Hall full social population, public operation, and continuity",
      project: "kc-town-hall",
      kind: "source-link",
      summary: "A full-population authenticated review recovered all 183 profile-counted @KCTownHall records and documents a shared public operating surface for resident input, recurring neighborhood service, civic-resource circulation, and stakeholder response, including three direct then-serving Council-member account responses. The account remained active through 2022, beyond Jamie's stated stewardship transition.",
      status: "integrated",
      sourceIds: ["SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14", kcTownHallFullPopulationCensusSourceId, "SRC-KC-TOWN-HALL-X-LAUNCH-1013893135695601665", "SRC-KC-TOWN-HALL-X-CONTINUITY-1457371688300056580", ...kcTownHallCouncilResponseSourceIds, "SRC-KC-STAR-LUCAS-JUSTUS-COUNCIL-2019-04-03", "SRC-KCMO-CLERK-MELISSA-ROBINSON-SERVICE", "SRC-KC-TOWN-HALL-KC-STAR-LEONS-THRIFTWAY", "SRC-KC-TOWN-HALL-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "SRC-KC-TOWN-HALL-CURBED-RENTER-TAX-CREDIT-2018", "SRC-KC-TOWN-HALL-RIDEKC-NEXT-SYSTEM-REDESIGN", "SRC-KC-TOWN-HALL-KCUR-MISSOURI-PRIMARY-CHEAT-SHEET-2018", "SRC-KC-TOWN-HALL-MISSOURI-VOTER-OUTREACH", "SRC-KC-TOWN-HALL-YOUTUBE-COVID-RELIEF-QA-2020", "SRC-KC-TOWN-HALL-YOUTUBE-PAINT-CLEANUP-2018"],
      relatedClaimIds: ["CLM-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE"],
      relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-KC-TOWN-HALL-SOCIAL-LAUNCH-2018",
          text: "KC Town Hall's pinned July 2018 post invited public participation in building a permanent neighborhood resource and cultural center on Indiana Avenue.",
          status: "direct-support",
          sourceIds: ["SRC-KC-TOWN-HALL-X-LAUNCH-1013893135695601665"],
          sourceSupport: ["project-account launch statement", "participation invitation", "public-purpose framing"],
          boundaries: ["The post does not establish project completion, current property status, funding receipt, or Jamie's sole authorship."],
          decisionUse: "Preserves the project's original public-facing purpose and invitation design."
        },
        {
          id: "PROP-KC-TOWN-HALL-X-FULL-POPULATION-2026",
          text: "The authenticated Posts and Replies review recovered and classified all 183 objects displayed by the @KCTownHall profile: 142 project-account posts, 13 project-account replies, and 28 reposted external statuses.",
          status: "direct-support",
          sourceIds: ["SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14", kcTownHallFullPopulationCensusSourceId],
          sourceSupport: ["183-post profile counter", "183-record reconciled union", "Posts and Replies timeline membership", "record relationship classification"],
          boundaries: ["This is a complete reconciliation of the displayed profile population, not a platform account-data export or proof that no deleted or restricted status ever existed.", "Five other-account parent or conversation-context cards rendered in Replies are preserved separately and not counted as project records."],
          decisionUse: "Replaces the earlier 170-of-183 partial recovery statement with a complete, auditable population disposition."
        },
        {
          id: "PROP-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE-2026",
          text: "The full account record documents a shared public operating surface for resident survey pathways, recurring free tire-pickup intake, cleanup and community-resource distribution, civic-information circulation, and public stakeholder dialogue.",
          status: "synthesis-with-boundary",
          sourceIds: [kcTownHallFullPopulationCensusSourceId, "SRC-KC-TOWN-HALL-X-LAUNCH-1013893135695601665", "SRC-KC-TOWN-HALL-YOUTUBE-COVID-RELIEF-QA-2020", "SRC-KC-TOWN-HALL-YOUTUBE-PAINT-CLEANUP-2018"],
          sourceSupport: ["183-record row-level census", "100 tire-related record classifications", "12 survey-linked record classifications", "31 distinct posted short URLs", "project launch invitation", "project-authored resource videos"],
          boundaries: ["The shared account does not identify the human author of each record.", "The classifications are corpus counts, not participant, pickup, service-completion, or impact totals.", "First-party program quantities in posts are not independently verified."],
          decisionUse: "Supports a stronger portfolio account of KC Town Hall as civic product operations rather than only project promotion."
        },
        {
          id: "PROP-KC-TOWN-HALL-THREE-COUNCIL-RESPONSES-2026",
          text: "Three direct mission-relevant responses came from then-serving Kansas City Council member accounts: Quinton Lucas and Jolie Justus in an April 2019 neighborhood food-access thread, and Melissa Robinson in an August 2020 neighborhood-work thread.",
          status: "direct-support",
          sourceIds: [...kcTownHallCouncilResponseSourceIds, "SRC-KC-STAR-LUCAS-JUSTUS-COUNCIL-2019-04-03", "SRC-KCMO-CLERK-MELISSA-ROBINSON-SERVICE"],
          sourceSupport: ["authenticated direct quote-response by Quinton Lucas", "authenticated direct reply by Jolie Justus", "authenticated direct reply by Melissa Robinson", "contemporaneous and official service-date evidence"],
          boundaries: ["Direct response is not formal endorsement, partnership, adoption, policy causality, or a complete Council engagement graph.", "Do not count tags or mentions alone as engagement."],
          decisionUse: "Adds a defensible stakeholder-response signal while avoiding broad engagement or endorsement language."
        },
        {
          id: "PROP-KC-TOWN-HALL-PUBLIC-SOURCE-TRAIL-2026",
          text: "The 183-record corpus contains 133 external-link occurrences representing 31 distinct short URLs and a mission-relevant source trail across neighborhood food access, housing, voting, transit, public health, pandemic relief, cleanup, and project operations.",
          status: "supported-with-boundary",
          sourceIds: [kcTownHallFullPopulationCensusSourceId, "SRC-KC-TOWN-HALL-KC-STAR-LEONS-THRIFTWAY", "SRC-KC-TOWN-HALL-NORTHEAST-NEWS-AFFORDABLE-HOUSING-2018", "SRC-KC-TOWN-HALL-CURBED-RENTER-TAX-CREDIT-2018", "SRC-KC-TOWN-HALL-RIDEKC-NEXT-SYSTEM-REDESIGN", "SRC-KC-TOWN-HALL-KCUR-MISSOURI-PRIMARY-CHEAT-SHEET-2018", "SRC-KC-TOWN-HALL-MISSOURI-VOTER-OUTREACH", "SRC-KC-TOWN-HALL-YOUTUBE-COVID-RELIEF-QA-2020", "SRC-KC-TOWN-HALL-YOUTUBE-PAINT-CLEANUP-2018"],
          sourceSupport: ["complete posted-link inventory", "selected live and archived mission-relevant sources", "project-authored public resource specimens"],
          boundaries: ["A source circulated by the account is not necessarily coverage of KC Town Hall.", "Do not assign source authorship, publisher endorsement, or project causality from a posted link or repost."],
          decisionUse: "Preserves the account's public research and resource-distribution layer for future composition."
        },
        {
          id: "PROP-KC-TOWN-HALL-SOCIAL-CONTINUITY-2022",
          text: "The @KCTownHall public identity remained active through September 2022 and carried neighborhood-program documentation beyond the period Jamie describes as his direct project stewardship.",
          status: "synthesis-with-boundary",
          sourceIds: ["SRC-KC-TOWN-HALL-X-PROFILE-2026-07-14", kcTownHallFullPopulationCensusSourceId, "SRC-KC-TOWN-HALL-X-CONTINUITY-1457371688300056580"],
          sourceSupport: ["profile chronology", "timeline end date", "post-2020 neighborhood-program documentation"],
          boundaries: ["The social record does not identify the successor steward, prove the legal transfer, or establish the author of each post.", "Do not attribute post-transition program claims or outcomes to Jamie."],
          decisionUse: "Adds public continuity evidence beside Jamie's bounded transition memory without exposing the family crisis or inventing a transfer record."
        }
      ],
      tensions: [
        {
          id: "TENSION-KC-TOWN-HALL-SHARED-ACCOUNT-ATTRIBUTION",
          propositionIds: ["PROP-KC-TOWN-HALL-X-FULL-POPULATION-2026", "PROP-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE-2026", "PROP-KC-TOWN-HALL-SOCIAL-CONTINUITY-2022"],
          relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
          description: "The complete institutional account record is relevant to a project Jamie co-led, but the shared timeline does not identify the human author or operator behind each status and extends beyond Jamie's stated stewardship period.",
          currentPosition: "Project-level public operating functions may be described with shared-account and chronology boundaries. Individual post authorship and post-transition program operation remain unassigned to Jamie.",
          status: "reconciled",
          correctionTriggers: [
            {
              id: "TRIGGER-KC-TOWN-HALL-SHARED-ACCOUNT-BOUNDARY-CONFIRM",
              targetProofId: "kc-town-hall-public-benefit-documentation",
              condition: "No public actor evidence identifies Jamie as the author or operator of a specific shared-account record.",
              action: "confirm",
              requiredEvidence: ["full-population census", "shared-account authorship review", "public projection review"],
              reason: "Institutional account evidence supports the project operating-surface claim while leaving individual authorship and post-transition operation unassigned."
            },
            {
              id: "TRIGGER-KC-TOWN-HALL-ACTOR-EVIDENCE-REPLACE",
              targetProofId: "kc-town-hall-public-benefit-documentation",
              condition: "A permissioned public artifact or collaborator confirmation identifies who authored or operated a material subset of the account record.",
              action: "replace",
              requiredEvidence: ["public actor evidence or permissioned collaborator confirmation", "record-level scope", "projection review"],
              reason: "Specific actor evidence could safely sharpen attribution for a bounded subset without assigning the complete shared account to one person.",
              replacementGuidance: "Attribute only the records or operating period established by the new evidence, retain shared-account language for the remainder, and keep post-transition activity separate unless the evidence reaches it."
            }
          ]
        }
      ],
      researchQuestions: ["Which permissioned public artifact or collaborator account can clarify Jamie's operating responsibilities during the 2018-2020 period without assigning him the complete shared account?", "Which first-party program quantities can be independently corroborated through public agency or collaborator records?", "Which successor organization can confirm the stewardship handoff and ongoing use of the public identity system without exposing the family crisis?"],
      boundaries: ["Do not encode the family crisis.", "Do not infer abandonment, failure, or project completion from a transition.", "Do not attribute every account post or post-transition program outcome to Jamie.", "Do not treat direct responses, reposts, mentions, or access-time interaction labels as formal endorsement, partnership, reach, or impact.", "Do not independently repeat first-party program quantities without corroboration.", "The governed public claim is projected separately; this intake record remains non-projecting provenance."],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex full-population social-media review"]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-CCED-ALLOCATION-2026-07-13",
      title: "KC Town Hall CCED recommendation, Council appropriation, and later reappropriation",
      project: "kc-town-hall",
      kind: "source-link",
      summary: "Official Kansas City records show that the CCED Sales Tax Board recommended $490,539 for KC Town Hall, the City Council accepted the recommendation and appropriated that amount in 2019, and the Council later recorded that KC Town Hall withdrew and the unused funds were reappropriated in 2024.",
      status: "integrated",
      sourceIds: [
        "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"
      ],
      relatedClaimIds: ["CLM-KC-TOWN-HALL-FUNDING-SEQUENCE"],
      relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-KC-TOWN-HALL-CCED-BOARD-RECOMMENDATION-2019",
          text: "On July 16, 2019, the CCED Sales Tax Board voted to recommend $490,539 in funding for KC Town Hall.",
          status: "direct-support",
          sourceIds: ["SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26"],
          sourceSupport: ["authenticated resolution recital identifying the Board vote date, project, and recommended amount"],
          boundaries: ["The Board recommendation was not itself a Council appropriation, executed agreement, disbursement, or expenditure."],
          decisionUse: "Establishes the formal recommendation that preceded the Council's allocation decision."
        },
        {
          id: "PROP-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-2019",
          text: "On September 26, 2019, the Kansas City Council adopted Resolution 190649, accepting the CCED Board's recommendation and authorizing negotiation of a funding agreement with KC Town Hall for up to $490,539.",
          status: "direct-support",
          sourceIds: ["SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26"],
          sourceSupport: ["official legislation status and authenticated resolution sections accepting the recommendation and authorizing negotiation"],
          boundaries: ["Authorization to negotiate does not establish that an agreement was executed or that funds were received or spent.", "The source does not establish Jamie's individual role in securing the vote."],
          decisionUse: "Shows that the proposal advanced from advisory recommendation to formal Council acceptance."
        },
        {
          id: "PROP-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019",
          text: "On September 26, 2019, the Kansas City Council passed Ordinance 190642, appropriating $490,539 to the KC Town Hall project account as part of the Round Two CCED awards.",
          status: "direct-support",
          sourceIds: ["SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26", "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"],
          sourceSupport: ["authenticated 2019 appropriation table listing KC Town Hall and $490,539", "2024 Council recital identifying the same project-account appropriation"],
          boundaries: ["Appropriation is a Council allocation decision, not proof of an executed agreement, receipt, disbursement, expenditure, construction, or project completion.", "The official records do not provide a member-by-member roll call, so do not describe the vote as unanimous."],
          decisionUse: "Corrects recommendation-only understatement while retaining the legal and operational distinction between appropriation and use."
        },
        {
          id: "PROP-KC-TOWN-HALL-WITHDRAWAL-REAPPROPRIATION-2024",
          text: "A 2024 Council record states that KC Town Hall later withdrew, the $490,539 allocation remained unused, and the Council reappropriated those funds to the Housing Budget Fund.",
          status: "direct-support",
          sourceIds: ["SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"],
          sourceSupport: ["official 2024 ordinance recitals and reappropriation action"],
          boundaries: ["The record does not explain why KC Town Hall withdrew or establish the property's current status.", "Do not imply that the allocation was received, spent, or clawed back from KC Town Hall."],
          decisionUse: "Prevents the 2019 appropriation from being misrepresented as a completed funding or redevelopment outcome."
        },
        {
          id: "PROP-KC-TOWN-HALL-ALLOCATION-SEQUENCE-BOUNDED",
          text: "KC Town Hall advanced from a CCED Board recommendation to Council acceptance and appropriation of $490,539, but the public record does not establish receipt or expenditure and later says the project withdrew and the unused allocation was reappropriated.",
          status: "synthesis-with-boundary",
          sourceIds: [
            "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26",
            "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26",
            "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"
          ],
          sourceSupport: ["Board recommendation", "Council acceptance", "Council appropriation", "later withdrawal and reappropriation of unused funds"],
          boundaries: ["This institutional sequence does not establish Jamie's individual contribution or policy causality.", "Do not compress recommendation, appropriation, agreement, receipt, spending, and completion into a single funding claim."],
          decisionUse: "Provides the strongest currently defensible outcome wording for a future governed-proof review without projecting it directly to the website."
        }
      ],
      tensions: [
        {
          id: "TENSION-KC-TOWN-HALL-RECOMMENDATION-VS-APPROPRIATION",
          propositionIds: [
            "PROP-KC-TOWN-HALL-COUNCIL-ACCEPTANCE-2019",
            "PROP-KC-TOWN-HALL-COUNCIL-APPROPRIATION-2019",
            "PROP-KC-TOWN-HALL-WITHDRAWAL-REAPPROPRIATION-2024",
            "PROP-KC-TOWN-HALL-ALLOCATION-SEQUENCE-BOUNDED"
          ],
          relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
          description: "The governed proof previously named only a $490,539 public funding recommendation. Official records establish Council acceptance and appropriation, while also establishing that the allocation was later unused and reappropriated; the proof has now been corrected to preserve the complete bounded sequence.",
          currentPosition: "The governed proof and case study now use the fuller institutional sequence: Council acceptance and appropriation are named, while receipt, spending, and completion remain withheld and the 2024 withdrawal and unused-funds reappropriation remain attached.",
          status: "reconciled",
          correctionTriggers: [
            {
              id: "TRIGGER-KC-TOWN-HALL-RECOMMENDATION-CONFIRM",
              targetProofId: "kc-town-hall-public-benefit-documentation",
              condition: "A projection review deliberately retains recommendation-only wording as a conservative summary after considering the 2019 and 2024 Council records.",
              action: "confirm",
              requiredEvidence: ["Resolution 190649", "Ordinance 190642", "Ordinance 240317", "documented editorial decision"],
              reason: "Recommendation-only wording is narrower than the complete record but does not falsely imply receipt, expenditure, or completion."
            },
            {
              id: "TRIGGER-KC-TOWN-HALL-APPROPRIATION-REPLACE",
              targetProofId: "kc-town-hall-public-benefit-documentation",
              condition: "A governed-proof review approves the fuller institutional sequence for public use.",
              action: "replace",
              requiredEvidence: ["authenticated Resolution 190649", "authenticated Ordinance 190642", "Ordinance 240317", "review of all affected projections"],
              reason: "The official record supports Council acceptance and appropriation, making recommendation-only wording an avoidable understatement when the later unused-funds boundary is also visible.",
              replacementGuidance: "Replace recommendation-only language with wording that the Council accepted the CCED Board's recommendation and appropriated $490,539, while stating or otherwise preserving that the records do not establish receipt or spending and that KC Town Hall later withdrew and the unused funds were reappropriated."
            }
          ]
        }
      ],
      researchQuestions: [
        "Does a public funding agreement establish whether an agreement with KC Town Hall was executed after Resolution 190649?",
        "Do public finance or contract records establish whether any portion of the allocation was ever disbursed before the 2024 reappropriation?",
        "What public administrative record dates KC Town Hall's withdrawal, and does any record relate it to a successor stewardship arrangement?",
        "Which public records or collaborator accounts establish Jamie's specific contribution to the proposal, planning, documentation, and municipal-review process?"
      ],
      boundaries: [
        "Use Council-approved and appropriated language, not grant received, funded, disbursed, spent, constructed, or completed.",
        "Keep the 2024 withdrawal and unused-funds reappropriation attached to any outcome summary.",
        "Do not infer Jamie's individual causality from government records that name the project but not his contribution.",
        "Do not publish private legal, financial, property, banking, or stakeholder records.",
        "The governed public claim is projected separately; this intake record remains non-projecting provenance."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-13",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex public-record review"]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-2026-07-14",
      title: "KC Town Hall stewardship transition",
      project: "kc-town-hall",
      kind: "memory-fragment",
      summary: "Jamie reports that when his involvement in KC Town Hall concluded, he transitioned project stewardship to a mission-aligned organization.",
      status: "captured",
      sourceIds: [],
      relatedClaimIds: [],
      relatedProofIds: ["kc-town-hall-public-benefit-documentation"],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-KC-TOWN-HALL-STEWARDSHIP-TRANSITION-MEMORY",
          text: "Jamie states that he transitioned stewardship of the KC Town Hall project to a mission-aligned organization when his involvement concluded.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: [
            "This is Jamie's firsthand account and is not yet corroborated by an associated public record or receiving-organization confirmation.",
            "Do not identify a receiving organization or state the transfer mechanism, timing, terms, continuity, or later project status without appropriate evidence and review.",
            "The 2024 Council record's withdrawal language does not establish this stewardship transition and should not be treated as evidence of abandonment or failure."
          ],
          decisionUse: "Preserves a professionally material handoff and stewardship outcome without conflating Jamie's account with the later government record or advancing it into public copy.",
          nextStep: "Associate a public-safe handoff artifact, receiving-organization confirmation, or collaborator account that identifies what stewardship changed hands and when."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which public-safe handoff artifact or receiving-organization confirmation establishes the stewardship transition?",
        "What date or bounded period and which project responsibilities, records, or assets can a public-safe source establish as part of the transition?",
        "What continuation or disposition, if any, did the receiving organization document publicly after the transition?"
      ],
      boundaries: [
        "Treat the stewardship transition as Jamie's firsthand research lead until corroborated.",
        "Keep the receiving organization's identity and the handoff's mechanics, timing, and later status out of public claims until evidence and publication review support them.",
        "Do not infer abandonment, failure, ongoing ownership, or organizational continuity from the Council withdrawal record or Jamie's statement.",
        "Do not project this intake item directly to the website; create and approve a sourced governed claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "INTAKE-INTERACTIVE-MEDIA-PRACTICE-2026-07-14",
      title: "Interactive media, sound, and public-memory practice",
      kind: "claim-candidate",
      summary: "Public project records recover three concrete interaction-design works by Jamie across 2010-2022: a texting installation built as a shared gallery dialogue and included in America: Now and Here, a Max/MSP audio-sorting experiment, and an app-accessed public-memory work created with Michael Rees. A fourth Matmos video credit remains a research lead because the source spells the collaborator's surname differently.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-NTER-CHNG-PITCH-2010-01-07",
        "SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23",
        "SRC-NTER-CHNG-PROJECT-SITE-2011",
        "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011",
        "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011",
        "SRC-NERMAN-AMERICA-NOW-HERE-2011",
        "SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013-02-27",
        "SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26",
        "SRC-CLAUDETTES-THEATRE-XR-ENSEMBLE-2022-10-29"
      ],
      relatedClaimIds: ["CLM-NTER-CHNG-AMERICA-NOW-HERE-2011"],
      relatedProofIds: [],
      candidateClaims: [
        "In 2010, Jamie co-designed NTER CHNG with Drew Bolton and Garrett Fuselier, an interactive installation that used a two-sided digital wall and visitor text messages to form an evolving gallery dialogue; Mary Nichols helped engineer and construct the wall.",
        "America: Now and Here's official sites document NTER CHNG in its 2011 Kansas City exhibition and credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists; a separate first-party article documents visitors using the text-message input and projected display.",
        "At a February 2013 Monthly Music Hackathon NYC, Jamie built a Max/MSP program that segmented an audio file and reordered the clips by pitch.",
        "In 2022, Jamie Burkart and Michael Rees created Claudette's Theatre On Wheels, an interactive work honoring Claudette's women-centered theater through short app-accessed performance clips."
      ],
      propositions: [
        {
          id: "PROP-NTER-CHNG-COLLABORATIVE-DESIGN-2010",
          text: "In 2010, Jamie co-designed NTER CHNG with Drew Bolton and Garrett Fuselier, an interactive installation that used a two-sided digital wall and visitor text messages to form an evolving gallery dialogue; Mary Nichols helped engineer and construct the wall.",
          status: "synthesis-with-boundary",
          sourceIds: [
            "SRC-NTER-CHNG-PITCH-2010-01-07",
            "SRC-NTER-CHNG-VIMEO-METADATA-2011-03-23",
            "SRC-NTER-CHNG-PROJECT-SITE-2011",
            "SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011"
          ],
          sourceSupport: ["January 2010 project context and interaction model", "Jamie, Drew, and Garrett designer and visual-artist credits", "Garrett programmer credit", "Mary Nichols engineering and construction contribution", "official description of the software, architecture, and many-to-many interaction"],
          boundaries: ["Preserve every named collaborator's credit.", "Do not assign Jamie an undocumented programming or wall-engineering role.", "Do not infer visitor scale or lasting audience outcome."],
          decisionUse: "Supports interaction design, collaborative prototyping, and the translation of participant input into a shared public interface."
        },
        {
          id: "PROP-NTER-CHNG-AMERICA-NOW-HERE-2011",
          text: "America: Now and Here's official sites document NTER CHNG in its 2011 Kansas City exhibition and credit Drew Bolton, Jamie Burkart, and Garrett Fuselier together as visual artists; a separate first-party article documents visitors using the text-message input and projected display.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-ANH-KC-NTER-CHNG-ARTIST-PAGE-2011", "SRC-ANH-NTER-CHNG-USE-ACCOUNT-2011", "SRC-NTER-CHNG-PROJECT-SITE-2011", "SRC-NERMAN-AMERICA-NOW-HERE-2011"],
          sourceSupport: ["official 2011 Kansas City visual-artist listing", "shared Drew Bolton, Jamie Burkart, and Garrett Fuselier credit", "NTER CHNG installation description", "first-party account of visitor text input and projected output", "institutional Kansas City launch context"],
          boundaries: ["Preserve all three visual-artist credits and do not infer a detailed task split.", "The Nerman Museum page supplies exhibition context but does not itself name NTER CHNG.", "Observed use is not attendance, reach, endorsement, adoption, or impact.", "Do not reproduce archived phone numbers, participant messages, or media without separate review."],
          decisionUse: "Adds direct first-party institutional evidence for exhibition inclusion and public operation while keeping the current hiring-site composition unchanged."
        },
        {
          id: "PROP-SORTED-AUDIO-MAX-MSP-2013",
          text: "At a February 2013 Monthly Music Hackathon NYC, Jamie built a Max/MSP program that segmented an audio file and reordered the clips by pitch.",
          status: "direct-support",
          sourceIds: ["SRC-MONTHLY-MUSIC-HACKATHON-SORTED-AUDIO-2013-02-27"],
          sourceSupport: ["Jamie maker credit", "Max/MSP implementation", "audio segmentation", "pitch-based sorting", "February 2013 event context"],
          boundaries: ["Describe this as a hackathon experiment, not a production audio product.", "Do not claim authorship of the source composition."],
          decisionUse: "Adds a compact, inspectable example of computational media prototyping and experimental toolmaking."
        },
        {
          id: "PROP-CLAUDETTES-THEATRE-INTERACTIVE-MEMORY-2022",
          text: "In 2022, Jamie Burkart and Michael Rees created Claudette's Theatre On Wheels, an interactive work honoring Claudette's women-centered theater through short app-accessed performance clips.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-CLAUDETTES-THEATRE-XR-ENSEMBLE-2022-10-29"],
          sourceSupport: ["Jamie Burkart and Michael Rees artist credit", "2022 project context", "short clips accessed through the app", "women-centered theater and public-memory purpose"],
          boundaries: ["Credit Michael Rees equally.", "Do not assign Jamie sole authorship of the app or underlying augmented-reality platform.", "Do not republish clips or personal details without rights review."],
          decisionUse: "Connects interactive design with archival care, collaborative authorship, and public memory."
        },
        {
          id: "PROP-MATMOS-TOUR-VIDEO-NAME-CONFLICT-2016",
          text: "A 2016 Matmos tour announcement credits specially prepared video to Matmos with a collaborator named Jamie Burkhardt.",
          status: "research-only",
          sourceIds: ["SRC-MATMOS-VAGUE-TERRAIN-VIDEO-2016-11-26"],
          sourceSupport: ["Matmos Ultimate Care II tour", "specially prepared performance video", "Jamie Burkhardt credit as printed"],
          boundaries: ["Do not silently normalize Burkhardt to Burkart.", "Do not attribute the credit to Jamie Burkart without corroboration.", "Do not infer the exact division of creative or technical labor."],
          decisionUse: "Preserves a potentially useful collaboration lead while keeping the identity conflict visible.",
          nextStep: "Recover an unambiguous Matmos credit, project file, dated correspondence suitable for public summary, or collaborator confirmation connecting Jamie Burkart to the 2016 tour video."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Can an unambiguous source resolve the Burkhardt/Burkart Matmos credit and identify Jamie's exact contribution?",
        "Which original project files or collaborator accounts identify Jamie's specific design decisions in NTER CHNG and Claudette's Theatre On Wheels?",
        "Can the NTER CHNG press-release PDF linked by the archived project site be recovered from another archive or collaborator copy?",
        "Do public-safe images or video stills survive with publication rights and collaborator consent?",
        "Which additional experimental media projects add a distinct action, output, or consequence rather than duplicating this thread?"
      ],
      boundaries: [
        "Do not use a project page that omits Jamie as person-specific role evidence.",
        "Preserve collaborator, programmer, construction, platform, and source-composition credit.",
        "Treat the Matmos item as unresolved research until the surname conflict is corroborated.",
        "Do not publish archived phone numbers, participant-submitted messages, or media without privacy and rights review.",
        "Not recovering the linked NTER CHNG press release is not evidence that it never existed.",
        "Do not project this intake item directly to the website; create and approve a governed claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-15",
      reviewedBy: ["Jamie Burkart", "Codex iCloud and Wayback archive review"]
    },
    {
      id: "INTAKE-CRS-OPERATING-AND-DATA-INFRASTRUCTURE-2026-07-14",
      title: "Commercial Rent Stabilization operating and public-data infrastructure",
      project: "fair-rent-nyc",
      kind: "claim-candidate",
      summary: "Protected working artifacts show Jamie designing both coalition operating infrastructure and privacy-preserving public-data proposals for Commercial Rent Stabilization. The sources support authorship of plans, minutes, a policy memo, and a public handout; they do not establish completion of every planned deliverable, coalition adoption, agency adoption, or policy outcomes.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-CRS-NINETY-DAY-OPERATING-PLAN-2026-04-06",
        "SRC-CRS-COLLABORATION-RUNNING-MINUTES-2026-04-29",
        "SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26",
        "SRC-CRS-FULLER-PUBLIC-BASELINE-HANDOUT-2026-03-27"
      ],
      relatedClaimIds: [],
      relatedProofIds: ["fair-rent-campaign-memory"],
      candidateClaims: [
        "In April 2026, Jamie authored a 90-day operating plan for Fair Rent NYC and Commercial Rent Stabilization that defined six shared public goods: a front door, recurring room, shared public line, story bank, implementation-readiness packet, and movement memory.",
        "In April 2026, Jamie created a running-minutes system that turned Commercial Rent Stabilization meetings into decisions, owners, open questions, and consent-aware story tracking across aligned city and state work.",
        "In November 2025, Jamie authored an NYC Artist Coalition memo proposing open aggregated indicator tables and a minimum public data suite for a future Commercial Rent Guidelines Board.",
        "In March 2026, Jamie designed a two-page School of Data handout specifying a privacy-preserving RPIE pilot with indicator, coverage and suppression, and methods tables."
      ],
      propositions: [
        {
          id: "PROP-CRS-NINETY-DAY-SHARED-GOODS-2026",
          text: "In April 2026, Jamie authored a 90-day operating plan for Fair Rent NYC and Commercial Rent Stabilization that defined six shared public goods: a front door, recurring room, shared public line, story bank, implementation-readiness packet, and movement memory.",
          status: "direct-support",
          sourceIds: ["SRC-CRS-NINETY-DAY-OPERATING-PLAN-2026-04-06"],
          sourceSupport: ["Jamie authorship", "April 2026 date", "six named shared goods", "movement architecture and digital stewardship role", "city and state companion lanes"],
          boundaries: ["This is evidence of plan authorship and operating design, not completion of every deliverable.", "Do not convert Jamie's role into sole campaign leadership or collective-outcome causality."],
          decisionUse: "Provides unusually concrete product-operations language for how Jamie turns coalition ambiguity into shared, usable infrastructure."
        },
        {
          id: "PROP-CRS-RUNNING-MINUTES-SYSTEM-2026",
          text: "In April 2026, Jamie created a running-minutes system that turned Commercial Rent Stabilization meetings into decisions, owners, open questions, and consent-aware story tracking across aligned city and state work.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-CRS-COLLABORATION-RUNNING-MINUTES-2026-04-29"],
          sourceSupport: ["Jamie ownership of the running-minutes action", "shared memory purpose", "decision and action tables", "owner and status fields", "consent labels", "city and state framing"],
          boundaries: ["The minutes document activity and structure, not completion of every action.", "Do not publish stakeholder names, contact details, private stories, or internal strategy from the source."],
          decisionUse: "Supports meeting synthesis, decision records, action tracking, privacy-aware knowledge design, and durable handoff work."
        },
        {
          id: "PROP-CRS-OPEN-DATA-FOUNDATION-MEMO-2025",
          text: "In November 2025, Jamie authored an NYC Artist Coalition memo proposing open aggregated indicator tables and a minimum public data suite for a future Commercial Rent Guidelines Board.",
          status: "direct-support",
          sourceIds: ["SRC-CRS-OPEN-DATA-FOUNDATION-MEMO-2025-11-26"],
          sourceSupport: ["Jamie signature", "November 2025 date", "aggregated indicator-table request", "minimum data-suite proposal", "confidentiality and vendor-data limits"],
          boundaries: ["Describe this as a proposal, not an adopted agency plan.", "Do not imply access to confidential filings or independent validation of every policy premise."],
          decisionUse: "Supports policy translation, public-data product requirements, privacy boundaries, and implementation-readiness work."
        },
        {
          id: "PROP-CRS-RPIE-PILOT-HANDOUT-2026",
          text: "In March 2026, Jamie designed a two-page School of Data handout specifying a privacy-preserving RPIE pilot with indicator, coverage and suppression, and methods tables.",
          status: "direct-support",
          sourceIds: ["SRC-CRS-FULLER-PUBLIC-BASELINE-HANDOUT-2026-03-27"],
          sourceSupport: ["Jamie authorship", "March 2026 date", "School of Data context", "two-page handout", "three-part pilot", "minimum fields", "explicit confidential-data exclusions"],
          boundaries: ["The handout specifies a pilot; it does not report a completed release or new empirical findings.", "Do not imply agency adoption or policy enactment."],
          decisionUse: "Shows Jamie converting a policy-neutral data opportunity into a small publishable v1 with fields, privacy controls, documentation, and user value."
        }
      ],
      tensions: [
        {
          id: "TENSION-CRS-ARTIFACTS-AND-THIRTY-PAGE-AGGREGATE",
          propositionIds: [
            "PROP-CRS-NINETY-DAY-SHARED-GOODS-2026",
            "PROP-CRS-RUNNING-MINUTES-SYSTEM-2026"
          ],
          relatedProofIds: ["fair-rent-campaign-memory"],
          description: "The protected sources establish authored operating artifacts and concrete coordination patterns, but this four-source review does not independently establish the governed proof's 30+ page aggregate or every organization named in that proof.",
          currentPosition: "Use the new sources for artifact-specific role claims. Keep the 30+ aggregate governed by its existing approved source basis until a reproducible public-safe inventory verifies its denominator, date range, and inclusion rules.",
          status: "open",
          correctionTriggers: [
            {
              id: "TRIGGER-CRS-THIRTY-PAGE-INVENTORY-CONFIRM",
              targetProofId: "fair-rent-campaign-memory",
              condition: "A public-safe inventory documents at least 30 qualifying pages, their date range and inclusion rules, and Jamie's stewardship relationship to them.",
              action: "confirm",
              requiredEvidence: ["public-safe page inventory", "count method", "time window", "role-to-artifact review"],
              reason: "The aggregate would then be reproducible without exposing the underlying private coalition archive."
            },
            {
              id: "TRIGGER-CRS-THIRTY-PAGE-INVENTORY-NARROW",
              targetProofId: "fair-rent-campaign-memory",
              condition: "A completed inventory materially reduces the qualifying page count or narrows Jamie's stewardship relationship to the included artifacts.",
              action: "narrow",
              requiredEvidence: ["completed inventory", "documented inclusion rules", "specific conflicting count or attribution evidence"],
              reason: "The public proof should retain the documented operating accomplishment without an unsupported aggregate.",
              replacementGuidance: "Replace the 30+ aggregate with the verified count or with artifact-specific wording about plans, minutes, decision records, action tracking, and public-data materials."
            }
          ]
        }
      ],
      researchQuestions: [
        "Which six shared goods were completed, adopted, or used, and what public-safe artifacts or collaborator accounts establish that status?",
        "What reproducible inclusion rule and date range support the existing 30+ page aggregate?",
        "Is there a stable public URL for the School of Data handout or a public event record documenting its presentation?",
        "Did any agency, Council, research, or coalition partner respond to or use either public-data proposal, and what public source can establish the result?"
      ],
      boundaries: [
        "Keep the underlying working documents, contact details, stakeholder lists, private stories, transcripts, and internal strategy outside the repository.",
        "Distinguish authored plans and specifications from completed implementation, coalition adoption, agency adoption, and policy outcomes.",
        "Do not use this source set to independently confirm the 30+ page aggregate.",
        "Do not project this intake item directly to the website; reconcile or create a governed claim and make a separate editorial decision first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
    },
    {
      id: "INTAKE-EVALS-AND-SOURCE-BACKED-SPRINT-2026-07-14",
      title: "AI evals completion and bounded source-backed sprint design",
      project: "source-backed-team-memory",
      kind: "claim-candidate",
      summary: "The job-hunt archive contains a completion certificate for AI Evals for Engineers and PMs and a protected preparation packet showing how Jamie translated source-backed team memory into a bounded discovery and prototype service. A separate cross-archive job-hunt map is retained only as context because it synthesizes sources rather than independently proving accomplishments.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-MAVEN-AI-EVALS-COMPLETION-2026",
        "SRC-SOURCE-BACKED-SPRINT-PREP-2026-06-30",
        "SRC-JOB-HUNT-CROSS-ARCHIVE-EVIDENCE-MAP-2026-07-03"
      ],
      relatedClaimIds: [],
      relatedProofIds: [
        "ai-evals-professional-development",
        "source-backed-team-memory-method"
      ],
      candidateClaims: [
        "Jamie's Maven certificate, issued to James Burkart, records completion of AI Evals for Engineers and PMs with Hamel Husain and Shreya Shankar in 2026.",
        "In June 2026, Jamie scoped a bounded source-backed team-memory discovery sprint around one approved non-sensitive or redacted source surface, a reviewable memory artifact, human correction, and a continue, revise, or stop recommendation."
      ],
      propositions: [
        {
          id: "PROP-AI-EVALS-COURSE-COMPLETION-2026",
          text: "Jamie's Maven certificate, issued to James Burkart, records completion of AI Evals for Engineers and PMs with Hamel Husain and Shreya Shankar in 2026.",
          status: "direct-support",
          sourceIds: ["SRC-MAVEN-AI-EVALS-COMPLETION-2026"],
          sourceSupport: ["James Burkart name", "course completion", "course title", "Hamel Husain and Shreya Shankar instructor credit", "Maven", "2026"],
          boundaries: ["Treat this as course completion, not professional certification authority or instructor affiliation.", "Do not publish private coursework, cohort material, or submissions."],
          decisionUse: "Adds direct credential evidence for Jamie's application-centric evaluation practice without overstating mastery or authority."
        },
        {
          id: "PROP-SOURCE-BACKED-SPRINT-SCOPE-2026",
          text: "In June 2026, Jamie scoped a bounded source-backed team-memory discovery sprint around one approved non-sensitive or redacted source surface, a reviewable memory artifact, human correction, and a continue, revise, or stop recommendation.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-SOURCE-BACKED-SPRINT-PREP-2026-06-30"],
          sourceSupport: ["bounded discovery and prototype scope", "one safe source surface", "reviewable memory artifact", "human review and correction", "privacy exclusions", "continue, revise, or stop output"],
          boundaries: ["This establishes service and experiment design, not client acceptance, payment, delivery, deployment, or outcome.", "Do not name the private collaborator, company context, transcript, or pricing."],
          decisionUse: "Shows product judgment: converting an emerging knowledge problem into a small test with explicit inputs, outputs, safety constraints, and a decision gate."
        },
        {
          id: "PROP-JOB-HUNT-EVIDENCE-MAP-CONTEXT-2026",
          text: "A July 2026 AI-assisted job-hunt map synthesizes project archives into a technical project management, product operations, civic systems, and knowledge-work narrative while flagging metrics that still require verification.",
          status: "context-only",
          sourceIds: ["SRC-JOB-HUNT-CROSS-ARCHIVE-EVIDENCE-MAP-2026-07-03"],
          sourceSupport: ["cross-archive synthesis", "professional framing", "source-routing guidance", "verification gaps"],
          boundaries: ["The map is not independent proof of any accomplishment it summarizes.", "Do not use its narrative confidence as a substitute for underlying sources."],
          decisionUse: "Preserves a useful evidence-routing and positioning artifact while preventing circular citation.",
          nextStep: "Resolve each material metric or role claim against its underlying public or protected source set before using the map's synthesis in governed claims."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which public-safe course artifacts, if any, can demonstrate Jamie's applied evaluation practice without exposing private cohort work?",
        "What public-safe prototype or completed evaluation can demonstrate use of the course methods beyond completion?",
        "Has a bounded source-backed sprint been accepted, delivered, reviewed, or measured, and what permissioned source could establish that status?",
        "Which claims in the cross-archive map remain unresolved after the current knowledge-bank ingestion?"
      ],
      boundaries: [
        "Do not publish private coursework, cohort material, collaborator identity, company context, transcripts, correspondence, or pricing.",
        "Do not convert a scoped proposal into a delivered client engagement or production deployment.",
        "Do not use the AI-assisted evidence map as independent proof of its own summaries.",
        "Do not project this intake item directly to the website; reconcile or create a governed claim and make a separate editorial decision first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex protected-source review"]
    },
    {
      id: "INTAKE-GDRIVE-196-RESIDENCY-OPERATIONS-2026-07-14",
      title: "196 Artists Residency selection, onboarding, and access operations",
      project: "196-sunday-dinner",
      kind: "claim-candidate",
      summary: "A Jamie-authored acceptance document and the surrounding Shared Drive structure recover a concrete residency workflow: review and select a proposal, welcome the resident, plan a setup conversation, configure the space around the work, arrange independent access, and retain reusable messaging and resident-specific workspaces. The evidence is one recovered workflow instance, not a complete account of every residency.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023-07-19",
        "SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"
      ],
      relatedClaimIds: [],
      relatedProofIds: ["sunday-dinner-196-participation-infrastructure"],
      candidateClaims: [
        "For 196 Artists Residency, Jamie paired proposal review and resident selection with pre-arrival onboarding, project-specific space configuration, independent access planning, reusable acceptance messaging, and resident-specific shared workspaces."
      ],
      propositions: [
        {
          id: "PROP-GDRIVE-196-RESIDENCY-WORKFLOW-2023",
          text: "For 196 Artists Residency, Jamie paired proposal review and resident selection with pre-arrival onboarding, project-specific space configuration, independent access planning, reusable acceptance messaging, and resident-specific shared workspaces.",
          status: "synthesis-with-boundary",
          sourceIds: [
            "SRC-GDRIVE-196-RESIDENCY-ACCEPTANCE-2023-07-19",
            "SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"
          ],
          sourceSupport: ["Jamie-authored acceptance document", "proposal review and selection", "planned video onboarding", "space configuration", "independent access planning", "message-template folder", "umbrella and resident-specific workspace structure"],
          boundaries: ["This is one recovered workflow instance and does not establish identical use for every resident.", "Do not publish the resident's identity, dates, contact request, address, access instructions, or private media.", "Do not infer the residency outcome, total resident count, or Jamie's sole operation of the program from this source set."],
          decisionUse: "Turns an abstract claim about hosting into a legible operating sequence spanning selection, onboarding, environment setup, access, and reusable handoff infrastructure."
        },
        {
          id: "PROP-GDRIVE-196-COLLABORATOR-WORKSPACE-PATTERN",
          text: "The surviving 196 Artists Residency archive includes an umbrella drive, reusable message templates, and collaborator-specific workspaces.",
          status: "context-only",
          sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"],
          sourceSupport: ["umbrella residency workspace", "message-template folder", "collaborator-specific drive and folder structure"],
          boundaries: ["Folder structure alone does not establish who created every workspace, who used it, or whether collaborators approved public description.", "Do not treat private workspace access as evidence of endorsement, publication permission, or program outcome."],
          decisionUse: "Preserves a research lead for the residency's repeatable handoff architecture without asking folder names to prove adoption.",
          nextStep: "Recover a public-safe program guide, collaborator confirmation, or multiple dated workflow artifacts showing how the shared-workspace pattern was used across residents."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which public-safe program documents establish the full selection, onboarding, residency, exhibition, and handoff lifecycle?",
        "Which residents or collaborators can confirm Jamie's operating role and the usefulness of the shared-workspace pattern?",
        "Which aggregate counts and date ranges can be reproduced without exposing participant records?",
        "Which rights-cleared images can show the configured space or public exhibition without revealing private access details?"
      ],
      boundaries: [
        "Keep resident identity, contact information, addresses, access instructions, correspondence, and unapproved media outside the repository.",
        "Describe the recovered workflow, not every residency or the complete program history.",
        "Preserve collaborator and resident agency; a Shared Drive is not publication consent.",
        "Do not project this intake item directly to the website; reconcile or strengthen the governed proof and make a separate editorial decision first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex Google Drive archive review"]
    },
    {
      id: "INTAKE-GDRIVE-VACANCY-ARCHIVE-AND-OVERVIEW-AUTOMATION-2026-07-14",
      title: "Longitudinal vacancy-source stewardship and mixed-format archive automation",
      kind: "claim-candidate",
      summary: "A structured vacancy-data archive and Jamie-authored overview generator recover a concrete archival-production practice. Jamie assembled a two-decade source collection with visible gaps and format transitions, then built a reusable tool for turning mixed folders into bounded review artifacts with extraction fallbacks, sampling controls, exclusions, line limits, and an explicit sensitive-output warning.",
      status: "claim-candidate",
      sourceIds: [
        "SRC-GDRIVE-VACANCY-ARCHIVE-INVENTORY-2026-03-04",
        "SRC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026-03-04"
      ],
      relatedClaimIds: [],
      relatedProofIds: ["technical-operations-operating-backbone"],
      candidateClaims: [
        "In March 2026, Jamie assembled a structured working archive of 80 distinct quarterly HUD-USPS vacancy snapshots spanning December 2005 through December 2025, plus 2010 and 2020 Census geography materials, while preserving a missing March 2019 quarter and a duplicated 2012 format transition as visible data-quality conditions.",
        "Jamie authored a reusable Bash tool that turns mixed-format project folders into bounded text overviews using PDF extraction and OCR fallback, DOCX conversion, controlled CSV and JSON sampling, dependency exclusions, output limits, and an explicit warning that generated overviews may expose sensitive data."
      ],
      propositions: [
        {
          id: "PROP-GDRIVE-VACANCY-ARCHIVE-TWO-DECADES-2026",
          text: "In March 2026, Jamie assembled a structured working archive of 80 distinct quarterly HUD-USPS vacancy snapshots spanning December 2005 through December 2025, plus 2010 and 2020 Census geography materials, while preserving a missing March 2019 quarter and a duplicated 2012 format transition as visible data-quality conditions.",
          status: "supported-with-boundary",
          sourceIds: ["SRC-GDRIVE-VACANCY-ARCHIVE-INVENTORY-2026-03-04"],
          sourceSupport: ["84 source packages representing 80 distinct quarters", "December 2005 through December 2025 range", "2010 and 2020 Census geography materials", "visible March 2019 gap", "visible 2012 overlap", "representative Jamie revision attribution across the archive's early, middle, and late periods"],
          boundaries: ["The inventory establishes source stewardship, not validation of every file or a gap-free series.", "Credit HUD-USPS and Census sources; do not imply Jamie created the underlying public data.", "Do not infer analysis findings, publication, pipeline automation, or policy use."],
          decisionUse: "Provides a specific data-operations example: longitudinal source acquisition, chronology, quality-gap visibility, geography support, and honest archive boundaries."
        },
        {
          id: "PROP-GDRIVE-PROJECT-OVERVIEW-GENERATOR-2026",
          text: "Jamie authored a reusable Bash tool that turns mixed-format project folders into bounded text overviews using PDF extraction and OCR fallback, DOCX conversion, controlled CSV and JSON sampling, dependency exclusions, output limits, and an explicit warning that generated overviews may expose sensitive data.",
          status: "direct-support",
          sourceIds: ["SRC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026-03-04"],
          sourceSupport: ["Jamie revision attribution", "Bash implementation", "directory inventory", "PDF and OCR path", "DOCX conversion path", "CSV and JSON controls", "skip rules", "line limits", "sensitive-output warning"],
          boundaries: ["The script requires human review before any generated overview is shared.", "Do not claim use across every project, complete extraction fidelity, independent security review, or production deployment."],
          decisionUse: "Shows Jamie converting archive orientation and handoff into a repeatable technical workflow while treating privacy as an operating constraint."
        },
        {
          id: "PROP-GDRIVE-ARCHIVAL-PRODUCTION-SYNTHESIS-2026",
          text: "Together, the source archive and overview generator show an archival-production practice that keeps source gaps visible and makes heterogeneous working material easier to review and hand off.",
          status: "synthesis-with-boundary",
          sourceIds: [
            "SRC-GDRIVE-VACANCY-ARCHIVE-INVENTORY-2026-03-04",
            "SRC-GDRIVE-PROJECT-OVERVIEW-SCRIPT-2026-03-04"
          ],
          sourceSupport: ["longitudinal source organization", "visible gap and overlap handling", "mixed-format extraction", "bounded summaries", "privacy warning"],
          boundaries: ["This synthesis describes the demonstrated artifacts, not every archive Jamie maintains.", "Usability for a recipient and adoption by a team remain unmeasured."],
          decisionUse: "Connects data stewardship, technical operations, documentation, privacy, and handoff as one inspectable working method."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which public-safe output demonstrates how the vacancy archive informed a reproducible analysis or decision?",
        "Can a checksum, manifest, or validation run establish file integrity and exact coverage across all 80 quarters?",
        "Which project teams have used the overview generator, and what public-safe collaborator account establishes reduced orientation or handoff effort?",
        "Which parts of the overview workflow should be extracted into a rights-cleared public utility or technical case study?"
      ],
      boundaries: [
        "Keep source files, generated private overviews, filesystem paths, contact data, and sensitive project contents outside the repository.",
        "Distinguish source acquisition and archive structure from validated analysis, publication, production deployment, and policy use.",
        "Preserve missing and duplicated periods as data-quality facts rather than smoothing them into a false complete series.",
        "Do not project this intake item directly to the website; create or strengthen a governed claim and make a separate editorial decision first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex Google Drive archive review"]
    },
    {
      id: "INTAKE-GDRIVE-SHARED-WORKSPACE-PRACTICE-2026-07-14",
      title: "Google Drive project workspace and handoff practice",
      kind: "project-lead",
      summary: "A comprehensive inventory of 110 Shared Drives and a bounded map of 24 professional project roots show a recurring archive topology: project-specific drives, collaborator-specific workspaces, dated delivery folders, reusable templates, and overlapping preservation across cloud systems. The topology is useful context for Jamie's handoff practice but does not by itself prove authorship, adoption, approval, or outcomes.",
      status: "researching",
      sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"],
      relatedClaimIds: [],
      relatedProofIds: [],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-GDRIVE-SHARED-WORKSPACE-TOPOLOGY-2026",
          text: "The Shared Drive inventory shows recurring project-specific, collaborator-specific, dated-delivery, and reusable-template workspace patterns across Jamie's professional archive.",
          status: "context-only",
          sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"],
          sourceSupport: ["110-drive inventory", "24 mapped professional roots", "project and collaborator workspace patterns", "dated handoff folders", "reusable template folders"],
          boundaries: ["Archive topology does not establish Jamie's authorship of each artifact or collaborators' adoption of each workflow.", "Do not publish private drive names, IDs, links, participant information, or sensitive folder contents."],
          decisionUse: "Supplies an archive-level research map for locating future handoff, operations, and collaboration evidence without treating the map as an accomplishment claim.",
          nextStep: "For each high-value project, associate a public artifact, Jamie-authored work product, revision history, or collaborator account with one bounded actor-action-output proposition."
        },
        {
          id: "PROP-GDRIVE-MEDIA-DELIVERABLES-ROLE-GAP-2026",
          text: "Several cultural-project drives preserve dated photographs, animations, and video deliverables, but the present review does not establish Jamie's exact role, the recipient's use, or publication rights.",
          status: "research-only",
          sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"],
          sourceSupport: ["dated media-delivery folders", "photograph, animation, and video file presence", "institutional and collaborator workspace context"],
          boundaries: ["File presence is not authorship, delivery acceptance, public credit, or consent to publish.", "Do not name a project or institution as a Jamie accomplishment until role evidence is recovered."],
          decisionUse: "Preserves a high-potential technical and creative production queue without laundering folder adjacency into credit.",
          nextStep: "Review revision attribution and public project credits, then seek collaborator confirmation or a public-safe handoff record for each media project considered for claim development."
        },
        {
          id: "PROP-GDRIVE-CROSS-ARCHIVE-DUPLICATION-2026",
          text: "The Google Drive review found intentional and accidental overlap with iCloud and local project archives, including duplicate public-facing artifacts and repeated generated project overviews.",
          status: "context-only",
          sourceIds: ["SRC-GDRIVE-SHARED-DRIVE-REVIEW-2026-07-14"],
          sourceSupport: ["duplicate artifact detection", "repeated overview files", "cross-cloud project preservation"],
          boundaries: ["Duplication does not establish which copy is canonical or current.", "Do not create duplicate knowledge-bank sources when an already registered artifact is substantively identical."],
          decisionUse: "Improves source governance by treating cross-cloud redundancy as a reconciliation problem rather than inflating the evidence count.",
          nextStep: "Create project-level canonical-source maps only where duplicate versions materially affect claim wording, chronology, or correction readiness."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which project workspaces contain authored handoff documents rather than media-only or archive-only traces?",
        "Which collaborator confirmations can establish adoption, usefulness, or outcome without exposing private correspondence?",
        "Which duplicate artifacts differ materially enough to require version reconciliation?",
        "Which media deliverables have public credits and publication rights suitable for a future portfolio projection?"
      ],
      boundaries: [
        "Do not publish Drive IDs, links, private names, sensitive folder titles, participant data, correspondence, legal or financial files, or unapproved media.",
        "Do not treat shared access as authorship, endorsement, adoption, acceptance, or consent.",
        "Keep personal, legal, relationship, financial, and synchronization-repair drives outside professional knowledge production.",
        "Do not project this intake item directly to the website; develop source-associated project claims first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-14",
      reviewedAt: "2026-07-14",
      reviewedBy: ["Jamie Burkart", "Codex Google Drive archive review"]
    }
  ],
  pages: [
    {
      id: "callnyc",
      surface: "/work/callnyc",
      sourceOrder: [
        "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
        "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
        "SRC-CALLNYC-POLITICO-2016-03-14",
        "SRC-CALLNYC-GITHUB-REPOSITORY",
        "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC",
        callNycFullPopulationCensusSourceId,
        "SRC-CALLNYC-X-PROFILE-2026-07-14"
      ],
      occurrences: [
        { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
        { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
        { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
        { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
        { id: "public-issue-pathway-census", claimId: "CLM-CALLNYC-PUBLIC-ISSUE-PATHWAY-CENSUS", projection: "case-study", sourceIds: [callNycFullPopulationCensusSourceId, "SRC-CALLNYC-X-PROFILE-2026-07-14"] },
        { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
        { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
      ]
    },
    {
      id: "kc-town-hall",
      surface: "/work/kc-town-hall",
      sourceOrder: [
        "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28",
        kcTownHallFullPopulationCensusSourceId,
        ...kcTownHallCouncilResponseSourceIds
      ],
      occurrences: [
        { id: "funding-sequence", claimId: "CLM-KC-TOWN-HALL-FUNDING-SEQUENCE", projection: "case-study", sourceIds: ["SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26", "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26", "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"] },
        { id: "public-operating-surface", claimId: "CLM-KC-TOWN-HALL-PUBLIC-OPERATING-SURFACE", projection: "case-study", sourceIds: [kcTownHallFullPopulationCensusSourceId, ...kcTownHallCouncilResponseSourceIds] }
      ]
    }
  ]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
