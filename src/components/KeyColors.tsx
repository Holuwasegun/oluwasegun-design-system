import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface Props {
  keyColors: KeyColorDefinition[];
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

export function KeyColors({ keyColors, onUpdate, onAdd, onRemove }: Props) {
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newHex, setNewHex] = useState('#546e7a');

  const handleAdd = () => {
    if (newLabel.trim()) {
      onAdd(newLabel.trim(), newHex);
      setNewLabel('');
      setNewHex('#546e7a');
      setShowAdd(false);
    }
  };

  return (
    <section
      className="rounded-lg p-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
          Key Colors
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-[var(--surface-hover)]"
          style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 flex flex-col gap-2 rounded-md p-3" style={{ background: 'var(--surface-hover)' }}>
          <input type="text" placeholder="Label" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} className="w-full" />
          <div className="flex items-center gap-2">
            <input type="color" value={newHex} onChange={(e) => setNewHex(e.target.value)} />
            <input type="text" value={newHex} onChange={(e) => setNewHex(e.target.value)} className="flex-1" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="flex-1 rounded-md py-1.5 text-[11px] font-semibold text-white" style={{ background: 'var(--primary)' }}>
              Add
            </button>
            <button onClick={() => setShowAdd(false)} className="rounded-md px-3 py-1.5 text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2.5">
        {keyColors.map((kc) => (
          <div
            key={kc.id}
            className="group relative flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[var(--surface-hover)]"
            style={{ border: '1px solid var(--border-light)' }}
          >
            {kc.isCustom && (
              <button
                onClick={() => onRemove(kc.id)}
                className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full text-white opacity-0 group-hover:opacity-100"
                style={{ width: 16, height: 16, background: 'var(--red)', fontSize: 9 }}
              >
                <X size={9} strokeWidth={2.5} />
              </button>
            )}
            <input type="color" value={kc.hex} onChange={(e) => onUpdate(kc.id, e.target.value)} className="cursor-pointer" />
            <span className="text-[11px] font-medium" style={{ color: 'var(--text)' }}>{kc.label}</span>
            <input
              type="text"
              value={kc.hex}
              onChange={(e) => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) onUpdate(kc.id, e.target.value); }}
              onBlur={(e) => { if (!/^#[0-9a-fA-F]{6}$/.test(e.target.value)) onUpdate(kc.id, kc.hex); }}
              className="w-full text-center text-[10px]"
              style={{ fontFamily: 'monospace', color: 'var(--text-tertiary)', background: 'var(--surface)', borderColor: 'var(--border-light)' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
