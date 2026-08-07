"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  SettingsBrightness as SystemModeIcon,
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
  Folder as ProjectIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useAppStore, useThemeStore, useProjectStore } from "@/store";
import ProjectManager from "./ProjectManager";
import ExportTokenModal from "./ExportTokenModal";

const pageTitles: Record<string, string> = {
  "home": "Dashboard",
  "color": "Color",
  "typography": "Typography",
  "spacing": "Spacing",
  "shadows": "Shadows",
  "elevation": "Elevation",
  "radius": "Border Radius",
  "motion": "Motion",
  "components": "Components",
  "preview": "Preview",
};

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "home";
  const { toggleSidebar } = useAppStore();
  const { config, toggleMode, currentProjectId } = useThemeStore();
  const { projects } = useProjectStore();
  const [projectManagerOpen, setProjectManagerOpen] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const title = pageTitles[currentView] || "Design System";
  const currentProject = projects.find((p) => p.id === currentProjectId);

  const handleImport = () => {
    setMobileMenuAnchor(null);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      const success = useThemeStore.getState().importConfig(text);
      if (!success) alert("Invalid theme configuration file.");
    };
    input.click();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: `${theme.palette.background.paper}CC`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ minHeight: 64, gap: { xs: 0.5, sm: 1 }, px: { xs: 1.5, md: 3 } }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={toggleSidebar}
              tabIndex={0}
              aria-label="Toggle navigation drawer"
              sx={{
                mr: 0.5,
                minWidth: 40,
                minHeight: 40,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Manage projects">
            <Button
              size="small"
              tabIndex={0}
              aria-label="Manage projects"
              startIcon={<ProjectIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={() => setProjectManagerOpen(true)}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: { xs: 1, sm: 1.5 },
                borderRadius: 2,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              <Typography variant="caption" noWrap sx={{ maxWidth: { xs: 80, sm: 120 }, fontWeight: 500 }}>
                {currentProject?.name || "Untitled"}
              </Typography>
            </Button>
          </Tooltip>

          {/* Desktop & Tablet Export/Import Action Buttons */}
          {!isSmallScreen && (
            <>
              <Tooltip title="Export tokens">
                <Button
                  size="small"
                  tabIndex={0}
                  aria-label="Export tokens"
                  startIcon={<ExportIcon sx={{ fontSize: "1rem !important" }} />}
                  onClick={() => setExportModalOpen(true)}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    minWidth: 0,
                    px: 1.5,
                    borderRadius: 2,
                    '&:focus-visible, &.Mui-focusVisible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  Export
                </Button>
              </Tooltip>

              <Tooltip title="Import theme from JSON">
                <Button
                  size="small"
                  tabIndex={0}
                  aria-label="Import theme from JSON"
                  startIcon={<ImportIcon sx={{ fontSize: "1rem !important" }} />}
                  onClick={handleImport}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    minWidth: 0,
                    px: 1.5,
                    borderRadius: 2,
                    '&:focus-visible, &.Mui-focusVisible': {
                      outline: '2px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  Import
                </Button>
              </Tooltip>
            </>
          )}

          {/* Mobile Screen Overflow Menu Icon Button */}
          {isSmallScreen && (
            <Tooltip title="More options">
              <IconButton
                size="small"
                onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                aria-label="More export and import options"
                sx={{
                  color: 'text.secondary',
                  p: 0.75,
                  '&:focus-visible, &.Mui-focusVisible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={`Switch theme mode (current: ${config.mode})`}>
            <IconButton
              size="small"
              tabIndex={0}
              aria-label={`Switch theme mode, current mode is ${config.mode}`}
              onClick={toggleMode}
              sx={{
                color: 'text.primary',
                minWidth: 38,
                minHeight: 38,
                borderRadius: 2.5,
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '-4px -4px 10px rgba(255,255,255,0.06), 4px 4px 10px rgba(0,0,0,0.7)'
                  : '-4px -4px 10px #ffffff, 4px 4px 10px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '-6px -6px 14px rgba(255,255,255,0.08), 6px 6px 14px rgba(0,0,0,0.8)'
                    : '-6px -6px 14px #ffffff, 6px 6px 14px rgba(0,0,0,0.18)',
                  transform: 'scale(1.05)',
                },
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              {config.mode === "light" ? (
                <LightModeIcon fontSize="small" />
              ) : config.mode === "dark" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <SystemModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Avatar
            tabIndex={0}
            role="img"
            aria-label="User profile icon for Oluwasegun"
            sx={{
              width: 34,
              height: 34,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.875rem',
              fontWeight: 700,
              boxShadow: (theme) => theme.palette.mode === 'dark'
                ? '-4px -4px 10px rgba(255,255,255,0.06), 4px 4px 10px rgba(0,0,0,0.7)'
                : '-4px -4px 10px #ffffff, 4px 4px 10px rgba(0,0,0,0.15)',
              ml: 0.25,
              flexShrink: 0,
              cursor: 'pointer',
              '&:focus-visible, &.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            O
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Mobile Overflow Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={() => setMobileMenuAnchor(null)}
        slotProps={{
          paper: {
            sx: { borderRadius: 2.5, minWidth: 180, py: 0.5, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }
          }
        }}
      >
        <MenuItem onClick={() => { setExportModalOpen(true); setMobileMenuAnchor(null); }}>
          <ListItemIcon><ExportIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Export Tokens" slotProps={{ primary: { sx: { fontSize: '0.85rem', fontWeight: 500 } } }} />
        </MenuItem>
        <MenuItem onClick={handleImport}>
          <ListItemIcon><ImportIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Import JSON" slotProps={{ primary: { sx: { fontSize: '0.85rem', fontWeight: 500 } } }} />
        </MenuItem>
      </Menu>

      <ProjectManager open={projectManagerOpen} onClose={() => setProjectManagerOpen(false)} />
      <ExportTokenModal open={exportModalOpen} onClose={() => setExportModalOpen(false)} />
    </>
  );
}
