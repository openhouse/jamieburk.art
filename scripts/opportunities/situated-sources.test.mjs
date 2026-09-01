import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reconcileSource, screenCandidate, evaluateReview } from './situated-sources.mjs';

const jobs = [
  { employerId: 'nyc-oti', jobId: '789810', title: 'Operations Manager', postingUrl: 'https://cityjobs.nyc.gov/job/operations-manager-in-brooklyn-jid-46143', deadline: '2026-10-04' },
  { employerId: 'nyc-oti', jobId: '782366', title: 'Senior Product Manager', postingUrl: 'https://cityjobs.nyc.gov/job/senior-product-manager-in-new-york-jid-1', deadline: '2026-09-01' },
];
const card = { sourceId: 'source.civic-match.candidate-network', employerId: 'nyc-oti', title: 'Operations Manager', displayedDeadline: '2026-10-03', candidateJobId: '789810', observedOn: '2026-08-30' };
const candidate = { ...jobs[0], salaryMin: 75000, salaryMax: 160000, annualSalary: true, locationFit: true, eligibility: 'review-needed', fitScore: 90, competitivenessScore: 75 };

test('title similarity and a suggested ID do not establish identity', () => {
  assert.equal(reconcileSource(card, jobs).status, 'unverified');
});
test('employer-scoped observed job ID establishes identity and retains the observation', () => {
  const observation = { ...card, observedJobId: '789810' };
  const result = reconcileSource(observation, jobs);
  assert.equal(result.status, 'matched');
  assert.equal(result.canonicalKey, 'nyc-oti:789810');
  assert.deepEqual(result.observation, observation);
});
test('an inspected official destination URL can establish identity without a card job ID', () => {
  assert.equal(reconcileSource({ ...card, destinationUrl: jobs[0].postingUrl }, jobs).status, 'matched');
});
test('a verified official posting can reconcile a distinct discovery application route', () => {
  const observation = {
    ...card,
    employerId: 'nyc-peu',
    title: 'Chief Strategy Officer',
    discoveryDestinationUrl: 'https://docs.google.com/forms/d/example/viewform',
    verifiedOfficialPostingUrl: 'https://cityjobs.nyc.gov/job/chief-strategy-officer-in-manhattan-jid-45904',
    officialContentMatchFields: ['title', 'salary', 'location', 'role-description']
  };
  const official = {
    employerId: 'nyc-peu',
    jobId: '787960',
    title: 'Chief Strategy Officer',
    postingUrl: observation.verifiedOfficialPostingUrl,
    deadline: '2026-09-27'
  };
  const result = reconcileSource(observation, [...jobs, official]);
  assert.equal(result.status, 'matched');
  assert.equal(result.canonicalKey, 'nyc-peu:787960');
  assert.equal(result.observation.discoveryDestinationUrl, observation.discoveryDestinationUrl);
  assert.equal(result.submissionEvidence, false);
});
test('conflicting ID and destination URL cannot silently merge', () => {
  assert.equal(reconcileSource({ ...card, observedJobId: '782366', destinationUrl: jobs[0].postingUrl }, jobs).status, 'conflict');
});
test('an ID from another employer is not a duplicate', () => {
  assert.equal(reconcileSource({ ...card, employerId: 'another-employer', observedJobId: '789810' }, jobs).status, 'unverified');
});
test('deadline discrepancies preserve official authority and the earlier action date', () => {
  const result = reconcileSource({ ...card, observedJobId: '789810' }, jobs);
  assert.equal(result.deadlineConflict, true);
  assert.equal(result.officialDeadline, '2026-10-04');
  assert.equal(result.actionBy, '2026-10-03');
  assert.equal(result.submissionEvidence, false);
});
test('saving or marking applied in a discovery source is not submission evidence', () => {
  assert.equal(reconcileSource({ ...card, observedJobId: '789810', applied: true }, jobs).submissionEvidence, false);
});
test('expired postings are excluded before any model review', () => {
  const result = screenCandidate({ ...candidate, deadline: '2026-08-29' }, '2026-08-30');
  assert.equal(result.state, 'excluded');
  assert.equal(result.llmEligible, false);
});
test('maximum salary below the requested floor is excluded', () => {
  assert.equal(screenCandidate({ ...candidate, salaryMax: 95000 }, '2026-08-30').state, 'excluded');
});
test('a salary band spanning the floor is not a guaranteed qualifying offer', () => {
  assert.ok(screenCandidate(candidate, '2026-08-30').reasons.includes('salary-offer-needs-confirmation'));
});
test('unresolved civil-service eligibility holds promotion and costly reader work', () => {
  const result = screenCandidate(candidate, '2026-08-30');
  assert.equal(result.state, 'review-needed');
  assert.equal(result.llmEligible, false);
});
test('unknown dates, salary units, location, or qualification never pass by default', () => {
  for (const property of ['deadline', 'salaryMax', 'annualSalary', 'locationFit', 'eligibility']) {
    const result = screenCandidate({ ...candidate, eligibility: 'confirmed', salaryMin: 100000, [property]: null }, '2026-08-30');
    assert.equal(result.state, 'review-needed', property);
  }
});
test('only fully screened candidates above both thresholds become review-ready, not automatically applied', () => {
  const good = { ...candidate, eligibility: 'confirmed', salaryMin: 100000 };
  const result = screenCandidate(good, '2026-08-30');
  assert.equal(result.state, 'review-ready');
  assert.equal(result.llmEligible, true);
  assert.equal(result.scoreKind, 'editorial-priority-not-hiring-probability');
  assert.equal(screenCandidate({ ...good, competitivenessScore: 30 }, '2026-08-30').state, 'below-threshold');
});
test('a partial authenticated review cannot claim complete board coverage', () => {
  const review = { coverage: { status: 'partial', claimedComplete: true, pagesReviewed: 0, totalListings: null }, observations: [], candidates: [] };
  assert.ok(evaluateReview(review).includes('incomplete_coverage_claim'));
});
test('a truthful partial review passes without pretending to enumerate listings', () => {
  assert.deepEqual(evaluateReview({ coverage: { status: 'partial', claimedComplete: false, pagesReviewed: 0, totalListings: null }, observations: [card], candidates: [candidate] }), []);
});
test('duplicate canonical records and unsupported source confirmations fail', () => {
  const review = { coverage: { status: 'partial', claimedComplete: false, pagesReviewed: 0, totalListings: null }, observations: [{ ...card, identityStatus: 'matched' }], candidates: [candidate, candidate] };
  assert.ok(evaluateReview(review).includes('duplicate_canonical_opportunity'));
  assert.ok(evaluateReview(review).includes('unsupported_identity_confirmation'));
});
test('invalid editorial scores are not rendered as a priority score', () => {
  const result = screenCandidate({ ...candidate, fitScore: 101 }, '2026-08-30');
  assert.equal(result.priorityScore, null);
  assert.equal(result.llmEligible, false);
});
test('configured screening thresholds are respected', () => {
  const good = { ...candidate, eligibility: 'confirmed', salaryMin: 100000 };
  assert.equal(screenCandidate(good, '2026-08-30', { fitFloor: 95 }).state, 'below-threshold');
});
test('complete coverage requires reconciled totals and a terminal page', () => {
  const complete = {
    coverage: { status: 'complete', claimedComplete: true, pagesReviewed: 1, totalListings: 2, listingsReviewed: 2, hasMore: false },
    inventory: [
      { index: 1, title: 'First', disposition: 'excluded' },
      { index: 2, title: 'Second', disposition: 'review-ready' }
    ], candidates: [], observations: []
  };
  assert.deepEqual(evaluateReview(complete), []);
  assert.ok(evaluateReview({ ...complete, coverage: { ...complete.coverage, hasMore: true } }).includes('incomplete_coverage_claim'));
});
test('complete coverage requires one uniquely indexed disposition per reviewed listing', () => {
  const coverage = { status: 'complete', claimedComplete: true, pagesReviewed: 2, totalListings: 2, listingsReviewed: 2, hasMore: false };
  const review = {
    coverage,
    inventory: [{ index: 1, title: 'First', disposition: 'excluded' }],
    candidates: [],
    observations: []
  };
  assert.ok(evaluateReview(review).includes('complete_inventory_missing'));
  assert.deepEqual(evaluateReview({ ...review, inventory: [...review.inventory, { index: 2, title: 'Second', disposition: 'review-ready' }] }), []);
});
