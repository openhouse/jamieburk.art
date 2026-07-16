import type {
  ClaimRecord,
  IntakeRecord,
  ResearchTask,
  SourceReading,
  SourceRecord
} from "./schema.ts";

type CampaignKey = "letnycdance" | "talksnotraids" | "savenycspaces" | "fairrentnyc";

interface CampaignPressPlacement {
  campaign: CampaignKey;
  sourceId: string;
  organization: string;
  title: string;
  listedUrl: string;
  canonicalUrl?: string;
  archiveUrl?: string;
  preservationStatus?: "live" | "archived" | "dead";
  existingSource?: true;
}

const campaignConfigs = {
  letnycdance: {
    label: "Let NYC Dance",
    indexIntakeId: "INTAKE-NYCARTC-LETNYCDANCE-PRESS-INDEX-2026",
    indexSourceId: "SRC-NYCARTC-LETNYCDANCE-PRESS-INDEX-2026",
    indexReadingId: "READ-NYCARTC-LETNYCDANCE-PRESS-INDEX-2026",
    taskId: "TASK-NYCARTC-LETNYCDANCE-PRESS-CLOSE-READ",
    sourceUrl: "https://letnycdance.nycartc.com/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-CABARET-LAW-REPEAL"],
    project: "nyc-artist-coalition",
    expectedCount: 21
  },
  talksnotraids: {
    label: "Talks Not Raids",
    indexIntakeId: "INTAKE-NYCARTC-TALKSNOTRAIDS-PRESS-INDEX-2026",
    indexSourceId: "SRC-NYCARTC-TALKSNOTRAIDS-PRESS-INDEX-2026",
    indexReadingId: "READ-NYCARTC-TALKSNOTRAIDS-PRESS-INDEX-2026",
    taskId: "TASK-NYCARTC-TALKSNOTRAIDS-PRESS-CLOSE-READ",
    sourceUrl: "https://talksnotraids.com/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-TALKS-NOT-RAIDS", "ENT-MARCH-OPERATIONS"],
    project: "nyc-artist-coalition",
    expectedCount: 7
  },
  savenycspaces: {
    label: "Save NYC Spaces",
    indexIntakeId: "INTAKE-NYCARTC-SAVENYCSPACES-PRESS-INDEX-2026",
    indexSourceId: "SRC-NYCARTC-SAVENYCSPACES-PRESS-INDEX-2026",
    indexReadingId: "READ-NYCARTC-SAVENYCSPACES-PRESS-INDEX-2026",
    taskId: "TASK-NYCARTC-SAVENYCSPACES-PRESS-CLOSE-READ",
    sourceUrl: "https://savenycspaces.nycartc.com/",
    entityIds: ["ENT-NYC-ARTIST-COALITION", "ENT-OFFICE-OF-NIGHTLIFE"],
    project: "nyc-artist-coalition",
    expectedCount: 8
  },
  fairrentnyc: {
    label: "FairRentNYC",
    indexIntakeId: "INTAKE-FAIRRENTNYC-PRESS-INDEX-2021",
    indexSourceId: "SRC-FAIRRENTNYC-PRESS-INDEX-2021",
    indexReadingId: "READ-FAIRRENTNYC-PRESS-INDEX-2021",
    taskId: "TASK-FAIRRENTNYC-PRESS-CLOSE-READ",
    sourceUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    entityIds: ["ENT-FAIR-RENT-NYC", "ENT-NYC-ARTIST-COALITION"],
    project: "fair-rent-nyc",
    expectedCount: 9
  }
} as const;

export const campaignPressPlacements = [
  { campaign: "letnycdance", sourceId: "SRC-PRESS-NYT-CABARET-REPEAL-2017", organization: "The New York Times", title: "After 91 Years, New York Will Let Its People Boogie", listedUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-NEW-YORKER-DANCE-OUTLAWS-2017", organization: "The New Yorker", title: "Dance Outlaws Fight for the Right to Party", listedUrl: "http://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-NYPOST-CABARET-SCRAP-2017", organization: "New York Post", title: "De Blasio might scrap ridiculous law banning dancing in bars", listedUrl: "http://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-VILLAGE-VOICE-CABARET-LAW-2017", organization: "The Village Voice", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", listedUrl: "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", archiveUrl: "https://web.archive.org/web/20170504184338/http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", preservationStatus: "archived" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-NYDAILYNEWS-FOOTLOOSE-2017", organization: "New York Daily News", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", listedUrl: "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553", canonicalUrl: "https://www.nydailynews.com/2017/06/19/footloose-new-yorkers-go-after-archaic-cabaret-law-banning-dancing-in-most-city-bars/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-WNYC-CABARET-LAW-2017", organization: "WNYC", title: "The Bureaucratic Dance to End NYC Cabaret Law", listedUrl: "http://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law", canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-FORBES-CABARET-REPEAL-2017", organization: "Forbes", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", listedUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort", canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/" },
  { campaign: "letnycdance", sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", organization: "Gothamist", title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law", listedUrl: "http://gothamist.com/2017/06/19/cabaret_law_nyc.php", existingSource: true },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-SMITHSONIAN-CABARET-2017", organization: "Smithsonian Magazine", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", listedUrl: "http://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-DNAINFO-CABARET-2017", organization: "DNAinfo", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", listedUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn" },
  { campaign: "letnycdance", sourceId: "SRC-NYCARTC-NPR-CABARET-2017", organization: "NPR", title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", existingSource: true },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-CRAINS-CABARET-2017", organization: "Crain's New York", title: "City Council moves to repeal 'racist' cabaret law", listedUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", archiveUrl: "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", preservationStatus: "archived" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-METRO-CABARET-2017", organization: "Metro NY", title: "Arts advocates renew call to end New York City's antiquated cabaret laws", listedUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", archiveUrl: "https://web.archive.org/web/20170817001608/http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", preservationStatus: "archived" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-BROOKLYN-EAGLE-CABARET-2017", organization: "Brooklyn Daily Eagle", title: "There are only 17 places in Brooklyn where you can legally dance", listedUrl: "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance", canonicalUrl: "https://brooklyneagle.com/55343/there-are-only-17-places-in-brooklyn-where-you-can-legally-dance/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-BROOKLYN-PAPER-CABARET-2017", organization: "Brooklyn Paper", title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", listedUrl: "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html", canonicalUrl: "https://www.brooklynpaper.com/think-i-better-dance-now-two-bushwick-councilmen-fight-for-your-right-to-party/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-TIMEOUT-CABARET-2017", organization: "Time Out New York", title: "It's time to make it legal to dance anywhere the f*ck you want in New York", listedUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-QUEENS-CHRONICLE-CABARET-2017", organization: "Queens Chronicle", title: "Aged Cabaret Law finally at its end?", listedUrl: "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-BEDFORD-CABARET-SUPPORT-2017", organization: "Bedford + Bowery", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", listedUrl: "http://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-VICE-NYCARTC-DIY-2017", organization: "Vice Thump", title: "NYC Artist Coalition, Dance Liberation Network, and DIY Spaces", listedUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", archiveUrl: "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", preservationStatus: "archived" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-SFGATE-NO-DANCING-2017", organization: "SFGate", title: "New York City apparently has a 'No Dancing' law", listedUrl: "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", preservationStatus: "dead" },
  { campaign: "letnycdance", sourceId: "SRC-PRESS-MIXMAG-NO-DANCING-2017", organization: "Mixmag", title: "NYC activists aim to repeal local 'no dancing law'", listedUrl: "http://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news" },

  { campaign: "talksnotraids", sourceId: "SRC-PRESS-GOTHAMIST-MARCH-RAIDS-2019", organization: "Gothamist", title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", listedUrl: "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php", canonicalUrl: "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-VILLAGE-VOICE-PALISADES-2016", organization: "The Village Voice", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", listedUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", canonicalUrl: "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-BEDFORD-MARCH-RAIDS-2019", organization: "Bedford + Bowery", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", listedUrl: "http://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-BAFFLER-MARCH-2017", organization: "The Baffler", title: "Cut the Music: Inside M.A.R.C.H., the NYPD's secret, venue-closing task force", listedUrl: "https://thebaffler.com/latest/cut-the-music-pelly" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-NYT-NIGHTCLUB-CRACKDOWN-2002", organization: "The New York Times", title: "City Cracks Down on Nightclubs and May Revise Its Policies", listedUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-AMNY-NIGHTLIFE-MAYOR-2018", organization: "amNewYork", title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'", listedUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726", canonicalUrl: "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/" },
  { campaign: "talksnotraids", sourceId: "SRC-PRESS-OBSERVER-NIGHTLIFE-MAYOR-2018", organization: "Observer", title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", listedUrl: "https://observer.com/2018/03/new-york-city-night-mayor/" },

  { campaign: "savenycspaces", sourceId: "SRC-PRESS-NYDAILYNEWS-OFFICE-NIGHTLIFE-2017", organization: "New York Daily News", title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", listedUrl: "http://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451", canonicalUrl: "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/" },
  { campaign: "savenycspaces", sourceId: "SRC-PRESS-NYPOST-OFFICE-NIGHTLIFE-2017", organization: "New York Post", title: "De Blasio's newest city agency: Office of Nightlife", listedUrl: "http://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/" },
  { campaign: "savenycspaces", sourceId: "SRC-PRESS-GOTHAMIST-OFFICE-NIGHTLIFE-2017", organization: "Gothamist", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", listedUrl: "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php", canonicalUrl: "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor" },
  { campaign: "savenycspaces", sourceId: "SRC-NYCARTC-NPR-CABARET-2017", organization: "NPR", title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", existingSource: true },
  { campaign: "savenycspaces", sourceId: "SRC-PRESS-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017", organization: "Brooklyn Daily Eagle", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", listedUrl: "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", archiveUrl: "https://web.archive.org/web/20180623155344/http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", preservationStatus: "archived" },
  { campaign: "savenycspaces", sourceId: "SRC-PRESS-CITYLAB-NIGHT-MAYOR-2017", organization: "CityLab", title: "How to Be a Good 'Nightlife Mayor'", listedUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", archiveUrl: "https://web.archive.org/web/20191214060044/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", preservationStatus: "archived" },
  { campaign: "savenycspaces", sourceId: "SRC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017", organization: "Bedford + Bowery", title: "What Can the Nightlife Mayor Do? The DIY Scene Discusses", listedUrl: "http://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", existingSource: true },
  { campaign: "savenycspaces", sourceId: "SRC-PRESS-BROOKLYNVEGAN-OFFICE-NIGHTLIFE-2017", organization: "BrooklynVegan", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", listedUrl: "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/" },

  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-NYT-EMPTY-STOREFRONTS-2018", organization: "The New York Times", title: "The Empty Storefronts of New York: A Panoramic View", listedUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-NYDAILYNEWS-COMMERCIAL-RENT-2019", organization: "New York Daily News", title: "Pols, small-biz owners rally for law limiting rent hikes on NYC's beleaguered mom-and-pop shops", listedUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html", canonicalUrl: "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-CURBED-COMMERCIAL-RENT-2019", organization: "Curbed", title: "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?", listedUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", preservationStatus: "dead" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-AMNY-VACANT-STOREFRONTS-2019", organization: "amNewYork", title: "The sad story behind NYC vacant storefronts", listedUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055", canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-ATLANTIC-MANHATTAN-RETAIL-2018", organization: "The Atlantic", title: "What's the Matter With Manhattan?", listedUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-GOTHAMIST-NEIRS-RENT-2020", organization: "Gothamist", title: "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", listedUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-QNS-COMMERCIAL-RENT-2019", organization: "QNS", title: "Sunnyside councilman, small business owners rally for commercial rent control", listedUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", canonicalUrl: "https://qns.com/2019/12/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-SUNNYSIDE-COMMERCIAL-RENT-2019", organization: "Sunnyside Post", title: "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes", listedUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes" },
  { campaign: "fairrentnyc", sourceId: "SRC-PRESS-JEWISH-VOICE-MOM-POP-2019", organization: "The Jewish Voice", title: "Brooklyn Councilman Aims to Save Mom-and-Pop Retail Outlets", listedUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", canonicalUrl: "https://thejewishvoice.com/local/new-york/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/" }
] satisfies CampaignPressPlacement[];

const campaignEntries = Object.entries(campaignConfigs) as Array<
  [CampaignKey, (typeof campaignConfigs)[CampaignKey]]
>;

const uniqueNewArticles = [
  ...new Map(
    campaignPressPlacements
      .filter((placement) => !placement.existingSource)
      .map((placement) => [placement.sourceId, placement])
  ).values()
];

export const campaignPressNewArticleSourceIds = uniqueNewArticles.map(
  (placement) => placement.sourceId
);

function placementsFor(campaign: CampaignKey) {
  return campaignPressPlacements.filter((placement) => placement.campaign === campaign);
}

function campaignsFor(sourceId: string) {
  return [
    ...new Set(
      campaignPressPlacements
        .filter((placement) => placement.sourceId === sourceId)
        .map((placement) => placement.campaign)
    )
  ];
}

function intakeIdForSource(sourceId: string) {
  return `INTAKE-${sourceId.replace(/^SRC-/, "")}`;
}

export const campaignPressIntake: IntakeRecord[] = [
  ...campaignEntries.map(([, config]) => ({
    id: config.indexIntakeId,
    receivedAt: "2026-07-13",
    kind: "public-url" as const,
    publicSafeSummary: `${config.label} campaign press section preserving ${config.expectedCount} article placements for accession and later article-level close reading.`,
    submittedBy: "Jamie Burkart",
    sourceUrl: config.sourceUrl,
    entityIds: [...config.entityIds],
    disposition: "research-open" as const,
    sourceIds: [config.indexSourceId],
    claimIds: ["CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS"],
    researchTaskIds: [config.taskId],
    rawMaterialPolicy: "public-source-only" as const
  })),
  ...uniqueNewArticles.map((placement) => ({
    id: intakeIdForSource(placement.sourceId),
    receivedAt: "2026-07-13",
    kind: "public-url" as const,
    publicSafeSummary: `${placement.organization} article listed in the ${campaignsFor(placement.sourceId).map((campaign) => campaignConfigs[campaign].label).join(" and ")} press section.`,
    submittedBy: "NYC Artist Coalition campaign press-index recovery",
    sourceUrl: placement.canonicalUrl ?? placement.listedUrl,
    entityIds: [
      ...new Set(
        campaignsFor(placement.sourceId).flatMap(
          (campaign) => [...campaignConfigs[campaign].entityIds]
        )
      )
    ],
    disposition: "research-open" as const,
    sourceIds: [placement.sourceId],
    claimIds: [],
    researchTaskIds: [],
    rawMaterialPolicy: "public-source-only" as const
  }))
];

export const campaignPressSources: SourceRecord[] = [
  ...campaignEntries.map(([campaign, config]) => ({
    id: config.indexSourceId,
    title: `${config.label} press section`,
    organization: "NYC Artist Coalition campaign",
    kind: campaign === "fairrentnyc" ? "archived-web-capture" as const : "institutional-web-page" as const,
    visibility: "public" as const,
    preservationStatus: campaign === "fairrentnyc" ? "archived" as const : "live" as const,
    accessedAt: "2026-07-13",
    canonicalUrl: campaign === "fairrentnyc" ? "https://fairrentnyc.nycartc.com/" : config.sourceUrl,
    archiveUrl: campaign === "fairrentnyc" ? config.sourceUrl : undefined,
    preferredPublicUrl: campaign === "fairrentnyc" ? "archive" as const : "canonical" as const,
    publicCitation: `NYC Artist Coalition campaign, '${config.label}' press section, accessed July 13, 2026.`,
    publicNote: `${config.label} preserves ${config.expectedCount} press placements. The index establishes campaign selection and article metadata, not the truth of every linked article or the completeness of coverage.`,
    intakeIds: [config.indexIntakeId],
    supportsGenerally: [`the campaign press section lists ${config.expectedCount} article placements`],
    doesNotEstablish: ["that the list is exhaustive", "audience reach or sentiment", "endorsement by the publishers", "Jamie's authorship of the articles", "campaign causation for policy outcomes"]
  })),
  ...uniqueNewArticles.map((placement) => {
    const status: SourceRecord["preservationStatus"] =
      placement.preservationStatus ?? "live";
    return {
      id: placement.sourceId,
      title: placement.title,
      organization: placement.organization,
      kind: "published-article" as const,
      visibility: "public" as const,
      preservationStatus: status,
      accessedAt: "2026-07-13",
      canonicalUrl: placement.canonicalUrl ?? placement.listedUrl,
      archiveUrl: placement.archiveUrl,
      preferredPublicUrl: status === "archived" ? "archive" as const : "canonical" as const,
      publicCitation: `${placement.organization}, '${placement.title}'.`,
      publicNote: `Article listed by the ${campaignsFor(placement.sourceId).map((campaign) => campaignConfigs[campaign].label).join(" and ")} campaign press section. Metadata is accessioned; article-level propositions remain queued for close reading.`,
      intakeIds: [intakeIdForSource(placement.sourceId)],
      supportsGenerally: [],
      doesNotEstablish: ["a Jamie-specific role claim before close reading", "campaign causation", "favorable sentiment", "audience reach", "endorsement by the publisher"]
    };
  })
];

export const campaignPressReadings: SourceReading[] = [
  ...campaignEntries.map(([campaign, config]) => ({
    id: config.indexReadingId,
    sourceId: config.indexSourceId,
    status: "closely-read" as const,
    readAt: "2026-07-13",
    propositions: placementsFor(campaign).map((placement, index) => ({
      id: `PROP-PRESS-${campaign.toUpperCase()}-${String(index + 1).padStart(2, "0")}`,
      text: `${config.label} lists ${placement.organization}'s '${placement.title}' in its press section.`,
      relationToJamie: "project-context" as const,
      supportTags: [`press-index-${campaign}`, "campaign-press-placement"],
      confidence: "high" as const,
      locator: `Press item ${index + 1}`
    })),
    limitations: [
      "Campaign selection establishes that the article was presented as relevant press context, not that every statement in it is verified.",
      "The press section does not establish Jamie's authorship, audience reach, sentiment, completeness, or causal credit."
    ],
    researchTaskIds: [config.taskId]
  })),
  ...uniqueNewArticles.map((placement) => ({
    id: `READ-${placement.sourceId.replace(/^SRC-/, "")}`,
    sourceId: placement.sourceId,
    status: "queued" as const,
    propositions: [],
    limitations: [
      "The article's metadata and campaign placement are preserved, but its text has not yet been decomposed into source-level propositions.",
      "Do not attach this article to a Jamie-specific or causal claim until close reading records what it supports and does not support."
    ],
    researchTaskIds: campaignsFor(placement.sourceId).map(
      (campaign) => campaignConfigs[campaign].taskId
    )
  }))
];

export const campaignPressClaims = [
  {
    id: "CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS",
    project: "nyc-artist-coalition",
    internalClaim: "Four NYC Artist Coalition campaign press sections preserve 45 placements representing 44 distinct articles: 21 on Let NYC Dance, seven on Talks Not Raids, eight on Save NYC Spaces, and nine in the archived FairRentNYC site.",
    status: "confirmed-with-boundary",
    maturity: "corroborated",
    intakeIds: campaignEntries.map(([, config]) => config.indexIntakeId),
    requiredSupportTags: campaignEntries.map(([campaign]) => `press-index-${campaign}`),
    projections: [],
    evidence: campaignEntries.map(([campaign, config]) => ({
      sourceId: config.indexSourceId,
      relationship: "direct-support" as const,
      supports: [`${config.expectedCount} ${config.label} press placements`],
      propositionIds: placementsFor(campaign).map(
        (_, index) => `PROP-PRESS-${campaign.toUpperCase()}-${String(index + 1).padStart(2, "0")}`
      ),
      confidence: "high" as const,
      renderCitation: false
    })),
    boundaries: [
      "Count campaign placements separately from distinct articles because NPR's Cabaret Law article appears on two campaign sites.",
      "Treat the press sections as project-owned indexes and close-read the independent articles before using them to support role, outcome, or causal claims."
    ],
    antiClaims: [
      "The campaign press corpus proves audience reach, favorable sentiment, or endorsement.",
      "Jamie authored the independent press articles.",
      "Press volume proves Jamie or NYC Artist Coalition caused Cabaret Law repeal, Office of Nightlife creation, MARCH changes, or commercial-rent policy outcomes.",
      "The four press sections are a complete record of all coverage."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const campaignPressResearchTasks: ResearchTask[] = campaignEntries.map(
  ([campaign, config]) => ({
    id: config.taskId,
    project: config.project,
    question: `What role, context, outcome, and limitation propositions can be responsibly extracted from the ${config.expectedCount} articles placed in the ${config.label} press section?`,
    status: "open" as const,
    priority: campaign === "talksnotraids" || campaign === "savenycspaces" ? "high" as const : "medium" as const,
    openedAt: "2026-07-13",
    intakeIds: [config.indexIntakeId],
    sourceIds: [
      config.indexSourceId,
      ...new Set(placementsFor(campaign).map((placement) => placement.sourceId))
    ],
    claimIds: [],
    nextActions: [
      "Recover live or archived article text and preserve the campaign-listed URL as provenance.",
      "Extract atomic propositions that distinguish Jamie's direct role, collective work, project context, institutional outcome, and reported opinion.",
      "Record what each article cannot establish before connecting it to a mature claim.",
      "Deduplicate syndicated or repeated coverage without erasing its placement in more than one campaign."
    ]
  })
);
