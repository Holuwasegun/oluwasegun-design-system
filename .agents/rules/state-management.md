# State Management Architecture

Rules for handling state within the Oluwasegun Design System.

## The Source of Truth
1. **Zustand Over React Context**: All global state, including design tokens, project metadata, and sidebar visibility, must be managed via Zustand stores located in `src/store/`. Do not use React Context for global state.
2. **Client-Side Persistence Only**: The application state persists entirely within the browser's `localStorage` using Zustand's `persist` middleware. 
3. **No Backend Creep**: Do NOT attempt to integrate Postgres, Prisma, or any other backend ORM to save configurations. This is a strictly client-side application (with the exception of the API route for the layout generator).

## Core Stores
- `useThemeStore`: Holds all styling variables (Colors, Typography, Spacing, Motion). 
- `useProjectStore`: Manages an array of saved workspace states (projects) allowing the user to switch between themes.
- `useAppStore`: Manages volatile UI states (like the mobile sidebar toggle or active dashboard view).

## Mutations
- **Avoid Mutation Spikes**: When writing components that bind to range sliders or color pickers, use debouncing where necessary to prevent triggering massive CSS recalculations in Emotion on every single pixel/hue drag.
