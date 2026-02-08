import * as THREE from "three";
import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

export const ParticleMaterialConfig = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#ffffff") },
    uMouse: { value: new THREE.Vector2() },
    uRadius: { value: 10.0, min: 1.0, max: 20.0 },
    uStrength: { value: 6.0, min: 0.1, max: 20.0 },
  },
  vertexShader,
  fragmentShader,
};
