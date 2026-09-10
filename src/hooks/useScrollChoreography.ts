import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { RefObject } from "react";
import { Group } from "three";
import { useEffect, useRef } from "react";
import { frameCoordinator } from "@/lib/performance/frameCoordinator";

export function useScrollChoreography(
  groupRef: RefObject<Group | null>,
  owner = "global",
) {
  const { viewport } = useThree();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
    timelineRef.current = tl;

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
        duration: 0.7,
      })
      .to(groupRef.current.scale, {
        ease: "none",
        duration: 1.3,
      });
  }, [viewport, groupRef]);

  useEffect(() => {
    return frameCoordinator.subscribe(
      () => timelineRef.current?.scrollTrigger?.update(),
      owner,
    );
  }, [owner]);
}
