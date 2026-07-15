import {
  generateTonalPalette,
  type TonalTone,
} from "./tonal-palette";

export type SchemeMode = "light" | "dark";

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
    onBackground: t(neutral, 90),

    surface: t(neutral, 6),
    onSurface: t(neutral, 90),
    surfaceVariant: t(neutralVariant, 30),
    onSurfaceVariant: t(neutralVariant, 80),

    outline: t(neutralVariant, 60),
    outlineVariant: t(neutralVariant, 30),

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

export interface TypographyScale {
  baseSize: number;
  scale: number;
}

export interface SpacingConfig {
  baseUnit: number;
}

export interface ThemeConfig {
  keyColors: Record<string, string>;
  mode: SchemeMode;
  typography: TypographyScale;
  spacing: SpacingConfig;
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
  mode: "light",
  typography: { baseSize: 14, scale: 1.25 },
  spacing: { baseUnit: 4 },
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
  const { baseSize, scale } = config;
  const styles: [string, TypeStyle["family"], TypeStyle["size"], number, number, number, number][] = [
    ["Display Large",   "display",  "large",  5, 64, 400, -0.25],
    ["Display Medium",  "display",  "medium", 4, 52, 400, 0],
    ["Display Small",   "display",  "small",  3, 44, 400, 0],
    ["Headline Large",  "headline", "large",  3, 40, 400, 0],
    ["Headline Medium", "headline", "medium", 2, 36, 400, 0],
    ["Headline Small",  "headline", "small",  2, 32, 400, 0],
    ["Title Large",     "title",    "large",  2, 28, 400, 0],
    ["Title Medium",    "title",    "medium", 1, 24, 500, 0.15],
    ["Title Small",     "title",    "small",  1, 20, 500, 0.1],
    ["Body Large",      "body",     "large",  0, 24, 400, 0.5],
    ["Body Medium",     "body",     "medium", 0, 20, 400, 0.25],
    ["Body Small",      "body",     "small", -1, 16, 400, 0.4],
    ["Label Large",     "label",    "large",  0, 20, 500, 0.1],
    ["Label Medium",    "label",    "medium",-1, 16, 500, 0.5],
    ["Label Small",     "label",    "small", -2, 16, 500, 0.5],
  ];

  return styles.map(([name, family, size, step, lh, fw, ls]) => ({
    name,
    family,
    size,
    fontSize: Math.round(baseSize * Math.pow(scale, step) * 100) / 100,
    lineHeight: lh,
    fontWeight: fw,
    letterSpacing: ls,
  }));
}

export function generateSpacingScale(baseUnit: number): { label: string; value: number; px: number }[] {
  return [
    { label: "0", value: 0, px: 0 },
    { label: "0.5", value: 0.5, px: baseUnit * 0.5 },
    { label: "1", value: 1, px: baseUnit },
    { label: "1.5", value: 1.5, px: baseUnit * 1.5 },
    { label: "2", value: 2, px: baseUnit * 2 },
    { label: "3", value: 3, px: baseUnit * 3 },
    { label: "4", value: 4, px: baseUnit * 4 },
    { label: "5", value: 5, px: baseUnit * 5 },
    { label: "6", value: 6, px: baseUnit * 6 },
    { label: "8", value: 8, px: baseUnit * 8 },
    { label: "10", value: 10, px: baseUnit * 10 },
    { label: "12", value: 12, px: baseUnit * 12 },
    { label: "16", value: 16, px: baseUnit * 16 },
  ];
}

export const DEFAULT_KEY_COLOR_NAMES: Record<string, string> = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
  neutral: "Neutral",
  neutralVariant: "Neutral Variant",
};

export const SCHEME_KEY_ORDER = ["primary", "secondary", "tertiary", "neutral", "neutralVariant"];

export function generateSchemeFromConfig(config: ThemeConfig): ColorScheme {
  const kc = config.keyColors;
  return generateColorScheme(
    kc.primary ?? DEFAULT_KEY_COLORS.primary,
    kc.secondary ?? DEFAULT_KEY_COLORS.secondary,
    kc.tertiary ?? DEFAULT_KEY_COLORS.tertiary,
    kc.neutral ?? DEFAULT_KEY_COLORS.neutral,
    kc.neutralVariant ?? DEFAULT_KEY_COLORS.neutralVariant,
    config.mode
  );
}
