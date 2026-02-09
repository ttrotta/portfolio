"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PointLight, Mesh } from "three";

export function useLightAnimation(enabled: boolean = true) {
  const pointLightRef = useRef<PointLight | null>(null);
  const sphereMeshRef = useRef<Mesh | null>(null);
  const glowRef = useRef<Mesh | null>(null);

  useGSAP(
    () => {
      if (
        !enabled ||
        !pointLightRef.current ||
        !sphereMeshRef.current ||
        !glowRef.current
      )
        return;

      gsap.to(pointLightRef.current, {
        intensity: 10,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glowRef.current.material, {
        opacity: 0.5,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glowRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { dependencies: [enabled] },
  );

  return { pointLightRef, sphereMeshRef, glowRef };
}
