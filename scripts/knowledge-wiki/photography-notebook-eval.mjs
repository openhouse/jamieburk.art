import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const protectedLocatorPattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/|\/tmp\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.photoslibrary\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;
const embeddedMediaPattern =
  /(?:data:image\/[a-z+.-]+;base64|!\[[^\]]*\]\([^)]*\)|<img\b[^>]*\bsrc=)/i;
const sourceIdentifierPattern =
  /(?:\b[^\n/\\]+\.(?:jpe?g|png|heic|tiff?|dng|raw)\b|\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b|\b(?:source|asset|archive|photo|image)\s+(?:identifier|id|uuid)\s*[:=]\s*\S+)/i;
const gpsPayloadPattern =
  /(?:\bGPS(?: coordinates?)?\s*[:=]\s*)?[-+]?\d{1,2}\.\d{4,}\s*,\s*[-+]?\d{1,3}\.\d{4,}|\b\d{1,3}[°º]\s*\d{1,2}['’]\s*\d{1,2}(?:\.\d+)?["”]?\s*[NSEW]\b/i;
const derivedPrivatePayloadPattern =
  /\b(?:archive location|image file|file name|filename|source file|source identifier|photo id|image id|archive uuid|photo uuid|image uuid|gps|coordinates|latitude|longitude|recognized person|identified person|face tag|face label|people label|person label|ocr|extracted text|recognized text|preview|thumbnail|contact sheet|private album)(?:\s+(?:path|locator|url|uri|text|lettering|coordinates?))?\s*[:=]\s*\S+/i;
const automatedAuthorityPattern =
  /(?:\b(?:model|AI|algorithm|classifier|confidence|score)\b.{0,100}\b(?:automatically\s+)?(?:clears?|closes?|approves?|authorizes?|waives?|overrides?|releases?|publishes?)\b|\b(?:clears?|closes?|approves?|authorizes?|waives?|overrides?|releases?|publishes?)\b.{0,100}\b(?:by|from|using)\b.{0,40}\b(?:model|AI|algorithm|classifier|confidence|score)\b)/i;
const unsupportedClaimPromotionPattern =
  /(?:\b(?:visible observation|photograph|photo|image)\b.{0,120}\b(?:directly|automatically|alone|without corroboration)\b.{0,80}\b(?:verified factual claim|claim|proves?|confirms?|establishes?)\b|\b(?:promotes?|converts?)\b.{0,100}\b(?:visible observation|photograph|photo|image)\b.{0,100}\b(?:verified factual claim|claim|proof)\b)/i;
const forcedCoveragePattern =
  /(?:\bevery\s+(?:project|period|person|place)\b.{0,100}\b(?:equal|quota|coverage|represented)|\bevery\s+(?:photograph|photo|image)\b.{0,80}\b(?:must|shall|required)\b.{0,40}\bclassif)/i;
const falseCompletionPattern =
  /(?:\b(?:private field|field corpus 001|corpus|selection)\b.{0,60}\b(?:is|has been|was|stands)\s+(?:now\s+)?(?:frozen|ingested|assembled|complete|completed|final|finalized|ready)\b|\b(?:finished|completed|finalized)\s+(?:assembling|selecting|ingesting|freezing)\b.{0,60}\b(?:field|corpus|selection)\b)/i;
const proposalContractPattern =
  /(?:\bproposal (?:is|becomes|functions as) (?:a )?(?:contract|deliverable agreement)\b|\bartist (?:must|shall|is required to) (?:complete|deliver|produce|follow)\b.{0,80}\b(?:proposal|promised project|deliverable)\b)/i;
const divergenceFailurePattern =
  /(?:\b(?:departure|deviation|changing course|a different project)\b.{0,80}\b(?:is (?:a )?(?:failure|breach|noncompliance)|counts as (?:a )?(?:failure|breach|noncompliance)|means (?:a )?(?:failure|breach|noncompliance)|constitutes (?:a )?(?:failure|breach|noncompliance))\b|\bartist will be judged\b.{0,100}\b(?:follow|complete|deliver|proposal)\b)/i;
const forcedOutcomePattern =
  /(?:\bmust produce\b.{0,80}\b(?:public|publishable|exhibition|book|portfolio|photograph|photo)\b|\bsuccess (?:is|will be) measured by\b.{0,80}\b(?:number|count|quantity|publishable|output)\b)/i;
const fixedMediumPattern =
  /(?:\bproject (?:must|shall|is required to) (?:remain|stay|continue as) (?:a )?(?:photography|photo)\b|\bchanging from photography\b.{0,50}\b(?:not allowed|forbidden|failure)\b)/i;
const hardDeadlinePattern =
  /(?:\b(?:two weeks|fourteen days)\b.{0,50}\b(?:hard|mandatory|required)\b.{0,20}\bdeadline\b|\bmust (?:finish|complete|deliver)\b.{0,80}\b(?:within|by the end of) (?:two weeks|fourteen days)\b)/i;
const acceptancePublicationPattern =
  /(?:\bacceptance (?:clears|authorizes|grants|supplies|constitutes)\b.{0,80}\b(?:publication|public use|consent|rights|license)\b|\baccepted proposal\b.{0,80}\b(?:may be published|is cleared)\b)/i;
const falselyResolvedRememberedSourcePattern =
  /(?:\bTeju Cole (?:wrote|said|described)\b.{0,80}\b(?:exactly|verbatim|in the essay titled)\b|\b(?:exact )?source (?:has been|is) (?:verified|confirmed|recovered)\b)/i;
const canaryCompletionPattern =
  /(?:\bone-photo (?:operational )?canary\b.{0,140}\b(?:completes?|completed|proves?|establishes?)\b.{0,100}\b(?:field corpus 001|1,000-photo(?:graph)? field|archive-wide|publication readiness|publication ready)\b|\b(?:field corpus 001|1,000-photo(?:graph)? field)\b.{0,100}\b(?:completed|assembled|frozen|ingested)\b.{0,80}\b(?:by|through)\b.{0,40}\bone-photo (?:operational )?canary\b)/i;
const oralHistoryAutoPromotionPattern =
  /\b(?:oral history|recollection|Jamie['’]s response|response)\b.{0,120}\b(?:automatically|directly|without review)\b.{0,100}\b(?:verified claim|claim|approves? publication|publication approval|public caption|rights clearance)\b/i;
const protectedCircumstanceDisclosurePattern =
  /\b(?:family|medical|health|financial|legal|housing|relationship|personal)\s+(?:crisis|emergency|hardship|conflict|breakdown)\b/i;
const unauthorizedCatalogMutationPattern =
  /(?:(?<!not )\b(?:edit|move|delete|retag|reorganize|modify|change)\w*\b.{0,100}\b(?:source asset|original|pre-existing (?:album|collection|organization)|people association|favorite|metadata)\b|\b(?:outside|beyond)\b.{0,60}\bauthorized workspace\b.{0,60}\b(?:write|album|membership|collection)\b|\b(?:album|catalog|membership)\s+write\b.{0,60}\b(?:outside|beyond)\b.{0,60}\bauthorized workspace\b)/i;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function passages(source) {
  return source
    .split(/\n+|(?<=[.!?])\s+/)
    .map((passage) => passage.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function passageMatchesGroups(source, groups) {
  return passages(source).some((passage) =>
    groups.every((pattern) => pattern.test(passage))
  );
}

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/photography-notebook.json"),
      "utf8"
    )
  );
}

export function evaluatePhotographyNotebook(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const manifest = options.manifest ?? loadManifest(repoRoot);
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};

  const record = (id) => {
    if (Object.hasOwn(recordOverrides, id)) return recordOverrides[id];
    return result.byId.get(id);
  };
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };

  const root = record("index.knowledge-wiki");
  const notebook = record(manifest.notebookId);
  const field = record(manifest.fieldId);
  const proposal = record(manifest.proposalId);
  const oralHistory = record(manifest.oralHistoryId);
  const constellation = record(manifest.constellationId);
  const visualIndex = record(manifest.visualIndexId);
  const notebookSource = source(manifest.notebookId);
  const fieldSource = source(manifest.fieldId);
  const proposalSource = source(manifest.proposalId);
  const oralHistorySource = source(manifest.oralHistoryId);
  const constellationSource = source(manifest.constellationId);
  const combinedSource = `${notebookSource}\n${fieldSource}\n${proposalSource}\n${oralHistorySource}\n${constellationSource}`;
  const rfcSource = readFileSync(path.join(repoRoot, manifest.rfcPath), "utf8");

  const contentBindingsCurrent =
    sha256(notebookSource) === manifest.contentBindings.notebook &&
    sha256(fieldSource) === manifest.contentBindings.field &&
    sha256(proposalSource) === manifest.contentBindings.proposal &&
    sha256(oralHistorySource) === manifest.contentBindings.oralHistory &&
    sha256(constellationSource) === manifest.contentBindings.constellation;

  const machineClosesHumanGate = passageMatchesGroups(combinedSource, [
    /\b(?:machine|model|AI|algorithm|automation|automated|classifier|confidence|score|agent)\b/i,
    /\b(?:clear|close|approve|authorize|satisf|fulfill|complete|waiv|overrid|mark|release|publish|substitut)/i,
    /\b(?:human|review|gate|prerequisite|consent|rights|credit|privacy|safety|context|crop|caption|alt text|destination|publication|approval)\b/i
  ]);
  const imagePromotesClaim = passageMatchesGroups(combinedSource, [
    /\b(?:visible observation|photograph|photo|image)\b/i,
    /\b(?:claim|fact|factual|evidence|proof|verified)\b/i,
    /\b(?:sufficient|enough|counts as|qualifies|serves as|becomes|promot|convert|establish|prove|confirm|verif|support)\b/i
  ]);
  const forcedCoverageStatement = passageMatchesGroups(fieldSource, [
    /\b(?:each|every|all)\s+(?:project|period|person|place)\b/i,
    /\b(?:same|equal|balance|quota|allocat|coverage|represent)/i
  ]);
  const finalizedNarrativeStatement =
    /\b(?:this|the)\s+(?:field|corpus|selection)\s+(?:is|has become|constitutes)\s+(?:the|a)\s+(?:representative|complete|comprehensive|final|definitive)\b.{0,100}\b(?:narrative|sample|account|archive|story)\b/i.test(
      fieldSource
    );

  const notebookAreaMaterialized = Boolean(
    notebook?.kind === "index" &&
    notebook?.status === "governed-open" &&
    notebook?.canonical_path === manifest.notebookPath &&
    field?.kind === "research-inquiry" &&
    field?.status === "draft" &&
    field?.canonical_path === manifest.fieldPath &&
    proposal?.kind === "research-inquiry" &&
    proposal?.status === "governed-open" &&
    proposal?.canonical_path === manifest.proposalPath &&
    oralHistory?.kind === "research-inquiry" &&
    oralHistory?.status === "governed-open" &&
    oralHistory?.canonical_path === manifest.oralHistoryPath &&
    constellation?.kind === "research-inquiry" &&
    constellation?.status === "governed-open" &&
    constellation?.canonical_path === manifest.constellationPath
  );

  const notebookReachable = Boolean(
    Boolean(notebook) &&
    Boolean(field) &&
    Boolean(proposal) &&
    Boolean(constellation) &&
    root?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    visualIndex?.relations?.some((relation) => relation.target === manifest.notebookId) &&
    notebook?.relations?.some((relation) => relation.target === manifest.fieldId) &&
    notebook?.relations?.some((relation) => relation.target === manifest.proposalId) &&
    notebook?.relations?.some((relation) => relation.target === manifest.oralHistoryId) &&
    notebook?.relations?.some((relation) => relation.target === manifest.constellationId) &&
    proposal?.relations?.some((relation) => relation.target === manifest.fieldId) &&
    proposal?.relations?.some((relation) => relation.target === "project.sunday-dinner-196") &&
    field?.relations?.some((relation) => relation.target === manifest.oralHistoryId) &&
    oralHistory?.relations?.some((relation) => relation.target === manifest.fieldId) &&
    oralHistory?.relations?.some((relation) => relation.target === "project.kc-town-hall") &&
    result.reachable.has(manifest.notebookId) &&
    result.reachable.has(manifest.fieldId) &&
    result.reachable.has(manifest.proposalId) &&
    result.reachable.has(manifest.oralHistoryId) &&
    result.reachable.has(manifest.constellationId)
  );

  const fieldCorpusStateTruthful =
    /assembled an exploratory rough-draft field of 1,000 photographs/i.test(fieldSource) &&
    /private field was completed and independently verified on 2026-07-22/i.test(fieldSource) &&
    /separate 24-photo editor-ready proposal was then created and verified/i.test(fieldSource) &&
    /Neither selection is a representative sample, evidence set, rights\s+clearance, or publication decision/i.test(fieldSource) &&
    /exact source contract, membership digest, photographs, source identifiers,\s+image-level metadata, private contact sheets, and private encounter notes\s+remain outside public Git/i.test(fieldSource) &&
    /Field Corpus 001 was completed through the separate 1,000-photo field process/i.test(fieldSource) &&
    !/\b(?:current|present|now)\b.{0,50}\b(?:field corpus 001|1,000-photo(?:graph)? field|private field)\b.{0,80}\b(?:not assembled|unfinished|not completed|not frozen)\b/i.test(fieldSource) &&
    !canaryCompletionPattern.test(fieldSource);

  const onePhotoCanaryBounded =
    /one-photo operational canary was also completed/i.test(fieldSource) &&
    /stable local helper created one additive workspace album with one existing source membership pointer/i.test(fieldSource) &&
    /identical rerun was idempotent/i.test(fieldSource) &&
    /independent read-only catalog verification confirmed the folder chain,\s+membership, and that source records and pre-existing organization were not modified/i.test(fieldSource) &&
    /No external upload occurred/i.test(fieldSource) &&
    /create one additive album and add one existing membership pointer within the\s+authorized residency workspace/i.test(fieldSource);

  const onePhotoCanaryPrivacyFailsClosed =
    /Derivatives retaining source-bearing metadata were rejected before visual review/i.test(fieldSource) &&
    /exact photograph, album and folder names, source and collection\s+identifiers, filenames, paths, previews, People associations, metadata,\s+receipts, and verification artifacts remain in the private workspace/i.test(fieldSource) &&
    !protectedLocatorPattern.test(fieldSource) &&
    !sourceIdentifierPattern.test(fieldSource) &&
    !embeddedMediaPattern.test(fieldSource);

  const onePhotoCanaryCapabilityGapExplicit =
    /broad metadata adapter did not complete its one-record probe within the bounded run and remains unverified/i.test(fieldSource) &&
    /does not establish archive-wide metadata availability/i.test(fieldSource) &&
    /one-record probe timed out and remains explicitly\s+unverified for this run/i.test(fieldSource);

  const onePhotoCanaryReleasePathBounded =
    /generic release state machine also did not accept the legitimate empty\s+HOLD manifest/i.test(fieldSource) &&
    /reviewed membership-only plan through the same stable helper/i.test(fieldSource) &&
    /two nonce-bound receipts and the existing independent verifier/i.test(fieldSource) &&
    /does not establish zero-HOLD readiness\s+for the generic phase chain/i.test(fieldSource);

  const onePhotoCanaryDoesNotCompleteField =
    /It is not Field\s+Corpus 001 and did not complete the larger edit/i.test(fieldSource) &&
    /Field Corpus 001 was completed through the separate 1,000-photo field process/i.test(fieldSource) &&
    /It carries no claim of\s+representativeness and is not a publication candidate/i.test(fieldSource) &&
    /Completion establishes a working field, not representative coverage,\s+factual authority, or publication readiness/i.test(fieldSource) &&
    /Every proposed photograph still requires exact rights, consent, credit,\s+context, crop, caption, alt-text, destination, and Jamie approval/i.test(fieldSource) &&
    /Operational success does not confer rights, consent, factual authority,\s+representativeness, accessibility, publication readiness/i.test(fieldSource) &&
    !canaryCompletionPattern.test(fieldSource);

  const attentionNotPublication =
    /select for attention, not publication/i.test(notebookSource) &&
    /selected for attention, not publication/i.test(fieldSource) &&
    /not a\s+representative sample, completeness claim, evidence set, shortlist/i.test(fieldSource) &&
    !finalizedNarrativeStatement;

  const fourLayersRemainDistinct = [
    "Lifetime source records",
    "Private field corpus",
    "Public-safe notebook",
    "Selective public projection"
  ].every((label) => notebookSource.includes(label)) &&
    /Movement between layers is never automatic/i.test(notebookSource);

  const experimentalSpacePreserved =
    /creative, intuitive, experimental, and revisable/i.test(fieldSource) &&
    /sequences and near-duplicates/i.test(fieldSource) &&
    /Unclassified material is a\s+valid and useful state/i.test(fieldSource) &&
    /No coverage quota is required/i.test(fieldSource) &&
    /complicate,\s+contradict, or replace them/i.test(fieldSource) &&
    !forcedCoveragePattern.test(fieldSource) &&
    !forcedCoverageStatement;

  const observationsRemainQuestions =
    /visible observations, memories, interpretations, and supported facts\s+as different things/i.test(notebookSource) &&
    /Route factual propositions to a research inquiry/i.test(notebookSource) &&
    /photograph alone cannot establish identity, consent, authorship,\s+causation, endorsement/i.test(fieldSource) &&
    /seek corroborating sources and\s+collaborator knowledge/i.test(fieldSource) &&
    !unsupportedClaimPromotionPattern.test(fieldSource) &&
    !imagePromotesClaim;

  const collectiveAgencyAndAbsencePreserved =
    /participants remain individual agents/i.test(fieldSource) &&
    /people or forms of labor made peripheral by the camera/i.test(fieldSource) &&
    /Absence from this bounded field does not establish absence/i.test(fieldSource) &&
    /scenes in which Jamie is not visible/i.test(fieldSource);

  const publicNotebookContainsNoPrivatePayload =
    !protectedLocatorPattern.test(combinedSource) &&
    !embeddedMediaPattern.test(combinedSource) &&
    !sourceIdentifierPattern.test(combinedSource) &&
    !gpsPayloadPattern.test(combinedSource) &&
    !derivedPrivatePayloadPattern.test(combinedSource) &&
    /Keep exact source identifiers, filenames, paths, previews, contact sheets/i.test(notebookSource) &&
    /exact source contract, membership digest, photographs, source identifiers,\s+image-level metadata, private contact sheets, and private encounter notes\s+remain outside public Git/i.test(fieldSource) &&
    /contains no reconstructive locator/i.test(oralHistorySource);

  const encounterHistoryIsAdditive =
    /Revise additively and date each encounter/i.test(notebookSource) &&
    /## Encounter log/i.test(fieldSource) &&
    /Future entries should be additive and dated/i.test(fieldSource) &&
    /prior reading changed/i.test(notebookSource);

  const publicationGatesRemainHuman =
    notebook?.projection?.status === "hold" &&
    notebook?.projection?.surfaces?.length === 0 &&
    field?.projection?.status === "hold" &&
    field?.projection?.surfaces?.length === 0 &&
    oralHistory?.projection?.status === "hold" &&
    oralHistory?.projection?.surfaces?.length === 0 &&
    constellation?.projection?.status === "hold" &&
    constellation?.projection?.surfaces?.length === 0 &&
    manifest.humanGates.every((gate) =>
      fieldSource.toLowerCase().includes(gate.toLowerCase())
    ) &&
    (fieldSource.match(/- \[ \]/g) ?? []).length === manifest.humanGates.length &&
    /cannot close these gates/i.test(fieldSource) &&
    !automatedAuthorityPattern.test(combinedSource) &&
    !machineClosesHumanGate;

  const noPublicPhotoRoute =
    !existsSync(path.join(repoRoot, "apps/www/src/app/photos")) &&
    !existsSync(path.join(repoRoot, "apps/www/src/app/photography")) &&
    notebook?.projection?.status !== "active" &&
    field?.projection?.status !== "active" &&
    oralHistory?.projection?.status !== "active" &&
    constellation?.projection?.status !== "active";

  const rfcBoundaryPreserved =
    /^stage: proposed$/m.test(rfcSource) &&
    /RFC remains proposed/i.test(notebookSource) &&
    /does not authorize archive access,\s+private-workspace implementation, image ingestion, or publication/i.test(notebookSource);

  const nextPassDoesNotMutateSource =
    /without mutating\s+source\s+records or\s+pre-existing organization/i.test(fieldSource) &&
    /Create only additive\s+membership\s+pointers\s+inside the authorized workspace/i.test(fieldSource) &&
    /authoritative originals, edits, metadata, and pre-existing organization/i.test(notebookSource) &&
    /Private and read-only for fieldwork; outside this repository/i.test(notebookSource) &&
    /bounded catalog addition/i.test(fieldSource) &&
    /No source asset or pre-existing\s+collection was edited, moved, deleted, retagged, or changed/i.test(fieldSource) &&
    /All catalog writes\s+targeted the authorized workspace namespace/i.test(fieldSource) &&
    !unauthorizedCatalogMutationPattern.test(fieldSource);

  const proposalIsNotAContract =
    /artist residency starts when the proposal is\s+written/i.test(proposalSource) &&
    /proposal is not a contract/i.test(proposalSource) &&
    /artist will not be judged by\s+whether they do what they promised/i.test(proposalSource) &&
    /promise is to make room for the\s+need, not to predict its eventual form/i.test(proposalSource) &&
    !proposalContractPattern.test(proposalSource) &&
    !divergenceFailurePattern.test(proposalSource);

  const artisticDivergenceProtected =
    /permission to go where the work needs to go/i.test(proposalSource) &&
    /Changing course is not a failure/i.test(proposalSource) &&
    /Photography is the point of entry, not a rule governing the\s+exit/i.test(proposalSource) &&
    /grow, wander, rest, contradict its opening\s+language, or discover another project/i.test(proposalSource) &&
    !fixedMediumPattern.test(proposalSource) &&
    !divergenceFailurePattern.test(proposalSource);

  const residencyContainerNotDeadline =
    /Proposed duration:\*\* Up to two weeks/i.test(proposalSource) &&
    /Up to two weeks is a container, not a deadline/i.test(proposalSource) &&
    /may pause, shorten,\s+continue in another form, or redirect itself/i.test(proposalSource) &&
    /Duration does not determine success/i.test(proposalSource) &&
    !hardDeadlinePattern.test(proposalSource);

  const openEndedOutcomeProtected =
    /These are affordances, not requirements/i.test(proposalSource) &&
    /photographic\s+edit, an essay, a book dummy, an installation sketch, a conversation, a map, a\s+new question, or work in another medium/i.test(proposalSource) &&
    /may yield no public object during\s+the residency/i.test(proposalSource) &&
    /not promising a deliverable/i.test(proposalSource) &&
    !forcedOutcomePattern.test(proposalSource);

  const hostAcceptancePreservesArtistAgency =
    /both artist and host/i.test(proposalSource) &&
    /keep\s+those roles distinct enough/i.test(proposalSource) &&
    /As host, I receive and accept\s+this proposal/i.test(proposalSource) &&
    /Acceptance of this proposal is not\s+publication clearance/i.test(proposalSource) &&
    !acceptancePublicationPattern.test(proposalSource);

  const rememberedSourcePositionedHonestly =
    /story I remember from one of Teju\s+Cole's books/i.test(proposalSource) &&
    /exact essay, book, and page have not been recovered/i.test(proposalSource) &&
    /not presented as a\s+verified quotation or exact paraphrase from Cole/i.test(proposalSource) &&
    /open librarian inquiry/i.test(proposalSource) &&
    !falselyResolvedRememberedSourcePattern.test(proposalSource);

  const humanHostAcceptanceRecorded =
    proposal?.status === "governed-open" &&
    proposalSource.includes(
      `Accepted by ${manifest.residencyAcceptance.acceptedBy} on ${manifest.residencyAcceptance.acceptedOn}`
    ) &&
    proposalSource.includes(
      `Host response, ${manifest.residencyAcceptance.acceptedOn}`
    ) &&
    proposalSource.includes(manifest.residencyAcceptance.wording) &&
    /This acceptance opens the residency/i.test(proposalSource) &&
    /does not turn the proposal into a\s+contract, determine its medium or outcome, or close any publication gate/i.test(
      proposalSource
    );

  const oralHistoryPromptBounded =
    /one photograph from the previously verified private editorial\s+field was selected for attention/i.test(oralHistorySource) &&
    /is visible to Jamie in the working\s+conversation but is not stored in this repository/i.test(oralHistorySource) &&
    /Jamie subsequently supplied a protected oral history/i.test(oralHistorySource) &&
    /remain first-person research leads, not conclusions\s+established by the photograph/i.test(oralHistorySource) &&
    /Oral history: received; protected; public-safe capsule created/i.test(oralHistorySource) &&
    /Claim state: none automatically created/i.test(oralHistorySource) &&
    /Public image: not added/i.test(oralHistorySource);

  const oralHistoryIntakeCannotAutoPromote =
    /response will enter as a dated first-person recollection source/i.test(oralHistorySource) &&
    /will not automatically become/i.test(oralHistorySource) &&
    /verified claim/i.test(oralHistorySource) &&
    /public caption or alt text/i.test(oralHistorySource) &&
    /identification or consent for another depicted person/i.test(oralHistorySource) &&
    /creator credit, rights, or license evidence/i.test(oralHistorySource) &&
    /proof of project outcome, causation, or endorsement/i.test(oralHistorySource) &&
    /approval to copy the photograph into the portfolio/i.test(oralHistorySource) &&
    /normal Knowledge Wiki\s+lifecycle and human gates/i.test(oralHistorySource) &&
    !unsupportedClaimPromotionPattern.test(oralHistorySource) &&
    !oralHistoryAutoPromotionPattern.test(oralHistorySource) &&
    !automatedAuthorityPattern.test(oralHistorySource);

  const oralHistoryResearchAndCreditRemainOpen =
    /What moment are we looking at/i.test(oralHistorySource) &&
    /how\s+should collective credit be handled/i.test(oralHistorySource) &&
    /What part of this history should remain private/i.test(oralHistorySource) &&
    /Who made the photograph, and whose permission would be needed/i.test(oralHistorySource) &&
    /distinguish memory from visible observation, seek corroborating\s+records and collaborator knowledge, preserve counterevidence/i.test(oralHistorySource) &&
    /Rights and consent: unresolved/i.test(oralHistorySource);

  const oralHistoryPrivacyFailsClosed =
    /photograph, filename, source and collection identifiers, local paths,\s+previews, People associations, exact date and location metadata, raw oral\s+history, private names, and rights records remain outside public Git/i.test(oralHistorySource) &&
    /contains no reconstructive locator/i.test(oralHistorySource) &&
    !protectedLocatorPattern.test(oralHistorySource) &&
    !embeddedMediaPattern.test(oralHistorySource) &&
    !sourceIdentifierPattern.test(oralHistorySource) &&
    !gpsPayloadPattern.test(oralHistorySource) &&
    !derivedPrivatePayloadPattern.test(oralHistorySource) &&
    !protectedCircumstanceDisclosurePattern.test(oralHistorySource);

  const oralHistoryNotPublication =
    oralHistory?.projection?.status === "hold" &&
    oralHistory?.projection?.surfaces?.length === 0 &&
    /Portfolio state: held/i.test(oralHistorySource) &&
    /No claim or publication state changed/i.test(fieldSource) &&
    !acceptancePublicationPattern.test(oralHistorySource) &&
    !oralHistoryAutoPromotionPattern.test(oralHistorySource) &&
    !machineClosesHumanGate;

  const checks = {
    photography_notebook_materialized: notebookAreaMaterialized,
    photography_notebook_reachable: notebookReachable,
    photography_notebook_content_bound: contentBindingsCurrent,
    field_corpus_state_truthful: fieldCorpusStateTruthful,
    one_photo_canary_bounded: onePhotoCanaryBounded,
    one_photo_canary_privacy_fails_closed: onePhotoCanaryPrivacyFailsClosed,
    one_photo_canary_capability_gap_explicit: onePhotoCanaryCapabilityGapExplicit,
    one_photo_canary_release_path_bounded: onePhotoCanaryReleasePathBounded,
    one_photo_canary_does_not_complete_field: onePhotoCanaryDoesNotCompleteField,
    attention_not_publication: attentionNotPublication,
    four_photo_layers_distinct: fourLayersRemainDistinct,
    experimental_space_preserved: experimentalSpacePreserved,
    photo_observations_remain_questions: observationsRemainQuestions,
    collective_agency_and_absence_preserved: collectiveAgencyAndAbsencePreserved,
    public_notebook_has_no_private_payload: publicNotebookContainsNoPrivatePayload,
    photo_encounters_are_additive: encounterHistoryIsAdditive,
    photo_publication_gates_human: publicationGatesRemainHuman,
    no_public_photo_route: noPublicPhotoRoute,
    photo_rfc_boundary_preserved: rfcBoundaryPreserved,
    photo_source_non_mutation_preserved: nextPassDoesNotMutateSource,
    residency_proposal_not_contract: proposalIsNotAContract,
    artistic_divergence_protected: artisticDivergenceProtected,
    residency_container_not_deadline: residencyContainerNotDeadline,
    open_ended_outcome_protected: openEndedOutcomeProtected,
    host_acceptance_preserves_artist_agency: hostAcceptancePreservesArtistAgency,
    remembered_teju_source_positioned_honestly: rememberedSourcePositionedHonestly,
    human_host_acceptance_recorded: humanHostAcceptanceRecorded,
    oral_history_prompt_bounded: oralHistoryPromptBounded,
    oral_history_intake_cannot_auto_promote: oralHistoryIntakeCannotAutoPromote,
    oral_history_research_and_credit_open: oralHistoryResearchAndCreditRemainOpen,
    oral_history_privacy_fails_closed: oralHistoryPrivacyFailsClosed,
    oral_history_not_publication: oralHistoryNotPublication
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      blockingCriteria: Object.keys(checks).length,
      humanGates: manifest.humanGates.length,
      governedRecords: 4
    }
  };
}
