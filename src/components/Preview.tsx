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

  const primaryHex = keyColors.find((k) => k.id === 'primary')?.hex || '#6750a4';
  const primaryLight = keyColors.find((k) => k.id === 'primary')?.hex || '#EDE9FF';

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      {/* Preset Selector */}
      <div className="flex items-center justify-between">
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--matisse-text)' }}
        >
          Component Preview
        </h3>
        <div className="relative">
          <button
            onClick={() => setPresetOpen(!presetOpen)}
            className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all hover:opacity-80"
            style={{
              background: 'var(--matisse-surface-raised)',
              border: '1.5px solid var(--matisse-border)',
              color: 'var(--matisse-text-secondary)',
            }}
          >
            Preset: {selectedPreset}
            <ChevronDown size={14} />
          </button>
          {presetOpen && (
            <div
              className="absolute right-0 top-full z-20 mt-1 w-52 overflow-hidden rounded-xl py-1 animate-fadeIn"
              style={{
                background: 'var(--matisse-surface)',
                border: '1px solid var(--matisse-border-light)',
                boxShadow: 'var(--matisse-shadow-lg)',
              }}
            >
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPreset(p);
                    setPresetOpen(false);
                  }}
                  className="flex w-full items-center px-3.5 py-2.5 text-left text-xs font-medium transition-colors hover:opacity-80"
                  style={{
                    color:
                      p === selectedPreset
                        ? 'var(--matisse-purple)'
                        : 'var(--matisse-text-secondary)',
                    background:
                      p === selectedPreset
                        ? 'var(--matisse-purple-light)'
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

      {/* Preview Canvas */}
      <div
        className="flex min-h-[500px] items-center justify-center rounded-2xl p-8"
        style={{
          background: '#F0F0F5',
          border: '1px solid var(--matisse-border-light)',
        }}
      >
        {/* Login Card */}
        <div
          className="w-full max-w-md rounded-2xl p-8"
          style={{
            background: 'var(--matisse-surface)',
            boxShadow: 'var(--matisse-shadow-lg)',
            border: '1px solid var(--matisse-border-light)',
          }}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: primaryLight }}
            >
              <div
                className="h-6 w-6 rounded-lg"
                style={{ background: primaryHex }}
              />
            </div>
            <h2
              className="text-2xl font-bold"
              style={{ color: primaryHex }}
            >
              Welcome back
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: 'var(--matisse-text-muted)' }}
            >
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold"
                style={{ color: 'var(--matisse-text-secondary)' }}
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full"
                style={{
                  background: 'var(--matisse-surface-raised)',
                  borderColor: 'var(--matisse-border)',
                }}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  className="text-xs font-semibold"
                  style={{ color: 'var(--matisse-text-secondary)' }}
                >
                  Password
                </label>
                <button
                  className="text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: primaryHex }}
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
                    background: 'var(--matisse-surface-raised)',
                    borderColor: 'var(--matisse-border)',
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: 'var(--matisse-text-muted)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              className="mt-2 w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: primaryHex }}
            >
              Sign in
            </button>

            <p
              className="mt-2 text-center text-xs"
              style={{ color: 'var(--matisse-text-muted)' }}
            >
              Don't have an account?{' '}
              <span
                className="font-semibold transition-opacity hover:opacity-80 cursor-pointer"
                style={{ color: primaryHex }}
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
