"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useThemeStore } from "@/store";
import { type TokenScope, type TokenFormat } from "@/lib/export-utils";
import { copyToClipboard } from "@/lib/brand-gallery-utils";

interface ExportTokenModalProps {
  open: boolean;
  onClose: () => void;
}

const SCOPES: { value: TokenScope; label: string }[] = [
  { value: "all", label: "All Tokens" },
  { value: "color", label: "Color" },
  { value: "typography", label: "Typography" },
  { value: "spacing", label: "Spacing" },
  { value: "radius", label: "Radius" },
  { value: "shadow", label: "Shadow & Elevation" },
];

const FORMATS: { value: TokenFormat; label: string }[] = [
  { value: "json", label: "JSON Token Format" },
  { value: "css", label: "CSS Variables" },
  { value: "tailwind", label: "Tailwind" },
];

const FILE_EXTENSIONS: Record<TokenFormat, string> = {
  json: "json",
  css: "css",
  tailwind: "js",
};

export default function ExportTokenModal({ open, onClose }: ExportTokenModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentProjectId } = useThemeStore();
  const [scope, setScope] = useState<TokenScope>("all");
  const [format, setFormat] = useState<TokenFormat>("json");
  const [copied, setCopied] = useState(false);

  const projectName = currentProjectId
    ? "oluwasegun-design-system"
    : "oluwasegun-design-system";

  const exportContent = useMemo(() => {
    try {
      const { exportTokenFile } = useThemeStore.getState();
      return exportTokenFile(scope, format);
    } catch {
      return "";
    }
  }, [scope, format]);

  const handleCopy = async () => {
    const success = await copyToClipboard(exportContent);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName}-tokens.${FILE_EXTENSIONS[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      sx={isMobile ? {} : { "& .MuiDialog-paper": { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: isMobile ? 2 : 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Export Design System Token
        </Typography>
        <IconButton onClick={onClose} sx={{ minWidth: 44, minHeight: 44 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ px: isMobile ? 2 : 3, py: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Token Scope
          </Typography>
          <ToggleButtonGroup
            value={scope}
            exclusive
            onChange={(_e, newScope) => newScope && setScope(newScope)}
            aria-label="token scope"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8rem",
                fontWeight: 500,
                "&.Mui-selected": {
                  borderColor: "primary.main",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              },
            }}
          >
            {SCOPES.map((s) => (
              <ToggleButton key={s.value} value={s.value}>
                {s.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Export Format
          </Typography>
          <ToggleButtonGroup
            value={format}
            exclusive
            onChange={(_e, newFormat) => newFormat && setFormat(newFormat)}
            aria-label="export format"
            sx={{
              flexWrap: "wrap",
              gap: 1,
              "& .MuiToggleButton-root": {
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textTransform: "none",
                px: 1.5,
                py: 0.5,
                fontSize: "0.8rem",
                fontWeight: 500,
                "&.Mui-selected": {
                  borderColor: "primary.main",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              },
            }}
          >
            {FORMATS.map((f) => (
              <ToggleButton key={f.value} value={f.value}>
                {f.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Preview
          </Typography>
          <TextField
            value={exportContent}
            multiline
            minRows={12}
            maxRows={24}
            fullWidth
            size="small"
            slotProps={{
              input: {
                readOnly: true,
                sx: { fontFamily: "monospace", fontSize: 12, bgcolor: "grey.50" },
              },
            }}
          />
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: isMobile ? 2 : 3, py: 2, gap: 1 }}>
        <Button
          onClick={handleCopy}
          variant="outlined"
          startIcon={<CopyIcon sx={{ fontSize: "1rem !important" }} />}
          sx={{ textTransform: "none", minWidth: 0, flex: 1 }}
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
        <Button
          onClick={handleDownload}
          variant="contained"
          startIcon={<DownloadIcon sx={{ fontSize: "1rem !important" }} />}
          sx={{ textTransform: "none", minWidth: 0, flex: 1 }}
        >
          Download
        </Button>
      </DialogActions>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Copied to clipboard
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
