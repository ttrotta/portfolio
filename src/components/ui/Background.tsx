"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Lightbulb from "../lights/Lightbulb";
import { Particles } from "../particles/Particles";

export default function ModelBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <Environment preset="night" />
        <Particles />
        <Lightbulb />
      </Canvas>
    </div>
  );
}
