import { useState } from 'react';
import { Plus, X, Pipette } from 'lucide-react';
import type { KeyColorDefinition } from '../types/color.types';

interface SidebarInputsProps {
  keyColors: KeyColorDefinition[];
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

export function SidebarInputs({ keyColors, onUpdate, onAdd, onRemove }: SidebarInputsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newHex, setNewHex] = useState('#546e7a');

  const handleAdd = () => {
    if (newLabel.trim()) {
      onAdd(newLabel.trim(), newHex);
      setNewLabel('');
      setNewHex('#546e7a');
      setShowAddForm(false);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-3 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ods-text-muted)]">
          Key Colors
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[var(--ods-text-muted)] transition-colors hover:bg-[var(--ods-surface-raised)] hover:text-[var(--ods-text)]"
        >
          <Plus size={12} />
          Add
        </button>
      </div>

      {showAddForm && (
        <div className="mx-3 flex flex-col gap-2 rounded-lg border border-[var(--ods-border)] bg-[var(--ods-surface)] p-3">
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
              className="flex-1 rounded-md bg-[var(--ods-accent)] py-1.5 text-xs font-medium text-black transition-opacity hover:opacity-80"
            >
              Add Color
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="rounded-md px-3 py-1.5 text-xs text-[var(--ods-text-muted)] transition-colors hover:bg-[var(--ods-surface-raised)]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {keyColors.map((kc) => (
        <div
          key={kc.id}
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--ods-surface-raised)]"
        >
          <div className="relative">
            <input
              type="color"
              value={kc.hex}
              onChange={(e) => onUpdate(kc.id, e.target.value)}
              className="h-8 w-8 cursor-pointer rounded-lg"
            />
            <Pipette
              size={10}
              className="pointer-events-none absolute inset-0 m-auto text-white/70 drop-shadow-sm"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-medium leading-tight text-[var(--ods-text)]">
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
              className="mt-1 w-[100px] border-none bg-transparent px-0 py-0 text-[11px] font-mono text-[var(--ods-text-muted)] outline-none focus:text-[var(--ods-text)]"
            />
          </div>
          {kc.isCustom && (
            <button
              onClick={() => onRemove(kc.id)}
              className="rounded p-1 text-[var(--ods-text-muted)] opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
            >
              <X size={12} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
