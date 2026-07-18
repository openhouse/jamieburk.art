const mutation = (label, mutate) => ({ label, mutate });

export const wowListFacebookPostUnsafeMutations = [
  mutation("inflate-population", (candidate) => { candidate.populationReconciliation.materializedRecordCount = 55; }),
  mutation("all-ever-overclaim", (candidate) => { candidate.populationReconciliation.coverageState = "complete-all-ever"; }),
  mutation("erase-deleted-history-boundary", (candidate) => { candidate.populationReconciliation.boundary = "This is every post ever made."; }),
  mutation("append-count-contradiction", (candidate) => { candidate.populationReconciliation.boundary += " The actual materialized total was 55."; }),
  mutation("append-all-ever-contradiction", (candidate) => { candidate.populationReconciliation.boundary += " This includes every post ever made."; }),
  mutation("drop-record", (candidate) => { candidate.records.pop(); }),
  mutation("duplicate-canonical-id", (candidate) => { candidate.records[1].postId = candidate.records[0].postId; }),
  mutation("duplicate-management-id", (candidate) => { candidate.records[1].managementContentId = candidate.records[0].managementContentId; }),
  mutation("swap-canonical-and-legacy", (candidate) => { [candidate.records[3].postId, candidate.records[3].managementContentId] = [candidate.records[3].managementContentId, candidate.records[3].postId]; }),
  mutation("mismatch-canonical-url", (candidate) => { candidate.records[0].canonicalUrl = "https://www.facebook.com/wowlist/posts/999"; }),
  mutation("change-date-range", (candidate) => { candidate.populationReconciliation.dateRange.start = "2015-01-01"; }),
  mutation("inflate-jamie-bylines", (candidate) => { candidate.publishingAttribution.detailsAttributedToJamieBurkart = 54; }),
  mutation("video-becomes-bylined", (candidate) => { const record = candidate.records.find((item) => item.detailRecovery === "available-video-redirect"); record.publisherAttribution = "jamie-burkart"; }),
  mutation("erase-richard-credit", (candidate) => { candidate.publishingAttribution.boundary = "Jamie solely built and owned WOW List."; }),
  mutation("append-sole-authorship-contradiction", (candidate) => { candidate.publishingAttribution.boundary += " Jamie authored every post and source."; }),
  mutation("verified-owner-export-inflation", (candidate) => { candidate.ownerExportReconciliation.windows[0].fileVerification = "verified"; }),
  mutation("owner-window-date-drift", (candidate) => { candidate.ownerExportReconciliation.windows[0].start = "2010-01-01"; }),
  mutation("owner-date-reconciliation-drift", (candidate) => { candidate.ownerExportReconciliation.creationDateAgreement.sameCalendarDate = 29; }),
  mutation("append-owner-verification-contradiction", (candidate) => { candidate.ownerExportReconciliation.boundary += " All three files were file-level verified."; }),
  mutation("owner-export-row-inflation", (candidate) => { candidate.ownerExportReconciliation.windows[1].rowCount = 30; }),
  mutation("publish-admin-reach", (candidate) => { candidate.adminAnalytics = { reach: 234 }; }),
  mutation("publish-impressions", (candidate) => { candidate.records[0].impressions = 73; }),
  mutation("publish-raw-post-text", (candidate) => { candidate.records[0].text = "Raw social copy"; }),
  mutation("publish-comments", (candidate) => { candidate.records[0].comments = ["Person Alpha"]; }),
  mutation("publish-engagers", (candidate) => { candidate.engagers = ["Person Alpha"]; }),
  mutation("publish-private-path", (candidate) => { candidate.capturePath = "/private/tmp/wowlist-facebook.json"; }),
  mutation("stakeholder-count-overclaim", (candidate) => { candidate.missionPatterns.stakeholderCount = 12; }),
  mutation("linked-org-becomes-endorser", (candidate) => { candidate.missionPatterns.stakeholderEngagementBoundary = "Every linked organization endorsed WOW List."; }),
  mutation("sum-overlapping-themes", (candidate) => { candidate.missionPatterns.overlapBoundary = "The themes total 97 unique posts."; }),
  mutation("linked-source-becomes-causation", (candidate) => { candidate.closeReadSources[0].supports = "WOW List caused the program."; }),
  mutation("remove-close-read-source", (candidate) => { candidate.closeReadSources.pop(); }),
  mutation("inflate-link-count", (candidate) => { candidate.linkInventory.normalizedDistinctUrlCount = 43; }),
  mutation("followers-become-historical-reach", (candidate) => { candidate.currentPageSnapshot.boundary = "This proves historical reach."; }),
  mutation("traction-becomes-active", (candidate) => { candidate.tractionDisposition.status = "promoted"; }),
  mutation("publish-authenticated-session", (candidate) => { candidate.authenticatedSessionIdentity = "Jamie Burkart"; })
];

export const wowListFacebookPostSafeMutations = [
  mutation("reorder-close-read-sources", (candidate) => { candidate.closeReadSources.reverse(); }),
  mutation("reorder-link-inventory", (candidate) => { candidate.linkInventory.links.reverse(); }),
  mutation("reorder-theme-count-keys", (candidate) => {
    candidate.missionPatterns.recordCounts = Object.fromEntries(
      Object.entries(candidate.missionPatterns.recordCounts).reverse()
    );
  }),
  mutation("reorder-page-id-keys", (candidate) => {
    candidate.ownerExportReconciliation.pageIdDistribution = Object.fromEntries(
      Object.entries(candidate.ownerExportReconciliation.pageIdDistribution).reverse()
    );
  })
];
