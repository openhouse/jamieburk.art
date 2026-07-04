export const siteConfig = {
  name: "Jamie Burkart",
  role: "Technical Project Manager - Product Operations & Implementation",
  url: "https://jamieburk.art",
  email: "jamie.burkart@gmail.com",
  location: "Brooklyn, NY",
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, knowledge systems, and public-facing tools.",
  resumePath: "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" }
  ],
  social: {
    github: "https://github.com/openhouse",
    linkedin: ""
  }
} as const;

export const capabilityAreas = [
  "Technical project management",
  "Product operations",
  "Implementation",
  "Knowledge systems & documentation",
  "Civic technology & open data",
  "Web systems & public-facing tools"
] as const;
