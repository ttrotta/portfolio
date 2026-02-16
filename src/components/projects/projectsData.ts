export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  images: string[];
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "study-sessions",
    title: "Study Sessions",
    description:
      "Plataforma de organización de estudio que cuenta con Notas para cada sección, to-do list, " +
      "integración con Spotify, Pomodoro, y mucho más!",
    images: [
      "/projects/studysessions.avif",
      "/projects/ss1.avif",
      "/projects/ss2.avif",
      "/projects/ss3.avif",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/study-sessions",
    liveUrl: "https://studysessions.onrender.com/",
  },
  {
    id: 2,
    slug: "sky-reach",
    title: "Sky Reach",
    description: "E-commerce de Drones creado en Next.js y Typescript.",
    images: ["/projects/skyreach.png", "/projects/skyreach.png"],
    stack: ["SQL", "Next.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 3,
    slug: "new-project",
    title: "New Project",
    description: "Incognita",
    images: ["/projects/question.png"],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
  {
    id: 4,
    slug: "study-sessions-2",
    title: "Study Sessions",
    description:
      "Plataforma de organización de estudio que cuenta con Notas para cada sección, to-do list, " +
      "integración con Spotify, Pomodoro, y mucho más!",
    images: [
      "/projects/studysessions.avif",
      "/projects/ss1.avif",
      "/projects/ss2.avif",
      "/projects/ss3.avif",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/study-sessions",
    liveUrl: "https://studysessions.onrender.com/",
  },
  {
    id: 5,
    slug: "sky-reach-2",
    title: "Sky Reach",
    description: "E-commerce de Drones creado en Next.js y Typescript.",
    images: ["/projects/skyreach.png"],
    stack: ["SQL", "Next.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 6,
    slug: "new-project-2",
    title: "New Project",
    description: "Incognita",
    images: ["/projects/question.png"],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
];
