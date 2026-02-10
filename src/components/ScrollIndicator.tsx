"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { CiDesktopMouse2 } from "react-icons/ci";

export default function ScrollIndicator() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      gsap.to(".pulsation", {
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
        scale: 0.9,
        filter: "drop-shadow(0px 0px 12px rgba(255, 255, 255, 0.8))",
      });

      gsap.to(container.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "200px top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="fixed bottom-5 left-1/2 flex -translate-x-1/2"
    >
      <CiDesktopMouse2 className="pulsation h-8 w-8" />
    </div>
  );
}
