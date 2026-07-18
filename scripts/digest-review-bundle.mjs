#!/usr/bin/env node
import path from "node:path";
import {
  governedFilesAtRoot,
  governedInputDigestAtRoot,
  loadEvalContract
} from "./lib/eval-contract.mjs";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, item, index, all) => {
  if (item.startsWith("--")) pairs.push([item.slice(2), all[index + 1]]);
  return pairs;
}, []));

if (!args.root) throw new Error("--root is required");
const root = path.resolve(args.root);
const contract = loadEvalContract();

console.log(JSON.stringify({
  contractVersion: contract.version,
  root,
  fileCount: governedFilesAtRoot(root, contract).length,
  governedInputDigest: governedInputDigestAtRoot(root, contract)
}, null, 2));
