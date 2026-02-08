import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, AdditiveBlending } from "three";
import { useParticleData } from "@/hooks/useParticleData";
import { ParticleMaterialConfig } from "./material";

export const Particles = () => {
  const particleData = useParticleData(500, 75, 75, 200);
  const materialRef = useRef<ShaderMaterial>(null!);

  // uTime determined by Three.js object not React
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-noise"
          count={particleData.noise.length}
          array={particleData.noise}
          itemSize={1}
          args={[particleData.noise, 1]}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleData.sizes.length}
          array={particleData.sizes}
          itemSize={1}
          args={[particleData.sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-speed"
          count={particleData.speeds.length}
          array={particleData.speeds}
          itemSize={1}
          args={[particleData.speeds, 1]}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}
        {...ParticleMaterialConfig}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
};
