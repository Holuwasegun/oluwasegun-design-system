"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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
  FileDownload as ExportIcon,
  FileUpload as ImportIcon,
  Folder as ProjectIcon,
} from "@mui/icons-material";
import { useAppStore, useThemeStore, useProjectStore } from "@/store";
import ProjectManager from "./ProjectManager";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/color": "Color",
  "/typography": "Typography",
  "/spacing": "Spacing",
  "/shadows": "Shadows",
  "/elevation": "Elevation",
  "/radius": "Border Radius",
  "/motion": "Motion",
  "/components": "Components",
  "/preview": "Preview",
};

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const { toggleSidebar } = useAppStore();
  const { config, toggleMode, exportConfig, currentProjectId } = useThemeStore();
  const { projects } = useProjectStore();
  const [projectManagerOpen, setProjectManagerOpen] = useState(false);

  const title = pageTitles[pathname] || "Design System";
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
            <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 1, minWidth: 44, minHeight: 44 }}>
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
              startIcon={isMobile ? undefined : <ProjectIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={() => setProjectManagerOpen(true)}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
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
              startIcon={isMobile ? undefined : <ExportIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={handleExport}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
              }}
            >
              {isMobile ? <ExportIcon fontSize="small" /> : "Export"}
            </Button>
          </Tooltip>

          <Tooltip title="Import theme from JSON">
            <Button
              size="small"
              startIcon={isMobile ? undefined : <ImportIcon sx={{ fontSize: "1rem !important" }} />}
              onClick={handleImport}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                minWidth: 0,
                px: isMobile ? 1 : 1.5,
                borderRadius: 2,
              }}
            >
              {isMobile ? <ImportIcon fontSize="small" /> : "Import"}
            </Button>
          </Tooltip>

          <Tooltip title={`Switch to ${config.mode === "light" ? "dark" : "light"} mode`}>
            <IconButton
              size="small"
              onClick={toggleMode}
              sx={{
                color: 'text.secondary',
                minWidth: 44,
                minHeight: 44,
                '&:hover': { color: 'text.primary' },
              }}
            >
              {config.mode === "light" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "0.8125rem",
              fontWeight: 700,
              ml: 0.5,
              flexShrink: 0,
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
