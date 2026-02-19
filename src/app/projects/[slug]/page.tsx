import { notFound } from "next/navigation";
import { projects } from "@/data/projectsData";
import ProjectPage from "@/components/projects/page/ProjectPage";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
