export type ScaleConfig = {
  lbScale: number;
  sphereRadius: number;
  lbPosition: [number, number, number];
  spherePosition: [number, number, number];
};

export const lightResponsiveConfig: {
  mobile: ScaleConfig;
  desktop: ScaleConfig;
} = {
  mobile: {
    lbScale: 0.8,
    sphereRadius: 0.17,
    lbPosition: [-0.5, -0.75, 0],
    spherePosition: [2.5, 1.395, 0.1],
  },
  desktop: {
    lbScale: 1.4,
    sphereRadius: 0.33,
    lbPosition: [-1, -1.5, 0],
    spherePosition: [4.4, 2.45, 0.2],
  },
};
