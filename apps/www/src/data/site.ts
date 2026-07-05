const defaultSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string | undefined) {
  return (url?.trim() || defaultSiteUrl).replace(/\/+$/, "");
}

const robotsPolicy =
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index" ? "index" : "noindex";

export const site = {
  name: "Jamie Burkart",
  env: process.env.SITE_ENV?.trim() || "development",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  robotsPolicy,
  isIndexable: robotsPolicy === "index",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
