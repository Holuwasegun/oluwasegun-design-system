import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface KeyColorsProps {
  keyColors: KeyColorDefinition[];
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

export function KeyColors({ keyColors, onUpdate, onAdd, onRemove }: KeyColorsProps) {
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
    <div
      className="rounded-2xl p-5 transition-all"
      style={{
        background: 'var(--matisse-surface)',
        border: '1px solid var(--matisse-border-light)',
        boxShadow: 'var(--matisse-shadow-sm)',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--matisse-text)' }}
        >
          Key Colors
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-80 active:scale-[0.97]"
          style={{
            border: '1.5px solid var(--matisse-border)',
            color: 'var(--matisse-text-secondary)',
          }}
        >
          <Plus size={12} />
          Add Key Color
        </button>
      </div>

      {showAdd && (
        <div
          className="mb-4 flex flex-col gap-3 rounded-xl p-4 animate-fadeIn"
          style={{
            background: 'var(--matisse-surface-raised)',
            border: '1px solid var(--matisse-border-light)',
          }}
        >
          <input
            type="text"
            placeholder="Label (e.g. Accent)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full"
          />
          <div className="flex items-center gap-2">
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
              className="flex-1 rounded-lg py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--matisse-purple)' }}
            >
              Add Color
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg px-4 py-2 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: 'var(--matisse-text-muted)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">
        {keyColors.map((kc) => (
          <div
            key={kc.id}
            className="group relative flex flex-col items-center gap-2.5 rounded-xl p-4 transition-all hover:shadow-md"
            style={{
              background: 'var(--matisse-surface-raised)',
              border: '1px solid var(--matisse-border-light)',
            }}
          >
            {kc.isCustom && (
              <button
                onClick={() => onRemove(kc.id)}
                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white opacity-0 transition-all group-hover:opacity-100"
                style={{ background: 'var(--matisse-error)' }}
              >
                <X size={10} />
              </button>
            )}
            <div className="relative">
              <input
                type="color"
                value={kc.hex}
                onChange={(e) => onUpdate(kc.id, e.target.value)}
                className="h-11 w-11 cursor-pointer rounded-xl"
              />
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: 'var(--matisse-text)' }}
            >
              {kc.label}
            </span>
            <input
              type="text"
              value={kc.hex}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                  onUpdate(kc.id, val);
                }
              }}
              onBlur={(e) => {
                if (!/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                  onUpdate(kc.id, kc.hex);
                }
              }}
              className="w-full text-center text-[11px] font-mono"
              style={{
                background: 'var(--matisse-surface)',
                borderColor: 'var(--matisse-border-light)',
                color: 'var(--matisse-text-secondary)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
