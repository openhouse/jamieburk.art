import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { z } from "zod";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { dclaListeningSessionAugust2026 } from "../../apps/www/src/data/knowledge-bank/dcla-listening-session-2026-08.ts";
import {
  intakeItemSchema, observationSchema, sourceRecordSchema, researchInquirySchema
} from "../../apps/www/src/data/knowledge-bank/schema.ts";

const root = fileURLToPath(new URL("../../", import.meta.url));
const receiptPath = "evals/knowledge-wiki/dcla-listening-session-2026-08-26.json";
// Exact reviewed editions: changing them requires a fresh reading and receipt.
const receiptSchema = z.strictObject({
  version: z.literal(1), eventDate: z.literal("2026-08-26"), reviewedAt: z.iso.date(),
  transcript: z.strictObject({
    contextual: z.strictObject({
      sha256: z.literal("8ba28143f382157fe7d1dc774e666932571ce68a17dc3ac6e8d3f595101bd0f1"),
      bytes: z.literal(109627), lines: z.literal(668), readThroughLine: z.literal(668)
    }),
    machineCompared: z.strictObject({
      sha256: z.literal("2463c73987b64199b674acc2c5f06584689f0389aa6f8f136bd7676ae5495ea6"),
      bytes: z.literal(130115), lines: z.literal(1288), reviewScope: z.literal("selected-cross-checks")
    }),
    humanAudioAudit: z.literal("not-performed"),
    closingRemarksAgreement: z.literal("edition-disagreement"),
    use: z.literal("paraphrase-only-held-research"), publication: z.literal("not-authorized")
  }),
  agency: z.strictObject({
    jamieRole: z.literal("participant-and-advocate"), governmentEndorsement: z.literal("not-established"),
    policyOutcome: z.literal("not-established"), commissionedWork: z.literal("not-established")
  }),
  photo: z.strictObject({
    suppliedVariants: z.literal(2), eventFamilies: z.literal(1),
    variantFingerprints: z.tuple([
      z.strictObject({ variant: z.literal(1), bytes: z.literal(147854), sha256: z.literal("aa7535b14a6e53a42fdfcfe38021e3410c7cafbadcff2fda20516f64aedad346") }),
      z.strictObject({ variant: z.literal(2), bytes: z.literal(164808), sha256: z.literal("3be89848957d4cd522d7ebe9c0242380eb4664538d34c98b4f699e4131bf6f3d") })
    ]),
    rights: z.literal("cleared"), consent: z.literal("cleared"),
    authorizationBasis: z.literal("Jamie-explicit-portfolio-permission"),
    libraryPresence: z.literal("user-attested"), libraryBinding: z.literal("not-verified"),
    creator: z.literal("not-verified"), credit: z.literal("Photo courtesy of NYC Artist Coalition."),
    placement: z.literal("held-editorial-selection")
  }),
  followup: z.strictObject({
    pastedCopies: z.literal(3), uniqueExchanges: z.literal(1), membership: z.literal("interest-expressed"),
    animation: z.literal("planned"), photoSelects: z.literal("offered"), endorsement: z.literal("not-established")
  }),
  projection: z.literal("held-no-public-claims")
});
const bankSchema = z.strictObject({
  intakeItems: z.array(intakeItemSchema).length(3),
  observations: z.array(observationSchema).length(8),
  sources: z.array(sourceRecordSchema).length(3),
  researchInquiries: z.array(researchInquirySchema).length(1),
  claims: z.array(z.never()).length(0)
});

export function loadDclaIntake() {
  const bank = structuredClone(dclaListeningSessionAugust2026);
  const registered = Object.fromEntries(Object.keys(bank).map(key => [
    key, knowledgeBank[key].filter(record => bank[key].some(item => item.id === record.id))
  ]));
  return {
    receipt: JSON.parse(readFileSync(path.join(root, receiptPath), "utf8")),
    bank, registered: structuredClone(registered)
  };
}

export function evaluateDclaIntake(candidate) {
  const checks = [];
  const check = (id, pass) => checks.push({ id, pass: Boolean(pass) });
  check("review-scope-and-state-schema", receiptSchema.safeParse(candidate?.receipt).success);
  check("canonical-bank-schema", bankSchema.safeParse(candidate?.bank).success);
  if (checks.every(c => c.pass)) {
    const { receipt, bank, registered } = candidate;
    const photo = bank.sources.find(s => s.id === "SRC-DCLA-PORTRAIT-PERMISSION-2026-08-26");
    check("edition-fingerprints-distinct", receipt.transcript.contextual.sha256 !== receipt.transcript.machineCompared.sha256);
    check("canonical-registration-in-sync", isDeepStrictEqual(bank, registered));
    check("every-fragment-linked", bank.intakeItems.every(intake =>
      intake.visibility === "protected" && intake.disposition === "integrated" && intake.sourceIds.length === 1 &&
      bank.sources.some(source => source.id === intake.sourceIds[0]) &&
      intake.observationIds.length > 0 &&
      isDeepStrictEqual(
        [...intake.observationIds].sort(),
        bank.observations.filter(o => o.intakeId === intake.id && intake.sourceIds.includes(o.sourceId)).map(o => o.id).sort()
      )
    ));
    check("positive-practice-preserved", ["POLICY-TRANSLATION", "IMPLEMENTATION-FOLLOWTHROUGH", "DATA-PRACTICE", "PRACTICE-SYNTHESIS"].every(key =>
      bank.observations.some(o => o.id === `OBS-DCLA-${key}-2026-08-26` && o.text.length > 80)
    ));
    check("observations-not-public-claims", bank.observations.every(o => o.claimIds.length === 0));
    check("correspondence-summary-not-corroboration", bank.intakeItems.find(item =>
      item.id === "INTAKE-DCLA-FOLLOWUP-2026-08-28")?.kind === "analysis-note");
    check("no-underlying-source-links", bank.sources.every(s =>
      s.preservationStatus === "private" && s.protectedLocatorId &&
      !s.canonicalUrl && !s.archiveUrl && !s.assetUrl &&
      s.visibility === (s.id === photo?.id ? "public-metadata-only" : "private")
    ));
    check("photo-permission-retained-without-invented-credit",
      photo?.media?.rightsStatus === "cleared" && photo.media.consentStatus === "cleared" &&
      photo.media.publicDisplayStatus === "metadata-only" && !photo.media.photographer &&
      photo.publicCitation === receipt.photo.credit);
    check("minimal-redacted-content", !/(?:\/(?:Users|Volumes|private|tmp)\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|"(?:body|messageBody|messageText|sourcePath|participantIdentity|email|phone|assetUuid)"\s*:)/i.test(JSON.stringify(candidate)));
  }
  const failures = checks.filter(c => !c.pass).map(c => c.id);
  return { passed: failures.length === 0, stage: "deterministic-intake", modelCalls: 0, checks, failures };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = evaluateDclaIntake(loadDclaIntake());
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
}
