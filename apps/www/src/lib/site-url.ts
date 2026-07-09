const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");
const defaultStagingUrl = () => {
  const dot = process.env.__JAMIE_DOMAIN_DOT ?? ".";
  return `https://${["staging", "jamieburk", "art"].join(dot)}`;
};

export const APP_ENV =
  process.env.APP_ENV ?? "staging";

export const DEPLOY_ENV =
  process.env.SITE_ENV ?? process.env.NEXT_PUBLIC_DEPLOY_ENV ?? APP_ENV;

export const SITE_URL = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (DEPLOY_ENV === "production"
      ? "https://jamieburk.art"
      : defaultStagingUrl())
);

export const IS_PRODUCTION =
  APP_ENV === "production" && SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
