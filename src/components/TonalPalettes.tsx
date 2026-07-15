import { useState } from 'react';
import { Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';
import type { KeyColorDefinition, ToneOutput } from '../types/color.types';

interface TonalPalettesProps {
  keyColors: KeyColorDefinition[];
  tonalPalettes: Record<string, ToneOutput[]>;
}

export function TonalPalettes({ keyColors, tonalPalettes }: TonalPalettesProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const handleCopy = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div
      className="rounded-2xl p-5 transition-all"
      style={{
        background: 'var(--matisse-surface)',
        border: '1px solid var(--matisse-border-light)',
        boxShadow: 'var(--matisse-shadow-sm)',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3
            className="text-sm font-semibold"
            style={{ color: 'var(--matisse-text)' }}
          >
            Tonal Palettes
          </h3>
          <p
            className="mt-0.5 text-xs"
            style={{ color: 'var(--matisse-text-muted)' }}
          >
            Automatically generated using HCT color science. Tone 0 is black, 100 is white.
          </p>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-all hover:opacity-80"
          style={{
            color: 'var(--matisse-text-muted)',
            background: 'var(--matisse-surface-raised)',
          }}
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div className="flex flex-col gap-5 animate-fadeIn">
          {keyColors.map((kc) => {
            const tones = tonalPalettes[kc.id];
            if (!tones) return null;
            return (
              <div key={kc.id} className="flex flex-col gap-1.5">
                <span
                  className="px-1 text-xs font-medium"
                  style={{ color: 'var(--matisse-text-muted)' }}
                >
                  {kc.label}
                </span>
                <div className="flex gap-px overflow-hidden rounded-xl">
                  {tones.map((t) => {
                    const uid = `${kc.id}-${t.tone}`;
                    const textColor = t.tone >= 50 ? '#000000' : '#ffffff';
                    return (
                      <button
                        key={uid}
                        onClick={() => handleCopy(t.hex, uid)}
                        className="group relative flex flex-1 items-center justify-center transition-all hover:flex-[2] hover:z-10 hover:scale-y-110 hover:shadow-lg"
                        style={{ backgroundColor: t.hex, minHeight: 52 }}
                        title={`${t.tone} - ${t.hex}`}
                      >
                        <span
                          className="text-[9px] font-mono font-semibold opacity-0 transition-opacity group-hover:opacity-100"
                          style={{ color: textColor }}
                        >
                          {t.tone}
                        </span>
                        <span
                          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-[10px] font-mono opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-20"
                          style={{
                            background: 'var(--matisse-black)',
                            color: '#ffffff',
                          }}
                        >
                          {copied === uid ? (
                            <Check size={10} className="mr-1 inline" style={{ color: 'var(--matisse-success)' }} />
                          ) : (
                            <Copy size={10} className="mr-1 inline opacity-60" />
                          )}
                          {t.hex}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-px px-0.5">
                  {tones.map((t) => (
                    <span
                      key={`lbl-${kc.id}-${t.tone}`}
                      className="flex-1 text-center text-[8px] font-mono"
                      style={{ color: 'var(--matisse-text-muted)' }}
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
    </div>
  );
}
