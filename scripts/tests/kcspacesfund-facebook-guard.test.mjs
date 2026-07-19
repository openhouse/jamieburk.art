import assert from "node:assert/strict";
import test from "node:test";
import { hasKcSpacesFundFacebookPublicArtifactRisk } from "../lib/kcspacesfund-facebook-guard.mjs";

const prohibited = [
  "This is the complete KC Spaces Fund Facebook history.",
  "The ledger contains every post ever published by KC Spaces Fund.",
  "KC Spaces Fund published only 40 Facebook posts.",
  "The 40 records are the entire lifetime Page archive.",
  "Jamie posted the KC Spaces Fund Facebook record.",
  "Jamie owned the KC Spaces Fund Page.",
  "Jamie administered the KC Spaces Fund account.",
  "Jamie organized KC Spaces Fund.",
  "Jamie ran the fundraiser for KC Spaces Fund.",
  "Jamie made KC Spaces Fund grant decisions.",
  "Jamie was the KC Spaces Fund fiscal sponsor.",
  "The 119 reactions prove public reach.",
  "Facebook comments demonstrate stakeholder endorsement.",
  "The visible interactions establish campaign impact.",
  "Jamie created the uniform KC Spaces Fund identity across every platform.",
  "Jamie selected the available KC Spaces Fund name.",
  "Jamie raised $9,590 for KC Spaces Fund.",
  "The ten spotlights are the complete grantee population.",
  "KC Spaces Fund awarded ten grants.",
];

for (const statement of prohibited) {
  test(`rejects KC Spaces Fund regression: ${statement}`, () => {
    assert.equal(hasKcSpacesFundFacebookPublicArtifactRisk(statement), true);
  });
}

const bounded = [
  "The 40-card ledger covers the surviving public Page surface, not a native Meta export or deletion history.",
  "The result is bounded to the current Page and is not a native Meta owner export or deletion history.",
  "The public ledger omits full post transcripts, personal identities, and authenticated state.",
  "Deleted or unrendered KC Spaces Fund Facebook records may still be missing.",
  "Jamie did not post the KC Spaces Fund Facebook record.",
  "No reviewed source assigns Jamie KC Spaces Fund Page ownership.",
  "Do not frame Jamie as a KC Spaces Fund organizer or grant decision-maker.",
  "The 119 visible reaction-signal floor is not unique people, reach, endorsement, conversion, or impact.",
  "Jamie recalls supporting the naming search; the contribution remains first-person memory pending corroboration.",
  "The uniform public identity does not establish individual naming authorship.",
  "The fundraiser displays $9,590; the collective result is not attributed to Jamie.",
  "Ten Page spotlight records are not a complete grantee population or verified award count.",
];

for (const statement of bounded) {
  test(`allows bounded KC Spaces Fund wording: ${statement}`, () => {
    assert.equal(hasKcSpacesFundFacebookPublicArtifactRisk(statement), false);
  });
}
