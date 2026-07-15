import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type ThemeConfig,
  type SchemeMode,
  DEFAULT_THEME_CONFIG,
} from "@/theme/scheme";

// ---------- Theme Store (persisted to localStorage) ----------
interface ThemeStore {
  config: ThemeConfig;
  setKeyColor: (key: "primary" | "secondary" | "tertiary" | "error", color: string) => void;
  setMode: (mode: SchemeMode) => void;
  toggleMode: () => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      config: { ...DEFAULT_THEME_CONFIG },

      setKeyColor: (key, color) =>
        set((state) => ({
          config: {
            ...state.config,
            keyColors: { ...state.config.keyColors, [key]: color },
          },
        })),

      setMode: (mode) =>
        set((state) => ({
          config: { ...state.config, mode },
        })),

      toggleMode: () =>
        set((state) => ({
          config: {
            ...state.config,
            mode: state.config.mode === "light" ? "dark" : "light",
          },
        })),

      resetConfig: () => set({ config: { ...DEFAULT_THEME_CONFIG } }),

      exportConfig: () => JSON.stringify(get().config, null, 2),

      importConfig: (json) => {
        try {
          const parsed = JSON.parse(json) as ThemeConfig;
          if (
            parsed.keyColors &&
            typeof parsed.keyColors.primary === "string" &&
            typeof parsed.keyColors.secondary === "string" &&
            typeof parsed.keyColors.tertiary === "string" &&
            typeof parsed.keyColors.error === "string" &&
            (parsed.mode === "light" || parsed.mode === "dark")
          ) {
            set({ config: parsed });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    { name: "oluwasegun-design-system-theme" }
  )
);

// ---------- Sidebar Store ----------
interface SidebarStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<SidebarStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
