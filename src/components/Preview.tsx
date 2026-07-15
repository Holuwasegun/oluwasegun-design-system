import { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface Props {
  keyColors: KeyColorDefinition[];
}

const PRESETS = ['Auth Login Form', 'Dashboard Card', 'Settings Panel'];

export function Preview({ keyColors }: Props) {
  const [showPw, setShowPw] = useState(false);
  const [presetOpen, setPresetOpen] = useState(false);
  const [preset, setPreset] = useState(PRESETS[0]);
  const primary = keyColors.find((k) => k.id === 'primary')?.hex || '#6D28D9';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>Component Preview</h3>
        <div className="relative">
          <button onClick={() => setPresetOpen(!presetOpen)}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            Preset: {preset} <ChevronDown size={12} />
          </button>
          {presetOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-md py-0.5 shadow-md" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              {PRESETS.map((p) => (
                <button key={p} onClick={() => { setPreset(p); setPresetOpen(false); }}
                  className="flex w-full items-center px-3 py-2 text-left text-[12px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
                  style={{ color: p === preset ? 'var(--primary)' : 'var(--text-secondary)' }}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex min-h-[480px] items-center justify-center rounded-lg p-10" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-light)' }}>
        {/* Login card */}
        <div className="w-full max-w-[380px] rounded-lg p-7 shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border-light)' }}>
          <div className="mb-5 text-center">
            <div className="mx-auto mb-3 flex items-center justify-center rounded-lg text-sm font-bold text-white" style={{ width: 40, height: 40, background: primary }}>O</div>
            <h2 className="text-[20px] font-bold" style={{ color: primary }}>Welcome back</h2>
            <p className="mt-0.5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>Sign in to continue to your dashboard</p>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>Email address</label>
              <input type="email" placeholder="you@company.com" className="w-full" />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-[11px] font-semibold" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <button className="text-[11px] font-medium transition-opacity hover:opacity-70" style={{ color: primary }}>Forgot?</button>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} placeholder="Enter password" className="w-full pr-8" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <button className="mt-1 w-full rounded-md py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: primary }}>
              Sign in
            </button>
            <p className="text-center text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
              Don't have an account? <span className="font-semibold cursor-pointer" style={{ color: primary }}>Get started</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
