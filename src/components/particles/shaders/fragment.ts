export const fragmentShader = `
  uniform vec3 uColor;

  varying float vMouseInfluence;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = max(strength, 0.0);

    float circleAlpha = smoothstep(0.5, 0.0, distanceToCenter);
    float glow = vMouseInfluence * 1.1 * circleAlpha;
    strength += glow;

    gl_FragColor = vec4(uColor, strength);
  }
`;
