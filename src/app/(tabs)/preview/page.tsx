'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig, type ColorScheme } from '@/theme/scheme';
import AuthLoginTemplate from '@/components/preview/AuthLoginTemplate';
import SaaSDashboardTemplate from '@/components/preview/SaaSDashboardTemplate';
import MarketingHeroTemplate from '@/components/preview/MarketingHeroTemplate';
import EcommerceProductCard from '@/components/preview/EcommerceProductCard';
import SocialMediaFlyerTemplate from '@/components/preview/SocialMediaFlyerTemplate';

const PRESETS = [
  { key: 'auth-login', label: 'Auth Login Form', description: 'Sign-in page with hero panel, form fields, and action buttons' },
  { key: 'saas-dashboard', label: 'SaaS App Dashboard', description: 'Sidebar navigation, top bar, stat cards with theme colors' },
  { key: 'marketing-hero', label: 'Marketing Hero Page', description: 'Landing page with headline, CTA buttons, and preview card' },
  { key: 'ecommerce-card', label: 'E-commerce Product Card', description: 'Product cards with ratings, descriptions, and add-to-cart' },
  { key: 'social-flyer', label: 'Social Media Flyer', description: 'Instagram-style posts with gradient hero, testimonial, and feature announcement' },
] as const;

type PresetKey = (typeof PRESETS)[number]['key'];

export default function PreviewPage() {
  const { config } = useThemeStore();
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('auth-login');
  const scheme: ColorScheme = useMemo(() => generateSchemeFromConfig(config), [config]);

  const currentPreset = PRESETS.find((p) => p.key === selectedPreset)!;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Preview
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        See how your design system tokens come together in real-world UI patterns
      </Typography>

      {/* Preset Selector */}
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          mb: 4,
          p: 2,
          flexWrap: 'wrap',
        }}
      >
        <FormControl size="small" sx={{ minWidth: 260 }}>
          <InputLabel id="preview-preset-label">Select Preset</InputLabel>
          <Select
            labelId="preview-preset-label"
            value={selectedPreset}
            label="Select Preset"
            onChange={(e) => setSelectedPreset(e.target.value as PresetKey)}
            sx={{ fontWeight: 600 }}
          >
            {PRESETS.map((preset) => (
              <MenuItem key={preset.key} value={preset.key}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {preset.label}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {currentPreset.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentPreset.description}
          </Typography>
        </Box>

        <Chip
          label={`${config.mode} mode`}
          size="small"
          color={config.mode === 'dark' ? 'secondary' : 'primary'}
          variant="outlined"
          sx={{ fontWeight: 600, textTransform: 'capitalize' }}
        />
      </Paper>

      {/* Preview Container */}
      <Paper
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {selectedPreset === 'auth-login' && <AuthLoginTemplate scheme={scheme} />}
        {selectedPreset === 'saas-dashboard' && <SaaSDashboardTemplate scheme={scheme} />}
        {selectedPreset === 'marketing-hero' && <MarketingHeroTemplate scheme={scheme} />}
        {selectedPreset === 'ecommerce-card' && <EcommerceProductCard scheme={scheme} />}
        {selectedPreset === 'social-flyer' && <SocialMediaFlyerTemplate scheme={scheme} />}
      </Paper>

      {/* Token Summary */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 3, }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
          Active Design Tokens
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {[
            { label: 'Primary', value: scheme.primary },
            { label: 'Secondary', value: scheme.secondary },
            { label: 'Tertiary', value: scheme.tertiary },
            { label: 'Surface', value: scheme.surface },
            { label: 'Error', value: scheme.error },
          ].map((token) => (
            <Box key={token.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: token.value, }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{token.label}</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{token.value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
