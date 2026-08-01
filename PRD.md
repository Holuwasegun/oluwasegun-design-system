# PRODUCT REQUIREMENTS DOCUMENT
Oluwasegun Design System
Version 1.0 | Core Build | Design & Engineering HQ

## Revision Note
This is version 1.0 of the PRD for the Oluwasegun Design System, outlining the core capabilities of the live design token application, smart layouts (Layout Lab), and component visualization capabilities.

---

## 1. Product Summary
A cross-platform (Web, iOS, Android) Material Design 3 design system reference and configuration tool. It enables designers, engineers, and brand managers to build, visualize, and export complete design tokens instantly. By defining 5 key colors and a few typography base variables, the system extrapolates a complete 30+ role color scheme, 15-tier responsive type scale, spacing grid, and UI components. The tool features interactive UI rendering, multi-screen previews, a layout generator, and project state persistence wrapped in Capacitor for native mobile delivery.

## 2. Problem Statement
Design systems often live in static Figma files or fragmented CSS files, creating a disconnect between design intention and engineering implementation. When a brand color changes, calculating accessibility-compliant variations (hover states, dark mode, high-contrast borders) is a tedious manual task. Furthermore, demonstrating how those tokens apply to real, responsive marketing assets or dashboard UI requires hours of manual mockups. Teams need a single, dynamic source of truth where tokens can be adjusted and visualized in real-time across UI components and marketing layouts.

## 3. Goals and Non-Goals
**Goals:**
*   Allow users to input a minimal set of design tokens (5 key colors, base font size) and auto-generate a comprehensive MD3 compliant system.
*   Visualize design tokens immediately via live UI components, layout labs, and device-framed screens.
*   Enforce accessibility natively by computing WCAG compliant text and border contrasts in both light and dark modes.
*   Export generated tokens via raw JSON configuration or ready-to-use CSS custom properties (`--md-sys-color...`).
*   Persist configuration state and manage multiple themes using a project-based local storage system.
*   Generate on-brand marketing layouts using an API-driven Layout Lab.

**Non-Goals:**
*   Publishing a standalone NPM package of UI components in v1 (the tool is currently a reference and code-generation assistant).
*   Real-time multi-user collaboration (e.g., Figma multiplayer). Currently operates as a single-player SPA.
*   Asset hosting (images/fonts). Users must supply web-safe/Google fonts or manage custom font files independently.

## 4. User Personas
**Persona 1: The UI/UX Designer (Primary)**
Needs a fast way to generate accessible color palettes and type scales without manually checking contrast ratios. Wants to visually prove to stakeholders that the brand colors work in light and dark modes across different screen templates.

**Persona 2: The Frontend Engineer (Primary)**
Tired of translating static Figma hex codes into robust CSS variables. Needs a tool that provides copy-paste ready CSS `clamp()` functions, HSL derivations, and exact component mappings.

**Persona 3: The Brand Manager (Secondary)**
Needs to quickly generate social media flyers, hero banners, and ad creative that perfectly match brand guidelines using the Layout Lab without waiting for the design team.

## 5. Functional Requirements
**Theme Generation (Tokens)**
*   **R1.** The system accepts 5 key HEX colors (Primary, Secondary, Tertiary, Neutral, NeutralVariant).
*   **R2.** The system dynamically calculates a 26-level tonal palette for each key color.
*   **R3.** The system maps tonal palettes to 30+ semantic color roles for both Light and Dark mode.
*   **R4.** The system provides a typography scale editor (base size, scale ratio) and generates 15 type styles using CSS `clamp()` for fluid responsiveness.
*   **R5.** The system generates interactive spacing, shadow, border-radius, and motion scales based on base configurations.

**Preview & Visualization**
*   **R6.** The system renders live UI components (Buttons, Forms, Cards, Feedback) using the active token state.
*   **R7.** The system provides a "Screen Preview" featuring device-framed layouts (Desktop, Tablet, Mobile) of varying templates (Finance, Business, Education, Signup).
*   **R8.** The system provides a curated "Brand Gallery" summarizing the active tokens and icon libraries.

**Smart Layouts (Layout Lab)**
*   **R9.** The system accepts image uploads, headline, subtitle, and body text.
*   **R10.** The system posts this payload to `/api/generate-layout` alongside the active tokens.
*   **R11.** The system renders 5 generated layout suggestions (e.g., Centered Hero, Split Horizontal, Social Square) with downloadable PNG exports.

**State & Export**
*   **R12.** The system persists active configurations to local storage.
*   **R13.** The system allows users to create, save, rename, and load multiple project configurations.
*   **R14.** The system allows exporting configurations as JSON or copying CSS root variables.
*   **R15.** The system supports importing existing JSON configurations to override the current state.

## 6. Technical Requirements & Architecture
*   **Framework:** Next.js 16.2.10 (App Router, Turbopack) configured for static export (`output: 'export'`).
*   **Mobile Wrapper:** Capacitor for native iOS and Android deployment.
*   **Styling:** Emotion (`@emotion/react`) combined with Material UI (MUI v9) ThemeProvider. Tailwind CSS 4 for utility styling during development.
*   **State Management:** Zustand 5 with `persist` middleware. Uses Capacitor `@capacitor/preferences` on mobile to prevent OS-level data wiping.
*   **Design Paradigm:** Neumorphic-inspired, leveraging frosted glass, inset shadows, and strict WCAG contrast computations.
*   **Deployment:** Vercel (Edge network) for Web, Appflow for OTA mobile updates.

## 7. Data Model / State Management
The core state resides entirely on the client, managed by Zustand:
*   `useThemeStore`: Holds `config` (Colors, Typography, Spacing, Motion) and active project reference. Handles JSON/CSS exports and deeply-merged imports.
*   `useProjectStore`: Maintains an array of `Project` objects (id, name, config, timestamps) for versioning and switching themes.
*   `useAppStore`: Manages volatile UI states like the sidebar toggle and active SPA view.

## 8. Business Value (Internal & External)
While currently a free-to-use SPA, the system drives significant workflow efficiency:
*   **Speed to Market:** Reduces the time required to bootstrap an accessible CSS architecture from days to seconds.
*   **Consistency:** Eliminates visual regressions by enforcing mathematical scaling (Major Third, base units) rather than arbitrary pixel pushing.
*   **Autonomy:** Allows non-designers to generate brand-safe assets via the Layout Lab without blocking the design queue.

## 9. Risks & Mitigations
*   **Performance with Live Generation:** Rapidly dragging scale sliders triggers massive Emotion CSS recalculations. *Mitigation:* Zustand state batching and debounced inputs where necessary.
*   **Color Math Edge Cases:** Certain extremely saturated or extremely dark base colors can cause the tonal palette generation to fail WCAG AAA standards. *Mitigation:* Hardcoded luminance overrides for critical roles like `onPrimary` and `onBackground` to force legibility.
*   **Local Storage Limits:** Storing heavy base64 images in Layout Lab could exceed the 5MB localStorage limit. *Mitigation:* The `useThemeStore` strictly stores tokens, not user image uploads from the Layout Lab.

## 10. Success Metrics (Target KPIs)
*   **Session Duration:** High engagement time per user, indicating active usage of the token sliders and layout lab.
*   **Export Rate:** The percentage of sessions that result in a CSS copy or JSON export. Target: >40% of returning users.
*   **Layout Lab Generation:** Number of successful layouts generated and downloaded as PNGs per user session.
*   **Project Saves:** Number of saved themes per user, indicating value as a recurring workspace rather than a one-time toy.

## 11. Assumptions
*   **[ASSUMPTION]** The application operates as a Capacitor-wrapped cross-platform app; all persistence relies on the device's native Preferences API (`@capacitor/preferences`), falling back to `localStorage` on pure web.
*   **[ASSUMPTION]** Fluid typography via `clamp()` is supported by all target browsers (modern evergreen browsers).
*   **[ASSUMPTION]** Icons are bundled client-side and dynamically loaded (Lucide, MUI, FA, Flaticon).

## 12. Phased Roadmap
**v1: Core Configuration & Reference (Current)**
Theme: Build the best-in-class interactive token generator.
Scope: Colors, Typography, Spacing, Shadows. Project saving. Component and screen previews.

**v2: Advanced Export & Integration**
Theme: Bring the code to the codebase.
Scope: Figma Token sync plugin, native Tailwind `tailwind.config.ts` export, React Native theme export, generic SCSS variables export.

**v3: Team Collaboration**
Theme: Single source of truth for organizations.
Scope: Migrate `localStorage` to a hosted database (e.g., Supabase/PostgreSQL). Add Auth (Clerk/NextAuth). Allow shareable link generation for design system review.

## 13. Open Questions
*   Should the Layout Lab incorporate generative AI (e.g., OpenAI) for copywriting assistance in future iterations?
*   Should we support importing existing Figma tokens via an API key, bypassing manual color entry entirely?
*   What is the specific target bundle size for the exported CSS, and do we need a minifier built-in?

---
*End of PRD v1.0. Prepared for Oluwasegun Design System.*
