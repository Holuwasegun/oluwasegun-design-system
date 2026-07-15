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
  const [sidebarActive, setSidebarActive] = useState('color');

  return (
    <div className="flex h-screen flex-col" style={{ background: 'var(--bg)' }}>
      <Header onExport={exportSchema} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={sidebarActive} onTabChange={(t) => setSidebarActive(t)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[880px] px-6 py-6">
            {/* Tab pills */}
            <div
              className="mb-6 flex gap-1 rounded-full p-1"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                width: 'fit-content',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              {([
                { id: 'color-builder' as Tab, label: 'Color Builder', dot: true },
                { id: 'preview' as Tab, label: 'Preview', dot: false },
              ]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="tab-pill"
                  style={{
                    background: tab === t.id ? 'var(--text)' : 'transparent',
                    color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {t.dot && tab === t.id && (
                    <span
                      className="inline-block rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: '#22C55E',
                      }}
                    />
                  )}
                  {t.label}
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
