interface KorokCounterProps {
  manualValue: number;
  /** Quantos koroks estão marcados no checklist da região (0 = checklist não usado). */
  checklistCount: number;
  total: number;
  onChange: (value: string) => void;
}

export default function KorokCounter({ manualValue, checklistCount, total, onChange }: KorokCounterProps) {
  const usingChecklist = checklistCount > 0;
  return (
    <div className="mt-3 bg-stone-800/40 rounded-md p-3 flex items-center gap-3">
      <span className="text-sm text-stone-300 flex-1">
        Koroks coletados na região
        {usingChecklist && (
          <span className="block text-xs text-stone-500 mt-0.5">contando pelo checklist de koroks</span>
        )}
      </span>
      {usingChecklist ? (
        <span className="text-stone-100 font-semibold px-2 py-1 text-right">{checklistCount}</span>
      ) : (
        <input
          type="number"
          className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-stone-100 w-20 text-right"
          value={manualValue}
          onChange={e => onChange(e.target.value)}
        />
      )}
      <span className="text-sm text-stone-400">/ {total}</span>
    </div>
  );
}
