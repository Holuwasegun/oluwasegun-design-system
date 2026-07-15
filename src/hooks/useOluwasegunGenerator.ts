import { useState, useCallback, useMemo } from 'react';
import {
  argbFromHex,
  hexFromArgb,
  redFromArgb,
  greenFromArgb,
  blueFromArgb,
  Hct,
  TonalPalette,
  DynamicScheme,
  Variant,
  Contrast,
} from '@material/material-color-utilities';
import {
  type KeyColorDefinition,
  type ToneOutput,
  type ThemeMode,
  type SemanticRoleName,
  type RgbColor,
  type HslColor,
  STANDARD_TONES,
  DEFAULT_KEY_COLORS,
  SEMANTIC_ROLE_NAMES,
} from '../types/color.types';

function rgbFromArgb(argb: number): RgbColor {
  return {
    r: redFromArgb(argb),
    g: greenFromArgb(argb),
    b: blueFromArgb(argb),
  };
}

function hslFromRgb(rgb: RgbColor): HslColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function generateTonalPalette(hex: string): ToneOutput[] {
  const argb = argbFromHex(hex);
  const hct = Hct.fromInt(argb);
  const palette = TonalPalette.fromHct(hct);
  return STANDARD_TONES.map((tone) => {
    const toneArgb = palette.tone(tone);
    return {
      tone,
      hex: hexFromArgb(toneArgb),
      rgb: rgbFromArgb(toneArgb),
      hsl: hslFromRgb(rgbFromArgb(toneArgb)),
      argb: toneArgb,
    };
  });
}

function getRoleCategory(roleName: string): string {
  if (roleName.startsWith('primary')) return 'Primary';
  if (roleName.startsWith('secondary')) return 'Secondary';
  if (roleName.startsWith('tertiary')) return 'Tertiary';
  if (roleName.startsWith('error')) return 'Error';
  if (roleName.startsWith('surface') || roleName === 'background' || roleName === 'onBackground') return 'Surface';
  if (roleName.startsWith('outline')) return 'Outline';
  if (roleName.startsWith('inverse')) return 'Inverse';
  return 'Other';
}

export function useOluwasegunGenerator() {
  const [keyColors, setKeyColors] = useState<KeyColorDefinition[]>(DEFAULT_KEY_COLORS);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [contrastLevel, setContrastLevel] = useState<number>(0);

  const tonalPalettes = useMemo(() => {
    const result: Record<string, ToneOutput[]> = {};
    for (const kc of keyColors) {
      try {
        result[kc.id] = generateTonalPalette(kc.hex);
      } catch {
        result[kc.id] = STANDARD_TONES.map((tone) => ({
          tone,
          hex: '#808080',
          rgb: { r: 128, g: 128, b: 128 },
          hsl: { h: 0, s: 0, l: 50 },
          argb: 0xff808080,
        }));
      }
    }
    return result;
  }, [keyColors]);

  const dynamicScheme = useMemo(() => {
    const primaryColor = keyColors.find((k) => k.id === 'primary') || keyColors[0];
    const secondaryColor = keyColors.find((k) => k.id === 'secondary') || keyColors[0];
    const tertiaryColor = keyColors.find((k) => k.id === 'tertiary') || keyColors[0];
    const neutralColor = keyColors.find((k) => k.id === 'neutral') || keyColors[0];
    const neutralVariantColor = keyColors.find((k) => k.id === 'neutralVariant') || keyColors[0];

    try {
      return new DynamicScheme({
        sourceColorHct: Hct.fromInt(argbFromHex(primaryColor.hex)),
        variant: Variant.TONAL_SPOT,
        contrastLevel,
        isDark: themeMode === 'dark',
        primaryPalette: TonalPalette.fromHct(
          Hct.fromInt(argbFromHex(primaryColor.hex))
        ),
        secondaryPalette: TonalPalette.fromHct(
          Hct.fromInt(argbFromHex(secondaryColor.hex))
        ),
        tertiaryPalette: TonalPalette.fromHct(
          Hct.fromInt(argbFromHex(tertiaryColor.hex))
        ),
        neutralPalette: TonalPalette.fromHct(
          Hct.fromInt(argbFromHex(neutralColor.hex))
        ),
        neutralVariantPalette: TonalPalette.fromHct(
          Hct.fromInt(argbFromHex(neutralVariantColor.hex))
        ),
      });
    } catch {
      return null;
    }
  }, [keyColors, themeMode, contrastLevel]);

  const semanticRoles = useMemo(() => {
    if (!dynamicScheme) return {};
    const roles: Record<string, { hex: string; argb: number; contrastRatio: number }> = {};
    const scheme = dynamicScheme;

    const roleGetters: Record<SemanticRoleName, () => number> = {
      primary: () => scheme.primary,
      onPrimary: () => scheme.onPrimary,
      primaryContainer: () => scheme.primaryContainer,
      onPrimaryContainer: () => scheme.onPrimaryContainer,
      primaryFixed: () => scheme.primaryFixed,
      primaryFixedDim: () => scheme.primaryFixedDim,
      onPrimaryFixed: () => scheme.onPrimaryFixed,
      onPrimaryFixedVariant: () => scheme.onPrimaryFixedVariant,
      secondary: () => scheme.secondary,
      onSecondary: () => scheme.onSecondary,
      secondaryContainer: () => scheme.secondaryContainer,
      onSecondaryContainer: () => scheme.onSecondaryContainer,
      secondaryFixed: () => scheme.secondaryFixed,
      secondaryFixedDim: () => scheme.secondaryFixedDim,
      onSecondaryFixed: () => scheme.onSecondaryFixed,
      onSecondaryFixedVariant: () => scheme.onSecondaryFixedVariant,
      tertiary: () => scheme.tertiary,
      onTertiary: () => scheme.onTertiary,
      tertiaryContainer: () => scheme.tertiaryContainer,
      onTertiaryContainer: () => scheme.onTertiaryContainer,
      tertiaryFixed: () => scheme.tertiaryFixed,
      tertiaryFixedDim: () => scheme.tertiaryFixedDim,
      onTertiaryFixed: () => scheme.onTertiaryFixed,
      onTertiaryFixedVariant: () => scheme.onTertiaryFixedVariant,
      error: () => scheme.error,
      onError: () => scheme.onError,
      errorContainer: () => scheme.errorContainer,
      onErrorContainer: () => scheme.onErrorContainer,
      background: () => scheme.background,
      onBackground: () => scheme.onBackground,
      surface: () => scheme.surface,
      surfaceDim: () => scheme.surfaceDim,
      surfaceBright: () => scheme.surfaceBright,
      surfaceContainerLowest: () => scheme.surfaceContainerLowest,
      surfaceContainerLow: () => scheme.surfaceContainerLow,
      surfaceContainer: () => scheme.surfaceContainer,
      surfaceContainerHigh: () => scheme.surfaceContainerHigh,
      surfaceContainerHighest: () => scheme.surfaceContainerHighest,
      onSurface: () => scheme.onSurface,
      surfaceVariant: () => scheme.surfaceVariant,
      onSurfaceVariant: () => scheme.onSurfaceVariant,
      inverseSurface: () => scheme.inverseSurface,
      inverseOnSurface: () => scheme.inverseOnSurface,
      outline: () => scheme.outline,
      outlineVariant: () => scheme.outlineVariant,
      shadow: () => scheme.shadow,
      scrim: () => scheme.scrim,
      surfaceTint: () => scheme.surfaceTint,
      inversePrimary: () => scheme.inversePrimary,
    };

    for (const roleName of SEMANTIC_ROLE_NAMES) {
      try {
        const argb = roleGetters[roleName]();
        const bgArgb = scheme.background;
        const contrastRatio = Contrast.ratioOfTones(
          Hct.fromInt(argb).tone,
          Hct.fromInt(bgArgb).tone
        );
        roles[roleName] = {
          hex: hexFromArgb(argb),
          argb,
          contrastRatio: Math.round(contrastRatio * 100) / 100,
        };
      } catch {
        roles[roleName] = { hex: '#000000', argb: 0xff000000, contrastRatio: 21 };
      }
    }
    return roles;
  }, [dynamicScheme]);

  const updateKeyColor = useCallback((id: string, hex: string) => {
    setKeyColors((prev) =>
      prev.map((kc) => (kc.id === id ? { ...kc, hex } : kc))
    );
  }, []);

  const addKeyColor = useCallback((label: string, hex: string) => {
    const id = `custom_${Date.now()}`;
    setKeyColors((prev) => [...prev, { id, label, hex, isCustom: true }]);
  }, []);

  const removeKeyColor = useCallback((id: string) => {
    setKeyColors((prev) => prev.filter((kc) => kc.id !== id));
  }, []);

  const exportSchema = useCallback(() => {
    const lightScheme = new DynamicScheme({
      sourceColorHct: Hct.fromInt(argbFromHex(keyColors[0].hex)),
      variant: Variant.TONAL_SPOT,
      contrastLevel,
      isDark: false,
      primaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors[0].hex))),
      secondaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'secondary')?.hex || keyColors[0].hex))),
      tertiaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'tertiary')?.hex || keyColors[0].hex))),
      neutralPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'neutral')?.hex || keyColors[0].hex))),
      neutralVariantPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'neutralVariant')?.hex || keyColors[0].hex))),
    });

    const darkScheme = new DynamicScheme({
      sourceColorHct: Hct.fromInt(argbFromHex(keyColors[0].hex)),
      variant: Variant.TONAL_SPOT,
      contrastLevel,
      isDark: true,
      primaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors[0].hex))),
      secondaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'secondary')?.hex || keyColors[0].hex))),
      tertiaryPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'tertiary')?.hex || keyColors[0].hex))),
      neutralPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'neutral')?.hex || keyColors[0].hex))),
      neutralVariantPalette: TonalPalette.fromHct(Hct.fromInt(argbFromHex(keyColors.find((k) => k.id === 'neutralVariant')?.hex || keyColors[0].hex))),
    });

    const extractRoles = (scheme: DynamicScheme) => {
      const result: Record<string, string> = {};
      for (const roleName of SEMANTIC_ROLE_NAMES) {
        try {
          const getter = (scheme as unknown as Record<string, unknown>)[roleName];
          if (typeof getter === 'number') {
            result[roleName] = hexFromArgb(getter);
          }
        } catch {}
      }
      return result;
    };

    const exportData = {
      version: '1.0.0',
      name: 'Oluwasegun Design System',
      timestamp: new Date().toISOString(),
      keyColors: Object.fromEntries(keyColors.map((kc) => [kc.id, kc.hex])),
      tonalPalettes: Object.fromEntries(
        Object.entries(tonalPalettes).map(([key, tones]) => [
          key,
          Object.fromEntries(tones.map((t) => [`${t.tone}`, t.hex])),
        ])
      ),
      roles: {
        light: extractRoles(lightScheme),
        dark: extractRoles(darkScheme),
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oluwasegun-design-system.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [keyColors, tonalPalettes, contrastLevel]);

  return {
    keyColors,
    tonalPalettes,
    semanticRoles,
    themeMode,
    contrastLevel,
    dynamicScheme,
    setThemeMode,
    setContrastLevel,
    updateKeyColor,
    addKeyColor,
    removeKeyColor,
    exportSchema,
    getRoleCategory,
  };
}
