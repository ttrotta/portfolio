"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Lightbulb from "../lights/Lightbulb";
import { Particles } from "../particles/Particles";
import { useRuntimeQuality } from "@/lib/performance/quality";
import { usePathname } from "next/navigation";
import { useSceneLifecycle } from "@/lib/performance/frameCoordinator";

export default function Background() {
  const quality = useRuntimeQuality();
  const owner = usePathname();
  const { elementRef, visible } = useSceneLifecycle(owner);

  return (
    <div ref={elementRef} className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={quality.dpr}
        gl={{
          antialias: quality.antialias,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <Environment preset="night" />
        <Particles count={quality.particles} />
        {quality.renderBulb && <Lightbulb />}
      </Canvas>
    </div>
  );
}
