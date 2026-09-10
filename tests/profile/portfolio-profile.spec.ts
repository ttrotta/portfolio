import { expect, test, type Page, type TestInfo } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

type RequestRecord = { url: string; method: string; resourceType: string };
type NavigationMetrics = Record<string, number | string | null>;
type RouteMetrics = {
  route: string;
  phase: "cold" | "warm";
  serverStatus: number | null;
  navigation: NavigationMetrics | null;
  requests: {
    total: number;
    byResourceType: Record<string, number>;
    duplicateUrls: string[];
  };
  longTasks: Array<{ startTime: number; duration: number }>;
  longTaskMaxMs: number | null;
  canvasCount: number;
  webgl: { available: boolean; renderer: string | null; reason: string | null };
  device: { devicePixelRatio: number; innerWidth: number; innerHeight: number };
  frameSample: {
    sampleCount: number;
    meanMs: number | null;
    p95Ms: number | null;
    droppedOver16Ms: number;
  };
};

type ProfileMetrics = {
  project: string;
  browser: { version: string | null; userAgent: string };
  execution: {
    headless: boolean;
    browserEmulation: string;
    gpuAttempt: string;
    hardwareGpuEvidence: string;
  };
  routeMetrics: RouteMetrics[];
  diagnostics: string[];
};

const projects = ["study-sessions", "sky-reach", "new-project"];

async function gotoRoute(page: Page, route: string) {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await page.goto(route, {
        waitUntil: "commit",
        timeout: 60_000,
      });
      await page.waitForLoadState("domcontentloaded", { timeout: 15_000 });
      return response;
    } catch (error) {
      lastError = error;
      if (attempt === 2) throw error;
      await page.waitForTimeout(500);
    }
  }
  throw lastError;
}

async function measureRoute(
  page: Page,
  route: string,
  phase: "cold" | "warm",
  collectBrowserMetrics = true,
) {
  const requests: RequestRecord[] = [];
  const onRequest = (request: import("@playwright/test").Request) =>
    requests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
    });
  page.on("request", onRequest);
  const serverNavigationStartedAt = Date.now();
  const response = await gotoRoute(page, route);
  const serverNavigationDuration = Date.now() - serverNavigationStartedAt;
  const metrics = collectBrowserMetrics
    ? await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0] as
          | PerformanceNavigationTiming
          | undefined;
        const frameSamples: number[] = [];
        let last = performance.now();

        return new Promise((resolve) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            const sorted = [...frameSamples].sort((a, b) => a - b);
            resolve({
              navigation: navigation
                ? {
                    startTime: navigation.startTime,
                    responseStart: navigation.responseStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd,
                    loadEventEnd: navigation.loadEventEnd,
                    duration: navigation.duration,
                  }
                : null,
              longTasks:
                (
                  window as Window & {
                    __profileLongTasks?: Array<{
                      startTime: number;
                      duration: number;
                    }>;
                  }
                ).__profileLongTasks ?? [],
              longTaskMaxMs: Math.max(
                0,
                ...(
                  (
                    window as Window & {
                      __profileLongTasks?: Array<{ duration: number }>;
                    }
                  ).__profileLongTasks ?? []
                ).map((entry) => entry.duration),
              ),
              canvasCount: document.querySelectorAll("canvas").length,
              webgl: (() => {
                const canvas = document.createElement("canvas");
                try {
                  const context =
                    canvas.getContext("webgl2") ?? canvas.getContext("webgl");
                  if (!context)
                    return {
                      available: false,
                      renderer: null,
                      reason: "No WebGL context was available",
                    };
                  const debug = context.getExtension(
                    "WEBGL_debug_renderer_info",
                  );
                  return {
                    available: true,
                    renderer: debug
                      ? context.getParameter(debug.UNMASKED_RENDERER_WEBGL)
                      : null,
                    reason: null,
                  };
                } catch (error) {
                  return {
                    available: false,
                    renderer: null,
                    reason: String(error),
                  };
                }
              })(),
              device: {
                devicePixelRatio: window.devicePixelRatio,
                innerWidth,
                innerHeight,
              },
              frameSample: {
                sampleCount: frameSamples.length,
                meanMs: frameSamples.length
                  ? frameSamples.reduce((sum, value) => sum + value, 0) /
                    frameSamples.length
                  : null,
                p95Ms: frameSamples.length
                  ? sorted[
                      Math.min(
                        sorted.length - 1,
                        Math.floor(sorted.length * 0.95),
                      )
                    ]
                  : null,
                droppedOver16Ms: frameSamples.filter((value) => value > 16.67)
                  .length,
              },
            });
          };
          const sample = (now: number) => {
            frameSamples.push(now - last);
            last = now;
            if (frameSamples.length < 61) requestAnimationFrame(sample);
            else finish();
          };
          requestAnimationFrame(sample);
          setTimeout(finish, 5_000);
        });
      })
    : {
        navigation: { duration: serverNavigationDuration },
        longTasks: [],
        longTaskMaxMs: null,
        canvasCount: 0,
        webgl: {
          available: false,
          renderer: null,
          reason:
            "In-page sampling skipped for isolated navigation capture; server/request metrics remain valid",
        },
        device: {
          devicePixelRatio: 1,
          innerWidth: page.viewportSize()?.width ?? 0,
          innerHeight: page.viewportSize()?.height ?? 0,
        },
        frameSample: {
          sampleCount: 0,
          meanMs: null,
          p95Ms: null,
          droppedOver16Ms: 0,
        },
      };

  page.off("request", onRequest);
  const counts = new Map<string, number>();
  const byResourceType: Record<string, number> = {};
  for (const request of requests) {
    counts.set(request.url, (counts.get(request.url) ?? 0) + 1);
    byResourceType[request.resourceType] =
      (byResourceType[request.resourceType] ?? 0) + 1;
  }

  const duplicateUrls = [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([url, count]) => `${count}x ${url}`)
    .sort();
  return {
    ...(metrics as Omit<
      RouteMetrics,
      "route" | "phase" | "serverStatus" | "requests"
    >),
    route,
    phase,
    serverStatus: response?.status() ?? null,
    requests: { total: requests.length, byResourceType, duplicateUrls },
  } satisfies RouteMetrics;
}

async function collectMetrics(
  page: Page,
  routeMetrics: RouteMetrics[],
  diagnostics: string[],
  testInfo: TestInfo,
) {
  const browser = {
    version: page.context().browser()?.version() ?? null,
    userAgent: await page.evaluate(() => navigator.userAgent),
  };
  const headless = process.env.PROFILE_HEADLESS !== "false";
  const output: ProfileMetrics = {
    project: testInfo.project.name,
    browser,
    execution: {
      headless,
      browserEmulation: testInfo.project.name.includes("mobile")
        ? "Pixel 7 viewport/user-agent emulation"
        : "Desktop Chrome viewport emulation",
      gpuAttempt: headless
        ? "Headless Chromium default (SwiftShader/headless output is diagnostic)"
        : "Headed Chromium with --use-angle=d3d11 attempt",
      hardwareGpuEvidence: headless
        ? "Not established: headed hardware-GPU attempt was not enabled"
        : "Attempt only; verify WebGL renderer and host GPU availability",
    },
    routeMetrics,
    diagnostics,
  };

  const outputPath = path.join(
    process.cwd(),
    "artifacts",
    "playwright",
    "profile",
    `${testInfo.project.name}.json`,
  );
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `${JSON.stringify(output, null, 2)}\n`,
    "utf8",
  );
  await testInfo.attach("profile-metrics.json", {
    path: outputPath,
    contentType: "application/json",
  });
}

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    const longTasks: Array<{ startTime: number; duration: number }> = [];
    (
      window as Window & { __profileLongTasks?: typeof longTasks }
    ).__profileLongTasks = longTasks;
    if ("PerformanceObserver" in window) {
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            longTasks.push({
              startTime: entry.startTime,
              duration: entry.duration,
            });
        }).observe({ type: "longtask", buffered: true });
      } catch {
        // Long-task entries are optional in browser contexts.
      }
    }
  });
});

test("profile desktop and emulated-mobile portfolio journeys", async ({
  page: initialPage,
}, testInfo) => {
  let page = initialPage;
  const context = page.context();
  const diagnostics: string[] = [];
  const routeMetrics: RouteMetrics[] = [];

  for (const locale of ["en", "es"]) {
    const collectHomeBrowserMetrics = locale === "en";
    routeMetrics.push(
      await measureRoute(page, `/${locale}`, "cold", collectHomeBrowserMetrics),
    );
    await page.close();
    page = await context.newPage();
    const warmHome = await measureRoute(
      page,
      `/${locale}`,
      "warm",
      collectHomeBrowserMetrics,
    );
    routeMetrics.push(warmHome);
    expect(
      warmHome.serverStatus === 200,
      `Home route /${locale} did not return a successful response`,
    ).toBeTruthy();
    diagnostics.push(
      `${locale}: carousel canvas remains non-addressable; no synthetic click pass is claimed`,
    );
    diagnostics.push(
      `${locale}: pagination DOM selectors exist, but animated transition clicks are excluded from isolated navigation evidence`,
    );

    const projectRoute = `/${locale}/projects/${projects[0]}`;
    const coldProjectPage = await context.newPage();
    routeMetrics.push(
      await measureRoute(coldProjectPage, projectRoute, "cold", false),
    );
    await coldProjectPage.close();
    const warmProjectPage = await context.newPage();
    const warmProject = await measureRoute(
      warmProjectPage,
      projectRoute,
      "warm",
      false,
    );
    routeMetrics.push(warmProject);
    expect(
      warmProject.serverStatus === 200,
      `Project route /${locale}/projects/${projects[0]} failed`,
    ).toBeTruthy();
    await warmProjectPage.close();
    if (locale === "en") {
      await page.close();
      page = await context.newPage();
    }
  }

  await collectMetrics(page, routeMetrics, diagnostics, testInfo);
  await testInfo.attach("diagnostics.txt", {
    body: diagnostics.join("\n") || "No optional-selector diagnostics.",
    contentType: "text/plain",
  });
});
