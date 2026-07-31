'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Box, Typography, TextField, Stack, IconButton, Chip,
  Dialog, DialogContent, Divider, Snackbar, Alert, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ICON_LIBRARY, ICON_CATEGORIES, ICON_LIBRARIES, type IconEntry, type IconLibraryId } from '@/lib/icon-data';
import { copyToClipboard } from '@/lib/brand-gallery-utils';
import { renderToStaticMarkup } from 'react-dom/server';

function IconCard({ entry, onClick }: { entry: IconEntry; onClick: () => void }) {
  const Icon = entry.component;
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        p: { xs: 1.25, sm: 2 },
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.15s',
        '&:hover': { bgcolor: 'action.hover', transform: 'translateY(-1px)' },
      }}
    >
      <Icon sx={{ fontSize: { xs: 32, sm: 40 }, color: 'text.primary' }} />
      <Typography variant="caption" sx={{ textAlign: 'center', lineHeight: 1.2, fontSize: { xs: '0.55rem', sm: '0.65rem' }, color: 'text.secondary' }}>
        {entry.name}
      </Typography>
    </Box>
  );
}

const MemoizedIconCard = React.memo(IconCard);

function downloadSvgFromComponent(entry: IconEntry, color: string, size: number) {
  const Icon = entry.component;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgString = renderToStaticMarkup(React.createElement(Icon, { sx: { fontSize: size, color } }));
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
  const svgString = renderToStaticMarkup(React.createElement(Icon, { sx: { fontSize: size, color } }));
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

function generateSvgString(entry: IconEntry, color: string, size: number): string {
  const Icon = entry.component;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svgString = renderToStaticMarkup(React.createElement(Icon, { sx: { fontSize: size, color } }));
  return `<svg xmlns="${svgNS}" viewBox="0 0 24 24" width="${size}" height="${size}">${svgString.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}</svg>`;
}

async function copySvgToClipboard(entry: IconEntry, color: string, size: number): Promise<boolean> {
  const svg = generateSvgString(entry, color, size);
  return copyToClipboard(svg);
}

async function copyPngToClipboard(entry: IconEntry, color: string, size: number, scale = 2): Promise<boolean> {
  const Icon = entry.component;
  const svgString = renderToStaticMarkup(React.createElement(Icon, { sx: { fontSize: size, color } }));
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  return new Promise((resolve) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = async () => {
      canvas.width = size * scale;
      canvas.height = size * scale;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      canvas.toBlob(async (blob) => {
        if (!blob) { resolve(false); return; }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(false); };
    img.src = url;
  });
}

export default function IconLibrarySection() {
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLibrary, setActiveLibrary] = useState<IconLibraryId | null>(null);
  const [snack, setSnack] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    let list = ICON_LIBRARY;
    if (activeLibrary) list = list.filter((e) => e.library === activeLibrary);
    if (activeCategory) list = list.filter((e) => e.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.library.toLowerCase().includes(q) ||
          e.keywords.some((k) => k.includes(q))
      );
    }
    return list;
  }, [search, activeCategory, activeLibrary]);

  const handleCopyName = useCallback(async (name: string) => {
    const ok = await copyToClipboard(`<${name} />`);
    if (ok) setSnack('Component name copied');
  }, []);

  const handleCopySvg = useCallback(async (entry: IconEntry) => {
    const ok = await copySvgToClipboard(entry, 'currentColor', 24);
    if (ok) setSnack('SVG code copied');
  }, []);

  const handleCopyPng = useCallback(async (entry: IconEntry) => {
    const ok = await copyPngToClipboard(entry, 'currentColor', 24, 2);
    if (ok) setSnack('PNG image copied');
  }, []);

  const totalIcons = activeLibrary
    ? ICON_LIBRARY.filter((e) => e.library === activeLibrary).length
    : ICON_LIBRARY.length;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>Icon Library</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
        {totalIcons} icons across {ICON_LIBRARIES.length} libraries. Click to preview, download or copy as SVG or PNG.
      </Typography>

      {/* Library Selector */}
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
        <Chip
          label={`All (${ICON_LIBRARY.length})`}
          size="small"
          onClick={() => setActiveLibrary(null)}
          variant={activeLibrary === null ? 'filled' : 'outlined'}
          color={activeLibrary === null ? 'primary' : 'default'}
          sx={{ cursor: 'pointer', fontWeight: 500 }}
        />
        {ICON_LIBRARIES.map((lib) => (
          <Chip
            key={lib.id}
            label={`${lib.label} (${lib.count})`}
            size="small"
            onClick={() => setActiveLibrary(activeLibrary === lib.id ? null : lib.id)}
            variant={activeLibrary === lib.id ? 'filled' : 'outlined'}
            color={activeLibrary === lib.id ? 'primary' : 'default'}
            sx={{ cursor: 'pointer', fontWeight: 500 }}
          />
        ))}
      </Stack>

      {/* Search + Category Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
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
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
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

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.8125rem' }}>
        {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
      </Typography>

      {/* Icon Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(auto-fill, minmax(70px, 1fr))', sm: 'repeat(auto-fill, minmax(90px, 1fr))' }, gap: 0.5 }}>
        {filteredIcons.map((entry) => (
          <MemoizedIconCard
            key={`${entry.library}-${entry.name}`}
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
          <DialogContent sx={{ textAlign: 'center', p: { xs: 3, sm: 4 } }}>
            <IconButton
              onClick={() => setSelectedIcon(null)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ mb: 2 }}>
              <selectedIcon.component sx={{ fontSize: { xs: 72, sm: 96 }, color: 'primary.main' }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>{selectedIcon.name}</Typography>
            <Stack direction="row" spacing={0.75} sx={{ justifyContent: 'center', mb: 1 }}>
              <Chip label={selectedIcon.category} size="small" variant="outlined" />
              <Chip label={ICON_LIBRARIES.find((l) => l.id === selectedIcon.library)?.label} size="small" variant="outlined" color="primary" />
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.8125rem' }}>
              {selectedIcon.keywords.join(' · ')}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
              Download
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center' }}>
              <Box
                onClick={() => downloadSvgFromComponent(selectedIcon, 'currentColor', 24)}
                sx={{
                  flex: 1, py: 1.5, borderRadius: 2,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <DownloadIcon sx={{ fontSize: 18, color: 'primary.main', mb: 0.25 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.7rem' }}>SVG</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>Vector</Typography>
              </Box>
              <Box
                onClick={() => downloadPngFromComponent(selectedIcon, 'currentColor', 24, 2)}
                sx={{
                  flex: 1, py: 1.5, borderRadius: 2,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <DownloadIcon sx={{ fontSize: 18, color: 'secondary.main', mb: 0.25 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.7rem' }}>PNG</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>2x resolution</Typography>
              </Box>
            </Stack>

            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, mt: 2 }}>
              Copy to clipboard
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center' }}>
              <Box
                onClick={() => handleCopySvg(selectedIcon)}
                sx={{
                  flex: 1, py: 1.5, borderRadius: 2,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 18, color: 'primary.main', mb: 0.25 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.7rem' }}>SVG Code</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>Markup string</Typography>
              </Box>
              <Box
                onClick={() => handleCopyPng(selectedIcon)}
                sx={{
                  flex: 1, py: 1.5, borderRadius: 2,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 18, color: 'secondary.main', mb: 0.25 }} />
                <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, fontSize: '0.7rem' }}>PNG Image</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>Bitmap 2x</Typography>
              </Box>
            </Stack>

            <Box
              onClick={() => handleCopyName(selectedIcon.name)}
              sx={{
                mt: 1.5, py: 1, borderRadius: 2,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75,
                transition: 'all 0.15s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 13 }} />
              <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
                Copy: &lt;{selectedIcon.name} /&gt;
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      <Snackbar open={!!snack} autoHideDuration={1500} onClose={() => setSnack(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
