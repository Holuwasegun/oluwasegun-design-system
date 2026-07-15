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

const PROGRESS_ITEMS = [
  { label: 'Color', checked: true },
  { label: 'Typography', checked: false },
  { label: 'Spacing', checked: false },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <h4
      className="mb-3 text-[10px] font-bold uppercase tracking-[0.1em]"
      style={{ color: 'var(--ods-text-tertiary)' }}
    >
      {title}
    </h4>
  );
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className="flex h-full shrink-0 flex-col overflow-y-auto border-r"
      style={{
        width: 'var(--ods-sidebar-w)',
        background: 'var(--ods-surface)',
        borderColor: 'var(--ods-border-subtle)',
      }}
    >
      {/* Navigation */}
      <div className="p-3">
        <div
          className="flex flex-col gap-0.5 rounded-xl p-1.5"
          style={{
            background: 'var(--ods-surface-secondary)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeTab === 'color-builder' && item.label === 'Shadows';
            return (
              <button
                key={item.label}
                disabled={item.disabled}
                onClick={() => {
                  if (!item.disabled) {
                    onTabChange(item.label.toLowerCase().replace(' ', '-'));
                  }
                }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-150"
                style={{
                  color: isActive
                    ? 'var(--ods-primary)'
                    : item.disabled
                    ? 'var(--ods-text-tertiary)'
                    : 'var(--ods-text-secondary)',
                  background: isActive ? 'var(--ods-surface)' : 'transparent',
                  boxShadow: isActive ? 'var(--ods-shadow-xs)' : 'none',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.45 : 1,
                }}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'var(--ods-surface)',
                      color: 'var(--ods-text-tertiary)',
                      border: '1px solid var(--ods-border)',
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

      {/* Progress */}
      <div className="px-3 pb-3">
        <div
          className="rounded-xl p-4"
          style={{
            background: 'var(--ods-surface-secondary)',
          }}
        >
          <SectionHeader title="Progress" />
          <div className="flex flex-col gap-3">
            {PROGRESS_ITEMS.map((item) => (
              <label
                key={item.label}
                className="flex cursor-pointer items-center gap-3 text-[13px] font-medium"
                style={{
                  color: item.checked
                    ? 'var(--ods-text)'
                    : 'var(--ods-text-secondary)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded transition-all duration-150"
                  style={{
                    width: 18,
                    height: 18,
                    background: item.checked
                      ? 'var(--ods-primary)'
                      : 'transparent',
                    border: item.checked
                      ? 'none'
                      : '1.5px solid var(--ods-border)',
                  }}
                >
                  {item.checked && (
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
                {item.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="px-3 pb-3">
        <div
          className="rounded-xl p-4"
          style={{ background: 'var(--ods-surface-secondary)' }}
        >
          <SectionHeader title="History" />
          <p
            className="text-[12px] italic"
            style={{ color: 'var(--ods-text-tertiary)' }}
          >
            No saves yet
          </p>
        </div>
      </div>

      <div className="flex-1" />

      {/* CTA */}
      <div className="p-3">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'var(--ods-text)' }}
        >
          <Plus size={16} strokeWidth={2.2} />
          New Project
        </button>
      </div>
    </aside>
  );
}
