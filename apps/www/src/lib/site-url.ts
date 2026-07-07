const PRODUCTION_URL = "https://jamieburk.art";
const STAGING_URL = "https://staging.jamieburk.art";

const readEnv = (value: string | undefined) => {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
};

const normalizeUrl = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;

  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
};

export const APP_ENV =
  readEnv(process.env.APP_ENV) ??
  readEnv(process.env.SITE_ENV) ??
  readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ??
  "staging";

export const SITE_URL = normalizeUrl(
  readEnv(process.env.SITE_URL) ?? readEnv(process.env.NEXT_PUBLIC_SITE_URL),
  APP_ENV === "production" ? PRODUCTION_URL : STAGING_URL
);

export const IS_PRODUCTION = APP_ENV === "production" && SITE_URL === PRODUCTION_URL;

export const ROBOTS_POLICY = readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) ?? "noindex";

export const ROBOTS_INDEXABLE = IS_PRODUCTION && ROBOTS_POLICY === "index";
