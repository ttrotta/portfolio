"use client";

import { useEffect, useState, useRef } from "react";

export const CustomScroll = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = winScroll / height;

      if (winScroll > 100) setIsVisible(true);
      setProgress(scrolled);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      />
    </div>
  );
};
