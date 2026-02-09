"use client";

import { useRef, useMemo } from "react";
import { Mesh, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

interface GlowingSphereProps {
  position: [number, number, number];
  radius: number;
  color: string;
  opacity: number;
  isCore?: boolean;
  glowRef?: React.RefObject<Mesh | null>;
}

export function GlowingSphere({
  position,
  radius,
  color,
  opacity,
  isCore = false,
  glowRef,
}: GlowingSphereProps) {
  const meshRef = useRef<Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        opacity: { value: opacity },
        distortion: { value: isCore ? 0.05 : 0.15 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: isCore,
    });
  }, [color, opacity, isCore]);

  useFrame((state) => {
    const mat = (meshRef.current?.material || null) as ShaderMaterial | null;
    if (mat && mat.uniforms) mat.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      ref={glowRef || meshRef}
      position={position}
      material={shaderMaterial}
    >
      <sphereGeometry args={[radius, 32, 32]} />
    </mesh>
  );
}
