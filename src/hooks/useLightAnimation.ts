"use client";
import { useEffect, useRef } from "react";
import { PointLight, Mesh } from "three";
import * as THREE from "three";
import { frameCoordinator } from "@/lib/performance/frameCoordinator";

export function useLightAnimation(enabled: boolean = true, owner = "global") {
  const pointLightRef = useRef<PointLight | null>(null);
  const sphereMeshRef = useRef<Mesh | null>(null);
  const glowRef = useRef<Mesh | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const startedAt = performance.now();
    const unsubscribe = frameCoordinator.subscribe((time) => {
      if (!pointLightRef.current || !glowRef.current) return;
      const pulse = (Math.sin((time - startedAt) / 3000) + 1) / 2;
      pointLightRef.current.intensity = 2 + pulse * 8;
      const glowMaterial = glowRef.current.material as THREE.ShaderMaterial;
      glowMaterial.uniforms.opacity.value = 0.2 + pulse * 0.3;
      glowRef.current.scale.setScalar(1 + pulse * 0.2);
    }, owner);

    return unsubscribe;
  }, [enabled, owner]);

  return { pointLightRef, sphereMeshRef, glowRef };
}
