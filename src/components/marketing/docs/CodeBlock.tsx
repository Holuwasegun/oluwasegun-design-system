"use client";

import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip, alpha, useTheme } from '@mui/material';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'css', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        bgcolor: '#0d1117', // GitHub dark theme background
        color: '#c9d1d9',
        my: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid',
          borderColor: alpha('#ffffff', 0.1),
          bgcolor: alpha('#ffffff', 0.05)
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Terminal size={16} color={theme.palette.text.secondary} />
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
            {filename || language}
          </Typography>
        </Box>
        <Tooltip title={copied ? "Copied!" : "Copy code"}>
          <IconButton onClick={handleCopy} size="small" sx={{ color: copied ? 'success.main' : 'text.secondary', p: 0.5 }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ p: 2, overflowX: 'auto' }}>
        <Typography
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            m: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          {code}
        </Typography>
      </Box>
    </Box>
  );
}
