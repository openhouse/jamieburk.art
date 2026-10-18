import test from "node:test";
import assert from "node:assert/strict";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaAnimationOutcome, dclaOutcomeReview } from "../../apps/www/src/data/knowledge-bank/dcla-animation-outcome-2026-10.ts";
import publicRegistry from "../../apps/www/src/data/knowledge-bank/public-registry.json" with { type: "json" };
import * as evaluatorModule from "./dcla-animation-outcome-eval.mjs";
const candidate = () => structuredClone({ review: dclaOutcomeReview, knowledge: dclaAnimationOutcome, graph: knowledgeBank, registry: publicRegistry });

const claimId = "CLM-DCLA-ANIMATION-COLLABORATIVE-PUBLICATION";

test("the public outcome has source-backed credit, collaboration, and campaign-message evidence", () => {
  const claim = knowledgeBank.claims.find(item => item.id === claimId);
  assert.ok(claim, "Public adoption must not be reduced to an animation credit alone.");
  for (const id of ["SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03", "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18", "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18"]) {
    assert.ok(claim.evidence.some(item => item.sourceId === id && item.relationship === "direct-support"));
  }
});

test("Jamie's success assessment stays attributed rather than becoming an institutional verdict", () => {
  const observation = knowledgeBank.observations.find(item => item.id === "OBS-DCLA-ANIMATION-SUCCESS-ASSESSMENT");
  assert.ok(observation);
  assert.equal(observation.kind, "participant-memory");
  assert.equal(observation.status, "captured");
  assert.equal(knowledgeBank.sources.find(item => item.id === observation.sourceId)?.author, "Jamie Burkart");
});

test("the text-only outcome has a citation occurrence and an explicit agency relationship", () => {
  const occurrence = knowledgeBank.pages.find(item => item.id === "fair-rent-nyc")?.occurrences.find(item => item.claimId === claimId);
  assert.ok(occurrence);
  const relation = knowledgeBank.agencyRelations.find(item => item.claimIds.includes(claimId));
  assert.ok(relation);
  assert.deepEqual(relation.actorIds, ["ENT-JAMIE-BURKART"]);
  assert.equal(relation.creditScope, "shared");
  assert.notEqual(relation.action, "enacted");
});

test("bounded communications adoption can pass without policy or media release authority", () => {
  assert.equal(typeof evaluatorModule?.evaluateDclaOutcome, "function", "The outcome evaluator must be available.");
  const result = evaluatorModule.evaluateDclaOutcome(candidate());
  assert.equal(result.passed, true, result.errors.join("\n"));
  assert.deepEqual(result.errors, []);
  assert.equal(result.websiteMediaReady, false);
});

const source = (input, id) => input.graph.sources.find(item => item.id === id);
const occurrencePage = input => input.graph.pages.find(item => item.id === "fair-rent-nyc");
const assessmentId = "SRC-JAMIE-DCLA-ANIMATION-OUTCOME-2026-10-18";
const articleId = "SRC-DCLA-CREATIVE-NEW-YORK-2026-10-03";
const panelId = "SRC-DCLA-COLLABORATOR-PANEL-2026-10-18";
const visualId = "SRC-DCLA-ANIMATION-VISUAL-REVIEW-2026-10-18";

// Mutations exercise the evaluator's decisions, not the wording of a document.
// This evidence contract is deliberately bounded; semantic prose still needs
// independent source-grounded review, not a claimed universal regex judge.
const mutations = [
  ["communications adoption is flattened back to a mere output", input => { input.review.outcomeType = "animation-credit-only"; }, /communications-adoption/],
  ["artifact collaboration becomes an ongoing institutional relationship", input => { input.review.publicationScope = "ongoing-partnership"; }, /publication scope/],
  ["the participant assessment loses its named attribution", input => { input.review.assessment.attributedTo = "All institutions"; }, /maker attribution/],
  ["the maker assessment is promoted to independently verified success", input => { input.review.assessment.status = "institutionally-verified"; }, /maker attribution/],
  ["campaign connection loses its maker-attributed basis", input => { input.review.campaignConnection.status = "institutionally-endorsed"; }, /campaign connection/],
  ["creation evidence is replaced by account presence", input => { input.review.creationEvidence = panelId; }, /evidence roles/],
  ["collaboration evidence is replaced by the maker account", input => { input.review.collaborationEvidence = assessmentId; }, /evidence roles/],
  ["message carriage loses its visual observation", input => { delete input.review.messageEvidence; }, /evidence roles/],
  ["a displayed collaborator is silently dropped", input => { input.review.collaborators.pop(); }, /collaborator inventory/],
  ["a seventh collaborator is invented", input => { input.review.collaborators.push("new-institution"); }, /collaborator inventory/],
  ["a duplicate collaborator masks a missing participant", input => { input.review.collaborators[0] = "nyculture"; }, /collaborator inventory/],
  ...["policyEndorsementEstablished", "policyAdoptionEstablished", "formalPartnershipEstablished", "audienceGrowthMeasured", "adoptionProcessVerified", "participantConsensusEstablished", "mediaReuseAuthorized"].map(flag => [
    `unverified authority transition: ${flag}`, input => { input.review[flag] = true; }, /Unsupported authority transition/
  ]),
  ["text projection silently becomes a video embed", input => { input.review.websiteProjection = "video-embed"; }, /text-only/],
  ["the review uses a nonexistent calendar date", input => { input.review.reviewedAt = "2026-02-30"; }, /calendar date/],
  ["the assessment source loses authorship", input => { input.knowledge.sources[0].author = "DCLA"; }, /assessment source/],
  ["the maker account becomes a public underlying source", input => { input.knowledge.sources[0].visibility = "public"; input.knowledge.sources[0].preservationStatus = "live"; }, /assessment source/],
  ["the maker account source anchor is deleted", input => { delete input.knowledge.sources[0].protectedLocatorId; }, /assessment source/],
  ["the maker account is made into an asset", input => { input.knowledge.sources[0].assetUrl = "https://example.test/source.jpg"; }, /Malformed sources|assessment source/],
  ["source access and review dates diverge", input => { input.knowledge.sources[0].accessedAt = "2026-10-17"; }, /review dates/],
  ["the maker's self-account is counted as independent collaborator corroboration", input => {
    input.knowledge.intakeItems[0].kind = "collaborator-note";
    input.graph.intakeItems.find(item => item.id === input.knowledge.intakeItems[0].id).kind = "collaborator-note";
  }, /maker self-account/],
  ["the inquiry is marked complete while adoption work is unobserved", input => { input.knowledge.researchInquiries[0].resultStatus = "recovered"; }, /open inquiry/],
  ["an observation swaps its source ownership", input => { input.knowledge.observations[0].sourceId = articleId; }, /observation ownership/],
  ["personal assessment becomes a verified source fact", input => { input.knowledge.observations[0].kind = "source-fact"; input.knowledge.observations[0].status = "verified"; }, /assessment observation/],
  ["an observation anchor is missing", input => { delete input.knowledge.observations[1].locator; }, /observation anchor/],
  ["an observation anchor is whitespace", input => { input.knowledge.observations[1].locator = " "; }, /observation anchor/],
  ["an observation loses its interpretation limit", input => { input.knowledge.observations[1].limitations = []; }, /observation limits/],
  ["an observation has an unregistered comparison source", input => { input.knowledge.observations[1].comparisonSourceIds.push("SRC-MISSING"); }, /observation source links/],
  ["an intake omits one of its observations", input => { input.knowledge.intakeItems[0].observationIds.pop(); }, /intake inventory/],
  ["an intake omits reused source evidence", input => { input.knowledge.intakeItems[0].sourceIds.pop(); }, /intake inventory/],
  ["an inquiry loses its source evidence", input => { input.knowledge.researchInquiries[0].sourceIds = []; }, /inquiry source inventory/],
  ["the claim loses collaboration evidence", input => { input.knowledge.claims[0].evidence = input.knowledge.claims[0].evidence.filter(item => item.sourceId !== panelId); }, /claim evidence inventory/],
  ["direct caption support is demoted to context", input => { input.knowledge.claims[0].evidence.find(item => item.sourceId === visualId).relationship = "context"; }, /evidence relationship/],
  ["a source is made to support an unrecorded assertion", input => { input.knowledge.claims[0].evidence[0].supports = ["institutional endorsement"]; }, /support keys/],
  ["claim evidence lacks an exact source anchor", input => { input.knowledge.claims[0].evidence[0].locator = " "; }, /evidence anchor/],
  ["a protected screenshot becomes a rendered citation", input => { input.knowledge.claims[0].evidence.find(item => item.sourceId === panelId).renderCitation = true; }, /citation visibility/],
  ["the public article citation disappears", input => { input.knowledge.claims[0].evidence[0].renderCitation = false; }, /citation visibility/],
  ["the public projection no longer requires citations", input => { input.knowledge.claims[0].projections[0].citationRequired = false; }, /projection contract/],
  ["the reviewed outcome is silently deactivated", input => { input.knowledge.claims[0].projections[0].status = "hold"; }, /projection contract/],
  ["a second public surface is added without review", input => { input.knowledge.claims[0].projections[0].surfaces.push("/resume"); }, /projection contract/],
  ["the page citation is removed", input => { occurrencePage(input).occurrences = occurrencePage(input).occurrences.filter(item => item.claimId !== claimId); }, /citation occurrence/],
  ["the page points to a different projection", input => { occurrencePage(input).occurrences.find(item => item.claimId === claimId).projection = "resume-html"; }, /citation occurrence/],
  ["a second page cites the outcome without a selected surface", input => { input.graph.pages.find(item => item.id !== "fair-rent-nyc").occurrences.push({ id: "unexpected-outcome", claimId, projection: "case-study" }); }, /citation occurrence/],
  ["an occurrence override exposes protected source evidence", input => { occurrencePage(input).occurrences.find(item => item.claimId === claimId).sourceIds = [panelId]; }, /citation source override/],
  ["an empty occurrence override removes all citations", input => { occurrencePage(input).occurrences.find(item => item.claimId === claimId).sourceIds = []; }, /citation source override/],
  ["the outcome is absent from the public registry", input => { input.registry.claims = input.registry.claims.filter(item => item.id !== claimId); }, /public registry claim/],
  ["the registry reveals a protected source", input => { input.registry.sources.push(structuredClone(input.knowledge.sources[0])); }, /public registry protected evidence/],
  ["the registry evidence includes the collaborator screenshot", input => { input.registry.claims.find(item => item.id === claimId).evidence.push(structuredClone(input.knowledge.claims[0].evidence.find(item => item.sourceId === panelId))); }, /public registry evidence/],
  ["the registry projection has become stale", input => { input.registry.claims.find(item => item.id === claimId).projections[0].text = "Earlier credit-only projection."; }, /public registry projection/],
  ["the registry citation occurrence has been removed", input => { input.registry.pages.find(item => item.id === "fair-rent-nyc").occurrences = []; }, /public registry occurrence/],
  ["a public registry evidence record retains its private anchor", input => { input.registry.claims.find(item => item.id === claimId).evidence[0].locator = "Underlying private annotation"; }, /public registry evidence/],
  ["a public registry source retains a protected locator", input => { input.registry.sources.find(item => item.id === articleId).protectedLocatorId = "PRIVATE-LOCATOR"; }, /public registry source/],
  ["the actual registry selects a signed archive URL", input => { const record = input.registry.sources.find(item => item.id === articleId); record.archiveUrl = "https://example.test/private.mp4?signature=DO_NOT_EXPOSE"; record.preferredPublicUrl = "archive"; }, /private locators/],
  ["the actual registry source note exposes a private path", input => { input.registry.sources.find(item => item.id === articleId).publicNote = "/Users/private/raw-source.md"; }, /private locators/],
  ["the actual registry claim boundary exposes contact information", input => { input.registry.claims.find(item => item.id === claimId).boundaries.push("private@example.test"); }, /private locators/],
  ["the graph occurrence ID diverges from the MDX reference", input => { occurrencePage(input).occurrences.find(item => item.claimId === claimId).id = "wrong-reference"; }, /citation occurrence/],
  ["the registry occurrence ID diverges from the MDX reference", input => { input.registry.pages.find(item => item.id === "fair-rent-nyc").occurrences.find(item => item.claimId === claimId).id = "wrong-reference"; }, /public registry occurrence/],
  ["both occurrence IDs diverge together from the MDX reference", input => { occurrencePage(input).occurrences.find(item => item.claimId === claimId).id = "wrong-reference"; input.registry.pages.find(item => item.id === "fair-rent-nyc").occurrences.find(item => item.claimId === claimId).id = "wrong-reference"; }, /citation occurrence|public registry occurrence/],
  ["the graph source order omits the article", input => { occurrencePage(input).sourceOrder = occurrencePage(input).sourceOrder.filter(id => id !== articleId); }, /source order/],
  ["the registry source order omits the reel", input => { const page = input.registry.pages.find(item => item.id === "fair-rent-nyc"); page.sourceOrder = page.sourceOrder.filter(id => id !== "SRC-DCLA-INSTAGRAM-DENAV1HHOXC"); }, /source order/],
  ["the graph source order repeats the article", input => { occurrencePage(input).sourceOrder.push(articleId); }, /source order/],
  ["the registry source order repeats the reel", input => { input.registry.pages.find(item => item.id === "fair-rent-nyc").sourceOrder.push("SRC-DCLA-INSTAGRAM-DENAV1HHOXC"); }, /source order/],
  ["a reused public source is missing from the graph", input => { input.graph.sources = input.graph.sources.filter(item => item.id !== articleId); }, /shared source/],
  ["the integrated claim contradicts the reviewed module", input => { input.graph.claims.find(item => item.id === claimId).internalClaim = "DCLA endorsed FairRentNYC's legislation."; }, /graph\/module semantics/],
  ["the integrated agency relation assigns a different actor", input => { input.graph.agencyRelations.find(item => item.id === "REL-JAMIE-DCLA-RECAP-PUBLICATION").actorIds = ["ENT-DCLA"]; }, /graph\/module semantics/],
  ["the integrated source reattributes the maker account", input => { source(input, assessmentId).author = "DCLA"; }, /graph\/module semantics/],
  ["the integrated observation invents consensus", input => { input.graph.observations.find(item => item.id === "OBS-DCLA-ANIMATION-PUBLIC-COLLABORATION").text = "All participants agreed with the campaign."; }, /graph\/module semantics/],
  ["a shared source has duplicate stable IDs", input => { input.graph.sources.push(structuredClone(source(input, articleId))); }, /shared source/],
  ["a shared source loses its support vocabulary", input => { source(input, articleId).supportsGenerally = []; }, /support keys/],
  ["a source URL becomes a download URL", input => { source(input, articleId).canonicalUrl = "https://example.test/video.mp4?signature=secret"; }, /public source URL|private locators/],
  ["a protected shared source becomes public", input => { source(input, panelId).visibility = "public"; }, /shared protected source/],
  ["shared media permission is silently cleared", input => { source(input, "SRC-DCLA-INSTAGRAM-DENAV1HHOXC").media.publicDisplayStatus = "cleared"; }, /media reuse/],
  ["individual production turns into policy enactment", input => { input.knowledge.agencyRelations[0].action = "enacted"; }, /agency scope/],
  ["shared work is recast as individual sole credit", input => { input.knowledge.agencyRelations[0].creditScope = "individual"; }, /agency scope/],
  ["unobserved actors are attributed in the production relation", input => { input.knowledge.agencyRelations[0].actorIds.push("ENT-DCLA"); }, /agency scope/],
  ["the relation points to the wrong object", input => { input.knowledge.agencyRelations[0].objectId = "ENT-MISSING"; }, /agency scope/],
  ["the relation loses its claim", input => { input.knowledge.agencyRelations[0].claimIds = ["CLM-MISSING"]; }, /agency claim/],
  ["an agency support key has no source basis", input => { input.knowledge.agencyRelations[0].sourceSupportKeys = ["paid commission"]; }, /agency support keys/],
  ["agency support evidence is removed", input => { input.knowledge.agencyRelations[0].sourceIds = [articleId]; }, /agency source inventory/],
  ["the actor cannot resolve in the graph", input => { input.graph.entities = input.graph.entities.filter(item => item.id !== "ENT-JAMIE-BURKART"); }, /agency actor/],
  ["private locators leak in fields dropped by schema parsing", input => { input.knowledge.sources[0].rawPath = "/Users/private/source.json"; }, /private locators/],
  ["private contact information leaks in an observation", input => { input.knowledge.observations[0].text += " Contact private@example.test."; }, /private locators/],
  ["positive claim prose asserts legislative endorsement", input => { input.knowledge.claims[0].projections[0].text += " DCLA endorsed FairRentNYC's legislation."; }, /unsupported assertion/],
  ["positive claim prose invents a formal partnership", input => { input.knowledge.claims[0].internalClaim += " The publication established a permanent institutional partnership."; }, /unsupported assertion/],
  ["positive observation prose invents consensus", input => { input.knowledge.observations[1].text += " All participants agreed with the campaign."; }, /unsupported assertion/],
  ["positive relation prose invents the adoption workflow", input => { input.knowledge.agencyRelations[0].result += " Jamie negotiated the collaboration approvals."; }, /unsupported assertion/],
  ["positive inquiry prose invents measured audience growth", input => { input.knowledge.researchInquiries[0].findings.push("The animation doubled the campaign's audience."); }, /unsupported assertion/],
  ...["sources", "intakeItems", "observations", "claims", "researchInquiries", "entities", "agencyRelations"].flatMap(key => [
    [`the outcome ${key} population is silently deleted`, input => { input.knowledge[key] = []; }, /record inventory/],
    [`the outcome ${key} population is duplicated`, input => { input.knowledge[key].push(structuredClone(input.knowledge[key][0])); }, /record inventory/]
  ])
];

for (const [name, mutate, error] of mutations) {
  test(`rejects when ${name}`, () => {
    const input = candidate();
    mutate(input);
    const result = evaluatorModule.evaluateDclaOutcome(input);
    assert.equal(result.passed, false, `Mutation was accepted: ${name}`);
    assert.ok(result.errors.some(message => error.test(message)), `Missing targeted rejection ${error}: ${result.errors.join("; ")}`);
    assert.equal(result.websiteMediaReady, false);
  });
}

test("ordering does not change the bounded evidence decision", () => {
  const input = candidate();
  input.review.collaborators.reverse();
  input.knowledge.observations.reverse();
  input.knowledge.claims[0].evidence.reverse();
  input.knowledge.intakeItems[0].sourceIds.reverse();
  const result = evaluatorModule.evaluateDclaOutcome(input);
  assert.equal(result.passed, true, result.errors.join("\n"));
});

test("describing communications adoption is allowed without treating adoption as policy endorsement", () => {
  const input = candidate();
  input.knowledge.claims[0].internalClaim += " Jamie describes this communications adoption as a success.";
  input.knowledge.observations[0].text += " The work was adopted as a recap, not as legislation.";
  // A deliberate acceptable edit is propagated into the integrated graph too.
  input.graph.claims.find(item => item.id === claimId).internalClaim = input.knowledge.claims[0].internalClaim;
  input.graph.observations.find(item => item.id === input.knowledge.observations[0].id).text = input.knowledge.observations[0].text;
  const result = evaluatorModule.evaluateDclaOutcome(input);
  assert.equal(result.passed, true, result.errors.join("\n"));
});

test("the outcome guard does not claim to audit unrelated registry source content", () => {
  const input = candidate();
  const unrelated = input.registry.sources.find(item => ![articleId, "SRC-DCLA-INSTAGRAM-DENAV1HHOXC"].includes(item.id));
  unrelated.publicNote = "Synthetic unrelated locator /Users/example/unrelated.md";
  const result = evaluatorModule.evaluateDclaOutcome(input);
  assert.equal(result.passed, true, result.errors.join("\n"));
});

for (const [name, mutate] of [
  ["null review", input => { input.review = null; }],
  ["null knowledge", input => { input.knowledge = null; }],
  ["null graph", input => { input.graph = null; }],
  ["null graph source record", input => { input.graph.sources.push(null); }],
  ["null graph page record", input => { input.graph.pages.push(null); }],
  ["null graph nested occurrence", input => { occurrencePage(input).occurrences.push(null); }],
  ["null public registry", input => { input.registry = null; }],
  ["null registry source record", input => { input.registry.sources.push(null); }],
  ["null registry nested occurrence", input => { input.registry.pages.find(item => item.id === "fair-rent-nyc").occurrences.push(null); }],
  ["null registry evidence", input => { input.registry.claims.find(item => item.id === claimId).evidence = null; }]
]) {
  test(`malformed input fails closed without throwing: ${name}`, () => {
    const input = candidate();
    mutate(input);
    let result;
    assert.doesNotThrow(() => { result = evaluatorModule.evaluateDclaOutcome(input); });
    assert.equal(result.passed, false);
    assert.equal(result.websiteMediaReady, false);
  });
}
