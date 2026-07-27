import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  defaultRepoRoot,
  evaluatePhotoKnowledge
} from "./lib.mjs";

function source(relativePath) {
  return readFileSync(path.join(defaultRepoRoot, relativePath), "utf8");
}

function replace(relativePath, before, after) {
  return {
    [relativePath]: source(relativePath).replace(before, after)
  };
}

test("the East River canary and living loop pass deterministically", () => {
  const result = evaluatePhotoKnowledge();
  assert.deepEqual(result.failures, []);
  assert.equal(result.status, "IMPLEMENTING-PASS");
});

test("every displayed photograph requires a governed occurrence", () => {
  const file = "apps/www/src/data/photography.ts";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      'wikiId: "asset.photo.raft-in-fog.waterways"',
      'wikiId: "asset.photo.raft-in-fog.ungoverned"'
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.all_displayed_photographs_are_governed,
    false
  );
});

test("the portfolio edition cannot omit a displayed occurrence", () => {
  const file =
    "docs/knowledge-bank/projections/photography/layout-d-portfolio-edition.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "  - projection.photo.layout-d.home.raft-in-fog\n",
      ""
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.all_displayed_photographs_are_governed,
    false
  );
});

test("a missing derivative fails closed", () => {
  const result = evaluatePhotoKnowledge({
    assetOverrides: {
      "apps/www/public/images/field-notes/jamie-east-river.webp": null
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.derivative_is_exact_and_metadata_minimized,
    false
  );
});

test("modified pixels fail the checksum contract", () => {
  const relativePath =
    "apps/www/public/images/field-notes/jamie-east-river.webp";
  const original = readFileSync(path.join(defaultRepoRoot, relativePath));
  const mutated = Buffer.from(original);
  mutated[mutated.length - 1] ^= 0xff;
  const result = evaluatePhotoKnowledge({
    assetOverrides: { [relativePath]: mutated },
    skipGenerated: true
  });
  assert.equal(
    result.checks.derivative_is_exact_and_metadata_minimized,
    false
  );
});

test("embedded metadata fails closed", () => {
  const relativePath =
    "apps/www/public/images/field-notes/jamie-east-river.webp";
  const original = readFileSync(path.join(defaultRepoRoot, relativePath));
  const result = evaluatePhotoKnowledge({
    assetOverrides: {
      [relativePath]: Buffer.concat([
        original,
        Buffer.from("Exif\0\0", "binary")
      ])
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.derivative_is_exact_and_metadata_minimized,
    false
  );
});

test("an unknown statement source fails provenance", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "source.permission.elana-gordon.east-river.2026-07",
      "source.permission.unknown"
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.statement_provenance_and_creator_correction_are_valid,
    false
  );
});

test("creator correction cannot erase the deprecated prior state", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "rank: deprecated",
      "rank: preferred"
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.statement_provenance_and_creator_correction_are_valid,
    false
  );
});

test("permission cannot silently expand to unrelated uses", () => {
  const file =
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "future_unrelated_uses: not-granted",
      "future_unrelated_uses: granted"
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.permission_capsule_is_bounded, false);
});

test("reported permission cannot become automated clearance", () => {
  const file =
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "status: reported-granted",
      "status: granted"
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.permission_capsule_is_bounded, false);
});

test("revoked permission fails the active occurrence closed", () => {
  const file =
    "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "status: reported-granted",
      "status: revoked"
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.permission_capsule_is_bounded, false);
  assert.equal(result.checks.human_gates_remain_open, false);
});

test("global clearance labels conflict with open human gates", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file)
        .replace(
          "rights_state: permission-needed",
          "rights_state: cleared"
        )
        .replace(
          "consent_state: review-needed",
          "consent_state: cleared"
        )
        .replace(
          "public_display_status: hold",
          "public_display_status: cleared"
        )
    },
    skipGenerated: true
  });
  assert.equal(result.checks.permission_capsule_is_bounded, false);
  assert.equal(result.checks.human_gates_remain_open, false);
});

test("credit must follow the preferred creator statement", () => {
  const file =
    "docs/knowledge-bank/projections/photography/layout-d-home-east-river.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "Photograph by Elana Gordon.",
      "Photograph by Jamie Burkart."
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.caption_and_credit_assertions_resolve,
    false
  );
});

test("staging cannot confer production and indexing approval", () => {
  const file =
    "docs/knowledge-bank/projections/photography/layout-d-home-east-river.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file)
        .replace("production: open", "production: approved")
        .replace("indexing: open", "indexing: approved")
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.occurrence_is_destination_bound_and_reversible,
    false
  );
  assert.equal(result.checks.human_gates_remain_open, false);
});

test("the governed crop must drive the rendered hero", () => {
  const file = "apps/www/src/data/photography.ts";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      'mobileObjectPosition: "70% 50%"',
      'mobileObjectPosition: "42% 50%"'
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.application_manifest_resolves_to_wiki,
    false
  );
});

test("a recollection cannot activate its own public projection", () => {
  const file =
    "docs/knowledge-bank/sources/recollections/jamie-canoe-commuting-2026-07.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file)
        .replace("status: hold", "status: active")
        .replace("surfaces: []", "surfaces: [homepage]")
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.recollection_remains_dated_and_non_projecting,
    false
  );
});

test("an oral-history inquiry cannot activate its own public projection", () => {
  const file =
    "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file)
        .replace("publication_status: hold", "publication_status: ready")
        .replace("surfaces: []", "surfaces: [homepage]")
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.oral_history_inquiry_is_bounded_and_non_projecting,
    false
  );
});

test("an oral-history inquiry cannot convert metadata into project fact", () => {
  const file =
    "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file).replace(
        "The photograph establishes the project, place, or date.",
        "The photograph establishes the KC Town Hall project in November 2018."
      )
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.oral_history_inquiry_is_bounded_and_non_projecting,
    false
  );
});

test("an oral-history inquiry cannot promote recollection to collective fact", () => {
  const file =
    "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file).replace(
        "Jamie's recollection alone confirms an institutional or collective outcome.",
        "Jamie's recollection confirms the project's collective outcome."
      )
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.oral_history_inquiry_is_bounded_and_non_projecting,
    false
  );
});

test("an agency-hosted meeting cannot become a coalition-owned event", () => {
  const file =
    "docs/knowledge-bank/events/nyc-diy-spaces-post-ghost-ship-dcla-2017-01-27.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "The Department of Cultural Affairs hosted the official meeting",
      "NYC Artist Coalition hosted the official meeting"
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.formation_and_host_boundaries_are_preserved,
    false
  );
});

test("the DCLA participatory vote cannot be relabeled as RCV", () => {
  const file =
    "docs/knowledge-bank/research-runs/nycac-dcla-photograph-source-return-2026-07.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "The February 6 selection was a participatory vote, not ranked-choice voting.",
      "The February 6 selection used ranked-choice voting."
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.formation_and_host_boundaries_are_preserved,
    false
  );
});

test("a photographed identity cannot become quotation or consent", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/nycac-dcla-listening-room-2017.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "Identity is not a photographer credit, quotation, endorsement, or consent grant.",
      "Identity confirms the quotation, endorsement, and consent grant."
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.source_return_records_are_bounded, false);
});

test("adjacent DCLA frames cannot be collapsed into one visual record", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/nycac-dcla-listening-room-2017.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "The committed derivative is a different frame from the blue-jacket, rear-view image that initiated the oral-history return; visible observations must not be merged across frames.",
      "The committed derivative and the oral-history image are the same frame."
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.source_return_records_are_bounded, false);
});

test("a KC Town Hall recollection cannot confirm every construction duty", () => {
  const file =
    "docs/knowledge-bank/sources/recollections/kc-town-hall-hardhat-oral-history-2026-07.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "The recollection independently confirms every construction responsibility or project outcome.",
      "The recollection confirms every construction responsibility and project outcome."
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.source_return_records_are_bounded, false);
});

test("archive custody cannot silently become photographer credit", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/kc-town-hall-collaborator-worksite-2018.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "Archive custody establishes copyright or creator credit.",
      "Archive custody establishes the photographer and copyright."
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.source_return_records_are_bounded, false);
});

test("a Council backdrop cannot become institutional adoption", () => {
  const file =
    "docs/knowledge-bank/research-inquiries/nyc-council-commercial-rent-fieldwork-source-return.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "Presence at 250 Broadway establishes Council employment, endorsement, or adoption.",
      "Presence at 250 Broadway establishes Council endorsement and adoption."
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.source_return_records_are_bounded, false);
});

test("modified proposal pixels fail the public-safe derivative contract", () => {
  const relativePath =
    "apps/www/public/artifacts/kc-town-hall/proposal-rendering.webp";
  const original = readFileSync(path.join(defaultRepoRoot, relativePath));
  const mutated = Buffer.from(original);
  mutated[mutated.length - 1] ^= 0xff;
  const result = evaluatePhotoKnowledge({
    assetOverrides: { [relativePath]: mutated },
    skipGenerated: true
  });
  assert.equal(result.checks.proposal_derivative_is_public_safe, false);
});

test("Knowledge Wiki cannot regress to Knowledge Bank as the current product name", () => {
  const file = "README.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "## Knowledge Wiki",
      "## Knowledge Bank"
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.knowledge_wiki_name_and_aliases_are_canonical,
    false
  );
});

test("a private photo identifier fails the oral-history inquiry boundary", () => {
  const file =
    "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: `${source(file)}\nPrivate photo: 2bf11f72-b335-4091-97da-a078cb6766fe\n`
    },
    skipGenerated: true
  });
  assert.equal(
    result.checks.oral_history_inquiry_is_bounded_and_non_projecting,
    false
  );
  assert.equal(result.checks.private_material_is_absent, false);
});

test("a private source path fails the trust boundary", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: `${source(file)}\nPrivate source: /Volumes/example/Jamie.photoslibrary\n`
    },
    skipGenerated: true
  });
  assert.equal(result.checks.private_material_is_absent, false);
});

test("protected absence cannot acquire a hidden asset", () => {
  const file =
    "docs/knowledge-bank/projections/photography/layout-d-resume-protected-absence.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: {
      [file]: source(file).replace(
        "route: /resume",
        "route: /resume\nasset: asset.photo.east-river-manhattan-bridge.2022.001"
      )
    },
    skipGenerated: true
  });
  assert.equal(result.checks.protected_absence_is_governed, false);
});

test("the simulated panel notice cannot be removed", () => {
  const file =
    "docs/knowledge-bank/evaluations/curatorial/layout-d-home-east-river-v1.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(file, "simulation_notice: true", "simulation_notice: false"),
    skipGenerated: true
  });
  assert.equal(
    result.checks.curatorial_process_preserves_artistic_authority,
    false
  );
});

test("score or RCV authority fails the artistic contract", () => {
  const file =
    "docs/knowledge-bank/evaluations/curatorial/layout-d-home-east-river-v1.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "An aggregate score, vote, or RCV selected or published the image.",
      "An aggregate score, vote, or RCV selected and published the image."
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.curatorial_process_preserves_artistic_authority,
    false
  );
});

test("a fabricated verified binding fails without changing the human gate", () => {
  const file =
    "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "status: pending-independent-verification",
      "status: verified"
    ),
    skipGenerated: true
  });
  assert.equal(result.checks.private_material_is_absent, false);
  assert.equal(result.checks.human_gates_remain_open, false);
});

test("feedback correction cannot erase the rejected clearance state", () => {
  const file =
    "docs/knowledge-bank/corrections/photography/east-river-clearance-scope-2026-07.md";
  const result = evaluatePhotoKnowledge({
    sourceOverrides: replace(
      file,
      "rights_state: cleared",
      "rights_state: unknown"
    ),
    skipGenerated: true
  });
  assert.equal(
    result.checks.feedback_correction_is_append_only_and_fail_closed,
    false
  );
});
