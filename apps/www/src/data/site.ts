const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "local";

const fallbackSiteUrl =
  deployEnv === "production"
    ? "https://jamieburk.art"
    : deployEnv === "staging"
      ? "https://staging.jamieburk.art"
      : "http://localhost:3000";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, "");

const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  deployEnv === "production" &&
  siteUrl === "https://jamieburk.art";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  deployEnv,
  allowIndexing,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
