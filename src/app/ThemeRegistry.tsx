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
  
  // Enhanced Neumorphism Shadows (Extruded & Sunken dual light/dark shadows)
  const shadowProtruding = isDark
    ? '-12px -12px 24px rgba(255,255,255,0.06), 12px 12px 24px rgba(0,0,0,0.75)'
    : '-12px -12px 24px #ffffff, 12px 12px 24px rgba(0,0,0,0.14)';

  const shadowInset = isDark
    ? 'inset 6px 6px 14px rgba(0,0,0,0.8), inset -6px -6px 14px rgba(255,255,255,0.05)'
    : 'inset 6px 6px 14px rgba(0,0,0,0.14), inset -6px -6px 14px rgba(255,255,255,0.95)';

  const shadowButton = isDark
    ? '-8px -8px 18px rgba(255,255,255,0.06), 8px 8px 18px rgba(0,0,0,0.75)'
    : '-8px -8px 18px #ffffff, 8px 8px 18px rgba(0,0,0,0.14)';

  const shadowButtonActive = isDark
    ? 'inset 4px 4px 10px rgba(0,0,0,0.8), inset -4px -4px 10px rgba(255,255,255,0.05)'
    : 'inset 4px 4px 10px rgba(0,0,0,0.15), inset -4px -4px 10px rgba(255,255,255,0.9)';

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
        disabled: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.45)',
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
      h1: { fontSize: "clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "clamp(-0.015em, -0.03em + 0.1vw, 0em)" },
      h2: { fontSize: "clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)", fontWeight: 700, lineHeight: 1.275, letterSpacing: "clamp(-0.012em, -0.025em + 0.08vw, 0em)" },
      h3: { fontSize: "clamp(1.3rem, 1.05rem + 1.1vw, 1.85rem)", fontWeight: 600, lineHeight: 1.2857, letterSpacing: "clamp(-0.01em, -0.02em + 0.06vw, 0.005em)" },
      h4: { fontSize: "clamp(1.15rem, 0.95rem + 0.8vw, 1.5rem)", fontWeight: 600, lineHeight: 1.3334, letterSpacing: "clamp(0em, -0.01em + 0.05vw, 0.01em)" },
      h5: { fontSize: "clamp(1.025rem, 0.9rem + 0.5vw, 1.25rem)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "clamp(0.005em, 0em + 0.03vw, 0.015em)" },
      h6: { fontSize: "clamp(0.925rem, 0.85rem + 0.3vw, 1.05rem)", fontWeight: 600, lineHeight: 1.5, letterSpacing: "clamp(0.01em, 0.005em + 0.02vw, 0.02em)" },
      subtitle1: { fontSize: "clamp(0.925rem, 0.85rem + 0.3vw, 1.05rem)", fontWeight: 500, lineHeight: 1.5, letterSpacing: "clamp(0.01em, 0.005em + 0.02vw, 0.02em)" },
      subtitle2: { fontSize: "clamp(0.8125rem, 0.76rem + 0.2vw, 0.9rem)", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "clamp(0.01em, 0.005em + 0.02vw, 0.02em)" },
      body1: { fontSize: "clamp(0.925rem, 0.85rem + 0.3vw, 1.05rem)", fontWeight: 400, lineHeight: 1.6, letterSpacing: "clamp(0.015em, 0.01em + 0.02vw, 0.03em)" },
      body2: { fontSize: "clamp(0.8125rem, 0.77rem + 0.18vw, 0.875rem)", fontWeight: 400, lineHeight: 1.5, letterSpacing: "clamp(0.015em, 0.01em + 0.02vw, 0.025em)" },
      button: { fontSize: "clamp(0.8125rem, 0.77rem + 0.18vw, 0.875rem)", fontWeight: 500, lineHeight: 1.4286, letterSpacing: "clamp(0.01em, 0.005em + 0.02vw, 0.025em)", textTransform: "none" as const },
      caption: { fontSize: "clamp(0.7rem, 0.67rem + 0.12vw, 0.75rem)", fontWeight: 400, lineHeight: 1.3333, letterSpacing: "clamp(0.02em, 0.015em + 0.02vw, 0.035em)" },
      overline: { fontSize: "clamp(0.65rem, 0.62rem + 0.1vw, 0.7rem)", fontWeight: 500, lineHeight: 1.4545, letterSpacing: "clamp(0.06em, 0.04em + 0.05vw, 0.09em)" },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: shadowProtruding,
            backgroundImage: 'none',
            border: 'none',
            transition: 'box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: shadowProtruding,
            backgroundImage: 'none',
            border: 'none',
            transition: 'box-shadow 0.25s ease-in-out, transform 0.25s ease-in-out',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: bgColor,
            boxShadow: isDark ? '8px 0px 24px rgba(0,0,0,0.75)' : '8px 0px 24px rgba(0,0,0,0.12)',
            border: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: bgColor,
            boxShadow: isDark ? '0px 8px 24px rgba(0,0,0,0.75)' : '0px 8px 24px rgba(0,0,0,0.12)',
            border: 'none',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            boxShadow: shadowInset,
            backgroundColor: bgColor,
            borderRadius: 10,
            transition: 'box-shadow 0.2s ease-in-out',
            '&.Mui-focused': {
              boxShadow: isDark
                ? 'inset 4px 4px 8px rgba(0,0,0,0.9), inset -4px -4px 8px rgba(255,255,255,0.08)'
                : 'inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,1)',
            },
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
      MuiCssBaseline: {
        styleOverrides: {
          '*:focus-visible, .Mui-focusVisible': {
            outline: `2px solid ${scheme.primary} !important`,
            outlineOffset: '2px !important',
            borderRadius: '6px',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          outlined: {
            border: 'none',
            boxShadow: shadowButton,
            '&:hover': {
              border: 'none',
              boxShadow: shadowInset,
            },
            '&:active': {
              boxShadow: shadowButtonActive,
            },
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
