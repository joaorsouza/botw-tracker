interface ProgressBarProps {
  pct: number;
  className?: string;
}

export default function ProgressBar({ pct, className = 'bg-emerald-500' }: ProgressBarProps) {
  return (
    <div className="w-full bg-stone-800 rounded-full h-1.5">
      <div
        className={`${className} h-1.5 rounded-full transition-all duration-500`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
