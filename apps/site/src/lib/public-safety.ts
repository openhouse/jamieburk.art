export const PUBLIC_SAFETY_TERMS = [
  "therapy",
  "insurance claim",
  "bank account",
  "SSN",
  "social security",
  "password",
  "raw transcript",
  "Otter raw",
  "landlord dispute",
  "private phone",
  "home address",
  "annuity",
  "trust account",
  "medical",
  "diagnosis",
  "lease details",
  "tenant name",
  "unapproved",
  "TODO: Jamie approval required"
] as const;

export type PublicSafetyFinding = {
  term: string;
  index: number;
};

export function scanTextForPublicSafetyTerms(text: string): PublicSafetyFinding[] {
  const normalizedText = text.toLocaleLowerCase();

  return PUBLIC_SAFETY_TERMS.flatMap((term) => {
    const normalizedTerm = term.toLocaleLowerCase();
    const index = normalizedText.indexOf(normalizedTerm);

    return index === -1 ? [] : [{ term, index }];
  });
}
