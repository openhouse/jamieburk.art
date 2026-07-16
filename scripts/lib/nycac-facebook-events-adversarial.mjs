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
const repeatedlyEncodeKey = (value, layers) => {
  let encoded = value.replaceAll("_", "%5F");
  for (let layer = 1; layer < layers; layer += 1) {
    encoded = encodeURIComponent(encoded);
  }
  return encoded;
};

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
  ),
  ...[
    ["contact-html-named-entity", queryValue("person&commat;example.invalid")],
    ["contact-html-decimal-entity", queryValue("person&#64;example.invalid")],
    ["contact-html-hex-entity", queryValue("person&#x40;example.invalid")],
    [
      "contact-literal-json-unicode-escape",
      queryValue("person\\u0040example.invalid")
    ],
    [
      "contact-html-phone-digits",
      queryValue("Call &#54;&#52;&#54;&#53;&#53;&#53;&#48;&#49;&#57;&#57;")
    ],
    [
      "contact-prefixed-base64url",
      queryValue(`encoded-contact:${base64url("person@example.invalid")}`)
    ],
    ["contact-bracket-obfuscation", queryValue("person [at] example.invalid")],
    ["contact-word-obfuscation", queryValue("person at example dot invalid")],
    ["roster-rsvp-roster", queryValue("RSVP roster: Person Lambda; Person Mu")],
    [
      "roster-registered-guests",
      queryValue("Registered guests: Person Lambda and Person Mu")
    ],
    ["roster-checkin-log", queryValue("Check-in log: Person Lambda, Person Mu")],
    [
      "roster-event-registrants",
      queryValue("Event registrants: Person Lambda; Person Mu")
    ],
    [
      "roster-volunteer-names",
      queryValue("Volunteer names: Person Lambda and Person Mu")
    ],
    [
      "roster-member-directory",
      queryValue("Member directory: Person Lambda, Person Mu")
    ],
    ["roster-crew-list", queryValue("Crew list: Person Lambda; Person Mu")],
    [
      "roster-stakeholder-roster",
      queryValue("Stakeholder roster: Person Lambda and Person Mu")
    ],
    [
      "roster-confirmed-attendees",
      queryValue("Confirmed attendees - Person Lambda and Person Mu")
    ],
    [
      "roster-guest-signups",
      queryValue("Guest signups: Person Lambda, Person Mu")
    ],
    [
      "health-chronic-treatment",
      queryValue("Resident Lambda receives treatment for a chronic illness")
    ],
    [
      "health-prescribed-medication",
      queryValue("Resident Lambda takes prescribed medication")
    ],
    [
      "housing-entered-shelter",
      queryValue("Resident Lambda entered a shelter after a fire")
    ],
    [
      "housing-transitional-status",
      queryValue("Resident Lambda lives in transitional housing")
    ],
    [
      "housing-couch-surfing",
      queryValue("Resident Lambda is couch surfing after displacement")
    ],
    [
      "housing-no-fixed-address",
      queryValue("Resident Lambda has no fixed address")
    ],
    [
      "health-clinic-treatment",
      queryValue("Resident Lambda was treated at a clinic")
    ],
    [
      "health-home-oxygen",
      queryValue("Resident Lambda uses home oxygen for a chronic condition")
    ],
    [
      "health-post-surgery-recovery",
      queryValue("Resident Lambda is recovering after surgery")
    ],
    [
      "housing-rent-arrears",
      queryValue("Resident Lambda rent arrears are under legal review")
    ],
    ...[
      "join_token",
      "host_key",
      "webinar_password",
      "session_id",
      "auth_code",
      "invite_code",
      "registration_token",
      "access_pin",
      "meeting_access_key",
      "sso_token"
    ].map((key) => [
      `credential-key-${key}-reviewer15`,
      rawQuery(key, "SYNTHETIC-CREDENTIAL-VALUE-12345")
    ]),
    [
      "credential-basic-authorization",
      queryValue(`Basic ${base64url("synthetic:placeholder")}`)
    ],
    [
      "credential-private-key-header",
      queryValue(
        [
          "-----BEGIN",
          "PRIVATE KEY----- SYNTHETIC PLACEHOLDER -----END",
          "PRIVATE KEY-----"
        ].join(" ")
      )
    ],
    [
      "credential-cookie-sessionid",
      queryValue("sessionid=SYNTHETICSESSIONVALUE12345", "cookie")
    ],
    [
      "meeting-local-join-path",
      "https://nycartc.com/join/SYNTHETIC-ROOM-CODE-12345"
    ],
    [
      "meeting-ringcentral-bare-route",
      queryValue(
        "meetings.ringcentral.com/j/SYNTHETIC12345",
        "room_link"
      )
    ],
    [
      "meeting-zoho-bare-route",
      queryValue("meet.zoho.com/SYNTHETIC12345", "join_page")
    ],
    [
      "meeting-gotomeeting-bare-route",
      queryValue(
        "global.gotomeeting.com/join/SYNTHETIC12345",
        "access_page"
      )
    ],
    [
      "path-windows-temp",
      queryValue("Local capture at C:\\Temp\\browser-profile\\session.json")
    ],
    [
      "path-windows-programdata",
      queryValue("Local capture at C:\\ProgramData\\Browser\\profile.json")
    ],
    [
      "path-unc-localhost",
      queryValue("Local capture at \\\\localhost\\c$\\private\\session.json")
    ],
    [
      "path-dev-shm",
      queryValue("Local capture at /dev/shm/browser-session.json")
    ],
    [
      "path-applications-profile",
      queryValue("Local capture at /Applications/Browser/Profile/session.json")
    ],
    [
      "path-var-run",
      queryValue("Local capture at /var/run/private/session.json")
    ]
  ].map(([label, url]) => resourceMutation(label, url)),
  ...[
    [
      "reviewer16-contact-html-mixed-entities",
      queryValue("synthetic&#x0040;example&#x002e;invalid")
    ],
    [
      "reviewer16-contact-json-two-escapes",
      queryValue("synthetic\\u0040example\\u002Einvalid")
    ],
    [
      "reviewer16-contact-base64-html-layer",
      queryValue(base64url("synthetic&#64;example.invalid"))
    ],
    [
      "reviewer16-contact-base64url-obfuscated",
      queryValue(base64url("synthetic (at) example (dot) invalid"))
    ],
    [
      "reviewer16-contact-parenthesized-obfuscation",
      queryValue("synthetic (at) example (dot) invalid")
    ],
    [
      "reviewer16-contact-hex-entity-phone",
      queryValue(
        "Call &#x36;&#x34;&#x36;&#x2D;&#x35;&#x35;&#x35;&#x2D;&#x30;&#x31;&#x30;&#x30;"
      )
    ],
    [
      "reviewer16-contact-fullwidth-address",
      queryValue(["synthetic", "\uFF20", "example", "\uFF0E", "invalid"].join(""))
    ],
    [
      "reviewer16-contact-double-percent-address",
      "https://nycartc.com/review?note=synthetic%2540example%252Einvalid"
    ],
    ...[
      "database_password",
      "webhook_secret",
      "signing_secret",
      "smtp_password",
      "backup_access_token",
      "calendar_access_code",
      "service_token",
      "api_credential",
      "room_pin"
    ].map((key) => [
      `reviewer16-credential-${key}`,
      rawQuery(key, "SYNTHETIC-PLACEHOLDER-ONLY")
    ]),
    [
      "reviewer16-credential-bearer-assignment",
      queryValue(["Bearer", "SYNTHETICPLACEHOLDER123456789"].join(" "))
    ],
    ...[
      ["attendee-manifest", "Attendee manifest: Person Sigma; Person Tau"],
      ["registrant-names", "Registrant names: Person Sigma and Person Tau"],
      [
        "volunteer-directory",
        "Volunteer directory: Person Sigma, Person Tau"
      ],
      [
        "attendance-register",
        "Attendance register: Person Sigma; Person Tau"
      ],
      ["rsvp-export", "RSVP export: Person Sigma and Person Tau"],
      ["guest-names", "Guest names: Person Sigma, Person Tau"],
      ["shift-signups", "Shift signup names: Person Sigma; Person Tau"],
      [
        "event-checkin",
        "Event check-in roster: Person Sigma and Person Tau"
      ]
    ].map(([label, value]) => [
      `reviewer16-roster-${label}`,
      queryValue(value)
    ]),
    ...[
      ["pregnant-status", "Resident Sigma is pregnant"],
      ["insulin-use", "Resident Sigma uses insulin daily"],
      ["mental-care", "Resident Sigma receives mental health care"],
      [
        "asthma-inhaler",
        "Resident Sigma has asthma and uses an inhaler"
      ],
      ["sleeping-in-car", "Resident Sigma is sleeping in a car"],
      [
        "supportive-disability",
        "Resident Sigma lives in supportive housing due to disability"
      ],
      [
        "emergency-waitlist",
        "Resident Sigma is on an emergency housing waitlist"
      ],
      [
        "staying-with-friends",
        "Resident Sigma is staying with friends after displacement"
      ]
    ].map(([label, value]) => [
      `reviewer16-health-housing-${label}`,
      queryValue(value)
    ]),
    ...[
      ["teams-live", "https://teams.live.com/meet/SYNTHETIC-ROOM-ALPHA"],
      [
        "zoomgov-subdomain",
        "https://meetings.zoomgov.com/j/SYNTHETIC12345"
      ],
      [
        "webex-joinservice",
        "https://example.webex.com/wbxmjs/joinservice/SYNTHETIC12345"
      ],
      [
        "ringcentral-meetings",
        "https://meetings.ringcentral.com/j/SYNTHETIC67890"
      ],
      [
        "gotomeeting-global",
        "https://global.gotomeeting.com/join/SYNTHETIC67890"
      ],
      ["whereby-bare", "whereby.com/synthetic-civic-room"]
    ].map(([label, value]) => [
      `reviewer16-meeting-${label}`,
      queryValue(value)
    ]),
    [
      "reviewer16-meeting-allowlisted-room-path",
      "https://nycartc.com/rooms/SYNTHETICROOM123"
    ],
    ...[
      [
        "macos-user-library",
        "/Users/synthetic/Library/Application Support/browser/session.json"
      ],
      ["private-tmp", "/private/tmp/synthetic/browser-state.json"],
      ["var-folders", "/var/folders/zz/synthetic/session.json"],
      [
        "windows-users",
        "C:\\Users\\Synthetic\\AppData\\Local\\browser-state.json"
      ],
      ["unc-loopback", "\\\\127.0.0.1\\share\\browser-state.json"],
      ["relative-sessions", "../sessions/browser-state.json"],
      ["home-secrets", "~/secrets/browser-state.json"]
    ].map(([label, value]) => [
      `reviewer16-path-${label}`,
      queryValue(value)
    ])
  ].map(([label, url]) => resourceMutation(label, url)),
  resourceMutation(
    "reviewer17-credential-calendar-join-pin",
    rawQuery("calendar_join_pin", "SYNTHETIC-PLACEHOLDER-ONLY")
  ),
  resourceMutation(
    "reviewer17-credential-percent-calendar-join-pin",
    "https://nycartc.com/public?calendar%255Fjoin%255Fpin=SYNTHETIC-PLACEHOLDER-ONLY"
  ),
  resourceMutation(
    "reviewer17-credential-base64-calendar-join-pin",
    rawQuery(base64url("calendar_join_pin"), "SYNTHETIC-PLACEHOLDER-ONLY")
  ),
  ...["-", "\u2013", "\u2014"].map((separator, index) =>
    resourceMutation(
      `reviewer17-roster-attendance-register-dash-${index + 1}`,
      queryValue(
        `Attendance register ${separator} Person Upsilon, Person Phi`
      )
    )
  ),
  ...[
    ["contact-soft-hyphen-address", queryValue("synthetic@ex\u00ADample.invalid")],
    ["contact-word-joiner-address", queryValue("synthetic\u2060@example.invalid")],
    [
      "contact-base64-json-escapes",
      queryValue(base64("synthetic\\u0040example\\u002Einvalid"))
    ],
    [
      "contact-named-entities",
      queryValue("synthetic&commat;example&period;invalid")
    ],
    [
      "contact-base64-decimal-entities",
      queryValue(base64("synthetic&#64;example&#46;invalid"))
    ],
    [
      "contact-braced-json-unicode",
      queryValue("synthetic\\u{40}example\\u{2e}invalid")
    ],
    [
      "contact-quoted-printable-address",
      queryValue("synthetic=40example=2Einvalid")
    ],
    [
      "credential-calendar-participant-join-code",
      rawQuery("calendar_participant_join_code", "SYNTHETIC-J18-ONLY")
    ],
    [
      "credential-five-layer-civic-meeting-pin",
      `https://nycartc.com/public?${repeatedlyEncodeKey("civic_meeting_moderator_pin", 5)}=SYNTHETIC-J18-ONLY`
    ],
    [
      "credential-base64-community-room-code",
      rawQuery(base64url("community_room_entry_code"), "SYNTHETIC-J18-ONLY")
    ],
    [
      "credential-html-webinar-host-key",
      rawQuery("webinar&#95;host&#95;key", "SYNTHETIC-J18-ONLY")
    ],
    [
      "credential-triple-base64-session-key",
      rawQuery(
        base64(base64(base64("coalition_session_moderator_key"))),
        "SYNTHETIC-J18-ONLY"
      )
    ],
    [
      "credential-json-escaped-meeting-pin",
      rawQuery("meeting\\u005Faccess\\u005Fpin", "SYNTHETIC-J18-ONLY")
    ],
    [
      "credential-fullwidth-calendar-pin",
      rawQuery("calendar\uFF3Fjoin\uFF3Fpin", "SYNTHETIC-J18-ONLY")
    ],
    [
      "roster-door-checkin-names",
      queryValue("Door check-in names \u2014 Person Quartz; Person Topaz")
    ],
    [
      "roster-attendance-ledger",
      queryValue("Attendance ledger: Person Quartz and Person Topaz")
    ],
    ["roster-visitor-log", queryValue("Visitor log: Person Quartz, Person Topaz")],
    [
      "roster-volunteer-shift",
      queryValue("Volunteer shift roster \u2014 Person Quartz / Person Topaz")
    ],
    ["roster-member-roll", queryValue("Member roll: Person Quartz; Person Topaz")],
    [
      "roster-crew-signin",
      queryValue("Crew sign-in: Person Quartz and Person Topaz")
    ],
    [
      "roster-stakeholder-attendance-sheet",
      queryValue("Stakeholder attendance sheet: Person Quartz, Person Topaz")
    ],
    [
      "health-psychiatric-discharge",
      queryValue("Resident Quartz was discharged from psychiatric care")
    ],
    [
      "health-physical-therapy",
      queryValue("Resident Quartz receives physical therapy after surgery")
    ],
    [
      "housing-motel-after-eviction",
      queryValue("Resident Quartz is living in a motel after eviction")
    ],
    [
      "housing-rent-debt-displacement",
      queryValue("Resident Quartz has rent debt and entered displacement proceedings")
    ],
    [
      "health-home-ventilator",
      queryValue("Resident Quartz relies on a ventilator at home")
    ],
    [
      "health-transplant-waitlist",
      queryValue("Resident Quartz is on a transplant waitlist")
    ],
    [
      "housing-domestic-violence-shelter",
      queryValue("Resident Quartz moved to a domestic violence shelter")
    ],
    [
      "meeting-base64-teams-meetup",
      queryValue(base64("https://teams.microsoft.com/l/meetup-join/SYNTHETIC-J18-ROOM"))
    ],
    [
      "meeting-percent-webex-join",
      queryValue(
        encodeURIComponent(
          encodeURIComponent(encodeURIComponent("https://synthetic.webex.com/meet/J18ROOM"))
        )
      )
    ],
    [
      "meeting-base64url-ringcentral",
      queryValue(base64url("https://meetings.ringcentral.com/j/SYNTHETICJ18"))
    ],
    [
      "meeting-json-google-lookup",
      queryValue("https:\\u002F\\u002Fmeet.google.com\\u002Flookup\\u002Fsynthetic-j18")
    ],
    [
      "meeting-bare-gotomeeting",
      queryValue("global.gotomeeting.com/join/SYNTHETICJ18")
    ],
    [
      "meeting-allowlisted-meeting-path",
      "https://nycartc.com/meeting/SYNTHETICJ18ROOM"
    ],
    [
      "meeting-teams-cloud-redirect",
      queryValue("https://teams.cloud.microsoft/meet/SYNTHETICJ18")
    ],
    ["path-var-tmp", queryValue("/var/tmp/synthetic-j18/browser-session.json")],
    [
      "path-usr-local-var",
      queryValue("/usr/local/var/synthetic-j18/browser-profile.json")
    ],
    [
      "path-windows-system-temp",
      queryValue("C:\\Windows\\Temp\\synthetic-j18\\session.json")
    ],
    [
      "path-home-variable",
      queryValue("$HOME/private/synthetic-j18/session.json")
    ],
    [
      "path-run-user",
      queryValue("/run/user/501/synthetic-j18/browser-session.json")
    ],
    [
      "path-relative-browser-profile",
      queryValue("../../browser-profiles/synthetic-j18/session.json")
    ],
    [
      "path-unc-synthetic-host",
      queryValue("\\\\synthetic-host\\private$\\synthetic-j18\\session.json")
    ]
  ].map(([label, url]) => resourceMutation(`reviewer18-${label}`, url)),
  ...[
    ["contact-qp-lowercase-mailbox", queryValue("judge-nineteen=40archive=2einvalid")],
    ["contact-base64url-over-qp-mailbox", queryValue(base64url("judge-nineteen=40mail=2Einvalid"))],
    ["contact-recursive-qp-mailbox", queryValue("judge-nineteen=3D40desk=3D2Einvalid")],
    ["contact-json-brace-over-qp-mailbox", queryValue("judge-nineteen\\u{3d}40civic\\u{3d}2einvalid")],
    ["contact-base64url-hex-entity-mailbox", queryValue(base64url("judge-nineteen&#x40;notices&#x2e;invalid"))],
    ["contact-nfkc-over-qp-mailbox", queryValue("ｊｕｄｇｅ１９=40bulletin=2Einvalid")],
    ["contact-base64url-protected-key", rawQuery(base64url("email"), "SYNTH-J19-CONTACT")],
    ["credential-archive-session-signing-key", rawQuery("civic_archive_session_signing_key", "SYNTH-J19-A")],
    ["credential-base64url-registration-token", rawQuery(base64url("public_hearing_registration_token"), "SYNTH-J19-B")],
    ["credential-qp-moderator-code-key", rawQuery("board=5Fmoderator=5Faccess=5Fcode", "SYNTH-J19-C")],
    ["credential-json-session-pin-key", rawQuery("session\\u005Fverification\\u005Fpin", "SYNTH-J19-D")],
    ["credential-entity-oauth-token-key", rawQuery("coalition&#95;oauth&#95;callback&#95;token", "SYNTH-J19-E")],
    ["credential-four-layer-session-secret-key", rawQuery("resident_meeting_session_secret_key", "SYNTH-J19-F")],
    ["credential-camel-session-secret-key", rawQuery("archiveMeetingSessionSecretKey", "SYNTH-J19-G")],
    ["roster-registration-list", queryValue("Registration list: Person Juniper, Person Larch")],
    ["roster-roll-call", queryValue("Roll call: Person Maple; Person Cedar")],
    ["roster-event-registrants", queryValue("Event registrants — Person Birch / Person Spruce")],
    ["roster-attendee-manifest", queryValue("Attendee manifest: Person Aspen and Person Alder")],
    ["roster-participant-directory", queryValue("Participant directory: Person Willow, Person Hemlock")],
    ["roster-guest-register", queryValue("Guest register: Person Rowan; Person Hawthorn")],
    ["roster-crew-manifest", queryValue("Crew manifest — Person Sequoia and Person Linden")],
    ["health-patient-mental-care", queryValue("Patient Juniper receives mental health care following intake")],
    ["housing-resident-car-sleeping", queryValue("Resident Larch is sleeping in a car during displacement")],
    ["housing-patient-friends-displacement", queryValue("Patient Maple is staying with friends after displacement this month")],
    ["housing-resident-fixed-address", queryValue("Resident Cedar has no fixed address during intake")],
    ["health-patient-pregnancy", queryValue("Patient Birch is pregnant according to the case record")],
    ["health-resident-radiation", queryValue("Resident Spruce is undergoing radiation therapy for cancer")],
    ["housing-patient-lease-loss", queryValue("Patient Aspen lost their lease after hospitalization")],
    ["meeting-allowlisted-rooms-route", "https://nycartc.com/rooms/JUDGE19SYNTHROOM1"],
    ["meeting-double-percent-jitsi", queryValue(encodeURIComponent(encodeURIComponent("https://meet.jit.si/Judge19SyntheticRoom")))],
    ["meeting-qp-google-lookup", queryValue("https=3A=2F=2Fmeet=2Egoogle=2Ecom=2Flookup=2Fjudge19synthetic")],
    ["meeting-double-base64url-whereby", queryValue(base64url(base64url("https://whereby.com/judge19synthetic")))],
    ["meeting-entity-teams-live", queryValue("https&#58;&#47;&#47;teams&#46;live&#46;com&#47;meet&#47;judge19synthetic")],
    ["meeting-bare-webex", queryValue("synthetic-j19.webex.com/meet/JUDGE19ROOM")],
    ["meeting-fragment-base64url-zoomgov", `https://nycartc.com/public#${encodeURIComponent(base64url("https://zoomgov.com/j/JUDGE19ROOM"))}`],
    ["path-base64url-volumes-profile", queryValue(base64url("/Volumes/Judge19/browser-profile/state.json"))],
    ["path-root-capture", queryValue("/root/captures/judge19-state.json")],
    ["path-workspace-export", queryValue("/workspace/exports/judge19-browser.json")],
    ["path-tilde-capture", queryValue("~/captures/judge19-facebook-state.json")],
    ["path-home-session", queryValue("$HOME/sessions/judge19-browser.json")],
    ["path-relative-capture", queryValue("../captures/judge19-meta-state.json")],
    ["path-windows-programdata", queryValue("C:\\ProgramData\\Judge19\\browser\\session.json")]
  ].map(([label, url]) => resourceMutation(`reviewer19-${label}`, url)),
  ...[
    ["judge20-contact-html-decimal-mailbox", queryValue("judge20&#64;fieldnotes&#46;invalid")],
    ["judge20-contact-lower-quoted-printable-mailbox", queryValue("judge20=40civic=2einvalid")],
    ["judge20-contact-json-fixed-mailbox", queryValue("judge20\\u0040dispatch\\u002einvalid")],
    ["judge20-contact-base64url-bracket-mailbox", queryValue(base64url("judge20 [at] bulletin [dot] invalid"))],
    ["judge20-contact-fullwidth-mailbox", queryValue("ｊｕｄｇｅ２０＠ａｒｃｈｉｖｅ．ｉｎｖａｌｉｄ")],
    ["judge20-contact-zwnj-mailbox", queryValue("judge\u200c20@updates.invalid")],
    ["judge20-contact-double-percent-key", rawQuery("e%256Dail", "J20-CONTACT-KEY")],
    ["judge20-contact-base64url-phone-key", rawQuery(base64url("phone"), "J20-PHONE-KEY")],
    ["judge20-credential-coalition-refresh-token", rawQuery("coalition_archive_refresh_token", "J20-CRED-A")],
    ["judge20-credential-hearing-access-pin", rawQuery("hearing_room_access_pin", "J20-CRED-B")],
    ["judge20-credential-volunteer-invite-code", rawQuery("volunteer_portal_invite_code", "J20-CRED-C")],
    ["judge20-credential-session-signing-key", rawQuery("public_session_signing_key", "J20-CRED-D")],
    ["judge20-credential-base64url-webinar-password", rawQuery(base64url("board_webinar_password"), "J20-CRED-E")],
    ["judge20-credential-entity-host-key", rawQuery("meeting&#95;host&#95;key", "J20-CRED-F")],
    ["judge20-credential-json-oauth-code", rawQuery("oauth\\u005Fhearing\\u005Fverification\\u005Fcode", "J20-CRED-G")],
    ["judge20-credential-session-authorization-token", rawQuery("session_authorization_token", "J20-CRED-H")],
    ["judge20-roster-member-directory-dash", queryValue("Member directory — Person Orchid and Person Sage")],
    ["judge20-roster-volunteer-roster-dash", queryValue("Volunteer roster – Person Copper and Person Silver")],
    ["judge20-roster-stakeholder-roster-dash", queryValue("Stakeholder roster - Person Harbor and Person Summit")],
    ["judge20-roster-participant-directory-dash", queryValue("Participant directory — Person Meadow and Person Canyon")],
    ["judge20-roster-guest-register-dash", queryValue("Guest register – Person Cedar and Person Flint")],
    ["judge20-roster-attendee-roll-dash", queryValue("Attendee roll — Person Garnet and Person Moss")],
    ["judge20-roster-member-list-dash", queryValue("Member list - Person Bay and Person Ridge")],
    ["judge20-roster-guest-signups-dash", queryValue("Guest signups — Person Elm and Person Lake")],
    ["judge20-health-person-dialysis", queryValue("Person Orchid is receiving dialysis after diagnosis")],
    ["judge20-health-resident-home-oxygen", queryValue("Resident Sage uses home oxygen each night")],
    ["judge20-health-patient-surgery-recovery", queryValue("Patient Copper is recovering after surgery")],
    ["judge20-housing-resident-couch-surfing", queryValue("Resident Silver is couch surfing after displacement")],
    ["judge20-health-resident-asthma", queryValue("Resident Harbor has asthma and uses an inhaler")],
    ["judge20-housing-patient-emergency-waitlist", queryValue("Patient Summit is on an emergency housing waitlist")],
    ["judge20-health-person-leukemia", queryValue("Person Meadow was diagnosed with leukemia")],
    ["judge20-housing-resident-transitional", queryValue("Resident Canyon entered transitional housing after an eviction")],
    ["judge20-meeting-direct-google", queryValue("https://meet.google.com/jtw-enty-zero")],
    ["judge20-meeting-teams-cloud", queryValue("https://teams.cloud.microsoft/meet/JUDGE20ROOM")],
    ["judge20-meeting-base64url-zoom", queryValue(base64url("https://zoom.us/j/JUDGE200001"))],
    ["judge20-meeting-quoted-printable-jitsi", queryValue("https=3A=2F=2Fmeet=2Ejit=2Esi=2FJudge20Room")],
    ["judge20-meeting-bare-whereby", queryValue("whereby.com/judge20-civic-room")],
    ["judge20-meeting-allowlisted-join-route", "https://nycartc.com/join/JUDGE20ROOMXX"],
    ["judge20-meeting-allowlisted-room-route", "https://nycartc.com/room/JUDGE20ROOMYY"],
    ["judge20-meeting-entity-webex", queryValue("https&#58;&#47;&#47;judge20.webex.com&#47;meet&#47;J20ROOM")],
    ["judge20-path-macos-chrome", queryValue("/Users/judge20/Library/Application Support/Chrome/Profile 7/Cookies")],
    ["judge20-path-volume-capture", queryValue("/Volumes/Archive20/captures/facebook/session.json")],
    ["judge20-path-private-tmp-export", queryValue("/private/tmp/judge20/export/state.json")],
    ["judge20-path-var-folders-profile", queryValue("/var/folders/zz/j20/browser-profile/session.json")],
    ["judge20-path-windows-user", queryValue("C:\\Users\\Judge20\\AppData\\Local\\Chrome\\User Data\\Default")],
    ["judge20-path-unc-private", queryValue("\\\\judge20-host\\private\\captures\\state.json")],
    ["judge20-path-relative-profile", queryValue("../../browser-profiles/j20/session.json")],
    ["judge20-path-home-export", queryValue("$HOME/exports/j20/account-session.json")]
  ].map(([label, url]) => resourceMutation(label, url))
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
  ],
  ["reviewer15-participant", "Participant feedback informed the public agenda."],
  ["reviewer15-attendee", "The attendee guide maps transit access."],
  ["reviewer15-guest", "A guest curator opened the public meeting."],
  [
    "reviewer15-roster",
    "A roster of public agencies appears in the report."
  ],
  [
    "reviewer15-treatment",
    "The article examines the treatment of street murals under city code."
  ],
  [
    "reviewer15-recovery",
    "The venue recovery plan prioritizes small cultural spaces."
  ],
  [
    "reviewer15-access",
    "Access to public records improved after the hearing."
  ],
  [
    "reviewer15-meeting",
    "The public meeting reviewed building code updates."
  ],
  [
    "reviewer15-code",
    "The code chapter summarizes fire-safety history."
  ],
  [
    "reviewer15-key",
    "A key question was commercial housing affordability."
  ],
  ["reviewer15-housing", "Housing policy was an agenda topic."],
  [
    "reviewer15-health",
    "Public health policy shaped the editorial."
  ],
  [
    "reviewer15-shelter",
    "Shelter funding was discussed at the public hearing."
  ],
  [
    "reviewer15-disability",
    "Disability access standards guided venue selection."
  ],
  [
    "reviewer15-volunteer",
    "Volunteer coordinators staffed the public information table."
  ],
  [
    "reviewer15-member",
    "Member organizations coauthored the public brief."
  ],
  [
    "reviewer15-crew",
    "Crew members installed the public exhibit."
  ],
  [
    "reviewer15-stakeholder",
    "Stakeholder mapping clarified agency roles."
  ],
  [
    "reviewer15-combined",
    "The housing recovery meeting focused on shelter access."
  ],
  [
    "reviewer15-ordinary-participants",
    "Participants discussed a key public-health code proposal."
  ],
  [
    "reviewer16-participant",
    "Participant questions sharpened the published agenda."
  ],
  [
    "reviewer16-attendee",
    "The attendee handbook describes public transit options."
  ],
  [
    "reviewer16-guest",
    "A guest lecturer discussed nightlife policy."
  ],
  [
    "reviewer16-roster",
    "The report includes a roster of city agencies."
  ],
  [
    "reviewer16-treatment",
    "The essay critiques the treatment of public art in zoning law."
  ],
  [
    "reviewer16-recovery",
    "The district recovery strategy supports neighborhood venues."
  ],
  [
    "reviewer16-access",
    "Public-record access improved after digitization."
  ],
  ["reviewer16-meeting", "The open meeting covered permit reform."],
  [
    "reviewer16-code",
    "The building code appendix explains sprinkler rules."
  ],
  [
    "reviewer16-key",
    "A key finding concerned late-night transit."
  ],
  [
    "reviewer16-housing",
    "Housing affordability remained on the legislative agenda."
  ],
  [
    "reviewer16-health",
    "Public health agencies cohosted the policy forum."
  ],
  [
    "reviewer16-shelter",
    "The shelter budget was debated in committee."
  ],
  [
    "reviewer16-disability",
    "Disability access standards informed the venue checklist."
  ],
  [
    "reviewer16-volunteer",
    "Volunteer coordinators distributed public flyers."
  ],
  [
    "reviewer16-member",
    "Member groups reviewed the coalition charter."
  ],
  [
    "reviewer16-crew",
    "The stage crew completed the public sound check."
  ],
  [
    "reviewer16-stakeholder",
    "Stakeholder interviews informed the process map."
  ],
  [
    "reviewer16-participant-code",
    "Participants reviewed a proposed building code amendment."
  ],
  [
    "reviewer16-attendee-access",
    "Attendees received an accessibility map for the public venue."
  ],
  [
    "reviewer16-guest-meeting",
    "Guest speakers joined the open civic meeting."
  ],
  [
    "reviewer16-roster-editorial",
    "Editors compared the agency roster with the public directory."
  ],
  [
    "reviewer16-treatment-housing",
    "The column compares policy treatment of housing cooperatives."
  ],
  [
    "reviewer16-recovery-shelter",
    "The recovery budget includes capital grants for public shelters."
  ],
  [
    "reviewer16-member-stakeholder",
    "Member and stakeholder comments appear in the published minutes."
  ],
  [
    "reviewer16-volunteer-crew",
    "Volunteer crews installed signs for the public workshop."
  ],
  [
    "reviewer16-key-health",
    "A key chapter reviews municipal public-health authority."
  ],
  [
    "reviewer16-disability-housing",
    "Disability and housing policy were discussed in committee."
  ],
  [
    "reviewer16-access-code",
    "Access rules are summarized in the public building-code guide."
  ],
  [
    "reviewer16-meeting-roster",
    "The meeting packet contains an institutional roster without personal names."
  ],
  [
    "reviewer17-calendar-join-guidance",
    "Calendar join guidance appears on the public access page."
  ],
  [
    "reviewer17-empty-attendance-register-template",
    "The attendance register template contains no names or personal data."
  ],
  ...[
    "Participant facilitators grouped questions into the published agenda.",
    "The attendee experience audit measured sightlines to public signage.",
    "A guest essay explains the history of the venue district.",
    "Roster analysis compares agency jurisdictions rather than naming people.",
    "The report compares regulatory treatment of amplified sound.",
    "The district recovery framework funds storefront reopening.",
    "Public access standards are summarized in the civic handbook.",
    "The open meeting reviewed proposed zoning changes.",
    "The software code example groups venues by borough.",
    "A key finding concerns late-night transit frequency.",
    "The housing committee reviewed neighborhood affordability tools.",
    "Public health agencies contributed to the published guidance.",
    "Shelter capital needs appear in the adopted budget.",
    "Disability access standards shaped the public venue checklist.",
    "Volunteer coordinators distributed the final public agenda.",
    "Member organizations approved the public charter.",
    "The production crew installed an accessible stage ramp.",
    "Stakeholder mapping distinguishes agency mandates.",
    "Participant questions were grouped into editorial themes.",
    "Attendee-facing wayfinding identifies the elevator route.",
    "Guest curators selected works for the public exhibition.",
    "The institutional roster covers departments and offices.",
    "The article studies treatment of temporary installations.",
    "Recovery planning includes grants for neighborhood venues."
  ].map((value, index) => [
    `reviewer18-benign-${String(index + 1).padStart(2, "0")}`,
    value
  ]),
  ...[
    "Participant perspectives informed the published policy summary.",
    "The attendee services guide maps the public elevator route.",
    "A guest curator introduced the neighborhood exhibition.",
    "The agency roster groups departments by jurisdiction.",
    "The essay compares treatment of temporary street art.",
    "Storefront recovery grants supported cultural corridors.",
    "Public access rules appear in the adopted handbook.",
    "The meeting recap summarizes the zoning discussion.",
    "The source code sorts venues by opening year.",
    "A key recommendation concerns late-night bus service.",
    "Housing affordability remained a council agenda item.",
    "Public health officials reviewed ventilation guidance.",
    "Shelter capital funding appears in the city budget.",
    "Disability access criteria shaped the venue scorecard.",
    "Volunteer coordinators prepared the public information table.",
    "Member institutions reviewed the coalition charter.",
    "The technical crew completed the public sound check.",
    "Stakeholder mapping clarifies public agency responsibilities.",
    "Participants compared arts-funding application rules.",
    "Attendees received a printed transit-access map.",
    "Guest editors assembled the oral-history issue.",
    "The institutional roster lists offices rather than individuals.",
    "The report studies legal treatment of sidewalk performances.",
    "Neighborhood recovery planning includes small-venue grants.",
    "The public meeting code of conduct emphasizes equitable access."
  ].map((value, index) => [
    `reviewer19-benign-${String(index + 1).padStart(2, "0")}`,
    value
  ])
]
  .map(([label, value]) => resourceMutation(label, queryValue(value)))
  .concat(
    [
      ["judge20-safe-member-directory-editorial", "A member directory for public agencies indexes offices rather than people."],
      ["judge20-safe-volunteer-roster-template", "The volunteer roster template is blank and used only for staffing estimates."],
      ["judge20-safe-crew-manifest-freight", "Crew manifest design standards apply to freight staging at public venues."],
      ["judge20-safe-guest-register-architecture", "The guest register is an architectural feature beside the museum entrance."],
      ["judge20-safe-attendee-rollup", "Attendee roll-up counts appear only as rounded interface labels."],
      ["judge20-safe-participant-directory-taxonomy", "The participant directory taxonomy groups program types and excludes individuals."],
      ["judge20-safe-member-list-policy", "The member list policy prohibits collecting individual names."],
      ["judge20-safe-email-guidance", "Email accessibility guidance is published without addresses or contact records."],
      ["judge20-safe-phone-tree", "The public phone tree is described without publishing any telephone numbers."],
      ["judge20-safe-code-key-zoning", "A code key explains zoning categories and contains no credentials."],
      ["judge20-safe-session-token-facilitation", "The session token budget refers to facilitation turns rather than authentication."],
      ["judge20-safe-meeting-access-policy", "Meeting access policy covers ramps, elevators, and transit connections."],
      ["judge20-safe-hearing-room-signage", "The hearing room designation appears on public building signage."],
      ["judge20-safe-public-health-funding", "The report compares public health funding categories without personal cases."],
      ["judge20-safe-aggregate-housing-instability", "The report maps housing instability at neighborhood scale using aggregate census indicators."],
      ["judge20-safe-facade-treatment", "The editorial reviews treatment of historic facades under zoning law."],
      ["judge20-safe-disability-access", "Disability access standards guide procurement for public cultural venues."],
      ["judge20-safe-shelter-zoning", "The land-use chapter distinguishes emergency shelter zoning from supportive-housing finance."],
      ["judge20-safe-eviction-policy", "Eviction-prevention policy is discussed without any person-level case history."],
      ["judge20-safe-filesystem-concept", "The archive guide explains filesystem paths conceptually and publishes no locator."],
      ["judge20-safe-browser-profile-summary", "Browser-profile research is summarized without local state or session data."],
      ["judge20-safe-export-session-records", "The export session covers public-records retention rather than authenticated state."],
      ["judge20-safe-public-room-access", "The public meeting room has step-free access and a hearing loop."],
      ["judge20-safe-join-workshop", "Readers can join the policy workshop through the posted public calendar."],
      ["judge20-safe-membership-map", "A coalition membership map counts organizations and excludes individual names."],
      ["judge20-safe-volunteer-capacity", "Volunteer coordination is discussed as operating capacity with no sign-in data."],
      ["judge20-safe-guest-curatorship", "Guest curatorship is evaluated as a program model rather than a person list."],
      ["judge20-safe-attendance-methodology", "Attendance methodology reports uncertainty bands and retains no identities."],
      ["judge20-safe-facebook-response-boundary", "Facebook response labels are interface actions and not verified attendance."],
      ["judge20-safe-source-route-boundary", "A source route documents circulation and does not establish endorsement."],
      ["judge20-safe-venue-interface-boundary", "A venue listing documents an event interface and not a continuing partnership."]
    ].map(([label, value]) =>
      resourceMutation(label, queryValue(value, "editorial"))
    )
  );

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
