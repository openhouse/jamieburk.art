export const approvedResumeArtifact = {
  htmlPath: "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-17.html",
  textPath: "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-17.txt",
  pdfPath: "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  generatorPath: "scripts/generate-resume-pdf.mjs"
};

export function validateResumeText(text) {
  const failures = [];
  const required = [
    ["Jamie Burkart", /Jamie\s+Burkart/i],
    ["target role", /Technical Project Manager/i],
    ["approved phone", /\(816\)\s*728-8685/],
    ["approved email", /jamie\.burkart@gmail\.com/i],
    ["KC Town Hall Phase One", /KC Town Hall[\s\S]{0,900}Phase One/i],
    ["KC Town Hall general-contractor role", /KC Town Hall[\s\S]{0,900}general contractor/i],
    ["KC Town Hall non-disbursement", /\$490,539[\s\S]{0,350}not disbursed/i],
    ["KC Town Hall later disposition", /returned to the fund after the project withdrew/i],
    ["approved CallNYC projection", /CallNYC\.org as an independent follow-on to the New York City\s+Council['’]s first CouncilStat hackathon/i]
  ];
  for (const [label, pattern] of required) if (!pattern.test(text)) failures.push(`resume is missing ${label}`);

  const prohibited = [
    ["stale sole-causality funding wording", /secured (?:a |the )?\$490,539 public funding recommendation/i],
    ["stale unbounded funding wording", /\$490,539 public funding recommendation/i],
    ["appropriation-as-receipt wording", /KC Town Hall[\s\S]{0,600}(?:received|spent) (?:the )?\$490,539/i],
    ["retired CallNYC wording", /first civic-(?:data|tech) hackathon/i],
    ["placeholder text", /\b(?:TODO|Placeholder resume PDF|lorem ipsum|replace this)\b/i]
  ];
  for (const [label, pattern] of prohibited) if (pattern.test(text)) failures.push(`resume contains ${label}`);
  return failures;
}

export function validateResumeSource(html) {
  const failures = validateResumeText(html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&"));
  for (const [label, value] of [
    ["portfolio URL", "https://jamieburk.art"],
    ["LinkedIn URL", "https://linkedin.com/in/jamie-burkart"],
    ["GitHub URL", "https://github.com/openhouse"]
  ]) if (!html.includes(value)) failures.push(`resume source is missing ${label}`);
  return failures;
}
