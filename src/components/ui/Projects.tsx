import ProjectPresenter from "../projects/section/ProjectPresenter";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden px-10">
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-heading text-5xl font-bold text-white md:text-7xl">
            Projects
          </h2>
        </div>

        <ProjectPresenter />

        <a
          href="https://github.com/ttrotta?tab=repositories"
          target="_blanck"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-20"
        >
          <span className="text-[16px]">
            Visit my <strong>GitHub</strong> to see all my projects!
          </span>
          <FaGithub />
        </a>
      </div>
    </section>
  );
}
