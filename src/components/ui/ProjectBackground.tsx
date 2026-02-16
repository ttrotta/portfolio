"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "../particles/Particles";

export default function ProjectBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
