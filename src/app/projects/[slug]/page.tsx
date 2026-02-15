import { projects } from "@/components/projects/projectsData";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="font-heading text-4xl font-bold">{project.title}</h1>
      <p className="font-body mt-4 text-neutral-400">
        Template for this page...
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-white px-6 py-2 text-black hover:bg-neutral-200"
      >
        Back home
      </Link>
    </div>
  );
}
