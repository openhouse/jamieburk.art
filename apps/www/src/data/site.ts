const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "staging";

const defaultUrl =
  deployEnv === "production" ? "https://jamieburk.art" : "https://staging.jamieburk.art";

export const site = {
  name: "Jamie Burkart",
  deployEnv,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
