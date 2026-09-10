"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "../particles/Particles";
import { useRuntimeQuality } from "@/lib/performance/quality";
import { usePathname } from "next/navigation";
import { useSceneLifecycle } from "@/lib/performance/frameCoordinator";

export default function ProjectBackground() {
  const quality = useRuntimeQuality();
  const owner = usePathname();
  const { elementRef, visible } = useSceneLifecycle(owner);

  return (
    <div
      ref={elementRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={quality.dpr}
        gl={{
          antialias: quality.antialias,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Particles count={quality.particles} />
      </Canvas>
    </div>
  );
}
