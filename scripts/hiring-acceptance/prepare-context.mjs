#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { buildHiringContext, cliSelection } from "./lib.mjs";

const options = cliSelection();
const context = await buildHiringContext(options);
const output = `${JSON.stringify(context, null, 2)}\n`;
if (options.output) writeFileSync(options.output, output);
else process.stdout.write(output);
