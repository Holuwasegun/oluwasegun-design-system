import { useState } from 'react';
import { useOluwasegunGenerator } from './hooks/useOluwasegunGenerator';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ColorBuilder } from './components/ColorBuilder';
import { Preview } from './components/Preview';

type Tab = 'color-builder' | 'preview';

export default function App() {
  const {
    keyColors, tonalPalettes, semanticRoles, themeMode,
    setThemeMode, updateKeyColor, addKeyColor, removeKeyColor, exportSchema,
  } = useOluwasegunGenerator();

  const [tab, setTab] = useState<Tab>('color-builder');

  return (
    <div className="flex h-screen flex-col" style={{ background: 'var(--bg)' }}>
      <Header onExport={exportSchema} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={tab} onTabChange={(t) => setTab(t as Tab)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[880px] px-6 py-5">
            {/* Tabs */}
            <div className="mb-5 flex gap-1 rounded-md p-0.5" style={{ background: 'var(--surface-hover)', width: 'fit-content' }}>
              {(['color-builder', 'preview'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="rounded-md px-4 py-1.5 text-[12px] font-medium transition-all"
                  style={{
                    background: tab === t ? 'var(--surface)' : 'transparent',
                    color: tab === t ? 'var(--text)' : 'var(--text-tertiary)',
                    boxShadow: tab === t ? 'var(--shadow-xs)' : 'none',
                  }}
                >
                  {t === 'color-builder' ? 'Color Builder' : 'Preview'}
                </button>
              ))}
            </div>

            {/* Content */}
            {tab === 'color-builder' ? (
              <ColorBuilder
                keyColors={keyColors} tonalPalettes={tonalPalettes} semanticRoles={semanticRoles}
                themeMode={themeMode} onThemeModeChange={setThemeMode}
                onUpdate={updateKeyColor} onAdd={addKeyColor} onRemove={removeKeyColor}
              />
            ) : (
              <Preview keyColors={keyColors} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
