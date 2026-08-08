import {
  generateTonalPalette,
  type TonalTone,
} from "./tonal-palette";

export type SchemeMode = "light" | "dark" | "system";

export interface ColorScheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  outline: string;
  outlineVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;

  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

function t(palette: Record<TonalTone, string>, tone: TonalTone): string {
  return palette[tone];
}

const DEFAULT_ERROR_HEX = "#B3261E";

export function generateColorScheme(
  primaryHex: string,
  secondaryHex: string,
  tertiaryHex: string,
  neutralHex: string,
  neutralVariantHex: string,
  mode: SchemeMode
): ColorScheme {
  const primary = generateTonalPalette(primaryHex);
  const secondary = generateTonalPalette(secondaryHex);
  const tertiary = generateTonalPalette(tertiaryHex);
  const neutral = generateTonalPalette(neutralHex);
  const neutralVariant = generateTonalPalette(neutralVariantHex);
  const error = generateTonalPalette(DEFAULT_ERROR_HEX);

  if (mode === "light") {
    return {
      primary: t(primary, 40),
      onPrimary: t(primary, 100),
      primaryContainer: t(primary, 90),
      onPrimaryContainer: t(primary, 10),

      secondary: t(secondary, 40),
      onSecondary: t(secondary, 100),
      secondaryContainer: t(secondary, 90),
      onSecondaryContainer: t(secondary, 10),

      tertiary: t(tertiary, 40),
      onTertiary: t(tertiary, 100),
      tertiaryContainer: t(tertiary, 90),
      onTertiaryContainer: t(tertiary, 10),

      error: t(error, 40),
      onError: t(error, 100),
      errorContainer: t(error, 90),
      onErrorContainer: t(error, 10),

      background: t(neutral, 99),
      onBackground: t(neutral, 10),

      surface: t(neutral, 99),
      onSurface: t(neutral, 10),
      surfaceVariant: t(neutralVariant, 90),
      onSurfaceVariant: t(neutralVariant, 30),

      outline: t(neutralVariant, 50),
      outlineVariant: t(neutralVariant, 80),

      inverseSurface: t(neutral, 20),
      inverseOnSurface: t(neutral, 95),
      inversePrimary: t(primary, 80),

      surfaceDim: t(neutral, 87),
      surfaceBright: t(neutral, 98),
      surfaceContainerLowest: t(neutral, 100),
      surfaceContainerLow: t(neutral, 96),
      surfaceContainer: t(neutral, 94),
      surfaceContainerHigh: t(neutral, 92),
      surfaceContainerHighest: t(neutral, 90),
    };
  }

  return {
    primary: t(primary, 80),
    onPrimary: t(primary, 20),
    primaryContainer: t(primary, 30),
    onPrimaryContainer: t(primary, 90),

    secondary: t(secondary, 80),
    onSecondary: t(secondary, 20),
    secondaryContainer: t(secondary, 30),
    onSecondaryContainer: t(secondary, 90),

    tertiary: t(tertiary, 80),
    onTertiary: t(tertiary, 20),
    tertiaryContainer: t(tertiary, 30),
    onTertiaryContainer: t(tertiary, 90),

    error: t(error, 80),
    onError: t(error, 20),
    errorContainer: t(error, 30),
    onErrorContainer: t(error, 90),

    background: t(neutral, 6),
    onBackground: t(neutral, 95),

    surface: t(neutral, 6),
    onSurface: t(neutral, 95),
    surfaceVariant: t(neutralVariant, 30),
    onSurfaceVariant: t(neutralVariant, 87),

    outline: t(neutralVariant, 70),
    outlineVariant: t(neutralVariant, 35),

    inverseSurface: t(neutral, 90),
    inverseOnSurface: t(neutral, 20),
    inversePrimary: t(primary, 40),

    surfaceDim: t(neutral, 6),
    surfaceBright: t(neutral, 24),
    surfaceContainerLowest: t(neutral, 4),
    surfaceContainerLow: t(neutral, 10),
    surfaceContainer: t(neutral, 12),
    surfaceContainerHigh: t(neutral, 17),
    surfaceContainerHighest: t(neutral, 22),
  };
}

export interface FontWeightsConfig {
  thin?: number;
  light?: number;
  regular?: number;
  medium?: number;
  semibold?: number;
  bold?: number;
  extrabold?: number;
  black?: number;
}

export const DEFAULT_FONT_WEIGHTS: FontWeightsConfig = {
  thin: 100,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export interface TypographyScale {
  baseSize: number;
  scale: number;
  letterSpacingOverrides?: Record<string, number>;
  fontSizeOverrides?: Record<string, number>;
  lineHeightOverrides?: Record<string, number>;
  fontWeightOverrides?: Record<string, number>;
  fontFamily?: string;
  displayFontFamily?: string;
  monoFontFamily?: string;
  weights?: FontWeightsConfig;
}

export interface SpacingConfig {
  baseUnit: number;
  spacingOverrides?: Record<string, number>;
}

export interface DurationOverride {
  name: string;
  ms: number;
}

export interface MotionConfig {
  durationScale: number;
  durationOverrides?: Record<string, number>;
  easingOverrides?: Record<string, string>;
}

export interface ThemeConfig {
  keyColors: Record<string, string>;
  mode: SchemeMode;
  typography: TypographyScale;
  spacing: SpacingConfig;
  motion?: MotionConfig;
}

export const TYPOGRAPHY_SCALES: Record<string, { label: string; value: number }> = {
  "minor-second": { label: "Minor Second (1.067)", value: 1.067 },
  "major-second": { label: "Major Second (1.125)", value: 1.125 },
  "minor-third": { label: "Minor Third (1.2)", value: 1.2 },
  "major-third": { label: "Major Third (1.25)", value: 1.25 },
  "perfect-fourth": { label: "Perfect Fourth (1.333)", value: 1.333 },
  "augmented-fourth": { label: "Augmented Fourth (1.414)", value: 1.414 },
  "perfect-fifth": { label: "Perfect Fifth (1.5)", value: 1.5 },
  "golden-ratio": { label: "Golden Ratio (1.618)", value: 1.618 },
};

export const DEFAULT_KEY_COLORS: Record<string, string> = {
  primary: "#6750A4",
  secondary: "#625B71",
  tertiary: "#7D5260",
  neutral: "#79747E",
  neutralVariant: "#CAC4D0",
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  keyColors: { ...DEFAULT_KEY_COLORS },
  mode: "system",
  typography: { baseSize: 14, scale: 1.25, fontFamily: 'Inter', displayFontFamily: 'Playfair Display', monoFontFamily: 'JetBrains Mono' },
  spacing: { baseUnit: 2, spacingOverrides: {} },
  motion: { durationScale: 1 },
};

export interface TypeStyle {
  name: string;
  family: "display" | "headline" | "title" | "body" | "label";
  size: "large" | "medium" | "small";
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing: number;
}

export function generateTypeScale(config: TypographyScale): TypeStyle[] {
  const { baseSize, scale, letterSpacingOverrides, fontSizeOverrides, lineHeightOverrides, fontWeightOverrides, weights } = config;
  const resolvedWeights: FontWeightsConfig = { ...DEFAULT_FONT_WEIGHTS, ...(weights ?? {}) };

  const styles: [string, TypeStyle["family"], TypeStyle["size"], number, number, number, number][] = [
    ["Display Large",   "display",  "large",  5, 64, resolvedWeights.regular ?? 400, -0.25],
    ["Display Medium",  "display",  "medium", 4, 52, resolvedWeights.regular ?? 400, 0],
    ["Display Small",   "display",  "small",  3, 44, resolvedWeights.regular ?? 400, 0],
    ["Headline Large",  "headline", "large",  3, 40, resolvedWeights.regular ?? 400, 0],
    ["Headline Medium", "headline", "medium", 2, 36, resolvedWeights.regular ?? 400, 0],
    ["Headline Small",  "headline", "small",  2, 32, resolvedWeights.regular ?? 400, 0],
    ["Title Large",     "title",    "large",  2, 28, resolvedWeights.regular ?? 400, 0],
    ["Title Medium",    "title",    "medium", 1, 24, resolvedWeights.medium ?? 500, 0.15],
    ["Title Small",     "title",    "small",  1, 20, resolvedWeights.medium ?? 500, 0.1],
    ["Body Large",      "body",     "large",  0, 24, resolvedWeights.regular ?? 400, 0.5],
    ["Body Medium",     "body",     "medium", 0, 20, resolvedWeights.regular ?? 400, 0.25],
    ["Body Small",      "body",     "small", -1, 16, resolvedWeights.regular ?? 400, 0.4],
    ["Label Large",     "label",    "large",  0, 20, resolvedWeights.medium ?? 500, 0.1],
    ["Label Medium",    "label",    "medium",-1, 16, resolvedWeights.medium ?? 500, 0.5],
    ["Label Small",     "label",    "small", -2, 16, resolvedWeights.medium ?? 500, 0.5],
  ];

  return styles.map(([name, family, size, step, lh, fw, ls]) => ({
    name,
    family,
    size,
    fontSize: fontSizeOverrides?.[name] ?? Math.round(baseSize * Math.pow(scale, step) * 100) / 100,
    lineHeight: lineHeightOverrides?.[name] ?? lh,
    fontWeight: fontWeightOverrides?.[name] ?? fw,
    letterSpacing: letterSpacingOverrides?.[name] ?? ls,
  }));
}

export function generateSpacingScale(baseUnit: number, overrides?: Record<string, number>): { label: string; value: number; px: number }[] {
  const steps = [
    { label: '0', value: 0 },
    { label: '0.5', value: 0.5 },
    { label: '1', value: 1 },
    { label: '1.5', value: 1.5 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '8', value: 8 },
    { label: '10', value: 10 },
    { label: '12', value: 12 },
    { label: '14', value: 14 },
    { label: '16', value: 16 },
    { label: '20', value: 20 },
    { label: '24', value: 24 },
    { label: '28', value: 28 },
    { label: '32', value: 32 },
    { label: '36', value: 36 },
    { label: '40', value: 40 },
    { label: '44', value: 44 },
    { label: '48', value: 48 },
    { label: '52', value: 52 },
    { label: '56', value: 56 },
    { label: '60', value: 60 },
    { label: '64', value: 64 },
    { label: '72', value: 72 },
    { label: '80', value: 80 },
    { label: '96', value: 96 },
  ];

  return steps.map(({ label, value }) => ({
    label,
    value,
    px: overrides?.[label] ?? baseUnit * value,
  }));
}

export const DEFAULT_KEY_COLOR_NAMES: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  neutralVariant: "Neutral Variant",
};

export const SCHEME_KEY_ORDER = ["primary", "secondary", "tertiary", "neutral", "neutralVariant"];

export function generateSchemeFromConfig(config: ThemeConfig, overrideMode?: "light" | "dark"): ColorScheme {
  const kc = config.keyColors;
  const mode = overrideMode ?? (config.mode === "system" ? "light" : config.mode);
  return generateColorScheme(
    kc.primary ?? DEFAULT_KEY_COLORS.primary,
    kc.secondary ?? DEFAULT_KEY_COLORS.secondary,
    kc.tertiary ?? DEFAULT_KEY_COLORS.tertiary,
    kc.neutral ?? DEFAULT_KEY_COLORS.neutral,
    kc.neutralVariant ?? DEFAULT_KEY_COLORS.neutralVariant,
    mode
  );
}
