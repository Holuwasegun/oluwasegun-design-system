import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { ThemeMode } from '../types/color.types';
import { SEMANTIC_ROLE_NAMES } from '../types/color.types';

interface RoleTableProps {
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
  return 'Other';
}

function formatRoleName(name: string): string {
  return name.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

const CATEGORY_COLORS: Record<string, string> = {
  Primary: '#a8c7fa',
  Secondary: '#c8a8e8',
  Tertiary: '#e8a8c8',
  Error: '#f28b82',
  Surface: '#9e9ea6',
  Outline: '#c4c4c8',
  Inverse: '#fdd663',
  Other: '#9e9ea6',
};

export function RoleTable({ semanticRoles, themeMode, onThemeModeChange }: RoleTableProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const handleCopy = (hex: string, roleName: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(roleName);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  const categories = ['all', ...new Set(SEMANTIC_ROLE_NAMES.map(getRoleCategory))];

  const filteredRoles =
    filter === 'all'
      ? SEMANTIC_ROLE_NAMES
      : SEMANTIC_ROLE_NAMES.filter((r) => getRoleCategory(r) === filter);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ods-text-muted)]">
          Role Mapping
        </h3>
        <div className="flex overflow-hidden rounded-lg border border-[var(--ods-border)]">
          {(['light', 'dark'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onThemeModeChange(mode)}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                themeMode === mode
                  ? 'bg-[var(--ods-accent)] text-black'
                  : 'bg-[var(--ods-surface)] text-[var(--ods-text-muted)] hover:bg-[var(--ods-surface-raised)]'
              }`}
            >
              {mode === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
              filter === cat
                ? 'bg-[var(--ods-surface-raised)] text-[var(--ods-text)]'
                : 'text-[var(--ods-text-muted)] hover:bg-[var(--ods-surface)]'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-px rounded-xl border border-[var(--ods-border)] overflow-hidden">
        <div className="grid grid-cols-[1fr_44px_80px_48px] gap-2 bg-[var(--ods-surface-raised)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ods-text-muted)]">
          <span>Role</span>
          <span className="text-center">Swatch</span>
          <span className="text-center">Hex</span>
          <span className="text-center">Ratio</span>
        </div>

        {filteredRoles.map((roleName) => {
          const roleData = semanticRoles[roleName];
          if (!roleData) return null;
          const category = getRoleCategory(roleName);
          const catColor = CATEGORY_COLORS[category] || '#9e9ea6';
          const bgIsDark =
            roleData.hex && parseInt(roleData.hex.slice(1, 3), 16) < 128;

          return (
            <div
              key={roleName}
              className="group grid grid-cols-[1fr_44px_80px_48px] items-center gap-2 border-t border-[var(--ods-border)] bg-[var(--ods-surface)] px-3 py-2 transition-colors hover:bg-[var(--ods-surface-raised)]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: catColor }}
                />
                <span className="truncate text-[11px] font-medium text-[var(--ods-text)]">
                  {formatRoleName(roleName)}
                </span>
              </div>

              <div className="flex justify-center">
                <div
                  className="h-6 w-6 rounded-md border border-white/10 shadow-sm"
                  style={{ backgroundColor: roleData.hex }}
                />
              </div>

              <button
                onClick={() => handleCopy(roleData.hex, roleName)}
                className="flex items-center justify-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] text-[var(--ods-text-muted)] transition-colors hover:bg-[var(--ods-border)]"
              >
                {copied === roleName ? (
                  <Check size={10} className="text-green-400" />
                ) : (
                  <Copy size={10} className="opacity-0 group-hover:opacity-60" />
                )}
                {roleData.hex.slice(0, 7).toUpperCase()}
              </button>

              <span
                className={`text-center text-[10px] font-mono ${
                  bgIsDark ? 'text-green-400' : 'text-orange-400'
                }`}
              >
                {roleData.contrastRatio.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
