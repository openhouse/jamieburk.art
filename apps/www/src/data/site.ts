const defaultSiteUrl = "https://jamieburk.art";

function readPublicEnv(name: string, fallback: string) {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

const siteUrl = readPublicEnv("NEXT_PUBLIC_SITE_URL", defaultSiteUrl).replace(/\/+$/, "");
const deployEnv = readPublicEnv("NEXT_PUBLIC_DEPLOY_ENV", "production");
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  deployEnv,
  isProduction: deployEnv === "production" && siteUrl === defaultSiteUrl,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: contactEmail || "Public email pending confirmation",
  emailHref: contactEmail ? `mailto:${contactEmail}` : "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
