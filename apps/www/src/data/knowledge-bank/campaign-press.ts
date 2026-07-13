import type { IntakeRecord, SourceRecord } from "./schema.ts";

export type CampaignPressId =
  | "let-nyc-dance"
  | "talks-not-raids"
  | "save-nyc-spaces"
  | "fair-rent-nyc";

type CampaignPressEntry = {
  id: string;
  organization: string;
  title: string;
  indexedUrl: string;
  campaigns: CampaignPressId[];
};

export const campaignPressEntries: CampaignPressEntry[] = [
  { id: "SRC-PRESS-LET-NYT-BOOGIE-2017", organization: "The New York Times", title: "After 91 Years, New York Will Let Its People Boogie", indexedUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017", organization: "The New Yorker", title: "Dance Outlaws Fight for the Right to Party", indexedUrl: "http://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-NYPOST-SCRAP-DANCING-LAW-2017", organization: "New York Post", title: "De Blasio might scrap ridiculous law banning dancing in bars", indexedUrl: "http://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-VILLAGE-VOICE-CABARET-LAW-2017", organization: "The Village Voice", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", indexedUrl: "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-NYDAILYNEWS-FOOTLOOSE-2017", organization: "New York Daily News", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", indexedUrl: "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-WNYC-BUREAUCRATIC-DANCE-2017", organization: "WNYC", title: "The Bureaucratic Dance to End NYC Cabaret Law", indexedUrl: "http://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-FORBES-REPEAL-2017", organization: "Forbes", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", indexedUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort", campaigns: ["let-nyc-dance"] },
  { id: "SRC-NYCARTC-CABARET-GOTHAMIST-2017", organization: "Gothamist", title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law", indexedUrl: "http://gothamist.com/2017/06/19/cabaret_law_nyc.php", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-SMITHSONIAN-DANCING-RULE-2017", organization: "Smithsonian Magazine", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", indexedUrl: "http://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-DNAINFO-CITY-STONEWALLS-2017", organization: "DNAinfo", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", indexedUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn", campaigns: ["let-nyc-dance"] },
  { id: "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017", organization: "NPR Music", title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", indexedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", campaigns: ["let-nyc-dance", "save-nyc-spaces"] },
  { id: "SRC-PRESS-LET-CRAINS-CABARET-REPEAL-2017", organization: "Crain's New York", title: "City Council moves to repeal 'racist' cabaret law", indexedUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-METRO-ARTS-ADVOCATES-2017", organization: "Metro New York", title: "Arts advocates renew call to end New York City's antiquated cabaret laws", indexedUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-BROOKLYN-EAGLE-17-PLACES-2017", organization: "Brooklyn Daily Eagle", title: "There are only 17 places in Brooklyn where you can legally dance", indexedUrl: "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-BROOKLYN-PAPER-RIGHT-TO-PARTY-2017", organization: "Brooklyn Paper", title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", indexedUrl: "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-TIMEOUT-LEGAL-DANCE-2017", organization: "Time Out New York", title: "It's time to make it legal to dance anywhere the f*ck you want in New York", indexedUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-QUEENS-CHRONICLE-CABARET-END-2017", organization: "Queens Chronicle", title: "Aged Cabaret Law finally at its end?", indexedUrl: "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-BEDFORD-REPEAL-SUPPORT-2017", organization: "Bedford + Bowery", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", indexedUrl: "http://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", campaigns: ["let-nyc-dance"] },
  { id: "SRC-VICE-NYCARTC-DCA-2017", organization: "VICE", title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety", indexedUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-SFGATE-NO-DANCING-2017", organization: "SFGate", title: "New York City apparently has a 'No Dancing' law", indexedUrl: "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-LET-MIXMAG-ACTIVISTS-2017", organization: "Mixmag", title: "NYC activists aim to repeal local 'No Dancing Law'", indexedUrl: "http://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", campaigns: ["let-nyc-dance"] },
  { id: "SRC-PRESS-TNR-GOTHAMIST-MARCH-RAIDS-2019", organization: "Gothamist", title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", indexedUrl: "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-VILLAGE-VOICE-PALISADES-2016", organization: "The Village Voice", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", indexedUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-BEDFORD-DISCO-DISCORD-2019", organization: "Bedford + Bowery", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", indexedUrl: "http://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-BAFFLER-CUT-MUSIC-2018", organization: "The Baffler", title: "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force", indexedUrl: "https://thebaffler.com/latest/cut-the-music-pelly", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-NYT-NIGHTCLUB-CRACKDOWN-2002", organization: "The New York Times", title: "City Cracks Down on Nightclubs and May Revise Its Policies", indexedUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-AMNY-NIGHTLIFE-MAYOR-2018", organization: "amNewYork", title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'", indexedUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-TNR-OBSERVER-NIGHT-MAYOR-2018", organization: "Observer", title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", indexedUrl: "https://observer.com/2018/03/new-york-city-night-mayor/", campaigns: ["talks-not-raids"] },
  { id: "SRC-PRESS-SAVE-DAILYNEWS-OFFICE-NIGHTLIFE-2017", organization: "New York Daily News", title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", indexedUrl: "http://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-SAVE-NYPOST-OFFICE-NIGHTLIFE-2017", organization: "New York Post", title: "De Blasio's newest city agency: Office of Nightlife", indexedUrl: "http://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-SAVE-GOTHAMIST-NIGHTLIFE-MAYOR-2017", organization: "Gothamist", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", indexedUrl: "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-SAVE-BROOKLYN-EAGLE-OFFICE-2017", organization: "Brooklyn Daily Eagle", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", indexedUrl: "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-SAVE-CITYLAB-NIGHTLIFE-MAYOR-2017", organization: "CityLab", title: "How to Be a Good 'Nightlife Mayor'", indexedUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", organization: "Bedford + Bowery", title: "What Can the Night Mayor Do? The DIY Scene Discusses", indexedUrl: "http://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-SAVE-BROOKLYN-VEGAN-OFFICE-2017", organization: "BrooklynVegan", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", indexedUrl: "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", campaigns: ["save-nyc-spaces"] },
  { id: "SRC-PRESS-FAIR-NYT-THIS-SPACE-2018", organization: "The New York Times", title: "This Space Available", indexedUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-DAILYNEWS-RENT-HIKES-2019", organization: "New York Daily News", title: "Pols, Small-Biz Owners Rally For Law Limiting Rent Hikes On NYC's Beleaguered Mom-And-Pop Shops", indexedUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-CURBED-RENT-STABILIZATION-2019", organization: "Curbed", title: "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?", indexedUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-AMNY-VACANT-STOREFRONTS-2019", organization: "amNewYork", title: "The sad story behind NYC vacant storefronts", indexedUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-ATLANTIC-RICH-GHOST-TOWN-2018", organization: "The Atlantic", title: "How Manhattan Became a Rich Ghost Town", indexedUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-GOTHAMIST-NEIRS-2020", organization: "Gothamist", title: "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", indexedUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-QNS-COMMERCIAL-RENT-2019", organization: "QNS", title: "Sunnyside councilman, small business owners rally for commercial rent control", indexedUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-SUNNYSIDE-RENT-CONTROL-2019", organization: "Sunnyside Post", title: "Van Bramer Calls for Commercial Rent Control, Bill Aims to Protect Small Businesses from Rent Hikes", indexedUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-JEWISH-VOICE-MOM-POP-2019", organization: "The Jewish Voice", title: "Brooklyn Councilman Aims to Save Mom & Pop Retail Outlets", indexedUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", campaigns: ["fair-rent-nyc"] },
  { id: "SRC-PRESS-FAIR-NYT-RENT-SURGING-2023", organization: "The New York Times", title: "Small Businesses Helped New York Rebound. Their Rent Is Surging.", indexedUrl: "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html", campaigns: ["fair-rent-nyc"] }
];

export const campaignPressIndexes = {
  "let-nyc-dance": {
    indexUrls: ["https://letnycdance.nycartc.com/"],
    sourceIds: campaignPressEntries.filter((entry) => entry.campaigns.includes("let-nyc-dance")).map((entry) => entry.id)
  },
  "talks-not-raids": {
    indexUrls: ["https://talksnotraids.com/"],
    sourceIds: campaignPressEntries.filter((entry) => entry.campaigns.includes("talks-not-raids")).map((entry) => entry.id)
  },
  "save-nyc-spaces": {
    indexUrls: ["https://savenycspaces.nycartc.com/"],
    sourceIds: campaignPressEntries.filter((entry) => entry.campaigns.includes("save-nyc-spaces")).map((entry) => entry.id)
  },
  "fair-rent-nyc": {
    indexUrls: [
      "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
      "https://fairrentnyc.nycartc.com/library/"
    ],
    sourceIds: campaignPressEntries.filter((entry) => entry.campaigns.includes("fair-rent-nyc")).map((entry) => entry.id)
  }
} satisfies Record<CampaignPressId, { indexUrls: string[]; sourceIds: string[] }>;

export const campaignPressExpectedCounts = {
  "let-nyc-dance": 21,
  "talks-not-raids": 7,
  "save-nyc-spaces": 8,
  "fair-rent-nyc": 10,
  totalOccurrences: 46,
  uniqueArticles: 45
} as const;

const existingCanonicalSourceIds = new Set([
  "SRC-NYCARTC-CABARET-GOTHAMIST-2017",
  "SRC-VICE-NYCARTC-DCA-2017",
  "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017"
]);

const intakeAlreadyHandled = new Set([
  ...existingCanonicalSourceIds,
  "SRC-NPR-CABARET-OFFICE-NIGHTLIFE-2017"
]);

const campaignLabels = (entry: CampaignPressEntry) => entry.campaigns.join(", ");

export const campaignPressSources = campaignPressEntries
  .filter((entry) => !existingCanonicalSourceIds.has(entry.id))
  .map((entry): SourceRecord => ({
    id: entry.id,
    title: entry.title,
    organization: entry.organization,
    kind: "published-article",
    visibility: "public",
    preservationStatus: "unverified",
    accessedAt: "2026-07-12",
    canonicalUrl: entry.indexedUrl,
    publicCitation: `${entry.organization}, '${entry.title}'.`,
    publicNote: `Indexed in the ${campaignLabels(entry)} campaign press section; close reading and durable article-level preservation remain open.`,
    supportsGenerally: ["campaign press-index membership", "article title and publisher relationship"],
    doesNotEstablish: ["that Jamie is named in the article", "Jamie's individual role or authorship", "campaign causality or endorsement", "the article's full factual propositions before close reading"]
  }));

export const campaignPressIntake = campaignPressEntries
  .filter((entry) => !intakeAlreadyHandled.has(entry.id))
  .map((entry): IntakeRecord => ({
    id: entry.id.replace(/^SRC-/, "LEAD-"),
    receivedAt: "2026-07-12",
    suppliedBy: "NYC Artist Coalition campaign press index",
    kind: "article",
    title: entry.title,
    summary: `${entry.organization} article indexed by ${campaignLabels(entry)}; canonical metadata captured pending close reading.`,
    sourceUrl: entry.indexedUrl,
    status: "integrated",
    dispositions: ["source-created", "project-linked", "inquiry-created"],
    projectIds: ["nyc-artist-coalition"],
    sourceIds: [entry.id],
    claimIds: [],
    inquiryIds: ["INQ-NYCARTC-CAMPAIGN-PRESS-CORPUS"],
    notes: ["Press-index membership is not evidence that Jamie appears in or authored the article."]
  }));

export const campaignPressSourceIds = campaignPressEntries.map((entry) => entry.id);
export const campaignPressNewSourceIds = campaignPressSources.map((entry) => entry.id);
