# Oluwasegun Design System

A comprehensive Material Design 3 design system reference and configuration tool. Build, visualize, and export complete design tokens for products, marketing materials, and brand assets.

**Live:** [https://oluwasegun-design-system.vercel.app](https://oluwasegun-design-system.vercel.app)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes & Pages](#routes--pages)
- [Design Token System](#design-token-system)
  - [Color System](#color-system)
  - [Typography System](#typography-system)
  - [Spacing System](#spacing-system)
  - [Motion System](#motion-system)
  - [Shadows & Elevation](#shadows--elevation)
  - [Border Radius](#border-radius)
- [State Management](#state-management)
- [Brand Gallery](#brand-gallery)
- [Screen Preview](#screen-preview)
- [Smart Layouts (Layout Lab)](#smart-layouts-layout-lab)
- [Icon Library](#icon-library)
- [API Routes](#api-routes)
- [Component Preview Templates](#component-preview-templates)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Overview

The Oluwasegun Design System is a reference tool and configuration assistant for graphic designers and UI engineers. It provides:

- **Live token generation** — edit 5 key colors and instantly see 30+ Material Design 3 color roles
- **Typography scale** — generate 15 type styles from a base size and scale ratio
- **Spacing & elevation** — interactive scale builders with copy-ready CSS
- **Motion configuration** — duration and easing token overrides
- **Component demos** — buttons, forms, cards, and feedback components using live tokens
- **Screen Preview** — isolated iframe previews of 4 screen templates with live token injection
- **Brand Gallery** — a curated showcase of colors, typography, icons, spacing, and layout generation
- **Layout Lab** — generate on-brand marketing layout suggestions from content inputs
- **Project management** — save, load, and switch between named configurations
- **Export/Import** — download or upload theme configurations as JSON

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.10 (Turbopack) |
| UI Library | React 19.2.4 |
| Component Library | MUI v9 (Material UI) |
| Styling | Emotion (`@emotion/react`, `@emotion/styled`) |
| State Management | Zustand 5 with `persist` middleware |
| CSS (dev only) | Tailwind CSS 4 |
| Language | TypeScript 5 |
| Deployment | Vercel |
| Icons | MUI Icons, Lucide React, React Icons (Font Awesome), Flaticon (inline SVG) |
| Canvas Export | html2canvas |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Holuwasegun/oluwasegun-design-system.git
cd oluwasegun-design-system

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
oluwasegun-design-system/
├── public/
│   └── favicon.svg                    # Purple gradient "O" monogram
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (Inter font, metadata)
│   │   ├── page.tsx                   # Root redirect → /dashboard
│   │   ├── ThemeRegistry.tsx          # Emotion cache + MUI ThemeProvider
│   │   ├── globals.css                # Minimal global reset
│   │   ├── (tabs)/
│   │   │   ├── layout.tsx             # Tab layout (Sidebar + TopBar + content)
│   │   │   ├── dashboard/page.tsx     # Dashboard overview
│   │   │   ├── color/page.tsx         # Color system editor
│   │   │   ├── typography/page.tsx    # Typography scale editor
│   │   │   ├── spacing/page.tsx       # Spacing scale editor
│   │   │   ├── shadows/page.tsx       # Shadow tokens + builder
│   │   │   ├── elevation/page.tsx     # Elevation demos
│   │   │   ├── radius/page.tsx        # Border radius scale + builder
│   │   │   ├── motion/page.tsx        # Motion/duration/easing editor
│   │   │   ├── components/page.tsx    # Component demos (4 tabs)
│   │   │   └── preview/page.tsx       # Preset preview templates
│   │   ├── screen-preview/
│   │   │   ├── page.tsx               # Screen preview controller
│   │   │   └── preview/page.tsx       # Iframe receiver
│   │   ├── brand-gallery/
│   │   │   └── page.tsx               # Brand Gallery (5 sections)
│   │   └── api/
│   │       └── generate-layout/route.ts  # Layout generation API
│   ├── components/
│   │   ├── Sidebar.tsx                # Main navigation sidebar
│   │   ├── TopBar.tsx                 # Frosted glass top bar
│   │   ├── ProjectManager.tsx         # Save/load/import/export projects
│   │   ├── brand-gallery/
│   │   │   ├── ColorPaletteSection.tsx
│   │   │   ├── TypographySection.tsx
│   │   │   ├── IconLibrarySection.tsx
│   │   │   ├── SpacingElevationSection.tsx
│   │   │   └── LayoutLabSection.tsx
│   │   ├── preview/
│   │   │   ├── AuthLoginTemplate.tsx
│   │   │   ├── SaaSDashboardTemplate.tsx
│   │   │   ├── MarketingHeroTemplate.tsx
│   │   │   ├── EcommerceProductCard.tsx
│   │   │   └── SocialMediaFlyerTemplate.tsx
│   │   └── screen-preview/
│   │       └── ScreenRenderer.tsx     # Screen template renderer
│   ├── lib/
│   │   ├── brand-gallery-utils.ts     # copyToClipboard, downloadSvg, downloadPng
│   │   ├── icon-data.ts              # 460+ icons across 4 libraries
│   │   ├── screen-templates.ts       # Screen type definitions
│   │   └── token-utils.ts            # PreviewTokens generator
│   ├── store/
│   │   └── index.ts                  # Zustand stores (theme, projects, sidebar)
│   └── theme/
│       ├── scheme.ts                 # Color scheme, type scale, spacing generators
│       ├── tonal-palette.ts          # HSL tonal palette generator
│       └── google-fonts.ts           # Google Fonts catalog (100+ fonts)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── tailwind.config.ts
```

---

## Routes & Pages

| Route | Description |
|---|---|
| `/` | Redirects to `/dashboard` |
| `/dashboard` | Overview with gradient hero, stat cards, color palette preview, type/surface summaries |
| `/color` | Full color system editor — key colors, tonal palettes, generated scheme, light/dark toggle |
| `/typography` | Typography scale editor — base size, scale ratio, letter spacing overrides, font family |
| `/spacing` | Spacing scale editor — base unit slider, responsive grid visualization |
| `/shadows` | Shadow tokens (0–5) + Shadow Builder with custom offset/blur/spread |
| `/elevation` | Interactive elevation demos (hover/tap to toggle), component mapping, z-index reference |
| `/radius` | Border radius scale (None → Full) + Radius Builder with copy button padding fix |
| `/motion` | Duration & easing tokens, interactive animation playground, per-token overrides |
| `/components` | Component demos in 4 tabs: Buttons, Forms, Cards, Feedback |
| `/preview` | 5 isolated preview templates (Auth, SaaS, Marketing, E-commerce, Social) |
| `/screen-preview` | Device-frame preview with 4 screen templates, viewport selector, live token injection |
| `/brand-gallery` | Curated showcase with 5 sections: Colors, Typography, Icon Library, Spacing & Elevation, Layout Lab |
| `/api/generate-layout` | POST endpoint for layout generation (returns 5 layout suggestions) |

---

## Design Token System

### Color System

The color system uses 5 key colors to generate a full Material Design 3 color scheme with 30+ roles.

**Default Key Colors:**

| Key | Hex | Purpose |
|---|---|---|
| `primary` | `#6750A4` | Main brand color |
| `secondary` | `#625B71` | Supporting elements |
| `tertiary` | `#7D5260` | Accent and emphasis |
| `neutral` | `#79747E` | Backgrounds and surfaces |
| `neutralVariant` | `#CAC4D0` | Borders and dividers |

**How it works:**

1. Each key color is converted from HEX → HSL
2. A tonal palette of 26 levels (0–100) is generated for each
3. Tones are mapped to 30 MD3 color roles (e.g., `primary`, `onPrimary`, `primaryContainer`)
4. Light/dark mode swaps tone assignments

**Generated roles include:** `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`, `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`, `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`, `error`, `onError`, `errorContainer`, `onErrorContainer`, `background`, `onBackground`, `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`, `outline`, `outlineVariant`, `inverseSurface`, `inverseOnSurface`, `inversePrimary`, `surfaceDim`, `surfaceBright`, `surfaceContainerLowest`, `surfaceContainerLow`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`

### Typography System

Generates 15 Material Design 3 type styles from a base size and scale ratio.

**Configuration:**

| Property | Default | Description |
|---|---|---|
| `baseSize` | `14` | Base font size in px |
| `scale` | `1.25` | Scale ratio (Major Third) |
| `fontFamily` | `Inter` | Active font family |
| `letterSpacingOverrides` | `{}` | Per-style letter spacing overrides |

**Available Scale Ratios:**

| Name | Value |
|---|---|
| Minor Second | 1.067 |
| Major Second | 1.125 |
| Minor Third | 1.2 |
| Major Third | 1.25 (default) |
| Perfect Fourth | 1.333 |
| Augmented Fourth | 1.414 |
| Perfect Fifth | 1.5 |
| Golden Ratio | 1.618 |

**Generated Type Styles:**

| Style | Family | Default Size |
|---|---|---|
| Display Large | display | 56px |
| Display Medium | display | 45px |
| Display Small | display | 36px |
| Headline Large | headline | 32px |
| Headline Medium | headline | 28px |
| Headline Small | headline | 24px |
| Title Large | title | 22px |
| Title Medium | title | 16px |
| Title Small | title | 14px |
| Body Large | body | 16px |
| Body Medium | body | 14px |
| Body Small | body | 12px |
| Label Large | label | 14px |
| Label Medium | label | 11px |
| Label Small | label | 11px |

**Google Fonts:** 100+ fonts available including Inter, Roboto, Open Sans, Montserrat, Poppins, DM Sans, Plus Jakarta Sans, and many more. Custom font upload supported (.woff2, .woff, .ttf, .otf).

### Spacing System

Generates a 13-step spacing scale from a base unit.

| Property | Default | Description |
|---|---|---|
| `baseUnit` | `2` | Base spacing unit in px |

**Generated Scale:**

| Token | Multiplier | Default (2px base) |
|---|---|---|
| `0` | 0 | 0px |
| `0.5` | 0.5 | 1px |
| `1` | 1 | 2px |
| `1.5` | 1.5 | 3px |
| `2` | 2 | 4px |
| `3` | 3 | 6px |
| `4` | 4 | 8px |
| `5` | 5 | 10px |
| `6` | 6 | 12px |
| `8` | 8 | 16px |
| `10` | 10 | 20px |
| `12` | 12 | 24px |
| `16` | 16 | 32px |

### Motion System

Configures animation duration and easing for the entire design system.

| Property | Default | Description |
|---|---|---|
| `durationScale` | `1` | Global duration multiplier |
| `durationOverrides` | `{}` | Per-token duration overrides (ms) |
| `easingOverrides` | `{}` | Per-token easing curve overrides |

### Shadows & Elevation

**Shadow Tokens:** 6 levels (0–5) with increasing blur and spread.

**Elevation Demo:** Interactive cards that respond to hover/tap, demonstrating how elevation changes appearance.

**Shadow Builder:** Custom shadow creation with offset X/Y, blur, spread, and color controls.

### Border Radius

**Shape Scale:** 7 levels from `None` (0px) to `Full` (9999px).

| Name | Value |
|---|---|
| None | 0px |
| Extra Small | 4px |
| Small | 8px |
| Medium | 12px |
| Large | 16px |
| Extra Large | 28px |
| Full | 9999px |

---

## State Management

Three Zustand stores with localStorage persistence:

### `useThemeStore`

**Persistence key:** `oluwasegun-design-system-theme`

```typescript
interface ThemeStore {
  config: ThemeConfig;
  currentProjectId: string | null;
  setKeyColor: (key: string, color: string) => void;
  addKeyColor: (key: string, color: string) => void;
  removeKeyColor: (key: string) => void;
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
  setTypography: (typography: Partial<TypographyScale>) => void;
  setSpacing: (spacing: Partial<SpacingConfig>) => void;
  setMotion: (motion: Partial<MotionConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
}
```

**Deep merge:** Custom `mergeConfig()` function handles schema evolution — new fields are added with defaults without overwriting user customizations.

### `useProjectStore`

**Persistence key:** `oluwasegun-design-system-projects`

```typescript
interface Project {
  id: string;
  name: string;
  config: ThemeConfig;
  createdAt: string;
  updatedAt: string;
}

interface ProjectStore {
  projects: Project[];
  createProject: (name: string) => Project;
  saveToProject: (id: string) => void;
  saveAsProject: (name: string) => Project;
  loadProject: (id: string) => void;
  deleteProject: (id: string) => void;
  renameProject: (id: string, name: string) => void;
  getCurrentProject: () => Project | null;
}
```

### `useAppStore`

Simple sidebar toggle state (no persistence).

```typescript
interface SidebarStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}
```

---

## Brand Gallery

A curated showcase at `/brand-gallery` with 5 sections, left sidebar navigation, and IntersectionObserver-based active section tracking.

### Sections

#### 1. Colors
- 7 color groups with usage guidance chips
- Click any swatch to copy HEX value
- WCAG contrast badges (AA/AAA compliance) for text colors
- Suggested Palettes: Hero, Data, and Alert color combinations

#### 2. Typography
- Compact reference rows: style name + spec chips + copy button
- One-click CSS copy with font-family, size, weight, line-height, letter-spacing
- 4 recommended pairings (Hero, Content Block, Compact Card, Navigation)
- Copy All button for entire type scale

#### 3. Icon Library
- 460+ icons across 4 libraries:
  - **Material Design** (~160 icons)
  - **Lucide** (~95 icons)
  - **Font Awesome** (~133 icons)
  - **Flaticon** (~72 custom SVG icons)
- 10 categories: Navigation, Actions, Communication, Commerce, Media, Social, Shapes, Files, Device, Maps
- Library selector chips, search, category filter
- Dialog preview with SVG/PNG download and JSX copy

#### 4. Spacing & Elevation
- Spacing scale bars (click to copy CSS token)
- Elevation cards (MD3 shadow tokens 0–5)
- Border radius scale (80×80 preview boxes)

#### 5. Layout Lab (Beta)
- Image upload (JPG, PNG, SVG — max 5MB)
- Headline and subtitle text inputs
- Format selector: Flyer (A5), Social Post (Square), Banner (16:9)
- Generates 5 layout suggestions using active design tokens
- Token swap panel: swap background/text/accent/card colors
- Like/Dislike feedback buttons
- PNG download at 3x resolution

---

## Screen Preview

An isolated iframe preview system at `/screen-preview`.

**Architecture:**
- Parent page sends tokens via `postMessage` protocol
- Iframe receives tokens and renders templates in isolation
- Each template has its own MUI ThemeProvider using received tokens

**Templates:**

| Template | Description |
|---|---|
| Finance | Banking dashboard with balance, transactions, quick actions |
| Business | SaaS analytics with KPIs, charts, team overview |
| Education | Learning platform with courses, progress, schedule |
| Signup | Multi-step registration with validation, social login |

**Features:**
- Device frame with traffic light dots
- Viewport selector (Desktop, Tablet, Mobile)
- Light/Dark mode toggle
- Connection status indicator
- Mobile responsive with hamburger menu + Drawer sidebar

---

## Smart Layouts (Layout Lab)

**Feature flag:** `NEXT_PUBLIC_ENABLE_SMART_LAYOUTS` (enabled by default, set to `'false'` to disable)

A generation assistant that creates on-brand layout suggestions using the active design tokens.

### API Endpoint

**`POST /api/generate-layout`**

Request body:
```json
{
  "primaryText": "Summer Collection 2026",
  "secondaryText": "Up to 50% off",
  "format": "social-square",
  "heroImage": "data:image/...",
  "tokens": {
    "colors": { "primary": "#6750A4", ... },
    "typography": { "baseSize": 14, "scale": 1.25 },
    "spacing": { "baseUnit": 2 }
  }
}
```

Response:
```json
{
  "suggestions": [
    {
      "id": "centered-hero",
      "name": "Centered Hero",
      "description": "Bold centered layout with hero image on top",
      "layout": {
        "type": "centered-hero",
        "heroPosition": "top",
        "textAlignment": "center",
        "colorUsage": { "background": "...", "text": "...", "accent": "...", "card": "..." },
        "spacing": { "padding": 12, "gap": 8, "borderRadius": 6 }
      }
    }
  ],
  "dimensions": { "width": 400, "height": 400, "label": "Social Post (Square)" }
}
```

**Layout types:** Centered Hero, Split Horizontal, Split Vertical, Card Overlay, Minimalist

---

## Icon Library

**File:** `src/lib/icon-data.ts`

### Types

```typescript
type IconLibraryId = 'mui' | 'lucide' | 'fontawesome' | 'flaticon';

interface IconEntry {
  name: string;
  component: ElementType;
  category: string;
  keywords: string[];
  library: IconLibraryId;
}

interface IconLibraryMeta {
  id: IconLibraryId;
  label: string;
  count: number;
  description: string;
}
```

### Libraries

| Library | ID | Icons | Source |
|---|---|---|---|
| Material Design | `mui` | ~160 | `@mui/icons-material` |
| Lucide | `lucide` | ~95 | `lucide-react` |
| Font Awesome | `fontawesome` | ~133 | `react-icons/fa` |
| Flaticon | `flaticon` | ~72 | Inline SVG via `createFlaticonIcon()` |

### Categories

Navigation, Actions, Communication, Commerce, Media, Social, Shapes, Files, Device, Maps

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/generate-layout` | Generate 5 layout suggestions from content + tokens |

---

## Component Preview Templates

Five isolated preview templates, each with its own MUI ThemeProvider:

| Template | File | Description |
|---|---|---|
| Auth Login | `AuthLoginTemplate.tsx` | Login form with hero, fixed 580px |
| SaaS Dashboard | `SaaSDashboardTemplate.tsx` | Analytics dashboard with permanent drawer, fixed 640px |
| Marketing Hero | `MarketingHeroTemplate.tsx` | Landing page with static nav, fixed 640px |
| E-commerce Card | `EcommerceProductCard.tsx` | Product card grid, 3-column layout, fixed 640px |
| Social Media Flyer | `SocialMediaFlyerTemplate.tsx` | 3 flyer variations, fixed 640px |

All templates read `fontFamily` from the global theme store and apply it in their local theme.

---

## Deployment

### Vercel

```bash
# Deploy to production
vercel --prod

# Or deploy with auto-confirmation
vercel --prod --yes
```

**Production URL:** [https://oluwasegun-design-system.vercel.app](https://oluwasegun-design-system.vercel.app)

**GitHub repository:** [https://github.com/Holuwasegun/oluwasegun-design-system](https://github.com/Holuwasegun/oluwasegun-design-system)

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_ENABLE_SMART_LAYOUTS` | `true` | Enable/disable the Layout Lab feature. Set to `'false'` to hide the section. |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Design Principles

1. **Token-driven** — every component reads from the same global state
2. **Live preview** — all changes are reflected instantly across the entire system
3. **Exportable** — configurations can be saved as JSON and shared
4. **Accessible** — WCAG contrast information provided for color choices
5. **Responsive** — all pages work on mobile, tablet, and desktop
6. **Isolated previews** — screen templates run in iframes to prevent style bleed

---

## License

Private project. All rights reserved.
