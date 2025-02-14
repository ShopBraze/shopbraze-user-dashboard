export const rgbToHex = ({ red, green, blue, }: { red: number, green: number, blue: number }) => {
  return `#${((1 << 24) | (red << 16) | (green << 8) | blue)
    .toString(16)
    .slice(1)}`;
};

export const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  return {
    red: parseInt(hex?.substring(0, 2), 16),
    green: parseInt(hex?.substring(2, 4), 16),
    blue: parseInt(hex?.substring(4, 6), 16),
  };
};
