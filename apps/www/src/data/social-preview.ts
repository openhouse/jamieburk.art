import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

const composition = {
  id: "human-index-editorial-proposition-v1",
  intent:
    "Let a situated portrait introduce Jamie as a person at work, then state the recurring value of the practice and leave a quiet path to the portfolio.",
  selection: {
    selectedVariant: "image-4-editorial-proposition",
    alternativesReviewed: 6,
    uniqueCompositionsReviewed: 4,
    selectedBy: "Jamie Burkart",
    selectedAt: "2026-08-15"
  },
  score: [
    {
      priority: 1,
      id: "photograph-is-the-field",
      instruction:
        "Fill the canvas with the governed East River photograph; keep the portrait and place continuous, unframed, and recognizable."
    },
    {
      priority: 2,
      id: "name-is-primary",
      instruction:
        "Set Jamie Burkart as the dominant editorial structure in a licensed self-hosted serif, on two calm lines at the upper left."
    },
    {
      priority: 3,
      id: "proposition-is-secondary",
      instruction:
        "Place the plain-language proposition beneath the name in a clear sans serif; it explains the work without competing with the person."
    },
    {
      priority: 4,
      id: "destination-is-quiet",
      instruction:
        "Place jamieburk.art at the lower left as a quiet continuation cue, never as a banner or call-to-action block."
    },
    {
      priority: 5,
      id: "role-and-credit-are-metadata",
      instruction:
        "Keep the literal role and creator credit in Open Graph and Twitter alt metadata and the governed record, not in the rendered pixels."
    }
  ],
  renderedFields: ["name", "proposition", "siteLabel"],
  metadataOnlyFields: ["role", "creatorCredit"],
  approvedRender: {
    width: 1200,
    height: 630,
    contentType: "image/png",
    sha256: "1f83d66b7e35e8a3a955819cf2104b79a88c9a8bd3953fd6fa691143bdb6da42"
  },
  layout: {
    canvas: { width: 1200, height: 630 },
    image: { objectPosition: "center 46%" },
    text: { left: 58, top: 48, width: 560 },
    destination: { left: 58, bottom: 48 }
  },
  contrast: {
    purpose: "functional-text-legibility",
    background:
      "linear-gradient(90deg, rgba(16, 25, 32, 0.82) 0%, rgba(16, 25, 32, 0.72) 42%, rgba(16, 25, 32, 0.34) 66%, rgba(16, 25, 32, 0.06) 84%)"
  },
  typography: {
    displayFont: {
      family: "Libre Baskerville",
      src: "/fonts/libre-baskerville/LibreBaskerville-Regular.ttf",
      weight: 400
    },
    bodyFont: {
      family: "Karla",
      src: "/fonts/karla/Karla-Medium.ttf",
      weight: 500
    },
    name: {
      fontSize: 88,
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 0.98,
      width: 520
    },
    proposition: {
      fontSize: 38,
      fontWeight: 500,
      lineHeight: 1.16,
      marginTop: 34,
      width: 540
    },
    destination: {
      color: "#b9ced8",
      fontSize: 22,
      fontWeight: 500,
      letterSpacing: "0.01em"
    }
  }
} as const;

export const socialPreview = {
  route: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Jamie Burkart — Technical Project Manager — at the East River beneath the Manhattan Bridge. Photograph by Elana Gordon.",
  name: site.name,
  role: "Technical Project Manager",
  creatorCredit: "Photograph by Elana Gordon.",
  proposition: "I help emerging work become usable systems.",
  image: portfolioPhotos.eastRiverSocialPreview,
  siteLabel: "jamieburk.art",
  composition
} as const;
