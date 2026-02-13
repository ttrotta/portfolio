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
      },
    });

    tl.set(groupRef.current.position, { y: 0, x: 0 });

    tl.to(groupRef.current.position, {
      x: -viewport.width * 0.05,
      y: viewport.height * 0.1,
      z: viewport.height * 0.1,
      ease: "none",
      duration: 0.5,
    })
      .to(groupRef.current.position, {
        x: -viewport.width * 0.4,
        z: viewport.height * 0.5,
        ease: "none",
        duration: 0.45,
      })
      .to(
        groupRef.current.rotation,
        {
          x: -0.7,
          y: 1.15,
          z: 0.67,
          ease: "none",
          duration: 0.45,
        },
        "<",
      )
      .to(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.in",
        duration: 0.2,
      })
      .to(groupRef.current.scale, {
        ease: "none",
        duration: 1.8,
      });
  }, [viewport]);
}
