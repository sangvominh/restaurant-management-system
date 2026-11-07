import { existsSync, mkdirSync, openSync, closeSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const action = process.argv[2];
if (!existsSync(new URL("../backend/.env", import.meta.url)))
  throw new Error("Copy backend/.env.example thành backend/.env trước.");
const demo = action?.startsWith("demo-");
const env = {
  ...process.env,
  DATABASE_NAME: "restaurant_dev",
  ...(demo
    ? { DATABASE_NAME: "restaurant_demo", DB_PORT: "5434", API_PORT: "3010" }
    : {}),
};
const compose = [
  "compose",
  "-f",
  "docker-compose.yml",
  "-p",
  demo ? "restaurant-demo" : "restaurant-integrated",
];
function run(args) {
  const result = spawnSync("docker", [...compose, ...args], {
    cwd: root,
    env,
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
const commands = {
  up: ["up", "-d", "--build", "--wait", "--wait-timeout", "180"],
  stop: ["stop"],
  down: ["down"],
  status: ["ps", "-a"],
  logs: ["logs", "-f", "--tail", "100"],
  migrate: ["run", "--rm", "backend-init"],
  bootstrap: [
    "run",
    "--rm",
    "--no-deps",
    "backend-init",
    "node",
    "scripts/database.mjs",
    "bootstrap",
  ],
  "demo-stop": ["stop"],
  "demo-clean": ["down", "--volumes"],
};
if (action === "backup") {
  const directory = join(root, "backups");
  mkdirSync(directory, { recursive: true });
  const target = join(
    directory,
    `restaurant_dev-${new Date().toISOString().replace(/[:.]/g, "-")}.dump`,
  );
  const fd = openSync(target, "wx");
  let result;
  try {
    result = spawnSync(
      "docker",
      [
        ...compose,
        "exec",
        "-T",
        "db",
        "pg_dump",
        "-U",
        "restaurant",
        "-Fc",
        "restaurant_dev",
      ],
      { cwd: root, env, stdio: ["ignore", fd, "inherit"] },
    );
  } finally {
    closeSync(fd);
  }
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`Database backup: ${target}`);
} else if (action === "demo-rebuild") {
  if (!process.env.DEMO_PASSWORD)
    throw new Error(
      "Đặt DEMO_PASSWORD trước; không có mật khẩu demo mặc định.",
    );
  // Only this explicitly named disposable project is removed. The normal project is untouched.
  run(["down", "--volumes"]);
  run(commands.up);
  run([
    "run",
    "--rm",
    "--no-deps",
    "-e",
    "DEMO_PASSWORD",
    "backend-init",
    "node",
    "scripts/database.mjs",
    "demo",
  ]);
} else {
  if (!Object.hasOwn(commands, action))
    throw new Error(`Unknown command: ${action}`);
  run(commands[action]);
}
