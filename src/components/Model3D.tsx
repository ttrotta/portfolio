"use client";

import { useEffect, useRef } from "react";
import { useGLTF, Center } from "@react-three/drei";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { useFloatingAnimation } from "@/hooks/useFloatingAnimation";
import { useScrollRotation } from "@/hooks/useScrollAnimation";

export default function Model3D() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/tt.glb");

  useFloatingAnimation(groupRef);
  useScrollRotation(groupRef);

  // setting metal mesh
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        (child as Mesh).material = new MeshStandardMaterial({
          color: "#b0b0b0",
          roughness: 0.4,
          metalness: 1,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <Center>
        <primitive object={scene} scale={1.5} rotation={[0, 0, 0]} />
      </Center>
    </group>
  );
}

useGLTF.preload("/models/tt.glb");
