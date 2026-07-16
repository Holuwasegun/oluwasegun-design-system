'use client';

import React, { useState, useCallback } from 'react';
import {
  Box, Typography, Stack, Chip, Snackbar, Alert, Tooltip, Divider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateTypeScale, type TypeStyle } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const BRAND_COPY: Record<string, string> = {
  'Display Large': 'Design the Future',
  'Display Medium': 'Design the Future',
  'Display Small': 'Design the Future',
  'Headline Large': 'Built for creators who move fast',
  'Headline Medium': 'Built for creators',
  'Headline Small': 'Built for creators',
  'Title Large': 'A system that scales with you',
  'Title Medium': 'A system that scales',
  'Title Small': 'A system that scales',
  'Body Large': 'Every component is crafted with intention, tested in real products, and documented for seamless adoption.',
  'Body Medium': 'Every component is crafted with intention and tested in real products.',
  'Body Small': 'Crafted with intention.',
  'Label Large': 'Get Started',
  'Label Medium': 'Learn More',
  'Label Small': 'View',
};

const TYPE_GROUPS = [
  {
    label: 'Titles',
    description: 'Large, expressive text for hero moments and headings',
    families: ['display', 'headline'],
  },
  {
    label: 'Text',
    description: 'Readable content for paragraphs, captions, and UI labels',
    families: ['title', 'body', 'label'],
  },
] as const;

const PAIRINGS = [
  {
    title: 'Hero Section',
    description: 'Bold impact with readable body',
    headline: 'Display Large',
    body: 'Body Large',
  },
  {
    title: 'Content Block',
    description: 'Section header with supporting text',
    headline: 'Headline Medium',
    body: 'Body Medium',
  },
  {
    title: 'Compact Card',
    description: 'Dense layout with clear labels',
    headline: 'Title Medium',
    body: 'Label Large',
  },
] as const;

function getRelativeSize(fontSize: number, allSizes: number[]): number {
  const max = Math.max(...allSizes);
  const min = Math.min(...allSizes);
  if (max === min) return 50;
  return ((fontSize - min) / (max - min)) * 100;
}

function TypeCard({
  style, fontFamily, allSizes,
}: {
  style: TypeStyle; fontFamily: string; allSizes: number[];
}) {
  const [copied, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = useCallback(async () => {
    const css = `font-size: ${style.fontSize}px; font-weight: ${style.fontWeight}; line-height: ${style.lineHeight}; letter-spacing: ${style.letterSpacing}px; font-family: ${fontFamily};`;
    const ok = await copyToClipboard(css);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [style, fontFamily]);

  const relativeSize = getRelativeSize(style.fontSize, allSizes);
  const sampleText = BRAND_COPY[style.name] || 'Design the Future';

  return (
    <>
      <Box
        sx={{
          px: { xs: 1.5, sm: 2.5 },
          py: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          transition: 'all 0.2s',
          position: 'relative',
          '&:hover': { borderColor: 'primary.main', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
          '&:hover .copy-icon': { opacity: 1 },
        }}
        onClick={handleCopy}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', mb: 0.75 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                {style.name}
              </Typography>
              <Tooltip
                title={
                  <Box sx={{ p: 0.5 }}>
                    <Typography sx={{ fontSize: 11, fontFamily: 'monospace' }}>
                      {`font-size: ${style.fontSize}px`}
                    </Typography>
                    <Typography sx={{ fontSize: 11, fontFamily: 'monospace' }}>
                      {`font-weight: ${style.fontWeight}`}
                    </Typography>
                    <Typography sx={{ fontSize: 11, fontFamily: 'monospace' }}>
                      {`line-height: ${style.lineHeight}`}
                    </Typography>
                    <Typography sx={{ fontSize: 11, fontFamily: 'monospace' }}>
                      {`letter-spacing: ${style.letterSpacing}px`}
                    </Typography>
                  </Box>
                }
                arrow
                placement="top"
              >
                <Chip
                  label={`${style.fontSize}px`}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'monospace', fontSize: '0.6rem', height: 18, cursor: 'help' }}
                  onClick={(e) => e.stopPropagation()}
                />
              </Tooltip>
              <ContentCopyIcon className="copy-icon" sx={{ fontSize: 13, color: 'text.secondary', opacity: 0, transition: 'opacity 0.2s' }} />
            </Stack>

            {/* Sample text */}
            <Typography
              sx={{
                fontSize: { xs: Math.min(style.fontSize, 28), sm: style.fontSize },
                fontWeight: style.fontWeight,
                lineHeight: style.lineHeight,
                letterSpacing: `${style.letterSpacing}px`,
                fontFamily,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: style.fontSize > 24 ? 'normal' : 'nowrap',
                color: 'text.primary',
              }}
            >
              {sampleText}
            </Typography>
          </Box>

          {/* Visual scale indicator */}
          <Box sx={{ width: 48, flexShrink: 0, display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', pt: 0.25 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 9, fontFamily: 'monospace', mb: 0.25 }}>
              {style.fontSize}px
            </Typography>
            <Box sx={{ width: '100%', height: 6, borderRadius: 3, bgcolor: 'action.hover', overflow: 'hidden' }}>
              <Box sx={{ width: `${relativeSize}%`, height: '100%', borderRadius: 3, bgcolor: 'primary.main', transition: 'width 0.3s' }} />
            </Box>
          </Box>
        </Stack>

        {/* Technical details - click to reveal */}
        {expanded && (
          <Stack direction="row" spacing={1.5} sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', fontFamily: 'monospace' }}>
              weight: {style.fontWeight}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', fontFamily: 'monospace' }}>
              line-height: {style.lineHeight}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', fontFamily: 'monospace' }}>
              tracking: {style.letterSpacing}px
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', fontFamily: 'monospace' }}>
              {`--font-${style.name.toLowerCase().replace(/\s+/g, '-')}`}
            </Typography>
          </Stack>
        )}
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>CSS token copied</Alert>
      </Snackbar>
    </>
  );
}

const MemoizedTypeCard = React.memo(TypeCard);

function PairingCard({ pairing, typeScale, fontFamily }: {
  pairing: typeof PAIRINGS[number]; typeScale: TypeStyle[]; fontFamily: string;
}) {
  const headlineStyle = typeScale.find((s) => s.name === pairing.headline);
  const bodyStyle = typeScale.find((s) => s.name === pairing.body);
  if (!headlineStyle || !bodyStyle) return null;

  return (
    <Box sx={{
      p: { xs: 2, sm: 2.5 },
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      transition: 'all 0.2s',
      '&:hover': { borderColor: 'primary.main', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' },
    }}>
      <Stack spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>{pairing.title}</Typography>
          <Chip label={pairing.description} size="small" sx={{ fontSize: 9, height: 18, bgcolor: 'action.hover' }} />
        </Stack>
        <Divider />
        <Box sx={{
          p: 2, borderRadius: 1.5, bgcolor: 'grey.50',
          border: '1px solid', borderColor: 'divider',
        }}>
          <Typography
            sx={{
              fontSize: { xs: Math.min(headlineStyle.fontSize, 22), sm: Math.min(headlineStyle.fontSize, 28) },
              fontWeight: headlineStyle.fontWeight,
              lineHeight: headlineStyle.lineHeight,
              fontFamily,
              mb: 0.75,
              color: 'text.primary',
            }}
          >
            {BRAND_COPY[headlineStyle.name] || 'Design the Future'}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: Math.min(bodyStyle.fontSize, 13), sm: bodyStyle.fontSize },
              fontWeight: bodyStyle.fontWeight,
              lineHeight: bodyStyle.lineHeight,
              letterSpacing: `${bodyStyle.letterSpacing}px`,
              fontFamily,
              color: 'text.secondary',
            }}
          >
            {BRAND_COPY[bodyStyle.name] || 'Crafted with intention.'}
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.5}>
          <Chip label={pairing.headline} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace' }} />
          <Chip label="+" size="small" variant="outlined" sx={{ fontSize: 9, height: 18, minWidth: 20 }} />
          <Chip label={pairing.body} size="small" variant="outlined" sx={{ fontSize: 9, height: 18, fontFamily: 'monospace' }} />
        </Stack>
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

  const allSizes = typeScale.map((s) => s.fontSize);

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Typography Scale
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
        Using <Box component="span" sx={{ fontFamily, fontWeight: 500 }}>{config.typography.fontFamily || 'Inter'}</Box> · Click any style to copy CSS · Hover chips for specs
      </Typography>

      {/* Type groups */}
      {TYPE_GROUPS.map(({ label, description, families }) => {
        const styles = typeScale.filter((s) => (families as readonly string[]).includes(s.family));
        if (styles.length === 0) return null;
        return (
          <Box key={label} sx={{ mb: { xs: 4, sm: 5 } }}>
            <Stack sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
                {description}
              </Typography>
            </Stack>
            <Stack spacing={{ xs: 0.75, sm: 1 }}>
              {styles.map((style) => (
                <MemoizedTypeCard
                  key={style.name}
                  style={style}
                  fontFamily={fontFamily}
                  allSizes={allSizes}
                />
              ))}
            </Stack>
          </Box>
        );
      })}

      {/* Divider */}
      <Divider sx={{ my: { xs: 4, md: 5 } }} />

      {/* Recommended Pairings */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
          Recommended Pairings
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
          Curated combinations for common layout patterns
        </Typography>
        <Stack spacing={2}>
          {PAIRINGS.map((pairing) => (
            <MemoizedPairingCard
              key={pairing.title}
              pairing={pairing}
              typeScale={typeScale}
              fontFamily={fontFamily}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
