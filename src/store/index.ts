import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type ThemeConfig,
  type SchemeMode,
  type TypographyScale,
  type SpacingConfig,
  type MotionConfig,
  DEFAULT_THEME_CONFIG,
  generateSchemeFromConfig,
} from "@/theme/scheme";

// ---------- Project ----------
export interface Project {
  id: string;
  name: string;
  config: ThemeConfig;
  createdAt: string;
  updatedAt: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ---------- Theme Store ----------
interface ThemeStore {
  config: ThemeConfig;
  currentProjectId: string | null;
  setKeyColor: (key: string, color: string) => void;
  addKeyColor: (key: string, color: string) => void;
  removeKeyColor: (key: string) => void;
  renameKeyColor: (oldKey: string, newKey: string) => void;
  setMode: (mode: SchemeMode) => void;
  toggleMode: () => void;
  setTypography: (typography: Partial<TypographyScale>) => void;
  setSpacing: (spacing: Partial<SpacingConfig>) => void;
  setMotion: (motion: Partial<MotionConfig>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  exportCssTokens: () => string;
  importConfig: (json: string) => boolean;
}

function mergeConfig(persisted: unknown, current: ThemeStore): ThemeStore {
  const p = persisted as Partial<ThemeStore>;
  const persistedConfig = p?.config;
  const c = current.config;
  return {
    ...current,
    ...p,
    config: {
      ...c,
      ...(persistedConfig ?? {}),
      keyColors: { ...c.keyColors, ...(persistedConfig?.keyColors ?? {}) },
      typography: { ...c.typography, ...(persistedConfig?.typography ?? {}), letterSpacingOverrides: { ...c.typography.letterSpacingOverrides, ...(persistedConfig?.typography?.letterSpacingOverrides ?? {}) }, fontFamily: persistedConfig?.typography?.fontFamily ?? c.typography.fontFamily },
      spacing: { ...c.spacing, ...(persistedConfig?.spacing ?? {}) },
      motion: { durationScale: 1, ...c.motion, ...(persistedConfig?.motion ?? {}), durationOverrides: { ...c.motion?.durationOverrides, ...(persistedConfig?.motion?.durationOverrides ?? {}) }, easingOverrides: { ...c.motion?.easingOverrides, ...(persistedConfig?.motion?.easingOverrides ?? {}) } },
      mode: persistedConfig?.mode ?? c.mode,
    },
    currentProjectId: p?.currentProjectId ?? null,
  };
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      config: { ...DEFAULT_THEME_CONFIG },
      currentProjectId: null,

      setKeyColor: (key, color) =>
        set((state) => ({
          config: {
            ...state.config,
            keyColors: { ...state.config.keyColors, [key]: color },
          },
        })),

      addKeyColor: (key, color) =>
        set((state) => ({
          config: {
            ...state.config,
            keyColors: { ...state.config.keyColors, [key]: color },
          },
        })),

      removeKeyColor: (key) =>
        set((state) => {
          const { [key]: _, ...rest } = state.config.keyColors;
          return { config: { ...state.config, keyColors: rest } };
        }),

      renameKeyColor: (oldKey, newKey) =>
        set((state) => {
          const hex = state.config.keyColors[oldKey];
          if (!hex) return state;
          const { [oldKey]: _, ...rest } = state.config.keyColors;
          return {
            config: { ...state.config, keyColors: { ...rest, [newKey]: hex } },
          };
        }),

      setMode: (mode) =>
        set((state) => ({ config: { ...state.config, mode } })),

      toggleMode: () =>
        set((state) => {
          const nextMode = state.config.mode === "system" ? "light" : state.config.mode === "light" ? "dark" : "system";
          return {
            config: {
              ...state.config,
              mode: nextMode,
            },
          };
        }),

      setTypography: (typography) =>
        set((state) => ({
          config: {
            ...state.config,
            typography: { ...state.config.typography, ...typography },
          },
        })),

      setSpacing: (spacing) =>
        set((state) => ({
          config: {
            ...state.config,
            spacing: { ...state.config.spacing, ...spacing },
          },
        })),

      setMotion: (motion) =>
        set((state) => ({
          config: {
            ...state.config,
            motion: { ...(state.config.motion ?? DEFAULT_THEME_CONFIG.motion!), ...motion },
          },
        })),

      resetConfig: () =>
        set({
          config: { ...DEFAULT_THEME_CONFIG },
          currentProjectId: null,
        }),

      exportConfig: () => JSON.stringify(get().config, null, 2),

      exportCssTokens: () => {
        const config = get().config;
        const lightScheme = generateSchemeFromConfig(config, "light");
        const darkScheme = generateSchemeFromConfig(config, "dark");
        let css = ":root {\n";
        for (const [k, v] of Object.entries(lightScheme)) {
          css += `  --md-sys-color-${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-light: ${v};\n`;
        }
        for (const [k, v] of Object.entries(darkScheme)) {
          css += `  --md-sys-color-${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-dark: ${v};\n`;
        }
        css += "}\n\n";
        
        css += "@media (prefers-color-scheme: light) {\n  :root {\n";
        for (const [k] of Object.entries(lightScheme)) {
          const cssKey = k.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
          css += `    --md-sys-color-${cssKey}: var(--md-sys-color-${cssKey}-light);\n`;
        }
        css += "  }\n}\n\n";

        css += "@media (prefers-color-scheme: dark) {\n  :root {\n";
        for (const [k] of Object.entries(darkScheme)) {
          const cssKey = k.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
          css += `    --md-sys-color-${cssKey}: var(--md-sys-color-${cssKey}-dark);\n`;
        }
        css += "  }\n}\n";

        return css;
      },

      importConfig: (json) => {
        try {
          const parsed = JSON.parse(json) as ThemeConfig;
          if (parsed.keyColors && typeof parsed.mode === "string") {
            const merged: ThemeConfig = {
              ...DEFAULT_THEME_CONFIG,
              ...parsed,
              keyColors: parsed.keyColors,
              typography: { ...DEFAULT_THEME_CONFIG.typography, ...parsed.typography, letterSpacingOverrides: { ...DEFAULT_THEME_CONFIG.typography.letterSpacingOverrides, ...(parsed.typography?.letterSpacingOverrides ?? {}) }, fontFamily: parsed.typography?.fontFamily ?? DEFAULT_THEME_CONFIG.typography.fontFamily },
              spacing: { ...DEFAULT_THEME_CONFIG.spacing, ...parsed.spacing },
              motion: { durationScale: 1, ...DEFAULT_THEME_CONFIG.motion, ...(parsed.motion ?? {}), durationOverrides: { ...DEFAULT_THEME_CONFIG.motion?.durationOverrides, ...(parsed.motion?.durationOverrides ?? {}) }, easingOverrides: { ...DEFAULT_THEME_CONFIG.motion?.easingOverrides, ...(parsed.motion?.easingOverrides ?? {}) } },
            };
            set({ config: merged, currentProjectId: null });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    { name: "oluwasegun-design-system-theme", merge: (p, c) => mergeConfig(p, c as ThemeStore) }
  )
);

// ---------- Project Store ----------
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

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],

      createProject: (name) => {
        const id = generateId();
        const now = new Date().toISOString();
        const config = useThemeStore.getState().config;
        const project: Project = {
          id,
          name,
          config: { ...config },
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          projects: [...state.projects, project],
        }));
        useThemeStore.setState({ currentProjectId: id });
        return project;
      },

      saveToProject: (id) => {
        const config = useThemeStore.getState().config;
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id
              ? { ...p, config: { ...config }, updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      saveAsProject: (name) => {
        const project = get().createProject(name);
        return project;
      },

      loadProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (project) {
          useThemeStore.setState({
            config: { ...project.config },
            currentProjectId: id,
          });
        }
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
        if (useThemeStore.getState().currentProjectId === id) {
          useThemeStore.setState({ currentProjectId: null });
        }
      },

      renameProject: (id, name) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, name, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      getCurrentProject: () => {
        const id = useThemeStore.getState().currentProjectId;
        if (!id) return null;
        return get().projects.find((p) => p.id === id) ?? null;
      },
    }),
    { name: "oluwasegun-design-system-projects" }
  )
);

// ---------- Sidebar Store ----------
interface AppStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  currentView: "home",
  setCurrentView: (view) => set({ currentView: view }),
}));
