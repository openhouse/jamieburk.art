import type { SourceCollection, SourceRecord } from "./schema.ts";

type ListedArticle = {
  id: string;
  title: string;
  organization: string;
  canonicalUrl: string;
  author?: string;
  publishedAt?: string;
  publicNote?: string;
  supportsGenerally?: string[];
  doesNotEstablish?: string[];
  reviewStatus?: "metadata-reviewed" | "close-read";
};

const listedArticle = ({
  id,
  title,
  organization,
  canonicalUrl,
  author,
  publishedAt,
  publicNote,
  supportsGenerally,
  doesNotEstablish,
  reviewStatus = "metadata-reviewed"
}: ListedArticle): SourceRecord => ({
  id,
  title,
  organization,
  ...(author ? { author } : {}),
  kind: "published-article",
  visibility: "public",
  preservationStatus: "unknown",
  ...(publishedAt ? { publishedAt } : {}),
  accessedAt: "2026-07-14",
  metadataVerifiedAt: "2026-07-14",
  metadataVerifiedBy: "Codex campaign press-index review",
  reviewStatus,
  ...(reviewStatus === "close-read"
    ? {
        contentReviewedAt: "2026-07-14",
        contentReviewedBy: "Codex public-source review"
      }
    : {}),
  canonicalUrl,
  preferredPublicUrl: "canonical",
  publicCitation: `${author ? `${author}, ` : ""}"${title}," ${organization}.`,
  publicNote: publicNote ?? "The article URL, outlet, and displayed title were captured from an NYC Artist Coalition campaign press section. Collection membership is provenance, not an endorsement or a substitute for article-level close reading.",
  supportsGenerally: supportsGenerally ?? ["campaign-selected press context for the associated public issue"],
  doesNotEstablish: doesNotEstablish ?? [
    "Jamie's individual role without article-level review",
    "independent corroboration merely because a campaign selected the article",
    "the accuracy of every claim in the article"
  ]
});

export const campaignPressIndexSources: SourceRecord[] = [
  {
    id: "SRC-NYCA-LET-NYC-DANCE-PRESS-INDEX",
    title: "Let NYC Dance press section",
    organization: "Let NYC Dance coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    metadataVerifiedAt: "2026-07-14",
    metadataVerifiedBy: "Codex live campaign-page review",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Let NYC Dance coalition, Let NYC Dance campaign press section.",
    publicNote: "The live campaign page lists 21 external press articles about the Cabaret Law and its repeal campaign.",
    supportsGenerally: ["the campaign's public press selection", "21 displayed press listings"],
    doesNotEstablish: ["Jamie's authorship of every campaign element", "independent corroboration from selection alone", "individual causation of repeal"]
  },
  {
    id: "SRC-NYCA-TALKS-NOT-RAIDS-PRESS-INDEX",
    title: "Talks Not Raids press section",
    organization: "Talks Not Raids coalition",
    kind: "project-archive",
    visibility: "public",
    preservationStatus: "live",
    accessedAt: "2026-07-14",
    metadataVerifiedAt: "2026-07-14",
    metadataVerifiedBy: "Codex live campaign-page review",
    canonicalUrl: "https://talksnotraids.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Talks Not Raids coalition, Talks Not Raids campaign press section.",
    publicNote: "The live campaign page lists seven external press articles about MARCH enforcement, nightlife regulation, and public oversight.",
    supportsGenerally: ["the campaign's public press selection", "seven displayed press listings"],
    doesNotEstablish: ["Jamie's authorship of every campaign element", "independent corroboration from selection alone", "individual causation of later MARCH policy changes"]
  },
  {
    id: "SRC-FAIR-RENT-NYC-PRESS-INDEX-2021",
    title: "Fair Rent NYC press section, December 2021 capture",
    organization: "Fair Rent NYC",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    accessedAt: "2026-07-14",
    metadataVerifiedAt: "2026-07-14",
    metadataVerifiedBy: "Codex Wayback snapshot review",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Fair Rent NYC, press section, archived December 1, 2021.",
    publicNote: "The specified Wayback capture preserves nine external press listings. The current site has since evolved into a broader reference library.",
    supportsGenerally: ["the campaign's December 2021 public press selection", "nine displayed press listings"],
    doesNotEstablish: ["the current reference library's complete contents", "Jamie's authorship of every campaign element", "independent corroboration from selection alone"]
  }
];

export const campaignPressArticleSources: SourceRecord[] = [
  listedArticle({ id: "SRC-PRESS-LND-NYT-BOOGIE-2017", title: "After 91 Years, New York Will Let Its People Boogie", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html", publishedAt: "2017-10-30" }),
  listedArticle({ id: "SRC-PRESS-LND-NEW-YORKER-DANCE-OUTLAWS-2017", title: "Dance Outlaws Fight for the Right to Party", organization: "The New Yorker", canonicalUrl: "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party", publishedAt: "2017-07-10" }),
  listedArticle({ id: "SRC-PRESS-LND-NYPOST-SCRAP-DANCING-LAW-2017", title: "De Blasio might scrap ridiculous law banning dancing in bars", organization: "New York Post", canonicalUrl: "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/", publishedAt: "2017-09-14" }),
  listedArticle({ id: "SRC-PRESS-LND-VILLAGE-VOICE-CABARET-LAW-2017", title: "NYC's Racist, Draconian Cabaret Law Must Be Eliminated", organization: "The Village Voice", canonicalUrl: "https://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234" }),
  listedArticle({ id: "SRC-PRESS-LND-NYDN-FOOTLOOSE-2017", title: "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars", organization: "New York Daily News", canonicalUrl: "https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553" }),
  listedArticle({ id: "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE-2017", title: "The Bureaucratic Dance to End NYC Cabaret Law", organization: "WNYC", canonicalUrl: "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law" }),
  listedArticle({ id: "SRC-PRESS-LND-FORBES-REPEAL-2017", title: "NYC Republicans Should Support Cabaret Law Repeal Effort", organization: "Forbes", canonicalUrl: "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort", publishedAt: "2017-10-04" }),
  listedArticle({ id: "SRC-PRESS-LND-SMITHSONIAN-DANCING-RULE-2017", title: "New York City Could Finally Lose Its Prohibition-era Dancing Rule", organization: "Smithsonian Magazine", canonicalUrl: "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/" }),
  listedArticle({ id: "SRC-PRESS-LND-DNAINFO-CITY-STONEWALLS-2017", title: "City Stonewalls Council, Defends 'Racist' No Dancing Law", organization: "DNAinfo", canonicalUrl: "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn", publishedAt: "2017-06-20" }),
  listedArticle({ id: "SRC-PRESS-LND-CRAINS-COUNCIL-MOVES-2017", title: "City Council moves to repeal 'racist' cabaret law", organization: "Crain's New York", canonicalUrl: "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882", publishedAt: "2017-06-19" }),
  listedArticle({ id: "SRC-PRESS-LND-METRO-ARTS-ADVOCATES-2017", title: "Arts advocates renew call to end New York City's antiquated cabaret laws", organization: "Metro New York", canonicalUrl: "https://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws" }),
  listedArticle({ id: "SRC-PRESS-LND-BROOKLYN-EAGLE-17-PLACES-2017", title: "There are only 17 places in Brooklyn where you can legally dance", organization: "Brooklyn Daily Eagle", canonicalUrl: "https://brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance", publishedAt: "2017-05-12" }),
  listedArticle({ id: "SRC-PRESS-LND-BROOKLYN-PAPER-FIGHT-RIGHT-PARTY-2017", title: "Think I better dance, now! Two Bushwick councilmen fight for your right to party!", organization: "Brooklyn Paper", canonicalUrl: "https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html" }),
  listedArticle({ id: "SRC-PRESS-LND-TIMEOUT-LEGAL-DANCE-2017", title: "It's time to make it legal to dance anywhere the f*ck you want in New York", organization: "Time Out New York", canonicalUrl: "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517" }),
  listedArticle({ id: "SRC-PRESS-LND-QUEENS-CHRONICLE-CABARET-END-2017", title: "Aged Cabaret Law finally at its end?", organization: "Queens Chronicle", canonicalUrl: "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html" }),
  listedArticle({ id: "SRC-PRESS-LND-BEDFORD-ANTI-DANCE-2017", title: "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family", organization: "Bedford + Bowery", canonicalUrl: "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/" }),
  listedArticle({ id: "SRC-PRESS-LND-VICE-DIY-SAFETY-2017", title: "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety", organization: "VICE THUMP", canonicalUrl: "https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/", author: "Alexander Iadarola", publishedAt: "2017-03-21", publicNote: "Close-read reporting says NYC Artist Coalition formed in January 2017 to support and advocate for informal cultural spaces and describes a planned joint meeting with the Cultural Affairs commissioner. It does not name Jamie.", supportsGenerally: ["NYC Artist Coalition formation timing", "coalition support and advocacy purpose", "planned March 2017 Cultural Affairs meeting"], doesNotEstablish: ["Jamie's individual founding role", "Jamie's individual role in the meeting", "the meeting's outcome", "individual causation of later policy changes"], reviewStatus: "close-read" }),
  listedArticle({ id: "SRC-PRESS-LND-SFGATE-NO-DANCING-2017", title: "New York City apparently has a 'No Dancing' law", organization: "SFGate", canonicalUrl: "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php" }),
  listedArticle({ id: "SRC-PRESS-LND-MIXMAG-ACTIVISTS-2017", title: "NYC activists aim to repeal local 'no dancing law'", organization: "Mixmag", canonicalUrl: "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news", author: "Harrison Williams", publishedAt: "2017-03-27", publicNote: "Close-read reporting attributes a repeal petition to Dance Liberation Network and NYC Artist Coalition and announces a March 30, 2017 Let NYC Dance town hall at Market Hotel. It does not name Jamie.", supportsGenerally: ["Dance Liberation Network and NYC Artist Coalition petition collaboration", "March 30, 2017 Let NYC Dance town hall", "Market Hotel event context"], doesNotEstablish: ["Jamie's individual role", "petition or event authorship by any one person", "individual causation of repeal"], reviewStatus: "close-read" }),

  listedArticle({ id: "SRC-PRESS-TNR-GOTHAMIST-MARCH-2019", title: "Nightlife Proprietors Say MARCH Raids Disproportionately Target Bars Favored By LGBTQ Patrons, People Of Color", organization: "Gothamist", canonicalUrl: "https://gothamist.com/news/nightlife-proprietors-say-march-raids-disproportionately-target-bars-favored-by-lgbtq-patrons-people-of-color", publishedAt: "2019-02-12" }),
  listedArticle({ id: "SRC-PRESS-TNR-VILLAGE-VOICE-PALISADES-2016", title: "Palisades Owners Explain Why the Beloved Venue Was Shut Down", organization: "The Village Voice", canonicalUrl: "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/", publishedAt: "2016-12-08" }),
  listedArticle({ id: "SRC-PRESS-TNR-BEDFORD-DISCO-DISCORD-2019", title: "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'", organization: "Bedford + Bowery", canonicalUrl: "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/" }),
  listedArticle({ id: "SRC-PRESS-TNR-BAFFLER-CUT-MUSIC", title: "Cut the Music: Inside M.A.R.C.H. - the NYPD's secret, venue-closing task force", organization: "The Baffler", canonicalUrl: "https://thebaffler.com/latest/cut-the-music-pelly" }),
  listedArticle({ id: "SRC-PRESS-TNR-NYT-NIGHTCLUB-CRACKDOWN-2002", title: "City Cracks Down on Nightclubs and May Revise Its Policies", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html", publishedAt: "2002-11-10" }),
  listedArticle({ id: "SRC-PRESS-TNR-AMNY-NIGHTLIFE-MAYOR-2018", title: "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says 'We have a lot of talking to do'", organization: "amNewYork", canonicalUrl: "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726" }),
  listedArticle({ id: "SRC-PRESS-TNR-OBSERVER-NIGHTLIFE-MAYOR-2018", title: "Here's What New Yorkers Want the New Nightlife Mayor to Focus On", organization: "Observer", canonicalUrl: "https://observer.com/2018/03/new-york-city-night-mayor/" }),

  listedArticle({ id: "SRC-PRESS-SNS-NYDN-OFFICE-NIGHTLIFE-2017", title: "Mayor de Blasio OKs creation of office to manage issues affecting city's nightlife", organization: "New York Daily News", canonicalUrl: "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451" }),
  listedArticle({ id: "SRC-PRESS-SNS-NYPOST-OFFICE-NIGHTLIFE-2017", title: "De Blasio's newest city agency: Office of Nightlife", organization: "New York Post", canonicalUrl: "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/", publishedAt: "2017-09-19" }),
  listedArticle({ id: "SRC-PRESS-SNS-GOTHAMIST-NIGHTLIFE-MAYOR-2017", title: "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Nightlife Mayor'", organization: "Gothamist", canonicalUrl: "https://gothamist.com/news/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-nightlife-mayor", publishedAt: "2017-09-20" }),
  listedArticle({ id: "SRC-PRESS-SNS-BROOKLYN-EAGLE-NEW-ERA-2017", title: "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife", organization: "Brooklyn Daily Eagle", canonicalUrl: "https://brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife", publishedAt: "2017-09-20" }),
  listedArticle({ id: "SRC-PRESS-SNS-CITYLAB-GOOD-NIGHTLIFE-MAYOR-2017", title: "How to Be a Good 'Nightlife Mayor'", organization: "CityLab", canonicalUrl: "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/" }),
  listedArticle({ id: "SRC-PRESS-SNS-BROOKLYN-VEGAN-OFFICE-NIGHTLIFE-2017", title: "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes", organization: "BrooklynVegan", canonicalUrl: "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/" }),

  listedArticle({ id: "SRC-PRESS-FRN-NYT-SPACE-AVAILABLE-2018", title: "This Space Available", organization: "The New York Times", canonicalUrl: "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html", publishedAt: "2018-09-06" }),
  listedArticle({ id: "SRC-PRESS-FRN-NYDN-RENT-HIKES-2019", title: "Pols, Small-Biz Owners Rally For Law Limiting Rent Hikes On NYC's Beleaguered Mom-And-Pop Shops", organization: "New York Daily News", canonicalUrl: "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html", publishedAt: "2019-11-14" }),
  listedArticle({ id: "SRC-PRESS-FRN-CURBED-RETAIL-VACANCY-2019", title: "Could Commercial Rent Stabilization Solve NYC's Retail Vacancy Woes?", organization: "Curbed", canonicalUrl: "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy", publishedAt: "2019-11-08" }),
  listedArticle({ id: "SRC-PRESS-FRN-AMNY-VACANT-STOREFRONTS-2019", title: "The sad story behind NYC vacant storefronts", organization: "amNewYork", canonicalUrl: "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055" }),
  listedArticle({ id: "SRC-PRESS-FRN-ATLANTIC-GHOST-TOWN-2018", title: "How Manhattan Became a Rich Ghost Town", organization: "The Atlantic", canonicalUrl: "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/", author: "Derek Thompson", publishedAt: "2018-10-15", publicNote: "Close-read issue reporting discusses rising commercial rents, e-commerce, lease incentives, and storefront vacancy as interacting pressures. It does not discuss Jamie or NYC Artist Coalition.", supportsGenerally: ["2018 storefront-vacancy issue context", "multiple interacting retail pressures", "commercial-rent pressure on small businesses"], doesNotEstablish: ["Jamie's role", "NYC Artist Coalition's role", "commercial rent stabilization as the sole remedy", "causation of any campaign outcome"], reviewStatus: "close-read" }),
  listedArticle({ id: "SRC-PRESS-FRN-GOTHAMIST-NEIRS-2020", title: "Neir's Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms", organization: "Gothamist", canonicalUrl: "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations", author: "Luca Powell", publishedAt: "2020-01-13", publicNote: "Close-read reporting quotes Olympia Kazi for NYC Artist Coalition on predatory rent pressure and describes the coalition as supporting commercial rent stabilization. It does not name Jamie.", supportsGenerally: ["NYC Artist Coalition support for commercial rent stabilization", "Olympia Kazi's public coalition advocacy", "Neir's Tavern and rising-rent context"], doesNotEstablish: ["Jamie's individual role", "Jamie as the source of the coalition position", "the campaign's causal effect on legislation"], reviewStatus: "close-read" }),
  listedArticle({ id: "SRC-PRESS-FRN-QNS-COMMERCIAL-RENT-2019", title: "Sunnyside councilman, small business owners rally for commercial rent control", organization: "QNS", canonicalUrl: "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/", publishedAt: "2019-12-18" }),
  listedArticle({ id: "SRC-PRESS-FRN-SUNNYSIDE-POST-RENT-CONTROL-2019", title: "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses from Rent Hikes", organization: "Sunnyside Post", canonicalUrl: "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes" }),
  listedArticle({ id: "SRC-PRESS-FRN-JEWISH-VOICE-MOM-POP-2019", title: "Bklyn Councilman Aims to Save Mom & Pop Retail Outlets", organization: "The Jewish Voice", canonicalUrl: "http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/", publishedAt: "2019-11-11" })
];

const letNycDanceArticleIds = [
  "SRC-PRESS-LND-NYT-BOOGIE-2017", "SRC-PRESS-LND-NEW-YORKER-DANCE-OUTLAWS-2017", "SRC-PRESS-LND-NYPOST-SCRAP-DANCING-LAW-2017", "SRC-PRESS-LND-VILLAGE-VOICE-CABARET-LAW-2017", "SRC-PRESS-LND-NYDN-FOOTLOOSE-2017", "SRC-PRESS-LND-WNYC-BUREAUCRATIC-DANCE-2017", "SRC-PRESS-LND-FORBES-REPEAL-2017", "SRC-NYCA-GOTHAMIST-CABARET-2017", "SRC-PRESS-LND-SMITHSONIAN-DANCING-RULE-2017", "SRC-PRESS-LND-DNAINFO-CITY-STONEWALLS-2017", "SRC-NYCA-NPR-CABARET-CONTEXT-2017", "SRC-PRESS-LND-CRAINS-COUNCIL-MOVES-2017", "SRC-PRESS-LND-METRO-ARTS-ADVOCATES-2017", "SRC-PRESS-LND-BROOKLYN-EAGLE-17-PLACES-2017", "SRC-PRESS-LND-BROOKLYN-PAPER-FIGHT-RIGHT-PARTY-2017", "SRC-PRESS-LND-TIMEOUT-LEGAL-DANCE-2017", "SRC-PRESS-LND-QUEENS-CHRONICLE-CABARET-END-2017", "SRC-PRESS-LND-BEDFORD-ANTI-DANCE-2017", "SRC-PRESS-LND-VICE-DIY-SAFETY-2017", "SRC-PRESS-LND-SFGATE-NO-DANCING-2017", "SRC-PRESS-LND-MIXMAG-ACTIVISTS-2017"
];

const talksNotRaidsArticleIds = [
  "SRC-PRESS-TNR-GOTHAMIST-MARCH-2019", "SRC-PRESS-TNR-VILLAGE-VOICE-PALISADES-2016", "SRC-PRESS-TNR-BEDFORD-DISCO-DISCORD-2019", "SRC-PRESS-TNR-BAFFLER-CUT-MUSIC", "SRC-PRESS-TNR-NYT-NIGHTCLUB-CRACKDOWN-2002", "SRC-PRESS-TNR-AMNY-NIGHTLIFE-MAYOR-2018", "SRC-PRESS-TNR-OBSERVER-NIGHTLIFE-MAYOR-2018"
];

const saveNycSpacesArticleIds = [
  "SRC-PRESS-SNS-NYDN-OFFICE-NIGHTLIFE-2017", "SRC-PRESS-SNS-NYPOST-OFFICE-NIGHTLIFE-2017", "SRC-PRESS-SNS-GOTHAMIST-NIGHTLIFE-MAYOR-2017", "SRC-NYCA-NPR-CABARET-CONTEXT-2017", "SRC-PRESS-SNS-BROOKLYN-EAGLE-NEW-ERA-2017", "SRC-PRESS-SNS-CITYLAB-GOOD-NIGHTLIFE-MAYOR-2017", "SRC-NYCA-BEDFORD-BOWERY-TOWN-HALL-2017", "SRC-PRESS-SNS-BROOKLYN-VEGAN-OFFICE-NIGHTLIFE-2017"
];

const fairRentNycArticleIds = [
  "SRC-PRESS-FRN-NYT-SPACE-AVAILABLE-2018", "SRC-PRESS-FRN-NYDN-RENT-HIKES-2019", "SRC-PRESS-FRN-CURBED-RETAIL-VACANCY-2019", "SRC-PRESS-FRN-AMNY-VACANT-STOREFRONTS-2019", "SRC-PRESS-FRN-ATLANTIC-GHOST-TOWN-2018", "SRC-PRESS-FRN-GOTHAMIST-NEIRS-2020", "SRC-PRESS-FRN-QNS-COMMERCIAL-RENT-2019", "SRC-PRESS-FRN-SUNNYSIDE-POST-RENT-CONTROL-2019", "SRC-PRESS-FRN-JEWISH-VOICE-MOM-POP-2019"
];

export const campaignPressCollections: SourceCollection[] = [
  {
    id: "COL-NYCA-LET-NYC-DANCE-PRESS",
    title: "Let NYC Dance press corpus",
    projectIds: ["PRJ-NYC-ARTIST-COALITION"],
    indexSourceId: "SRC-NYCA-LET-NYC-DANCE-PRESS-INDEX",
    itemSourceIds: letNycDanceArticleIds,
    listedItemCount: 21,
    capturedAt: "2026-07-14",
    capturedBy: "Codex live campaign-page review",
    captureMethod: "live-page",
    captureFixture: "docs/knowledge-bank/source-captures/nyca-campaign-press-2026-07-14.json",
    completeness: "complete-as-listed",
    scopeNote: "Every external article displayed under the live campaign page's Press heading was captured in displayed order.",
    interpretationBoundary: "Campaign selection establishes collection provenance only; each article must be close-read before it supports an individual or causal claim."
  },
  {
    id: "COL-NYCA-TALKS-NOT-RAIDS-PRESS",
    title: "Talks Not Raids press corpus",
    projectIds: ["PRJ-NYC-ARTIST-COALITION"],
    indexSourceId: "SRC-NYCA-TALKS-NOT-RAIDS-PRESS-INDEX",
    itemSourceIds: talksNotRaidsArticleIds,
    listedItemCount: 7,
    capturedAt: "2026-07-14",
    capturedBy: "Codex live campaign-page review",
    captureMethod: "live-page",
    captureFixture: "docs/knowledge-bank/source-captures/nyca-campaign-press-2026-07-14.json",
    completeness: "complete-as-listed",
    scopeNote: "Every external article displayed under the live campaign page's Press heading was captured in displayed order.",
    interpretationBoundary: "Coverage of enforcement and nightlife policy does not by itself establish Jamie's authorship, causal contribution, or the campaign's later policy impact."
  },
  {
    id: "COL-NYCA-SAVE-NYC-SPACES-PRESS",
    title: "Save NYC Spaces press corpus",
    projectIds: ["PRJ-NYC-ARTIST-COALITION"],
    indexSourceId: "SRC-NYCA-SAVE-NYC-SPACES",
    itemSourceIds: saveNycSpacesArticleIds,
    listedItemCount: 8,
    capturedAt: "2026-07-14",
    capturedBy: "Codex live campaign-page review",
    captureMethod: "live-page",
    captureFixture: "docs/knowledge-bank/source-captures/nyca-campaign-press-2026-07-14.json",
    completeness: "complete-as-listed",
    scopeNote: "Every external article displayed under the live campaign page's Press heading was captured in displayed order.",
    interpretationBoundary: "Office of Nightlife outcome coverage is context; it must not be converted into individual or coalition causation without explicit attribution."
  },
  {
    id: "COL-NYCA-FAIR-RENT-NYC-PRESS-2021",
    title: "Fair Rent NYC press corpus, December 2021",
    projectIds: ["PRJ-NYC-ARTIST-COALITION"],
    indexSourceId: "SRC-FAIR-RENT-NYC-PRESS-INDEX-2021",
    itemSourceIds: fairRentNycArticleIds,
    listedItemCount: 9,
    capturedAt: "2026-07-14",
    capturedBy: "Codex Wayback snapshot review",
    captureMethod: "wayback-snapshot",
    captureFixture: "docs/knowledge-bank/source-captures/nyca-campaign-press-2026-07-14.json",
    completeness: "complete-as-listed",
    scopeNote: "Every external article displayed under Press in the user-specified December 1, 2021 Wayback capture was captured in displayed order.",
    interpretationBoundary: "The archived selection documents campaign context at that date; it is not the present reference library and does not establish Jamie's individual role in each reported event."
  }
];

export const allCampaignPressItemSourceIds = [...new Set(campaignPressCollections.flatMap(({ itemSourceIds }) => itemSourceIds))];
