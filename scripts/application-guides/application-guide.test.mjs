import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import {
  renderGuide,
  evaluateGuide,
  evaluatePreliminaryAnswers,
  preliminaryAnswers,
} from './application-guide.mjs';

const hash = (value) => createHash('sha256').update(value).digest('hex');
function fixture() {
  const sources = {
    resume: Buffer.from('# Example Candidate\n\nhttps://example.org/\n\n### Example LLC — Project Manager\n\nBrooklyn, NY | 2009–Present\n\n- Delivered a working service.\n\n## Education\n'),
    letter: Buffer.from('# Cover letter\n\n**Re: Product Manager, Job ID 784450**\n\nDear Hiring Team,\n\nI build useful services.\n\nWarmly,\n\nJamie Burkart\n'),
    pdf: Buffer.from('%PDF-1.7\nfixture'),
    coverPdf: Buffer.from('%PDF-1.7\nsigned-cover-fixture'),
  };
  const config = {
    jobId: '784450', role: 'Product Manager', reviewedOn: '2026-08-30',
    postingUrl: 'https://cityjobs.nyc.gov/job/product-manager-in-brooklyn-jid-45056',
    deadline: '2026-09-04', guide: 'Application-Guide.md',
    sources: Object.fromEntries(Object.entries(sources).map(([key, value]) => [key, {
      path: `Jamie-Burkart-${key}-784450.${['pdf', 'coverPdf'].includes(key) ? 'pdf' : 'md'}`, sha256: hash(value),
    }])),
    fields: [{ id: 'website', label: 'Website', value: 'https://example.org/', matchResume: true }],
    requiredFieldIds: ['website'], expectedExperienceCount: 1,
  };
  return { config, sources, guide: renderGuide(config, sources) };
}
const check = ({ config, sources, guide }) => evaluateGuide(config, sources, guide);

test('additional roles render their own title and source-aware route, not the original product-manager identity', () => {
  const f = fixture();
  f.config.role = 'Operations Manager';
  f.config.sourceContext = 'Civic Match is a discovery route. Confirm the employer Job ID before applying.';
  const guide = renderGuide(f.config, f.sources);
  assert.match(guide, /Civic Match is a discovery route/);
  assert.doesNotMatch(guide, /it is the Product Manager version/);
  assert.match(guide, /verify.*Operations Manager.*784450/);
});

test('complete exact-source guide passes without LLM calls', () => {
  assert.deepEqual(check(fixture()), []);
});
test('a missing guide fails', () => {
  assert.ok(check({ ...fixture(), guide: '' }).includes('guide_missing_or_stale'));
});
test('guide content cannot drift from its field contract', () => {
  const f = fixture();
  f.guide = f.guide.replace('https://example.org/', 'https://wrong.example.org/');
  assert.ok(check(f).includes('guide_missing_or_stale'));
});
test('missing observed required field fails even after regeneration', () => {
  const f = fixture(); f.config.fields = []; f.guide = renderGuide(f.config, f.sources);
  assert.ok(check(f).includes('missing_field:website'));
});
test('changed resume, letter, or PDF invalidates the reviewed source binding', () => {
  for (const kind of ['resume', 'letter', 'pdf', 'coverPdf']) {
    const f = fixture(); f.sources[kind] = Buffer.concat([f.sources[kind], Buffer.from('\nchanged')]);
    assert.ok(check(f).includes(`source_changed:${kind}`));
  }
});
test('a wrong-job upload is rejected', () => {
  const f = fixture(); f.config.sources.pdf.path = 'Jamie-Burkart-Resume-782366.pdf';
  assert.ok(check(f).includes('wrong_job:pdf'));
});
test('a wrong-job cover letter is rejected even if its new hash is recorded', () => {
  const f = fixture(); f.sources.letter = Buffer.from('Dear Hiring Team,\nWrong job.');
  f.config.sources.letter.sha256 = hash(f.sources.letter);
  assert.ok(check(f).includes('wrong_job:letter_body'));
});
test('PDF signature and 10 MB upload ceiling are enforced', () => {
  const f = fixture(); f.sources.pdf = Buffer.from('not a PDF');
  assert.ok(check(f).includes('invalid_pdf'));
  f.sources.pdf = Buffer.alloc(10_000_001);
  assert.ok(check(f).includes('pdf_exceeds_upload_limit'));
});
test('copy-paste profile values must occur in the canonical resume', () => {
  const f = fixture(); f.config.fields[0].value = 'https://wrong.example.org/';
  assert.ok(check(f).includes('unsupported_value:website'));
});
test('email and phone must remain source references, not new tracked copies', () => {
  for (const id of ['email', 'confirm-email', 'phone-number']) {
    const f = fixture(); f.config.fields.push({ id, label: id, value: 'example@example.org' });
    assert.ok(check(f).includes(`contact_must_be_reference:${id}`));
    f.config.fields.at(-1).value = null;
    f.config.fields.at(-1).instruction = 'Copy this field from the linked resume.';
    f.guide = renderGuide(f.config, f.sources);
    assert.deepEqual(check(f), []);
  }
});
test('silently dropping a professional experience entry fails', () => {
  const f = fixture(); f.config.expectedExperienceCount = 2;
  assert.ok(check(f).includes('experience_count_mismatch'));
});
test('missing date structure fails clearly rather than generating guessed dates', () => {
  const f = fixture(); f.sources.resume = Buffer.from(f.sources.resume.toString().replace(' | 2009–Present', ''));
  assert.doesNotThrow(() => evaluateGuide(f.config, f.sources, ''));
  assert.ok(evaluateGuide(f.config, f.sources, '').includes('experience_count_mismatch'));
});
test('generated experience keeps year precision and does not invent months', () => {
  const { guide } = fixture();
  assert.match(guide, /From:.*2009/);
  assert.match(guide, /I currently work here:.*Yes/);
  assert.match(guide, /confirm the actual month/);
  assert.doesNotMatch(guide, /2009-01|January 2009/);
});
test('hiring message uses the exact letter body, not its contact header', () => {
  const { guide } = fixture();
  assert.match(guide, /Dear Hiring Team,\n\nI build useful services\.\n\nWarmly,\n\nJamie Burkart/);
  assert.doesNotMatch(guide, /\*\*Re: Product Manager/);
});
test('guide separates resume upload from message and preserves final human review', () => {
  const { guide } = fixture();
  assert.match(guide, /Upload the tailored résumé PDF alone/);
  assert.match(guide, /Do not append the cover letter/);
  assert.match(guide, /not observed/);
  assert.match(guide, /You review and submit/);
});

test('section order follows the observed form, with preliminary questions before final review', () => {
  const { guide } = fixture();
  const headings = ['Personal information', 'Experience —', 'Education', 'Your Profiles', 'Resume upload', 'Message to the Hiring Team', 'Preliminary questions', 'Final review and submit'];
  const positions = headings.map((heading) => guide.search(new RegExp(`^## \\d+\\. ${heading}`, 'm')));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test('signed PDF is linked and the observed separate cover-letter upload is explained', () => {
  const { guide } = fixture();
  assert.match(guide, /Signed cover-letter PDF.*coverPdf-784450.pdf/);
  assert.match(guide, /Preliminary questions.*Cover letter.*Additional attachments/);
  assert.doesNotMatch(guide, /No separate cover-letter upload is visible/);
});
test('a missing or oversized signed letter cannot yield a ready guide', () => {
  const f = fixture(); delete f.sources.coverPdf;
  assert.ok(check(f).includes('missing_source:coverPdf'));
  f.sources.coverPdf = Buffer.alloc(10_000_001);
  assert.ok(check(f).includes('cover_pdf_exceeds_upload_limit'));
});
test('date research distinguishes legal formation from the earlier practice', () => {
  const f = fixture(); f.sources.resume = Buffer.from(f.sources.resume.toString().replace('Example LLC', 'THICK ARTS LLC'));
  const guide = renderGuide(f.config, f.sources);
  assert.match(guide, /July 2012/);
  assert.match(guide, /not the start month of the earlier independent practice/);
  assert.doesNotMatch(guide, /January 2009/);
});
test('corroborated end month is rendered without inventing a start month', () => {
  const f = fixture(); f.sources.resume = Buffer.from(f.sources.resume.toString().replace('Example LLC', 'KC Town Hall LLC').replace('2009–Present', '2015–2024'));
  const guide = renderGuide(f.config, f.sources);
  assert.match(guide, /April 2024/);
  assert.match(guide, /2015 — confirm the actual month/);
});

test('every enrolled OTI guide carries copy-paste answers for the observed preliminary questions', () => {
  const { guide } = fixture();
  assert.match(guide, /How did you hear about this job\?/);
  assert.match(guide, /Civic Match by Work for America/);
  assert.match(guide, /Preferred first name[\s\S]*Jamie/);
  assert.match(guide, /Preferred last name[\s\S]*Burkart/);
  assert.match(guide, /voluntary[\s\S]*Leave blank/);
  assert.match(guide, /Jamie must personally read and check/);
});

test('protected demographic and veteran fields stay unanswered', () => {
  const mutated = structuredClone(preliminaryAnswers);
  mutated.voluntaryFields[0].answer = 'inferred value';
  assert.ok(evaluatePreliminaryAnswers(mutated).includes(`protected_answer:${mutated.voluntaryFields[0].id}`));
});

test('required attestations remain Jamie-only and unanswered in the guide contract', () => {
  for (const mutation of [
    (contract) => { contract.humanGates[0].answer = true; },
    (contract) => { contract.humanGates[0].authority = 'agent'; },
  ]) {
    const mutated = structuredClone(preliminaryAnswers);
    mutation(mutated);
    assert.ok(evaluatePreliminaryAnswers(mutated).some((failure) => failure.startsWith('human_gate_not_reserved:')));
  }
});

test('an unresolved form-versus-resume chronology blocks the accuracy certification', () => {
  const observation = preliminaryAnswers.observationsByJobId['784450'];
  assert.equal(observation.accuracyCertification, 'blocked-pending-reconciliation');
  assert.ok(observation.experienceRanges.some((entry) => entry.reconciliation === 'conflict'));
  assert.deepEqual(evaluatePreliminaryAnswers(preliminaryAnswers), []);

  const mutated = structuredClone(preliminaryAnswers);
  mutated.observationsByJobId['784450'].accuracyCertification = 'ready';
  assert.ok(evaluatePreliminaryAnswers(mutated).includes('accuracy_ready_with_unresolved_chronology:784450'));
});

test('the reviewed Product Manager draft records entered years without manufacturing months', () => {
  const f = fixture();
  const guide = renderGuide(f.config, f.sources);
  for (const range of ['2017–2024', '2016–2016', '2013–Present', '2017–Present', '2012–Present']) {
    assert.match(guide, new RegExp(range));
  }
  assert.match(guide, /export does not expose the months/);
  assert.match(guide, /Do not check the accuracy certification yet/);
  assert.doesNotMatch(guide, /2017-01|2016-01|2013-01/);
});
