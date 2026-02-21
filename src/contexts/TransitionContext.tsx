"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

type TransitionContextType = {
  navigateWithTransition: (url: string, direction: "next" | "prev") => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition should be used within a TransitionProvider");
  }
  return context;
};

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithTransition = (url: string, dir: "next" | "prev") => {
    if (url === pathname || isTransitioning || !overlayRef.current) return;

    setIsTransitioning(true);

    const startX = dir === "next" ? "-100%" : "100%";
    const endX = dir === "next" ? "100%" : "-100%";

    const tl = gsap.timeline();

    gsap.set(overlayRef.current, { x: startX, autoAlpha: 1 });

    tl.to(overlayRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(url);
      },
    }).to(overlayRef.current, {
      x: endX,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setIsTransitioning(false);
        gsap.set(overlayRef.current, { autoAlpha: 0 });
      },
    });
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      <div
        ref={overlayRef}
        className="pointer-events-none invisible fixed inset-0 z-9999 bg-[#1a1a1a] opacity-0"
      />

      <div className={isTransitioning ? "pointer-events-none" : ""}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
}
