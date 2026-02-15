import { Image, ImageProps } from "@react-three/drei";
import { BentPlane } from "./geometry/BentPlaneGeometry";
import { DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { useState, useRef } from "react";

type CardProps = ImageProps & {
  url: string;
};

export default function Card({ url, ...props }: CardProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, hover] = useState(false);

  const pointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hover(true);
  };

  const pointerOut = () => hover(false);

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

  return (
    <Image
      // @ts-expect-error - Conflicto de tipos conocido entre R3F y Drei
      ref={ref}
      url={url}
      transparent
      side={DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      alt="Project thumbnail"
      {...props}
    >
      {/* <sphereGeometry args={[0.4, 32, 32]} /> */}
      <BentPlane args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
