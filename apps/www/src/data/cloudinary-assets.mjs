/**
 * Public delivery bindings for a deliberately small staging canary.
 *
 * The checked-in files remain the governed source of truth. Cloudinary stores
 * only these already-public derivatives and is treated as a rendition CDN, not
 * as the portfolio's archive or DAM of record.
 */
export const cloudinaryAccount = {
  cloudName: "ofdj6rnm",
  deliveryHost: "res.cloudinary.com"
};

export const cloudinaryAssets = [
  {
    localSrc: "/artifacts/hje/public-site.png",
    kind: "screenshot",
    sha256: "a62bae4666f15c69a99e21cbc456ba6342da28282ed45bf68240b20ce68b854c",
    publicId: "jamieburk-art/portfolio/artifacts/hje-public-site",
    version: "v1786825061",
    bindingMethod: "reused-exact-sha256-match",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Public storefront screenshot already approved for the portfolio. Cloudinary may deliver this derivative on staging only; it is not an archive source."
  },
  {
    localSrc: "/images/field-notes/coalition-facilitation-shoestring.webp",
    kind: "photograph",
    sha256: "152112932b9b3fffabd841de1c45598f7b3cb8c03d13f0f82f5d905f5647c32c",
    publicId: "coalition-facilitation-shoestring",
    version: "v1786825610",
    bindingMethod: "uploaded-from-approved-public-url",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Exact derivative and portfolio occurrence already authorized by Jamie. Cloudinary is a staging delivery surface only; the local governed record remains canonical."
  },
  {
    localSrc: "/images/field-notes/jamie-east-river.webp",
    kind: "photograph",
    sha256: "748b6f12e2845dd7dc1ca3fa3f35d61c26a468150b7e3d6d386ae3622d996621",
    publicId: "jamieburk-art/portfolio/field-notes/jamie-east-river",
    version: "v1786825057",
    bindingMethod: "reused-exact-sha256-match",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Exact Elana Gordon derivative already authorized with visible site credit. Cloudinary is a staging delivery surface only; no broader rights are asserted."
  },
  {
    localSrc: "/images/field-notes/kc-town-hall-roof-work.webp",
    kind: "photograph",
    sha256: "9bd8d1776648e1000765ac1433e8c05bf114e7029738675ed3a6abb31eeded09",
    publicId: "jamieburk-art/portfolio/field-notes/kc-town-hall-roof-work",
    version: "v1786825058",
    bindingMethod: "reused-exact-sha256-match",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Exact KC Town Hall derivative already authorized with visible project courtesy credit. Cloudinary is a staging delivery surface only; the image proves no trade credential or sole authorship."
  },
  {
    localSrc: "/images/field-notes/save-nyc-spaces-town-hall.webp",
    kind: "photograph",
    sha256: "737b7e2d6bfaf5925bddd944200961a8cd4a8ad92ef5d523a5be5ea515220568",
    publicId: "save-nyc-spaces-town-hall",
    version: "v1786825672",
    bindingMethod: "uploaded-from-approved-public-url",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Exact portfolio derivative already authorized by Jamie. Cloudinary is a staging delivery surface only; creator attribution remains unresolved and the work remains collective."
  },
  {
    localSrc: "/images/field-notes/sunday-dinner-shared-map.webp",
    kind: "photograph",
    sha256: "e0d6d674a8a1300e1ca8f53718701af21d1385b4fe13d5be74f1931404f4304c",
    publicId: "jamieburk-art/portfolio/field-notes/sunday-dinner-shared-map",
    version: "v1786825058",
    bindingMethod: "reused-exact-sha256-match",
    remoteOriginalVerifiedAt: "2026-08-15",
    releaseState: {
      publicGit: "approved",
      staging: "approved",
      cloudinaryPublicDelivery: "approved",
      production: "open",
      indexing: "open"
    },
    publicUseBoundary:
      "Exact portfolio occurrence already authorized by Jamie. Cloudinary is a staging delivery surface only; participant identities and private gathering records remain excluded."
  }
];
