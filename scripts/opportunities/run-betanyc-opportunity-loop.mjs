import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  buildBetaNycDigest,
  findLatestNewsletterIssue,
  prepareBetaNycRefresh
} from "./betanyc-newsletter-source.mjs";
import { sendDigestWithResend } from "./nyc-jobs-loop.mjs";

function argument(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function requiredArgument(name) {
  const value = argument(name);
  if (!value) throw new Error(`${name} is required.`);
  return path.resolve(value);
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "jamieburk.art-opportunity-source/1.0" } });
  if (!response.ok) throw new Error(`BetaNYC source fetch failed with HTTP ${response.status}.`);
  return response.text();
}

const config = readJson(requiredArgument("--config"));
const nycPostings = readJson(requiredArgument("--nyc-postings"));
const outputDirectory = requiredArgument("--output-dir");
const now = argument("--now", new Date().toISOString().slice(0, 10));
const indexHtmlPath = argument("--index-html");
const issueHtmlPath = argument("--issue-html");

if (config.schemaVersion !== 1 || config.source?.id !== "source.betanyc.weekly-civictech-newsletter") {
  throw new Error("The BetaNYC opportunity-source config is missing or incompatible.");
}
if (!Array.isArray(nycPostings)) throw new Error("The NYC postings input must be a JSON array.");

const indexHtml = indexHtmlPath
  ? readFileSync(path.resolve(indexHtmlPath), "utf8")
  : await fetchText(config.source.archiveIndexUrl);
const currentIssue = findLatestNewsletterIssue(indexHtml);
const issueHtml = issueHtmlPath
  ? readFileSync(path.resolve(issueHtmlPath), "utf8")
  : await fetchText(currentIssue.issueUrl);
const result = prepareBetaNycRefresh({
  currentIssue,
  committedState: config.state,
  issueHtml,
  nycPostings,
  policy: config.policy,
  knownJobIds: config.knownJobIds,
  now,
  forceRefresh: process.argv.includes("--force-refresh")
});
const digest = buildBetaNycDigest({ currentIssue, result });

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(
  path.join(outputDirectory, "betanyc-candidate-queue.json"),
  `${JSON.stringify({
    schemaVersion: 1,
    generatedAt: `${now}T12:00:00.000Z`,
    issueKey: currentIssue.issueKey,
    issueUrl: currentIssue.issueUrl,
    refreshRequired: result.refreshRequired,
    publicBoundary: "Discovery queue only. The individual employer posting controls eligibility, compensation, deadline, and application requirements.",
    candidates: result.candidateMatches,
    unverifiedLeads: result.unverifiedLeads
  }, null, 2)}\n`
);
writeFileSync(
  path.join(outputDirectory, "betanyc-source-state.json"),
  `${JSON.stringify(result.nextSourceState, null, 2)}\n`
);
writeFileSync(path.join(outputDirectory, "betanyc-action-digest.md"), digest.markdown);

let delivery = { sent: false, reason: "not-requested" };
if (process.argv.includes("--send") && result.refreshRequired) {
  delivery = await sendDigestWithResend(digest, {
    sendEnabled: process.env.OPPORTUNITY_DIGEST_SEND_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.OPPORTUNITY_DIGEST_FROM,
    to: process.env.OPPORTUNITY_DIGEST_TO
  });
}

process.stdout.write(`${JSON.stringify({
  issueKey: currentIssue.issueKey,
  refreshRequired: result.refreshRequired,
  leadsObserved: result.leadsObserved,
  candidates: result.candidateMatches.length,
  unresolved: result.unverifiedLeads.length,
  delivery
})}\n`);
