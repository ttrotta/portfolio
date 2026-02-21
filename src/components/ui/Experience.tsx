"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function Experience() {
  useGSAP(() => {
    SplitText.create(".xpTitle", {
      type: "chars",
      mask: "chars",
      onSplit(self) {
        gsap.from(self.chars, {
          scrollTrigger: {
            trigger: ".xpTitle",
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
          ease: "power4.out",
        });
      },
    });

    const articles = gsap.utils.toArray<HTMLElement>(".xp-article");
    articles.forEach((article) => {
      gsap.from(article.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: article,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <section id="experience" className="relative z-10 w-full py-24">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="xpTitle font-heading md: relative mb-10 inline-block cursor-pointer overflow-hidden border-b border-neutral-800 pr-10 pb-8 pl-10 text-5xl font-light tracking-tight md:pr-50 md:text-7xl xl:pr-120">
          Experience
        </h2>

        <div className="max-w-4xl space-y-14">
          <article className="xp-article group relative grid grid-cols-1 gap-4 md:grid-cols-[150px_1fr] md:gap-10">
            <time className="font-body pt-1.5 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase">
              2025
            </time>

            <div className="space-y-2">
              <h3 className="font-body text-xl font-medium text-white transition-colors group-hover:text-neutral-300 md:text-2xl">
                Teaching Assistant in Software Modeling
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden bg-neutral-700 md:block md:h-px md:w-4"></span>
                <p className="font-body text-sm font-light text-neutral-400">
                  Universidad Nacional del Sur
                </p>
              </div>
            </div>
          </article>

          <article className="xp-article group relative grid grid-cols-1 gap-4 md:grid-cols-[150px_1fr] md:gap-10">
            <time className="font-body pt-1.5 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase">
              2025
            </time>

            <div className="space-y-2">
              <h3 className="font-body text-xl font-medium text-white transition-colors group-hover:text-neutral-300 md:text-2xl">
                Teaching Assistant in Formal Methods
              </h3>
              <div className="flex items-center gap-2">
                <span className="hidden bg-neutral-700 md:block md:h-px md:w-4"></span>
                <p className="font-body text-sm font-light text-neutral-400">
                  Universidad Nacional del Sur
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
