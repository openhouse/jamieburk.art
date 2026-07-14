import type { IntakeItem, SourceRecord } from "./schema.ts";

type CampaignId =
  | "let-nyc-dance"
  | "talks-not-raids"
  | "save-nyc-spaces"
  | "fair-rent-nyc";

type PressArticleSeed = {
  sourceId: string;
  publisher: string;
  title: string;
  listedPublisher?: string;
  listedTitle?: string;
  listedUrl: string;
  canonicalUrl?: string;
  archiveUrl?: string;
  publishedAt?: string;
  existingSource?: boolean;
  archivedOnly?: boolean;
};

type PressCampaignSeed = {
  id: string;
  campaignId: CampaignId;
  campaignTitle: string;
  campaignEntityId: string;
  intakeId: string;
  indexSourceId: string;
  indexUrl: string;
  captureKind: "live" | "archived";
  captureDigest: string;
  articles: PressArticleSeed[];
};

const pressCampaigns: PressCampaignSeed[] = [
  {
    id: "PRESS-LET-NYC-DANCE",
    campaignId: "let-nyc-dance",
    campaignTitle: "Let NYC Dance",
    campaignEntityId: "let-nyc-dance",
    intakeId: "INT-2026-07-13-PRESS-LET-NYC-DANCE",
    indexSourceId: "SRC-NYCARTC-LET-NYC-DANCE-CAMPAIGN",
    indexUrl: "https://letnycdance.nycartc.com/",
    captureKind: "live",
    captureDigest: "sha256:b6a94b07c809fd47145629ae73b66f504cd5deab975a73f923c33e1db527c7cb",
    articles: [
      { sourceId: "SRC-PRESS-LET-NYT-CABARET-REPEAL-2017", publisher: "New York Times", title: "After 91 Years, New York Will Let Its People Boogie", listedUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", archiveUrl: "https://web.archive.org/web/20251225083004/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", publishedAt: "2017-10-30" },
      { sourceId: "SRC-PRESS-LET-NEW-YORKER-DANCE-OUTLAWS-2017", publisher: "The New Yorker", title: "Dance Outlaws Fight for the Right to Party", listedUrl: "http://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", publishedAt: "2017-07-03" },
      { sourceId: "SRC-PRESS-LET-NYPOST-DANCING-BARS-2017", publisher: "New York Post", title: "De Blasio might scrap ridiculous law banning dancing in bars", listedUrl: "http://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", publishedAt: "2017-09-14" },
      { sourceId: "SRC-PRESS-LET-VILLAGE-VOICE-CABARET-2017", publisher: "The Village Voice", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", listedUrl: "http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", archiveUrl: "https://web.archive.org/web/20170504184338/http://www.villagevoice.com:80/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", archivedOnly: true },
      { sourceId: "SRC-PRESS-LET-DAILY-NEWS-FOOTLOOSE-2017", publisher: "NY Daily News", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", listedUrl: "http://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553", canonicalUrl: "https://www.nydailynews.com/2017/06/19/footloose-new-yorkers-go-after-archaic-cabaret-law-banning-dancing-in-most-city-bars/", publishedAt: "2017-06-19" },
      { sourceId: "SRC-PRESS-LET-WNYC-BUREAUCRATIC-DANCE-2017", publisher: "WNYC", title: "The Bureaucratic Dance to End NYC Cabaret Law", listedUrl: "http://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law", canonicalUrl: "https://wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law" },
      { sourceId: "SRC-PRESS-LET-FORBES-CABARET-REPEAL-2017", publisher: "Forbes", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", listedUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort", canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/", publishedAt: "2017-10-04" },
      { sourceId: "SRC-NYCARTC-GOTHAMIST-CABARET-2017", publisher: "Gothamist", title: "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law", listedTitle: "\"The Cabaret Law has its origins in a racist crackdown on jazz clubs during the Harlem Renaissance, City Hall acknowledged Monday\"", listedUrl: "http://gothamist.com/2017/06/19/cabaret_law_nyc.php", canonicalUrl: "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law", publishedAt: "2017-06-19", existingSource: true },
      { sourceId: "SRC-PRESS-LET-SMITHSONIAN-CABARET-2017", publisher: "Smithsonian", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", listedUrl: "http://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/" },
      { sourceId: "SRC-PRESS-LET-DNAINFO-CABARET-2017", publisher: "DNAinfo", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", listedUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn", canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/", publishedAt: "2017-06-20" },
      { sourceId: "SRC-NYCARTC-NPR-NIGHTLIFE-2017", publisher: "NPR Music", title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", publishedAt: "2017-09-20", existingSource: true },
      { sourceId: "SRC-PRESS-LET-CRAINS-CABARET-2017", publisher: "Crain's New York", title: "City Council moves to repeal 'racist' cabaret law", listedUrl: "http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", archiveUrl: "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", publishedAt: "2017-06-19", archivedOnly: true },
      { sourceId: "SRC-PRESS-LET-METRO-CABARET-2017", publisher: "Metro NY", title: "Arts advocates renew call to end New York City’s antiquated cabaret laws", listedUrl: "http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", archiveUrl: "https://web.archive.org/web/20170817001608/http://www.metro.us:80/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", archivedOnly: true },
      { sourceId: "SRC-PRESS-LET-BROOKLYN-EAGLE-DANCE-2017", publisher: "Brooklyn Daily Eagle", title: "There are only 17 places in Brooklyn where you can legally dance", listedUrl: "http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance", canonicalUrl: "https://brooklyneagle.com/55343/there-are-only-17-places-in-brooklyn-where-you-can-legally-dance/", publishedAt: "2017-05-12" },
      { sourceId: "SRC-PRESS-LET-BROOKLYN-PAPER-DANCE-2017", publisher: "Brooklyn Paper", title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", listedUrl: "http://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html", canonicalUrl: "https://www.brooklynpaper.com/think-i-better-dance-now-two-bushwick-councilmen-fight-for-your-right-to-party/", publishedAt: "2017-04-04" },
      { sourceId: "SRC-PRESS-LET-TIMEOUT-DANCE-2017", publisher: "Time Out New York", title: "It’s time to make it legal to dance anywhere the f*ck you want in New York", listedUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", publishedAt: "2017-08-15" },
      { sourceId: "SRC-PRESS-LET-QUEENS-CHRONICLE-CABARET-2017", publisher: "Queens Chronicle", title: "Aged Cabaret Law finally at its end?", listedUrl: "http://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", publishedAt: "2017-03-30" },
      { sourceId: "SRC-PRESS-LET-BNB-REPEAL-2017", publisher: "Bedford + Bowery", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", listedPublisher: "Bedford and Bowery", listedTitle: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington’s Family", listedUrl: "http://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", publishedAt: "2017-09-15" },
      { sourceId: "SRC-PRESS-LET-VICE-THUMP-CABARET-2017", publisher: "Vice Thump", title: "NYC Artist Coalition and Dance Liberation Network on DIY spaces and the Cabaret Law", listedTitle: "\"The Cabaret Law will be at the top of the agenda of the forthcoming meeting with the commissioner.\"", listedUrl: "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", archiveUrl: "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", archivedOnly: true },
      { sourceId: "SRC-PRESS-LET-SFGATE-DANCING-LAW-2017", publisher: "SFGate", title: "New York City apparently has a 'No Dancing' law", listedPublisher: "SF Gate", listedUrl: "http://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", archiveUrl: "https://web.archive.org/web/20220809111234/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", archivedOnly: true },
      { sourceId: "SRC-PRESS-LET-MIXMAG-CABARET-2017", publisher: "Mixmag", title: "NYC activists aim to repeal local ‘no dancing law’", listedPublisher: "mixmag", listedTitle: "NYC ACTIVISTS AIM TO REPEAL LOCAL “NO DANCING LAW”", listedUrl: "http://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news" }
    ]
  },
  {
    id: "PRESS-TALKS-NOT-RAIDS",
    campaignId: "talks-not-raids",
    campaignTitle: "Talks Not Raids",
    campaignEntityId: "talks-not-raids",
    intakeId: "INT-2026-07-13-PRESS-TALKS-NOT-RAIDS",
    indexSourceId: "SRC-NYCARTC-TALKS-NOT-RAIDS-CAMPAIGN",
    indexUrl: "https://talksnotraids.com/",
    captureKind: "live",
    captureDigest: "sha256:6f7ac052a3a5ffd912aa29af7c1d2c1ea8c79d760d94ca7c33590778bedf0483",
    articles: [
      { sourceId: "SRC-PRESS-TALKS-GOTHAMIST-MARCH-2019", publisher: "Gothamist", title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", listedUrl: "http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php", canonicalUrl: "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs", publishedAt: "2019-02-12" },
      { sourceId: "SRC-PRESS-TALKS-VILLAGE-VOICE-PALISADES-2016", publisher: "The Village Voice", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", listedUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", canonicalUrl: "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", publishedAt: "2016-12-08" },
      { sourceId: "SRC-PRESS-TALKS-BNB-RAIDS-2019", publisher: "Bedford + Bowery", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", listedUrl: "http://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", publishedAt: "2019-02-12" },
      { sourceId: "SRC-PRESS-TALKS-BAFFLER-MARCH-2019", publisher: "The Baffler", title: "Cut the Music: Inside M.A.R.C.H.—the NYPD's secret, venue-closing task force", listedUrl: "https://thebaffler.com/latest/cut-the-music-pelly", archiveUrl: "https://web.archive.org/web/20260508080121/https://thebaffler.com/latest/cut-the-music-pelly" },
      { sourceId: "SRC-PRESS-TALKS-NYT-NIGHTCLUBS-2002", publisher: "New York Times", title: "City Cracks Down on Nightclubs and May Revise Its Policies", listedUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", archiveUrl: "https://web.archive.org/web/20251104235429/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", publishedAt: "2002-11-10" },
      { sourceId: "SRC-PRESS-TALKS-AMNY-NIGHTLIFE-MAYOR-2018", publisher: "amNewYork", title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says ‘We have a lot of talking to do’", listedUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726", canonicalUrl: "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/", publishedAt: "2018-03-27" },
      { sourceId: "SRC-PRESS-TALKS-OBSERVER-NIGHTLIFE-MAYOR-2018", publisher: "Observer", title: "Here’s What New Yorkers Want the New Nightlife Mayor to Focus On", listedUrl: "https://observer.com/2018/03/new-york-city-night-mayor/", publishedAt: "2018-03-27" }
    ]
  },
  {
    id: "PRESS-SAVE-NYC-SPACES",
    campaignId: "save-nyc-spaces",
    campaignTitle: "Save NYC Spaces",
    campaignEntityId: "save-nyc-spaces",
    intakeId: "INT-2026-07-13-PRESS-SAVE-NYC-SPACES",
    indexSourceId: "SRC-NYCARTC-SAVE-NYC-SPACES-CAMPAIGN",
    indexUrl: "https://savenycspaces.nycartc.com/",
    captureKind: "live",
    captureDigest: "sha256:8c63c022a702c1cea9793ee10cc15a58739a843e1747dab9a4d81e0f56921aab",
    articles: [
      { sourceId: "SRC-PRESS-SAVE-DAILY-NEWS-NIGHTLIFE-OFFICE-2017", publisher: "NY Daily News", title: "Mayor de Blasio OKs creation of office to manage issues affecting city’s nightlife", listedPublisher: "Daily News", listedUrl: "http://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451", canonicalUrl: "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/", publishedAt: "2017-09-19" },
      { sourceId: "SRC-PRESS-SAVE-NYPOST-NIGHTLIFE-OFFICE-2017", publisher: "New York Post", title: "De Blasio’s newest city agency: Office of Nightlife", listedUrl: "http://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", publishedAt: "2017-09-19" },
      { sourceId: "SRC-PRESS-SAVE-GOTHAMIST-NIGHTLIFE-OFFICE-2017", publisher: "Gothamist", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Night Mayor'", listedTitle: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", listedUrl: "http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php", canonicalUrl: "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor", publishedAt: "2017-09-20" },
      { sourceId: "SRC-NYCARTC-NPR-NIGHTLIFE-2017", publisher: "NPR", title: "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", listedUrl: "http://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", canonicalUrl: "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", publishedAt: "2017-09-20", existingSource: true },
      { sourceId: "SRC-PRESS-SAVE-BROOKLYN-EAGLE-NIGHTLIFE-OFFICE-2017", publisher: "Brooklyn Daily Eagle", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", listedUrl: "http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", canonicalUrl: "https://brooklyneagle.com/60477/a-new-era-mayor-de-blasio-signs-bill-to-create-nyc-office-of-nightlife/", publishedAt: "2017-09-20" },
      { sourceId: "SRC-PRESS-SAVE-CITYLAB-NIGHT-MAYOR-2017", publisher: "CityLab", title: "How to Be a Good 'Nightlife Mayor'", listedUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", canonicalUrl: "https://www.bloomberg.com/news/articles/2017-09-26/what-american-cities-need-from-night-mayors", publishedAt: "2017-09-26" },
      { sourceId: "SRC-NYCARTC-BNB-NIGHT-MAYOR-TOWN-HALL-2017", publisher: "Bedford + Bowery", title: "What Can the Night Mayor Do? The DIY Scene Discusses", listedPublisher: "Bedford and Bowery", listedTitle: "What Can the Nightlife Mayor Do? The DIY Scene Discusses", listedUrl: "http://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", canonicalUrl: "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", publishedAt: "2017-10-12", existingSource: true },
      { sourceId: "SRC-PRESS-SAVE-BROOKLYN-VEGAN-NIGHTLIFE-OFFICE-2017", publisher: "Brooklyn Vegan", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", listedUrl: "http://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", archiveUrl: "https://web.archive.org/web/20250122015846/https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", publishedAt: "2017-09-20" }
    ]
  },
  {
    id: "PRESS-FAIR-RENT-NYC",
    campaignId: "fair-rent-nyc",
    campaignTitle: "Fair Rent NYC",
    campaignEntityId: "fair-rent-nyc-campaign",
    intakeId: "INT-2026-07-13-PRESS-FAIR-RENT-NYC-ARCHIVE",
    indexSourceId: "SRC-NYCARTC-FAIR-RENT-NYC-CAMPAIGN-ARCHIVE-2021",
    indexUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    captureKind: "archived",
    captureDigest: "sha256:97a25366150db994d2eb243beef31503499d5d123c15972066ea44889d1ac2b0",
    articles: [
      { sourceId: "SRC-PRESS-FAIR-NYT-STOREFRONT-VACANCY-2018", publisher: "New York Times", title: "The Empty Storefronts of New York: A Panoramic View", listedPublisher: "NY Times", listedTitle: "This Space Available", listedUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", publishedAt: "2018-09-06" },
      { sourceId: "SRC-PRESS-FAIR-DAILY-NEWS-COMMERCIAL-RENT-2019", publisher: "NY Daily News", title: "Pols, small-biz owners rally for law limiting rent hikes on NYC’s beleaguered mom-and-pop shops", listedTitle: "Pols, Small-Biz Owners Rally For Law Limiting Rent Hikes On NYC’s Beleaguered Mom-And-Pop Shops", listedUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html", canonicalUrl: "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/", publishedAt: "2019-11-14" },
      { sourceId: "SRC-PRESS-FAIR-CURBED-COMMERCIAL-RENT-2019", publisher: "Curbed", title: "Could Commercial Rent Stabilization Solve NYC’s Retail Vacancy Woes?", listedUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", archiveUrl: "https://web.archive.org/web/20251216101013/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", publishedAt: "2019-11-08", archivedOnly: true },
      { sourceId: "SRC-PRESS-FAIR-AMNY-VACANT-STOREFRONTS-2019", publisher: "amNewYork", title: "The sad story behind NYC vacant storefronts", listedPublisher: "AM New York", listedTitle: "AM New York", listedUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055", canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/", publishedAt: "2019-01-17" },
      { sourceId: "SRC-PRESS-FAIR-ATLANTIC-MANHATTAN-RETAIL-2018", publisher: "The Atlantic", title: "What's the Matter With Manhattan?", listedTitle: "The Atlantic", listedUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", publishedAt: "2018-10-15" },
      { sourceId: "SRC-PRESS-FAIR-GOTHAMIST-NEIRS-2020", publisher: "Gothamist", title: "Neir’s Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", listedTitle: "Gothamist", listedUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations" },
      { sourceId: "SRC-PRESS-FAIR-QNS-COMMERCIAL-RENT-2019", publisher: "QNS", title: "Sunnyside councilman, small business owners rally for commercial rent control", listedTitle: "QNS", listedUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", canonicalUrl: "https://qns.com/2019/12/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", publishedAt: "2019-12-18" },
      { sourceId: "SRC-PRESS-FAIR-SUNNYSIDE-COMMERCIAL-RENT-2019", publisher: "Sunnyside Post", title: "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes", listedTitle: "Sunnyside Post", listedUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes", canonicalUrl: "https://qns.com/2019/12/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes/", publishedAt: "2019-12-18" },
      { sourceId: "SRC-PRESS-FAIR-JEWISH-VOICE-COMMERCIAL-RENT-2019", publisher: "The Jewish Voice", title: "Bklyn Councilman Aims to Save Mom & Pop Retail Outlets", listedTitle: "The Jewish Voice", listedUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", canonicalUrl: "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", archiveUrl: "https://web.archive.org/web/20191214161746/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", publishedAt: "2019-11-11" }
    ]
  }
];

const campaignIntakeById = new Map(
  pressCampaigns.map((campaign) => [campaign.campaignId, campaign.intakeId])
);

const newArticleSeeds = new Map<string, PressArticleSeed & { campaignIds: CampaignId[] }>();
for (const campaign of pressCampaigns) {
  for (const article of campaign.articles) {
    if (article.existingSource) continue;
    const current = newArticleSeeds.get(article.sourceId) ?? { ...article, campaignIds: [] };
    current.campaignIds.push(campaign.campaignId);
    newArticleSeeds.set(article.sourceId, current);
  }
}

const articleSources = [...newArticleSeeds.values()].map((article): SourceRecord => {
  const intakeIds = article.campaignIds.map((id) => campaignIntakeById.get(id)!);
  const campaignTitles = article.campaignIds.map(
    (id) => pressCampaigns.find((campaign) => campaign.campaignId === id)!.campaignTitle
  );
  const canonicalUrl = article.canonicalUrl ?? article.listedUrl;
  const preservationStatus = article.archivedOnly
    ? "archived"
    : article.archiveUrl
      ? "live-and-archived"
      : "live";

  return {
    id: article.sourceId,
    title: article.title,
    organization: article.publisher,
    kind: "published-article",
    visibility: "public",
    preservationStatus,
    publishedAt: article.publishedAt,
    accessedAt: "2026-07-13",
    canonicalUrl,
    archiveUrl: article.archiveUrl,
    preferredPublicUrl: article.archivedOnly ? "archive" : "canonical",
    publicCitation: `${article.publisher}, '${article.title}'.`,
    publicNote: `Catalogued from the ${campaignTitles.join(" and ")} Press section${campaignTitles.length > 1 ? "s" : ""}; this metadata review establishes the campaign's public association with the article, not substantive support from the article body.`,
    locator: `${campaignTitles.join(" / ")} Press section listing, publisher, displayed headline, and destination-link audit.`,
    projectIds: ["nyc-artist-coalition"],
    intakeIds,
    reviewStatus: "reviewed",
    reviewDepth: "metadata",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex campaign press-index and link-metadata review"],
    supportsGenerally: [
      `The ${campaignTitles.join(" and ")} Press section${campaignTitles.length > 1 ? "s list" : " lists"} this ${article.publisher} article under the recorded headline.`,
      "The publisher identity, listed headline, campaign association, and audited public or archived destination."
    ],
    doesNotEstablish: [
      "Substantive article-body claims until a separate close reading is recorded.",
      "That the article names Jamie or attributes campaign work to him.",
      "Audience reach, editorial endorsement, or causal contribution to a policy outcome."
    ]
  };
});

const indexSources: SourceRecord[] = [
  {
    id: "SRC-NYCARTC-LET-NYC-DANCE-CAMPAIGN",
    title: "Let NYC Dance: Movement to Repeal the Cabaret Law",
    organization: "Let NYC Dance coalition",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Let NYC Dance coalition, public campaign site and Press section.",
    publicNote: "The live campaign site documents the repeal call, Council-support interface, coalition credits, media kit, and a Press section containing twenty-one article placements.",
    locator: "Campaign call to action, progress tracker, coalition credits, media kit, and Press section headed 'Press'.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-PRESS-LET-NYC-DANCE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex DOM extraction and close reading"],
    supportsGenerally: [
      "Let NYC Dance's public issue explanation and campaign interface.",
      "Twenty-one ordered press article placements in the live Press section.",
      "Coalition and media-kit credits shown on the campaign surface."
    ],
    doesNotEstablish: [
      "Jamie's sole ownership of the campaign or every editorial decision.",
      "That every listed article names Jamie or endorses every campaign claim.",
      "Audience reach or causal allocation for Cabaret Law repeal."
    ]
  },
  {
    id: "SRC-NYCARTC-FAIR-RENT-NYC-CAMPAIGN-ARCHIVE-2021",
    title: "Fair Rent NYC archived campaign site",
    organization: "Fair Rent NYC coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2021-12-01T10:44:25Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://fairrentnyc.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Fair Rent NYC coalition, archived campaign site, December 1, 2021 capture.",
    publicNote: "The archived campaign surface preserves its Commercial Rent Stabilization framing, coalition interface, media materials, and a Press section containing nine article placements.",
    locator: "December 1, 2021 Wayback capture, Press section headed 'Press', plus campaign and coalition sections.",
    projectIds: ["nyc-artist-coalition"],
    intakeIds: ["INT-2026-07-13-PRESS-FAIR-RENT-NYC-ARCHIVE"],
    reviewStatus: "reviewed",
    reviewDepth: "close-reading",
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex Wayback recovery, DOM extraction, and close reading"],
    supportsGenerally: [
      "Fair Rent NYC's archived campaign and coalition framing.",
      "Nine ordered press article placements in the archived Press section.",
      "The historical campaign surface as captured on December 1, 2021."
    ],
    doesNotEstablish: [
      "The current contents of the live domain.",
      "That every listed article names Jamie or endorses every campaign claim.",
      "Audience reach or causal allocation for legislative outcomes."
    ]
  }
];

export const campaignPressSources: SourceRecord[] = [
  ...indexSources,
  ...articleSources
];

export const campaignPressIntakes: IntakeItem[] = [
  ...pressCampaigns.map((campaign): IntakeItem => ({
    id: campaign.intakeId,
    kind: "url",
    capturedAt: "2026-07-13",
    submittedBy: "Jamie Burkart / Codex press-corpus research",
    publicSafeDescription: `${campaign.campaignTitle} campaign Press section containing ${campaign.articles.length} ordered article placements.`,
    submittedUrl: campaign.indexUrl,
    projectIds: ["nyc-artist-coalition"],
    entityIds: [campaign.campaignEntityId],
    dateHints: campaign.captureKind === "archived" ? ["2021-12-01"] : [],
    sensitivity: "public-safe",
    availability: campaign.captureKind === "archived" ? "archived" : "live",
    status: "promoted",
    sourceIds: [campaign.indexSourceId, ...campaign.articles.map((article) => article.sourceId)],
    claimIds: ["CLM-NYCARTC-CAMPAIGN-PRESS-CORPUS"],
    inquiryIds: ["INQ-NYCARTC-PRESS-CORPUS-CLOSE-READING"]
  })),
  {
    id: "INT-2026-07-13-PRESS-FAIR-RENT-NYC-LIVE",
    kind: "url",
    capturedAt: "2026-07-13",
    submittedBy: "Jamie Burkart / Codex press-corpus research",
    publicSafeDescription: "Current FairRentNYC domain checked for the historical campaign Press section.",
    submittedUrl: "https://fairrentnyc.nycartc.com/",
    projectIds: ["nyc-artist-coalition"],
    entityIds: ["fair-rent-nyc-campaign"],
    dateHints: [],
    sensitivity: "public-safe",
    availability: "live",
    status: "closed",
    sourceIds: [],
    claimIds: [],
    inquiryIds: [],
    dispositionReason: "The current live domain no longer exposes the historical campaign Press section; the December 1, 2021 Wayback capture is the inventory source."
  }
];

export const campaignPressCollections = pressCampaigns.map((campaign) => ({
  id: campaign.id,
  project: "nyc-artist-coalition",
  campaignEntityId: campaign.campaignEntityId,
  title: `${campaign.campaignTitle} press inventory`,
  indexSourceId: campaign.indexSourceId,
  capturedAt: "2026-07-13",
  captureKind: campaign.captureKind,
  captureDigest: campaign.captureDigest,
  expectedArticleCount: campaign.articles.length,
  articles: campaign.articles.map((article, index) => ({
    position: index + 1,
    sourceId: article.sourceId,
    listedPublisher: article.listedPublisher ?? article.publisher,
    listedTitle: article.listedTitle ?? article.title,
    listedUrl: article.listedUrl
  }))
}));

export const campaignPressSummary = {
  collectionCount: campaignPressCollections.length,
  placementCount: campaignPressCollections.reduce(
    (total, collection) => total + collection.articles.length,
    0
  ),
  uniqueArticleCount: new Set(
    campaignPressCollections.flatMap((collection) =>
      collection.articles.map((article) => article.sourceId)
    )
  ).size,
  metadataReviewedSourceCount: articleSources.length
};
