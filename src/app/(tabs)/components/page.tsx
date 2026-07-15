'use client';

import React, { useState, useMemo } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  TextField,
  Alert,
  Snackbar,
  Chip,
  Grid,
  Divider,
  Paper,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {description}
      </Typography>
    </Box>
  );
}

function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <Stack sx={{ alignItems: 'center', gap: 0.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          bgcolor: color,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Typography variant="caption" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.65rem' }}>
        {color}
      </Typography>
    </Stack>
  );
}

function GlossyButton({
  children,
  variant = 'contained',
  color = 'primary',
  disabled = false,
  startIcon,
}: {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  startIcon?: React.ReactNode;
}) {
  const isContained = variant === 'contained';

  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      startIcon={startIcon}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        textTransform: 'none',
        ...(isContained && {
          background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
            background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)`,
          },
        }),
        ...(!isContained && {
          border: '1px solid',
          borderColor: 'primary.main',
        }),
      }}
    >
      {children}
    </Button>
  );
}

export default function ComponentsPage() {
  const config = useThemeStore((s) => s.config);
  const scheme = useMemo(() => generateSchemeFromConfig(config), [config]);
  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const colorRoles = [
    { label: 'Primary', color: scheme.primary },
    { label: 'On Primary', color: scheme.onPrimary },
    { label: 'Primary Container', color: scheme.primaryContainer },
    { label: 'On Primary Container', color: scheme.onPrimaryContainer },
    { label: 'Secondary', color: scheme.secondary },
    { label: 'Secondary Container', color: scheme.secondaryContainer },
    { label: 'Tertiary', color: scheme.tertiary },
    { label: 'Tertiary Container', color: scheme.tertiaryContainer },
    { label: 'Error', color: scheme.error },
    { label: 'Error Container', color: scheme.errorContainer },
    { label: 'Surface', color: scheme.surface },
    { label: 'On Surface', color: scheme.onSurface },
    { label: 'Outline', color: scheme.outline },
    { label: 'Background', color: scheme.background },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Components
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Material Design 3 component showcase with live theme tokens
        </Typography>
      </Box>

      {/* ── 1. Design Tokens Summary ── */}
      <SectionHeading
        title="Design Tokens"
        description="Current theme configuration rendered as live values. These drive every component below."
      />

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          mb: 5,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Color Roles
        </Typography>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', gap: 2, mb: 3 }}
        >
          {colorRoles.map((cr) => (
            <ColorSwatch key={cr.label} label={cr.label} color={cr.color} />
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 2, md: 4 } }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Typography
            </Typography>
            <Chip
              label={`Base size: ${config.typography.baseSize}px`}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label={`Scale ratio: ${config.typography.scale}`}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
            <Chip
              label="Roboto / System"
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Spacing
            </Typography>
            <Chip
              label={`Base unit: ${config.spacing.baseUnit}px`}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Border Radius
            </Typography>
            <Chip label="Default: 12px" size="small" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Small: 8px" size="small" sx={{ mr: 1, mb: 1 }} />
            <Chip label="Large: 16px" size="small" sx={{ mr: 1, mb: 1 }} />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Scheme Mode
            </Typography>
            <Chip
              label={config.mode === 'light' ? 'Light' : 'Dark'}
              color={config.mode === 'light' ? 'primary' : 'secondary'}
              size="small"
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>
        </Stack>
      </Paper>

      {/* ── 2. Glossy Buttons ── */}
      <SectionHeading
        title="Glossy Buttons"
        description="Buttons with a subtle gradient overlay that adds depth and shine. Tap to interact."
      />

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          mb: 5,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Contained
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
          <GlossyButton variant="contained">Primary</GlossyButton>
          <GlossyButton variant="contained" color="secondary">Secondary</GlossyButton>
          <GlossyButton variant="contained" color="error">Error</GlossyButton>
          <GlossyButton variant="contained" color="success">Success</GlossyButton>
          <GlossyButton variant="contained" color="warning">Warning</GlossyButton>
          <GlossyButton variant="contained" color="info">Info</GlossyButton>
          <GlossyButton variant="contained" disabled>Disabled</GlossyButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Outlined
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
          <GlossyButton variant="outlined">Primary</GlossyButton>
          <GlossyButton variant="outlined" color="secondary">Secondary</GlossyButton>
          <GlossyButton variant="outlined" color="error">Error</GlossyButton>
          <GlossyButton variant="outlined" disabled>Disabled</GlossyButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Text
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
          <GlossyButton variant="text">Primary</GlossyButton>
          <GlossyButton variant="text" color="secondary">Secondary</GlossyButton>
          <GlossyButton variant="text" color="error">Error</GlossyButton>
          <GlossyButton variant="text" disabled>Disabled</GlossyButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          With Icons
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <GlossyButton variant="contained" startIcon={<SendIcon />}>Send</GlossyButton>
          <GlossyButton variant="outlined" startIcon={<DeleteIcon />}>Delete</GlossyButton>
          <GlossyButton variant="contained" color="secondary" startIcon={<NotificationsIcon />}>Notify</GlossyButton>
        </Stack>
      </Paper>

      {/* ── 3. Text Fields ── */}
      <SectionHeading
        title="Text Fields"
        description="Input controls with different variants, states, and helper text."
      />

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          mb: 5,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Variants
        </Typography>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', gap: 2, mb: 3 }}
        >
          <TextField label="Filled" variant="filled" size="small" />
          <TextField label="Outlined" variant="outlined" size="small" />
          <TextField label="Standard" variant="standard" size="small" />
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          States
        </Typography>
        <Stack
          direction="row"
          sx={{ flexWrap: 'wrap', gap: 2 }}
        >
          <TextField
            label="With Helper"
            helperText="Some helpful guidance"
            variant="outlined"
            size="small"
          />
          <TextField
            label="Placeholder"
            placeholder="Type something..."
            variant="outlined"
            size="small"
          />
          <TextField
            label="Error State"
            helperText="This field is required"
            variant="outlined"
            size="small"
            error
          />
          <TextField
            label="Disabled"
            variant="outlined"
            size="small"
            disabled
          />
        </Stack>
      </Paper>

      {/* ── 4. Cards & Panels ── */}
      <SectionHeading
        title="Cards & Panels"
        description="Content containers with different layouts for media, stats, and info."
      />

      <Stack sx={{ mb: 5, gap: 3 }}>
        <Grid container spacing={3}>
          {/* Image card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: 160,
                  bgcolor: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.tertiary} 100%)`,
                  background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.tertiary} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" sx={{ color: '#fff', opacity: 0.6, fontWeight: 300 }}>
                  Image
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Media Card
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  A card with a visual header area, body text, and action buttons. Ideal for articles or product showcases.
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" variant="contained">Learn More</Button>
                <Button size="small" variant="text">Dismiss</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Stat card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                bgcolor: scheme.primaryContainer,
              }}
            >
              <CardContent>
                <Typography variant="overline" sx={{ color: scheme.onPrimaryContainer, opacity: 0.7 }}>
                  Total Users
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: scheme.onPrimaryContainer,
                    mt: 1,
                    mb: 1,
                  }}
                >
                  12,847
                </Typography>
                <Chip
                  label="+12.3% this month"
                  size="small"
                  sx={{
                    bgcolor: scheme.primary,
                    color: scheme.onPrimary,
                    fontWeight: 500,
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Active users across all platforms in the current billing cycle.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Info panel */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: scheme.outlineVariant,
                bgcolor: 'background.paper',
              }}
            >
              <CardContent>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <InfoIcon sx={{ color: scheme.tertiary }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Info Panel
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This card uses an outlined variant style. It is useful for secondary information, tips, or callouts that should not dominate the visual hierarchy.
                </Typography>
                <Chip
                  label="Status: Active"
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: scheme.tertiary, color: scheme.tertiary }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>

      {/* ── 5. Alerts & Toasts ── */}
      <SectionHeading
        title="Alerts & Toasts"
        description="Feedback components for success, info, warning, and error states."
      />

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          mb: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Filled Alerts
        </Typography>
        <Stack sx={{ gap: 1.5, mb: 3 }}>
          <Alert severity="success" icon={<CheckCircleIcon />} sx={{ borderRadius: 2 }}>
            Operation completed successfully.
          </Alert>
          <Alert severity="info" icon={<InfoIcon />} sx={{ borderRadius: 2 }}>
            Here is some helpful information you should know.
          </Alert>
          <Alert severity="warning" icon={<WarningAmberIcon />} sx={{ borderRadius: 2 }}>
            Please review before proceeding.
          </Alert>
          <Alert severity="error" icon={<ErrorIcon />} sx={{ borderRadius: 2 }}>
            Something went wrong. Please try again.
          </Alert>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Outlined Alerts
        </Typography>
        <Stack sx={{ gap: 1.5, mb: 3 }}>
          <Alert severity="success" variant="outlined" icon={<CheckCircleIcon />} sx={{ borderRadius: 2 }}>
            Your changes have been saved.
          </Alert>
          <Alert severity="info" variant="outlined" icon={<InfoIcon />} sx={{ borderRadius: 2 }}>
            A new version is available for download.
          </Alert>
          <Alert severity="warning" variant="outlined" icon={<WarningAmberIcon />} sx={{ borderRadius: 2 }}>
            Your session will expire in 5 minutes.
          </Alert>
          <Alert severity="error" variant="outlined" icon={<ErrorIcon />} sx={{ borderRadius: 2 }}>
            Access denied. Insufficient permissions.
          </Alert>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Toast / Snackbar
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <Button variant="outlined" size="small" onClick={() => setToastOpen(true)}>
            Success Toast
          </Button>
          <Button variant="outlined" size="small" onClick={() => setErrorToastOpen(true)}>
            Error Toast
          </Button>
        </Stack>

        {/* Simulated toast cards */}
        <Stack sx={{ mt: 2, gap: 1.5 }}>
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            action={<CloseIcon sx={{ cursor: 'pointer', opacity: 0.6 }} />}
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            File uploaded successfully!
          </Alert>
          <Alert
            severity="error"
            icon={<ErrorIcon />}
            action={<CloseIcon sx={{ cursor: 'pointer', opacity: 0.6 }} />}
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          >
            Failed to save changes.
          </Alert>
        </Stack>
      </Paper>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Changes saved successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorToastOpen}
        autoHideDuration={4000}
        onClose={() => setErrorToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorToastOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Unable to process your request.
        </Alert>
      </Snackbar>
    </Box>
  );
}
