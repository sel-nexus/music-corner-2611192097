import { defineConfig } from '@playwright/test';

const baseURL = process.env.MUSIC_CORNER_HOST_URL ?? 'http://127.0.0.1:8080';
const hostingUrl = new URL(baseURL);
const hostPort = hostingUrl.port || (hostingUrl.protocol === 'https:' ? '443' : '80');
const hostLifecycleScript = [
  'const { spawn } = require("node:child_process");',
  'const container = "music-corner-frontend";',
  `const host = spawn("docker", ["run", "--rm", "--name", container, "-p", "127.0.0.1:${hostPort}:80", "music-corner-frontend"], { stdio: "inherit" });`,
  'let stopping = false;',
  'const stop = () => { if (stopping) return; stopping = true; const cleanup = spawn("docker", ["stop", "--time", "5", container], { stdio: "ignore" }); cleanup.on("error", () => process.exit(1)); cleanup.on("close", (code) => process.exit(code === 0 ? 0 : 1)); };',
  'process.on("SIGINT", stop); process.on("SIGTERM", stop);',
  'host.on("error", () => process.exit(1));',
  'host.on("exit", (code) => { if (!stopping) process.exit(code ?? 1); });',
].join(" ");
const encodedHostLifecycleScript = Buffer.from(hostLifecycleScript).toString("base64");
export default defineConfig({
  testDir: './e2e',
  testMatch: 'static-hosting.spec.ts',
  outputDir: './hosting-test-results',
  fullyParallel: false,
  workers: 1,
  reporter: [['json', { outputFile: 'hosting-e2e-results.json' }], ['list']],
  webServer: {
    command: `node -e 'eval(Buffer.from("${encodedHostLifecycleScript}", "base64").toString())'`,
    url: `${baseURL}/healthz`,
    reuseExistingServer: false,
    timeout: 30_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 },
  },
  use: {
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
