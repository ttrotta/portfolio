import { Project } from "../../../data/projectsData";

import TechStack from "./TechStack";
import ProjectLinks from "./ProjectLinks";
import PaginationDots from "./PaginationDots";
import { ProjectPageDictionary, ProjectsDataDictionary } from "./ProjectPage";

interface TextColumnProps {
  project: Project;
  textColumnRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  dict: ProjectPageDictionary;
  projectsDataDict: ProjectsDataDictionary;
}

export default function TextColumn({
  project,
  textColumnRef,
  titleRef,
  dict,
  projectsDataDict,
}: TextColumnProps) {
  return (
    <div
      ref={textColumnRef}
      className="flex w-full flex-col justify-center gap-6"
    >
      <div className="relative">
        <h2
          ref={titleRef}
          className="ml-2 text-4xl font-bold tracking-tight text-white perspective-[400px] sm:ml-0 sm:text-5xl lg:text-7xl"
        >
          {
            projectsDataDict[project.slug as keyof typeof projectsDataDict]
              .title
          }
        </h2>
      </div>
      <p className="text-sm leading-loose text-gray-400 lg:max-w-lg">
        {
          projectsDataDict[project.slug as keyof typeof projectsDataDict]
            .description
        }
      </p>
      <TechStack stack={project.stack} />
      <ProjectLinks
        repoUrl={project.repoUrl}
        liveUrl={project.liveUrl}
        dict={dict}
      />
      <div className="hidden lg:block">
        <PaginationDots
          currentId={project.id}
          dict={dict}
          projectsDataDict={projectsDataDict}
        />
      </div>
    </div>
  );
}
