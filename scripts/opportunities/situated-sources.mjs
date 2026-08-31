import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const key = (job) => `${job.employerId}:${job.jobId}`;
const date = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

// A source observation stays intact. A plausible title is only a research lead.
export function reconcileSource(observation, jobs) {
  const candidates = jobs.filter((job) => job.employerId === observation.employerId);
  const byId = observation.observedJobId && candidates.find((job) => job.jobId === observation.observedJobId);
  const byUrl = observation.destinationUrl && candidates.find((job) => job.postingUrl === observation.destinationUrl);
  const conflict = (byId && byUrl && key(byId) !== key(byUrl))
    || (observation.observedJobId && byUrl && !byId)
    || (observation.destinationUrl && byId && !byUrl);
  const matched = conflict ? null : byId || byUrl;
  if (!matched) return { status: conflict ? 'conflict' : 'unverified', observation, submissionEvidence: false };
  const officialDeadline = date(matched.deadline) ? matched.deadline : null;
  const sourceDeadline = date(observation.displayedDeadline) ? observation.displayedDeadline : null;
  return {
    status: 'matched', canonicalKey: key(matched), observation,
    officialDeadline, deadlineConflict: Boolean(officialDeadline && sourceDeadline && officialDeadline !== sourceDeadline),
    actionBy: officialDeadline && sourceDeadline ? [officialDeadline, sourceDeadline].sort()[0] : officialDeadline,
    submissionEvidence: false,
  };
}

// Priority is editorial, never a predicted probability of an offer.
// This screens future promotion/review; it does not erase existing opportunities.
export function screenCandidate(job, asOf, { salaryFloor = 100000, fitFloor = 85, competitivenessFloor = 70 } = {}) {
  const exclusions = [], unknowns = [];
  if (!date(asOf)) throw new Error('A valid explicit review date is required');
  if (!date(job.deadline)) unknowns.push('deadline-needs-confirmation');
  else if (job.deadline < asOf) exclusions.push('expired');
  if (job.annualSalary !== true || !Number.isFinite(job.salaryMin) || !Number.isFinite(job.salaryMax) || job.salaryMin > job.salaryMax) unknowns.push('salary-needs-confirmation');
  else if (job.salaryMax < salaryFloor) exclusions.push('salary-below-floor');
  else if (job.salaryMin < salaryFloor) unknowns.push('salary-offer-needs-confirmation');
  if (job.locationFit === false) exclusions.push('location-mismatch');
  else if (job.locationFit !== true) unknowns.push('location-needs-confirmation');
  if (job.eligibility === 'ineligible') exclusions.push('qualification-mismatch');
  else if (job.eligibility !== 'confirmed') unknowns.push('qualification-needs-confirmation');
  const scores = [job.fitScore, job.competitivenessScore];
  const validScores = scores.every((score) => Number.isFinite(score) && score >= 0 && score <= 100);
  if (!validScores) unknowns.push('scores-need-review');
  const state = exclusions.length ? 'excluded' : unknowns.length ? 'review-needed'
    : job.fitScore < fitFloor || job.competitivenessScore < competitivenessFloor ? 'below-threshold' : 'review-ready';
  return { state, reasons: [...exclusions, ...unknowns], llmEligible: state === 'review-ready',
    scoreKind: 'editorial-priority-not-hiring-probability',
    priorityScore: validScores ? Math.round((0.55 * job.fitScore + 0.45 * job.competitivenessScore) * 100) / 100 : null };
}

export function evaluateReview(review) {
  const failures = [];
  const coverage = review.coverage ?? {};
  if (!['partial', 'complete'].includes(coverage.status) || typeof coverage.claimedComplete !== 'boolean') failures.push('coverage_state_missing');
  if ((coverage.claimedComplete || coverage.status === 'complete') && (coverage.status !== 'complete'
      || !coverage.claimedComplete || !(coverage.pagesReviewed > 0) || !Number.isInteger(coverage.totalListings)
      || coverage.totalListings < 0 || coverage.listingsReviewed !== coverage.totalListings || coverage.hasMore !== false)) failures.push('incomplete_coverage_claim');
  const jobs = review.candidates ?? [];
  if (new Set(jobs.map(key)).size !== jobs.length) failures.push('duplicate_canonical_opportunity');
  for (const observation of review.observations ?? []) {
    if (!observation.sourceId || !date(observation.observedOn)) failures.push('observation_provenance_missing');
    const result = reconcileSource(observation, jobs);
    if (observation.identityStatus === 'matched' && result.status !== 'matched') failures.push('unsupported_identity_confirmation');
    if (result.status === 'conflict') failures.push('source_identity_conflict');
  }
  return [...new Set(failures)];
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const review = JSON.parse(readFileSync(resolve(root, 'evals/opportunity-intake/civic-match-discovery.json')));
  const failures = evaluateReview(review);
  console.log(failures.length ? `FAIL ${failures.join(', ')}` : `PASS source integrity; coverage remains ${review.coverage.status}`);
  for (const job of review.candidates) {
    const result = screenCandidate(job, review.reviewedOn, review.thresholds);
    console.log(`${key(job)}: ${result.state}; ${result.reasons.join(', ')}; LLM eligible=${result.llmEligible}`);
  }
  process.exitCode = failures.length ? 1 : 0;
}
