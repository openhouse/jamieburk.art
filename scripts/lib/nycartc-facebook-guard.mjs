const collectJsonStrings = (value) => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectJsonStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectJsonStrings);
  }
  return [];
};

const semanticUnits = (text) => {
  let sourceUnits = [text];
  let parsedJson = false;
  try {
    sourceUnits = collectJsonStrings(JSON.parse(text));
    parsedJson = true;
  } catch {
    // Markdown and individual statements are scanned by sentence and line.
  }
  return sourceUnits.flatMap((source) =>
    (parsedJson ? [source] : source.split(/\n\s*\n/)).flatMap((block) => block
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[*_`]/g, "")
      .replace(/\s*\n\s*/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((unit) => unit.replace(/\s+/g, " ").trim())
      .filter(Boolean)
    )
  );
};

const currentSurfaceSignal =
  /\b(?:currently recoverable|currently accessible.{0,60}(?:surface|corpus|timeline|records?|population)|current[- ]surface|current(?:ly available)? (?:Page )?(?:surface|corpus|timeline)|surviving.{0,80}(?:surface|timeline|records?|population|corpus)|recovered.{0,40}records?)\b/i;
const historicalPopulationSignal =
  /\b(?:historical|lifetime|ever published|deletion history|whole history|complete history|entire history|all history)\b/i;
const completenessSignal =
  /\b(?:all|every|complete|entire|full|whole|exhaustive|definitive|comprehensive|100 percent|100%|total|none missing|no .{0,60} missing)\b/i;
const populationObjectSignal =
  /\b(?:Facebook|Page|posts?|archive|history|corpus|timeline|record)\b/i;
const lifetimeEscalationSignal =
  /\b(?:proves?|establishes?|constitutes?|represents?|covers?)\b.{0,100}\b(?:complete|entire|full|whole|historical|lifetime)\b|\b(?:complete|entire|full|whole|historical|lifetime)\b.{0,100}\b(?:record|archive|history|corpus|timeline)\b/i;
const explicitPopulationBoundary =
  /\b(?:not|isn't|is not|does not|cannot|may still be missing|not proof)\b.{0,100}\b(?:native Meta export|deletion history|lifetime|historical|every post|complete history|missing)\b/i;
const negatedCompletenessSignal =
  /(?:\b(?:does not|do not|did not|cannot)\b.{0,40}\b(?:assign|attribute|author|write|publish|post|include|recover|cover)\b.{0,80}\b(?:all|every|complete|entire|full|whole|exhaustive|definitive|comprehensive)|\b(?:this|it) is not\b.{0,120}\b(?:complete|entire|full|whole|exhaustive|definitive|comprehensive|lifetime|historical)\b|\bnot (?:a |the )?(?:complete|entire|full|whole|exhaustive|definitive|comprehensive|lifetime|historical)\b|\bnot\b.{0,60}\b(?:exhaustive|definitive|comprehensive)\b|\bnot proof that no\b.{0,80}\bmissing\b|\bhistorical posts?\b.{0,50}\bmay still be missing\b)/i;
const protectedPopulationBoundary =
  /\b(?:outside the repository|remain(?:s)? offline|withheld|protected|not published)\b/i;
const currentPopulationDefinition =
  /\b(?:complete means every unique record surfaced by the currently accessible|complete (?:the )?currently recoverable)\b/i;

const jamieSignal = /\bJamie(?:'s)?\b/i;
const publishingContextSignal =
  /\b(?:NYCAC|NYC Artist Coalition|coalition(?:'s)?|Facebook|Page|account|social|publishing|posting|authorship|publisher|administrator|admin|operator|management|operations?)\b/i;
const roleAssertionSignal =
  /\b(?:authored|wrote|written|penned|drafted|prepared|composed|supplied|copy|language|prose|voice|content|publish|published|posted|created|ran|run|managed|managing|administered|administration|controlled|owned|handled|operated|led|operator|administrator|admin|author|publisher|authorship|responsibility|rested|Page use|publishing|posting)\b/i;
const exclusiveRoleSignal =
  /\b(?:sole|only|exclusive|exclusively|solely|alone|no one else|nobody else|entire|all|every|predominant|predominantly|primary|principally|mainly|most)\b/i;
const sharedRoleSignal =
  /\b(?:shared|others? also|other.{0,40}(?:used|published|posted)|not sole|not exclusive|collective)\b/i;
const memorySignal =
  /\b(?:recalls?|remembers?|recollection|memory|believes?|hypothesis|research-stage|pending corroboration)\b/i;
const roleBoundarySignal =
  /(?:\b(?:no evidence|no record|not exposed|not attributed|not assigned|remain(?:s)? unresolved|requires? corroboration|research-stage|not promoted|does not establish|did not establish|cannot establish|do not say|do not infer)\b|\bJamie\b.{0,80}\b(?:did not|does not|was not|is not)\b.{0,80}\b(?:author|publish|post|admin|sole|exclusive)|\bwithout\b.{0,100}\b(?:converting|assigning|attributing)\b.{0,100}\b(?:authorship|publisher|administrator|role))/i;
const confirmationSignal =
  /\b(?:confirms?|confirmed|verifies?|verified|proves?|proved|establishes?|established|bears? (?:that )?(?:memory|recollection)? ?out|consistent with)\b/i;

const routeSignal =
  /\b(?:tag|tags|tagged|mention|mentions|mentioned|link|links|linked|reference|references|referenced|route|routes|routed|citation|citations)\b/i;
const stakeholderActorSignal =
  /\b(?:Council|agenc(?:y|ies)|partners?|officials?|staff|Council offices?|institutional)\b/i;
const stakeholderResponseSignal =
  /\b(?:engaged|engagement|interacted|interaction|involved|involvement|present|presence|in the room|endorsed|endorsement|responded|response|replied|partnered|participated|participation|took part|attended|attendance|acted|support(?:ed)?|collaborat(?:ed|ion))\b/i;
const inboundStakeholderActionSignal =
  /\b(?:engaged|engagement|interacted|interaction|involved|involvement|present|presence|in the room|endorsed|endorsement|responded|replied|partnered|participated|participation|took part|attended|attendance|acted|support(?:ed)?|collaborat(?:ed|ion))\b/i;
const directStakeholderResponseSignal =
  /\bstakeholders?[- ](?:engagement|interaction|involvement|presence|endorsement|response|participation|attendance|support|collaboration)\b/i;
const stakeholderPresenceSignal =
  /\b(?:Council|agenc(?:y|ies)|officials?|staff)\b.{0,100}\b(?:at|inside|in)\b.{0,50}\b(?:gatherings?|events?|meetings?|activities|the room)\b/i;
const positiveInferenceSignal =
  /\b(?:proves?|proved|establishes?|established|confirms?|confirmed|verifies?|verified|demonstrates?|demonstrated|documents?|documented|indicates?|indicated|shows?|showed|evidences?|evidenced|means?|amounts? to)\b/i;
const explicitInferenceBoundary =
  /(?:\b(?:does not|do not|did not|cannot|is not|are not|was not|were not)\b.{0,80}\b(?:establish|prove|confirm|verify|demonstrate|document|indicate|show|mean|evidence)|\b(?:is|are|was|were) not\b.{0,120}\b(?:engagement|involvement|presence|endorsement|participation|attendance|response|support|interaction)|\b(?:do not|does not) convert\b.{0,120}\b(?:engagement|involvement|presence|endorsement|participation|attendance|response|support)|\bno (?:route|reference|tag|mention|record|evidence)\b.{0,80}\b(?:establishes?|proves?|confirms?|verifies?|demonstrates?|documents?|indicates?|shows?|means?|evidences?)|\bnot (?:verified|evidence|proof|automatic corroboration|inbound engagement|inbound participation)\b|\b(?:distinction among|separately audited)\b.{0,160}\b(?:stakeholder engagement|public-official inbound engagement)\b)/i;
const contrastReassertionSignal =
  /\b(?:although|but|despite|granted|however|nevertheless|while|yet)\b.{0,220}\b(?:(?:proves?|proved|establishes?|established|confirms?|confirmed|verifies?|verified|demonstrates?|demonstrated|documents?|documented|indicates?|indicated|shows?|showed|evidences?|evidenced|means?|amounts? to|follows? from|results? from|resulted from|caused|measured by|came from|represents?)\b|(?:is|are) (?:the )?(?:complete|entire|full|whole|historical|lifetime)\b)/i;

const metricSignal =
  /\b(?:reactions?|comments?|shares?|likes?|interactions?|engagements?|response (?:signals?|floor|counters?)|visible response|reposting|reposts?|volume of reposting|2,374|2374|611|212)\b/i;
const impactSignal =
  /\b(?:reach|reached|impact|attendance|attention|traction|conversion|adoption|influence|amplif(?:y|ied|ication)|unique people|constituents?|policy change|political movement|legislative (?:movement|progress|result)|policy (?:movement|progress|result)|legislation|votes?|Council decision|campaign result|decisions?|results?|outcomes?|causality)\b/i;
const explicitImpactBoundary =
  /(?:\b(?:does not|do not|did not|cannot|is not|are not|was not|were not)\b.{0,100}\b(?:reach|impact|attendance|attention|traction|conversion|adoption|influence|amplification|unique people|policy change|political movement|legislative (?:movement|progress|result)|policy (?:movement|progress|result)|legislation|votes?|Council decision|campaign result|decisions?|results?|outcomes?|causality)|\bnot\b.{0,40}\b(?:reach|impact|attendance|attention|traction|conversion|adoption|influence|amplification|unique people|policy change|political movement|legislative (?:movement|progress|result)|policy (?:movement|progress|result)|legislation|votes?|Council decision|campaign result|decisions?|results?|outcomes?|causality)|\b(?:out of impact claims|separat(?:e|ed|ing|ion).{0,100}from impact|without converting.{0,120}into impact)\b)/i;

const accountSurfaceSignal =
  /\b(?:authenticated|signed[- ]in|logged[- ]in|dashboard|Meta Business Suite|management (?:view|console)|content control|Page controls?|creator tools?|back office|account controls?|control surface)\b/i;
const accountCapabilitySignal =
  /\b(?:access|permissions?|privileges?|administrator|administered|admin|manager|management permissions?|owner|Page role|could|can|able|retain(?:s|ed)?|enter|open|let|allowed|available|belonged|publish as|post(?: as)?|control)\b/i;
const accountBoundarySignal =
  /\b(?:did not|does not|cannot|not exposed|not historical role proof|not establish|not used)\b/i;
const accountAssertionSignal =
  /\b(?:shows?|showed|exposes?|exposed|confirms?|confirmed|allows?|allowed|available|belonged|lets?|let|could|had|has|was|were|administered|published as|posted as)\b/i;

export function findNycartcFacebookPublicArtifactRisk(text) {
  for (const sentence of semanticUnits(text)) {
    const boundedCurrentPopulation =
      currentSurfaceSignal.test(sentence) &&
      (explicitPopulationBoundary.test(sentence) ||
        negatedCompletenessSignal.test(sentence) ||
        currentPopulationDefinition.test(sentence) ||
        (!historicalPopulationSignal.test(sentence) &&
          !lifetimeEscalationSignal.test(sentence)));
    if (
      completenessSignal.test(sentence) &&
      populationObjectSignal.test(sentence) &&
      (!negatedCompletenessSignal.test(sentence) || contrastReassertionSignal.test(sentence)) &&
      !protectedPopulationBoundary.test(sentence) &&
      !boundedCurrentPopulation
    ) {
      return "lifetime-population overclaim";
    }

    const roleAssertion =
      jamieSignal.test(sentence) &&
      publishingContextSignal.test(sentence) &&
      roleAssertionSignal.test(sentence);
    if (roleAssertion) {
      const boundedMemory =
        memorySignal.test(sentence) &&
        sharedRoleSignal.test(sentence) &&
        !confirmationSignal.test(sentence);
      const boundedRole =
        roleBoundarySignal.test(sentence) &&
        !/\b(?:although|but|despite|granted|however|nevertheless|while|yet)\b.{0,180}\bJamie\b.{0,100}\b(?:sole|only|alone|no one else|nobody else|exclusive)\b/i.test(sentence);
      if (!boundedMemory && !boundedRole) {
        return exclusiveRoleSignal.test(sentence)
          ? "exclusive account-role overclaim"
          : "individual publisher overclaim";
      }
    }

    if (
      ((routeSignal.test(sentence) &&
        inboundStakeholderActionSignal.test(sentence) &&
        positiveInferenceSignal.test(sentence)) ||
        (stakeholderActorSignal.test(sentence) && inboundStakeholderActionSignal.test(sentence)) ||
        directStakeholderResponseSignal.test(sentence) ||
        stakeholderPresenceSignal.test(sentence)) &&
      (stakeholderResponseSignal.test(sentence) || stakeholderPresenceSignal.test(sentence)) &&
      (!explicitInferenceBoundary.test(sentence) || contrastReassertionSignal.test(sentence))
    ) {
      return "stakeholder-engagement inflation";
    }

    if (
      metricSignal.test(sentence) &&
      impactSignal.test(sentence) &&
      (!(explicitInferenceBoundary.test(sentence) || explicitImpactBoundary.test(sentence)) ||
        contrastReassertionSignal.test(sentence))
    ) {
      return "interaction-impact inflation";
    }

    if (
      accountSurfaceSignal.test(sentence) &&
      accountCapabilitySignal.test(sentence) &&
      accountAssertionSignal.test(sentence) &&
      !accountBoundarySignal.test(sentence)
    ) {
      return "authenticated account-state disclosure";
    }
  }
  return null;
}

export function hasNycartcFacebookPublicArtifactRisk(text) {
  return findNycartcFacebookPublicArtifactRisk(text) !== null;
}
