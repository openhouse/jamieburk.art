const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const APP_ENV = process.env.APP_ENV ?? "staging";

export const SITE_URL = stripTrailingSlash(
  process.env.SITE_URL ??
    (APP_ENV === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

export const NEXT_PUBLIC_SITE_URL = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL
);

export const IS_PRODUCTION =
  APP_ENV === "production" &&
  SITE_URL === "https://jamieburk.art" &&
  NEXT_PUBLIC_SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";
