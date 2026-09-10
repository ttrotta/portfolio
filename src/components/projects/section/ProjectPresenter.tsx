"use client";

import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { useSceneLifecycle } from "../../../lib/performance/frameCoordinator";
import { useRuntimeQuality } from "../../../lib/performance/quality";

import Rig from "./Rig";
import Carousel from "./Carousel";

export default function ProjectPresenter() {
  const [isMobile, setIsMobile] = useState(false);
  const quality = useRuntimeQuality();
  const { elementRef, visible } = useSceneLifecycle("projects-carousel");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      ref={elementRef}
      className="no-scrollbar h-[70vh] w-full max-w-[120vh] cursor-pointer overscroll-none md:h-[90vh]"
      data-lenis-prevent="true"
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 14 }}
        dpr={quality.dpr}
        frameloop={visible ? "always" : "never"}
        gl={{
          antialias: quality.antialias,
          powerPreference: "high-performance",
        }}
      >
        <Suspense>
          <ScrollControls
            pages={4}
            infinite={true}
            damping={0.4}
            horizontal={isMobile}
          >
            <Rig rotation={[0, 0, 0.1]}>
              <Carousel />
            </Rig>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
