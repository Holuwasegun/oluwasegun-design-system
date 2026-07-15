import { useState } from 'react';
import { Save, Upload, Bell } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
  const [projectName, setProjectName] = useState('Untitled Project');

  return (
    <header
      className="flex items-center justify-between border-b px-5"
      style={{ height: 48, background: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-md text-[11px] font-bold text-white"
            style={{ width: 26, height: 26, background: 'var(--primary)' }}
          >
            O
          </div>
          <span className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            Oluwasegun Design System
          </span>
        </div>
        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="h-7 text-[13px] font-medium"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', padding: '0 4px', width: 160 }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Save size={14} />
          Save
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--primary)' }}
        >
          <Upload size={13} />
          Export
        </button>
        <button
          className="relative flex items-center justify-center rounded-md transition-colors hover:bg-[var(--surface-hover)]"
          style={{ width: 32, height: 32, color: 'var(--text-tertiary)' }}
        >
          <Bell size={15} />
          <span
            className="absolute flex items-center justify-center rounded-full text-[8px] font-bold text-white"
            style={{ width: 14, height: 14, top: 2, right: 2, background: 'var(--red)' }}
          >
            3
          </span>
        </button>
        <div
          className="flex items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{ width: 28, height: 28, background: 'var(--primary)' }}
        >
          O
        </div>
      </div>
    </header>
  );
}
