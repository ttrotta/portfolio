"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
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
