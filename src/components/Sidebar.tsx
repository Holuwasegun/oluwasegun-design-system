import {
  Layers,
  Box,
  CircleDot,
  Timer,
  Puzzle,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV = [
  { icon: Layers, label: 'Shadows' },
  { icon: Box, label: 'Elevation' },
  { icon: CircleDot, label: 'Border Radius' },
  { icon: Timer, label: 'Motion', badge: 'Soon' },
  { icon: Puzzle, label: 'Components' },
];

const CHECKS = [
  { label: 'Color', done: true },
  { label: 'Typography', done: false },
  { label: 'Spacing', done: false },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className="flex h-full w-[220px] shrink-0 flex-col border-r"
      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex-1 overflow-y-auto p-3">
        {/* Nav */}
        <div className="mb-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            System
          </p>
          <div className="flex flex-col gap-0.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = activeTab === 'color-builder' && item.label === 'Shadows';
              return (
                <button
                  key={item.label}
                  disabled={!!item.badge}
                  onClick={() => onTabChange(item.label.toLowerCase().replace(' ', '-'))}
                  className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[12px] font-medium transition-colors"
                  style={{
                    color: active ? 'var(--primary)' : item.badge ? 'var(--text-tertiary)' : 'var(--text-secondary)',
                    background: active ? 'var(--primary-subtle)' : 'transparent',
                    cursor: item.badge ? 'not-allowed' : 'pointer',
                    opacity: item.badge ? 0.5 : 1,
                  }}
                >
                  <Icon size={14} strokeWidth={1.8} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded border px-1.5 py-px text-[9px] font-semibold uppercase" style={{ borderColor: 'var(--border)', color: 'var(--text-tertiary)' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Progress
          </p>
          <div className="flex flex-col gap-1.5 px-2">
            {CHECKS.map((c) => (
              <label key={c.label} className="flex items-center gap-2 text-[12px] font-medium" style={{ color: c.done ? 'var(--text)' : 'var(--text-secondary)' }}>
                <div
                  className="flex items-center justify-center rounded"
                  style={{
                    width: 16,
                    height: 16,
                    background: c.done ? 'var(--primary)' : 'transparent',
                    border: c.done ? 'none' : '1.5px solid var(--border)',
                  }}
                >
                  {c.done && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {c.label}
              </label>
            ))}
          </div>
        </div>

        {/* History */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            History
          </p>
          <p className="px-2 text-[11px] italic" style={{ color: 'var(--text-tertiary)' }}>
            No saves yet
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="p-3">
        <button
          className="flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--text)' }}
        >
          <Plus size={14} strokeWidth={2.2} />
          New Project
        </button>
      </div>
    </aside>
  );
}
