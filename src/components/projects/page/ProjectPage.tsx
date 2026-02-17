"use client";

import { Project, projects } from "../projectsData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import ImageLightbox from "./ImageLightbox";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    projects[currentIndex === 0 ? projects.length - 1 : currentIndex - 1];
  const nextProject =
    projects[currentIndex === projects.length - 1 ? 0 : currentIndex + 1];

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
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 15%",
          end: "bottom bottom",
          pin: textColumnRef.current,
          pinSpacing: false,
        });

        const images = gsap.utils.toArray(".gsap-scroll-img") as HTMLElement[];

        images.forEach((img, i) => {
          if (i === 0) return; // First page don't need animation

          gsap.fromTo(
            img,
            { scale: 0.8, opacity: 0.5 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top 85%",
                end: "center center",
                scrub: 1,
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
        <button
          onClick={() => router.push("/#projects")}
          className="fixed top-8 left-8 z-50 transition-colors hover:text-gray-400"
        >
          <IoIosArrowRoundBack className="h-12 w-12" />
        </button>

        <button
          onClick={() => router.push(`/projects/${prevProject.slug}`)}
          className="fixed top-1/2 left-4 z-50 hidden -translate-y-1/2 transition-colors hover:text-gray-400 md:block"
        >
          <RiArrowRightSLine className="h-12 w-12 rotate-180" />
        </button>

        <button
          onClick={() => router.push(`/projects/${nextProject.slug}`)}
          className="fixed top-1/2 right-4 z-50 hidden -translate-y-1/2 transition-colors hover:text-gray-400 md:block"
        >
          <RiArrowRightSLine className="h-12 w-12" />
        </button>

        <div
          ref={containerRef}
          className="mx-auto flex w-full max-w-[90vw] flex-col items-start gap-12 pt-24 pb-16 lg:flex-row lg:gap-16 2xl:max-w-350"
        >
          {/* Columna Izquierda: Imágenes (1.5fr o 60%) */}
          <div className="flex w-full flex-col gap-12 lg:w-3/5">
            {project.images.map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="gsap-scroll-img relative h-[50vh] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-transform duration-500 hover:scale-[0.98] sm:h-[60vh] lg:h-[65vh]"
              >
                <Image
                  src={imgSrc}
                  alt={`Imagen ${index + 1} de ${project.title}`}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div
            ref={textColumnRef}
            className="flex w-full flex-col justify-center gap-6 lg:w-2/5"
          >
            <div className="relative">
              <h2
                ref={titleRef}
                className="text-5xl font-bold tracking-tight text-white lg:text-7xl"
                style={{ perspective: "400px" }}
              >
                {project.title}
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-gray-300">
              {project.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-3">
              {project.stack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-gray-600/50 bg-gray-800/40 px-4 py-1.5 text-sm font-medium text-gray-200 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-8">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm tracking-widest text-gray-400 uppercase transition-colors hover:text-white"
                >
                  <span className="h-0.5 w-8 bg-gray-600 transition-all group-hover:w-12 group-hover:bg-white"></span>
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm tracking-widest text-gray-400 uppercase transition-colors hover:text-white"
                >
                  <span className="h-0.5 w-8 bg-gray-600 transition-all group-hover:w-12 group-hover:bg-white"></span>
                  Visit Page
                </a>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/projects/${p.slug}`)}
                  className={`z-10 h-3 w-3 rounded-full transition-all duration-300 ${p.id === project.id ? "scale-125 bg-gray-300" : "bg-gray-600 hover:bg-gray-400"}`}
                />
              ))}
            </div>
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
