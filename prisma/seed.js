import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const RgbToHsl = (rgb) => {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    h,
    s,
    l,
  };
};

const markColorByHsl = (hsl) => {
  const { h } = hsl;
  if (h <= 90 && h > 30) {
    return 'yellow';
  } else if (h > 90 && h <= 150) {
    return 'green';
  } else if (h > 150 && h <= 210) {
    return 'cyan';
  } else if (h > 210 && h <= 270) {
    return 'blue';
  } else if (h > 270 && h <= 320) {
    return 'pink';
  } else {
    return 'red';
  }
};

const arrayOfColors = [];

for (let i = 0; i <= 100; i++) {
  const hex = generateRandomColor();
  const rgb = hexToRgb(hex);
  if (rgb) {
    const hsl = RgbToHsl(rgb);
    const colorGroup = markColorByHsl(hsl);
    arrayOfColors.push({
      hex,
      rgb,
      hsl,
      colorGroup,
    });
  }
}

await prisma.color.createMany({
  data: arrayOfColors,
});
