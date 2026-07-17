import type { KnowledgeBank } from "./schema.ts";

export type CampaignId =
  | "let-nyc-dance"
  | "talks-not-raids"
  | "save-nyc-spaces"
  | "fair-rent-nyc";

type ArticleSeed = {
  id: string;
  title: string;
  organization: string;
  author?: string;
  publishedAt?: string;
  canonicalUrl: string;
  archiveUrl?: string;
  preservationStatus?: "live" | "archived" | "dead";
  accessNote?: string;
  campaigns: CampaignId[];
};

const campaignLabels: Record<CampaignId, string> = {
  "let-nyc-dance": "Let NYC Dance",
  "talks-not-raids": "Talks Not Raids",
  "save-nyc-spaces": "Save NYC Spaces",
  "fair-rent-nyc": "FairRentNYC"
};

const articleSeeds: ArticleSeed[] = [
  {
    id: "SRC-NYT-CABARET-REPEAL-2017-10-30",
    title: "After 91 Years, New York Will Let Its People Boogie",
    organization: "The New York Times",
    author: "Annie Correal",
    publishedAt: "2017-10-30",
    canonicalUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    archiveUrl: "https://web.archive.org/web/20171031113111/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    preservationStatus: "archived",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-NEW-YORKER-DANCE-OUTLAWS-2017-07-03",
    title: "Dance Outlaws Fight for the Right to Party",
    organization: "The New Yorker",
    author: "Emily Witt",
    publishedAt: "2017-07-03",
    canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-NYPOST-CABARET-LAW-2017-09-14",
    title: "De Blasio might scrap ridiculous law banning dancing in bars",
    organization: "New York Post",
    author: "Yoav Gonen",
    publishedAt: "2017-09-14",
    canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-VILLAGE-VOICE-CABARET-EDITORIAL-2017",
    title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated",
    organization: "The Village Voice",
    author: "Lauren Evans",
    publishedAt: "2017-03-30",
    canonicalUrl: "https://www.villagevoice.com/nycs-racist-draconian-cabaret-law-must-be-eliminated/",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-NYDAILYNEWS-CABARET-LAW-2017-06-19",
    title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars",
    organization: "New York Daily News",
    author: "Erin Durkin",
    publishedAt: "2017-06-19",
    canonicalUrl: "https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-WNYC-CABARET-LAW-2017",
    title: "The Bureaucratic Dance to End NYC Cabaret Law",
    organization: "WNYC",
    canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-FORBES-CABARET-LAW-2017-10-04",
    title: "NYC Republicans Should Support Cabaret Law Repeal Effort",
    organization: "Forbes",
    author: "Charles Blain",
    publishedAt: "2017-10-04",
    canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-SMITHSONIAN-CABARET-LAW-2017-09-22",
    title: "New York City Could Finally Lose Its Prohibition-Era Dancing Rule",
    organization: "Smithsonian Magazine",
    author: "Maris Fessenden",
    publishedAt: "2017-09-22",
    canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-DNAINFO-CABARET-LAW-2017-06-20",
    title: "City Stonewalls Council, Defends 'Racist' No Dancing Law",
    organization: "DNAinfo",
    author: "Gwynne Hogan",
    publishedAt: "2017-06-20",
    canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-CRAINS-CABARET-LAW-2017-06-19",
    title: "City Council moves to repeal 'racist' cabaret law",
    organization: "Crain's New York Business",
    publishedAt: "2017-06-19",
    canonicalUrl: "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    archiveUrl: "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    preservationStatus: "archived",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-METRO-CABARET-LAW-2017",
    title: "Arts advocates renew call to end New York City's antiquated cabaret laws",
    organization: "Metro New York",
    canonicalUrl: "https://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    archiveUrl: "https://web.archive.org/web/20170616041441/http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    preservationStatus: "archived",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-BROOKLYN-EAGLE-CABARET-LAW-2017-05-12",
    title: "There are only 17 places in Brooklyn where you can legally dance",
    organization: "Brooklyn Daily Eagle",
    author: "Scott Enman",
    publishedAt: "2017-05-12",
    canonicalUrl: "https://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-BROOKLYN-PAPER-CABARET-LAW-2017-04-04",
    title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!",
    organization: "Brooklyn Paper",
    author: "Lauren Gill",
    publishedAt: "2017-04-04",
    canonicalUrl: "https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-TIMEOUT-CABARET-LAW-2017-08-16",
    title: "It's time to make it legal to dance anywhere the f*ck you want in New York",
    organization: "Time Out New York",
    author: "Liz Pelly",
    publishedAt: "2017-08-16",
    canonicalUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-QUEENS-CHRONICLE-CABARET-LAW-2017",
    title: "Aged Cabaret Law finally at its end?",
    organization: "Queens Chronicle",
    author: "Isabella Bruni",
    canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-BEDFORD-BOWERY-CABARET-LAW-2017-09-15",
    title: "Cabaret Law Repeal Supported by Everyone from de Blasio to Duke Ellington's Family",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    publishedAt: "2017-09-15",
    canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-VICE-NYCA-DIY-SPACES-2017-03-21",
    title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety",
    organization: "Vice Thump",
    publishedAt: "2017-03-21",
    canonicalUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/",
    archiveUrl: "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    preservationStatus: "archived",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-SFGATE-CABARET-LAW-2017",
    title: "New York City apparently has a 'No Dancing' law",
    organization: "SFGate",
    canonicalUrl: "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    preservationStatus: "dead",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-MIXMAG-CABARET-ACTIVISTS-2017",
    title: "NYC activists aim to repeal local 'No Dancing' law",
    organization: "Mixmag",
    canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    campaigns: ["let-nyc-dance"]
  },
  {
    id: "SRC-GOTHAMIST-MARCH-2019-02-12",
    title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored by LGBTQ Patrons, People of Color",
    organization: "Gothamist",
    author: "Caroline Lewis",
    publishedAt: "2019-02-12",
    canonicalUrl: "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-VILLAGE-VOICE-PALISADES-2016-12-08",
    title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down",
    organization: "The Village Voice",
    author: "Matthew Ismael Ruiz",
    publishedAt: "2016-12-08",
    canonicalUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-BEDFORD-BOWERY-MARCH-2019-02-12",
    title: "Disco Discord: NYPD and Nightlife Owners Clash over Party-Crashing 'Raids'",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    publishedAt: "2019-02-12",
    canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-BAFFLER-MARCH-2018-02-12",
    title: "Cut the Music: Inside M.A.R.C.H., the NYPD's secret, venue-closing task force",
    organization: "The Baffler",
    author: "Liz Pelly",
    publishedAt: "2018-02-12",
    canonicalUrl: "https://thebaffler.com/latest/cut-the-music-pelly",
    archiveUrl: "https://web.archive.org/web/20190109043138/https://thebaffler.com/latest/cut-the-music-pelly",
    preservationStatus: "archived",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-NYT-MARCH-2002-11-10",
    title: "City Cracks Down on Nightclubs and May Revise Its Policies",
    organization: "The New York Times",
    publishedAt: "2002-11-10",
    canonicalUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    archiveUrl: "https://web.archive.org/web/20131229155825/http://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    preservationStatus: "archived",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-AMNY-NIGHTLIFE-MAYOR-2018-03-27",
    title: "Nightlife mayor Ariel Palitz, in Bushwick, says 'We have a lot of talking to do'",
    organization: "amNewYork",
    author: "Ivan Pereira",
    publishedAt: "2018-03-27",
    canonicalUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-OBSERVER-NIGHTLIFE-MAYOR-2018-03-27",
    title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On",
    organization: "Observer",
    author: "Madina Toure",
    publishedAt: "2018-03-27",
    canonicalUrl: "https://observer.com/2018/03/new-york-city-night-mayor/",
    campaigns: ["talks-not-raids"]
  },
  {
    id: "SRC-NYDAILYNEWS-OFFICE-NIGHTLIFE-2017-09-19",
    title: "NYC creates office to manage issues affecting nightlife industry",
    organization: "New York Daily News",
    author: "Jillian Jorgensen",
    publishedAt: "2017-09-19",
    canonicalUrl: "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-NYPOST-OFFICE-NIGHTLIFE-2017-09-19",
    title: "De Blasio's newest city agency: Office of Nightlife",
    organization: "New York Post",
    author: "Rich Calder",
    publishedAt: "2017-09-19",
    canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-GOTHAMIST-OFFICE-NIGHTLIFE-2017-09-20",
    title: "De Blasio Signs Bill Creating Office of Nightlife",
    organization: "Gothamist",
    author: "Jake Offenhartz",
    publishedAt: "2017-09-20",
    canonicalUrl: "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-20",
    title: "New era: Mayor de Blasio signs bill to create NYC Office of Nightlife",
    organization: "Brooklyn Daily Eagle",
    author: "Scott Enman",
    publishedAt: "2017-09-20",
    canonicalUrl: "https://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-CITYLAB-NIGHT-MAYOR-2017-09",
    title: "America Discovers the 'Night Mayor'",
    organization: "CityLab",
    publishedAt: "2017-09-26",
    canonicalUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    archiveUrl: "https://web.archive.org/web/20170930191543/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    preservationStatus: "archived",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
    title: "What Can the Nightlife Mayor Do? The DIY Scene Discusses",
    organization: "Bedford + Bowery",
    author: "Cassidy Dawn Graves",
    publishedAt: "2017-10-12",
    canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-BROOKLYNVEGAN-OFFICE-NIGHTLIFE-2017-09",
    title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes",
    organization: "BrooklynVegan",
    publishedAt: "2017-09-20",
    canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
    archiveUrl: "https://web.archive.org/web/20170923195555/http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
    preservationStatus: "archived",
    campaigns: ["save-nyc-spaces"]
  },
  {
    id: "SRC-NYT-STOREFRONT-VACANCY-2018-09-07",
    title: "These 2 Blocks of New York City Are a Retail Wasteland",
    organization: "The New York Times",
    author: "Corey Kilgannon and Todd Heisler",
    publishedAt: "2018-09-07",
    canonicalUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-NYDAILYNEWS-COMMERCIAL-RENT-2019-11-14",
    title: "Brooklyn councilman proposes commercial rent regulation to save mom-and-pop shops",
    organization: "New York Daily News",
    author: "Shant Shahrigian",
    publishedAt: "2019-11-14",
    canonicalUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-CURBED-COMMERCIAL-RENT-2019-11-08",
    title: "Can commercial rent stabilization save NYC's small businesses?",
    organization: "Curbed New York",
    author: "Caroline Spivack",
    publishedAt: "2019-11-08",
    canonicalUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    archiveUrl: "https://web.archive.org/web/20191216190533/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    preservationStatus: "archived",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-AMNY-VACANT-STOREFRONTS-2019-01-17",
    title: "The sad story behind NYC's vacant storefronts",
    organization: "amNewYork",
    author: "Kate Walter",
    publishedAt: "2019-01-17",
    canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-ATLANTIC-RETAIL-VACANCY-2018-10-15",
    title: "How Manhattan Became a Rich Ghost Town",
    organization: "The Atlantic",
    author: "Derek Thompson",
    publishedAt: "2018-10-15",
    canonicalUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-GOTHAMIST-NEIRS-RENT-2020-01-13",
    title: "Neir's Tavern Saved, But Calls for Commercial Rent Regulations Continue",
    organization: "Gothamist",
    author: "Luca Powell",
    publishedAt: "2020-01-13",
    canonicalUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-QNS-COMMERCIAL-RENT-2019-12-18",
    title: "Sunnyside councilman, small business owners rally for commercial rent control",
    organization: "QNS",
    author: "Max Parrott",
    publishedAt: "2019-12-18",
    canonicalUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-SUNNYSIDEPOST-COMMERCIAL-RENT-2019-12-18",
    title: "Van Bramer calls for commercial rent control bill, aims to protect small businesses from rent hikes",
    organization: "Sunnyside Post",
    author: "Kristen Torres",
    publishedAt: "2019-12-18",
    canonicalUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-JEWISH-VOICE-COMMERCIAL-RENT-2019-11-11",
    title: "Bklyn Councilman Aims to Save Mom & Pop Retail Outlets",
    organization: "The Jewish Voice",
    publishedAt: "2019-11-11",
    canonicalUrl: "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    archiveUrl: "https://web.archive.org/web/20191212122458/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    preservationStatus: "archived",
    campaigns: ["fair-rent-nyc"]
  },
  {
    id: "SRC-NYT-SMALL-BUSINESS-RENTS-2023-05-08",
    title: "Small Businesses Helped New York Rebound. Their Rent Is Surging.",
    organization: "The New York Times",
    author: "Stefanos Chen",
    publishedAt: "2023-05-08",
    canonicalUrl: "https://www.nytimes.com/2023/05/08/nyregion/small-businesses-rent-hikes-nyc.html",
    accessNote: "Automated verification returned an access restriction on July 13, 2026. The publisher URL and campaign placement remain usable metadata; no paywall was bypassed.",
    campaigns: ["fair-rent-nyc"]
  }
];

const articleSources: KnowledgeBank["sources"] = articleSeeds.map((article) => {
  const campaignNames = article.campaigns.map((campaign) => campaignLabels[campaign]);
  const preservationStatus = article.preservationStatus ?? "live";

  return {
    id: article.id,
    title: article.title,
    organization: article.organization,
    author: article.author,
    kind: "published-article",
    visibility: "public",
    preservationStatus,
    publishedAt: article.publishedAt,
    accessedAt: "2026-07-13",
    canonicalUrl: article.canonicalUrl,
    archiveUrl: article.archiveUrl,
    preferredPublicUrl: preservationStatus === "dead" ? undefined : article.archiveUrl ? "archive" : "canonical",
    publicCitation: `${article.author ? `${article.author}, ` : ""}'${article.title},' ${article.organization}${article.publishedAt ? `, ${article.publishedAt}` : ""}.`,
    publicNote: preservationStatus === "dead"
      ? `Listed in the ${campaignNames.join(" and ")} press or reference section. The publisher URL returned 404 and no Wayback capture was recovered on July 13, 2026; retain this as campaign-index metadata, not recovered article text.`
      : `Listed in the ${campaignNames.join(" and ")} press or reference section. Ingested at article level; reuse of claims from the article requires separate close reading.${article.accessNote ? ` ${article.accessNote}` : ""}`,
    supportsGenerally: [
      preservationStatus === "dead"
        ? "the campaign-listed article title, publisher, and dead publisher URL"
        : "the article's title, publisher, and public source location",
      `its placement in the ${campaignNames.join(" and ")} press or reference section`,
      "a candidate source for later claim-level research"
    ],
    doesNotEstablish: [
      "publisher endorsement of the campaign",
      "Jamie's authorship of the reporting",
      "Jamie's sole ownership of collective campaign work",
      "campaign causality for legislation or policy outcomes",
      "any article-body claim not separately close-read and linked"
    ]
  };
});

const campaignSurfaceSources: KnowledgeBank["sources"] = [
  {
    id: "SRC-LET-NYC-DANCE-CAMPAIGN",
    title: "Let NYC Dance: Movement to Repeal the Cabaret Law",
    organization: "Let NYC Dance coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Let NYC Dance coalition campaign archive and press section.",
    publicNote: "The surviving campaign surface contains 21 press placements. It is a project artifact, not independent proof of individual authorship or campaign causality.",
    supportsGenerally: ["the public campaign interface", "21 linked press placements", "the campaign's public calls to action and coalition framing"],
    doesNotEstablish: ["publisher endorsement", "Jamie's sole authorship of the campaign", "sole causality for Cabaret Law repeal", "a complete campaign responsibility map"]
  },
  {
    id: "SRC-TALKS-NOT-RAIDS-PRESS-INDEX-2026",
    title: "Talks Not Raids campaign press section",
    organization: "Talks Not Raids coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://talksnotraids.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Talks Not Raids coalition campaign archive and press section, accessed July 13, 2026.",
    publicNote: "The surviving campaign surface contains seven press placements. It is a project artifact, not independent proof of individual authorship or campaign causality.",
    supportsGenerally: ["the public campaign interface", "seven linked press placements", "the campaign's public calls to action and coalition framing"],
    doesNotEstablish: ["publisher endorsement", "Jamie's sole authorship of the campaign", "sole causality for MARCH policy or operational changes", "a complete campaign responsibility map"]
  },
  {
    id: "SRC-SAVE-NYC-SPACES-PRESS-INDEX-2026",
    title: "Save NYC Spaces campaign press section",
    organization: "Save NYC Spaces coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Save NYC Spaces coalition campaign archive and press section, accessed July 13, 2026.",
    publicNote: "The surviving campaign surface contains eight press placements. It is a project artifact, not independent proof of individual authorship or campaign causality.",
    supportsGenerally: ["the public campaign interface", "eight linked press placements", "the campaign's public calls to action and coalition framing"],
    doesNotEstablish: ["publisher endorsement", "Jamie's sole authorship of the campaign", "sole causality for creation or operation of the Office of Nightlife", "a complete campaign responsibility map"]
  },
  {
    id: "SRC-FAIR-RENT-NYC-PRESS-ARCHIVE-2021-12-01",
    title: "FairRentNYC campaign press section, December 1, 2021 capture",
    organization: "FairRentNYC",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2021-12-01T10:44:25Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://fairrentnyc.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "FairRentNYC campaign press section, Wayback capture, December 1, 2021.",
    publicNote: "The capture preserves nine press placements from the earlier campaign page. It is retained separately from the current reference-library design.",
    supportsGenerally: ["nine linked press placements", "the 2021 campaign-page state", "the earlier campaign's public source trail"],
    doesNotEstablish: ["current link availability", "publisher endorsement", "Jamie's sole authorship of the campaign", "campaign causality for policy outcomes"]
  },
  {
    id: "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY-2026",
    title: "FairRentNYC reference library",
    organization: "FairRentNYC",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://fairrentnyc.nycartc.com/library/",
    preferredPublicUrl: "canonical",
    publicCitation: "FairRentNYC, current public reference library, reviewed July 13, 2026.",
    publicNote: "The current library contains one reporting item not present in the 2021 press section. The larger library also separates official records, research, movement sources, and reporting.",
    supportsGenerally: ["one additional reporting placement", "the current reference-library structure", "separation of source classes"],
    doesNotEstablish: ["a complete historical press list without the archived page", "publisher endorsement", "Jamie's sole authorship of the campaign", "campaign causality for policy outcomes"]
  }
];

export const campaignPressSources: KnowledgeBank["sources"] = [
  ...campaignSurfaceSources,
  ...articleSources
];

export const campaignPressSourceIds = {
  "let-nyc-dance": [
    "SRC-NYT-CABARET-REPEAL-2017-10-30",
    "SRC-NEW-YORKER-DANCE-OUTLAWS-2017-07-03",
    "SRC-NYPOST-CABARET-LAW-2017-09-14",
    "SRC-VILLAGE-VOICE-CABARET-EDITORIAL-2017",
    "SRC-NYDAILYNEWS-CABARET-LAW-2017-06-19",
    "SRC-WNYC-CABARET-LAW-2017",
    "SRC-FORBES-CABARET-LAW-2017-10-04",
    "SRC-NYCA-GOTHAMIST-CABARET-REPEAL-2017-06-19",
    "SRC-SMITHSONIAN-CABARET-LAW-2017-09-22",
    "SRC-DNAINFO-CABARET-LAW-2017-06-20",
    "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20",
    "SRC-CRAINS-CABARET-LAW-2017-06-19",
    "SRC-METRO-CABARET-LAW-2017",
    "SRC-BROOKLYN-EAGLE-CABARET-LAW-2017-05-12",
    "SRC-BROOKLYN-PAPER-CABARET-LAW-2017-04-04",
    "SRC-TIMEOUT-CABARET-LAW-2017-08-16",
    "SRC-QUEENS-CHRONICLE-CABARET-LAW-2017",
    "SRC-BEDFORD-BOWERY-CABARET-LAW-2017-09-15",
    "SRC-VICE-NYCA-DIY-SPACES-2017-03-21",
    "SRC-SFGATE-CABARET-LAW-2017",
    "SRC-MIXMAG-CABARET-ACTIVISTS-2017"
  ],
  "talks-not-raids": [
    "SRC-GOTHAMIST-MARCH-2019-02-12",
    "SRC-VILLAGE-VOICE-PALISADES-2016-12-08",
    "SRC-BEDFORD-BOWERY-MARCH-2019-02-12",
    "SRC-BAFFLER-MARCH-2018-02-12",
    "SRC-NYT-MARCH-2002-11-10",
    "SRC-AMNY-NIGHTLIFE-MAYOR-2018-03-27",
    "SRC-OBSERVER-NIGHTLIFE-MAYOR-2018-03-27"
  ],
  "save-nyc-spaces": [
    "SRC-NYDAILYNEWS-OFFICE-NIGHTLIFE-2017-09-19",
    "SRC-NYPOST-OFFICE-NIGHTLIFE-2017-09-19",
    "SRC-GOTHAMIST-OFFICE-NIGHTLIFE-2017-09-20",
    "SRC-NYCA-NPR-CABARET-REPEAL-2017-09-20",
    "SRC-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-20",
    "SRC-CITYLAB-NIGHT-MAYOR-2017-09",
    "SRC-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
    "SRC-BROOKLYNVEGAN-OFFICE-NIGHTLIFE-2017-09"
  ],
  "fair-rent-nyc": [
    "SRC-NYT-STOREFRONT-VACANCY-2018-09-07",
    "SRC-NYDAILYNEWS-COMMERCIAL-RENT-2019-11-14",
    "SRC-CURBED-COMMERCIAL-RENT-2019-11-08",
    "SRC-AMNY-VACANT-STOREFRONTS-2019-01-17",
    "SRC-ATLANTIC-RETAIL-VACANCY-2018-10-15",
    "SRC-GOTHAMIST-NEIRS-RENT-2020-01-13",
    "SRC-QNS-COMMERCIAL-RENT-2019-12-18",
    "SRC-SUNNYSIDEPOST-COMMERCIAL-RENT-2019-12-18",
    "SRC-JEWISH-VOICE-COMMERCIAL-RENT-2019-11-11",
    "SRC-NYT-SMALL-BUSINESS-RENTS-2023-05-08"
  ]
} as const;

export const campaignPressPlacementCount = Object.values(campaignPressSourceIds).reduce(
  (total, sourceIds) => total + sourceIds.length,
  0
);

export const campaignPressDistinctSourceCount = new Set(
  Object.values(campaignPressSourceIds).flat()
).size;

export const campaignPressDistinctSourceIds = [
  ...new Set(Object.values(campaignPressSourceIds).flat())
];

export const campaignPressIndexSourceIds = [
  "SRC-LET-NYC-DANCE-CAMPAIGN",
  "SRC-TALKS-NOT-RAIDS-PRESS-INDEX-2026",
  "SRC-SAVE-NYC-SPACES-PRESS-INDEX-2026",
  "SRC-FAIR-RENT-NYC-PRESS-ARCHIVE-2021-12-01",
  "SRC-FAIR-RENT-NYC-REFERENCE-LIBRARY-2026"
] as const;
