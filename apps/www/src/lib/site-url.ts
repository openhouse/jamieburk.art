import {
  isIndexableDeployment,
  PRODUCTION_SITE_URL
} from "@/lib/deployment-policy";

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const APP_ENV =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "staging";

export const SITE_URL = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (APP_ENV === "production"
      ? PRODUCTION_SITE_URL
      : "https://staging.jamieburk.art")
);

export const IS_PRODUCTION =
  APP_ENV === "production" && SITE_URL === PRODUCTION_SITE_URL;

export const ROBOTS_INDEXABLE = isIndexableDeployment({
  appEnv: APP_ENV,
  siteUrl: SITE_URL,
  robotsPolicy: process.env.NEXT_PUBLIC_ROBOTS_POLICY
});
