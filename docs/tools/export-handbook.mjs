import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const pages=JSON.parse(await readFile(resolve(root,'navigation.json'),'utf8'));
const chapters=pages.filter(p=>Number.isInteger(p.handbookOrder)).sort((a,b)=>a.handbookOrder-b.handbookOrder);
const bodies=await Promise.all(chapters.map(async p=>{
  const s=(await readFile(resolve(root,'content',p.path),'utf8')).replaceAll('\r\n','\n');
  return s.replace(/^---\n[\s\S]*?\n---\n/,'').replace(/<DocMeta\s*\/>\s*/g,'').replace(/^(#{1,5}) /gm,'#$1 ').trim();
}));
const content='# HỒ SƠ DỰ ÁN — HỆ THỐNG QUẢN LÝ NHÀ HÀNG\n\n> Bản tổng hợp tự sinh. Chỉnh sửa các trang trong docs/content/, không sửa trực tiếp file này. Chạy `npm run export` trong thư mục docs để đồng bộ.\n\n'+bodies.join('\n\n---\n\n')+'\n';
await writeFile(resolve(root,'PROJECT_HANDBOOK.md'),content);
await mkdir(resolve(root,'content/public'),{recursive:true});
await writeFile(resolve(root,'content/public/handbook.md'),content);
console.log(`Exported ${chapters.length} chapters from canonical pages.`);
