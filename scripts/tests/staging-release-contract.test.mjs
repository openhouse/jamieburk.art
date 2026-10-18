import assert from 'node:assert/strict';
import test from 'node:test';
import { validateStagingARelease } from '../lib/staging-release-contract.mjs';

const fixture = () => ({
  app: 'jamieburkart-staging-a', domain: 'staging-a.jamieburk.art',
  candidateSha: 'a'.repeat(40), remoteSha: 'a'.repeat(40),
  runningContainer: { id: 'b'.repeat(64), gitRev: 'a'.repeat(40) },
  build: { APP_ENV: 'staging', SITE_ENV: 'staging', NEXT_PUBLIC_DEPLOY_ENV: 'staging', SITE_URL: 'https://staging-a.jamieburk.art', NEXT_PUBLIC_SITE_URL: 'https://staging-a.jamieburk.art', NEXT_PUBLIC_ROBOTS_POLICY: 'noindex' },
  runtime: { APP_ENV: 'staging', SITE_ENV: 'staging', NEXT_PUBLIC_DEPLOY_ENV: 'staging', SITE_URL: 'https://staging-a.jamieburk.art', NEXT_PUBLIC_SITE_URL: 'https://staging-a.jamieburk.art', NEXT_PUBLIC_ROBOTS_POLICY: 'noindex' },
  smoke: { health: true, robots: true, noindexHeader: true, canonicals: true, sitemap: true, routes: true, resume: true, visitorLanguage: true }
});

test('release accepts the exact running candidate on staging A with complete smoke evidence', () => {
  assert.equal(validateStagingARelease(fixture()).pass, true);
});
test('release rejects the generic staging host even if the candidate matches', () => {
  const e=fixture();e.domain='staging.jamieburk.art';
  assert.equal(validateStagingARelease(e).pass,false);
});
test('release rejects incorrect build or runtime indexing and host configuration', () => {
  for(const stage of ['build','runtime']) for(const [key,value] of [['NEXT_PUBLIC_ROBOTS_POLICY','index'],['SITE_URL','https://jamieburk.art'],['NEXT_PUBLIC_SITE_URL','https://staging.jamieburk.art'],['APP_ENV','production']]){
    const e=fixture();e[stage][key]=value;
    assert.equal(validateStagingARelease(e).pass,false,`${stage}.${key}`);
  }
});
test('a branch pointer or git report cannot substitute for the running-container revision', () => {
  const e=fixture();delete e.runningContainer;e.gitReportSha=e.candidateSha;
  assert.equal(validateStagingARelease(e).pass,false);
});
test('release rejects a running-container revision different from the reviewed candidate', () => {
  const e=fixture();e.runningContainer.gitRev='c'.repeat(40);
  assert.equal(validateStagingARelease(e).pass,false);
});
test('release rejects missing or failed hosted checks', () => {
  for(const key of Object.keys(fixture().smoke)) for(const value of [false,undefined]){
    const e=fixture();e.smoke[key]=value;
    assert.equal(validateStagingARelease(e).pass,false,key);
  }
});
