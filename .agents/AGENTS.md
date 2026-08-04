# Capacitor Cross-Platform Rules

These rules strictly govern the architecture of the Oluwasegun Design System to maintain compatibility across Web, iOS, and Android.

- **Capacitor Mobile Wrapper:** This is a cross-platform app utilizing Capacitor. The web frontend compiles to a static export (`output: 'export'`) for native iOS and Android webview distribution.
- **Offline-First Persistence & Background Sync:** Configurations and themes load instantly from the user's device using Capacitor's `@capacitor/preferences` inside Zustand's persist middleware. Background synchronization syncs projects, layouts, and exports to PostgreSQL via Prisma and stores image assets in Cloudflare R2 when connected to the network.
