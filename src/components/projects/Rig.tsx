import { useRef } from "react";
import { Group } from "three";
import { useFrame, ThreeElements } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { easing } from "maath";

export default function Rig(props: ThreeElements["group"]) {
  const ref = useRef<Group>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    }
    state.events.update?.();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} {...props} />;
}
