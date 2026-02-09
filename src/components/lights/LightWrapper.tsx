"use client";

import { GlowingSphere } from "./GlowingSphere";
import { Mesh } from "three";

interface LightWrapperProps {
  spherePosition: [number, number, number];
  sphereRadius: number;
  sphereMeshRef: React.RefObject<Mesh | null>;
  glowRef: React.RefObject<Mesh | null>;
}

export function LightWrapper({
  spherePosition,
  sphereRadius,
  sphereMeshRef,
  glowRef,
}: LightWrapperProps) {
  return (
    <>
      <GlowingSphere
        position={spherePosition}
        radius={sphereRadius * 0.8}
        color="#ffffff"
        opacity={0.9}
        isCore={true}
        glowRef={sphereMeshRef}
      />

      <GlowingSphere
        position={spherePosition}
        radius={sphereRadius * 1.1}
        color="#fef254"
        opacity={0.6}
      />

      <GlowingSphere
        position={spherePosition}
        radius={sphereRadius * 1.6}
        color="#fef254"
        opacity={0.25}
        glowRef={glowRef}
      />

      <GlowingSphere
        position={spherePosition}
        radius={sphereRadius * 2.2}
        color="#fef254"
        opacity={0.12}
      />

      <GlowingSphere
        position={spherePosition}
        radius={sphereRadius * 3}
        color="#fef254"
        opacity={0.04}
      />
    </>
  );
}

export default LightWrapper;
