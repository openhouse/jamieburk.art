export type NycacPressReading = {
  sourceId: string;
  campaignEntryId: string;
  recoveryMode: "publisher-body" | "wayback-body";
  reviewExtent: "recovered-body" | "headline-and-deck";
  retrievalUrl: string;
  contentSha256: string;
  reviewedCharacterCount: number;
  reviewedAt: string;
  url: string;
  summary: string;
  locator: string;
  supportsGenerally: string[];
  doesNotEstablish: string[];
  mentionsJamie: boolean;
  mentionsCoalition: boolean;
  directAttributions: string[];
};

// Copyrighted article bodies stay outside the public repository. These records
// retain only provenance, fingerprints, bounded paraphrases, and limitations.
export const nycacPressReadings: NycacPressReading[] = [
  {
    "sourceId": "SRC-NYCAC-AMNY-NIGHTLIFE-MAYOR-2018",
    "campaignEntryId": "TALKS-NOT-RAIDS-06",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.amny.com/news/nightlife-mayor-brooklyn-panel-1-17689726/",
    "contentSha256": "8c9ca18c679156967a7085feeff24e098ef560f4d303af5567194a648aabcb63",
    "reviewedCharacterCount": 10063,
    "reviewedAt": "2026-07-14",
    "url": "https://amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
    "summary": "Ariel Palitz heard artists, venue operators, and community members raise concerns about rising rents, regulation, and disruptive MARCH inspections at a Bushwick gathering. She said the new Office of Nightlife was intended to address such concerns and encouraged continued contact with the office.",
    "locator": "Live page; the article body beginning with Palitz’s appearance at Secret Project Robot, followed by the rent and MARCH-inspection concerns and the concluding description of the advisory board and future town halls.",
    "supportsGenerally": [
      "Palitz opened the floor to NYC Artist Coalition and promised to carry participants’ concerns to the mayor.",
      "Rents and regulations affecting DIY clubs and concert halls were central subjects at the gathering.",
      "Venue operators described unannounced MARCH inspections during busy nighttime hours and temporary closures following inspections.",
      "The planned Nightlife Advisory Board was to have 12 members and conduct additional town halls before issuing recommendations."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute any individual action or role to him at this gathering.",
      "Although NYC Artist Coalition participated, the article does not establish that the coalition created the Office of Nightlife or caused any subsequent regulatory reform.",
      "The gathering and Palitz’s assurances do not establish that rent protections or changes to MARCH inspections were implemented."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition packed Secret Project Robot and participated in the open-floor discussion with Palitz."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-AMNY-VACANT-STOREFRONTS-2019-01-17",
    "campaignEntryId": "FAIR-RENT-NYC-04",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/",
    "contentSha256": "d609961d0b93db8b75f89c2ffff92d785e3c3f4d2534128762ee6876edf1ffd8",
    "reviewedCharacterCount": 9119,
    "reviewedAt": "2026-07-14",
    "url": "https://amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055",
    "summary": "Kate Walter describes the disappearance of longtime Village restaurants and an increase in vacant storefronts, emphasizing steep commercial rents and landlords’ incentives to wait for higher-paying tenants. She favors a vacancy tax and a public town hall on the problem.",
    "locator": "Live page; the opinion body moving from Walter’s memoir-related restaurant closures to her observations about Village vacancies, the Cornelia Street Café rent increase, and her closing appeal for a vacancy tax and town hall.",
    "supportsGenerally": [
      "Walter says every restaurant mentioned in her 2015 memoir had closed by January 2019.",
      "She cites estimates that retail vacancies reached 20 percent in some parts of Manhattan.",
      "She reports that the Cornelia Street Café’s monthly rent rose to $33,000 before it closed.",
      "Walter wrote to Council Speaker Corey Johnson requesting a town hall and endorsed the mayor’s suggestion of a vacancy tax."
    ],
    "doesNotEstablish": [
      "The column does not mention Jamie Burkart or NYC Artist Coalition and assigns neither any role in storefront advocacy.",
      "Its personal observations and stated explanations do not independently establish that tax treatment was the principal cause of vacancies throughout New York City.",
      "The column does not establish that a vacancy tax or town hall was adopted or that collective advocacy produced a policy outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-BEDFORD-CABARET-SUPPORT-2017",
    "campaignEntryId": "LET-NYC-DANCE-18",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
    "contentSha256": "4fbd6d88c27d2a34edf2ecfa0a71cbb0e08224057d512edb28c00c99207249a3",
    "reviewedCharacterCount": 10233,
    "reviewedAt": "2026-07-14",
    "url": "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family",
    "summary": "The article reports broad testimony supporting repeal of New York’s cabaret-license requirement, including conditional support from the de Blasio administration. It also presents objections that zoning would continue to restrict dancing and advocates’ responses that existing laws already covered safety concerns.",
    "locator": "Live page; the body from the opening Office of Nightlife and repeal context through the Thursday hearing testimony, followed by the exchange between Hospitality Alliance representatives and repeal advocates over zoning and safety rules.",
    "supportsGenerally": [
      "NYC Artist Coalition was among organizations described as organizing and advocating for repeal of the cabaret law.",
      "The de Blasio administration supported repeal provided that specified security requirements remained enforceable.",
      "The repeal proposal had 16 City Council cosponsors at the time of publication.",
      "Critics argued that zoning and other regulations, rather than the cabaret license alone, determined where dancing could occur."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or assign him an individual role in organizing, testimony, or legislation.",
      "Placing NYC Artist Coalition among several advocacy organizations does not establish its distinct contribution or that it caused the repeal proposal’s progress.",
      "The article predates a final outcome and does not establish that the cabaret-license requirement was repealed as a result of this hearing."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition was identified as one of several organizations organizing and advocating for repeal of the cabaret law."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-BEDFORD-NIGHT-MAYOR-2017-10-12",
    "campaignEntryId": "SAVE-NYC-SPACES-07",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    "contentSha256": "399d06178ef26b1d24e7a12d2d9fbebea56296c16c7f4b4c03b1b9790dcfd401",
    "reviewedCharacterCount": 7554,
    "reviewedAt": "2026-07-14",
    "url": "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses",
    "summary": "A Market Hotel town hall brought artists, nightlife operators, community groups, and officials together to discuss what the new Office of Nightlife should do. Speakers urged protection of smaller spaces and attention to racism, gentrification, and cultural erasure, while officials supplied few specific policy answers.",
    "locator": "Live page; the body describing the NYC Artist Coalition-led Market Hotel town hall, its roster of speakers and officials, the passages on race and gentrification, and the concluding assessment of the limited government responses.",
    "supportsGenerally": [
      "NYC Artist Coalition spearheaded the Market Hotel town hall.",
      "The article describes the coalition as having developed from small DIY-space meetings into advocacy for the Office of Nightlife and cabaret-law repeal.",
      "Jamie Burkart and Olympia Kazi were identified as NYC Artist Coalition speakers who had participated in earlier hearings or town halls.",
      "Officials answered only a small number of questions, and Julie Menin planned additional town halls in every borough."
    ],
    "doesNotEstablish": [
      "Identifying Jamie Burkart as a coalition speaker and prior participant does not establish that he personally organized the event, formulated its demands, or secured legislative passage.",
      "The article’s characterization of NYC Artist Coalition as instrumental does not establish that the coalition alone caused creation of the Office of Nightlife or progress toward cabaret-law repeal.",
      "The town hall does not establish that the future office adopted the priorities expressed by DIY-space representatives."
    ],
    "mentionsJamie": true,
    "mentionsCoalition": true,
    "directAttributions": [
      "Jamie Burkart was identified as an NYC Artist Coalition speaker who had participated in earlier hearings or town halls.",
      "NYC Artist Coalition spearheaded the Market Hotel town hall.",
      "NYC Artist Coalition was described as progressing from small meetings about DIY spaces to advocacy for the Office of Nightlife and cabaret-law repeal."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-BEDFORD-MARCH-2019",
    "campaignEntryId": "TALKS-NOT-RAIDS-03",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
    "contentSha256": "800d0418596afd778af4d71e4d7d40499d9c440b0e047b6a42df50f3208fe9d9",
    "reviewedCharacterCount": 9933,
    "reviewedAt": "2026-07-14",
    "url": "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids",
    "summary": "At a City Council hearing, police officials portrayed MARCH operations as complaint-driven inspections and a last resort, while venue operators described intimidating deployments, reputational damage, and unclear grounds for enforcement. The proposed legislation would require quarterly reporting intended to clarify how MARCH operated and what consequences followed.",
    "locator": "Live page; the hearing body contrasting the NYPD’s description of MARCH with venue owners’ accounts, followed by the passages on unclear targeting, Brian Abelson’s FOIL-based analysis, and Intro 1156’s reporting requirements.",
    "supportsGenerally": [
      "Venue owners testified that MARCH operations involved large numbers of officers, interrupted business, and sometimes produced limited citations.",
      "NYPD representatives said MARCH was used for establishments associated with recurring complaints and was a last resort.",
      "The NYPD reported 57 MARCH operations in the preceding year but could not state accurately how many individual establishments were inspected.",
      "The article reports that Brian Abelson’s analysis classified about 60 percent of approximately 1,700 inspections as producing no action, 35 percent as producing a violation, and 5 percent as ending with a business vacating its space."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute any individual role to him in the hearing or proposed legislation.",
      "References to an earlier NYC Artist Coalition meeting and to a coalition-affiliated researcher do not establish that the organization directed the hearing or caused Intro 1156’s introduction.",
      "The article reports Abelson’s calculations but does not independently validate them or establish that MARCH caused every reported vacancy or bankruptcy.",
      "The hearing does not establish that Intro 1156 passed or that MARCH was subsequently abolished."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "The article identifies an earlier gathering as an NYC Artist Coalition meeting at which a participant raised concerns about MARCH."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-BROOKLYN-EAGLE-CABARET-2017-05-12",
    "campaignEntryId": "LET-NYC-DANCE-14",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://brooklyneagle.com/55343/there-are-only-17-places-in-brooklyn-where-you-can-legally-dance/",
    "contentSha256": "2f8fbf821c60e41f7c7ba838ab5974030b3dec35a192a6911b128b8a4fe28a1a",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
    "summary": "The article reports that New York’s cabaret-license system left only 17 licensed dance venues in Brooklyn and 88 citywide. It describes opposition to the law, including NYC Artist Coalition’s historical critique and mapping work and the launch of the Let NYC Dance campaign.",
    "locator": "Live page; the body explaining the cabaret-license requirement and NYC Artist Coalition’s map, followed by the Brooklyn license counts and the closing passages on the Let NYC Dance campaign and Rafael Espinal’s support for repeal.",
    "supportsGenerally": [
      "The cabaret law required establishments to obtain a difficult-to-secure license to permit social dancing.",
      "Using Department of Consumer Affairs data, NYC Artist Coalition mapped establishments holding cabaret licenses.",
      "The map identified 17 licensed venues in Brooklyn and 88 across the five boroughs at the time.",
      "NYC Artist Coalition and Dance Liberation Network held a Market Hotel event introducing the Let NYC Dance campaign to more than 300 attendees."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or assign him an individual role in the map, event, or campaign.",
      "The article does not establish that NYC Artist Coalition alone produced the campaign, persuaded lawmakers, or caused the law’s eventual repeal.",
      "The license counts are a 2017 snapshot and do not establish the number of licensed venues at any later date.",
      "The article reports the coalition’s account of the law’s discriminatory history but does not independently document that history within the recovered body."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition characterized the cabaret law as discriminatory and historically directed against Black, interracial, gay, and lesbian nightlife.",
      "NYC Artist Coalition used Department of Consumer Affairs data to create a map of licensed venues.",
      "NYC Artist Coalition joined Dance Liberation Network in holding the Market Hotel event that introduced the Let NYC Dance campaign."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-BROOKLYN-EAGLE-NIGHTLIFE-OFFICE-2017-09-20",
    "campaignEntryId": "SAVE-NYC-SPACES-05",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://brooklyneagle.com/60477/a-new-era-mayor-de-blasio-signs-bill-to-create-nyc-office-of-nightlife/",
    "contentSha256": "7b846eca48bf21373ba337e509096468bf19b4b66db27ff5b2703f710dd875ce",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
    "summary": "The article reports Mayor Bill de Blasio’s signing of legislation creating an Office of Nightlife and a 12-member advisory board. It outlines the director’s intended duties and presents both Rafael Espinal’s defense of the office and a fiscal objection from Reclaim New York.",
    "locator": "Live page; the body beginning with the House of Yes bill-signing, continuing through the office director’s duties and advisory-board structure, and ending with the competing arguments about cost and nightlife’s economic importance.",
    "supportsGenerally": [
      "De Blasio signed Rafael Espinal’s legislation creating an Office of Nightlife and Nightlife Advisory Board.",
      "The nightlife director’s stated duties included outreach, referrals to city services, review of 311 complaints, and a hearing in each borough.",
      "The advisory board was to have 12 members, with four appointed by the mayor and eight by the City Council speaker.",
      "Reclaim New York criticized the office as unnecessary, while Espinal defended its cost and potential benefits."
    ],
    "doesNotEstablish": [
      "The body mentions neither Jamie Burkart nor NYC Artist Coalition and attributes neither a role in drafting, advocating for, or passing the legislation.",
      "The signing does not establish that any unnamed advocacy coalition caused the office’s creation.",
      "Comparisons with Amsterdam do not establish that New York’s office later reduced crime or noise complaints.",
      "The article does not establish that the new office ultimately preserved venues, created jobs, or improved safety."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-BROOKLYN-PAPER-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-15",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.brooklynpaper.com/think-i-better-dance-now-two-bushwick-councilmen-fight-for-your-right-to-party/",
    "contentSha256": "9dcdc394c97b739c7a50013d901fdc87d43678b1c5ec6b44eae0091ab4afa678",
    "reviewedCharacterCount": 6594,
    "reviewedAt": "2026-07-14",
    "url": "https://brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
    "summary": "The article reports that Council members Rafael Espinal and Antonio Reynoso supported eliminating New York’s cabaret-license requirement. It describes activists’ safety and discrimination arguments, Espinal’s effort to draft repeal legislation, and concerns that repeal could affect neighborhood safety and quality of life.",
    "locator": "Live page; the article body covering the Market Hotel meeting, the council members’ support for repeal, activists’ safety argument, and the closing update on Espinal’s legislation and Dance Liberation Network’s petition.",
    "supportsGenerally": [
      "Espinal and Reynoso publicly supported removing the cabaret-license requirement.",
      "Activists argued that the law pushed dancing into less safe spaces.",
      "Espinal said he was drafting repeal legislation and seeking support from other council members.",
      "Dance Liberation Network’s repeal petition had nearly 3,000 signatures at the time."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and assigns neither a role in the meeting, petition, or proposed legislation.",
      "The article does not establish that the petition, the council members, or any broader coalition caused the law’s eventual repeal.",
      "Espinal was still drafting legislation, so the article does not establish passage or implementation of a repeal measure.",
      "The activists’ safety argument does not establish that the cabaret law caused any specific disaster or venue closure discussed in the article."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-BROOKLYN-VEGAN-NIGHTLIFE-OFFICE-2017-09-20",
    "campaignEntryId": "SAVE-NYC-SPACES-08",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes",
    "contentSha256": "a1061445d788a13afc59bb3a29bb80290a59cc57426765e1201fe5151d3c1a81",
    "reviewedCharacterCount": 5282,
    "reviewedAt": "2026-07-14",
    "url": "https://brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes",
    "summary": "The article reports that Mayor Bill de Blasio signed legislation creating the Office of Nightlife at House of Yes. It presents the office as an initial institutional acknowledgment of nightlife while noting that neither the nightlife mayor nor committee members had yet been appointed.",
    "locator": "Live page; the body beginning with the House of Yes signing, followed by comments from de Blasio, Anya Sapozhnikova, Rafael Espinal, and Todd P, and the closing note that appointments remained outstanding.",
    "supportsGenerally": [
      "De Blasio signed the Office of Nightlife legislation at House of Yes on September 19, 2017.",
      "The office was described as having a 12-member committee led by a nightlife mayor.",
      "Espinal cited venue closures and increasing corporate homogenization as motivations for the legislation.",
      "At publication, no nightlife mayor or committee members had been appointed."
    ],
    "doesNotEstablish": [
      "The body mentions neither Jamie Burkart nor NYC Artist Coalition and attributes neither any role in the signing or legislation.",
      "The article does not identify a coalition whose work caused passage of the Office of Nightlife bill.",
      "The signing and supportive statements do not establish that the office subsequently changed regulations or prevented venue closures.",
      "Todd P’s description of the office as a useful first step is an attributed assessment, not evidence of a completed policy outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-CITYLAB-NIGHT-MAYOR-2017-09-26",
    "campaignEntryId": "SAVE-NYC-SPACES-06",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20191214060044/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    "contentSha256": "3bce5bafe51a975061957039aace67b270998c3982d783abfdf2511dbcab5872",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505",
    "summary": "The archived CityLab article reports that the New York City Council voted in August 2017 to create an Office of Nightlife. It describes the office as addressing working conditions, zoning, noise, trash, and obstacles facing artists and smaller nightlife businesses. Drawing lessons from European nightlife bodies, the article argues that effective nightlife governance should value nightlife’s cultural and economic role, remain meaningfully independent from political and dominant business interests, include diverse community representation, and address pressures such as rising rents, displacement, and gentrification.",
    "locator": "Wayback capture dated 2019-12-14 at 06:00:44; archived CityLab body, particularly the introductory paragraphs on the Council vote and the office’s intended responsibilities, the independence discussion’s paragraph about the 12-member Nightlife Advisory Board, and the subsequent discussion of gentrification and nightlife diversity.",
    "supportsGenerally": [
      "The New York City Council voted to establish an Office of Nightlife in 2017.",
      "The office was presented as addressing conditions affecting artists, nightlife workers, venues, and smaller nighttime businesses.",
      "The planned advisory board included artists, community representatives, zoning experts, and nightlife workers.",
      "The article connects nightlife preservation with rising rents, displacement, gentrification, cultural diversity, and community representation."
    ],
    "doesNotEstablish": [
      "The article does not explicitly name Jamie Burkart.",
      "The article does not explicitly name the NYC Artist Coalition.",
      "The article does not attribute advocacy, organizing, legislative influence, or any other action to Jamie Burkart or the NYC Artist Coalition.",
      "The generic reference to a broad coalition supporting Amsterdam’s night mayor is not a reference to the NYC Artist Coalition."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-CRAINS-CABARET-2017-06-19",
    "campaignEntryId": "LET-NYC-DANCE-12",
    "recoveryMode": "wayback-body",
    "reviewExtent": "headline-and-deck",
    "retrievalUrl": "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    "contentSha256": "c12896b499cc61075e3f5872eb5b97712a925e15deacb9b35f13e4a2de9628fb",
    "reviewedCharacterCount": 7407,
    "reviewedAt": "2026-07-14",
    "url": "https://crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    "summary": "The Wayback capture exposes a headline reporting a City Council move to repeal the cabaret law and a description characterizing the law as designed to prevent interracial dancing. The full article body is unavailable behind a continuation prompt.",
    "locator": "Wayback archive; the Crain’s Small Business article header, headline, and descriptive deck immediately before the prompt requiring the reader to choose an option to continue.",
    "supportsGenerally": [
      "The recovered headline reports that the City Council was moving to repeal the cabaret law.",
      "The recovered description characterizes the law as originally designed to prevent white and Black people from dancing together.",
      "The capture identifies Aaron Elstein as the author and June 19, 2017 as the publication date."
    ],
    "doesNotEstablish": [
      "Because the capture does not expose the article body, it does not establish the proposal’s sponsors, procedural stage, evidence, or supporting arguments beyond the headline and description.",
      "The recovered material names neither Jamie Burkart nor NYC Artist Coalition and attributes neither an individual role nor a collective outcome.",
      "A reported move toward repeal does not establish that repeal was enacted or that any campaign actor caused it."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-DNAINFO-CABARET-2017-06-20",
    "campaignEntryId": "LET-NYC-DANCE-10",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20260214132538/https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/",
    "contentSha256": "5f533a8653c71b58add4715b2da11c436e81c5832262f4b85be2dae3814cbb83",
    "reviewedCharacterCount": 10543,
    "reviewedAt": "2026-07-14",
    "url": "https://dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn",
    "summary": "DNAinfo reports that city officials continued defending the Cabaret Law in court while declining to provide councilmembers with enforcement details. Advocates and lawmakers sought repeal, while state data showed fines against dozens of establishments despite an absence of recent city citations.",
    "locator": "Wayback archive capture dated February 14, 2026; body passages covering Lindsay Greene’s City Council testimony and the later DCA and State Liquor Authority enforcement figures.",
    "supportsGenerally": [
      "The de Blasio administration was defending a lawsuit challenging the Cabaret Law.",
      "Councilmember Rafael Espinal pledged to draft repeal legislation.",
      "The Department of Consumer Affairs reported no Cabaret Law violations from January 1, 2016 through April 1, 2017.",
      "The State Liquor Authority collected about $40,000 in fines from 36 bars and restaurants for unlicensed dancing during that period."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or establish any individual role for him.",
      "The body does not name NYC Artist Coalition or attribute the North Brooklyn repeal movement to that organization.",
      "The contextual reporting does not establish that any particular advocate or group caused the law’s later repeal."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-FORBES-CABARET-2017-10-04",
    "campaignEntryId": "LET-NYC-DANCE-07",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/",
    "contentSha256": "51bf3ae300fc98bd81c3290114abbbfbe3b97f81303b7ce42728fbaf44b41a2d",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort",
    "summary": "This opinion article argues that New York City Republicans should support Cabaret Law repeal as an opposition to overregulation and an opportunity to ally with the nightlife industry. It traces the law’s racial origins and subsequent use to regulate venues and workers.",
    "locator": "Live Forbes page; body from the opening Republican-overregulation argument through the historical sections on the 1926 law, cabaret cards, and Giuliani-era enforcement.",
    "supportsGenerally": [
      "The author urges New York City Republicans to support the repeal effort.",
      "The law required a license when three or more people danced in an establishment.",
      "Cabaret workers and entertainers were once required to obtain fingerprint-based cabaret cards.",
      "The article describes Giuliani-era enforcement as part of a quality-of-life campaign."
    ],
    "doesNotEstablish": [
      "The recovered body does not name Jamie Burkart or NYC Artist Coalition.",
      "Its historical and political argument does not establish that Jamie or the coalition performed any campaign role.",
      "The article does not establish that Republican support materialized or caused repeal."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-GOTHAMIST-CABARET-2017-06-19",
    "campaignEntryId": "LET-NYC-DANCE-08",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://gothamist.com/news/diy-venues-demand-repeal-of-widely-reviled-cabaret-law",
    "contentSha256": "b194d953c247309a50c3b96041f5240f82a557d7e543bdbfe5932b017c2a8b4a",
    "reviewedCharacterCount": 8584,
    "reviewedAt": "2026-07-14",
    "url": "https://gothamist.com/2017/06/19/cabaret_law_nyc.php",
    "summary": "Gothamist reports that Jamie Burkart and other venue advocates pressed for full repeal of the Cabaret Law, citing its discriminatory history, licensing burdens, arbitrary enforcement, and adverse safety incentives. The article also covers Rafael Espinal’s repeal effort and proposed Office of Nightlife.",
    "locator": "Live Gothamist page; opening body passages on Burkart’s fire-code groups and City Hall rally, followed by the hearing discussion of licensing, enforcement, safety, and the Night Mayor proposal.",
    "supportsGenerally": [
      "Jamie Burkart began organizing fire-code study groups for DIY venues after a close friend died in the Ghost Ship fire.",
      "Burkart rallied outside City Hall for full repeal of the Cabaret Law.",
      "Burkart said otherwise code-compliant spaces feared approaching the Fire Department because they lacked cabaret licenses.",
      "City Hall reported that only 97 of roughly 25,000 bars and restaurants held cabaret licenses."
    ],
    "doesNotEstablish": [
      "Burkart’s documented activities do not establish that he organized the entire rally, hearing, or repeal movement.",
      "The body does not establish that Jamie Burkart or NYC Artist Coalition authored Espinal’s legislation.",
      "The reporting does not establish that Jamie’s or the coalition’s advocacy caused repeal or creation of the Office of Nightlife."
    ],
    "mentionsJamie": true,
    "mentionsCoalition": true,
    "directAttributions": [
      "Jamie Burkart organized fire-code study groups for DIY venues after the Ghost Ship fire.",
      "Jamie Burkart rallied outside City Hall for full repeal of the Cabaret Law.",
      "Burkart was identified as being with NYC Artist Coalition and attributed license-related fear of approaching the Fire Department to a safety crisis."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-GOTHAMIST-NIGHTLIFE-OFFICE-2017-09-20",
    "campaignEntryId": "SAVE-NYC-SPACES-03",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://gothamist.com/arts-entertainment/de-blasio-praising-punk-rock-signs-bill-establishing-nyc-night-mayor",
    "contentSha256": "294a2bf72c0f9f43daf04d1dd6a94e723d220b9764bbb6765207c8f714883cbe",
    "reviewedCharacterCount": 6482,
    "reviewedAt": "2026-07-14",
    "url": "https://gothamist.com/2017/09/20/punk_blaz_signs_bill.php",
    "summary": "Gothamist reports that Mayor Bill de Blasio signed legislation establishing an Office of Nightlife intended to connect City Hall, nightlife businesses, and DIY venues. Attendees welcomed the institutional recognition while expressing differing expectations about its immediate practical effect.",
    "locator": "Live Gothamist page; opening House of Yes signing account and the middle body passages explaining Rafael Espinal’s liaison concept, the repeal context, and venue owners’ reactions.",
    "supportsGenerally": [
      "De Blasio signed the Office of Nightlife legislation at House of Yes.",
      "The office was to be headed by a yet-to-be-selected Night Mayor.",
      "The office was intended to serve as a liaison between City Hall, the nightlife industry, and DIY venues.",
      "A mayoral adviser had supported Cabaret Law repeal subject to retaining certain security requirements."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and therefore establishes no role for either.",
      "The article attributes the legislation to Rafael Espinal and de Blasio’s signature, not to Jamie or the coalition.",
      "Its discussion of a broader nightlife movement does not establish that the new office caused Cabaret Law repeal or other subsequent outcomes."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-GOTHAMIST-MARCH-2019-02-12",
    "campaignEntryId": "TALKS-NOT-RAIDS-01",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://gothamist.com/arts-entertainment/lawmakers-demand-transparency-on-surprise-multi-agency-raids-on-local-bars-and-clubs",
    "contentSha256": "a1c7b07292d90d00846cf85f64907817745b0dc61e301908fc06149dd3000869",
    "reviewedCharacterCount": 8470,
    "reviewedAt": "2026-07-14",
    "url": "https://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php",
    "summary": "Gothamist reports on a City Council hearing examining surprise multi-agency MARCH inspections of nightlife establishments and proposed quarterly transparency reports. Venue owners and advocates described financial and reputational harm, while NYC Artist Coalition members alleged disproportionate targeting of venues serving people of color and LGBTQ patrons.",
    "locator": "Live Gothamist page; opening account of the Ode to Babel inspection, the hearing and Levin reporting-bill passages, and the later discussion of NYC Artist Coalition’s targeting concerns and Office of Nightlife advocacy.",
    "supportsGenerally": [
      "Ode to Babel received five State Liquor Authority charges after an October 2018 inspection.",
      "As many as 203 establishments appeared on 2018 MARCH target lists, although the city lacked an exact count of visits.",
      "Stephen Levin’s bill would require quarterly reports on MARCH inspections and their outcomes.",
      "Marva Babel and NYC Artist Coalition members said they believed MARCH disproportionately targeted bars serving people of color and LGBTQ patrons."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or establish his participation in the hearing or campaign.",
      "The advocates’ stated belief does not independently establish a measured pattern of disproportionate enforcement.",
      "The coalition’s joint advocacy for the Office of Nightlife does not establish that it alone caused the office’s creation or any change in MARCH practices."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition members joined Marva Babel in expressing the belief that MARCH disproportionately targeted bars serving people of color and LGBTQ patrons.",
      "NYC Artist Coalition and other advocacy groups fought for creation of the Office of Nightlife and the Night Mayor position as liaisons between establishments and the city."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-GOTHAMIST-NEIRS-2020-01-13",
    "campaignEntryId": "FAIR-RENT-NYC-06",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    "contentSha256": "2191ab0f471a19b27ed5d82149e3b7593f27dc53710c39b32a0fc0b1327856f2",
    "reviewedCharacterCount": 8537,
    "reviewedAt": "2026-07-14",
    "url": "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    "summary": "Gothamist reports that Neir’s Tavern avoided imminent closure through a five-year landlord agreement and a city grant after facing a steep proposed rent increase. Commercial-rent advocates used the reprieve to argue that broader protections remained necessary for small businesses.",
    "locator": "Live Gothamist page; body passages on the five-year agreement, grant, and rent increases, followed by the Save NYC rally section featuring Olympia Kazi and competing commercial-rent proposals.",
    "supportsGenerally": [
      "Neir’s owner announced a five-year agreement with an option to renew.",
      "A $90,000 city grant helped keep the tavern open.",
      "The tavern’s rent had risen from slightly over $2,000 to $3,100 per month, with a proposed increase to $5,400.",
      "NYC Artist Coalition was identified as one of several groups pushing for commercial rent stabilization."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or establish any role for him in saving Neir’s Tavern.",
      "It does not attribute negotiation of the landlord agreement, the city grant, or organization of the rally to NYC Artist Coalition.",
      "The coalition’s policy advocacy does not establish that it caused Neir’s reprieve or passage of commercial rent stabilization."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition was described as one of several groups pushing for passage of commercial rent stabilization."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-METRO-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-13",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20170817001608/http://www.metro.us:80/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    "contentSha256": "a080c07106040ccf20df7882867341d0bdb275cf749a067457ab2c84185a07f3",
    "reviewedCharacterCount": 7361,
    "reviewedAt": "2026-07-14",
    "url": "https://metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    "summary": "Metro reports on a renewed effort to repeal the Cabaret Law, describing its discriminatory origins, the small number of licensed venues, and licensing obstacles faced by clubs. It also notes Rafael Espinal’s planned legislation and Andrew Muchmore’s constitutional challenge.",
    "locator": "Wayback archive capture dated August 17, 2017; body passages introducing the renewed campaign, identifying Olympia Kazi and NYC Artist Coalition, and discussing Espinal’s proposal and Muchmore’s lawsuit.",
    "supportsGenerally": [
      "The Cabaret Law required a special license when three or more people danced at a bar or club.",
      "The article reports that only 93 venues then held cabaret licenses.",
      "NYC Artist Coalition was described as advocating for the safety and preservation of community-driven cultural spaces.",
      "Rafael Espinal said he planned to introduce repeal legislation."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or establish any individual role for him.",
      "The coalition’s stated advocacy role does not establish that it launched or controlled the entire renewed campaign.",
      "The article reports a planned bill and pending lawsuit but does not establish that the coalition caused repeal or another policy outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition was described as advocating for the safety and preservation of community-driven cultural spaces."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-MIXMAG-CABARET-NEWS-2017",
    "campaignEntryId": "LET-NYC-DANCE-21",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    "contentSha256": "0dfe6996b3aa1f88ab50f1f4f8f05b38fcbe96668401b9b68248c0af495c8c83",
    "reviewedCharacterCount": 3290,
    "reviewedAt": "2026-07-14",
    "url": "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    "summary": "Mixmag reports that Dance Liberation Network and NYC Artist Coalition launched a petition seeking repeal of the Cabaret Law and planned a public town hall at Market Hotel. The brief describes the law’s discriminatory origins and the petition’s argument that existing safety and noise rules made it unnecessary.",
    "locator": "Live Mixmag page; short article body covering the joint petition, the law’s history and stated rationale for repeal, and the March 30 Let NYC Dance town hall announcement.",
    "supportsGenerally": [
      "Dance Liberation Network and NYC Artist Coalition jointly launched a repeal petition.",
      "The law applied when three or more people danced in an unlicensed space.",
      "The article traces the law to restrictions on African American jazz clubs in 1926.",
      "The two organizations planned a Let NYC Dance town hall at Market Hotel for March 30, 2017."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute any action to him.",
      "The joint actions do not establish that NYC Artist Coalition originated or controlled the campaign by itself.",
      "The announcement does not establish petition participation, town-hall attendance, or that either activity caused repeal."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition and Dance Liberation Network jointly launched a petition to repeal the Cabaret Law.",
      "NYC Artist Coalition and Dance Liberation Network planned the March 30 Let NYC Dance town hall at Market Hotel."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-NEW-YORKER-DANCE-OUTLAWS-2017-07-10",
    "campaignEntryId": "LET-NYC-DANCE-02",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    "contentSha256": "ee87ea18b96c9d7733e3c8d6a2bfb00a24aad4a38bad0469f3d864cb91ce395a",
    "reviewedCharacterCount": 6729,
    "reviewedAt": "2026-07-14",
    "url": "https://newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    "summary": "The New Yorker recounts a City Council hearing where venue owners, performers, and nightlife advocates argued for Cabaret Law repeal. Their testimony connected the law’s discriminatory history and enforcement practices with burdens on small venues and broader cultural homogenization.",
    "locator": "Live New Yorker page; body from the City Council chamber introduction through the five-hour testimony, including the Muchmore, Nelson, and Barclay enforcement accounts and the concluding cultural-loss discussion.",
    "supportsGenerally": [
      "Rafael Espinal introduced the repeal effort, with Antonio Reynoso as a co-sponsor.",
      "Fewer than 100 of more than 12,000 alcohol-licensed venues could legally permit dancing.",
      "Twenty-seven unlawful-cabaret summonses were issued in the first quarter of 2017.",
      "Venue owners testified about cabaret citations and intimidating MARCH inspections."
    ],
    "doesNotEstablish": [
      "The recovered body names neither Jamie Burkart nor NYC Artist Coalition and establishes no role for either.",
      "The reported testimony represents several independent speakers and does not support attributing the hearing or movement to Jamie or the coalition.",
      "The article does not establish that the hearing or any participant’s testimony caused repeal."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NPR-CABARET-2017-09-20",
    "campaignEntryId": "LET-NYC-DANCE-11",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    "contentSha256": "d6ca5338cac6a7229cb5d8f1dfe6ef2c9ed36b42674e6de3c46264e1eac097ba",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    "summary": "NPR reports that de Blasio signed legislation creating an Office of Nightlife while a separate Cabaret Law repeal bill remained under consideration. It places those measures within decades of advocacy and recounts the Cabaret Law’s discriminatory history and use against successive music scenes.",
    "locator": "Wayback archive capture dated October 28, 2025; opening body passages on the Office of Nightlife signing, the middle Let NYC Dance mobilization paragraph, and the later historical discussion of cabaret cards and MARCH enforcement.",
    "supportsGenerally": [
      "De Blasio signed legislation establishing an Office of Nightlife and a Nightlife Advisory Board.",
      "The office and advisory group were intended to liaise between the nightlife industry and local communities.",
      "Rafael Espinal’s separate Bill 1652 proposed repealing the Cabaret Law.",
      "NYC Artist Coalition was listed among Let NYC Dance groups that mobilized supporters and joined representatives of multiple musical genres and social-justice nonprofits.",
      "NPR identified Jamie Burkart as a founding member of the organization it called NYC Arts Coalition."
    ],
    "doesNotEstablish": [
      "The article's 'NYC Arts Coalition' wording is retained as published and should not be silently treated as a separate organization.",
      "A founding-member attribution does not establish Jamie's sole leadership, authorship, or causation of collective or legislative outcomes.",
      "The coalition appears within a list of participating groups, without a distinct individual contribution to the signed legislation being specified.",
      "The broad mobilization and decades of advocacy do not establish that NYC Artist Coalition caused creation of the office or passage of the pending repeal bill."
    ],
    "mentionsJamie": true,
    "mentionsCoalition": true,
    "directAttributions": [
      "NPR identified Jamie Burkart as a founding member of 'NYC Arts Coalition,' the article's wording, and reported his support for repealing the discriminatory law."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-CURBED-COMMERCIAL-RENT-2019-11-08",
    "campaignEntryId": "FAIR-RENT-NYC-03",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20251216101013/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    "contentSha256": "cc5c544cc2124e7b04994927335a0066def17bb3662c356941e1c2aa901e6e30",
    "reviewedCharacterCount": 9694,
    "reviewedAt": "2026-07-14",
    "url": "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    "summary": "Curbed describes a draft commercial rent-stabilization bill that would create a board to regulate increases for qualifying retail, office, and manufacturing spaces. The article connects the proposal to rising vacancies and presents advocates’ concerns about the loss of longstanding cultural businesses.",
    "locator": "Wayback archive capture dated December 16, 2025; body passages explaining the draft board and covered spaces, the comptroller’s vacancy figures, and Olympia Kazi’s concluding comments about cultural access.",
    "supportsGenerally": [
      "Stephen Levin and small-business advocates worked for a year on the draft legislation.",
      "The proposal would create a commercial rent-stabilization board to set increases.",
      "Retail and office spaces under 10,000 square feet and manufacturing spaces under 25,000 square feet would be covered.",
      "The article reports that vacant retail space grew from 5.6 million square feet in 2007 to 11.8 million in 2017."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or establish any role for him.",
      "Olympia Kazi’s identification with NYC Artist Coalition and her policy comments do not establish that the organization helped draft the bill.",
      "Because the measure was still prospective, the article does not establish passage, effects on vacancies, or that collective advocacy caused an outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NY-DAILY-NEWS-CABARET-2017-06-19",
    "campaignEntryId": "LET-NYC-DANCE-05",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.nydailynews.com/2017/06/19/footloose-new-yorkers-go-after-archaic-cabaret-law-banning-dancing-in-most-city-bars/",
    "contentSha256": "4a2b620cdcb19f1b5cc5f6651cac52734ea417bdd7f37932f97b43c7e239b6d6",
    "reviewedCharacterCount": 7693,
    "reviewedAt": "2026-07-14",
    "url": "https://nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
    "summary": "The article reports criticism of New York City’s cabaret law at a City Council oversight hearing, including complaints that it was vague, discriminatory, and applicable to nearly all bars and restaurants. Councilman Rafael Espinal planned to introduce a full repeal, while administration officials had not committed to supporting one.",
    "locator": "Live New York Daily News payload; article-body passage from the June 19 oversight-hearing account through the license count, Espinal repeal plan, and Olympia Kazi and Antonio Reynoso comments on enforcement.",
    "supportsGenerally": [
      "Only 97 of approximately 26,000 city bars and restaurants had cabaret licenses.",
      "Andrew Muchmore said his bar was fined over patrons swaying during a rock show.",
      "Rafael Espinal said he planned to introduce a full repeal of the cabaret law.",
      "Olympia Kazi of the New York City Artist Coalition argued that enforcement differed between rock and hip-hop events."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute hearing testimony, organizing, or legal work to him.",
      "Its contextual account of Olympia Kazi’s remarks does not establish that she or the New York City Artist Coalition caused Espinal’s planned legislation or the law’s eventual repeal.",
      "The article does not report a completed repeal vote."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "Olympia Kazi was identified as being of the New York City Artist Coalition and argued at the hearing that enforcement was discriminatory, contrasting rock and hip-hop events."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-NY-DAILY-NEWS-COMMERCIAL-RENT-2019-11-14",
    "campaignEntryId": "FAIR-RENT-NYC-02",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.nydailynews.com/2019/11/14/pols-small-biz-owners-rally-for-law-limiting-rent-hikes-on-nycs-beleaguered-mom-and-pop-shops/",
    "contentSha256": "e435334a347b8c3dd958d387648b406d0486e3f163c6854489e4c53678bc40ee",
    "reviewedCharacterCount": 9266,
    "reviewedAt": "2026-07-14",
    "url": "https://nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
    "summary": "The article reports that elected officials and small-business owners rallied for Steve Levin’s proposal to regulate commercial rent increases through a city guidelines board. It also describes opposition from real-estate interests and legal concerns raised by Mayor de Blasio.",
    "locator": "Live New York Daily News payload; body passage from the City Hall rally and Commercial Rent Guidelines Board mechanics through REBNY and mayoral objections and the closing Olympia Kazi remarks.",
    "supportsGenerally": [
      "Levin’s bill would create a board empowered to limit rent increases for qualifying small commercial spaces.",
      "A comptroller report found city retail vacancy near 6 percent in 2017, compared with 4 percent a decade earlier.",
      "The bill had ten sponsors at the time of reporting.",
      "Olympia Kazi of NYC Artist Coalition spoke at the rally about the loss of the city’s culture."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or assign him a role in the rally or legislation.",
      "The appearance of one NYC Artist Coalition affiliate does not establish that the organization authored, sponsored, or caused the introduction or passage of Levin’s bill.",
      "The article does not establish that the proposal became law or reduced vacancies."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "Olympia Kazi, identified as being of NYC Artist Coalition, spoke at the City Hall rally and warned that the city was losing its culture."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-NY-DAILY-NEWS-NIGHTLIFE-OFFICE-2017-09-19",
    "campaignEntryId": "SAVE-NYC-SPACES-01",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.nydailynews.com/2017/09/19/mayor-de-blasio-oks-creation-of-office-to-manage-issues-affecting-citys-nightlife/",
    "contentSha256": "6b9bbbdf498bf4b040ce202692aeb9195c833123209753d68c350e6d005a1bf3",
    "reviewedCharacterCount": 9881,
    "reviewedAt": "2026-07-14",
    "url": "https://nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
    "summary": "The article reports that Mayor de Blasio signed legislation creating an Office of Nightlife to support the nightlife industry while addressing community concerns. It presents the office as a possible bridge for smaller and DIY venues confronting closures, permitting difficulties, and safety requirements.",
    "locator": "Live New York Daily News payload; body passage from the House of Yes bill signing and description of the office’s remit through Espinal’s discussion of DIY-venue closures, Ghost Ship, and code compliance.",
    "supportsGenerally": [
      "Rafael Espinal sponsored the bill creating the Office of Nightlife.",
      "The office was intended to help nightlife businesses grow while managing community concerns.",
      "A twelve-person Nightlife Committee was attached to the office.",
      "Espinal said a goal was to help DIY venues meet code requirements and leave the bureaucratic shadows."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and assigns neither a role in the legislation or signing.",
      "The article credits Espinal with sponsorship and does not establish that Jamie or any coalition caused the office’s creation.",
      "It does not establish the office’s later effectiveness in preserving venues or resolving safety and community conflicts."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NYPOST-CABARET-2017-09-14",
    "campaignEntryId": "LET-NYC-DANCE-03",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
    "contentSha256": "aa03579894b872be3c0494fde975d2e33bd67a2f4a68561af5cd7f647c943cc1",
    "reviewedCharacterCount": 6389,
    "reviewedAt": "2026-07-14",
    "url": "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars",
    "summary": "The article reports that the de Blasio administration supported repealing the cabaret law at a City Council hearing after having defended it in earlier litigation. Officials favored preserving the law’s security provisions while removing its dancing restrictions.",
    "locator": "Live New York Post payload; body passage from the administration’s changed position and Andrew Muchmore’s lawsuit through the license-scarcity discussion and City Council hearing testimony.",
    "supportsGenerally": [
      "City lawyers had defended the cabaret law in court in 2015.",
      "Andrew Muchmore filed a lawsuit challenging the law in 2014.",
      "Critics said fewer than 100 of more than 22,000 establishments had obtained cabaret licenses.",
      "City officials testified for repeal while retaining security measures."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and attributes no litigation, testimony, or advocacy to either.",
      "The report does not connect Jamie or any coalition to the administration’s change in position.",
      "Administration support at a hearing does not itself establish that repeal had been enacted."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NYPOST-NIGHTLIFE-OFFICE-2017-09-19",
    "campaignEntryId": "SAVE-NYC-SPACES-02",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
    "contentSha256": "2b0ac3b6f17b47eb7ae5786da2c9d7cfd824eef7e801f9bcab50faa1b71a2738",
    "reviewedCharacterCount": 7896,
    "reviewedAt": "2026-07-14",
    "url": "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife",
    "summary": "The article reports Mayor de Blasio’s signing of legislation creating an Office of Nightlife, including its staffing, budget, advisory board, and intended duties. It also records support from sponsor Rafael Espinal and concern from Manhattan Community Board 3 about possible industry favoritism.",
    "locator": "Live New York Post payload; body passage from the House of Yes signing through the office’s staffing, budget, advisory-board duties, Espinal’s rationale, and Community Board 3’s objection.",
    "supportsGenerally": [
      "The Office of Nightlife was assigned two staff positions and an annual budget of $407,000.",
      "A twelve-person advisory board would help with permits, complaints, policy recommendations, and industry trends.",
      "Rafael Espinal was identified as the legislation’s lead sponsor.",
      "The Mayor’s Office of Media and Entertainment reported that more than 20 percent of smaller music venues had closed over fifteen years."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and gives neither a role in creating the office.",
      "The article attributes sponsorship to Espinal and does not establish that Jamie or a coalition caused enactment.",
      "The proposed duties and cited Amsterdam model do not establish the New York office’s subsequent results."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NYTIMES-NIGHTCLUBS-2002-11-10",
    "campaignEntryId": "TALKS-NOT-RAIDS-05",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20251104235429/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    "contentSha256": "db6c20365a04f9589fc2c6aec5e94ab89827da2b104644f12dc461e64d220166",
    "reviewedCharacterCount": 11120,
    "reviewedAt": "2026-07-14",
    "url": "https://nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    "summary": "The article reports that the Bloomberg administration was increasing nightlife enforcement while reviewing how clubs were monitored and considering changes to the cabaret laws. Officials described an effort to balance quality-of-life concerns with recognition of nightlife as an important industry.",
    "locator": "Wayback archive payload captured at timestamp 20251104235429; body passage covering increased MARCH enforcement, the administration’s policy review, cabaret-law reconsideration, and the Serafina enforcement example.",
    "supportsGenerally": [
      "MARCH enforcement actions had increased 35 percent over the preceding year.",
      "City officials were developing a comprehensive policy for monitoring and enforcing rules at nightlife establishments.",
      "Officials were working with Councilman Alan Gerson to review the cabaret laws.",
      "The city padlocked Serafina after undercover agents booked a dance party there."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and assigns neither a role in the 2002 policy debate.",
      "This 2002 enforcement context does not establish Jamie’s participation in, or any coalition’s causation of, later reform campaigns.",
      "Consideration of policy changes does not establish that the cabaret laws were revised at that time."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-NYTIMES-CABARET-REPEAL-2017-10-30",
    "campaignEntryId": "LET-NYC-DANCE-01",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20251225083004/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    "contentSha256": "0b289c05246940c92f81949dcd1a30838d322434140e1c5b46351ef359895ded",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    "summary": "Published before the scheduled vote, the article reports that the City Council was expected to repeal the 91-year-old cabaret law and reviews the law’s history and enforcement. It also describes advocacy that included hearings, lobbying, and a pre-vote pub crawl involving several named groups.",
    "locator": "Wayback archive payload captured at timestamp 20251225083004; body passage from Espinal’s expected vote count and the law’s history through the Bushwick advocacy account and pre-vote pub crawl.",
    "supportsGenerally": [
      "Rafael Espinal said he had the 26 votes needed to pass repeal.",
      "Only 97 of roughly 25,000 eating and drinking establishments had cabaret licenses.",
      "Advocates testified at hearings, lobbied council members, and addressed community-board concerns.",
      "Members of NYC Artist Coalition were among the advocates participating in a pre-vote pub crawl."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or identify him among the advocates.",
      "Naming NYC Artist Coalition members within a larger advocacy group does not isolate the organization’s contribution or establish that it caused the expected repeal.",
      "Because the report preceded the scheduled vote, it does not itself report completed Council passage."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "Members of NYC Artist Coalition were included among roughly a dozen advocates who joined Rafael Espinal for a pre-vote pub crawl and carried repeal handouts."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-NYTIMES-STOREFRONT-VACANCY-2018-09-06",
    "campaignEntryId": "FAIR-RENT-NYC-01",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20260605193311/https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    "contentSha256": "609e0e1908ea2423e8ac92d79cd8c89d3f2b5edee72b3607cbb01a7f271e828a",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    "summary": "The interactive article documents extensive storefront vacancy along several New York City retail corridors and describes its visible neighborhood effects. It presents multiple reported contributors, including high rents, online shopping, new commercial construction, speculative holding, and difficulty finding tenants.",
    "locator": "Wayback archive payload captured at timestamp 20260605193311; recovered body’s panoramic introduction and location-specific vignettes for Times Square, Williamsburg, Chinatown, Prospect Heights, and Harlem.",
    "supportsGenerally": [
      "A Douglas Elliman survey was reported as finding roughly 20 percent of Manhattan retail space vacant, compared with about 7 percent in 2016.",
      "The article describes high rents and online competition as pressures on neighborhood businesses.",
      "Some tenants blamed landlords for holding storefronts vacant while awaiting development, zoning changes, or higher-paying tenants.",
      "The recovered vignettes document clusters of closed storefronts in both Manhattan and Brooklyn."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and assigns neither a role in documenting or responding to vacancies.",
      "The contextual vacancy reporting does not establish that Jamie or any coalition caused a policy response or commercial-rent outcome.",
      "The article presents several possible contributors and does not establish a single cause or test the effects of commercial rent stabilization."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-OBSERVER-NIGHTLIFE-MAYOR-2018",
    "campaignEntryId": "TALKS-NOT-RAIDS-07",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://observer.com/2018/03/new-york-city-night-mayor/",
    "contentSha256": "ea713de21a2b82c80749b88212d1e4604af2ed480992ae53469dae800e63561e",
    "reviewedCharacterCount": 9457,
    "reviewedAt": "2026-07-14",
    "url": "https://observer.com/2018/03/new-york-city-night-mayor",
    "summary": "The article reports on nightlife director Ariel Palitz’s first public appearance and a listening session addressing displacement, commercial rents, DIY-space legality, safety, zoning, and enforcement. Participants sought protections for communities of color, lawful gathering spaces, zoning reform, and safer nightlife venues.",
    "locator": "Live Observer payload; body passage from Palitz’s Bushwick listening session through Olympia Kazi’s zoning comments, the NYC Artists Coalition sash presentation, and Palitz’s description of the office’s listening role.",
    "supportsGenerally": [
      "More than 100 people attended the Bushwick panel discussion.",
      "Olympia Kazi, identified as a member of the NYC Artists Coalition, said zoning still restricted social dancing after repeal of the cabaret law.",
      "The NYC Artists Coalition presented Ariel Palitz with a nightlife-themed sash.",
      "Palitz said the Office of Nightlife would hold smaller talks and roundtables and was not a general complaint line."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or assign him a role in the listening session.",
      "Kazi’s comments and the coalition’s sash presentation do not establish that the organization created the nightlife office or caused any zoning amendment.",
      "The participants’ proposals describe priorities and intended work, not completed policy outcomes."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "Olympia Kazi was identified as a member of the NYC Artists Coalition and said the group was working to amend zoning text affecting social dancing.",
      "The NYC Artists Coalition presented Ariel Palitz with a nightlife-themed sash during the event."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-QUEENS-CHRONICLE-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-17",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    "contentSha256": "97cc0f030ab6898b1df4cced6f5a2b4a126e5bf8500598bcdd34b4c9c76135f6",
    "reviewedCharacterCount": 7314,
    "reviewedAt": "2026-07-14",
    "url": "https://qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    "summary": "The article reports that the Dance Liberation Network and NYC Artist Coalition were promoting a petition and event seeking immediate repeal of the cabaret law. It summarizes the law’s history, the advocates’ objections, and reactions from Queens business owners and petition signers.",
    "locator": "Live Queens Chronicle payload; body passage from the joint Dance Liberation Network and NYC Artist Coalition effort through the petition’s rationale, March 30 Let NYC Dance event details, and Queens business responses.",
    "supportsGenerally": [
      "The Dance Liberation Network and NYC Artist Coalition were working together against the cabaret law.",
      "The article reports that 118 of more than 25,000 bars and restaurants held cabaret licenses.",
      "The Dance Liberation Network’s petition sought immediate repeal of the law.",
      "The Let NYC Dance event was scheduled for March 30, 2017, at Market Hotel in Brooklyn."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute petition, event, or organizing work to him.",
      "Joint advocacy by the two named groups does not establish that either group caused the law’s eventual repeal.",
      "Several historical and enforcement assertions are presented as claims by the dance group or petition rather than as independently demonstrated outcomes."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition was reported as joining the Dance Liberation Network in a dance-focused effort and event opposing the cabaret law."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-QNS-COMMERCIAL-RENT-2019-12-18",
    "campaignEntryId": "FAIR-RENT-NYC-07",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://qns.com/2019/12/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
    "contentSha256": "56647ca19426189f5fade0bc183a39bf765e4f1d38df5aaaba4685fc3283f34b",
    "reviewedCharacterCount": 8954,
    "reviewedAt": "2026-07-14",
    "url": "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control",
    "summary": "The article reports that Councilman Jimmy Van Bramer joined small-business owners and advocates at a Sunnyside rally supporting Stephen Levin’s commercial rent-control bill. It describes the proposed board, covered spaces, rent-setting factors, vacancy growth, and business owners’ concerns about displacement.",
    "locator": "Live QNS payload; body passage from the rally outside the closed Dave’s Bagels through the proposed board’s coverage and appointment rules, comptroller vacancy statistic, and small-business testimony.",
    "supportsGenerally": [
      "Van Bramer was one of ten sponsors of Stephen Levin’s bill.",
      "The proposal covered qualifying retail, manufacturing, professional-service, and office spaces.",
      "The mayor would appoint a seven-member board to determine permissible rent increases using specified operating-cost factors.",
      "A comptroller report found vacant commercial space rose nearly 50 percent between 2007 and 2017, reaching 11.8 million square feet."
    ],
    "doesNotEstablish": [
      "The body names neither Jamie Burkart nor NYC Artist Coalition and attributes no rally or legislative role to either.",
      "The contextual account does not connect Jamie or any coalition to drafting, sponsoring, or advancing the bill.",
      "The article does not establish that the bill passed or that its proposed board reduced rents, vacancies, or displacement."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-SFGATE-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-20",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20220809111234/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    "contentSha256": "22bec839189fc4a8dbba6ba364164f8fff052b468c1c70198135f0ae4af440f4",
    "reviewedCharacterCount": 6540,
    "reviewedAt": "2026-07-14",
    "url": "https://sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    "summary": "The page reports that New York City's Cabaret Law prohibited dancing in establishments without a license and that few bars held one. It says the Dance Liberation Network and NYC Artist Coalition joined an effort involving a Let NYC Dance event and a repeal petition.",
    "locator": "Wayback archive capture dated August 9, 2022; the article-body paragraph beneath the title that moves from the law's 1920s origins and limited licensing to the Let NYC Dance event and repeal petition.",
    "supportsGenerally": [
      "The Cabaret Law prohibited dancing in establishments that lacked a cabaret license.",
      "Only 118 of the city's thousands of bars were reported to hold a cabaret license.",
      "The Dance Liberation Network and NYC Artist Coalition teamed up to oppose the law.",
      "The groups were putting on a Let NYC Dance event and circulating a repeal petition."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute any individual action or role to him.",
      "The page does not establish that the event or petition secured repeal of the Cabaret Law.",
      "The page does not establish that either organization's activity caused a legislative or administrative outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition teamed up with the Dance Liberation Network to oppose the Cabaret Law.",
      "NYC Artist Coalition and the Dance Liberation Network were putting on a Let NYC Dance event and circulating a repeal petition."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-SMITHSONIAN-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-09",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.smithsonianmag.com:443/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
    "contentSha256": "86b498a60a43cb98264952de4f1b9a5ac7b44c785207cbcaccb581d7b95cfe4d",
    "reviewedCharacterCount": 5644,
    "reviewedAt": "2026-07-14",
    "url": "https://smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998",
    "summary": "The article describes the Cabaret Law's licensing requirements, racist origins, and later use against marginalized nightlife communities. It reports that the de Blasio administration appeared open to repeal while zoning rules would continue to limit dance venues.",
    "locator": "Live Smithsonian Smart News page; the body passages following the licensing overview that trace the law's Harlem origins, Giuliani-era enforcement, and John Barclay's Dance Liberation Network advocacy before discussing zoning limits.",
    "supportsGenerally": [
      "Food-and-drink establishments required a cabaret license if customers were to dance.",
      "The law originally subjected cabaret workers to fingerprinting, photographs, and background checks.",
      "The article connects the law's creation to controlling Black Harlem clubs and interracial socializing.",
      "Existing zoning restrictions were expected to continue limiting dance venues even if the law were repealed."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute any role in the repeal effort to him.",
      "The body does not name NYC Artist Coalition or attribute coalition activity to it.",
      "The article does not establish that the Dance Liberation Network or any other advocacy group caused repeal; repeal remained prospective in this account."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-SUNNYSIDE-POST-COMMERCIAL-RENT-2019-12-18",
    "campaignEntryId": "FAIR-RENT-NYC-08",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://qns.com/2019/12/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes/?utm_source=sunnysidepost.com",
    "contentSha256": "8470977d8a473bd9dd3bb577d0f1f329216fd2e4060f0f71e0e3332756d3cecb",
    "reviewedCharacterCount": 8848,
    "reviewedAt": "2026-07-14",
    "url": "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
    "summary": "The article reports that Council Member Jimmy Van Bramer sponsored a proposal to regulate rent increases for smaller commercial spaces through a Commercial Rent Guidelines Board. It also presents vacancy data and opposition arguing that retail vacancies have multiple causes.",
    "locator": "Live page redirected to QNS; the central body after the Sunnyside press-conference lead, covering the bill's space thresholds and proposed guidelines board, followed by the comptroller's vacancy findings and industry opposition.",
    "supportsGenerally": [
      "Jimmy Van Bramer sponsored a commercial rent-control bill intended to protect small businesses from large rent increases.",
      "The proposal covered retail and office spaces of 10,000 square feet or less.",
      "The proposal would create a board to establish annual commercial-rent adjustments.",
      "A comptroller report found that vacant commercial space nearly doubled from 2007 to 2017."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute sponsorship, organizing, or advocacy to him.",
      "The body does not name NYC Artist Coalition or connect it to the proposal.",
      "The article does not establish that the bill became law or produced lower rents or vacancies.",
      "Because the article identifies several possible vacancy drivers, it does not establish that rent increases alone caused the reported trend."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-ATLANTIC-EMPTY-STOREFRONTS-2018-10-15",
    "campaignEntryId": "FAIR-RENT-NYC-05",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
    "contentSha256": "4a1b9abf0439795cdf069876ecf2788bfbcefb2b52beb41758c2ed4eb7cf6628",
    "reviewedCharacterCount": 8990,
    "reviewedAt": "2026-07-14",
    "url": "https://theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911",
    "summary": "The article argues that Manhattan's extensive storefront vacancies reflect three connected pressures: high rents, the shift to online shopping, and landlords holding out for long-term national tenants. It contends that these pressures are eroding neighborhood distinctiveness and opportunities for new businesses.",
    "locator": "Live Atlantic Ideas page; the body section beginning with Manhattan vacancy and retail-employment data, continuing through the three identified causes, and concluding with the discussion of lost neighborhood particularity.",
    "supportsGenerally": [
      "Separate surveys found that at least 20 percent of Manhattan street retail was vacant or approaching vacancy.",
      "Commercial rents in heavily trafficked Manhattan corridors rose 89 percent from 2010 to 2014 while retail sales rose 32 percent.",
      "Online shopping shifted demand away from storefronts selling durable and tradable goods.",
      "Some landlords preferred to await long-term national tenants rather than offer short leases to emerging retailers."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute analysis, advocacy, or policy work to him.",
      "The body does not name NYC Artist Coalition or connect it to the vacancy trend.",
      "The article does not establish that any campaign caused the reported vacancies or prompted a government response.",
      "The article does not evaluate a specific commercial-rent-control bill or establish that such a policy would reverse the trend."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-BAFFLER-MARCH",
    "campaignEntryId": "TALKS-NOT-RAIDS-04",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://thebaffler.com/latest/cut-the-music-pelly",
    "contentSha256": "e696fca6a77ac9f44f94a4e2eb5436d791d1b02b4117233a3f3304aa93cd6bc8",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://thebaffler.com/latest/cut-the-music-pelly",
    "summary": "The article reports that the NYPD-led M.A.R.C.H. program conducted opaque, coordinated inspections that could interrupt events and impose numerous violations on venues. It links the program to Cabaret Law enforcement and reports concerns that minority-owned nightlife businesses were disproportionately affected.",
    "locator": "Live Baffler page; the recovered body from the opening account of the Palisades raid through the Dance Liberation Network's review of cabaret-violation closures and the section explaining the 2014 NYPD operations order.",
    "supportsGenerally": [
      "M.A.R.C.H. coordinated the NYPD with fire, health, buildings, liquor, and other agencies for venue inspections.",
      "A M.A.R.C.H. operation at Palisades stopped a show, cleared the venue, and produced citations and fines.",
      "The Dance Liberation Network reviewed a year of cabaret-violation closures and found that most involved Latino, Dominican, or Black-owned businesses.",
      "A 2014 NYPD order said venue selection was driven by complaints, nearby incidents, and an establishment's history of cooperation with authorities."
    ],
    "doesNotEstablish": [
      "The recovered body does not name Jamie Burkart or attribute any work concerning M.A.R.C.H. or the Cabaret Law to him.",
      "The recovered body does not name NYC Artist Coalition or assign it a role in the reported research or advocacy.",
      "Although the article says activists including the Dance Liberation Network renewed opposition, it does not establish that the group caused the Cabaret Law's repeal.",
      "The recovered portion does not establish that the reporting or advocacy ended or reformed M.A.R.C.H."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-JEWISH-VOICE-COMMERCIAL-RENT-2019-11-11",
    "campaignEntryId": "FAIR-RENT-NYC-09",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://thejewishvoice.com/local/new-york/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    "contentSha256": "6402b1882fe9d24324c7bd44597f3d5af34c1d2a9495c0a630da58c40629b80d",
    "reviewedCharacterCount": 6887,
    "reviewedAt": "2026-07-14",
    "url": "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets",
    "summary": "The article describes Council Member Stephen Levin's proposed rent-regulation framework for smaller commercial properties and situates it among other tenant protections. It also reports a citywide increase in retail vacancies attributed to online shopping, rising rents, and regulatory hurdles.",
    "locator": "Live Jewish Voice page; the body after the Stephen Levin introduction, including the proposed lease thresholds and rent framework, followed by the paragraphs on tenant protections and the comptroller's vacancy findings.",
    "supportsGenerally": [
      "Stephen Levin was developing a commercial-rent-control proposal for offices, retailers, and manufacturers.",
      "The proposal applied to stores and offices under 10,000 square feet and industrial spaces under 25,000 square feet.",
      "The City Council had approved measures addressing retail-vacancy records and harassment of commercial tenants.",
      "A comptroller report attributed rising retail vacancy to online shopping, commercial rents, and regulatory hurdles."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute the proposal or related advocacy to him.",
      "The body does not name NYC Artist Coalition or connect it to the legislation.",
      "The article does not establish that Levin's proposal was enacted or produced protections for commercial tenants.",
      "The contextual vacancy reporting does not establish that any individual or advocacy coalition caused a policy or market outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-VICE-THUMP-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-19",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    "contentSha256": "22f89141b2fd382d5e9ff84976aeb85b0985cdb1c0a223a4a8f4a6c13f7d295b",
    "reviewedCharacterCount": 6663,
    "reviewedAt": "2026-07-14",
    "url": "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    "summary": "The article reports that NYC Artist Coalition and the Dance Liberation Network planned to meet the cultural-affairs commissioner to propose policy changes for DIY spaces, with the Cabaret Law high on the agenda. It describes NYC Artist Coalition as a recently formed advocacy group seeking affordable creative space through zoning flexibility, incentives, and use of underused city property.",
    "locator": "Wayback archive capture dated March 22, 2017; the article body after the meeting announcement, especially the paragraphs on the March 30 commissioner meeting, NYC Artist Coalition's formation, and its affordable-space proposals.",
    "supportsGenerally": [
      "NYC Artist Coalition and the Dance Liberation Network planned to meet Cultural Affairs Commissioner Tom Finkelpearl on March 30.",
      "The Cabaret Law was to be a leading subject at the meeting.",
      "NYC Artist Coalition was formed in January 2017 to support and advocate for informal community spaces.",
      "The coalition sought affordable creative space through zoning flexibility, tax incentives, and conversion of underused city-owned property."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or identify him as a coalition founder, organizer, representative, or meeting participant.",
      "The meeting and proposals are described prospectively; the article does not report what occurred at the meeting.",
      "The body does not establish that NYC Artist Coalition obtained any proposed policy change or caused the Cabaret Law's later repeal."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": true,
    "directAttributions": [
      "NYC Artist Coalition planned with the Dance Liberation Network to meet the cultural-affairs commissioner, present policy changes, and discuss solutions for DIY spaces.",
      "NYC Artist Coalition was formed to provide support and advocacy for informal community spaces.",
      "NYC Artist Coalition sought affordable spaces through zoning flexibility, tax abatements and other incentives, and conversion of underused city-owned spaces into performance spaces."
    ]
  },
  {
    "sourceId": "SRC-NYCAC-TIMEOUT-CABARET-2017-08-15",
    "campaignEntryId": "LET-NYC-DANCE-16",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    "contentSha256": "059aea09c55774594add48f2f4291617cb57822d7ff7376eb8db2e2e5e59700b",
    "reviewedCharacterCount": 6516,
    "reviewedAt": "2026-07-14",
    "url": "https://timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    "summary": "The article presents the Cabaret Law as a racially rooted restriction that remained burdensome for bars and DIY venues. In an interview, Dance Liberation Network cofounder Frankie Decaiza Hutchinson describes the group's enforcement research, formation, and planned call for residents to contact council members.",
    "locator": "Live Time Out New York page; the article and interview body beginning with the law's licensing history and continuing through Hutchinson's answers about disproportionate enforcement, the Dance Liberation Network's origins, and its planned call to action.",
    "supportsGenerally": [
      "The Cabaret Law prohibited dancing by more than three people in public-admission spaces without a license.",
      "About 100 of the city's 25,000 bars and restaurants were reported to hold cabaret licenses.",
      "Dance Liberation Network research found recent violations concentrated among Latino, Dominican, and Black clubs.",
      "After Rafael Espinal introduced a repeal bill, the group planned to ask people to call their council members."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute Dance Liberation Network activity to him.",
      "The body does not name NYC Artist Coalition or connect it to the interview or research.",
      "The article does not establish that the group's research or planned outreach caused introduction, passage, or repeal of legislation.",
      "The page reports the group's research conclusions but does not provide its full dataset or methodology."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-VILLAGE-VOICE-PALISADES-2016-12-08",
    "campaignEntryId": "TALKS-NOT-RAIDS-02",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://www.villagevoice.com/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
    "contentSha256": "faf59353eed57ee3c219f7e2f6b854003ea89f6f228ebaa4f08b5f1c6fb7be8e",
    "reviewedCharacterCount": 4494,
    "reviewedAt": "2026-07-14",
    "url": "https://villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down",
    "summary": "The article reports that Palisades lacked a public-assembly license, was registered as a bar rather than a music venue, and had inadequate exits. Its operators described three M.A.R.C.H. operations and repeated compliance demands that preceded the venue's permanent closure.",
    "locator": "Live Village Voice page; the body following the AdHoc interview introduction, particularly the passages detailing the licensing and exit deficiencies, the three M.A.R.C.H. operations, and repeated meetings and inspections.",
    "supportsGenerally": [
      "Palisades had a liquor license and certificate of occupancy but lacked a public-assembly license.",
      "City paperwork classified Palisades as a bar or tavern rather than a music venue.",
      "The venue lacked sufficient code-compliant exits.",
      "Founder Leeor Waisbrod said Palisades underwent three M.A.R.C.H. operations."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute a role in Palisades, its compliance efforts, or its closure to him.",
      "The body does not name NYC Artist Coalition or connect it to the venue.",
      "The article does not establish that the Cabaret Law caused the closure; it reports combined licensing, use, exit, and interdepartmental violations.",
      "The article does not establish that an advocacy coalition caused either the closure or a subsequent policy outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-VILLAGE-VOICE-CABARET-LAW",
    "campaignEntryId": "LET-NYC-DANCE-04",
    "recoveryMode": "wayback-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://web.archive.org/web/20170504184338/http://www.villagevoice.com:80/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
    "contentSha256": "7a1f7f312da4e7832587480bb790e6406c41618b2e76052f727611fd0971bcd6",
    "reviewedCharacterCount": 12000,
    "reviewedAt": "2026-07-14",
    "url": "https://villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
    "summary": "The article argues that the Cabaret Law had racist origins, imposed a difficult licensing process, and enabled arbitrary enforcement against nightlife businesses. It reports that the Dance Liberation Network was organizing a meeting and petition while prior repeal attempts had failed.",
    "locator": "Wayback archive capture dated May 4, 2017; the body from the opening Dance Liberation Network meeting and petition through the law's Harlem-era origins, licensing hurdles, enforcement discussion, and closing warehouse-safety argument.",
    "supportsGenerally": [
      "The Dance Liberation Network organized a Market Hotel meeting and supported a repeal petition with about 2,400 signatures.",
      "The law prohibited dancing by three or more people in public-admission spaces without a cabaret license.",
      "Only 118 of 25,100 licensed food-and-beverage establishments held cabaret licenses.",
      "The article traces the law's origins to efforts to control Harlem nightlife and interracial socializing."
    ],
    "doesNotEstablish": [
      "The body does not name Jamie Burkart or attribute organizing, petition work, or public statements to him.",
      "The body does not name NYC Artist Coalition or assign it a role in the reported effort.",
      "At the time of the article, the Dance Liberation Network's effort was ongoing; the body does not establish that it achieved repeal.",
      "The article does not establish that the meeting or petition caused any later legislative outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  },
  {
    "sourceId": "SRC-NYCAC-WNYC-CABARET-2017",
    "campaignEntryId": "LET-NYC-DANCE-06",
    "recoveryMode": "publisher-body",
    "reviewExtent": "recovered-body",
    "retrievalUrl": "https://wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law",
    "contentSha256": "4e930ec4094ef38263aea70d643dc35fb5fa914109ad94af2a042344cf99a6d5",
    "reviewedCharacterCount": 2231,
    "reviewedAt": "2026-07-14",
    "url": "https://wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law",
    "summary": "The WNYC program page says Lauren Evans discussed her reporting on the Cabaret Law and the effort to end it, while Council Member Rafael Espinal addressed its effects on his constituents.",
    "locator": "Live WNYC page; the short program synopsis directly beneath the April 19, 2017 Brian Lehrer Show title and duration, where Evans's and Espinal's discussion topics are identified.",
    "supportsGenerally": [
      "The Brian Lehrer Show segment aired on April 19, 2017.",
      "Lauren Evans discussed her reporting on the Cabaret Law and the effort to end it.",
      "Rafael Espinal discussed how the law affected his constituents."
    ],
    "doesNotEstablish": [
      "The synopsis does not name Jamie Burkart or attribute any role or statement to him.",
      "The synopsis does not name NYC Artist Coalition or describe coalition activity.",
      "The recovered text does not supply the guests' detailed arguments, evidence, or proposed remedies.",
      "The page does not establish that the discussion caused repeal or any other collective outcome."
    ],
    "mentionsJamie": false,
    "mentionsCoalition": false,
    "directAttributions": []
  }
];
