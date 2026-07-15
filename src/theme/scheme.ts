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

export interface ThemeConfig {
  keyColors: Record<string, string>;
  mode: SchemeMode;
}

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
};

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
