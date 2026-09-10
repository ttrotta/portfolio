import { RefObject, useEffect } from "react";
import { Group } from "three";
import { frameCoordinator } from "@/lib/performance/frameCoordinator";

export function useFloatingAnimation(
  groupRef: RefObject<Group | null>,
  options: { speed: number; amplitude: number } = { speed: 1, amplitude: 0.2 },
  owner = "global",
) {
  useEffect(() => {
    const start = performance.now();
    return frameCoordinator.subscribe((time) => {
      if (groupRef.current) {
        const elapsed = (time - start) / 1000;
        groupRef.current.position.y =
          Math.sin(elapsed * options.speed) * options.amplitude;
      }
    }, owner);
  }, [groupRef, options.amplitude, options.speed, owner]);
}
