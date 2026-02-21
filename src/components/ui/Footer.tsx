"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import ContactForm from "./ContactForm";
import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText);

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitText(textRef.current, { type: "chars" });

      gsap.set(split.chars, {
        color: "rgba(255, 255, 255, 0.2)",
        textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

      tl.to(split.chars, {
        keyframes: [
          {
            color: "rgba(255, 255, 255, 1)",
            textShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
            duration: 0.15,
          },
          {
            color: "rgba(255, 255, 255, 0.2)",
            textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
            duration: 0.15,
          },
        ],
        stagger: 0.15,
      });

      return () => {
        split.revert();
      };
    },
    { scope: container },
  );

  return (
    <footer id="footer" ref={container} className="relative z-20 w-full">
      <div className="flex flex-col items-center justify-center px-6 pb-16">
        <p className="font-body mb-3 text-sm tracking-widest text-neutral-500 uppercase">
          Get in touch
        </p>
        <h2
          ref={textRef}
          className="font-heading mb-10 text-center text-4xl font-bold text-white md:text-6xl"
        >
          Contact Me
        </h2>

        <ContactForm />

        <div className="mt-10 flex gap-8">
          <a
            href="https://github.com/ttrotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-neutral-500 transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/thiago-trotta"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-neutral-500 transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="h-px bg-neutral-800" />
      </div>

      <div className="font-body flex flex-col items-center justify-center gap-2 px-6 py-8 text-center text-neutral-600">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Thiago Trotta.
        </p>
        <p className="text-xs text-neutral-600/80">
          <a
            href="https://skfb.ly/6RzwQ"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-400"
          >
            &quot;Lightbulb&quot;
          </a>{" "}
          3D model by Autaritus, licensed under{" "}
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-neutral-400"
          >
            CC BY 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
