"use client";

import { useEffect, useState, useRef } from "react";
import { frameCoordinator } from "@/lib/performance/frameCoordinator";
// import { FaStar } from "react-icons/fa6";

export const CustomScroll = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingScrollRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      pendingScrollRef.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);
    const unsubscribe = frameCoordinator.subscribe(() => {
      if (!pendingScrollRef.current) return;
      pendingScrollRef.current = false;
      const height = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setProgress(window.scrollY / height);
      if (window.scrollY > 100) setIsVisible(true);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`${isVisible ? "opacity-100" : "opacity-0"} fixed top-1/2 right-2 z-9999 h-[20vh] w-0.75 -translate-y-1/2 rounded-full bg-white/10 transition-opacity`}
    >
      <div
        className="absolute top-0 h-10 w-0.75 rounded-full bg-white transition-all duration-150"
        style={{
          transform: `translateY(${progress * (20 * 0.85)}vh)`,
        }}
      >
        {/* <FaStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" /> */}
      </div>
    </div>
  );
};
