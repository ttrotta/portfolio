export interface Project {
  id: number;
  slug: string;
  images: string[];
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "study-sessions",
    images: [
      "/projects/studysessions.avif",
      "/projects/ss1.avif",
      "/projects/ss2.avif",
      "/projects/ss3.avif",
    ],
    stack: [
      "REACT",
      "NODE.JS",
      "TYPESCRIPT",
      "EXPRESS",
      "VITE",
      "REACT QUERY",
      "SPOTIFY API",
      "TAILWIND",
    ],
    repoUrl: "https://github.com/ttrotta/study-sessions",
    liveUrl: "https://studysessions.onrender.com/",
  },
  {
    id: 2,
    slug: "sky-reach",
    images: [
      "/projects/skyreach.avif",
      "/projects/sr1.avif",
      "/projects/sr2.avif",
      "/projects/sr3.avif",
      "/projects/sr4.avif",
    ],
    stack: [
      "NEXT.JS 15",
      "TYPESCRIPT",
      "POSTGRESQL",
      "PRISMA",
      "TAILWIND",
      "MERCADOPAGO",
      "GEMINI AI",
      "NEXTAUTH",
    ],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 3,
    slug: "new-project",
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
    images: [
      "/projects/studysessions.avif",
      "/projects/ss1.avif",
      "/projects/ss2.avif",
      "/projects/ss3.avif",
    ],
    stack: [
      "REACT",
      "NODE.JS",
      "TYPESCRIPT",
      "EXPRESS",
      "VITE",
      "REACT QUERY",
      "SPOTIFY API",
      "TAILWIND",
    ],
    repoUrl: "https://github.com/ttrotta/study-sessions",
    liveUrl: "https://studysessions.onrender.com/",
  },
  {
    id: 5,
    slug: "sky-reach-2",
    images: [
      "/projects/skyreach.avif",
      "/projects/sr1.avif",
      "/projects/sr2.avif",
      "/projects/sr3.avif",
      "/projects/sr4.avif",
    ],
    stack: [
      "NEXT.JS 15",
      "TYPESCRIPT",
      "POSTGRESQL",
      "PRISMA",
      "TAILWIND",
      "MERCADOPAGO",
      "GEMINI AI",
      "NEXTAUTH",
    ],
    repoUrl: "https://github.com/ttrotta/sky-reach",
    liveUrl: "https://sky-reach.vercel.app/",
  },
  {
    id: 6,
    slug: "new-project-2",
    images: [
      "/projects/newproject.avif",
      "/projects/np1.avif",
      "/projects/np1.avif",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
];
