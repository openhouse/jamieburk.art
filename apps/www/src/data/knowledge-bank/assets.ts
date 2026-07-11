import { assetSchema, type AssetRecord } from "./schema.ts";

const assetInput: AssetRecord[] = [
  {
    id: "callnyc-digital-district-participant-photo",
    projectId: "callnyc",
    title: "Participant photograph of the Digital District breakout",
    mediaType: "photograph",
    publicUseStatus: "protected",
    evidenceRole:
      "Supports the breakout-table title and an approximately 2:10 p.m. participant-photo timestamp.",
    visibleEvidence: [
      "Placard reading 'Digital District - Help improve City Council District office operations.'",
      "A breakout underway around a table."
    ],
    rightsStatus: "Rights for public display are unresolved.",
    consentStatus: "People depicted have not been reviewed for public-display consent.",
    publicBoundary:
      "Describe only the public-safe evidence role. Do not publish the image, a local path, identifying metadata, or an invented URL.",
    sourceId: "participant-archive-digital-district-2016"
  }
];

export const assets = assetInput.map((asset) => assetSchema.parse(asset));
