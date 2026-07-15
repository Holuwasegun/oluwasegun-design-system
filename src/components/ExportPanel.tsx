import { Download } from 'lucide-react';

interface ExportPanelProps {
  onExport: () => void;
}

export function ExportPanel({ onExport }: ExportPanelProps) {
  return (
    <button
      onClick={onExport}
      className="flex items-center gap-2 rounded-lg bg-[var(--ods-accent)] px-4 py-2 text-xs font-semibold text-black transition-all hover:opacity-80 active:scale-95"
    >
      <Download size={14} />
      Export JSON
    </button>
  );
}
