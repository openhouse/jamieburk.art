import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

const manifest = read("apps/www/src/data/photography.ts");
const hero = read("apps/www/src/components/Hero.tsx");
const home = read("apps/www/src/app/page.tsx");
const about = read("apps/www/src/app/about/page.tsx");
const caseStudy = read("apps/www/src/components/CaseStudyLayout.tsx");
const photoFigure = read("apps/www/src/components/PhotoFigure.tsx");
const layout = read("apps/www/src/app/layout.tsx");
const globals = read("apps/www/src/app/globals.css");
const tokens = read("apps/www/src/styles/tokens.css");
const colophon = read("apps/www/src/app/colophon/page.tsx");
const designRecord = read("docs/design/layout-E-photo-integration.md");

const expectedImages = [
  "raft-delta-queen.jpg",
  "dcla-listening-room.jpg",
  "fair-rent-city-hall.jpg",
  "nycac-screen-printing.jpg",
  "jamie-self-portrait-2026.jpg",
  "fair-rent-field-materials.jpg",
  "repeal-cabaret-law.jpg",
  "talks-not-raids.jpg",
  "let-nyc-dance.jpg"
];

const results = [];
const record = (id, pass, evidence) => results.push({ id, pass, evidence });

const selectedBlocks = [...manifest.matchAll(/id: "(photo-[^"]+)"[\s\S]*?src: "([^"]+)"[\s\S]*?alt: "([^"]+)"[\s\S]*?caption:\s*\n?\s*"([^"]+)"[\s\S]*?credit: "([^"]+)"[\s\S]*?context: "([^"]+)"/g)];
const selectedIds = selectedBlocks.map((match) => match[1]);
const selectedSources = selectedBlocks.map((match) => match[2]);
const fieldsComplete = selectedBlocks.every((match) => match.slice(1).every((value) => value.trim().length > 0));

const imagesValid = expectedImages.every((name) => {
  const filePath = path.join(root, "apps/www/public/images/photo-fieldwork", name);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).size < 10_000) return false;
  const bytes = fs.readFileSync(filePath);
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes.at(-2) === 0xff && bytes.at(-1) === 0xd9;
});

const jpegMetadataFree = expectedImages.every((name) => {
  const bytes = fs.readFileSync(path.join(root, "apps/www/public/images/photo-fieldwork", name));
  const ascii = bytes.toString("latin1");
  return !/(Exif|GPSLatitude|GPSLongitude|Photoshop|xmpmeta|com\.apple)/i.test(ascii);
});

const publicText = [manifest, hero, home, about, caseStudy, colophon, designRecord].join("\n");
const privateReferenceFree = !/(\/Volumes\/|\/Users\/|IMG_1923|[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12})/i.test(publicText);

record(
  "LAYOUT-001",
  hero.includes("photos.raftDeltaQueen") && hero.includes("fill") && home.includes("PhotoFigure") && home.includes("WorkCard"),
  "The hero and lower editorial bands render selected photographs through shared components."
);
record(
  "LAYOUT-002",
  photoFigure.includes("aspect-[3/2]") && photoFigure.includes("aspect-[16/9]") && photoFigure.includes("aspect-[4/5]") && photoFigure.includes("fill"),
  "PhotoFigure reserves three stable aspect-ratio modes and uses fill within a positioned container."
);
record(
  "LAYOUT-003",
  selectedBlocks.length === 9 && fieldsComplete && new Set(selectedIds).size === 9 && new Set(selectedSources).size === 9,
  `${selectedBlocks.length} selected photographs have complete, unique manifest records.`
);
record(
  "LAYOUT-004",
  caseStudy.includes("do not assign sole authorship") && caseStudy.includes("collective situations") && manifest.includes("The campaign was collective work"),
  "Campaign sequencing and captions explicitly retain collective authorship and bounded role language."
);
record(
  "LAYOUT-005",
  imagesValid && jpegMetadataFree && privateReferenceFree,
  "All 9 JPEG derivatives are valid, metadata-light, and disconnected from private paths and held-sensitive references."
);
record(
  "LAYOUT-006",
  /public pull-request review/.test(designRecord) && /production approval remains an open human decision/i.test(designRecord) && /held back/.test(designRecord) && selectedIds.every((id) => designRecord.includes(`\`${id}\``)),
  "The design record names the authorized review surface, records every selected asset, preserves production approval as a human gate, and records held-back images."
);
record(
  "LAYOUT-007",
  layout.includes('data-theme="human-index"') && ["#2f6f89", "#4e6f61", "#c83b32", "#222b36", "#4a7f4f"].every((color) => `${tokens}\n${globals}`.includes(color)) && !/gradient/i.test(globals),
  "The Human Index palette is globally active and the frontend stylesheet contains no gradient decoration."
);
record(
  "LAYOUT-008",
  home.includes("Technical Operations & Implementation") && home.includes('href: "/resume"') && home.includes("View all work") && home.includes("ContactCTA"),
  "Role fit, resume, work index, and contact pathways remain available on the homepage."
);
record(
  "LAYOUT-009",
  about.includes("photos.selfPortrait") && about.includes("artistic") && caseStudy.includes("fairRentPhotoEssay"),
  "The about and case-study layers preserve artistic, civic, social, and technical continuity."
);
record(
  "LAYOUT-010",
  globals.includes("@media (max-width: 767px)") && globals.includes("height: calc(100svh - 6rem)") && globals.includes("min-height: 29rem") && globals.includes("grid-template-columns: minmax(0, 1fr)"),
  "Responsive rules preserve a stable hero and single-column mobile reading sequence."
);

for (const result of results) {
  console.log(`${result.pass ? "PASS" : "FAIL"} ${result.id}: ${result.evidence}`);
}

const failures = results.filter((result) => !result.pass);
console.log(`\nLayout photography eval: ${results.length - failures.length}/${results.length} passing.`);
if (failures.length > 0) process.exitCode = 1;
