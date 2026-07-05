const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV ?? "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamieburk.art";
const publicEmail = "jamie.burkart@gmail.com";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  env: siteEnv,
  isStaging: siteEnv === "staging",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: publicEmail,
  emailHref: `mailto:${publicEmail}`,
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
