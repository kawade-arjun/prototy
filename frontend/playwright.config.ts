import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3050',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx next start -p 3050',
    url: 'http://localhost:3050',
    reuseExistingServer: false,
    timeout: 30 * 1000,
  },
});
