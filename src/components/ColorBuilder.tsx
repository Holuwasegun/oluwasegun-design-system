import type { KeyColorDefinition, ToneOutput, ThemeMode } from '../types/color.types';
import { KeyColors } from './KeyColors';
import { TonalPalettes } from './TonalPalettes';
import { RoleMapping } from './RoleMapping';

interface Props {
  keyColors: KeyColorDefinition[];
  tonalPalettes: Record<string, ToneOutput[]>;
  semanticRoles: Record<string, { hex: string; argb: number; contrastRatio: number }>;
  themeMode: ThemeMode;
  onThemeModeChange: (mode: ThemeMode) => void;
  onUpdate: (id: string, hex: string) => void;
  onAdd: (label: string, hex: string) => void;
  onRemove: (id: string) => void;
}

export function ColorBuilder({ keyColors, tonalPalettes, semanticRoles, themeMode, onThemeModeChange, onUpdate, onAdd, onRemove }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <KeyColors keyColors={keyColors} onUpdate={onUpdate} onAdd={onAdd} onRemove={onRemove} />
      <TonalPalettes keyColors={keyColors} tonalPalettes={tonalPalettes} />
      <RoleMapping semanticRoles={semanticRoles} themeMode={themeMode} onThemeModeChange={onThemeModeChange} />
    </div>
  );
}
