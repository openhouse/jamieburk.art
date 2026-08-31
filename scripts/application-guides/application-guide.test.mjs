import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createHash } from 'node:crypto';
import { renderGuide, evaluateGuide } from './application-guide.mjs';

const hash = (value) => createHash('sha256').update(value).digest('hex');
function fixture() {
  const sources = {
    resume: Buffer.from('# Example Candidate\n\nhttps://example.org/\n\n### Example LLC — Project Manager\n\nBrooklyn, NY | 2009–Present\n\n- Delivered a working service.\n\n## Education\n'),
    letter: Buffer.from('# Cover letter\n\n**Re: Product Manager, Job ID 784450**\n\nDear Hiring Team,\n\nI build useful services.\n\nWarmly,\n\nJamie Burkart\n'),
    pdf: Buffer.from('%PDF-1.7\nfixture'),
  };
  const config = {
    jobId: '784450', role: 'Product Manager', reviewedOn: '2026-08-30',
    postingUrl: 'https://cityjobs.nyc.gov/job/product-manager-in-brooklyn-jid-45056',
    deadline: '2026-09-04', guide: 'Application-Guide.md',
    sources: Object.fromEntries(Object.entries(sources).map(([key, value]) => [key, {
      path: `Jamie-Burkart-${key}-784450.${key === 'pdf' ? 'pdf' : 'md'}`, sha256: hash(value),
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
  for (const kind of ['resume', 'letter', 'pdf']) {
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

test('section order follows the observed form, with profiles after education', () => {
  const { guide } = fixture();
  const headings = ['Personal information', 'Experience —', 'Education', 'Your Profiles', 'Resume upload', 'Message to the Hiring Team', 'Next, review, and submit'];
  const positions = headings.map((heading) => guide.search(new RegExp(`^## \\d+\\. ${heading}`, 'm')));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});
