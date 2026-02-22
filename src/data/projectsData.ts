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
      "Study Sessions is a productivity platform designed to optimize academic workflow. Using a " +
      "monorepo architecture (Node.js/React), the application integrates a Pomodoro timer, task " +
      "management (ToDo), dynamic notes, and a direct connection to the Spotify API to set the mood " +
      "for sessions. It is focused on offering a smooth and reactive user experience for handling multiple " +
      "subjects in real time.",
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
    title: "Sky Reach",
    description:
      "Sky Reach is a next-generation drone e-commerce platform that integrates intelligent tools for pilots. " +
      "Developed with Next.js 15 and PostgreSQL, the platform offers everything from a payment system with " +
      "MercadoPago to an AI virtual assistant (Gemini) and real-time weather forecasts to ensure safe flights.",
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
    title: "Project in Development",
    description:
      "This project is currently in the conceptual and early development phase. I am refining the core logic and architecture, so while there isn't a tangible preview yet, it represents a significant step in my learning journey. Stay tuned!",
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
      "Study Sessions is a productivity platform designed to optimize academic workflow. Using a " +
      "monorepo architecture (Node.js/React), the application integrates a Pomodoro timer, task " +
      "management (ToDo), dynamic notes, and a direct connection to the Spotify API to set the mood " +
      "for sessions. It is focused on offering a smooth and reactive user experience for handling multiple " +
      "subjects in real time.",
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
    title: "Sky Reach",
    description:
      "Sky Reach is a next-generation drone e-commerce platform that integrates intelligent tools for pilots. " +
      "Developed with Next.js 15 and PostgreSQL, the platform offers everything from a payment system with " +
      "MercadoPago to an AI virtual assistant (Gemini) and real-time weather forecasts to ensure safe flights.",
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
    title: "Project in Development",
    description:
      "This is an upcoming project where I am exploring new technologies and implementation patterns. It is currently in the works without a public-facing version yet, focusing on solidifying the foundation before the first release.",
    images: [
      "/projects/newproject.avif",
      "/projects/np1.avif",
      "/projects/np1.avif",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    repoUrl: "https://github.com/ttrotta/",
  },
];
