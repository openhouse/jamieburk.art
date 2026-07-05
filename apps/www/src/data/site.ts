const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "local";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  allowIndexing,
  environment,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
