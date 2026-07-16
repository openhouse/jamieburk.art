const setResource = (candidate, url) => {
  candidate.events[0].outboundResources[0] = {
    url,
    host: "nycartc.com",
    resourceType: "mission-resource"
  };
};

const queryValue = (value, key = "metadata") =>
  `https://nycartc.com/public?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

const rawQuery = (key, value = "") =>
  `https://nycartc.com/public?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

const base64 = (value) => Buffer.from(value).toString("base64");
const base64url = (value) => Buffer.from(value).toString("base64url");

const resourceMutation = (label, url) => ({
  label,
  mutate: (candidate) => setResource(candidate, url)
});

export const nycacReviewer12UnsafeMutations = [
  resourceMutation(
    "unicode-cgj-email",
    queryValue("person@\u034Fexample.invalid")
  ),
  resourceMutation(
    "unicode-variation-email",
    queryValue("person@\uFE0Fexample.invalid")
  ),
  resourceMutation(
    "unicode-mongolian-vowel-email",
    queryValue("person@exam\u180Eple.invalid")
  ),
  resourceMutation(
    "unicode-cgj-participant-list",
    queryValue("Partici\u034Fpants: Person Alpha, Person Beta")
  ),
  resourceMutation(
    "attendees-were-list",
    queryValue("Attendees were Person Alpha and Person Beta")
  ),
  resourceMutation(
    "participants-were-list",
    queryValue("Participants were Person Alpha and Person Beta")
  ),
  resourceMutation(
    "guest-roster-list",
    queryValue("Guest roster: Person Alpha; Person Beta")
  ),
  resourceMutation(
    "invitees-list",
    queryValue("Invitees: Person Alpha, Person Beta")
  ),
  resourceMutation(
    "rsvp-names-list",
    queryValue("RSVP names: Person Alpha and Person Beta")
  ),
  resourceMutation(
    "who-came-list",
    queryValue("Who came: Person Alpha and Person Beta")
  ),
  ...[
    ["eviction-notice", "Resident Alpha received an eviction notice"],
    [
      "landlord-filed-eviction",
      "Resident Alpha's landlord filed for eviction"
    ],
    [
      "shelter-residence",
      "Resident Alpha sleeps in a shelter after displacement"
    ],
    ["pregnancy-disclosure", "Resident Alpha disclosed a pregnancy"],
    [
      "antiretroviral-medication",
      "Resident Alpha takes antiretroviral medication"
    ],
    [
      "depression-hospitalization",
      "Resident Alpha was hospitalized for depression"
    ],
    ["bipolar-disorder", "Resident Alpha has bipolar disorder"],
    [
      "wheelchair-injury",
      "Resident Alpha uses a wheelchair due to an injury"
    ],
    [
      "substance-recovery",
      "Resident Alpha is in recovery from substance use"
    ],
    [
      "rent-arrears-home-loss",
      "Resident Alpha is behind on rent and may lose their home"
    ]
  ].map(([label, value]) => resourceMutation(label, queryValue(value))),
  resourceMutation(
    "raw-phone-path",
    "https://nycartc.com/contact/646-555-0147"
  ),
  resourceMutation(
    "raw-phone-fragment",
    "https://nycartc.com/public#646-555-0147"
  ),
  resourceMutation(
    "cgj-email-path",
    `https://nycartc.com/contact/${encodeURIComponent(
      "person@\u034Fexample.invalid"
    )}`
  ),
  resourceMutation(
    "linewrapped-base64-email-query",
    queryValue(`${base64("person@example.invalid").slice(0, 8)}\n${base64(
      "person@example.invalid"
    ).slice(8)}`)
  ),
  resourceMutation(
    "linewrapped-base64-phone-fragment",
    `https://nycartc.com/public#${encodeURIComponent(
      `${base64("+1 646 555 0147").slice(0, 8)}\n${base64(
        "+1 646 555 0147"
      ).slice(8)}`
    )}`
  ),
  resourceMutation(
    "base64url-participant-path",
    `https://nycartc.com/public/${base64url(
      "Attendees were Person Alpha and Person Beta"
    )}`
  ),
  resourceMutation(
    "base64url-health-fragment",
    `https://nycartc.com/public#${base64url(
      "Resident Alpha was hospitalized for depression"
    )}`
  ),
  ...[
    "meeting_pin",
    "join_code",
    "oauth_code",
    "session_secret",
    "signing_key",
    "encryption_key",
    "verification_token",
    "api\u034Fkey"
  ].map((key) => resourceMutation(`credential-key-${key}`, rawQuery(key))),
  ...["meeting_pin", "session_secret"].map((key) =>
    resourceMutation(
      `base64url-credential-key-${key}`,
      rawQuery(base64url(key))
    )
  ),
  resourceMutation(
    "nested-query-meeting-access",
    queryValue(base64url("https://whereby.com/room-alpha"))
  ),
  resourceMutation(
    "nested-path-meeting-access",
    `https://nycartc.com/public/${base64url(
      "https://whereby.com/room-alpha"
    )}`
  ),
  resourceMutation(
    "relative-private-capture-path",
    queryValue("../exports/account-session.json")
  ),
  resourceMutation(
    "mac-var-private-path",
    queryValue("/var/db/private/account-session.json")
  ),
  ...[
    ["sign-in-sheet-names", "Sign-in sheet names: Person Gamma, Person Delta"],
    ["names-of-guests", "Names of guests: Person Gamma and Person Delta"],
    ["roll-call-names", "Roll call: Person Gamma; Person Delta"],
    ["people-present-names", "People present: Person Gamma, Person Delta"],
    ["who-attended-names", "Who attended: Person Gamma and Person Delta"],
    [
      "registration-list-names",
      "Registration list: Person Gamma, Person Delta"
    ],
    ["signup-sheet-names", "Sign-up sheet: Person Gamma and Person Delta"],
    [
      "participant-directory-names",
      "Participant directory: Person Gamma, Person Delta"
    ],
    [
      "resident-staying-in-shelter",
      "Resident Gamma is staying in a shelter tonight"
    ],
    [
      "resident-psychiatric-treatment",
      "Resident Gamma receives psychiatric treatment"
    ],
    [
      "resident-lost-lease-hospitalization",
      "Resident Gamma lost their lease after hospitalization"
    ],
    [
      "resident-pending-foreclosure",
      "Resident Gamma has a pending foreclosure"
    ],
    [
      "resident-disability-diagnosis",
      "Resident Gamma disclosed a disability diagnosis"
    ],
    [
      "resident-recovering-opioid-use",
      "Resident Gamma is recovering from opioid use"
    ],
    [
      "resident-emergency-housing-after-eviction",
      "Resident Gamma entered emergency housing following an eviction"
    ]
  ].map(([label, value]) => resourceMutation(label, queryValue(value))),
  resourceMutation(
    "unformatted-phone-contact-path",
    "https://nycartc.com/contact/6465550188"
  ),
  resourceMutation(
    "empty-session-signing-key",
    rawQuery("session_signing_key")
  ),
  resourceMutation(
    "nested-volunteer-roster-base64",
    queryValue(base64(base64("Volunteer roster: Person Epsilon; Person Zeta")))
  ),
  ...[
    ["volunteer-roster-names", "Volunteer roster: Person Epsilon; Person Zeta"],
    ["member-list-names", "Member list: Person Epsilon, Person Zeta"],
    ["crew-manifest-names", "Crew manifest: Person Epsilon and Person Zeta"],
    [
      "stakeholder-directory-names",
      "Stakeholder directory: Person Epsilon; Person Zeta"
    ],
    ["attendee-roll-names", "Attendee roll: Person Epsilon, Person Zeta"],
    ["guest-register-names", "Guest register: Person Epsilon and Person Zeta"],
    ["resident-has-disability", "Resident Epsilon has a disability"],
    [
      "resident-moved-into-shelter",
      "Resident Epsilon moved into a shelter after displacement"
    ],
    ["resident-needs-dialysis", "Resident Epsilon needs dialysis"],
    [
      "resident-radiation-therapy",
      "Resident Epsilon is undergoing radiation therapy"
    ],
    [
      "resident-transitional-housing-after-eviction",
      "Resident Epsilon entered transitional housing after an eviction"
    ]
  ].map(([label, value]) => resourceMutation(label, queryValue(value))),
  resourceMutation(
    "empty-client-private-key",
    rawQuery("client_private_key")
  )
];

export const nycacReviewer12SafeMutations = [
  ["participant-input", "Participant input shaped the public agenda."],
  [
    "attendee-feedback",
    "Attendee feedback improved meeting access for wheelchair users."
  ],
  [
    "treatment-editorial",
    "The editorial examines the treatment of murals in city code."
  ],
  [
    "meeting-access-policy",
    "Access to the meeting room follows the venue's public policy."
  ],
  [
    "code-key-editorial",
    "The code repository uses a public release key for sorting examples."
  ],
  [
    "housing-health-topics",
    "Housing policy and public health were agenda topics."
  ],
  [
    "roster-template",
    "A roster template helped volunteers organize shifts."
  ],
  [
    "participants-funding",
    "Participants discussed access to arts funding."
  ],
  ["attendee-guide", "The attendee guide explains subway access."],
  [
    "treatment-vacant-lots",
    "Editors reviewed treatment options for vacant lots."
  ],
  [
    "meeting-code-history",
    "The meeting code chapter explains fire-code history."
  ],
  [
    "key-theme",
    "A key theme was housing stability and community health."
  ],
  ["guest-editors", "Guest editors joined the public panel."],
  [
    "empty-participant-roster-template",
    "The participant roster template contains no names or personal data."
  ],
  [
    "empty-attendee-list-template",
    "The attendee list template contains no names or personal data."
  ]
].map(([label, value]) => resourceMutation(label, queryValue(value)));

export const nycacReviewer12MalformedMutations = [
  {
    label: "null-posted-article",
    mutate: (candidate) => {
      candidate.postedSourceArticles[0] = null;
    }
  },
  {
    label: "array-resource-entry",
    mutate: (candidate) => {
      candidate.events[0].outboundResources = [[]];
    }
  },
  {
    label: "object-response-snapshot",
    mutate: (candidate) => {
      candidate.events[0].responseSnapshot = {};
    }
  },
  {
    label: "null-topics",
    mutate: (candidate) => {
      candidate.events[0].topics = null;
    }
  },
  {
    label: "object-withheld-categories",
    mutate: (candidate) => {
      candidate.events[0].withheldOutboundLinkCategories = {};
    }
  },
  {
    label: "bigint-response-field",
    mutate: (candidate) => {
      candidate.events[0].responseSnapshot.pointEstimate = 1n;
    }
  },
  {
    label: "cyclic-resource-url-object",
    mutate: (candidate) => {
      const value = { label: "synthetic" };
      value.self = value;
      candidate.events[0].outboundResources[0] = {
        url: value,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    }
  },
  {
    label: "deep-resource-url-object",
    mutate: (candidate) => {
      const value = { label: "synthetic" };
      let cursor = value;
      for (let depth = 0; depth < 128; depth += 1) {
        cursor.next = {};
        cursor = cursor.next;
      }
      candidate.events[0].outboundResources[0] = {
        url: value,
        host: "nycartc.com",
        resourceType: "mission-resource"
      };
    }
  }
];
