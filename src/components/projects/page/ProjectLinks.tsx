import { Project } from "../../../data/projectsData";
import { FiArrowDown } from "react-icons/fi";
import { ProjectPageDictionary } from "./ProjectPage";

interface ProjectLinksProps {
  repoUrl?: Project["repoUrl"];
  liveUrl?: Project["liveUrl"];
  dict: ProjectPageDictionary;
}

export default function ProjectLinks({
  repoUrl,
  liveUrl,
  dict,
}: ProjectLinksProps) {
  if (!repoUrl && !liveUrl) return null;

  return (
    <>
      <div className="mt-auto flex gap-8 pt-4">
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="proj-link"
          >
            {dict.repository}
            <FiArrowDown className="arrow" />
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="proj-link"
          >
            {dict.website}
            <FiArrowDown className="arrow rotate-225" />
          </a>
        )}
      </div>
    </>
  );
}
