import { useState } from 'react';
import { Save, Upload, Bell, Pencil, Check } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

export function Header({ onExport }: HeaderProps) {
  const [projectName, setProjectName] = useState('Untitled Project');
  const [editing, setEditing] = useState(false);

  return (
    <header
      className="flex items-center justify-between border-b px-6"
      style={{
        height: 'var(--ods-header-h)',
        background: 'var(--ods-surface)',
        borderColor: 'var(--ods-border-subtle)',
      }}
    >
      {/* Left cluster */}
      <div className="flex items-center gap-5">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, var(--ods-primary) 0%, var(--ods-primary-dark) 100%)',
            }}
          >
            <span className="text-sm font-extrabold text-white leading-none tracking-tight">
              O
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className="text-[15px] font-bold leading-tight tracking-[-0.01em]"
              style={{ color: 'var(--ods-text)' }}
            >
              Oluwasegun
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.08em] leading-none"
              style={{ color: 'var(--ods-text-tertiary)' }}
            >
              Design System
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-6 w-px"
          style={{ background: 'var(--ods-border)' }}
        />

        {/* Project name */}
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setEditing(false);
              }}
              autoFocus
              className="h-8 w-60 text-sm font-medium"
              style={{ padding: '0 10px' }}
            />
            <button
              onClick={() => setEditing(false)}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              style={{ color: 'var(--ods-success)' }}
            >
              <Check size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors"
            style={{ color: 'var(--ods-text-secondary)' }}
          >
            <span className="text-sm font-medium">{projectName}</span>
            <Pencil
              size={12}
              style={{ color: 'var(--ods-text-tertiary)' }}
            />
          </button>
        )}
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-3">
        {/* Save */}
        <button
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all hover:opacity-70 active:scale-[0.97]"
          style={{ color: 'var(--ods-text-secondary)' }}
        >
          <Save size={15} strokeWidth={1.8} />
          Save
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
          style={{ background: 'var(--ods-primary)' }}
        >
          <Upload size={14} strokeWidth={2} />
          Export
        </button>

        {/* Notification bell */}
        <button
          className="relative flex items-center justify-center rounded-full transition-colors hover:opacity-70"
          style={{
            width: 34,
            height: 34,
            border: '1px solid var(--ods-border)',
            color: 'var(--ods-text-tertiary)',
          }}
        >
          <Bell size={16} strokeWidth={1.8} />
          <span
            className="absolute flex items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{
              width: 16,
              height: 16,
              top: -2,
              right: -2,
              background: 'var(--ods-error)',
            }}
          >
            3
          </span>
        </button>

        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-full text-[13px] font-bold text-white cursor-pointer"
          style={{
            width: 34,
            height: 34,
            background: 'var(--ods-primary)',
          }}
        >
          O
        </div>
      </div>
    </header>
  );
}
