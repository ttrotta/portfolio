"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Rig from "./Rig";
import Carousel from "./Carousel";

export default function ProjectPresenter() {
  return (
    <div className="h-screen w-full" data-lenis-prevent>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <Suspense>
          {/* <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          /> */}
          {/* <fog attach="fog" args={["white", 8.5, 12]} /> */}
          <ScrollControls pages={4} infinite={true} damping={0.4}>
            <Rig rotation={[0, 0, 0.1]}>
              <Carousel />
            </Rig>
            {/* <Banner position={[0, -0.15, 0]} /> */}
          </ScrollControls>
          {/* <Environment preset="city" blur={0.5} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
