import { Project } from "../projectsData";

import TechStack from "./TechStack";
import ProjectLinks from "./ProjectLinks";
import PaginationDots from "./PaginationDots";

interface TextColumnProps {
  project: Project;
  textColumnRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}

export default function TextColumn({
  project,
  textColumnRef,
  titleRef,
}: TextColumnProps) {
  return (
    <div
      ref={textColumnRef}
      className="flex w-full flex-col justify-center gap-6 lg:w-2/5"
    >
      <div className="relative">
        <h2
          ref={titleRef}
          className="text-5xl font-bold tracking-tight text-white perspective-[400px] lg:text-7xl"
          // lg:-translate-x-25
        >
          {project.title}
        </h2>
      </div>

      <p className="max-w-lg text-sm leading-loose text-gray-400">
        {project.description}
      </p>

      <TechStack stack={project.stack} />
      <ProjectLinks repoUrl={project.repoUrl} liveUrl={project.liveUrl} />
      <PaginationDots currentId={project.id} />
    </div>
  );
}
