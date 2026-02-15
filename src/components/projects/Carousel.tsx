import Card from "./Card";

export default function Carousel({ radius = 1.4, count = 6 }) {
  return Array.from({ length: count }).map((_, index) => {
    const angleStep = (index / count) * Math.PI * 2;
    const x = Math.sin(angleStep) * radius;
    const z = Math.cos(angleStep) * radius;
    const y = 0;
    const yRotation = Math.PI + angleStep;

    return (
      <Card
        key={index}
        url={`/projects/project${(index % 10) + 1}_.png`}
        position={[x, y, z]}
        rotation={[0, yRotation, 0]}
      />
    );
  });
}
