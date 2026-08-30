import { copyFile, mkdtemp, readFile, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");

function formatCoordinateSize(value) {
  return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}

export function repointListMarkersInQdf(source, hierarchy) {
  let changedMarkers = 0;
  let inspectedMarkers = 0;
  const repointMarker = ({ whole, prefix, markerFont, markerSize, suffix, tail }) => {
    const itemRun = [...tail.matchAll(/BT[\s\S]*?\/(F\d+)\s+([\d.]+)\s+Tf[\s\S]*?Tj\s*ET/g)].find(
      (run) => run[1] !== markerFont
    );
    if (!itemRun) return whole;
    const itemCoordinateSize = Number(itemRun[2]);
    const targetMarkerSize =
      itemCoordinateSize - hierarchy.markerPointsBelowItem / hierarchy.pdfCoordinateScale;
    const target = formatCoordinateSize(targetMarkerSize);
    inspectedMarkers += 1;
    if (Math.abs(Number(markerSize) - targetMarkerSize) < 0.000001) return whole;
    changedMarkers += 1;
    return `${prefix}${target}${suffix}`;
  };
  const bulletPattern =
    /(BT\s*\/(F\d+)\s+)([\d.]+)(\s+Tf(?:(?!\nET)[\s\S])*?<0194>\s+Tj\s*ET)/g;
  let updated = source.replace(
    bulletPattern,
    (whole, prefix, markerFont, markerSize, suffix, offset, fullSource) =>
      repointMarker({
        whole,
        prefix,
        markerFont,
        markerSize,
        suffix,
        tail: fullSource.slice(offset + whole.length, offset + whole.length + 2000)
      })
  );

  const listPattern =
    /\/LI\s*<<\/MCID\s+\d+\s*>>BDC[\s\S]*?(?=\/LI\s*<<\/MCID|Q\s*q|$)/g;
  const structuredMarkerPattern =
    /(BT\s*\/(F\d+)\s+)([\d.]+)(\s+Tf((?:(?!\nET)[\s\S])*?)Tj\s*ET)/;
  updated = updated.replace(listPattern, (block) => {
    const marker = block.match(structuredMarkerPattern);
    if (!marker || marker[5].includes("<0194>")) return block;
    return block.replace(structuredMarkerPattern, (whole, prefix, markerFont, markerSize, suffix, markerText, offset) =>
      repointMarker({
        whole,
        prefix,
        markerFont,
        markerSize,
        suffix,
        tail: block.slice(offset + whole.length)
      })
    );
  });

  return { source: updated, changedMarkers, inspectedMarkers };
}

function runQpdf(arguments_) {
  const result = spawnSync("qpdf", arguments_, { encoding: "utf8" });
  if (result.status !== 0 && result.status !== 3) {
    throw new Error(result.stderr || `qpdf failed with status ${result.status}`);
  }
}

async function normalizePdf(pdfPath, hierarchy, scratchDirectory) {
  const absolutePath = path.join(repositoryRoot, pdfPath);
  const qdfPath = path.join(scratchDirectory, `${path.basename(pdfPath)}.qdf.pdf`);
  const patchedPath = path.join(scratchDirectory, `${path.basename(pdfPath)}.patched.pdf`);
  const rebuiltPath = path.join(scratchDirectory, `${path.basename(pdfPath)}.rebuilt.pdf`);

  runQpdf(["--qdf", "--object-streams=disable", absolutePath, qdfPath]);
  const qdf = await readFile(qdfPath, "latin1");
  const result = repointListMarkersInQdf(qdf, hierarchy);
  if (result.inspectedMarkers === 0) {
    throw new Error(`No list markers were found in ${pdfPath}`);
  }
  if (result.changedMarkers === 0) {
    return result;
  }
  await writeFile(patchedPath, result.source, "latin1");
  runQpdf([
    "--stream-data=compress",
    "--object-streams=disable",
    "--compression-level=9",
    patchedPath,
    rebuiltPath
  ]);
  await rename(rebuiltPath, absolutePath);
  return result;
}

async function main() {
  if (!process.argv.includes("--write")) {
    throw new Error("Use --write to update every configured maintained resume PDF.");
  }
  const config = JSON.parse(
    await readFile(path.join(repositoryRoot, "evals/resumes/pdf-portfolio.json"), "utf8")
  );
  const selection = JSON.parse(
    await readFile(path.join(repositoryRoot, "evals/resumes/public-resume-selection.json"), "utf8")
  );
  const publicVersion = config.versions.find((version) => version.publicInstallPath);
  const selectedSingleSource = selection.currentPublicArtifact.singleOpportunitySource?.pdfPath;
  const scratchDirectory = await mkdtemp(path.join(tmpdir(), "resume-list-markers-"));
  try {
    for (const version of config.versions) {
      if (version === publicVersion && selectedSingleSource) continue;
      const result = await normalizePdf(
        version.pdfPath,
        config.artifactStandards.listHierarchy,
        scratchDirectory
      );
      console.log(
        `${version.pdfPath}: ${result.changedMarkers}/${result.inspectedMarkers} markers updated`
      );
    }
    if (publicVersion && selectedSingleSource) {
      await copyFile(
        path.join(repositoryRoot, selectedSingleSource),
        path.join(repositoryRoot, publicVersion.pdfPath)
      );
      console.log(`${publicVersion.pdfPath}: synchronized selected opportunity PDF`);
    }
    if (publicVersion?.publicInstallPath) {
      await copyFile(
        path.join(repositoryRoot, publicVersion.pdfPath),
        path.join(repositoryRoot, publicVersion.publicInstallPath)
      );
      console.log(`${publicVersion.publicInstallPath}: synchronized public install`);
    }
  } finally {
    await rm(scratchDirectory, { recursive: true, force: true });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
