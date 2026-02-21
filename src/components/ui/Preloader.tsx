"use client";

import { useEffect, useState, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress === 100) {
      timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [progress]);

  const handleSwitchClick = () => {
    if (!isLoaded || isSwitchedOn) return;

    setIsSwitchedOn(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(".switch-toggle", {
      rotationX: -12,
      boxShadow:
        "0 -15px 25px -5px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.9)",
      duration: 0.15,
      ease: "power2.inOut",
    })
      .to(
        textRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.in",
        },
        "+=0.2",
      )
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          opacity: 0,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.2",
      );
  };

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-neutral-950 text-white transition-colors duration-700 ${
        isLoaded ? "cursor-pointer" : "cursor-wait"
      }`}
      onClick={handleSwitchClick}
    >
      <div className="flex flex-col items-center gap-12">
        <div className="group relative h-48 w-48 sm:h-56 sm:w-56">
          <div
            className={`flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-neutral-200 to-neutral-400 p-0.5 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_3px_rgba(255,255,255,1)] transition-transform duration-500 ${
              isLoaded && !isSwitchedOn ? "group-hover:scale-[1.02]" : ""
            }`}
          >
            <div className="flex h-[96%] w-[96%] items-center justify-center rounded-xl bg-linear-to-br from-neutral-300 to-neutral-200 p-px shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]">
              <div
                className="relative h-[92%] w-[92%] rounded-lg bg-neutral-900 shadow-[inset_0_10px_20px_rgba(0,0,0,0.6),inset_0_-2px_5px_rgba(255,255,255,0.2)]"
                style={{ perspective: "800px" }}
              >
                <div
                  className="switch-toggle absolute inset-x-0.5 inset-y-0.5 overflow-hidden rounded-md border border-neutral-300/50 bg-linear-to-b from-neutral-100 to-neutral-300"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transform: "rotateX(12deg) scaleY(0.98)",
                    boxShadow:
                      "0 15px 25px -5px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-md bg-linear-to-b from-white/70 to-transparent"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md bg-linear-to-t from-neutral-400/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-full bg-white/5 blur-3xl transition-opacity duration-1000 ${
              isLoaded && !isSwitchedOn
                ? "animate-pulse opacity-100"
                : "opacity-0"
            }`}
          />
        </div>

        <div ref={textRef} className="mt-8 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="font-michroma text-5xl text-neutral-400 tabular-nums">
              {Math.floor(progress)}%
            </span>
          </div>

          <p
            className={`font-inter mt-4 text-sm tracking-wide transition-opacity duration-500 ${isLoaded ? "text-neutral-500 opacity-100" : "text-neutral-600 opacity-0"}`}
          >
            Click the switch to turn on the lights
          </p>
        </div>
      </div>
    </div>
  );
}
