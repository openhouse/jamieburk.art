const readEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");

export const APP_ENV =
  readEnv(process.env.APP_ENV) ??
  readEnv(process.env.SITE_ENV) ??
  readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ??
  "staging";

export const SITE_URL = stripTrailingSlash(
  readEnv(process.env.SITE_URL) ??
    readEnv(process.env.NEXT_PUBLIC_SITE_URL) ??
    (APP_ENV === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);

export const IS_PRODUCTION =
  APP_ENV === "production" || SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) === "index";
