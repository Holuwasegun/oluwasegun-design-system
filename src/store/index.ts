import { create } from "zustand";
import { tokens, type TokenKey } from "@/theme/tokens";

interface ThemeStore {
  overrides: Partial<Record<TokenKey, string>>;
  setOverride: (key: string, value: string) => void;
  removeOverride: (key: string) => void;
  resetOverrides: () => void;
  hasOverrides: () => boolean;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  overrides: {},

  setOverride: (key, value) =>
    set((state) => ({
      overrides: { ...state.overrides, [key]: value },
    })),

  removeOverride: (key) =>
    set((state) => {
      const { [key as TokenKey]: _, ...rest } = state.overrides;
      return { overrides: rest };
    }),

  resetOverrides: () => set({ overrides: {} }),

  hasOverrides: () => Object.keys(get().overrides).length > 0,
}));

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
