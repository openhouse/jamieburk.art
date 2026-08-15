import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");

const paths = {
  contract: "evals/knowledge-wiki/hje-client-chronology.json",
  officialSource: "docs/knowledge-bank/sources/nys-dos-thick-arts-llc-formation-2012-07-06.md",
  correction: "docs/knowledge-bank/corrections/hje-thick-arts-client-chronology-2026.md",
  project: "docs/knowledge-bank/projects/harry-j-epstein.md",
  timeline: "docs/knowledge-bank/timelines/practice-2004-present.md",
  employmentCoverage: "docs/knowledge-bank/evaluations/employment-context-coverage-2026-07-18.md",
  caseStudy: "apps/www/src/content/work/harry-j-epstein.mdx",
  publicRegistry: "apps/www/src/data/knowledge-bank/public-registry.json",
  work: "apps/www/src/data/work.ts",
  resumes: "resumes/2026-08-14"
};

function read(root, relative) {
  const file = path.join(root, relative);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

function resumeSources(root) {
  const directory = path.join(root, paths.resumes);
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const jobDir = path.join(directory, entry.name);
      return readdirSync(jobDir)
        .filter((name) => name.endsWith(".md"))
        .map((name) => ({ name: `${entry.name}/${name}`, text: readFileSync(path.join(jobDir, name), "utf8") }));
    });
}

export function loadCandidate(root = repoRoot) {
  const contractText = read(root, paths.contract);
  return {
    contract: contractText ? JSON.parse(contractText) : null,
    officialSource: read(root, paths.officialSource),
    correction: read(root, paths.correction),
    project: read(root, paths.project),
    timeline: read(root, paths.timeline),
    employmentCoverage: read(root, paths.employmentCoverage),
    caseStudy: read(root, paths.caseStudy),
    publicRegistry: read(root, paths.publicRegistry),
    work: read(root, paths.work),
    resumes: resumeSources(root),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateHjeClientChronology(candidate) {
  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(Boolean(candidate.contract), "chronology eval contract is missing");
  check(candidate.contract?.authoritativeCorrection?.practiceStartYear === 2009, "professional-practice start-year contract must remain 2009");
  check(candidate.contract?.authoritativeCorrection?.llcFormationDate === "2012-07-06", "Thick Arts LLC formation-date contract must remain 2012-07-06");
  check(candidate.contract?.authoritativeCorrection?.clientStartYear === 2009 && candidate.contract?.authoritativeCorrection?.clientEndYear === 2015, "HJE client-period contract must remain 2009-2015");

  const relationshipClaim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015");
  const formationClaim = candidate.knowledgeBank.claims.find((item) => item.id === "CLM-THICK-ARTS-LLC-FORMATION-2012-07-06");
  const firstPartyObservation = candidate.knowledgeBank.observations.find((item) => item.id === "OBS-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015");
  const officialObservation = candidate.knowledgeBank.observations.find((item) => item.id === "OBS-THICK-ARTS-LLC-FORMATION-2012-07-06");
  check(Boolean(relationshipClaim), "canonical HJE/Thick Arts first-client claim is missing");
  check(Boolean(formationClaim), "canonical Thick Arts LLC formation claim is missing");
  check(relationshipClaim?.status === "confirmed-with-boundary", "canonical first-client claim must retain its bounded status");
  check(formationClaim?.status === "confirmed", "canonical LLC formation claim must be confirmed by the official record");
  check(relationshipClaim?.internalClaim.includes("first client") && relationshipClaim?.internalClaim.includes("2009-2015"), "canonical first-client claim must state the relationship and 2009-2015 period");
  check(relationshipClaim?.antiClaims.some((item) => /current client/i.test(item)), "canonical first-client claim must reject a current-client implication");
  check(formationClaim?.internalClaim.includes("July 6, 2012"), "canonical formation claim must state the official filing date");
  check(Boolean(firstPartyObservation) && firstPartyObservation?.kind === "participant-memory", "first-party correction must remain an atomic participant-memory observation");
  check(Boolean(officialObservation) && officialObservation?.kind === "source-fact", "official formation date must remain an atomic source-fact observation");

  check(/initial DOS[\s\S]{0,80}July 6, 2012/i.test(candidate.officialSource), "official-source note must state the July 6, 2012 initial DOS filing date");
  check(/does not[\s\S]{0,160}(?:client|2009)/i.test(candidate.officialSource), "official-source note must not be used to establish the client relationship or 2009 practice start");

  for (const [label, text] of [
    ["correction", candidate.correction],
    ["project note", candidate.project],
    ["practice timeline", candidate.timeline]
  ]) {
    check(/first client/i.test(text), `${label} must state that HJE was Thick Arts LLC's first client`);
    check(/2009(?:-|–)2015/.test(text), `${label} must state the bounded 2009-2015 HJE client period`);
    check(/2012/.test(text), `${label} must distinguish the LLC's 2012 legal formation`);
  }

  check(/claimId="CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015"/.test(candidate.caseStudy), "case study must project the canonical first-client chronology claim");
  check(/claimId="CLM-THICK-ARTS-LLC-FORMATION-2012-07-06"/.test(candidate.caseStudy), "case study must project the canonical LLC formation claim");
  check(/"id": "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015"/.test(candidate.publicRegistry), "public registry must include the first-client chronology claim used by the case study");
  check(/"id": "CLM-THICK-ARTS-LLC-FORMATION-2012-07-06"/.test(candidate.publicRegistry), "public registry must include the formation claim used by the case study");
  const hjePage = candidate.knowledgeBank.pages.find((item) => item.id === "harry-j-epstein" && item.surface === "/work/harry-j-epstein");
  check(Boolean(hjePage), "canonical page plan for the HJE case study is missing");
  check(hjePage?.occurrences.some((item) => item.claimId === "CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015"), "HJE page plan must bind the first-client chronology claim");
  check(hjePage?.occurrences.some((item) => item.claimId === "CLM-THICK-ARTS-LLC-FORMATION-2012-07-06"), "HJE page plan must bind the formation claim");

  check(/title: "Harry J\. Epstein Company"[\s\S]{0,500}?years: "2009-2015"/.test(candidate.work), "HJE work-card years must be 2009-2015");
  check(!/title: "Harry J\. Epstein Company"[\s\S]{0,500}?years: "(?:2012|2009)-(?:Present|2026)"/.test(candidate.work), "HJE work-card must not imply a current client engagement");
  check(/period: 2009-2015[\s\S]{0,180}?focus: small-business modernization/.test(candidate.employmentCoverage), "employment coverage must use the bounded 2009-2015 HJE period");

  check(candidate.resumes.length === 5, "exactly five maintained opportunity resumes are expected in the dated set");
  for (const resume of candidate.resumes) {
    check(/INDEPENDENT PRACTICE \/ THICK ARTS LLC/.test(resume.text), `${resume.name} must distinguish the independent practice from the later LLC`);
    check(/New York, NY \/ Remote \| 2009–Present/.test(resume.text), `${resume.name} must date the combined professional practice 2009-present`);
    check(/2009–2015[\s\S]{0,220}?2012[\s\S]{0,140}?first client/i.test(resume.text), `${resume.name} must state the bounded HJE period, 2012 formalization, and first-client relationship`);
    check(!/### THICK ARTS LLC[^\n]*\n\nNew York, NY \/ Remote \| 2009–Present/.test(resume.text), `${resume.name} must not backdate the LLC itself to 2009`);
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      canonicalClaims: [relationshipClaim, formationClaim].filter(Boolean).length,
      boundedChronologySurfaces: [candidate.correction, candidate.project, candidate.timeline].filter((text) => /first client/i.test(text) && /2009(?:-|–)2015/.test(text) && /2012/.test(text)).length + Number(/CLM-HJE-THICK-ARTS-FIRST-CLIENT-2009-2015/.test(candidate.caseStudy) && /CLM-THICK-ARTS-LLC-FORMATION-2012-07-06/.test(candidate.caseStudy)),
      maintainedResumes: candidate.resumes.length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateHjeClientChronology(loadCandidate());
  if (!result.passed) {
    console.error(`HJE client chronology eval failed:\n${result.failures.join("\n")}`);
    process.exit(1);
  }
  console.log(`HJE client chronology eval passed: ${result.metrics.canonicalClaims}/2 canonical claims, ${result.metrics.boundedChronologySurfaces} knowledge/site surfaces, and ${result.metrics.maintainedResumes} maintained resume variants.`);
}
