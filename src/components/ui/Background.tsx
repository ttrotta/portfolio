"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import Model3D from "@/components/Model3D";
import { Particles } from "../particles/Particles";

export default function ModelBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <Environment preset="night" />
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[-5, 5, 5]}
          scale={[10, 10, 1]}
          color="white"
        />
        <Particles />
        <Model3D />
      </Canvas>
    </div>
  );
}
