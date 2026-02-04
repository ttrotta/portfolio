import { useGSAP } from "@gsap/react";
import { RefObject } from "react";
import gsap from "gsap";
import { Group } from "three";

export function useScrollRotation(groupRef: RefObject<Group | null>) {
  useGSAP(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
      },
    });

    tl.to(groupRef.current.rotation, {
      z: Math.PI * 2,
      y: Math.PI * 2,
      ease: "none",
    });
  }, []);
}
