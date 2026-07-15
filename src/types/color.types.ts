export type Tone = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 87 | 90 | 92 | 94 | 95 | 96 | 98 | 99 | 100;

export const STANDARD_TONES: Tone[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];

export interface HctColor {
  hue: number;
  chroma: number;
  tone: number;
}

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ToneOutput {
  tone: Tone;
  hex: string;
  rgb: RgbColor;
  hsl: HslColor;
  argb: number;
}

export interface KeyColorDefinition {
  id: string;
  label: string;
  hex: string;
  isCustom: boolean;
}

export type ThemeMode = 'light' | 'dark';

export interface SemanticRoleMapping {
  roleName: string;
  category: string;
  sourcePalette: string;
  sourceTone: Tone;
  overrideHex: string | null;
}

export interface DesignSystemExport {
  version: string;
  name: string;
  timestamp: string;
  keyColors: Record<string, string>;
  tonalPalettes: Record<string, Record<string, string>>;
  roles: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const DEFAULT_KEY_COLORS: KeyColorDefinition[] = [
  { id: 'primary', label: 'Primary', hex: '#6750a4', isCustom: false },
  { id: 'secondary', label: 'Secondary', hex: '#625b71', isCustom: false },
  { id: 'tertiary', label: 'Tertiary', hex: '#7d5260', isCustom: false },
  { id: 'neutral', label: 'Neutral', hex: '#79747e', isCustom: false },
  { id: 'neutralVariant', label: 'Neutral Variant', hex: '#79747e', isCustom: false },
];

export const SEMANTIC_ROLE_CATEGORIES = [
  'Primary',
  'Secondary',
  'Tertiary',
  'Error',
  'Surface',
  'Outline',
  'Inverse',
] as const;

export const SEMANTIC_ROLE_NAMES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'inverseSurface',
  'inverseOnSurface',
  'outline',
  'outlineVariant',
  'shadow',
  'scrim',
  'surfaceTint',
  'inversePrimary',
] as const;

export type SemanticRoleName = (typeof SEMANTIC_ROLE_NAMES)[number];
