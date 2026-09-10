import { defineConfig, devices } from "@playwright/test";

const headed = process.env.PROFILE_HEADLESS === "false";

export default defineConfig({
  testDir: "./tests/profile",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["line"]],
  outputDir: "./artifacts/playwright/test-results",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    headless: !headed,
    launchOptions: {
      args: headed ? ["--use-angle=d3d11"] : [],
    },
    trace: "on",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-emulated-pixel-7",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
