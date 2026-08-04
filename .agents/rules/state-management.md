# State Management Architecture

Rules for handling state within the Oluwasegun Design System.

## The Source of Truth
1. **Zustand Over React Context**: All global state, including design tokens, project metadata, and sidebar visibility, must be managed via Zustand stores located in `src/store/`. Do not use React Context for global state.
2. **Offline-First Persistence**: Primary application state persists locally on the user's device using `@capacitor/preferences` (or `localStorage` on web) via Zustand's `persist` middleware for instant offline access.
3. **Backend Synchronization & Object Storage**: Saved project configurations, user themes, and Layout Lab metadata sync to a PostgreSQL database via Prisma ORM when connected. Binary assets (Layout Lab uploads, generated PNG banners, export bundles) live in Cloudflare R2, with keys (`storageKey`) referenced in the database.

## Core Stores
- `useThemeStore`: Holds all styling variables (Colors, Typography, Spacing, Motion). 
- `useProjectStore`: Manages an array of saved workspace states (projects) allowing the user to switch between themes.
- `useAppStore`: Manages volatile UI states (like the mobile sidebar toggle, active dashboard view, and network sync status).

## Mutations
- **Avoid Mutation Spikes**: When writing components that bind to range sliders or color pickers, use debouncing where necessary to prevent triggering massive CSS recalculations in Emotion on every single pixel/hue drag.
