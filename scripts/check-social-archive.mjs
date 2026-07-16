#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import {
  callNycCouncilReposts,
  callNycMemberAuthoredInteractions,
  kcSpacesFundHighlights,
  nycacCouncilMentions,
  projectSocialAccounts,
  wowListArchiveSummary,
  wowListStakeholderSignals
} from "../apps/www/src/data/knowledge-bank/social-archive.ts";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

const failures = [];
let recomputedPopulationRecords = 0;
let recomputedInteractionEdges = 0;
let privacySchemaMutationCases = 0;
let kcTownHallFullPopulationRecords = 0;
let kcTownHallTireWorkflowRecords = 0;
let kcTownHallPostedLinkOccurrences = 0;
let kcTownHallDirectCouncilResponseAccounts = 0;
let kcTownHallCouncilReposterAppearances = 0;
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};
const uniqueCount = (values) => new Set(values).size;

const collectFixtureSchemaFailures = (fixture) => {
  const schemaFailures = [];
  const check = (condition, message) => {
    if (!condition) schemaFailures.push(message);
  };
  const exactKeys = (value, allowedKeys, path) => {
    check(value && typeof value === "object" && !Array.isArray(value), `${path} must be an object`);
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const unexpectedKeys = Object.keys(value).filter((key) => !allowedKeys.includes(key));
    check(unexpectedKeys.length === 0, `${path} contains unknown keys: ${unexpectedKeys.join(", ")}`);
  };
  const isDate = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
  const isHandle = (value) => typeof value === "string" && /^@[A-Za-z0-9_]{1,20}$/.test(value);
  const isStatusId = (value) => typeof value === "string" && /^\d+$/.test(value);
  const isNonNegativeInteger = (value) => Number.isInteger(value) && value >= 0;
  const recordSchemas = {
    callnyc: {
      accountKeys: ["account", "profileReported", "unrecoveredSlots", "records"],
      recordKeys: ["statusId", "publishedOn", "type", "recognitionHandle", "issuePaths"],
      types: ["original", "reply", "repost"]
    },
    kcTownHall: {
      accountKeys: ["account", "profileReported", "records"],
      recordKeys: ["statusId", "publishedOn", "type", "tireRelated", "surveyLinked"],
      types: ["original", "reply", "repost"]
    },
    wowList: {
      accountKeys: ["account", "profileReported", "records"],
      recordKeys: ["statusId", "publishedOn", "type", "postedUrlCount"],
      types: ["authored", "reply", "reposted"]
    },
    kcSpacesFund: {
      accountKeys: ["account", "profileReported", "unrecoveredSlots", "records"],
      recordKeys: ["statusId", "publishedOn", "type"],
      types: ["authored", "reposted"]
    }
  };

  exactKeys(fixture, ["version", "reviewedAt", "publicSafety", "callnyc", "kcTownHall", "wowList", "kcSpacesFund", "interactionEdges", "wowListEvidence"], "fixture");
  check(fixture?.version === 1, "fixture.version must equal 1");
  check(isDate(fixture?.reviewedAt), "fixture.reviewedAt must be an ISO date");
  check(typeof fixture?.publicSafety === "string" && fixture.publicSafety.length > 0, "fixture.publicSafety must be a non-empty string");

  for (const [accountKey, schema] of Object.entries(recordSchemas)) {
    const account = fixture?.[accountKey];
    exactKeys(account, schema.accountKeys, `fixture.${accountKey}`);
    if (!account || typeof account !== "object") continue;
    check(isHandle(account.account), `fixture.${accountKey}.account must be a public handle`);
    check(isNonNegativeInteger(account.profileReported), `fixture.${accountKey}.profileReported must be a non-negative integer`);
    if ("unrecoveredSlots" in account) check(isNonNegativeInteger(account.unrecoveredSlots), `fixture.${accountKey}.unrecoveredSlots must be a non-negative integer`);
    check(Array.isArray(account.records), `fixture.${accountKey}.records must be an array`);
    for (const [index, record] of (account.records ?? []).entries()) {
      const path = `fixture.${accountKey}.records[${index}]`;
      exactKeys(record, schema.recordKeys, path);
      check(isStatusId(record.statusId), `${path}.statusId must contain digits only`);
      check(isDate(record.publishedOn), `${path}.publishedOn must be an ISO date`);
      check(schema.types.includes(record.type), `${path}.type is not allowed`);
      if ("recognitionHandle" in record) check(isHandle(record.recognitionHandle), `${path}.recognitionHandle must be a public handle`);
      if ("issuePaths" in record) {
        check(Array.isArray(record.issuePaths), `${path}.issuePaths must be an array`);
        check(record.issuePaths.every((item) => typeof item === "string" && (item === "api/" || /^[a-z0-9-]+(?:\/[a-z0-9-]+)*\.html$/.test(item))), `${path}.issuePaths contains a non-relative path`);
      }
      if ("tireRelated" in record) check(typeof record.tireRelated === "boolean", `${path}.tireRelated must be boolean`);
      if ("surveyLinked" in record) check(typeof record.surveyLinked === "boolean", `${path}.surveyLinked must be boolean`);
      if ("postedUrlCount" in record) check(isNonNegativeInteger(record.postedUrlCount), `${path}.postedUrlCount must be a non-negative integer`);
    }
  }

  exactKeys(fixture?.interactionEdges, ["callnycCouncil", "nycArtistCoalitionCouncil", "wowListStakeholders"], "fixture.interactionEdges");
  const edgeClasses = ["repost-list-presence", "authored-wrapper-post", "authored-reply", "authored-post", "authored-quote-post", "authored-mention"];
  for (const edgeSet of ["callnycCouncil", "nycArtistCoalitionCouncil"]) {
    const edges = fixture?.interactionEdges?.[edgeSet];
    check(Array.isArray(edges), `fixture.interactionEdges.${edgeSet} must be an array`);
    for (const [index, edge] of (edges ?? []).entries()) {
      const path = `fixture.interactionEdges.${edgeSet}[${index}]`;
      exactKeys(edge, ["sourceStatusId", "sourceAccount", "publicHandle", "personKey", "interactionClass", "publishedOn", "observedOn"], path);
      check(isStatusId(edge.sourceStatusId), `${path}.sourceStatusId must contain digits only`);
      check(isHandle(edge.sourceAccount), `${path}.sourceAccount must be a public handle`);
      check(isHandle(edge.publicHandle), `${path}.publicHandle must be a public handle`);
      check(typeof edge.personKey === "string" && /^[A-Z0-9-]+$/.test(edge.personKey), `${path}.personKey is invalid`);
      check(edgeClasses.includes(edge.interactionClass), `${path}.interactionClass is not allowed`);
      if ("publishedOn" in edge) check(isDate(edge.publishedOn), `${path}.publishedOn must be an ISO date`);
      check(isDate(edge.observedOn), `${path}.observedOn must be an ISO date`);
    }
  }

  const wowListStakeholders = fixture?.interactionEdges?.wowListStakeholders;
  check(Array.isArray(wowListStakeholders), "fixture.interactionEdges.wowListStakeholders must be an array");
  for (const [index, edge] of (wowListStakeholders ?? []).entries()) {
    const path = `fixture.interactionEdges.wowListStakeholders[${index}]`;
    exactKeys(edge, ["sourceStatusId", "publicHandle", "entityKey", "interactionClass", "stakeholderGroup", "publishedOn", "observedOn"], path);
    check(isStatusId(edge.sourceStatusId), `${path}.sourceStatusId must contain digits only`);
    check(isHandle(edge.publicHandle), `${path}.publicHandle must be a public handle`);
    check(typeof edge.entityKey === "string" && /^[A-Z0-9-]+$/.test(edge.entityKey), `${path}.entityKey is invalid`);
    check(["authored-project-url", "authored-project-response"].includes(edge.interactionClass), `${path}.interactionClass is not allowed`);
    check(["diy-arts-music", "calendar-community", "neighborhood-civic", "creative-technology-peer"].includes(edge.stakeholderGroup), `${path}.stakeholderGroup is not allowed`);
    check(isDate(edge.publishedOn), `${path}.publishedOn must be an ISO date`);
    check(isDate(edge.observedOn), `${path}.observedOn must be an ISO date`);
  }

  exactKeys(fixture?.wowListEvidence, ["publicCounterSnapshot", "postedLinkDispositions"], "fixture.wowListEvidence");
  check(Array.isArray(fixture?.wowListEvidence?.publicCounterSnapshot), "fixture.wowListEvidence.publicCounterSnapshot must be an array");
  for (const [index, counter] of (fixture?.wowListEvidence?.publicCounterSnapshot ?? []).entries()) {
    const path = `fixture.wowListEvidence.publicCounterSnapshot[${index}]`;
    exactKeys(counter, ["sourceStatusId", "observedOn", "replies", "reposts", "likes"], path);
    check(isStatusId(counter.sourceStatusId), `${path}.sourceStatusId must contain digits only`);
    check(isDate(counter.observedOn), `${path}.observedOn must be an ISO date`);
    for (const field of ["replies", "reposts", "likes"]) check(isNonNegativeInteger(counter[field]), `${path}.${field} must be a non-negative integer`);
  }
  const linkCategories = ["civic-coordination", "cultural-space-care", "cultural-space-funding", "event-distribution", "external-event-distribution", "mission-source-curation", "organizer-convening", "organizer-resource", "participatory-media-peer", "product-community-route", "product-onboarding", "product-origin", "product-route"];
  check(Array.isArray(fixture?.wowListEvidence?.postedLinkDispositions), "fixture.wowListEvidence.postedLinkDispositions must be an array");
  for (const [index, disposition] of (fixture?.wowListEvidence?.postedLinkDispositions ?? []).entries()) {
    const path = `fixture.wowListEvidence.postedLinkDispositions[${index}]`;
    exactKeys(disposition, ["sourceStatusId", "linkOrdinal", "destinationSha256", "category", "canonicalSourceId"], path);
    check(isStatusId(disposition.sourceStatusId), `${path}.sourceStatusId must contain digits only`);
    check(Number.isInteger(disposition.linkOrdinal) && disposition.linkOrdinal > 0, `${path}.linkOrdinal must be a positive integer`);
    check(typeof disposition.destinationSha256 === "string" && /^[a-f0-9]{64}$/.test(disposition.destinationSha256), `${path}.destinationSha256 must be a SHA-256 digest`);
    check(linkCategories.includes(disposition.category), `${path}.category is not allowed`);
    check(disposition.canonicalSourceId === null || (typeof disposition.canonicalSourceId === "string" && /^SRC-[A-Z0-9-]+$/.test(disposition.canonicalSourceId)), `${path}.canonicalSourceId is invalid`);
  }

  return schemaFailures;
};

const populationFixturePath = "docs/knowledge-bank/fixtures/social-account-populations.json";
expect(existsSync(populationFixturePath), "Social account population fixture is missing");
let populationFixture;
if (existsSync(populationFixturePath)) {
  populationFixture = JSON.parse(readFileSync(populationFixturePath, "utf8"));
  const fixtureSchemaFailures = collectFixtureSchemaFailures(populationFixture);
  expect(fixtureSchemaFailures.length === 0, `Social account fixture violates its closed public-safe schema: ${fixtureSchemaFailures.join("; ")}`);
  const forbiddenMutations = [
    ["postText", (fixture) => { fixture.callnyc.records[0].postText = "not permitted"; }],
    ["engagementPayload", (fixture) => { fixture.wowList.records[0].engagementPayload = { likes: 1 }; }],
    ["raw link", (fixture) => { fixture.wowListEvidence.postedLinkDispositions[0].rawDestination = "https://example.com"; }],
    ["contactData", (fixture) => { fixture.kcSpacesFund.records[0].contactData = { email: "private@example.com" }; }],
    ["privateState", (fixture) => { fixture.interactionEdges.callnycCouncil[0].privateState = true; }],
    ["session", (fixture) => { fixture.interactionEdges.nycArtistCoalitionCouncil[0].session = "secret"; }],
    ["token", (fixture) => { fixture.token = "secret"; }],
    ["nested payload", (fixture) => { fixture.callnyc.records[0].payload = { text: "not permitted" }; }]
  ];
  for (const [label, mutate] of forbiddenMutations) {
    const mutation = structuredClone(populationFixture);
    mutate(mutation);
    expect(collectFixtureSchemaFailures(mutation).length > 0, `Closed social fixture schema accepted forbidden ${label} mutation`);
  }
  privacySchemaMutationCases = forbiddenMutations.length;

  const callNycRecords = populationFixture.callnyc?.records ?? [];
  const callNycStatusIds = callNycRecords.map(({ statusId }) => statusId);
  const recognitionRecords = callNycRecords.filter(({ recognitionHandle }) => recognitionHandle);
  const issuePaths = callNycRecords.flatMap(({ issuePaths = [] }) => issuePaths).filter((item) => !item.startsWith("api/"));
  expect(populationFixture.callnyc?.account === "@CallNYCapp", "CallNYC fixture account changed");
  expect(populationFixture.callnyc?.profileReported === 110, "CallNYC fixture profile count must remain 110");
  expect(callNycRecords.length === 107, "CallNYC fixture must contain 107 recovered status records");
  expect(populationFixture.callnyc?.unrecoveredSlots === 3, "CallNYC fixture must retain three unrecovered slots");
  expect(callNycRecords.length + populationFixture.callnyc.unrecoveredSlots === populationFixture.callnyc.profileReported, "CallNYC fixture does not reconcile to the profile count");
  expect(uniqueCount(callNycStatusIds) === callNycRecords.length && callNycStatusIds.every((id) => /^\d+$/.test(id)), "CallNYC fixture status IDs are invalid or duplicated");
  expect(recognitionRecords.length === 71, "CallNYC recognition classification must recompute to 71 records");
  expect(uniqueCount(recognitionRecords.map(({ recognitionHandle }) => recognitionHandle)) === 26, "CallNYC recognition classification must recompute to 26 Council handles");
  expect(uniqueCount(issuePaths) === 61, "CallNYC issue-path classification must recompute to 61 pages");

  const kcTownHallRecords = populationFixture.kcTownHall?.records ?? [];
  const kcTownHallStatusIds = kcTownHallRecords.map(({ statusId }) => statusId);
  expect(populationFixture.kcTownHall?.account === "@KCTownHall", "KC Town Hall fixture account changed");
  expect(populationFixture.kcTownHall?.profileReported === 183, "KC Town Hall fixture profile count must remain 183");
  expect(kcTownHallRecords.length === populationFixture.kcTownHall?.profileReported, "KC Town Hall fixture does not reconcile to the profile count");
  expect(uniqueCount(kcTownHallStatusIds) === kcTownHallRecords.length && kcTownHallStatusIds.every((id) => /^\d+$/.test(id)), "KC Town Hall fixture status IDs are invalid or duplicated");
  expect(kcTownHallRecords.filter(({ tireRelated }) => tireRelated).length === 100, "KC Town Hall tire classification must recompute to 100 records");

  const wowListRecords = populationFixture.wowList?.records ?? [];
  const wowListStatusIds = wowListRecords.map(({ statusId }) => statusId);
  expect(populationFixture.wowList?.account === "@wowlist", "WOW List fixture account changed");
  expect(populationFixture.wowList?.profileReported === 38, "WOW List fixture profile count must remain 38");
  expect(wowListRecords.length === populationFixture.wowList?.profileReported, "WOW List fixture does not reconcile to the profile count");
  expect(uniqueCount(wowListStatusIds) === wowListRecords.length && wowListStatusIds.every((id) => /^\d+$/.test(id)), "WOW List fixture status IDs are invalid or duplicated");
  expect(wowListRecords.filter(({ type }) => type === "authored").length === 16, "WOW List authored-post classification must recompute to 16 records");
  expect(wowListRecords.filter(({ type }) => type === "reply").length === 6, "WOW List reply classification must recompute to six records");
  expect(wowListRecords.filter(({ type }) => type === "reposted").length === 16, "WOW List repost classification must recompute to 16 records");
  expect(wowListRecords.filter(({ postedUrlCount }) => postedUrlCount > 0).length === 31, "WOW List posted-link classification must recompute to 31 records");
  expect(wowListRecords.reduce((total, { postedUrlCount }) => total + postedUrlCount, 0) === 35, "WOW List posted-link classification must recompute to 35 occurrences");
  expect(["433671630837919744", "771457416298921985"].every((statusId) => wowListStatusIds.includes(statusId)), "WOW List fixture lost a promoted provenance or product-support status");
  const wowListAuthoredStatusIds = new Set(wowListRecords.filter(({ type }) => type === "authored" || type === "reply").map(({ statusId }) => statusId));
  const wowListCounterSnapshot = populationFixture.wowListEvidence?.publicCounterSnapshot ?? [];
  expect(wowListCounterSnapshot.length === wowListAuthoredStatusIds.size && wowListCounterSnapshot.length === 22, "WOW List public-counter snapshot must cover all 22 account-authored records");
  expect(uniqueCount(wowListCounterSnapshot.map(({ sourceStatusId }) => sourceStatusId)) === wowListCounterSnapshot.length, "WOW List public-counter snapshot contains duplicate statuses");
  expect(wowListCounterSnapshot.every(({ sourceStatusId, observedOn }) => wowListAuthoredStatusIds.has(sourceStatusId) && observedOn === "2026-07-15"), "WOW List public-counter snapshot references a non-authored or wrong-date record");
  const counterTotal = (field) => wowListCounterSnapshot.reduce((total, counter) => total + counter[field], 0);
  const nonzeroCounterRecords = wowListCounterSnapshot.filter(({ replies, reposts, likes }) => replies + reposts + likes > 0).length;
  expect(nonzeroCounterRecords === 12, "WOW List public-counter snapshot must recompute to 12 records with displayed interaction");
  expect(counterTotal("replies") === 2 && counterTotal("reposts") === 20 && counterTotal("likes") === 21, "WOW List public-counter snapshot must recompute to 2 replies, 20 reposts, and 21 likes");

  const wowListLinkDispositions = populationFixture.wowListEvidence?.postedLinkDispositions ?? [];
  expect(wowListLinkDispositions.length === 35, "WOW List link-disposition ledger must contain all 35 posted-link occurrences");
  expect(uniqueCount(wowListLinkDispositions.map(({ sourceStatusId, linkOrdinal }) => `${sourceStatusId}:${linkOrdinal}`)) === wowListLinkDispositions.length, "WOW List link-disposition ledger contains a duplicate status and ordinal");
  expect(uniqueCount(wowListLinkDispositions.map(({ destinationSha256 }) => destinationSha256)) === 35, "WOW List link-disposition ledger must retain 35 distinct destination digests");
  expect(wowListLinkDispositions.every(({ sourceStatusId }) => wowListStatusIds.includes(sourceStatusId)), "WOW List link-disposition ledger references a status outside the displayed population");
  for (const record of wowListRecords) {
    const dispositions = wowListLinkDispositions.filter(({ sourceStatusId }) => sourceStatusId === record.statusId);
    expect(dispositions.length === record.postedUrlCount, `WOW List link dispositions diverge for status ${record.statusId}`);
    expect(dispositions.every(({ linkOrdinal }, index) => linkOrdinal === index + 1), `WOW List link ordinals are not contiguous for status ${record.statusId}`);
  }
  const sourceIds = new Set(knowledgeBank.sources.map(({ id }) => id));
  expect(wowListLinkDispositions.every(({ canonicalSourceId }) => canonicalSourceId === null || sourceIds.has(canonicalSourceId)), "WOW List link-disposition ledger references an unknown canonical source");

  expect(wowListArchiveSummary.profileReported === populationFixture.wowList.profileReported && wowListArchiveSummary.recovered === wowListRecords.length, "WOW List typed population summary diverged");
  expect(wowListArchiveSummary.authoredPosts === wowListRecords.filter(({ type }) => type === "authored").length && wowListArchiveSummary.replies === wowListRecords.filter(({ type }) => type === "reply").length && wowListArchiveSummary.repostedExternalPosts === wowListRecords.filter(({ type }) => type === "reposted").length, "WOW List typed record-type summary diverged");
  expect(wowListArchiveSummary.accountAuthoredRecords === wowListCounterSnapshot.length && wowListArchiveSummary.accountAuthoredRecordsWithPublicInteraction === nonzeroCounterRecords, "WOW List typed account-authored interaction summary diverged");
  expect(wowListArchiveSummary.recordsWithPostedUrls === wowListRecords.filter(({ postedUrlCount }) => postedUrlCount > 0).length && wowListArchiveSummary.postedUrlOccurrences === wowListLinkDispositions.length && wowListArchiveSummary.distinctShortUrls === uniqueCount(wowListLinkDispositions.map(({ destinationSha256 }) => destinationSha256)), "WOW List typed posted-link summary diverged");
  expect(wowListArchiveSummary.displayedReplies === counterTotal("replies") && wowListArchiveSummary.displayedReposts === counterTotal("reposts") && wowListArchiveSummary.displayedLikes === counterTotal("likes"), "WOW List typed public-counter summary diverged");

  const kcSpacesFundRecords = populationFixture.kcSpacesFund?.records ?? [];
  const kcSpacesFundStatusIds = kcSpacesFundRecords.map(({ statusId }) => statusId);
  expect(populationFixture.kcSpacesFund?.account === "@KCSpacesFund", "KC Spaces Fund fixture account changed");
  expect(populationFixture.kcSpacesFund?.profileReported === 35, "KC Spaces Fund fixture profile count must remain 35");
  expect(kcSpacesFundRecords.length === 34 && populationFixture.kcSpacesFund?.unrecoveredSlots === 1, "KC Spaces Fund fixture must retain 34 recovered records and one unrecovered slot");
  expect(kcSpacesFundRecords.length + populationFixture.kcSpacesFund.unrecoveredSlots === populationFixture.kcSpacesFund.profileReported, "KC Spaces Fund fixture does not reconcile to the profile count");
  expect(uniqueCount(kcSpacesFundStatusIds) === kcSpacesFundRecords.length && kcSpacesFundStatusIds.every((id) => /^\d+$/.test(id)), "KC Spaces Fund fixture status IDs are invalid or duplicated");
  expect(kcSpacesFundRecords.filter(({ type }) => type === "authored").length === 27, "KC Spaces Fund authored-post classification must recompute to 27 records");
  expect(kcSpacesFundRecords.filter(({ type }) => type === "reposted").length === 7, "KC Spaces Fund repost classification must recompute to seven records");

  const callNycCouncilEdges = populationFixture.interactionEdges?.callnycCouncil ?? [];
  const callNycRepostEdges = callNycCouncilEdges.filter(({ interactionClass }) => interactionClass === "repost-list-presence");
  const callNycAuthoredEdges = callNycCouncilEdges.filter(({ interactionClass }) => interactionClass.startsWith("authored-"));
  expect(callNycCouncilEdges.length === 25, "CallNYC interaction fixture must contain 19 repost-list and six authored edges");
  expect(callNycRepostEdges.length === 19 && uniqueCount(callNycRepostEdges.map(({ personKey }) => personKey)) === 19, "CallNYC fixture must recompute a 19-person repost-list floor");
  expect(callNycAuthoredEdges.length === 6 && uniqueCount(callNycAuthoredEdges.map(({ personKey }) => personKey)) === 6, "CallNYC fixture must recompute six member-authored interactions");
  expect(callNycAuthoredEdges.every(({ personKey }) => callNycRepostEdges.some((edge) => edge.personKey === personKey)), "CallNYC authored interactions must remain inside the 19-person floor");
  expect(callNycRepostEdges.every(({ sourceStatusId }) => callNycStatusIds.includes(sourceStatusId)), "CallNYC repost-list fixture references a status outside the recovered population");

  const nycArtistCoalitionEdges = populationFixture.interactionEdges?.nycArtistCoalitionCouncil ?? [];
  expect(nycArtistCoalitionEdges.length === 6, "NYC Artist Coalition interaction fixture must contain six authored mentions");
  expect(uniqueCount(nycArtistCoalitionEdges.map(({ personKey }) => personKey)) === 6, "NYC Artist Coalition interaction fixture contains a duplicate person");
  expect(nycArtistCoalitionEdges.every(({ interactionClass }) => interactionClass === "authored-mention"), "NYC Artist Coalition interaction fixture contains an unsupported interaction class");

  const wowListStakeholderEdges = populationFixture.interactionEdges?.wowListStakeholders ?? [];
  expect(wowListStakeholderEdges.length === 10, "WOW List stakeholder fixture must contain ten bounded public signals");
  expect(wowListStakeholderEdges.filter(({ interactionClass }) => interactionClass === "authored-project-url").length === 9, "WOW List stakeholder fixture must contain nine independent project-URL posts");
  expect(wowListArchiveSummary.missionRelevantThirdPartyAccounts === wowListStakeholderEdges.length, "WOW List typed stakeholder summary diverged");
  expect(wowListArchiveSummary.thirdPartyAccountsPostingWowListUrls === wowListStakeholderEdges.filter(({ interactionClass }) => interactionClass === "authored-project-url").length, "WOW List typed independent-URL summary diverged");
  expect(wowListStakeholderEdges.filter(({ stakeholderGroup }) => stakeholderGroup === "diy-arts-music").length === 7, "WOW List stakeholder fixture must contain seven DIY arts and music signals");
  for (const stakeholderGroup of ["calendar-community", "neighborhood-civic", "creative-technology-peer"]) {
    expect(wowListStakeholderEdges.filter((edge) => edge.stakeholderGroup === stakeholderGroup).length === 1, `WOW List stakeholder fixture must contain one ${stakeholderGroup} signal`);
  }

  const interactionRecords = [...callNycCouncilEdges, ...nycArtistCoalitionEdges, ...wowListStakeholderEdges];
  expect(interactionRecords.every(({ sourceStatusId, publicHandle, observedOn }) => /^\d+$/.test(sourceStatusId) && /^@/.test(publicHandle) && observedOn === "2026-07-15"), "Social interaction fixture contains an invalid public edge");
  expect(uniqueCount(interactionRecords.map(({ sourceStatusId, personKey, entityKey, interactionClass }) => `${sourceStatusId}:${personKey ?? entityKey}:${interactionClass}`)) === interactionRecords.length, "Social interaction fixture contains a duplicate edge");

  const fixtureCallNycReposts = new Set(callNycRepostEdges.map(({ sourceStatusId, publicHandle }) => `${sourceStatusId}:${publicHandle}`));
  expect(callNycCouncilReposts.every(({ statusId, handle, atInteractionHandle }) => fixtureCallNycReposts.has(`${statusId}:${atInteractionHandle ?? handle}`)), "CallNYC typed repost ledger and redacted fixture diverged");
  const authoredClass = (interaction) => ({
    "authored wrapper post": "authored-wrapper-post",
    reply: "authored-reply",
    "authored post": "authored-post",
    "quote post": "authored-quote-post",
    "authored reply": "authored-reply"
  })[interaction];
  const fixtureCallNycAuthored = new Set(callNycAuthoredEdges.map(({ sourceStatusId, publicHandle, interactionClass }) => `${sourceStatusId}:${publicHandle}:${interactionClass}`));
  expect(callNycMemberAuthoredInteractions.every(({ statusId, handle, interaction }) => fixtureCallNycAuthored.has(`${statusId}:${handle}:${authoredClass(interaction)}`)), "CallNYC typed authored ledger and redacted fixture diverged");
  const fixtureNycArtistCoalition = new Set(nycArtistCoalitionEdges.map(({ sourceStatusId, publicHandle }) => `${sourceStatusId}:${publicHandle}`));
  expect(nycacCouncilMentions.every(({ statusId, handle }) => fixtureNycArtistCoalition.has(`${statusId}:${handle}`)), "NYC Artist Coalition typed ledger and redacted fixture diverged");
  const fixtureWowListStakeholders = new Set(wowListStakeholderEdges.map(({ sourceStatusId, publicHandle, entityKey }) => `${sourceStatusId}:${publicHandle}:${entityKey}`));
  expect(wowListStakeholderSignals.every(({ statusId, handle, key }) => fixtureWowListStakeholders.has(`${statusId}:${handle}:${key}`)), "WOW List typed stakeholder ledger and redacted fixture diverged");
  expect(kcSpacesFundHighlights.every(({ statusId }) => kcSpacesFundStatusIds.includes(statusId)), "KC Spaces Fund highlight ledger references a status outside the recovered population");

  recomputedPopulationRecords = callNycRecords.length + kcTownHallRecords.length + wowListRecords.length + kcSpacesFundRecords.length;
  recomputedInteractionEdges = interactionRecords.length;
}

const kcTownHallLedgerPath = "docs/knowledge-bank/data/kctownhall-public-post-ledger.json";
expect(existsSync(kcTownHallLedgerPath), "KC Town Hall full-population ledger is missing");
if (existsSync(kcTownHallLedgerPath)) {
  const rawLedger = readFileSync(kcTownHallLedgerPath, "utf8");
  const ledger = JSON.parse(rawLedger);
  const records = ledger.records ?? [];
  const allowedTopKeys = ["schemaVersion", "account", "observedAt", "population", "method", "aggregateFindings", "records", "publicReposterAudit", "councilMemberPublicReposterAppearances"];
  const allowedRecordKeys = ["statusId", "statusUrl", "publishedAt", "relationship", "statusOwner", "recoveredRoutes", "primaryTheme", "publicSummary", "publicMentions", "hashtags", "postedUrls", "currentVisibleMetrics", "metricOwner", "mediaSignals", "normalizedContentCharacterCount", "contentDigestSha256", "outsideAuthoredInteraction"];
  const exactKeySet = (value, allowed) => value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).every((key) => allowed.includes(key));
  const relationshipCounts = Object.groupBy(records, ({ relationship }) => relationship);
  const themeCounts = Object.fromEntries(Object.entries(Object.groupBy(records, ({ primaryTheme }) => primaryTheme)).map(([theme, items]) => [theme, items.length]));
  const authored = records.filter(({ relationship }) => relationship !== "repost");
  const reposts = records.filter(({ relationship }) => relationship === "repost");
  const links = records.flatMap(({ postedUrls }) => postedUrls);
  const sumMetrics = (items) => items.reduce((totals, { currentVisibleMetrics }) => ({
    statuses: totals.statuses + 1,
    statusesWithVisibleReaction: totals.statusesWithVisibleReaction + (currentVisibleMetrics.replies + currentVisibleMetrics.reposts + currentVisibleMetrics.likes > 0 ? 1 : 0),
    replies: totals.replies + currentVisibleMetrics.replies,
    reposts: totals.reposts + currentVisibleMetrics.reposts,
    likes: totals.likes + currentVisibleMetrics.likes
  }), { statuses: 0, statusesWithVisibleReaction: 0, replies: 0, reposts: 0, likes: 0 });
  const expectedThemes = {
    "resident-tire-intake-and-operations": 100,
    "neighborhood-culture-and-community": 27,
    "civic-information-and-service-routing": 26,
    "town-hall-development-and-participation": 16,
    "racial-justice-documentation": 12,
    "pandemic-resource-routing": 2
  };

  expect(createHash("sha256").update(rawLedger).digest("hex") === "bd25d9c2101d44f0a736a754450d69fb1ac47ee4c017eeff91bb92c6cf6d199f", "KC Town Hall ledger changed without explicit audit review");
  expect(exactKeySet(ledger, allowedTopKeys), "KC Town Hall ledger contains an unreviewed top-level field");
  expect(ledger.account === "@KCTownHall" && ledger.observedAt === "2026-07-14", "KC Town Hall ledger control metadata changed");
  expect(ledger.population?.displayedProfileCount === 183 && ledger.population?.attributableRecords === 183 && ledger.population?.unresolvedProfileCountSlots === 0, "KC Town Hall ledger no longer closes the 183-item profile control");
  expect(ledger.population?.postsRouteUnique === 170 && ledger.population?.repliesRouteArticles === 188 && ledger.population?.excludedConversationContextArticles === 5, "KC Town Hall route reconciliation changed");
  expect(records.length === 183 && uniqueCount(records.map(({ statusId }) => statusId)) === 183, "KC Town Hall ledger must contain 183 unique records");
  expect(records.every((record) => exactKeySet(record, allowedRecordKeys)), "KC Town Hall ledger contains an unreviewed record field");
  expect(records.every(({ statusId, statusUrl, publishedAt, relationship, statusOwner, recoveredRoutes, publicSummary, publicMentions, hashtags, postedUrls, currentVisibleMetrics, metricOwner, mediaSignals, normalizedContentCharacterCount, contentDigestSha256, outsideAuthoredInteraction }) =>
    /^\d+$/.test(statusId) &&
    statusUrl === `https://x.com/${statusOwner.slice(1)}/status/${statusId}` &&
    !Number.isNaN(Date.parse(publishedAt)) &&
    ["account-post", "account-reply", "repost"].includes(relationship) &&
    /^@[A-Za-z0-9_]{1,20}$/.test(statusOwner) &&
    Array.isArray(recoveredRoutes) && recoveredRoutes.length > 0 && recoveredRoutes.every((route) => ["posts", "replies"].includes(route)) &&
    typeof publicSummary === "string" && publicSummary.length > 0 &&
    Array.isArray(publicMentions) && publicMentions.every((handle) => /^@[A-Za-z0-9_]{1,20}$/.test(handle)) &&
    Array.isArray(hashtags) && hashtags.every((tag) => /^#[A-Za-z0-9_]+$/.test(tag)) &&
    Array.isArray(postedUrls) && postedUrls.every((link) => exactKeySet(link, ["shortUrl", "resolvedUrl", "currentStatus"]) && /^https:\/\/t\.co\//.test(link.shortUrl) && (link.resolvedUrl === null || /^https?:\/\//.test(link.resolvedUrl))) &&
    ["replies", "reposts", "likes"].every((field) => Number.isInteger(currentVisibleMetrics?.[field]) && currentVisibleMetrics[field] >= 0) &&
    metricOwner === (relationship === "repost" ? "source-status-not-kctownhall-repost-action" : "account-authored-status") &&
    Number.isInteger(mediaSignals?.photoCount) && mediaSignals.photoCount >= 0 && typeof mediaSignals?.hasVideoOrGif === "boolean" &&
    Number.isInteger(normalizedContentCharacterCount) && normalizedContentCharacterCount >= 0 &&
    /^[a-f0-9]{64}$/.test(contentDigestSha256) &&
    (!outsideAuthoredInteraction || (exactKeySet(outsideAuthoredInteraction, ["targetAccount", "interactionType", "stakeholderRole", "roleSourceId"]) && relationship === "repost" && outsideAuthoredInteraction.targetAccount === "@KCTownHall"))
  ), "KC Town Hall ledger contains an invalid public-safe record");
  expect(records.every((record) => populationFixture.kcTownHall.records.some(({ statusId, publishedOn, type, tireRelated }) =>
    statusId === record.statusId && publishedOn === record.publishedAt.slice(0, 10) && ({ original: "account-post", reply: "account-reply", repost: "repost" })[type] === record.relationship && Boolean(tireRelated) === (record.primaryTheme === "resident-tire-intake-and-operations")
  )), "KC Town Hall public ledger diverged from the minimized population fixture");
  expect(relationshipCounts["account-post"]?.length === 142 && relationshipCounts["account-reply"]?.length === 13 && relationshipCounts.repost?.length === 28, "KC Town Hall relationship counts changed");
  expect(Object.entries(expectedThemes).every(([theme, count]) => themeCounts[theme] === count) && Object.keys(themeCounts).length === Object.keys(expectedThemes).length, "KC Town Hall primary-theme counts changed");
  expect(links.length === 133 && uniqueCount(links.map(({ shortUrl }) => shortUrl)) === 31 && uniqueCount(links.map(({ resolvedUrl }) => resolvedUrl).filter(Boolean)) === 20, "KC Town Hall posted-link inventory changed");
  expect(JSON.stringify(sumMetrics(authored)) === JSON.stringify(ledger.aggregateFindings?.accountAuthoredVisibleReactionSnapshot), "KC Town Hall account-authored reaction snapshot does not recompute");
  expect(JSON.stringify(sumMetrics(reposts)) === JSON.stringify(ledger.aggregateFindings?.repostSourceVisibleReactionSnapshot), "KC Town Hall repost-source reaction snapshot does not recompute");
  expect(/belong to their source statuses/i.test(ledger.aggregateFindings?.metricBoundary ?? ""), "KC Town Hall ledger lost its source-status metric boundary");
  const directResponses = records.filter(({ outsideAuthoredInteraction }) => outsideAuthoredInteraction?.targetAccount === "@KCTownHall");
  expect(directResponses.length === 2 && new Set(directResponses.map(({ statusOwner }) => statusOwner)).size === 2, "KC Town Hall in-population direct-response floor changed");
  const reposterAudit = ledger.aggregateFindings?.publicReposterAudit;
  expect(reposterAudit?.auditedAccountAuthoredStatuses === 40 && reposterAudit?.displayedReposts === 70 && reposterAudit?.publicIdentityAppearances === 45 && reposterAudit?.unassignedDisplayedReposts === 25, "KC Town Hall public-reposter census changed");
  expect(reposterAudit?.distinctCouncilMemberAccounts === 3 && reposterAudit?.councilMemberPublicAppearances === 7 && ["@QuintonLucasKC", "@joliejustus", "@Robinson4kc"].every((handle) => reposterAudit.councilMemberAccounts.includes(handle)), "KC Town Hall Council-member reposter floor changed");
  expect(Array.isArray(ledger.publicReposterAudit) && ledger.publicReposterAudit.length === 40 && ledger.publicReposterAudit.every((row) =>
    exactKeySet(row, ["statusId", "statusUrl", "publishedAt", "displayedReposts", "publicReposterHandles", "unassignedDisplayedReposts"]) &&
    records.some(({ statusId, relationship }) => statusId === row.statusId && relationship !== "repost") &&
    row.statusUrl === `https://x.com/KCTownHall/status/${row.statusId}` &&
    row.publicReposterHandles.every((handle) => /^@[A-Za-z0-9_]{1,20}$/.test(handle)) &&
    row.publicReposterHandles.length + row.unassignedDisplayedReposts === row.displayedReposts
  ), "KC Town Hall item-level public-reposter audit is incomplete or invalid");
  expect(ledger.publicReposterAudit.reduce((total, { displayedReposts }) => total + displayedReposts, 0) === 70 && ledger.publicReposterAudit.reduce((total, { publicReposterHandles }) => total + publicReposterHandles.length, 0) === 45, "KC Town Hall item-level public-reposter totals do not reconcile");
  expect(Array.isArray(ledger.councilMemberPublicReposterAppearances) && ledger.councilMemberPublicReposterAppearances.length === 7 && ledger.councilMemberPublicReposterAppearances.every((row) =>
    exactKeySet(row, ["handle", "statusId", "statusUrl", "publishedAt", "roleSourceId"]) &&
    ledger.publicReposterAudit.some(({ statusId, publicReposterHandles }) => statusId === row.statusId && publicReposterHandles.includes(row.handle)) &&
    ["SRC-KCMO-COUNCIL-ROSTER-2018", "SRC-KCMO-COUNCIL-BUSINESS-SESSION-TERMS"].includes(row.roleSourceId)
  ), "KC Town Hall Council-member public-reposter appearances do not reconcile");
  const collectKeys = (value, keys = []) => {
    if (!value || typeof value !== "object") return keys;
    if (Array.isArray(value)) return value.reduce((all, item) => collectKeys(item, all), keys);
    for (const [key, child] of Object.entries(value)) {
      keys.push(key);
      collectKeys(child, keys);
    }
    return keys;
  };
  const prohibitedKeys = new Set(["posttext", "rawtext", "streetaddress", "phonenumber", "emailaddress", "directmessage", "cookie", "session", "credential", "privateanalytics", "engagementpayload", "rawpayload"]);
  expect(!collectKeys(ledger).some((key) => prohibitedKeys.has(key.toLowerCase())), "KC Town Hall ledger contains a prohibited public-repo field");

  kcTownHallFullPopulationRecords = records.length;
  kcTownHallTireWorkflowRecords = themeCounts["resident-tire-intake-and-operations"];
  kcTownHallPostedLinkOccurrences = links.length;
  kcTownHallDirectCouncilResponseAccounts = 3;
  kcTownHallCouncilReposterAppearances = ledger.councilMemberPublicReposterAppearances.length;

  for (const forbiddenField of ["postText", "streetAddress", "session", "privateAnalytics", "rawPayload"]) {
    const mutation = structuredClone(ledger);
    mutation.records[0][forbiddenField] = "not permitted";
    expect(!exactKeySet(mutation.records[0], allowedRecordKeys), `KC Town Hall ledger schema accepted forbidden ${forbiddenField}`);
    privacySchemaMutationCases += 1;
  }
}

const expectedRegistry = new Map([
  ["callnyc", "@CallNYCapp"],
  ["nyc-artist-coalition", "@NYCArtC"],
  ["fair-rent-nyc", "@NYCArtC"],
  ["talks-not-raids", "@NYCArtC"],
  ["let-nyc-dance", "@NYCArtC"],
  ["save-nyc-spaces", "@NYCArtC"],
  ["wowlist", "@wowlist"],
  ["kc-town-hall", "@KCTownHall"],
  ["kc-spaces-fund", "@KCSpacesFund"]
]);

for (const [projectId, handle] of expectedRegistry) {
  const record = projectSocialAccounts.find((item) => item.projectId === projectId);
  expect(record?.status === "recovered", `${projectId} is not marked recovered`);
  expect(record?.handle === handle, `${projectId} handle differs from ${handle}`);
}
for (const projectId of ["harry-j-epstein", "sunday-dinner", "196", "source-backed-team-memory", "nter-chng"]) {
  const record = projectSocialAccounts.find((item) => item.projectId === projectId);
  expect(record?.status === "open-inquiry" && record.relationship === "not-recovered", `${projectId} must remain an open not-recovered inquiry`);
}

expect(callNycCouncilReposts.length === 19, "CallNYC Council repost floor must remain 19");
expect(uniqueCount(callNycCouncilReposts.map(({ name }) => name)) === 19, "CallNYC Council repost ledger contains a duplicate person");
expect(uniqueCount(callNycCouncilReposts.map(({ statusId }) => statusId)) === 19, "CallNYC Council repost ledger contains a duplicate status");
expect(callNycMemberAuthoredInteractions.length === 6, "CallNYC member-authored interaction ledger must remain six");
expect(uniqueCount(callNycMemberAuthoredInteractions.map(({ statusId }) => statusId)) === 6, "CallNYC member-authored ledger contains a duplicate status");
const callNycCouncilNames = new Set(callNycCouncilReposts.map(({ name }) => name));
expect(callNycMemberAuthoredInteractions.every(({ name }) => callNycCouncilNames.has(name)), "CallNYC authored interactions must not be added to the 19-person floor twice");

expect(nycacCouncilMentions.length === 6, "NYC Artist Coalition Council-authored mention floor must remain six");
expect(uniqueCount(nycacCouncilMentions.map(({ name }) => name)) === 6, "NYC Artist Coalition Council ledger contains a duplicate person");
expect(uniqueCount(nycacCouncilMentions.map(({ statusId }) => statusId)) === 6, "NYC Artist Coalition Council ledger contains a duplicate status");

expect(kcSpacesFundHighlights.length === 11, "KC Spaces Fund public grantee-highlight floor must remain 11");
expect(uniqueCount(kcSpacesFundHighlights.map(({ name }) => name)) === 11, "KC Spaces Fund highlight ledger contains a duplicate grantee");
expect(uniqueCount(kcSpacesFundHighlights.map(({ statusId }) => statusId)) === 11, "KC Spaces Fund highlight ledger contains a duplicate status");

const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const activeClaims = [
  ["CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT", "/work/callnyc"],
  ["CLM-NYCAC-SOCIAL-IDENTITY-CONTINUITY", "/work/fair-rent-nyc"],
  ["CLM-WOWLIST-HISTORICAL-SCALE", "/work/wowlist"],
  ["CLM-WOWLIST-FACEBOOK-PUBLISHING-MANAGEMENT", "/work/wowlist"],
  ["CLM-KCTH-SOCIAL-SERVICE-REPORTING", "/work/kc-town-hall"]
];
for (const [claimId, surface] of activeClaims) {
  const claim = claimById.get(claimId);
  expect(claim?.projections.some((projection) => projection.status === "active" && projection.surfaces.includes(surface)), `${claimId} lacks its exact active projection`);
  const page = knowledgeBank.pages.find((item) => item.surface === surface);
  expect(page?.occurrences.some((occurrence) => occurrence.claimId === claimId), `${claimId} is not registered on ${surface}`);
}

const retiredWowListSocialProjection = claimById.get("CLM-WOWLIST-SOCIAL-PROVENANCE-AND-SUPPORT");
expect(retiredWowListSocialProjection?.projections.every(({ status }) => status !== "active"), "The replaced WOW List social-account projection must remain retired from the case study");

const wowListScaleClaim = claimById.get("CLM-WOWLIST-HISTORICAL-SCALE");
const wowListPublicThresholdTexts = [
  ...wowListScaleClaim.projections.map(({ text }) => text),
  ...knowledgeBank.researchInquiries
    .filter(({ project }) => project === "wowlist")
    .map(({ publicSummary }) => publicSummary)
].filter((text) => text?.includes("35+"));
expect(wowListPublicThresholdTexts.length >= 7, "WOW List public threshold contract lost expected projections or summaries");
for (const text of wowListPublicThresholdTexts) {
  expect(/(?:at least 50|50\+) geocoded posts\/events/i.test(text), `WOW List public 35+ wording lost its numeric threshold: ${text}`);
}

const establishment = claimById.get("CLM-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT");
expect(establishment?.projections.every(({ status, surfaces }) => status === "hold" && surfaces.length === 0), "Account-establishment memory escaped its hold");
const establishmentCandidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-PROJECT-SOCIAL-IDENTITY-ESTABLISHMENT");
expect(establishmentCandidate?.maturity === "held", "Account-establishment lifecycle candidate must remain held");
const kcSpacesCandidate = knowledgeLifecycle.candidateClaims.find(({ id }) => id === "CND-KCSF-SOCIAL-GRANTEE-HIGHLIGHTS");
expect(kcSpacesCandidate?.maturity === "held", "KC Spaces Fund highlight candidate must remain held from public composition");

const callNycClaim = claimById.get("CLM-CALLNYC-COUNCIL-SOCIAL-ENGAGEMENT");
const callNycText = JSON.stringify(callNycClaim);
expect(callNycText.includes("at least 19"), "CallNYC claim lost lower-bound wording");
expect(callNycText.includes("not a complete lifetime count"), "CallNYC claim lost its incomplete-census boundary");
expect(callNycText.includes("formally endorsed") || callNycText.includes("formal Council adoption"), "CallNYC claim lost its endorsement or adoption anti-claim");
const kcTownHallOperationsText = JSON.stringify(claimById.get("CLM-KCTH-SOCIAL-SERVICE-REPORTING"));
expect(kcTownHallOperationsText.includes("100 of 183"), "KC Town Hall public projection lost its operating-pattern evidence");
expect(!kcTownHallOperationsText.includes("three then-sitting Council member accounts"), "KC Town Hall operations claim absorbed the incoming-response floor");
expect(!kcTownHallOperationsText.includes("seven appearances"), "KC Town Hall operations claim absorbed the public-reposter floor");
expect(!kcTownHallOperationsText.includes("174 likes"), "KC Town Hall operations claim absorbed the mutable metric snapshot");

const kcTownHallProfileResponseText = JSON.stringify(claimById.get("CLM-KCTH-COUNCIL-MEMBER-RESPONSE-FLOOR"));
expect(kcTownHallProfileResponseText.includes("two then-sitting Kansas City Council members"), "KC Town Hall profile-response claim lost its two-account floor");
expect(["SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29", "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29"].every((sourceId) => kcTownHallProfileResponseText.includes(sourceId)), "KC Town Hall profile-response claim lost a direct-response source");

const kcTownHallIncomingResponseText = JSON.stringify(claimById.get("CLM-KCTH-INCOMING-COUNCIL-RESPONSE-FLOOR"));
expect(kcTownHallIncomingResponseText.includes("three then-sitting Kansas City Council member accounts"), "KC Town Hall incoming-response claim lost its three-account floor");
expect(kcTownHallIncomingResponseText.includes("outside the 183"), "KC Town Hall incoming-response claim lost the profile-population boundary");
expect(["SRC-X-QUINTON-LUCAS-KCTH-RESPONSE-2019-04-29", "SRC-X-JOLIE-JUSTUS-KCTH-RESPONSE-2019-04-29", "SRC-KCTH-SOCIAL-MELISSA-ROBINSON-2020"].every((sourceId) => kcTownHallIncomingResponseText.includes(sourceId)), "KC Town Hall incoming-response claim lost a direct-response source");

const kcTownHallReposterText = JSON.stringify(claimById.get("CLM-KCTH-SOCIAL-PUBLIC-REPOSTER-FLOOR"));
expect(kcTownHallReposterText.includes("seven appearances") && kcTownHallReposterText.includes("three then-sitting Kansas City Council member accounts"), "KC Town Hall public-reposter claim lost its bounded floor");
expect(!kcTownHallReposterText.includes("direct public responses"), "KC Town Hall public-reposter claim absorbed the direct-response floor");

const reportPath = "docs/knowledge-bank/research/2026-07-15-project-social-media-archive-production.md";
expect(existsSync(reportPath), "Social-media archival production report is missing");
if (existsSync(reportPath)) {
  const report = readFileSync(reportPath, "utf8");
  for (const phrase of ["at least **19 distinct serving 2016 nyc council member accounts**", "at least **six serving council member accounts**", "not recovered does not mean", "individual coalition-post authorship remains deliberately unattributed", "one hundred records are not one hundred completed pickups", "183-item public-safe ledger", "133 posted short-link occurrences", "dated public lists expose seven appearances by three then-sitting council-member accounts", "a stricter incoming review recovered direct public responses", "all 38 records displayed by @wowlist at review time", "35 posted-link occurrences", "1,846 users and 16,142 posts/events", "at least 50 geocoded posts/events"]) {
    expect(report.toLowerCase().includes(phrase), `Social-media report lost required boundary: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Social archive check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Social archive check passed:");
console.log(JSON.stringify({
  recoveredAccountIdentities: 5,
  projectAndCampaignMappings: expectedRegistry.size,
  callNycCouncilMemberFloor: callNycCouncilReposts.length,
  callNycMemberAuthoredInteractions: callNycMemberAuthoredInteractions.length,
  nycArtistCoalitionCouncilMentionFloor: nycacCouncilMentions.length,
  kcSpacesFundPublicHighlightFloor: kcSpacesFundHighlights.length,
  recomputedPopulationRecords,
  recomputedInteractionEdges,
  wowListDisplayedPopulation: wowListArchiveSummary.recovered,
  wowListPostedLinkOccurrences: wowListArchiveSummary.postedUrlOccurrences,
  wowListCounterSnapshotRecords: wowListArchiveSummary.accountAuthoredRecords,
  wowListCounterRecordsWithInteraction: wowListArchiveSummary.accountAuthoredRecordsWithPublicInteraction,
  wowListDisplayedReplies: wowListArchiveSummary.displayedReplies,
  wowListDisplayedReposts: wowListArchiveSummary.displayedReposts,
  wowListDisplayedLikes: wowListArchiveSummary.displayedLikes,
  wowListStakeholderSignals: wowListArchiveSummary.missionRelevantThirdPartyAccounts,
  wowListIndependentUrlSignals: wowListArchiveSummary.thirdPartyAccountsPostingWowListUrls,
  kcTownHallFullPopulationRecords,
  kcTownHallTireWorkflowRecords,
  kcTownHallPostedLinkOccurrences,
  kcTownHallDirectCouncilResponseAccounts,
  kcTownHallCouncilReposterAppearances,
  privacySchemaMutationCases,
  activePortfolioClaims: activeClaims.length,
  heldRoleOrReserveClaims: 2
}, null, 2));
