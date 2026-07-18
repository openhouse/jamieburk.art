#!/usr/bin/env node
import { knowledgeReport, parseFlags, writeGeneratedReport } from "./lib/knowledge-tools.mjs";

const flags = parseFlags(process.argv.slice(2));
const report = knowledgeReport();
if (flags.write) console.log(`Wrote ${writeGeneratedReport("reports/generated/knowledge-lifecycle.md", report)}`);
else console.log(report);
