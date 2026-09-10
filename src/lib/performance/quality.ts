import { useEffect, useState } from "react";

/**
 * Feature toggle resolved at build time from the LIGHTBULB env var.
 * Only the literal value "false" (case-insensitive) disables the lightbulb,
 * so a missing variable defaults to enabled.
 */
export const isLightbulbEnabled =
  process.env.LIGHTBULB?.trim().toLowerCase() !== "false";

export type RuntimeQuality = {
  tier: "high" | "medium" | "constrained";
  dpr: [number, number];
  particles: number;
  antialias: boolean;
  preloadBulb: boolean;
  renderBulb: boolean;
};

type RuntimeCapabilities = {
  width: number;
  dpr: number;
  memory?: number;
  cores?: number;
  saveData: boolean;
  reducedMotion: boolean;
  webgl: boolean;
};

const defaultCapabilities: RuntimeCapabilities = {
  width: 1280,
  dpr: 1,
  saveData: false,
  reducedMotion: false,
  webgl: true,
};

export function detectRuntimeCapabilities(): RuntimeCapabilities {
  if (typeof window === "undefined") return defaultCapabilities;

  const canvas = document.createElement("canvas");
  const webgl = Boolean(
    canvas.getContext("webgl2") || canvas.getContext("webgl"),
  );
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;

  return {
    width: window.innerWidth,
    dpr: window.devicePixelRatio || 1,
    memory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
    cores: navigator.hardwareConcurrency,
    saveData: connection?.saveData === true,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    webgl,
  };
}

export function getRuntimeQuality(
  capabilities: RuntimeCapabilities = detectRuntimeCapabilities(),
): RuntimeQuality {
  const constrained =
    !capabilities.webgl ||
    capabilities.saveData ||
    capabilities.reducedMotion ||
    (capabilities.memory !== undefined && capabilities.memory <= 2) ||
    (capabilities.cores !== undefined && capabilities.cores <= 2);
  const mobile = capabilities.width < 768;

  if (constrained) {
    return {
      tier: "constrained",
      dpr: [1, 1],
      particles: mobile ? 500 : 800,
      antialias: false,
      preloadBulb: false,
      renderBulb: capabilities.webgl && isLightbulbEnabled,
    };
  }

  if (mobile) {
    return {
      tier: "medium",
      dpr: [1, Math.min(capabilities.dpr, 1.5)],
      particles: 900,
      antialias: false,
      preloadBulb: isLightbulbEnabled,
      renderBulb: isLightbulbEnabled,
    };
  }

  return {
    tier: "high",
    dpr: [1, Math.min(capabilities.dpr, 2)],
    particles: 1500,
    antialias: true,
    preloadBulb: isLightbulbEnabled,
    renderBulb: isLightbulbEnabled,
  };
}

export function useRuntimeQuality() {
  const [quality, setQuality] = useState<RuntimeQuality>(() =>
    getRuntimeQuality(defaultCapabilities),
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => setQuality(getRuntimeQuality()));
    return () => cancelAnimationFrame(frame);
  }, []);

  return quality;
}
