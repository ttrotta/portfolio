export interface Skill {
  name: string;
  logo: string;
  dark?: boolean;
}

export const skills: Skill[] = [
  { name: "React", logo: "/tech-stack-logos/react.svg" },
  { name: "Next.js", logo: "/tech-stack-logos/nextjs.svg", dark: true },
  { name: "TypeScript", logo: "/tech-stack-logos/typescript.svg" },
  {
    name: "Tailwind CSS",
    logo: "/tech-stack-logos/tailwindcss.svg",
  },
  { name: "GSAP", logo: "/tech-stack-logos/gsap.svg", dark: true },
  { name: "Three.js", logo: "/tech-stack-logos/threedotjs.svg", dark: true },
  { name: "Node.js", logo: "/tech-stack-logos/nodejs.svg" },
  { name: "Express", logo: "/tech-stack-logos/express.svg", dark: true },
  { name: "PostgreSQL", logo: "/tech-stack-logos/postgresql.svg" },
  { name: "Python", logo: "/tech-stack-logos/python.svg" },
  { name: "Docker", logo: "/tech-stack-logos/docker.svg" },
  { name: "Figma", logo: "/tech-stack-logos/figma.svg" },
];
