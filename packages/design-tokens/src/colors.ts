export const oilPastels = {
  paper: "#eeefec",
  surface: "#fffaf2",
  ink: "#343435",
  muted: "#5e5f61",
  line: "#d9d9d6",
  broadwayBlue: "#0b5f81",
  primarySoft: "#dcecf2",
  ochre: "#e9b64e",
  salmon: "#ffa77f",
  paleBlue: "#74c2e5",
  greenGray: "#568e62",
  roseMadder: "#d04667",
  success: "#79c039",
  warning: "#ffb101",
  error: "#d45462"
} as const;

export type OilPastelName = keyof typeof oilPastels;
