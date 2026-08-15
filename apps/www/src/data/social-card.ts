import { join } from "node:path";
import { homeIdentity } from "@/data/home-identity";
import { portfolioPhotos } from "@/data/photography";

export const homeSocialCardRenderContract = {
  id: "home-social-card-role-led-v1",
  selectedComposition: "role-led-cinematic",
  decisionOwner: "Jamie Burkart",
  priorities: [
    "governed-public-use",
    "two-second-role-comprehension",
    "name-recognition",
    "wcag-aa-downscaled-contrast",
    "person-place-co-presence",
    "site-identity-parity",
    "editorial-restraint",
    "exact-render-cache-parity"
  ],
  instructions: [
    "Resolve the governed metadata-stripped East River derivative locally.",
    "Render the photograph full bleed at 1200 by 630 with the approved crop alignment.",
    "Apply the light full-frame wash, then the cinematic charcoal identity gradient.",
    "Keep the gradient darkest beneath the copy and fully transparent before the portrait.",
    "Render the canonical role first in Karla Bold, then Jamie Burkart in TeX Gyre Pagella.",
    "Do not add a tagline, URL, photo label, photo credit, vertical rule, or floating placard.",
    "Verify the exact render at full size and common social-preview scale before changing the cache revision.",
    "When the photo, crop, copy, type, gradient, or layout changes, remeasure contrast and update the governed occurrence, evals, render hash, and cache revision together."
  ],
  layerOrder: ["photo", "photo-wash", "identity-gradient", "copy"],
  visibleCopyOrder: ["role", "name"],
  accessibility: {
    standard: "WCAG 2.2 AA normal-text contrast at common social-preview scale",
    targetContrastRatio: 4.5,
    minimumIdentityFieldOpacity: 0.674140289044,
    measuredIdentityFieldOpacity: 1,
    measuredWorstCaseContrastRatio: 9.482961545,
    limitingCopy: "role",
    measurementDate: "2026-08-15"
  },
  goldenRender: {
    width: 1200,
    height: 630,
    sha256: "b2eabe890f187c9e836e723c16260a8c2ffb53e7511b47712f9c099f554857a0"
  },
  layers: {
    photo: {
      height: "100%",
      left: 0,
      objectFit: "cover",
      objectPosition: "center 46%",
      position: "absolute",
      top: 0,
      width: "100%"
    },
    photoWash: {
      background: "rgba(12, 22, 28, 0.12)",
      bottom: 0,
      display: "flex",
      left: 0,
      position: "absolute",
      right: 0,
      top: 0
    },
    identityField: {
      background:
        "linear-gradient(90deg, rgba(12, 22, 28, 0.96) 0%, rgba(12, 22, 28, 0.9) 34%, rgba(12, 22, 28, 0.72) 49%, rgba(12, 22, 28, 0.36) 64%, rgba(12, 22, 28, 0.1) 77%, rgba(12, 22, 28, 0) 89%)",
      bottom: 0,
      display: "flex",
      left: 0,
      opacity: 1,
      position: "absolute",
      right: 0,
      top: 0
    },
    copy: {
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      left: 70,
      position: "absolute",
      top: 179,
      width: 650
    },
    role: {
      display: "flex",
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.18,
      marginBottom: 17,
      maxWidth: 560,
      textTransform: "uppercase"
    },
    name: {
      display: "flex",
      fontSize: 88,
      letterSpacing: "0em",
      lineHeight: 0.96,
      whiteSpace: "nowrap"
    }
  }
} as const;

export const homeSocialCard = {
  ...homeIdentity,
  width: 1200,
  height: 630,
  revision: "human-index-photo-v5",
  imagePath: "/opengraph-image?v=human-index-photo-v5",
  renderContractId: homeSocialCardRenderContract.id,
  renderPhotoPath: "/images/social/jamie-east-river-og-source.jpg",
  visibleCopy: {
    role: homeIdentity.role,
    name: homeIdentity.name
  },
  identityFont: {
    family: "TeX Gyre Pagella",
    weight: 400,
    sourcePath: "/fonts/tex-gyre-pagella/texgyrepagella-regular.otf",
    licensePath: "/fonts/tex-gyre-pagella/GUST-FONT-LICENSE.txt"
  },
  interfaceFont: {
    family: "Karla",
    weights: [400, 700],
    sourcePaths: {
      400: "/fonts/karla/Karla-Regular.ttf",
      700: "/fonts/karla/Karla-Bold.ttf"
    },
    licensePath: "/fonts/karla/OFL.txt"
  },
  alt: "Jamie Burkart at the East River shoreline beneath the Manhattan Bridge — Technical Project Manager, Product Operations & Implementation.",
  photo: portfolioPhotos.eastRiver,
  photoLabel: "East River, 2022",
  photoCredit: "Photograph by Elana Gordon"
} as const;

export function validateHomeSocialCardRenderContract(
  contract: typeof homeSocialCardRenderContract = homeSocialCardRenderContract
) {
  if (contract.id !== homeSocialCard.renderContractId) {
    throw new RangeError("Social-card render contract ID must match the selected card.");
  }
  if (
    contract.goldenRender.width !== homeSocialCard.width ||
    contract.goldenRender.height !== homeSocialCard.height
  ) {
    throw new RangeError(
      "Social-card golden render dimensions must match the social-card dimensions."
    );
  }
  if (!/^[a-f0-9]{64}$/.test(contract.goldenRender.sha256)) {
    throw new RangeError("Social-card golden render must carry a SHA-256 digest.");
  }
  if (
    contract.layers.identityField.opacity !==
    contract.accessibility.measuredIdentityFieldOpacity
  ) {
    throw new RangeError(
      "Social-card measured identity-field opacity must match the selected opacity."
    );
  }
  if (
    contract.layers.identityField.opacity <
    contract.accessibility.minimumIdentityFieldOpacity
  ) {
    throw new RangeError(
      `Social-card identity-field opacity must be at least ${contract.accessibility.minimumIdentityFieldOpacity}.`
    );
  }
  if (
    contract.accessibility.measuredWorstCaseContrastRatio <
    contract.accessibility.targetContrastRatio
  ) {
    throw new RangeError(
      "Social-card measured contrast must meet the selected accessibility target."
    );
  }
  if (
    contract.visibleCopyOrder.join(",") !==
    Object.keys(homeSocialCard.visibleCopy).join(",")
  ) {
    throw new RangeError(
      "Social-card visible-copy order must match the selected role-and-name copy."
    );
  }
}

export function buildSocialCardLayout(
  contract: {
    accessibility: { minimumIdentityFieldOpacity: number };
    visibleCopyOrder: readonly ("role" | "name")[];
    layers: {
      photo: typeof homeSocialCardRenderContract.layers.photo;
      photoWash: typeof homeSocialCardRenderContract.layers.photoWash;
      identityField: Omit<typeof homeSocialCardRenderContract.layers.identityField, "opacity"> & {
        opacity: number;
      };
      copy: typeof homeSocialCardRenderContract.layers.copy;
      role: typeof homeSocialCardRenderContract.layers.role;
      name: typeof homeSocialCardRenderContract.layers.name;
    };
  } = homeSocialCardRenderContract
) {
  validateHomeSocialCardRenderContract(
    contract as typeof homeSocialCardRenderContract
  );

  return {
    photo: contract.layers.photo,
    photoWash: contract.layers.photoWash,
    identityField: contract.layers.identityField,
    copy: contract.layers.copy,
    role: contract.layers.role,
    name: contract.layers.name,
    visibleCopyOrder: contract.visibleCopyOrder
  } as const;
}

export function resolveSocialCardPhotoPath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.renderPhotoPath.slice(1));
}

export function resolveSocialCardIdentityFontPath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.identityFont.sourcePath.slice(1));
}

export function resolveSocialCardIdentityFontLicensePath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.identityFont.licensePath.slice(1));
}

export function resolveSocialCardInterfaceFontPath(appRoot: string, weight: 400 | 700) {
  return join(appRoot, "public", homeSocialCard.interfaceFont.sourcePaths[weight].slice(1));
}

export function resolveSocialCardInterfaceFontLicensePath(appRoot: string) {
  return join(appRoot, "public", homeSocialCard.interfaceFont.licensePath.slice(1));
}
