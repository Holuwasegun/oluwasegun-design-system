"use client";

import { useMemo, useState, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { useThemeStore } from "@/store";
import { generateSchemeFromConfig } from "@/theme/scheme";

interface ThemeRegistryProps {
  children: ReactNode;
}

function makeTheme(config: ReturnType<typeof useThemeStore.getState>["config"]) {
  const scheme = generateSchemeFromConfig(config);
  return createTheme({
    palette: {
      mode: config.mode,
      primary: {
        main: scheme.primary,
        light: scheme.primaryContainer,
        dark: scheme.onPrimaryContainer,
        contrastText: scheme.onPrimary,
      },
      secondary: {
        main: scheme.secondary,
        light: scheme.secondaryContainer,
        dark: scheme.onSecondaryContainer,
        contrastText: scheme.onSecondary,
      },
      error: {
        main: scheme.error,
        light: scheme.errorContainer,
        dark: scheme.onErrorContainer,
        contrastText: scheme.onError,
      },
      background: {
        default: scheme.background,
        paper: scheme.surfaceContainerLow,
      },
      text: {
        primary: scheme.onBackground,
        secondary: scheme.onSurfaceVariant,
      },
      divider: scheme.outlineVariant,
      warning: {
        main: scheme.tertiary,
        light: scheme.tertiaryContainer,
        dark: scheme.onTertiaryContainer,
        contrastText: scheme.onTertiary,
      },
    },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      h1: { fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025rem" },
      h2: { fontSize: "2rem", fontWeight: 700, lineHeight: 1.275, letterSpacing: "-0.02rem" },
      h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.2857, letterSpacing: "-0.015rem" },
      h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3334, letterSpacing: "-0.01rem" },
      h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4, letterSpacing: "0rem" },
      h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5, letterSpacing: "0.00625rem" },
      subtitle1: { fontSize: "1rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: "0.00625rem" },
      subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "0.005rem" },
      body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6, letterSpacing: "0.025rem" },
      body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, letterSpacing: "0.0125rem" },
      button: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "0.00625rem", textTransform: "none" as const },
      caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.3333, letterSpacing: "0.025rem" },
      overline: { fontSize: "0.6875rem", fontWeight: 500, lineHeight: 1.4545, letterSpacing: "0.08em" },
    },
    shape: { borderRadius: 12 },
  });
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const cache = useMemo(() => createCache({ key: "mui", prepend: true }), []);
  const config = useThemeStore((s) => s.config);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const theme = useMemo(() => makeTheme(config), [config]);

  if (!mounted) {
    const fallbackTheme = makeTheme({ ...useThemeStore.getState().config, keyColors: useThemeStore.getState().config.keyColors ?? config.keyColors });
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={fallbackTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
