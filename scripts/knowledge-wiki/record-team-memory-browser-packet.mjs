import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { configPath, repoRoot } from "./team-memory-internal-champion-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function main() {
  const browserPath = arg("--browser-json");
  const resumePdfPath = arg("--resume-pdf");
  const resumeTextPath = arg("--resume-text");
  if (!browserPath || !resumePdfPath || !resumeTextPath) {
    throw new Error(
      "Usage: node record-team-memory-browser-packet.mjs --browser-json <runtime browser packet> --resume-pdf <served public PDF> --resume-text <text extracted from served public PDF>"
    );
  }

  const config = JSON.parse(readFileSync(path.join(repoRoot, configPath), "utf8"));
  const runtimePacket = JSON.parse(readFileSync(browserPath, "utf8"));
  const resumePdf = readFileSync(resumePdfPath);
  const resumeText = readFileSync(resumeTextPath, "utf8");
  const packet = {
    schemaVersion: 1,
    capturedAt: runtimePacket.capturedAt,
    source: runtimePacket.source,
    startPath: runtimePacket.startPath,
    originClass: "localhost-development-server",
    navigationSequence: runtimePacket.navigationSequence,
    routes: runtimePacket.routes,
    browserErrors: runtimePacket.browserErrors,
    publicOnly: runtimePacket.publicOnly,
    visualInspection: {
      performed: true,
      startPageScreenshotSha256: sha256(
        readFileSync("/private/tmp/team-memory-internal-champion-start.png")
      ),
      committedScreenshot: false
    },
    resumeArtifact: {
      source: "served-public-pdf",
      route:
        "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
      sha256: sha256(resumePdf),
      text: resumeText.replace(/\s+$/g, "")
    }
  };

  if (
    packet.startPath !== config.pagePath ||
    packet.navigationSequence?.[0] !== "team-memory-start"
  ) {
    throw new Error("The browser packet did not begin at the configured Team Memory page.");
  }

  writeFileSync(
    path.join(repoRoot, config.browserPacketPath),
    `${JSON.stringify(packet, null, 2)}\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
