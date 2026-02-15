export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "study-sessions",
    title: "Study Sessions",
    description:
      "Plataforma de organización de estudio creada con React y Node.js.",
    image: "/projects/studysessions.png",
    tags: ["React", "Node.js", "Tailwind"],
    link: "https://github.com/ttrotta/study-sessions",
  },
  {
    id: 2,
    slug: "sky-reach",
    title: "Sky Reach",
    description: "E-commerce de Drones creado en Next.js y Typescript.",
    image: "/projects/skyreach.png",
    tags: ["SQL", "Next.js", "Tailwind"],
    link: "https://github.com/ttrotta/sky-reach",
  },
  {
    id: 3,
    slug: "new-project",
    title: "New Project",
    description: "Incognita",
    image: "/projects/question.png",
    tags: ["React", "Node.js", "Tailwind"],
    link: "https://github.com/ttrotta/",
  },
  {
    id: 4,
    slug: "study-sessions-2",
    title: "Study Sessions",
    description:
      "Plataforma de organización de estudio creada con React y Node.js.",
    image: "/projects/studysessions.png",
    tags: ["React", "Node.js", "Tailwind"],
    link: "https://github.com/ttrotta/study-sessions",
  },
  {
    id: 5,
    slug: "sky-reach-2",
    title: "Sky Reach",
    description: "E-commerce de Drones creado en Next.js y Typescript.",
    image: "/projects/skyreach.png",
    tags: ["SQL", "Next.js", "Tailwind"],
    link: "https://github.com/ttrotta/sky-reach",
  },
  {
    id: 6,
    slug: "new-project-2",
    title: "New Project",
    description: "Incognita",
    image: "/projects/question.png",
    tags: ["React", "Node.js", "Tailwind"],
    link: "https://github.com/ttrotta/",
  },
];
