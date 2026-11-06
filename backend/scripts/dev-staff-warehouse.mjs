import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {dirname,resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createServer} from 'node:net';
import {spawn,spawnSync} from 'node:child_process';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const backend=join(root,'backend');
const require=createRequire(join(backend,'package.json'));
const settings=require('dotenv').parse(readFileSync(join(backend,'.env')));
const url=new URL(process.env.DATABASE_URL ?? settings.DATABASE_URL);
if(!['localhost','127.0.0.1'].includes(url.hostname))throw Error('Demo requires local PostgreSQL');
url.pathname='/restaurant_integration_test';
const base={...settings,...process.env,NODE_ENV:'development',DATABASE_URL:url.toString(),COOKIE_SECURE:'false'};
const api='http://127.0.0.1:3020';
const warehousePort=process.env.WAREHOUSE_PORT ?? '3001';

// Never take over a running service or change the shared .env.
for(const port of [3020,Number(warehousePort),3003]){
  await new Promise((resolve,reject)=>{
    const probe=createServer();
    probe.once('error',()=>reject(Error('Port '+port+' is in use. Stop the old Staff/Warehouse demo before starting this command.')));
    probe.listen(port,'127.0.0.1',()=>probe.close(resolve));
  });
}
const generated=spawnSync(process.execPath,['node_modules/prisma/build/index.js','generate','--config','prisma7.config.ts'],{cwd:backend,env:base,stdio:'inherit'});
if(generated.status!==0)process.exit(generated.status??1);
const children=[];
let stopping=false;
function stop(code=0){
  if(stopping)return;
  stopping=true;
  for(const child of children){
    if(child.exitCode!==null||!child.pid)continue;
    if(process.platform==='win32')spawnSync('taskkill',['/PID',String(child.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});
    else child.kill('SIGTERM');
  }
  process.exit(code);
}
function start(cwd,args,extra={}){
  const child=spawn(process.execPath,args,{cwd,env:{...base,...extra},stdio:'inherit',windowsHide:true});
  children.push(child);
  child.on('error',error=>{console.error(error.message);stop(1);});
  child.on('exit',code=>{if(!stopping)stop(code??1);});
}
process.on('SIGINT',()=>stop());
process.on('SIGTERM',()=>stop());
console.log('DB test: restaurant_integration_test | Backend: 3020 | Staff: http://localhost:3003 | Warehouse: http://localhost:'+warehousePort);
start(backend,['node_modules/@nestjs/cli/bin/nest.js','start','--watch'],{PORT:'3020'});
start(join(root,'frontend/staff-app'),['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','3003'],{API_INTERNAL_URL:api});
start(join(root,'frontend/warehouse-web'),['node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port',warehousePort],{API_BASE_URL:api});
