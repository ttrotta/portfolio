"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import Rig from "./Rig";
import Carousel from "./Carousel";

export default function ProjectPresenter() {
  return (
    <div
      className="no-scrollbar h-[70vh] w-full max-w-[120vh] cursor-pointer overscroll-none md:h-[90vh]"
      data-lenis-prevent="true"
    >
      <Canvas camera={{ position: [0, 0, 100], fov: 14 }}>
        <Suspense>
          <ScrollControls pages={4} infinite={true} damping={0.4}>
            <Rig rotation={[0, 0, 0.1]}>
              <Carousel />
            </Rig>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
