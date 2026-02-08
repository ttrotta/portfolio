import { useMemo } from "react";

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 1000;
  return x - Math.floor(x);
};

export const useParticleData = (
  particleCount: number,
  width: number,
  height: number,
  depth: number,
) => {
  const data = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const noise = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (pseudoRandom(i + 0.1) - 0.5) * width;
      positions[i * 3 + 1] = (pseudoRandom(i + 0.2) - 0.5) * height;
      positions[i * 3 + 2] = (pseudoRandom(i + 0.3) - 0.5) * depth;
      noise[i] = pseudoRandom(i + 0.4) * 100;
      sizes[i] = pseudoRandom(i + 0.5) * 20.0;
      speeds[i] = 0.1 + pseudoRandom(i + 0.6) * 0.4;
    }

    return { positions, noise, sizes, speeds };
  }, [particleCount, width, height, depth]);

  return data;
};
