export const fragmentShader = `
  uniform vec3 color;
  uniform float opacity;

  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

    float alpha = opacity * (0.7 + fresnel * 0.3);

    gl_FragColor = vec4(color, alpha);
  }
`;
