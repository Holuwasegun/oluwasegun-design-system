'use client';

import React, { useState, useCallback } from 'react';
import { Box, Typography, Stack, Chip, Snackbar, Alert, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateTypeScale } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const TYPE_FAMILIES = [
  { label: 'Display', family: 'display', description: 'Large, attention-grabbing headings' },
  { label: 'Headline', family: 'headline', description: 'Prominent section headings' },
  { label: 'Title', family: 'title', description: 'Compact headings and navigation labels' },
  { label: 'Body', family: 'body', description: 'Long-form readable content' },
  { label: 'Label', family: 'label', description: 'Small UI elements and buttons' },
] as const;

const SIZES = ['large', 'medium', 'small'] as const;

const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';

function TypeCard({
  name,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  isHeading,
}: {
  name: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  fontFamily: string;
  isHeading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const tokenName = `--font-${name.toLowerCase().replace(/\s+/g, '-')}`;

  const handleCopy = useCallback(async () => {
    const css = `font-size: ${fontSize}px; font-weight: ${fontWeight}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}px; font-family: ${fontFamily};`;
    const ok = await copyToClipboard(css);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [fontSize, fontWeight, lineHeight, letterSpacing, fontFamily]);

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          p: 3,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          '&:hover': { borderColor: 'primary.main', boxShadow: 2 },
          '&:hover .copy-icon': { opacity: 1 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
              {tokenName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Chip label={`${fontSize}px`} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 22 }} />
            <Chip label={`w${fontWeight}`} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.65rem', height: 22 }} />
            <ContentCopyIcon className="copy-icon" sx={{ fontSize: 14, color: 'text.secondary', opacity: 0, transition: 'opacity 0.2s' }} />
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography
          sx={{
            fontSize,
            fontWeight,
            lineHeight,
            letterSpacing: `${letterSpacing}px`,
            fontFamily,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {isHeading ? 'Design System' : SAMPLE_TEXT}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>Size: {fontSize}px</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>Height: {lineHeight}</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>Spacing: {letterSpacing}px</Typography>
        </Box>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          CSS token copied
        </Alert>
      </Snackbar>
    </>
  );
}

const MemoizedTypeCard = React.memo(TypeCard);

export default function TypographySection() {
  const config = useThemeStore((s) => s.config);
  const typeScale = generateTypeScale(config.typography);
  const fontFamily = config.typography.fontFamily?.trim()
    ? `'${config.typography.fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
    : "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Typography Scale</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Click any type card to copy its CSS properties. Currently using: <Box component="span" sx={{ fontFamily, fontWeight: 500 }}>{config.typography.fontFamily || 'Inter'}</Box>
      </Typography>

      {TYPE_FAMILIES.map(({ label, family, description }) => {
        const styles = typeScale.filter((s) => s.family === family);
        return (
          <Box key={family} sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 0.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>{label}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{description}</Typography>
            </Box>
            <Stack spacing={2}>
              {styles.map((style) => (
                <MemoizedTypeCard
                  key={style.name}
                  name={style.name}
                  fontSize={style.fontSize}
                  fontWeight={style.fontWeight}
                  lineHeight={style.lineHeight}
                  letterSpacing={style.letterSpacing}
                  fontFamily={fontFamily}
                  isHeading={family === 'display' || family === 'headline'}
                />
              ))}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
