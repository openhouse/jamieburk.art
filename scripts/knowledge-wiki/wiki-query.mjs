#!/usr/bin/env node

import { compileKnowledgeWiki } from "./lib.mjs";

const valueOptions = new Set(["--id", "--kind", "--q", "--related", "--from", "--to", "--format"]);
const flagOptions = new Set(["--help"]);

function options(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (flagOptions.has(token)) { values.set(token, "true"); continue; }
    if (!valueOptions.has(token)) throw new Error(`Unknown option: ${token}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${token}`);
    values.set(token, value);
    index += 1;
  }
  return values;
}

function usage() {
  return `Usage: npm run wiki:query -- [--id ID] [--related ID] [--kind KIND] [--q TEXT] [--from ID --to ID] [--format table|json]

Examples:
  npm run wiki:query -- --id capability.technical-operations
  npm run wiki:query -- --related project.callnyc
  npm run wiki:query -- --from event.nycc.councilstat-hackathon-2016 --to method.source-backed-team-memory
  npm run wiki:query -- --id CLM-CALLNYC-HACKATHON-DATE-TIME --format json`;
}

function shortestPath(graph, from, to) {
  const nodeIds = new Set(graph.nodes.map((node) => node.id));
  if (!nodeIds.has(from)) throw new Error(`Unknown path start: ${from}`);
  if (!nodeIds.has(to)) throw new Error(`Unknown path end: ${to}`);
  const queue = [from];
  const previous = new Map([[from, null]]);
  while (queue.length) {
    const current = queue.shift();
    if (current === to) break;
    for (const edge of graph.edges.filter((item) => item.from === current)) {
      if (previous.has(edge.to)) continue;
      previous.set(edge.to, { node: current, edge });
      queue.push(edge.to);
    }
  }
  if (!previous.has(to)) throw new Error(`No directed path from ${from} to ${to}`);
  const steps = [];
  let current = to;
  while (current !== from) {
    const item = previous.get(current);
    steps.unshift(item.edge);
    current = item.node;
  }
  return steps;
}

function run(argv) {
  const selected = options(argv);
  if (selected.has("--help")) { console.log(usage()); return; }
  const format = selected.get("--format") ?? "table";
  if (!["table", "json"].includes(format)) throw new Error(`Unknown format: ${format}`);
  const compiled = compileKnowledgeWiki();
  if (compiled.health.errors.length) throw new Error("Knowledge Wiki has structural errors; run npm run wiki:check");
  const byId = new Map(compiled.graph.nodes.map((node) => [node.id, node]));
  const from = selected.get("--from");
  const to = selected.get("--to");
  if ((from && !to) || (!from && to)) throw new Error("Path queries require both --from and --to");
  if (from && to) {
    const steps = shortestPath(compiled.graph, from, to);
    const pathResult = {
      graph_fingerprint: compiled.graph.fingerprint,
      from,
      to,
      hops: steps.length,
      steps: steps.map((edge) => ({ ...edge, from_title: byId.get(edge.from)?.title, to_title: byId.get(edge.to)?.title })),
    };
    if (format === "json") console.log(JSON.stringify(pathResult, null, 2));
    else {
      console.log(`${from}\t${byId.get(from)?.title}`);
      for (const edge of pathResult.steps) console.log(`  -> ${edge.type}\t${edge.to}\t${edge.to_title}`);
    }
    return;
  }
  const relatedId = selected.get("--related");
  const directIds = relatedId ? new Set(compiled.graph.edges.filter((edge) => edge.from === relatedId || edge.to === relatedId).flatMap((edge) => [edge.from, edge.to])) : null;
  const query = selected.get("--q")?.toLowerCase();
  const rows = compiled.graph.nodes
    .filter((node) => !selected.get("--id") || node.id === selected.get("--id"))
    .filter((node) => !selected.get("--kind") || node.kind === selected.get("--kind"))
    .filter((node) => !query || JSON.stringify(node).toLowerCase().includes(query))
    .filter((node) => !directIds || directIds.has(node.id))
    .map((node) => ({
      ...node,
      relations: compiled.graph.edges
        .filter((edge) => edge.from === node.id || edge.to === node.id)
        .map((edge) => ({ direction: edge.from === node.id ? "out" : "in", type: edge.type, node: edge.from === node.id ? edge.to : edge.from, title: byId.get(edge.from === node.id ? edge.to : edge.from)?.title ?? "[missing]" })),
    }));
  if (!rows.length) throw new Error("No Knowledge Wiki records matched the query");
  if (format === "json") console.log(JSON.stringify({ graph_fingerprint: compiled.graph.fingerprint, count: rows.length, results: rows }, null, 2));
  else {
    for (const row of rows) {
      console.log(`${row.id}\t${row.kind}\t${row.title}`);
      for (const relation of row.relations) console.log(`  ${relation.direction === "out" ? "->" : "<-"} ${relation.type}\t${relation.node}\t${relation.title}`);
    }
  }
}

try { run(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; }
