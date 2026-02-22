"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import ProjectPresenter from "../projects/section/ProjectPresenter";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasSnapped = useRef(false);
  const lenis = useLenis();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !lenis) return;

    const hash = window.location.hash;
    if (hash && hash !== "#projects") {
      window.__navbarScrolling = true;
      setTimeout(() => {
        window.__navbarScrolling = false;
        history.replaceState(null, "", window.location.pathname);
      }, 2000);
    }

    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasSnapped.current) {
          if (window.__navbarScrolling) return;

          hasSnapped.current = true;
          lenis.scrollTo(section, {
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 4),
          });

          setShowHint(true);
          setTimeout(() => {
            setShowHint(false);
          }, 6000);
        }
      },
      { threshold: 0.08 },
    );

    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          hasSnapped.current = false;
        }
      },
      { threshold: 0 },
    );

    enterObserver.observe(section);
    exitObserver.observe(section);

    return () => {
      enterObserver.disconnect();
      exitObserver.disconnect();
    };
  }, [lenis]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 mt-20 min-h-screen w-full"
    >
      <div className="flex w-full flex-col items-center justify-center overflow-hidden px-10">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-heading text-4xl font-bold text-white md:text-7xl">
            Projects
          </h2>
        </div>

        <ProjectPresenter />

        <div
          className={`pointer-events-none absolute top-[20%] right-[10%] hidden rotate-12 transition-opacity duration-1000 md:block ${
            showHint ? "animate-pulse opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-michroma text-2xl tracking-widest text-white/70">
            Scroll the carousel!
          </span>
        </div>

        <a
          href="https://github.com/ttrotta?tab=repositories"
          target="_blanck"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-20"
        >
          <span className="text-[12px] md:text-[16px]">
            Visit my <strong>GitHub</strong> to see all my projects!
          </span>
          <FaGithub />
        </a>
      </div>
    </section>
  );
}
