import { useState } from 'react';
import { useOluwasegunGenerator } from './hooks/useOluwasegunGenerator';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ColorBuilder } from './components/ColorBuilder';
import { Preview } from './components/Preview';

type MainTab = 'color-builder' | 'preview';

const TABS: { id: MainTab; label: string }[] = [
  { id: 'color-builder', label: 'Color Builder' },
  { id: 'preview', label: 'Preview' },
];

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

  return (
    <div
      className="flex h-screen flex-col"
      style={{ background: 'var(--ods-bg)' }}
    >
      <Header onExport={exportSchema} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(t) => setActiveTab(t as MainTab)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[920px] px-8 py-6">
            {/* Tab bar */}
            <div className="mb-6 flex items-center">
              <div
                className="flex overflow-hidden rounded-lg p-0.5"
                style={{ background: 'var(--ods-text)' }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold transition-all duration-150"
                    style={{
                      background:
                        activeTab === tab.id
                          ? 'var(--ods-surface)'
                          : 'transparent',
                      color:
                        activeTab === tab.id
                          ? 'var(--ods-text)'
                          : 'rgba(255,255,255,0.45)',
                      boxShadow:
                        activeTab === tab.id
                          ? 'var(--ods-shadow-xs)'
                          : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
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
