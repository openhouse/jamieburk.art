export const oilPastels = [
  { name: "Paper", value: "#eeefec", use: "Primary background" },
  { name: "Ink", value: "#343435", use: "Primary text" },
  { name: "Broadway Blue", value: "#0b5f81", use: "Primary action and structure" },
  { name: "Pale Orange", value: "#fce1d1", use: "Warm panel accent" },
  { name: "Lemon Yellow", value: "#f7ec86", use: "Evidence highlight" },
  { name: "Naples Yellow", value: "#fae367", use: "Warning and attention" },
  { name: "Pale Green", value: "#beebc7", use: "Known and resolved state" },
  { name: "Pale Blue", value: "#74c2e5", use: "Open question state" },
  { name: "Rose Madder", value: "#d04667", use: "Protected or sensitive state" },
  { name: "Vermillion", value: "#e04d38", use: "Urgent marker" },
  { name: "Green Gray", value: "#568e62", use: "Secondary action" },
  { name: "Prussian Blue", value: "#014f94", use: "Deep structure" },
  { name: "Hi Yellow", value: "#fcf939", use: "Small bright accent" },
  { name: "Hi Pink", value: "#fe3d89", use: "Small bright accent" },
  { name: "Hi Cyan", value: "#00ffe1", use: "Small bright accent" }
] as const;

export type OilPastel = (typeof oilPastels)[number];
