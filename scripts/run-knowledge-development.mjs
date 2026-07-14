import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  campaignPressArchiveUrlFor,
  campaignPressClaims,
  campaignPressManifests,
  campaignPressSources,
} from "../apps/www/src/data/knowledge-bank/campaign-press.ts";
import {
  kcTownHallFundingCaptures,
  kcTownHallFundingClaims,
  kcTownHallFundingCorrections,
  kcTownHallFundingInquiries,
  kcTownHallFundingObservations,
  kcTownHallFundingSources,
} from "../apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts";
import { validateKnowledgeBank } from "./lib/citation-validation.mjs";

const suite = JSON.parse(
  readFileSync(".agents/evals/knowledge-development.json", "utf8"),
);
const candidateFiles = [
  ".agents/evals/knowledge-development.json",
  "scripts/run-knowledge-development.mjs",
  "apps/www/src/data/knowledge-bank/development-records.ts",
  "apps/www/src/data/knowledge-bank/nycac-research-2026-07-14.ts",
  "apps/www/src/data/knowledge-bank/campaign-press.ts",
  "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
  "apps/www/src/data/knowledge-bank/kc-town-hall-funding.ts",
  "apps/www/src/data/knowledge-bank/schema.ts",
  "apps/www/src/data/knowledge-bank/records.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "docs/knowledge-bank/claims.md",
  "docs/knowledge-bank/proofs.md",
  "docs/knowledge-bank/sources.md",
  "docs/knowledge-bank/anti-claims.md",
  "docs/knowledge-bank/approval-register.md",
  "docs/knowledge-bank/projection-map.md",
  "docs/knowledge-bank/projects/waterways-and-participatory-art.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-research.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-press.md",
  "docs/knowledge-bank/projects/kc-town-hall-funding.md",
  "scripts/lib/citation-validation.mjs",
  "scripts/tests/citations.test.mjs",
  "scripts/tests/knowledge-development-evals.test.mjs",
  "docs/knowledge-bank/promotion-slate.md",
];

const campaignPressInventory = JSON.parse(
  readFileSync(
    "apps/www/src/data/knowledge-bank/fixtures/campaign-press-capture-inventory.json",
    "utf8",
  ),
);

function candidateFingerprint() {
  const hash = createHash("sha256");
  for (const path of candidateFiles) {
    hash.update(`${path}\0`);
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function scoreRatio(numerator, denominator) {
  if (!denominator) return 0;
  const ratio = numerator / denominator;
  if (ratio >= 0.95) return 4;
  if (ratio >= 0.8) return 3;
  if (ratio >= 0.6) return 2;
  if (ratio > 0) return 1;
  return 0;
}

function result(
  score,
  evidence,
  findings = [],
  recommendedNextMove = "No deterministic remediation required.",
) {
  return {
    score,
    pass: score >= 3,
    evidence,
    findings,
    recommended_next_move: recommendedNextMove,
    confidence: "high",
  };
}

function loadJudgments(path) {
  if (!path) return { judgments: new Map(), candidateFingerprint: undefined };
  const input = JSON.parse(readFileSync(path, "utf8"));
  return {
    judgments: new Map(
      (input.judgments ?? []).map((judgment) => [judgment.eval_id, judgment]),
    ),
    candidateFingerprint: input.candidate_fingerprint,
  };
}

function deterministicResults(judgments) {
  const sourceById = new Map(
    knowledgeBank.sources.map((item) => [item.id, item]),
  );
  const observationById = new Map(
    knowledgeBank.observations.map((item) => [item.id, item]),
  );
  const claimById = new Map(
    knowledgeBank.claims.map((item) => [item.id, item]),
  );
  const taskById = new Map(
    knowledgeBank.researchTasks.map((item) => [item.id, item]),
  );
  const developmentSourceIds = new Set(
    knowledgeBank.captures.flatMap((capture) => capture.sourceIds),
  );
  const developmentSources = knowledgeBank.sources.filter((source) =>
    developmentSourceIds.has(source.id),
  );
  const developmentObservations = knowledgeBank.observations.filter(
    (observation) => developmentSourceIds.has(observation.sourceId),
  );
  const developmentClaimIds = new Set(
    developmentObservations.flatMap(
      (observation) => observation.supportsClaimIds,
    ),
  );
  for (const task of knowledgeBank.researchTasks)
    task.claimIds.forEach((id) => developmentClaimIds.add(id));
  const developmentClaims = knowledgeBank.claims.filter((claim) =>
    developmentClaimIds.has(claim.id),
  );
  const routedCaptures = knowledgeBank.captures.filter(
    (capture) =>
      capture.sourceIds.length ||
      capture.researchTaskIds.length ||
      capture.status === "closed",
  );
  const unresolvedCaptures = knowledgeBank.captures.filter(
    (capture) => capture.status !== "integrated" && capture.status !== "closed",
  );
  const urlCaptures = knowledgeBank.captures.filter(
    (capture) => capture.kind === "url",
  );
  const routedUrls = urlCaptures.filter(
    (capture) => capture.sourceIds.length || capture.researchTaskIds.length,
  );
  const sourcesWithObservations = developmentSources.filter((source) =>
    developmentObservations.some(
      (observation) => observation.sourceId === source.id,
    ),
  );
  const campaignPressIntegrityViolations = [];
  const inventoryPlacements = campaignPressInventory.placements ?? [];
  const uniqueCampaignPressArticleIds = new Set(
    campaignPressManifests.flatMap((manifest) => manifest.articleSourceIds),
  );

  if ((campaignPressInventory.captures ?? []).length !== 4) {
    campaignPressIntegrityViolations.push(
      "Campaign press fixture must retain four captured indexes",
    );
  }
  if (
    inventoryPlacements.length !== 45 ||
    uniqueCampaignPressArticleIds.size !== 44
  ) {
    campaignPressIntegrityViolations.push(
      "Campaign press corpus must retain 45 placements and 44 unique article identities",
    );
  }
  for (const manifest of campaignPressManifests) {
    const placements = inventoryPlacements.filter(
      (item) => item.campaignId === manifest.campaignId,
    );
    const capture = campaignPressInventory.captures.find(
      (item) => item.campaignId === manifest.campaignId,
    );
    if (!capture || capture.indexSourceId !== manifest.indexSourceId) {
      campaignPressIntegrityViolations.push(
        `Missing captured index for ${manifest.campaignId}`,
      );
    }
    if (
      JSON.stringify(placements.map((item) => item.sourceId)) !==
      JSON.stringify(manifest.articleSourceIds)
    ) {
      campaignPressIntegrityViolations.push(
        `Source-page order mismatch for ${manifest.campaignId}`,
      );
    }
    for (const sourceId of manifest.articleSourceIds) {
      if (!sourceById.has(sourceId)) {
        campaignPressIntegrityViolations.push(
          `Missing normalized campaign press source ${sourceId}`,
        );
      }
      if (
        !campaignPressArchiveUrlFor(sourceId)?.startsWith(
          "https://web.archive.org/web/",
        )
      ) {
        campaignPressIntegrityViolations.push(
          `Missing Wayback recovery path for ${sourceId}`,
        );
      }
    }
  }
  const pressClaim = campaignPressClaims[0];
  const newPressArticleIds = new Set(
    campaignPressSources
      .filter((source) => source.kind === "published-article")
      .map((source) => source.id),
  );
  const campaignPressSafetyViolations = [
    ...knowledgeBank.claims.flatMap((claim) =>
      claim.evidence
        .filter((relationship) => newPressArticleIds.has(relationship.sourceId))
        .map(
          (relationship) =>
            `${claim.id} promotes unread source ${relationship.sourceId}`,
        ),
    ),
    ...(pressClaim.selectionState !== "dormant" ||
    pressClaim.publicationState !== "public-safe"
      ? ["Campaign press aggregate must remain public-safe and dormant"]
      : []),
    ...pressClaim.projections
      .filter(
        (projection) =>
          projection.status !== "hold" || projection.surfaces.length,
      )
      .map(
        () => "Campaign press aggregate must remain held from public surfaces",
      ),
    ...pressClaim.evidence
      .filter(
        (relationship) =>
          !campaignPressManifests.some(
            (manifest) => manifest.indexSourceId === relationship.sourceId,
          ),
      )
      .map(
        (relationship) =>
          `Campaign press aggregate improperly cites article ${relationship.sourceId}`,
      ),
  ];
  const kcTownHallIntegrityViolations = [];
  const expectedKcTownHallOfficialSourceIds = [
    "SRC-KCTH-CCED-ROUND-TWO-PROPOSALS-2019",
    "SRC-KCTH-KCMO-RESOLUTION-190649-2019",
    "SRC-KCTH-KCMO-ORDINANCE-190642-2019",
    "SRC-KCTH-KCMO-ORDINANCE-240317-2024",
  ];
  const transitionSourceId =
    "SRC-KCTH-JAMIE-TRANSITION-CLARIFICATION-2026";
  const approvedTransitionStatement =
    "Jamie transitioned the KC Town Hall project to a mission-aligned organization.";
  const transitionCapture = kcTownHallFundingCaptures.find(
    (capture) => capture.id === "CAP-KCTH-MISSION-ALIGNED-TRANSITION-2026",
  );
  const transitionSource = kcTownHallFundingSources.find(
    (source) => source.id === transitionSourceId,
  );
  const roleClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-DEVELOPER-PRESENTER-ROLE",
  );
  const fundingClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-CCED-COUNCIL-FUNDING-CHAIN",
  );
  const transitionClaim = kcTownHallFundingClaims.find(
    (claim) => claim.id === "CLM-KCTH-MISSION-ALIGNED-TRANSITION",
  );
  const kcTownHallPage = knowledgeBank.pages.find(
    (page) => page.id === "kc-town-hall",
  );
  if (
    kcTownHallFundingCaptures.length !== 2 ||
    kcTownHallFundingSources.length !== 5 ||
    kcTownHallFundingObservations.length !== 6 ||
    kcTownHallFundingClaims.length !== 3 ||
    kcTownHallFundingInquiries.length !== 1 ||
    kcTownHallFundingCorrections.length !== 2
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall funding graph has an unexpected record count",
    );
  }
  if (
    ![...expectedKcTownHallOfficialSourceIds, transitionSourceId].every((id) =>
      sourceById.has(id),
    ) ||
    JSON.stringify(kcTownHallPage?.sourceOrder) !==
      JSON.stringify(expectedKcTownHallOfficialSourceIds)
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall source set or citation order is incomplete",
    );
  }
  if (
    !roleClaim ||
    JSON.stringify(roleClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify([expectedKcTownHallOfficialSourceIds[0]])
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall developer/presenter role is not bound to the proposal list",
    );
  }
  if (
    !fundingClaim ||
    JSON.stringify(fundingClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify(expectedKcTownHallOfficialSourceIds.slice(1))
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall funding claim does not preserve resolution, appropriation, and reappropriation evidence",
    );
  }
  if (
    !transitionClaim ||
    JSON.stringify(transitionClaim.evidence.map((item) => item.sourceId)) !==
      JSON.stringify([transitionSourceId]) ||
    transitionClaim.evidence.some((item) => item.renderCitation)
  ) {
    kcTownHallIntegrityViolations.push(
      "KC Town Hall transition is not bound to non-citing first-hand evidence",
    );
  }
  const kcTownHallPublicText = [
    "apps/www/src/content/work/kc-town-hall.mdx",
    "apps/www/src/data/work.ts",
    "apps/www/src/data/proofs.ts",
  ]
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  const kcTownHallSafetyViolations = [
    ...(!roleClaim?.antiClaims.some((item) =>
      /caused the Council appropriation/i.test(item),
    )
      ? ["KC Town Hall role claim lacks a Council-causality anti-claim"]
      : []),
    ...(!fundingClaim?.boundaries.some((item) =>
      /receipt.*expenditure/i.test(item),
    )
      ? [
          "KC Town Hall funding claim does not separate appropriation from receipt and expenditure",
        ]
      : []),
    ...(!fundingClaim?.antiClaims.some((item) =>
      /received \$490,539/i.test(item),
    )
      ? ["KC Town Hall funding claim lacks a non-receipt anti-claim"]
      : []),
    ...(!fundingClaim?.evidence.some(
      (item) =>
        item.sourceId === expectedKcTownHallOfficialSourceIds[3] &&
        item.relationship === "supports-boundary",
    )
      ? [
          "KC Town Hall funding claim does not use the 2024 ordinance as a disposition boundary",
        ]
      : []),
    ...(!transitionClaim?.boundaries.some(
      (item) => /first-hand.*official City records/i.test(item),
    )
      ? [
          "KC Town Hall transition claim does not distinguish first-hand context from official records",
        ]
      : []),
    ...(!transitionClaim?.antiClaims.some((item) =>
      /official Council records document/i.test(item),
    )
      ? [
          "KC Town Hall transition claim lacks an official-record attribution anti-claim",
        ]
      : []),
    ...(!/transitioned the project to a mission-aligned organization/i.test(
      kcTownHallPublicText,
    )
      ? ["KC Town Hall public projection omits the mission-aligned transition"]
      : []),
    ...(!/Separately, the City/i.test(kcTownHallPublicText)
      ? [
          "KC Town Hall public projection does not separate the transition from the City record",
        ]
      : []),
    ...(transitionCapture?.summary !== approvedTransitionStatement ||
    transitionSource?.supportsGenerally.some(
      (item) => !/transitioned KC Town Hall to a mission-aligned organization/i.test(item),
    )
      ? [
          "KC Town Hall first-hand capture exceeds the approved professional transition statement",
        ]
      : []),
    ...(!/Council accepted and appropriated the amount in 2019/i.test(
      kcTownHallPublicText,
    )
      ? [
          "KC Town Hall public projection omits Council acceptance and appropriation",
        ]
      : []),
    ...(!/withdrew|withdrawal/i.test(kcTownHallPublicText) ||
    !/unused/i.test(kcTownHallPublicText)
      ? [
          "KC Town Hall public projection omits withdrawal or unused-funds disposition",
        ]
      : []),
    ...(/including a \$490,539 public funding recommendation/i.test(
      kcTownHallPublicText,
    )
      ? [
          "KC Town Hall public projection retains superseded recommendation-only wording",
        ]
      : []),
  ];

  const invalidClaimStates = knowledgeBank.claims.filter((claim) => {
    const activePublic = claim.projections.some(
      (projection) =>
        projection.status === "active" &&
        projection.surfaces.some((surface) => surface.startsWith("/")),
    );
    return (
      activePublic &&
      (!["sourced", "corroborated"].includes(claim.epistemicState) ||
        claim.publicationState !== "approved" ||
        claim.selectionState !== "selected")
    );
  });

  const promotedLineageViolations = developmentClaims.filter((claim) => {
    const isPromoted =
      claim.status === "confirmed" ||
      claim.status === "confirmed-with-boundary";
    if (!isPromoted) return false;
    if (!claim.evidence.length || !claim.observationIds.length) return true;
    return claim.observationIds.some((id) => {
      const observation = observationById.get(id);
      return (
        !observation ||
        !claim.evidence.some(
          (evidence) => evidence.sourceId === observation.sourceId,
        )
      );
    });
  });

  const activeDevelopmentProjectionViolations = developmentClaims.filter(
    (claim) =>
      claim.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.some((surface) => surface.startsWith("/")) &&
          (claim.publicationState !== "approved" ||
            claim.selectionState !== "selected"),
      ),
  );

  const inferenceWithoutTask = developmentClaims.filter(
    (claim) =>
      claim.epistemicState === "unreviewed" &&
      !knowledgeBank.researchTasks.some(
        (task) =>
          task.claimIds.includes(claim.id) && task.status !== "complete",
      ),
  );
  const unresolvedWithoutTask = unresolvedCaptures.filter(
    (capture) => !capture.researchTaskIds.some((id) => taskById.has(id)),
  );
  const brokenCaptureRefs = knowledgeBank.captures.flatMap((capture) => [
    ...capture.sourceIds
      .filter((id) => !sourceById.has(id))
      .map((id) => `${capture.id}->${id}`),
    ...capture.observationIds
      .filter((id) => !observationById.has(id))
      .map((id) => `${capture.id}->${id}`),
    ...capture.researchTaskIds
      .filter((id) => !taskById.has(id))
      .map((id) => `${capture.id}->${id}`),
  ]);
  const brokenObservationRefs = knowledgeBank.observations.flatMap(
    (observation) => [
      ...(!sourceById.has(observation.sourceId)
        ? [`${observation.id}->${observation.sourceId}`]
        : []),
      ...observation.supportsClaimIds
        .filter((id) => !claimById.has(id))
        .map((id) => `${observation.id}->${id}`),
    ],
  );
  const integratedWithoutPath = knowledgeBank.captures.filter(
    (capture) =>
      capture.status === "integrated" &&
      !capture.researchTaskIds.length &&
      !(capture.sourceIds.length && capture.observationIds.length),
  );
  const validationErrors = validateKnowledgeBank({ includePublicFiles: false });
  const privateMarkerPattern =
    /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw transcript|private email/i;
  const privateMarkerHits =
    JSON.stringify({
      captures: knowledgeBank.captures,
      observations: knowledgeBank.observations,
      researchTasks: knowledgeBank.researchTasks,
    }).match(privateMarkerPattern) ?? [];
  const routeViolations = [
    "apps/www/src/app/proofs",
    "apps/www/src/app/knowledge-bank",
    "apps/www/src/app/public-claims",
  ].filter((path) => existsSync(path));

  const results = new Map();
  results.set(
    "KD-001",
    result(
      scoreRatio(routedCaptures.length, knowledgeBank.captures.length),
      [
        `${routedCaptures.length}/${knowledgeBank.captures.length} captures integrated, tasked, or closed`,
      ],
      unresolvedWithoutTask.map((capture) => `Unrouted capture: ${capture.id}`),
      "Route every capture to a normalized source or bounded research task.",
    ),
  );
  results.set(
    "KD-002",
    result(
      Math.min(
        scoreRatio(routedUrls.length, urlCaptures.length),
        developmentSources.length ? 4 : 0,
      ),
      [
        `${routedUrls.length}/${urlCaptures.length} URL captures routed`,
        `${developmentSources.length} normalized development sources`,
      ],
      urlCaptures
        .filter(
          (capture) =>
            !capture.sourceIds.length && !capture.researchTaskIds.length,
        )
        .map((capture) => `Unresolved URL: ${capture.id}`),
      "Normalize retrieved sources and create retrieval tasks for inaccessible candidates.",
    ),
  );
  results.set(
    "KD-003",
    result(
      Math.min(
        scoreRatio(sourcesWithObservations.length, developmentSources.length),
        developmentObservations.length ? 4 : 0,
      ),
      [
        `${sourcesWithObservations.length}/${developmentSources.length} development sources decomposed`,
        `${developmentObservations.length} atomic observations`,
      ],
      developmentSources
        .filter((source) => !sourcesWithObservations.includes(source))
        .map((source) => `No observation: ${source.id}`),
      "Decompose each integrated source into located, limited observations.",
    ),
  );
  results.set(
    "KD-004",
    result(
      invalidClaimStates.length
        ? Math.max(0, 4 - invalidClaimStates.length)
        : 4,
      [
        `${knowledgeBank.claims.length} claims declare three independent states`,
      ],
      invalidClaimStates.map(
        (claim) => `Invalid active-public state: ${claim.id}`,
      ),
      "Hold any projection whose epistemic, publication, or selection state is not ready.",
    ),
  );
  results.set(
    "KD-005",
    result(
      developmentClaims.length >= 4 &&
        !promotedLineageViolations.length &&
        !activeDevelopmentProjectionViolations.length
        ? 4
        : developmentClaims.length
          ? 2
          : 1,
      [
        `${developmentClaims.length} development claims`,
        `${promotedLineageViolations.length} promoted-lineage violations`,
        `${activeDevelopmentProjectionViolations.length} projection violations`,
      ],
      [
        ...promotedLineageViolations,
        ...activeDevelopmentProjectionViolations,
      ].map((claim) => `Unsafe promotion: ${claim.id}`),
      "Connect confirmed claims through observations and keep unearned projections held.",
    ),
  );
  for (const id of ["KD-006", "KD-012"]) {
    const judgment = judgments.get(id);
    results.set(
      id,
      judgment
        ? {
            score: judgment.score,
            pass: judgment.pass,
            evidence: judgment.evidence,
            findings: judgment.findings,
            recommended_next_move: judgment.recommended_next_move,
            confidence: judgment.confidence,
          }
        : result(
            0,
            ["No independent judgment supplied"],
            ["Holdout judgment required"],
            "Run a blind independent judge.",
          ),
    );
  }
  results.set(
    "KD-007",
    result(
      !unresolvedWithoutTask.length &&
        !inferenceWithoutTask.length &&
        knowledgeBank.researchTasks.length >= 5
        ? 4
        : knowledgeBank.researchTasks.length
          ? 2
          : 0,
      [
        `${knowledgeBank.researchTasks.length} research tasks`,
        `${unresolvedWithoutTask.length} unresolved captures without tasks`,
        `${inferenceWithoutTask.length} inference claims without tasks`,
      ],
      [
        ...unresolvedWithoutTask.map((item) => item.id),
        ...inferenceWithoutTask.map((item) => item.id),
      ],
      "Give every unresolved high-value lead and inference claim a prioritized task.",
    ),
  );
  results.set(
    "KD-008",
    result(
      activeDevelopmentProjectionViolations.length || routeViolations.length
        ? 0
        : 4,
      [
        `${activeDevelopmentProjectionViolations.length} unsafe active projections`,
        `${routeViolations.length} prohibited public routes`,
      ],
      routeViolations,
      "Keep developed claims dormant or held until a purpose-specific surface selects approved wording.",
    ),
  );
  results.set(
    "KD-009",
    result(
      brokenCaptureRefs.length ||
        brokenObservationRefs.length ||
        integratedWithoutPath.length ||
        campaignPressIntegrityViolations.length ||
        kcTownHallIntegrityViolations.length
        ? 0
        : routedCaptures.length === knowledgeBank.captures.length
          ? 4
          : 2,
      [
        `${brokenCaptureRefs.length + brokenObservationRefs.length} broken references`,
        `${integratedWithoutPath.length} integrated captures without paths`,
        `${inventoryPlacements.length} campaign press placements / ${uniqueCampaignPressArticleIds.size} unique articles`,
        `${campaignPressIntegrityViolations.length} campaign press integrity violations`,
        `${kcTownHallIntegrityViolations.length} KC Town Hall funding-chain integrity violations`,
      ],
      [
        ...brokenCaptureRefs,
        ...brokenObservationRefs,
        ...integratedWithoutPath.map((item) => item.id),
        ...campaignPressIntegrityViolations,
        ...kcTownHallIntegrityViolations,
      ],
      "Repair broken references and ensure each integrated capture has a traversable path.",
    ),
  );
  results.set(
    "KD-010",
    result(
      validationErrors.length ||
        privateMarkerHits.length ||
        routeViolations.length ||
        campaignPressSafetyViolations.length ||
        kcTownHallSafetyViolations.length
        ? 0
        : 4,
      [
        `${validationErrors.length} canonical validation errors`,
        `${privateMarkerHits.length} private-marker hits`,
        `${routeViolations.length} prohibited routes`,
        `${campaignPressSafetyViolations.length} campaign press promotion violations`,
        `${kcTownHallSafetyViolations.length} KC Town Hall projection-safety violations`,
      ],
      [
        ...validationErrors,
        ...privateMarkerHits,
        ...routeViolations,
        ...campaignPressSafetyViolations,
        ...kcTownHallSafetyViolations,
      ],
      "Remove unsafe payloads and satisfy canonical citation validation.",
    ),
  );
  const photoCapture = knowledgeBank.captures.find(
    (capture) => capture.kind === "photo-lead",
  );
  const photoTask =
    photoCapture &&
    knowledgeBank.researchTasks.find((task) =>
      task.captureIds.includes(photoCapture.id),
    );
  const photoDoc = existsSync("docs/knowledge-bank/photo-evidence-loop.md");
  results.set(
    "KD-011",
    result(
      photoCapture && photoTask && photoDoc ? 4 : photoCapture ? 1 : 0,
      [
        `photo capture: ${photoCapture?.id ?? "missing"}`,
        `photo task: ${photoTask?.id ?? "missing"}`,
        `workflow document: ${photoDoc ? "present" : "missing"}`,
      ],
      [],
      "Document the claim-to-brief and discovery-to-research loop with rights and corroboration gates.",
    ),
  );

  return {
    results,
    metrics: {
      captures: knowledgeBank.captures.length,
      routedCaptures: routedCaptures.length,
      sources: knowledgeBank.sources.length,
      developmentSources: developmentSources.length,
      observations: knowledgeBank.observations.length,
      developmentClaims: developmentClaims.length,
      researchTasks: knowledgeBank.researchTasks.length,
      campaignPressPlacements: inventoryPlacements.length,
      campaignPressUniqueArticles: uniqueCampaignPressArticleIds.size,
      kcTownHallFundingSources: kcTownHallFundingSources.length,
      kcTownHallFundingClaims: kcTownHallFundingClaims.length,
      validationErrors: validationErrors.length,
    },
  };
}

function run() {
  const currentFingerprint = candidateFingerprint();
  const loadedJudgments = loadJudgments(argument("--judgments"));
  const fingerprintMissing =
    Boolean(argument("--judgments")) && !loadedJudgments.candidateFingerprint;
  const fingerprintMismatch = Boolean(
    loadedJudgments.candidateFingerprint &&
    loadedJudgments.candidateFingerprint !== currentFingerprint,
  );
  const judgments = fingerprintMismatch ? new Map() : loadedJudgments.judgments;
  const { results, metrics } = deterministicResults(judgments);
  const evalResults = suite.evals.map((entry) => ({
    eval_id: entry.id,
    title: entry.title,
    grader: entry.grader,
    blocking: entry.blocking,
    weight: entry.weight,
    ...results.get(entry.id),
  }));
  const weightedScore =
    evalResults.reduce(
      (sum, entry) => sum + (entry.score / 4) * entry.weight,
      0,
    ) / 100;
  const thresholds = suite.development_thresholds;
  const blockingFailures = evalResults.filter(
    (entry) =>
      entry.blocking && entry.score < thresholds.blocking_score_minimum,
  );
  const nonblockingFailures = evalResults.filter(
    (entry) =>
      !entry.blocking && entry.score < thresholds.nonblocking_score_minimum,
  );
  const missingJudgments = evalResults.filter(
    (entry) => entry.grader === "llm_judge" && entry.score === 0,
  );
  const criteriaMet =
    weightedScore >= thresholds.weighted_score_minimum &&
    !blockingFailures.length &&
    !nonblockingFailures.length &&
    !missingJudgments.length &&
    !fingerprintMismatch;
  const output = {
    suite_id: suite.suite_id,
    suite_version: suite.version,
    label: argument("--label") ?? "knowledge-development-run",
    run_at: new Date().toISOString(),
    candidate_files: candidateFiles,
    candidate_fingerprint: currentFingerprint,
    judgment_fingerprint: loadedJudgments.candidateFingerprint ?? null,
    judgment_fingerprint_missing: fingerprintMissing,
    judgment_fingerprint_mismatch: fingerprintMismatch,
    metrics,
    weighted_score: Number(weightedScore.toFixed(4)),
    threshold: thresholds.weighted_score_minimum,
    criteria_met: criteriaMet,
    blocking_failures: blockingFailures.map((entry) => entry.eval_id),
    nonblocking_failures: nonblockingFailures.map((entry) => entry.eval_id),
    missing_judgments: missingJudgments.map((entry) => entry.eval_id),
    evals: evalResults,
  };
  const outputPath = argument("--output");
  if (outputPath)
    writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(JSON.stringify(output, null, 2));
  if (
    process.argv.includes("--require-pass") &&
    (fingerprintMissing || !criteriaMet)
  )
    process.exit(1);
}

run();
