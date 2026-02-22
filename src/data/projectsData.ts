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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet porta enim," +
      "et scelerisque mauris dignissim a. Aenean venenatis tincidunt elit non vulputate. Etiam at ipsum" +
      " id lacus porttitor blandit. Duis malesuada leo accumsan metus commodo, eu posuere libero volutpat.",
    images: [
      "/projects/skyreach.avif",
      "/projects/sr1.avif",
      "/projects/sr2.avif",
      "/projects/sr3.avif",
      "/projects/sr4.avif",
    ],
    stack: ["SQL", "Next.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 3,
    slug: "new-project",
    title: "New Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet porta enim," +
      "et scelerisque mauris dignissim a. Aenean venenatis tincidunt elit non vulputate. Etiam at ipsum" +
      " id lacus porttitor blandit. Duis malesuada leo accumsan metus commodo, eu posuere libero volutpat.",
    images: [
      "/projects/newproject.avif",
      "/projects/np1.avif",
      "/projects/np1.avif",
    ],
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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet porta enim," +
      "et scelerisque mauris dignissim a. Aenean venenatis tincidunt elit non vulputate. Etiam at ipsum" +
      " id lacus porttitor blandit. Duis malesuada leo accumsan metus commodo, eu posuere libero volutpat.",
    images: [
      "/projects/skyreach.avif",
      "/projects/sr1.avif",
      "/projects/sr2.avif",
      "/projects/sr3.avif",
      "/projects/sr4.avif",
    ],
    stack: ["SQL", "Next.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 6,
    slug: "new-project-2",
    title: "New Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet porta enim," +
      "et scelerisque mauris dignissim a. Aenean venenatis tincidunt elit non vulputate. Etiam at ipsum" +
      " id lacus porttitor blandit. Duis malesuada leo accumsan metus commodo, eu posuere libero volutpat.",
    images: [
      "/projects/newproject.avif",
      "/projects/np1.avif",
      "/projects/np1.avif",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
];
