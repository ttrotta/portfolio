"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, ReactNode } from "react";
import { EasePack } from "gsap/EasePack";
import { frameCoordinator } from "@/lib/performance/frameCoordinator";

gsap.registerPlugin(ScrollTrigger, SplitText, EasePack);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const unsubscribe = frameCoordinator.subscribe((time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.5,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
