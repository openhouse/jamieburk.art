import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const plain = (value) => value.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '');
const paste = (value) => `\`\`\`text\n${value.trim()}\n\`\`\``;
const letterBody = (source) => source.toString().match(/^Dear [\s\S]+/m)?.[0].trim() ?? '';
const profileIds = new Set(['linkedin', 'facebook', 'x', 'website']);
const dateEvidence = JSON.parse(readFileSync(new URL('../../evals/application-guides/experience-dates.json', import.meta.url)));
const renderFields = (fields) => fields.flatMap((field) => [
  `### ${field.label}`,
  field.value === null ? field.instruction : paste(field.value),
  ...(field.value !== null && field.instruction ? [field.instruction] : []),
]);

export function experienceEntries(source) {
  const entries = [...source.toString().matchAll(/^### (.+)\n\n([^\n]+)\n\n([\s\S]*?)(?=^## |^### |$(?![\s\S]))/gm)];
  return entries.flatMap(([, heading, locationDates, description]) => {
    const [company, ...title] = plain(heading).split(' — ');
    const [location, years] = locationDates.split(' | ');
    if (!years || !/^\d{4}(?:–(?:\d{4}|Present))?$/.test(years) || !title.length) return [];
    const [from, to = from] = years.split('–');
    return [{ company, title: title.join(' — '), location, from, to, description: plain(description.trim()) }];
  });
}

function renderExperience(entry, index) {
  const current = entry.to === 'Present';
  const evidence = dateEvidence.entries[entry.company];
  const supportedEnd = evidence?.to && /^\d{4}-(0[1-9]|1[0-2])$/.test(evidence.to) && evidence.to.startsWith(`${entry.to}-`)
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${evidence.to}-15T12:00:00Z`)) : null;
  return [
    `### Experience ${index + 1}: ${entry.company}`,
    '**Title** (required)', paste(entry.title), '**Company**', paste(entry.company),
    '**Office location**', paste(entry.location), '**Description**', paste(entry.description),
    `- **From:** ${entry.from} — confirm the actual month (and day only if requested) from your records.`,
    `- **To:** ${current ? 'Leave empty when the current-work checkbox disables it.' : supportedEnd ? `${supportedEnd} — corroborated in earlier first-party CVs; confirm before submission.` : `${entry.to} — confirm the actual month (and day only if requested).`}`,
    ...(evidence ? [`**Date research (${dateEvidence.reviewedOn}):** ${evidence.note}`] : []),
    `- **I currently work here:** ${current ? 'Yes, if still current when you submit.' : 'No.'}`,
    '- Click **Save** before adding the next entry.',
  ].join('\n\n');
}

// This template models the observed OTI SmartRecruiters flow, not every ATS.
export function renderGuide(config, sources) {
  const sections = [
    `# Application guide: NYC OTI ${config.role} — ${config.jobId}`,
    `For Jamie Burkart. Packet reviewed ${config.packetReviewedOn ?? config.reviewedOn}; posting last checked ${config.reviewedOn}. This is a preparation guide, not a submitted application.`,
    '## 1. Open the right application',
    `[Official posting and Apply button](${config.postingUrl}). The posting was checked on ${config.reviewedOn} and lists **${config.deadline}** as its closing date. Recheck it before submitting. Confirm **${config.role}**, **OTI**, **Brooklyn**, and **Job ID ${config.jobId}**; similar titles can refer to different openings.`,
    ...(config.sourceContext ? ['### Discovery, personal connections, and the formal application', config.sourceContext] : []),
    '## 2. Download your application files',
    `- [Tailored résumé PDF](./${config.sources.pdf.path}) — download the file from GitHub; do not upload a screenshot or a GitHub page.\n- [Résumé Markdown](./${config.sources.resume.path})\n- [Signed cover-letter PDF](./${config.sources.coverPdf.path})\n- [Tailored cover-letter Markdown](./${config.sources.letter.path})`,
    'Upload the tailored résumé PDF alone in **Resume**. Do not append the cover letter. The later screenshot shows **Preliminary questions → Cover letter → Additional attachments**: upload the separate signed cover-letter PDF there. A hiring-team message is also available on the first page; the copy-paste body is below.',
    'The **Easy Apply** upload at the top is optional autocomplete, not a separate application requirement. You can skip it and fill the form manually. If you already used it, check every imported entry; do not reset accurate work unnecessarily. Confirm the final **Resume** field actually contains the intended PDF. The displayed upload limit is **10 MB**.',
    '## 3. Personal information',
    'Copy only the contents of each text box below. For contact fields, use the existing résumé rather than a second copy stored here. Confirm those details are still preferred. For autocomplete fields, select the matching option after typing.',
    ...renderFields(config.fields.filter((field) => !profileIds.has(field.id))),
  ];
  sections.push(
    '## 4. Experience — Add, complete, Save, repeat',
    'The current screenshots show **Experience → Add**. The expanded labels below were observed in the earlier SmartRecruiters application: **Title** (required), **Company**, **Office location**, **Description**, **From** (required), **To** (required unless current), **I currently work here**, **Save**. Reconcile with the form if its labels differ.',
    '**Month-level research is partial:** the notes below distinguish corroborated months, legal-entity formation, year-only evidence, and unresolved conflicts. Do not invent January/December dates or count overlapping projects as additional full-time years. These are founder, project, and community roles; listing them does not assert that each was a separate full-time salaried job or government employment. See the [shared date-evidence ledger](../../../evals/application-guides/experience-dates.json).',
    ...experienceEntries(sources.resume).map(renderExperience),
    '## 5. Education',
    'Use **Education → Add**. These expanded labels come from the earlier SmartRecruiters form. Leave optional details empty when you cannot confirm them; do not substitute course attendance for a degree.',
    '**Institution** (required)', paste('University of California, Santa Cruz'),
    '**Major**', paste('Film & Digital Media'),
    '**Degree**', paste('Bachelor of Arts'),
    '**School location**', paste('Santa Cruz, California, United States'),
    '**Description**', paste('Honors'),
    '**From / To:** confirm your actual attendance dates. They are not supplied in the tailored résumé. Leave blank if optional; if required, consult your records. **I currently attend:** No. Click **Save**.',
    '## 6. Your Profiles',
    ...renderFields(config.fields.filter((field) => profileIds.has(field.id))),
    '## 7. Resume upload',
    `Choose **${config.sources.pdf.path}** in the required **Resume** field. Wait for the filename/upload confirmation. Reopen the selected PDF and verify **${config.role} — ${config.jobId}**, rather than relying on a similar filename from another application.`,
    '## 8. Message to the Hiring Team — copy and paste',
    'This is the existing tailored cover-letter body, without its contact header. No character or word limit is visible in the supplied screenshots. If the live form reports a limit, stop and shorten against that actual limit; do not assume the earlier Civic Match limit applies.',
    paste(letterBody(sources.letter)),
    '## 9. Next, review, and submit',
    `On **Preliminary questions → Cover letter → Additional attachments**, choose **${config.sources.coverPdf.path}** (10 MB maximum). Confirm the uploaded filename. For **How did you hear about this job?**, choose the truthful source offered by the dropdown. If Civic Match is absent and you found this specific opening there, choose **Other** and enter **Civic Match by Work for America** under **If other, how?** Do not claim a personal referral unless one actually occurred. Preferred first/last name may be **Jamie / Burkart** if still preferred; do not substitute these for any separately requested legal-name fields.`,
    '- Check name, matching email fields, phone, saved experience/education, portfolio link, attached PDF, and hiring-team message. Optional Facebook and X fields may stay blank.\n- Click **Next**. Beyond the preliminary fields above, later screening questions were **not observed** for this application; answer the questions actually shown, from your records. Do not infer a civil-service status, credential, work authorization, or consent answer from a job title.\n- If asked about minimum qualifications, report your actual degree and relevant experience. The employer decides equivalency; this guide is not an eligibility determination.\n- You review and submit the final application yourself. Save the confirmation and email afterward, then record the application as submitted. Until then its status remains not submitted.',
    '## Evidence and maintenance',
    'Field labels and the 10 MB limit come from Jamie-provided SmartRecruiters screenshots, including the later cover-letter upload and source/preferred-name questions. The expanded Experience/Education controls are carried forward from the earlier application on the same platform, not presented as newly inspected controls for every opening. Remaining screening questions were not observed; no successful live submission is claimed.',
    'The sibling `application-guide.json` records the reviewed résumé, PDF, and letter hashes. Descriptions are extracted from the canonical résumé; the hiring message is extracted from the canonical letter. Source changes fail the deterministic guide check until the material is reviewed and this guide is regenerated. No new hiring-reader pass is asserted for this mechanical application guide.',
  );
  return `${sections.join('\n\n')}\n`;
}

export function evaluateGuide(config, sources, guide) {
  const failures = [];
  for (const kind of ['resume', 'letter', 'pdf', 'coverPdf']) {
    if (!sources[kind]) { failures.push(`missing_source:${kind}`); continue; }
    if (hash(sources[kind]) !== config.sources[kind].sha256) failures.push(`source_changed:${kind}`);
    if (!config.sources[kind].path.includes(config.jobId)) failures.push(`wrong_job:${kind}`);
  }
  if (failures.some((value) => value.startsWith('missing_source:'))) return failures;
  const ids = config.fields.map((field) => field.id);
  if (new Set(ids).size !== ids.length) failures.push('duplicate_field');
  for (const id of config.requiredFieldIds) if (!ids.includes(id)) failures.push(`missing_field:${id}`);
  for (const field of config.fields) {
    if (['email', 'confirm-email', 'phone-number'].includes(field.id) && field.value !== null) failures.push(`contact_must_be_reference:${field.id}`);
    if (field.value === null ? !field.instruction : !field.value?.trim()) failures.push(`empty_field:${field.id}`);
    if (field.matchResume && !sources.resume.toString().includes(field.value)) failures.push(`unsupported_value:${field.id}`);
  }
  if (!sources.letter.toString().includes(`Job ID ${config.jobId}`)) failures.push('wrong_job:letter_body');
  if (!letterBody(sources.letter)) failures.push('letter_body_missing');
  const experienceCount = experienceEntries(sources.resume).length;
  if (!experienceCount) failures.push('experience_missing');
  if (experienceCount !== config.expectedExperienceCount) failures.push('experience_count_mismatch');
  if (sources.pdf.subarray(0, 5).toString() !== '%PDF-') failures.push('invalid_pdf');
  if (sources.pdf.length > 10_000_000) failures.push('pdf_exceeds_upload_limit');
  if (sources.coverPdf.subarray(0, 5).toString() !== '%PDF-') failures.push('invalid_cover_pdf');
  if (sources.coverPdf.length > 10_000_000) failures.push('cover_pdf_exceeds_upload_limit');
  if (guide !== renderGuide(config, sources)) failures.push('guide_missing_or_stale');
  return failures;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const registry = JSON.parse(readFileSync(resolve(root, 'evals/application-guides/registry.json')));
  let failed = false;
  for (const relativePath of registry.guides) {
    const configPath = resolve(root, relativePath);
    const config = JSON.parse(readFileSync(configPath));
    const sources = {};
    for (const [kind, source] of Object.entries(config.sources)) {
      try { sources[kind] = readFileSync(resolve(dirname(configPath), source.path)); } catch { /* reported below */ }
    }
    const guidePath = resolve(dirname(configPath), config.guide);
    let guide = '';
    try { guide = readFileSync(guidePath, 'utf8'); } catch { /* a missing guide fails */ }
    if (process.argv.includes('--write') && Object.keys(sources).length === 4) {
      const candidate = renderGuide(config, sources);
      const preflight = evaluateGuide(config, sources, candidate);
      if (!preflight.length) { writeFileSync(guidePath, candidate); guide = candidate; }
    }
    const failures = evaluateGuide(config, sources, guide);
    console.log(`${config.jobId}: ${failures.length ? `FAIL ${failures.join(', ')}` : 'PASS exact-source application guide'}`);
    failed ||= failures.length > 0;
  }
  process.exitCode = failed ? 1 : 0;
}
