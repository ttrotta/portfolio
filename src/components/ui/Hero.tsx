"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      }).from(
        ".hero-btn",
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="h-screen flex flex-col bg-black justify-center px-10 md:px-24 overflow-hidden"
    >
      <main className="flex flex-col justify-center  font-heading">
        <h1 className="hero-line text-8xl font-heading font-bold tracking-tighter">
          THIAGO<span className="text-gray-500">TROTTA</span>
        </h1>
        <p className="mt-4 text-xl text-gray-400">Software Engineer</p>
      </main>
    </section>
  );
}
