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
} from "@mui/icons-material";
import { useAppStore, useThemeStore, useProjectStore } from "@/store";
import ProjectManager from "./ProjectManager";

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
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "home";
  const { toggleSidebar } = useAppStore();
  const { config, toggleMode, exportConfig, exportCssTokens, currentProjectId } = useThemeStore();
  const { projects } = useProjectStore();
  const [projectManagerOpen, setProjectManagerOpen] = useState(false);

  const title = pageTitles[currentView] || "Design System";
  const currentProject = projects.find((p) => p.id === currentProjectId);

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProject ? currentProject.name.replace(/\s+/g, "-").toLowerCase() : "oluwasegun-design-system"}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCss = () => {
    const css = exportCssTokens();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProject ? currentProject.name.replace(/\s+/g, "-").toLowerCase() : "oluwasegun-design-system"}-tokens.css`;
    a.click();
    URL.revokeObjectURL(url);
  };


  const handleImport = () => {
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
        <Toolbar sx={{ minHeight: 64, gap: 1, px: { xs: 2, md: 3 } }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={toggleSidebar}
              tabIndex={0}
              aria-label="Toggle navigation drawer"
              sx={{
                mr: 1,
                minWidth: 44,
                minHeight: 44,
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
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', fontSize: { xs: '0.95rem', md: '1rem' } }}>
              {title}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Manage projects">
            <Button
              size="small"
              tabIndex={0}
              aria-label="Manage projects"
              startIcon={isMobile ? undefined : <ProjectIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={() => setProjectManagerOpen(true)}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              {isMobile ? (
                <ProjectIcon fontSize="small" />
              ) : (
                <Typography variant="caption" noWrap sx={{ maxWidth: 120, fontWeight: 500 }}>
                  {currentProject?.name || "Untitled"}
                </Typography>
              )}
            </Button>
          </Tooltip>

          <Tooltip title="Export theme as JSON">
            <Button
              size="small"
              tabIndex={0}
              aria-label="Export theme as JSON"
              startIcon={isMobile ? undefined : <ExportIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={handleExport}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              {isMobile ? <ExportIcon fontSize="small" /> : "JSON"}
            </Button>
          </Tooltip>

          <Tooltip title="Export CSS tokens">
            <Button
              size="small"
              tabIndex={0}
              aria-label="Export CSS tokens"
              startIcon={isMobile ? undefined : <ExportIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={handleExportCss}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              {isMobile ? <ExportIcon fontSize="small" /> : "CSS"}
            </Button>
          </Tooltip>

          <Tooltip title="Import theme from JSON">
            <Button
              size="small"
              tabIndex={0}
              aria-label="Import theme from JSON"
              startIcon={isMobile ? undefined : <ImportIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={handleImport}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
                '&:focus-visible, &.Mui-focusVisible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                },
              }}
            >
              {isMobile ? <ImportIcon fontSize="small" /> : "Import"}
            </Button>
          </Tooltip>

          <Tooltip title={`Switch theme mode (current: ${config.mode})`}>
            <IconButton
              size="small"
              tabIndex={0}
              aria-label={`Switch theme mode, current mode is ${config.mode}`}
              onClick={toggleMode}
              sx={{
                color: 'text.secondary',
                minWidth: 44,
                minHeight: 44,
                '&:hover': { color: 'text.primary' },
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
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "0.8125rem",
              fontWeight: 700,
              ml: 0.5,
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

      <ProjectManager open={projectManagerOpen} onClose={() => setProjectManagerOpen(false)} />
    </>
  );
}
