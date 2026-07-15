'use client';

import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
} from '@mui/icons-material';
import { useAppStore, useThemeStore } from '@/store';

const pageTitles: Record<string, string> = {
  '/color': 'Color',
  '/typography': 'Typography',
  '/spacing': 'Spacing',
  '/shadows': 'Shadows',
  '/elevation': 'Elevation',
  '/radius': 'Border Radius',
  '/motion': 'Motion',
  '/components': 'Components',
};

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { toggleSidebar } = useAppStore();
  const { config, toggleMode, exportConfig } = useThemeStore();

  const title = pageTitles[pathname] || 'Design System';

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'oluwasegun-design-system-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const success = useThemeStore.getState().importConfig(text);
      if (!success) alert('Invalid theme configuration file.');
    };
    input.click();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {isMobile && (
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Export theme as JSON">
            <IconButton size="small" onClick={handleExport}>
              <ExportIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Import theme from JSON">
            <IconButton size="small" onClick={handleImport}>
              <ImportIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={`Switch to ${config.mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton size="small" onClick={toggleMode}>
              {config.mode === 'light' ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.875rem',
              fontWeight: 600,
              ml: 1,
            }}
          >
            O
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
