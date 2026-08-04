import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-stone-700 rounded-lg mb-3 overflow-hidden bg-stone-900/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-stone-800/60 hover:bg-stone-800 transition-colors text-left"
      >
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {icon}
        <span className="font-semibold text-amber-100 tracking-wide">{title}</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}
