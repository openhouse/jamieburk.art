import { knowledgeBankSchema, type KnowledgeBank } from "./schema.ts";
import {
  campaignPressDistinctSourceIds,
  campaignPressIndexSourceIds,
  campaignPressPlacementCount,
  campaignPressSources,
  campaignPressSourceIds
} from "./campaignPress.ts";

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
    ...campaignPressSources
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
    }
  ],
  researchInquiries: [{
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
  }],
  corrections: [
    { id: "COR-CALLNYC-CHRONOLOGY-2026", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", previousText: "2014-2015", replacementText: "2016", reason: "Recovered event, data-release, and press chronology places the project in 2016.", decidedAt: "2026-07-11", affectedSurfaces: ["/work", "/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-SUPERLATIVE-2026", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", previousText: "first civic-data hackathon", replacementText: "first CouncilStat hackathon", reason: "The event-day Council post supports only the narrower phrase.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank", "resume"], status: "active" },
    { id: "COR-CALLNYC-EVENT-TIME-2026", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", previousText: "approximately 2:10 p.m. photograph timestamp as event time", replacementText: "1-3 p.m. from the Civic Hall announcement", reason: "Direct event-announcement evidence is stronger than participant photograph metadata for public event hours.", decidedAt: "2026-07-11", affectedSurfaces: ["/work/callnyc", "knowledge-bank"], status: "active" }
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
      title: "NYC Council member engagement with CallNYC on Twitter",
      project: "callnyc",
      kind: "metric-lead",
      summary: "Jamie remembers meaningful engagement with the @CallNYCapp account by New York City Council member accounts. The possible evidence includes follows, replies, mentions, retweets, quote posts, likes, and link sharing, but no complete defensible metric has yet been established.",
      status: "captured",
      sourceIds: [],
      relatedClaimIds: [],
      relatedProofIds: [],
      candidateClaims: [],
      propositions: [
        {
          id: "PROP-CALLNYC-COUNCIL-ENGAGEMENT-MEMORY",
          text: "Jamie remembers meaningful engagement with @CallNYCapp by New York City Council member and institutional accounts.",
          status: "memory-lead",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Meaningful engagement is not yet defined or counted.", "Historical account ownership, officeholder status, and interaction type require verification."],
          decisionUse: "Preserves a potentially useful adoption and public-sector resonance signal without publishing an unsupported metric.",
          nextStep: "Recover an authenticated export, API corpus, archive, or account-data download and classify every interaction by type, date, and account status."
        },
        {
          id: "PROP-CALLNYC-ENGAGEMENT-METRIC-DEFINITION",
          text: "Any future CallNYC Council-engagement metric must separate follows, replies, mentions, reposts, quote posts, likes, and link shares within a stated historical time window and denominator.",
          status: "research-only",
          sourceIds: [],
          sourceSupport: [],
          boundaries: ["Do not combine unlike interaction types into one promotional total.", "Do not treat a partial visible timeline as a complete corpus."],
          decisionUse: "Defines the minimum evidence contract for promoting the memory into a defensible metric claim.",
          nextStep: "Choose the recoverable corpus first, then document inclusion rules, exclusions, account classification, denominator, and time window before counting."
        }
      ],
      tensions: [],
      researchQuestions: [
        "Which Council member and institutional Council accounts engaged with @CallNYCapp, in what ways, and on what dates?",
        "Can the complete account timeline and engagement graph be recovered from an authenticated export, API, archive, or Jamie's account data?",
        "Which interactions are attributable to officeholders, staff-managed accounts, institutional accounts, or later handle changes?",
        "What denominator and time window would make any engagement statistic intelligible rather than promotional?"
      ],
      boundaries: [
        "Do not publish counts derived from an incomplete or blocked timeline.",
        "Separate follows, likes, replies, mentions, reposts, and link shares rather than collapsing them into one engagement number.",
        "Preserve historical officeholder and account-status context.",
        "Do not project this intake item directly to the website; create and approve a sourced metric claim first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-12",
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex intake review"]
    },
    {
      id: "INTAKE-KC-TOWN-HALL-CCED-ALLOCATION-2026-07-13",
      title: "KC Town Hall CCED recommendation, Council appropriation, and later reappropriation",
      project: "kc-town-hall",
      kind: "source-link",
      summary: "Official Kansas City records show that the CCED Sales Tax Board recommended $490,539 for KC Town Hall, the City Council accepted the recommendation and appropriated that amount in 2019, and the Council later recorded that KC Town Hall withdrew and the unused funds were reappropriated in 2024.",
      status: "researching",
      sourceIds: [
        "SRC-KCMO-CCED-RESOLUTION-190649-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-190642-2019-09-26",
        "SRC-KCMO-CCED-ORDINANCE-240317-2024-03-28"
      ],
      relatedClaimIds: [],
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
          description: "The governed proof currently says the work included a $490,539 public funding recommendation and instructs editors to retain recommendation-only language unless final funding is confirmed. Official records now establish Council acceptance and appropriation, while also establishing that the allocation was later unused and reappropriated.",
          currentPosition: "The recommendation wording remains technically true but materially understates the 2019 Council action. A stronger public claim must say Council accepted and appropriated the amount while explicitly withholding receipt, spending, and completion and preserving the 2024 withdrawal outcome.",
          status: "open",
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
        "Do not project this intake item directly to the website; reconcile and approve the governed proof first."
      ],
      projectionStatus: "no-public-projection",
      receivedAt: "2026-07-13",
      reviewedAt: "2026-07-13",
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
    }
  ],
  pages: [{
    id: "callnyc",
    surface: "/work/callnyc",
    sourceOrder: [
      "SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433",
      "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368",
      "SRC-CALLNYC-POLITICO-2016-03-14",
      "SRC-CALLNYC-GITHUB-REPOSITORY",
      "SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"
    ],
    occurrences: [
      { id: "event-date-time", claimId: "CLM-CALLNYC-HACKATHON-DATE-TIME", projection: "case-study", sourceIds: ["SRC-CALLNYC-CIVIC-HALL-POST-693124020917522433", "SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "first-councilstat-hackathon", claimId: "CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-POST-693509031768506368"] },
      { id: "independent-follow-on", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14", "SRC-CALLNYC-GITHUB-REPOSITORY"] },
      { id: "event-branding", claimId: "CLM-CALLNYC-EVENT-BRANDING", projection: "case-study", sourceIds: ["SRC-CALLNYC-NYC-COUNCIL-HACKATHON-GRAPHIC"] },
      { id: "press-coverage", claimId: "CLM-CALLNYC-INDEPENDENT-FOLLOW-ON", projection: "case-study", sourceIds: ["SRC-CALLNYC-POLITICO-2016-03-14"] },
      { id: "archived-status", claimId: "CLM-CALLNYC-ARCHIVED-UNOFFICIAL-STATUS", projection: "case-study", sourceIds: ["SRC-CALLNYC-GITHUB-REPOSITORY", "SRC-CALLNYC-POLITICO-2016-03-14"] }
    ]
  }]
} satisfies KnowledgeBank;

export const knowledgeBank = knowledgeBankSchema.parse(knowledgeBankInput);
