export const vertexShader = `
  uniform float uTime;
  attribute float size;
  attribute float speed;
  attribute float noise;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    modelPosition.y += sin(uTime * speed + noise) * 1.5;
    modelPosition.x += cos(uTime * speed * 0.5 + noise) * 1.0;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = size * (40.0 / -viewPosition.z);
  }
`;
