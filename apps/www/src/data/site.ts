const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://staging.jamieburk.art";
const siteIndexable = process.env.SITE_INDEXABLE === "true";

export const site = {
  name: "Jamie Burkart",
  url: siteUrl,
  indexable: siteIndexable,
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "Public email pending confirmation",
  emailHref: "/contact",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
