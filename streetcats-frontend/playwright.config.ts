import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'npm start',
    port: 4200,
    timeout: 120 * 1000
  },
  reporter: [['list'], ['html']]
});
