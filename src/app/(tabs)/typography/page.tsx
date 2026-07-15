"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

interface TypeStyle {
  role: string;
  name: string;
  size: number;
  weight: number;
  lineHeight: number;
  tracking: string;
}

const typeStyles: TypeStyle[] = [
  { role: "Display", name: "Large", size: 57, weight: 300, lineHeight: 64, tracking: "-0.25" },
  { role: "Display", name: "Medium", size: 45, weight: 400, lineHeight: 52, tracking: "0" },
  { role: "Display", name: "Small", size: 36, weight: 400, lineHeight: 44, tracking: "0" },
  { role: "Headline", name: "Large", size: 32, weight: 400, lineHeight: 40, tracking: "0" },
  { role: "Headline", name: "Medium", size: 28, weight: 400, lineHeight: 36, tracking: "0" },
  { role: "Headline", name: "Small", size: 24, weight: 400, lineHeight: 32, tracking: "0" },
  { role: "Title", name: "Large", size: 22, weight: 500, lineHeight: 28, tracking: "0" },
  { role: "Title", name: "Medium", size: 16, weight: 500, lineHeight: 24, tracking: "0.15" },
  { role: "Title", name: "Small", size: 14, weight: 500, lineHeight: 20, tracking: "0.1" },
  { role: "Body", name: "Large", size: 16, weight: 400, lineHeight: 24, tracking: "0.5" },
  { role: "Body", name: "Medium", size: 14, weight: 400, lineHeight: 20, tracking: "0.25" },
  { role: "Body", name: "Small", size: 12, weight: 400, lineHeight: 16, tracking: "0.4" },
  { role: "Label", name: "Large", size: 14, weight: 500, lineHeight: 20, tracking: "0.1" },
  { role: "Label", name: "Medium", size: 12, weight: 500, lineHeight: 16, tracking: "0.5" },
  { role: "Label", name: "Small", size: 11, weight: 500, lineHeight: 16, tracking: "0.5" },
];

const previewText = "The quick brown fox jumps over the lazy dog";

const roleColors: Record<string, "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  Display: "primary",
  Headline: "secondary",
  Title: "info",
  Body: "info",
  Label: "success",
};

function groupByRole(styles: TypeStyle[]): Map<string, TypeStyle[]> {
  const map = new Map<string, TypeStyle[]>();
  for (const s of styles) {
    const arr = map.get(s.role) ?? [];
    arr.push(s);
    map.set(s.role, arr);
  }
  return map;
}

function MobileCard({ style }: { style: TypeStyle }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Chip label={style.role} size="small" color={roleColors[style.role]} variant="outlined" />
          <Typography variant="caption" color="text.secondary">
            {style.name}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: style.size,
            fontWeight: style.weight,
            lineHeight: `${style.lineHeight / style.size}`,
            letterSpacing: `${style.tracking}em`,
          }}
          gutterBottom
        >
          {previewText}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          <Chip label={`${style.size}px`} size="small" variant="outlined" />
          <Chip label={`w${style.weight}`} size="small" variant="outlined" />
          <Chip label={`${style.lineHeight}px lh`} size="small" variant="outlined" />
          <Chip label={`${style.tracking}em`} size="small" variant="outlined" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function TypographyPage() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const grouped = groupByRole(typeStyles);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Typography</Typography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Typography
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Material Design 3 type scale
        </Typography>

        {Array.from(grouped.entries()).map(([role, styles]) => (
          <Box key={role} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
              {role}
            </Typography>
            {styles.map((s) => (
              <MobileCard key={`${s.role}-${s.name}`} style={s} />
            ))}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Typography
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Material Design 3 type scale
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Style</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Size
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Weight
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Line Height
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Tracking
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {typeStyles.map((style) => (
              <TableRow key={`${style.role}-${style.name}`} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={style.role}
                      size="small"
                      color={roleColors[style.role]}
                      variant="outlined"
                      sx={{ minWidth: 72 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {style.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: Math.min(style.size, 32),
                      fontWeight: style.weight,
                      lineHeight: 1.3,
                      letterSpacing: `${style.tracking}em`,
                      maxWidth: 400,
                    }}
                  >
                    {previewText}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {style.size}px
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {style.weight}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {style.lineHeight}px
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {style.tracking}em
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
