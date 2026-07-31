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

function buildFontFamily(stored: string | undefined) {
  const family = stored?.trim() || 'Inter';
  return `'${family}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
}

function makeTheme(config: ReturnType<typeof useThemeStore.getState>["config"], resolvedMode: "light" | "dark") {
  const scheme = generateSchemeFromConfig(config, resolvedMode);
  
  const isDark = resolvedMode === 'dark';
  const bgColor = scheme.background;
  const textPrimary = scheme.onBackground;
  const textSecondary = scheme.onSurfaceVariant;
  
  const shadowProtruding = isDark
    ? '-10px -10px 20px rgba(255,255,255,0.05), 10px 10px 20px rgba(0,0,0,0.65)'
    : '-10px -10px 20px #ffffff, 10px 10px 20px rgba(0,0,0,0.15)';
    
  const shadowInset = isDark
    ? 'inset 6px 6px 12px rgba(0,0,0,0.7), inset -6px -6px 12px rgba(255,255,255,0.04)'
    : 'inset 6px 6px 12px rgba(0,0,0,0.15), inset -6px -6px 12px rgba(255,255,255,1)';

  const shadowButton = isDark
    ? '-6px -6px 14px rgba(255,255,255,0.05), 6px 6px 14px rgba(0,0,0,0.65)'
    : '-6px -6px 14px #ffffff, 6px 6px 14px rgba(0,0,0,0.15)';

  return createTheme({
    palette: {
      mode: resolvedMode,
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
        default: bgColor,
        paper: bgColor,
      },
      text: {
        primary: textPrimary,
        secondary: textSecondary,
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
      fontFamily: buildFontFamily(config.typography.fontFamily),
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
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: shadowProtruding,
            backgroundImage: 'none',
            border: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: shadowProtruding,
            backgroundImage: 'none',
            border: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: bgColor,
            boxShadow: isDark ? '6px 0px 20px rgba(0,0,0,0.65)' : '6px 0px 20px rgba(0,0,0,0.15)',
            border: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: bgColor,
            boxShadow: isDark ? '0px 6px 20px rgba(0,0,0,0.65)' : '0px 6px 20px rgba(0,0,0,0.15)',
            border: 'none',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            boxShadow: shadowInset,
            backgroundColor: bgColor,
            borderRadius: 8,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlined: {
            border: 'none',
            boxShadow: shadowButton,
            '&:hover': {
              border: 'none',
              boxShadow: shadowInset,
            }
          },
        },
      },
    }
  });
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const cache = useMemo(() => createCache({ key: "mui", prepend: true }), []);
  const config = useThemeStore((s) => s.config);
  const [mounted, setMounted] = useState(false);
  const [systemIsDark, setSystemIsDark] = useState(false);

  useEffect(() => { 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedMode = config.mode === "system" ? (systemIsDark ? "dark" : "light") : config.mode;
  const theme = useMemo(() => makeTheme(config, resolvedMode), [config, resolvedMode]);

  if (!mounted) {
    const fallbackTheme = makeTheme({ ...useThemeStore.getState().config, keyColors: useThemeStore.getState().config.keyColors ?? config.keyColors }, "light");
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
