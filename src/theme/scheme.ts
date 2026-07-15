import {
  generateTonalPalette,
  generateNeutralPalette,
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

function tone(
  palette: Record<TonalTone, string>,
  tone: TonalTone
): string {
  return palette[tone];
}

export function generateColorScheme(
  primaryHex: string,
  secondaryHex: string,
  tertiaryHex: string,
  errorHex: string,
  mode: SchemeMode
): ColorScheme {
  const primary = generateTonalPalette(primaryHex);
  const secondary = generateTonalPalette(secondaryHex);
  const tertiary = generateTonalPalette(tertiaryHex);
  const error = generateTonalPalette(errorHex);
  const neutral = generateNeutralPalette();

  if (mode === "light") {
    return {
      primary: tone(primary, 40),
      onPrimary: tone(primary, 100),
      primaryContainer: tone(primary, 90),
      onPrimaryContainer: tone(primary, 10),

      secondary: tone(secondary, 40),
      onSecondary: tone(secondary, 100),
      secondaryContainer: tone(secondary, 90),
      onSecondaryContainer: tone(secondary, 10),

      tertiary: tone(tertiary, 40),
      onTertiary: tone(tertiary, 100),
      tertiaryContainer: tone(tertiary, 90),
      onTertiaryContainer: tone(tertiary, 10),

      error: tone(error, 40),
      onError: tone(error, 100),
      errorContainer: tone(error, 90),
      onErrorContainer: tone(error, 10),

      background: tone(neutral, 99),
      onBackground: tone(neutral, 10),

      surface: tone(neutral, 99),
      onSurface: tone(neutral, 10),
      surfaceVariant: tone(primary, 90),
      onSurfaceVariant: tone(primary, 30),

      outline: tone(primary, 50),
      outlineVariant: tone(primary, 80),

      inverseSurface: tone(neutral, 20),
      inverseOnSurface: tone(neutral, 95),
      inversePrimary: tone(primary, 80),

      surfaceDim: tone(neutral, 87),
      surfaceBright: tone(neutral, 98),
      surfaceContainerLowest: tone(neutral, 100),
      surfaceContainerLow: tone(neutral, 96),
      surfaceContainer: tone(neutral, 94),
      surfaceContainerHigh: tone(neutral, 92),
      surfaceContainerHighest: tone(neutral, 90),
    };
  }

  // Dark scheme
  return {
    primary: tone(primary, 80),
    onPrimary: tone(primary, 20),
    primaryContainer: tone(primary, 30),
    onPrimaryContainer: tone(primary, 90),

    secondary: tone(secondary, 80),
    onSecondary: tone(secondary, 20),
    secondaryContainer: tone(secondary, 30),
    onSecondaryContainer: tone(secondary, 90),

    tertiary: tone(tertiary, 80),
    onTertiary: tone(tertiary, 20),
    tertiaryContainer: tone(tertiary, 30),
    onTertiaryContainer: tone(tertiary, 90),

    error: tone(error, 80),
    onError: tone(error, 20),
    errorContainer: tone(error, 30),
    onErrorContainer: tone(error, 90),

    background: tone(neutral, 6),
    onBackground: tone(neutral, 90),

    surface: tone(neutral, 6),
    onSurface: tone(neutral, 90),
    surfaceVariant: tone(primary, 30),
    onSurfaceVariant: tone(primary, 80),

    outline: tone(primary, 60),
    outlineVariant: tone(primary, 30),

    inverseSurface: tone(neutral, 90),
    inverseOnSurface: tone(neutral, 20),
    inversePrimary: tone(primary, 40),

    surfaceDim: tone(neutral, 6),
    surfaceBright: tone(neutral, 24),
    surfaceContainerLowest: tone(neutral, 4),
    surfaceContainerLow: tone(neutral, 10),
    surfaceContainer: tone(neutral, 12),
    surfaceContainerHigh: tone(neutral, 17),
    surfaceContainerHighest: tone(neutral, 22),
  };
}

export interface ThemeConfig {
  keyColors: {
    primary: string;
    secondary: string;
    tertiary: string;
    error: string;
  };
  mode: SchemeMode;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  keyColors: {
    primary: "#6750A4",
    secondary: "#625B71",
    tertiary: "#7D5260",
    error: "#B3261E",
  },
  mode: "light",
};

export function generateSchemeFromConfig(config: ThemeConfig): ColorScheme {
  return generateColorScheme(
    config.keyColors.primary,
    config.keyColors.secondary,
    config.keyColors.tertiary,
    config.keyColors.error,
    config.mode
  );
}
