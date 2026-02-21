"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextProps {
  isReady: boolean;
  setIsReady: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextProps>({
  isReady: false,
  setIsReady: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isReady, setIsReady }}>
      {children}
    </PreloaderContext.Provider>
  );
};
