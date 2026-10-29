import { defineConfig } from '@playwright/test';

const baseURL = process.env.MUSIC_CORNER_HOST_URL ?? 'http://127.0.0.1:8080';

export default defineConfig({
  testDir: './e2e',
  testMatch: 'static-hosting.spec.ts',
  fullyParallel: false,
  workers: 1,
  reporter: [['json', { outputFile: 'hosting-e2e-results.json' }], ['list']],
  use: {
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
