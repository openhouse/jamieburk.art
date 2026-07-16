const mutation = (label, mutate) => ({ label, mutate });

export const facebookEventsUnsafeMutations = [
  mutation("inflate-card-population", (candidate) => {
    candidate.personalProfile.population.displayedEventSlots = 512;
  }),
  mutation("collapse-base-id-control", (candidate) => {
    candidate.personalProfile.population.distinctBaseEventIds = 501;
  }),
  mutation("inflate-explicit-organizer-count", (candidate) => {
    candidate.personalProfile.population.explicitJamieOrganizerRecords = 21;
  }),
  mutation("erase-host-control-gap", (candidate) => {
    candidate.personalProfile.population.unresolvedHostControlCountDifference = 0;
  }),
  mutation("profile-association-becomes-attendance", (candidate) => {
    candidate.personalProfile.population.boundary =
      "Profile association confirms Jamie attended these events.";
  }),
  mutation("response-becomes-attendance", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.boundary =
      "Responses are verified attendance and reach.";
  }),
  mutation("sum-response-labels", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.totalReach = 372;
  }),
  mutation("duplicate-selected-event", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents[1].eventId =
      candidate.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents[0].eventId;
  }),
  mutation("mismatch-event-url", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents[0].canonicalUrl =
      "https://www.facebook.com/events/999/";
  }),
  mutation("inflate-event-response", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents[0].displayedResponses =
      999;
  }),
  mutation("replace-year-distribution", (candidate) => {
    candidate.personalProfile.population.byYear = { "2026": 511 };
  }),
  mutation("replace-personal-identity-digest", (candidate) => {
    candidate.acquisitionIntegrity.personalEventIdentitySha256 = "0".repeat(64);
  }),
  mutation("contradict-response-threshold", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.displayedResponseCountDistribution =
      [2, 4, 5, 5, 5, 6, 7, 7, 14, 16, 16, 19, 19, 19, 19, 19, 119];
  }),
  mutation("stakeholder-display-becomes-endorsement", (candidate) => {
    candidate.personalProfile.stakeholderLeads = {
      conclusion: "Every organizer endorsed Jamie."
    };
  }),
  mutation("invent-posted-article", (candidate) => {
    candidate.personalProfile.postedSourceRoutes.externalArticleDestinationsRecovered =
      1;
  }),
  mutation("wow-current-zero-becomes-historical-zero", (candidate) => {
    candidate.wowListPage.currentEventsSurface.historicalPopulationStatus =
      "none-ever";
  }),
  mutation("wow-zero-overclaim-boundary", (candidate) => {
    candidate.wowListPage.currentEventsSurface.boundary =
      "WOW List historically created no Facebook events.";
  }),
  mutation("wow-followers-become-impact", (candidate) => {
    candidate.wowListPage.currentProfile.boundary =
      "Follower count proves adoption and impact.";
  }),
  mutation("publish-protected-capture", (candidate) => {
    candidate.acquisitionIntegrity.protectedCapturePublished = true;
  }),
  mutation("publish-private-locator", (candidate) => {
    candidate.acquisitionIntegrity.protectedPath =
      "/private/tmp/full-facebook-events.json";
  }),
  mutation("publish-guest-roster", (candidate) => {
    candidate.personalProfile.attendees = ["Person Alpha", "Person Beta"];
  }),
  mutation("publish-guest-names", (candidate) => {
    candidate.personalProfile.guestNames = ["Ordinary Person"];
  }),
  mutation("publish-full-index", (candidate) => {
    candidate.personalProfile.fullIndex = [
      { title: "Ordinary-life event", organizer: "Ordinary Person" }
    ];
  }),
  mutation("publish-participant-roster", (candidate) => {
    candidate.personalProfile.participantRoster = ["Ordinary Person"];
  }),
  mutation("publish-cohosts", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.cohosts = [
      "Ordinary Person"
    ];
  }),
  mutation("publish-rsvps", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.rsvps = [
      "Ordinary Person"
    ];
  }),
  mutation("publish-access-token", (candidate) => {
    const key = ["access", "Token"].join("");
    candidate.acquisitionIntegrity[key] = ["EA", "AB-TEST-VALUE"].join("");
  }),
  mutation("publish-signed-url", (candidate) => {
    candidate.acquisitionIntegrity.signedUrl =
      "https://example.com/private?X-Amz-" + "Signature=TEST";
  }),
  mutation("publish-authorization-header", (candidate) => {
    candidate.acquisitionIntegrity.authorizationHeader = "Bear" + "er TEST";
  }),
  mutation("publish-credential-in-allowed-array", (candidate) => {
    candidate.privacy.omitted.push("Bear" + "er TEST");
  }),
  mutation("add-endorsement-assertion", (candidate) => {
    candidate.personalProfile.endorsementSummary =
      "These institutions endorse Jamie.";
  }),
  mutation("add-historical-zero-assertion", (candidate) => {
    candidate.wowListPage.historicalConclusion =
      "WOW List never created Facebook events.";
  }),
  mutation("publish-raw-description", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.rawDescription =
      "Private event detail.";
  }),
  mutation("remove-privacy-omission", (candidate) => {
    candidate.privacy.omitted = candidate.privacy.omitted.filter(
      (item) => !item.startsWith("guest, invitee")
    );
  })
];

export const facebookEventsSafeMutations = [
  mutation("reorder-stakeholder-leads", (candidate) => {
    candidate.personalProfile.explicitOrganizerEvidence.selectedPublicSafeEvents.reverse();
  }),
  mutation("append-boundary-clarification", (candidate) => {
    candidate.privacy.omitted.push(
      "non-mission personal context not needed for professional claims"
    );
  })
];
