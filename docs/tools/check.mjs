import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const pages=JSON.parse(await readFile(resolve(root,'navigation.json'),'utf8'));
const ids=new Set(), paths=new Set();
for(const page of pages){
  if(paths.has(page.path))throw Error(`Duplicate navigation: ${page.path}`);paths.add(page.path);
  const text=(await readFile(resolve(root,'content',page.path),'utf8')).replaceAll('\r\n','\n');
  if(!text.startsWith('---\n'))throw Error(`Missing frontmatter: ${page.path}`);
  const meta=text.split('---')[1];
  for(const field of ['id','specStatus','codeStatus','owner','reviewed','summary'])if(!new RegExp(`^${field}: .+`,'m').test(meta))throw Error(`Missing ${field}: ${page.path}`);
  const id=meta.match(/^id: (.+)$/m)[1];if(ids.has(id))throw Error(`Duplicate document ID: ${id}`);ids.add(id);
  if(/[A-Z]:[\\/]Users[\\/]/.test(text))throw Error(`Local path in public page: ${page.path}`);
  if(!/^# /m.test(text))throw Error(`Missing page title: ${page.path}`);
}
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='public')continue;const p=resolve(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name.endsWith('.md')){const rel=relative(resolve(root,'content'),p).replaceAll('\\','/');if(rel!=='index.md'&&!paths.has(rel))throw Error(`Orphan page; add to navigation.json: ${rel}`)}}}
await walk(resolve(root,'content'));
console.log(`Documentation check passed: ${pages.length} pages, unique IDs, metadata, navigation, no local user paths.`);
