#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

import { proofClaims } from "../apps/www/src/data/proofs.ts";

const suitePath = ".agents/evals/knowledge-bank-development.json";
const frozenCollectiveBaselinePath =
  ".agents/evals/baselines/collective-credit-v1.json";
const workDataPath = "apps/www/src/data/work.ts";
export const FROZEN_COLLECTIVE_BASELINE_TAG =
  "refs/tags/knowledge-bank-policy-baseline-2026-07-15-v7";
export const FROZEN_COLLECTIVE_BASELINE_TAG_OBJECT =
  "32b6cb38ae88c1b48db3a60f514023405644e7aa";
const privateMarker = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw[-_ ](?:transcript|export)|\.mbox|credential|password/i;
const publicProjectionKeys = new Set([
  "case-study",
  "work-card",
  "resume-html",
  "technical-operations",
  "homepage"
]);
const collectiveCreditPolicy = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/collective-credit-policy.json",
    "utf8"
  )
);
const projectionSurfaceBindings = JSON.parse(
  readFileSync(
    "docs/knowledge-bank/policies/projection-surface-bindings.json",
    "utf8"
  )
);
const frozenCollectiveCreditBaseline = JSON.parse(
  readFileSync(frozenCollectiveBaselinePath, "utf8")
);
const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));
const collectiveProjectEntries = collectiveCreditPolicy.collectiveProjects;
const individualProjectEntries = collectiveCreditPolicy.individualProjects;
const collectiveProjects = new Set(collectiveProjectEntries);
const individualProjects = new Set(individualProjectEntries);
const mixedProjects = new Map(
  Object.entries(collectiveCreditPolicy.mixedProjects)
);
const unassertedIndividualClaims = new Map(
  Object.entries(collectiveCreditPolicy.unassertedIndividualClaims)
);
const knownRouteProjectionSurfaces = new Set(
  Object.keys(projectionSurfaceBindings.routes)
);
const requiredPublicSurfaceRoots = new Map([
  [
    "apps/www/src/app",
    [
      ".avif",
      ".ico",
      ".jpeg",
      ".jpg",
      ".js",
      ".jsx",
      ".md",
      ".mdx",
      ".png",
      ".svg",
      ".ts",
      ".tsx",
      ".webp"
    ]
  ],
  [
    "apps/www/src/pages",
    [".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"]
  ],
  [
    "apps/www/pages",
    [".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"]
  ],
  ["apps/www/src/components", [".js", ".jsx", ".ts", ".tsx"]],
  ["apps/www/src/content", [".md", ".mdx"]],
  [
    "apps/www/public",
    [
      ".avif",
      ".html",
      ".htm",
      ".ico",
      ".jpeg",
      ".jpg",
      ".json",
      ".md",
      ".mdx",
      ".pdf",
      ".png",
      ".svg",
      ".txt",
      ".webp",
      ".xml"
    ]
  ]
]);
const requiredPublicSurfaceFiles = new Set([
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "apps/www/src/app/globals.css",
  "apps/www/src/styles/phi-grid.css",
  "apps/www/src/styles/tokens.css",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/knowledge-bank/public.ts",
  "apps/www/src/data/knowledge-bank/schema.ts",
  "apps/www/src/data/site.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/lib/metadata.ts",
  "apps/www/src/lib/site-url.ts",
  "apps/www/src/lib/work.ts",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.html",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt",
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
]);
const requiredCaseStudySharedFiles = new Set([
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/components/CaseStudyBlocks.tsx",
  "apps/www/src/components/CaseStudyLayout.tsx",
  "apps/www/src/data/work.ts"
]);
const requiredCollectiveRuntimeFiles = new Set([
  "apps/www/mdx-components.tsx",
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/resume/page.tsx",
  "apps/www/src/app/work/[slug]/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/components/CaseStudyBlocks.tsx",
  "apps/www/src/components/CaseStudyLayout.tsx",
  "apps/www/src/components/ProofStrip.tsx",
  "apps/www/src/components/WorkCard.tsx",
  "apps/www/src/components/citations/Claim.tsx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/kc-town-hall.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/knowledge-bank/public.ts",
  "apps/www/src/lib/work.ts",
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.html",
  "docs/knowledge-bank/public-artifacts/resume-technical-project-manager-2026-07-15.txt"
]);
const requiredResumeStatementIds = new Set([
  "profile-operating-structure",
  "capability-product-operations",
  "capability-knowledge-systems",
  "capability-web-open-data",
  "impact-hje-growth",
  "impact-callnyc-guidance",
  "impact-crs-memory",
  "impact-nycac-public-systems",
  "impact-wowlist-platform",
  "impact-sunday-dinner-participation",
  "experience-thick-arts-role",
  "experience-thick-arts-services",
  "experience-thick-arts-translation",
  "experience-thick-arts-hje",
  "experience-nycac-role",
  "experience-nycac-infrastructure",
  "experience-nycac-coordination",
  "experience-nycac-policy-translation",
  "experience-nycac-public-data",
  "experience-wowlist-role",
  "experience-wowlist-platform",
  "experience-sunday-dinner-role",
  "experience-sunday-dinner-practice",
  "experience-kc-town-hall-role",
  "experience-kc-town-hall-council-sequence",
  "education-ai-evals",
  "education-ucsc",
  "additional-work-authorization"
]);
const requiredPublicStatementIds = new Set([
  "hero-operating-structure",
  "hero-stakeholder-handoffs",
  "hero-artifact-summary",
  "capability-technical-project-management",
  "capability-product-operations",
  "capability-knowledge-systems",
  "capability-civic-technology",
  "capability-web-systems",
  "capability-community-systems",
  "home-technical-operations-note",
  "home-hje-note",
  "home-fair-rent-note",
  "home-callnyc-note",
  "home-selected-systems-pattern",
  "home-operating-motif",
  "home-how-i-work",
  "about-role",
  "about-contexts",
  "about-practice",
  "about-focus",
  "about-values",
  "work-recurring-pattern",
  "work-lab-method",
  "work-lab-boundary",
  "resume-page-operating-structure",
  "technical-operations-intro",
  "technical-operations-requirements",
  "technical-operations-risks",
  "technical-operations-dependencies",
  "technical-operations-records",
  "technical-operations-reporting",
  "technical-operations-hje-action",
  "technical-operations-hje-result",
  "technical-operations-fair-rent-action",
  "technical-operations-fair-rent-result",
  "technical-operations-callnyc-action",
  "technical-operations-callnyc-result",
  "technical-operations-sunday-dinner-action",
  "technical-operations-sunday-dinner-result"
]);
const hybridCandidatePaths = [
  ".agents/evals/knowledge-bank-development.json",
  "apps/www/src/content/work",
  "apps/www/src/pages",
  "apps/www/pages",
  "apps/www/src/data/knowledge-bank",
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/lib",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts",
  "apps/www/public/resume",
  ".agents/evals/baselines/collective-credit-v1.json",
  "docs/knowledge-bank",
  "scripts/check-knowledge-development.mjs",
  "scripts/generate-resume-pdf.mjs",
  "scripts/lib/citation-validation.mjs",
  "scripts/tests/citations.test.mjs",
  "scripts/tests/knowledge-development.test.mjs"
];

export function validateHybridReportCandidate(report) {
  const errors = [];
  if (!/^[0-9a-f]{40}$/.test(report?.candidate_sha ?? "")) {
    return ["hybrid report requires a full candidate_sha"];
  }

  try {
    execFileSync("git", ["cat-file", "-e", `${report.candidate_sha}^{commit}`], {
      stdio: "ignore"
    });
  } catch {
    return [`hybrid report candidate ${report.candidate_sha} is not a local commit`];
  }

  try {
    execFileSync("git", ["diff", "--quiet", report.candidate_sha, "--", ...hybridCandidatePaths], {
      stdio: "ignore"
    });
  } catch {
    errors.push(
      `hybrid report candidate ${report.candidate_sha} does not match the current knowledge-bank inputs`
    );
  }
  return errors;
}

export function validateKnowledgeDevelopmentSuite(suite) {
  const errors = [];
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message);
  };

  requireValue(suite?.version === 1, "suite.version must be 1");
  requireValue(
    suite?.suite_id === "knowledge-bank-development",
    "suite.suite_id must be knowledge-bank-development"
  );
  requireValue(Array.isArray(suite?.hard_constraints) && suite.hard_constraints.length > 0, "suite requires hard constraints");
  requireValue(Array.isArray(suite?.evals) && suite.evals.length > 0, "suite requires evals");
  requireValue(suite?.optimization?.rubric_is_frozen_during_run === true, "the rubric must be frozen during a run");
  requireValue(suite?.optimization?.optimizer_may_not_grade_own_patch === true, "the optimizer may not grade its own patch");
  requireValue(suite?.optimization?.nothing_is_silently_discarded === true, "the suite must prohibit silent discard");
  requireValue(suite?.thresholds?.two_consecutive_passing_runs_required === true, "two consecutive passing runs are required");

  let totalWeight = 0;
  const ids = new Set();
  for (const [index, entry] of (suite?.evals ?? []).entries()) {
    const prefix = `suite.evals[${index}]`;
    requireValue(/^KB-\d{3}$/.test(entry.id ?? ""), `${prefix}.id must use KB-###`);
    requireValue(!ids.has(entry.id), `${prefix}.id must be unique`);
    ids.add(entry.id);
    requireValue(typeof entry.blocking === "boolean", `${prefix}.blocking must be boolean`);
    requireValue(Number.isInteger(entry.weight) && entry.weight > 0, `${prefix}.weight must be positive`);
    requireValue(Array.isArray(entry.procedure) && entry.procedure.length > 0, `${prefix}.procedure is required`);
    requireValue(Array.isArray(entry.pass_criteria) && entry.pass_criteria.length > 0, `${prefix}.pass_criteria is required`);
    requireValue(typeof entry.remediation_hint === "string" && entry.remediation_hint.length > 0, `${prefix}.remediation_hint is required`);
    totalWeight += Number.isInteger(entry.weight) ? entry.weight : 0;
  }
  requireValue(totalWeight === 100, `eval weights must total 100; received ${totalWeight}`);
  return { errors, totalWeight, evalCount: suite?.evals?.length ?? 0 };
}

function normalizedText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function decodedHtmlText(value) {
  return value
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function decodedElementText(value) {
  return normalizedText(decodedHtmlText(value));
}

function elementTexts(content, pattern) {
  return [...content.matchAll(pattern)]
    .map((match) => decodedElementText(match[0]))
    .filter(Boolean);
}

export function resumeSubstantiveStatements(source) {
  const statements = [];
  const sections = [
    ...source.matchAll(/<section\s+class="section"[^>]*>([\s\S]*?)<\/section>/g)
  ];
  for (const section of sections) {
    const body = section[1];
    const heading = decodedElementText(body.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/)?.[0] ?? "");
    if (heading === "Profile") {
      statements.push(...elementTexts(body, /<p\b[^>]*>[\s\S]*?<\/p>/g));
    } else if (heading === "Core Capabilities") {
      statements.push(
        ...elementTexts(
          body,
          /<div\s+class="capability"[^>]*>[\s\S]*?<\/div>/g
        )
      );
    } else if (heading === "Selected Impact") {
      statements.push(...elementTexts(body, /<li\b[^>]*>[\s\S]*?<\/li>/g));
    } else if (heading === "Experience") {
      statements.push(
        ...elementTexts(
          body,
          /<h3\b[^>]*>[\s\S]*?<\/h3>|<li\b[^>]*>[\s\S]*?<\/li>/g
        )
      );
    } else if (
      heading === "Education & Professional Development" ||
      heading === "Additional"
    ) {
      statements.push(...elementTexts(body, /<p\b[^>]*>[\s\S]*?<\/p>/g));
    }
  }
  return statements;
}

const resumeAtomicBlockTags = new Set(["h1", "h2", "h3", "p", "li", "span"]);
const resumeContainerBlockTags = new Set([
  "address",
  "article",
  "aside",
  "div",
  "footer",
  "header",
  "main",
  "nav",
  "ol",
  "section",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul"
]);
const htmlVoidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);

function literalClassTokens(tag) {
  const attribute = tag.match(
    /\bclass(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\s*"([^"]*)"\s*\}|\{\s*'([^']*)'\s*\}|([^\s>]+))/i
  );
  if (!attribute) return { present: false, known: true, tokens: [] };
  const value = attribute.slice(1).find((candidate) => candidate !== undefined);
  const known = Boolean(value) && !/[{}$`]/.test(value);
  return {
    present: true,
    known,
    tokens: known ? value.split(/\s+/).filter(Boolean) : []
  };
}

function classTokenIsNonRendering(token) {
  return /(?:^|:|!)(?:hidden|invisible|collapse|sr-only|opacity-(?:0|\[0\])|scale-(?:0|\[0\]))$|\[(?:display\s*:\s*none|visibility\s*:\s*(?:hidden|collapse)|opacity\s*:\s*0)\]/i.test(
    token
  );
}

function styleTextIsNonRendering(style) {
  return (
    /\bdisplay\s*:\s*none\b/i.test(style) ||
    /\bvisibility\s*:\s*(?:hidden|collapse)\b/i.test(style) ||
    /\bcontent-visibility\s*:\s*hidden\b/i.test(style) ||
    /\bopacity\s*:\s*0(?:\.0+)?(?:\s*[;}]|\s*$)/i.test(style) ||
    /\bfont-size\s*:\s*0(?:px|rem|em|%)?(?:\s*[;}]|\s*$)/i.test(style) ||
    /\btransform\s*:[^;}]*(?:scale\(\s*0\s*\)|scale3d\(\s*0\s*,\s*0\s*,)/i.test(style) ||
    /\bclip-path\s*:\s*inset\(\s*(?:50|100)%/i.test(style) ||
    (/\bwidth\s*:\s*0(?:px)?\b/i.test(style) &&
      /\bheight\s*:\s*0(?:px)?\b/i.test(style) &&
      /\boverflow\s*:\s*hidden\b/i.test(style))
  );
}

function nonRenderingCssClasses(source) {
  const classes = new Set();
  const css = [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join("\n");
  for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!styleTextIsNonRendering(rule[2])) continue;
    for (const selector of rule[1].matchAll(/\.([A-Za-z_-][\w-]*)/g)) {
      classes.add(selector[1]);
    }
  }
  return classes;
}

function tagIsNonRendering(tagName, tag, cssClasses = new Set()) {
  if (["head", "script", "style", "template"].includes(tagName)) return true;
  if (tagName === "dialog" && !/\sopen(?:\s|=|>)/i.test(tag)) return true;
  if (/\spopover(?:\s|=|>)/i.test(tag)) return true;
  if (/\s(?:hidden|inert)(?:\s|=|>)/i.test(tag)) return true;
  if (
    /aria-hidden\s*=/i.test(tag) &&
    !/aria-hidden\s*=\s*(?:\{\s*false\s*\}|["']false["'])/i.test(tag)
  ) {
    return true;
  }
  const style = tag.match(
    /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|\{\{([\s\S]*?)\}\})/i
  );
  if (style && styleTextIsNonRendering(style[1] ?? style[2] ?? style[3] ?? "")) {
    return true;
  }
  if (/\sdisplay\s*=\s*["']none["']/i.test(tag)) return true;
  if (/\svisibility\s*=\s*["'](?:hidden|collapse)["']/i.test(tag)) return true;
  const classes = literalClassTokens(tag);
  if (classes.present && !classes.known) return true;
  return classes.tokens.some(
    (token) => classTokenIsNonRendering(token) || cssClasses.has(token)
  );
}

function parsedHtmlTree(source) {
  const root = { tag: "#root", children: [] };
  const stack = [root];
  const tokens = source.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[A-Za-z][^>]*>|[^<]+/g) ?? [];

  for (const token of tokens) {
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;
    if (token.startsWith("</")) {
      const tag = token.match(/^<\/\s*([A-Za-z0-9-]+)/)?.[1]?.toLowerCase();
      if (!tag) continue;
      while (stack.length > 1) {
        const node = stack.pop();
        if (node.tag === tag) break;
      }
      continue;
    }
    if (token.startsWith("<")) {
      const tag = token.match(/^<\s*([A-Za-z0-9-]+)/)?.[1]?.toLowerCase();
      if (!tag) continue;
      const node = { tag, rawTag: token, children: [] };
      stack.at(-1).children.push(node);
      if (!token.endsWith("/>") && !htmlVoidTags.has(tag)) stack.push(node);
      continue;
    }
    stack.at(-1).children.push({ tag: "#text", text: token, children: [] });
  }
  return root;
}

function htmlNodeText(node) {
  if (node.tag === "#text") return node.text;
  return node.children.map(htmlNodeText).join(" ");
}

function htmlNodeVisibleText(node, cssClasses, hidden = false) {
  if (node.tag === "#text") return hidden ? "" : node.text;
  const isHidden =
    hidden || tagIsNonRendering(node.tag, node.rawTag ?? "", cssClasses);
  if (isHidden) return "";
  if (
    node.tag === "details" &&
    !/\sopen(?:\s|=|>)/i.test(node.rawTag ?? "")
  ) {
    return node.children
      .filter((child) => child.tag === "summary")
      .map((child) => htmlNodeVisibleText(child, cssClasses, false))
      .join(" ");
  }
  return node.children
    .map((child) => htmlNodeVisibleText(child, cssClasses, isHidden))
    .join(" ");
}

export function resumeVisibleBlocks(source) {
  const tree = parsedHtmlTree(source);
  const cssClasses = nonRenderingCssClasses(source);
  const blocks = [];

  function visit(node, hidden = false) {
    const isHidden =
      hidden || tagIsNonRendering(node.tag, node.rawTag ?? "", cssClasses);
    if (isHidden) return;
    if (
      node.tag === "details" &&
      !/\sopen(?:\s|=|>)/i.test(node.rawTag ?? "")
    ) {
      for (const child of node.children) {
        if (child.tag === "summary") visit(child, false);
      }
      return;
    }
    if (node.tag === "#text") {
      const text = decodedElementText(node.text);
      if (text) blocks.push(text);
      return;
    }
    if (resumeAtomicBlockTags.has(node.tag)) {
      const text = decodedElementText(
        htmlNodeVisibleText(node, cssClasses, hidden)
      );
      if (text) blocks.push(text);
      return;
    }
    if (node.tag === "div") {
      const hasBlockChild = node.children.some(
        (child) =>
          resumeAtomicBlockTags.has(child.tag) ||
          resumeContainerBlockTags.has(child.tag)
      );
      if (!hasBlockChild) {
        const text = decodedElementText(
          htmlNodeVisibleText(node, cssClasses, hidden)
        );
        if (text) blocks.push(text);
        return;
      }
    }
    for (const child of node.children) visit(child, isHidden);
  }

  visit(tree);
  return blocks;
}

export function resumeCssGeneratedText(source) {
  return [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .flatMap((style) =>
      [...style[1].matchAll(/\bcontent\s*:\s*(["'])([\s\S]*?)\1/gi)]
        .map((match) => normalizedText(match[2]))
        .filter(Boolean)
    );
}

export function resumeVisibleAttributeText(source) {
  const body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? source;
  const tree = parsedHtmlTree(body);
  const cssClasses = nonRenderingCssClasses(source);
  const values = [];
  function visit(node, hidden = false) {
    if (node.tag === "#text") return;
    const isHidden =
      hidden || tagIsNonRendering(node.tag, node.rawTag ?? "", cssClasses);
    if (
      !isHidden &&
      node.tag === "details" &&
      !/\sopen(?:\s|=|>)/i.test(node.rawTag ?? "")
    ) {
      for (const child of node.children) {
        if (child.tag === "summary") visit(child, false);
      }
      return;
    }
    if (!isHidden && node.rawTag) {
      values.push(
        ...[...node.rawTag.matchAll(/\b(?:alt|alttext|aria-braillelabel|aria-description|aria-label|aria-roledescription|aria-valuetext|data|label|srcdoc|title|placeholder|value)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)]
          .map((match) => decodedElementText(match[1] ?? match[2] ?? match[3]))
          .filter(Boolean)
      );
    }
    for (const child of node.children) visit(child, isHidden);
  }
  visit(tree);
  return values;
}

export function resumeMetadataText(source) {
  const values = [];
  const title = source.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) values.push(decodedElementText(title));
  for (const tag of source.matchAll(/<meta\b[^>]*>/gi)) {
    const name = tag[0].match(
      /\b(?:name|property)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
    );
    const key = (name?.[1] ?? name?.[2] ?? name?.[3] ?? "").toLowerCase();
    if (![
      "description",
      "keywords",
      "author",
      "application-name",
      "og:description",
      "og:title",
      "og:site_name",
      "twitter:description",
      "twitter:title",
      "twitter:site"
    ].includes(key)) continue;
    const content = tag[0].match(
      /\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i
    );
    const value = decodedElementText(
      content?.[1] ?? content?.[2] ?? content?.[3] ?? ""
    );
    if (value) values.push(value);
  }
  for (const script of source.matchAll(
    /<script\b[^>]*\btype\s*=\s*(?:"application\/(?:ld\+json|json)"|'application\/(?:ld\+json|json)')[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    const raw = script[1].trim();
    if (!raw) continue;
    try {
      const data = JSON.parse(raw);
      const collect = (value) => {
        if (typeof value === "string") {
          const text = decodedElementText(value);
          if (text) values.push(text);
        } else if (Array.isArray(value)) {
          value.forEach(collect);
        } else if (value && typeof value === "object") {
          Object.values(value).forEach(collect);
        }
      };
      collect(data);
    } catch {
      const text = decodedElementText(raw);
      if (text) values.push(text);
    }
  }
  return values;
}

export function resumeCssPublicTextRisks(source) {
  const css = [...source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1])
    .join("\n");
  const risks = [];
  for (const match of css.matchAll(/(?:^|[;{])\s*content\s*:\s*([^;}]+)/gim)) {
    if (!/^\s*(?:none|normal)\s*$/i.test(match[1])) {
      risks.push(`content: ${normalizedText(match[1])}`);
    }
  }
  if (/\burl\s*\(/i.test(css)) risks.push("CSS url() content");
  if (/\bimage-set\s*\(/i.test(css)) risks.push("CSS image-set() content");
  if (/\\/.test(css)) risks.push("CSS escaped declaration");
  if (
    /(?:^|[;{])\s*(?:additive-symbols|list-style(?:-type)?|quotes|symbols|prefix|suffix)\s*:\s*(?!none\b|normal\b)[^;}]+/gim.test(
      css
    )
  ) {
    risks.push("CSS list or counter text");
  }
  return risks;
}

export function resumeEmbeddedContentRisks(source) {
  const risks = [];
  for (const tag of source.matchAll(/<(iframe|object|embed)\b[^>]*>/gi)) {
    risks.push(`${tag[1].toLowerCase()} embedded content`);
  }
  for (const tag of source.matchAll(/<[A-Za-z][^>]*>/g)) {
    const decodedTag = tag[0]
      .replace(/&#x([0-9a-f]+);?/gi, (_, value) =>
        String.fromCodePoint(Number.parseInt(value, 16))
      )
      .replace(/&#([0-9]+);?/g, (_, value) =>
        String.fromCodePoint(Number.parseInt(value, 10))
      )
      .replace(/&colon;/gi, ":")
      .replace(/&amp;/gi, "&");
    if (
      /\b(?:data|href|poster|src|srcset|style|xlink:href)\s*=\s*(?:["'][^"']*(?:data:|image-set\s*\()[^"']*["']|[^\s>]*(?:data:|image-set\s*\()[^\s>]*)/i.test(
        decodedTag
      )
    ) {
      risks.push("inline embedded data content");
    }
    if (
      /\bstyle\s*=\s*(?:["'][^"']*(?:content\s*:|list-style|quotes\s*:|symbols\s*:)[^"']*["']|[^\s>]*(?:content\s*:|list-style|quotes\s*:|symbols\s*:)[^\s>]*)/i.test(
        decodedTag
      )
    ) risks.push("inline style text channel");
  }
  return [...new Set(risks)];
}

function normalizedIncludes(haystack, needle) {
  return normalizedText(haystack)
    .toLowerCase()
    .includes(normalizedText(needle).toLowerCase());
}

const semanticStopwords = new Set(
  "a an and are as at be became been being but by can did do does for from had has have he her here his how i in into is it its jamie more not of on or our project role so than that the their them there these they this through to together under us was we were what when where which while who why will with work working"
    .split(" ")
);

function semanticStem(token) {
  if (token.length > 5 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 6 && token.endsWith("ing")) return token.slice(0, -3);
  if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

function semanticTokens(value) {
  return new Set(
    (String(value).toLowerCase().match(/[a-z0-9]+/g) ?? [])
      .map(semanticStem)
      .filter((token) => token.length > 2 && !semanticStopwords.has(token))
  );
}

function proofSemanticBasis(proof) {
  return JSON.stringify({
    publicWording: proof.publicWording,
    shortWording: proof.shortWording,
    detailedPublicWording: proof.detailedPublicWording,
    sourceBasis: proof.sourceBasis,
    sourceNote: proof.sourceNote,
    whyItMatters: proof.whyItMatters,
    guardrail: proof.guardrail,
    protectedBoundaries: proof.protectedBoundaries,
    evidenceClass: proof.evidenceClass,
    relatedProjects: proof.relatedProjects,
    relatedCapabilities: proof.relatedCapabilities
  });
}

function statementSemanticCoverage(statement, basis) {
  const statementTokens = [...semanticTokens(statement)];
  const proofTokens = semanticTokens(basis);
  const matched = statementTokens.filter((token) => proofTokens.has(token));
  return {
    score: statementTokens.length === 0 ? 1 : matched.length / statementTokens.length,
    matched,
    statementTokens
  };
}

export function statementProofSemanticCoverage(statement, proofInput) {
  const proofs = Array.isArray(proofInput) ? proofInput : [proofInput];
  return statementSemanticCoverage(
    statement,
    proofs.map(proofSemanticBasis).join(" ")
  );
}

function claimSemanticBasis(claim) {
  return JSON.stringify({
    internalClaim: claim.internalClaim,
    projections: claim.projections
      .filter((projection) => projection.status === "active")
      .map((projection) => projection.text),
    evidence: claim.evidence.map((item) => ({
      supports: item.supports,
      publicNote: item.publicNote
    }))
  });
}

export function governedStatementSemanticCoverage(statement, bank) {
  const claims = (statement.claims ?? [])
    .map((support) => bank.claims.find((claim) => claim.id === support.id))
    .filter(Boolean);
  const proofs = (statement.proofs ?? [])
    .map((support) => proofById.get(support.id))
    .filter(Boolean);
  return statementSemanticCoverage(statement.text, [
    ...claims.map(claimSemanticBasis),
    ...proofs.map(proofSemanticBasis)
  ].join(" "));
}

export function governedStatementUnsupportedClauses(statement, bank) {
  const claims = (statement.claims ?? [])
    .map((support) => bank.claims.find((claim) => claim.id === support.id))
    .filter(Boolean);
  const proofs = (statement.proofs ?? [])
    .map((support) => proofById.get(support.id))
    .filter(Boolean);
  const basis = [
    ...claims.map(claimSemanticBasis),
    ...proofs.map(proofSemanticBasis)
  ].join(" ");
  return unsupportedSemanticClauses(statement.text, basis);
}

function unsupportedSemanticClauses(statement, basis) {
  return statement
    .split(/[.;]|\s+\b(?:and|but|while)\b\s+|,\s+(?=(?:and|but)\b)/i)
    .map((clause) => ({
      clause: normalizedText(clause),
      coverage: statementSemanticCoverage(clause, basis)
    }))
    .filter(
      ({ coverage }) =>
        coverage.statementTokens.length >= 2 && coverage.score < 0.2
    );
}

const semanticRiskFamilies = new Map([
  ["sole-credit", /\b(?:alone|sole|solely|sole responsibility|single[ -]?handedly|exclusively|exclusive credit|final authority|ultimate authority|lone (?:architect|author|builder|creator|designer|founder|leader|operator|organizer)|independently\s+(?:founded|created|built|established|directed|led|managed|operated|owned|delivered|completed|ran)|only founder|no one else|no (?:collaborator|co-creator|partner|other person) (?:contributed|participated|helped|was involved)|without (?:co-creators|collaborators|others|contributions from (?:partners|collaborators|others))|by (?:himself|herself|themselves)|on (?:his|her|their) own)\b/i],
  ["total-ownership", /\b(?:owned|ownership|fully owned|complete control|unilateral control|exclusive control|final authority|ultimate authority|made all (?:decisions|calls)|end[ -]?to[ -]?end responsibility|responsible for (?:the )?(?:whole|entire|all))\b/i],
  ["causal-certainty", /\b(?:brought about|caused|guaranteed|ensured|drove|decisive reason|decisive cause|made [^.?!;]{0,80} happen|responsible for (?:the )?(?:whole|entire|all)|single[ -]?handedly delivered|outcome (?:followed|resulted|came) directly from|directly resulted from|as a direct result of [^.?!;]{0,80}(?:intervention|work|action))\b/i],
  ["official-status", /\b(?:official|officially|certified|endorsed)\b/i],
  ["current-status", /\b(?:current|currently|live|ongoing|remains? operational|still operating|operational today)\b/i],
  ["completeness", /\b(?:all|every|entire|complete|completely|full corpus|100\s*%)\b/i]
]);

function riskFamilies(value) {
  return new Set(
    [...semanticRiskFamilies]
      .filter(([family, pattern]) => {
        const match = String(value).match(pattern);
        if (!match || match.index === undefined) return false;
        const prefix = String(value).slice(0, match.index).split(/[.!?;]/).at(-1);
        const localNegation = /\b(?:avoid|avoids|avoided|does\s+not|do\s+not|not|never|omit|omits|omitted)(?:\W+\w+){0,3}\W*$|\bno\s*$/i.test(prefix);
        const broadBoundaryNegation =
          family !== "sole-credit" &&
          /\b(?:avoid|avoids|avoided|does\s+not|do\s+not|no|not|never|omit|omits|omitted|without)\b/i.test(prefix);
        return !localNegation && !broadBoundaryNegation;
      })
      .map(([family]) => family)
  );
}

export function proofSemanticBoundaryFindings(statement, proof) {
  const findings = [];
  const statementFamilies = riskFamilies(statement);
  const statementTokens = semanticTokens(statement);
  for (const prohibited of proof.doNotSay ?? []) {
    const sharedRisk = [...riskFamilies(prohibited)].filter((family) =>
      statementFamilies.has(family)
    );
    if (sharedRisk.length === 0) continue;
    const prohibitedTokens = [...semanticTokens(prohibited)];
    const matched = prohibitedTokens.filter((token) => statementTokens.has(token));
    const attributionRisk = sharedRisk.some((family) =>
      ["sole-credit", "total-ownership", "causal-certainty"].includes(family)
    );
    if (matched.length >= 1 || attributionRisk) {
      findings.push(
        `semantic boundary ${sharedRisk.join("/")} overlaps prohibited wording: ${prohibited}`
      );
    }
  }
  return findings;
}

function repeatsProhibitedWording(statement, prohibited) {
  if (!normalizedIncludes(statement, prohibited)) return false;
  const prohibitedRisks = riskFamilies(prohibited);
  if (prohibitedRisks.size === 0) return true;
  const statementRisks = riskFamilies(statement);
  return [...prohibitedRisks].some((risk) => statementRisks.has(risk));
}

function proofSurfaceForRoute(surface) {
  if (surface === "/resume") return "resume";
  if (surface === "/work/technical-operations") return "technical-operations";
  if (surface === "/work") return "work-card";
  if (surface.startsWith("/work/")) return "case-study";
  return null;
}

function governedStatementFindings(statement, bank, source, label) {
  const findings = [];
  const claims = statement.claims ?? [];
  const proofs = statement.proofs ?? [];
  if (!statement.id || !statement.text || !statement.surface) {
    return [`${label} is missing an ID, text, or surface`];
  }
  if (!normalizedIncludes(source, statement.text)) {
    findings.push(`${label} is absent from ${statement.path ?? statement.surface}`);
  }
  if (claims.length + proofs.length === 0) {
    findings.push(`${label} has no claim or proof identity`);
  } else {
    const coverage = governedStatementSemanticCoverage(statement, bank);
    if (coverage.statementTokens.length > 0 && coverage.score < 0.3) {
      findings.push(
        `${label} has insufficient proposition-level support (${coverage.matched.length}/${coverage.statementTokens.length} substantive tokens)`
      );
    }
    for (const unsupported of governedStatementUnsupportedClauses(statement, bank)) {
      findings.push(
        `${label} contains an unsupported clause (${unsupported.coverage.matched.length}/${unsupported.coverage.statementTokens.length} substantive tokens): ${unsupported.clause}`
      );
    }
  }

  for (const support of claims) {
    const claim = bank.claims.find((item) => item.id === support.id);
    if (!claim) {
      findings.push(`${label} references missing claim ${support.id}`);
      continue;
    }
    if (claim.projectionEligibility !== "eligible") {
      findings.push(`${label} references held claim ${support.id}`);
    }
    if (
      !claim.projections.some(
        (projection) =>
          projection.status === "active" &&
          projection.surfaces.includes(statement.surface)
      )
    ) {
      findings.push(
        `${label} claim ${support.id} has no active projection on ${statement.surface}`
      );
    }
    if (
      !support.anchor ||
      !normalizedIncludes(statement.text, support.anchor) ||
      !normalizedIncludes(JSON.stringify(claim), support.anchor)
    ) {
      findings.push(`${label} claim ${support.id} lacks shared semantic anchor`);
    }
  }

  const expectedProofSurface = proofSurfaceForRoute(statement.surface);
  for (const support of proofs) {
    const proof = proofById.get(support.id);
    if (!proof) {
      findings.push(`${label} references missing proof ${support.id}`);
      continue;
    }
    if (!["ready", "careful"].includes(proof.status)) {
      findings.push(`${label} references non-public proof ${support.id}`);
    }
    if (expectedProofSurface && !proof.surfaces.includes(expectedProofSurface)) {
      findings.push(
        `${label} proof ${support.id} is not approved for ${expectedProofSurface}`
      );
    }
    if (
      !support.anchor ||
      !normalizedIncludes(statement.text, support.anchor) ||
      !normalizedIncludes(JSON.stringify(proof), support.anchor)
    ) {
      findings.push(`${label} proof ${support.id} lacks shared semantic anchor`);
    }
    for (const prohibited of proof.doNotSay ?? []) {
      if (repeatsProhibitedWording(statement.text, prohibited)) {
        findings.push(
          `${label} repeats prohibited wording from proof ${support.id}: ${prohibited}`
        );
      }
    }
    for (const boundary of proofSemanticBoundaryFindings(statement.text, proof)) {
      findings.push(`${label} proof ${support.id} crosses ${boundary}`);
    }
  }
  return findings;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function stableSha256(value) {
  return sha256(JSON.stringify(value));
}

export function collectiveCreditFingerprint(bank) {
  return stableSha256(
    bank.claims
      .filter((claim) => claim.collectiveWork)
      .map((claim) => ({
        id: claim.id,
        project: claim.project,
        internalClaim: claim.internalClaim,
        boundaries: claim.boundaries,
        antiClaims: claim.antiClaims,
        projections: claim.projections,
        collectiveWork: claim.collectiveWork
      }))
      .sort((left, right) => left.id.localeCompare(right.id))
  );
}

export function fileInventoryFingerprint(paths) {
  return stableSha256(
    [...paths]
      .sort()
      .map((path) => [path, sha256(readFileSync(path))])
  );
}

export function projectionDecisionFingerprint(bank) {
  return stableSha256({
    claims: bank.claims
      .map((claim) => ({
        id: claim.id,
        projectionEligibility: claim.projectionEligibility,
        projections: claim.projections
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
    pages: bank.pages
      .map((page) => ({
        id: page.id,
        surface: page.surface,
        occurrences: page.occurrences
      }))
      .sort((left, right) => left.id.localeCompare(right.id))
  });
}

export function statementSupportFingerprint(policy = projectionSurfaceBindings) {
  return stableSha256({
    resumePresentation: {
      expectedVisibleBlockCount:
        policy.resumeArtifact.expectedVisibleBlockCount,
      presentationText: policy.resumeArtifact.presentationText,
      expectedVisibleAttributeCount:
        policy.resumeArtifact.expectedVisibleAttributeCount,
      visibleAttributeText: policy.resumeArtifact.visibleAttributeText,
      expectedEmbeddedContentRiskCount:
        policy.resumeArtifact.expectedEmbeddedContentRiskCount,
      metadataText: policy.resumeArtifact.metadataText
    },
    resume: policy.resumeArtifact.statements
      .map((statement) => ({
        id: statement.id,
        text: statement.text,
        claims: statement.claims,
        proofs: statement.proofs
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
    public: policy.publicStatementManifest
      .map((statement) => ({
        id: statement.id,
        path: statement.path,
        surface: statement.surface,
        text: statement.text,
        claims: statement.claims,
        proofs: statement.proofs
      }))
      .sort((left, right) => left.id.localeCompare(right.id)),
    work: {
      expectedStatementCount: policy.expectedWorkStatementCount,
      statements: workStatementSupportRecords().map((statement) => ({
        id: statement.id,
        text: statement.text,
        proofs: statement.proofs,
        surfaces: statement.surfaces,
        semanticCoverageRequired: statement.semanticCoverageRequired
      }))
    }
  });
}

function unwrappedTsExpression(node) {
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return unwrappedTsExpression(node.expression);
  }
  return node;
}

function objectProperty(object, name, sourceFile) {
  return object.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) &&
      property.name.getText(sourceFile).replace(/["']/g, "") === name
  )?.initializer;
}

function literalStringValue(node) {
  if (!node) return null;
  const value = unwrappedTsExpression(node);
  return ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)
    ? value.text
    : null;
}

function stringArrayValue(node) {
  if (!node) return null;
  const value = unwrappedTsExpression(node);
  if (!ts.isArrayLiteralExpression(value)) return null;
  const strings = value.elements.map(literalStringValue);
  return strings.every((item) => item !== null) ? strings : null;
}

function nestedStringArraysValue(node) {
  if (!node) return null;
  const value = unwrappedTsExpression(node);
  if (!ts.isArrayLiteralExpression(value)) return null;
  const arrays = value.elements.map(stringArrayValue);
  return arrays.every((item) => item !== null) ? arrays : null;
}

export function workStatementSupportRecords(
  source = readFileSync(workDataPath, "utf8")
) {
  const sourceFile = ts.createSourceFile(
    workDataPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  let workItemsInput = null;
  function findWorkItems(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "workItemsInput"
    ) {
      workItemsInput = unwrappedTsExpression(node.initializer);
    }
    ts.forEachChild(node, findWorkItems);
  }
  findWorkItems(sourceFile);
  if (!workItemsInput || !ts.isArrayLiteralExpression(workItemsInput)) {
    throw new Error("workItemsInput must remain a literal governed array");
  }

  const records = [];
  for (const rawItem of workItemsInput.elements) {
    const item = unwrappedTsExpression(rawItem);
    if (!ts.isObjectLiteralExpression(item)) {
      throw new Error("every work item must remain a literal governed object");
    }
    const slug = literalStringValue(objectProperty(item, "slug", sourceFile));
    const proofBankIds = stringArrayValue(
      objectProperty(item, "proofBankIds", sourceFile)
    );
    const proofMap = unwrappedTsExpression(
      objectProperty(item, "statementProofs", sourceFile)
    );
    if (!slug || !proofBankIds || !ts.isObjectLiteralExpression(proofMap)) {
      throw new Error("every work item needs a slug, proofBankIds, and statementProofs");
    }

    const caseStudySurface = `/work/${slug}`;
    const sharedSurfaces = ["/work", caseStudySurface];
    const add = (
      key,
      textNode,
      proofs,
      surfaces,
      semanticCoverageRequired = true
    ) => {
      if (!textNode) return;
      const text =
        literalStringValue(textNode) ??
        unwrappedTsExpression(textNode).getText(sourceFile);
      if (!text || !proofs || proofs.length === 0) {
        throw new Error(`${slug}.${key} lacks text or statement-level proof IDs`);
      }
      for (const proofId of proofs) {
        if (!proofBankIds.includes(proofId)) {
          throw new Error(`${slug}.${key} uses ${proofId} outside proofBankIds`);
        }
      }
      records.push({
        id: `${slug}.${key}`,
        text,
        proofs,
        surfaces,
        semanticCoverageRequired
      });
    };

    const proofIds = (key) =>
      stringArrayValue(objectProperty(proofMap, key, sourceFile));
    const addStringArray = (key, valueNode, proofs, surfaces) => {
      if (!valueNode) return;
      const value = unwrappedTsExpression(valueNode);
      if (!ts.isArrayLiteralExpression(value)) return;
      value.elements.forEach((entry, index) =>
        add(`${key}.${index}`, entry, proofs, surfaces, false)
      );
    };

    for (const key of ["title", "subtitle", "status", "visibility"]) {
      add(
        key,
        objectProperty(item, key, sourceFile),
        proofIds(key),
        sharedSurfaces,
        false
      );
    }
    for (const key of ["years", "series"]) {
      add(
        key,
        objectProperty(item, key, sourceFile),
        proofIds(key),
        [caseStudySurface],
        false
      );
    }
    add(
      "group",
      objectProperty(item, "group", sourceFile),
      proofIds("group"),
      ["/work"],
      false
    );
    add(
      "featured",
      objectProperty(item, "featured", sourceFile),
      proofIds("featured"),
      ["/"],
      false
    );
    add(
      "priority",
      objectProperty(item, "priority", sourceFile),
      proofIds("priority"),
      ["/", "/work"],
      false
    );

    for (const key of [
      "role",
      "summary",
      "whatWasUnclear",
      "whatBecameUsable",
      "roleFit"
    ]) {
      add(
        key,
        objectProperty(item, key, sourceFile),
        proofIds(key),
        key === "whatWasUnclear" || key === "whatBecameUsable"
          ? ["/work"]
          : sharedSurfaces
      );
    }

    addStringArray(
      "tags",
      objectProperty(item, "tags", sourceFile),
      proofIds("tags"),
      sharedSurfaces
    );
    addStringArray(
      "artifactTypes",
      objectProperty(item, "artifactTypes", sourceFile),
      proofIds("artifactTypes"),
      [caseStudySurface]
    );

    const artifacts = unwrappedTsExpression(objectProperty(item, "artifacts", sourceFile));
    const artifactProofs = nestedStringArraysValue(
      objectProperty(proofMap, "artifacts", sourceFile)
    );
    if (!ts.isArrayLiteralExpression(artifacts) || artifactProofs?.length !== artifacts.elements.length) {
      throw new Error(`${slug}.artifacts statement-proof count is not complete`);
    }
    artifacts.elements.forEach((rawArtifact, index) => {
      const artifact = unwrappedTsExpression(rawArtifact);
      add(
        `artifacts.${index}.title`,
        objectProperty(artifact, "title", sourceFile),
        artifactProofs[index],
        [caseStudySurface],
        false
      );
      add(
        `artifacts.${index}.description`,
        objectProperty(artifact, "description", sourceFile),
        artifactProofs[index],
        [caseStudySurface]
      );
      add(
        `artifacts.${index}.type`,
        objectProperty(artifact, "type", sourceFile),
        artifactProofs[index],
        [caseStudySurface],
        false
      );
    });

    const evidence = unwrappedTsExpression(objectProperty(item, "evidence", sourceFile));
    const evidenceProofs = nestedStringArraysValue(
      objectProperty(proofMap, "evidence", sourceFile)
    );
    if (!ts.isArrayLiteralExpression(evidence) || evidenceProofs?.length !== evidence.elements.length) {
      throw new Error(`${slug}.evidence statement-proof count is not complete`);
    }
    if (evidence.elements.length !== evidenceProofs.length) {
      throw new Error(`${slug}.evidence statement-proof count is not complete`);
    }

    const knownOpenProtected = unwrappedTsExpression(
      objectProperty(item, "knownOpenProtected", sourceFile)
    );
    add(
      "known",
      objectProperty(knownOpenProtected, "known", sourceFile),
      stringArrayValue(objectProperty(proofMap, "known", sourceFile)),
      [caseStudySurface]
    );
    for (const key of ["open", "protected"]) {
      add(
        key,
        objectProperty(knownOpenProtected, key, sourceFile),
        proofIds(key),
        [caseStudySurface]
      );
    }

    for (const key of ["careNote", "currentStatus", "sourceLayer"]) {
      add(
        key,
        objectProperty(item, key, sourceFile),
        proofIds(key),
        [caseStudySurface],
        key !== "currentStatus"
      );
    }
    const publicSafetyNode = objectProperty(item, "publicSafety", sourceFile);
    const publicSafety = publicSafetyNode
      ? unwrappedTsExpression(publicSafetyNode)
      : null;
    if (publicSafety && ts.isObjectLiteralExpression(publicSafety)) {
      add(
        "publicSafety.note",
        objectProperty(publicSafety, "note", sourceFile),
        proofIds("publicSafetyNote"),
        [caseStudySurface]
      );
    }
    addStringArray(
      "credits",
      objectProperty(item, "credits", sourceFile),
      proofIds("credits"),
      [caseStudySurface]
    );
    const linksNode = objectProperty(item, "links", sourceFile);
    const links = linksNode ? unwrappedTsExpression(linksNode) : null;
    if (links && ts.isArrayLiteralExpression(links)) {
      links.elements.forEach((rawLink, index) => {
        const link = unwrappedTsExpression(rawLink);
        if (!ts.isObjectLiteralExpression(link)) return;
        for (const key of ["label", "url"]) {
          add(
            `links.${index}.${key}`,
            objectProperty(link, key, sourceFile),
            proofIds("links"),
            [caseStudySurface],
            false
          );
        }
      });
    }
  }
  return records;
}

export function workStatementSemanticFindings(
  source = readFileSync(workDataPath, "utf8")
) {
  const findings = [];
  for (const statement of workStatementSupportRecords(source)) {
    const project = statement.id.split(".")[0];
    const isResolvedExpression = statement.text.startsWith("getClaimProjection(");
    const statementProofs = statement.proofs
      .map((proofId) => proofById.get(proofId))
      .filter(Boolean);
    if (
      statement.semanticCoverageRequired &&
      !isResolvedExpression &&
      statementProofs.length > 0
    ) {
      const coverage = statementProofSemanticCoverage(
        statement.text,
        statementProofs
      );
      if (coverage.statementTokens.length > 0 && coverage.score < 0.3) {
        findings.push(
          `work statement ${statement.id} has insufficient semantic support from ${statement.proofs.join(", ")} (${coverage.matched.length}/${coverage.statementTokens.length} substantive tokens)`
        );
      }
      const basis = statementProofs.map(proofSemanticBasis).join(" ");
      for (const unsupported of unsupportedSemanticClauses(statement.text, basis)) {
        findings.push(
          `work statement ${statement.id} contains an unsupported clause (${unsupported.coverage.matched.length}/${unsupported.coverage.statementTokens.length} substantive tokens): ${unsupported.clause}`
        );
      }
    }
    for (const proofId of statement.proofs) {
      const proof = proofById.get(proofId);
      if (!proof) continue;
      if (!proof.relatedProjects.includes(project)) {
        findings.push(
          `work statement ${statement.id} uses proof ${proofId} from an unrelated project`
        );
      }
      for (const boundary of proofSemanticBoundaryFindings(statement.text, proof)) {
        findings.push(`work statement ${statement.id} proof ${proofId} crosses ${boundary}`);
      }
    }
  }
  return findings;
}

export function projectionRouteBindingFingerprint(
  policy = projectionSurfaceBindings
) {
  return stableSha256({
    routes: policy.routes,
    caseStudyRoutes: policy.caseStudyRoutes,
    caseStudySharedFiles: policy.caseStudySharedFiles,
    publicSurfaceRoots: policy.publicSurfaceRoots,
    publicSurfaceFiles: policy.publicSurfaceFiles
  });
}

function filesBelow(root, extensions) {
  const files = [];
  if (!existsSync(root)) return files;
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path, extensions));
    else if (
      extensions.includes("*") ||
      extensions.some((extension) => path.endsWith(extension))
    ) files.push(path);
  }
  return files;
}

export function publicSurfaceFingerprint(
  policy = projectionSurfaceBindings
) {
  const paths = new Set(policy.publicSurfaceFiles);
  for (const root of policy.publicSurfaceRoots) {
    for (const path of filesBelow(root.path, root.extensions)) paths.add(path);
  }
  return stableSha256(
    [...paths].sort().map((path) => [path, sha256(readFileSync(path))])
  );
}

function routeFilesForSurface(surface) {
  const files = projectionSurfaceBindings.routes[surface] ?? [];
  if (!projectionSurfaceBindings.caseStudyRoutes.includes(surface)) return files;
  return [...new Set([...files, ...projectionSurfaceBindings.caseStudySharedFiles])];
}

function literalAttribute(tag, attribute) {
  return tag.match(new RegExp(`${attribute}=["']([^"']+)["']`))?.[1];
}

function stripIndentedMarkdownCode(content) {
  const output = [];
  let claimTagMode = null;
  for (const line of content.split("\n")) {
    if (claimTagMode === "live") {
      output.push(line);
      if (/\/>/.test(line)) claimTagMode = null;
      continue;
    }
    if (claimTagMode === "code") {
      if (/\/>/.test(line)) claimTagMode = null;
      continue;
    }
    if (/^[ \t]*<Claim\b/.test(line)) {
      const indentation = line.match(/^[ \t]*/)?.[0].replace(/\t/g, "    ").length ?? 0;
      claimTagMode = indentation >= 4 ? "code" : "live";
      if (claimTagMode === "live") output.push(line);
      if (/\/>/.test(line)) claimTagMode = null;
      continue;
    }
    if (/^(?: {4}|\t)/.test(line)) continue;
    output.push(line);
  }
  return output.join("\n");
}

function executableSource(content) {
  return stripIndentedMarkdownCode(content)
    .replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, "")
    .replace(/^~~~[^\n]*\n[\s\S]*?^~~~[ \t]*$/gm, "")
    .replace(/`(?:\\[\s\S]|[^`])*`/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1")
    .replace(
      /(^|\n)[ \t]*(?!export\b)(?:async\s+)?function\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{[\s\S]*?^[ \t]*\}/gm,
      "$1"
    )
    .replace(
      /(^|\n)[ \t]*(?!export\b)(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\([\s\S]*?^[ \t]*\);?/gm,
      "$1"
    )
    .replace(
      /\bprocess\.env(?:\.[A-Za-z0-9_]+|\[[^\]]+\])\s*&&\s*\([\s\S]*?\)\s*;?/g,
      ""
    )
    .replace(
      /\bif\s*\(\s*process\.env(?:\.[A-Za-z0-9_]+|\[[^\]]+\])\s*\)\s*\{[\s\S]*?\}/g,
      ""
    )
    .replace(/\bfalse\s*&&\s*\([\s\S]*?\)\s*;?/g, "")
    .replace(/\bif\s*\(\s*false\s*\)\s*\{[\s\S]*?\}/g, "");
}

function hasModifier(node, kind) {
  return node.modifiers?.some((modifier) => modifier.kind === kind) ?? false;
}

function hasProcessEnv(node) {
  return Boolean(node) && /\bprocess\.env(?:\.|\[)/.test(node.getText());
}

function identifierIsConstFalse(identifier, sourceFile) {
  let found = false;
  function visit(node) {
    if (found) return;
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === identifier &&
      expressionIsAlwaysFalse(node.initializer, sourceFile) &&
      ts.isVariableDeclarationList(node.parent) &&
      (node.parent.flags & ts.NodeFlags.Const) !== 0
    ) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

function identifierIsConstTrue(identifier, sourceFile) {
  let found = false;
  function visit(node) {
    if (found) return;
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === identifier &&
      expressionIsAlwaysTrue(node.initializer, sourceFile) &&
      ts.isVariableDeclarationList(node.parent) &&
      (node.parent.flags & ts.NodeFlags.Const) !== 0
    ) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

function expressionIsAlwaysFalse(expression, sourceFile) {
  if (!expression) return false;
  if (
    expression.kind === ts.SyntaxKind.FalseKeyword ||
    expression.kind === ts.SyntaxKind.NullKeyword
  ) {
    return true;
  }
  if (ts.isNumericLiteral(expression) && Number(expression.text) === 0) return true;
  if (ts.isStringLiteral(expression) && expression.text.length === 0) return true;
  if (ts.isIdentifier(expression) && expression.text === "undefined") return true;
  if (
    ts.isPropertyAccessExpression(expression) &&
    expression.name.text === "length" &&
    expressionIsStaticallyEmptyArray(expression.expression, sourceFile)
  ) {
    return true;
  }
  if (ts.isBinaryExpression(expression)) {
    const left = staticPrimitiveValue(expression.left, sourceFile);
    const right = staticPrimitiveValue(expression.right, sourceFile);
    if (left.known && right.known) {
      switch (expression.operatorToken.kind) {
        case ts.SyntaxKind.EqualsEqualsEqualsToken:
        case ts.SyntaxKind.EqualsEqualsToken:
          return left.value !== right.value;
        case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        case ts.SyntaxKind.ExclamationEqualsToken:
          return left.value === right.value;
        case ts.SyntaxKind.LessThanToken:
          return !(left.value < right.value);
        case ts.SyntaxKind.LessThanEqualsToken:
          return !(left.value <= right.value);
        case ts.SyntaxKind.GreaterThanToken:
          return !(left.value > right.value);
        case ts.SyntaxKind.GreaterThanEqualsToken:
          return !(left.value >= right.value);
      }
    }
  }
  if (
    ts.isPrefixUnaryExpression(expression) &&
    expression.operator === ts.SyntaxKind.ExclamationToken
  ) {
    return expressionIsAlwaysTrue(expression.operand, sourceFile);
  }
  if (
    ts.isCallExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.expression.text === "Boolean" &&
    expression.arguments.length === 1
  ) {
    return expressionIsAlwaysFalse(expression.arguments[0], sourceFile);
  }
  if (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  ) {
    return expressionIsAlwaysFalse(expression.expression, sourceFile);
  }
  return (
    ts.isIdentifier(expression) &&
    identifierIsConstFalse(expression.text, sourceFile)
  );
}

function staticPrimitiveValue(expression, sourceFile) {
  const value = unwrappedTsExpression(expression);
  if (value.kind === ts.SyntaxKind.TrueKeyword) return { known: true, value: true };
  if (value.kind === ts.SyntaxKind.FalseKeyword) return { known: true, value: false };
  if (value.kind === ts.SyntaxKind.NullKeyword) return { known: true, value: null };
  if (ts.isNumericLiteral(value)) return { known: true, value: Number(value.text) };
  if (ts.isStringLiteral(value)) return { known: true, value: value.text };
  if (
    ts.isPropertyAccessExpression(value) &&
    value.name.text === "length" &&
    expressionIsStaticallyEmptyArray(value.expression, sourceFile)
  ) {
    return { known: true, value: 0 };
  }
  return { known: false, value: undefined };
}

function expressionIsAlwaysTrue(expression, sourceFile) {
  if (!expression) return false;
  if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (ts.isNumericLiteral(expression) && Number(expression.text) !== 0) return true;
  if (ts.isStringLiteral(expression) && expression.text.length > 0) return true;
  if (ts.isArrayLiteralExpression(expression) || ts.isObjectLiteralExpression(expression)) {
    return true;
  }
  if (
    ts.isPrefixUnaryExpression(expression) &&
    expression.operator === ts.SyntaxKind.ExclamationToken
  ) {
    return expressionIsAlwaysFalse(expression.operand, sourceFile);
  }
  if (
    ts.isCallExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.expression.text === "Boolean" &&
    expression.arguments.length === 1
  ) {
    return expressionIsAlwaysTrue(expression.arguments[0], sourceFile);
  }
  if (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  ) {
    return expressionIsAlwaysTrue(expression.expression, sourceFile);
  }
  return (
    ts.isIdentifier(expression) &&
    identifierIsConstTrue(expression.text, sourceFile)
  );
}

function statementAlwaysExits(statement, sourceFile) {
  if (ts.isReturnStatement(statement) || ts.isThrowStatement(statement)) {
    return true;
  }
  if (ts.isBlock(statement)) {
    return statement.statements.length > 0 &&
      statementAlwaysExits(statement.statements.at(-1), sourceFile);
  }
  return (
    ts.isIfStatement(statement) &&
    expressionIsAlwaysTrue(statement.expression, sourceFile) &&
    statementAlwaysExits(statement.thenStatement, sourceFile)
  );
}

function followsUnconditionalExit(node, sourceFile) {
  for (let current = node; current.parent; current = current.parent) {
    if (!ts.isBlock(current.parent)) continue;
    const statements = current.parent.statements;
    const index = statements.findIndex((statement) => statement === current);
    if (
      index > 0 &&
      statements
        .slice(0, index)
        .some((statement) => statementAlwaysExits(statement, sourceFile))
    ) {
      return true;
    }
  }
  return false;
}

function conditionMatchesRenderedSlug(expression, surface) {
  if (!ts.isBinaryExpression(expression)) return false;
  if (
    ![
      ts.SyntaxKind.EqualsEqualsEqualsToken,
      ts.SyntaxKind.EqualsEqualsToken
    ].includes(expression.operatorToken.kind)
  ) {
    return false;
  }
  const sides = [expression.left, expression.right];
  const slugSide = sides.find(
    (side) =>
      ts.isPropertyAccessExpression(side) && side.name.text === "slug"
  );
  const literalSide = sides.find((side) => ts.isStringLiteral(side));
  if (!slugSide || !literalSide) return false;
  return surface === "/work" || surface === `/work/${literalSide.text}`;
}

function hasDisallowedRuntimeGate(node, sourceFile, surface) {
  if (followsUnconditionalExit(node, sourceFile)) return true;
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isConditionalExpression(current)) {
      const inTrue =
        node.pos >= current.whenTrue.pos && node.end <= current.whenTrue.end;
      const inFalse =
        node.pos >= current.whenFalse.pos && node.end <= current.whenFalse.end;
      if (
        hasProcessEnv(current.condition) ||
        (inTrue && expressionIsAlwaysFalse(current.condition, sourceFile)) ||
        (inFalse && expressionIsAlwaysTrue(current.condition, sourceFile)) ||
        (inTrue &&
          !expressionIsAlwaysTrue(current.condition, sourceFile) &&
          !conditionMatchesRenderedSlug(current.condition, surface)) ||
        (inFalse && !expressionIsAlwaysFalse(current.condition, sourceFile))
      ) {
        return true;
      }
    }
    if (ts.isIfStatement(current)) {
      const inThen =
        node.pos >= current.thenStatement.pos &&
        node.end <= current.thenStatement.end;
      const inElse =
        current.elseStatement &&
        node.pos >= current.elseStatement.pos &&
        node.end <= current.elseStatement.end;
      if (
        hasProcessEnv(current.expression) ||
        (inThen && expressionIsAlwaysFalse(current.expression, sourceFile)) ||
        (inElse && expressionIsAlwaysTrue(current.expression, sourceFile)) ||
        (inThen && !expressionIsAlwaysTrue(current.expression, sourceFile)) ||
        (inElse && !expressionIsAlwaysFalse(current.expression, sourceFile))
      ) {
        return true;
      }
    }
    if (
      ts.isWhileStatement(current) ||
      ts.isDoStatement(current) ||
      ts.isForStatement(current) ||
      ts.isForOfStatement(current) ||
      ts.isForInStatement(current)
    ) return true;
    if (
      ts.isBinaryExpression(current) &&
      node.pos >= current.right.pos &&
      node.end <= current.right.end &&
      (hasProcessEnv(current.left) ||
        (current.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken &&
          !expressionIsAlwaysTrue(current.left, sourceFile)) ||
        (current.operatorToken.kind === ts.SyntaxKind.BarBarToken &&
          !expressionIsAlwaysFalse(current.left, sourceFile)) ||
        current.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)
    ) {
      return true;
    }
  }
  return false;
}

function expressionIsStaticallyEmptyArray(node, sourceFile, seen = new Set()) {
  const expression = unwrappedTsExpression(node);
  if (ts.isArrayLiteralExpression(expression)) {
    return expression.elements.length === 0;
  }
  if (
    ts.isNewExpression(expression) &&
    ts.isIdentifier(expression.expression) &&
    expression.expression.text === "Array" &&
    expression.arguments?.length === 1 &&
    expressionIsAlwaysFalse(expression.arguments[0], sourceFile)
  ) {
    return true;
  }
  if (ts.isCallExpression(expression)) {
    if (
      ts.isPropertyAccessExpression(expression.expression) &&
      ((expression.expression.expression.getText(sourceFile) === "Object" &&
        expression.expression.name.text === "freeze") ||
        (expression.expression.expression.getText(sourceFile) === "Array" &&
          expression.expression.name.text === "from")) &&
      expression.arguments.length > 0
    ) {
      return expressionIsStaticallyEmptyArray(
        expression.arguments[0],
        sourceFile,
        seen
      );
    }
    if (
      ts.isPropertyAccessExpression(expression.expression) &&
      expression.expression.name.text === "filter" &&
      expression.arguments.length > 0
    ) {
      const callback = unwrappedTsExpression(expression.arguments[0]);
      if (
        (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) &&
        ((ts.isBlock(callback.body) &&
          callback.body.statements.length === 1 &&
          ts.isReturnStatement(callback.body.statements[0]) &&
          expressionIsAlwaysFalse(callback.body.statements[0].expression, sourceFile)) ||
          (!ts.isBlock(callback.body) &&
            expressionIsAlwaysFalse(callback.body, sourceFile)))
      ) {
        return true;
      }
    }
  }
  if (!ts.isIdentifier(expression) || seen.has(expression.text)) return false;
  seen.add(expression.text);
  let initializer = null;
  function visit(current) {
    if (initializer) return;
    if (
      ts.isVariableDeclaration(current) &&
      ts.isIdentifier(current.name) &&
      current.name.text === expression.text &&
      current.initializer
    ) {
      initializer = current.initializer;
      return;
    }
    ts.forEachChild(current, visit);
  }
  visit(sourceFile);
  return initializer
    ? expressionIsStaticallyEmptyArray(initializer, sourceFile, seen)
    : false;
}

function jsxAncestorIsHidden(node, sourceFile) {
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isJsxAttribute(current)) return true;
    if (!ts.isJsxElement(current)) continue;
    const opening = current.openingElement;
    const tagName = opening.tagName.getText(sourceFile).toLowerCase();
    const tag = opening.getText(sourceFile);
    if (["template", "style", "script"].includes(tagName)) return true;
    if (tagName === "dialog" && !/\sopen(?:\s|=|>)/i.test(tag)) return true;
    if (/\spopover(?:\s|=|>)/i.test(tag)) return true;
    if (/\s(?:hidden|inert)(?:\s|=|>)/i.test(tag)) return true;
    if (
      /aria-hidden\s*=/i.test(tag) &&
      !/aria-hidden\s*=\s*(?:\{\s*false\s*\}|["']false["'])/i.test(tag)
    ) {
      return true;
    }
    if (/\sstyle\s*=/i.test(tag)) return true;
    if (/\sdisplay\s*=\s*["']none["']/i.test(tag)) return true;
    if (/\svisibility\s*=\s*["'](?:hidden|collapse)["']/i.test(tag)) return true;
    const classes = literalClassTokens(tag);
    if (classes.present && !classes.known) return true;
    if (classes.tokens.some(classTokenIsNonRendering)) return true;
  }
  return false;
}

function exportedComponentHasRenderer(sourcePath, exportName, surface) {
  const sourceStem = basename(sourcePath).replace(/\.[^.]+$/, "");
  for (const routePath of routeFilesForSurface(surface)) {
    if (routePath === sourcePath) continue;
    let content;
    try {
      content = readFileSync(routePath, "utf8");
    } catch {
      continue;
    }
    const importsComponent = new RegExp(
      `import\\s+(?:\\{[^}]*\\b${exportName}\\b[^}]*\\}|${exportName})[\\s\\S]*?from\\s+["'][^"']*${sourceStem}["']`
    ).test(content);
    const rendersComponent = new RegExp(`<${exportName}\\b`).test(content);
    if (importsComponent && rendersComponent) return true;
  }
  return false;
}

function isReachableModuleNode(node, sourcePath, surface) {
  const expectedExportName = basename(sourcePath).replace(/\.[^.]+$/, "");
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isVariableDeclaration(current) && ts.isJsxSelfClosingElement(node)) {
      return false;
    }
    if (ts.isFunctionDeclaration(current)) {
      if (
        hasModifier(current, ts.SyntaxKind.DefaultKeyword) &&
        sourcePath.includes("/app/") &&
        basename(sourcePath).startsWith("page.")
      ) {
        return true;
      }
      if (
        hasModifier(current, ts.SyntaxKind.ExportKeyword) &&
        current.name &&
        exportedComponentHasRenderer(sourcePath, current.name.text, surface)
      ) {
        return true;
      }
      return false;
    }
    if (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) {
      if (
        ts.isCallExpression(current.parent) &&
        current.parent.arguments.includes(current) &&
        ts.isPropertyAccessExpression(current.parent.expression) &&
        ["map", "flatMap"].includes(current.parent.expression.name.text)
      ) {
        const receiver = current.parent.expression.expression;
        if (expressionIsStaticallyEmptyArray(receiver, current.getSourceFile())) {
          return false;
        }
        continue;
      }
      return false;
    }
    if (ts.isMethodDeclaration(current)) return false;
    if (ts.isVariableStatement(current)) {
      const exported = hasModifier(current, ts.SyntaxKind.ExportKeyword);
      const names = current.declarationList.declarations
        .map((declaration) =>
          ts.isIdentifier(declaration.name) ? declaration.name.text : null
        )
        .filter(Boolean);
      if (
        exported &&
        (names.includes(expectedExportName) ||
          (sourcePath.endsWith("/data/work.ts") &&
            names.some((name) => ["workItems", "workItemsInput"].includes(name))))
      ) {
        return true;
      }
      if (
        sourcePath.endsWith("/data/work.ts") &&
        names.includes("workItemsInput")
      ) {
        return true;
      }
    }
  }
  return false;
}

function isDirectWorkSummaryResolver(node) {
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) {
      return false;
    }
    if (ts.isPropertyAssignment(current)) {
      return current.name.getText().replace(/["']/g, "") === "summary";
    }
    if (ts.isSourceFile(current)) return false;
  }
  return false;
}

function jsxHasRenderableReturnPath(node, sourceFile) {
  let foundReturn = false;
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isReturnStatement(current)) {
      foundReturn = true;
      continue;
    }
    if (
      ts.isCaseClause(current) ||
      ts.isDefaultClause(current) ||
      ts.isSwitchStatement(current) ||
      ts.isCatchClause(current) ||
      ts.isMethodDeclaration(current) ||
      ts.isVariableDeclaration(current) ||
      ts.isPropertyAssignment(current)
    ) {
      return false;
    }
    if (ts.isCallExpression(current)) {
      return false;
    }
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isFunctionExpression(current) ||
      ts.isArrowFunction(current)
    ) {
      const isMapCallback =
        ts.isCallExpression(current.parent) &&
        current.parent.arguments.includes(current) &&
        ts.isPropertyAccessExpression(current.parent.expression) &&
        ["map", "flatMap"].includes(current.parent.expression.name.text);
      if (!isMapCallback) return foundReturn;
    }
    if (ts.isSourceFile(current)) return foundReturn;
  }
  return foundReturn;
}

function tsxRouteRealizesProjection(
  content,
  claim,
  projection,
  surface,
  bank,
  sourcePath
) {
  const sourceFile = ts.createSourceFile(
    sourcePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    sourcePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  let realized = false;

  function visit(node) {
    if (realized) return;
    if (
      ts.isJsxSelfClosingElement(node) &&
      node.tagName.getText(sourceFile) === "Claim" &&
      !hasDisallowedRuntimeGate(node, sourceFile, surface) &&
      !jsxAncestorIsHidden(node, sourceFile) &&
      jsxHasRenderableReturnPath(node, sourceFile) &&
      isReachableModuleNode(node, sourcePath, surface)
    ) {
      const tag = node.getText(sourceFile);
      if (
        literalAttribute(tag, "claimId") === claim.id &&
        literalAttribute(tag, "projection") === projection.key &&
        literalAttribute(tag, "surface") === surface &&
        matchingCitationOccurrence(bank, tag, claim, projection, surface)
      ) {
        realized = true;
        return;
      }
    }
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(sourceFile) === "getClaimProjection" &&
      !hasDisallowedRuntimeGate(node, sourceFile, surface) &&
      !jsxAncestorIsHidden(node, sourceFile) &&
      (!sourcePath.endsWith("/data/work.ts") || isDirectWorkSummaryResolver(node)) &&
      isReachableModuleNode(node, sourcePath, surface)
    ) {
      const values = node.arguments.map((argument) =>
        ts.isStringLiteral(argument) ? argument.text : null
      );
      if (
        values[0] === claim.id &&
        values[1] === projection.key &&
        values[2] === surface &&
        !projection.citationRequired
      ) {
        realized = true;
        return;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return realized;
}

export function documentRealizesProjection(content, projection) {
  const executable = executableSource(content);
  const tree = parsedHtmlTree(executable);
  const visible = htmlNodeVisibleText(
    tree,
    nonRenderingCssClasses(executable)
  );
  return normalizedText(visible).includes(normalizedText(projection.text));
}

function matchingCitationOccurrence(bank, tag, claim, projection, surface) {
  const pageId = literalAttribute(tag, "pageId");
  const occurrenceId = literalAttribute(tag, "occurrenceId");
  if (!pageId && !occurrenceId) return !projection.citationRequired;
  if (!pageId || !occurrenceId) return false;
  const page = bank.pages.find(
    (item) => item.id === pageId && item.surface === surface
  );
  const occurrence = page?.occurrences.find(
    (item) => item.id === occurrenceId
  );
  const renderableDirectSupport = new Set(
    claim.evidence
      .filter(
        (evidence) =>
          evidence.relationship === "direct-support" &&
          evidence.renderCitation &&
          bank.sources.some(
            (source) =>
              source.id === evidence.sourceId && source.visibility === "public"
          )
      )
      .map((evidence) => evidence.sourceId)
  );
  return (
    occurrence?.claimId === claim.id &&
    occurrence.projection === projection.key &&
    occurrence.sourceIds.some((sourceId) => renderableDirectSupport.has(sourceId))
  );
}

function mdxHasHiddenAncestor(content) {
  const stack = [];
  for (const match of content.matchAll(/<(\/)?([A-Za-z][\w.-]*)([^<>]*)>/g)) {
    const closing = Boolean(match[1]);
    const name = match[2].toLowerCase();
    if (closing) {
      const index = stack.map((entry) => entry.name).lastIndexOf(name);
      if (index >= 0) stack.splice(index);
      continue;
    }
    if (/\/\s*>$/.test(match[0])) continue;
    const tag = match[0];
    const hidden =
      ["template", "style", "script"].includes(name) ||
      (name === "dialog" && !/\sopen(?:\s|=|>)/i.test(tag)) ||
      /\spopover(?:\s|=|>)/i.test(tag) ||
      /\s(?:hidden|inert)(?:\s|=|>)/i.test(tag) ||
      (/aria-hidden\s*=/i.test(tag) &&
        !/aria-hidden\s*=\s*(?:\{\s*false\s*\}|["']false["'])/i.test(tag)) ||
      /\sstyle\s*=/i.test(tag) ||
      /\sdisplay\s*=\s*["']none["']/i.test(tag) ||
      /\svisibility\s*=\s*["'](?:hidden|collapse)["']/i.test(tag) ||
      (() => {
        const classes = literalClassTokens(tag);
        return (
          (classes.present && !classes.known) ||
          classes.tokens.some(classTokenIsNonRendering)
        );
      })();
    stack.push({ name, hidden });
  }
  return stack.some((entry) => entry.hidden);
}

function mdxClaimIsReachable(content, index) {
  const before = content.slice(0, index);
  const nearby = before.slice(-1200);
  if (mdxHasHiddenAncestor(before)) return false;
  const braceBalance =
    (before.match(/\{/g) ?? []).length - (before.match(/\}/g) ?? []).length;
  const parenthesisBalance =
    (before.match(/\(/g) ?? []).length - (before.match(/\)/g) ?? []).length;
  if (braceBalance > 0 || parenthesisBalance > 0) return false;
  if (
    /(?:\[\s*\]|\b(?:const|let)\s+[A-Za-z_$][\w$]*\s*=\s*\[\s*\])\s*\.(?:map|flatMap|forEach)\s*\([^)]*$/s.test(
      nearby
    ) ||
    /for\s*\([^)]*\bof\s*\[\s*\]\s*\)[^{]*\{[^}]*$/s.test(nearby) ||
    /(?:while\s*\(\s*(?:false|0|null)\s*\)|for\s*\([^;]*;\s*(?:false|0|null)\s*;[^)]*\))\s*\{[^}]*$/s.test(
      nearby
    )
  ) {
    return false;
  }
  if (
    /(?:Boolean\s*\(\s*(?:false|null|0)\s*\)|\b[A-Za-z_$][\w$]*|\b(?:false|null)\b|(?:^|\W)0|process\.env[^\s]*)\s*(?:&&|\?)\s*\(?\s*$/.test(
      nearby
    )
  ) {
    return false;
  }
  if (
    /(?:\btrue\b|Boolean\s*\(\s*(?:true|1)\s*\))\s*\?[^:]{0,1000}:\s*\(?\s*$/.test(
      nearby
    ) ||
    /!\s*(?:true|Boolean\s*\(\s*(?:true|1)\s*\))\s*&&\s*\(?\s*$/.test(
      nearby
    )
  ) {
    return false;
  }

  const declarationPattern =
    /(?:^|\n)[ \t]*(?:export\s+)?(?:default\s+)?function\s+[A-Za-z_$][\w$]*\s*\([^)]*\)\s*\{|(?:^|\n)[ \t]*(?:export\s+)?(?:const|let)\s+[A-Za-z_$][\w$]*\s*=/gm;
  const declarations = [...before.matchAll(declarationPattern)];
  const declaration = declarations.at(-1);
  if (declaration) {
    const componentPrefix = before.slice(declaration.index);
    const braceBalance =
      (componentPrefix.match(/\{/g) ?? []).length -
      (componentPrefix.match(/\}/g) ?? []).length;
    const arrowIndex = componentPrefix.indexOf("=>");
    const isVariableDeclaration = /\b(?:const|let)\b/.test(declaration[0]);
    if (isVariableDeclaration && !componentPrefix.includes(";")) return false;
    if (arrowIndex >= 0) {
      const expressionPrefix = componentPrefix.slice(arrowIndex + 2);
      const parenthesisBalance =
        (expressionPrefix.match(/\(/g) ?? []).length -
        (expressionPrefix.match(/\)/g) ?? []).length;
      const expressionLine = expressionPrefix.slice(
        expressionPrefix.lastIndexOf("\n") + 1
      );
      if (
        braceBalance > 0 ||
        parenthesisBalance > 0 ||
        (!expressionPrefix.includes("\n") && !/[;}]/.test(expressionLine))
      ) {
        return false;
      }
    } else if (braceBalance > 0) {
      return false;
    }
  }
  return true;
}

export function routeRealizesProjection(
  content,
  claim,
  projection,
  surface,
  bank = { pages: [], sources: [] },
  sourcePath = "virtual.mdx"
) {
  if (/\.[cm]?[jt]sx?$/.test(sourcePath)) {
    return tsxRouteRealizesProjection(
      content,
      claim,
      projection,
      surface,
      bank,
      sourcePath
    );
  }
  const executable = executableSource(content);
  const claimTags = [...executable.matchAll(/<Claim\b[\s\S]*?\/>/g)];
  if (
    claimTags.some(
      (match) => {
        const tag = match[0];
        return (
          mdxClaimIsReachable(executable, match.index) &&
        literalAttribute(tag, "claimId") === claim.id &&
        literalAttribute(tag, "projection") === projection.key &&
        literalAttribute(tag, "surface") === surface &&
        matchingCitationOccurrence(bank, tag, claim, projection, surface)
        );
      }
    )
  ) {
    return true;
  }

  const resolverPattern = new RegExp(
    `^[ \\t]*(?:[A-Za-z_$][\\w$]*\\s*:\\s*|const\\s+[A-Za-z_$][\\w$]*\\s*=\\s*)getClaimProjection\\(\\s*["']${claim.id}["']\\s*,\\s*["']${projection.key}["']\\s*,\\s*["']${surface.replaceAll("/", "\\/")}["']\\s*\\)`,
    "m"
  );
  return !projection.citationRequired && resolverPattern.test(executable);
}

function projectionRealizationFindings(bank, claim, projection) {
  const findings = [];
  if (projection.status !== "active") return findings;
  if (projection.surfaces.length === 0) {
    return [`${claim.id}/${projection.key} is active without a surface`];
  }

  for (const surface of projection.surfaces) {
    if (surface.startsWith("docs/knowledge-bank/")) {
      const path = `${surface}.md`;
      let content;
      try {
        content = readFileSync(path, "utf8");
      } catch {
        findings.push(`${claim.id}/${projection.key} targets missing ${path}`);
        continue;
      }
      if (!documentRealizesProjection(content, projection)) {
        findings.push(
          `${claim.id}/${projection.key} is not realized on ${surface}`
        );
      }
      continue;
    }

    if (!knownRouteProjectionSurfaces.has(surface)) {
      findings.push(`${claim.id}/${projection.key} targets unknown ${surface}`);
      continue;
    }

    const routeFiles = routeFilesForSurface(surface);
    const routeContents = [];
    for (const path of routeFiles) {
      try {
        routeContents.push({ path, content: readFileSync(path, "utf8") });
      } catch {
        findings.push(`${claim.id}/${projection.key} targets missing ${path}`);
      }
    }
    if (
      routeContents.length === routeFiles.length &&
      !routeContents.some(({ path, content }) =>
        routeRealizesProjection(content, claim, projection, surface, bank, path)
      )
    ) {
      findings.push(`${claim.id}/${projection.key} is not realized on ${surface}`);
    }
  }
  return findings;
}

function makeResult(id, findings, evidence) {
  return {
    eval_id: id,
    score: findings.length === 0 ? 4 : 0,
    pass: findings.length === 0,
    evidence,
    findings
  };
}

export function evaluateKnowledgeBank(
  suite,
  bank,
  consecutivePassingRuns = 1,
  hybridResults = []
) {
  const sourceIds = new Set(bank.sources.map((item) => item.id));
  const claimIds = new Set(bank.claims.map((item) => item.id));
  const taskIds = new Set(bank.researchTasks.map((item) => item.id));
  const inquiryIds = new Set(bank.researchInquiries.map((item) => item.id));
  const assertionIds = new Set(bank.sourceAssertions.map((item) => item.id));
  const assertionSourceIds = new Set(bank.sourceAssertions.map((item) => item.sourceId));
  const findings = Object.fromEntries(suite.evals.map((entry) => [entry.id, []]));

  if (collectiveCreditPolicy.version !== 7) {
    findings["KB-007"].push("collective-credit policy version must be 7");
  }
  if (projectionSurfaceBindings.version !== 4) {
    findings["KB-009"].push("projection-surface policy version must be 4");
  }
  if (
    collectiveCreditPolicy.collectiveClaimsSha256 !==
    collectiveCreditFingerprint(bank)
  ) {
    findings["KB-007"].push(
      "collective claim inventory, project ownership, or credit language changed without policy review"
    );
  }
  if (
    frozenCollectiveCreditBaseline.version !== 1 ||
    frozenCollectiveCreditBaseline.status !== "frozen-during-run"
  ) {
    findings["KB-007"].push("collective-credit baseline is not frozen for this run");
  }
  try {
    const tagObject = execFileSync(
      "git",
      ["rev-parse", FROZEN_COLLECTIVE_BASELINE_TAG],
      { encoding: "utf8" }
    ).trim();
    const tagType = execFileSync(
      "git",
      ["cat-file", "-t", FROZEN_COLLECTIVE_BASELINE_TAG],
      { encoding: "utf8" }
    ).trim();
    const taggedCommit = execFileSync(
      "git",
      ["rev-parse", `${FROZEN_COLLECTIVE_BASELINE_TAG}^{commit}`],
      { encoding: "utf8" }
    ).trim();
    const anchoredBlob = execFileSync(
      "git",
      ["rev-parse", `${taggedCommit}:${frozenCollectiveBaselinePath}`],
      { encoding: "utf8" }
    ).trim();
    const currentBlob = execFileSync(
      "git",
      ["hash-object", frozenCollectiveBaselinePath],
      { encoding: "utf8" }
    ).trim();
    if (
      tagType !== "tag" ||
      tagObject !== FROZEN_COLLECTIVE_BASELINE_TAG_OBJECT ||
      anchoredBlob !== currentBlob
    ) {
      findings["KB-007"].push(
        "collective-credit baseline differs from its externally tagged Git anchor"
      );
    }
  } catch (error) {
    findings["KB-007"].push(
      `collective-credit baseline Git anchor cannot be verified: ${error.message}`
    );
  }
  const collectiveClaimCount = bank.claims.filter(
    (claim) => claim.collectiveWork
  ).length;
  const frozenClaimProjects =
    frozenCollectiveCreditBaseline.requiredClaimProjects;
  if (
    collectiveClaimCount <
    frozenCollectiveCreditBaseline.minimumCollectiveClaimCount
  ) {
    findings["KB-007"].push(
      `collective claim count fell below frozen baseline ${frozenCollectiveCreditBaseline.minimumCollectiveClaimCount}`
    );
  }
  if (Object.keys(frozenClaimProjects).length !== collectiveClaimCount) {
    findings["KB-007"].push(
      "frozen collective-credit baseline must classify every collective claim"
    );
  }
  for (const claim of bank.claims.filter((item) => item.collectiveWork)) {
    if (frozenClaimProjects[claim.id] !== claim.project) {
      findings["KB-007"].push(
        `collective claim ${claim.id} is missing or reassigned in the frozen baseline`
      );
    }
  }
  if (
    frozenCollectiveCreditBaseline.collectiveClaimsSha256 !==
    collectiveCreditFingerprint(bank)
  ) {
    findings["KB-007"].push(
      "collective credit semantics differ from the frozen human-review baseline"
    );
  }
  if (
    frozenCollectiveCreditBaseline.statementSupportSha256 !==
    statementSupportFingerprint()
  ) {
    findings["KB-009"].push(
      "public statement text or support assignments differ from the frozen human-review baseline"
    );
  }
  if (
    frozenCollectiveCreditBaseline.projectionRouteBindingsSha256 !==
    projectionRouteBindingFingerprint()
  ) {
    findings["KB-009"].push(
      "projection route bindings differ from the frozen human-review baseline"
    );
  }
  if (
    frozenCollectiveCreditBaseline.publicSurfaceSha256 !==
    publicSurfaceFingerprint()
  ) {
    findings["KB-009"].push(
      "public surfaces differ from the frozen human-review baseline"
    );
  }
  for (const [id, project] of Object.entries(
    frozenClaimProjects
  )) {
    const claim = bank.claims.find((item) => item.id === id);
    if (!claim || !claim.collectiveWork || claim.project !== project) {
      findings["KB-007"].push(
        `frozen collective claim ${id} must remain collective in ${project}`
      );
    }
  }
  for (const path of requiredCollectiveRuntimeFiles) {
    if (!collectiveCreditPolicy.collectiveRuntimeFiles.includes(path)) {
      findings["KB-007"].push(
        `collective-credit policy omits runtime renderer ${path}`
      );
    }
  }
  try {
    if (
      collectiveCreditPolicy.collectiveRuntimeSha256 !==
      fileInventoryFingerprint(collectiveCreditPolicy.collectiveRuntimeFiles)
    ) {
      findings["KB-007"].push(
        "collective-claim runtime rendering changed without credit review"
      );
    }
  } catch (error) {
    findings["KB-007"].push(
      `collective-claim runtime inventory cannot be read: ${error.message}`
    );
  }
  try {
    if (
      frozenCollectiveCreditBaseline.collectiveRuntimeSha256 !==
      fileInventoryFingerprint(collectiveCreditPolicy.collectiveRuntimeFiles)
    ) {
      findings["KB-007"].push(
        "collective runtime differs from the frozen human-review baseline"
      );
    }
  } catch (error) {
    findings["KB-007"].push(
      `frozen collective runtime inventory cannot be read: ${error.message}`
    );
  }
  if (
    projectionSurfaceBindings.projectionDecisionSha256 !==
    projectionDecisionFingerprint(bank)
  ) {
    findings["KB-009"].push(
      "claim use-now/hold decisions or citation occurrences changed without policy review"
    );
  }

  const configuredRoots = new Map(
    projectionSurfaceBindings.publicSurfaceRoots.map((root) => [
      root.path,
      root.extensions
    ])
  );
  for (const [path, extensions] of requiredPublicSurfaceRoots) {
    const configuredExtensions = configuredRoots.get(path) ?? [];
    if (
      !configuredExtensions.includes("*") &&
      extensions.some((extension) => !configuredExtensions.includes(extension))
    ) {
      findings["KB-009"].push(
        `public-surface policy does not govern all ${path} ${extensions.join(", ")} files`
      );
    }
  }
  for (const path of requiredPublicSurfaceFiles) {
    if (!projectionSurfaceBindings.publicSurfaceFiles.includes(path)) {
      findings["KB-009"].push(
        `public-surface policy omits consequential file ${path}`
      );
    }
  }
  for (const path of requiredCaseStudySharedFiles) {
    if (!projectionSurfaceBindings.caseStudySharedFiles.includes(path)) {
      findings["KB-009"].push(
        `case-study policy omits shared claim renderer ${path}`
      );
    }
  }
  try {
    if (
      projectionSurfaceBindings.publicSurfaceSha256 !==
      publicSurfaceFingerprint()
    ) {
      findings["KB-009"].push(
        "a consequential public surface changed without reverse-coverage review"
      );
    }
  } catch (error) {
    findings["KB-009"].push(
      `public-surface inventory cannot be read: ${error.message}`
    );
  }

  try {
    const workStatements = workStatementSupportRecords();
    if (
      workStatements.length !==
      projectionSurfaceBindings.expectedWorkStatementCount
    ) {
      findings["KB-009"].push(
        `work statement manifest contains ${workStatements.length} records; expected ${projectionSurfaceBindings.expectedWorkStatementCount}`
      );
    }
    for (const statement of workStatements) {
      for (const proofId of statement.proofs) {
        const proof = proofById.get(proofId);
        if (!proof) {
          findings["KB-009"].push(
            `work statement ${statement.id} references missing proof ${proofId}`
          );
          continue;
        }
        if (!["ready", "careful"].includes(proof.status)) {
          findings["KB-009"].push(
            `work statement ${statement.id} references non-public proof ${proofId}`
          );
        }
        for (const surface of statement.surfaces) {
          const proofSurface = proofSurfaceForRoute(surface);
          if (proofSurface && !proof.surfaces.includes(proofSurface)) {
            findings["KB-009"].push(
              `work statement ${statement.id} proof ${proofId} is not approved for ${proofSurface}`
            );
          }
        }
        for (const prohibited of proof.doNotSay ?? []) {
          if (repeatsProhibitedWording(statement.text, prohibited)) {
            findings["KB-009"].push(
              `work statement ${statement.id} repeats prohibited wording from proof ${proofId}: ${prohibited}`
            );
          }
        }
      }
    }
    findings["KB-009"].push(...workStatementSemanticFindings());
  } catch (error) {
    findings["KB-009"].push(
      `work statement-level proof manifest is invalid: ${error.message}`
    );
  }

  const publicStatementIds = new Set();
  for (const statement of projectionSurfaceBindings.publicStatementManifest ?? []) {
    if (publicStatementIds.has(statement.id)) {
      findings["KB-009"].push(`public manifest duplicates statement ${statement.id}`);
    }
    publicStatementIds.add(statement.id);
    let source = "";
    try {
      source = readFileSync(statement.path, "utf8");
    } catch (error) {
      findings["KB-009"].push(
        `public statement ${statement.id} cannot read ${statement.path}: ${error.message}`
      );
      continue;
    }
    findings["KB-009"].push(
      ...governedStatementFindings(
        statement,
        bank,
        source,
        `public statement ${statement.id}`
      )
    );
  }
  for (const id of requiredPublicStatementIds) {
    if (!publicStatementIds.has(id)) {
      findings["KB-009"].push(`public manifest omits consequential statement ${id}`);
    }
  }

  const resumeArtifact = projectionSurfaceBindings.resumeArtifact;
  try {
    const source = readFileSync(resumeArtifact.sourcePath, "utf8");
    const extractedText = readFileSync(resumeArtifact.extractedTextPath, "utf8");
    const pdf = readFileSync(resumeArtifact.pdfPath);
    if (sha256(source) !== resumeArtifact.sourceSha256) {
      findings["KB-009"].push("resume HTML changed without artifact review");
    }
    if (sha256(extractedText) !== resumeArtifact.extractedTextSha256) {
      findings["KB-009"].push("resume text extraction changed without artifact review");
    }
    if (sha256(pdf) !== resumeArtifact.pdfSha256) {
      findings["KB-009"].push("downloadable resume PDF changed without artifact review");
    }
    for (const phrase of resumeArtifact.requiredText) {
      if (!normalizedText(source).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume source omits required governed wording: ${phrase}`);
      }
      if (!normalizedText(extractedText).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume PDF text omits required governed wording: ${phrase}`);
      }
    }
    for (const phrase of resumeArtifact.prohibitedText) {
      if (normalizedText(source).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume source contains held wording: ${phrase}`);
      }
      if (normalizedText(extractedText).includes(normalizedText(phrase))) {
        findings["KB-009"].push(`resume PDF text contains held wording: ${phrase}`);
      }
    }
    const visibleSource = decodedHtmlText(source);
    const derivedStatements = resumeSubstantiveStatements(source);
    const visibleBlocks = resumeVisibleBlocks(source);
    const generatedCssText = resumeCssGeneratedText(source);
    const visibleAttributeText = resumeVisibleAttributeText(source);
    const cssPublicTextRisks = resumeCssPublicTextRisks(source);
    const embeddedContentRisks = resumeEmbeddedContentRisks(source);
    const metadataText = resumeMetadataText(source);
    const manifestedStatements = resumeArtifact.statements.map((statement) =>
      normalizedText(statement.text)
    );
    const manifestedVisibleBlocks = [
      ...manifestedStatements,
      ...(resumeArtifact.presentationText ?? []).map(normalizedText)
    ].sort();
    if (
      derivedStatements.length !==
      resumeArtifact.expectedSubstantiveStatementCount
    ) {
      findings["KB-009"].push(
        `resume source contains ${derivedStatements.length} substantive statements; expected ${resumeArtifact.expectedSubstantiveStatementCount}`
      );
    }
    for (const statement of derivedStatements) {
      if (!manifestedStatements.includes(statement)) {
        findings["KB-009"].push(
          `resume source has unmanifested substantive statement: ${statement}`
        );
      }
    }
    for (const statement of manifestedStatements) {
      if (!derivedStatements.includes(statement)) {
        findings["KB-009"].push(
          `resume manifest contains a statement not derived from source: ${statement}`
        );
      }
    }
    if (visibleBlocks.length !== resumeArtifact.expectedVisibleBlockCount) {
      findings["KB-009"].push(
        `resume source contains ${visibleBlocks.length} visible blocks; expected ${resumeArtifact.expectedVisibleBlockCount}`
      );
    }
    if (
      JSON.stringify([...visibleBlocks].sort()) !==
      JSON.stringify(manifestedVisibleBlocks)
    ) {
      findings["KB-009"].push(
        "resume visible-block inventory differs from the governed statement and presentation manifests"
      );
    }
    if (generatedCssText.length > 0) {
      findings["KB-009"].push(
        "resume CSS-generated text is prohibited because it bypasses the visible-block manifest"
      );
    }
    const governedAttributeText = (resumeArtifact.visibleAttributeText ?? [])
      .map(normalizedText)
      .sort();
    if (
      visibleAttributeText.length !== resumeArtifact.expectedVisibleAttributeCount ||
      JSON.stringify([...visibleAttributeText].sort()) !==
        JSON.stringify(governedAttributeText)
    ) {
      findings["KB-009"].push(
        "resume visible attributes differ from the governed attribute manifest"
      );
    }
    if (cssPublicTextRisks.length > 0) {
      findings["KB-009"].push(
        `resume CSS contains public-text bypass channels: ${cssPublicTextRisks.join(", ")}`
      );
    }
    if (
      embeddedContentRisks.length !==
      resumeArtifact.expectedEmbeddedContentRiskCount
    ) {
      findings["KB-009"].push(
        `resume contains embedded public-content bypass channels: ${embeddedContentRisks.join(", ")}`
      );
    }
    if (
      JSON.stringify(metadataText) !==
      JSON.stringify(resumeArtifact.metadataText ?? [])
    ) {
      findings["KB-009"].push(
        "resume browser metadata differs from the governed metadata manifest"
      );
    }
    const regeneratedPdfText = execFileSync(
      "pdftotext",
      ["-layout", resumeArtifact.pdfPath, "-"],
      { encoding: "utf8", maxBuffer: 2 * 1024 * 1024 }
    );
    if (normalizedText(regeneratedPdfText) !== normalizedText(extractedText)) {
      findings["KB-009"].push(
        "tracked resume text does not match text regenerated from the public PDF"
      );
    }
    const resumeStatementIds = new Set();
    if (
      resumeArtifact.statements.length !==
      resumeArtifact.expectedSubstantiveStatementCount
    ) {
      findings["KB-009"].push(
        `resume manifest must contain ${resumeArtifact.expectedSubstantiveStatementCount} substantive statements`
      );
    }
    for (const statement of resumeArtifact.statements) {
      if (resumeStatementIds.has(statement.id)) {
        findings["KB-009"].push(`resume manifest duplicates statement ${statement.id}`);
      }
      resumeStatementIds.add(statement.id);
      const governedStatement = {
        ...statement,
        path: resumeArtifact.sourcePath,
        surface: "/resume"
      };
      findings["KB-009"].push(
        ...governedStatementFindings(
          governedStatement,
          bank,
          visibleSource,
          `resume statement ${statement.id}`
        )
      );
      if (!normalizedIncludes(extractedText, statement.pdfAnchor ?? statement.text)) {
        findings["KB-009"].push(`resume PDF text omits manifested statement ${statement.id}`);
      }
    }
    for (const id of requiredResumeStatementIds) {
      if (!resumeStatementIds.has(id)) {
        findings["KB-009"].push(`resume manifest omits consequential statement ${id}`);
      }
    }
  } catch (error) {
    findings["KB-009"].push(`resume artifact cannot be governed: ${error.message}`);
  }

  const projectClassifications = [
    ...collectiveProjectEntries,
    ...individualProjectEntries,
    ...mixedProjects.keys()
  ];
  if (
    projectClassifications.some(
      (project) => typeof project !== "string" || project.trim().length === 0
    )
  ) {
    findings["KB-007"].push("collective-credit policy has a blank project ID");
  }
  if (new Set(projectClassifications).size !== projectClassifications.length) {
    findings["KB-007"].push("collective-credit policy classifies a project more than once");
  }

  for (const item of bank.intake) {
    const linkedCount = item.sourceIds.length + item.claimIds.length + item.researchTaskIds.length;
    if (["captured", "triaged"].includes(item.status)) findings["KB-001"].push(`${item.id} has no completed disposition`);
    if (["decomposed", "integrated"].includes(item.status) && linkedCount === 0) findings["KB-001"].push(`${item.id} has no linked disposition`);
    if (item.status === "held" && item.notes.length === 0) findings["KB-001"].push(`${item.id} is held without a reason`);
    for (const id of item.sourceIds) if (!sourceIds.has(id)) findings["KB-005"].push(`${item.id} references missing source ${id}`);
    for (const id of item.claimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${item.id} references missing claim ${id}`);
    for (const id of item.researchTaskIds) if (!taskIds.has(id)) findings["KB-005"].push(`${item.id} references missing task ${id}`);
    for (const id of item.sourceIds) if (!assertionSourceIds.has(id)) findings["KB-003"].push(`${item.id} source ${id} has no atomic assertion`);
  }

  const serialized = JSON.stringify(bank);
  if (privateMarker.test(serialized)) findings["KB-002"].push("knowledge bank contains a private path or raw-source marker");
  for (const source of bank.sources) {
    const hasUrl = Boolean(source.canonicalUrl || source.archiveUrl || source.assetUrl);
    if (source.visibility === "public" && !hasUrl) findings["KB-002"].push(`${source.id} is public without a public URL`);
    if (source.visibility !== "public" && hasUrl) findings["KB-002"].push(`${source.id} exposes a URL for a non-public source`);
    if (!source.publicCitation) findings["KB-002"].push(`${source.id} lacks a public-safe citation`);
  }

  for (const assertion of bank.sourceAssertions) {
    if (!sourceIds.has(assertion.sourceId)) findings["KB-005"].push(`${assertion.id} references missing source ${assertion.sourceId}`);
    for (const id of assertion.candidateClaimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${assertion.id} references missing claim ${id}`);
    if (!assertion.publicSafe) findings["KB-002"].push(`${assertion.id} is marked unsafe in the public registry`);
  }

  for (const claim of bank.claims) {
    const confirmed = ["confirmed", "confirmed-with-boundary"].includes(claim.maturity);
    const directSupport = claim.evidence.some((item) => item.relationship === "direct-support");
    if (confirmed && !directSupport) findings["KB-004"].push(`${claim.id} is confirmed without direct support`);
    if (claim.projectionEligibility === "eligible" && !confirmed) findings["KB-004"].push(`${claim.id} is eligible before confirmation`);
    if (claim.maturity === "research-needed" && claim.projectionEligibility !== "hold") findings["KB-004"].push(`${claim.id} is research-needed but not held`);
    const projectIsCollective = collectiveProjects.has(claim.project);
    const projectIsIndividual = individualProjects.has(claim.project);
    const mixedPolicy = mixedProjects.get(claim.project);
    let policyRequiresCollective;
    if (projectIsCollective) policyRequiresCollective = true;
    else if (projectIsIndividual) policyRequiresCollective = false;
    else if (mixedPolicy) {
      const inCollective = mixedPolicy.collectiveClaims.includes(claim.id);
      const inIndividual = mixedPolicy.individualClaims.includes(claim.id);
      if (inCollective === inIndividual) {
        findings["KB-007"].push(`${claim.id} is not uniquely classified inside mixed project ${claim.project}`);
      } else {
        policyRequiresCollective = inCollective;
      }
    } else {
      findings["KB-007"].push(`${claim.id} belongs to unclassified project ${claim.project}`);
    }
    if (policyRequiresCollective === true && !claim.collectiveWork) findings["KB-007"].push(`${claim.id} is policy-scoped collective work but is not classified as collective`);
    if (policyRequiresCollective === false && claim.collectiveWork) findings["KB-007"].push(`${claim.id} is policy-scoped individual work but is classified as collective`);
    if (claim.collectiveWork && (claim.boundaries.some((item) => item.trim().length === 0) || claim.antiClaims.some((item) => item.trim().length === 0) || claim.boundaries.length === 0 || claim.antiClaims.length === 0)) findings["KB-007"].push(`${claim.id} lacks a substantive collective-credit boundary or anti-claim`);
    const assertionProjects = [
      ...new Set(bank.sourceAssertions
        .filter((assertion) => assertion.candidateClaimIds.includes(claim.id))
        .map((assertion) => assertion.project)
      )
    ];
    if (assertionProjects.length === 0) {
      const exceptionProject = unassertedIndividualClaims.get(claim.id);
      if (!exceptionProject) findings["KB-007"].push(`${claim.id} lacks a project-classification source assertion`);
      else if (exceptionProject !== claim.project) findings["KB-007"].push(`${claim.id} exception is pinned to ${exceptionProject}, not ${claim.project}`);
    } else {
      if (!assertionProjects.includes(claim.project)) findings["KB-007"].push(`${claim.id} project ${claim.project} conflicts with its source assertions`);
      if (unassertedIndividualClaims.has(claim.id)) findings["KB-007"].push(`${claim.id} has a stale unasserted-claim exception`);
    }
    for (const evidence of claim.evidence) if (!sourceIds.has(evidence.sourceId)) findings["KB-005"].push(`${claim.id} references missing source ${evidence.sourceId}`);
    for (const id of claim.researchInquiryIds) if (!inquiryIds.has(id)) findings["KB-005"].push(`${claim.id} references missing inquiry ${id}`);

    const publicActive = claim.projections.some((projection) => projection.status === "active" && publicProjectionKeys.has(projection.key));
    if (publicActive && claim.projectionEligibility !== "eligible") findings["KB-008"].push(`${claim.id} has an active public projection while held`);
    const hasEditorialDisposition = claim.projections.some((projection) =>
      ["active", "hold"].includes(projection.status)
    );
    if (claim.projectionEligibility === "eligible" && !hasEditorialDisposition) findings["KB-009"].push(`${claim.id} has no use-now or hold disposition`);
    const projectionKeys = new Set();
    for (const projection of claim.projections) {
      if (projectionKeys.has(projection.key)) {
        findings["KB-009"].push(`${claim.id} duplicates projection key ${projection.key}`);
      }
      projectionKeys.add(projection.key);
      findings["KB-009"].push(
        ...projectionRealizationFindings(bank, claim, projection)
      );
    }

    if (claim.maturity === "research-needed") {
      const hasTask = bank.researchTasks.some((task) => task.claimIds.includes(claim.id));
      const hasInquiry = claim.researchInquiryIds.length > 0;
      if (!hasTask && !hasInquiry) findings["KB-006"].push(`${claim.id} has no research task or inquiry`);
    }
  }

  for (const [project, mixedPolicy] of mixedProjects) {
    const classifiedClaims = [
      ...mixedPolicy.collectiveClaims,
      ...mixedPolicy.individualClaims
    ];
    if (
      classifiedClaims.some(
        (id) => typeof id !== "string" || id.trim().length === 0
      )
    ) {
      findings["KB-007"].push(`${project} mixed-project policy has a blank claim ID`);
    }
    if (new Set(classifiedClaims).size !== classifiedClaims.length) {
      findings["KB-007"].push(`${project} mixed-project policy classifies a claim more than once`);
    }
    for (const id of classifiedClaims) {
      if (!claimIds.has(id)) {
        findings["KB-007"].push(`collective-credit policy references missing claim ${id}`);
      }
    }
  }

  if ([...unassertedIndividualClaims].some(([id, project]) => typeof id !== "string" || id.trim().length === 0 || typeof project !== "string" || project.trim().length === 0)) {
    findings["KB-007"].push("unasserted individual-claim policy has a blank claim ID");
  }
  for (const [id, expectedProject] of unassertedIndividualClaims) {
    const claim = bank.claims.find((item) => item.id === id);
    if (!claim) findings["KB-007"].push(`unasserted individual-claim policy references missing claim ${id}`);
    else if (claim.project !== expectedProject || claim.collectiveWork || !individualProjects.has(claim.project)) findings["KB-007"].push(`${id} is not the expected individual-project exception`);
  }

  const pageIds = new Set();
  for (const page of bank.pages) {
    if (pageIds.has(page.id)) findings["KB-009"].push(`citation page ID ${page.id} is duplicated`);
    pageIds.add(page.id);
    const occurrenceIds = new Set();
    for (const occurrence of page.occurrences) {
      if (occurrenceIds.has(occurrence.id)) findings["KB-009"].push(`${page.id} duplicates occurrence ${occurrence.id}`);
      occurrenceIds.add(occurrence.id);
      const claim = bank.claims.find((item) => item.id === occurrence.claimId);
      const projection = claim?.projections.find(
        (item) => item.key === occurrence.projection
      );
      if (
        !projection ||
        projection.status !== "active" ||
        !projection.surfaces.includes(page.surface)
      ) {
        findings["KB-009"].push(`${page.id}/${occurrence.id} is disconnected from an active projection on ${page.surface}`);
      } else if (projection.citationRequired) {
        const renderableDirectSupport = new Set(
          claim.evidence
            .filter(
              (evidence) =>
                evidence.relationship === "direct-support" &&
                evidence.renderCitation &&
                bank.sources.some(
                  (source) =>
                    source.id === evidence.sourceId &&
                    source.visibility === "public"
                )
            )
            .map((evidence) => evidence.sourceId)
        );
        if (
          !occurrence.sourceIds.some((sourceId) =>
            renderableDirectSupport.has(sourceId)
          )
        ) {
          findings["KB-009"].push(
            `${page.id}/${occurrence.id} lacks renderable direct support`
          );
        }
      }
    }
  }

  for (const task of bank.researchTasks) {
    for (const id of task.sourceIds) if (!sourceIds.has(id)) findings["KB-005"].push(`${task.id} references missing source ${id}`);
    for (const id of task.claimIds) if (!claimIds.has(id)) findings["KB-005"].push(`${task.id} references missing claim ${id}`);
    if (task.status === "completed" && task.successCriteria.length === 0) findings["KB-006"].push(`${task.id} completed without success criteria`);
  }

  for (const correction of bank.corrections) if (!claimIds.has(correction.claimId)) findings["KB-005"].push(`${correction.id} references missing claim ${correction.claimId}`);
  for (const page of bank.pages) {
    for (const id of page.sourceOrder) if (!sourceIds.has(id)) findings["KB-005"].push(`${page.id} references missing source ${id}`);
    for (const occurrence of page.occurrences) {
      if (!claimIds.has(occurrence.claimId)) findings["KB-005"].push(`${page.id}/${occurrence.id} references missing claim ${occurrence.claimId}`);
      for (const id of occurrence.sourceIds ?? []) if (!sourceIds.has(id)) findings["KB-005"].push(`${page.id}/${occurrence.id} references missing source ${id}`);
    }
  }

  const allIds = [
    ...bank.intake.map((item) => item.id),
    ...bank.sources.map((item) => item.id),
    ...bank.sourceAssertions.map((item) => item.id),
    ...bank.claims.map((item) => item.id),
    ...bank.researchTasks.map((item) => item.id),
    ...bank.researchInquiries.map((item) => item.id),
    ...bank.corrections.map((item) => item.id)
  ];
  if (new Set(allIds).size !== allIds.length) findings["KB-005"].push("stable IDs are duplicated across record classes");
  if (assertionIds.size !== bank.sourceAssertions.length) findings["KB-005"].push("source assertion IDs are duplicated");

  const photoLeads = bank.intake.filter((item) => item.kind === "photo-lead");
  if (photoLeads.length === 0) findings["KB-010"].push("no photo-to-research intake path is represented");
  for (const item of photoLeads) {
    if (item.disposition !== "media-review" || item.researchTaskIds.length === 0) findings["KB-010"].push(`${item.id} bypasses media review or research routing`);
  }
  for (const source of bank.sources.filter((item) => item.kind === "participant-photograph")) {
    if (!source.media || source.media.publicDisplayStatus === "cleared" && source.media.rightsStatus !== "cleared") findings["KB-010"].push(`${source.id} lacks coherent rights and display controls`);
  }

  const evidence = {
    "KB-001": [`${bank.intake.length} intake records inspected`],
    "KB-002": [`${bank.sources.length} source records scanned for provenance and public safety`],
    "KB-003": [`${bank.sourceAssertions.length} atomic source assertions inspected`],
    "KB-004": [`${bank.claims.length} claims checked for maturity and eligibility`],
    "KB-005": ["all cross-record references and stable IDs checked"],
    "KB-006": [`${bank.researchTasks.length} research tasks and ${bank.researchInquiries.length} completed inquiries checked`],
    "KB-007": [`${bank.claims.filter((item) => item.collectiveWork).length} collective-work claims checked`],
    "KB-008": ["active public projections checked against claim eligibility"],
    "KB-009": ["eligible claims checked for explicit use-now or hold disposition"],
    "KB-010": [`${photoLeads.length} photo lead and ${bank.sources.filter((item) => item.kind === "participant-photograph").length} participant-photo source checked`]
  };
  const hybridById = new Map(hybridResults.map((entry) => [entry.eval_id, entry]));
  const results = suite.evals.map((entry) => {
    const deterministic = makeResult(entry.id, findings[entry.id], evidence[entry.id]);
    if (entry.grader !== "hybrid") return deterministic;

    const hybrid = hybridById.get(entry.id);
    if (!hybrid) {
      return makeResult(
        entry.id,
        [...deterministic.findings, `${entry.id} requires an independent hybrid scorecard`],
        deterministic.evidence
      );
    }

    const combinedFindings = [...deterministic.findings, ...(hybrid.findings ?? [])];
    return {
      eval_id: entry.id,
      score: deterministic.pass ? hybrid.score : 0,
      pass: deterministic.pass && hybrid.pass === true,
      evidence: [...deterministic.evidence, ...(hybrid.evidence ?? [])],
      findings: combinedFindings,
      confidence: hybrid.confidence
    };
  });
  const weightedScore = results.reduce((total, result) => {
    const weight = suite.evals.find((entry) => entry.id === result.eval_id).weight;
    return total + weight * (result.score / suite.score_scale.maximum);
  }, 0) / 100;
  const failedBlocking = suite.evals.filter((entry) => entry.blocking && !results.find((result) => result.eval_id === entry.id).pass);
  const belowNonblockingMinimum = suite.evals.filter((entry) => {
    if (entry.blocking) return false;
    const result = results.find((item) => item.eval_id === entry.id);
    return result.score < suite.thresholds.nonblocking_score_minimum;
  });
  const thresholdPassed =
    weightedScore >= suite.thresholds.weighted_score_minimum &&
    failedBlocking.length === 0 &&
    belowNonblockingMinimum.length === 0;
  const status = thresholdPassed && consecutivePassingRuns >= 2 ? "threshold_met" : "iterate";

  return {
    suite_id: suite.suite_id,
    status,
    weighted_score: Number(weightedScore.toFixed(4)),
    consecutive_passing_runs: thresholdPassed ? consecutivePassingRuns : 0,
    next_eval_id:
      failedBlocking[0]?.id ??
      belowNonblockingMinimum[0]?.id ??
      results.find((result) => !result.pass)?.eval_id ??
      null,
    results
  };
}

async function run() {
  const suite = JSON.parse(readFileSync(suitePath, "utf8"));
  const validation = validateKnowledgeDevelopmentSuite(suite);
  if (validation.errors.length) {
    console.error("Knowledge-development suite validation failed:");
    for (const error of validation.errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const { knowledgeBank } = await import("../apps/www/src/data/knowledge-bank/records.ts");
  const consecutiveArg = process.argv.find((value) => value.startsWith("--consecutive="));
  const hybridArg = process.argv.find((value) => value.startsWith("--hybrid-report="));
  const consecutive = Number(consecutiveArg?.split("=")[1] ?? 1);
  const hybridReport = hybridArg
    ? JSON.parse(readFileSync(hybridArg.slice("--hybrid-report=".length), "utf8"))
    : { results: [] };
  const hybridCandidateErrors = hybridArg
    ? validateHybridReportCandidate(hybridReport)
    : [];
  if (hybridCandidateErrors.length) {
    console.error("Hybrid scorecard validation failed:");
    for (const error of hybridCandidateErrors) console.error(`- ${error}`);
    process.exit(1);
  }
  const result = evaluateKnowledgeBank(
    suite,
    knowledgeBank,
    consecutive,
    hybridReport.results
  );
  console.log(JSON.stringify(result, null, 2));
  if (result.results.some((entry) => !entry.pass)) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await run();
