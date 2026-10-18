import assert from "node:assert/strict";
import test from "node:test";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { recentDeliveryContracts } from "../../apps/www/src/data/knowledge-bank/recent-delivery-2026-10.ts";
import { getClaimProjection, publicCitationRegistry } from "../../apps/www/src/data/knowledge-bank/public.ts";

// Dynamic loading makes a missing implementation an explicit contract failure,
// rather than mistaking an import error for the behavior being tested.
const implementation = await import("../lib/recent-delivery.mjs").catch((error) => {
  if (error.code === "ERR_MODULE_NOT_FOUND") return {};
  throw error;
});

function validate(candidate) {
  assert.equal(typeof implementation.validateRecentDelivery, "function", "recent-delivery validator must exist");
  return implementation.validateRecentDelivery(candidate);
}

function candidate() {
  return {
    contracts: [{
      claimId: "CLM-SYNTHETIC-HANDOFF",
      eventDate: "2026-10-07",
      evidenceAsOf: "2026-10-08",
      recordedAt: "2026-10-18",
      observedStates: ["created", "proof-checked", "delivered"],
      publicStates: ["proof-checked", "delivered"],
      creditScope: "jamie-contribution",
      publicationScope: "text-only",
      allowedSurfaces: ["technical-operations"],
      sourceIds: ["SRC-SYNTHETIC-HANDOFF"]
    }],
    claims: [{
      id: "CLM-SYNTHETIC-HANDOFF",
      status: "confirmed-with-boundary",
      evidence: [{ sourceId: "SRC-SYNTHETIC-HANDOFF", renderCitation: true }],
      projections: [{
        key: "technical-operations",
        text: "Jamie prepared a checked proof and returned edited files for review.",
        status: "active",
        citationRequired: true,
        surfaces: ["technical-operations"]
      }]
    }],
    sources: [{
      id: "SRC-SYNTHETIC-HANDOFF",
      visibility: "public-metadata-only",
      media: { rightsStatus: "permission-needed", consentStatus: "review-needed", publicDisplayStatus: "hold" }
    }],
    pages: [{
      id: "synthetic-page",
      surface: "technical-operations",
      occurrences: [{ claimId: "CLM-SYNTHETIC-HANDOFF", projection: "technical-operations", sourceIds: ["SRC-SYNTHETIC-HANDOFF"] }]
    }]
  };
}

test("source-bounded delivery may be projected as text while media rights remain held", () => {
  const result = validate(candidate());
  assert.equal(result.pass, true, result.errors.join("\n"));
});

const mutations = [
  ["scheduled does not imply occurred", (c) => { c.contracts[0].observedStates = ["scheduled"]; c.contracts[0].publicStates = ["occurred"]; }],
  ["delivered does not imply accepted", (c) => { c.contracts[0].publicStates.push("accepted"); }],
  ["proof checked does not imply installed", (c) => { c.contracts[0].publicStates.push("installed"); }],
  ["delivery does not imply paid", (c) => { c.contracts[0].publicStates.push("paid"); }],
  ["created does not imply published", (c) => { c.contracts[0].publicStates.push("published"); }],
  ["recording date cannot replace a later unsupported occurrence date", (c) => { c.contracts[0].eventDate = "2026-10-18"; }],
  ["evidence cannot be observed after it was recorded", (c) => { c.contracts[0].evidenceAsOf = "2026-10-19"; }],
  ["calendar-invalid evidence dates fail", (c) => { c.contracts[0].evidenceAsOf = "2026-02-30"; }],
  ["occurrence claims need an event date distinct from unknown", (c) => { c.contracts[0].eventDate = null; c.contracts[0].observedStates.push("occurred"); c.contracts[0].publicStates.push("occurred"); }],
  ["source binding cannot silently change to an unrelated source", (c) => { c.contracts[0].sourceIds = ["SRC-UNRELATED"]; }],
  ["source binding must reach canonical claim evidence", (c) => { c.claims[0].evidence = []; }],
  ["active projections cannot leave approved surfaces", (c) => { c.claims[0].projections[0].surfaces.push("homepage"); }],
  ["public source projections cannot lose required citations", (c) => { c.sources[0].visibility = "public"; c.sources[0].canonicalUrl = "https://example.test/public-article"; c.claims[0].projections[0].citationRequired = false; }],
  ["held projections cannot remain attached to a public page", (c) => { c.claims[0].projections[0].status = "hold"; c.claims[0].projections[0].surfaces = []; }],
  ["private evidence URLs cannot be made public by a text-only contract", (c) => { c.sources[0].canonicalUrl = "https://example.test/private-source"; }],
  ["held media cannot become a public asset", (c) => { c.sources[0].assetUrl = "https://example.test/uncleared-photo.jpg"; }],
  ["text-only scope cannot authorize media projection", (c) => { c.claims[0].projections[0].key = "photo-caption"; }],
  ["public release scope cannot silently expand", (c) => { c.contracts[0].publicationScope = "media-and-text"; }],
  ["shared work cannot acquire sole credit", (c) => { c.contracts[0].creditScope = "shared"; c.claims[0].projections[0].text = "Jamie single-handedly delivered the entire exhibition."; }],
  ["canonical text cannot claim acceptance absent observed acceptance", (c) => { c.claims[0].projections[0].text = "The client accepted the deliverables."; }],
  ["canonical text cannot claim installation absent observed installation", (c) => { c.claims[0].projections[0].text = "The panels were installed at the exhibition."; }],
  ["canonical text cannot claim payment absent observed payment", (c) => { c.claims[0].projections[0].text = "Jamie was paid for the completed work."; }],
  ["canonical text cannot claim occurrence from a schedule", (c) => { c.contracts[0].observedStates = ["scheduled"]; c.contracts[0].publicStates = ["scheduled"]; c.claims[0].projections[0].text = "The workshop took place on October 7."; }],
  ["a neighboring rights hold cannot mask affirmative acceptance", (c) => { c.claims[0].projections[0].text = "Rights are not established but the client accepted the files."; }],
  ["a neighboring rights hold cannot mask affirmative installation", (c) => { c.claims[0].projections[0].text = "The panels were installed and rights are not established."; }],
  ["ordinary held-its-meeting grammar cannot turn a schedule into occurrence", (c) => { c.contracts[0].observedStates = ["scheduled"]; c.contracts[0].publicStates = ["scheduled"]; c.claims[0].projections[0].text = "The coalition held its October meeting."; }],
  ["duplicate contracts cannot split authority for the same claim", (c) => { c.contracts.push(structuredClone(c.contracts[0])); }],
  ["empty contracts cannot silently validate no reviewed work", (c) => { c.contracts = []; }],
  ["unknown states cannot masquerade as stronger evidence", (c) => { c.contracts[0].observedStates.push("all-approved"); }]
];

for (const [name, mutate] of mutations) {
  test(name, () => {
    const c = candidate();
    mutate(c);
    const result = validate(c);
    assert.equal(result.pass, false, name);
    assert.ok(result.errors.length > 0, "a failed gate must explain its boundary");
  });
}

test("a future scheduled event stays valid without claiming it occurred", () => {
  const c = candidate();
  c.contracts[0].eventDate = "2026-11-01";
  c.contracts[0].observedStates = ["scheduled"];
  c.contracts[0].publicStates = ["scheduled"];
  c.claims[0].projections[0].text = "A workshop is scheduled for November 1.";
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

test("explicit boundary wording is not mistaken for an affirmative outcome", () => {
  const c = candidate();
  c.claims[0].projections[0].text = "Files were delivered; client acceptance, installation, payment, and publication are not established.";
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

test("a later source return can establish delivery without inventing acceptance", () => {
  const c = candidate();
  c.contracts[0].observedStates = ["delivered"];
  c.contracts[0].publicStates = ["delivered"];
  c.claims[0].projections[0].text = "The latest source return establishes that files were delivered for review.";
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

test("observed publication can retain an unknown exact publication date", () => {
  const c = candidate();
  c.contracts[0].eventDate = null;
  c.contracts[0].observedStates = ["published"];
  c.contracts[0].publicStates = ["published"];
  c.claims[0].projections[0].text = "The public article includes the animation.";
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

test("a text-only claim may retain a nonrendering protected source relationship", () => {
  const c = candidate();
  c.claims[0].evidence[0].renderCitation = false;
  c.claims[0].projections[0].citationRequired = false;
  c.pages = [];
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

function canonicalCandidate() {
  return structuredClone({ contracts: recentDeliveryContracts, claims: knowledgeBank.claims, sources: knowledgeBank.sources, pages: knowledgeBank.pages, agencyRelations: knowledgeBank.agencyRelations, entities: knowledgeBank.entities });
}

function platformCandidate() {
  const c = candidate();
  c.contracts[0].eventDate = null;
  c.contracts[0].observedStates = ["published"];
  c.contracts[0].publicStates = ["published"];
  c.contracts[0].platformCollaboration = {
    sourceId: "SRC-SYNTHETIC-HANDOFF", relationId: "REL-SYNTHETIC-POST-COLLABORATORS",
    actorIds: ["ENT-SYNTHETIC-ARTIST", "ENT-SYNTHETIC-INSTITUTION"], objectId: "ENT-SYNTHETIC-POST"
  };
  c.sources[0].visibility = "public";
  c.sources[0].supportsGenerally = ["platform-listed collaborators"];
  c.claims[0].evidence[0].supports = ["platform-listed collaborators"];
  c.claims[0].projections[0] = {
    key: "archive-note", text: "The post lists two accounts as collaborators.",
    status: "hold", citationRequired: true, surfaces: []
  };
  c.pages = [];
  c.entities = [
    { id: "ENT-SYNTHETIC-ARTIST", publicSafe: true },
    { id: "ENT-SYNTHETIC-INSTITUTION", publicSafe: true },
    { id: "ENT-SYNTHETIC-POST", publicSafe: true }
  ];
  c.agencyRelations = [{
    id: "REL-SYNTHETIC-POST-COLLABORATORS", actorIds: ["ENT-SYNTHETIC-ARTIST", "ENT-SYNTHETIC-INSTITUTION"],
    action: "listed-as-post-collaborator", objectId: "ENT-SYNTHETIC-POST", creditScope: "shared",
    claimIds: ["CLM-SYNTHETIC-HANDOFF"], sourceIds: ["SRC-SYNTHETIC-HANDOFF"],
    sourceSupportKeys: ["platform-listed collaborators"]
  }];
  return c;
}

test("platform-listed collaboration can remain held graph context without a public projection", () => {
  const result = validate(platformCandidate());
  assert.equal(result.pass, true, result.errors.join("\n"));
});

// Each mutation removes a specific provenance or attribution boundary. The real
// validator must reject it; platform metadata cannot supply stronger authority.
const platformMutations = [
  ["missing relation cannot establish platform collaboration", (c) => { c.agencyRelations = []; }],
  ["ambiguous duplicate relation cannot establish platform collaboration", (c) => { c.agencyRelations.push(structuredClone(c.agencyRelations[0])); }],
  ["co-creation cannot substitute for a platform collaborator listing", (c) => { c.agencyRelations[0].action = "co-created"; }],
  ["platform collaboration cannot silently acquire individual credit", (c) => { c.agencyRelations[0].creditScope = "individual"; }],
  ["platform relation cannot bind an unrelated claim", (c) => { c.agencyRelations[0].claimIds = ["CLM-UNRELATED"]; }],
  ["platform relation cannot bind an unrelated source", (c) => { c.agencyRelations[0].sourceIds = ["SRC-UNRELATED"]; }],
  ["platform contract cannot select an unbound source", (c) => { c.contracts[0].platformCollaboration.sourceId = "SRC-UNRELATED"; }],
  ["platform relation requires known actors", (c) => { c.agencyRelations[0].actorIds.push("ENT-UNKNOWN"); }],
  ["a known but unreviewed actor cannot replace a listed collaborator", (c) => { c.agencyRelations[0].actorIds[1] = "ENT-SYNTHETIC-POST"; }],
  ["platform relation cannot duplicate an actor", (c) => { c.agencyRelations[0].actorIds.push("ENT-SYNTHETIC-ARTIST"); }],
  ["platform relation cannot omit its actor roster", (c) => { c.agencyRelations[0].actorIds = []; }],
  ["platform relation requires a known post object", (c) => { c.agencyRelations[0].objectId = "ENT-UNKNOWN"; }],
  ["a known but different object cannot replace the reviewed post", (c) => { c.agencyRelations[0].objectId = "ENT-SYNTHETIC-ARTIST"; }],
  ["expected platform roster cannot omit its actor binding", (c) => { delete c.contracts[0].platformCollaboration.actorIds; }],
  ["expected platform roster cannot contain duplicate actors", (c) => { c.contracts[0].platformCollaboration.actorIds.push("ENT-SYNTHETIC-ARTIST"); }],
  ["expected platform roster cannot be malformed", (c) => { c.contracts[0].platformCollaboration.actorIds = "ENT-SYNTHETIC-ARTIST"; }],
  ["expected platform roster cannot be empty", (c) => { c.contracts[0].platformCollaboration.actorIds = []; }],
  ["expected platform post binding cannot be empty", (c) => { c.contracts[0].platformCollaboration.objectId = ""; }],
  ["expected platform post binding cannot be absent", (c) => { delete c.contracts[0].platformCollaboration.objectId; }],
  ["unrelated support cannot replace the observed listing", (c) => { c.agencyRelations[0].sourceSupportKeys = ["authorship"]; }],
  ["the source must support the platform listing", (c) => { c.sources[0].supportsGenerally = ["authorship"]; }],
  ["claim evidence must support the platform listing", (c) => { c.claims[0].evidence[0].supports = ["authorship"]; }]
];

for (const [name, mutate] of platformMutations) {
  test(name, () => {
    const c = platformCandidate();
    mutate(c);
    const result = validate(c);
    assert.equal(result.pass, false, name);
    assert.ok(result.errors.length > 0);
  });
}

test("the same reviewed platform roster can appear in a different order", () => {
  const c = platformCandidate();
  c.agencyRelations[0].actorIds.reverse();
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

function projectPlatformText(c, text) {
  c.claims[0].projections[0].status = "active";
  c.claims[0].projections[0].surfaces = ["technical-operations"];
  c.claims[0].projections[0].text = text;
}

for (const text of [
  "The listed institutions endorsed the campaign.",
  "The listing proves institutional endorsement.",
  "The cultural agency commissioned Jamie's animation.",
  "The six accounts co-created the animation.",
  "The platform listing establishes sole authorship of the film.",
  "Endorsement is not established, but the cultural agency commissioned the film."
]) {
  test(`platform listing cannot justify stronger projected authority: ${text}`, () => {
    const c = platformCandidate();
    projectPlatformText(c, text);
    assert.equal(validate(c).pass, false);
  });
}

test("explicit limits on platform collaboration remain legitimate neighboring prose", () => {
  const c = platformCandidate();
  projectPlatformText(c, "The post lists two accounts as collaborators. This does not establish endorsement, commissioning or sole authorship.");
  const result = validate(c);
  assert.equal(result.pass, true, result.errors.join("\n"));
});

for (const text of [
  "The arts commission is listed as a collaborator on the post.",
  "A collaborator listing is not an endorsement.",
  "No endorsement is established by the collaborator listing."
]) {
  test(`platform attribution gate preserves a legitimate neighboring statement: ${text}`, () => {
    const c = platformCandidate();
    projectPlatformText(c, text);
    const result = validate(c);
    assert.equal(result.pass, true, result.errors.join("\n"));
  });
}

test("a platform listing does not clear held media for public display", () => {
  const c = platformCandidate();
  c.sources[0].assetUrl = "https://example.test/uncleared-video.mp4";
  assert.equal(validate(c).pass, false);
});

test("a platform source without any rights record cannot expose an asset URL", () => {
  const c = platformCandidate();
  delete c.sources[0].media;
  c.sources[0].assetUrl = "https://example.test/unreviewed-video.mp4";
  assert.equal(validate(c).pass, false);
});

test("Red Hook delivery observation does not invent an exact delivery date", () => {
  const contract = recentDeliveryContracts.find((item) => item.claimId === "CLM-RECENT-RED-HOOK-2026-10");
  assert.equal(contract.eventDate, null);
  assert.equal(contract.evidenceAsOf, "2026-10-07");
  const text = knowledgeBank.claims.find((item) => item.id === contract.claimId).projections[0].text;
  assert.match(text, /By October 7, 2026/);
  assert.doesNotMatch(text, /delivered[^.]*on October 7/);
});

test("canonical recent-delivery contracts resolve to their active source-bound projections", () => {
  const result = validate(canonicalCandidate());
  assert.equal(result.pass, true, result.errors.join("\n"));
});

for (const contract of recentDeliveryContracts) {
  test(`public registry can render approved text for ${contract.claimId}`, () => {
    const claim = knowledgeBank.claims.find((item) => item.id === contract.claimId);
    for (const projection of claim.projections.filter((item) => item.status === "active")) {
      for (const surface of projection.surfaces) {
        assert.equal(getClaimProjection(claim.id, projection.key, surface).text, projection.text);
      }
    }
    for (const sourceId of contract.sourceIds) {
      const source = knowledgeBank.sources.find((item) => item.id === sourceId);
      if (source.visibility === "protected") {
        assert.equal(publicCitationRegistry.sources.some((item) => item.id === sourceId), false);
        assert.equal(publicCitationRegistry.claims.find((item) => item.id === claim.id).evidence.some((item) => item.sourceId === sourceId), false);
      }
    }
  });
}

test("canonical delivery cannot be promoted to acceptance through prose alone", () => {
  const c = canonicalCandidate();
  const contract = c.contracts.find((item) => item.publicStates.includes("delivered") && !item.publicStates.includes("accepted"));
  assert.ok(contract, "fixture must contain a delivery with acceptance unresolved");
  const claim = c.claims.find((item) => item.id === contract.claimId);
  claim.projections.find((item) => item.status === "active").text += " The client accepted the final work.";
  assert.equal(validate(c).pass, false);
});

test("canonical source-only publication does not confer media rights", () => {
  const c = canonicalCandidate();
  const contract = c.contracts.find((item) => item.publicStates.includes("published"));
  assert.ok(contract, "fixture must contain observed publication");
  const claim = c.claims.find((item) => item.id === contract.claimId);
  claim.projections.find((item) => item.status === "active").key = "photo-caption";
  assert.equal(validate(c).pass, false);
});

test("canonical shared credit cannot silently become sole event production", () => {
  const c = canonicalCandidate();
  const contract = c.contracts.find((item) => item.creditScope === "shared");
  assert.ok(contract, "fixture must contain shared work");
  const claim = c.claims.find((item) => item.id === contract.claimId);
  claim.projections.find((item) => item.status === "active").text = "Jamie alone produced the event.";
  assert.equal(validate(c).pass, false);
});
