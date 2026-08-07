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
  Stack,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  Badge,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/Person';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';

const TABS = [
  { key: 'buttons', label: 'Buttons', icon: <SmartButtonIcon /> },
  { key: 'forms', label: 'Forms', icon: <TextFieldsIcon /> },
  { key: 'cards', label: 'Cards', icon: <DashboardIcon /> },
  { key: 'feedback', label: 'Feedback', icon: <NotificationsIcon /> },
] as const;

type TabKey = (typeof TABS)[number]['key'];

/* ─── Shared ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 600,
        color: 'text.secondary',
        mb: 1.5,
        display: 'block',
      }}
    >
      {children}
    </Typography>
  );
}

/* ─── Buttons Panel ─── */

function ButtonsPanel() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>
      {/* Primary Actions */}
      <Box>
        <SectionLabel>Primary Actions</SectionLabel>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}>
          <Button variant="contained" startIcon={<SendIcon />} sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Send Invite
          </Button>
          <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Get Started
          </Button>
          <Button variant="contained" disabled sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Processing...
          </Button>
        </Stack>
      </Box>

      <Divider />

      {/* Secondary Actions */}
      <Box>
        <SectionLabel>Secondary Actions</SectionLabel>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}>
          <Button variant="outlined" startIcon={<BookmarkBorderIcon />} sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Save Draft
          </Button>
          <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Cancel
          </Button>
          <Button variant="text" startIcon={<ShareIcon />} sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Share
          </Button>
        </Stack>
      </Box>

      <Divider />

      {/* Destructive */}
      <Box>
        <SectionLabel>Destructive</SectionLabel>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 } }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}
          >
            Delete Project
          </Button>
          <Button variant="text" color="error" sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
            Remove Account
          </Button>
        </Stack>
      </Box>

      <Divider />

      {/* Icon Only */}
      <Box>
        <SectionLabel>Icon Buttons</SectionLabel>
        <Stack direction="row" sx={{ gap: { xs: 0.75, sm: 1 }, alignItems: 'center' }}>
          <IconButton sx={{ borderRadius: 2, minWidth: 44, minHeight: 44 }}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ borderRadius: 2, minWidth: 44, minHeight: 44 }}>
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" sx={{ borderRadius: 2, minWidth: 44, minHeight: 44 }}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ minWidth: 44, minHeight: 44 }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      {/* FAB */}
      <Box>
        <SectionLabel>Floating Action Button</SectionLabel>
        <Stack direction="row" sx={{ gap: { xs: 1.5, sm: 2 }, alignItems: 'center' }}>
          <Button
            variant="contained"
            sx={{
              minWidth: 56,
              height: { xs: 48, sm: 56 },
              borderRadius: '16px',
              textTransform: 'none',
            }}
          >
            <SendIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              height: { xs: 48, sm: 56 },
              borderRadius: '16px',
              textTransform: 'none',
              px: { xs: 2, sm: 3 },
            }}
          >
            <SendIcon sx={{ mr: 1 }} />
            Compose
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

/* ─── Forms Panel ─── */

function FormsPanel() {
  const scheme = useMemo(() => generateSchemeFromConfig(useThemeStore.getState().config), []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>
      {/* Signup form mock */}
      <Box>
        <SectionLabel>Sign Up Form</SectionLabel>
        <Card variant="outlined" sx={{ borderRadius: 3, maxWidth: { xs: '100%', sm: 480 } }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Avatar
                sx={{
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  mx: 'auto',
                  mb: 1.5,
                  bgcolor: scheme.primaryContainer,
                  color: scheme.onPrimaryContainer,
                }}
              >
                <PersonOutlineIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Create Account</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Start your free trial today</Typography>
            </Box>

            <TextField label="Full Name" variant="outlined" size="small" placeholder="Oluwasegun" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField label="Email" variant="outlined" size="small" placeholder="oluwasegun@example.com" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              helperText="Must be at least 8 characters"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <FormControlLabel
              control={<Switch size="small" />}
              label={<Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>I agree to the Terms of Service</Typography>}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ textTransform: 'none', borderRadius: 2, py: 1.25, fontWeight: 600, minHeight: 44 }}
            >
              Create Account
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              Already have an account?{' '}
              <Typography component="span" variant="body2" sx={{ color: scheme.primary, fontWeight: 600, cursor: 'pointer' }}>
                Sign in
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Divider />

      {/* Input states */}
      <Box>
        <SectionLabel>Input States</SectionLabel>
        <Stack sx={{ gap: 2, maxWidth: { xs: '100%', sm: 400 } }}>
          <TextField label="Default" variant="outlined" size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="With Helper" variant="outlined" size="small" helperText="Enter your workspace name" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Error" variant="outlined" size="small" error helperText="This name is already taken" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Disabled" variant="outlined" size="small" disabled fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
        </Stack>
      </Box>

      <Divider />

      {/* Variants */}
      <Box>
        <SectionLabel>Field Variants</SectionLabel>
        <Stack sx={{ gap: 2, maxWidth: { xs: '100%', sm: 400 } }}>
          <TextField label="Outlined" variant="outlined" size="small" fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
          <TextField label="Filled" variant="filled" size="small" fullWidth />
          <TextField label="Standard" variant="standard" size="small" fullWidth />
        </Stack>
      </Box>
    </Box>
  );
}

/* ─── Cards Panel ─── */

function CardsPanel() {
  const scheme = useMemo(() => generateSchemeFromConfig(useThemeStore.getState().config), []);
  const [liked, setLiked] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>
      {/* Content Card */}
      <Box>
        <SectionLabel>Content Card</SectionLabel>
        <Card
          sx={{
            borderRadius: 3,
            maxWidth: { xs: '100%', sm: 480 },
            overflow: 'hidden',
            transition: 'transform 0.3s',
            '&:hover': { transform: 'translateY(-2px)' },
          }}
        >
          <Box
            sx={{
              height: { xs: 150, sm: 180 },
              background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.tertiary} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Typography variant="h3" sx={{ color: scheme.onPrimary, opacity: 0.6, fontWeight: 300, fontSize: { xs: '2rem', sm: '3rem' } }}>OA</Typography>
            <Chip
              label="New"
              size="small"
              sx={{
                position: 'absolute',
                top: { xs: 8, sm: 12 },
                right: { xs: 8, sm: 12 },
                bgcolor: scheme.surfaceContainerHighest,
                color: scheme.onSurface,
                fontWeight: 600,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
              }}
            />
          </Box>
          <CardContent sx={{ pb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              Design System v2.0
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              A comprehensive collection of design tokens, components, and guidelines for building consistent interfaces.
            </Typography>
          </CardContent>
          <CardActions sx={{ px: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 }, pt: 1 }}>
            <Button size="small" variant="contained" sx={{ textTransform: 'none', borderRadius: 1.5, minHeight: 44 }}>
              View Details
            </Button>
            <IconButton size="small" onClick={() => setLiked(!liked)} sx={{ minWidth: 44, minHeight: 44 }}>
              <Badge color="error" variant="dot" invisible={!liked}>
                <FavoriteBorderIcon sx={{ color: liked ? 'error.main' : 'text.secondary', fontSize: 20 }} />
              </Badge>
            </IconButton>
          </CardActions>
        </Card>
      </Box>

      <Divider />

      {/* Stat Card */}
      <Box>
        <SectionLabel>Stat Card</SectionLabel>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {[
            { label: 'Total Revenue', value: '₦48,290', change: '+12.5%', up: true, color: scheme.primary },
            { label: 'Active Users', value: '2,847', change: '+8.2%', up: true, color: scheme.secondary },
            { label: 'Bounce Rate', value: '24.3%', change: '-3.1%', up: false, color: scheme.tertiary },
          ].map((stat) => (
            <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  height: '100%',
                  transition: 'transform 0.3s',
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, mb: 0.75, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                    {stat.value}
                  </Typography>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      height: { xs: 22, sm: 24 },
                      fontSize: { xs: '0.65rem', sm: '0.7rem' },
                      fontWeight: 600,
                      bgcolor: stat.up ? `${scheme.primary}15` : `${scheme.error}15`,
                      color: stat.up ? scheme.primary : scheme.error,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider />

      {/* Profile Card */}
      <Box>
        <SectionLabel>Profile Card</SectionLabel>
        <Card variant="outlined" sx={{ borderRadius: 3, maxWidth: { xs: '100%', sm: 360 } }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3 }, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: { xs: 56, sm: 72 },
                height: { xs: 56, sm: 72 },
                mx: 'auto',
                mb: 2,
                bgcolor: scheme.primaryContainer,
                color: scheme.onPrimaryContainer,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 600,
              }}
            >
              OA
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>Oluwasegun Awodeyi</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              Product Designer
            </Typography>
            <Stack direction="row" sx={{ justifyContent: 'center', gap: { xs: 2, sm: 3 }, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>128</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Projects</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>2.4k</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Followers</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' } }}>89</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Following</Typography>
              </Box>
            </Stack>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              sx={{ textTransform: 'none', borderRadius: 2, minHeight: 44 }}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

/* ─── Feedback Panel ─── */

function FeedbackPanel() {
  const [toastOpen, setToastOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 5 } }}>
      {/* Alerts */}
      <Box>
        <SectionLabel>Alerts</SectionLabel>
        <Stack sx={{ gap: 1.5, maxWidth: { xs: '100%', sm: 520 } }}>
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ borderRadius: 2 }}
          >
            Your changes have been saved successfully.
          </Alert>
          <Alert
            severity="info"
            icon={<InfoOutlinedIcon />}
            sx={{ borderRadius: 2 }}
          >
            A new version is available. Refresh to update.
          </Alert>
          <Alert
            severity="warning"
            icon={<WarningAmberIcon />}
            sx={{ borderRadius: 2 }}
          >
            Your session will expire in 5 minutes.
          </Alert>
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            sx={{ borderRadius: 2 }}
          >
            Unable to process your payment. Please try again.
          </Alert>
        </Stack>
      </Box>

      <Divider />

      {/* Inline Feedback */}
      <Box>
        <SectionLabel>Inline Feedback</SectionLabel>
        <Stack sx={{ gap: 1.5, maxWidth: { xs: '100%', sm: 520 } }}>
          <Alert
            severity="success"
            variant="outlined"
            icon={<CheckCircleIcon />}
            action={<IconButton size="small" aria-label="close"><CloseIcon fontSize="inherit" /></IconButton>}
            sx={{ borderRadius: 2 }}
          >
            File uploaded — 3 items ready for review.
          </Alert>
          <Alert
            severity="error"
            variant="outlined"
            icon={<ErrorOutlineIcon />}
            action={<Button size="small" color="inherit" sx={{ textTransform: 'none', minHeight: 44 }}>Retry</Button>}
            sx={{ borderRadius: 2 }}
          >
            Network error — check your connection.
          </Alert>
        </Stack>
      </Box>

      <Divider />

      {/* Toast Trigger */}
      <Box>
        <SectionLabel>Toast Notification</SectionLabel>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1, sm: 1.5 } }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setToastOpen(true)}
            sx={{ textTransform: 'none', borderRadius: 2, minHeight: 44 }}
          >
            Show Toast
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setDialogOpen(true)}
            sx={{ textTransform: 'none', borderRadius: 2, minHeight: 44 }}
          >
            Show Dialog
          </Button>
        </Stack>
      </Box>

      <Divider />

      {/* Progress */}
      <Box>
        <SectionLabel>Progress Indicators</SectionLabel>
        <Stack sx={{ gap: 2.5, maxWidth: { xs: '100%', sm: 400 } }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Uploading...</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>72%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={72} sx={{ borderRadius: 2, height: { xs: 8, sm: 6 } }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Processing</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>34%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={34} color="secondary" sx={{ borderRadius: 2, height: { xs: 8, sm: 6 } }} />
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Snackbar Demo */}
      <Box>
        <SectionLabel>Live Toast</SectionLabel>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
          Click to see a real toast notification appear.
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setToastOpen(true)}
          sx={{ textTransform: 'none', borderRadius: 2, minHeight: 44 }}
        >
          Trigger Toast
        </Button>
      </Box>

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
          icon={<CheckCircleIcon />}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Changes saved successfully.
        </Alert>
      </Snackbar>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            Are you sure you want to delete this project? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: 'none', minHeight: 44 }}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDialogOpen(false)}
            sx={{ textTransform: 'none', minHeight: 44 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ─── Main Page ─── */

export default function ComponentsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState<TabKey>('buttons');

  const renderPanel = () => {
    switch (activeTab) {
      case 'buttons': return <ButtonsPanel />;
      case 'forms': return <FormsPanel />;
      case 'cards': return <CardsPanel />;
      case 'feedback': return <FeedbackPanel />;
    }
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}>
          Components
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
          Live, theme-aware components — styled with your current design tokens
        </Typography>
      </Box>

      {isMobile ? (
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v as TabKey)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mb: 2,
              '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.85rem' } },
            }}
          >
            {TABS.map((t) => (
              <Tab key={t.key} value={t.key} label={t.label} icon={t.icon} iconPosition="start" />
            ))}
          </Tabs>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3, md: 4 }, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: { xs: 160, sm: 180, md: 200 },
              flexShrink: 0,
              position: 'sticky',
              top: 80,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v as TabKey)}
              orientation="vertical"
              sx={{
                '& .MuiTabs-indicator': {
                  left: 0,
                  width: 2.5,
                  borderRadius: '0 2px 2px 0',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  minHeight: 44,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  px: 2,
                  gap: 1.25,
                  color: 'text.secondary',
                  '&.Mui-selected': { color: 'text.primary' },
                },
              }}
            >
              {TABS.map((t) => (
                <Tab key={t.key} value={t.key} label={t.label} icon={t.icon} iconPosition="start" />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, maxWidth: { xs: '100%', md: 640 } }}>
            {renderPanel()}
          </Box>
        </Box>
      )}

      {isMobile && (
        <Box sx={{ maxWidth: { xs: '100%', sm: 640 } }}>{renderPanel()}</Box>
      )}
    </Box>
  );
}
