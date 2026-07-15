import { useState } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import type { ThemeMode } from '../types/color.types';
import { SEMANTIC_ROLE_NAMES } from '../types/color.types';

interface RoleMappingProps {
  semanticRoles: Record<
    string,
    { hex: string; argb: number; contrastRatio: number }
  >;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Primary: 'var(--ods-primary)',
  Secondary: '#8B5CF6',
  Tertiary: '#C084FC',
  Error: 'var(--ods-error)',
  Surface: 'var(--ods-text-tertiary)',
  Outline: '#94A3B8',
  Inverse: 'var(--ods-warning)',
};

function getRoleCategory(name: string): string {
  if (name.startsWith('primary')) return 'Primary';
  if (name.startsWith('secondary')) return 'Secondary';
  if (name.startsWith('tertiary')) return 'Tertiary';
  if (name.startsWith('error')) return 'Error';
  if (
    name.startsWith('surface') ||
    name === 'background' ||
    name === 'onBackground'
  )
    return 'Surface';
  if (name.startsWith('outline')) return 'Outline';
  if (name.startsWith('inverse')) return 'Inverse';
  return 'Surface';
}

function getSourceRef(name: string): string {
  const map: Record<string, string> = {
    primary: '{color.key.primary}',
    onPrimary: '{color.palette.primary.100}',
    primaryContainer: '{color.palette.primary.80}',
    onPrimaryContainer: '{color.palette.primary.30}',
    secondary: '{color.key.secondary}',
    onSecondary: '{color.palette.secondary.100}',
    secondaryContainer: '{color.palette.secondary.80}',
    onSecondaryContainer: '{color.palette.secondary.30}',
    tertiary: '{color.key.tertiary}',
    onTertiary: '{color.palette.tertiary.100}',
    tertiaryContainer: '{color.palette.tertiary.80}',
    onTertiaryContainer: '{color.palette.tertiary.30}',
    error: '{color.error.main}',
    onError: '{color.error.on}',
    errorContainer: '{color.error.container}',
    onErrorContainer: '{color.error.onContainer}',
    background: '{color.palette.neutral.98}',
    onBackground: '{color.palette.neutral.10}',
    surface: '{color.palette.neutral.98}',
    onSurface: '{color.palette.neutral.10}',
    outline: '{color.palette.neutralVariant.60}',
    outlineVariant: '{color.palette.neutralVariant.90}',
    inverseSurface: '{color.palette.neutral.20}',
    inverseOnSurface: '{color.palette.neutral.95}',
    inversePrimary: '{color.palette.primary.80}',
    surfaceDim: '{color.palette.neutral.87}',
    surfaceBright: '{color.palette.neutral.98}',
    surfaceContainerLowest: '{color.palette.neutral.100}',
    surfaceContainerLow: '{color.palette.neutral.96}',
    surfaceContainer: '{color.palette.neutral.94}',
    surfaceContainerHigh: '{color.palette.neutral.92}',
    surfaceContainerHighest: '{color.palette.neutral.90}',
    surfaceVariant: '{color.palette.neutralVariant.90}',
    onSurfaceVariant: '{color.palette.neutralVariant.30}',
    shadow: '{color.palette.neutral.0}',
    scrim: '{color.palette.neutral.0}',
    surfaceTint: '{color.key.primary}',
  };
  return map[name] || '{color.auto}';
}

function hasOverride(name: string): boolean {
  return name === 'primary';
}

function formatName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function RoleMapping({
  semanticRoles,
  themeMode,
  onThemeModeChange,
}: RoleMappingProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (hex: string, role: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(role);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <section
      className="rounded-xl p-5"
      style={{
        background: 'var(--ods-surface)',
        border: '1px solid var(--ods-border-subtle)',
        boxShadow: 'var(--ods-shadow-sm)',
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="text-[14px] font-semibold"
            style={{ color: 'var(--ods-text)' }}
          >
            Role Mapping
          </h3>
          <p
            className="mt-0.5 text-[12px]"
            style={{ color: 'var(--ods-text-tertiary)' }}
          >
            Assign palette tones to semantic roles.
          </p>
        </div>

        {/* Mode toggle */}
        <div
          className="flex overflow-hidden rounded-lg"
          style={{ border: '1px solid var(--ods-border)' }}
        >
          {(['light', 'dark'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onThemeModeChange(mode)}
              className="px-3 py-1.5 text-[12px] font-semibold transition-all duration-150"
              style={{
                background:
                  themeMode === mode ? 'var(--ods-text)' : 'var(--ods-surface)',
                color:
                  themeMode === mode
                    ? 'var(--ods-text-inverse)'
                    : 'var(--ods-text-tertiary)',
              }}
            >
              {mode === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-hidden rounded-lg"
        style={{ border: '1px solid var(--ods-border-subtle)' }}
      >
        {/* Table head */}
        <div
          className="grid grid-cols-[1fr_52px_1fr] items-center gap-3 px-4 py-2.5"
          style={{
            background: 'var(--ods-surface-secondary)',
            borderBottom: '1px solid var(--ods-border-subtle)',
          }}
        >
          {['Role Name', 'Swatch', 'Source Reference'].map((h) => (
            <span
              key={h}
              className={`text-[10px] font-bold uppercase tracking-[0.1em] ${
                h === 'Swatch' ? 'text-center' : ''
              }`}
              style={{ color: 'var(--ods-text-tertiary)' }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Table body */}
        {SEMANTIC_ROLE_NAMES.map((roleName) => {
          const data = semanticRoles[roleName];
          if (!data) return null;
          const cat = getRoleCategory(roleName);
          const catColor = CATEGORY_COLORS[cat] || 'var(--ods-text-tertiary)';
          const src = getSourceRef(roleName);
          const over = hasOverride(roleName);

          return (
            <div
              key={roleName}
              className="group grid grid-cols-[1fr_52px_1fr] items-center gap-3 px-4 py-2 transition-colors duration-100"
              style={{
                borderBottom: '1px solid var(--ods-border-subtle)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'var(--ods-surface-secondary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'transparent';
              }}
            >
              {/* Role name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: catColor }}
                />
                <span
                  className="truncate text-[12px] font-medium"
                  style={{ color: 'var(--ods-text)' }}
                >
                  {formatName(roleName)}
                </span>
              </div>

              {/* Swatch */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleCopy(data.hex, roleName)}
                  className="relative flex items-center justify-center rounded-md transition-all duration-150 hover:scale-110"
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: data.hex,
                    border: '2px solid var(--ods-border-subtle)',
                  }}
                >
                  {copied === roleName ? (
                    <Check size={10} color="#fff" />
                  ) : (
                    <Copy
                      size={10}
                      color="#fff"
                      className="opacity-0 group-hover:opacity-70 transition-opacity duration-150"
                    />
                  )}
                </button>
              </div>

              {/* Source ref */}
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="truncate rounded px-2 py-1 text-[10px]"
                  style={{
                    background: 'var(--ods-surface-secondary)',
                    color: 'var(--ods-text-secondary)',
                    border: '1px solid var(--ods-border-subtle)',
                    fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  }}
                >
                  {src}
                </span>
                {over && (
                  <span
                    className="flex shrink-0 items-center gap-1 rounded px-2 py-1 text-[10px] font-semibold"
                    style={{
                      background: 'var(--ods-warning-bg)',
                      color: 'var(--ods-warning)',
                    }}
                  >
                    <AlertTriangle size={10} />
                    Override
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
