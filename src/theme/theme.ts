import { createTheme } from '@mui/material/styles';

const matisse = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#E9DDFF',
  onPrimaryContainer: '#21005D',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1D192B',
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#31111D',
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',
  background: '#FEF7FF',
  onBackground: '#1D1B20',
  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454F',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
  surfaceDim: '#DED8E1',
  surfaceBright: '#FEF7FF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: matisse.primary,
      contrastText: matisse.onPrimary,
      light: matisse.primaryContainer,
      dark: matisse.onPrimaryContainer,
    },
    secondary: {
      main: matisse.secondary,
      contrastText: matisse.onSecondary,
      light: matisse.secondaryContainer,
      dark: matisse.onSecondaryContainer,
    },
    error: {
      main: matisse.error,
      contrastText: matisse.onError,
      light: matisse.errorContainer,
      dark: matisse.onErrorContainer,
    },
    background: {
      default: matisse.background,
      paper: matisse.surfaceContainerLow,
    },
    text: {
      primary: matisse.onSurface,
      secondary: matisse.onSurfaceVariant,
    },
    divider: matisse.outlineVariant,
    warning: {
      main: '#ED6C02',
      light: '#FFF3E0',
      dark: '#E65100',
    },
    success: {
      main: '#2E7D32',
      light: '#E8F5E9',
      dark: '#1B5E20',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 300, fontSize: '2.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 300, fontSize: '2rem', lineHeight: 1.3 },
    h3: { fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.3 },
    h4: { fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.4 },
    h5: { fontWeight: 500, fontSize: '1.1rem', lineHeight: 1.4 },
    h6: { fontWeight: 500, fontSize: '1rem', lineHeight: 1.5 },
    body1: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontWeight: 400, fontSize: '0.8125rem', lineHeight: 1.6 },
    button: { fontWeight: 500, fontSize: '0.8125rem', textTransform: 'none' as const, letterSpacing: '0.02em' },
    caption: { fontWeight: 400, fontSize: '0.6875rem', lineHeight: 1.5 },
    overline: { fontWeight: 600, fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase' as const },
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, padding: '8px 20px', fontWeight: 500, '&.MuiButton-containedPrimary:hover': { backgroundColor: '#5B3DB5' } },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { borderRadius: 12, border: '1px solid #E7E0EC' },
      },
    },
    MuiTextField: {
      defaultProps: { size: 'small', variant: 'outlined' },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontWeight: 500 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: '1px solid #E7E0EC', padding: '12px 16px' },
        head: { fontWeight: 600, fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#49454F' },
      },
    },
  },
});

export { matisse };
export default theme;
