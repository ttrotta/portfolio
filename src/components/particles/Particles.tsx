import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, AdditiveBlending, Vector2 } from "three";
import { useParticleData } from "@/hooks/useParticleData";
import { ParticleMaterialConfig } from "./material";

export const Particles = ({ count = 1500 }: { count?: number }) => {
  const particleData = useParticleData(count, 100, 100, 250);
  const materialRef = useRef<ShaderMaterial>(null!);
  const mouse = useRef(new Vector2()).current;
  const scaleValue = 55;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      const mouseX = state.pointer.x * scaleValue;
      const mouseY = state.pointer.y * scaleValue;

      mouse.set(mouseX, mouseY);
      materialRef.current.uniforms.uMouse.value.lerp(mouse, 0.1);
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
