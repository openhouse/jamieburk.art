#!/usr/bin/env node

import { employmentHealth } from "./employment.mjs";

const health = employmentHealth();
for (const [gate, pass] of Object.entries(health.gates)) {
  process.stdout.write(`${pass ? "PASS" : "FAIL"} ${gate}\n`);
}
if (health.status !== "pass") process.exitCode = 1;
