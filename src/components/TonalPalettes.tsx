import { useState } from 'react';
import { Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';
import type { KeyColorDefinition, ToneOutput } from '../types/color.types';

interface TonalPalettesProps {
  keyColors: KeyColorDefinition[];
  tonalPalettes: Record<string, ToneOutput[]>;
}

export function TonalPalettes({
  keyColors,
  tonalPalettes,
}: TonalPalettesProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <section
      className="rounded-xl p-5"
      style={{
        background: 'var(--ods-surface)',
        border: '1px solid var(--ods-border-subtle)',
        boxShadow: 'var(--ods-shadow-sm)',
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="text-[14px] font-semibold"
            style={{ color: 'var(--ods-text)' }}
          >
            Tonal Palettes
          </h3>
          <p
            className="mt-0.5 text-[12px]"
            style={{ color: 'var(--ods-text-tertiary)' }}
          >
            Generated using HCT color science. Tone 0 is black, 100 is white.
          </p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center rounded-lg transition-all duration-150 hover:opacity-60"
          style={{
            width: 32,
            height: 32,
            color: 'var(--ods-text-tertiary)',
            background: 'var(--ods-surface-secondary)',
            border: '1px solid var(--ods-border-subtle)',
          }}
        >
          {collapsed ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
        </button>
      </div>

      {/* Strips */}
      {!collapsed && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {keyColors.map((kc) => {
            const tones = tonalPalettes[kc.id];
            if (!tones) return null;
            return (
              <div key={kc.id} className="flex flex-col gap-2">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: 'var(--ods-text-tertiary)' }}
                >
                  {kc.label}
                </span>

                {/* Swatch strip */}
                <div className="flex gap-px overflow-hidden rounded-lg">
                  {tones.map((t) => {
                    const uid = `${kc.id}-${t.tone}`;
                    const textLight = t.tone >= 50;
                    return (
                      <button
                        key={uid}
                        onClick={() => handleCopy(t.hex, uid)}
                        className="group relative flex flex-1 items-center justify-center transition-all duration-150 hover:flex-[2.5] hover:z-10 hover:shadow-lg"
                        style={{
                          backgroundColor: t.hex,
                          minHeight: 48,
                        }}
                        title={`${t.tone} — ${t.hex}`}
                      >
                        {/* Tone label (visible on hover) */}
                        <span
                          className="text-[9px] font-bold opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                          style={{
                            color: textLight ? '#000' : '#fff',
                            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                          }}
                        >
                          {t.tone}
                        </span>

                        {/* Tooltip */}
                        <span
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-medium opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-20"
                          style={{
                            background: 'var(--ods-text)',
                            color: 'var(--ods-text-inverse)',
                          }}
                        >
                          {copied === uid ? (
                            <Check
                              size={10}
                              className="mr-1 inline"
                              style={{ color: 'var(--ods-success)' }}
                            />
                          ) : (
                            <Copy size={10} className="mr-1 inline opacity-50" />
                          )}
                          {t.hex}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Tone labels row */}
                <div className="flex gap-px">
                  {tones.map((t) => (
                    <span
                      key={`lbl-${kc.id}-${t.tone}`}
                      className="flex-1 text-center text-[8px]"
                      style={{
                        color: 'var(--ods-text-tertiary)',
                        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                      }}
                    >
                      {t.tone}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
