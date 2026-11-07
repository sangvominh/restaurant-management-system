import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const backendDirectory = fileURLToPath(new URL('../', import.meta.url));
const migration = spawnSync(process.execPath, [require.resolve('prisma/build/index.js'), 'migrate', 'deploy', '--config', 'prisma7.config.ts'], {
  cwd: backendDirectory,
  stdio: 'inherit',
});
if (migration.error) console.error(migration.error.message);
if (migration.status !== 0) process.exit(migration.status ?? 1);
