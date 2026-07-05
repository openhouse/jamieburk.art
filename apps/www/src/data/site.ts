const siteEnv =
  process.env.NEXT_PUBLIC_SITE_ENV ??
  process.env.SITE_ENV ??
  (process.env.NODE_ENV === "production" ? "production" : "development");

const fallbackSiteUrl =
  siteEnv === "production" ? "https://jamieburk.art" : "http://localhost:3000";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  fallbackSiteUrl
).replace(/\/+$/, "");

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  env: siteEnv,
  enableIndexing: process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailAddress: contactEmail,
  emailLabel: process.env.NEXT_PUBLIC_CONTACT_EMAIL_LABEL ?? "Email Jamie",
  emailHref: contactEmail ? `mailto:${contactEmail}` : "/contact",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
