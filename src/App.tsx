import { useState } from 'react';
import { useOluwasegunGenerator } from './hooks/useOluwasegunGenerator';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ColorBuilder } from './components/ColorBuilder';
import { Preview } from './components/Preview';

type MainTab = 'color-builder' | 'preview';

export default function App() {
  const {
    keyColors,
    tonalPalettes,
    semanticRoles,
    themeMode,
    setThemeMode,
    updateKeyColor,
    addKeyColor,
    removeKeyColor,
    exportSchema,
  } = useOluwasegunGenerator();

  const [activeTab, setActiveTab] = useState<MainTab>('color-builder');

  const tabs: { id: MainTab; label: string }[] = [
    { id: 'color-builder', label: 'Color Builder' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className="flex h-screen flex-col" style={{ background: 'var(--matisse-bg)' }}>
      <Header onExport={exportSchema} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={(t) => setActiveTab(t as MainTab)} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[960px] px-8 py-6">
            {/* Tab Switcher */}
            <div className="mb-6 flex items-center">
              <div
                className="flex overflow-hidden rounded-xl p-1"
                style={{ background: 'var(--matisse-tab-active)' }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 rounded-lg px-5 py-2 text-xs font-semibold transition-all"
                    style={{
                      background:
                        activeTab === tab.id
                          ? '#ffffff'
                          : 'transparent',
                      color:
                        activeTab === tab.id
                          ? 'var(--matisse-tab-active)'
                          : 'rgba(255,255,255,0.55)',
                      boxShadow:
                        activeTab === tab.id
                          ? '0 1px 4px rgba(0,0,0,0.15)'
                          : 'none',
                    }}
                  >
                    {activeTab === tab.id && (
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: 'var(--matisse-purple)' }}
                      />
                    )}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'color-builder' ? (
              <ColorBuilder
                keyColors={keyColors}
                tonalPalettes={tonalPalettes}
                semanticRoles={semanticRoles}
                themeMode={themeMode}
                onThemeModeChange={setThemeMode}
                onUpdate={updateKeyColor}
                onAdd={addKeyColor}
                onRemove={removeKeyColor}
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
