import { useState } from 'react';
import { Save, Download, Bell } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
  const [projectName, setProjectName] = useState('Untitled Project');

  return (
    <header
      className="flex items-center justify-between px-5 shrink-0"
      style={{
        height: 'var(--header-height)',
        background: 'var(--text)',
        color: '#fff',
      }}
    >
      {/* Left: Logo + Project Name */}
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-lg font-bold text-white"
            style={{
              width: 30,
              height: 30,
              background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
              fontSize: 14,
            }}
          >
            O
          </div>
          <span className="text-[14px] font-semibold tracking-tight text-white">
            Oluwasegun
          </span>
        </div>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)' }} />
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="h-7 text-[13px] font-medium"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            padding: '0 4px',
            width: 140,
            outline: 'none',
          }}
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12px] font-medium transition-all"
          style={{
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          <Save size={13} />
          Save
        </button>
        <button
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all"
          style={{
            background: 'var(--primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
          }}
        >
          <Download size={13} />
          Export
        </button>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center rounded-lg transition-colors"
          style={{
            width: 34,
            height: 34,
            color: 'rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.05)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          <Bell size={15} />
          <span
            className="absolute flex items-center justify-center rounded-full text-[8px] font-bold text-white"
            style={{
              width: 14,
              height: 14,
              top: 4,
              right: 4,
              background: '#EF4444',
            }}
          >
            3
          </span>
        </button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-full text-[12px] font-bold"
          style={{
            width: 30,
            height: 30,
            background: 'linear-gradient(135deg, #F97316, #EF4444)',
            color: '#fff',
          }}
        >
          O
        </div>
      </div>
    </header>
  );
}
