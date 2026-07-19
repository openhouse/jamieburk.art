export function nycacSharedFolderFixture() {
  return {
    accessiblePopulation: 2365,
    inventoriedTotal: 2365,
    classifiedTotal: 2365,
    dispositionedTotal: 2365,
    folderTotal: 258,
    fileTotal: 2107,
    typeTotal: 2365,
    dispositionSum: 2365,
    closeReadTotal: 16,
    traversalErrorTotal: 0,
    rightsClearedTotal: 0,
    everyItemHasOneDisposition: true,
    populationScope: "accessible-population",
    interpretationScope: "selected-close-reading",
    authorshipScope: "bounded",
    privateLocatorExposed: false,
    publicRouteExposed: false,
    heldMetricProjected: false,
    portfolioClaimLinked: true,
    portfolioGuardrailPresent: true,
    humanGatesRemainOpen: true,
    captureMethod: "A-descendant-accounting",
    crossCaptureCanonicalTotal: null,
    crossCaptureProjection: "hold",
    reconciliationPresent: true
  };
}

export function evaluateNycacSharedFolder(candidate) {
  return [
    {
      id: "NYCAC-001-population-accounting",
      pass:
        candidate.inventoriedTotal === candidate.accessiblePopulation &&
        candidate.classifiedTotal === candidate.accessiblePopulation &&
        candidate.dispositionedTotal === candidate.accessiblePopulation &&
        candidate.everyItemHasOneDisposition
    },
    {
      id: "NYCAC-002-file-folder-closure",
      pass:
        candidate.folderTotal + candidate.fileTotal ===
        candidate.accessiblePopulation
    },
    {
      id: "NYCAC-003-type-closure",
      pass: candidate.typeTotal === candidate.accessiblePopulation
    },
    {
      id: "NYCAC-004-disposition-closure",
      pass: candidate.dispositionSum === candidate.accessiblePopulation
    },
    {
      id: "NYCAC-005-method-boundary",
      pass:
        candidate.populationScope === "accessible-population" &&
        candidate.interpretationScope === "selected-close-reading" &&
        candidate.closeReadTotal > 0 &&
        candidate.closeReadTotal < candidate.fileTotal
    },
    {
      id: "NYCAC-006-authorship-boundary",
      pass: candidate.authorshipScope === "bounded"
    },
    {
      id: "NYCAC-007-traversal-quality",
      pass: candidate.traversalErrorTotal === 0
    },
    {
      id: "NYCAC-008-rights-boundary",
      pass:
        candidate.rightsClearedTotal === 0 && candidate.humanGatesRemainOpen
    },
    {
      id: "NYCAC-009-private-locator-redaction",
      pass: !candidate.privateLocatorExposed
    },
    {
      id: "NYCAC-010-no-public-archive-route",
      pass: !candidate.publicRouteExposed
    },
    {
      id: "NYCAC-011-held-metric-containment",
      pass: !candidate.heldMetricProjected
    },
    {
      id: "NYCAC-012-purpose-built-projection",
      pass:
        candidate.portfolioClaimLinked && candidate.portfolioGuardrailPresent
    },
    {
      id: "NYCAC-013-cross-capture-reconciliation",
      pass:
        candidate.captureMethod === "A-descendant-accounting" &&
        candidate.crossCaptureCanonicalTotal === null &&
        candidate.crossCaptureProjection === "hold" &&
        candidate.reconciliationPresent
    }
  ];
}
