export const colorLuminance = (hexValue: string, luminance: number = 0): string => {
  // Validate hex string
  let hex: string = String(hexValue).replace(/[^0-9a-f]/gi, '');

  if(hex.length < 6) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  // Convert to decimal and change luminosity
  let rgb = '#';
  let color: string;
  let colorIdx: number;

  for(let index: number = 0; index < 3; index++) {
    colorIdx = parseInt(hex.substr(index * 2, 2), 16);
    color = Math.round(Math.min(Math.max(0, colorIdx + (colorIdx * luminance)), 255)).toString(16);
    rgb += (`00${color}`).substr(color.length);
  }

  return rgb;
};
