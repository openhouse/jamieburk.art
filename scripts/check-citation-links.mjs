#!/usr/bin/env node

import { loadKnowledgeBank } from "../apps/www/src/lib/knowledge-bank-runtime.mjs";

const { sources } = loadKnowledgeBank();
const urls = [...new Set(sources.flatMap((source) => [
  source.url,
  ...source.archiveUrls,
  ...source.mediaUrls
]).filter(Boolean))];
let unreachable = 0;

for (const url of urls) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if (response.status === 405) response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    if (!response.ok) {
      unreachable += 1;
      console.warn(`WARN ${response.status} ${url}`);
    } else {
      console.log(`OK ${response.status} ${url}`);
    }
  } catch (error) {
    unreachable += 1;
    console.warn(`WARN ${url} - ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    clearTimeout(timeout);
  }
}

console.log(`Citation link audit completed with ${unreachable} warning(s).`);
