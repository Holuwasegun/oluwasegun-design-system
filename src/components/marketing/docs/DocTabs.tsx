"use client";

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, useTheme, alpha } from '@mui/material';
import CodeBlock from './CodeBlock';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`doc-tabpanel-${index}`}
      aria-labelledby={`doc-tab-${index}`}
      {...other}
      style={{ animation: value === index ? 'fadeIn 0.5s ease-out' : 'none' }}
    >
      {value === index && (
        <Box sx={{ py: 4 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `doc-tab-${index}`,
    'aria-controls': `doc-tabpanel-${index}`,
  };
}

export default function DocTabs() {
  const [value, setValue] = useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const gettingStartedCode = `:root {
  /* Tonal palettes mapped to semantic roles */
  --md-sys-color-primary: #006493;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #cae6ff;
  
  /* Fluid Typography Scale */
  --md-sys-typescale-display-large-size: clamp(3.5rem, 3.1rem + 2vw, 4.5rem);
}`;

  const exportCode = `// 1. Copy the generated design-tokens.css into your project
import './styles/design-tokens.css';

// 2. Use the CSS variables in your components
.my-button {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
  border-radius: var(--md-sys-shape-corner-full);
  font-size: var(--md-sys-typescale-label-large-size);
}`;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="documentation tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
              }
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          <Tab label="Getting Started" {...a11yProps(0)} />
          <Tab label="Token Architecture" {...a11yProps(1)} />
          <Tab label="Export & Integration" {...a11yProps(2)} />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Philosophy & Approach
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          Stop guessing hex codes. This generator uses algorithmic color science to build complete, accessible Material Design 3 token systems. By simply inputting 5 key colors, the system derives comprehensive tonal palettes and maps them to semantic roles.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          It doesn't just stop at colors. The generator also produces clamp-based fluid typography scales that automatically adjust across screen sizes, and shape tokens for consistent border radii.
        </Typography>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Understanding the Tokens
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          The generated output relies heavily on CSS variables mapped to specific semantic purposes. We strictly follow the `--md-sys-*` nomenclature.
        </Typography>
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>Color Roles</Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          Instead of using generic variables like <code>--blue-500</code>, tokens are assigned based on their UI purpose:
          <ul>
            <li><code>--md-sys-color-primary</code>: For your most prominent CTA or brand elements.</li>
            <li><code>--md-sys-color-on-primary</code>: The accessible text color to sit *on top* of the primary color.</li>
            <li><code>--md-sys-color-surface-container</code>: For cards and elevated background surfaces.</li>
          </ul>
        </Typography>
        
        <CodeBlock code={gettingStartedCode} language="css" filename="design-tokens.css excerpt" />
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
          Using the Output
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          Integration is designed to be completely framework-agnostic. Because the output is standard CSS Custom Properties (variables), you can use it anywhere.
        </Typography>
        
        <CodeBlock code={exportCode} language="javascript" filename="React / Plain HTML Example" />
        
        <Typography variant="body1" sx={{ mb: 2, mt: 4, color: 'text.secondary', lineHeight: 1.7, fontSize: '1.1rem' }}>
          <strong>Dark Mode Support:</strong> The generator can optionally output dark mode tokens wrapped in a media query (<code>@media (prefers-color-scheme: dark)</code>) or scoped to a class (<code>.dark</code>). No extra JavaScript is needed to swap themes.
        </Typography>
      </TabPanel>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </Box>
  );
}
