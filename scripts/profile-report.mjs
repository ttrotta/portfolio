import fs from "node:fs/promises";
import path from "node:path";

const directory = path.join(
  process.cwd(),
  "artifacts",
  "playwright",
  "profile",
);
const files = (await fs.readdir(directory).catch(() => []))
  .filter((file) => file.endsWith(".json"))
  .sort();

if (!files.length) {
  console.error("No profiling JSON found. Run `pnpm profile` first.");
  process.exitCode = 1;
} else {
  console.log(
    "Playwright profiling report (server navigation + browser emulation; hardware-GPU evidence is opt-in/qualified)\n",
  );
  for (const file of files) {
    const metrics = JSON.parse(
      await fs.readFile(path.join(directory, file), "utf8"),
    );
    console.log(`${metrics.project}`);
    console.log(`  browser: Chromium ${metrics.browser.version ?? "unknown"}`);
    console.log(`  execution: ${metrics.execution.gpuAttempt}`);
    console.log(`  GPU evidence: ${metrics.execution.hardwareGpuEvidence}`);
    for (const route of metrics.routeMetrics) {
      const navigation = route.navigation;
      console.log(
        `  ${route.phase} ${route.route} (HTTP ${route.serverStatus ?? "n/a"})`,
      );
      console.log(
        `    navigation=${navigation?.duration ?? "n/a"} ms | long-task max/count=${route.longTaskMaxMs ?? "n/a"}/${route.longTasks.length} | rAF mean/p95/dropped=${route.frameSample.meanMs?.toFixed(2) ?? "n/a"}/${route.frameSample.p95Ms?.toFixed(2) ?? "n/a"}/${route.frameSample.droppedOver16Ms}`,
      );
      console.log(
        `    DPR=${route.device.devicePixelRatio} | canvas=${route.canvasCount} | WebGL=${route.webgl.available ? (route.webgl.renderer ?? "available") : `unavailable (${route.webgl.reason})`} | duplicate URLs=${route.requests.duplicateUrls.length}`,
      );
      console.log(
        `    HDR requests: external=${route.requests.environment.externalHdrRequestCount} | local same-origin=${route.requests.environment.localHdrRequestCount}`,
      );
      if (route.requests.duplicateUrls.length)
        console.log(
          `    duplicates: ${route.requests.duplicateUrls.join(" | ")}`,
        );
    }
    if (metrics.diagnostics.length)
      console.log(`  diagnostics: ${metrics.diagnostics.join(" | ")}`);
    console.log(`  JSON: artifacts/playwright/profile/${file}\n`);
  }
  console.log(
    "Traces: artifacts/playwright/test-results (open with `pnpm exec playwright show-trace <trace.zip>`).",
  );
}
