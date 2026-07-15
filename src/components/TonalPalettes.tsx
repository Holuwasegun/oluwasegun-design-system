import { useState } from 'react';
import { Copy, Check, ChevronUp, ChevronDown } from 'lucide-react';
import type { KeyColorDefinition, ToneOutput } from '../types/color.types';

interface Props {
  keyColors: KeyColorDefinition[];
  tonalPalettes: Record<string, ToneOutput[]>;
}

export function TonalPalettes({ keyColors, tonalPalettes }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  const copy = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1200);
    });
  };

  return (
    <section className="section-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
            Tonal Palettes
          </h3>
          <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            Automatically generated using HCT color science. Tone 0 is black, 100 is white.
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-1.5 transition-colors hover:bg-[var(--surface-hover)]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-5">
          {keyColors.map((kc) => {
            const tones = tonalPalettes[kc.id];
            if (!tones) return null;
            return (
              <div key={kc.id}>
                <p
                  className="mb-2 text-[12px] font-semibold"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {kc.label}
                </p>
                <div className="flex gap-px overflow-hidden rounded-lg">
                  {tones.map((t) => {
                    const uid = `${kc.id}-${t.tone}`;
                    const light = t.tone >= 50;
                    return (
                      <button
                        key={uid}
                        onClick={() => copy(t.hex, uid)}
                        className="group relative flex flex-1 items-center justify-center transition-all hover:flex-[2] hover:z-10"
                        style={{ backgroundColor: t.hex, minHeight: 40 }}
                        title={`Tone ${t.tone} — ${t.hex}`}
                      >
                        <span
                          className="text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            color: light ? '#000' : '#fff',
                            fontFamily: 'monospace',
                          }}
                        >
                          {t.tone}
                        </span>
                        <span
                          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[9px] font-medium opacity-0 group-hover:opacity-100 z-20"
                          style={{
                            background: 'var(--text)',
                            color: '#fff',
                            fontFamily: 'monospace',
                            boxShadow: 'var(--shadow-md)',
                          }}
                        >
                          {copied === uid ? (
                            <Check size={9} className="mr-0.5 inline text-green-400" />
                          ) : (
                            <Copy size={9} className="mr-0.5 inline opacity-40" />
                          )}
                          {t.hex}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-px mt-1">
                  {tones.map((t) => (
                    <span
                      key={`l-${kc.id}-${t.tone}`}
                      className="flex-1 text-center text-[7px]"
                      style={{
                        color: 'var(--text-tertiary)',
                        fontFamily: 'monospace',
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
