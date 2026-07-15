import { nycacPressReadings } from "./nycac-press-readings.ts";

const reviewedAt = "2026-07-14";
const inquiryId = "INQ-NYCAC-CAMPAIGN-PRESS-ARCHIVE";
const claimId = "CLM-NYCAC-CAMPAIGN-PRESS-ARCHIVE";

type PreservationStatus = "live" | "archived" | "live-and-archived";

type PressEntry = {
  id: string;
  sourceId: string;
  publisher: string;
  title: string;
  canonicalUrl: string;
  publishedAt?: string;
  archiveUrl?: string;
  preservationStatus: PreservationStatus;
  existingSource?: boolean;
};

type CampaignPressIndex = {
  id: string;
  name: string;
  project: string;
  projectIds: string[];
  indexSourceId: string;
  indexUrl: string;
  indexArchiveUrl?: string;
  existingIndexSource?: boolean;
  entries: PressEntry[];
};

function article(
  id: string,
  sourceId: string,
  publisher: string,
  title: string,
  canonicalUrl: string,
  publishedAt: string | undefined,
  archiveUrl: string | undefined,
  preservationStatus: PreservationStatus = archiveUrl ? "live-and-archived" : "live",
  existingSource = false
): PressEntry {
  return {
    id,
    sourceId,
    publisher,
    title,
    canonicalUrl,
    publishedAt,
    archiveUrl: archiveUrl?.replace(/^http:/, "https:"),
    preservationStatus,
    existingSource
  };
}

export const campaignPressInventory: CampaignPressIndex[] = [
  {
    id: "LET-NYC-DANCE",
    name: "Let NYC Dance",
    project: "cabaret-law",
    projectIds: ["nyc-artist-coalition", "cabaret-law"],
    indexSourceId: "SRC-NYCAC-PRESS-INDEX-LET-NYC-DANCE",
    indexUrl: "https://letnycdance.nycartc.com/",
    entries: [
      article("LET-NYC-DANCE-01", "SRC-NYCAC-NYTIMES-CABARET-REPEAL-2017-10-30", "The New York Times", "After 91 Years, New York Will Let Its People Boogie", "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", "2017-10-30", "https://web.archive.org/web/20251225083004/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", "archived"),
      article("LET-NYC-DANCE-02", "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10", "The New Yorker", "Dance Outlaws Fight for the Right to Party", "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", "2017-07-10", "https://web.archive.org/web/20260308101201/https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party"),
      article("LET-NYC-DANCE-03", "SRC-NYCAC-NYPOST-CABARET-2017-09-14", "New York Post", "De Blasio might scrap ridiculous law banning dancing in bars", "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", "2017-09-14", "https://web.archive.org/web/20250822075355/https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/"),
      article("LET-NYC-DANCE-04", "SRC-NYCAC-VILLAGE-VOICE-CABARET-LAW", "The Village Voice", "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", "https://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", undefined, "https://web.archive.org/web/20170504184338/http://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234", "archived"),
      article("LET-NYC-DANCE-05", "SRC-NYCAC-NY-DAILY-NEWS-CABARET-2017-06-19", "New York Daily News", "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", "https://www.nydailynews.com/2017/06/19/footloose-new-yorkers-go-after-archaic-cabaret-law-banning-dancing-in-most-city-bars/", "2017-06-19", "https://web.archive.org/web/20220521201023/https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553"),
      article("LET-NYC-DANCE-06", "SRC-NYCAC-WNYC-CABARET-2017", "WNYC", "The Bureaucratic Dance to End NYC Cabaret Law", "https://wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law", undefined, "https://web.archive.org/web/20251111164642/https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/"),
      article("LET-NYC-DANCE-07", "SRC-NYCAC-FORBES-CABARET-2017-10-04", "Forbes", "NYC Republicans Should Support Cabaret Law Repeal Effort", "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/", "2017-10-04", "https://web.archive.org/web/20220118055838/https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/"),
      article("LET-NYC-DANCE-08", "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19", "Gothamist", "DIY Venues Demand Repeal of Widely Reviled Cabaret Law", "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law", "2017-06-19", "https://web.archive.org/web/20190507132352/http://gothamist.com:80/2017/06/19/cabaret_law_nyc.php", "live-and-archived", true),
      article("LET-NYC-DANCE-09", "SRC-NYCAC-SMITHSONIAN-CABARET-2017", "Smithsonian Magazine", "New York City Could Finally Lose Its Prohibition-era Dancing Rule", "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/", undefined, "https://web.archive.org/web/20250911061547/https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/"),
      article("LET-NYC-DANCE-10", "SRC-NYCAC-DNAINFO-CABARET-2017-06-20", "DNAinfo", "City Stonewalls Council, Defends 'Racist' No Dancing Law", "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/", "2017-06-20", "https://web.archive.org/web/20260214132538/https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/"),
      article("LET-NYC-DANCE-11", "SRC-NYCAC-NPR-CABARET-2017-09-20", "NPR Music", "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", "2017-09-20", "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", "live-and-archived", true),
      article("LET-NYC-DANCE-12", "SRC-NYCAC-CRAINS-CABARET-2017-06-19", "Crain's New York Business", "City Council moves to repeal 'racist' cabaret law", "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882/", "2017-06-19", "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", "archived"),
      article("LET-NYC-DANCE-13", "SRC-NYCAC-METRO-CABARET-2017", "Metro New York", "Arts advocates renew call to end New York City's antiquated cabaret laws", "https://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", undefined, "https://web.archive.org/web/20170817001608/http://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws", "archived"),
      article("LET-NYC-DANCE-14", "SRC-NYCAC-BROOKLYN-EAGLE-CABARET-2017-05-12", "Brooklyn Daily Eagle", "There are only 17 places in Brooklyn where you can legally dance", "https://brooklyneagle.com/55343/there-are-only-17-places-in-brooklyn-where-you-can-legally-dance/", "2017-05-12", "https://web.archive.org/web/20181003171649/http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance"),
      article("LET-NYC-DANCE-15", "SRC-NYCAC-BROOKLYN-PAPER-CABARET-2017", "Brooklyn Paper", "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", "https://www.brooklynpaper.com/think-i-better-dance-now-two-bushwick-councilmen-fight-for-your-right-to-party/", undefined, "https://web.archive.org/web/20171101172806/https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html"),
      article("LET-NYC-DANCE-16", "SRC-NYCAC-TIMEOUT-CABARET-2017-08-15", "Time Out New York", "It's time to make it legal to dance anywhere the f*ck you want in New York", "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517", "2017-08-15", "https://web.archive.org/web/20240915134511/https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517"),
      article("LET-NYC-DANCE-17", "SRC-NYCAC-QUEENS-CHRONICLE-CABARET-2017", "Queens Chronicle", "Aged Cabaret Law finally at its end?", "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html", undefined, "https://web.archive.org/web/20200118090912/https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html"),
      article("LET-NYC-DANCE-18", "SRC-NYCAC-BEDFORD-CABARET-SUPPORT-2017", "Bedford + Bowery", "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/", undefined, "https://web.archive.org/web/20231128123137/https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/"),
      article("LET-NYC-DANCE-19", "SRC-NYCAC-VICE-THUMP-CABARET-2017", "THUMP / Vice", "NYC Artist Coalition and Dance Liberation Network press for DIY spaces", "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", undefined, "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces", "archived"),
      article("LET-NYC-DANCE-20", "SRC-NYCAC-SFGATE-CABARET-2017", "SFGate", "New York City apparently has a 'No Dancing' law", "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php", undefined, "https://web.archive.org/web/20220809111234/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php"),
      article("LET-NYC-DANCE-21", "SRC-NYCAC-MIXMAG-CABARET-NEWS-2017", "Mixmag", "NYC activists aim to repeal local 'no dancing law'", "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", undefined, "https://web.archive.org/web/20250117114813/https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news")
    ]
  },
  {
    id: "TALKS-NOT-RAIDS",
    name: "Talks Not Raids",
    project: "talks-not-raids",
    projectIds: ["nyc-artist-coalition", "talks-not-raids"],
    indexSourceId: "SRC-NYCAC-PRESS-INDEX-TALKS-NOT-RAIDS",
    indexUrl: "https://talksnotraids.com/",
    entries: [
      article("TALKS-NOT-RAIDS-01", "SRC-NYCAC-GOTHAMIST-MARCH-2019-02-12", "Gothamist", "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs", "2019-02-12", "https://web.archive.org/web/20190531184302/http://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php"),
      article("TALKS-NOT-RAIDS-02", "SRC-NYCAC-VILLAGE-VOICE-PALISADES-2016-12-08", "The Village Voice", "Palisades Owners Explain Why the Beloved Venue Was Shut Down", "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", "2016-12-08", "https://web.archive.org/web/20230129184606/https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/"),
      article("TALKS-NOT-RAIDS-03", "SRC-NYCAC-BEDFORD-MARCH-2019", "Bedford + Bowery", "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/", undefined, "https://web.archive.org/web/20260106060929/https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/"),
      article("TALKS-NOT-RAIDS-04", "SRC-NYCAC-BAFFLER-MARCH", "The Baffler", "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force", "https://thebaffler.com/latest/cut-the-music-pelly", undefined, "https://web.archive.org/web/20260508080121/https://thebaffler.com/latest/cut-the-music-pelly", "archived"),
      article("TALKS-NOT-RAIDS-05", "SRC-NYCAC-NYTIMES-NIGHTCLUBS-2002-11-10", "The New York Times", "City Cracks Down on Nightclubs and May Revise Its Policies", "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", "2002-11-10", "https://web.archive.org/web/20251104235429/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", "archived"),
      article("TALKS-NOT-RAIDS-06", "SRC-NYCAC-AMNY-NIGHTLIFE-MAYOR-2018", "amNewYork", "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'", "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/", undefined, "https://web.archive.org/web/20191003222757/https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726"),
      article("TALKS-NOT-RAIDS-07", "SRC-NYCAC-OBSERVER-NIGHTLIFE-MAYOR-2018", "Observer", "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", "https://observer.com/2018/03/new-york-city-night-mayor/", "2018-03-29", "https://web.archive.org/web/20251011032549/https://observer.com/2018/03/new-york-city-night-mayor/")
    ]
  },
  {
    id: "SAVE-NYC-SPACES",
    name: "Save NYC Spaces",
    project: "office-of-nightlife",
    projectIds: ["nyc-artist-coalition", "office-of-nightlife"],
    indexSourceId: "SRC-NYCAC-SAVE-NYC-SPACES",
    indexUrl: "https://savenycspaces.nycartc.com/",
    existingIndexSource: true,
    entries: [
      article("SAVE-NYC-SPACES-01", "SRC-NYCAC-NY-DAILY-NEWS-NIGHTLIFE-OFFICE-2017-09-19", "New York Daily News", "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/", "2017-09-19", "https://web.archive.org/web/20230604001849/https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451"),
      article("SAVE-NYC-SPACES-02", "SRC-NYCAC-NYPOST-NIGHTLIFE-OFFICE-2017-09-19", "New York Post", "De Blasio's newest city agency: Office of Nightlife", "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", "2017-09-19", "https://web.archive.org/web/20260624234956/https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/"),
      article("SAVE-NYC-SPACES-03", "SRC-NYCAC-GOTHAMIST-NIGHTLIFE-OFFICE-2017-09-20", "Gothamist", "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor", "2017-09-20", "https://web.archive.org/web/20190531070143/http://gothamist.com/2017/09/20/punk_blaz_signs_bill.php"),
      article("SAVE-NYC-SPACES-04", "SRC-NYCAC-NPR-CABARET-2017-09-20", "NPR", "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife", "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", "2017-09-20", "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife", "live-and-archived", true),
      article("SAVE-NYC-SPACES-05", "SRC-NYCAC-BROOKLYN-EAGLE-NIGHTLIFE-OFFICE-2017-09-20", "Brooklyn Daily Eagle", "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", "https://brooklyneagle.com/60477/a-new-era-mayor-de-blasio-signs-bill-to-create-nyc-office-of-nightlife/", "2017-09-20", "https://web.archive.org/web/20180623155344/http://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife"),
      article("SAVE-NYC-SPACES-06", "SRC-NYCAC-CITYLAB-NIGHT-MAYOR-2017-09-26", "CityLab", "How to Be a Good 'Nightlife Mayor'", "https://www.bloomberg.com/news/articles/2017-09-26/what-american-cities-need-from-night-mayors", "2017-09-26", "https://web.archive.org/web/20191214060044/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/", "archived"),
      article("SAVE-NYC-SPACES-07", "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12", "Bedford + Bowery", "What Can the Night Mayor Do? The DIY Scene Discusses", "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", "2017-10-12", "https://web.archive.org/web/20260106102010/https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/", "live-and-archived", true),
      article("SAVE-NYC-SPACES-08", "SRC-NYCAC-BROOKLYN-VEGAN-NIGHTLIFE-OFFICE-2017-09-20", "BrooklynVegan", "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", "2017-09-20", "https://web.archive.org/web/20250122015846/https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/", "archived")
    ]
  },
  {
    id: "FAIR-RENT-NYC",
    name: "Fair Rent NYC",
    project: "commercial-rent-stabilization",
    projectIds: ["nyc-artist-coalition", "commercial-rent-stabilization"],
    indexSourceId: "SRC-NYCAC-PRESS-INDEX-FAIR-RENT-NYC-2021-12-01",
    indexUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    indexArchiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    entries: [
      article("FAIR-RENT-NYC-01", "SRC-NYCAC-NYTIMES-STOREFRONT-VACANCY-2018-09-06", "The New York Times", "This Space Available", "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", "2018-09-06", "https://web.archive.org/web/20260605193311/https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html"),
      article("FAIR-RENT-NYC-02", "SRC-NYCAC-NY-DAILY-NEWS-COMMERCIAL-RENT-2019-11-14", "New York Daily News", "Pols, Small-Biz Owners Rally For Law Limiting Rent Hikes On NYC's Beleaguered Mom-And-Pop Shops", "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/", "2019-11-14", "https://web.archive.org/web/20221129191818/https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html"),
      article("FAIR-RENT-NYC-03", "SRC-NYCAC-CURBED-COMMERCIAL-RENT-2019-11-08", "Curbed", "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?", "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", "2019-11-08", "https://web.archive.org/web/20251216101013/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", "archived"),
      article("FAIR-RENT-NYC-04", "SRC-NYCAC-AMNY-VACANT-STOREFRONTS-2019-01-17", "amNewYork", "The sad story behind NYC vacant storefronts", "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1-26023055/", "2019-01-17", "https://web.archive.org/web/20251117191151/https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/"),
      article("FAIR-RENT-NYC-05", "SRC-NYCAC-ATLANTIC-EMPTY-STOREFRONTS-2018-10-15", "The Atlantic", "How Manhattan Became a Rich Ghost Town", "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", "2018-10-15", "https://web.archive.org/web/20260505011341/https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/"),
      article("FAIR-RENT-NYC-06", "SRC-NYCAC-GOTHAMIST-NEIRS-2020-01-13", "Gothamist", "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations", "2020-01-13", "https://web.archive.org/web/20210918142340/https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations"),
      article("FAIR-RENT-NYC-07", "SRC-NYCAC-QNS-COMMERCIAL-RENT-2019-12-18", "QNS", "Sunnyside councilman, small business owners rally for commercial rent control", "https://qns.com/2019/12/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", "2019-12-18", "https://web.archive.org/web/20200809200156/https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/"),
      article("FAIR-RENT-NYC-08", "SRC-NYCAC-SUNNYSIDE-POST-COMMERCIAL-RENT-2019-12-18", "Sunnyside Post", "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes", "https://qns.com/2019/12/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes/", "2019-12-18", "https://web.archive.org/web/20250623151452/https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes"),
      article("FAIR-RENT-NYC-09", "SRC-NYCAC-JEWISH-VOICE-COMMERCIAL-RENT-2019-11-11", "The Jewish Voice", "Bklyn Councilman Aims to Save Mom & Pop Retail Outlets", "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", "2019-11-11", "https://web.archive.org/web/20191214161746/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", "archived")
    ]
  }
];

const readingBySourceId = new Map(
  nycacPressReadings.map((reading) => [reading.sourceId, reading])
);

const campaignByEntryId = new Map(
  campaignPressInventory.flatMap((campaign) =>
    campaign.entries.map((entry) => [entry.id, campaign] as const)
  )
);

function articleReadingObservationId(sourceId: string) {
  return `OBS-NYCAC-PRESS-READING-${sourceId.replace(/^SRC-NYCAC-/, "")}`;
}

function articleAttributionObservationId(sourceId: string, index: number) {
  return `OBS-NYCAC-PRESS-ATTRIBUTION-${sourceId.replace(/^SRC-NYCAC-/, "")}-${index + 1}`;
}

const indexSources = campaignPressInventory
  .filter((campaign) => !campaign.existingIndexSource)
  .map((campaign) => ({
    id: campaign.indexSourceId,
    title: `${campaign.name} press index`,
    organization: campaign.name,
    kind: campaign.indexArchiveUrl ? "archived-web-capture" : "institutional-web-page",
    visibility: "public",
    preservationStatus: campaign.indexArchiveUrl ? "archived" : "live",
    accessedAt: reviewedAt,
    ...(campaign.indexArchiveUrl
      ? { archiveUrl: campaign.indexArchiveUrl, preferredPublicUrl: "archive" }
      : { canonicalUrl: campaign.indexUrl, preferredPublicUrl: "canonical" }),
    publicCitation: `${campaign.name}, Press section, accessed ${reviewedAt}.`,
    publicNote: `Preserves ${campaign.entries.length} press-list appearances selected by the campaign.`,
    supportsGenerally: [
      `${campaign.entries.length} article appearances and their campaign-supplied titles and links`,
      `the campaign's public curation of reporting about ${campaign.name}`
    ],
    doesNotEstablish: [
      "the accuracy of every proposition in the linked articles",
      "Jamie's authorship of the campaign site",
      "Jamie's individual role in every reported event",
      "a complete history of all reporting beyond the captured press section"
    ]
  }));

const articleSources = campaignPressInventory
  .flatMap((campaign) => campaign.entries.map((entry) => ({ campaign, entry })))
  .filter(({ entry }) => !entry.existingSource)
  .filter(({ entry }, index, entries) => entries.findIndex((candidate) => candidate.entry.sourceId === entry.sourceId) === index)
  .map(({ campaign, entry }) => {
    const reading = readingBySourceId.get(entry.sourceId);
    if (!reading) throw new Error(`Missing close reading for ${entry.sourceId}`);

    return {
      id: entry.sourceId,
      title: entry.title,
      organization: entry.publisher,
      kind: "published-article",
      visibility: "public",
      preservationStatus: entry.preservationStatus,
      ...(entry.publishedAt ? { publishedAt: entry.publishedAt } : {}),
      accessedAt: reviewedAt,
      canonicalUrl: entry.canonicalUrl,
      ...(entry.archiveUrl ? { archiveUrl: entry.archiveUrl } : {}),
      preferredPublicUrl: entry.preservationStatus === "archived" ? "archive" : "canonical",
      publicCitation: `${entry.publisher}, '${entry.title}'${entry.publishedAt ? `, ${entry.publishedAt}` : ""}.`,
      publicNote: `Listed in the ${campaign.name} Press section and reviewed from a ${reading.recoveryMode === "wayback-body" ? "Wayback capture" : "publisher page"}. The bank retains a bounded paraphrase and content fingerprint, not copyrighted article text.`,
      supportsGenerally: [
        ...reading.supportsGenerally,
        ...reading.directAttributions
      ],
      doesNotEstablish: reading.doesNotEstablish
    };
  });

const placementObservations = campaignPressInventory.flatMap((campaign) =>
  campaign.entries.map((entry, index) => ({
    id: `OBS-NYCAC-PRESS-${entry.id}`,
    intakeId: `INTAKE-NYCAC-PRESS-INDEX-${campaign.id}`,
    sourceId: campaign.indexSourceId,
    project: campaign.project,
    kind: "source-fact",
    text: `The ${campaign.name} Press section lists ${entry.publisher}'s '${entry.title}' and links to the publisher's article.`,
    locator: `Press section, item ${index + 1} of ${campaign.entries.length}`,
    status: "verified",
    publicSafe: true,
    claimIds: [claimId],
    researchInquiryIds: [inquiryId],
    limitations: [
      "This observation establishes campaign selection and link text, not the article's full contents, Jamie's role, or the truth of every reported proposition."
    ]
  }))
);

const articleReadingObservations = nycacPressReadings.map((reading) => {
  const campaign = campaignByEntryId.get(reading.campaignEntryId);
  if (!campaign) throw new Error(`Missing campaign for ${reading.campaignEntryId}`);

  return {
    id: articleReadingObservationId(reading.sourceId),
    intakeId: `INTAKE-NYCAC-PRESS-INDEX-${campaign.id}`,
    sourceId: reading.sourceId,
    project: campaign.project,
    kind: "source-fact",
    text: reading.summary,
    locator: `${reading.locator} Review fingerprint ${reading.contentSha256.slice(0, 12)}; ${reading.reviewedCharacterCount} recovered characters inspected.`,
    status: "verified",
    publicSafe: true,
    claimIds: [],
    researchInquiryIds: [inquiryId],
    limitations: reading.doesNotEstablish
  };
});

const articleAttributionObservations = nycacPressReadings.flatMap((reading) => {
  const campaign = campaignByEntryId.get(reading.campaignEntryId);
  if (!campaign) throw new Error(`Missing campaign for ${reading.campaignEntryId}`);

  return reading.directAttributions.map((attribution, index) => ({
    id: articleAttributionObservationId(reading.sourceId, index),
    intakeId: `INTAKE-NYCAC-PRESS-INDEX-${campaign.id}`,
    sourceId: reading.sourceId,
    project: campaign.project,
    kind: "source-fact",
    text: attribution,
    locator: reading.locator,
    status: "verified",
    publicSafe: true,
    claimIds: [],
    researchInquiryIds: [inquiryId],
    limitations: reading.doesNotEstablish
  }));
});

const observations = [
  ...placementObservations,
  ...articleReadingObservations,
  ...articleAttributionObservations
];

const uniqueArticleSourceIds = [
  ...new Set(campaignPressInventory.flatMap((campaign) => campaign.entries.map((entry) => entry.sourceId)))
];
const indexSourceIds = campaignPressInventory.map((campaign) => campaign.indexSourceId);

export const nycacPressArchive = {
  intakeItems: campaignPressInventory.map((campaign) => {
    const assignedReadings = nycacPressReadings.filter(
      (reading) => campaignByEntryId.get(reading.campaignEntryId)?.id === campaign.id
    );

    return {
      id: `INTAKE-NYCAC-PRESS-INDEX-${campaign.id}`,
      kind: "public-url",
      title: `${campaign.name} campaign press index`,
      submittedAt: reviewedAt,
      submittedBy: "Jamie Burkart and Codex public-source review",
      projectIds: campaign.projectIds,
      reason: `Preserve every article appearance in the ${campaign.name} Press section, recover the linked reporting where possible, and retain bounded article-level readings without treating press selection as proof of individual credit.`,
      sourceUrl: campaign.indexUrl,
      visibility: "public-safe",
      disposition: "integrated",
      sourceIds: [
        campaign.indexSourceId,
        ...new Set(campaign.entries.map((entry) => entry.sourceId))
      ],
      observationIds: [
        ...campaign.entries.map((entry) => `OBS-NYCAC-PRESS-${entry.id}`),
        ...assignedReadings.flatMap((reading) => [
          articleReadingObservationId(reading.sourceId),
          ...reading.directAttributions.map((_, index) =>
            articleAttributionObservationId(reading.sourceId, index)
          )
        ])
      ],
      researchInquiryIds: [inquiryId],
      boundaries: [
        "Campaign curation establishes that an article was selected for the press section; the separate reading record establishes only the bounded propositions recovered from that article.",
        "Press coverage does not by itself establish Jamie's individual role, website authorship, or causal responsibility for collective outcomes.",
        "A mature source record can remain knowledge-bank depth without becoming public-site copy."
      ]
    };
  }),
  observations,
  sources: [...indexSources, ...articleSources],
  claims: [
    {
      id: claimId,
      project: "nyc-artist-coalition",
      internalClaim: "Four NYC Artist Coalition campaign press sections preserve 45 article appearances representing 44 distinct articles across Cabaret Law repeal, M.A.R.C.H. transparency, Office of Nightlife advocacy, and Commercial Rent Stabilization.",
      status: "confirmed-with-boundary",
      projections: [
        {
          key: "archive-note",
          text: "Four campaign press sections preserve 45 article appearances across Let NYC Dance, Talks Not Raids, Save NYC Spaces, and Fair Rent NYC.",
          status: "hold",
          citationRequired: true,
          surfaces: []
        }
      ],
      evidence: campaignPressInventory.map((campaign) => ({
        sourceId: campaign.indexSourceId,
        relationship: "direct-support",
        supports: [`${campaign.entries.length} press-list appearances and their titles and links`],
        locator: "Press section",
        confidence: "high",
        renderCitation: true
      })),
      boundaries: [
        "Count article appearances separately from distinct articles because the NPR article appears in two campaign press sections.",
        "Treat this as a campaign bibliography claim, not a claim that every article centers Jamie or endorses every coalition position."
      ],
      antiClaims: [
        "Forty-five independent articles prove Jamie's individual impact",
        "Every listed article names Jamie",
        "The press sections are complete histories of each issue",
        "Campaign selection proves every proposition in the linked reporting"
      ],
      researchInquiryIds: [inquiryId],
      reviewedAt,
      reviewedBy: ["Jamie Burkart", "Codex public-source review"]
    }
  ],
  researchInquiries: [
    {
      id: inquiryId,
      project: "nyc-artist-coalition",
      question: "What press sources were selected by the four campaign sites, what does each recovered article safely support, and which propositions should remain contextual rather than becoming portfolio claims?",
      methods: [
        "Parsed the Press section of the three live campaign sites and the supplied December 1, 2021 Fair Rent NYC Wayback capture.",
        "Preserved campaign, order, publisher label, article title, canonical URL, and available Wayback URL for every listed appearance.",
        "Checked the 45 linked URLs for current response or redirect behavior and queried Wayback availability where access was blocked or stale.",
        "Recovered publisher or Wayback page text for each distinct article, rejected a misleading CityLab landing-page redirect in favor of the archived article, and retained a SHA-256 fingerprint of the reviewed text.",
        "Close-read each recovered page into a bounded paraphrase, article-specific locator, supported propositions, direct attributions, and explicit non-claims.",
        "Reused existing canonical source IDs for previously ingested Gothamist, NPR, and Bedford + Bowery articles instead of duplicating records.",
        "Kept copyrighted article bodies outside the public repository."
      ],
      runAt: reviewedAt,
      resultStatus: "partially-recovered",
      findings: [
        "Let NYC Dance lists 21 article appearances; Talks Not Raids lists 7; Save NYC Spaces lists 8; and the supplied Fair Rent NYC capture lists 9.",
        "The 45 appearances resolve to 44 distinct articles because the September 20, 2017 NPR article appears in both Let NYC Dance and Save NYC Spaces.",
        "Forty-one distinct article sources were newly normalized and three previously canonical article sources were reused.",
        "Thirty-two readings used publisher pages and twelve used Wayback captures; every distinct article retains a Wayback route.",
        "Forty-three records contain recovered article or program-page text. The Crain's record is explicitly limited to its archived headline and deck because the article body remained behind a continuation prompt.",
        "Three reviewed sources explicitly name Jamie: Gothamist reports his fire-code study groups and repeal advocacy; Bedford + Bowery identifies him among coalition town-hall speakers; and NPR identifies him as a founding member of the organization it calls 'NYC Arts Coalition.'",
        "Dead, redirected, paywalled, or bot-blocked links retain an available archive path when one was recovered."
      ],
      limitations: [
        "A blocked automated response does not prove that a page is unavailable to a person using a browser.",
        "Wayback availability confirms a capture path, not that every interactive asset or full article body renders perfectly.",
        "Some recovery payloads were capped at 12,000 characters; fingerprints and locators describe the reviewed payload, not an assertion that every publisher asset was preserved.",
        "The Crain's record supports only its recovered headline, deck, byline, and date until a full body is lawfully recovered.",
        "Article observations preserve what a source reports or argues; they do not independently prove every reported proposition.",
        "A campaign press section is evidence of campaign curation, not independent proof of Jamie's website authorship or causal responsibility for the reported outcome."
      ],
      sourceIds: [...indexSourceIds, ...uniqueArticleSourceIds],
      publicSummary: "Four campaign press sections preserve 45 appearances representing 44 distinct articles. Every article has a dispositioned, source-specific reading record; 43 include recovered page text and one is explicitly limited to its headline and deck."
    }
  ]
};
