#!/usr/bin/env node

import { spawnSync } from "node:child_process";

console.warn("`npm run knowledge-bank` is a compatibility alias; use `npm run wiki:check`.");
const result = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "wiki:check"], { stdio: "inherit" });
process.exitCode = result.status ?? 1;
