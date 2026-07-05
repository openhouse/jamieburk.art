const DEFAULT_SITE_URL = "https://jamieburk.art";

function cleanSiteUrl(value: string | undefined) {
  const url = value?.trim() || DEFAULT_SITE_URL;

  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function cleanSiteEnv(value: string | undefined, siteUrl: string) {
  if (value?.trim()) {
    return value.trim();
  }

  return siteUrl.includes("staging.") ? "staging" : "production";
}

function cleanAllowIndexing(value: string | undefined, siteEnv: string) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return siteEnv === "production";
}

const runtimeEnv = globalThis.process?.env;
const siteUrl = cleanSiteUrl(runtimeEnv?.["NEXT_PUBLIC_SITE_URL"]);
const siteEnv = cleanSiteEnv(runtimeEnv?.["NEXT_PUBLIC_SITE_ENV"], siteUrl);

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  environment: siteEnv,
  allowIndexing: cleanAllowIndexing(
    runtimeEnv?.["NEXT_PUBLIC_ALLOW_INDEXING"],
    siteEnv
  ),
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
