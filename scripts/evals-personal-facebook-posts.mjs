import { readFileSync } from "node:fs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import { validatePersonalFacebookPosts } from "./lib/personal-facebook-posts-validation.mjs";

const controlsPath = new URL(
  "../docs/knowledge-bank/data/jamie-personal-facebook-post-controls.json",
  import.meta.url
);
const controlsText = readFileSync(controlsPath, "utf8");
const result = validatePersonalFacebookPosts({
  knowledgeBank,
  controls: JSON.parse(controlsText),
  publicArtifacts: [
    controlsText,
    readFileSync(
      new URL(
        "../apps/www/src/data/knowledge-bank/jamie-personal-facebook-posts-2026-07-16.ts",
        import.meta.url
      ),
      "utf8"
    ),
    readFileSync(
      new URL(
        "../docs/knowledge-bank/projects/jamie-personal-facebook-posts.md",
        import.meta.url
      ),
      "utf8"
    )
  ]
});

const checks = Object.entries(result.checks);
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}\tPERSONALFB-${name}`);
}

if (result.errors.length) {
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS\tPERSONALFB-001\t${checks.length}/${checks.length} deterministic criteria met`);
