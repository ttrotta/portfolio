"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { useRef } from "react";

export default function AboutMe() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = SplitText.create(".split p", {
        type: "lines, words",
        linesClass: "overflow-hidden",
      });

      gsap.from(tl.lines, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".split",
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative z-10 min-h-screen w-full py-20"
    >
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="font-heading mb-10 text-6xl font-bold text-white">
          Who am I?
        </h2>
        <div className="split max-w-3xl space-y-6 text-lg leading-relaxed text-neutral-300 md:text-xl">
          <p>
            My name is Thiago Trotta and I&apos;m from Argentina. I got into
            programming and the IT world when I was 16. That&apos;s why I&apos;m
            currently in my fifth year studying Systems Engineering and working
            on personal projects in my free time.
          </p>
          <p>
            I have a Full Stack profile, since one of the things I enjoy most is
            backend development, but I have a strong appreciation for frontend
            because I&apos;m a believer in the phrase: everything enters through
            the eyes. That&apos;s why I keep myself updated with the latest
            technologies in both areas.
          </p>
          <p>
            I love working in teams and exchanging ideas with people around me,
            which is why I&apos;ve worked as a teaching assistant during my time
            in college.
          </p>
        </div>
      </div>
    </section>
  );
}
