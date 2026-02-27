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
          className="font-heading ml-2 flex flex-col items-start text-4xl font-bold tracking-tight text-white perspective-[400px] sm:ml-0 md:text-5xl lg:text-5xl"
        >
          {(() => {
            const title =
              projectsDataDict[project.slug as keyof typeof projectsDataDict]
                .title;
            const spaceIndex = title.indexOf(" ");

            if (spaceIndex === -1 || title.length < 13) {
              return (
                <div className="w-full leading-tight lg:-translate-x-32">
                  {spaceIndex === -1 ? (
                    <span className="inline-block break-keep">{title}</span>
                  ) : (
                    <>
                      <span className="mr-3 inline-block break-keep">
                        {title.substring(0, spaceIndex)}
                      </span>
                      <span className="inline-block break-keep">
                        {title.substring(spaceIndex + 1)}
                      </span>
                    </>
                  )}
                </div>
              );
            }

            const firstWord = title.substring(0, spaceIndex);
            const restOfTitle = title.substring(spaceIndex + 1);

            return (
              <div className="flex w-full flex-col gap-y-2">
                <span className="block break-keep lg:-translate-x-32">
                  {firstWord}
                </span>
                <span className="block break-keep">{restOfTitle}</span>
              </div>
            );
          })()}
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
