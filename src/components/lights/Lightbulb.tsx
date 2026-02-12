"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";
import { useScrollChoreography } from "@/hooks/useScrollChoreography";
import { useLightAnimation } from "@/hooks/useLightAnimation";
import { useResponsiveScale } from "@/hooks/useResponsiveScale";
import LightWrapper from "./LightWrapper";
import { lightResponsiveConfig } from "@/configs/lightResponsiveConfig";

export default function Lightbulb() {
  const staticGroupRef = useRef<Group>(null);
  const animatedGroupRef = useRef<Group>(null);

  const { scene } = useGLTF("/models/lightbulb.glb");

  const { lbScale, sphereRadius, lbPosition, spherePosition } =
    useResponsiveScale(
      lightResponsiveConfig.mobile,
      lightResponsiveConfig.desktop,
    );

  useFloatingAnimation(animatedGroupRef);
  useScrollChoreography(animatedGroupRef);

  const { pointLightRef, sphereMeshRef, glowRef } = useLightAnimation(true);

  return (
    <group ref={staticGroupRef} position={lbPosition} rotation={[0, 0, -0.12]}>
      <group ref={animatedGroupRef}>
        <pointLight
          ref={pointLightRef}
          position={spherePosition}
          color="#fef254"
          intensity={2}
          distance={10}
          decay={2}
        />

        <LightWrapper
          spherePosition={spherePosition}
          sphereRadius={sphereRadius}
          sphereMeshRef={sphereMeshRef}
          glowRef={glowRef}
        />

        <primitive object={scene} scale={lbScale} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/lightbulb.glb");
