#!/usr/bin/env node

import { loadCitationData } from "./check-citations.mjs";

const timeoutMs = 12_000;
const sources = loadCitationData().sources.filter((source) => source.visibility === "public");
const links = sources.flatMap((source) => source.links.map((link) => ({ source, link })));
let failures = 0;

for (const { source, link } of links) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(link.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "jamieburk.art citation link audit" }
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(link.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "jamieburk.art citation link audit" }
      });
    }
    if (response.ok) {
      console.log(`OK ${response.status} ${source.id} ${link.url}`);
    } else {
      failures += 1;
      console.warn(`WARN ${response.status} ${source.id} ${link.url}`);
    }
  } catch (error) {
    failures += 1;
    console.warn(`WARN ${source.id} ${link.url}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    clearTimeout(timer);
  }
}

console.log(`Checked ${links.length} public citation links; ${failures} warning(s).`);
process.exitCode = 0;
