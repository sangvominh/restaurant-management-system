import { spawnSync } from "node:child_process";

const npm = process.env.npm_execpath;
if (!npm) throw new Error("Chạy bằng npm run check.");
for (const args of [
  ["run", "build", "--workspace", "backend"],
  ["run", "test", "--workspace", "backend"],
  [
    "exec",
    "--workspace",
    "backend",
    "--",
    "vitest",
    "run",
    "--config",
    "vitest.config.e2e.ts",
  ],
  ["exec", "--workspace", "web-admin-system", "--", "tsc", "--noEmit"],
  ["run", "typecheck", "--workspace", "restaurant-staff"],
  ["exec", "--workspace", "guest-web", "--", "tsc", "--noEmit"],
]) {
  const result = spawnSync(process.execPath, [npm, ...args], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
