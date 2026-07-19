const expectedBranches = new Map([
  ["feature/knowledge-wiki-A", "920f9024d7e058700f282e3e1e76188fe1c5294e"],
  ["feature/knowledge-wiki-B", "268a92d794f5b604f4004fc9d6e5652f234fc61b"],
  ["feature/knowledge-wiki-C", "6a2af7396240381ce04aad9b9129ba402b83c134"],
  ["feature/knowledge-wiki-D", "e5a7ac607bfbd5a428bb18c2f7af5baad614132b"],
  ["feature/knowledge-wiki-E", "9f1bbfacec3edbfbc47a5200f777d4f498da0ec4"]
]);

const expectedCensus = new Map([
  ["feature/knowledge-wiki-A", 2365],
  ["feature/knowledge-wiki-B", 2408],
  ["feature/knowledge-wiki-C", 2078],
  ["feature/knowledge-wiki-D", 2192],
  ["feature/knowledge-wiki-E", 2405]
]);

export function closureFixture() {
  return {
    canonicalRoot: "docs/knowledge-bank",
    frozenBranches: [...expectedBranches].map(([branch, head]) => ({
      branch,
      head,
      strength: "Named contribution",
      disposition: branch.endsWith("-A") ? "foundation" : "adapt-selected",
      destinations: ["docs/knowledge-bank"]
    })),
    forbiddenRootPresent: false,
    publicWikiRoutePresent: false,
    censusObservations: [...expectedCensus].map(
      ([branch, reportedAccessibleItems]) => ({
        branch,
        reportedAccessibleItems
      })
    ),
    canonicalCensusTotal: null,
    censusProjection: "hold",
    censusReconciliationPresent: true,
    selectedPageIds: ["index.example"],
    governedPageIds: new Set(["index.example"]),
    rootRelationTargets: new Set(["index.example"]),
    reviewMapPresent: true,
    diffPaths: ["docs/example.md"],
    reviewUnits: [
      {
        id: "unit-1",
        paths: ["docs/example.md"],
        addedLines: 20
      }
    ],
    ciWorkflowPresent: true,
    ciRunsRepositoryCheck: true,
    repositoryCheckRunsClosure: true,
    repositoryCheckRunsMutationTests: true,
    humanGates: {
      contentApproval: "pending",
      rightsClearance: "pending",
      productionApproval: "not-granted",
      mergeDecision: "pending"
    },
    requiredRemoteFeatureRefs: [],
    parallelFixtureRoots: []
  };
}

export function evaluateWikiFamilyClosure(candidate) {
  const branchMap = new Map(
    candidate.frozenBranches.map((item) => [item.branch, item])
  );
  const censusMap = new Map(
    candidate.censusObservations.map((item) => [
      item.branch,
      item.reportedAccessibleItems
    ])
  );
  const assignedPaths = candidate.reviewUnits.flatMap((unit) => unit.paths);
  const uniqueAssignedPaths = new Set(assignedPaths);
  const diffPathSet = new Set(candidate.diffPaths);

  return [
    {
      id: "FAMILY-001",
      pass:
        branchMap.size === expectedBranches.size &&
        [...expectedBranches].every(([branch, head]) => {
          const item = branchMap.get(branch);
          return Boolean(
            item &&
              item.head === head &&
              item.strength?.trim() &&
              item.disposition?.trim() &&
              item.destinations?.length
          );
        })
    },
    {
      id: "FAMILY-002",
      pass:
        candidate.canonicalRoot === "docs/knowledge-bank" &&
        !candidate.forbiddenRootPresent &&
        !candidate.publicWikiRoutePresent
    },
    {
      id: "FAMILY-003",
      pass:
        censusMap.size === expectedCensus.size &&
        [...expectedCensus].every(
          ([branch, count]) => censusMap.get(branch) === count
        ) &&
        candidate.canonicalCensusTotal === null &&
        candidate.censusProjection === "hold" &&
        candidate.censusReconciliationPresent
    },
    {
      id: "FAMILY-004",
      pass:
        candidate.selectedPageIds.length > 0 &&
        candidate.selectedPageIds.every(
          (id) =>
            candidate.governedPageIds.has(id) &&
            candidate.rootRelationTargets.has(id)
        )
    },
    {
      id: "FAMILY-005",
      pass:
        candidate.reviewMapPresent &&
        assignedPaths.length === uniqueAssignedPaths.size &&
        uniqueAssignedPaths.size === diffPathSet.size &&
        [...diffPathSet].every((item) => uniqueAssignedPaths.has(item)) &&
        candidate.reviewUnits.every(
          (unit) =>
            unit.paths.length > 0 &&
            unit.paths.length <= 50 &&
            unit.addedLines <= 10000
        )
    },
    {
      id: "FAMILY-006",
      pass:
        candidate.ciWorkflowPresent &&
        candidate.ciRunsRepositoryCheck &&
        candidate.repositoryCheckRunsClosure &&
        candidate.repositoryCheckRunsMutationTests
    },
    {
      id: "FAMILY-007",
      pass:
        candidate.humanGates.contentApproval === "pending" &&
        candidate.humanGates.rightsClearance === "pending" &&
        candidate.humanGates.productionApproval === "not-granted" &&
        candidate.humanGates.mergeDecision === "pending"
    },
    {
      id: "FAMILY-008",
      pass:
        candidate.requiredRemoteFeatureRefs.length === 0 &&
        candidate.parallelFixtureRoots.length === 0
    }
  ];
}
