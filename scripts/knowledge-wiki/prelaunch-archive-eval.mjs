import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync
} from "node:fs";
import path from "node:path";

import { defaultRepoRoot } from "./lib.mjs";

function json(relativePath) {
  return JSON.parse(
    readFileSync(path.join(defaultRepoRoot, relativePath), "utf8")
  );
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function evaluatePrelaunchArchive({ result }) {
  const inventory = json(
    "docs/knowledge-bank/data/campaign-site-photo-inventory-2026-07.json"
  );
  const hearingManifest = json(
    "docs/knowledge-bank/data/public-hearing-events-2026-07.json"
  );
  const ledgers = hearingManifest.events.map((event) =>
    json(`docs/knowledge-bank/data/public-hearing-speakers/${event.ledgerFile}`)
  );
  const transcriptTexts = hearingManifest.events.map((event) =>
    readFileSync(
      path.join(
        defaultRepoRoot,
        "docs/knowledge-bank/data/public-hearing-transcripts",
        event.transcriptFile
      ),
      "utf8"
    )
  );
  const commercialManifest = json(
    "docs/knowledge-bank/data/commercial-rent-events-2026-07.json"
  );
  const commercialTranscriptRecords = commercialManifest.records.filter(
    (record) => record.transcriptFile
  );
  const commercialLedgers = commercialTranscriptRecords.map((record) =>
    json(`docs/knowledge-bank/data/commercial-rent-speakers/${record.ledgerFile}`)
  );
  const commercialTranscriptTexts = commercialTranscriptRecords.map((record) =>
    readFileSync(
      path.join(
        defaultRepoRoot,
        "docs/knowledge-bank/data/commercial-rent-transcripts",
        record.transcriptFile
      ),
      "utf8"
    )
  );
  const commercialWritten = json(
    "docs/knowledge-bank/data/commercial-rent-written-support/commercial-rent-written-support-2021.json"
  );
  const publicSupportManifest = json(
    "docs/knowledge-bank/data/commercial-rent-public-events-2026-07.json"
  );
  const publicSupportSpeeches = publicSupportManifest.events.flatMap((event) =>
    event.speakers.map((speaker) => {
      const text = readFileSync(
        path.join(
          defaultRepoRoot,
          "docs/knowledge-bank/data/commercial-rent-public-support-speeches",
          speaker.transcriptFile
        ),
        "utf8"
      );
      return { ...speaker, event, text };
    })
  );
  const campaignAssets = result.records.filter((record) =>
    record.id.startsWith("asset.campaign-photo.")
  );
  const publicCorpusText = [
    JSON.stringify(inventory),
    JSON.stringify(hearingManifest),
    JSON.stringify(commercialManifest),
    JSON.stringify(publicSupportManifest),
    ...ledgers.map((ledger) => JSON.stringify(ledger)),
    ...commercialLedgers.map((ledger) => JSON.stringify(ledger)),
    JSON.stringify(commercialWritten),
    ...publicSupportSpeeches.map((speaker) => speaker.text)
  ].join("\n");
  const privatePathPattern =
    /\/(?:Users|Volumes|private\/tmp|var\/folders)\/|[A-Za-z]:\\Users\\/;

  const actionLabClaim = result.byId.get(
    "claim.action-lab.prepublication-review.2026"
  );
  const currentWorkSources = [
    result.byId.get("source.action-lab.prepublication-review-summary.2026-07"),
    result.byId.get("source.private-coaching.chad-berkowitz.2026-07"),
    result.byId.get("source.jamie.commercial-rent-speech-rehearsal.2026-07")
  ];
  const costPackage = json("package.json");
  const costDocPath = path.join(
    defaultRepoRoot,
    "docs/qa/cost-aware-evaluation-ladder.md"
  );
  const costDoc = existsSync(costDocPath)
    ? readFileSync(costDocPath, "utf8")
    : "";

  const allowedPositions = new Set([
    "explicit-support",
    "explicit-support-with-caveat",
    "mixed-or-multiple-issues",
    "explicit-opposition",
    "alignment-review-needed",
    "context",
    "procedural-or-unattributed"
  ]);

  const checks = {
    campaign_photo_population_closed:
      inventory.sites.length === 6 &&
      inventory.totals.candidateOccurrences === 529 &&
      inventory.totals.photographOccurrences === 213 &&
      inventory.totals.distinctPhotographs === 153 &&
      inventory.totals.recoveredPhotographs === 139 &&
      inventory.totals.unrecoveredPublicPhotographs === 14,
    campaign_photo_assets_metadata_only:
      campaignAssets.length === 153 &&
      campaignAssets.every(
        (asset) =>
          asset.rights_state === "cleared" &&
          asset.consent_state === "review-needed" &&
          asset.public_display_status === "metadata-only" &&
          asset.projection?.status === "hold" &&
          asset.projection.surfaces.length === 0
      ),
    campaign_photo_human_gates_open:
      campaignAssets.every((asset) => {
        const source = readFileSync(
          path.join(defaultRepoRoot, asset.path),
          "utf8"
        );
        return [
          "creator credit",
          "consent",
          "caption",
          "crop",
          "editorial",
          "deployment",
          "indexing"
        ].every((term) => source.toLowerCase().includes(term));
      }),
    hearing_corpus_complete:
      hearingManifest.events.length === 6 &&
      ledgers.length === 6 &&
      ledgers.every(
        (ledger) =>
          ledger.closure.pageCount > 0 &&
          ledger.closure.turnCount > 0 &&
          ledger.closure.speakerCount > 0 &&
          ledger.closure.jamieTranscriptRecovered &&
          ledger.closure.allParsedTurnsAssignedToSpeaker
      ),
    hearing_transcript_integrity:
      ledgers.every(
        (ledger, index) =>
          ledger.source.transcriptSha256 === sha256(transcriptTexts[index]) &&
          transcriptTexts[index].length > 1000 &&
          ledger.source.officialUrl.startsWith(
            "https://legistar.council.nyc.gov/"
          )
      ),
    hearing_attribution_closed:
      ledgers.every(
        (ledger) =>
          ledger.speakers.length === ledger.closure.speakerCount &&
          ledger.speakers.every(
            (speaker) =>
              speaker.speaker &&
              speaker.transcriptLabels.length > 0 &&
              speaker.turns.length > 0 &&
              speaker.turns.every(
                (turn) =>
                  turn.speaker === speaker.speaker &&
                  turn.transcriptPage > 0 &&
                  turn.text.length > 0
              )
          )
      ),
    hearing_positions_bounded:
      ledgers.every(
        (ledger) =>
          ledger.method.warning.includes("not quotations") &&
          ledger.speakers.every(
            (speaker) =>
              allowedPositions.has(speaker.position) &&
              speaker.basis.length > 0
          )
      ),
    commercial_rent_corpus_complete:
      commercialManifest.records.length === 4 &&
      commercialLedgers.length === 3 &&
      commercialLedgers.every(
        (ledger) =>
          ledger.closure.pageCount > 0 &&
          ledger.closure.turnCount > 0 &&
          ledger.closure.speakerCount > 0 &&
          ledger.closure.allParsedTurnsAssigned &&
          ledger.closure.allReviewedSupportSpeakersRecovered &&
          ledger.closure.allContextualPublicOfficialsRecovered
      ),
    commercial_rent_transcript_integrity:
      commercialLedgers.every(
        (ledger, index) =>
          ledger.source.transcriptSha256 ===
            sha256(commercialTranscriptTexts[index]) &&
          commercialTranscriptTexts[index].length > 1000 &&
          ledger.source.officialUrl.startsWith(
            "https://legistar.council.nyc.gov/"
          )
      ),
    commercial_rent_support_turns_preserved:
      commercialLedgers.reduce(
        (sum, ledger) =>
          sum + ledger.closure.reviewedSupportSpeakerCount,
        0
      ) === 28 &&
      commercialLedgers.every((ledger) =>
        ledger.reviewedSupportSpeakers.every(
          (speaker) =>
            speaker.turns.length > 0 &&
            speaker.turns.every(
              (turn) =>
                turn.speakerKey === speaker.speakerKey &&
                turn.transcriptPage > 0 &&
                turn.text.length > 0
            )
        )
      ),
    commercial_rent_public_officials_included:
      JSON.stringify(
        commercialLedgers
          .flatMap((ledger) => ledger.supportivePublicOfficials)
          .map((speaker) => speaker.displayName)
          .sort()
      ) ===
        JSON.stringify(
          ["Carlina Rivera", "Crystal Hudson", "Stephen T. Levin"].sort()
        ) &&
      commercialManifest.records.some(
        (record) =>
          record.legislation === "Res. 0496-2026" &&
          record.primeSponsor === "Tiffany Cabán" &&
          record.primeSponsorStatement.status ===
            "official-legislative-text-recovered-no-spoken-transcript"
      ),
    commercial_rent_public_official_projection_clean:
      commercialManifest.records.every((record) => {
        const eventPath = path.join(
          defaultRepoRoot,
          "docs/knowledge-bank/events",
          `${record.slug}.md`
        );
        if (!existsSync(eventPath)) {
          return false;
        }
        const eventText = readFileSync(eventPath, "utf8");
        const evidenceClassAccurate = record.transcriptFile
          ? eventText.includes(
              "preserves supportive, qualified, contextual, neutral, skeptical, and opposing"
            )
          : eventText.includes(
              "It does not\npreserve a spoken corpus"
            ) &&
            !eventText.includes(
              "preserves supportive, qualified, contextual, neutral, skeptical, and opposing"
            );
        const hasBoundedSupportSection =
          eventText.includes("## Supportive public officials") &&
          (record.supportSpeakers.some((speaker) => speaker.publicOfficial)
            ? record.supportSpeakers
                .filter((speaker) => speaker.publicOfficial)
                .every((speaker) =>
                  eventText.includes(`**${speaker.displayName}**`)
                )
            : eventText.includes(
                  "No supportive public-official speech was identified"
                ) ||
                eventText.includes("no spoken statement is inferred"));
        return (
          hasBoundedSupportSection &&
          evidenceClassAccurate &&
          !eventText.includes("[object Object]") &&
          !eventText.includes("undefined")
        );
      }),
    commercial_rent_prime_sponsor_absences_bounded:
      commercialManifest.records.filter(
        (record) =>
          record.primeSponsorStatement.status ===
          "not-recovered-in-official-transcript"
      ).length === 2 &&
      commercialManifest.records.every(
        (record) =>
          record.primeSponsorStatement.status !==
            "not-recovered-in-official-transcript" ||
          record.primeSponsorStatement.basis.includes(
            "no substantive"
          )
      ),
    commercial_rent_written_testimony_preserved:
      commercialWritten.closure.officialAttachmentPageCount === 236 &&
      commercialWritten.closure.reviewedSupportSubmissionCount === 42 &&
      commercialWritten.closure.explicitSupportCount === 31 &&
      commercialWritten.closure.qualifiedSupportCount === 4 &&
      commercialWritten.closure.supportiveAlignmentCount === 7 &&
      commercialWritten.closure.allRangesWithinAttachment &&
      commercialWritten.closure.allSelectedTextNonempty &&
      commercialWritten.submissions.every((submission) => {
        const outputPath = path.join(
          defaultRepoRoot,
          "docs/knowledge-bank/data/commercial-rent-written-support",
          submission.outputFile
        );
        return (
          existsSync(outputPath) &&
          readFileSync(outputPath, "utf8").length > 0
        );
      }),
    commercial_rent_public_event_corpus_complete:
      publicSupportManifest.events.length === 4 &&
      publicSupportSpeeches.length === 23 &&
      publicSupportSpeeches.every(
        (speaker) =>
          speaker.turnCount > 0 &&
          speaker.transcriptCharacters >= 500 &&
          speaker.transcriptSha256 === sha256(speaker.text) &&
          speaker.text.includes("## Full recovered text")
      ),
    commercial_rent_public_event_officials_complete:
      publicSupportSpeeches.filter((speaker) => speaker.publicOfficial).length ===
        10 &&
      [
        "Brad Lander",
        "Shahana Hanif",
        "Emily Gallagher",
        "Julia Salazar",
        "Tony Simone",
        "Jo Anne Simon"
      ].every((name) =>
        publicSupportSpeeches.some(
          (speaker) => speaker.speaker === name && speaker.publicOfficial
        )
      ),
    commercial_rent_public_event_roles_bounded: (() => {
      const eon = publicSupportSpeeches.find(
        (speaker) => speaker.speaker === "Eon Huntley"
      );
      return (
        eon?.role === "candidate for New York State Assembly District 56" &&
        eon.publicOfficial !== true &&
        eon.currentContext?.includes("published unofficial results") &&
        eon.currentContext?.includes("57.12%") &&
        eon.currentContext?.includes("8,438 votes") &&
        eon.currentContextSource ===
          "https://nyenr.elections.ny.gov/HomeNoJS.aspx"
      );
    })(),
    commercial_rent_public_event_absences_bounded:
      publicSupportManifest.events.some((event) =>
        event.expectedSpeakerAbsences?.some(
          (entry) =>
            entry.displayName === "Chi Ossé" &&
            entry.basis.includes("no attributable")
        )
      ) &&
      publicSupportManifest.events.some((event) =>
        event.nonSpokenSupport?.some(
          (entry) =>
            entry.displayName === "Linda B. Rosenthal" &&
            entry.basis.includes("no speech")
        )
      ),
    commercial_rent_state_sources_bounded:
      publicSupportManifest.legislation.assembly.bill === "A5568A" &&
      publicSupportManifest.legislation.senate.bill === "S8319" &&
      publicSupportManifest.legislation.officialAnnouncement.coverage.includes(
        "written statements"
      ) &&
      readFileSync(
        path.join(
          defaultRepoRoot,
          "docs/knowledge-bank/sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md"
        ),
        "utf8"
      ).includes("No separate Assembly or Senate floor speech"),
    commercial_rent_public_event_projection_clean:
      publicSupportManifest.events.every((event) => {
        const eventText = readFileSync(
          path.join(defaultRepoRoot, "docs/knowledge-bank/events", `${event.slug}.md`),
          "utf8"
        );
        return (
          event.speakers.every((speaker) =>
            eventText.includes(`**${speaker.speaker}**`)
          ) &&
          !eventText.includes("[object Object]") &&
          !eventText.includes("undefined")
        );
      }) &&
      publicSupportSpeeches.every(
        (speaker) =>
          speaker.text.includes(
            "human audio review still required before quotation"
          ) &&
          !speaker.text.includes("/Users/") &&
          !speaker.text.includes("otter.ai/u/")
      ),
    archival_public_boundary_clean: !privatePathPattern.test(publicCorpusText),
    current_work_protected:
      currentWorkSources.every(
        (source) =>
          source &&
          ["summary-only", "internal", "restricted", "private"].includes(
            source.visibility
          ) &&
          source.projection?.status === "hold"
      ),
    current_work_claim_held:
      actionLabClaim?.claim_status === "use-with-care" &&
      actionLabClaim?.projection?.status === "hold" &&
      actionLabClaim.projection.surfaces.length === 0 &&
      actionLabClaim.anti_claims.length >= 4,
    cost_aware_eval_ladder_wired:
      costPackage.scripts["check:affected"] ===
        "node scripts/eval-cost/affected.mjs" &&
      costPackage.scripts["check:release"] === "npm run check" &&
      costPackage.scripts["test:eval-cost"] ===
        "node --test scripts/eval-cost/*.test.mjs" &&
      costDoc.includes("Unclassified and release-critical changes fail upward") &&
      costDoc.includes("Human gates are never automated away"),
    full_release_gate_preserved:
      typeof costPackage.scripts.check === "string" &&
      costPackage.scripts.check.length > 1000 &&
      costPackage.scripts["check:release"] === "npm run check"
  };

  return {
    checks,
    details: {
      campaignPhotoTotals: inventory.totals,
      hearingTotals: {
        events: ledgers.length,
        pages: ledgers.reduce(
          (sum, ledger) => sum + ledger.closure.pageCount,
          0
        ),
        turns: ledgers.reduce(
          (sum, ledger) => sum + ledger.closure.turnCount,
          0
        ),
        eventLevelSpeakers: ledgers.reduce(
          (sum, ledger) => sum + ledger.closure.speakerCount,
          0
        ),
        explicitSupportFindingAids: ledgers.reduce(
          (sum, ledger) =>
            sum + ledger.closure.explicitSupportSpeakerCount,
          0
        )
      },
      commercialRentTotals: {
        records: commercialManifest.records.length,
        transcriptPages: commercialLedgers.reduce(
          (sum, ledger) => sum + ledger.closure.pageCount,
          0
        ),
        transcriptTurns: commercialLedgers.reduce(
          (sum, ledger) => sum + ledger.closure.turnCount,
          0
        ),
        reviewedSupportSpeakers: commercialLedgers.reduce(
          (sum, ledger) =>
            sum + ledger.closure.reviewedSupportSpeakerCount,
          0
        ),
        supportivePublicOfficials: commercialLedgers.reduce(
          (sum, ledger) =>
            sum + ledger.closure.supportivePublicOfficialCount,
          0
        ),
        reviewedSupportSubmissions:
          commercialWritten.closure.reviewedSupportSubmissionCount
      },
      commercialRentPublicEventTotals: {
        events: publicSupportManifest.events.length,
        speechRecords: publicSupportSpeeches.length,
        publicOfficialSpeechOccurrences: publicSupportSpeeches.filter(
          (speaker) => speaker.publicOfficial
        ).length
      }
    }
  };
}
