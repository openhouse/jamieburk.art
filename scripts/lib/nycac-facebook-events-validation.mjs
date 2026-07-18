import { createHash } from "node:crypto";

const TOPICS = new Set([
  "cabaret-law-repeal",
  "commercial-rent-and-displacement",
  "cultural-fundraising",
  "cultural-planning",
  "cultural-space-defense",
  "government-interface",
  "march-enforcement",
  "mutual-aid-and-relief",
  "nightlife-governance",
  "participatory-convening",
  "safety-and-compliance"
]);

const RELATIONS = new Set([
  "allied-or-cohosted-listing",
  "index-displayed-nycac-organizer"
]);

const VENUE_CATEGORIES = new Set([
  "community-meeting-place",
  "cultural-or-community-space",
  "educational-institution",
  "government",
  "public-realm",
  "virtual"
]);

const RESOURCE_TYPES = new Set(["mission-resource", "source-article"]);
const WITHHELD_CATEGORIES = new Set([
  "dated-voting-logistics",
  "expired-registration-link",
  "meeting-access-link",
  "private-working-document",
  "unresolved-short-link"
]);

const RESOURCE_HOSTS = new Set([
  "danceparade.org",
  "fairrentnyc.com",
  "gothamist.com",
  "legalizedance.org",
  "letnycdance.com",
  "musicworkersalliance.org",
  "ny.curbed.com",
  "nycartc.com",
  "nyclofttenants.org",
  "nypost.com",
  "passsbjsa.com",
  "res.cloudinary.com",
  "secure2.convio.net",
  "talksnotraids.com",
  "thebaffler.com",
  "twitch.tv",
  "twitter.com",
  "www.danceliberationnetwork.com",
  "www.metro.us",
  "www.newyorker.com",
  "www.peoplesculturalplan.org",
  "www.thefloasis.com",
  "www.wnyc.org",
  "www1.nyc.gov"
]);

const DURATION_VALUES = new Set([
  null,
  "1 hr",
  "1 hr 30 min",
  "2 hr",
  "2 hr 30 min",
  "3 hr"
]);

const RECURRING_METHOD =
  'Deterministic classification: relationToPage is "index-displayed-nycac-organizer", the title contains the whole word "meeting", and the title contains "NYC Artist Coalition" or the whole token "NAC". The "virtual" venue category determines virtual versus physical.';

const POPULATION_SCOPE =
  "The full event-card population exposed by the live NYC Artist Coalition Facebook page's Past Events surface after repeated scrolling to a stable terminal state on the capture date.";
const RECHECK_INTERPRETATION =
  "A later authenticated replay re-found all 33 event IDs but five detail routes returned an unavailable state. Earlier authenticated captures had recovered all 33 public detail records, so the later state is preserved as platform volatility rather than evidence that those events did not exist.";
const RECONCILIATION_NOTE =
  "Facebook displayed 34 past events but materialized 33 unique event cards. All 33 exposed detail records were recovered across authenticated captures. A later replay re-found the 33 IDs while five detail routes were temporarily unavailable. The remaining control slot is recorded as unmaterialized, not as nonexistent.";
const PUBLIC_SAFETY_NOTE =
  "The public fixture retains event metadata, organizer displays, aggregate response snapshots, topics, and selected mission-relevant links. Raw descriptions, emails, phone numbers, meeting IDs, passcodes, attendee identities, and private working-document links are excluded.";
const AGGREGATE_INTERPRETATION =
  "Three event counts were rounded in thousands. Event-level response actions are not unique people and do not establish attendance; no cross-event total is retained.";
const MANIFEST_SCOPE_NOTE =
  "This is 100 percent accounting for the 34-slot host control observed in an authenticated same-day capture: 33 public event identities were recovered and one slot remains unresolved. It is not a native Meta owner export or a claim that every historical event ever created remains visible.";
const MANIFEST_PUBLIC_SAFETY_NOTE =
  "The corpus retains event metadata, organizer displays, bounded response snapshots, classifications, and selected mission-relevant public links. It excludes raw descriptions, attendee identities, comments, contacts, access credentials, private working links, and authenticated-session state.";
const EXPECTED_EVENT_IDENTITY_SHA256 =
  "4b7b9f29b9ff91c45c823cf14e31dc64358d4fcdd6ee47e49bf20eacff797c52";
const EXPECTED_EVENT_RECORD_SHA256 =
  "a88cf6b1d2923330e48df077948723f26690efe051f6743f9f5692daa7fc9980";
const EXPECTED_EVENT_RELATIONSHIP_SHA256 =
  "2349079d6adc22885813ce1ba53a52bcaa484a2f1b883afb0ac20224793cfc03";
const EXPECTED_ARTICLE_ROUTE_SHA256 =
  "d9b70af1440a7d2579fdaa71bab9ef9e76226a9fe7d5d39b1db3a751aa79dea6";

const ARTICLE_PUBLISHERS_BY_HOST = new Map([
  ["gothamist.com", "Gothamist"],
  ["ny.curbed.com", "Curbed"],
  ["nypost.com", "New York Post"],
  ["thebaffler.com", "The Baffler"],
  ["www.metro.us", "Metro"],
  ["www.newyorker.com", "The New Yorker"],
  ["www.wnyc.org", "WNYC"]
]);

const CREDENTIAL_QUERY_KEYS = new Set([
  "accesskey",
  "accesskeyid",
  "apikey",
  "apisecret",
  "accesstoken",
  "authorization",
  "authcode",
  "authtoken",
  "clientsecret",
  "code",
  "credential",
  "jwt",
  "key",
  "meetingid",
  "hostkey",
  "invitecode",
  "jointoken",
  "meetingaccesskey",
  "passcode",
  "password",
  "privatekey",
  "privatetoken",
  "pwd",
  "refreshtoken",
  "registrationtoken",
  "secret",
  "secretkey",
  "secrettoken",
  "sessiontoken",
  "sessionid",
  "sig",
  "signature",
  "token",
  "ssotoken",
  "webinarpassword",
  "xamzcredential",
  "xamzsecuritytoken",
  "xamzsignature"
]);
const PROTECTED_CONTACT_QUERY_KEYS = new Set(["contact", "email", "phone"]);
const isCredentialQueryKey = (value) =>
  CREDENTIAL_QUERY_KEYS.has(value) ||
  (value.endsWith("s") && CREDENTIAL_QUERY_KEYS.has(value.slice(0, -1))) ||
  /(?:accesscodes?|credentials?|passwords?|secrets?|tokens?)$/.test(value) ||
  /(?:access|auth|invite|join|meeting|oauth|registration|room|verification)[a-z0-9]*(?:codes?|ids?|pins?)$/.test(
    value
  ) ||
  /(?:access|api|auth|client|encryption|host|meeting|private|secret|session|signing)[a-z0-9]*keys?$/.test(
    value
  ) ||
  /^(?:(?:access|api|auth|client|invite|join|private|refresh|registration|secret|sso)[a-z0-9]*tokens?|(?:access|api|client|encryption|host|meeting|private|secret|signing)[a-z0-9]*keys?|credentials?|(?:access|auth|invite|join|meeting|oauth|registration|room|verification)[a-z0-9]*(?:codes?|ids?|pins?)|oauth[a-z0-9]*(?:codes?|tokens?)|session[a-z0-9]*(?:codes?|ids?|keys?|secrets?|tokens?)|webinar[a-z0-9]*passwords?|verification[a-z0-9]*(?:codes?|keys?|tokens?))$/.test(
    value
  );

const exactKeys = (value, expected, label, failures) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    failures.push(`${label} must be an object`);
    return false;
  }

  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) {
    failures.push(
      `${label} keys must be exactly ${wanted.join(", ")} (got ${actual.join(", ")})`
    );
    return false;
  }
  return true;
};

const collectStrings = (
  value,
  result = [],
  { failures, label = "value", maxDepth = 64 } = {}
) => {
  const queue = [{ value, depth: 0 }];
  const seen = new WeakSet();
  let reportedCycle = false;
  let reportedDepth = false;

  while (queue.length > 0) {
    const current = queue.shift();
    if (typeof current.value === "string") {
      result.push(current.value);
      continue;
    }
    if (!current.value || typeof current.value !== "object") continue;
    if (seen.has(current.value)) {
      if (!reportedCycle) failures?.push(`${label} contains a cyclic object`);
      reportedCycle = true;
      continue;
    }
    seen.add(current.value);
    if (current.depth >= maxDepth) {
      if (!reportedDepth) failures?.push(`${label} exceeds the safe nesting depth`);
      reportedDepth = true;
      continue;
    }
    for (const item of Object.values(current.value)) {
      queue.push({ value: item, depth: current.depth + 1 });
    }
  }

  return result;
};

const isInteger = (value) => Number.isInteger(value);

const checkString = (value, label, failures, { max = 500, nullable = false } = {}) => {
  if (nullable && value === null) return;
  if (typeof value !== "string" || !value.trim() || value.length > max) {
    failures.push(`${label} must be a nonempty string of at most ${max} characters`);
  }
};

const canonicalizePublicText = (value) =>
  value
    .normalize("NFKC")
    .replace(/[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu, "");

const isExplicitlyEmptyRosterTemplate = (value) =>
  /\b(?:participant\s+roster|attendee\s+list)\s+template\s+contains\s+no\s+(?:names?\s+(?:or|and)\s+(?:no\s+)?personal\s+data|personal\s+data\s+(?:or|and)\s+(?:no\s+)?names?)\b/i.test(
    value
  );

const publicMetadataPatterns = [
  ["email address", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  [
    "phone number",
    /(?<!\d)(?:\+?1[ ./\-\u2010-\u2015]?)?\(?\d{3}\)?[ ./\-\u2010-\u2015]?\d{3}[ ./\-\u2010-\u2015]?\d{4}(?!\d)/
  ],
  [
    "international phone number",
    /(?<!\d)(?:\+|00)\d{1,3}(?:[ ./\-\u2010-\u2015]*(?:\(0\))?[ ./\-\u2010-\u2015]*\d){6,14}(?!\d)/
  ],
  [
    "private or participant narrative marker",
    /(?:\b(?:attendees?|participants?)\s*(?::|\b(?:include|included|listed|named)\b)|\b(?:attendees?|participants?)\s+(?:were|are)\s+\p{Lu}[\p{L}'\u2019-]*|\b(?:attendee|participant)\s+lists?\b|\b(?:roster|list)\s+of\s+(?:attendees|participants)\b|\bguest\s+(?:lists?|roster)\b|\bnames?\s+of\s+guests?\b|\binvitees?\s*:|\brsvp\s+(?:names?|roster|export)\s*:|\bwho\s+(?:came|attended)\s*:|\b(?:sign[ -]?in|sign[ -]?up|check[ -]?in)\s+(?:sheets?|logs?)(?:\s+names?)?\s*:|\broll\s+call\s*(?::|[-\u2013\u2014])|\bpeople\s+present\s*:|\bregistration\s+lists?\s*(?::|[-\u2013\u2014])|\b(?:event\s+registrants?|registered\s+guests?|confirmed\s+attendees?|guest\s+signups?|volunteer\s+names?)\s*(?::|[-\u2013\u2014])|\b(?:attendee\s+manifest|registrant\s+names?|volunteer\s+directory|attendance\s+register|guest\s+names?|shift\s+sign[ -]?up\s+names?|event\s+check[ -]?in\s+roster)\s*(?::|[-\u2013\u2014])|\bparticipant\s+director(?:y|ies)\s*(?::|[-\u2013\u2014])|\b(?:volunteer|stakeholder)\s+roster\s*(?::|[-\u2013\u2014])|\bmember\s+(?:list|directory)\s*(?::|[-\u2013\u2014])|\bcrew\s+(?:list|manifest)\s*(?::|[-\u2013\u2014])|\b(?:stakeholder|member)\s+directory\s*(?::|[-\u2013\u2014])|\battendee\s+roll(?:\s*:|\s+[-\u2013\u2014]\s+)|\bguest\s+(?:register|signups?)\s*(?::|[-\u2013\u2014])|\battendance\s+count\b|\bparticipant\s+roster\b|\bin confidence\b|\bconfidential\b|\bmedical history\b|\beviction history\b|\bprivate coalition note\b|\braw (?:event|participant|coalition)\b)/iu
  ],
  [
    "named participant narrative marker",
    /\b(?:[Aa]ttendee|[Pp]articipant)\s+\p{Lu}[\p{L}'\u2019-]*/u
  ],
  [
    "named attendance record",
    /\b(?:(?:door\s+)?check[ -]?in\s+names?|attendance\s+(?:ledger|register|sheet)|visitor\s+log|volunteer\s+shift\s+roster|member\s+roll|crew\s+(?:manifest|sign[ -]?in)|stakeholder\s+attendance\s+sheet)\s*(?::|[-\u2013\u2014])/iu
  ],
  [
    "sensitive personal narrative",
    /\b(?:(?:was|is\s+being)\s+evicted|fac(?:e|es|ed|ing)\s+(?:eviction|foreclosure)|at\s+risk\s+of\s+eviction|received\s+an?\s+eviction\s+notice|landlord\s+filed\s+for\s+eviction|pending\s+foreclosure|lost\s+(?:her|his|their)\s+(?:apartment|lease)|forced\s+from\s+(?:her|his|their)\s+home|(?:became|is|was)\s+homeless|unhoused|(?:sleeps?|staying)\s+in\s+(?:an?\s+)?shelter|moved\s+into\s+(?:an?\s+)?shelter|entered\s+(?:emergency\s+housing\s+following|transitional\s+housing\s+after)\s+an?\s+eviction|los(?:e|t|ing)\s+housing|facing\s+housing\s+loss|housing\s+(?:loss|lost)|behind\s+on\s+rent\s+and\s+may\s+lose\s+(?:her|his|their)\s+home|hiv(?:\s+positive)?|(?:hiv|cancer|disability)\s+diagnos(?:is|es)|(?:has|had)\s+(?:an?\s+)?disability|(?:has|had|treating)\s+cancer|living\s+with\s+cancer|diagnosed\s+with\s+leukemia|medical\s+conditions?|(?:being\s+)?treated\s+for\s+leukemia|medically\s+treated|(?:receives?|receiving)\s+psychiatric\s+treatment|(?:underwent|undergoing|receiving)\s+chemo(?:therapy)?(?:\s+treatments?)?|chemotherap(?:y|ies)|(?:undergoing|receiving)\s+radiation\s+therapy|(?:received|receiving|underwent|undergoing|medical)\s+treatments?|treatments?\s+for\s+(?:cancer|hiv|leukemia)|(?:receives?|receiving|needs?)\s+dialysis|(?:takes?|taking|receives?|receiving)\s+insulin|(?:takes?|taking)\s+antiretroviral\s+medication|diabet(?:es|ic)|disclos(?:ed|ing)\s+(?:an?\s+)?(?:hiv|pregnancy|disability\s+diagnosis)|hospitalized\s+for\s+depression|hospitalization|has\s+bipolar\s+disorder|uses?\s+(?:an?\s+)?wheelchair\s+due\s+to\s+(?:an?\s+)?injury|(?:in\s+recovery\s+from\s+substance|recovering\s+from\s+opioid)\s+use|medical\s+history|eviction\s+history)\b/i
  ],
  [
    "named housing-instability disclosure",
    /\b(?:resident|patient|person\s+\p{Lu}[\p{L}'\u2019-]*)(?:\s+\S+){0,5}\s+(?:(?:has|faces?|experienc(?:es|ing))\s+)?housing\s+instability\b/iu
  ],
  [
    "sensitive personal treatment narrative",
    /\b(?:resident|patient)(?:\s+\S+){0,5}\s+(?:(?:discuss(?:ed|ing)|receiv(?:e|es|ed|ing))\s+treatments?|takes?\s+prescribed\s+medication|(?:entered|moved\s+into|stays?|lives?)\s+(?:in\s+)?(?:an?\s+)?(?:shelter|transitional\s+housing)|(?:is\s+)?couch\s+surfing|has\s+no\s+fixed\s+address|(?:was|is|being)\s+treated\s+at\s+(?:an?\s+)?clinic|uses?\s+home\s+oxygen|(?:is\s+)?recovering\s+after\s+surgery|rent\s+arrears\s+are\s+under\s+legal\s+review|(?:is\s+)?pregnant|uses?\s+insulin|receives?\s+mental\s+health\s+care|has\s+asthma\s+and\s+uses?\s+(?:an?\s+)?inhaler|(?:is\s+)?sleeping\s+in\s+(?:an?\s+)?car|lives?\s+in\s+supportive\s+housing\s+due\s+to\s+disability|(?:is\s+)?on\s+(?:an?\s+)?emergency\s+housing\s+waitlist|(?:is\s+)?staying\s+with\s+friends\s+after\s+displacement)\b/i
  ],
  [
    "sensitive resident disclosure",
    /\b(?:resident|patient)(?:\s+\S+){0,5}\s+(?:(?:was\s+)?discharged\s+from\s+psychiatric\s+care|receives?\s+physical\s+therapy|(?:is\s+)?living\s+in\s+(?:an?\s+)?motel\s+after\s+eviction|has\s+rent\s+debt|relies?\s+on\s+(?:an?\s+)?ventilator|(?:is\s+)?on\s+(?:an?\s+)?transplant\s+waitlist|moved\s+to\s+(?:an?\s+)?domestic\s+violence\s+shelter)\b/i
  ],
  [
    "local machine path",
    /(?:\/(?:Applications|Users|Volumes|Library|dev\/shm|etc|home|mnt|opt|root|run\/user(?:\/\d+)?|srv|tmp|usr\/local\/var|workspace|private\/tmp|var\/(?:folders|db\/private|run|tmp))\/|(?:~|\$HOME)\/(?:Library|\.ssh|private|secrets?|sessions?|captures?|exports?)\/|\.\.?\/(?:browser-profiles?|private|secrets?|sessions?|captures?|exports?)\/|(?:^|[\s"'=])(?:browser-profiles?|private|secrets?|sessions?|captures?|exports?)\/[^\s?#]+|[A-Z]:\\(?:Users|Profiles|Documents and Settings|Temp|ProgramData|Windows\\Temp)\\|\\\\(?:localhost|127\.0\.0\.1|[^\\\s]+\\(?:[^\\\s]*\$|private))\\)/i
  ],
  ["meeting credential", /(?:passcode|password|pwd|meeting[_-]?id)\s*[=:]\s*[^\s&]+/i],
  [
    "secret token",
    /\b(?:sk-[A-Za-z0-9_-]{20,}|(?:sk|rk)_live_[A-Za-z0-9]{16,}|gh[opusr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|x(?:app|ox[a-z])[.-][A-Za-z0-9.-]{20,}|npm_[A-Za-z0-9]{20,}|glpat-[A-Za-z0-9_-]{16,}|hf_[A-Za-z0-9]{20,}|A(?:KI|SI)A[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{30,}|SG\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{20,}|SK[0-9a-f]{32})\b/i
  ],
  ["bearer credential", /\bBearer\s+[A-Za-z0-9._~+/-]{6,}\b/i],
  ["basic credential", /\bBasic\s+[A-Za-z0-9+/_-]{8,}={0,2}\b/i],
  [
    "private key material",
    /-----BEGIN(?: [A-Z0-9]+)* PRIVATE KEY-----/i
  ],
  [
    "session cookie",
    /\b(?:session(?:id|_id)?|connect\.sid|phpsessid)\s*=\s*[^;\s]{8,}/i
  ],
  [
    "obfuscated email address",
    /\b[A-Z0-9._%+-]+\s*(?:\[\s*at\s*\]|\(\s*at\s*\)|\bat\b)\s*(?:[A-Z0-9-]+(?:\.[A-Z0-9-]+)+|[A-Z0-9-]+\s*(?:\[\s*dot\s*\]|\(\s*dot\s*\)|\bdot\b)\s*[A-Z]{2,})\b/i
  ],
  [
    "credential assignment",
    /\b(?:api[\s._\-\u2010-\u2015]?keys?|client[\s._\-\u2010-\u2015]?secrets?|access[\s._\-\u2010-\u2015]?(?:keys?|tokens?)|auth[\s._\-\u2010-\u2015]?tokens?|private[\s._\-\u2010-\u2015]?(?:keys?|tokens?)|refresh[\s._\-\u2010-\u2015]?tokens?|session[\s._\-\u2010-\u2015]?tokens?|secret[\s._\-\u2010-\u2015]?(?:keys?|tokens?)|x[\s._\-\u2010-\u2015]?amz[\s._\-\u2010-\u2015]?(?:credential|security[\s._\-\u2010-\u2015]?token|signature)|credentials?|passwords?|passcodes?|pwd|tokens?|secrets?|keys?|codes?|signatures?|meeting[\s._\-\u2010-\u2015]?ids?|jwts?)\b\s*[\]\)}]*\s*[=:]\s*[^\s&]{8,}/i
  ],
  ["embedded URL", /https?:\/\//i]
];

const meetingAccessHostPattern =
  /(?:^|\.)(?:zoom\.us|zoomgov\.com|meet\.google\.com|teams\.microsoft\.com|webex\.com|meet\.jit\.si|whereby\.com|ringcentral\.com|zoho\.com|gotomeeting\.com)$/i;
const meetingAccessUrlPattern =
  /(?:https?:\/\/)?(?:[^/]+\.)?(?:zoom\.us|zoomgov\.com|meet\.google\.com|teams\.(?:microsoft\.com|live\.com|cloud\.microsoft)|webex\.com|meet\.jit\.si|whereby\.com|ringcentral\.com|zoho\.com|gotomeeting\.com)\b/i;
const meetingAccessPathPattern =
  /\/(?:join|meeting|meetings|room|rooms)\/[A-Za-z0-9_-]{8,}(?:\/|$)/i;

const formattedPhoneInPathPattern =
  /(?<!\d)(?:(?:\+?1[ ./\-\u2010-\u2015]+)?\d{3}[ ./\-\u2010-\u2015]+\d{3}[ ./\-\u2010-\u2015]+\d{4}|(?:\+?1[ ./\-\u2010-\u2015]*)?\(\d{3}\)[ ./\-\u2010-\u2015]*\d{3}[ ./\-\u2010-\u2015]+\d{4})(?!\d)/;
const contactPhoneInPathPattern =
  /\/(?:call|contact|phone|tel)(?:\/|[-_])(?:\+?1)?\d{10}(?:\/|$)/i;

const decodeUrlText = (value) => {
  let decoded = value.replace(/\+/g, " ");
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return decoded;
};

const decodeHtmlEntities = (value) => {
  const named = new Map([
    ["amp", "&"],
    ["apos", "'"],
    ["colon", ":"],
    ["commat", "@"],
    ["period", "."],
    ["quot", '"'],
    ["sol", "/"]
  ]);
  return value.replace(
    /&(?:#(\d+)|#x([0-9a-f]+)|([a-z][a-z0-9]+));/gi,
    (entity, decimal, hexadecimal, name) => {
      const codePoint = decimal
        ? Number.parseInt(decimal, 10)
        : hexadecimal
          ? Number.parseInt(hexadecimal, 16)
          : null;
      if (codePoint !== null) {
        try {
          return String.fromCodePoint(codePoint);
        } catch {
          return entity;
        }
      }
      return named.get(name.toLowerCase()) ?? entity;
    }
  );
};

const decodeJsonUnicodeEscapes = (value) =>
  value.replace(/\\u\{([0-9a-f]{1,6})\}|\\u([0-9a-f]{4})/gi, (escape, braced, fixed) => {
    try {
      return String.fromCodePoint(Number.parseInt(braced ?? fixed, 16));
    } catch {
      return escape;
    }
  });

const decodeQuotedPrintable = (value) =>
  value.replace(/=([0-9a-f]{2})/gi, (escape, hexadecimal) => {
    const codePoint = Number.parseInt(hexadecimal, 16);
    return Number.isNaN(codePoint) ? escape : String.fromCodePoint(codePoint);
  });

const decodePotentialBase64 = (value, minimumLength = 8) => {
  const compact = value.trim().replace(/\s+/g, "");
  if (
    compact.length < minimumLength ||
    !/^[A-Za-z0-9+/_-]+={0,2}$/.test(compact)
  ) {
    return null;
  }
  const normalized = compact.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  try {
    const buffer = Buffer.from(padded, "base64");
    const canonical = buffer.toString("base64").replace(/=+$/, "");
    if (canonical !== normalized.replace(/=+$/, "")) return null;
    const decoded = buffer.toString("utf8");
    if (!decoded || decoded.includes("\uFFFD")) return null;
    const printable = [...decoded].filter(
      (character) =>
        character === "\n" ||
        character === "\t" ||
        !/[\p{Cc}\p{Cs}]/u.test(character)
    ).length;
    return printable / decoded.length >= 0.9 ? decoded : null;
  } catch {
    return null;
  }
};

const expandEncodedText = (value, { base64MinimumLength = 8 } = {}) => {
  const queue = [value];
  const expanded = [];
  const seen = new Set();

  while (queue.length > 0 && expanded.length < 32) {
    const current = queue.shift();
    if (typeof current !== "string" || seen.has(current)) continue;
    seen.add(current);
    expanded.push(current);

    const urlDecoded = decodeUrlText(current);
    if (!seen.has(urlDecoded)) queue.push(urlDecoded);

    const htmlDecoded = decodeHtmlEntities(current);
    if (!seen.has(htmlDecoded)) queue.push(htmlDecoded);

    const jsonDecoded = decodeJsonUnicodeEscapes(current);
    if (!seen.has(jsonDecoded)) queue.push(jsonDecoded);

    const quotedPrintableDecoded = decodeQuotedPrintable(current);
    if (!seen.has(quotedPrintableDecoded)) queue.push(quotedPrintableDecoded);

    const base64Decoded = decodePotentialBase64(current, base64MinimumLength);
    if (base64Decoded && !seen.has(base64Decoded)) {
      queue.push(base64Decoded);
    }

    for (const token of current.match(/[A-Za-z0-9+/_-]{12,}={0,2}/g) ?? []) {
      const embeddedBase64Decoded = decodePotentialBase64(
        token,
        base64MinimumLength
      );
      if (embeddedBase64Decoded && !seen.has(embeddedBase64Decoded)) {
        queue.push(embeddedBase64Decoded);
      }
    }
  }

  return {
    values: expanded,
    truncated: queue.some((item) => typeof item === "string" && !seen.has(item))
  };
};

const validateSensitiveText = (
  value,
  label,
  failures,
  { includePhone = true, includeEmbeddedUrl = true } = {}
) => {
  const canonical = canonicalizePublicText(value);
  const separatorNormalized = canonical
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[\p{P}\p{S}]+/gu, " ")
    .replace(/\s+/g, " ");
  for (const [kind, pattern] of publicMetadataPatterns) {
    if (kind === "phone number" && !includePhone) continue;
    if (kind === "embedded URL" && !includeEmbeddedUrl) continue;
    if (
      kind === "private or participant narrative marker" &&
      [value, canonical, separatorNormalized].some(isExplicitlyEmptyRosterTemplate)
    ) {
      continue;
    }
    if (
      pattern.test(value) ||
      pattern.test(canonical) ||
      pattern.test(separatorNormalized)
    ) {
      failures.push(`${label} contains a ${kind}`);
    }
  }
};

const validatePublicMetadata = (value, label, failures) => {
  checkString(value, label, failures, { max: 240 });
  if (typeof value !== "string") return;
  if (/\r|\n/.test(value)) failures.push(`${label} must be single-line metadata`);
  validateSensitiveText(value, label, failures);
};

const validateEncodedComponent = (
  value,
  label,
  failures,
  {
    includePhone = true,
    includePhoneInDecoded = includePhone,
    includeEmbeddedUrl = true
  } = {}
) => {
  const expanded = expandEncodedText(value);
  if (expanded.truncated) {
    failures.push(`${label} exceeds the safe decoding depth`);
  }
  for (const [layerIndex, layer] of expanded.values.entries()) {
    validateSensitiveText(layer, `${label} layer ${layerIndex}`, failures, {
      includePhone: includePhone || (includePhoneInDecoded && layerIndex > 0),
      includeEmbeddedUrl
    });
    if (meetingAccessUrlPattern.test(layer)) {
      failures.push(`${label} exposes a meeting-access URL`);
    }
  }
};

const validatePublicResourceUrl = (parsedUrl, label, failures) => {
  const decodedQueryAndFragment = decodeUrlText(
    `${parsedUrl.search}${parsedUrl.hash}`
  );

  validateEncodedComponent(parsedUrl.pathname, `${label} path`, failures, {
    includePhone: false,
    includePhoneInDecoded: true,
    includeEmbeddedUrl: false
  });
  if (
    formattedPhoneInPathPattern.test(
      canonicalizePublicText(decodeUrlText(parsedUrl.pathname))
    ) ||
    contactPhoneInPathPattern.test(
      canonicalizePublicText(decodeUrlText(parsedUrl.pathname))
    )
  ) {
    failures.push(`${label} path contains a formatted phone number`);
  }
  if (meetingAccessPathPattern.test(decodeUrlText(parsedUrl.pathname))) {
    failures.push(`${label} exposes a meeting-access route`);
  }
  for (const [segmentIndex, segment] of parsedUrl.pathname
    .split("/")
    .filter(Boolean)
    .entries()) {
    validateEncodedComponent(
      segment,
      `${label} path segment ${segmentIndex}`,
      failures,
      {
        includePhone: false,
        includePhoneInDecoded: true,
        includeEmbeddedUrl: false
      }
    );
  }
  validateEncodedComponent(
    parsedUrl.hash.replace(/^#/, ""),
    `${label} fragment`,
    failures
  );
  validateSensitiveText(
    decodedQueryAndFragment,
    `${label} query or fragment`,
    failures
  );

  for (const [key, value] of parsedUrl.searchParams) {
    const expandedKey = expandEncodedText(key, { base64MinimumLength: 4 });
    if (expandedKey.truncated) {
      failures.push(`${label} query key exceeds the safe decoding depth`);
    }
    const normalizedKeys = expandedKey.values.map((layer) =>
      canonicalizePublicText(decodeUrlText(layer))
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
    );
    validateEncodedComponent(key, `${label} query key`, failures, {
      includeEmbeddedUrl: false
    });
    if (
      normalizedKeys.some((normalizedKey) => isCredentialQueryKey(normalizedKey))
    ) {
      failures.push(`${label} contains a credential-bearing query parameter`);
    }
    const decodedValue = decodeUrlText(value);
    if (
      decodedValue &&
      normalizedKeys.some((normalizedKey) =>
        PROTECTED_CONTACT_QUERY_KEYS.has(normalizedKey)
      )
    ) {
      failures.push(`${label} contains a protected contact query parameter`);
    }
    validateEncodedComponent(value, `${label} decoded query value`, failures);
  }

  if (
    meetingAccessHostPattern.test(parsedUrl.hostname) ||
    meetingAccessUrlPattern.test(decodedQueryAndFragment)
  ) {
    failures.push(`${label} exposes a meeting-access URL`);
  }
};

export function normalizeNycacEventRouteUrl(value) {
  const url = new URL(value);
  return `${url.hostname.replace(/^www\./, "")}${url.pathname.replace(/\/$/, "")}`;
}

const normalizeNycacEventRouteUrlSafely = (value) => {
  try {
    return normalizeNycacEventRouteUrl(value);
  } catch {
    return null;
  }
};

export function isRecurringNycacMeeting(event) {
  return (
    event?.relationToPage === "index-displayed-nycac-organizer" &&
    /\bmeeting\b/i.test(event?.title ?? "") &&
    (/NYC Artist Coalition/i.test(event?.title ?? "") ||
      /\bNAC\b/i.test(event?.title ?? ""))
  );
}

export function parseFacebookDisplayCount(value) {
  if (value === null) return null;
  if (
    typeof value !== "string" ||
    !/^(?:(?:0|[1-9]\d*)|(?:0|[1-9]\d*)(?:\.\d+)?K)$/.test(value)
  ) {
    return Number.NaN;
  }
  return Number.parseFloat(value) * (value.endsWith("K") ? 1000 : 1);
}

export function facebookDisplayCountRange(value) {
  const point = parseFacebookDisplayCount(value);
  if (point === null || Number.isNaN(point)) return [point, point];
  if (!value.endsWith("K")) return [point, point];
  const decimalPlaces = value.match(/\.(\d+)K$/)?.[1].length ?? 0;
  const roundingStep = 1000 / 10 ** decimalPlaces;
  return [point - roundingStep / 2, point + roundingStep / 2 - 1];
}

export function nycacEventIdentitySha256(events) {
  return createHash("sha256")
    .update(
      events
        .map((event) => `${event?.id}\t${event?.date}\t${event?.title}`)
        .join("\n")
    )
    .digest("hex");
}

export function nycacEventRecordSha256(events) {
  try {
    return createHash("sha256")
      .update(
        events
          .map((event) =>
            JSON.stringify({
              id: event?.id,
              url: event?.url,
              date: event?.date,
              dateLabel: event?.dateLabel,
              title: event?.title,
              venue: event?.venue,
              venueCategory: event?.venueCategory,
              indexOrganizerDisplay: event?.indexOrganizerDisplay,
              detailOrganizerDisplay: event?.detailOrganizerDisplay,
              relationToPage: event?.relationToPage,
              duration: event?.duration,
              responseSnapshot: event?.responseSnapshot,
              topics: event?.topics,
              withheldOutboundLinkCount: event?.withheldOutboundLinkCount,
              withheldOutboundLinkCategories:
                event?.withheldOutboundLinkCategories,
              retrievalState: event?.retrievalState
            })
          )
          .join("\n")
      )
      .digest("hex");
  } catch {
    return null;
  }
}

export function nycacEventRelationshipSha256(events) {
  return createHash("sha256")
    .update(
      events
        .map(
          (event) =>
            `${event?.id}\t${event?.relationToPage}\t${event?.indexOrganizerDisplay}\t${event?.detailOrganizerDisplay}`
        )
        .join("\n")
    )
    .digest("hex");
}

export function nycacArticleRouteSha256(articles) {
  return createHash("sha256")
    .update(
      articles
        .map((article) => {
          let normalizedUrl = "invalid-url";
          try {
            normalizedUrl = normalizeNycacEventRouteUrl(article?.url);
          } catch {
            // URL validation reports the specific error; the digest still fails.
          }
          return `${article?.eventId}\t${article?.eventTitle}\t${normalizedUrl}\t${article?.title}\t${article?.publisher}`;
        })
        .join("\n")
    )
    .digest("hex");
}

export function validateNycacFacebookEventsManifest(
  manifest,
  { corpusText, corpusSha256, sortedEventIdSha256, eventIdentitySha256 } = {}
) {
  const failures = [];
  exactKeys(
    manifest,
    [
      "schemaVersion",
      "corpusSchemaVersion",
      "status",
      "capturedAt",
      "account",
      "surface",
      "corpusPath",
      "corpusSha256",
      "corpusBytes",
      "pageDisplayedPastEventSlots",
      "recoveredEventRecords",
      "unresolvedControlSlots",
      "sortedEventIdSha256",
      "eventIdentitySha256",
      "currentReplay",
      "scopeNote",
      "publicSafetyNote"
    ],
    "manifest",
    failures
  );
  exactKeys(
    manifest?.currentReplay,
    [
      "recoveredEventRecords",
      "growthSequence",
      "terminalStableCount",
      "sortedEventIdSha256"
    ],
    "manifest.currentReplay",
    failures
  );

  if (manifest?.schemaVersion !== 2) failures.push("manifest.schemaVersion must be 2");
  if (manifest?.corpusSchemaVersion !== 3) {
    failures.push("manifest.corpusSchemaVersion must be 3");
  }
  if (manifest?.status !== "public-safe-metadata-only") {
    failures.push("manifest.status must be public-safe-metadata-only");
  }
  if (manifest?.account !== "@nycartc") failures.push("manifest.account must be @nycartc");
  if (manifest?.surface !== "Facebook Past Events") {
    failures.push("manifest.surface must be Facebook Past Events");
  }
  if (
    manifest?.corpusPath !==
    "docs/knowledge-bank/corpora/nycartc-facebook-events-full-population-2026-07-15.json"
  ) {
    failures.push("manifest.corpusPath must name the canonical public-safe corpus");
  }
  if (manifest?.capturedAt !== "2026-07-15") {
    failures.push("manifest.capturedAt must be 2026-07-15");
  }
  if (manifest?.scopeNote !== MANIFEST_SCOPE_NOTE) {
    failures.push("manifest.scopeNote must preserve the reviewed population boundary");
  }
  if (manifest?.publicSafetyNote !== MANIFEST_PUBLIC_SAFETY_NOTE) {
    failures.push("manifest.publicSafetyNote must preserve the reviewed exclusion boundary");
  }
  if (manifest?.pageDisplayedPastEventSlots !== 34) {
    failures.push("manifest.pageDisplayedPastEventSlots must be 34");
  }
  if (manifest?.recoveredEventRecords !== 33) {
    failures.push("manifest.recoveredEventRecords must be 33");
  }
  if (manifest?.unresolvedControlSlots !== 1) {
    failures.push("manifest.unresolvedControlSlots must be 1");
  }
  if (manifest?.currentReplay?.recoveredEventRecords !== 33) {
    failures.push("manifest.currentReplay.recoveredEventRecords must be 33");
  }
  if (manifest?.currentReplay?.terminalStableCount !== 33) {
    failures.push("manifest.currentReplay.terminalStableCount must be 33");
  }
  if (
    JSON.stringify(manifest?.currentReplay?.growthSequence) !==
    JSON.stringify([24, 32, 33])
  ) {
    failures.push("manifest.currentReplay.growthSequence must be [24, 32, 33]");
  }
  if (typeof corpusText === "string" && manifest?.corpusBytes !== Buffer.byteLength(corpusText)) {
    failures.push("manifest.corpusBytes does not match the corpus bytes");
  }
  if (corpusSha256 && manifest?.corpusSha256 !== corpusSha256) {
    failures.push("manifest.corpusSha256 does not match the corpus digest");
  }
  if (
    sortedEventIdSha256 &&
    (manifest?.sortedEventIdSha256 !== sortedEventIdSha256 ||
      manifest?.currentReplay?.sortedEventIdSha256 !== sortedEventIdSha256)
  ) {
    failures.push("manifest event-ID digests do not match the corpus");
  }
  if (
    eventIdentitySha256 &&
    manifest?.eventIdentitySha256 !== eventIdentitySha256
  ) {
    failures.push("manifest.eventIdentitySha256 does not bind the corpus event identities");
  }

  const allText = collectStrings(manifest, [], {
    failures,
    label: "manifest"
  }).join("\n");
  for (const [kind, pattern] of publicMetadataPatterns) {
    if (pattern.test(allText) && kind !== "private or participant narrative marker") {
      failures.push(`manifest contains a ${kind}`);
    }
  }
  if (/https?:\/\/(?:[^/]+\.)?(?:zoom\.us|meet\.google\.com|teams\.microsoft\.com)\b/i.test(allText)) {
    failures.push("manifest contains a meeting-access URL");
  }

  return failures;
}

export function validateNycacFacebookEventsCorpus(corpus) {
  const failures = [];

  exactKeys(
    corpus,
    [
      "schemaVersion",
      "capturedAt",
      "page",
      "populationReconciliation",
      "publicSafety",
      "aggregateSnapshot",
      "derivedClassifications",
      "postedSourceArticles",
      "events"
    ],
    "corpus",
    failures
  );
  exactKeys(corpus?.page, ["name", "handle", "eventsUrl", "selectedSurface"], "corpus.page", failures);
  exactKeys(
    corpus?.populationReconciliation,
    [
      "scope",
      "pageDisplayedPastEventCount",
      "recoveredIndexEventCount",
      "recoveredDetailEventCount",
      "detailRetrievalFailureCount",
      "unmaterializedCount",
      "detailAvailabilityRecheck",
      "terminalState",
      "reconciliationNote"
    ],
    "corpus.populationReconciliation",
    failures
  );
  exactKeys(
    corpus?.populationReconciliation?.detailAvailabilityRecheck,
    [
      "recoveredEventIdCount",
      "recoveredDetailCount",
      "temporarilyUnavailableDetailCount",
      "temporarilyUnavailableEventIds",
      "interpretation"
    ],
    "corpus.populationReconciliation.detailAvailabilityRecheck",
    failures
  );
  exactKeys(
    corpus?.populationReconciliation?.terminalState,
    ["scrollRounds", "stableRounds"],
    "corpus.populationReconciliation.terminalState",
    failures
  );
  exactKeys(
    corpus?.publicSafety,
    [
      "rawDescriptionsPublished",
      "attendeeIdentitiesPublished",
      "contactDetailsPublished",
      "accessCredentialsPublished",
      "rawCaptureLocation",
      "note"
    ],
    "corpus.publicSafety",
    failures
  );
  exactKeys(
    corpus?.aggregateSnapshot,
    [
      "exposedEvents",
      "indexDisplayedNycacOrganizerEvents",
      "alliedOrCohostedListings",
      "eventsWithDisplayedResponseCount",
      "roundedResponseCountEvents",
      "eventsAtOrAbove100Responses",
      "eventsAtOrAbove500Responses",
      "eventsAtOrAbove1000Responses",
      "interpretation"
    ],
    "corpus.aggregateSnapshot",
    failures
  );
  exactKeys(corpus?.derivedClassifications, ["recurringCoalitionMeetings"], "corpus.derivedClassifications", failures);
  exactKeys(
    corpus?.derivedClassifications?.recurringCoalitionMeetings,
    ["method", "eventIds", "physicalEventCount", "virtualEventCount"],
    "corpus.derivedClassifications.recurringCoalitionMeetings",
    failures
  );

  if (corpus?.schemaVersion !== 3) failures.push(`corpus.schemaVersion must be 3 (got ${corpus?.schemaVersion})`);
  if (corpus?.capturedAt !== "2026-07-15") failures.push("corpus.capturedAt must be 2026-07-15");
  if (
    corpus?.page?.name !== "NYC Artist Coalition" ||
    corpus?.page?.handle !== "nycartc" ||
    corpus?.page?.eventsUrl !== "https://www.facebook.com/nycartc/events" ||
    corpus?.page?.selectedSurface !== "Past Events"
  ) {
    failures.push("corpus.page must identify the canonical NYC Artist Coalition Past Events surface");
  }
  if (
    corpus?.publicSafety?.rawDescriptionsPublished !== false ||
    corpus?.publicSafety?.attendeeIdentitiesPublished !== false ||
    corpus?.publicSafety?.contactDetailsPublished !== false ||
    corpus?.publicSafety?.accessCredentialsPublished !== false
  ) {
    failures.push("public-safety publication flags must all be false");
  }
  if (corpus?.publicSafety?.rawCaptureLocation !== "protected-research-workspace") {
    failures.push("publicSafety.rawCaptureLocation must use the public-safe abstract locator");
  }
  if (corpus?.publicSafety?.note !== PUBLIC_SAFETY_NOTE) {
    failures.push("publicSafety.note must preserve the reviewed exclusion boundary");
  }

  const events = Array.isArray(corpus?.events) ? corpus.events : [];
  if (!Array.isArray(corpus?.events)) failures.push("corpus.events must be an array");
  const eventIds = events.map((event) => event?.id);
  const eventIdSet = new Set(eventIds);

  events.forEach((event, eventIndex) => {
    const label = `corpus.events[${eventIndex}]`;
    const eventShapeIsExact = exactKeys(
      event,
      [
        "id",
        "url",
        "date",
        "dateLabel",
        "title",
        "venue",
        "venueCategory",
        "indexOrganizerDisplay",
        "detailOrganizerDisplay",
        "relationToPage",
        "duration",
        "responseSnapshot",
        "topics",
        "outboundResources",
        "withheldOutboundLinkCount",
        "withheldOutboundLinkCategories",
        "retrievalState"
      ],
      label,
      failures
    );
    if (!eventShapeIsExact) return;

    if (typeof event?.id !== "string" || !/^\d+$/.test(event.id)) failures.push(`${label}.id must be numeric text`);
    if (event?.url !== `https://www.facebook.com/events/${event?.id}/`) failures.push(`${label}.url must match its event ID`);
    if (typeof event?.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(event.date)) failures.push(`${label}.date must be YYYY-MM-DD`);
    validatePublicMetadata(event?.dateLabel, `${label}.dateLabel`, failures);
    if (typeof event?.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
      const parsedDate = new Date(`${event.date}T00:00:00Z`);
      const isRealDate =
        !Number.isNaN(parsedDate.getTime()) &&
        parsedDate.toISOString().slice(0, 10) === event.date;
      if (!isRealDate) {
        failures.push(`${label}.date must be a real calendar date`);
      } else {
        const expectedDateLabel = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC"
        }).format(parsedDate);
        if (event.dateLabel !== expectedDateLabel) {
          failures.push(`${label}.dateLabel must derive from date`);
        }
      }
    }
    validatePublicMetadata(event?.title, `${label}.title`, failures);
    if (event?.venue === null && event?.venueCategory === "virtual") {
      // Some online events exposed no venue label.
    } else {
      validatePublicMetadata(event?.venue, `${label}.venue`, failures);
    }
    validatePublicMetadata(event?.indexOrganizerDisplay, `${label}.indexOrganizerDisplay`, failures);
    validatePublicMetadata(event?.detailOrganizerDisplay, `${label}.detailOrganizerDisplay`, failures);
    if (!VENUE_CATEGORIES.has(event?.venueCategory)) failures.push(`${label}.venueCategory is outside the taxonomy`);
    if (!RELATIONS.has(event?.relationToPage)) failures.push(`${label}.relationToPage is outside the taxonomy`);
    if (
      event?.relationToPage === "index-displayed-nycac-organizer" &&
      event?.indexOrganizerDisplay !== "NYC Artist Coalition"
    ) {
      failures.push(
        `${label}.indexOrganizerDisplay must match the direct NYC Artist Coalition relation`
      );
    }
    if (
      event?.relationToPage === "allied-or-cohosted-listing" &&
      event?.indexOrganizerDisplay === "NYC Artist Coalition"
    ) {
      failures.push(
        `${label}.indexOrganizerDisplay contradicts the allied or cohosted relation`
      );
    }
    if (!DURATION_VALUES.has(event?.duration)) failures.push(`${label}.duration is outside the captured value set`);
    if (event?.retrievalState !== "retrieved") failures.push(`${label}.retrievalState must be retrieved`);

    if (!Array.isArray(event?.topics) || !event.topics.length) {
      failures.push(`${label}.topics must be a nonempty array`);
    } else {
      if (new Set(event.topics).size !== event.topics.length) failures.push(`${label}.topics must be unique`);
      for (const topic of event.topics) if (!TOPICS.has(topic)) failures.push(`${label}.topics contains an unknown topic: ${topic}`);
    }

    if (event?.responseSnapshot !== null) {
      const responseShapeIsExact = exactKeys(
        event?.responseSnapshot,
        ["respondedDisplay", "wentDisplay", "interestedDisplay", "pointEstimate", "rounded", "interpretation"],
        `${label}.responseSnapshot`,
        failures
      );
      if (!responseShapeIsExact) return;
      const response = event?.responseSnapshot;
      const parsed = parseFacebookDisplayCount(response?.respondedDisplay);
      const displays = [response?.respondedDisplay, response?.wentDisplay, response?.interestedDisplay];
      if (displays.some((value) => Number.isNaN(parseFacebookDisplayCount(value)))) failures.push(`${label}.responseSnapshot has an invalid display count`);
      if (parsed !== response?.pointEstimate) failures.push(`${label}.responseSnapshot pointEstimate must derive from respondedDisplay`);
      if (response?.rounded !== (typeof response?.respondedDisplay === "string" && response.respondedDisplay.endsWith("K"))) failures.push(`${label}.responseSnapshot rounded flag must derive from respondedDisplay`);
      const allDisplaysNull = displays.every((value) => value === null);
      if (allDisplaysNull) {
        if (response?.pointEstimate !== null || response?.rounded !== false) {
          failures.push(`${label}.responseSnapshot empty state is inconsistent`);
        }
      } else if (displays.some((value) => value === null)) {
        failures.push(`${label}.responseSnapshot display fields must be all present or all null`);
      } else {
        const [respondedMin, respondedMax] = facebookDisplayCountRange(
          response.respondedDisplay
        );
        const [wentMin, wentMax] = facebookDisplayCountRange(response.wentDisplay);
        const [interestedMin, interestedMax] = facebookDisplayCountRange(
          response.interestedDisplay
        );
        const componentMin = wentMin + interestedMin;
        const componentMax = wentMax + interestedMax;
        if (
          Math.max(respondedMin, componentMin) >
          Math.min(respondedMax, componentMax)
        ) {
          failures.push(
            `${label}.responseSnapshot responded display must reconcile with went plus interested at display precision`
          );
        }
      }
      if (response?.interpretation !== "Historical Facebook response actions; not unique people or verified attendance.") failures.push(`${label}.responseSnapshot interpretation must preserve the response boundary`);
    }

    if (!Array.isArray(event?.outboundResources)) {
      failures.push(`${label}.outboundResources must be an array`);
    } else {
      const resourceKeys = new Set();
      event.outboundResources.forEach((resource, resourceIndex) => {
        const resourceLabel = `${label}.outboundResources[${resourceIndex}]`;
        exactKeys(resource, ["url", "host", "resourceType"], resourceLabel, failures);
        checkString(resource?.url, `${resourceLabel}.url`, failures, { max: 2000 });
        let parsedUrl;
        try {
          parsedUrl = new URL(resource?.url);
        } catch {
          failures.push(`${resourceLabel}.url must be an absolute URL`);
        }
        if (parsedUrl && !["http:", "https:"].includes(parsedUrl.protocol)) failures.push(`${resourceLabel}.url must use HTTP or HTTPS`);
        if (parsedUrl && (parsedUrl.username || parsedUrl.password)) failures.push(`${resourceLabel}.url must not contain credentials`);
        if (parsedUrl) validatePublicResourceUrl(parsedUrl, `${resourceLabel}.url`, failures);
        if (parsedUrl && resource?.host !== parsedUrl.hostname) failures.push(`${resourceLabel}.host must match the URL hostname`);
        if (!RESOURCE_HOSTS.has(resource?.host)) failures.push(`${resourceLabel}.host is not public-safe allowlisted`);
        if (meetingAccessHostPattern.test(resource?.host ?? "")) failures.push(`${resourceLabel} exposes a meeting-access host`);
        if (!RESOURCE_TYPES.has(resource?.resourceType)) failures.push(`${resourceLabel}.resourceType is outside the taxonomy`);
        const key = `${resource?.url}\n${resource?.resourceType}`;
        if (resourceKeys.has(key)) failures.push(`${label}.outboundResources contains a duplicate resource`);
        resourceKeys.add(key);
      });
    }

    if (!isInteger(event?.withheldOutboundLinkCount) || event.withheldOutboundLinkCount < 0) failures.push(`${label}.withheldOutboundLinkCount must be a nonnegative integer`);
    if (!Array.isArray(event?.withheldOutboundLinkCategories)) {
      failures.push(`${label}.withheldOutboundLinkCategories must be an array`);
    } else {
      if (new Set(event.withheldOutboundLinkCategories).size !== event.withheldOutboundLinkCategories.length) failures.push(`${label}.withheldOutboundLinkCategories must be unique`);
      for (const category of event.withheldOutboundLinkCategories) if (!WITHHELD_CATEGORIES.has(category)) failures.push(`${label}.withheldOutboundLinkCategories contains an unknown category`);
      if ((event.withheldOutboundLinkCount === 0) !== (event.withheldOutboundLinkCategories.length === 0)) failures.push(`${label}.withheld link count and categories disagree`);
      if (event.withheldOutboundLinkCategories.length > event.withheldOutboundLinkCount) failures.push(`${label}.withheld categories cannot exceed the withheld link count`);
    }
  });

  if (
    events.some(
      (event) => !event || typeof event !== "object" || Array.isArray(event)
    )
  ) {
    return failures;
  }

  if (events.length !== 33 || eventIdSet.size !== 33) failures.push("corpus must contain 33 unique event records");
  if (!events.every((event, index) => index === 0 || events[index - 1].date <= event.date)) failures.push("corpus events must be chronological");
  if (nycacEventIdentitySha256(events) !== EXPECTED_EVENT_IDENTITY_SHA256) {
    failures.push("event IDs must remain bound to their reviewed dates and titles");
  }
  if (nycacEventRecordSha256(events) !== EXPECTED_EVENT_RECORD_SHA256) {
    failures.push(
      "event metadata and response snapshots must remain bound to the reviewed records"
    );
  }
  if (
    nycacEventRelationshipSha256(events) !==
    EXPECTED_EVENT_RELATIONSHIP_SHA256
  ) {
    failures.push(
      "event organizer displays and relationships must remain bound to the reviewed event identities"
    );
  }

  const population = corpus?.populationReconciliation;
  if (
    population?.scope !== POPULATION_SCOPE ||
    population?.reconciliationNote !== RECONCILIATION_NOTE
  ) {
    failures.push("population narrative fields must preserve the reviewed scope boundary");
  }
  if (
    population?.pageDisplayedPastEventCount !== 34 ||
    population?.recoveredIndexEventCount !== events.length ||
    population?.recoveredDetailEventCount !== events.length ||
    population?.detailRetrievalFailureCount !== 0 ||
    population?.unmaterializedCount !== 1 ||
    population?.pageDisplayedPastEventCount !==
      population?.recoveredIndexEventCount + population?.unmaterializedCount
  ) {
    failures.push("population reconciliation must derive 34 = 33 recovered + 1 unresolved");
  }
  const recheck = population?.detailAvailabilityRecheck;
  if (
    recheck?.recoveredEventIdCount !== events.length ||
    recheck?.recoveredDetailCount !== 28 ||
    recheck?.temporarilyUnavailableDetailCount !== 5 ||
    !Array.isArray(recheck?.temporarilyUnavailableEventIds) ||
    recheck?.temporarilyUnavailableEventIds.length !== 5 ||
    new Set(recheck?.temporarilyUnavailableEventIds ?? []).size !== 5 ||
    !recheck?.temporarilyUnavailableEventIds.every((id) => eventIdSet.has(id)) ||
    recheck?.interpretation !== RECHECK_INTERPRETATION
  ) {
    failures.push("detail availability recheck must reconcile 33 IDs as 28 recovered + 5 temporarily unavailable");
  }

  const responses = events.filter((event) => typeof event?.responseSnapshot?.pointEstimate === "number");
  const aggregate = corpus?.aggregateSnapshot;
  if (aggregate?.interpretation !== AGGREGATE_INTERPRETATION) {
    failures.push("aggregateSnapshot.interpretation must preserve the response boundary");
  }
  const derivedAggregate = {
    exposedEvents: events.length,
    indexDisplayedNycacOrganizerEvents: events.filter((event) => event.relationToPage === "index-displayed-nycac-organizer").length,
    alliedOrCohostedListings: events.filter((event) => event.relationToPage === "allied-or-cohosted-listing").length,
    eventsWithDisplayedResponseCount: responses.length,
    roundedResponseCountEvents: responses.filter((event) => event.responseSnapshot.rounded).length,
    eventsAtOrAbove100Responses: responses.filter((event) => event.responseSnapshot.pointEstimate >= 100).length,
    eventsAtOrAbove500Responses: responses.filter((event) => event.responseSnapshot.pointEstimate >= 500).length,
    eventsAtOrAbove1000Responses: responses.filter((event) => event.responseSnapshot.pointEstimate >= 1000).length
  };
  for (const [key, value] of Object.entries(derivedAggregate)) {
    if (aggregate?.[key] !== value) failures.push(`aggregateSnapshot.${key} must derive to ${value}`);
  }
  if ("responseActionPointEstimate" in (aggregate ?? {})) failures.push("cross-event response point estimates must not be published");

  const recurring = events.filter(isRecurringNycacMeeting);
  const recurringIds = recurring.map((event) => event.id);
  const recurringClassification = corpus?.derivedClassifications?.recurringCoalitionMeetings;
  if (recurringClassification?.method !== RECURRING_METHOD) failures.push("recurring meeting method must state the deterministic rule exactly");
  if (JSON.stringify(recurringClassification?.eventIds) !== JSON.stringify(recurringIds)) failures.push("recurring meeting IDs must derive from the deterministic title and relationship rule");
  const virtualRecurring = recurring.filter((event) => event.venueCategory === "virtual").length;
  if (recurringClassification?.physicalEventCount !== recurring.length - virtualRecurring || recurringClassification?.virtualEventCount !== virtualRecurring) failures.push("recurring meeting physical and virtual counts must derive from classified events");

  if (!Array.isArray(corpus?.postedSourceArticles)) {
    failures.push("corpus.postedSourceArticles must be an array");
  } else {
    const articleKeys = new Set();
    const postedRouteKeys = new Set();
    corpus.postedSourceArticles.forEach((article, index) => {
      const label = `corpus.postedSourceArticles[${index}]`;
      exactKeys(article, ["eventId", "eventTitle", "url", "title", "publisher"], label, failures);
      checkString(article?.url, `${label}.url`, failures, { max: 2000 });
      validatePublicMetadata(article?.eventTitle, `${label}.eventTitle`, failures);
      validatePublicMetadata(article?.title, `${label}.title`, failures);
      validatePublicMetadata(article?.publisher, `${label}.publisher`, failures);
      const event = events.find((candidate) => candidate.id === article?.eventId);
      if (!event || event.title !== article?.eventTitle) failures.push(`${label} must join to an event with the same title`);
      let normalizedArticleUrl = null;
      if (typeof article?.url === "string") {
        try {
          normalizedArticleUrl = normalizeNycacEventRouteUrl(article.url);
        } catch {
          failures.push(`${label}.url must be an absolute URL`);
        }
      }
      let parsedArticleUrl = null;
      if (typeof article?.url === "string") {
        try {
          parsedArticleUrl = new URL(article.url);
          validatePublicResourceUrl(parsedArticleUrl, `${label}.url`, failures);
        } catch {
          // The absolute-URL failure above is the canonical parse error.
        }
      }
      if (
        parsedArticleUrl &&
        ARTICLE_PUBLISHERS_BY_HOST.get(parsedArticleUrl.hostname) !==
          article?.publisher
      ) {
        failures.push(`${label}.publisher must match the reviewed article host`);
      }
      if (
        !normalizedArticleUrl ||
        !Array.isArray(event?.outboundResources) ||
        !event.outboundResources.some(
          (resource) =>
            resource?.resourceType === "source-article" &&
            normalizeNycacEventRouteUrlSafely(resource?.url) ===
              normalizedArticleUrl
        )
      ) {
        failures.push(`${label} must join to one event source-article resource`);
      }
      const key = `${article?.eventId}\n${article?.url}`;
      if (articleKeys.has(key)) failures.push("postedSourceArticles must be unique by event and URL");
      articleKeys.add(key);
      postedRouteKeys.add(`${article?.eventId}\n${normalizedArticleUrl}`);
    });
    const eventArticleRouteKeys = events.flatMap((event) =>
      (Array.isArray(event?.outboundResources) ? event.outboundResources : [])
        .filter((resource) => resource?.resourceType === "source-article")
        .map((resource) => {
          let normalizedUrl = "invalid-url";
          try {
            normalizedUrl = normalizeNycacEventRouteUrl(resource.url);
          } catch {
            // Resource URL validation reports the specific error.
          }
          return `${event.id}\n${normalizedUrl}`;
        })
    );
    if (
      eventArticleRouteKeys.length !== 7 ||
      eventArticleRouteKeys.some((key) => !postedRouteKeys.has(key))
    ) {
      failures.push(
        "every reviewed event source-article resource must have one postedSourceArticles record"
      );
    }
    if (
      corpus.postedSourceArticles.length !== 7 ||
      nycacArticleRouteSha256(corpus.postedSourceArticles) !==
        EXPECTED_ARTICLE_ROUTE_SHA256
    ) {
      failures.push(
        "postedSourceArticles must remain bound to the seven reviewed event and article routes"
      );
    }
  }

  const allText = collectStrings(corpus, [], {
    failures,
    label: "corpus"
  }).join("\n");
  const globallySensitivePatterns = publicMetadataPatterns.filter(
    ([kind]) =>
      ![
        "private or participant narrative marker",
        "phone number",
        "embedded URL"
      ].includes(kind)
  );
  for (const [kind, pattern] of globallySensitivePatterns) if (pattern.test(allText)) failures.push(`corpus contains a ${kind}`);
  if (meetingAccessUrlPattern.test(decodeUrlText(allText))) {
    failures.push("corpus contains a meeting-access URL");
  }

  return failures;
}
