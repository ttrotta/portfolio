import Card from "./Card";
import { projects } from "../../../data/projectsData";
import { useThree } from "@react-three/fiber";

interface CarouselProps {
  radius?: number;
}

export default function Carousel({ radius = 1.2 }: CarouselProps) {
  const count = projects.length;
  const { size } = useThree();

  const responsiveRatio = Math.max(0.55, Math.min(1, size.width / 1100));
  const activeRadius = radius * responsiveRatio;

  return (
    <>
      {projects.map((projectData, index) => {
        const angleStep = (index / count) * Math.PI * 2;
        const x = Math.sin(angleStep) * activeRadius;
        const z = Math.cos(angleStep) * activeRadius;
        const yRotation = Math.PI + angleStep;

        return (
          <Card
            key={projectData.id}
            slug={projectData.slug}
            url={projectData.images[0]}
            position={[x, 0, z]}
            rotation={[0, yRotation, 0]}
            scaleModifier={responsiveRatio}
          />
        );
      })}
    </>
  );
}
