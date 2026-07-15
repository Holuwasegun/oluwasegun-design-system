import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import type { ThemeMode } from '../types/color.types';
import { SEMANTIC_ROLE_NAMES } from '../types/color.types';

interface Props {
  semanticRoles: Record<string, { hex: string; argb: number; contrastRatio: number }>;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
}

const CAT: Record<string, string> = {
  Primary: 'var(--primary)',
  Secondary: '#8B5CF6',
  Tertiary: '#C084FC',
  Error: 'var(--red)',
  Surface: 'var(--text-tertiary)',
  Outline: '#94A3B8',
  Inverse: 'var(--amber)',
};

function cat(n: string) {
  if (n.startsWith('primary')) return 'Primary';
  if (n.startsWith('secondary')) return 'Secondary';
  if (n.startsWith('tertiary')) return 'Tertiary';
  if (n.startsWith('error')) return 'Error';
  if (n.startsWith('surface') || n === 'background' || n === 'onBackground') return 'Surface';
  if (n.startsWith('outline')) return 'Outline';
  if (n.startsWith('inverse')) return 'Inverse';
  return 'Surface';
}

const SRC: Record<string, string> = {
  primary: '{color.key.primary}', onPrimary: '{color.palette.primary.100}',
  primaryContainer: '{color.palette.primary.80}', onPrimaryContainer: '{color.palette.primary.30}',
  secondary: '{color.key.secondary}', onSecondary: '{color.palette.secondary.100}',
  secondaryContainer: '{color.palette.secondary.80}', onSecondaryContainer: '{color.palette.secondary.30}',
  tertiary: '{color.key.tertiary}', onTertiary: '{color.palette.tertiary.100}',
  tertiaryContainer: '{color.palette.tertiary.80}', onTertiaryContainer: '{color.palette.tertiary.30}',
  error: '{color.error.main}', onError: '{color.error.on}',
  errorContainer: '{color.error.container}', onErrorContainer: '{color.error.onContainer}',
  background: '{color.palette.neutral.98}', onBackground: '{color.palette.neutral.10}',
  surface: '{color.palette.neutral.98}', onSurface: '{color.palette.neutral.10}',
  outline: '{color.palette.neutralVariant.60}', outlineVariant: '{color.palette.neutralVariant.90}',
  inverseSurface: '{color.palette.neutral.20}', inverseOnSurface: '{color.palette.neutral.95}',
  inversePrimary: '{color.palette.primary.80}', surfaceDim: '{color.palette.neutral.87}',
  surfaceBright: '{color.palette.neutral.98}', surfaceContainerLowest: '{color.palette.neutral.100}',
  surfaceContainerLow: '{color.palette.neutral.96}', surfaceContainer: '{color.palette.neutral.94}',
  surfaceContainerHigh: '{color.palette.neutral.92}', surfaceContainerHighest: '{color.palette.neutral.90}',
  surfaceVariant: '{color.palette.neutralVariant.90}', onSurfaceVariant: '{color.palette.neutralVariant.30}',
  shadow: '{color.palette.neutral.0}', scrim: '{color.palette.neutral.0}',
  surfaceTint: '{color.key.primary}',
};

function fmt(n: string) {
  return n.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

export function RoleMapping({ semanticRoles, themeMode, onThemeModeChange }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (hex: string, role: string) => {
    navigator.clipboard.writeText(hex).then(() => { setCopied(role); setTimeout(() => setCopied(null), 1200); });
  };

  return (
    <section className="rounded-lg p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Role Mapping</h3>
          <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Assign palette tones to semantic roles.</p>
        </div>
        <div className="flex overflow-hidden rounded-md" style={{ border: '1px solid var(--border)' }}>
          {(['light', 'dark'] as ThemeMode[]).map((m) => (
            <button key={m} onClick={() => onThemeModeChange(m)}
              className="px-3 py-1 text-[11px] font-medium transition-colors"
              style={{ background: themeMode === m ? 'var(--text)' : 'var(--surface)', color: themeMode === m ? '#fff' : 'var(--text-tertiary)' }}>
              {m === 'light' ? 'Light' : 'Dark'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md" style={{ border: '1px solid var(--border)' }}>
        {/* Head */}
        <div className="grid grid-cols-[1fr_44px_1fr] gap-3 px-3 py-2" style={{ background: 'var(--surface-hover)' }}>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Role Name</span>
          <span className="text-center text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Swatch</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Source Reference</span>
        </div>

        {/* Rows */}
        {SEMANTIC_ROLE_NAMES.map((roleName, i) => {
          const d = semanticRoles[roleName];
          if (!d) return null;
          const c = cat(roleName);
          const cc = CAT[c] || 'var(--text-tertiary)';
          const src = SRC[roleName] || '{color.auto}';
          const ov = roleName === 'primary';

          return (
            <div
              key={roleName}
              className="group grid grid-cols-[1fr_44px_1fr] items-center gap-3 px-3 py-2 transition-colors hover:bg-[var(--surface-hover)]"
              style={{ borderTop: '1px solid var(--border-light)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: cc }} />
                <span className="truncate text-[12px] font-medium" style={{ color: 'var(--text)' }}>{fmt(roleName)}</span>
              </div>
              <div className="flex justify-center">
                <button onClick={() => copy(d.hex, roleName)}
                  className="rounded transition-transform hover:scale-110"
                  style={{ width: 28, height: 28, backgroundColor: d.hex, border: '1px solid var(--border)' }}>
                  {copied === roleName && <Check size={10} color="#fff" className="mx-auto" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="truncate rounded px-1.5 py-0.5 text-[9px]" style={{ background: 'var(--surface-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', fontFamily: 'monospace' }}>
                  {src}
                </span>
                {ov && (
                  <span className="flex shrink-0 items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>
                    <AlertTriangle size={9} /> Override
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
