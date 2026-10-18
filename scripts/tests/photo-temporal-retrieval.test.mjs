import assert from "node:assert/strict";
import test from "node:test";

import * as photoKnowledge from "../photo-knowledge/lib.mjs";

const window = {
  start: "2024-06-12T23:45:00-04:00",
  end: "2024-06-13T00:15:00-04:00"
};

function evaluate(input = {}) {
  assert.equal(typeof photoKnowledge.evaluateTemporalPhotoCandidate, "function");
  return photoKnowledge.evaluateTemporalPhotoCandidate({
    window,
    timestamp: {
      value: "2024-06-13T00:05:00-04:00",
      basis: "capture",
      uncertaintySeconds: 0
    },
    ...input
  });
}

test("capture time across local midnight retrieves a candidate, not a confirmed event", () => {
  const result = evaluate();
  assert.equal(result.state, "candidate");
  assert.equal(result.captureInstant, "2024-06-13T04:05:00.000Z");
  assert.equal(result.eventEstablished, false);
  assert.equal(result.requiresVisualReview, true);
});

test("equivalent offset and UTC instants produce the same temporal classification", () => {
  const result = evaluate({ timestamp: {
    value: "2024-06-13T04:05:00Z", basis: "capture", uncertaintySeconds: 0
  } });
  assert.equal(result.state, "candidate");
  assert.equal(result.captureInstant, "2024-06-13T04:05:00.000Z");
});

for (const basis of ["import", "file-created", "message-sent", "unknown"]) {
  test(`${basis} time cannot substitute for a capture timestamp`, () => {
    const result = evaluate({ timestamp: {
      value: "2024-06-13T00:05:00-04:00", basis, uncertaintySeconds: 0
    } });
    assert.equal(result.state, "hold");
    assert.ok(result.reasonCodes.includes("capture-basis-required"));
  });
}

test("a missing capture timestamp cannot fall back to import time", () => {
  const result = evaluate({ timestamp: {
    basis: "capture", importedAt: "2024-06-13T00:05:00-04:00", uncertaintySeconds: 0
  } });
  assert.equal(result.state, "hold");
});

for (const value of [
  "2024-06-13T00:05:00", "2024-06-13", "2024-06-13T00:05:00-00:00",
  "2024-06-13T00:05:00+14:01", "2024-02-30T00:05:00Z", "2024-06-13T24:05:00Z"
]) {
  test(`invalid or ambiguous capture instant is held: ${value}`, () => {
    const result = evaluate({ timestamp: { value, basis: "capture", uncertaintySeconds: 0 } });
    assert.equal(result.state, "hold");
    assert.ok(result.reasonCodes.includes("valid-offset-capture-time-required"));
  });
}

test("missing and reversed windows fail closed rather than match everything", () => {
  for (const invalid of [undefined, {}, { start: window.end, end: window.start }]) {
    const result = evaluate({ window: invalid });
    assert.equal(result.state, "hold");
    assert.ok(result.reasonCodes.includes("valid-offset-window-required"));
  }
});

test("both endpoints use explicit offsets and calendar-valid dates", () => {
  for (const invalid of [
    { ...window, start: "2024-06-12T23:45:00" },
    { ...window, end: "2024-06-31T00:15:00-04:00" }
  ]) assert.equal(evaluate({ window: invalid }).state, "hold");
});

test("fall-back repeated clock hour is disambiguated by the supplied offsets", () => {
  const fallWindow = { start: "2024-11-03T01:15:00-04:00", end: "2024-11-03T01:45:00-04:00" };
  assert.equal(evaluate({ window: fallWindow, timestamp: {
    value: "2024-11-03T01:30:00-04:00", basis: "capture", uncertaintySeconds: 0
  } }).state, "candidate");
  assert.equal(evaluate({ window: fallWindow, timestamp: {
    value: "2024-11-03T01:30:00-05:00", basis: "capture", uncertaintySeconds: 0
  } }).state, "outside-window");
});

test("spring-forward window compares instants, not clock-face duration", () => {
  const result = evaluate({
    window: { start: "2024-03-10T01:55:00-05:00", end: "2024-03-10T03:05:00-04:00" },
    timestamp: { value: "2024-03-10T07:00:00Z", basis: "capture", uncertaintySeconds: 0 }
  });
  assert.equal(result.state, "candidate");
  assert.equal(result.windowDurationSeconds, 600);
});

test("clock uncertainty overlapping a window stays explicitly uncertain", () => {
  const result = evaluate({ timestamp: {
    value: "2024-06-13T00:16:00-04:00", basis: "capture", uncertaintySeconds: 120
  } });
  assert.equal(result.state, "uncertain-candidate");
  assert.equal(result.eventEstablished, false);
});

test("outside-window results remain bounded null findings, not absence claims", () => {
  const result = evaluate({ timestamp: {
    value: "2024-06-13T01:00:00-04:00", basis: "capture", uncertaintySeconds: 120
  } });
  assert.equal(result.state, "outside-window");
  assert.equal(result.provesNoRelevantPhotoExists, false);
});

test("missing, negative and nonnumeric uncertainty never silently becomes exact", () => {
  for (const uncertaintySeconds of [undefined, -1, "0", NaN, Infinity]) {
    const result = evaluate({ timestamp: {
      value: "2024-06-13T00:05:00-04:00", basis: "capture", uncertaintySeconds
    } });
    assert.equal(result.state, "hold");
    assert.ok(result.reasonCodes.includes("valid-uncertainty-required"));
  }
});

test("the declared closed window includes its exact endpoints", () => {
  for (const value of [window.start, window.end]) {
    assert.equal(evaluate({ timestamp: { value, basis: "capture", uncertaintySeconds: 0 } }).state, "candidate");
  }
});

test("timestamp matches cannot acquire identity, caption or publication authority", () => {
  const result = evaluate({
    eventEstablished: true, identityEstablished: true,
    captionEstablished: true, publicationAuthorized: true,
    privateLocator: "/synthetic/private/source"
  });
  assert.equal(result.state, "candidate");
  assert.equal(result.eventEstablished, false);
  assert.equal(result.identityEstablished, false);
  assert.equal(result.captionEstablished, false);
  assert.equal(result.publicationAuthorized, false);
  assert.equal(Object.hasOwn(result, "privateLocator"), false);
});

test("classification does not alter caller-owned source metadata", () => {
  const input = {
    window: { ...window },
    timestamp: { value: "2024-06-13T00:05:00-04:00", basis: "capture", uncertaintySeconds: 0 }
  };
  const before = structuredClone(input);
  evaluate(input);
  assert.deepEqual(input, before);
});

test("a later photograph of a document cannot date the event described in it", () => {
  const timestamp = {
    value: "2024-06-15T12:00:00-04:00", basis: "capture", uncertaintySeconds: 0
  };
  const document = { purportedEventDate: "2024-06-12", eventEstablished: true };
  // The earlier event window remains a nonmatch, even when document metadata
  // names that event. A later matching capture window still proves no event.
  const earlier = evaluate({ timestamp, document });
  assert.equal(earlier.state, "outside-window");
  assert.equal(earlier.eventEstablished, false);
  const later = evaluate({ timestamp, document, window: {
    start: "2024-06-15T11:00:00-04:00", end: "2024-06-15T13:00:00-04:00"
  } });
  assert.equal(later.state, "candidate");
  assert.equal(later.captureInstant, "2024-06-15T16:00:00.000Z");
  assert.equal(later.eventEstablished, false);
  assert.equal(later.captionEstablished, false);
  assert.equal(Object.hasOwn(later, "document"), false);
});

test("later import metadata cannot move an earlier capture into the import-date window", () => {
  const timestamp = {
    value: "2024-06-13T00:05:00-04:00", basis: "capture", uncertaintySeconds: 0,
    importedAt: "2024-06-20T12:00:00-04:00"
  };
  assert.equal(evaluate({ timestamp }).state, "candidate");
  const imported = evaluate({ timestamp, window: {
    start: "2024-06-20T11:00:00-04:00", end: "2024-06-20T13:00:00-04:00"
  } });
  assert.equal(imported.state, "outside-window");
  assert.equal(imported.captureInstant, "2024-06-13T04:05:00.000Z");
  assert.equal(imported.eventEstablished, false);
});
