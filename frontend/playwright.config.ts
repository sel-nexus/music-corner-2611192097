import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: 'static-hosting.spec.ts',
  fullyParallel: false,
  workers: 1,
  reporter: [['json', { outputFile: 'e2e-results.json' }], ['list']],
  use: {
    baseURL: 'http://127.0.0.1:4273',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4273',
    url: 'http://127.0.0.1:4273',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
