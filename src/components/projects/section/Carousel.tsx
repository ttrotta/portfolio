import Card from "./Card";
import { projects } from "../../../data/projectsData";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { useRuntimeQuality } from "../../../lib/performance/quality";

interface CarouselProps {
  radius?: number;
}

export default function Carousel({ radius = 1.2 }: CarouselProps) {
  const { size } = useThree();
  const quality = useRuntimeQuality();
  const visibleProjects = useMemo(
    () => projects.slice(0, quality.tier === "constrained" ? 3 : 4),
    [quality.tier],
  );
  const geometry = useMemo(() => {
    const responsiveRatio = Math.max(0.55, Math.min(1, size.width / 1100));
    const activeRadius = radius * responsiveRatio;
    return {
      responsiveRatio,
      cards: visibleProjects.map((projectData, index) => {
        const angleStep = (index / visibleProjects.length) * Math.PI * 2;
        return {
          projectData,
          position: [
            Math.sin(angleStep) * activeRadius,
            0,
            Math.cos(angleStep) * activeRadius,
          ] as [number, number, number],
          rotation: [0, Math.PI + angleStep, 0] as [number, number, number],
        };
      }),
    };
  }, [radius, size.width, visibleProjects]);

  return (
    <>
      {geometry.cards.map(({ projectData, position, rotation }) => {
        return (
          <Card
            key={projectData.id}
            slug={projectData.slug}
            url={projectData.images[0]}
            position={position}
            rotation={rotation}
            scaleModifier={geometry.responsiveRatio}
          />
        );
      })}
    </>
  );
}
