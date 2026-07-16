'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  Box, Typography, TextField, Stack, IconButton, Tooltip, Chip,
  Dialog, DialogContent, Divider, Snackbar, Alert, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ICON_LIBRARY, ICON_CATEGORIES, type IconEntry } from '@/lib/icon-data';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

function IconCard({ entry, onClick }: { entry: IconEntry; onClick: () => void }) {
  const Icon = entry.component;
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.15s',
        '&:hover': { bgcolor: 'action.hover', transform: 'translateY(-1px)' },
      }}
    >
      <Icon sx={{ fontSize: 40, color: 'text.primary' }} />
      <Typography variant="caption" sx={{ textAlign: 'center', lineHeight: 1.2, fontSize: '0.65rem', color: 'text.secondary' }}>
        {entry.name}
      </Typography>
    </Box>
  );
}

const MemoizedIconCard = React.memo(IconCard);

function downloadSvgFromComponent(entry: IconEntry, color: string, size: number) {
  const Icon = entry.component;
  const svgNS = 'http://www.w3.org/2000/svg';
  const temp = document.createElement('div');
  temp.style.position = 'fixed';
  temp.style.left = '-9999px';
  document.body.appendChild(temp);

  const { renderToStaticMarkup } = require('react-dom/server');
  const svgString = renderToStaticMarkup(
    React.createElement(Icon, { sx: { fontSize: size, color } })
  );

  document.body.removeChild(temp);

  const fullSvg = `<svg xmlns="${svgNS}" viewBox="0 0 24 24" width="${size}" height="${size}">${svgString.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}</svg>`;
  const blob = new Blob([fullSvg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${entry.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPngFromComponent(entry: IconEntry, color: string, size: number, scale = 2) {
  const Icon = entry.component;
  const { renderToStaticMarkup } = require('react-dom/server');
  const svgString = renderToStaticMarkup(
    React.createElement(Icon, { sx: { fontSize: size, color } })
  );

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = new Image();
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    canvas.width = size * scale;
    canvas.height = size * scale;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const u = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = u;
      a.download = `${entry.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(u);
    }, 'image/png');
    URL.revokeObjectURL(url);
  };
  img.src = url;
}

export default function IconLibrarySection() {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [snack, setSnack] = useState(false);

  const filteredIcons = useMemo(() => {
    let list = ICON_LIBRARY;
    if (activeCategory) list = list.filter((e) => e.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.keywords.some((k) => k.includes(q))
      );
    }
    return list;
  }, [search, activeCategory]);

  const handleCopyName = useCallback(async (name: string) => {
    const ok = await copyToClipboard(`<${name} />`);
    if (ok) setSnack(true);
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Icon Library</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        {ICON_LIBRARY.length} icons from Material Design. Click to preview, download as SVG or PNG.
      </Typography>

      {/* Search + Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18 }} /></InputAdornment>,
              sx: { borderRadius: 2, bgcolor: 'background.paper' },
            },
          }}
        />
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
          <Chip
            label="All"
            size="small"
            onClick={() => setActiveCategory(null)}
            variant={activeCategory === null ? 'filled' : 'outlined'}
            color={activeCategory === null ? 'primary' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
          {ICON_CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              size="small"
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              variant={activeCategory === cat ? 'filled' : 'outlined'}
              color={activeCategory === cat ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Stack>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
      </Typography>

      {/* Icon Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 0.5 }}>
        {filteredIcons.map((entry) => (
          <MemoizedIconCard
            key={entry.name}
            entry={entry}
            onClick={() => setSelectedIcon(entry)}
          />
        ))}
      </Box>

      {filteredIcons.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>No icons found</Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>Try a different search term</Typography>
        </Box>
      )}

      {/* Icon Preview Dialog */}
      <Dialog
        open={!!selectedIcon}
        onClose={() => setSelectedIcon(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        {selectedIcon && (
          <DialogContent sx={{ textAlign: 'center', p: 4 }}>
            <IconButton
              onClick={() => setSelectedIcon(null)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ mb: 3 }}>
              <selectedIcon.component sx={{ fontSize: 96, color: 'primary.main' }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>{selectedIcon.name}</Typography>
            <Chip label={selectedIcon.category} size="small" variant="outlined" sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              {selectedIcon.keywords.join(' · ')}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Download as
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center' }}>
              <Box
                onClick={() => {
                  downloadSvgFromComponent(selectedIcon, 'currentColor', 24);
                }}
                sx={{
                  flex: 1, py: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                }}
              >
                <DownloadIcon sx={{ fontSize: 20, color: 'primary.main', mb: 0.5 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>SVG</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>Vector</Typography>
              </Box>
              <Box
                onClick={() => {
                  downloadPngFromComponent(selectedIcon, 'currentColor', 24, 2);
                }}
                sx={{
                  flex: 1, py: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                }}
              >
                <DownloadIcon sx={{ fontSize: 20, color: 'secondary.main', mb: 0.5 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>PNG</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>2x resolution</Typography>
              </Box>
            </Stack>

            <Box
              onClick={() => handleCopyName(selectedIcon.name)}
              sx={{
                mt: 2, py: 1.5, borderRadius: 2, border: '1px solid', borderColor: 'divider',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                transition: 'all 0.15s',
                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Copy component: &lt;{selectedIcon.name} /&gt;
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Component name copied
        </Alert>
      </Snackbar>
    </Box>
  );
}
