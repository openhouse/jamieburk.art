const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "staging";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (deployEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  deployEnv,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  githubLabel: "openhouse",
  githubHref: "https://github.com/openhouse",
  linkedInLabel: "jamieburkart",
  linkedInHref: "https://www.linkedin.com/in/jamieburkart",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
