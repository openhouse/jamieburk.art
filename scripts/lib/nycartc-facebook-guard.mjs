const fragments = (text) =>
  text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?;])\s+|\s+\b(?:but|however|yet)\b\s+/i)
    .filter(Boolean);

const boundarySignal =
  /\b(?:not|does not|did not|cannot|could not|no evidence|not established|not confirmed|remain(?:s)? open|pending|requires? corroboration|is not|are not|was not|were not)\b/i;
const memorySignal =
  /\b(?:recalls?|remembers?|recollection|memory|believes?|hypothesis|pending|corroborat(?:e|ed|ing|ion))\b/i;
const currentSurfaceSignal =
  /\b(?:currently recoverable|current(?:ly available)? (?:Page )?surface|surviving.{0,80}(?:surface|timeline|records?|population))\b/i;
const contrastSignal = /\b(?:although|but|despite|even though|however|yet)\b/i;
const falseBoundarySignal = /\bnot\s+(?:only|merely|just)\b/i;
const lifetimeEscalationSignal =
  /\b(?:proves?|establishes?|constitutes?|is)\b.{0,80}\b(?:complete|entire|full|whole)\b.{0,80}\b(?:Facebook|Page|posts?|archive|history|corpus|timeline)\b/i;
const soleRoleSignal = /\b(?:sole|only|exclusive|exclusively|solely)\b/i;

const risks = [
  {
    label: "lifetime-population overclaim",
    pattern:
      /(?:\b(?:all|every|complete|entire|full|whole|100 percent|100%)\b.{0,100}\b(?:Facebook|Page|posts?\b(?!-)|archive|history|corpus|timeline)\b|\btotal\b.{0,24}\b(?:Facebook|Page|posts?\b(?!-)|archive|history|corpus|timeline)\b|\bno\b.{0,80}\b(?:Facebook|Page)?\s*posts?\b.{0,40}\bmissing\b)/i
  },
  {
    label: "individual publisher overclaim",
    pattern:
      /\bJamie\b.{0,100}\b(?:authored|wrote|published|posted|created|ran|managed|administered|controlled|owned|handled|operated|led)\b.{0,100}\b(?:all|every|444|Facebook|Page|social|publishing|operations?)\b/i
  },
  {
    label: "exclusive account-role overclaim",
    pattern:
      /(?:\bJamie\b.{0,100}\b(?:sole|only|exclusive|predominant|primary|primarily|main)\b.{0,100}\b(?:administrator|admin|author|publisher|operator|manager|Page use|posting|publishing)|\b(?:sole|only|exclusive|predominant|primary|main)\b.{0,80}\b(?:administrator|admin|author|publisher|operator|manager)\b.{0,80}\bJamie\b|\b(?:Facebook|Page|account)\b.{0,100}\b(?:primarily|predominantly|mainly|exclusively)\b.{0,100}\b(?:run|managed|operated|published|belonged)\b.{0,60}\b(?:by|to) Jamie\b|\b(?:Facebook|Page|account)\s+publishing\b.{0,100}\b(?:belonged|was assigned)\b.{0,50}\b(?:exclusively|solely|only)\b.{0,50}\b(?:to )?Jamie\b)/i
  },
  {
    label: "stakeholder-engagement inflation",
    pattern:
      /(?:\b(?:tag|tags|tagged|mention|mentions|mentioned|link|links|linked|reference|references|referenced|route|routes|routed)\b.{0,160}\b(?:engaged|engagement|endorsed|responded|replied|partnered|participated|attended|acted|support(?:ed)?|collaborat(?:ed|ion))|\b(?:engaged|engagement|endorsed|responded|replied|partnered|participated|attended|acted|support(?:ed)?|collaborat(?:ed|ion))\b.{0,160}\b(?:tag|tags|mention|mentions|link|links|reference|references|route|routes)\b|\b(?:Council|agenc(?:y|ies)|partners?|stakeholders?|officials?|Council offices?)\b.{0,160}\b(?:engaged|interacted|endorsed|responded|replied|partnered|participated|attended|acted|support(?:ed)?|collaborat(?:ed|ion)))\b/i
  },
  {
    label: "interaction-impact inflation",
    pattern:
      /(?:\b(?:reactions?|comments?|shares?|likes?|interactions?|engagements?|response (?:signals?|floor|counters?))\b.{0,160}\b(?:reach|reached|impact|attendance|attention|traction|conversion|adoption|caused|influence|amplif(?:y|ied|ication)|unique people|constituents?)\b|\b(?:reach|reached|impact|attendance|attention|traction|conversion|adoption|influence|amplif(?:y|ied|ication)|unique people|constituents?)\b.{0,160}\b(?:reactions?|comments?|shares?|likes?|interactions?|engagements?|response (?:signals?|floor|counters?))\b)/i
  },
  {
    label: "authenticated account-state disclosure",
    pattern:
      /(?:\b(?:authenticated|signed[- ]in|logged[- ]in|current session|dashboard|Meta Business Suite|management view|content control|Page controls?)\b.{0,160}\b(?:admin|administrator|manager|owner|access|permissions?|who administered|Page role|publish as|post as|account control|available to Jamie)\b|\bJamie\b.{0,160}\b(?:access|permissions?|admin|administrator|manager|owner|Page role)\b.{0,160}\b(?:dashboard|Meta Business Suite|management view|content control|Page controls?)\b)/i
  }
];

export function findNycartcFacebookPublicArtifactRisk(text) {
  for (const fragment of fragments(text)) {
    for (const risk of risks) {
      if (!risk.pattern.test(fragment)) continue;
      if (
        risk.label === "lifetime-population overclaim" &&
        currentSurfaceSignal.test(fragment) &&
        !lifetimeEscalationSignal.test(fragment)
      ) {
        continue;
      }
      if (
        boundarySignal.test(fragment) &&
        !contrastSignal.test(fragment) &&
        !falseBoundarySignal.test(fragment)
      ) {
        continue;
      }
      if (
        risk.label === "individual publisher overclaim" &&
        memorySignal.test(fragment)
      ) {
        continue;
      }
      if (
        risk.label === "exclusive account-role overclaim" &&
        memorySignal.test(fragment) &&
        !soleRoleSignal.test(fragment)
      ) {
        continue;
      }
      return risk.label;
    }
  }
  return null;
}

export function hasNycartcFacebookPublicArtifactRisk(text) {
  return findNycartcFacebookPublicArtifactRisk(text) !== null;
}
