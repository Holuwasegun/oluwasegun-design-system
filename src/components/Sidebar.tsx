import {
  Palette,
  Type,
  Grid3X3,
  Layers,
  Box,
  CircleDot,
  Timer,
  Puzzle,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const FEATURES = [
  { icon: Palette, label: 'Color', id: 'color' },
  { icon: Type, label: 'Typography', id: 'typography' },
  { icon: Grid3X3, label: 'Spacing', id: 'spacing' },
  { icon: Layers, label: 'Shadows', id: 'shadows' },
  { icon: Box, label: 'Elevation', id: 'elevation' },
  { icon: CircleDot, label: 'Border Radius', id: 'border-radius' },
  { icon: Timer, label: 'Motion', id: 'motion', badge: 'SOON' },
  { icon: Puzzle, label: 'Components', id: 'components' },
];

const PROGRESS = [
  { label: 'Color', done: true },
  { label: 'Typography', done: false },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className="flex h-full shrink-0 flex-col border-r"
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex-1 overflow-y-auto px-3 pt-5 pb-3">
        {/* Features Section */}
        <div className="mb-6">
          <p
            className="mb-2.5 px-2.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Features
          </p>
          <div className="flex flex-col gap-0.5">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  disabled={!!item.badge}
                  onClick={() => onTabChange(item.id)}
                  className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium transition-all"
                  style={{
                    color: active
                      ? 'var(--primary)'
                      : item.badge
                        ? 'var(--text-tertiary)'
                        : 'var(--text-secondary)',
                    background: active ? 'var(--primary-subtle)' : 'transparent',
                    cursor: item.badge ? 'not-allowed' : 'pointer',
                    opacity: item.badge ? 0.6 : 1,
                  }}
                >
                  <Icon
                    size={16}
                    strokeWidth={active ? 2 : 1.6}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="badge-soon">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress Section */}
        <div>
          <p
            className="mb-2.5 px-2.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Progress
          </p>
          <div className="flex flex-col gap-2 px-2.5">
            {PROGRESS.map((c) => (
              <label
                key={c.label}
                className="flex items-center gap-2.5 text-[13px] font-medium cursor-pointer"
                style={{
                  color: c.done ? 'var(--text)' : 'var(--text-secondary)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded"
                  style={{
                    width: 18,
                    height: 18,
                    background: c.done ? 'var(--primary)' : 'transparent',
                    border: c.done ? 'none' : '2px solid var(--border)',
                    borderRadius: 5,
                    transition: 'all 0.15s',
                  }}
                >
                  {c.done && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {c.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
