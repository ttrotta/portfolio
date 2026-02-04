import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model3D from "@/components/Model3D";

export default function ModelBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true, // transparent
        }}
        camera={{ position: [0, 0, 7], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 2]} intensity={1} color="blue" />

        <Environment preset="forest" />

        {/* Model Mesh */}
        <Model3D />
      </Canvas>
    </div>
  );
}
