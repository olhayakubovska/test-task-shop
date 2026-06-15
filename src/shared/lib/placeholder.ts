const PALETTE = [
  { bg: "#dcd5d8", fg: "#2b2b2b" },
  { bg: "#efe6e9", fg: "#3a2c30" },
  { bg: "#2b2b2b", fg: "#f5eef0" },
  { bg: "#f3dfe3", fg: "#7a2e44" },
  { bg: "#e7e1dd", fg: "#2b2b2b" },
  { bg: "#c9c2c5", fg: "#1f1f1f" },
  { bg: "#f0eef0", fg: "#4a3338" },
  { bg: "#3a3236", fg: "#f6e9ed" },
];

const HEEL_PATH =
  "M150 80 L320 80 L340 420 C342 470 300 520 240 540 L120 600 C 90 615 60 600 65 565 L 95 470 L 110 200 Z";

export function getPlaceholderImage(index: number): string {
  return `/products/placeholder-${index % PALETTE.length}.svg`;
}

export const PLACEHOLDER_PALETTE = PALETTE;
export const PLACEHOLDER_HEEL_PATH = HEEL_PATH;
