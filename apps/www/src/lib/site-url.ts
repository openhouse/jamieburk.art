const PRODUCTION_SITE_URL = "https://jamieburk.art";
const STAGING_SITE_URL = "https://staging.jamieburk.art";

function withoutTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

export const APP_ENV = process.env.APP_ENV ?? "staging";

export const SITE_URL = withoutTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (APP_ENV === "production" ? PRODUCTION_SITE_URL : STAGING_SITE_URL)
);

export const IS_PRODUCTION =
  APP_ENV === "production" || SITE_URL === PRODUCTION_SITE_URL;
