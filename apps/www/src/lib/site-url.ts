const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");
const readEnv = (value: string | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const parseSiteUrl = (value: string | undefined) => {
  const normalized = readEnv(value);
  if (!normalized) return undefined;

  try {
    return stripTrailingSlash(new URL(normalized).toString());
  } catch {
    return undefined;
  }
};

export const APP_ENV =
  readEnv(process.env.APP_ENV) ??
  readEnv(process.env.SITE_ENV) ??
  readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ??
  "staging";

export const SITE_URL =
  parseSiteUrl(process.env.SITE_URL) ??
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (APP_ENV === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");

export const IS_PRODUCTION =
  APP_ENV === "production" && SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE =
  IS_PRODUCTION && readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) === "index";
