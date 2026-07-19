import type { KnowledgeBank, SourceRecord } from "./schema.ts";

type PressSeed = {
  id: string;
  title: string;
  organization: string;
  canonicalUrl: string;
  retrievalStatus: "read" | "metadata-only";
  archiveUrl?: string;
};

export const campaignPressArticleSeeds: PressSeed[] = [
  { id: "SRC-NYT-CABARET-REPEAL-2017", title: "After 91 Years, New York Will Let Its People Boogie", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20251225083004id_/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html" },
  { id: "SRC-NEW-YORKER-DANCE-OUTLAWS-2017", title: "Dance Outlaws Fight for the Right to Party", organization: "The New Yorker", canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", retrievalStatus: "read" },
  { id: "SRC-NYPOST-CABARET-REPEAL-2017", title: "De Blasio might scrap ridiculous law banning dancing in bars", organization: "New York Post", canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20250822075355id_/https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/" },
  { id: "SRC-VILLAGE-VOICE-CABARET-LAW-2017", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", organization: "The Village Voice", canonicalUrl: "https://www.villagevoice.com/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated/", retrievalStatus: "read" },
  { id: "SRC-NYDN-CABARET-LAW-2017", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", organization: "New York Daily News", canonicalUrl: "https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20220521201023id_/https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553" },
  { id: "SRC-WNYC-CABARET-LAW-2017", title: "The Bureaucratic Dance to End NYC Cabaret Law", organization: "WNYC", canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20251111164642id_/https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/" },
  { id: "SRC-FORBES-CABARET-REPEAL-2017", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", organization: "Forbes", canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20220118055838id_/https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/" },
  { id: "SRC-SMITHSONIAN-CABARET-LAW-2017", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", organization: "Smithsonian Magazine", canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", retrievalStatus: "read" },
  { id: "SRC-DNAINFO-CABARET-LAW-2017", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", organization: "DNAinfo", canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn", retrievalStatus: "read" },
  { id: "SRC-CRAINS-CABARET-REPEAL-2017", title: "New York City Council moves to repeal 'racist' cabaret law", organization: "Crain's New York Business", canonicalUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20180225005113id_/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882" },
  { id: "SRC-METRO-CABARET-ADVOCACY-2017", title: "Arts advocates renew call to end New York City's antiquated cabaret laws", organization: "Metro New York", canonicalUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20170817001608id_/http://www.metro.us:80/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws" },
  { id: "SRC-BROOKLYN-EAGLE-CABARET-LAW-2017", title: "There are only 17 places in Brooklyn where you can legally dance", organization: "Brooklyn Daily Eagle", canonicalUrl: "https://brooklyneagle.com/articles/2017/05/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance/", retrievalStatus: "read" },
  { id: "SRC-BROOKLYN-PAPER-CABARET-LAW-2017", title: "Think I better dance, now! Pol wants to repeal Prohibition-era cabaret law", organization: "Brooklyn Paper", canonicalUrl: "https://www.brooklynpaper.com/think-i-better-dance-now-pol-wants-to-repeal-prohibition-era-cabaret-law/", retrievalStatus: "read" },
  { id: "SRC-TIMEOUT-CABARET-LAW-2017", title: "It's time to make it legal to dance anywhere the f*ck you want in New York", organization: "Time Out New York", canonicalUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", retrievalStatus: "read" },
  { id: "SRC-QUEENS-CHRONICLE-CABARET-LAW-2017", title: "Aged Cabaret Law finally at its end?", organization: "Queens Chronicle", canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20200118090912id_/https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html" },
  { id: "SRC-BEDFORD-BOWERY-CABARET-REPEAL-2017", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", organization: "Bedford + Bowery", canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", retrievalStatus: "read" },
  { id: "SRC-SFGATE-CABARET-LAW-2017", title: "New York City apparently has a 'No Dancing' law", organization: "SFGate", canonicalUrl: "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20220809111234id_/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php" },
  { id: "SRC-MIXMAG-CABARET-ADVOCACY-2017", title: "NYC activists aim to repeal local 'no dancing law'", organization: "Mixmag", canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", retrievalStatus: "read" },
  { id: "SRC-GOTHAMIST-MARCH-HEARING-2019", title: "Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs", organization: "Gothamist", canonicalUrl: "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs", retrievalStatus: "read" },
  { id: "SRC-VILLAGE-VOICE-PALISADES-2016", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", organization: "The Village Voice", canonicalUrl: "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", retrievalStatus: "read" },
  { id: "SRC-BEDFORD-BOWERY-MARCH-HEARING-2019", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", organization: "Bedford + Bowery", canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", retrievalStatus: "read" },
  { id: "SRC-BAFFLER-MARCH-TASK-FORCE", title: "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force", organization: "The Baffler", canonicalUrl: "https://thebaffler.com/latest/cut-the-music-pelly", retrievalStatus: "read" },
  { id: "SRC-NYT-NIGHTCLUB-CRACKDOWN-2002", title: "City Cracks Down on Nightclubs and May Revise Its Policies", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20251104235429id_/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html" },
  { id: "SRC-AMNY-NIGHTLIFE-MAYOR-2018", title: "Nightlife mayor Ariel Palitz says 'We have a lot of talking to do'", organization: "amNewYork", canonicalUrl: "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/", retrievalStatus: "read", archiveUrl: "https://web.archive.org/web/20191003222757id_/https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726" },
  { id: "SRC-OBSERVER-NIGHTLIFE-MAYOR-2018", title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", organization: "Observer", canonicalUrl: "https://observer.com/2018/03/new-york-city-night-mayor/", retrievalStatus: "read", archiveUrl: "https://web.archive.org/web/20251011032549id_/https://observer.com/2018/03/new-york-city-night-mayor/" },
  { id: "SRC-NYDN-OFFICE-NIGHTLIFE-2017", title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", organization: "New York Daily News", canonicalUrl: "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20230604001849id_/https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451" },
  { id: "SRC-NYPOST-OFFICE-NIGHTLIFE-2017", title: "De Blasio's newest city agency: Office of Nightlife", organization: "New York Post", canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20260624234956id_/https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/" },
  { id: "SRC-GOTHAMIST-NIGHTLIFE-OFFICE-2017", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", organization: "Gothamist", canonicalUrl: "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor", retrievalStatus: "read" },
  { id: "SRC-BROOKLYN-EAGLE-NIGHTLIFE-OFFICE-2017", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", organization: "Brooklyn Daily Eagle", canonicalUrl: "https://brooklyneagle.com/articles/2017/09/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife/", retrievalStatus: "read" },
  { id: "SRC-CITYLAB-NIGHT-MAYOR-2017", title: "How to Be a Good 'Nightlife Mayor'", organization: "CityLab", canonicalUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20191214060044id_/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/" },
  { id: "SRC-BROOKLYN-VEGAN-NIGHTLIFE-OFFICE-2017", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", organization: "BrooklynVegan", canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", retrievalStatus: "read" },
  { id: "SRC-NYT-SMALL-BUSINESS-RENTS-2023", title: "Small Businesses Helped New York Rebound. Their Rent Is Surging.", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html", retrievalStatus: "metadata-only", archiveUrl: "https://web.archive.org/web/20250927143746id_/https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html" }
];

const seedById = new Map(campaignPressArticleSeeds.map((seed) => [seed.id, seed]));

function entry(sourceId: string, listedTitle: string, listedUrl: string) {
  const seed = seedById.get(sourceId);
  return {
    sourceId,
    listedTitle,
    listedUrl,
    retrievalStatus: seed?.retrievalStatus ?? "read",
    ...(seed?.archiveUrl ? { archiveUrl: seed.archiveUrl } : {})
  } as const;
}

export const campaignPressCollections: KnowledgeBank["pressCollections"] = [
  {
    id: "PRESS-LET-NYC-DANCE",
    project: "nyc-artist-coalition",
    campaign: "Let NYC Dance",
    campaignSourceId: "SRC-LET-NYC-DANCE-CAMPAIGN-SITE",
    sectionTitle: "Press",
    collectedAt: "2026-07-12",
    expectedArticleCount: 21,
    entries: [
      entry("SRC-NYT-CABARET-REPEAL-2017", "After 91 Years, New York Will Let Its People Boogie", "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html"),
      entry("SRC-NEW-YORKER-DANCE-OUTLAWS-2017", "Dance Outlaws Fight for the Right to Party", "http://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party"),
      entry("SRC-NYPOST-CABARET-REPEAL-2017", "De Blasio might scrap ridiculous law banning dancing in bars", "http://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/"),
      entry("SRC-VILLAGE-VOICE-CABARET-LAW-2017", "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234"),
      entry("SRC-NYDN-CABARET-LAW-2017", "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553"),
      entry("SRC-WNYC-CABARET-LAW-2017", "The Bureaucratic Dance to End NYC Cabaret Law", "http://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law"),
      entry("SRC-FORBES-CABARET-REPEAL-2017", "NYC Republicans Should Support Cabaret Law Repeal Effort", "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort"),
      entry("SRC-NYCAC-CABARET-GOTHAMIST-2017", "DIY Venues Demand Repeal Of Widely-Reviled Cabaret Law", "http://gothamist.com/2017/06/20/cabaret_law_diy_venues.php"),
      entry("SRC-SMITHSONIAN-CABARET-LAW-2017", "New York City Could Finally Lose Its Prohibition-era Dancing Rule", "http://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/"),
      entry("SRC-DNAINFO-CABARET-LAW-2017", "City Stonewalls Council, Defends 'Racist' No Dancing Law", "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn"),
      entry("SRC-NYCAC-CABARET-NPR-2017", "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife"),
      entry("SRC-CRAINS-CABARET-REPEAL-2017", "New York City Council moves to repeal 'racist' cabaret law", "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882"),
      entry("SRC-METRO-CABARET-ADVOCACY-2017", "Arts advocates renew call to end New York City's antiquated cabaret laws", "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws"),
      entry("SRC-BROOKLYN-EAGLE-CABARET-LAW-2017", "There are only 17 places in Brooklyn where you can legally dance", "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance"),
      entry("SRC-BROOKLYN-PAPER-CABARET-LAW-2017", "Think I better dance, now!", "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html"),
      entry("SRC-TIMEOUT-CABARET-LAW-2017", "It's time to make it legal to dance anywhere the f*ck you want in New York", "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517"),
      entry("SRC-QUEENS-CHRONICLE-CABARET-LAW-2017", "Aged Cabaret Law finally at its end?", "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html"),
      entry("SRC-BEDFORD-BOWERY-CABARET-REPEAL-2017", "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", "http://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/"),
      entry("SRC-VICE-NYCAC-DIY-SAFETY-2017", "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety", "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces"),
      entry("SRC-SFGATE-CABARET-LAW-2017", "New York City apparently has a 'No Dancing' law", "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php"),
      entry("SRC-MIXMAG-CABARET-ADVOCACY-2017", "NYC activists aim to repeal local 'no dancing law'", "http://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news")
    ]
  },
  {
    id: "PRESS-TALKS-NOT-RAIDS",
    project: "nyc-artist-coalition",
    campaign: "Talks Not Raids",
    campaignSourceId: "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE",
    sectionTitle: "Press",
    collectedAt: "2026-07-12",
    expectedArticleCount: 7,
    entries: [
      entry("SRC-GOTHAMIST-MARCH-HEARING-2019", "Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs", "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php"),
      entry("SRC-VILLAGE-VOICE-PALISADES-2016", "Palisades Owners Explain Why the Beloved Venue Was Shut Down", "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/"),
      entry("SRC-BEDFORD-BOWERY-MARCH-HEARING-2019", "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", "http://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/"),
      entry("SRC-BAFFLER-MARCH-TASK-FORCE", "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force", "https://thebaffler.com/latest/cut-the-music-pelly"),
      entry("SRC-NYT-NIGHTCLUB-CRACKDOWN-2002", "City Cracks Down on Nightclubs and May Revise Its Policies", "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html"),
      entry("SRC-AMNY-NIGHTLIFE-MAYOR-2018", "Nightlife mayor Ariel Palitz says 'We have a lot of talking to do'", "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726"),
      entry("SRC-OBSERVER-NIGHTLIFE-MAYOR-2018", "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", "https://observer.com/2018/03/new-york-city-night-mayor/")
    ]
  },
  {
    id: "PRESS-SAVE-NYC-SPACES",
    project: "nyc-artist-coalition",
    campaign: "Save NYC Spaces",
    campaignSourceId: "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE",
    sectionTitle: "Press",
    collectedAt: "2026-07-12",
    expectedArticleCount: 8,
    entries: [
      entry("SRC-NYDN-OFFICE-NIGHTLIFE-2017", "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", "http://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451"),
      entry("SRC-NYPOST-OFFICE-NIGHTLIFE-2017", "De Blasio's newest city agency: Office of Nightlife", "http://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/"),
      entry("SRC-GOTHAMIST-NIGHTLIFE-OFFICE-2017", "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php"),
      entry("SRC-NYCAC-CABARET-NPR-2017", "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife"),
      entry("SRC-BROOKLYN-EAGLE-NIGHTLIFE-OFFICE-2017", "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife"),
      entry("SRC-CITYLAB-NIGHT-MAYOR-2017", "How to Be a Good 'Nightlife Mayor'", "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/"),
      entry("SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017", "What Can the Night Mayor Do? The DIY Scene Discusses", "http://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/"),
      entry("SRC-BROOKLYN-VEGAN-NIGHTLIFE-OFFICE-2017", "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/")
    ]
  },
  {
    id: "PRESS-FAIR-RENT-NYC",
    project: "nyc-artist-coalition",
    campaign: "Fair Rent NYC",
    campaignSourceId: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY",
    sectionTitle: "Reporting + narrative context",
    collectedAt: "2026-07-12",
    expectedArticleCount: 1,
    entries: [
      entry("SRC-NYT-SMALL-BUSINESS-RENTS-2023", "Small Businesses Helped New York Rebound. Their Rent Is Surging.", "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html")
    ]
  }
];

const articleSources: SourceRecord[] = campaignPressArticleSeeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  organization: seed.organization,
  kind: "published-article",
  visibility: "public",
  preservationStatus: seed.archiveUrl ? "archived" : "live",
  accessedAt: "2026-07-12",
  canonicalUrl: seed.canonicalUrl,
  ...(seed.archiveUrl ? { archiveUrl: seed.archiveUrl } : {}),
  preferredPublicUrl: seed.archiveUrl ? "archive" : "canonical",
  publicCitation: `${seed.organization}, "${seed.title}."`,
  publicNote:
    seed.retrievalStatus === "read"
      ? "Read as public reporting context listed by an NYC Artist Coalition campaign site."
      : "An Archive.org capture was located; this record preserves the campaign's citation trail without relying on an unverified article-body reading.",
  supportsGenerally: [
    "the article's title and publication context",
    "the campaign site's curated reporting trail"
  ],
  doesNotEstablish: [
    "that Jamie authored or commissioned the article",
    "audience size, earned-media reach, or sole policy causality"
  ]
}));

type CampaignPressBatch = Pick<
  KnowledgeBank,
  "sources" | "claims" | "researchInquiries" | "pages" | "pressCollections"
>;

export const campaignPressBatchRecords: CampaignPressBatch = {
  sources: [
    {
      id: "SRC-LET-NYC-DANCE-CAMPAIGN-SITE",
      title: "Let NYC Dance campaign site and press section",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://letnycdance.nycartc.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, Let NYC Dance campaign site and press section.",
      publicNote: "The live campaign page preserves action language and 21 listed press articles about Cabaret Law repeal and cultural-space advocacy.",
      supportsGenerally: ["the Let NYC Dance public campaign surface", "21 press-list entries"],
      doesNotEstablish: ["Jamie's authorship of the listed articles", "audience reach or sole causality for repeal"]
    },
    {
      id: "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE",
      title: "Save NYC Spaces campaign site and press section",
      organization: "NYC Artist Coalition",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://savenycspaces.nycartc.com/",
      preferredPublicUrl: "canonical",
      publicCitation: "NYC Artist Coalition, Save NYC Spaces campaign site and press section.",
      publicNote: "The live campaign page preserves public context and eight listed press articles about the Office of Nightlife and related reforms.",
      supportsGenerally: ["the Save NYC Spaces public campaign surface", "eight press-list entries"],
      doesNotEstablish: ["Jamie's authorship of the listed articles", "audience reach or sole causality for the Office of Nightlife"]
    },
    {
      id: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY",
      title: "Fair Rent NYC public reference library",
      organization: "NYC Artist Coalition / Fair Rent NYC",
      kind: "institutional-web-page",
      visibility: "public",
      preservationStatus: "live",
      accessedAt: "2026-07-12",
      canonicalUrl: "https://fairrentnyc.nycartc.com/library/",
      preferredPublicUrl: "canonical",
      publicCitation: "Fair Rent NYC, public reference library, reporting and narrative context section.",
      publicNote: "The live public library marks its links as public or public-share approved and lists one reporting source in its narrative-context section.",
      supportsGenerally: ["the Fair Rent NYC public reference-library model", "one reporting-list entry"],
      doesNotEstablish: ["endorsement of every source argument", "Jamie's sole authorship of the campaign or policy work"]
    },
    ...articleSources
  ],
  claims: [
    {
      id: "CLM-NYCAC-CAMPAIGN-PRESS-INFRASTRUCTURE",
      project: "nyc-artist-coalition",
      internalClaim: "Across four campaign sites Jamie built, the surviving press and reference sections preserve 37 article placements pointing to 36 distinct published articles.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "case-study",
          text: "Across four campaign sites Jamie built - Let NYC Dance, Talks Not Raids, Save NYC Spaces, and Fair Rent NYC - the public information architecture paired action pathways with reporting context. Their surviving press and reference sections preserve 37 article placements linking to 36 distinct published articles.",
          status: "active",
          citationRequired: true,
          surfaces: ["/work/fair-rent-nyc"]
        }
      ],
      evidence: [
        { sourceId: "SRC-LET-NYC-DANCE-CAMPAIGN-SITE", relationship: "direct-support", supports: ["Let NYC Dance campaign surface", "21 press-list entries"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-TALKS-NOT-RAIDS-PUBLIC-SITE", relationship: "direct-support", supports: ["Talks Not Raids campaign surface", "seven press-list entries"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-SAVE-NYC-SPACES-CAMPAIGN-SITE", relationship: "direct-support", supports: ["Save NYC Spaces campaign surface", "eight press-list entries"], confidence: "high", renderCitation: true },
        { sourceId: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY", relationship: "direct-support", supports: ["Fair Rent NYC public reference library", "one reporting-list entry"], confidence: "high", renderCitation: true }
      ],
      boundaries: [
        "The count describes placements in surviving campaign-site lists, not unique press hits or audience reach.",
        "One NPR article appears in two campaign collections, producing 37 placements and 36 distinct articles.",
        "Do not imply that Jamie authored, commissioned, or was named in every article.",
        "Campaign and policy outcomes remain collective."
      ],
      antiClaims: [
        "Jamie generated 36 earned-media placements",
        "Jamie authored or commissioned the articles",
        "the press lists prove Jamie alone caused the policy outcomes"
      ],
      researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CENSUS-2026"],
      reviewedAt: "2026-07-12",
      reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    }
  ],
  researchInquiries: [
    {
      id: "INQ-NYCAC-CAMPAIGN-PRESS-CENSUS-2026",
      project: "nyc-artist-coalition",
      question: "What press and reporting links are listed by the four surviving NYC Artist Coalition campaign sites Jamie identified?",
      methods: [
        "Extracted each live campaign site's press or reporting section.",
        "Normalized redirected URLs and deduplicated articles by canonical source identity.",
        "Used Archive.org CDX captures when publisher access or link rot prevented reliable live retrieval.",
        "Recorded read, metadata-only, and not-recovered states separately."
      ],
      runAt: "2026-07-12",
      resultStatus: "recovered",
      findings: [
        "Let NYC Dance lists 21 articles; Talks Not Raids lists seven; Save NYC Spaces lists eight; Fair Rent NYC lists one reporting source.",
        "The four lists contain 37 placements linking to 36 distinct articles.",
        "The NPR Cabaret Law article appears in both Let NYC Dance and Save NYC Spaces.",
        "Archive.org captures were located for every publisher-blocked URL checked in this batch."
      ],
      limitations: [
        "A campaign's inclusion of an article is not proof that Jamie authored, commissioned, or was named in it.",
        "The census is a count of surviving list placements, not audience reach or a complete media-monitoring report.",
        "Metadata-only records preserve the citation trail but are not treated as article-body readings."
      ],
      sourceIds: campaignPressCollections.map((collection) => collection.campaignSourceId),
      publicSummary: "Four surviving campaign collections preserve 37 press-list placements linking to 36 distinct published articles."
    }
  ],
  pages: [],
  pressCollections: campaignPressCollections
};
