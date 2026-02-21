"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/src/SplitText";
import { useCallback, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const container = useRef<HTMLElement>(null);

  const buildAnimations = useCallback(() => {
    const scope = container.current;
    if (!scope)
      return { splits: [] as SplitText[], triggers: [] as ScrollTrigger[] };

    const blocks = gsap.utils.toArray<HTMLElement>(".about-block", scope);
    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];

    const titleEl = scope.querySelector<HTMLElement>(".about-title");
    if (titleEl) {
      const titleSplit = new SplitText(titleEl, { type: "chars" });
      splits.push(titleSplit);

      const titleTween = gsap.from(titleSplit.chars, {
        y: 60,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.04,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleEl,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      if (titleTween.scrollTrigger) triggers.push(titleTween.scrollTrigger);
    }

    blocks.forEach((block) => {
      const paragraphs = block.querySelectorAll("p");
      if (paragraphs.length === 0) return;

      const split = new SplitText(paragraphs, {
        type: "lines",
      });
      splits.push(split);

      const tween = gsap.from(split.lines, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    const photos = gsap.utils.toArray<HTMLElement>(".about-photo", scope);
    photos.forEach((photo) => {
      const targetRotation = parseFloat(photo.dataset.rotate || "0");
      const tween = gsap.fromTo(
        photo,
        { scale: 0.85, opacity: 0, rotation: targetRotation + 45 },
        {
          scale: 1,
          opacity: 1,
          rotation: targetRotation,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: photo,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return { splits, triggers };
  }, []);

  useGSAP(
    () => {
      let { splits, triggers } = buildAnimations();

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          triggers.forEach((st) => st.kill());
          splits.forEach((s) => s.revert());

          const rebuilt = buildAnimations();
          splits = rebuilt.splits;
          triggers = rebuilt.triggers;
        }, 300);
      };

      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        triggers.forEach((st) => st.kill());
        splits.forEach((s) => s.revert());
      };
    },
    { scope: container, dependencies: [buildAnimations] },
  );

  return (
    <section
      id="about"
      ref={container}
      className="relative z-10 min-h-screen w-full px-20 pt-20 md:pt-20"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-2">
        <h2 className="about-title font-heading mb-24 text-5xl font-bold text-white md:text-7xl">
          Who am I?
        </h2>

        <div className="space-y-16 md:space-y-6">
          <div className="about-block grid items-center justify-center gap-10 md:grid-cols-[1.4fr_1fr] md:gap-0">
            <div className="text-xl leading-relaxed text-neutral-300 md:text-2xl">
              <p>
                My name is Thiago Trotta and I&apos;m from Argentina. I got into
                programming and the IT world when I was 16, and I quickly
                realized it was something I genuinely enjoyed and wanted to
                pursue seriously. That&apos;s why I&apos;m currently in my fifth
                year studying Software Engineering and working on personal
                projects in my free time.
              </p>
            </div>
            <div className="hidden justify-center md:flex">
              <div
                className="about-photo overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl shadow-black/50"
                data-rotate="5"
              >
                <Image
                  src="/argentinian-sun1.png"
                  alt="About me photo"
                  width={400}
                  height={400}
                  className="h-72 w-72 object-cover sm:h-80 sm:w-80"
                />
              </div>
            </div>
          </div>

          <div className="about-block grid items-center gap-10 md:grid-cols-[1fr_1.4fr] md:gap-10">
            <div className="order-2 hidden justify-center md:order-1 md:flex">
              <div
                className="about-photo overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl shadow-black/50"
                data-rotate="-5"
              >
                <Image
                  src="/argentinian-sun1.png"
                  alt="About me photo"
                  width={400}
                  height={400}
                  className="h-72 w-72 object-cover sm:h-80 sm:w-80"
                />
              </div>
            </div>
            <div className="order-1 text-xl leading-relaxed text-neutral-300 md:order-2 md:text-2xl md:leading-relaxed">
              <p>
                I have a Full Stack profile, enjoying both frontend and backend
                development, with a stronger inclination toward backend systems.
                I believe that mastering AI-driven tools is becoming fundamental
                for engineers today, so I focus on continuously improving my
                understanding of requirements, software architecture, and
                security best practices.
              </p>
            </div>
          </div>

          <div className="about-block order-2 mx-auto mt-15 max-w-4xl text-left text-xl leading-relaxed text-neutral-300 md:order-1 md:text-center md:text-2xl">
            <p>
              I enjoy collaborating with others and exchanging ideas, as I
              believe communication and soft skills are key in today&apos;s tech
              industry. That&apos;s what motivated me to work as a teaching
              assistant during college, and I&apos;m excited about being part of
              a team where I can continue learning and contributing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
