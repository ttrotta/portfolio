"use client";

import { Project } from "../../../data/projectsData";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import ImageLightbox from "./ImageLightbox";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import TextColumn from "./TextColumn";
import PaginationDots from "./PaginationDots";

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useGSAP(
    () => {
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars,words" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.refresh();

        const images = gsap.utils.toArray(".gsap-scroll-img") as HTMLElement[];

        images.forEach((img, i) => {
          if (i === 0) return;

          gsap.fromTo(
            img,
            { scale: 0.85, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "top 30%",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [project.slug] },
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );

  return (
    <>
      <div className="relative min-h-screen">
        <BackButton />

        <div
          ref={containerRef}
          className="mx-auto flex w-full max-w-[85vw] flex-col items-start justify-center gap-12 pt-30 pb-16 lg:flex-row lg:gap-16 2xl:max-w-350"
        >
          <div className="order-2 flex w-full flex-col gap-12 lg:order-1 lg:w-3/5">
            {project.images.slice(1).map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="gsap-scroll-img relative h-[50vh] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-transform duration-500 hover:scale-[0.98] sm:h-[60vh] lg:h-[65vh]"
              >
                <Image
                  src={imgSrc}
                  alt={`Imagen ${index + 1} de ${project.title}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>

          <div className="order-1 w-full lg:sticky lg:top-32 lg:order-2 lg:h-fit lg:w-2/5">
            <TextColumn
              project={project}
              textColumnRef={textColumnRef}
              titleRef={titleRef}
            />
          </div>

          <div className="order-3 w-full lg:hidden">
            <PaginationDots currentId={project.id} />
          </div>
        </div>
      </div>

      <ImageLightbox
        images={project.images}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}

const BackButton = () => {
  return (
    <button
      onClick={() => (window.location.href = "/#projects")}
      className="absolute top-31 left-2 z-50 cursor-pointer transition-colors hover:text-gray-400 sm:top-32 md:left-4 lg:fixed lg:top-35"
      aria-label="Back to projects"
    >
      <FiArrowDown className="h-8 w-8 rotate-90" />
    </button>
  );
};
