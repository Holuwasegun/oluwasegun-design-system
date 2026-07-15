import { useState, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import { Hct, argbFromHex } from '@material/material-color-utilities';
import type { KeyColorDefinition } from '../types/color.types';

interface Props {
  keyColors: KeyColorDefinition[];
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

function hexToHsl(hex: string): string {
  try {
    const argb = argbFromHex(hex);
    const hct = Hct.fromInt(argb);
    const h = Math.round(hct.hue);
    const c = Math.round(hct.chroma);
    const t = Math.round(hct.tone);
    return `hsl(${h}, ${c}%, ${t}%)`;
  } catch {
    return hex;
  }
}

export function KeyColors({ keyColors, onUpdate, onAdd, onRemove }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newHex, setNewHex] = useState('#546e7a');

  const hslValues = useMemo(() => {
    const map: Record<string, string> = {};
    for (const kc of keyColors) {
      map[kc.id] = hexToHsl(kc.hex);
    }
    return map;
  }, [keyColors]);

  const handleAdd = () => {
    if (newLabel.trim()) {
      onAdd(newLabel.trim(), newHex);
      setNewLabel('');
      setNewHex('#546e7a');
      setShowAdd(false);
    }
  };

  // Show up to 3 key colors per row (matching the Matisse screenshot)
  const mainColors = keyColors.filter(
    (kc) => ['primary', 'secondary', 'tertiary'].includes(kc.id)
  );
  const neutralColors = keyColors.filter(
    (kc) => ['neutral', 'neutralVariant'].includes(kc.id)
  );
  const customColors = keyColors.filter((kc) => kc.isCustom);

  return (
    <section className="section-card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
          Key Colors
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            background: 'var(--surface)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--surface)';
          }}
        >
          <Plus size={13} />
          Add Key Color
        </button>
      </div>

      {showAdd && (
        <div
          className="mb-5 flex flex-col gap-2.5 rounded-lg p-4"
          style={{ background: 'var(--bg)', border: '1px solid var(--border-light)' }}
        >
          <input
            type="text"
            placeholder="Color label (e.g. Brand Blue)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={newHex}
              onChange={(e) => setNewHex(e.target.value)}
            />
            <input
              type="text"
              value={newHex}
              onChange={(e) => setNewHex(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 rounded-lg py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--primary)' }}
            >
              Add Color
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg px-4 py-2 text-[12px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Primary / Secondary / Tertiary row */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {mainColors.map((kc) => (
          <ColorCard
            key={kc.id}
            kc={kc}
            hsl={hslValues[kc.id]}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Neutral / NeutralVariant row */}
      {neutralColors.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-3">
          {neutralColors.map((kc) => (
            <ColorCard
              key={kc.id}
              kc={kc}
              hsl={hslValues[kc.id]}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      {/* Custom colors */}
      {customColors.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {customColors.map((kc) => (
            <ColorCard
              key={kc.id}
              kc={kc}
              hsl={hslValues[kc.id]}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ColorCard({
  kc,
  hsl,
  onUpdate,
  onRemove,
}: {
  kc: KeyColorDefinition;
  hsl: string;
  onUpdate: (id: string, hex: string) => void;
  onRemove: (id: string) => void;
}) {
  // Display label with first letter capitalized and CamelCase split
  const displayLabel = kc.label.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div className="key-color-card group relative">
      {kc.isCustom && (
        <button
          onClick={() => onRemove(kc.id)}
          className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            width: 18,
            height: 18,
            background: 'var(--red)',
            fontSize: 9,
            zIndex: 2,
          }}
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
      {/* Color swatch circle */}
      <label className="cursor-pointer shrink-0 relative">
        <div
          className="rounded-full"
          style={{
            width: 40,
            height: 40,
            backgroundColor: kc.hex,
            boxShadow: `0 2px 8px ${kc.hex}40`,
          }}
        />
        <input
          type="color"
          value={kc.hex}
          onChange={(e) => onUpdate(kc.id, e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          style={{ width: 40, height: 40 }}
        />
      </label>

      {/* Label + HSL */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-semibold mb-1"
          style={{ color: 'var(--text)' }}
        >
          {displayLabel}
        </p>
        <input
          className="hsl-input"
          type="text"
          value={hsl}
          readOnly
        />
      </div>
    </div>
  );
}
