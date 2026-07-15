import {
  Layers,
  Box,
  Circle,
  Clock,
  Puzzle,
  Plus,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { icon: Layers, label: 'Shadows', disabled: false },
  { icon: Box, label: 'Elevation', disabled: false },
  { icon: Circle, label: 'Border Radius', disabled: false },
  { icon: Clock, label: 'Motion', disabled: true, badge: 'SOON' },
  { icon: Puzzle, label: 'Components', disabled: false },
];

const PROGRESS_ITEMS = ['Color', 'Typography', 'Spacing'];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className="flex h-full w-[260px] shrink-0 flex-col overflow-y-auto border-r"
      style={{
        background: 'var(--matisse-surface)',
        borderColor: 'var(--matisse-border-light)',
      }}
    >
      {/* Navigation Section */}
      <div className="p-3">
        <div
          className="rounded-2xl p-2"
          style={{
            background: 'var(--matisse-surface-raised)',
            border: '1px solid var(--matisse-border-light)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === 'color-builder' && item.label === 'Shadows';
            return (
              <button
                key={item.label}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) onTabChange(item.label.toLowerCase().replace(' ', '-'));
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                  item.disabled
                    ? 'cursor-not-allowed opacity-40'
                    : 'hover:opacity-80'
                }`}
                style={{
                  color: isActive ? 'var(--matisse-purple)' : 'var(--matisse-text-secondary)',
                  background: isActive ? 'var(--matisse-surface)' : 'transparent',
                  boxShadow: isActive ? 'var(--matisse-shadow-sm)' : 'none',
                }}
              >
                <Icon size={17} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'var(--matisse-surface)',
                      color: 'var(--matisse-text-muted)',
                      border: '1px solid var(--matisse-border)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-3 pb-2">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'var(--matisse-surface-raised)',
            border: '1px solid var(--matisse-border-light)',
          }}
        >
          <h4
            className="mb-3 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--matisse-text-muted)' }}
          >
            Progress
          </h4>
          <div className="flex flex-col gap-2.5">
            {PROGRESS_ITEMS.map((item) => {
              const isChecked = item === 'Color';
              return (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-2.5 text-sm font-medium"
                  style={{ color: 'var(--matisse-text-secondary)' }}
                >
                  <div
                    className="flex h-[18px] w-[18px] items-center justify-center rounded-md transition-all"
                    style={{
                      background: isChecked ? 'var(--matisse-purple)' : 'transparent',
                      border: isChecked ? 'none' : '1.5px solid var(--matisse-border)',
                    }}
                  >
                    {isChecked && (
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
                  {item}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="px-3 pb-2">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'var(--matisse-surface-raised)',
            border: '1px solid var(--matisse-border-light)',
          }}
        >
          <h4
            className="mb-3 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'var(--matisse-text-muted)' }}
          >
            History
          </h4>
          <p
            className="text-xs italic"
            style={{ color: 'var(--matisse-text-muted)' }}
          >
            No saves yet
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* New Project Button */}
      <div className="p-3">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'var(--matisse-black)' }}
        >
          <Plus size={16} />
          New Project
        </button>
      </div>
    </aside>
  );
}
