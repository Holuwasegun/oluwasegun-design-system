import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface KeyColorsProps {
  keyColors: KeyColorDefinition[];
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

export function KeyColors({
  keyColors,
  onUpdate,
  onAdd,
  onRemove,
}: KeyColorsProps) {
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
            Key Colors
          </h3>
          <p
            className="mt-0.5 text-[12px]"
            style={{ color: 'var(--ods-text-tertiary)' }}
          >
            Foundation colors for your design system palette
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all duration-150 hover:opacity-70 active:scale-[0.97]"
          style={{
            border: '1px solid var(--ods-border)',
            color: 'var(--ods-text-secondary)',
          }}
        >
          <Plus size={13} strokeWidth={2} />
          Add Key Color
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div
          className="mb-5 flex flex-col gap-3 rounded-lg p-4 animate-fadeIn"
          style={{
            background: 'var(--ods-surface-secondary)',
            border: '1px solid var(--ods-border-subtle)',
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
              className="flex-1 rounded-lg py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--ods-primary)' }}
            >
              Add Color
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg px-4 py-2 text-[12px] font-medium transition-opacity hover:opacity-60"
              style={{ color: 'var(--ods-text-tertiary)' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Color cards grid */}
      <div className="grid grid-cols-5 gap-3">
        {keyColors.map((kc) => (
          <div
            key={kc.id}
            className="group relative flex flex-col items-center gap-3 rounded-xl p-4 transition-all duration-150 hover:shadow-md"
            style={{
              background: 'var(--ods-surface-secondary)',
              border: '1px solid var(--ods-border-subtle)',
            }}
          >
            {/* Remove button (custom only) */}
            {kc.isCustom && (
              <button
                onClick={() => onRemove(kc.id)}
                className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white opacity-0 transition-all duration-150 group-hover:opacity-100"
                style={{
                  width: 20,
                  height: 20,
                  background: 'var(--ods-error)',
                }}
              >
                <X size={10} strokeWidth={2.5} />
              </button>
            )}

            {/* Color swatch */}
            <div className="relative">
              <input
                type="color"
                value={kc.hex}
                onChange={(e) => onUpdate(kc.id, e.target.value)}
                className="cursor-pointer"
                style={{ width: 44, height: 44 }}
              />
            </div>

            {/* Label */}
            <span
              className="text-[12px] font-semibold"
              style={{ color: 'var(--ods-text)' }}
            >
              {kc.label}
            </span>

            {/* Hex input */}
            <input
              type="text"
              value={kc.hex}
              onChange={(e) => {
                if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) {
                  onUpdate(kc.id, e.target.value);
                }
              }}
              onBlur={(e) => {
                if (!/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                  onUpdate(kc.id, kc.hex);
                }
              }}
              className="w-full text-center text-[11px]"
              style={{
                background: 'var(--ods-surface)',
                borderColor: 'var(--ods-border-subtle)',
                color: 'var(--ods-text-tertiary)',
                fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
