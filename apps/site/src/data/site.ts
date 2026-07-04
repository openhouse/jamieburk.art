export const site = {
  name: "Jamie Burkart",
  title: "Technical Project Manager — Product Operations & Implementation",
  tagline: "I turn under-structured work into usable systems.",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jamieburk.art",
  location: "Brooklyn, NY",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "jamie.burkart@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/jamieburkart/",
    github: "https://github.com/openhouse/jamieburk.art",
    resume: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
  }
} as const;

export const referrerSentence =
  "Jamie is a technical project manager and implementation lead who helps civic, cultural, small-business, and public-facing teams turn messy work into usable systems: workflows, documentation, decision records, launch support, onboarding, and handoffs.";
