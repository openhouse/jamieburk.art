#!/usr/bin/env node

import { readRetrievalTasks } from "./lib.mjs";

const json = process.argv.includes("--json");
const tasks = readRetrievalTasks();

if (json) {
  console.log(JSON.stringify({ status: "protocol-only", tasks }, null, 2));
} else {
  console.log("Knowledge Wiki retrieval tasks (protocol only; no human result is implied):");
  tasks.forEach((task, index) => console.log(`${index + 1}. ${task}`));
}
