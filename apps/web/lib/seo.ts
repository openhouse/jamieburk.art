import { siteMetadata } from "@/lib/metadata";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jamie Burkart",
  url: siteMetadata.url,
  email: siteMetadata.email,
  jobTitle: "Technical Project Manager - Product Operations & Implementation",
  knowsAbout: [
    "Technical project management",
    "Product operations",
    "Implementation",
    "Documentation systems",
    "Civic technology",
    "Public-facing web systems"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteMetadata.name,
  url: siteMetadata.url,
  description: siteMetadata.description
};
