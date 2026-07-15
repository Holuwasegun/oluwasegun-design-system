import { Layers, SlidersHorizontal } from 'lucide-react';
import { useOluwasegunGenerator } from './hooks/useOluwasegunGenerator';
import { SidebarInputs } from './components/SidebarInputs';
import { TonalGrids } from './components/TonalGrids';
import { RoleTable } from './components/RoleTable';
import { ExportPanel } from './components/ExportPanel';

export default function App() {
  const {
    keyColors,
    tonalPalettes,
    semanticRoles,
    themeMode,
    contrastLevel,
    setThemeMode,
    setContrastLevel,
    updateKeyColor,
    addKeyColor,
    removeKeyColor,
    exportSchema,
  } = useOluwasegunGenerator();

  return (
    <div className="flex h-screen flex-col bg-[var(--ods-bg)]">
      {/* Global Header */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--ods-border)] bg-[var(--ods-surface)] px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--ods-accent)]">
            <Layers size={14} className="text-black" />
          </div>
          <span className="text-sm font-bold tracking-tight text-[var(--ods-text)]">
            Oluwasegun Design System
          </span>
          <span className="rounded-full bg-[var(--ods-surface-raised)] px-2 py-0.5 text-[10px] font-medium text-[var(--ods-text-muted)]">
            M3 HCT Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={12} className="text-[var(--ods-text-muted)]" />
            <span className="text-[10px] text-[var(--ods-text-muted)]">Contrast</span>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.1}
              value={contrastLevel}
              onChange={(e) => setContrastLevel(parseFloat(e.target.value))}
              className="h-1 w-20 accent-[var(--ods-accent)]"
            />
            <span className="w-8 text-center text-[10px] font-mono text-[var(--ods-text-muted)]">
              {contrastLevel.toFixed(1)}
            </span>
          </div>
          <ExportPanel onExport={exportSchema} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="flex w-72 shrink-0 flex-col border-r border-[var(--ods-border)] bg-[var(--ods-surface)] overflow-y-auto">
          <SidebarInputs
            keyColors={keyColors}
            onUpdate={updateKeyColor}
            onAdd={addKeyColor}
            onRemove={removeKeyColor}
          />
        </aside>

        {/* Center-Right Content */}
        <main className="flex flex-1 overflow-y-auto">
          <div className="flex w-full flex-col gap-8 p-6">
            {/* Tonal Grids */}
            <section className="rounded-2xl border border-[var(--ods-border)] bg-[var(--ods-surface)] p-5">
              <TonalGrids keyColors={keyColors} tonalPalettes={tonalPalettes} />
            </section>

            {/* Role Mapping */}
            <section className="rounded-2xl border border-[var(--ods-border)] bg-[var(--ods-surface)] p-5">
              <RoleTable
                semanticRoles={semanticRoles}
                themeMode={themeMode}
                onThemeModeChange={setThemeMode}
              />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
