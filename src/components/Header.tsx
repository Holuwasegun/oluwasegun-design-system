import { useState } from 'react';
import {
  Save,
  Upload,
  Bell,
  Pencil,
} from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
  const [projectName, setProjectName] = useState('Untitled Project');
  const [editing, setEditing] = useState(false);

  return (
    <header
      className="flex h-[60px] shrink-0 items-center justify-between border-b px-5"
      style={{
        background: 'var(--matisse-surface)',
        borderColor: 'var(--matisse-border-light)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: 'var(--matisse-purple)' }}
          >
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[15px] font-bold tracking-tight"
              style={{ color: 'var(--matisse-text)' }}
            >
              Matisse
            </span>
            <span
              className="text-[9px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--matisse-text-muted)' }}
            >
              Design System Generator
            </span>
          </div>
        </div>

        <div className="h-6 w-px mx-1" style={{ background: 'var(--matisse-border)' }} />

        {editing ? (
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
            autoFocus
            className="h-8 w-52 text-sm font-medium"
            style={{
              background: 'var(--matisse-surface-raised)',
              borderColor: 'var(--matisse-purple)',
            }}
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-colors hover:opacity-80"
            style={{ color: 'var(--matisse-text-secondary)' }}
          >
            <span className="text-sm font-medium">{projectName}</span>
            <Pencil size={12} style={{ color: 'var(--matisse-text-muted)' }} />
          </button>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <button
          className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all hover:opacity-80 active:scale-[0.97]"
          style={{
            color: 'var(--matisse-text-secondary)',
            background: 'transparent',
          }}
        >
          <Save size={14} />
          Save
        </button>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
          style={{ background: 'var(--matisse-purple)' }}
        >
          <Upload size={14} />
          Export
        </button>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
          style={{
            border: '1.5px solid var(--matisse-border)',
            color: 'var(--matisse-text-secondary)',
          }}
        >
          <Bell size={16} />
          <span
            className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: 'var(--matisse-badge-red)' }}
          >
            3
          </span>
        </button>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: 'var(--matisse-purple)' }}
        >
          O
        </div>
      </div>
    </header>
  );
}
