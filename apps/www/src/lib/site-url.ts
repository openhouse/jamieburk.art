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

export const SITE_ENV = readEnv(process.env.SITE_ENV) ?? APP_ENV;
export const DEPLOY_ENV = readEnv(process.env.NEXT_PUBLIC_DEPLOY_ENV) ?? APP_ENV;

export const SITE_URL =
  parseSiteUrl(process.env.SITE_URL) ??
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  (APP_ENV === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");

export const NEXT_PUBLIC_SITE_URL =
  parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? SITE_URL;

export const ROBOTS_POLICY =
  readEnv(process.env.NEXT_PUBLIC_ROBOTS_POLICY) ?? "noindex";

export const IS_PRODUCTION =
  APP_ENV === "production" &&
  SITE_ENV === "production" &&
  DEPLOY_ENV === "production" &&
  SITE_URL === "https://jamieburk.art" &&
  NEXT_PUBLIC_SITE_URL === "https://jamieburk.art";

export const ROBOTS_INDEXABLE = IS_PRODUCTION && ROBOTS_POLICY === "index";

const contactEmail = readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const contactLabel = readEnv(process.env.NEXT_PUBLIC_CONTACT_LABEL) ?? contactEmail;
const linkedinUrl = parseSiteUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);
const linkedinLabel = readEnv(process.env.NEXT_PUBLIC_LINKEDIN_LABEL) ?? linkedinUrl;
const githubUrl = parseSiteUrl(process.env.NEXT_PUBLIC_GITHUB_URL);
const githubLabel = readEnv(process.env.NEXT_PUBLIC_GITHUB_LABEL) ?? githubUrl;

export const CONTACT = {
  email: contactEmail,
  emailLabel: contactLabel,
  emailHref: contactEmail ? `mailto:${contactEmail}` : undefined,
  linkedinUrl,
  linkedinLabel,
  githubUrl,
  githubLabel,
  hasApprovedContactPath: Boolean(contactEmail || linkedinUrl || githubUrl)
} as const;
