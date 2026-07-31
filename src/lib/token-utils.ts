import { type ThemeConfig, type SchemeMode, generateSchemeFromConfig, generateTypeScale, generateSpacingScale } from '@/theme/scheme';

function hexToLinearRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return [toLinear(r), toLinear(g), toLinear(b)];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToLinearRgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastTextColor(bgHex: string): string {
  return relativeLuminance(bgHex) > 0.179 ? '#1D1B20' : '#FFFFFF';
}

export function getGradientContrastTextColor(hex1: string, hex2: string): string {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  return (l1 + l2) / 2 > 0.179 ? '#1D1B20' : '#FFFFFF';
}

export interface PreviewTokens {
  scheme: Record<string, string>;
  typography: { fontFamily: string; styles: Record<string, { fontSize: number; lineHeight: number; fontWeight: number; letterSpacing: number }> };
  spacing: { baseUnit: number; scale: Record<string, number> };
  mode: SchemeMode;
}

export function generatePreviewTokens(config: ThemeConfig): PreviewTokens {
  const scheme = generateSchemeFromConfig(config);
  const typeScale = generateTypeScale(config.typography);
  const spacingScale = generateSpacingScale(config.spacing.baseUnit);

  const fontFamily = config.typography.fontFamily?.trim()
    ? `'${config.typography.fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const styles: Record<string, { fontSize: number; lineHeight: number; fontWeight: number; letterSpacing: number }> = {};
  for (const s of typeScale) {
    styles[s.name] = { fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, letterSpacing: s.letterSpacing };
  }

  const scale: Record<string, number> = {};
  for (const sp of spacingScale) {
    scale[sp.label] = sp.px;
  }

  return {
    scheme: scheme as unknown as Record<string, string>,
    typography: { fontFamily, styles },
    spacing: { baseUnit: config.spacing.baseUnit, scale },
    mode: config.mode,
  };
}
