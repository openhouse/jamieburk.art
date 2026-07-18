#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { renderProjectionMap } from "./lib/projection-map.mjs";

writeFileSync("docs/knowledge-bank/projection-map.md", renderProjectionMap());
console.log("Generated exact-route proof projection map.");
