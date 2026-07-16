'use client';

import React, { useState, useCallback } from 'react';
import {
  Box, Typography, Stack, Chip, Snackbar, Alert, Tooltip, Divider, IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateTypeScale, type TypeStyle } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const TYPE_GROUPS = [
  {
    label: 'Titles',
    description: 'Display & Headline — large, expressive text for hero moments',
    families: ['display', 'headline'],
  },
  {
    label: 'Text',
    description: 'Body, Title & Label — readable content for paragraphs and UI',
    families: ['title', 'body', 'label'],
  },
] as const;

const PAIRINGS = [
  {
    title: 'Hero Section',
    description: 'Bold impact + readable body',
    styles: ['Display Large', 'Body Large'],
  },
  {
    title: 'Content Block',
    description: 'Section header + supporting text',
    styles: ['Headline Medium', 'Body Medium'],
  },
  {
    title: 'Compact Card',
    description: 'Dense layout + clear labels',
    styles: ['Title Medium', 'Label Large'],
  },
  {
    title: 'Navigation',
    description: 'UI labels + small text',
    styles: ['Label Medium', 'Label Small'],
  },
] as const;

function buildCss(style: TypeStyle, fontFamily: string): string {
  return [
    `font-family: ${fontFamily};`,
    `font-size: ${style.fontSize}px;`,
    `font-weight: ${style.fontWeight};`,
    `line-height: ${style.lineHeight};`,
    `letter-spacing: ${style.letterSpacing}px;`,
  ].join(' ');
}

function buildPairingCss(styles: TypeStyle[], fontFamily: string): string {
  return styles.map((s) => `/* ${s.name} */\n${buildCss(s, fontFamily)}`).join('\n\n');
}

function TypeRow({
  style, fontFamily, onCopy,
}: {
  style: TypeStyle; fontFamily: string; onCopy: (text: string, label: string) => void;
}) {
  const css = buildCss(style, fontFamily);

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        px: { xs: 1.5, sm: 2 },
        py: 1,
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.15s',
        '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
      }}
    >
      {/* Name */}
      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 12.5, minWidth: { xs: 100, sm: 130 }, flexShrink: 0 }}>
        {style.name}
      </Typography>

      {/* Specs */}
      <Stack direction="row" spacing={0.5} sx={{ flex: 1, minWidth: 0, flexWrap: 'wrap', gap: 0.5 }}>
        <Chip label={`${style.fontSize}px`} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace' }} />
        <Chip label={`w${style.fontWeight}`} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace' }} />
        <Chip label={`lh ${style.lineHeight}`} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace', display: { xs: 'none', sm: 'inline-flex' } }} />
        <Chip label={`${style.letterSpacing}px`} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace', display: { xs: 'none', sm: 'inline-flex' } }} />
      </Stack>

      {/* Copy button */}
      <Tooltip title="Copy CSS">
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); onCopy(css, `${style.name} CSS`); }}
          sx={{ ml: 1, width: 28, height: 28, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          <ContentCopyIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

const MemoizedTypeRow = React.memo(TypeRow);

function PairingCard({
  pairing, typeScale, fontFamily, onCopy,
}: {
  pairing: typeof PAIRINGS[number]; typeScale: TypeStyle[]; fontFamily: string;
  onCopy: (text: string, label: string) => void;
}) {
  const pairedStyles = pairing.styles
    .map((name) => typeScale.find((s) => s.name === name))
    .filter(Boolean) as TypeStyle[];

  if (pairedStyles.length === 0) return null;

  const css = buildPairingCss(pairedStyles, fontFamily);

  return (
    <Box sx={{
      p: { xs: 1.5, sm: 2 },
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.15s',
      '&:hover': { borderColor: 'primary.main', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
    }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>{pairing.title}</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>{pairing.description}</Typography>
        </Box>
        <Tooltip title="Copy all CSS">
          <IconButton
            size="small"
            onClick={() => onCopy(css, `${pairing.title} CSS`)}
            sx={{ width: 28, height: 28, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <ContentCopyIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack spacing={0.5}>
        {pairedStyles.map((s) => (
          <Stack key={s.name} direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
            <Chip label={s.name} size="small" sx={{ fontSize: 9, height: 18, bgcolor: 'action.hover', fontWeight: 500 }} />
            <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace', fontSize: 9 }}>
              {s.fontSize}px / w{s.fontWeight}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

const MemoizedPairingCard = React.memo(PairingCard);

export default function TypographySection() {
  const config = useThemeStore((s) => s.config);
  const typeScale = generateTypeScale(config.typography);
  const fontFamily = config.typography.fontFamily?.trim()
    ? `'${config.typography.fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });

  const handleCopy = useCallback(async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) setSnack({ open: true, msg: `${label} copied` });
  }, []);

  const handleCopyAll = useCallback(() => {
    const all = typeScale.map((s) => `/* ${s.name} */\n${buildCss(s, fontFamily)}`).join('\n\n');
    handleCopy(all, 'All typography CSS');
  }, [typeScale, fontFamily, handleCopy]);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Typography Scale
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8125rem', md: '0.875rem' }, mt: 0.25 }}>
            Using <Box component="span" sx={{ fontFamily, fontWeight: 500 }}>{config.typography.fontFamily || 'Inter'}</Box> · Click copy to grab CSS
          </Typography>
        </Box>
        <Tooltip title="Copy all CSS">
          <IconButton
            size="small"
            onClick={handleCopyAll}
            sx={{ width: 32, height: 32, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            <ContentCopyIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Type groups */}
      {TYPE_GROUPS.map(({ label, description, families }) => {
        const styles = typeScale.filter((s) => (families as readonly string[]).includes(s.family));
        if (styles.length === 0) return null;
        return (
          <Box key={label} sx={{ mb: { xs: 3, md: 4 } }}>
            <Stack sx={{ mb: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.9375rem', sm: '1.0625rem' } }}>
                {label}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>
                {description}
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              {styles.map((style) => (
                <MemoizedTypeRow
                  key={style.name}
                  style={style}
                  fontFamily={fontFamily}
                  onCopy={handleCopy}
                />
              ))}
            </Stack>
          </Box>
        );
      })}

      {/* Divider */}
      <Divider sx={{ my: { xs: 3, md: 4 } }} />

      {/* Recommended Pairings */}
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.25, fontSize: { xs: '0.9375rem', sm: '1.0625rem' } }}>
          Recommended Pairings
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2, fontSize: 11 }}>
          Suggested font combinations for common layouts — click copy to grab the CSS
        </Typography>
        <Stack spacing={1.5}>
          {PAIRINGS.map((pairing) => (
            <MemoizedPairingCard
              key={pairing.title}
              pairing={pairing}
              typeScale={typeScale}
              fontFamily={fontFamily}
              onCopy={handleCopy}
            />
          ))}
        </Stack>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={1500}
        onClose={() => setSnack({ open: false, msg: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
