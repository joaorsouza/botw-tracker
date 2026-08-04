import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Circle } from 'lucide-react';

interface CheckRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  sub?: string;
  detail?: string;
}

export default function CheckRow({ label, checked, onToggle, sub, detail }: CheckRowProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`rounded-md mb-1 overflow-hidden ${checked ? 'bg-emerald-900/30' : 'bg-stone-800/40'}`}>
      <div className="flex items-start">
        <button
          onClick={onToggle}
          className={`flex-1 flex items-start gap-3 text-left px-3 py-2 transition-colors ${
            checked ? 'text-emerald-200 hover:bg-emerald-900/20' : 'text-stone-200 hover:bg-stone-800'
          }`}
        >
          <span className="mt-0.5">
            {checked ? <Check size={16} className="text-emerald-400" /> : <Circle size={16} className="text-stone-500" />}
          </span>
          <span className="flex-1">
            <div className={checked ? 'line-through decoration-emerald-500/60' : ''}>{label}</div>
            {sub && <div className="text-xs text-stone-400 mt-0.5">{sub}</div>}
          </span>
        </button>
        {detail && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-2 text-stone-400 hover:text-amber-300 transition-colors"
            aria-label="Ver detalhes"
          >
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>
      {expanded && detail && (
        <div className="px-3 pb-3 pt-0 text-sm text-stone-300 leading-relaxed border-t border-stone-700/50 mt-1 pt-2 mx-1">
          {detail}
        </div>
      )}
    </div>
  );
}
