const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "staging";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (deployEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");

const noIndex =
  process.env.NEXT_PUBLIC_NO_INDEX === "true" || deployEnv !== "production";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const site = {
  name: "Jamie Burkart",
  deployEnv,
  url: siteUrl,
  noIndex,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail ?? "Public email pending confirmation",
  emailHref: contactEmail ? `mailto:${contactEmail}` : "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
