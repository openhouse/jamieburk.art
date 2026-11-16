// Evidence validation only: this does not deploy, approve content, or collect
// credentials. All observations must be supplied by the release operator.
export function validateStagingARelease(evidence = {}) {
  const failures = [];
  const require = (condition, name) => { if (!condition) failures.push(name); };
  require(evidence.app === 'jamieburkart-staging-a', 'staging-a-app');
  require(evidence.domain === 'staging-a.jamieburk.art', 'staging-a-domain');
  require(/^[a-f0-9]{40}$/.test(evidence.candidateSha ?? ''), 'full-reviewed-commit');
  require(evidence.remoteSha === evidence.candidateSha, 'remote-candidate');
  require(/^[a-f0-9]{64}$/.test(evidence.runningContainer?.id ?? '') &&
    evidence.runningContainer?.gitRev === evidence.candidateSha, 'running-container-candidate');
  const expected = {
    APP_ENV: 'staging', SITE_ENV: 'staging', NEXT_PUBLIC_DEPLOY_ENV: 'staging',
    SITE_URL: 'https://staging-a.jamieburk.art',
    NEXT_PUBLIC_SITE_URL: 'https://staging-a.jamieburk.art', NEXT_PUBLIC_ROBOTS_POLICY: 'noindex'
  };
  for (const stage of ['build', 'runtime']) for (const [key, value] of Object.entries(expected)) {
    require(evidence[stage]?.[key] === value, `${stage}.${key}`);
  }
  for (const key of ['health', 'robots', 'noindexHeader', 'canonicals', 'sitemap', 'routes', 'resume', 'visitorLanguage']) {
    require(evidence.smoke?.[key] === true, `hosted.${key}`);
  }
  return { pass: failures.length === 0, failures };
}
