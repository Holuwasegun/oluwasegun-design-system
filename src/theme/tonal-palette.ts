export type TonalTone =
  | 0 | 4 | 6 | 10 | 12 | 17 | 20 | 22 | 24
  | 25 | 30 | 35 | 40 | 50 | 60 | 70
  | 80 | 87 | 90 | 92 | 94 | 95 | 96 | 98 | 99 | 100;

export const TONE_LEVELS: TonalTone[] = [
  0, 4, 6, 10, 12, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70,
  80, 87, 90, 92, 94, 95, 96, 98, 99, 100,
];

export const UI_TONE_LEVELS: TonalTone[] = [
  0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100,
];

export type TonalPalette = Record<TonalTone, string>;

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function saturationForTone(tone: TonalTone, baseSaturation: number): number {
  if (tone === 0 || tone === 100) return 0;
  if (tone <= 10) return baseSaturation * 0.4;
  if (tone <= 20) return baseSaturation * 0.6;
  if (tone <= 30) return baseSaturation * 0.8;
  if (tone >= 90) return baseSaturation * 0.5;
  if (tone >= 80) return baseSaturation * 0.7;
  return baseSaturation;
}

export function generateTonalPalette(hex: string): TonalPalette {
  const { h, s } = hexToHsl(hex);
  const palette = {} as Record<TonalTone, string>;

  for (const tone of TONE_LEVELS) {
    const adjustedSat = saturationForTone(tone, s);
    palette[tone] = hslToHex(h, adjustedSat, tone);
  }

  return palette;
}

export function generateNeutralPalette(): TonalPalette {
  const palette = {} as Record<TonalTone, string>;
  for (const tone of TONE_LEVELS) {
    palette[tone] = hslToHex(0, 0, tone);
  }
  return palette;
}
