import * as THREE from "three";
import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

export const ParticleMaterialConfig = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff") },
  },
  vertexShader,
  fragmentShader,
};
