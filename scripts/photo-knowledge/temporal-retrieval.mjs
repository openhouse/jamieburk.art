// A private caller may supply capture metadata; this pure helper neither opens
// a library nor establishes event membership, identity, or publication rights.
function parseOffsetInstant(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match || match[8] === "-00:00") return null;
  const [, year, month, day, hour, minute, second, fraction = "", offset] = match;
  const fields = [year, month, day, hour, minute, second].map(Number);
  const local = new Date(0);
  local.setUTCFullYear(fields[0], fields[1] - 1, fields[2]);
  local.setUTCHours(fields[3], fields[4], fields[5], Number(fraction.padEnd(3, "0")));
  if ([local.getUTCFullYear(), local.getUTCMonth() + 1, local.getUTCDate(),
    local.getUTCHours(), local.getUTCMinutes(), local.getUTCSeconds()]
    .some((field, index) => field !== fields[index])) return null;
  let offsetMinutes = 0;
  if (offset !== "Z") {
    const hours = Number(offset.slice(1, 3));
    const minutes = Number(offset.slice(4, 6));
    if (hours > 14 || minutes > 59 || (hours === 14 && minutes !== 0)) return null;
    offsetMinutes = (hours * 60 + minutes) * (offset[0] === "+" ? 1 : -1);
  }
  return local.getTime() - offsetMinutes * 60_000;
}

/**
 * Compare a capture interval with a declared closed event-search window.
 * Explicit offsets are supplied evidence, not inferred IANA-zone/DST rules.
 * Any clock uncertainty must be declared by the caller; zero does not certify
 * the camera clock. Even exact overlap is only a candidate for visual review.
 */
export function evaluateTemporalPhotoCandidate(input = {}) {
  const { window, timestamp } = input ?? {};
  const reasonCodes = [];
  const start = parseOffsetInstant(window?.start);
  const end = parseOffsetInstant(window?.end);
  const capture = parseOffsetInstant(timestamp?.value);
  const uncertainty = timestamp?.uncertaintySeconds;
  if (start === null || end === null || end < start) {
    reasonCodes.push("valid-offset-window-required");
  }
  if (timestamp?.basis !== "capture") reasonCodes.push("capture-basis-required");
  if (capture === null) reasonCodes.push("valid-offset-capture-time-required");
  if (!Number.isSafeInteger(uncertainty) || uncertainty < 0 ||
      !Number.isSafeInteger(uncertainty * 1000) ||
      (capture !== null && (!Number.isSafeInteger(capture - uncertainty * 1000) ||
        !Number.isSafeInteger(capture + uncertainty * 1000)))) {
    reasonCodes.push("valid-uncertainty-required");
  }
  const result = {
    state: "hold",
    reasonCodes,
    captureInstant: null,
    windowDurationSeconds: null,
    eventEstablished: false,
    identityEstablished: false,
    captionEstablished: false,
    publicationAuthorized: false,
    provesNoRelevantPhotoExists: false,
    requiresVisualReview: true
  };
  if (reasonCodes.length) return result;
  result.captureInstant = new Date(capture).toISOString();
  result.windowDurationSeconds = (end - start) / 1000;
  const overlaps = capture + uncertainty * 1000 >= start && capture - uncertainty * 1000 <= end;
  result.state = overlaps ? (uncertainty ? "uncertain-candidate" : "candidate") : "outside-window";
  return result;
}
