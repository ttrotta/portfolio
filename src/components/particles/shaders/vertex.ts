export const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;

  attribute float size;
  attribute float speed;
  attribute float noise;

  varying float vMouseInfluence;

  void main() {
    vec3 basePos = position;
    basePos.y -= uTime * (speed * 0.5); 
    basePos.x += cos(uTime * speed * 0.2 + noise) * 2.0;

    vec2 dir = basePos.xy - uMouse;
    float dist = length(dir);

    float force = smoothstep(uRadius, 0.0, dist);
    vMouseInfluence = force;
    
    vec2 displacement = normalize(dir) * force * uStrength;
    
    vec3 finalPos = basePos;
    finalPos.xy += displacement;

    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = size * (50.0 / -viewPosition.z);
  }
`;
