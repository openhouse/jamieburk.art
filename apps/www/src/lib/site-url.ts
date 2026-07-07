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
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

export const IS_PRODUCTION =
  APP_ENV === "production" && SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE =
  APP_ENV === "production" &&
  SITE_URL === "https://jamieburk.art" &&
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
