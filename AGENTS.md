# AGENTS.md

Rules for the AI coding agent building the **Oluwasegun Design System**.

This file tells you how to behave while building. It does not tell you what to build. The `PRD.md` and `README.md` do that. When the rules and the PRD ever seem to conflict, follow this file for behavior and the PRD for scope, and stop and flag the conflict.

---

## 1. What is this project?

The Oluwasegun Design System is a Next.js-based Single Page Application (SPA) that acts as a live reference tool and configuration assistant for graphic designers and UI engineers. It generates an entire Material Design 3 (MD3) system (colors, typography, spacing, shadows) from a few base tokens. 

- **Version you are building:** v1. The app acts as a robust client-side tool utilizing local storage.
- **Source of truth:** The `PRD.md` and `README.md`. Every feature, component, and token logic traces back to these documents. If a feature is not in these docs, it is not in scope.

Read the PRD before you write code. Features go into tasks. Rules go into this file. Do not turn a rule into a feature or a feature into a rule.

---

## 2. What is locked

You must never change, swap, upgrade, or "improve" anything in this section. If you believe something here is wrong, stop and flag it. Do not act on the belief.

### 2.1 Hard-locked stack

- **Framework:** Next.js 16.2.10 (App Router, Turbopack).
- **Language:** TypeScript 5.
- **UI & Styling:** React 19.2.4, Material UI (MUI v9), Emotion (`@emotion/react`), and Tailwind CSS 4 (for development utility only).
- **State Management:** Zustand 5 with `persist` middleware.

Do not introduce a second framework, a different state management library (like Redux or Recoil), or a completely different styling architecture that breaks the Emotion/MUI integration.

### 2.2 Locked Architecture (Cross-Platform SPA)

- **Capacitor Mobile Wrapper:** This is a cross-platform app (Web, iOS, Android) utilizing Capacitor. Do NOT write Next.js server-side code (SSR), API routes relying on Node backends, or use `next/image` optimization. The app must compile strictly to a static export (`output: 'export'`).
- **No Backend Database:** There is NO PostgreSQL, NO Prisma, NO Supabase, and NO MongoDB. This is a client-side SPA. 
- **Persistence:** All configurations and themes are saved on the user's device. For cross-platform persistence, you must use Capacitor's `@capacitor/preferences` inside Zustand's persist middleware, NOT standard `localStorage`.
- **Single Page Application:** The core application renders inside `/dashboard` relying on client-side `currentView` routing via the `useAppStore`.

---

## 3. What must never happen

Every line here is an order. Breaking any one of them means the task failed, even if the code builds and the feature works.

### Token & Styling Discipline
- **No Hardcoded Pixels/Colors:** Never use arbitrary HEX codes or hardcoded pixels (e.g., `margin-top: 15px` or `color: #ff0000`) in UI components. Always pull colors, spacing multipliers (e.g., `--spacing-2`), and typography fluid `clamp()` values directly from the generated tokens or the `useThemeStore`.
- **Enforce Contrast (Accessibility):** Never bypass WCAG relative luminance checks. If generating a text color (like `onPrimary` or `onBackground`), always adhere to the contrast logic ensuring at least AA compliance. Dark mode requires AAA compliance for background text.

### Infrastructure & Scope
- **No Backend Creep:** Never write API routes that attempt to connect to a database or perform heavy server-side processing, except for the clearly defined `/api/generate-layout` which serves as the Layout Lab backend.
- **No Heavy Asset Storage:** Never store large base64 image strings from the Layout Lab directly in the global `useThemeStore`. The store is for tokens and configuration data only to prevent hitting the 5MB `localStorage` limit.
- **Stay in v1 Scope:** Do not attempt to build Figma sync plugins or multi-user authentication (NextAuth/Clerk) yet. Those are v2 and v3 features.

---

## 4. How is the work arranged?

Follow this layout. The point of it is logical separation: state management, mathematical generators, and UI views all live in their designated silos.

```
oluwasegun-design-system/
├─ AGENTS.md                   # You are here
├─ PRD.md                      # Source of truth for scope
├─ src/
│  ├─ app/                     # Next.js App Router
│  │  ├─ api/                  # Layout generator API endpoint
│  │  └─ dashboard/            # The SPA shell (renders all views based on state)
│  ├─ components/
│  │  ├─ views/                # 12 SPA view components (ColorView, SpacingView, etc.)
│  │  ├─ preview/              # UI templates reading live tokens (SaaS Dashboard, etc.)
│  │  └─ brand-gallery/        # Curated sections showcasing the tokens
│  ├─ store/                   # Zustand stores (useThemeStore, useProjectStore, useAppStore)
│  ├─ theme/                   # Mathematical generators (tonal-palette, Google fonts, scheme)
│  └─ lib/                     # Utilities (token-utils, brand-gallery-utils, icons)
```

Rules that this layout enforces, and that you must not break:
- **Zustand Handles State:** Local component state (`useState`) is fine for UI toggles, but all core token logic, active project configuration, and the currently active SPA view must live in `src/store/`.
- **Generators are Pure:** Functions inside `src/theme/` (like tonal palette generation) must be pure functions that take base values and return extrapolated objects. No side effects.
- **MUI Theme is Dynamic:** The `ThemeRegistry.tsx` listens to the Zustand store and injects dynamically generated color schemes into the MUI `ThemeProvider`.

---

## 5. How should the code look?

Clean, readable, modern, and boring. Optimize for the next human who reads it.

- TypeScript in strict mode. No `any`. No `@ts-ignore` to silence a real type error. Type every boundary.
- Target the current Node LTS.
- Small modules with one clear job. Pure functions for token math. 
- Named exports. Clear names over clever names. A function name says what it does.
- Avoid unnecessary re-renders. Rapid slider adjustments (like spacing or color hue) should not freeze the UI. Use debouncing if necessary.
- Comment the why, not the what. If a rule from this file drives a piece of code, name the rule in a short comment.
- Keep formatting automatic and consistent through the repo's linter (ESLint).

---

## 6. What counts as done?

A task is done only when all of the following are true. If any line fails, the task is not done, no matter how much works.

- The code builds with zero errors (`npm run build`). `tsc` passes with no type errors and the linter passes with no errors.
- Every UI component modified respects the live tokens and dynamically updates when a token changes.
- No hardcoded pixels or arbitrary HEX codes were introduced.
- No backend infrastructure or database was added.
- No v2 or v3 feature was added.
- Client-side persistence (`localStorage`) still functions flawlessly.

End every task with a short checklist in this shape:

```
Task: <name>
Token Discipline: <confirm no hardcoded values were used>
Build: tsc clean, lint clean
Scope: v1 only, no backend DB added
Notes / open questions: <anything you flagged, or "none">
```

---

## 7. What does the agent do when unsure?

When the PRD does not answer a question, stop. Do not guess your way forward.

- Never invent a new feature, a new screen, or a new scope to fill a gap. Absence from the PRD means out of scope, not "your call."
- Never write throwaway or spaghetti code to get past a blocker. 
- Never add a library or swap a locked framework choice to make a problem easier.
- Make the smallest change that satisfies the PRD and this file. If two readings are possible, choose the one that keeps scope smaller and rules intact.
- If the blocker is a real open decision, write it down as a flagged note in your task output and point to the matching item in PRD section 13, Open Questions, if one exists. Then wait for a human answer rather than deciding for them.

When in doubt, do less, keep it clean, and ask.