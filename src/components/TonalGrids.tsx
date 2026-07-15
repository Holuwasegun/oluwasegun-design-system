import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { KeyColorDefinition, ToneOutput } from '../types/color.types';

interface TonalGridsProps {
  keyColors: KeyColorDefinition[];
  tonalPalettes: Record<string, ToneOutput[]>;
}

export function TonalGrids({ keyColors, tonalPalettes }: TonalGridsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ods-text-muted)]">
        Tonal Palettes
      </h3>
      {keyColors.map((kc) => {
        const tones = tonalPalettes[kc.id];
        if (!tones) return null;
        return (
          <div key={kc.id} className="flex flex-col gap-1.5">
            <span className="px-1 text-xs font-medium text-[var(--ods-text-muted)]">
              {kc.label}
            </span>
            <div className="flex gap-0.5 rounded-xl overflow-hidden">
              {tones.map((t) => {
                const uniqueId = `${kc.id}-${t.tone}`;
                const textColor =
                  t.tone > 50 ? '#000000' : '#ffffff';
                return (
                  <button
                    key={uniqueId}
                    onClick={() => handleCopy(t.hex, uniqueId)}
                    className="group relative flex flex-1 items-center justify-center transition-all hover:flex-[2] hover:z-10"
                    style={{ backgroundColor: t.hex, minHeight: 56 }}
                    title={`${t.tone} - ${t.hex}`}
                  >
                    <span
                      className="text-[9px] font-mono font-medium opacity-0 transition-opacity group-hover:opacity-100"
                      style={{ color: textColor }}
                    >
                      {t.tone}
                    </span>
                    <span
                      className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-mono text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    >
                      {copied === uniqueId ? (
                        <Check size={10} className="inline text-green-400" />
                      ) : (
                        <Copy size={10} className="inline opacity-60" />
                      )}{' '}
                      {t.hex}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-0.5 px-1">
              {tones.map((t) => (
                <span
                  key={`label-${kc.id}-${t.tone}`}
                  className="flex-1 text-center text-[8px] text-[var(--ods-text-muted)]"
                >
                  {t.tone}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
