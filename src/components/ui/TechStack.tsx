"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { techStack } from "@/data/stackData";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CABLE_D = [
  "M 0 80",
  "C 160 80, 320 90, 450 180",
  "C 620 300, 880 310, 1100 400",
  "C 1220 460, 1170 640, 960 770",
  "C 720 920, 320 850, 170 960",
  "C 60 1040, 60 1130, 240 1200",
  "C 470 1290, 870 1260, 1050 1380",
  "C 1200 1470, 1250 1560, 1400 1600",
].join(" ");

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const energyPathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = energyPathRef.current;
      if (!path) return;

      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative z-10 mt-20 w-full overflow-hidden py-48 md:py-64"
    >
      <svg
        className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full"
        viewBox="0 0 1200 1800"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="skills-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d={CABLE_D}
          stroke="#1a233a"
          strokeWidth="38"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
        />

        <path
          ref={energyPathRef}
          d={CABLE_D}
          stroke="#E1DB41"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          filter="url(#skills-glow)"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-2xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <p className="font-michroma mb-4 text-[0.6rem] tracking-[0.3em] text-neutral-400 uppercase md:text-xs">
            My preferred
          </p>
          <h2 className="font-heading text-5xl font-bold text-white md:text-7xl">
            Tech Stack
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4">
          {techStack.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center justify-center rounded-xl border border-neutral-800 bg-black p-4 transition-all duration-300 hover:border-neutral-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              title={skill.name}
            >
              <div
                className={`flex items-center justify-center rounded-xl p-2 ${skill.dark ? "bg-white" : ""}`}
              >
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
