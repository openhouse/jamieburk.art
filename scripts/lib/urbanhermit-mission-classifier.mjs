export const urbanhermitMissionSignalRules = [
  { id: "community-platforms-and-gatherings", pattern: /wow\s*list|sunday dinner|open house|monthly music hackathon|popular\.vote|allied media conference/i },
  { id: "civic-participation-and-service", pattern: /callnyc|council20|councilstat|#civictech|#nycvotes|public hearing|civic design|organizing 2\.0/i },
  { id: "cultural-space-advocacy", pattern: /let\s*nyc\s*dance|#letnycdance|cabaret law|save\s*nyc\s*spaces|#savenycspaces|#nightmayor|nyc artist coalition|ghost ship|diy (?:art|music|cultural)?\s*space/i },
  { id: "public-history-place-and-waterways", pattern: /8th street tunnel|8sttunnel|great accommodations|cities on the water|mississippi river|kansas city riverfront|immersive cinema/i },
  { id: "creative-technology-and-media", pattern: /horse\s*lords|analog video|video synthesis|video effect|media archaeology|glitch video|immersive cinema|music hackathon/i },
  { id: "neighborhood-mutual-aid", pattern: /kc town hall|#kctownhall|#tiredoftires|free tire disposal|tire pickup|oak park neighborhood|mutual aid fund/i }
];

export const urbanhermitMissionSignalManifest = urbanhermitMissionSignalRules.map(({ id, pattern }) => ({
  signalId: id,
  pattern: pattern.source,
  flags: pattern.flags
}));
