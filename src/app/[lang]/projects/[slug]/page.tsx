import { notFound } from "next/navigation";
import { projects } from "@/data/projectsData";
import ProjectPage from "@/components/projects/page/ProjectPage";
import { getDictionary, Locale } from "../../../../lib/dictionaries";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const dict = await getDictionary(lang);

  if (!project) {
    notFound();
  }

  const localizedProject = {
    ...project,
    title: dict.projectsData[slug as keyof typeof dict.projectsData].title,
    description:
      dict.projectsData[slug as keyof typeof dict.projectsData].description,
  };

  return (
    <ProjectPage
      project={localizedProject}
      dict={dict.projectPage}
      projectsDataDict={dict.projectsData}
    />
  );
}
