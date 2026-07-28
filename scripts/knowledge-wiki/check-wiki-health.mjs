#!/usr/bin/env node

import { evaluateCampaignMediaCensus } from "../campaign-media-census/lib.mjs";
import {
  evaluatePreLaunchSuite,
  loadSuite
} from "../pre-launch-evals/lib.mjs";
import { evaluateTestimonyCorpora } from "../public-testimony/lib.mjs";
import { checkGeneratedOutputs, compileWiki } from "./lib.mjs";

const result = compileWiki();
const generatedIssues = checkGeneratedOutputs(result);
const campaignMedia = evaluateCampaignMediaCensus();
const testimony = evaluateTestimonyCorpora();
const { suite: preLaunchSuite } = loadSuite();
const preLaunch = evaluatePreLaunchSuite(preLaunchSuite);
const integratedIssues = [
  ...campaignMedia.errors.map((message) => ({
    code: "CAMPAIGN_MEDIA",
    file: "docs/knowledge-bank/data/campaign-site-media-census-2026-07-28.json",
    line: 1,
    message
  })),
  ...testimony.errors.map((message) => ({
    code: "PUBLIC_TESTIMONY",
    file: "docs/knowledge-bank/data/public-testimony/manifest.json",
    line: 1,
    message
  })),
  ...preLaunch.errors.map((message) => ({
    code: "PRE_LAUNCH_EVAL",
    file: "evals/pre-launch/suite.json",
    line: 1,
    message
  }))
];
const errors = [...result.errors, ...generatedIssues, ...integratedIssues];

if (result.warnings.length) {
  console.warn("Knowledge Wiki diagnostics:");
  for (const issue of result.warnings) {
    console.warn(`- ${issue.code} ${issue.file}:${issue.line} - ${issue.message}`);
  }
}

if (errors.length) {
  console.error("Knowledge Wiki check failed:");
  for (const issue of errors) {
    console.error(`- ${issue.code} ${issue.file}:${issue.line} - ${issue.message}`);
  }
  process.exit(1);
}

console.log(
  `Knowledge Wiki check passed: ${result.graph.nodes.length} records, ${result.graph.edges.length} semantic/evidence edges, ${result.graph.documentLinks.length} prose links, ${campaignMedia.data.works.length} campaign-media works, ${testimony.supportivePopulation} full-text supportive testimony speakers, and all generated outputs current.`
);
