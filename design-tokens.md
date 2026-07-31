# Oluwasegun Design System - Design Tokens Specification

This document details the complete design token specification for the Oluwasegun Design System. It serves as the single source of truth for all styling constants—including colors, typography, spacing, shadows, border radii, and motion—ensuring visual consistency across products, marketing materials, and brand assets.

---

## 1. Color System

The system uses 5 key colors to generate a complete Material Design 3 (MD3) color scheme comprising over 30 roles. It utilizes HSL conversion and tonal palettes to calculate specific light and dark mode mappings.

### 1.1 Key Colors
These form the foundation from which all other tones are derived.

| Role | Hex | Purpose |
| :--- | :--- | :--- |
| **Primary** | `#6750A4` | Main brand color, prominent calls to action |
| **Secondary** | `#625B71` | Supporting elements, secondary buttons |
| **Tertiary** | `#7D5260` | Accents, highlights, and emphasis |
| **Neutral** | `#79747E` | Core backgrounds, surfaces, and basic text |
| **Neutral Variant** | `#CAC4D0` | Borders, dividers, and disabled states |

### 1.2 Generated Tonal Palettes
Each key color is converted to an HSL-based tonal palette consisting of 26 levels (Tone 0 to Tone 100). The values are then mapped to semantic tokens for both Light and Dark modes.

### 1.3 Semantic Color Tokens

**Primary Roles**
- `primary`: Main active elements.
- `onPrimary`: Text/icons residing on `primary`.
- `primaryContainer`: Highlighted backgrounds.
- `onPrimaryContainer`: Text/icons residing on `primaryContainer`.
- `inversePrimary`: Primary color mapped for dark backgrounds (Light mode).

**Secondary & Tertiary Roles**
- `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
- `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`

**Error Roles**
- `error`: Destructive actions, validations.
- `onError`: Text/icons on `error`.
- `errorContainer`: Error backgrounds.
- `onErrorContainer`: Text/icons on `errorContainer`.

**Surfaces & Backgrounds**
- `background`: Main app background.
- `onBackground`: Text on background.
- `surface`: Card and sheet backgrounds.
- `onSurface`: Text on surface.
- `surfaceVariant`: Alternative surfaces.
- `onSurfaceVariant`: Text on alternative surfaces.
- `inverseSurface`: High-contrast surface (e.g., Snackbars).
- `inverseOnSurface`: Text on inverse surface.
- `surfaceDim`, `surfaceBright`
- `surfaceContainerLowest`, `surfaceContainerLow`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`

**Borders & Outlines**
- `outline`: High contrast borders (e.g., Text Fields).
- `outlineVariant`: Low contrast borders (e.g., Dividers).

### 1.4 Accessibility & Dark Mode Mappings
The design system dynamically enforces WCAG contrast standards. 
- Relative luminance threshold is set to `0.179`.
- **Dark Mode Optimization**: `onBackground` and `onSurface` map to Tone 95 (`#F1F0F4`) achieving 15.2:1 WCAG AAA. `onSurfaceVariant` maps to Tone 87 (`#E1E2EC`) for 6.8:1 WCAG AA. `outline` maps to Tone 70.

---

## 2. Typography System

The typography scale generates 15 MD3 type styles fluidly scaling via CSS `clamp()` based on viewport size. 

### 2.1 Configuration
| Property | Default Value | Description |
| :--- | :--- | :--- |
| **Base Size** | `14px` | Foundational font size. |
| **Scale Ratio** | `1.25` (Major Third) | Multiplier for scaling text levels. |
| **Font Family** | `Inter` | Primary typeface (100+ Google Fonts supported). |

### 2.2 Generated Type Scale
*Sizes represent the base starting point; CSS `clamp()` handles fluid responsiveness.*

| Style Level | Font Family | Default Size | Purpose |
| :--- | :--- | :--- | :--- |
| **Display Large** | Display | 56px | Massive hero text |
| **Display Medium** | Display | 45px | Hero text |
| **Display Small** | Display | 36px | Sub-hero text |
| **Headline Large** | Headline | 32px | Page titles (H1) |
| **Headline Medium** | Headline | 28px | Section titles (H2) |
| **Headline Small** | Headline | 24px | Sub-section titles (H3) |
| **Title Large** | Title | 22px | Large dialog headers |
| **Title Medium** | Title | 16px | Standard dialog headers |
| **Title Small** | Title | 14px | Card titles |
| **Body Large** | Body | 16px | Lead paragraph text |
| **Body Medium** | Body | 14px | Standard paragraph text |
| **Body Small** | Body | 12px | Dense paragraph text |
| **Label Large** | Label | 14px | Buttons and large tabs |
| **Label Medium** | Label | 11px | Badges and small tabs |
| **Label Small** | Label | 11px | Tooltips, overline, microcopy |

### 2.3 Fluid Letter Spacing
Letter spacing utilizes CSS `clamp()` to breathe on mobile layouts. Display styles adapt from tight desktop tracking (e.g., `-0.03em`) to broader mobile tracking (e.g., `+0.015em`), ensuring maximum legibility across viewports.

---

## 3. Spacing System

Spacing tokens are used for padding, margins, and gaps. They are generated from a base unit.

**Base Unit**: `2px`

| Token Level | Multiplier | CSS Value |
| :--- | :--- | :--- |
| `space-0` | 0 | `0px` |
| `space-0.5` | 0.5 | `1px` |
| `space-1` | 1 | `2px` |
| `space-1.5` | 1.5 | `3px` |
| `space-2` | 2 | `4px` |
| `space-3` | 3 | `6px` |
| `space-4` | 4 | `8px` |
| `space-5` | 5 | `10px` |
| `space-6` | 6 | `12px` |
| `space-8` | 8 | `16px` |
| `space-10` | 10 | `20px` |
| `space-12` | 12 | `24px` |
| `space-16` | 16 | `32px` |

---

## 4. Shadows & Elevation System

To achieve the Neumorphic styling and layered UI hierarchy, the system defines 6 levels of elevation through CSS box-shadows.

| Elevation Level | Token Usage |
| :--- | :--- |
| **Level 0** | Flat surfaces, standard backgrounds. |
| **Level 1** | Standard cards, search bars. |
| **Level 2** | Contained buttons (hover state). |
| **Level 3** | Dropdown menus, small overlays. |
| **Level 4** | Standard dialogs, navigation drawers. |
| **Level 5** | Modal dialogs, bottom sheets, tooltips. |

*Note: Dark mode adapts shadow rendering specifically to ensure inset shadows and elevated borders retain visual clarity on dark surfaces.*

---

## 5. Border Radius System (Shape)

Defines how rounded the corners of components should be.

| Token Name | Size | Target Component Example |
| :--- | :--- | :--- |
| **None** | `0px` | Full-bleed images, standard tables |
| **Extra Small** | `4px` | Tooltips, snackbars, small badges |
| **Small** | `8px` | Standard buttons, text fields |
| **Medium** | `12px` | Standard cards, dropdown menus |
| **Large** | `16px` | Dialogs, navigation drawers |
| **Extra Large** | `28px` | Floating Action Buttons (FABs) |
| **Full** | `9999px` | Badges, chips, circular avatars |

---

## 6. Motion System

Standardizes animation timing and easing curves for transitions.

### 6.1 Duration Tokens
Driven by a global `durationScale` (default `1`).
- **Short 1-4**: 50ms - 200ms (Micro-interactions, button states)
- **Medium 1-4**: 250ms - 400ms (Page transitions, dropdowns)
- **Long 1-4**: 450ms - 600ms (Complex layout changes)

### 6.2 Easing Curves
- **Standard**: For UI elements moving within the screen bounds.
- **Emphasized**: For attention-grabbing elements.
- **Decelerated**: For elements entering the screen.
- **Accelerated**: For elements exiting the screen.
