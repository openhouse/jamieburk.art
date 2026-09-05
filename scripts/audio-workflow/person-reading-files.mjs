import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, renameSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { buildPersonReadings, METHOD, renderPersonPages, safeRelative, sha256 } from './person-readings.mjs';

function contained(root, relative) {
  safeRelative(relative);
  let cursor = root;
  for (const component of relative.split('/')) {
    cursor = path.join(cursor, component);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) throw new Error('symlink-not-allowed');
  }
  return cursor;
}

function discover(root, relative) {
  const directory = contained(root, relative);
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).sort((a,b)=>a.name.localeCompare(b.name,'en')).flatMap(item => {
    if (item.name.startsWith('.') || item.name === 'node_modules') return [];
    const child = `${relative}/${item.name}`;
    if (item.isSymbolicLink()) throw new Error('symlink-not-allowed');
    return item.isDirectory() ? discover(root, child) : /(?:transcript|repaired).*\.md$/i.test(item.name) ? [child] : [];
  });
}

export function runPersonReadings({ root, manifest_path: manifestPath, mode = 'plan', scope_source_ids: scope }) {
  if (!['plan','write','check'].includes(mode)) throw new Error('known-projection-mode-required');
  root = realpathSync(root);
  let config;
  try { config = JSON.parse(readFileSync(contained(root,'config/paired-workspace.private.json'),'utf8')); } catch { throw new Error('private-repository-required'); }
  if (config.role !== 'private' || config.repository_visibility !== 'PRIVATE') throw new Error('private-repository-required');
  const manifestBytes = readFileSync(contained(root, manifestPath),'utf8');
  const manifest = JSON.parse(manifestBytes);
  let queueHash = null;
  if (manifest.queue_path) {
    const bytes = readFileSync(contained(root,manifest.queue_path),'utf8');
    queueHash = sha256(bytes);
    const queue = JSON.parse(bytes);
    if (!Array.isArray(queue.candidates)) throw new Error('queue-candidates-required');
    for (const candidate of queue.candidates) {
      if (manifest.sources.some(source => source.id === candidate.id)) continue;
      manifest.sources.push({ id:candidate.id, date:candidate.date, context:`Queue metadata only: ${candidate.title}. Source body and speaker roster are not registered for this projection.`, path:manifest.queue_path, state:candidate.disposition==='held-participant-restriction'?'held-participant-restriction':'source-unavailable', speakers:{} });
    }
  }
  const registered = new Set(manifest.sources.map(s => s.path).filter(Boolean));
  const superseded = new Set(manifest.superseded_paths ?? []);
  for (const file of superseded) safeRelative(file);
  for (const relative of manifest.transcript_roots ?? []) {
    for (const file of discover(root, relative)) {
      if (registered.has(file) || superseded.has(file)) continue;
      registered.add(file);
      manifest.sources.push({ id:`SRC-DISCOVERED-${sha256(file).slice(0,20)}`, path:file, date:'unknown', context:'New transcript discovered inside the authorized local source roots. Event date, situation, speaker identity, and restrictions require review.', state:'available', speakers:{}, excluded_ranges:[], discovery_review_pending:true });
    }
  }
  for (const source of manifest.sources) if (source.path) contained(root,source.path);
  const result = buildPersonReadings(manifest, file => readFileSync(contained(root,file),'utf8'));
  if (scope !== undefined) {
    if (!Array.isArray(scope) || !scope.length || new Set(scope).size !== scope.length) throw new Error('job-source-scope-required');
    if (scope.some(id=>!result.sources.some(source=>source.id===id))) throw new Error('job-source-unresolved');
  }
  // Newly discovered material receives links and an identity gap; do not quote it
  // until its source restrictions have been recorded by the operator.
  for (const source of manifest.sources.filter(s => s.discovery_review_pending || (s.state==='available' && s.restrictions_reviewed_sha256 !== result.sources.find(item=>item.id===s.id)?.sha256))) {
    for (const entry of result.entries.filter(e => e.source_id === source.id)) {
      entry.status = 'held-source-review'; entry.citations = []; entry.interpretation = '';
    }
  }
  const pages = renderPersonPages(result, manifest);
  const outputDir = contained(root,manifest.output_dir);
  if (Object.keys(pages).some(file => registered.has(file) || file === manifestPath)) throw new Error('source-output-overlap');
  const receiptPath = `${manifest.output_dir}/projection.json`;
  const candidateFingerprint = sha256(JSON.stringify({ method:METHOD, manifest:manifestBytes, queue_sha256:queueHash, sources:result.sources, implementation:sha256(readFileSync(new URL('./person-readings.mjs',import.meta.url))), runtime:sha256(readFileSync(new URL('./person-reading-files.mjs',import.meta.url))) }));
  const receipt = { method:METHOD, visibility:'private', candidate_fingerprint:candidateFingerprint, sources:result.sources, entries:result.entries.map(({interpretation,citations,...entry})=>({...entry,citation_count:citations.length})), pages:Object.fromEntries(Object.entries(pages).map(([file,body])=>[file,sha256(body)])), human_review_complete:false, publication_authorized:false };
  pages[receiptPath] = `${JSON.stringify(receipt,null,2)}\n`;
  let previous = {};
  const receiptAbsolute = contained(root,receiptPath);
  if (existsSync(receiptAbsolute)) previous = JSON.parse(readFileSync(receiptAbsolute,'utf8'));
  const stale = Object.entries(pages).filter(([file,body]) => !existsSync(contained(root,file)) || readFileSync(contained(root,file),'utf8') !== body);
  const extra = existsSync(outputDir) ? readdirSync(outputDir).filter(file => !Object.hasOwn(pages,`${manifest.output_dir}/${file}`)) : [];
  if (mode === 'write' && extra.length) throw new Error('obsolete-or-unmanaged-output-requires-review');
  if (mode === 'write') {
    // Validate every overwrite before any write. Source files are never targets.
    for (const [file] of stale.filter(([file])=>file !== receiptPath)) {
      const absolute = contained(root,file);
      if (existsSync(absolute) && previous.pages?.[file] !== sha256(readFileSync(absolute))) throw new Error('generated-page-modified');
    }
    for (const [file,body] of stale) {
      const absolute=contained(root,file); mkdirSync(path.dirname(absolute),{recursive:true});
      const temporary=`${absolute}.tmp-${process.pid}`;
      writeFileSync(temporary,body,{flag:'wx'}); renameSync(temporary,absolute);
    }
  }
  const selectedSources = scope ? result.sources.filter(s=>scope.includes(s.id)) : result.sources;
  const selectedEntries = scope ? result.entries.filter(e=>scope.includes(e.source_id)) : result.entries;
  const complete = selectedSources.length>0 && selectedSources.every(s=>s.status==='available' && s.speaker_count>0) && selectedEntries.length>0 && selectedEntries.every(e=>e.status==='close-reading-candidate' && e.identity_status!=='unresolved-no-simulation');
  return { method:METHOD, dry_run:mode==='plan', projection_current:mode==='write' || (stale.length===0 && extra.length===0), write_count:mode==='write'?stale.length:0, stale_file_count:stale.length+extra.length, source_count:selectedSources.length, entry_count:selectedEntries.length, close_reading_candidate_count:selectedEntries.filter(e=>e.status==='close-reading-candidate').length, unresolved_identity_count:selectedEntries.filter(e=>e.identity_status==='unresolved-no-simulation').length, held_source_count:selectedSources.filter(s=>s.status!=='available').length, complete, human_review_complete:false, candidate_fingerprint:candidateFingerprint };
}
