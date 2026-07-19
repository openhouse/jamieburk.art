#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bindingPath = path.join(repoRoot, "docs/knowledge-bank/projection-surface-bindings.json");
const appRoot = path.join(repoRoot, "apps/www/src/app");
const discoverableNames = new Set([
  "page.tsx",
  "route.ts",
  "layout.tsx",
  "not-found.tsx",
  "opengraph-image.tsx",
  "robots.ts",
  "sitemap.ts",
]);

function walk(directory) {
  const results = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...walk(absolute));
    if (entry.isFile()) results.push(absolute);
  }
  return results;
}

export function validateProjectionBindings(bindings, root = repoRoot) {
  const errors = [];
  const add = (condition, message) => {
    if (!condition) errors.push(message);
  };
  add(bindings.version === 1, "bindings.version must be 1");
  add(bindings.defaultPolicy === "deny", "projection defaultPolicy must be deny");
  add(Array.isArray(bindings.prohibitedRoutes) && bindings.prohibitedRoutes.length >= 3, "prohibitedRoutes must be explicit");
  add(Array.isArray(bindings.surfaces) && bindings.surfaces.length > 0, "surfaces must be non-empty");

  const ids = new Set();
  const paths = new Set();
  for (const [index, surface] of (bindings.surfaces ?? []).entries()) {
    const label = `surfaces[${index}]`;
    add(/^[a-z0-9-]+$/.test(surface.id ?? ""), `${label}.id is invalid`);
    add(!ids.has(surface.id), `${label}.id is duplicated`);
    ids.add(surface.id);
    add(typeof surface.path === "string" && surface.path.length > 0, `${label}.path is required`);
    add(!paths.has(surface.path), `${label}.path is duplicated`);
    paths.add(surface.path);
    add(typeof surface.routePattern === "string" && surface.routePattern.length > 0, `${label}.routePattern is required`);
    add(typeof surface.rendersProfessionalClaims === "boolean", `${label}.rendersProfessionalClaims must be boolean`);
    add(typeof surface.evidencePolicy === "string" && surface.evidencePolicy.length > 0, `${label}.evidencePolicy is required`);
    add(typeof surface.citationPolicy === "string" && surface.citationPolicy.length > 0, `${label}.citationPolicy is required`);
    add(Array.isArray(surface.allowedDataSources), `${label}.allowedDataSources must be an array`);
    if (surface.rendersProfessionalClaims) {
      add(surface.allowedDataSources?.length > 0, `${label} renders claims without an allowed data source`);
      add(surface.citationPolicy !== "not-applicable", `${label} renders claims without citation policy`);
    }
    const absolute = path.join(root, surface.path);
    add(existsSync(absolute), `${surface.path} does not exist`);
  }

  const discovered = walk(path.join(root, "apps/www/src/app"))
    .filter((file) => discoverableNames.has(path.basename(file)))
    .map((file) => path.relative(root, file));
  for (const file of discovered) add(paths.has(file), `Unbound claim-capable app surface: ${file}`);

  for (const route of bindings.prohibitedRoutes ?? []) {
    const routeDirectory = path.join(root, "apps/www/src/app", route.replace(/^\//, ""));
    add(!existsSync(routeDirectory), `Prohibited public route exists: ${route}`);
  }

  const serialized = JSON.stringify(bindings);
  add(!/\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|raw-otter/i.test(serialized), "Projection bindings contain a private locator");
  const registryPath = path.join(root, "apps/www/src/data/knowledge-bank/public-registry.json");
  if (existsSync(registryPath)) {
    const registry = readFileSync(registryPath, "utf8");
    add(!/"visibility"\s*:\s*"(?:private|protected)"/.test(registry), "Public registry contains private or protected source visibility");
  }

  return { errors, discovered, surfaceCount: bindings.surfaces?.length ?? 0 };
}

export function runProjectionCheck() {
  const bindings = JSON.parse(readFileSync(bindingPath, "utf8"));
  const result = validateProjectionBindings(bindings);
  if (result.errors.length) {
    console.error("Projection-integrity check failed:");
    result.errors.forEach((error) => console.error(`- ${error}`));
    return 1;
  }
  console.log(`Projection-integrity check passed: ${result.surfaceCount} bound surfaces, ${result.discovered.length} app surfaces discovered.`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = runProjectionCheck();
