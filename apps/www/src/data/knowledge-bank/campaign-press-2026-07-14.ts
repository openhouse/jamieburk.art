import type {
  CampaignPressPlacement,
  ClaimRecord,
  IntakeRecord,
  ResearchInquiry,
  SourceRecord
} from "./schema.ts";

type CampaignId =
  | "let-nyc-dance"
  | "talks-not-raids"
  | "save-nyc-spaces"
  | "fair-rent-nyc";

type IdentityStatus = CampaignPressPlacement["identityStatus"];

type ArticleSeed = {
  sourceId: string;
  organization: string;
  author?: string;
  title: string;
  canonicalUrl: string;
  publishedAt?: string;
  archiveUrl?: string;
  preservationStatus?: SourceRecord["preservationStatus"];
};

type PlacementSeed = {
  campaign: CampaignId;
  position: number;
  articleSourceId: string;
  listedPublisher: string;
  listedTitle: string;
  listedUrl: string;
  identityStatus: IdentityStatus;
};

const campaignDefinitions = {
  "let-nyc-dance": {
    label: "Let NYC Dance",
    project: "cabaret-law-repeal",
    indexSourceId: "SRC-NYCAC-LET-NYC-DANCE-PRESS-INDEX",
    claimId: "CLM-NYCAC-LET-NYC-DANCE-PRESS-INDEX",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20171025195415/http://letnycdance.nycartc.com/",
    captureFingerprint: "sha256:030cfd26c1aef8f8d3ca224ecfbc02a70e5b16908507eb7635d7d6727b1ab7b6",
    count: 21,
    projectHints: ["nyc-artist-coalition", "cabaret-law-repeal", "nyc-nightlife-policy"]
  },
  "talks-not-raids": {
    label: "Talks Not Raids",
    project: "talks-not-raids",
    indexSourceId: "SRC-NYCAC-TALKS-NOT-RAIDS-PRESS-INDEX",
    claimId: "CLM-NYCAC-TALKS-NOT-RAIDS-PRESS-INDEX",
    canonicalUrl: "https://talksnotraids.com/",
    archiveUrl: "https://web.archive.org/web/20190723224601/https://talksnotraids.com/",
    captureFingerprint: "sha256:1e146b5ca84c470ff448c8d3180e20efc2517fff1367a5cba3680eb06b8a67cc",
    count: 7,
    projectHints: ["nyc-artist-coalition", "talks-not-raids", "nyc-nightlife-policy"]
  },
  "save-nyc-spaces": {
    label: "Save NYC Spaces",
    project: "save-nyc-spaces",
    indexSourceId: "SRC-NYCAC-SAVE-NYC-SPACES-PRESS-INDEX",
    claimId: "CLM-NYCAC-SAVE-NYC-SPACES-PRESS-INDEX",
    canonicalUrl: "https://savenycspaces.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20180626234111/http://savenycspaces.nycartc.com/",
    captureFingerprint: "sha256:70a3e1e4f36beaabe58ce06d9ec2d1f95adad2a919fd5a0e0796aa27bcf120e4",
    count: 8,
    projectHints: ["nyc-artist-coalition", "save-nyc-spaces", "nyc-nightlife-policy"]
  },
  "fair-rent-nyc": {
    label: "Fair Rent NYC",
    project: "fair-rent-nyc",
    indexSourceId: "SRC-NYCAC-FAIR-RENT-NYC-PRESS-INDEX",
    claimId: "CLM-NYCAC-FAIR-RENT-NYC-PRESS-INDEX",
    canonicalUrl: "https://fairrentnyc.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    captureFingerprint: "sha256:97a25366150db994d2eb243beef31503499d5d123c15972066ea44889d1ac2b0",
    count: 9,
    projectHints: ["nyc-artist-coalition", "fair-rent-nyc", "commercial-rent-stabilization"]
  }
} as const;

const articleSeeds: ArticleSeed[] = [
  { sourceId: "SRC-PRESS-NYTIMES-BOOGIE-2017", organization: "The New York Times", title: "After 91 Years, New York Will Let Its People Boogie", canonicalUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", publishedAt: "2017-10-30", archiveUrl: "https://web.archive.org/web/20171030115822/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", preservationStatus: "live-and-archived" },
  { sourceId: "SRC-PRESS-NEW-YORKER-DANCE-OUTLAWS-2017", organization: "The New Yorker", title: "Dance Outlaws Fight for the Right to Party", canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", publishedAt: "2017-07-03" },
  { sourceId: "SRC-PRESS-NYPOST-CABARET-LAW-2017", organization: "New York Post", title: "De Blasio might scrap ridiculous law banning dancing in bars", canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", publishedAt: "2017-09-14" },
  { sourceId: "SRC-PRESS-VILLAGE-VOICE-CABARET-LAW-2017", organization: "The Village Voice", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", canonicalUrl: "https://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", archiveUrl: "https://web.archive.org/web/20170330230339/http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-NY-DAILY-NEWS-FOOTLOOSE-2017", organization: "New York Daily News", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", canonicalUrl: "https://www.nydailynews.com/2017/06/19/footloose-new-yorkers-go-after-archaic-cabaret-law-banning-dancing-in-most-city-bars/", publishedAt: "2017-06-19" },
  { sourceId: "SRC-PRESS-WNYC-BUREAUCRATIC-DANCE-2017", organization: "WNYC", title: "The Bureaucratic Dance to End NYC Cabaret Law", canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law" },
  { sourceId: "SRC-PRESS-FORBES-CABARET-REPEAL-2017", organization: "Forbes", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/", publishedAt: "2017-10-04" },
  { sourceId: "SRC-PRESS-SMITHSONIAN-DANCING-RULE-2017", organization: "Smithsonian Magazine", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/" },
  { sourceId: "SRC-PRESS-DNAINFO-CABARET-LAW-2017", organization: "DNAinfo", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/", publishedAt: "2017-06-20" },
  { sourceId: "SRC-PRESS-CRAINS-CABARET-REPEAL-2017", organization: "Crain's New York Business", title: "City Council moves to repeal 'racist' cabaret law", canonicalUrl: "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882/new-york-city-council-moves-to-repeal-racist-cabaret-law", publishedAt: "2017-06-19", archiveUrl: "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-METRO-CABARET-LAWS-2017", organization: "Metro New York", title: "Arts advocates renew call to end New York City's antiquated cabaret laws", canonicalUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", publishedAt: "2017-05-31", archiveUrl: "https://web.archive.org/web/20170601131358/http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-BROOKLYN-EAGLE-DANCE-LICENSES-2017", organization: "Brooklyn Daily Eagle", title: "There are only 17 places in Brooklyn where you can legally dance", canonicalUrl: "https://brooklyneagle.com/55343/there-are-only-17-places-in-brooklyn-where-you-can-legally-dance/", publishedAt: "2017-05-12" },
  { sourceId: "SRC-PRESS-BROOKLYN-PAPER-CABARET-LAW-2017", organization: "Brooklyn Paper", title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", canonicalUrl: "https://www.brooklynpaper.com/think-i-better-dance-now-two-bushwick-councilmen-fight-for-your-right-to-party/", publishedAt: "2017-04-04" },
  { sourceId: "SRC-PRESS-TIMEOUT-CABARET-LAW-2017", organization: "Time Out New York", title: "It's time to make it legal to dance anywhere the f*ck you want in New York", canonicalUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", publishedAt: "2017-08-15" },
  { sourceId: "SRC-PRESS-QUEENS-CHRONICLE-CABARET-LAW-2017", organization: "Queens Chronicle", title: "Aged Cabaret Law finally at its end?", canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", publishedAt: "2017-03-30" },
  { sourceId: "SRC-PRESS-BEDFORD-CABARET-REPEAL-2017", organization: "Bedford + Bowery", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", publishedAt: "2017-09-15" },
  { sourceId: "SRC-PRESS-VICE-THUMP-NYCAC-DANCE-2017", organization: "Vice Thump", author: "Alexander Iadarola", title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety", canonicalUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", publishedAt: "2017-03-21", archiveUrl: "https://web.archive.org/web/20170322004758/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-SFGATE-NO-DANCING-LAW-2017", organization: "SFGate", title: "New York City apparently has a 'No Dancing' law", canonicalUrl: "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", archiveUrl: "https://web.archive.org/web/20170322193516/http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-MIXMAG-NO-DANCING-LAW-2017", organization: "Mixmag", title: "NYC activists aim to repeal local 'no dancing law'", canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news" },
  { sourceId: "SRC-PRESS-GOTHAMIST-MARCH-RAIDS-2019", organization: "Gothamist", title: "Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs", canonicalUrl: "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs", publishedAt: "2019-02-12" },
  { sourceId: "SRC-PRESS-VILLAGE-VOICE-PALISADES-2016", organization: "The Village Voice", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", canonicalUrl: "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", publishedAt: "2016-12-08" },
  { sourceId: "SRC-PRESS-BEDFORD-MARCH-RAIDS-2019", organization: "Bedford + Bowery", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", publishedAt: "2019-02-12" },
  { sourceId: "SRC-PRESS-BAFFLER-CUT-THE-MUSIC", organization: "The Baffler", author: "Liz Pelly", title: "Cut the Music", canonicalUrl: "https://thebaffler.com/latest/cut-the-music-pelly", publishedAt: "2018-02-12", archiveUrl: "https://web.archive.org/web/20190109043138/https://thebaffler.com/latest/cut-the-music-pelly", preservationStatus: "live-and-archived" },
  { sourceId: "SRC-PRESS-NYTIMES-NIGHTCLUB-ENFORCEMENT-2002", organization: "The New York Times", title: "City Cracks Down on Nightclubs and May Revise Its Policies", canonicalUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", publishedAt: "2002-11-10", archiveUrl: "https://web.archive.org/web/20131229155825/http://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", preservationStatus: "live-and-archived" },
  { sourceId: "SRC-PRESS-AMNY-NIGHTLIFE-MAYOR-2018", organization: "amNewYork", title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'", canonicalUrl: "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/", publishedAt: "2018-03-27" },
  { sourceId: "SRC-PRESS-OBSERVER-NIGHTLIFE-MAYOR-2018", organization: "Observer", title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", canonicalUrl: "https://observer.com/2018/03/new-york-city-night-mayor/", publishedAt: "2018-03-27" },
  { sourceId: "SRC-PRESS-NY-DAILY-NEWS-OFFICE-NIGHTLIFE-2017", organization: "New York Daily News", title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", canonicalUrl: "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/", publishedAt: "2017-09-19" },
  { sourceId: "SRC-PRESS-NYPOST-OFFICE-NIGHTLIFE-2017", organization: "New York Post", title: "De Blasio's newest city agency: Office of Nightlife", canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", publishedAt: "2017-09-19" },
  { sourceId: "SRC-PRESS-GOTHAMIST-NIGHTLIFE-MAYOR-2017", organization: "Gothamist", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Night Mayor'", canonicalUrl: "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor", publishedAt: "2017-09-20" },
  { sourceId: "SRC-PRESS-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017", organization: "Brooklyn Daily Eagle", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", canonicalUrl: "https://brooklyneagle.com/60477/a-new-era-mayor-de-blasio-signs-bill-to-create-nyc-office-of-nightlife/", publishedAt: "2017-09-20" },
  { sourceId: "SRC-PRESS-CITYLAB-NIGHTLIFE-MAYOR-2017", organization: "CityLab / Bloomberg", title: "How to Be a Good 'Nightlife Mayor'", canonicalUrl: "https://www.bloomberg.com/news/articles/2017-09-26/what-american-cities-need-from-night-mayors", publishedAt: "2017-09-26" },
  { sourceId: "SRC-PRESS-BROOKLYN-VEGAN-OFFICE-NIGHTLIFE-2017", organization: "BrooklynVegan", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", publishedAt: "2017-09-20", archiveUrl: "https://web.archive.org/web/20170920224824/http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", preservationStatus: "live-and-archived" },
  { sourceId: "SRC-PRESS-NYTIMES-STOREFRONT-VACANCY-2018", organization: "The New York Times", title: "The Empty Storefronts of New York: A Panoramic View", canonicalUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", publishedAt: "2018-09-07" },
  { sourceId: "SRC-PRESS-NY-DAILY-NEWS-COMMERCIAL-RENT-2019", organization: "New York Daily News", title: "Pols, small-biz owners rally for law limiting rent hikes on NYC's beleaguered mom-and-pop shops", canonicalUrl: "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/", publishedAt: "2019-11-14" },
  { sourceId: "SRC-PRESS-CURBED-COMMERCIAL-RENT-2019", organization: "Curbed", title: "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?", canonicalUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", publishedAt: "2019-11-08", archiveUrl: "https://web.archive.org/web/20191108193710/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", preservationStatus: "archived" },
  { sourceId: "SRC-PRESS-AMNY-VACANT-STOREFRONTS-2019", organization: "amNewYork", title: "The sad story behind NYC vacant storefronts", canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/", publishedAt: "2019-01-17" },
  { sourceId: "SRC-PRESS-ATLANTIC-MANHATTAN-RETAIL-2018", organization: "The Atlantic", title: "What's the Matter With Manhattan?", canonicalUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", publishedAt: "2018-10-15" },
  { sourceId: "SRC-PRESS-GOTHAMIST-NEIRS-RENT", organization: "Gothamist", title: "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", canonicalUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations" },
  { sourceId: "SRC-PRESS-QNS-COMMERCIAL-RENT-2019", organization: "QNS", title: "Sunnyside councilman, small business owners rally for commercial rent control", canonicalUrl: "https://qns.com/2019/12/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", publishedAt: "2019-12-18" },
  { sourceId: "SRC-PRESS-SUNNYSIDE-POST-COMMERCIAL-RENT-2019", organization: "Sunnyside Post", title: "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes", canonicalUrl: "https://qns.com/2019/12/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes/", publishedAt: "2019-12-18" },
  { sourceId: "SRC-PRESS-JEWISH-VOICE-COMMERCIAL-RENT-2019", organization: "The Jewish Voice", title: "Bklyn Councilman Aims to Save Mom & Pop Retail Outlets", canonicalUrl: "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", publishedAt: "2019-11-11", archiveUrl: "https://web.archive.org/web/20191212122458/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", preservationStatus: "live-and-archived" }
];

const placementSeeds: PlacementSeed[] = [
  { campaign: "let-nyc-dance", position: 1, articleSourceId: "SRC-PRESS-NYTIMES-BOOGIE-2017", listedPublisher: "New York Times", listedTitle: "After 91 Years, New York Will Let Its People Boogie", listedUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", identityStatus: "access-restricted-with-archive" },
  { campaign: "let-nyc-dance", position: 2, articleSourceId: "SRC-PRESS-NEW-YORKER-DANCE-OUTLAWS-2017", listedPublisher: "The New Yorker", listedTitle: "Dance Outlaws Fight for the Right to Party", listedUrl: "http://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 3, articleSourceId: "SRC-PRESS-NYPOST-CABARET-LAW-2017", listedPublisher: "New York Post", listedTitle: "De Blasio might scrap ridiculous law banning dancing in bars", listedUrl: "http://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 4, articleSourceId: "SRC-PRESS-VILLAGE-VOICE-CABARET-LAW-2017", listedPublisher: "The Village Voice", listedTitle: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", listedUrl: "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", identityStatus: "archive-backed" },
  { campaign: "let-nyc-dance", position: 5, articleSourceId: "SRC-PRESS-NY-DAILY-NEWS-FOOTLOOSE-2017", listedPublisher: "NY Daily News", listedTitle: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", listedUrl: "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 6, articleSourceId: "SRC-PRESS-WNYC-BUREAUCRATIC-DANCE-2017", listedPublisher: "WNYC", listedTitle: "The Bureaucratic Dance to End NYC Cabaret Law", listedUrl: "http://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 7, articleSourceId: "SRC-PRESS-FORBES-CABARET-REPEAL-2017", listedPublisher: "Forbes", listedTitle: "NYC Republicans Should Support Cabaret Law Repeal Effort", listedUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 8, articleSourceId: "SRC-NYCAC-GOTHAMIST-CABARET-2017", listedPublisher: "Gothamist", listedTitle: "\"The Cabaret Law has its origins in a racist crackdown on jazz clubs during the Harlem Renaissance, City Hall acknowledged Monday\"", listedUrl: "http://gothamist.com/2017/06/19/cabaret_law_nyc.php", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 9, articleSourceId: "SRC-PRESS-SMITHSONIAN-DANCING-RULE-2017", listedPublisher: "Smithsonian", listedTitle: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", listedUrl: "http://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 10, articleSourceId: "SRC-PRESS-DNAINFO-CABARET-LAW-2017", listedPublisher: "DNAinfo", listedTitle: "City Stonewalls Council, Defends 'Racist' No Dancing Law", listedUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 11, articleSourceId: "SRC-NYCAC-NPR-NIGHTLIFE-2017", listedPublisher: "NPR Music", listedTitle: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 12, articleSourceId: "SRC-PRESS-CRAINS-CABARET-REPEAL-2017", listedPublisher: "Crain's New York", listedTitle: "City Council moves to repeal 'racist' cabaret law", listedUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", identityStatus: "archive-backed" },
  { campaign: "let-nyc-dance", position: 13, articleSourceId: "SRC-PRESS-METRO-CABARET-LAWS-2017", listedPublisher: "Metro NY", listedTitle: "Arts advocates renew call to end New York City’s antiquated cabaret laws", listedUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", identityStatus: "archive-backed" },
  { campaign: "let-nyc-dance", position: 14, articleSourceId: "SRC-PRESS-BROOKLYN-EAGLE-DANCE-LICENSES-2017", listedPublisher: "Brooklyn Daily Eagle", listedTitle: "There are only 17 places in Brooklyn where you can legally dance", listedUrl: "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 15, articleSourceId: "SRC-PRESS-BROOKLYN-PAPER-CABARET-LAW-2017", listedPublisher: "Brooklyn Paper", listedTitle: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", listedUrl: "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 16, articleSourceId: "SRC-PRESS-TIMEOUT-CABARET-LAW-2017", listedPublisher: "Time Out New York", listedTitle: "It’s time to make it legal to dance anywhere the f*ck you want in New York", listedUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", identityStatus: "verified-live" },
  { campaign: "let-nyc-dance", position: 17, articleSourceId: "SRC-PRESS-QUEENS-CHRONICLE-CABARET-LAW-2017", listedPublisher: "Queens Chronicle", listedTitle: "Aged Cabaret Law finally at its end?", listedUrl: "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 18, articleSourceId: "SRC-PRESS-BEDFORD-CABARET-REPEAL-2017", listedPublisher: "Bedford and Bowery", listedTitle: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington’s Family", listedUrl: "http://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", identityStatus: "verified-redirect" },
  { campaign: "let-nyc-dance", position: 19, articleSourceId: "SRC-PRESS-VICE-THUMP-NYCAC-DANCE-2017", listedPublisher: "Vice Thump", listedTitle: "\"The Cabaret Law will be at the top of the agenda of the forthcoming meeting with the commissioner.\"", listedUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", identityStatus: "archive-backed" },
  { campaign: "let-nyc-dance", position: 20, articleSourceId: "SRC-PRESS-SFGATE-NO-DANCING-LAW-2017", listedPublisher: "SF Gate", listedTitle: "New York City apparently has a 'No Dancing' law", listedUrl: "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", identityStatus: "archive-backed" },
  { campaign: "let-nyc-dance", position: 21, articleSourceId: "SRC-PRESS-MIXMAG-NO-DANCING-LAW-2017", listedPublisher: "mixmag", listedTitle: "NYC ACTIVISTS AIM TO REPEAL LOCAL “NO DANCING LAW”", listedUrl: "http://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", identityStatus: "verified-redirect" },
  { campaign: "talks-not-raids", position: 1, articleSourceId: "SRC-PRESS-GOTHAMIST-MARCH-RAIDS-2019", listedPublisher: "Gothamist", listedTitle: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", listedUrl: "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php", identityStatus: "verified-redirect" },
  { campaign: "talks-not-raids", position: 2, articleSourceId: "SRC-PRESS-VILLAGE-VOICE-PALISADES-2016", listedPublisher: "The Village Voice", listedTitle: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", listedUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", identityStatus: "verified-redirect" },
  { campaign: "talks-not-raids", position: 3, articleSourceId: "SRC-PRESS-BEDFORD-MARCH-RAIDS-2019", listedPublisher: "Bedford + Bowery", listedTitle: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", listedUrl: "http://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", identityStatus: "verified-redirect" },
  { campaign: "talks-not-raids", position: 4, articleSourceId: "SRC-PRESS-BAFFLER-CUT-THE-MUSIC", listedPublisher: "The Baffler", listedTitle: "Cut the Music: Inside M.A.R.C.H.—the NYPD's secret, venue-closing task force", listedUrl: "https://thebaffler.com/latest/cut-the-music-pelly", identityStatus: "access-restricted-with-archive" },
  { campaign: "talks-not-raids", position: 5, articleSourceId: "SRC-PRESS-NYTIMES-NIGHTCLUB-ENFORCEMENT-2002", listedPublisher: "New York Times", listedTitle: "City Cracks Down on Nightclubs and May Revise Its Policies", listedUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", identityStatus: "access-restricted-with-archive" },
  { campaign: "talks-not-raids", position: 6, articleSourceId: "SRC-PRESS-AMNY-NIGHTLIFE-MAYOR-2018", listedPublisher: "amNewYork", listedTitle: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says ‘We have a lot of talking to do’", listedUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726", identityStatus: "verified-redirect" },
  { campaign: "talks-not-raids", position: 7, articleSourceId: "SRC-PRESS-OBSERVER-NIGHTLIFE-MAYOR-2018", listedPublisher: "Observer", listedTitle: "Here’s What New Yorkers Want the New Nightlife Mayor to Focus On", listedUrl: "https://observer.com/2018/03/new-york-city-night-mayor/", identityStatus: "verified-live" },
  { campaign: "save-nyc-spaces", position: 1, articleSourceId: "SRC-PRESS-NY-DAILY-NEWS-OFFICE-NIGHTLIFE-2017", listedPublisher: "Daily News", listedTitle: "Mayor de Blasio OKs creation of office to manage issues affecting city’s nightlife", listedUrl: "http://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 2, articleSourceId: "SRC-PRESS-NYPOST-OFFICE-NIGHTLIFE-2017", listedPublisher: "New York Post", listedTitle: "De Blasio’s newest city agency: Office of Nightlife", listedUrl: "http://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 3, articleSourceId: "SRC-PRESS-GOTHAMIST-NIGHTLIFE-MAYOR-2017", listedPublisher: "Gothamist", listedTitle: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", listedUrl: "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 4, articleSourceId: "SRC-NYCAC-NPR-NIGHTLIFE-2017", listedPublisher: "NPR", listedTitle: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 5, articleSourceId: "SRC-PRESS-BROOKLYN-EAGLE-OFFICE-NIGHTLIFE-2017", listedPublisher: "Brooklyn Daily Eagle", listedTitle: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", listedUrl: "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 6, articleSourceId: "SRC-PRESS-CITYLAB-NIGHTLIFE-MAYOR-2017", listedPublisher: "CityLab", listedTitle: "How to Be a Good 'Nightlife Mayor'", listedUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 7, articleSourceId: "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017", listedPublisher: "Bedford and Bowery", listedTitle: "What Can the Nightlife Mayor Do? The DIY Scene Discusses", listedUrl: "http://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", identityStatus: "verified-redirect" },
  { campaign: "save-nyc-spaces", position: 8, articleSourceId: "SRC-PRESS-BROOKLYN-VEGAN-OFFICE-NIGHTLIFE-2017", listedPublisher: "Brooklyn Vegan", listedTitle: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", listedUrl: "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", identityStatus: "access-restricted-with-archive" },
  { campaign: "fair-rent-nyc", position: 1, articleSourceId: "SRC-PRESS-NYTIMES-STOREFRONT-VACANCY-2018", listedPublisher: "NY Times", listedTitle: "This Space Available", listedUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", identityStatus: "verified-live" },
  { campaign: "fair-rent-nyc", position: 2, articleSourceId: "SRC-PRESS-NY-DAILY-NEWS-COMMERCIAL-RENT-2019", listedPublisher: "NY Daily News", listedTitle: "Pols, Small-Biz Owners Rally For Law Limiting Rent Hikes On NYC’s Beleaguered Mom-And-Pop Shops", listedUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html", identityStatus: "verified-redirect" },
  { campaign: "fair-rent-nyc", position: 3, articleSourceId: "SRC-PRESS-CURBED-COMMERCIAL-RENT-2019", listedPublisher: "Curbed", listedTitle: "Could Commercial Rent Stabilization Solve NYC’s Retail Vacancy Woes?", listedUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", identityStatus: "archive-backed" },
  { campaign: "fair-rent-nyc", position: 4, articleSourceId: "SRC-PRESS-AMNY-VACANT-STOREFRONTS-2019", listedPublisher: "AM New York", listedTitle: "AM New York", listedUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055", identityStatus: "verified-redirect" },
  { campaign: "fair-rent-nyc", position: 5, articleSourceId: "SRC-PRESS-ATLANTIC-MANHATTAN-RETAIL-2018", listedPublisher: "The Atlantic", listedTitle: "The Atlantic", listedUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", identityStatus: "verified-live" },
  { campaign: "fair-rent-nyc", position: 6, articleSourceId: "SRC-PRESS-GOTHAMIST-NEIRS-RENT", listedPublisher: "Gothamist", listedTitle: "Gothamist", listedUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations", identityStatus: "verified-live" },
  { campaign: "fair-rent-nyc", position: 7, articleSourceId: "SRC-PRESS-QNS-COMMERCIAL-RENT-2019", listedPublisher: "QNS", listedTitle: "QNS", listedUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", identityStatus: "verified-redirect" },
  { campaign: "fair-rent-nyc", position: 8, articleSourceId: "SRC-PRESS-SUNNYSIDE-POST-COMMERCIAL-RENT-2019", listedPublisher: "Sunnyside Post", listedTitle: "Sunnyside Post", listedUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes", identityStatus: "verified-redirect" },
  { campaign: "fair-rent-nyc", position: 9, articleSourceId: "SRC-PRESS-JEWISH-VOICE-COMMERCIAL-RENT-2019", listedPublisher: "The Jewish Voice", listedTitle: "The Jewish Voice", listedUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", identityStatus: "access-restricted-with-archive" }
];

const existingArticleSourceIds = new Set([
  "SRC-NYCAC-GOTHAMIST-CABARET-2017",
  "SRC-NYCAC-NPR-NIGHTLIFE-2017",
  "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-TOWN-HALL-2017"
]);

function formatPublicDate(value: string | undefined) {
  if (!value) return "";
  return `, ${new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC"
  }).format(new Date(`${value}T00:00:00Z`))}`;
}

function campaignIdsForSource(sourceId: string) {
  return [...new Set(
    placementSeeds
      .filter((placement) => placement.articleSourceId === sourceId)
      .map((placement) => placement.campaign)
  )];
}

export const campaignPressIndexSourceRecords = Object.entries(campaignDefinitions).map(
  ([campaignId, campaign]) => ({
    id: campaign.indexSourceId,
    title: `${campaign.label} campaign press index`,
    organization: "NYC Artist Coalition",
    kind: "project-archive" as const,
    visibility: "public" as const,
    preservationStatus: "live-and-archived" as const,
    accessedAt: "2026-07-14",
    canonicalUrl: campaign.canonicalUrl,
    archiveUrl: campaign.archiveUrl,
    preferredPublicUrl: campaignId === "fair-rent-nyc" ? "archive" as const : "canonical" as const,
    captureFingerprint: campaign.captureFingerprint,
    publicCitation: `${campaign.label} campaign site, Press section; ${campaign.count} ordered article placements recovered July 14, 2026.`,
    publicNote: campaignId === "fair-rent-nyc"
      ? "The December 1, 2021 Wayback capture preserves the historical campaign press section; the current live domain is a later publishing surface."
      : "The live campaign page and a contemporaneous Wayback capture preserve the Press section used for this intake.",
    supportsGenerally: [
      `the ${campaign.label} Press section listed ${campaign.count} ordered article placements`,
      "campaign-level association between the listed publications and the campaign's own press bibliography"
    ],
    doesNotEstablish: [
      "that every listed article mentions Jamie or NYC Artist Coalition",
      "that a listed article supports every campaign claim",
      "that Jamie authored, commissioned, or controlled the article",
      "that the press list is exhaustive"
    ]
  })
) satisfies SourceRecord[];

export const campaignPressArticleSourceRecords = articleSeeds.map((article) => {
  const campaignLabels = campaignIdsForSource(article.sourceId)
    .map((campaignId) => campaignDefinitions[campaignId].label)
    .join(" and ");
  const preservationStatus = article.preservationStatus ?? "live";
  const preferredPublicUrl = preservationStatus === "archived" ? "archive" as const : "canonical" as const;

  return {
    id: article.sourceId,
    title: article.title,
    organization: article.organization,
    ...(article.author ? { author: article.author } : {}),
    kind: "published-article" as const,
    visibility: "public" as const,
    preservationStatus,
    ...(article.publishedAt ? { publishedAt: article.publishedAt } : {}),
    accessedAt: "2026-07-14",
    canonicalUrl: article.canonicalUrl,
    ...(article.archiveUrl ? { archiveUrl: article.archiveUrl } : {}),
    preferredPublicUrl,
    publicCitation: article.author
      ? `${article.author}, '${article.title},' ${article.organization}${formatPublicDate(article.publishedAt)}.`
      : `${article.organization}, '${article.title}'${formatPublicDate(article.publishedAt)}.`,
    publicNote: `Recovered from the ${campaignLabels} campaign press bibliography. Metadata and link preservation are reviewed; substantive claim decomposition remains separate.`,
    supportsGenerally: [
      "the article's publication identity and subject as indicated by its title",
      "a public-source candidate for later campaign research and claim decomposition"
    ],
    doesNotEstablish: [
      "that Jamie is named, quoted, or credited without article-level close reading",
      "Jamie's role in the associated campaign",
      "campaign causality or policy impact",
      "support for a public portfolio claim until an explicit evidence relationship is reviewed"
    ]
  };
}) satisfies SourceRecord[];

export const campaignPressPlacementRecords = placementSeeds.map((placement) => {
  const campaign = campaignDefinitions[placement.campaign];
  return {
    id: `PRESS-${placement.campaign.toUpperCase()}-${String(placement.position).padStart(3, "0")}`,
    campaign: placement.campaign,
    indexSourceId: campaign.indexSourceId,
    articleSourceId: placement.articleSourceId,
    position: placement.position,
    listedPublisher: placement.listedPublisher,
    listedTitle: placement.listedTitle,
    listedUrl: placement.listedUrl,
    relationship: "listed-in-campaign-press-section" as const,
    identityStatus: placement.identityStatus,
    reviewStatus: "metadata-reviewed" as const,
    editorialState: "unsurfaced" as const,
    limitations: [
      "This edge proves campaign-site placement, not the article's support for a substantive claim.",
      "Close-read the article and add a separate evidence relationship before using it in public prose."
    ],
    reviewedAt: "2026-07-14"
  };
}) satisfies CampaignPressPlacement[];

export const campaignPressIntakeRecords = [
  ...Object.entries(campaignDefinitions).map(([campaignId, campaign]) => ({
    id: `INTAKE-${campaignId.toUpperCase()}-PRESS-INDEX-2026`,
    capturedAt: "2026-07-14",
    capturedBy: "Codex campaign-site and Wayback review",
    kind: "public-url" as const,
    title: `${campaign.label} campaign press index`,
    publicSafeSummary: `Campaign-maintained Press section with ${campaign.count} ordered article placements, recovered from the live site and archival preservation.`,
    whyItMatters: "Preserves the campaign's own bibliography as a research finding aid without converting every listed article into proof of Jamie's role.",
    projectHints: [...campaign.projectHints],
    maturity: "decomposed" as const,
    publicUse: "public-linkable" as const,
    editorialState: "unsurfaced" as const,
    disposition: "claim-candidate-created" as const,
    canonicalUrl: campaign.canonicalUrl,
    sourceIds: [campaign.indexSourceId],
    claimIds: [campaign.claimId],
    inquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CATALOG-2026"],
    limitations: ["The index documents selection and association, not article content, authorship, endorsement, or causality."],
    nextActions: ["Use the indexed articles as a prioritized source-discovery queue; close-read and decompose only the sources needed for a defensible claim."]
  })),
  ...articleSeeds.map((article) => {
    const campaignIds = campaignIdsForSource(article.sourceId);
    const projectHints = [...new Set(campaignIds.flatMap(
      (campaignId) => [...campaignDefinitions[campaignId].projectHints]
    ))];
    return {
      id: `INTAKE-${article.sourceId.replace(/^SRC-/, "")}-2026`,
      capturedAt: "2026-07-14",
      capturedBy: "Codex campaign-press metadata review",
      kind: "public-url" as const,
      title: article.title,
      publicSafeSummary: `Published article indexed by ${campaignIds.map((campaignId) => campaignDefinitions[campaignId].label).join(" and ")}.`,
      whyItMatters: "Keeps a campaign-selected source discoverable for future close reading and claim development.",
      projectHints,
      maturity: "metadata-reviewed" as const,
      publicUse: "public-linkable" as const,
      editorialState: "unsurfaced" as const,
      disposition: "source-created" as const,
      canonicalUrl: article.canonicalUrl,
      sourceIds: [article.sourceId],
      claimIds: [],
      inquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CATALOG-2026"],
      limitations: ["Metadata and campaign placement are reviewed; the article has not yet been close-read or decomposed into claim-bearing evidence."],
      nextActions: ["Close-read the article before attaching it to an atomic claim or selecting it for website projection."]
    };
  })
] satisfies IntakeRecord[];

export const campaignPressClaimRecords = Object.values(campaignDefinitions).map(
  (campaign) => ({
    id: campaign.claimId,
    project: campaign.project,
    internalClaim: `The recovered ${campaign.label} campaign Press section contains ${campaign.count} ordered article placements.`,
    status: "confirmed-with-boundary" as const,
    projections: [],
    evidence: [{
      sourceId: campaign.indexSourceId,
      relationship: "direct-support" as const,
      supports: ["press-section existence", "ordered article-placement count", "campaign-level source association"],
      locator: `Press section; ${campaign.count} ordered entries`,
      confidence: "high" as const,
      renderCitation: false
    }],
    boundaries: ["The index establishes placement only; each article needs a separate close-read evidence relationship before it supports a substantive claim."],
    antiClaims: [
      "Every listed article names or credits Jamie.",
      "The press index proves Jamie caused the campaign outcome.",
      "Every article supports every claim associated with the campaign."
    ],
    researchInquiryIds: ["INQ-NYCAC-CAMPAIGN-PRESS-CATALOG-2026"],
    reviewedAt: "2026-07-14",
    reviewedBy: ["Codex campaign-site and Wayback review"]
  })
) satisfies ClaimRecord[];

export const campaignPressResearchInquiries = [{
  id: "INQ-NYCAC-CAMPAIGN-PRESS-CATALOG-2026",
  project: "nyc-artist-coalition",
  question: "Which press articles were listed in the Press sections of Let NYC Dance, Talks Not Raids, Save NYC Spaces, and Fair Rent NYC, and how should they enter the knowledge bank?",
  methods: [
    "Recovered each campaign Press section from the live site or a supplied Wayback capture.",
    "Parsed the ordered article links, normalized article identities, and preserved the original listed title, publisher, URL, and order.",
    "Checked current destinations and used contemporaneous Wayback captures for dead, soft-redirected, or automation-restricted pages.",
    "Deduplicated shared articles while preserving each campaign-placement edge."
  ],
  runAt: "2026-07-14",
  resultStatus: "recovered",
  findings: [
    "Recovered 45 campaign press placements across four campaign sites.",
    "The placements resolve to 44 distinct article sources; one NPR article appears in both Let NYC Dance and Save NYC Spaces.",
    "Let NYC Dance contains 21 placements, Talks Not Raids 7, Save NYC Spaces 8, and Fair Rent NYC 9.",
    "Campaign placement and article metadata are reviewed separately from article-level claim decomposition."
  ],
  limitations: [
    "A campaign press index is a finding aid and association record, not proof that every article mentions Jamie or supports every campaign claim.",
    "Most newly recovered articles remain metadata-reviewed rather than close-read and claim-linked.",
    "The indexes may not be exhaustive of all campaign coverage.",
    "Live-link checks can be affected by paywalls, bot protection, and later redirects; archival links preserve identity where needed."
  ],
  sourceIds: Object.values(campaignDefinitions).map((campaign) => campaign.indexSourceId),
  publicSummary: "Four campaign press sections yielded 45 placements representing 44 distinct article sources; the catalog remains internal to the repository until individual sources are selected and decomposed."
}] satisfies ResearchInquiry[];

export const campaignPressCatalogExpectations = {
  campaignCounts: Object.fromEntries(
    Object.entries(campaignDefinitions).map(([id, campaign]) => [id, campaign.count])
  ),
  placementCount: 45,
  uniqueArticleSourceCount: 44,
  newlyCreatedArticleSourceCount: articleSeeds.length,
  existingArticleSourceIds: [...existingArticleSourceIds]
} as const;
