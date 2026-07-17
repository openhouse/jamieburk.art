import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { validatePersonalFacebookPosts } from "./lib/personal-facebook-posts-validation.mjs";

const controlsPath = new URL(
  "../docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
  import.meta.url
);
const modulePath = new URL(
  "../apps/www/src/data/knowledge-bank/jamie-personal-facebook-posts-2026-07-16.ts",
  import.meta.url
);
const reportPath = new URL(
  "../docs/knowledge-bank/projects/jamie-personal-facebook-posts.md",
  import.meta.url
);

const controlsText = readFileSync(controlsPath, "utf8");
const controls = JSON.parse(controlsText);
const result = validatePersonalFacebookPosts({
  knowledgeBank,
  controls,
  publicArtifacts: [
    controlsText,
    readFileSync(modulePath, "utf8"),
    readFileSync(reportPath, "utf8")
  ]
});

if (result.errors.length) {
  console.error("Personal Facebook archival-production check failed:");
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Personal Facebook archival-production check passed: 1,243 returned records, 621 terminal cursor pages, 549 source leads, six selected metadata-only public sources, and bounded response evidence."
);
