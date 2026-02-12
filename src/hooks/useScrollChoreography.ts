import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { RefObject } from "react";
import { Group } from "three";

export function useScrollChoreography(groupRef: RefObject<Group | null>) {
  const { viewport } = useThree();

  console.log("Viewport changed:", viewport);

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

    tl.set(groupRef.current.position, { y: 0, x: 0 });

    tl.to(groupRef.current.position, {
      y: -0.055,
      ease: "none",
      duration: 0.05,
    })
      .to(groupRef.current.position, {
        x: -30,
        ease: "none",
        duration: 1,
      })

      .to(groupRef.current.rotation, {
        z: 0.5,
        y: Math.PI * 2,
        ease: "none",

        duration: 1,
      })
      .to(groupRef.current.position, {
        x: -30,
        ease: "none",
        duration: 1,
      });
  }, [viewport]);
}
