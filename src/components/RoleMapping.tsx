import { useState } from 'react';
import { Copy, Check, AlertTriangle } from 'lucide-react';
import type { ThemeMode } from '../types/color.types';
import { SEMANTIC_ROLE_NAMES } from '../types/color.types';

interface RoleMappingProps {
  semanticRoles: Record<string, { hex: string; argb: number; contrastRatio: number }>;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
}

function getRoleCategory(roleName: string): string {
  if (roleName.startsWith('primary')) return 'Primary';
  if (roleName.startsWith('secondary')) return 'Secondary';
  if (roleName.startsWith('tertiary')) return 'Tertiary';
  if (roleName.startsWith('error')) return 'Error';
  if (roleName.startsWith('surface') || roleName === 'background' || roleName === 'onBackground') return 'Surface';
  if (roleName.startsWith('outline')) return 'Outline';
  if (roleName.startsWith('inverse')) return 'Inverse';
  if (roleName === 'shadow' || roleName === 'scrim') return 'Surface';
  return 'Other';
}

function getSourceRef(roleName: string): string {
  if (roleName === 'primary') return `{color.key.primary}`;
  if (roleName === 'onPrimary') return `{color.palette.primary.100}`;
  if (roleName === 'primaryContainer') return `{color.palette.primary.80}`;
  if (roleName === 'onPrimaryContainer') return `{color.palette.primary.30}`;
  if (roleName === 'secondary') return `{color.key.secondary}`;
  if (roleName === 'onSecondary') return `{color.palette.secondary.100}`;
  if (roleName === 'secondaryContainer') return `{color.palette.secondary.80}`;
  if (roleName === 'onSecondaryContainer') return `{color.palette.secondary.30}`;
  if (roleName === 'tertiary') return `{color.key.tertiary}`;
  if (roleName === 'onTertiary') return `{color.palette.tertiary.100}`;
  if (roleName === 'tertiaryContainer') return `{color.palette.tertiary.80}`;
  if (roleName === 'onTertiaryContainer') return `{color.palette.tertiary.30}`;
  if (roleName === 'error') return `{color.error.main}`;
  if (roleName === 'onError') return `{color.error.on}`;
  if (roleName === 'errorContainer') return `{color.error.container}`;
  if (roleName === 'onErrorContainer') return `{color.error.onContainer}`;
  if (roleName === 'background') return `{color.palette.neutral.98}`;
  if (roleName === 'onBackground') return `{color.palette.neutral.10}`;
  if (roleName === 'surface') return `{color.palette.neutral.98}`;
  if (roleName === 'onSurface') return `{color.palette.neutral.10}`;
  if (roleName === 'outline') return `{color.palette.neutralVariant.60}`;
  if (roleName === 'outlineVariant') return `{color.palette.neutralVariant.90}`;
  return `{color.auto}`;
}

function hasOverride(roleName: string): boolean {
  return roleName === 'primary';
}

function formatRoleName(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

const CATEGORY_COLORS: Record<string, string> = {
  Primary: '#7C5CFC',
  Secondary: '#9E8CE8',
  Tertiary: '#C87EAE',
  Error: '#EF4444',
  Surface: '#6B7194',
  Outline: '#9CA3C0',
  Inverse: '#F59E0B',
  Other: '#9CA3C0',
};

export function RoleMapping({ semanticRoles, themeMode, onThemeModeChange }: RoleMappingProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (hex: string, roleName: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(roleName);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div
      className="rounded-2xl p-5 transition-all"
      style={{
        background: 'var(--matisse-surface)',
        border: '1px solid var(--matisse-border-light)',
        boxShadow: 'var(--matisse-shadow-sm)',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3
            className="text-sm font-semibold"
            style={{ color: 'var(--matisse-text)' }}
          >
            Role Mapping
          </h3>
          <p
            className="mt-0.5 text-xs"
            style={{ color: 'var(--matisse-text-muted)' }}
          >
            Assign palette tones to semantic roles.
          </p>
        </div>
        <div
          className="flex overflow-hidden rounded-lg"
          style={{ border: '1.5px solid var(--matisse-border)' }}
        >
          {(['light', 'dark'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onThemeModeChange(mode)}
              className="px-3.5 py-1.5 text-xs font-semibold transition-all"
              style={{
                background:
                  themeMode === mode
                    ? 'var(--matisse-tab-active)'
                    : 'var(--matisse-surface)',
                color:
                  themeMode === mode
                    ? '#ffffff'
                    : 'var(--matisse-text-muted)',
              }}
            >
              {mode === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div
        className="grid grid-cols-[1fr_60px_1fr] gap-4 rounded-t-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest"
        style={{
          background: 'var(--matisse-surface-raised)',
          color: 'var(--matisse-text-muted)',
          borderBottom: '1px solid var(--matisse-border-light)',
        }}
      >
        <span>Role Name</span>
        <span className="text-center">Swatch</span>
        <span>Source Reference</span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {SEMANTIC_ROLE_NAMES.map((roleName) => {
          const roleData = semanticRoles[roleName];
          if (!roleData) return null;
          const category = getRoleCategory(roleName);
          const catColor = CATEGORY_COLORS[category] || '#9CA3C0';
          const sourceRef = getSourceRef(roleName);
          const override = hasOverride(roleName);

          return (
            <div
              key={roleName}
              className="group grid grid-cols-[1fr_60px_1fr] items-center gap-4 px-4 py-2.5 transition-colors hover:opacity-95"
              style={{
                borderBottom: '1px solid var(--matisse-border-light)',
              }}
            >
              {/* Role Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="inline-block h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: catColor }}
                />
                <span
                  className="truncate text-[12px] font-medium"
                  style={{ color: 'var(--matisse-text)' }}
                >
                  {formatRoleName(roleName)}
                </span>
              </div>

              {/* Swatch */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleCopy(roleData.hex, roleName)}
                  className="group/swatch relative flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:scale-110"
                  style={{
                    backgroundColor: roleData.hex,
                    border: '2px solid var(--matisse-border-light)',
                  }}
                >
                  {copied === roleName ? (
                    <Check size={10} className="text-white" />
                  ) : (
                    <Copy
                      size={10}
                      className="text-white opacity-0 transition-opacity group-hover/swatch:opacity-80"
                    />
                  )}
                </button>
              </div>

              {/* Source Reference */}
              <div className="flex items-center gap-2">
                <span
                  className="rounded-md px-2 py-1 font-mono text-[10px]"
                  style={{
                    background: 'var(--matisse-surface-raised)',
                    color: 'var(--matisse-text-secondary)',
                    border: '1px solid var(--matisse-border-light)',
                  }}
                >
                  {sourceRef}
                </span>
                {override && (
                  <span
                    className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold"
                    style={{
                      background: '#FEF3C7',
                      color: '#92400E',
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
    </div>
  );
}
