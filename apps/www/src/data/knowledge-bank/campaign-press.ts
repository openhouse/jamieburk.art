import type {
  ClaimRecord,
  IntakeRecordInput,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

export const campaignPressCampaigns = {
  "let-nyc-dance": {
    title: "Let NYC Dance",
    projectIds: ["nyc-artist-coalition"],
    indexSourceId: "SRC-NYCAC-LET-NYC-DANCE-PRESS-INDEX-2026-05-11",
    coverageContext: "Cabaret Law history, enforcement, repeal advocacy, and the 2017 repeal"
  },
  "talks-not-raids": {
    title: "Talks Not Raids",
    projectIds: ["talks-not-raids", "nyc-artist-coalition"],
    indexSourceId: "SRC-NYCAC-TALKS-NOT-RAIDS-PRESS-INDEX-2026-04-16",
    coverageContext: "M.A.R.C.H. operations, venue closures, nightlife enforcement, and public accountability"
  },
  "save-nyc-spaces": {
    title: "Save NYC Spaces",
    projectIds: ["nyc-artist-coalition"],
    indexSourceId: "SRC-NYCAC-SAVE-NYC-SPACES-PRESS-INDEX-2026-05-21",
    coverageContext: "creation of the Office of Nightlife and public priorities for small, diverse cultural spaces"
  },
  "fair-rent-nyc": {
    title: "Fair Rent NYC",
    projectIds: ["fair-rent-nyc", "nyc-artist-coalition"],
    indexSourceId: "SRC-FAIR-RENT-PRESS-INDEX-2021-12-01",
    coverageContext: "storefront vacancy, commercial rents, small-business displacement, and commercial-rent policy"
  }
} as const;

export type CampaignPressCampaignId = keyof typeof campaignPressCampaigns;

type CampaignPressArticleSeed = {
  sourceId: string;
  campaignId: CampaignPressCampaignId;
  organization: string;
  title: string;
  canonicalUrl: string;
  archiveTimestamp: string;
  archiveOriginalUrl?: string;
  publishedAt?: string;
  author?: string;
};

const campaignPressArticleSeeds = [
  {
    sourceId: "SRC-PRESS-LND-NYT-2017-10-30",
    campaignId: "let-nyc-dance",
    organization: "The New York Times",
    title: "After 91 Years, New York Will Let Its People Boogie",
    canonicalUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    archiveTimestamp: "20251225083004",
    publishedAt: "2017-10-30"
  },
  {
    sourceId: "SRC-PRESS-LND-NEW-YORKER-2017-07-03",
    campaignId: "let-nyc-dance",
    organization: "The New Yorker",
    author: "Emily Witt",
    title: "Dance Outlaws Fight for the Right to Party",
    canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    archiveTimestamp: "20260308101201",
    publishedAt: "2017-07-03"
  },
  {
    sourceId: "SRC-PRESS-LND-NY-POST-2017-09-14",
    campaignId: "let-nyc-dance",
    organization: "New York Post",
    title: "De Blasio might scrap ridiculous law banning dancing in bars",
    canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
    archiveTimestamp: "20250822075355",
    publishedAt: "2017-09-14"
  },
  {
    sourceId: "SRC-PRESS-LND-VILLAGE-VOICE-CABARET",
    campaignId: "let-nyc-dance",
    organization: "The Village Voice",
    title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated",
    canonicalUrl: "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
    archiveTimestamp: "20170504184338"
  },
  {
    sourceId: "SRC-PRESS-LND-DAILY-NEWS-FOOTLOOSE",
    campaignId: "let-nyc-dance",
    organization: "New York Daily News",
    title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars",
    canonicalUrl: "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
    archiveTimestamp: "20220521201023"
  },
  {
    sourceId: "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE",
    campaignId: "let-nyc-dance",
    organization: "WNYC",
    title: "The Bureaucratic Dance to End NYC Cabaret Law",
    canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/",
    archiveTimestamp: "20251111164642"
  },
  {
    sourceId: "SRC-PRESS-LND-FORBES-2017-10-04",
    campaignId: "let-nyc-dance",
    organization: "Forbes",
    title: "NYC Republicans Should Support Cabaret Law Repeal Effort",
    canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/",
    archiveTimestamp: "20220118055838",
    publishedAt: "2017-10-04"
  },
  {
    sourceId: "SRC-PRESS-LND-SMITHSONIAN-2017-09-22",
    campaignId: "let-nyc-dance",
    organization: "Smithsonian Magazine",
    author: "Maris Fessenden",
    title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule",
    canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
    archiveTimestamp: "20250911061547",
    publishedAt: "2017-09-22"
  },
  {
    sourceId: "SRC-PRESS-LND-DNAINFO-2017-06-20",
    campaignId: "let-nyc-dance",
    organization: "DNAinfo",
    title: "City Stonewalls Council, Defends 'Racist' No Dancing Law",
    canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/",
    archiveTimestamp: "20260214132538",
    publishedAt: "2017-06-20"
  },
  {
    sourceId: "SRC-PRESS-LND-CRAINS-2017-06-19",
    campaignId: "let-nyc-dance",
    organization: "Crain's New York",
    title: "City Council moves to repeal 'racist' cabaret law",
    canonicalUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    archiveTimestamp: "20180225005113",
    publishedAt: "2017-06-19"
  },
  {
    sourceId: "SRC-PRESS-LND-METRO-NY-CABARET",
    campaignId: "let-nyc-dance",
    organization: "Metro New York",
    title: "Arts advocates renew call to end New York City's antiquated cabaret laws",
    canonicalUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    archiveTimestamp: "20170817001608"
  },
  {
    sourceId: "SRC-PRESS-LND-BROOKLYN-EAGLE-2017-05-12",
    campaignId: "let-nyc-dance",
    organization: "Brooklyn Daily Eagle",
    title: "There are only 17 places in Brooklyn where you can legally dance",
    canonicalUrl: "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
    archiveTimestamp: "20181003171649",
    publishedAt: "2017-05-12"
  },
  {
    sourceId: "SRC-PRESS-LND-BROOKLYN-PAPER-2017-04-07",
    campaignId: "let-nyc-dance",
    organization: "Brooklyn Paper",
    title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!",
    canonicalUrl: "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
    archiveTimestamp: "20171101172806",
    publishedAt: "2017-04-07"
  },
  {
    sourceId: "SRC-PRESS-LND-TIMEOUT-2017-08-15",
    campaignId: "let-nyc-dance",
    organization: "Time Out New York",
    title: "It's time to make it legal to dance anywhere the f*ck you want in New York",
    canonicalUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    archiveTimestamp: "20240915134511",
    publishedAt: "2017-08-15"
  },
  {
    sourceId: "SRC-PRESS-LND-QUEENS-CHRONICLE-CABARET",
    campaignId: "let-nyc-dance",
    organization: "Queens Chronicle",
    title: "Aged Cabaret Law finally at its end?",
    canonicalUrl: "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    archiveTimestamp: "20200118090912"
  },
  {
    sourceId: "SRC-PRESS-LND-BEDFORD-BOWERY-CABARET-2017",
    campaignId: "let-nyc-dance",
    organization: "Bedford + Bowery",
    title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family",
    canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
    archiveTimestamp: "20231128123137"
  },
  {
    sourceId: "SRC-PRESS-LND-VICE-THUMP-CABARET",
    campaignId: "let-nyc-dance",
    organization: "Vice Thump",
    title: "NYC Artist Coalition, Dance Liberation Network and DIY spaces",
    canonicalUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    archiveTimestamp: "20170322022601"
  },
  {
    sourceId: "SRC-PRESS-LND-SFGATE-NO-DANCING",
    campaignId: "let-nyc-dance",
    organization: "SFGate",
    title: "New York City apparently has a 'No Dancing' law",
    canonicalUrl: "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    archiveTimestamp: "20220809111234"
  },
  {
    sourceId: "SRC-PRESS-LND-MIXMAG-NO-DANCING",
    campaignId: "let-nyc-dance",
    organization: "Mixmag",
    title: "NYC activists aim to repeal local 'no dancing law'",
    canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    archiveTimestamp: "20250117114813"
  },
  {
    sourceId: "SRC-PRESS-TNR-GOTHAMIST-2019-02-12",
    campaignId: "talks-not-raids",
    organization: "Gothamist",
    title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color",
    canonicalUrl: "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php",
    archiveTimestamp: "20190531184302",
    publishedAt: "2019-02-12"
  },
  {
    sourceId: "SRC-PRESS-TNR-VILLAGE-VOICE-PALISADES-2016-12-08",
    campaignId: "talks-not-raids",
    organization: "The Village Voice",
    title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down",
    canonicalUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
    archiveTimestamp: "20230129184606",
    publishedAt: "2016-12-08"
  },
  {
    sourceId: "SRC-PRESS-TNR-BEDFORD-BOWERY-DISCO-DISCORD-2019",
    campaignId: "talks-not-raids",
    organization: "Bedford + Bowery",
    title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'",
    canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
    archiveTimestamp: "20260106060929"
  },
  {
    sourceId: "SRC-PRESS-TNR-BAFFLER-CUT-THE-MUSIC",
    campaignId: "talks-not-raids",
    organization: "The Baffler",
    title: "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force",
    canonicalUrl: "https://thebaffler.com/latest/cut-the-music-pelly",
    archiveTimestamp: "20260508080121"
  },
  {
    sourceId: "SRC-PRESS-TNR-NYT-NIGHTCLUBS-2002-11-10",
    campaignId: "talks-not-raids",
    organization: "The New York Times",
    title: "City Cracks Down on Nightclubs and May Revise Its Policies",
    canonicalUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    archiveTimestamp: "20251104235429",
    publishedAt: "2002-11-10"
  },
  {
    sourceId: "SRC-PRESS-TNR-AMNY-NIGHTLIFE-MAYOR",
    campaignId: "talks-not-raids",
    organization: "amNewYork",
    title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'",
    canonicalUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
    archiveTimestamp: "20191003222757"
  },
  {
    sourceId: "SRC-PRESS-TNR-OBSERVER-NIGHT-MAYOR-2018",
    campaignId: "talks-not-raids",
    organization: "Observer",
    title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On",
    canonicalUrl: "https://observer.com/2018/03/new-york-city-night-mayor/",
    archiveTimestamp: "20251011032549"
  },
  {
    sourceId: "SRC-PRESS-SAVE-DAILY-NEWS-OFFICE-NIGHTLIFE",
    campaignId: "save-nyc-spaces",
    organization: "New York Daily News",
    title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife",
    canonicalUrl: "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/",
    archiveTimestamp: "20230604001849",
    archiveOriginalUrl: "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
    publishedAt: "2017-09-19"
  },
  {
    sourceId: "SRC-PRESS-SAVE-NY-POST-OFFICE-NIGHTLIFE-2017-09-19",
    campaignId: "save-nyc-spaces",
    organization: "New York Post",
    title: "De Blasio's newest city agency: Office of Nightlife",
    canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
    archiveTimestamp: "20260624234956",
    publishedAt: "2017-09-19"
  },
  {
    sourceId: "SRC-PRESS-SAVE-GOTHAMIST-OFFICE-NIGHTLIFE-2017-09-20",
    campaignId: "save-nyc-spaces",
    organization: "Gothamist",
    title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'",
    canonicalUrl: "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php",
    archiveTimestamp: "20190531070143",
    publishedAt: "2017-09-20"
  },
  {
    sourceId: "SRC-PRESS-SAVE-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-20",
    campaignId: "save-nyc-spaces",
    organization: "Brooklyn Daily Eagle",
    title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife",
    canonicalUrl: "https://brooklyneagle.com/60477/a-new-era-mayor-de-blasio-signs-bill-to-create-nyc-office-of-nightlife/",
    archiveTimestamp: "20180623155344",
    archiveOriginalUrl: "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
    publishedAt: "2017-09-20"
  },
  {
    sourceId: "SRC-PRESS-SAVE-CITYLAB-NIGHTLIFE-MAYOR",
    campaignId: "save-nyc-spaces",
    organization: "CityLab",
    title: "How to Be a Good 'Nightlife Mayor'",
    canonicalUrl: "https://www.bloomberg.com/news/articles/2017-09-26/what-american-cities-need-from-night-mayors",
    archiveTimestamp: "20191214060044",
    archiveOriginalUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    publishedAt: "2017-09-26"
  },
  {
    sourceId: "SRC-PRESS-SAVE-BROOKLYNVEGAN-OFFICE-NIGHTLIFE",
    campaignId: "save-nyc-spaces",
    organization: "BrooklynVegan",
    title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes",
    canonicalUrl: "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
    archiveTimestamp: "20250122015846"
  },
  {
    sourceId: "SRC-PRESS-FAIR-NYT-EMPTY-STOREFRONTS-2018-09-06",
    campaignId: "fair-rent-nyc",
    organization: "The New York Times",
    title: "The Empty Storefronts of New York: A Panoramic View",
    canonicalUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    archiveTimestamp: "20260605193311",
    publishedAt: "2018-09-06"
  },
  {
    sourceId: "SRC-PRESS-FAIR-DAILY-NEWS-RENT-HIKES-2019-11-14",
    campaignId: "fair-rent-nyc",
    organization: "New York Daily News",
    author: "Shant Shahrigian",
    title: "Pols, small-biz owners rally for law limiting rent hikes on NYC's beleaguered mom-and-pop shops",
    canonicalUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
    archiveTimestamp: "20221129191818",
    publishedAt: "2019-11-14"
  },
  {
    sourceId: "SRC-PRESS-FAIR-CURBED-RENT-STABILIZATION-2019-11-08",
    campaignId: "fair-rent-nyc",
    organization: "Curbed",
    title: "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?",
    canonicalUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    archiveTimestamp: "20251216101013",
    publishedAt: "2019-11-08"
  },
  {
    sourceId: "SRC-PRESS-FAIR-AMNY-VACANT-STOREFRONTS-2019-01-17",
    campaignId: "fair-rent-nyc",
    organization: "amNewYork",
    title: "The sad story behind NYC vacant storefronts",
    canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055",
    archiveTimestamp: "20251117191151",
    publishedAt: "2019-01-17"
  },
  {
    sourceId: "SRC-PRESS-FAIR-ATLANTIC-RICH-GHOST-TOWN-2018-10-15",
    campaignId: "fair-rent-nyc",
    organization: "The Atlantic",
    author: "Derek Thompson",
    title: "How Manhattan Became a Rich Ghost Town",
    canonicalUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
    archiveTimestamp: "20260505011341",
    publishedAt: "2018-10-15"
  },
  {
    sourceId: "SRC-PRESS-FAIR-GOTHAMIST-NEIRS-2020-01-13",
    campaignId: "fair-rent-nyc",
    organization: "Gothamist",
    author: "Luca Powell",
    title: "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms",
    canonicalUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    archiveTimestamp: "20210918142340",
    publishedAt: "2020-01-13"
  },
  {
    sourceId: "SRC-PRESS-FAIR-QNS-RENT-CONTROL-2019-12-18",
    campaignId: "fair-rent-nyc",
    organization: "QNS",
    title: "Sunnyside councilman, small business owners rally for commercial rent control",
    canonicalUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
    archiveTimestamp: "20200809200156",
    publishedAt: "2019-12-18"
  },
  {
    sourceId: "SRC-PRESS-FAIR-SUNNYSIDE-RENT-CONTROL-2019-12-18",
    campaignId: "fair-rent-nyc",
    organization: "Sunnyside Post",
    title: "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes",
    canonicalUrl: "https://qns.com/2019/12/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes/",
    archiveTimestamp: "20250623151452",
    archiveOriginalUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
    publishedAt: "2019-12-18"
  },
  {
    sourceId: "SRC-PRESS-FAIR-JEWISH-VOICE-MOM-POP-2019-11-11",
    campaignId: "fair-rent-nyc",
    organization: "The Jewish Voice",
    title: "Brooklyn Councilman Aims to Save Mom-and-Pop Retail Outlets",
    canonicalUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    archiveTimestamp: "20191214161746",
    publishedAt: "2019-11-11"
  }
] satisfies CampaignPressArticleSeed[];

function formatPublicCitation(seed: CampaignPressArticleSeed) {
  const author = seed.author ? `${seed.author}, ` : "";
  const date = seed.publishedAt ? `, ${seed.publishedAt}` : "";
  return `${author}'${seed.title},' ${seed.organization}${date}.`;
}

function archiveUrl(seed: CampaignPressArticleSeed) {
  return `https://web.archive.org/web/${seed.archiveTimestamp}/${seed.archiveOriginalUrl ?? seed.canonicalUrl}`;
}

export const campaignPressSources = [
  {
    id: "SRC-NYCAC-LET-NYC-DANCE-PRESS-INDEX-2026-05-11",
    title: "Let NYC Dance captured Press sections",
    organization: "NYC Artist Coalition / Let NYC Dance coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2026-05-11T05:55:41Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20260511055541/https://letnycdance.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Let NYC Dance archived campaign page, May 11, 2026 capture.",
    publicNote: "The capture preserves 21 distinct article placements across the page's Press displays after responsive duplicate markup is collapsed.",
    supportsGenerally: [
      "the Let NYC Dance captured Press displays listed 21 distinct articles"
    ],
    doesNotEstablish: [
      "that the 21 links are every article ever published about Let NYC Dance",
      "that Jamie authored or was quoted in every listed article",
      "agreement with every assertion in the listed articles"
    ]
  },
  {
    id: "SRC-NYCAC-TALKS-NOT-RAIDS-PRESS-INDEX-2026-04-16",
    title: "Talks Not Raids archived Press section",
    organization: "NYC Artist Coalition / Talks Not Raids coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2026-04-16T02:22:27Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://talksnotraids.com/",
    archiveUrl: "https://web.archive.org/web/20260416022227/https://talksnotraids.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Talks Not Raids archived campaign page, April 16, 2026 capture.",
    publicNote: "The capture preserves a seven-article Press section.",
    supportsGenerally: [
      "the Talks Not Raids captured Press section listed seven articles"
    ],
    doesNotEstablish: [
      "that the seven links are every article ever published about Talks Not Raids",
      "that Jamie authored or was quoted in every listed article",
      "agreement with every assertion in the listed articles"
    ]
  },
  {
    id: "SRC-NYCAC-SAVE-NYC-SPACES-PRESS-INDEX-2026-05-21",
    title: "Save NYC Spaces captured Press sections",
    organization: "NYC Artist Coalition / Save NYC Spaces coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2026-05-21T13:34:38Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20260521133438/https://savenycspaces.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Save NYC Spaces archived campaign page, May 21, 2026 capture.",
    publicNote: "The capture preserves eight distinct article placements across the page's Press displays.",
    supportsGenerally: [
      "the Save NYC Spaces captured Press displays listed eight distinct articles"
    ],
    doesNotEstablish: [
      "that the eight links are every article ever published about Save NYC Spaces",
      "that Jamie authored or was quoted in every listed article",
      "agreement with every assertion in the listed articles"
    ]
  },
  {
    id: "SRC-FAIR-RENT-PRESS-INDEX-2021-12-01",
    title: "Fair Rent NYC archived press section",
    organization: "Fair Rent NYC / NYC Artist Coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2021-12-01T10:44:25Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://fairrentnyc.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Fair Rent NYC archived campaign page, December 1, 2021 capture.",
    publicNote: "The archived campaign page preserves a nine-article Press section that is no longer present on the current homepage in the same form.",
    supportsGenerally: [
      "the Fair Rent NYC Press section listed nine articles in the captured page",
      "the campaign curated reporting on storefront vacancy, commercial rents, and commercial-rent policy"
    ],
    doesNotEstablish: [
      "that the nine links are every article ever published about Fair Rent NYC",
      "that Jamie authored or was quoted in every listed article",
      "the current content or completeness of the live Fair Rent NYC site"
    ]
  },
  ...campaignPressArticleSeeds.map((seed): SourceRecord => ({
    id: seed.sourceId,
    title: seed.title,
    organization: seed.organization,
    ...(seed.author ? { author: seed.author } : {}),
    kind: "published-article",
    visibility: "public",
    preservationStatus: "archived",
    ...(seed.publishedAt ? { publishedAt: seed.publishedAt } : {}),
    accessedAt: "2026-07-13",
    canonicalUrl: seed.canonicalUrl,
    archiveUrl: archiveUrl(seed),
    preferredPublicUrl: "archive",
    publicCitation: formatPublicCitation(seed),
    publicNote: `The ${campaignPressCampaigns[seed.campaignId].title} campaign site's Press section listed this article. A Wayback snapshot preserves it for later close reading.`,
    supportsGenerally: [
      `The captured ${campaignPressCampaigns[seed.campaignId].title} Press section listed this article.`
    ],
    doesNotEstablish: [
      "Jamie's authorship, quotation, or individual role unless the article is separately close-read and linked to a bounded claim",
      "that one person, organization, campaign, or article solely caused a public outcome",
      "that every assertion in the article is independently verified by this ingestion record"
    ]
  }))
] satisfies SourceRecord[];

export const campaignPressManifests = [
  {
    campaignId: "let-nyc-dance",
    indexSourceId: "SRC-NYCAC-LET-NYC-DANCE-PRESS-INDEX-2026-05-11",
    articleSourceIds: [
      "SRC-PRESS-LND-NYT-2017-10-30",
      "SRC-PRESS-LND-NEW-YORKER-2017-07-03",
      "SRC-PRESS-LND-VILLAGE-VOICE-CABARET",
      "SRC-PRESS-LND-NY-POST-2017-09-14",
      "SRC-PRESS-LND-DAILY-NEWS-FOOTLOOSE",
      "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE",
      "SRC-PRESS-LND-FORBES-2017-10-04",
      "SRC-NYCAC-GOTHAMIST-2017-06-19",
      "SRC-PRESS-LND-SMITHSONIAN-2017-09-22",
      "SRC-PRESS-LND-DNAINFO-2017-06-20",
      "SRC-NYCAC-NPR-2017-09-20",
      "SRC-PRESS-LND-CRAINS-2017-06-19",
      "SRC-PRESS-LND-METRO-NY-CABARET",
      "SRC-PRESS-LND-BROOKLYN-EAGLE-2017-05-12",
      "SRC-PRESS-LND-BROOKLYN-PAPER-2017-04-07",
      "SRC-PRESS-LND-TIMEOUT-2017-08-15",
      "SRC-PRESS-LND-QUEENS-CHRONICLE-CABARET",
      "SRC-PRESS-LND-BEDFORD-BOWERY-CABARET-2017",
      "SRC-PRESS-LND-VICE-THUMP-CABARET",
      "SRC-PRESS-LND-SFGATE-NO-DANCING",
      "SRC-PRESS-LND-MIXMAG-NO-DANCING"
    ]
  },
  {
    campaignId: "talks-not-raids",
    indexSourceId: "SRC-NYCAC-TALKS-NOT-RAIDS-PRESS-INDEX-2026-04-16",
    articleSourceIds: [
      "SRC-PRESS-TNR-GOTHAMIST-2019-02-12",
      "SRC-PRESS-TNR-VILLAGE-VOICE-PALISADES-2016-12-08",
      "SRC-PRESS-TNR-BEDFORD-BOWERY-DISCO-DISCORD-2019",
      "SRC-PRESS-TNR-BAFFLER-CUT-THE-MUSIC",
      "SRC-PRESS-TNR-NYT-NIGHTCLUBS-2002-11-10",
      "SRC-PRESS-TNR-AMNY-NIGHTLIFE-MAYOR",
      "SRC-PRESS-TNR-OBSERVER-NIGHT-MAYOR-2018"
    ]
  },
  {
    campaignId: "save-nyc-spaces",
    indexSourceId: "SRC-NYCAC-SAVE-NYC-SPACES-PRESS-INDEX-2026-05-21",
    articleSourceIds: [
      "SRC-PRESS-SAVE-DAILY-NEWS-OFFICE-NIGHTLIFE",
      "SRC-NYCAC-NPR-2017-09-20",
      "SRC-PRESS-SAVE-CITYLAB-NIGHTLIFE-MAYOR",
      "SRC-PRESS-SAVE-NY-POST-OFFICE-NIGHTLIFE-2017-09-19",
      "SRC-PRESS-SAVE-GOTHAMIST-OFFICE-NIGHTLIFE-2017-09-20",
      "SRC-PRESS-SAVE-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017-09-20",
      "SRC-NYCAC-BEDFORD-BOWERY-NIGHT-MAYOR",
      "SRC-PRESS-SAVE-BROOKLYNVEGAN-OFFICE-NIGHTLIFE"
    ]
  },
  {
    campaignId: "fair-rent-nyc",
    indexSourceId: "SRC-FAIR-RENT-PRESS-INDEX-2021-12-01",
    articleSourceIds: [
      "SRC-PRESS-FAIR-NYT-EMPTY-STOREFRONTS-2018-09-06",
      "SRC-PRESS-FAIR-DAILY-NEWS-RENT-HIKES-2019-11-14",
      "SRC-PRESS-FAIR-CURBED-RENT-STABILIZATION-2019-11-08",
      "SRC-PRESS-FAIR-AMNY-VACANT-STOREFRONTS-2019-01-17",
      "SRC-PRESS-FAIR-ATLANTIC-RICH-GHOST-TOWN-2018-10-15",
      "SRC-PRESS-FAIR-GOTHAMIST-NEIRS-2020-01-13",
      "SRC-PRESS-FAIR-QNS-RENT-CONTROL-2019-12-18",
      "SRC-PRESS-FAIR-SUNNYSIDE-RENT-CONTROL-2019-12-18",
      "SRC-PRESS-FAIR-JEWISH-VOICE-MOM-POP-2019-11-11"
    ]
  }
] as const;

export const campaignPressArticleSourceIds = [
  ...new Set(campaignPressManifests.flatMap((manifest) => manifest.articleSourceIds))
];

export const campaignPressClaims = [
  {
    id: "CLM-NYCAC-CAMPAIGN-PRESS-CORPUS",
    project: "nyc-artist-coalition",
    internalClaim: "The captured Press sections from four NYC Artist Coalition campaign sites preserve 45 article placements representing 44 unique articles across Cabaret Law repeal, M.A.R.C.H. transparency, Office of Nightlife advocacy, and Commercial Rent Stabilization.",
    status: "confirmed-with-boundary",
    projections: [
      {
        key: "archive-note",
        text: "Four campaign Press sections preserve 45 article placements representing 44 unique articles.",
        status: "hold",
        citationRequired: true,
        surfaces: [],
        rationale: "Keep the aggregate available to future compositions without mistaking a campaign bibliography for a public-facing claim about Jamie's individual impact."
      }
    ],
    evidence: campaignPressManifests.map((manifest) => ({
      sourceId: manifest.indexSourceId,
      relationship: "direct-support",
      supports: [`${manifest.articleSourceIds.length} listed Press-section placements`],
      locator: "Press section",
      confidence: "high",
      renderCitation: true
    })),
    boundaries: [
      "Count placements separately from unique articles because the same NPR article appears in two campaign Press sections.",
      "Treat this as a bounded bibliography claim, not evidence that every article centers Jamie or verifies every campaign assertion."
    ],
    antiClaims: [
      "Forty-five independent articles prove Jamie's individual impact.",
      "Every listed article names Jamie.",
      "The captured Press sections are complete histories of the four issues.",
      "Campaign selection proves every proposition in the linked reporting."
    ],
    researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CORPUS"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex public-source review"]
  }
] satisfies ClaimRecord[];

export const campaignPressIntake = campaignPressManifests.map(
  (manifest): IntakeRecordInput => {
    const campaign = campaignPressCampaigns[manifest.campaignId];
    return {
      id: `INT-${manifest.campaignId.toUpperCase()}-PRESS-CORPUS-2026-07-13`,
      receivedAt: "2026-07-13",
      kind: "public-url",
      visibility: "public-safe",
      title: `${campaign.title} press-section corpus`,
      description: `Lossless inventory of the ${manifest.articleSourceIds.length} article placements in the campaign site's Press section, with canonical and Wayback URLs preserved.`,
      whyItMatters: "Preserves independent reporting and historical context for future source-backed claim development without forcing every article into the current site composition.",
      projectIds: [...campaign.projectIds],
      status: "researching",
      disposition: "inquiry-opened",
      dispositionNote: "Recorded every listed article as a source and opened a bounded close-reading inquiry; no new personal-causality claim was inferred from a headline or campaign placement.",
      sourceIds: [manifest.indexSourceId, ...manifest.articleSourceIds],
      claimIds: ["CLM-NYCAC-CAMPAIGN-PRESS-CORPUS"],
      inquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CORPUS"],
      boundaries: [
        "A campaign press-section placement establishes selection and relevance, not endorsement or independent verification.",
        "Close-read an article before using it to support a specific claim about Jamie, a collaborator, or a policy outcome."
      ]
    };
  }
);

export const campaignPressInquiries = [
  {
    id: "INQ-NYCAC-CAMPAIGN-PRESS-CORPUS",
    project: "nyc-artist-coalition",
    question: "What claims, role evidence, collaborator credit, policy chronology, and public context can be responsibly developed from every article listed in the four NYC Artist Coalition campaign press sections?",
    methods: [
      "Inspected the live Let NYC Dance, Talks Not Raids, and Save NYC Spaces pages and preserved dated Wayback captures of their Press sections.",
      "Recovered the historical Fair Rent NYC Press section from the user-supplied December 1, 2021 Wayback capture.",
      "Normalized 45 campaign placements to 44 unique article source IDs, preserving the NPR article listed by two campaigns as one source.",
      "Queried the Wayback availability API for all 44 unique article URLs and recorded a retrievable snapshot for each.",
      "Separated source ingestion from claim promotion so headlines and campaign selection cannot silently become personal accomplishment claims."
    ],
    runAt: "2026-07-13",
    resultStatus: "partially-recovered",
    findings: [
      "The captured Press sections contain 21 Let NYC Dance placements, 7 Talks Not Raids placements, 8 Save NYC Spaces placements, and 9 Fair Rent NYC placements.",
      "The 45 placements represent 44 unique articles because the same NPR article appears in both Let NYC Dance and Save NYC Spaces.",
      "All 44 unique articles have a retrievable Wayback snapshot recorded in the knowledge bank.",
      "Three articles were already canonical sources for bounded NYC Artist Coalition claims; the remaining articles are now preserved for claim-by-claim close reading."
    ],
    limitations: [
      "This is complete for the four captured Press sections, not necessarily every article ever published about the campaigns.",
      "Not every article body received claim-level close reading in this ingestion pass.",
      "A campaign's decision to list an article does not establish agreement with every assertion in it.",
      "Wayback snapshots may omit interactive media, images, scripts, or paywalled content.",
      "Do not infer Jamie's authorship, quotation, leadership, or individual causality without article-level evidence."
    ],
    sourceIds: [
      ...campaignPressManifests.map((manifest) => manifest.indexSourceId),
      ...campaignPressArticleSourceIds
    ],
    publicSummary: "The four captured campaign Press sections preserve 45 placements representing 44 unique articles. Every unique article now has a canonical source record and Wayback snapshot; article-level claim promotion remains a separate close-reading task."
  }
] satisfies ResearchInquiry[];
