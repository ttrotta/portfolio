import { FiBox, FiCode, FiServer } from "react-icons/fi"; // Iconos de ejemplo

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: FiCode,
    skills: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "white" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#38B2AC" },
      { name: "GSAP", color: "#88CE02" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: FiServer,
    skills: [
      { name: "Node.js", color: "#339933" },
      { name: "Express", color: "white" },
      { name: "PostgreSQL", color: "#336791" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Others",
    icon: FiBox,
    skills: [
      { name: "Git", color: "#F05032" },
      { name: "Figma", color: "#F24E1E" },
      { name: "Docker", color: "#2496ED" },
    ],
  },
];
