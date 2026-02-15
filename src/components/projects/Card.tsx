// Card.tsx
import { Image, ImageProps } from "@react-three/drei";
import { BentPlane } from "./geometry/BentPlaneGeometry";
import { DoubleSide } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh } from "three";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

type CardProps = ImageProps & {
  url: string;
  slug: string;
};

export default function Card({ url, slug, ...props }: CardProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, hover] = useState(false);
  const router = useRouter();

  useFrame((_, delta) => {
    if (ref.current) {
      easing.damp3(
        ref.current.scale,
        [hovered ? -1.15 : -1, hovered ? 1.15 : 1, 1],
        0.1,
        delta,
      );

      if (ref.current.material) {
        easing.damp(
          ref.current.material,
          "radius",
          hovered ? 0.25 : 0.1,
          0.2,
          delta,
        );
        easing.damp(
          ref.current.material,
          "zoom",
          hovered ? 1 : 1.5,
          0.2,
          delta,
        );
      }
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    router.push(`/projects/${slug}`);
  };

  return (
    <Image
      // @ts-expect-error - Types conflict with Drei & Three.js
      ref={ref}
      url={url}
      transparent
      side={DoubleSide}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        hover(true);
      }}
      onPointerOut={() => hover(false)}
      onClick={handleClick}
      alt="Project thumbnail"
      {...props}
    >
      <BentPlane args={[0.17, 1, 0.9, 20, 20]} />
    </Image>
  );
}
