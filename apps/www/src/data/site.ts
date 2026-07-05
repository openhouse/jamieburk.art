export const site = {
  name: "Jamie Burkart",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamieburk.art",
  env: process.env.NEXT_PUBLIC_SITE_ENV ?? "production",
  title:
    "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
  description:
    "Brooklyn-based technical project manager building operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  emailLabel: "jamie.burkart@gmail.com",
  emailHref: "mailto:jamie.burkart@gmail.com",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  location: "Brooklyn, NY"
} as const;
