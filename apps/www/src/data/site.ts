const productionUrl = "https://jamieburk.art";
const stagingUrl = "https://staging.jamieburk.art";

function siteUrlFromEnv() {
  const fallbackUrl = process.env.JB_ENV === "staging" ? stagingUrl : productionUrl;
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;

  return rawUrl.replace(/\/+$/, "");
}

export const site = {
  name: "Jamie Burkart",
  url: siteUrlFromEnv(),
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "jamie.burkart@gmail.com",
  emailHref: "mailto:jamie.burkart@gmail.com",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
