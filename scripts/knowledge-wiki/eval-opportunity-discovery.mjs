#!/usr/bin/env node

import { evaluateOpportunityDiscovery } from "./employment.mjs";

const result = evaluateOpportunityDiscovery();
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
if (result.top_k_recall < 1 || result.precision < 1 || result.hard_screen_detection < 1 || !result.closed_roles_rejected || !result.below_floor_rejected) process.exitCode = 1;
