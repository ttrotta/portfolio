"use client";

import { useEffect } from "react";
import Preloader from "./Preloader";
import { usePreloader, PreloaderProvider } from "@/contexts/PreloaderContext";

function PageContent({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict?: { clickSwitch: string };
}) {
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

      {!isReady && (
        <Preloader onComplete={() => setIsReady(true)} dict={dict} />
      )}
    </>
  );
}

export default function PageWrapper({
  children,
  dict,
}: {
  children: React.ReactNode;
  dict?: { clickSwitch: string };
}) {
  return (
    <PreloaderProvider>
      <PageContent dict={dict}>{children}</PageContent>
    </PreloaderProvider>
  );
}
