#!/usr/bin/env node

import { loadCitationData, summarizeCitationData, validateCitationData } from "./check-citations.mjs";

const data = loadCitationData();
const summary = summarizeCitationData(data);
const validation = validateCitationData(data);

function line(text = "") {
  console.log(text);
}

function list(items, formatter) {
  if (!items.length) {
    line("- none");
    return;
  }

  for (const item of items) line(`- ${formatter(item)}`);
}

line("# Citation Report");
line();
line("## Counts");
for (const [label, count] of Object.entries(summary.counts)) {
  line(`- ${label}: ${count}`);
}
line();
line("## Source Visibility");
line(`- public: ${summary.sourceVisibility.public}`);
line(`- restricted: ${summary.sourceVisibility.restricted}`);
line();
line("## Claim Statuses");
for (const [status, count] of Object.entries(summary.claimStatuses)) {
  line(`- ${status}: ${count}`);
}
line();
line("## Page Projections");
for (const page of data.pages) {
  line(`- ${page.pageId}`);
  page.citationOrder.forEach((item, index) => {
    line(`  ${index + 1}. ${item.noteId} (${item.occurrences.join(", ")})`);
  });
}
line();
line("## Public Media");
list(
  data.media.filter((item) => item.publicCitation),
  (item) => `${item.id}: ${item.title}`
);
line();
line("## Non-Public Media / Rights Queue");
list(
  data.media.filter((item) => !item.publicCitation),
  (item) => `${item.id}: ${item.rightsStatus}; consent=${item.consentStatus ?? "n/a"}`
);
line();
line("## Corrections");
list(
  data.corrections,
  (item) => `${item.id}: ${item.subject} -> ${item.correctedWording}`
);
line();
line("## Orphan Citation Notes");
list(summary.orphanNotes, (id) => id);
line();
line("## Validation");
if (validation.failures.length) {
  line("Failures:");
  for (const failure of validation.failures) line(`- ${failure}`);
} else {
  line("- failures: none");
}

if (validation.warnings.length) {
  line("Warnings:");
  for (const warning of validation.warnings) line(`- ${warning}`);
} else {
  line("- warnings: none");
}

if (validation.failures.length) process.exit(1);
