interface KorokCounterProps {
  value: number;
  total?: number | null;
  onChange: (value: string) => void;
}

export default function KorokCounter({ value, total, onChange }: KorokCounterProps) {
  return (
    <div className="mt-3 bg-stone-800/40 rounded-md p-3 flex items-center gap-3">
      <span className="text-sm text-stone-300 flex-1">Koroks coletados na região</span>
      <input
        type="number"
        className="bg-stone-900 border border-stone-700 rounded px-2 py-1 text-stone-100 w-20 text-right"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <span className="text-sm text-stone-400">/ {total != null ? `±${total}` : '?'}</span>
    </div>
  );
}
