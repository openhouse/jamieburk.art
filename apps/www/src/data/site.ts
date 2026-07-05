const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamieburk.art";
const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "production";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  deployEnv,
  isStaging: deployEnv !== "production",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
