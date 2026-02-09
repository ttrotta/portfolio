import { useState, useEffect } from "react";

interface ResponsiveConfig {
  lbScale: number;
  sphereRadius: number;
  lbPosition: [number, number, number];
  spherePosition: [number, number, number];
}

export function useResponsiveScale(
  mobileConfig: ResponsiveConfig,
  desktopConfig: ResponsiveConfig,
  breakpoint: number = 1020,
  debounceMs: number = 150,
) {
  const [config, setConfig] = useState<ResponsiveConfig>(() =>
    typeof window !== "undefined" && window.innerWidth <= breakpoint
      ? mobileConfig
      : desktopConfig,
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setConfig(
          window.innerWidth <= breakpoint ? mobileConfig : desktopConfig,
        );
      }, debounceMs);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [mobileConfig, desktopConfig, breakpoint, debounceMs]);

  return config;
}
