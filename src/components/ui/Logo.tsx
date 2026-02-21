"use client";

import React, { useRef, useEffect, MouseEvent } from "react";
import gsap from "gsap";

export default function Logo({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  const defaultPath1 = [
    [0, 6],
    [6, 0],
    [46, 0],
    [46, 12],
    [32, 12],
    [32, 60],
    [26, 66],
    [20, 60],
    [20, 12],
    [6, 12],
  ];
  const defaultPath2 = [
    [48, 0],
    [106, 0],
    [112, 6],
    [106, 12],
    [74, 12],
    [74, 60],
    [68, 66],
    [62, 60],
    [62, 12],
    [48, 12],
  ];

  const points1 = useRef(
    defaultPath1.map((p) => ({ x: p[0], y: p[1], ox: p[0], oy: p[1] })),
  );
  const points2 = useRef(
    defaultPath2.map((p) => ({ x: p[0], y: p[1], ox: p[0], oy: p[1] })),
  );

  const drawPath = (pts: { x: number; y: number }[]) =>
    `M${pts[0].x},${pts[0].y} ` +
    pts
      .slice(1)
      .map((p) => `L${p.x},${p.y}`)
      .join(" ") +
    " Z";

  useEffect(() => {
    const updatePaths = () => {
      if (path1Ref.current)
        path1Ref.current.setAttribute("d", drawPath(points1.current));
      if (path2Ref.current)
        path2Ref.current.setAttribute("d", drawPath(points2.current));
    };
    gsap.ticker.add(updatePaths);
    return () => gsap.ticker.remove(updatePaths);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return;

    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const cursor = pt.matrixTransform(ctm.inverse());

    const MAX_DIST = 100;
    const PULL_STRENGTH = 0.85;

    [points1.current, points2.current].forEach((pts) => {
      pts.forEach((p) => {
        const dx = cursor.x - p.ox;
        const dy = cursor.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = p.ox;
        let targetY = p.oy;

        if (dist < MAX_DIST) {
          const pull = (MAX_DIST - dist) / MAX_DIST;
          targetX = p.ox + dx * pull * PULL_STRENGTH;
          targetY = p.oy + dy * pull * PULL_STRENGTH;
        }

        gsap.to(p, {
          x: targetX,
          y: targetY,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });
  };

  const handleMouseLeave = () => {
    [points1.current, points2.current].forEach((pts) => {
      pts.forEach((p) => {
        gsap.to(p, {
          x: p.ox,
          y: p.oy,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      });
    });
  };

  const initialD1 = drawPath(defaultPath1.map((p) => ({ x: p[0], y: p[1] })));
  const initialD2 = drawPath(defaultPath2.map((p) => ({ x: p[0], y: p[1] })));

  return (
    <div
      className={`relative z-50 flex w-full items-center justify-center py-32 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 112 66"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-24 animate-[pulse_3s_ease-in-out_infinite] overflow-visible drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-1000 ease-in-out hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] sm:w-32 md:w-40"
        style={{ pointerEvents: "none" }}
      >
        <path ref={path1Ref} d={initialD1} />
        <path ref={path2Ref} d={initialD2} />
      </svg>
    </div>
  );
}
