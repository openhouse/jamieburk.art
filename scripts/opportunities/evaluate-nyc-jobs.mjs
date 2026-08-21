#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePublicResumeSelection } from "../resumes/evaluate-public-resume-selection.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function read(root, relativePath) {
  const absolute = path.join(root, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
}

function readJson(root, relativePath) {
  const source = read(root, relativePath);
  return source === null ? null : JSON.parse(source);
}

function check(id, pass, detail) {
  return { id, pass: Boolean(pass), detail };
}

function daysBetween(from, to) {
  return Math.floor((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

function betaPublicProjection(report) {
  return {
    publishedAt: report.edition.publishedAt,
    subject: report.edition.subject,
    leads: report.leads.map(({ sourceOrder, title, organization, canonicalUrl, deadline }) => ({
      sourceOrder,
      title,
      organization,
      canonicalUrl,
      deadline
    }))
  };
}

function sha256(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function words(value) {
  return (value.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function fencedAnswerAfter(markdown, heading) {
  const headingIndex = markdown.indexOf(heading);
  if (headingIndex < 0) return null;
  const remaining = markdown.slice(headingIndex + heading.length);
  return remaining.match(/```text\n([\s\S]*?)\n```/)?.[1]?.trim() ?? null;
}

export function evaluateOpportunitySystem({ root = repoRoot } = {}) {
  const config = readJson(root, "config/opportunities/nyc-jobs.json");
  const rubric = readJson(root, "evals/opportunities/nyc-jobs.json");
  const report = readJson(root, "reports/opportunities/nyc-jobs-qualified.json");
  const digest = read(root, "reports/opportunities/nyc-jobs-digest.md");
  const source = read(root, "docs/knowledge-bank/sources/nyc-jobs-open-data.md");
  const evaluation = read(root, "docs/knowledge-bank/evaluations/nyc-jobs-opportunity-feed.md");
  const rfc = read(root, "rfcs/0007-nyc-jobs-opportunity-action-loop.md");
  const environmentExample = read(root, ".env.example");
  const sourceRegistry = readJson(root, "config/opportunities/sources.json");
  const civicConfig = readJson(root, "config/opportunities/civic-match.json");
  const civicRubric = readJson(root, "evals/opportunities/civic-match.json");
  const civicGuide = civicConfig ? read(root, civicConfig.guidePath) : null;
  const civicHillClimb = civicConfig ? readJson(root, civicConfig.latestHillClimbPath) : null;
  const civicSource = read(root, "docs/knowledge-bank/sources/civic-match.md");
  const civicEvaluation = read(root, "docs/knowledge-bank/evaluations/civic-match-opportunity-source.md");
  const betaConfig = readJson(root, "config/opportunities/betanyc-newsletter.json");
  const betaRubric = readJson(root, "evals/opportunities/betanyc-newsletter.json");
  const betaReport = readJson(root, "reports/opportunities/betanyc-newsletter-current.json");
  const betaSource = read(root, "docs/knowledge-bank/sources/betanyc-newsletter.md");
  const betaEvaluation = read(root, "docs/knowledge-bank/evaluations/betanyc-newsletter-opportunity-source.md");
  const polimorphicOpportunity = read(root, "docs/knowledge-bank/opportunities/polimorphic-product-manager-123173.md");
  const namedReaders = readJson(root, "evals/knowledge-wiki/named-hiring-readers.json");
  const requiredArtifacts = [
    config,
    rubric,
    report,
    digest,
    source,
    evaluation,
    rfc,
    environmentExample,
    sourceRegistry,
    civicConfig,
    civicRubric,
    civicGuide,
    civicHillClimb,
    civicSource,
    civicEvaluation,
    betaConfig,
    betaRubric,
    betaReport,
    betaSource,
    betaEvaluation,
    polimorphicOpportunity,
    namedReaders
  ];
  if (!requiredArtifacts.every(Boolean)) {
    return {
      overall: "fail",
      admittedCount: report?.admittedCount ?? 0,
      actionableCount: report?.actionableCount ?? 0,
      checks: [check("required-artifacts", false, "One or more opportunity-loop artifacts are missing.")]
    };
  }

  const thresholds = report.admitted.every(
    (item) =>
      item.fitScore >= report.threshold.fit &&
      item.securabilityScore >= report.threshold.securability &&
      item.combinedScore >= report.threshold.combined
  );
  const generated = report.admitted.map((item) => ({
    jobId: item.jobId,
    source: read(root, `docs/knowledge-bank/opportunities/nyc-jobs-${item.jobId}.md`)
  }));
  const generatedClosure =
    generated.length === report.admittedCount &&
    generated.every(
      (item) =>
        item.source !== null &&
        item.source.includes(`id: opportunity.nyc-jobs.${item.jobId}`) &&
        item.source.includes("human_review: requested") &&
        item.source.includes("application_materials_gate: required-before-application-material-generation") &&
        item.source.includes("disposition: verify")
    );
  const evaluationLinkClosure = report.admitted.every((item) =>
    evaluation.includes(`../opportunities/nyc-jobs-${item.jobId}.md`)
  );
  const publicConfig = JSON.stringify(config);
  const rawBoundary =
    !JSON.stringify(report).match(/"(?:description|minimumQualifications|preferredSkills|rawRow|rawRows)"\s*:/) &&
    generated.every((item) => !item.source?.match(/job_description|minimum_qual_requirements|preferred_skills/i));
  const actionLines = digest.match(/\*\*Next action:\*\*/g)?.length ?? 0;
  const checks = [
    check(
      "rubric-config-agreement",
      JSON.stringify(rubric.thresholds) === JSON.stringify(config.strongMatchThreshold) &&
        rubric.gate_order[0].includes("rowsUpdatedAt") &&
        rubric.gate_order.at(-1) === "Jamie application decision",
      "The authored rubric and executable configuration agree on thresholds and gate order."
    ),
    check(
      "official-source-binding",
      config.datasetId === "pda4-rgn4" &&
        source.includes("id: source.jobs.nyc-open-data.current") &&
        source.includes(config.landingPage),
      "Configuration and source record bind the official pda4-rgn4 dataset."
    ),
    check(
      "row-data-freshness",
      config.lastSeenRowsUpdatedAt === report.datasetRowsUpdatedAt &&
        source.includes(`rows_updated_at: ${report.datasetRowsUpdatedAt}`),
      "Configuration, report, and source record agree on rowsUpdatedAt."
    ),
    check(
      "strong-admission-threshold",
      report.admittedCount > 0 && thresholds,
      "Every admitted opportunity clears fit, securability, and combined thresholds."
    ),
    check(
      "generated-opportunity-closure",
      generatedClosure && evaluationLinkClosure,
      "Every admission has a review-gated governed opportunity record reachable from the evaluation."
    ),
    check(
      "action-digest-closure",
      report.actionableCount >= report.admittedCount && actionLines === report.actionableCount,
      "The digest gives every active actionable opportunity exactly one next action."
    ),
    check(
      "raw-description-boundary",
      rawBoundary,
      "Generated reports and opportunity records omit raw job descriptions and qualification text."
    ),
    check(
      "email-secret-boundary",
      !publicConfig.includes("@") &&
        config.delivery.recipientEnv === "OPPORTUNITY_DIGEST_TO" &&
        config.delivery.senderEnv === "OPPORTUNITY_DIGEST_FROM" &&
        config.delivery.apiKeyEnv === "RESEND_API_KEY",
      "Recipient, sender, and provider credential values enter only through environment secrets."
    ),
    check(
      "delivery-activation-gate",
      config.delivery.defaultMode === "dry-run" &&
        environmentExample.includes("OPPORTUNITY_DIGEST_DELIVERY=dry-run") &&
        rfc.includes("requires separate operator activation") &&
        rfc.includes("Staging deployment does not enable email"),
      "Recurring delivery remains dry-run until its external authority surface receives separate operator activation."
    ),
    check(
      "complementary-source-boundary",
      source.includes("complementary discovery source") &&
        source.includes("does not replace direct checks") &&
        evaluation.includes("Jamie alone decides whether and when to apply"),
      "The source does not displace direct posting review or Jamie's application decision."
    )
  ];

  const sourceIds = sourceRegistry.sources.map((item) => item.id);
  const sourceRegistryChecks = [
    check(
      "source-registry-complete",
      sourceIds.length === 3 &&
        new Set(sourceIds).size === 3 &&
        sourceIds.includes("nyc-jobs-open-data") &&
        sourceIds.includes("civic-match") &&
        sourceIds.includes("betanyc-newsletter"),
      "The registry includes exactly the NYC Jobs Open Data, Civic Match, and BetaNYC newsletter sources."
    ),
    check(
      "source-affordances-distinct",
      sourceRegistry.sources.some(
        (item) => item.id === "nyc-jobs-open-data" && item.machineReadable && !item.recruiterDiscovery
      ) &&
        sourceRegistry.sources.some(
          (item) =>
            item.id === "civic-match" &&
            !item.machineReadable &&
            item.recruiterDiscovery &&
            item.profileVisibilityControls &&
            item.privateIntake
        ) &&
        sourceRegistry.sources.some(
          (item) =>
            item.id === "betanyc-newsletter" &&
            !item.machineReadable &&
            item.editorialCuration &&
            item.recurringEmail &&
            item.crossSourceEnrichment
        ),
      "Machine-readable feeds, profile-mediated discovery, and recurring editorial discovery preserve distinct affordances."
    )
  ];

  const fieldIds = civicConfig.profileSteps.flatMap((step) => step.fields.map((field) => field.id));
  const essayOne = fencedAnswerAfter(civicGuide, "### Private answer 1 — government impact");
  const essayTwo = fencedAnswerAfter(civicGuide, "### Private answer 2 — initiative and impact");
  const profileSummary = fencedAnswerAfter(civicGuide, "### Profile summary");
  const helperReadersExist = civicConfig.modeledHelpers.every((reader) => read(root, reader.readerPath));
  const publicSelection = evaluatePublicResumeSelection({ root });
  const selectedReaderPackets = publicSelection.llmGate.queue.map((queued) => {
    const gate = namedReaders.opportunityReaders.find((reader) => reader.id === queued.gateId);
    return {
      audience: "opportunity-hiring-reader",
      gateId: queued.gateId,
      readerId: gate?.readerId ?? null,
      readerPath: gate?.readerPath ?? null,
      opportunityId: queued.opportunityId,
      materials: civicRubric.audienceContracts["opportunity-hiring-reader"].materials,
      passStatement: civicRubric.audienceContracts["opportunity-hiring-reader"].passStatement
    };
  });
  const helperPackets = civicConfig.modeledHelpers.map((helper) => ({
    audience: "civic-match-helper",
    readerId: helper.readerId,
    readerPath: helper.readerPath,
    relationshipToSource: helper.publicRelationship,
    opportunityIds: publicSelection.selectedOpportunityIds,
    materials: civicRubric.audienceContracts["civic-match-helper"].materials,
    passStatement: civicRubric.audienceContracts["civic-match-helper"].passStatement
  }));
  const audiencePacketBoundary =
    helperPackets.every((packet) => packet.materials.includes("private-intake-answers")) &&
    selectedReaderPackets.every(
      (packet) =>
        !packet.materials.includes("private-intake-answers") &&
        packet.materials.includes("employer-visible-profile") &&
        packet.readerId &&
        packet.readerPath &&
        read(root, packet.readerPath)
    );
  const civicChecks = [
    check(
      "civic-source-records",
      civicSource.includes("id: source.jobs.civic-match.current") &&
        civicEvaluation.includes("target: source.jobs.civic-match.current") &&
        civicEvaluation.includes("status: maintained"),
      "The governed source and evaluation records bind Civic Match."
    ),
    check(
      "civic-five-step-topology",
      civicConfig.profileSteps.length === 5 &&
        civicConfig.profileSteps.every((step, index) => step.step === index + 1 && step.fields.length > 0) &&
        new Set(fieldIds).size === fieldIds.length,
      "The observed five-step candidate form has unique field identifiers and explicit visibility classes."
    ),
    check(
      "civic-private-essay-limits",
      essayOne !== null && essayTwo !== null && words(essayOne) <= 300 && words(essayTwo) <= 300,
      `Private essay word counts are ${essayOne ? words(essayOne) : "missing"} and ${essayTwo ? words(essayTwo) : "missing"}.`
    ),
    check(
      "civic-profile-summary-present",
      profileSummary !== null && words(profileSummary) >= 80 && words(profileSummary) <= 200,
      `The employer-visible profile summary is ${profileSummary ? words(profileSummary) : "missing"} words.`
    ),
    check(
      "civic-protected-contact-boundary",
      !/jamie(?:\.burkart)?@(gmail|ohai)\./i.test(civicGuide) &&
        !/\+?1?[\s.(\-]*\d{3}[\s.)\-]*\d{3}[\s.\-]*\d{4}/.test(civicGuide),
      "The committed guide contains no literal private email address or telephone number."
    ),
    check(
      "civic-writer-voice-binding",
      civicGuide.includes(`writer_voice_source: ${civicConfig.writerVoiceSource}`) &&
        civicGuide.includes(`writer_voice_revision_sha256: ${civicConfig.writerVoiceRevisionSha256}`),
      "The guide binds the maintained writer's-voice source and current connected-read fingerprint."
    ),
    check(
      "civic-hill-climb-integrity",
      civicHillClimb.baseline.checks.collectiveCreditBoundary === false &&
        civicHillClimb.final.checks.collectiveCreditBoundary === true &&
        civicHillClimb.final.governmentImpactEssayWords === words(essayOne ?? "") &&
        civicHillClimb.final.communityInitiativeEssayWords === words(essayTwo ?? "") &&
        civicHillClimb.final.profileSummaryWords === words(profileSummary ?? "") &&
        civicHillClimb.final.deterministicVerdict === "pass" &&
        civicHillClimb.final.modeledReaderStatus === "queued-not-run",
      "The recorded hill climb matches current content metrics and does not claim an unrun modeled-reader result."
    ),
    check(
      "civic-helper-profiles",
      civicConfig.modeledHelpers.length === 2 && helperReadersExist,
      "The two current Civic Match leadership-context lenses have carefully scoped public-context profiles."
    ),
    check(
      "civic-helper-authority-boundary",
      civicRubric.audienceContracts["civic-match-helper"].authorityBoundary.includes(
        "not the government employer's hiring decision"
      ) &&
        civicRubric.audienceContracts["opportunity-hiring-reader"].authorityBoundary.includes(
          "no Work for America-only essay"
        ),
      "Helper recommendations remain distinct from employer hiring authority and private intake remains private."
    ),
    check(
      "civic-current-opportunity-selection",
      publicSelection.overall === "pass" && publicSelection.selectedOpportunityIds.length > 0,
      "Only readers for the current deterministic opportunity and resume selection may be queued."
    ),
    check(
      "civic-audience-packet-boundary",
      audiencePacketBoundary,
      "Private Work for America intake stays out of opportunity hiring-reader packets."
    ),
    check(
      "civic-external-action-boundary",
      civicGuide.includes("Jamie alone") &&
        civicGuide.includes("No signup, profile publication, resume upload, terms acceptance, or submission") &&
        civicConfig.externalActionBoundary.includes("Jamie alone"),
      "Protected answers, visibility, terms, and final submission remain Jamie-controlled."
    )
  ];

  const betaEditionAgeDays = daysBetween(betaReport.edition.publishedAt, betaConfig.asOf);
  const betaPromoted = betaReport.leads
    .filter((lead) => lead.disposition.startsWith("promote-"))
    .sort((a, b) => b.combinedScore - a.combinedScore);
  const betaNew = betaPromoted.filter((lead) => lead.disposition === "promote-new");
  const betaExisting = betaPromoted.filter((lead) => lead.disposition === "promote-existing");
  const nycAdmissions = new Set(report.admitted.map((lead) => `opportunity.nyc-jobs.${lead.jobId}`));
  const betaDestinationsArePublicSafe = betaReport.leads.every((lead) => {
    try {
      const url = new URL(lead.canonicalUrl);
      return (
        !url.hostname.endsWith("list-manage.com") &&
        betaConfig.trackingParameters.every((parameter) => !url.searchParams.has(parameter))
      );
    } catch {
      return false;
    }
  });
  const betaReaders = betaConfig.modeledReaders.map((reader) => ({
    audience: "opportunity-hiring-reader",
    readerId: reader.readerId,
    readerPath: reader.readerPath,
    relationshipToRole: reader.publicRelationship,
    opportunityId: betaNew[0]?.opportunityId ?? null,
    materials: ["public-portfolio", "public-resume", "official-employer-posting"],
    passStatement: betaRubric.execution.passStatement
  }));
  const betaBaseChecks = [
    check(
      "betanyc-source-records",
      betaSource.includes("id: source.jobs.betanyc-newsletter.current") &&
        betaEvaluation.includes("target: source.jobs.betanyc-newsletter.current") &&
        betaEvaluation.includes("status: maintained") &&
        betaConfig.sourcePath === "docs/knowledge-bank/sources/betanyc-newsletter.md" &&
        betaConfig.evaluationPath === "docs/knowledge-bank/evaluations/betanyc-newsletter-opportunity-source.md",
      "The maintained source and evaluation records bind the recurring BetaNYC opportunity source."
    ),
    check(
      "betanyc-edition-freshness",
      betaEditionAgeDays >= 0 &&
        betaEditionAgeDays <= betaConfig.maximumEditionAgeDays &&
        betaConfig.latestEditionDate === betaReport.edition.publishedAt &&
        betaConfig.latestPublicArchiveEditionDate === betaReport.edition.latestPublicArchiveEditionDate,
      `The newest recorded edition is ${betaEditionAgeDays} day(s) old and its mailbox and public-archive clocks agree across artifacts.`
    ),
    check(
      "betanyc-public-safe-destinations",
      betaDestinationsArePublicSafe &&
        !JSON.stringify(betaReport).match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/) &&
        !JSON.stringify(betaReport).includes("f3af910400"),
      "Every lead uses a clean destination without recipient-specific tracking or committed contact data."
    ),
    check(
      "betanyc-public-safe-fingerprint",
      betaReport.edition.publicSafeFingerprint === sha256(betaPublicProjection(betaReport)),
      "The retained public-safe title and destination projection matches its recorded fingerprint."
    ),
    check(
      "betanyc-strong-admission-threshold",
      betaPromoted.length > 0 &&
        betaPromoted.every(
          (lead) =>
            lead.fitScore >= betaReport.threshold.fit &&
            lead.securabilityScore >= betaReport.threshold.securability &&
            lead.combinedScore >= betaReport.threshold.combined
        ),
      "Every promoted newsletter lead clears the fit, securability, and combined strong-match thresholds."
    ),
    check(
      "betanyc-cross-source-deduplication",
      betaExisting.length === betaReport.enrichedExistingCount &&
        betaExisting.every((lead) => nycAdmissions.has(lead.opportunityId)) &&
        new Set(betaPromoted.map((lead) => lead.opportunityId)).size === betaPromoted.length,
      "Existing NYC Jobs admissions receive BetaNYC provenance without duplicate opportunity nodes."
    ),
    check(
      "betanyc-new-opportunity-closure",
      betaNew.length === 1 &&
        betaReport.newOpportunityCount === 1 &&
        polimorphicOpportunity.includes(`id: ${betaNew[0]?.opportunityId}`) &&
        polimorphicOpportunity.includes("opportunity_status: live") &&
        polimorphicOpportunity.includes("human_review: requested") &&
        polimorphicOpportunity.includes("application_materials_gate: required-before-application-material-generation") &&
        betaEvaluation.includes(`target: ${betaNew[0]?.opportunityId}`),
      "The one new strong-match lead has a review-gated governed opportunity record and evaluation relationship."
    ),
    check(
      "betanyc-count-closure",
      betaReport.leadCount === betaReport.leads.length &&
        betaReport.promotedCount === betaPromoted.length &&
        betaReport.enrichedExistingCount === betaExisting.length &&
        betaReport.newOpportunityCount === betaNew.length,
      "Edition lead, promotion, enrichment, and new-opportunity counts match the normalized records."
    ),
    check(
      "betanyc-reader-profiles",
      betaReaders.length === 2 &&
        betaReaders.every(
          (packet) =>
            packet.opportunityId === "opportunity.polimorphic.product-manager.123173" &&
            packet.readerId &&
            packet.readerPath &&
            read(root, packet.readerPath)?.includes("fictionalized analytical lens")
        ),
      "Two named public-context reader profiles are available for the newly admitted role."
    ),
    check(
      "betanyc-external-action-boundary",
      betaConfig.externalActionBoundary.includes("Jamie alone") &&
        betaSource.includes("Jamie alone decides") &&
        betaRubric.requiredInvariants.includes("No application is submitted automatically."),
      "Discovery, scoring, and review do not submit an application or claim a hiring outcome."
    )
  ];
  const betaCostControlPass =
    betaReport.modeledReaderQueueCount === betaReaders.length &&
    betaReaders.every((packet) => betaNew.some((lead) => lead.opportunityId === packet.opportunityId));
  const betaCostCheck = check(
    "betanyc-modeled-reader-cost-control",
    betaCostControlPass,
    "Only the new deterministic strong-match opportunity is queued, once per named public-context reader."
  );
  const betaChecks = [...betaBaseChecks, betaCostCheck];
  const betaDeterministicPass = betaChecks.every((item) => item.pass);
  const betaQueue = betaDeterministicPass ? betaReaders : [];
  const civicDeterministicPass = [...sourceRegistryChecks, ...civicChecks].every((item) => item.pass);
  const civicQueue = civicDeterministicPass ? [...helperPackets, ...selectedReaderPackets] : [];
  const allChecks = [...checks, ...sourceRegistryChecks, ...civicChecks, ...betaChecks];
  return {
    schemaVersion: 1,
    overall: allChecks.every((item) => item.pass) ? "pass" : "fail",
    datasetId: config.datasetId,
    datasetRowsUpdatedAt: report.datasetRowsUpdatedAt,
    admittedCount: report.admittedCount,
    actionableCount: report.actionableCount,
    checks: allChecks,
    sourceRegistry,
    civicMatch: {
      sourceId: civicConfig.sourceId,
      guidePath: civicConfig.guidePath,
      selectedTier: publicSelection.selectedTier,
      selectedOpportunityIds: publicSelection.selectedOpportunityIds,
      selectedResumePath: publicSelection.selectedResumePath,
      deterministicPass: civicDeterministicPass,
      checks: civicChecks,
      contentMetrics: {
        privateGovernmentImpactWords: essayOne ? words(essayOne) : null,
        privateCommunityInitiativeWords: essayTwo ? words(essayTwo) : null,
        employerVisibleProfileSummaryWords: profileSummary ? words(profileSummary) : null
      },
      llmGate: {
        allowed: civicDeterministicPass,
        status: civicRubric.execution.status,
        queue: civicQueue,
        queuedCalls: civicQueue.length,
        reason: civicDeterministicPass
          ? "Deterministic form, privacy, voice, opportunity-selection, and audience gates pass; isolated modeled-reader work may run."
          : "Modeled-reader work is blocked until every deterministic gate passes."
      }
    },
    betaNyc: {
      sourceId: betaConfig.sourceId,
      latestEditionDate: betaReport.edition.publishedAt,
      latestPublicArchiveEditionDate: betaReport.edition.latestPublicArchiveEditionDate,
      promotedOpportunityIds: betaPromoted.map((lead) => lead.opportunityId),
      newOpportunityIds: betaNew.map((lead) => lead.opportunityId),
      enrichedExistingOpportunityIds: betaExisting.map((lead) => lead.opportunityId),
      deterministicPass: betaDeterministicPass,
      checks: betaChecks,
      llmGate: {
        allowed: betaDeterministicPass,
        status: betaRubric.execution.status,
        queue: betaQueue,
        queuedCalls: betaQueue.length,
        reason: betaDeterministicPass
          ? "Freshness, public-safety, official-destination, eligibility, threshold, deduplication, and intake gates pass; two isolated reader tasks may run for the new opportunity."
          : "Modeled-reader work is blocked until every deterministic BetaNYC gate passes."
      }
    },
    boundary: "Deterministic admission and synthetic review can prioritize action; neither establishes actual eligibility, interview, offer, or hire."
  };
}

function main() {
  const result = evaluateOpportunitySystem();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
