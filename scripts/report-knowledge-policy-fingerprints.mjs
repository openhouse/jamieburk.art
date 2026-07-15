#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import {
  projectionDecisionFingerprint,
  publicSurfaceFingerprint
} from "./check-knowledge-development.mjs";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

const resumeSource =
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.html";
const resumeText =
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt";
const resumePdf =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

console.log(
  JSON.stringify(
    {
      projectionDecisionSha256: projectionDecisionFingerprint(knowledgeBank),
      publicSurfaceSha256: publicSurfaceFingerprint(),
      resumeArtifact: {
        sourceSha256: sha256(resumeSource),
        extractedTextSha256: sha256(resumeText),
        pdfSha256: sha256(resumePdf)
      }
    },
    null,
    2
  )
);
