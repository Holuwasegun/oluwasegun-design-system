# Oluwasegun Design System

A Material Design 3 color token generator built with React, TypeScript, and Vite. Generates tonal palettes, semantic role mappings, and contrast-aware color schemes using the M3 HCT color engine.

## Features

- **Tonal Palette Generation** — 18-tone scales from any key color using M3 HCT
- **Dynamic Theming** — Light/dark mode with adjustable contrast levels
- **Semantic Role Mapping** — Full M3 role system (primary, secondary, tertiary, error, surface, outline, inverse)
- **Contrast Ratios** — Real-time WCAG contrast ratio display for all semantic roles
- **JSON Export** — Export complete design tokens as a structured JSON schema

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- `@material/material-color-utilities` (M3 HCT engine)
- Oxlint

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview production build |
