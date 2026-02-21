"use client";

import { useEffect } from "react";
import Preloader from "./Preloader";
import { usePreloader, PreloaderProvider } from "@/contexts/PreloaderContext";

function PageContent({ children }: { children: React.ReactNode }) {
  const { isReady, setIsReady } = usePreloader();

  useEffect(() => {
    if (!isReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isReady]);

  return (
    <>
      <div
        className={`transition-opacity duration-1000 ${
          isReady ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {children}
      </div>

      {!isReady && <Preloader onComplete={() => setIsReady(true)} />}
    </>
  );
}

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreloaderProvider>
      <PageContent>{children}</PageContent>
    </PreloaderProvider>
  );
}
