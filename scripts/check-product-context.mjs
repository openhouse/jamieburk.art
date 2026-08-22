import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readText(root, relativePath, overrides) {
  if (relativePath === "PRODUCT.md" && overrides.productText !== undefined) {
    return overrides.productText;
  }
  return readFileSync(path.join(root, relativePath), "utf8");
}

function parseSections(markdown) {
  const sections = new Map();
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    sections.set(match[1].trim(), markdown.slice(start, end).trim());
  }
  return sections;
}

function containsEvery(text, patterns) {
  return patterns.every((pattern) => pattern.test(text));
}

export function evaluateProductContext(root = defaultRoot, overrides = {}) {
  const contract = JSON.parse(
    readText(root, "evals/product-context/product-context.json", overrides)
  );
  const product = readText(root, "PRODUCT.md", overrides);
  const sections = parseSections(product);
  const failures = [];
  const fail = (criterion, detail) => failures.push({ criterion, detail });
  const criterionIds = new Set(contract.criteria.map(({ id }) => id));
  const expectedCriteria = [
    "impeccable-schema",
    "durable-product-truth",
    "hiring-reader-job",
    "knowledge-wiki-mechanism",
    "authority-and-public-safety",
    "evidence-without-protected-locators"
  ];

  for (const criterion of expectedCriteria) {
    if (!criterionIds.has(criterion)) {
      fail(criterion, "The product-context contract omits this required criterion.");
    }
  }

  const platform = sections.get("Platform") ?? "";
  if (
    !product.includes("<!-- impeccable:product-schema 1 -->") ||
    platform !== "web" ||
    sections.has("Register")
  ) {
    fail(
      "impeccable-schema",
      "PRODUCT.md must use schema 1, declare Platform as web, and remove the deprecated Register section."
    );
  }

  const requiredSections = [
    "Users",
    "Product Purpose",
    "Positioning",
    "Operating Context",
    "Capabilities and Constraints",
    "Brand Commitments",
    "Evidence on Hand",
    "Product Principles",
    "Accessibility & Inclusion"
  ];
  const missingSections = requiredSections.filter(
    (heading) => !sections.get(heading)?.trim()
  );
  if (missingSections.length > 0) {
    fail(
      "durable-product-truth",
      `Missing durable product sections: ${missingSections.join(", ")}.`
    );
  }

  const userAndPurpose = `${sections.get("Users") ?? ""}\n${
    sections.get("Product Purpose") ?? ""
  }`;
  if (
    !containsEvery(userAndPurpose, [
      /hiring (?:reader|manager)/i,
      /limited time|time-pressed/i,
      /role fit/i,
      /next action|advance Jamie|interview/i
    ])
  ) {
    fail(
      "hiring-reader-job",
      "The record must state the time-pressed hiring-reader job, role-fit decision, and next action."
    );
  }

  const positioning = sections.get("Positioning") ?? "";
  if (
    !containsEvery(positioning, [
      /Knowledge Wiki Graph/i,
      /sources?[\s\S]*evidence|evidence[\s\S]*sources?/i,
      /portfolio/i,
      /application materials?/i,
      /selective|selection/i
    ])
  ) {
    fail(
      "knowledge-wiki-mechanism",
      "Positioning must name the Knowledge Wiki Graph and its source-to-evidence-to-public-material mechanism."
    );
  }

  const constraints = `${sections.get("Capabilities and Constraints") ?? ""}\n${
    sections.get("Product Principles") ?? ""
  }`;
  if (
    !containsEvery(constraints, [
      /access.*(?:is not|≠).*consent|access[^.]*consent/i,
      /collective credit/i,
      /publication/i,
      /deployment/i,
      /indexing/i,
      /Jamie(?:'s)? (?:explicit |human )?approval/i
    ])
  ) {
    fail(
      "authority-and-public-safety",
      "The record must keep consent, collective credit, publication, deployment, indexing, and Jamie approval as separate gates."
    );
  }

  const evidence = sections.get("Evidence on Hand") ?? "";
  if (
    !containsEvery(evidence, [
      /apps\/www\/src\/data\/proofs\.ts/,
      /docs\/knowledge-bank\//,
      /apps\/www\/src\/data\/photography\.ts/,
      /resumes?\//i
    ]) ||
    /\/Users\/|\/Volumes\/|private\/tmp|[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}/i.test(
      evidence
    )
  ) {
    fail(
      "evidence-without-protected-locators",
      "Evidence must name public-safe repository layers and omit protected locators."
    );
  }

  return {
    passed: failures.length === 0,
    contractId: contract.id,
    criterionCount: contract.criteria.length,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateProductContext();
  if (!result.passed) {
    for (const failure of result.failures) {
      console.error(`${failure.criterion}: ${failure.detail}`);
    }
    process.exitCode = 1;
  } else {
    console.log(
      `Product-context eval passed: ${result.criterionCount} blocking criteria (${result.contractId}).`
    );
  }
}
