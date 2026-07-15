"use client";

import { useMemo, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { tokens } from "@/theme/tokens";
import { useThemeStore } from "@/store";

function makeTheme(overrides: Record<string, string>) {
  const hasOverrides = Object.keys(overrides).length > 0;
  if (!hasOverrides) return tokens;
  return { ...tokens, ...overrides };
}

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const cache = useMemo(() => createCache({ key: "mui", prepend: true }), []);
  const overrides = useThemeStore((s) => s.overrides);

  const theme = useMemo(() => {
    const merged = makeTheme(overrides);
    return createTheme({
      palette: {
        primary: {
          main: merged.primary,
          light: merged.primaryContainer,
          dark: merged.onPrimaryContainer,
          contrastText: merged.onPrimary,
        },
        secondary: {
          main: merged.secondary,
          light: merged.secondaryContainer,
          dark: merged.onSecondaryContainer,
          contrastText: merged.onSecondary,
        },
        error: {
          main: merged.error,
          light: merged.errorContainer,
          dark: merged.onErrorContainer,
          contrastText: merged.onError,
        },
        background: {
          default: merged.background,
          paper: merged.surfaceContainerLow,
        },
        text: {
          primary: merged.onBackground,
          secondary: merged.onSurfaceVariant,
        },
        divider: merged.outlineVariant,
        warning: {
          main: merged.tertiary,
          light: merged.tertiaryContainer,
          dark: merged.onTertiaryContainer,
          contrastText: merged.onTertiary,
        },
      },
      typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        h1: { fontSize: "2.5rem", fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.015625rem" },
        h2: { fontSize: "2rem", fontWeight: 400, lineHeight: 1.275, letterSpacing: "0rem" },
        h3: { fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.2857, letterSpacing: "0rem" },
        h4: { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.3334, letterSpacing: "0rem" },
        h5: { fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0rem" },
        h6: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "0.009375rem" },
        subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "0.009375rem" },
        subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "0.00625rem" },
        body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, letterSpacing: "0.03125rem" },
        body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.4286, letterSpacing: "0.015625rem" },
        button: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "0.00625rem", textTransform: "none" as const },
        caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.3333, letterSpacing: "0.025rem" },
        overline: { fontSize: "0.6875rem", fontWeight: 500, lineHeight: 1.4545, letterSpacing: "0.0625rem" },
      },
      shape: { borderRadius: 12 },
    });
  }, [overrides]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
