import { Project, projects } from "../../../data/projectsData";
import { useTransition } from "@/contexts/TransitionContext";
import { ProjectPageDictionary, ProjectsDataDictionary } from "./ProjectPage";

interface PaginationDotsProps {
  currentId: Project["id"];
  dict: ProjectPageDictionary;
  projectsDataDict: ProjectsDataDictionary;
}

export default function PaginationDots({
  currentId,
  dict,
  projectsDataDict,
}: PaginationDotsProps) {
  const { navigateWithTransition } = useTransition();

  const currentIndex = projects.findIndex((p) => p.id === currentId);

  const prevProject =
    projects[currentIndex === 0 ? projects.length - 1 : currentIndex - 1];
  const nextProject =
    projects[currentIndex === projects.length - 1 ? 0 : currentIndex + 1];

  const handleNavigation = (slug: string, direction: "next" | "prev") => {
    navigateWithTransition(`/projects/${slug}`, direction);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="flex gap-5">
          <button
            className="pag-nav"
            onClick={() => handleNavigation(prevProject.slug, "prev")}
          >
            <span className="nav-line w-5" />
            {dict.prev}
          </button>

          <div className="mx-3.5 flex items-center justify-center gap-5 lg:gap-4">
            {projects.map((p) => {
              const isActive = p.id === currentId;

              let dir: "next" | "prev" = "next";
              const targetIndex = projects.findIndex(
                (proj) => proj.id === p.id,
              );
              if (targetIndex < currentIndex) dir = "prev";

              return (
                <button
                  key={p.id}
                  onClick={() => handleNavigation(p.slug, dir)}
                  title={
                    projectsDataDict[p.slug as keyof typeof projectsDataDict]
                      .title
                  }
                  className={`pag-bar w-1 hover:scale-y-125 lg:w-1 ${
                    isActive ? "h-8 w-1.5 bg-gray-200" : "h-3.5 bg-gray-700"
                  }`}
                />
              );
            })}
          </div>

          <button
            className="pag-nav"
            onClick={() => handleNavigation(nextProject.slug, "next")}
          >
            {dict.next}
            <span className="nav-line w-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-[.80rem] tracking-[.75em] text-[#758599] lg:text-[0.65rem]">
          {String(currentIndex + 1).padStart(2, "0")}/
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
