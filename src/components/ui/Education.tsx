"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function Education() {
  useGSAP(() => {
    SplitText.create(".title", {
      type: "chars",
      mask: "chars",
      onSplit(self) {
        gsap.from(self.chars, {
          scrollTrigger: {
            trigger: ".title",
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
          y: 100,
          autoAlpha: 0,
          stagger: {
            each: 0.05,
            from: "end",
          },
          ease: "power4.out",
        });
      },
    });

    const articles = gsap.utils.toArray<HTMLElement>(".edu-article");
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
    <section id="education" className="relative z-10 my-70 w-full pr-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-end">
          <h2 className="title font-heading mb-10 inline-block border-b border-neutral-800 pb-8 pl-10 text-right text-5xl font-light tracking-tight text-white md:pl-50 md:text-7xl xl:pl-120">
            Education
          </h2>
        </div>

        <div className="flex flex-col items-end space-y-14">
          <article className="edu-article group relative grid w-full max-w-4xl grid-cols-1 gap-4 text-right md:grid-cols-[1fr_150px] md:gap-10">
            <div className="order-2 space-y-2 md:order-1">
              <h3 className="font-body text-xl font-medium text-white transition-colors group-hover:text-neutral-300 md:text-2xl">
                Software Engineering
              </h3>
              <div className="flex items-center justify-end gap-2">
                <p className="font-body text-sm font-light text-neutral-400">
                  <a
                    href="https://cs.uns.edu.ar/~devcs/carreras-de-grado/ing-en-sist-de-informacion"
                    target="_blank"
                    className="hover:underline"
                  >
                    Universidad Nacional del Sur - DCIC
                  </a>
                </p>
                <span className="hidden bg-neutral-700 md:block md:h-px md:w-4"></span>
              </div>
            </div>

            <time className="font-body order-1 pt-1.5 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase md:order-2">
              2022 — PRES.
            </time>
          </article>

          <article className="edu-article group relative grid w-full max-w-4xl grid-cols-1 gap-4 text-right md:grid-cols-[1fr_150px] md:gap-10">
            <div className="order-2 space-y-3 md:order-1">
              <h3 className="font-body text-xl font-medium text-white transition-colors group-hover:text-neutral-300 md:text-2xl">
                Outside the Classroom
              </h3>
              <div className="flex items-start justify-end gap-2">
                <p className="font-body max-w-xl text-sm leading-relaxed font-light text-neutral-400">
                  I dedicate my time to personal projects, constantly exploring
                  new technologies and adapting to the rapid evolution of AI.
                </p>
                <span className="hidden bg-neutral-700 md:block md:h-px md:w-4"></span>
              </div>
            </div>

            <time className="font-body order-1 pt-1.5 text-xs font-medium tracking-[0.25em] text-neutral-500 uppercase md:order-2">
              ALWAYS
            </time>
          </article>
        </div>
      </div>
    </section>
  );
}
