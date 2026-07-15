import { useState } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface PreviewProps {
  keyColors: KeyColorDefinition[];
}

const PRESETS = ['Auth Login Form', 'Dashboard Card', 'Settings Panel'];

export function Preview({ keyColors }: PreviewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [presetOpen, setPresetOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);

  const primary = keyColors.find((k) => k.id === 'primary')?.hex || '#6366F1';

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3
          className="text-[14px] font-semibold"
          style={{ color: 'var(--ods-text)' }}
        >
          Component Preview
        </h3>
        <div className="relative">
          <button
            onClick={() => setPresetOpen(!presetOpen)}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-150 hover:opacity-70"
            style={{
              border: '1px solid var(--ods-border)',
              color: 'var(--ods-text-secondary)',
              background: 'var(--ods-surface)',
            }}
          >
            Preset: {selectedPreset}
            <ChevronDown size={13} />
          </button>

          {presetOpen && (
            <div
              className="absolute right-0 top-full z-30 mt-1 w-52 overflow-hidden rounded-lg py-1 animate-fadeIn"
              style={{
                background: 'var(--ods-surface)',
                border: '1px solid var(--ods-border-subtle)',
                boxShadow: 'var(--ods-shadow-lg)',
              }}
            >
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPreset(p);
                    setPresetOpen(false);
                  }}
                  className="flex w-full items-center px-3.5 py-2.5 text-left text-[12px] font-medium transition-colors duration-100"
                  style={{
                    color:
                      p === selectedPreset
                        ? 'var(--ods-primary)'
                        : 'var(--ods-text-secondary)',
                    background:
                      p === selectedPreset
                        ? 'var(--ods-primary-light)'
                        : 'transparent',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview canvas */}
      <div
        className="flex min-h-[520px] items-center justify-center rounded-xl p-10"
        style={{
          background: 'var(--ods-surface-inset)',
          border: '1px solid var(--ods-border-subtle)',
        }}
      >
        {/* Login card */}
        <div
          className="w-full max-w-[400px] rounded-xl p-8"
          style={{
            background: 'var(--ods-surface)',
            boxShadow: 'var(--ods-shadow-xl)',
            border: '1px solid var(--ods-border-subtle)',
          }}
        >
          {/* Brand mark */}
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-4 flex items-center justify-center rounded-xl"
              style={{
                width: 48,
                height: 48,
                background: primary,
              }}
            >
              <span className="text-lg font-extrabold text-white">O</span>
            </div>
            <h2
              className="text-[22px] font-bold tracking-[-0.01em]"
              style={{ color: primary }}
            >
              Welcome back
            </h2>
            <p
              className="mt-1 text-[13px]"
              style={{ color: 'var(--ods-text-tertiary)' }}
            >
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                className="mb-1.5 block text-[12px] font-semibold"
                style={{ color: 'var(--ods-text-secondary)' }}
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full"
                style={{
                  background: 'var(--ods-surface-secondary)',
                  borderColor: 'var(--ods-border)',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  className="text-[12px] font-semibold"
                  style={{ color: 'var(--ods-text-secondary)' }}
                >
                  Password
                </label>
                <button
                  className="text-[12px] font-medium transition-opacity hover:opacity-70"
                  style={{ color: primary }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pr-10"
                  style={{
                    background: 'var(--ods-surface-secondary)',
                    borderColor: 'var(--ods-border)',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-50"
                  style={{ color: 'var(--ods-text-tertiary)' }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="mt-1 w-full rounded-lg py-2.5 text-[13px] font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ background: primary }}
            >
              Sign in
            </button>

            {/* Footer */}
            <p
              className="mt-1 text-center text-[12px]"
              style={{ color: 'var(--ods-text-tertiary)' }}
            >
              Don't have an account?{' '}
              <span
                className="cursor-pointer font-semibold transition-opacity hover:opacity-70"
                style={{ color: primary }}
              >
                Get started
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
