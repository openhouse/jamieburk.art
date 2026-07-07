const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const APP_ENV =
  process.env.APP_ENV ?? "staging";
export const SITE_ENV = process.env.SITE_ENV ?? APP_ENV;
export const DEPLOY_ENV = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? SITE_ENV;

export const SITE_URL = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (SITE_ENV === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

export const NEXT_PUBLIC_SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
);

export const IS_PRODUCTION =
  APP_ENV === "production" ||
  SITE_ENV === "production" ||
  DEPLOY_ENV === "production";

export const ROBOTS_INDEXABLE =
  IS_PRODUCTION &&
  SITE_URL === "https://jamieburk.art" &&
  NEXT_PUBLIC_SITE_URL === "https://jamieburk.art" &&
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
