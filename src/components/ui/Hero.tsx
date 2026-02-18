"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import ScrollIndicator from "../ScrollIndicator";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";

export default function Hero() {
  useGSAP(() => {
    const splitName = new SplitText(".fullname", { type: "chars" });
    const splitTitle = new SplitText(".job-title", { type: "chars" });

    const allChars = [...splitName.chars, ...splitTitle.chars];
    const icons = gsap.utils.toArray(".hero-logo");

    const tl = gsap.timeline();

    gsap.set([allChars, icons], { opacity: 0.1, filter: "brightness(0.5)" });

    tl.to(allChars, {
      duration: 0.5,
      opacity: 1,
      filter: "brightness(1.5) drop-shadow(0 0 10px rgba(255,255,255,0.3))",
      stagger: { amount: 0.8, from: "random" },
      ease: "rough({ template: none, strength: 2, points: 20, taper: 'none', randomize: true, clamp: true })",
    })
      .to(allChars, {
        opacity: 0.6,
        duration: 0.1,
        repeat: 3,
        yoyo: true,
        ease: "none",
        stagger: { amount: 0.2, from: "random" },
      })
      .to(allChars, {
        opacity: 1,
        filter: "brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
        duration: 0.5,
      })
      .fromTo(
        icons,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.5",
      );
  });

  return (
    <section className="pointer-events-none relative flex h-screen flex-col justify-center overflow-hidden px-10 md:px-24">
      <div className="font-heading ml-10 flex flex-col justify-center">
        <h1 className="fullname pointer-events-auto text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
          THIAGO<span className="text-gray-500">TROTTA</span>
        </h1>
        <p className="job-title pointer-events-auto mt-4 text-xl text-gray-400 sm:text-2xl md:text-3xl lg:text-4xl">
          Software Engineer
        </p>

        <div className="mt-8 flex gap-10">
          <a
            href="https://github.com/ttrotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="pointer-events-auto text-white transition-all duration-300 hover:scale-110 hover:brightness-150"
          >
            <FaGithub className="hero-logo h-7 w-7" aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/in/thiago-trotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="pointer-events-auto text-white transition-all duration-300 hover:scale-110 hover:brightness-150"
          >
            <FaLinkedin className="hero-logo h-7 w-7" aria-hidden="true" />
          </a>

          <a
            href="/cv-thiago-trotta.pdf"
            download="CV_Thiago_Trotta.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
            className="pointer-events-auto text-white transition-all duration-300 hover:scale-110 hover:brightness-150"
          >
            <HiDownload className="hero-logo h-7.5 w-7.5" aria-hidden="true" />
          </a>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
