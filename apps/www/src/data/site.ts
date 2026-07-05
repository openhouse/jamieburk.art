const defaultSiteUrl = "https://jamieburk.art";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/+$/, "");
const siteEnvironment =
  process.env.NEXT_PUBLIC_SITE_ENV ?? (siteUrl.includes("staging.") ? "staging" : "production");

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  environment: siteEnvironment,
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "jamie.burkart@gmail.com",
  emailHref: "mailto:jamie.burkart@gmail.com",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
