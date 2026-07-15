import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.primary,
      light: tokens.primaryContainer,
      dark: tokens.onPrimaryContainer,
      contrastText: tokens.onPrimary,
    },
    secondary: {
      main: tokens.secondary,
      light: tokens.secondaryContainer,
      dark: tokens.onSecondaryContainer,
      contrastText: tokens.onSecondary,
    },
    error: {
      main: tokens.error,
      light: tokens.errorContainer,
      dark: tokens.onErrorContainer,
      contrastText: tokens.onError,
    },
    background: {
      default: tokens.background,
      paper: tokens.surfaceContainerLow,
    },
    text: {
      primary: tokens.onBackground,
      secondary: tokens.onSurfaceVariant,
    },
    divider: tokens.outlineVariant,
    warning: {
      main: tokens.tertiary,
      light: tokens.tertiaryContainer,
      dark: tokens.onTertiaryContainer,
      contrastText: tokens.onTertiary,
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: "-0.015625rem",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 400,
      lineHeight: 1.275,
      letterSpacing: "0rem",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
      lineHeight: 1.2857,
      letterSpacing: "0rem",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.3334,
      letterSpacing: "0rem",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.009375rem",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.009375rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4286,
      letterSpacing: "0.00625rem",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0.03125rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.4286,
      letterSpacing: "0.015625rem",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.4286,
      letterSpacing: "0.00625rem",
      textTransform: "none" as const,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.3333,
      letterSpacing: "0.025rem",
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 500,
      lineHeight: 1.4545,
      letterSpacing: "0.0625rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
