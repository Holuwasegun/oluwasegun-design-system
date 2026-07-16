'use client';

import React, { useState, useCallback } from 'react';
import { Box, Typography, Stack, Chip, Snackbar, Alert, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateTypeScale } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const TYPE_FAMILIES = [
  { label: 'Display', family: 'display', description: 'Large headings' },
  { label: 'Headline', family: 'headline', description: 'Section headings' },
  { label: 'Title', family: 'title', description: 'Compact headings' },
  { label: 'Body', family: 'body', description: 'Readable content' },
  { label: 'Label', family: 'label', description: 'UI elements' },
] as const;

const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';

function TypeCard({
  name, fontSize, fontWeight, lineHeight, letterSpacing, fontFamily, isHeading,
}: {
  name: string; fontSize: number; fontWeight: number; lineHeight: number;
  letterSpacing: number; fontFamily: string; isHeading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopy = useCallback(async () => {
    const css = `font-size: ${fontSize}px; font-weight: ${fontWeight}; line-height: ${lineHeight}; letter-spacing: ${letterSpacing}px; font-family: ${fontFamily};`;
    const ok = await copyToClipboard(css);
    if (ok) { setCopied(true); setSnack(true); setTimeout(() => setCopied(false), 1500); }
  }, [fontSize, fontWeight, lineHeight, letterSpacing, fontFamily]);

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          px: { xs: 1.5, sm: 2 }, py: { xs: 1, sm: 1.5 }, borderRadius: 2,
          border: '1px solid', borderColor: 'divider', cursor: 'pointer',
          transition: 'all 0.2s', position: 'relative',
          '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
          '&:hover .copy-icon': { opacity: 1 },
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 1 }} sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', sm: '0.875rem' }, whiteSpace: 'nowrap' }}>{name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontFamily: 'monospace', fontSize: '0.625rem', display: { xs: 'none', sm: 'block' } }}>
              {`--font-${name.toLowerCase().replace(/\s+/g, '-')}`}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <Chip label={`${fontSize}px`} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.6rem', height: 20 }} />
            <Chip label={`w${fontWeight}`} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: '0.6rem', height: 20 }} />
            <ContentCopyIcon className="copy-icon" sx={{ fontSize: 13, color: 'text.secondary', opacity: 0, transition: 'opacity 0.2s' }} />
          </Stack>
        </Stack>
        <Typography
          sx={{
            fontSize: { xs: Math.min(fontSize, 28), sm: fontSize },
            fontWeight, lineHeight, letterSpacing: `${letterSpacing}px`, fontFamily,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mt: 0.5,
          }}
        >
          {isHeading ? 'Design System' : SAMPLE_TEXT}
        </Typography>
        <Stack direction="row" spacing={1.5} sx={{ mt: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>{fontSize}px</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>{lineHeight}</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>{letterSpacing}px</Typography>
        </Stack>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>CSS token copied</Alert>
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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Typography Scale</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
        Click any card to copy CSS. Using: <Box component="span" sx={{ fontFamily, fontWeight: 500 }}>{config.typography.fontFamily || 'Inter'}</Box>
      </Typography>

      {TYPE_FAMILIES.map(({ label, family, description }) => {
        const styles = typeScale.filter((s) => s.family === family);
        return (
          <Box key={family} sx={{ mb: { xs: 3, sm: 4 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', mb: 0.75 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: { xs: '0.9375rem', sm: '1.125rem' } }}>{label}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{description}</Typography>
            </Stack>
            <Stack spacing={{ xs: 0.75, sm: 1 }}>
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
