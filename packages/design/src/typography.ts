export const typography = {
  body:
    '"Karla", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  display: '"Verlag Black", "Arial Black", Impact, sans-serif',
  condensed: '"Trade Gothic Bold", "Arial Narrow", sans-serif',
  rounded: '"Gotham Rounded", "Arial Rounded MT Bold", system-ui, sans-serif',
  weird: '"Risque", Georgia, serif',
  hand: 'maria, "Risque", cursive'
} as const;

export const fontPolicy = [
  "Karla may be loaded as an open web font.",
  "Trade Gothic Bold, Verlag Black, and Gotham Rounded are fallback references unless licensed.",
  "Maria's handwriting font is not committed to the public repository without explicit consent."
] as const;
