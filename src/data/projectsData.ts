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
    slug: "aguja",
    images: [
      "/projects/aguja-placeholder.png",
      "/projects/ar1.png",
      "/projects/ar2.png",
    ],
    stack: [
      "NEXT.JS",
      "TYPESCRIPT",
      "TAILWIND",
      "PNPM",
      "TRANSFORMERS.JS",
      "NEXT-INTL",
      "VITEST",
      "PLAYWRIGHT",
    ],
    repoUrl: "https://github.com/ttrotta/aguja",
    liveUrl: "https://aguja.vercel.app",
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    slug: "new-project",
    images: ["/projects/newproject.avif", "/projects/np1.avif"],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
];
