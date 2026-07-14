import type { KnowledgeBank } from "./schema.ts";

type SourceRecord = KnowledgeBank["sources"][number];
type EvidenceRecord = KnowledgeBank["claims"][number]["evidence"][number];

export const nycaPressCampaigns = {
  "letnycdance": {
    "name": "Let NYC Dance",
    "slug": "let-nyc-dance",
    "expected": 21,
    "indexSourceId": "SRC-NYCA-LET-NYC-DANCE-SITE",
    "indexObservationId": "OBS-NYCA-PRESS-INDEX-LET-NYC-DANCE",
    "url": "https://letnycdance.nycartc.com/",
    "archiveUrl": "https://web.archive.org/web/20260511055541/https://letnycdance.nycartc.com/",
    "topic": "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
  },
  "talksnotraids": {
    "name": "Talks Not Raids",
    "slug": "talks-not-raids",
    "expected": 7,
    "indexSourceId": "SRC-NYCA-TALKS-NOT-RAIDS",
    "indexObservationId": "OBS-NYCA-PRESS-INDEX-TALKS-NOT-RAIDS",
    "url": "https://talksnotraids.com/",
    "archiveUrl": "https://web.archive.org/web/20260416022227/https://talksnotraids.com/",
    "topic": "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency"
  },
  "savenycspaces": {
    "name": "Save NYC Spaces",
    "slug": "save-nyc-spaces",
    "expected": 8,
    "indexSourceId": "SRC-NYCA-SAVE-NYC-SPACES-SITE",
    "indexObservationId": "OBS-NYCA-PRESS-INDEX-SAVE-NYC-SPACES",
    "url": "https://savenycspaces.nycartc.com/",
    "archiveUrl": "https://web.archive.org/web/20260521133438/https://savenycspaces.nycartc.com/",
    "topic": "creation of the Office of Nightlife and community priorities for cultural spaces"
  },
  "fairrentnyc": {
    "name": "FairRentNYC",
    "slug": "fair-rent-nyc",
    "expected": 9,
    "indexSourceId": "SRC-NYCA-FAIR-RENT-ARCHIVE-2021-12-01",
    "indexObservationId": "OBS-NYCA-PRESS-INDEX-FAIR-RENT-NYC",
    "url": "https://fairrentnyc.nycartc.com/",
    "archiveUrl": "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    "topic": "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
  }
} as const;

export const nycaPressArticles = [
  {
    "sourceId": "SRC-NYCA-PRESS-AMNY-2018-03-27-NIGHTLIFE-MAYOR-ARIEL-PALITZ-IN",
    "title": "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says ‘We have a lot of talking to do’",
    "organization": "amNewYork",
    "publishedAt": "2018-03-27",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
    "archiveUrl": "https://web.archive.org/web/20191003222757/https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
    "recoveryMode": "live",
    "summary": "amNewYork documented more than 100 venue operators, artists, and community members attending an NYC Artist Coalition forum with the city's first nightlife mayor.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL"
    ],
    "evidence": {
      "relationship": "corroborating",
      "supports": [
        "continued NYC Artist Coalition convening around Office of Nightlife accountability",
        "a reported crowd of more than 100"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-AMNY-2018-03-27-NIGHTLIFE-MAYOR-ARIEL-PALITZ-IN",
      "title": "Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says ‘We have a lot of talking to do’",
      "organization": "amNewYork",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2018-03-27",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
      "archiveUrl": "https://web.archive.org/web/20191003222757/https://www.amny.com/news/politics/nightlife-mayor-brooklyn-panel-1.17689726",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Nightlife mayor Ariel Palitz, in Bushwick, Brooklyn, says ‘We have a lot of talking to do’,' amNewYork, 2018-03-27.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency",
        "continued NYC Artist Coalition convening around Office of Nightlife accountability",
        "a reported crowd of more than 100"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-AMNY-2019-01-17-THE-SAD-STORY-BEHIND-NYC",
    "title": "The sad story behind NYC vacant storefronts",
    "organization": "amNewYork",
    "publishedAt": "2019-01-17",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055",
    "archiveUrl": "https://web.archive.org/web/20251117191151/https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/",
    "recoveryMode": "live",
    "summary": "amNewYork's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-AMNY-2019-01-17-THE-SAD-STORY-BEHIND-NYC",
      "title": "The sad story behind NYC vacant storefronts",
      "organization": "amNewYork",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-01-17",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055",
      "archiveUrl": "https://web.archive.org/web/20251117191151/https://www.amny.com/opinion/the-sad-story-behind-nyc-vacant-storefronts-1.26023055/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'The sad story behind NYC vacant storefronts,' amNewYork, 2019-01-17.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BEDFORD-BOWERY-2017-09-15-ANTI-DANCE-LAW-REPEAL-SUPPORTED",
    "title": "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family",
    "organization": "Bedford + Bowery",
    "publishedAt": "2017-09-15",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
    "archiveUrl": "https://web.archive.org/web/20231128123137/https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
    "recoveryMode": "live",
    "summary": "Bedford + Bowery described NYC Artist Coalition among organizations organizing for Cabaret Law repeal and credited coalition maps and town-hall imagery.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION"
    ],
    "evidence": {
      "relationship": "corroborating",
      "supports": [
        "collective organizing for Cabaret Law repeal",
        "coalition-created public maps and town-hall materials"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-BEDFORD-BOWERY-2017-09-15-ANTI-DANCE-LAW-REPEAL-SUPPORTED",
      "title": "Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family",
      "organization": "Bedford + Bowery",
      "author": "Cassidy Dawn Graves",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-15",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
      "archiveUrl": "https://web.archive.org/web/20231128123137/https://bedfordandbowery.com/2017/09/cabaret-law-repeal-supported-by-everyone-from-de-blasio-to-duke-ellingtons-family/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Cassidy Dawn Graves, 'Anti-Dance Law Repeal Supported By Everyone From de Blasio to Duke Ellington's Family,' Bedford + Bowery, 2017-09-15.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign",
        "collective organizing for Cabaret Law repeal",
        "coalition-created public maps and town-hall materials"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12",
    "title": "What Can the Night Mayor Do? The DIY Scene Discusses",
    "organization": "Bedford + Bowery",
    "publishedAt": "2017-10-12",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    "archiveUrl": "https://web.archive.org/web/20260106102010/https://bedfordandbowery.com/2017/10/what-can-the-night-mayor-do-the-diy-scene-discusses/",
    "recoveryMode": "live",
    "summary": "Bedford + Bowery's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": null
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BEDFORD-BOWERY-2019-02-12-DISCO-DISCORD-NYPD-AND-NIGHTLIFE",
    "title": "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'",
    "organization": "Bedford + Bowery",
    "publishedAt": "2019-02-12",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
    "archiveUrl": "https://web.archive.org/web/20260106060929/https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
    "recoveryMode": "live",
    "summary": "Bedford + Bowery documented MARCH data ambiguity, venue testimony, NYC Artist Coalition's earlier warnings, and Brian Abelson's coalition-linked FOIL work.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
    ],
    "evidence": {
      "relationship": "context",
      "supports": [
        "MARCH transparency concerns",
        "coalition-linked FOIL and hearing work"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-BEDFORD-BOWERY-2019-02-12-DISCO-DISCORD-NYPD-AND-NIGHTLIFE",
      "title": "Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids'",
      "organization": "Bedford + Bowery",
      "author": "Cassidy Dawn Graves",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-02-12",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
      "archiveUrl": "https://web.archive.org/web/20260106060929/https://bedfordandbowery.com/2019/02/disco-discord-nypd-and-nightlife-operators-clash-over-party-crashing-raids/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Cassidy Dawn Graves, 'Disco Discord: NYPD and Nightlife Owners Clash Over Party-Crashing 'Raids',' Bedford + Bowery, 2019-02-12.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency",
        "MARCH transparency concerns",
        "coalition-linked FOIL and hearing work"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BROOKLYN-EAGLE-2017-05-12-THERE-ARE-ONLY-17-PLACES",
    "title": "There are only 17 places in Brooklyn where you can legally dance",
    "organization": "Brooklyn Daily Eagle",
    "publishedAt": "2017-05-12",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
    "archiveUrl": "https://web.archive.org/web/20181003171649/http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
    "recoveryMode": "live",
    "summary": "Brooklyn Daily Eagle credited NYC Artist Coalition's cabaret-license map and reported more than 300 residents at the Let NYC Dance event and 3,511 petition supporters at press time.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION"
    ],
    "evidence": {
      "relationship": "corroborating",
      "supports": [
        "coalition cabaret-license map",
        "reported Let NYC Dance attendance above 300",
        "3,511 petition supporters at press time"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-BROOKLYN-EAGLE-2017-05-12-THERE-ARE-ONLY-17-PLACES",
      "title": "There are only 17 places in Brooklyn where you can legally dance",
      "organization": "Brooklyn Daily Eagle",
      "author": "Scott Enman",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-05-12",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
      "archiveUrl": "https://web.archive.org/web/20181003171649/http://www.brooklyneagle.com/articles/2017/5/12/there-are-only-17-places-brooklyn-where-you-can-legally-dance",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Scott Enman, 'There are only 17 places in Brooklyn where you can legally dance,' Brooklyn Daily Eagle, 2017-05-12.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign",
        "coalition cabaret-license map",
        "reported Let NYC Dance attendance above 300",
        "3,511 petition supporters at press time"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BROOKLYN-EAGLE-2017-09-20-A-NEW-ERA-MAYOR-DE",
    "title": "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife",
    "organization": "Brooklyn Daily Eagle",
    "publishedAt": "2017-09-20",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
    "archiveUrl": "https://web.archive.org/web/20180623155344/http://www.brooklyneagle.com:80/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
    "recoveryMode": "live",
    "summary": "Brooklyn Daily Eagle's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-BROOKLYN-EAGLE-2017-09-20-A-NEW-ERA-MAYOR-DE",
      "title": "A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife",
      "organization": "Brooklyn Daily Eagle",
      "author": "Scott Enman",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-20",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.brooklyneagle.com/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
      "archiveUrl": "https://web.archive.org/web/20180623155344/http://www.brooklyneagle.com:80/articles/2017/9/20/new-era-mayor-de-blasio-signs-bill-create-nyc-office-nightlife",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Scott Enman, 'A New Era: Mayor de Blasio signs bill to Create NYC Office of Nightlife,' Brooklyn Daily Eagle, 2017-09-20.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BROOKLYN-PAPER-2017-04-04-THINK-I-BETTER-DANCE-NOW",
    "title": "Think I better dance, now! Two Bushwick councilmen fight for your right to party!",
    "organization": "Brooklyn Paper",
    "publishedAt": "2017-04-04",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
    "archiveUrl": "https://web.archive.org/web/20171101172806/https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
    "recoveryMode": "live",
    "summary": "Brooklyn Paper's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-BROOKLYN-PAPER-2017-04-04-THINK-I-BETTER-DANCE-NOW",
      "title": "Think I better dance, now! Two Bushwick councilmen fight for your right to party!",
      "organization": "Brooklyn Paper",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-04-04",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
      "archiveUrl": "https://web.archive.org/web/20171101172806/https://www.brooklynpaper.com/stories/40/14/dtg-cabaret-law-followup-2017-04-07-bk.html",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Think I better dance, now! Two Bushwick councilmen fight for your right to party!,' Brooklyn Paper, 2017-04-04.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BROOKLYNVEGAN-2017-09-20-MAYOR-DE-BLASIO-SIGNED-NYC",
    "title": "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes",
    "organization": "BrooklynVegan",
    "publishedAt": "2017-09-20",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
    "archiveUrl": "https://web.archive.org/web/20250122015846/https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
    "recoveryMode": "live",
    "summary": "BrooklynVegan's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-BROOKLYNVEGAN-2017-09-20-MAYOR-DE-BLASIO-SIGNED-NYC",
      "title": "Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes",
      "organization": "BrooklynVegan",
      "author": "Bill Pearis",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-20",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
      "archiveUrl": "https://web.archive.org/web/20250122015846/https://www.brooklynvegan.com/mayor-de-blasio-signed-nyc-office-of-nightlife-bill-at-house-of-yes/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Bill Pearis, 'Mayor de Blasio signed NYC Office of Nightlife bill at House of Yes,' BrooklynVegan, 2017-09-20.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-CITYLAB-2017-09-15-HOW-TO-BE-A-GOOD",
    "title": "How to Be a Good 'Nightlife Mayor'",
    "organization": "CityLab",
    "publishedAt": "2017-09-15",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    "archiveUrl": "https://web.archive.org/web/20191214060044/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
    "recoveryMode": "archive",
    "summary": "CityLab's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-CITYLAB-2017-09-15-HOW-TO-BE-A-GOOD",
      "title": "How to Be a Good 'Nightlife Mayor'",
      "organization": "CityLab",
      "author": "Feargus O'Sullivan",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2017-09-15",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
      "archiveUrl": "https://web.archive.org/web/20191214060044/https://www.citylab.com/solutions/2017/09/america-discovers-the-night-mayor/539505/",
      "preferredPublicUrl": "archive",
      "publicCitation": "Feargus O'Sullivan, 'How to Be a Good 'Nightlife Mayor',' CityLab, 2017-09-15.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-CRAINS-UNDATED-CITY-COUNCIL-MOVES-TO-REPEAL",
    "title": "City Council moves to repeal 'racist' cabaret law",
    "organization": "Crain's New York Business",
    "publishedAt": null,
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    "archiveUrl": "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
    "recoveryMode": "archive",
    "summary": "Crain's New York Business's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-CRAINS-UNDATED-CITY-COUNCIL-MOVES-TO-REPEAL",
      "title": "City Council moves to repeal 'racist' cabaret law",
      "organization": "Crain's New York Business",
      "author": "Aaron Elstein",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
      "archiveUrl": "https://web.archive.org/web/20180225005113/http://www.crainsnewyork.com/article/20170619/SMALLBIZ/170619882",
      "preferredPublicUrl": "archive",
      "publicCitation": "Aaron Elstein, 'City Council moves to repeal 'racist' cabaret law,' Crain's New York Business.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-DNAINFO-UNDATED-CITY-STONEWALLS-COUNCIL-DEFENDS-RACIST",
    "title": "City Stonewalls Council, Defends 'Racist' No Dancing Law",
    "organization": "DNAinfo",
    "publishedAt": null,
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn",
    "archiveUrl": "https://web.archive.org/web/20260214132538/https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/",
    "recoveryMode": "archive",
    "summary": "DNAinfo's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-DNAINFO-UNDATED-CITY-STONEWALLS-COUNCIL-DEFENDS-RACIST",
      "title": "City Stonewalls Council, Defends 'Racist' No Dancing Law",
      "organization": "DNAinfo",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn",
      "archiveUrl": "https://web.archive.org/web/20260214132538/https://www.dnainfo.com/new-york/20170620/williamsburg/cabaret-law-dancing-footloose-brooklyn-north-brooklyn/",
      "preferredPublicUrl": "archive",
      "publicCitation": "'City Stonewalls Council, Defends 'Racist' No Dancing Law,' DNAinfo.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-FORBES-2017-10-04-NYC-REPUBLICANS-SHOULD-SUPPORT-CABARET",
    "title": "NYC Republicans Should Support Cabaret Law Repeal Effort",
    "organization": "Forbes",
    "publishedAt": "2017-10-04",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort",
    "archiveUrl": "https://web.archive.org/web/20220118055838/https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/",
    "recoveryMode": "live",
    "summary": "Forbes's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-FORBES-2017-10-04-NYC-REPUBLICANS-SHOULD-SUPPORT-CABARET",
      "title": "NYC Republicans Should Support Cabaret Law Repeal Effort",
      "organization": "Forbes",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-10-04",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort",
      "archiveUrl": "https://web.archive.org/web/20220118055838/https://www.forbes.com/sites/realspin/2017/10/04/nyc-republicans-should-support-cabaret-law-repeal-effort/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'NYC Republicans Should Support Cabaret Law Repeal Effort,' Forbes, 2017-10-04.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
    "title": "DIY Venues Demand Repeal Of Widely Reviled Cabaret Law",
    "organization": "Gothamist",
    "publishedAt": "2017-06-19",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://gothamist.com/2017/06/19/cabaret_law_nyc.php",
    "archiveUrl": "https://web.archive.org/web/20190507132352/http://gothamist.com:80/2017/06/19/cabaret_law_nyc.php",
    "recoveryMode": "live",
    "summary": "Gothamist directly documented Jamie's fire-code study groups, City Hall repeal advocacy, coalition affiliation, and small-venue safety framing.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION"
    ],
    "evidence": {
      "relationship": "direct-support",
      "supports": [
        "Jamie's fire-code study groups",
        "Jamie's City Hall repeal advocacy",
        "Jamie's small-venue safety framing"
      ],
      "confidence": "high"
    },
    "source": null
  },
  {
    "sourceId": "SRC-NYCA-PRESS-GOTHAMIST-2017-09-20-DE-BLASIO-PRAISING-PUNK-ROCK",
    "title": "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Night Mayor'",
    "organization": "Gothamist",
    "publishedAt": "2017-09-20",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://gothamist.com/2017/09/20/punk_blaz_signs_bill.php",
    "archiveUrl": "https://web.archive.org/web/20190531070143/http://gothamist.com:80/2017/09/20/punk_blaz_signs_bill.php",
    "recoveryMode": "live",
    "summary": "Gothamist's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-GOTHAMIST-2017-09-20-DE-BLASIO-PRAISING-PUNK-ROCK",
      "title": "De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Night Mayor'",
      "organization": "Gothamist",
      "author": "Jake Offenhartz",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-20",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://gothamist.com/2017/09/20/punk_blaz_signs_bill.php",
      "archiveUrl": "https://web.archive.org/web/20190531070143/http://gothamist.com:80/2017/09/20/punk_blaz_signs_bill.php",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Jake Offenhartz, 'De Blasio, Praising Punk Rock, Signs Bill Establishing NYC 'Night Mayor',' Gothamist, 2017-09-20.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-GOTHAMIST-2019-02-12-LAWMAKERS-DEMAND-TRANSPARENCY-ON-SURPRISE",
    "title": "Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs",
    "organization": "Gothamist",
    "publishedAt": "2019-02-12",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php",
    "archiveUrl": "https://web.archive.org/web/20190531184302/http://gothamist.com:80/2019/02/12/march_nightlife_raids_city_council.php",
    "recoveryMode": "live",
    "summary": "Gothamist documented lawmakers' transparency demands, venue testimony about MARCH impacts, and NYC Artist Coalition's public claims about disproportionate targeting.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-TALKS-NOT-RAIDS-LONG-ARC"
    ],
    "evidence": {
      "relationship": "context",
      "supports": [
        "public demands for MARCH transparency",
        "reported coalition advocacy around MARCH impacts"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-GOTHAMIST-2019-02-12-LAWMAKERS-DEMAND-TRANSPARENCY-ON-SURPRISE",
      "title": "Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs",
      "organization": "Gothamist",
      "author": "Caroline Lewis",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-02-12",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://gothamist.com/2019/02/12/march_nightlife_raids_city_council.php",
      "archiveUrl": "https://web.archive.org/web/20190531184302/http://gothamist.com:80/2019/02/12/march_nightlife_raids_city_council.php",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Caroline Lewis, 'Lawmakers Demand Transparency On Surprise, Multi-Agency Raids On Local Bars And Clubs,' Gothamist, 2019-02-12.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency",
        "public demands for MARCH transparency",
        "reported coalition advocacy around MARCH impacts"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-GOTHAMIST-2020-01-13-NEIR-S-TAVERN-AVOIDS-CLOSURE",
    "title": "Neir’s Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms",
    "organization": "Gothamist",
    "publishedAt": "2020-01-13",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    "archiveUrl": "https://web.archive.org/web/20210918142340/https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
    "recoveryMode": "live",
    "summary": "Gothamist identified Olympia Kazi with NYC Artist Coalition and documented coalition participation in commercial-rent-stabilization advocacy.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT"
    ],
    "evidence": {
      "relationship": "direct-support",
      "supports": [
        "NYC Artist Coalition participation in commercial-rent-stabilization advocacy"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-GOTHAMIST-2020-01-13-NEIR-S-TAVERN-AVOIDS-CLOSURE",
      "title": "Neir’s Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms",
      "organization": "Gothamist",
      "author": "Luca Powell",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2020-01-13",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
      "archiveUrl": "https://web.archive.org/web/20210918142340/https://gothamist.com/food/neirs-tavern-saved-rally-commercial-rent-regulations",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Luca Powell, 'Neir’s Tavern Avoids Closure But Activists Say The Larger Issue Of Skyrocketing Rents Still Looms,' Gothamist, 2020-01-13.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy",
        "NYC Artist Coalition participation in commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-METRO-2017-05-31-ARTS-ADVOCATES-RENEW-CALL-TO",
    "title": "Arts advocates renew call to end New York City’s antiquated cabaret laws",
    "organization": "Metro New York",
    "publishedAt": "2017-05-31",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    "archiveUrl": "https://web.archive.org/web/20170817001608/http://www.metro.us:80/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
    "recoveryMode": "archive",
    "summary": "Metro New York's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-METRO-2017-05-31-ARTS-ADVOCATES-RENEW-CALL-TO",
      "title": "Arts advocates renew call to end New York City’s antiquated cabaret laws",
      "organization": "Metro New York",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2017-05-31",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.metro.us/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
      "archiveUrl": "https://web.archive.org/web/20170817001608/http://www.metro.us:80/news/local-news/new-york/arts-advocates-renew-call-end-new-york-citys-antiquated-cabaret-laws",
      "preferredPublicUrl": "archive",
      "publicCitation": "'Arts advocates renew call to end New York City’s antiquated cabaret laws,' Metro New York, 2017-05-31.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-MIXMAG-2017-03-27-NYC-ACTIVISTS-AIM-TO-REPEAL",
    "title": "NYC activists aim to repeal local “no dancing law”",
    "organization": "Mixmag",
    "publishedAt": "2017-03-27",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    "archiveUrl": "https://web.archive.org/web/20250117114813/https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
    "recoveryMode": "live",
    "summary": "Mixmag documented the Dance Liberation Network and NYC Artist Coalition petition and the March 2017 Let NYC Dance town hall.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION"
    ],
    "evidence": {
      "relationship": "corroborating",
      "supports": [
        "joint petition for Cabaret Law repeal",
        "March 2017 Let NYC Dance town hall"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-MIXMAG-2017-03-27-NYC-ACTIVISTS-AIM-TO-REPEAL",
      "title": "NYC activists aim to repeal local “no dancing law”",
      "organization": "Mixmag",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-03-27",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
      "archiveUrl": "https://web.archive.org/web/20250117114813/https://mixmag.net/read/nyc-activists-aim-to-repeal-local-no-dancing-law-news",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'NYC activists aim to repeal local “no dancing law”,' Mixmag, 2017-03-27.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign",
        "joint petition for Cabaret Law repeal",
        "March 2017 Let NYC Dance town hall"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NEW-YORKER-2017-07-03-DANCE-OUTLAWS-FIGHT-FOR-THE",
    "title": "Dance Outlaws Fight for the Right to Party",
    "organization": "The New Yorker",
    "publishedAt": "2017-07-03",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    "archiveUrl": "https://web.archive.org/web/20260308101201/https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
    "recoveryMode": "live",
    "summary": "The New Yorker's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-NEW-YORKER-2017-07-03-DANCE-OUTLAWS-FIGHT-FOR-THE",
      "title": "Dance Outlaws Fight for the Right to Party",
      "organization": "The New Yorker",
      "author": "Emily Witt",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-07-03",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
      "archiveUrl": "https://web.archive.org/web/20260308101201/https://www.newyorker.com/magazine/2017/07/10/dance-outlaws-fight-for-the-right-to-party",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Emily Witt, 'Dance Outlaws Fight for the Right to Party,' The New Yorker, 2017-07-03.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-NPR-CABARET-2017-09-20",
    "title": "With Its 'No Dancing' Law Verging On Repeal, New York Legitimizes Its Nightlife",
    "organization": "NPR",
    "publishedAt": "2017-09-20",
    "campaigns": [
      "letnycdance",
      "savenycspaces"
    ],
    "canonicalUrl": "https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    "archiveUrl": "https://web.archive.org/web/20251028172606/https://www.npr.org/sections/therecord/2017/09/20/552292586/with-its-no-dancing-law-verging-on-repeal-new-york-legitimizes-its-nightlife",
    "recoveryMode": "archive",
    "summary": "NPR documented NYC Artist Coalition among the groups mobilizing under the Let NYC Dance banner and separately identified Jamie as a founding member.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
      "CLM-NYCA-COFOUNDER-ROLE"
    ],
    "evidence": {
      "relationship": "corroborating",
      "supports": [
        "Let NYC Dance coalition mobilization",
        "Jamie's founding-member attribution"
      ],
      "confidence": "high"
    },
    "source": null
  },
  {
    "sourceId": "SRC-NYCA-PRESS-CURBED-2019-11-08-COULD-COMMERCIAL-RENT-STABILIZATION-SOLVE",
    "title": "Could commercial rent stabilization solve NYC’s retail vacancy woes?",
    "organization": "Curbed",
    "publishedAt": "2019-11-08",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    "archiveUrl": "https://web.archive.org/web/20251216101013/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
    "recoveryMode": "archive",
    "summary": "Curbed identified Olympia Kazi with NYC Artist Coalition while reporting on the coalition's cultural-space argument for commercial rent stabilization.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT"
    ],
    "evidence": {
      "relationship": "direct-support",
      "supports": [
        "NYC Artist Coalition participation in commercial-rent-stabilization advocacy"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-CURBED-2019-11-08-COULD-COMMERCIAL-RENT-STABILIZATION-SOLVE",
      "title": "Could commercial rent stabilization solve NYC’s retail vacancy woes?",
      "organization": "Curbed",
      "author": "Caroline Spivack",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2019-11-08",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
      "archiveUrl": "https://web.archive.org/web/20251216101013/https://ny.curbed.com/2019/11/8/20953724/commercial-rent-stabilization-bill-nyc-retail-vacancy",
      "preferredPublicUrl": "archive",
      "publicCitation": "Caroline Spivack, 'Could commercial rent stabilization solve NYC’s retail vacancy woes?,' Curbed, 2019-11-08.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy",
        "NYC Artist Coalition participation in commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-DAILY-NEWS-2017-06-19-FOOTLOOSE-NEW-YORKERS-GO-AFTER",
    "title": "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars",
    "organization": "New York Daily News",
    "publishedAt": "2017-06-19",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
    "archiveUrl": "https://web.archive.org/web/20220521201023/https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
    "recoveryMode": "live",
    "summary": "New York Daily News's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-DAILY-NEWS-2017-06-19-FOOTLOOSE-NEW-YORKERS-GO-AFTER",
      "title": "Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars",
      "organization": "New York Daily News",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-06-19",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
      "archiveUrl": "https://web.archive.org/web/20220521201023/https://www.nydailynews.com/new-york/footloose-new-yorkers-archaic-ban-dancing-article-1.3260553",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Footloose New Yorkers go after archaic cabaret law banning dancing in most city bars,' New York Daily News, 2017-06-19.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-DAILY-NEWS-2019-11-14-POLS-SMALL-BIZ-OWNERS-RALLY",
    "title": "Pols, small-biz owners rally for law limiting rent hikes on NYC’s beleaguered mom-and-pop shops",
    "organization": "New York Daily News",
    "publishedAt": "2019-11-14",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
    "archiveUrl": "https://web.archive.org/web/20221129191818/https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
    "recoveryMode": "live",
    "summary": "New York Daily News identified Olympia Kazi with NYC Artist Coalition at a rally for commercial-rent regulation.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT"
    ],
    "evidence": {
      "relationship": "direct-support",
      "supports": [
        "NYC Artist Coalition participation in a commercial-rent-regulation rally"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-DAILY-NEWS-2019-11-14-POLS-SMALL-BIZ-OWNERS-RALLY",
      "title": "Pols, small-biz owners rally for law limiting rent hikes on NYC’s beleaguered mom-and-pop shops",
      "organization": "New York Daily News",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-11-14",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
      "archiveUrl": "https://web.archive.org/web/20221129191818/https://www.nydailynews.com/news/politics/ny-commercial-rent-regulation-steve-levin-20191114-eh3aigksp5edlf4itwdkfur74y-story.html",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Pols, small-biz owners rally for law limiting rent hikes on NYC’s beleaguered mom-and-pop shops,' New York Daily News, 2019-11-14.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy",
        "NYC Artist Coalition participation in a commercial-rent-regulation rally"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-DAILY-NEWS-2017-09-19-MAYOR-DE-BLASIO-OKS-CREATION",
    "title": "Mayor de Blasio OKs creation of office to manage issues affecting city’s nightlife",
    "organization": "New York Daily News",
    "publishedAt": "2017-09-19",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
    "archiveUrl": "https://web.archive.org/web/20230604001849/https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
    "recoveryMode": "live",
    "summary": "New York Daily News's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-DAILY-NEWS-2017-09-19-MAYOR-DE-BLASIO-OKS-CREATION",
      "title": "Mayor de Blasio OKs creation of office to manage issues affecting city’s nightlife",
      "organization": "New York Daily News",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-19",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
      "archiveUrl": "https://web.archive.org/web/20230604001849/https://www.nydailynews.com/news/politics/nyc-creates-office-manage-issues-affecting-nightlife-industry-article-1.3507451",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Mayor de Blasio OKs creation of office to manage issues affecting city’s nightlife,' New York Daily News, 2017-09-19.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NY-POST-2017-09-14-DE-BLASIO-MIGHT-SCRAP-RIDICULOUS",
    "title": "De Blasio might scrap ridiculous law banning dancing in bars",
    "organization": "New York Post",
    "publishedAt": "2017-09-14",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
    "archiveUrl": "https://web.archive.org/web/20250822075355/https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
    "recoveryMode": "live",
    "summary": "New York Post's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-NY-POST-2017-09-14-DE-BLASIO-MIGHT-SCRAP-RIDICULOUS",
      "title": "De Blasio might scrap ridiculous law banning dancing in bars",
      "organization": "New York Post",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-14",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
      "archiveUrl": "https://web.archive.org/web/20250822075355/https://nypost.com/2017/09/14/de-blasio-might-scrap-ridiculous-law-banning-dancing-in-bars/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'De Blasio might scrap ridiculous law banning dancing in bars,' New York Post, 2017-09-14.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NY-POST-2017-09-20-DE-BLASIO-S-NEWEST-CITY",
    "title": "De Blasio’s newest city agency: Office of Nightlife",
    "organization": "New York Post",
    "publishedAt": "2017-09-20",
    "campaigns": [
      "savenycspaces"
    ],
    "canonicalUrl": "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
    "archiveUrl": "https://web.archive.org/web/20260624234956/https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
    "recoveryMode": "live",
    "summary": "New York Post's article documents creation of the Office of Nightlife and community priorities for cultural spaces; it was curated in the Save NYC Spaces press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-NY-POST-2017-09-20-DE-BLASIO-S-NEWEST-CITY",
      "title": "De Blasio’s newest city agency: Office of Nightlife",
      "organization": "New York Post",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-20",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
      "archiveUrl": "https://web.archive.org/web/20260624234956/https://nypost.com/2017/09/19/de-blasios-newest-city-agency-office-of-nightlife/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'De Blasio’s newest city agency: Office of Nightlife,' New York Post, 2017-09-20.",
      "publicNote": "Recovered through the Save NYC Spaces press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "creation of the Office of Nightlife and community priorities for cultural spaces"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NYT-2002-11-10-CITY-CRACKS-DOWN-ON-NIGHTCLUBS",
    "title": "City Cracks Down on Nightclubs and May Revise Its Policies",
    "organization": "The New York Times",
    "publishedAt": "2002-11-10",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    "archiveUrl": "https://web.archive.org/web/20251104235429/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
    "recoveryMode": "archive",
    "summary": "The New York Times's article documents MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency; it was curated in the Talks Not Raids press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-NYT-2002-11-10-CITY-CRACKS-DOWN-ON-NIGHTCLUBS",
      "title": "City Cracks Down on Nightclubs and May Revise Its Policies",
      "organization": "The New York Times",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2002-11-10",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
      "archiveUrl": "https://web.archive.org/web/20251104235429/https://www.nytimes.com/2002/11/10/nyregion/city-cracks-down-on-nightclubs-and-may-revise-its-policies.html",
      "preferredPublicUrl": "archive",
      "publicCitation": "'City Cracks Down on Nightclubs and May Revise Its Policies,' The New York Times, 2002-11-10.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NYT-2017-10-30-AFTER-91-YEARS-NEW-YORK",
    "title": "After 91 Years, New York Will Let Its People Boogie",
    "organization": "The New York Times",
    "publishedAt": "2017-10-30",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    "archiveUrl": "https://web.archive.org/web/20251225083004/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
    "recoveryMode": "archive",
    "summary": "The New York Times documented NYC Artist Coalition members participating in a Let NYC Dance public mobilization immediately before the repeal vote.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION"
    ],
    "evidence": {
      "relationship": "context",
      "supports": [
        "coalition participation in final-vote public mobilization"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-NYT-2017-10-30-AFTER-91-YEARS-NEW-YORK",
      "title": "After 91 Years, New York Will Let Its People Boogie",
      "organization": "The New York Times",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2017-10-30",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
      "archiveUrl": "https://web.archive.org/web/20251225083004/https://www.nytimes.com/2017/10/30/nyregion/new-york-cabaret-law-repeal.html",
      "preferredPublicUrl": "archive",
      "publicCitation": "'After 91 Years, New York Will Let Its People Boogie,' The New York Times, 2017-10-30.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign",
        "coalition participation in final-vote public mobilization"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-NYT-2018-09-07-THE-EMPTY-STOREFRONTS-OF-NEW",
    "title": "The Empty Storefronts of New York: A Panoramic View",
    "organization": "The New York Times",
    "publishedAt": "2018-09-07",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    "archiveUrl": "https://web.archive.org/web/20260605193311/https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
    "recoveryMode": "archive",
    "summary": "The New York Times's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-NYT-2018-09-07-THE-EMPTY-STOREFRONTS-OF-NEW",
      "title": "The Empty Storefronts of New York: A Panoramic View",
      "organization": "The New York Times",
      "author": "Corey Kilgannon",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2018-09-07",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
      "archiveUrl": "https://web.archive.org/web/20260605193311/https://www.nytimes.com/interactive/2018/09/06/nyregion/nyc-storefront-vacancy.html",
      "preferredPublicUrl": "archive",
      "publicCitation": "Corey Kilgannon, 'The Empty Storefronts of New York: A Panoramic View,' The New York Times, 2018-09-07.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-OBSERVER-2018-03-27-HERE-S-WHAT-NEW-YORKERS",
    "title": "Here’s What New Yorkers Want the New Nightlife Mayor to Focus On",
    "organization": "Observer",
    "publishedAt": "2018-03-27",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://observer.com/2018/03/new-york-city-night-mayor/",
    "archiveUrl": "https://web.archive.org/web/20251011032549/https://observer.com/2018/03/new-york-city-night-mayor/",
    "recoveryMode": "live",
    "summary": "Observer's article documents MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency; it was curated in the Talks Not Raids press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-OBSERVER-2018-03-27-HERE-S-WHAT-NEW-YORKERS",
      "title": "Here’s What New Yorkers Want the New Nightlife Mayor to Focus On",
      "organization": "Observer",
      "author": "Madina Toure",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2018-03-27",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://observer.com/2018/03/new-york-city-night-mayor/",
      "archiveUrl": "https://web.archive.org/web/20251011032549/https://observer.com/2018/03/new-york-city-night-mayor/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Madina Toure, 'Here’s What New Yorkers Want the New Nightlife Mayor to Focus On,' Observer, 2018-03-27.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-QUEENS-CHRONICLE-UNDATED-AGED-CABARET-LAW-FINALLY-AT",
    "title": "Aged Cabaret Law finally at its end?",
    "organization": "Queens Chronicle",
    "publishedAt": null,
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    "archiveUrl": "https://web.archive.org/web/20200118090912/https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
    "recoveryMode": "live",
    "summary": "Queens Chronicle's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-QUEENS-CHRONICLE-UNDATED-AGED-CABARET-LAW-FINALLY-AT",
      "title": "Aged Cabaret Law finally at its end?",
      "organization": "Queens Chronicle",
      "author": "Isabella Bruni, Chronicle Contributor",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
      "archiveUrl": "https://web.archive.org/web/20200118090912/https://www.qchron.com/editions/queenswide/aged-cabaret-law-finally-at-its-end/article_368ea4d3-28ba-5a18-bb25-58f4c50a290f.html",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Isabella Bruni, Chronicle Contributor, 'Aged Cabaret Law finally at its end?,' Queens Chronicle.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-QNS-2019-12-18-SUNNYSIDE-COUNCILMAN-SMALL-BUSINESS-OWNERS",
    "title": "Sunnyside councilman, small business owners rally for commercial rent control – QNS",
    "organization": "QNS",
    "publishedAt": "2019-12-18",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
    "archiveUrl": "https://web.archive.org/web/20200809200156/https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
    "recoveryMode": "live",
    "summary": "QNS's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-QNS-2019-12-18-SUNNYSIDE-COUNCILMAN-SMALL-BUSINESS-OWNERS",
      "title": "Sunnyside councilman, small business owners rally for commercial rent control – QNS",
      "organization": "QNS",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-12-18",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
      "archiveUrl": "https://web.archive.org/web/20200809200156/https://qns.com/story/2019/12/18/sunnyside-councilman-small-business-owners-rally-for-commercial-rent-control/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Sunnyside councilman, small business owners rally for commercial rent control – QNS,' QNS, 2019-12-18.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-SFGATE-UNDATED-NEW-YORK-CITY-APPARENTLY-HAS",
    "title": "New York City Apparently Has a 'No Dancing' Law",
    "organization": "SFGATE",
    "publishedAt": null,
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    "archiveUrl": "https://web.archive.org/web/20220809111234/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
    "recoveryMode": "archive",
    "summary": "SFGATE's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-SFGATE-UNDATED-NEW-YORK-CITY-APPARENTLY-HAS",
      "title": "New York City Apparently Has a 'No Dancing' Law",
      "organization": "SFGATE",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
      "archiveUrl": "https://web.archive.org/web/20220809111234/https://www.sfgate.com/news/media/New-York-City-apparently-has-a-No-Dancing-law-800714.php",
      "preferredPublicUrl": "archive",
      "publicCitation": "'New York City Apparently Has a 'No Dancing' Law,' SFGATE.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-SMITHSONIAN-2017-09-21-NEW-YORK-CITY-COULD-FINALLY",
    "title": "New York City Could Finally Lose Its Prohibition-era Dancing Rule",
    "organization": "Smithsonian Magazine",
    "publishedAt": "2017-09-21",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
    "archiveUrl": "https://web.archive.org/web/20250911061547/https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
    "recoveryMode": "live",
    "summary": "Smithsonian Magazine's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-SMITHSONIAN-2017-09-21-NEW-YORK-CITY-COULD-FINALLY",
      "title": "New York City Could Finally Lose Its Prohibition-era Dancing Rule",
      "organization": "Smithsonian Magazine",
      "author": "Maris Fessenden",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-09-21",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
      "archiveUrl": "https://web.archive.org/web/20250911061547/https://www.smithsonianmag.com/smart-news/new-york-city-could-finally-lose-its-prohibition-era-dancing-rule-180964998/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Maris Fessenden, 'New York City Could Finally Lose Its Prohibition-era Dancing Rule,' Smithsonian Magazine, 2017-09-21.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-SUNNYSIDE-POST-2019-12-18-VAN-BRAMER-CALLS-FOR-COMMERCIAL",
    "title": "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes – QNS",
    "organization": "Sunnyside Post",
    "publishedAt": "2019-12-18",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
    "archiveUrl": "https://web.archive.org/web/20250623151452/https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
    "recoveryMode": "live",
    "summary": "Sunnyside Post's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-SUNNYSIDE-POST-2019-12-18-VAN-BRAMER-CALLS-FOR-COMMERCIAL",
      "title": "Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes – QNS",
      "organization": "Sunnyside Post",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-12-18",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
      "archiveUrl": "https://web.archive.org/web/20250623151452/https://sunnysidepost.com/van-bramer-calls-for-commercial-rent-control-bill-aims-to-protect-small-businesses-from-rent-hikes",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Van Bramer Calls for Commercial Rent Control Bill, Aims to Protect Small Businesses From Rent Hikes – QNS,' Sunnyside Post, 2019-12-18.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-ATLANTIC-2018-10-15-WHAT-S-THE-MATTER-WITH",
    "title": "What's the Matter With Manhattan?",
    "organization": "The Atlantic",
    "publishedAt": "2018-10-15",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
    "archiveUrl": "https://web.archive.org/web/20260505011341/https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
    "recoveryMode": "live",
    "summary": "The Atlantic's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-ATLANTIC-2018-10-15-WHAT-S-THE-MATTER-WITH",
      "title": "What's the Matter With Manhattan?",
      "organization": "The Atlantic",
      "author": "Derek Thompson",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2018-10-15",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
      "archiveUrl": "https://web.archive.org/web/20260505011341/https://www.theatlantic.com/ideas/archive/2018/10/new-york-retail-vacancy/572911/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Derek Thompson, 'What's the Matter With Manhattan?,' The Atlantic, 2018-10-15.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-BAFFLER-2018-02-12-CUT-THE-MUSIC-LIZ-PELLY",
    "title": "Cut the Music | Liz Pelly",
    "organization": "The Baffler",
    "publishedAt": "2018-02-12",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://thebaffler.com/latest/cut-the-music-pelly",
    "archiveUrl": "https://web.archive.org/web/20260508080121/https://thebaffler.com/latest/cut-the-music-pelly",
    "recoveryMode": "live",
    "summary": "The Baffler's article documents MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency; it was curated in the Talks Not Raids press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-BAFFLER-2018-02-12-CUT-THE-MUSIC-LIZ-PELLY",
      "title": "Cut the Music | Liz Pelly",
      "organization": "The Baffler",
      "author": "Liz Pelly",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2018-02-12",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://thebaffler.com/latest/cut-the-music-pelly",
      "archiveUrl": "https://web.archive.org/web/20260508080121/https://thebaffler.com/latest/cut-the-music-pelly",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Liz Pelly, 'Cut the Music | Liz Pelly,' The Baffler, 2018-02-12.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-JEWISH-VOICE-2019-11-11-BKLYN-COUNCILMAN-AIMS-TO-SAVE",
    "title": "Bklyn Councilman Aims to Save “Mom & Pop” Retail Outlets - THE JEWISH VOICE",
    "organization": "The Jewish Voice",
    "publishedAt": "2019-11-11",
    "campaigns": [
      "fairrentnyc"
    ],
    "canonicalUrl": "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    "archiveUrl": "https://web.archive.org/web/20191214161746/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
    "recoveryMode": "live",
    "summary": "The Jewish Voice's article documents storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy; it was curated in the FairRentNYC press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-JEWISH-VOICE-2019-11-11-BKLYN-COUNCILMAN-AIMS-TO-SAVE",
      "title": "Bklyn Councilman Aims to Save “Mom & Pop” Retail Outlets - THE JEWISH VOICE",
      "organization": "The Jewish Voice",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2019-11-11",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
      "archiveUrl": "https://web.archive.org/web/20191214161746/http://thejewishvoice.com/2019/11/11/bklyn-councilman-aims-to-save-mom-pop-retail-outlets/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'Bklyn Councilman Aims to Save “Mom & Pop” Retail Outlets - THE JEWISH VOICE,' The Jewish Voice, 2019-11-11.",
      "publicNote": "Recovered through the FairRentNYC press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "storefront vacancy, commercial lease costs, and commercial-rent-stabilization advocacy"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-VICE-THUMP-2017-03-21-A-COALITION-OF-ADVOCACY-GROUPS",
    "title": "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety | Thump",
    "organization": "THUMP / Vice",
    "publishedAt": "2017-03-21",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    "archiveUrl": "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
    "recoveryMode": "archive",
    "summary": "THUMP documented NYC Artist Coalition's January 2017 formation, commissioner meeting, DIY-space safety agenda, and Cabaret Law advocacy.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CABARET-LAW-CONTRIBUTION",
      "CLM-NYCA-COFOUNDER-ROLE"
    ],
    "evidence": {
      "relationship": "context",
      "supports": [
        "January 2017 coalition formation chronology",
        "commissioner meeting and DIY-space policy agenda"
      ],
      "confidence": "high"
    },
    "source": {
      "id": "SRC-NYCA-PRESS-VICE-THUMP-2017-03-21-A-COALITION-OF-ADVOCACY-GROUPS",
      "title": "A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety | Thump",
      "organization": "THUMP / Vice",
      "author": "Alexander Iadarola",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2017-03-21",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
      "archiveUrl": "https://web.archive.org/web/20170322022601/https://thump.vice.com/en_us/article/nyc-artist-coalition-dance-liberation-network-diy-spaces",
      "preferredPublicUrl": "archive",
      "publicCitation": "Alexander Iadarola, 'A Coalition of Advocacy Groups Are Meeting New York's Cultural Commissioner to Talk About DIY Venue Safety | Thump,' THUMP / Vice, 2017-03-21.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign",
        "January 2017 coalition formation chronology",
        "commissioner meeting and DIY-space policy agenda"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-TIMEOUT-2017-08-15-IT-S-TIME-TO-MAKE",
    "title": "It’s time to make it legal to dance anywhere the f*ck you want in New York",
    "organization": "Time Out New York",
    "publishedAt": "2017-08-15",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    "archiveUrl": "https://web.archive.org/web/20240915134511/https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
    "recoveryMode": "live",
    "summary": "Time Out New York's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-TIMEOUT-2017-08-15-IT-S-TIME-TO-MAKE",
      "title": "It’s time to make it legal to dance anywhere the f*ck you want in New York",
      "organization": "Time Out New York",
      "author": "Liz Pelly",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-08-15",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
      "archiveUrl": "https://web.archive.org/web/20240915134511/https://www.timeout.com/newyork/blog/its-time-to-make-it-legal-to-dance-anywhere-the-f-ck-you-want-in-new-york-081517",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Liz Pelly, 'It’s time to make it legal to dance anywhere the f*ck you want in New York,' Time Out New York, 2017-08-15.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-VILLAGE-VOICE-2016-12-08-PALISADES-OWNERS-EXPLAIN-WHY-THE",
    "title": "Palisades Owners Explain Why the Beloved Venue Was Shut Down - The Village Voice",
    "organization": "The Village Voice",
    "publishedAt": "2016-12-08",
    "campaigns": [
      "talksnotraids"
    ],
    "canonicalUrl": "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
    "archiveUrl": "https://web.archive.org/web/20230129184606/https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
    "recoveryMode": "live",
    "summary": "The Village Voice's article documents MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency; it was curated in the Talks Not Raids press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-VILLAGE-VOICE-2016-12-08-PALISADES-OWNERS-EXPLAIN-WHY-THE",
      "title": "Palisades Owners Explain Why the Beloved Venue Was Shut Down - The Village Voice",
      "organization": "The Village Voice",
      "author": "Matthew Ismael Ruiz",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2016-12-08",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
      "archiveUrl": "https://web.archive.org/web/20230129184606/https://www.villagevoice.com/2016/12/08/palisades-owners-explain-why-the-beloved-venue-was-shut-down/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "Matthew Ismael Ruiz, 'Palisades Owners Explain Why the Beloved Venue Was Shut Down - The Village Voice,' The Village Voice, 2016-12-08.",
      "publicNote": "Recovered through the Talks Not Raids press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "MARCH enforcement, nightlife regulation, venue impacts, and demands for transparency"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-VILLAGE-VOICE-2017-03-30-NYC-S-RACIST-DRACONIAN-CABARET",
    "title": "NYC's Racist, Draconian Cabaret Law Must Be Eliminated",
    "organization": "The Village Voice",
    "publishedAt": "2017-03-30",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
    "archiveUrl": "https://web.archive.org/web/20170504184338/http://www.villagevoice.com:80/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
    "recoveryMode": "archive",
    "summary": "The Village Voice's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-VILLAGE-VOICE-2017-03-30-NYC-S-RACIST-DRACONIAN-CABARET",
      "title": "NYC's Racist, Draconian Cabaret Law Must Be Eliminated",
      "organization": "The Village Voice",
      "author": "Lauren Evans",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "archived",
      "publishedAt": "2017-03-30",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.villagevoice.com/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
      "archiveUrl": "https://web.archive.org/web/20170504184338/http://www.villagevoice.com:80/news/nycs-cabaret-law-is-racist-stupid-and-must-be-eliminated-9834234",
      "preferredPublicUrl": "archive",
      "publicCitation": "Lauren Evans, 'NYC's Racist, Draconian Cabaret Law Must Be Eliminated,' The Village Voice, 2017-03-30.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the archive page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  },
  {
    "sourceId": "SRC-NYCA-PRESS-WNYC-2017-06-19-THE-BUREAUCRATIC-DANCE-TO-END",
    "title": "The Bureaucratic Dance to End NYC Cabaret Law",
    "organization": "WNYC",
    "publishedAt": "2017-06-19",
    "campaigns": [
      "letnycdance"
    ],
    "canonicalUrl": "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law",
    "archiveUrl": "https://web.archive.org/web/20251111164642/https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/",
    "recoveryMode": "live",
    "summary": "WNYC's article documents Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign; it was curated in the Let NYC Dance press section.",
    "claimIds": [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS"
    ],
    "evidence": null,
    "source": {
      "id": "SRC-NYCA-PRESS-WNYC-2017-06-19-THE-BUREAUCRATIC-DANCE-TO-END",
      "title": "The Bureaucratic Dance to End NYC Cabaret Law",
      "organization": "WNYC",
      "kind": "published-article",
      "visibility": "public",
      "preservationStatus": "live-and-archived",
      "publishedAt": "2017-06-19",
      "accessedAt": "2026-07-13",
      "canonicalUrl": "https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law",
      "archiveUrl": "https://web.archive.org/web/20251111164642/https://www.wnyc.org/story/bureaucratic-dance-end-nyc-cabaret-law/",
      "preferredPublicUrl": "canonical",
      "publicCitation": "'The Bureaucratic Dance to End NYC Cabaret Law,' WNYC, 2017-06-19.",
      "publicNote": "Recovered through the Let NYC Dance press index; article body reviewed from the live page. Metadata and paraphrased findings only are retained.",
      "supportsGenerally": [
        "Cabaret Law history, enforcement, repeal advocacy, and the Let NYC Dance campaign"
      ],
      "doesNotEstablish": [
        "Jamie's authorship of the article",
        "Jamie's individual contribution unless the article directly attributes it",
        "sole NYC Artist Coalition causality for the reported outcome",
        "that campaign-index inclusion means agreement with every statement in the article"
      ]
    }
  }
] as const;

const newIndexSources: SourceRecord[] = [
  {
    id: "SRC-NYCA-LET-NYC-DANCE-SITE",
    title: "Let NYC Dance campaign and press index",
    organization: "NYC Artist Coalition and Dance Liberation Network",
    kind: "institutional-web-page",
    visibility: "public",
    preservationStatus: "live-and-archived",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://letnycdance.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20260511055541/https://letnycdance.nycartc.com/",
    preferredPublicUrl: "canonical",
    publicCitation: "Let NYC Dance campaign site and press index, accessed July 13, 2026.",
    publicNote: "Public campaign surface built by Jamie; the site itself verifies a press section containing 21 distinct article links.",
    supportsGenerally: ["Let NYC Dance public campaign infrastructure", "a curated press index of 21 articles"],
    doesNotEstablish: ["Jamie's authorship by itself", "sole campaign leadership", "agreement with every linked article", "sole causality for Cabaret Law repeal"]
  },
  {
    id: "SRC-NYCA-FAIR-RENT-ARCHIVE-2021-12-01",
    title: "FairRentNYC archived campaign and press index",
    organization: "NYC Artist Coalition",
    kind: "archived-web-capture",
    visibility: "public",
    preservationStatus: "archived",
    capturedAt: "2021-12-01T10:44:25Z",
    accessedAt: "2026-07-13",
    canonicalUrl: "https://fairrentnyc.nycartc.com/",
    archiveUrl: "https://web.archive.org/web/20211201104425/https://fairrentnyc.nycartc.com/",
    preferredPublicUrl: "archive",
    publicCitation: "Archived FairRentNYC campaign site and press index, Wayback capture, December 1, 2021.",
    publicNote: "The supplied capture verifies the historical press section and nine article links; the live site has since changed.",
    supportsGenerally: ["FairRentNYC public campaign infrastructure", "a curated historical press index of nine articles"],
    doesNotEstablish: ["Jamie's authorship by itself", "sole campaign leadership", "agreement with every linked article", "that the 2021 capture represents the current live site"]
  },
  {
    id: "SRC-NYCA-JAMIE-CAMPAIGN-SITE-AUTHORSHIP-2026-07-13",
    title: "Jamie Burkart confirmation of NYC Artist Coalition campaign-site authorship",
    organization: "Jamie Burkart",
    kind: "project-archive",
    visibility: "protected",
    preservationStatus: "private",
    publicCitation: "Jamie Burkart, campaign-site authorship confirmation, July 13, 2026.",
    publicNote: "Jamie confirmed that he made the Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC websites.",
    supportsGenerally: ["Jamie's direct authorship of four public campaign websites"],
    doesNotEstablish: ["sole authorship of campaign policy positions", "sole campaign leadership", "ownership of collaborators' work", "sole causality for campaign outcomes"]
  }
];

export const nycaPressSources: SourceRecord[] = [
  ...newIndexSources,
  ...nycaPressArticles.flatMap((article) => article.source ? [article.source as unknown as SourceRecord] : [])
];

const articleObservationId = (sourceId: string) => `OBS-NYCA-PRESS-${sourceId.replace(/^SRC-NYCA-(?:PRESS-)?/, "")}-CORPUS`;

export const nycaPressObservations: KnowledgeBank["observations"] = [
  {
    id: "OBS-NYCA-CAMPAIGN-SITE-AUTHORSHIP-CONFIRMATION",
    sourceId: "SRC-NYCA-JAMIE-CAMPAIGN-SITE-AUTHORSHIP-2026-07-13",
    project: "nyc-artist-coalition",
    text: "Jamie confirmed that he made the Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC campaign websites.",
    locator: "Jamie confirmation in portfolio research conversation, July 13, 2026",
    status: "verified",
    confidence: "high",
    claimIds: ["CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP"],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  ...Object.entries(nycaPressCampaigns).map(([campaign, meta]) => ({
    id: meta.indexObservationId,
    sourceId: meta.indexSourceId,
    project: "nyc-artist-coalition",
    text: `The ${meta.name} press section contains ${meta.expected} distinct article links in the recovered campaign-page state.`,
    locator: campaign === "fairrentnyc" ? "Archived Press section" : "Live Press section",
    status: "verified" as const,
    confidence: "high" as const,
    claimIds: ["CLM-NYCA-CAMPAIGN-PRESS-CORPUS"],
    researchInquiryIds: ["INQ-NYCA-CAMPAIGN-PRESS-RECOVERY-2026"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex source review"]
  })),
  ...nycaPressArticles.map((article) => ({
    id: articleObservationId(article.sourceId),
    sourceId: article.sourceId,
    project: "nyc-artist-coalition",
    text: article.summary,
    locator: `${article.recoveryMode === "live" ? "Live" : "Archived"} article body and ${article.campaigns.map((campaign) => nycaPressCampaigns[campaign].name).join(" / ")} press-index placement`,
    status: "verified" as const,
    confidence: article.evidence ? "high" as const : "moderate" as const,
    claimIds: [...article.claimIds],
    researchInquiryIds: ["INQ-NYCA-CAMPAIGN-PRESS-RECOVERY-2026"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex source review"]
  }))
];

const articleSourceIds = nycaPressArticles.map((article) => article.sourceId);
const campaignArticleIds = (campaign: keyof typeof nycaPressCampaigns) =>
  nycaPressArticles.filter((article) => (article.campaigns as readonly string[]).includes(campaign)).map((article) => article.sourceId);
const campaignObservationIds = (campaign: keyof typeof nycaPressCampaigns) =>
  nycaPressArticles.filter((article) => (article.campaigns as readonly string[]).includes(campaign)).map((article) => articleObservationId(article.sourceId));

export const nycaPressIntakeItems: KnowledgeBank["intakeItems"] = Object.entries(nycaPressCampaigns).map(([campaignName, meta]) => {
  const campaign = campaignName as keyof typeof nycaPressCampaigns;
  return {
    id: `INTAKE-2026-07-13-NYCA-PRESS-${campaign.toUpperCase()}`,
    receivedAt: "2026-07-13",
    inputKind: "url" as const,
    summary: `Recovered, deduplicated, and reviewed the ${meta.expected} articles curated in the ${meta.name} campaign press section.`,
    projectIds: ["nyc-artist-coalition"],
    researchStatus: "researched" as const,
    publicationStatus: "knowledge-bank-only" as const,
    sourceIds: [meta.indexSourceId, ...campaignArticleIds(campaign)],
    observationIds: [meta.indexObservationId, ...campaignObservationIds(campaign)],
    claimIds: [
      "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
      "CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP",
      ...(campaign === "fairrentnyc" ? ["CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT"] : [])
    ],
    researchInquiryIds: ["INQ-NYCA-CAMPAIGN-PRESS-RECOVERY-2026"],
    nextActions: [
      "Use article-level evidence only for propositions the article directly supports.",
      "Keep press-index inclusion distinct from endorsement, individual authorship, and campaign causality."
    ]
  };
});

const indexEvidence: EvidenceRecord[] = Object.values(nycaPressCampaigns).map((meta) => ({
  sourceId: meta.indexSourceId,
  relationship: "direct-support",
  supports: [`${meta.expected} distinct article links in the ${meta.name} press section`],
  confidence: "high",
  renderCitation: true
}));

const articleContextEvidence: EvidenceRecord[] = nycaPressArticles.map((article) => ({
  sourceId: article.sourceId,
  relationship: "context",
  supports: [`article-level reporting on ${nycaPressCampaigns[article.campaigns[0]].topic}`],
  confidence: article.evidence ? "high" : "moderate",
  renderCitation: false
}));

const sourceIdContaining = (fragment: string) => {
  const article = nycaPressArticles.find((item) => item.canonicalUrl.includes(fragment));
  if (!article) throw new Error(`Missing press article: ${fragment}`);
  return article.sourceId;
};

export const nycaPressClaims: KnowledgeBank["claims"] = [
  {
    id: "CLM-NYCA-CAMPAIGN-WEBSITE-AUTHORSHIP",
    project: "nyc-artist-coalition",
    internalClaim: "Jamie built the Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC public campaign websites.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Jamie built four public NYC Artist Coalition campaign websites: Let NYC Dance, Talks Not Raids, Save NYC Spaces, and FairRentNYC.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      {
        sourceId: "SRC-NYCA-JAMIE-CAMPAIGN-SITE-AUTHORSHIP-2026-07-13",
        relationship: "direct-support",
        supports: ["Jamie's direct authorship of the four campaign websites"],
        confidence: "high",
        renderCitation: false
      },
      ...Object.values(nycaPressCampaigns).map((meta) => ({
        sourceId: meta.indexSourceId,
        relationship: "context" as const,
        supports: [`the public ${meta.name} campaign surface`],
        confidence: "high" as const,
        renderCitation: true
      }))
    ],
    boundaries: [
      "Website authorship is distinct from sole authorship of campaign policy, reporting, visual assets, or collaborators' contributions.",
      "Campaign outcomes and accomplishments remain collective."
    ],
    antiClaims: [
      "Jamie solely led all four campaigns.",
      "Jamie wrote every campaign position or press article.",
      "Jamie alone caused the campaigns' policy outcomes."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Jamie Burkart", "Codex source review"]
  },
  {
    id: "CLM-NYCA-CAMPAIGN-PRESS-CORPUS",
    project: "nyc-artist-coalition",
    internalClaim: "The four campaign press sections preserve 45 article placements representing 44 unique articles: 21 Let NYC Dance, 7 Talks Not Raids, 8 Save NYC Spaces, and 9 FairRentNYC.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Across four campaign sites, the recovered press sections contain 45 placements representing 44 unique articles: 21 Let NYC Dance, 7 Talks Not Raids, 8 Save NYC Spaces, and 9 FairRentNYC.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/intake/2026-07-13-nyca-campaign-press-corpus"]
    }],
    evidence: [...indexEvidence, ...articleContextEvidence],
    boundaries: [
      "The count describes recovered links in specific campaign-page states, not every article ever published about the campaigns.",
      "Press-index inclusion does not mean Jamie or the coalition endorsed every statement in an article.",
      "Contextual reporting cannot be used as proof of Jamie's individual role unless the article directly attributes that role."
    ],
    antiClaims: [
      "The corpus is a comprehensive media census.",
      "Jamie authored the press articles.",
      "Every article proves campaign causality or policy impact."
    ],
    researchInquiryIds: ["INQ-NYCA-CAMPAIGN-PRESS-RECOVERY-2026"],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex source review"]
  },
  {
    id: "CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT",
    project: "nyc-artist-coalition",
    internalClaim: "Contemporaneous reporting documents NYC Artist Coalition participation in commercial-rent-stabilization advocacy through Olympia Kazi and coalition campaign materials.",
    status: "confirmed-with-boundary",
    projections: [{
      key: "archive-note",
      text: "Contemporaneous reporting identifies NYC Artist Coalition participating in commercial-rent-stabilization advocacy alongside small-business owners and elected officials.",
      status: "active",
      citationRequired: true,
      surfaces: ["docs/knowledge-bank/projects/nyc-artist-coalition"]
    }],
    evidence: [
      { sourceId: sourceIdContaining("neirs-tavern"), relationship: "direct-support", supports: ["NYC Artist Coalition participation in commercial-rent-stabilization advocacy"], confidence: "high", renderCitation: true },
      { sourceId: sourceIdContaining("commercial-rent-stabilization-bill"), relationship: "corroborating", supports: ["coalition cultural-space argument for commercial rent stabilization"], confidence: "high", renderCitation: true },
      { sourceId: sourceIdContaining("ny-commercial-rent-regulation"), relationship: "corroborating", supports: ["coalition participation in a commercial-rent-regulation rally"], confidence: "high", renderCitation: true }
    ],
    boundaries: [
      "The reviewed articles directly attribute advocacy to Olympia Kazi and NYC Artist Coalition; they do not establish Jamie's complete individual policy role.",
      "Reporting on advocacy does not prove policy adoption, effectiveness, or sole coalition causality."
    ],
    antiClaims: [
      "Jamie personally authored the commercial-rent legislation.",
      "NYC Artist Coalition alone created or passed the proposal.",
      "The reporting proves the policy solved storefront vacancy."
    ],
    researchInquiryIds: [],
    reviewedAt: "2026-07-13",
    reviewedBy: ["Codex source review"]
  }
];

const preexistingClaimSourceIds: Record<string, string[]> = {
  "CLM-NYCA-CABARET-LAW-CONTRIBUTION": [
    "SRC-NYCA-GOTHAMIST-CABARET-2017-06-19",
    "SRC-NYCA-NPR-CABARET-2017-09-20",
    "SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12"
  ],
  "CLM-NYCA-OFFICE-NIGHTLIFE-TOWN-HALL": ["SRC-NYCA-BEDFORD-BOWERY-NIGHT-MAYOR-2017-10-12"],
  "CLM-NYCA-COFOUNDER-ROLE": ["SRC-NYCA-NPR-CABARET-2017-09-20"]
};

export const nycaPressEvidenceByClaim = nycaPressArticles.flatMap((article) =>
    article.evidence
      ? article.claimIds
          .filter((claimId) =>
            claimId !== "CLM-NYCA-CAMPAIGN-PRESS-CORPUS" &&
            claimId !== "CLM-NYCA-COMMERCIAL-RENT-ADVOCACY-CONTEXT" &&
            !preexistingClaimSourceIds[claimId]?.includes(article.sourceId)
          )
          .map((claimId) => [claimId, {
            sourceId: article.sourceId,
            relationship: article.evidence.relationship,
            supports: Array.from(article.evidence.supports),
            confidence: article.evidence.confidence,
            renderCitation: false
          }] as const)
      : []
  ).reduce<Record<string, EvidenceRecord[]>>((groups, [claimId, evidence]) => {
    (groups[claimId] ??= []).push(evidence);
    return groups;
  }, {});

export const nycaPressResearchInquiries: KnowledgeBank["researchInquiries"] = [{
  id: "INQ-NYCA-CAMPAIGN-PRESS-RECOVERY-2026",
  project: "nyc-artist-coalition",
  question: "Which articles were curated in the four NYC Artist Coalition campaign press sections, and what can each article safely support?",
  methods: [
    "Recover live campaign pages and the supplied December 1, 2021 FairRentNYC Wayback capture.",
    "Parse press-index links structurally, normalize protocols and hostnames, and deduplicate by canonical article URL.",
    "Check live article responses, query Wayback using canonical and original hostnames, and recover archived bodies for failed or misleading live pages.",
    "Retain public metadata and paraphrased observations while separating direct role evidence from policy context."
  ],
  runAt: "2026-07-13",
  resultStatus: "recovered",
  findings: [
    "Recovered 45 campaign placements representing 44 unique articles.",
    "Let NYC Dance contains 21 links, Talks Not Raids 7, Save NYC Spaces 8, and the supplied FairRentNYC capture 9.",
    "NPR's Cabaret Law article appears in both Let NYC Dance and Save NYC Spaces.",
    "All 44 unique article URLs have a Wayback capture; live or archived bodies were reviewed for every article.",
    "Direct role evidence was kept distinct from contextual reporting and campaign-index placement."
  ],
  limitations: [
    "The campaign press sections are curated collections, not exhaustive media searches.",
    "Counts describe the recovered live pages and supplied FairRentNYC capture; other historical page states may differ.",
    "Archive captures can preserve older article states, redirects, or incomplete interactive elements.",
    "Copyrighted article text is not reproduced in the public repository; the bank retains metadata, links, and paraphrased observations."
  ],
  sourceIds: [
    ...Object.values(nycaPressCampaigns).map((meta) => meta.indexSourceId),
    ...articleSourceIds
  ],
  publicSummary: "The four recovered campaign press sections contain 45 placements representing 44 unique articles, all with a recoverable Wayback capture; article-level claims remain bounded by direct attribution and context."
}];

export const nycaPressCorpusStats = {
  placementCount: Object.values(nycaPressCampaigns).reduce((total, campaign) => total + campaign.expected, 0),
  uniqueArticleCount: nycaPressArticles.length,
  reusedSourceCount: nycaPressArticles.filter((article) => article.source === null).length,
  newArticleSourceCount: nycaPressArticles.filter((article) => article.source !== null).length,
  archivedArticleCount: nycaPressArticles.filter((article) => Boolean(article.archiveUrl)).length
} as const;
