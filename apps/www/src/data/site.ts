const defaultSiteUrl = "https://jamieburk.art";
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;
const siteUrl = configuredSiteUrl.replace(/\/+$/, "");
const siteHostname = new URL(siteUrl).hostname;
const configuredDeployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV?.trim();
const deployEnv =
  configuredDeployEnv ||
  (siteHostname === "staging.jamieburk.art" ? "staging" : "production");
const isStaging =
  deployEnv === "staging" || siteHostname === "staging.jamieburk.art";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  deployEnv,
  isStaging,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
