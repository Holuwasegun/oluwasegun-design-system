import { type ThemeConfig, type SchemeMode, generateSchemeFromConfig, generateTypeScale, generateSpacingScale } from '@/theme/scheme';

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
