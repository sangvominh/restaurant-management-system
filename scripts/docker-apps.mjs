import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const commands = {
  up: ['up', '-d', '--build', '--wait', '--wait-timeout', '180'],
  stop: ['stop'],
  down: ['down'],
  ps: ['ps', '-a'],
  logs: ['logs', '--follow', '--tail', '100'],
};
const action = process.argv[2];
if (!Object.hasOwn(commands, action) || process.argv.length !== 3) {
  console.error('Usage: node scripts/docker-apps.mjs <up|stop|down|ps|logs>');
  process.exit(1);
}
if (!existsSync(join(root, 'backend', '.env'))) {
  console.error('Missing backend/.env. Copy backend/.env.example, set JWT_SECRET and seed credentials, then retry.');
  process.exit(1);
}
const files = ['docker-compose.yml', 'docker-compose.apps.yml'];
const overrides = ['docker-compose.override.yml', 'docker-compose.override.yaml']
  .filter((file) => existsSync(join(root, file)));
if (overrides.length > 1) {
  console.error('Keep only one local Compose override file (.yml or .yaml).');
  process.exit(1);
}
files.push(...overrides);
const result = spawnSync('docker', ['compose', ...files.flatMap((file) => ['-f', file]), ...commands[action]], {
  cwd: root,
  stdio: 'inherit',
});
if (result.error) console.error(`Cannot run Docker: ${result.error.message}`);
process.exit(result.status ?? 1);
