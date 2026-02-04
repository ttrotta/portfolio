import { useFrame } from "@react-three/fiber";
import { RefObject } from "react";
import { Group } from "three";

export function useFloatingAnimation(
  groupRef: RefObject<Group | null>,
  options: { speed: number; amplitude: number } = { speed: 1, amplitude: 0.1 },
) {
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    groupRef.current.position.y =
      Math.sin(t * options.speed) * options.amplitude;
  });
}
