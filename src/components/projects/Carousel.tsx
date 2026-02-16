// Carousel.tsx
import Card from "./Card";
import { projects } from "./projectsData";

interface CarouselProps {
  radius?: number;
}

export default function Carousel({ radius = 1.2 }: CarouselProps) {
  const count = projects.length;

  return (
    <>
      {projects.map((projectData, index) => {
        const angleStep = (index / count) * Math.PI * 2;
        const x = Math.sin(angleStep) * radius;
        const z = Math.cos(angleStep) * radius;
        const yRotation = Math.PI + angleStep;

        return (
          <Card
            key={projectData.id}
            slug={projectData.slug}
            url={projectData.images[0]}
            position={[x, 0, z]}
            rotation={[0, yRotation, 0]}
          />
        );
      })}
    </>
  );
}
