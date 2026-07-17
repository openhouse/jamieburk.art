#!/usr/bin/env node
import { parseFlags, projectionMap, writeGeneratedReport } from "./lib/knowledge-tools.mjs";

const flags = parseFlags(process.argv.slice(2));
const report = projectionMap();
if (flags.write) console.log(`Wrote ${writeGeneratedReport("reports/generated/projection-map.md", report)}`);
else console.log(report);
